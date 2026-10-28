// Blog post: getting from the Galataport cruise terminal to the airports, Taksim and Sultanahmet, in every
// language. Prices and distances are the ones in data/pricing.json (sedan, one way).
const P = require("../data/pricing.json");
const price = (a, b) => (P.prices[a + "|" + b] || P.prices[b + "|" + a]).sedan;
const E = { ist: price("IST", "galataport"), saw: price("SAW", "galataport"), taksim: price("galataport", "taksim"), sult: price("galataport", "sultanahmet"), van: P.prices["IST|galataport"].minivan };
const KM = { ist: P.dist.IST.galataport, saw: P.dist.SAW.galataport };

// Page addresses per language (the same as build/build.js and build/port.js make)
const L = {
  en: { hub: "/galataport-taxi", ist: "/istanbul-airport-taxi-to-galataport-cruise-port", saw: "/sabiha-gokcen-airport-taxi-to-galataport-cruise-port", taksim: "/galataport-taxi-to-taksim", sult: "/galataport-taxi-to-sultanahmet" },
  ru: { hub: "/ru/taksi-galataport", ist: "/ru/taksi-iz-aeroporta-stambula-v-galataport-cruise-port", saw: "/ru/taksi-iz-sabiha-gokchen-v-galataport-cruise-port", taksim: "/ru/taksi-iz-galataporta-v-taksim", sult: "/ru/taksi-iz-galataporta-v-sultanahmet" },
  de: { hub: "/de/galataport-taxi", ist: "/de/flughafen-istanbul-taxi-nach-galataport-cruise-port", saw: "/de/sabiha-goekcen-taxi-nach-galataport-cruise-port", taksim: "/de/galataport-taxi-nach-taksim", sult: "/de/galataport-taxi-nach-sultanahmet" },
  fr: { hub: "/fr/taxi-galataport", ist: "/fr/taxi-aeroport-istanbul-vers-galataport-cruise-port", saw: "/fr/taxi-sabiha-gokcen-vers-galataport-cruise-port", taksim: "/fr/taxi-galataport-vers-taksim", sult: "/fr/taxi-galataport-vers-sultanahmet" },
  it: { hub: "/it/taxi-galataport", ist: "/it/taxi-aeroporto-istanbul-per-galataport-cruise-port", saw: "/it/taxi-sabiha-gokcen-per-galataport-cruise-port", taksim: "/it/taxi-galataport-per-taksim", sult: "/it/taxi-galataport-per-sultanahmet" },
  nl: { hub: "/nl/galataport-taxi", ist: "/nl/luchthaven-istanbul-taxi-naar-galataport-cruise-port", saw: "/nl/sabiha-gokcen-taxi-naar-galataport-cruise-port", taksim: "/nl/galataport-taxi-naar-taksim", sult: "/nl/galataport-taxi-naar-sultanahmet" }
};

module.exports = {
  id: "galataport",
  date: "2026-10-28",
  en: {
    slug: "galataport-cruise-port-transfer-guide",
    title: "Galataport Transfer Guide: To the Airport, Taksim and Sultanahmet",
    desc: `How to get from Galataport cruise port to Istanbul Airport, Sabiha Gökçen, Taksim and Sultanahmet: distances, fixed prices from €${E.taksim} and tips.`,
    lead: "Galataport is Istanbul's cruise port, right in the city centre on the Bosphorus. Here is how to get from the ship to the airport, your hotel in Taksim or the Old City, and what to plan for on disembarkation day.",
    body: `<h2>Where is Galataport?</h2>
<p>Galataport sits on the European shore of the Bosphorus in Karaköy and Tophane, between the Galata Bridge and Beşiktaş. It opened in 2021 and its cruise terminal is built underground, beneath a public waterfront promenade with shops, cafés and museums. When you leave the ship you go through the terminal and come out at street level, a short walk from the Tophane tram stop.</p>
<p>Because the port is in the middle of the city, Taksim and Sultanahmet are close. The airports are not: both are around 45 to 50 km away.</p>
<h2>Galataport to Istanbul Airport (IST)</h2>
<p>Istanbul Airport is about <strong>${KM.ist[0]} km</strong> from Galataport, roughly <strong>${KM.ist[1]} minutes</strong> by car outside rush hour. With suitcases straight off a cruise, a pre-booked car is the easiest option: a private transfer costs a fixed <strong>€${E.ist} per car</strong> in a sedan for up to 3 passengers, or €${E.van} in a minivan for up to 7. <a href="${L.en.ist}">See all prices</a>.</p>
<h2>Galataport to Sabiha Gökçen Airport (SAW)</h2>
<p>Sabiha Gökçen is on the Asian side, about <strong>${KM.saw[0]} km</strong> and around <strong>${KM.saw[1]} minutes</strong> away, crossing the Bosphorus by bridge. A transfer costs a fixed <strong>€${E.saw} per car</strong>. Plan extra time on weekday afternoons, when bridge traffic is heavy. <a href="${L.en.saw}">See all prices</a>.</p>
{widget}
<h2>Galataport to Taksim</h2>
<p>Taksim Square is about 3 km uphill from the port, roughly 10 to 15 minutes by car. Without luggage you can walk or take the funicular from Kabataş; with suitcases a car is far easier. A private transfer costs <strong>€${E.taksim} per car</strong>. <a href="${L.en.taksim}">Galataport to Taksim</a>.</p>
<h2>Galataport to Sultanahmet</h2>
<p>Sultanahmet, with Hagia Sophia and the Blue Mosque, is about 5 km away across the Galata Bridge, 15 to 20 minutes by car. The T1 tram runs from Tophane to Sultanahmet, but it is crowded and not made for big suitcases. A private transfer to your hotel door costs <strong>€${E.sult} per car</strong>. <a href="${L.en.sult}">Galataport to Sultanahmet</a>.</p>
<h2>Tips for disembarkation day</h2>
<ul>
<li><strong>Tell us your ship and disembarkation time</strong> when you book, so the driver is there when you come out.</li>
<li><strong>Allow time for the airport.</strong> Most passengers leave the ship in the morning; for a flight the same day, give yourself at least three hours between leaving the terminal and departure.</li>
<li><strong>Pick a car that fits your luggage.</strong> Cruise passengers often travel with more bags than usual: a minivan takes up to 7 passengers and 7 suitcases.</li>
<li><strong>The price is per car and fixed.</strong> Tolls are included and you pay the driver in cash in euro, US dollar or Turkish lira.</li>
</ul>
<p>All routes and prices from the port are on our <a href="${L.en.hub}">Galataport taxi page</a>.</p>
{widget}`
  },
  ru: {
    slug: "transfer-iz-galataporta",
    title: "Трансфер из Галатапорта: в аэропорт, Таксим и Султанахмет",
    desc: `Как добраться из круизного порта Галатапорт в аэропорт Стамбула, Сабиха Гёкчен, Таксим и Султанахмет: расстояния, фиксированные цены от €${E.taksim} и советы.`,
    lead: "Галатапорт — круизный порт Стамбула в самом центре города, на берегу Босфора. Рассказываем, как добраться с лайнера в аэропорт, в отель в Таксиме или Старом городе и что учесть в день высадки.",
    body: `<h2>Где находится Галатапорт?</h2>
<p>Галатапорт расположен на европейском берегу Босфора, в районах Каракёй и Топхане, между Галатским мостом и Бешикташем. Он открылся в 2021 году, а его круизный терминал находится под землёй, под открытой набережной с магазинами, кафе и музеями. Сойдя с лайнера, вы проходите через терминал и выходите на улицу в нескольких минутах от трамвайной остановки Tophane.</p>
<p>Порт в центре города, поэтому Таксим и Султанахмет рядом. Аэропорты — нет: до обоих около 45–50 км.</p>
<h2>Из Галатапорта в аэропорт Стамбула (IST)</h2>
<p>До аэропорта Стамбула около <strong>${KM.ist[0]} км</strong>, примерно <strong>${KM.ist[1]} минут</strong> на машине вне часа пик. С чемоданами после круиза удобнее всего заранее заказанная машина: трансфер стоит фиксированные <strong>€${E.ist} за машину</strong> (седан до 3 пассажиров) или €${E.van} за минивэн до 7 человек. <a href="${L.ru.ist}">Все цены</a>.</p>
<h2>Из Галатапорта в аэропорт Сабиха Гёкчен (SAW)</h2>
<p>Сабиха Гёкчен находится на азиатской стороне, примерно в <strong>${KM.saw[0]} км</strong>, около <strong>${KM.saw[1]} минут</strong> пути через мост над Босфором. Трансфер стоит фиксированные <strong>€${E.saw} за машину</strong>. В будни после обеда закладывайте больше времени: на мостах пробки. <a href="${L.ru.saw}">Все цены</a>.</p>
{widget}
<h2>Из Галатапорта в Таксим</h2>
<p>Площадь Таксим примерно в 3 км от порта, вверх по холму, 10–15 минут на машине. Без багажа можно дойти пешком или подняться на фуникулёре из Кабаташа, с чемоданами проще на машине. Трансфер стоит <strong>€${E.taksim} за машину</strong>. <a href="${L.ru.taksim}">Галатапорт — Таксим</a>.</p>
<h2>Из Галатапорта в Султанахмет</h2>
<p>Султанахмет с Айя-Софией и Голубой мечетью примерно в 5 км, через Галатский мост, 15–20 минут на машине. Из Топхане до Султанахмета ходит трамвай T1, но он переполнен и не рассчитан на большие чемоданы. Трансфер до дверей отеля стоит <strong>€${E.sult} за машину</strong>. <a href="${L.ru.sult}">Галатапорт — Султанахмет</a>.</p>
<h2>Советы на день высадки</h2>
<ul>
<li><strong>Укажите лайнер и время высадки</strong> при заказе, чтобы водитель ждал вас на выходе.</li>
<li><strong>Оставьте время до рейса.</strong> Обычно пассажиры сходят с лайнера утром; если вылет в тот же день, закладывайте минимум три часа между выходом из терминала и вылетом.</li>
<li><strong>Выберите машину под багаж.</strong> После круиза чемоданов обычно больше: минивэн вмещает до 7 пассажиров и 7 чемоданов.</li>
<li><strong>Цена за машину и фиксированная.</strong> Платные дороги включены, оплата водителю наличными в евро, долларах или лирах.</li>
</ul>
<p>Все маршруты и цены из порта — на странице <a href="${L.ru.hub}">такси из Галатапорта</a>.</p>
{widget}`
  },
  de: {
    slug: "galataport-transfer",
    title: "Galataport Transfer: zum Flughafen, nach Taksim und Sultanahmet",
    desc: `So kommen Sie vom Kreuzfahrthafen Galataport zum Flughafen Istanbul, nach Sabiha Gökçen, Taksim und Sultanahmet: Entfernungen, Festpreise ab €${E.taksim} und Tipps.`,
    lead: "Galataport ist Istanbuls Kreuzfahrthafen, mitten in der Stadt am Bosporus. So kommen Sie vom Schiff zum Flughafen oder in Ihr Hotel in Taksim oder der Altstadt, und darauf sollten Sie am Ausschiffungstag achten.",
    body: `<h2>Wo liegt Galataport?</h2>
<p>Galataport liegt am europäischen Ufer des Bosporus in Karaköy und Tophane, zwischen der Galatabrücke und Beşiktaş. Der Hafen wurde 2021 eröffnet, sein Kreuzfahrtterminal liegt unterirdisch unter einer öffentlichen Uferpromenade mit Geschäften, Cafés und Museen. Nach dem Verlassen des Schiffs gehen Sie durch das Terminal und kommen auf Straßenniveau heraus, wenige Minuten von der Straßenbahnhaltestelle Tophane.</p>
<p>Weil der Hafen mitten in der Stadt liegt, sind Taksim und Sultanahmet nah. Die Flughäfen nicht: Beide sind rund 45 bis 50 km entfernt.</p>
<h2>Galataport – Flughafen Istanbul (IST)</h2>
<p>Der Flughafen Istanbul ist etwa <strong>${KM.ist[0]} km</strong> entfernt, außerhalb der Stoßzeiten rund <strong>${KM.ist[1]} Minuten</strong> Fahrt. Mit Koffern direkt von der Kreuzfahrt ist ein vorab gebuchtes Auto am einfachsten: Der Transfer kostet fest <strong>€${E.ist} pro Auto</strong> in der Limousine für bis zu 3 Personen oder €${E.van} im Minivan für bis zu 7. <a href="${L.de.ist}">Alle Preise</a>.</p>
<h2>Galataport – Flughafen Sabiha Gökçen (SAW)</h2>
<p>Sabiha Gökçen liegt auf der asiatischen Seite, etwa <strong>${KM.saw[0]} km</strong> und rund <strong>${KM.saw[1]} Minuten</strong> entfernt, über eine Bosporusbrücke. Der Transfer kostet fest <strong>€${E.saw} pro Auto</strong>. Werktags am Nachmittag mehr Zeit einplanen, dann sind die Brücken voll. <a href="${L.de.saw}">Alle Preise</a>.</p>
{widget}
<h2>Galataport – Taksim</h2>
<p>Der Taksim-Platz liegt etwa 3 km bergauf vom Hafen, 10 bis 15 Minuten mit dem Auto. Ohne Gepäck geht es zu Fuß oder mit der Standseilbahn ab Kabataş, mit Koffern ist das Auto viel einfacher. Der Transfer kostet <strong>€${E.taksim} pro Auto</strong>. <a href="${L.de.taksim}">Galataport – Taksim</a>.</p>
<h2>Galataport – Sultanahmet</h2>
<p>Sultanahmet mit Hagia Sophia und Blauer Moschee liegt etwa 5 km entfernt über die Galatabrücke, 15 bis 20 Minuten mit dem Auto. Die Straßenbahn T1 fährt von Tophane nach Sultanahmet, ist aber voll und nicht für große Koffer gemacht. Der Transfer bis vor die Hoteltür kostet <strong>€${E.sult} pro Auto</strong>. <a href="${L.de.sult}">Galataport – Sultanahmet</a>.</p>
<h2>Tipps für den Ausschiffungstag</h2>
<ul>
<li><strong>Nennen Sie uns Schiff und Ausschiffungszeit</strong> bei der Buchung, damit der Fahrer bereitsteht, wenn Sie herauskommen.</li>
<li><strong>Zeit bis zum Flug einplanen.</strong> Meist verlassen die Gäste das Schiff am Vormittag; bei einem Flug am selben Tag mindestens drei Stunden zwischen Terminal und Abflug einplanen.</li>
<li><strong>Ein Auto passend zum Gepäck wählen.</strong> Nach einer Kreuzfahrt sind es oft mehr Koffer: Ein Minivan fasst bis zu 7 Personen und 7 Koffer.</li>
<li><strong>Der Preis gilt pro Auto und ist fest.</strong> Maut ist inklusive, bezahlt wird bar beim Fahrer in Euro, US-Dollar oder Lira.</li>
</ul>
<p>Alle Strecken und Preise ab dem Hafen finden Sie auf unserer Seite <a href="${L.de.hub}">Galataport Taxi</a>.</p>
{widget}`
  },
  fr: {
    slug: "transfert-galataport",
    title: "Transfert Galataport : aéroports, Taksim et Sultanahmet",
    desc: `Comment aller du port de croisière Galataport à l'aéroport d'Istanbul, Sabiha Gökçen, Taksim et Sultanahmet : distances, prix fixes dès €${E.taksim} et conseils.`,
    lead: "Galataport est le port de croisière d'Istanbul, en plein centre-ville sur le Bosphore. Voici comment rejoindre l'aéroport ou votre hôtel à Taksim ou dans la vieille ville, et ce qu'il faut prévoir le jour du débarquement.",
    body: `<h2>Où se trouve Galataport ?</h2>
<p>Galataport se trouve sur la rive européenne du Bosphore, à Karaköy et Tophane, entre le pont de Galata et Beşiktaş. Il a ouvert en 2021 et son terminal de croisière est souterrain, sous une promenade en bord de mer ouverte au public avec boutiques, cafés et musées. En quittant le navire, vous traversez le terminal et ressortez au niveau de la rue, à quelques minutes de l'arrêt de tram Tophane.</p>
<p>Le port étant en plein centre, Taksim et Sultanahmet sont proches. Les aéroports, eux, sont à environ 45 à 50 km.</p>
<h2>Galataport – aéroport d'Istanbul (IST)</h2>
<p>L'aéroport d'Istanbul est à environ <strong>${KM.ist[0]} km</strong>, soit près de <strong>${KM.ist[1]} minutes</strong> en voiture hors heures de pointe. Avec les valises d'une croisière, une voiture réservée à l'avance est le plus simple : le transfert coûte un prix fixe de <strong>€${E.ist} par voiture</strong> en berline jusqu'à 3 passagers, ou €${E.van} en monospace jusqu'à 7. <a href="${L.fr.ist}">Tous les prix</a>.</p>
<h2>Galataport – aéroport Sabiha Gökçen (SAW)</h2>
<p>Sabiha Gökçen est sur la rive asiatique, à environ <strong>${KM.saw[0]} km</strong> et près de <strong>${KM.saw[1]} minutes</strong>, en traversant le Bosphore par un pont. Le transfert coûte un prix fixe de <strong>€${E.saw} par voiture</strong>. Prévoyez plus de temps en semaine l'après-midi, quand les ponts sont chargés. <a href="${L.fr.saw}">Tous les prix</a>.</p>
{widget}
<h2>Galataport – Taksim</h2>
<p>La place Taksim est à environ 3 km en montée depuis le port, 10 à 15 minutes en voiture. Sans bagages, on peut y aller à pied ou par le funiculaire de Kabataş ; avec des valises, la voiture est bien plus simple. Le transfert coûte <strong>€${E.taksim} par voiture</strong>. <a href="${L.fr.taksim}">Galataport – Taksim</a>.</p>
<h2>Galataport – Sultanahmet</h2>
<p>Sultanahmet, avec Sainte-Sophie et la Mosquée bleue, est à environ 5 km par le pont de Galata, 15 à 20 minutes en voiture. Le tram T1 relie Tophane à Sultanahmet, mais il est bondé et peu adapté aux grosses valises. Le transfert jusqu'à la porte de votre hôtel coûte <strong>€${E.sult} par voiture</strong>. <a href="${L.fr.sult}">Galataport – Sultanahmet</a>.</p>
<h2>Conseils pour le jour du débarquement</h2>
<ul>
<li><strong>Indiquez-nous votre navire et l'heure de débarquement</strong> à la réservation, pour que le chauffeur soit là à votre sortie.</li>
<li><strong>Gardez de la marge pour l'avion.</strong> Le débarquement a souvent lieu le matin ; pour un vol le jour même, comptez au moins trois heures entre la sortie du terminal et le décollage.</li>
<li><strong>Choisissez une voiture adaptée aux bagages.</strong> Après une croisière, on a souvent plus de valises : un monospace prend jusqu'à 7 passagers et 7 valises.</li>
<li><strong>Le prix est fixe et par voiture.</strong> Les péages sont inclus et vous payez le chauffeur en espèces, en euros, dollars ou livres turques.</li>
</ul>
<p>Tous les trajets et prix depuis le port sont sur notre page <a href="${L.fr.hub}">taxi Galataport</a>.</p>
{widget}`
  },
  it: {
    slug: "transfer-galataport",
    title: "Transfer Galataport: aeroporti, Taksim e Sultanahmet",
    desc: `Come andare dal porto crociere Galataport all'aeroporto di Istanbul, Sabiha Gökçen, Taksim e Sultanahmet: distanze, prezzi fissi da €${E.taksim} e consigli.`,
    lead: "Galataport è il porto crociere di Istanbul, in pieno centro sul Bosforo. Ecco come arrivare dalla nave all'aeroporto o al vostro hotel a Taksim o nella città vecchia, e cosa considerare il giorno dello sbarco.",
    body: `<h2>Dove si trova Galataport?</h2>
<p>Galataport si trova sulla sponda europea del Bosforo, a Karaköy e Tophane, tra il ponte di Galata e Beşiktaş. È stato inaugurato nel 2021 e il suo terminal crociere è sotterraneo, sotto una passeggiata pubblica sul mare con negozi, caffè e musei. Scesi dalla nave si attraversa il terminal e si esce in strada, a pochi minuti dalla fermata del tram Tophane.</p>
<p>Essendo in pieno centro, Taksim e Sultanahmet sono vicini. Gli aeroporti no: entrambi sono a circa 45-50 km.</p>
<h2>Galataport – aeroporto di Istanbul (IST)</h2>
<p>L'aeroporto di Istanbul dista circa <strong>${KM.ist[0]} km</strong>, circa <strong>${KM.ist[1]} minuti</strong> in auto fuori dall'ora di punta. Con le valigie di una crociera, un'auto prenotata è la soluzione più semplice: il transfer costa un prezzo fisso di <strong>€${E.ist} per auto</strong> in berlina fino a 3 passeggeri, o €${E.van} in minivan fino a 7. <a href="${L.it.ist}">Tutti i prezzi</a>.</p>
<h2>Galataport – aeroporto Sabiha Gökçen (SAW)</h2>
<p>Sabiha Gökçen è sulla sponda asiatica, a circa <strong>${KM.saw[0]} km</strong> e circa <strong>${KM.saw[1]} minuti</strong>, attraversando il Bosforo su un ponte. Il transfer costa un prezzo fisso di <strong>€${E.saw} per auto</strong>. Nei pomeriggi feriali calcolate più tempo, perché i ponti sono trafficati. <a href="${L.it.saw}">Tutti i prezzi</a>.</p>
{widget}
<h2>Galataport – Taksim</h2>
<p>Piazza Taksim è a circa 3 km in salita dal porto, 10-15 minuti in auto. Senza bagagli si può andare a piedi o con la funicolare da Kabataş; con le valigie l'auto è molto più comoda. Il transfer costa <strong>€${E.taksim} per auto</strong>. <a href="${L.it.taksim}">Galataport – Taksim</a>.</p>
<h2>Galataport – Sultanahmet</h2>
<p>Sultanahmet, con Santa Sofia e la Moschea Blu, è a circa 5 km attraverso il ponte di Galata, 15-20 minuti in auto. Il tram T1 va da Tophane a Sultanahmet, ma è affollato e poco adatto alle valigie grandi. Il transfer fino alla porta dell'hotel costa <strong>€${E.sult} per auto</strong>. <a href="${L.it.sult}">Galataport – Sultanahmet</a>.</p>
<h2>Consigli per il giorno dello sbarco</h2>
<ul>
<li><strong>Indicateci nave e orario di sbarco</strong> quando prenotate, così l'autista è lì quando uscite.</li>
<li><strong>Lasciate margine per il volo.</strong> Di solito si sbarca in mattinata; per un volo nello stesso giorno calcolate almeno tre ore tra l'uscita dal terminal e la partenza.</li>
<li><strong>Scegliete un'auto adatta ai bagagli.</strong> Dopo una crociera le valigie sono spesso di più: un minivan porta fino a 7 passeggeri e 7 valigie.</li>
<li><strong>Il prezzo è fisso e per auto.</strong> I pedaggi sono inclusi e si paga l'autista in contanti, in euro, dollari o lire turche.</li>
</ul>
<p>Tutte le tratte e i prezzi dal porto sono sulla nostra pagina <a href="${L.it.hub}">taxi Galataport</a>.</p>
{widget}`
  },
  nl: {
    slug: "galataport-transfer",
    title: "Galataport transfer: naar de luchthaven, Taksim en Sultanahmet",
    desc: `Zo komt u van cruiseterminal Galataport naar Luchthaven Istanbul, Sabiha Gökçen, Taksim en Sultanahmet: afstanden, vaste prijzen vanaf €${E.taksim} en tips.`,
    lead: "Galataport is de cruisehaven van Istanbul, midden in de stad aan de Bosporus. Zo komt u van het schip naar de luchthaven of uw hotel in Taksim of de oude stad, en hier let u op op de dag van ontscheping.",
    body: `<h2>Waar ligt Galataport?</h2>
<p>Galataport ligt aan de Europese oever van de Bosporus in Karaköy en Tophane, tussen de Galatabrug en Beşiktaş. De haven opende in 2021 en de cruiseterminal ligt ondergronds, onder een openbare boulevard met winkels, cafés en musea. Na het verlaten van het schip loopt u door de terminal en komt u op straatniveau uit, op een paar minuten van tramhalte Tophane.</p>
<p>Omdat de haven midden in de stad ligt, zijn Taksim en Sultanahmet dichtbij. De luchthavens niet: die liggen allebei op zo'n 45 tot 50 km.</p>
<h2>Galataport – Luchthaven Istanbul (IST)</h2>
<p>Luchthaven Istanbul ligt op ongeveer <strong>${KM.ist[0]} km</strong>, buiten de spits zo'n <strong>${KM.ist[1]} minuten</strong> rijden. Met koffers direct van de cruise is een vooraf geboekte auto het makkelijkst: de transfer kost vast <strong>€${E.ist} per auto</strong> in een sedan voor maximaal 3 personen, of €${E.van} in een minivan voor maximaal 7. <a href="${L.nl.ist}">Alle prijzen</a>.</p>
<h2>Galataport – Luchthaven Sabiha Gökçen (SAW)</h2>
<p>Sabiha Gökçen ligt aan de Aziatische kant, op ongeveer <strong>${KM.saw[0]} km</strong> en zo'n <strong>${KM.saw[1]} minuten</strong>, over een Bosporusbrug. De transfer kost vast <strong>€${E.saw} per auto</strong>. Reken op doordeweekse middagen op extra tijd, want dan staan de bruggen vol. <a href="${L.nl.saw}">Alle prijzen</a>.</p>
{widget}
<h2>Galataport – Taksim</h2>
<p>Het Taksimplein ligt zo'n 3 km heuvelopwaarts van de haven, 10 tot 15 minuten met de auto. Zonder bagage kunt u lopen of de kabelspoorweg vanaf Kabataş nemen; met koffers is de auto veel makkelijker. De transfer kost <strong>€${E.taksim} per auto</strong>. <a href="${L.nl.taksim}">Galataport – Taksim</a>.</p>
<h2>Galataport – Sultanahmet</h2>
<p>Sultanahmet, met de Aya Sofia en de Blauwe Moskee, ligt zo'n 5 km verderop over de Galatabrug, 15 tot 20 minuten met de auto. Tram T1 rijdt van Tophane naar Sultanahmet, maar is druk en niet gemaakt voor grote koffers. De transfer tot de deur van uw hotel kost <strong>€${E.sult} per auto</strong>. <a href="${L.nl.sult}">Galataport – Sultanahmet</a>.</p>
<h2>Tips voor de dag van ontscheping</h2>
<ul>
<li><strong>Geef bij de boeking uw schip en ontschepingstijd door</strong>, zodat de chauffeur klaarstaat als u naar buiten komt.</li>
<li><strong>Houd tijd over voor uw vlucht.</strong> Meestal gaan passagiers 's ochtends van boord; plan bij een vlucht op dezelfde dag minstens drie uur tussen het verlaten van de terminal en vertrek.</li>
<li><strong>Kies een auto die bij uw bagage past.</strong> Na een cruise heeft u vaak meer koffers: een minivan neemt tot 7 personen en 7 koffers mee.</li>
<li><strong>De prijs is vast en per auto.</strong> Tol is inbegrepen en u betaalt de chauffeur contant in euro, dollar of lira.</li>
</ul>
<p>Alle routes en prijzen vanaf de haven staan op onze pagina <a href="${L.nl.hub}">Galataport taxi</a>.</p>
{widget}`
  }
};
