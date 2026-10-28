// Sign-in of B2B partners to their booking page (www.istanbultaxibooking.com/b2b, also /b2b on the site).
// A partner signs in with the e-mail address on its card in Partnerler and a password the office makes in the
// panel (Partnerler → B2B giriş). Only a scrypt hash is kept, under pt:auth:<partnerId>; making a new password
// or turning the access off signs the partner out, because the session is signed together with that record.
// The session is a signed cookie like the panel's (_lib/auth.js), with its own name and path.
// Firm users: the partner's owner (the e-mail login above) can add users with their own user name and password
// (B2B page → Kullanıcılar), so each employee books under its own name. Kept under pt:users:<partnerId> (scrypt
// hashes, like the owner's), with pt:uname:<user name> → "<partnerId>.<userId>" to find them at sign-in. A user can
// sign in only while the partner's own access is on; a new password or removing the user signs it out.
const crypto = require("crypto");
const store = require("./store");

const COOKIE = "iap_b2b";
const DAYS = 14;
const key = id => /^[a-z0-9]{6,20}$/.test(String(id || "")) ? "pt:auth:" + id : null;

function secret() {
  const p = process.env.ADMIN_PASSWORD;
  return p ? crypto.createHash("sha256").update("iap-b2b:" + (process.env.ADMIN_SECRET || "") + ":" + p).digest() : null;
}
const hash = (pw, salt) => crypto.scryptSync(String(pw), salt, 32).toString("hex");
function same(a, b) {
  const x = crypto.createHash("sha256").update(String(a)).digest(), y = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(x, y);
}

async function get(id) {
  const k = key(id), s = k && await store.cmd("GET", k);
  return s ? JSON.parse(s) : null;
}
// A new password for the partner (shown once in the panel); replaces the old one
async function make(id) {
  const k = key(id);
  if (!k) throw new Error("Partner bulunamadı");
  const abc = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789", bytes = crypto.randomBytes(10);
  const pw = Array.from(bytes, b => abc[b % abc.length]).join("");
  const salt = crypto.randomBytes(16).toString("hex");
  await store.cmd("SET", k, JSON.stringify({ salt, hash: hash(pw, salt), at: new Date().toISOString() }));
  return pw;
}
async function off(id) { const k = key(id); if (k) await store.cmd("DEL", k); }
// Which partners can sign in: { id: date the password was made }
async function list(ids) {
  const keys = ids.map(key).filter(Boolean), out = {};
  if (!keys.length) return out;
  const vals = await store.cmd("MGET", ...keys);
  keys.forEach((k, i) => { if (vals[i]) out[k.slice(8)] = JSON.parse(vals[i]).at; });
  return out;
}
// ---------- Firm users ----------
const ukey = id => key(id) && "pt:users:" + id;
const UNAME = /^[a-z0-9][a-z0-9._-]{2,39}$/;
const bad = m => Object.assign(new Error(m), { user: true });
function password() {
  const abc = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789", bytes = crypto.randomBytes(10);
  return Array.from(bytes, b => abc[b % abc.length]).join("");
}
async function users(pid) {
  const k = ukey(pid), s = k && await store.cmd("GET", k);
  return s ? JSON.parse(s) : [];
}
const saveUsers = (pid, list) => store.cmd("SET", ukey(pid), JSON.stringify(list));
// What the firm's owner sees of its users
const pub = u => ({ id: u.id, name: u.name, username: u.username, fin: !!u.fin, at: u.at, createdAt: u.createdAt });
// A new user (or with u.id a changed one); returns { user, password } — the password only for a new user
async function saveUser(pid, u) {
  if (!ukey(pid)) throw bad("not_found");
  const list = await users(pid), name = String(u.name || "").trim().slice(0, 60), fin = !!u.fin;
  if (!name) throw bad("name");
  if (u.id) {
    const x = list.find(v => v.id === u.id);
    if (!x) throw bad("not_found");
    x.name = name; x.fin = fin;
    await saveUsers(pid, list);
    return { user: pub(x) };
  }
  const username = String(u.username || "").trim().toLowerCase();
  if (!UNAME.test(username)) throw bad("username");
  if (list.length >= 50) throw bad("too_many");
  // SET NX keeps the user name unique across all firms
  const id = crypto.randomBytes(5).toString("hex");
  if (!(await store.cmd("SET", "pt:uname:" + username, pid + "." + id, "NX"))) throw bad("taken");
  const pw = password(), salt = crypto.randomBytes(16).toString("hex"), at = new Date().toISOString();
  const x = { id, name, username, fin, salt, hash: hash(pw, salt), at, createdAt: at };
  list.push(x);
  await saveUsers(pid, list);
  return { user: pub(x), password: pw };
}
async function resetUser(pid, uid) {
  const list = await users(pid), x = list.find(v => v.id === uid);
  if (!x) throw bad("not_found");
  const pw = password();
  x.salt = crypto.randomBytes(16).toString("hex"); x.hash = hash(pw, x.salt); x.at = new Date().toISOString();
  await saveUsers(pid, list);
  return { user: pub(x), password: pw };
}
async function delUser(pid, uid) {
  const list = await users(pid), x = list.find(v => v.id === uid);
  if (!x) return;
  await store.cmd("DEL", "pt:uname:" + x.username);
  await saveUsers(pid, list.filter(v => v.id !== uid));
}
// All of a deleted partner's users
async function dropUsers(pid) {
  const list = await users(pid);
  for (const x of list) await store.cmd("DEL", "pt:uname:" + x.username);
  if (ukey(pid)) await store.cmd("DEL", ukey(pid));
}
// Sign-in with a user name: { pid, user } or null
async function checkUser(username, pw) {
  username = String(username || "").trim().toLowerCase();
  if (!UNAME.test(username) || !pw) return null;
  const ref = await store.cmd("GET", "pt:uname:" + username);
  if (!ref) return null;
  const [pid, uid] = String(ref).split(".");
  if (!(await get(pid))) return null;
  const x = (await users(pid)).find(v => v.id === uid);
  return x && same(hash(pw, x.salt), x.hash) ? { pid, user: x } : null;
}

async function check(id, pw) {
  const a = await get(id);
  return !!(a && pw && same(hash(pw, a.salt), a.hash)) && a;
}

function sign(id, exp, at) { return crypto.createHmac("sha256", secret()).update(id + "." + exp + "." + at).digest("hex"); }
function cookie(req) {
  const m = new RegExp("(?:^|;\\s*)" + COOKIE + "=([^;]*)").exec(String(req.headers.cookie || ""));
  return m ? decodeURIComponent(m[1]) : "";
}
// Who is signed in: { pid, user } — user null for the firm's owner — or null.
// The owner's cookie is id.exp.mac, a user's id.userId.exp.mac (signed with the user's password date).
async function session(req) {
  if (!secret()) return null;
  const parts = cookie(req).split(".");
  if (parts.length === 3) {
    const [id, exp, mac] = parts;
    if (!id || !mac || !(+exp > Date.now())) return null;
    const a = await get(id);
    return a && same(mac, sign(id, exp, a.at)) ? { pid: id, user: null } : null;
  }
  const [id, uid, exp, mac] = parts;
  if (parts.length !== 4 || !id || !uid || !mac || !(+exp > Date.now())) return null;
  if (!(await get(id))) return null;
  const x = (await users(id)).find(v => v.id === uid);
  return x && same(mac, sign(id + "." + uid, exp, x.at)) ? { pid: id, user: x } : null;
}
function secure(req) { return String(req.headers["x-forwarded-proto"] || "").includes("https") ? "; Secure" : ""; }
// a: the owner's password record, or a firm user (then uid is its id)
function setSession(req, res, id, a, uid) {
  const exp = Date.now() + DAYS * 864e5, who = uid ? id + "." + uid : id;
  res.setHeader("Set-Cookie", COOKIE + "=" + who + "." + exp + "." + sign(who, exp, a.at) + "; Path=/api/b2b; HttpOnly; SameSite=Lax; Max-Age=" + DAYS * 86400 + secure(req));
}
function clearSession(req, res) {
  res.setHeader("Set-Cookie", COOKIE + "=; Path=/api/b2b; HttpOnly; SameSite=Lax; Max-Age=0" + secure(req));
}

module.exports = { make, off, list, check, session, setSession, clearSession, users, pub, saveUser, resetUser, delUser, dropUsers, checkUser, ready: () => !!secret() };
