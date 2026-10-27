// Time wheel: an hour column and a 00/15/30/45 minute column over each <select class="tsel">.
// The select keeps the value and the form field name, so everything that reads or sets it works unchanged.
// Used on the site and in the admin panel; TimeWheel.attach(select) adds it to a select made later.
window.TimeWheel = (function () {
  "use strict";
  var HRS = [], MINS = ["00", "15", "30", "45"], ROW = 44, pop = null, cur = null;
  for (var i = 0; i < 24; i++) HRS.push((i < 10 ? "0" : "") + i);
  var desc = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value");
  function show(sel) { sel._tbtn.textContent = desc.get.call(sel) || "--:--"; }
  function attach(sel) {
    if (sel._tbtn) return;
    var b = document.createElement("button");
    b.type = "button"; b.className = "tbtn"; b.setAttribute("aria-haspopup", "dialog"); b.setAttribute("aria-expanded", "false");
    var lab = sel.closest("label");
    if (lab) b.setAttribute("aria-label", lab.firstChild.textContent.trim());
    sel.parentNode.insertBefore(b, sel.nextSibling);
    sel.classList.add("tsel-hid"); sel.tabIndex = -1; sel.setAttribute("aria-hidden", "true");
    sel._tbtn = b;
    // Code sets the value directly (defaults, address prefill); keep the button text in step
    Object.defineProperty(sel, "value", { configurable: true, get: function () { return desc.get.call(sel); }, set: function (v) { desc.set.call(sel, v); show(sel); } });
    sel.addEventListener("change", function () { show(sel); });
    b.addEventListener("click", function (e) { e.preventDefault(); if (cur === sel) close(); else open(sel); });
    // Tapping the label text opens the wheel too (it would otherwise focus the hidden select)
    if (lab) lab.addEventListener("click", function (e) { if (e.target === lab) { e.preventDefault(); open(sel); } });
    show(sel);
  }
  function col(list, k) {
    return '<div class="tw-col" data-k="' + k + '" tabindex="0" role="listbox"><div class="tw-pad"></div>' +
      list.map(function (x, n) { return '<div class="tw-it" role="option" data-i="' + n + '">' + x + "</div>"; }).join("") + '<div class="tw-pad"></div></div>';
  }
  function idx(c) { return Math.max(0, Math.min(c.children.length - 3, Math.round(c.scrollTop / ROW))); }
  function mark(c) { var n = idx(c); [].slice.call(c.querySelectorAll(".tw-it")).forEach(function (el, j) { el.classList.toggle("on", j === n); el.setAttribute("aria-selected", j === n); }); }
  function commit() {
    if (!pop || !cur) return;
    var cs = [].slice.call(pop.querySelectorAll(".tw-col")), v = HRS[idx(cs[0])] + ":" + MINS[idx(cs[1])];
    if (cur.value === v) return;
    cur.value = v;
    cur.dispatchEvent(new Event("input", { bubbles: true })); cur.dispatchEvent(new Event("change", { bubbles: true }));
  }
  function place() {
    if (!pop || !cur) return;
    var r = cur._tbtn.getBoundingClientRect(), w = pop.offsetWidth, h = pop.offsetHeight;
    var left = Math.min(Math.max(8, r.left), document.documentElement.clientWidth - w - 8);
    var top = r.bottom + 6 + h > window.innerHeight && r.top - 6 - h > 0 ? r.top - 6 - h : r.bottom + 6;
    pop.style.left = (left + window.scrollX) + "px"; pop.style.top = (top + window.scrollY) + "px";
  }
  function open(sel) {
    close(); cur = sel;
    var v = (sel.value || "12:00").split(":"), hi = Math.max(0, HRS.indexOf(v[0])), mi = Math.max(0, MINS.indexOf(v[1]));
    pop = document.createElement("div"); pop.className = "twheel"; pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-label", sel._tbtn.getAttribute("aria-label") || "");
    pop.innerHTML = '<div class="tw-band"></div>' + col(HRS, "h") + '<div class="tw-sep">:</div>' + col(MINS, "m");
    document.body.appendChild(pop);
    var cs = [].slice.call(pop.querySelectorAll(".tw-col"));
    cs[0].scrollTop = hi * ROW; cs[1].scrollTop = mi * ROW;
    cs.forEach(function (c) {
      var tm;
      mark(c);
      c.addEventListener("scroll", function () { mark(c); clearTimeout(tm); tm = setTimeout(commit, 120); }, { passive: true });
      c.addEventListener("click", function (e) { var it = e.target.closest(".tw-it"); if (it) c.scrollTo({ top: +it.getAttribute("data-i") * ROW, behavior: "smooth" }); });
      c.addEventListener("keydown", function (e) {
        var d = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
        if (d) { e.preventDefault(); c.scrollTop = (idx(c) + d) * ROW; }
        else if (e.key === "Enter") { e.preventDefault(); commit(); close(true); }
      });
    });
    sel._tbtn.setAttribute("aria-expanded", "true");
    place(); cs[0].focus({ preventScroll: true });
  }
  function close(refocus) {
    if (!pop) return;
    commit();
    var b = cur && cur._tbtn;
    pop.remove(); pop = null; cur = null;
    if (b) { b.setAttribute("aria-expanded", "false"); if (refocus) b.focus(); }
  }
  document.addEventListener("pointerdown", function (e) { if (pop && !pop.contains(e.target) && !(cur && cur._tbtn.contains(e.target))) close(); });
  document.addEventListener("keydown", function (e) { if (pop && (e.key === "Escape" || e.key === "Tab")) close(e.key === "Escape"); });
  window.addEventListener("resize", place);
  [].forEach.call(document.querySelectorAll("select.tsel"), attach);
  return { attach: attach };
})();
