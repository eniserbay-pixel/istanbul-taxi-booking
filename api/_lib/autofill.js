// Manuel Rezervasyon → "Otomatik doldur": the office pastes a WhatsApp message or an e-mail, dictates the booking
// (the browser turns speech into text), or adds a flight ticket / screenshot (image or PDF), and Claude reads the
// booking out of it. Nothing is saved here: the panel puts the result into the form for the office to check and save.
// Needs ANTHROPIC_API_KEY in the Vercel project's environment variables.
const { Anthropic } = require("@anthropic-ai/sdk");

const IMG_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_FILES = 5, MAX_B64 = 3200000, MAX_TEXT = 8000;

const SYSTEM = `You read transfer bookings for ITB Transfer, a private transfer company in Istanbul (airport transfers, transfers inside the city and to nearby cities). The office got a booking by WhatsApp, e-mail, phone or a flight ticket and wants its booking form filled in. You get the text the office typed, pasted or dictated (dictation can have recognition mistakes; read numbers, names and places sensibly), and any tickets, boarding passes, passports or screenshots attached.

Fill in only what the material says or clearly implies; leave a field empty ("" or 0) when it is not there. Never invent a phone number, e-mail, name, flight or price.

- Places: when a pickup or drop-off matches one of the company's zones (list below), give the zone id in "from"/"to" and leave "fromName"/"toName" empty. Istanbul Airport / İstanbul Havalimanı / IST / new airport is IST; Sabiha Gökçen / SAW is SAW; a hotel or address is put in the zone of its district, with the hotel name and address in "fromAddr"/"toAddr". When no zone fits, leave the id empty and write the place in "fromName"/"toName".
- Airport pickups (a flight landing in Istanbul): the transfer date and time are the flight's landing date and time in Istanbul. Drop-offs at the airport: use the pickup time the customer gave; if only the flight's departure is known, leave the time empty and put the departure time in the leg's note and in "warnings".
- Dates as YYYY-MM-DD and times as HH:MM (24 hours). Today in Istanbul is given; a date without a year is the next such date from today. Relative days ("yarın", "tomorrow", "cuma") count from today.
- A round trip has two legs: the first is the arrival / outward transfer, the second the return. At most two legs.
- Flight numbers without spaces, like TK1234 or PC2010.
- "pax" is how many people travel; "bags" how many suitcases; "seatB" baby seats; "seatK" booster seats.
- "car": the vehicle type id from the list below when the customer named one (Vito, minivan, van → minivan; V-Class, VIP van → vclass; Sprinter, minibus → minibus; sedan, car → sedan), else empty.
- Customer: the person who books (the sender). Passenger: only when someone else travels. Phone numbers in international form (+90 5xx…, +44 …) when the country is clear.
- "lang": the customer's language as a two-letter code from: tr, en, de, fr, it, es, nl, ro, ru, el, sr, ar (the language they wrote in, or of the country of their phone number).
- "travelers": everyone named on tickets or passports, with gender (e = male, MR; k = female, MRS/MS/MISS; "" if unknown), nationality as an ISO 3166 two-letter code when a passport shows it, and passport or Turkish ID number when shown.
- "total" and "currency" (EUR, USD, TRY, GBP) only when a price was agreed in the material; "payment": nakit (cash in the car), kart (card), havale (bank transfer) or "" when not said.
- "driverNote": what the driver needs (name sign text, child ages, extra stop, wheelchair…), short, in Turkish. "officeNote": anything else useful for the office, short, in Turkish.
- "warnings": short Turkish notes on what the office should check or ask the customer (missing time, unclear hotel, two possible dates…). Empty list when everything is clear.`;

const LEG = {
  type: "object",
  properties: {
    date: { type: "string" }, time: { type: "string" }, flight: { type: "string" },
    from: { type: "string" }, fromName: { type: "string" }, fromAddr: { type: "string" },
    to: { type: "string" }, toName: { type: "string" }, toAddr: { type: "string" },
    pax: { type: "integer" }, bags: { type: "integer" }, seatB: { type: "integer" }, seatK: { type: "integer" },
    note: { type: "string" }
  },
  required: ["date", "time", "flight", "from", "fromName", "fromAddr", "to", "toName", "toAddr", "pax", "bags", "seatB", "seatK", "note"],
  additionalProperties: false
};
const PERSON = { type: "object", properties: { name: { type: "string" }, phone: { type: "string" }, email: { type: "string" } }, required: ["name", "phone", "email"], additionalProperties: false };
const SCHEMA = {
  type: "object",
  properties: {
    customer: PERSON,
    passenger: PERSON,
    lang: { type: "string" },
    car: { type: "string" },
    legs: { type: "array", items: LEG },
    travelers: { type: "array", items: { type: "object", properties: { name: { type: "string" }, gender: { type: "string" }, nat: { type: "string" }, doc: { type: "string" } }, required: ["name", "gender", "nat", "doc"], additionalProperties: false } },
    total: { type: "number" }, currency: { type: "string" }, payment: { type: "string" },
    driverNote: { type: "string" }, officeNote: { type: "string" },
    warnings: { type: "array", items: { type: "string" } }
  },
  required: ["customer", "passenger", "lang", "car", "legs", "travelers", "total", "currency", "payment", "driverNote", "officeNote", "warnings"],
  additionalProperties: false
};

const s = (v, n) => String(v == null ? "" : v).replace(/\s+/g, " ").trim().slice(0, n);
const err = m => Object.assign(new Error(m), { user: true });

// input: { text, files: [{ type, data (base64, no data: prefix), name }], places: { id: name }, cars: { id: name } }
async function read(input) {
  input = input || {};
  const text = String(input.text || "").trim().slice(0, MAX_TEXT);
  const files = (Array.isArray(input.files) ? input.files : []).slice(0, MAX_FILES).filter(f => f && typeof f.data === "string" && f.data.length < MAX_B64);
  if (!text && !files.length) throw err("Bir mesaj yazın, sesle anlatın ya da bilet ekleyin");
  if (!process.env.ANTHROPIC_API_KEY) throw err("Otomatik doldurma için Vercel'de ANTHROPIC_API_KEY tanımlı olmalı");

  const list = (o, n) => Object.keys(o && typeof o === "object" ? o : {}).slice(0, n).filter(k => /^[A-Za-z0-9_-]{1,30}$/.test(k)).map(k => k + " = " + s(o[k], 60)).join("\n");
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul" }).format(new Date());
  const content = [];
  files.forEach(f => {
    const data = f.data.replace(/\s/g, "");
    if (f.type === "application/pdf") content.push({ type: "document", source: { type: "base64", media_type: "application/pdf", data } });
    else if (IMG_TYPES.includes(f.type)) content.push({ type: "image", source: { type: "base64", media_type: f.type, data } });
  });
  if (!text && !content.length) throw err("Dosya türü desteklenmiyor (resim veya PDF ekleyin)");
  const attached = content.length;
  content.push({ type: "text", text: "Today in Istanbul: " + today + " (" + new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Istanbul", weekday: "long" }).format(new Date()) + ")\n\n" +
    "Zones (id = name):\n" + list(input.places, 80) + "\n\nVehicle types (id = name):\n" + list(input.cars, 30) + "\n\n" +
    (attached ? attached + " attached file(s) above.\n\n" : "") + "Booking material from the office:\n" + (text || "(only the attached files)") });

  const client = new Anthropic();
  const msg = await client.beta.messages.stream({
    model: "claude-opus-5-5",
    max_tokens: 16000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "low", format: { type: "json_schema", schema: SCHEMA } },
    system: SYSTEM,
    messages: [{ role: "user", content }]
  }).finalMessage();
  if (msg.stop_reason === "refusal") throw err("Bilgiler okunamadı (model reddetti)");
  if (msg.stop_reason === "max_tokens") throw err("Metin çok uzun, kısaltıp tekrar deneyin");
  const block = msg.content.find(b => b.type === "text");
  try { return JSON.parse(block.text); } catch (e) { throw err("Bilgiler okunamadı, tekrar deneyin"); }
}

module.exports = { read };
