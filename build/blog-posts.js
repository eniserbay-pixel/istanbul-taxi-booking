// Blog posts from November 2026 on: written in English, German, Russian and Arabic only (the owner's choice).
// A post shows in a language only when it has that language; the language menu sends the other languages to their blog page.
// Prices and distances come from data/pricing.json (one way, per car), links from the same path functions build/build.js uses.
const P = require("../data/pricing.json");
const Q = require("../public/assets/quote.js");
const site = require("../data/site.json");
const I = require("./i18n");
const LANGS = ["en", "de", "ru", "ar"];
const paths = l => I[l] ? I[l].paths : require("./lang/" + l).ui.paths;
const pr = (a, z, c) => Q.base(P, a, z, c || "sedan");
const km = (a, z) => (P.dist[a] && P.dist[a][z]) || (P.dist[z] && P.dist[z][a]);
const slug = z => Q.zone(P, z).slug;
const L = Object.fromEntries(LANGS.map(l => {
  const p = paths(l), r = (a, z) => p.route(a, slug(z));
  return [l, { ist: p.IST, saw: p.SAW, prices: p.prices, book: p.book, sult: r("IST", "sultanahmet"), taksim: r("IST", "taksim"), kadikoy: r("SAW", "kadikoy") }];
}));
const E = {
  sult: pr("IST", "sultanahmet"), taksim: pr("IST", "taksim"), kadikoy: pr("SAW", "kadikoy"),
  sultVan: pr("IST", "sultanahmet", "minivan"), sultVip: pr("IST", "sultanahmet", "vclass"), sultBus: pr("IST", "sultanahmet", "minibus"),
  wait: P.rules.freeWaitMin, seat: P.rules.childSeat
};
const MEET = site.meet.IST;
const K = { sult: km("IST", "sultanahmet"), taksim: km("IST", "taksim") };

module.exports = [
  {
    id: "ist-to-sultanahmet",
    date: "2026-11-17",
    en: {
      slug: "istanbul-airport-to-sultanahmet-every-way-compared",
      title: "Istanbul Airport to Sultanahmet: Every Way Compared",
      desc: `Metro, Havaist bus, taxi or private transfer from Istanbul Airport to Sultanahmet: time, cost, changes and luggage compared. Fixed transfer price €${E.sult} per car.`,
      lead: `Sultanahmet, the old city with the Blue Mosque and Hagia Sophia, is about ${K.sult[0]} km from Istanbul Airport. There are four ways to get there, and the right one depends on your luggage, your arrival time and how many of you are travelling.`,
      body: `<h2>The short answer</h2>
<p>If you travel light and on a budget, the <strong>metro</strong> is the cheapest way, but it takes several changes. The <strong>Havaist bus</strong> is a simple middle option. A <strong>taxi</strong> needs no booking but runs on the meter. A <strong>private transfer</strong> takes you from the arrivals hall to your hotel door for a fixed price: with us €${E.sult} per car in a sedan.</p>
<h2>1. Metro</h2>
<p>The M11 metro starts under the airport terminal. To reach Sultanahmet you change at least twice, for example to the M2 at Gayrettepe and then to the Marmaray or the T1 tram near the old city. You pay with an Istanbulkart, which you can buy and top up at the machines in the airport station.</p>
<ul>
<li><strong>Good:</strong> the cheapest option, and no traffic.</li>
<li><strong>Less good:</strong> changes, stairs and crowded trains with suitcases; the last part to your hotel is on foot over cobblestones.</li>
</ul>
<h2>2. Havaist bus</h2>
<p>Havaist is the official airport bus. It leaves from the bus area below the arrivals hall and has a line towards the old city. It costs more than the metro but far less than a car.</p>
<ul>
<li><strong>Good:</strong> one seat, luggage in the hold, no changes.</li>
<li><strong>Less good:</strong> it is stuck in the same traffic as cars, runs on a timetable, and you still walk from the stop to your hotel.</li>
</ul>
{widget}
<h2>3. Taxi from the rank</h2>
<p>Taxis wait outside arrivals. You need no booking, but the fare runs on the meter, so traffic on the motorway or in the old city adds to the price. After a wave of landings there can be a queue, and a family with several suitcases may not fit in one car. Sultanahmet's narrow streets also mean some drivers stop short of the hotel.</p>
<h2>4. Private transfer</h2>
<p>${MEET.en} Your driver tracks your flight, so a delay changes nothing, and the first ${E.wait} minutes of waiting are free. The price is fixed per car, not per person, and includes traffic, motorway tolls and luggage. The ride takes about ${K.sult[1]} minutes without heavy traffic.</p>
<h2>Side by side</h2>
<table><thead><tr><th></th><th>Metro</th><th>Havaist</th><th>Taxi</th><th>Transfer</th></tr></thead><tbody>
<tr><td>Price</td><td>Lowest</td><td>Low</td><td>Meter</td><td>Fixed, from €${E.sult} per car</td></tr>
<tr><td>Changes</td><td>2 or more</td><td>None</td><td>None</td><td>None</td></tr>
<tr><td>To the hotel door</td><td>No</td><td>No</td><td>Usually</td><td>Yes</td></tr>
<tr><td>Luggage</td><td>Carry it yourself</td><td>In the hold</td><td>Limited space</td><td>Car chosen for your bags</td></tr>
<tr><td>Late at night</td><td>Limited</td><td>Limited</td><td>Yes</td><td>Yes, 24/7</td></tr>
</tbody></table>
<h2>What does a transfer cost?</h2>
<p>From Istanbul Airport to <a href="${L.en.sult}">Sultanahmet</a>: €${E.sult} in a sedan (up to 3 people), €${E.sultVan} in a minivan (up to 6), €${E.sultVip} in a Mercedes V-Class and €${E.sultBus} in a minibus for up to 13. A child seat is €${E.seat}. All routes are on our <a href="${L.en.prices}">prices page</a>.</p>
<h2>Which one should you choose?</h2>
<ul>
<li><strong>Metro or Havaist</strong> if you travel alone or as a couple with small bags, during the day.</li>
<li><strong>A private transfer</strong> after a long flight, at night, with children, with a group or with a lot of luggage.</li>
</ul>
<p>Booking with {brand} takes about a minute: no account and no payment up front. You pay the driver in cash at the end of the ride.</p>
{widget}`
    },
    de: {
      slug: "flughafen-istanbul-nach-sultanahmet-alle-wege",
      title: "Vom Flughafen Istanbul nach Sultanahmet: alle Wege im Vergleich",
      desc: `Metro, Havaist, Taxi oder Privattransfer vom Flughafen Istanbul nach Sultanahmet: Zeit, Kosten und Gepäck im Vergleich. Festpreis €${E.sult} pro Fahrzeug.`,
      lead: `Sultanahmet, die Altstadt mit Blauer Moschee und Hagia Sophia, liegt etwa ${K.sult[0]} km vom Flughafen Istanbul entfernt. Es gibt vier Wege dorthin, und welcher passt, hängt von Gepäck, Ankunftszeit und Gruppengröße ab.`,
      body: `<h2>Kurz gesagt</h2>
<p>Mit wenig Gepäck und kleinem Budget ist die <strong>Metro</strong> am günstigsten, aber mit mehrmaligem Umsteigen. Der <strong>Havaist-Bus</strong> ist ein einfacher Mittelweg. Ein <strong>Taxi</strong> braucht keine Buchung, fährt aber nach Taxameter. Ein <strong>Privattransfer</strong> bringt Sie zum Festpreis von der Ankunftshalle bis vor die Hoteltür: bei uns €${E.sult} pro Fahrzeug in der Limousine.</p>
<h2>1. Metro</h2>
<p>Die Metro M11 fährt direkt unter dem Terminal ab. Nach Sultanahmet steigen Sie mindestens zweimal um, zum Beispiel in Gayrettepe in die M2 und dann in den Marmaray oder die Straßenbahn T1 nahe der Altstadt. Bezahlt wird mit der Istanbulkart, die Sie an den Automaten im Flughafenbahnhof kaufen und aufladen.</p>
<ul>
<li><strong>Vorteil:</strong> am günstigsten und kein Stau.</li>
<li><strong>Nachteil:</strong> Umsteigen, Treppen und volle Züge mit Koffern; das letzte Stück zum Hotel geht zu Fuß über Kopfsteinpflaster.</li>
</ul>
<h2>2. Havaist-Bus</h2>
<p>Havaist ist der offizielle Flughafenbus. Er fährt im Busbereich unter der Ankunftshalle ab und hat eine Linie Richtung Altstadt. Er kostet mehr als die Metro, aber viel weniger als ein Auto.</p>
<ul>
<li><strong>Vorteil:</strong> ein Sitzplatz, Gepäck im Laderaum, kein Umsteigen.</li>
<li><strong>Nachteil:</strong> steht im selben Stau wie Autos, fährt nach Fahrplan, und von der Haltestelle zum Hotel gehen Sie zu Fuß.</li>
</ul>
{widget}
<h2>3. Taxi vom Taxistand</h2>
<p>Taxis warten vor der Ankunftshalle. Sie brauchen keine Buchung, aber es wird nach Taxameter abgerechnet, Stau auf der Autobahn oder in der Altstadt erhöht also den Preis. Nach einer Welle von Landungen gibt es oft eine Schlange, und eine Familie mit mehreren Koffern passt nicht immer in ein Auto. In den engen Gassen von Sultanahmet halten manche Fahrer auch vor dem Hotel an.</p>
<h2>4. Privattransfer</h2>
<p>${MEET.de} Ihr Fahrer verfolgt Ihren Flug, eine Verspätung ändert also nichts, und die ersten ${E.wait} Minuten Wartezeit sind kostenlos. Der Preis gilt pro Fahrzeug, nicht pro Person, und schließt Stau, Autobahngebühren und Gepäck ein. Die Fahrt dauert ohne starken Verkehr etwa ${K.sult[1]} Minuten.</p>
<h2>Im Vergleich</h2>
<table><thead><tr><th></th><th>Metro</th><th>Havaist</th><th>Taxi</th><th>Transfer</th></tr></thead><tbody>
<tr><td>Preis</td><td>Am niedrigsten</td><td>Niedrig</td><td>Taxameter</td><td>Festpreis, ab €${E.sult} pro Fahrzeug</td></tr>
<tr><td>Umsteigen</td><td>2 oder mehr</td><td>Keins</td><td>Keins</td><td>Keins</td></tr>
<tr><td>Bis zur Hoteltür</td><td>Nein</td><td>Nein</td><td>Meist</td><td>Ja</td></tr>
<tr><td>Gepäck</td><td>Selbst tragen</td><td>Im Laderaum</td><td>Wenig Platz</td><td>Fahrzeug passend zum Gepäck</td></tr>
<tr><td>Spät nachts</td><td>Eingeschränkt</td><td>Eingeschränkt</td><td>Ja</td><td>Ja, rund um die Uhr</td></tr>
</tbody></table>
<h2>Was kostet ein Transfer?</h2>
<p>Vom Flughafen Istanbul nach <a href="${L.de.sult}">Sultanahmet</a>: €${E.sult} in der Limousine (bis 3 Personen), €${E.sultVan} im Minivan (bis 6), €${E.sultVip} in der Mercedes V-Klasse und €${E.sultBus} im Kleinbus für bis zu 13. Ein Kindersitz kostet €${E.seat}. Alle Strecken finden Sie auf unserer <a href="${L.de.prices}">Preisseite</a>.</p>
<h2>Was sollten Sie wählen?</h2>
<ul>
<li><strong>Metro oder Havaist</strong>, wenn Sie allein oder zu zweit mit kleinem Gepäck tagsüber reisen.</li>
<li><strong>Einen Privattransfer</strong> nach einem langen Flug, nachts, mit Kindern, als Gruppe oder mit viel Gepäck.</li>
</ul>
<p>Die Buchung bei {brand} dauert etwa eine Minute: ohne Konto und ohne Vorauszahlung. Sie bezahlen den Fahrer am Ende der Fahrt in bar.</p>
{widget}`
    },
    ru: {
      slug: "iz-aeroporta-stambula-v-sultanahmet-vse-sposoby",
      title: "Из аэропорта Стамбула в Султанахмет: все способы",
      desc: `Метро, автобус Havaist, такси или трансфер из аэропорта Стамбула в Султанахмет: время, цена, пересадки и багаж. Трансфер по фиксированной цене €${E.sult} за машину.`,
      lead: `Султанахмет, старый город с Голубой мечетью и Святой Софией, находится примерно в ${K.sult[0]} км от аэропорта Стамбула. Добраться туда можно четырьмя способами, и выбор зависит от багажа, времени прилёта и количества человек.`,
      body: `<h2>Коротко</h2>
<p>Если у вас мало вещей и небольшой бюджет, дешевле всего <strong>метро</strong>, но с несколькими пересадками. <strong>Автобус Havaist</strong> — простой средний вариант. <strong>Такси</strong> не нужно бронировать, но оплата по счётчику. <strong>Индивидуальный трансфер</strong> довезёт вас из зала прилёта до дверей отеля по фиксированной цене: у нас €${E.sult} за машину на седане.</p>
<h2>1. Метро</h2>
<p>Линия метро M11 начинается прямо под терминалом. До Султанахмета нужно минимум две пересадки, например на M2 в Гайреттепе, а затем на Мармарай или трамвай T1 рядом со старым городом. Оплата картой Istanbulkart, её можно купить и пополнить в автоматах на станции аэропорта.</p>
<ul>
<li><strong>Плюсы:</strong> самый дешёвый вариант, без пробок.</li>
<li><strong>Минусы:</strong> пересадки, лестницы и переполненные вагоны с чемоданами; последний отрезок до отеля пешком по брусчатке.</li>
</ul>
<h2>2. Автобус Havaist</h2>
<p>Havaist — официальный автобус аэропорта. Он отправляется из автобусной зоны под залом прилёта, есть линия в сторону старого города. Дороже метро, но намного дешевле машины.</p>
<ul>
<li><strong>Плюсы:</strong> одно место, багаж в багажном отделении, без пересадок.</li>
<li><strong>Минусы:</strong> стоит в тех же пробках, что и машины, ходит по расписанию, а от остановки до отеля всё равно идти пешком.</li>
</ul>
{widget}
<h2>3. Такси со стоянки</h2>
<p>Такси ждут у выхода из зала прилёта. Бронировать не нужно, но оплата по счётчику, поэтому пробки на трассе или в старом городе увеличивают цену. После волны прилётов бывает очередь, а семья с несколькими чемоданами может не поместиться в одну машину. На узких улицах Султанахмета некоторые водители высаживают, не доезжая до отеля.</p>
<h2>4. Индивидуальный трансфер</h2>
<p>${MEET.ru} Водитель следит за рейсом, поэтому задержка ничего не меняет, а первые ${E.wait} минут ожидания бесплатны. Цена указана за машину, а не за человека, и включает пробки, платные дороги и багаж. Дорога занимает около ${K.sult[1]} минут без сильных пробок.</p>
<h2>Сравнение</h2>
<table><thead><tr><th></th><th>Метро</th><th>Havaist</th><th>Такси</th><th>Трансфер</th></tr></thead><tbody>
<tr><td>Цена</td><td>Самая низкая</td><td>Низкая</td><td>Счётчик</td><td>Фиксированная, от €${E.sult} за машину</td></tr>
<tr><td>Пересадки</td><td>2 и больше</td><td>Нет</td><td>Нет</td><td>Нет</td></tr>
<tr><td>До дверей отеля</td><td>Нет</td><td>Нет</td><td>Обычно</td><td>Да</td></tr>
<tr><td>Багаж</td><td>Несёте сами</td><td>В багажном отделении</td><td>Мало места</td><td>Машина под ваш багаж</td></tr>
<tr><td>Поздно ночью</td><td>Ограниченно</td><td>Ограниченно</td><td>Да</td><td>Да, круглосуточно</td></tr>
</tbody></table>
<h2>Сколько стоит трансфер?</h2>
<p>Из аэропорта Стамбула в <a href="${L.ru.sult}">Султанахмет</a>: €${E.sult} на седане (до 3 человек), €${E.sultVan} на минивэне (до 6), €${E.sultVip} на Mercedes V-Class и €${E.sultBus} на микроавтобусе до 13 человек. Детское кресло — €${E.seat}. Все маршруты — на <a href="${L.ru.prices}">странице цен</a>.</p>
<h2>Что выбрать?</h2>
<ul>
<li><strong>Метро или Havaist</strong>, если вы едете один или вдвоём с небольшим багажом днём.</li>
<li><strong>Индивидуальный трансфер</strong> после долгого перелёта, ночью, с детьми, компанией или с большим багажом.</li>
</ul>
<p>Заказ в {brand} занимает около минуты: без регистрации и предоплаты. Вы платите водителю наличными в конце поездки.</p>
{widget}`
    },
    ar: {
      slug: "min-matar-istanbul-ila-alsultan-ahmad-kull-alturuq",
      title: "من مطار إسطنبول إلى السلطان أحمد: مقارنة بين كل الطرق",
      desc: `المترو أو حافلة هافايست أو التاكسي أو التوصيل الخاص من مطار إسطنبول إلى السلطان أحمد: الوقت والتكلفة والتبديل والأمتعة. توصيل بسعر ثابت €${E.sult} للسيارة.`,
      lead: `تقع منطقة السلطان أحمد، المدينة القديمة التي تضم المسجد الأزرق وآيا صوفيا، على بعد حوالي ${K.sult[0]} كم من مطار إسطنبول. هناك أربع طرق للوصول إليها، والخيار المناسب يعتمد على أمتعتك ووقت وصولك وعدد المسافرين.`,
      body: `<h2>باختصار</h2>
<p>إذا كانت أمتعتك قليلة وميزانيتك محدودة، فإن <strong>المترو</strong> هو الأرخص لكنه يتطلب عدة تبديلات. <strong>حافلة هافايست</strong> خيار وسط بسيط. <strong>التاكسي</strong> لا يحتاج إلى حجز لكن الأجرة بالعدّاد. أما <strong>التوصيل الخاص</strong> فيأخذك من صالة الوصول إلى باب الفندق بسعر ثابت: عندنا €${E.sult} للسيارة السيدان.</p>
<h2>1. المترو</h2>
<p>يبدأ خط المترو M11 تحت مبنى المطار مباشرة. للوصول إلى السلطان أحمد تحتاج إلى تبديلين على الأقل، مثلًا إلى خط M2 في محطة غيرتبه، ثم إلى قطار مرمراي أو ترام T1 قرب المدينة القديمة. تدفع ببطاقة إسطنبول كارت التي يمكنك شراؤها وشحنها من أجهزة محطة المطار.</p>
<ul>
<li><strong>الإيجابيات:</strong> الأرخص وبدون زحام.</li>
<li><strong>السلبيات:</strong> تبديلات وسلالم وقطارات مزدحمة مع الحقائب، والجزء الأخير إلى الفندق سيرًا على الأقدام فوق الحجارة.</li>
</ul>
<h2>2. حافلة هافايست</h2>
<p>هافايست هي حافلة المطار الرسمية. تنطلق من منطقة الحافلات أسفل صالة الوصول، ولها خط باتجاه المدينة القديمة. سعرها أعلى من المترو لكنه أقل بكثير من السيارة.</p>
<ul>
<li><strong>الإيجابيات:</strong> مقعد واحد، والأمتعة في صندوق الحافلة، وبدون تبديل.</li>
<li><strong>السلبيات:</strong> تقف في الزحام نفسه مثل السيارات، وتعمل حسب جدول مواعيد، وتمشي من المحطة إلى الفندق.</li>
</ul>
{widget}
<h2>3. التاكسي من الموقف</h2>
<p>تنتظر سيارات التاكسي أمام صالة الوصول. لا تحتاج إلى حجز، لكن الأجرة بالعدّاد، لذلك يرفع الزحام على الطريق السريع أو في المدينة القديمة السعر. بعد وصول عدة رحلات قد يكون هناك طابور، وقد لا تتسع سيارة واحدة لعائلة معها عدة حقائب. وفي شوارع السلطان أحمد الضيقة يتوقف بعض السائقين قبل الفندق.</p>
<h2>4. التوصيل الخاص</h2>
<p>ينتظرك السائق في صالة الوصول عند المخرج المحدد في الحجز (عادة المخرج 13) حاملًا لوحة باسمك. يتابع السائق رحلتك الجوية، فلا يغيّر التأخير شيئًا، وأول ${E.wait} دقيقة من الانتظار مجانية. السعر للسيارة وليس للشخص، ويشمل الزحام ورسوم الطرق والأمتعة. تستغرق الرحلة حوالي ${K.sult[1]} دقيقة بدون زحام شديد.</p>
<h2>مقارنة سريعة</h2>
<table><thead><tr><th></th><th>المترو</th><th>هافايست</th><th>التاكسي</th><th>التوصيل</th></tr></thead><tbody>
<tr><td>السعر</td><td>الأقل</td><td>منخفض</td><td>بالعدّاد</td><td>ثابت، من €${E.sult} للسيارة</td></tr>
<tr><td>التبديل</td><td>مرتان أو أكثر</td><td>لا</td><td>لا</td><td>لا</td></tr>
<tr><td>حتى باب الفندق</td><td>لا</td><td>لا</td><td>غالبًا</td><td>نعم</td></tr>
<tr><td>الأمتعة</td><td>تحملها بنفسك</td><td>في صندوق الحافلة</td><td>مساحة محدودة</td><td>سيارة تناسب أمتعتك</td></tr>
<tr><td>في وقت متأخر من الليل</td><td>محدود</td><td>محدود</td><td>نعم</td><td>نعم، على مدار الساعة</td></tr>
</tbody></table>
<h2>كم يكلف التوصيل؟</h2>
<p>من مطار إسطنبول إلى <a href="${L.ar.sult}">السلطان أحمد</a>: €${E.sult} بسيارة سيدان (حتى 3 أشخاص)، و€${E.sultVan} بميني فان (حتى 6)، و€${E.sultVip} بمرسيدس V-Class، و€${E.sultBus} بميني باص حتى 13 شخصًا. مقعد الأطفال €${E.seat}. جميع المسارات في <a href="${L.ar.prices}">صفحة الأسعار</a>.</p>
<h2>ماذا تختار؟</h2>
<ul>
<li><strong>المترو أو هافايست</strong> إذا كنت مسافرًا وحدك أو مع شخص آخر بأمتعة صغيرة في النهار.</li>
<li><strong>التوصيل الخاص</strong> بعد رحلة طويلة، أو في الليل، أو مع الأطفال، أو مع مجموعة، أو مع أمتعة كثيرة.</li>
</ul>
<p>يستغرق الحجز مع {brand} دقيقة تقريبًا: بدون حساب وبدون دفع مسبق. وتدفع للسائق نقدًا في نهاية الرحلة.</p>
{widget}`
    }
  },
  {
    id: "uber-taxi-transfer",
    date: "2026-11-10",
    en: {
      slug: "uber-taxi-or-private-transfer-in-istanbul",
      title: "Uber, Taxi or Private Transfer in Istanbul: Which Is Best?",
      desc: `Does Uber work in Istanbul? How Uber, street taxis and private transfers compare on price, waiting, luggage and safety, with fixed transfer prices from €${E.taksim} per car.`,
      lead: "Many visitors open the Uber app when they land in Istanbul and are surprised by what they get. Here is how Uber actually works in Istanbul, how it compares with a street taxi and a pre-booked transfer, and which one fits your trip.",
      body: `<h2>Does Uber work in Istanbul?</h2>
<p>Yes, but not the way it does in most cities. In Istanbul, Uber does not use private drivers in their own cars. The app books a <strong>licensed city taxi</strong>: a yellow taxi, a turquoise taxi (a slightly higher tariff) or a black taxi (the most expensive). The fare is calculated by the <strong>taxi meter</strong>, so the price in the app is only an estimate. Local apps such as BiTaksi work the same way.</p>
<p>In practice that means Uber in Istanbul is a way to call a taxi, not a different kind of service. Traffic, detours and waiting time still go on the meter.</p>
<h2>Street taxi from the rank</h2>
<p>At Istanbul Airport and Sabiha Gökçen there are taxi ranks outside arrivals. You do not need a booking, but after a busy wave of flights there is often a queue, and a family with four suitcases may not fit in one yellow car. The fare is metered, and some drivers prefer long rides or cash only. For trips in the city, finding a free taxi at rush hour or in the rain can take a long time.</p>
{widget}
<h2>Private transfer</h2>
<p>With a pre-booked transfer you know the price before you travel, and it does not change in traffic. Your driver tracks your flight, waits in the arrivals hall with your name on a sign and helps with your luggage. You choose the car for your group: a sedan for up to 3 people, a minivan or Mercedes V-Class for up to 6 and a minibus for up to 13.</p>
<h2>Side by side</h2>
<table><thead><tr><th></th><th>Uber</th><th>Street taxi</th><th>Private transfer</th></tr></thead><tbody>
<tr><td>Price</td><td>Meter, estimate in the app</td><td>Meter</td><td>Fixed, known in advance</td></tr>
<tr><td>Traffic</td><td>You pay for it</td><td>You pay for it</td><td>Included</td></tr>
<tr><td>Meeting point</td><td>Kerb, you find the car</td><td>Taxi rank queue</td><td>Arrivals hall, name sign</td></tr>
<tr><td>Flight delay</td><td>You rebook</td><td>No booking</td><td>${E.wait} min free waiting, flight tracked</td></tr>
<tr><td>Groups and luggage</td><td>Usually a standard car</td><td>Usually a standard car</td><td>Car chosen for your group</td></tr>
<tr><td>Child seat</td><td>Rarely</td><td>Rarely</td><td>On request (€${E.seat})</td></tr>
</tbody></table>
<h2>What does it cost from the airport?</h2>
<p>From Istanbul Airport to Sultanahmet is about ${K.sult[0]} km, and to Taksim about ${K.taksim[0]} km. With us the price is per car, not per person: <a href="${L.en.sult}">Sultanahmet €${E.sult}</a>, <a href="${L.en.taksim}">Taksim €${E.taksim}</a> in a sedan, or €${E.sultVan} to Sultanahmet in a minivan for up to 6. From Sabiha Gökçen, <a href="${L.en.kadikoy}">Kadıköy is €${E.kadikoy}</a>. With a taxi or Uber the final price depends on the meter and the traffic on the day. All fixed prices are on our <a href="${L.en.prices}">prices page</a>.</p>
<h2>Which one should you choose?</h2>
<ul>
<li><strong>Uber or a taxi</strong> is fine for a short ride in the city during the day, when you travel light and know where you are going.</li>
<li><strong>A private transfer</strong> is the better choice after a long flight, at night, with children or a group, with a lot of luggage, or when you want to know the price before you go.</li>
</ul>
<p>Booking a transfer with {brand} takes about a minute: no account and no payment up front. You pay the driver in cash at the end of the ride.</p>
{widget}`
    },
    de: {
      slug: "uber-taxi-oder-privattransfer-in-istanbul",
      title: "Uber, Taxi oder Privattransfer in Istanbul: Was ist besser?",
      desc: `Gibt es Uber in Istanbul? Uber, Taxi und Privattransfer im Vergleich: Preis, Wartezeit, Gepäck und Sicherheit. Transfer zum Festpreis ab €${E.taksim} pro Fahrzeug.`,
      lead: "Viele Reisende öffnen nach der Landung in Istanbul die Uber-App und sind überrascht. So funktioniert Uber in Istanbul wirklich, so schneidet es gegen Taxi und vorgebuchten Transfer ab, und das passt zu Ihrer Reise.",
      body: `<h2>Gibt es Uber in Istanbul?</h2>
<p>Ja, aber anders als in den meisten Städten. In Istanbul fahren über Uber keine Privatfahrer mit eigenem Auto. Die App bestellt ein <strong>lizenziertes Stadttaxi</strong>: ein gelbes Taxi, ein türkisfarbenes Taxi (etwas höherer Tarif) oder ein schwarzes Taxi (am teuersten). Der Fahrpreis wird über das <strong>Taxameter</strong> berechnet, der Preis in der App ist also nur eine Schätzung. Lokale Apps wie BiTaksi funktionieren genauso.</p>
<p>Uber ist in Istanbul also nur ein Weg, ein Taxi zu rufen, kein anderer Service. Stau, Umwege und Wartezeit laufen weiter über das Taxameter.</p>
<h2>Taxi vom Taxistand</h2>
<p>Am Flughafen Istanbul und in Sabiha Gökçen gibt es Taxistände vor der Ankunftshalle. Sie brauchen keine Buchung, aber nach einer Welle von Landungen gibt es oft eine Schlange, und eine Familie mit vier Koffern passt nicht immer in ein gelbes Taxi. Gefahren wird nach Taxameter, und manche Fahrer bevorzugen lange Fahrten oder nur Bargeld. In der Stadt kann es zur Rushhour oder bei Regen lange dauern, ein freies Taxi zu finden.</p>
{widget}
<h2>Privattransfer</h2>
<p>Bei einem vorgebuchten Transfer kennen Sie den Preis vor der Fahrt, und er ändert sich im Stau nicht. Ihr Fahrer verfolgt Ihren Flug, wartet mit einem Namensschild in der Ankunftshalle und hilft mit dem Gepäck. Sie wählen das Fahrzeug für Ihre Gruppe: Limousine für bis zu 3 Personen, Minivan oder Mercedes V-Klasse für bis zu 6 und Kleinbus für bis zu 13.</p>
<h2>Im Vergleich</h2>
<table><thead><tr><th></th><th>Uber</th><th>Taxi</th><th>Privattransfer</th></tr></thead><tbody>
<tr><td>Preis</td><td>Taxameter, Schätzung in der App</td><td>Taxameter</td><td>Festpreis, vorher bekannt</td></tr>
<tr><td>Stau</td><td>Zahlen Sie mit</td><td>Zahlen Sie mit</td><td>Inklusive</td></tr>
<tr><td>Treffpunkt</td><td>Bordstein, Sie suchen das Auto</td><td>Schlange am Taxistand</td><td>Ankunftshalle, Namensschild</td></tr>
<tr><td>Flugverspätung</td><td>Neu bestellen</td><td>Keine Buchung</td><td>${E.wait} Min. kostenlose Wartezeit, Flug wird verfolgt</td></tr>
<tr><td>Gruppen und Gepäck</td><td>Meist ein normales Auto</td><td>Meist ein normales Auto</td><td>Fahrzeug passend zur Gruppe</td></tr>
<tr><td>Kindersitz</td><td>Selten</td><td>Selten</td><td>Auf Anfrage (€${E.seat})</td></tr>
</tbody></table>
<h2>Was kostet die Fahrt vom Flughafen?</h2>
<p>Vom Flughafen Istanbul nach Sultanahmet sind es etwa ${K.sult[0]} km, nach Taksim etwa ${K.taksim[0]} km. Bei uns gilt der Preis pro Fahrzeug, nicht pro Person: <a href="${L.de.sult}">Sultanahmet €${E.sult}</a>, <a href="${L.de.taksim}">Taksim €${E.taksim}</a> in der Limousine oder €${E.sultVan} nach Sultanahmet im Minivan für bis zu 6 Personen. Von Sabiha Gökçen kostet <a href="${L.de.kadikoy}">Kadıköy €${E.kadikoy}</a>. Mit Taxi oder Uber hängt der Endpreis vom Taxameter und vom Verkehr ab. Alle Festpreise finden Sie auf unserer <a href="${L.de.prices}">Preisseite</a>.</p>
<h2>Was sollten Sie wählen?</h2>
<ul>
<li><strong>Uber oder Taxi</strong> passt für kurze Fahrten in der Stadt tagsüber, mit wenig Gepäck und bekanntem Ziel.</li>
<li><strong>Ein Privattransfer</strong> ist besser nach einem langen Flug, nachts, mit Kindern oder einer Gruppe, mit viel Gepäck oder wenn Sie den Preis vorher kennen möchten.</li>
</ul>
<p>Die Buchung bei {brand} dauert etwa eine Minute: ohne Konto und ohne Vorauszahlung. Sie bezahlen den Fahrer am Ende der Fahrt in bar.</p>
{widget}`
    },
    ru: {
      slug: "uber-taksi-ili-transfer-v-stambule",
      title: "Uber, такси или трансфер в Стамбуле: что выбрать?",
      desc: `Работает ли Uber в Стамбуле? Сравниваем Uber, такси и индивидуальный трансфер: цена, ожидание, багаж и безопасность. Трансфер по фиксированной цене от €${E.taksim} за машину.`,
      lead: "Многие туристы после посадки в Стамбуле открывают Uber и удивляются результату. Рассказываем, как на самом деле работает Uber в Стамбуле, чем он отличается от обычного такси и заказанного трансфера и что подойдёт именно вам.",
      body: `<h2>Работает ли Uber в Стамбуле?</h2>
<p>Да, но не так, как в большинстве городов. В Стамбуле через Uber не ездят частные водители на своих машинах. Приложение вызывает <strong>лицензированное городское такси</strong>: жёлтое, бирюзовое (тариф чуть выше) или чёрное (самое дорогое). Стоимость считает <strong>счётчик</strong>, поэтому цена в приложении только примерная. Местные приложения, например BiTaksi, работают так же.</p>
<p>То есть Uber в Стамбуле — это просто способ вызвать такси, а не другой сервис. Пробки, объезды и ожидание по-прежнему идут по счётчику.</p>
<h2>Такси со стоянки</h2>
<p>В аэропорту Стамбула и в Сабихе Гёкчен у выхода из зала прилёта есть стоянки такси. Бронировать ничего не нужно, но после волны прилётов там часто очередь, а семья с четырьмя чемоданами может не поместиться в одну жёлтую машину. Оплата по счётчику, и некоторые водители предпочитают дальние поездки или только наличные. В городе в час пик или в дождь поймать свободное такси бывает очень долго.</p>
{widget}
<h2>Индивидуальный трансфер</h2>
<p>При заранее заказанном трансфере вы знаете цену до поездки, и она не меняется в пробке. Водитель следит за рейсом, ждёт в зале прилёта с табличкой с вашим именем и помогает с багажом. Машину вы выбираете под свою компанию: седан до 3 человек, минивэн или Mercedes V-Class до 6 и микроавтобус до 13.</p>
<h2>Сравнение</h2>
<table><thead><tr><th></th><th>Uber</th><th>Такси</th><th>Трансфер</th></tr></thead><tbody>
<tr><td>Цена</td><td>Счётчик, примерная цена в приложении</td><td>Счётчик</td><td>Фиксированная, известна заранее</td></tr>
<tr><td>Пробки</td><td>Платите вы</td><td>Платите вы</td><td>Включены</td></tr>
<tr><td>Место встречи</td><td>У обочины, ищете машину сами</td><td>Очередь на стоянке</td><td>Зал прилёта, табличка с именем</td></tr>
<tr><td>Задержка рейса</td><td>Вызываете заново</td><td>Без брони</td><td>${E.wait} мин бесплатного ожидания, рейс отслеживается</td></tr>
<tr><td>Группа и багаж</td><td>Обычно стандартная машина</td><td>Обычно стандартная машина</td><td>Машина под вашу группу</td></tr>
<tr><td>Детское кресло</td><td>Редко</td><td>Редко</td><td>По запросу (€${E.seat})</td></tr>
</tbody></table>
<h2>Сколько стоит дорога из аэропорта?</h2>
<p>От аэропорта Стамбула до Султанахмета около ${K.sult[0]} км, до Таксима около ${K.taksim[0]} км. У нас цена за машину, а не за человека: <a href="${L.ru.sult}">Султанахмет €${E.sult}</a>, <a href="${L.ru.taksim}">Таксим €${E.taksim}</a> на седане или €${E.sultVan} до Султанахмета на минивэне до 6 человек. Из Сабихи Гёкчен <a href="${L.ru.kadikoy}">до Кадыкёя €${E.kadikoy}</a>. На такси или Uber итоговая цена зависит от счётчика и пробок в этот день. Все фиксированные цены — на <a href="${L.ru.prices}">странице цен</a>.</p>
<h2>Что выбрать?</h2>
<ul>
<li><strong>Uber или такси</strong> подойдут для короткой поездки по городу днём, когда у вас мало вещей и вы знаете, куда едете.</li>
<li><strong>Индивидуальный трансфер</strong> лучше после долгого перелёта, ночью, с детьми или компанией, с большим багажом или когда хочется знать цену заранее.</li>
</ul>
<p>Заказ трансфера в {brand} занимает около минуты: без регистрации и предоплаты. Вы платите водителю наличными в конце поездки.</p>
{widget}`
    },
    ar: {
      slug: "uber-am-taxi-am-tawsil-khas-fi-istanbul",
      title: "أوبر أم تاكسي أم توصيل خاص في إسطنبول: أيها الأفضل؟",
      desc: `هل يعمل أوبر في إسطنبول؟ مقارنة بين أوبر والتاكسي والتوصيل الخاص من حيث السعر والانتظار والأمتعة والأمان، مع توصيل بسعر ثابت من €${E.taksim} للسيارة.`,
      lead: "يفتح كثير من الزوار تطبيق أوبر بعد الهبوط في إسطنبول ويتفاجؤون بما يحصلون عليه. إليك كيف يعمل أوبر فعلًا في إسطنبول، وكيف يقارن بالتاكسي العادي والتوصيل المحجوز مسبقًا، وأيها يناسب رحلتك.",
      body: `<h2>هل يعمل أوبر في إسطنبول؟</h2>
<p>نعم، لكن ليس كما في معظم المدن. في إسطنبول لا يعمل أوبر مع سائقين خاصين بسياراتهم. التطبيق يطلب لك <strong>تاكسي مرخصًا من المدينة</strong>: تاكسي أصفر، أو تاكسي فيروزي (تعرفة أعلى قليلًا)، أو تاكسي أسود (الأغلى). تُحسب الأجرة <strong>بالعدّاد</strong>، لذلك فإن السعر في التطبيق تقديري فقط. التطبيقات المحلية مثل BiTaksi تعمل بالطريقة نفسها.</p>
<p>أي أن أوبر في إسطنبول مجرد وسيلة لطلب تاكسي، وليس خدمة مختلفة. الزحام والطرق الأطول ووقت الانتظار كلها تُحسب على العدّاد.</p>
<h2>التاكسي من الموقف</h2>
<p>في مطار إسطنبول ومطار صبيحة كوكجن توجد مواقف تاكسي أمام صالة الوصول. لا تحتاج إلى حجز، لكن بعد وصول عدة رحلات يكون هناك طابور في الغالب، وقد لا تتسع سيارة صفراء واحدة لعائلة معها أربع حقائب. الأجرة بالعدّاد، وبعض السائقين يفضلون المشاوير الطويلة أو الدفع نقدًا فقط. وفي المدينة قد يستغرق العثور على تاكسي فارغ وقتًا طويلًا في ساعات الذروة أو تحت المطر.</p>
{widget}
<h2>التوصيل الخاص</h2>
<p>مع التوصيل المحجوز مسبقًا تعرف السعر قبل الرحلة، ولا يتغير في الزحام. يتابع السائق رحلتك الجوية، وينتظرك في صالة الوصول حاملًا لوحة باسمك، ويساعدك في الأمتعة. وتختار السيارة المناسبة لمجموعتك: سيدان حتى 3 أشخاص، وميني فان أو مرسيدس V-Class حتى 6، وميني باص حتى 13.</p>
<h2>مقارنة سريعة</h2>
<table><thead><tr><th></th><th>أوبر</th><th>التاكسي</th><th>التوصيل الخاص</th></tr></thead><tbody>
<tr><td>السعر</td><td>بالعدّاد، تقديري في التطبيق</td><td>بالعدّاد</td><td>ثابت ومعروف مسبقًا</td></tr>
<tr><td>الزحام</td><td>تدفع ثمنه</td><td>تدفع ثمنه</td><td>مشمول</td></tr>
<tr><td>مكان اللقاء</td><td>على الرصيف، تبحث عن السيارة</td><td>طابور الموقف</td><td>صالة الوصول، لوحة باسمك</td></tr>
<tr><td>تأخر الرحلة</td><td>تطلب من جديد</td><td>بدون حجز</td><td>${E.wait} دقيقة انتظار مجاني ومتابعة الرحلة</td></tr>
<tr><td>المجموعات والأمتعة</td><td>سيارة عادية غالبًا</td><td>سيارة عادية غالبًا</td><td>سيارة تناسب مجموعتك</td></tr>
<tr><td>مقعد الأطفال</td><td>نادرًا</td><td>نادرًا</td><td>عند الطلب (€${E.seat})</td></tr>
</tbody></table>
<h2>كم تكلف الرحلة من المطار؟</h2>
<p>المسافة من مطار إسطنبول إلى السلطان أحمد حوالي ${K.sult[0]} كم، وإلى تقسيم حوالي ${K.taksim[0]} كم. عندنا السعر للسيارة وليس للشخص: <a href="${L.ar.sult}">السلطان أحمد €${E.sult}</a>، و<a href="${L.ar.taksim}">تقسيم €${E.taksim}</a> بسيارة سيدان، أو €${E.sultVan} إلى السلطان أحمد بميني فان حتى 6 أشخاص. ومن صبيحة كوكجن <a href="${L.ar.kadikoy}">إلى قاضي كوي €${E.kadikoy}</a>. أما مع التاكسي أو أوبر فالسعر النهائي يعتمد على العدّاد وزحام ذلك اليوم. جميع الأسعار الثابتة في <a href="${L.ar.prices}">صفحة الأسعار</a>.</p>
<h2>ماذا تختار؟</h2>
<ul>
<li><strong>أوبر أو التاكسي</strong> مناسبان لمشوار قصير داخل المدينة نهارًا، مع أمتعة قليلة ووجهة معروفة.</li>
<li><strong>التوصيل الخاص</strong> هو الخيار الأفضل بعد رحلة طويلة، أو في الليل، أو مع الأطفال أو مجموعة، أو مع أمتعة كثيرة، أو عندما تريد معرفة السعر مسبقًا.</li>
</ul>
<p>يستغرق حجز التوصيل مع {brand} دقيقة تقريبًا: بدون حساب وبدون دفع مسبق. وتدفع للسائق نقدًا في نهاية الرحلة.</p>
{widget}`
    }
  }
];
