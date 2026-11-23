// Taxi from a district to the airport ("Taksim to Istanbul Airport taxi"): the trip home, searched for on its own
// by travellers leaving Istanbul. One page per district below and airport, in every site language.
// The price is the same both ways (data/pricing.json); there is no busy-hour surcharge, since the pickup is not
// at the airport. {leave}/{leaveDom}: hours before an international/domestic flight to leave, worked out in build.js
// from the drive time (3 or 2 hours at the airport, as the FAQ says, plus the drive with a fifth more for traffic).
const FROM = ["sultanahmet", "taksim", "karakoy", "galataport", "besiktas", "sisli", "kadikoy"];

const T = {
  en: {
    path: (z, a) => `/${z}-to-${a === "IST" ? "istanbul-airport" : "sabiha-gokcen-airport"}-taxi`,
    title: "{from} to {to} Taxi · Fixed €{price} per Car",
    desc: "Taxi from {from} to {to}: fixed €{price} per car, {km} km, about {min} min. Hotel pickup at your time, tolls included, pay the driver in cash.",
    h1: "{from} to {to} taxi",
    answer: "A private taxi from {fromLong} to {toLong} costs a fixed <strong>€{price} per car</strong> in a sedan for up to 3 passengers. The {km} km drive takes about {min} minutes outside rush hour. The driver picks you up at your hotel, tolls are included and you pay in cash at the airport.",
    leaveH: "When to leave {from} for your flight",
    leave: "For an international flight from {toLong}, book your pickup about <strong>{leave} hours</strong> before departure: 3 hours at the airport plus the drive with some room for traffic. For a domestic flight about {leaveDom} hours is enough. Weekday mornings (7–10) and evenings (16–20) are the slowest; the price stays the same.",
    pickupH: "Pickup and drop-off",
    pickup: "Your driver comes to the entrance of your hotel or address in {from} at the time you booked and waits 15 minutes free. Large luggage goes in the boot; for more than 3 suitcases choose the minivan or the V-Class.",
    drop: { IST: "At Istanbul Airport the car stops on the departures level, at the door closest to your airline's check-in rows.", SAW: "At Sabiha Gökçen the car stops at the departures entrance; international and domestic flights leave from the same terminal building." },
    ret: "Booking both ways? A return transfer is {ret}% off.",
    faq: [
      ["How much is a taxi from {from} to {to}?", "With us it is a fixed €{price} per car in a sedan, €{van} in a minivan for up to 6, €{vclass} in a Mercedes V-Class and €{bus} in a minibus for up to 13. Tolls are included."],
      ["How early should I leave {from} for {to}?", "About {leave} hours before an international flight and {leaveDom} hours before a domestic one. The drive is {km} km, about {min} minutes without traffic."],
      ["Can I book a taxi to the airport for very early in the morning?", "Yes. We drive 24 hours a day, so a 3 or 4 am pickup costs the same fixed price."],
      ["How do I pay?", "In cash to the driver at the airport, in EUR, USD or TRY. Nothing is paid when you book, and cancellation is free up to 24 hours before pickup."]
    ],
    otherH: "Other taxis to {to}", fwd: "Arriving: {to} to {from} taxi", hubH: "Taxis to {to} from your hotel", home: "Flying home? {from} to {to} taxi"
  },
  tr: {
    path: (z, a) => `/tr/${z}-${a === "IST" ? "istanbul-havalimani" : "sabiha-gokcen"}-taksi`,
    title: "{from} – {to} Taksi · Araç Başı Sabit €{price}",
    desc: "{from} – {to} taksi: araç başı sabit €{price}, {km} km, yaklaşık {min} dk. Otelden istediğiniz saatte alış, otoyol dahil, şoföre nakit ödeme.",
    h1: "{from} – {to} taksi",
    answer: "{fromLong} – {toLong} özel taksi, 3 yolcuya kadar sedan ile araç başı sabit <strong>€{price}</strong> tutar. {km} km'lik yol, yoğun saatler dışında yaklaşık {min} dakika sürer. Şoför sizi otelinizden alır, köprü-otoyol dahildir ve havalimanında nakit ödersiniz.",
    leaveH: "Uçuşunuz için {from} çıkışı ne zaman olmalı",
    leave: "{toLong} dış hat uçuşu için alış saatinizi kalkıştan yaklaşık <strong>{leave} saat</strong> önceye ayırtın: havalimanında 3 saat, üstüne trafik payıyla yol süresi. İç hat uçuşu için yaklaşık {leaveDom} saat yeterlidir. Hafta içi sabah (7–10) ve akşam (16–20) trafik en yoğundur; fiyat değişmez.",
    pickupH: "Alış ve bırakış",
    pickup: "Şoförünüz {from} bölgesindeki otelinizin ya da adresinizin kapısına ayırttığınız saatte gelir ve 15 dakika ücretsiz bekler. Büyük bavullar bagaja konur; 3'ten fazla bavul için minivan ya da V-Class seçin.",
    drop: { IST: "İstanbul Havalimanı'nda araç dış hatlar gidiş katında, havayolunuzun check-in sıralarına en yakın kapıda durur.", SAW: "Sabiha Gökçen'de araç gidiş girişinde durur; dış hat ve iç hat uçuşları aynı terminal binasından kalkar." },
    ret: "Gidiş-dönüş mü ayırtıyorsunuz? Dönüş transferi %{ret} indirimli.",
    faq: [
      ["{from} – {to} taksi ne kadar?", "Bizimle sedan araç başı sabit €{price}, 6 kişilik minivan €{van}, Mercedes V-Class €{vclass} ve 13 kişilik minibüs €{bus}. Köprü-otoyol dahildir."],
      ["{from} çıkışlı {to} taksisi uçuştan ne kadar önce olmalı?", "Dış hat uçuşundan yaklaşık {leave} saat, iç hat uçuşundan {leaveDom} saat önce. Yol {km} km, trafiksiz yaklaşık {min} dakika."],
      ["Sabahın çok erken saati için havalimanı taksisi ayırtabilir miyim?", "Evet. 24 saat çalışıyoruz; gece 3 ya da 4'te alış da aynı sabit fiyattır."],
      ["Nasıl öderim?", "Havalimanında şoföre nakit; EUR, USD ya da TL. Rezervasyonda ödeme yoktur, alıştan 24 saat öncesine kadar iptal ücretsizdir."]
    ],
    otherH: "{to} için diğer taksiler", fwd: "Varış: {to} – {from} taksi", hubH: "Otelinizden {to} taksisi", home: "Dönüş uçuşu mu? {from} – {to} taksi"
  },
  ru: {
    path: (z, a) => `/ru/taksi-${z}-${a === "IST" ? "aeroport-stambula" : "sabiha-gokchen"}`,
    title: "Такси {from} — {to} · €{price} за машину",
    desc: "Такси {from} — {to}: фиксированная цена €{price} за машину, {km} км, около {min} мин. Подача к отелю в нужное время, оплата водителю наличными.",
    h1: "Такси {from} — {to}",
    answer: "Индивидуальное такси {fromLong} — {toLong} стоит фиксированные <strong>€{price} за машину</strong> (седан до 3 пассажиров). Дорога {km} км занимает около {min} минут вне часа пик. Водитель забирает вас у отеля, платные дороги включены, оплата наличными в аэропорту.",
    leaveH: "Когда выезжать из района {from} на рейс",
    leave: "На международный рейс из аэропорта {toLong} заказывайте подачу примерно за <strong>{leave} ч</strong> до вылета: 3 часа в аэропорту плюс дорога с запасом на пробки. На внутренний рейс хватит около {leaveDom} ч. Медленнее всего по будням утром (7–10) и вечером (16–20); цена не меняется.",
    pickupH: "Подача и высадка",
    pickup: "Водитель приезжает ко входу вашего отеля или по адресу в районе {from} в заказанное время и бесплатно ждёт 15 минут. Крупный багаж едет в багажнике; если чемоданов больше 3, выберите минивэн или V-Class.",
    drop: { IST: "В аэропорту Стамбула машина останавливается на этаже вылета, у входа ближе всего к стойкам регистрации вашей авиакомпании.", SAW: "В Сабиха Гёкчен машина останавливается у входа в зону вылета; международные и внутренние рейсы улетают из одного терминала." },
    ret: "Едете в обе стороны? Обратный трансфер на {ret}% дешевле.",
    faq: [
      ["Сколько стоит такси {from} — {to}?", "У нас фиксированно за машину: €{price} седан, €{van} минивэн до 6 человек, €{vclass} Mercedes V-Class и €{bus} микроавтобус до 13. Платные дороги включены."],
      ["За сколько выезжать из района {from}?", "Примерно за {leave} ч до международного рейса и за {leaveDom} ч до внутреннего. Дорога {km} км, около {min} минут без пробок."],
      ["Можно заказать такси в аэропорт рано утром?", "Да. Мы работаем круглосуточно, подача в 3 или 4 часа утра стоит ту же фиксированную цену."],
      ["Как оплатить?", "Наличными водителю в аэропорту: EUR, USD или TRY. При бронировании ничего не платите, отмена бесплатна за 24 часа до подачи."]
    ],
    otherH: "Другие такси: {to}", fwd: "Прилёт: такси {to} — {from}", hubH: "Такси от отеля: {to}", home: "Улетаете? Такси {from} — {to}"
  },
  de: {
    path: (z, a) => `/de/taxi-${z}-${a === "IST" ? "flughafen-istanbul" : "sabiha-goekcen"}`,
    title: "Taxi {from} – {to} · Festpreis €{price} pro Auto",
    desc: "Taxi von {from} nach {to}: Festpreis €{price} pro Auto, {km} km, etwa {min} Min. Abholung am Hotel zur gewünschten Zeit, Barzahlung beim Fahrer.",
    h1: "Taxi von {from} nach {to}",
    answer: "Ein privates Taxi von {fromLong} nach {toLong} kostet einen Festpreis von <strong>€{price} pro Auto</strong> in einer Limousine für bis zu 3 Personen. Die {km} km dauern außerhalb der Stoßzeiten etwa {min} Minuten. Der Fahrer holt Sie am Hotel ab, Maut ist inklusive und Sie zahlen bar am Flughafen.",
    leaveH: "Wann Sie in {from} losfahren sollten",
    leave: "Für einen internationalen Flug ab {toLong} buchen Sie die Abholung etwa <strong>{leave} Stunden</strong> vor Abflug: 3 Stunden am Flughafen plus die Fahrt mit Puffer für den Verkehr. Für einen Inlandsflug reichen etwa {leaveDom} Stunden. Am langsamsten ist es werktags morgens (7–10) und abends (16–20); der Preis bleibt gleich.",
    pickupH: "Abholung und Ankunft",
    pickup: "Ihr Fahrer kommt zur gebuchten Zeit an den Eingang Ihres Hotels oder Ihrer Adresse in {from} und wartet 15 Minuten kostenlos. Großes Gepäck kommt in den Kofferraum; bei mehr als 3 Koffern wählen Sie den Minivan oder die V-Klasse.",
    drop: { IST: "Am Flughafen Istanbul hält das Auto auf der Abflugebene, an der Tür, die den Check-in-Schaltern Ihrer Airline am nächsten ist.", SAW: "In Sabiha Gökçen hält das Auto am Abflugeingang; internationale und Inlandsflüge starten im selben Terminalgebäude." },
    ret: "Hin und zurück? Der Rücktransfer kostet {ret}% weniger.",
    faq: [
      ["Was kostet ein Taxi von {from} nach {to}?", "Bei uns pro Auto zum Festpreis: €{price} Limousine, €{van} Minivan bis 6 Personen, €{vclass} Mercedes V-Klasse und €{bus} Minibus bis 13. Maut inklusive."],
      ["Wie früh sollte ich in {from} losfahren?", "Etwa {leave} Stunden vor einem internationalen und {leaveDom} Stunden vor einem Inlandsflug. Die Strecke ist {km} km lang, ohne Verkehr etwa {min} Minuten."],
      ["Kann ich ein Taxi zum Flughafen für sehr früh morgens buchen?", "Ja. Wir fahren rund um die Uhr; eine Abholung um 3 oder 4 Uhr kostet denselben Festpreis."],
      ["Wie bezahle ich?", "Bar beim Fahrer am Flughafen, in EUR, USD oder TRY. Bei der Buchung zahlen Sie nichts, die Stornierung ist bis 24 Stunden vorher kostenlos."]
    ],
    otherH: "Weitere Taxis nach {to}", fwd: "Ankunft: Taxi {to} – {from}", hubH: "Vom Hotel nach {to}: Taxipreise", home: "Rückflug? Taxi {from} – {to}"
  },
  fr: {
    path: (z, a) => `/fr/taxi-${z}-${a === "IST" ? "aeroport-istanbul" : "aeroport-sabiha-gokcen"}`,
    title: "Taxi {from} – {to} · {price} € fixe par auto",
    desc: "Taxi de {from} à {to} : prix fixe {price} € par véhicule, {km} km, environ {min} min. Prise en charge à l'hôtel à l'heure choisie, paiement en espèces.",
    h1: "Taxi de {from} à {to}",
    answer: "Un taxi privé de {fromLong} à {toLong} coûte un prix fixe de <strong>{price} € par véhicule</strong> en berline jusqu'à 3 passagers. Les {km} km prennent environ {min} minutes hors heures de pointe. Le chauffeur vient vous chercher à l'hôtel, les péages sont inclus et vous payez en espèces à l'aéroport.",
    leaveH: "Quand partir de {from} pour votre vol",
    leave: "Pour un vol international depuis {toLong}, réservez la prise en charge environ <strong>{leave} heures</strong> avant le départ : 3 heures à l'aéroport plus le trajet avec une marge pour la circulation. Pour un vol intérieur, environ {leaveDom} heures suffisent. Les matins (7 h–10 h) et soirs (16 h–20 h) de semaine sont les plus lents ; le prix ne change pas.",
    pickupH: "Prise en charge et dépose",
    pickup: "Votre chauffeur se présente à l'entrée de votre hôtel ou adresse à {from} à l'heure réservée et attend 15 minutes gratuitement. Les grandes valises vont dans le coffre ; au-delà de 3 valises, choisissez le minivan ou le Classe V.",
    drop: { IST: "À l'aéroport d'Istanbul, la voiture s'arrête au niveau des départs, à la porte la plus proche des comptoirs de votre compagnie.", SAW: "À Sabiha Gökçen, la voiture s'arrête à l'entrée des départs ; vols internationaux et intérieurs partent du même terminal." },
    ret: "Aller-retour ? Le transfert retour est à -{ret} %.",
    faq: [
      ["Combien coûte un taxi de {from} à {to} ?", "Chez nous, prix fixe par véhicule : {price} € en berline, {van} € en minivan jusqu'à 6, {vclass} € en Mercedes Classe V et {bus} € en minibus jusqu'à 13. Péages inclus."],
      ["À quelle heure partir de {from} ?", "Environ {leave} heures avant un vol international et {leaveDom} heures avant un vol intérieur. Le trajet fait {km} km, environ {min} minutes sans circulation."],
      ["Puis-je réserver un taxi pour l'aéroport très tôt le matin ?", "Oui. Nous roulons 24 h/24 ; une prise en charge à 3 h ou 4 h du matin coûte le même prix fixe."],
      ["Comment payer ?", "En espèces au chauffeur à l'aéroport, en EUR, USD ou TRY. Rien n'est payé à la réservation et l'annulation est gratuite jusqu'à 24 heures avant."]
    ],
    otherH: "Autres taxis vers {to}", fwd: "Arrivée : taxi {to} – {from}", hubH: "De votre hôtel à {to} : taxis", home: "Vol retour ? Taxi {from} – {to}"
  },
  it: {
    path: (z, a) => `/it/taxi-da-${z}-${a === "IST" ? "aeroporto-istanbul" : "aeroporto-sabiha-gokcen"}`,
    title: "Taxi {from} – {to} · €{price} fisso per auto",
    desc: "Taxi da {from} a {to}: prezzo fisso €{price} per auto, {km} km, circa {min} min. Ritiro in hotel all'ora scelta, pedaggi inclusi, pagamento in contanti.",
    h1: "Taxi da {from} a {to}",
    answer: "Un taxi privato da {fromLong} a {toLong} costa un prezzo fisso di <strong>€{price} per auto</strong> in berlina fino a 3 passeggeri. I {km} km richiedono circa {min} minuti fuori dall'ora di punta. L'autista ti prende in hotel, i pedaggi sono inclusi e paghi in contanti in aeroporto.",
    leaveH: "Quando partire da {from} per il volo",
    leave: "Per un volo internazionale da {toLong} prenota il ritiro circa <strong>{leave} ore</strong> prima della partenza: 3 ore in aeroporto più il viaggio con margine per il traffico. Per un volo nazionale bastano circa {leaveDom} ore. Le mattine (7–10) e le sere (16–20) dei giorni feriali sono le più lente; il prezzo non cambia.",
    pickupH: "Ritiro e arrivo",
    pickup: "L'autista arriva all'ingresso del tuo hotel o indirizzo a {from} all'ora prenotata e aspetta 15 minuti gratis. Le valigie grandi vanno nel bagagliaio; con più di 3 valigie scegli il minivan o la Classe V.",
    drop: { IST: "All'aeroporto di Istanbul l'auto si ferma al piano partenze, alla porta più vicina ai banchi check-in della tua compagnia.", SAW: "A Sabiha Gökçen l'auto si ferma all'ingresso partenze; voli internazionali e nazionali partono dallo stesso terminal." },
    ret: "Andata e ritorno? Il transfer di ritorno è scontato del {ret}%.",
    faq: [
      ["Quanto costa un taxi da {from} a {to}?", "Con noi prezzo fisso per auto: €{price} berlina, €{van} minivan fino a 6, €{vclass} Mercedes Classe V e €{bus} minibus fino a 13. Pedaggi inclusi."],
      ["Quanto prima partire da {from}?", "Circa {leave} ore prima di un volo internazionale e {leaveDom} ore prima di uno nazionale. Il tragitto è di {km} km, circa {min} minuti senza traffico."],
      ["Posso prenotare un taxi per l'aeroporto molto presto al mattino?", "Sì. Lavoriamo 24 ore su 24; un ritiro alle 3 o alle 4 del mattino costa lo stesso prezzo fisso."],
      ["Come pago?", "In contanti all'autista in aeroporto, in EUR, USD o TRY. Alla prenotazione non paghi nulla e la cancellazione è gratuita fino a 24 ore prima."]
    ],
    otherH: "Altri taxi per {to}", fwd: "Arrivo: taxi {to} – {from}", hubH: "Dal tuo hotel a {to}: taxi", home: "Volo di ritorno? Taxi {from} – {to}"
  },
  nl: {
    path: (z, a) => `/nl/taxi-${z}-naar-${a === "IST" ? "luchthaven-istanbul" : "sabiha-gokcen"}`,
    title: "Taxi {from} – {to} · vaste prijs €{price} per auto",
    desc: "Taxi van {from} naar {to}: vaste prijs €{price} per auto, {km} km, ongeveer {min} min. Ophalen bij je hotel op jouw tijd, tol inbegrepen, contant betalen.",
    h1: "Taxi van {from} naar {to}",
    answer: "Een privétaxi van {fromLong} naar {toLong} kost een vaste <strong>€{price} per auto</strong> in een sedan voor maximaal 3 passagiers. De {km} km duren buiten de spits ongeveer {min} minuten. De chauffeur haalt je op bij je hotel, tol is inbegrepen en je betaalt contant op de luchthaven.",
    leaveH: "Wanneer vertrekken uit {from} voor je vlucht",
    leave: "Voor een internationale vlucht vanaf {toLong} boek je de ophaaltijd ongeveer <strong>{leave} uur</strong> voor vertrek: 3 uur op de luchthaven plus de rit met wat ruimte voor verkeer. Voor een binnenlandse vlucht is ongeveer {leaveDom} uur genoeg. Doordeweekse ochtenden (7–10) en avonden (16–20) zijn het traagst; de prijs blijft gelijk.",
    pickupH: "Ophalen en afzetten",
    pickup: "Je chauffeur komt op de geboekte tijd naar de ingang van je hotel of adres in {from} en wacht 15 minuten gratis. Grote koffers gaan in de kofferbak; neem bij meer dan 3 koffers de minivan of de V-Klasse.",
    drop: { IST: "Op luchthaven Istanbul stopt de auto op de vertrekverdieping, bij de deur het dichtst bij de incheckbalies van je maatschappij.", SAW: "Op Sabiha Gökçen stopt de auto bij de vertrekingang; internationale en binnenlandse vluchten vertrekken uit hetzelfde terminalgebouw." },
    ret: "Heen en terug? De terugrit is {ret}% goedkoper.",
    faq: [
      ["Wat kost een taxi van {from} naar {to}?", "Bij ons een vaste prijs per auto: €{price} sedan, €{van} minivan tot 6, €{vclass} Mercedes V-Klasse en €{bus} minibus tot 13. Tol inbegrepen."],
      ["Hoe vroeg moet ik uit {from} vertrekken?", "Ongeveer {leave} uur voor een internationale en {leaveDom} uur voor een binnenlandse vlucht. De rit is {km} km, ongeveer {min} minuten zonder verkeer."],
      ["Kan ik een taxi naar de luchthaven heel vroeg in de ochtend boeken?", "Ja. We rijden 24 uur per dag; ophalen om 3 of 4 uur 's nachts kost dezelfde vaste prijs."],
      ["Hoe betaal ik?", "Contant aan de chauffeur op de luchthaven, in EUR, USD of TRY. Bij het boeken betaal je niets en annuleren is gratis tot 24 uur vooraf."]
    ],
    otherH: "Andere taxi's naar {to}", fwd: "Aankomst: taxi {to} – {from}", hubH: "Van je hotel naar {to}: taxi's", home: "Terugvlucht? Taxi {from} – {to}"
  },
  ar: {
    path: (z, a) => `/ar/taxi-min-${z}-ila-${a === "IST" ? "matar-istanbul" : "sabiha-gokcen"}`,
    title: "تاكسي من {from} إلى {to} · €{price} ثابت للسيارة",
    desc: "تاكسي من {from} إلى {to}: سعر ثابت €{price} للسيارة، {km} كم، نحو {min} دقيقة. استلام من الفندق في الوقت الذي تختاره، والدفع نقداً للسائق.",
    h1: "تاكسي من {from} إلى {to}",
    answer: "التاكسي الخاص من {fromLong} إلى {toLong} يكلّف سعراً ثابتاً قدره <strong>€{price}</strong> للسيارة بسيارة سيدان حتى 3 ركاب. المسافة {km} كم وتستغرق نحو {min} دقيقة خارج أوقات الذروة. يستلمك السائق من فندقك، وتشمل الرسوم الطرق، وتدفع نقداً في المطار.",
    leaveH: "متى تغادر {from} إلى رحلتك",
    leave: "للرحلة الدولية من {toLong} احجز موعد الاستلام قبل الإقلاع بنحو <strong>{leave} ساعات</strong>: 3 ساعات في المطار إضافة إلى الطريق مع هامش للزحام. وللرحلة الداخلية تكفي نحو {leaveDom} ساعات. أبطأ الأوقات صباح أيام الأسبوع (7–10) ومساؤها (16–20)، والسعر لا يتغير.",
    pickupH: "الاستلام والوصول",
    pickup: "يصل سائقك إلى مدخل فندقك أو عنوانك في {from} في الموعد المحجوز وينتظر 15 دقيقة مجاناً. الحقائب الكبيرة توضع في الصندوق، ولأكثر من 3 حقائب اختر الميني فان أو V-Class.",
    drop: { IST: "في مطار إسطنبول تتوقف السيارة في طابق المغادرة، عند الباب الأقرب لمكاتب تسجيل شركة طيرانك.", SAW: "في صبيحة كوكجن تتوقف السيارة عند مدخل المغادرة، والرحلات الدولية والداخلية تغادر من مبنى الركاب نفسه." },
    ret: "ذهاب وعودة؟ خصم {ret}% على رحلة العودة.",
    faq: [
      ["كم سعر التاكسي من {from} إلى {to}؟", "معنا السعر ثابت للسيارة: €{price} للسيدان، و€{van} للميني فان لستة ركاب، و€{vclass} لمرسيدس V-Class، و€{bus} للميني باص لثلاثة عشر راكباً. رسوم الطرق مشمولة."],
      ["كم من الوقت قبل الرحلة أغادر {from}؟", "نحو {leave} ساعات قبل الرحلة الدولية و{leaveDom} ساعات قبل الداخلية. المسافة {km} كم، نحو {min} دقيقة بلا زحام."],
      ["هل أستطيع حجز تاكسي إلى المطار في الصباح الباكر جداً؟", "نعم. نعمل 24 ساعة، والاستلام في الثالثة أو الرابعة فجراً بالسعر الثابت نفسه."],
      ["كيف أدفع؟", "نقداً للسائق في المطار باليورو أو الدولار أو الليرة. لا تدفع شيئاً عند الحجز، والإلغاء مجاني حتى 24 ساعة قبل الموعد."]
    ],
    otherH: "سيارات أخرى إلى {to}", fwd: "الوصول: تاكسي من {to} إلى {from}", hubH: "من فندقك إلى {to}: سيارات تاكسي", home: "رحلة العودة؟ تاكسي من {from} إلى {to}"
  }
};

// hours to leave before the flight, rounded up to the half hour
const hours = (atAirport, min) => Math.ceil((atAirport + min * 1.2) / 30) / 2;

module.exports = { FROM, T, hours };
