// Booking notifications to the office on Telegram. Settings (Vercel → Settings → Environment Variables):
//   TELEGRAM_BOT_TOKEN  the token @BotFather gives; without it nothing is sent
// Who receives them is set in the panel (Yönetim → Telegram): "Telegram'ı bağla" opens the bot with a one-time
// code, and only a chat that sent that code is added, so someone who merely finds the bot gets nothing.
// The bot answers at once through a webhook (/api/admin?a=tghook, set when the panel makes a link); Telegram signs
// each call with a secret derived from the token.
const crypto = require("crypto");
const store = require("./store");

const TOKEN = () => process.env.TELEGRAM_BOT_TOKEN || "";
const KEY = "tg:chats", CODE = "tg:code";

function configured() { return !!TOKEN(); }

async function tg(method, body) {
  const r = await fetch("https://api.telegram.org/bot" + TOKEN() + "/" + method, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body || {})
  });
  const j = await r.json().catch(() => ({}));
  if (!j.ok) throw new Error("Telegram: " + (j.description || r.status));
  return j.result;
}

async function chats() {
  try { return JSON.parse(await store.cmd("GET", KEY) || "[]"); } catch (e) { return []; }
}
async function saveChats(list) { await store.cmd("SET", KEY, JSON.stringify(list)); return list; }

// The panel's Telegram page: the bot's username and the connected chats
async function info() {
  if (!configured()) return { configured: false, chats: [] };
  const me = await tg("getMe");
  let w = await tg("getWebhookInfo").catch(() => null);
  // a webhook set before the buttons existed only takes messages
  if (w && w.url && !(w.allowed_updates || []).includes("callback_query")) await setHook(w.url.replace(/\/api\/admin\?a=tghook$/, "")).catch(e => console.error(e));
  return { configured: true, bot: me.username, chats: await chats(),
    hook: w && w.url ? { url: w.url, pending: w.pending_update_count || 0, error: w.last_error_message || "", at: w.last_error_date ? new Date(w.last_error_date * 1000).toISOString() : "" } : null };
}

const SECRET = () => crypto.createHash("sha256").update("iap-tg:" + TOKEN()).digest("hex").slice(0, 48);
// Messages (linking, /bugun …) and button presses; the command menu next to the message box
async function setHook(site) {
  await tg("setWebhook", { url: site + "/api/admin?a=tghook", secret_token: SECRET(), allowed_updates: ["message", "callback_query"] });
  await tg("setMyCommands", { commands: COMMANDS }).catch(() => {});
}

// Adds the chat that sent "/start <code>" (a group sends "/start@botname <code>") or the bare code. Returns a reply.
async function take(m) {
  const t = String((m && m.text) || "").trim().split(/\s+/);
  const sent = /^\/start(@\w+)?$/.test(t[0]) ? t[1] : t[0];
  const code = await store.cmd("GET", CODE);
  const list = await chats();
  if (list.some(c => c.id === m.chat.id)) return "✅ Bu sohbet zaten bağlı. Yeni rezervasyonlar buraya geliyor.";
  if (!code || sent !== code) return /^\/start/.test(t[0]) ? "Bu botu bağlamak için panelde Yönetim → Telegram sayfasındaki \"Telegram'ı bağla\" butonunu kullanın." : null;
  const name = m.chat.title || [m.chat.first_name, m.chat.last_name].filter(Boolean).join(" ") || m.chat.username || String(m.chat.id);
  list.push({ id: m.chat.id, name, at: new Date().toISOString() });
  await saveChats(list); await store.cmd("DEL", CODE);
  return "✅ Bağlandı. Yeni rezervasyonlar buraya gelecek.\n\nListeler için: /bugun /yarin /dun /buhafta";
}

// Telegram calls this for every message to the bot
async function hook(update, secret) {
  if (!configured() || secret !== SECRET()) return false;
  if (update && update.callback_query) { await press(update.callback_query).catch(e => console.error(e)); return true; }
  const m = update && update.message;
  if (!m || !m.chat) return true;
  const cmd = command(m.text);
  if (cmd && (await chats()).some(c => c.id === m.chat.id)) {
    const l = await listFor(cmd);
    await tg("sendMessage", Object.assign({ chat_id: m.chat.id, text: l.text, disable_web_page_preview: true }, l.keyboard ? { reply_markup: { inline_keyboard: l.keyboard } } : {})).catch(e => console.error(e));
    return true;
  }
  const answer = await take(m);
  if (answer) await tg("sendMessage", { chat_id: m.chat.id, text: answer }).catch(e => console.error(e));
  return true;
}

// A one-time code for 15 minutes, and the t.me links that send it to the bot (a private chat, or a group the bot joins)
async function linkCode(site) {
  const me = await tg("getMe");
  await setHook(site).catch(e => console.error(e));
  const code = crypto.randomBytes(9).toString("hex");
  await store.cmd("SET", CODE, code, "EX", "900");
  return { code, url: "https://t.me/" + me.username + "?start=" + code, group: "https://t.me/" + me.username + "?startgroup=" + code };
}

// "Bağlantıyı kontrol et": the webhook has normally added the chat already; without one, read the bot's messages
async function claim() {
  const before = (await chats()).length;
  let ups = [];
  try { ups = await tg("getUpdates", { allowed_updates: ["message"] }); }
  catch (e) {
    // A webhook is set. If Telegram could not deliver to it, drop it (its messages stay queued) and read them here.
    const w = await tg("getWebhookInfo").catch(() => null);
    if (w && (w.last_error_message || w.pending_update_count)) {
      await tg("deleteWebhook").catch(() => {});
      ups = await tg("getUpdates", { allowed_updates: ["message"] }).catch(() => []);
    }
  }
  for (const u of ups) if (u.message && u.message.chat) {
    const answer = await take(u.message);
    if (answer && /Bağlandı/.test(answer)) await tg("sendMessage", { chat_id: u.message.chat.id, text: answer }).catch(() => {});
  }
  if (ups.length) await tg("getUpdates", { offset: ups[ups.length - 1].update_id + 1 }).catch(() => {});
  const list = await chats();
  return { chats: list, added: list.length - before };
}

async function remove(id) { return saveChats((await chats()).filter(c => String(c.id) !== String(id))); }

// Send `text` to every connected chat, with buttons under it if given; never throws (a booking must not fail because Telegram did)
async function notify(text, keyboard) {
  if (!configured()) return false;
  try {
    const list = await chats();
    const res = await Promise.all(list.map(c => tg("sendMessage", Object.assign({ chat_id: c.id, text, disable_web_page_preview: true }, keyboard ? { reply_markup: { inline_keyboard: keyboard } } : {}))
      .then(() => true, e => { console.error(e); return false; })));
    return res.some(Boolean);
  } catch (e) { console.error(e); return false; }
}

// ---------- Booking messages ----------
// Laid out like the panel's WhatsApp transfer message, so it can be forwarded as it is; with where it came from and the e-mail.
const PAY = { nakit: "Şoföre nakit", kart: "Kart", havale: "Havale / EFT", cari: "Cari" };
const STATUS = { talep: "Talep", degisiklik: "Müşteri onayı bekliyor", yeni: "Yeni", onaylandi: "Onaylandı", tamamlandi: "Tamamlandı", reddedildi: "Reddedildi", iptal: "İptal" };
const MONTHS = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const DAYS = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
function longDate(ymd) {
  const d = String(ymd || "").split("-");
  if (d.length !== 3) return "-";
  return +d[2] + " " + MONTHS[+d[1] - 1] + " " + d[0] + " " + DAYS[new Date(Date.UTC(+d[0], +d[1] - 1, +d[2])).getUTCDay()];
}
const place = (code, name, addr) => [name || code, addr].filter(Boolean).join(", ");
const digits = p => String(p || "").replace(/\D/g, "");

async function sourceOf(b) {
  if (b.source === "b2b" || b.partner) {
    let name = "";
    try { const p = (await require("./partner").list()).find(x => x.id === b.partner); name = p ? p.name : ""; } catch (e) {}
    return "B2B" + (name ? " · " + name : "") + (b.partnerUser ? " (" + b.partnerUser + ")" : "") + (b.partnerRef ? " · ref " + b.partnerRef : "");
  }
  return b.source === "manuel" ? "Panel (elle eklendi)" : "Web sitesi";
}

async function text(title, b) {
  const c = b.customer || {}, ps = b.passenger || {};
  const legs = (b.legs || []).map((l, i) => [
    [b.legs.length > 1 ? (i ? "↩️ Dönüş" : "➡️ Gidiş") : "", "📅 Tarih: " + longDate(l.date), "🕐 Saat: " + (l.time || "-"), l.flight ? "✈️ Uçuş: " + l.flight : ""],
    ["📍 Güzergah", "🅰️ " + place(l.from, l.fromName, l.fromAddr),
      b.hourly ? "⏱️ Şoförlü araç: " + b.hourly.hours + " saat, " + b.hourly.km + " km dahil" : "🅱️ " + place(l.to, l.toName, l.toAddr)],
    ["👥 Yolcu: " + (l.pax || 0) + " kişi" + (l.bags ? " · " + l.bags + " bavul" : "") +
      (l.seatB || l.seatK ? "\n👶 Çocuk koltuğu: " + [l.seatB ? "Bebek ×" + l.seatB : "", l.seatK ? "Yükseltici ×" + l.seatK : ""].filter(Boolean).join(", ") : ""), l.note ? "📝 " + l.note : ""]
  ]).flat();
  const blocks = [
    [title],
    ["🆔 Transfer #" + b.id + (b.ref ? " (" + b.ref + ")" : ""), "📌 Kaynak: " + await sourceOf(b)],
    ...legs,
    ["👤 " + (c.name || "-"), c.phone ? "📱 Tel: " + c.phone : "", c.email ? "✉️ E-posta: " + c.email : "",
      ps.name && ps.name !== c.name ? "🧳 Yolcu: " + ps.name + (ps.phone ? " · " + ps.phone : "") : ""],
    ["🚐 Araç: " + (b.carName || b.car || "-"), "💰 Ödeme: " + (b.total || 0) + " " + (b.currency || "") + " · " + (PAY[b.payment] || b.payment || "")]
  ];
  return blocks.map(x => x.filter(Boolean).join("\n")).filter(Boolean).join("\n\n");
}

// Buttons: Onayla / Reddet (only while the booking waits for the office), WhatsApp to the customer, the voucher PDF, the panel
function keyboard(b, decide) {
  const rows = [];
  if (decide && ["yeni", "talep"].includes(b.status)) rows.push([{ text: "✅ Onayla", callback_data: "ok:" + b.id }, { text: "⛔ Reddet", callback_data: "no:" + b.id }]);
  const wa = digits(b.customer && b.customer.phone || b.passenger && b.passenger.phone);
  rows.push([wa.length >= 8 ? { text: "💬 WhatsApp", url: "https://wa.me/" + wa } : null, { text: "📄 Voucher", callback_data: "v:" + b.id }].filter(Boolean));
  if (/^https:/.test(SITE())) rows.push([{ text: "🖥 Panelde aç", url: SITE() + "/admin#rezervasyonlar" }]);
  return rows;
}
const SITE = () => require("./mail").SITE();

// A booking event to every connected chat. `decide`: with Onayla / Reddet
async function booking(title, b, decide) {
  try { return await notify(await text(title, b), keyboard(b, decide)); } catch (e) { console.error(e); return false; }
}

// ---------- Buttons pressed ----------
async function press(q) {
  const chat = q.message && q.message.chat;
  const answer = t => tg("answerCallbackQuery", { callback_query_id: q.id, text: t || "" }).catch(() => {});
  if (!chat || !(await chats()).some(c => c.id === chat.id)) return answer("Bu sohbet bağlı değil.");
  const [act, id] = String(q.data || "").split(":");
  const store = require("./store");
  const b = await store.getBooking(+id);
  if (!b) return answer("Rezervasyon bulunamadı.");
  const who = [q.from && q.from.first_name, q.from && q.from.last_name].filter(Boolean).join(" ") || "Telegram";
  const msg = { chat_id: chat.id, message_id: q.message.message_id };

  if (act === "d") {
    await answer();
    await tg("sendMessage", { chat_id: chat.id, text: await text("📋 Rezervasyon · " + STATUS[b.status], b), disable_web_page_preview: true, reply_markup: { inline_keyboard: keyboard(b, true) } });
    return;
  }
  if (act === "v") {
    await answer("Voucher hazırlanıyor…");
    const pdf = await require("./mail").voucherPdf(b, "");
    const f = new FormData();
    f.append("chat_id", String(chat.id));
    f.append("caption", "Voucher #" + b.id + (b.ref ? " (" + b.ref + ")" : ""));
    f.append("document", new Blob([pdf], { type: "application/pdf" }), "voucher-" + String(b.ref || b.id).replace(/[^A-Za-z0-9-]/g, "") + ".pdf");
    const r = await fetch("https://api.telegram.org/bot" + TOKEN() + "/sendDocument", { method: "POST", body: f });
    const j = await r.json().catch(() => ({}));
    if (!j.ok) await tg("sendMessage", { chat_id: chat.id, text: "Voucher gönderilemedi: " + (j.description || r.status) });
    return;
  }
  // Onayla / Reddet ask once more, since each sends the customer an e-mail
  const rest = keyboard(b, false);
  if (act === "ok" || act === "no") {
    if (!["yeni", "talep"].includes(b.status)) {
      await tg("editMessageReplyMarkup", Object.assign({ reply_markup: { inline_keyboard: rest } }, msg)).catch(() => {});
      return answer("Bu rezervasyon zaten " + STATUS[b.status] + ".");
    }
    const yes = act === "ok" ? { text: "✅ Evet, onayla", callback_data: "ok!:" + b.id } : { text: "⛔ Evet, reddet", callback_data: "no!:" + b.id };
    await tg("editMessageReplyMarkup", Object.assign({ reply_markup: { inline_keyboard: [[yes, { text: "↩️ Vazgeç", callback_data: "back:" + b.id }]].concat(rest) } }, msg)).catch(() => {});
    return answer(act === "ok" ? "Onaylarsanız müşteriye voucherlı onay e-postası gider." : "Reddederseniz müşteriye red e-postası gider.");
  }
  if (act === "back") {
    await tg("editMessageReplyMarkup", Object.assign({ reply_markup: { inline_keyboard: keyboard(b, true) } }, msg)).catch(() => {});
    return answer();
  }
  if (act === "ok!" || act === "no!") {
    if (!["yeni", "talep"].includes(b.status)) {
      await tg("editMessageReplyMarkup", Object.assign({ reply_markup: { inline_keyboard: rest } }, msg)).catch(() => {});
      return answer("Bu rezervasyon zaten " + STATUS[b.status] + ".");
    }
    await answer(act === "ok!" ? "Onaylanıyor…" : "Reddediliyor…");
    const flow = require("./flow");
    const done = act === "ok!" ? await flow.approve(b, "telegram", who) : await flow.reject(b, "", "telegram", who);
    const line = (act === "ok!" ? "✅ Onaylandı" : "⛔ Reddedildi") + " · " + who + " (Telegram)";
    await tg("editMessageText", Object.assign({ text: (q.message.text || "") + "\n\n" + line, disable_web_page_preview: true, reply_markup: { inline_keyboard: keyboard(done, false) } }, msg)).catch(e => console.error(e));
    return;
  }
  return answer();
}

// ---------- Lists: /dun /bugun /yarin /buhafta ----------
const TZ = "Europe/Istanbul";
function today() { return new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()); }
function addDays(ymd, n) { const d = new Date(ymd + "T12:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); }
const short = (code, name) => name || code || "";

async function list(from, to, title) {
  const all = await require("./store").listBookings();
  const rows = [];
  all.forEach(b => {
    if (["iptal", "reddedildi"].includes(b.status)) return;
    (b.legs || []).forEach((l, i) => { if (l.date >= from && l.date <= to) rows.push({ b, l, i }); });
  });
  rows.sort((x, y) => (x.l.date + x.l.time).localeCompare(y.l.date + y.l.time));
  if (!rows.length) return { text: title + "\n\nTransfer yok." };
  const out = [title + " · " + rows.length + " transfer"];
  let day = "";
  rows.forEach(({ b, l, i }) => {
    if (from !== to && l.date !== day) { day = l.date; out.push("\n📅 " + longDate(day)); }
    const c = b.customer || {};
    out.push((from === to ? "\n" : "") + "🕐 " + (l.time || "--:--") + " · №" + b.id + (b.legs.length > 1 ? (i ? " dönüş" : " gidiş") : "") + (l.done ? " ✔️" : "") + (["yeni", "talep", "degisiklik"].includes(b.status) ? " (" + STATUS[b.status] + ")" : "") +
      "\n" + short(l.from, l.fromName) + " → " + (b.hourly ? b.hourly.hours + " saat şoförlü" : short(l.to, l.toName)) +
      "\n👤 " + (c.name || "-") + (c.phone ? " · " + c.phone : "") + " · " + (l.pax || 0) + " kişi" + (l.flight ? " · ✈️ " + l.flight : "") +
      "\n🚐 " + (l.carName || b.carName || b.car || "") + (l.assign && l.assign.label ? " · " + l.assign.label : ""));
  });
  // a button per booking under the list; pressing it sends that booking in full (like the driver's WhatsApp message)
  const ids = [...new Set(rows.map(r => r.b.id))].slice(0, 90);
  const btn = id => { const r = rows.find(x => x.b.id === id); return { text: "#" + id + " · " + (r.l.time || "--:--"), callback_data: "d:" + id }; };
  const keyboard = [];
  for (let i = 0; i < ids.length; i += 3) keyboard.push(ids.slice(i, i + 3).map(btn));
  return { text: out.join("\n"), keyboard };
}
async function listFor(cmd) {
  const t = today();
  if (cmd === "dun") return list(addDays(t, -1), addDays(t, -1), "📋 Dün · " + longDate(addDays(t, -1)));
  if (cmd === "bugun") return list(t, t, "📋 Bugün · " + longDate(t));
  if (cmd === "yarin") return list(addDays(t, 1), addDays(t, 1), "📋 Yarın · " + longDate(addDays(t, 1)));
  // this week: Monday to Sunday
  const wd = (new Date(t + "T12:00:00Z").getUTCDay() + 6) % 7, mon = addDays(t, -wd);
  return list(mon, addDays(mon, 6), "📋 Bu hafta · " + longDate(mon).replace(/ \S+$/, "") + " – " + longDate(addDays(mon, 6)).replace(/ \S+$/, ""));
}
const COMMANDS = [
  { command: "bugun", description: "Bugünün transferleri" },
  { command: "yarin", description: "Yarının transferleri" },
  { command: "dun", description: "Dünün transferleri" },
  { command: "buhafta", description: "Bu haftanın transferleri" }
];
function command(t) {
  const m = /^\/(bugun|bugün|yarin|yarın|dun|dün|buhafta|bu_hafta)(@\w+)?$/i.exec(String(t || "").trim().split(/\s+/)[0]);
  return m ? m[1].toLowerCase().replace("ü", "u").replace("ı", "i").replace("_", "") : "";
}

// Every evening (Vercel cron, vercel.json): tomorrow's list to the connected chats, once a day
async function daily() {
  if (!configured()) return false;
  if (!(await require("./store").cmd("SET", "tg:daily:" + today(), "1", "NX", "EX", String(2 * 86400)))) return false;
  const l = await listFor("yarin");
  return notify(l.text, l.keyboard);
}

// The WhatsApp message to the customer, in their language (same text as the panel's Aranacaklar), with a link
// that opens the booking form again with their route, date and party filled in
const ZONES = ["IST", "SAW", "galataport", "taksim", "sultanahmet", "karakoy", "besiktas", "sisli", "sariyer", "bakirkoy", "beylikduzu", "kadikoy", "uskudar", "atasehir",
  "bursa", "uludag", "yalova", "sapanca", "kartepe", "bolu", "kartalkaya"];
function resumeUrl(l) {
  const g = (l.legs || [])[0] || {}, r = (l.legs || [])[1];
  if (!ZONES.includes(g.from) || !ZONES.includes(g.to) || g.from === g.to) return "";
  const q = new URLSearchParams({ from: g.from, to: g.to });
  if (g.date) q.set("date", g.date);
  if (g.time) q.set("time", g.time);
  if (g.pax) q.set("pax", g.pax);
  if (g.bags != null) q.set("bags", g.bags);
  if (r) { q.set("ret", "1"); if (r.date) q.set("rdate", r.date); if (r.time) q.set("rtime", r.time); }
  const lang = LEAD_TEXT[l.lang] && l.lang !== "en" ? "/" + l.lang + "/" : "/";
  return SITE() + lang + "?" + q + "#book";
}
const LEAD_TEXT = require("./leadtext");
function leadMsg(l) {
  const T = LEAD_TEXT[l.lang] || LEAD_TEXT.en, name = ((l.customer || {}).name || "").trim();
  const dmy = d => d ? d.split("-").reverse().join(".") : "";
  const lines = [name ? T[0].replace("{n}", name) : T[0].replace(/,?\s*\{n\}/, ""), "", T[1]];
  (l.legs || []).forEach((x, i) => {
    if (x.date || x.from || x.to) lines.push((i ? "↩ " + T[3] + "\n" : "") + "📅 " + dmy(x.date) + (x.time ? " " + x.time : "") + "\n📍 " + (x.fromName || x.from || "-") + " → " + (x.toName || x.to || "-"));
  });
  if (l.carName) lines.push("🚗 " + l.carName);
  if (l.total) lines.push("💶 " + l.total + " " + (l.currency || "EUR"));
  lines.push("", T[2]);
  const url = resumeUrl(l);
  if (url) lines.push("", "👉 " + url);
  return lines.join("\n");
}

// ---------- Every few minutes (a GitHub Actions schedule calls /api/admin?a=tgtick) ----------
// A booking a customer left half way on the site, 20 minutes after their last change; sent once (a Redis mark per lead).
const LEAD_STEP = { 1: "Yolcu bilgileri", 2: "Dönüş transferi", 3: "Ödeme ve onay" };
async function tick() {
  if (!configured() || !(await chats()).length) return { leads: 0 };
  const store = require("./store");
  const once = key => store.cmd("SET", key, "1", "NX", "EX", String(3 * 86400));
  const now = Date.now();
  let leads = 0;

  for (const l of await store.listLeads()) {
    const age = now - Date.parse(l.updatedAt || l.createdAt);
    if ((l.status && l.status !== "aranacak") || age < 20 * 60000 || age > 24 * 3600000) continue;
    if (!(await once("tg:ld:" + l.id))) continue;
    const c = l.customer || {}, g = (l.legs || [])[0] || {};
    const wa = digits(c.phone);
    const t = ["⏳ Yarım kalan rezervasyon",
      ["👤 " + (c.name || "-"), c.phone ? "📱 Tel: " + c.phone : "", c.email ? "✉️ E-posta: " + c.email : "", "🌐 Dil: " + (l.lang || "-").toUpperCase()].filter(Boolean).join("\n"),
      [g.date ? "📅 " + longDate(g.date) + (g.time ? " · " + g.time : "") : "", g.from || g.fromName ? "🅰️ " + place(g.from, g.fromName, g.fromAddr) : "", g.to || g.toName ? "🅱️ " + place(g.to, g.toName, g.toAddr) : "",
        g.pax ? "👥 " + g.pax + " kişi" : "", (l.legs || []).length > 1 ? "↩️ Dönüş de var" : ""].filter(Boolean).join("\n"),
      [l.carName ? "🚐 Araç: " + l.carName : "", l.total ? "💰 " + l.total + " " + (l.currency || "") : "", "🛑 Kaldığı adım: " + (LEAD_STEP[l.step] || l.step || "-")].filter(Boolean).join("\n")
    ].filter(Boolean).join("\n\n");
    const kb = [[wa.length >= 8 ? { text: "💬 WhatsApp: rezervasyonu tamamla", url: "https://api.whatsapp.com/send?phone=" + wa + "&text=" + encodeURIComponent(leadMsg(l)) } : null].filter(Boolean)].filter(r => r.length);
    if (/^https:/.test(SITE())) kb.push([{ text: "🖥 Aranacaklar", url: SITE() + "/admin#aranacaklar" }]);
    await notify(t, kb.length ? kb : null);
    leads++;
  }

  return { leads };
}

module.exports = { configured, info, linkCode, claim, hook, remove, notify, booking, daily, listFor, tick };
