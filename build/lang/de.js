// German: page texts (same keys as the English block in i18n.js), blog posts and legal texts.
const SRC = require("../blog-src");
const B = {
  shortage: "warum-ist-es-schwer-in-istanbul-ein-taxi-zu-finden",
  versus: "istanbul-flughafen-taxi-oder-transfer",
  howto: "istanbul-flughafentransfer-buchen"
};

const ui = {
  htmlLang: "de",
  paths: {
    home: "/de", book: "/de/buchen", prices: "/de/preise", terms: "/de/agb", privacy: "/de/datenschutz",
    IST: "/de/flughafen-istanbul-taxi", SAW: "/de/flughafen-sabiha-goekcen-taxi",
    route: (a, z) => a === "IST" ? `/de/flughafen-istanbul-taxi-nach-${z}` : `/de/sabiha-goekcen-taxi-nach-${z}`,
    airportPair: "/de/taxi-flughafen-istanbul-sabiha-goekcen", blog: "/de/blog"
  },
  assure: [["price", "Festpreise", "Kein Taxameter, keine Überraschungen"], ["cancel", "Kostenlose Stornierung", "Bis 24 Stunden vor Abholung"], ["clock", "24/7 Service", "Zu jedem Flug, Tag und Nacht"], ["shield", "Sicher reisen", "Erfahrene Fahrer, versicherte Fahrzeuge"]],
  nav: { prices: "Preise", fleet: "Fahrzeuge", how: "So funktioniert's", faq: "FAQ", blog: "Blog", book: "Jetzt buchen" },
  ui: { route: "Strecke", from: "ab ", min: "Min.", terms: "AGB", privacy: "Datenschutz" },
  blog: { title: "Istanbul Transfer Blog · Taxi-Tipps für Reisende", desc: "Praktische Tipps für Istanbul: warum Taxis schwer zu finden sind, Taxi oder Transfer am Flughafen und wie Sie Ihre Fahrt in einer Minute buchen.", h1: "Istanbul Transfer Blog", lead: "Praktische Tipps für Ihre Ankunft in Istanbul und die stressfreie Fahrt zum Hotel.", read: "Weiterlesen", latest: "Aus unserem Blog", more: "Weitere Artikel", updated: "Aktualisiert", widgetH: "Jetzt Transfer buchen" },
  form: {
    title: "Ihr Festpreis", from: "Von", to: "Nach", date: "Datum", time: "Abholzeit", pax: "Fahrgäste",
    ret: "Rückfahrt hinzufügen (10 % Rabatt)", rdate: "Datum Rückfahrt", rtime: "Abholzeit Rückfahrt", rdiff: "Andere Route zurück", rfrom: "Rückfahrt von", rto: "Rückfahrt nach", submit: "Preise anzeigen",
    airports: "Flughäfen", districts: "Istanbul", port: "Kreuzfahrthafen", choose: "Bitte wählen…", swap: "Tauschen"
  },
  home: {
    title: "Flughafen Istanbul Taxi & Privattransfer ab €{min} · {brand}",
    desc: "{brand} ist ein Transferunternehmen in Istanbul: privates Flughafentaxi ab IST und Sabiha Gökçen zum Festpreis ab €{min} pro Auto. Barzahlung beim Fahrer.",
    h1: "Flughafentaxi und Privattransfer in Istanbul zum <em>Festpreis</em>",
    lead: "{brand} ist ein Transferunternehmen in Istanbul. Wir bringen Sie im privaten Auto vom Flughafen Istanbul (IST) oder Sabiha Gökçen (SAW) zu Ihrem Hotel, ab €{min} pro Auto. Ihr Fahrer wartet mit einem Namensschild und Sie zahlen am Ende der Fahrt bar.",
    fleetH: "Wählen Sie Ihr Fahrzeug", fleetLead: "Der Preis gilt pro Auto, nicht pro Person. Maut, Parken und Wartezeit sind inklusive.",
    routesH: "Beliebte Transferstrecken in Istanbul", routesLead: "Festpreise pro Auto, einfache Fahrt. Abholungen am IST von 15:00 bis 19:00 und am SAW von 14:45 bis 21:00 kosten 30 % mehr.",
    vsH: "Taxi mit Taxameter oder unser Flughafentaxi?",
    vs: [["Preis", "Hängt vom Verkehr und von der Route des Fahrers ab", "Bei der Buchung festgelegt"], ["In der Ankunftshalle", "Schlange am Taxistand", "Fahrer wartet mit Ihrem Namensschild"], ["Flugverspätung", "-", "Wir verfolgen Ihren Flug, 60 Min. Wartezeit gratis"], ["Gepäck und Gruppen", "Kleines gelbes Taxi", "Limousine, Minivan, V-Klasse oder Kleinbus bis 16 Personen"], ["Bezahlung", "Taxameter, oft nur bar", "Bar an den Fahrer in EUR, USD oder TRY"]],
    vsCols: ["", "Normales Taxi", "{brand}"],
    howH: "So funktioniert's",
    how: [["Anfrage", "Wählen Sie Strecke, Fahrzeug und Uhrzeit. Das dauert eine Minute, eine Vorauszahlung ist nicht nötig."], ["Bestätigung", "Wir prüfen die Verfügbarkeit und schicken Ihnen eine Bestätigung per E-Mail, meist innerhalb einer Stunde."], ["Fahrt", "Ihr Fahrer empfängt Sie mit einem Namensschild. Den Festpreis zahlen Sie am Ende bar."]],
    meetH: "Wo Ihr Fahrer wartet",
    ctaH: "Landen Sie bald in Istanbul?", ctaP: "Fragen Sie jetzt Ihr Flughafentaxi an und erhalten Sie die Bestätigung per E-Mail.",
    faqH: "Häufige Fragen"
  },
  faq: [
    ["Ist es schwer, in Istanbul ein Taxi zu finden?", `Oft ja. In Istanbul kommt etwa ein Taxi auf 1.000 Einwohner, und diese Zahl hat sich seit den 1990er-Jahren kaum verändert. Die häufigste Beschwerde bei der Stadt: Fahrer suchen sich Fahrgäste und Strecken aus. Schlangen am Flughafen, Berufsverkehr und Regen machen es noch schwerer. <a href="/de/blog/${B.shortage}">Mehr dazu</a>.`],
    ["Warum sollte ich vor der Ankunft buchen?", `Weil Ihr Auto dann schon auf Sie wartet. Ihr Fahrer verfolgt Ihren Flug und steht mit Ihrem Namensschild in der Ankunftshalle: keine Taxischlange, keine Erklärung der Hoteladresse, kein Taxameter und kein Feilschen. Den Preis kennen Sie schon vor dem Abflug. <a href="/de/blog/${B.versus}">Taxi und Transfer im Vergleich</a>.`],
    ["Wie schnell geht die Buchung bei {brand}?", `In etwa einer Minute. Wählen Sie Strecke, Fahrzeug und Uhrzeit, geben Sie Name, Telefon, E-Mail und Flugnummer ein und senden Sie die Anfrage ab. Ohne Konto und ohne Vorauszahlung. Die Bestätigung kommt meist innerhalb einer Stunde. <a href="/de/blog/${B.howto}">Alle Schritte</a>.`],
    ["Ist das ein normales Istanbuler Taxi?", "Nein. {brand} ist ein lizenziertes Transferunternehmen: Sie fahren im privaten Auto mit professionellem Fahrer, vorab gebucht zum Festpreis. Viele Reisende nennen das Flughafentaxi, aber es gibt kein Taxameter und der Fahrer holt Sie direkt im Terminal ab."],
    ["Wie bezahle ich?", "Bar beim Fahrer am Ende der Fahrt, in Euro, US-Dollar oder türkischer Lira. Es gibt keine Online-Zahlung und keine Anzahlung."],
    ["Wann ist meine Buchung bestätigt?", "Direkt nach dem Absenden schicken wir Ihnen eine E-Mail, dass Ihre Anfrage eingegangen ist. Sobald ein Fahrzeug zugeteilt ist, meist innerhalb einer Stunde, erhalten Sie die Bestätigung per E-Mail."],
    ["Was passiert, wenn mein Flug Verspätung hat?", "Wir verfolgen Ihren Flug und passen die Abholzeit an. Die ersten 60 Minuten nach der Landung sind kostenlos."],
    ["Gilt der Preis pro Person?", "Nein, der Preis gilt pro Auto. Eine Limousine fasst bis zu 3 Fahrgäste, ein Minivan bis zu 7, eine V-Klasse bis zu 6 und ein Kleinbus bis zu 16."],
    ["Kann ich stornieren?", "Ja, kostenlos bis 24 Stunden vor der Abholung. Antworten Sie einfach auf die Bestätigungs-E-Mail oder schreiben Sie uns auf WhatsApp."]
  ],
  route: {
    title: "Taxi {from} – {to} · Festpreis €{price} pro Auto",
    desc: "Privates Taxi {from} – {to}: Festpreis ab €{price} pro Auto, {km} km, ca. {min} Min. Namensschild, Flugverfolgung, Barzahlung beim Fahrer.",
    h1: "Taxi {from} – {to}",
    answer: "Ein privates Taxi von {fromLong} nach {toLong} kostet fest <strong>€{price} pro Auto</strong> in einer Limousine für bis zu 3 Fahrgäste. Die {km} km dauern außerhalb der Stoßzeiten etwa {min} Minuten. Maut und Parken sind inklusive, Sie zahlen bar beim Fahrer.",
    answerNoDist: "Ein privates Taxi von {fromLong} nach {toLong} kostet fest <strong>€{price} pro Auto</strong> in einer Limousine für bis zu 3 Fahrgäste. Maut und Parken sind inklusive, Sie zahlen bar beim Fahrer.",
    pricesH: "Preise {from} – {to}", car: "Fahrzeug", seats: "Fahrgäste", bags: "Koffer", price: "Preis pro Auto",
    areaH: "Gebiete zu diesem Preis", meetH: "Wo Ihr Fahrer wartet",
    faq: [
      ["Was kostet ein Taxi {from} – {to}?", "Bei uns fest €{price} pro Auto in der Limousine, €{van} im Minivan für bis zu 7, €{vclass} in der Mercedes V-Klasse und €{bus} im Kleinbus für bis zu 16 Personen."],
      ["Wie lange dauert die Fahrt?", "Etwa {min} Minuten für {km} km außerhalb der Stoßzeiten. An Werktagen abends kann es länger dauern, der Preis bleibt gleich."],
      ["Zahle ich mehr, wenn mein Flug Verspätung hat?", "Nein. Wir verfolgen Ihren Flug, die ersten 60 Minuten nach der Landung sind kostenlos."]
    ],
    faqNoDist: 1,
    otherH: "Weitere Strecken ab {from}", back: "Alle Taxipreise ab {from}"
  },
  hub: {
    title: "Taxi {from} · Festpreise in alle Stadtteile",
    desc: "Privates Taxi zum Festpreis ab {from} nach Sultanahmet, Taksim, Kadıköy und in alle zentralen Stadtteile, ab €{price} pro Auto. Mit Namensschild.",
    h1: "Taxipreise ab {from}",
    lead: "Festpreise pro Auto ab {fromLong} in die zentralen Stadtteile Istanbuls. Wählen Sie Ihr Ziel, um alle vier Fahrzeuge zu sehen."
  },
  prices: { title: "Taxipreise Flughafen Istanbul · {brand}", desc: "Alle Festpreise für das Flughafentaxi ab Flughafen Istanbul und Sabiha Gökçen, pro Auto: Limousine, Minivan, V-Klasse und Kleinbus.", h1: "Preise Flughafentaxi", to: "Nach" },
  book: {
    title: "Flughafentaxi buchen · {brand}", h1: "Flughafentaxi buchen",
    steps: ["Fahrzeug", "Daten", "Prüfen"],
    noRoute: "Wählen Sie Start und Ziel, um die Preise zu sehen.",
    noPrice: "Für diese Strecke haben wir noch keinen Festpreis. Schreiben Sie uns auf WhatsApp für ein Angebot.",
    tooMany: "Zu viele Fahrgäste für dieses Fahrzeug",
    choose: "Wählen", perCar: "pro Auto", oneWay: "einfache Fahrt", withReturn: "inkl. Rückfahrt",
    name: "Vor- und Nachname", email: "E-Mail", phone: "Handynummer (mit Ländervorwahl)", flight: "Flugnummer",
    flightHelp: "Damit wir Ihren Flug verfolgen können", pickup: "Hotel oder Abholadresse", dropoff: "Hotel oder Zieladresse",
    bags: "Koffer", seats: "Kindersitze (€{seat} pro Sitz)", note: "Hinweis für den Fahrer (optional)",
    retFlight: "Rückflugnummer (optional)", retPickup: "Abholadresse für die Rückfahrt", retDropoff: "Zieladresse für die Rückfahrt",
    next: "Weiter", back: "Zurück", send: "Anfrage senden",
    terms: "Ich akzeptiere die <a href=\"/de/agb\" target=\"_blank\">AGB</a> und die <a href=\"/de/datenschutz\" target=\"_blank\">Datenschutzhinweise</a>.",
    review: "Buchung prüfen", total: "Gesamt", pay: "Zahlung: bar an den Fahrer am Ende der Fahrt (EUR, USD oder TRY).",
    peak: "Inkl. Zuschlag für Stoßzeiten", seatsLine: "Kindersitze",
    required: "Bitte füllen Sie dieses Feld aus", invalidEmail: "Bitte prüfen Sie Ihre E-Mail-Adresse", invalidPhone: "Bitte prüfen Sie Ihre Telefonnummer", accept: "Bitte akzeptieren Sie die AGB",
    doneH: "Anfrage erhalten", doneP: "Vielen Dank! Ihre Buchungsnummer ist <strong>{ref}</strong>. Wir haben die Details an {email} geschickt und bestätigen Ihre Buchung in Kürze per E-Mail. Verbindlich ist die Buchung erst mit unserer Bestätigung.",
    error: "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns auf WhatsApp.",
    whatsapp: "Auf WhatsApp fragen"
  },
  footer: { rights: "Alle Rechte vorbehalten.", tursab: "TÜRSAB-Lizenz", contact: "Kontakt", legal: "Rechtliches", routes: "Beliebte Strecken" },
  notFound: { title: "Seite nicht gefunden", p: "Diese Seite gibt es nicht. Hier finden Sie Ihren Preis für das Flughafentaxi.", home: "Zur Startseite" }
};

const blog = {
  "taxi-shortage": {
    slug: B.shortage,
    title: "Warum ist es so schwer, in Istanbul ein Taxi zu finden?",
    desc: "In Istanbul kommt etwa ein Taxi auf 1.000 Einwohner, dazu Tausende Beschwerden. Warum Taxis knapp sind und wie eine Vorabbuchung hilft.",
    lead: "Istanbul hat über 16 Millionen Einwohner, doch die Taxiflotte ist in 30 Jahren kaum gewachsen. Deshalb kann die Suche nach einem Taxi lange dauern, vor allem am Flughafen, im Berufsverkehr oder bei Regen.",
    body: `<h2>Zu wenige Taxis für eine riesige Stadt</h2>
<p>Laut Zahlen der Stadtverwaltung Istanbul aus dem Jahr 2021 gab es in der Stadt <strong>17.395 Taxis</strong>, genauso viele wie in den 1990er-Jahren, während sich die Bevölkerung von 7,5 auf über 16 Millionen mehr als verdoppelt hat. Das ist <strong>etwa ein Taxi pro 1.000 Einwohner</strong>. Zum Vergleich: New York hatte 13.587 Taxis für 8,4 Millionen Menschen (<a href="${SRC.density}" target="_blank" rel="noopener">Quelle</a>).</p>
<p>Das Ergebnis ist einfach: Zu Stoßzeiten suchen viel mehr Menschen ein Taxi, als es Taxis gibt.</p>
{widget}
<h2>Fahrer suchen sich ihre Fahrgäste aus</h2>
<p>Die häufigste Beschwerde über Istanbuler Taxis ist nicht der Preis, sondern dass Fahrer sich Fahrgäste und Strecken aussuchen. In den ersten sechs Monaten 2023 gingen bei der Stadt <strong>33.878 Beschwerden</strong> über Taxis ein. Mehr als die Hälfte, <strong>18.079</strong>, betrafen Fahrer, die wählerisch bei Fahrgast oder Ziel waren. Weitere betrafen überhöhte Preise (3.026), Umwege (1.386), abgelehnte Kurzstrecken (1.290) und nicht eingeschaltete Taxameter (712) (<a href="${SRC.complaints}" target="_blank" rel="noopener">Quelle</a>).</p>
<p>Für Reisende mit Koffern, die kein Türkisch sprechen, macht genau das die erste Stunde in Istanbul stressig.</p>
<h2>Wo es am schwierigsten ist</h2>
<ul>
<li><strong>Am Flughafen nach einem späten Flug:</strong> lange Schlangen am Taxistand, und Familien oder Gruppen passen oft nicht in ein gelbes Taxi.</li>
<li><strong>Im Berufsverkehr und bei Regen:</strong> Taxis sind besetzt oder Fahrer lehnen Fahrten in den Stau ab.</li>
<li><strong>Kurze Fahrten und die asiatische Seite:</strong> Manche Fahrer lehnen Fahrten ab, die sich für sie nicht lohnen, oder die Fahrt über den Bosporus.</li>
</ul>
<h2>Die einfache Lösung: vor der Landung buchen</h2>
<p>Ein vorab gebuchter Transfer löst all das. Bei {brand} wählen Sie Ihr Fahrzeug und sehen den Festpreis schon vor der Reise. Ihr Fahrer verfolgt Ihren Flug und wartet mit Ihrem Namensschild in der Ankunftshalle: keine Schlange, kein Verhandeln, kein Taxameter. Am Ende der Fahrt zahlen Sie genau diesen Preis bar.</p>
<p>Die Buchung dauert etwa eine Minute, ohne Konto und ohne Vorauszahlung. Sie erhalten eine E-Mail, dass Ihre Anfrage eingegangen ist, und dann die Bestätigung, sobald Ihr Fahrzeug zugeteilt ist.</p>
{widget}`
  },
  "taxi-vs-transfer": {
    slug: B.versus,
    title: "Flughafen Istanbul: Taxistand oder Transfer?",
    desc: "Taxi vom Taxistand am Flughafen Istanbul oder Sabiha Gökçen oder ein vorab gebuchter privater Transfer: Preis, Wartezeit, Gepäck und Sicherheit im Vergleich.",
    lead: "Sie landen am Flughafen Istanbul oder in Sabiha Gökçen und müssen zum Hotel. Sie können sich in die Taxischlange stellen oder ein Fahrer wartet schon auf Sie. So schneiden beide im Vergleich ab.",
    body: `<h2>Preis: Taxameter oder Festpreis</h2>
<p>Ein normales Taxi fährt mit Taxameter, der Preis hängt also vom Verkehr und von der Route des Fahrers ab. Überhöhte Preise und Umwege gehören zu den häufigsten Beschwerden über Istanbuler Taxis (<a href="${SRC.complaints}" target="_blank" rel="noopener">Quelle</a>). Ein vorab gebuchter Transfer hat einen Festpreis pro Auto, den Sie vor der Reise kennen. Maut und Parken sind inklusive.</p>
{widget}
<h2>Warten: Schlange oder Namensschild</h2>
<p>Am Taxistand stehen Sie in der Schlange, manchmal lange, wenn mehrere Flüge gleichzeitig landen. Beim Transfer verfolgt Ihr Fahrer Ihren Flug und wartet mit Ihrem Namensschild in der Ankunftshalle. Bei {brand} sind die ersten 60 Minuten nach der Landung kostenlos, eine lange Passkontrolle oder ein verspäteter Koffer kosten also nichts extra.</p>
<h2>Gepäck und Gruppen</h2>
<p>Ein gelbes Taxi nimmt bis zu vier Fahrgäste und wenig Gepäck mit. Beim Transfer wählen Sie das passende Fahrzeug: eine Limousine für bis zu 3, einen Minivan für bis zu 7, eine Mercedes V-Klasse für bis zu 6 oder einen Kleinbus für bis zu 16 Personen. Ein Preis pro Auto, nicht pro Person.</p>
<h2>Sprache und Sicherheit</h2>
<p>Sie müssen Ihre Hoteladresse nicht auf Türkisch erklären: Sie steht schon in Ihrer Buchung. Sie fahren mit einem professionellen Fahrer, der den Weg kennt, und zahlen am Ende den vereinbarten Preis.</p>
<h2>Wann ein Taxi trotzdem passt</h2>
<p>Wenn Sie zu einer ruhigen Zeit landen, allein und mit leichtem Gepäck reisen und Ihr Hotel nah ist, kann ein Taxi vom Taxistand reichen. Für Familien, Gruppen, späte Ankünfte und alle, die den Preis vorher kennen möchten, ist die Vorabbuchung einfacher.</p>
{widget}`
  },
  "how-to-book": {
    slug: B.howto,
    title: "Flughafentransfer in Istanbul in einer Minute buchen",
    desc: "Buchen Sie Ihren Flughafentransfer in Istanbul bei ITB Transfer in einer Minute, ohne Konto und Vorauszahlung. Was danach passiert, Schritt für Schritt.",
    lead: "Einen Transfer bei {brand} zu buchen geht schneller als das Warten am Taxistand. Es dauert etwa eine Minute, ohne Konto und ohne Vorauszahlung. So läuft es genau ab.",
    body: `<h2>1. Strecke und Uhrzeit wählen</h2>
<p>Wählen Sie im Buchungsfeld Ihren Start (Flughafen Istanbul, Sabiha Gökçen oder einen Stadtteil) und Ihr Ziel, dann Datum, Abholzeit und Anzahl der Fahrgäste. Bei einer Abholung am Flughafen geben Sie Ihre Landezeit an. Die Rückfahrt können Sie mit 10 % Rabatt hinzufügen.</p>
{widget}
<h2>2. Fahrzeug wählen und Festpreis sehen</h2>
<p>Sie sehen alle vier Fahrzeuge mit dem Preis pro Auto: Limousine, Minivan, Mercedes V-Klasse und Kleinbus. Fahrzeuge, die für Ihre Gruppe zu klein sind, sind ausgegraut. Der angezeigte Preis ist der Preis, den Sie zahlen.</p>
<h2>3. Daten eingeben</h2>
<p>Name, Handynummer mit Ländervorwahl, E-Mail und Flugnummer, damit wir Ihren Flug verfolgen können. Für eine Abholung oder Fahrt zum Hotel geben Sie die Adresse an. Sie können Kindersitze und einen Hinweis für den Fahrer hinzufügen.</p>
<h2>4. Anfrage senden</h2>
<p>Prüfen Sie die Zusammenfassung und senden Sie sie ab. Sie erhalten sofort eine E-Mail, dass Ihre Anfrage eingegangen ist. Sobald wir Ihr Fahrzeug zugeteilt haben, meist innerhalb einer Stunde, kommt die Bestätigung mit Ihrem Treffpunkt.</p>
<h2>5. Fahrer treffen und bar bezahlen</h2>
<p>Ihr Fahrer wartet mit Ihrem Namensschild in der Ankunftshalle. Am Ende der Fahrt zahlen Sie den Festpreis bar, in Euro, US-Dollar oder türkischer Lira. Kostenlose Stornierung bis 24 Stunden vor der Abholung.</p>
{widget}`
  }
};

const legal = {
  terms: {
    title: "Allgemeine Geschäftsbedingungen",
    desc: "Bedingungen für Buchung, Festpreis, Barzahlung, Wartezeit und kostenlose Stornierung von Flughafentransfers in Istanbul, die auf dieser Website gebucht werden.",
    html: `<p>Diese Bedingungen gelten für Transfers, die auf dieser Website gebucht werden. Betreiber ist {company} ({address}), TÜRSAB-Lizenz {tursab}.</p>
<h2>Buchung</h2><p>Das Absenden des Buchungsformulars ist eine Anfrage. Verbindlich wird die Buchung erst, wenn wir Ihnen eine Bestätigung per E-Mail schicken. Können wir Ihre Anfrage nicht annehmen, teilen wir Ihnen das per E-Mail mit.</p>
<h2>Preis und Zahlung</h2><p>Der bei der Buchung angezeigte Preis ist ein Festpreis pro Auto und enthält Maut, Parken und die unten genannte Wartezeit. Sie zahlen am Ende der Fahrt bar beim Fahrer, in Euro, US-Dollar oder türkischer Lira zum Tageskurs.</p>
<h2>Wartezeit</h2><p>An den Flughäfen sind die ersten 60 Minuten nach der Landung kostenlos. An anderen Adressen wartet der Fahrer 15 Minuten nach der gebuchten Zeit.</p>
<h2>Änderung und Stornierung</h2><p>Sie können bis 24 Stunden vor der Abholung kostenlos ändern oder stornieren, per Antwort auf die Bestätigungs-E-Mail oder über WhatsApp. Erscheinen Sie ohne Absage nicht, können wir den Fahrpreis verlangen.</p>
<h2>Fahrgäste und Gepäck</h2><p>Die Zahl der Fahrgäste und Koffer muss zum gebuchten Fahrzeug passen. Kinder brauchen einen Kindersitz, den Sie bei der Buchung hinzufügen können.</p>
<h2>Kontakt</h2><p>{email} · {phone}</p>`
  },
  privacy: {
    title: "Datenschutzhinweise",
    desc: "Wie wir Name, Telefonnummer, E-Mail und Flugdaten verwenden, die Sie bei der Buchung eines Flughafentaxis in Istanbul angeben, und wie Sie uns dazu erreichen.",
    html: `<p>{company} verarbeitet die personenbezogenen Daten, die Sie bei der Buchung angeben (Name, E-Mail, Telefon, Flugnummer, Adressen, Hinweise), nur um Ihren Transfer zu organisieren und durchzuführen, Sie dazu zu kontaktieren und gesetzliche Pflichten zu erfüllen, etwa die nach türkischem Recht vorgeschriebenen Fahrgastlisten.</p>
<p>Ihre Daten werden nur an den Fahrer oder Partner weitergegeben, der die Fahrt durchführt, und an Dienstleister, die wir für den Betrieb dieser Website nutzen (Hosting, Datenbank, E-Mail). Sie werden so lange gespeichert, wie das Gesetz es verlangt.</p>
<p>Sie können Auskunft, Berichtigung oder Löschung Ihrer Daten verlangen, indem Sie an {email} schreiben.</p>`
  }
};

module.exports = { ui, blog, legal };
