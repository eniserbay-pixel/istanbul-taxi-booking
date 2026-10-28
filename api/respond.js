// The customer's answer to a booking change the office sent (page: /booking-change?t=<token>).
//   GET  ?t=<token>            the original and the changed booking, with the page texts in the booking's language
//   POST {t, answer}           answer: "accept" (the booking is confirmed) or "decline" (back to the office)
const store = require("./_lib/store");
const flow = require("./_lib/flow");
const mail = require("./_lib/mail");
const { body, ip, send } = require("./_lib/http");

const TOKEN = /^[a-f0-9]{36}$/;
const PAGE_KEYS = ["pg_t", "pg_cur", "pg_new", "pg_ok", "pg_dec", "pg_bad", "pg_err", "pg_conf", "pg_q", "acc", "dec", "note", "foot"];

function view(b, t) {
  const lang = mail.langOf(b), T = mail.texts(lang);
  const out = { lang, dir: lang === "ar" ? "rtl" : "ltr", text: {}, ref: b.ref || "#" + b.id };
  PAGE_KEYS.forEach(k => { out.text[k] = T[k]; });
  const pr = b.proposal;
  if (pr && pr.token === t) {
    out.state = "open";
    out.message = pr.message || "";
    out.proposed = mail.detailsHtml(Object.assign({}, b, pr), lang, b);
    out.current = mail.detailsHtml(b, lang);
  } else {
    // Link of an earlier change: the page only says where the booking stands now
    out.state = b.status === "onaylandi" || b.status === "tamamlandi" ? "confirmed" : "closed";
  }
  return out;
}

module.exports = async (req, res) => {
  if (!store.configured()) return send(res, 501, { error: "not_configured" });
  const q = new URL(req.url, "http://x").searchParams;
  const input = req.method === "POST" ? (await body(req) || {}) : {};
  const t = String(req.method === "POST" ? input.t || "" : q.get("t") || "");
  try {
    if (!(await store.allow("rl:rs:" + ip(req), 30, 600))) return send(res, 429, { error: "too_many" });
    const id = TOKEN.test(t) && await store.idForToken(t);
    const b = id && await store.getBooking(+id);
    if (!b) return send(res, 404, { error: "not_found", text: mail.texts("en") });
    if (req.method === "GET") return send(res, 200, view(b, t));
    if (req.method !== "POST") return send(res, 405, { error: "method" });
    if (!b.proposal || b.proposal.token !== t) return send(res, 409, view(b, t));
    if (input.answer !== "accept" && input.answer !== "decline") return send(res, 400, { error: "bad_answer" });
    const next = await flow.answer(b, input.answer === "accept");
    send(res, 200, Object.assign(view(next, t), { state: input.answer === "accept" ? "accepted" : "declined" }));
  } catch (e) {
    console.error(e);
    send(res, 500, { error: "server" });
  }
};
