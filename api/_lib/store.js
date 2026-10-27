// Booking storage on Upstash Redis (Vercel → Storage → Upstash for Redis), over its REST API so no
// package is needed. Vercel sets KV_REST_API_URL / KV_REST_API_TOKEN when the database is connected.
//
// Keys:
//   bk:seq      counter for booking numbers
//   bk:<id>     one booking as JSON
//   bk:idx      sorted set of booking ids, scored by creation time
//   bk:ref:<r>  site reference (IAT-...) → id, so a resent booking is not saved twice
//   rl:...      rate limit counters
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
  return s ? JSON.parse(s) : null;
}
// Writes only if the stored booking still has the updatedAt it was read with, so two people in the
// panel cannot silently undo each other's change. The loser gets an error with .conflict set.
const SAVE_IF = "local cur = redis.call('GET', KEYS[1]) " +
  "if cur and ARGV[2] ~= '' and not string.find(cur, ARGV[2], 1, true) then return 0 end " +
  "redis.call('SET', KEYS[1], ARGV[1]) return 1";
async function saveBooking(b) {
  const was = b.updatedAt || "";
  b.updatedAt = new Date().toISOString();
  const ok = await cmd("EVAL", SAVE_IF, "1", "bk:" + b.id, JSON.stringify(b), was ? '"updatedAt":' + JSON.stringify(was) : "");
  if (!ok) {
    b.updatedAt = was;
    const e = new Error("Bu rezervasyon bu arada değişti. Sayfayı yenileyip tekrar deneyin.");
    e.conflict = true;
    throw e;
  }
  return b;
}
async function createBooking(b) {
  const id = await cmd("INCR", "bk:seq");
  b.id = id;
  b.createdAt = new Date().toISOString();
  b.updatedAt = b.createdAt;
  await pipe([
    ["SET", "bk:" + id, JSON.stringify(b)],
    ["ZADD", "bk:idx", String(Date.parse(b.createdAt)), String(id)],
    ["SET", "bk:ref:" + b.ref, String(id)]
  ]);
  return b;
}
async function idForRef(ref) { return cmd("GET", "bk:ref:" + ref); }
// Newest first
async function listBookings(limit) {
  const ids = await cmd("ZRANGE", "bk:idx", "0", String((limit || 300) - 1), "REV");
  if (!ids || !ids.length) return [];
  const rows = await cmd("MGET", ...ids.map(i => "bk:" + i));
  return rows.filter(Boolean).map(s => JSON.parse(s));
}

module.exports = { configured, allow, getBooking, saveBooking, createBooking, idForRef, listBookings };
