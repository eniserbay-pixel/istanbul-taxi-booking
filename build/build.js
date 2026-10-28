// Builds the static site into public/: home, booking page, route pages (airport × district), price list,
// legal pages, sitemap.xml, robots.txt, llms.txt and 404.html, in English (/) and in Turkish, Russian, German,
// French, Italian, Dutch and Arabic (right to left) under /tr, /ru, /de, /fr, /it, /nl and /ar.
// Prices come from data/pricing.json, so a price change there updates every page on the next build.
// Run: node build/build.js
const fs = require("fs");
const path = require("path");
const P = require("../data/pricing.json");
const site = require("../data/site.json");
const Q = require("../public/assets/quote.js");
const I = require("./i18n");
const legal = require("./legal");
const POSTS = require("./blog");
const PORT = require("./port");
const CO = require("./company");
const GUIDES = require("./guides");
const DI = require("./districts");
const PL = require("./places");
const SV = require("./services");
const AB = require("./about");
// German, French, Italian and Dutch: page texts, blog posts and legal texts in one file per language
["de", "fr", "it", "nl"].forEach(l => {
  const X = require("./lang/" + l);
  I[l] = X.ui;
  legal[l] = X.legal;
  POSTS.forEach(p => { p[l] = p[l] || X.blog[p.id]; });
});
// Turkish and Arabic: the same, plus their texts for every other page group and the zone and car names
["tr", "ar"].forEach(l => {
  const X = require("./lang/" + l);
  I[l] = { ...X.ui, dir: X.dir };
  legal[l] = X.legal;
  POSTS.forEach(p => { p[l] = X.blog[p.id]; });
  PORT[l] = X.port;
  CO.T[l] = X.company;
  DI.T[l] = X.districts.T;
  Object.keys(X.districts.Z).forEach(z => { DI.Z[z][l] = X.districts.Z[z]; });
  PL.T[l] = X.places.T;
  PL.L.forEach(x => { const y = X.places.L[x.id]; x.name[l] = y.name; x[l] = { about: y.about, sights: y.sights, tip: y.tip }; });
  SV.T[l] = X.services.T;
  SV.S.forEach(x => { x[l] = X.services.S[x.id]; });
  P.zones.forEach(z => Object.entries(X.zones[z.id] || {}).forEach(([k, v]) => { z[k][l] = v; }));
  P.cars.forEach(c => Object.entries(X.cars[c.id] || {}).forEach(([k, v]) => { c[k][l] = v; }));
  site.address[l] = X.site.address;
  if (X.site.meet) Object.keys(X.site.meet).forEach(a => { site.meet[a][l] = X.site.meet[a]; });
});

const OUT = path.join(__dirname, "..", "public");
const URL_ = (process.env.SITE_URL || site.url).replace(/\/$/, "");
const LANGS = ["en", "tr", "ru", "de", "fr", "it", "nl", "ar"];
// The same page in every language: { en: "/prices", ru: "/ru/ceny", ... }
const ALL = fn => Object.fromEntries(LANGS.map(l => [l, fn(l)]));
const AIRPORTS = P.zones.filter(z => z.type === "airport");
const PLACES = P.zones.filter(z => z.type !== "airport");
const CAR = id => P.cars.find(c => c.id === id);
const pages = [];

const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const fill = (t, v) => String(t).replace(/\{(\w+)\}/g, (m, k) => v[k] != null ? v[k] : m);
const minPrice = Math.min(...AIRPORTS.flatMap(a => PLACES.map(z => Q.base(P, a.id, z.id, "sedan")).filter(Boolean)));
// Highest one-way price of any route and car, for the price range in the structured data
const maxPrice = () => Math.max(...ROUTES.flatMap(([a, z]) => P.cars.map(c => Q.base(P, a, z, c.id)).filter(Boolean)));
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const dist = (a, b) => (P.dist[a] && P.dist[a][b]) || (P.dist[b] && P.dist[b][a]) || null;
const css = fs.readFileSync(path.join(OUT, "assets", "site.css"), "utf8");
const ver = require("crypto").createHash("md5").update(css + fs.readFileSync(path.join(OUT, "assets", "site.js"), "utf8") + fs.readFileSync(path.join(OUT, "assets", "timewheel.js"), "utf8")).digest("hex").slice(0, 8);

// Every page: same head, header and footer. alts = the same page in every language.
function layout(o) {
  const t = I[o.lang], alts = o.alts || ALL(l => I[l].paths.home);
  const ld = [{
    "@context": "https://schema.org", "@type": "TaxiService", "@id": URL_ + "/#service", name: site.brand, alternateName: "Istanbul Taxi Booking", url: URL_ + "/", logo: URL_ + "/img/icon-192.png", image: URL_ + "/img/og.png",
    telephone: site.phone, email: site.email, areaServed: { "@type": "City", name: "Istanbul" },
    hoursAvailable: { "@type": "OpeningHoursSpecification", dayOfWeek: DAYS, opens: "00:00", closes: "23:59" },
    offers: { "@type": "AggregateOffer", priceCurrency: P.currency, lowPrice: minPrice, highPrice: maxPrice(), offerCount: ROUTES.length * P.cars.length },
    provider: {
      "@type": "TravelAgency", "@id": URL_ + "/#company", name: site.company, alternateName: site.brand, foundingDate: site.founded, url: URL_ + "/", telephone: site.phone, email: site.email,
      address: { "@type": "PostalAddress", addressLocality: "Istanbul", addressCountry: "TR" }, areaServed: { "@type": "City", name: "Istanbul" },
      priceRange: `€${minPrice}–€${maxPrice()}`, openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: DAYS, opens: "00:00", closes: "23:59" },
      knowsLanguage: LANGS, identifier: { "@type": "PropertyValue", name: "TÜRSAB licence", value: site.tursab },
      ...(site.profiles && site.profiles.length ? { sameAs: site.profiles } : {})
    }
  }].concat(o.ld || []);
  const head = `<!doctype html><html lang="${t.htmlLang}"${t.dir ? ` dir="${t.dir}"` : ""}><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(o.title)}</title><meta name="description" content="${esc(o.desc)}">${site.googleVerification && o.path === I.en.paths.home ? `<meta name="google-site-verification" content="${esc(site.googleVerification)}">` : ""}${site.yandexVerification && o.path === I.en.paths.home ? `<meta name="yandex-verification" content="${esc(site.yandexVerification)}">` : ""}
<link rel="canonical" href="${URL_}${o.path === "/" ? "/" : o.path}">
${o.alts ? LANGS.map(l => `<link rel="alternate" hreflang="${l}" href="${URL_}${o.alts[l]}">`).join("") + `<link rel="alternate" hreflang="x-default" href="${URL_}${o.alts.en}">` : ""}
<meta property="og:type" content="website"><meta property="og:title" content="${esc(o.title)}"><meta property="og:description" content="${esc(o.desc)}"><meta property="og:url" content="${URL_}${o.path}"><meta property="og:image" content="${URL_}/img/og.png"><meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#000000"><link rel="icon" href="/img/favicon-32.png" sizes="32x32"><link rel="apple-touch-icon" href="/img/icon-192.png">
${o.noindex ? '<meta name="robots" content="noindex">' : ""}
<link rel="stylesheet" href="/assets/site.css?v=${ver}">
${ld.map(x => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join("\n")}
</head><body>`;
  const p = t.paths;
  const header = `<header class="top"><div class="wrap top-in">
<a class="logo" href="${p.home}"><img src="/img/logo.webp" alt="${esc(site.brand)} – Istanbul Taxi Booking" width="92" height="52"></a>
<nav class="nav"><a href="${p.prices}">${t.nav.prices}</a><a href="${p.home}#fleet">${t.nav.fleet}</a><a href="${p.home}#how">${t.nav.how}</a><a href="${p.home}#faq">${t.nav.faq}</a><a href="${p.blog}">${t.nav.blog}</a>
${langSwitch(o.lang, alts)}</nav>
<a class="btn btn-y btn-sm" href="${p.book}">${t.nav.book}</a></div></header>`;
  const popular = [["IST", "sultanahmet"], ["IST", "taksim"], ["IST", "kadikoy"], ["SAW", "taksim"], ["SAW", "kadikoy"], ["SAW", "sultanahmet"]];
  const footer = `<footer class="foot"><div class="wrap foot-in">
<div><a class="logo" href="${p.home}"><img src="/img/logo.webp" alt="${esc(site.brand)}" width="141" height="80" loading="lazy"></a>
<p><bdi>${esc(site.company)}</bdi><br>${esc(site.address[o.lang])}<br>${t.footer.tursab}: ${esc(site.tursab)}</p></div>
<div><h3>${t.footer.routes}</h3>${popular.map(([a, z]) => `<a href="${p.route(a, Q.zone(P, z).slug)}">${esc(Q.zone(P, a).short[o.lang])} → ${esc(Q.zone(P, z).short[o.lang])}</a>`).join("")}<a href="${PORT[o.lang].path}">${esc(Q.zone(P, "galataport").name[o.lang])}</a>${o.lang === "en" ? GUIDES.map(g => `<a href="${g.path}">${esc(g.nav)}</a>`).join("") : ""}</div>
<div><h3>${SV.T[o.lang].head}</h3>${SV.S.map(x => `<a href="${x[o.lang].path}">${esc(x[o.lang].nav)}</a>`).join("")}</div>
<div><h3>${CO.T[o.lang].head}</h3><a href="${AB[o.lang].path}">${esc(AB[o.lang].nav)}</a>${CO.ORDER.map(k => `<a href="${CO.path(o.lang, k)}">${CO.T[o.lang].pages[k].nav}</a>`).join("")}</div>
<div><h3>${t.footer.contact}</h3><a href="https://wa.me/${site.whatsapp}" rel="noopener">WhatsApp <bdi dir="ltr">${esc(site.phone)}</bdi></a><a href="tel:${site.phone.replace(/\s/g, "")}"><bdi dir="ltr">${esc(site.phone)}</bdi></a><a href="mailto:${site.email}">${esc(site.email)}</a></div>
<div><h3>${t.footer.legal}</h3><a href="${p.terms}">${t.ui.terms}</a><a href="${p.privacy}">${t.ui.privacy}</a><a href="${p.prices}">${t.nav.prices}</a><a href="${p.blog}">${t.nav.blog}</a></div>
</div><div class="wrap copy">© ${new Date().getFullYear()} ${esc(site.brand)}. ${t.footer.rights}</div></footer>
<a class="wa-float" href="https://wa.me/${site.whatsapp}" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg></a>
<script>window.SITE=${JSON.stringify({ lang: o.lang, book: p.book, wa: site.whatsapp })};</script>
${o.scripts || ""}<script src="/assets/timewheel.js?v=${ver}" defer></script><script src="/assets/site.js?v=${ver}" defer></script></body></html>`;
  const html = head + header + "<main>" + o.body + "</main>" + footer;
  // right-to-left pages: arrows point the reading direction
  return t.dir === "rtl" ? html.replace(/→/g, "←") : html;
}

function write(p, html) {
  const file = p === "/" ? "index.html" : p.replace(/^\//, "") + ".html";
  const f = path.join(OUT, file);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html);
}
function page(o) {
  write(o.path, layout(o));
  if (!o.noindex) pages.push({ path: o.path, alts: o.alts, lang: o.lang });
}

// Language menu in the header: the current language's flag, opening a list of all eight
const FLAGS = {
  en: '<svg viewBox="0 0 60 30" width="22" height="11" aria-hidden="true"><clipPath id="fe"><path d="M0 0h60v30H0z"/></clipPath><clipPath id="ft"><path d="M30 15h30v15zv15H0zH0V0zV0h30z"/></clipPath><g clip-path="url(#fe)"><path d="M0 0v30h60V0z" fill="#012169"/><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0l60 30m0-30L0 30" clip-path="url(#ft)" stroke="#C8102E" stroke-width="4"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/></g></svg>',
  ru: '<svg viewBox="0 0 9 6" width="17" height="11" aria-hidden="true"><path fill="#fff" d="M0 0h9v2H0z"/><path fill="#0039A6" d="M0 2h9v2H0z"/><path fill="#D52B1E" d="M0 4h9v2H0z"/></svg>',
  de: '<svg viewBox="0 0 5 3" width="17" height="11" aria-hidden="true"><path d="M0 0h5v1H0z"/><path fill="#D00" d="M0 1h5v1H0z"/><path fill="#FFCE00" d="M0 2h5v1H0z"/></svg>',
  fr: '<svg viewBox="0 0 3 2" width="17" height="11" aria-hidden="true"><path fill="#002654" d="M0 0h1v2H0z"/><path fill="#fff" d="M1 0h1v2H1z"/><path fill="#CE1126" d="M2 0h1v2H2z"/></svg>',
  it: '<svg viewBox="0 0 3 2" width="17" height="11" aria-hidden="true"><path fill="#009246" d="M0 0h1v2H0z"/><path fill="#fff" d="M1 0h1v2H1z"/><path fill="#CE2B37" d="M2 0h1v2H2z"/></svg>',
  nl: '<svg viewBox="0 0 9 6" width="17" height="11" aria-hidden="true"><path fill="#AE1C28" d="M0 0h9v2H0z"/><path fill="#fff" d="M0 2h9v2H0z"/><path fill="#21468B" d="M0 4h9v2H0z"/></svg>',
  tr: '<svg viewBox="0 0 30 20" width="17" height="11" aria-hidden="true"><path fill="#E30A17" d="M0 0h30v20H0z"/><circle cx="10.5" cy="10" r="5" fill="#fff"/><circle cx="11.75" cy="10" r="4" fill="#E30A17"/><polygon fill="#fff" points="14.00,10.00 15.75,9.38 15.80,7.53 16.92,9.00 18.70,8.47 17.65,10.00 18.70,11.53 16.92,11.00 15.80,12.47 15.75,10.62"/></svg>',
  ar: '<svg viewBox="0 0 30 20" width="17" height="11" aria-hidden="true"><path fill="#00732F" d="M0 0h30v20H0z"/><text x="15" y="12.5" font-size="7" fill="#fff" text-anchor="middle" font-family="sans-serif">ع</text></svg>'
};
const LANG_NAME = { en: "English", tr: "Türkçe", ar: "العربية", ru: "Русский", de: "Deutsch", fr: "Français", it: "Italiano", nl: "Nederlands" };
function langSwitch(lang, alts) {
  return `<details class="langs"><summary aria-label="${LANG_NAME[lang]}">${FLAGS[lang]}${lang.toUpperCase()}</summary><div class="langs-menu">${LANGS.map(l => l === lang
    ? `<span class="on" aria-current="true">${FLAGS[l]}${LANG_NAME[l]}</span>`
    : `<a class="lang" href="${alts[l]}" hreflang="${l}" lang="${l}">${FLAGS[l]}${LANG_NAME[l]}</a>`).join("")}</div></details>`;
}

// The search box: from, to, date, time, passengers, optional return. Sends to the booking page.
function searchForm(lang, pre, side) {
  const t = I[lang].form;
  pre = pre || {};
  const opts = sel => `<option value="">${t.choose}</option>
<optgroup label="${t.airports}">${AIRPORTS.map(z => `<option value="${z.id}"${sel === z.id ? " selected" : ""}>${esc(z.name[lang])}</option>`).join("")}</optgroup>
<optgroup label="${t.districts}">${PLACES.filter(z => z.type === "district").map(z => `<option value="${z.id}"${sel === z.id ? " selected" : ""}>${esc(z.name[lang])}</option>`).join("")}</optgroup>
<optgroup label="${t.port}">${PLACES.filter(z => z.type === "port").map(z => `<option value="${z.id}"${sel === z.id ? " selected" : ""}>${esc(z.name[lang])}</option>`).join("")}</optgroup>`;
  return `<form class="search${side ? "" : " wide"}" action="${I[lang].paths.book}" method="get" data-search>
<h2 class="search-h">${t.title}</h2>
<div class="row2"><label>${t.from}<select name="from" required>${opts(pre.from)}</select></label>
<button type="button" class="swap" data-swap aria-label="${t.swap}" title="${t.swap}">⇅</button>
<label>${t.to}<select name="to" required>${opts(pre.to)}</select></label></div>
<div class="row3"><label>${t.date}<input type="date" name="date" required></label><label>${t.time}<select name="time" class="tsel" required>${TIMES}</select></label>
<label>${t.pax}<select name="pax">${Array.from({ length: 16 }, (_, i) => `<option${i === 1 ? " selected" : ""}>${i + 1}</option>`).join("")}</select></label></div>
<label class="check"><input type="checkbox" name="ret" value="1" data-ret> ${t.ret}</label>
<div class="row2 ret" hidden><label>${t.rdate}<input type="date" name="rdate"></label><label>${t.rtime}<select name="rtime" class="tsel">${TIMES}</select></label></div>
<button class="btn btn-y btn-block" type="submit">${t.submit}</button></form>`;
}

// Pickup times every 15 minutes, 24-hour clock; timewheel.js puts the wheel over these selects
const TIMES = Array.from({ length: 96 }, (_, i) => { const v = String(i >> 2).padStart(2, "0") + ":" + String(i % 4 * 15).padStart(2, "0"); return `<option${v === "12:00" ? " selected" : ""}>${v}</option>`; }).join("");

const ICONS = {
  price: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  cancel: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4M9.5 13.5l5 5M14.5 13.5l-5 5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  shield: '<path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>'
};
// Four promises under the booking box
function assure(lang) {
  return `<ul class="assure">${I[lang].assure.map(([k, h, p]) => `<li><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[k]}</svg><div><strong>${h}</strong><span>${p}</span></div></li>`).join("")}</ul>`;
}

// noPrice: the cars only, for the service pages, whose prices are on request
function fleet(lang, from, to, noPrice) {
  const t = I[lang];
  return `<div class="fleet">${P.cars.map(c => {
    const pr = from ? Q.base(P, from, to, c.id) : Math.min(...AIRPORTS.flatMap(a => PLACES.map(z => Q.base(P, a.id, z.id, c.id)).filter(Boolean)));
    return `<article class="car${c.popular ? " pop" : ""}"><img src="${c.img}" alt="${esc(c.name[lang])} – ${esc(c.models[lang])}" width="320" height="160" loading="lazy">
<h3>${esc(c.name[lang])}</h3><p class="models">${esc(c.models[lang])}</p>
<p class="cap"><span>👤 ${c.seats}</span><span>🧳 ${c.bags}</span></p><p class="note">${esc(c.note[lang])}</p>
${noPrice ? "" : `<p class="from">${from ? "" : t.ui.from}<strong>€${pr}</strong> <span>${t.book.perCar}</span></p>`}</article>`;
  }).join("")}</div>`;
}

function faqBlock(items) {
  return `<div class="faq">${items.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${a}</p></details>`).join("")}</div>`;
}
const postPath = (lang, post) => I[lang].paths.blog + "/" + post[lang].slug;
// max: show only the newest ones (home page, other posts)
function blogCards(lang, skip, max) {
  return `<div class="posts">${POSTS.filter(x => x.id !== skip).slice(0, max || POSTS.length).map(x => `<a class="post-c" href="${postPath(lang, x)}"><h3>${esc(x[lang].title)}</h3><p>${esc(fill(x[lang].lead, { brand: site.brand }))}</p><span class="more">${I[lang].blog.read} →</span></a>`).join("")}</div>`;
}
// The booking box as it sits inside a blog post
const blogWidget = lang => `<aside class="blog-widget"><h2>${I[lang].blog.widgetH}</h2>${searchForm(lang)}${assure(lang)}</aside>`;

function blogIndex(lang) {
  const t = I[lang], b = t.blog;
  const body = `<section class="hero hero-s"><div class="wrap hero-in"><div class="hero-t"><h1>${b.h1}</h1><p class="lead">${b.lead}</p></div>${searchForm(lang)}${assure(lang)}</div></section>
<section class="sec ice"><div class="wrap">${blogCards(lang)}</div></section>`;
  page({ lang, path: t.paths.blog, alts: ALL(l => I[l].paths.blog), title: b.title, desc: b.desc, body });
}

function blogPost(lang, post) {
  const t = I[lang], x = post[lang], v = { brand: site.brand };
  const p = postPath(lang, post);
  const body = `<section class="hero hero-s"><div class="wrap"><div class="hero-t"><nav class="crumbs"><a href="${t.paths.home}">${esc(site.brand)}</a> › <a href="${t.paths.blog}">${t.nav.blog}</a></nav>
<h1>${esc(x.title)}</h1><p class="lead">${esc(fill(x.lead, v))}</p><p class="small" style="color:var(--ice-ink)">${t.blog.updated}: ${post.date}</p></div></div></section>
<article class="sec"><div class="wrap narrow prose">${fill(x.body, v).replace(/\{widget\}/g, blogWidget(lang))}</div></article>
<section class="sec ice"><div class="wrap"><h2>${t.blog.more}</h2>${blogCards(lang, post.id, 4)}</div></section>`;
  const ld = { "@context": "https://schema.org", "@type": "BlogPosting", headline: x.title, description: x.desc, datePublished: post.date, dateModified: post.date, inLanguage: lang, mainEntityOfPage: URL_ + p, author: { "@type": "Organization", name: site.brand }, publisher: { "@id": URL_ + "/#service" }, image: URL_ + "/img/og.png" };
  page({ lang, path: p, alts: ALL(l => postPath(l, post)), title: x.title, desc: x.desc, body, ld: [ld, crumbs([[site.brand, t.paths.home], [t.nav.blog, t.paths.blog], [x.title, p]])] });
}

const faqLd = items => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a.replace(/<[^>]+>/g, "") } })) });
const crumbs = list => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: list.map(([name, p], i) => ({ "@type": "ListItem", position: i + 1, name, item: URL_ + p })) });

function meetCards(lang, only) {
  return `<div class="meet">${AIRPORTS.filter(a => !only || a.id === only).map(a => `<div class="meet-c"><h3>${esc(a.name[lang])}</h3><p>${esc(site.meet[a.id][lang])}</p></div>`).join("")}</div>`;
}

// Route list: airport → every other place, IST ↔ SAW once, and Galataport → the central districts it
// has a page for (Galataport ↔ the airports are the airports' "to Galataport" pages)
const ROUTES = [];
AIRPORTS.forEach(a => PLACES.forEach(z => ROUTES.push([a.id, z.id])));
ROUTES.push(["IST", "SAW"]);
const PORT_TO = ["taksim", "sultanahmet"];
PORT_TO.forEach(z => ROUTES.push(["galataport", z]));
const isPort = id => id === "galataport";
const routePath = (lang, a, z) => isPort(a) ? PORT[lang].route(Q.zone(P, z).slug) : z === "SAW" ? I[lang].paths.airportPair : I[lang].paths.route(a, Q.zone(P, z).slug);
const hubPath = (lang, a) => isPort(a) ? PORT[lang].path : I[lang].paths[a];
// Everything the Galataport page lists, as [route, destination]: the airports first, then the districts
const portList = () => AIRPORTS.map(a => [[a.id, "galataport"], a.id]).concat(PORT_TO.map(z => [["galataport", z], z]));

function home(lang) {
  const t = I[lang], h = t.home;
  const faq = t.faq.map(([q, a]) => [fill(q, { brand: site.brand }), fill(a, { brand: site.brand })]);
  const popular = ROUTES.filter(([a, z]) => ["sultanahmet", "taksim", "besiktas", "kadikoy", "sisli", "SAW"].includes(z));
  const body = `<section class="hero hero-home"><div class="wrap hero-in"><div class="hero-t">
<h1>${h.h1}</h1><p class="lead">${fill(h.lead, { min: minPrice, brand: site.brand })}</p></div>

${searchForm(lang)}${assure(lang)}</div></section>
<section class="sec ice" id="fleet"><div class="wrap"><h2>${h.fleetH}</h2><p class="sub">${h.fleetLead}</p>${fleet(lang)}</div></section>
<section class="sec"><div class="wrap"><h2>${h.routesH}</h2><p class="sub">${h.routesLead}</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>${t.ui.route}</th>${P.cars.map(c => `<th>${esc(c.name[lang])}</th>`).join("")}</tr></thead><tbody>
${popular.map(([a, z]) => `<tr><td><a href="${routePath(lang, a, z)}">${esc(Q.zone(P, a).short[lang])} → ${esc(Q.zone(P, z).short[lang])}</a></td>${P.cars.map(c => `<td>€${Q.base(P, a, z, c.id)}</td>`).join("")}</tr>`).join("")}
</tbody></table></div><p><a class="more" href="${t.paths.prices}">${t.nav.prices} →</a></p></div></section>
<section class="sec dark"><div class="wrap"><h2>${h.vsH}</h2><div class="tbl-wrap"><table class="tbl vs"><thead><tr>${h.vsCols.map(c => `<th>${esc(fill(c, { brand: site.brand }))}</th>`).join("")}</tr></thead>
<tbody>${h.vs.map(r => `<tr><th scope="row">${r[0]}</th><td>${r[1]}</td><td class="ok">${r[2]}</td></tr>`).join("")}</tbody></table></div></div></section>
<section class="sec" id="how"><div class="wrap"><h2>${h.howH}</h2><ol class="how">${h.how.map(([a, b]) => `<li><h3>${a}</h3><p>${b}</p></li>`).join("")}</ol></div></section>
<section class="sec ice"><div class="wrap"><h2>${h.meetH}</h2>${meetCards(lang)}</div></section>
<section class="sec ice"><div class="wrap"><h2>${t.blog.latest}</h2>${blogCards(lang, null, 4)}<p><a class="more" href="${t.paths.blog}">${t.blog.more} →</a></p></div></section>
<section class="sec" id="faq"><div class="wrap narrow"><h2>${h.faqH}</h2>${faqBlock(faq)}</div></section>
<section class="cta"><div class="wrap"><h2>${h.ctaH}</h2><p>${h.ctaP}</p><a class="btn btn-k" href="${t.paths.book}">${t.nav.book}</a></div></section>`;
  page({ lang, path: t.paths.home, alts: ALL(l => I[l].paths.home), title: fill(h.title, { min: minPrice, brand: site.brand }), desc: fill(h.desc, { min: minPrice, brand: site.brand }), body, ld: [faqLd(faq)] });
}

function route(lang, a, z) {
  const t = I[lang], r = t.route;
  const A = Q.zone(P, a), Z = Q.zone(P, z), d = dist(a, z);
  const v = {
    from: A.short[lang], to: Z.short[lang], fromLong: A.name[lang], toLong: Z.name[lang], brand: site.brand,
    price: Q.base(P, a, z, "sedan"), van: Q.base(P, a, z, "minivan"), vclass: Q.base(P, a, z, "vclass"), bus: Q.base(P, a, z, "minibus"),
    km: d ? d[0] : "", min: d ? d[1] : ""
  };
  const port = isPort(a) && PORT[lang];
  const faq = (port ? r.faq.slice(0, 2).concat([port.late]) : r.faq).filter((x, i) => d || i !== r.faqNoDist).map(([q, ans]) => [fill(q, v), fill(ans, v)]);
  const p = routePath(lang, a, z);
  // other routes from the same place: [href, destination, price]
  const others = port ? portList().filter(([, y]) => y !== z).map(([[x, y], to]) => [routePath(lang, x, y), to, Q.base(P, x, y, "sedan")])
    : ROUTES.filter(([x, y]) => x === a && y !== z).slice(0, 14).map(([x, y]) => [routePath(lang, x, y), y, Q.base(P, x, y, "sedan")]);
  const body = `<section class="hero hero-s"><div class="wrap hero-in"><div class="hero-t">
<nav class="crumbs"><a href="${t.paths.home}">${esc(site.brand)}</a> › <a href="${hubPath(lang, a)}">${esc(A.short[lang])}</a></nav>
<h1>${esc(fill(r.h1, v))}</h1><p class="lead answer">${fill(d ? r.answer : r.answerNoDist, v)}</p>
${d ? `<ul class="facts"><li><strong>${d[0]} km</strong></li><li><strong>~${d[1]} ${t.ui.min}</strong></li><li><strong>€${v.price}</strong> ${t.book.perCar}</li></ul>` : ""}</div>
${searchForm(lang, { from: a, to: z })}${assure(lang)}</div></section>
<section class="sec ice"><div class="wrap"><h2>${esc(fill(r.pricesH, v))}</h2>${fleet(lang, a, z)}
<p class="sub small">${t.home.routesLead}</p></div></section>
${about(lang, z)}
<section class="sec ice"><div class="wrap"><h2>${port ? port.meetH : r.meetH}</h2>${port ? portMeet(lang) : meetCards(lang, a === "SAW" ? "SAW" : "IST")}</div></section>
<section class="sec"><div class="wrap narrow"><h2>${t.home.faqH}</h2>${faqBlock(faq)}</div></section>
<section class="sec ice"><div class="wrap"><h2>${esc(fill(r.otherH, v))}</h2><div class="chips">${others.map(([href, y, price]) => `<a href="${href}">${esc(Q.zone(P, y).short[lang])} <b>€${price}</b></a>`).join("")}</div>
<p><a class="more" href="${hubPath(lang, a)}">${esc(fill(r.back, v))} →</a></p></div></section>`;
  const offer = {
    "@context": "https://schema.org", "@type": "Service", serviceType: port ? PORT.en.service : "Airport taxi", name: fill(r.h1, v), provider: { "@id": URL_ + "/#service" },
    areaServed: "Istanbul", offers: P.cars.map(c => ({ "@type": "Offer", name: c.name[lang], price: Q.base(P, a, z, c.id), priceCurrency: P.currency, eligibleQuantity: { "@type": "QuantitativeValue", maxValue: c.seats, unitText: "passengers" } }))
  };
  page({
    lang, path: p, alts: ALL(l => routePath(l, a, z)), title: fill(r.title, v), desc: fill(port ? port.desc : d ? r.desc : r.desc.replace(/,? ?\{km\}[^.]*\./, "."), v), body,
    ld: [offer, faqLd(faq), crumbs([[site.brand, t.paths.home], [A.short[lang], hubPath(lang, a)], [fill(r.h1, v), p]])]
  });
}

// "About Taksim" on a route page: what the place is like, sights, the driver's tip, the areas at this price and
// how far each airport is (build/districts.js)
function about(lang, z) {
  const Z = Q.zone(P, z), D = DI.Z[z] && DI.Z[z][lang], T = DI.T[lang];
  if (!D) return Z.area ? `<section class="sec"><div class="wrap narrow"><h2>${I[lang].route.areaH}</h2><p>${esc(Z.area[lang])}</p></div></section>` : "";
  const far = AIRPORTS.map(a => [a, dist(a.id, z)]).filter(([, d]) => d).sort((x, y) => x[1][0] - y[1][0]);
  const row = (k, v) => `<li><strong>${esc(k)}:</strong> ${v}</li>`;
  return `<section class="sec"><div class="wrap narrow prose"><h2>${esc(fill(T.aboutH, { to: Z.short[lang] }))}</h2><p>${esc(D.about)}</p><ul>
${row(T.sights, esc(D.sights.join(", ")))}
${Z.area ? row(T.areas, esc(Z.area[lang])) : ""}
${far.length > 1 ? row(T.closer, far.map(([a, d]) => `${esc(a.short[lang])} (${fill(T.km, { km: d[0], min: d[1] })})`).join(" · ")) : ""}
${row(T.tip, esc(D.tip))}
${PL.L.some(x => x.zone === z) ? row(PL.T[lang].more, PL.L.filter(x => x.zone === z).map(x => `<a href="${PL.T[lang].path(x.id)}">${esc(x.name[lang])}</a>`).join(", ")) : ""}</ul></div></section>`;
}

// Neighbourhood page: a well-known place inside a price zone, with both airports' prices (build/places.js)
function place(lang, pl) {
  const t = I[lang], T = PL.T[lang], D = pl[lang], z = pl.zone, Z = Q.zone(P, z);
  const di = a => dist(a, z) || ["", ""];
  const v = {
    place: pl.name[lang], zone: Z.short[lang], brand: site.brand, ist: Q.base(P, "IST", z, "sedan"), saw: Q.base(P, "SAW", z, "sedan"),
    van: Q.base(P, "IST", z, "minivan"), vclass: Q.base(P, "IST", z, "vclass"), istKm: di("IST")[0], istMin: di("IST")[1], sawKm: di("SAW")[0], sawMin: di("SAW")[1]
  };
  v.min = Math.min(v.ist, v.saw);
  const F = x => fill(x, v), p = T.path(pl.id);
  const faq = T.faq.map(([q, a]) => [F(q), F(a)]);
  const body = `<section class="hero hero-s"><div class="wrap hero-in"><div class="hero-t"><nav class="crumbs"><a href="${t.paths.home}">${esc(site.brand)}</a> › <a href="${t.paths.prices}">${t.nav.prices}</a></nav>
<h1>${esc(F(T.h1))}</h1><p class="lead answer">${F(T.lead)}</p></div>${searchForm(lang, { from: "IST", to: z })}${assure(lang)}</div></section>
<section class="sec ice"><div class="wrap"><h2>${esc(F(T.pricesH))}</h2><div class="tbl-wrap"><table class="tbl"><thead><tr><th>${T.from}</th>${P.cars.map(c => `<th>${esc(c.name[lang])}</th>`).join("")}<th>km</th></tr></thead><tbody>
${AIRPORTS.map(a => `<tr><td><a href="${routePath(lang, a.id, z)}">${esc(a.name[lang])}</a></td>${P.cars.map(c => `<td>€${Q.base(P, a.id, z, c.id)}</td>`).join("")}<td>${di(a.id)[0]}</td></tr>`).join("")}
</tbody></table></div><p class="sub small">${t.home.routesLead}</p></div></section>
<section class="sec"><div class="wrap narrow prose"><h2>${esc(F(T.aboutH))}</h2><p>${esc(D.about)}</p><ul>
<li><strong>${esc(T.sights)}:</strong> ${esc(D.sights.join(", "))}</li><li><strong>${esc(T.zone)}:</strong> <a href="${routePath(lang, "IST", z)}">${esc(Z.name[lang])}</a></li><li><strong>${esc(T.tip)}:</strong> ${esc(D.tip)}</li></ul></div></section>
<section class="sec ice"><div class="wrap"><h2>${t.route.meetH}</h2>${meetCards(lang)}</div></section>
<section class="sec"><div class="wrap narrow"><h2>${t.home.faqH}</h2>${faqBlock(faq)}</div></section>
<section class="sec ice"><div class="wrap"><h2>${esc(T.more)}</h2><div class="chips">${PL.L.filter(x => x.id !== pl.id).map(x => `<a href="${T.path(x.id)}">${esc(x.name[lang])} <b>€${Math.min(Q.base(P, "IST", x.zone, "sedan"), Q.base(P, "SAW", x.zone, "sedan"))}</b></a>`).join("")}</div></div></section>`;
  const offer = {
    "@context": "https://schema.org", "@type": "Service", serviceType: "Airport taxi", name: F(T.h1), provider: { "@id": URL_ + "/#service" },
    areaServed: { "@type": "Place", name: pl.name.en + ", Istanbul" },
    offers: AIRPORTS.flatMap(a => P.cars.map(c => ({ "@type": "Offer", name: `${a.short[lang]} → ${pl.name[lang]} · ${c.name[lang]}`, price: Q.base(P, a.id, z, c.id), priceCurrency: P.currency })))
  };
  page({ lang, path: p, alts: ALL(l => PL.T[l].path(pl.id)), title: F(T.title), desc: F(T.desc), body, ld: [offer, faqLd(faq), crumbs([[site.brand, t.paths.home], [t.nav.prices, t.paths.prices], [F(T.h1), p]])] });
}

// Service page (build/services.js): chauffeur by the hour, city tour, wedding and event cars. Priced on request on WhatsApp.
function service(lang, sv) {
  const t = I[lang], T = SV.T[lang], x = sv[lang];
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(fill(T.waText, { service: x.nav }))}`;
  const cta = `<p class="cta-row"><a class="btn btn-y" href="${wa}" rel="noopener">${esc(T.ask)}</a> <span class="small">${esc(T.call)} <a href="tel:${site.phone.replace(/\s/g, "")}"><bdi dir="ltr">${esc(site.phone)}</bdi></a></span></p>`;
  const corp = sv.id === "wedding" ? ` <a href="${CO.path(lang, "corporate")}">${esc(CO.T[lang].pages.corporate.nav)}</a>` : "";
  const faq = x.faq.map(([q, a], i) => [q, a + (i === x.faq.length - 1 ? corp : "")]);
  const body = `<section class="hero hero-s"><div class="wrap"><div class="hero-t"><nav class="crumbs"><a href="${t.paths.home}">${esc(site.brand)}</a> › ${esc(T.head)}</nav>
<h1>${esc(x.h1)}</h1><p class="lead answer">${esc(x.lead)}</p>${cta}</div></div></section>
<section class="sec ice"><div class="wrap narrow prose"><h2>${esc(T.whatH)}</h2><ul>${x.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul></div></section>
<section class="sec" id="how"><div class="wrap"><h2>${esc(T.howH)}</h2><ol class="how">${x.how.map(([a, b]) => `<li><h3>${esc(a)}</h3><p>${esc(b)}</p></li>`).join("")}</ol>${cta}</div></section>
<section class="sec ice"><div class="wrap"><h2>${esc(T.cars)}</h2>${fleet(lang, null, null, true)}</div></section>
<section class="sec"><div class="wrap narrow"><h2>${t.home.faqH}</h2>${faqBlock(faq)}</div></section>
<section class="sec ice"><div class="wrap"><h2>${esc(T.head)}</h2><div class="chips">${SV.S.filter(y => y.id !== sv.id).map(y => `<a href="${y[lang].path}">${esc(y[lang].nav)}</a>`).join("")}<a href="${t.paths.IST}">${esc(Q.zone(P, "IST").short[lang])}</a><a href="${t.paths.SAW}">${esc(Q.zone(P, "SAW").short[lang])}</a></div></div></section>`;
  const ld = { "@context": "https://schema.org", "@type": "Service", serviceType: sv.en.nav, name: x.h1, description: x.desc, provider: { "@id": URL_ + "/#service" }, areaServed: { "@type": "City", name: "Istanbul" } };
  page({ lang, path: x.path, alts: ALL(l => sv[l].path), title: x.title, desc: x.desc, body, ld: [ld, faqLd(faq), crumbs([[site.brand, t.paths.home], [x.h1, x.path]])] });
}

function hub(lang, a) {
  const t = I[lang], hb = t.hub, A = Q.zone(P, a);
  const list = ROUTES.filter(([x]) => x === a).concat(a === "SAW" ? [["SAW", "IST"]] : []);
  const v = { from: A.short[lang], fromLong: A.name[lang], brand: site.brand, price: Math.min(...list.map(([x, y]) => Q.base(P, x, y, "sedan"))) };
  const body = `<section class="hero hero-s"><div class="wrap hero-in"><div class="hero-t"><h1>${esc(fill(hb.h1, v))}</h1><p class="lead">${esc(fill(hb.lead, v))}</p></div>${searchForm(lang, { from: a })}${assure(lang)}</div></section>
<section class="sec"><div class="wrap"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>${t.prices.to}</th>${P.cars.map(c => `<th>${esc(c.name[lang])}</th>`).join("")}<th>km</th></tr></thead><tbody>
${list.map(([x, y]) => { const d = dist(x, y), href = y === "IST" || y === "SAW" ? t.paths.airportPair : routePath(lang, x, y); return `<tr><td><a href="${href}">${esc(Q.zone(P, y).name[lang])}</a></td>${P.cars.map(c => `<td>€${Q.base(P, x, y, c.id)}</td>`).join("")}<td>${d ? d[0] : ""}</td></tr>`; }).join("")}
</tbody></table></div><p class="sub small">${t.home.routesLead}</p></div></section>
<section class="sec ice"><div class="wrap"><h2>${t.route.meetH}</h2>${meetCards(lang, a)}</div></section>`;
  page({ lang, path: t.paths[a], alts: ALL(l => I[l].paths[a]), title: fill(hb.title, v), desc: fill(hb.desc, v), body, ld: [crumbs([[site.brand, t.paths.home], [A.short[lang], t.paths[a]]])] });
}

const portMeet = lang => `<div class="meet"><div class="meet-c"><h3>${esc(Q.zone(P, "galataport").name[lang])}</h3><p>${esc(PORT[lang].meet)}</p></div></div>`;

// Galataport's price page: the airports and the districts it has route pages for
function portHub(lang) {
  const t = I[lang], X = PORT[lang], A = Q.zone(P, "galataport"), list = portList();
  const v = { from: A.short[lang], fromLong: A.name[lang], brand: site.brand, price: Math.min(...list.map(([[x, y]]) => Q.base(P, x, y, "sedan"))) };
  const body = `<section class="hero hero-s"><div class="wrap hero-in"><div class="hero-t"><nav class="crumbs"><a href="${t.paths.home}">${esc(site.brand)}</a></nav><h1>${esc(X.hub.h1)}</h1><p class="lead">${esc(fill(X.hub.lead, v))}</p></div>${searchForm(lang, { from: "galataport" })}${assure(lang)}</div></section>
<section class="sec"><div class="wrap"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>${t.prices.to}</th>${P.cars.map(c => `<th>${esc(c.name[lang])}</th>`).join("")}<th>km</th></tr></thead><tbody>
${list.map(([[x, y], to]) => { const d = dist(x, y); return `<tr><td><a href="${routePath(lang, x, y)}">${esc(Q.zone(P, to).name[lang])}</a></td>${P.cars.map(c => `<td>€${Q.base(P, x, y, c.id)}</td>`).join("")}<td>${d ? d[0] : ""}</td></tr>`; }).join("")}
</tbody></table></div><p class="sub small">${t.home.routesLead}</p></div></section>
<section class="sec ice"><div class="wrap"><h2>${X.meetH}</h2>${portMeet(lang)}</div></section>`;
  page({ lang, path: X.path, alts: ALL(l => PORT[l].path), title: fill(X.hub.title, v), desc: fill(X.hub.desc, v), body, ld: [crumbs([[site.brand, t.paths.home], [A.short[lang], X.path]])] });
}

// Company pages: what we offer the group, and its application form (sent to api/apply.js, panel: Başvurular)
function companyPage(lang, kind) {
  const C = CO.T[lang], x = C.pages[kind];
  const field = ([name, type, req, opts]) => {
    const label = C.labels[name] + (req ? " *" : ""), full = type === "textarea" || type === "checks";
    const input = type === "textarea" ? `<textarea name="${name}" rows="4"></textarea>`
      : type === "select" ? `<select name="${name}"${req ? " required" : ""}><option value="">–</option>${opts.map(v => `<option value="${v}">${esc(C.opts[v])}</option>`).join("")}</select>`
      : type === "checks" ? `<span class="checks">${opts.map(v => `<label class="check"><input type="checkbox" name="${name}" value="${v}"> <span>${esc(C.opts[v])}</span></label>`).join("")}</span>`
      : `<input name="${name}" type="${type}"${type === "number" ? ' min="0" max="9999"' : ""}${req ? " required" : ""}>`;
    return type === "checks" ? `<fieldset class="full"><legend>${esc(label)}</legend>${input}</fieldset>` : `<label${full ? ' class="full"' : ""}>${esc(label)}${input}</label>`;
  };
  const body = `<section class="hero hero-s"><div class="wrap"><div class="hero-t"><nav class="crumbs"><a href="${I[lang].paths.home}">${esc(site.brand)}</a> › ${esc(C.head)}</nav>
<h1>${esc(x.h1)}</h1><p class="lead">${esc(x.lead)}</p></div></div></section>
<section class="sec"><div class="wrap co-in"><ul class="co-pts">${x.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul>
<form class="form co-form" data-apply="${kind}" data-ok="${esc(C.ok)}" data-err="${esc(C.err)}" data-req="${esc(C.req)}" novalidate>
${CO.FORMS[kind].map(field).join("\n")}
<input class="hp" name="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
<div class="full" data-msg></div><div class="full"><button class="btn btn-y" type="submit">${esc(C.send)}</button></div></form></div></section>
<section class="sec ice"><div class="wrap"><h2>${esc(C.head)}</h2><div class="chips">${CO.ORDER.filter(k => k !== kind).map(k => `<a href="${CO.path(lang, k)}">${esc(C.pages[k].nav)}</a>`).join("")}</div></div></section>`;
  page({ lang, path: CO.path(lang, kind), alts: ALL(l => CO.path(l, kind)), title: fill(x.title, { brand: site.brand }), desc: x.desc, body,
    ld: [crumbs([[site.brand, I[lang].paths.home], [x.h1, CO.path(lang, kind)]])] });
}

// About us: why the company was started, what it stands for, and the facts a guest can check
function aboutPage(lang) {
  const t = I[lang], x = AB[lang], F = s => fill(s, { brand: site.brand, company: site.company, tursab: site.tursab }), f = x.facts;
  const facts = [[f.company, `<bdi>${esc(site.company)}</bdi>`], [f.licence, esc(site.tursab)], [f.founded, esc(f.foundedOn)], [f.area, esc(f.areaText)], [f.hours, esc(f.hoursText)]];
  const body = `<section class="hero hero-s"><div class="wrap"><div class="hero-t"><nav class="crumbs"><a href="${t.paths.home}">${esc(site.brand)}</a> › ${esc(CO.T[lang].head)}</nav>
<h1>${esc(F(x.h1))}</h1><p class="lead answer">${esc(F(x.lead))}</p></div></div></section>
<section class="sec"><div class="wrap narrow prose"><h2>${esc(x.storyH)}</h2>${x.story.map(p => `<p>${fill(esc(p), { brand: esc(site.brand), company: `<bdi>${esc(site.company)}</bdi>`, tursab: esc(site.tursab) })}</p>`).join("")}</div></section>
<section class="sec ice"><div class="wrap"><h2>${esc(x.valuesH)}</h2><ul class="vals">${x.values.map(([h, p]) => `<li><h3>${esc(h)}</h3><p>${esc(p)}</p></li>`).join("")}</ul></div></section>
<section class="sec"><div class="wrap narrow"><h2>${esc(x.factsH)}</h2><dl class="kv">${facts.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${v}</dd>`).join("")}</dl></div></section>
<section class="cta"><div class="wrap"><h2>${esc(x.ctaH)}</h2><p>${esc(x.ctaP)}</p><a class="btn btn-k" href="${t.paths.book}">${t.nav.book}</a></div></section>`;
  const ld = { "@context": "https://schema.org", "@type": "AboutPage", name: F(x.title), description: x.desc, url: URL_ + x.path, inLanguage: lang, about: { "@id": URL_ + "/#company" } };
  page({ lang, path: x.path, alts: ALL(l => AB[l].path), title: F(x.title), desc: F(x.desc), body, ld: [ld, crumbs([[site.brand, t.paths.home], [F(x.h1), x.path]])] });
}

// English guide pages for the big searches (build/guides.js): a quotable answer, a price table, sections, FAQ
function guide(g) {
  const lang = "en", t = I.en, sedan = (a, z) => Q.base(P, a, z, "sedan");
  const lowest = (car, a) => Math.min(...ROUTES.filter(([x]) => !a || x === a).map(([x, y]) => Q.base(P, x, y, car)).filter(Boolean));
  const v = {
    brand: site.brand, min: minPrice, istMin: lowest("sedan", "IST"), sawMin: lowest("sedan", "SAW"), van: lowest("minivan"), vip: lowest("vclass"), bus: lowest("minibus"),
    istSult: sedan("IST", "sultanahmet"), seat: P.rules.childSeat, wait: P.rules.freeWaitMin, peak: P.rules.peak.IST.pct, ret: P.rules.returnDiscountPct, tursab: site.tursab
  };
  const F = x => fill(x, v);
  const name = (a, z) => `${esc(Q.zone(P, a).short[lang])} → ${esc(Q.zone(P, z).short[lang])}`;
  const popular = ROUTES.filter(([a, z]) => a !== "galataport" && ["sultanahmet", "taksim", "besiktas", "kadikoy", "sisli", "SAW"].includes(z));
  const row = (a, z, cells) => `<tr><td><a href="${routePath(lang, a, z)}">${name(a, z)}</a></td>${cells.map(c => `<td>${c}</td>`).join("")}</tr>`;
  let head, rows;
  if (g.table === "cheap") {
    const cheap = ROUTES.filter(([a]) => a !== "galataport").sort((x, y) => sedan(...x) - sedan(...y)).slice(0, 10);
    const car = id => CAR(id).name[lang] + " (" + CAR(id).seats + ")";
    head = [t.ui.route, car("sedan"), "Per person", car("minivan"), "Per person"];
    rows = cheap.map(([a, z]) => { const s = sedan(a, z), m = Q.base(P, a, z, "minivan"); return row(a, z, [`€${s}`, `€${Math.ceil(s / CAR("sedan").seats)}`, `€${m}`, `€${Math.ceil(m / CAR("minivan").seats)}`]); });
  } else if (g.table === "vip") {
    head = [t.ui.route, CAR("vclass").name[lang], "Per person (6)"];
    rows = popular.map(([a, z]) => { const p = Q.base(P, a, z, "vclass"); return row(a, z, [`€${p}`, `€${Math.ceil(p / CAR("vclass").seats)}`]); });
  } else {
    head = [t.ui.route].concat(P.cars.map(c => c.name[lang]));
    rows = popular.map(([a, z]) => row(a, z, P.cars.map(c => `€${Q.base(P, a, z, c.id)}`)));
  }
  const faq = g.faq.map(([q, a]) => [F(q), F(a)]);
  const body = `<section class="hero hero-s"><div class="wrap hero-in"><div class="hero-t"><nav class="crumbs"><a href="${t.paths.home}">${esc(site.brand)}</a></nav>
<h1>${esc(F(g.h1))}</h1><p class="lead answer">${F(g.lead)}</p></div>${searchForm(lang)}${assure(lang)}</div></section>
<section class="sec ice"><div class="wrap"><h2>${esc(F(g.tableH))}</h2><div class="tbl-wrap"><table class="tbl"><thead><tr>${head.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>
${rows.join("\n")}</tbody></table></div><p class="sub small">${esc(g.tableNote)} ${t.home.routesLead}</p><p><a class="more" href="${t.paths.prices}">${t.nav.prices} →</a></p></div></section>
${g.id === "black" ? "" : `<section class="sec"><div class="wrap"><h2>${t.home.fleetH}</h2><p class="sub">${t.home.fleetLead}</p>${fleet(lang)}</div></section>`}
${g.sections.map(([h, html], i) => `<section class="sec${i % 2 ? " ice" : ""}"><div class="wrap narrow prose"><h2>${esc(F(h))}</h2>${F(html)}</div></section>`).join("\n")}
<section class="sec"><div class="wrap narrow"><h2>${t.home.faqH}</h2>${faqBlock(faq)}</div></section>
<section class="sec ice"><div class="wrap"><h2>More guides</h2><div class="chips">${GUIDES.filter(x => x.id !== g.id).map(x => `<a href="${x.path}">${esc(x.nav)}</a>`).join("")}<a href="${t.paths.IST}">${esc(Q.zone(P, "IST").short[lang])}</a><a href="${t.paths.SAW}">${esc(Q.zone(P, "SAW").short[lang])}</a></div></div></section>
<section class="cta"><div class="wrap"><h2>${t.home.ctaH}</h2><p>${t.home.ctaP}</p><a class="btn btn-k" href="${t.paths.book}">${t.nav.book}</a></div></section>`;
  const offer = {
    "@context": "https://schema.org", "@type": "Service", serviceType: g.service, name: F(g.h1), description: F(g.desc), provider: { "@id": URL_ + "/#service" }, areaServed: { "@type": "City", name: "Istanbul" },
    offers: (g.table === "vip" ? [CAR("vclass")] : P.cars).map(c => ({ "@type": "AggregateOffer", name: c.name[lang], priceCurrency: P.currency, lowPrice: lowest(c.id), highPrice: Math.max(...ROUTES.map(([x, y]) => Q.base(P, x, y, c.id)).filter(Boolean)), eligibleQuantity: { "@type": "QuantitativeValue", maxValue: c.seats, unitText: "passengers" } }))
  };
  page({ lang, path: g.path, title: F(g.title), desc: F(g.desc), body, ld: [offer, faqLd(faq), crumbs([[site.brand, t.paths.home], [F(g.h1), g.path]])] });
}

function prices(lang) {
  const t = I[lang];
  const body = `<section class="sec"><div class="wrap"><h1>${t.prices.h1}</h1><p class="sub">${t.home.routesLead}</p>
${AIRPORTS.concat(Q.zone(P, "galataport")).map(a => `<h2>${esc(a.name[lang])}</h2><div class="tbl-wrap"><table class="tbl"><thead><tr><th>${t.prices.to}</th>${P.cars.map(c => `<th>${esc(c.name[lang])}</th>`).join("")}</tr></thead><tbody>
${ROUTES.filter(([x, y]) => x === a.id || y === a.id).map(([x, y]) => { const to = x === a.id ? y : x; return `<tr><td><a href="${routePath(lang, x, y)}">${esc(Q.zone(P, to).name[lang])}</a></td>${P.cars.map(c => `<td>€${Q.base(P, x, y, c.id)}</td>`).join("")}</tr>`; }).join("")}
</tbody></table></div>`).join("")}
<h2>${esc(PL.T[lang].more)}</h2><div class="chips">${PL.L.map(x => `<a href="${PL.T[lang].path(x.id)}">${esc(x.name[lang])}</a>`).join("")}</div></div></section>`;
  page({ lang, path: t.paths.prices, alts: ALL(l => I[l].paths.prices), title: fill(t.prices.title, { brand: site.brand }), desc: t.prices.desc, body });
}

function book(lang) {
  const t = I[lang];
  const body = `<section class="sec book-sec"><div class="wrap book-in"><div class="book-side">${searchForm(lang, null, true)}</div>
<div class="book-main" id="book" data-book><h1>${t.book.h1}</h1><ol class="steps">${t.book.steps.map((s, i) => `<li data-step-i="${i}">${s}</li>`).join("")}</ol>
<div data-view><p class="sub">${t.book.noRoute}</p></div></div></div></section>`;
  const data = { P, T: t.book, cars: P.cars, zones: P.zones, lang, terms: t.book.terms.replace(/\{seat\}/g, P.rules.childSeat) };
  page({
    lang, path: t.paths.book, alts: ALL(l => I[l].paths.book), title: fill(t.book.title, { brand: site.brand }), desc: fill(t.home.desc, { min: minPrice, brand: site.brand }), body, noindex: true,
    scripts: `<script src="/assets/quote.js?v=${ver}"></script><script>window.BOOK=${JSON.stringify(data).replace(/</g, "\\u003c")};</script>`
  });
}

function legalPages(lang) {
  const t = I[lang];
  ["terms", "privacy"].forEach(k => {
    const L = legal[lang][k];
    page({ lang, path: t.paths[k], alts: ALL(l => I[l].paths[k]), title: L.title + " · " + site.brand, desc: L.desc, body: `<section class="sec"><div class="wrap narrow prose"><h1>${L.title}</h1>${fill(L.html, { ...site, address: site.address[lang] })}</div></section>` });
  });
}

function notFound() {
  const t = I.en;
  write("/404", layout({ lang: "en", path: "/404", title: t.notFound.title + " · " + site.brand, desc: t.notFound.p, noindex: true,
    body: `<section class="hero hero-s"><div class="wrap hero-in"><div class="hero-t"><h1>${t.notFound.title}</h1><p class="lead">${t.notFound.p}</p><p><a class="btn btn-y" href="/">${t.notFound.home}</a></p></div>${searchForm("en")}</div></section>` }));
}

function extras() {
  const today = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(path.join(OUT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(p => `<url><loc>${URL_}${p.path}</loc><lastmod>${today}</lastmod>${p.alts ? LANGS.map(l => `<xhtml:link rel="alternate" hreflang="${l}" href="${URL_}${p.alts[l]}"/>`).join("") + `<xhtml:link rel="alternate" hreflang="x-default" href="${URL_}${p.alts.en}"/>` : ""}</url>`).join("\n")}
</urlset>
`);
  // AI search and answer bots get the same rules as everyone (a bot's own group replaces the * group, so it is one group)
  const BOTS = ["*", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Perplexity-User", "ClaudeBot", "Claude-SearchBot", "Claude-User",
    "Google-Extended", "Googlebot", "Bingbot", "Applebot", "Applebot-Extended", "DuckAssistBot", "Meta-ExternalAgent", "MistralAI-User", "YandexBot"];
  fs.writeFileSync(path.join(OUT, "robots.txt"), `${BOTS.map(b => "User-agent: " + b).join("\n")}
Allow: /
Disallow: /api/
Disallow: /admin
Disallow: /b2b

Sitemap: ${URL_}/sitemap.xml
`);
  // IndexNow: the key file Bing, Yandex and the other engines check (api/admin.js ?a=indexnow sends the new URLs)
  // Yandex Webmaster's verification file (the home page also carries its meta tag)
  if (site.yandexVerification) fs.writeFileSync(path.join(OUT, "yandex_" + site.yandexVerification + ".html"), `<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body>Verification: ${site.yandexVerification}</body>
</html>
`);
  if (site.indexnowKey) fs.writeFileSync(path.join(OUT, site.indexnowKey + ".txt"), site.indexnowKey);
  const line = (a, z) => { const d = dist(a, z); return `- ${Q.zone(P, a).name.en} → ${Q.zone(P, z).name.en}: ${P.cars.map(c => `${c.name.en} €${Q.base(P, a, z, c.id)}`).join(", ")}${d ? ` (${d[0]} km, about ${d[1]} min)` : ""}. ${URL_}${routePath("en", a, z)}`; };
  fs.writeFileSync(path.join(OUT, "llms.txt"), `# ${site.brand}

> ${site.brand} (Istanbul Taxi Booking) is a transfer company serving Istanbul only: fixed-price private cars with a driver from Istanbul Airport (IST) and Sabiha Gökçen Airport (SAW) to hotels and districts in Istanbul. Booked in advance, paid in cash to the driver (EUR, USD or TRY). Not a metered street taxi.

## Key facts
- Prices are per car, not per person, and fixed at booking. Tolls and parking are included.
- Cars: ${P.cars.map(c => `${c.name.en} (up to ${c.seats} passengers, ${c.bags} suitcases)`).join("; ")}.
- Pickups at IST 15:00–19:00 and SAW 14:45–21:00 cost ${P.rules.peak.IST.pct}% more. Return transfers are ${P.rules.returnDiscountPct}% off. Child seats €${P.rules.childSeat} each.
- The driver waits with a name sign; flights are tracked and the first ${P.rules.freeWaitMin} minutes after landing are free.
- Booking flow: the customer sends a request, gets a "request received" e-mail, then a confirmation e-mail once the office confirms.
- Free cancellation up to 24 hours before pickup.
- Founded on 15 October 2026 in Istanbul; run by ${site.company}. About us: ${URL_}${AB.en.path}
- Pickups 24 hours a day, 7 days a week. Prices from €${minPrice} to €${maxPrice()} per car, one way.
- Areas: Istanbul only. Istanbul Airport (IST), Sabiha Gökçen (SAW), Galataport cruise port and the central districts on both sides of the Bosphorus.
- Contact: WhatsApp ${site.phone}, ${site.email}. TÜRSAB licence ${site.tursab}.

## Prices
${ROUTES.map(([a, z]) => line(a, z)).join("\n")}

## Guides
${GUIDES.map(g => `- ${g.nav}: ${URL_}${g.path}`).join("\n")}
- Istanbul Airport taxi prices: ${URL_}${I.en.paths.IST}
- Sabiha Gökçen taxi prices: ${URL_}${I.en.paths.SAW}

## Pages
- Book: ${URL_}/book
- All prices: ${URL_}/prices
- Other languages: ${LANGS.filter(l => l !== "en").map(l => `${LANG_NAME[l]} ${URL_}${I[l].paths.home}`).join(", ")}
`);
}

// The office panel, the partners' booking page and the page where a customer answers a change the office sent.
// They talk to api/ (admin.js, b2b.js, respond.js) and are copied as they are, with their fonts.
function admin() {
  const put = (src, dest) => { fs.mkdirSync(path.dirname(path.join(OUT, dest)), { recursive: true }); fs.copyFileSync(path.join(__dirname, src), path.join(OUT, dest)); };
  put("admin.html", "admin/index.html");
  put("pages/b2b.html", "b2b/index.html");
  put("pages/booking-change.html", "booking-change.html");
  fs.readdirSync(path.join(__dirname, "static", "fonts")).forEach(f => put("static/fonts/" + f, "fonts/" + f));
}

LANGS.forEach(l => { home(l); AIRPORTS.forEach(a => hub(l, a.id)); portHub(l); aboutPage(l); CO.ORDER.forEach(k => companyPage(l, k)); ROUTES.forEach(([a, z]) => route(l, a, z)); PL.L.forEach(x => place(l, x)); SV.S.forEach(x => service(l, x)); prices(l); book(l); legalPages(l); blogIndex(l); POSTS.forEach(x => blogPost(l, x)); });
GUIDES.forEach(guide);
notFound();
admin();
extras();
console.log("built " + pages.length + " pages into public/");
