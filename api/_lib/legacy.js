// Bookings and drivers saved by the first ITB panel (before the panel became the full one) are read in
// today's shape, so they show and work in every screen; the next save stores them that way.
// Old booking: one transfer at the top level (from, to, date, time, flight, pickup, dropoff, pax, bags,
// childSeats), ret {date, time, flight, pickup}, name/phone/email, price {out, back, seats, total},
// assign {out, back} drivers, statuses request/confirmed/declined/done/cancelled.
// Old drivers: the list under "drv" ({id, name, phone, plate, car, note}); they become independent drivers.
const P = require("../../data/pricing.json");

const STATUS = { request: "yeni", confirmed: "onaylandi", declined: "reddedildi", done: "tamamlandi", cancelled: "iptal" };
const zoneName = id => { const z = P.zones.find(x => x.id === id); return z ? z.name.tr : id || ""; };
const carName = id => { const c = P.cars.find(x => x.id === id); return c ? c.name.en : id || ""; };
const assign = d => d && d.id ? { id: d.id, type: "bireysel", label: "Bireysel: " + [d.car || d.plate, d.name].filter(Boolean).join(" · "), phone: d.phone || "" } : null;

function booking(b) {
  if (!b || Array.isArray(b.legs)) return b;
  const pr = b.price || {}, seat = (b.childSeats || 0) * P.rules.childSeat, a = b.assign || {};
  const leg = (o) => Object.assign({ pax: b.pax || 1, bags: b.bags || 0, seatB: b.childSeats || 0, seatK: 0, cost: 0, cash: 0, car: "", carName: "", uetds: null, done: "" }, o);
  const legs = [leg({
    date: b.date, time: b.time, from: b.from, fromName: zoneName(b.from), fromAddr: b.pickup || "",
    to: b.to, toName: zoneName(b.to), toAddr: b.dropoff || "", flight: b.flight || "", note: b.note || "",
    price: pr.manual ? pr.total : (pr.out || 0) + (b.ret ? seat : pr.seats || 0), assign: assign(a.out)
  })];
  if (b.ret) legs.push(leg({
    date: b.ret.date, time: b.ret.time, from: b.to, fromName: zoneName(b.to), fromAddr: b.ret.pickup || b.dropoff || "",
    to: b.from, toName: zoneName(b.from), toAddr: b.pickup || "", flight: b.ret.flight || "", note: "",
    price: pr.manual ? 0 : (pr.back || 0) + seat, assign: assign(a.back)
  }));
  return {
    id: b.id, ref: b.ref || "", status: STATUS[b.status] || b.status || "yeni", lang: b.lang || "en",
    car: b.car, carName: carName(b.car),
    customer: { name: b.name || "", email: b.email || "", phone: b.phone || "" },
    passenger: { name: "", phone: "" }, travelers: [], legs,
    total: pr.total || 0, currency: "EUR", payment: "nakit", partner: "", partnerRef: "", cashCur: "",
    adminNote: b.adminNote || "", source: b.ref ? "site" : "panel",
    history: b.history || [], createdAt: b.createdAt, updatedAt: b.updatedAt
  };
}

function drivers(list) {
  return (list || []).map(d => ({ id: d.id, type: "bireysel", name: d.car || d.plate || "Araç", detail: [d.plate, d.note].filter(Boolean).join(" · "), driver: d.name || "", phone: d.phone || "" }));
}

module.exports = { booking, drivers };
