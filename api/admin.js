// Admin API for /admin (Turkish panel).
//   GET  ?a=me                    → {signedIn}
//   GET  ?a=list                  → bookings, newest first
//   POST ?a=login {password}      → sets the session cookie
//   POST ?a=logout
//   POST ?a=status {id, status, reason?}  confirmed → confirmation e-mail, declined → decline e-mail
//   POST ?a=edit {id, driver, adminNote}
const store = require("./_lib/store");
const auth = require("./_lib/auth");
const mail = require("./_lib/mail");
const { STATUSES, str } = require("./_lib/booking");
const { body, ip, send } = require("./_lib/http");

const LABEL = { request: "Talep", confirmed: "Onaylandı", declined: "Reddedildi", done: "Tamamlandı", cancelled: "İptal" };

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

    if (req.method !== "POST") return send(res, 405, { error: "method" });
    const x = await body(req);
    const b = x && await store.getBooking(Number(x.id));
    if (!b) return send(res, 404, { error: "Rezervasyon bulunamadı" });
    // The panel sends the updatedAt it showed, so a change made meanwhile is not overwritten
    if (x.updatedAt && x.updatedAt !== b.updatedAt) return send(res, 409, { error: "Bu rezervasyon bu arada değişti. Listeyi yenileyin." });
    const now = new Date().toISOString();

    if (a === "status") {
      const s = String(x.status || "");
      if (!STATUSES.includes(s) || s === b.status) return send(res, 400, { error: "Geçersiz durum" });
      const reason = str(x.reason, 300);
      b.status = s;
      b.history.push({ at: now, text: LABEL[s] + (reason ? ": " + reason : "") });
      if (s === "confirmed" || s === "declined") {
        try {
          const sent = await mail.toCustomer(b, s, reason);
          b.history.push({ at: now, text: sent ? "Müşteriye e-posta gönderildi" : "E-posta gönderilmedi (RESEND_API_KEY yok)" });
        } catch (e) {
          console.error(e);
          b.history.push({ at: now, text: "E-posta gönderilemedi: " + mail.why(e) });
        }
      }
      return send(res, 200, { booking: await store.saveBooking(b) });
    }
    if (a === "edit") {
      b.driver = str(x.driver, 120);
      b.adminNote = str(x.adminNote, 600);
      b.history.push({ at: now, text: "Şoför/not güncellendi" });
      return send(res, 200, { booking: await store.saveBooking(b) });
    }
    send(res, 400, { error: "Bilinmeyen işlem" });
  } catch (e) {
    console.error(e);
    send(res, e.conflict ? 409 : 500, { error: e.conflict ? e.message : "Sunucu hatası" });
  }
};
