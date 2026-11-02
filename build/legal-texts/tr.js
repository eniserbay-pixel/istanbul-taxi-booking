// Türkçe kullanım koşulları ve KVKK aydınlatma metni / gizlilik politikası. TASLAK: kullanmadan önce bir avukata kontrol ettirin.
// Yer tutucular build.js tarafından doldurulur, bkz. en.js.
module.exports = {
  updated: "2 Kasım 2026",
  ui: {
    updated: "Son güncelleme", toc: "İçindekiler",
    rows: { company: "Unvan", address: "Kayıtlı adres", mersis: "MERSİS numarası", tax: "Vergi dairesi ve numarası", tradeReg: "Ticaret sicil numarası",
      kep: "KEP adresi", tursab: "TÜRSAB belge numarası", verbis: "VERBİS kaydı", euRep: "AB temsilcisi (GDPR md. 27)", email: "E-posta", phone: "Telefon ve WhatsApp" }
  },
  terms: {
    title: "Kullanım ve Rezervasyon Koşulları",
    desc: "İstanbul transferleri için koşullar: rezervasyon, sabit fiyat, nakit ödeme, bekleme süresi, bagaj, çocuk koltuğu, ücretsiz iptal ve sorumluluk.",
    intro: `<p>Bu koşullar, sizinle {brand} markasını işleten ve {url} üzerinden ayırtılan transferleri gerçekleştiren {company} ("biz") arasındaki sözleşmeyi oluşturur. Lütfen rezervasyon göndermeden önce okuyun. Rezervasyon formundaki kutuyu işaretleyerek bu koşulları ve {privacyLink} metnini kabul etmiş olursunuz.</p>`,
    sections: [
      ["Biz kimiz, ne sunuyoruz", `<p>{brand}, TÜRSAB'dan {tursab} belge numarasıyla lisanslı seyahat acentası {company} şirketinin transfer hizmetidir. <strong>Yalnızca İstanbul il sınırları içinde</strong> şoförlü özel transfer sunarız: İstanbul Havalimanı (IST), Sabiha Gökçen Havalimanı (SAW), Galataport kruvaziyer limanı, oteller, adresler ve şehirdeki gezi noktaları arasında. İstanbul dışında başlayan veya biten bir yolculuk, ancak yolculuktan önce yazılı olarak anlaşırsak mümkündür.</p>
<p>Yolculuk kendi şoförlerimiz ve araçlarımızla ya da bizim için çalışan lisanslı taşımacılık firmaları ve şoförlerle yapılır. Her durumda muhatabınız biziz ve rezervasyondan size karşı biz sorumluyuz.</p>`],
      ["Rezervasyon ve onay", `<ul><li>Rezervasyon formunu göndermek bir <strong>taleptir</strong>, henüz sözleşme değildir. Talebinizi aldığımızı bildiren bir e-posta alırsınız.</li>
<li>Sözleşme, size rezervasyon numaranızı ve voucher'ınızı içeren <strong>onay e-postasını</strong> gönderdiğimizde kurulur. Genellikle bir saat içinde yanıt veririz; talebi karşılayamazsak bunu e-postayla bildiririz ve hiçbir ücret doğmaz.</li>
<li>Yalnızca farklı bir saat, araç veya fiyat önerebiliyorsak teklifimizi size göndeririz; rezervasyon ancak siz kabul ederseniz kurulur.</li>
<li>Rezervasyon yapmak için en az 18 yaşında olmalısınız. Başka yolcular adına rezervasyon yapan kişi bu koşulları onlar adına da kabul eder ve bilgilerinin doğruluğundan sorumludur.</li>
<li>Lütfen onayı kontrol edin. Tarih, saat, adres, uçuş numarası veya yolcu sayısı yanlışsa hemen bize yazın: yolculuk onaydaki bilgilere göre yapılır.</li></ul>`],
      ["Araçlar", `<p>Belirli bir model veya plaka değil, bir araç sınıfı ayırtırsınız:</p>
<ul><li><strong>Sedan</strong>: en fazla 3 yolcu ve 3 bavul (Skoda Octavia, Toyota Corolla veya benzeri).</li>
<li><strong>Minivan</strong>: en fazla 7 yolcu ve 7 bavul (Mercedes Vito, Ford Tourneo veya benzeri).</li>
<li><strong>Mercedes V-Class</strong>: en fazla 6 yolcu ve 6 bavul.</li>
<li><strong>Minibüs</strong>: en fazla 16 yolcu ve 16 bavul (Mercedes Sprinter veya benzeri).</li></ul>
<p>Sitedeki fotoğraflar örnektir. Ek ücret almadan aynı veya daha üst sınıf bir araç gönderebiliriz. Tüm araçlar ticari yolcu taşımacılığı için ruhsatlı, mevzuatın gerektirdiği şekilde sigortalı ve sigarasızdır.</p>`],
      ["Fiyatlar", `<ul><li>Fiyatlar kişi başı değil <strong>araç başı sabittir</strong> ve talebi göndermeden önce euro olarak gösterilir. Onayınızdaki fiyat ödeyeceğiniz fiyattır.</li>
<li>Fiyata yakıt, otoyol, köprü ve tünel geçişleri, havalimanı otoparkı, aşağıdaki ücretsiz bekleme süresi ve isim tabelasıyla karşılama dahildir.</li>
<li>Yoğun saatlerde fiyat farkı uygulanabilir; bu fark her zaman rezervasyondan önce gösterilen fiyata dahildir. Dönüş transferi de içeren rezervasyonlarda dönüşte %{returnPct} indirim uygulanır. Çocuk koltuğu koltuk başı €{seat}'dur.</li>
<li>Fiyat yalnızca rezervasyon değişirse değişir: başka bir adres, ek durak veya güzergah değişikliği, ayırtılandan fazla yolcu veya bagaj ya da ücretsiz süreyi aşan bekleme. Ek ücreti şoför veya ofis, uygulanmadan önce size bildirir.</li>
<li>Trafik, şoförün seçtiği daha uzun bir güzergah veya rötarlı uçuş fiyatı hiçbir zaman değiştirmez.</li></ul>`],
      ["Ödeme", `<ul><li>Ödemeyi <strong>yolculuk sonunda şoföre nakit</strong> olarak, euro, ABD doları veya günün kuruyla Türk lirası ile yaparsınız. Rezervasyon için ön ödeme, kapora veya kart bilgisi gerekmez.</li>
<li>Yazılı anlaşması olan şirketler ve iş ortakları, anlaşmalarında belirtildiği gibi havale veya cari hesapla ödeyebilir.</li>
<li>Fatura istiyorsanız yolculuktan önce veya hemen sonra fatura unvanı, adres ve vergi numarasını bize iletin. Fatura mevzuata uygun olarak düzenlenir.</li></ul>`],
      ["Karşılama, buluşma noktası ve bekleme süresi", `<ul><li><strong>Havalimanları</strong>: uçuşunuzu takip ederiz. Şoför geliş salonunda adınızın yazılı olduğu tabelayla bekler. Uçağınızın <strong>gerçek iniş saatinden sonraki ilk {wait} dakika</strong> ücretsizdir; pasaport kontrolü ve bagaj için yeterlidir.</li>
<li><strong>Kruvaziyer limanı</strong>: şoför terminal çıkışında bekler; geminin yolcu indirme saatini takip ederiz.</li>
<li><strong>Oteller ve diğer adresler</strong>: şoför, ayırtılan saatten sonra girişte veya belirttiğiniz yerde <strong>15 dakika</strong> bekler.</li>
<li>Daha uzun süreye ihtiyacınız olursa (kayıp bagaj, uzun kuyruk) bize yazın veya arayın: mümkünse beklemeye devam eder, ek bekleme ücretli olacaksa size söyleriz.</li>
<li>Ücretsiz bekleme süresi bittiğinde size telefon, WhatsApp veya e-postayla ulaşamazsak şoför ayrılabilir ve yolculuk gelmeme (no-show) sayılır (bkz. iptal).</li>
<li>Havalimanına gidişlerde alış saatini trafik ve check-in için yeterli payla planlayın. Dış hat uçuşlarında kalkıştan en az 3 saat önce alış öneririz; rezervasyon sırasında size yardımcı olabiliriz.</li></ul>`],
      ["Sizin yükümlülükleriniz", `<p>Lütfen doğru ad, varışta ulaşılabilir bir telefon numarası (mümkünse WhatsApp), e-posta, uçuş numarası, adresler, yolcu ve bagaj sayısı verin. Uçuşunuz iptal edilir, başka havalimanına yönlendirilir veya değişirse ya da planınız değişirse bize en kısa sürede haber verin. Yanlış veya eksik bilgi nedeniyle gerçekleşemeyen karşılamalardan sorumlu değiliz.</p>`],
      ["Sizin yaptığınız değişiklikler", `<ul><li>Tarih, saat, adres, araç veya yolcu sayısını <strong>alıştan 24 saat öncesine kadar ücretsiz</strong> değiştirebilirsiniz; onay e-postasını yanıtlamanız veya WhatsApp'tan yazmanız yeterlidir.</li>
<li>Daha geç değişiklikler uygun araç ve şoför varsa kabul edilir. Değişiklik fiyatı değiştirebilir; yeni fiyatı uygulamadan önce size bildiririz.</li>
<li>Aynı uçuş numarasıyla rötar bir değişiklik değildir: uçuşu otomatik takip ederiz.</li></ul>`],
      ["İptal ve iade", `<ul><li><strong>Alıştan 24 saat öncesine kadar iptal ücretsizdir.</strong> Onay e-postasını yanıtlayın veya WhatsApp'tan yazın. Size iptal e-postası gönderilir.</li>
<li>Alıştan 24 saatten kısa süre kala iptal ederseniz veya yolcu haber vermeden gelmezse (no-show), özellikle şoför yola çıkmışsa yolculuk ücretinin tamamına kadar ücret talep edebiliriz.</li>
<li>Uçuşunuz iptal edilir ve alış saatinden önce bize bildirirseniz rezervasyonu ücretsiz iptal ederiz.</li>
<li>Önceden bir ödeme yaptıysanız (ör. kurumsal anlaşmayla havale), borçlu olunmayan tutarı 14 gün içinde aynı ödeme yöntemiyle iade ederiz.</li>
<li>Hizmet belirli bir tarihte yapılan yolcu taşıma hizmeti olduğundan, mesafeli sözleşmelerdeki yasal cayma hakkı uygulanmaz. Bunun yerine yukarıdaki ücretsiz iptal hakkınız vardır.</li></ul>`],
      ["Bizim iptal etmemiz veya gecikmemiz", `<p>Onaylanmış bir rezervasyonu iptal etmek zorunda kalırsak size olabildiğince erken haber verir, aynı fiyata başka bir araç ayarlamaya çalışırız. Yerine araç bulunamazsa hiçbir ücret ödemezsiniz ve ödediğiniz her şey tam olarak iade edilir. Şoförünüzü bulamazsanız hemen arayın veya WhatsApp'tan yazın, anında yardımcı olalım.</p>`],
      ["Yolcular ve bagaj", `<ul><li>Yolcu sayısı (bebekler ve çocuklar dahil) ve bavul sayısı ayırtılan aracın kapasitesini aşamaz. Mevzuat koltuk sayısından fazla yolcu taşınmasına izin vermez. Fazla olması halinde şoför yolculuğu reddedebilir veya ek ücretle daha büyük bir araç gerekebilir.</li>
<li>Kapasite yolcu başına bir standart bavul ve bir küçük el çantası esas alınarak hesaplanır. Golf çantası, kayak, bisiklet, tekerlekli sandalye, bebek arabası veya müzik aleti gibi büyük eşyaları önceden bildirin.</li>
<li>Evcil hayvanlar yalnızca yolculuktan önce anlaşılırsa ve kapalı taşıma çantasında taşınır. Rehber köpek varsa lütfen önceden bildirin.</li>
<li>Tehlikeli, yasa dışı veya yanıcı eşya taşınmaz.</li>
<li>Lütfen tüm eşyalarınızı alın. Kayıp eşyaları aramanıza yardım ederiz ancak araçta unutulan eşyalardan sorumlu değiliz.</li></ul>`],
      ["Çocuk koltuğu", `<ul><li>Karayolları trafik mevzuatı gereği çocuklar yaşlarına, boylarına ve kilolarına uygun çocuk koltuğunda seyahat etmelidir. Rezervasyon formunda çocuk koltuğu sayısını ekleyin (koltuk başı €{seat}) ve çocukların yaşlarını nota yazın.</li>
<li>İstek üzerine bebek koltuğu ve yükseltici koltuk sağlarız. Kendi onaylı koltuğunuzu da getirebilirsiniz.</li>
<li>Çocuk koltuğu gerekli olup ayırtılmadıysa şoför çocuğu alamayabilir; bundan doğan gecikmeden sorumlu tutulamayız.</li>
<li>Çocuğun koltuğa yerleştirilmesinden ebeveyn veya refakatçi yetişkin sorumludur; şoför koltuğun takılmasına yardım eder.</li></ul>`],
      ["Araç içinde davranış", `<ul><li>Tüm yolcular emniyet kemeri takmalıdır. Ticari araçlarda elektronik sigara dahil sigara içmek kanunen yasaktır.</li>
<li>Bir yolcu şiddet uygular, hakaret eder, aşırı sarhoşsa veya güvenliği tehlikeye atarsa şoför yolculuğu reddedebilir veya sonlandırabilir. Bu durumda ücretin tamamı ödenir.</li>
<li>Yolcuların neden olduğu hasar veya ağır kirlenme (ör. kusma) belgelenen temizlik veya onarım maliyeti üzerinden talep edilebilir.</li></ul>`],
      ["Sorumluluk", `<ul><li>Yolculuğu gerekli özeni göstererek ve mevzuatın gerektirdiği belgelere sahip şoförlerle yaparız. Yolcular, ticari yolcu taşımacılığı için zorunlu sigortalar kapsamındadır.</li>
<li>Gerekli özeni göstermiş olmamıza rağmen trafik kazası, yol kapanması, polis kontrolü, ağır hava koşulları veya etkinlikler gibi elimizde olmayan nedenlerle oluşan gecikmelerden, kaçırılan uçuş, gemi veya randevulardan sorumlu değiliz. Kasıt veya ağır kusurumuz olmadıkça bağlantı kaçırma, otel gecesi veya iş kaybı gibi dolaylı zararlardan sorumlu değiliz.</li>
<li>Bagaj hasarına ilişkin sorumluluğumuz kanunun izin verdiği ölçüdedir; hasarı hemen şoföre, 7 gün içinde de bize bildirin.</li>
<li>Bu koşullardaki hiçbir hüküm ölüm veya yaralanma, kasıt veya ağır kusur halindeki sorumluluğu ya da tüketici olarak emredici haklarınızı sınırlamaz.</li></ul>`],
      ["Mücbir sebep", `<p>Taraflardan hiçbiri doğal afet, salgın, savaş, grev, resmi makam kararları, havalimanı veya yol kapanması gibi kontrolü dışındaki olaylar nedeniyle yerine getiremediği yükümlülüklerden sorumlu değildir. Bu durumda her iki taraf da ücretsiz iptal edebilir ve yapılmış ön ödemeler iade edilir.</p>`],
      ["Şikayetler", `<p>Bir sorun olduysa rezervasyon numaranızla birlikte, tercihen 30 gün içinde {email} adresine yazın. 14 gün içinde yanıt veririz. Türkiye'deki tüketiciler yasal parasal sınırlar dahilinde Tüketici Hakem Heyeti'ne veya Tüketici Mahkemesi'ne başvurabilir; AB'deki tüketiciler kendi ülkelerinin tüketici merkezine başvurabilir.</p>`],
      ["Uygulanacak hukuk, yetki ve koşullardaki değişiklikler", `<p>Bu koşullara Türkiye Cumhuriyeti hukuku uygulanır. Tüketicilere kendi yerleşim yerindeki mahkeme veya mercilere başvurma hakkı tanıyan emredici hükümler saklı kalmak kaydıyla İstanbul mahkemeleri ve icra daireleri yetkilidir. Bu koşulları güncelleyebiliriz; bir rezervasyona, o rezervasyonu gönderdiğiniz tarihte yürürlükte olan sürüm uygulanır. Bir hükmün geçersiz olması diğer hükümlerin geçerliliğini etkilemez. Bu koşullar birden fazla dilde yayımlanır; aralarında fark olması halinde Türkçe metin esas alınır.</p>`],
      ["İletişim ve şirket bilgileri", `{details}`]
    ]
  },
  privacy: {
    title: "Gizlilik Politikası ve KVKK Aydınlatma Metni",
    desc: "KVKK ve GDPR aydınlatma metni: transfer rezervasyonunda hangi verileri neden topladığımız, kimlerle paylaştığımız, saklama süreleri, çerezler ve haklarınız.",
    intro: `<p>Bu metin, {url} sitesini ziyaret ettiğinizde, transfer ayırttığınızda veya bizimle iletişime geçtiğinizde {company} şirketinin kişisel verilerinizi nasıl işlediğini açıklar. 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) md. 10 kapsamındaki aydınlatma metnimizdir; Avrupa Birliği ve Birleşik Krallık'taki ziyaretçiler için Genel Veri Koruma Tüzüğü (GDPR) kapsamındaki bilgilendirmeyi de içerir. Ayrıca {termsLink} metnine bakın.</p>`,
    sections: [
      ["Veri sorumlusu", `<p>Veri sorumlusu {company}, {address} adresindeki şirketimizdir. Verilerinizle ilgili bize {email} veya {phone} üzerinden ulaşabilirsiniz.</p>`],
      ["Topladığımız veriler", `<ul><li><strong>Rezervasyon bilgileri</strong>: ad soyad, e-posta, telefon veya WhatsApp numarası, alış ve bırakış adresleri, tarih ve saat, uçuş veya gemi bilgisi, yolcu, bagaj ve çocuk koltuğu sayısı, şoföre notlar, seçilen araç ve fiyat.</li>
<li><strong>Resmi makamlar için yolcu bilgileri</strong>: kendi araçlarımızla yapılan yolculuklarda mevzuat, yolcuların Ulaştırma Bakanlığı'nın U-ETDS sistemine bildirilmesini zorunlu kılar. Bunun için her yolcunun adı, uyruğu, cinsiyeti ve pasaport veya T.C. kimlik numarası istenebilir.</li>
<li><strong>Tamamlanmamış rezervasyonlar</strong>: rezervasyon formuna adınızı, telefonunuzu veya e-postanızı yazıp göndermezseniz, ofisimizin rezervasyonu tamamlamanıza yardımcı olmak için sizinle bir kez iletişime geçebilmesi amacıyla yazdıklarınızı kaydederiz.</li>
<li><strong>Mesajlar</strong>: bize e-posta, WhatsApp, telefon veya şirket başvuru formları (kurumsal hesap, tedarikçi, iş ortağı) üzerinden ilettikleriniz.</li>
<li><strong>Teknik veriler</strong>: IP adresi, tarayıcı türü, geldiğiniz sayfa, IP adresinden çıkarılan yaklaşık ülke ve şehir, görüntülenen sayfalar. Kendi ziyaret sayacımız çerez kullanmaz ve IP adresinizi saklamaz.</li>
<li><strong>Analiz verileri</strong>: yalnızca analiz çerezlerini kabul ederseniz, aşağıdaki "Çerezler" bölümüne bakın.</li></ul>
<p>Ödeme kartı bilgisi istemeyiz. Kendi tercihinizle bildirdikleriniz dışında (ör. bir yolcunun tekerlekli sandalye kullanması; bunu yalnızca yolculuğu düzenlemek için kullanırız) özel nitelikli kişisel veri (ör. sağlık verisi) toplamayız.</p>`],
      ["İşleme amaçları ve hukuki sebepler", `<ul><li><strong>Transferinizi kurmak ve gerçekleştirmek</strong>: rezervasyonu onaylamak, voucher göndermek, şoföre karşılama için gerekenleri iletmek, uçuşunuzu takip etmek, yolculuk, değişiklik ve iptaller hakkında sizinle iletişim kurmak. Hukuki sebep: sözleşmenin kurulması ve ifası (KVKK md. 5/2-c; GDPR md. 6/1-b).</li>
<li><strong>Yasal yükümlülükleri yerine getirmek</strong>: U-ETDS yolcu bildirimi, faturalama, muhasebe ve vergi kayıtları, resmi makamların taleplerinin karşılanması. Hukuki sebep: kanunlarda açıkça öngörülmesi ve hukuki yükümlülük (KVKK md. 5/2-a ve ç; GDPR md. 6/1-c).</li>
<li><strong>Tamamlanmamış rezervasyonu tamamlamanıza yardım etmek, şikayetleri yönetmek, kötüye kullanımı önlemek ve haklarımızı korumak</strong>, siteyi güvende tutmak ve ziyaretleri çerezsiz saymak. Hukuki sebep: bir hakkın tesisi, kullanılması veya korunması ve meşru menfaatimiz (KVKK md. 5/2-e ve f; GDPR md. 6/1-f).</li>
<li><strong>Analiz çerezleri</strong>: yalnızca açık rızanızla (KVKK md. 5/1; GDPR md. 6/1-a); rızanızı istediğiniz zaman geri alabilirsiniz.</li></ul>
<p>Verileri rezervasyon formu, e-posta ve WhatsApp kanallarımız, telefon, rezervasyon ileten iş ortaklarımız aracılığıyla ve site üzerinden otomatik yollarla toplarız. Ayrıca onayınız olmadan ticari elektronik ileti göndermeyiz ve hakkınızda yalnızca otomatik işlemeye dayalı karar vermeyiz.</p>`],
      ["Verilerinizi kimlerle paylaşıyoruz", `<ul><li><strong>Şoför</strong> ve yolculuğu bir iş ortağı yapıyorsa <strong>lisanslı taşımacılık firması</strong>: yalnızca yolculuk için gerekenler (ad, telefon, alış bilgileri, uçuş, yolcular).</li>
<li>Bizim adımıza veri işleyen <strong>hizmet sağlayıcılar</strong>: site barındırma (Vercel), veritabanı (Upstash), e-posta gönderimi (Resend), ofisin rezervasyon bildirimleri (Telegram), uçuş bilgisi (AeroDataBox), rezervasyon yönetim sistemimiz ve ofisin bize gönderdiğiniz rezervasyon mesajlarını okumasına yardımcı olan bir yapay zeka hizmeti (Anthropic).</li>
<li><strong>Google</strong> (Google Analytics), yalnızca analiz çerezlerini kabul ederseniz.</li>
<li>Kanunun gerektirdiği hallerde <strong>yetkili kamu kurumları</strong>: Ulaştırma ve Altyapı Bakanlığı (U-ETDS), vergi daireleri, mahkemeler ve kolluk kuvvetleri.</li>
<li>Gerektiğinde, gizlilik yükümlülüğü altındaki muhasebeci ve avukatlarımız.</li></ul>
<p>Verilerinizi satmayız.</p>`],
      ["Yurt dışına aktarım", `<p>Yukarıdaki hizmet sağlayıcıların bir kısmı verileri Türkiye dışında, Avrupa Birliği'nde veya Amerika Birleşik Devletleri'nde saklar veya işler (ör. sitemiz Almanya, Frankfurt'taki sunucularda çalışır). Verileri yurt dışına yalnızca KVKK md. 9'un izin verdiği hallerde aktarırız: sizinle yapılan sözleşmenin ifası için zorunlu olan arızi aktarımlar, Kişisel Verileri Koruma Kurumu'na bildirilen standart sözleşmeler veya kanunda öngörülen diğer güvenceler. AB'den yapılan aktarımlarda Avrupa Komisyonu'nun standart sözleşme hükümlerine veya yeterlilik kararlarına dayanırız.</p>`],
      ["Saklama süreleri", `<ul><li><strong>Rezervasyonlar ve ilgili yazışmalar</strong>: Türk Ticaret Kanunu ve vergi mevzuatının ticari defter ve belgeler için öngördüğü şekilde yolculuktan sonra 10 yıl; ardından silinir veya anonim hale getirilir.</li>
<li><strong>U-ETDS yolcu verileri</strong>: taşımacılık mevzuatının öngördüğü süre boyunca.</li>
<li><strong>Tamamlanmamış rezervasyonlar</strong>: 30 gün sonra veya rezervasyonu gönderdiğiniz anda otomatik olarak silinir.</li>
<li><strong>E-postalardaki değişiklik onay bağlantıları</strong>: 60 gün.</li>
<li><strong>Şirket başvuru formları</strong>: en fazla 2 yıl veya ardından yapılan anlaşma süresince.</li>
<li><strong>Analiz verileri</strong>: Google Analytics'te en fazla 14 ay. Kendi sayacımızdaki ziyaret istatistikleri toplu haldedir ve kişisel veri içermez.</li></ul>
<p>Hukuki bir uyuşmazlık için gerekirse veriler daha uzun saklanabilir. Saklama süresi bittiğinde veriler kişisel veri saklama ve imha politikamıza göre silinir, yok edilir veya anonim hale getirilir.</p>`],
      ["Çerezler ve benzeri teknolojiler", `<ul><li><strong>Zorunlu depolama</strong>: site, yazdıklarınızı kaybetmemeniz için rezervasyon formu girişlerinizi ve geldiğiniz sayfayı sekmeyi kapatana kadar tarayıcınızın oturum depolamasında (session storage) tutar. Bunun için onay gerekmez.</li>
<li><strong>Ziyaret sayımı</strong>: kendi sayacımız her sayfa görüntülemesinde çerezsiz bir istek gönderir (sayfa, geldiğiniz site, dil); sonuç toplu istatistiktir.</li>
<li><strong>Analiz çerezleri (Google Analytics)</strong>: yalnızca çerez bildirimindeki "Kabul et" düğmesine tıkladıktan sonra kullanılır. Sitenin nasıl kullanıldığını görmemize yardımcı olur. Tercihiniz tarayıcınızda saklanır; "Çerez ayarları" bağlantısından veya tarayıcı verilerinizi silerek istediğiniz zaman değiştirebilirsiniz.</li></ul>
<p>Reklam çerezleri veya sosyal ağların takip çerezlerini kullanmayız.</p>`],
      ["Verilerinizi nasıl koruyoruz", `<p>Veriler şifreli bağlantı (HTTPS) üzerinden iletilir. Rezervasyonlara erişim, ihtiyacı olan çalışanlarla sınırlıdır ve şifreyle korunur; şoförler yalnızca yolculuk için gerekenleri görür. Hizmet sağlayıcılarımız verileri gizli ve güvende tutmakla sözleşmesel olarak yükümlüdür. Bir veri ihlali olursa kanunun gerektirdiği şekilde Kurul'a ve size bildirimde bulunuruz.</p>`],
      ["Haklarınız", `<p>KVKK md. 11 uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini isteme, KVKK md. 7'deki şartlar çerçevesinde silinmesini veya yok edilmesini isteme, düzeltme ve silme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme, münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme ve kanuna aykırı işleme sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme haklarına sahipsiniz.</p>
<p>GDPR kapsamında ayrıca erişim, düzeltme, silme, işlemenin kısıtlanması, veri taşınabilirliği, meşru menfaate dayanan işlemeye itiraz ve rızanızı önceki işlemeleri etkilemeksizin her zaman geri alma haklarınız vardır.</p>`],
      ["Başvuru ve şikayet", `<p>Haklarınızı kullanmak için Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ'e uygun olarak, adınızı, iletişim bilgilerinizi ve talebinizi belirterek {email} adresine yazabilir veya {address} adresine ıslak imzalı bir dilekçe gönderebilirsiniz; kimliğinizi doğrulamak için belge isteyebiliriz. Başvurunuzu en geç 30 gün içinde ücretsiz sonuçlandırırız. Yanıttan memnun kalmazsanız Kişisel Verileri Koruma Kurulu'na (www.kvkk.gov.tr) şikayette bulunabilirsiniz; AB veya Birleşik Krallık'ta yaşıyorsanız kendi ülkenizin veri koruma otoritesine de başvurabilirsiniz.</p>`],
      ["Çocuklar", `<p>Rezervasyonlar yetişkinler tarafından yapılmalıdır. Çocuklara ait verileri (yaş, çocuk koltuğu ihtiyacı, U-ETDS bilgileri) yalnızca ebeveyn veya refakatçi yetişkinin yaptığı rezervasyonun parçası olarak işleriz.</p>`],
      ["Bu metindeki değişiklikler", `<p>Veri işleme faaliyetlerimiz değiştiğinde bu metni güncelleriz. Sayfanın başındaki tarih güncel sürümü gösterir.</p>`],
      ["İletişim ve şirket bilgileri", `{details}`]
    ]
  }
};
