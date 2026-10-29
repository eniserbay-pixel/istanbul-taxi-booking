// The prices and fees saved in the panel (Fiyatlandırma, stored in Redis, see api/_lib/pricing.js), put over
// data/pricing.json before the pages are built, so the route pages, price tables, guides, blog posts and
// llms.txt show what the panel shows. Without Redis (a local build) or when it cannot be read, the built
// prices stay. A route or vehicle the panel has no price for keeps the built one on the static pages; the
// booking form (which reads /api/pricing) does not offer it.
// apply(P) changes P in place; build.js calls it before the page modules read the prices.
const { execFileSync } = require("child_process");
const Q = require("../public/assets/quote.js");

// Run on its own: prints the panel's config as JSON (the build waits for it, see apply)
if (require.main === module) {
  require("../api/_lib/pricing").get()
    .then(c => process.stdout.write(JSON.stringify({ prices: c.prices, fees: c.fees, zones: c.zones, cars: c.cars })))
    .catch(e => { console.error(e.message); process.exit(1); });
}

function read() {
  const env = process.env;
  if (!(env.KV_REST_API_URL || env.UPSTASH_REDIS_REST_URL) || !(env.KV_REST_API_TOKEN || env.UPSTASH_REDIS_REST_TOKEN)) return null;
  try { return JSON.parse(execFileSync(process.execPath, [__filename], { encoding: "utf8", timeout: 30000 })); } catch (e) {
    console.warn("Panel prices could not be read, building with data/pricing.json: " + e.message);
    return null;
  }
}

function apply(P, cfg) {
  cfg = cfg === undefined ? read() : cfg;
  if (!cfg || !cfg.prices || !cfg.fees) return false;
  const L = Q.live(P, cfg);
  Object.keys(P.prices).forEach(k => {
    const [a, b] = k.split("|"), row = L.prices[k] || L.prices[b + "|" + a] || {};
    Object.keys(row).forEach(c => { if (row[c] > 0) P.prices[k][c] = row[c]; });
  });
  P.rules = L.rules;
  return true;
}

module.exports = { apply, read };
