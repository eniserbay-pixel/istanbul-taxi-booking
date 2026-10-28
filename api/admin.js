// Back-office API for the panel at /admin. One function, the action comes in ?a=...
//   GET  me                  sign-in state and which settings are missing
//   POST login {password}    POST logout
//   GET  list                every booking, newest first (the panel filters in the browser)
//   GET  names               place and vehicle names in the site's languages (_lib/names.json), for the WhatsApp confirmation
//   GET  voucher&id=[&lang=] the booking's voucher PDF (the one the approval e-mail attaches), as a download
//   POST create {booking}    manual booking
//   POST update {id, booking}
//   POST status {ids, status}      (no e-mail, except the thank-you below)
//   POST status {ids: [id], status, notify: true, reason}   the booking drawer's status buttons: Onaylandı sends the
//                                  voucher e-mail, Reddedildi the decline and İptal the cancellation (with `reason` if given)
//   (status, update and done: a booking that becomes Tamamlandı e-mails the customer a thank-you with review links, once,
//    in English, or Russian / French / Italian / German for +7 / +33 / +39 / +41 phone numbers)
//   GET  tg                  Telegram: the bot's username and the chats that get booking messages (_lib/telegram.js)
//   POST tglink              a one-time link that connects a Telegram chat; POST tgcheck adds the chats that used it
//   POST tgdel {id}          stop messages to a chat;  POST tgtest  send a test message
//   POST review {id}             "Yorum iste": e-mail the customer the thank-you with review links now (any status, again if asked)
//   POST approve {id}             approve a request, e-mails the customer
//   POST reject {id, reason}      decline a request with a reason, e-mails the customer
//   POST propose {id, booking, message}  send a changed booking to the customer to accept or decline
//   GET  resources           vehicles: own fleet, supplier agencies (with their vehicles), independent drivers
//   POST resources {list}    replace that list
//   GET  fx                  TL rates for EUR, USD, GBP (Operasyonlar shows supplier fees in TL; _lib/fx.js)
//   GET  fxinfo              Döviz Kurları: the bank's rates and the office's own ones ({ bank, manual })
//   POST fxset {manual}      the office's own EUR and USD rates in TL, and whether they are used ({on, EUR, USD})
//   GET  stats&days=         Site Analitiği: page views, visits, countries, sources, clicks of the last days (_lib/stats.js)
//   GET  gsc&days=[&fresh=1] Google Search Console: search words, pages, countries (7, 28 or 90 days; _lib/gsc.js)
//   POST cost {id, leg, try}      supplier fee of a leg typed in TL on Operasyonlar; saved as costTry and, at today's
//                                  rate, as cost in the booking's currency (what Raporlar counts)
//   POST done {id, leg, done}    mark a transfer leg done on Operasyonlar (or take it back); when every leg is done the
//                                  booking becomes Tamamlandı, and its cash fare counts as collected in Raporlar
//   GET  suppays             payments settled with suppliers (Araç/Tedarik → Finans)
//   POST suppay {pay}        record one ({res, amounts: {TRY, EUR ...}, note}); "Ödendi" sends the balance, zeroing it
//   POST suppaydel {id}      delete one
//   POST assign {id, leg, resId}   give a transfer leg to a vehicle, an agency or an agency's vehicle (empty resId clears it)
//   GET  leads               bookings started on the site but not finished, newest first
//   POST lead {id, status, note}   call status and note for one of them
//   POST leaddel {id}        remove one from the list
//   GET  apps                applications from the corporate pages (supplier, b2b), newest first
//   POST app {id, status, note}    status and note for one of them
//   POST appdel {id}         delete one
//   GET  partners            B2B partners: hotels, clinics/hospitals, agencies, MICE companies (_lib/partner.js)
//   POST partner {partner}   add one (no id) or update one
//   POST partnerdel {id}     delete one
//   GET  pricing             zones, vehicle types and prices of the booking form (+ the original defaults)
//   POST pricing {pricing}   replace them (see _lib/pricing.js)
//   GET  b2bpricing          B2B route prices, surcharges and chauffeur packages (same zones and vehicles as the site)
//   POST b2bpricing {pricing}  replace them
//        both take a partner (…&partner=<id>, {partner}) for that partner's own list, in its currency (EUR, USD, TRY)
//   GET  b2blists            partners that have their own list: { id: { currency, updatedAt, routes } }
//   POST b2bdel {partner}    delete a partner's own list
//   GET  b2bauth             partners that can sign in to the B2B booking page: { id: date the password was made }
//   POST b2bpass {partner}   make a new password for a partner (returned once; the old one stops working)
//   POST b2boff {partner}    turn a partner's sign-in off (_lib/b2bauth.js; partnerdel does it too)
//   POST vimg {data}         upload a vehicle image (data URL), returns its url
//   GET  blogs               blog posts written in the panel (without their text) + categories, places, site pages
//   GET  blog&id=            one post
//   POST blogsave {post}     create or update a post (see _lib/blog.js); returns it with its live URL
//   POST blogdel {id}        delete a post
//   POST blogpreview {post}  the post's page as it would look on the site (not saved)
//   POST bimg {data}         upload a blog picture (data URL), returns its url
//   POST blogtranslate {id, lang, publish}  a translation of a saved post into another site language, live when publish
//                                  is set, else a draft; an existing draft in that language is published (_lib/translate.js)
//   POST autofill {text, files, places, cars}  Manuel Rezervasyon → Otomatik doldur: the booking read out of a pasted or
//                                  dictated message and tickets (images, PDF) by Claude, for the form; nothing is saved (_lib/autofill.js)
//   (create also takes {lead}: the lead the manual booking was made from, removed from the list)
const store = require("./_lib/store");
const flow = require("./_lib/flow");
const mail = require("./_lib/mail");
const telegram = require("./_lib/telegram");
const pricing = require("./_lib/pricing");
const blog = require("./_lib/blog");
const blogpage = require("./_lib/blogpage");
const auth = require("./_lib/auth");
const partner = require("./_lib/partner");
const b2bauth = require("./_lib/b2bauth");
const { STATUSES, LEAD_ID, LEAD_STATUSES, clean, problems, cleanResource, assignables, cleanSupPay, str } = require("./_lib/booking");
const { body, ip, send } = require("./_lib/http");

const STATUS_TR = { talep: "Talep", degisiklik: "Müşteri onayı bekliyor", yeni: "Yeni", onaylandi: "Onaylandı", tamamlandi: "Tamamlandı", reddedildi: "Reddedildi", iptal: "İptal" };
const APP_STATUSES = ["yeni", "gorusuldu", "anlasildi", "olumsuz"];
const now = () => new Date().toISOString();

module.exports = async (req, res) => {
  const a = String(req.query && req.query.a || new URL(req.url, "http://x").searchParams.get("a") || "");
  const ready = { password: !!process.env.ADMIN_PASSWORD, storage: store.configured(), mail: mail.configured() };

  // Telegram's webhook (_lib/telegram.js checks its secret header)
  if (a === "tghook" && req.method === "POST") {
    const ok = await telegram.hook(await body(req), req.headers["x-telegram-bot-api-secret-token"]).catch(e => { console.error(e); return true; });
    return send(res, ok ? 200 : 403, { ok });
  }
  // Vercel cron (vercel.json), every evening: tomorrow's transfers to Telegram. With CRON_SECRET set, Vercel sends it as a bearer token.
  if (a === "tgdaily" && req.method === "GET") {
    const sec = process.env.CRON_SECRET;
    if (sec ? req.headers.authorization !== "Bearer " + sec : !/vercel-cron/.test(String(req.headers["user-agent"] || ""))) return send(res, 403, { error: "forbidden" });
    return send(res, 200, { ok: await telegram.daily().catch(e => { console.error(e); return false; }) });
  }
  // Every few minutes from .github/workflows/telegram-tick.yml: half-finished site bookings. Open to anyone, but each item is sent only once, and calls are limited.
  if (a === "tgtick" && req.method === "GET") {
    if (!store.configured() || !(await store.allow("rl:tgtick", 3, 60))) return send(res, 429, { error: "too_many" });
    return send(res, 200, await telegram.tick().catch(e => { console.error(e); return { error: "failed" }; }));
  }
  if (req.method === "POST" && req.headers["x-iap-admin"] !== "1") return send(res, 403, { error: "forbidden" });

  try {
    if (a === "me") return send(res, 200, { signedIn: auth.signedIn(req), ready });

    if (a === "login" && req.method === "POST") {
      if (!ready.password) return send(res, 501, { error: "Vercel'de ADMIN_PASSWORD tanımlı değil" });
      if (ready.storage && !(await store.allow("rl:login:" + ip(req), 8, 900))) return send(res, 429, { error: "Çok fazla deneme. 15 dakika sonra tekrar deneyin." });
      const input = await body(req) || {};
      if (!auth.passwordOk(input.password)) return send(res, 401, { error: "Şifre yanlış" });
      auth.setSession(req, res);
      return send(res, 200, { ok: true });
    }
    if (a === "logout" && req.method === "POST") { auth.clearSession(req, res); return send(res, 200, { ok: true }); }

    if (!auth.signedIn(req)) return send(res, 401, { error: "Oturum kapalı" });
    if (!ready.storage) return send(res, 501, { error: "Veritabanı bağlı değil" });

    if (a === "voucher" && req.method === "GET") {
      const q = new URL(req.url, "http://x").searchParams;
      const b = await store.getBooking(+(req.query && req.query.id || q.get("id")));
      if (!b) return send(res, 404, { error: "Rezervasyon bulunamadı" });
      const buf = await mail.voucherPdf(b, String(req.query && req.query.lang || q.get("lang") || ""));
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Cache-Control", "no-store");
      res.setHeader("Content-Disposition", 'attachment; filename="voucher-' + String(b.ref || b.id).replace(/[^A-Za-z0-9-]/g, "") + '.pdf"');
      return res.end(buf);
    }
    if (a === "list" && req.method === "GET") return send(res, 200, { bookings: await store.listBookings() });
    if (a === "names" && req.method === "GET") return send(res, 200, { names: require("./_lib/names.json") });

    if (a === "create" && req.method === "POST") {
      const input = await body(req) || {};
      const b = clean(input.booking);
      const bad = problems(b);
      if (bad.length) return send(res, 400, { error: bad.join(", ") });
      b.source = "manuel";
      const lead = LEAD_ID.test(String(input.lead || "")) ? String(input.lead) : "";
      b.history = [{ at: now(), text: lead ? "Yarım kalan site rezervasyonundan eklendi" : "Panelden eklendi" }];
      const saved = await store.createBooking(b);
      if (lead) await store.finishLead(lead);
      return send(res, 200, { booking: saved });
    }

    if (a === "update" && req.method === "POST") {
      const input = await body(req) || {};
      const prev = await store.getBooking(+input.id);
      if (!prev) return send(res, 404, { error: "Rezervasyon bulunamadı" });
      // the panel sends the booking as it was when the form opened; a change made since (an assignment, a status) is not overwritten
      const base = input.booking && input.booking.updatedAt;
      if (base && prev.updatedAt && base !== prev.updatedAt) return send(res, 409, { error: "Bu rezervasyon siz düzenlerken değişti (" + ((prev.history || []).slice(-1)[0] || {}).text + "). Sayfayı yenileyip değişikliği tekrar yapın." });
      const b = clean(input.booking);
      const bad = problems(b);
      if (bad.length) return send(res, 400, { error: bad.join(", ") });
      const next = Object.assign({}, prev, b, { id: prev.id, ref: prev.ref || b.ref, source: prev.source, createdAt: prev.createdAt });
      next.history = (prev.history || []).concat(
        prev.status !== next.status ? [{ at: now(), text: "Durum: " + STATUS_TR[next.status] }] : [],
        // UETDS Bildirimi screen: a leg marked as reported (or taken back)
        next.legs.map((l, i) => {
          const was = !!(prev.legs[i] && prev.legs[i].uetds && prev.legs[i].uetds.done), is = !!(l.uetds && l.uetds.done);
          const which = next.legs.length > 1 ? (i ? " (dönüş)" : " (gidiş)") : "";
          return was === is ? null : { at: now(), text: (is ? "UETDS bildirildi" + (l.uetds.ref ? ": " + l.uetds.ref : "") : "UETDS bildirimi geri alındı") + which };
        }).filter(Boolean),
        [{ at: now(), text: "Düzenlendi" }]
      ).slice(-50);
      if (prev.status !== "tamamlandi") await flow.completed(next);
      return send(res, 200, { booking: await store.saveBooking(next) });
    }

    if (a === "status" && req.method === "POST") {
      const input = await body(req) || {};
      if (!STATUSES.includes(input.status)) return send(res, 400, { error: "Geçersiz durum" });
      const ids = (Array.isArray(input.ids) ? input.ids : []).slice(0, 500).map(Number).filter(Boolean);
      const out = [];
      const notify = { onaylandi: b => flow.approve(b), reddedildi: b => flow.reject(b, str(input.reason, 1000)), iptal: b => flow.cancel(b, str(input.reason, 1000)) }[input.status];
      if (input.notify && notify && ids.length === 1) {
        const b = await store.getBooking(ids[0]);
        if (!b) return send(res, 404, { error: "Rezervasyon bulunamadı" });
        return send(res, 200, { bookings: [b.status === input.status ? b : await notify(b)] });
      }
      for (const id of ids) {
        const b = await store.getBooking(id);
        if (!b || b.status === input.status) { if (b) out.push(b); continue; }
        b.status = input.status;
        b.history = (b.history || []).concat([{ at: now(), text: "Durum: " + STATUS_TR[b.status] }]).slice(-50);
        await flow.completed(b);
        out.push(await store.saveBooking(b));
        const tgTitle = { onaylandi: "✅ Onaylandı", iptal: "❌ İptal edildi", tamamlandi: "🏁 Transfer tamamlandı" }[b.status];
        if (tgTitle) await telegram.booking(tgTitle, b);
      }
      return send(res, 200, { bookings: out });
    }

    if (a === "tg" && req.method === "GET") return send(res, 200, await telegram.info());
    if (a === "tglink" && req.method === "POST") return send(res, 200, await telegram.linkCode("https://" + String(req.headers["x-forwarded-host"] || req.headers.host || "").split(",")[0].trim() || mail.SITE()));
    if (a === "tgcheck" && req.method === "POST") return send(res, 200, await telegram.claim());
    if (a === "tgdel" && req.method === "POST") { const input = await body(req) || {}; return send(res, 200, { chats: await telegram.remove(input.id) }); }
    if (a === "tgtest" && req.method === "POST") return send(res, 200, { ok: await telegram.notify("🔔 Deneme mesajı: ITB Transfer panelinden gönderildi.") });

    if (a === "review" && req.method === "POST") {
      const input = await body(req) || {};
      const b = await store.getBooking(+input.id);
      if (!b) return send(res, 404, { error: "Rezervasyon bulunamadı" });
      if (!b.customer.email) return send(res, 400, { error: "Müşterinin e-posta adresi yok" });
      if (!mail.configured()) return send(res, 400, { error: "E-posta gönderimi kapalı (RESEND_API_KEY yok)" });
      return send(res, 200, { booking: await flow.askReview(b) });
    }

    if ((a === "approve" || a === "reject" || a === "propose") && req.method === "POST") {
      const input = await body(req) || {};
      const b = await store.getBooking(+input.id);
      if (!b) return send(res, 404, { error: "Rezervasyon bulunamadı" });
      if (a === "approve") return send(res, 200, { booking: await flow.approve(b) });
      if (a === "reject") {
        const reason = str(input.reason, 1000);
        if (!reason) return send(res, 400, { error: "Red nedeni gerekli" });
        return send(res, 200, { booking: await flow.reject(b, reason) });
      }
      if (!b.customer.email) return send(res, 400, { error: "Müşterinin e-posta adresi yok; değişikliği telefonla iletip Düzenle ile kaydedin" });
      const next = clean(input.booking);
      const bad = problems(next);
      if (bad.length) return send(res, 400, { error: bad.join(", ") });
      return send(res, 200, { booking: await flow.propose(b, next, str(input.message, 1000)) });
    }

    if (a === "resources" && req.method === "GET") return send(res, 200, { resources: (await store.getResources()).map(cleanResource) });

    if (a === "fx" && req.method === "GET") {
      try { return send(res, 200, await require("./_lib/fx").rates()); }
      catch (e) { return send(res, 502, { error: "Döviz kuru alınamadı" }); }
    }
    if (a === "stats" && req.method === "GET") {
      const q = new URL(req.url, "http://x").searchParams;
      return send(res, 200, await require("./_lib/stats").read(q.get("days")));
    }
    if (a === "gsc" && req.method === "GET") {
      const gsc = require("./_lib/gsc"), q = new URL(req.url, "http://x").searchParams;
      if (!gsc.configured()) return send(res, 200, { configured: false, site: gsc.SITE() });
      try { return send(res, 200, Object.assign({ configured: true }, await gsc.report(q.get("days"), q.get("fresh") === "1"))); }
      catch (e) { console.error(e); return send(res, 200, { configured: true, site: gsc.SITE(), error: e.message }); }
    }
    if (a === "fxinfo" && req.method === "GET") {
      const fx = require("./_lib/fx");
      const [bank, man] = await Promise.all([fx.auto().catch(() => null), fx.manual()]);
      return send(res, 200, { bank, manual: man });
    }
    if (a === "fxset" && req.method === "POST") {
      const input = await body(req) || {};
      try { return send(res, 200, { manual: await require("./_lib/fx").setManual(input.manual), fx: await require("./_lib/fx").rates().catch(() => null) }); }
      catch (e) { if (e.user) return send(res, 400, { error: e.message }); throw e; }
    }

    if (a === "resources" && req.method === "POST") {
      const input = await body(req) || {};
      const list = (Array.isArray(input.list) ? input.list : []).slice(0, 300).map(cleanResource).filter(r => r.name);
      return send(res, 200, { resources: await store.saveResources(list) });
    }

    if (a === "assign" && req.method === "POST") {
      const input = await body(req) || {};
      const b = await store.getBooking(+input.id);
      const leg = b && b.legs[+input.leg || 0];
      if (!leg) return send(res, 404, { error: "Rezervasyon bulunamadı" });
      let label = "";
      if (input.resId) {
        const r = assignables((await store.getResources()).map(cleanResource)).find(x => x.id === String(input.resId));
        if (!r) return send(res, 404, { error: "Araç veya acente bulunamadı" });
        leg.assign = r;
        label = leg.assign.label;
      } else {
        leg.assign = null;
      }
      const which = b.legs.length > 1 ? (+input.leg ? " (dönüş)" : " (gidiş)") : "";
      b.history = (b.history || []).concat([{ at: now(), text: (label ? "Atandı: " + label : "Atama kaldırıldı") + which }]).slice(-50);
      return send(res, 200, { booking: await store.saveBooking(b) });
    }

    if (a === "done" && req.method === "POST") {
      const input = await body(req) || {};
      const b = await store.getBooking(+input.id);
      const leg = b && b.legs[+input.leg || 0];
      if (!leg) return send(res, 404, { error: "Rezervasyon bulunamadı" });
      const which = b.legs.length > 1 ? (+input.leg ? " (dönüş)" : " (gidiş)") : "";
      const log = text => { b.history = (b.history || []).concat([{ at: now(), text }]).slice(-50); };
      let tgDone = "";
      if (input.done) {
        leg.done = leg.done || now();
        log("Transfer tamamlandı" + which);
        tgDone = "🏁 Transfer tamamlandı" + which;
        // a booking that was marked Tamamlandı before legs had their own mark counts every leg as done
        if (b.status !== "tamamlandi" && b.legs.every(l => l.done)) { b.status = "tamamlandi"; log("Durum: " + STATUS_TR.tamamlandi); await flow.completed(b); }
      } else {
        if (b.status === "tamamlandi") { b.legs.forEach(l => { l.done = l.done || b.updatedAt || now(); }); b.status = "onaylandi"; log("Durum: " + STATUS_TR.onaylandi); }
        leg.done = "";
        log("Tamamlandı işareti kaldırıldı" + which);
      }
      const saved = await store.saveBooking(b);
      if (tgDone) await telegram.booking(tgDone, saved);
      return send(res, 200, { booking: saved });
    }

    if (a === "suppays" && req.method === "GET") return send(res, 200, { pays: await store.getSupPays() });
    if (a === "suppay" && req.method === "POST") {
      const input = await body(req) || {};
      const p = cleanSupPay(Object.assign({}, input.pay, { id: "", at: "" }));
      if (!p.res || !Object.keys(p.amounts).length) return send(res, 400, { error: "Tedarikçi ve tutar gerekli" });
      const list = (await store.getSupPays()).concat([p]).slice(-3000);
      return send(res, 200, { pays: await store.saveSupPays(list) });
    }
    if (a === "suppaydel" && req.method === "POST") {
      const input = await body(req) || {};
      const list = (await store.getSupPays()).filter(p => p.id !== String(input.id || ""));
      return send(res, 200, { pays: await store.saveSupPays(list) });
    }

    if (a === "cost" && req.method === "POST") {
      const input = await body(req) || {};
      const b = await store.getBooking(+input.id);
      const leg = b && b.legs[+input.leg || 0];
      if (!leg) return send(res, 404, { error: "Rezervasyon bulunamadı" });
      const tl = Math.max(0, Math.round((+input.try || 0) * 100) / 100);
      let rate = 1;
      if (b.currency !== "TRY" && tl) {
        try { rate = (await require("./_lib/fx").rates()).rates[b.currency]; } catch (e) { rate = 0; }
        if (!rate) return send(res, 502, { error: "Döviz kuru alınamadı, tutarı Düzenle'den " + b.currency + " olarak girin" });
      }
      leg.costTry = tl;
      leg.cost = Math.round(tl / rate * 100) / 100;
      const which = b.legs.length > 1 ? (+input.leg ? " (dönüş)" : " (gidiş)") : "";
      b.history = (b.history || []).concat([{ at: now(), text: "Tedarik ödemesi: " + (tl ? tl.toLocaleString("tr-TR") + " TL" : "silindi") + which }]).slice(-50);
      return send(res, 200, { booking: await store.saveBooking(b) });
    }

    if (a === "leads" && req.method === "GET") return send(res, 200, { leads: await store.listLeads() });

    if (a === "lead" && req.method === "POST") {
      const input = await body(req) || {};
      const l = LEAD_ID.test(String(input.id || "")) && await store.getLead(String(input.id));
      if (!l) return send(res, 404, { error: "Kayıt bulunamadı" });
      if (LEAD_STATUSES.includes(input.status)) l.status = input.status;
      if (input.note !== undefined) l.note = str(input.note, 1000);
      return send(res, 200, { lead: await store.saveLead(l) });
    }

    if (a === "leaddel" && req.method === "POST") {
      const input = await body(req) || {};
      if (!LEAD_ID.test(String(input.id || ""))) return send(res, 400, { error: "Geçersiz kayıt" });
      await store.finishLead(String(input.id));
      return send(res, 200, { ok: true });
    }

    if (a === "apps" && req.method === "GET") return send(res, 200, { apps: await store.listApps() });

    if (a === "app" && req.method === "POST") {
      const input = await body(req) || {};
      const ap = await store.getApp(+input.id);
      if (!ap) return send(res, 404, { error: "Başvuru bulunamadı" });
      if (APP_STATUSES.includes(input.status)) ap.status = input.status;
      if (input.note !== undefined) ap.note = str(input.note, 1000);
      return send(res, 200, { app: await store.saveApp(ap) });
    }

    if (a === "appdel" && req.method === "POST") {
      const input = await body(req) || {};
      if (!(+input.id > 0)) return send(res, 400, { error: "Geçersiz başvuru" });
      await store.deleteApp(+input.id);
      return send(res, 200, { ok: true });
    }

    if (a === "partners" && req.method === "GET") return send(res, 200, { partners: await partner.list() });
    if (a === "partner" && req.method === "POST") {
      const input = await body(req) || {};
      try { return send(res, 200, { partner: await partner.save(input.partner) }); }
      catch (e) { if (!e.user) throw e; return send(res, 400, { error: e.message }); }
    }
    if (a === "partnerdel" && req.method === "POST") {
      const input = await body(req) || {};
      await partner.remove(String(input.id || ""));
      await pricing.delB2b(String(input.id || ""));
      await b2bauth.off(String(input.id || ""));
      await b2bauth.dropUsers(String(input.id || ""));
      return send(res, 200, { ok: true });
    }

    if (a === "pricing" && req.method === "GET") return send(res, 200, { pricing: await pricing.get(), defaults: pricing.DEFAULT });

    if (a === "pricing" && req.method === "POST") {
      const input = await body(req, 400000) || {};
      try { return send(res, 200, { pricing: await pricing.save(input.pricing) }); }
      catch (e) { if (/redis/.test(e.message)) throw e; return send(res, 400, { error: e.message }); }
    }

    if (a === "b2bpricing" && req.method === "GET") {
      const pid = new URL(req.url, "http://x").searchParams.get("partner") || "";
      return send(res, 200, { pricing: await pricing.getB2b(pid) });
    }
    if (a === "b2bpricing" && req.method === "POST") {
      const input = await body(req, 400000) || {};
      const pid = String(input.partner || "");
      if (pid && !(await partner.list()).some(p => p.id === pid)) return send(res, 404, { error: "Partner bulunamadı" });
      try { return send(res, 200, { pricing: await pricing.saveB2b(input.pricing, pid) }); }
      catch (e) { if (/redis/.test(e.message)) throw e; return send(res, 400, { error: e.message }); }
    }
    if (a === "b2blists" && req.method === "GET") return send(res, 200, { lists: await pricing.b2bLists((await partner.list()).map(p => p.id)) });
    if (a === "b2bdel" && req.method === "POST") {
      const input = await body(req) || {};
      await pricing.delB2b(String(input.partner || ""));
      return send(res, 200, { ok: true });
    }

    if (a === "b2bauth" && req.method === "GET") return send(res, 200, { logins: await b2bauth.list((await partner.list()).map(p => p.id)) });
    if (a === "b2bpass" && req.method === "POST") {
      const input = await body(req) || {};
      const id = String(input.partner || "");
      if (!(await partner.list()).some(p => p.id === id)) return send(res, 404, { error: "Partner bulunamadı" });
      return send(res, 200, { password: await b2bauth.make(id), at: now() });
    }
    if (a === "b2boff" && req.method === "POST") {
      const input = await body(req) || {};
      await b2bauth.off(String(input.partner || ""));
      return send(res, 200, { ok: true });
    }

    if (a === "vimg" && req.method === "POST") {
      const input = await body(req, 700000) || {};
      try { return send(res, 200, { url: await pricing.saveImage(input.data) }); }
      catch (e) { if (/redis/.test(e.message)) throw e; return send(res, 400, { error: e.message }); }
    }

    if (a === "blogs" && req.method === "GET") {
      const S = blog.SHELL;
      // plan: the content calendar's upcoming posts not written yet (api/_lib/blogplan.json, kept up to date with the calendar)
      return send(res, 200, { posts: await blog.list(), today: blog.today(), plan: require("./_lib/blogplan.json"), site: { cats: S.cats, places: S.places, links: S.links, langs: S.langs, base: S.base, translate: !!process.env.ANTHROPIC_API_KEY } });
    }
    if (a === "blog" && req.method === "GET") {
      const p = await blog.get(req.query && req.query.id);
      return p ? send(res, 200, { post: p }) : send(res, 404, { error: "Yazı bulunamadı" });
    }
    if (a === "blogsave" && req.method === "POST") {
      const input = await body(req, 600000) || {};
      try {
        const { post, was } = await blog.save(input.post);
        const url = blog.SHELL.base + blogpage.postUrl(post);
        // search engines hear about a post when it goes live or changes while live
        if (blog.live(post)) await blog.ping([url, blog.SHELL.base + (post.lang === "en" ? "/blog" : "/" + post.lang + "/blog")]);
        else if (was && blog.live(was)) await blog.ping([blog.SHELL.base + blogpage.postUrl(was)]);
        return send(res, 200, { post, url });
      } catch (e) { if (!e.user) throw e; return send(res, 400, { error: e.message }); }
    }
    if (a === "blogdel" && req.method === "POST") {
      const input = await body(req) || {};
      const old = await blog.get(input.id);
      await blog.remove(input.id);
      if (old && blog.live(old)) await blog.ping([blog.SHELL.base + blogpage.postUrl(old)]);
      return send(res, 200, { ok: true });
    }
    if (a === "blogpreview" && req.method === "POST") {
      const input = await body(req, 600000) || {};
      try {
        const p = blog.clean(Object.assign({}, input.post, { status: "draft" }));
        const all = (await blog.list()).filter(blog.live);
        const pr = await pricing.get();
        return send(res, 200, { html: blogpage.page(blogpage.prices(p, pr), blogpage.prices(all, pr)) });
      } catch (e) { if (!e.user) throw e; return send(res, 400, { error: e.message }); }
    }
    if (a === "blogtranslate" && req.method === "POST") {
      const input = await body(req) || {};
      const src = await blog.get(input.id);
      if (!src) return send(res, 404, { error: "Önce yazıyı kaydedin" });
      try {
        const post = await require("./_lib/translate").translate(src, String(input.lang || ""), !!input.publish);
        if (blog.live(post)) await blog.ping([blog.SHELL.base + blogpage.postUrl(post), blog.SHELL.base + "/" + post.lang + "/blog"]);
        return send(res, 200, { post });
      }
      catch (e) {
        if (e.user) return send(res, 400, { error: e.message });
        console.error(e);
        return send(res, 502, { error: "Çeviri servisine ulaşılamadı, tekrar deneyin" });
      }
    }
    if (a === "autofill" && req.method === "POST") {
      if (!(await store.allow("rl:autofill", 60, 3600))) return send(res, 429, { error: "Çok fazla deneme. Biraz sonra tekrar deneyin." });
      const input = await body(req, 4500000);
      if (!input) return send(res, 413, { error: "Dosyalar çok büyük, daha az ya da daha küçük dosya ekleyin" });
      try { return send(res, 200, { booking: await require("./_lib/autofill").read(input) }); }
      catch (e) {
        if (e.user) return send(res, 400, { error: e.message });
        console.error(e);
        return send(res, 502, { error: "Okuma servisine ulaşılamadı, tekrar deneyin" });
      }
    }
    if (a === "bimg" && req.method === "POST") {
      const input = await body(req, 1000000) || {};
      try { return send(res, 200, { url: await blog.saveImage(input.data) }); }
      catch (e) { if (!e.user) throw e; return send(res, 400, { error: e.message }); }
    }

    send(res, 404, { error: "unknown_action" });
  } catch (e) {
    if (e.conflict) return send(res, 409, { error: e.message });
    console.error(e);
    send(res, 500, { error: "Sunucu hatası, tekrar deneyin" });
  }
};
