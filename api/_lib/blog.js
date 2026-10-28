// Blog posts written in the admin panel (Blog Yazıları), stored on Upstash Redis:
//   bl:meta       hash: post id → the post without its body (lists, links, sitemap)
//   bl:p:<id>     one post as JSON
//   bl:img:<id>   an uploaded picture {t: type, d: base64}, served at /media/blog/<id>
//   bl:seeded     set once the site's first 15 guides (blogseed.json) were added as panel posts
//   bl:seeded:<n> the same for later batches (blogseed-<n>.json)
// A post is live when its status is "pub" and its publish date has come (Istanbul time); pages are drawn by
// _lib/blogpage.js. Prices can be written as {p:eco:IST:taksim} (vehicle type, from, to): the page shows the
// current price from the panel's Fiyatlandırma (blogpage.prices).
const store = require("./store");
const SHELL = require("./blogshell.json");

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const IMG_ID = /^[a-z0-9]{8,32}$/;
// a picture uploaded in the panel, or one shipped with the site (the first guides' covers, public/img/blog)
const IMG_URL = /^(?:\/media\/blog\/[a-z0-9]{8,32}|\/img\/blog\/[a-z0-9-]{1,90}\.(?:webp|jpg|png))$/;
const IMG_MAX = 950000;
const CATS = SHELL.cats.map(c => c.k);
const PLACES = SHELL.places.map(p => p[0]);

function today() { return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul" }).format(new Date()); }
function live(m) { return m.status === "pub" && m.published <= today(); }
function bad(msg) { const e = new Error(msg); e.user = true; return e; }

const str = (v, max) => String(v == null ? "" : v).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").trim().slice(0, max);

// Inline text of a paragraph, list item, tip or caption: only <b>, <i>, <br> and links are kept
const ENT = /&(?!(?:[a-z]+|#\d+|#x[0-9a-f]+);)/gi;
function safeHref(h) {
  h = String(h || "").replace(/&amp;/g, "&").trim();
  if (/^https?:\/\/[^\s"'<>]+$/i.test(h)) {
    const own = /^https?:\/\/(?:www\.)?istanbultaxibooking\.com(\/[^\s"'<>]*)?$/i.exec(h);
    return own ? (own[1] || "/") : h;
  }
  if (/^\/(?!\/)[^\s"'<>]*$/.test(h) || /^#[\w-]+$/.test(h) || /^(?:mailto|tel):[^\s"'<>]+$/i.test(h)) return h;
  return "";
}
function inline(s, max) {
  const out = [], open = [];
  String(s == null ? "" : s).slice(0, max * 3).split(/(<[^>]*>)/).forEach(part => {
    if (!part) return;
    if (part[0] !== "<") { out.push(part.replace(/[<>]/g, "").replace(ENT, "&amp;")); return; }
    const m = /^<\s*(\/?)\s*([a-z0-9]+)([^>]*)>$/i.exec(part);
    const tag = m && { b: "b", strong: "b", i: "i", em: "i", a: "a", br: "br" }[m[2].toLowerCase()];
    if (!tag) return;
    if (tag === "br") { if (!m[1]) out.push("<br>"); return; }
    if (m[1]) {
      const i = open.lastIndexOf(tag);
      if (i >= 0) while (open.length > i) out.push("</" + open.pop() + ">");
      return;
    }
    if (tag === "a") {
      const h = /\bhref\s*=\s*"([^"]*)"/i.exec(m[3]) || /\bhref\s*=\s*'([^']*)'/i.exec(m[3]);
      const href = h && safeHref(h[1]);
      if (!href) return;
      out.push('<a href="' + href.replace(/&/g, "&amp;").replace(/"/g, "&quot;") + '"' + (/\bdata-nf\b/i.test(m[3]) ? ' data-nf="1"' : "") + ">");
    } else out.push("<" + tag + ">");
    open.push(tag);
  });
  while (open.length) out.push("</" + open.pop() + ">");
  const html = out.join("").replace(/^(?:\s|<br>|&nbsp;)+|(?:\s|<br>|&nbsp;)+$/g, "");
  if (html.length > max) throw bad("Bir metin bloğu çok uzun (en fazla " + max + " karakter)");
  return html;
}
function plain(s) { return String(s).replace(/<[^>]*>/g, ""); }

function cleanImg(x, alt) {
  x = x || {};
  const src = str(x.src, 60), small = str(x.small, 60);
  if (!IMG_URL.test(src)) return null;
  return { src, small: IMG_URL.test(small) ? small : src, w: Math.max(1, Math.min(4000, Math.round(+x.w) || 1200)), h: Math.max(1, Math.min(4000, Math.round(+x.h) || 630)), alt: str(alt != null ? alt : x.alt, 200) };
}

function cleanBlock(b) {
  b = b || {};
  switch (b.t) {
    case "p": case "tip": { const h = inline(b.h, 5000); return plain(h).trim() ? { t: b.t, h } : null; }
    case "h2": case "h3": { const x = str(b.x, 160); return x ? { t: b.t, x } : null; }
    case "ul": case "ol": {
      const items = (Array.isArray(b.items) ? b.items : []).slice(0, 60).map(i => inline(i, 1500)).filter(i => plain(i).trim());
      return items.length ? { t: b.t, items } : null;
    }
    case "img": {
      const im = cleanImg(b);
      if (!im) return null;
      if (!im.alt) throw bad("Her resmin alt metni (resmi anlatan kısa yazı) olmalı");
      return Object.assign({ t: "img" }, im, { cap: inline(b.cap, 400) });
    }
    case "transfer": {
      const a = PLACES.includes(b.a) ? b.a : "IST", c = PLACES.includes(b.b) ? b.b : "sultanahmet";
      return { t: "transfer", a, b: a === c ? (a === "IST" ? "sultanahmet" : "IST") : c };
    }
    case "hourly": return { t: "hourly" };
    case "table": {
      // first row: column headings; cells keep the same inline tags as a paragraph
      const row = r => (Array.isArray(r) ? r : []).slice(0, 12).map(c => inline(c, 600));
      const head = row(b.head);
      const rows = (Array.isArray(b.rows) ? b.rows : []).slice(0, 80).map(row).filter(r => r.some(c => plain(c).trim()));
      const n = Math.max(head.length, ...rows.map(r => r.length), 0);
      if (!n || !rows.length) return null;
      const pad = r => r.concat(Array(n - r.length).fill(""));
      return { t: "table", head: head.some(c => plain(c).trim()) ? pad(head) : [], rows: rows.map(pad) };
    }
    default: return null;
  }
}

// The post as the panel sends it → the stored post; throws a Turkish message the panel shows
function clean(p) {
  p = p || {};
  const lang = SHELL.langs.includes(p.lang) ? p.lang : "en";
  const title = str(p.title, 140);
  if (!title) throw bad("Başlık yazın");
  const slug = str(p.slug, 90).toLowerCase();
  if (!SLUG.test(slug)) throw bad("Adres yalnızca küçük harf, rakam ve tire içerebilir (örn. istanbul-gezi-rehberi)");
  const status = p.status === "pub" ? "pub" : "draft";
  const published = DATE.test(p.published) ? p.published : today();
  let updated = DATE.test(p.updated) ? p.updated : published;
  if (updated < published) updated = published;
  const blocks = (Array.isArray(p.blocks) ? p.blocks : []).slice(0, 300).map(cleanBlock).filter(Boolean);
  const out = {
    id: IMG_ID.test(p.id) ? p.id : "",
    lang, slug, title, status, published, updated,
    seoTitle: str(p.seoTitle, 80),
    desc: str(p.desc, 220),
    short: str(p.short, 60),
    cat: CATS.includes(p.cat) ? p.cat : "transport",
    hero: cleanImg(p.hero),
    answer: str(p.answer, 700),
    blocks,
    faq: (Array.isArray(p.faq) ? p.faq : []).slice(0, 20).map(f => ({ q: str(f && f.q, 250), a: inline(f && f.a, 2000) })).filter(f => f.q && plain(f.a).trim()),
    sources: (Array.isArray(p.sources) ? p.sources : []).slice(0, 20).map(s => ({ n: str(s && s.n, 120), u: safeHref(str(s && s.u, 500)) })).filter(s => s.n && /^https?:/.test(s.u)),
    group: IMG_ID.test(p.group) ? p.group : ""
  };
  if (status === "pub") {
    const miss = [];
    if (!out.desc) miss.push("SEO açıklaması");
    if (!out.answer) miss.push("kısa cevap");
    if (!out.hero) miss.push("kapak resmi");
    if (!blocks.length) miss.push("içerik");
    if (out.hero && !out.hero.alt) miss.push("kapak resminin alt metni");
    if (miss.length) throw bad("Yayınlamak için eksik: " + miss.join(", "));
  }
  return out;
}
function meta(p) {
  const m = Object.assign({}, p);
  delete m.blocks; delete m.faq; delete m.sources;
  m.words = wordCount(p);
  return m;
}
function wordCount(p) {
  const t = [p.title, p.answer].concat((p.blocks || []).map(b => b.h || b.x || (b.items || []).join(" ") || b.cap || (b.head || []).concat(...(b.rows || [])).join(" ") || ""), (p.faq || []).map(f => f.q + " " + f.a)).join(" ");
  return plain(t).split(/\s+/).filter(Boolean).length;
}

// The site's first guides were built pages; they are added once as ordinary panel posts (blogseed.json, with
// their covers in public/img/blog). Later guides and translations written outside the panel come the same way,
// one file and one flag per batch. NX: a post already there (edited in the panel) is never overwritten, and a
// deleted one does not come back. A seeded post is skipped when the panel already has a post at its address or
// a version of it in its language (a translation made in the panel). Only the live site seeds, so a preview
// never writes them.
// each file is required by its literal name, so Vercel's bundler traces it into the function
// ITB Transfer's blog is the built site (build/blog.js); the panel starts with no posts
const SEEDS = [];
let seeded = false;
async function seed() {
  if (seeded) return;
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") { seeded = true; return; }
  const done = await store.pipe(SEEDS.map(([flag]) => ["GET", flag]));
  if (done.every(Boolean)) { await fix(); seeded = true; return; }
  const h = await store.cmd("HGETALL", "bl:meta") || [], taken = new Set();
  const mark = m => { taken.add(m.lang + "/" + m.slug); taken.add(m.lang + "#" + (m.group || m.id)); };
  for (let i = 0; i < h.length; i += 2) { try { mark(JSON.parse(h[i + 1])); } catch (e) { /* skip */ } }
  const now = new Date().toISOString(), cmds = [];
  SEEDS.forEach(([flag, posts], i) => {
    if (done[i]) return;
    for (const p of posts()) {
      if (taken.has(p.lang + "/" + p.slug) || (p.group && taken.has(p.lang + "#" + p.group))) continue;
      mark(p);
      const full = Object.assign({}, p, { createdAt: now, updatedAt: now });
      cmds.push(["SET", "bl:p:" + p.id, JSON.stringify(full), "NX"], ["HSETNX", "bl:meta", p.id, JSON.stringify(meta(full))]);
    }
    cmds.push(["SET", flag, now]);
  });
  await store.pipe(cmds);
  await fix();
  seeded = true;
}

// Text corrections to posts that are already in the panel, applied once per file (flag bl:fixed:<n>): each entry
// is a post id and [old, new] pairs replaced in its text. A post edited so the old text is gone is left as it is.
//   blogfix-1.json  drive times from IST to the centre +5 minutes, and flight delays in the colder months
//   blogfix-2.json  afternoon peak surcharge 30% -> 20%
//   blogfix-3.json  the same for the congress venues guide (batch 5)
const FIXES = [];
async function fix() {
  const done = await store.pipe(FIXES.map(([flag]) => ["GET", flag]));
  const todo = FIXES.filter((f, i) => !done[i]);
  if (!todo.length) return;
  const fixes = [].concat(...todo.map(([, f]) => f()));
  const stored = await store.pipe(fixes.map(f => ["GET", "bl:p:" + f.id]));
  const now = new Date().toISOString(), cmds = [];
  fixes.forEach((f, i) => {
    if (!stored[i]) return;
    let n = 0;
    const walk = v => typeof v === "string" ? f.r.reduce((s, [a, b]) => s.includes(a) ? (n++, s.split(a).join(b)) : s, v)
      : Array.isArray(v) ? v.map(walk) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x)])) : v;
    const p = walk(JSON.parse(stored[i]));
    if (!n) return;
    p.updatedAt = now;
    cmds.push(["SET", "bl:p:" + p.id, JSON.stringify(p)], ["HSET", "bl:meta", p.id, JSON.stringify(meta(p))]);
  });
  todo.forEach(([flag]) => cmds.push(["SET", flag, now]));
  await store.pipe(cmds);
}

async function list() {
  await seed();
  const h = await store.cmd("HGETALL", "bl:meta") || [];
  const out = [];
  for (let i = 0; i < h.length; i += 2) { try { out.push(JSON.parse(h[i + 1])); } catch (e) { /* skip */ } }
  return out.sort((a, b) => (b.published + b.updatedAt).localeCompare(a.published + a.updatedAt));
}
async function get(id) {
  if (!IMG_ID.test(String(id || ""))) return null;
  const s = await store.cmd("GET", "bl:p:" + id);
  return s ? JSON.parse(s) : null;
}
async function save(input) {
  const p = clean(input);
  const all = await list();
  if (all.some(m => m.id !== p.id && m.lang === p.lang && m.slug === p.slug)) throw bad("Bu adresle başka bir yazı var, başka bir adres seçin");
  const old = p.id ? all.find(m => m.id === p.id) : null;
  if (!old) p.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  p.createdAt = old && old.createdAt || new Date().toISOString();
  p.updatedAt = new Date().toISOString();
  await store.pipe([["SET", "bl:p:" + p.id, JSON.stringify(p)], ["HSET", "bl:meta", p.id, JSON.stringify(meta(p))]]);
  return { post: p, was: old || null };
}
async function remove(id) {
  if (!IMG_ID.test(String(id || ""))) throw bad("Yazı bulunamadı");
  await store.pipe([["DEL", "bl:p:" + id], ["HDEL", "bl:meta", id]]);
}

// A picture from the panel: a data URL (the panel resizes it to webp, or jpeg if the browser cannot)
async function saveImage(dataUrl) {
  const m = /^data:(image\/(?:webp|jpeg|png));base64,([A-Za-z0-9+/=]+)$/.exec(String(dataUrl || ""));
  if (!m) throw bad("Görsel okunamadı (webp, jpg veya png olmalı)");
  if (m[2].length > IMG_MAX) throw bad("Görsel çok büyük");
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
  await store.cmd("SET", "bl:img:" + id, JSON.stringify({ t: m[1], d: m[2] }));
  return "/media/blog/" + id;
}
async function getImage(id) {
  if (!IMG_ID.test(String(id || ""))) return null;
  const s = await store.cmd("GET", "bl:img:" + id);
  return s ? JSON.parse(s) : null;
}

// Tell Bing, Yandex and the other IndexNow engines that pages changed (Google reads the sitemap); true when accepted
const INDEXNOW_KEY = require("../../data/site.json").indexnowKey;
async function ping(urls) {
  if (!urls.length || !process.env.VERCEL_ENV || process.env.VERCEL_ENV !== "production") return false;
  const host = SHELL.base.replace(/^https?:\/\//, "");
  try {
    const r = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" }, signal: AbortSignal.timeout(4000),
      body: JSON.stringify({ host, key: INDEXNOW_KEY, keyLocation: SHELL.base + "/" + INDEXNOW_KEY + ".txt", urlList: urls })
    });
    return r.ok;
  } catch (e) { console.error("indexnow", e.message); return false; }
}

module.exports = { SHELL, today, live, clean, list, get, save, remove, saveImage, getImage, ping, inline, safeHref, wordCount };
