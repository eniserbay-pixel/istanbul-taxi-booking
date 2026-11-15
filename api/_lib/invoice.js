// The invoice that goes with the thank-you e-mail once a booking is Tamamlandı (mail.js, kind "thanks"): a one-page
// A4 PDF (pdfkit), labels in Turkish and English, in this site's logo and colours; the seller is the same company
// on every brand. It is an informational invoice, not a Turkish e-Fatura / e-Arşiv invoice, and the PDF says so.
// The number comes from the Transfer3E panel, which numbers every brand's invoices (booking.invoice {no, date},
// sent with the thank-you through api/hub.js); a booking thanked from this site's own panel gets BRAND.prefix-ref.
// No invoice for a booking without a price or for a B2B partner's booking (partners are invoiced monthly).
const path = require("path");

const BRAND = {
  name: "Istanbul Taxi Booking", prefix: "ITB", web: "istanbultaxibooking.com", email: "info@istanbultaxibooking.com", phone: "+90 541 334 21 02",
  logo: "logo.png", logoH: 70, logoPlate: false,
  c: { band: "#000000", bandText: "#e1ad01", bandSub: "#d4d4d4", accent: "#e1ad01", accentText: "#1a1300", head: "#111111", headText: "#e1ad01", soft: "#fff4dc" }
};
const SELLER = {
  name: "3E SEYAHAT ORGANİZASYON TURİZM VE TAŞIMACILIK LTD. ŞTİ.",
  address: "Yenişehir Mah. Şefika Sok. No:4/452, 34912 Pendik / İstanbul / Türkiye",
  taxOffice: "", // the tax office's name; the line is left out while it is empty
  taxNo: "3190398599",
  tursab: "12556"
};
const DIR = path.join(__dirname, "voucher");
const F = { r: path.join(DIR, "DejaVuSans.ttf"), b: path.join(DIR, "DejaVuSans-Bold.ttf") };
const PAY = { nakit: "Nakit / Cash", kart: "Kredi kartı / Card", havale: "Havale / Bank transfer", cari: "Cari hesap / On account", odendi: "Ödendi / Paid" };

// The e-mail's invoice box, in the thank-you e-mail's languages: {no} invoice number, {ref} booking, {t} total
const MAILTEXT = {
  en: { t: "Your invoice is attached", b1: "We have attached the invoice for this trip as a PDF ({no}, booking {ref}, total {t}). It lists the service, date, amount and payment, so you can keep it for your expense claim or your own records.", b2: "If you need the invoice in a company's name, just reply to this e-mail with the company name, tax number and address and we will send you an updated invoice." },
  tr: { t: "Faturanız ekte", b1: "Bu yolculuğun faturasını PDF olarak bu e-postaya ekledik ({no}, rezervasyon {ref}, toplam {t}). Faturada aldığınız hizmet, tarih, tutar ve ödeme bilgisi yer alır; masraf beyanı veya kendi kayıtlarınız için saklayabilirsiniz.", b2: "Faturanın bir şirket adına düzenlenmesini istiyorsanız bu e-postayı firma unvanı, vergi numarası ve adresinizle yanıtlayın; güncel faturayı size yeniden gönderelim." },
  de: { t: "Ihre Rechnung im Anhang", b1: "Die Rechnung für diese Fahrt finden Sie als PDF im Anhang ({no}, Buchung {ref}, Gesamtbetrag {t}). Sie enthält Leistung, Datum, Betrag und Zahlung, sodass Sie sie für Ihre Spesenabrechnung oder Ihre Unterlagen aufbewahren können.", b2: "Benötigen Sie die Rechnung auf eine Firma? Antworten Sie einfach auf diese E-Mail mit Firmenname, Steuernummer und Adresse, und wir senden Ihnen eine aktualisierte Rechnung." },
  fr: { t: "Votre facture est jointe", b1: "Vous trouverez en pièce jointe la facture de ce trajet au format PDF ({no}, réservation {ref}, total {t}). Elle indique la prestation, la date, le montant et le paiement : vous pouvez la conserver pour vos notes de frais ou vos archives.", b2: "Si vous avez besoin d'une facture au nom d'une société, répondez simplement à cet e-mail avec la raison sociale, le numéro fiscal et l'adresse, et nous vous enverrons une facture mise à jour." },
  it: { t: "In allegato la sua fattura", b1: "In allegato trova la fattura di questo viaggio in PDF ({no}, prenotazione {ref}, totale {t}). Riporta servizio, data, importo e pagamento: può conservarla per la nota spese o per i suoi archivi.", b2: "Se le serve la fattura intestata a un'azienda, risponda a questa e-mail con ragione sociale, partita IVA e indirizzo e le invieremo una fattura aggiornata." },
  ru: { t: "Счёт во вложении", b1: "Счёт за эту поездку приложен к письму в формате PDF ({no}, бронирование {ref}, итого {t}). В нём указаны услуга, дата, сумма и оплата — его можно сохранить для авансового отчёта или своих записей.", b2: "Если счёт нужен на компанию, ответьте на это письмо, указав название компании, налоговый номер и адрес, и мы пришлём обновлённый счёт." }
};

const r2 = n => Math.round((Number(n) || 0) * 100) / 100;
function money(n, cur) {
  const v = r2(n).toFixed(2);
  return cur === "EUR" ? "€" + v : cur === "USD" ? "$" + v : v + " " + (cur === "TRY" ? "TL" : cur || "");
}
const dmy = s => (s ? String(s).slice(0, 10).split("-").reverse().join(".") : "");
const today = () => new Intl.DateTimeFormat("tr-TR", { timeZone: "Europe/Istanbul", day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date());
const place = (n, a) => [n, a].map(v => String(v == null ? "" : v).trim()).filter(Boolean).join(", ");
const join = (...a) => a.filter(Boolean).join(" · ");

// The invoice of a booking, or null when it gets none
function data(b) {
  if (!b || !(Number(b.total) > 0)) return null;
  if (b.partner || b.partnerName || b.source === "b2b") return null;
  const legs = Array.isArray(b.legs) ? b.legs : [], g = legs[0] || {};
  const kind = b.tour ? "tour" : b.hourly ? "hourly" : "transfer";
  const r = kind === "transfer" ? legs[1] || null : null;
  const car = b.carName || g.carName || "", pax = g.pax ? g.pax + " kişi / pax" : "";
  const items = [];
  if (kind === "hourly") items.push({ title: "Şoförlü araç / Chauffeur · " + ((b.hourly && b.hourly.hours) || "") + " saat / hours", sub: join(place(g.fromName || g.from, g.fromAddr), car, pax), date: dmy(g.date), amount: null });
  else if (kind === "tour") items.push({ title: String((b.tour && b.tour.name) || "Tur / Tour"), sub: join("Tur / Tour", car, pax), date: dmy(g.date), amount: null });
  else {
    items.push({ title: place(g.fromName || g.from, g.fromAddr) + " → " + place(g.toName || g.to, g.toAddr), sub: join(r ? "Gidiş / Outbound" : "Transfer", car, pax, g.flight ? "Uçuş / Flight " + g.flight : ""), date: dmy(g.date), amount: Number(g.price) || null });
    if (r) items.push({ title: place(r.fromName || r.from, r.fromAddr) + " → " + place(r.toName || r.to, r.toAddr), sub: join("Dönüş / Return", car, pax, r.flight ? "Uçuş / Flight " + r.flight : ""), date: dmy(r.date), amount: Number(r.price) || null });
  }
  const total = r2(b.total);
  // leg prices that do not add up to the total (changed later): the total on the first line
  if (items.some(it => !it.amount) || Math.abs(items.reduce((s, it) => s + (it.amount || 0), 0) - total) >= 0.01) items.forEach((it, i) => { it.amount = i ? null : total; });
  const inv = b.invoice && b.invoice.no ? b.invoice : { no: String(b.ref || b.id).indexOf(BRAND.prefix + "-") === 0 ? String(b.ref) : BRAND.prefix + "-" + (b.ref || b.id), date: today() };
  const c = b.customer || {}, pay = b.payment || "nakit";
  return {
    no: String(inv.no), date: String(inv.date || today()), vatRate: Number(inv.vatRate) || 20, ref: String(b.ref || "#" + b.id), cur: b.currency || "EUR", total,
    payment: PAY[pay] || pay, paid: pay !== "cari",
    customer: { name: c.name || (b.passenger && b.passenger.name) || "", email: c.email || "", phone: c.phone || "" },
    items
  };
}

// The PDF (Buffer) of the invoice data
function build(inv) {
  const PDFDocument = require("pdfkit");
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 40, info: { Title: "Fatura / Invoice " + inv.no, Author: BRAND.name } });
    const out = [];
    doc.on("data", c => out.push(c)).on("end", () => resolve(Buffer.concat(out))).on("error", reject);
    doc.registerFont("r", F.r).registerFont("b", F.b);
    const C = BRAND.c, L = 40, W = doc.page.width - 80, PW = doc.page.width, PH = doc.page.height;

    // Header band: the logo (on a white plate when it has a white background), FATURA / INVOICE on the right
    const bandH = 96;
    doc.rect(0, 0, PW, bandH).fill(C.band);
    const im = doc.openImage(path.join(DIR, BRAND.logo));
    const lw = Math.min(220, (BRAND.logoH * im.width) / im.height), lh = (lw * im.height) / im.width, ly = (bandH - lh) / 2;
    if (BRAND.logoPlate) doc.roundedRect(L - 8, ly - 6, lw + 16, lh + 12, 6).fill("#ffffff");
    doc.image(im, L, ly, { width: lw });
    doc.font("b").fontSize(24).fillColor(C.bandText).text("FATURA", L, 22, { width: W, align: "right", characterSpacing: 2 });
    doc.font("r").fontSize(10).fillColor(C.bandSub).text("INVOICE", L, 52, { width: W, align: "right", characterSpacing: 3 });
    doc.rect(0, bandH, PW, 4).fill(C.accent);

    // Seller (left) and the invoice's numbers (right)
    let y = bandH + 22;
    const col = (W - 20) / 2;
    const label = (t, x, yy, w) => doc.font("b").fontSize(7.5).fillColor("#6b7280").text(t, x, yy, { width: w, characterSpacing: 0.6 });
    label("SATICI / SELLER", L, y, col);
    doc.font("b").fontSize(9.5).fillColor("#111827").text(SELLER.name, L, y + 12, { width: col });
    doc.font("r").fontSize(8.5).fillColor("#374151");
    doc.text(SELLER.address, { width: col });
    if (SELLER.taxOffice) doc.text("Vergi Dairesi / Tax Office: " + SELLER.taxOffice, { width: col });
    doc.text("VKN / Tax No: " + SELLER.taxNo, { width: col });
    doc.text("TÜRSAB No: " + SELLER.tursab, { width: col });
    doc.text(BRAND.email + "  ·  " + BRAND.phone, { width: col });
    doc.text(BRAND.web, { width: col });
    const sellerEnd = doc.y;
    const mx = L + col + 20;
    const meta = [["Fatura No / Invoice No", inv.no], ["Fatura Tarihi / Date", inv.date], ["Rezervasyon / Booking", inv.ref], ["Ödeme / Payment", inv.payment]];
    doc.roundedRect(mx, y - 4, col, meta.length * 19 + 10, 6).fill(C.soft);
    meta.forEach(([k, v], i) => {
      const yy = y + 4 + i * 19;
      doc.font("r").fontSize(8.5).fillColor("#4b5563").text(k, mx + 10, yy, { width: col / 2 });
      doc.font("b").fontSize(9).fillColor("#111827").text(v, mx + col / 2 - 10, yy, { width: col / 2, align: "right" });
    });

    // Bill to
    y = Math.max(sellerEnd, y + meta.length * 19 + 10) + 18;
    label("ALICI / BILL TO", L, y, W);
    doc.font("b").fontSize(10).fillColor("#111827").text(inv.customer.name || "-", L, y + 12, { width: W });
    const contact = [inv.customer.email, inv.customer.phone].filter(Boolean).join("  ·  ");
    if (contact) doc.font("r").fontSize(8.5).fillColor("#374151").text(contact, { width: W });
    y = doc.y + 18;

    // The services
    const cols = [{ t: "Hizmet / Service", w: W - 250, a: "left" }, { t: "Tarih / Date", w: 80, a: "left" }, { t: "Adet / Qty", w: 70, a: "center" }, { t: "Tutar / Amount", w: 100, a: "right" }];
    doc.rect(L, y, W, 22).fill(C.head);
    let x = L;
    cols.forEach(c => { doc.font("b").fontSize(8).fillColor(C.headText).text(c.t, x + 8, y + 7, { width: c.w - 16, align: c.a }); x += c.w; });
    y += 22;
    inv.items.forEach((it, i) => {
      doc.font("b").fontSize(9);
      const h1 = doc.heightOfString(it.title, { width: cols[0].w - 16 });
      doc.font("r").fontSize(8);
      const h2 = it.sub ? doc.heightOfString(it.sub, { width: cols[0].w - 16 }) : 0;
      const h = Math.max(30, h1 + h2 + 16);
      if (i % 2) doc.rect(L, y, W, h).fill("#f7f8fa");
      doc.font("b").fontSize(9).fillColor("#111827").text(it.title, L + 8, y + 8, { width: cols[0].w - 16 });
      if (it.sub) doc.font("r").fontSize(8).fillColor("#4b5563").text(it.sub, L + 8, doc.y + 1, { width: cols[0].w - 16 });
      let xx = L + cols[0].w;
      [it.date, "1", it.amount == null ? "dahil / incl." : money(it.amount, inv.cur)].forEach((v, j) => {
        const c = cols[j + 1];
        doc.font(j === 2 ? "b" : "r").fontSize(9).fillColor("#111827").text(v, xx + 8, y + 8, { width: c.w - 16, align: c.a });
        xx += c.w;
      });
      y += h;
      doc.moveTo(L, y).lineTo(L + W, y).lineWidth(0.5).strokeColor("#e5e7eb").stroke();
    });

    // Totals: the net and the VAT inside the total
    y += 12;
    const tw = 290, tx = L + W - tw, vat = inv.total - inv.total / (1 + inv.vatRate / 100);
    [["Ara Toplam (KDV hariç) / Subtotal (excl. VAT)", money(inv.total - vat, inv.cur)], ["KDV / VAT %" + inv.vatRate, money(vat, inv.cur)]].forEach(([k, v]) => {
      doc.font("r").fontSize(8.5).fillColor("#4b5563").text(k, tx, y, { width: tw - 85 });
      doc.font("r").fontSize(9).fillColor("#111827").text(v, tx + tw - 80, y, { width: 80, align: "right" });
      y += 16;
    });
    doc.rect(tx, y + 2, tw, 30).fill(C.accent);
    doc.font("b").fontSize(10).fillColor(C.accentText).text("TOPLAM / TOTAL", tx + 10, y + 12, { width: tw - 130 });
    doc.font("b").fontSize(13).fillColor(C.accentText).text(money(inv.total, inv.cur), tx + tw - 130, y + 10, { width: 120, align: "right" });
    y += 34;
    if (inv.paid) {
      doc.roundedRect(L, y - 30, 150, 24, 12).fill("#dcfce7");
      doc.font("b").fontSize(9).fillColor("#15803d").text("✓ ÖDENDİ / PAID", L, y - 23, { width: 150, align: "center" });
    }
    y += 26;
    doc.font("b").fontSize(10).fillColor(C.head).text(BRAND.name + " ile yolculuk ettiğiniz için teşekkür ederiz.", L, y, { width: W });
    doc.font("r").fontSize(9).fillColor("#4b5563").text("Thank you for travelling with " + BRAND.name + ".", { width: W });

    // Foot: the note that this is not an e-Arşiv invoice, then the contact band
    doc.page.margins.bottom = 0;
    const fy = PH - 118;
    doc.roundedRect(L, fy, W, 46, 6).fill("#fff7ed");
    doc.font("b").fontSize(7.5).fillColor("#9a3412").text("Bilgilendirme / Note", L + 10, fy + 7, { width: W - 20 });
    doc.font("r").fontSize(7.2).fillColor("#7c2d12").text(
      "Bu belge, aldığınız hizmet için düzenlenmiş bilgi amaçlı bir hizmet faturasıdır; Gelir İdaresi Başkanlığı'na bildirilen e-Fatura / e-Arşiv fatura yerine geçmez. " +
      "This document is an informational invoice for the service you received; it is not an official Turkish e-Invoice / e-Archive invoice.",
      L + 10, fy + 18, { width: W - 20 });
    doc.rect(0, PH - 56, PW, 56).fill(C.band);
    doc.font("r").fontSize(8).fillColor(C.bandSub).text(BRAND.name + "  ·  " + BRAND.web + "  ·  " + BRAND.email + "  ·  WhatsApp " + BRAND.phone, L, PH - 38, { width: W, align: "center", lineBreak: false });
    doc.font("r").fontSize(7).fillColor(C.bandSub).text(SELLER.name + "  ·  TÜRSAB " + SELLER.tursab, L, PH - 24, { width: W, align: "center", lineBreak: false });
    doc.end();
  });
}

// The thank-you e-mail's invoice part for booking `b` in `lang`: {html, text, attachments (a promise)}, or null
function forMail(b, lang, esc) {
  const inv = data(b);
  if (!inv) return null;
  const I = MAILTEXT[lang] || MAILTEXT.en;
  const b1 = I.b1.replace("{no}", inv.no).replace("{ref}", inv.ref).replace("{t}", money(inv.total, inv.cur));
  const html = '<div style="border:1px solid #e3e7ee;border-inline-start:5px solid ' + BRAND.c.accent + ';border-radius:10px;padding:14px 16px;background:#fafbfc;margin:4px 0 16px">' +
    '<div style="font-weight:800;font-size:16px;margin:0 0 6px">📎 ' + esc(I.t) + '</div><p style="margin:0 0 8px">' + esc(b1) + '</p>' +
    '<p style="margin:0;color:#5b6678;font-size:14px">' + esc(I.b2) + '</p></div>';
  return {
    html, text: [I.t, b1, I.b2].join("\n"),
    attachments: build(inv).then(buf => [{ filename: inv.no + ".pdf", content: buf.toString("base64") }])
  };
}

module.exports = { data, build, forMail, money, BRAND, SELLER };
