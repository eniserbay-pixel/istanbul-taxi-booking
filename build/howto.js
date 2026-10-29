// "How it works" page: the booking form step by step, each step with a screenshot of the real form in that
// language (public/img/how/<lang>-<n>.jpg, 1–5: search box, cars, details, review, request received), then what
// happens after booking. Remake the screenshots when the booking form changes.
module.exports = {
  en: {
    path: "/how-it-works", nav: "How it works",
    title: "How to Book an Istanbul Airport Transfer · Step by Step",
    desc: "How booking with ITB Transfer works, step by step with screenshots: choose your route and car, enter your details, send the request and meet your driver.",
    h1: "How booking works, step by step",
    lead: "Booking your Istanbul airport transfer takes about a minute. No account and no prepayment: here is exactly what you will see, screen by screen.",
    step: "Step",
    steps: [
      ["Choose your route and time", "Pick where you start (Istanbul Airport, Sabiha Gökçen or a district) and where you go, then the date, pickup time and number of passengers. For an airport pickup, enter your landing time. You can add a return transfer at 10% off."],
      ["Pick your car and see the fixed price", "You see all four cars with their price per car: sedan, minivan, Mercedes V-Class and minibus. Cars too small for your group are greyed out. The price you see is the price you pay; tolls and parking are included."],
      ["Enter your details", "Your name, mobile number with country code and e-mail, your flight number so we can follow your flight, and your hotel or address. You can add luggage, child seats and a note for the driver."],
      ["Check and send your request", "Check the summary: route, date, car, your details and the total. Payment is in cash to the driver at the end of the ride. Accept the terms and send."],
      ["Request received", "You get your booking number on screen and by e-mail straight away. We then check availability and confirm your booking by e-mail, usually within an hour."]
    ],
    afterH: "After you book",
    after: [["Confirmation e-mail", "Once your car is assigned, you get a confirmation with the meeting point and our WhatsApp number."], ["We follow your flight", "If your flight is early or late, we adjust the pickup. The first 60 minutes after landing are free."], ["Meet your driver", "Your driver waits in the arrivals hall with a sign with your name and helps with your luggage."], ["Pay in cash at the end", "Pay the fixed price to the driver in euros, US dollars or Turkish lira. Free cancellation up to 24 hours before pickup."]],
    faq: [["Do I need to pay online?", "No. There is no online payment and no deposit. You pay the driver in cash at the end of the ride."], ["Is my booking confirmed when I send the form?", "Not yet. You first get a \"request received\" e-mail, then a confirmation e-mail once your car is assigned, usually within an hour."], ["Can I change or cancel my booking?", "Yes, free of charge up to 24 hours before pickup: reply to your confirmation e-mail or write to us on WhatsApp."]],
    ctaH: "Ready to book?", ctaP: "See your fixed price and send your request in a minute.",
    more: "See every step with screenshots"
  },
  tr: {
    path: "/tr/nasil-calisir", nav: "Nasıl çalışır",
    title: "İstanbul Havalimanı Transferi Nasıl Ayırtılır · Adım Adım",
    desc: "ITB Transfer ile rezervasyon adım adım ve ekran görüntüleriyle: güzergah ve aracı seçin, bilgilerinizi girin, talebi gönderin ve şoförünüzle buluşun.",
    h1: "Rezervasyon adım adım nasıl yapılır",
    lead: "İstanbul havalimanı transferinizi ayırtmak yaklaşık bir dakika sürer. Üyelik ve ön ödeme yok: ekran ekran tam olarak ne göreceğinizi aşağıda bulabilirsiniz.",
    step: "Adım",
    steps: [
      ["Güzergah ve saati seçin", "Nereden (İstanbul Havalimanı, Sabiha Gökçen veya bir semt) ve nereye gideceğinizi, ardından tarih, alış saati ve yolcu sayısını seçin. Havalimanından alışta iniş saatinizi yazın. Dönüş transferini %10 indirimle ekleyebilirsiniz."],
      ["Aracı seçin, sabit fiyatı görün", "Dört aracı araç başı fiyatıyla görürsünüz: sedan, minivan, Mercedes V-Class ve minibüs. Grubunuza küçük gelen araçlar soluk görünür. Gördüğünüz fiyat ödeyeceğiniz fiyattır; köprü-otoyol ve otopark dahildir."],
      ["Bilgilerinizi girin", "Adınız, ülke kodlu cep telefonunuz ve e-postanız, uçuşunuzu takip edebilmemiz için uçuş numaranız ve otel ya da adresiniz. Bavul sayısı, çocuk koltuğu ve şoföre not ekleyebilirsiniz."],
      ["Kontrol edin ve talebi gönderin", "Özeti kontrol edin: güzergah, tarih, araç, bilgileriniz ve toplam tutar. Ödeme yolculuk sonunda şoföre nakit yapılır. Koşulları kabul edip gönderin."],
      ["Talebiniz alındı", "Rezervasyon numaranız hemen ekranda ve e-postanızda olur. Ardından müsaitliği kontrol eder, rezervasyonunuzu genellikle bir saat içinde e-postayla onaylarız."]
    ],
    afterH: "Rezervasyondan sonra",
    after: [["Onay e-postası", "Aracınız atandığında buluşma noktası ve WhatsApp numaramızın olduğu onay e-postası gelir."], ["Uçuşunuzu takip ederiz", "Uçuşunuz erken ya da geç inerse alış saatini ayarlarız. İnişten sonraki ilk 60 dakika ücretsizdir."], ["Şoförünüzle buluşun", "Şoförünüz geliş salonunda isminizin yazılı olduğu tabelayla bekler ve bavullarınıza yardım eder."], ["Sonunda nakit ödeyin", "Sabit fiyatı şoföre euro, ABD doları veya Türk lirası ile ödersiniz. Alıştan 24 saat öncesine kadar iptal ücretsizdir."]],
    faq: [["Online ödeme yapmam gerekiyor mu?", "Hayır. Online ödeme ve kapora yoktur. Yolculuk sonunda şoföre nakit ödersiniz."], ["Formu gönderince rezervasyonum kesinleşir mi?", "Henüz değil. Önce \"talebiniz alındı\" e-postası, aracınız atandığında da genellikle bir saat içinde onay e-postası gelir."], ["Rezervasyonumu değiştirebilir veya iptal edebilir miyim?", "Evet, alıştan 24 saat öncesine kadar ücretsiz: onay e-postasını yanıtlayın veya WhatsApp'tan yazın."]],
    ctaH: "Ayırtmaya hazır mısınız?", ctaP: "Sabit fiyatınızı görün, talebinizi bir dakikada gönderin.",
    more: "Tüm adımları ekran görüntüleriyle görün"
  },
  ru: {
    path: "/ru/kak-eto-rabotaet", nav: "Как это работает",
    title: "Как заказать трансфер из аэропорта Стамбула · по шагам",
    desc: "Как работает заказ в ITB Transfer, по шагам и со скриншотами: выберите маршрут и машину, введите данные, отправьте заявку и встретьтесь с водителем.",
    h1: "Как сделать заказ: шаг за шагом",
    lead: "Заказ трансфера из аэропорта Стамбула занимает около минуты. Без регистрации и предоплаты: вот что именно вы увидите, экран за экраном.",
    step: "Шаг",
    steps: [
      ["Выберите маршрут и время", "Укажите, откуда вы едете (аэропорт Стамбула, Сабиха Гёкчен или район) и куда, затем дату, время подачи и число пассажиров. При встрече в аэропорту укажите время посадки. Можно добавить обратный трансфер со скидкой 10%."],
      ["Выберите машину и узнайте цену", "Вы видите все четыре машины с ценой за машину: седан, минивэн, Mercedes V-Class и микроавтобус. Слишком маленькие для вашей группы машины недоступны. Цена на экране — это цена, которую вы платите; платные дороги и парковка включены."],
      ["Введите свои данные", "Имя, мобильный телефон с кодом страны и e-mail, номер рейса, чтобы мы следили за ним, и отель или адрес. Можно указать багаж, детские кресла и комментарий для водителя."],
      ["Проверьте и отправьте заявку", "Проверьте сводку: маршрут, дату, машину, ваши данные и итог. Оплата наличными водителю в конце поездки. Примите условия и отправьте."],
      ["Заявка получена", "Номер заказа сразу появится на экране и придёт на e-mail. Затем мы проверяем наличие машины и подтверждаем заказ по e-mail, обычно в течение часа."]
    ],
    afterH: "После заказа",
    after: [["Письмо с подтверждением", "Когда машина назначена, вы получите подтверждение с местом встречи и нашим номером WhatsApp."], ["Мы следим за рейсом", "Если рейс прилетает раньше или позже, мы переносим подачу. Первые 60 минут после посадки бесплатно."], ["Встреча с водителем", "Водитель ждёт в зале прилёта с табличкой с вашим именем и помогает с багажом."], ["Оплата наличными в конце", "Фиксированную цену вы платите водителю в евро, долларах или лирах. Бесплатная отмена за 24 часа до подачи."]],
    faq: [["Нужно ли платить онлайн?", "Нет. Онлайн-оплаты и депозита нет. Вы платите водителю наличными в конце поездки."], ["Заказ подтверждён сразу после отправки формы?", "Ещё нет. Сначала приходит письмо «заявка получена», затем подтверждение, когда машина назначена, обычно в течение часа."], ["Можно изменить или отменить заказ?", "Да, бесплатно за 24 часа до подачи: ответьте на письмо с подтверждением или напишите нам в WhatsApp."]],
    ctaH: "Готовы заказать?", ctaP: "Узнайте фиксированную цену и отправьте заявку за минуту.",
    more: "Все шаги со скриншотами"
  },
  de: {
    path: "/de/so-funktionierts", nav: "So funktioniert's",
    title: "Flughafentransfer Istanbul buchen · Schritt für Schritt",
    desc: "So buchen Sie bei ITB Transfer, Schritt für Schritt mit Screenshots: Strecke und Fahrzeug wählen, Daten eingeben, Anfrage senden und den Fahrer treffen.",
    h1: "So funktioniert die Buchung, Schritt für Schritt",
    lead: "Ihren Flughafentransfer in Istanbul buchen Sie in etwa einer Minute. Ohne Konto und ohne Vorauszahlung: Hier sehen Sie genau, was Sie Bildschirm für Bildschirm erwartet.",
    step: "Schritt",
    steps: [
      ["Strecke und Uhrzeit wählen", "Wählen Sie, wo Sie starten (Flughafen Istanbul, Sabiha Gökçen oder ein Stadtteil) und wohin es geht, dann Datum, Abholzeit und Anzahl der Fahrgäste. Bei Abholung am Flughafen geben Sie Ihre Landezeit an. Eine Rückfahrt können Sie mit 10 % Rabatt hinzufügen."],
      ["Fahrzeug wählen und Festpreis sehen", "Sie sehen alle vier Fahrzeuge mit ihrem Preis pro Auto: Limousine, Minivan, Mercedes V-Klasse und Kleinbus. Zu kleine Fahrzeuge für Ihre Gruppe sind ausgegraut. Der angezeigte Preis ist der Endpreis; Maut und Parken sind inklusive."],
      ["Ihre Daten eingeben", "Name, Handynummer mit Ländervorwahl und E-Mail, Ihre Flugnummer, damit wir den Flug verfolgen, und Ihr Hotel oder Ihre Adresse. Gepäck, Kindersitze und eine Notiz für den Fahrer können Sie ergänzen."],
      ["Prüfen und Anfrage senden", "Prüfen Sie die Übersicht: Strecke, Datum, Fahrzeug, Ihre Daten und den Gesamtpreis. Bezahlt wird bar beim Fahrer am Ende der Fahrt. AGB akzeptieren und senden."],
      ["Anfrage erhalten", "Ihre Buchungsnummer sehen Sie sofort auf dem Bildschirm und per E-Mail. Danach prüfen wir die Verfügbarkeit und bestätigen Ihre Buchung per E-Mail, meist innerhalb einer Stunde."]
    ],
    afterH: "Nach der Buchung",
    after: [["Bestätigungs-E-Mail", "Sobald Ihr Fahrzeug zugeteilt ist, erhalten Sie eine Bestätigung mit Treffpunkt und unserer WhatsApp-Nummer."], ["Wir verfolgen Ihren Flug", "Landet Ihr Flug früher oder später, passen wir die Abholung an. Die ersten 60 Minuten nach der Landung sind kostenlos."], ["Fahrer treffen", "Ihr Fahrer wartet in der Ankunftshalle mit einem Namensschild und hilft beim Gepäck."], ["Am Ende bar bezahlen", "Zahlen Sie den Festpreis beim Fahrer in Euro, US-Dollar oder Lira. Kostenlose Stornierung bis 24 Stunden vor Abholung."]],
    faq: [["Muss ich online bezahlen?", "Nein. Es gibt keine Online-Zahlung und keine Anzahlung. Sie zahlen am Ende der Fahrt bar beim Fahrer."], ["Ist meine Buchung nach dem Absenden bestätigt?", "Noch nicht. Zuerst kommt eine E-Mail „Anfrage erhalten“, dann die Bestätigung, sobald Ihr Fahrzeug zugeteilt ist, meist innerhalb einer Stunde."], ["Kann ich meine Buchung ändern oder stornieren?", "Ja, kostenlos bis 24 Stunden vor Abholung: Antworten Sie auf die Bestätigungs-E-Mail oder schreiben Sie uns per WhatsApp."]],
    ctaH: "Bereit zum Buchen?", ctaP: "Sehen Sie Ihren Festpreis und senden Sie Ihre Anfrage in einer Minute.",
    more: "Alle Schritte mit Screenshots"
  },
  fr: {
    path: "/fr/comment-ca-marche", nav: "Comment ça marche",
    title: "Réserver un transfert aéroport Istanbul · Étape par étape",
    desc: "Comment réserver avec ITB Transfer, étape par étape avec captures d'écran : choisissez trajet et véhicule, saisissez vos infos, envoyez la demande.",
    h1: "Comment réserver, étape par étape",
    lead: "Réserver votre transfert aéroport à Istanbul prend environ une minute. Sans compte ni prépaiement : voici exactement ce que vous verrez, écran par écran.",
    step: "Étape",
    steps: [
      ["Choisissez trajet et horaire", "Indiquez votre point de départ (aéroport d'Istanbul, Sabiha Gökçen ou un quartier) et votre destination, puis la date, l'heure de prise en charge et le nombre de passagers. Pour une arrivée à l'aéroport, indiquez l'heure d'atterrissage. Ajoutez un retour avec 10 % de réduction."],
      ["Choisissez le véhicule et voyez le prix fixe", "Vous voyez les quatre véhicules avec leur prix par voiture : berline, monospace, Mercedes Classe V et minibus. Les véhicules trop petits pour votre groupe sont grisés. Le prix affiché est le prix payé ; péages et parking compris."],
      ["Saisissez vos informations", "Votre nom, votre mobile avec indicatif et votre e-mail, votre numéro de vol pour que nous le suivions, et votre hôtel ou adresse. Ajoutez bagages, sièges enfant et un mot pour le chauffeur."],
      ["Vérifiez et envoyez la demande", "Vérifiez le récapitulatif : trajet, date, véhicule, vos informations et le total. Le paiement se fait en espèces au chauffeur à la fin du trajet. Acceptez les conditions et envoyez."],
      ["Demande reçue", "Votre numéro de réservation s'affiche aussitôt et arrive par e-mail. Nous vérifions ensuite la disponibilité et confirmons votre réservation par e-mail, en général dans l'heure."]
    ],
    afterH: "Après la réservation",
    after: [["E-mail de confirmation", "Dès que votre véhicule est attribué, vous recevez une confirmation avec le point de rendez-vous et notre numéro WhatsApp."], ["Nous suivons votre vol", "Si votre vol arrive en avance ou en retard, nous adaptons la prise en charge. Les 60 premières minutes après l'atterrissage sont gratuites."], ["Retrouvez votre chauffeur", "Votre chauffeur vous attend dans le hall des arrivées avec une pancarte à votre nom et vous aide avec les bagages."], ["Payez en espèces à la fin", "Réglez le prix fixe au chauffeur en euros, dollars ou livres turques. Annulation gratuite jusqu'à 24 h avant."]],
    faq: [["Dois-je payer en ligne ?", "Non. Pas de paiement en ligne ni d'acompte. Vous payez le chauffeur en espèces à la fin du trajet."], ["Ma réservation est-elle confirmée dès l'envoi ?", "Pas encore. Vous recevez d'abord un e-mail « demande reçue », puis une confirmation une fois le véhicule attribué, en général dans l'heure."], ["Puis-je modifier ou annuler ?", "Oui, gratuitement jusqu'à 24 h avant la prise en charge : répondez à l'e-mail de confirmation ou écrivez-nous sur WhatsApp."]],
    ctaH: "Prêt à réserver ?", ctaP: "Découvrez votre prix fixe et envoyez votre demande en une minute.",
    more: "Voir toutes les étapes en images"
  },
  it: {
    path: "/it/come-funziona", nav: "Come funziona",
    title: "Come prenotare un transfer aeroporto Istanbul · Passo passo",
    desc: "Come prenotare con ITB Transfer, passo passo con screenshot: scegli percorso e auto, inserisci i dati, invia la richiesta e incontra il tuo autista.",
    h1: "Come funziona la prenotazione, passo passo",
    lead: "Prenotare il transfer dall'aeroporto di Istanbul richiede circa un minuto. Senza account e senza pagamento anticipato: ecco esattamente cosa vedrai, schermata per schermata.",
    step: "Passo",
    steps: [
      ["Scegli percorso e orario", "Indica da dove parti (aeroporto di Istanbul, Sabiha Gökçen o un quartiere) e dove vai, poi data, orario di partenza e numero di passeggeri. Per il ritiro in aeroporto inserisci l'orario di atterraggio. Puoi aggiungere il ritorno con il 10% di sconto."],
      ["Scegli l'auto e vedi il prezzo fisso", "Vedi tutte e quattro le auto con il prezzo per auto: berlina, minivan, Mercedes Classe V e minibus. Le auto troppo piccole per il tuo gruppo sono in grigio. Il prezzo che vedi è quello che paghi; pedaggi e parcheggio inclusi."],
      ["Inserisci i tuoi dati", "Nome, cellulare con prefisso ed e-mail, numero del volo per seguirlo, e hotel o indirizzo. Puoi aggiungere bagagli, seggiolini e una nota per l'autista."],
      ["Controlla e invia la richiesta", "Controlla il riepilogo: percorso, data, auto, i tuoi dati e il totale. Si paga in contanti all'autista a fine corsa. Accetta le condizioni e invia."],
      ["Richiesta ricevuta", "Il numero di prenotazione compare subito sullo schermo e arriva via e-mail. Poi verifichiamo la disponibilità e confermiamo la prenotazione via e-mail, di solito entro un'ora."]
    ],
    afterH: "Dopo la prenotazione",
    after: [["E-mail di conferma", "Quando l'auto è assegnata ricevi una conferma con il punto d'incontro e il nostro numero WhatsApp."], ["Seguiamo il tuo volo", "Se il volo arriva prima o dopo, adattiamo il ritiro. I primi 60 minuti dopo l'atterraggio sono gratuiti."], ["Incontra l'autista", "L'autista ti aspetta nella sala arrivi con un cartello con il tuo nome e ti aiuta con i bagagli."], ["Paga in contanti alla fine", "Paga il prezzo fisso all'autista in euro, dollari o lire turche. Cancellazione gratuita fino a 24 ore prima."]],
    faq: [["Devo pagare online?", "No. Nessun pagamento online e nessun acconto. Paghi l'autista in contanti a fine corsa."], ["La prenotazione è confermata appena invio il modulo?", "Non ancora. Prima ricevi l'e-mail \"richiesta ricevuta\", poi la conferma quando l'auto è assegnata, di solito entro un'ora."], ["Posso modificare o cancellare?", "Sì, gratis fino a 24 ore prima del ritiro: rispondi all'e-mail di conferma o scrivici su WhatsApp."]],
    ctaH: "Pronto a prenotare?", ctaP: "Scopri il tuo prezzo fisso e invia la richiesta in un minuto.",
    more: "Vedi tutti i passi con screenshot"
  },
  nl: {
    path: "/nl/hoe-het-werkt", nav: "Hoe het werkt",
    title: "Luchthaventransfer Istanbul boeken · Stap voor stap",
    desc: "Zo boek je bij ITB Transfer, stap voor stap met screenshots: kies route en auto, vul je gegevens in, verstuur de aanvraag en ontmoet je chauffeur.",
    h1: "Zo werkt boeken, stap voor stap",
    lead: "Je luchthaventransfer in Istanbul boek je in ongeveer een minuut. Zonder account en zonder vooruitbetaling: dit is precies wat je ziet, scherm voor scherm.",
    step: "Stap",
    steps: [
      ["Kies route en tijd", "Kies waar je vertrekt (Istanbul Airport, Sabiha Gökçen of een wijk) en waar je heen gaat, dan datum, ophaaltijd en aantal personen. Bij ophalen op de luchthaven vul je je landingstijd in. Een retour voeg je toe met 10% korting."],
      ["Kies je auto en zie de vaste prijs", "Je ziet alle vier de auto's met hun prijs per auto: sedan, minivan, Mercedes V-Klasse en minibus. Te kleine auto's voor je groep zijn grijs. De prijs die je ziet, betaal je; tol en parkeren zijn inbegrepen."],
      ["Vul je gegevens in", "Je naam, mobiel nummer met landcode en e-mail, je vluchtnummer zodat we je vlucht volgen, en je hotel of adres. Bagage, kinderzitjes en een notitie voor de chauffeur kun je toevoegen."],
      ["Controleer en verstuur je aanvraag", "Controleer het overzicht: route, datum, auto, je gegevens en het totaal. Je betaalt contant aan de chauffeur aan het eind van de rit. Accepteer de voorwaarden en verstuur."],
      ["Aanvraag ontvangen", "Je boekingsnummer zie je meteen op het scherm en in je e-mail. Daarna controleren we de beschikbaarheid en bevestigen we je boeking per e-mail, meestal binnen een uur."]
    ],
    afterH: "Na het boeken",
    after: [["Bevestigingsmail", "Zodra je auto is toegewezen, krijg je een bevestiging met het ontmoetingspunt en ons WhatsApp-nummer."], ["We volgen je vlucht", "Landt je vlucht eerder of later, dan passen we het ophalen aan. De eerste 60 minuten na de landing zijn gratis."], ["Ontmoet je chauffeur", "Je chauffeur wacht in de aankomsthal met een bordje met je naam en helpt met je bagage."], ["Aan het eind contant betalen", "Betaal de vaste prijs aan de chauffeur in euro, dollars of lira. Gratis annuleren tot 24 uur vooraf."]],
    faq: [["Moet ik online betalen?", "Nee. Er is geen online betaling en geen aanbetaling. Je betaalt de chauffeur contant aan het eind van de rit."], ["Is mijn boeking bevestigd zodra ik het formulier verstuur?", "Nog niet. Eerst krijg je een mail \"aanvraag ontvangen\", daarna een bevestiging zodra je auto is toegewezen, meestal binnen een uur."], ["Kan ik wijzigen of annuleren?", "Ja, gratis tot 24 uur voor het ophalen: beantwoord de bevestigingsmail of stuur ons een WhatsApp."]],
    ctaH: "Klaar om te boeken?", ctaP: "Bekijk je vaste prijs en verstuur je aanvraag in een minuut.",
    more: "Bekijk alle stappen met screenshots"
  },
  ar: {
    path: "/ar/kayfa-yamal", nav: "كيف يعمل",
    title: "كيف تحجز توصيلك من مطار إسطنبول · خطوة بخطوة",
    desc: "كيف يعمل الحجز مع ITB Transfer خطوة بخطوة مع صور الشاشة: اختر المسار والسيارة، أدخل بياناتك، أرسل الطلب وقابل سائقك.",
    h1: "كيف يعمل الحجز خطوة بخطوة",
    lead: "حجز توصيلك من مطار إسطنبول يستغرق دقيقة تقريباً، دون تسجيل أو دفع مسبق. إليك بالضبط ما ستراه، شاشة بعد شاشة.",
    step: "الخطوة",
    steps: [
      ["اختر المسار والوقت", "اختر نقطة الانطلاق (مطار إسطنبول أو صبيحة كوكجن أو أحد الأحياء) والوجهة، ثم التاريخ ووقت الاستقبال وعدد الركاب. عند الاستقبال من المطار اكتب وقت هبوطك. ويمكنك إضافة رحلة العودة بخصم 10%."],
      ["اختر السيارة وشاهد السعر الثابت", "ترى السيارات الأربع بسعرها للسيارة: سيدان، ميني فان، مرسيدس V-Class وميني باص. السيارات الأصغر من مجموعتك تظهر باهتة. السعر الذي تراه هو السعر الذي تدفعه، ويشمل رسوم الطرق والمواقف."],
      ["أدخل بياناتك", "اسمك، ورقم جوالك مع رمز الدولة، وبريدك الإلكتروني، ورقم رحلتك لنتابعها، والفندق أو العنوان. ويمكنك إضافة الحقائب ومقاعد الأطفال وملاحظة للسائق."],
      ["راجع وأرسل طلبك", "راجع الملخص: المسار والتاريخ والسيارة وبياناتك والمجموع. الدفع نقداً للسائق في نهاية الرحلة. وافق على الشروط ثم أرسل."],
      ["استلمنا طلبك", "يظهر رقم حجزك فوراً على الشاشة ويصلك بالبريد الإلكتروني. ثم نتحقق من التوفر ونؤكد حجزك بالبريد الإلكتروني، عادةً خلال ساعة."]
    ],
    afterH: "بعد الحجز",
    after: [["رسالة التأكيد", "عند تخصيص سيارتك تصلك رسالة تأكيد فيها نقطة اللقاء ورقم واتساب الخاص بنا."], ["نتابع رحلتك", "إذا هبطت رحلتك مبكراً أو متأخرة نعدّل وقت الاستقبال. أول 60 دقيقة بعد الهبوط مجانية."], ["قابل سائقك", "ينتظرك السائق في صالة الوصول بلوحة باسمك ويساعدك في حمل الحقائب."], ["ادفع نقداً في النهاية", "ادفع السعر الثابت للسائق باليورو أو الدولار أو الليرة التركية. الإلغاء مجاني حتى 24 ساعة قبل الموعد."]],
    faq: [["هل أحتاج إلى الدفع عبر الإنترنت؟", "لا. لا يوجد دفع إلكتروني ولا عربون. تدفع للسائق نقداً في نهاية الرحلة."], ["هل يتأكد حجزي فور إرسال النموذج؟", "ليس بعد. تصلك أولاً رسالة \"استلمنا طلبك\"، ثم رسالة تأكيد عند تخصيص سيارتك، عادةً خلال ساعة."], ["هل يمكنني تعديل الحجز أو إلغاؤه؟", "نعم، مجاناً حتى 24 ساعة قبل الاستقبال: رد على رسالة التأكيد أو راسلنا على واتساب."]],
    ctaH: "هل أنت مستعد للحجز؟", ctaP: "اعرف سعرك الثابت وأرسل طلبك في دقيقة واحدة.",
    more: "شاهد كل الخطوات بالصور"
  }
};
