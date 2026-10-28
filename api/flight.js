// Live flight lookup for the booking form, via AeroDataBox (RapidAPI).
// Needs the AERODATABOX_KEY environment variable in Vercel. Without it the
// endpoint answers 501 and the form falls back to checking the number format only.
const HOST = "aerodatabox.p.rapidapi.com";

function hhmm(t) {
  const s = t && (t.local || t);
  const m = typeof s === "string" && s.match(/(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2})/);
  return m ? { date: m[1], time: m[2] } : null;
}

module.exports = async (req, res) => {
  const key = process.env.AERODATABOX_KEY;
  if (!key) return res.status(501).json({ error: "not_configured" });

  const no = String(req.query.no || "").toUpperCase().replace(/\s+/g, "");
  const date = String(req.query.date || "");
  const to = String(req.query.to || "").toUpperCase();
  if (!/^[A-Z0-9]{2}\d{1,4}$/.test(no) || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: "bad_request" });
  }

  try {
    const r = await fetch(`https://${HOST}/flights/number/${no}/${date}?withAircraftImage=false&withLocation=false`, {
      headers: { "X-RapidAPI-Key": key, "X-RapidAPI-Host": HOST }
    });
    if (r.status === 204 || r.status === 404) {
      res.setHeader("Cache-Control", "s-maxage=600");
      return res.status(200).json({ found: false });
    }
    if (!r.ok) return res.status(502).json({ error: "upstream", status: r.status });
    const list = await r.json();
    const flights = Array.isArray(list) ? list : [];
    // Prefer the leg that lands at the airport the customer booked from (IST or SAW)
    const f = flights.find(x => x.arrival && x.arrival.airport && x.arrival.airport.iata === to) || flights[0];
    if (!f) {
      res.setHeader("Cache-Control", "s-maxage=600");
      return res.status(200).json({ found: false });
    }
    const arr = f.arrival || {}, dep = f.departure || {};
    const sched = hhmm(arr.scheduledTime || arr.scheduledTimeLocal);
    const latest = hhmm(arr.revisedTime || arr.predictedTime) || sched;
    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=300");
    return res.status(200).json({
      found: true,
      airline: f.airline && f.airline.name || "",
      from: dep.airport ? { iata: dep.airport.iata || "", city: dep.airport.municipalityName || dep.airport.name || "" } : null,
      to: arr.airport ? arr.airport.iata || "" : "",
      scheduled: sched,
      latest: latest,
      status: f.status || ""
    });
  } catch (e) {
    return res.status(502).json({ error: "upstream" });
  }
};
