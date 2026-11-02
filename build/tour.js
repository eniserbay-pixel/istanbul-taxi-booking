// Extra sections for the city tour page (build/services.js, id "tour"), in every language:
// - free: the route is the guest's own, anywhere in Istanbul
// - plans: sample days with their length (half day, full day, Bosphorus and shopping, evening)
// - groups: places to pick from, by area; the planner form turns the picks into a WhatsApp message (site.js, [data-tour])
// - incl / excl: what the price covers and what it does not
// - faq: questions added before the page's own FAQ
module.exports = {
  en: {
    freeH: "Go anywhere in Istanbul you like",
    free: [
      "There is no fixed programme. The car and driver are yours for the day, so you choose where to go, in which order and how long to stay: a mosque you read about, a friend's neighbourhood, a fish restaurant on the Bosphorus, a shopping mall or a viewpoint on the Asian side.",
      "Send us your list, or ask us to suggest a route. You can add or change stops on the day; the driver adjusts the route and tells you if a change needs more time."
    ],
    plansH: "Sample days to start from",
    plansLead: "Use one as it is, mix two or tell us your own plan.",
    plans: [
      ["Old City", "Half day · 4–5 hours", "Hagia Sophia, the Blue Mosque, the Basilica Cistern and the Grand Bazaar. The driver drops you at the gates and waits nearby."],
      ["Two continents", "Full day · 8–10 hours", "Sultanahmet, Dolmabahçe Palace, Ortaköy, across the Bosphorus Bridge to Çamlıca Hill, Beylerbeyi Palace and back along the Asian shore."],
      ["Bosphorus villages and shopping", "6–8 hours", "Bebek, Rumeli Fortress, Emirgan Park, a long lunch in Sarıyer and an afternoon at Istinye Park or Nişantaşı."],
      ["Istanbul by night", "Evening · 3–4 hours", "Galata Tower and İstiklal Avenue, dinner where you like, then the city lights from Çamlıca Hill or Ortaköy."]
    ],
    planH: "Plan your own route",
    planLead: "Tick the places you'd like to see, add anything else in Istanbul, and send the list to us on WhatsApp. We reply with a route and a fixed price.",
    groups: [
      ["Old City", ["Hagia Sophia", "Blue Mosque", "Topkapı Palace", "Basilica Cistern", "Grand Bazaar", "Spice Bazaar", "Süleymaniye Mosque"]],
      ["Galata and Beyoğlu", ["Galata Tower", "İstiklal Avenue", "Taksim Square", "Karaköy and Galataport", "Balat and Fener", "Pierre Loti Hill"]],
      ["Bosphorus, European shore", ["Dolmabahçe Palace", "Ortaköy", "Bebek", "Rumeli Fortress", "Emirgan Park", "Sarıyer"]],
      ["Asian side", ["Çamlıca Hill", "Üsküdar and the Maiden's Tower", "Beylerbeyi Palace", "Kadıköy", "Moda", "Bağdat Avenue"]],
      ["Shopping", ["Istinye Park", "Zorlu Center", "Kanyon", "Emaar Square Mall", "Mall of Istanbul", "Nişantaşı"]],
      ["Nature and further out", ["Princes' Islands ferry (Kabataş / Bostancı)", "Belgrad Forest", "Kilyos beach", "Şile", "Polonezköy", "Riva"]]
    ],
    otherL: "Other places", otherPh: "Any address, restaurant or district in Istanbul",
    durL: "How long", durs: ["Half day (4–5 hours)", "Full day (8–10 hours)", "Evening (3–4 hours)", "Several days", "Not sure yet"],
    carL: "Car", dateL: "Date", paxL: "Passengers", pickL: "Pickup from", pickPh: "Hotel, address, airport or cruise port",
    send: "Send my route on WhatsApp", note: "WhatsApp opens with your list ready to send. Nothing is booked until you confirm the price.",
    wa: { intro: "Hello, I would like a private city tour with a driver in Istanbul.", stops: "Places", other: "Also", dur: "Length", car: "Car", date: "Date", pax: "Passengers", pick: "Pickup" },
    inclH: "Included in the price", incl: ["Private car and professional driver for the hours you book", "Fuel, bridge and motorway tolls, parking", "Waiting at every stop", "Pickup and drop-off at your hotel or address anywhere in Istanbul", "Changes to the route on the day, within your hours"],
    exclH: "Not included", excl: ["Entrance tickets to museums and palaces", "Meals and drinks", "A licensed tour guide (we can arrange one on request)", "Ferry tickets, for example to the Princes' Islands"],
    faq: [
      ["Can I really go anywhere I want?", "Yes, anywhere within Istanbul, on both the European and Asian sides. Tell us the places, or just the kind of day you want, and we plan the route with you."],
      ["Can I change the plan on the day?", "Yes. Tell the driver; extra stops are fine within the hours you booked. If the day runs longer, extra hours are charged at the rate we agreed."],
      ["Can we visit the Princes' Islands?", "Cars are not allowed on the islands. The driver takes you to the ferry at Kabataş or Bostancı and picks you up when you come back, or carries on with other stops in between."],
      ["Can the tour start at the airport or the cruise port?", "Yes. We can pick you up at Istanbul Airport, Sabiha Gökçen or Galataport, show you the city with your luggage in the car, and drop you at your hotel."],
      ["Is the price per person?", "No, it is per car, for up to 3 people in a sedan, 6 in a V-Class, 6 in a minivan and 13 in a minibus."]
    ]
  },
  tr: {
    freeH: "İstanbul'da istediğiniz her yere gidin",
    free: [
      "Sabit bir program yok. Araç ve şoför gün boyu sizindir; nereye, hangi sırayla gideceğinizi ve ne kadar kalacağınızı siz seçersiniz: okuduğunuz bir cami, bir arkadaşınızın semti, Boğaz'da bir balık restoranı, bir AVM ya da Anadolu Yakası'nda bir manzara noktası.",
      "Listenizi gönderin ya da bizden güzergah önerisi isteyin. Gün içinde durak ekleyebilir veya değiştirebilirsiniz; şoför rotayı ayarlar ve değişiklik daha fazla süre gerektiriyorsa size söyler."
    ],
    plansH: "Başlangıç için örnek günler",
    plansLead: "Birini olduğu gibi seçin, ikisini birleştirin ya da kendi planınızı yazın.",
    plans: [
      ["Tarihi Yarımada", "Yarım gün · 4-5 saat", "Ayasofya, Sultanahmet Camii, Yerebatan Sarnıcı ve Kapalıçarşı. Şoför sizi kapıda bırakır ve yakında bekler."],
      ["İki kıta", "Tam gün · 8-10 saat", "Sultanahmet, Dolmabahçe Sarayı, Ortaköy, Boğaziçi Köprüsü'nden Çamlıca Tepesi'ne, Beylerbeyi Sarayı ve Anadolu sahilinden dönüş."],
      ["Boğaz köyleri ve alışveriş", "6-8 saat", "Bebek, Rumeli Hisarı, Emirgan Korusu, Sarıyer'de uzun bir öğle yemeği ve öğleden sonra İstinye Park ya da Nişantaşı."],
      ["Gece İstanbul", "Akşam · 3-4 saat", "Galata Kulesi ve İstiklal Caddesi, dilediğiniz yerde akşam yemeği, ardından Çamlıca Tepesi'nden ya da Ortaköy'den şehir ışıkları."]
    ],
    planH: "Kendi güzergahınızı planlayın",
    planLead: "Görmek istediğiniz yerleri işaretleyin, İstanbul'da başka bir yer varsa ekleyin ve listeyi WhatsApp'tan bize gönderin. Güzergah ve sabit fiyatla dönüş yaparız.",
    groups: [
      ["Tarihi Yarımada", ["Ayasofya", "Sultanahmet Camii", "Topkapı Sarayı", "Yerebatan Sarnıcı", "Kapalıçarşı", "Mısır Çarşısı", "Süleymaniye Camii"]],
      ["Galata ve Beyoğlu", ["Galata Kulesi", "İstiklal Caddesi", "Taksim Meydanı", "Karaköy ve Galataport", "Balat ve Fener", "Pierre Loti Tepesi"]],
      ["Boğaz, Avrupa Yakası", ["Dolmabahçe Sarayı", "Ortaköy", "Bebek", "Rumeli Hisarı", "Emirgan Korusu", "Sarıyer"]],
      ["Anadolu Yakası", ["Çamlıca Tepesi", "Üsküdar ve Kız Kulesi", "Beylerbeyi Sarayı", "Kadıköy", "Moda", "Bağdat Caddesi"]],
      ["Alışveriş", ["İstinye Park", "Zorlu Center", "Kanyon", "Emaar Square Mall", "Mall of İstanbul", "Nişantaşı"]],
      ["Doğa ve şehir dışı", ["Adalar vapuru (Kabataş / Bostancı)", "Belgrad Ormanı", "Kilyos plajı", "Şile", "Polonezköy", "Riva"]]
    ],
    otherL: "Diğer yerler", otherPh: "İstanbul'da herhangi bir adres, restoran veya semt",
    durL: "Süre", durs: ["Yarım gün (4-5 saat)", "Tam gün (8-10 saat)", "Akşam (3-4 saat)", "Birkaç gün", "Henüz bilmiyorum"],
    carL: "Araç", dateL: "Tarih", paxL: "Yolcu sayısı", pickL: "Alış yeri", pickPh: "Otel, adres, havalimanı veya kruvaziyer limanı",
    send: "Güzergahımı WhatsApp'tan gönder", note: "WhatsApp listeniz hazır şekilde açılır. Fiyatı onaylayana kadar rezervasyon yapılmaz.",
    wa: { intro: "Merhaba, İstanbul'da özel şoförlü şehir turu yapmak istiyorum.", stops: "Yerler", other: "Ayrıca", dur: "Süre", car: "Araç", date: "Tarih", pax: "Yolcu", pick: "Alış yeri" },
    inclH: "Fiyata dahil", incl: ["Ayırttığınız saatler boyunca size özel araç ve profesyonel şoför", "Yakıt, köprü ve otoyol geçişleri, otopark", "Her durakta bekleme", "İstanbul'un herhangi bir yerindeki otelinizden veya adresinizden alış ve bırakış", "Süreniz içinde gün içi güzergah değişiklikleri"],
    exclH: "Dahil olmayanlar", excl: ["Müze ve saray giriş biletleri", "Yemek ve içecekler", "Belgeli turist rehberi (istenirse ayarlayabiliriz)", "Vapur biletleri, örneğin Adalar için"],
    faq: [
      ["Gerçekten istediğim her yere gidebilir miyim?", "Evet, İstanbul sınırları içinde Avrupa ve Anadolu yakasında her yere. Yerleri ya da sadece nasıl bir gün istediğinizi yazın, güzergahı sizinle birlikte planlayalım."],
      ["Planı gün içinde değiştirebilir miyim?", "Evet. Şoföre söylemeniz yeterli; ayırttığınız süre içinde ek duraklar sorun değil. Gün uzarsa ek saatler anlaştığımız ücretle hesaplanır."],
      ["Adalar'a gidebilir miyiz?", "Adalar'a araç çıkamaz. Şoför sizi Kabataş veya Bostancı iskelesine bırakır, dönüşte alır ya da arada başka duraklara devam eder."],
      ["Tur havalimanından veya kruvaziyer limanından başlayabilir mi?", "Evet. Sizi İstanbul Havalimanı, Sabiha Gökçen veya Galataport'tan alır, bavullarınız araçtayken şehri gezdirir ve otelinize bırakırız."],
      ["Fiyat kişi başı mı?", "Hayır, araç başıdır: sedanda 3, V-Class'ta 6, minivanda 6, minibüste 13 kişiye kadar."]
    ]
  },
  ru: {
    freeH: "Куда угодно по Стамбулу",
    free: [
      "Фиксированной программы нет. Машина и водитель ваши на весь день: вы сами выбираете, куда ехать, в каком порядке и сколько оставаться. Мечеть, о которой вы читали, район, где живут друзья, рыбный ресторан на Босфоре, торговый центр или смотровая площадка на азиатской стороне.",
      "Пришлите нам список или попросите предложить маршрут. Остановки можно добавлять и менять прямо в течение дня; водитель перестроит маршрут и скажет, если изменение потребует больше времени."
    ],
    plansH: "Примеры дня для начала",
    plansLead: "Возьмите один как есть, совместите два или опишите свой план.",
    plans: [
      ["Старый город", "Полдня · 4–5 часов", "Айя-София, Голубая мечеть, цистерна Базилика и Гранд-базар. Водитель высадит вас у входа и подождёт рядом."],
      ["Два континента", "Целый день · 8–10 часов", "Султанахмет, дворец Долмабахче, Ортакёй, через Босфорский мост на холм Чамлыджа, дворец Бейлербейи и обратно вдоль азиатского берега."],
      ["Деревни Босфора и шопинг", "6–8 часов", "Бебек, крепость Румелихисары, парк Эмирган, долгий обед в Сарыере и вторая половина дня в Istinye Park или Нишанташы."],
      ["Ночной Стамбул", "Вечер · 3–4 часа", "Галатская башня и улица Истикляль, ужин где захотите, затем огни города с холма Чамлыджа или из Ортакёя."]
    ],
    planH: "Составьте свой маршрут",
    planLead: "Отметьте места, которые хотите увидеть, добавьте любые другие в Стамбуле и отправьте список нам в WhatsApp. Мы ответим маршрутом и фиксированной ценой.",
    groups: [
      ["Старый город", ["Айя-София", "Голубая мечеть", "Дворец Топкапы", "Цистерна Базилика", "Гранд-базар", "Египетский базар", "Мечеть Сулеймание"]],
      ["Галата и Бейоглу", ["Галатская башня", "Улица Истикляль", "Площадь Таксим", "Каракёй и Галатапорт", "Балат и Фенер", "Холм Пьера Лоти"]],
      ["Босфор, европейский берег", ["Дворец Долмабахче", "Ортакёй", "Бебек", "Крепость Румелихисары", "Парк Эмирган", "Сарыер"]],
      ["Азиатская сторона", ["Холм Чамлыджа", "Ускюдар и Девичья башня", "Дворец Бейлербейи", "Кадыкёй", "Мода", "Улица Багдат"]],
      ["Шопинг", ["Istinye Park", "Zorlu Center", "Kanyon", "Emaar Square Mall", "Mall of Istanbul", "Нишанташы"]],
      ["Природа и за городом", ["Паром на Принцевы острова (Кабаташ / Бостанджи)", "Белградский лес", "Пляж Кильос", "Шиле", "Полонезкёй", "Рива"]]
    ],
    otherL: "Другие места", otherPh: "Любой адрес, ресторан или район Стамбула",
    durL: "Сколько времени", durs: ["Полдня (4–5 часов)", "Целый день (8–10 часов)", "Вечер (3–4 часа)", "Несколько дней", "Пока не знаю"],
    carL: "Автомобиль", dateL: "Дата", paxL: "Пассажиров", pickL: "Откуда забрать", pickPh: "Отель, адрес, аэропорт или круизный порт",
    send: "Отправить маршрут в WhatsApp", note: "WhatsApp откроется с готовым списком. Ничего не бронируется, пока вы не подтвердите цену.",
    wa: { intro: "Здравствуйте, хочу заказать поездку по Стамбулу с личным водителем.", stops: "Места", other: "Ещё", dur: "Время", car: "Автомобиль", date: "Дата", pax: "Пассажиров", pick: "Забрать" },
    inclH: "Входит в цену", incl: ["Личная машина и профессиональный водитель на заказанные часы", "Топливо, оплата мостов и трасс, парковка", "Ожидание на каждой остановке", "Подача и возврат к отелю или по любому адресу в Стамбуле", "Изменения маршрута в течение дня в пределах ваших часов"],
    exclH: "Не входит", excl: ["Входные билеты в музеи и дворцы", "Еда и напитки", "Лицензированный гид (можем организовать по запросу)", "Билеты на паром, например на Принцевы острова"],
    faq: [
      ["Правда можно поехать куда угодно?", "Да, в любое место Стамбула, на европейской и азиатской стороне. Назовите места или просто опишите, какой день хотите, и мы вместе составим маршрут."],
      ["Можно изменить план в течение дня?", "Да. Скажите водителю; дополнительные остановки в пределах заказанных часов не проблема. Если день затянется, дополнительные часы оплачиваются по согласованной ставке."],
      ["Можно съездить на Принцевы острова?", "На острова машины не пускают. Водитель отвезёт вас к парому в Кабаташе или Бостанджи и встретит на обратном пути, а в промежутке может отвезти по другим делам."],
      ["Можно начать поездку в аэропорту или круизном порту?", "Да. Мы встретим вас в аэропорту Стамбула, Сабихе Гёкчен или Галатапорте, покажем город с багажом в машине и довезём до отеля."],
      ["Цена за человека?", "Нет, за машину: до 3 человек в седане, 6 в V-Class, 6 в минивэне и 13 в микроавтобусе."]
    ]
  },
  de: {
    freeH: "Fahren Sie in Istanbul, wohin Sie möchten",
    free: [
      "Es gibt kein festes Programm. Auto und Fahrer gehören den ganzen Tag Ihnen: Sie wählen, wohin, in welcher Reihenfolge und wie lange. Eine Moschee, über die Sie gelesen haben, das Viertel von Freunden, ein Fischrestaurant am Bosporus, ein Einkaufszentrum oder ein Aussichtspunkt auf der asiatischen Seite.",
      "Schicken Sie uns Ihre Liste oder lassen Sie sich eine Route vorschlagen. Stopps können Sie am Tag selbst ergänzen oder ändern; der Fahrer passt die Route an und sagt Bescheid, wenn eine Änderung mehr Zeit braucht."
    ],
    plansH: "Beispieltage als Ausgangspunkt",
    plansLead: "Nehmen Sie einen davon, kombinieren Sie zwei oder schicken Sie uns Ihren eigenen Plan.",
    plans: [
      ["Altstadt", "Halber Tag · 4–5 Stunden", "Hagia Sophia, Blaue Moschee, Basilika-Zisterne und Großer Basar. Der Fahrer setzt Sie am Eingang ab und wartet in der Nähe."],
      ["Zwei Kontinente", "Ganzer Tag · 8–10 Stunden", "Sultanahmet, Dolmabahçe-Palast, Ortaköy, über die Bosporusbrücke zum Çamlıca-Hügel, Beylerbeyi-Palast und zurück am asiatischen Ufer."],
      ["Bosporusdörfer und Shopping", "6–8 Stunden", "Bebek, Rumeli-Festung, Emirgan-Park, ein langes Mittagessen in Sarıyer und der Nachmittag in Istinye Park oder Nişantaşı."],
      ["Istanbul bei Nacht", "Abend · 3–4 Stunden", "Galataturm und İstiklal-Straße, Abendessen nach Wahl, dann die Lichter der Stadt vom Çamlıca-Hügel oder aus Ortaköy."]
    ],
    planH: "Planen Sie Ihre eigene Route",
    planLead: "Markieren Sie die Orte, die Sie sehen möchten, ergänzen Sie alles Weitere in Istanbul und schicken Sie die Liste per WhatsApp. Wir antworten mit Route und Festpreis.",
    groups: [
      ["Altstadt", ["Hagia Sophia", "Blaue Moschee", "Topkapı-Palast", "Basilika-Zisterne", "Großer Basar", "Ägyptischer Basar", "Süleymaniye-Moschee"]],
      ["Galata und Beyoğlu", ["Galataturm", "İstiklal-Straße", "Taksim-Platz", "Karaköy und Galataport", "Balat und Fener", "Pierre-Loti-Hügel"]],
      ["Bosporus, europäisches Ufer", ["Dolmabahçe-Palast", "Ortaköy", "Bebek", "Rumeli-Festung", "Emirgan-Park", "Sarıyer"]],
      ["Asiatische Seite", ["Çamlıca-Hügel", "Üsküdar und Leanderturm", "Beylerbeyi-Palast", "Kadıköy", "Moda", "Bağdat-Straße"]],
      ["Shopping", ["Istinye Park", "Zorlu Center", "Kanyon", "Emaar Square Mall", "Mall of Istanbul", "Nişantaşı"]],
      ["Natur und Umgebung", ["Fähre zu den Prinzeninseln (Kabataş / Bostancı)", "Belgrader Wald", "Strand von Kilyos", "Şile", "Polonezköy", "Riva"]]
    ],
    otherL: "Weitere Orte", otherPh: "Jede Adresse, jedes Restaurant oder Viertel in Istanbul",
    durL: "Dauer", durs: ["Halber Tag (4–5 Stunden)", "Ganzer Tag (8–10 Stunden)", "Abend (3–4 Stunden)", "Mehrere Tage", "Noch offen"],
    carL: "Fahrzeug", dateL: "Datum", paxL: "Personen", pickL: "Abholung", pickPh: "Hotel, Adresse, Flughafen oder Kreuzfahrthafen",
    send: "Route per WhatsApp senden", note: "WhatsApp öffnet sich mit Ihrer fertigen Liste. Gebucht ist erst, wenn Sie den Preis bestätigen.",
    wa: { intro: "Hallo, ich möchte eine private Stadtrundfahrt mit Fahrer in Istanbul.", stops: "Orte", other: "Außerdem", dur: "Dauer", car: "Fahrzeug", date: "Datum", pax: "Personen", pick: "Abholung" },
    inclH: "Im Preis enthalten", incl: ["Privates Auto und professioneller Fahrer für die gebuchten Stunden", "Kraftstoff, Brücken- und Autobahnmaut, Parken", "Warten an jedem Stopp", "Abholung und Rückfahrt am Hotel oder jeder Adresse in Istanbul", "Routenänderungen am Tag innerhalb Ihrer Stunden"],
    exclH: "Nicht enthalten", excl: ["Eintritt für Museen und Paläste", "Essen und Getränke", "Ein lizenzierter Reiseleiter (auf Anfrage vermittelbar)", "Fährtickets, zum Beispiel zu den Prinzeninseln"],
    faq: [
      ["Kann ich wirklich überall hin?", "Ja, überall innerhalb Istanbuls, auf der europäischen und der asiatischen Seite. Nennen Sie uns die Orte oder einfach, was für einen Tag Sie möchten, und wir planen die Route mit Ihnen."],
      ["Kann ich den Plan am Tag ändern?", "Ja. Sagen Sie es dem Fahrer; zusätzliche Stopps sind innerhalb der gebuchten Stunden kein Problem. Wird der Tag länger, gelten für Zusatzstunden die vereinbarten Sätze."],
      ["Können wir die Prinzeninseln besuchen?", "Auf den Inseln sind keine Autos erlaubt. Der Fahrer bringt Sie zur Fähre in Kabataş oder Bostancı und holt Sie bei der Rückkehr ab; dazwischen kann er andere Fahrten übernehmen."],
      ["Kann die Tour am Flughafen oder Kreuzfahrthafen beginnen?", "Ja. Wir holen Sie am Flughafen Istanbul, in Sabiha Gökçen oder am Galataport ab, zeigen Ihnen die Stadt mit dem Gepäck im Auto und bringen Sie zum Hotel."],
      ["Gilt der Preis pro Person?", "Nein, pro Auto: bis zu 3 Personen in der Limousine, 6 in der V-Klasse, 6 im Minivan und 13 im Minibus."]
    ]
  },
  fr: {
    freeH: "Allez où vous voulez dans Istanbul",
    free: [
      "Il n'y a pas de programme fixe. La voiture et le chauffeur sont à vous pour la journée : vous choisissez où aller, dans quel ordre et combien de temps rester. Une mosquée dont vous avez entendu parler, le quartier d'amis, un restaurant de poisson sur le Bosphore, un centre commercial ou un belvédère sur la rive asiatique.",
      "Envoyez-nous votre liste ou demandez-nous un itinéraire. Vous pouvez ajouter ou changer des arrêts le jour même ; le chauffeur adapte le trajet et vous prévient si un changement demande plus de temps."
    ],
    plansH: "Des journées types pour commencer",
    plansLead: "Prenez-en une telle quelle, combinez-en deux ou envoyez-nous votre propre plan.",
    plans: [
      ["Vieille ville", "Demi-journée · 4–5 heures", "Sainte-Sophie, la Mosquée bleue, la Citerne Basilique et le Grand Bazar. Le chauffeur vous dépose à l'entrée et attend tout près."],
      ["Deux continents", "Journée · 8–10 heures", "Sultanahmet, le palais de Dolmabahçe, Ortaköy, le pont du Bosphore jusqu'à la colline de Çamlıca, le palais de Beylerbeyi et retour par la rive asiatique."],
      ["Villages du Bosphore et shopping", "6–8 heures", "Bebek, la forteresse de Rumeli, le parc d'Emirgan, un long déjeuner à Sarıyer et l'après-midi à Istinye Park ou Nişantaşı."],
      ["Istanbul by night", "Soirée · 3–4 heures", "La tour de Galata et l'avenue İstiklal, dîner où vous voulez, puis les lumières de la ville depuis la colline de Çamlıca ou Ortaköy."]
    ],
    planH: "Composez votre itinéraire",
    planLead: "Cochez les lieux que vous voulez voir, ajoutez tout autre endroit d'Istanbul et envoyez la liste sur WhatsApp. Nous répondons avec un itinéraire et un prix fixe.",
    groups: [
      ["Vieille ville", ["Sainte-Sophie", "Mosquée bleue", "Palais de Topkapı", "Citerne Basilique", "Grand Bazar", "Bazar égyptien", "Mosquée Süleymaniye"]],
      ["Galata et Beyoğlu", ["Tour de Galata", "Avenue İstiklal", "Place Taksim", "Karaköy et Galataport", "Balat et Fener", "Colline Pierre Loti"]],
      ["Bosphore, rive européenne", ["Palais de Dolmabahçe", "Ortaköy", "Bebek", "Forteresse de Rumeli", "Parc d'Emirgan", "Sarıyer"]],
      ["Rive asiatique", ["Colline de Çamlıca", "Üsküdar et la tour de Léandre", "Palais de Beylerbeyi", "Kadıköy", "Moda", "Avenue Bağdat"]],
      ["Shopping", ["Istinye Park", "Zorlu Center", "Kanyon", "Emaar Square Mall", "Mall of Istanbul", "Nişantaşı"]],
      ["Nature et environs", ["Ferry pour les îles des Princes (Kabataş / Bostancı)", "Forêt de Belgrade", "Plage de Kilyos", "Şile", "Polonezköy", "Riva"]]
    ],
    otherL: "Autres lieux", otherPh: "Toute adresse, tout restaurant ou quartier d'Istanbul",
    durL: "Durée", durs: ["Demi-journée (4–5 heures)", "Journée (8–10 heures)", "Soirée (3–4 heures)", "Plusieurs jours", "Je ne sais pas encore"],
    carL: "Véhicule", dateL: "Date", paxL: "Passagers", pickL: "Prise en charge", pickPh: "Hôtel, adresse, aéroport ou port de croisière",
    send: "Envoyer mon itinéraire sur WhatsApp", note: "WhatsApp s'ouvre avec votre liste prête à envoyer. Rien n'est réservé avant que vous confirmiez le prix.",
    wa: { intro: "Bonjour, je souhaite une visite privée d'Istanbul avec chauffeur.", stops: "Lieux", other: "Aussi", dur: "Durée", car: "Véhicule", date: "Date", pax: "Passagers", pick: "Prise en charge" },
    inclH: "Compris dans le prix", incl: ["Voiture privée et chauffeur professionnel pour les heures réservées", "Carburant, péages des ponts et autoroutes, stationnement", "Attente à chaque arrêt", "Prise en charge et retour à votre hôtel ou à toute adresse d'Istanbul", "Changements d'itinéraire le jour même, dans vos heures"],
    exclH: "Non compris", excl: ["Entrées des musées et palais", "Repas et boissons", "Un guide agréé (possible sur demande)", "Billets de ferry, par exemple pour les îles des Princes"],
    faq: [
      ["Puis-je vraiment aller où je veux ?", "Oui, partout dans Istanbul, sur la rive européenne comme asiatique. Donnez-nous les lieux, ou simplement le genre de journée souhaité, et nous construisons l'itinéraire avec vous."],
      ["Puis-je changer le programme le jour même ?", "Oui. Dites-le au chauffeur ; les arrêts supplémentaires ne posent pas de problème dans vos heures. Si la journée se prolonge, les heures en plus sont facturées au tarif convenu."],
      ["Peut-on aller aux îles des Princes ?", "Les voitures ne sont pas autorisées sur les îles. Le chauffeur vous dépose au ferry à Kabataş ou Bostancı et vous récupère au retour, ou assure d'autres trajets entre-temps."],
      ["La visite peut-elle commencer à l'aéroport ou au port de croisière ?", "Oui. Nous vous prenons à l'aéroport d'Istanbul, à Sabiha Gökçen ou à Galataport, vous montrons la ville avec vos bagages dans la voiture et vous déposons à l'hôtel."],
      ["Le prix est-il par personne ?", "Non, par véhicule : jusqu'à 3 personnes en berline, 6 en Classe V, 6 en monospace et 13 en minibus."]
    ]
  },
  it: {
    freeH: "Vai dove vuoi a Istanbul",
    free: [
      "Non c'è un programma fisso. Auto e autista sono tuoi per la giornata: scegli tu dove andare, in che ordine e quanto restare. Una moschea di cui hai letto, il quartiere di amici, un ristorante di pesce sul Bosforo, un centro commerciale o un belvedere sulla sponda asiatica.",
      "Mandaci la tua lista o chiedici di proporre un percorso. Puoi aggiungere o cambiare tappe durante la giornata; l'autista adatta il percorso e ti avvisa se una modifica richiede più tempo."
    ],
    plansH: "Giornate tipo da cui partire",
    plansLead: "Scegline una così com'è, uniscine due o mandaci il tuo piano.",
    plans: [
      ["Città vecchia", "Mezza giornata · 4–5 ore", "Santa Sofia, la Moschea Blu, la Cisterna Basilica e il Gran Bazar. L'autista ti lascia all'ingresso e aspetta lì vicino."],
      ["Due continenti", "Giornata intera · 8–10 ore", "Sultanahmet, il Palazzo Dolmabahçe, Ortaköy, il Ponte sul Bosforo fino alla collina di Çamlıca, il Palazzo Beylerbeyi e ritorno lungo la sponda asiatica."],
      ["Villaggi del Bosforo e shopping", "6–8 ore", "Bebek, la Fortezza di Rumeli, il Parco di Emirgan, un lungo pranzo a Sarıyer e il pomeriggio a Istinye Park o Nişantaşı."],
      ["Istanbul di sera", "Sera · 3–4 ore", "Torre di Galata e Via İstiklal, cena dove preferisci, poi le luci della città dalla collina di Çamlıca o da Ortaköy."]
    ],
    planH: "Crea il tuo percorso",
    planLead: "Spunta i luoghi che vuoi vedere, aggiungi qualsiasi altro posto di Istanbul e mandaci la lista su WhatsApp. Rispondiamo con un percorso e un prezzo fisso.",
    groups: [
      ["Città vecchia", ["Santa Sofia", "Moschea Blu", "Palazzo Topkapı", "Cisterna Basilica", "Gran Bazar", "Bazar delle Spezie", "Moschea di Solimano"]],
      ["Galata e Beyoğlu", ["Torre di Galata", "Via İstiklal", "Piazza Taksim", "Karaköy e Galataport", "Balat e Fener", "Collina di Pierre Loti"]],
      ["Bosforo, sponda europea", ["Palazzo Dolmabahçe", "Ortaköy", "Bebek", "Fortezza di Rumeli", "Parco di Emirgan", "Sarıyer"]],
      ["Sponda asiatica", ["Collina di Çamlıca", "Üsküdar e la Torre della Fanciulla", "Palazzo Beylerbeyi", "Kadıköy", "Moda", "Via Bağdat"]],
      ["Shopping", ["Istinye Park", "Zorlu Center", "Kanyon", "Emaar Square Mall", "Mall of Istanbul", "Nişantaşı"]],
      ["Natura e dintorni", ["Traghetto per le Isole dei Principi (Kabataş / Bostancı)", "Foresta di Belgrado", "Spiaggia di Kilyos", "Şile", "Polonezköy", "Riva"]]
    ],
    otherL: "Altri luoghi", otherPh: "Qualsiasi indirizzo, ristorante o quartiere di Istanbul",
    durL: "Durata", durs: ["Mezza giornata (4–5 ore)", "Giornata intera (8–10 ore)", "Sera (3–4 ore)", "Più giorni", "Non so ancora"],
    carL: "Veicolo", dateL: "Data", paxL: "Passeggeri", pickL: "Ritiro", pickPh: "Hotel, indirizzo, aeroporto o porto crociere",
    send: "Invia il percorso su WhatsApp", note: "WhatsApp si apre con la lista pronta da inviare. Non si prenota nulla finché non confermi il prezzo.",
    wa: { intro: "Buongiorno, vorrei un tour privato di Istanbul con autista.", stops: "Luoghi", other: "Inoltre", dur: "Durata", car: "Veicolo", date: "Data", pax: "Passeggeri", pick: "Ritiro" },
    inclH: "Incluso nel prezzo", incl: ["Auto privata e autista professionista per le ore prenotate", "Carburante, pedaggi di ponti e autostrade, parcheggio", "Attesa a ogni tappa", "Ritiro e rientro in hotel o a qualsiasi indirizzo di Istanbul", "Modifiche al percorso durante la giornata, entro le tue ore"],
    exclH: "Non incluso", excl: ["Biglietti d'ingresso a musei e palazzi", "Pasti e bevande", "Una guida abilitata (su richiesta)", "Biglietti del traghetto, ad esempio per le Isole dei Principi"],
    faq: [
      ["Posso davvero andare ovunque?", "Sì, ovunque a Istanbul, sulla sponda europea e su quella asiatica. Indicaci i luoghi, o solo che tipo di giornata desideri, e costruiamo il percorso insieme."],
      ["Posso cambiare programma durante la giornata?", "Sì. Dillo all'autista; le tappe in più vanno bene entro le ore prenotate. Se la giornata si allunga, le ore extra si pagano alla tariffa concordata."],
      ["Possiamo visitare le Isole dei Principi?", "Sulle isole non sono ammesse auto. L'autista ti porta al traghetto a Kabataş o Bostancı e ti riprende al ritorno, oppure nel frattempo fa altre tappe."],
      ["Il tour può partire dall'aeroporto o dal porto crociere?", "Sì. Ti prendiamo all'aeroporto di Istanbul, a Sabiha Gökçen o a Galataport, ti mostriamo la città con i bagagli in auto e ti lasciamo in hotel."],
      ["Il prezzo è a persona?", "No, è per auto: fino a 3 persone in berlina, 6 in Classe V, 6 in minivan e 13 in minibus."]
    ]
  },
  nl: {
    freeH: "Ga in Istanbul waar je maar wilt",
    free: [
      "Er is geen vast programma. Auto en chauffeur zijn de hele dag van jou: jij kiest waarheen, in welke volgorde en hoe lang je blijft. Een moskee waarover je las, de wijk van vrienden, een visrestaurant aan de Bosporus, een winkelcentrum of een uitzichtpunt aan de Aziatische kant.",
      "Stuur ons je lijst of vraag ons een route voor te stellen. Je kunt op de dag zelf stops toevoegen of wijzigen; de chauffeur past de route aan en zegt het als een wijziging meer tijd kost."
    ],
    plansH: "Voorbeelddagen om mee te beginnen",
    plansLead: "Neem er één zoals hij is, combineer er twee of stuur ons je eigen plan.",
    plans: [
      ["Oude stad", "Halve dag · 4–5 uur", "Hagia Sophia, de Blauwe Moskee, de Basilica-cisterne en de Grote Bazaar. De chauffeur zet je af bij de ingang en wacht in de buurt."],
      ["Twee continenten", "Hele dag · 8–10 uur", "Sultanahmet, het Dolmabahçepaleis, Ortaköy, over de Bosporusbrug naar de Çamlıca-heuvel, het Beylerbeyipaleis en terug langs de Aziatische oever."],
      ["Bosporusdorpen en winkelen", "6–8 uur", "Bebek, het Rumeli-fort, het Emirganpark, een lange lunch in Sarıyer en de middag in Istinye Park of Nişantaşı."],
      ["Istanbul bij nacht", "Avond · 3–4 uur", "De Galatatoren en de İstiklalstraat, dineren waar je wilt, daarna de lichtjes van de stad vanaf de Çamlıca-heuvel of Ortaköy."]
    ],
    planH: "Stel je eigen route samen",
    planLead: "Vink de plekken aan die je wilt zien, voeg alles toe wat je nog meer in Istanbul wilt bezoeken en stuur de lijst via WhatsApp. We antwoorden met een route en een vaste prijs.",
    groups: [
      ["Oude stad", ["Hagia Sophia", "Blauwe Moskee", "Topkapıpaleis", "Basilica-cisterne", "Grote Bazaar", "Egyptische Bazaar", "Süleymaniye-moskee"]],
      ["Galata en Beyoğlu", ["Galatatoren", "İstiklalstraat", "Taksimplein", "Karaköy en Galataport", "Balat en Fener", "Pierre Loti-heuvel"]],
      ["Bosporus, Europese oever", ["Dolmabahçepaleis", "Ortaköy", "Bebek", "Rumeli-fort", "Emirganpark", "Sarıyer"]],
      ["Aziatische kant", ["Çamlıca-heuvel", "Üsküdar en de Leandertoren", "Beylerbeyipaleis", "Kadıköy", "Moda", "Bağdatstraat"]],
      ["Winkelen", ["Istinye Park", "Zorlu Center", "Kanyon", "Emaar Square Mall", "Mall of Istanbul", "Nişantaşı"]],
      ["Natuur en verder weg", ["Veerboot naar de Prinseneilanden (Kabataş / Bostancı)", "Belgradobos", "Strand van Kilyos", "Şile", "Polonezköy", "Riva"]]
    ],
    otherL: "Andere plekken", otherPh: "Elk adres, restaurant of elke wijk in Istanbul",
    durL: "Hoe lang", durs: ["Halve dag (4–5 uur)", "Hele dag (8–10 uur)", "Avond (3–4 uur)", "Meerdere dagen", "Weet ik nog niet"],
    carL: "Auto", dateL: "Datum", paxL: "Personen", pickL: "Ophalen bij", pickPh: "Hotel, adres, luchthaven of cruisehaven",
    send: "Stuur mijn route via WhatsApp", note: "WhatsApp opent met je lijst klaar om te versturen. Er is niets geboekt tot je de prijs bevestigt.",
    wa: { intro: "Hallo, ik wil graag een privé-stadstour met chauffeur in Istanbul.", stops: "Plekken", other: "Ook", dur: "Duur", car: "Auto", date: "Datum", pax: "Personen", pick: "Ophalen" },
    inclH: "Inbegrepen in de prijs", incl: ["Privéauto en professionele chauffeur voor de geboekte uren", "Brandstof, brug- en snelwegtol, parkeren", "Wachten bij elke stop", "Ophalen en terugbrengen bij je hotel of elk adres in Istanbul", "Routewijzigingen op de dag zelf, binnen je uren"],
    exclH: "Niet inbegrepen", excl: ["Toegangskaarten voor musea en paleizen", "Eten en drinken", "Een erkende gids (op verzoek te regelen)", "Veerboottickets, bijvoorbeeld naar de Prinseneilanden"],
    faq: [
      ["Kan ik echt overal heen?", "Ja, overal binnen Istanbul, aan de Europese en de Aziatische kant. Noem ons de plekken, of gewoon wat voor dag je wilt, en we maken de route samen met je."],
      ["Kan ik het plan op de dag zelf wijzigen?", "Ja. Zeg het tegen de chauffeur; extra stops zijn geen probleem binnen je geboekte uren. Loopt de dag uit, dan gelden voor extra uren de afgesproken tarieven."],
      ["Kunnen we naar de Prinseneilanden?", "Op de eilanden zijn geen auto's toegestaan. De chauffeur brengt je naar de veerboot in Kabataş of Bostancı en haalt je bij terugkomst op, of rijdt tussendoor andere stops."],
      ["Kan de tour op de luchthaven of in de cruisehaven beginnen?", "Ja. We halen je op bij Istanbul Airport, Sabiha Gökçen of Galataport, laten je de stad zien met je bagage in de auto en zetten je af bij je hotel."],
      ["Is de prijs per persoon?", "Nee, per auto: tot 3 personen in een sedan, 6 in een V-Klasse, 6 in een minivan en 13 in een minibus."]
    ]
  },
  ar: {
    freeH: "تجوّل في أي مكان تريده في إسطنبول",
    free: [
      "لا يوجد برنامج ثابت. السيارة والسائق لك طوال اليوم: أنت تختار إلى أين تذهب وبأي ترتيب وكم تبقى. مسجد قرأت عنه، أو حيّ يسكنه أصدقاؤك، أو مطعم سمك على البوسفور، أو مركز تسوق، أو نقطة إطلالة على الجانب الآسيوي.",
      "أرسل لنا قائمتك أو اطلب منا اقتراح مسار. يمكنك إضافة محطات أو تغييرها في اليوم نفسه؛ يعدّل السائق المسار ويخبرك إن كان التغيير يحتاج وقتاً أطول."
    ],
    plansH: "أيام نموذجية للبدء",
    plansLead: "اختر واحداً كما هو، أو اجمع بين اثنين، أو أرسل لنا خطتك.",
    plans: [
      ["المدينة القديمة", "نصف يوم · 4–5 ساعات", "آيا صوفيا والجامع الأزرق وصهريج البازيليك والبازار الكبير. يوصلك السائق إلى المدخل وينتظر بالقرب."],
      ["قارّتان", "يوم كامل · 8–10 ساعات", "السلطان أحمد وقصر دولمة بهجة وأورتاكوي، ثم عبر جسر البوسفور إلى تلة تشاملجا وقصر بيلربيي والعودة على الساحل الآسيوي."],
      ["قرى البوسفور والتسوق", "6–8 ساعات", "بيبك وقلعة روملي حصار وحديقة أميرجان، وغداء طويل في صاريير، ثم فترة العصر في إستينيا بارك أو نيشانتاشي."],
      ["إسطنبول ليلاً", "مساءً · 3–4 ساعات", "برج غلطة وشارع الاستقلال، وعشاء حيث تشاء، ثم أضواء المدينة من تلة تشاملجا أو أورتاكوي."]
    ],
    planH: "خطّط مسارك بنفسك",
    planLead: "اختر الأماكن التي تريد رؤيتها، وأضف أي مكان آخر في إسطنبول، وأرسل القائمة إلينا عبر واتساب. نرد عليك بمسار وسعر ثابت.",
    groups: [
      ["المدينة القديمة", ["آيا صوفيا", "الجامع الأزرق", "قصر توبكابي", "صهريج البازيليك", "البازار الكبير", "البازار المصري", "جامع السليمانية"]],
      ["غلطة وبيوغلو", ["برج غلطة", "شارع الاستقلال", "ميدان تقسيم", "كاراكوي وغلطة بورت", "بلاط والفنار", "تلة بيير لوتي"]],
      ["البوسفور، الجانب الأوروبي", ["قصر دولمة بهجة", "أورتاكوي", "بيبك", "قلعة روملي حصار", "حديقة أميرجان", "صاريير"]],
      ["الجانب الآسيوي", ["تلة تشاملجا", "أسكودار وبرج الفتاة", "قصر بيلربيي", "كاديكوي", "مودا", "شارع بغداد"]],
      ["التسوق", ["إستينيا بارك", "زورلو سنتر", "كانيون", "إعمار سكوير مول", "مول أوف إسطنبول", "نيشانتاشي"]],
      ["الطبيعة وخارج المركز", ["عبّارة جزر الأميرات (كاباتاش / بوستانجي)", "غابة بلغراد", "شاطئ كيليوس", "شيلي", "بولونيزكوي", "ريفا"]]
    ],
    otherL: "أماكن أخرى", otherPh: "أي عنوان أو مطعم أو حيّ في إسطنبول",
    durL: "المدة", durs: ["نصف يوم (4–5 ساعات)", "يوم كامل (8–10 ساعات)", "مساءً (3–4 ساعات)", "عدة أيام", "لم أقرر بعد"],
    carL: "السيارة", dateL: "التاريخ", paxL: "عدد الركاب", pickL: "مكان الاستقبال", pickPh: "فندق أو عنوان أو مطار أو ميناء سياحي",
    send: "أرسل مساري عبر واتساب", note: "يفتح واتساب وقائمتك جاهزة للإرسال. لا يتم أي حجز قبل أن تؤكد السعر.",
    wa: { intro: "مرحباً، أرغب في جولة خاصة في إسطنبول مع سائق.", stops: "الأماكن", other: "أيضاً", dur: "المدة", car: "السيارة", date: "التاريخ", pax: "الركاب", pick: "الاستقبال" },
    inclH: "يشمل السعر", incl: ["سيارة خاصة وسائق محترف طوال الساعات المحجوزة", "الوقود ورسوم الجسور والطرق السريعة والمواقف", "الانتظار عند كل محطة", "الاستقبال والإيصال من فندقك أو أي عنوان في إسطنبول", "تغيير المسار في اليوم نفسه ضمن ساعاتك"],
    exclH: "لا يشمل", excl: ["تذاكر دخول المتاحف والقصور", "الطعام والمشروبات", "مرشد سياحي مرخّص (يمكن ترتيبه عند الطلب)", "تذاكر العبّارات، مثل جزر الأميرات"],
    faq: [
      ["هل يمكنني فعلاً الذهاب إلى أي مكان؟", "نعم، إلى أي مكان داخل إسطنبول على الجانبين الأوروبي والآسيوي. أخبرنا بالأماكن أو بنوع اليوم الذي تريده، ونخطط المسار معك."],
      ["هل يمكنني تغيير الخطة في اليوم نفسه؟", "نعم. أخبر السائق؛ المحطات الإضافية لا مشكلة فيها ضمن الساعات المحجوزة. وإذا طال اليوم تُحسب الساعات الإضافية بالسعر المتفق عليه."],
      ["هل يمكننا زيارة جزر الأميرات؟", "لا يُسمح بالسيارات في الجزر. يوصلك السائق إلى العبّارة في كاباتاش أو بوستانجي ويستقبلك عند عودتك، أو يكمل مشاوير أخرى في الأثناء."],
      ["هل يمكن أن تبدأ الجولة من المطار أو الميناء السياحي؟", "نعم. نستقبلك في مطار إسطنبول أو صبيحة كوكجن أو غلطة بورت، ونريك المدينة وأمتعتك في السيارة، ثم نوصلك إلى فندقك."],
      ["هل السعر للشخص الواحد؟", "لا، السعر للسيارة: حتى 3 أشخاص في السيدان، و6 في الفئة V، و6 في الميني فان، و13 في الميني باص."]
    ]
  }
};
