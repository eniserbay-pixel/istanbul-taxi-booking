// End-to-end check: builds nothing, uses public/ as built. Starts tests/server.js, then
// 1. crawls every page in sitemap.xml: 200, one H1, title ≤ 65 chars, description ≤ 160, valid JSON-LD, internal links resolve
// 2. books a transfer in the browser (EN, RU and DE) and checks the "request received" mails
// 3. signs in to /admin (the full office panel), confirms a booking and checks the confirmation mail and voucher
// Needs Playwright (Chromium). Run: node tests/run.js   (SHOTS=1 also saves screenshots to shots/)
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

const PORT = 4400 + Math.floor(Math.random() * 500);
const BASE = "http://127.0.0.1:" + PORT;
let failed = 0;
const ok = (cond, msg) => { if (!cond) { failed++; console.log("FAIL " + msg); } };

(async () => {
  const srv = spawn(process.execPath, [path.join(__dirname, "server.js"), String(PORT)], { stdio: ["ignore", "pipe", "inherit"] });
  await new Promise(r => srv.stdout.once("data", r));
  const browser = await chromium.launch();
  try {
    // 1. Crawl
    const site = require("../data/site.json");
    const sm = fs.readFileSync(path.join(__dirname, "..", "public", "sitemap.xml"), "utf8");
    const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].replace(site.url.replace(/\/$/, ""), ""));
    const seen = new Set(), links = new Set(), titles = new Set();
    for (const u of urls) {
      const r = await fetch(BASE + u);
      ok(r.status === 200, u + " status " + r.status);
      const h = await r.text();
      const title = (h.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
      const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
      ok((h.match(/<h1[\s>]/g) || []).length === 1, u + " has one h1");
      ok(title && title.length <= 70, u + " title length " + title.length + ": " + title);
      ok(!titles.has(title), u + " duplicate title " + title);
      titles.add(title);
      ok(desc.length >= 70 && desc.length <= 165, u + " description length " + desc.length);
      ok(!/\{\w+\}/.test(h.replace(/<script[\s\S]*?<\/script>/g, "")), u + " has an unfilled {placeholder}");
      [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].forEach(m => { try { JSON.parse(m[1]); } catch (e) { ok(false, u + " bad JSON-LD"); } });
      [...h.matchAll(/href="(\/[^"#?]*)/g)].forEach(m => links.add(m[1]));
      seen.add(u);
    }
    for (const l of links) {
      if (seen.has(l) || /^\/(assets|img)\//.test(l)) continue;
      const r = await fetch(BASE + l);
      ok(r.status === 200, "link " + l + " → " + r.status);
    }
    console.log("crawled " + urls.length + " pages, " + links.size + " internal links");

    // 2. Book in the browser
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const errors = [];
    page.on("pageerror", e => errors.push(e.message));
    async function book(start, lang) {
      await page.goto(BASE + start);
      const f = page.locator("form[data-search]").first();
      await f.locator("select[name=from]").selectOption("IST");
      await f.locator("select[name=to]").selectOption("sultanahmet");
      await f.locator("select[name=pax]").selectOption("4");
      await f.locator("[data-ret]").check();
      await f.locator("input[name=date]").fill("2099-01-01");
      await f.locator("input[name=rdate]").fill("2099-01-05");
      // return time through the time wheel: 09 in the hour column, 30 in the minute column
      await f.locator(".ret .tbtn").click();
      await page.locator('.tw-col[data-k=h] .tw-it[data-i="9"]').click();
      await page.locator('.tw-col[data-k=m] .tw-it[data-i="2"]').click();
      await page.waitForTimeout(800);
      await page.keyboard.press("Escape");
      ok(await f.locator("select[name=rtime]").inputValue() === "09:30", lang + ": time wheel sets 09:30");
      await f.locator("button[type=submit]").click();
      await page.waitForSelector("[data-car]");
      ok(await page.locator('[data-car="sedan"]').isDisabled(), lang + ": sedan disabled for 4 passengers");
      if (process.env.SHOTS) await page.screenshot({ path: "shots/book-1-" + lang + ".png", fullPage: true });
      await page.click('[data-car="minivan"]');
      await page.fill("input[name=name]", "Test Traveller");
      await page.fill("input[name=phone]", "+44 7700 900123");
      await page.fill("input[name=email]", "traveller@example.com");
      await page.click("[data-next]");
      ok(await page.locator('[data-err="flight"]').textContent() !== "", lang + ": missing flight is reported");
      await page.fill("input[name=flight]", "tk1980");
      await page.fill("input[name=dropoff]", "Hotel Sultanahmet, Alemdar Mah.");
      await page.fill("input[name=retPickup]", "Hotel Sultanahmet");
      await page.click("[data-next]");
      await page.waitForSelector("[data-send]");
      if (process.env.SHOTS) await page.screenshot({ path: "shots/book-3-" + lang + ".png", fullPage: true });
      await page.click("[data-send]");
      ok(await page.locator(".alert").count() === 1, lang + ": terms must be accepted");
      await page.check("[data-terms]");
      await page.click("[data-send]");
      await page.waitForSelector(".done");
      if (process.env.SHOTS) await page.screenshot({ path: "shots/book-done-" + lang + ".png" });
    }
    await book("/", "en");
    await book("/ru", "ru");
    await book("/de", "de");
    ok(!errors.length, "page errors: " + errors.join("; "));
    let mails = await (await fetch(BASE + "/__mails")).json();
    ok(mails.length === 6, "6 mails after 3 bookings (customer + office), got " + mails.length);
    ok(mails.some(m => /Booking request received/.test(m.subject)), "EN request-received mail");
    ok(mails.some(m => /Заявка на бронирование получена/.test(m.subject)), "RU request-received mail");
    ok(mails.some(m => /Buchungsanfrage erhalten/.test(m.subject)), "DE request-received mail");

    // Server refuses a tampered booking
    const bad = await fetch(BASE + "/api/booking", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ref: "IAT-261026-ABCD", from: "IST", to: "taksim", car: "sedan", pax: 9, date: "2099-01-01", time: "10:00", name: "x", phone: "1", email: "y" }) });
    ok(bad.status === 400, "invalid booking refused");

    // 3. Admin
    // a booking and a driver saved by the first ITB panel, read in today's shape
    await fetch(BASE + "/__redis", { method: "POST", body: JSON.stringify({
      "bk:900": { id: 900, ref: "IAT-261020-OLD1", lang: "en", from: "IST", to: "taksim", car: "sedan", date: "2099-01-01", time: "12:00", flight: "TK1", pickup: "", dropoff: "Hotel X", pax: 2, bags: 2, childSeats: 0, ret: null, name: "Old Booking", phone: "+44 7700 900111", email: "old@example.com", status: "confirmed", price: { out: 42, back: 0, seats: 0, total: 42 }, assign: { out: { id: "d1", name: "Ali", phone: "+90 532 111 11 11", plate: "34 AB 12", car: "Passat" } }, history: [], createdAt: "2026-10-20T10:00:00Z", updatedAt: "2026-10-20T10:00:00Z" },
      "z:bk:idx": [900, Date.parse("2026-10-20T10:00:00Z")],
      "drv": [{ id: "d1", name: "Ali", phone: "+90 532 111 11 11", plate: "34 AB 12", car: "Passat", note: "" }]
    }) });
    const adm = await browser.newPage({ viewport: { width: 1366, height: 900 } });
    const admErr = [];
    adm.on("pageerror", e => admErr.push(e.message));
    adm.on("dialog", d => d.accept());
    await adm.goto(BASE + "/admin");
    await adm.fill("#pw", "wrong");
    await adm.click("#login-form button");
    await adm.waitForSelector("#login-err:not([hidden])");
    await adm.fill("#pw", "test-pass");
    await adm.click("#login-form button");
    await adm.waitForSelector("#nav a");
    ok(await adm.locator("#nav a").count() >= 17, "panel menu has every section");
    await adm.goto(BASE + "/admin#rezervasyonlar");
    await adm.waitForSelector("table");
    const rows = await adm.locator("main").textContent();
    ok(/Old Booking/.test(rows) && /42 €/.test(rows), "old booking shows in the new panel");
    ok((rows.match(/Test Traveller/g) || []).length >= 3, "the 3 site bookings are in the panel");
    // the site's price: IST → Sultanahmet minivan 64 €, return with 10 % off 58 €
    ok(/122 €/.test(rows), "site booking total is the price list's 122 €");
    if (process.env.SHOTS) await adm.screenshot({ path: "shots/admin.png", fullPage: true });
    // approve a site booking from its detail
    await adm.locator('[data-view]').first().click();
    await adm.click("#d-ok");
    await adm.waitForTimeout(1500);
    mails = await (await fetch(BASE + "/__mails")).json();
    const conf = mails[mails.length - 1];
    ok(mails.length === 7 && /traveller@example.com/.test(conf.to), "confirmation mail after approval: " + (conf && conf.subject));
    ok(/ITB Transfer|istanbultaxibooking/.test(conf.html) && !/istanbulairportpickups|Istanbul Airport Pickups/i.test(conf.html), "mail is ITB's");
    ok((conf.attachments || []).some(a => /\.pdf$/.test(a.filename)), "voucher PDF attached");
    // the old panel's driver is offered on Operasyonlar
    await adm.goto(BASE + "/admin#araclar");
    await adm.waitForTimeout(800);
    ok(/Ali/.test(await adm.locator("main").textContent()), "old driver listed under Araç/Tedarik");
    for (const v of ["genel-bakis", "operasyonlar", "yeni", "uetds", "partnerler", "b2b-fiyat", "musteriler", "aranacaklar", "basvurular", "raporlar", "analitik", "fiyatlandirma", "arac-tipleri", "telegram"]) {
      await adm.goto(BASE + "/admin#" + v);
      await adm.waitForTimeout(500);
    }
    // an application from a Company page shows under Başvurular
    const ap = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await ap.goto(BASE + "/company/become-a-supplier");
    await ap.click(".co-form button[type=submit]");
    ok(await ap.locator(".co-form .alert").count() === 1, "application: required fields are reported");
    await ap.selectOption(".co-form select[name=stype]", "driver");
    await ap.fill(".co-form input[name=name]", "Hasan Sürücü");
    await ap.fill(".co-form input[name=phone]", "+90 532 222 22 22");
    await ap.fill(".co-form input[name=city]", "Pendik");
    await ap.check('.co-form input[name=classes][value=minivan]');
    await ap.click(".co-form button[type=submit]");
    await ap.waitForSelector(".co-form .done");
    if (process.env.SHOTS) await ap.screenshot({ path: "shots/company.png", fullPage: true });
    await ap.close();
    await adm.goto(BASE + "/admin#basvurular");
    await adm.reload();
    await adm.waitForSelector(".apc");
    const apc = await adm.locator(".apc").first().textContent();
    ok(/Hasan Sürücü/.test(apc) && /Taşıyıcı/.test(apc) && /Minivan/.test(apc), "application in the panel: " + apc.slice(0, 80));
    ok(!admErr.length, "panel page errors: " + admErr.join("; "));
    // the partners' page and the page a customer answers a change on
    for (const u of ["/b2b", "/booking-change?t=x"]) ok((await fetch(BASE + u)).status === 200, u + " opens");

    if (process.env.SHOTS) {
      for (const [u, n, w] of [["/", "home", 1366], ["/", "home-m", 390], ["/istanbul-airport-taxi-to-taksim", "route", 1366], ["/ru/taksi-iz-sabiha-gokchen-v-kadikoy", "route-ru-m", 390], ["/ru", "home-ru", 1366], ["/ru/blog/pochemu-trudno-najti-taksi-v-stambule", "blog-ru-m", 390]]) {
        const p = await browser.newPage({ viewport: { width: w, height: 900 } });
        await p.goto(BASE + u);
        await p.screenshot({ path: "shots/" + n + ".png", fullPage: true });
        await p.close();
      }
    }
  } finally {
    await browser.close();
    srv.kill();
  }
  console.log(failed ? failed + " check(s) failed" : "all checks passed");
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
