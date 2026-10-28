// Booking voucher as a one-page A4 PDF, attached to the approval e-mail. Built with pdfkit; fonts and pictures
// are bundled next to this file so the function needs nothing at run time. DejaVu Sans covers Latin, Turkish,
// Cyrillic and Greek; Arabic bookings get the voucher in English because pdfkit does not lay out right-to-left text.
// Outbound and return sit side by side. If a long booking still does not fit, it is drawn again a little
// smaller (down to 75%); only then may it run onto a second page.
const path = require("path");
const PDFDocument = require("pdfkit");

const DIR = path.join(__dirname, "voucher");
const F = { r: path.join(DIR, "DejaVuSans.ttf"), b: path.join(DIR, "DejaVuSans-Bold.ttf") };
const IMG = n => path.join(DIR, n);
const C = { navy: "#000000", ink: "#0b1d30", muted: "#5b6678", line: "#e3e7ee", zebra: "#eaf4f8", amber: "#e1ad01", amberSoft: "#fff4dc", green: "#16a34a", wa: "#1f9d55", white: "#ffffff" };

async function build(d) {
  for (let k = 1; k >= 0.75; k -= 0.05) {
    const r = await draw(d, k, false);
    if (!r.overflow) return r.buf;
  }
  return (await draw(d, 0.75, true)).buf;
}

// k: size factor. `allowPages`: last attempt, may add a page instead of overflowing.
function draw(d, k, allowPages) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 30, info: { Title: "Voucher " + d.ref, Author: "ITB Transfer" } });
    const out = [];
    let overflow = false;
    doc.on("data", c => out.push(c)).on("end", () => resolve({ buf: Buffer.concat(out), overflow })).on("error", reject);
    doc.registerFont("r", F.r).registerFont("b", F.b);
    const L = 30, W = doc.page.width - 60, PAGE_BOTTOM = doc.page.height - 28;
    const s = n => n * k;
    const FOOT = s(122);
    let bottom = PAGE_BOTTOM - FOOT - 8;
    const room = h => {
      if (doc.y + h <= bottom) return;
      if (allowPages) { doc.addPage(); doc.y = 30; bottom = PAGE_BOTTOM; } else overflow = true;
    };

    // Header: logo left, VOUCHER, booking number and status right
    doc.image(IMG("logo.png"), L, 28, { width: s(110) });
    doc.font("b").fontSize(s(24)).fillColor(C.navy).text("VOUCHER", L, 26, { width: W, align: "right", characterSpacing: 2 });
    doc.font("b").fontSize(s(11)).fillColor(C.amber).text(d.ref, L, 26 + s(30), { width: W, align: "right" });
    const st = "✓ " + d.V.status, pillW = doc.font("b").fontSize(s(9)).widthOfString(st) + 18, py = 26 + s(47);
    doc.roundedRect(L + W - pillW, py, pillW, s(17), s(8.5)).fill(C.green);
    doc.fillColor(C.white).text(st, L + W - pillW, py + s(4), { width: pillW, align: "center" });
    const lineY = Math.max(py + s(24), 28 + s(110) * 240 / 424 + 6);
    doc.rect(L, lineY, W, 3).fill(C.amber);
    doc.y = lineY + 10;

    // "Something wrong? WhatsApp us" box
    doc.font("b").fontSize(s(9.5));
    const errY = doc.y, errH = doc.heightOfString(d.err, { width: W - 26 }) + s(12);
    doc.roundedRect(L, errY, W, errH, 5).fill(C.amberSoft);
    doc.rect(L, errY, 4, errH).fill(C.amber);
    doc.fillColor(C.ink).text(d.err, L + 14, errY + s(6), { width: W - 26 });
    doc.y = errY + errH + s(4);

    const bar = (t, x, w, y) => {
      doc.roundedRect(x, y, w, s(20), 4).fill(C.navy);
      doc.font("b").fontSize(s(9.5)).fillColor(C.white).text(t, x + 9, y + s(5), { width: w - 18, lineBreak: false, ellipsis: true });
      return y + s(22);
    };
    // Label/value rows in a column; returns the y below them
    const rowsAt = (list, x, w, y) => {
      const lw = w * 0.36, vw = w - lw - 14;
      list.forEach((r, i) => {
        doc.font("b").fontSize(s(8.8));
        const h = Math.max(doc.heightOfString(r[1], { width: vw }), s(10)) + s(6);
        if (i % 2 === 0) doc.rect(x, y, w, h).fill(C.zebra);
        doc.font("r").fontSize(s(8.3)).fillColor(C.muted).text(r[0], x + 7, y + s(3), { width: lw - 8 });
        doc.font("b").fontSize(s(8.8)).fillColor(C.ink).text(r[1], x + lw, y + s(3), { width: vw });
        y += h;
      });
      return y;
    };
    const rowsHeight = (list, w) => {
      const vw = w - w * 0.36 - 14;
      doc.font("b").fontSize(s(8.8));
      return list.reduce((t, r) => t + Math.max(doc.heightOfString(r[1], { width: vw }), s(10)) + s(6), 0);
    };

    // Passenger: one row of up to three cells
    room(s(50));
    let y = bar(d.V.cust, L, W, doc.y + 4);
    const cw = W / d.who.length;
    doc.rect(L, y, W, s(30)).fill(C.zebra);
    d.who.forEach((r, i) => {
      doc.font("r").fontSize(s(7.8)).fillColor(C.muted).text(r[0], L + i * cw + 8, y + s(4), { width: cw - 14, lineBreak: false, ellipsis: true });
      doc.font("b").fontSize(s(9)).fillColor(C.ink).text(r[1], L + i * cw + 8, y + s(15), { width: cw - 14, lineBreak: false, ellipsis: true });
    });
    doc.y = y + s(30);

    // Transfers: side by side when there are two
    const n = d.blocks.length, gap = 12, colW = n > 1 ? (W - gap) / 2 : W;
    const h = Math.max(...d.blocks.map(b => rowsHeight(b.rows, colW))) + s(26);
    room(h);
    const top = doc.y + 6;
    let maxY = top;
    d.blocks.forEach((blk, i) => {
      const x = L + i * (colW + gap);
      maxY = Math.max(maxY, rowsAt(blk.rows, x, colW, bar(blk.title, x, colW, top)));
    });
    doc.y = maxY;

    // Meeting point: one box per airport, side by side when both
    if (d.meet.length) {
      const m2 = d.meet.length > 1, bw = m2 ? (W - gap) / 2 : W, picH = s(m2 ? 92 : 112);
      const textW = m => m2 ? bw - 16 : bw - 16 - (picH + 8) * m.pics.length;
      const boxH = m => {
        doc.font("b").fontSize(s(9));
        let t = doc.heightOfString(m.title, { width: textW(m) });
        doc.font("r").fontSize(s(8.3));
        t += doc.heightOfString(m.text, { width: textW(m) }) + s(14);
        return m2 ? t + picH + 8 : Math.max(t, picH + 14);
      };
      const mh = Math.max(...d.meet.map(boxH));
      room(s(22) + mh + s(26));
      const my = bar(d.meetTitle, L, W, doc.y + 6);
      d.meet.forEach((m, i) => {
        const x = L + i * (bw + gap), tw = textW(m);
        doc.roundedRect(x, my, bw, mh, 5).lineWidth(0.8).strokeColor(C.line).stroke();
        doc.font("b").fontSize(s(9)).fillColor(C.navy).text(m.title, x + 8, my + 7, { width: tw });
        doc.font("r").fontSize(s(8.3)).fillColor(C.ink).text(m.text, x + 8, doc.y + 2, { width: tw });
        const pw = m2 ? (bw - 16 - 8 * (m.pics.length - 1)) / m.pics.length : picH;
        const picY = m2 ? my + mh - picH - 7 : my + 7, picX0 = m2 ? x + 8 : x + bw - 8 - (picH + 8) * m.pics.length + 8;
        m.pics.forEach((p, j) => doc.image(IMG(p), picX0 + j * (pw + 8), picY, { fit: [pw, picH], align: "center", valign: "center" }));
      });
      doc.font("r").fontSize(s(8)).fillColor(C.muted).text(d.help, L, my + mh + 5, { width: W });
    }

    // Contact buttons and company block at the foot of the page
    y = PAGE_BOTTOM - FOOT;
    const bw3 = (W - 16) / 3, bh = s(38);
    [[C.navy, d.V.call, d.co.phone, null], [C.wa, "WhatsApp", d.V.wa, null], [C.white, d.V.web, "istanbultaxibooking.com", C.amber]].forEach((b, i) => {
      const x = L + i * (bw3 + 8);
      doc.roundedRect(x, y, bw3, bh, 7).fill(b[0]);
      if (b[3]) doc.roundedRect(x, y, bw3, bh, 7).lineWidth(1.3).strokeColor(b[3]).stroke();
      doc.font("r").fontSize(s(7.8)).fillColor(b[3] ? C.muted : C.white).text(b[1], x, y + s(6), { width: bw3, align: "center" });
      doc.font("b").fontSize(s(b[2].length > 20 ? 8.5 : 10.5)).fillColor(b[3] ? C.navy : C.white).text(b[2], x, y + s(19), { width: bw3, align: "center" });
    });
    doc.link(L, y, bw3, bh, "tel:+" + d.co.wa);
    doc.link(L + bw3 + 8, y, bw3, bh, "https://wa.me/" + d.co.wa);
    doc.link(L + 2 * (bw3 + 8), y, bw3, bh, d.site);
    y += bh + s(6);
    const bandH = PAGE_BOTTOM - y;
    doc.roundedRect(L, y, W, bandH, 7).fill(C.navy);
    doc.font("b").fontSize(s(10.5)).fillColor(C.amber).text("ITB Transfer", L, y + s(7), { width: W, align: "center" });
    doc.font("r").fontSize(s(7.8)).fillColor("#c9d3df");
    [d.co.name + "  ·  " + d.co.tursab, d.co.address, d.co.email + "  ·  " + d.co.phone + "  ·  istanbultaxibooking.com"]
      .forEach((t, i) => doc.text(t, L + 10, y + s(22) + i * s(11), { width: W - 20, align: "center", lineBreak: false, ellipsis: true }));
    doc.font("r").fontSize(s(7)).fillColor("#9aabbd").text("© " + new Date().getFullYear() + " ITB Transfer. " + d.V.rights + " " + d.V.tag, L + 10, y + bandH - s(14), { width: W - 20, align: "center", lineBreak: false, ellipsis: true });
    doc.end();
  });
}

module.exports = { build };
