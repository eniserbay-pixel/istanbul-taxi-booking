// Extra content on the three price hub pages (Istanbul Airport, Sabiha Gökçen, Galataport): a short intro, the ways
// into the city compared, what the price includes and an FAQ. Numbers come from data/pricing.json at build time:
// {p_<zone>} sedan price, {km_<zone>} and {min_<zone>} distance and drive time from this hub; {wait} {seat} {ret}
// {pct} {peakFrom} {peakTo} from the pricing rules; {from} the hub's short name. Public transport times are rough.
module.exports = {
  T: {
    en: {
      ferry: "ferry", aboutH: "About {from}", waysH: "Ways from {from} to {dest} compared", cols: ["Option", "Time", "Price", "Door to door"],
      transfer: "Private transfer (us)", taxi: "Taxi rank", tram: "Tram T1 from Tophane",
      fixed: "€{p} per car, fixed", meter: "Meter, depends on traffic", low: "Low fare per person", min: "{n} min", queue: "{n} min + queue", yes: "Yes", no: "No",
      inclH: "What the price includes",
      incl: ["Fixed price per car, not per person; tolls and parking are included", "Flight tracking, and the first {wait} minutes after landing are free", "Your driver waits with a sign with your name", "Child seats on request, €{seat} each", "{ret}% off when you book the return too", "Pay in cash to the driver at the end, in euros, US dollars or Turkish lira; no prepayment", "Free cancellation up to 24 hours before pickup"],
      inclPort: "We follow your ship's arrival; a late disembarkation costs nothing extra",
      peak: "Pickups at {from} between {peakFrom} and {peakTo} cost {pct}% more, because traffic on the way into the city is at its heaviest then. The price shown when you book already includes it.",
      minH: "min", guide: "Arrival guide: from the plane to your hotel", how: "How booking works, step by step",
      faqShared: [["Is the price per person or per car?", "Per car. The price is the same for one passenger or for a full car, and it includes tolls and parking."], ["What if I need to change or cancel?", "Changes and cancellation are free up to 24 hours before pickup. Reply to your confirmation e-mail or write to us on WhatsApp."]]
    },
    tr: {
      ferry: "vapur", aboutH: "{from} hakkında", waysH: "{from} – {dest} arası ulaşım seçenekleri", cols: ["Seçenek", "Süre", "Fiyat", "Kapıdan kapıya"],
      transfer: "Özel transfer (biz)", taxi: "Taksi durağı", tram: "Tophane'den T1 tramvay",
      fixed: "Araç başı €{p}, sabit", meter: "Taksimetre, trafiğe göre değişir", low: "Kişi başı düşük ücret", min: "{n} dk", queue: "{n} dk + sıra", yes: "Evet", no: "Hayır",
      inclH: "Fiyata neler dahil",
      incl: ["Fiyat kişi başı değil araç başıdır; köprü-otoyol ve otopark dahildir", "Uçuşunuz takip edilir, inişten sonraki ilk {wait} dakika ücretsizdir", "Şoförünüz isminizin yazılı olduğu tabelayla bekler", "İstek üzerine çocuk koltuğu, tanesi €{seat}", "Dönüşü de ayırtırsanız %{ret} indirim", "Yolculuk sonunda şoföre euro, ABD doları veya Türk lirası ile nakit ödeme; ön ödeme yok", "Alıştan 24 saat öncesine kadar ücretsiz iptal"],
      inclPort: "Geminizin varışını takip ederiz; geç iniş ek ücret gerektirmez",
      peak: "{from} çıkışlı {peakFrom}–{peakTo} arası alışlar, şehre giden yolun en yoğun olduğu saatler olduğu için %{pct} daha pahalıdır. Rezervasyonda gördüğünüz fiyata bu fark zaten dahildir.",
      minH: "dk", guide: "Varış rehberi: uçaktan otelinize", how: "Rezervasyon adım adım nasıl yapılır",
      faqShared: [["Fiyat kişi başı mı, araç başı mı?", "Araç başı. Tek yolcu da olsanız araç dolu da olsa fiyat aynıdır; köprü-otoyol ve otopark dahildir."], ["Değiştirmem veya iptal etmem gerekirse?", "Alıştan 24 saat öncesine kadar değişiklik ve iptal ücretsizdir. Onay e-postasını yanıtlayın veya WhatsApp'tan yazın."]]
    },
    ru: {
      ferry: "паром", aboutH: "Об аэропорте {from}", waysH: "Как добраться из {from} в {dest}: сравнение", cols: ["Вариант", "Время", "Цена", "От двери до двери"],
      transfer: "Частный трансфер (мы)", taxi: "Такси со стоянки", tram: "Трамвай T1 от Тофане",
      fixed: "€{p} за машину, фиксированно", meter: "По счётчику, зависит от пробок", low: "Недорогой билет на человека", min: "{n} мин", queue: "{n} мин + очередь", yes: "Да", no: "Нет",
      inclH: "Что входит в цену",
      incl: ["Фиксированная цена за машину, а не за человека; платные дороги и парковка включены", "Мы следим за рейсом, первые {wait} минут после посадки бесплатно", "Водитель встречает с табличкой с вашим именем", "Детские кресла по запросу, €{seat} за каждое", "Скидка {ret}% при заказе обратного трансфера", "Оплата наличными водителю в конце поездки: евро, доллары или лиры; без предоплаты", "Бесплатная отмена за 24 часа до подачи"],
      inclPort: "Мы следим за прибытием лайнера; поздняя высадка ничего не стоит",
      peak: "Подача в {from} с {peakFrom} до {peakTo} стоит на {pct}% дороже: в эти часы дорога в город загружена сильнее всего. Цена при заказе уже это учитывает.",
      minH: "мин", guide: "Гид по прибытию: от самолёта до отеля", how: "Как сделать заказ: шаг за шагом",
      faqShared: [["Цена за человека или за машину?", "За машину. Цена одна и та же для одного пассажира и для полной машины, платные дороги и парковка включены."], ["Что если нужно изменить или отменить заказ?", "Изменение и отмена бесплатны за 24 часа до подачи. Ответьте на письмо с подтверждением или напишите нам в WhatsApp."]]
    },
    de: {
      ferry: "Fähre", aboutH: "Über {from}", waysH: "Von {from} nach {dest}: die Möglichkeiten im Vergleich", cols: ["Möglichkeit", "Dauer", "Preis", "Von Tür zu Tür"],
      transfer: "Privater Transfer (wir)", taxi: "Taxistand", tram: "Straßenbahn T1 ab Tophane",
      fixed: "€{p} pro Auto, fest", meter: "Taxameter, je nach Verkehr", low: "Günstiger Fahrpreis pro Person", min: "{n} Min.", queue: "{n} Min. + Warteschlange", yes: "Ja", no: "Nein",
      inclH: "Was im Preis enthalten ist",
      incl: ["Festpreis pro Auto, nicht pro Person; Maut und Parken sind inklusive", "Flugverfolgung, die ersten {wait} Minuten nach der Landung sind kostenlos", "Ihr Fahrer wartet mit einem Namensschild", "Kindersitze auf Wunsch, €{seat} pro Sitz", "{ret} % Rabatt, wenn Sie die Rückfahrt mitbuchen", "Barzahlung beim Fahrer am Ende, in Euro, US-Dollar oder Lira; keine Vorauszahlung", "Kostenlose Stornierung bis 24 Stunden vor Abholung"],
      inclPort: "Wir verfolgen die Ankunft Ihres Schiffs; eine späte Ausschiffung kostet nichts extra",
      peak: "Abholungen an {from} zwischen {peakFrom} und {peakTo} kosten {pct} % mehr, weil der Verkehr in die Stadt dann am dichtesten ist. Der Preis bei der Buchung enthält das bereits.",
      minH: "Min.", guide: "Ankunftsratgeber: vom Flugzeug ins Hotel", how: "So funktioniert die Buchung, Schritt für Schritt",
      faqShared: [["Gilt der Preis pro Person oder pro Auto?", "Pro Auto. Der Preis ist für einen Fahrgast und für ein volles Auto gleich, Maut und Parken sind inklusive."], ["Was, wenn ich ändern oder stornieren muss?", "Änderungen und Stornierung sind bis 24 Stunden vor Abholung kostenlos. Antworten Sie auf die Bestätigungs-E-Mail oder schreiben Sie uns per WhatsApp."]]
    },
    fr: {
      ferry: "ferry", aboutH: "À propos de {from}", waysH: "De {from} à {dest} : les options comparées", cols: ["Option", "Durée", "Prix", "Porte à porte"],
      transfer: "Transfert privé (nous)", taxi: "Station de taxis", tram: "Tram T1 depuis Tophane",
      fixed: "€{p} par voiture, fixe", meter: "Compteur, selon le trafic", low: "Tarif bas par personne", min: "{n} min", queue: "{n} min + file d'attente", yes: "Oui", no: "Non",
      inclH: "Ce que comprend le prix",
      incl: ["Prix fixe par voiture, pas par personne ; péages et parking compris", "Suivi du vol, les {wait} premières minutes après l'atterrissage sont gratuites", "Votre chauffeur vous attend avec une pancarte à votre nom", "Sièges enfant sur demande, €{seat} chacun", "{ret} % de réduction si vous réservez aussi le retour", "Paiement en espèces au chauffeur à la fin, en euros, dollars ou livres turques ; sans prépaiement", "Annulation gratuite jusqu'à 24 h avant la prise en charge"],
      inclPort: "Nous suivons l'arrivée de votre navire ; un débarquement tardif ne coûte rien de plus",
      peak: "Les prises en charge à {from} entre {peakFrom} et {peakTo} coûtent {pct} % de plus, car la circulation vers la ville est alors la plus dense. Le prix affiché à la réservation l'inclut déjà.",
      minH: "min", guide: "Guide d'arrivée : de l'avion à l'hôtel", how: "Comment réserver, étape par étape",
      faqShared: [["Le prix est-il par personne ou par voiture ?", "Par voiture. Le prix est le même pour un passager ou une voiture pleine, péages et parking compris."], ["Et si je dois modifier ou annuler ?", "Modification et annulation sont gratuites jusqu'à 24 h avant la prise en charge. Répondez à l'e-mail de confirmation ou écrivez-nous sur WhatsApp."]]
    },
    it: {
      ferry: "traghetto", aboutH: "Informazioni su {from}", waysH: "Da {from} a {dest}: le opzioni a confronto", cols: ["Opzione", "Tempo", "Prezzo", "Porta a porta"],
      transfer: "Transfer privato (noi)", taxi: "Posteggio taxi", tram: "Tram T1 da Tophane",
      fixed: "€{p} per auto, fisso", meter: "Tassametro, dipende dal traffico", low: "Biglietto economico a persona", min: "{n} min", queue: "{n} min + coda", yes: "Sì", no: "No",
      inclH: "Cosa include il prezzo",
      incl: ["Prezzo fisso per auto, non a persona; pedaggi e parcheggio inclusi", "Monitoraggio del volo, i primi {wait} minuti dopo l'atterraggio sono gratuiti", "L'autista ti aspetta con un cartello con il tuo nome", "Seggiolini su richiesta, €{seat} l'uno", "{ret}% di sconto se prenoti anche il ritorno", "Pagamento in contanti all'autista a fine corsa, in euro, dollari o lire turche; nessun anticipo", "Cancellazione gratuita fino a 24 ore prima"],
      inclPort: "Seguiamo l'arrivo della tua nave; uno sbarco in ritardo non costa nulla in più",
      peak: "I ritiri a {from} tra le {peakFrom} e le {peakTo} costano il {pct}% in più, perché il traffico verso la città è al massimo. Il prezzo mostrato in prenotazione lo include già.",
      minH: "min", guide: "Guida all'arrivo: dall'aereo all'hotel", how: "Come funziona la prenotazione, passo passo",
      faqShared: [["Il prezzo è a persona o per auto?", "Per auto. Il prezzo è lo stesso per un passeggero o per un'auto piena, pedaggi e parcheggio inclusi."], ["E se devo modificare o cancellare?", "Modifiche e cancellazione sono gratuite fino a 24 ore prima del ritiro. Rispondi all'e-mail di conferma o scrivici su WhatsApp."]]
    },
    nl: {
      ferry: "veerboot", aboutH: "Over {from}", waysH: "Van {from} naar {dest}: de opties vergeleken", cols: ["Optie", "Tijd", "Prijs", "Deur tot deur"],
      transfer: "Privétransfer (wij)", taxi: "Taxistandplaats", tram: "Tram T1 vanaf Tophane",
      fixed: "€{p} per auto, vast", meter: "Taximeter, hangt af van het verkeer", low: "Laag tarief per persoon", min: "{n} min", queue: "{n} min + wachtrij", yes: "Ja", no: "Nee",
      inclH: "Wat de prijs omvat",
      incl: ["Vaste prijs per auto, niet per persoon; tol en parkeren inbegrepen", "We volgen je vlucht, de eerste {wait} minuten na de landing zijn gratis", "Je chauffeur wacht met een bordje met je naam", "Kinderzitjes op aanvraag, €{seat} per stuk", "{ret}% korting als je ook de terugrit boekt", "Contant betalen aan de chauffeur aan het eind, in euro, dollars of lira; geen vooruitbetaling", "Gratis annuleren tot 24 uur voor het ophalen"],
      inclPort: "We volgen de aankomst van je schip; laat ontschepen kost niets extra",
      peak: "Ophalen op {from} tussen {peakFrom} en {peakTo} kost {pct}% meer, omdat het verkeer richting stad dan het drukst is. De prijs bij het boeken is daar al op berekend.",
      minH: "min", guide: "Aankomstgids: van het vliegtuig naar je hotel", how: "Zo werkt boeken, stap voor stap",
      faqShared: [["Is de prijs per persoon of per auto?", "Per auto. De prijs is gelijk voor één passagier of een volle auto, tol en parkeren inbegrepen."], ["Wat als ik moet wijzigen of annuleren?", "Wijzigen en annuleren is gratis tot 24 uur voor het ophalen. Beantwoord de bevestigingsmail of stuur ons een WhatsApp."]]
    },
    ar: {
      ferry: "عبّارة", aboutH: "عن {from}", waysH: "من {from} إلى {dest}: مقارنة الخيارات", cols: ["الخيار", "المدة", "السعر", "من الباب إلى الباب"],
      transfer: "توصيل خاص (نحن)", taxi: "موقف التاكسي", tram: "ترام T1 من توبهانه",
      fixed: "€{p} للسيارة، ثابت", meter: "بالعداد، حسب الزحام", low: "أجرة منخفضة للشخص", min: "{n} دقيقة", queue: "{n} دقيقة + طابور", yes: "نعم", no: "لا",
      inclH: "ماذا يشمل السعر",
      incl: ["سعر ثابت للسيارة وليس للشخص، ويشمل رسوم الطرق والمواقف", "نتابع رحلتك، وأول {wait} دقيقة بعد الهبوط مجانية", "ينتظرك السائق بلوحة عليها اسمك", "مقاعد أطفال عند الطلب، €{seat} للمقعد", "خصم {ret}% عند حجز رحلة العودة أيضاً", "الدفع نقداً للسائق في النهاية باليورو أو الدولار أو الليرة التركية، دون دفع مسبق", "إلغاء مجاني حتى 24 ساعة قبل الموعد"],
      inclPort: "نتابع وصول سفينتك، والنزول المتأخر لا يكلّف شيئاً إضافياً",
      peak: "الاستقبال من {from} بين {peakFrom} و{peakTo} أغلى بنسبة {pct}% لأن الطريق إلى المدينة يكون في ذروة الزحام. السعر الظاهر عند الحجز يشمل ذلك.",
      minH: "دقيقة", guide: "دليل الوصول: من الطائرة إلى الفندق", how: "كيف يعمل الحجز خطوة بخطوة",
      faqShared: [["هل السعر للشخص أم للسيارة؟", "للسيارة. السعر نفسه لراكب واحد أو لسيارة ممتلئة، ويشمل رسوم الطرق والمواقف."], ["ماذا لو احتجت إلى التعديل أو الإلغاء؟", "التعديل والإلغاء مجانيان حتى 24 ساعة قبل الاستقبال. رد على رسالة التأكيد أو راسلنا على واتساب."]]
    }
  },

  // Per hub: the destination of the comparison table, the rows after "transfer" and "taxi" ([name, time, price key]),
  // and per language the intro paragraphs and the hub's own FAQ
  IST: {
    dest: "taksim",
    ways: [["Havaist", "70–90", "low"], ["Metro M11 + M2", "≈ 60", "low"]],
    en: {
      about: ["Istanbul Airport (IST) is the city's main airport, on the European side about {km_taksim} km north-west of Taksim. It has one large terminal for all flights, so every arrival comes out into the same arrivals hall.", "There is no rail line straight into the old centre, and the motorway into the city is busiest in the afternoon and evening. A car takes about {min_taksim} minutes to Taksim and {min_sultanahmet} minutes to Sultanahmet outside rush hour."],
      faq: [["How far is Istanbul Airport from the city centre?", "About {km_taksim} km to Taksim ({min_taksim} min) and {km_sultanahmet} km to Sultanahmet ({min_sultanahmet} min) by car outside rush hour."], ["How much is a transfer from Istanbul Airport to Sultanahmet?", "€{p_sultanahmet} per car in a sedan for up to 3 passengers, €{p_taksim} to Taksim. Larger cars are in the table above."], ["Where does my driver wait at Istanbul Airport?", "{meet}"], ["Is there a night surcharge?", "No. The price is the same day and night. Only pickups between {peakFrom} and {peakTo} cost {pct}% more because of traffic."]]
    },
    tr: {
      about: ["İstanbul Havalimanı (IST), şehrin ana havalimanıdır; Avrupa yakasında, Taksim'in yaklaşık {km_taksim} km kuzeybatısındadır. Tüm uçuşlar tek ve büyük bir terminali kullanır, bu yüzden her yolcu aynı geliş salonuna çıkar.", "Eski şehre doğrudan giden bir raylı hat yoktur ve şehre giden otoyol öğleden sonra ve akşam en yoğun halindedir. Yoğun saat dışında araçla Taksim'e yaklaşık {min_taksim}, Sultanahmet'e {min_sultanahmet} dakika sürer."],
      faq: [["İstanbul Havalimanı şehir merkezine ne kadar uzak?", "Yoğun saat dışında araçla Taksim'e yaklaşık {km_taksim} km ({min_taksim} dk), Sultanahmet'e {km_sultanahmet} km ({min_sultanahmet} dk)."], ["İstanbul Havalimanı'ndan Sultanahmet'e transfer ne kadar?", "3 kişiye kadar sedan araçla araç başı €{p_sultanahmet}, Taksim'e €{p_taksim}. Büyük araçların fiyatları yukarıdaki tablodadır."], ["İstanbul Havalimanı'nda şoför nerede bekler?", "{meet}"], ["Gece tarifesi var mı?", "Hayır. Fiyat gece ve gündüz aynıdır. Yalnızca {peakFrom}–{peakTo} arası alışlar trafik nedeniyle %{pct} daha pahalıdır."]]
    },
    ru: {
      about: ["Аэропорт Стамбула (IST) — главный аэропорт города, на европейской стороне, примерно в {km_taksim} км к северо-западу от Таксима. Все рейсы обслуживает один большой терминал, поэтому все прилетающие выходят в один зал прилёта.", "Прямой железной дороги в старый город нет, а трасса в город сильнее всего загружена днём и вечером. Вне часа пик машина доезжает до Таксима примерно за {min_taksim} минут, до Султанахмета за {min_sultanahmet}."],
      faq: [["Как далеко аэропорт Стамбула от центра?", "Примерно {km_taksim} км до Таксима ({min_taksim} мин) и {km_sultanahmet} км до Султанахмета ({min_sultanahmet} мин) на машине вне часа пик."], ["Сколько стоит трансфер из аэропорта Стамбула в Султанахмет?", "€{p_sultanahmet} за седан до 3 пассажиров, €{p_taksim} до Таксима. Цены на машины побольше в таблице выше."], ["Где ждёт водитель в аэропорту Стамбула?", "{meet}"], ["Есть ли ночная надбавка?", "Нет. Цена одинакова днём и ночью. Дороже на {pct}% только подача с {peakFrom} до {peakTo} из-за пробок."]]
    },
    de: {
      about: ["Der Flughafen Istanbul (IST) ist der Hauptflughafen der Stadt, auf der europäischen Seite etwa {km_taksim} km nordwestlich von Taksim. Alle Flüge nutzen ein großes Terminal, alle Ankommenden kommen also in dieselbe Ankunftshalle.", "Eine direkte Bahn in die Altstadt gibt es nicht, und die Autobahn in die Stadt ist nachmittags und abends am vollsten. Außerhalb der Stoßzeit braucht ein Auto etwa {min_taksim} Minuten bis Taksim und {min_sultanahmet} Minuten bis Sultanahmet."],
      faq: [["Wie weit ist der Flughafen Istanbul vom Zentrum entfernt?", "Etwa {km_taksim} km bis Taksim ({min_taksim} Min.) und {km_sultanahmet} km bis Sultanahmet ({min_sultanahmet} Min.) mit dem Auto außerhalb der Stoßzeit."], ["Was kostet ein Transfer vom Flughafen Istanbul nach Sultanahmet?", "€{p_sultanahmet} pro Auto in der Limousine für bis zu 3 Personen, €{p_taksim} nach Taksim. Größere Fahrzeuge stehen in der Tabelle oben."], ["Wo wartet mein Fahrer am Flughafen Istanbul?", "{meet}"], ["Gibt es einen Nachtzuschlag?", "Nein. Der Preis ist tags und nachts gleich. Nur Abholungen zwischen {peakFrom} und {peakTo} kosten wegen des Verkehrs {pct} % mehr."]]
    },
    fr: {
      about: ["L'aéroport d'Istanbul (IST) est le principal aéroport de la ville, côté européen, à environ {km_taksim} km au nord-ouest de Taksim. Un seul grand terminal accueille tous les vols : tout le monde arrive dans le même hall.", "Aucune ligne ferroviaire ne va directement au vieux centre, et l'autoroute vers la ville est la plus chargée l'après-midi et le soir. Hors heures de pointe, une voiture met environ {min_taksim} minutes jusqu'à Taksim et {min_sultanahmet} minutes jusqu'à Sultanahmet."],
      faq: [["À quelle distance du centre se trouve l'aéroport d'Istanbul ?", "Environ {km_taksim} km jusqu'à Taksim ({min_taksim} min) et {km_sultanahmet} km jusqu'à Sultanahmet ({min_sultanahmet} min) en voiture hors heures de pointe."], ["Combien coûte un transfert de l'aéroport d'Istanbul à Sultanahmet ?", "€{p_sultanahmet} par voiture en berline jusqu'à 3 passagers, €{p_taksim} jusqu'à Taksim. Les véhicules plus grands sont dans le tableau ci-dessus."], ["Où m'attend le chauffeur à l'aéroport d'Istanbul ?", "{meet}"], ["Y a-t-il un supplément de nuit ?", "Non. Le prix est le même de jour comme de nuit. Seules les prises en charge entre {peakFrom} et {peakTo} coûtent {pct} % de plus à cause du trafic."]]
    },
    it: {
      about: ["L'aeroporto di Istanbul (IST) è il principale aeroporto della città, sul lato europeo, circa {km_taksim} km a nord-ovest di Taksim. Un unico grande terminal serve tutti i voli, quindi tutti arrivano nella stessa sala arrivi.", "Non c'è una linea ferroviaria diretta per il centro storico e l'autostrada verso la città è più trafficata nel pomeriggio e la sera. Fuori dall'ora di punta un'auto impiega circa {min_taksim} minuti fino a Taksim e {min_sultanahmet} fino a Sultanahmet."],
      faq: [["Quanto dista l'aeroporto di Istanbul dal centro?", "Circa {km_taksim} km da Taksim ({min_taksim} min) e {km_sultanahmet} km da Sultanahmet ({min_sultanahmet} min) in auto fuori dall'ora di punta."], ["Quanto costa un transfer dall'aeroporto di Istanbul a Sultanahmet?", "€{p_sultanahmet} per auto in berlina fino a 3 passeggeri, €{p_taksim} per Taksim. Le auto più grandi sono nella tabella sopra."], ["Dove mi aspetta l'autista all'aeroporto di Istanbul?", "{meet}"], ["C'è un supplemento notturno?", "No. Il prezzo è lo stesso di giorno e di notte. Solo i ritiri tra le {peakFrom} e le {peakTo} costano il {pct}% in più per il traffico."]]
    },
    nl: {
      about: ["Istanbul Airport (IST) is de belangrijkste luchthaven van de stad, aan de Europese kant, ongeveer {km_taksim} km ten noordwesten van Taksim. Alle vluchten gebruiken één grote terminal, dus iedereen komt in dezelfde aankomsthal uit.", "Er is geen directe treinverbinding naar het oude centrum, en de snelweg naar de stad is 's middags en 's avonds het drukst. Buiten de spits doet een auto er ongeveer {min_taksim} minuten over naar Taksim en {min_sultanahmet} minuten naar Sultanahmet."],
      faq: [["Hoe ver is Istanbul Airport van het centrum?", "Ongeveer {km_taksim} km naar Taksim ({min_taksim} min) en {km_sultanahmet} km naar Sultanahmet ({min_sultanahmet} min) met de auto buiten de spits."], ["Wat kost een transfer van Istanbul Airport naar Sultanahmet?", "€{p_sultanahmet} per auto in een sedan voor maximaal 3 personen, €{p_taksim} naar Taksim. Grotere auto's staan in de tabel hierboven."], ["Waar wacht mijn chauffeur op Istanbul Airport?", "{meet}"], ["Is er een nachttoeslag?", "Nee. De prijs is dag en nacht gelijk. Alleen ophalen tussen {peakFrom} en {peakTo} kost {pct}% meer vanwege het verkeer."]]
    },
    ar: {
      about: ["مطار إسطنبول (IST) هو المطار الرئيسي في المدينة، يقع في الجانب الأوروبي على بعد نحو {km_taksim} كم شمال غرب تقسيم. تستخدم كل الرحلات مبنى ركاب واحداً كبيراً، لذا يخرج جميع القادمين إلى صالة الوصول نفسها.", "لا يوجد خط قطار مباشر إلى المدينة القديمة، والطريق السريع إلى المدينة يكون في ذروة الزحام بعد الظهر وفي المساء. خارج أوقات الذروة تستغرق السيارة نحو {min_taksim} دقيقة إلى تقسيم و{min_sultanahmet} دقيقة إلى السلطان أحمد."],
      faq: [["كم يبعد مطار إسطنبول عن وسط المدينة؟", "نحو {km_taksim} كم إلى تقسيم ({min_taksim} دقيقة) و{km_sultanahmet} كم إلى السلطان أحمد ({min_sultanahmet} دقيقة) بالسيارة خارج أوقات الذروة."], ["كم سعر التوصيل من مطار إسطنبول إلى السلطان أحمد؟", "€{p_sultanahmet} للسيارة السيدان حتى 3 ركاب، و€{p_taksim} إلى تقسيم. أسعار السيارات الأكبر في الجدول أعلاه."], ["أين ينتظرني السائق في مطار إسطنبول؟", "{meet}"], ["هل توجد زيادة ليلية؟", "لا. السعر نفسه ليلاً ونهاراً. فقط الاستقبال بين {peakFrom} و{peakTo} أغلى بنسبة {pct}% بسبب الزحام."]]
    }
  },
  SAW: {
    dest: "taksim",
    ways: [["Havabus", "≈ 90", "low"], ["Metro M4 + {ferry}", "≈ 90", "low"]],
    en: {
      about: ["Sabiha Gökçen Airport (SAW) is Istanbul's second airport, on the Asian side in Pendik. Low-cost airlines use it most. Kadıköy is about {km_kadikoy} km away and Taksim, across the Bosphorus, about {km_taksim} km.", "To reach the European side you cross one of the Bosphorus bridges, and the roads there are busiest from the afternoon into the evening. Outside rush hour a car takes about {min_kadikoy} minutes to Kadıköy and {min_taksim} minutes to Taksim."],
      faq: [["How far is Sabiha Gökçen from Taksim and Sultanahmet?", "About {km_taksim} km to Taksim ({min_taksim} min) and {km_sultanahmet} km to Sultanahmet ({min_sultanahmet} min) by car outside rush hour."], ["How much is a transfer from Sabiha Gökçen to Taksim?", "€{p_taksim} per car in a sedan for up to 3 passengers, €{p_kadikoy} to Kadıköy. Larger cars are in the table above."], ["Do I pay extra for the Bosphorus bridge?", "No. Bridge and motorway tolls are included in the fixed price."], ["Where does my driver wait at Sabiha Gökçen?", "{meet}"]]
    },
    tr: {
      about: ["Sabiha Gökçen Havalimanı (SAW), İstanbul'un ikinci havalimanıdır; Anadolu yakasında, Pendik'tedir. En çok düşük maliyetli havayolları kullanır. Kadıköy'e yaklaşık {km_kadikoy} km, Boğaz'ın karşısındaki Taksim'e yaklaşık {km_taksim} km uzaklıktadır.", "Avrupa yakasına geçmek için Boğaz köprülerinden birini kullanırsınız ve bu yollar öğleden sonradan akşama kadar en yoğun halindedir. Yoğun saat dışında araçla Kadıköy'e yaklaşık {min_kadikoy}, Taksim'e {min_taksim} dakika sürer."],
      faq: [["Sabiha Gökçen, Taksim ve Sultanahmet'e ne kadar uzak?", "Yoğun saat dışında araçla Taksim'e yaklaşık {km_taksim} km ({min_taksim} dk), Sultanahmet'e {km_sultanahmet} km ({min_sultanahmet} dk)."], ["Sabiha Gökçen'den Taksim'e transfer ne kadar?", "3 kişiye kadar sedan araçla araç başı €{p_taksim}, Kadıköy'e €{p_kadikoy}. Büyük araçların fiyatları yukarıdaki tablodadır."], ["Boğaz köprüsü için ek ücret öder miyim?", "Hayır. Köprü ve otoyol ücretleri sabit fiyata dahildir."], ["Sabiha Gökçen'de şoför nerede bekler?", "{meet}"]]
    },
    ru: {
      about: ["Аэропорт Сабиха Гёкчен (SAW) — второй аэропорт Стамбула, на азиатской стороне в Пендике. Им чаще всего пользуются лоукостеры. До Кадыкёя около {km_kadikoy} км, до Таксима на другом берегу Босфора около {km_taksim} км.", "Чтобы попасть на европейскую сторону, нужно проехать по одному из мостов через Босфор, а там дороги загружены с середины дня до вечера. Вне часа пик машина доезжает до Кадыкёя примерно за {min_kadikoy} минут, до Таксима за {min_taksim}."],
      faq: [["Как далеко Сабиха Гёкчен от Таксима и Султанахмета?", "Примерно {km_taksim} км до Таксима ({min_taksim} мин) и {km_sultanahmet} км до Султанахмета ({min_sultanahmet} мин) на машине вне часа пик."], ["Сколько стоит трансфер из Сабихи Гёкчен в Таксим?", "€{p_taksim} за седан до 3 пассажиров, €{p_kadikoy} до Кадыкёя. Цены на машины побольше в таблице выше."], ["Нужно ли доплачивать за мост через Босфор?", "Нет. Плата за мосты и платные дороги включена в фиксированную цену."], ["Где ждёт водитель в Сабихе Гёкчен?", "{meet}"]]
    },
    de: {
      about: ["Der Flughafen Sabiha Gökçen (SAW) ist Istanbuls zweiter Flughafen, auf der asiatischen Seite in Pendik. Vor allem Billigfluggesellschaften nutzen ihn. Bis Kadıköy sind es etwa {km_kadikoy} km, bis Taksim auf der anderen Seite des Bosporus etwa {km_taksim} km.", "Auf die europäische Seite geht es über eine der Bosporusbrücken, und dort sind die Straßen vom Nachmittag bis in den Abend am vollsten. Außerhalb der Stoßzeit braucht ein Auto etwa {min_kadikoy} Minuten bis Kadıköy und {min_taksim} Minuten bis Taksim."],
      faq: [["Wie weit ist Sabiha Gökçen von Taksim und Sultanahmet entfernt?", "Etwa {km_taksim} km bis Taksim ({min_taksim} Min.) und {km_sultanahmet} km bis Sultanahmet ({min_sultanahmet} Min.) mit dem Auto außerhalb der Stoßzeit."], ["Was kostet ein Transfer von Sabiha Gökçen nach Taksim?", "€{p_taksim} pro Auto in der Limousine für bis zu 3 Personen, €{p_kadikoy} nach Kadıköy. Größere Fahrzeuge stehen in der Tabelle oben."], ["Zahle ich extra für die Bosporusbrücke?", "Nein. Brücken- und Autobahnmaut sind im Festpreis enthalten."], ["Wo wartet mein Fahrer in Sabiha Gökçen?", "{meet}"]]
    },
    fr: {
      about: ["L'aéroport Sabiha Gökçen (SAW) est le deuxième aéroport d'Istanbul, côté asiatique, à Pendik. Il est surtout utilisé par les compagnies low cost. Kadıköy est à environ {km_kadikoy} km et Taksim, de l'autre côté du Bosphore, à environ {km_taksim} km.", "Pour rejoindre la rive européenne, on traverse l'un des ponts du Bosphore, où la circulation est la plus dense de l'après-midi jusqu'au soir. Hors heures de pointe, une voiture met environ {min_kadikoy} minutes jusqu'à Kadıköy et {min_taksim} minutes jusqu'à Taksim."],
      faq: [["À quelle distance Sabiha Gökçen est-il de Taksim et de Sultanahmet ?", "Environ {km_taksim} km jusqu'à Taksim ({min_taksim} min) et {km_sultanahmet} km jusqu'à Sultanahmet ({min_sultanahmet} min) en voiture hors heures de pointe."], ["Combien coûte un transfert de Sabiha Gökçen à Taksim ?", "€{p_taksim} par voiture en berline jusqu'à 3 passagers, €{p_kadikoy} jusqu'à Kadıköy. Les véhicules plus grands sont dans le tableau ci-dessus."], ["Dois-je payer en plus pour le pont du Bosphore ?", "Non. Les péages des ponts et autoroutes sont compris dans le prix fixe."], ["Où m'attend le chauffeur à Sabiha Gökçen ?", "{meet}"]]
    },
    it: {
      about: ["L'aeroporto Sabiha Gökçen (SAW) è il secondo aeroporto di Istanbul, sul lato asiatico, a Pendik. Lo usano soprattutto le compagnie low cost. Kadıköy dista circa {km_kadikoy} km e Taksim, dall'altra parte del Bosforo, circa {km_taksim} km.", "Per raggiungere il lato europeo si attraversa uno dei ponti sul Bosforo, dove il traffico è più intenso dal pomeriggio fino a sera. Fuori dall'ora di punta un'auto impiega circa {min_kadikoy} minuti fino a Kadıköy e {min_taksim} fino a Taksim."],
      faq: [["Quanto dista Sabiha Gökçen da Taksim e Sultanahmet?", "Circa {km_taksim} km da Taksim ({min_taksim} min) e {km_sultanahmet} km da Sultanahmet ({min_sultanahmet} min) in auto fuori dall'ora di punta."], ["Quanto costa un transfer da Sabiha Gökçen a Taksim?", "€{p_taksim} per auto in berlina fino a 3 passeggeri, €{p_kadikoy} per Kadıköy. Le auto più grandi sono nella tabella sopra."], ["Pago un extra per il ponte sul Bosforo?", "No. I pedaggi di ponti e autostrade sono inclusi nel prezzo fisso."], ["Dove mi aspetta l'autista a Sabiha Gökçen?", "{meet}"]]
    },
    nl: {
      about: ["Sabiha Gökçen Airport (SAW) is de tweede luchthaven van Istanbul, aan de Aziatische kant in Pendik. Vooral prijsvechters vliegen erop. Kadıköy ligt op ongeveer {km_kadikoy} km en Taksim, aan de overkant van de Bosporus, op ongeveer {km_taksim} km.", "Naar de Europese kant ga je over een van de Bosporusbruggen, en daar is het van de middag tot in de avond het drukst. Buiten de spits doet een auto er ongeveer {min_kadikoy} minuten over naar Kadıköy en {min_taksim} minuten naar Taksim."],
      faq: [["Hoe ver is Sabiha Gökçen van Taksim en Sultanahmet?", "Ongeveer {km_taksim} km naar Taksim ({min_taksim} min) en {km_sultanahmet} km naar Sultanahmet ({min_sultanahmet} min) met de auto buiten de spits."], ["Wat kost een transfer van Sabiha Gökçen naar Taksim?", "€{p_taksim} per auto in een sedan voor maximaal 3 personen, €{p_kadikoy} naar Kadıköy. Grotere auto's staan in de tabel hierboven."], ["Betaal ik extra voor de Bosporusbrug?", "Nee. Brug- en snelwegtol zitten in de vaste prijs."], ["Waar wacht mijn chauffeur op Sabiha Gökçen?", "{meet}"]]
    },
    ar: {
      about: ["مطار صبيحة كوكجن (SAW) هو المطار الثاني في إسطنبول، يقع في الجانب الآسيوي في بنديك، وتستخدمه شركات الطيران الاقتصادي أكثر من غيرها. يبعد عن قاضي كوي نحو {km_kadikoy} كم، وعن تقسيم على الضفة الأخرى من البوسفور نحو {km_taksim} كم.", "للوصول إلى الجانب الأوروبي تعبر أحد جسور البوسفور، والطرق هناك تكون في ذروة الزحام من بعد الظهر حتى المساء. خارج أوقات الذروة تستغرق السيارة نحو {min_kadikoy} دقيقة إلى قاضي كوي و{min_taksim} دقيقة إلى تقسيم."],
      faq: [["كم يبعد صبيحة كوكجن عن تقسيم والسلطان أحمد؟", "نحو {km_taksim} كم إلى تقسيم ({min_taksim} دقيقة) و{km_sultanahmet} كم إلى السلطان أحمد ({min_sultanahmet} دقيقة) بالسيارة خارج أوقات الذروة."], ["كم سعر التوصيل من صبيحة كوكجن إلى تقسيم؟", "€{p_taksim} للسيارة السيدان حتى 3 ركاب، و€{p_kadikoy} إلى قاضي كوي. أسعار السيارات الأكبر في الجدول أعلاه."], ["هل أدفع رسوماً إضافية لجسر البوسفور؟", "لا. رسوم الجسور والطرق السريعة مشمولة في السعر الثابت."], ["أين ينتظرني السائق في صبيحة كوكجن؟", "{meet}"]]
    }
  },
  galataport: {
    dest: "sultanahmet",
    ways: [["tram", "≈ 15 + 🚶", "low"]],
    en: {
      about: ["Galataport is Istanbul's cruise port, on the Bosphorus shore in Karaköy and Tophane. The passenger terminal is underground, and you come up at street level next to the Tophane tram stop.", "Sultanahmet is only {km_sultanahmet} km away and Taksim {km_taksim} km, but the streets are steep and narrow, which is hard with suitcases. Istanbul Airport is about {km_IST} km away ({min_IST} min), Sabiha Gökçen about {km_SAW} km ({min_SAW} min)."],
      faq: [["How far is Galataport from the airports?", "About {km_IST} km to Istanbul Airport ({min_IST} min) and {km_SAW} km to Sabiha Gökçen ({min_SAW} min) by car outside rush hour."], ["How much is a transfer from Galataport to Istanbul Airport?", "€{p_IST} per car in a sedan for up to 3 passengers, €{p_SAW} to Sabiha Gökçen. Larger cars are in the table above."], ["Can I walk from Galataport to Sultanahmet?", "It is about {km_sultanahmet} km over the Galata Bridge, possible without luggage. With suitcases, a car or the T1 tram from Tophane is easier."], ["Where does my driver wait at Galataport?", "{meet}"]]
    },
    tr: {
      about: ["Galataport, İstanbul'un kruvaziyer limanıdır; Karaköy ve Tophane'de, Boğaz kıyısındadır. Yolcu terminali yer altındadır ve Tophane tramvay durağının yanında sokak seviyesine çıkarsınız.", "Sultanahmet yalnızca {km_sultanahmet} km, Taksim {km_taksim} km uzaklıktadır, ama sokaklar dik ve dardır; bavulla zordur. İstanbul Havalimanı yaklaşık {km_IST} km ({min_IST} dk), Sabiha Gökçen yaklaşık {km_SAW} km ({min_SAW} dk) uzaklıktadır."],
      faq: [["Galataport havalimanlarına ne kadar uzak?", "Yoğun saat dışında araçla İstanbul Havalimanı'na yaklaşık {km_IST} km ({min_IST} dk), Sabiha Gökçen'e {km_SAW} km ({min_SAW} dk)."], ["Galataport'tan İstanbul Havalimanı'na transfer ne kadar?", "3 kişiye kadar sedan araçla araç başı €{p_IST}, Sabiha Gökçen'e €{p_SAW}. Büyük araçların fiyatları yukarıdaki tablodadır."], ["Galataport'tan Sultanahmet'e yürünür mü?", "Galata Köprüsü üzerinden yaklaşık {km_sultanahmet} km; bavulsuz yürünebilir. Bavulla araç veya Tophane'den T1 tramvayı daha kolaydır."], ["Galataport'ta şoför nerede bekler?", "{meet}"]]
    },
    ru: {
      about: ["Галатапорт — круизный порт Стамбула на берегу Босфора в Каракёе и Топхане. Пассажирский терминал находится под землёй, а выход на улицу — рядом с трамвайной остановкой Топхане.", "До Султанахмета всего {km_sultanahmet} км, до Таксима {km_taksim} км, но улицы крутые и узкие, с чемоданами это тяжело. До аэропорта Стамбула около {km_IST} км ({min_IST} мин), до Сабихи Гёкчен около {km_SAW} км ({min_SAW} мин)."],
      faq: [["Как далеко Галатапорт от аэропортов?", "Примерно {km_IST} км до аэропорта Стамбула ({min_IST} мин) и {km_SAW} км до Сабихи Гёкчен ({min_SAW} мин) на машине вне часа пик."], ["Сколько стоит трансфер из Галатапорта в аэропорт Стамбула?", "€{p_IST} за седан до 3 пассажиров, €{p_SAW} до Сабихи Гёкчен. Цены на машины побольше в таблице выше."], ["Можно ли дойти из Галатапорта до Султанахмета пешком?", "Это около {km_sultanahmet} км через Галатский мост, без багажа можно. С чемоданами проще на машине или на трамвае T1 от Топхане."], ["Где ждёт водитель в Галатапорте?", "{meet}"]]
    },
    de: {
      about: ["Galataport ist Istanbuls Kreuzfahrthafen, am Bosporusufer in Karaköy und Tophane. Das Passagierterminal liegt unterirdisch, und Sie kommen neben der Straßenbahnhaltestelle Tophane an die Oberfläche.", "Sultanahmet ist nur {km_sultanahmet} km entfernt und Taksim {km_taksim} km, aber die Straßen sind steil und eng, mit Koffern mühsam. Der Flughafen Istanbul liegt etwa {km_IST} km entfernt ({min_IST} Min.), Sabiha Gökçen etwa {km_SAW} km ({min_SAW} Min.)."],
      faq: [["Wie weit ist Galataport von den Flughäfen entfernt?", "Etwa {km_IST} km bis zum Flughafen Istanbul ({min_IST} Min.) und {km_SAW} km bis Sabiha Gökçen ({min_SAW} Min.) mit dem Auto außerhalb der Stoßzeit."], ["Was kostet ein Transfer von Galataport zum Flughafen Istanbul?", "€{p_IST} pro Auto in der Limousine für bis zu 3 Personen, €{p_SAW} nach Sabiha Gökçen. Größere Fahrzeuge stehen in der Tabelle oben."], ["Kann ich von Galataport nach Sultanahmet laufen?", "Es sind etwa {km_sultanahmet} km über die Galatabrücke, ohne Gepäck machbar. Mit Koffern sind Auto oder die Straßenbahn T1 ab Tophane einfacher."], ["Wo wartet mein Fahrer in Galataport?", "{meet}"]]
    },
    fr: {
      about: ["Galataport est le port de croisière d'Istanbul, sur la rive du Bosphore à Karaköy et Tophane. Le terminal passagers est souterrain et vous remontez au niveau de la rue près de l'arrêt de tram Tophane.", "Sultanahmet n'est qu'à {km_sultanahmet} km et Taksim à {km_taksim} km, mais les rues sont raides et étroites, difficiles avec des valises. L'aéroport d'Istanbul est à environ {km_IST} km ({min_IST} min), Sabiha Gökçen à environ {km_SAW} km ({min_SAW} min)."],
      faq: [["À quelle distance Galataport est-il des aéroports ?", "Environ {km_IST} km jusqu'à l'aéroport d'Istanbul ({min_IST} min) et {km_SAW} km jusqu'à Sabiha Gökçen ({min_SAW} min) en voiture hors heures de pointe."], ["Combien coûte un transfert de Galataport à l'aéroport d'Istanbul ?", "€{p_IST} par voiture en berline jusqu'à 3 passagers, €{p_SAW} jusqu'à Sabiha Gökçen. Les véhicules plus grands sont dans le tableau ci-dessus."], ["Peut-on aller à pied de Galataport à Sultanahmet ?", "C'est environ {km_sultanahmet} km par le pont de Galata, faisable sans bagages. Avec des valises, la voiture ou le tram T1 depuis Tophane est plus simple."], ["Où m'attend le chauffeur à Galataport ?", "{meet}"]]
    },
    it: {
      about: ["Galataport è il porto crocieristico di Istanbul, sulla riva del Bosforo a Karaköy e Tophane. Il terminal passeggeri è sotterraneo e si risale in strada accanto alla fermata del tram Tophane.", "Sultanahmet dista solo {km_sultanahmet} km e Taksim {km_taksim} km, ma le strade sono ripide e strette, faticose con le valigie. L'aeroporto di Istanbul è a circa {km_IST} km ({min_IST} min), Sabiha Gökçen a circa {km_SAW} km ({min_SAW} min)."],
      faq: [["Quanto dista Galataport dagli aeroporti?", "Circa {km_IST} km dall'aeroporto di Istanbul ({min_IST} min) e {km_SAW} km da Sabiha Gökçen ({min_SAW} min) in auto fuori dall'ora di punta."], ["Quanto costa un transfer da Galataport all'aeroporto di Istanbul?", "€{p_IST} per auto in berlina fino a 3 passeggeri, €{p_SAW} per Sabiha Gökçen. Le auto più grandi sono nella tabella sopra."], ["Si può andare a piedi da Galataport a Sultanahmet?", "Sono circa {km_sultanahmet} km attraverso il ponte di Galata, fattibili senza bagagli. Con le valigie è più semplice l'auto o il tram T1 da Tophane."], ["Dove mi aspetta l'autista a Galataport?", "{meet}"]]
    },
    nl: {
      about: ["Galataport is de cruisehaven van Istanbul, aan de Bosporus in Karaköy en Tophane. De passagiersterminal ligt ondergronds en je komt boven naast de tramhalte Tophane.", "Sultanahmet ligt maar {km_sultanahmet} km verderop en Taksim {km_taksim} km, maar de straten zijn steil en smal, lastig met koffers. Istanbul Airport ligt op ongeveer {km_IST} km ({min_IST} min), Sabiha Gökçen op ongeveer {km_SAW} km ({min_SAW} min)."],
      faq: [["Hoe ver is Galataport van de luchthavens?", "Ongeveer {km_IST} km naar Istanbul Airport ({min_IST} min) en {km_SAW} km naar Sabiha Gökçen ({min_SAW} min) met de auto buiten de spits."], ["Wat kost een transfer van Galataport naar Istanbul Airport?", "€{p_IST} per auto in een sedan voor maximaal 3 personen, €{p_SAW} naar Sabiha Gökçen. Grotere auto's staan in de tabel hierboven."], ["Kan ik van Galataport naar Sultanahmet lopen?", "Het is ongeveer {km_sultanahmet} km over de Galatabrug, te doen zonder bagage. Met koffers zijn een auto of tram T1 vanaf Tophane makkelijker."], ["Waar wacht mijn chauffeur in Galataport?", "{meet}"]]
    },
    ar: {
      about: ["غلطة بورت هو ميناء الرحلات البحرية في إسطنبول، على ضفة البوسفور في كاراكوي وتوبهانه. مبنى الركاب تحت الأرض، وتصعد إلى مستوى الشارع بجوار محطة ترام توبهانه.", "السلطان أحمد على بعد {km_sultanahmet} كم فقط وتقسيم {km_taksim} كم، لكن الشوارع شديدة الانحدار وضيقة ويصعب السير فيها بالحقائب. يبعد مطار إسطنبول نحو {km_IST} كم ({min_IST} دقيقة)، وصبيحة كوكجن نحو {km_SAW} كم ({min_SAW} دقيقة)."],
      faq: [["كم يبعد غلطة بورت عن المطارات؟", "نحو {km_IST} كم إلى مطار إسطنبول ({min_IST} دقيقة) و{km_SAW} كم إلى صبيحة كوكجن ({min_SAW} دقيقة) بالسيارة خارج أوقات الذروة."], ["كم سعر التوصيل من غلطة بورت إلى مطار إسطنبول؟", "€{p_IST} للسيارة السيدان حتى 3 ركاب، و€{p_SAW} إلى صبيحة كوكجن. أسعار السيارات الأكبر في الجدول أعلاه."], ["هل يمكن المشي من غلطة بورت إلى السلطان أحمد؟", "المسافة نحو {km_sultanahmet} كم عبر جسر غلطة، ويمكن مشيها دون حقائب. مع الحقائب الأسهل السيارة أو ترام T1 من توبهانه."], ["أين ينتظرني السائق في غلطة بورت؟", "{meet}"]]
    }
  }
};
