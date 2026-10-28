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
  // Pickups at an airport inside its busy hours cost more (rules.peak): a % (pct) or a fixed EUR amount (fix),
  // for the vehicle types in cars (none listed = all)
  function peakRule(P, from, time, car) {
    var p = P.rules.peak && P.rules.peak[from];
    return p && time && time >= p.from && time < p.to && (!car || !p.cars || !p.cars.length || p.cars.indexOf(car) >= 0) ? p : null;
  }
  function peakPct(P, from, time) {
    var p = peakRule(P, from, time);
    return p ? p.pct || 0 : 0;
  }
  function leg(P, from, to, car, time) {
    var b = base(P, from, to, car), p = b && peakRule(P, from, time, car);
    return !b ? 0 : !p ? b : p.fix ? Math.round(b + p.fix) : Math.round(b * (1 + (p.pct || 0) / 100));
  }
  // The prices and fees saved in the panel (GET /api/pricing, api/_lib/pricing.js) over the built price list.
  // Zones and vehicle types stay the built ones, since the site has texts for those only.
  function live(P, cfg) {
    if (!cfg || !cfg.prices || !cfg.fees) return P;
    var peak = {}, f = cfg.fees;
    Object.keys(f.peak || {}).forEach(function (a) {
      var r = f.peak[a];
      peak[a] = { from: r.from, to: r.to, pct: r.type === "fix" ? 0 : r.value, fix: r.type === "fix" ? r.value : 0, cars: r.cars || [] };
    });
    var off = {};
    (cfg.zones || []).concat(cfg.cars || []).forEach(function (x) { if (x.off) off[x.id] = 1; });
    var prices = {};
    Object.keys(cfg.prices).forEach(function (k) {
      if (k.split("|").some(function (id) { return off[id]; })) return;
      var row = {};
      Object.keys(cfg.prices[k]).forEach(function (c) { if (!off[c]) row[c] = cfg.prices[k][c]; });
      prices[k] = row;
    });
    var rules = {};
    Object.keys(P.rules).forEach(function (k) { rules[k] = P.rules[k]; });
    rules.peak = peak;
    rules.returnDiscountPct = f.ret;
    rules.childSeat = f.seat;
    var out = {};
    Object.keys(P).forEach(function (k) { out[k] = P[k]; });
    out.prices = prices;
    out.rules = rules;
    return out;
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
  return { base: base, zone: zone, peakPct: peakPct, leg: leg, quote: quote, fits: fits, live: live };
});
