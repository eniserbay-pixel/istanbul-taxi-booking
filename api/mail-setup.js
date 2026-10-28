// E-mail domain setup on Resend. Once RESEND_API_KEY is set, opening /api/mail-setup adds the site's domain
// to Resend if it is not there yet, asks Resend to check the DNS records, and lists the records it needs
// (they go on the domain's DNS in Vercel). Returns no secrets: the records are public DNS entries anyway.
const store = require("./_lib/store");
const mail = require("./_lib/mail");
const { ip, send } = require("./_lib/http");

const DOMAIN = "istanbultaxibooking.com";

module.exports = async (req, res) => {
  if (!mail.configured()) return send(res, 200, { configured: false });
  try {
    if (store.configured() && !(await store.allow("rl:ms:" + ip(req), 10, 600))) return send(res, 429, { error: "too_many" });
    const list = await mail.resend("/domains");
    let d = (list.data || []).find(x => x.name === DOMAIN);
    if (!d) d = await mail.resend("/domains", "POST", { name: DOMAIN, region: "eu-west-1" });
    else {
      if (d.status !== "verified") await mail.resend("/domains/" + d.id + "/verify", "POST").catch(() => {});
      d = await mail.resend("/domains/" + d.id);
    }
    send(res, 200, {
      configured: true, domain: d.name, status: d.status,
      records: (d.records || []).map(r => ({ type: r.type, name: r.name, value: r.value, priority: r.priority, status: r.status }))
    });
  } catch (e) {
    console.error(e);
    send(res, 502, { configured: true, error: e.message });
  }
};
