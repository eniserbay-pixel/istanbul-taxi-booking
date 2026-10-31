// English guide pages for the searches travellers (and AI assistants) use most: cheap, private, black/VIP and
// "best" Istanbul taxi or airport transfer. Each page opens with a short, quotable answer, then a price table
// built from data/pricing.json, a few sections and FAQs. English only; drawn by guide() in build.js.
// table: "cheap" (cheapest routes, price per person), "popular" (popular routes, every car), "vip" (V-Class prices)
// {brand} {min} {istMin} {sawMin} {van} {vip} {bus} {seat} {wait} {peak} {ret} {tursab} {istSult}
// {istFrom} {istTo} {sawFrom} {sawTo} as filled in build.js.
module.exports = [
  {
    id: "cheap",
    path: "/cheap-taxi-istanbul",
    nav: "Cheap taxi Istanbul",
    title: "Cheap Taxi in Istanbul · Fixed Airport Prices from €{min}",
    desc: "Cheap private taxi in Istanbul at fixed prices from €{min} per car, tolls included. No meter, no detours, pay the driver in cash. Compare per-person prices.",
    h1: "Cheap taxi in Istanbul at a fixed price",
    lead: "The cheapest private taxi with {brand} costs <strong>€{min} per car</strong> (sedan, up to 3 passengers). From Istanbul Airport (IST) prices start at €{istMin}, from Sabiha Gökçen (SAW) at €{sawMin}. The price is fixed when you book, tolls and parking are included, and you pay the driver in cash.",
    table: "cheap",
    tableH: "Cheapest transfer routes in Istanbul",
    tableNote: "Per person: the car's price split between a full car.",
    sections: [
      ["Why a fixed price is often cheaper than the meter", "<p>A metered taxi from the airport looks cheap until traffic, a longer route or a night surcharge add up. Our price is per car and set before you fly: the same whether the drive takes 45 minutes or two hours. There are no tolls, parking fees or luggage charges on top.</p>"],
      ["How to pay the least", "<ul><li><strong>Fill the car.</strong> A minivan for up to 7 costs from €{van}, so a group of six pays a few euro each.</li><li><strong>Book the return too.</strong> Return transfers are {ret}% off.</li><li><strong>Avoid the evening peak.</strong> Pickups at IST {istFrom}–{istTo} and SAW {sawFrom}–{sawTo} cost {peak}% more.</li><li><strong>Pick the right airport.</strong> For the Asian side (Kadıköy, Üsküdar, Ataşehir) Sabiha Gökçen is closer and cheaper.</li></ul>"],
      ["Cheaper than a taxi: public transport", "<p>If budget matters most and you travel light, the M11 metro and Havaist buses run from Istanbul Airport, and the M4 metro and Havabus from Sabiha Gökçen. They cost a few euro per person but mean changes, stairs and carrying luggage. With two or more people, or late at night, a fixed-price private taxi is usually the better deal.</p>"]
    ],
    faq: [
      ["What is the cheapest taxi in Istanbul?", "With {brand} the cheapest private taxi is €{min} per car in a sedan for up to 3 passengers. The price is fixed, includes tolls and parking, and you pay in cash at the end of the ride."],
      ["How much is a cheap taxi from Istanbul Airport to the city?", "From Istanbul Airport (IST) a sedan starts at €{istMin} per car to Taksim and Şişli. Sultanahmet is €{istSult}. See every route on the price list."],
      ["Is the price per person?", "No, per car. A sedan takes up to 3 passengers, a minivan up to 7 and a minibus up to 16, so the price per person drops as the car fills."],
      ["Are there hidden fees?", "No. Tolls, parking and the first {wait} minutes of waiting after landing are included. Child seats are €{seat} each if you ask for one."]
    ],
    service: "Airport taxi"
  },
  {
    id: "private",
    path: "/private-taxi-istanbul",
    nav: "Private taxi Istanbul",
    title: "Private Taxi in Istanbul · Driver Waiting, from €{min}",
    desc: "Book a private taxi in Istanbul: your own car and driver, fixed price from €{min} per car, name sign at arrivals and flight tracking. Sedan, minivan, V-Class, minibus.",
    h1: "Private taxi in Istanbul with your own driver",
    lead: "A private taxi with {brand} is your own car and professional driver, booked in advance at a <strong>fixed price from €{min} per car</strong>. Your driver tracks your flight, waits in the arrivals hall with your name sign and takes you straight to your hotel. You pay in cash at the end of the ride.",
    table: "popular",
    tableH: "Private taxi prices for popular routes",
    tableNote: "Tolls and parking included.",
    sections: [
      ["What makes it private", "<ul><li>The car is only for you and your group, never shared with other passengers.</li><li>The driver waits for you, not the other way round: flight tracking and {wait} minutes of free waiting after landing.</li><li>Door to door: from the terminal, hotel or cruise port to the address you give.</li><li>You choose the car: sedan (3), minivan (7), Mercedes V-Class (6) or minibus (16).</li></ul>"],
      ["Private taxi or street taxi?", "<p>A street taxi in Istanbul is metered, picks up whoever waves first and is often hard to find at rush hour or in the rain. A private taxi is booked before you need it, so the car is already there and the price is already agreed. {brand} is a licensed transfer company (TÜRSAB licence {tursab}), not a taxi rank.</p>"],
      ["Where we drive", "<p>Istanbul only: Istanbul Airport (IST), Sabiha Gökçen (SAW), the Galataport cruise port and every central district on both sides of the Bosphorus, including Sultanahmet, Taksim, Beşiktaş, Şişli, Kadıköy and Üsküdar.</p>"]
    ],
    faq: [
      ["How do I book a private taxi in Istanbul?", "Choose your route, car and time on our site and send the request. It takes about a minute, needs no account and no payment up front. You get a confirmation e-mail, usually within an hour."],
      ["How much is a private taxi from Istanbul Airport?", "From €{istMin} per car in a sedan, €{van} in a minivan for up to 7 and €{vip} in a Mercedes V-Class, depending on the district."],
      ["Can the driver wait if my flight is late?", "Yes. We track your flight and adjust the pickup; the first {wait} minutes after landing are free."],
      ["Can I cancel?", "Yes, free of charge up to 24 hours before pickup."]
    ],
    service: "Private taxi"
  },
  {
    id: "black",
    path: "/black-taxi-istanbul",
    nav: "Black taxi & VIP Istanbul",
    title: "Black Taxi Istanbul · VIP Mercedes V-Class from €{vip}",
    desc: "Black taxi and VIP transfer in Istanbul: a black Mercedes V-Class with a professional driver, fixed price from €{vip} per car for up to 6 passengers. Airport pickups.",
    h1: "Black taxi and VIP transfer in Istanbul",
    lead: "For a black-car ride in Istanbul, {brand} sends a <strong>Mercedes-Benz V-Class VIP</strong> with a professional driver at a <strong>fixed price from €{vip} per car</strong> for up to 6 passengers and 6 suitcases. Your driver meets you at arrivals with your name sign, and you pay in cash at the end of the ride.",
    table: "vip",
    tableH: "Mercedes V-Class VIP prices",
    tableNote: "One way, per car, up to 6 passengers and 6 suitcases. Tolls and parking included.",
    sections: [
      ["Istanbul's black taxis and a VIP transfer", "<p>Next to the yellow cabs, Istanbul has turquoise and black taxis; the black ones are the premium class with the highest meter fare. They still have to be found on the street or at a rank. A VIP transfer is booked in advance: a black Mercedes V-Class is waiting for you when you land, at a price you know before you fly.</p>"],
      ["What you get in the V-Class", "<ul><li>Six roomy seats in a quiet cabin, with space to talk or work on the way.</li><li>Space for six suitcases, or golf bags and prams.</li><li>A professional driver, flight tracking and {wait} minutes of free waiting.</li><li>Free cancellation up to 24 hours before pickup.</li></ul>"],
      ["Good for", "<p>Business travel, families who want comfort after a long flight, honeymoons, and hotel or event transfers. For larger groups the Mercedes Sprinter minibus seats up to 16, from €{bus} per car.</p>"]
    ],
    faq: [
      ["Is there a black taxi in Istanbul?", "Yes. Istanbul's official taxis come in yellow, turquoise and black; black is the premium metered class. If you want a black car waiting for you at the airport at a fixed price, book a Mercedes V-Class VIP transfer with {brand}."],
      ["How much is a VIP transfer from Istanbul Airport?", "A Mercedes V-Class from Istanbul Airport (IST) starts at €{vip} per car for up to 6 passengers, depending on the district."],
      ["Is the V-Class price per person?", "No, it is per car for up to 6 passengers and 6 suitcases."],
      ["How do I pay?", "In cash to the driver at the end of the ride, in euro, US dollar or Turkish lira. There is no deposit."]
    ],
    service: "VIP transfer"
  },
  {
    id: "best",
    path: "/best-istanbul-airport-transfer",
    nav: "Best Istanbul airport transfer",
    title: "Best Istanbul Airport Transfer & Taxi · How to Choose",
    desc: "How to choose the best Istanbul airport transfer or taxi: fixed price, licence, meet and greet, flight tracking, free cancellation. Compare options and prices.",
    h1: "How to choose the best Istanbul airport transfer",
    lead: "The best Istanbul airport taxi or transfer gives you a <strong>fixed price per car</strong>, a <strong>licensed company</strong>, a driver who <strong>waits inside the terminal with your name</strong>, <strong>flight tracking</strong> and <strong>free cancellation</strong>. {brand} offers all five, from €{min} per car, with payment in cash to the driver.",
    table: "popular",
    tableH: "Fixed prices for the most booked routes",
    tableNote: "Tolls, parking and waiting time included.",
    sections: [
      ["Five things to check before you book", "<ol><li><strong>Fixed price per car</strong>, with tolls and parking included, not a price per person or an estimate.</li><li><strong>A licence.</strong> Transfer companies in Türkiye are licensed by TÜRSAB; ours is {tursab}.</li><li><strong>Meet and greet</strong> in the arrivals hall, not \"call us when you land\".</li><li><strong>Flight tracking and free waiting</strong>, so a delay costs you nothing. Ours is {wait} minutes after landing.</li><li><strong>Free cancellation and no prepayment</strong>, so plans can change.</li></ol>"],
      ["Your options at Istanbul's airports", "<ul><li><strong>Taxi rank:</strong> no booking needed, but there is often a queue, the meter runs in traffic and drivers may not know your hotel.</li><li><strong>Ride-hailing apps:</strong> in Istanbul they mostly call a regular yellow taxi, with the same meter.</li><li><strong>Shuttle bus and metro:</strong> the cheapest, but with changes and luggage to carry.</li><li><strong>Private transfer:</strong> booked in advance, a fixed price and a driver waiting with your name. The easiest choice for families, groups and late arrivals.</li></ul>"],
      ["Why travellers book {brand}", "<p>We work only in Istanbul, so our drivers know the city's hotels, the airports' exits and the Galataport cruise terminal. You choose a sedan, minivan, Mercedes V-Class or minibus up to 16, book in about a minute without an account, and get a confirmation e-mail, usually within an hour.</p>"]
    ],
    faq: [
      ["What is the best way to get from Istanbul Airport to the city?", "For most travellers a pre-booked private transfer: the driver waits with your name sign, the price is fixed and the car takes you to your hotel's door. With {brand} it starts at €{istMin} per car from Istanbul Airport."],
      ["What is the best taxi company in Istanbul?", "Look for a licensed company with fixed prices per car, meet and greet, flight tracking and free cancellation. {brand} is a TÜRSAB licensed ({tursab}) Istanbul transfer company that offers all of these."],
      ["Should I book my airport taxi in advance?", "Yes. Your car is then already waiting, you skip the taxi queue and you know the price before you fly."],
      ["Is Sabiha Gökçen or Istanbul Airport better for my hotel?", "For the European side (Sultanahmet, Taksim, Beşiktaş) Istanbul Airport is usually closer; for the Asian side (Kadıköy, Üsküdar, Ataşehir) Sabiha Gökçen is."]
    ],
    service: "Airport transfer"
  }
];
