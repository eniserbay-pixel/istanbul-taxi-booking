// Saves a booking from the site's booking form as Yeni for the office to approve, and
// e-mails the office and the customer (see _lib/flow.js). The form offers WhatsApp when this fails.
const store = require("./_lib/store");
const flow = require("./_lib/flow");
const { clean, problems, LEAD_ID, str } = require("./_lib/booking");
const { body, ip, send } = require("./_lib/http");
const stats = require("./_lib/stats");
const itb = require("./_lib/itb");

// Kaynak of a site booking: an ad click id names the ad network (Google Ads ...); otherwise the source as
// Site Analitiği groups it, with "reklam" when utm_medium says the link was paid, and the utm_campaign.
// fbclid also comes on unpaid Facebook and Instagram links, so it only names the site when there is no referrer.
const ADS = { g: "Google Ads", b: "Microsoft Ads", t: "TikTok Ads" };
function origin(o) {
  const k = String(o.k || ""), med = String(o.m || "").toLowerCase(), camp = str(o.c, 60);
  let src = ADS[k] || stats.source(String(o.u || ""), String(o.r || ""));
  src = src.charAt(0).toUpperCase() + src.slice(1);
  if (!ADS[k] && src === "Direkt" && k === "f") src = "Facebook / Instagram";
  if (!ADS[k] && /^(cpc|ppc|paid|paid[_ -]?social|paidsocial|social[_ -]?paid|ads?|cpm|display|banner|sponsored)$/.test(med)) src += " reklam";
  return Object.assign({ src, page: stats.path(o.p) }, camp ? { camp } : {});
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { error: "method" });
  if (!store.configured()) return send(res, 501, { error: "not_configured" });
  const input = await body(req);
  if (!input) return send(res, 400, { error: "bad_request" });

  // a bot filled the hidden field
  if (input.website) return send(res, 200, { ok: true });
  const site = await itb.fromSite(input);
  if (site.error) return send(res, 400, { error: site.error });
  const b = clean(site.booking);
  b.status = "yeni";
  b.adminNote = "";
  b.partner = "";
  b.legs.forEach(l => { l.assign = null; l.cost = 0; });
  if (problems(b).length) return send(res, 400, { error: "incomplete" });

  try {
    if (!(await store.allow("rl:bk:" + ip(req), 10, 600))) return send(res, 429, { error: "too_many" });
    // Same reference from the same customer: a resend, keep the first one.
    // Two customers can draw the same random reference on one day, so the phone has to match too.
    // The customer finished: their half-filled form leaves the call list
    if (LEAD_ID.test(String(input.lead || ""))) await store.finishLead(String(input.lead)).catch(e => console.error(e));
    const existing = await store.idForRef(b.ref);
    const prev = existing && await store.getBooking(existing);
    if (prev && prev.customer.phone === b.customer.phone && prev.customer.email === b.customer.email) return send(res, 200, { ok: true, id: prev.id });
    b.source = "site";
    // Where the visitor came from (sent by src/seo/consent.js): Google, ChatGPT, Direkt, a utm_source or the
    // referring site, and the first page they saw; the panel shows it in the Kaynak column
    const o = input.origin && typeof input.origin === "object" ? input.origin : null;
    if (o) b.origin = origin(o);
    b.history = [{ at: new Date().toISOString(), text: "Siteden geldi" }];
    const saved = await store.createBooking(b);
    // E-mail problems are written to the booking's history; the request itself is saved
    await flow.received(saved).catch(e => console.error(e));
    send(res, 200, { ok: true, id: saved.id, mail: !!b.customer.email });
  } catch (e) {
    console.error(e);
    send(res, 500, { error: "storage" });
  }
};
