// Admin API for /admin (Turkish panel).
//   GET  ?a=me                    → {signedIn}
//   GET  ?a=list                  → bookings, newest first
//   GET  ?a=drivers               → drivers / vehicles
//   POST ?a=login {password}      → sets the session cookie
//   POST ?a=logout
//   POST ?a=save {id?, ...booking, status?, notify}  new booking from the panel (no id) or an edit
//   POST ?a=status {id, status, reason?, notify}     confirmed → confirmation e-mail, declined → decline e-mail
//   POST ?a=assign {id, leg: "out"|"back", driver}   gives a transfer to a driver ("" takes it back)
//   POST ?a=drivers {drivers: [...]}                 saves the driver list
const store = require("./_lib/store");
const auth = require("./_lib/auth");
const mail = require("./_lib/mail");
const { STATUSES, cleanAdmin, adminProblems, priceOf, str, P } = require("./_lib/booking");
const { body, ip, send } = require("./_lib/http");

const LABEL = { request: "Talep", confirmed: "Onaylandı", declined: "Reddedildi", done: "Tamamlandı", cancelled: "İptal" };
// Fields the panel may change on a booking; the rest (ref, price, status, history) is kept or set here
const EDITABLE = ["lang", "from", "to", "car", "date", "time", "flight", "pickup", "dropoff", "pax", "bags", "childSeats", "ret", "name", "phone", "email", "note", "adminNote", "manualPrice"];

function newRef() {
  const d = new Date(Date.now() + 3 * 3600e3).toISOString().slice(2, 10).replace(/-/g, "");
  const abc = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 4; i++) out += abc[Math.floor(Math.random() * abc.length)];
  return "IAT-" + d + "-" + out;
}

// Sends the customer e-mail of `kind` and notes the result in the booking's history
async function mailCustomer(b, kind, reason, now) {
  if (!b.email) { b.history.push({ at: now, text: "E-posta gönderilmedi (müşterinin e-postası yok)" }); return; }
  try {
    const sent = await mail.toCustomer(b, kind, reason);
    b.history.push({ at: now, text: sent ? "Müşteriye e-posta gönderildi" : "E-posta gönderilmedi (RESEND_API_KEY yok)" });
  } catch (e) {
    console.error(e);
    b.history.push({ at: now, text: "E-posta gönderilemedi: " + mail.why(e) });
  }
}

function cleanDriver(d) {
  d = d || {};
  return {
    id: str(d.id, 12) || Math.random().toString(36).slice(2, 10),
    name: str(d.name, 80), phone: str(d.phone, 30), plate: str(d.plate, 20).toUpperCase(), car: str(d.car, 60), note: str(d.note, 200)
  };
}

module.exports = async (req, res) => {
  const a = String(req.query && req.query.a || new URL(req.url, "http://x").searchParams.get("a") || "");
  if (!process.env.ADMIN_PASSWORD) return send(res, 501, { error: "ADMIN_PASSWORD tanımlı değil" });
  if (!store.configured()) return send(res, 501, { error: "Veritabanı bağlı değil (Upstash Redis)" });

  if (a === "me") return send(res, 200, { signedIn: auth.signedIn(req) });
  if (a === "login" && req.method === "POST") {
    if (!(await store.allow("rl:login:" + ip(req), 10, 900))) return send(res, 429, { error: "Çok fazla deneme, 15 dakika sonra tekrar deneyin" });
    const x = await body(req);
    if (!auth.passwordOk(x && x.password)) return send(res, 401, { error: "Şifre yanlış" });
    auth.setSession(req, res);
    return send(res, 200, { ok: true });
  }
  if (a === "logout") { auth.clearSession(req, res); return send(res, 200, { ok: true }); }
  if (!auth.signedIn(req)) return send(res, 401, { error: "Giriş gerekli" });

  try {
    if (a === "list") return send(res, 200, { bookings: await store.listBookings(500) });
    if (a === "drivers" && req.method === "GET") return send(res, 200, { drivers: await store.getDrivers() });

    if (req.method !== "POST") return send(res, 405, { error: "method" });
    const x = await body(req);
    if (!x) return send(res, 400, { error: "Geçersiz istek" });
    const now = new Date().toISOString();

    if (a === "drivers") {
      const list = (Array.isArray(x.drivers) ? x.drivers : []).slice(0, 200).map(cleanDriver).filter(d => d.name);
      return send(res, 200, { drivers: await store.saveDrivers(list) });
    }

    // A new booking typed in the panel
    if (a === "save" && !x.id) {
      const b = cleanAdmin(x);
      const bad = adminProblems(b);
      if (bad.length) return send(res, 400, { error: "Kontrol edin: " + bad.join(", ") });
      b.ref = newRef();
      b.price = priceOf(b);
      b.currency = P.currency;
      b.status = x.status === "request" ? "request" : "confirmed";
      b.source = "panel";
      b.driver = "";
      b.assign = {};
      b.history = [{ at: now, text: "Panelden eklendi (" + LABEL[b.status] + ")" }];
      const saved = await store.createBooking(b);
      if (x.notify && saved.status === "confirmed") {
        await mailCustomer(saved, "confirmed", "", now);
        await store.saveBooking(saved);
      }
      return send(res, 200, { booking: saved });
    }

    const b = await store.getBooking(Number(x.id));
    if (!b) return send(res, 404, { error: "Rezervasyon bulunamadı" });
    // The panel sends the updatedAt it showed, so a change made meanwhile is not overwritten
    if (x.updatedAt && x.updatedAt !== b.updatedAt) return send(res, 409, { error: "Bu rezervasyon bu arada değişti. Sayfayı yenileyin." });

    if (a === "save") {
      const n = cleanAdmin(x);
      const bad = adminProblems(n);
      if (bad.length) return send(res, 400, { error: "Kontrol edin: " + bad.join(", ") });
      EDITABLE.forEach(k => { b[k] = n[k]; });
      b.price = priceOf(b);
      // A return trip that was removed takes its driver with it
      if (!b.ret && b.assign) delete b.assign.back;
      b.history.push({ at: now, text: "Rezervasyon düzenlendi" });
      if (x.notify && b.status === "confirmed") await mailCustomer(b, "confirmed", "", now);
      return send(res, 200, { booking: await store.saveBooking(b) });
    }

    if (a === "status") {
      const s = String(x.status || "");
      if (!STATUSES.includes(s) || s === b.status) return send(res, 400, { error: "Geçersiz durum" });
      const reason = str(x.reason, 300);
      b.status = s;
      b.history.push({ at: now, text: LABEL[s] + (reason ? ": " + reason : "") });
      if ((s === "confirmed" || s === "declined") && x.notify !== false) await mailCustomer(b, s, reason, now);
      return send(res, 200, { booking: await store.saveBooking(b) });
    }

    if (a === "assign") {
      const leg = x.leg === "back" ? "back" : "out";
      if (leg === "back" && !b.ret) return send(res, 400, { error: "Bu rezervasyonda dönüş yok" });
      b.assign = b.assign || {};
      if (!x.driver) {
        delete b.assign[leg];
        b.history.push({ at: now, text: (leg === "back" ? "Dönüş" : "Gidiş") + " transferinin şoförü kaldırıldı" });
      } else {
        const d = (await store.getDrivers()).find(v => v.id === x.driver);
        if (!d) return send(res, 400, { error: "Şoför bulunamadı" });
        b.assign[leg] = { id: d.id, name: d.name, phone: d.phone, plate: d.plate, car: d.car };
        b.history.push({ at: now, text: (leg === "back" ? "Dönüş" : "Gidiş") + " transferi şoföre verildi: " + d.name + (d.plate ? " (" + d.plate + ")" : "") });
      }
      return send(res, 200, { booking: await store.saveBooking(b) });
    }
    send(res, 400, { error: "Bilinmeyen işlem" });
  } catch (e) {
    console.error(e);
    send(res, e.conflict ? 409 : 500, { error: e.conflict ? e.message : "Sunucu hatası" });
  }
};
