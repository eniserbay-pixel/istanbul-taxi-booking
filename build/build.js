// Builds the static site into public/: home, booking page, route pages (airport × district), price list,
// legal pages, sitemap.xml, robots.txt, llms.txt and 404.html, in English (/) and Russian (/ru).
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

const OUT = path.join(__dirname, "..", "public");
const URL_ = (process.env.SITE_URL || site.url).replace(/\/$/, "");
const LANGS = ["en", "ru"];
const OTHER = l => l === "en" ? "ru" : "en";
const AIRPORTS = P.zones.filter(z => z.type === "airport");
const PLACES = P.zones.filter(z => z.type !== "airport");
const CAR = id => P.cars.find(c => c.id === id);
const pages = [];

const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const fill = (t, v) => String(t).replace(/\{(\w+)\}/g, (m, k) => v[k] != null ? v[k] : m);
const minPrice = Math.min(...AIRPORTS.flatMap(a => PLACES.map(z => Q.base(P, a.id, z.id, "sedan")).filter(Boolean)));
const dist = (a, b) => (P.dist[a] && P.dist[a][b]) || (P.dist[b] && P.dist[b][a]) || null;
const css = fs.readFileSync(path.join(OUT, "assets", "site.css"), "utf8");
const ver = require("crypto").createHash("md5").update(css + fs.readFileSync(path.join(OUT, "assets", "site.js"), "utf8")).digest("hex").slice(0, 8);

// Every page: same head, header and footer. alt = the same page in the other language.
function layout(o) {
  const t = I[o.lang], other = OTHER(o.lang);
  const ld = [{
    "@context": "https://schema.org", "@type": "TaxiService", "@id": URL_ + "/#service", name: site.brand, alternateName: "Istanbul Taxi Booking", url: URL_ + "/", logo: URL_ + "/img/icon-192.png", image: URL_ + "/img/og.png",
    telephone: site.phone, email: site.email, areaServed: { "@type": "City", name: "Istanbul" },
    provider: { "@type": "TravelAgency", name: site.company, telephone: site.phone, address: { "@type": "PostalAddress", addressLocality: "Istanbul", addressCountry: "TR" } }
  }].concat(o.ld || []);
  const head = `<!doctype html><html lang="${t.htmlLang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(o.title)}</title><meta name="description" content="${esc(o.desc)}">
<link rel="canonical" href="${URL_}${o.path === "/" ? "/" : o.path}">
${o.alt ? `<link rel="alternate" hreflang="${o.lang}" href="${URL_}${o.path}"><link rel="alternate" hreflang="${other}" href="${URL_}${o.alt}"><link rel="alternate" hreflang="x-default" href="${URL_}${o.lang === "en" ? o.path : o.alt}">` : ""}
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
${o.alt ? `<a class="lang" href="${o.alt}" hreflang="${other}" lang="${other}">${t.nav.lang}</a>` : ""}</nav>
<a class="btn btn-y btn-sm" href="${p.book}">${t.nav.book}</a></div></header>`;
  const popular = [["IST", "sultanahmet"], ["IST", "taksim"], ["IST", "kadikoy"], ["SAW", "taksim"], ["SAW", "kadikoy"], ["SAW", "sultanahmet"]];
  const footer = `<footer class="foot"><div class="wrap foot-in">
<div><a class="logo" href="${p.home}"><img src="/img/logo.webp" alt="${esc(site.brand)}" width="141" height="80" loading="lazy"></a>
<p>${esc(site.company)}<br>${esc(site.address[o.lang])}<br>${t.footer.tursab}: ${esc(site.tursab)}</p></div>
<div><h3>${t.footer.routes}</h3>${popular.map(([a, z]) => `<a href="${p.route(a, Q.zone(P, z).slug)}">${esc(Q.zone(P, a).short[o.lang])} → ${esc(Q.zone(P, z).short[o.lang])}</a>`).join("")}</div>
<div><h3>${t.footer.contact}</h3><a href="https://wa.me/${site.whatsapp}" rel="noopener">WhatsApp ${esc(site.phone)}</a><a href="tel:${site.phone.replace(/\s/g, "")}">${esc(site.phone)}</a><a href="mailto:${site.email}">${esc(site.email)}</a></div>
<div><h3>${t.footer.legal}</h3><a href="${p.terms}">${t.ui.terms}</a><a href="${p.privacy}">${t.ui.privacy}</a><a href="${p.prices}">${t.nav.prices}</a><a href="${p.blog}">${t.nav.blog}</a></div>
</div><div class="wrap copy">© ${new Date().getFullYear()} ${esc(site.brand)}. ${t.footer.rights}</div></footer>
<a class="wa-float" href="https://wa.me/${site.whatsapp}" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg></a>
<script>window.SITE=${JSON.stringify({ lang: o.lang, book: p.book, wa: site.whatsapp })};</script>
${o.scripts || ""}<script src="/assets/site.js?v=${ver}" defer></script></body></html>`;
  return head + header + "<main>" + o.body + "</main>" + footer;
}

function write(p, html) {
  const file = p === "/" ? "index.html" : p.replace(/^\//, "") + ".html";
  const f = path.join(OUT, file);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html);
}
function page(o) {
  write(o.path, layout(o));
  if (!o.noindex) pages.push({ path: o.path, alt: o.alt, lang: o.lang });
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
<div class="row3"><label>${t.date}<input type="date" name="date" required></label><label>${t.time}<input type="time" name="time" required step="300"></label>
<label>${t.pax}<select name="pax">${Array.from({ length: 16 }, (_, i) => `<option${i === 1 ? " selected" : ""}>${i + 1}</option>`).join("")}</select></label></div>
<label class="check"><input type="checkbox" name="ret" value="1" data-ret> ${t.ret}</label>
<div class="row2 ret" hidden><label>${t.rdate}<input type="date" name="rdate"></label><label>${t.rtime}<input type="time" name="rtime" step="300"></label></div>
<button class="btn btn-y btn-block" type="submit">${t.submit}</button></form>`;
}

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

function fleet(lang, from, to) {
  const t = I[lang];
  return `<div class="fleet">${P.cars.map(c => {
    const pr = from ? Q.base(P, from, to, c.id) : Math.min(...AIRPORTS.flatMap(a => PLACES.map(z => Q.base(P, a.id, z.id, c.id)).filter(Boolean)));
    return `<article class="car${c.popular ? " pop" : ""}"><img src="${c.img}" alt="${esc(c.name[lang])} – ${esc(c.models[lang])}" width="320" height="160" loading="lazy">
<h3>${esc(c.name[lang])}</h3><p class="models">${esc(c.models[lang])}</p>
<p class="cap"><span>👤 ${c.seats}</span><span>🧳 ${c.bags}</span></p><p class="note">${esc(c.note[lang])}</p>
<p class="from">${from ? "" : t.ui.from}<strong>€${pr}</strong> <span>${t.book.perCar}</span></p></article>`;
  }).join("")}</div>`;
}

function faqBlock(items) {
  return `<div class="faq">${items.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${a}</p></details>`).join("")}</div>`;
}
const postPath = (lang, post) => I[lang].paths.blog + "/" + post[lang].slug;
function blogCards(lang, skip) {
  return `<div class="posts">${POSTS.filter(x => x.id !== skip).map(x => `<a class="post-c" href="${postPath(lang, x)}"><h3>${esc(x[lang].title)}</h3><p>${esc(fill(x[lang].lead, { brand: site.brand }))}</p><span class="more">${I[lang].blog.read} →</span></a>`).join("")}</div>`;
}
// The booking box as it sits inside a blog post
const blogWidget = lang => `<aside class="blog-widget"><h2>${I[lang].blog.widgetH}</h2>${searchForm(lang)}${assure(lang)}</aside>`;

function blogIndex(lang) {
  const t = I[lang], b = t.blog, other = OTHER(lang);
  const body = `<section class="hero hero-s"><div class="wrap hero-in"><div class="hero-t"><h1>${b.h1}</h1><p class="lead">${b.lead}</p></div>${searchForm(lang)}${assure(lang)}</div></section>
<section class="sec ice"><div class="wrap">${blogCards(lang)}</div></section>`;
  page({ lang, path: t.paths.blog, alt: I[other].paths.blog, title: b.title, desc: b.desc, body });
}

function blogPost(lang, post) {
  const t = I[lang], x = post[lang], other = OTHER(lang), v = { brand: site.brand };
  const p = postPath(lang, post);
  const body = `<section class="hero hero-s"><div class="wrap"><div class="hero-t"><nav class="crumbs"><a href="${t.paths.home}">${esc(site.brand)}</a> › <a href="${t.paths.blog}">${t.nav.blog}</a></nav>
<h1>${esc(x.title)}</h1><p class="lead">${esc(fill(x.lead, v))}</p><p class="small" style="color:var(--ice-ink)">${t.blog.updated}: ${post.date}</p></div></div></section>
<article class="sec"><div class="wrap narrow prose">${fill(x.body, v).replace(/\{widget\}/g, blogWidget(lang))}</div></article>
<section class="sec ice"><div class="wrap"><h2>${t.blog.more}</h2>${blogCards(lang, post.id)}</div></section>`;
  const ld = { "@context": "https://schema.org", "@type": "BlogPosting", headline: x.title, description: x.desc, datePublished: post.date, dateModified: post.date, inLanguage: lang, mainEntityOfPage: URL_ + p, author: { "@type": "Organization", name: site.brand }, publisher: { "@id": URL_ + "/#service" }, image: URL_ + "/img/og.png" };
  page({ lang, path: p, alt: postPath(other, post), title: x.title, desc: x.desc, body, ld: [ld, crumbs([[site.brand, t.paths.home], [t.nav.blog, t.paths.blog], [x.title, p]])] });
}

const faqLd = items => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a.replace(/<[^>]+>/g, "") } })) });
const crumbs = list => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: list.map(([name, p], i) => ({ "@type": "ListItem", position: i + 1, name, item: URL_ + p })) });

function meetCards(lang, only) {
  return `<div class="meet">${AIRPORTS.filter(a => !only || a.id === only).map(a => `<div class="meet-c"><h3>${esc(a.name[lang])}</h3><p>${esc(site.meet[a.id][lang])}</p></div>`).join("")}</div>`;
}

// Route list: airport → every other place, IST ↔ SAW once
const ROUTES = [];
AIRPORTS.forEach(a => PLACES.forEach(z => ROUTES.push([a.id, z.id])));
ROUTES.push(["IST", "SAW"]);
const routePath = (lang, a, z) => z === "SAW" ? I[lang].paths.airportPair : I[lang].paths.route(a, Q.zone(P, z).slug);

function home(lang) {
  const t = I[lang], h = t.home, other = OTHER(lang);
  const faq = t.faq.map(([q, a]) => [fill(q, { brand: site.brand }), fill(a, { brand: site.brand })]);
  const popular = ROUTES.filter(([a, z]) => ["sultanahmet", "taksim", "besiktas", "kadikoy", "sisli", "SAW"].includes(z));
  const body = `<section class="hero"><div class="wrap hero-in"><div class="hero-t">
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
<section class="sec ice"><div class="wrap"><h2>${t.blog.latest}</h2>${blogCards(lang)}</div></section>
<section class="sec" id="faq"><div class="wrap narrow"><h2>${h.faqH}</h2>${faqBlock(faq)}</div></section>
<section class="cta"><div class="wrap"><h2>${h.ctaH}</h2><p>${h.ctaP}</p><a class="btn btn-k" href="${t.paths.book}">${t.nav.book}</a></div></section>`;
  page({ lang, path: t.paths.home, alt: I[other].paths.home, title: fill(h.title, { min: minPrice, brand: site.brand }), desc: fill(h.desc, { min: minPrice, brand: site.brand }), body, ld: [faqLd(faq)] });
}

function route(lang, a, z) {
  const t = I[lang], r = t.route, other = OTHER(lang);
  const A = Q.zone(P, a), Z = Q.zone(P, z), d = dist(a, z);
  const v = {
    from: A.short[lang], to: Z.short[lang], fromLong: A.name[lang], toLong: Z.name[lang], brand: site.brand,
    price: Q.base(P, a, z, "sedan"), van: Q.base(P, a, z, "minivan"), vclass: Q.base(P, a, z, "vclass"), bus: Q.base(P, a, z, "minibus"),
    km: d ? d[0] : "", min: d ? d[1] : ""
  };
  const faq = r.faq.filter((x, i) => d || i !== r.faqNoDist).map(([q, ans]) => [fill(q, v), fill(ans, v)]);
  const p = routePath(lang, a, z);
  const others = ROUTES.filter(([x, y]) => x === a && y !== z).slice(0, 14);
  const body = `<section class="hero hero-s"><div class="wrap hero-in"><div class="hero-t">
<nav class="crumbs"><a href="${t.paths.home}">${esc(site.brand)}</a> › <a href="${t.paths[a]}">${esc(A.short[lang])}</a></nav>
<h1>${esc(fill(r.h1, v))}</h1><p class="lead answer">${fill(d ? r.answer : r.answerNoDist, v)}</p>
${d ? `<ul class="facts"><li><strong>${d[0]} km</strong></li><li><strong>~${d[1]} ${t.ui.min}</strong></li><li><strong>€${v.price}</strong> ${t.book.perCar}</li></ul>` : ""}</div>
${searchForm(lang, { from: a, to: z })}${assure(lang)}</div></section>
<section class="sec ice"><div class="wrap"><h2>${esc(fill(r.pricesH, v))}</h2>${fleet(lang, a, z)}
<p class="sub small">${t.home.routesLead}</p></div></section>
${Z.area ? `<section class="sec"><div class="wrap narrow"><h2>${r.areaH}</h2><p>${esc(Z.area[lang])}</p></div></section>` : ""}
<section class="sec ice"><div class="wrap"><h2>${r.meetH}</h2>${meetCards(lang, a === "SAW" ? "SAW" : "IST")}</div></section>
<section class="sec"><div class="wrap narrow"><h2>${t.home.faqH}</h2>${faqBlock(faq)}</div></section>
<section class="sec ice"><div class="wrap"><h2>${esc(fill(r.otherH, v))}</h2><div class="chips">${others.map(([x, y]) => `<a href="${routePath(lang, x, y)}">${esc(Q.zone(P, y).short[lang])} <b>€${Q.base(P, x, y, "sedan")}</b></a>`).join("")}</div>
<p><a class="more" href="${t.paths[a]}">${esc(fill(r.back, v))} →</a></p></div></section>`;
  const offer = {
    "@context": "https://schema.org", "@type": "Service", serviceType: "Airport taxi", name: fill(r.h1, v), provider: { "@id": URL_ + "/#service" },
    areaServed: "Istanbul", offers: P.cars.map(c => ({ "@type": "Offer", name: c.name[lang], price: Q.base(P, a, z, c.id), priceCurrency: P.currency, eligibleQuantity: { "@type": "QuantitativeValue", maxValue: c.seats, unitText: "passengers" } }))
  };
  page({
    lang, path: p, alt: routePath(other, a, z), title: fill(r.title, v), desc: fill(d ? r.desc : r.desc.replace(/,? ?\{km\}[^.]*\./, "."), v), body,
    ld: [offer, faqLd(faq), crumbs([[site.brand, t.paths.home], [A.short[lang], t.paths[a]], [fill(r.h1, v), p]])]
  });
}

function hub(lang, a) {
  const t = I[lang], hb = t.hub, other = OTHER(lang), A = Q.zone(P, a);
  const list = ROUTES.filter(([x]) => x === a).concat(a === "SAW" ? [["SAW", "IST"]] : []);
  const v = { from: A.short[lang], fromLong: A.name[lang], brand: site.brand, price: Math.min(...list.map(([x, y]) => Q.base(P, x, y, "sedan"))) };
  const body = `<section class="hero hero-s"><div class="wrap hero-in"><div class="hero-t"><h1>${esc(fill(hb.h1, v))}</h1><p class="lead">${esc(fill(hb.lead, v))}</p></div>${searchForm(lang, { from: a })}${assure(lang)}</div></section>
<section class="sec"><div class="wrap"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>${t.prices.to}</th>${P.cars.map(c => `<th>${esc(c.name[lang])}</th>`).join("")}<th>km</th></tr></thead><tbody>
${list.map(([x, y]) => { const d = dist(x, y), href = y === "IST" || y === "SAW" ? t.paths.airportPair : routePath(lang, x, y); return `<tr><td><a href="${href}">${esc(Q.zone(P, y).name[lang])}</a></td>${P.cars.map(c => `<td>€${Q.base(P, x, y, c.id)}</td>`).join("")}<td>${d ? d[0] : ""}</td></tr>`; }).join("")}
</tbody></table></div><p class="sub small">${t.home.routesLead}</p></div></section>
<section class="sec ice"><div class="wrap"><h2>${t.route.meetH}</h2>${meetCards(lang, a)}</div></section>`;
  page({ lang, path: t.paths[a], alt: I[other].paths[a], title: fill(hb.title, v), desc: fill(hb.desc, v), body, ld: [crumbs([[site.brand, t.paths.home], [A.short[lang], t.paths[a]]])] });
}

function prices(lang) {
  const t = I[lang], other = OTHER(lang);
  const body = `<section class="sec"><div class="wrap"><h1>${t.prices.h1}</h1><p class="sub">${t.home.routesLead}</p>
${AIRPORTS.map(a => `<h2>${esc(a.name[lang])}</h2><div class="tbl-wrap"><table class="tbl"><thead><tr><th>${t.prices.to}</th>${P.cars.map(c => `<th>${esc(c.name[lang])}</th>`).join("")}</tr></thead><tbody>
${ROUTES.filter(([x, y]) => x === a.id || y === a.id).map(([x, y]) => { const to = x === a.id ? y : x; return `<tr><td><a href="${routePath(lang, x, y)}">${esc(Q.zone(P, to).name[lang])}</a></td>${P.cars.map(c => `<td>€${Q.base(P, x, y, c.id)}</td>`).join("")}</tr>`; }).join("")}
</tbody></table></div>`).join("")}</div></section>`;
  page({ lang, path: t.paths.prices, alt: I[other].paths.prices, title: fill(t.prices.title, { brand: site.brand }), desc: t.prices.desc, body });
}

function book(lang) {
  const t = I[lang], other = OTHER(lang);
  const body = `<section class="sec book-sec"><div class="wrap book-in"><div class="book-side">${searchForm(lang, null, true)}</div>
<div class="book-main" id="book" data-book><h1>${t.book.h1}</h1><ol class="steps">${t.book.steps.map((s, i) => `<li data-step-i="${i}">${s}</li>`).join("")}</ol>
<div data-view><p class="sub">${t.book.noRoute}</p></div></div></div></section>`;
  const data = { P, T: t.book, cars: P.cars, zones: P.zones, lang, terms: t.book.terms.replace(/\{seat\}/g, P.rules.childSeat) };
  page({
    lang, path: t.paths.book, alt: I[other].paths.book, title: fill(t.book.title, { brand: site.brand }), desc: fill(t.home.desc, { min: minPrice, brand: site.brand }), body, noindex: true,
    scripts: `<script src="/assets/quote.js?v=${ver}"></script><script>window.BOOK=${JSON.stringify(data).replace(/</g, "\\u003c")};</script>`
  });
}

function legalPages(lang) {
  const t = I[lang], other = OTHER(lang);
  ["terms", "privacy"].forEach(k => {
    const L = legal[lang][k];
    page({ lang, path: t.paths[k], alt: I[other].paths[k], title: L.title + " · " + site.brand, desc: L.desc, body: `<section class="sec"><div class="wrap narrow prose"><h1>${L.title}</h1>${fill(L.html, { ...site, address: site.address[lang] })}</div></section>` });
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
${pages.map(p => `<url><loc>${URL_}${p.path}</loc><lastmod>${today}</lastmod>${p.alt ? `<xhtml:link rel="alternate" hreflang="${p.lang}" href="${URL_}${p.path}"/><xhtml:link rel="alternate" hreflang="${OTHER(p.lang)}" href="${URL_}${p.alt}"/>` : ""}</url>`).join("\n")}
</urlset>
`);
  fs.writeFileSync(path.join(OUT, "robots.txt"), `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin

User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: ${URL_}/sitemap.xml
`);
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
- Contact: WhatsApp ${site.phone}, ${site.email}. TÜRSAB licence ${site.tursab}.

## Prices
${ROUTES.map(([a, z]) => line(a, z)).join("\n")}

## Pages
- Book: ${URL_}/book
- All prices: ${URL_}/prices
- Русский: ${URL_}/ru
`);
}

function admin() {
  const names = { zones: Object.fromEntries(P.zones.map(z => [z.id, z.short.tr])), cars: Object.fromEntries(P.cars.map(c => [c.id, c.name.tr])) };
  const html = fs.readFileSync(path.join(__dirname, "admin.html"), "utf8").replace(/__BRAND__/g, esc(site.brand)).replace("__NAMES__", JSON.stringify(names));
  fs.mkdirSync(path.join(OUT, "admin"), { recursive: true });
  fs.writeFileSync(path.join(OUT, "admin", "index.html"), html);
}

LANGS.forEach(l => { home(l); AIRPORTS.forEach(a => hub(l, a.id)); ROUTES.forEach(([a, z]) => route(l, a, z)); prices(l); book(l); legalPages(l); blogIndex(l); POSTS.forEach(x => blogPost(l, x)); });
notFound();
admin();
extras();
console.log("built " + pages.length + " pages into public/");
