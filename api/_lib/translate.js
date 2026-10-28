// Other-language versions of a panel blog post (Blog Yazıları → "Diğer dillerde yayınla"): posts are written in
// English and Claude translates every text of the post into each chosen site language. The result is saved, published
// or as a draft, in the same translation group, so the pages link each other with hreflang once published. Pictures, widgets, category, dates and sources are kept.
// Needs ANTHROPIC_API_KEY in the Vercel project's environment variables.
const { Anthropic } = require("@anthropic-ai/sdk");
const blog = require("./blog");

const NAMES = { en: "English", tr: "Turkish", de: "German", fr: "French", it: "Italian", es: "Spanish", nl: "Dutch", ro: "Romanian",
  ru: "Russian", el: "Greek", sr: "Serbian (Latin script)", ar: "Arabic" };

const TR_NAMES = { en: "İngilizce", tr: "Türkçe", de: "Almanca", fr: "Fransızca", it: "İtalyanca", es: "İspanyolca", nl: "Felemenkçe", ro: "Rumence",
  ru: "Rusça", el: "Yunanca", sr: "Sırpça", ar: "Arapça" };

const SYSTEM = `You translate travel guides for ITB Transfer, a licensed private transfer company in Istanbul (airport transfers and cars with a driver). The guides are published on the company's website and must read as if a native speaker wrote them for travellers: natural, clear, accurate and good for search engines.

You get a JSON list of texts from one post, in order: the title, the SEO title, the meta description, the short breadcrumb title, the quick answer, the cover picture's alt text, then the body (paragraphs, headings, list items, picture texts, table cells) and the FAQ (question, answer). Return the same number of texts in the same order, each one the translation of the text at the same position. Empty texts stay empty.

- Keep the HTML tags <b>, <i>, <br> and <a ...> exactly where the meaning puts them; never change an href or data-nf attribute.
- Keep price placeholders such as {p:eco:IST:taksim} exactly as they are (the site puts the current price there).
- Keep prices, euro amounts, times, distances, phone numbers, flight and bus line numbers, and the brand name "ITB Transfer" as they are.
- Write place names the way travellers in that language know them (for example Estambul in Spanish), and keep Turkish names of neighbourhoods and sights where there is no common local form.
- The SEO title stays under 60 characters, the meta description under 155 characters, the short title under 40 characters.
- Also give a URL slug for the translated post: lowercase ASCII letters, digits and hyphens, at most 70 characters, in the target language (transliterate languages not written in Latin letters).`;

const SCHEMA = {
  type: "object",
  properties: { slug: { type: "string" }, texts: { type: "array", items: { type: "string" } } },
  required: ["slug", "texts"],
  additionalProperties: false
};

// every translatable text of a post, always in the same order; f returns the text to put in its place
function walk(p, f) {
  for (const k of ["title", "seoTitle", "desc", "short", "answer"]) p[k] = f(p[k] || "");
  if (p.hero) p.hero.alt = f(p.hero.alt || "");
  for (const b of p.blocks || []) {
    if (b.h != null) b.h = f(b.h);
    if (b.x != null) b.x = f(b.x);
    if (b.items) b.items = b.items.map(i => f(i));
    if (b.t === "img") { b.alt = f(b.alt || ""); b.cap = f(b.cap || ""); }
    if (b.t === "table") { b.head = b.head.map(c => f(c)); b.rows = b.rows.map(r => r.map(c => f(c))); }
  }
  for (const q of p.faq || []) { q.q = f(q.q); q.a = f(q.a); }
  return p;
}

const slugify = s => String(s || "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i")
  .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 70).replace(/-+$/, "");

// src: the saved post; to: a site language; publish: the translation goes live with the source's dates instead of
// staying a draft. A draft translation that already exists is published as it is. Returns the saved post.
async function translate(src, to, publish) {
  if (!blog.SHELL.langs.includes(to) || to === src.lang) throw Object.assign(new Error("Geçersiz dil"), { user: true });
  const group = src.group || src.id;
  const all = await blog.list();
  const had = all.find(m => (m.group || m.id) === group && m.lang === to);
  if (had && publish && had.status !== "pub") {
    const p = await blog.get(had.id);
    return (await blog.save(Object.assign(p, { status: "pub", published: src.published, updated: src.updated > p.updated ? src.updated : p.updated }))).post;
  }
  if (had) throw Object.assign(new Error("Bu yazının " + TR_NAMES[to] + " sürümü zaten var"), { user: true });
  if (!process.env.ANTHROPIC_API_KEY) throw Object.assign(new Error("Otomatik çeviri için Vercel'de ANTHROPIC_API_KEY tanımlı olmalı"), { user: true });

  const texts = [];
  walk(JSON.parse(JSON.stringify(src)), s => (texts.push(s), s));
  const client = new Anthropic();
  const stream = client.beta.messages.stream({
    model: "claude-opus-5-5",
    max_tokens: 64000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "low", format: { type: "json_schema", schema: SCHEMA } },
    system: SYSTEM,
    messages: [{ role: "user", content: "Translate from " + NAMES[src.lang] + " into " + NAMES[to] + ".\n\n" + JSON.stringify({ texts }) }]
  });
  const msg = await stream.finalMessage();
  if (msg.stop_reason === "refusal") throw Object.assign(new Error("Çeviri yapılamadı (model reddetti)"), { user: true });
  if (msg.stop_reason === "max_tokens") throw Object.assign(new Error("Yazı tek seferde çevrilemeyecek kadar uzun"), { user: true });
  const block = msg.content.find(b => b.type === "text");
  let out;
  try { out = JSON.parse(block.text); } catch (e) { throw Object.assign(new Error("Çeviri okunamadı, tekrar deneyin"), { user: true }); }
  if (!Array.isArray(out.texts) || out.texts.length !== texts.length) throw Object.assign(new Error("Çeviri eksik geldi, tekrar deneyin"), { user: true });

  let i = 0;
  const p = walk(JSON.parse(JSON.stringify(src)), () => String(out.texts[i++] || ""));
  // links to the home page of the source language go to the home page of the translation
  const home = to === "en" ? "/" : "/" + to, from = src.lang === "en" ? "/" : "/" + src.lang;
  const relink = s => s.replace(/href="([^"]*)"/g, (m, h) => h === from || h === "/" ? 'href="' + home + '"' : m);
  for (const b of p.blocks) {
    if (b.h) b.h = relink(b.h); if (b.items) b.items = b.items.map(relink); if (b.cap) b.cap = relink(b.cap);
    if (b.t === "table") { b.head = b.head.map(relink); b.rows = b.rows.map(r => r.map(relink)); }
  }
  for (const q of p.faq) q.a = relink(q.a);

  let slug = slugify(out.slug) || slugify(src.slug);
  if (all.some(m => m.lang === to && m.slug === slug)) slug = (slug + "-" + to).slice(0, 90);
  Object.assign(p, { id: "", lang: to, slug, status: publish ? "pub" : "draft", group });
  return (await blog.save(p)).post;
}

module.exports = { translate, NAMES };
