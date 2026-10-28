// Turkish: page texts (same keys as the English block in i18n.js), blog posts, legal texts, and the Turkish
// texts of the other page groups (Galataport, company, districts, places, services, zone and car names),
// which build.js puts into their modules.
const SRC = require("../blog-src");
const P = require("../../data/pricing.json");
const Q = require("../../public/assets/quote.js");
const G = require("../blog-guides");
const site = require("../../data/site.json");
const E = G.E, K = G.K;
const gp = (a, b) => Q.base(P, a, b, "sedan");
const GK = { ist: P.dist.IST.galataport, saw: P.dist.SAW.galataport };
const B = {
  shortage: "istanbulda-taksi-bulmak-neden-zor",
  versus: "istanbul-havalimani-taksi-mi-transfer-mi",
  howto: "istanbul-havalimani-transferi-nasil-rezerve-edilir"
};

const ui = {
  htmlLang: "tr",
  paths: {
    home: "/tr", book: "/tr/rezervasyon", prices: "/tr/fiyatlar", terms: "/tr/kosullar", privacy: "/tr/gizlilik",
    IST: "/tr/istanbul-havalimani-taksi", SAW: "/tr/sabiha-gokcen-taksi",
    route: (a, z) => a === "IST" ? `/tr/istanbul-havalimani-taksi-${z}` : `/tr/sabiha-gokcen-taksi-${z}`,
    airportPair: "/tr/istanbul-havalimani-sabiha-gokcen-taksi", blog: "/tr/blog"
  },
  assure: [["price", "Sabit fiyat", "Taksimetre yok, sürpriz yok"], ["cancel", "Ücretsiz iptal", "Alıştan 24 saat öncesine kadar"], ["clock", "7/24 hizmet", "Her uçuşa, gece gündüz"], ["shield", "Güvenli yolculuk", "Profesyonel şoförler, sigortalı araçlar"]],
  nav: { prices: "Fiyatlar", fleet: "Araçlar", how: "Nasıl çalışır", faq: "SSS", blog: "Blog", book: "Rezervasyon" },
  ui: { route: "Güzergah", from: "", min: "dk", terms: "Koşullar", privacy: "Gizlilik" },
  blog: { title: "İstanbul Transfer Blogu · Yolcular İçin Taksi İpuçları", desc: "İstanbul'da ulaşım için pratik rehberler: taksi neden zor bulunur, havalimanında taksi mi transfer mi, transferinizi bir dakikada nasıl ayırtırsınız.", h1: "İstanbul transfer blogu", lead: "İstanbul'a varışınız ve otelinize stressiz ulaşmanız için pratik rehberler.", read: "Devamını oku", latest: "Blogdan", more: "Diğer yazılar", updated: "Güncelleme", widgetH: "Transferinizi şimdi ayırtın" },
  form: {
    title: "Sabit fiyatınızı görün", from: "Nereden", to: "Nereye", date: "Tarih", time: "Alış saati", pax: "Yolcu",
    ret: "Dönüş ekle (%10 indirim)", rdate: "Dönüş tarihi", rtime: "Dönüş alış saati", submit: "Fiyatları gör",
    airports: "Havalimanları", districts: "İstanbul", port: "Kruvaziyer limanı", choose: "Seçin…", swap: "Değiştir"
  },
  home: {
    title: "İstanbul Havalimanı Taksi ve Transfer €{min}'dan · {brand}",
    desc: "{brand} bir İstanbul transfer firmasıdır: İstanbul Havalimanı ve Sabiha Gökçen'den araç başı €{min}'dan başlayan sabit fiyatlı özel transfer. Ödeme şoföre nakit.",
    h1: "İstanbul havalimanı taksi ve transfer, <em>sabit fiyatla</em>",
    lead: "{brand} bir İstanbul transfer firmasıdır. Sizi İstanbul Havalimanı (IST) veya Sabiha Gökçen'den (SAW) otelinize özel araçla, araç başı €{min}'dan başlayan fiyatlarla götürürüz. Şoförünüz isminizin yazılı olduğu tabelayla bekler, ödemeyi yolculuk sonunda nakit yaparsınız.",
    fleetH: "Aracınızı seçin", fleetLead: "Fiyat kişi başı değil, araç başıdır. Köprü-otoyol, otopark ve bekleme süresi dahildir.",
    routesH: "İstanbul'da popüler transfer güzergahları", routesLead: "Araç başı sabit fiyatlar, tek yön. IST'de 15:00–19:00, SAW'da 14:45–21:00 arası alışlar %30 daha pahalıdır.",
    vsH: "Taksimetreli taksi mi, bizim havalimanı transferimiz mi?",
    vs: [["Fiyat", "Trafiğe ve şoförün seçtiği yola göre değişir", "Rezervasyonda sabitlenir"], ["Geliş salonunda", "Taksi kuyruğu", "Şoför isim tabelanızla bekler"], ["Uçuş rötarı", "-", "Uçuşunuzu takip ederiz, 60 dk ücretsiz bekleme"], ["Bagaj ve gruplar", "Küçük sarı taksi", "16 kişiye kadar sedan, minivan, V-Class veya minibüs"], ["Ödeme", "Taksimetre, çoğu zaman sadece nakit", "Şoföre nakit, EUR, USD veya TL"]],
    vsCols: ["", "Sarı taksi", "{brand}"],
    howH: "Nasıl çalışır",
    how: [["Talep", "Güzergah, araç ve saati seçin. Bir dakika sürer, ön ödeme gerekmez."], ["Onay", "Müsaitliği kontrol eder, genellikle bir saat içinde onay e-postası göndeririz."], ["Yolculuk", "Şoförünüz sizi isim tabelasıyla karşılar. Sabit fiyatı yolculuk sonunda nakit ödersiniz."]],
    meetH: "Şoförünüz nerede bekler",
    ctaH: "Yakında İstanbul'a mı iniyorsunuz?", ctaP: "Havalimanı transferinizi şimdi talep edin, onayınızı e-postayla alın.",
    faqH: "Sıkça sorulan sorular"
  },
  faq: [
    ["İstanbul'da taksi bulmak zor mu?", `Çoğu zaman evet. İstanbul'da 1.000 kişiye yaklaşık bir taksi düşüyor ve bu sayı 1990'lardan beri neredeyse hiç artmadı. Belediyeye en sık gelen şikayet de şoförlerin yolcu ve güzergah seçmesi. Havalimanı kuyrukları, iş çıkış saatleri ve yağmur durumu daha da zorlaştırıyor. <a href="/tr/blog/${B.shortage}">Nedenini okuyun</a>.`],
    ["Neden gelmeden önce rezervasyon yapmalıyım?", `Çünkü aracınız sizi zaten bekliyor olur. Şoförünüz uçuşunuzu takip eder ve geliş salonunda isim tabelanızla durur: taksi kuyruğu yok, otel adresini tarif etmek yok, taksimetre ve pazarlık yok. Fiyatı uçmadan önce bilirsiniz. <a href="/tr/blog/${B.versus}">Taksi ve transfer karşılaştırması</a>.`],
    ["{brand} ile rezervasyon ne kadar sürer?", `Yaklaşık bir dakika. Güzergah, araç ve saati seçin, adınızı, telefonunuzu, e-postanızı ve uçuş numaranızı girip gönderin. Üyelik ve ön ödeme yok. Onay e-postası genellikle bir saat içinde gelir. <a href="/tr/blog/${B.howto}">Adımları görün</a>.`],
    ["Bu normal bir İstanbul taksisi mi?", "Hayır. {brand} lisanslı bir transfer firmasıdır: önceden sabit fiyatla ayırttığınız, profesyonel şoförlü özel bir araçla yolculuk edersiniz. Birçok yolcu buna havalimanı taksisi der; sarı taksiden farkı taksimetre olmaması ve şoförün sizi terminalin içinde karşılamasıdır."],
    ["Nasıl ödeme yaparım?", "Yolculuk sonunda şoföre nakit olarak, euro, ABD doları veya Türk lirası ile ödersiniz. Online ödeme ve kapora yoktur."],
    ["Rezervasyonum ne zaman onaylanır?", "Formu gönderdiğiniz anda talebinizi aldığımızı e-postayla bildiririz. Araç atandığında, genellikle bir saat içinde, onay e-postası göndeririz."],
    ["Uçuşum gecikirse ne olur?", "Uçuşunuzu takip eder, alış saatini ayarlarız. İnişten sonraki ilk 60 dakika ücretsizdir."],
    ["Fiyat kişi başı mı?", "Hayır, araç başıdır. Sedan en fazla 3, minivan 7, V-Class 6 ve minibüs 16 yolcu alır."],
    ["İptal edebilir miyim?", "Evet, alıştan 24 saat öncesine kadar ücretsiz. Onay e-postasını yanıtlamanız veya WhatsApp'tan yazmanız yeterli."]
  ],
  route: {
    title: "{from} – {to} Taksi · Araç Başı Sabit €{price}",
    desc: "{from} – {to} özel taksi: araç başı €{price}'dan sabit fiyat, {km} km, yaklaşık {min} dk. İsim tabelası, uçuş takibi, şoföre nakit ödeme.",
    h1: "{from} – {to} taksi",
    answer: "{fromLong} – {toLong} özel taksi, 3 yolcuya kadar sedan ile araç başı sabit <strong>€{price}</strong> tutar. {km} km'lik yol, yoğun saatler dışında yaklaşık {min} dakika sürer. Köprü-otoyol ve otopark dahildir, şoföre nakit ödersiniz.",
    answerNoDist: "{fromLong} – {toLong} özel taksi, 3 yolcuya kadar sedan ile araç başı sabit <strong>€{price}</strong> tutar. Köprü-otoyol ve otopark dahildir, şoföre nakit ödersiniz.",
    pricesH: "{from} – {to} fiyatları", car: "Araç", seats: "Yolcu", bags: "Bavul", price: "Araç başı fiyat",
    areaH: "Bu fiyata dahil bölgeler", meetH: "Şoförünüz nerede bekler",
    faq: [
      ["{from} – {to} taksi ne kadar?", "Bizimle sedan araç başı sabit €{price}, 7 kişilik minivan €{van}, Mercedes V-Class €{vclass} ve 16 kişilik minibüs €{bus}."],
      ["Yolculuk ne kadar sürer?", "{km} km, yoğun saatler dışında yaklaşık {min} dakika. Hafta içi akşamları daha uzun sürebilir; fiyat değişmez."],
      ["Uçuşum gecikirse fazla öder miyim?", "Hayır. Uçuşunuzu takip ederiz, inişten sonraki ilk 60 dakika ücretsizdir."]
    ],
    faqNoDist: 1,
    otherH: "{from} çıkışlı diğer güzergahlar", back: "Tüm {from} taksi fiyatları"
  },
  hub: {
    title: "{from} Taksi · Her Semte Sabit Fiyat",
    desc: "{from} çıkışlı sabit fiyatlı özel taksi: Sultanahmet, Taksim, Kadıköy ve tüm merkezi semtlere araç başı €{price}'dan. İsim tabelası ve uçuş takibi.",
    h1: "{from} taksi fiyatları",
    lead: "{fromLong} çıkışlı, İstanbul'un merkezi semtlerine araç başı sabit fiyatlar. Dört aracın fiyatını görmek için varış noktanızı seçin."
  },
  prices: { title: "İstanbul Havalimanı Taksi Fiyatları · {brand}", desc: "İstanbul Havalimanı ve Sabiha Gökçen çıkışlı tüm sabit havalimanı taksi fiyatları, araç başı: sedan, minivan, V-Class ve minibüs.", h1: "Havalimanı taksi fiyatları", to: "Nereye" },
  book: {
    title: "Havalimanı transferinizi ayırtın · {brand}", h1: "Havalimanı transferinizi ayırtın",
    steps: ["Araç", "Bilgiler", "Onay"],
    noRoute: "Fiyatları görmek için nereden ve nereye gideceğinizi seçin.",
    noPrice: "Bu güzergah için henüz sabit fiyatımız yok. Fiyat için WhatsApp'tan yazın.",
    tooMany: "Bu araç için yolcu sayısı fazla",
    choose: "Seç", perCar: "araç başı", oneWay: "tek yön", withReturn: "dönüş dahil",
    name: "Ad soyad", email: "E-posta", phone: "Cep telefonu (ülke koduyla)", flight: "Uçuş numarası",
    flightHelp: "Uçuşunuzu takip edebilmemiz için", pickup: "Otel veya alış adresi", dropoff: "Otel veya varış adresi",
    bags: "Bavul", seats: "Çocuk koltuğu (adet €{seat})", note: "Şoföre not (isteğe bağlı)",
    retFlight: "Dönüş uçuş numarası (isteğe bağlı)", retPickup: "Dönüş alış adresi",
    next: "Devam", back: "Geri", send: "Rezervasyon talebini gönder",
    terms: "<a href=\"/tr/kosullar\" target=\"_blank\">Koşulları</a> ve <a href=\"/tr/gizlilik\" target=\"_blank\">gizlilik bildirimini</a> kabul ediyorum.",
    review: "Rezervasyonunuzu kontrol edin", total: "Toplam", pay: "Ödeme: yolculuk sonunda şoföre nakit (EUR, USD veya TL).",
    peak: "Yoğun saat farkı dahil", seatsLine: "Çocuk koltuğu",
    required: "Lütfen bu alanı doldurun", invalidEmail: "Lütfen e-posta adresinizi kontrol edin", invalidPhone: "Lütfen telefon numaranızı kontrol edin", accept: "Lütfen koşulları kabul edin",
    doneH: "Talebiniz alındı", doneP: "Teşekkürler! Rezervasyon numaranız <strong>{ref}</strong>. Ayrıntıları {email} adresine gönderdik, rezervasyonunuzu kısa süre içinde e-postayla onaylayacağız. Onayımızı alana kadar rezervasyon kesinleşmiş değildir.",
    error: "Talebinizi gönderemedik. Lütfen tekrar deneyin veya WhatsApp'tan yazın.",
    whatsapp: "WhatsApp'tan sorun"
  },
  footer: { rights: "Tüm hakları saklıdır.", tursab: "TÜRSAB belge no", contact: "İletişim", legal: "Yasal", routes: "Popüler güzergahlar" },
  notFound: { title: "Sayfa bulunamadı", p: "Bu sayfa mevcut değil. Havalimanı taksi fiyatınızı aşağıda bulabilirsiniz.", home: "Ana sayfaya git" }
};

const R = (a, z) => ui.paths.route(a, Q.zone(P, z).slug);
const GP = { hub: "/tr/galataport-taksi", ist: R("IST", "galataport"), saw: R("SAW", "galataport"), taksim: "/tr/galataport-taksi-taksim", sult: "/tr/galataport-taksi-sultanahmet" };
const placePath = s => `/tr/havalimani-taksi-${s}`;

const blog = {
  "taxi-shortage": {
    slug: B.shortage,
    title: "İstanbul'da Taksi Bulmak Neden Bu Kadar Zor?",
    desc: "İstanbul'da 1.000 kişiye yaklaşık bir taksi düşüyor ve her yıl binlerce şikayet var. Taksi neden zor bulunur ve önceden rezervasyon nasıl çözer?",
    lead: "İstanbul 16 milyonu aşan nüfusuyla dev bir şehir, ama taksi filosu 30 yılda neredeyse hiç büyümedi. Bu yüzden özellikle havalimanında, iş çıkış saatlerinde ve yağmurda taksi bulmak uzun sürebiliyor.",
    body: `<h2>Dev bir şehir için çok az taksi</h2>
<p>İstanbul Büyükşehir Belediyesi'nin 2021'de aktarılan verilerine göre şehirde <strong>17.395 taksi</strong> vardı; bu, 1990'lardaki sayıyla aynı. Aynı dönemde nüfus 7,5 milyondan 16 milyonun üzerine çıkarak iki katından fazla arttı. Bu da <strong>1.000 kişiye yaklaşık bir taksi</strong> demek. Karşılaştırma için New York'ta 8,4 milyon kişiye 13.587 taksi var (<a href="${SRC.density}" target="_blank" rel="noopener">kaynak</a>).</p>
<p>Sonuç basit: yoğun saatlerde taksi arayan insan sayısı taksi sayısından çok daha fazla.</p>
{widget}
<h2>Şoförler yolcu seçiyor</h2>
<p>İstanbul taksileriyle ilgili en yaygın şikayet fiyat değil, şoförlerin yolcu ve güzergah seçmesi. 2023'ün ilk altı ayında belediyeye taksilerle ilgili <strong>33.878 şikayet</strong> geldi. Bunların yarısından fazlası, <strong>18.079</strong>'u, şoförlerin yolcu veya varış noktası seçmesiyle ilgiliydi. Diğerleri fazla ücret (3.026), uzun yol (1.386), kısa mesafe reddi (1.290) ve taksimetreyi açmama (712) üzerineydi (<a href="${SRC.complaints}" target="_blank" rel="noopener">kaynak</a>).</p>
<p>Bavullu ve Türkçe bilmeyen bir ziyaretçi için İstanbul'daki ilk saati stresli yapan da tam olarak bu.</p>
<h2>En zor olduğu yerler</h2>
<ul>
<li><strong>Geç bir uçuştan sonra havalimanında:</strong> taksi kuyrukları uzun, aileler ve gruplar çoğu zaman tek bir sarı taksiye sığmıyor.</li>
<li><strong>İş çıkış saatinde ve yağmurda:</strong> taksiler dolu ya da şoförler trafiğe girmek istemiyor.</li>
<li><strong>Kısa mesafeler ve Anadolu Yakası:</strong> bazı şoförler kârlı bulmadıkları yolculukları ya da Boğaz geçişini reddediyor.</li>
</ul>
<h2>Kolay yolu: inmeden önce ayırtın</h2>
<p>Önceden ayırtılan bir transfer bunların hepsini çözer. {brand} ile aracınızı seçer, sabit fiyatı yola çıkmadan önce görürsünüz. Şoförünüz uçuşunuzu takip eder ve geliş salonunda isim tabelanızla bekler: kuyruk, pazarlık ve taksimetre yok. Aynı fiyatı yolculuk sonunda nakit ödersiniz.</p>
<p>Rezervasyon yaklaşık bir dakika sürer, üyelik ve ön ödeme yoktur. Önce talebinizi aldığımıza dair bir e-posta, aracınız atandığında da onay e-postası alırsınız.</p>
{widget}`
  },
  "taxi-vs-transfer": {
    slug: B.versus,
    title: "İstanbul Havalimanı: Taksi Durağı mı, Önceden Ayırtılan Transfer mi?",
    desc: "İstanbul Havalimanı veya Sabiha Gökçen'de taksi durağı mı, önceden ayırtılan özel transfer mi? Fiyat, bekleme, bagaj ve güvenlik karşılaştırması.",
    lead: "İstanbul Havalimanı'na ya da Sabiha Gökçen'e indiniz ve otelinize gitmeniz gerekiyor. Taksi kuyruğuna girebilir ya da sizi bekleyen bir şoförle yola çıkabilirsiniz. İkisinin karşılaştırması şöyle.",
    body: `<h2>Fiyat: taksimetre mi, sabit fiyat mı</h2>
<p>Sarı taksi taksimetreyle çalışır, yani fiyat trafiğe ve şoförün seçtiği yola bağlıdır. Fazla ücret ve uzun yol, İstanbul taksileriyle ilgili en sık şikayetler arasında (<a href="${SRC.complaints}" target="_blank" rel="noopener">kaynak</a>). Önceden ayırtılan transferin araç başı sabit bir fiyatı vardır ve bunu yola çıkmadan bilirsiniz. Köprü-otoyol ve otopark dahildir.</p>
{widget}
<h2>Bekleme: kuyruk mu, isim tabelası mı</h2>
<p>Taksi durağında, özellikle aynı anda birkaç uçak indiğinde, uzun süre kuyrukta beklersiniz. Transferde şoförünüz uçuşunuzu takip eder ve geliş salonunda isim tabelanızla bekler. {brand} ile inişten sonraki ilk 60 dakika ücretsizdir; uzun pasaport kuyruğu ya da geciken bavul ek ücrete yol açmaz.</p>
<h2>Bagaj ve gruplar</h2>
<p>Sarı taksi en fazla dört yolcu ve az bagaj alır. Transferde grubunuza uygun aracı seçersiniz: 3 kişiye kadar sedan, 7 kişiye kadar minivan, 6 kişiye kadar Mercedes V-Class veya 16 kişiye kadar minibüs. Fiyat kişi başı değil, araç başıdır.</p>
<h2>Dil ve güvenlik</h2>
<p>Otel adresinizi Türkçe tarif etmeniz gerekmez; adres zaten rezervasyonunuzdadır. Yolu bilen profesyonel bir şoförle gider, sonunda anlaşılan fiyatı ödersiniz.</p>
<h2>Taksi ne zaman yeterli</h2>
<p>Sakin bir saatte iniyor, tek başınıza ve az bagajla seyahat ediyorsanız ve oteliniz yakınsa durak taksisi yeterli olabilir. Aileler, gruplar, geç varışlar ve fiyatı önceden bilmek isteyen herkes için önceden ayırtmak daha kolaydır.</p>
{widget}`
  },
  "how-to-book": {
    slug: B.howto,
    title: "İstanbul Havalimanı Transferinizi Bir Dakikada Ayırtın",
    desc: "İstanbul havalimanı transferinizi ITB Transfer ile bir dakikada, üyelik ve ön ödeme olmadan ayırtın. Sonrasında neler olduğunu adım adım anlattık.",
    lead: "{brand} ile transfer ayırtmak taksi kuyruğunda beklemekten daha hızlıdır. Yaklaşık bir dakika sürer, üyelik ve ön ödeme gerekmez. İşte adım adım nasıl işlediği.",
    body: `<h2>1. Güzergah ve saati seçin</h2>
<p>Rezervasyon kutusunda başlangıç noktanızı (İstanbul Havalimanı, Sabiha Gökçen veya bir semt) ve varış noktanızı seçin, ardından tarih, alış saati ve yolcu sayısını girin. Havalimanından alışta iniş saatinizi yazın. Dönüş transferini %10 indirimle ekleyebilirsiniz.</p>
{widget}
<h2>2. Aracı seçin ve sabit fiyatı görün</h2>
<p>Dört aracı araç başı fiyatıyla görürsünüz: sedan, minivan, Mercedes V-Class ve minibüs. Grubunuza küçük gelen araçlar soluk görünür. Gördüğünüz fiyat, ödeyeceğiniz fiyattır.</p>
<h2>3. Bilgilerinizi girin</h2>
<p>Adınız, ülke kodlu cep telefonunuz, e-postanız ve uçuşunuzu takip edebilmemiz için uçuş numaranız. Otelden alış veya otele bırakış için adresi yazın. Çocuk koltuğu ve şoföre not ekleyebilirsiniz.</p>
<h2>4. Talebinizi gönderin</h2>
<p>Özeti kontrol edip gönderin. Talebinizi aldığımızı bildiren e-posta hemen gelir. Aracınızı atadığımızda, genellikle bir saat içinde, buluşma noktasını içeren onay e-postası gelir.</p>
<h2>5. Şoförle buluşun ve nakit ödeyin</h2>
<p>Şoförünüz geliş salonunda isim tabelanızla bekler. Yolculuk sonunda sabit fiyatı euro, ABD doları veya Türk lirası ile nakit ödersiniz. Alıştan 24 saat öncesine kadar iptal ücretsizdir.</p>
{widget}`
  },
  galataport: {
    slug: "galataport-transfer-rehberi",
    title: "Galataport Transfer Rehberi: Havalimanı, Taksim ve Sultanahmet",
    desc: `Galataport kruvaziyer limanından İstanbul Havalimanı, Sabiha Gökçen, Taksim ve Sultanahmet'e nasıl gidilir: mesafeler, €${gp("galataport", "taksim")}'dan sabit fiyatlar ve ipuçları.`,
    lead: "Galataport, İstanbul'un şehrin tam ortasında, Boğaz kıyısındaki kruvaziyer limanı. Gemiden havalimanına, Taksim'deki ya da Tarihi Yarımada'daki otelinize nasıl gidileceğini ve iniş günü nelere dikkat etmeniz gerektiğini anlattık.",
    body: `<h2>Galataport nerede?</h2>
<p>Galataport, Avrupa Yakası'nda Karaköy ile Tophane arasında, Galata Köprüsü ile Beşiktaş'ın arasında yer alır. 2021'de açıldı; kruvaziyer terminali, mağaza, kafe ve müzelerin olduğu halka açık bir sahil yolunun altında, yer altındadır. Gemiden inince terminalden geçip sokak seviyesine çıkarsınız; Tophane tramvay durağı birkaç dakika yürüme mesafesindedir.</p>
<p>Liman şehrin merkezinde olduğu için Taksim ve Sultanahmet yakındır. Havalimanları ise yakın değil: ikisi de yaklaşık 45-50 km uzaklıkta.</p>
<h2>Galataport – İstanbul Havalimanı (IST)</h2>
<p>İstanbul Havalimanı Galataport'a yaklaşık <strong>${GK.ist[0]} km</strong>, yoğun saat dışında arabayla yaklaşık <strong>${GK.ist[1]} dakika</strong>. Kruvaziyerden bavullarla inerken en kolayı önceden ayırtılan bir araçtır: 3 kişiye kadar sedan ile araç başı sabit <strong>€${gp("IST", "galataport")}</strong>, 7 kişilik minivan ile €${Q.base(P, "IST", "galataport", "minivan")}. <a href="${GP.ist}">Tüm fiyatlar</a>.</p>
<h2>Galataport – Sabiha Gökçen (SAW)</h2>
<p>Sabiha Gökçen Anadolu Yakası'nda, Boğaz köprüsü üzerinden yaklaşık <strong>${GK.saw[0]} km</strong> ve <strong>${GK.saw[1]} dakika</strong>. Transfer araç başı sabit <strong>€${gp("SAW", "galataport")}</strong>. Hafta içi öğleden sonraları köprü trafiği yoğun olduğundan ek süre ayırın. <a href="${GP.saw}">Tüm fiyatlar</a>.</p>
{widget}
<h2>Galataport – Taksim</h2>
<p>Taksim Meydanı limana yaklaşık 3 km, yokuş yukarı; arabayla 10-15 dakika. Bagajsızsanız yürüyebilir ya da Kabataş'tan füniküler kullanabilirsiniz; bavulla araba çok daha kolay. Özel transfer araç başı <strong>€${gp("galataport", "taksim")}</strong>. <a href="${GP.taksim}">Galataport – Taksim</a>.</p>
<h2>Galataport – Sultanahmet</h2>
<p>Ayasofya ve Sultanahmet Camii'nin bulunduğu Sultanahmet, Galata Köprüsü'nün karşısında yaklaşık 5 km; arabayla 15-20 dakika. T1 tramvayı Tophane'den Sultanahmet'e gider ama kalabalıktır ve büyük bavullara uygun değildir. Otel kapınıza özel transfer araç başı <strong>€${gp("galataport", "sultanahmet")}</strong>. <a href="${GP.sult}">Galataport – Sultanahmet</a>.</p>
<h2>İniş günü için ipuçları</h2>
<ul>
<li><strong>Rezervasyonda geminizin adını ve iniş saatini belirtin</strong>, şoförünüz siz çıktığınızda orada olsun.</li>
<li><strong>Havalimanı için zaman bırakın.</strong> Yolcuların çoğu sabah iner; aynı gün uçuşunuz varsa terminalden çıkış ile kalkış arasında en az üç saat bırakın.</li>
<li><strong>Bagajınıza uygun aracı seçin.</strong> Kruvaziyer yolcuları genellikle daha fazla bavulla seyahat eder: minivan 7 yolcu ve 7 bavul alır.</li>
<li><strong>Fiyat araç başı ve sabittir.</strong> Köprü-otoyol dahildir, şoföre euro, dolar veya TL ile nakit ödersiniz.</li>
</ul>
<p>Limandan tüm güzergah ve fiyatlar <a href="${GP.hub}">Galataport taksi sayfamızda</a>.</p>
{widget}`
  },
  "ist-arrival": {
    slug: "istanbul-havalimani-varis-rehberi",
    title: "İstanbul Havalimanı (IST) Varış Rehberi: Uçaktan Otele",
    desc: `İstanbul Havalimanı'na varış: pasaport kontrolü, SIM kart, para, şoförünüzün beklediği yer ve şehre ulaşım. Araç başı €${E.ist}'dan transfer.`,
    lead: "İstanbul Havalimanı (IST) dünyanın en büyük havalimanlarından biri ve kapıdan çıkışa kadar yol uzun olabilir. İnişten sonra neler olduğunu ve otelinize nasıl gideceğinizi adım adım anlattık.",
    body: `<h2>1. Pasaport kontrolü ve bagaj</h2>
<p>Dış hatlar geliş tabelalarını takip ederek pasaport kontrolüne gidin. Yabancı yolcular uçmadan önce vize gerekip gerekmediğini kontrol etmeli. Pasaport kontrolünden sonra bagaj alımı, gümrük ve geliş salonu gelir. Yoğun saatlerde bu 45 dakika veya daha uzun sürebilir; bu yüzden uçuşunuzu takip eder, inişten sonra <strong>${E.wait} dakika ücretsiz bekleme</strong> veririz.</p>
<h2>2. SIM kart ve para</h2>
<p>Geliş salonunda GSM operatörlerinin mağazaları var; pasaportla turist hattı alabilir ya da yola çıkmadan eSIM kurabilirsiniz. ATM'ler ve döviz büroları da orada; şehirde kur genellikle daha iyidir, bu yüzden sadece ilk gün için gerekeni bozdurun.</p>
{widget}
<h2>3. Şoförünüz nerede bekler</h2>
<p>${site.meet.IST.tr} Şoförünüzde uçuş numaranız olduğu için rötar sizin için bir şey değiştirmez.</p>
<h2>4. Şehre ulaşım</h2>
<ul>
<li><strong>Özel transfer:</strong> araç sizi bekler, fiyat sabittir, doğrudan otelinize gidersiniz. Taksim yaklaşık ${K.istTaksim[0]} km (${K.istTaksim[1]} dakika), Sultanahmet yaklaşık ${K.istSult[0]} km. Bizimle: <a href="${R("IST", "taksim")}">Taksim €${E.taksim}</a>, <a href="${R("IST", "sultanahmet")}">Sultanahmet €${E.sult}</a> araç başı.</li>
<li><strong>Metro:</strong> M11 hattı Gayrettepe'ye gider, Taksim için orada M2'ye aktarma yaparsınız. Ucuz ama aktarmalı ve merdivenli.</li>
<li><strong>Havaist otobüsü:</strong> Taksim, Sultanahmet ve diğer semtlere sefer yapar; duraktan otele yürümeniz gerekir.</li>
<li><strong>Taksi durağı:</strong> rezervasyon gerekmez ama çoğu zaman kuyruk vardır ve taksimetre trafikte işlemeye devam eder.</li>
</ul>
<p>Havalimanı çıkışlı tüm fiyatlar <a href="${ui.paths.IST}">İstanbul Havalimanı taksi sayfamızda</a>.</p>
{widget}`
  },
  "saw-arrival": {
    slug: "sabiha-gokcen-havalimani-varis-rehberi",
    title: "Sabiha Gökçen Havalimanı (SAW) Varış Rehberi",
    desc: `Sabiha Gökçen'e varış: şoförünüzün beklediği yer, metro ve otobüsler, Anadolu Yakası'ndan hangi oteller daha yakın. Araç başı €${E.saw}'dan transfer.`,
    lead: "Sabiha Gökçen (SAW), İstanbul'un Anadolu Yakası'ndaki ikinci havalimanı. Düşük maliyetli uçuşların ana üssü ve Kadıköy ile Üsküdar'a Tarihi Yarımada'dan daha yakın. İnince sizi bekleyenler şunlar.",
    body: `<h2>Sabiha Gökçen nerede?</h2>
<p>Havalimanı Anadolu Yakası'nda, Pendik'te. Taksim, Boğaz köprülerinden biri üzerinden yaklaşık ${K.sawTaksim[0]} km (yoğun saat dışında ${K.sawTaksim[1]} dakika), Kadıköy ise yaklaşık ${K.sawKadikoy[0]} km. Oteliniz Anadolu Yakası'ndaysa bu havalimanı daha yakındır.</p>
<h2>İnişten sonra</h2>
<p>Pasaport kontrolü, bagaj alımı ve gümrükten sonra geliş salonuna çıkarsınız: turist hattı için GSM operatörü mağazaları, ATM'ler ve döviz büroları burada. Havalimanında az para bozdurun; şehirde kur genellikle daha iyidir.</p>
{widget}
<h2>Şoförünüz nerede bekler</h2>
<p>${site.meet.SAW.tr} Uçuşunuzu takip ederiz, inişten sonraki ilk ${E.wait} dakika ücretsizdir.</p>
<h2>Şehre ulaşım</h2>
<ul>
<li><strong>Özel transfer:</strong> araç başı sabit fiyat, kapınıza kadar. Bizimle: <a href="${R("SAW", "kadikoy")}">Kadıköy €${E.kadikoy}</a>, <a href="${R("SAW", "uskudar")}">Üsküdar €${E.uskudar}</a>, <a href="${R("SAW", "taksim")}">Taksim €${E.sawTaksim}</a>.</li>
<li><strong>Metro:</strong> M4 hattı havalimanından Kadıköy'e gider; oradan vapurlar Avrupa Yakası'na geçer.</li>
<li><strong>Havabüs:</strong> Taksim ve Kadıköy'e otobüsler.</li>
<li><strong>Taksi durağı:</strong> taksimetreli; yoğun saatte şoförler Boğaz'ı geçmek istemeyebilir.</li>
</ul>
<p>Akşamları köprülere giden trafik yoğun olduğu için 14:45-21:00 arası alışlar biraz daha pahalıdır. Tüm fiyatlar <a href="${ui.paths.SAW}">Sabiha Gökçen taksi sayfamızda</a>.</p>
{widget}`
  },
  "taxi-scams": {
    slug: "istanbul-taksi-dolandiriciliklari",
    title: "İstanbul'da Taksi Dolandırıcılıkları ve Korunma Yolları",
    desc: "İstanbul'da en sık görülen taksi dolandırıcılıkları: taksimetreyi açmamak, uzun yol, para değiştirme ve sahte sabit fiyat. Nasıl anlaşılır, nasıl korunulur?",
    lead: "İstanbul'daki taksi şoförlerinin çoğu dürüst, ama bazı numaralar yolcu anlatımlarında ve belediyeye gelen şikayetlerde sürekli tekrarlanıyor. Bunları bilmek ilk yolculuğunuzu çok daha rahat geçirir.",
    body: `<h2>1. "Taksimetre bozuk"</h2>
<p>Şoför taksimetreyi açmaz ve varışta genellikle taksimetre ücretinin çok üstünde bir fiyat söyler. Resmi sarı, turkuaz veya siyah taksilerde taksimetre çalışmak zorundadır. Kapalıysa yola çıkmadan açmasını isteyin ya da başka bir taksiye binin.</p>
<h2>2. Uzun yol</h2>
<p>Trafiğe giren bir dolambaç ya da gereksiz bir köprü geçişi taksimetreye kilometre ekler. Rotayı telefonunuzdaki harita uygulamasından takip edin ve gideceğiniz yeri adres ya da bilinen bir nokta olarak söyleyin.</p>
<h2>3. Para değiştirme</h2>
<p>Büyük bir banknot verirsiniz, şoför hızla küçüğüyle değiştirip eksik ödediğinizi söyler. Karanlık araçta TL banknotları birbirine benzer. Öderken paraları sesli sayın, mümkünse küçük banknotlarla ödeyin.</p>
{widget}
<h2>4. Havalimanında sahte "sabit fiyat"</h2>
<p>Geliş salonunda biri size "sabit fiyatlı taksi" önerir; sonra daha pahalıya gelir ya da lisanssız bir araca götürür. Sadece önceden kontrol ettiğiniz bir firmayla rezervasyon yapın ve kendi adınızın yazılı olduğu tabelayı arayın.</p>
<h2>5. Kısa mesafe reddi</h2>
<p>Bazı şoförler kısa yolculukları, trafiğe ya da Boğaz'ın karşısına gitmeyi reddeder. Dolandırıcılık değil ama İstanbul taksileriyle ilgili en sık şikayet bu.</p>
<h2>Stressiz yolculuk için</h2>
<ul>
<li>Yolculuk ve şoför kayıt altına alınsın diye taksi uygulaması (BiTaksi veya Uber) kullanın.</li>
<li>Taksinin plakasını not alın; şikayetler belediyenin 153 hattına yapılır.</li>
<li>Havalimanı için özel transfer ayırtın: fiyat uçmadan önce sabittir, taksimetre yoktur ve şoförünüz isminizle bekler. {brand} ile <a href="${ui.paths.IST}">İstanbul Havalimanı</a>'ndan araç başı €${E.ist}, <a href="${ui.paths.SAW}">Sabiha Gökçen</a>'den €${E.saw}'dan başlar.</li>
</ul>
{widget}`
  },
  "where-to-stay": {
    slug: "istanbulda-nerede-kalinir",
    title: "İstanbul'da Nerede Kalınır: En İyi Semtler ve Transfer",
    desc: "İstanbul'da nerede kalınır: Sultanahmet, Taksim, Karaköy, Beşiktaş, Nişantaşı veya Kadıköy. Hangi semt kime uygun ve havalimanı transferi ne kadar?",
    lead: "İstanbul çok büyük ve kaldığınız semt tüm seyahatinizi belirler. İşte ziyaretçilerin çoğunun seçtiği altı semt, hangisinin kime uygun olduğu ve havalimanı transferinin fiyatı.",
    body: `<h2>Sultanahmet: ilk kez gelenler için</h2>
<p>Tarihi Yarımada'da Ayasofya, Sultanahmet Camii ve Topkapı Sarayı kapınızın önünde. Akşamları sakin, çok sayıda küçük butik otel var. İstanbul Havalimanı'ndan: <a href="${R("IST", "sultanahmet")}">araç başı €${E.sult}</a>.</p>
<h2>Taksim ve Beyoğlu: gece hayatı ve şehir hayatı için</h2>
<p>İstiklal Caddesi, restoranlar, barlar ve şehrin en iyi ulaşım bağlantıları. Geç saatlere kadar hareketli. İstanbul Havalimanı'ndan: <a href="${R("IST", "taksim")}">€${E.taksim}</a>.</p>
<h2>Karaköy ve Galata: tasarım otelleri ve kafeler için</h2>
<p>Tarihi Yarımada ile Taksim arasında; Galata Kulesi, İstanbul Modern ve Galataport kruvaziyer terminali burada. İstanbul Havalimanı'ndan: <a href="${R("IST", "karakoy")}">€${E.karakoy}</a>.</p>
{widget}
<h2>Beşiktaş ve Ortaköy: Boğaz için</h2>
<p>Deniz kıyısında lüks oteller, Dolmabahçe Sarayı ve sahil kafeleri. Manzara harika, hafta içi akşamları trafik daha yoğun. İstanbul Havalimanı'ndan: <a href="${R("IST", "besiktas")}">€${E.besiktas}</a>.</p>
<h2>Şişli ve Nişantaşı: alışveriş ve iş için</h2>
<p>Tasarımcı mağazaları, AVM'ler ve iş otelleri; havalimanı otoyoluna yakın. İstanbul Havalimanı'ndan: <a href="${placePath("nisantasi")}">€${E.sisli}</a>.</p>
<h2>Kadıköy: Anadolu Yakası ve yerel hayat için</h2>
<p>Çarşılar, kafeler ve Moda sahili; Avrupa Yakası'na vapur bağlantısı. Sabiha Gökçen'e daha yakın: <a href="${R("SAW", "kadikoy")}">€${E.kadikoy}</a>.</p>
<h2>Hangi havalimanı daha yakın?</h2>
<p>Avrupa Yakası için genellikle İstanbul Havalimanı (IST), Anadolu Yakası için Sabiha Gökçen (SAW) daha yakındır. Tüm fiyatlar <a href="${ui.paths.prices}">fiyat listemizde</a>.</p>
{widget}`
  }
};

const legal = {
  terms: {
    title: "Kullanım ve Rezervasyon Koşulları",
    desc: "Bu siteden ayırtılan İstanbul havalimanı transferleri için rezervasyon, sabit fiyat, nakit ödeme, bekleme süresi ve ücretsiz iptal koşulları.",
    html: `<p>Bu koşullar bu siteden ayırtılan transferler için geçerlidir. Hizmeti {company} ({address}) sunar, TÜRSAB belge no {tursab}.</p>
<h2>Rezervasyon</h2><p>Rezervasyon formunu göndermek bir taleptir. Rezervasyon ancak size e-postayla onay gönderdiğimizde kesinleşir. Talebinizi kabul edemezsek bunu e-postayla bildiririz.</p>
<h2>Fiyat ve ödeme</h2><p>Rezervasyonda gösterilen fiyat araç başı sabit fiyattır; köprü-otoyol, otopark ve aşağıdaki bekleme süresi dahildir. Ödemeyi yolculuk sonunda şoföre nakit olarak, euro, ABD doları veya günün kuruyla Türk lirası ile yaparsınız.</p>
<h2>Bekleme süresi</h2><p>Havalimanlarında inişten sonraki ilk 60 dakika ücretsizdir. Diğer adreslerde şoför ayırtılan saatten sonra 15 dakika bekler.</p>
<h2>Değişiklik ve iptal</h2><p>Alıştan 24 saat öncesine kadar onay e-postasını yanıtlayarak veya WhatsApp üzerinden ücretsiz değişiklik ya da iptal yapabilirsiniz. Haber vermeden gelmemeniz halinde yolculuk ücretini talep edebiliriz.</p>
<h2>Yolcular ve bagaj</h2><p>Yolcu ve bavul sayısı ayırtılan araca uygun olmalıdır. Çocuklar için rezervasyonda ekleyebileceğiniz çocuk koltuğu gerekir.</p>
<h2>İletişim</h2><p>{email} · {phone}</p>`
  },
  privacy: {
    title: "Gizlilik ve Kişisel Verilerin Korunması",
    desc: "İstanbul havalimanı taksi rezervasyonunda verdiğiniz ad, telefon, e-posta ve uçuş bilgilerini nasıl kullandığımız ve bize nasıl ulaşabileceğiniz.",
    html: `<p>{company}, rezervasyon sırasında verdiğiniz kişisel verileri (ad, e-posta, telefon, uçuş numarası, adresler, notlar) yalnızca transferinizi düzenlemek ve gerçekleştirmek, bu konuda sizinle iletişim kurmak ve Türk mevzuatının gerektirdiği yolcu listeleri gibi yasal yükümlülükleri yerine getirmek için 6698 sayılı KVKK'ya uygun olarak işler.</p>
<p>Verileriniz yalnızca yolculuğu yapan şoför veya iş ortağıyla ve bu sitenin işletilmesi için kullandığımız hizmet sağlayıcılarla (barındırma, veritabanı, e-posta) paylaşılır. Kanunun öngördüğü süre boyunca saklanır.</p>
<p>Verilerinize erişim, düzeltme veya silme talebi için {email} adresine yazabilirsiniz.</p>`
  }
};

// The other page groups, put into their modules by build.js
const port = {
  desc: "Galataport kruvaziyer limanından {to} özel taksi: araç başı €{price}'dan sabit fiyat, {km} km, yaklaşık {min} dk. Şoför terminal çıkışında, ödeme nakit.",
  path: "/tr/galataport-taksi",
  route: z => `/tr/galataport-taksi-${z}`,
  hub: {
    title: "Galataport Taksi · Kruvaziyer Limanı Transferi €{price}'dan",
    desc: "Galataport kruvaziyer limanından İstanbul Havalimanı, Sabiha Gökçen, Taksim ve Sultanahmet'e araç başı €{price}'dan sabit fiyatlı özel taksi. Şoför terminal çıkışında.",
    h1: "Galataport kruvaziyer limanı taksi",
    lead: "Galataport kruvaziyer terminalinden iki havalimanına, Taksim'e ve Tarihi Yarımada'ya araç başı sabit fiyatlar. Şoförünüz terminal çıkışında isim tabelasıyla bekler."
  },
  meetH: "Şoförünüz Galataport'ta nerede bekler",
  meet: "Şoförünüz Galataport'ta (Tophane) kruvaziyer yolcu terminali çıkışında, isminizin yazılı olduğu tabelayla bekler. Rezervasyonda geminizin adını ve iniş saatini belirtin.",
  late: ["Gemiden iniş gecikirse ne olur?", "Geminizin varışını takip eder, alış saatini ayarlarız. Geç inişte bekleme ücretsizdir, fiyat değişmez."],
  service: "Kruvaziyer limanı taksi"
};

const company = {
  head: "Kurumsal",
  labels: { company: "Firma", sector: "Sektör", name: "Ad soyad", role: "Görev", email: "E-posta", phone: "Telefon (ülke koduyla)", volume: "Aylık transfer sayısı",
    stype: "Ben", city: "İlçe / şehir", fleet: "Araç sayısı", classes: "Araç tipleri", docs: "Belgeler", ctype: "İşletme türü", country: "Ülke / şehir",
    website: "Web sitesi veya profil", ptype: "İş birliği türü", msg: "Mesaj" },
  opts: { lt10: "10'dan az", "10to50": "10–50", gt50: "50'den fazla", company: "Bir taşımacılık firmasıyım", driver: "Kendi aracı olan şoförüm",
    sedan: "Sedan", minivan: "Minivan", vclass: "Mercedes V-Class", minibus: "Minibüs", d2: "D2 belgesi", src: "SRC", psy: "Psikoteknik belgesi", tursab: "TÜRSAB",
    agency: "Seyahat acentesi", operator: "Tur operatörü / DMC", hotel: "Otel", platform: "Online platform", other: "Diğer", guide: "Rehber", influencer: "Influencer / içerik üreticisi", blog: "Seyahat blogu veya sitesi" },
  send: "Başvuruyu gönder", ok: "Teşekkürler! Başvurunuzu aldık, bir iş günü içinde sizinle iletişime geçeceğiz.",
  err: "Başvurunuzu gönderemedik. Lütfen tekrar deneyin veya WhatsApp'tan yazın.", req: "Lütfen zorunlu alanları doldurun.", wa: "WhatsApp",
  pages: {
    corporate: { nav: "Kurumsal hesaplar", title: "İstanbul'da Kurumsal Transfer Hesabı · {brand}", desc: "Şirketinizin çalışanları ve misafirleri için İstanbul'da havalimanı ve şehir içi transferler: sabit fiyat, aylık fatura ve tek muhatap.",
      h1: "Kurumsal transfer hesabı", lead: "Çalışanlarınız, ziyaretçileriniz ve müşterileriniz için havalimanı ve şehir içi transferleri tek hesap, sabit fiyatlar ve aylık tek faturayla ayırtın.",
      points: ["Önceden anlaşılmış, araç başı sabit fiyatlar", "Araçta nakit yerine aylık fatura", "Tüm rezervasyonlar için tek muhatap, 7/24", "İsim tabelası, uçuş takibi ve belgeli şoförler"] },
    supplier: { nav: "Tedarikçi olun", title: "İstanbul'da Transfer Tedarikçisi Olun · {brand}", desc: "Taşımacılık firmaları ve kendi aracı olan şoförler: ITB Transfer'den İstanbul'da düzenli havalimanı transferi işi alın. İki dakikada başvurun.",
      h1: "Bizimle çalışın", lead: "Taşımacılık firmaları ve kendi belgeli aracı olan şoförler: İstanbul'da düzenli havalimanı ve şehir içi transfer işi.",
      points: ["IST, SAW ve Galataport'tan düzenli işler", "Transfer başı net fiyat, zamanında ödeme", "Size uygun saatlerde çalışma", "Sadece belgeli araçlar (D2) ve profesyonel şoförler"] },
    b2b: { nav: "Acenteler için B2B", title: "Acenteler İçin B2B Transfer İş Birliği · {brand}", desc: "Seyahat acenteleri, tur operatörleri, oteller ve platformlar: İstanbul havalimanı transferlerini kendi partner sayfanızdan net B2B fiyatlarla ayırtın.",
      h1: "Acenteler için B2B transfer", lead: "Seyahat acenteleri, tur operatörleri, oteller ve online platformlar: misafirleriniz için İstanbul transferlerini kendi partner sayfanızdan net fiyatlarla ayırtın.",
      points: ["Tüm güzergah ve araçlar için net B2B fiyatlar", "Rezervasyon ve faturalarınızın olduğu kendi sayfanız", "Misafirleriniz isim tabelasıyla karşılanır, 7/24", "İsterseniz ücret misafirden tahsil edilir"] },
    partner: { nav: "İş birlikleri", title: "İş Birlikleri: Oteller, Rehberler ve İçerik Üreticileri · {brand}", desc: "Oteller, rehberler, influencer'lar ve seyahat siteleri: ITB Transfer'i misafir ve okurlarınıza önerin, her rezervasyondan kazanın.",
      h1: "Birlikte çalışalım", lead: "Oteller, rehberler, influencer'lar ve seyahat siteleri: transferlerimizi misafirlerinize ve okurlarınıza önerin, her rezervasyondan kazanın.",
      points: ["Her rezervasyonda komisyon veya özel fiyat", "Adınıza özel rezervasyon linki", "Misafirlerinize WhatsApp'tan hızlı yanıt", "Misafirlerinizin güvenebileceği sabit fiyatlar"] }
  }
};

const districts = {
  T: { aboutH: "{to} hakkında", sights: "Yakında", tip: "Şoförün tavsiyesi", closer: "Havalimanlarına uzaklık", areas: "Bu fiyata dahil bölgeler", km: "{km} km, yaklaşık {min} dk" },
  Z: {
    sultanahmet: { about: "Sultanahmet, İstanbul'un Tarihi Yarımadası ve şehrin en çok ziyaret edilen bölgesi. Butik oteller Ayasofya, Sultanahmet Camii ve Topkapı Sarayı'na yürüme mesafesinde; meydanların çevresindeki birçok sokak yayalaştırılmış ya da tek yön.", sights: ["Ayasofya", "Sultanahmet Camii", "Topkapı Sarayı", "Yerebatan Sarnıcı", "Kapalıçarşı", "Mısır Çarşısı"], tip: "Bazı otel sokakları araç trafiğine kapalı. Sizinki de öyleyse şoför en yakın köşede durur ve bavullarınıza yardım eder." },
    taksim: { about: "Taksim Meydanı ve İstiklal Caddesi, oteller, restoranlar ve gece hayatıyla modern İstanbul'un kalbi. Yakındaki Cihangir ve Harbiye daha sakin; butik ve iş otelleri burada.", sights: ["Taksim Meydanı", "İstiklal Caddesi", "Galata Kulesi", "Pera Müzesi", "Atatürk Kültür Merkezi"], tip: "İstiklal Caddesi yayalara ayrılmıştır. Cadde üzerindeki oteller için şoför sizi en yakın ara sokakta bırakır." },
    karakoy: { about: "Karaköy ve Galata, Galata Kulesi'nin eteğinde, Haliç kıyısında; tasarım otelleri, kafeler ve İstanbul Modern burada. Galataport kruvaziyer terminali hemen yanında.", sights: ["Galata Kulesi", "İstanbul Modern", "Galataport", "Galata Köprüsü", "Karaköy İskelesi"], tip: "Galata'nın dik ve dar sokakları büyük araçlar için zor. Minibüsle şoför ana yolda durabilir." },
    galataport: { about: "Galataport, Tophane'de, mağazalar, restoranlar ve İstanbul Modern'in bulunduğu sahil yolu üzerindeki kruvaziyer terminali. Karaköy, Galata ve Taksim kısa bir araç yolculuğu uzaklıkta.", sights: ["İstanbul Modern", "Galata Kulesi", "Karaköy", "Dolmabahçe Sarayı", "Galata Köprüsü"], tip: "Rezervasyonda geminizi ve iniş saatinizi belirtin. Geminin varışını takip eder, terminal çıkışında bekleriz." },
    besiktas: { about: "Beşiktaş, Boğaz'ın Avrupa yakasında Dolmabahçe Sarayı'ndan Ortaköy ve Bebek'e uzanır; deniz kenarında lüks oteller vardır. İç kesimdeki Levent ve Etiler iş ve alışveriş bölgesidir.", sights: ["Dolmabahçe Sarayı", "Ortaköy Camii", "Boğaziçi Köprüsü", "Bebek Koyu", "Zorlu Center", "Kanyon"], tip: "Sahil yolu hafta içi akşamları ve stadyumda maç olan günlerde yoğundur. O saatlerde uçuşunuz varsa ek süre ayırın." },
    sisli: { about: "Şişli; Nişantaşı'nın tasarımcı caddeleri, Mecidiyeköy iş merkezi ve Maslak'ın gökdelenlerini kapsar; çok sayıda uluslararası iş oteli ve büyük AVM burada.", sights: ["Nişantaşı", "İstanbul Kongre Merkezi", "Cevahir AVM", "Maslak iş bölgesi", "Askeri Müze"], tip: "Şişli, İstanbul Havalimanı'na en yakın merkezi semtlerden biri; yoğun saat dışında en hızlı transferlerden biridir." },
    sariyer: { about: "Sarıyer, Boğaz'ın yeşil kuzey kesimi; Tarabya, Yeniköy ve Emirgan gibi sahil köyleri, balık restoranları ve sakin deniz kenarı otelleri burada.", sights: ["Emirgan Korusu", "Rumeli Hisarı", "İstinye Park", "Belgrad Ormanı", "Tarabya Koyu"], tip: "Kuzey otoyolu üzerinden Sarıyer, İstanbul Havalimanı'na şehir merkezinden daha yakındır." },
    bakirkoy: { about: "Bakırköy, Yeşilköy ve Florya, eski Atatürk Havalimanı'nın yanında, Marmara kıyısında; sahil yürüyüş yolları, marina, AVM'ler ve daha sakin oteller burada.", sights: ["Bakırköy sahili", "Yeşilköy", "Florya plajı", "İstanbul Akvaryum", "Ataköy Marina"], tip: "Sahil yolundan Tarihi Yarımada'ya mesafe kısa; Bakırköy, Sultanahmet'e yakın sakin oteller için iyi bir seçenek." },
    beylikduzu: { about: "Beylikdüzü, Esenyurt ve Avcılar, şehrin batı ucunda hızla büyüyen ilçeler; uzun konaklama daireleri, yeni oteller, büyük AVM'ler ve TÜYAP fuar merkezi burada.", sights: ["Küçükçekmece Gölü", "TÜYAP Fuar ve Kongre Merkezi", "Marmara Park", "Yakuplu sahili"], tip: "D-100 yoğun saatte yavaş olabilir. Daha hızlıysa şoför TEM otoyolunu kullanır." },
    kadikoy: { about: "Kadıköy, Moda sahili, ünlü çarşısı ve Bağdat Caddesi'nin mağazalarıyla Anadolu Yakası'nın canlı kalbi. Vapurlar Karaköy ve Eminönü'ne yaklaşık 20 dakikada geçer.", sights: ["Moda sahili", "Kadıköy çarşısı", "Bağdat Caddesi", "Haydarpaşa Garı", "Fenerbahçe"], tip: "Kadıköy için Sabiha Gökçen daha yakın havalimanıdır; oradan transfer daha kısa ve daha ucuzdur." },
    uskudar: { about: "Üsküdar, Boğaz'ın karşısından Tarihi Yarımada'ya bakar; tarihi camileri, Kız Kulesi ve Kuzguncuk, Beylerbeyi gibi sakin sahil mahalleleriyle bilinir.", sights: ["Kız Kulesi", "Beylerbeyi Sarayı", "Çamlıca Camii", "Kuzguncuk", "Mihrimah Sultan Camii"], tip: "Sabiha Gökçen'den kısa bir yolculuk. İstanbul Havalimanı'ndan güzergah Boğaz köprülerinden birinden geçer." },
    atasehir: { about: "Ataşehir ve Ümraniye, Anadolu Yakası'nın iş merkezi; İstanbul Finans Merkezi, ofis kuleleri ve modern oteller burada, güneyde Maltepe sahili var.", sights: ["İstanbul Finans Merkezi", "Watergarden", "Kozyatağı", "Maltepe sahil parkı"], tip: "Ataşehir, Sabiha Gökçen'e en yakın varış noktamız: yoğun saat dışında yaklaşık 30 dakika." }
  }
};

const places = {
  T: {
    path: placePath,
    title: "{place} Havalimanı Taksi · Araç Başı €{min}'dan",
    desc: "{place}, İstanbul'a özel havalimanı taksisi: İstanbul Havalimanı'ndan €{ist}, Sabiha Gökçen'den €{saw}, araç başı. İsim tabelası, köprü-otoyol dahil, nakit ödeme.",
    h1: "{place} havalimanı taksi",
    lead: "{place} için özel taksi, 3 yolcuya kadar sedan ile İstanbul Havalimanı'ndan araç başı sabit <strong>€{ist}</strong>, Sabiha Gökçen'den <strong>€{saw}</strong> tutar. {place}, {zone} fiyat bölgemizde; köprü-otoyol ve otopark dahildir, şoföre nakit ödersiniz.",
    pricesH: "{place} fiyatları", from: "Nereden", aboutH: "{place} hakkında", sights: "Yakında", tip: "Şoförün tavsiyesi", zone: "Aynı fiyat",
    faq: [
      ["İstanbul Havalimanı'ndan {place} taksi ne kadar?", "Sedan araç başı sabit €{ist}, 7 kişilik minivan €{van} ve Mercedes V-Class €{vclass}. Yol yaklaşık {istKm} km, yoğun saat dışında yaklaşık {istMin} dakika."],
      ["Sabiha Gökçen'den ne kadar?", "Sedan araç başı €{saw}, yaklaşık {sawKm} km ve yoğun saat dışında {sawMin} dakika."],
      ["Şoför beni otelin kapısına kadar götürür mü?", "Evet. Rezervasyonda otel adını veya adresini yazın; şoför sizi kapıya ya da aracın girebildiği en yakın noktaya götürür."]
    ],
    more: "İstanbul'da diğer semtler"
  },
  L: {
    nisantasi: { name: "Nişantaşı", about: "Nişantaşı, Abdi İpekçi Caddesi'ndeki tasarımcı mağazaları, kafeleri, galerileri ve Taksim'e yürüme mesafesindeki şık butik otelleriyle İstanbul'un en zarif alışveriş semti.", sights: ["Abdi İpekçi Caddesi", "Maçka Parkı", "Teşvikiye Camii", "City's Nişantaşı"], tip: "Sokakların çoğu dar ve tek yön; yoğun saatlerde şoför otelinizin köşesinde durabilir." },
    levent: { name: "Levent", about: "Levent, şehrin en yüksek ofis kuleleri, uluslararası iş otelleri ve Büyükdere Caddesi boyunca büyük AVM'leriyle İstanbul'un merkezi iş bölgesi.", sights: ["Kanyon", "Metrocity", "Sapphire", "Zorlu Center"], tip: "Büyükdere Caddesi mesai saatlerinde yavaştır. Sabah toplantısı için erken alış ayırtın." },
    maslak: { name: "Maslak", about: "Maslak, cam kuleler, şirket merkezleri ve iş otelleriyle İstanbul Havalimanı yönündeki otoyol üzerinde modern bir iş bölgesi.", sights: ["Maslak iş kuleleri", "İstinye Park", "Vadistanbul", "İstanbul Teknik Üniversitesi"], tip: "Maslak, kuzey otoyolu üzerinden İstanbul Havalimanı'ndan en hızlı transferlerden biridir." },
    ortakoy: { name: "Ortaköy", about: "Ortaköy, Boğaziçi Köprüsü'nün altında; sahildeki camisi, hafta sonu pazarı, kumpircileri ve deniz kenarındaki lüks otelleriyle hareketli bir Boğaz köyü.", sights: ["Ortaköy Camii", "Boğaziçi Köprüsü", "Ortaköy İskelesi", "Çırağan Sarayı"], tip: "Sahil yolu yaz akşamları ve hafta sonları yoğundur; şoför köyün üstündeki yolu kullanabilir." },
    bebek: { name: "Bebek", about: "Bebek, sahil yürüyüş yolu, kafeleri, yalıları ve deniz kenarındaki butik otelleriyle Boğaz'ın en güzel koylarından biri.", sights: ["Bebek Koyu", "Bebek Parkı", "Rumeli Hisarı", "Boğaziçi Üniversitesi"], tip: "Sahil yolunda park yeri dar. Şoför kapınızın önünde durur; çıkışta bavullarınızı hazır tutun." },
    eminonu: { name: "Eminönü", about: "Eminönü, Haliç kıyısında Tarihi Yarımada'nın hareketli sahili; Mısır Çarşısı, Yeni Cami, vapur iskeleleri ve Galata Köprüsü burada, Sultanahmet'e birkaç dakika.", sights: ["Mısır Çarşısı", "Yeni Cami", "Galata Köprüsü", "Rüstem Paşa Camii", "Sirkeci Garı"], tip: "Çarşı çevresindeki sokaklar gün içinde kalabalık ve kısmen trafiğe kapalı; şoför en yakın açık sokakta durur." },
    florya: { name: "Florya", about: "Florya, Marmara kıyısında plaj parkı, İstanbul Akvaryum ve eski Atatürk Havalimanı'na yakın sakin otelleriyle yeşil bir sahil semti.", sights: ["İstanbul Akvaryum", "Florya plaj parkı", "Florya Atatürk Deniz Köşkü", "Yeşilköy"], tip: "Florya, Avrupa Yakası'nın batısında İstanbul Havalimanı'ndan en kısa transferlerden biridir." }
  }
};

const services = {
  T: { head: "Hizmetler", whatH: "Neler dahil", howH: "Nasıl çalışır", ask: "WhatsApp'tan fiyat sorun", call: "veya arayın", cars: "Araçlar", waText: "Merhaba, şu hizmet için fiyat almak istiyorum: {service}. Tarih: , saat: , yolcu: " },
  S: {
    hourly: {
      path: "/tr/saatlik-soforlu-arac", nav: "Saatlik şoförlü araç",
      title: "İstanbul'da Saatlik Şoförlü Araç Kiralama",
      desc: "İstanbul'da saatlik veya günlük şoförlü araç: toplantılar, alışveriş, birden fazla durak. Önceden anlaşılan fiyatla sedan, minivan, V-Class veya minibüs.",
      h1: "İstanbul'da saatlik şoförlü araç",
      lead: "Birkaç saatliğine ya da tam gün profesyonel şoförlü bir araç kiralayın. Şoför duraklar arasında bekler; taksi aramadan toplantıdan toplantıya, alışverişe ya da ziyarete gidersiniz. Fiyat önceden anlaşılır ve nakit ödenir.",
      points: ["Birkaç saatten tam güne, ihtiyacınız kadar size özel araç ve şoför", "Şoför her durakta bekler; taksimetre ve yeni taksi yok", "16 kişiye kadar sedan, minivan, Mercedes V-Class veya minibüs", "Havalimanı transferiyle başlayıp bitebilir", "Saatlik veya günlük fiyat önceden anlaşılır, köprü-otoyol ve otopark dahil"],
      how: [["Planınızı anlatın", "Tarih, başlangıç saati, yaklaşık kaç saat ve nerelere gitmek istediğiniz."], ["Fiyatınızı alın", "Seçtiğiniz araç için WhatsApp'tan sabit fiyatla dönüş yaparız."], ["Yola çıkın", "Şoförünüz sizi alır ve gün boyu sizinle olur. Sonunda nakit ödersiniz."]],
      faq: [["İstanbul'da şoförlü araç saatlik ne kadar?", "Araca ve saat sayısına göre değişir. Planınızı WhatsApp'tan gönderin, köprü-otoyol ve otopark dahil sabit fiyatla dönelim."], ["Minimum süre var mı?", "Saatlik kiralama genellikle birkaç saatten başlar; tam gün saat başına daha uygundur. Planınıza göre sorun."], ["Gün içinde durakları değiştirebilir miyim?", "Evet, İstanbul içinde ve ayırttığınız saatler içinde. Şoförünüze söylemeniz yeterli."]]
    },
    tour: {
      path: "/tr/soforlu-istanbul-turu", nav: "Şoförlü şehir turu",
      title: "Özel Şoförlü İstanbul Turu · Günübirlik",
      desc: "İstanbul'u özel araç ve şoförle gezin: Tarihi Yarımada, Boğaz kıyısı, Çamlıca Tepesi ve iki kıta tek günde. Durakları siz seçin, fiyat önceden anlaşılır.",
      h1: "Özel şoförlü İstanbul turu",
      lead: "Kendi aracınız ve şoförünüzle İstanbul'un daha fazlasını bir günde görün. Tarihi Yarımada'dan Boğaz köylerine ve Anadolu Yakası'na durakları siz seçin; şoför sizi götürür ve gezerken bekler. Fiyat önceden anlaşılır ve nakit ödenir.",
      points: ["Popüler bir gün: Sultanahmet, Dolmabahçe, Ortaköy, Boğaziçi Köprüsü'nden Çamlıca Tepesi'ne ve Anadolu sahilinden dönüş", "Her durakta ne kadar kalacağınıza siz karar verirsiniz", "Aileler, yaşlı yolcular ve 16 kişiye kadar gruplar için rahat", "Şoför aracı kullanır ve bekler; belgeli rehber için bize sorun", "Otelden alış ve otele bırakış dahil"],
      how: [["Durakları seçin", "Ne görmek istediğinizi, tarihi ve kişi sayısını bize yazın."], ["Fiyatınızı alın", "Bir güzergah önerir, WhatsApp'tan sabit fiyatla dönüş yaparız."], ["Günün tadını çıkarın", "Şoförünüz sizi otelden alır. Sonunda nakit ödersiniz."]],
      faq: [["Şoför rehber mi?", "Hayır, şoför aracı kullanır ve sizi bekler. Türkiye'de belgeli rehberlik ayrı bir hizmettir; isterseniz bize sorun."], ["Şehir turu ne kadar sürer?", "Misafirlerin çoğu 6-8 saat ayırtır; bu, ziyaretlerle birlikte Boğaz'ın iki yakası için yeterlidir."], ["Giriş biletleri dahil mi?", "Hayır, fiyat araç, şoför, yakıt, köprü-otoyol ve otoparkı kapsar. Müze ve saray biletleri yerinde ödenir."]]
    },
    wedding: {
      path: "/tr/gelin-arabasi-ve-etkinlik-transferi", nav: "Düğün ve etkinlik araçları",
      title: "İstanbul'da Gelin Arabası ve Etkinlik Transferi",
      desc: "İstanbul'da düğün, etkinlik ve misafir transferi için şoförlü araçlar: Mercedes V-Class, minivan ve 16 kişilik minibüs, otelden mekana ve geri.",
      h1: "İstanbul'da gelin arabası ve etkinlik transferi",
      lead: "Gelin arabasından tüm misafirlerin servisine kadar: İstanbul'da düğün, kongre ve özel etkinliklerde hizmet veriyoruz. Mercedes V-Class, minivan ve minibüsler oteller, mekanlar ve havalimanları arasında tek plan ve önceden anlaşılan tek fiyatla çalışır.",
      points: ["Gelin-damat veya VIP misafirler için Mercedes V-Class", "Araç başı 16 misafire kadar minivan ve minibüs, aynı gün birden fazla araç", "Uçakla gelen misafirler için isim tabelalı havalimanı karşılama", "Tüm program için tek muhatap", "Önceden anlaşılan tek fiyat; şirketlere fatura"],
      how: [["Programınızı gönderin", "Tarih, mekanlar, misafir sayısı ve saatler."], ["Plan ve fiyatı alın", "Araçları planlar, WhatsApp'tan tek fiyatla dönüş yaparız."], ["Sizin gününüz", "Şoförler erken gelir ve programa uyar. Ödeme anlaşıldığı gibi."]],
      faq: [["Gelin arabası süslenebilir mi?", "İstediğinizi anlatın; basit süslemeler genellikle şoförle ayarlanabilir."], ["Kaç misafir taşıyabilirsiniz?", "Bir minibüs 16 kişi alır ve aynı anda birden fazla araç gönderebiliriz. Sayıları ve saatleri bize yazın."], ["Kongre ve kurumsal etkinliklere de hizmet veriyor musunuz?", "Evet. Düzenli şirket transferleri için kurumsal hesaplarımıza da bakın."]]
    }
  }
};

// Names in data/pricing.json and data/site.json that had no Turkish yet
const zones = {};
const cars = {
  sedan: { models: "Skoda Octavia, Toyota Corolla veya benzeri" }, minivan: { models: "Mercedes Vito, Ford Tourneo veya benzeri" },
  vclass: { models: "Mercedes-Benz V-Class VIP" }, minibus: { models: "Mercedes Sprinter veya benzeri" }
};
const siteText = { address: "İstanbul, Türkiye" };

module.exports = { ui, blog, legal, port, company, districts, places, services, zones, cars, site: siteText };
