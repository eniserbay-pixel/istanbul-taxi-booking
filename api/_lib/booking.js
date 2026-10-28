// Shape of a stored booking, and cleaning of what the site or the admin panel sends.
// Every text is trimmed and length-capped; unknown fields are dropped.
// talep: request from the site waiting for the office; degisiklik: a change was sent to the customer and
// waits for their answer; reddedildi: the office declined the request
const STATUSES = ["talep", "degisiklik", "yeni", "onaylandi", "tamamlandi", "reddedildi", "iptal"];
// cari: a B2B partner's booking on its account (balance), nothing is collected from the passenger
const PAYMENTS = ["nakit", "kart", "havale", "cari"];
const CURRENCIES = ["EUR", "USD", "TRY", "GBP"];

const str = (v, max) => String(v == null ? "" : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max || 200);
const int = (v, min, max) => { const n = Math.round(Number(v)); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : min; };
const num = (v) => { const n = Number(v); return Number.isFinite(n) && n >= 0 && n < 1e7 ? Math.round(n * 100) / 100 : 0; };
const date = (v) => /^\d{4}-\d{2}-\d{2}$/.test(String(v)) ? String(v) : "";
const time = (v) => /^\d{2}:\d{2}$/.test(String(v)) ? String(v) : "";
const iso = (v) => /^\d{4}-\d{2}-\d{2}T[\d:.]+Z$/.test(String(v || "")) ? String(v) : "";

function cleanLeg(l) {
  l = l || {};
  return {
    date: date(l.date), time: time(l.time),
    from: str(l.from, 40), fromName: str(l.fromName, 120), fromAddr: str(l.fromAddr, 300),
    to: str(l.to, 40), toName: str(l.toName, 120), toAddr: str(l.toAddr, 300),
    flight: str(l.flight, 12).toUpperCase(),
    pax: int(l.pax, 1, 60), bags: int(l.bags, 0, 60),
    seatB: int(l.seatB, 0, 9), seatK: int(l.seatK, 0, 9),
    note: str(l.note, 1000), price: num(l.price),
    // what the office pays the supplier (agency, driver) for this transfer, in the booking's currency (Raporlar)
    cost: num(l.cost),
    // the same fee as typed in TL on Operasyonlar (cost is worked out from it at that day's rate)
    costTry: num(l.costTry),
    // cash the driver collects from the passenger on this transfer for a B2B partner (currency: the booking's cashCur)
    cash: num(l.cash),
    // Vehicle for this transfer when it differs from the booking's (e.g. a bigger car for the return)
    car: str(l.car, 20), carName: str(l.carName, 60),
    assign: cleanAssign(l.assign),
    uetds: cleanUetds(l.uetds),
    // when the transfer was marked done on Operasyonlar (Tamamlandı); a cash fare counts as collected from then on
    done: iso(l.done)
  };
}

// UETDS (Ministry passenger notification) for a leg driven by an own vehicle, filled in the panel's
// UETDS Bildirimi screen: start and end district in Istanbul, the reference number UETDS gave and
// whether it was reported. Absent until the office touches it.
function cleanUetds(u) {
  if (!u || typeof u !== "object") return null;
  const out = { fromIlce: str(u.fromIlce, 40), toIlce: str(u.toIlce, 40), ref: str(u.ref, 40), done: !!u.done, at: iso(u.at) };
  return out.fromIlce || out.toIlce || out.ref || out.done ? out : null;
}

// Everyone travelling on a booking, for UETDS: name, gender (k: kadın, e: erkek), nationality and
// passport or Turkish ID number. The first one is the booking's own passenger.
const GENDERS = ["k", "e"];
function cleanTraveler(t) {
  t = t || {};
  return { name: str(t.name, 120), gender: GENDERS.includes(t.gender) ? t.gender : "", nat: str(t.nat, 60), doc: str(t.doc, 30).toUpperCase() };
}

// Vehicle or agency a transfer leg is given to. The label is a snapshot, so it stays readable
// if the vehicle or agency is later removed.
function cleanAssign(a) {
  if (!a || !a.id) return null;
  return { id: str(a.id, 41), type: RES_TYPES.includes(a.type) ? a.type : "ozmal", label: str(a.label, 160), phone: str(a.phone, 40) };
}

// Vehicles the office gives transfers to, in three groups. ozmal: own fleet; bireysel: an independent
// driver with their own car; both are one vehicle (plate, colour/make/model, driver, driver's phone).
// acente: a supplier agency (name, e-mail, up to three operations numbers) with its own vehicles.
// Records saved before the split are read as: "arac" -> ozmal, an agency's phone -> its first
// operations number, its contact person -> its note.
const RES_TYPES = ["ozmal", "acente", "bireysel"];
const rid = () => Math.random().toString(36).slice(2, 10);
function cleanCar(c) {
  c = c || {};
  return { id: str(c.id, 20) || rid(), name: str(c.name, 60), detail: str(c.detail, 80), driver: str(c.driver, 80), phone: str(c.phone, 40) };
}
// Own vehicles also keep the driver's Turkish ID (or passport) number and nationality for UETDS
function cleanOwn(r) {
  return Object.assign(cleanCar(r), { tc: str(r.tc, 20).toUpperCase(), nat: str(r.nat, 60) });
}
function cleanResource(r) {
  r = r || {};
  const type = RES_TYPES.includes(r.type) ? r.type : "ozmal";
  if (type === "ozmal") return Object.assign(cleanOwn(r), { type });
  if (type !== "acente") return Object.assign(cleanCar(r), { type });
  const phones = (Array.isArray(r.phones) ? r.phones : [r.phone]).slice(0, 3).map(p => str(p, 40));
  while (phones.length < 3) phones.push("");
  return {
    id: str(r.id, 20) || rid(), type, name: str(r.name, 60), email: str(r.email, 120), phones,
    phone: phones.find(Boolean) || "",
    detail: str([r.detail, r.driver && "Yetkili: " + r.driver].filter(Boolean).join(" · "), 160),
    cars: (Array.isArray(r.cars) ? r.cars : []).slice(0, 100).map(cleanCar).filter(c => c.name)
  };
}
// Everything a transfer leg can be given to: each own and independent vehicle, each agency
// (when the agency names the driver later) and each of the agency's vehicles ("agencyId.carId").
function assignables(list) {
  const out = [];
  list.forEach(r => {
    if (r.type !== "acente") return out.push({ id: r.id, type: r.type, label: (r.type === "bireysel" ? "Bireysel: " : "") + carLabel(r), phone: r.phone });
    out.push({ id: r.id, type: "acente", label: "Acente: " + r.name, phone: r.phone });
    r.cars.forEach(c => out.push({ id: r.id + "." + c.id, type: "acente", label: r.name + ": " + carLabel(c), phone: c.phone || r.phone }));
  });
  return out;
}
function carLabel(c) { return c.name + (c.driver ? " · " + c.driver : ""); }

// A payment settled with a supplier (Araç/Tedarik → Finans): the supplier (resource id), the amount in each
// currency (positive: the office paid the supplier; negative: the supplier handed over cash it collected) and a note.
// "Ödendi" saves the supplier's balance at that moment, which brings it to zero.
function cleanSupPay(p) {
  p = p || {};
  const amounts = {};
  CURRENCIES.forEach(c => { const n = Number(p.amounts && p.amounts[c]); if (Number.isFinite(n) && n && Math.abs(n) < 1e8) amounts[c] = Math.round(n * 100) / 100; });
  return { id: str(p.id, 20) || rid(), res: str(p.res, 20), at: iso(p.at) || new Date().toISOString(), amounts, note: str(p.note, 300) };
}

// Chauffeur service by the hour (booking box on the chauffeur service page): package hours, km included
// and the fee per extra hour at booking time. Absent on transfer bookings.
function cleanHourly(h) {
  if (!h || ![8, 10].includes(+h.hours)) return null;
  return { hours: +h.hours, km: int(h.km, 0, 2000), extra: num(h.extra) };
}

// `b` is untrusted input. Returns the fields a booking keeps; id, dates and history are set by the caller.
function clean(b) {
  b = b || {};
  const legs = (Array.isArray(b.legs) ? b.legs : []).slice(0, 2).map(cleanLeg);
  const c = b.customer || {}, p = b.passenger || {};
  const out = {
    ref: str(b.ref, 30),
    status: STATUSES.includes(b.status) ? b.status : "yeni",
    lang: str(b.lang, 5).toLowerCase(),
    car: str(b.car, 20), carName: str(b.carName, 60),
    customer: { name: str(c.name, 120), email: str(c.email, 160), phone: str(c.phone, 40) },
    passenger: { name: str(p.name, 120), phone: str(p.phone, 40) },
    travelers: (Array.isArray(b.travelers) ? b.travelers : []).slice(0, 60).map(cleanTraveler).filter(t => t.name || t.doc),
    legs,
    total: num(b.total),
    currency: CURRENCIES.includes(b.currency) ? b.currency : "EUR",
    payment: PAYMENTS.includes(b.payment) ? b.payment : "nakit",
    // B2B partner the booking came from (B2B → Partnerler); empty = a direct customer
    partner: str(b.partner, 20),
    // the partner's own reference for the booking, and the currency of the cash its passengers pay (legs' cash)
    partnerRef: str(b.partnerRef, 40),
    cashCur: CURRENCIES.includes(b.cashCur) ? b.cashCur : "",
    adminNote: str(b.adminNote, 2000)
  };
  // the UETDS list is everyone in the vehicle, so a transfer never carries fewer passengers than it lists
  legs.forEach(l => { if (l.pax < out.travelers.length) l.pax = out.travelers.length; });
  const hourly = cleanHourly(b.hourly);
  if (hourly) out.hourly = hourly;
  // Google Analytics client id of the visitor who sent a site booking (only with analytics cookies
  // accepted), so the office's confirmation can be counted as booking_confirmed (_lib/ga.js)
  if (/^\d{1,12}\.\d{1,12}$/.test(String(b.ga || ""))) out.ga = String(b.ga);
  return out;
}

// A booking someone started on the site but has not finished. Admin fields (status, note) are set by the panel.
const LEAD_ID = /^[a-z0-9]{10,32}$/;
const LEAD_STATUSES = ["aranacak", "arandi", "ulasilamadi"];
function cleanLead(l) {
  l = l || {};
  const c = l.customer || {};
  return {
    id: LEAD_ID.test(String(l.id)) ? String(l.id) : "",
    lang: str(l.lang, 5).toLowerCase(),
    step: int(l.step, 1, 3),
    car: str(l.car, 20), carName: str(l.carName, 60),
    customer: { name: str(c.name, 120), email: str(c.email, 160), phone: str(c.phone, 40) },
    legs: (Array.isArray(l.legs) ? l.legs : []).slice(0, 2).map(cleanLeg).map(x => Object.assign(x, { assign: null, uetds: null })),
    total: num(l.total),
    currency: CURRENCIES.includes(l.currency) ? l.currency : "EUR"
  };
}
// Worth a call: a phone number or an e-mail address to reach the customer
function reachable(l) {
  return String(l.customer.phone).replace(/\D/g, "").length >= 6 || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(l.customer.email);
}

function problems(b) {
  const out = [];
  if (!b.customer.name) out.push("Müşteri adı gerekli");
  if (!b.customer.phone && !b.customer.email) out.push("Telefon veya e-posta gerekli");
  if (!b.legs.length) out.push("En az bir transfer gerekli");
  b.legs.forEach((l, i) => {
    const n = b.legs.length > 1 ? (i ? " (dönüş)" : " (gidiş)") : "";
    if (!l.date || !l.time) out.push("Tarih ve saat gerekli" + n);
    if (!(l.fromName || l.from) || !(l.toName || l.to)) out.push("Alış ve bırakış yeri gerekli" + n);
  });
  return out;
}

module.exports = { CURRENCIES, LEAD_ID, LEAD_STATUSES, cleanLead, reachable, STATUSES, clean, problems, str, cleanResource, assignables, cleanSupPay };
