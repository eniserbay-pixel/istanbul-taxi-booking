// Istanbul transfer map by category (English only for now): sights, hotels, shopping malls, private hospitals,
// stadiums and arenas, ports and marinas. Each category is one page under /istanbul-transfer-map/ with its own
// map layer, a card per place (grouped by price zone) and a transfer widget: pick an airport and the place's
// price zone gives the four cars' fixed prices; the booking link carries the place's name as the drop-off.
// There is deliberately no page per place (one template with only the name changed would be a doorway page).
// Coordinates are approximate (the map is a schematic); zone: null = outside the fixed-price zones (price on request).
// Sights reuse build/map.js SIGHTS (photos and texts).

const CATS = [
  {
    id: "sights", slug: "sights", kind: "TouristAttraction", pin: "sight", nav: "Sights", one: "sight",
    title: "Istanbul Sights Map · Airport Transfer Prices to Every Landmark",
    desc: "Istanbul's main sights by area on a map: Hagia Sophia, Topkapı, Galata Tower, Dolmabahçe and more, with a short guide and fixed transfer prices from both airports.",
    h1: "Istanbul sights on the map, with transfer prices",
    lead: "The landmarks most visitors come for, grouped by the area they are in. Tap a sight to see where it is, read a short guide and get the fixed price of a private transfer from Istanbul Airport or Sabiha Gökçen to its door.",
    intro: [
      "Most of Istanbul's famous sights sit inside a few square kilometres of the Old City, so the area you stay in matters more than the sight itself. Hagia Sophia, the Blue Mosque, Topkapı Palace and the Basilica Cistern are a few minutes' walk apart; the Bosphorus palaces and the Asian side need a car, a ferry or a tram ride.",
      "Pick an airport above the map to compare: the Old City is closer to Istanbul Airport by road, while Kadıköy, Üsküdar and the Princes' Islands ferry piers are nearer Sabiha Gökçen."
    ],
    tipL: "Tip", listH: "Sights by area",
    faq: [
      ["Can the driver drop us right at Hagia Sophia or the Blue Mosque?", "Cars can stop on the streets around Sultanahmet Square, a short walk from both. The square itself is closed to traffic, so the driver drops you at the nearest point the police allow and shows you the way."],
      ["Can we stop at a sight on the way from the airport to the hotel?", "Yes. A short photo stop on the route is free; a longer visit with the driver waiting is charged as waiting time. Write it in the booking note so the right car and time are planned."],
      ["Which airport is better for a trip focused on the Old City?", "Istanbul Airport (IST) is usually the shorter drive to Sultanahmet and Taksim. Sabiha Gökçen (SAW) is closer to the Asian side; both have the same fixed price for the whole car."]
    ]
  },
  {
    id: "hotels", slug: "hotels", kind: "Hotel", pin: "hotel", nav: "Hotels", one: "hotel",
    title: "Istanbul Hotels Map · Airport Transfer Price to Your Hotel",
    desc: "Find your Istanbul hotel on the map and see the fixed private transfer price from Istanbul Airport or Sabiha Gökçen to its door, with the drive time.",
    h1: "Istanbul hotel transfers: find your hotel, see the price",
    lead: "Pick your hotel from the map or the list and the widget shows the fixed price from Istanbul Airport or Sabiha Gökçen to its entrance, the usual drive time and the right car for your group. The booking form opens with your hotel already filled in.",
    intro: [
      "Hotel transfers are priced by the area the hotel is in, not by the hotel. Every hotel in Sultanahmet has the same fixed price from the airport, and so does every hotel on the Beşiktaş shore of the Bosphorus. The price is per car, with luggage, tolls and up to an hour's waiting after landing included.",
      "Arriving late? The driver tracks your flight, waits in the arrivals hall with a name sign and takes you to the hotel's door, even in the Old City's narrow lanes where cars stop at the nearest corner. Hotels with a gate or a drive-in entrance are noted below."
    ],
    tipL: "Arrival note", listH: "Hotels by area",
    other: "Hotel not on the list? Every hotel in a price zone has the same fixed price: pick its area on the map or in the booking form and type the hotel's name.",
    faq: [
      ["My hotel is not on the list. Is the price different?", "No. The price depends on the area, not the hotel. Pick the area your hotel is in on the map (or in the booking form) and write the hotel's name as the drop-off address."],
      ["Will the driver find a hotel in the Old City's small streets?", "Yes. Our drivers know the Sultanahmet and Galata hotels; where a lane is too narrow or closed to cars, they stop at the nearest corner and carry the luggage to the reception."],
      ["Can I book the transfer back to the airport from my hotel?", "Yes. Use the ↔ button in the price card or book a return with the arrival; the price is the same both ways and a return booked together is 10% cheaper."],
      ["Do hotels charge for a transfer they book for me?", "Many hotels book an outside transfer and add a margin. Booking directly gives you the fixed price shown here, paid to the driver in cash or by card."]
    ]
  },
  {
    id: "malls", slug: "shopping-malls", kind: "ShoppingCenter", pin: "mall", nav: "Shopping malls", one: "mall",
    title: "Istanbul Shopping Malls Map · Transfer Prices from the Airports",
    desc: "Istanbul's big shopping malls on a map: İstinye Park, Zorlu Center, Kanyon, Emaar Square and more, with fixed private transfer prices from both airports.",
    h1: "Istanbul shopping malls on the map",
    lead: "Where Istanbul's big shopping malls are, what each is known for and what a private transfer costs from Istanbul Airport or Sabiha Gökçen. Handy for a shopping day, a stop with luggage before a late flight or a group with many bags.",
    intro: [
      "The largest malls sit along the city's business axis on the European side (Levent, Maslak, Şişli) and around Ataşehir on the Asian side, rather than in the historic centre. Most open from 10:00 to 22:00 every day and have a taxi and drop-off bay at the main entrance.",
      "A shopping day often ends with more luggage than it started: a minivan or a Mercedes V-Class has room for the bags, and the driver can wait at the mall while you shop and take you on to the airport."
    ],
    tipL: "Good to know", listH: "Malls by area",
    faq: [
      ["Can the driver wait at the mall and then take us to the airport?", "Yes. Book the transfer from your hotel to the mall and on to the airport, or ask for waiting time in the booking note. The car waits in the mall's car park."],
      ["Which mall is closest to Istanbul Airport?", "On the European side, the malls of Bakırköy and Ataköy and Mall of Istanbul in Başakşehir are the nearest by road to IST. On the Asian side, Viaport Asia is close to Sabiha Gökçen."],
      ["Is there tax-free shopping in Istanbul malls?", "Yes, for visitors from outside Turkey, at shops with the Tax Free sign. Ask for the form at the till and have it stamped at the airport before check-in; allow extra time for it."]
    ]
  },
  {
    id: "hospitals", slug: "hospitals", kind: "Hospital", pin: "hospital", nav: "Private hospitals", one: "hospital",
    title: "Istanbul Private Hospitals Map · Patient Airport Transfers",
    desc: "Istanbul's private hospitals for international patients on a map, with fixed airport transfer prices, roomy cars for a wheelchair and help for the companion.",
    h1: "Airport transfers to Istanbul's private hospitals",
    lead: "Coming to Istanbul for treatment? Find your hospital on the map, see the fixed transfer price from Istanbul Airport or Sabiha Gökçen and book a car with room for a wheelchair, a companion and the luggage of a longer stay.",
    intro: [
      "Istanbul's private hospitals with international patient departments are spread across both sides of the city: Şişli, Maslak and Nişantaşı on the European side, Altunizade, Kozyatağı and Ataşehir on the Asian side, and a group near the old airport in Bakırköy and Yeşilköy. Many patients fly into the airport closer to their hospital to keep the ride short.",
      "Tell us in the booking note if the patient uses a wheelchair or needs help walking: we send a minivan or a V-Class with a low step and room for a folded wheelchair, and the driver helps from the arrivals hall to the hospital's entrance. For a stretcher or medical care on the way, book a medical ambulance through the hospital instead."
    ],
    tipL: "Patient note", listH: "Hospitals by area",
    faq: [
      ["Can you take a patient in a wheelchair?", "Yes, if the patient can move from the wheelchair to a seat. A minivan or V-Class carries a folded wheelchair and the companions' luggage. We do not provide stretcher or medical transport."],
      ["Can the driver take us between the hotel and the hospital during treatment?", "Yes. Book each ride separately or write the dates in the note for a set of transfers. Within the same price zone a short ride is priced on request."],
      ["The hospital arranges a free transfer. Why book one?", "Some hospitals include one; others charge for it or share a car. A private transfer leaves when you land, waits if the flight is late and takes the patient straight to the door."],
      ["Which airport is closer to my hospital?", "Pick your hospital above: the widget shows the price and drive time from both. As a rule, Asian-side hospitals are closer to Sabiha Gökçen and European-side ones to Istanbul Airport."]
    ]
  },
  {
    id: "stadiums", slug: "stadiums-arenas", kind: "StadiumOrArena", pin: "stadium", nav: "Stadiums & arenas", one: "venue",
    title: "Istanbul Stadiums & Arenas Map · Match Day Transfers",
    desc: "Galatasaray, Fenerbahçe and Beşiktaş stadiums and Istanbul's big arenas on a map, with match day tips and fixed transfer prices from both airports.",
    h1: "Istanbul stadiums and arenas: match day transfers",
    lead: "The home grounds of Galatasaray, Fenerbahçe and Beşiktaş and the city's big indoor arenas, on the map with the fixed transfer price from both airports. For fans flying in for a match, a team on tour or a group heading to a final.",
    intro: [
      "Istanbul's three big football clubs play on three different sides of the city: Beşiktaş on the Bosphorus shore in Dolmabahçe, Galatasaray in Seyrantepe north of the business district and Fenerbahçe in Kadıköy on the Asian side. Roads around each stadium close or slow down from about two hours before kick-off.",
      "On match day we drop you at the nearest open point and agree a pick-up spot away from the crowds for the way back. Groups of fans travel best in a minibus with one booking, one driver and one meeting point."
    ],
    tipL: "Match day", listH: "Venues by area",
    faq: [
      ["How close can the car get to the stadium on match day?", "Police close the streets around the stadium before the match. The driver drops you at the last open point, usually a 5 to 15 minute walk, and tells you where to meet after the final whistle."],
      ["Can you pick us up after the match?", "Yes. Book the return with a time about 45 minutes after the end of the match; the driver waits at the agreed point. Leaving straight away usually means sitting in the crowd's traffic."],
      ["Do you take teams and large fan groups?", "Yes. A minibus seats up to 16 with luggage; for bigger groups we send several cars that travel together. Send the group size and flight details on WhatsApp for a quote."]
    ]
  },
  {
    id: "ports", slug: "ports-marinas", kind: "BoatTerminal", pin: "port", nav: "Ports & marinas", one: "pier",
    title: "Istanbul Ports, Piers & Marinas Map · Cruise and Boat Transfers",
    desc: "Galataport cruise terminal, Bosphorus ferry piers and Istanbul's yacht marinas on a map, with fixed transfer prices from both airports for cruises and boats.",
    h1: "Istanbul ports, piers and marinas",
    lead: "Galataport's cruise terminal, the ferry piers for the Bosphorus and the Princes' Islands and the city's yacht marinas, with the fixed transfer price from Istanbul Airport and Sabiha Gökçen. For cruise passengers, yacht charters and private boat tours.",
    intro: [
      "Cruise ships dock at Galataport in Karaköy, in the heart of the city. Bosphorus cruises and private boats leave from piers along both shores, and the yacht marinas sit on the Marmara coast at Ataköy, Kalamış and further east towards Pendik.",
      "A boat day fixes the time you must be at the pier, so allow for traffic: we plan the pick-up from the boarding time and the driver tracks delays. Crews and charter guests can bring heavy luggage and provisions; tell us and we send a car with room for it."
    ],
    tipL: "Boarding tip", listH: "Ports and marinas by area",
    faq: [
      ["How early should we be at Galataport for a cruise?", "Cruise lines usually open check-in three to four hours before departure. Plan to arrive at the time on your boarding pass; we time the pick-up from your hotel or the airport to it."],
      ["Where do Bosphorus cruises and Princes' Islands ferries leave from?", "Public Bosphorus cruises leave from Eminönü; private boat tours from Kuruçeşme, Ortaköy, Bebek and Karaköy. Ferries to the Princes' Islands leave from Kabataş, Eminönü and Bostancı."],
      ["Can you meet us at a marina after a yacht charter?", "Yes. Give us the marina, the boat's name and the expected time; the driver waits at the marina gate and tracks delays by phone or WhatsApp."]
    ]
  }
];

// Places per category: id, name, zone (price zone of data/pricing.json, null = price on request), [lat, lon],
// area (neighbourhood), note (one practical line)
const H = (id, n, zone, at, area, note) => ({ id, n, zone, at, area, note });
const ITEMS = {
  hotels: [
    H("four-seasons-sultanahmet", "Four Seasons Hotel Istanbul at Sultanahmet", "sultanahmet", [41.0069, 28.9781], "Sultanahmet", "A restored Ottoman prison between Hagia Sophia and the Blue Mosque; cars stop at the hotel's own gate."),
    H("sura-hagia-sophia", "Sura Hagia Sophia Hotel", "sultanahmet", [41.0087, 28.9758], "Sultanahmet", "Steps from the Basilica Cistern on a busy tram-side street; the driver stops on the corner and helps with the bags."),
    H("ajwa-sultanahmet", "Ajwa Hotel Sultanahmet", "sultanahmet", [41.0037, 28.9738], "Sultanahmet, Küçük Ayasofya", "On a quiet lane below the Blue Mosque; good for families with lots of luggage."),
    H("arcadia-blue", "Hotel Arcadia Blue Istanbul", "sultanahmet", [41.0058, 28.9714], "Sultanahmet, Çemberlitaş", "Rooftop with Blue Mosque views, a short walk from the Grand Bazaar."),
    H("legacy-ottoman", "Legacy Ottoman Hotel", "sultanahmet", [41.0145, 28.9745], "Sirkeci, Eminönü", "A grand former office building near the Spice Bazaar and the ferries; good for an early Bosphorus cruise."),
    H("sirkeci-mansion", "Sirkeci Mansion", "sultanahmet", [41.0122, 28.9786], "Sirkeci, by Gülhane Park", "Right by Gülhane Park and the tram; the lane in front is narrow, the driver walks you the last steps."),
    H("crowne-plaza-old-city", "Crowne Plaza Istanbul Old City", "sultanahmet", [41.0093, 28.9577], "Laleli, Beyazıt", "On the main tram avenue near the Grand Bazaar, with a drive-up entrance."),
    H("pera-palace", "Pera Palace Hotel", "taksim", [41.0318, 28.9744], "Tepebaşı, Beyoğlu", "The 1892 hotel of the Orient Express guests, a short walk from İstiklal Avenue."),
    H("the-marmara-taksim", "The Marmara Taksim", "taksim", [41.0362, 28.9878], "Taksim Square", "On Taksim Square itself; the drop-off is on the square's service road."),
    H("ceylan-intercontinental", "InterContinental Istanbul", "taksim", [41.0389, 28.9886], "Taksim, Gümüşsuyu", "High above the Bosphorus near Taksim, with a covered drive-in entrance."),
    H("hilton-bosphorus", "Hilton Istanbul Bosphorus", "taksim", [41.0418, 28.9905], "Harbiye", "Large garden hotel next to the congress centre, with its own long driveway."),
    H("grand-hyatt", "Grand Hyatt Istanbul", "taksim", [41.0413, 28.9879], "Harbiye, Taksim", "Opposite the Lütfi Kırdar congress centre, a few minutes' walk from Taksim Square."),
    H("divan-istanbul", "Divan Istanbul", "taksim", [41.0396, 28.9891], "Elmadağ, Taksim", "Next to Gezi Park, with a drive-up entrance on Cumhuriyet Avenue."),
    H("cvk-park-bosphorus", "CVK Park Bosphorus Hotel", "taksim", [41.0373, 28.9915], "Gümüşsuyu, Taksim", "Between Taksim and the Bosphorus, with a short drop-off bay in front."),
    H("the-peninsula", "The Peninsula Istanbul", "galataport", [41.0242, 28.9787], "Karaköy, Galataport", "On the waterfront at Galataport; cars use the port's road entrance."),
    H("the-bank-hotel", "The Bank Hotel Istanbul", "karakoy", [41.0242, 28.9766], "Karaköy", "A former bank on Bankalar Street below Galata Tower, a short walk from the ferries."),
    H("10-karakoy", "10 Karaköy Istanbul", "karakoy", [41.0251, 28.9775], "Karaköy", "In Karaköy's café streets; the street is narrow and cars stop just round the corner."),
    H("novotel-bosphorus", "Novotel Istanbul Bosphorus", "karakoy", [41.0276, 28.9812], "Tophane", "Opposite Galataport and the tram stop, with a drive-up entrance."),
    H("ciragan-palace", "Çırağan Palace Kempinski", "besiktas", [41.0437, 29.0156], "Beşiktaş, Çırağan", "A sultan's palace on the Bosphorus; the driver uses the hotel's guarded gate on Çırağan Avenue."),
    H("four-seasons-bosphorus", "Four Seasons Hotel Istanbul at the Bosphorus", "besiktas", [41.0426, 29.0121], "Beşiktaş", "Waterfront Ottoman mansion; the gate is on the coast road between Beşiktaş and Ortaköy."),
    H("shangri-la-bosphorus", "Shangri-La Bosphorus", "besiktas", [41.0398, 29.0033], "Beşiktaş, Dolmabahçe", "Next to Dolmabahçe Palace and the Beşiktaş stadium; expect closed roads on match days."),
    H("conrad-bosphorus", "Conrad Istanbul Bosphorus", "besiktas", [41.0444, 29.0034], "Beşiktaş", "On the hill above Beşiktaş, a large hotel with a drive-in porch."),
    H("w-istanbul", "W Istanbul", "besiktas", [41.0428, 29.0025], "Akaretler, Beşiktaş", "In the restored Akaretler row houses; the entrance is on a sloping street off the coast road."),
    H("swissotel-bosphorus", "Swissôtel The Bosphorus", "besiktas", [41.0410, 28.9985], "Maçka, Beşiktaş", "In a large park above Dolmabahçe, reached by its own drive."),
    H("radisson-ortakoy", "Radisson Blu Bosphorus Hotel", "besiktas", [41.0478, 29.0251], "Ortaköy", "Right on Ortaköy's waterfront by the mosque; the lanes are busy on weekend evenings."),
    H("les-ottomans", "Les Ottomans", "besiktas", [41.0594, 29.0342], "Kuruçeşme", "A boutique mansion on the water; the gate is on the coast road."),
    H("mandarin-oriental", "Mandarin Oriental Bosphorus", "besiktas", [41.0628, 29.0357], "Kuruçeşme", "Waterfront resort between Kuruçeşme and Arnavutköy, with its own drive-in."),
    H("raffles-istanbul", "Raffles Istanbul", "besiktas", [41.0669, 29.0167], "Zorlu Center", "Inside the Zorlu Center complex; cars use the hotel's own underground drop-off."),
    H("st-regis", "The St. Regis Istanbul", "sisli", [41.0476, 28.9937], "Nişantaşı", "At the edge of Nişantaşı's shopping streets and Maçka Park."),
    H("park-hyatt-macka", "Park Hyatt Istanbul Maçka Palas", "sisli", [41.0457, 28.9953], "Maçka, Nişantaşı", "A 1920s apartment building turned hotel, opposite Maçka Park."),
    H("hilton-bomonti", "Hilton Istanbul Bomonti", "sisli", [41.0596, 28.9807], "Bomonti, Şişli", "Big conference hotel by the old Bomonti brewery, with a covered entrance."),
    H("fairmont-quasar", "Fairmont Quasar Istanbul", "sisli", [41.0652, 28.9925], "Mecidiyeköy", "In the Quasar towers above the metro; the drop-off is on the complex's inner road."),
    H("grand-tarabya", "The Grand Tarabya", "sariyer", [41.1371, 29.0574], "Tarabya", "Landmark hotel on Tarabya Bay, about 35 minutes up the Bosphorus from Taksim."),
    H("six-senses-kocatas", "Six Senses Kocataş Mansions", "sariyer", [41.1235, 29.0600], "Sarıyer, Bosphorus", "Two restored mansions on the upper Bosphorus; quiet, and a long way from the centre's traffic."),
    H("hilton-bakirkoy", "Hilton Istanbul Bakırköy", "bakirkoy", [40.9726, 28.8647], "Bakırköy", "On the Marmara coast road, 15 minutes from the old Atatürk Airport site."),
    H("sheraton-atakoy", "Sheraton Istanbul Ataköy", "bakirkoy", [40.9781, 28.8547], "Ataköy", "Next to the Galleria mall and Ataköy Marina, handy for the Sinan Erdem arena."),
    H("hyatt-regency-atakoy", "Hyatt Regency Istanbul Ataköy", "bakirkoy", [40.9800, 28.8565], "Ataköy", "By the Ataköy Marina towers, with sea views and an easy drive-up."),
    H("crowne-plaza-florya", "Crowne Plaza Istanbul Florya", "bakirkoy", [40.9764, 28.7929], "Florya", "On the coast near Florya beach, one of the closest big hotels to Istanbul Airport's southern road."),
    H("renaissance-polat", "Renaissance Polat Istanbul", "bakirkoy", [40.9618, 28.8188], "Yeşilköy", "Seafront hotel in Yeşilköy with a large car park and congress halls."),
    H("doubletree-moda", "DoubleTree by Hilton Istanbul Moda", "kadikoy", [40.9846, 29.0273], "Moda, Kadıköy", "In Moda's café streets, a walk from the Kadıköy ferry pier."),
    H("wyndham-kalamis", "Wyndham Grand Istanbul Kalamış Marina", "kadikoy", [40.9763, 29.0395], "Kalamış, Fenerbahçe", "Next to Kalamış Marina and the coastal park, near the Fenerbahçe stadium."),
    H("sumahan", "Sumahan on the Water", "uskudar", [41.0515, 29.0507], "Çengelköy", "A former rakı distillery on the Asian shore; cars stop on the narrow coast road."),
    H("bosphorus-palace", "Bosphorus Palace Hotel", "uskudar", [41.0447, 29.0423], "Beylerbeyi", "Small waterfront mansion hotel next to Beylerbeyi Palace."),
    H("hilton-kozyatagi", "Hilton Istanbul Kozyatağı", "atasehir", [40.9705, 29.0975], "Kozyatağı", "Business hotel on the Asian side, 35 to 45 minutes from Sabiha Gökçen."),
    H("marriott-asia", "Istanbul Marriott Hotel Asia", "atasehir", [40.9748, 29.1005], "Kozyatağı", "Off the E-5 highway, convenient for the Asian-side business districts."),
    H("sheraton-atasehir", "Sheraton Istanbul Ataşehir", "atasehir", [40.9925, 29.1215], "Ataşehir", "In the Ataşehir towers, a short ride from Palladium and Watergarden malls.")
  ],
  malls: [
    H("istinye-park", "İstinye Park", "sariyer", [41.1105, 29.0322], "İstinye", "Luxury brands, an open-air street and a food market; the main drop-off is by the north entrance."),
    H("zorlu-center", "Zorlu Center", "besiktas", [41.0667, 29.0172], "Zincirlikuyu", "Designer brands, the Zorlu PSM concert halls and the Raffles hotel above a metro stop."),
    H("kanyon", "Kanyon", "besiktas", [41.0785, 29.0108], "Levent", "Open, canyon-shaped mall on Büyükdere Avenue, linked to the Levent metro."),
    H("metrocity", "Metrocity", "besiktas", [41.0762, 29.0121], "Levent", "Mid-range high-street brands across the road from Kanyon."),
    H("akmerkez", "Akmerkez", "besiktas", [41.0769, 29.0267], "Etiler", "One of the city's first big malls, in leafy Etiler, with an easy taxi bay."),
    H("citys-nisantasi", "City's Nişantaşı", "sisli", [41.0540, 28.9930], "Nişantaşı", "Small luxury mall at the heart of Nişantaşı's boutique streets."),
    H("cevahir", "Cevahir", "sisli", [41.0634, 28.9922], "Şişli", "Very large mall next to the Şişli metro, with a cinema and a big food court."),
    H("vadistanbul", "Vadistanbul", "sisli", [41.1083, 28.9896], "Seyrantepe, Kağıthane", "Open-air and covered sections in a valley, next to Galatasaray's stadium."),
    H("marmara-forum", "Marmara Forum", "bakirkoy", [40.9968, 28.8862], "Bakırköy", "Huge mall with an outlet wing, 30 minutes from Istanbul Airport."),
    H("carousel", "Carousel", "bakirkoy", [40.9795, 28.8718], "Bakırköy centre", "Compact city mall in Bakırköy's shopping district, near the Marmaray station."),
    H("capacity", "Capacity", "bakirkoy", [40.9849, 28.8823], "Bakırköy", "Family mall on the coast road between Bakırköy and Zeytinburnu."),
    H("olivium-outlet", "Olivium Outlet", "bakirkoy", [40.9957, 28.9060], "Zeytinburnu", "Outlet prices on Turkish and international brands, near the city walls."),
    H("marmara-park", "Marmara Park", "beylikduzu", [41.0003, 28.6685], "Esenyurt, Beylikdüzü", "Very large mall on the E-5 highway at the western edge of the city."),
    H("akbati", "Akbatı", "beylikduzu", [41.0560, 28.6795], "Esenyurt", "Big mall in Esenyurt on the western edge of the city, near the TEM highway."),
    H("mall-of-istanbul", "Mall of Istanbul", null, [41.0626, 28.8078], "Başakşehir", "Large mall with an indoor theme park, about 25 minutes from Istanbul Airport."),
    H("emaar-square", "Emaar Square Mall", "uskudar", [41.0107, 29.0700], "Çamlıca, Üsküdar", "Asian side's biggest mall, with an aquarium, by the Çamlıca hill."),
    H("akasya", "Akasya", "uskudar", [41.0005, 29.0549], "Acıbadem", "Mall at the foot of the Akasya towers, with the Kidzania play city."),
    H("capitol", "Capitol", "uskudar", [41.0220, 29.0440], "Altunizade", "Long-standing Asian-side mall next to the Altunizade metrobus stop."),
    H("palladium-atasehir", "Palladium Ataşehir", "atasehir", [40.9893, 29.1142], "Ataşehir", "Mid-range brands and restaurants in the Ataşehir business district."),
    H("watergarden", "Watergarden", "atasehir", [40.9929, 29.1227], "Ataşehir", "Open-air shopping and dining around pools and fountains."),
    H("viaport-asia", "Viaport Asia", null, [40.9065, 29.2950], "Kurtköy, Pendik", "Outlet mall a few minutes from Sabiha Gökçen, good for a stop before a late flight.")
  ],
  hospitals: [
    H("american-hospital", "American Hospital", "sisli", [41.0514, 28.9927], "Nişantaşı", "One of Turkey's oldest private hospitals, in Nişantaşı; drop-off at the main entrance on Güzelbahçe Street."),
    H("acibadem-maslak", "Acıbadem Maslak Hospital", "sisli", [41.1112, 29.0236], "Maslak", "Large hospital with a busy international patient office; the drive-in entrance is on Büyükdere Avenue's service road."),
    H("acibadem-fulya", "Acıbadem Fulya Hospital", "sisli", [41.0585, 29.0012], "Fulya, Şişli", "Central hospital between Şişli and Beşiktaş."),
    H("memorial-sisli", "Memorial Şişli Hospital", "sisli", [41.0573, 28.9737], "Piyalepaşa, Şişli", "Major hospital for transplants and IVF, with an international patients desk."),
    H("florence-nightingale-sisli", "Florence Nightingale Hospital", "sisli", [41.0638, 28.9842], "Şişli", "On Abide-i Hürriyet Avenue, near the Şişli metro."),
    H("liv-vadistanbul", "Liv Hospital Vadistanbul", "sisli", [41.1067, 28.9882], "Seyrantepe", "Modern hospital next to Vadistanbul mall, quick to reach from Istanbul Airport."),
    H("acibadem-taksim", "Acıbadem Taksim Hospital", "taksim", [41.0390, 28.9832], "Taksim", "Small, central hospital a few minutes from the Taksim hotels."),
    H("liv-ulus", "Liv Hospital Ulus", "besiktas", [41.0710, 29.0310], "Ulus, Beşiktaş", "Hospital on the Ulus hill above the Bosphorus, near Akmerkez."),
    H("acibadem-international", "Acıbadem International Hospital", "bakirkoy", [40.9724, 28.8183], "Yeşilköy", "Near the coast in Yeşilköy, long known for international patients."),
    H("acibadem-bakirkoy", "Acıbadem Bakırköy Hospital", "bakirkoy", [40.9808, 28.8739], "Bakırköy", "Central Bakırköy, about 30 minutes from Istanbul Airport."),
    H("medical-park-florya", "Medical Park Florya Hospital", "bakirkoy", [40.9772, 28.7962], "Florya", "Close to the coast road, one of the nearest big hospitals to Istanbul Airport."),
    H("koc-university-hospital", "Koç University Hospital", "bakirkoy", [41.0160, 28.9210], "Topkapı, Zeytinburnu", "University hospital by the old city walls, between the airport road and the Old City."),
    H("acibadem-atakent", "Acıbadem Atakent Hospital", "beylikduzu", [41.0218, 28.7885], "Halkalı, Küçükçekmece", "University hospital on the western side, 25 to 35 minutes from Istanbul Airport."),
    H("acibadem-altunizade", "Acıbadem Altunizade Hospital", "uskudar", [41.0218, 29.0478], "Altunizade, Üsküdar", "Large Asian-side hospital by the Bosphorus Bridge approach."),
    H("medipol-camlica", "Medipol Çamlıca Hospital", "uskudar", [41.0248, 29.0640], "Çamlıca, Üsküdar", "Hospital near the Çamlıca hill and the Emaar mall."),
    H("medical-park-goztepe", "Medical Park Göztepe Hospital", "kadikoy", [40.9795, 29.0640], "Göztepe, Kadıköy", "On the E-5 side of Kadıköy, near Bağdat Avenue."),
    H("acibadem-kozyatagi", "Acıbadem Kozyatağı Hospital", "atasehir", [40.9715, 29.0950], "Kozyatağı", "Asian-side hospital about 35 minutes from Sabiha Gökçen."),
    H("memorial-atasehir", "Memorial Ataşehir Hospital", "atasehir", [40.9868, 29.1255], "Ataşehir", "Large hospital with an international department, close to the TEM highway to Sabiha Gökçen."),
    H("medicana-atasehir", "Medicana Ataşehir Hospital", "atasehir", [40.9905, 29.1050], "Ataşehir", "Hospital in the Ataşehir business area, near the hotels of Kozyatağı."),
    H("florence-nightingale-atasehir", "Florence Nightingale Ataşehir Hospital", "atasehir", [40.9935, 29.1260], "Ataşehir", "On the Asian side's business axis, convenient from Sabiha Gökçen."),
    H("medipol-mega", "Medipol Mega University Hospital", null, [41.0402, 28.8458], "Bağcılar", "Very large hospital complex west of the centre, about 30 minutes from Istanbul Airport.")
  ],
  stadiums: [
    H("rams-park", "RAMS Park (Galatasaray)", "sisli", [41.1033, 28.9908], "Seyrantepe", "Galatasaray's 52,000-seat home; on match days the access roads close well before kick-off."),
    H("tupras-stadium", "Tüpraş Stadium (Beşiktaş)", "besiktas", [41.0394, 28.9946], "Dolmabahçe, Beşiktaş", "Beşiktaş's ground on the Bosphorus by Dolmabahçe Palace; the coast road closes around matches."),
    H("fenerbahce-stadium", "Şükrü Saracoğlu Stadium (Fenerbahçe)", "kadikoy", [40.9876, 29.0368], "Kadıköy", "Fenerbahçe's home in Kadıköy, close to the ferry pier and Bağdat Avenue."),
    H("kasimpasa-stadium", "Recep Tayyip Erdoğan Stadium (Kasımpaşa)", "karakoy", [41.0398, 28.9664], "Kasımpaşa", "Compact Süper Lig ground off the Golden Horn, near Taksim."),
    H("sinan-erdem-dome", "Sinan Erdem Dome", "bakirkoy", [40.9888, 28.8455], "Ataköy", "Turkey's largest indoor arena: basketball finals, concerts and big events, 25 minutes from Istanbul Airport."),
    H("ulker-sports-arena", "Ülker Sports and Event Hall", "atasehir", [40.9945, 29.1008], "Ataşehir", "Fenerbahçe's basketball and volleyball arena on the Asian side."),
    H("volkswagen-arena", "Volkswagen Arena", "sisli", [41.1128, 29.0210], "Maslak", "Concert and event hall in Maslak, near the business towers."),
    H("akatlar-arena", "Beşiktaş Akatlar Arena", "besiktas", [41.0835, 29.0228], "Akatlar, Etiler", "Beşiktaş's basketball arena in the Etiler hills."),
    H("florya-training", "Galatasaray Florya Training Ground", "bakirkoy", [40.9810, 28.7905], "Florya", "Galatasaray's training centre by the sea, near Istanbul Airport's southern road."),
    H("ataturk-olympic-stadium", "Atatürk Olympic Stadium", null, [41.0745, 28.7656], "İkitelli, Başakşehir", "75,000-seat national stadium for cup finals and big games, 20 to 30 minutes from Istanbul Airport."),
    H("basaksehir-stadium", "Başakşehir Fatih Terim Stadium", null, [41.0835, 28.8140], "Başakşehir", "Home of İstanbul Başakşehir, in the north-west of the city.")
  ],
  ports: [
    H("galataport-terminal", "Galataport Cruise Terminal", "galataport", [41.0262, 28.9833], "Karaköy, Tophane", "Istanbul's cruise terminal, with an underground terminal and a drop-off lane by the gates."),
    H("eminonu-pier", "Eminönü Piers", "sultanahmet", [41.0170, 28.9740], "Eminönü", "Starting point of public Bosphorus cruises and ferries to Üsküdar and the islands."),
    H("karakoy-pier", "Karaköy Pier", "karakoy", [41.0217, 28.9775], "Karaköy", "Ferries to Kadıköy and Üsküdar and many private boat tours."),
    H("kabatas-pier", "Kabataş Pier", "taksim", [41.0336, 28.9930], "Kabataş", "Ferries and sea buses to the Princes' Islands; next to the funicular to Taksim."),
    H("besiktas-pier", "Beşiktaş Pier", "besiktas", [41.0416, 29.0063], "Beşiktaş", "Busy commuter pier for Üsküdar and Kadıköy, by the Naval Museum."),
    H("ortakoy-kurucesme", "Ortaköy & Kuruçeşme piers", "besiktas", [41.0530, 29.0290], "Ortaköy, Kuruçeşme", "Where many private yacht and sunset cruises board."),
    H("bebek-bay", "Bebek Bay", "besiktas", [41.0770, 29.0440], "Bebek", "Small pier and moorings for private boats in Bebek's café-lined bay."),
    H("tarabya-bay", "Tarabya Bay", "sariyer", [41.1375, 29.0590], "Tarabya", "Yacht moorings and fish restaurants on the upper Bosphorus."),
    H("rumeli-kavagi", "Rumeli Kavağı Pier", "sariyer", [41.1797, 29.0742], "Rumeli Kavağı", "Northern end of the long Bosphorus cruise, near the Black Sea."),
    H("uskudar-pier", "Üsküdar Pier", "uskudar", [41.0262, 29.0148], "Üsküdar", "Ferries to Eminönü, Karaköy and Beşiktaş, and boats to the Maiden's Tower."),
    H("kadikoy-pier", "Kadıköy Pier", "kadikoy", [40.9928, 29.0228], "Kadıköy", "Main Asian-side ferry pier for the European shore."),
    H("kalamis-marina", "Kalamış & Fenerbahçe Marina", "kadikoy", [40.9750, 29.0420], "Kalamış, Fenerbahçe", "Large yacht marina on the Asian side, by the coastal park."),
    H("bostanci-pier", "Bostancı Pier", "kadikoy", [40.9535, 29.0935], "Bostancı", "Ferries and sea buses to the Princes' Islands from the Asian side."),
    H("atakoy-marina", "Ataköy Marina", "bakirkoy", [40.9720, 28.8645], "Ataköy", "The European side's main yacht marina, 25 minutes from Istanbul Airport."),
    H("west-istanbul-marina", "West Istanbul Marina", "beylikduzu", [40.9690, 28.6640], "Beylikdüzü", "Modern marina on the western Marmara coast, with a boatyard."),
    H("pendik-marina", "Pendik Marina", null, [40.8745, 29.2380], "Pendik", "Marina on the eastern Marmara coast, about 20 minutes from Sabiha Gökçen.")
  ]
};

module.exports = { CATS, ITEMS, path: slug => "/istanbul-transfer-map/" + slug };
