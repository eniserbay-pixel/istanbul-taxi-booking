// Page texts in English (the site's main language: visitors are travellers) and Russian (i18n-ru.js).
// {brand} {from} {to} {price} {km} {min} are filled in by build.js.
module.exports = {
  en: {
    htmlLang: "en",
    paths: {
      home: "/", book: "/book", prices: "/prices", terms: "/terms", privacy: "/privacy",
      IST: "/istanbul-airport-taxi", SAW: "/sabiha-gokcen-airport-taxi",
      route: (a, z) => a === "IST" ? `/istanbul-airport-taxi-to-${z}` : `/sabiha-gokcen-airport-taxi-to-${z}`,
      airportPair: "/istanbul-airport-to-sabiha-gokcen-taxi", blog: "/blog"
    },
    assure: [["price", "Fixed prices", "No meter, no surprises"], ["cancel", "Free cancellation", "Up to 24 hours before pickup"], ["clock", "24/7 service", "Every flight, day and night"], ["shield", "Safe travel", "Professional drivers, insured cars"]],
    nav: { prices: "Prices", fleet: "Fleet", how: "How it works", faq: "FAQ", blog: "Blog", book: "Book now", lang: "Русский" },
    ui: { route: "Route", from: "from ", min: "min", terms: "Terms", privacy: "Privacy" },
    blog: { title: "Istanbul Transfer Blog · Taxi Tips for Travellers", desc: "Practical guides for getting around Istanbul: why taxis are hard to find, taxi or transfer at the airport, and how to book your ride in a minute.", h1: "Istanbul transfer blog", lead: "Practical guides for arriving in Istanbul and getting to your hotel without stress.", read: "Read the guide", latest: "From our blog", more: "More guides", updated: "Updated", widgetH: "Book your transfer now" },
    form: {
      title: "Get your fixed price", from: "From", to: "To", date: "Date", time: "Pickup time", pax: "Passengers",
      ret: "Add a return transfer (10% off)", rdate: "Return date", rtime: "Return pickup time", rdiff: "Different return route", rfrom: "Return from", rto: "Return to", submit: "See prices",
      airports: "Airports", districts: "Istanbul", port: "Cruise port", choose: "Choose…", swap: "Swap"
    },
    home: {
      title: "Istanbul Airport Taxi & Private Transfer from €{min} · {brand}",
      desc: "{brand} is an Istanbul transfer company: private airport taxi from IST and Sabiha Gökçen at fixed prices from €{min} per car. Free cancellation, pay in cash.",
      h1: "Istanbul airport taxi and private transfer at a <em>fixed price</em>",
      lead: "{brand} is an Istanbul transfer company. We drive you from Istanbul Airport (IST) or Sabiha Gökçen (SAW) to your hotel in a private car, from €{min} per car. Your driver waits with your name sign and you pay in cash at the end of the ride.",
      fleetH: "Choose your car", fleetLead: "The price is per car, not per person. Tolls, parking and waiting time are included.",
      routesH: "Popular transfer routes in Istanbul", routesLead: "Fixed prices per car, one way. Pickups at IST 15:00–19:00 and SAW 14:45–21:00 cost 30% more.",
      vsH: "Metered taxi or our airport taxi?",
      vs: [["Price", "Changes with traffic and the route the driver takes", "Fixed when you book"], ["At arrivals", "Queue at the taxi rank", "Driver waits with your name sign"], ["Flight delay", "-", "We track your flight, 60 min free waiting"], ["Luggage and groups", "Small yellow cab", "Sedan, minivan, V-Class or minibus up to 16"], ["Payment", "Meter, often cash only", "Cash to the driver in EUR, USD or TRY"]],
      vsCols: ["", "Street taxi", "{brand}"],
      howH: "How it works",
      how: [["Request", "Pick your route, car and time. It takes a minute and no payment is needed."], ["Confirmation", "We check availability and send you a confirmation e-mail, usually within an hour."], ["Ride", "Your driver meets you with your name sign. Pay the fixed price in cash at the end."]],
      meetH: "Where your driver waits",
      ctaH: "Landing in Istanbul soon?", ctaP: "Request your airport taxi now and get your confirmation by e-mail.",
      faqH: "Frequently asked questions"
    },
    faq: [
      ["Is it hard to find a taxi in Istanbul?", "Often, yes. Istanbul has about one taxi per 1,000 residents, a number that has barely changed since the 1990s, and the most common complaint to the municipality is drivers choosing passengers and routes. Queues at the airports, rush hour and rain make it worse. <a href=\"/blog/why-is-it-hard-to-find-a-taxi-in-istanbul\">Read why</a>."],
      ["Why should I book before I arrive?", "Because your car is then already waiting for you. Your driver tracks your flight and stands in the arrivals hall with your name sign: no taxi queue, no explaining your hotel address, no meter and no bargaining. You know the price before you fly. <a href=\"/blog/istanbul-airport-taxi-or-pre-booked-transfer\">Taxi or transfer compared</a>."],
      ["How fast is booking with {brand}?", "About a minute. Choose your route, car and time, enter your name, phone, e-mail and flight number, and send. There is no account and no payment up front. You get a confirmation e-mail, usually within an hour. <a href=\"/blog/how-to-book-istanbul-airport-transfer\">See the steps</a>."],
      ["Is this a regular Istanbul taxi?", "No. {brand} is a licensed transfer company: you get a private car with a professional driver, booked in advance at a fixed price. Many travellers call it an airport taxi; unlike a street taxi there is no meter and the driver meets you inside the terminal."],
      ["How do I pay?", "You pay the driver in cash at the end of the ride, in euro, US dollar or Turkish lira. There is no online payment and no deposit."],
      ["When is my booking confirmed?", "Right after you send the form we e-mail you that we received your request. Once we assign a car we send a confirmation e-mail, usually within an hour."],
      ["What if my flight is late?", "We track your flight and adjust the pickup time. The first 60 minutes after landing are free."],
      ["Is the price per person?", "No, the price is per car. A sedan takes up to 3 passengers, a minivan up to 7, a V-Class up to 6 and a minibus up to 16."],
      ["Can I cancel?", "Yes, free of charge up to 24 hours before pickup. Just reply to your confirmation e-mail or write to us on WhatsApp."]
    ],
    route: {
      title: "{from} Taxi to {to} · Fixed €{price} per Car",
      desc: "Private taxi from {from} to {to}: fixed price from €{price} per car, {km} km, about {min} min. Name sign, flight tracking, pay the driver in cash.",
      h1: "{from} taxi to {to}",
      answer: "A private taxi from {fromLong} to {toLong} costs a fixed <strong>€{price} per car</strong> in a sedan for up to 3 passengers. The {km} km drive takes about {min} minutes outside rush hour. Tolls and parking are included and you pay the driver in cash.",
      answerNoDist: "A private taxi from {fromLong} to {toLong} costs a fixed <strong>€{price} per car</strong> in a sedan for up to 3 passengers. Tolls and parking are included and you pay the driver in cash.",
      pricesH: "Prices from {from} to {to}", car: "Car", seats: "Passengers", bags: "Suitcases", price: "Price per car",
      areaH: "Areas covered by this price", meetH: "Where your driver waits",
      faq: [
        ["How much is a taxi from {from} to {to}?", "With us it is a fixed €{price} per car in a sedan, €{van} in a minivan for up to 7, €{vclass} in a Mercedes V-Class and €{bus} in a minibus for up to 16."],
        ["How long does it take?", "About {min} minutes for the {km} km outside rush hour. Weekday evenings can take longer; the price stays the same."],
        ["Do I pay more if my flight is late?", "No. We track your flight and the first 60 minutes after landing are free."]
      ],
      faqNoDist: 1,
      otherH: "Other routes from {from}", back: "All {from} taxi prices"
    },
    hub: {
      title: "{from} Taxi · Fixed Prices to Every District",
      desc: "Fixed-price private taxi from {from} to Sultanahmet, Taksim, Kadıköy and every central district, from €{price} per car. Name sign and flight tracking.",
      h1: "{from} taxi prices",
      lead: "Fixed prices per car from {fromLong} to Istanbul's central districts. Pick your destination to see all four cars."
    },
    prices: { title: "Istanbul Airport Taxi Prices · {brand}", desc: "All fixed airport taxi prices from Istanbul Airport and Sabiha Gökçen, per car, for sedan, minivan, V-Class and minibus.", h1: "Airport taxi prices", to: "To" },
    book: {
      title: "Book your airport taxi · {brand}", h1: "Book your airport taxi",
      steps: ["Car", "Details", "Confirm"],
      noRoute: "Choose where you start and where you go to see prices.",
      noPrice: "We have no fixed price for this route yet. Write to us on WhatsApp for a quote.",
      tooMany: "Too many passengers for this car",
      choose: "Choose", perCar: "per car", oneWay: "one way", withReturn: "incl. return",
      name: "Full name", email: "E-mail", phone: "Mobile phone (with country code)", flight: "Flight number",
      flightHelp: "So we can track your flight", pickup: "Hotel or pickup address", dropoff: "Hotel or drop-off address",
      bags: "Suitcases", seats: "Child seats (€{seat} each)", note: "Note for the driver (optional)",
      retFlight: "Return flight number (optional)", retPickup: "Return pickup address", retDropoff: "Return drop-off address",
      next: "Continue", back: "Back", send: "Send booking request",
      terms: "I accept the <a href=\"/terms\" target=\"_blank\">terms</a> and the <a href=\"/privacy\" target=\"_blank\">privacy notice</a>.",
      review: "Check your booking", total: "Total", pay: "Payment: cash to the driver at the end of the ride (EUR, USD or TRY).",
      peak: "Busy-hour surcharge included", seatsLine: "Child seats",
      required: "Please fill in this field", invalidEmail: "Please check your e-mail address", invalidPhone: "Please check your phone number", accept: "Please accept the terms",
      doneH: "Request received", doneP: "Thank you! Your reference is <strong>{ref}</strong>. We sent the details to {email} and will confirm your booking by e-mail shortly. Nothing is booked until you receive our confirmation.",
      error: "We could not send your request. Please try again or write to us on WhatsApp.",
      whatsapp: "Ask on WhatsApp"
    },
    footer: { rights: "All rights reserved.", tursab: "TÜRSAB licence", contact: "Contact", legal: "Legal", routes: "Popular routes" },
    notFound: { title: "Page not found", p: "This page does not exist. Find your airport taxi price below.", home: "Go to the home page" }
  },
  ru: require("./i18n-ru")
};
