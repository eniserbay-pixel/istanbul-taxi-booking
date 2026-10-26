// Blog posts in English and Turkish. Each post: the same `id` in both languages, so the pages link to each other.
// body: HTML; {widget} is replaced by the booking box, {brand} by the brand name, {book} by the booking page.
// Facts with numbers carry their source link in the text.
const SRC = {
  density: "https://www.duvarenglish.com/istanbul-has-one-of-worlds-lowest-taxi-densities-says-municipality-news-58745",
  complaints: "https://www.duvarenglish.com/istanbul-municipality-receives-thousands-of-complaints-about-taxi-drivers-being-picky-with-passengers-news-62652"
};

module.exports = [
  {
    id: "taxi-shortage",
    date: "2026-10-26",
    en: {
      slug: "why-is-it-hard-to-find-a-taxi-in-istanbul",
      title: "Why Is It Hard to Find a Taxi in Istanbul?",
      desc: "Istanbul has about one taxi per 1,000 people and thousands of complaints a year. Why taxis are hard to find, and how to skip the problem by booking ahead.",
      lead: "Istanbul is a city of over 16 million people, but its taxi fleet has barely grown in 30 years. That is why finding a taxi, especially at the airport, at rush hour or in the rain, can take a long time.",
      body: `<h2>Too few taxis for a very big city</h2>
<p>According to Istanbul Metropolitan Municipality figures reported in 2021, the city had <strong>17,395 taxis</strong>, the same number as in the 1990s, while the population more than doubled from 7.5 million to over 16 million. That is <strong>about one taxi per 1,000 residents</strong>. For comparison, New York had 13,587 taxis for 8.4 million people (<a href="${SRC.density}" target="_blank" rel="noopener">source</a>).</p>
<p>The result is simple: at busy times there are far more people looking for a taxi than there are taxis.</p>
{widget}
<h2>Drivers choose their passengers</h2>
<p>The most common complaint about Istanbul taxis is not price, it is drivers picking passengers and routes. In the first six months of 2023 the municipality received <strong>33,878 complaints</strong> about taxis. More than half, <strong>18,079</strong>, were about drivers being picky about the passenger or the destination. Others were about overcharging (3,026), longer routes (1,386), refusing short rides (1,290) and not switching on the meter (712) (<a href="${SRC.complaints}" target="_blank" rel="noopener">source</a>).</p>
<p>For a visitor with suitcases who does not speak Turkish, this is exactly what makes the first hour in Istanbul stressful.</p>
<h2>Where it is hardest</h2>
<ul>
<li><strong>At the airport after a late flight:</strong> long queues at the taxi rank, and families or groups often do not fit in one yellow cab.</li>
<li><strong>At rush hour and in the rain:</strong> taxis are full or drivers turn down trips into traffic.</li>
<li><strong>Short trips and the Asian side:</strong> some drivers refuse rides they consider not worth it, or a Bosphorus crossing.</li>
</ul>
<h2>The easy way: book before you land</h2>
<p>A pre-booked transfer solves all of this. With {brand} you choose your car and see the fixed price before you travel. Your driver tracks your flight and waits in the arrivals hall with your name sign, so there is no queue, no negotiation and no meter. You pay the same price in cash at the end of the ride.</p>
<p>Booking takes about a minute: no account and no payment up front. You get an e-mail that we received your request, then a confirmation e-mail once your car is assigned.</p>
{widget}`
    },
    tr: {
      slug: "istanbulda-taksi-bulmak-neden-zor",
      title: "İstanbul'da Taksi Bulmak Neden Bu Kadar Zor?",
      desc: "İstanbul'da 1.000 kişiye yaklaşık bir taksi düşüyor ve her yıl binlerce şikâyet var. Taksi bulmak neden zor ve önceden rezervasyonla sorun nasıl çözülür?",
      lead: "İstanbul 16 milyonu aşan nüfusuyla dünyanın en büyük şehirlerinden biri, ama taksi sayısı 30 yılda neredeyse hiç artmadı. Bu yüzden özellikle havalimanında, yoğun saatte ya da yağmurda taksi bulmak uzun sürebiliyor.",
      body: `<h2>Bu büyüklükte bir şehre çok az taksi</h2>
<p>İstanbul Büyükşehir Belediyesi'nin 2021'de aktarılan verilerine göre şehirde <strong>17.395 taksi</strong> vardı; bu sayı 1990'lardan beri aynı. Aynı sürede nüfus 7,5 milyondan 16 milyonun üzerine çıktı. Yani <strong>1.000 kişiye yaklaşık bir taksi</strong> düşüyor. Karşılaştırma için New York'ta 8,4 milyon kişiye 13.587 taksi var (<a href="${SRC.density}" target="_blank" rel="noopener">kaynak</a>).</p>
<p>Sonuç basit: yoğun saatlerde taksi arayan kişi sayısı taksi sayısından çok daha fazla.</p>
{widget}
<h2>Şoförler yolcu seçiyor</h2>
<p>İstanbul taksileri hakkındaki en yaygın şikâyet fiyat değil, şoförlerin yolcu ve güzergâh seçmesi. 2023'ün ilk altı ayında belediyeye taksilerle ilgili <strong>33.878 şikâyet</strong> geldi. Bunların yarısından fazlası, <strong>18.079</strong> tanesi, yolcu veya güzergâh seçmekle ilgiliydi. Diğerleri fazla ücret alma (3.026), uzun yoldan gitme (1.386), kısa mesafeyi reddetme (1.290) ve taksimetreyi açmama (712) (<a href="${SRC.complaints}" target="_blank" rel="noopener">kaynak</a>).</p>
<p>Bavuluyla gelen ve Türkçe bilmeyen bir turist için İstanbul'daki ilk saati stresli yapan da tam olarak bu.</p>
<h2>En zor olduğu yerler</h2>
<ul>
<li><strong>Gece inen uçuşlardan sonra havalimanında:</strong> taksi durağında uzun kuyruk; aileler ve gruplar çoğu zaman tek sarı taksiye sığmıyor.</li>
<li><strong>Yoğun saatte ve yağmurda:</strong> taksiler dolu ya da şoförler trafiğe girmek istemiyor.</li>
<li><strong>Kısa mesafeler ve Anadolu yakası:</strong> bazı şoförler kârlı bulmadığı yolculukları veya köprü geçişini reddediyor.</li>
</ul>
<h2>Kolay yol: inmeden önce rezervasyon yapın</h2>
<p>Önceden rezervasyonlu transfer bunların hepsini çözer. {brand} ile aracınızı seçer, sabit fiyatı yolculuktan önce görürsünüz. Şoförünüz uçuşunuzu takip eder ve geliş salonunda adınızın yazılı olduğu tabelayla bekler: kuyruk yok, pazarlık yok, taksimetre yok. Aynı fiyatı yolculuk sonunda şoföre nakit ödersiniz.</p>
<p>Rezervasyon yaklaşık bir dakika sürer; üyelik ve ön ödeme yoktur. Önce talebinizi aldığımızı, araç atandığında da onayı e-postayla bildiririz.</p>
{widget}`
    }
  },
  {
    id: "taxi-vs-transfer",
    date: "2026-10-26",
    en: {
      slug: "istanbul-airport-taxi-or-pre-booked-transfer",
      title: "Istanbul Airport: Taxi Rank or Pre-Booked Transfer?",
      desc: "Taking a taxi from the rank at Istanbul Airport or Sabiha Gökçen, or booking a private transfer before you fly: price, waiting, luggage and safety compared.",
      lead: "You land at Istanbul Airport or Sabiha Gökçen and need to get to your hotel. You can join the taxi queue, or have a driver already waiting for you. Here is how the two compare.",
      body: `<h2>Price: meter or fixed</h2>
<p>A street taxi runs on the meter, so the price depends on traffic and the route the driver takes. Overcharging and longer routes are among the most common complaints the municipality receives about Istanbul taxis (<a href="${SRC.complaints}" target="_blank" rel="noopener">source</a>). A pre-booked transfer has a fixed price per car that you know before you travel. Tolls and parking are included.</p>
{widget}
<h2>Waiting: queue or name sign</h2>
<p>At the taxi rank you wait in line, sometimes for a long time after several flights land together. With a transfer your driver tracks your flight and waits in the arrivals hall with your name sign. With {brand} the first 60 minutes after landing are free, so a long passport queue or a late bag costs nothing extra.</p>
<h2>Luggage and groups</h2>
<p>A yellow taxi takes up to four passengers and limited luggage. With a transfer you choose the car that fits: a sedan for up to 3, a minivan for up to 7, a Mercedes V-Class for up to 6 or a minibus for up to 16. One price per car, not per person.</p>
<h2>Language and safety</h2>
<p>You do not need to explain your hotel address in Turkish: it is already in your booking. You travel with a professional driver who knows where you are going, and you pay the agreed price at the end.</p>
<h2>When a taxi still makes sense</h2>
<p>If you land at a quiet time, travel light and alone, and your hotel is close, a taxi from the rank can be fine. For families, groups, late arrivals and anyone who wants to know the price in advance, booking ahead is simpler.</p>
{widget}`
    },
    tr: {
      slug: "havalimaninda-taksi-mi-transfer-mi",
      title: "Havalimanında Taksi mi, Önceden Rezervasyonlu Transfer mi?",
      desc: "İstanbul Havalimanı veya Sabiha Gökçen'de duraktan taksi mi, uçmadan önce ayrılan özel transfer mi? Fiyat, bekleme, bagaj ve güvenlik karşılaştırması.",
      lead: "İstanbul Havalimanı'na veya Sabiha Gökçen'e indiniz ve otelinize gitmeniz gerekiyor. Taksi kuyruğuna girebilir ya da sizi zaten bekleyen bir şoförle yola çıkabilirsiniz. İkisinin karşılaştırması:",
      body: `<h2>Fiyat: taksimetre mi, sabit fiyat mı</h2>
<p>Sarı taksi taksimetreyle çalışır; fiyat trafiğe ve şoförün seçtiği yola göre değişir. Fazla ücret ve uzun yoldan gitme, belediyeye gelen en yaygın taksi şikâyetleri arasında (<a href="${SRC.complaints}" target="_blank" rel="noopener">kaynak</a>). Önceden ayrılan transferde araç başı sabit fiyatı yolculuktan önce bilirsiniz. Köprü, otoyol ve otopark dahildir.</p>
{widget}
<h2>Bekleme: kuyruk mu, isim tabelası mı</h2>
<p>Taksi durağında sıra beklersiniz; birkaç uçak aynı anda indiğinde bu uzun sürebilir. Transferde şoförünüz uçuşunuzu takip eder ve geliş salonunda adınızın yazılı olduğu tabelayla bekler. {brand} ile inişten sonraki ilk 60 dakika ücretsizdir; uzun pasaport kuyruğu ya da geç gelen bavul ek ücret getirmez.</p>
<h2>Bagaj ve grup</h2>
<p>Sarı taksi en fazla dört yolcu ve sınırlı bagaj alır. Transferde size uygun aracı seçersiniz: 3 kişiye kadar sedan, 7 kişiye kadar minivan, 6 kişiye kadar Mercedes V-Class veya 16 kişiye kadar minibüs. Fiyat kişi başı değil, araç başıdır.</p>
<h2>Dil ve güvenlik</h2>
<p>Otel adresinizi şoföre anlatmanız gerekmez, rezervasyonunuzda yazılıdır. Gideceğiniz yeri bilen profesyonel bir şoförle yolculuk eder, anlaşılan fiyatı yolculuk sonunda ödersiniz.</p>
<h2>Taksi ne zaman yeterli?</h2>
<p>Sakin bir saatte, tek başınıza ve az bagajla iniyorsanız ve oteliniz yakınsa duraktan taksi işinizi görebilir. Aileler, gruplar, gece inenler ve fiyatı önceden bilmek isteyenler için önceden rezervasyon daha kolaydır.</p>
{widget}`
    }
  },
  {
    id: "how-to-book",
    date: "2026-10-26",
    en: {
      slug: "how-to-book-istanbul-airport-transfer",
      title: "How to Book Your Istanbul Airport Transfer in a Minute",
      desc: "Book your Istanbul airport transfer with ITB Transfer in about a minute: no account, no prepayment. What happens after you send the form, step by step.",
      lead: "Booking a transfer with {brand} is faster than waiting at the taxi rank. It takes about a minute, needs no account and no payment up front. Here is exactly what happens.",
      body: `<h2>1. Choose your route and time</h2>
<p>In the booking box, pick where you start (Istanbul Airport, Sabiha Gökçen or a district) and where you go, then the date, the pickup time and the number of passengers. For an airport pickup, use your landing time. You can add the return transfer at 10% off.</p>
{widget}
<h2>2. Pick your car and see the fixed price</h2>
<p>You see all four cars with the price per car: sedan, minivan, Mercedes V-Class and minibus. Cars that are too small for your group are greyed out. The price you see is the price you pay.</p>
<h2>3. Enter your details</h2>
<p>Your name, mobile number with country code, e-mail and flight number, so we can track your flight. For a hotel pickup or drop-off, add the address. You can add child seats and a note for the driver.</p>
<h2>4. Send the request</h2>
<p>Check the summary and send it. You immediately get an e-mail that we received your request. Once we assign your car, usually within an hour, you get the confirmation e-mail with your meeting point.</p>
<h2>5. Meet your driver and pay in cash</h2>
<p>Your driver waits in the arrivals hall with your name sign. At the end of the ride you pay the fixed price in cash, in euro, US dollar or Turkish lira. Free cancellation up to 24 hours before pickup.</p>
{widget}`
    },
    tr: {
      slug: "havalimani-transfer-rezervasyonu-nasil-yapilir",
      title: "İstanbul Havalimanı Transferi Bir Dakikada Nasıl Ayrılır?",
      desc: "ITB Transfer ile İstanbul havalimanı transferinizi yaklaşık bir dakikada ayırın: üyelik ve ön ödeme yok. Formu gönderdikten sonra neler olur, adım adım.",
      lead: "{brand} ile transfer ayırmak taksi durağında beklemekten daha hızlıdır. Yaklaşık bir dakika sürer, üyelik ve ön ödeme gerekmez. Adım adım neler olduğu:",
      body: `<h2>1. Güzergâh ve saati seçin</h2>
<p>Rezervasyon kutusunda nereden (İstanbul Havalimanı, Sabiha Gökçen veya bir semt) ve nereye gideceğinizi, tarihi, alış saatini ve yolcu sayısını seçin. Havalimanından alışta iniş saatinizi yazın. Dönüş transferini %10 indirimle ekleyebilirsiniz.</p>
{widget}
<h2>2. Aracınızı seçin, sabit fiyatı görün</h2>
<p>Dört aracı araç başı fiyatıyla görürsünüz: sedan, minivan, Mercedes V-Class ve minibüs. Grubunuza küçük gelen araçlar soluk görünür. Gördüğünüz fiyat ödeyeceğiniz fiyattır.</p>
<h2>3. Bilgilerinizi girin</h2>
<p>Ad soyad, ülke koduyla cep telefonu, e-posta ve uçuşunuzu takip edebilmemiz için uçuş numarası. Otelden alış veya otele bırakış varsa adresi yazın. Çocuk koltuğu ve şoföre not ekleyebilirsiniz.</p>
<h2>4. Talebi gönderin</h2>
<p>Özeti kontrol edip gönderin. Talebinizi aldığımızı hemen e-postayla bildiririz. Aracınız atandığında, genellikle bir saat içinde, buluşma noktasıyla birlikte onay e-postası gelir.</p>
<h2>5. Şoförünüzle buluşun, nakit ödeyin</h2>
<p>Şoförünüz geliş salonunda adınızın yazılı olduğu tabelayla bekler. Yolculuk sonunda sabit fiyatı nakit ödersiniz: euro, ABD doları veya Türk lirası. Alış saatinden 24 saat öncesine kadar iptal ücretsizdir.</p>
{widget}`
    }
  }
];
