// Search box on every page, and the three-step booking on /book (/ru/bronirovanie).
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var fill = function (t, v) { return String(t).replace(/\{(\w+)\}/g, function (m, k) { return v[k] != null ? v[k] : m; }); };
  var params = new URLSearchParams(location.search);

  // Today in Istanbul (UTC+3), as YYYY-MM-DD
  function today(plus) {
    return new Date(Date.now() + 3 * 3600e3 + (plus || 0) * 864e5).toISOString().slice(0, 10);
  }

  // ---- Search box ----
  $$("[data-search]").forEach(function (f) {
    var ret = $("[data-ret]", f), box = $(".ret", f);
    ["date", "rdate"].forEach(function (n) { f.elements[n].min = today(); });
    // Prefill from the address on the booking page; elsewhere tomorrow at 12:00
    ["from", "to", "date", "time", "pax", "rdate", "rtime"].forEach(function (n) {
      var v = params.get(n);
      if (v && f.elements[n] && (n !== "from" && n !== "to" || !f.elements[n].value || window.BOOK)) f.elements[n].value = v;
    });
    if (!f.elements.date.value) f.elements.date.value = today(1);
    if (!f.elements.time.value) f.elements.time.value = "12:00";
    if (params.get("ret") === "1") ret.checked = true;
    function sync() {
      box.hidden = !ret.checked;
      f.elements.rdate.required = f.elements.rtime.required = ret.checked;
      if (ret.checked && !f.elements.rdate.value) f.elements.rdate.value = f.elements.date.value;
    }
    ret.addEventListener("change", sync);
    sync();
    $("[data-swap]", f).addEventListener("click", function () {
      var a = f.elements.from.value;
      f.elements.from.value = f.elements.to.value;
      f.elements.to.value = a;
    });
    f.addEventListener("submit", function (e) {
      if (f.elements.from.value && f.elements.from.value === f.elements.to.value) { e.preventDefault(); f.elements.to.focus(); return; }
      if (!ret.checked) { f.elements.rdate.disabled = f.elements.rtime.disabled = true; }
    });
  });

  // The language link keeps the chosen route and time on the booking page
  if (location.search) $$("a.lang").forEach(function (a) { a.href = a.getAttribute("href") + location.search; });

  // ---- Booking ----
  var root = $("[data-book]");
  if (!root || !window.BOOK) return;
  var B = window.BOOK, T = B.T, P = B.P, L = B.lang;
  var view = $("[data-view]", root);
  var zoneName = function (id) { var z = Quote.zone(P, id); return z ? z.name[L] : ""; };
  var isAirport = function (id) { var z = Quote.zone(P, id); return z && z.type === "airport"; };
  // 2026-10-28 → "28 Oct 2026" / "28 окт. 2026 г."
  var day = function (d) {
    var t = new Date(d + "T12:00:00Z");
    return isNaN(t) ? d : t.toLocaleDateString(L === "ru" ? "ru-RU" : "en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  };
  var s = {
    from: params.get("from") || "", to: params.get("to") || "", date: params.get("date") || "", time: params.get("time") || "",
    pax: Math.max(1, Math.min(16, +params.get("pax") || 2)),
    ret: params.get("ret") === "1" && params.get("rdate") ? { date: params.get("rdate"), time: params.get("rtime") || "" } : null,
    car: "", bags: 0, childSeats: 0, name: "", email: "", phone: "", flight: "", pickup: "", dropoff: "", note: "",
    retFlight: "", retPickup: "", step: 0
  };
  try { var saved = JSON.parse(sessionStorage.getItem("bk:who") || "null"); if (saved) ["name", "email", "phone"].forEach(function (k) { s[k] = saved[k] || ""; }); } catch (e) { /* storage off */ }

  function q() {
    return Quote.quote(P, { from: s.from, to: s.to, car: s.car, time: s.time, ret: s.ret, childSeats: s.childSeats });
  }
  function steps() {
    $$("[data-step-i]", root).forEach(function (li, i) { li.className = i === s.step ? "on" : i < s.step ? "done" : ""; });
  }
  function summary() {
    return '<div class="summary"><span><b>' + esc(zoneName(s.from)) + " → " + esc(zoneName(s.to)) + "</b></span><span>" + esc(day(s.date)) + " " + esc(s.time) +
      "</span><span>👤 " + s.pax + "</span>" + (s.ret ? "<span>↩ " + esc(day(s.ret.date)) + " " + esc(s.ret.time) + "</span>" : "") + "</div>";
  }
  function wa(text) { return "https://wa.me/" + window.SITE.wa + "?text=" + encodeURIComponent(text); }

  function stepCar() {
    if (!s.from || !s.to || s.from === s.to || !s.date || !s.time) { view.innerHTML = '<p class="sub">' + esc(T.noRoute) + "</p>"; return; }
    if (!Quote.base(P, s.from, s.to, "sedan")) {
      view.innerHTML = summary() + '<p>' + esc(T.noPrice) + '</p><a class="btn btn-y" href="' + wa(zoneName(s.from) + " → " + zoneName(s.to) + " " + s.date + " " + s.time) + '">' + esc(T.whatsapp) + "</a>";
      return;
    }
    var peak = Quote.peakPct(P, s.from, s.time);
    view.innerHTML = summary() + '<div class="pick">' + B.cars.map(function (c) {
      var r = Quote.quote(P, { from: s.from, to: s.to, car: c.id, time: s.time, ret: s.ret, childSeats: 0 });
      var ok = Quote.fits(c, s.pax, 0);
      return '<div class="opt' + (c.popular ? " pop" : "") + '" aria-disabled="' + !ok + '"><img src="' + c.img + '" alt="" width="140" height="70">' +
        "<div><h3>" + esc(c.name[L]) + '</h3><p class="models small">' + esc(c.models[L]) + '</p><p class="cap small"><span>👤 ' + c.seats + "</span><span>🧳 " + c.bags + "</span></p>" +
        (ok ? "" : '<p class="small" style="color:var(--err)">' + esc(T.tooMany) + "</p>") + "</div>" +
        '<div class="price"><div><strong>€' + r.total + "</strong><small>" + esc(s.ret ? T.withReturn : T.oneWay) + (peak ? " · " + esc(T.peak) : "") + "</small></div>" +
        '<button class="btn btn-y btn-sm" type="button" data-car="' + c.id + '"' + (ok ? "" : " disabled") + ">" + esc(T.choose) + "</button></div></div>";
    }).join("") + "</div>";
    $$("[data-car]", view).forEach(function (b) {
      b.addEventListener("click", function () { s.car = b.getAttribute("data-car"); go(1); });
    });
  }

  function field(name, label, type, opts) {
    opts = opts || {};
    var v = s[name];
    var input = type === "textarea" ? '<textarea name="' + name + '" rows="3">' + esc(v) + "</textarea>"
      : type === "select" ? '<select name="' + name + '">' + opts.options.map(function (o) { return "<option" + (+v === o ? " selected" : "") + ">" + o + "</option>"; }).join("") + "</select>"
      : '<input name="' + name + '" type="' + type + '" value="' + esc(v) + '"' + (opts.auto ? ' autocomplete="' + opts.auto + '"' : "") + (opts.req ? " required" : "") + (opts.mode ? ' inputmode="' + opts.mode + '"' : "") + ">";
    return '<label class="' + (opts.full ? "full" : "") + '">' + esc(label) + (opts.help ? ' <span class="help">' + esc(opts.help) + "</span>" : "") + input + '<span class="err" data-err="' + name + '"></span></label>';
  }

  function stepDetails() {
    var car = B.cars.filter(function (c) { return c.id === s.car; })[0];
    var range = function (n) { var a = []; for (var i = 0; i <= n; i++) a.push(i); return a; };
    view.innerHTML = summary() + '<form class="form" novalidate>' +
      field("name", T.name, "text", { req: 1, auto: "name" }) + field("phone", T.phone, "tel", { req: 1, auto: "tel", mode: "tel" }) +
      field("email", T.email, "email", { req: 1, auto: "email", full: 1 }) +
      (isAirport(s.from) ? field("flight", T.flight, "text", { help: T.flightHelp, req: 1 }) : field("pickup", T.pickup, "text", { req: 1 })) +
      (isAirport(s.to) ? "" : field("dropoff", T.dropoff, "text", { req: 1 })) +
      field("bags", T.bags, "select", { options: range(car.bags) }) +
      field("childSeats", fill(T.seats, { seat: P.rules.childSeat }), "select", { options: range(4) }) +
      (s.ret ? '<fieldset><legend>↩ ' + esc(day(s.ret.date)) + " " + esc(s.ret.time) + "</legend>" +
        (isAirport(s.to) ? field("retFlight", T.retFlight, "text") : field("retPickup", T.retPickup, "text", { req: 1, full: 1 })) + "</fieldset>" : "") +
      field("note", T.note, "textarea", { full: 1 }) +
      '<input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '</form><div class="actions"><button class="btn btn-o" type="button" data-back>' + esc(T.back) + '</button><button class="btn btn-y" type="button" data-next>' + esc(T.next) + "</button></div>";
    if (!s.dropoff && !isAirport(s.to)) s.dropoff = "";
    $("[data-back]", view).addEventListener("click", function () { read(); go(0); });
    $("[data-next]", view).addEventListener("click", function () { read(); if (check()) go(2); });
  }
  function read() {
    var f = $("form", view);
    if (!f) return;
    ["name", "phone", "email", "flight", "pickup", "dropoff", "note", "retFlight", "retPickup", "website"].forEach(function (k) { if (f.elements[k]) s[k] = f.elements[k].value.trim(); });
    ["bags", "childSeats"].forEach(function (k) { if (f.elements[k]) s[k] = +f.elements[k].value; });
  }
  function check() {
    var f = $("form", view), first = null;
    $$("[data-err]", f).forEach(function (e) { e.textContent = ""; });
    $$(".bad", f).forEach(function (e) { e.classList.remove("bad"); });
    function bad(name, msg) {
      var el = f.elements[name];
      el.classList.add("bad");
      $('[data-err="' + name + '"]', f).textContent = msg;
      first = first || el;
    }
    $$("[required]", f).forEach(function (el) { if (!el.value.trim()) bad(el.name, T.required); });
    if (s.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s.email)) bad("email", T.invalidEmail);
    if (s.phone && !/^\+?[0-9 ()-]{7,20}$/.test(s.phone)) bad("phone", T.invalidPhone);
    if (first) first.focus();
    return !first;
  }

  function stepReview() {
    var r = q(), car = B.cars.filter(function (c) { return c.id === s.car; })[0];
    var rows = [
      [zoneName(s.from) + " → " + zoneName(s.to), day(s.date) + " " + s.time + (s.flight ? " · " + s.flight : "") + (s.pickup ? " · " + s.pickup : "")],
      s.dropoff ? [T.dropoff, s.dropoff] : null,
      s.ret ? ["↩ " + zoneName(s.to) + " → " + zoneName(s.from), day(s.ret.date) + " " + s.ret.time + (s.retFlight ? " · " + s.retFlight : "") + (s.retPickup ? " · " + s.retPickup : "")] : null,
      [car.name[L], "👤 " + s.pax + " · 🧳 " + s.bags],
      s.childSeats ? [T.seatsLine, s.childSeats + " × €" + P.rules.childSeat + (s.ret ? " × 2" : "")] : null,
      [T.name, s.name + " · " + s.phone + " · " + s.email],
      s.note ? [T.note, s.note] : null
    ].filter(Boolean);
    view.innerHTML = "<h2>" + esc(T.review) + '</h2><table class="review">' + rows.map(function (x) { return "<tr><td>" + esc(x[0]) + "</td><td>" + esc(x[1]) + "</td></tr>"; }).join("") +
      '<tr class="total"><td>' + esc(T.total) + "</td><td>€" + r.total + "</td></tr></table>" +
      '<p class="paynote">' + esc(T.pay) + '</p><label class="check"><input type="checkbox" data-terms> <span>' + B.terms + "</span></label>" +
      '<div data-msg></div><div class="actions"><button class="btn btn-o" type="button" data-back>' + esc(T.back) + '</button><button class="btn btn-y" type="button" data-send>' + esc(T.send) + "</button></div>";
    $("[data-back]", view).addEventListener("click", function () { go(1); });
    $("[data-send]", view).addEventListener("click", sendIt);
  }

  function ref() {
    var c = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789", out = "";
    var rnd = new Uint32Array(4);
    (window.crypto || window.msCrypto).getRandomValues(rnd);
    for (var i = 0; i < 4; i++) out += c[rnd[i] % c.length];
    return "IAT-" + today().replace(/-/g, "").slice(2) + "-" + out;
  }

  function sendIt() {
    var btn = $("[data-send]", view), msg = $("[data-msg]", view);
    msg.innerHTML = "";
    if (!$("[data-terms]", view).checked) { msg.innerHTML = '<p class="alert">' + esc(T.accept) + "</p>"; return; }
    s.ref = s.ref || ref();
    btn.disabled = true;
    var payload = {
      ref: s.ref, lang: L, from: s.from, to: s.to, car: s.car, date: s.date, time: s.time, flight: s.flight, pickup: s.pickup, dropoff: s.dropoff,
      pax: s.pax, bags: s.bags, childSeats: s.childSeats, name: s.name, phone: s.phone, email: s.email, note: s.note, website: s.website,
      ret: s.ret ? { date: s.ret.date, time: s.ret.time, flight: s.retFlight, pickup: s.retPickup } : null
    };
    fetch("/api/booking", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (x) {
        if (!x.ok || !x.j.ok) throw new Error(x.j && x.j.error);
        try { sessionStorage.setItem("bk:who", JSON.stringify({ name: s.name, email: s.email, phone: s.phone })); } catch (e) { /* storage off */ }
        if (window.gtag) window.gtag("event", "booking_complete", { value: q().total, currency: P.currency });
        s.step = 3;
        steps();
        view.innerHTML = '<div class="done"><div class="tick">✓</div><h2>' + esc(T.doneH) + "</h2><p>" + fill(T.doneP, { ref: esc(s.ref), email: esc(s.email) }) + "</p></div>";
        root.scrollIntoView({ behavior: "smooth" });
      })
      .catch(function () {
        btn.disabled = false;
        msg.innerHTML = '<p class="alert">' + esc(T.error) + ' <a href="' + wa(s.ref + " " + zoneName(s.from) + " → " + zoneName(s.to) + " " + s.date + " " + s.time) + '">' + esc(T.whatsapp) + "</a></p>";
      });
  }

  function go(n) {
    s.step = n;
    steps();
    [stepCar, stepDetails, stepReview][n]();
    if (n) root.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  go(0);
})();
