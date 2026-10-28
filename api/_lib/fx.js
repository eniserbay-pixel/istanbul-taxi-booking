// Turkish lira rates for the panel (Operasyonlar shows supplier fees in TL). Central Bank of Turkey's
// daily list (ForexSelling), with the ECB rates from frankfurter.app as a fallback. Kept in memory
// for an hour per running function, so the panel does not hit the source on every load.
// Döviz Kurları in the panel can set the office's own EUR and USD rates (fx:manual); while they are on,
// every TL conversion in the panel uses them instead of the bank's.
const store = require("./store");
const MANUAL = "fx:manual";
let cache = null;

async function tcmb() {
  const r = await fetch("https://www.tcmb.gov.tr/kurlar/today.xml", { signal: AbortSignal.timeout(5000) });
  if (!r.ok) throw new Error("tcmb " + r.status);
  const xml = await r.text(), out = {};
  for (const c of ["EUR", "USD", "GBP"]) {
    const m = xml.match(new RegExp('CurrencyCode="' + c + '"[\\s\\S]*?<ForexSelling>([\\d.]+)</ForexSelling>'));
    if (m) out[c] = +m[1];
  }
  const d = xml.match(/Tarih="([\d.]+)"/);
  return { rates: out, date: d ? d[1] : "", source: "TCMB" };
}
async function ecb() {
  const r = await fetch("https://api.frankfurter.app/latest?from=TRY&to=EUR,USD,GBP", { signal: AbortSignal.timeout(5000) });
  if (!r.ok) throw new Error("ecb " + r.status);
  const j = await r.json(), out = {};
  for (const c of Object.keys(j.rates || {})) if (j.rates[c]) out[c] = Math.round(1 / j.rates[c] * 10000) / 10000;
  return { rates: out, date: j.date || "", source: "ECB" };
}

// The bank's rates (TCMB, else ECB), cached for an hour
async function auto() {
  if (cache && Date.now() - cache.at < 3600e3) return cache.v;
  let v = null;
  for (const f of [tcmb, ecb]) {
    try { v = await f(); if (Object.keys(v.rates).length) break; } catch (e) { console.error("fx", e.message); }
    v = null;
  }
  if (!v) { if (cache) return cache.v; throw new Error("fx_unavailable"); }
  cache = { at: Date.now(), v };
  return v;
}

async function manual() {
  const s = store.configured() ? await store.cmd("GET", MANUAL) : null;
  return s ? JSON.parse(s) : null;
}
// `m` from the panel: { on, EUR, USD } in TL per unit
async function setManual(m) {
  m = m || {};
  const n = v => { const x = Math.round(Number(v) * 10000) / 10000; return Number.isFinite(x) && x > 0 && x < 100000 ? x : 0; };
  const out = { on: !!m.on, EUR: n(m.EUR), USD: n(m.USD), at: new Date().toISOString() };
  if (out.on && (!out.EUR || !out.USD)) throw Object.assign(new Error("Euro ve dolar kuru gerekli"), { user: true });
  await store.cmd("SET", MANUAL, JSON.stringify(out));
  return out;
}
// { rates: { EUR: 47.1, USD: 40.2, GBP: 54.3 }, date, source }: how many TL one unit buys; the office's own
// rates when they are on (GBP stays the bank's)
async function rates() {
  const m = await manual().catch(() => null);
  let a = null;
  try { a = await auto(); } catch (e) { if (!(m && m.on)) throw e; }
  if (!(m && m.on)) return a;
  return { rates: Object.assign({}, a && a.rates, { EUR: m.EUR, USD: m.USD }), date: m.at.slice(0, 10), source: "Manuel" };
}

module.exports = { rates, auto, manual, setManual };
