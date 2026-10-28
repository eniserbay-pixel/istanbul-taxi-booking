// Booking storage on Upstash Redis (Vercel Storage → Upstash for Redis), over its REST API so no
// package is needed. Vercel sets KV_REST_API_URL / KV_REST_API_TOKEN when the database is connected
// to the project; the UPSTASH_REDIS_REST_* names work too.
//
// Keys:
//   bk:seq      counter for booking numbers (#1, #2 ...)
//   bk:<id>     one booking as JSON
//   bk:idx      sorted set of booking ids, scored by creation time
//   bk:ref:<r>  site reference (IAT-...) → id, so a resent booking is not saved twice
//   drv         drivers of the first ITB panel, read into res:list until it is saved (legacy.js)
//   res:list    registered vehicles and agencies (JSON array) that transfers are assigned to
//   sup:pays    payments settled with suppliers (agencies, independent drivers), JSON array (Araç/Tedarik → Finans)
//   ld:<id>     a booking started on the site but not finished, kept 30 days ("Aranacaklar")
//   ld:idx      sorted set of those ids, scored by last update
//   ld:done:<id> set when that booking was finished, so a late update does not bring the lead back
//   bk:tok:<t>  link token of a change sent to the customer → booking id (60 days)
//   ap:seq, ap:<id>, ap:idx  applications from the corporate pages (supplier, b2b), panel: Başvurular
//   bl:...      blog posts written in the panel (see blog.js)
//   st:<day>:... site analytics counters (see stats.js); gsc:... Search Console answers, 6 hours (gsc.js)
const legacy = require("./legacy");
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

function configured() { return !!(URL_ && TOKEN); }

async function call(path, body) {
  const r = await fetch(URL_.replace(/\/$/, "") + path, {
    method: "POST",
    headers: { Authorization: "Bearer " + TOKEN, "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const j = await r.json().catch(() => null);
  if (!r.ok || !j) throw new Error("redis " + r.status + " " + (j && j.error || ""));
  return j;
}
async function cmd(...args) {
  const j = await call("", args);
  if (j.error) throw new Error("redis " + j.error);
  return j.result;
}
async function pipe(cmds) {
  const j = await call("/pipeline", cmds);
  return j.map(x => { if (x.error) throw new Error("redis " + x.error); return x.result; });
}

// Fixed-window counter: true while `key` has been hit at most `max` times in `sec` seconds
async function allow(key, max, sec) {
  const [n] = await pipe([["INCR", key], ["EXPIRE", key, String(sec), "NX"]]);
  return n <= max;
}

async function getBooking(id) {
  const s = await cmd("GET", "bk:" + id);
  return s ? legacy.booking(JSON.parse(s)) : null;
}
// Saves only if the stored booking is still the one `b` was read as (same updatedAt), so two writes that read the
// same booking (the panel, Telegram, the customer's link) cannot silently undo each other. The loser gets an error
// with .conflict set and nothing is written.
const SAVE_IF = "local cur = redis.call('GET', KEYS[1]) " +
  "if cur and ARGV[2] ~= '' and not string.find(cur, ARGV[2], 1, true) then return 0 end " +
  "redis.call('SET', KEYS[1], ARGV[1]) return 1";
async function saveBooking(b) {
  const was = b.updatedAt || "";
  b.updatedAt = new Date().toISOString();
  const ok = await cmd("EVAL", SAVE_IF, "1", "bk:" + b.id, JSON.stringify(b), was ? '"updatedAt":' + JSON.stringify(was) : "");
  if (!ok) {
    b.updatedAt = was;
    const e = new Error("Bu rezervasyon bu arada başka bir yerden değişti. Sayfayı yenileyip tekrar deneyin.");
    e.conflict = true;
    throw e;
  }
  return b;
}
async function createBooking(b) {
  const id = await cmd("INCR", "bk:seq");
  b.id = id;
  b.createdAt = b.createdAt || new Date().toISOString();
  b.updatedAt = b.createdAt;
  const cmds = [["SET", "bk:" + id, JSON.stringify(b)], ["ZADD", "bk:idx", String(Date.parse(b.createdAt)), String(id)]];
  if (b.ref) cmds.push(["SET", "bk:ref:" + b.ref, String(id)]);
  await pipe(cmds);
  return b;
}
async function idForRef(ref) { return cmd("GET", "bk:ref:" + ref); }
async function saveToken(t, id) { await cmd("SET", "bk:tok:" + t, String(id), "EX", String(60 * 86400)); }
async function idForToken(t) { return cmd("GET", "bk:tok:" + t); }
// Newest first
async function listBookings(limit) {
  const ids = await cmd("ZRANGE", "bk:idx", "0", String((limit || 3000) - 1), "REV");
  const out = [];
  for (let i = 0; i < ids.length; i += 200) {
    const part = await cmd("MGET", ...ids.slice(i, i + 200).map(id => "bk:" + id));
    part.forEach(s => { if (s) out.push(legacy.booking(JSON.parse(s))); });
  }
  return out;
}

// Until the panel saves this list, the first ITB panel's drivers (drv) are offered as independent drivers
async function getResources() {
  const s = await cmd("GET", "res:list");
  if (s) return JSON.parse(s);
  const old = await cmd("GET", "drv");
  return old ? legacy.drivers(JSON.parse(old)) : [];
}
async function saveResources(list) { await cmd("SET", "res:list", JSON.stringify(list)); return list; }
async function getSupPays() {
  const s = await cmd("GET", "sup:pays");
  return s ? JSON.parse(s) : [];
}
async function saveSupPays(list) { await cmd("SET", "sup:pays", JSON.stringify(list)); return list; }

const LEAD_TTL = 30 * 86400;
async function getLead(id) {
  const s = await cmd("GET", "ld:" + id);
  return s ? JSON.parse(s) : null;
}
async function saveLead(l) {
  await pipe([["SET", "ld:" + l.id, JSON.stringify(l), "EX", String(LEAD_TTL)], ["ZADD", "ld:idx", String(Date.parse(l.updatedAt)), l.id]]);
  return l;
}
async function leadDone(id) { return !!(await cmd("EXISTS", "ld:done:" + id)); }
// Booking finished or handled: drop the lead and keep late updates from re-creating it
async function finishLead(id) {
  await pipe([["DEL", "ld:" + id], ["ZREM", "ld:idx", id], ["SET", "ld:done:" + id, "1", "EX", "86400"]]);
}
// Newest first; ids whose lead expired are removed from the index on the way
async function listLeads() {
  const ids = await cmd("ZRANGE", "ld:idx", "0", "499", "REV");
  if (!ids.length) return [];
  const vals = await cmd("MGET", ...ids.map(id => "ld:" + id));
  const gone = ids.filter((id, i) => !vals[i]);
  if (gone.length) await cmd("ZREM", "ld:idx", ...gone);
  return vals.filter(Boolean).map(s => JSON.parse(s));
}

async function createApp(a) {
  const id = await cmd("INCR", "ap:seq");
  a.id = id;
  a.createdAt = a.updatedAt = new Date().toISOString();
  await pipe([["SET", "ap:" + id, JSON.stringify(a)], ["ZADD", "ap:idx", String(Date.parse(a.createdAt)), String(id)]]);
  return a;
}
async function getApp(id) {
  const s = await cmd("GET", "ap:" + id);
  return s ? JSON.parse(s) : null;
}
async function saveApp(a) {
  a.updatedAt = new Date().toISOString();
  await cmd("SET", "ap:" + a.id, JSON.stringify(a));
  return a;
}
async function deleteApp(id) { await pipe([["DEL", "ap:" + id], ["ZREM", "ap:idx", String(id)]]); }
// Newest first
async function listApps() {
  const ids = await cmd("ZRANGE", "ap:idx", "0", "999", "REV");
  if (!ids.length) return [];
  const vals = await cmd("MGET", ...ids.map(id => "ap:" + id));
  return vals.filter(Boolean).map(s => JSON.parse(s));
}

module.exports = { createApp, getApp, saveApp, deleteApp, listApps, getLead, saveLead, leadDone, finishLead, listLeads, getResources, saveResources, getSupPays, saveSupPays, configured, cmd, pipe, allow, getBooking, saveBooking, createBooking, idForRef, saveToken, idForToken, listBookings };
