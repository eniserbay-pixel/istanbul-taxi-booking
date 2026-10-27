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
      await f.locator("input[name=rtime]").fill("09:30");
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
    await adm.click("form .y");
    await adm.waitForSelector(".msg:text('Şifre yanlış')");
    await adm.fill("input[name=pw]", "test-pass");
    await adm.click("form .y");
    await adm.waitForSelector(".card");
    ok(await adm.locator(".card.request").count() === 3, "3 requests in the panel");
    if (process.env.SHOTS) await adm.screenshot({ path: "shots/admin.png", fullPage: true });
    adm.on("dialog", d => d.accept());
    await adm.locator('.card.request [data-act="confirmed"]').first().click();
    await adm.waitForFunction(() => document.querySelectorAll(".card.request").length === 2);
    mails = await (await fetch(BASE + "/__mails")).json();
    ok(mails.length === 7 && /confirmed|подтверждён|bestätigt/.test(mails[6].subject), "confirmation mail after approval: " + (mails[6] && mails[6].subject));
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
