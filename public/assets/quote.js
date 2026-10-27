// Price of a booking from data/pricing.json. Used by the booking page in the browser and by
// api/booking.js on the server, so the price the customer sees is the price that is saved.
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.Quote = factory();
})(this, function () {
  function base(P, from, to, car) {
    var row = P.prices[from + "|" + to] || P.prices[to + "|" + from];
    return row && row[car] > 0 ? row[car] : 0;
  }
  function zone(P, id) {
    for (var i = 0; i < P.zones.length; i++) if (P.zones[i].id === id) return P.zones[i];
    return null;
  }
  // Pickups at an airport inside its busy hours cost more (rules.peak)
  function peakPct(P, from, time) {
    var p = P.rules.peak && P.rules.peak[from];
    return p && time && time >= p.from && time < p.to ? p.pct : 0;
  }
  function leg(P, from, to, car, time) {
    var b = base(P, from, to, car);
    return b ? Math.round(b * (1 + peakPct(P, from, time) / 100)) : 0;
  }
  // b: {from, to, car, time, ret: {time} | null, childSeats}
  // → {out, back, seats, total} in P.currency, or null when the route has no price
  function quote(P, b) {
    var out = leg(P, b.from, b.to, b.car, b.time);
    if (!out) return null;
    var back = 0;
    if (b.ret) back = Math.round(leg(P, b.to, b.from, b.car, b.ret.time) * (1 - P.rules.returnDiscountPct / 100));
    var seats = (b.childSeats || 0) * P.rules.childSeat * (b.ret ? 2 : 1);
    return { out: out, back: back, seats: seats, total: out + back + seats };
  }
  function fits(car, pax, bags) { return pax <= car.seats && (bags || 0) <= car.bags; }
  return { base: base, zone: zone, peakPct: peakPct, leg: leg, quote: quote, fits: fits };
});
