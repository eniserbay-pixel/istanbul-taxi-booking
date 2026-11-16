// Site health check, run at the end of every build (build/build.js). It reads the pages the build just wrote, like a
// crawler would, and writes public/admin/audit.json for the panel's "Site Sağlığı" page: scores for SEO, GEO (AI
// answers) and technical health, the list of problems with how to fix them, and a row per page. Texts are Turkish
// because only the panel shows them. No network: speed is measured from the panel with Google PageSpeed Insights.
const fs = require("fs");
const path = require("path");

const AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Claude-SearchBot", "Google-Extended", "Bingbot", "Applebot-Extended"];
// review and listing sites that answer engines read; a profile link on one of them in data/site.json counts
const PROFILES = [
  ["google", /google\.[a-z.]+\/maps|g\.page|business\.google|maps\.app\.goo\.gl/, "Google İşletme Profili"],
  ["trustpilot", /trustpilot\.com/, "Trustpilot"],
  ["tripadvisor", /tripadvisor\./, "TripAdvisor"],
  ["bing", /bing\.com\/maps|bingplaces/, "Bing Places"],
  ["social", /instagram\.com|facebook\.com|linkedin\.com|youtube\.com|x\.com|twitter\.com/, "Sosyal medya hesabı"]
];

const text = html => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").replace(/\s+/g, " ").trim();
const words = s => (s.match(/[\p{L}\p{N}]+/gu) || []).length;
const attr = (tag, name) => { const m = tag.match(new RegExp("\\s" + name + "=\"([^\"]*)\"", "i")); return m ? m[1] : null; };

module.exports = function audit(OUT, o) {
  const { site, URL, pages, posts, today } = o;
  const file = p => { const a = path.join(OUT, p === "/" ? "index.html" : p.replace(/^\//, "") + ".html"); return fs.existsSync(a) ? a : null; };
  const exists = href => {
    const p = decodeURI(href.split("#")[0].split("?")[0]);
    if (!p || p === "/") return true;
    if (/^\/api\//.test(p)) return true;
    return fs.existsSync(path.join(OUT, p.replace(/^\//, ""))) || !!file(p) || fs.existsSync(path.join(OUT, p.replace(/^\//, ""), "index.html"));
  };

  const issues = {};
  // one entry per kind of problem; the pages it was found on are collected under it
  const add = (key, sev, cat, msg, fix, page) => {
    const x = issues[key] || (issues[key] = { key, sev, cat, msg, fix, pages: [] });
    if (page && x.pages.length < 400 && !x.pages.includes(page)) x.pages.push(page);
  };
  const rows = [], titles = {}, descs = {}, ld = {};
  let bytes = 0, linksChecked = 0;

  pages.forEach(pg => {
    const f = file(pg.path);
    if (!f) { add("missing", "error", "tech", "Site haritasındaki sayfa dosyası yok", "Sayfanın derlemede oluştuğunu kontrol edin.", pg.path); return; }
    const html = fs.readFileSync(f, "utf8"), p = pg.path;
    bytes += html.length;
    const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "";
    const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
    const canon = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || "";
    const h1 = (html.match(/<h1[\s>]/g) || []).length;
    const hl = (html.match(/hreflang="[^"]+" href/g) || []).length;
    const main = (html.match(/<main>([\s\S]*?)<\/main>/) || [])[1] || html;
    const wc = words(text(main.replace(/<form[\s\S]*?<\/form>/g, " ").replace(/<select[\s\S]*?<\/select>/g, " ")));
    const types = [];
    (html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || []).forEach(s => {
      try { const j = JSON.parse(s.replace(/^<script[^>]*>|<\/script>$/g, "")); types.push(j["@type"]); }
      catch (e) { add("ld-bad", "error", "seo", "Bozuk yapısal veri (JSON-LD)", "Sayfadaki JSON-LD bloğu okunamıyor; düzeltilmeli.", p); }
    });
    types.forEach(t => { ld[t] = (ld[t] || 0) + 1; });
    const n = { p, lang: pg.lang || "en", title: title.length, desc: desc.length, h1, words: wc, kb: Math.round(html.length / 102.4) / 10, ld: types.filter(t => t !== "TaxiService"), bad: 0 };

    const flag = (...a) => { add(...a, p); n.bad++; };
    if (!title) flag("title-none", "error", "seo", "Başlık (title) yok", "Her sayfaya benzersiz bir başlık yazılmalı.");
    else if (title.length > 65) flag("title-long", "warn", "seo", "Başlık 65 karakterden uzun, Google'da kesilir", "Başlığı 50–60 karaktere indirin; önemli kelimeyi başa alın.");
    else if (title.length < 20) flag("title-short", "warn", "seo", "Başlık çok kısa", "Başlığa rota, şehir ve hizmet adını ekleyin.");
    if (!desc) flag("desc-none", "error", "seo", "Açıklama (meta description) yok", "Her sayfaya 120–160 karakterlik bir açıklama yazılmalı.");
    else if (desc.length > 165) flag("desc-long", "warn", "seo", "Açıklama 165 karakterden uzun, Google'da kesilir", "Açıklamayı 160 karakterin altına indirin.");
    else if (desc.length < 70) flag("desc-short", "warn", "seo", "Açıklama kısa", "Açıklamayı 120–160 karaktere çıkarın: fiyat, süre, avantaj.");
    if (h1 !== 1) flag("h1", "warn", "seo", h1 ? "Sayfada birden fazla H1 başlığı var" : "Sayfada H1 başlığı yok", "Her sayfada tek bir ana başlık (H1) olmalı.");
    if (!canon) flag("canon", "error", "seo", "Canonical etiketi yok", "Sayfaya kendi adresini gösteren canonical etiketi eklenmeli.");
    else if (canon.replace(URL, "") !== (p === "/" ? "/" : p)) flag("canon-other", "warn", "seo", "Canonical başka bir adresi gösteriyor", "Canonical, sayfanın kendi adresi olmalı.");
    if (!hl) flag("hreflang", "info", "seo", "Sayfa tek dilde (hreflang yok)", "Sayfanın diğer dillere çevirisi yapılırsa daha çok ülkede görünür.");
    if (/<meta name="robots" content="noindex"/.test(html)) flag("noindex", "error", "seo", "Site haritasındaki sayfa arama dışı (noindex)", "Ya noindex kaldırılmalı ya da sayfa site haritasından çıkarılmalı.");
    if (wc < 250) flag("thin", "warn", "seo", "İnce içerik: sayfada 250 kelimeden az metin var", "Sayfaya soru-cevap, fiyat açıklaması ve rota bilgisi ekleyin.");
    if (!/FAQPage/.test(types.join())) n.nofaq = 1;
    titles[title] = (titles[title] || []).concat(p);
    descs[desc] = (descs[desc] || []).concat(p);

    // links and images, the same file for every language counts once per page
    const seen = new Set();
    (html.match(/<a\s[^>]*href="\/[^"]*"/g) || []).forEach(a => {
      const h = attr(a, "href"); if (seen.has(h)) return; seen.add(h); linksChecked++;
      if (!exists(h)) flag("link-broken", "error", "tech", "Kırık iç link (gittiği sayfa yok)", "Linki doğru adrese çevirin ya da kaldırın.");
    });
    (html.match(/<img\s[^>]*>/g) || []).forEach(img => {
      if (attr(img, "alt") === null) flag("img-alt", "warn", "seo", "Görselde alt metni yok", "Görsele ne gösterdiğini anlatan bir alt metni yazın.");
      if (!attr(img, "width") || !attr(img, "height")) flag("img-size", "info", "tech", "Görselde genişlik/yükseklik yok (sayfa kayabilir)", "img etiketine width ve height ekleyin.");
      const src = attr(img, "src");
      if (src && src[0] === "/" && !exists(src)) flag("img-missing", "error", "tech", "Görsel dosyası bulunamadı", "Dosyayı ekleyin ya da linki düzeltin.");
    });
    if (html.length > 250 * 1024) flag("heavy", "warn", "tech", "Sayfanın HTML'i 250 KB'tan büyük", "Tekrar eden blokları (ör. arama formu) küçültün.");
    rows.push(n);
  });

  Object.entries(titles).forEach(([t, ps]) => { if (t && ps.length > 1) ps.forEach(p => add("title-dup", "warn", "seo", "Aynı başlığı kullanan birden fazla sayfa var", "Her sayfanın başlığı farklı olmalı.", p)); });
  Object.entries(descs).forEach(([d, ps]) => { if (d && ps.length > 1) ps.forEach(p => add("desc-dup", "warn", "seo", "Aynı açıklamayı kullanan birden fazla sayfa var", "Her sayfanın açıklaması farklı olmalı.", p)); });

  // site-wide files and signals
  const rd = f => { try { return fs.readFileSync(path.join(OUT, f), "utf8"); } catch (e) { return ""; } };
  const robots = rd("robots.txt"), llms = rd("llms.txt"), sitemap = rd("sitemap.xml");
  const smCount = (sitemap.match(/<loc>/g) || []).length;
  const blocked = AI_BOTS.filter(b => { const g = robots.split(/\n\s*\n/).find(x => new RegExp("User-agent:\\s*" + b + "\\b", "i").test(x)); return g && /Disallow:\s*\/\s*$/m.test(g); });
  const profiles = site.profiles || [];
  const has = re => profiles.some(u => re.test(u));
  const live = posts.filter(p => p.date <= today).sort((a, b) => (a.date < b.date ? 1 : -1));
  const lastPost = live[0] ? live[0].date : null;
  const daysSince = lastPost ? Math.round((Date.parse(today) - Date.parse(lastPost)) / 864e5) : 999;
  const imgs = []; const walk = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => { const f = path.join(d, e.name); if (e.isDirectory()) walk(f); else if (/\.(jpe?g|png|webp|gif|svg)$/i.test(e.name)) imgs.push([f.slice(OUT.length), fs.statSync(f).size]); });
  try { walk(path.join(OUT, "img")); } catch (e) {}
  const bigImgs = imgs.filter(x => x[1] > 300 * 1024).sort((a, b) => b[1] - a[1]);

  const checks = [
    // [category, ok, label, why, fix]
    ["tech", !!robots, "robots.txt", "Arama motorlarına neyi tarayacaklarını söyler.", "robots.txt oluşturun."],
    ["tech", /Sitemap:/i.test(robots), "robots.txt site haritasını gösteriyor", "Botlar site haritasını buradan bulur.", "robots.txt'e Sitemap satırı ekleyin."],
    ["tech", smCount > 0 && smCount === pages.length, `Site haritası (${smCount} adres)`, "Tüm sayfaların listesi; Google ve Bing'e gönderilir.", "Site haritası tüm indekslenecek sayfaları içermeli."],
    ["tech", bigImgs.length === 0, "Büyük görsel yok (300 KB üstü)", "Büyük görseller sayfayı yavaşlatır.", "Görselleri WebP'ye çevirin ve küçültün: " + bigImgs.slice(0, 3).map(x => x[0]).join(", ")],
    ["tech", !!site.indexnowKey, "IndexNow anahtarı", "Yeni sayfaları Bing ve Yandex'e anında bildirir.", "IndexNow anahtarı ekleyin."],
    ["seo", !!site.googleVerification, "Google Search Console doğrulaması", "Google'daki görünürlüğü ve hataları görmek için.", "Search Console'da siteyi doğrulayın."],
    ["seo", !!site.bingSiteAuth, "Bing Webmaster doğrulaması", "ChatGPT aramaları Bing'i kullanır.", "Bing Webmaster'da siteyi doğrulayın."],
    ["seo", !!site.yandexVerification, "Yandex Webmaster doğrulaması", "Rusça aramalar için.", "Yandex Webmaster'da siteyi doğrulayın."],
    ["seo", daysSince <= 14, lastPost ? `Blog güncel (son yazı ${lastPost})` : "Blog güncel", "Düzenli içerik, Google'a sitenin canlı olduğunu gösterir.", "Takvimdeki haftalık yazıları yayınlayın."],
    ["geo", !!llms, "llms.txt", "Yapay zeka asistanlarına sitenin özetini verir.", "llms.txt oluşturun."],
    ["geo", blocked.length === 0, "Yapay zeka botlarına izin (" + AI_BOTS.length + " bot)", "ChatGPT, Claude, Perplexity ve Gemini'nin siteyi okuyabilmesi için.", "robots.txt'te engellenen botlar: " + blocked.join(", ")],
    ["geo", (ld.FAQPage || 0) >= pages.length * 0.3, `Soru-cevap yapısal verisi (${ld.FAQPage || 0} sayfa)`, "AI yanıtları soru-cevap bloklarını doğrudan alıntılar.", "Rota ve hizmet sayfalarına SSS bölümü ekleyin."],
    ["geo", (ld.BreadcrumbList || 0) > 0, `Sayfa yolu (Breadcrumb) verisi (${ld.BreadcrumbList || 0} sayfa)`, "Site yapısını arama motorlarına anlatır.", "Breadcrumb yapısal verisi ekleyin."],
    ["geo", !!site.tursab, "Lisans bilgisi (TÜRSAB) yapısal veride", "Güven sinyali; AI yanıtları lisanslı firmaları tercih eder.", "TÜRSAB numarasını ekleyin."],
    ["geo", has(PROFILES[0][1]), "Google İşletme Profili bağlı", "Google Haritalar ve Gemini yanıtlarında görünmek için en önemli adım.", "Google İşletme Profili açın; linkini gönderin, siteye bağlansın."],
    ["geo", has(PROFILES[1][1]) || has(PROFILES[2][1]), "Yorum sitesi profili (Trustpilot / TripAdvisor)", "ChatGPT puanı görünen firmaları öne çıkarır.", "Trustpilot ve TripAdvisor sayfası açıp yorum toplayın, linkleri ekleyin."],
    ["geo", has(PROFILES[3][1]), "Bing Places kaydı", "ChatGPT'nin yerel sonuçları Bing'den gelir.", "Bing Places'e işletmeyi ekleyin."],
    ["geo", profiles.length >= 3, `Diğer sitelerdeki profiller (sameAs: ${profiles.length})`, "AI modelleri markayı farklı kaynaklarda gördükçe güvenir.", "Sosyal medya ve rehber sitelerindeki profillerinizi ekleyin."],
    ["geo", /aggregateRating/.test(rd("index.html")), "Puan ve yorum yapısal verisi", "Arama sonuçlarında yıldız gösterir, AI'ye güven verir.", "Gerçek yorumlar toplandıktan sonra puan yapısal verisi eklenecek."]
  ].map(([cat, ok, label, why, fix]) => ({ cat, ok: !!ok, label, why, fix }));
  checks.filter(c => !c.ok).forEach(c => add("chk-" + c.label, c.cat === "geo" ? "warn" : "warn", c.cat, c.label + ": eksik", c.fix));

  // scores: start at 100, take off for each kind of problem by how many pages it hits
  const list = Object.values(issues);
  const W = { error: 12, warn: 5, info: 1 };
  const score = cat => {
    let s = 100;
    list.filter(x => x.cat === cat).forEach(x => { const share = x.pages.length ? Math.min(1, x.pages.length / pages.length * 4) : 1; s -= W[x.sev] * (0.4 + 0.6 * share); });
    return Math.max(0, Math.round(s));
  };
  const byLang = {};
  rows.forEach(r => { byLang[r.lang] = (byLang[r.lang] || 0) + 1; });
  const ord = { error: 0, warn: 1, info: 2 };
  list.sort((a, b) => ord[a.sev] - ord[b.sev] || b.pages.length - a.pages.length);

  const out = {
    at: new Date().toISOString(), url: URL, psKey: site.pagespeedKey || "",
    scores: { seo: score("seo"), geo: score("geo"), tech: score("tech") },
    counts: { pages: pages.length, langs: byLang, words: rows.reduce((a, r) => a + r.words, 0), links: linksChecked, kb: Math.round(bytes / 1024), images: imgs.length, posts: live.length, lastPost, sitemap: smCount, ld },
    issues: list, checks, pages: rows
  };
  fs.mkdirSync(path.join(OUT, "admin"), { recursive: true });
  fs.writeFileSync(path.join(OUT, "admin", "audit.json"), JSON.stringify(out));
  return out;
};
