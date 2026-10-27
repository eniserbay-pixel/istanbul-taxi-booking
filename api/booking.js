// Saves a booking from the site as a request (status "request") and e-mails the customer
// ("we received your request") and the office. The office confirms it in /admin.
const store = require("./_lib/store");
const mail = require("./_lib/mail");
const { clean, problems, inPast, P, Q } = require("./_lib/booking");
const { body, ip, send } = require("./_lib/http");

module.exports = async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { error: "method" });
  if (!store.configured()) return send(res, 501, { error: "not_configured" });
  const input = await body(req);
  if (!input) return send(res, 400, { error: "bad_request" });
  // A filled hidden field means a bot
  if (input.website) return send(res, 200, { ok: true });

  const b = clean(input);
  const bad = problems(b);
  if (bad.length) return send(res, 400, { error: "incomplete", fields: bad });
  if (inPast(b)) return send(res, 400, { error: "incomplete", fields: ["when"] });

  try {
    if (!(await store.allow("rl:bk:" + ip(req), 10, 600))) return send(res, 429, { error: "too_many" });
    // The same reference again (double click, resend): keep the first one
    const existing = await store.idForRef(b.ref);
    if (existing) return send(res, 200, { ok: true, ref: b.ref });

    b.price = Q.quote(P, b);
    b.currency = P.currency;
    b.status = "request";
    b.driver = "";
    b.adminNote = "";
    b.history = [{ at: new Date().toISOString(), text: "Siteden talep geldi" }];
    const saved = await store.createBooking(b);
    // A mail problem is written to the booking's history; the request itself is saved
    const results = await Promise.allSettled([mail.toCustomer(saved, "received"), mail.toOffice(saved)]);
    const failed = results.filter(r => r.status === "rejected");
    if (failed.length) {
      failed.forEach(f => console.error(f.reason));
      saved.history.push({ at: new Date().toISOString(), text: "E-posta gönderilemedi: " + failed.map(f => mail.why(f.reason)).join(" / ") });
      await store.saveBooking(saved).catch(e => console.error(e));
    }
    send(res, 200, { ok: true, ref: saved.ref });
  } catch (e) {
    console.error(e);
    send(res, 500, { error: "storage" });
  }
};
