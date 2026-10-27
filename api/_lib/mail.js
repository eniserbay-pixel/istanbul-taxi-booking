// E-mails through Resend (RESEND_API_KEY). Without the key nothing is sent and the booking flow still works.
// MAIL_FROM: sender, e.g. "Istanbul Airport Taxi <booking@yourdomain.com>" (the domain must be verified in Resend).
// OFFICE_EMAIL: where new requests are announced.
const site = require("../../data/site.json");
const { P, Q } = require("./booking");

const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const T = {
  en: {
    received: ["We received your booking request", "Thank you, {name}. We have your request and will confirm it shortly by e-mail. Nothing is booked until you get our confirmation."],
    confirmed: ["Your transfer is confirmed", "Good news, {name}: your transfer is confirmed. Your driver will be waiting for you with a name sign."],
    declined: ["We could not confirm your request", "Sorry, {name}. We cannot take this booking. {reason}Please contact us on WhatsApp and we will help you find another option."],
    ref: "Booking reference", route: "Route", when: "Pickup", back: "Return", car: "Vehicle", pax: "Passengers", flight: "Flight",
    total: "Total price", pay: "Payment", cash: "Cash to the driver (EUR, USD or TRY)", meet: "Meeting point", help: "Questions? WhatsApp or call us"
  },
  ru: {
    received: ["Мы получили вашу заявку", "Спасибо, {name}. Мы получили вашу заявку и скоро подтвердим её по e-mail. Заказ подтверждён только после нашего письма."],
    confirmed: ["Ваш трансфер подтверждён", "{name}, ваш трансфер подтверждён. Водитель будет ждать вас с табличкой с вашим именем."],
    declined: ["Не удалось подтвердить заявку", "К сожалению, {name}, мы не можем принять этот заказ. {reason}Напишите нам в WhatsApp, и мы поможем найти другой вариант."],
    ref: "Номер заказа", route: "Маршрут", when: "Подача", back: "Обратно", car: "Автомобиль", pax: "Пассажиры", flight: "Рейс",
    total: "Итоговая цена", pay: "Оплата", cash: "Наличными водителю (EUR, USD или TRY)", meet: "Место встречи", help: "Есть вопросы? Напишите в WhatsApp или позвоните"
  },
  de: {
    received: ["Wir haben Ihre Buchungsanfrage erhalten", "Vielen Dank, {name}. Ihre Anfrage ist bei uns eingegangen und wir bestätigen sie in Kürze per E-Mail. Die Buchung ist erst mit unserer Bestätigung verbindlich."],
    confirmed: ["Ihr Transfer ist bestätigt", "Gute Nachricht, {name}: Ihr Transfer ist bestätigt. Ihr Fahrer erwartet Sie mit einem Namensschild."],
    declined: ["Wir konnten Ihre Anfrage nicht bestätigen", "Es tut uns leid, {name}, wir können diese Buchung nicht annehmen. {reason}Schreiben Sie uns bitte auf WhatsApp, wir helfen Ihnen gern bei einer anderen Lösung."],
    ref: "Buchungsnummer", route: "Strecke", when: "Abholung", back: "Rückfahrt", car: "Fahrzeug", pax: "Fahrgäste", flight: "Flug",
    total: "Gesamtpreis", pay: "Zahlung", cash: "Bar an den Fahrer (EUR, USD oder TRY)", meet: "Treffpunkt", help: "Fragen? Schreiben Sie uns auf WhatsApp oder rufen Sie an"
  },
  fr: {
    received: ["Nous avons bien reçu votre demande de réservation", "Merci, {name}. Nous avons bien reçu votre demande et nous la confirmerons rapidement par e-mail. La réservation n'est ferme qu'après notre confirmation."],
    confirmed: ["Votre transfert est confirmé", "Bonne nouvelle, {name} : votre transfert est confirmé. Votre chauffeur vous attendra avec une pancarte à votre nom."],
    declined: ["Nous n'avons pas pu confirmer votre demande", "Désolés, {name}, nous ne pouvons pas accepter cette réservation. {reason}Écrivez-nous sur WhatsApp et nous vous aiderons à trouver une autre solution."],
    ref: "Référence", route: "Trajet", when: "Prise en charge", back: "Retour", car: "Véhicule", pax: "Passagers", flight: "Vol",
    total: "Prix total", pay: "Paiement", cash: "En espèces au chauffeur (EUR, USD ou TRY)", meet: "Point de rendez-vous", help: "Une question ? Écrivez-nous sur WhatsApp ou appelez-nous"
  },
  it: {
    received: ["Abbiamo ricevuto la tua richiesta di prenotazione", "Grazie, {name}. Abbiamo ricevuto la tua richiesta e la confermeremo a breve via e-mail. La prenotazione è valida solo dopo la nostra conferma."],
    confirmed: ["Il tuo transfer è confermato", "Buone notizie, {name}: il tuo transfer è confermato. L'autista ti aspetterà con un cartello con il tuo nome."],
    declined: ["Non abbiamo potuto confermare la tua richiesta", "Ci dispiace, {name}, non possiamo accettare questa prenotazione. {reason}Scrivici su WhatsApp e ti aiuteremo a trovare un'alternativa."],
    ref: "Codice prenotazione", route: "Percorso", when: "Partenza", back: "Ritorno", car: "Veicolo", pax: "Passeggeri", flight: "Volo",
    total: "Prezzo totale", pay: "Pagamento", cash: "In contanti all'autista (EUR, USD o TRY)", meet: "Punto d'incontro", help: "Domande? Scrivici su WhatsApp o chiamaci"
  },
  nl: {
    received: ["We hebben je boekingsaanvraag ontvangen", "Bedankt, {name}. We hebben je aanvraag ontvangen en bevestigen die binnenkort per e-mail. De boeking is pas definitief na onze bevestiging."],
    confirmed: ["Je transfer is bevestigd", "Goed nieuws, {name}: je transfer is bevestigd. Je chauffeur wacht op je met een naambordje."],
    declined: ["We konden je aanvraag niet bevestigen", "Sorry, {name}, we kunnen deze boeking niet aannemen. {reason}Stuur ons een bericht via WhatsApp, dan zoeken we samen een andere oplossing."],
    ref: "Boekingsnummer", route: "Route", when: "Ophalen", back: "Terugrit", car: "Voertuig", pax: "Passagiers", flight: "Vlucht",
    total: "Totaalprijs", pay: "Betaling", cash: "Contant aan de chauffeur (EUR, USD of TRY)", meet: "Ontmoetingspunt", help: "Vragen? Stuur ons een WhatsApp of bel ons"
  },
  // Turkish: the office's e-mail
  tr: {
    received: ["Rezervasyon talebinizi aldık", "Teşekkürler {name}. Talebinizi aldık, kısa süre içinde e-postayla onaylayacağız. Onay e-postası gelene kadar rezervasyon kesinleşmiş değildir."],
    confirmed: ["Transferiniz onaylandı", "{name}, transferiniz onaylandı. Şoförünüz sizi adınızın yazılı olduğu tabelayla karşılayacak."],
    declined: ["Talebinizi onaylayamadık", "Üzgünüz {name}, bu rezervasyonu alamıyoruz. {reason}Başka bir seçenek bulmak için bize WhatsApp'tan yazın."],
    ref: "Rezervasyon numarası", route: "Güzergâh", when: "Alış", back: "Dönüş", car: "Araç", pax: "Yolcu", flight: "Uçuş",
    total: "Toplam fiyat", pay: "Ödeme", cash: "Araçta şoföre nakit (EUR, USD veya TL)", meet: "Buluşma noktası", help: "Sorunuz mu var? WhatsApp'tan yazın veya arayın"
  }
};

function zoneName(id, lang) { const z = Q.zone(P, id); return z ? z.name[lang] : id; }
// 2026-10-28 → "28 Oct 2026" in the customer's language
function day(d, lang) {
  const t = new Date(d + "T12:00:00Z");
  return isNaN(t) ? d : t.toLocaleDateString({ en: "en-GB", ru: "ru-RU", de: "de-DE", fr: "fr-FR", it: "it-IT", nl: "nl-NL", tr: "tr-TR" }[lang] || "en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}
function carName(id, lang) { const c = P.cars.find(x => x.id === id); return c ? c.name[lang] : id; }

// Words of the e-mail frame: section titles and the contact buttons
const F = {
  en: { addr: "Address", trip: "Transfer", back: "Return transfer", book: "Booking", call: "Call us", wa: "Write to us", web: "Website", rights: "All rights reserved." },
  ru: { addr: "Адрес", trip: "Трансфер", back: "Обратный трансфер", book: "Заказ", call: "Позвоните нам", wa: "Напишите нам", web: "Сайт", rights: "Все права защищены." },
  de: { addr: "Adresse", trip: "Transfer", back: "Rückfahrt", book: "Buchung", call: "Rufen Sie uns an", wa: "Schreiben Sie uns", web: "Website", rights: "Alle Rechte vorbehalten." },
  fr: { addr: "Adresse", trip: "Transfert", back: "Transfert retour", book: "Réservation", call: "Appelez-nous", wa: "Écrivez-nous", web: "Site web", rights: "Tous droits réservés." },
  it: { addr: "Indirizzo", trip: "Transfer", back: "Transfer di ritorno", book: "Prenotazione", call: "Chiamaci", wa: "Scrivici", web: "Sito web", rights: "Tutti i diritti riservati." },
  nl: { addr: "Adres", trip: "Transfer", back: "Retourtransfer", book: "Boeking", call: "Bel ons", wa: "Stuur ons een bericht", web: "Website", rights: "Alle rechten voorbehouden." },
  tr: { addr: "Adres", trip: "Transfer", back: "Dönüş transferi", book: "Rezervasyon", call: "Bizi arayın", wa: "Bize yazın", web: "Web sitesi", rights: "Tüm hakları saklıdır." }
};
const HOST = site.url.replace(/^https?:\/\/(www\.)?/, "");

// The booking in titled blocks: transfer, return, booking
function blocks(b) {
  const t = T[b.lang], f = F[b.lang], L = b.lang;
  const trip = [
    [t.route, zoneName(b.from, L) + " → " + zoneName(b.to, L)],
    [t.when, day(b.date, L) + " " + b.time],
    b.pickup ? [f.addr, b.pickup] : null,
    b.flight ? [t.flight, b.flight] : null
  ];
  const back = b.ret && [
    [t.route, zoneName(b.to, L) + " → " + zoneName(b.from, L)],
    [t.when, day(b.ret.date, L) + " " + b.ret.time],
    b.ret.pickup ? [f.addr, b.ret.pickup] : null,
    b.ret.flight ? [t.flight, b.ret.flight] : null
  ];
  const book = [[t.ref, b.ref], [t.car, carName(b.car, L)], [t.pax, String(b.pax)], [t.total, b.price.total + " " + P.currency], [t.pay, t.cash]];
  return [[f.trip, trip], back ? [f.back, back] : null, [f.book, book]].filter(Boolean).map(x => [x[0], x[1].filter(Boolean)]);
}
// Black bar with a mustard edge over each block, rows on alternating ice and white
function section(title, rows) {
  return `<div style="margin:18px 0 0;background:#000000;color:#ffffff;font-weight:700;font-size:14px;padding:9px 14px;border-radius:8px 8px 0 0;border-left:4px solid #e1ad01">${esc(title)}</div>` +
    `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #d5e9f1">` +
    rows.map((r, i) => { const bg = "background:" + (i % 2 ? "#ffffff" : "#eaf4f8") + ";";
      return `<tr><td style="${bg}padding:8px 12px;border-bottom:1px solid #d5e9f1;color:#4b5761;width:38%;vertical-align:top">${esc(r[0])}</td><td style="${bg}padding:8px 12px;border-bottom:1px solid #d5e9f1;color:#111316;font-weight:700">${esc(r[1])}</td></tr>`; }).join("") + "</table>";
}
function meet(b) {
  if (!P.zones.find(z => z.id === b.from && z.type === "airport")) return "";
  return `<h3 style="margin:24px 0 0;font-size:17px;border-top:3px solid #e1ad01;padding-top:14px">📍 ${esc(T[b.lang].meet)}</h3><p style="margin:8px 0 0;line-height:1.55">${esc(site.meet[b.from][b.lang])}</p>`;
}
// Frame of every e-mail: logo on black, content, contact buttons, company block. `hero`: band under the logo.
function layout(lang, inner, hero) {
  const f = F[lang], u = site.url;
  const btn = (href, bg, fg, border, icon, small, big) => `<a href="${href}" style="display:block;background:${bg};color:${fg};text-decoration:none;border-radius:12px;padding:14px 10px;margin:0 0 10px;text-align:center${border ? ";border:2px solid " + border : ""}">` +
    `<div style="font-size:20px;line-height:1">${icon}</div><div style="font-size:13px;opacity:.85;margin-top:6px">${esc(small)}</div><div style="font-size:18px;font-weight:800;margin-top:2px">${esc(big)}</div></a>`;
  const fl = 'style="color:#c9e3ee;text-decoration:none"';
  return `<!doctype html><html lang="${lang}"><body style="margin:0;background:#eaf4f8;font-family:Segoe UI,Roboto,Arial,sans-serif;color:#111316">` +
    `<div style="max-width:600px;margin:0 auto;padding:20px 12px">` +
    `<div style="background:#000000;padding:14px 22px;border-radius:14px 14px 0 0;border-bottom:4px solid #e1ad01;text-align:center">` +
    `<a href="${u}"><img src="${u}/img/mail/logo.png" width="170" alt="${esc(site.brand)}" style="display:inline-block;border:0;width:170px;height:auto"></a></div>` +
    (hero || "") +
    `<div style="background:#ffffff;padding:22px;line-height:1.55;font-size:15px">${inner}</div>` +
    `<div style="background:#ffffff;padding:4px 22px 18px">` +
    btn("tel:+" + site.whatsapp, "#000000", "#ffffff", "", "☎", f.call, site.phone) +
    btn("https://wa.me/" + site.whatsapp, "#1f9d55", "#ffffff", "", "💬", "WhatsApp", f.wa) +
    btn(u, "#ffffff", "#000000", "#e1ad01", "🌐", f.web, HOST) + "</div>" +
    `<div style="background:#000000;color:#c9e3ee;padding:22px;border-radius:0 0 14px 14px;font-size:13px;line-height:1.8;text-align:center">` +
    `<div style="color:#e1ad01;font-weight:800;font-size:18px;margin-bottom:4px">${esc(site.brand)}</div>` +
    `<div style="color:#ffffff">${esc(site.company)}</div>` +
    `<div><span style="display:inline-block;background:#e1ad01;color:#000000;font-weight:700;border-radius:6px;padding:1px 8px">TÜRSAB No: ${esc(site.tursab)}</span></div>` +
    `<div>✉ <a href="mailto:${esc(site.email)}" ${fl}>${esc(site.email)}</a></div>` +
    `<div>📍 ${esc(site.address[lang] || site.address.en)}</div>` +
    `<div style="border-top:1px solid #2a2c30;border-bottom:1px solid #2a2c30;margin:12px 0;padding:8px 0"><a href="tel:+${esc(site.whatsapp)}" style="color:#ffffff;text-decoration:none">☎ ${esc(site.phone)}</a> &nbsp;|&nbsp; <a href="https://wa.me/${esc(site.whatsapp)}" style="color:#ffffff;text-decoration:none">WhatsApp</a></div>` +
    `<div style="font-size:12px;color:#9aa7b0">© ${new Date().getFullYear()} ${esc(site.brand)}. ${esc(f.rights)}</div></div>` +
    "</div></body></html>";
}

function html(b, kind, reason) {
  const t = T[b.lang], [title, lead] = t[kind];
  const text = esc(lead).replace("{name}", esc(b.name)).replace("{reason}", reason ? esc(reason) + " " : "");
  let hero = "";
  if (kind === "confirmed") hero = `<div style="background:#000000;padding:26px 22px;text-align:center"><div style="color:#ffffff;font-size:38px;font-weight:900;letter-spacing:6px;line-height:1.1">VOUCHER</div>` +
    `<div style="color:#e1ad01;font-size:16px;font-weight:700;margin-top:6px">${esc(b.ref)}</div>` +
    `<div style="margin-top:12px"><span style="display:inline-block;background:#1d7a46;color:#ffffff;font-weight:700;font-size:14px;border-radius:999px;padding:5px 16px">✓ ${esc(title)}</span></div></div>`;
  if (kind === "declined") hero = `<div style="background:#000000;padding:22px;text-align:center"><span style="display:inline-block;background:#b42318;color:#ffffff;font-weight:800;font-size:16px;border-radius:999px;padding:6px 18px">✕ ${esc(title)}</span></div>`;
  const inner = (kind === "received" ? `<h1 style="font-size:20px;margin:0 0 12px">${esc(title)}</h1>` : "") + `<p style="margin:0 0 12px">${text}</p>` +
    (kind === "declined" ? "" : blocks(b).map(x => section(x[0], x[1])).join("") + meet(b));
  return layout(b.lang, inner, hero);
}

async function send(to, subject, body) {
  const key = process.env.RESEND_API_KEY;
  if (!key || !to) return false;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.MAIL_FROM || site.brand + " <onboarding@resend.dev>", to: [to], subject, html: body, reply_to: site.email })
  });
  if (!r.ok) throw new Error("resend " + r.status + " " + (await r.text().catch(() => "")));
  return true;
}

// Short reason for the booking history, e.g. "resend 403 The domain is not verified"
function why(e) {
  const m = String((e && e.message) || e);
  const j = m.match(/"message"\s*:\s*"([^"]*)"/);
  return (j ? m.split(" ").slice(0, 2).join(" ") + " " + j[1] : m).slice(0, 200);
}

function toCustomer(b, kind, reason) {
  return send(b.email, T[b.lang][kind][0] + " · " + b.ref, html(b, kind, reason));
}
function toOffice(b) {
  const tb = Object.assign({}, b, { lang: "tr" });
  const who = [["Müşteri", b.name], ["Telefon", b.phone], ["E-posta", b.email], ["Site dili", String(b.lang || "-").toUpperCase()], b.note ? ["Not", b.note] : null].filter(Boolean);
  const inner = `<h2 style="margin:0 0 12px;font-size:19px">Yeni rezervasyon talebi · ${esc(b.ref)}</h2><p style="margin:0 0 4px">Onaylamak için admin paneline girin.</p>` +
    section("Müşteri", who) + blocks(tb).map(x => section(x[0], x[1])).join("") +
    `<div style="margin:20px 0 0"><a href="${site.url}/admin" style="display:inline-block;background:#e1ad01;color:#000000;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:8px">Panelde aç</a></div>`;
  return send(process.env.OFFICE_EMAIL || site.email, "Yeni talep " + b.ref + " · " + b.date + " " + b.time, layout("tr", inner));
}

module.exports = { toCustomer, toOffice, html, why };
