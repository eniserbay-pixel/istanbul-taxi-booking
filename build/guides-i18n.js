// The guide pages (build/guides.js, in English) in the site's other languages, one file per language in
// build/guides-i18n/: ui (table and heading words) and per guide id the same text fields as guides.js, with the
// language's own path. The table type and the service name stay in guides.js.
const L = ["tr", "ru", "de", "fr", "it", "nl", "ar"];
const T = Object.fromEntries(L.map(l => [l, require("./guides-i18n/" + l)]));
const ui = { en: { perPerson: "Per person", more: "More guides" }, ...Object.fromEntries(L.map(l => [l, T[l].ui])) };
const text = (g, lang) => (lang === "en" ? g : T[lang][g.id]);
module.exports = { ui, text };
