// E-mails about a booking, sent through Resend (resend.com) over its REST API so no package is needed.
// Settings (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY  required; without it nothing is sent and the booking flow works as before
//   MAIL_FROM       sender, default "ITB Transfer <booking@istanbultaxibooking.com>"
//   OFFICE_EMAIL    where new requests and customer answers go, default info@istanbultaxibooking.com
//   SITE_URL        default https://www.istanbultaxibooking.com (links in the e-mails)
// Customer e-mails are in the booking's language (English when it has none); office e-mails are Turkish.
const TEXT = require("./mailtext");
const NAMES = require("./names.json");
const MEET = require("./meet.json");
const VT = require("./vouchertext");
// pdfkit is loaded only when a voucher is built, so other panel calls start faster
const voucher = { build: d => require("./voucher").build(d) };
const THANKS = require("./thankstext");
const CANCEL = require("./canceltext");
// Review pages in the thank-you e-mail
const REVIEW_GOOGLE = () => process.env.REVIEW_GOOGLE_URL || "https://g.page/r/CcNqky0zmAGxEBM/review";
const REVIEW_TRUSTPILOT = () => process.env.REVIEW_TRUSTPILOT_URL || "https://www.trustpilot.com/evaluate/istanbultaxibooking.com";
// Language of the thank-you e-mail from the passenger's (else the customer's) phone code; English otherwise
const THANKS_BY_CODE = [["+7", "ru"], ["+33", "fr"], ["+39", "it"], ["+41", "de"]];
function thanksLang(b) {
  const ph = String((b.passenger && b.passenger.phone) || (b.customer && b.customer.phone) || "").replace(/[^\d+]/g, "").replace(/^00/, "+");
  const hit = THANKS_BY_CODE.find(x => ph.indexOf(x[0]) === 0);
  return hit ? hit[1] : "en";
}

const FROM = () => process.env.MAIL_FROM || "ITB Transfer <booking@istanbultaxibooking.com>";
const OFFICE = () => process.env.OFFICE_EMAIL || "info@istanbultaxibooking.com";
const SITE = () => (process.env.SITE_URL || "https://www.istanbultaxibooking.com").replace(/\/$/, "");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function configured() { return !!process.env.RESEND_API_KEY; }

async function resend(path, method, body) {
  const r = await fetch("https://api.resend.com" + path, {
    method: method || "GET",
    headers: { Authorization: "Bearer " + process.env.RESEND_API_KEY, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error("resend " + r.status + " " + (j.message || j.name || ""));
  return j;
}

// Never throws: returns true when the e-mail was accepted, false when it was skipped or failed
async function send(msg) {
  if (!configured() || !EMAIL.test(String(msg.to || ""))) return false;
  try {
    // `attachments` may be a promise (the voucher PDF); if building it fails the e-mail still goes out without it
    const attachments = await Promise.resolve(msg.attachments).catch(e => { console.error("voucher", e.message); return null; });
    await resend("/emails", "POST", { from: FROM(), to: [msg.to], subject: msg.subject, html: msg.html, text: msg.text, reply_to: msg.replyTo || OFFICE(),
      attachments: attachments || undefined });
    return true;
  } catch (e) {
    console.error("mail", msg.subject, e.message);
    return false;
  }
}

// ---------- Rendering ----------
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const dmy = d => d ? d.split("-").reverse().join(".") : "-";
const CUR = { EUR: "€", USD: "$", TRY: "₺", GBP: "£" };
const money = (n, c) => (Math.round((+n || 0) * 100) / 100) + " " + (CUR[c] || c || "€");
function texts(lang) { return TEXT[lang] || TEXT.en; }
function langOf(b) { return TEXT[b.lang] ? b.lang : "en"; }
const NAMED = { "İstanbul Havalimanı (IST)": "IST", "Sabiha Gökçen Havalimanı (SAW)": "SAW", "IST Airport": "IST", "SAW Airport": "SAW" };
function place(lang, code, name, addr) {
  const n = NAMES[lang] || NAMES.en, k = NAMED[name] || code;
  const base = n["p_" + k] || name || code || "-";
  return base + (addr ? ", " + addr : "");
}
function carLabel(lang, b) { const n = NAMES[lang] || NAMES.en; return n["c_" + b.car] || b.carName || b.car || "-"; }
// Voucher blocks: one per transfer, each with its own vehicle and "amount · payment method" row
function voucherBlocks(b, lang) {
  const T = texts(lang), V = VT[lang] || VT.en, card = b.payment === "kart";
  const pay = T.pays[b.payment] || b.payment || "";
  return blocks(b, lang).slice(1).map((blk, i) => {
    const l = b.legs[i];
    // Card payments carry the 5% card fee the site adds to the total
    let amount = l.price ? (card ? Math.round(l.price * 105) / 100 : l.price) : (b.legs.length === 1 ? b.total : 0);
    const rows = blk.rows.slice();
    rows.splice(4, 0, [T.car, carLabel(lang, l.car ? l : b)]);
    // A B2B partner passes the voucher on to its guest: no price or account line, only the cash the driver collects
    if (b.partner) { if (l.cash) rows.push([T.pay, money(l.cash, b.cashCur || b.currency) + " · " + T.pays.nakit]); }
    else rows.push([T.pay, [amount ? money(amount, b.currency) : "", pay].filter(Boolean).join(" · ") || "-"]);
    return { title: blk.title || V.trip, rows };
  });
}

// Chauffeur service by the hour: the package takes the place of the drop-off row
const HOURLY = {
  en: ["Service", "Chauffeur service", "{h} hours, {km} km included", "Extra hour", "hour"],
  tr: ["Hizmet", "Şoförlü araç", "{h} saat, {km} km dahil", "Ek saat ücreti", "saat"],
  de: ["Leistung", "Chauffeurservice", "{h} Stunden, {km} km inklusive", "Zusatzstunde", "Stunde"],
  fr: ["Service", "Service de chauffeur", "{h} heures, {km} km inclus", "Heure supplémentaire", "heure"],
  it: ["Servizio", "Auto con autista", "{h} ore, {km} km inclusi", "Ora extra", "ora"],
  es: ["Servicio", "Coche con conductor", "{h} horas, {km} km incluidos", "Hora extra", "hora"],
  nl: ["Dienst", "Chauffeursdienst", "{h} uur, {km} km inbegrepen", "Extra uur", "uur"],
  ro: ["Serviciu", "Mașină cu șofer", "{h} ore, {km} km incluși", "Oră suplimentară", "oră"],
  ru: ["Услуга", "Автомобиль с водителем", "{h} часов, {km} км включено", "Дополнительный час", "час"],
  el: ["Υπηρεσία", "Αυτοκίνητο με οδηγό", "{h} ώρες, {km} χλμ. περιλαμβάνονται", "Επιπλέον ώρα", "ώρα"],
  sr: ["Usluga", "Vozilo sa vozačem", "{h} sati, {km} km uključeno", "Dodatni sat", "sat"],
  ar: ["الخدمة", "سيارة مع سائق", "{h} ساعات، {km} كم مشمولة", "ساعة إضافية", "ساعة"]
};
function hourlyRows(b, lang) {
  const H = HOURLY[lang] || HOURLY.en, h = b.hourly;
  return [[H[0], H[1] + ": " + H[2].replace("{h}", h.hours).replace("{km}", h.km)]].concat(h.extra ? [[H[3], money(h.extra, b.currency) + " / " + H[4]]] : []);
}

// Rows [label, value] of a booking, one block per transfer, in the customer's language
function blocks(b, lang) {
  const T = texts(lang);
  const legs = b.legs.map((l, i) => {
    const seats = [l.seatB ? T.baby + " ×" + l.seatB : "", l.seatK ? T.booster + " ×" + l.seatK : ""].filter(Boolean).join(", ");
    return {
      title: b.legs.length > 1 ? (i ? T.ret : T.out) : "",
      rows: [
        [T.date, dmy(l.date)], [T.time, l.time || "-"],
        [T.from, place(lang, l.from, l.fromName, l.fromAddr)],
        ...(b.hourly ? hourlyRows(b, lang) : [[T.to, place(lang, l.to, l.toName, l.toAddr)]]),
        l.flight ? [T.flight, l.flight] : null,
        [T.pax, String(l.pax)], [T.bags, String(l.bags)],
        seats ? [T.seats, seats] : null,
        l.note ? [T.notel, l.note] : null
      ].filter(Boolean)
    };
  });
  const head = { title: "", rows: [[T.ref, b.ref || "#" + b.id], [T.car, carLabel(lang, b)], [T.total, money(b.total, b.currency)], [T.pay, T.pays[b.payment] || b.payment]] };
  return [head].concat(legs);
}
// `prev`: the booking before a proposed change; rows whose value differs are highlighted
function detailsHtml(b, lang, prev) {
  const old = prev ? blocks(prev, lang) : null;
  return blocks(b, lang).map((blk, bi) => {
    const was = old && old[bi] ? Object.fromEntries(old[bi].rows) : null;
    return (blk.title ? sectionTitle(blk.title) : '<div style="height:10px"></div>') + rowsHtml(blk.rows, r => {
        const changed = prev && (!was || was[r[0]] !== r[1]);
        return { bg: changed ? "#fff3cd" : "", extra: changed && was && was[r[0]] ? '<div style="font-weight:400;color:#8a6d1a;text-decoration:line-through;font-size:12.5px">' + esc(was[r[0]]) + '</div>' : '' };
      });
  }).join("");
}
// Navy bar with an amber edge, used as the heading of each block
function sectionTitle(t) {
  return '<div style="margin:18px 0 0;background:#000000;color:#ffffff;font-weight:700;font-size:14px;padding:9px 14px;border-radius:8px 8px 0 0;border-inline-start:4px solid #e1ad01">' + esc(t) + '</div>';
}
// Label/value rows on alternating light rows. `mark(r)` may return { bg, extra } for a row.
function rowsHtml(rows, mark) {
  return '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #e3e7ee">' +
    rows.map((r, i) => {
      const m = mark ? mark(r) : {}, bg = "background:" + (m.bg || (i % 2 ? "#ffffff" : "#f5f7fa")) + ";";
      return '<tr><td style="' + bg + 'padding:8px 12px;border-bottom:1px solid #e9edf2;color:#5b6678;width:38%;vertical-align:top">' + esc(r[0]) + '</td>' +
        '<td style="' + bg + 'padding:8px 12px;border-bottom:1px solid #e9edf2;color:#0b1d30;font-weight:700">' + (/^\+?[\d\s()-]+$/.test(r[1]) ? ltr(r[1]) : esc(r[1])) + (m.extra || '') + '</td></tr>';
    }).join("") + '</table>';
}
function detailsText(b, lang) {
  return blocks(b, lang).map(blk => (blk.title ? blk.title + "\n" : "") + blk.rows.map(r => r[0] + ": " + r[1]).join("\n")).join("\n\n");
}
function button(href, label, color) {
  return '<a href="' + esc(href) + '" style="display:inline-block;background:' + color + ';color:#fff;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:8px;margin:4px 8px 4px 0">' + esc(label) + '</a>';
}
// Company details in every e-mail's footer
const CO = {
  name: "3E SEYAHAT ORGANİZASYON TURİZM VE TAŞIMACILIK LTD. ŞTİ.",
  tursab: "TÜRSAB No: 12556",
  address: "Yenişehir Mah. Şefika Sok. 4/452, Pendik / İstanbul / Türkiye",
  phone: "+90 541 334 21 02", wa: "905413342102",
  email: "info@istanbultaxibooking.com"
};
// `hero`: optional full-width band under the logo (the voucher title)
function layout(lang, inner, hero) {
  const rtl = texts(lang) === TEXT.ar, site = SITE(), V = VT[lang] || VT.en, al = rtl ? "right" : "left";
  const btn = (href, bg, fg, border, icon, small, big) => '<a href="' + href + '" style="display:block;background:' + bg + ';color:' + fg + ';text-decoration:none;border-radius:12px;padding:14px 10px;margin:0 0 10px;text-align:center' + (border ? ';border:2px solid ' + border : '') + '">' +
    '<div style="font-size:20px;line-height:1">' + icon + '</div><div style="font-size:13px;opacity:.85;margin-top:6px">' + esc(small) + '</div><div style="font-size:18px;font-weight:800;margin-top:2px">' + esc(big) + '</div></a>';
  const fl = 'style="color:#c9d3df;text-decoration:none"';
  return '<!doctype html><html' + (rtl ? ' dir="rtl"' : '') + '><body style="margin:0;background:#eaf4f8;font-family:Segoe UI,Roboto,Arial,sans-serif;color:#0b1d30">' +
    '<div style="max-width:600px;margin:0 auto;padding:20px 12px">' +
    '<div style="background:#000000;padding:14px 22px;border-radius:14px 14px 0 0;border-bottom:4px solid #e1ad01;text-align:center">' +
    '<a href="' + site + '"><img src="' + site + '/img/mail/logo.png" width="170" alt="ITB Transfer" style="display:inline-block;border:0;width:170px;height:auto"></a></div>' +
    (hero || '') +
    '<div style="background:#ffffff;padding:22px;line-height:1.55;font-size:15px;text-align:' + al + '">' + inner + '</div>' +
    // Contact buttons
    '<div style="background:#ffffff;padding:4px 22px 18px">' +
    btn("tel:+" + CO.wa, "#000000", "#ffffff", "", "☎", V.call, CO.phone) +
    btn("https://wa.me/" + CO.wa, "#1f9d55", "#ffffff", "", "💬", "WhatsApp", V.wa) +
    btn(site, "#ffffff", "#000000", "#e1ad01", "🌐", V.web, "istanbultaxibooking.com") + '</div>' +
    // Company block
    '<div style="background:#000000;color:#c9d3df;padding:22px;border-radius:0 0 14px 14px;font-size:13px;line-height:1.8;text-align:center">' +
    '<div style="color:#e1ad01;font-weight:800;font-size:18px;margin-bottom:4px">ITB Transfer</div>' +
    '<div style="color:#ffffff">' + esc(CO.name) + '</div>' +
    '<div><span style="display:inline-block;background:#e1ad01;color:#1a1300;font-weight:700;border-radius:6px;padding:1px 8px">' + esc(CO.tursab) + '</span></div>' +
    '<div>✉ <a href="mailto:' + CO.email + '" ' + fl + '>' + esc(CO.email) + '</a></div>' +
    '<div>📍 ' + esc(CO.address) + '</div>' +
    '<div>🌐 <a href="' + site + '" ' + fl + '>istanbultaxibooking.com</a></div>' +
    '<div style="border-top:1px solid #2a2c30;border-bottom:1px solid #2a2c30;margin:12px 0;padding:8px 0">' +
    '<a href="tel:+' + CO.wa + '" style="color:#ffffff;text-decoration:none">☎ ' + ltr(CO.phone) + '</a> &nbsp;|&nbsp; <a href="https://wa.me/' + CO.wa + '" style="color:#ffffff;text-decoration:none">WhatsApp</a></div>' +
    '<div style="font-size:12px;color:#9aabbd">© ' + new Date().getFullYear() + ' ITB Transfer. ' + esc(V.rights) + '<br>' + esc(V.tag) + '</div></div>' +
    '</div></body></html>';
}
function footText() {
  return ["ITB Transfer", CO.name, CO.tursab, CO.address, CO.phone + " · " + CO.email, "istanbultaxibooking.com"].join("\n");
}

// Where to meet the driver, for each airport the customer is picked up at (IST and/or SAW)
const MEET_T = { en: "Meeting point", tr: "Buluşma noktası", de: "Treffpunkt", fr: "Point de rendez-vous", it: "Punto d'incontro", es: "Punto de encuentro",
  nl: "Ontmoetingspunt", ro: "Punct de întâlnire", ru: "Место встречи", el: "Σημείο συνάντησης", sr: "Mesto sastanka", ar: "نقطة اللقاء" };
function pickupAirports(b) {
  const seen = [];
  b.legs.forEach(l => { const c = NAMED[l.fromName] || l.from; if ((c === "IST" || c === "SAW") && seen.indexOf(c) < 0) seen.push(c); });
  return seen;
}
function meetHtml(b, lang) {
  const M = MEET[lang] || MEET.en, site = SITE(), ap = pickupAirports(b);
  if (!ap.length) return "";
  const img = (f, w, alt) => '<img src="' + site + '/img/mail/' + f + '" width="' + w + '" alt="' + esc(alt) + '" style="display:block;border:0;border-radius:8px;width:100%;max-width:' + w + 'px;height:auto">';
  const cap = s => '<div style="font-size:12.5px;color:#5b6678;margin:6px 0 0">' + esc(s) + '</div>';
  const box = (title, body) => '<div style="border:1px solid #e3e7ee;border-radius:10px;padding:14px 16px;margin:12px 0 0">' +
    '<div style="font-weight:700;font-size:15px;margin:0 0 6px">' + esc(title) + '</div>' + body + '</div>';
  const parts = ap.map(c => c === "IST"
    ? box(M.m043, '<p style="margin:0 0 10px">' + esc(M.m046) + '</p>' + img("meet-ist.jpg", 280, M.m077) + cap(M.m077))
    : box(M.m048, '<p style="margin:0 0 10px">' + esc(M.m051) + '</p>' +
      '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%"><tr>' +
      '<td style="width:50%;vertical-align:top;padding-inline-end:6px">' + img("meet-saw-1.jpg", 260, M.m074) + cap(M.m074) + '</td>' +
      '<td style="width:50%;vertical-align:top;padding-inline-start:6px">' + img("meet-saw-2.jpg", 260, M.m076) + cap(M.m076) + '</td></tr></table>'));
  return '<h3 style="margin:24px 0 0;font-size:17px;border-top:3px solid #e1ad01;padding-top:14px">📍 ' + esc(MEET_T[lang] || MEET_T.en) + '</h3>' + parts.join("") +
    '<p style="margin:12px 0 0;font-size:13.5px;color:#5b6678"><b>' + esc(M.m053) + '</b> ' + esc(M.m054) + ' <a href="https://wa.me/' + CO.wa + '" style="color:#0b1d30">' + ltr(CO.phone) + '</a></p>';
}
function meetText(b, lang) {
  const M = MEET[lang] || MEET.en, ap = pickupAirports(b);
  if (!ap.length) return "";
  return (MEET_T[lang] || MEET_T.en) + "\n" + ap.map(c => c === "IST" ? M.m043 + ": " + M.m046 : M.m048 + ": " + M.m051).join("\n") + "\n" + M.m053 + " " + M.m054 + " " + CO.phone;
}
// Phone numbers keep their left-to-right order inside Arabic e-mails
const ltr = s => '<span dir="ltr">' + esc(s) + '</span>';
const p = s => '<p style="margin:0 0 12px">' + esc(s) + '</p>';
const quote = (label, s) => '<div style="background:#f6f7fa;border-inline-start:4px solid #e1ad01;padding:10px 14px;margin:14px 0;border-radius:6px"><b>' + esc(label) + ':</b><br>' + esc(s).replace(/\n/g, "<br>") + '</div>';
const hello = (T, b) => T.hi.replace("{n}", b.customer.name || "").replace(/\s+([,!:،])/, "$1");

// Everything the voucher shows (PDF and e-mail), in `lang`
function voucherData(b, lang) {
  const T = texts(lang), V = VT[lang] || VT.en, M = MEET[lang] || MEET.en, c = b.customer || {}, ps = b.passenger || {};
  return {
    ref: b.ref || "#" + b.id, V, co: CO, site: SITE(),
    err: V.err.replace("{p}", CO.phone),
    who: [[V.cust, ps.name || c.name || "-"], [V.phone, ps.phone || c.phone || "-"], c.email ? [V.email, c.email] : null].filter(Boolean),
    blocks: voucherBlocks(b, lang),
    meetTitle: MEET_T[lang] || MEET_T.en,
    meet: pickupAirports(b).map(a => a === "IST"
      ? { title: M.m043, text: M.m046 + "\n" + M.m077, pics: ["meet-ist.jpg"] }
      : { title: M.m048, text: M.m051, pics: ["meet-saw-1.jpg", "meet-saw-2.jpg"] }),
    help: M.m053 + " " + M.m054 + " " + CO.phone
  };
}

// kind: received | approved | rejected | cancelled | proposal | thanks. `extra`: { reason } or { proposal, link }
function customerMail(kind, b, extra) {
  const lang = kind === "thanks" ? thanksLang(b) : langOf(b), T = texts(lang);
  extra = extra || {};
  const ref = " · " + (b.ref || "#" + b.id);
  let subject, html, text, hero, attachments;
  if (kind === "received") {
    subject = T.rcv_s + ref;
    html = p(hello(T, b)) + p(T.rcv_1) + p(T.rcv_2) + detailsHtml(b, lang);
    text = [hello(T, b), T.rcv_1, T.rcv_2, detailsText(b, lang)];
  } else if (kind === "approved") {
    const V = VT[lang] || VT.en, d = voucherData(b, lang);
    subject = "Voucher · " + T.ok_s + ref;
    hero = '<div style="background:#000000;padding:26px 22px;text-align:center">' +
      '<div style="color:#ffffff;font-size:38px;font-weight:900;letter-spacing:6px;line-height:1.1">VOUCHER</div>' +
      '<div style="color:#e1ad01;font-size:16px;font-weight:700;margin-top:6px">' + esc(d.ref) + '</div>' +
      '<div style="margin-top:12px"><span style="display:inline-block;background:#16a34a;color:#ffffff;font-weight:700;font-size:14px;border-radius:999px;padding:5px 16px">✓ ' + esc(T.ok_s) + '</span></div></div>';
    html = '<div style="background:#fff4dc;border-inline-start:4px solid #e1ad01;border-radius:8px;padding:12px 14px;margin:0 0 16px;font-weight:600">' +
      esc(V.err.split("{p}")[0]) + '<a href="https://wa.me/' + CO.wa + '" style="color:#1f9d55;font-weight:800">' + ltr(CO.phone) + '</a>' + esc(V.err.split("{p}")[1] || "") + '</div>' +
      p(hello(T, b)) + p(V.pdf) +
      sectionTitle(V.cust) + rowsHtml(d.who) + d.blocks.map(blk => sectionTitle(blk.title) + rowsHtml(blk.rows)).join("") + meetHtml(b, lang);
    text = ["VOUCHER " + d.ref + " · " + T.ok_s, d.err, hello(T, b), V.pdf, d.who.map(r => r[0] + ": " + r[1]).join("\n"), d.blocks.map(blk => blk.title + "\n" + blk.rows.map(r => r[0] + ": " + r[1]).join("\n")).join("\n\n"), meetText(b, lang)];
    attachments = voucher.build(voucherData(b, langOf(b) === "ar" ? "en" : lang))
      .then(buf => [{ filename: "voucher-" + d.ref + ".pdf", content: buf.toString("base64") }]);
  } else if (kind === "rejected") {
    subject = T.no_s + ref;
    html = p(hello(T, b)) + p(T.no_1) + (extra.reason ? quote(T.why, extra.reason) : "") + p(T.no_2) + detailsHtml(b, lang);
    text = [hello(T, b), T.no_1, extra.reason ? T.why + ": " + extra.reason : "", T.no_2, detailsText(b, lang)];
  } else if (kind === "cancelled") {
    const X = CANCEL[lang] || CANCEL.en;
    subject = X.s + ref;
    hero = '<div style="background:#000000;padding:22px;text-align:center"><span style="display:inline-block;background:#dc2626;color:#ffffff;font-weight:800;font-size:16px;border-radius:999px;padding:6px 18px">✕ ' + esc(X.s) + '</span></div>';
    html = p(hello(T, b)) + p(X.t1) + (extra.reason ? quote(T.note, extra.reason) : "") + p(X.t2) + detailsHtml(b, lang);
    text = [hello(T, b), X.t1, extra.reason ? T.note + ": " + extra.reason : "", X.t2, detailsText(b, lang)];
  } else if (kind === "proposal") {
    const next = Object.assign({}, b, extra.proposal);
    const yes = extra.link + "&r=accept", no = extra.link + "&r=decline";
    subject = T.ch_s + ref;
    html = p(hello(T, b)) + p(T.ch_1) + (extra.proposal.message ? quote(T.note, extra.proposal.message) : "") + p(T.ch_2) +
      detailsHtml(next, lang, b) + '<div style="margin:22px 0 6px">' + button(yes, T.acc, "#16a34a") + button(no, T.dec, "#6b7280") + '</div>';
    text = [hello(T, b), T.ch_1, extra.proposal.message ? T.note + ": " + extra.proposal.message : "", T.ch_2, detailsText(next, lang), T.acc + ": " + yes, T.dec + ": " + no];
  }
  else if (kind === "thanks") {
    const Y = THANKS[lang];
    subject = Y.s + ref;
    hero = '<div style="background:#000000;padding:26px 22px;text-align:center"><div style="color:#e1ad01;font-size:30px;letter-spacing:4px">★★★★★</div>' +
      '<div style="color:#ffffff;font-size:22px;font-weight:800;margin-top:8px">' + esc(Y.s) + '</div></div>';
    const rate = (href, label, bg, logo) => '<a href="' + esc(href) + '" style="display:block;background:' + bg + ';color:#ffffff;text-decoration:none;font-weight:800;font-size:16px;border-radius:12px;padding:14px 10px;margin:0 0 10px;text-align:center">' + logo + ' ' + esc(label) + '</a>';
    html = p(hello(T, b)) + p(Y.t1) + p(Y.t2) +
      '<div style="margin:18px 0 8px">' + rate(REVIEW_GOOGLE(), Y.g, "#1a73e8", "★") + rate(REVIEW_TRUSTPILOT(), Y.tp, "#00b67a", "★") + '</div>' + p(Y.t3);
    text = [hello(T, b), Y.t1, Y.t2, Y.g + ": " + REVIEW_GOOGLE(), Y.tp + ": " + REVIEW_TRUSTPILOT(), Y.t3];
  }
  html = layout(lang, html, hero);
  text = text.filter(Boolean).concat([footText()]).join("\n\n");
  return { to: b.customer.email, subject, html, text, attachments };
}

// Turkish notice for the office (info@). `title` says what happened; `note` is shown above the details.
function officeMail(title, b, note) {
  const lang = "tr", T = texts(lang);
  const c = b.customer, ps = b.passenger || {};
  const who = [["Müşteri", c.name], ["Telefon", c.phone || "-"], ["E-posta", c.email || "-"], ps.name ? ["Yolcu", ps.name + (ps.phone ? ", " + ps.phone : "")] : null, ["Site dili", (b.lang || "-").toUpperCase()]].filter(Boolean);
  const panel = SITE() + "/admin#rezervasyonlar";
  const html = layout(lang, '<h2 style="margin:0 0 12px;font-size:19px">' + esc(title) + '</h2>' + (note ? quote("Not", note) : "") +
    '<table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px">' + who.map(r => '<tr><td style="padding:6px 10px;border-bottom:1px solid #e6e9ef;color:#5b6678;width:38%">' + esc(r[0]) + '</td><td style="padding:6px 10px;border-bottom:1px solid #e6e9ef;font-weight:600">' + esc(r[1]) + '</td></tr>').join("") + '</table>' +
    detailsHtml(b, lang) + '<div style="margin:20px 0 0">' + button(panel, "Panelde aç (#" + b.id + ")", "#2563eb") + '</div>');
  const text = [title, note || "", who.map(r => r[0] + ": " + r[1]).join("\n"), detailsText(b, lang), panel, footText()].filter(Boolean).join("\n\n");
  return { to: OFFICE(), subject: title + " · #" + b.id + " " + (c.name || ""), html, text, replyTo: EMAIL.test(c.email) ? c.email : undefined };
}

// The voucher PDF of a booking (Buffer), as attached to the approval e-mail; the panel's "Voucher oluştur" downloads it
function voucherPdf(b, lang) {
  lang = TEXT[lang] ? lang : langOf(b);
  return voucher.build(voucherData(b, lang === "ar" ? "en" : lang));
}

module.exports = { configured, send, resend, customerMail, officeMail, texts, langOf, detailsHtml, voucherPdf, SITE, OFFICE };
