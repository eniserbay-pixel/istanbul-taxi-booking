// The ITB site's booking form (public/assets/site.js) sends one transfer with an optional return in its own
// shape: {ref, lang, from, to, car, date, time, flight, pickup, dropoff, pax, bags, childSeats,
// ret: {date, time, flight, pickup} | null, name, phone, email, note}. This turns it into a panel booking
// (_lib/booking.js: customer, legs, total), priced on the server with the same rules the form showed.
const P0 = require("../../data/pricing.json");
const Q = require("../../public/assets/quote.js");
const pricing = require("./pricing");
const { str } = require("./booking");

const REF = /^IAT-\d{6}-[A-Z0-9]{4}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/, TIME = /^\d{2}:\d{2}$/;
const LANGS = ["en", "ru", "de", "fr", "it", "nl"];
const int = (v, min, max) => { const n = Math.round(Number(v)); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : min; };

// The price list the form uses: the panel's saved prices over the built one
async function live() {
  try { return Q.live(P0, await pricing.get()); } catch (e) { console.error(e); return P0; }
}

// Returns {booking} ready for clean(), or {error} with what the form got wrong
async function fromSite(x) {
  x = x || {};
  const r = x.ret && typeof x.ret === "object" ? x.ret : null;
  const s = {
    ref: str(x.ref, 20), lang: LANGS.includes(x.lang) ? x.lang : "en",
    from: str(x.from, 24), to: str(x.to, 24), car: str(x.car, 20),
    date: str(x.date, 10), time: str(x.time, 5), flight: str(x.flight, 12).toUpperCase(),
    pickup: str(x.pickup, 200), dropoff: str(x.dropoff, 200),
    pax: int(x.pax, 1, 16), bags: int(x.bags, 0, 30), childSeats: int(x.childSeats, 0, 4),
    ret: r ? { date: str(r.date, 10), time: str(r.time, 5), flight: str(r.flight, 12).toUpperCase(), pickup: str(r.pickup, 200) } : null,
    name: str(x.name, 80), phone: str(x.phone, 30), email: str(x.email, 120).toLowerCase(), note: str(x.note, 600)
  };
  if (!REF.test(s.ref)) return { error: "bad_ref" };
  const P = await live();
  const zf = Q.zone(P, s.from), zt = Q.zone(P, s.to), car = P.cars.find(c => c.id === s.car);
  if (!zf || !zt || s.from === s.to || !car) return { error: "incomplete" };
  if (!DATE.test(s.date) || !TIME.test(s.time)) return { error: "incomplete" };
  if (s.ret && (!DATE.test(s.ret.date) || !TIME.test(s.ret.time) || s.ret.date + s.ret.time <= s.date + s.time)) return { error: "incomplete" };
  if (s.name.length < 2 || !/^\+?[0-9 ()-]{7,20}$/.test(s.phone) || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s.email)) return { error: "incomplete" };
  if (!Q.fits(car, s.pax, s.bags)) return { error: "incomplete" };
  const q = Q.quote(P, s);
  if (!q) return { error: "no_price" };

  const seat = s.childSeats * P.rules.childSeat;
  const legs = [{
    date: s.date, time: s.time,
    from: s.from, fromName: zf.name.tr, fromAddr: s.pickup,
    to: s.to, toName: zt.name.tr, toAddr: s.dropoff,
    flight: s.flight, pax: s.pax, bags: s.bags, seatB: s.childSeats,
    note: s.note, price: q.out + seat
  }];
  if (s.ret) legs.push({
    date: s.ret.date, time: s.ret.time,
    from: s.to, fromName: zt.name.tr, fromAddr: s.ret.pickup || s.dropoff,
    to: s.from, toName: zf.name.tr, toAddr: s.pickup,
    flight: s.ret.flight, pax: s.pax, bags: s.bags, seatB: s.childSeats,
    note: "", price: q.back + seat
  });
  return { booking: {
    ref: s.ref, lang: s.lang, car: car.id, carName: car.name.en,
    customer: { name: s.name, email: s.email, phone: s.phone },
    legs, total: q.total, currency: P.currency || "EUR", payment: "nakit"
  } };
}

module.exports = { fromSite, live, REF };
