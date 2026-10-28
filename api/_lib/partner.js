// B2B partners kept in the panel (B2B → Partnerler): hotels, clinics and hospitals, agencies and MICE companies
// the site works with. One list in Redis, small enough to read and write whole.
const store = require("./store");

const TYPES = ["hotel", "clinic", "agency", "mice"];
const KEY = "pt:list";
const str = (v, n) => String(v == null ? "" : v).trim().slice(0, n);
const bad = m => Object.assign(new Error(m), { user: true });

// What the panel sends → the stored partner; throws a Turkish message the panel shows
function clean(p) {
  p = p || {};
  const out = {
    id: typeof p.id === "string" && /^[a-z0-9]{6,20}$/.test(p.id) ? p.id : "",
    type: TYPES.includes(p.type) ? p.type : "",
    name: str(p.name, 140),
    country: str(p.country, 60),
    city: str(p.city, 60),
    address: str(p.address, 400),
    taxOffice: str(p.taxOffice, 80),
    taxNo: str(p.taxNo, 30),
    contact: str(p.contact, 100),
    phone1: str(p.phone1, 30),
    phone2: str(p.phone2, 30),
    email: str(p.email, 120).toLowerCase(),
    note: str(p.note, 1000)
  };
  const miss = [];
  if (!out.type) miss.push("firma türü");
  if (!out.name) miss.push("firma adı");
  if (!out.country) miss.push("ülke");
  if (!out.address) miss.push("adres");
  if (!out.taxOffice) miss.push("vergi dairesi");
  if (!out.taxNo) miss.push("vergi numarası");
  if (!out.phone1) miss.push("1. telefon");
  if (!out.email) miss.push("e-posta");
  if (miss.length) throw bad("Eksik: " + miss.join(", "));
  const phone = /^\+?[0-9 ()-]{7,}$/;
  if (!phone.test(out.phone1)) throw bad("1. telefon geçersiz");
  if (out.phone2 && !phone.test(out.phone2)) throw bad("2. telefon geçersiz");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(out.email)) throw bad("E-posta adresi geçersiz");
  return out;
}

async function list() {
  const s = await store.cmd("GET", KEY);
  return s ? JSON.parse(s) : [];
}
async function save(input) {
  const p = clean(input), all = await list(), now = new Date().toISOString();
  const i = p.id ? all.findIndex(x => x.id === p.id) : -1;
  if (i >= 0) all[i] = Object.assign(p, { createdAt: all[i].createdAt, updatedAt: now });
  else { p.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6); p.createdAt = p.updatedAt = now; all.unshift(p); }
  await store.cmd("SET", KEY, JSON.stringify(all));
  return p;
}
async function remove(id) {
  const all = await list();
  await store.cmd("SET", KEY, JSON.stringify(all.filter(x => x.id !== id)));
}

module.exports = { TYPES, clean, list, save, remove };
