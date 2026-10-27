// Admin sign-in: one password from the ADMIN_PASSWORD environment variable.
// The session is a signed cookie (expiry + HMAC); changing the password signs everyone out.
const crypto = require("crypto");

const COOKIE = "iat_admin";
const DAYS = 7;

function secret() {
  const p = process.env.ADMIN_PASSWORD;
  return p ? crypto.createHash("sha256").update("iat-admin:" + p).digest() : null;
}
function sign(exp) { return crypto.createHmac("sha256", secret()).update(String(exp)).digest("hex"); }
function same(a, b) {
  const x = crypto.createHash("sha256").update(String(a)).digest(), y = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(x, y);
}
function passwordOk(pw) { return !!process.env.ADMIN_PASSWORD && same(pw || "", process.env.ADMIN_PASSWORD); }

function cookies(req) {
  const out = {};
  String(req.headers.cookie || "").split(";").forEach(p => {
    const i = p.indexOf("=");
    if (i > 0) out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim());
  });
  return out;
}
function signedIn(req) {
  if (!secret()) return false;
  const [exp, mac] = (cookies(req)[COOKIE] || "").split(".");
  return !!(exp && mac && +exp > Date.now() && same(mac, sign(exp)));
}
function secure(req) { return String(req.headers["x-forwarded-proto"] || "").includes("https") ? "; Secure" : ""; }
function setSession(req, res) {
  const exp = Date.now() + DAYS * 864e5;
  res.setHeader("Set-Cookie", COOKIE + "=" + exp + "." + sign(exp) + "; Path=/api/admin; HttpOnly; SameSite=Strict; Max-Age=" + DAYS * 86400 + secure(req));
}
function clearSession(req, res) {
  res.setHeader("Set-Cookie", COOKIE + "=; Path=/api/admin; HttpOnly; SameSite=Strict; Max-Age=0" + secure(req));
}

module.exports = { passwordOk, signedIn, setSession, clearSession };
