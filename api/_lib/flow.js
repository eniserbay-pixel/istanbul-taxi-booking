// Booking flow: a site booking comes in as Yeni; the office approves it, declines it
// with a reason, or sends the customer a changed booking (degisiklik) that the customer accepts or declines
// from a link in the e-mail. Every step writes to the booking's history, including whether the e-mail went out.
const crypto = require("crypto");
const store = require("./store");
const mail = require("./mail");
const ga = require("./ga");
const telegram = require("./telegram");
const hub = require("./hub");

// Telegram message to the office (_lib/telegram.js), next to the office e-mail; `decide`: with Onayla / Reddet buttons
const tgOffice = (title, b, decide) => telegram.booking(title, b, decide);

const now = () => new Date().toISOString();
function log(b, text) { b.history = (b.history || []).concat([{ at: now(), text }]).slice(-50); }
// History line for an e-mail: sent, failed, or not sent because e-mail is not set up / no address
function mailNote(ok, what, to) {
  if (!mail.configured()) return what + " e-postası gönderilmedi (e-posta ayarı yok)";
  if (!to) return what + " e-postası gönderilmedi (e-posta adresi yok)";
  return what + " e-postası " + (ok ? "gönderildi" : "gönderilemedi") + ": " + to;
}

// New request from the site: one e-mail to the office, one to the customer
async function received(b) {
  const [office, , cust] = await Promise.all([
    mail.send(mail.officeMail("Yeni rezervasyon talebi", b)),
    tgOffice("🆕 Yeni rezervasyon", b, true),
    mail.send(mail.customerMail("received", b))
  ]);
  log(b, mailNote(office, "Ofis bildirim", mail.OFFICE()));
  log(b, mailNote(cust, "Talep alındı", b.customer.email));
  // the office handles it in the Transfer3E panel (_lib/hub.js)
  await hub.push(b);
  b = await store.saveBooking(b);
  await hub.flush().catch(e => console.error(e));
  return b;
}

// `by`: "musteri" (accepted a change), "telegram" (the button under the Telegram message, pressed by `who`), else the panel
async function approve(b, by, who) {
  b.status = "onaylandi";
  delete b.proposal;
  log(b, by === "musteri" ? "Müşteri değişikliği kabul etti, rezervasyon onaylandı" : by === "telegram" ? "Onaylandı (Telegram: " + who + ")" : "Onaylandı");
  const ok = await mail.send(mail.customerMail("approved", b));
  log(b, mailNote(ok, "Onay", b.customer.email));
  await ga.confirmed(b);
  b = await store.saveBooking(b);
  if (by !== "musteri") await tgOffice("✅ Onaylandı" + (by === "telegram" ? " · " + who : ""), b);
  return b;
}

// The booking became Tamamlandı: thank the customer once and ask for a review (Google, Trustpilot).
// Changes `b` (history, thanked) without saving it; the caller saves.
async function completed(b) {
  if (b.status !== "tamamlandi" || b.thanked || !b.customer.email) return b;
  const ok = await mail.send(mail.customerMail("thanks", b));
  if (ok) b.thanked = now();
  log(b, mailNote(ok, "Teşekkür", b.customer.email));
  return b;
}

// `reason` may be empty (Reddedildi pressed in the status buttons without a note)
// "Yorum iste" in the panel: send the same thank-you and review e-mail now, whatever the status, even if it went before
async function askReview(b) {
  const ok = await mail.send(mail.customerMail("thanks", b));
  if (ok) b.thanked = now();
  log(b, mailNote(ok, "Yorum isteği", b.customer.email));
  return store.saveBooking(b);
}

async function reject(b, reason, by, who) {
  b.status = "reddedildi";
  b.rejectReason = reason || "";
  delete b.proposal;
  log(b, "Reddedildi" + (by === "telegram" ? " (Telegram: " + who + ")" : "") + (reason ? ": " + reason : ""));
  const ok = await mail.send(mail.customerMail("rejected", b, { reason }));
  log(b, mailNote(ok, "Red", b.customer.email));
  return store.saveBooking(b);
}

// İptal from the panel's status buttons: e-mail the customer that the booking is cancelled, with the office's note if any
async function cancel(b, reason) {
  b.status = "iptal";
  delete b.proposal;
  log(b, "İptal edildi" + (reason ? ": " + reason : ""));
  const ok = await mail.send(mail.customerMail("cancelled", b, { reason }));
  log(b, mailNote(ok, "İptal", b.customer.email));
  b = await store.saveBooking(b);
  await tgOffice("❌ İptal edildi" + (reason ? ": " + reason : ""), b);
  return b;
}

// `next`: the cleaned booking from the panel's edit form; only the transfer, vehicle and price go into
// the proposal, the booking itself changes when the customer accepts
async function propose(b, next, message) {
  const token = crypto.randomBytes(18).toString("hex");
  b.proposal = {
    legs: next.legs.map((l, i) => Object.assign({}, l, { assign: b.legs[i] ? b.legs[i].assign || null : null })),
    car: next.car, carName: next.carName, total: next.total, currency: next.currency, payment: next.payment,
    message, token, at: now()
  };
  b.status = "degisiklik";
  await store.saveToken(token, b.id);
  log(b, "Değişiklik müşteriye onaya gönderildi" + (message ? ": " + message : ""));
  const link = mail.SITE() + "/booking-change?t=" + token;
  const ok = await mail.send(mail.customerMail("proposal", b, { proposal: b.proposal, link }));
  log(b, mailNote(ok, "Değişiklik", b.customer.email));
  return store.saveBooking(b);
}

// The customer's answer from the booking-change page
async function answer(b, accept) {
  const pr = b.proposal;
  if (accept) {
    ["legs", "car", "carName", "total", "currency", "payment"].forEach(k => { b[k] = pr[k]; });
    b = await approve(b, "musteri");
    await mail.send(mail.officeMail("Müşteri değişikliği kabul etti, rezervasyon onaylandı", b, pr.message ? "Gönderdiğiniz not: " + pr.message : ""));
    await tgOffice("✅ Müşteri değişikliği kabul etti, rezervasyon onaylandı", b);
    return toHub(b);
  }
  b.status = "yeni";
  delete b.proposal;
  log(b, "Müşteri değişikliği kabul etmedi; rezervasyon yeniden değerlendirilecek");
  b = await store.saveBooking(b);
  await mail.send(mail.officeMail("Müşteri değişikliği kabul etmedi", b, "Rezervasyon tekrar Yeni durumuna döndü. Müşteriyle iletişime geçin ya da reddedin."));
  await tgOffice("⚠️ Müşteri değişikliği kabul etmedi, rezervasyon tekrar Yeni", b);
  return toHub(b);
}

// The customer's answer changed the booking: the Transfer3E panel gets it too
async function toHub(b) {
  if (!hub.configured()) return b;
  await hub.push(b);
  return store.saveBooking(b).catch(e => { console.error(e); return b; });
}

module.exports = { received, approve, reject, cancel, askReview, propose, answer, completed };
