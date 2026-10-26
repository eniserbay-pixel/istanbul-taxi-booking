// Shape and checks of a booking. Statuses: request (sent from the site) → confirmed (approved in the
// panel, the customer gets the confirmation e-mail) → done; or declined / cancelled.
const P = require("../../data/pricing.json");
const Q = require("../../public/assets/quote.js");

const STATUSES = ["request", "confirmed", "declined", "done", "cancelled"];
const REF = /^IAT-\d{6}-[A-Z0-9]{4}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/, TIME = /^\d{2}:\d{2}$/;

const str = (v, max) => String(v == null ? "" : v).replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max || 200);
const int = (v, min, max) => { const n = Math.round(Number(v)); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : min; };

// What the site may send; everything else (price, status, history) is set on the server
function clean(x) {
  x = x || {};
  const r = x.ret && typeof x.ret === "object" ? x.ret : null;
  const b = {
    ref: str(x.ref, 20),
    lang: x.lang === "ru" ? "ru" : "en",
    from: str(x.from, 20), to: str(x.to, 20), car: str(x.car, 20),
    date: str(x.date, 10), time: str(x.time, 5),
    flight: str(x.flight, 12).toUpperCase(),
    pickup: str(x.pickup, 200), dropoff: str(x.dropoff, 200),
    pax: int(x.pax, 1, 16), bags: int(x.bags, 0, 30), childSeats: int(x.childSeats, 0, 4),
    ret: r ? { date: str(r.date, 10), time: str(r.time, 5), flight: str(r.flight, 12).toUpperCase(), pickup: str(r.pickup, 200) } : null,
    name: str(x.name, 80), phone: str(x.phone, 30), email: str(x.email, 120).toLowerCase(),
    note: str(x.note, 600),
    payment: "cash"
  };
  return b;
}

// Problems that stop a booking; [] when it can be saved
function problems(b) {
  const out = [];
  const car = P.cars.find(c => c.id === b.car);
  if (!REF.test(b.ref)) out.push("ref");
  if (!Q.zone(P, b.from) || !Q.zone(P, b.to) || b.from === b.to) out.push("route");
  if (!car) out.push("car");
  else if (!Q.fits(car, b.pax, b.bags)) out.push("capacity");
  if (!DATE.test(b.date) || !TIME.test(b.time)) out.push("when");
  if (b.ret && (!DATE.test(b.ret.date) || !TIME.test(b.ret.time) || b.ret.date + b.ret.time <= b.date + b.time)) out.push("return");
  if (b.name.length < 2) out.push("name");
  if (!/^\+?[0-9 ()-]{7,20}$/.test(b.phone)) out.push("phone");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(b.email)) out.push("email");
  if (!Q.quote(P, b)) out.push("price");
  return out;
}

// Pickup date in Istanbul must not be in the past
function inPast(b) {
  const now = new Date(Date.now() + 3 * 3600e3).toISOString().slice(0, 16).replace("T", " ");
  return b.date + " " + b.time < now;
}

module.exports = { STATUSES, clean, problems, inPast, str, P, Q };
