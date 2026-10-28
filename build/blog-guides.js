// Blog posts for travellers arriving in Istanbul: Istanbul Airport and Sabiha Gökçen arrival guides, taxi scams and
// how to avoid them, and where to stay. In every site language. Prices and distances come from data/pricing.json
// (sedan, one way), page addresses from the same path functions build/build.js uses.
const P = require("../data/pricing.json");
const Q = require("../public/assets/quote.js");
const site = require("../data/site.json");
const I = require("./i18n");
const PL = require("./places");
const LANGS = ["en", "ru", "de", "fr", "it", "nl"];
const paths = l => I[l] ? I[l].paths : require("./lang/" + l).ui.paths;
const pr = (a, z) => Q.base(P, a, z, "sedan");
const km = (a, z) => (P.dist[a] && P.dist[a][z]) || (P.dist[z] && P.dist[z][a]);
const slug = z => Q.zone(P, z).slug;
// every link a post needs, per language
const L = Object.fromEntries(LANGS.map(l => {
  const p = paths(l), r = (a, z) => p.route(a, slug(z));
  return [l, {
    ist: p.IST, saw: p.SAW, prices: p.prices,
    sult: r("IST", "sultanahmet"), taksim: r("IST", "taksim"), karakoy: r("IST", "karakoy"), besiktas: r("IST", "besiktas"), sisli: r("IST", "sisli"),
    kadikoy: r("SAW", "kadikoy"), uskudar: r("SAW", "uskudar"), sawTaksim: r("SAW", "taksim"), nisantasi: PL.T[l].path("nisantasi")
  }];
}));
const E = {
  ist: Math.min(...["taksim", "sisli"].map(z => pr("IST", z))), saw: Math.min(...["atasehir", "uskudar"].map(z => pr("SAW", z))),
  sult: pr("IST", "sultanahmet"), taksim: pr("IST", "taksim"), karakoy: pr("IST", "karakoy"), besiktas: pr("IST", "besiktas"), sisli: pr("IST", "sisli"),
  kadikoy: pr("SAW", "kadikoy"), uskudar: pr("SAW", "uskudar"), sawTaksim: pr("SAW", "taksim"), wait: P.rules.freeWaitMin
};
const K = { istTaksim: km("IST", "taksim"), istSult: km("IST", "sultanahmet"), sawTaksim: km("SAW", "taksim"), sawKadikoy: km("SAW", "kadikoy") };
const MEET = { IST: site.meet.IST, SAW: site.meet.SAW };

module.exports = [
  {
    id: "ist-arrival",
    date: "2026-10-28",
    en: {
      slug: "istanbul-airport-arrival-guide",
      title: "Istanbul Airport (IST) Arrival Guide: From Plane to Hotel",
      desc: `Arriving at Istanbul Airport: passport control, SIM cards, money, where your driver waits and how to get to the city. Transfers from €${E.ist} per car.`,
      lead: "Istanbul Airport (IST) is one of the largest airports in the world, and the walk from the gate to the exit can be long. Here is what happens after you land, step by step, and how to get to your hotel.",
      body: `<h2>1. Passport control and baggage</h2>
<p>Follow the signs for international arrivals to passport control. Check before you fly whether you need a visa: many nationalities can apply for an e-Visa online in a few minutes. After passport control comes baggage reclaim, then customs, and then the arrivals hall. At busy times the whole process can take 45 minutes or more, which is why we track your flight and include <strong>${E.wait} minutes of free waiting</strong> after landing.</p>
<h2>2. SIM card and money</h2>
<p>The mobile operators have shops in the arrivals hall where you can buy a tourist SIM card with your passport, or you can set up an eSIM before you travel. ATMs and exchange offices are there too; rates are usually better in the city, so change only what you need for the first day.</p>
{widget}
<h2>3. Where your driver waits</h2>
<p>${MEET.IST.en} Your driver has your flight number, so a delay does not change anything for you.</p>
<h2>4. Getting to the city</h2>
<ul>
<li><strong>Private transfer:</strong> the car waits for you, the price is fixed and you go straight to your hotel. Taksim is about ${K.istTaksim[0]} km (${K.istTaksim[1]} minutes), Sultanahmet about ${K.istSult[0]} km. With us: <a href="${L.en.taksim}">Taksim €${E.taksim}</a>, <a href="${L.en.sult}">Sultanahmet €${E.sult}</a> per car.</li>
<li><strong>Metro:</strong> the M11 line runs to Gayrettepe, where you change to the M2 for Taksim. Cheap, but with changes and stairs.</li>
<li><strong>Havaist bus:</strong> buses to Taksim, Sultanahmet and other districts; you still walk from the stop to your hotel.</li>
<li><strong>Taxi rank:</strong> no booking, but often a queue and a meter that runs in traffic.</li>
</ul>
<p>All prices from the airport are on our <a href="${L.en.ist}">Istanbul Airport taxi page</a>.</p>
{widget}`
    },
    ru: {
      slug: "aeroport-stambula-gid-po-pribytiyu",
      title: "Аэропорт Стамбула (IST): гид по прибытию, от самолёта до отеля",
      desc: `Прилёт в аэропорт Стамбула: паспортный контроль, SIM-карта, деньги, где ждёт водитель и как добраться до города. Трансфер от €${E.ist} за машину.`,
      lead: "Аэропорт Стамбула (IST) — один из крупнейших в мире, и путь от гейта до выхода бывает долгим. Рассказываем по шагам, что происходит после посадки и как добраться до отеля.",
      body: `<h2>1. Паспортный контроль и багаж</h2>
<p>Идите по указателям международных прилётов к паспортному контролю. Перед поездкой проверьте, нужна ли вам виза. После паспортного контроля — выдача багажа, таможня и зал прилёта. В часы пик всё это может занять 45 минут и больше, поэтому мы отслеживаем рейс и даём <strong>${E.wait} минут бесплатного ожидания</strong> после посадки.</p>
<h2>2. SIM-карта и деньги</h2>
<p>В зале прилёта есть салоны мобильных операторов, где по паспорту можно купить туристическую SIM-карту, или заранее подключите eSIM. Там же банкоматы и обменники; в городе курс обычно лучше, поэтому меняйте только то, что нужно на первый день.</p>
{widget}
<h2>3. Где ждёт водитель</h2>
<p>${MEET.IST.ru} У водителя есть номер вашего рейса, так что задержка для вас ничего не меняет.</p>
<h2>4. Как добраться до города</h2>
<ul>
<li><strong>Индивидуальный трансфер:</strong> машина ждёт вас, цена фиксирована, едете прямо в отель. До Таксима около ${K.istTaksim[0]} км (${K.istTaksim[1]} минут), до Султанахмета около ${K.istSult[0]} км. У нас: <a href="${L.ru.taksim}">Таксим €${E.taksim}</a>, <a href="${L.ru.sult}">Султанахмет €${E.sult}</a> за машину.</li>
<li><strong>Метро:</strong> линия M11 идёт до Гайреттепе, там пересадка на M2 до Таксима. Дёшево, но с пересадками и лестницами.</li>
<li><strong>Автобус Havaist:</strong> до Таксима, Султанахмета и других районов; от остановки до отеля всё равно идти пешком.</li>
<li><strong>Стоянка такси:</strong> без брони, но часто очередь и счётчик, который крутится в пробках.</li>
</ul>
<p>Все цены из аэропорта — на странице <a href="${L.ru.ist}">такси из аэропорта Стамбула</a>.</p>
{widget}`
    },
    de: {
      slug: "flughafen-istanbul-ankunft",
      title: "Ankunft am Flughafen Istanbul (IST): Vom Flugzeug zum Hotel",
      desc: `Ankunft am Flughafen Istanbul: Passkontrolle, SIM-Karte, Geld, wo Ihr Fahrer wartet und wie Sie in die Stadt kommen. Transfer ab €${E.ist} pro Auto.`,
      lead: "Der Flughafen Istanbul (IST) gehört zu den größten der Welt, und der Weg vom Gate zum Ausgang kann lang sein. Hier steht Schritt für Schritt, was nach der Landung passiert und wie Sie zum Hotel kommen.",
      body: `<h2>1. Passkontrolle und Gepäck</h2>
<p>Folgen Sie den Schildern für internationale Ankünfte zur Passkontrolle. Prüfen Sie vor dem Flug, ob Sie ein Visum brauchen. Danach kommen Gepäckausgabe, Zoll und die Ankunftshalle. Zu Stoßzeiten dauert das 45 Minuten oder länger; deshalb verfolgen wir Ihren Flug und schließen <strong>${E.wait} Minuten kostenlose Wartezeit</strong> nach der Landung ein.</p>
<h2>2. SIM-Karte und Geld</h2>
<p>In der Ankunftshalle haben die Mobilfunkanbieter Shops, in denen Sie mit Ihrem Pass eine Touristen-SIM kaufen können; alternativ richten Sie vorab eine eSIM ein. Geldautomaten und Wechselstuben gibt es dort auch; in der Stadt sind die Kurse meist besser, wechseln Sie also nur, was Sie für den ersten Tag brauchen.</p>
{widget}
<h2>3. Wo Ihr Fahrer wartet</h2>
<p>${MEET.IST.de} Ihr Fahrer kennt Ihre Flugnummer, eine Verspätung ändert für Sie also nichts.</p>
<h2>4. In die Stadt</h2>
<ul>
<li><strong>Privater Transfer:</strong> das Auto wartet, der Preis steht fest und Sie fahren direkt zum Hotel. Bis Taksim sind es etwa ${K.istTaksim[0]} km (${K.istTaksim[1]} Minuten), bis Sultanahmet etwa ${K.istSult[0]} km. Bei uns: <a href="${L.de.taksim}">Taksim €${E.taksim}</a>, <a href="${L.de.sult}">Sultanahmet €${E.sult}</a> pro Auto.</li>
<li><strong>Metro:</strong> die Linie M11 fährt bis Gayrettepe, dort steigen Sie in die M2 nach Taksim um. Günstig, aber mit Umsteigen und Treppen.</li>
<li><strong>Havaist-Bus:</strong> Busse nach Taksim, Sultanahmet und in andere Viertel; von der Haltestelle laufen Sie zum Hotel.</li>
<li><strong>Taxistand:</strong> keine Buchung nötig, aber oft eine Schlange und ein Taxameter, das im Stau weiterläuft.</li>
</ul>
<p>Alle Preise ab Flughafen finden Sie auf unserer Seite <a href="${L.de.ist}">Taxi Flughafen Istanbul</a>.</p>
{widget}`
    },
    fr: {
      slug: "arrivee-aeroport-istanbul",
      title: "Arrivée à l'aéroport d'Istanbul (IST) : de l'avion à l'hôtel",
      desc: `Arriver à l'aéroport d'Istanbul : contrôle des passeports, carte SIM, argent, où vous attend le chauffeur et comment rejoindre la ville. Dès €${E.ist} par voiture.`,
      lead: "L'aéroport d'Istanbul (IST) est l'un des plus grands du monde, et le trajet de la porte à la sortie peut être long. Voici, étape par étape, ce qui se passe après l'atterrissage et comment rejoindre votre hôtel.",
      body: `<h2>1. Contrôle des passeports et bagages</h2>
<p>Suivez les panneaux des arrivées internationales jusqu'au contrôle des passeports. Vérifiez avant le départ si vous avez besoin d'un visa. Viennent ensuite la récupération des bagages, la douane puis le hall des arrivées. Aux heures chargées, cela peut prendre 45 minutes ou plus : c'est pourquoi nous suivons votre vol et incluons <strong>${E.wait} minutes d'attente gratuite</strong> après l'atterrissage.</p>
<h2>2. Carte SIM et argent</h2>
<p>Les opérateurs mobiles ont des boutiques dans le hall des arrivées, où vous pouvez acheter une carte SIM touristique avec votre passeport ; vous pouvez aussi installer une eSIM avant le départ. Distributeurs et bureaux de change sont sur place ; les taux sont souvent meilleurs en ville, changez donc seulement ce qu'il faut pour le premier jour.</p>
{widget}
<h2>3. Où vous attend votre chauffeur</h2>
<p>${MEET.IST.fr} Votre chauffeur a votre numéro de vol : un retard ne change rien pour vous.</p>
<h2>4. Rejoindre la ville</h2>
<ul>
<li><strong>Transfert privé :</strong> la voiture vous attend, le prix est fixe et vous allez directement à l'hôtel. Taksim est à environ ${K.istTaksim[0]} km (${K.istTaksim[1]} minutes), Sultanahmet à environ ${K.istSult[0]} km. Chez nous : <a href="${L.fr.taksim}">Taksim €${E.taksim}</a>, <a href="${L.fr.sult}">Sultanahmet €${E.sult}</a> par voiture.</li>
<li><strong>Métro :</strong> la ligne M11 va jusqu'à Gayrettepe, où vous prenez la M2 pour Taksim. Bon marché, mais avec changements et escaliers.</li>
<li><strong>Bus Havaist :</strong> vers Taksim, Sultanahmet et d'autres quartiers ; il reste à marcher de l'arrêt à l'hôtel.</li>
<li><strong>Station de taxis :</strong> sans réservation, mais souvent une file d'attente et un compteur qui tourne dans les bouchons.</li>
</ul>
<p>Tous les prix depuis l'aéroport sont sur notre page <a href="${L.fr.ist}">taxi aéroport d'Istanbul</a>.</p>
{widget}`
    },
    it: {
      slug: "arrivo-aeroporto-istanbul",
      title: "Arrivo all'Aeroporto di Istanbul (IST): dall'aereo all'hotel",
      desc: `Arrivo all'Aeroporto di Istanbul: controllo passaporti, SIM, soldi, dove ti aspetta l'autista e come raggiungere la città. Transfer da €${E.ist} per auto.`,
      lead: "L'Aeroporto di Istanbul (IST) è tra i più grandi al mondo e il percorso dal gate all'uscita può essere lungo. Ecco passo per passo cosa succede dopo l'atterraggio e come arrivare in hotel.",
      body: `<h2>1. Controllo passaporti e bagagli</h2>
<p>Segui le indicazioni per gli arrivi internazionali fino al controllo passaporti. Prima di partire verifica se ti serve un visto. Poi ci sono il ritiro bagagli, la dogana e la sala arrivi. Nelle ore di punta può volerci 45 minuti o più: per questo seguiamo il tuo volo e includiamo <strong>${E.wait} minuti di attesa gratuita</strong> dopo l'atterraggio.</p>
<h2>2. SIM e soldi</h2>
<p>Nella sala arrivi ci sono i negozi degli operatori mobili, dove con il passaporto puoi comprare una SIM turistica; in alternativa attiva una eSIM prima di partire. Ci sono anche bancomat e cambiavalute; in città il cambio di solito è migliore, quindi cambia solo quanto ti serve per il primo giorno.</p>
{widget}
<h2>3. Dove ti aspetta l'autista</h2>
<p>${MEET.IST.it} L'autista ha il numero del tuo volo, quindi un ritardo per te non cambia nulla.</p>
<h2>4. Come arrivare in città</h2>
<ul>
<li><strong>Transfer privato:</strong> l'auto ti aspetta, il prezzo è fisso e vai dritto in hotel. Taksim è a circa ${K.istTaksim[0]} km (${K.istTaksim[1]} minuti), Sultanahmet a circa ${K.istSult[0]} km. Con noi: <a href="${L.it.taksim}">Taksim €${E.taksim}</a>, <a href="${L.it.sult}">Sultanahmet €${E.sult}</a> per auto.</li>
<li><strong>Metro:</strong> la linea M11 arriva a Gayrettepe, dove si cambia per la M2 verso Taksim. Economica, ma con cambi e scale.</li>
<li><strong>Bus Havaist:</strong> per Taksim, Sultanahmet e altri quartieri; dalla fermata all'hotel si va a piedi.</li>
<li><strong>Taxi in fila:</strong> nessuna prenotazione, ma spesso c'è coda e il tassametro corre nel traffico.</li>
</ul>
<p>Tutti i prezzi dall'aeroporto sono nella pagina <a href="${L.it.ist}">taxi Aeroporto di Istanbul</a>.</p>
{widget}`
    },
    nl: {
      slug: "aankomst-luchthaven-istanbul",
      title: "Aankomst op Istanbul Airport (IST): van vliegtuig naar hotel",
      desc: `Aankomen op Istanbul Airport: paspoortcontrole, simkaart, geld, waar je chauffeur wacht en hoe je in de stad komt. Transfers vanaf €${E.ist} per auto.`,
      lead: "Istanbul Airport (IST) is een van de grootste luchthavens ter wereld en de weg van de gate naar de uitgang kan lang zijn. Hier lees je stap voor stap wat er na de landing gebeurt en hoe je bij je hotel komt.",
      body: `<h2>1. Paspoortcontrole en bagage</h2>
<p>Volg de borden voor internationale aankomsten naar de paspoortcontrole. Controleer voor vertrek of je een visum nodig hebt. Daarna volgen bagageband, douane en de aankomsthal. Op drukke momenten duurt dat 45 minuten of langer; daarom volgen we je vlucht en zit er <strong>${E.wait} minuten gratis wachttijd</strong> na de landing in de prijs.</p>
<h2>2. Simkaart en geld</h2>
<p>In de aankomsthal hebben de mobiele providers winkels waar je met je paspoort een toeristensimkaart koopt; je kunt ook vooraf een eSIM regelen. Er zijn geldautomaten en wisselkantoren; in de stad is de koers meestal beter, dus wissel alleen wat je de eerste dag nodig hebt.</p>
{widget}
<h2>3. Waar je chauffeur wacht</h2>
<p>${MEET.IST.nl} Je chauffeur heeft je vluchtnummer, dus een vertraging verandert voor jou niets.</p>
<h2>4. Naar de stad</h2>
<ul>
<li><strong>Privétransfer:</strong> de auto wacht op je, de prijs staat vast en je gaat direct naar je hotel. Taksim ligt op zo'n ${K.istTaksim[0]} km (${K.istTaksim[1]} minuten), Sultanahmet op zo'n ${K.istSult[0]} km. Bij ons: <a href="${L.nl.taksim}">Taksim €${E.taksim}</a>, <a href="${L.nl.sult}">Sultanahmet €${E.sult}</a> per auto.</li>
<li><strong>Metro:</strong> lijn M11 rijdt naar Gayrettepe, waar je overstapt op de M2 naar Taksim. Goedkoop, maar met overstappen en trappen.</li>
<li><strong>Havaist-bus:</strong> naar Taksim, Sultanahmet en andere wijken; vanaf de halte loop je naar je hotel.</li>
<li><strong>Taxistandplaats:</strong> niet boeken, maar vaak een rij en een meter die in de file doorloopt.</li>
</ul>
<p>Alle prijzen vanaf de luchthaven staan op onze pagina <a href="${L.nl.ist}">taxi Istanbul Airport</a>.</p>
{widget}`
    }
  },
  {
    id: "saw-arrival",
    date: "2026-10-28",
    en: {
      slug: "sabiha-gokcen-airport-arrival-guide",
      title: "Sabiha Gökçen Airport (SAW) Arrival Guide for Travellers",
      desc: `Arriving at Sabiha Gökçen: where your driver waits, metro and buses, and which hotels are closer from the Asian side. Transfers from €${E.saw} per car.`,
      lead: "Sabiha Gökçen (SAW) is Istanbul's second airport, on the Asian side of the city. It is the main base for low-cost flights, and it is closer to Kadıköy and Üsküdar than to the Old City. Here is what to expect when you land.",
      body: `<h2>Where is Sabiha Gökçen?</h2>
<p>The airport is in Pendik, on the Asian side. Taksim is about ${K.sawTaksim[0]} km away (${K.sawTaksim[1]} minutes outside rush hour) across one of the Bosphorus bridges, while Kadıköy is about ${K.sawKadikoy[0]} km. If your hotel is on the Asian side, this is the closer airport.</p>
<h2>After you land</h2>
<p>Passport control, baggage reclaim and customs are followed by the arrivals hall, where you find mobile operator shops for a tourist SIM card, ATMs and exchange offices. Change only a little money at the airport; rates are usually better in the city.</p>
{widget}
<h2>Where your driver waits</h2>
<p>${MEET.SAW.en} We track your flight and the first ${E.wait} minutes after landing are free.</p>
<h2>Getting to the city</h2>
<ul>
<li><strong>Private transfer:</strong> fixed price per car, straight to your door. With us: <a href="${L.en.kadikoy}">Kadıköy €${E.kadikoy}</a>, <a href="${L.en.uskudar}">Üsküdar €${E.uskudar}</a>, <a href="${L.en.sawTaksim}">Taksim €${E.sawTaksim}</a>.</li>
<li><strong>Metro:</strong> the M4 line runs from the airport to Kadıköy, where ferries cross to the European side.</li>
<li><strong>Havabus:</strong> buses to Taksim and Kadıköy.</li>
<li><strong>Taxi rank:</strong> metered, and drivers may be reluctant to cross the Bosphorus at rush hour.</li>
</ul>
<p>Evening traffic towards the bridges is heavy, which is why pickups between 14:45 and 21:00 cost a little more. All prices are on our <a href="${L.en.saw}">Sabiha Gökçen taxi page</a>.</p>
{widget}`
    },
    ru: {
      slug: "aeroport-sabiha-gokchen-gid-po-pribytiyu",
      title: "Аэропорт Сабиха Гёкчен (SAW): гид по прибытию",
      desc: `Прилёт в Сабиху Гёкчен: где ждёт водитель, метро и автобусы, какие отели ближе с азиатской стороны. Трансфер от €${E.saw} за машину.`,
      lead: "Сабиха Гёкчен (SAW) — второй аэропорт Стамбула, на азиатской стороне города. Это главная база лоукостеров, и он ближе к Кадыкёю и Ускюдару, чем к Старому городу. Вот что ждёт вас после посадки.",
      body: `<h2>Где находится Сабиха Гёкчен?</h2>
<p>Аэропорт находится в районе Пендик на азиатской стороне. До Таксима около ${K.sawTaksim[0]} км (${K.sawTaksim[1]} минут вне часа пик) через один из мостов через Босфор, до Кадыкёя — около ${K.sawKadikoy[0]} км. Если ваш отель на азиатской стороне, этот аэропорт ближе.</p>
<h2>После посадки</h2>
<p>После паспортного контроля, выдачи багажа и таможни вы попадаете в зал прилёта: там салоны мобильных операторов с туристическими SIM-картами, банкоматы и обменники. В аэропорту меняйте немного: в городе курс обычно лучше.</p>
{widget}
<h2>Где ждёт водитель</h2>
<p>${MEET.SAW.ru} Мы отслеживаем рейс, первые ${E.wait} минут после посадки бесплатно.</p>
<h2>Как добраться до города</h2>
<ul>
<li><strong>Индивидуальный трансфер:</strong> фиксированная цена за машину, прямо до двери. У нас: <a href="${L.ru.kadikoy}">Кадыкёй €${E.kadikoy}</a>, <a href="${L.ru.uskudar}">Ускюдар €${E.uskudar}</a>, <a href="${L.ru.sawTaksim}">Таксим €${E.sawTaksim}</a>.</li>
<li><strong>Метро:</strong> линия M4 идёт от аэропорта до Кадыкёя, откуда паромы ходят на европейскую сторону.</li>
<li><strong>Havabus:</strong> автобусы до Таксима и Кадыкёя.</li>
<li><strong>Стоянка такси:</strong> по счётчику, и в час пик водители неохотно едут через Босфор.</li>
</ul>
<p>Вечером дороги к мостам загружены, поэтому подача с 14:45 до 21:00 немного дороже. Все цены — на странице <a href="${L.ru.saw}">такси из Сабихи Гёкчен</a>.</p>
{widget}`
    },
    de: {
      slug: "flughafen-sabiha-goekcen-ankunft",
      title: "Ankunft am Flughafen Sabiha Gökçen (SAW): Tipps für Reisende",
      desc: `Ankunft in Sabiha Gökçen: wo Ihr Fahrer wartet, Metro und Busse, und welche Hotels von der asiatischen Seite näher sind. Transfer ab €${E.saw} pro Auto.`,
      lead: "Sabiha Gökçen (SAW) ist Istanbuls zweiter Flughafen, auf der asiatischen Seite der Stadt. Er ist das Drehkreuz der Billigflieger und liegt näher an Kadıköy und Üsküdar als an der Altstadt. Das erwartet Sie nach der Landung.",
      body: `<h2>Wo liegt Sabiha Gökçen?</h2>
<p>Der Flughafen liegt in Pendik auf der asiatischen Seite. Bis Taksim sind es etwa ${K.sawTaksim[0]} km (${K.sawTaksim[1]} Minuten außerhalb der Stoßzeit) über eine der Bosporusbrücken, bis Kadıköy etwa ${K.sawKadikoy[0]} km. Liegt Ihr Hotel auf der asiatischen Seite, ist dies der nähere Flughafen.</p>
<h2>Nach der Landung</h2>
<p>Nach Passkontrolle, Gepäckausgabe und Zoll kommen Sie in die Ankunftshalle mit Shops der Mobilfunkanbieter für Touristen-SIMs, Geldautomaten und Wechselstuben. Wechseln Sie am Flughafen nur wenig; in der Stadt sind die Kurse meist besser.</p>
{widget}
<h2>Wo Ihr Fahrer wartet</h2>
<p>${MEET.SAW.de} Wir verfolgen Ihren Flug, die ersten ${E.wait} Minuten nach der Landung sind kostenlos.</p>
<h2>In die Stadt</h2>
<ul>
<li><strong>Privater Transfer:</strong> Festpreis pro Auto, direkt vor die Tür. Bei uns: <a href="${L.de.kadikoy}">Kadıköy €${E.kadikoy}</a>, <a href="${L.de.uskudar}">Üsküdar €${E.uskudar}</a>, <a href="${L.de.sawTaksim}">Taksim €${E.sawTaksim}</a>.</li>
<li><strong>Metro:</strong> die Linie M4 fährt vom Flughafen nach Kadıköy, von dort fahren Fähren auf die europäische Seite.</li>
<li><strong>Havabus:</strong> Busse nach Taksim und Kadıköy.</li>
<li><strong>Taxistand:</strong> mit Taxameter, und zur Stoßzeit fahren Fahrer ungern über den Bosporus.</li>
</ul>
<p>Abends ist der Verkehr zu den Brücken dicht; deshalb kosten Abholungen zwischen 14:45 und 21:00 etwas mehr. Alle Preise auf unserer Seite <a href="${L.de.saw}">Taxi Sabiha Gökçen</a>.</p>
{widget}`
    },
    fr: {
      slug: "arrivee-aeroport-sabiha-gokcen",
      title: "Arrivée à l'aéroport Sabiha Gökçen (SAW) : le guide",
      desc: `Arriver à Sabiha Gökçen : où vous attend le chauffeur, métro et bus, et quels hôtels sont plus proches côté asiatique. Transferts dès €${E.saw} par voiture.`,
      lead: "Sabiha Gökçen (SAW) est le deuxième aéroport d'Istanbul, sur la rive asiatique. C'est la base des compagnies low cost, et il est plus proche de Kadıköy et Üsküdar que de la vieille ville. Voici ce qui vous attend à l'arrivée.",
      body: `<h2>Où se trouve Sabiha Gökçen ?</h2>
<p>L'aéroport est à Pendik, sur la rive asiatique. Taksim est à environ ${K.sawTaksim[0]} km (${K.sawTaksim[1]} minutes hors heures de pointe) par l'un des ponts du Bosphore, Kadıköy à environ ${K.sawKadikoy[0]} km. Si votre hôtel est côté asiatique, c'est l'aéroport le plus proche.</p>
<h2>Après l'atterrissage</h2>
<p>Après le contrôle des passeports, les bagages et la douane, vous arrivez dans le hall des arrivées, avec des boutiques d'opérateurs mobiles pour une SIM touristique, des distributeurs et des bureaux de change. Changez peu à l'aéroport : les taux sont souvent meilleurs en ville.</p>
{widget}
<h2>Où vous attend votre chauffeur</h2>
<p>${MEET.SAW.fr} Nous suivons votre vol ; les ${E.wait} premières minutes après l'atterrissage sont gratuites.</p>
<h2>Rejoindre la ville</h2>
<ul>
<li><strong>Transfert privé :</strong> prix fixe par voiture, jusqu'à votre porte. Chez nous : <a href="${L.fr.kadikoy}">Kadıköy €${E.kadikoy}</a>, <a href="${L.fr.uskudar}">Üsküdar €${E.uskudar}</a>, <a href="${L.fr.sawTaksim}">Taksim €${E.sawTaksim}</a>.</li>
<li><strong>Métro :</strong> la ligne M4 relie l'aéroport à Kadıköy, d'où les ferries traversent vers la rive européenne.</li>
<li><strong>Havabus :</strong> bus vers Taksim et Kadıköy.</li>
<li><strong>Station de taxis :</strong> au compteur, et aux heures de pointe les chauffeurs rechignent à traverser le Bosphore.</li>
</ul>
<p>Le soir, la circulation vers les ponts est dense : les prises en charge entre 14h45 et 21h coûtent donc un peu plus. Tous les prix sur notre page <a href="${L.fr.saw}">taxi Sabiha Gökçen</a>.</p>
{widget}`
    },
    it: {
      slug: "arrivo-aeroporto-sabiha-gokcen",
      title: "Arrivo all'Aeroporto Sabiha Gökçen (SAW): la guida",
      desc: `Arrivo a Sabiha Gökçen: dove ti aspetta l'autista, metro e bus, e quali hotel sono più vicini dal lato asiatico. Transfer da €${E.saw} per auto.`,
      lead: "Sabiha Gökçen (SAW) è il secondo aeroporto di Istanbul, sulla sponda asiatica. È la base dei voli low cost ed è più vicino a Kadıköy e Üsküdar che alla città vecchia. Ecco cosa aspettarsi all'arrivo.",
      body: `<h2>Dove si trova Sabiha Gökçen?</h2>
<p>L'aeroporto è a Pendik, sulla sponda asiatica. Taksim dista circa ${K.sawTaksim[0]} km (${K.sawTaksim[1]} minuti fuori dall'ora di punta) attraverso uno dei ponti sul Bosforo, Kadıköy circa ${K.sawKadikoy[0]} km. Se il tuo hotel è sul lato asiatico, questo è l'aeroporto più vicino.</p>
<h2>Dopo l'atterraggio</h2>
<p>Dopo controllo passaporti, ritiro bagagli e dogana arrivi nella sala arrivi, con i negozi degli operatori mobili per una SIM turistica, bancomat e cambiavalute. In aeroporto cambia poco: in città il cambio di solito è migliore.</p>
{widget}
<h2>Dove ti aspetta l'autista</h2>
<p>${MEET.SAW.it} Seguiamo il tuo volo e i primi ${E.wait} minuti dopo l'atterraggio sono gratuiti.</p>
<h2>Come arrivare in città</h2>
<ul>
<li><strong>Transfer privato:</strong> prezzo fisso per auto, fino alla porta. Con noi: <a href="${L.it.kadikoy}">Kadıköy €${E.kadikoy}</a>, <a href="${L.it.uskudar}">Üsküdar €${E.uskudar}</a>, <a href="${L.it.sawTaksim}">Taksim €${E.sawTaksim}</a>.</li>
<li><strong>Metro:</strong> la linea M4 va dall'aeroporto a Kadıköy, da dove i traghetti attraversano verso la sponda europea.</li>
<li><strong>Havabus:</strong> bus per Taksim e Kadıköy.</li>
<li><strong>Taxi in fila:</strong> a tassametro, e nell'ora di punta gli autisti attraversano malvolentieri il Bosforo.</li>
</ul>
<p>La sera il traffico verso i ponti è intenso: per questo i ritiri tra le 14:45 e le 21:00 costano un po' di più. Tutti i prezzi nella pagina <a href="${L.it.saw}">taxi Sabiha Gökçen</a>.</p>
{widget}`
    },
    nl: {
      slug: "aankomst-luchthaven-sabiha-gokcen",
      title: "Aankomst op Sabiha Gökçen (SAW): tips voor reizigers",
      desc: `Aankomen op Sabiha Gökçen: waar je chauffeur wacht, metro en bussen, en welke hotels vanaf de Aziatische kant dichterbij liggen. Vanaf €${E.saw} per auto.`,
      lead: "Sabiha Gökçen (SAW) is de tweede luchthaven van Istanbul, aan de Aziatische kant van de stad. Het is de thuisbasis van prijsvechters en ligt dichter bij Kadıköy en Üsküdar dan bij de oude stad. Dit kun je verwachten na de landing.",
      body: `<h2>Waar ligt Sabiha Gökçen?</h2>
<p>De luchthaven ligt in Pendik aan de Aziatische kant. Taksim ligt op zo'n ${K.sawTaksim[0]} km (${K.sawTaksim[1]} minuten buiten de spits) via een van de Bosporusbruggen, Kadıköy op zo'n ${K.sawKadikoy[0]} km. Ligt je hotel aan de Aziatische kant, dan is dit de dichtstbijzijnde luchthaven.</p>
<h2>Na de landing</h2>
<p>Na paspoortcontrole, bagageband en douane kom je in de aankomsthal met winkels van mobiele providers voor een toeristensimkaart, geldautomaten en wisselkantoren. Wissel op de luchthaven maar weinig; in de stad is de koers meestal beter.</p>
{widget}
<h2>Waar je chauffeur wacht</h2>
<p>${MEET.SAW.nl} We volgen je vlucht en de eerste ${E.wait} minuten na de landing zijn gratis.</p>
<h2>Naar de stad</h2>
<ul>
<li><strong>Privétransfer:</strong> vaste prijs per auto, tot aan de deur. Bij ons: <a href="${L.nl.kadikoy}">Kadıköy €${E.kadikoy}</a>, <a href="${L.nl.uskudar}">Üsküdar €${E.uskudar}</a>, <a href="${L.nl.sawTaksim}">Taksim €${E.sawTaksim}</a>.</li>
<li><strong>Metro:</strong> lijn M4 rijdt van de luchthaven naar Kadıköy, vanwaar veerboten naar de Europese kant varen.</li>
<li><strong>Havabus:</strong> bussen naar Taksim en Kadıköy.</li>
<li><strong>Taxistandplaats:</strong> met meter, en in de spits steken chauffeurs de Bosporus niet graag over.</li>
</ul>
<p>'s Avonds is het verkeer naar de bruggen druk; daarom kosten ophaaltijden tussen 14:45 en 21:00 iets meer. Alle prijzen op onze pagina <a href="${L.nl.saw}">taxi Sabiha Gökçen</a>.</p>
{widget}`
    }
  },
  {
    id: "taxi-scams",
    date: "2026-10-28",
    en: {
      slug: "istanbul-taxi-scams-how-to-avoid-them",
      title: "Istanbul Taxi Scams and How to Avoid Them",
      desc: "The most common Istanbul taxi scams: no meter, long routes, the banknote switch and fake fixed prices. How to spot them and ride without stress.",
      lead: "Most Istanbul taxi drivers are honest, but a few tricks come up again and again in travellers' stories and in complaints to the municipality. Knowing them takes the stress out of your first ride.",
      body: `<h2>1. \"The meter is broken\"</h2>
<p>The driver does not switch on the meter and names a price at the end, usually far above the meter fare. In an official yellow, turquoise or black taxi the meter must run. If it is off, ask the driver to switch it on before you leave, or take another taxi.</p>
<h2>2. The long way round</h2>
<p>A detour through traffic or across a bridge you did not need adds kilometres to the meter. Follow the route on a map app on your phone, and say where you want to go as an address or a well-known landmark.</p>
<h2>3. The banknote switch</h2>
<p>You hand over a large note, and the driver quickly swaps it for a smaller one and says you underpaid. Lira notes look similar in a dark car. Count your notes out loud as you pay, and use small notes when you can.</p>
{widget}
<h2>4. Fake fixed prices at the airport</h2>
<p>Someone in the arrivals hall offers a \"fixed price taxi\" that turns out to cost more, or leads you to an unlicensed car. Book only with a company you checked in advance, and look for a name sign with your own name.</p>
<h2>5. Refusing short trips</h2>
<p>Some drivers turn down short rides, or trips into traffic and across the Bosphorus. It is not a scam, but it is the most common complaint about Istanbul taxis.</p>
<h2>How to ride without the stress</h2>
<ul>
<li>Use a taxi app (BiTaksi or Uber) so the trip and the driver are recorded.</li>
<li>Note the taxi's plate number; complaints go to the municipality's 153 line.</li>
<li>For the airport, book a private transfer: the price is fixed before you fly, there is no meter, and your driver waits with your name. With {brand} it starts at €${E.ist} per car from <a href="${L.en.ist}">Istanbul Airport</a> and €${E.saw} from <a href="${L.en.saw}">Sabiha Gökçen</a>.</li>
</ul>
{widget}`
    },
    ru: {
      slug: "obman-v-taksi-stambula",
      title: "Обман в такси Стамбула и как его избежать",
      desc: "Самые частые уловки таксистов в Стамбуле: без счётчика, длинный маршрут, подмена купюры и фальшивые фиксированные цены. Как их распознать.",
      lead: "Большинство таксистов в Стамбуле честные, но несколько уловок снова и снова встречаются в рассказах туристов и в жалобах в мэрию. Если знать их заранее, первая поездка пройдёт спокойно.",
      body: `<h2>1. «Счётчик сломан»</h2>
<p>Водитель не включает счётчик и в конце называет цену, обычно намного выше. В официальном жёлтом, бирюзовом или чёрном такси счётчик должен работать. Если он выключен, попросите включить его до начала поездки или возьмите другое такси.</p>
<h2>2. Длинный маршрут</h2>
<p>Объезд через пробки или лишний мост добавляет километры на счётчике. Следите за маршрутом по карте в телефоне и называйте адрес или известную достопримечательность.</p>
<h2>3. Подмена купюры</h2>
<p>Вы даёте крупную купюру, водитель быстро меняет её на мелкую и говорит, что вы недоплатили. В тёмной машине купюры лир похожи. Отсчитывайте деньги вслух и по возможности платите мелкими купюрами.</p>
{widget}
<h2>4. Фальшивые «фиксированные цены» в аэропорту</h2>
<p>В зале прилёта вам предлагают «такси по фиксированной цене», которое оказывается дороже или ведёт к нелицензированной машине. Бронируйте только у проверенной заранее компании и ищите табличку со своим именем.</p>
<h2>5. Отказ от коротких поездок</h2>
<p>Некоторые водители отказываются от коротких поездок, от поездок в пробки и через Босфор. Это не обман, но самая частая жалоба на такси в Стамбуле.</p>
<h2>Как ездить без стресса</h2>
<ul>
<li>Пользуйтесь приложением такси (BiTaksi или Uber), чтобы поездка и водитель были записаны.</li>
<li>Запомните номер машины; жалобы принимает линия мэрии 153.</li>
<li>Из аэропорта закажите индивидуальный трансфер: цена известна до вылета, счётчика нет, водитель ждёт с табличкой. С {brand} — от €${E.ist} за машину из <a href="${L.ru.ist}">аэропорта Стамбула</a> и от €${E.saw} из <a href="${L.ru.saw}">Сабихи Гёкчен</a>.</li>
</ul>
{widget}`
    },
    de: {
      slug: "taxi-abzocke-istanbul-vermeiden",
      title: "Taxi-Abzocke in Istanbul und wie Sie sie vermeiden",
      desc: "Die häufigsten Taxi-Maschen in Istanbul: kein Taxameter, Umwege, der Geldschein-Trick und falsche Festpreise. So erkennen Sie sie und fahren entspannt.",
      lead: "Die meisten Taxifahrer in Istanbul sind ehrlich, aber einige Maschen tauchen in Reiseberichten und Beschwerden bei der Stadt immer wieder auf. Wer sie kennt, fährt entspannter.",
      body: `<h2>1. „Das Taxameter ist kaputt“</h2>
<p>Der Fahrer schaltet das Taxameter nicht ein und nennt am Ende einen Preis, meist weit über dem Tarif. In einem offiziellen gelben, türkisen oder schwarzen Taxi muss das Taxameter laufen. Ist es aus, bitten Sie vor der Abfahrt darum oder nehmen Sie ein anderes Taxi.</p>
<h2>2. Der Umweg</h2>
<p>Ein Umweg durch den Stau oder über eine unnötige Brücke treibt den Preis hoch. Verfolgen Sie die Route mit einer Karten-App und nennen Sie eine Adresse oder eine bekannte Sehenswürdigkeit.</p>
<h2>3. Der Geldschein-Trick</h2>
<p>Sie geben einen großen Schein, der Fahrer tauscht ihn blitzschnell gegen einen kleinen und behauptet, Sie hätten zu wenig gezahlt. Im dunklen Auto sehen Lira-Scheine ähnlich aus. Zählen Sie laut mit und zahlen Sie möglichst mit kleinen Scheinen.</p>
{widget}
<h2>4. Falsche Festpreise am Flughafen</h2>
<p>In der Ankunftshalle bietet jemand ein „Taxi zum Festpreis“ an, das am Ende teurer ist oder ein Auto ohne Lizenz. Buchen Sie nur bei einer vorher geprüften Firma und achten Sie auf ein Schild mit Ihrem Namen.</p>
<h2>5. Kurze Fahrten werden abgelehnt</h2>
<p>Manche Fahrer lehnen kurze Fahrten, Fahrten in den Stau oder über den Bosporus ab. Keine Abzocke, aber die häufigste Beschwerde über Istanbuls Taxis.</p>
<h2>So fahren Sie entspannt</h2>
<ul>
<li>Nutzen Sie eine Taxi-App (BiTaksi oder Uber), damit Fahrt und Fahrer erfasst sind.</li>
<li>Merken Sie sich das Kennzeichen; Beschwerden nimmt die städtische Hotline 153 an.</li>
<li>Buchen Sie für den Flughafen einen privaten Transfer: Festpreis vor dem Abflug, kein Taxameter, Fahrer mit Namensschild. Mit {brand} ab €${E.ist} pro Auto ab <a href="${L.de.ist}">Flughafen Istanbul</a> und ab €${E.saw} ab <a href="${L.de.saw}">Sabiha Gökçen</a>.</li>
</ul>
{widget}`
    },
    fr: {
      slug: "arnaques-taxi-istanbul",
      title: "Arnaques au taxi à Istanbul et comment les éviter",
      desc: "Les arnaques au taxi les plus courantes à Istanbul : pas de compteur, détours, échange de billet et faux prix fixes. Comment les repérer et rouler sereinement.",
      lead: "La plupart des chauffeurs de taxi d'Istanbul sont honnêtes, mais quelques ruses reviennent sans cesse dans les récits de voyageurs et les plaintes à la mairie. Les connaître rend la première course bien plus sereine.",
      body: `<h2>1. « Le compteur est en panne »</h2>
<p>Le chauffeur n'allume pas le compteur et annonce un prix à l'arrivée, souvent bien au-dessus du tarif. Dans un taxi officiel jaune, turquoise ou noir, le compteur doit tourner. S'il est éteint, demandez de l'allumer avant de partir ou prenez un autre taxi.</p>
<h2>2. Le détour</h2>
<p>Un détour dans les bouchons ou par un pont inutile fait grimper le compteur. Suivez le trajet sur une appli de cartes et donnez une adresse ou un monument connu.</p>
<h2>3. L'échange de billet</h2>
<p>Vous tendez un gros billet, le chauffeur l'échange en un clin d'œil contre un petit et affirme que vous n'avez pas assez payé. Dans une voiture sombre, les billets de livre se ressemblent. Comptez à voix haute et payez si possible en petites coupures.</p>
{widget}
<h2>4. Faux prix fixes à l'aéroport</h2>
<p>Dans le hall des arrivées, quelqu'un propose un « taxi à prix fixe » qui coûte finalement plus cher ou mène à une voiture sans licence. Réservez uniquement auprès d'une société vérifiée et cherchez une pancarte à votre nom.</p>
<h2>5. Refus des courses courtes</h2>
<p>Certains chauffeurs refusent les courses courtes, ou celles dans les bouchons et à travers le Bosphore. Ce n'est pas une arnaque, mais c'est la plainte la plus fréquente sur les taxis d'Istanbul.</p>
<h2>Rouler sans stress</h2>
<ul>
<li>Utilisez une appli de taxi (BiTaksi ou Uber) pour que la course et le chauffeur soient enregistrés.</li>
<li>Notez la plaque ; les plaintes se font au numéro 153 de la mairie.</li>
<li>Pour l'aéroport, réservez un transfert privé : prix fixe avant le départ, pas de compteur, chauffeur avec pancarte. Avec {brand}, dès €${E.ist} par voiture depuis <a href="${L.fr.ist}">l'aéroport d'Istanbul</a> et €${E.saw} depuis <a href="${L.fr.saw}">Sabiha Gökçen</a>.</li>
</ul>
{widget}`
    },
    it: {
      slug: "truffe-taxi-istanbul",
      title: "Truffe dei taxi a Istanbul e come evitarle",
      desc: "Le truffe più comuni dei taxi di Istanbul: niente tassametro, giri lunghi, scambio di banconote e falsi prezzi fissi. Come riconoscerle e viaggiare tranquilli.",
      lead: "La maggior parte dei tassisti di Istanbul è onesta, ma alcuni trucchi tornano spesso nei racconti dei viaggiatori e nei reclami al Comune. Conoscerli rende la prima corsa molto più serena.",
      body: `<h2>1. «Il tassametro è rotto»</h2>
<p>L'autista non accende il tassametro e alla fine dice un prezzo, di solito molto più alto. In un taxi ufficiale giallo, turchese o nero il tassametro deve essere acceso. Se è spento, chiedi di accenderlo prima di partire o prendi un altro taxi.</p>
<h2>2. Il giro lungo</h2>
<p>Una deviazione nel traffico o su un ponte inutile fa salire il tassametro. Segui il percorso su un'app di mappe e indica un indirizzo o un monumento noto.</p>
<h2>3. Lo scambio di banconote</h2>
<p>Dai una banconota grande, l'autista la scambia rapidamente con una piccola e dice che hai pagato poco. In un'auto buia le banconote in lire si somigliano. Conta ad alta voce e paga con tagli piccoli quando puoi.</p>
{widget}
<h2>4. Falsi prezzi fissi in aeroporto</h2>
<p>Nella sala arrivi qualcuno offre un «taxi a prezzo fisso» che poi costa di più o porta a un'auto senza licenza. Prenota solo con un'azienda verificata prima e cerca un cartello con il tuo nome.</p>
<h2>5. Corse brevi rifiutate</h2>
<p>Alcuni autisti rifiutano le corse brevi, nel traffico o attraverso il Bosforo. Non è una truffa, ma è il reclamo più frequente sui taxi di Istanbul.</p>
<h2>Come viaggiare senza stress</h2>
<ul>
<li>Usa un'app per taxi (BiTaksi o Uber), così corsa e autista sono registrati.</li>
<li>Annota la targa; i reclami si fanno al numero 153 del Comune.</li>
<li>Per l'aeroporto prenota un transfer privato: prezzo fisso prima di partire, niente tassametro, autista con cartello. Con {brand} da €${E.ist} per auto dall'<a href="${L.it.ist}">Aeroporto di Istanbul</a> e da €${E.saw} da <a href="${L.it.saw}">Sabiha Gökçen</a>.</li>
</ul>
{widget}`
    },
    nl: {
      slug: "taxi-oplichting-istanbul",
      title: "Taxi-oplichting in Istanbul en hoe je die voorkomt",
      desc: "De bekendste taxitrucs in Istanbul: geen meter, omrijden, de biljettentruc en nep-vaste prijzen. Zo herken je ze en rijd je zonder stress.",
      lead: "De meeste taxichauffeurs in Istanbul zijn eerlijk, maar een paar trucs komen steeds terug in reisverhalen en klachten bij de gemeente. Als je ze kent, verloopt je eerste rit een stuk rustiger.",
      body: `<h2>1. \"De meter is kapot\"</h2>
<p>De chauffeur zet de meter niet aan en noemt aan het eind een prijs, meestal ver boven het tarief. In een officiële gele, turquoise of zwarte taxi moet de meter lopen. Staat hij uit, vraag dan voor vertrek om hem aan te zetten of neem een andere taxi.</p>
<h2>2. Omrijden</h2>
<p>Een omweg door de file of over een onnodige brug jaagt de meter op. Volg de route in een kaartenapp en geef een adres of een bekende bezienswaardigheid op.</p>
<h2>3. De biljettentruc</h2>
<p>Je geeft een groot biljet, de chauffeur wisselt het razendsnel om voor een klein en zegt dat je te weinig betaalde. In een donkere auto lijken lirabiljetten op elkaar. Tel hardop en betaal waar mogelijk met kleine biljetten.</p>
{widget}
<h2>4. Nep-vaste prijzen op de luchthaven</h2>
<p>In de aankomsthal biedt iemand een \"taxi voor een vaste prijs\" aan die duurder uitvalt of naar een auto zonder vergunning leidt. Boek alleen bij een bedrijf dat je vooraf hebt gecontroleerd en let op een bordje met je eigen naam.</p>
<h2>5. Korte ritten geweigerd</h2>
<p>Sommige chauffeurs weigeren korte ritten, of ritten de file in en over de Bosporus. Geen oplichting, maar wel de meest gehoorde klacht over taxi's in Istanbul.</p>
<h2>Zo rijd je zonder stress</h2>
<ul>
<li>Gebruik een taxi-app (BiTaksi of Uber), zodat de rit en de chauffeur worden vastgelegd.</li>
<li>Noteer het kenteken; klachten gaan naar het gemeentelijke nummer 153.</li>
<li>Boek voor de luchthaven een privétransfer: vaste prijs voor vertrek, geen meter en een chauffeur met naambord. Met {brand} vanaf €${E.ist} per auto vanaf <a href="${L.nl.ist}">Istanbul Airport</a> en €${E.saw} vanaf <a href="${L.nl.saw}">Sabiha Gökçen</a>.</li>
</ul>
{widget}`
    }
  },
  {
    id: "where-to-stay",
    date: "2026-10-28",
    en: {
      slug: "where-to-stay-in-istanbul",
      title: "Where to Stay in Istanbul: Best Areas and Airport Transfers",
      desc: "Where to stay in Istanbul: Sultanahmet, Taksim, Karaköy, Beşiktaş, Nişantaşı or Kadıköy. Who each area suits and the airport transfer price to each.",
      lead: "Istanbul is huge, and where you stay shapes your trip. Here are the six areas most visitors choose, who each one suits, and what the airport transfer costs.",
      body: `<h2>Sultanahmet: for first-time visitors</h2>
<p>The Old City puts Hagia Sophia, the Blue Mosque and Topkapı Palace on your doorstep. Quiet in the evening, with many small boutique hotels. From Istanbul Airport: <a href="${L.en.sult}">€${E.sult} per car</a>.</p>
<h2>Taksim and Beyoğlu: for nightlife and city life</h2>
<p>İstiklal Avenue, restaurants, bars and the best transport links in the city. Busy and lively until late. From Istanbul Airport: <a href="${L.en.taksim}">€${E.taksim}</a>.</p>
<h2>Karaköy and Galata: for design hotels and cafés</h2>
<p>Between the Old City and Taksim, with Galata Tower, the Istanbul Modern and the Galataport cruise terminal. From Istanbul Airport: <a href="${L.en.karakoy}">€${E.karakoy}</a>.</p>
{widget}
<h2>Beşiktaş and Ortaköy: for the Bosphorus</h2>
<p>Luxury waterfront hotels, Dolmabahçe Palace and seaside cafés. Great views, more traffic on weekday evenings. From Istanbul Airport: <a href="${L.en.besiktas}">€${E.besiktas}</a>.</p>
<h2>Şişli and Nişantaşı: for shopping and business</h2>
<p>Designer streets, malls and business hotels, close to the motorway to the airport. From Istanbul Airport: <a href="${L.en.nisantasi}">€${E.sisli}</a>.</p>
<h2>Kadıköy: for the Asian side and local life</h2>
<p>Markets, cafés and the Moda seafront, with ferries to the European side. Closer to Sabiha Gökçen: <a href="${L.en.kadikoy}">€${E.kadikoy}</a>.</p>
<h2>Which airport is closer?</h2>
<p>For the European side, Istanbul Airport (IST) is usually closer; for the Asian side, Sabiha Gökçen (SAW). Every price is on our <a href="${L.en.prices}">price list</a>.</p>
{widget}`
    },
    ru: {
      slug: "gde-ostanovitsya-v-stambule",
      title: "Где остановиться в Стамбуле: лучшие районы и трансфер",
      desc: "Где жить в Стамбуле: Султанахмет, Таксим, Каракёй, Бешикташ, Нишанташи или Кадыкёй. Кому подходит каждый район и сколько стоит трансфер из аэропорта.",
      lead: "Стамбул огромен, и от района проживания зависит вся поездка. Вот шесть районов, которые выбирает большинство туристов, кому подходит каждый и сколько стоит трансфер из аэропорта.",
      body: `<h2>Султанахмет: для первого визита</h2>
<p>Старый город: Айя-София, Голубая мечеть и дворец Топкапы рядом с отелем. Вечером тихо, много небольших бутик-отелей. Из аэропорта Стамбула: <a href="${L.ru.sult}">€${E.sult} за машину</a>.</p>
<h2>Таксим и Бейоглу: для ночной и городской жизни</h2>
<p>Проспект Истикляль, рестораны, бары и лучший транспорт в городе. Шумно и оживлённо до поздней ночи. Из аэропорта Стамбула: <a href="${L.ru.taksim}">€${E.taksim}</a>.</p>
<h2>Каракёй и Галата: для дизайнерских отелей и кафе</h2>
<p>Между Старым городом и Таксимом: Галатская башня, Istanbul Modern и круизный терминал Галатапорт. Из аэропорта Стамбула: <a href="${L.ru.karakoy}">€${E.karakoy}</a>.</p>
{widget}
<h2>Бешикташ и Ортакёй: для Босфора</h2>
<p>Роскошные отели на набережной, дворец Долмабахче и кафе у воды. Прекрасные виды, но больше пробок по вечерам в будни. Из аэропорта Стамбула: <a href="${L.ru.besiktas}">€${E.besiktas}</a>.</p>
<h2>Шишли и Нишанташи: для шопинга и бизнеса</h2>
<p>Дизайнерские улицы, торговые центры и бизнес-отели рядом с трассой в аэропорт. Из аэропорта Стамбула: <a href="${L.ru.nisantasi}">€${E.sisli}</a>.</p>
<h2>Кадыкёй: азиатская сторона и местная жизнь</h2>
<p>Рынки, кафе и набережная Мода, паромы на европейскую сторону. Ближе к Сабихе Гёкчен: <a href="${L.ru.kadikoy}">€${E.kadikoy}</a>.</p>
<h2>Какой аэропорт ближе?</h2>
<p>Для европейской стороны обычно ближе аэропорт Стамбула (IST), для азиатской — Сабиха Гёкчен (SAW). Все цены — в нашем <a href="${L.ru.prices}">прайс-листе</a>.</p>
{widget}`
    },
    de: {
      slug: "wo-in-istanbul-uebernachten",
      title: "Wo in Istanbul übernachten: die besten Viertel",
      desc: "Wo übernachten in Istanbul: Sultanahmet, Taksim, Karaköy, Beşiktaş, Nişantaşı oder Kadıköy. Für wen sich welches Viertel eignet und was der Transfer kostet.",
      lead: "Istanbul ist riesig, und die Wahl des Viertels prägt Ihre Reise. Hier sind die sechs Gegenden, die die meisten Besucher wählen, für wen sie sich eignen und was der Flughafentransfer kostet.",
      body: `<h2>Sultanahmet: für den ersten Besuch</h2>
<p>Die Altstadt mit Hagia Sophia, Blauer Moschee und Topkapı-Palast vor der Tür. Abends ruhig, viele kleine Boutiquehotels. Ab Flughafen Istanbul: <a href="${L.de.sult}">€${E.sult} pro Auto</a>.</p>
<h2>Taksim und Beyoğlu: für Nachtleben und Großstadt</h2>
<p>İstiklal-Straße, Restaurants, Bars und die beste Verkehrsanbindung der Stadt. Laut und lebendig bis spät. Ab Flughafen Istanbul: <a href="${L.de.taksim}">€${E.taksim}</a>.</p>
<h2>Karaköy und Galata: für Designhotels und Cafés</h2>
<p>Zwischen Altstadt und Taksim, mit Galataturm, Istanbul Modern und dem Kreuzfahrtterminal Galataport. Ab Flughafen Istanbul: <a href="${L.de.karakoy}">€${E.karakoy}</a>.</p>
{widget}
<h2>Beşiktaş und Ortaköy: für den Bosporus</h2>
<p>Luxushotels am Wasser, Dolmabahçe-Palast und Cafés am Ufer. Tolle Aussicht, aber mehr Verkehr an Werktagabenden. Ab Flughafen Istanbul: <a href="${L.de.besiktas}">€${E.besiktas}</a>.</p>
<h2>Şişli und Nişantaşı: für Shopping und Business</h2>
<p>Designerstraßen, Einkaufszentren und Businesshotels nahe der Autobahn zum Flughafen. Ab Flughafen Istanbul: <a href="${L.de.nisantasi}">€${E.sisli}</a>.</p>
<h2>Kadıköy: asiatische Seite und Alltagsleben</h2>
<p>Märkte, Cafés und die Uferpromenade von Moda, mit Fähren auf die europäische Seite. Näher an Sabiha Gökçen: <a href="${L.de.kadikoy}">€${E.kadikoy}</a>.</p>
<h2>Welcher Flughafen ist näher?</h2>
<p>Für die europäische Seite ist meist der Flughafen Istanbul (IST) näher, für die asiatische Sabiha Gökçen (SAW). Alle Preise in unserer <a href="${L.de.prices}">Preisliste</a>.</p>
{widget}`
    },
    fr: {
      slug: "ou-loger-a-istanbul",
      title: "Où loger à Istanbul : les meilleurs quartiers",
      desc: "Où loger à Istanbul : Sultanahmet, Taksim, Karaköy, Beşiktaş, Nişantaşı ou Kadıköy. À qui convient chaque quartier et le prix du transfert depuis l'aéroport.",
      lead: "Istanbul est immense, et le quartier où vous logez façonne votre séjour. Voici les six quartiers que choisissent la plupart des visiteurs, à qui ils conviennent et le prix du transfert depuis l'aéroport.",
      body: `<h2>Sultanahmet : pour une première visite</h2>
<p>La vieille ville, avec Sainte-Sophie, la Mosquée bleue et le palais de Topkapı à deux pas. Calme le soir, beaucoup de petits hôtels de charme. Depuis l'aéroport d'Istanbul : <a href="${L.fr.sult}">€${E.sult} par voiture</a>.</p>
<h2>Taksim et Beyoğlu : pour la vie nocturne</h2>
<p>L'avenue İstiklal, restaurants, bars et les meilleures connexions de transport. Animé jusque tard. Depuis l'aéroport d'Istanbul : <a href="${L.fr.taksim}">€${E.taksim}</a>.</p>
<h2>Karaköy et Galata : hôtels design et cafés</h2>
<p>Entre la vieille ville et Taksim, avec la tour de Galata, l'Istanbul Modern et le terminal de croisière Galataport. Depuis l'aéroport d'Istanbul : <a href="${L.fr.karakoy}">€${E.karakoy}</a>.</p>
{widget}
<h2>Beşiktaş et Ortaköy : pour le Bosphore</h2>
<p>Hôtels de luxe au bord de l'eau, palais de Dolmabahçe et cafés en bord de mer. Belles vues, plus de circulation en soirée en semaine. Depuis l'aéroport d'Istanbul : <a href="${L.fr.besiktas}">€${E.besiktas}</a>.</p>
<h2>Şişli et Nişantaşı : shopping et affaires</h2>
<p>Rues de créateurs, centres commerciaux et hôtels d'affaires, près de l'autoroute de l'aéroport. Depuis l'aéroport d'Istanbul : <a href="${L.fr.nisantasi}">€${E.sisli}</a>.</p>
<h2>Kadıköy : la rive asiatique et la vie locale</h2>
<p>Marchés, cafés et front de mer de Moda, avec des ferries vers la rive européenne. Plus proche de Sabiha Gökçen : <a href="${L.fr.kadikoy}">€${E.kadikoy}</a>.</p>
<h2>Quel aéroport est le plus proche ?</h2>
<p>Pour la rive européenne, l'aéroport d'Istanbul (IST) est en général plus proche ; pour la rive asiatique, Sabiha Gökçen (SAW). Tous les prix dans notre <a href="${L.fr.prices}">liste de prix</a>.</p>
{widget}`
    },
    it: {
      slug: "dove-alloggiare-a-istanbul",
      title: "Dove alloggiare a Istanbul: le zone migliori",
      desc: "Dove alloggiare a Istanbul: Sultanahmet, Taksim, Karaköy, Beşiktaş, Nişantaşı o Kadıköy. A chi è adatta ogni zona e quanto costa il transfer dall'aeroporto.",
      lead: "Istanbul è enorme e la zona in cui alloggi cambia il viaggio. Ecco le sei zone scelte dalla maggior parte dei visitatori, a chi sono adatte e quanto costa il transfer dall'aeroporto.",
      body: `<h2>Sultanahmet: per la prima visita</h2>
<p>La città vecchia, con Santa Sofia, la Moschea Blu e il Palazzo Topkapı sotto casa. Tranquilla la sera, con tanti piccoli hotel boutique. Dall'Aeroporto di Istanbul: <a href="${L.it.sult}">€${E.sult} per auto</a>.</p>
<h2>Taksim e Beyoğlu: per la vita notturna</h2>
<p>Viale İstiklal, ristoranti, bar e i migliori collegamenti della città. Vivace fino a tardi. Dall'Aeroporto di Istanbul: <a href="${L.it.taksim}">€${E.taksim}</a>.</p>
<h2>Karaköy e Galata: hotel di design e caffè</h2>
<p>Tra la città vecchia e Taksim, con la Torre di Galata, l'Istanbul Modern e il terminal crociere Galataport. Dall'Aeroporto di Istanbul: <a href="${L.it.karakoy}">€${E.karakoy}</a>.</p>
{widget}
<h2>Beşiktaş e Ortaköy: per il Bosforo</h2>
<p>Hotel di lusso sul mare, Palazzo Dolmabahçe e caffè sull'acqua. Viste splendide, più traffico nelle sere feriali. Dall'Aeroporto di Istanbul: <a href="${L.it.besiktas}">€${E.besiktas}</a>.</p>
<h2>Şişli e Nişantaşı: shopping e affari</h2>
<p>Vie delle griffe, centri commerciali e hotel business vicino all'autostrada per l'aeroporto. Dall'Aeroporto di Istanbul: <a href="${L.it.nisantasi}">€${E.sisli}</a>.</p>
<h2>Kadıköy: la sponda asiatica e la vita locale</h2>
<p>Mercati, caffè e lungomare di Moda, con traghetti per la sponda europea. Più vicina a Sabiha Gökçen: <a href="${L.it.kadikoy}">€${E.kadikoy}</a>.</p>
<h2>Quale aeroporto è più vicino?</h2>
<p>Per la sponda europea di solito è più vicino l'Aeroporto di Istanbul (IST), per quella asiatica Sabiha Gökçen (SAW). Tutti i prezzi nel nostro <a href="${L.it.prices}">listino</a>.</p>
{widget}`
    },
    nl: {
      slug: "waar-overnachten-in-istanbul",
      title: "Waar overnachten in Istanbul: de beste wijken",
      desc: "Waar overnachten in Istanbul: Sultanahmet, Taksim, Karaköy, Beşiktaş, Nişantaşı of Kadıköy. Voor wie elke wijk geschikt is en wat de luchthaventransfer kost.",
      lead: "Istanbul is enorm, en waar je overnacht bepaalt je reis. Dit zijn de zes wijken die de meeste bezoekers kiezen, voor wie ze geschikt zijn en wat de luchthaventransfer kost.",
      body: `<h2>Sultanahmet: voor je eerste bezoek</h2>
<p>De oude stad, met de Hagia Sophia, de Blauwe Moskee en het Topkapı-paleis om de hoek. 's Avonds rustig, veel kleine boetiekhotels. Vanaf Istanbul Airport: <a href="${L.nl.sult}">€${E.sult} per auto</a>.</p>
<h2>Taksim en Beyoğlu: voor nachtleven en stadsleven</h2>
<p>De İstiklal-straat, restaurants, bars en de beste vervoersverbindingen van de stad. Druk en levendig tot laat. Vanaf Istanbul Airport: <a href="${L.nl.taksim}">€${E.taksim}</a>.</p>
<h2>Karaköy en Galata: designhotels en cafés</h2>
<p>Tussen de oude stad en Taksim, met de Galatatoren, Istanbul Modern en de cruiseterminal Galataport. Vanaf Istanbul Airport: <a href="${L.nl.karakoy}">€${E.karakoy}</a>.</p>
{widget}
<h2>Beşiktaş en Ortaköy: voor de Bosporus</h2>
<p>Luxehotels aan het water, het Dolmabahçe-paleis en cafés aan de oever. Prachtig uitzicht, meer verkeer op doordeweekse avonden. Vanaf Istanbul Airport: <a href="${L.nl.besiktas}">€${E.besiktas}</a>.</p>
<h2>Şişli en Nişantaşı: winkelen en zaken</h2>
<p>Designerstraten, winkelcentra en zakenhotels vlak bij de snelweg naar de luchthaven. Vanaf Istanbul Airport: <a href="${L.nl.nisantasi}">€${E.sisli}</a>.</p>
<h2>Kadıköy: de Aziatische kant en het echte leven</h2>
<p>Markten, cafés en de boulevard van Moda, met veerboten naar de Europese kant. Dichter bij Sabiha Gökçen: <a href="${L.nl.kadikoy}">€${E.kadikoy}</a>.</p>
<h2>Welke luchthaven ligt dichterbij?</h2>
<p>Voor de Europese kant ligt Istanbul Airport (IST) meestal dichterbij, voor de Aziatische kant Sabiha Gökçen (SAW). Alle prijzen in onze <a href="${L.nl.prices}">prijslijst</a>.</p>
{widget}`
    }
  }
];
