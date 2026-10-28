// Calls from the Transfer3E panel, where the office handles this site's bookings (_lib/hub.js). Signed; POST
//   {action: "mail", id, kind, reason, booking}   kind: confirmed / rejected / cancelled / thanks. Saves the booking
//                                                as the panel has it and e-mails the customer from here (the
//                                                approval with this site's voucher). Answers {ok, mail, booking}.
//   {action: "sync", id, booking}                 an edit made in the panel: saved here, no e-mail
//   {action: "voucher", id, lang, booking}        the voucher PDF of the booking as the panel has it
const store = require("./_lib/store");
const mail = require("./_lib/mail");
const ga = require("./_lib/ga");
const hub = require("./_lib/hub");
const { clean } = require("./_lib/booking");
const { body, send } = require("./_lib/http");

const KIND = { confirmed: "approved", rejected: "rejected", cancelled: "cancelled", thanks: "thanks" };
const WHAT = { confirmed: "Onay (voucher)", rejected: "Red", cancelled: "İptal", thanks: "Teşekkür" };
const now = () => new Date().toISOString();
function log(b, text) { b.history = (b.history || []).concat([{ at: now(), text }]).slice(-50); }

// What the panel decides about a booking, written over the booking here; the office's own fields here (driver,
// supplier fee, U-ETDS ...) stay, since the panel keeps its own
function merge(b, x) {
  const legs = (Array.isArray(x.legs) ? x.legs : []).map((l, i) => Object.assign({}, b.legs[i] || {}, l, {
    assign: (b.legs[i] || {}).assign || null, cost: (b.legs[i] || {}).cost || 0, costTry: (b.legs[i] || {}).costTry || 0,
    uetds: (b.legs[i] || {}).uetds || null, done: (b.legs[i] || {}).done || ""
  }));
  const keep = { car: b.car, currency: b.currency, partner: b.partner, partnerRef: b.partnerRef, cashCur: b.cashCur, adminNote: b.adminNote, hourly: b.hourly, ga: b.ga };
  const c = clean(Object.assign({}, b, x, keep, { legs }));
  Object.assign(b, c);
  if (x.rejectReason) b.rejectReason = String(x.rejectReason).slice(0, 1000);
  return b;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { error: "method" });
  // the signature covers the JSON as the panel wrote it, which parsing and writing it again gives back
  const input = await body(req, 300000);
  if (!input || !hub.verify(req.headers, JSON.stringify(input))) return send(res, 401, { error: "unauthorized" });
  const x = input.booking;
  if (!x || typeof x !== "object" || !["mail", "sync", "voucher"].includes(input.action)) return send(res, 400, { error: "bad_request" });
  const kind = KIND[input.kind], reason = String(input.reason || "").slice(0, 1000);
  if (input.action === "mail" && !kind) return send(res, 400, { error: "bad_kind" });

  try {
    let sent = null;
    const lines = [];
    // a write elsewhere at the same moment (the customer's link, this site's panel) is read again once
    for (let attempt = 0; attempt < 2; attempt++) {
      const b = await store.getBooking(+input.id);
      if (!b) return send(res, 404, { error: "Rezervasyon bu sitede bulunamadı" });
      merge(b, x);

      if (input.action === "voucher") {
        const pdf = await mail.voucherPdf(b, String(input.lang || ""));
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/pdf");
        return res.end(pdf);
      }
      // the e-mail goes out once; a second attempt only writes the same lines on the fresh booking
      if (!attempt) {
        if (input.action === "mail") {
          lines.push("Transfer3E panelinden: " + WHAT[input.kind] + (reason ? ": " + reason : ""));
          if (input.kind === "rejected") b.rejectReason = reason;
          if (b.customer.email && mail.configured()) {
            sent = await mail.send(mail.customerMail(kind, b, { reason }));
            lines.push(WHAT[input.kind] + " e-postası " + (sent ? "gönderildi" : "gönderilemedi") + ": " + b.customer.email);
          } else lines.push(WHAT[input.kind] + " e-postası gönderilmedi (" + (b.customer.email ? "e-posta ayarı yok" : "e-posta adresi yok") + ")");
          if (input.kind === "confirmed") await ga.confirmed(b).catch(e => console.error(e));
        } else lines.push("Transfer3E panelinde güncellendi");
      }
      if (input.action === "mail") delete b.proposal;
      if (input.kind === "rejected") b.rejectReason = reason;
      if (sent && input.kind === "thanks") b.thanked = now();
      lines.forEach(l => log(b, l));
      try {
        const saved = await store.saveBooking(b);
        return send(res, 200, { ok: true, mail: sent, booking: saved });
      } catch (e) {
        if (!e.conflict || attempt) throw e;
      }
    }
  } catch (e) {
    console.error(e);
    return send(res, 500, { error: "storage" });
  }
};
