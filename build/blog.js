// Blog posts in English and Russian (German, French, Italian and Dutch are in build/lang/). Each post has one `id` in every language, so the pages link to each other.
// body: HTML; {widget} is replaced by the booking box, {brand} by the brand name, {book} by the booking page.
// Facts with numbers carry their source link in the text.
const SRC = {
  density: "https://www.duvarenglish.com/istanbul-has-one-of-worlds-lowest-taxi-densities-says-municipality-news-58745",
  complaints: "https://www.duvarenglish.com/istanbul-municipality-receives-thousands-of-complaints-about-taxi-drivers-being-picky-with-passengers-news-62652"
};

module.exports = [
  {
    id: "taxi-shortage",
    date: "2026-10-26",
    en: {
      slug: "why-is-it-hard-to-find-a-taxi-in-istanbul",
      title: "Why Is It Hard to Find a Taxi in Istanbul?",
      desc: "Istanbul has about one taxi per 1,000 people and thousands of complaints a year. Why taxis are hard to find, and how to skip the problem by booking ahead.",
      lead: "Istanbul is a city of over 16 million people, but its taxi fleet has barely grown in 30 years. That is why finding a taxi, especially at the airport, at rush hour or in the rain, can take a long time.",
      body: `<h2>Too few taxis for a very big city</h2>
<p>According to Istanbul Metropolitan Municipality figures reported in 2021, the city had <strong>17,395 taxis</strong>, the same number as in the 1990s, while the population more than doubled from 7.5 million to over 16 million. That is <strong>about one taxi per 1,000 residents</strong>. For comparison, New York had 13,587 taxis for 8.4 million people (<a href="${SRC.density}" target="_blank" rel="noopener">source</a>).</p>
<p>The result is simple: at busy times there are far more people looking for a taxi than there are taxis.</p>
{widget}
<h2>Drivers choose their passengers</h2>
<p>The most common complaint about Istanbul taxis is not price, it is drivers picking passengers and routes. In the first six months of 2023 the municipality received <strong>33,878 complaints</strong> about taxis. More than half, <strong>18,079</strong>, were about drivers being picky about the passenger or the destination. Others were about overcharging (3,026), longer routes (1,386), refusing short rides (1,290) and not switching on the meter (712) (<a href="${SRC.complaints}" target="_blank" rel="noopener">source</a>).</p>
<p>For a visitor with suitcases who does not speak Turkish, this is exactly what makes the first hour in Istanbul stressful.</p>
<h2>Where it is hardest</h2>
<ul>
<li><strong>At the airport after a late flight:</strong> long queues at the taxi rank, and families or groups often do not fit in one yellow cab.</li>
<li><strong>At rush hour and in the rain:</strong> taxis are full or drivers turn down trips into traffic.</li>
<li><strong>Short trips and the Asian side:</strong> some drivers refuse rides they consider not worth it, or a Bosphorus crossing.</li>
</ul>
<h2>The easy way: book before you land</h2>
<p>A pre-booked transfer solves all of this. With {brand} you choose your car and see the fixed price before you travel. Your driver tracks your flight and waits in the arrivals hall with your name sign, so there is no queue, no negotiation and no meter. You pay the same price in cash at the end of the ride.</p>
<p>Booking takes about a minute: no account and no payment up front. You get an e-mail that we received your request, then a confirmation e-mail once your car is assigned.</p>
{widget}`
    },
    ru: {
      slug: "pochemu-trudno-najti-taksi-v-stambule",
      title: "Почему в Стамбуле так трудно найти такси?",
      desc: "В Стамбуле около одного такси на 1000 жителей и тысячи жалоб в год. Почему трудно поймать такси и как решить проблему, заказав трансфер заранее.",
      lead: "В Стамбуле живёт больше 16 миллионов человек, но парк такси почти не вырос за 30 лет. Поэтому поймать такси, особенно в аэропорту, в час пик или в дождь, бывает очень непросто.",
      body: `<h2>Слишком мало такси для огромного города</h2>
<p>По данным мэрии Стамбула, опубликованным в 2021 году, в городе было <strong>17 395 такси</strong> — столько же, сколько в 1990-х, хотя население за это время выросло с 7,5 до более чем 16 миллионов. Это <strong>примерно одно такси на 1000 жителей</strong>. Для сравнения: в Нью-Йорке 13 587 такси на 8,4 миллиона человек (<a href="${SRC.density}" target="_blank" rel="noopener">источник</a>).</p>
<p>Итог простой: в часы пик людей, которым нужно такси, гораздо больше, чем самих такси.</p>
{widget}
<h2>Водители выбирают пассажиров</h2>
<p>Самая частая жалоба на стамбульские такси — не цена, а то, что водители выбирают пассажиров и маршруты. За первые шесть месяцев 2023 года мэрия получила <strong>33 878 жалоб</strong> на такси. Больше половины, <strong>18 079</strong>, касались того, что водитель выбирал пассажира или направление. Остальные — завышенная цена (3026), объезд длинной дорогой (1386), отказ от коротких поездок (1290) и невключённый счётчик (712) (<a href="${SRC.complaints}" target="_blank" rel="noopener">источник</a>).</p>
<p>Для туриста с чемоданами, который не говорит по-турецки, именно это делает первый час в Стамбуле стрессовым.</p>
<h2>Где сложнее всего</h2>
<ul>
<li><strong>В аэропорту после позднего рейса:</strong> длинная очередь на стоянке такси, а семья или группа часто не помещается в одну жёлтую машину.</li>
<li><strong>В час пик и в дождь:</strong> такси заняты, или водители отказываются ехать в пробки.</li>
<li><strong>Короткие поездки и азиатская сторона:</strong> некоторые водители отказываются от невыгодных поездок или от переезда через Босфор.</li>
</ul>
<h2>Простое решение: заказать до прилёта</h2>
<p>Заранее заказанный трансфер решает все эти проблемы. В {brand} вы выбираете машину и видите фиксированную цену ещё до поездки. Водитель следит за рейсом и ждёт в зале прилёта с табличкой с вашим именем: без очереди, без торга и без счётчика. Ту же цену вы платите наличными в конце поездки.</p>
<p>Заказ занимает около минуты: без регистрации и предоплаты. Сначала мы пишем, что получили заявку, а когда машина назначена — присылаем подтверждение.</p>
{widget}`
    }
  },
  {
    id: "taxi-vs-transfer",
    date: "2026-10-26",
    en: {
      slug: "istanbul-airport-taxi-or-pre-booked-transfer",
      title: "Istanbul Airport: Taxi Rank or Pre-Booked Transfer?",
      desc: "Taking a taxi from the rank at Istanbul Airport or Sabiha Gökçen, or booking a private transfer before you fly: price, waiting, luggage and safety compared.",
      lead: "You land at Istanbul Airport or Sabiha Gökçen and need to get to your hotel. You can join the taxi queue, or have a driver already waiting for you. Here is how the two compare.",
      body: `<h2>Price: meter or fixed</h2>
<p>A street taxi runs on the meter, so the price depends on traffic and the route the driver takes. Overcharging and longer routes are among the most common complaints the municipality receives about Istanbul taxis (<a href="${SRC.complaints}" target="_blank" rel="noopener">source</a>). A pre-booked transfer has a fixed price per car that you know before you travel. Tolls and parking are included.</p>
{widget}
<h2>Waiting: queue or name sign</h2>
<p>At the taxi rank you wait in line, sometimes for a long time after several flights land together. With a transfer your driver tracks your flight and waits in the arrivals hall with your name sign. With {brand} the first 60 minutes after landing are free, so a long passport queue or a late bag costs nothing extra.</p>
<h2>Luggage and groups</h2>
<p>A yellow taxi takes up to four passengers and limited luggage. With a transfer you choose the car that fits: a sedan for up to 3, a minivan for up to 7, a Mercedes V-Class for up to 6 or a minibus for up to 16. One price per car, not per person.</p>
<h2>Language and safety</h2>
<p>You do not need to explain your hotel address in Turkish: it is already in your booking. You travel with a professional driver who knows where you are going, and you pay the agreed price at the end.</p>
<h2>When a taxi still makes sense</h2>
<p>If you land at a quiet time, travel light and alone, and your hotel is close, a taxi from the rank can be fine. For families, groups, late arrivals and anyone who wants to know the price in advance, booking ahead is simpler.</p>
{widget}`
    },
    ru: {
      slug: "taksi-ili-transfer-iz-aeroporta-stambula",
      title: "Аэропорт Стамбула: такси со стоянки или трансфер?",
      desc: "Такси со стоянки в аэропорту Стамбула или Сабиха Гёкчен или трансфер, заказанный до вылета: сравниваем цену, ожидание, багаж и безопасность.",
      lead: "Вы приземлились в аэропорту Стамбула или Сабиха Гёкчен, и нужно добраться до отеля. Можно встать в очередь на такси, а можно сесть в машину, водитель которой вас уже ждёт. Вот как они отличаются.",
      body: `<h2>Цена: счётчик или фиксированная</h2>
<p>Обычное такси работает по счётчику, поэтому цена зависит от пробок и маршрута, который выберет водитель. Завышенная цена и объезд длинной дорогой — среди самых частых жалоб на такси в мэрию Стамбула (<a href="${SRC.complaints}" target="_blank" rel="noopener">источник</a>). У трансфера цена за машину фиксирована, и вы знаете её до поездки. Платные дороги и парковка включены.</p>
{widget}
<h2>Ожидание: очередь или табличка с именем</h2>
<p>На стоянке такси приходится стоять в очереди, иногда долго, если одновременно приземлилось несколько рейсов. При трансфере водитель следит за рейсом и ждёт в зале прилёта с табличкой с вашим именем. В {brand} первые 60 минут после посадки бесплатны, так что длинная очередь на паспортном контроле или задержка багажа ничего не стоят.</p>
<h2>Багаж и группы</h2>
<p>Жёлтое такси берёт до четырёх пассажиров и ограниченный багаж. При трансфере вы выбираете подходящую машину: седан до 3 человек, минивэн до 7, Mercedes V-Class до 6 или микроавтобус до 16. Цена за машину, а не за человека.</p>
<h2>Язык и безопасность</h2>
<p>Не нужно объяснять водителю адрес отеля по-турецки: он уже есть в заказе. Вы едете с профессиональным водителем, который знает, куда ехать, и платите оговорённую цену в конце.</p>
<h2>Когда подойдёт обычное такси</h2>
<p>Если вы прилетаете в спокойное время, путешествуете один, налегке, а отель недалеко, такси со стоянки может подойти. Семьям, группам, тем, кто прилетает поздно, и всем, кто хочет знать цену заранее, проще заказать трансфер.</p>
{widget}`
    }
  },
  {
    id: "how-to-book",
    date: "2026-10-26",
    en: {
      slug: "how-to-book-istanbul-airport-transfer",
      title: "How to Book Your Istanbul Airport Transfer in a Minute",
      desc: "Book your Istanbul airport transfer with ITB Transfer in about a minute: no account, no prepayment. What happens after you send the form, step by step.",
      lead: "Booking a transfer with {brand} is faster than waiting at the taxi rank. It takes about a minute, needs no account and no payment up front. Here is exactly what happens.",
      body: `<h2>1. Choose your route and time</h2>
<p>In the booking box, pick where you start (Istanbul Airport, Sabiha Gökçen or a district) and where you go, then the date, the pickup time and the number of passengers. For an airport pickup, use your landing time. You can add the return transfer at 10% off.</p>
{widget}
<h2>2. Pick your car and see the fixed price</h2>
<p>You see all four cars with the price per car: sedan, minivan, Mercedes V-Class and minibus. Cars that are too small for your group are greyed out. The price you see is the price you pay.</p>
<h2>3. Enter your details</h2>
<p>Your name, mobile number with country code, e-mail and flight number, so we can track your flight. For a hotel pickup or drop-off, add the address. You can add child seats and a note for the driver.</p>
<h2>4. Send the request</h2>
<p>Check the summary and send it. You immediately get an e-mail that we received your request. Once we assign your car, usually within an hour, you get the confirmation e-mail with your meeting point.</p>
<h2>5. Meet your driver and pay in cash</h2>
<p>Your driver waits in the arrivals hall with your name sign. At the end of the ride you pay the fixed price in cash, in euro, US dollar or Turkish lira. Free cancellation up to 24 hours before pickup.</p>
{widget}`
    },
    ru: {
      slug: "kak-zakazat-transfer-iz-aeroporta-stambula",
      title: "Как заказать трансфер из аэропорта Стамбула за минуту",
      desc: "Закажите трансфер из аэропорта Стамбула в ITB Transfer примерно за минуту: без регистрации и предоплаты. Что происходит после отправки заявки, по шагам.",
      lead: "Заказать трансфер в {brand} быстрее, чем стоять в очереди на такси. Это занимает около минуты, без регистрации и предоплаты. Вот что происходит на каждом шаге.",
      body: `<h2>1. Выберите маршрут и время</h2>
<p>В форме заказа выберите, откуда вы едете (аэропорт Стамбула, Сабиха Гёкчен или район города) и куда, затем дату, время подачи и число пассажиров. Если вас встречают в аэропорту, укажите время посадки. Обратный трансфер можно добавить со скидкой 10%.</p>
{widget}
<h2>2. Выберите автомобиль и посмотрите цену</h2>
<p>Вы видите все четыре машины с ценой за машину: седан, минивэн, Mercedes V-Class и микроавтобус. Машины, в которые ваша группа не поместится, неактивны. Цена, которую вы видите, — это цена, которую вы платите.</p>
<h2>3. Введите свои данные</h2>
<p>Имя, мобильный телефон с кодом страны, e-mail и номер рейса, чтобы мы могли следить за ним. Если нужно забрать вас из отеля или отвезти в отель, укажите адрес. Можно добавить детские кресла и комментарий для водителя.</p>
<h2>4. Отправьте заявку</h2>
<p>Проверьте данные и отправьте заявку. Сразу придёт письмо о том, что мы её получили. Когда машина назначена, обычно в течение часа, вы получите письмо с подтверждением и местом встречи.</p>
<h2>5. Встретьтесь с водителем и оплатите наличными</h2>
<p>Водитель ждёт в зале прилёта с табличкой с вашим именем. В конце поездки вы платите фиксированную цену наличными: в евро, долларах США или турецких лирах. Отмена бесплатна не позднее чем за 24 часа до подачи.</p>
{widget}`
    }
  }
];

// Sources, for the posts in build/lang/*.js
module.exports.SRC = SRC;
