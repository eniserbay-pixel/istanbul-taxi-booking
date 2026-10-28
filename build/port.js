// Galataport cruise port pages: the port's own price page (hub) and the routes that start there
// (to Taksim and Sultanahmet; the airport routes are the airport pages' "to Galataport" ones).
// Texts per language; {from}, {fromLong}, {price}, {to} as in the route and hub texts of i18n.js.
module.exports = {
  en: {
    desc: "Private taxi from Galataport cruise port to {to}: fixed price from €{price} per car, {km} km, about {min} min. Driver at the terminal exit, pay in cash.",
    path: "/galataport-taxi",
    route: z => `/galataport-taxi-to-${z}`,
    hub: {
      title: "Galataport Taxi · Cruise Port Transfers from €{price}",
      desc: "Fixed-price private taxi from Galataport cruise port to Istanbul Airport, Sabiha Gökçen, Taksim and Sultanahmet, from €{price} per car. Driver at the terminal exit.",
      h1: "Galataport cruise port taxi",
      lead: "Fixed prices per car from the Galataport cruise terminal to both airports, Taksim and the Old City. Your driver waits at the terminal exit with a name sign."
    },
    meetH: "Where your driver waits at Galataport",
    meet: "Your driver waits outside the cruise passenger terminal exit at Galataport (Tophane), holding a sign with your name. Tell us your ship and disembarkation time when you book.",
    late: ["What if my ship disembarks late?", "We follow your ship's arrival and adjust the pickup. Waiting for a late disembarkation is free; the price stays the same."],
    service: "Cruise port taxi"
  },
  ru: {
    desc: "Такси из круизного порта Галатапорт в {to}: фиксированная цена от €{price} за машину, {km} км, около {min} мин. Водитель у выхода из терминала, оплата наличными.",
    path: "/ru/taksi-galataport",
    route: z => `/ru/taksi-iz-galataporta-v-${z}`,
    hub: {
      title: "Такси из Галатапорта · трансфер из круизного порта от €{price}",
      desc: "Такси по фиксированной цене из круизного порта Галатапорт в аэропорт Стамбула, Сабиха Гёкчен, Таксим и Султанахмет, от €{price} за машину.",
      h1: "Такси из круизного порта Галатапорт",
      lead: "Фиксированные цены за машину от круизного терминала Галатапорт до обоих аэропортов, Таксима и Старого города. Водитель ждёт у выхода из терминала с табличкой."
    },
    meetH: "Где вас ждёт водитель в Галатапорте",
    meet: "Водитель ждёт у выхода из круизного пассажирского терминала Галатапорт (Топхане) с табличкой с вашим именем. При заказе укажите название лайнера и время высадки.",
    late: ["Что если высадка с лайнера задерживается?", "Мы следим за прибытием лайнера и переносим подачу. Ожидание бесплатно, цена не меняется."],
    service: "Такси из круизного порта"
  },
  de: {
    desc: "Privattaxi vom Kreuzfahrthafen Galataport nach {to}: Festpreis ab €{price} pro Auto, {km} km, etwa {min} Min. Fahrer am Terminalausgang, Barzahlung.",
    path: "/de/galataport-taxi",
    route: z => `/de/galataport-taxi-nach-${z}`,
    hub: {
      title: "Galataport Taxi · Transfer vom Kreuzfahrthafen ab €{price}",
      desc: "Privattaxi zum Festpreis vom Kreuzfahrthafen Galataport zum Flughafen Istanbul, Sabiha Gökçen, Taksim und Sultanahmet, ab €{price} pro Auto.",
      h1: "Taxi vom Kreuzfahrthafen Galataport",
      lead: "Festpreise pro Auto vom Kreuzfahrtterminal Galataport zu beiden Flughäfen, nach Taksim und in die Altstadt. Ihr Fahrer wartet mit Namensschild am Terminalausgang."
    },
    meetH: "Wo Ihr Fahrer in Galataport wartet",
    meet: "Ihr Fahrer wartet vor dem Ausgang des Kreuzfahrtterminals Galataport (Tophane) mit einem Schild mit Ihrem Namen. Nennen Sie uns bei der Buchung Ihr Schiff und die Ausschiffungszeit.",
    late: ["Was, wenn sich die Ausschiffung verzögert?", "Wir verfolgen die Ankunft Ihres Schiffes und passen die Abholung an. Die Wartezeit ist kostenlos, der Preis bleibt gleich."],
    service: "Kreuzfahrthafen-Taxi"
  },
  fr: {
    desc: "Taxi privé de Galataport vers {to} : prix fixe dès €{price} par voiture, {km} km, environ {min} min. Chauffeur à la sortie du terminal, paiement en espèces.",
    path: "/fr/taxi-galataport",
    route: z => `/fr/taxi-galataport-vers-${z}`,
    hub: {
      title: "Taxi Galataport · Transfert port de croisière dès €{price}",
      desc: "Taxi privé à prix fixe du port de croisière Galataport vers l'aéroport d'Istanbul, Sabiha Gökçen, Taksim et Sultanahmet, dès €{price} par voiture.",
      h1: "Taxi depuis le port de croisière Galataport",
      lead: "Prix fixes par voiture du terminal de croisière Galataport vers les deux aéroports, Taksim et la vieille ville. Votre chauffeur vous attend à la sortie du terminal avec une pancarte."
    },
    meetH: "Où votre chauffeur vous attend à Galataport",
    meet: "Votre chauffeur vous attend à la sortie du terminal passagers de croisière de Galataport (Tophane), avec une pancarte à votre nom. Indiquez-nous votre navire et l'heure de débarquement à la réservation.",
    late: ["Et si le débarquement est retardé ?", "Nous suivons l'arrivée de votre navire et adaptons la prise en charge. L'attente est gratuite et le prix ne change pas."],
    service: "Taxi port de croisière"
  },
  it: {
    desc: "Taxi privato dal porto crociere Galataport a {to}: prezzo fisso da €{price} per auto, {km} km, circa {min} min. Autista all'uscita del terminal, pagamento in contanti.",
    path: "/it/taxi-galataport",
    route: z => `/it/taxi-galataport-per-${z}`,
    hub: {
      title: "Taxi Galataport · Transfer dal porto crociere da €{price}",
      desc: "Taxi privato a prezzo fisso dal porto crociere Galataport all'aeroporto di Istanbul, Sabiha Gökçen, Taksim e Sultanahmet, da €{price} per auto.",
      h1: "Taxi dal porto crociere Galataport",
      lead: "Prezzi fissi per auto dal terminal crociere Galataport a entrambi gli aeroporti, Taksim e la città vecchia. L'autista vi aspetta all'uscita del terminal con un cartello."
    },
    meetH: "Dove vi aspetta l'autista a Galataport",
    meet: "L'autista vi aspetta all'uscita del terminal passeggeri crociere di Galataport (Tophane) con un cartello con il vostro nome. Indicateci nave e orario di sbarco al momento della prenotazione.",
    late: ["E se lo sbarco è in ritardo?", "Seguiamo l'arrivo della nave e adattiamo il ritiro. L'attesa è gratuita e il prezzo non cambia."],
    service: "Taxi porto crociere"
  },
  nl: {
    desc: "Privétaxi van cruiseterminal Galataport naar {to}: vaste prijs vanaf €{price} per auto, {km} km, ongeveer {min} min. Chauffeur bij de terminaluitgang, contant betalen.",
    path: "/nl/galataport-taxi",
    route: z => `/nl/galataport-taxi-naar-${z}`,
    hub: {
      title: "Galataport Taxi · Transfer vanaf de cruisehaven vanaf €{price}",
      desc: "Privétaxi tegen vaste prijs van cruiseterminal Galataport naar Luchthaven Istanbul, Sabiha Gökçen, Taksim en Sultanahmet, vanaf €{price} per auto.",
      h1: "Taxi vanaf cruiseterminal Galataport",
      lead: "Vaste prijzen per auto van cruiseterminal Galataport naar beide luchthavens, Taksim en de oude stad. Uw chauffeur wacht met een naambord bij de uitgang van de terminal."
    },
    meetH: "Waar uw chauffeur wacht bij Galataport",
    meet: "Uw chauffeur wacht bij de uitgang van de cruisepassagiersterminal van Galataport (Tophane) met een bord met uw naam. Geef bij de boeking uw schip en ontschepingstijd door.",
    late: ["Wat als de ontscheping uitloopt?", "We volgen de aankomst van uw schip en passen de ophaaltijd aan. Wachten is gratis en de prijs blijft gelijk."],
    service: "Cruisehaven-taxi"
  }
};
