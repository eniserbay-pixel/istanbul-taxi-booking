// Terms of service and privacy notice, one file per language in build/legal-texts/. DRAFTS: have them checked by a
// lawyer before relying on them. Company details (registered address, MERSIS, tax number, KEP, VERBIS, EU
// representative) come from data/site.json → legal; the build warns about the ones still empty.
const LANGS = ["en", "tr", "ru", "de", "fr", "it", "nl", "ar"];
module.exports = Object.fromEntries(LANGS.map(l => [l, require("./legal-texts/" + l)]));

const site = require("../data/site.json");
const empty = Object.entries(site.legal || {}).filter(([, v]) => !v).map(([k]) => k);
if (empty.length) console.warn("legal pages: data/site.json → legal is missing " + empty.join(", "));
