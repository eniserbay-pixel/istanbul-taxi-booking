// The "About us" page: why the company was started, what it stands for and the facts a guest can check
// (company, TÜRSAB licence, founding date), in every site language. {company}, {tursab} and {brand} come from data/site.json.
module.exports = {
  en: {
    path: "/about-us", nav: "About us",
    title: "About ITB Transfer · Istanbul Transfer Company",
    desc: "ITB Transfer is an Istanbul transfer company founded in 2026 to give visitors safe, reliable, fixed-price rides from the airport to their hotel.",
    h1: "About {brand}",
    lead: "We started {brand} in Istanbul on 15 October 2026 with one goal: that every guest arriving in Türkiye gets from the airport to the hotel safely, on time and at the price agreed before the trip.",
    storyH: "Why we started",
    story: [
      "Istanbul is one of the most visited cities in the world, yet the first hour after landing is often the hardest: long taxi queues, drivers who refuse short trips, meters that keep running in traffic and hotel addresses that are hard to explain. We wanted to take that worry away.",
      "So we built a simple service. You book in a minute and see a fixed price per car. Your driver follows your flight and waits in the arrivals hall with your name. There is no prepayment, no meter and no bargaining: you pay the agreed price in cash at the end of the ride.",
      "{brand} is run by {company}, a travel company licensed by TÜRSAB, the Association of Turkish Travel Agencies, under licence number {tursab}. Every transfer is driven by a professional driver in a licensed, insured vehicle."
    ],
    valuesH: "What we stand for",
    values: [["Reliability", "Your driver is there when you land. We track your flight and the first 60 minutes of waiting are free."], ["Safety", "Professional drivers, licensed and insured vehicles, and a company you can check by its TÜRSAB licence."], ["Honest prices", "The price you see when you book is the price you pay. Tolls and parking are included."], ["Hospitality", "We look after every guest as our own: help with luggage, child seats on request and an answer on WhatsApp at any hour."]],
    factsH: "Company facts",
    facts: { company: "Company", licence: "TÜRSAB licence", founded: "Founded", foundedOn: "15 October 2026", area: "Service area", areaText: "Istanbul: Istanbul Airport, Sabiha Gökçen, Galataport and the city's districts", hours: "Hours", hoursText: "24 hours a day, 7 days a week" },
    ctaH: "Arriving in Istanbul soon?", ctaP: "See your fixed price and book your transfer in a minute."
  },
  tr: {
    path: "/tr/hakkimizda", nav: "Hakkımızda",
    title: "Hakkımızda · ITB Transfer İstanbul Transfer Firması",
    desc: "ITB Transfer, İstanbul'a gelen misafirlere havalimanından otele güvenli, güvenilir ve sabit fiyatlı yolculuk sunmak için 2026'da kurulan bir transfer firmasıdır.",
    h1: "{brand} hakkında",
    lead: "{brand}'i 15 Ekim 2026'da İstanbul'da tek bir amaçla kurduk: Türkiye'ye gelen her misafirin havalimanından oteline güvenle, zamanında ve yolculuktan önce anlaşılan fiyatla ulaşması.",
    storyH: "Neden kurduk",
    story: [
      "İstanbul dünyanın en çok ziyaret edilen şehirlerinden biri, ama inişten sonraki ilk saat çoğu zaman en zorudur: uzun taksi kuyrukları, kısa yolu reddeden şoförler, trafikte işlemeye devam eden taksimetre ve tarif etmesi zor otel adresleri. Bu endişeyi ortadan kaldırmak istedik.",
      "Bu yüzden basit bir hizmet kurduk. Bir dakikada rezervasyon yapar, araç başı sabit fiyatı görürsünüz. Şoförünüz uçuşunuzu takip eder ve geliş salonunda isminizle bekler. Ön ödeme, taksimetre ve pazarlık yoktur: anlaşılan fiyatı yolculuk sonunda nakit ödersiniz.",
      "{brand}, TÜRSAB (Türkiye Seyahat Acentaları Birliği) tarafından {tursab} belge numarasıyla lisanslanmış bir seyahat firması olan {company} tarafından işletilir. Her transferi profesyonel bir şoför, belgeli ve sigortalı bir araçla yapar."
    ],
    valuesH: "Neyi savunuyoruz",
    values: [["Güvenilirlik", "İndiğinizde şoförünüz oradadır. Uçuşunuzu takip ederiz, ilk 60 dakika bekleme ücretsizdir."], ["Güvenlik", "Profesyonel şoförler, belgeli ve sigortalı araçlar ve TÜRSAB belgesiyle kontrol edebileceğiniz bir firma."], ["Dürüst fiyat", "Rezervasyonda gördüğünüz fiyat, ödeyeceğiniz fiyattır. Köprü-otoyol ve otopark dahildir."], ["Misafirperverlik", "Her misafire kendi misafirimiz gibi bakarız: bagaj yardımı, istek üzerine çocuk koltuğu ve her saatte WhatsApp'tan yanıt."]],
    factsH: "Firma bilgileri",
    facts: { company: "Firma", licence: "TÜRSAB belge no", founded: "Kuruluş", foundedOn: "15 Ekim 2026", area: "Hizmet bölgesi", areaText: "İstanbul: İstanbul Havalimanı, Sabiha Gökçen, Galataport ve şehrin semtleri", hours: "Çalışma saatleri", hoursText: "Haftanın 7 günü, 24 saat" },
    ctaH: "Yakında İstanbul'a mı geliyorsunuz?", ctaP: "Sabit fiyatınızı görün, transferinizi bir dakikada ayırtın."
  },
  ru: {
    path: "/ru/o-nas", nav: "О нас",
    title: "О компании ITB Transfer · трансферы в Стамбуле",
    desc: "ITB Transfer — трансферная компания в Стамбуле, основанная в 2026 году, чтобы гости города безопасно и по фиксированной цене добирались из аэропорта в отель.",
    h1: "О компании {brand}",
    lead: "Мы основали {brand} в Стамбуле 15 октября 2026 года с одной целью: чтобы каждый гость, прилетающий в Турцию, добирался из аэропорта в отель безопасно, вовремя и по цене, согласованной до поездки.",
    storyH: "Почему мы начали",
    story: [
      "Стамбул — один из самых посещаемых городов мира, но первый час после посадки часто самый трудный: длинные очереди на такси, водители, отказывающиеся от коротких поездок, счётчик, который крутится в пробках, и адрес отеля, который сложно объяснить. Мы хотели избавить гостей от этих забот.",
      "Поэтому мы сделали простой сервис. Вы бронируете за минуту и видите фиксированную цену за машину. Водитель следит за вашим рейсом и ждёт в зале прилёта с табличкой с вашим именем. Без предоплаты, без счётчика и без торга: согласованную цену вы платите наличными в конце поездки.",
      "{brand} управляет {company} — туристическая компания с лицензией TÜRSAB (Ассоциации турецких туристических агентств) номер {tursab}. Каждый трансфер выполняет профессиональный водитель на лицензированном и застрахованном автомобиле."
    ],
    valuesH: "Наши принципы",
    values: [["Надёжность", "Водитель на месте, когда вы приземляетесь. Мы следим за рейсом, первые 60 минут ожидания бесплатны."], ["Безопасность", "Профессиональные водители, лицензированные и застрахованные автомобили и компания, которую можно проверить по лицензии TÜRSAB."], ["Честные цены", "Цена при бронировании — это цена, которую вы платите. Платные дороги и парковка включены."], ["Гостеприимство", "Заботимся о каждом госте как о своём: поможем с багажом, детское кресло по запросу и ответ в WhatsApp в любое время."]],
    factsH: "О компании в цифрах",
    facts: { company: "Компания", licence: "Лицензия TÜRSAB", founded: "Основана", foundedOn: "15 октября 2026 г.", area: "Где работаем", areaText: "Стамбул: аэропорт Стамбула, Сабиха Гёкчен, Галатапорт и районы города", hours: "Часы работы", hoursText: "Круглосуточно, без выходных" },
    ctaH: "Скоро в Стамбул?", ctaP: "Узнайте фиксированную цену и забронируйте трансфер за минуту."
  },
  de: {
    path: "/de/ueber-uns", nav: "Über uns",
    title: "Über ITB Transfer · Transferunternehmen in Istanbul",
    desc: "ITB Transfer ist ein 2026 gegründetes Transferunternehmen in Istanbul: sichere, zuverlässige Fahrten zum Festpreis vom Flughafen zum Hotel für Gäste der Stadt.",
    h1: "Über {brand}",
    lead: "Wir haben {brand} am 15. Oktober 2026 in Istanbul mit einem Ziel gegründet: Jeder Gast, der in der Türkei ankommt, soll sicher, pünktlich und zum vorher vereinbarten Preis vom Flughafen ins Hotel kommen.",
    storyH: "Warum wir angefangen haben",
    story: [
      "Istanbul gehört zu den meistbesuchten Städten der Welt, doch die erste Stunde nach der Landung ist oft die schwerste: lange Taxischlangen, Fahrer, die kurze Fahrten ablehnen, Taxameter, die im Stau weiterlaufen, und Hoteladressen, die schwer zu erklären sind. Diese Sorge wollten wir unseren Gästen abnehmen.",
      "Deshalb haben wir einen einfachen Service aufgebaut. Sie buchen in einer Minute und sehen einen Festpreis pro Auto. Ihr Fahrer verfolgt Ihren Flug und wartet in der Ankunftshalle mit Ihrem Namen. Keine Vorauszahlung, kein Taxameter, kein Verhandeln: Sie zahlen den vereinbarten Preis am Ende bar.",
      "{brand} wird von {company} betrieben, einem Reiseunternehmen mit Lizenz von TÜRSAB, dem Verband der türkischen Reisebüros, unter der Nummer {tursab}. Jeder Transfer wird von einem professionellen Fahrer in einem zugelassenen, versicherten Fahrzeug gefahren."
    ],
    valuesH: "Wofür wir stehen",
    values: [["Zuverlässigkeit", "Ihr Fahrer ist da, wenn Sie landen. Wir verfolgen Ihren Flug, die ersten 60 Minuten Wartezeit sind kostenlos."], ["Sicherheit", "Professionelle Fahrer, zugelassene und versicherte Fahrzeuge und ein Unternehmen, das Sie über seine TÜRSAB-Lizenz prüfen können."], ["Ehrliche Preise", "Der Preis bei der Buchung ist der Preis, den Sie zahlen. Maut und Parken sind inklusive."], ["Gastfreundschaft", "Wir kümmern uns um jeden Gast wie um unseren eigenen: Hilfe mit dem Gepäck, Kindersitze auf Wunsch und Antwort per WhatsApp zu jeder Stunde."]],
    factsH: "Unternehmensdaten",
    facts: { company: "Unternehmen", licence: "TÜRSAB-Lizenz", founded: "Gegründet", foundedOn: "15. Oktober 2026", area: "Einsatzgebiet", areaText: "Istanbul: Flughafen Istanbul, Sabiha Gökçen, Galataport und die Stadtteile", hours: "Erreichbarkeit", hoursText: "Rund um die Uhr, 7 Tage die Woche" },
    ctaH: "Bald in Istanbul?", ctaP: "Sehen Sie Ihren Festpreis und buchen Sie Ihren Transfer in einer Minute."
  },
  fr: {
    path: "/fr/a-propos", nav: "À propos",
    title: "À propos d'ITB Transfer · Société de transfert à Istanbul",
    desc: "ITB Transfer est une société de transfert à Istanbul fondée en 2026 pour offrir aux visiteurs des trajets sûrs, fiables et à prix fixe de l'aéroport à l'hôtel.",
    h1: "À propos d'{brand}",
    lead: "Nous avons créé {brand} à Istanbul le 15 octobre 2026 avec un seul objectif : que chaque voyageur arrivant en Turquie rejoigne son hôtel en sécurité, à l'heure et au prix convenu avant le trajet.",
    storyH: "Pourquoi nous avons commencé",
    story: [
      "Istanbul est l'une des villes les plus visitées au monde, mais la première heure après l'atterrissage est souvent la plus difficile : longues files de taxis, chauffeurs qui refusent les courtes distances, compteurs qui tournent dans les bouchons et adresses d'hôtel difficiles à expliquer. Nous voulions supprimer ce souci.",
      "Nous avons donc créé un service simple. Vous réservez en une minute et voyez un prix fixe par voiture. Votre chauffeur suit votre vol et vous attend dans le hall des arrivées avec votre nom. Pas de prépaiement, pas de compteur, pas de marchandage : vous payez le prix convenu en espèces à la fin du trajet.",
      "{brand} est exploitée par {company}, une agence de voyages agréée par le TÜRSAB, l'Association des agences de voyages turques, sous le numéro {tursab}. Chaque transfert est assuré par un chauffeur professionnel dans un véhicule agréé et assuré."
    ],
    valuesH: "Nos engagements",
    values: [["Fiabilité", "Votre chauffeur est là à l'atterrissage. Nous suivons votre vol et les 60 premières minutes d'attente sont gratuites."], ["Sécurité", "Des chauffeurs professionnels, des véhicules agréés et assurés, et une société que vous pouvez vérifier par sa licence TÜRSAB."], ["Prix honnêtes", "Le prix affiché à la réservation est celui que vous payez. Péages et parking compris."], ["Hospitalité", "Nous prenons soin de chaque voyageur comme du nôtre : aide pour les bagages, sièges enfant sur demande et réponse sur WhatsApp à toute heure."]],
    factsH: "La société en bref",
    facts: { company: "Société", licence: "Licence TÜRSAB", founded: "Création", foundedOn: "15 octobre 2026", area: "Zone desservie", areaText: "Istanbul : aéroport d'Istanbul, Sabiha Gökçen, Galataport et les quartiers de la ville", hours: "Horaires", hoursText: "24 h/24, 7 j/7" },
    ctaH: "Bientôt à Istanbul ?", ctaP: "Découvrez votre prix fixe et réservez votre transfert en une minute."
  },
  it: {
    path: "/it/chi-siamo", nav: "Chi siamo",
    title: "Chi siamo · ITB Transfer, transfer a Istanbul",
    desc: "ITB Transfer è una società di transfer di Istanbul fondata nel 2026 per offrire ai visitatori viaggi sicuri, affidabili e a prezzo fisso dall'aeroporto all'hotel.",
    h1: "Chi è {brand}",
    lead: "Abbiamo fondato {brand} a Istanbul il 15 ottobre 2026 con un solo obiettivo: che ogni ospite che arriva in Turchia raggiunga l'hotel dall'aeroporto in sicurezza, puntuale e al prezzo concordato prima del viaggio.",
    storyH: "Perché abbiamo iniziato",
    story: [
      "Istanbul è una delle città più visitate al mondo, ma la prima ora dopo l'atterraggio è spesso la più difficile: lunghe code per il taxi, autisti che rifiutano le corse brevi, tassametri che corrono nel traffico e indirizzi d'hotel difficili da spiegare. Volevamo togliere questa preoccupazione.",
      "Così abbiamo creato un servizio semplice. Prenoti in un minuto e vedi un prezzo fisso per auto. Il tuo autista segue il volo e ti aspetta nella sala arrivi con il tuo nome. Nessun pagamento anticipato, nessun tassametro, nessuna trattativa: paghi il prezzo concordato in contanti alla fine della corsa.",
      "{brand} è gestita da {company}, un'agenzia di viaggi autorizzata dal TÜRSAB, l'Associazione delle agenzie di viaggio turche, con licenza numero {tursab}. Ogni transfer è effettuato da un autista professionista con un veicolo autorizzato e assicurato."
    ],
    valuesH: "In cosa crediamo",
    values: [["Affidabilità", "Il tuo autista è lì quando atterri. Seguiamo il volo e i primi 60 minuti di attesa sono gratuiti."], ["Sicurezza", "Autisti professionisti, veicoli autorizzati e assicurati e una società verificabile tramite la licenza TÜRSAB."], ["Prezzi onesti", "Il prezzo che vedi alla prenotazione è quello che paghi. Pedaggi e parcheggio inclusi."], ["Ospitalità", "Ci prendiamo cura di ogni ospite come fosse nostro: aiuto con i bagagli, seggiolini su richiesta e risposta su WhatsApp a ogni ora."]],
    factsH: "La società in breve",
    facts: { company: "Società", licence: "Licenza TÜRSAB", founded: "Fondata", foundedOn: "15 ottobre 2026", area: "Zona servita", areaText: "Istanbul: aeroporto di Istanbul, Sabiha Gökçen, Galataport e i quartieri della città", hours: "Orari", hoursText: "24 ore su 24, 7 giorni su 7" },
    ctaH: "Presto a Istanbul?", ctaP: "Scopri il tuo prezzo fisso e prenota il transfer in un minuto."
  },
  nl: {
    path: "/nl/over-ons", nav: "Over ons",
    title: "Over ITB Transfer · Transferbedrijf in Istanbul",
    desc: "ITB Transfer is een transferbedrijf in Istanbul, opgericht in 2026 om bezoekers veilig en voor een vaste prijs van de luchthaven naar hun hotel te brengen.",
    h1: "Over {brand}",
    lead: "We zijn {brand} op 15 oktober 2026 in Istanbul begonnen met één doel: dat elke gast die in Turkije aankomt veilig, op tijd en voor de vooraf afgesproken prijs van de luchthaven bij het hotel komt.",
    storyH: "Waarom we begonnen",
    story: [
      "Istanbul is een van de meest bezochte steden ter wereld, maar het eerste uur na de landing is vaak het lastigst: lange taxirijen, chauffeurs die korte ritten weigeren, meters die in de file doorlopen en hoteladressen die moeilijk uit te leggen zijn. Die zorg wilden we wegnemen.",
      "Daarom bouwden we een eenvoudige dienst. Je boekt in een minuut en ziet een vaste prijs per auto. Je chauffeur volgt je vlucht en wacht in de aankomsthal met je naam. Geen vooruitbetaling, geen meter en geen onderhandelen: je betaalt de afgesproken prijs contant aan het eind van de rit.",
      "{brand} wordt gerund door {company}, een reisbedrijf met een vergunning van TÜRSAB, de Vereniging van Turkse Reisbureaus, onder nummer {tursab}. Elke transfer wordt gereden door een professionele chauffeur in een vergund en verzekerd voertuig."
    ],
    valuesH: "Waar we voor staan",
    values: [["Betrouwbaarheid", "Je chauffeur staat klaar als je landt. We volgen je vlucht en de eerste 60 minuten wachten zijn gratis."], ["Veiligheid", "Professionele chauffeurs, vergunde en verzekerde voertuigen en een bedrijf dat je kunt controleren via de TÜRSAB-vergunning."], ["Eerlijke prijzen", "De prijs die je bij het boeken ziet, is de prijs die je betaalt. Tol en parkeren zijn inbegrepen."], ["Gastvrijheid", "We zorgen voor elke gast alsof het onze eigen gast is: hulp met bagage, kinderzitjes op verzoek en antwoord via WhatsApp op elk uur."]],
    factsH: "Bedrijfsgegevens",
    facts: { company: "Bedrijf", licence: "TÜRSAB-vergunning", founded: "Opgericht", foundedOn: "15 oktober 2026", area: "Werkgebied", areaText: "Istanbul: Istanbul Airport, Sabiha Gökçen, Galataport en de wijken van de stad", hours: "Bereikbaar", hoursText: "24 uur per dag, 7 dagen per week" },
    ctaH: "Binnenkort in Istanbul?", ctaP: "Bekijk je vaste prijs en boek je transfer in een minuut."
  },
  ar: {
    path: "/ar/man-nahnu", nav: "من نحن",
    title: "من نحن · ITB Transfer شركة التوصيل في إسطنبول",
    desc: "ITB Transfer شركة نقل سياحي في إسطنبول تأسست عام 2026 لتوفير رحلات آمنة وموثوقة وبسعر ثابت للزوار من المطار إلى الفندق.",
    h1: "من نحن",
    lead: "أسّسنا {brand} في إسطنبول في 15 أكتوبر 2026 بهدف واحد: أن يصل كل ضيف قادم إلى تركيا من المطار إلى فندقه بأمان وفي الموعد وبالسعر المتفق عليه قبل الرحلة.",
    storyH: "لماذا بدأنا",
    story: [
      "إسطنبول من أكثر مدن العالم زيارةً، لكن الساعة الأولى بعد الهبوط غالباً ما تكون الأصعب: طوابير تاكسي طويلة، وسائقون يرفضون المسافات القصيرة، وعدّاد يستمر في الزحام، وعنوان فندق يصعب شرحه. أردنا أن نزيل هذا القلق عن ضيوفنا.",
      "لذلك أنشأنا خدمة بسيطة. تحجز في دقيقة وترى سعراً ثابتاً للسيارة. يتابع السائق رحلتك وينتظرك في صالة الوصول بلوحة باسمك. لا دفع مسبق ولا عدّاد ولا مساومة: تدفع السعر المتفق عليه نقداً في نهاية الرحلة.",
      "تدير {brand} شركة {company}، وهي شركة سياحة مرخّصة من TÜRSAB (اتحاد وكالات السفر التركية) برقم ترخيص {tursab}. ويقوم بكل توصيلة سائق محترف بسيارة مرخّصة ومؤمّنة."
    ],
    valuesH: "ما نؤمن به",
    values: [["الموثوقية", "السائق في انتظارك عند هبوطك. نتابع رحلتك، وأول 60 دقيقة انتظار مجانية."], ["الأمان", "سائقون محترفون، وسيارات مرخّصة ومؤمّنة، وشركة يمكنك التحقق منها عبر ترخيص TÜRSAB."], ["أسعار صادقة", "السعر الذي تراه عند الحجز هو السعر الذي تدفعه، ويشمل رسوم الطرق والمواقف."], ["الضيافة", "نهتم بكل ضيف كأنه ضيفنا: مساعدة في الحقائب، ومقاعد أطفال عند الطلب، ورد على واتساب في أي ساعة."]],
    factsH: "معلومات الشركة",
    facts: { company: "الشركة", licence: "ترخيص TÜRSAB", founded: "تاريخ التأسيس", foundedOn: "15 أكتوبر 2026", area: "منطقة الخدمة", areaText: "إسطنبول: مطار إسطنبول وصبيحة كوكجن وغلطة بورت وأحياء المدينة", hours: "ساعات العمل", hoursText: "على مدار الساعة طوال أيام الأسبوع" },
    ctaH: "هل تصل إلى إسطنبول قريباً؟", ctaP: "اعرف سعرك الثابت واحجز توصيلك في دقيقة واحدة."
  }
};
