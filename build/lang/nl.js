// Dutch: page texts (same keys as the English block in i18n.js), blog posts and legal texts.
const SRC = require("../blog-src");
const B = {
  shortage: "waarom-is-het-moeilijk-om-een-taxi-te-vinden-in-istanbul",
  versus: "luchthaven-istanbul-taxi-of-transfer",
  howto: "luchthaventransfer-istanbul-boeken"
};

const ui = {
  htmlLang: "nl",
  paths: {
    home: "/nl", book: "/nl/boeken", prices: "/nl/prijzen", terms: "/nl/voorwaarden", privacy: "/nl/privacy",
    IST: "/nl/luchthaven-istanbul-taxi", SAW: "/nl/luchthaven-sabiha-gokcen-taxi",
    route: (a, z) => a === "IST" ? `/nl/luchthaven-istanbul-taxi-naar-${z}` : `/nl/sabiha-gokcen-taxi-naar-${z}`,
    airportPair: "/nl/taxi-luchthaven-istanbul-sabiha-gokcen", blog: "/nl/blog"
  },
  assure: [["price", "Vaste prijzen", "Geen meter, geen verrassingen"], ["cancel", "Gratis annuleren", "Tot 24 uur voor het ophalen"], ["clock", "24/7 service", "Bij elke vlucht, dag en nacht"], ["shield", "Veilig onderweg", "Ervaren chauffeurs, verzekerde auto's"]],
  nav: { prices: "Prijzen", fleet: "Auto's", how: "Hoe het werkt", faq: "FAQ", blog: "Blog", book: "Nu boeken" },
  ui: { route: "Route", from: "vanaf ", min: "min", terms: "Voorwaarden", privacy: "Privacy" },
  blog: { title: "Istanbul transferblog · Taxitips voor reizigers", desc: "Praktische tips voor Istanbul: waarom taxi's moeilijk te vinden zijn, taxi of transfer op de luchthaven en hoe je je rit in een minuut boekt.", h1: "Istanbul transferblog", lead: "Praktische tips om zonder stress van de luchthaven in Istanbul naar je hotel te komen.", read: "Lees verder", latest: "Uit onze blog", more: "Meer artikelen", updated: "Bijgewerkt", widgetH: "Boek nu je transfer" },
  form: {
    title: "Jouw vaste prijs", from: "Van", to: "Naar", date: "Datum", time: "Ophaaltijd", pax: "Passagiers",
    ret: "Terugrit toevoegen (10% korting)", rdate: "Datum terugrit", rtime: "Ophaaltijd terugrit", rdiff: "Andere route terug", rfrom: "Terugrit van", rto: "Terugrit naar", submit: "Bekijk prijzen",
    airports: "Luchthavens", districts: "Istanbul", port: "Cruisehaven", choose: "Kies…", swap: "Omdraaien"
  },
  home: {
    title: "Taxi en privétransfer luchthaven Istanbul vanaf €{min} · {brand}",
    desc: "{brand} is een transferbedrijf in Istanbul: privétaxi vanaf luchthaven IST en Sabiha Gökçen voor een vaste prijs vanaf €{min} per auto. Contant betalen.",
    h1: "Luchthaventaxi en privétransfer in Istanbul voor een <em>vaste prijs</em>",
    lead: "{brand} is een transferbedrijf in Istanbul. We brengen je met een privéauto van luchthaven Istanbul (IST) of Sabiha Gökçen (SAW) naar je hotel, vanaf €{min} per auto. Je chauffeur wacht met een naambordje en je betaalt contant aan het einde van de rit.",
    fleetH: "Kies je auto", fleetLead: "De prijs is per auto, niet per persoon. Tol, parkeren en wachttijd zijn inbegrepen.",
    routesH: "Populaire transferroutes in Istanbul", routesLead: "Vaste prijzen per auto, enkele reis.", routesPeak: "Ophalen op IST van {istFrom} tot {istTo} en op SAW van {sawFrom} tot {sawTo} kost {pct}% meer.",
    vsH: "Taxi met meter of onze luchthaventaxi?",
    vs: [["Prijs", "Hangt af van het verkeer en de route van de chauffeur", "Vast bij het boeken"], ["In de aankomsthal", "Rij bij de taxistandplaats", "Chauffeur wacht met je naambordje"], ["Vertraagde vlucht", "-", "We volgen je vlucht, 60 min gratis wachten"], ["Bagage en groepen", "Kleine gele taxi", "Sedan, minivan, V-Klasse of minibus tot 16 personen"], ["Betaling", "Meter, vaak alleen contant", "Contant aan de chauffeur in EUR, USD of TRY"]],
    vsCols: ["", "Gewone taxi", "{brand}"],
    howH: "Hoe het werkt",
    how: [["Aanvraag", "Kies je route, auto en tijd. Dat duurt een minuut en je hoeft niets vooruit te betalen."], ["Bevestiging", "We controleren de beschikbaarheid en sturen je een bevestiging per e-mail, meestal binnen een uur."], ["Rit", "Je chauffeur wacht op je met een naambordje. Je betaalt de vaste prijs contant aan het einde."]],
    meetH: "Waar je chauffeur wacht",
    ctaH: "Land je binnenkort in Istanbul?", ctaP: "Vraag nu je luchthaventaxi aan en ontvang de bevestiging per e-mail.",
    faqH: "Veelgestelde vragen"
  },
  faq: [
    ["Is het moeilijk om in Istanbul een taxi te vinden?", `Vaak wel. Istanbul heeft ongeveer één taxi per 1.000 inwoners, een aantal dat sinds de jaren '90 nauwelijks is veranderd, en de meest gehoorde klacht bij de gemeente is dat chauffeurs hun passagiers en routes kiezen. Rijen op de luchthaven, spitsuur en regen maken het nog lastiger. <a href="/nl/blog/${B.shortage}">Lees waarom</a>.`],
    ["Waarom zou ik boeken voordat ik aankom?", `Omdat je auto dan al op je wacht. Je chauffeur volgt je vlucht en staat met je naambordje in de aankomsthal: geen taxirij, geen hoteladres uitleggen, geen meter en geen onderhandelen. Je weet de prijs al voor je vertrekt. <a href="/nl/blog/${B.versus}">Taxi of transfer vergeleken</a>.`],
    ["Hoe snel boek ik bij {brand}?", `In ongeveer een minuut. Kies je route, auto en tijd, vul je naam, telefoon, e-mail en vluchtnummer in en verstuur. Zonder account en zonder vooruitbetaling. De bevestiging komt meestal binnen een uur. <a href="/nl/blog/${B.howto}">Alle stappen</a>.`],
    ["Is dit een gewone Istanbulse taxi?", "Nee. {brand} is een erkend transferbedrijf: je rijdt in een privéauto met een professionele chauffeur, vooraf geboekt voor een vaste prijs. Veel reizigers noemen het een luchthaventaxi, maar er is geen meter en de chauffeur wacht op je in de terminal."],
    ["Hoe betaal ik?", "Contant aan de chauffeur aan het einde van de rit, in euro, Amerikaanse dollar of Turkse lira. Er is geen online betaling en geen aanbetaling."],
    ["Wanneer is mijn boeking bevestigd?", "Direct na het versturen mailen we je dat we je aanvraag hebben ontvangen. Zodra we een auto hebben ingepland, meestal binnen een uur, ontvang je de bevestiging per e-mail."],
    ["Wat als mijn vlucht vertraging heeft?", "We volgen je vlucht en passen de ophaaltijd aan. De eerste 60 minuten na de landing zijn gratis."],
    ["Is de prijs per persoon?", "Nee, de prijs is per auto. Een sedan is voor maximaal 3 passagiers, een minivan voor 7, een V-Klasse voor 6 en een minibus voor 16."],
    ["Kan ik annuleren?", "Ja, gratis tot 24 uur voor het ophalen. Reageer gewoon op de bevestigingsmail of stuur ons een bericht via WhatsApp."]
  ],
  route: {
    title: "Taxi {from} – {to} · vaste prijs €{price} per auto",
    desc: "Privétaxi {from} – {to}: vaste prijs vanaf €{price} per auto, {km} km, ongeveer {min} min. Naambordje, vlucht wordt gevolgd, contant betalen.",
    h1: "Taxi {from} – {to}",
    answer: "Een privétaxi van {fromLong} naar {toLong} kost een vaste <strong>€{price} per auto</strong> in een sedan voor maximaal 3 passagiers. De {km} km duren buiten de spits ongeveer {min} minuten. Tol en parkeren zijn inbegrepen en je betaalt de chauffeur contant.",
    answerNoDist: "Een privétaxi van {fromLong} naar {toLong} kost een vaste <strong>€{price} per auto</strong> in een sedan voor maximaal 3 passagiers. Tol en parkeren zijn inbegrepen en je betaalt de chauffeur contant.",
    pricesH: "Prijzen {from} – {to}", car: "Auto", seats: "Passagiers", bags: "Koffers", price: "Prijs per auto",
    areaH: "Wijken voor deze prijs", meetH: "Waar je chauffeur wacht",
    faq: [
      ["Wat kost een taxi {from} – {to}?", "Bij ons een vaste €{price} per auto in een sedan, €{van} in een minivan tot 7, €{vclass} in een Mercedes V-Klasse en €{bus} in een minibus tot 16 personen."],
      ["Hoe lang duurt de rit?", "Ongeveer {min} minuten voor {km} km buiten de spits. Op doordeweekse avonden kan het langer duren; de prijs blijft hetzelfde."],
      ["Betaal ik meer als mijn vlucht vertraagd is?", "Nee. We volgen je vlucht en de eerste 60 minuten na de landing zijn gratis."]
    ],
    faqNoDist: 1,
    otherH: "Andere routes vanaf {from}", back: "Alle taxiprijzen vanaf {from}"
  },
  hub: {
    title: "Taxi {from} · vaste prijzen naar elke wijk",
    desc: "Privétaxi voor een vaste prijs vanaf {from} naar Sultanahmet, Taksim, Kadıköy en alle centrale wijken, vanaf €{price} per auto. Met naambordje.",
    h1: "Taxiprijzen vanaf {from}",
    lead: "Vaste prijzen per auto vanaf {fromLong} naar de centrale wijken van Istanbul. Kies je bestemming om alle vier de auto's te zien."
  },
  prices: { title: "Taxiprijzen luchthaven Istanbul · {brand}", desc: "Alle vaste prijzen voor de luchthaventaxi vanaf luchthaven Istanbul en Sabiha Gökçen, per auto: sedan, minivan, V-Klasse en minibus.", h1: "Prijzen luchthaventaxi", to: "Naar" },
  book: {
    title: "Boek je luchthaventaxi · {brand}", h1: "Boek je luchthaventaxi",
    steps: ["Auto", "Gegevens", "Controleren"],
    noRoute: "Kies waar je vertrekt en waar je heen gaat om de prijzen te zien.",
    noPrice: "Voor deze route hebben we nog geen vaste prijs. Stuur ons een WhatsApp voor een prijsopgave.",
    tooMany: "Te veel passagiers voor deze auto",
    choose: "Kies", perCar: "per auto", oneWay: "enkele reis", withReturn: "incl. terugrit",
    name: "Voor- en achternaam", email: "E-mail", phone: "Mobiel nummer (met landcode)", flight: "Vluchtnummer",
    flightHelp: "Zodat we je vlucht kunnen volgen", pickup: "Hotel of ophaaladres", dropoff: "Hotel of afzetadres",
    bags: "Koffers", seats: "Kinderzitjes (€{seat} per stuk)", note: "Bericht voor de chauffeur (optioneel)",
    retFlight: "Vluchtnummer terugreis (optioneel)", retPickup: "Ophaaladres voor de terugrit", retDropoff: "Afzetadres voor de terugrit",
    next: "Verder", back: "Terug", send: "Aanvraag versturen",
    terms: "Ik ga akkoord met de <a href=\"/nl/voorwaarden\" target=\"_blank\">voorwaarden</a> en de <a href=\"/nl/privacy\" target=\"_blank\">privacyverklaring</a>.",
    review: "Controleer je boeking", total: "Totaal", pay: "Betaling: contant aan de chauffeur aan het einde van de rit (EUR, USD of TRY).",
    peak: "Inclusief spitstoeslag", seatsLine: "Kinderzitjes",
    required: "Vul dit veld in", invalidEmail: "Controleer je e-mailadres", invalidPhone: "Controleer je telefoonnummer", accept: "Ga akkoord met de voorwaarden",
    doneH: "Aanvraag ontvangen", doneP: "Bedankt! Je boekingsnummer is <strong>{ref}</strong>. We hebben de gegevens naar {email} gestuurd en bevestigen je boeking binnenkort per e-mail. De boeking is pas definitief na onze bevestiging.",
    error: "Je aanvraag kon niet worden verstuurd. Probeer het opnieuw of stuur ons een WhatsApp.",
    whatsapp: "Vraag het via WhatsApp"
  },
  footer: { rights: "Alle rechten voorbehouden.", tursab: "TÜRSAB-licentie", contact: "Contact", legal: "Juridisch", routes: "Populaire routes" },
  notFound: { title: "Pagina niet gevonden", p: "Deze pagina bestaat niet. Bekijk hieronder de prijs van je luchthaventaxi.", home: "Naar de homepage" }
};

const blog = {
  "taxi-shortage": {
    slug: B.shortage,
    title: "Waarom is het zo moeilijk om in Istanbul een taxi te vinden?",
    desc: "Istanbul heeft ongeveer één taxi per 1.000 inwoners en duizenden klachten per jaar. Waarom taxi's schaars zijn en hoe je het probleem omzeilt door vooraf te boeken.",
    lead: "Istanbul heeft meer dan 16 miljoen inwoners, maar de taxivloot is in 30 jaar nauwelijks gegroeid. Daarom kan het lang duren om een taxi te vinden, vooral op de luchthaven, in de spits of als het regent.",
    body: `<h2>Te weinig taxi's voor een enorme stad</h2>
<p>Volgens cijfers van de gemeente Istanbul uit 2021 had de stad <strong>17.395 taxi's</strong>, evenveel als in de jaren '90, terwijl de bevolking meer dan verdubbelde van 7,5 naar ruim 16 miljoen. Dat is <strong>ongeveer één taxi per 1.000 inwoners</strong>. Ter vergelijking: New York had 13.587 taxi's voor 8,4 miljoen mensen (<a href="${SRC.density}" target="_blank" rel="noopener">bron</a>).</p>
<p>Het gevolg is simpel: op drukke momenten zoeken veel meer mensen een taxi dan er taxi's zijn.</p>
{widget}
<h2>Chauffeurs kiezen hun passagiers</h2>
<p>De meest gehoorde klacht over taxi's in Istanbul gaat niet over de prijs, maar over chauffeurs die passagiers en routes uitkiezen. In de eerste zes maanden van 2023 ontving de gemeente <strong>33.878 klachten</strong> over taxi's. Meer dan de helft, <strong>18.079</strong>, ging over chauffeurs die kieskeurig waren over de passagier of de bestemming. Andere klachten gingen over te hoge prijzen (3.026), omrijden (1.386), weigeren van korte ritten (1.290) en de meter niet aanzetten (712) (<a href="${SRC.complaints}" target="_blank" rel="noopener">bron</a>).</p>
<p>Voor een reiziger met koffers die geen Turks spreekt, maakt juist dit het eerste uur in Istanbul stressvol.</p>
<h2>Waar het het lastigst is</h2>
<ul>
<li><strong>Op de luchthaven na een late vlucht:</strong> lange rijen bij de taxistandplaats, en gezinnen of groepen passen vaak niet in één gele taxi.</li>
<li><strong>In de spits en bij regen:</strong> taxi's zijn bezet of chauffeurs weigeren ritten de file in.</li>
<li><strong>Korte ritten en de Aziatische kant:</strong> sommige chauffeurs weigeren ritten die ze niet de moeite waard vinden, of een oversteek over de Bosporus.</li>
</ul>
<h2>De makkelijke oplossing: boeken voordat je landt</h2>
<p>Een vooraf geboekte transfer lost dit allemaal op. Bij {brand} kies je je auto en zie je de vaste prijs al voor vertrek. Je chauffeur volgt je vlucht en wacht met je naambordje in de aankomsthal: geen rij, geen onderhandelen en geen meter. Aan het einde van de rit betaal je diezelfde prijs contant.</p>
<p>Boeken duurt ongeveer een minuut, zonder account en zonder vooruitbetaling. Je krijgt een e-mail dat we je aanvraag hebben ontvangen en daarna een bevestiging zodra je auto is ingepland.</p>
{widget}`
  },
  "taxi-vs-transfer": {
    slug: B.versus,
    title: "Luchthaven Istanbul: taxistandplaats of vooraf geboekte transfer?",
    desc: "Een taxi van de standplaats op luchthaven Istanbul of Sabiha Gökçen, of een privétransfer die je voor vertrek boekt: prijs, wachten, bagage en veiligheid vergeleken.",
    lead: "Je landt op luchthaven Istanbul of Sabiha Gökçen en moet naar je hotel. Je kunt in de taxirij gaan staan, of er wacht al een chauffeur op je. Zo verhouden de twee zich.",
    body: `<h2>Prijs: meter of vaste prijs</h2>
<p>Een gewone taxi rijdt op de meter, dus de prijs hangt af van het verkeer en de route die de chauffeur kiest. Te hoge prijzen en omrijden horen bij de meest gehoorde klachten over taxi's in Istanbul (<a href="${SRC.complaints}" target="_blank" rel="noopener">bron</a>). Een vooraf geboekte transfer heeft een vaste prijs per auto die je vooraf kent. Tol en parkeren zijn inbegrepen.</p>
{widget}
<h2>Wachten: rij of naambordje</h2>
<p>Bij de taxistandplaats sta je in de rij, soms lang als er meerdere vluchten tegelijk landen. Bij een transfer volgt je chauffeur je vlucht en wacht hij met je naambordje in de aankomsthal. Bij {brand} zijn de eerste 60 minuten na de landing gratis, dus een lange rij bij de paspoortcontrole of een late koffer kost niets extra.</p>
<h2>Bagage en groepen</h2>
<p>Een gele taxi neemt maximaal vier passagiers en weinig bagage mee. Bij een transfer kies je de auto die past: een sedan voor maximaal 3, een minivan voor 7, een Mercedes V-Klasse voor 6 of een minibus voor 16 personen. Eén prijs per auto, niet per persoon.</p>
<h2>Taal en veiligheid</h2>
<p>Je hoeft je hoteladres niet in het Turks uit te leggen: het staat al in je boeking. Je rijdt met een professionele chauffeur die de weg kent, en je betaalt aan het einde de afgesproken prijs.</p>
<h2>Wanneer een taxi wel prima is</h2>
<p>Als je op een rustig moment landt, alleen en met weinig bagage reist en je hotel dichtbij is, kan een taxi van de standplaats prima zijn. Voor gezinnen, groepen, late aankomsten en iedereen die de prijs vooraf wil weten, is vooraf boeken makkelijker.</p>
{widget}`
  },
  "how-to-book": {
    slug: B.howto,
    title: "Je luchthaventransfer in Istanbul in een minuut boeken",
    desc: "Boek je luchthaventransfer in Istanbul bij ITB Transfer in een minuut, zonder account en vooruitbetaling. Wat er daarna gebeurt, stap voor stap.",
    lead: "Een transfer boeken bij {brand} gaat sneller dan wachten bij de taxistandplaats. Het duurt ongeveer een minuut, zonder account en zonder vooruitbetaling. Dit is precies wat er gebeurt.",
    body: `<h2>1. Kies je route en tijd</h2>
<p>Kies in het boekingsvak waar je vertrekt (luchthaven Istanbul, Sabiha Gökçen of een wijk) en waar je heen gaat, en daarna de datum, de ophaaltijd en het aantal passagiers. Word je op de luchthaven opgehaald, vul dan je landingstijd in. Je kunt de terugrit toevoegen met 10% korting.</p>
{widget}
<h2>2. Kies je auto en zie de vaste prijs</h2>
<p>Je ziet alle vier de auto's met de prijs per auto: sedan, minivan, Mercedes V-Klasse en minibus. Auto's die te klein zijn voor je groep zijn grijs. De prijs die je ziet, is de prijs die je betaalt.</p>
<h2>3. Vul je gegevens in</h2>
<p>Je naam, mobiele nummer met landcode, e-mail en vluchtnummer, zodat we je vlucht kunnen volgen. Word je bij een hotel opgehaald of afgezet, voeg dan het adres toe. Je kunt kinderzitjes en een bericht voor de chauffeur toevoegen.</p>
<h2>4. Verstuur de aanvraag</h2>
<p>Controleer het overzicht en verstuur het. Je krijgt meteen een e-mail dat we je aanvraag hebben ontvangen. Zodra we je auto hebben ingepland, meestal binnen een uur, ontvang je de bevestiging met het ontmoetingspunt.</p>
<h2>5. Ontmoet je chauffeur en betaal contant</h2>
<p>Je chauffeur wacht met je naambordje in de aankomsthal. Aan het einde van de rit betaal je de vaste prijs contant, in euro, Amerikaanse dollar of Turkse lira. Gratis annuleren tot 24 uur voor het ophalen.</p>
{widget}`
  }
};

const legal = {
  terms: {
    title: "Algemene voorwaarden",
    desc: "Voorwaarden voor boeking, vaste prijs, contante betaling, wachttijd en gratis annulering van luchthaventransfers in Istanbul die via deze website worden geboekt.",
    html: `<p>Deze voorwaarden gelden voor transfers die via deze website worden geboekt. De website wordt beheerd door {company} ({address}), TÜRSAB-licentie {tursab}.</p>
<h2>Boeking</h2><p>Het versturen van het boekingsformulier is een aanvraag. Een boeking is pas bindend nadat we je een bevestiging per e-mail hebben gestuurd. Kunnen we je aanvraag niet uitvoeren, dan laten we je dat per e-mail weten.</p>
<h2>Prijs en betaling</h2><p>De prijs die bij het boeken wordt getoond, is een vaste prijs per auto, inclusief tol, parkeren en de wachttijd hieronder. Je betaalt de chauffeur contant aan het einde van de rit, in euro, Amerikaanse dollar of Turkse lira tegen de dagkoers.</p>
<h2>Wachttijd</h2><p>Op de luchthavens zijn de eerste 60 minuten na de landing gratis. Op andere adressen wacht de chauffeur 15 minuten na de geboekte tijd.</p>
<h2>Wijzigen en annuleren</h2><p>Je kunt tot 24 uur voor het ophalen gratis wijzigen of annuleren, door te reageren op de bevestigingsmail of via WhatsApp. Kom je niet opdagen zonder het ons te laten weten, dan kunnen we de ritprijs in rekening brengen.</p>
<h2>Passagiers en bagage</h2><p>Het aantal passagiers en koffers moet passen bij de geboekte auto. Kinderen hebben een kinderzitje nodig, dat je bij het boeken kunt toevoegen.</p>
<h2>Contact</h2><p>{email} · {phone}</p>`
  },
  privacy: {
    title: "Privacyverklaring",
    desc: "Hoe we de naam, telefoon, e-mail en vluchtgegevens gebruiken die je opgeeft bij het boeken van een luchthaventaxi in Istanbul, en hoe je ons daarover bereikt.",
    html: `<p>{company} verwerkt de persoonsgegevens die je bij het boeken opgeeft (naam, e-mail, telefoon, vluchtnummer, adressen, opmerkingen) alleen om je transfer te regelen en uit te voeren, om contact met je op te nemen en om te voldoen aan wettelijke plichten, zoals de passagierslijsten die de Turkse wet voorschrijft.</p>
<p>Je gegevens worden alleen gedeeld met de chauffeur of partner die de rit uitvoert en met dienstverleners die we gebruiken voor deze website (hosting, database, e-mail). Ze worden bewaard zolang de wet dat vereist.</p>
<p>Je kunt je gegevens inzien, laten corrigeren of laten verwijderen door te mailen naar {email}.</p>`
  }
};

module.exports = { ui, blog, legal };
