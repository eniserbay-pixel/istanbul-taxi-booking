// Public read of the booking form's zones, vehicle types and prices (see _lib/pricing.js).
//   GET /api/pricing            the config as JSON; the site's script loads it on every page view
//   GET /api/pricing?img=<id>   a vehicle image uploaded in the panel
// The CDN keeps the config for 30 seconds, so a price saved in the panel is live within about half a minute.
const pricing = require("./_lib/pricing");

module.exports = async (req, res) => {
  const q = req.query || {};
  try {
    if (q.img) {
      const im = await pricing.getImage(String(q.img));
      if (!im) { res.statusCode = 404; return res.end(); }
      res.setHeader("Content-Type", im.t);
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      return res.end(Buffer.from(im.d, "base64"));
    }
    const p = await pricing.get();
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=0, s-maxage=30, stale-while-revalidate=300");
    res.end(JSON.stringify({ zones: p.zones, cars: p.cars, prices: p.prices, fees: p.fees, hourly: p.hourly, camp: p.camp }));
  } catch (e) {
    console.error(e);
    // The site keeps the prices it was built with
    res.statusCode = 503;
    res.setHeader("Cache-Control", "no-store");
    res.end("{}");
  }
};
