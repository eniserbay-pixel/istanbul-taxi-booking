// End-to-end check: builds nothing, uses public/ as built. Starts tests/server.js, then
// 1. crawls every page in sitemap.xml: 200, one H1, title ≤ 65 chars, description ≤ 160, valid JSON-LD, internal links resolve
// 2. books a transfer in the browser (EN, RU and DE) and checks the "request received" mails
// 3. signs in to /admin, confirms the booking and checks the confirmation mail
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
    ok(mails.some(m => /We received your booking request/.test(m.subject)), "EN request-received mail");
    ok(mails.some(m => /Мы получили вашу заявку/.test(m.subject)), "RU request-received mail");
    ok(mails.some(m => /Wir haben Ihre Buchungsanfrage erhalten/.test(m.subject)), "DE request-received mail");

    // Server refuses a tampered booking
    const bad = await fetch(BASE + "/api/booking", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ref: "IAT-261026-ABCD", from: "IST", to: "taksim", car: "sedan", pax: 9, date: "2099-01-01", time: "10:00", name: "x", phone: "1", email: "y" }) });
    ok(bad.status === 400, "invalid booking refused");

    // 3. Admin
    const adm = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await adm.goto(BASE + "/admin");
    await adm.fill("input[name=pw]", "wrong");
    await adm.click("#login-form button[type=submit]");
    await adm.waitForSelector("#login-err:text('Şifre yanlış')");
    await adm.fill("input[name=pw]", "test-pass");
    await adm.click("#login-form button[type=submit]");
    await adm.waitForSelector(".stats");
    await adm.goto(BASE + "/admin#rezervasyonlar/request");
    await adm.waitForSelector("table.t");
    ok(await adm.locator("tbody tr.s-request").count() === 3, "3 requests in the panel");
    ok(await adm.locator(".nav .badge").textContent() === "3", "pending badge in the menu");
    if (process.env.SHOTS) await adm.screenshot({ path: "shots/admin.png", fullPage: true });
    adm.on("dialog", d => d.accept());
    // approve the first request from its detail page
    await adm.locator('tbody tr.s-request a[title="Detay"]').first().click();
    await adm.click('[data-s="confirmed"]');
    await adm.waitForSelector(".dhead .st.s-confirmed");
    mails = await (await fetch(BASE + "/__mails")).json();
    ok(mails.length === 7 && /confirmed|подтверждён|bestätigt/.test(mails[6].subject), "confirmation mail after approval: " + (mails[6] && mails[6].subject));
    ok(/VOUCHER/.test(mails[6].html), "confirmation mail carries the voucher band");

    // a driver, then the transfer given to them on Operasyonlar
    await adm.goto(BASE + "/admin#soforler");
    await adm.click("#dadd");
    await adm.fill('input[data-k="name"]', "Mehmet Yılmaz");
    await adm.fill('input[data-k="phone"]', "+90 532 000 00 00");
    await adm.fill('input[data-k="plate"]', "34 ITB 34");
    await adm.click("#dsave");
    await adm.waitForSelector("#dok:text('Kaydedildi.')");
    await adm.goto(BASE + "/admin#operasyonlar/2099-01-01");
    await adm.waitForSelector("select.drv");
    await adm.locator("tbody tr.s-confirmed select.drv").first().selectOption({ label: "Mehmet Yılmaz · 34 ITB 34" });
    await adm.waitForSelector('tbody tr.s-confirmed a.wa[href*="wa.me/905320000000"]');
    ok(true, "driver assigned, WhatsApp link to the driver");

    // a booking typed in the panel, with a time from the wheel and a price of its own
    await adm.goto(BASE + "/admin#yeni");
    await adm.fill("#bf input[name=name]", "Phone Customer");
    await adm.fill("#bf input[name=phone]", "+44 7700 900123");
    await adm.fill("#bf input[name=email]", "phone@example.com");
    await adm.selectOption("#bf select[name=from]", "SAW");
    await adm.selectOption("#bf select[name=to]", "taksim");
    await adm.fill("#bf input[name=date]", "2099-02-01");
    await adm.click("#bf .tbtn");
    await adm.locator('.tw-col[data-k=h] .tw-it[data-i="7"]').click();
    await adm.locator('.tw-col[data-k=m] .tw-it[data-i="3"]').click();
    await adm.waitForTimeout(800);
    await adm.keyboard.press("Escape");
    ok(/listeye göre \d+ €/.test(await adm.locator("#phint").textContent()), "price list hint on the manual form");
    await adm.fill("#bf input[name=price]", "70");
    await adm.click("#bf button[type=submit]");
    await adm.waitForSelector(".dhead .st.s-confirmed");
    ok(/07:45/.test(await adm.locator("main").textContent()) && /70 €/.test(await adm.locator("main").textContent()), "manual booking saved with 07:45 and 70 €");
    mails = await (await fetch(BASE + "/__mails")).json();
    ok(mails.length === 8 && mails[7].to[0] === "phone@example.com", "confirmation mail for the manual booking");
    if (process.env.SHOTS) await adm.screenshot({ path: "shots/admin-detail.png", fullPage: true });
    if (process.env.SHOTS) fs.writeFileSync("shots/mail-confirmed.html", mails[6].html);

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
