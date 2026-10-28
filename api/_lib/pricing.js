// Prices and vehicle types the booking form uses, edited in the panel (Fiyatlandırma, Araç Tipleri).
//   zones   places of the booking form: airports, the cruise port, districts, and towns and ski resorts out of
//           Istanbul (type "city": Bursa, Uludağ, Yalova, Sapanca, Kartepe, Bolu, Kartalkaya). The built-in ones have
//           texts in 12 languages on the site; a zone added in the panel has one name for all languages.
//   cars    vehicle types: name (empty = the site's own translations), models, seats, bags, image
//   prices  one-way price in EUR per vehicle type for each pair of zones, the same in both directions.
//           Key: the two zone ids sorted and joined with "|". No price = that vehicle is not offered there.
//   fees    peak hours and surcharge per airport (see cleanFees), ret (% off the return transfer),
//           seat (EUR per child seat per transfer).
//           The site's texts in 12 languages show these numbers, so changing them here changes the texts too.
//   camp    special day campaign (Fiyatlandırma → Özel gün kampanyası; the site only, B2B lists have none): off, EUR
//           taken off the return transfer of a booking with a return, when a transfer's date (or, for a day with
//           by "book", the booking date) falls in one of the days that is on. days: [{id, name, from, to, by, on}],
//           from/to YYYY-MM-DD inclusive. A booking gets `off` once, however many days match. The /offers pages
//           (src/seo/offers.py) list the days; the built-in ids have texts in five languages there.
//   hourly  chauffeur service by the hour (booking box on /corporate/chauffeur-service): km included in the
//           8 and 10 hour packages, and per vehicle type the package prices and the fee per extra hour, EUR.
//           A vehicle type without a package price is not offered there.
// Stored in Redis under pr:cfg; until the panel saves, pricing-default.json (the site's earlier prices) is used.
// Uploaded vehicle images: pr:img:<id> ({t: type, d: base64}), served by /api/pricing?img=<id>.
const store = require("./store");
const DEFAULT = require("./pricing-default.json");
// DEFAULT (exported) carries the fees too, see the bottom of this file
const { str } = require("./booking");

const KEY = "pr:cfg";
const ZONE_TYPES = ["airport", "port", "district", "city"];
const ZONE_ID = /^[A-Za-z0-9_-]{1,24}$/;
const CAR_ID = /^[a-z0-9_-]{1,20}$/;
const IMG_ID = /^[a-z0-9]{8,32}$/;
const IMG_URL = /^\/api\/pricing\?img=[a-z0-9]{8,32}$/;
const BUILTIN_ZONES = DEFAULT.zones.map(z => z.id);
const BUILTIN_CARS = DEFAULT.cars.map(c => c.id);

const pairKey = (a, b) => [a, b].sort().join("|");
const int = (v, min, max) => { const n = Math.round(Number(v)); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : min; };
const HM = /^([01]\d|2[0-3]):[0-5]\d$/;
const DEFAULT_FEES = {
  peak: { IST: { from: "15:00", to: "19:00", type: "pct", value: 30, cars: [] }, SAW: { from: "14:45", to: "21:00", type: "pct", value: 30, cars: [] } },
  ret: 10, seat: 10
};
// Peak hours per airport: pickup time window, a surcharge in % (type "pct") or a fixed EUR amount per transfer
// ("fix"), and the vehicle types it applies to (empty = all). An airport without an entry has no peak hours.
// The first version stored {peakRate, peak: {IST: ["15:00", "19:00"]}}; that is read as a % for every vehicle.
function cleanFees(f, airports, carIds) {
  f = f && typeof f === "object" ? f : DEFAULT_FEES;
  const n = (v, max, d) => { const x = Number(v); return Number.isFinite(x) && x >= 0 ? Math.min(max, Math.round(x * 100) / 100) : d; };
  const peak = {};
  airports.forEach(a => {
    let r = f.peak && f.peak[a];
    if (Array.isArray(r)) r = { from: r[0], to: r[1], type: "pct", value: f.peakRate, cars: [] };
    if (!r || !HM.test(r.from) || !HM.test(r.to) || r.from >= r.to) return;
    const type = r.type === "fix" ? "fix" : "pct";
    const value = n(r.value, type === "pct" ? 200 : 50000, 0);
    if (!value) return;
    const cars = (Array.isArray(r.cars) ? r.cars : []).map(String).filter(c => carIds.includes(c));
    peak[a] = { from: r.from, to: r.to, type, value: type === "pct" ? Math.round(value) : value, cars: [...new Set(cars)] };
  });
  return { peak, ret: Math.round(n(f.ret, 90, 10)), seat: n(f.seat, 50000, 10) };
}
// Special day campaign, see the top of this file. The built-in days are the 2026–27 season's; the panel edits them.
const DEFAULT_CAMP = { off: 5, days: [
  { id: "blackfriday", name: "Black Friday", from: "2026-11-27", to: "2026-11-30", by: "book", on: true },
  { id: "newyear", name: "Noel ve Yılbaşı", from: "2026-12-20", to: "2027-01-03", by: "travel", on: true },
  { id: "rusnewyear", name: "Rus Yılbaşı ve Ortodoks Noeli", from: "2026-12-30", to: "2027-01-11", by: "travel", on: true },
  { id: "cny", name: "Çin Yeni Yılı", from: "2027-02-05", to: "2027-02-14", by: "travel", on: true },
  { id: "valentine", name: "Sevgililer Günü", from: "2027-02-12", to: "2027-02-16", by: "travel", on: true },
  { id: "ramadan", name: "Ramazan", from: "2027-02-07", to: "2027-03-05", by: "travel", on: true },
  { id: "eidfitr", name: "Ramazan Bayramı", from: "2027-03-06", to: "2027-03-14", by: "travel", on: true },
  { id: "nowruz", name: "Nevruz", from: "2027-03-18", to: "2027-04-02", by: "travel", on: true },
  { id: "easter", name: "Paskalya", from: "2027-03-25", to: "2027-03-30", by: "travel", on: true },
  { id: "tulip", name: "Lale Festivali", from: "2027-04-10", to: "2027-04-25", by: "travel", on: true },
  { id: "orthodoxeaster", name: "Ortodoks Paskalya ve Mayıs tatili", from: "2027-04-29", to: "2027-05-10", by: "travel", on: true },
  { id: "eidadha", name: "Kurban Bayramı", from: "2027-05-13", to: "2027-05-22", by: "travel", on: true },
  { id: "goldenweek", name: "Çin Altın Haftası", from: "2027-09-30", to: "2027-10-08", by: "travel", on: true }
] };
const YMD = /^20\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const CAMP_ID = /^[a-z0-9-]{1,32}$/;
// strict (a save from the panel): a day without a name or with wrong dates is refused instead of left out
function cleanCamp(c, strict) {
  c = c && typeof c === "object" ? c : DEFAULT_CAMP;
  const off = Number(c.off), seen = {};
  const days = (Array.isArray(c.days) ? c.days : []).slice(0, 60).map(d => {
    d = d || {};
    const id = String(d.id || ""), name = str(d.name, 80);
    if (!CAMP_ID.test(id) || seen[id] || !name || !YMD.test(d.from) || !YMD.test(d.to) || d.from > d.to) {
      if (strict) throw new Error("Özel gün kampanyası: " + (name || "adsız gün") + " için ad, başlangıç ve bitiş tarihi doğru girilmeli");
      return null;
    }
    seen[id] = 1;
    return { id, name, from: d.from, to: d.to, by: d.by === "book" ? "book" : "travel", on: d.on !== false };
  }).filter(Boolean);
  return { off: Number.isFinite(off) && off >= 0 ? Math.min(1000, Math.round(off * 100) / 100) : 5, days };
}
// Chauffeur service packages, see the top of this file
function cleanHourly(h, carIds) {
  h = h && typeof h === "object" ? h : DEFAULT.hourly;
  const src = h.cars && typeof h.cars === "object" ? h.cars : {};
  const cars = {};
  carIds.forEach(id => {
    const v = src[id] || {}, row = {};
    ["h8", "h10", "extra"].forEach(k => { const n = price(v[k]); if (n) row[k] = n; });
    if (row.h8 || row.h10) cars[id] = row;
  });
  return { km8: int(h.km8 || 100, 1, 2000), km10: int(h.km10 || 120, 1, 2000), cars };
}
const airportIds = (zones) => zones.filter(z => z.type === "airport").map(z => z.id);
const price = (v) => { const n = Number(v); return Number.isFinite(n) && n > 0 && n < 100000 ? Math.round(n * 100) / 100 : 0; };

// `p` is untrusted input from the panel. Returns a clean config or throws with a Turkish message.
function clean(p) {
  p = p || {};
  const seenZ = {}, seenC = {};
  const zones = [];
  (Array.isArray(p.zones) ? p.zones : []).slice(0, 80).forEach(z => {
    z = z || {};
    const id = String(z.id || "");
    if (!ZONE_ID.test(id) || seenZ[id]) return;
    const builtin = BUILTIN_ZONES.includes(id);
    const out = { id, type: builtin ? DEFAULT.zones.find(x => x.id === id).type : ZONE_TYPES.includes(z.type) ? z.type : "district" };
    const name = str(z.name, 60);
    if (!builtin) { if (!name) throw new Error("Yeni bölgenin adı gerekli"); out.name = name; }
    if (z.off) out.off = true;
    seenZ[id] = 1;
    zones.push(out);
  });
  // Built-in zones cannot be deleted (old bookings, route pages and links use them); missing ones come back hidden
  DEFAULT.zones.forEach(z => { if (!seenZ[z.id]) { zones.push({ id: z.id, type: z.type, off: true }); seenZ[z.id] = 1; } });

  const cars = [];
  (Array.isArray(p.cars) ? p.cars : []).slice(0, 30).forEach(c => {
    c = c || {};
    const id = String(c.id || "");
    if (!CAR_ID.test(id) || seenC[id]) return;
    const builtin = BUILTIN_CARS.includes(id);
    const out = { id, models: str(c.models, 120), seats: int(c.seats, 1, 60), bags: int(c.bags, 0, 60) };
    const name = str(c.name, 40);
    if (name) out.name = name;
    else if (!builtin) throw new Error("Yeni araç tipinin adı gerekli");
    if (c.popular) out.popular = true;
    if (IMG_URL.test(String(c.img || ""))) out.img = String(c.img);
    if (c.off) out.off = true;
    seenC[id] = 1;
    cars.push(out);
  });
  DEFAULT.cars.forEach(c => { if (!seenC[c.id]) { cars.push(Object.assign({}, c, { off: true })); seenC[c.id] = 1; } });

  if (!zones.some(z => !z.off)) throw new Error("En az bir bölge açık olmalı");
  if (!cars.some(c => !c.off)) throw new Error("En az bir araç tipi açık olmalı");

  const prices = {};
  const src = p.prices && typeof p.prices === "object" ? p.prices : {};
  Object.keys(src).slice(0, 4000).forEach(k => {
    const ab = k.split("|");
    if (ab.length !== 2 || ab[0] === ab[1] || !seenZ[ab[0]] || !seenZ[ab[1]]) return;
    const row = {}, v = src[k] || {};
    Object.keys(v).forEach(cid => { const n = price(v[cid]); if (seenC[cid] && n) row[cid] = n; });
    if (Object.keys(row).length) prices[pairKey(ab[0], ab[1])] = row;
  });
  const carIds = cars.map(c => c.id);
  return { zones, cars, prices, fees: cleanFees(p.fees, airportIds(zones), carIds), hourly: cleanHourly(p.hourly, carIds), camp: cleanCamp(p.camp, true), updatedAt: new Date().toISOString() };
}

async function get() {
  if (!store.configured()) return Object.assign({}, DEFAULT, { fees: DEFAULT_FEES, camp: DEFAULT_CAMP });
  const s = await store.cmd("GET", KEY);
  const p = s ? JSON.parse(s) : DEFAULT;
  // saved before the fees or the chauffeur packages existed, or in their first format
  const carIds = p.cars.map(c => c.id);
  // built-in zones added after the panel last saved (the out-of-town ones), or saved switched off before they had
  // any price, come in as pricing-default.json has them, with its prices for their routes; once the panel saves
  // them with prices, the saved list rules
  const untouched = z => z.off && !Object.keys(p.prices || {}).some(k => k.split("|").includes(z.id));
  const added = DEFAULT.zones.filter(z => { const x = p.zones.find(y => y.id === z.id); return !x || (z.type === "city" && untouched(x)); });
  const zones = p.zones.filter(x => !added.some(z => z.id === x.id)).concat(added.map(z => Object.assign({}, z)));
  const prices = Object.assign({}, p.prices);
  Object.keys(DEFAULT.prices).forEach(k => { if (!prices[k] && k.split("|").some(id => added.some(z => z.id === id))) prices[k] = DEFAULT.prices[k]; });
  return Object.assign({}, p, { zones, prices, fees: cleanFees(p.fees || DEFAULT_FEES, airportIds(p.zones), carIds), hourly: cleanHourly(p.hourly, carIds), camp: cleanCamp(p.camp) });
}
async function save(p) {
  const c = clean(p);
  await store.cmd("SET", KEY, JSON.stringify(c));
  return c;
}

// Vehicle image from the panel: a data URL (the panel resizes it to webp/jpeg/png first)
const IMG_MAX = 600000;
async function saveImage(dataUrl) {
  const m = /^data:(image\/(?:webp|jpeg|png));base64,([A-Za-z0-9+/=]+)$/.exec(String(dataUrl || ""));
  if (!m) throw new Error("Görsel okunamadı (webp, jpg veya png olmalı)");
  if (m[2].length > IMG_MAX) throw new Error("Görsel çok büyük");
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
  await store.cmd("SET", "pr:img:" + id, JSON.stringify({ t: m[1], d: m[2] }));
  return "/api/pricing?img=" + id;
}
async function getImage(id) {
  if (!IMG_ID.test(String(id || ""))) return null;
  const s = await store.cmd("GET", "pr:img:" + id);
  return s ? JSON.parse(s) : null;
}

// B2B prices (B2B → B2B Fiyatlandırma): the same zones and vehicle types as the site, with their own route
// prices, surcharges and chauffeur packages for partners. Only the panel uses them; the site never shows them.
// pr:b2b is the general list (euro); pr:b2b:p:<partnerId> a list made for one partner, in the currency chosen
// when it was created (EUR, USD or TRY), edited from B2B Fiyatlandırma or the partner's card in Partnerler.
const B2B_KEY = "pr:b2b";
const B2B_CUR = ["EUR", "USD", "TRY"];
const partnerKey = id => /^[a-z0-9]{6,20}$/.test(String(id || "")) ? "pr:b2b:p:" + id : null;
function cleanB2b(p, cfg) {
  p = p || {};
  const zoneIds = cfg.zones.map(z => z.id), carIds = cfg.cars.map(c => c.id), prices = {};
  const src = p.prices && typeof p.prices === "object" ? p.prices : {};
  Object.keys(src).slice(0, 4000).forEach(k => {
    const ab = k.split("|");
    if (ab.length !== 2 || ab[0] === ab[1] || !zoneIds.includes(ab[0]) || !zoneIds.includes(ab[1])) return;
    const row = {}, v = src[k] || {};
    Object.keys(v).forEach(cid => { const n = price(v[cid]); if (carIds.includes(cid) && n) row[cid] = n; });
    if (Object.keys(row).length) prices[pairKey(ab[0], ab[1])] = row;
  });
  return { prices, fees: cleanFees(p.fees || DEFAULT_FEES, airportIds(cfg.zones), carIds), hourly: cleanHourly(p.hourly || { km8: 100, km10: 120, cars: {} }, carIds), currency: B2B_CUR.includes(p.currency) ? p.currency : "EUR", updatedAt: new Date().toISOString() };
}
// The general list, or with a partner id that partner's list (null when none was made yet)
async function getB2b(partner) {
  const key = partner ? partnerKey(partner) : B2B_KEY;
  if (!key) return null;
  const cfg = await get(), s = store.configured() ? await store.cmd("GET", key) : null;
  if (partner && !s) return null;
  const b = cleanB2b(s ? JSON.parse(s) : null, cfg);
  if (s) b.updatedAt = JSON.parse(s).updatedAt || b.updatedAt; else b.updatedAt = "";
  if (!partner) b.currency = "EUR";
  return b;
}
async function saveB2b(p, partner) {
  const key = partner ? partnerKey(partner) : B2B_KEY;
  if (!key) throw new Error("Partner bulunamadı");
  const c = cleanB2b(p, await get());
  if (!partner) c.currency = "EUR";
  await store.cmd("SET", key, JSON.stringify(c));
  return c;
}
async function delB2b(partner) { const key = partnerKey(partner); if (key) await store.cmd("DEL", key); }
// Which partners have their own list: { id: { currency, updatedAt, routes } }
async function b2bLists(ids) {
  const keys = ids.map(partnerKey).filter(Boolean), out = {};
  if (!keys.length || !store.configured()) return out;
  const vals = await store.cmd("MGET", ...keys);
  keys.forEach((k, i) => {
    if (!vals[i]) return;
    const v = JSON.parse(vals[i]);
    out[k.slice(9)] = { currency: v.currency || "EUR", updatedAt: v.updatedAt || "", routes: Object.keys(v.prices || {}).length };
  });
  return out;
}

// The list a partner books with on its B2B page: its own one, else the general list (euro)
async function b2bFor(partner) { return (await getB2b(partner)) || getB2b(""); }
// Price of one transfer on a B2B list, worked out the way the site's booking form does it: the route price of the
// vehicle, the airport's peak hour surcharge when the pickup time falls in it (never to or from a town out of
// Istanbul, zone type "city"), the return discount, and the child seats. zones: {id: zone}.
// 0 = the vehicle has no price on that route.
function b2bLegPrice(list, leg, car, isReturn, zones) {
  const one = (list.prices[pairKey(leg.from, leg.to)] || {})[car] || 0;
  if (!one) return 0;
  const city = [leg.from, leg.to].some(x => zones && zones[x] && zones[x].type === "city");
  const hm = t => { const p = String(t || "").split(":"); return p.length < 2 ? -1 : +p[0] * 60 + +p[1]; }, m = city ? -1 : hm(leg.time);
  const ap = m < 0 ? null : [leg.from, leg.to].find(x => { const r = list.fees.peak[x]; return r && m >= hm(r.from) && m <= hm(r.to) && (!r.cars.length || r.cars.includes(car)); });
  const r = ap && list.fees.peak[ap];
  let v = !r ? one : r.type === "fix" ? one + r.value : Math.round(one * (1 + r.value / 100));
  if (isReturn) v = Math.round(v * (1 - list.fees.ret / 100));
  return Math.round((v + list.fees.seat * ((+leg.seatB || 0) + (+leg.seatK || 0))) * 100) / 100;
}

module.exports = { DEFAULT_FEES, DEFAULT_CAMP, get, save, clean, saveImage, getImage, pairKey, getB2b, saveB2b, delB2b, b2bLists, b2bFor, b2bLegPrice };

module.exports.DEFAULT = Object.assign({}, DEFAULT, { fees: DEFAULT_FEES, camp: DEFAULT_CAMP });
