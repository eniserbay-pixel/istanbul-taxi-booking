// FAQ page: every question in one place, grouped by topic (booking, prices and payment, airport pickup, cars and
// luggage, changes and cancellation, drivers and the ride, other services), with a search box, a "read more" link
// per topic (build.js picks the pages) and FAQPage structured data. The home page keeps a short FAQ that links here.
// cats follow CATS in this order. Answers are plain text. Placeholders build.js fills in: {brand} {phone} {tursab}
// {min} (lowest price) {wait} (free waiting minutes) {seat} (child seat €) {ret} (return discount %), the busy
// hours {pct} {istFrom} {istTo} {sawFrom} {sawTo} and the meeting points {meetIST} {meetSAW}. A question whose
// placeholder has no value (for example no common busy hours) is left out.
const CATS = ["booking", "prices", "airport", "cars", "changes", "ride", "services"];

module.exports = {
  CATS,
  en: {
    path: "/faq", nav: "FAQ",
    title: "Istanbul Airport Transfer FAQ: Booking, Prices, Pickup · {brand}",
    desc: "All questions about your Istanbul transfer with {brand}: booking, prices and payment, airport pickup, cars and luggage, changes and cancellation.",
    h1: "Frequently asked questions",
    lead: "Everything about your Istanbul transfer with {brand}: prices and payment, airport pickup, cars and luggage, changes and cancellation. Can't find your answer? Write to us on WhatsApp.",
    search: "Search the questions: luggage, cancel, child seat…", noHits: "No question matches. Write to us on WhatsApp and we will answer.",
    related: "Read more", contactH: "Still have a question?", contactP: "Our office answers on WhatsApp, by phone and by e-mail.",
    ctaH: "Ready to book?", ctaP: "See your fixed price and send your request in a minute.",
    more: "See all questions",
    cats: [
      ["Booking", [
        ["How do I book a transfer?", "Choose where you start and where you go, the date, time and number of passengers, then pick your car. Enter your name, mobile number, e-mail and flight number and send the request. It takes about a minute and you see the fixed price before you send."],
        ["Do I need an account or a deposit?", "No. There is no account, no online payment and no deposit. You pay the driver at the end of the ride."],
        ["When is my booking confirmed?", "Right after you send the form you get a \"request received\" e-mail with your booking number. The booking is confirmed when we send you the confirmation e-mail, usually within an hour."],
        ["How far in advance should I book?", "As early as you can, ideally at least 24 hours before pickup, so the car you want is free. For a ride in the next few hours, write to us on WhatsApp and we check availability."],
        ["Can I book for someone else?", "Yes. Enter the passenger's name and mobile number so the driver can reach them, and your own e-mail for the confirmation. Add a note for the driver if you like."],
        ["Can I book on WhatsApp or by phone?", "Yes, write or call {phone}. The online form is the fastest way: you see the price at once and get your booking number by e-mail."]
      ]],
      ["Prices and payment", [
        ["Is the price per person or per car?", "Per car. The price stays the same whether you are one person or as many as the car takes: sedan 3, minivan 6, Mercedes V-Class 6, minibus 13."],
        ["What is included in the price?", "Tolls, bridges, parking, meet and greet with a name sign, help with your luggage and waiting time: the first {wait} minutes after landing at the airports. There is no meter and nothing extra to pay at the end."],
        ["How do I pay?", "In cash to the driver at the end of the ride, in euros, US dollars or Turkish lira at the day's rate. Companies that need monthly invoicing can open a corporate account."],
        ["How much does a transfer cost?", "Prices start at €{min} per car, one way. The price depends on the route and the car; our price list shows every route."],
        ["Are some hours more expensive?", "Yes, the busiest airport hours: pickups at Istanbul Airport between {istFrom} and {istTo} and at Sabiha Gökçen between {sawFrom} and {sawTo} cost {pct}% more. The booking form adds it, so the price you see is the price you pay."],
        ["Is a return transfer cheaper?", "Yes. Add the return in the search box and you get {ret}% off the return ride."],
        ["Is a tip expected?", "No, the tip is not part of the price. If you were happy with your driver a small tip is welcome, but it is never required."]
      ]],
      ["Airport pickup", [
        ["Where does my driver wait at Istanbul Airport (IST)?", "{meetIST}"],
        ["Where does my driver wait at Sabiha Gökçen (SAW)?", "{meetSAW}"],
        ["What if my flight is late or early?", "We track your flight with the flight number you give us and move the pickup to the real landing time. The first {wait} minutes after landing are free, enough for passport control and baggage."],
        ["What if I cannot find my driver?", "Call or write to us on WhatsApp at {phone}; both airports have free Wi-Fi. Your confirmation e-mail also has the meeting point and our number. Please do not leave with another driver."],
        ["When should I be picked up for my flight home?", "For an international flight plan to be at the airport about 3 hours before departure, and add the drive time. At your hotel or address the driver waits 15 minutes after the booked time."],
        ["Do you drive between Istanbul Airport and Sabiha Gökçen?", "Yes, at a fixed price per car. The drive across the city often takes more than an hour, so leave plenty of time between your flights."]
      ]],
      ["Cars and luggage", [
        ["Which car should I choose?", "For 1–3 people a sedan, for 4–6 people a minivan, for up to 6 who want more comfort the Mercedes V-Class, and for 7–13 people a minibus. For bigger groups, book several cars."],
        ["How much luggage fits in each car?", "Standard suitcases per car: sedan 3, minivan 7, Mercedes V-Class 6, minibus 16, plus hand luggage. Enter the number of suitcases in the booking form."],
        ["I have a stroller, golf bag, skis or a wheelchair. Is that a problem?", "No, just tell us in the note. Bulky items take space, so with a full car choose the next size up and we send a car they fit in."],
        ["Do you have child seats?", "Yes, baby and child seats are €{seat} each. Children need one, so add them in the booking form and write the children's ages in the note."],
        ["Will I get exactly the car in the photo?", "You get the car class you booked. The models shown are examples; the exact make and colour may vary."]
      ]],
      ["Changes and cancellation", [
        ["Can I cancel for free?", "Yes, up to 24 hours before pickup. Reply to your confirmation e-mail or write to us on WhatsApp."],
        ["What if I cancel later or do not show up?", "Tell us as soon as you can on WhatsApp. If you do not show up without telling us, we may ask for the price of the ride."],
        ["How do I change the time, address or flight?", "Reply to your confirmation e-mail or write to us on WhatsApp with your booking number. Changes are free up to 24 hours before pickup; after that we do our best."],
        ["My flight was cancelled. What now?", "Send us your new flight on WhatsApp and we move your transfer to it. If you no longer need the ride, we cancel it."]
      ]],
      ["Drivers and the ride", [
        ["Is {brand} a licensed company?", "Yes. {brand} is run by a licensed Turkish travel agency (TÜRSAB licence {tursab}). You ride in a private car with a professional driver, not in a street taxi."],
        ["Does the driver speak English?", "You do not need to explain anything: the driver has your name, address and flight from the booking. If you need help on the way, our office answers on WhatsApp."],
        ["Can we stop on the way?", "Tell us when you book, for example to pick up a friend on the route. For longer stops or several addresses, our chauffeur service by the hour fits better."],
        ["Do you drive at night?", "Yes, we pick up 24 hours a day, 7 days a week, also for early morning and late night flights, at the same fixed price."],
        ["Do you drive outside Istanbul?", "No. We serve Istanbul only: both airports, the Galataport cruise port and the districts on both sides of the Bosphorus."]
      ]],
      ["More than airport transfers", [
        ["Do you pick up at the Galataport cruise port?", "Yes. We meet cruise passengers at Galataport and drive them to both airports, hotels and districts at a fixed price."],
        ["Can I hire a car with driver by the hour or for a city tour?", "Yes, for a few hours or a full day, or for a city tour with stops on both sides of the Bosphorus. Write to us with your plan and we send you a fixed price."],
        ["Do you have cars for weddings and events?", "Yes, from a Mercedes V-Class for the couple to minibuses for the guests, and several cars at the same time if needed."],
        ["Do you work with companies and agencies?", "Yes. Companies can open a corporate account with monthly invoicing, and travel agencies and hotels can book for their guests with us."]
      ]]
    ]
  },
  tr: {
    path: "/tr/sss", nav: "SSS",
    title: "Sıkça Sorulan Sorular: İstanbul Havalimanı Transferi · {brand}",
    desc: "{brand} ile İstanbul transferi hakkında merak edilenler: rezervasyon, fiyat ve ödeme, havalimanında karşılama, araçlar ve bagaj, değişiklik ve iptal.",
    h1: "Sıkça sorulan sorular",
    lead: "{brand} ile İstanbul transferiniz hakkında bilmeniz gereken her şey: fiyat ve ödeme, havalimanında karşılama, araçlar ve bagaj, değişiklik ve iptal. Cevabını bulamadığınız soru için WhatsApp'tan yazın.",
    search: "Sorularda arayın: bagaj, iptal, çocuk koltuğu…", noHits: "Eşleşen soru yok. WhatsApp'tan yazın, size cevap verelim.",
    related: "Daha fazlası", contactH: "Başka sorunuz mu var?", contactP: "Ofisimiz WhatsApp, telefon ve e-postayla cevap verir.",
    ctaH: "Rezervasyona hazır mısınız?", ctaP: "Sabit fiyatınızı görün, talebinizi bir dakikada gönderin.",
    more: "Tüm soruları görün",
    cats: [
      ["Rezervasyon", [
        ["Transferi nasıl ayırtırım?", "Nereden ve nereye gideceğinizi, tarih, saat ve yolcu sayısını seçin, ardından aracınızı seçin. Adınızı, cep telefonunuzu, e-postanızı ve uçuş numaranızı girip talebi gönderin. Yaklaşık bir dakika sürer ve sabit fiyatı göndermeden önce görürsünüz."],
        ["Üyelik veya kapora gerekiyor mu?", "Hayır. Üyelik, online ödeme ve kapora yoktur. Ödemeyi yolculuk sonunda şoföre yaparsınız."],
        ["Rezervasyonum ne zaman onaylanır?", "Formu gönderdiğiniz anda rezervasyon numaranızın olduğu \"talebinizi aldık\" e-postası gelir. Rezervasyon, size onay e-postasını gönderdiğimizde kesinleşir; bu genellikle bir saat içinde olur."],
        ["Ne kadar önceden ayırtmalıyım?", "Mümkün olduğunca erken, tercihen alıştan en az 24 saat önce; böylece istediğiniz araç boş olur. Birkaç saat içindeki bir yolculuk için WhatsApp'tan yazın, müsaitliği kontrol edelim."],
        ["Başkası adına rezervasyon yapabilir miyim?", "Evet. Şoförün ulaşabilmesi için yolcunun adını ve cep telefonunu, onay için kendi e-postanızı yazın. İsterseniz şoföre not ekleyin."],
        ["WhatsApp'tan veya telefonla rezervasyon yapabilir miyim?", "Evet, {phone} numarasına yazın veya arayın. En hızlı yol online formdur: fiyatı hemen görür, rezervasyon numaranızı e-postayla alırsınız."]
      ]],
      ["Fiyat ve ödeme", [
        ["Fiyat kişi başı mı, araç başı mı?", "Araç başı. Tek kişi de olsanız aracın alabileceği kadar kişi de olsanız fiyat aynıdır: sedan 3, minivan 6, Mercedes V-Class 6, minibüs 13 kişi."],
        ["Fiyata neler dahil?", "Köprü, otoyol, otopark, isim tabelasıyla karşılama, bagaj yardımı ve bekleme süresi: havalimanlarında inişten sonraki ilk {wait} dakika. Taksimetre yoktur, sonunda ek ödeme çıkmaz."],
        ["Nasıl öderim?", "Yolculuk sonunda şoföre nakit; euro, ABD doları veya günün kuruyla Türk lirası. Aylık fatura isteyen şirketler kurumsal hesap açabilir."],
        ["Transfer ne kadar tutar?", "Fiyatlar tek yön araç başı €{min}'dan başlar. Fiyat güzergaha ve araca göre değişir; fiyat listemizde tüm güzergahlar var."],
        ["Bazı saatler daha mı pahalı?", "Evet, havalimanlarının en yoğun saatleri: İstanbul Havalimanı'nda {istFrom}–{istTo}, Sabiha Gökçen'de {sawFrom}–{sawTo} arası alışlar %{pct} daha fazladır. Rezervasyon formu bunu ekler, gördüğünüz fiyat ödeyeceğiniz fiyattır."],
        ["Dönüş transferi daha mı ucuz?", "Evet. Arama kutusunda dönüşü ekleyin, dönüş yolculuğunda %{ret} indirim kazanın."],
        ["Bahşiş vermem gerekiyor mu?", "Hayır, bahşiş fiyata dahil değildir. Şoförünüzden memnun kaldıysanız küçük bir bahşiş güzel olur ama hiçbir zaman zorunlu değildir."]
      ]],
      ["Havalimanında karşılama", [
        ["Şoförüm İstanbul Havalimanı'nda (IST) nerede bekler?", "{meetIST}"],
        ["Şoförüm Sabiha Gökçen'de (SAW) nerede bekler?", "{meetSAW}"],
        ["Uçuşum gecikirse veya erken inerse?", "Verdiğiniz uçuş numarasıyla uçuşunuzu takip eder, alışı gerçek iniş saatine kaydırırız. İnişten sonraki ilk {wait} dakika ücretsizdir; pasaport kontrolü ve bagaj için yeterlidir."],
        ["Şoförümü bulamazsam ne yaparım?", "{phone} numarasından bizi arayın veya WhatsApp'tan yazın; iki havalimanında da ücretsiz Wi-Fi var. Onay e-postanızda da buluşma noktası ve numaramız yazar. Lütfen başka bir şoförle gitmeyin."],
        ["Dönüş uçuşum için ne zaman alınmalıyım?", "Dış hat uçuşta kalkıştan yaklaşık 3 saat önce havalimanında olmayı planlayın, üzerine yol süresini ekleyin. Otelinizde veya adresinizde şoför, ayırtılan saatten sonra 15 dakika bekler."],
        ["İstanbul Havalimanı ile Sabiha Gökçen arasında transfer var mı?", "Evet, araç başı sabit fiyatla. Şehri boydan boya geçen yol çoğu zaman bir saatten uzun sürer; uçuşlarınız arasında bol zaman bırakın."]
      ]],
      ["Araçlar ve bagaj", [
        ["Hangi aracı seçmeliyim?", "1–3 kişi için sedan, 4–6 kişi için minivan, daha fazla konfor isteyen 6 kişiye kadar gruplar için Mercedes V-Class, 7–13 kişi için minibüs. Daha büyük gruplar birden fazla araç ayırtabilir."],
        ["Her araca ne kadar bagaj sığar?", "Araç başı standart bavul: sedan 3, minivan 7, Mercedes V-Class 6, minibüs 16; artı el bagajı. Bavul sayısını rezervasyon formuna yazın."],
        ["Bebek arabası, golf çantası, kayak veya tekerlekli sandalyem var. Sorun olur mu?", "Hayır, notta belirtmeniz yeterli. Hacimli eşyalar yer kaplar; araç doluysa bir üst aracı seçin, eşyalarınızın sığacağı aracı gönderelim."],
        ["Çocuk koltuğu var mı?", "Evet, bebek ve çocuk koltuğu tanesi €{seat}. Çocuklar için gereklidir; rezervasyon formunda ekleyin ve çocukların yaşlarını notta yazın."],
        ["Fotoğraftaki aracın aynısı mı gelir?", "Ayırttığınız araç sınıfı gelir. Gösterilen modeller örnektir; marka ve renk değişebilir."]
      ]],
      ["Değişiklik ve iptal", [
        ["Ücretsiz iptal edebilir miyim?", "Evet, alıştan 24 saat öncesine kadar. Onay e-postanızı yanıtlayın veya WhatsApp'tan yazın."],
        ["Daha geç iptal edersem veya gelmezsem?", "Mümkün olan en kısa sürede WhatsApp'tan haber verin. Haber vermeden gelmezseniz yolculuk ücretini isteyebiliriz."],
        ["Saati, adresi veya uçuşu nasıl değiştiririm?", "Onay e-postanızı yanıtlayın veya rezervasyon numaranızla WhatsApp'tan yazın. Değişiklikler alıştan 24 saat öncesine kadar ücretsizdir; sonrasında elimizden geleni yaparız."],
        ["Uçuşum iptal oldu. Ne yapmalıyım?", "Yeni uçuşunuzu WhatsApp'tan gönderin, transferinizi ona taşıyalım. Yolculuğa artık ihtiyacınız yoksa iptal ederiz."]
      ]],
      ["Şoförler ve yolculuk", [
        ["{brand} lisanslı bir firma mı?", "Evet. {brand}, lisanslı bir Türk seyahat acentesi tarafından işletilir (TÜRSAB belge no {tursab}). Sokak taksisine değil, profesyonel şoförlü özel bir araca binersiniz."],
        ["Şoför yabancı dil biliyor mu?", "Hiçbir şey anlatmanıza gerek yok: şoför adınızı, adresinizi ve uçuşunuzu rezervasyondan bilir. Yolda yardıma ihtiyacınız olursa ofisimiz WhatsApp'tan cevap verir."],
        ["Yolda mola verebilir miyiz?", "Rezervasyonda belirtin, örneğin güzergah üzerindeki bir arkadaşınızı almak için. Uzun molalar veya birden fazla adres için saatlik şoförlü araç hizmetimiz daha uygundur."],
        ["Gece de hizmet veriyor musunuz?", "Evet, haftanın 7 günü 24 saat; sabahın erken saatlerindeki ve gece geç saatlerdeki uçuşlar için de aynı sabit fiyatla."],
        ["İstanbul dışına gidiyor musunuz?", "Hayır. Sadece İstanbul'da hizmet veriyoruz: iki havalimanı, Galataport kruvaziyer limanı ve Boğaz'ın iki yakasındaki semtler."]
      ]],
      ["Havalimanı dışındaki hizmetler", [
        ["Galataport kruvaziyer limanından alıyor musunuz?", "Evet. Kruvaziyer yolcularını Galataport'ta karşılayıp iki havalimanına, otellere ve semtlere sabit fiyatla götürüyoruz."],
        ["Saatlik şoförlü araç veya şehir turu ayırtabilir miyim?", "Evet; birkaç saatlik veya tam gün, ya da Boğaz'ın iki yakasında duraklı bir şehir turu için. Planınızı yazın, size sabit fiyat gönderelim."],
        ["Düğün ve etkinlikler için aracınız var mı?", "Evet; gelin ve damat için Mercedes V-Class'tan misafirler için minibüslere kadar, gerekirse aynı anda birden fazla araç."],
        ["Şirketler ve acentelerle çalışıyor musunuz?", "Evet. Şirketler aylık faturalı kurumsal hesap açabilir, seyahat acenteleri ve oteller misafirleri için bizimle rezervasyon yapabilir."]
      ]]
    ]
  },
  ru: {
    path: "/ru/voprosy", nav: "Вопросы и ответы",
    title: "Вопросы и ответы: трансфер из аэропорта Стамбула · {brand}",
    desc: "Все вопросы о трансфере в Стамбуле с {brand}: бронирование, цены и оплата, встреча в аэропорту, автомобили и багаж, изменение и отмена.",
    h1: "Частые вопросы",
    lead: "Всё о вашем трансфере в Стамбуле с {brand}: цены и оплата, встреча в аэропорту, автомобили и багаж, изменение и отмена. Не нашли ответ? Напишите нам в WhatsApp.",
    search: "Поиск по вопросам: багаж, отмена, детское кресло…", noHits: "Ничего не найдено. Напишите нам в WhatsApp, и мы ответим.",
    related: "Подробнее", contactH: "Остались вопросы?", contactP: "Наш офис отвечает в WhatsApp, по телефону и по e-mail.",
    ctaH: "Готовы заказать?", ctaP: "Узнайте фиксированную цену и отправьте заявку за минуту.",
    more: "Все вопросы и ответы",
    cats: [
      ["Бронирование", [
        ["Как заказать трансфер?", "Выберите, откуда и куда вы едете, дату, время и число пассажиров, затем автомобиль. Укажите имя, мобильный телефон, e-mail и номер рейса и отправьте заявку. Это занимает около минуты, а фиксированную цену вы видите до отправки."],
        ["Нужна ли регистрация или предоплата?", "Нет. Нет регистрации, онлайн-оплаты и предоплаты. Вы платите водителю в конце поездки."],
        ["Когда мой заказ подтверждён?", "Сразу после отправки формы вы получите письмо «заявка получена» с номером заказа. Заказ подтверждён, когда мы отправим письмо с подтверждением, обычно в течение часа."],
        ["За сколько времени нужно бронировать?", "Как можно раньше, лучше минимум за 24 часа до подачи, чтобы нужный автомобиль был свободен. Если поездка нужна в ближайшие часы, напишите нам в WhatsApp, и мы проверим наличие."],
        ["Можно ли заказать трансфер для другого человека?", "Да. Укажите имя и мобильный телефон пассажира, чтобы водитель мог с ним связаться, и свой e-mail для подтверждения. При желании добавьте комментарий для водителя."],
        ["Можно ли заказать через WhatsApp или по телефону?", "Да, пишите или звоните: {phone}. Быстрее всего онлайн-форма: вы сразу видите цену и получаете номер заказа по e-mail."]
      ]],
      ["Цены и оплата", [
        ["Цена за человека или за автомобиль?", "За автомобиль. Цена одна и та же, едете ли вы один или столько человек, сколько вмещает машина: седан 3, минивэн 6, Mercedes V-Class 6, микроавтобус 13."],
        ["Что входит в цену?", "Платные дороги, мосты, парковка, встреча с табличкой, помощь с багажом и ожидание: первые {wait} минут после посадки в аэропортах. Счётчика нет, в конце доплачивать ничего не нужно."],
        ["Как оплатить?", "Наличными водителю в конце поездки: евро, доллары США или турецкие лиры по курсу дня. Компании, которым нужен ежемесячный счёт, могут открыть корпоративный аккаунт."],
        ["Сколько стоит трансфер?", "Цены начинаются от €{min} за автомобиль в одну сторону. Цена зависит от маршрута и автомобиля; все маршруты есть в нашем прайс-листе."],
        ["Бывают ли часы дороже?", "Да, самые загруженные часы в аэропортах: подача в аэропорту Стамбула с {istFrom} до {istTo} и в Сабихе Гёкчен с {sawFrom} до {sawTo} стоит на {pct}% дороже. Форма заказа учитывает это, поэтому цена, которую вы видите, и есть итоговая."],
        ["Обратный трансфер дешевле?", "Да. Добавьте обратную поездку в форме поиска и получите скидку {ret}% на неё."],
        ["Нужно ли давать чаевые?", "Нет, чаевые не входят в цену. Если вам понравился водитель, небольшие чаевые приятны, но никогда не обязательны."]
      ]],
      ["Встреча в аэропорту", [
        ["Где меня ждёт водитель в аэропорту Стамбула (IST)?", "{meetIST}"],
        ["Где меня ждёт водитель в Сабихе Гёкчен (SAW)?", "{meetSAW}"],
        ["Что, если рейс задержится или прилетит раньше?", "Мы отслеживаем ваш рейс по номеру, который вы указали, и переносим подачу на фактическое время посадки. Первые {wait} минут после посадки бесплатны, этого хватает на паспортный контроль и багаж."],
        ["Что делать, если я не нашёл водителя?", "Позвоните или напишите нам в WhatsApp: {phone}; в обоих аэропортах есть бесплатный Wi-Fi. Место встречи и наш номер есть и в письме с подтверждением. Пожалуйста, не уезжайте с другим водителем."],
        ["Когда заказывать подачу на обратный рейс?", "На международный рейс планируйте быть в аэропорту примерно за 3 часа до вылета и прибавьте время в пути. У отеля или по адресу водитель ждёт 15 минут после заказанного времени."],
        ["Есть ли трансфер между аэропортом Стамбула и Сабихой Гёкчен?", "Да, по фиксированной цене за автомобиль. Дорога через весь город часто занимает больше часа, поэтому оставляйте достаточно времени между рейсами."]
      ]],
      ["Автомобили и багаж", [
        ["Какой автомобиль выбрать?", "Для 1–3 человек седан, для 4–6 человек минивэн, до 6 человек с повышенным комфортом Mercedes V-Class, для 7–13 человек микроавтобус. Большим группам лучше заказать несколько автомобилей."],
        ["Сколько багажа помещается?", "Стандартных чемоданов на машину: седан 3, минивэн 7, Mercedes V-Class 6, микроавтобус 16, плюс ручная кладь. Укажите число чемоданов в форме заказа."],
        ["У меня коляска, сумка для гольфа, лыжи или инвалидное кресло. Это проблема?", "Нет, просто напишите об этом в комментарии. Громоздкие вещи занимают место, поэтому при полной машине выберите автомобиль побольше, и мы пришлём тот, в который всё поместится."],
        ["Есть ли детские кресла?", "Да, детское кресло или автолюлька стоит €{seat} за штуку. Для детей оно обязательно: добавьте его в форме заказа и укажите возраст детей в комментарии."],
        ["Приедет ли именно автомобиль с фото?", "Приедет автомобиль заказанного класса. Модели на фото приведены как пример; марка и цвет могут отличаться."]
      ]],
      ["Изменение и отмена", [
        ["Можно ли отменить бесплатно?", "Да, не позднее чем за 24 часа до подачи. Ответьте на письмо с подтверждением или напишите нам в WhatsApp."],
        ["Что, если я отменю позже или не приду?", "Сообщите нам в WhatsApp как можно скорее. Если вы не придёте, не предупредив нас, мы можем попросить оплатить поездку."],
        ["Как изменить время, адрес или рейс?", "Ответьте на письмо с подтверждением или напишите нам в WhatsApp с номером заказа. Изменения бесплатны не позднее чем за 24 часа до подачи; позже мы сделаем всё возможное."],
        ["Мой рейс отменили. Что делать?", "Пришлите новый рейс в WhatsApp, и мы перенесём трансфер на него. Если поездка больше не нужна, мы её отменим."]
      ]],
      ["Водители и поездка", [
        ["{brand} — лицензированная компания?", "Да. {brand} работает при лицензированном турецком туристическом агентстве (лицензия TÜRSAB {tursab}). Вы едете в частном автомобиле с профессиональным водителем, а не в уличном такси."],
        ["Говорит ли водитель по-английски или по-русски?", "Вам не нужно ничего объяснять: имя, адрес и рейс водитель знает из заказа. Если в пути понадобится помощь, наш офис ответит в WhatsApp."],
        ["Можно ли остановиться по пути?", "Укажите это при заказе, например чтобы забрать друга по маршруту. Для долгих остановок или нескольких адресов лучше подходит почасовая аренда автомобиля с водителем."],
        ["Вы работаете ночью?", "Да, 24 часа в сутки, 7 дней в неделю, в том числе к ранним утренним и поздним ночным рейсам, по той же фиксированной цене."],
        ["Вы ездите за пределы Стамбула?", "Нет. Мы работаем только в Стамбуле: оба аэропорта, круизный порт Galataport и районы на обоих берегах Босфора."]
      ]],
      ["Не только трансферы из аэропорта", [
        ["Встречаете ли вы в круизном порту Galataport?", "Да. Мы встречаем пассажиров круизных лайнеров в Galataport и везём их в оба аэропорта, отели и районы по фиксированной цене."],
        ["Можно ли арендовать автомобиль с водителем на несколько часов или для экскурсии?", "Да, на несколько часов или на целый день, либо для поездки по городу с остановками на обоих берегах Босфора. Напишите нам свой план, и мы назовём фиксированную цену."],
        ["Есть ли автомобили для свадеб и мероприятий?", "Да, от Mercedes V-Class для молодожёнов до микроавтобусов для гостей, при необходимости несколько машин одновременно."],
        ["Вы работаете с компаниями и агентствами?", "Да. Компании могут открыть корпоративный аккаунт с ежемесячным счётом, а турагентства и отели могут бронировать у нас трансферы для своих гостей."]
      ]]
    ]
  },
  de: {
    path: "/de/haeufige-fragen", nav: "Häufige Fragen",
    title: "Häufige Fragen zum Istanbul Flughafentransfer · {brand}",
    desc: "Alle Fragen zu Ihrem Istanbul-Transfer mit {brand}: Buchung, Preise und Bezahlung, Abholung am Flughafen, Fahrzeuge und Gepäck, Änderung und Stornierung.",
    h1: "Häufige Fragen",
    lead: "Alles zu Ihrem Istanbul-Transfer mit {brand}: Preise und Bezahlung, Abholung am Flughafen, Fahrzeuge und Gepäck, Änderung und Stornierung. Keine Antwort gefunden? Schreiben Sie uns auf WhatsApp.",
    search: "Fragen durchsuchen: Gepäck, Storno, Kindersitz…", noHits: "Keine passende Frage. Schreiben Sie uns auf WhatsApp, wir antworten Ihnen.",
    related: "Mehr dazu", contactH: "Noch eine Frage?", contactP: "Unser Büro antwortet auf WhatsApp, telefonisch und per E-Mail.",
    ctaH: "Bereit zum Buchen?", ctaP: "Sehen Sie Ihren Festpreis und senden Sie Ihre Anfrage in einer Minute.",
    more: "Alle Fragen ansehen",
    cats: [
      ["Buchung", [
        ["Wie buche ich einen Transfer?", "Wählen Sie Start und Ziel, Datum, Uhrzeit und Anzahl der Fahrgäste und dann Ihr Fahrzeug. Geben Sie Name, Handynummer, E-Mail und Flugnummer ein und senden Sie die Anfrage. Das dauert etwa eine Minute, und den Festpreis sehen Sie vor dem Absenden."],
        ["Brauche ich ein Konto oder eine Anzahlung?", "Nein. Es gibt kein Konto, keine Online-Zahlung und keine Anzahlung. Sie bezahlen den Fahrer am Ende der Fahrt."],
        ["Wann ist meine Buchung bestätigt?", "Direkt nach dem Absenden erhalten Sie eine E-Mail „Anfrage erhalten“ mit Ihrer Buchungsnummer. Bestätigt ist die Buchung mit unserer Bestätigungs-E-Mail, meist innerhalb einer Stunde."],
        ["Wie früh sollte ich buchen?", "So früh wie möglich, am besten mindestens 24 Stunden vor der Abholung, damit Ihr Wunschfahrzeug frei ist. Für eine Fahrt in den nächsten Stunden schreiben Sie uns auf WhatsApp, wir prüfen die Verfügbarkeit."],
        ["Kann ich für jemand anderen buchen?", "Ja. Geben Sie Name und Handynummer des Fahrgasts an, damit der Fahrer ihn erreicht, und Ihre eigene E-Mail für die Bestätigung. Auf Wunsch mit einer Notiz für den Fahrer."],
        ["Kann ich per WhatsApp oder Telefon buchen?", "Ja, schreiben Sie oder rufen Sie an: {phone}. Am schnellsten geht es über das Online-Formular: Sie sehen sofort den Preis und erhalten Ihre Buchungsnummer per E-Mail."]
      ]],
      ["Preise und Bezahlung", [
        ["Gilt der Preis pro Person oder pro Fahrzeug?", "Pro Fahrzeug. Der Preis bleibt gleich, ob Sie allein reisen oder so viele sind, wie das Fahrzeug fasst: Limousine 3, Minivan 6, Mercedes V-Klasse 6, Kleinbus 13."],
        ["Was ist im Preis enthalten?", "Maut, Brücken, Parken, Empfang mit Namensschild, Hilfe mit dem Gepäck und Wartezeit: an den Flughäfen die ersten {wait} Minuten nach der Landung. Kein Taxameter, am Ende nichts extra zu zahlen."],
        ["Wie bezahle ich?", "Bar beim Fahrer am Ende der Fahrt, in Euro, US-Dollar oder türkischer Lira zum Tageskurs. Firmen mit monatlicher Rechnung können ein Firmenkonto eröffnen."],
        ["Was kostet ein Transfer?", "Die Preise beginnen bei €{min} pro Fahrzeug und Strecke. Der Preis hängt von Strecke und Fahrzeug ab; unsere Preisliste zeigt alle Strecken."],
        ["Sind manche Uhrzeiten teurer?", "Ja, die Stoßzeiten an den Flughäfen: Abholungen am Flughafen Istanbul zwischen {istFrom} und {istTo} und am Sabiha Gökçen zwischen {sawFrom} und {sawTo} kosten {pct} % mehr. Das Buchungsformular rechnet es ein, der angezeigte Preis ist der Endpreis."],
        ["Ist ein Rücktransfer günstiger?", "Ja. Fügen Sie die Rückfahrt im Suchfeld hinzu und Sie erhalten {ret} % Rabatt darauf."],
        ["Wird Trinkgeld erwartet?", "Nein, Trinkgeld ist nicht Teil des Preises. Wenn Sie mit Ihrem Fahrer zufrieden waren, freut er sich über ein kleines Trinkgeld, Pflicht ist es nie."]
      ]],
      ["Abholung am Flughafen", [
        ["Wo wartet mein Fahrer am Flughafen Istanbul (IST)?", "{meetIST}"],
        ["Wo wartet mein Fahrer am Sabiha Gökçen (SAW)?", "{meetSAW}"],
        ["Was, wenn mein Flug verspätet oder früher ist?", "Wir verfolgen Ihren Flug anhand der Flugnummer und verschieben die Abholung auf die tatsächliche Landezeit. Die ersten {wait} Minuten nach der Landung sind kostenlos, genug für Passkontrolle und Gepäck."],
        ["Was, wenn ich meinen Fahrer nicht finde?", "Rufen Sie uns an oder schreiben Sie auf WhatsApp: {phone}; beide Flughäfen haben kostenloses WLAN. Treffpunkt und unsere Nummer stehen auch in Ihrer Bestätigungs-E-Mail. Bitte fahren Sie nicht mit einem anderen Fahrer."],
        ["Wann sollte ich für den Rückflug abgeholt werden?", "Für einen internationalen Flug planen Sie etwa 3 Stunden vor Abflug am Flughafen zu sein, plus die Fahrzeit. Am Hotel oder an Ihrer Adresse wartet der Fahrer 15 Minuten nach der gebuchten Zeit."],
        ["Fahren Sie zwischen dem Flughafen Istanbul und Sabiha Gökçen?", "Ja, zum Festpreis pro Fahrzeug. Die Fahrt quer durch die Stadt dauert oft über eine Stunde, planen Sie also genug Zeit zwischen Ihren Flügen ein."]
      ]],
      ["Fahrzeuge und Gepäck", [
        ["Welches Fahrzeug passt zu mir?", "Für 1–3 Personen die Limousine, für 4–6 Personen der Minivan, für bis zu 6 Personen mit mehr Komfort die Mercedes V-Klasse und für 7–13 Personen der Kleinbus. Größere Gruppen buchen mehrere Fahrzeuge."],
        ["Wie viel Gepäck passt hinein?", "Standardkoffer pro Fahrzeug: Limousine 3, Minivan 7, Mercedes V-Klasse 6, Kleinbus 16, dazu Handgepäck. Geben Sie die Zahl der Koffer im Buchungsformular an."],
        ["Ich habe Kinderwagen, Golftasche, Skier oder einen Rollstuhl. Ist das ein Problem?", "Nein, schreiben Sie es einfach in die Notiz. Sperriges Gepäck braucht Platz; bei vollem Fahrzeug wählen Sie die nächste Größe, und wir schicken ein Fahrzeug, in das alles passt."],
        ["Haben Sie Kindersitze?", "Ja, Baby- und Kindersitze kosten €{seat} pro Stück. Kinder brauchen einen; fügen Sie ihn im Buchungsformular hinzu und notieren Sie das Alter der Kinder."],
        ["Bekomme ich genau das Fahrzeug vom Foto?", "Sie bekommen die gebuchte Fahrzeugklasse. Die gezeigten Modelle sind Beispiele; Marke und Farbe können abweichen."]
      ]],
      ["Änderung und Stornierung", [
        ["Kann ich kostenlos stornieren?", "Ja, bis 24 Stunden vor der Abholung. Antworten Sie auf Ihre Bestätigungs-E-Mail oder schreiben Sie uns auf WhatsApp."],
        ["Was, wenn ich später storniere oder nicht erscheine?", "Sagen Sie uns so früh wie möglich auf WhatsApp Bescheid. Wenn Sie ohne Nachricht nicht erscheinen, können wir den Fahrpreis verlangen."],
        ["Wie ändere ich Uhrzeit, Adresse oder Flug?", "Antworten Sie auf Ihre Bestätigungs-E-Mail oder schreiben Sie uns mit Ihrer Buchungsnummer auf WhatsApp. Änderungen sind bis 24 Stunden vor der Abholung kostenlos; danach tun wir unser Bestes."],
        ["Mein Flug wurde gestrichen. Was nun?", "Schicken Sie uns Ihren neuen Flug auf WhatsApp, und wir verlegen Ihren Transfer darauf. Brauchen Sie die Fahrt nicht mehr, stornieren wir sie."]
      ]],
      ["Fahrer und Fahrt", [
        ["Ist {brand} ein lizenziertes Unternehmen?", "Ja. {brand} wird von einem lizenzierten türkischen Reisebüro betrieben (TÜRSAB-Lizenz {tursab}). Sie fahren in einem privaten Wagen mit professionellem Fahrer, nicht in einem Straßentaxi."],
        ["Spricht der Fahrer Englisch oder Deutsch?", "Sie müssen nichts erklären: Name, Adresse und Flug kennt der Fahrer aus der Buchung. Brauchen Sie unterwegs Hilfe, antwortet unser Büro auf WhatsApp."],
        ["Können wir unterwegs anhalten?", "Sagen Sie es uns bei der Buchung, etwa um unterwegs einen Freund abzuholen. Für längere Stopps oder mehrere Adressen passt unser Chauffeurservice auf Stundenbasis besser."],
        ["Fahren Sie auch nachts?", "Ja, rund um die Uhr an 7 Tagen die Woche, auch zu sehr frühen und späten Flügen, zum gleichen Festpreis."],
        ["Fahren Sie auch außerhalb Istanbuls?", "Nein. Wir fahren nur in Istanbul: beide Flughäfen, der Kreuzfahrthafen Galataport und die Stadtteile auf beiden Seiten des Bosporus."]
      ]],
      ["Mehr als Flughafentransfers", [
        ["Holen Sie am Kreuzfahrthafen Galataport ab?", "Ja. Wir empfangen Kreuzfahrtgäste am Galataport und bringen sie zum Festpreis zu beiden Flughäfen, zu Hotels und in die Stadtteile."],
        ["Kann ich ein Auto mit Fahrer stundenweise oder für eine Stadtrundfahrt mieten?", "Ja, für einige Stunden oder einen ganzen Tag oder für eine Stadtrundfahrt mit Stopps auf beiden Seiten des Bosporus. Schreiben Sie uns Ihren Plan, und wir nennen Ihnen einen Festpreis."],
        ["Haben Sie Fahrzeuge für Hochzeiten und Veranstaltungen?", "Ja, von der Mercedes V-Klasse für das Brautpaar bis zu Kleinbussen für die Gäste, bei Bedarf mehrere Fahrzeuge gleichzeitig."],
        ["Arbeiten Sie mit Firmen und Agenturen?", "Ja. Firmen können ein Firmenkonto mit monatlicher Rechnung eröffnen, Reisebüros und Hotels können bei uns für ihre Gäste buchen."]
      ]]
    ]
  },
  fr: {
    path: "/fr/questions-frequentes", nav: "Questions fréquentes",
    title: "Questions fréquentes : transfert aéroport d'Istanbul · {brand}",
    desc: "Vos questions sur le transfert à Istanbul avec {brand} : réservation, prix et paiement, accueil à l'aéroport, véhicules, bagages et annulation.",
    h1: "Questions fréquentes",
    lead: "Tout sur votre transfert à Istanbul avec {brand} : prix et paiement, accueil à l'aéroport, véhicules et bagages, modification et annulation. Vous ne trouvez pas votre réponse ? Écrivez-nous sur WhatsApp.",
    search: "Rechercher : bagages, annulation, siège enfant…", noHits: "Aucune question ne correspond. Écrivez-nous sur WhatsApp, nous vous répondrons.",
    related: "En savoir plus", contactH: "Encore une question ?", contactP: "Notre bureau répond sur WhatsApp, par téléphone et par e-mail.",
    ctaH: "Prêt à réserver ?", ctaP: "Voyez votre prix fixe et envoyez votre demande en une minute.",
    more: "Voir toutes les questions",
    cats: [
      ["Réservation", [
        ["Comment réserver un transfert ?", "Choisissez votre départ et votre destination, la date, l'heure et le nombre de passagers, puis votre véhicule. Indiquez votre nom, votre portable, votre e-mail et votre numéro de vol, et envoyez la demande. Cela prend environ une minute et vous voyez le prix fixe avant l'envoi."],
        ["Faut-il un compte ou un acompte ?", "Non. Pas de compte, pas de paiement en ligne, pas d'acompte. Vous payez le chauffeur à la fin du trajet."],
        ["Quand ma réservation est-elle confirmée ?", "Juste après l'envoi du formulaire, vous recevez un e-mail « demande reçue » avec votre numéro de réservation. La réservation est confirmée par notre e-mail de confirmation, en général dans l'heure."],
        ["Combien de temps à l'avance réserver ?", "Le plus tôt possible, idéalement au moins 24 heures avant la prise en charge, pour que le véhicule souhaité soit libre. Pour un trajet dans les prochaines heures, écrivez-nous sur WhatsApp et nous vérifions la disponibilité."],
        ["Puis-je réserver pour quelqu'un d'autre ?", "Oui. Indiquez le nom et le portable du passager pour que le chauffeur puisse le joindre, et votre propre e-mail pour la confirmation. Ajoutez une note pour le chauffeur si vous le souhaitez."],
        ["Puis-je réserver sur WhatsApp ou par téléphone ?", "Oui, écrivez ou appelez le {phone}. Le formulaire en ligne est le plus rapide : vous voyez le prix tout de suite et recevez votre numéro de réservation par e-mail."]
      ]],
      ["Prix et paiement", [
        ["Le prix est-il par personne ou par véhicule ?", "Par véhicule. Le prix reste le même, que vous soyez seul ou aussi nombreux que le véhicule le permet : berline 3, minivan 6, Mercedes Classe V 6, minibus 13."],
        ["Qu'est-ce qui est inclus dans le prix ?", "Péages, ponts, parking, accueil avec pancarte, aide pour les bagages et temps d'attente : les {wait} premières minutes après l'atterrissage aux aéroports. Pas de compteur, rien à payer en plus à la fin."],
        ["Comment payer ?", "En espèces au chauffeur à la fin du trajet, en euros, dollars américains ou livres turques au cours du jour. Les entreprises qui souhaitent une facture mensuelle peuvent ouvrir un compte entreprise."],
        ["Combien coûte un transfert ?", "Les prix commencent à {min} € par véhicule, aller simple. Le prix dépend du trajet et du véhicule ; notre liste de prix montre tous les trajets."],
        ["Certaines heures sont-elles plus chères ?", "Oui, les heures de pointe des aéroports : les prises en charge à l'aéroport d'Istanbul entre {istFrom} et {istTo} et à Sabiha Gökçen entre {sawFrom} et {sawTo} coûtent {pct} % de plus. Le formulaire l'ajoute, le prix affiché est donc le prix payé."],
        ["Le transfert retour est-il moins cher ?", "Oui. Ajoutez le retour dans le formulaire de recherche et bénéficiez de {ret} % de réduction sur le retour."],
        ["Faut-il laisser un pourboire ?", "Non, le pourboire ne fait pas partie du prix. Si vous êtes content de votre chauffeur, un petit pourboire fait plaisir, mais il n'est jamais obligatoire."]
      ]],
      ["Accueil à l'aéroport", [
        ["Où mon chauffeur m'attend-il à l'aéroport d'Istanbul (IST) ?", "{meetIST}"],
        ["Où mon chauffeur m'attend-il à Sabiha Gökçen (SAW) ?", "{meetSAW}"],
        ["Et si mon vol a du retard ou de l'avance ?", "Nous suivons votre vol grâce au numéro que vous nous donnez et décalons la prise en charge à l'heure réelle d'atterrissage. Les {wait} premières minutes après l'atterrissage sont gratuites, de quoi passer le contrôle des passeports et récupérer les bagages."],
        ["Et si je ne trouve pas mon chauffeur ?", "Appelez-nous ou écrivez-nous sur WhatsApp au {phone} ; les deux aéroports ont un Wi-Fi gratuit. Le point de rendez-vous et notre numéro figurent aussi dans votre e-mail de confirmation. Ne partez pas avec un autre chauffeur."],
        ["Quand me faire prendre pour mon vol retour ?", "Pour un vol international, prévoyez d'être à l'aéroport environ 3 heures avant le départ, plus le temps de trajet. À votre hôtel ou adresse, le chauffeur attend 15 minutes après l'heure réservée."],
        ["Faites-vous le trajet entre l'aéroport d'Istanbul et Sabiha Gökçen ?", "Oui, à prix fixe par véhicule. La traversée de la ville prend souvent plus d'une heure : prévoyez assez de temps entre vos vols."]
      ]],
      ["Véhicules et bagages", [
        ["Quel véhicule choisir ?", "Pour 1 à 3 personnes une berline, pour 4 à 6 personnes un minivan, jusqu'à 6 personnes avec plus de confort la Mercedes Classe V, et pour 7 à 13 personnes un minibus. Les groupes plus grands réservent plusieurs véhicules."],
        ["Combien de bagages tiennent dans chaque véhicule ?", "Valises standard par véhicule : berline 3, minivan 7, Mercedes Classe V 6, minibus 16, plus les bagages à main. Indiquez le nombre de valises dans le formulaire."],
        ["J'ai une poussette, un sac de golf, des skis ou un fauteuil roulant. Est-ce un problème ?", "Non, indiquez-le simplement dans la note. Les objets encombrants prennent de la place : avec un véhicule plein, choisissez la taille au-dessus et nous envoyons un véhicule où tout rentre."],
        ["Avez-vous des sièges enfant ?", "Oui, les sièges bébé et enfant coûtent {seat} € pièce. Ils sont nécessaires pour les enfants : ajoutez-les dans le formulaire et indiquez l'âge des enfants dans la note."],
        ["Aurai-je exactement le véhicule de la photo ?", "Vous aurez la catégorie de véhicule réservée. Les modèles montrés sont des exemples ; la marque et la couleur peuvent varier."]
      ]],
      ["Modification et annulation", [
        ["Puis-je annuler gratuitement ?", "Oui, jusqu'à 24 heures avant la prise en charge. Répondez à votre e-mail de confirmation ou écrivez-nous sur WhatsApp."],
        ["Et si j'annule plus tard ou ne me présente pas ?", "Prévenez-nous le plus tôt possible sur WhatsApp. Si vous ne vous présentez pas sans nous prévenir, nous pouvons demander le prix du trajet."],
        ["Comment changer l'heure, l'adresse ou le vol ?", "Répondez à votre e-mail de confirmation ou écrivez-nous sur WhatsApp avec votre numéro de réservation. Les modifications sont gratuites jusqu'à 24 heures avant la prise en charge ; ensuite nous faisons de notre mieux."],
        ["Mon vol a été annulé. Que faire ?", "Envoyez-nous votre nouveau vol sur WhatsApp et nous y déplaçons votre transfert. Si vous n'avez plus besoin du trajet, nous l'annulons."]
      ]],
      ["Chauffeurs et trajet", [
        ["{brand} est-elle une société agréée ?", "Oui. {brand} est exploitée par une agence de voyages turque agréée (licence TÜRSAB {tursab}). Vous voyagez dans une voiture privée avec un chauffeur professionnel, pas dans un taxi de rue."],
        ["Le chauffeur parle-t-il anglais ou français ?", "Vous n'avez rien à expliquer : le chauffeur connaît votre nom, votre adresse et votre vol grâce à la réservation. Si vous avez besoin d'aide en route, notre bureau répond sur WhatsApp."],
        ["Pouvons-nous faire un arrêt en route ?", "Dites-le-nous à la réservation, par exemple pour prendre un ami sur le trajet. Pour des arrêts plus longs ou plusieurs adresses, notre service de chauffeur à l'heure convient mieux."],
        ["Roulez-vous la nuit ?", "Oui, 24 heures sur 24, 7 jours sur 7, y compris pour les vols très tôt le matin ou tard le soir, au même prix fixe."],
        ["Allez-vous en dehors d'Istanbul ?", "Non. Nous servons uniquement Istanbul : les deux aéroports, le port de croisière Galataport et les quartiers des deux rives du Bosphore."]
      ]],
      ["Au-delà des transferts aéroport", [
        ["Venez-vous chercher au port de croisière Galataport ?", "Oui. Nous accueillons les croisiéristes à Galataport et les conduisons aux deux aéroports, aux hôtels et dans les quartiers à prix fixe."],
        ["Puis-je louer une voiture avec chauffeur à l'heure ou pour une visite de la ville ?", "Oui, pour quelques heures ou une journée, ou pour une visite avec des arrêts sur les deux rives du Bosphore. Envoyez-nous votre programme et nous vous donnons un prix fixe."],
        ["Avez-vous des véhicules pour les mariages et événements ?", "Oui, de la Mercedes Classe V pour les mariés aux minibus pour les invités, et plusieurs véhicules en même temps si besoin."],
        ["Travaillez-vous avec les entreprises et les agences ?", "Oui. Les entreprises peuvent ouvrir un compte entreprise avec facture mensuelle, et les agences de voyages et hôtels peuvent réserver chez nous pour leurs clients."]
      ]]
    ]
  },
  it: {
    path: "/it/domande-frequenti", nav: "Domande frequenti",
    title: "Domande frequenti: transfer aeroporto Istanbul · {brand}",
    desc: "Le domande sul transfer a Istanbul con {brand}: prenotazione, prezzi e pagamento, accoglienza in aeroporto, veicoli, bagagli e cancellazione.",
    h1: "Domande frequenti",
    lead: "Tutto sul tuo transfer a Istanbul con {brand}: prezzi e pagamento, accoglienza in aeroporto, veicoli e bagagli, modifiche e cancellazione. Non trovi la risposta? Scrivici su WhatsApp.",
    search: "Cerca nelle domande: bagagli, cancellazione, seggiolino…", noHits: "Nessuna domanda corrisponde. Scrivici su WhatsApp e ti risponderemo.",
    related: "Approfondisci", contactH: "Hai ancora una domanda?", contactP: "Il nostro ufficio risponde su WhatsApp, al telefono e via e-mail.",
    ctaH: "Pronto a prenotare?", ctaP: "Scopri il tuo prezzo fisso e invia la richiesta in un minuto.",
    more: "Vedi tutte le domande",
    cats: [
      ["Prenotazione", [
        ["Come prenoto un transfer?", "Scegli partenza e destinazione, data, ora e numero di passeggeri, poi il veicolo. Inserisci nome, cellulare, e-mail e numero di volo e invia la richiesta. Ci vuole circa un minuto e vedi il prezzo fisso prima di inviare."],
        ["Serve un account o un anticipo?", "No. Niente account, niente pagamento online e niente anticipo. Paghi l'autista alla fine della corsa."],
        ["Quando è confermata la mia prenotazione?", "Subito dopo l'invio ricevi un'e-mail di \"richiesta ricevuta\" con il numero di prenotazione. La prenotazione è confermata quando ti inviamo l'e-mail di conferma, di solito entro un'ora."],
        ["Con quanto anticipo devo prenotare?", "Il prima possibile, idealmente almeno 24 ore prima del prelievo, così il veicolo che vuoi è libero. Per una corsa nelle prossime ore scrivici su WhatsApp e verifichiamo la disponibilità."],
        ["Posso prenotare per un'altra persona?", "Sì. Inserisci nome e cellulare del passeggero, così l'autista può contattarlo, e la tua e-mail per la conferma. Se vuoi, aggiungi una nota per l'autista."],
        ["Posso prenotare su WhatsApp o per telefono?", "Sì, scrivi o chiama il {phone}. Il modulo online è il modo più rapido: vedi subito il prezzo e ricevi il numero di prenotazione via e-mail."]
      ]],
      ["Prezzi e pagamento", [
        ["Il prezzo è a persona o a veicolo?", "A veicolo. Il prezzo resta lo stesso che tu sia da solo o in tanti quanti il veicolo può portare: berlina 3, minivan 6, Mercedes Classe V 6, minibus 13."],
        ["Cosa è incluso nel prezzo?", "Pedaggi, ponti, parcheggio, accoglienza con cartello, aiuto con i bagagli e attesa: i primi {wait} minuti dopo l'atterraggio negli aeroporti. Niente tassametro, niente da pagare in più alla fine."],
        ["Come pago?", "In contanti all'autista alla fine della corsa, in euro, dollari USA o lire turche al cambio del giorno. Le aziende che vogliono la fattura mensile possono aprire un account aziendale."],
        ["Quanto costa un transfer?", "I prezzi partono da €{min} a veicolo, sola andata. Il prezzo dipende da percorso e veicolo; il nostro listino mostra tutti i percorsi."],
        ["Alcuni orari costano di più?", "Sì, le ore di punta degli aeroporti: i prelievi all'aeroporto di Istanbul tra le {istFrom} e le {istTo} e al Sabiha Gökçen tra le {sawFrom} e le {sawTo} costano il {pct}% in più. Il modulo lo aggiunge, quindi il prezzo che vedi è quello che paghi."],
        ["Il transfer di ritorno costa meno?", "Sì. Aggiungi il ritorno nella ricerca e ottieni il {ret}% di sconto sul ritorno."],
        ["Bisogna lasciare la mancia?", "No, la mancia non fa parte del prezzo. Se sei contento dell'autista una piccola mancia è gradita, ma non è mai obbligatoria."]
      ]],
      ["Accoglienza in aeroporto", [
        ["Dove mi aspetta l'autista all'aeroporto di Istanbul (IST)?", "{meetIST}"],
        ["Dove mi aspetta l'autista al Sabiha Gökçen (SAW)?", "{meetSAW}"],
        ["E se il mio volo è in ritardo o in anticipo?", "Seguiamo il tuo volo con il numero che ci dai e spostiamo il prelievo all'orario reale di atterraggio. I primi {wait} minuti dopo l'atterraggio sono gratuiti, abbastanza per il controllo passaporti e i bagagli."],
        ["E se non trovo l'autista?", "Chiamaci o scrivici su WhatsApp al {phone}; entrambi gli aeroporti hanno Wi-Fi gratuito. Il punto d'incontro e il nostro numero sono anche nell'e-mail di conferma. Per favore non partire con un altro autista."],
        ["Quando farmi prendere per il volo di ritorno?", "Per un volo internazionale calcola di essere in aeroporto circa 3 ore prima della partenza, più il tempo di viaggio. All'hotel o al tuo indirizzo l'autista aspetta 15 minuti dopo l'orario prenotato."],
        ["Fate il tragitto tra l'aeroporto di Istanbul e il Sabiha Gökçen?", "Sì, a prezzo fisso a veicolo. Attraversare la città richiede spesso più di un'ora, quindi lascia abbastanza tempo tra i voli."]
      ]],
      ["Veicoli e bagagli", [
        ["Quale veicolo scegliere?", "Per 1–3 persone la berlina, per 4–6 persone il minivan, fino a 6 persone con più comfort la Mercedes Classe V e per 7–13 persone il minibus. I gruppi più grandi prenotano più veicoli."],
        ["Quanti bagagli entrano in ogni veicolo?", "Valigie standard per veicolo: berlina 3, minivan 7, Mercedes Classe V 6, minibus 16, più il bagaglio a mano. Indica il numero di valigie nel modulo."],
        ["Ho un passeggino, una sacca da golf, gli sci o una sedia a rotelle. È un problema?", "No, scrivilo nella nota. Gli oggetti ingombranti occupano spazio: con il veicolo pieno scegli la misura superiore e mandiamo un veicolo in cui entra tutto."],
        ["Avete seggiolini per bambini?", "Sì, i seggiolini per neonati e bambini costano €{seat} l'uno. Per i bambini servono: aggiungili nel modulo e indica l'età dei bambini nella nota."],
        ["Avrò esattamente il veicolo della foto?", "Avrai la categoria di veicolo prenotata. I modelli mostrati sono esempi; marca e colore possono variare."]
      ]],
      ["Modifiche e cancellazione", [
        ["Posso cancellare gratis?", "Sì, fino a 24 ore prima del prelievo. Rispondi all'e-mail di conferma o scrivici su WhatsApp."],
        ["E se cancello più tardi o non mi presento?", "Avvisaci il prima possibile su WhatsApp. Se non ti presenti senza avvisarci, possiamo chiedere il prezzo della corsa."],
        ["Come cambio orario, indirizzo o volo?", "Rispondi all'e-mail di conferma o scrivici su WhatsApp con il numero di prenotazione. Le modifiche sono gratuite fino a 24 ore prima del prelievo; dopo facciamo del nostro meglio."],
        ["Il mio volo è stato cancellato. Cosa faccio?", "Mandaci il nuovo volo su WhatsApp e spostiamo il transfer. Se la corsa non ti serve più, la cancelliamo."]
      ]],
      ["Autisti e viaggio", [
        ["{brand} è un'azienda autorizzata?", "Sì. {brand} è gestita da un'agenzia di viaggi turca autorizzata (licenza TÜRSAB {tursab}). Viaggi in un'auto privata con autista professionista, non in un taxi di strada."],
        ["L'autista parla inglese o italiano?", "Non devi spiegare nulla: l'autista conosce nome, indirizzo e volo dalla prenotazione. Se ti serve aiuto durante il viaggio, il nostro ufficio risponde su WhatsApp."],
        ["Possiamo fermarci lungo il tragitto?", "Diccelo quando prenoti, ad esempio per prendere un amico lungo il percorso. Per soste più lunghe o più indirizzi è più adatto il nostro servizio di autista a ore."],
        ["Lavorate anche di notte?", "Sì, 24 ore su 24, 7 giorni su 7, anche per i voli all'alba e a tarda notte, allo stesso prezzo fisso."],
        ["Andate fuori Istanbul?", "No. Serviamo solo Istanbul: i due aeroporti, il porto crociere Galataport e i quartieri su entrambe le sponde del Bosforo."]
      ]],
      ["Oltre ai transfer aeroportuali", [
        ["Venite a prendere al porto crociere Galataport?", "Sì. Accogliamo i crocieristi a Galataport e li portiamo ai due aeroporti, agli hotel e nei quartieri a prezzo fisso."],
        ["Posso noleggiare un'auto con autista a ore o per un giro della città?", "Sì, per qualche ora o un giorno intero, o per un giro con soste su entrambe le sponde del Bosforo. Scrivici il tuo programma e ti mandiamo un prezzo fisso."],
        ["Avete veicoli per matrimoni ed eventi?", "Sì, dalla Mercedes Classe V per gli sposi ai minibus per gli invitati, e più veicoli contemporaneamente se serve."],
        ["Lavorate con aziende e agenzie?", "Sì. Le aziende possono aprire un account aziendale con fattura mensile, e agenzie di viaggio e hotel possono prenotare da noi per i loro ospiti."]
      ]]
    ]
  },
  nl: {
    path: "/nl/veelgestelde-vragen", nav: "Veelgestelde vragen",
    title: "Veelgestelde vragen: luchthaventransfer Istanbul · {brand}",
    desc: "Alle vragen over je transfer in Istanbul met {brand}: boeken, prijzen en betalen, ophalen op de luchthaven, auto's en bagage, wijzigen en annuleren.",
    h1: "Veelgestelde vragen",
    lead: "Alles over je transfer in Istanbul met {brand}: prijzen en betalen, ophalen op de luchthaven, auto's en bagage, wijzigen en annuleren. Staat je vraag er niet bij? Stuur ons een WhatsApp.",
    search: "Zoek in de vragen: bagage, annuleren, kinderzitje…", noHits: "Geen vraag gevonden. Stuur ons een WhatsApp, dan geven we antwoord.",
    related: "Meer hierover", contactH: "Nog een vraag?", contactP: "Ons kantoor antwoordt via WhatsApp, telefoon en e-mail.",
    ctaH: "Klaar om te boeken?", ctaP: "Bekijk je vaste prijs en verstuur je aanvraag in een minuut.",
    more: "Bekijk alle vragen",
    cats: [
      ["Boeken", [
        ["Hoe boek ik een transfer?", "Kies waar je vertrekt en waar je heen gaat, de datum, tijd en het aantal passagiers en daarna je auto. Vul je naam, mobiele nummer, e-mail en vluchtnummer in en verstuur de aanvraag. Dat duurt ongeveer een minuut en je ziet de vaste prijs vóór het versturen."],
        ["Heb ik een account of aanbetaling nodig?", "Nee. Geen account, geen online betaling en geen aanbetaling. Je betaalt de chauffeur aan het eind van de rit."],
        ["Wanneer is mijn boeking bevestigd?", "Direct na het versturen krijg je een e-mail \"aanvraag ontvangen\" met je boekingsnummer. De boeking is bevestigd zodra we je de bevestigingsmail sturen, meestal binnen een uur."],
        ["Hoe ver van tevoren moet ik boeken?", "Zo vroeg mogelijk, liefst minstens 24 uur voor het ophalen, zodat de auto die je wilt vrij is. Voor een rit in de komende uren stuur je ons een WhatsApp en checken we de beschikbaarheid."],
        ["Kan ik voor iemand anders boeken?", "Ja. Vul de naam en het mobiele nummer van de passagier in zodat de chauffeur hem of haar kan bereiken, en je eigen e-mail voor de bevestiging. Voeg desgewenst een notitie voor de chauffeur toe."],
        ["Kan ik via WhatsApp of telefonisch boeken?", "Ja, stuur een bericht of bel {phone}. Het online formulier is het snelst: je ziet meteen de prijs en krijgt je boekingsnummer per e-mail."]
      ]],
      ["Prijzen en betalen", [
        ["Is de prijs per persoon of per auto?", "Per auto. De prijs blijft gelijk of je nu alleen bent of met zoveel mensen als de auto meeneemt: sedan 3, minivan 6, Mercedes V-Klasse 6, minibus 13."],
        ["Wat zit er in de prijs?", "Tol, bruggen, parkeren, ontvangst met naambordje, hulp met je bagage en wachttijd: de eerste {wait} minuten na de landing op de luchthavens. Geen taxameter, aan het eind niets extra te betalen."],
        ["Hoe betaal ik?", "Contant aan de chauffeur aan het eind van de rit, in euro, Amerikaanse dollar of Turkse lira tegen de dagkoers. Bedrijven die maandelijks een factuur willen, kunnen een zakelijk account openen."],
        ["Wat kost een transfer?", "Prijzen beginnen bij €{min} per auto, enkele reis. De prijs hangt af van de route en de auto; onze prijslijst toont alle routes."],
        ["Zijn sommige tijden duurder?", "Ja, de drukste uren op de luchthavens: ophalen op Istanbul Airport tussen {istFrom} en {istTo} en op Sabiha Gökçen tussen {sawFrom} en {sawTo} kost {pct}% meer. Het boekingsformulier rekent dit mee, dus de prijs die je ziet is de prijs die je betaalt."],
        ["Is een retourtransfer goedkoper?", "Ja. Voeg de terugreis toe in het zoekvak en je krijgt {ret}% korting op de terugrit."],
        ["Wordt er een fooi verwacht?", "Nee, de fooi zit niet in de prijs. Was je tevreden over je chauffeur, dan is een kleine fooi welkom, maar nooit verplicht."]
      ]],
      ["Ophalen op de luchthaven", [
        ["Waar wacht mijn chauffeur op Istanbul Airport (IST)?", "{meetIST}"],
        ["Waar wacht mijn chauffeur op Sabiha Gökçen (SAW)?", "{meetSAW}"],
        ["Wat als mijn vlucht vertraagd of te vroeg is?", "We volgen je vlucht met het vluchtnummer dat je opgeeft en verschuiven het ophalen naar de echte landingstijd. De eerste {wait} minuten na de landing zijn gratis, genoeg voor paspoortcontrole en bagage."],
        ["Wat als ik mijn chauffeur niet vind?", "Bel ons of stuur een WhatsApp naar {phone}; beide luchthavens hebben gratis wifi. Het ontmoetingspunt en ons nummer staan ook in je bevestigingsmail. Ga alsjeblieft niet mee met een andere chauffeur."],
        ["Wanneer laat ik me ophalen voor mijn terugvlucht?", "Voor een internationale vlucht ben je het best zo'n 3 uur voor vertrek op de luchthaven; tel daar de reistijd bij op. Bij je hotel of adres wacht de chauffeur 15 minuten na de geboekte tijd."],
        ["Rijden jullie tussen Istanbul Airport en Sabiha Gökçen?", "Ja, voor een vaste prijs per auto. De rit dwars door de stad duurt vaak meer dan een uur, dus plan genoeg tijd tussen je vluchten."]
      ]],
      ["Auto's en bagage", [
        ["Welke auto moet ik kiezen?", "Voor 1–3 personen een sedan, voor 4–6 personen een minivan, tot 6 personen met meer comfort de Mercedes V-Klasse en voor 7–13 personen een minibus. Grotere groepen boeken meerdere auto's."],
        ["Hoeveel bagage past erin?", "Standaardkoffers per auto: sedan 3, minivan 7, Mercedes V-Klasse 6, minibus 16, plus handbagage. Vul het aantal koffers in het boekingsformulier in."],
        ["Ik heb een kinderwagen, golftas, ski's of een rolstoel. Is dat een probleem?", "Nee, zet het gewoon in de notitie. Grote spullen nemen ruimte in; kies bij een volle auto de maat groter, dan sturen we een auto waar alles in past."],
        ["Hebben jullie kinderzitjes?", "Ja, baby- en kinderzitjes kosten €{seat} per stuk. Kinderen hebben er een nodig; voeg ze toe in het boekingsformulier en zet de leeftijden in de notitie."],
        ["Krijg ik precies de auto van de foto?", "Je krijgt de autoklasse die je hebt geboekt. De getoonde modellen zijn voorbeelden; merk en kleur kunnen verschillen."]
      ]],
      ["Wijzigen en annuleren", [
        ["Kan ik gratis annuleren?", "Ja, tot 24 uur voor het ophalen. Beantwoord je bevestigingsmail of stuur ons een WhatsApp."],
        ["Wat als ik later annuleer of niet kom opdagen?", "Laat het ons zo snel mogelijk via WhatsApp weten. Kom je zonder bericht niet opdagen, dan kunnen we de ritprijs vragen."],
        ["Hoe wijzig ik de tijd, het adres of de vlucht?", "Beantwoord je bevestigingsmail of stuur ons een WhatsApp met je boekingsnummer. Wijzigen is gratis tot 24 uur voor het ophalen; daarna doen we ons best."],
        ["Mijn vlucht is geannuleerd. Wat nu?", "Stuur ons je nieuwe vlucht via WhatsApp en we verplaatsen je transfer. Heb je de rit niet meer nodig, dan annuleren we hem."]
      ]],
      ["Chauffeurs en de rit", [
        ["Is {brand} een erkend bedrijf?", "Ja. {brand} wordt gerund door een erkend Turks reisbureau (TÜRSAB-licentie {tursab}). Je rijdt in een privéauto met een professionele chauffeur, niet in een straattaxi."],
        ["Spreekt de chauffeur Engels?", "Je hoeft niets uit te leggen: de chauffeur kent je naam, adres en vlucht uit de boeking. Heb je onderweg hulp nodig, dan antwoordt ons kantoor via WhatsApp."],
        ["Kunnen we onderweg stoppen?", "Laat het ons weten bij het boeken, bijvoorbeeld om onderweg een vriend op te halen. Voor langere stops of meerdere adressen past onze chauffeursdienst per uur beter."],
        ["Rijden jullie ook 's nachts?", "Ja, 24 uur per dag, 7 dagen per week, ook voor heel vroege en late vluchten, voor dezelfde vaste prijs."],
        ["Rijden jullie buiten Istanbul?", "Nee. We rijden alleen in Istanbul: beide luchthavens, de cruisehaven Galataport en de wijken aan beide kanten van de Bosporus."]
      ]],
      ["Meer dan luchthaventransfers", [
        ["Halen jullie op bij de cruisehaven Galataport?", "Ja. We ontvangen cruisepassagiers bij Galataport en brengen ze voor een vaste prijs naar beide luchthavens, hotels en wijken."],
        ["Kan ik een auto met chauffeur per uur of voor een stadstour huren?", "Ja, voor een paar uur of een hele dag, of voor een stadstour met stops aan beide kanten van de Bosporus. Stuur ons je plan en we geven je een vaste prijs."],
        ["Hebben jullie auto's voor bruiloften en evenementen?", "Ja, van een Mercedes V-Klasse voor het bruidspaar tot minibussen voor de gasten, en zo nodig meerdere auto's tegelijk."],
        ["Werken jullie met bedrijven en reisbureaus?", "Ja. Bedrijven kunnen een zakelijk account met maandfactuur openen, en reisbureaus en hotels kunnen bij ons boeken voor hun gasten."]
      ]]
    ]
  },
  ar: {
    path: "/ar/asila-shaia", nav: "الأسئلة الشائعة",
    title: "الأسئلة الشائعة: النقل من مطار إسطنبول · {brand}",
    desc: "كل الأسئلة عن النقل في إسطنبول مع {brand}: الحجز، الأسعار والدفع، الاستقبال في المطار، السيارات والأمتعة، التعديل والإلغاء.",
    h1: "الأسئلة الشائعة",
    lead: "كل ما تحتاج معرفته عن رحلتك في إسطنبول مع {brand}: الأسعار والدفع، الاستقبال في المطار، السيارات والأمتعة، التعديل والإلغاء. لم تجد إجابتك؟ راسلنا على واتساب.",
    search: "ابحث في الأسئلة: الأمتعة، الإلغاء، مقعد الطفل…", noHits: "لا يوجد سؤال مطابق. راسلنا على واتساب وسنجيبك.",
    related: "اقرأ المزيد", contactH: "هل لديك سؤال آخر؟", contactP: "يجيب مكتبنا على واتساب وبالهاتف وبالبريد الإلكتروني.",
    ctaH: "جاهز للحجز؟", ctaP: "اطّلع على سعرك الثابت وأرسل طلبك في دقيقة.",
    more: "عرض كل الأسئلة",
    cats: [
      ["الحجز", [
        ["كيف أحجز رحلة نقل؟", "اختر نقطة الانطلاق والوجهة والتاريخ والوقت وعدد الركاب، ثم اختر السيارة. أدخل اسمك ورقم جوالك وبريدك الإلكتروني ورقم رحلتك وأرسل الطلب. يستغرق ذلك نحو دقيقة، وترى السعر الثابت قبل الإرسال."],
        ["هل أحتاج إلى حساب أو عربون؟", "لا. لا حساب ولا دفع عبر الإنترنت ولا عربون. تدفع للسائق في نهاية الرحلة."],
        ["متى يتم تأكيد حجزي؟", "فور إرسال النموذج تصلك رسالة \"استلمنا طلبك\" برقم الحجز. يصبح الحجز مؤكداً عندما نرسل لك رسالة التأكيد، وعادةً خلال ساعة."],
        ["قبل كم من الوقت يجب أن أحجز؟", "في أقرب وقت ممكن، ويُفضّل قبل 24 ساعة على الأقل من موعد الاستقبال لتكون السيارة التي تريدها متاحة. لرحلة خلال الساعات القادمة راسلنا على واتساب وسنتحقق من التوفر."],
        ["هل يمكنني الحجز لشخص آخر؟", "نعم. أدخل اسم الراكب ورقم جواله ليتمكن السائق من التواصل معه، وبريدك الإلكتروني لاستلام التأكيد. ويمكنك إضافة ملاحظة للسائق."],
        ["هل يمكنني الحجز عبر واتساب أو الهاتف؟", "نعم، راسلنا أو اتصل على {phone}. النموذج الإلكتروني هو الأسرع: ترى السعر فوراً ويصلك رقم الحجز بالبريد الإلكتروني."]
      ]],
      ["الأسعار والدفع", [
        ["هل السعر للشخص أم للسيارة؟", "للسيارة. يبقى السعر نفسه سواء كنت وحدك أو بعدد ما تتسع له السيارة: سيدان 3، ميني فان 6، مرسيدس V-Class ستة، ميني باص 13."],
        ["ماذا يشمل السعر؟", "رسوم الطرق والجسور والمواقف، والاستقبال بلوحة تحمل اسمك، والمساعدة في الأمتعة، ووقت الانتظار: أول {wait} دقيقة بعد الهبوط في المطارات. لا عدّاد ولا أي مبلغ إضافي في النهاية."],
        ["كيف أدفع؟", "نقداً للسائق في نهاية الرحلة، باليورو أو الدولار الأمريكي أو الليرة التركية بسعر صرف اليوم. ويمكن للشركات التي تحتاج إلى فاتورة شهرية فتح حساب شركات."],
        ["كم تكلفة رحلة النقل؟", "تبدأ الأسعار من {min} يورو للسيارة في اتجاه واحد. يعتمد السعر على المسار والسيارة، وتجد كل المسارات في قائمة أسعارنا."],
        ["هل بعض الساعات أغلى؟", "نعم، ساعات الذروة في المطارات: الاستقبال في مطار إسطنبول بين {istFrom} و{istTo} وفي صبيحة كوكجن بين {sawFrom} و{sawTo} أغلى بنسبة {pct}%. يضيف نموذج الحجز ذلك تلقائياً، فالسعر الذي تراه هو ما تدفعه."],
        ["هل رحلة العودة أرخص؟", "نعم. أضف رحلة العودة في مربع البحث واحصل على خصم {ret}% عليها."],
        ["هل الإكرامية مطلوبة؟", "لا، الإكرامية ليست جزءاً من السعر. إذا كنت راضياً عن السائق فالإكرامية الصغيرة لطيفة، لكنها ليست إلزامية أبداً."]
      ]],
      ["الاستقبال في المطار", [
        ["أين ينتظرني السائق في مطار إسطنبول (IST)؟", "{meetIST}"],
        ["أين ينتظرني السائق في مطار صبيحة كوكجن (SAW)؟", "{meetSAW}"],
        ["ماذا لو تأخرت رحلتي أو وصلت مبكراً؟", "نتابع رحلتك برقم الرحلة الذي تعطينا إياه ونعدّل موعد الاستقبال حسب وقت الهبوط الفعلي. أول {wait} دقيقة بعد الهبوط مجانية، وهي كافية لمراقبة الجوازات والأمتعة."],
        ["ماذا لو لم أجد السائق؟", "اتصل بنا أو راسلنا على واتساب على {phone}؛ يتوفر في المطارين واي فاي مجاني. ستجد أيضاً نقطة اللقاء ورقمنا في رسالة التأكيد. من فضلك لا تغادر مع سائق آخر."],
        ["متى يجب أن يأخذني السائق لرحلة العودة؟", "للرحلات الدولية خطّط للوصول إلى المطار قبل نحو 3 ساعات من الإقلاع، وأضف مدة الطريق. عند الفندق أو العنوان ينتظر السائق 15 دقيقة بعد الموعد المحجوز."],
        ["هل توفرون النقل بين مطار إسطنبول وصبيحة كوكجن؟", "نعم، بسعر ثابت للسيارة. عبور المدينة يستغرق غالباً أكثر من ساعة، لذا اترك وقتاً كافياً بين رحلتيك."]
      ]],
      ["السيارات والأمتعة", [
        ["أي سيارة أختار؟", "لشخص إلى 3 أشخاص سيدان، ومن 4 إلى 6 أشخاص ميني فان، وحتى 6 أشخاص مع راحة أكبر مرسيدس V-Class، ومن 7 إلى 13 شخصاً ميني باص. وللمجموعات الأكبر احجز أكثر من سيارة."],
        ["كم من الأمتعة تتسع كل سيارة؟", "الحقائب القياسية لكل سيارة: سيدان 3، ميني فان 7، مرسيدس V-Class ستة، ميني باص 16، إضافة إلى حقائب اليد. اكتب عدد الحقائب في نموذج الحجز."],
        ["لدي عربة أطفال أو حقيبة غولف أو معدات تزلج أو كرسي متحرك. هل هذه مشكلة؟", "لا، فقط اذكر ذلك في الملاحظة. الأغراض الكبيرة تأخذ مساحة، فإن كانت السيارة ممتلئة اختر الحجم الأكبر وسنرسل سيارة تتسع لكل شيء."],
        ["هل لديكم مقاعد أطفال؟", "نعم، مقعد الرضيع أو الطفل بسعر {seat} يورو للمقعد. الأطفال يحتاجون إليه، فأضفه في نموذج الحجز واكتب أعمار الأطفال في الملاحظة."],
        ["هل أحصل على السيارة نفسها التي في الصورة؟", "تحصل على فئة السيارة التي حجزتها. الطرازات المعروضة أمثلة، وقد يختلف الطراز واللون."]
      ]],
      ["التعديل والإلغاء", [
        ["هل يمكنني الإلغاء مجاناً؟", "نعم، حتى 24 ساعة قبل موعد الاستقبال. ردّ على رسالة التأكيد أو راسلنا على واتساب."],
        ["ماذا لو ألغيت متأخراً أو لم أحضر؟", "أخبرنا على واتساب في أسرع وقت. إذا لم تحضر دون إبلاغنا فقد نطلب ثمن الرحلة."],
        ["كيف أغيّر الوقت أو العنوان أو الرحلة؟", "ردّ على رسالة التأكيد أو راسلنا على واتساب برقم حجزك. التعديل مجاني حتى 24 ساعة قبل الاستقبال، وبعد ذلك نبذل قصارى جهدنا."],
        ["أُلغيت رحلتي الجوية. ماذا أفعل؟", "أرسل لنا رحلتك الجديدة على واتساب وسننقل حجزك إليها. وإن لم تعد بحاجة إلى الرحلة فسنلغيها."]
      ]],
      ["السائقون والرحلة", [
        ["هل {brand} شركة مرخّصة؟", "نعم. تدير {brand} وكالة سفر تركية مرخّصة (ترخيص TÜRSAB رقم {tursab}). تركب سيارة خاصة مع سائق محترف، وليس سيارة أجرة من الشارع."],
        ["هل يتحدث السائق الإنجليزية أو العربية؟", "لا تحتاج إلى شرح أي شيء: يعرف السائق اسمك وعنوانك ورحلتك من الحجز. وإذا احتجت مساعدة في الطريق فمكتبنا يجيبك على واتساب."],
        ["هل يمكننا التوقف في الطريق؟", "أخبرنا عند الحجز، مثلاً لاصطحاب صديق على الطريق. للتوقفات الطويلة أو عدة عناوين تناسبك أكثر خدمة السيارة مع سائق بالساعة."],
        ["هل تعملون ليلاً؟", "نعم، على مدار 24 ساعة طوال أيام الأسبوع، ومنها رحلات الفجر وآخر الليل، بالسعر الثابت نفسه."],
        ["هل تذهبون خارج إسطنبول؟", "لا. نخدم إسطنبول فقط: المطارين وميناء الرحلات البحرية غلطة بورت والأحياء على ضفتي البوسفور."]
      ]],
      ["أكثر من النقل من المطار", [
        ["هل تستقبلون في ميناء الرحلات البحرية غلطة بورت؟", "نعم. نستقبل ركاب الرحلات البحرية في غلطة بورت ونوصلهم إلى المطارين والفنادق والأحياء بسعر ثابت."],
        ["هل يمكنني استئجار سيارة مع سائق بالساعة أو لجولة في المدينة؟", "نعم، لبضع ساعات أو ليوم كامل، أو لجولة مع توقفات على ضفتي البوسفور. أرسل لنا خطتك ونرسل لك سعراً ثابتاً."],
        ["هل لديكم سيارات للأعراس والمناسبات؟", "نعم، من مرسيدس V-Class للعروسين إلى الميني باصات للضيوف، وعدة سيارات في الوقت نفسه عند الحاجة."],
        ["هل تعملون مع الشركات والوكالات؟", "نعم. يمكن للشركات فتح حساب شركات بفاتورة شهرية، ويمكن لوكالات السفر والفنادق الحجز لدينا لضيوفها."]
      ]]
    ]
  }
};
