// Fleet page: the four cars in detail (who each one suits, what fits in it, features, lowest price), a comparison
// table, prices on popular routes, what every ride includes and an FAQ. The home page keeps a short car section
// that links here, and the header's car link points here. Seats, suitcases, photos and model names come from
// data/pricing.json; {seat} (child seat €), {wait} (free waiting minutes) and {ret} (return discount %) from its rules.
module.exports = {
  en: {
    path: "/fleet", nav: "Our fleet",
    title: "Our Fleet: Sedan, Minivan, V-Class and Minibus · Istanbul Transfer",
    desc: "Four cars for your Istanbul transfer: sedan for 3, minivan for 7, Mercedes V-Class VIP for 6, minibus for 16. Luggage, features and fixed prices per car.",
    h1: "Our fleet: four cars for every group",
    lead: "From a sedan for two to a minibus for sixteen: every car comes with a professional driver, meet and greet at the airport and a fixed price per car, not per person.",
    pax: "passengers", bags: "suitcases", ideal: "Best for", from: "from", per: "per car, one way", book: "Book this car", popular: "Most booked",
    cmpH: "Compare the cars", cols: ["Car", "Passengers", "Suitcases", "Best for", "Price from"],
    pricesH: "Prices on popular routes", pricesLead: "Fixed one-way prices per car. Tolls, parking and waiting time are included.",
    inclH: "Included with every car",
    incl: [["Meet and greet", "Your driver waits in the arrivals hall with a sign with your name and helps with your luggage."], ["Flight tracking", "We follow your flight; the first {wait} minutes after landing are free."], ["Everything in the price", "Tolls, bridges, parking and waiting time are included. No meter, no surprises."], ["Pay at the end", "Pay the driver in cash in euros, dollars or lira. Free cancellation up to 24 hours before pickup."]],
    cars: {
      sedan: { ideal: "Solo travellers, couples and up to 3 people", desc: "A comfortable, air-conditioned saloon and the lowest fixed price on every route. The right choice when you travel light or as a couple.", feats: ["Up to 3 passengers and 3 suitcases", "Air-conditioned, non-smoking car", "Lowest price on every route", "Child seat on request (€{seat})"] },
      minivan: { ideal: "Families and small groups up to 7", desc: "Our most booked car: room for the whole family and its luggage, with sliding doors for easy boarding and a large boot for strollers and big suitcases.", feats: ["Up to 7 passengers and 7 suitcases", "Room for strollers, golf and ski bags", "Sliding doors, easy boarding", "Child seats on request (€{seat} each)"] },
      vclass: { ideal: "Business travel, VIP guests, families who want more space", desc: "The Mercedes-Benz V-Class in VIP fit-out: spacious seating, a quiet ride and a premium arrival for business trips, honeymoons and special guests.", feats: ["Up to 6 passengers and 6 suitcases", "Mercedes-Benz VIP interior", "Extra room and comfort for long rides", "Ideal for corporate guests and events"] },
      minibus: { ideal: "Groups of 8 to 16, tours and events", desc: "One vehicle for the whole group, so everyone arrives together. Ideal for friends travelling together, team trips, weddings and cruise groups.", feats: ["Up to 16 passengers and 16 suitcases", "One car, one price for the group", "Room for large and bulky luggage", "Also for city tours and events"] }
    },
    faq: [
      ["Which car should I choose?", "For 1–3 people a sedan, for 4–7 people a minivan (or the Mercedes V-Class for more comfort, up to 6), and for 8–16 people a minibus. For more than 16, book several cars or write to us on WhatsApp."],
      ["Is the price per person?", "No. The price is per car, whatever the number of passengers up to its capacity. Tolls, parking and waiting time are included."],
      ["Will I get exactly the model shown?", "You get the car class you booked. The models are examples; the exact make and colour may vary."],
      ["What if I have more luggage than listed?", "The numbers are for standard suitcases. With extra or bulky luggage (strollers, golf or ski bags), choose the next size up or tell us in the note."],
      ["Do you have child seats?", "Yes, baby and child seats are €{seat} each. Add them in the booking form and tell us the children's ages in the note."],
      ["Can I book a return with the same car?", "Yes. Tick \"add a return transfer\" in the search box and get {ret}% off the return."]
    ],
    ctaH: "Found your car?", ctaP: "See your fixed price and send your request in a minute.",
    more: "See all cars in detail"
  },
  tr: {
    path: "/tr/araclar", nav: "Araç filomuz",
    title: "Araç Filomuz: Sedan, Minivan, V-Class ve Minibüs · İstanbul Transfer",
    desc: "İstanbul transferiniz için dört araç: 3 kişilik sedan, 7 kişilik minivan, 6 kişilik V-Class VIP, 16 kişilik minibüs. Bagaj, özellikler ve araç başı sabit fiyat.",
    h1: "Araç filomuz: her gruba uygun dört araç",
    lead: "İki kişilik sedandan on altı kişilik minibüse kadar: her araç profesyonel şoför, havalimanında isimli karşılama ve kişi başı değil araç başı sabit fiyatla gelir.",
    pax: "yolcu", bags: "bavul", ideal: "Kimler için", from: "başlayan fiyat", per: "araç başı, tek yön", book: "Bu aracı ayırt", popular: "En çok tercih edilen",
    cmpH: "Araçları karşılaştırın", cols: ["Araç", "Yolcu", "Bavul", "Kimler için", "Başlayan fiyat"],
    pricesH: "Popüler güzergahlarda fiyatlar", pricesLead: "Araç başı tek yön sabit fiyatlar. Köprü-otoyol, otopark ve bekleme süresi dahildir.",
    inclH: "Her araçta dahil olanlar",
    incl: [["İsimli karşılama", "Şoförünüz geliş salonunda isminizin yazılı olduğu tabelayla bekler ve bavullarınıza yardım eder."], ["Uçuş takibi", "Uçuşunuzu takip ederiz; inişten sonraki ilk {wait} dakika ücretsizdir."], ["Her şey fiyata dahil", "Köprü, otoyol, otopark ve bekleme süresi dahildir. Taksimetre yok, sürpriz yok."], ["Sonunda ödeme", "Şoföre nakit euro, dolar veya lira ile ödersiniz. Alıştan 24 saat öncesine kadar iptal ücretsizdir."]],
    cars: {
      sedan: { ideal: "Tek kişi, çiftler ve 3 kişiye kadar", desc: "Konforlu, klimalı bir sedan ve her güzergahta en uygun sabit fiyat. Az bagajla ya da çift olarak seyahat ediyorsanız doğru seçim.", feats: ["3 yolcu ve 3 bavula kadar", "Klimalı, sigarasız araç", "Her güzergahta en uygun fiyat", "İsteğe bağlı çocuk koltuğu (€{seat})"] },
      minivan: { ideal: "Aileler ve 7 kişiye kadar küçük gruplar", desc: "En çok tercih edilen aracımız: tüm aile ve bagajı için yer, kolay biniş için sürgülü kapılar, bebek arabası ve büyük bavullar için geniş bagaj.", feats: ["7 yolcu ve 7 bavula kadar", "Bebek arabası, golf ve kayak çantası için yer", "Sürgülü kapılar, kolay biniş", "İsteğe bağlı çocuk koltuğu (tanesi €{seat})"] },
      vclass: { ideal: "İş seyahati, VIP misafirler, geniş alan isteyen aileler", desc: "VIP donanımlı Mercedes-Benz V-Class: geniş oturma alanı, sessiz sürüş; iş seyahati, balayı ve özel misafirler için prestijli bir karşılama.", feats: ["6 yolcu ve 6 bavula kadar", "Mercedes-Benz VIP iç donanım", "Uzun yolculuklarda ekstra alan ve konfor", "Kurumsal misafir ve etkinlikler için ideal"] },
      minibus: { ideal: "8–16 kişilik gruplar, turlar ve etkinlikler", desc: "Tüm grup için tek araç, herkes birlikte varır. Birlikte seyahat eden arkadaşlar, ekip gezileri, düğünler ve kruvaziyer grupları için ideal.", feats: ["16 yolcu ve 16 bavula kadar", "Grup için tek araç, tek fiyat", "Büyük ve hacimli bagaj için yer", "Şehir turu ve etkinlikler için de"] }
    },
    faq: [
      ["Hangi aracı seçmeliyim?", "1–3 kişi için sedan, 4–7 kişi için minivan (daha fazla konfor için 6 kişiye kadar Mercedes V-Class), 8–16 kişi için minibüs. 16 kişiden fazlaysanız birden fazla araç ayırtın veya WhatsApp'tan yazın."],
      ["Fiyat kişi başı mı?", "Hayır. Fiyat, kapasitesi dolana kadar yolcu sayısından bağımsız olarak araç başıdır. Köprü-otoyol, otopark ve bekleme süresi dahildir."],
      ["Gösterilen modelin aynısı mı gelir?", "Ayırttığınız araç sınıfı gelir. Modeller örnektir; marka ve renk değişebilir."],
      ["Belirtilenden fazla bagajım varsa?", "Sayılar standart bavullar içindir. Fazla veya hacimli bagajda (bebek arabası, golf ya da kayak çantası) bir üst aracı seçin veya notta belirtin."],
      ["Çocuk koltuğu var mı?", "Evet, bebek ve çocuk koltuğu tanesi €{seat}. Rezervasyon formunda ekleyin, çocukların yaşlarını notta yazın."],
      ["Aynı araçla dönüş ayırtabilir miyim?", "Evet. Arama kutusunda \"dönüş transferi ekle\"yi işaretleyin, dönüşte %{ret} indirim kazanın."]
    ],
    ctaH: "Aracınızı buldunuz mu?", ctaP: "Sabit fiyatınızı görün, talebinizi bir dakikada gönderin.",
    more: "Tüm araçları detaylı inceleyin"
  },
  ru: {
    path: "/ru/avtomobili", nav: "Наш автопарк",
    title: "Автопарк: седан, минивэн, V-Class и микроавтобус · трансфер Стамбул",
    desc: "Четыре машины для трансфера в Стамбуле: седан на 3, минивэн на 7, V-Class VIP на 6, микроавтобус на 16 человек. Багаж, удобства и фиксированные цены.",
    h1: "Наш автопарк: четыре машины для любой группы",
    lead: "От седана для двоих до микроавтобуса на шестнадцать человек: каждая машина — с профессиональным водителем, встречей с табличкой в аэропорту и фиксированной ценой за машину, а не за человека.",
    pax: "пассажиров", bags: "чемоданов", ideal: "Для кого", from: "от", per: "за машину, в одну сторону", book: "Заказать эту машину", popular: "Чаще всего выбирают",
    cmpH: "Сравните машины", cols: ["Машина", "Пассажиры", "Чемоданы", "Для кого", "Цена от"],
    pricesH: "Цены на популярных маршрутах", pricesLead: "Фиксированные цены за машину в одну сторону. Платные дороги, парковка и ожидание включены.",
    inclH: "Включено с каждой машиной",
    incl: [["Встреча с табличкой", "Водитель ждёт в зале прилёта с табличкой с вашим именем и помогает с багажом."], ["Отслеживание рейса", "Мы следим за вашим рейсом; первые {wait} минут после посадки бесплатно."], ["Всё включено в цену", "Платные дороги, мосты, парковка и ожидание включены. Без счётчика и сюрпризов."], ["Оплата в конце", "Оплата водителю наличными в евро, долларах или лирах. Бесплатная отмена за 24 часа до подачи."]],
    cars: {
      sedan: { ideal: "Путешествующие в одиночку, пары и до 3 человек", desc: "Комфортный седан с кондиционером и самая низкая фиксированная цена на любом маршруте. Лучший выбор, если вы путешествуете налегке или вдвоём.", feats: ["До 3 пассажиров и 3 чемоданов", "Кондиционер, в салоне не курят", "Самая низкая цена на любом маршруте", "Детское кресло по запросу (€{seat})"] },
      minivan: { ideal: "Семьи и небольшие группы до 7 человек", desc: "Самая популярная машина: место для всей семьи и багажа, сдвижные двери для удобной посадки и большой багажник для колясок и крупных чемоданов.", feats: ["До 7 пассажиров и 7 чемоданов", "Место для колясок, сумок для гольфа и лыж", "Сдвижные двери, удобная посадка", "Детские кресла по запросу (€{seat} за шт.)"] },
      vclass: { ideal: "Деловые поездки, VIP-гости, семьи, которым нужно больше места", desc: "Mercedes-Benz V-Class в VIP-комплектации: просторный салон, тихий ход и статусная встреча для деловых поездок, свадебных путешествий и особых гостей.", feats: ["До 6 пассажиров и 6 чемоданов", "VIP-салон Mercedes-Benz", "Больше места и комфорта в долгой дороге", "Идеально для корпоративных гостей и мероприятий"] },
      minibus: { ideal: "Группы от 8 до 16 человек, экскурсии и мероприятия", desc: "Одна машина для всей группы — все приезжают вместе. Отлично подходит для компаний друзей, командных поездок, свадеб и круизных групп.", feats: ["До 16 пассажиров и 16 чемоданов", "Одна машина и одна цена на группу", "Место для крупного и громоздкого багажа", "Также для экскурсий и мероприятий"] }
    },
    faq: [
      ["Какую машину выбрать?", "Для 1–3 человек — седан, для 4–7 — минивэн (или Mercedes V-Class для большего комфорта, до 6 человек), для 8–16 — микроавтобус. Если вас больше 16, закажите несколько машин или напишите нам в WhatsApp."],
      ["Цена указана за человека?", "Нет. Цена за машину, независимо от числа пассажиров в пределах её вместимости. Платные дороги, парковка и ожидание включены."],
      ["Будет ли именно та модель, что на фото?", "Вы получите заказанный класс машины. Модели указаны как пример; марка и цвет могут отличаться."],
      ["Что если багажа больше, чем указано?", "Цифры даны для стандартных чемоданов. При дополнительном или громоздком багаже (коляски, сумки для гольфа или лыж) выберите машину побольше или напишите в комментарии."],
      ["Есть ли детские кресла?", "Да, детские кресла и автолюльки — €{seat} за штуку. Добавьте их в форме заказа и укажите возраст детей в комментарии."],
      ["Можно заказать обратный трансфер на той же машине?", "Да. Отметьте «добавить обратный трансфер» в форме поиска и получите скидку {ret}% на обратную поездку."]
    ],
    ctaH: "Выбрали машину?", ctaP: "Узнайте фиксированную цену и отправьте заявку за минуту.",
    more: "Все машины подробно"
  },
  de: {
    path: "/de/fahrzeuge", nav: "Unsere Flotte",
    title: "Unsere Flotte: Limousine, Minivan, V-Klasse, Kleinbus · Istanbul",
    desc: "Vier Fahrzeuge für Ihren Istanbul-Transfer: Limousine für 3, Minivan für 7, V-Klasse VIP für 6, Kleinbus für 16. Gepäck, Ausstattung und Festpreise pro Auto.",
    h1: "Unsere Flotte: vier Fahrzeuge für jede Gruppe",
    lead: "Von der Limousine für zwei bis zum Kleinbus für sechzehn: Jedes Fahrzeug kommt mit professionellem Fahrer, Abholung mit Namensschild am Flughafen und einem Festpreis pro Auto, nicht pro Person.",
    pax: "Personen", bags: "Koffer", ideal: "Ideal für", from: "ab", per: "pro Auto, einfache Fahrt", book: "Dieses Auto buchen", popular: "Am häufigsten gebucht",
    cmpH: "Fahrzeuge im Vergleich", cols: ["Fahrzeug", "Personen", "Koffer", "Ideal für", "Preis ab"],
    pricesH: "Preise auf beliebten Strecken", pricesLead: "Feste Preise pro Auto für die einfache Fahrt. Maut, Parken und Wartezeit sind inklusive.",
    inclH: "Bei jedem Fahrzeug inklusive",
    incl: [["Abholung mit Namensschild", "Ihr Fahrer wartet in der Ankunftshalle mit einem Schild mit Ihrem Namen und hilft mit dem Gepäck."], ["Flugverfolgung", "Wir verfolgen Ihren Flug; die ersten {wait} Minuten nach der Landung sind kostenlos."], ["Alles im Preis", "Maut, Brücken, Parken und Wartezeit sind inklusive. Kein Taxameter, keine Überraschungen."], ["Bezahlung am Ende", "Bar beim Fahrer in Euro, Dollar oder Lira. Kostenlose Stornierung bis 24 Stunden vor der Abholung."]],
    cars: {
      sedan: { ideal: "Alleinreisende, Paare und bis zu 3 Personen", desc: "Eine bequeme, klimatisierte Limousine und der günstigste Festpreis auf jeder Strecke. Die richtige Wahl, wenn Sie mit wenig Gepäck oder zu zweit reisen.", feats: ["Bis zu 3 Personen und 3 Koffer", "Klimatisiert, Nichtraucherfahrzeug", "Günstigster Preis auf jeder Strecke", "Kindersitz auf Anfrage (€{seat})"] },
      minivan: { ideal: "Familien und kleine Gruppen bis 7 Personen", desc: "Unser meistgebuchtes Fahrzeug: Platz für die ganze Familie samt Gepäck, Schiebetüren zum bequemen Einsteigen und ein großer Kofferraum für Kinderwagen und große Koffer.", feats: ["Bis zu 7 Personen und 7 Koffer", "Platz für Kinderwagen, Golf- und Skitaschen", "Schiebetüren, bequemer Einstieg", "Kindersitze auf Anfrage (je €{seat})"] },
      vclass: { ideal: "Geschäftsreisen, VIP-Gäste, Familien mit Platzbedarf", desc: "Die Mercedes-Benz V-Klasse in VIP-Ausstattung: großzügige Sitze, ruhige Fahrt und ein stilvoller Empfang für Geschäftsreisen, Flitterwochen und besondere Gäste.", feats: ["Bis zu 6 Personen und 6 Koffer", "Mercedes-Benz VIP-Innenraum", "Mehr Platz und Komfort auf langen Fahrten", "Ideal für Firmengäste und Events"] },
      minibus: { ideal: "Gruppen von 8 bis 16 Personen, Touren und Events", desc: "Ein Fahrzeug für die ganze Gruppe, damit alle zusammen ankommen. Ideal für Freundesgruppen, Teamreisen, Hochzeiten und Kreuzfahrtgruppen.", feats: ["Bis zu 16 Personen und 16 Koffer", "Ein Fahrzeug, ein Preis für die Gruppe", "Platz für großes und sperriges Gepäck", "Auch für Stadttouren und Events"] }
    },
    faq: [
      ["Welches Fahrzeug soll ich wählen?", "Für 1–3 Personen die Limousine, für 4–7 Personen den Minivan (oder die Mercedes V-Klasse für mehr Komfort, bis 6 Personen) und für 8–16 Personen den Kleinbus. Bei mehr als 16 Personen buchen Sie mehrere Fahrzeuge oder schreiben uns auf WhatsApp."],
      ["Gilt der Preis pro Person?", "Nein. Der Preis gilt pro Auto, unabhängig von der Personenzahl bis zur Kapazität. Maut, Parken und Wartezeit sind inklusive."],
      ["Bekomme ich genau das gezeigte Modell?", "Sie bekommen die gebuchte Fahrzeugklasse. Die Modelle sind Beispiele; Marke und Farbe können abweichen."],
      ["Was, wenn ich mehr Gepäck habe als angegeben?", "Die Zahlen gelten für Standardkoffer. Bei zusätzlichem oder sperrigem Gepäck (Kinderwagen, Golf- oder Skitaschen) wählen Sie die nächste Größe oder schreiben es in die Notiz."],
      ["Gibt es Kindersitze?", "Ja, Baby- und Kindersitze kosten je €{seat}. Fügen Sie sie im Buchungsformular hinzu und nennen Sie das Alter der Kinder in der Notiz."],
      ["Kann ich die Rückfahrt mit demselben Fahrzeug buchen?", "Ja. Haken Sie im Suchfeld „Rückfahrt hinzufügen“ an und erhalten Sie {ret}% Rabatt auf die Rückfahrt."]
    ],
    ctaH: "Ihr Fahrzeug gefunden?", ctaP: "Sehen Sie Ihren Festpreis und senden Sie Ihre Anfrage in einer Minute.",
    more: "Alle Fahrzeuge im Detail"
  },
  fr: {
    path: "/fr/vehicules", nav: "Notre flotte",
    title: "Notre flotte : berline, monospace, Classe V, minibus · Istanbul",
    desc: "Quatre véhicules pour votre transfert à Istanbul : berline pour 3, monospace pour 7, Classe V VIP pour 6, minibus pour 16. Bagages, équipements et prix fixes.",
    h1: "Notre flotte : quatre véhicules pour chaque groupe",
    lead: "De la berline pour deux au minibus pour seize : chaque véhicule est fourni avec un chauffeur professionnel, l'accueil avec pancarte à l'aéroport et un prix fixe par véhicule, pas par personne.",
    pax: "passagers", bags: "valises", ideal: "Idéal pour", from: "dès", per: "par véhicule, aller simple", book: "Réserver ce véhicule", popular: "Le plus réservé",
    cmpH: "Comparer les véhicules", cols: ["Véhicule", "Passagers", "Valises", "Idéal pour", "Prix dès"],
    pricesH: "Prix sur les trajets populaires", pricesLead: "Prix fixes par véhicule pour un aller simple. Péages, parking et attente compris.",
    inclH: "Inclus avec chaque véhicule",
    incl: [["Accueil avec pancarte", "Votre chauffeur vous attend dans le hall des arrivées avec une pancarte à votre nom et vous aide avec vos bagages."], ["Suivi du vol", "Nous suivons votre vol ; les {wait} premières minutes après l'atterrissage sont gratuites."], ["Tout est compris", "Péages, ponts, parking et attente sont compris. Pas de compteur, pas de surprise."], ["Paiement à la fin", "Payez le chauffeur en espèces en euros, dollars ou livres turques. Annulation gratuite jusqu'à 24 heures avant."]],
    cars: {
      sedan: { ideal: "Voyageurs seuls, couples et jusqu'à 3 personnes", desc: "Une berline confortable et climatisée, au prix fixe le plus bas sur chaque trajet. Le bon choix si vous voyagez léger ou à deux.", feats: ["Jusqu'à 3 passagers et 3 valises", "Climatisée, non-fumeur", "Prix le plus bas sur chaque trajet", "Siège enfant sur demande ({seat} €)"] },
      minivan: { ideal: "Familles et petits groupes jusqu'à 7", desc: "Notre véhicule le plus réservé : de la place pour toute la famille et ses bagages, des portes coulissantes pour monter facilement et un grand coffre pour poussettes et grosses valises.", feats: ["Jusqu'à 7 passagers et 7 valises", "Place pour poussettes, sacs de golf et de ski", "Portes coulissantes, accès facile", "Sièges enfant sur demande ({seat} € l'unité)"] },
      vclass: { ideal: "Voyages d'affaires, invités VIP, familles qui veulent plus d'espace", desc: "La Mercedes-Benz Classe V en finition VIP : sièges spacieux, conduite silencieuse et arrivée haut de gamme pour voyages d'affaires, lunes de miel et invités de marque.", feats: ["Jusqu'à 6 passagers et 6 valises", "Intérieur VIP Mercedes-Benz", "Plus d'espace et de confort sur les longs trajets", "Idéal pour invités d'entreprise et événements"] },
      minibus: { ideal: "Groupes de 8 à 16, excursions et événements", desc: "Un seul véhicule pour tout le groupe, pour arriver tous ensemble. Idéal pour les amis qui voyagent ensemble, les voyages d'équipe, les mariages et les groupes de croisière.", feats: ["Jusqu'à 16 passagers et 16 valises", "Un véhicule, un prix pour le groupe", "Place pour les bagages volumineux", "Aussi pour visites de la ville et événements"] }
    },
    faq: [
      ["Quel véhicule choisir ?", "Pour 1 à 3 personnes une berline, pour 4 à 7 un monospace (ou la Mercedes Classe V pour plus de confort, jusqu'à 6), et pour 8 à 16 un minibus. Au-delà de 16, réservez plusieurs véhicules ou écrivez-nous sur WhatsApp."],
      ["Le prix est-il par personne ?", "Non. Le prix est par véhicule, quel que soit le nombre de passagers dans la limite de sa capacité. Péages, parking et attente compris."],
      ["Aurai-je exactement le modèle affiché ?", "Vous aurez la catégorie réservée. Les modèles sont des exemples ; la marque et la couleur peuvent varier."],
      ["Et si j'ai plus de bagages qu'indiqué ?", "Les chiffres valent pour des valises standard. Avec des bagages en plus ou volumineux (poussette, sac de golf ou de ski), choisissez la taille au-dessus ou précisez-le dans la note."],
      ["Avez-vous des sièges enfant ?", "Oui, sièges bébé et enfant à {seat} € l'unité. Ajoutez-les dans le formulaire et indiquez l'âge des enfants dans la note."],
      ["Puis-je réserver le retour avec le même véhicule ?", "Oui. Cochez « ajouter un retour » dans le formulaire de recherche et profitez de {ret} % de réduction sur le retour."]
    ],
    ctaH: "Vous avez trouvé votre véhicule ?", ctaP: "Découvrez votre prix fixe et envoyez votre demande en une minute.",
    more: "Voir tous les véhicules en détail"
  },
  it: {
    path: "/it/veicoli", nav: "La nostra flotta",
    title: "La nostra flotta: berlina, minivan, Classe V, minibus · Istanbul",
    desc: "Quattro veicoli per il tuo transfer a Istanbul: berlina per 3, minivan per 7, Classe V VIP per 6, minibus per 16. Bagagli, dotazioni e prezzi fissi per auto.",
    h1: "La nostra flotta: quattro veicoli per ogni gruppo",
    lead: "Dalla berlina per due al minibus per sedici: ogni veicolo ha un autista professionista, l'accoglienza con cartello in aeroporto e un prezzo fisso per auto, non a persona.",
    pax: "passeggeri", bags: "valigie", ideal: "Ideale per", from: "da", per: "per auto, solo andata", book: "Prenota questo veicolo", popular: "Il più prenotato",
    cmpH: "Confronta i veicoli", cols: ["Veicolo", "Passeggeri", "Valigie", "Ideale per", "Prezzo da"],
    pricesH: "Prezzi sulle tratte più richieste", pricesLead: "Prezzi fissi per auto, solo andata. Pedaggi, parcheggio e attesa inclusi.",
    inclH: "Incluso con ogni veicolo",
    incl: [["Accoglienza con cartello", "L'autista ti aspetta nella sala arrivi con un cartello con il tuo nome e ti aiuta con i bagagli."], ["Monitoraggio del volo", "Seguiamo il tuo volo; i primi {wait} minuti dopo l'atterraggio sono gratuiti."], ["Tutto incluso nel prezzo", "Pedaggi, ponti, parcheggio e attesa sono inclusi. Niente tassametro, niente sorprese."], ["Pagamento alla fine", "Paga l'autista in contanti in euro, dollari o lire. Cancellazione gratuita fino a 24 ore prima."]],
    cars: {
      sedan: { ideal: "Viaggiatori singoli, coppie e fino a 3 persone", desc: "Una berlina comoda e climatizzata al prezzo fisso più basso su ogni tratta. La scelta giusta se viaggi leggero o in coppia.", feats: ["Fino a 3 passeggeri e 3 valigie", "Climatizzata, non fumatori", "Prezzo più basso su ogni tratta", "Seggiolino su richiesta (€{seat})"] },
      minivan: { ideal: "Famiglie e piccoli gruppi fino a 7", desc: "Il nostro veicolo più prenotato: spazio per tutta la famiglia e i bagagli, porte scorrevoli per salire facilmente e un grande bagagliaio per passeggini e valigie grandi.", feats: ["Fino a 7 passeggeri e 7 valigie", "Spazio per passeggini, sacche da golf e sci", "Porte scorrevoli, salita facile", "Seggiolini su richiesta (€{seat} l'uno)"] },
      vclass: { ideal: "Viaggi di lavoro, ospiti VIP, famiglie che vogliono più spazio", desc: "La Mercedes-Benz Classe V in allestimento VIP: sedili spaziosi, guida silenziosa e un arrivo di classe per viaggi di lavoro, lune di miele e ospiti speciali.", feats: ["Fino a 6 passeggeri e 6 valigie", "Interni VIP Mercedes-Benz", "Più spazio e comfort nei tragitti lunghi", "Ideale per ospiti aziendali ed eventi"] },
      minibus: { ideal: "Gruppi da 8 a 16, tour ed eventi", desc: "Un solo veicolo per tutto il gruppo, così arrivate tutti insieme. Ideale per gruppi di amici, viaggi aziendali, matrimoni e gruppi da crociera.", feats: ["Fino a 16 passeggeri e 16 valigie", "Un veicolo, un prezzo per il gruppo", "Spazio per bagagli grandi e ingombranti", "Anche per tour in città ed eventi"] }
    },
    faq: [
      ["Quale veicolo scegliere?", "Per 1–3 persone la berlina, per 4–7 il minivan (o la Mercedes Classe V per più comfort, fino a 6) e per 8–16 il minibus. Oltre 16 persone, prenota più veicoli o scrivici su WhatsApp."],
      ["Il prezzo è a persona?", "No. Il prezzo è per auto, indipendentemente dal numero di passeggeri entro la capienza. Pedaggi, parcheggio e attesa inclusi."],
      ["Avrò esattamente il modello mostrato?", "Avrai la categoria prenotata. I modelli sono esempi; marca e colore possono variare."],
      ["E se ho più bagagli di quelli indicati?", "I numeri si riferiscono a valigie standard. Con bagagli extra o ingombranti (passeggino, sacca da golf o da sci) scegli la misura più grande o scrivilo nella nota."],
      ["Avete seggiolini per bambini?", "Sì, ovetti e seggiolini costano €{seat} l'uno. Aggiungili nel modulo e indica l'età dei bambini nella nota."],
      ["Posso prenotare il ritorno con lo stesso veicolo?", "Sì. Spunta «aggiungi il ritorno» nel modulo di ricerca e ottieni il {ret}% di sconto sul ritorno."]
    ],
    ctaH: "Hai trovato il tuo veicolo?", ctaP: "Scopri il tuo prezzo fisso e invia la richiesta in un minuto.",
    more: "Vedi tutti i veicoli nel dettaglio"
  },
  nl: {
    path: "/nl/autos", nav: "Ons wagenpark",
    title: "Ons wagenpark: sedan, minivan, V-Klasse en minibus · Istanbul",
    desc: "Vier auto's voor je transfer in Istanbul: sedan voor 3, minivan voor 7, V-Klasse VIP voor 6, minibus voor 16. Bagage, uitrusting en vaste prijzen per auto.",
    h1: "Ons wagenpark: vier auto's voor elke groep",
    lead: "Van een sedan voor twee tot een minibus voor zestien: elke auto komt met een professionele chauffeur, ontvangst met naambordje op de luchthaven en een vaste prijs per auto, niet per persoon.",
    pax: "passagiers", bags: "koffers", ideal: "Ideaal voor", from: "vanaf", per: "per auto, enkele reis", book: "Boek deze auto", popular: "Meest geboekt",
    cmpH: "Vergelijk de auto's", cols: ["Auto", "Passagiers", "Koffers", "Ideaal voor", "Prijs vanaf"],
    pricesH: "Prijzen op populaire routes", pricesLead: "Vaste prijzen per auto voor een enkele reis. Tol, parkeren en wachttijd zijn inbegrepen.",
    inclH: "Inbegrepen bij elke auto",
    incl: [["Ontvangst met naambordje", "Je chauffeur wacht in de aankomsthal met een bordje met je naam en helpt met je bagage."], ["Vluchtvolging", "We volgen je vlucht; de eerste {wait} minuten na de landing zijn gratis."], ["Alles in de prijs", "Tol, bruggen, parkeren en wachttijd zijn inbegrepen. Geen taximeter, geen verrassingen."], ["Betalen aan het eind", "Betaal de chauffeur contant in euro, dollars of lira. Gratis annuleren tot 24 uur vooraf."]],
    cars: {
      sedan: { ideal: "Solo-reizigers, stellen en tot 3 personen", desc: "Een comfortabele sedan met airco en de laagste vaste prijs op elke route. De juiste keuze als je licht reist of met z'n tweeën.", feats: ["Tot 3 passagiers en 3 koffers", "Airco, rookvrij", "Laagste prijs op elke route", "Kinderzitje op aanvraag (€{seat})"] },
      minivan: { ideal: "Gezinnen en kleine groepen tot 7", desc: "Onze meest geboekte auto: ruimte voor het hele gezin en de bagage, schuifdeuren om makkelijk in te stappen en een grote kofferbak voor kinderwagens en grote koffers.", feats: ["Tot 7 passagiers en 7 koffers", "Ruimte voor kinderwagens, golf- en skitassen", "Schuifdeuren, makkelijk instappen", "Kinderzitjes op aanvraag (€{seat} per stuk)"] },
      vclass: { ideal: "Zakenreizen, VIP-gasten, gezinnen die meer ruimte willen", desc: "De Mercedes-Benz V-Klasse in VIP-uitvoering: ruime stoelen, een stille rit en een stijlvolle aankomst voor zakenreizen, huwelijksreizen en bijzondere gasten.", feats: ["Tot 6 passagiers en 6 koffers", "Mercedes-Benz VIP-interieur", "Extra ruimte en comfort op lange ritten", "Ideaal voor zakelijke gasten en evenementen"] },
      minibus: { ideal: "Groepen van 8 tot 16, tours en evenementen", desc: "Eén voertuig voor de hele groep, zodat iedereen samen aankomt. Ideaal voor vriendengroepen, teamreizen, bruiloften en cruisegroepen.", feats: ["Tot 16 passagiers en 16 koffers", "Eén auto, één prijs voor de groep", "Ruimte voor grote en omvangrijke bagage", "Ook voor stadstours en evenementen"] }
    },
    faq: [
      ["Welke auto moet ik kiezen?", "Voor 1–3 personen een sedan, voor 4–7 personen een minivan (of de Mercedes V-Klasse voor meer comfort, tot 6) en voor 8–16 personen een minibus. Met meer dan 16 boek je meerdere auto's of stuur je ons een WhatsApp."],
      ["Is de prijs per persoon?", "Nee. De prijs is per auto, ongeacht het aantal passagiers tot de capaciteit. Tol, parkeren en wachttijd zijn inbegrepen."],
      ["Krijg ik precies het getoonde model?", "Je krijgt de geboekte autoklasse. De modellen zijn voorbeelden; merk en kleur kunnen verschillen."],
      ["Wat als ik meer bagage heb dan aangegeven?", "De aantallen gelden voor standaardkoffers. Met extra of grote bagage (kinderwagen, golf- of skitas) kies je een maat groter of zet je het in de notitie."],
      ["Hebben jullie kinderzitjes?", "Ja, baby- en kinderzitjes kosten €{seat} per stuk. Voeg ze toe in het boekingsformulier en vermeld de leeftijd van de kinderen in de notitie."],
      ["Kan ik de terugreis met dezelfde auto boeken?", "Ja. Vink \"terugreis toevoegen\" aan in het zoekvak en krijg {ret}% korting op de terugreis."]
    ],
    ctaH: "Je auto gevonden?", ctaP: "Bekijk je vaste prijs en verstuur je aanvraag in een minuut.",
    more: "Bekijk alle auto's in detail"
  },
  ar: {
    path: "/ar/sayyarat", nav: "أسطولنا",
    title: "أسطولنا: سيدان، ميني فان، مرسيدس V-Class وميني باص · توصيلات إسطنبول",
    desc: "السيارات الأربع لتوصيلك من مطار إسطنبول: سيدان لـ3 ركاب، ميني فان لـ7، مرسيدس V-Class VIP لـ6 وميني باص لـ16. عدد الركاب والحقائب والمزايا والأسعار الثابتة للسيارة.",
    h1: "أسطولنا: أربع سيارات تناسب كل مجموعة",
    lead: "من سيارة سيدان لشخصين إلى ميني باص لستة عشر شخصاً: كل سيارة مع سائق محترف واستقبال بلوحة باسمك في المطار وسعر ثابت للسيارة لا للشخص.",
    pax: "ركاب", bags: "حقائب", ideal: "مناسبة لـ", from: "من", per: "للسيارة، اتجاه واحد", book: "احجز هذه السيارة", popular: "الأكثر حجزاً",
    cmpH: "قارن بين السيارات", cols: ["السيارة", "الركاب", "الحقائب", "مناسبة لـ", "السعر من"],
    pricesH: "الأسعار على المسارات الأكثر طلباً", pricesLead: "أسعار ثابتة للسيارة في اتجاه واحد. تشمل رسوم الطرق والمواقف ووقت الانتظار.",
    inclH: "مشمول مع كل سيارة",
    incl: [["الاستقبال بلوحة باسمك", "ينتظرك السائق في صالة الوصول بلوحة باسمك ويساعدك في حمل الحقائب."], ["متابعة الرحلة", "نتابع رحلتك الجوية؛ أول {wait} دقيقة بعد الهبوط مجانية."], ["كل شيء ضمن السعر", "رسوم الطرق والجسور والمواقف ووقت الانتظار مشمولة. لا عداد ولا مفاجآت."], ["الدفع في النهاية", "ادفع للسائق نقداً باليورو أو الدولار أو الليرة. الإلغاء مجاني حتى 24 ساعة قبل الموعد."]],
    cars: {
      sedan: { ideal: "المسافرون بمفردهم والأزواج وحتى 3 أشخاص", desc: "سيارة سيدان مريحة ومكيفة وأقل سعر ثابت على كل مسار. الخيار المناسب إذا كنت تسافر بأمتعة قليلة أو مع شريكك.", feats: ["حتى 3 ركاب و3 حقائب", "مكيفة وغير مخصصة للتدخين", "أقل سعر على كل مسار", "مقعد أطفال عند الطلب ({seat} يورو)"] },
      minivan: { ideal: "العائلات والمجموعات الصغيرة حتى 7 أشخاص", desc: "سيارتنا الأكثر حجزاً: مساحة للعائلة كلها وأمتعتها، وأبواب منزلقة لصعود سهل، وصندوق كبير لعربات الأطفال والحقائب الكبيرة.", feats: ["حتى 7 ركاب و7 حقائب", "مساحة لعربات الأطفال وحقائب الغولف والتزلج", "أبواب منزلقة وصعود سهل", "مقاعد أطفال عند الطلب ({seat} يورو للمقعد)"] },
      vclass: { ideal: "رحلات العمل وضيوف VIP والعائلات التي تريد مساحة أكبر", desc: "مرسيدس-بنز V-Class بتجهيز VIP: مقاعد واسعة وقيادة هادئة واستقبال فاخر لرحلات العمل وشهر العسل والضيوف المميزين.", feats: ["حتى 6 ركاب و6 حقائب", "مقصورة مرسيدس-بنز VIP", "مساحة وراحة إضافية في الرحلات الطويلة", "مثالية لضيوف الشركات والمناسبات"] },
      minibus: { ideal: "مجموعات من 8 إلى 16 شخصاً والجولات والمناسبات", desc: "سيارة واحدة للمجموعة كلها ليصل الجميع معاً. مثالية للأصدقاء المسافرين معاً ورحلات الفرق والأعراس ومجموعات الرحلات البحرية.", feats: ["حتى 16 راكباً و16 حقيبة", "سيارة واحدة وسعر واحد للمجموعة", "مساحة للأمتعة الكبيرة والضخمة", "مناسبة أيضاً للجولات والمناسبات"] }
    },
    faq: [
      ["أي سيارة أختار؟", "لشخص إلى 3 أشخاص سيدان، ولـ4 إلى 7 أشخاص ميني فان (أو مرسيدس V-Class لراحة أكبر حتى 6 أشخاص)، ولـ8 إلى 16 شخصاً ميني باص. لأكثر من 16 شخصاً احجز عدة سيارات أو راسلنا على واتساب."],
      ["هل السعر للشخص؟", "لا. السعر للسيارة مهما كان عدد الركاب ضمن سعتها، ويشمل رسوم الطرق والمواقف ووقت الانتظار."],
      ["هل سأحصل على الطراز المعروض نفسه؟", "تحصل على فئة السيارة التي حجزتها. الطرازات أمثلة، وقد تختلف الماركة واللون."],
      ["ماذا لو كانت أمتعتي أكثر من المذكور؟", "الأرقام للحقائب العادية. مع أمتعة إضافية أو كبيرة (عربة أطفال أو حقيبة غولف أو تزلج) اختر السيارة الأكبر أو اكتب ذلك في الملاحظة."],
      ["هل لديكم مقاعد أطفال؟", "نعم، مقاعد الرضع والأطفال بـ{seat} يورو للمقعد. أضفها في نموذج الحجز واكتب أعمار الأطفال في الملاحظة."],
      ["هل يمكنني حجز العودة بالسيارة نفسها؟", "نعم. اختر \"أضف رحلة العودة\" في مربع البحث واحصل على خصم {ret}% على العودة."]
    ],
    ctaH: "هل وجدت سيارتك؟", ctaP: "اعرف سعرك الثابت وأرسل طلبك في دقيقة واحدة.",
    more: "شاهد كل السيارات بالتفصيل"
  }
};
