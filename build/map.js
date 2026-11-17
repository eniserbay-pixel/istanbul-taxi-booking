// Istanbul transfer map (/istanbul-transfer-map, English only for now): an interactive map of both airports, the
// cruise port and every price zone of data/pricing.json, with road distance, drive time and the four cars' prices
// of the route picked, then a distance table, area guide, Bosphorus crossings, rush hour and FAQs.
// The map is an inline SVG drawn here from rough coordinates (a schematic, not for navigation); public/assets/map.js
// makes it interactive. Without JavaScript the markers are links to the route pages.

// Map frame: longitude 28.58–29.38, latitude 40.84–41.36, about 15 px per km both ways
const W = 1000, H = 860, LON0 = 28.58, LON1 = 29.38, LAT0 = 40.84, LAT1 = 41.36;
const X = lon => Math.round((lon - LON0) / (LON1 - LON0) * W * 10) / 10;
const Y = lat => Math.round((LAT1 - lat) / (LAT1 - LAT0) * H * 10) / 10;
const pts = list => list.map(([lat, lon]) => X(lon) + " " + Y(lat));

// Sea outline as [lat, lon]: Black Sea coast west to east, down the Bosphorus' European shore, the Marmara coast
// west, round the bottom, the Asian Marmara coast and up the Bosphorus' Asian shore, then the Black Sea east.
const SEA = [
  [41.36, 28.655], [41.348, 28.69], [41.33, 28.72], [41.315, 28.76], [41.30, 28.82], [41.285, 28.87], [41.27, 28.92], [41.255, 28.98], [41.252, 29.03], [41.24, 29.07], [41.232, 29.11],
  [41.215, 29.10], [41.18, 29.075], [41.168, 29.06], [41.155, 29.058], [41.138, 29.06], [41.122, 29.07], [41.112, 29.058], [41.103, 29.055], [41.085, 29.056], [41.077, 29.044],
  [41.067, 29.043], [41.058, 29.036], [41.047, 29.027], [41.041, 29.007], [41.035, 28.995], [41.027, 28.983], [41.022, 28.975], [41.017, 28.973], [41.017, 28.986],
  [41.005, 28.982], [41.002, 28.968], [41.002, 28.95], [40.998, 28.935], [40.99, 28.92], [40.985, 28.905], [40.975, 28.875], [40.972, 28.855], [40.957, 28.825], [40.968, 28.79],
  [40.975, 28.765], [40.985, 28.755], [40.975, 28.72], [40.97, 28.66], [40.99, 28.62], [41.01, 28.58], [40.84, 28.58], [40.84, 29.27],
  [40.873, 29.235], [40.887, 29.19], [40.905, 29.15], [40.922, 29.13], [40.94, 29.11], [40.952, 29.095], [40.957, 29.08], [40.962, 29.062], [40.965, 29.037], [40.978, 29.025],
  [40.99, 29.022], [40.998, 29.018], [41.012, 29.012], [41.02, 29.008], [41.026, 29.012], [41.036, 29.03], [41.046, 29.045], [41.052, 29.052], [41.065, 29.06], [41.075, 29.062],
  [41.083, 29.067], [41.10, 29.068], [41.11, 29.08], [41.12, 29.093], [41.135, 29.098], [41.155, 29.095], [41.175, 29.09], [41.20, 29.12], [41.218, 29.15], [41.228, 29.22],
  [41.215, 29.30], [41.20, 29.38], [41.36, 29.38]
];
const HORN = [
  [41.0215, 28.9765], [41.0255, 28.966], [41.032, 28.958], [41.039, 28.947], [41.047, 28.94], [41.053, 28.934],
  [41.05, 28.931], [41.042, 28.94], [41.035, 28.947], [41.031, 28.951], [41.0265, 28.958], [41.021, 28.965], [41.0175, 28.972]
];
// Princes' Islands: [lat, lon, rx, ry] in px
const ISLANDS = [[40.907, 29.05, 7, 4], [40.881, 29.07, 6, 4], [40.876, 29.094, 9, 5], [40.858, 29.12, 12, 7]];

// Where each price zone and neighbourhood page sits. side: e(urope) or a(sia); lab: label to the r/l/t/b of the dot;
// dense: only labelled once zoomed in (the centre is crowded at full view)
const POS = {
  IST: { at: [41.262, 28.742], side: "e", lab: "r" },
  SAW: { at: [40.898, 29.309], side: "a", lab: "l" },
  galataport: { at: [41.029, 28.982], side: "e", lab: "r", dense: 1 },
  sultanahmet: { at: [41.0065, 28.977], side: "e", lab: "l" },
  taksim: { at: [41.037, 28.986], side: "e", lab: "l", dense: 1 },
  karakoy: { at: [41.0245, 28.9755], side: "e", lab: "l", dense: 1 },
  besiktas: { at: [41.043, 29.006], side: "e", lab: "t", dense: 1 },
  sisli: { at: [41.062, 28.987], side: "e", lab: "l" },
  sariyer: { at: [41.135, 29.045], side: "e", lab: "l" },
  bakirkoy: { at: [40.982, 28.872], side: "e", lab: "b" },
  beylikduzu: { at: [41.0, 28.645], side: "e", lab: "t" },
  kadikoy: { at: [40.99, 29.032], side: "a", lab: "r" },
  uskudar: { at: [41.025, 29.024], side: "a", lab: "r" },
  atasehir: { at: [40.993, 29.12], side: "a", lab: "r" }
};
const PLACE_POS = {
  nisantasi: [41.052, 28.994], levent: [41.081, 29.01], maslak: [41.112, 29.02], ortakoy: [41.0485, 29.024],
  bebek: [41.077, 29.04], eminonu: [41.0168, 28.9705], florya: [40.98, 28.785]
};
// Bridges (two ends) and the Eurasia Tunnel's undersea part, with where their label goes
const CROSS = [
  { id: "b1", name: "15 July Martyrs Bridge", a: [41.047, 29.026], b: [41.044, 29.044], lab: [41.04, 29.07] },
  { id: "b2", name: "Fatih Sultan Mehmet Bridge", a: [41.087, 29.055], b: [41.094, 29.068], lab: [41.09, 29.08] },
  { id: "b3", name: "Yavuz Sultan Selim Bridge", a: [41.199, 29.102], b: [41.204, 29.122], lab: [41.205, 29.135] },
  { id: "t1", name: "Eurasia Tunnel", a: [41.004, 28.981], b: [40.997, 29.017], lab: [41.0, 28.99], tunnel: 1 }
];
const SEA_LABELS = [
  ["Black Sea", 41.33, 29.05, "sea"], ["Sea of Marmara", 40.9, 28.9, "sea"], ["Bosphorus", 41.16, 29.078, "strait"], ["Golden Horn", 41.043, 28.951, "strait"],
  ["EUROPE", 41.2, 28.97, "cont"], ["ASIA", 41.1, 29.25, "cont"], ["Princes' Islands", 40.875, 29.095, "small"]
];
// Preset views: [lat, lon, zoom]
const VIEWS = [["All Istanbul", 41.1, 28.98, 1], ["Old City & Taksim", 41.025, 28.985, 6], ["Bosphorus", 41.09, 29.03, 2.6], ["Asian side", 40.97, 29.12, 2.2]];

// Short original area notes for the area guide and the map's card, by zone
const AREA = {
  sultanahmet: "The historic peninsula south of the Golden Horn, with Hagia Sophia, Topkapı Palace and most of the city's boutique hotels in Sultanahmet, Sirkeci and Laleli. Streets are narrow and partly pedestrian; from Sabiha Gökçen the Eurasia Tunnel comes out right on its coast road.",
  taksim: "The modern centre on the hill above Karaköy: İstiklal Avenue, the big chain hotels around the square and Cihangir's apartment rentals. Most hotels are a short walk from the square itself.",
  karakoy: "The waterfront where the Golden Horn meets the Bosphorus, below Galata Tower. Design hotels, ferry piers and the Galata Bridge across to the Old City.",
  galataport: "Istanbul's cruise terminal on the Tophane waterfront next to Karaköy. Ships dock in the city centre, so Taksim is about {gT} minutes away and Sultanahmet about {gS}.",
  besiktas: "The Bosphorus shore from Dolmabahçe Palace past Ortaköy to Bebek, plus the office towers of Levent and Etiler. Waterfront hotels and the Kabataş and Beşiktaş ferry piers.",
  sisli: "The shopping streets of Nişantaşı, the offices and congress centre around Şişli and Mecidiyeköy, and Maslak's business towers further north.",
  sariyer: "The upper Bosphorus: seaside villages and mansions in Tarabya, Yeniköy, İstinye and Emirgan, only {istKm} km from Istanbul Airport.",
  bakirkoy: "The Marmara coast west of the old city walls: Yeşilköy, Florya and Ataköy, with seaside hotels near the old Atatürk Airport and the Yeşilköy exhibition centre.",
  beylikduzu: "The western suburbs along the E-5 highway: Avcılar, Esenyurt and Beylikdüzü, with residences, universities and the TÜYAP fair centre.",
  kadikoy: "The heart of the Asian side: Moda's cafés, the shops of Bağdat Avenue and the ferries to Karaköy and Eminönü, {sawKm} km from Sabiha Gökçen.",
  uskudar: "The old Asian shore facing the Old City: the Maiden's Tower, Beylerbeyi Palace and the wooden houses of Kuzguncuk and Çengelköy.",
  atasehir: "The Asian side's business district, with new towers, malls and business hotels in Ataşehir, Ümraniye, Kozyatağı and Maltepe, and the closest zone to Sabiha Gökçen at {sawKm} km."
};

// Sights to see near each price zone: pinned on the map and shown as cards. img: a photo in public/img/sights/<id>.webp
// from Pexels (free to use under the Pexels licence; px is the photo's id, linked in the card's credit), or none.
// at: [lat, lon]. Short, practical texts for visitors; opening rules change, so they stay general.
const SIGHTS = [
  { id: "hagia-sophia", zone: "sultanahmet", at: [41.0086, 28.9802], px: 15418709, n: "Hagia Sophia",
    about: "Built as a church in 537 and a mosque again since 2020, its dome was the largest in the world for almost a thousand years.",
    tip: "Visitors are let in outside prayer times. Cover shoulders and knees; women need a headscarf." },
  { id: "blue-mosque", zone: "sultanahmet", at: [41.0054, 28.9768], px: 27634399, n: "Blue Mosque",
    about: "The Sultan Ahmed Mosque of 1616, named for the 20,000 blue İznik tiles inside, with six minarets facing Hagia Sophia.",
    tip: "Free to enter through the visitors' gate; closed to tourists during prayers, longest at Friday noon." },
  { id: "topkapi-palace", zone: "sultanahmet", at: [41.0115, 28.9834], px: 30255455, n: "Topkapı Palace",
    about: "Home of the Ottoman sultans for nearly 400 years: courtyards above the Bosphorus, the Treasury and the Harem.",
    tip: "Closed on Tuesdays. Plan at least three hours and don't skip the Harem." },
  { id: "basilica-cistern", zone: "sultanahmet", at: [41.0084, 28.9779], px: 13762168, n: "Basilica Cistern",
    about: "A 6th-century underground reservoir held up by 336 marble columns, two of them resting on Medusa heads.",
    tip: "Cool even in summer. The queue is shortest right at opening time." },
  { id: "grand-bazaar", zone: "sultanahmet", at: [41.0107, 28.9681], px: 34923589, n: "Grand Bazaar",
    about: "One of the oldest covered markets in the world, about 4,000 shops in 60 streets of carpets, lamps, ceramics and gold.",
    tip: "Closed on Sundays. Bargaining is part of the visit." },
  { id: "spice-bazaar", zone: "sultanahmet", at: [41.0166, 28.9706], px: 14284634, n: "Spice Bazaar",
    about: "The 17th-century Egyptian Bazaar in Eminönü: spices, Turkish delight, dried fruit, nuts and tea.",
    tip: "Ferries along the Bosphorus leave from the Eminönü piers next door." },
  { id: "galata-tower", zone: "karakoy", at: [41.0256, 28.9741], px: 30613677, n: "Galata Tower",
    about: "A Genoese stone tower of 1348 with a balcony all round, looking over the Golden Horn, the Old City and the Bosphorus.",
    tip: "Go early or just before sunset. The streets around it are steep and cobbled." },
  { id: "galata-bridge", zone: "karakoy", at: [41.0199, 28.9731], px: 28913693, n: "Galata Bridge",
    about: "The bridge between Karaköy and Eminönü, lined with anglers on top and fish restaurants underneath.",
    tip: "Walk across at sunset for the classic skyline of the Old City's mosques." },
  { id: "istiklal-avenue", zone: "taksim", at: [41.0335, 28.9778], px: 19137399, n: "İstiklal Avenue",
    about: "A 1.4 km pedestrian street from Taksim Square to Tünel, with the red nostalgic tram, old passages, churches and cafés.",
    tip: "Çiçek Pasajı and the side streets of Asmalımescit are good for dinner." },
  { id: "galataport", zone: "galataport", at: [41.0262, 28.9833], px: 22397989, n: "Galataport & Istanbul Modern",
    about: "The new waterfront promenade by the cruise terminal, with shops, cafés and Istanbul Modern, the city's modern art museum.",
    tip: "A flat, easy walk along the water from Karaköy. Istanbul Modern is closed on Mondays." },
  { id: "dolmabahce-palace", zone: "besiktas", at: [41.0391, 29.0004], px: 16706062, n: "Dolmabahçe Palace",
    about: "The 19th-century palace of the last sultans on the Bosphorus, with a 4.5-tonne crystal chandelier and the room where Atatürk died.",
    tip: "Closed on Mondays. Visits follow a set route inside." },
  { id: "ortakoy-mosque", zone: "besiktas", at: [41.0473, 29.027], px: 17803061, n: "Ortaköy Mosque",
    about: "A small baroque mosque on the water at the foot of the 15 July Martyrs Bridge, the best-known view of the Bosphorus.",
    tip: "Try a kumpir, the stuffed baked potato sold on the square behind it." },
  { id: "nisantasi", zone: "sisli", at: [41.0515, 28.9938], n: "Nişantaşı",
    about: "Istanbul's smartest shopping streets: international fashion houses on Abdi İpekçi Avenue, Turkish designers and elegant cafés.",
    tip: "Walk down through Maçka Park towards Beşiktaş and the Bosphorus." },
  { id: "rumeli-fortress", zone: "sariyer", at: [41.0847, 29.0563], px: 5246076, n: "Rumeli Fortress",
    about: "Built in four months in 1452 by Mehmed II, before the conquest of Constantinople, at the narrowest point of the Bosphorus.",
    tip: "Bebek's waterfront cafés are a 15-minute walk south along the shore." },
  { id: "emirgan-park", zone: "sariyer", at: [41.1085, 29.0515], px: 16457128, n: "Emirgan Park",
    about: "One of the city's largest parks, on a hillside over the Bosphorus, with three restored Ottoman pavilions.",
    tip: "In April it is the centre of the Istanbul Tulip Festival." },
  { id: "florya-mansion", zone: "bakirkoy", at: [40.9706, 28.7942], n: "Florya Atatürk Marine Mansion",
    about: "A summer house on stilts over the Sea of Marmara, built for Atatürk in 1935, by the seaside promenade of Florya and Yeşilköy.",
    tip: "A quiet seaside stop close to the old Atatürk Airport." },
  { id: "mimar-sinan-bridge", zone: "beylikduzu", at: [41.0236, 28.5835], n: "Mimar Sinan Bridge",
    about: "A stone bridge of 1567 by the great architect Sinan, still crossing the Büyükçekmece lagoon on 28 arches, just west of Beylikdüzü.",
    tip: "An easy detour for guests staying in the western suburbs or at the TÜYAP fair centre." },
  { id: "moda", zone: "kadikoy", at: [40.9805, 29.0255], px: 32296875, n: "Moda & Kadıköy market",
    about: "Kadıköy's market streets of fish, cheese and pickles lead to Moda, a seaside neighbourhood with a long coastal park and the nostalgic tram.",
    tip: "Moda's seafront benches are a favourite sunset spot." },
  { id: "haydarpasa-station", zone: "kadikoy", at: [40.9969, 29.0194], px: 28966611, n: "Haydarpaşa Station",
    about: "The grand 1909 terminus on the Asian shore, built as the start of the railway to Baghdad and long the gateway to Anatolia.",
    tip: "Best seen from the Karaköy–Kadıköy ferry, which passes right in front of it." },
  { id: "maidens-tower", zone: "uskudar", at: [41.0211, 29.0041], px: 10123005, n: "Maiden's Tower",
    about: "A small tower on an islet off Üsküdar, a landmark of the Bosphorus for centuries, reached by boat from the shore.",
    tip: "The Salacak promenade facing it is one of the best sunset spots in the city." },
  { id: "beylerbeyi-palace", zone: "uskudar", at: [41.0426, 29.0398], px: 13255135, n: "Beylerbeyi Palace",
    about: "A white marble summer palace of the 1860s on the Asian shore, right below the 15 July Martyrs Bridge.",
    tip: "Smaller and quieter than Dolmabahçe; Çengelköy's waterfront tea gardens are close by." },
  { id: "camlica-mosque", zone: "uskudar", at: [41.0273, 29.0687], px: 34762527, n: "Çamlıca Hill & Mosque",
    about: "The highest hill on the Asian side, crowned by Turkey's largest mosque, with a view over the Bosphorus and the city.",
    tip: "Come for sunset, then go down to Üsküdar's waterfront." },
  { id: "buyukada", zone: "atasehir", at: [40.858, 29.123], px: 33144280, n: "Büyükada, Princes' Islands",
    about: "The largest of the car-free Princes' Islands: wooden mansions, pine woods and a hilltop monastery with a view.",
    tip: "Ferries leave from Kadıköy, Bostancı and Maltepe. Get around on foot, by bike or electric shuttle." }
];
const ST = {
  h: "What to see near each area",
  lead: "The main sights of each part of the city, pinned on the map above. Tap a pin or a card's “Show on map” to find it, and book your transfer to the area it is in.",
  toggle: "Sights", show: "Show on map", tip: "Tip", near: "Read more", transfer: "Transfer from {a}: €{p}", credit: "Photo: Pexels", close: "Close"
};

const T = {
  path: "/istanbul-transfer-map",
  nav: "Transfer map",
  title: "Istanbul Transfer Map · Airports, Districts & Prices",
  desc: "Interactive Istanbul transfer map: both airports, Sultanahmet, Taksim, Kadıköy and Galataport with road distances, drive times and fixed prices from €{min}.",
  h1: "Istanbul transfer map",
  lead: "See where Istanbul's two airports, the cruise port and the main hotel districts are, how far apart they are by road and what a private transfer costs. Pick a starting point, tap a destination and the map shows the distance, the usual drive time and the fixed price of all four cars, from <strong>€{min} per car</strong>.",
  mapH: "Plan your transfer on the map",
  startFrom: "Start from",
  dests: "Destinations",
  groups: { a: "Airports & cruise port", e: "European side", s: "Asian side" },
  views: "Map view",
  zoomIn: "Zoom in", zoomOut: "Zoom out",
  hint: "Tap a dot or a destination below for prices, or a red pin for a sight. Use + and − or the views to zoom; drag to move a zoomed map.",
  mapAlt: "Map of Istanbul with Istanbul Airport, Sabiha Gökçen Airport, Galataport cruise port and the city's transfer zones on both sides of the Bosphorus",
  card: { km: "{km} km by road", min: "about {min} min", noKm: "Distance on request", side: { e: "European side", a: "Asian side" }, perCar: "per car, one way", seats: "up to {n}", book: "Book this transfer", details: "Route details", areas: "Areas at this price" },
  legend: [["air", "Airport"], ["port", "Cruise port"], ["zone", "Price zone"], ["place", "Neighbourhood"], ["sight", "Sight"], ["cross", "Bridge / tunnel"]],
  mapNote: "Prices are per car, one way, and include tolls and parking. Distances and times are by road outside rush hour; the line on the map shows the direction, not the exact road. The map is a simplified sketch, not for navigation.",
  tableH: "Distance and drive time from both airports",
  tableLead: "Every district we serve, measured by road from Istanbul Airport (IST) and Sabiha Gökçen (SAW), with the sedan price. The closer airport is marked.",
  cols: ["Destination", "Side", "Istanbul Airport (IST)", "Sabiha Gökçen (SAW)", "Closer airport"],
  cell: "{km} km · {min} min · €{p}",
  twoH: "Two airports on two continents",
  two: [
    "Istanbul Airport (IST) lies on the Black Sea coast in Arnavutköy, on the European side, {istSult} km by road from Sultanahmet. It handles most long-haul flights and is Turkish Airlines' home. Sabiha Gökçen (SAW) is in Pendik on the Asian side, {sawSult} km from Sultanahmet, and is the base of Pegasus and many low-cost airlines.",
    "Which airport is closer depends on your hotel, not on the city centre. For {eList} Istanbul Airport is nearer. For {aList} Sabiha Gökçen is nearer.",
    "If you can still choose your flight, compare the drive as well as the fare: landing at the farther airport can add up to {maxDiff} minutes and a Bosphorus crossing to your transfer. Between the two airports it is {pairKm} km, about {pairMin} minutes, for €{pairP} per car."
  ],
  crossH: "Crossing the Bosphorus: three bridges and a tunnel",
  crossLead: "Every transfer from Sabiha Gökçen to the European side, and from Istanbul Airport to the Asian side, crosses the Bosphorus. Your driver picks the crossing by live traffic; the toll is already in your price.",
  cross: [
    ["15 July Martyrs Bridge", "The southernmost bridge, between Ortaköy and Beylerbeyi. The short way from the Asian side to Beşiktaş, Taksim and Şişli, and the busiest at rush hour."],
    ["Fatih Sultan Mehmet Bridge", "Between Rumelihisarı and Kavacık on the TEM motorway. Often the choice for Levent, Maslak and Sarıyer."],
    ["Yavuz Sultan Selim Bridge", "The northern bridge near the Black Sea, between Garipçe and Poyrazköy, on the Northern Marmara Motorway. Usually the quickest way between the two airports, as it avoids the city."],
    ["Eurasia Tunnel", "A road tunnel under the sea between Kazlıçeşme and Göztepe. The direct link from Sabiha Gökçen to the Old City and Bakırköy, skipping the bridges' traffic."]
  ],
  areaH: "The city, area by area",
  areaLead: "Each dot on the map is a price zone, not a single address: a hotel anywhere in the areas listed costs the same. For an address outside them, message us on WhatsApp for a fixed price.",
  fromIst: "IST", fromSaw: "SAW", fromPort: "Galataport",
  placesH: "Neighbourhood guides",
  rushH: "Drive times and rush hour",
  rush: [
    "The times on the map are for free-flowing traffic, as at night or at the weekend. On weekday mornings traffic into the centre is heavy, and on weekday evenings the way out of it and the bridges are slowest; allow up to half as long again.",
    "{peak}",
    "Arriving? You don't need to plan for delays: your driver follows your flight, and the first {wait} minutes after landing are free. Leaving? Ask us for a pickup time when you book; we count back from your flight with the traffic of that hour."
  ],
  peak: "Pickups at Istanbul Airport from {istFrom} to {istTo} and at Sabiha Gökçen from {sawFrom} to {sawTo}, the busiest arrival hours, cost {pct}% more. The map shows the normal price.",
  faqH: "Questions about distances and routes",
  faq: [
    ["How far is Istanbul Airport from Sultanahmet?", "About {istSult} km by road, roughly {istSultMin} minutes outside rush hour. A private transfer costs €{istSultP} per car in a sedan for up to 3 passengers."],
    ["Which airport is closer to Taksim?", "{taksimAns}"],
    ["How long is the drive between Istanbul Airport and Sabiha Gökçen?", "About {pairKm} km, roughly {pairMin} minutes, usually over the Yavuz Sultan Selim Bridge. It costs €{pairP} per car in a sedan and €{pairVan} in a minivan."],
    ["How far is Galataport cruise port from the airports?", "About {gIst} km ({gIstMin} min) from Istanbul Airport and {gSaw} km ({gSawMin} min) from Sabiha Gökçen. Taksim and Sultanahmet are 10 to 20 minutes from the terminal."],
    ["Is the price on the map per person?", "No, every price is per car, whatever the number of passengers up to the car's seats: 3 in a sedan, 6 in a minivan or a Mercedes V-Class and 13 in a minibus."],
    ["Does the price change with traffic or the route the driver takes?", "No. The price is fixed when you book and includes tolls, bridges, the Eurasia Tunnel and parking. Only the busy-hour surcharge at the airports and extras you choose, like child seats, are added."]
  ],
  more: "More about your transfer",
  ctaH: "Found your route?",
  ctaP: "Book it in a minute; you pay the driver in cash at the end of the ride."
};

module.exports = { W, H, X, Y, pts, SEA, HORN, ISLANDS, POS, PLACE_POS, CROSS, SEA_LABELS, VIEWS, AREA, SIGHTS, ST, T };
