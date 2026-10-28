// Saves what a customer has typed into the site's booking form before they finish it, so the
// office can call them back (panel: Aranacaklar). The form ignores any failure here.
// Also takes the site's page views and clicks (POST /api/hit, rewritten to /api/lead?hit=1 in vercel.json),
// counted by _lib/stats.js for the panel's Site Analitiği; kept in this function to save a function slot.
const store = require("./_lib/store");
const stats = require("./_lib/stats");
const { cleanLead, reachable } = require("./_lib/booking");
const { body, ip, send } = require("./_lib/http");

module.exports = async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { error: "method" });
  if (!store.configured()) return send(res, 501, { error: "not_configured" });
  if (String(req.url || "").indexOf("hit=1") >= 0 || req.query && req.query.hit) {
    const h = await body(req, 2000);
    try {
      if (await store.allow("rl:hit:" + ip(req), 300, 600)) await stats.record(req, h);
    } catch (e) { console.error(e); }
    res.statusCode = 204;
    res.setHeader("Cache-Control", "no-store");
    return res.end();
  }
  const input = await body(req);
  if (!input) return send(res, 400, { error: "bad_request" });
  const l = cleanLead(input);
  if (!l.id) return send(res, 400, { error: "bad_id" });
  if (!reachable(l)) return send(res, 400, { error: "no_contact" });

  try {
    if (!(await store.allow("rl:ld:" + ip(req), 60, 600))) return send(res, 429, { error: "too_many" });
    if (await store.leadDone(l.id)) return send(res, 200, { ok: true });
    const prev = await store.getLead(l.id);
    const now = new Date().toISOString();
    // The office's own fields stay as they were
    const next = Object.assign(l, {
      status: prev ? prev.status : "aranacak", note: prev ? prev.note : "",
      createdAt: prev ? prev.createdAt : now, updatedAt: now
    });
    await store.saveLead(next);
    send(res, 200, { ok: true });
  } catch (e) {
    console.error(e);
    send(res, 500, { error: "storage" });
  }
};
