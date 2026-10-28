// The office handles this site's bookings in the Transfer3E panel (transfer3e.com/admin): each booking saved here
// is also sent there, and the panel passes back what the passenger should get (approval with this site's voucher,
// decline, cancellation, thank-you), which api/hub.js sends from here in this site's look and saves on the booking.
// Settings (Vercel → Environment Variables):
//   HUB_SECRET  the same value as HUB_SECRET_ITB on the Transfer3E project; without it nothing is sent there
//   HUB_URL     only to test against a preview (default https://www.transfer3e.com)
// Every call either way is signed: X-Hub-Site, X-Hub-Time (unix seconds) and X-Hub-Sig = HMAC-SHA256 of
// "<time>.<body>" with the secret; a call older than five minutes is refused.
const crypto = require("crypto");
const store = require("./store");

const KEY = "itb";
const SECRET = () => process.env.HUB_SECRET || "";
const URL_ = () => (process.env.HUB_URL || "https://www.transfer3e.com").replace(/\/$/, "");
function configured() { return !!SECRET(); }

const sign = (time, raw) => crypto.createHmac("sha256", SECRET()).update(time + "." + raw).digest("hex");

// true when a request carries this site's signature from the last five minutes
function verify(headers, raw) {
  const time = String(headers["x-hub-time"] || ""), sig = String(headers["x-hub-sig"] || "");
  if (!configured() || headers["x-hub-site"] !== KEY || !/^\d{9,11}$/.test(time) || Math.abs(Date.now() / 1000 - +time) > 300) return false;
  const want = Buffer.from(sign(time, raw), "hex"), got = Buffer.from(sig, "hex");
  return want.length === got.length && crypto.timingSafeEqual(want, got);
}

function log(b, text) { b.history = (b.history || []).concat([{ at: new Date().toISOString(), text }]).slice(-50); }

// Sends the booking to the panel. Returns true when the panel has it; a booking it could not get is marked
// (hubPending) and sent again with the next booking or the next Telegram tick. Changes `b` without saving it.
async function push(b) {
  if (!configured()) return false;
  const out = Object.assign({}, b);
  delete out.history;
  if (b.partner) {
    try { const p = (await require("./partner").list()).find(x => x.id === b.partner); if (p) out.partnerName = p.name; } catch (e) { console.error(e); }
  }
  const raw = JSON.stringify({ action: "booking", id: String(b.id), booking: out }), time = String(Math.floor(Date.now() / 1000));
  try {
    const r = await fetch(URL_() + "/api/hub", {
      method: "POST", headers: { "Content-Type": "application/json", "X-Hub-Site": KEY, "X-Hub-Time": time, "X-Hub-Sig": sign(time, raw) },
      body: raw, signal: AbortSignal.timeout(15000)
    });
    if (!r.ok) throw new Error("HTTP " + r.status);
    if (b.hubPending) delete b.hubPending;
    if (!b.hubAt) log(b, "Transfer3E paneline aktarıldı");
    b.hubAt = new Date().toISOString();
    return true;
  } catch (e) {
    console.error("hub", e.message);
    if (!b.hubPending) log(b, "Transfer3E paneline aktarılamadı, tekrar denenecek (" + e.message + ")");
    b.hubPending = true;
    return false;
  }
}

// Bookings of the last two weeks the panel did not get yet, sent again (at most 10 a call)
async function flush() {
  if (!configured()) return 0;
  let n = 0;
  for (const s of (await store.listBookings(100)).filter(x => x.hubPending).slice(0, 10)) {
    if (Date.now() - Date.parse(s.createdAt) > 14 * 86400000) continue;
    const b = await store.getBooking(s.id);
    if (b && b.hubPending && await push(b)) { await store.saveBooking(b).catch(e => console.error(e)); n++; }
  }
  return n;
}

// The panel's address (Telegram's "Panelde aç" button)
const PANEL = () => URL_() + "/admin#rezervasyonlar";

module.exports = { KEY, configured, verify, push, flush, PANEL };
