// Counts a confirmed booking in Google Analytics (event booking_confirmed) when the office approves a
// site booking, with the GA4 Measurement Protocol. The site's form only knows that a request was sent
// (booking_complete); the confirmation happens here. Needs GA_API_SECRET (GA4 → Admin → Data streams →
// Measurement Protocol API secrets) and a booking sent with analytics cookies accepted (b.ga); otherwise
// nothing is sent. The event carries the route, vehicle class and price, never names or contact details.
const MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID || "G-4LLM6ED4HE";

async function confirmed(b) {
  const secret = process.env.GA_API_SECRET;
  if (!secret || !b.ga || b.gaSent) return false;
  const leg = (b.legs || [])[0] || {};
  const params = {
    form: b.hourly ? "hourly" : "transfer",
    route: b.hourly ? "hourly-" + b.hourly.hours + "h" : (leg.from || "") + "-" + (leg.to || ""),
    vehicle: b.car || "", value: b.total || 0, currency: b.currency || "EUR"
  };
  const url = "https://www.google-analytics.com/mp/collect?measurement_id=" + encodeURIComponent(MEASUREMENT_ID) + "&api_secret=" + encodeURIComponent(secret);
  try {
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client_id: b.ga, events: [{ name: "booking_confirmed", params }] }) });
    if (!r.ok) return false;
    b.gaSent = true;
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

module.exports = { confirmed };
