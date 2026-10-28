// Service pages beyond airport transfers: chauffeur by the hour, city tour with a driver, wedding and event cars.
// No fixed prices (they depend on hours and route): each page asks for a quote on WhatsApp, with the text prefilled.
// T: shared labels per language; S: the services in order, each with its texts per language.
module.exports = {
  T: {
    en: { head: "Services", whatH: "What you get", howH: "How it works", ask: "Ask for a price on WhatsApp", call: "or call", cars: "Cars", waText: "Hello, I would like a price for: {service}. Date: , hours: , passengers: " },
    ru: { head: "Услуги", whatH: "Что входит", howH: "Как это работает", ask: "Узнать цену в WhatsApp", call: "или позвоните", cars: "Автомобили", waText: "Здравствуйте, хочу узнать цену: {service}. Дата: , часов: , пассажиров: " },
    de: { head: "Leistungen", whatH: "Das bekommen Sie", howH: "So funktioniert es", ask: "Preis per WhatsApp anfragen", call: "oder anrufen", cars: "Fahrzeuge", waText: "Hallo, ich möchte einen Preis für: {service}. Datum: , Stunden: , Personen: " },
    fr: { head: "Services", whatH: "Ce qui est inclus", howH: "Comment ça marche", ask: "Demander un prix sur WhatsApp", call: "ou appelez", cars: "Véhicules", waText: "Bonjour, je souhaite un prix pour : {service}. Date : , heures : , passagers : " },
    it: { head: "Servizi", whatH: "Cosa è incluso", howH: "Come funziona", ask: "Chiedi un prezzo su WhatsApp", call: "o chiama", cars: "Veicoli", waText: "Buongiorno, vorrei un prezzo per: {service}. Data: , ore: , passeggeri: " },
    nl: { head: "Diensten", whatH: "Wat je krijgt", howH: "Hoe het werkt", ask: "Vraag een prijs via WhatsApp", call: "of bel", cars: "Auto's", waText: "Hallo, ik wil graag een prijs voor: {service}. Datum: , uren: , personen: " }
  },
  S: [
    {
      id: "hourly",
      en: {
        path: "/chauffeur-service-istanbul", nav: "Chauffeur by the hour",
        title: "Chauffeur Service in Istanbul · Car with Driver by the Hour",
        desc: "Hire a car with a driver in Istanbul by the hour or the day: meetings, shopping, several stops. Sedan, minivan, V-Class or minibus at a price agreed in advance.",
        h1: "Chauffeur service in Istanbul by the hour",
        lead: "Hire a car with a professional driver for a few hours or a full day. The driver waits between stops, so you can go from meeting to meeting, shop or visit friends without looking for a taxi. The price is agreed in advance and paid in cash.",
        points: ["Your own car and driver for as long as you need, from a few hours to a full day", "The driver waits at every stop; no meter and no new taxi each time", "Sedan, minivan, Mercedes V-Class or minibus for up to 16", "Can start or end with an airport transfer", "Price agreed in advance per hour or per day, tolls and parking included"],
        how: [["Tell us your plan", "Date, start time, about how many hours and roughly where you want to go."], ["Get your price", "We reply on WhatsApp with a fixed price for the car you choose."], ["Ride", "Your driver picks you up and stays with you for the day. Pay in cash at the end."]],
        faq: [["How much is a car with driver in Istanbul per hour?", "It depends on the car and the number of hours. Send us your plan on WhatsApp and we reply with a fixed price, tolls and parking included."], ["Is there a minimum?", "Hourly bookings usually start from a few hours; a full day is cheaper per hour. Ask us for your exact plan."], ["Can I change the stops on the day?", "Yes, within Istanbul and the hours you booked. Just tell your driver."]]
      },
      ru: {
        path: "/ru/arenda-avto-s-voditelem", nav: "Авто с водителем по часам",
        title: "Аренда авто с водителем в Стамбуле · почасово и на день",
        desc: "Аренда машины с водителем в Стамбуле на несколько часов или на день: встречи, шопинг, несколько остановок. Седан, минивэн, V-Class или микроавтобус.",
        h1: "Аренда автомобиля с водителем в Стамбуле",
        lead: "Машина с профессиональным водителем на несколько часов или на целый день. Водитель ждёт между остановками: можно ездить на встречи, по магазинам или в гости, не ища такси. Цена согласуется заранее, оплата наличными.",
        points: ["Своя машина с водителем на столько, сколько нужно: от нескольких часов до целого дня", "Водитель ждёт на каждой остановке, без счётчика и без поиска нового такси", "Седан, минивэн, Mercedes V-Class или микроавтобус до 16 человек", "Можно начать или закончить трансфером в аэропорт", "Цена за час или за день согласуется заранее, платные дороги и парковка включены"],
        how: [["Расскажите о планах", "Дата, время начала, примерно сколько часов и куда хотите поехать."], ["Получите цену", "Мы ответим в WhatsApp с фиксированной ценой за выбранную машину."], ["Поездка", "Водитель заберёт вас и будет с вами весь день. Оплата наличными в конце."]],
        faq: [["Сколько стоит машина с водителем в Стамбуле в час?", "Зависит от машины и количества часов. Напишите нам план в WhatsApp, и мы ответим с фиксированной ценой, включая платные дороги и парковку."], ["Есть минимальное время?", "Почасовая аренда обычно от нескольких часов; полный день выгоднее в пересчёте на час. Уточните у нас под ваш план."], ["Можно менять остановки в течение дня?", "Да, в пределах Стамбула и забронированных часов. Просто скажите водителю."]]
      },
      de: {
        path: "/de/chauffeur-service-istanbul", nav: "Fahrer stundenweise",
        title: "Chauffeurservice Istanbul · Auto mit Fahrer stundenweise",
        desc: "Auto mit Fahrer in Istanbul stundenweise oder tageweise: Termine, Shopping, mehrere Stopps. Sedan, Minivan, V-Klasse oder Minibus zum Festpreis.",
        h1: "Chauffeurservice in Istanbul, stundenweise",
        lead: "Mieten Sie ein Auto mit professionellem Fahrer für einige Stunden oder einen ganzen Tag. Der Fahrer wartet zwischen den Stopps, so kommen Sie ohne Taxisuche von Termin zu Termin, zum Shopping oder zu Freunden. Der Preis wird vorab vereinbart und bar bezahlt.",
        points: ["Eigenes Auto mit Fahrer so lange Sie möchten, von einigen Stunden bis zum ganzen Tag", "Der Fahrer wartet an jedem Stopp; kein Taxameter, kein neues Taxi", "Sedan, Minivan, Mercedes V-Klasse oder Minibus für bis zu 16", "Auf Wunsch mit Flughafentransfer am Anfang oder Ende", "Preis pro Stunde oder Tag vorab vereinbart, Maut und Parken inklusive"],
        how: [["Plan nennen", "Datum, Startzeit, ungefähre Stundenzahl und wohin Sie möchten."], ["Preis erhalten", "Wir antworten per WhatsApp mit einem Festpreis für das gewählte Auto."], ["Losfahren", "Ihr Fahrer holt Sie ab und bleibt den Tag über bei Ihnen. Barzahlung am Ende."]],
        faq: [["Was kostet ein Auto mit Fahrer in Istanbul pro Stunde?", "Das hängt vom Auto und der Stundenzahl ab. Schicken Sie uns Ihren Plan per WhatsApp; wir antworten mit einem Festpreis inklusive Maut und Parken."], ["Gibt es eine Mindestdauer?", "Stundenweise Buchungen beginnen meist bei einigen Stunden; ein ganzer Tag ist pro Stunde günstiger. Fragen Sie uns für Ihren Plan."], ["Kann ich die Stopps am Tag ändern?", "Ja, innerhalb Istanbuls und der gebuchten Stunden. Sagen Sie es einfach Ihrem Fahrer."]]
      },
      fr: {
        path: "/fr/chauffeur-prive-istanbul", nav: "Chauffeur à l'heure",
        title: "Chauffeur privé à Istanbul · Voiture avec chauffeur à l'heure",
        desc: "Voiture avec chauffeur à Istanbul à l'heure ou à la journée : rendez-vous, shopping, plusieurs arrêts. Berline, monospace, Classe V ou minibus, prix fixe.",
        h1: "Chauffeur privé à Istanbul, à l'heure",
        lead: "Louez une voiture avec un chauffeur professionnel pour quelques heures ou une journée. Le chauffeur attend entre les arrêts : vous enchaînez rendez-vous, shopping ou visites sans chercher de taxi. Le prix est fixé à l'avance et payé en espèces.",
        points: ["Votre voiture et votre chauffeur aussi longtemps que nécessaire, de quelques heures à une journée", "Le chauffeur attend à chaque arrêt ; pas de compteur ni de nouveau taxi", "Berline, monospace, Mercedes Classe V ou minibus jusqu'à 16", "Peut commencer ou finir par un transfert aéroport", "Prix à l'heure ou à la journée fixé à l'avance, péages et parking inclus"],
        how: [["Décrivez votre programme", "Date, heure de départ, nombre d'heures approximatif et lieux à visiter."], ["Recevez votre prix", "Nous répondons sur WhatsApp avec un prix fixe pour le véhicule choisi."], ["En route", "Votre chauffeur vous prend en charge et reste avec vous. Paiement en espèces à la fin."]],
        faq: [["Combien coûte une voiture avec chauffeur à Istanbul par heure ?", "Cela dépend du véhicule et du nombre d'heures. Envoyez-nous votre programme sur WhatsApp et nous répondons avec un prix fixe, péages et parking inclus."], ["Y a-t-il un minimum ?", "Les réservations à l'heure commencent en général à quelques heures ; la journée revient moins cher par heure. Demandez-nous pour votre programme."], ["Puis-je changer les arrêts dans la journée ?", "Oui, dans Istanbul et dans la limite des heures réservées. Dites-le simplement au chauffeur."]]
      },
      it: {
        path: "/it/autista-privato-istanbul", nav: "Autista a ore",
        title: "Autista privato a Istanbul · Auto con autista a ore",
        desc: "Noleggia un'auto con autista a Istanbul a ore o per la giornata: riunioni, shopping, più fermate. Berlina, minivan, Classe V o minibus a un prezzo concordato prima.",
        h1: "Autista privato a Istanbul, a ore",
        lead: "Noleggia un'auto con autista professionista per qualche ora o per tutto il giorno. L'autista aspetta tra una fermata e l'altra: passi da una riunione all'altra, fai shopping o visiti amici senza cercare un taxi. Il prezzo è concordato prima e pagato in contanti.",
        points: ["La tua auto con autista per tutto il tempo che serve, da qualche ora a una giornata", "L'autista aspetta a ogni fermata; niente tassametro né nuovi taxi", "Berlina, minivan, Mercedes Classe V o minibus fino a 16", "Può iniziare o finire con un trasferimento aeroportuale", "Prezzo orario o giornaliero concordato prima, pedaggi e parcheggio inclusi"],
        how: [["Raccontaci il programma", "Data, ora di inizio, quante ore circa e dove vuoi andare."], ["Ricevi il prezzo", "Ti rispondiamo su WhatsApp con un prezzo fisso per l'auto scelta."], ["Si parte", "L'autista ti prende e resta con te tutto il giorno. Paghi in contanti alla fine."]],
        faq: [["Quanto costa un'auto con autista a Istanbul all'ora?", "Dipende dall'auto e dal numero di ore. Mandaci il programma su WhatsApp e ti rispondiamo con un prezzo fisso, pedaggi e parcheggio inclusi."], ["C'è un minimo?", "Le prenotazioni a ore partono di solito da qualche ora; la giornata intera costa meno all'ora. Chiedici per il tuo programma."], ["Posso cambiare le fermate durante il giorno?", "Sì, dentro Istanbul e nelle ore prenotate. Basta dirlo all'autista."]]
      },
      nl: {
        path: "/nl/chauffeur-istanbul", nav: "Chauffeur per uur",
        title: "Chauffeursdienst Istanbul · Auto met chauffeur per uur",
        desc: "Auto met chauffeur in Istanbul per uur of per dag: afspraken, winkelen, meerdere stops. Sedan, minivan, V-Klasse of minibus voor een vaste prijs.",
        h1: "Chauffeursdienst in Istanbul per uur",
        lead: "Huur een auto met professionele chauffeur voor een paar uur of een hele dag. De chauffeur wacht tussen de stops, zodat je van afspraak naar afspraak gaat, winkelt of vrienden bezoekt zonder een taxi te zoeken. De prijs spreken we vooraf af; je betaalt contant.",
        points: ["Je eigen auto met chauffeur zo lang als nodig, van een paar uur tot een hele dag", "De chauffeur wacht bij elke stop; geen meter en geen nieuwe taxi", "Sedan, minivan, Mercedes V-Klasse of minibus tot 16 personen", "Kan beginnen of eindigen met een luchthaventransfer", "Prijs per uur of per dag vooraf afgesproken, tol en parkeren inbegrepen"],
        how: [["Vertel je plan", "Datum, starttijd, ongeveer hoeveel uur en waar je heen wilt."], ["Ontvang je prijs", "We antwoorden via WhatsApp met een vaste prijs voor de gekozen auto."], ["Rijden", "Je chauffeur haalt je op en blijft de hele dag bij je. Contant betalen aan het eind."]],
        faq: [["Wat kost een auto met chauffeur in Istanbul per uur?", "Dat hangt af van de auto en het aantal uren. Stuur ons je plan via WhatsApp; we antwoorden met een vaste prijs inclusief tol en parkeren."], ["Is er een minimum?", "Boekingen per uur beginnen meestal bij een paar uur; een hele dag is per uur goedkoper. Vraag het ons voor jouw plan."], ["Kan ik de stops op de dag veranderen?", "Ja, binnen Istanbul en de geboekte uren. Zeg het gewoon tegen je chauffeur."]]
      }
    },
    {
      id: "tour",
      en: {
        path: "/istanbul-city-tour-with-driver", nav: "City tour with driver",
        title: "Istanbul City Tour with a Private Driver · Day Trips",
        desc: "See Istanbul with a private car and driver: the Old City, the Bosphorus, Çamlıca Hill and both continents in a day. Price agreed in advance.",
        h1: "Istanbul city tour with a private driver",
        lead: "See more of Istanbul in a day with your own car and driver. Choose your stops, from the Old City to the Bosphorus villages and the Asian side; the driver takes you between them and waits while you visit. The price is agreed in advance and paid in cash.",
        points: ["A popular day: Sultanahmet, Dolmabahçe, Ortaköy, across the Bosphorus Bridge to Çamlıca Hill and back along the Asian shore", "You decide how long to stay at each stop", "Comfortable for families, older travellers and groups up to 16", "The driver drives and waits; for a licensed tour guide, ask us", "Hotel pickup and drop-off included"],
        how: [["Pick your stops", "Tell us what you'd like to see, the date and how many people."], ["Get your price", "We suggest a route and reply on WhatsApp with a fixed price."], ["Enjoy the day", "Your driver picks you up at the hotel. Pay in cash at the end."]],
        faq: [["Is the driver a tour guide?", "No, the driver drives and waits for you. Licensed guides in Türkiye are separate; ask us if you'd like one."], ["How long is a city tour?", "Most guests book 6 to 8 hours, which covers both sides of the Bosphorus with time for visits."], ["Are entrance tickets included?", "No, the price covers the car, driver, fuel, tolls and parking. Tickets for museums and palaces are paid on site."]]
      },
      ru: {
        path: "/ru/ekskursiya-po-stambulu-s-voditelem", nav: "Поездка по городу с водителем",
        title: "Поездка по Стамбулу с личным водителем · на целый день",
        desc: "Стамбул на машине с личным водителем: Старый город, берег Босфора, холм Чамлыджа и оба континента за день. Вы выбираете остановки, цена согласуется заранее.",
        h1: "Поездка по Стамбулу с личным водителем",
        lead: "Увидьте больше Стамбула за день на своей машине с водителем. Выберите остановки — от Старого города до деревень на Босфоре и азиатской стороны; водитель отвезёт вас и подождёт, пока вы гуляете. Цена согласуется заранее, оплата наличными.",
        points: ["Популярный маршрут: Султанахмет, Долмабахче, Ортакёй, через Босфорский мост на холм Чамлыджа и обратно вдоль азиатского берега", "Вы сами решаете, сколько времени провести на каждой остановке", "Удобно для семей, пожилых путешественников и групп до 16 человек", "Водитель везёт и ждёт; если нужен лицензированный гид, спросите нас", "Встреча и высадка у отеля включены"],
        how: [["Выберите остановки", "Расскажите, что хотите увидеть, дату и количество человек."], ["Получите цену", "Мы предложим маршрут и ответим в WhatsApp с фиксированной ценой."], ["Наслаждайтесь днём", "Водитель заберёт вас из отеля. Оплата наличными в конце."]],
        faq: [["Водитель — экскурсовод?", "Нет, водитель везёт и ждёт вас. Лицензированные гиды в Турции — отдельная услуга; спросите нас, если нужен гид."], ["Сколько длится поездка?", "Обычно бронируют 6–8 часов: этого хватает на обе стороны Босфора с остановками."], ["Входные билеты включены?", "Нет, цена включает машину, водителя, топливо, платные дороги и парковку. Билеты в музеи и дворцы оплачиваются на месте."]]
      },
      de: {
        path: "/de/stadtrundfahrt-istanbul-mit-fahrer", nav: "Stadtrundfahrt mit Fahrer",
        title: "Istanbul Stadtrundfahrt mit privatem Fahrer · Tagestour",
        desc: "Istanbul mit eigenem Auto und Fahrer: Altstadt, Bosporusufer, Çamlıca-Hügel und beide Kontinente an einem Tag. Stopps nach Wunsch, Preis vorab vereinbart.",
        h1: "Istanbul-Stadtrundfahrt mit privatem Fahrer",
        lead: "Sehen Sie an einem Tag mehr von Istanbul, mit eigenem Auto und Fahrer. Sie wählen die Stopps, von der Altstadt über die Bosporusdörfer bis zur asiatischen Seite; der Fahrer bringt Sie hin und wartet. Der Preis wird vorab vereinbart und bar bezahlt.",
        points: ["Beliebte Tour: Sultanahmet, Dolmabahçe, Ortaköy, über die Bosporusbrücke zum Çamlıca-Hügel und zurück am asiatischen Ufer", "Sie bestimmen, wie lange Sie an jedem Stopp bleiben", "Bequem für Familien, ältere Reisende und Gruppen bis 16", "Der Fahrer fährt und wartet; einen lizenzierten Reiseleiter vermitteln wir auf Anfrage", "Abholung und Rückfahrt zum Hotel inklusive"],
        how: [["Stopps wählen", "Sagen Sie uns, was Sie sehen möchten, das Datum und die Personenzahl."], ["Preis erhalten", "Wir schlagen eine Route vor und antworten per WhatsApp mit einem Festpreis."], ["Tag genießen", "Ihr Fahrer holt Sie am Hotel ab. Barzahlung am Ende."]],
        faq: [["Ist der Fahrer ein Reiseleiter?", "Nein, der Fahrer fährt und wartet. Lizenzierte Reiseleiter sind in der Türkei eine eigene Leistung; fragen Sie uns, wenn Sie einen möchten."], ["Wie lange dauert eine Stadtrundfahrt?", "Die meisten buchen 6 bis 8 Stunden; das reicht für beide Seiten des Bosporus mit Besichtigungen."], ["Sind Eintrittskarten inklusive?", "Nein, der Preis umfasst Auto, Fahrer, Kraftstoff, Maut und Parken. Eintritte für Museen und Paläste zahlen Sie vor Ort."]]
      },
      fr: {
        path: "/fr/visite-istanbul-avec-chauffeur", nav: "Visite avec chauffeur",
        title: "Visite d'Istanbul avec chauffeur privé · À la journée",
        desc: "Istanbul avec voiture et chauffeur privés : vieille ville, Bosphore, colline de Çamlıca et deux continents en un jour. Prix fixé à l'avance.",
        h1: "Visite d'Istanbul avec chauffeur privé",
        lead: "Voyez davantage d'Istanbul en une journée avec votre propre voiture et chauffeur. Choisissez vos arrêts, de la vieille ville aux villages du Bosphore et à la rive asiatique ; le chauffeur vous y conduit et vous attend. Le prix est fixé à l'avance et payé en espèces.",
        points: ["Une journée type : Sultanahmet, Dolmabahçe, Ortaköy, le pont du Bosphore jusqu'à la colline de Çamlıca et retour par la rive asiatique", "Vous décidez du temps passé à chaque arrêt", "Confortable pour les familles, les seniors et les groupes jusqu'à 16", "Le chauffeur conduit et attend ; pour un guide agréé, demandez-nous", "Prise en charge et retour à l'hôtel inclus"],
        how: [["Choisissez vos arrêts", "Dites-nous ce que vous souhaitez voir, la date et le nombre de personnes."], ["Recevez votre prix", "Nous proposons un itinéraire et répondons sur WhatsApp avec un prix fixe."], ["Profitez de la journée", "Votre chauffeur vient vous chercher à l'hôtel. Paiement en espèces à la fin."]],
        faq: [["Le chauffeur est-il guide ?", "Non, le chauffeur conduit et vous attend. En Turquie, les guides agréés sont un service à part ; demandez-nous si vous en souhaitez un."], ["Combien de temps dure la visite ?", "La plupart des clients réservent 6 à 8 heures, de quoi couvrir les deux rives du Bosphore avec des visites."], ["Les entrées sont-elles incluses ?", "Non, le prix couvre la voiture, le chauffeur, le carburant, les péages et le parking. Les entrées des musées et palais se paient sur place."]]
      },
      it: {
        path: "/it/tour-istanbul-con-autista", nav: "Tour con autista",
        title: "Tour di Istanbul con autista privato · Giornata intera",
        desc: "Scopri Istanbul con auto e autista privati: città vecchia, Bosforo, collina di Çamlıca e due continenti in un giorno. Scegli le tappe, prezzo concordato prima.",
        h1: "Tour di Istanbul con autista privato",
        lead: "Vedi di più di Istanbul in un giorno con la tua auto e il tuo autista. Scegli le tappe, dalla città vecchia ai villaggi del Bosforo e alla sponda asiatica; l'autista ti accompagna e ti aspetta. Il prezzo è concordato prima e pagato in contanti.",
        points: ["Una giornata tipo: Sultanahmet, Dolmabahçe, Ortaköy, il Ponte sul Bosforo fino alla collina di Çamlıca e ritorno lungo la sponda asiatica", "Decidi tu quanto restare a ogni tappa", "Comodo per famiglie, viaggiatori anziani e gruppi fino a 16", "L'autista guida e aspetta; per una guida abilitata chiedici", "Ritiro e rientro in hotel inclusi"],
        how: [["Scegli le tappe", "Dicci cosa vuoi vedere, la data e quante persone."], ["Ricevi il prezzo", "Proponiamo un percorso e rispondiamo su WhatsApp con un prezzo fisso."], ["Goditi la giornata", "L'autista ti prende in hotel. Paghi in contanti alla fine."]],
        faq: [["L'autista è una guida?", "No, l'autista guida e ti aspetta. In Turchia le guide abilitate sono un servizio a parte; chiedici se ne vuoi una."], ["Quanto dura il tour?", "Di solito si prenotano 6–8 ore, sufficienti per entrambe le sponde del Bosforo con le visite."], ["I biglietti d'ingresso sono inclusi?", "No, il prezzo copre auto, autista, carburante, pedaggi e parcheggio. Gli ingressi a musei e palazzi si pagano sul posto."]]
      },
      nl: {
        path: "/nl/stadstour-istanbul-met-chauffeur", nav: "Stadstour met chauffeur",
        title: "Stadstour Istanbul met privéchauffeur · Hele dag",
        desc: "Bekijk Istanbul met een eigen auto en chauffeur: oude stad, Bosporusoever, Çamlıca-heuvel en twee continenten op één dag. Kies je stops, prijs vooraf afgesproken.",
        h1: "Stadstour door Istanbul met privéchauffeur",
        lead: "Zie meer van Istanbul op één dag met je eigen auto en chauffeur. Kies je stops, van de oude stad tot de Bosporusdorpen en de Aziatische kant; de chauffeur brengt je erheen en wacht. De prijs spreken we vooraf af; je betaalt contant.",
        points: ["Een populaire dag: Sultanahmet, Dolmabahçe, Ortaköy, over de Bosporusbrug naar de Çamlıca-heuvel en terug langs de Aziatische oever", "Jij bepaalt hoe lang je bij elke stop blijft", "Comfortabel voor gezinnen, oudere reizigers en groepen tot 16", "De chauffeur rijdt en wacht; vraag ons naar een erkende gids", "Ophalen en terugbrengen bij het hotel inbegrepen"],
        how: [["Kies je stops", "Vertel ons wat je wilt zien, de datum en met hoeveel personen."], ["Ontvang je prijs", "We stellen een route voor en antwoorden via WhatsApp met een vaste prijs."], ["Geniet van de dag", "Je chauffeur haalt je op bij het hotel. Contant betalen aan het eind."]],
        faq: [["Is de chauffeur een gids?", "Nee, de chauffeur rijdt en wacht op je. Erkende gidsen zijn in Turkije een aparte dienst; vraag het ons als je er een wilt."], ["Hoe lang duurt een stadstour?", "De meeste gasten boeken 6 tot 8 uur; genoeg voor beide kanten van de Bosporus met bezoeken."], ["Zijn toegangskaarten inbegrepen?", "Nee, de prijs dekt auto, chauffeur, brandstof, tol en parkeren. Musea en paleizen betaal je ter plekke."]]
      }
    },
    {
      id: "wedding",
      en: {
        path: "/wedding-car-istanbul", nav: "Wedding & event cars",
        title: "Wedding Car & Event Transfers in Istanbul · With Driver",
        desc: "Cars with drivers for weddings, events and guest transfers in Istanbul: Mercedes V-Class, minivans and minibuses for up to 16, hotel to venue and back.",
        h1: "Wedding cars and event transfers in Istanbul",
        lead: "From the couple's car to shuttles for every guest: we drive weddings, conferences and private events in Istanbul. Mercedes V-Class, minivans and minibuses run between hotels, venues and the airports on one plan and one price agreed in advance.",
        points: ["Mercedes V-Class for the couple or VIP guests", "Minivans and minibuses for up to 16 guests per car, several cars on the same day", "Airport arrivals for guests flying in, with name signs", "One contact for the whole schedule", "One price agreed in advance; invoices for companies"],
        how: [["Send your schedule", "Date, venues, number of guests and times."], ["Get your plan and price", "We work out the cars and reply on WhatsApp with one price."], ["Your day", "Drivers arrive early and stay on schedule. Pay as agreed."]],
        faq: [["Can you decorate the wedding car?", "Tell us what you have in mind; simple decorations can usually be arranged with the driver."], ["How many guests can you move?", "A minibus seats up to 16, and we can send several cars at once. Tell us your numbers and times."], ["Do you drive conferences and corporate events?", "Yes. See also our corporate accounts for regular company transfers."]]
      },
      ru: {
        path: "/ru/svadebnyj-transfer", nav: "Свадьбы и мероприятия",
        title: "Свадебный транспорт и трансферы на мероприятия в Стамбуле",
        desc: "Машины с водителями для свадеб, мероприятий и трансфера гостей в Стамбуле: Mercedes V-Class, минивэны и микроавтобусы до 16 человек, от отеля до площадки.",
        h1: "Свадебные машины и трансферы на мероприятия в Стамбуле",
        lead: "От машины для молодожёнов до трансфера всех гостей: мы обслуживаем свадьбы, конференции и частные мероприятия в Стамбуле. Mercedes V-Class, минивэны и микроавтобусы ездят между отелями, площадками и аэропортами по одному плану и за одну заранее согласованную цену.",
        points: ["Mercedes V-Class для молодожёнов или VIP-гостей", "Минивэны и микроавтобусы до 16 гостей в машине, несколько машин в один день", "Встреча прилетающих гостей в аэропорту с табличками", "Один контакт на всё расписание", "Одна цена, согласованная заранее; счета для компаний"],
        how: [["Пришлите расписание", "Дата, площадки, количество гостей и время."], ["Получите план и цену", "Мы подберём машины и ответим в WhatsApp одной ценой."], ["Ваш день", "Водители приезжают заранее и работают по расписанию. Оплата как договорились."]],
        faq: [["Можно украсить свадебную машину?", "Расскажите, что хотите; простое украшение обычно можно согласовать с водителем."], ["Сколько гостей вы можете перевезти?", "Микроавтобус вмещает до 16 человек, и мы можем прислать несколько машин сразу. Сообщите количество и время."], ["Вы обслуживаете конференции и корпоративные мероприятия?", "Да. Для регулярных трансферов компании смотрите также корпоративные счета."]]
      },
      de: {
        path: "/de/hochzeitsauto-istanbul", nav: "Hochzeiten & Events",
        title: "Hochzeitsauto & Eventtransfers in Istanbul · Mit Fahrer",
        desc: "Autos mit Fahrer für Hochzeiten, Events und Gästetransfers in Istanbul: Mercedes V-Klasse, Minivans und Minibusse für bis zu 16, vom Hotel zur Location.",
        h1: "Hochzeitsautos und Eventtransfers in Istanbul",
        lead: "Vom Auto für das Brautpaar bis zum Shuttle für alle Gäste: Wir fahren Hochzeiten, Konferenzen und private Events in Istanbul. Mercedes V-Klasse, Minivans und Minibusse pendeln nach einem Plan und zu einem vorab vereinbarten Preis zwischen Hotels, Locations und Flughäfen.",
        points: ["Mercedes V-Klasse für das Brautpaar oder VIP-Gäste", "Minivans und Minibusse für bis zu 16 Gäste pro Auto, mehrere Autos am selben Tag", "Flughafenabholung anreisender Gäste mit Namensschild", "Ein Ansprechpartner für den ganzen Ablauf", "Ein vorab vereinbarter Preis; Rechnungen für Firmen"],
        how: [["Ablauf schicken", "Datum, Locations, Gästezahl und Zeiten."], ["Plan und Preis erhalten", "Wir planen die Autos und antworten per WhatsApp mit einem Preis."], ["Ihr Tag", "Die Fahrer sind früh da und halten den Zeitplan. Zahlung wie vereinbart."]],
        faq: [["Kann das Hochzeitsauto geschmückt werden?", "Sagen Sie uns Ihre Wünsche; einfacher Schmuck lässt sich meist mit dem Fahrer abstimmen."], ["Wie viele Gäste können Sie fahren?", "Ein Minibus fasst bis zu 16 Personen, und wir schicken auch mehrere Autos gleichzeitig. Nennen Sie uns Zahlen und Zeiten."], ["Fahren Sie auch Konferenzen und Firmenevents?", "Ja. Für regelmäßige Firmentransfers siehe auch unsere Firmenkonten."]]
      },
      fr: {
        path: "/fr/voiture-mariage-istanbul", nav: "Mariages et événements",
        title: "Voiture de mariage et transferts d'événements à Istanbul",
        desc: "Voitures avec chauffeur pour mariages, événements et transferts d'invités à Istanbul : Mercedes Classe V, monospaces et minibus jusqu'à 16, de l'hôtel au lieu.",
        h1: "Voitures de mariage et transferts d'événements à Istanbul",
        lead: "De la voiture des mariés aux navettes pour tous les invités : nous assurons mariages, conférences et événements privés à Istanbul. Mercedes Classe V, monospaces et minibus circulent entre hôtels, lieux de réception et aéroports selon un seul plan et un prix fixé à l'avance.",
        points: ["Mercedes Classe V pour les mariés ou les invités VIP", "Monospaces et minibus jusqu'à 16 invités par véhicule, plusieurs véhicules le même jour", "Accueil à l'aéroport des invités avec pancarte", "Un seul contact pour tout le programme", "Un prix fixé à l'avance ; factures pour les entreprises"],
        how: [["Envoyez votre programme", "Date, lieux, nombre d'invités et horaires."], ["Recevez plan et prix", "Nous organisons les véhicules et répondons sur WhatsApp avec un prix."], ["Votre journée", "Les chauffeurs arrivent en avance et respectent l'horaire. Paiement comme convenu."]],
        faq: [["Peut-on décorer la voiture des mariés ?", "Dites-nous ce que vous souhaitez ; une décoration simple peut en général être convenue avec le chauffeur."], ["Combien d'invités pouvez-vous transporter ?", "Un minibus accueille jusqu'à 16 personnes et nous pouvons envoyer plusieurs véhicules à la fois. Donnez-nous les nombres et horaires."], ["Assurez-vous les conférences et événements d'entreprise ?", "Oui. Pour des transferts réguliers, voir aussi nos comptes entreprise."]]
      },
      it: {
        path: "/it/auto-matrimonio-istanbul", nav: "Matrimoni ed eventi",
        title: "Auto per matrimonio e transfer per eventi a Istanbul",
        desc: "Auto con autista per matrimoni, eventi e transfer degli ospiti a Istanbul: Mercedes Classe V, minivan e minibus fino a 16, dall'hotel alla location e ritorno.",
        h1: "Auto per matrimoni e transfer per eventi a Istanbul",
        lead: "Dall'auto degli sposi alle navette per tutti gli ospiti: accompagniamo matrimoni, conferenze ed eventi privati a Istanbul. Mercedes Classe V, minivan e minibus fanno la spola tra hotel, location e aeroporti con un unico programma e un prezzo concordato prima.",
        points: ["Mercedes Classe V per gli sposi o gli ospiti VIP", "Minivan e minibus fino a 16 ospiti per auto, più auto nello stesso giorno", "Accoglienza in aeroporto degli ospiti con cartello", "Un solo referente per tutto il programma", "Un prezzo concordato prima; fattura per le aziende"],
        how: [["Inviaci il programma", "Data, location, numero di ospiti e orari."], ["Ricevi piano e prezzo", "Organizziamo le auto e rispondiamo su WhatsApp con un prezzo."], ["Il tuo giorno", "Gli autisti arrivano in anticipo e rispettano gli orari. Pagamento come concordato."]],
        faq: [["Si può decorare l'auto degli sposi?", "Dicci cosa desideri; una decorazione semplice di solito si può concordare con l'autista."], ["Quanti ospiti potete trasportare?", "Un minibus porta fino a 16 persone e possiamo mandare più auto insieme. Indicaci numeri e orari."], ["Fate anche conferenze ed eventi aziendali?", "Sì. Per i transfer aziendali regolari vedi anche i nostri conti aziendali."]]
      },
      nl: {
        path: "/nl/trouwauto-istanbul", nav: "Bruiloften & evenementen",
        title: "Trouwauto en evenementenvervoer in Istanbul · Met chauffeur",
        desc: "Auto's met chauffeur voor bruiloften, evenementen en gastenvervoer in Istanbul: Mercedes V-Klasse, minivans en minibussen tot 16, van hotel naar locatie.",
        h1: "Trouwauto's en evenementenvervoer in Istanbul",
        lead: "Van de auto voor het bruidspaar tot pendelritten voor alle gasten: we rijden bruiloften, congressen en privé-evenementen in Istanbul. Mercedes V-Klasse, minivans en minibussen rijden tussen hotels, locaties en luchthavens volgens één plan en één vooraf afgesproken prijs.",
        points: ["Mercedes V-Klasse voor het bruidspaar of vip-gasten", "Minivans en minibussen tot 16 gasten per auto, meerdere auto's op dezelfde dag", "Ophalen van gasten op de luchthaven met naambord", "Eén aanspreekpunt voor het hele schema", "Eén vooraf afgesproken prijs; facturen voor bedrijven"],
        how: [["Stuur je schema", "Datum, locaties, aantal gasten en tijden."], ["Ontvang plan en prijs", "We plannen de auto's en antwoorden via WhatsApp met één prijs."], ["Jouw dag", "De chauffeurs zijn vroeg en houden zich aan het schema. Betalen zoals afgesproken."]],
        faq: [["Kan de trouwauto versierd worden?", "Vertel ons wat je wilt; eenvoudige versiering is meestal af te spreken met de chauffeur."], ["Hoeveel gasten kunnen jullie vervoeren?", "Een minibus heeft plaats voor 16 personen en we kunnen meerdere auto's tegelijk sturen. Geef ons aantallen en tijden."], ["Rijden jullie ook congressen en bedrijfsevenementen?", "Ja. Voor vast bedrijfsvervoer, zie ook onze zakelijke accounts."]]
      }
    }
  ]
};
