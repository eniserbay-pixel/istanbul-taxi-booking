// Pages of the blog posts written in the admin panel, drawn like the built guides (src/seo/build_seo.py
// blog_pages): same page frame, header, footer, cookie notice and analytics (from blogshell.json, written by
// the build), with the post's own title, description, canonical URL, Open Graph picture and structured data
// (BlogPosting, BreadcrumbList, FAQPage). Also the /blog index with the panel posts added, the panel posts'
// sitemap and llms.txt.
const SHELL = require("./blogshell.json");
// each language's page frame and booking widgets (blogshell/<lang>.json), read when a page in it is drawn;
// written out so Vercel bundles every file with the function
const LW = {
  en: () => require("./blogshell/en.json"), tr: () => require("./blogshell/tr.json"), de: () => require("./blogshell/de.json"),
  fr: () => require("./blogshell/fr.json"), it: () => require("./blogshell/it.json"), es: () => require("./blogshell/es.json"),
  nl: () => require("./blogshell/nl.json"), ro: () => require("./blogshell/ro.json"), ru: () => require("./blogshell/ru.json"),
  el: () => require("./blogshell/el.json"), sr: () => require("./blogshell/sr.json"), ar: () => require("./blogshell/ar.json")
};
const W = l => (LW[l] || LW.en)();
const hl = l => SHELL.hreflang[l] || l;

const BASE = SHELL.base;
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const plain = s => String(s == null ? "" : s).replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const T = l => SHELL.text[l] || SHELL.text.en;
const home = l => l === "en" ? "/" : "/" + l;
const blogHome = l => l === "en" ? "/blog" : "/" + l + "/blog";
const postUrl = m => (m.lang === "en" ? "" : "/" + m.lang) + "/blog/" + m.slug;
const cat = k => SHELL.cats.find(c => c.k === k) || SHELL.cats[SHELL.cats.length - 1];
const catName = (k, l) => cat(k)[l] || cat(k).en;
function dateTxt(d, l) { const [y, m, dd] = d.split("-"); return T(l).date.replace("{d}", +dd).replace("{m}", T(l).months[+m - 1]).replace("{y}", y); }
function readMin(p) { return Math.max(1, Math.round((p.words || 0) / 200)); }
function ldjson(graph) { return '<script type="application/ld+json">' + JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/<\//g, "<\\/") + "</script>"; }
function crumbs(items) { return { "@type": "BreadcrumbList", itemListElement: items.map((x, i) => ({ "@type": "ListItem", position: i + 1, name: x[0], item: BASE + x[1] })) }; }

// Stored links → page links: other sites open in a new tab (nofollow when the panel ticked it), euro amounts
// switch with the currency button like on the built pages
function rich(html) {
  return String(html || "")
    .replace(/<a href="([^"]*)"( data-nf="1")?>/g, (m, h, nf) => /^https?:/i.test(h.replace(/&amp;/g, "&")) ? '<a href="' + h + '" target="_blank" rel="' + (nf ? "nofollow " : "") + 'noopener">' : '<a href="' + h + '">')
    .replace(/€(\d+(?:\.\d+)?)/g, '<bdi data-eur="$1">€$1</bdi>');
}
function slugify(s) {
  const map = { ç: "c", ğ: "g", ı: "i", İ: "i", ö: "o", ş: "s", ü: "u", Ç: "c", Ğ: "g", Ö: "o", Ş: "s", Ü: "u" };
  return String(s).replace(/[çğıİöşüÇĞÖŞÜ]/g, c => map[c]).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "s";
}
function picture(im, sizes, lazy) {
  const srcset = im.small && im.small !== im.src ? ' srcset="' + im.small + " " + Math.min(im.w, 800) + "w, " + im.src + " " + im.w + 'w" sizes="' + sizes + '"' : "";
  return '<img src="' + esc(im.src) + '"' + srcset + ' width="' + im.w + '" height="' + im.h + '" alt="' + esc(im.alt) + '"' + (lazy ? ' loading="lazy" decoding="async"' : ' fetchpriority="high"') + ">";
}
// the transfer bar with this block's route selected
function transferBar(l, a, b) {
  const sel = (html, name, v) => html.replace(new RegExp('(<select name="' + name + '">[\\s\\S]*?</select>)'), s => s.replace('<option value="' + v + '">', '<option value="' + v + '" selected>'));
  return sel(sel(W(l).qb, "from", a), "to", b);
}

function body(p, others) {
  const l = p.lang, t = T(l), ids = {}, toc = [];
  let hourly = false, widget = false;
  const blocks = p.blocks.map(b => {
    switch (b.t) {
      case "h2": {
        let id = slugify(b.x);
        while (ids[id]) id += "-2";
        ids[id] = 1; toc.push([id, b.x]);
        return '<h2 id="' + id + '">' + esc(b.x) + "</h2>";
      }
      case "h3": return "<h3>" + esc(b.x) + "</h3>";
      case "p": return "<p>" + rich(b.h) + "</p>";
      case "tip": return '<div class="b-tip"><p>' + rich(b.h) + "</p></div>";
      case "ul": case "ol": return "<" + b.t + ">" + b.items.map(i => "<li>" + rich(i) + "</li>").join("") + "</" + b.t + ">";
      case "img": return '<figure class="b-fig">' + picture(b, "(max-width: 820px) 100vw, 780px", true) + (b.cap ? "<figcaption>" + rich(b.cap) + "</figcaption>" : "") + "</figure>";
      case "transfer": widget = true; return transferBar(l, b.a, b.b);
      case "hourly": if (hourly) return ""; hourly = widget = true; return W(l).hb;
      case "table": return '<div class="b-table"><table>' + (b.head.length ? "<thead><tr>" + b.head.map(c => "<th>" + rich(c) + "</th>").join("") + "</tr></thead>" : "") +
        "<tbody>" + b.rows.map(r => "<tr>" + r.map(c => "<td>" + rich(c) + "</td>").join("") + "</tr>").join("") + "</tbody></table></div>";
      default: return "";
    }
  }).join("");
  const c = cat(p.cat);
  const faq = p.faq.length ? "<h2>" + t.faq + '</h2><div class="b-faq">' + p.faq.map(f => "<details><summary>" + esc(f.q) + "</summary><p>" + rich(f.a) + "</p></details>").join("") + "</div>" : "";
  const src = p.sources.length ? '<div class="b-src"><b>' + t.src + "</b><ul>" + p.sources.map(s => '<li><a href="' + esc(s.u) + '" target="_blank" rel="nofollow noopener">' + esc(s.n) + "</a></li>").join("") + "</ul></div>" : "";
  const rel = others.length ? '<div class="b-rel"><b>' + t.rel + "</b>" + others.map(o => '<a href="' + esc(o.u) + '">' + esc(o.t) + "</a>").join("") + "</div>" : "";
  return '<article class="b-post">' +
    '<nav class="b-crumb"><a href="' + home(l) + '">' + t.home + '</a> / <a href="' + blogHome(l) + '">Blog</a> / <a href="' + blogHome(l) + "#" + c.k + '">' + esc(catName(c.k, l)) + "</a></nav>" +
    '<a class="bc-tag" href="' + blogHome(l) + "#" + c.k + '" style="--c:' + c.c + ";--cs:" + c.cs + '">' + esc(catName(c.k, l)) + "</a><h1>" + esc(p.title) + "</h1>" +
    '<p class="b-byline">' + t.by + " " + t.author + " · " + t.updated + ' <time datetime="' + p.updated + '">' + dateTxt(p.updated, l) + "</time> · " + readMin(p) + " " + t.read + "</p>" +
    (p.hero ? '<figure class="b-hero">' + picture(p.hero, "(max-width: 820px) 100vw, 780px", false) + "</figure>" : "") +
    (p.answer ? '<div class="b-answer"><b>' + t.quick + "</b><p>" + rich(esc(p.answer)) + "</p></div>" : "") +
    (toc.length >= 3 ? '<nav class="b-toc" aria-label="' + t.toc + '"><b>' + t.toc + "</b><ol>" + toc.map(x => '<li><a href="#' + x[0] + '">' + esc(x[1]) + "</a></li>").join("") + "</ol></nav>" : "") +
    blocks + (widget ? "" : t.cta) + faq + src + rel + "</article>";
}

function fill(l, o) {
  let s = W(l).page;
  for (const k of ["TITLE", "DESC", "URL", "HEAD", "LD", "BODY", "OGIMG"]) s = s.split("__" + k + "__").join(o[k]);
  return s;
}

// p: the full post; all: the live panel posts (meta) for related links and translations
function page(p, all) {
  const l = p.lang, t = T(l), u = postUrl(p), abs = BASE + u;
  const words = p.words || require("./blog").wordCount(p);
  p = Object.assign({}, p, { words });
  // related: same language, same category first
  const mine = all.filter(m => m.id !== p.id && m.lang === l);
  const others = mine.filter(m => m.cat === p.cat).concat(mine.filter(m => m.cat !== p.cat)).map(m => ({ u: postUrl(m), t: m.short || m.title })).slice(0, 3);
  // the same post in the other languages (same translation group)
  // a post's translation group is the id of the first post of the group (the panel links them)
  const g = p.group || p.id;
  const alts = g ? all.filter(m => (m.group || m.id) === g && m.lang !== l && m.id !== p.id) : [];
  const altLinks = alts.length ? [[l, u]].concat(alts.map(m => [m.lang, postUrl(m)])) : [];
  let head = '<meta property="article:published_time" content="' + p.published + '">\n<meta property="article:modified_time" content="' + p.updated + '">\n' +
    (p.status !== "pub" ? '<meta name="robots" content="noindex">\n' : "");
  if (altLinks.length) {
    head += altLinks.map(x => '<link rel="alternate" hreflang="' + hl(x[0]) + '" href="' + BASE + x[1] + '">\n').join("");
    const en = altLinks.find(x => x[0] === "en");
    if (en) head += '<link rel="alternate" hreflang="x-default" href="' + BASE + en[1] + '">\n';
  }
  const img = p.hero ? BASE + p.hero.src : BASE + "/img/og.jpg";
  const ld = ldjson([SHELL.org,
    Object.assign({ "@type": "BlogPosting", "@id": abs + "#article", mainEntityOfPage: abs, url: abs, headline: p.title, description: p.desc, image: img,
      datePublished: p.published, dateModified: p.updated, inLanguage: hl(l), wordCount: words,
      author: { "@id": SHELL.orgId }, publisher: { "@id": SHELL.orgId }, isPartOf: { "@id": BASE + "/blog#blog" }, articleSection: catName(p.cat, l) }),
    crumbs([[t.home, home(l)], ["Blog", blogHome(l)], [p.short || p.title, u]])]
    .concat(p.faq.length ? [{ "@type": "FAQPage", "@id": abs + "#faq", mainEntity: p.faq.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plain(f.a) } })) }] : []));
  const title = p.seoTitle || (p.title.length < 45 ? p.title + " | ITB Transfer" : p.title);
  let html = fill(l, { TITLE: esc(title), DESC: esc(p.desc), URL: u, HEAD: head, LD: ld, BODY: body(p, others), OGIMG: img });
  // the language menu goes to the translation
  for (const [x, xu] of altLinks) html = html.replace(new RegExp('href="[^"]*"( hreflang="' + hl(x) + '")', "g"), 'href="' + xu + '"$1');
  return html;
}

function card(m, l, eager) {
  const c = cat(m.cat);
  return '<a class="b-card" href="' + postUrl(m) + '"><div class="b-thumb">' + (m.hero ? '<img src="' + esc(m.hero.small || m.hero.src) + '" alt="' + esc(m.hero.alt || m.title) + '" width="600" height="315"' + (eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"') + ">" : "") +
    '</div><div class="b-cbody"><span class="bc-tag" style="--c:' + c.c + ";--cs:" + c.cs + '">' + esc(catName(c.k, l)) + '</span><h3 class="b-ct">' + esc(m.title) + "</h3><p>" + esc(m.desc) + "</p>" +
    '<span class="b-meta">' + readMin(m) + " " + T(l).read + " · " + T(l).updated + " " + dateTxt(m.updated, l) + "</span></div></a>";
}

// /blog with the English panel posts added to their sections (newest first); /<lang>/blog lists that language's posts
function index(l, all) {
  const mine = all.filter(m => m.lang === l).sort((a, b) => b.published.localeCompare(a.published));
  if (l === "en") {
    let s = SHELL.index;
    for (const c of SHELL.cats) {
      const ps = mine.filter(m => m.cat === c.k);
      if (!ps.length) continue;
      s = s.replace("<!--NEW:" + c.k + "-->", ps.map((m, i) => card(m, l, c === SHELL.cats[0] && !i)).join(""));
      s = s.replace(new RegExp('(<section class="bc-sec" id="' + c.k + '"[\\s\\S]*?<span class="bc-n">)(\\d+)'), (x, a, n) => a + (+n + ps.length));
    }
    if (mine.length) s = s.replace(/"blogPost": \[(\])?/, (x, end) => '"blogPost": [' + mine.map(m => JSON.stringify({ "@type": "BlogPosting", headline: m.title, url: BASE + postUrl(m) })).join(", ") + (end ? "]" : ", "));
    return s;
  }
  if (!mine.length) return null;
  const t = T(l);
  const body = '<nav class="b-crumb"><a href="' + home(l) + '">' + t.home + "</a> / Blog</nav>" +
    '<div class="section-head"><div class="eyebrow">Blog</div><h1>' + esc(t.h1) + "</h1><p>" + esc(t.lead) + "</p></div>" +
    '<div class="b-grid">' + mine.map((m, i) => card(m, l, !i)).join("") + "</div>";
  const ld = ldjson([SHELL.org, { "@type": "Blog", "@id": BASE + blogHome(l) + "#blog", url: BASE + blogHome(l), name: t.h1, inLanguage: hl(l), publisher: { "@id": SHELL.orgId },
    blogPost: mine.map(m => ({ "@type": "BlogPosting", headline: m.title, url: BASE + postUrl(m) })) }, crumbs([[t.home, home(l)], ["Blog", blogHome(l)]])]);
  return fill(l, { TITLE: esc(t.title), DESC: esc(t.lead), URL: blogHome(l), HEAD: "", LD: ld, BODY: body, OGIMG: BASE + "/img/og.jpg" }).replace(/<meta property="og:type" content="article">/, '<meta property="og:type" content="website">');
}

function sitemap(all) {
  const urls = all.map(m => {
    const g = m.group || m.id, alts = all.filter(x => (x.group || x.id) === g);
    const x = alts.length > 1 ? alts.map(a => '<xhtml:link rel="alternate" hreflang="' + hl(a.lang) + '" href="' + BASE + postUrl(a) + '"/>').join("") : "";
    return "<url><loc>" + BASE + postUrl(m) + "</loc><lastmod>" + m.updated + "</lastmod>" + x + "</url>";
  });
  for (const l of SHELL.langs) {
    const ps = all.filter(m => m.lang === l);
    if (l !== "en" && ps.length) urls.push("<url><loc>" + BASE + blogHome(l) + "</loc><lastmod>" + ps.map(m => m.updated).sort().pop() + "</lastmod></url>");
  }
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n  ' + urls.join("\n  ") + "\n</urlset>\n";
}

function llms(all) {
  const add = all.map(m => "\n- [" + m.title.replace(/[[\]]/g, "") + "](" + BASE + postUrl(m) + ")" + (m.lang !== "en" ? " (" + m.lang + ")" : "")).join("");
  return SHELL.llms.replace("\n\n## Languages", add + "\n\n## Languages");
}

// {p:<vehicle>:<from>:<to>} in a post → that route's current one-way price ("€55"), or "–" where the vehicle
// is not offered; pr is the panel's pricing (_lib/pricing.js get). Works on a post or a list of them.
function prices(x, pr) {
  const s = JSON.stringify(x);
  if (!pr || s.indexOf("{p:") < 0) return x;
  const cars = {};
  (pr.cars || []).forEach(c => { cars[c.id] = c; });
  return JSON.parse(s.replace(/\{p:([a-z0-9_-]+):([A-Za-z0-9_-]+):([A-Za-z0-9_-]+)\}/g, (m, c, a, b) => {
    const row = (pr.prices || {})[[a, b].sort().join("|")], n = row && row[c];
    return n && cars[c] && !cars[c].off ? "€" + n : "–";
  }));
}

module.exports = { page, index, sitemap, llms, postUrl, prices, notFound: SHELL.notFound };
