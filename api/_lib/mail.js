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

function details(b) {
  const t = T[b.lang], L = b.lang;
  const rows = [
    [t.ref, b.ref],
    [t.route, zoneName(b.from, L) + " → " + zoneName(b.to, L)],
    [t.when, day(b.date, L) + " " + b.time + (b.pickup ? " · " + b.pickup : "")],
    b.flight ? [t.flight, b.flight] : null,
    b.ret ? [t.back, day(b.ret.date, L) + " " + b.ret.time + (b.ret.flight ? " · " + b.ret.flight : "")] : null,
    [t.car, carName(b.car, L)],
    [t.pax, String(b.pax)],
    [t.total, b.price.total + " " + P.currency],
    [t.pay, t.cash]
  ].filter(Boolean);
  if (P.zones.find(z => z.id === b.from && z.type === "airport")) rows.push([t.meet, site.meet[b.from][L]]);
  return rows;
}

function html(b, kind, reason) {
  const t = T[b.lang], [title, lead] = t[kind];
  const text = esc(lead).replace("{name}", esc(b.name)).replace("{reason}", reason ? esc(reason) + " " : "");
  const rows = kind === "declined" ? [] : details(b);
  return `<!doctype html><html><body style="margin:0;background:#eef6f9;font-family:Arial,Helvetica,sans-serif;color:#111">
<div style="max-width:560px;margin:0 auto;padding:24px">
<div style="background:#000;color:#e1ad01;padding:18px 22px;border-radius:12px 12px 0 0;font-weight:700;font-size:18px">${esc(site.brand)}</div>
<div style="background:#fff;padding:22px;border-radius:0 0 12px 12px">
<h1 style="font-size:20px;margin:0 0 12px">${esc(title)}</h1><p style="line-height:1.5;margin:0 0 18px">${text}</p>
${rows.length ? `<table style="width:100%;border-collapse:collapse;font-size:14px">${rows.map(r => `<tr><td style="padding:7px 0;color:#555;border-top:1px solid #e6e6e6;width:42%">${esc(r[0])}</td><td style="padding:7px 0;border-top:1px solid #e6e6e6;font-weight:600">${esc(r[1])}</td></tr>`).join("")}</table>` : ""}
<p style="margin:20px 0 0;font-size:14px">${esc(t.help)}: <a href="https://wa.me/${esc(site.whatsapp)}" style="color:#0b0b0c;font-weight:700">${esc(site.phone)}</a></p>
</div></div></body></html>`;
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

function toCustomer(b, kind, reason) {
  return send(b.email, T[b.lang][kind][0] + " · " + b.ref, html(b, kind, reason));
}
function toOffice(b) {
  const rows = details(Object.assign({}, b, { lang: "tr" }));
  const body = `<p>Siteden yeni rezervasyon talebi. Onaylamak için admin paneline girin.</p><table>${rows.map(r => `<tr><td>${esc(r[0])}</td><td><b>${esc(r[1])}</b></td></tr>`).join("")}
<tr><td>Müşteri</td><td><b>${esc(b.name)}</b> · ${esc(b.phone)} · ${esc(b.email)}</td></tr>${b.note ? `<tr><td>Not</td><td>${esc(b.note)}</td></tr>` : ""}</table>`;
  return send(process.env.OFFICE_EMAIL || site.email, "Yeni talep " + b.ref + " · " + b.date + " " + b.time, body);
}

module.exports = { toCustomer, toOffice, html };
