// Applications from the Company pages (/company/...): corporate accounts (companies that want transfers for
// their staff), suppliers (transport companies and drivers who want work from us), B2B (agencies that send
// us work) and partnerships (hotels, guides, creators).
// Saved for the panel (Başvurular). The page offers WhatsApp when this fails.
const store = require("./_lib/store");
const { str } = require("./_lib/booking");
const { body, ip, send } = require("./_lib/http");

// Allowed fields per form (see build/company.js), with their maximum length; arrays are lists of short codes
const FIELDS = {
  corporate: { company: 200, sector: 200, name: 200, role: 200, email: 200, phone: 40, volume: 20, msg: 1500 },
  supplier: { stype: 20, company: 200, name: 200, phone: 40, email: 200, city: 200, fleet: 6, classes: [], docs: [], msg: 1500 },
  b2b: { company: 200, ctype: 20, country: 200, website: 200, name: 200, email: 200, phone: 40, volume: 20, msg: 1500 },
  partner: { ptype: 20, company: 200, name: 200, email: 200, phone: 40, website: 200, msg: 1500 }
};
const REQUIRED = { corporate: ["company", "name", "email", "phone"], supplier: ["stype", "name", "phone", "city"], b2b: ["company", "name", "email", "phone"], partner: ["ptype", "name", "email", "phone"] };

module.exports = async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { error: "method" });
  if (!store.configured()) return send(res, 501, { error: "not_configured" });
  const input = await body(req);
  const kind = input && String(input.kind || "");
  if (!FIELDS[kind] || !input.data || typeof input.data !== "object") return send(res, 400, { error: "bad_request" });
  // filled only by bots: answer as if saved
  if (input.hp) return send(res, 200, { ok: true });

  const data = {};
  for (const [k, max] of Object.entries(FIELDS[kind])) {
    const v = input.data[k];
    if (Array.isArray(max)) { if (Array.isArray(v)) data[k] = v.slice(0, 12).map(x => str(x, 20)).filter(Boolean); }
    else if (v != null && str(v, max)) data[k] = str(v, max);
  }
  if (REQUIRED[kind].some(k => !data[k])) return send(res, 400, { error: "missing" });

  try {
    if (!(await store.allow("rl:ap:" + ip(req), 5, 3600))) return send(res, 429, { error: "too_many" });
    const app = await store.createApp({ kind, lang: str(input.lang, 10), data, status: "yeni", note: "" });
    send(res, 200, { ok: true, id: app.id });
  } catch (e) {
    console.error(e);
    send(res, 500, { error: "storage" });
  }
};
