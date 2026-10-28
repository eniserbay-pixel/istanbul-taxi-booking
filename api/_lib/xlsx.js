// A small Excel (.xlsx) file from rows, without a library: one sheet, the first row bold as the header,
// numbers kept as numbers so Excel can sum them. An .xlsx is a zip of XML files; this writes the zip
// uncompressed (method "stored"), which every spreadsheet program opens.
const CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
  return t;
})();
function crc32(buf) { let c = 0xffffffff; for (const b of buf) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }

function zip(files) {
  const parts = [], dir = [];
  let off = 0;
  for (const f of files) {
    const name = Buffer.from(f.name), data = Buffer.from(f.data), crc = crc32(data);
    const h = Buffer.alloc(30);
    h.writeUInt32LE(0x04034b50, 0); h.writeUInt16LE(20, 4); h.writeUInt16LE(0x0800, 6); h.writeUInt16LE(0, 8);
    h.writeUInt16LE(0, 10); h.writeUInt16LE(0x21, 12); h.writeUInt32LE(crc, 14); h.writeUInt32LE(data.length, 18);
    h.writeUInt32LE(data.length, 22); h.writeUInt16LE(name.length, 26); h.writeUInt16LE(0, 28);
    parts.push(h, name, data);
    const d = Buffer.alloc(46);
    d.writeUInt32LE(0x02014b50, 0); d.writeUInt16LE(20, 4); d.writeUInt16LE(20, 6); d.writeUInt16LE(0x0800, 8);
    d.writeUInt16LE(0, 10); d.writeUInt16LE(0, 12); d.writeUInt16LE(0x21, 14); d.writeUInt32LE(crc, 16);
    d.writeUInt32LE(data.length, 20); d.writeUInt32LE(data.length, 24); d.writeUInt16LE(name.length, 28);
    d.writeUInt32LE(off, 42);
    dir.push(d, name);
    off += h.length + name.length + data.length;
  }
  const size = dir.reduce((n, b) => n + b.length, 0), end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(files.length, 8); end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(size, 12); end.writeUInt32LE(off, 16);
  return Buffer.concat([...parts, ...dir, end]);
}

const x = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "");
const col = i => { let s = ""; i++; while (i) { const m = (i - 1) % 26; s = String.fromCharCode(65 + m) + s; i = (i - m - 1) / 26; } return s; };

// rows: arrays of strings / numbers / empty; bold: indexes of rows to set in bold besides the header
function build(sheet, rows, bold) {
  const strong = new Set([0].concat(bold || []));
  const widths = [];
  rows.forEach(r => r.forEach((v, i) => { widths[i] = Math.min(50, Math.max(widths[i] || 8, String(v == null ? "" : v).length + 2)); }));
  const body = rows.map((r, ri) => '<row r="' + (ri + 1) + '">' + r.map((v, ci) => {
    if (v === "" || v == null) return "";
    const ref = col(ci) + (ri + 1), s = strong.has(ri) ? ' s="1"' : "";
    return typeof v === "number" && Number.isFinite(v) ? '<c r="' + ref + '"' + s + '><v>' + v + '</v></c>'
      : '<c r="' + ref + '"' + s + ' t="inlineStr"><is><t xml:space="preserve">' + x(v) + '</t></is></c>';
  }).join("") + '</row>').join("");
  const head = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
  return zip([
    { name: "[Content_Types].xml", data: head + '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>' },
    { name: "_rels/.rels", data: head + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>' },
    { name: "xl/workbook.xml", data: head + '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="' + x(String(sheet).slice(0, 31)) + '" sheetId="1" r:id="rId1"/></sheets></workbook>' },
    { name: "xl/_rels/workbook.xml.rels", data: head + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>' },
    { name: "xl/styles.xml", data: head + '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf/></cellStyleXfs><cellXfs count="2"><xf fontId="0" xfId="0"/><xf fontId="1" xfId="0" applyFont="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>' },
    { name: "xl/worksheets/sheet1.xml", data: head + '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><cols>' + widths.map((w, i) => '<col min="' + (i + 1) + '" max="' + (i + 1) + '" width="' + w + '" customWidth="1"/>').join("") + '</cols><sheetData>' + body + '</sheetData></worksheet>' }
  ]);
}

module.exports = { build };
