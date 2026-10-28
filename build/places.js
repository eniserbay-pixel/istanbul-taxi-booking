// Neighbourhood pages ("Airport taxi to Nişantaşı"): well-known places inside a price zone of data/pricing.json,
// with both airports' prices of that zone, what the place is like and FAQs, in every site language.
// T: page texts per language ({place}, {zone}, {ist}, {saw}, {brand}, {istKm}, {istMin}, {sawKm}, {sawMin}, {van}, {vclass});
// L: the places, each with its zone and its own texts.
module.exports = {
  T: {
    en: {
      path: s => `/airport-taxi-to-${s}`,
      title: "Airport Taxi to {place} · Fixed from €{min} per Car",
      desc: "Private airport taxi to {place}, Istanbul: €{ist} from Istanbul Airport, €{saw} from Sabiha Gökçen, per car. Driver with name sign, tolls included, pay in cash.",
      h1: "Airport taxi to {place}",
      lead: "A private taxi to {place} costs a fixed <strong>€{ist} per car</strong> from Istanbul Airport and <strong>€{saw}</strong> from Sabiha Gökçen in a sedan for up to 3 passengers. {place} is in our {zone} price zone; tolls and parking are included and you pay the driver in cash.",
      pricesH: "Prices to {place}", from: "From", aboutH: "About {place}", sights: "Nearby", tip: "Driver's tip", zone: "Same price as",
      faq: [
        ["How much is a taxi from Istanbul Airport to {place}?", "A fixed €{ist} per car in a sedan, €{van} in a minivan for up to 7 and €{vclass} in a Mercedes V-Class. The drive is about {istKm} km, roughly {istMin} minutes outside rush hour."],
        ["And from Sabiha Gökçen?", "€{saw} per car in a sedan, about {sawKm} km and {sawMin} minutes outside rush hour."],
        ["Will the driver take me to my hotel's door?", "Yes. Give us the hotel name or address when you book and the driver takes you to the door, or to the nearest point a car can reach."]
      ],
      more: "Other places in Istanbul"
    },
    ru: {
      path: s => `/ru/taksi-iz-aeroporta-v-${s}`,
      title: "Такси из аэропорта в {place} · от €{min} за машину",
      desc: "Такси из аэропорта в {place}, Стамбул: €{ist} из аэропорта Стамбула, €{saw} из Сабихи Гёкчен за машину. Водитель с табличкой, оплата наличными.",
      h1: "Такси из аэропорта в {place}",
      lead: "Такси в {place} стоит фиксированные <strong>€{ist} за машину</strong> из аэропорта Стамбула и <strong>€{saw}</strong> из Сабихи Гёкчен на седане до 3 пассажиров. {place} входит в нашу ценовую зону {zone}; платные дороги и парковка включены, оплата водителю наличными.",
      pricesH: "Цены до {place}", from: "Откуда", aboutH: "О районе {place}", sights: "Рядом", tip: "Совет водителя", zone: "Та же цена, что",
      faq: [
        ["Сколько стоит такси из аэропорта Стамбула в {place}?", "Фиксированные €{ist} за седан, €{van} за минивэн до 7 человек и €{vclass} за Mercedes V-Class. Около {istKm} км, примерно {istMin} минут вне часа пик."],
        ["А из Сабихи Гёкчен?", "€{saw} за седан, около {sawKm} км и {sawMin} минут вне часа пик."],
        ["Водитель довезёт до дверей отеля?", "Да. Укажите при заказе название или адрес отеля, и водитель довезёт вас до двери или до ближайшего места, куда может подъехать машина."]
      ],
      more: "Другие районы Стамбула"
    },
    de: {
      path: s => `/de/flughafen-taxi-nach-${s}`,
      title: "Flughafentaxi nach {place} · Festpreis ab €{min}",
      desc: "Privates Flughafentaxi nach {place}, Istanbul: €{ist} ab Flughafen Istanbul, €{saw} ab Sabiha Gökçen, pro Auto. Fahrer mit Namensschild, Barzahlung.",
      h1: "Flughafentaxi nach {place}",
      lead: "Ein Privattaxi nach {place} kostet fest <strong>€{ist} pro Auto</strong> ab Flughafen Istanbul und <strong>€{saw}</strong> ab Sabiha Gökçen im Sedan für bis zu 3 Personen. {place} liegt in unserer Preiszone {zone}; Maut und Parken sind inklusive, Sie zahlen bar beim Fahrer.",
      pricesH: "Preise nach {place}", from: "Ab", aboutH: "Über {place}", sights: "In der Nähe", tip: "Tipp vom Fahrer", zone: "Gleicher Preis wie",
      faq: [
        ["Was kostet ein Taxi vom Flughafen Istanbul nach {place}?", "Fest €{ist} pro Auto im Sedan, €{van} im Minivan für bis zu 7 und €{vclass} im Mercedes V-Class. Die Fahrt ist etwa {istKm} km lang, rund {istMin} Minuten außerhalb der Stoßzeit."],
        ["Und ab Sabiha Gökçen?", "€{saw} pro Auto im Sedan, etwa {sawKm} km und {sawMin} Minuten außerhalb der Stoßzeit."],
        ["Bringt mich der Fahrer bis vor das Hotel?", "Ja. Nennen Sie bei der Buchung Hotelname oder Adresse; der Fahrer bringt Sie bis vor die Tür oder bis zum nächsten mit dem Auto erreichbaren Punkt."]
      ],
      more: "Weitere Orte in Istanbul"
    },
    fr: {
      path: s => `/fr/taxi-aeroport-vers-${s}`,
      title: "Taxi aéroport vers {place} · Prix fixe dès €{min}",
      desc: "Taxi privé de l'aéroport vers {place}, Istanbul : €{ist} depuis l'aéroport d'Istanbul, €{saw} depuis Sabiha Gökçen, par voiture. Paiement en espèces.",
      h1: "Taxi de l'aéroport vers {place}",
      lead: "Un taxi privé vers {place} coûte un prix fixe de <strong>€{ist} par voiture</strong> depuis l'aéroport d'Istanbul et de <strong>€{saw}</strong> depuis Sabiha Gökçen en berline jusqu'à 3 passagers. {place} fait partie de notre zone tarifaire {zone} ; péages et parking inclus, paiement en espèces au chauffeur.",
      pricesH: "Prix vers {place}", from: "Depuis", aboutH: "À propos de {place}", sights: "À proximité", tip: "Le conseil du chauffeur", zone: "Même prix que",
      faq: [
        ["Combien coûte un taxi de l'aéroport d'Istanbul à {place} ?", "Un prix fixe de €{ist} par voiture en berline, €{van} en monospace jusqu'à 7 et €{vclass} en Mercedes Classe V. Environ {istKm} km, soit {istMin} minutes hors heures de pointe."],
        ["Et depuis Sabiha Gökçen ?", "€{saw} par voiture en berline, environ {sawKm} km et {sawMin} minutes hors heures de pointe."],
        ["Le chauffeur me dépose-t-il devant l'hôtel ?", "Oui. Indiquez le nom ou l'adresse de l'hôtel à la réservation : le chauffeur vous dépose devant la porte ou au point le plus proche accessible en voiture."]
      ],
      more: "Autres quartiers d'Istanbul"
    },
    it: {
      path: s => `/it/taxi-aeroporto-per-${s}`,
      title: "Taxi aeroporto per {place} · Prezzo fisso da €{min}",
      desc: "Taxi privato dall'aeroporto per {place}, Istanbul: €{ist} dall'Aeroporto di Istanbul, €{saw} da Sabiha Gökçen, per auto. Autista con cartello, contanti.",
      h1: "Taxi dall'aeroporto per {place}",
      lead: "Un taxi privato per {place} costa un prezzo fisso di <strong>€{ist} per auto</strong> dall'Aeroporto di Istanbul e di <strong>€{saw}</strong> da Sabiha Gökçen in berlina fino a 3 passeggeri. {place} rientra nella nostra zona di prezzo {zone}; pedaggi e parcheggio inclusi, paghi l'autista in contanti.",
      pricesH: "Prezzi per {place}", from: "Da", aboutH: "Informazioni su {place}", sights: "Nei dintorni", tip: "Il consiglio dell'autista", zone: "Stesso prezzo di",
      faq: [
        ["Quanto costa un taxi dall'Aeroporto di Istanbul a {place}?", "Un prezzo fisso di €{ist} per auto in berlina, €{van} in minivan fino a 7 e €{vclass} in Mercedes Classe V. Circa {istKm} km, più o meno {istMin} minuti fuori dall'ora di punta."],
        ["E da Sabiha Gökçen?", "€{saw} per auto in berlina, circa {sawKm} km e {sawMin} minuti fuori dall'ora di punta."],
        ["L'autista mi porta fino all'hotel?", "Sì. Indica nome o indirizzo dell'hotel quando prenoti: l'autista ti porta alla porta o al punto più vicino raggiungibile in auto."]
      ],
      more: "Altri luoghi di Istanbul"
    },
    nl: {
      path: s => `/nl/luchthaven-taxi-naar-${s}`,
      title: "Luchthaventaxi naar {place} · Vaste prijs vanaf €{min}",
      desc: "Privé luchthaventaxi naar {place}, Istanbul: €{ist} vanaf Istanbul Airport, €{saw} vanaf Sabiha Gökçen, per auto. Chauffeur met naambord, contant betalen.",
      h1: "Luchthaventaxi naar {place}",
      lead: "Een privétaxi naar {place} kost vast <strong>€{ist} per auto</strong> vanaf Istanbul Airport en <strong>€{saw}</strong> vanaf Sabiha Gökçen in een sedan voor maximaal 3 personen. {place} valt in onze prijszone {zone}; tol en parkeren zijn inbegrepen en je betaalt de chauffeur contant.",
      pricesH: "Prijzen naar {place}", from: "Vanaf", aboutH: "Over {place}", sights: "In de buurt", tip: "Tip van de chauffeur", zone: "Zelfde prijs als",
      faq: [
        ["Wat kost een taxi van Istanbul Airport naar {place}?", "Vast €{ist} per auto in een sedan, €{van} in een minivan voor maximaal 7 en €{vclass} in een Mercedes V-Klasse. Ongeveer {istKm} km, zo'n {istMin} minuten buiten de spits."],
        ["En vanaf Sabiha Gökçen?", "€{saw} per auto in een sedan, ongeveer {sawKm} km en {sawMin} minuten buiten de spits."],
        ["Brengt de chauffeur me tot aan het hotel?", "Ja. Geef bij het boeken de naam of het adres van je hotel op; de chauffeur brengt je tot de deur of tot het dichtstbijzijnde punt dat met de auto bereikbaar is."]
      ],
      more: "Andere plekken in Istanbul"
    }
  },
  L: [
    {
      id: "nisantasi", zone: "sisli", name: { en: "Nişantaşı", ru: "Нишанташи", de: "Nişantaşı", fr: "Nişantaşı", it: "Nişantaşı", nl: "Nişantaşı" },
      en: { about: "Nişantaşı is Istanbul's most elegant shopping district, with designer boutiques on Abdi İpekçi Street, cafés, galleries and stylish boutique hotels a short walk from Taksim.", sights: ["Abdi İpekçi Street", "Maçka Park", "Teşvikiye Mosque", "City's Nişantaşı"], tip: "Many streets here are narrow and one-way, so the driver may stop around the corner from your hotel at busy times." },
      ru: { about: "Нишанташи — самый элегантный торговый район Стамбула: бутики дизайнеров на улице Абди Ипекчи, кафе, галереи и стильные бутик-отели в нескольких минутах ходьбы от Таксима.", sights: ["Улица Абди Ипекчи", "Парк Мачка", "Мечеть Тешвикие", "ТЦ City's Nişantaşı"], tip: "Многие улицы здесь узкие и с односторонним движением, поэтому в часы пик водитель может остановиться за углом от отеля." },
      de: { about: "Nişantaşı ist Istanbuls elegantestes Einkaufsviertel, mit Designerboutiquen in der Abdi-İpekçi-Straße, Cafés, Galerien und stilvollen Boutiquehotels, nur ein kurzer Spaziergang vom Taksim entfernt.", sights: ["Abdi-İpekçi-Straße", "Maçka-Park", "Teşvikiye-Moschee", "City's Nişantaşı"], tip: "Viele Straßen sind eng und Einbahnstraßen; zu Stoßzeiten hält der Fahrer eventuell um die Ecke vom Hotel." },
      fr: { about: "Nişantaşı est le quartier commerçant le plus élégant d'Istanbul, avec les boutiques de créateurs de la rue Abdi İpekçi, des cafés, des galeries et des hôtels de charme à quelques minutes à pied de Taksim.", sights: ["Rue Abdi İpekçi", "Parc de Maçka", "Mosquée de Teşvikiye", "City's Nişantaşı"], tip: "Beaucoup de rues sont étroites et à sens unique : aux heures chargées, le chauffeur peut s'arrêter au coin de votre hôtel." },
      it: { about: "Nişantaşı è il quartiere dello shopping più elegante di Istanbul, con le boutique delle griffe in via Abdi İpekçi, caffè, gallerie e hotel boutique a pochi passi da Taksim.", sights: ["Via Abdi İpekçi", "Parco di Maçka", "Moschea di Teşvikiye", "City's Nişantaşı"], tip: "Molte strade sono strette e a senso unico: nelle ore di punta l'autista può fermarsi dietro l'angolo dell'hotel." },
      nl: { about: "Nişantaşı is de chicste winkelwijk van Istanbul, met designerboetieks in de Abdi İpekçi-straat, cafés, galerieën en stijlvolle boetiekhotels op loopafstand van Taksim.", sights: ["Abdi İpekçi-straat", "Maçkapark", "Teşvikiye-moskee", "City's Nişantaşı"], tip: "Veel straten zijn smal en eenrichtingsverkeer; op drukke momenten stopt de chauffeur misschien om de hoek van je hotel." }
    },
    {
      id: "levent", zone: "besiktas", name: { en: "Levent", ru: "Левент", de: "Levent", fr: "Levent", it: "Levent", nl: "Levent" },
      en: { about: "Levent is Istanbul's central business district, with the city's tallest office towers, international business hotels and large shopping malls along Büyükdere Avenue.", sights: ["Kanyon", "Metrocity", "Sapphire tower", "Zorlu Center"], tip: "Büyükdere Avenue is slow at office rush hour. For a morning meeting, book an early pickup." },
      ru: { about: "Левент — центральный деловой район Стамбула: самые высокие офисные башни города, международные бизнес-отели и крупные торговые центры вдоль проспекта Бююкдере.", sights: ["ТЦ Kanyon", "ТЦ Metrocity", "Башня Sapphire", "Zorlu Center"], tip: "Проспект Бююкдере загружен в часы пик. На утреннюю встречу закажите трансфер пораньше." },
      de: { about: "Levent ist Istanbuls zentrales Geschäftsviertel, mit den höchsten Bürotürmen der Stadt, internationalen Businesshotels und großen Einkaufszentren entlang der Büyükdere-Straße.", sights: ["Kanyon", "Metrocity", "Sapphire-Turm", "Zorlu Center"], tip: "Die Büyükdere-Straße ist zur Pendlerzeit langsam. Für ein Meeting am Morgen buchen Sie besser eine frühe Abholung." },
      fr: { about: "Levent est le quartier d'affaires central d'Istanbul, avec les plus hautes tours de bureaux de la ville, des hôtels d'affaires internationaux et de grands centres commerciaux le long de l'avenue Büyükdere.", sights: ["Kanyon", "Metrocity", "Tour Sapphire", "Zorlu Center"], tip: "L'avenue Büyükdere est lente aux heures de bureau. Pour un rendez-vous le matin, réservez une prise en charge tôt." },
      it: { about: "Levent è il distretto centrale degli affari di Istanbul, con i grattacieli più alti della città, hotel business internazionali e grandi centri commerciali lungo viale Büyükdere.", sights: ["Kanyon", "Metrocity", "Torre Sapphire", "Zorlu Center"], tip: "Viale Büyükdere è lento nelle ore di punta degli uffici. Per una riunione al mattino prenota un ritiro presto." },
      nl: { about: "Levent is het centrale zakendistrict van Istanbul, met de hoogste kantoortorens van de stad, internationale zakenhotels en grote winkelcentra langs de Büyükdere-avenue.", sights: ["Kanyon", "Metrocity", "Sapphire-toren", "Zorlu Center"], tip: "De Büyükdere-avenue is traag in de kantoorspits. Boek voor een ochtendafspraak een vroege ophaaltijd." }
    },
    {
      id: "maslak", zone: "sisli", name: { en: "Maslak", ru: "Маслак", de: "Maslak", fr: "Maslak", it: "Maslak", nl: "Maslak" },
      en: { about: "Maslak is a modern business district of glass towers, corporate headquarters and business hotels, on the motorway towards Istanbul Airport.", sights: ["Maslak business towers", "İstinye Park", "Vadistanbul", "Istanbul Technical University"], tip: "Maslak is one of the quickest transfers from Istanbul Airport, straight along the northern motorway." },
      ru: { about: "Маслак — современный деловой район стеклянных башен, штаб-квартир компаний и бизнес-отелей на трассе в сторону аэропорта Стамбула.", sights: ["Деловые башни Маслака", "ТЦ İstinye Park", "Vadistanbul", "Стамбульский технический университет"], tip: "Маслак — один из самых быстрых трансферов из аэропорта Стамбула, прямо по северной автомагистрали." },
      de: { about: "Maslak ist ein modernes Geschäftsviertel mit Glastürmen, Firmenzentralen und Businesshotels an der Autobahn Richtung Flughafen Istanbul.", sights: ["Bürotürme von Maslak", "İstinye Park", "Vadistanbul", "Technische Universität Istanbul"], tip: "Maslak ist einer der schnellsten Transfers vom Flughafen Istanbul, direkt über die nördliche Autobahn." },
      fr: { about: "Maslak est un quartier d'affaires moderne de tours de verre, de sièges sociaux et d'hôtels d'affaires, sur l'autoroute vers l'aéroport d'Istanbul.", sights: ["Tours d'affaires de Maslak", "İstinye Park", "Vadistanbul", "Université technique d'Istanbul"], tip: "Maslak est l'un des transferts les plus rapides depuis l'aéroport d'Istanbul, tout droit par l'autoroute du nord." },
      it: { about: "Maslak è un moderno distretto d'affari di torri di vetro, sedi aziendali e hotel business, sull'autostrada verso l'Aeroporto di Istanbul.", sights: ["Torri d'affari di Maslak", "İstinye Park", "Vadistanbul", "Politecnico di Istanbul"], tip: "Maslak è uno dei trasferimenti più rapidi dall'Aeroporto di Istanbul, dritto lungo l'autostrada nord." },
      nl: { about: "Maslak is een modern zakendistrict met glazen torens, hoofdkantoren en zakenhotels aan de snelweg richting Istanbul Airport.", sights: ["Kantoortorens van Maslak", "İstinye Park", "Vadistanbul", "Technische Universiteit Istanbul"], tip: "Maslak is een van de snelste transfers vanaf Istanbul Airport, rechtstreeks over de noordelijke snelweg." }
    },
    {
      id: "ortakoy", zone: "besiktas", name: { en: "Ortaköy", ru: "Ортакёй", de: "Ortaköy", fr: "Ortaköy", it: "Ortaköy", nl: "Ortaköy" },
      en: { about: "Ortaköy is a lively Bosphorus village beneath the Bosphorus Bridge, known for its waterfront mosque, weekend market, kumpir stalls and luxury hotels by the water.", sights: ["Ortaköy Mosque", "Bosphorus Bridge", "Ortaköy pier", "Çırağan Palace"], tip: "The waterfront road is busy on summer evenings and weekends; the driver may use the road above the village." },
      ru: { about: "Ортакёй — оживлённая деревня на Босфоре под Босфорским мостом, известная мечетью у воды, рынком выходного дня, лавками с кумпиром и роскошными отелями на берегу.", sights: ["Мечеть Ортакёй", "Босфорский мост", "Причал Ортакёй", "Дворец Чыраган"], tip: "Набережная загружена летними вечерами и в выходные; водитель может поехать по верхней дороге." },
      de: { about: "Ortaköy ist ein lebhaftes Bosporusdorf unter der Bosporusbrücke, bekannt für seine Moschee am Wasser, den Wochenendmarkt, Kumpir-Stände und Luxushotels am Ufer.", sights: ["Ortaköy-Moschee", "Bosporusbrücke", "Anleger Ortaköy", "Çırağan-Palast"], tip: "Die Uferstraße ist an Sommerabenden und Wochenenden voll; der Fahrer nimmt dann eventuell die Straße oberhalb des Dorfes." },
      fr: { about: "Ortaköy est un village animé du Bosphore au pied du pont du Bosphore, connu pour sa mosquée au bord de l'eau, son marché du week-end, ses stands de kumpir et ses hôtels de luxe sur la rive.", sights: ["Mosquée d'Ortaköy", "Pont du Bosphore", "Embarcadère d'Ortaköy", "Palais de Çırağan"], tip: "La route du bord de l'eau est chargée les soirs d'été et le week-end ; le chauffeur peut passer par la route au-dessus du village." },
      it: { about: "Ortaköy è un vivace villaggio sul Bosforo sotto il Ponte sul Bosforo, noto per la moschea sull'acqua, il mercato del fine settimana, i chioschi di kumpir e gli hotel di lusso sul mare.", sights: ["Moschea di Ortaköy", "Ponte sul Bosforo", "Molo di Ortaköy", "Palazzo Çırağan"], tip: "La strada sul mare è trafficata nelle sere d'estate e nei weekend; l'autista può usare la strada sopra il villaggio." },
      nl: { about: "Ortaköy is een levendig Bosporusdorp onder de Bosporusbrug, bekend om zijn moskee aan het water, de weekendmarkt, kumpir-kraampjes en luxehotels aan de oever.", sights: ["Ortaköy-moskee", "Bosporusbrug", "Aanlegsteiger Ortaköy", "Çırağan-paleis"], tip: "De kustweg is druk op zomeravonden en in het weekend; de chauffeur neemt dan misschien de weg boven het dorp." }
    },
    {
      id: "bebek", zone: "besiktas", name: { en: "Bebek", ru: "Бебек", de: "Bebek", fr: "Bebek", it: "Bebek", nl: "Bebek" },
      en: { about: "Bebek is one of the most beautiful bays on the Bosphorus, with a seaside promenade, cafés, Ottoman mansions and boutique hotels on the water.", sights: ["Bebek Bay", "Bebek Park", "Rumeli Fortress", "Boğaziçi University"], tip: "Parking on the coastal road is tight. The driver stops right at your door, so be ready with your luggage when you leave." },
      ru: { about: "Бебек — один из самых красивых заливов Босфора: набережная, кафе, османские особняки и бутик-отели у воды.", sights: ["Залив Бебек", "Парк Бебек", "Крепость Румелихисар", "Университет Богазичи"], tip: "Парковаться на прибрежной дороге сложно. Водитель остановится прямо у двери, поэтому при выезде будьте готовы с багажом." },
      de: { about: "Bebek ist eine der schönsten Buchten am Bosporus, mit Uferpromenade, Cafés, osmanischen Villen und Boutiquehotels direkt am Wasser.", sights: ["Bucht von Bebek", "Bebek-Park", "Festung Rumeli Hisarı", "Boğaziçi-Universität"], tip: "Parken an der Uferstraße ist knapp. Der Fahrer hält direkt vor der Tür; halten Sie bei der Abfahrt Ihr Gepäck bereit." },
      fr: { about: "Bebek est l'une des plus belles baies du Bosphore, avec sa promenade, ses cafés, ses demeures ottomanes et ses hôtels de charme au bord de l'eau.", sights: ["Baie de Bebek", "Parc de Bebek", "Forteresse de Rumeli", "Université du Bosphore"], tip: "Se garer sur la route côtière est difficile. Le chauffeur s'arrête devant votre porte : soyez prêt avec vos bagages au départ." },
      it: { about: "Bebek è una delle baie più belle del Bosforo, con passeggiata sul mare, caffè, ville ottomane e hotel boutique sull'acqua.", sights: ["Baia di Bebek", "Parco di Bebek", "Fortezza di Rumeli", "Università del Bosforo"], tip: "Parcheggiare sulla strada costiera è difficile. L'autista si ferma davanti alla porta: alla partenza tieni pronti i bagagli." },
      nl: { about: "Bebek is een van de mooiste baaien aan de Bosporus, met een boulevard, cafés, Ottomaanse villa's en boetiekhotels aan het water.", sights: ["Baai van Bebek", "Bebekpark", "Fort Rumeli Hisarı", "Boğaziçi-universiteit"], tip: "Parkeren aan de kustweg is lastig. De chauffeur stopt direct voor de deur, dus houd bij vertrek je bagage klaar." }
    },
    {
      id: "eminonu", zone: "sultanahmet", name: { en: "Eminönü", ru: "Эминёню", de: "Eminönü", fr: "Eminönü", it: "Eminönü", nl: "Eminönü" },
      en: { about: "Eminönü is the busy waterfront of the Old City at the Golden Horn, with the Spice Bazaar, the New Mosque, ferry piers and the Galata Bridge, a few minutes from Sultanahmet.", sights: ["Spice Bazaar", "New Mosque", "Galata Bridge", "Rüstem Pasha Mosque", "Sirkeci Station"], tip: "The streets around the bazaar are crowded and partly closed to traffic in the daytime; the driver stops at the closest open street." },
      ru: { about: "Эминёню — оживлённая набережная Старого города у Золотого Рога: Египетский базар, Новая мечеть, паромные причалы и Галатский мост в нескольких минутах от Султанахмета.", sights: ["Египетский базар", "Новая мечеть", "Галатский мост", "Мечеть Рустем-паши", "Вокзал Сиркеджи"], tip: "Улицы вокруг базара днём многолюдны и частично закрыты для машин; водитель остановится на ближайшей открытой улице." },
      de: { about: "Eminönü ist das belebte Ufer der Altstadt am Goldenen Horn, mit dem Ägyptischen Basar, der Neuen Moschee, Fähranlegern und der Galatabrücke, wenige Minuten von Sultanahmet.", sights: ["Ägyptischer Basar", "Neue Moschee", "Galatabrücke", "Rüstem-Pascha-Moschee", "Bahnhof Sirkeci"], tip: "Die Straßen um den Basar sind tagsüber voll und teils für Autos gesperrt; der Fahrer hält an der nächsten offenen Straße." },
      fr: { about: "Eminönü est le front de mer animé de la vieille ville sur la Corne d'Or, avec le Bazar égyptien, la Mosquée Neuve, les embarcadères et le pont de Galata, à quelques minutes de Sultanahmet.", sights: ["Bazar égyptien", "Mosquée Neuve", "Pont de Galata", "Mosquée Rüstem Pacha", "Gare de Sirkeci"], tip: "Les rues autour du bazar sont bondées et en partie fermées à la circulation en journée ; le chauffeur s'arrête dans la rue ouverte la plus proche." },
      it: { about: "Eminönü è il vivace lungomare della città vecchia sul Corno d'Oro, con il Bazar delle Spezie, la Moschea Nuova, gli imbarchi dei traghetti e il Ponte di Galata, a pochi minuti da Sultanahmet.", sights: ["Bazar delle Spezie", "Moschea Nuova", "Ponte di Galata", "Moschea di Rüstem Pasha", "Stazione di Sirkeci"], tip: "Le strade intorno al bazar sono affollate e in parte chiuse al traffico di giorno; l'autista si ferma nella strada aperta più vicina." },
      nl: { about: "Eminönü is de drukke waterkant van de oude stad aan de Gouden Hoorn, met de Egyptische Bazaar, de Nieuwe Moskee, veerbootsteigers en de Galatabrug, op een paar minuten van Sultanahmet.", sights: ["Egyptische Bazaar", "Nieuwe Moskee", "Galatabrug", "Rüstem Paşa-moskee", "Station Sirkeci"], tip: "De straten rond de bazaar zijn overdag druk en deels afgesloten voor verkeer; de chauffeur stopt in de dichtstbijzijnde open straat." }
    },
    {
      id: "florya", zone: "bakirkoy", name: { en: "Florya", ru: "Флорья", de: "Florya", fr: "Florya", it: "Florya", nl: "Florya" },
      en: { about: "Florya is a green seaside neighbourhood on the Sea of Marmara, with a beach park, the Istanbul Aquarium and quiet hotels near the old Atatürk Airport.", sights: ["Istanbul Aquarium", "Florya beach park", "Florya Atatürk Marine Mansion", "Yeşilköy"], tip: "Florya is one of the shortest transfers from Istanbul Airport on the western side." },
      ru: { about: "Флорья — зелёный приморский район на берегу Мраморного моря с пляжным парком, Стамбульским аквариумом и тихими отелями рядом со старым аэропортом Ататюрка.", sights: ["Стамбульский аквариум", "Пляжный парк Флорья", "Морской павильон Ататюрка", "Ешилькёй"], tip: "Флорья — один из самых коротких трансферов из аэропорта Стамбула на западной стороне." },
      de: { about: "Florya ist ein grünes Küstenviertel am Marmarameer mit Strandpark, dem Istanbul Aquarium und ruhigen Hotels nahe dem alten Atatürk-Flughafen.", sights: ["Istanbul Aquarium", "Strandpark Florya", "Atatürk-Seepavillon Florya", "Yeşilköy"], tip: "Florya ist einer der kürzesten Transfers vom Flughafen Istanbul auf der Westseite." },
      fr: { about: "Florya est un quartier vert en bord de mer de Marmara, avec un parc de plage, l'Aquarium d'Istanbul et des hôtels calmes près de l'ancien aéroport Atatürk.", sights: ["Aquarium d'Istanbul", "Parc de la plage de Florya", "Pavillon marin d'Atatürk", "Yeşilköy"], tip: "Florya est l'un des transferts les plus courts depuis l'aéroport d'Istanbul côté ouest." },
      it: { about: "Florya è un quartiere verde sul Mar di Marmara, con un parco sulla spiaggia, l'Acquario di Istanbul e hotel tranquilli vicino al vecchio aeroporto Atatürk.", sights: ["Acquario di Istanbul", "Parco della spiaggia di Florya", "Padiglione sul mare di Atatürk", "Yeşilköy"], tip: "Florya è uno dei trasferimenti più brevi dall'Aeroporto di Istanbul sul lato ovest." },
      nl: { about: "Florya is een groene kustwijk aan de Zee van Marmara, met een strandpark, het Istanbul Aquarium en rustige hotels vlak bij de oude Atatürk-luchthaven.", sights: ["Istanbul Aquarium", "Strandpark Florya", "Atatürk-zeepaviljoen", "Yeşilköy"], tip: "Florya is een van de kortste transfers vanaf Istanbul Airport aan de westkant." }
    }
  ]
};
