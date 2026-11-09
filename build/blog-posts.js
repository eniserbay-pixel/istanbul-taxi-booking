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
  sultVan: pr("IST", "sultanahmet", "minivan"), wait: P.rules.freeWaitMin, seat: P.rules.childSeat
};
const K = { sult: km("IST", "sultanahmet"), taksim: km("IST", "taksim") };

module.exports = [
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
