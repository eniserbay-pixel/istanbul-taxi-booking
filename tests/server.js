// Local server for testing: serves public/ like Vercel (cleanUrls) and runs api/*.js, with an in-memory
// stand-in for Upstash Redis and a recorder instead of Resend. Not used in production.
// Run: node tests/server.js [port]   (mails sent are listed at /__mails; POST /__redis {key: json} seeds keys)
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PORT = +process.argv[2] || 4321;
const db = new Map(), zsets = new Map(), hashes = new Map(), mails = [];

function redis(args) {
  const [c, ...a] = args;
  switch (String(c).toUpperCase()) {
    case "INCR": { const n = (+db.get(a[0]) || 0) + 1; db.set(a[0], String(n)); return n; }
    case "EXPIRE": return 1;
    case "SET": if (a.includes("NX") && db.has(a[0])) return null; db.set(a[0], a[1]); return "OK";
    case "DEL": return a.reduce((n, k) => n + (db.delete(k) || zsets.delete(k) || hashes.delete(k) ? 1 : 0), 0);
    case "EXISTS": return a.filter(k => db.has(k) || zsets.has(k) || hashes.has(k)).length;
    case "ZREM": { const z = zsets.get(a[0]); return z ? a.slice(1).filter(m => z.delete(m)).length : 0; }
    case "HSET": case "HSETNX": {
      const h = hashes.get(a[0]) || new Map(); hashes.set(a[0], h);
      let n = 0;
      for (let i = 1; i < a.length; i += 2) { if (c.toUpperCase() === "HSETNX" && h.has(a[i])) continue; h.set(a[i], a[i + 1]); n++; }
      return n;
    }
    case "HDEL": { const h = hashes.get(a[0]); return h ? a.slice(1).filter(f => h.delete(f)).length : 0; }
    case "HGETALL": return [].concat(...[...(hashes.get(a[0]) || new Map()).entries()]);
    case "PFCOUNT": return 0;
    case "GET": return db.has(a[0]) ? db.get(a[0]) : null;
    case "MGET": return a.map(k => db.has(k) ? db.get(k) : null);
    case "ZADD": { const z = zsets.get(a[0]) || new Map(); z.set(a[2], +a[1]); zsets.set(a[0], z); return 1; }
    case "ZRANGE": {
      const z = [...(zsets.get(a[0]) || new Map()).entries()].sort((x, y) => x[1] - y[1]).map(x => x[0]);
      if (a.includes("REV")) z.reverse();
      return z.slice(+a[1], +a[2] === -1 ? undefined : +a[2] + 1);
    }
    case "EVAL": { // the SAVE_IF script of store.js; the analytics counters are not kept here
      if (!/SET', KEYS\[1\]/.test(a[0])) return 1;
      const key = a[2], val = a[3], was = a[4], cur = db.get(key);
      if (cur && was && !cur.includes(was)) return 0;
      db.set(key, val);
      return 1;
    }
    default: throw new Error("unsupported " + c);
  }
}

process.env.KV_REST_API_URL = "http://redis.local";
process.env.KV_REST_API_TOKEN = "t";
process.env.RESEND_API_KEY = process.env.RESEND_API_KEY || "test";
process.env.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "test-pass";
const realFetch = global.fetch;
global.fetch = async (url, opt) => {
  const u = String(url);
  const json = (o, s) => new Response(JSON.stringify(o), { status: s || 200, headers: { "Content-Type": "application/json" } });
  if (u.startsWith("http://redis.local")) {
    const body = JSON.parse(opt.body);
    if (u.endsWith("/pipeline")) return json(body.map(cmd => ({ result: redis(cmd) })));
    return json({ result: redis(body) });
  }
  if (u.startsWith("https://api.resend.com")) { mails.push(JSON.parse(opt.body)); return json({ id: "m" + mails.length }); }
  return realFetch(url, opt);
};

const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png", ".woff2": "font/woff2", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml" };

http.createServer(async (req, res) => {
  const u = new URL(req.url, "http://x");
  if (u.pathname === "/__redis" && req.method === "POST") {
    let raw = ""; for await (const ch of req) raw += ch;
    Object.entries(JSON.parse(raw)).forEach(([k, v]) => k.startsWith("z:") ? redis(["ZADD", k.slice(2), String(v[1]), String(v[0])]) : db.set(k, typeof v === "string" ? v : JSON.stringify(v)));
    return res.end("{}");
  }
  if (u.pathname === "/__mails") { res.setHeader("Content-Type", "application/json"); return res.end(JSON.stringify(mails)); }
  if (u.pathname === "/api/hit") u.pathname = "/api/lead", u.searchParams.set("hit", "1");
  if (u.pathname.startsWith("/api/")) {
    const f = path.join(ROOT, "api", u.pathname.slice(5).replace(/[^a-z-]/g, "") + ".js");
    if (!fs.existsSync(f)) { res.statusCode = 404; return res.end("{}"); }
    req.query = Object.fromEntries(u.searchParams);
    try { return await require(f)(req, res); } catch (e) { console.error(e); res.statusCode = 500; return res.end("{}"); }
  }
  let p = path.join(ROOT, "public", decodeURIComponent(u.pathname));
  const tries = [p, p + ".html", path.join(p, "index.html")];
  const hit = tries.find(t => t.startsWith(path.join(ROOT, "public")) && fs.existsSync(t) && fs.statSync(t).isFile());
  if (!hit) { res.statusCode = 404; res.setHeader("Content-Type", TYPES[".html"]); return res.end(fs.readFileSync(path.join(ROOT, "public", "404.html"))); }
  res.setHeader("Content-Type", TYPES[path.extname(hit)] || "application/octet-stream");
  res.end(fs.readFileSync(hit));
}).listen(PORT, () => console.log("http://127.0.0.1:" + PORT));
