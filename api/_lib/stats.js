// Site analytics of our own (panel: Website → Site Analitiği), cookieless, so it counts every visitor
// and needs no consent: the script in src/seo/consent.js sends one small request per page view
// (POST /api/hit → api/lead.js) and one per tracked click or event. Only counts are kept, per Istanbul
// day, for 400 days; no IP address, cookie or personal data is stored. A visitor is counted once a
// day by a hash of the day, a server secret, the IP and the browser (like Plausible), which cannot
// be turned back into the IP and changes every day.
//
// Keys (one set per day, D = YYYYMMDD):
//   st:D:t   totals: v (page views), e (visits: arrivals from outside the site), s (seconds read, see `sec`)
//   st:D:p   page views per page            st:D:c   visits per country (ISO code)
//   st:D:ci  visits per city ("TR|Istanbul") st:D:s   visits per source (Google, Direkt, booking.com ...)
//   st:D:d   visits per device              st:D:l   visits per page language
//   st:D:k   events and clicks (whatsapp_click, booking_start, phone_click ...)
//   st:D:r   booking_start per route (IST-taksim)   st:D:lk  clicks per link (internal path or external host)
//   st:D:uv  HyperLogLog of the day's visitor hashes
// Each hash keeps at most MAX_FIELDS fields; anything new past that is counted under "~".
const crypto = require("crypto");
const store = require("./store");

const TTL = 400 * 86400;
const MAX_FIELDS = 400;
const DIMS = ["p", "c", "ci", "s", "d", "l", "k", "r", "lk"];
const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|headless|lighthouse|pingdom|uptime|monitor|curl|wget|python|axios|node-fetch|go-http/i;

function day(d) { return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul" }).format(d || new Date()).replace(/-/g, ""); }
function clip(s, n, re) { s = String(s == null ? "" : s).slice(0, n); return re ? s.replace(re, "") : s; }
function path(p) {
  p = clip(p, 120).toLowerCase().split(/[?#]/)[0].replace(/\.html$/, "").replace(/\/+$/, "") || "/";
  return /^\/[a-z0-9\-/._%]*$/.test(p) ? p : "";
}
function host(h) { return clip(h, 80).toLowerCase().replace(/^www\./, "").replace(/[^a-z0-9.\-]/g, ""); }

// Where a visit came from: utm_source if the link had one, else the referring site, grouped for the big ones
const SOURCES = [
  [/(^|\.)google\./, "Google"], [/(^|\.)bing\.com$/, "Bing"], [/(^|\.)yandex\./, "Yandex"], [/(^|\.)duckduckgo\.com$/, "DuckDuckGo"],
  [/(^|\.)yahoo\./, "Yahoo"], [/(^|\.)ecosia\.org$/, "Ecosia"], [/(^|\.)baidu\.com$/, "Baidu"], [/(^|\.)naver\.com$/, "Naver"],
  [/(^|\.)(chatgpt\.com|openai\.com)$/, "ChatGPT"], [/(^|\.)perplexity\.ai$/, "Perplexity"], [/(^|\.)(claude\.ai|anthropic\.com)$/, "Claude"],
  [/(^|\.)gemini\.google\.com$/, "Gemini"], [/(^|\.)copilot\.microsoft\.com$/, "Copilot"],
  [/(^|\.)(facebook\.com|fb\.com|m\.facebook\.com|l\.facebook\.com)$/, "Facebook"], [/(^|\.)instagram\.com$/, "Instagram"],
  [/(^|\.)(t\.co|twitter\.com|x\.com)$/, "X (Twitter)"], [/(^|\.)linkedin\.com$|^lnkd\.in$/, "LinkedIn"], [/(^|\.)youtube\.com$/, "YouTube"],
  [/(^|\.)tiktok\.com$/, "TikTok"], [/(^|\.)reddit\.com$/, "Reddit"], [/(^|\.)tripadvisor\./, "Tripadvisor"],
  [/(^|\.)(whatsapp\.com|wa\.me)$/, "WhatsApp"], [/(^|\.)(t\.me|telegram\.org)$/, "Telegram"]
];
function source(utm, ref) {
  if (utm) return clip(utm, 40, /[^\p{L}\p{N} ._\-]/gu).toLowerCase() || "Direkt";
  const h = host(ref);
  if (!h) return "Direkt";
  for (const [re, name] of SOURCES) if (re.test(h)) return name;
  return h;
}
function device(ua) {
  ua = String(ua || "");
  if (/iPad|Tablet|(Android(?!.*Mobile))/i.test(ua)) return "Tablet";
  if (/Mobi|iPhone|Android/i.test(ua)) return "Mobil";
  return "Masaüstü";
}
function visitor(req, ua) {
  const ipa = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  const salt = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || process.env.KV_REST_API_TOKEN || "";
  return crypto.createHash("sha256").update(day() + "|" + salt + "|" + ipa + "|" + ua).digest("hex").slice(0, 20);
}

// One counter call: increments the given hash fields, each hash capped at MAX_FIELDS, plus the visitor
const INCR = "local ttl=tonumber(ARGV[1]) local n=tonumber(ARGV[2]) " +
  "for i,k in ipairs(KEYS) do if i<=n then local f=ARGV[2+i*2-1] local by=tonumber(ARGV[2+i*2]) " +
  "if redis.call('HEXISTS',k,f)==0 and redis.call('HLEN',k)>=" + MAX_FIELDS + " then f='~' end " +
  "redis.call('HINCRBY',k,f,by) redis.call('EXPIRE',k,ttl) end end " +
  "if #KEYS>n then redis.call('PFADD',KEYS[n+1],ARGV[3+n*2]) redis.call('EXPIRE',KEYS[n+1],ttl) end return 1";

// in: { t: "v" (page view) | "e" (event), p, r (referrer), u (utm_source), l (page language), n (event name), x (event detail), s (seconds) }
async function record(req, inp) {
  const ua = String(req.headers["user-agent"] || "");
  if (!inp || BOT.test(ua) || !ua) return false;
  const D = "st:" + day() + ":";
  const inc = [];
  const add = (k, f, by) => { if (f) inc.push([D + k, String(f), by || 1]); };
  if (inp.t === "v") {
    const p = path(inp.p);
    if (!p) return false;
    add("t", "v"); add("p", p);
    const ref = host(inp.r);
    const own = host(req.headers["x-forwarded-host"] || req.headers.host || "");
    if (!ref || ref !== own && !/(^|\.)istanbultaxibooking\.com$/.test(ref) || inp.u) {
      add("t", "e");
      const cc = clip(req.headers["x-vercel-ip-country"], 2, /[^A-Z]/g) || "??";
      add("c", cc);
      let city = ""; try { city = decodeURIComponent(String(req.headers["x-vercel-ip-city"] || "")); } catch (e) {}
      if (city) add("ci", cc + "|" + clip(city, 40));
      add("s", source(inp.u, inp.r)); add("d", device(ua));
      add("l", clip(inp.l, 5, /[^a-z\-]/g) || "?");
    }
  } else if (inp.t === "e") {
    const n = clip(inp.n, 40, /[^a-z0-9_]/g);
    if (!n) return false;
    if (n === "read") { const s = Math.min(1800, Math.max(0, Math.round(+inp.s || 0))); if (s) add("t", "s", s); add("t", "rd"); }
    else {
      add("k", n);
      const x = clip(inp.x, 100);
      if (n === "booking_start" && /^[\w\-]{1,60}$/.test(x)) add("r", x);
      if (n === "link_click") { const lk = x.charAt(0) === "/" ? path(x) : host(x); if (lk) add("lk", lk); }
    }
  } else return false;
  if (!inc.length) return false;
  const keys = inc.map(x => x[0]), args = [String(TTL), String(inc.length)];
  inc.forEach(x => args.push(x[1], String(x[2])));
  if (inp.t === "v") { keys.push(D + "uv"); args.push(visitor(req, ua)); }
  await store.cmd("EVAL", INCR, String(keys.length), ...keys, ...args);
  return true;
}

// Last `days` days (today included): totals per day and the sum of every dimension
async function read(days) {
  days = Math.min(400, Math.max(1, Math.round(+days || 30)));
  const list = [];
  for (let i = days - 1; i >= 0; i--) list.push(day(new Date(Date.now() - i * 864e5)));
  const cmds = [];
  list.forEach(d => { cmds.push(["HGETALL", "st:" + d + ":t"], ["PFCOUNT", "st:" + d + ":uv"]); DIMS.forEach(k => cmds.push(["HGETALL", "st:" + d + ":" + k])); });
  cmds.push(["PFCOUNT", ...list.map(d => "st:" + d + ":uv")]);
  const out = [];
  for (let i = 0; i < cmds.length; i += 300) out.push(...await store.pipe(cmds.slice(i, i + 300)));
  const obj = a => { const o = {}; if (Array.isArray(a)) for (let i = 0; i < a.length; i += 2) o[a[i]] = +a[i + 1] || 0; else if (a) Object.keys(a).forEach(k => { o[k] = +a[k] || 0; }); return o; };
  const sum = {}; DIMS.forEach(k => { sum[k] = {}; });
  const perDay = [];
  let j = 0;
  list.forEach(d => {
    const t = obj(out[j++]), uv = +out[j++] || 0;
    perDay.push({ d: d.slice(0, 4) + "-" + d.slice(4, 6) + "-" + d.slice(6), v: t.v || 0, e: t.e || 0, u: uv, s: t.s || 0, rd: t.rd || 0 });
    DIMS.forEach(k => { const o = obj(out[j++]); Object.keys(o).forEach(f => { sum[k][f] = (sum[k][f] || 0) + o[f]; }); });
  });
  const uniq = +out[j] || 0;
  const top = (o, n) => Object.keys(o).map(k => [k, o[k]]).sort((a, b) => b[1] - a[1]).slice(0, n || 50);
  const tot = perDay.reduce((a, x) => { a.v += x.v; a.e += x.e; a.s += x.s; a.rd += x.rd; return a; }, { v: 0, e: 0, s: 0, rd: 0 });
  return {
    days, from: perDay[0].d, to: perDay[perDay.length - 1].d, perDay,
    totals: { views: tot.v, visits: tot.e, visitors: uniq, avgRead: tot.rd ? Math.round(tot.s / tot.rd) : 0 },
    pages: top(sum.p, 100), countries: top(sum.c, 100), cities: top(sum.ci, 50), sources: top(sum.s, 50),
    devices: top(sum.d), langs: top(sum.l), events: top(sum.k), routes: top(sum.r, 30), links: top(sum.lk, 50)
  };
}

module.exports = { record, read, source, path, device };
