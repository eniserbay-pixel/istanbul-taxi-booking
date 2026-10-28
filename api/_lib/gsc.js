// Google Search Console for the panel's Site Analitiği: the words people searched on Google before
// clicking (or just seeing) the site, with clicks, impressions, CTR and average position, also per page.
// Reads the Search Analytics API with a Google Cloud service account, no package needed.
// Needs, in the Vercel environment variables:
//   GSC_CLIENT_EMAIL   the service account's e-mail (…@….iam.gserviceaccount.com), added as a user of the
//                      property in Search Console (Settings → Users and permissions, "Restricted" is enough)
//   GSC_PRIVATE_KEY    its private key (the "private_key" of the JSON key file, with the \n's as they are)
//   GSC_SITE           optional, the property: default sc-domain:istanbultaxibooking.com
//                      (a URL-prefix property is written https://www.istanbultaxibooking.com/)
// Search Console data is 2-3 days behind. Answers are kept in Redis for 6 hours (gsc2:<site>:<days>).
const crypto = require("crypto");
const store = require("./store");

const SITE = () => process.env.GSC_SITE || "sc-domain:istanbultaxibooking.com";
function configured() { return !!(process.env.GSC_CLIENT_EMAIL && process.env.GSC_PRIVATE_KEY); }

const b64 = s => Buffer.from(s).toString("base64url");
async function token() {
  const now = Math.floor(Date.now() / 1000);
  const head = b64(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64(JSON.stringify({ iss: process.env.GSC_CLIENT_EMAIL, scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 }));
  const key = String(process.env.GSC_PRIVATE_KEY).replace(/\\n/g, "\n");
  const sig = crypto.sign("RSA-SHA256", Buffer.from(head + "." + claim), key).toString("base64url");
  const r = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=" + encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer") + "&assertion=" + head + "." + claim + "." + sig });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.access_token) throw new Error("Google girişi olmadı: " + (j.error_description || j.error || r.status));
  return j.access_token;
}

async function query(tok, from, to, dims, limit) {
  const r = await fetch("https://www.googleapis.com/webmasters/v3/sites/" + encodeURIComponent(SITE()) + "/searchAnalytics/query", {
    method: "POST", headers: { Authorization: "Bearer " + tok, "Content-Type": "application/json" },
    body: JSON.stringify({ startDate: from, endDate: to, dimensions: dims, rowLimit: limit || 100, dataState: "all" })
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(r.status === 403 ? "Search Console izni yok: servis hesabını mülke kullanıcı olarak ekleyin (" + SITE() + ")" : "Search Console: " + (j.error && j.error.message || r.status));
  return (j.rows || []).map(x => ({ k: x.keys, c: x.clicks, i: x.impressions, ctr: Math.round(x.ctr * 1000) / 10, pos: Math.round(x.position * 10) / 10 }));
}

const ymd = d => new Date(d).toISOString().slice(0, 10);

// Search words worth working on, with the page Google shows for them (query + page rows):
//   "baslik": on page 1 (position 4-10) but clicked less than that position usually gets: a better title and description can win clicks
//   "icerik": on page 2 (position 11-20): the page needs more on that topic, or links from other pages, to reach page 1
//   "to":     in the top 3 but hardly clicked: the title and description do not match what people look for
// Only words seen often enough to tell (about one impression a day); the 40 with the most to gain, most first.
const EXPECTED_CTR = { 1: 28, 2: 15, 3: 10, 4: 7, 5: 5, 6: 4, 7: 3, 8: 2.5, 9: 2, 10: 2 }; // rough industry averages, %
function chances(rows, days) {
  const min = Math.max(5, days);
  return rows.filter(r => r.i >= min).map(r => {
    const p = Math.round(r.pos), exp = EXPECTED_CTR[Math.min(10, Math.max(1, p))];
    let kind = null;
    if (r.pos > 10.5 && r.pos <= 20.5) kind = "icerik";
    else if (r.pos > 3.5 && r.pos <= 10.5 && r.ctr < exp) kind = "baslik";
    else if (r.pos <= 3.5 && r.ctr < exp / 2) kind = "to";
    // clicks the word could bring: what page 1 or its expected CTR would give, minus today's
    const gain = kind === "icerik" ? r.i * 0.03 : kind ? Math.max(0, r.i * exp / 100 - r.c) : 0;
    return kind && { q: r.k[0], page: r.k[1], c: r.c, i: r.i, ctr: r.ctr, pos: r.pos, kind, gain: Math.round(gain * 10) / 10 };
  }).filter(Boolean).sort((a, b) => b.gain - a.gain).slice(0, 40);
}
async function report(days, fresh) {
  days = [7, 28, 90].includes(+days) ? +days : 28;
  const ck = "gsc2:" + SITE() + ":" + days;
  if (!fresh) { const c = await store.cmd("GET", ck); if (c) return JSON.parse(c); }
  const to = ymd(Date.now()), from = ymd(Date.now() - (days - 1) * 864e5);
  const tok = await token();
  const [queries, pages, daily, pairs] = await Promise.all([
    query(tok, from, to, ["query"], 250), query(tok, from, to, ["page"], 100), query(tok, from, to, ["date"], 100),
    query(tok, from, to, ["query", "page"], 500)
  ]);
  const totals = daily.reduce((a, x) => { a.c += x.c; a.i += x.i; return a; }, { c: 0, i: 0 });
  const out = { site: SITE(), days, from, to, at: new Date().toISOString(), totals, queries, pages, daily, chances: chances(pairs, days) };
  await store.cmd("SET", ck, JSON.stringify(out), "EX", String(6 * 3600));
  return out;
}

module.exports = { configured, report, SITE };
