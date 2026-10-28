// Small helpers shared by the API functions
// `max`: largest body accepted when the platform has not parsed it already (default 50 kB)
function body(req, max) {
  if (req.body && typeof req.body === "object") return Promise.resolve(req.body);
  if (typeof req.body === "string") { try { return Promise.resolve(JSON.parse(req.body)); } catch (e) { return Promise.resolve(null); } }
  return new Promise(resolve => {
    let s = "";
    req.on("data", c => { s += c; if (s.length > (max || 50000)) { s = ""; req.destroy(); } });
    req.on("end", () => { try { resolve(JSON.parse(s)); } catch (e) { resolve(null); } });
    req.on("error", () => resolve(null));
  });
}
function ip(req) {
  return String(req.headers["x-forwarded-for"] || req.socket && req.socket.remoteAddress || "").split(",")[0].trim() || "x";
}
function send(res, status, data) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(data));
}
module.exports = { body, ip, send };
