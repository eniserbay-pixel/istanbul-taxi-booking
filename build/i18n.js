// Page texts in English (the site's main language: visitors are travellers) and Turkish.
// {brand} {from} {to} {price} {km} {min} are filled in by build.js.
module.exports = {
  en: {
    htmlLang: "en",
    paths: {
      home: "/", book: "/book", prices: "/prices", terms: "/terms", privacy: "/privacy",
      IST: "/istanbul-airport-taxi", SAW: "/sabiha-gokcen-airport-taxi",
      route: (a, z) => a === "IST" ? `/istanbul-airport-taxi-to-${z}` : `/sabiha-gokcen-airport-taxi-to-${z}`,
      airportPair: "/istanbul-airport-to-sabiha-gokcen-taxi"
    },
    nav: { prices: "Prices", fleet: "Fleet", how: "How it works", faq: "FAQ", book: "Book now", lang: "Türkçe" },
    form: {
      title: "Get your fixed price", from: "From", to: "To", date: "Date", time: "Pickup time", pax: "Passengers",
      ret: "Add a return transfer (10% off)", rdate: "Return date", rtime: "Return pickup time", submit: "See prices",
      airports: "Airports", districts: "Istanbul", port: "Cruise port", choose: "Choose…", swap: "Swap"
    },
    home: {
      title: "Istanbul Airport Taxi · Fixed Price from €{min} per Car",
      desc: "Private Istanbul airport taxi from IST and Sabiha Gökçen, fixed price from €{min} per car. Driver waits with your name sign, flight tracking, pay in cash.",
      h1: "Istanbul Airport Taxi at a fixed price",
      lead: "A private car from Istanbul Airport (IST) or Sabiha Gökçen (SAW) to your hotel, from €{min} per car. Your driver waits with your name sign and you pay in cash at the end of the ride.",
      badges: ["Fixed price, no meter", "Driver with your name sign", "Flight tracking, 60 min free waiting", "Pay the driver in cash"],
      fleetH: "Choose your car", fleetLead: "The price is per car, not per person. Tolls, parking and waiting time are included.",
      routesH: "Popular airport taxi prices", routesLead: "Fixed prices per car, one way. Pickups at IST 15:00–19:00 and SAW 14:45–21:00 cost 30% more.",
      vsH: "Metered taxi or our airport taxi?",
      vs: [["Price", "Changes with traffic and the route the driver takes", "Fixed when you book"], ["At arrivals", "Queue at the taxi rank", "Driver waits with your name sign"], ["Flight delay", "-", "We track your flight, 60 min free waiting"], ["Luggage and groups", "Small yellow cab", "Sedan, minivan, V-Class or minibus up to 16"], ["Payment", "Meter, often cash only", "Cash to the driver in EUR, USD or TRY"]],
      vsCols: ["", "Street taxi", "{brand}"],
      howH: "How it works",
      how: [["Request", "Pick your route, car and time. It takes a minute and no payment is needed."], ["Confirmation", "We check availability and send you a confirmation e-mail, usually within an hour."], ["Ride", "Your driver meets you with your name sign. Pay the fixed price in cash at the end."]],
      meetH: "Where your driver waits",
      ctaH: "Landing in Istanbul soon?", ctaP: "Request your airport taxi now and get your confirmation by e-mail.",
      faqH: "Frequently asked questions"
    },
    faq: [
      ["Is this a regular Istanbul taxi?", "No. It is a private car with a professional driver, booked in advance at a fixed price. Many travellers call it an airport taxi; unlike a street taxi there is no meter and the driver meets you inside the terminal."],
      ["How do I pay?", "You pay the driver in cash at the end of the ride, in euro, US dollar or Turkish lira. There is no online payment and no deposit."],
      ["When is my booking confirmed?", "Right after you send the form we e-mail you that we received your request. Once we assign a car we send a confirmation e-mail, usually within an hour."],
      ["What if my flight is late?", "We track your flight and adjust the pickup time. The first 60 minutes after landing are free."],
      ["Is the price per person?", "No, the price is per car. A sedan takes up to 3 passengers, a minivan up to 7, a V-Class up to 6 and a minibus up to 16."],
      ["Can I cancel?", "Yes, free of charge up to 24 hours before pickup. Just reply to your confirmation e-mail or write to us on WhatsApp."]
    ],
    route: {
      title: "{from} Taxi to {to} · Fixed €{price} per Car",
      desc: "Private taxi from {from} to {to}: fixed price from €{price} per car, {km} km, about {min} min. Name sign, flight tracking, pay the driver in cash.",
      h1: "{from} taxi to {to}",
      answer: "A private taxi from {fromLong} to {toLong} costs a fixed <strong>€{price} per car</strong> in a sedan for up to 3 passengers. The {km} km drive takes about {min} minutes outside rush hour. Tolls and parking are included and you pay the driver in cash.",
      answerNoDist: "A private taxi from {fromLong} to {toLong} costs a fixed <strong>€{price} per car</strong> in a sedan for up to 3 passengers. Tolls and parking are included and you pay the driver in cash.",
      pricesH: "Prices from {from} to {to}", car: "Car", seats: "Passengers", bags: "Suitcases", price: "Price per car",
      areaH: "Areas covered by this price", meetH: "Where your driver waits",
      faq: [
        ["How much is a taxi from {from} to {to}?", "With us it is a fixed €{price} per car in a sedan, €{van} in a minivan for up to 7, €{vclass} in a Mercedes V-Class and €{bus} in a minibus for up to 16."],
        ["How long does it take?", "About {min} minutes for the {km} km outside rush hour. Weekday evenings can take longer; the price stays the same."],
        ["Do I pay more if my flight is late?", "No. We track your flight and the first 60 minutes after landing are free."]
      ],
      faqNoDist: 1,
      otherH: "Other routes from {from}", back: "All {from} taxi prices"
    },
    hub: {
      title: "{from} Taxi · Fixed Prices to Every District",
      desc: "Fixed-price private taxi from {from} to Sultanahmet, Taksim, Kadıköy and every central district, from €{price} per car. Name sign and flight tracking.",
      h1: "{from} taxi prices",
      lead: "Fixed prices per car from {fromLong} to Istanbul's central districts. Pick your destination to see all four cars."
    },
    prices: { title: "Istanbul Airport Taxi Prices · {brand}", desc: "All fixed airport taxi prices from Istanbul Airport and Sabiha Gökçen, per car, for sedan, minivan, V-Class and minibus.", h1: "Airport taxi prices", to: "To" },
    book: {
      title: "Book your airport taxi · {brand}", h1: "Book your airport taxi",
      steps: ["Car", "Details", "Confirm"],
      noRoute: "Choose where you start and where you go to see prices.",
      noPrice: "We have no fixed price for this route yet. Write to us on WhatsApp for a quote.",
      tooMany: "Too many passengers for this car",
      choose: "Choose", perCar: "per car", oneWay: "one way", withReturn: "incl. return",
      name: "Full name", email: "E-mail", phone: "Mobile phone (with country code)", flight: "Flight number",
      flightHelp: "So we can track your flight", pickup: "Hotel or pickup address", dropoff: "Hotel or drop-off address",
      bags: "Suitcases", seats: "Child seats (€{seat} each)", note: "Note for the driver (optional)",
      retFlight: "Return flight number (optional)", retPickup: "Return pickup address",
      next: "Continue", back: "Back", send: "Send booking request",
      terms: "I accept the <a href=\"/terms\" target=\"_blank\">terms</a> and the <a href=\"/privacy\" target=\"_blank\">privacy notice</a>.",
      review: "Check your booking", total: "Total", pay: "Payment: cash to the driver at the end of the ride (EUR, USD or TRY).",
      peak: "Busy-hour surcharge included", seatsLine: "Child seats",
      required: "Please fill in this field", invalidEmail: "Please check your e-mail address", invalidPhone: "Please check your phone number", accept: "Please accept the terms",
      doneH: "Request received", doneP: "Thank you! Your reference is <strong>{ref}</strong>. We sent the details to {email} and will confirm your booking by e-mail shortly. Nothing is booked until you receive our confirmation.",
      error: "We could not send your request. Please try again or write to us on WhatsApp.",
      whatsapp: "Ask on WhatsApp"
    },
    footer: { rights: "All rights reserved.", tursab: "TÜRSAB licence", contact: "Contact", legal: "Legal", routes: "Popular routes" },
    notFound: { title: "Page not found", p: "This page does not exist. Find your airport taxi price below.", home: "Go to the home page" }
  },
  tr: {
    htmlLang: "tr",
    paths: {
      home: "/tr", book: "/tr/rezervasyon", prices: "/tr/fiyatlar", terms: "/tr/kosullar", privacy: "/tr/gizlilik",
      IST: "/tr/istanbul-havalimani-taksi", SAW: "/tr/sabiha-gokcen-taksi",
      route: (a, z) => a === "IST" ? `/tr/istanbul-havalimani-${z}-taksi` : `/tr/sabiha-gokcen-${z}-taksi`,
      airportPair: "/tr/istanbul-havalimani-sabiha-gokcen-taksi"
    },
    nav: { prices: "Fiyatlar", fleet: "Araçlar", how: "Nasıl çalışır", faq: "SSS", book: "Rezervasyon", lang: "English" },
    form: {
      title: "Sabit fiyatınızı görün", from: "Nereden", to: "Nereye", date: "Tarih", time: "Alış saati", pax: "Yolcu",
      ret: "Dönüş transferi ekle (%10 indirim)", rdate: "Dönüş tarihi", rtime: "Dönüş alış saati", submit: "Fiyatları gör",
      airports: "Havalimanları", districts: "İstanbul", port: "Kruvaziyer limanı", choose: "Seçin…", swap: "Yer değiştir"
    },
    home: {
      title: "İstanbul Havalimanı Taksi · Araç Başı Sabit €{min}",
      desc: "İstanbul Havalimanı ve Sabiha Gökçen'den sabit fiyatlı özel havalimanı taksisi, araç başı en düşük €{min}. İsimli karşılama, uçuş takibi, ödeme araçta nakit.",
      h1: "Sabit fiyatlı İstanbul Havalimanı taksi",
      lead: "İstanbul Havalimanı (IST) veya Sabiha Gökçen'den (SAW) otelinize özel araç, araç başı en düşük €{min}. Şoförünüz adınızın yazılı olduğu tabelayla bekler, ödemeyi yolculuk sonunda nakit yaparsınız.",
      badges: ["Sabit fiyat, taksimetre yok", "İsimli karşılama", "Uçuş takibi, 60 dk ücretsiz bekleme", "Araçta şoföre nakit ödeme"],
      fleetH: "Aracınızı seçin", fleetLead: "Fiyat kişi başı değil, araç başıdır. Köprü, otoyol, otopark ve bekleme dahildir.",
      routesH: "Popüler havalimanı taksi fiyatları", routesLead: "Araç başı sabit fiyatlar, tek yön. IST'de 15:00–19:00, SAW'da 14:45–21:00 arası alışlar %30 daha pahalıdır.",
      vsH: "Taksimetreli taksi mi, bizim havalimanı taksimiz mi?",
      vs: [["Fiyat", "Trafiğe ve güzergâha göre değişir", "Rezervasyonda sabitlenir"], ["Gelişte", "Taksi kuyruğu", "Şoför adınızla bekler"], ["Uçuş rötarı", "-", "Uçuşu takip ederiz, 60 dk ücretsiz bekleme"], ["Bagaj ve grup", "Küçük sarı taksi", "Sedan, minivan, V-Class veya 16 kişilik minibüs"], ["Ödeme", "Taksimetre, çoğu zaman nakit", "Şoföre nakit: EUR, USD veya TL"]],
      vsCols: ["", "Sarı taksi", "{brand}"],
      howH: "Nasıl çalışır",
      how: [["Talep", "Güzergâh, araç ve saati seçin. Bir dakika sürer, ödeme gerekmez."], ["Onay", "Müsaitliği kontrol eder, genellikle bir saat içinde onay e-postası göndeririz."], ["Yolculuk", "Şoförünüz sizi isim tabelasıyla karşılar. Sabit fiyatı yolculuk sonunda nakit ödersiniz."]],
      meetH: "Şoförünüz nerede bekler",
      ctaH: "Yakında İstanbul'a mı iniyorsunuz?", ctaP: "Havalimanı taksinizi şimdi isteyin, onayınızı e-postayla alın.",
      faqH: "Sık sorulan sorular"
    },
    faq: [
      ["Bu normal bir İstanbul taksisi mi?", "Hayır. Önceden, sabit fiyatla ayrılan, profesyonel şoförlü özel bir araçtır. Yabancı yolcular bu hizmete havalimanı taksisi der; sarı taksiden farkı taksimetre olmaması ve şoförün sizi terminalde karşılamasıdır."],
      ["Nasıl ödeme yaparım?", "Yolculuk sonunda şoföre nakit ödersiniz: euro, ABD doları veya Türk lirası. Online ödeme ya da kapora yoktur."],
      ["Rezervasyonum ne zaman kesinleşir?", "Formu gönderdiğiniz anda talebinizi aldığımızı e-postayla bildiririz. Araç atandığında, genellikle bir saat içinde, onay e-postası göndeririz."],
      ["Uçağım rötar yaparsa?", "Uçuşunuzu takip eder, alış saatini ona göre ayarlarız. İnişten sonraki ilk 60 dakika ücretsizdir."],
      ["Fiyat kişi başı mı?", "Hayır, fiyat araç başıdır. Sedan 3, minivan 7, V-Class 6, minibüs 16 yolcuya kadar alır."],
      ["İptal edebilir miyim?", "Evet, alış saatinden 24 saat öncesine kadar ücretsiz. Onay e-postasını yanıtlamanız veya WhatsApp'tan yazmanız yeterli."]
    ],
    route: {
      title: "{from} {to} Taksi · Sabit €{price}",
      desc: "{from} – {to} arası özel taksi: araç başı sabit €{price}, {km} km, yaklaşık {min} dk. İsimli karşılama, uçuş takibi, şoföre nakit ödeme.",
      h1: "{from} – {to} taksi",
      answer: "{fromLong} ile {toLong} arası özel taksi, 3 yolcuya kadar sedan araçla araç başı sabit <strong>€{price}</strong>. {km} km'lik yol, yoğun saat dışında yaklaşık {min} dakika sürer. Köprü, otoyol ve otopark dahildir; ödemeyi şoföre nakit yaparsınız.",
      answerNoDist: "{fromLong} ile {toLong} arası özel taksi, 3 yolcuya kadar sedan araçla araç başı sabit <strong>€{price}</strong>. Köprü, otoyol ve otopark dahildir; ödemeyi şoföre nakit yaparsınız.",
      pricesH: "{from} – {to} fiyatları", car: "Araç", seats: "Yolcu", bags: "Bavul", price: "Araç başı fiyat",
      areaH: "Bu fiyatın geçerli olduğu bölgeler", meetH: "Şoförünüz nerede bekler",
      faq: [
        ["{from} – {to} taksi ne kadar?", "Bizimle sedan araçta araç başı sabit €{price}, 7 kişiye kadar minivanda €{van}, Mercedes V-Class'ta €{vclass}, 16 kişiye kadar minibüste €{bus}."],
        ["Yol ne kadar sürer?", "Yoğun saat dışında {km} km yaklaşık {min} dakika. Hafta içi akşamları uzayabilir, fiyat değişmez."],
        ["Uçağım gecikirse fazla öder miyim?", "Hayır. Uçuşunuzu takip ederiz, inişten sonraki ilk 60 dakika ücretsizdir."]
      ],
      faqNoDist: 1,
      otherH: "{from} çıkışlı diğer güzergâhlar", back: "Tüm {from} taksi fiyatları"
    },
    hub: {
      title: "{from} Taksi · Tüm İlçelere Sabit Fiyat",
      desc: "{from} çıkışlı Sultanahmet, Taksim, Kadıköy ve tüm merkezi ilçelere sabit fiyatlı özel taksi, araç başı en düşük €{price}. İsimli karşılama ve uçuş takibi.",
      h1: "{from} taksi fiyatları",
      lead: "{fromLong} çıkışlı, İstanbul'un merkezi ilçelerine araç başı sabit fiyatlar. Dört aracın fiyatı için varış noktasını seçin."
    },
    prices: { title: "İstanbul Havalimanı Taksi Fiyatları · {brand}", desc: "İstanbul Havalimanı ve Sabiha Gökçen çıkışlı tüm sabit havalimanı taksi fiyatları; sedan, minivan, V-Class ve minibüs, araç başı.", h1: "Havalimanı taksi fiyatları", to: "Nereye" },
    book: {
      title: "Havalimanı taksi rezervasyonu · {brand}", h1: "Havalimanı taksi rezervasyonu",
      steps: ["Araç", "Bilgiler", "Onay"],
      noRoute: "Fiyatları görmek için nereden ve nereye gideceğinizi seçin.",
      noPrice: "Bu güzergâh için henüz sabit fiyatımız yok. Fiyat için WhatsApp'tan yazın.",
      tooMany: "Bu araç için yolcu sayısı fazla",
      choose: "Seç", perCar: "araç başı", oneWay: "tek yön", withReturn: "dönüş dahil",
      name: "Ad soyad", email: "E-posta", phone: "Cep telefonu (ülke koduyla)", flight: "Uçuş numarası",
      flightHelp: "Uçuşunuzu takip edebilmemiz için", pickup: "Otel veya alış adresi", dropoff: "Otel veya bırakış adresi",
      bags: "Bavul", seats: "Çocuk koltuğu (tanesi €{seat})", note: "Şoföre not (isteğe bağlı)",
      retFlight: "Dönüş uçuş numarası (isteğe bağlı)", retPickup: "Dönüşte alış adresi",
      next: "Devam", back: "Geri", send: "Rezervasyon talebini gönder",
      terms: "<a href=\"/tr/kosullar\" target=\"_blank\">Koşulları</a> ve <a href=\"/tr/gizlilik\" target=\"_blank\">aydınlatma metnini</a> kabul ediyorum.",
      review: "Rezervasyonunuzu kontrol edin", total: "Toplam", pay: "Ödeme: yolculuk sonunda şoföre nakit (EUR, USD veya TL).",
      peak: "Yoğun saat farkı dahil", seatsLine: "Çocuk koltuğu",
      required: "Bu alanı doldurun", invalidEmail: "E-posta adresinizi kontrol edin", invalidPhone: "Telefon numaranızı kontrol edin", accept: "Lütfen koşulları kabul edin",
      doneH: "Talebiniz alındı", doneP: "Teşekkürler! Rezervasyon numaranız <strong>{ref}</strong>. Bilgileri {email} adresine gönderdik; rezervasyonunuzu kısa süre içinde e-postayla onaylayacağız. Onay e-postası gelene kadar rezervasyon kesinleşmiş değildir.",
      error: "Talebiniz gönderilemedi. Tekrar deneyin veya WhatsApp'tan yazın.",
      whatsapp: "WhatsApp'tan sor"
    },
    footer: { rights: "Tüm hakları saklıdır.", tursab: "TÜRSAB belge no", contact: "İletişim", legal: "Yasal", routes: "Popüler güzergâhlar" },
    notFound: { title: "Sayfa bulunamadı", p: "Bu sayfa yok. Havalimanı taksi fiyatınızı aşağıda bulabilirsiniz.", home: "Ana sayfaya git" }
  }
};
