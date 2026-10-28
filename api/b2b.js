// B2B partners' booking page (public/b2b, served on www.istanbultaxibooking.com/b2b). The action comes in ?a=...
//   GET  me                       sign-in state; signed in: the partner, its price list (its own one in its currency,
//                                  else the general B2B list in euro), the zones and the vehicle types
//   POST login {email, password}  e-mail on the partner's card in Partnerler, password made in the panel (_lib/b2bauth.js)
//   POST logout
//   POST book {booking}           a transfer, or with kind "hourly" a car with driver for 8 or 10 hours (the list's
//                                  chauffeur packages); comes into Rezervasyonlar as Talep with the partner set; the
//                                  price is worked out here from the partner's list, never taken from the page
//   GET  list                     the partner's bookings, newest first (a firm user without finance rights: its own)
//   POST sale {id, sale}          the partner's own selling price of a booking, for its profit in Finans
//   GET  xlsx&from=&to=&lang=     Finans as an Excel file: the bookings with transfer dates in the range
//   GET  users / POST usersave {user} / userreset {id} / userdel {id}
//                                  the firm's users (owner only), see _lib/b2bauth.js
// Who booked: partnerUser (name) and partnerUid (empty = the owner); partnerSale: the partner's selling price.
// These are set here, outside clean(), so the panel's Düzenle keeps them as they are.
const store = require("./_lib/store");
const telegram = require("./_lib/telegram");
const mail = require("./_lib/mail");
const pricing = require("./_lib/pricing");
const partner = require("./_lib/partner");
const b2bauth = require("./_lib/b2bauth");
const { clean, problems, str, CURRENCIES } = require("./_lib/booking");
const { body, ip, send } = require("./_lib/http");
const xlsx = require("./_lib/xlsx");

const now = () => new Date().toISOString();
// Names of the site's built-in zones and vehicle types (the site has them in 12 languages; this page in one)
const ZONE_NAMES = { IST: "Istanbul Airport (IST)", SAW: "Sabiha Gökçen Airport (SAW)", galataport: "Galataport cruise port", taksim: "Taksim / Beyoğlu", sultanahmet: "Sultanahmet / Fatih", karakoy: "Karaköy / Galata", besiktas: "Beşiktaş", sisli: "Şişli / Nişantaşı", sariyer: "Sarıyer", bakirkoy: "Bakırköy", beylikduzu: "Beylikdüzü / Esenyurt", kadikoy: "Kadıköy", uskudar: "Üsküdar", atasehir: "Ataşehir",
  bursa: "Bursa", uludag: "Uludağ (Bursa)", yalova: "Yalova", sapanca: "Sapanca", kartepe: "Kartepe (Kocaeli)", bolu: "Bolu", kartalkaya: "Kartalkaya (Bolu)" };
const CAR_NAMES = { sedan: "Sedan", minivan: "Minivan", vclass: "Mercedes V-Class", minibus: "Minibus" };

// What the page needs from the list: active zones, vehicle types with a price somewhere, prices, fees and packages
function offer(list, cfg) {
  const used = {};
  Object.values(list.prices).forEach(r => Object.keys(r).forEach(c => { used[c] = 1; }));
  Object.keys(list.hourly.cars).forEach(c => { used[c] = 1; });
  return {
    currency: list.currency,
    zones: cfg.zones.filter(z => !z.off).map(z => ({ id: z.id, type: z.type, name: z.name || ZONE_NAMES[z.id] || z.id })),
    cars: cfg.cars.filter(c => !c.off && used[c.id]).map(c => ({ id: c.id, name: c.name || CAR_NAMES[c.id] || c.id, models: c.models, seats: c.seats, bags: c.bags, img: c.img || "" })),
    prices: list.prices, fees: list.fees, hourly: list.hourly
  };
}
// What the partner sees of its bookings
function brief(b) {
  return {
    id: b.id, ref: b.ref, partnerRef: b.partnerRef || "", status: b.status, createdAt: b.createdAt, car: b.car, carName: b.carName,
    passenger: b.passenger.name, pax: (b.legs[0] || {}).pax, total: b.total, currency: b.currency, payment: b.payment, hourly: b.hourly || null,
    carName: b.carName || CAR_NAMES[b.car] || b.car, user: b.partnerUser || "", uid: b.partnerUid || "", sale: b.partnerSale || 0, cashCur: b.cashCur || "",
    legs: b.legs.map(l => ({ date: l.date, time: l.time, from: l.from, fromName: l.fromName, to: l.to, toName: l.toName, flight: l.flight, cash: l.cash }))
  };
}
// Bookings left out of the turnover and profit
const OFF = ["reddedildi", "iptal"];
// The Finans sheet: one row per booking, then the totals per currency
const XL = {
  tr: { sheet: "Finans", head: ["Rezervasyon", "Referans", "Rezervasyonu yapan", "Oluşturma", "Tarih", "Saat", "Tür", "Güzergâh", "Yolcu", "Kişi", "Araç", "Durum", "Ödeme", "Yolcudan nakit", "Nakit birimi", "Maliyet", "Satış", "Kâr", "Para birimi"],
    transfer: "Transfer", hourly: "Şoförlü araç", owner: "Firma sahibi", cari: "Cari", nakit: "Cari + nakit", total: "Toplam", hrs: " saat",
    st: { talep: "Onay bekliyor", degisiklik: "Değişiklik önerildi", yeni: "Onaylandı", onaylandi: "Onaylandı", tamamlandi: "Tamamlandı", reddedildi: "Reddedildi", iptal: "İptal" } },
  en: { sheet: "Finance", head: ["Booking", "Reference", "Booked by", "Created", "Date", "Time", "Type", "Route", "Passenger", "Pax", "Vehicle", "Status", "Payment", "Cash from passenger", "Cash currency", "Cost", "Sale", "Profit", "Currency"],
    transfer: "Transfer", hourly: "Car with driver", owner: "Owner", cari: "On account", nakit: "On account + cash", total: "Total", hrs: " hours",
    st: { talep: "Awaiting confirmation", degisiklik: "Change proposed", yeni: "Confirmed", onaylandi: "Confirmed", tamamlandi: "Completed", reddedildi: "Declined", iptal: "Cancelled" } }
};
function sheet(list, lang) {
  const L = XL[lang] || XL.en, rows = [L.head], tot = {};
  list.forEach(b => {
    const l = b.legs[0] || {}, cash = b.legs.reduce((n, x) => n + (+x.cash || 0), 0), on = !OFF.includes(b.status);
    const route = b.hourly ? (l.fromName || "") + " · " + b.hourly.hours + L.hrs : b.legs.map(x => (ZONE_NAMES[x.from] || x.fromName || x.from) + " → " + (ZONE_NAMES[x.to] || x.toName || x.to)).join(" / ");
    const sale = +b.partnerSale || 0;
    rows.push([b.ref || "#" + b.id, b.partnerRef || "", b.partnerUser || L.owner, String(b.createdAt || "").slice(0, 10), b.legs.map(x => x.date).join(" / "), b.legs.map(x => x.time).join(" / "),
      b.hourly ? L.hourly : L.transfer, route, b.passenger.name, l.pax || "", b.carName || CAR_NAMES[b.car] || b.car, L.st[b.status] || b.status,
      cash ? L.nakit : L.cari, cash || "", cash ? b.cashCur || b.currency : "", b.total, sale || "", sale ? Math.round((sale - b.total) * 100) / 100 : "", b.currency]);
    if (!on) return;
    const t = tot[b.currency] || (tot[b.currency] = { cost: 0, sale: 0, profit: 0, n: 0 });
    t.n++; t.cost += b.total;
    if (sale) { t.sale += sale; t.profit += sale - b.total; }
  });
  const bold = [];
  rows.push([]);
  Object.keys(tot).forEach(c => { const t = tot[c], r = v => Math.round(v * 100) / 100; bold.push(rows.length); rows.push([L.total, "", "", "", "", "", "", "", "", t.n, "", "", "", "", "", r(t.cost), r(t.sale) || "", r(t.profit) || "", c]); });
  return xlsx.build(L.sheet, rows, bold);
}

module.exports = async (req, res) => {
  const a = String(req.query && req.query.a || new URL(req.url, "http://x").searchParams.get("a") || "");
  if (req.method === "POST" && req.headers["x-iap-b2b"] !== "1") return send(res, 403, { error: "forbidden" });
  if (!store.configured() || !b2bauth.ready()) return send(res, 501, { error: "not_configured" });

  try {
    if (a === "login" && req.method === "POST") {
      if (!(await store.allow("rl:b2b:" + ip(req), 10, 900))) return send(res, 429, { error: "too_many" });
      const input = await body(req) || {};
      const email = str(input.email, 120).toLowerCase(), pw = String(input.password || "");
      // an e-mail address: the firm's owner; anything else: a firm user's user name
      if (!email.includes("@")) {
        const u = email && await b2bauth.checkUser(email, pw);
        if (!u) return send(res, 401, { error: "wrong" });
        b2bauth.setSession(req, res, u.pid, u.user, u.user.id);
        return send(res, 200, { ok: true });
      }
      const p = email && (await partner.list()).find(x => x.email === email);
      const ok = p && await b2bauth.check(p.id, pw);
      if (!ok) return send(res, 401, { error: "wrong" });
      b2bauth.setSession(req, res, p.id, ok);
      return send(res, 200, { ok: true });
    }
    if (a === "logout" && req.method === "POST") { b2bauth.clearSession(req, res); return send(res, 200, { ok: true }); }

    const who = await b2bauth.session(req);
    const p = who && (await partner.list()).find(x => x.id === who.pid);
    if (a === "me" && !p) return send(res, 200, { signedIn: false });
    if (!p) return send(res, 401, { error: "signed_out" });
    // owner: the firm's own login; all: sees every booking of the firm and Finans
    const u = who.user, owner = !u, all = owner || !!u.fin;
    const mine = b => b.partner === p.id && (all || b.partnerUid === u.id);

    if (a === "me") {
      const [list, cfg] = await Promise.all([pricing.b2bFor(p.id), pricing.get()]);
      return send(res, 200, { signedIn: true, partner: { name: p.name, email: p.email, phone: p.phone1, contact: p.contact, country: p.country }, user: { name: u ? u.name : p.contact || "", owner, fin: all }, offer: offer(list, cfg) });
    }

    if (a === "list" && req.method === "GET") {
      const all = await store.listBookings();
      return send(res, 200, { bookings: all.filter(mine).slice(0, 1000).map(brief) });
    }

    if (a === "sale" && req.method === "POST") {
      const input = await body(req) || {};
      const b = await store.getBooking(+input.id);
      if (!b || !mine(b)) return send(res, 404, { error: "not_found" });
      const v = Math.round(Number(input.sale) * 100) / 100;
      b.partnerSale = Number.isFinite(v) && v > 0 && v < 1e7 ? v : 0;
      await store.saveBooking(b);
      return send(res, 200, { booking: brief(b) });
    }

    if (a === "xlsx" && req.method === "GET") {
      if (!all) return send(res, 403, { error: "forbidden" });
      const q = new URL(req.url, "http://x").searchParams, D = /^\d{4}-\d{2}-\d{2}$/;
      const from = D.test(q.get("from") || "") ? q.get("from") : "", to = D.test(q.get("to") || "") ? q.get("to") : "";
      const lang = q.get("lang") === "tr" ? "tr" : "en";
      const list = (await store.listBookings()).filter(b => { const d = (b.legs[0] || {}).date || ""; return mine(b) && (!from || d >= from) && (!to || d <= to); })
        .sort((x, y) => ((x.legs[0] || {}).date || "").localeCompare((y.legs[0] || {}).date || ""));
      const file = sheet(list, lang);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", 'attachment; filename="' + (lang === "tr" ? "finans" : "finance") + (from ? "-" + from : "") + (to ? "-" + to : "") + '.xlsx"');
      res.setHeader("Cache-Control", "no-store");
      return res.end(file);
    }

    if (a.startsWith("user")) {
      if (!owner) return send(res, 403, { error: "forbidden" });
      if (a === "users" && req.method === "GET") return send(res, 200, { users: (await b2bauth.users(p.id)).map(b2bauth.pub) });
      if (req.method !== "POST") return send(res, 404, { error: "unknown" });
      const input = await body(req) || {};
      try {
        if (a === "usersave") return send(res, 200, await b2bauth.saveUser(p.id, input.user || {}));
        if (a === "userreset") return send(res, 200, await b2bauth.resetUser(p.id, String(input.id || "")));
        if (a === "userdel") { await b2bauth.delUser(p.id, String(input.id || "")); return send(res, 200, { ok: true }); }
      } catch (e) { if (e.user) return send(res, 400, { error: e.message }); throw e; }
    }

    if (a === "book" && req.method === "POST") {
      if (!(await store.allow("rl:b2bbk:" + p.id, 60, 3600))) return send(res, 429, { error: "too_many" });
      const input = (await body(req, 100000) || {}).booking || {};
      const [list, cfg] = await Promise.all([pricing.b2bFor(p.id), pricing.get()]);
      const zones = {};
      cfg.zones.forEach(z => { if (!z.off) zones[z.id] = z; });
      const car = cfg.cars.find(c => !c.off && c.id === String(input.car || ""));
      const legs = (Array.isArray(input.legs) ? input.legs : []).slice(0, 2);
      if (!car || !legs.length) return send(res, 400, { error: "incomplete" });
      const pax = Math.round(+input.pax), bags = Math.round(+input.bags);
      if (!(pax >= 1 && pax <= car.seats)) return send(res, 400, { error: "seats" });
      if (!(bags >= 0 && bags <= car.bags)) return send(res, 400, { error: "bags" });
      const trav = (Array.isArray(input.travelers) ? input.travelers : []).slice(0, pax);
      if (trav.length < pax || trav.some(t => !str(t && t.name, 120) || !str(t && t.doc, 30) || !str(t && t.nat, 60))) return send(res, 400, { error: "travelers" });

      const cashOn = !!input.cash;
      const cashCur = CURRENCIES.includes(input.cashCur) ? input.cashCur : list.currency;
      let total = 0, hourly = null;
      const out = [];
      if (input.kind === "hourly") {
        // Car with driver: one leg from the pickup address, the package price of the vehicle, no peak hours
        const l = legs[0] || {}, hours = +input.hours === 10 ? 10 : 8, pk = list.hourly.cars[car.id] || {};
        const price = pk["h" + hours] || 0, km = list.hourly["km" + hours];
        if (!price) return send(res, 400, { error: "no_price" });
        if (!str(l.fromAddr, 300)) return send(res, 400, { error: "incomplete" });
        total = price;
        hourly = { hours, km, extra: pk.extra || 0 };
        out.push({
          date: l.date, time: l.time, from: "", fromName: str(l.fromAddr, 300), fromAddr: "",
          to: "", toName: "Şoförlü araç · " + hours + " saat / " + km + " km", toAddr: "", flight: l.flight, pax, bags,
          note: l.note, price, cash: cashOn ? l.cash : 0
        });
      }
      for (let i = 0; !hourly && i < legs.length; i++) {
        const l = legs[i] || {};
        if (!zones[l.from] || !zones[l.to] || l.from === l.to) return send(res, 400, { error: "route" });
        const price = pricing.b2bLegPrice(list, l, car.id, i === 1, zones);
        if (!price) return send(res, 400, { error: "no_price" });
        total += price;
        const name = id => zones[id].name || ZONE_NAMES[id] || id;
        out.push({
          date: l.date, time: l.time, from: l.from, fromName: name(l.from), fromAddr: l.fromAddr,
          to: l.to, toName: name(l.to), toAddr: l.toAddr, flight: l.flight, pax, bags,
          seatB: l.seatB, seatK: l.seatK, note: l.note, price, cash: cashOn ? l.cash : 0
        });
      }
      if (cashOn && !out.some(l => +l.cash > 0)) return send(res, 400, { error: "cash" });
      const today = new Date().toISOString().slice(2, 10).replace(/-/g, "");
      const b = clean({
        ref: "B2B-" + today + "-" + String(Math.floor(Math.random() * 1e4)).padStart(4, "0"),
        status: "talep", lang: input.lang === "tr" ? "tr" : "en",
        car: car.id, carName: car.name || "",
        customer: { name: p.name, email: p.email, phone: p.phone1 },
        passenger: { name: trav[0].name, phone: input.phone },
        travelers: trav.map(t => ({ name: t.name, nat: t.nat, doc: t.doc, gender: t.gender })),
        legs: out, total: Math.round(total * 100) / 100, currency: list.currency,
        payment: cashOn ? "nakit" : "cari", cashCur: cashOn ? cashCur : "",
        partner: p.id, partnerRef: input.partnerRef, hourly
      });
      const bad = problems(b);
      if (bad.length || b.legs.some(l => !l.date || !l.time)) return send(res, 400, { error: "incomplete", detail: bad });
      if (b.legs[1] && b.legs[1].date < b.legs[0].date) return send(res, 400, { error: "return_date" });
      b.source = "b2b";
      b.partnerUser = u ? u.name : ""; b.partnerUid = u ? u.id : "";
      const sale = Math.round(Number(input.sale) * 100) / 100;
      if (Number.isFinite(sale) && sale > 0 && sale < 1e7) b.partnerSale = sale;
      b.history = [{ at: now(), text: "B2B sayfasından geldi: " + p.name + (u ? " · " + u.name : "") + (hourly ? " (şoförlü araç, " + hourly.hours + " saat)" : "") }];
      const saved = await store.createBooking(b);
      const sent = await mail.send(mail.officeMail("Yeni B2B rezervasyon talebi: " + p.name, saved)).catch(e => { console.error(e); return false; });
      saved.history.push({ at: now(), text: "Ofis bildirim e-postası " + (sent ? "gönderildi" : "gönderilemedi") });
      await telegram.booking("🆕 Yeni B2B rezervasyon", saved, true);
      await require("./_lib/hub").push(saved);
      await store.saveBooking(saved);
      return send(res, 200, { booking: brief(saved) });
    }
    send(res, 404, { error: "unknown" });
  } catch (e) {
    console.error(e);
    send(res, 500, { error: "server" });
  }
};
