// The longer part of each company page (corporate accounts, suppliers, B2B, partnerships), one file per language in
// build/company-info/: per kind a heading and intro paragraphs (h, intro), the steps (stepsH, steps) and questions
// with answers (faqH, faq, also sent as FAQPage data). Plain text; build.js fills {brand} {min} {wait} {phone}.
module.exports = Object.fromEntries(["en", "tr", "ru", "de", "fr", "it", "nl", "ar"].map(l => [l, require("./company-info/" + l)]));
