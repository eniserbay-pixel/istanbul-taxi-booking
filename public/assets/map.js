// Istanbul transfer map (/istanbul-transfer-map and its category pages): pick a start (IST, SAW, Galataport) and a
// destination on the map or in the list, or a place (hotel, mall, hospital...) from its pin or its "Show route";
// the card shows km, minutes and the four cars' prices, booked with the place as the drop-off. Zoom with the buttons, the preset
// views, ctrl/⌘ + wheel or a pinch; drag to move. Data comes from window.TMAP (build/build.js mapPage).
(function () {
  "use strict";
  var D = window.TMAP, root = document.querySelector("[data-tmap]");
  if (!D || !root) return;
  var $ = function (s, r) { return (r || root).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || root).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var fill = function (t, v) { return String(t).replace(/\{(\w+)\}/g, function (m, k) { return v[k] != null ? v[k] : m; }); };
  var svg = $("[data-map]"), lines = $("[data-lines]"), cardEl = $("[data-card]"), T = D.T;
  var scaled = $$(".sc", svg);
  var NS = "http://www.w3.org/2000/svg";
  var S = D.s || {}, ST = D.ST || {};
  var st = { from: "IST", to: "sultanahmet", item: null, rev: false, cx: D.W / 2, cy: D.H / 2, z: 1 };
  if (D.first && S[D.first]) { st.item = D.first; st.to = S[D.first].zone; }
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- View: centre and zoom → viewBox; markers and labels keep their size ----
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function apply() {
    var w = D.W / st.z, h = D.H / st.z;
    st.cx = clamp(st.cx, w / 2, D.W - w / 2);
    st.cy = clamp(st.cy, h / 2, D.H - h / 2);
    svg.setAttribute("viewBox", [st.cx - w / 2, st.cy - h / 2, w, h].map(function (n) { return Math.round(n * 10) / 10; }).join(" "));
    var k = "scale(" + (1 / st.z).toFixed(4) + ")";
    scaled.forEach(function (g) { g.setAttribute("transform", k); });
    svg.classList.toggle("k2", st.z >= 1.9);
    svg.classList.toggle("k3", st.z >= 3.5);
    svg.classList.toggle("zoomed", st.z > 1.05);
  }
  var anim;
  function go(cx, cy, z) {
    z = clamp(z, 1, 9);
    cancelAnimationFrame(anim);
    if (reduce) { st.cx = cx; st.cy = cy; st.z = z; return apply(); }
    var a = { cx: st.cx, cy: st.cy, z: st.z }, t0 = performance.now();
    (function step(now) {
      var p = Math.min(1, (now - t0) / 450), e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      st.cx = a.cx + (cx - a.cx) * e; st.cy = a.cy + (cy - a.cy) * e; st.z = a.z * Math.pow(z / a.z, e);
      apply();
      if (p < 1) anim = requestAnimationFrame(step);
    })(t0);
  }
  // fit the start and the destination in view
  function fit() {
    var a = D.z[st.from].xy, b = st.item ? S[st.item].xy : D.z[st.to].xy;
    var bw = Math.abs(a[0] - b[0]) + 120, bh = Math.abs(a[1] - b[1]) + 120;
    go((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, Math.min(D.W / bw, D.H / bh, 6));
  }

  // ---- Route lines, markers, list and card ----
  function curve(a, b) {
    var p = D.z[a].xy, q = typeof b === "string" ? D.z[b].xy : b, dx = q[0] - p[0], dy = q[1] - p[1];
    return "M" + p[0] + " " + p[1] + "Q" + Math.round((p[0] + q[0]) / 2 - dy * .18) + " " + Math.round((p[1] + q[1]) / 2 + dx * .18) + " " + q[0] + " " + q[1];
  }
  function route(to) { return D.r[st.from + "|" + to]; }
  function drawLines() {
    while (lines.firstChild) lines.removeChild(lines.firstChild);
    Object.keys(D.z).forEach(function (id) {
      if (id === st.from || !route(id)) return;
      var p = document.createElementNS(NS, "path");
      p.setAttribute("d", curve(st.from, id));
      p.setAttribute("data-to", id);
      p.setAttribute("vector-effect", "non-scaling-stroke");
      if (id === st.to && !st.item) p.setAttribute("class", "on");
      lines.appendChild(p);
    });
    // a place: its own line from the start to its pin
    if (st.item) {
      var q = document.createElementNS(NS, "path");
      q.setAttribute("d", curve(st.from, S[st.item].xy));
      q.setAttribute("data-item-line", "");
      q.setAttribute("vector-effect", "non-scaling-stroke");
      q.setAttribute("class", "on");
      lines.appendChild(q);
    }
    // the picked route on top
    var on = $("path.on", lines);
    if (on) lines.appendChild(on);
  }
  function bookItem(x) {
    return D.book + "?" + (st.rev ? "from=" + x.zone + "&to=" + st.from + "&pickup=" : "from=" + st.from + "&to=" + x.zone + "&dropoff=") + encodeURIComponent(x.n);
  }
  function itemCard() {
    var x = S[st.item], r = route(x.zone), z = D.z[x.zone], f = D.z[st.from];
    return '<p class="tm-rt">' + (st.rev ? esc(x.n) + " \u2192 " + esc(f.s) : esc(f.s) + " \u2192 " + esc(x.n)) + '<button type="button" class="tm-rev" data-rev aria-label="' + esc(ST.rev) + '">\u21c4</button></p><h3>' + esc(st.rev ? fill(ST.toAirport, { a: f.s }) : x.n) + "</h3>" +
      '<p class="tm-meta">' + (r.km ? "<span>" + fill(T.km, r) + "</span><span>" + fill(T.min, r) + "</span>" : "<span>" + T.noKm + "</span>") + "<span>" + T.side[z.side] + "</span></p>" +
      '<p class="tm-area"><strong>' + esc(ST.zone) + ":</strong> " + esc(z.n) + (x.area ? " \u00b7 " + esc(x.area) : "") + "</p>" +
      '<ul class="tm-cars">' + D.cars.map(function (c, i) { return "<li><span>" + esc(c.n) + " <small>" + fill(T.seats, { n: c.seats }) + "</small></span><strong>\u20ac" + r.p[i] + "</strong></li>"; }).join("") + "</ul>" +
      '<p class="small tm-per">' + esc(ST.per) + '</p><p class="tm-act"><a class="btn btn-y" href="' + esc(bookItem(x)) + '">' + T.book + "</a>" + (r.u ? '<a class="more" href="' + esc(r.u) + '">' + T.details + " \u2192</a>" : "") + "</p>";
  }
  function card() {
    if (st.item) return itemCard();
    var r = route(st.to), z = D.z[st.to], f = D.z[st.from];
    return '<p class="tm-rt">' + esc(f.s) + " → " + esc(z.s) + "</p><h3>" + esc(z.n) + "</h3>" +
      '<p class="tm-meta">' + (r.km ? "<span>" + fill(T.km, r) + "</span><span>" + fill(T.min, r) + "</span>" : "<span>" + T.noKm + "</span>") + "<span>" + T.side[z.side] + "</span></p>" +
      (z.area ? '<p class="tm-area"><strong>' + T.areas + ":</strong> " + esc(z.area) + "</p>" : "") +
      '<ul class="tm-cars">' + D.cars.map(function (c, i) { return "<li><span>" + esc(c.n) + " <small>" + fill(T.seats, { n: c.seats }) + "</small></span><strong>€" + r.p[i] + "</strong></li>"; }).join("") + "</ul>" +
      '<p class="small tm-per">' + T.perCar + '</p><p class="tm-act"><a class="btn btn-y" href="' + esc(r.b) + '">' + T.book + "</a>" + (r.u ? '<a class="more" href="' + esc(r.u) + '">' + T.details + " →</a>" : "") + "</p>";
  }
  function paint() {
    $$(".mk", svg).forEach(function (m) {
      var id = m.getAttribute("data-id");
      m.classList.toggle("from", id === st.from && !m.classList.contains("mk-place"));
      m.classList.toggle("on", id === st.to);
      var r = route(id);
      if (r) m.setAttribute("href", r.u || r.b);
    });
    $$("path", lines).forEach(function (p) { p.classList.toggle("on", p.hasAttribute("data-item-line") || !st.item && p.getAttribute("data-to") === st.to); });
    $$(".mk-sight", svg).forEach(function (m) { m.classList.toggle("sel", m.getAttribute("data-sight") === st.item); });
    var on = $("path.on", lines);
    if (on) lines.appendChild(on);
    $$(".tm-dests a").forEach(function (a) {
      var id = a.getAttribute("data-id"), r = route(id);
      a.parentNode.hidden = id === st.from || !r;
      if (r) { a.setAttribute("href", r.u || r.b); $("b", a).textContent = "€" + r.p[0]; }
      if (id === st.to) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
    $$("[data-from]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-from") === st.from)); });
    cardEl.innerHTML = card();
  }
  function pick(to, zoom) {
    if (!D.z[to] || to === st.from || !route(to)) return false;
    st.to = to;
    if (st.item) { st.item = null; st.rev = false; drawLines(); }
    paint();
    if (zoom) fit();
    return true;
  }
  // a place of the pins: the route to its zone, the line to its pin
  function pickItem(id, zoom) {
    var x = S[id];
    if (!x || !x.zone || !route(x.zone)) return false;
    st.item = id;
    st.to = x.zone;
    drawLines();
    paint();
    if (zoom) fit();
    return true;
  }
  function start(from) {
    st.from = from;
    if (st.item && !route(S[st.item].zone)) st.item = null;
    if (st.to === from || !route(st.to)) st.to = from === "galataport" ? "taksim" : "sultanahmet";
    drawLines();
    paint();
    fit();
  }

  // ---- Events ----
  $$("[data-from]").forEach(function (b) { b.addEventListener("click", function () { start(b.getAttribute("data-from")); }); });
  $$("[data-zoom]").forEach(function (b) { b.addEventListener("click", function () { go(st.cx, st.cy, st.z * (b.getAttribute("data-zoom") === "1" ? 1.7 : 1 / 1.7)); }); });
  $$("[data-view]").forEach(function (b) { b.addEventListener("click", function () { var v = D.views[+b.getAttribute("data-view")]; go(v[0], v[1], v[2]); }); });
  // ---- Sights: pins, pop-up, toggle ----
  var pop = $("[data-pop]");
  function hidePop() {
    pop.hidden = true;
    $$(".mk-sight.on", svg).forEach(function (m) { m.classList.remove("on"); });
  }
  function showSight(id, zoom) {
    var x = S[id];
    if (!x) return;
    var z = D.z[x.zone] || { s: x.area };
    $$(".mk-sight", svg).forEach(function (m) { m.classList.toggle("on", m.getAttribute("data-sight") === id); });
    var can = x.zone && x.zone !== st.from && route(x.zone);
    pop.innerHTML = '<button type="button" class="tm-pop-x" data-pop-x aria-label="' + esc(ST.close) + '">×</button>' +
      (x.img ? '<img src="' + esc(x.img) + '" alt="" width="640" height="420">' : "") +
      '<div class="tm-pop-t"><p class="tm-rt">' + esc(z.s) + "</p><h3>" + esc(x.n) + "</h3>" + (x.tip ? "<p>" + esc(x.about) + '</p><p class="small"><strong>' + esc(ST.tip) + ":</strong> " + esc(x.tip) + "</p>" : '<p class="small"><strong>' + esc(ST.tip) + ":</strong> " + esc(x.about) + "</p>") +
      '<p class="tm-pop-a">' + (can ? '<button type="button" class="btn btn-y btn-sm" data-go-item="' + esc(id) + '">' + esc(D.z[st.from].s) + " \u2192 " + esc(x.n) + " \u00b7 \u20ac" + route(x.zone).p[0] + "</button>" : x.zone ? "" : '<a class="btn btn-y btn-sm" href="' + esc(D.wa) + '" rel="nofollow">' + esc(ST.askWa) + "</a>") +
      '<a class="more" href="' + esc(x.more) + '">' + esc(ST.near) + " →</a></p></div>";
    pop.hidden = false;
    // the pop-up covers the left of a wide map: keep the pin to the right of it
    var zz = Math.max(st.z, 5), wide = svg.getBoundingClientRect().width > 620;
    if (zoom) go(x.xy[0] - (wide ? D.W / zz * .2 : 0), x.xy[1], zz);
  }
  $("[data-sights]").addEventListener("click", function () {
    var on = this.getAttribute("aria-pressed") !== "true";
    this.setAttribute("aria-pressed", String(on));
    svg.classList.toggle("no-sights", !on);
    if (!on) hidePop();
  });
  pop.addEventListener("click", function (e) {
    if (e.target.closest("[data-pop-x]")) { hidePop(); return; }
    var b = e.target.closest("[data-go-item]");
    if (b) { hidePop(); pickItem(b.getAttribute("data-go-item"), true); }
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !pop.hidden) hidePop(); });
  // "Show route" on the place cards below the map: the route and its price, or the pin's pop-up outside the zones
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-route-item]");
    if (!a) return;
    e.preventDefault();
    var tog = $("[data-sights]"), id = a.getAttribute("data-route-item");
    if (tog.getAttribute("aria-pressed") !== "true") tog.click();
    document.getElementById("map").scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    hidePop();
    if (!pickItem(id, true)) showSight(id, true);
  });
  // the swap button in the place card: from the place back to the airport (same price)
  cardEl.addEventListener("click", function (e) {
    if (!e.target.closest("[data-rev]")) return;
    st.rev = !st.rev;
    cardEl.innerHTML = card();
    var b = $("[data-rev]", cardEl);
    if (b) b.focus();
  });

  var dragged = false;
  root.addEventListener("click", function (e) {
    var sg = e.target.closest && e.target.closest("a[data-sight]");
    if (sg) { e.preventDefault(); if (!dragged) { pickItem(sg.getAttribute("data-sight"), false); showSight(sg.getAttribute("data-sight"), false); } return; }
    var a = e.target.closest && e.target.closest("a[data-id]");
    if (!a || !root.contains(a)) return;
    if (dragged) { e.preventDefault(); return; }
    var id = a.getAttribute("data-id");
    // clicking the start itself goes to its price page
    if (id === st.from) { e.preventDefault(); location.href = D.hub[st.from]; return; }
    if (pick(id, true)) {
      e.preventDefault();
      // on a phone the card is under the map: bring it into view when the list was used
      if (!svg.contains(a) && cardEl.getBoundingClientRect().top < 0) cardEl.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
    }
  });

  // drag to move, pinch or ctrl/⌘ + wheel to zoom
  var ptrs = {}, last = null, pinch = null, moved = 0;
  function toMap(clientX, clientY) {
    var r = svg.getBoundingClientRect(), w = D.W / st.z, h = D.H / st.z;
    return [st.cx - w / 2 + (clientX - r.left) / r.width * w, st.cy - h / 2 + (clientY - r.top) / r.height * h];
  }
  function zoomAt(clientX, clientY, z) {
    z = clamp(z, 1, 9);
    var p = toMap(clientX, clientY), r = svg.getBoundingClientRect();
    st.z = z;
    var w = D.W / z, h = D.H / z;
    st.cx = p[0] - (clientX - r.left) / r.width * w + w / 2;
    st.cy = p[1] - (clientY - r.top) / r.height * h + h / 2;
    apply();
  }
  svg.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    ptrs[e.pointerId] = [e.clientX, e.clientY];
    var ids = Object.keys(ptrs);
    if (ids.length === 1) { last = [e.clientX, e.clientY]; moved = 0; dragged = false; }
    if (ids.length === 2) {
      var a = ptrs[ids[0]], b = ptrs[ids[1]];
      pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]), z: st.z };
    }
  });
  svg.addEventListener("pointermove", function (e) {
    if (!ptrs[e.pointerId]) return;
    ptrs[e.pointerId] = [e.clientX, e.clientY];
    var ids = Object.keys(ptrs);
    if (ids.length === 2 && pinch) {
      var a = ptrs[ids[0]], b = ptrs[ids[1]];
      zoomAt((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, pinch.z * Math.hypot(a[0] - b[0], a[1] - b[1]) / pinch.d);
      dragged = true;
      return;
    }
    if (!last || st.z <= 1.01) return;
    var r = svg.getBoundingClientRect(), dx = e.clientX - last[0], dy = e.clientY - last[1];
    moved += Math.abs(dx) + Math.abs(dy);
    if (moved > 6) {
      dragged = true;
      if (!svg.hasPointerCapture(e.pointerId)) svg.setPointerCapture(e.pointerId);
    }
    st.cx -= dx / r.width * D.W / st.z;
    st.cy -= dy / r.height * D.H / st.z;
    last = [e.clientX, e.clientY];
    apply();
  });
  function up(e) {
    delete ptrs[e.pointerId];
    if (Object.keys(ptrs).length < 2) pinch = null;
    if (!Object.keys(ptrs).length) { last = null; setTimeout(function () { dragged = false; }, 0); }
  }
  svg.addEventListener("pointerup", up);
  svg.addEventListener("pointercancel", up);
  svg.addEventListener("wheel", function (e) {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    zoomAt(e.clientX, e.clientY, st.z * Math.pow(1.0018, -e.deltaY));
  }, { passive: false });

  root.classList.add("js");
  apply();
})();
