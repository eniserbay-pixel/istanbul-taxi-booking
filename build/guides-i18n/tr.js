module.exports = {
  ui: { perPerson: "Kişi başı", more: "Diğer rehberler" },
  cheap: {
    path: "/tr/ucuz-taksi-istanbul",
    nav: "Ucuz taksi İstanbul",
    title: "Ucuz Taksi İstanbul · Havalimanı Sabit Fiyat, €{min} ve Üzeri",
    desc: "İstanbul'da araç başı en düşük €{min} sabit fiyatlı ucuz özel taksi, köprü ve otoyol dahil. Taksimetre yok, dolambaçlı yol yok, şoföre nakit ödeyin.",
    h1: "İstanbul'da sabit fiyatlı ucuz taksi",
    lead: "{brand} ile en ucuz özel taksi <strong>araç başı €{min}</strong> (sedan, 3 yolcuya kadar). Başlangıç fiyatı İstanbul Havalimanı'ndan (IST) €{istMin}, Sabiha Gökçen'den (SAW) €{sawMin}. Fiyat rezervasyonda sabitlenir, köprü, otoyol ve otopark dahildir; ödemeyi şoföre nakit yaparsınız.",
    tableH: "İstanbul'un en ucuz transfer rotaları",
    tableNote: "Kişi başı: aracın fiyatı, dolu bir araçta yolculara bölündüğünde.",
    sections: [
      ["Sabit fiyat neden çoğu zaman taksimetreden ucuzdur", "<p>Havalimanından taksimetreli taksi ilk bakışta ucuz görünür; ama trafik, uzayan yol ya da gece tarifesi eklendikçe fiyat büyür. Bizim fiyatımız araç başıdır ve uçmadan önce bellidir: yol 45 dakika da sürse iki saat de sürse aynıdır. Üstüne köprü, otopark ya da bagaj ücreti eklenmez.</p>"],
      ["En az nasıl ödersiniz", "<ul><li><strong>Aracı doldurun.</strong> 6 kişilik minivanın başlangıç fiyatı €{van}; altı kişilik bir grup kişi başı birkaç euro öder.</li><li><strong>Dönüşü de ayırtın.</strong> Dönüş transferi %{ret} indirimlidir.</li><li><strong>Akşam yoğunluğundan kaçının.</strong> IST'de {istFrom}–{istTo}, SAW'da {sawFrom}–{sawTo} arası alışlar %{peak} daha pahalıdır.</li><li><strong>Doğru havalimanını seçin.</strong> Anadolu yakası (Kadıköy, Üsküdar, Ataşehir) için Sabiha Gökçen daha yakın ve daha ucuzdur.</li></ul>"],
      ["Taksiden de ucuz: toplu taşıma", "<p>Bütçe her şeyden önemliyse ve az eşyanız varsa, İstanbul Havalimanı'ndan M11 metrosu ve Havaist otobüsleri, Sabiha Gökçen'den M4 metrosu ve Havabüs kalkar. Kişi başı birkaç euro tutar ama aktarma, merdiven ve bagaj taşımak demektir. İki ya da daha fazla kişiyseniz ya da gece geç saatteyse sabit fiyatlı özel taksi genellikle daha avantajlıdır.</p>"]
    ],
    faq: [
      ["İstanbul'daki en ucuz taksi hangisi?", "{brand} ile en ucuz özel taksi, 3 yolcuya kadar sedanla araç başı €{min}. Fiyat sabittir, köprü ve otopark dahildir; ödemeyi yolculuk sonunda nakit yaparsınız."],
      ["İstanbul Havalimanı'ndan şehre ucuz taksi ne kadar?", "İstanbul Havalimanı'ndan (IST) Taksim ve Şişli'ye sedanın başlangıç fiyatı araç başı €{istMin}. Sultanahmet için fiyat €{istSult}. Tüm rotaları fiyat listesinde görebilirsiniz."],
      ["Fiyat kişi başı mı?", "Hayır, araç başı. Sedan 3, minivan 6, minibüs 13 yolcuya kadar alır; araç doldukça kişi başı fiyat düşer."],
      ["Gizli ücret var mı?", "Hayır. Köprü, otopark ve inişten sonraki ilk {wait} dakika bekleme dahildir. Çocuk koltuğu isterseniz tanesi €{seat}."]
    ]
  },
  private: {
    path: "/tr/ozel-taksi-istanbul",
    nav: "Özel taksi İstanbul",
    title: "Özel Taksi İstanbul · Şoför Sizi Bekler, €{min} ve Üzeri",
    desc: "İstanbul'da özel taksi ayırtın: size ait araç ve şoför, araç başı en düşük €{min} sabit fiyat, gelen yolcu salonunda isim tabelası ve uçuş takibi.",
    h1: "İstanbul'da size özel şoförlü taksi",
    lead: "{brand} ile özel taksi, önceden ayırttığınız size ait araç ve profesyonel şoför demektir; <strong>araç başı en düşük €{min} sabit fiyatla</strong>. Şoförünüz uçuşunuzu takip eder, gelen yolcu salonunda isim tabelasıyla bekler ve sizi doğrudan otelinize götürür. Ödemeyi yolculuk sonunda nakit yaparsınız.",
    tableH: "Popüler rotalarda özel taksi fiyatları",
    tableNote: "Köprü, otoyol ve otopark dahil.",
    sections: [
      ["Onu özel yapan ne", "<ul><li>Araç yalnızca size ve grubunuza aittir, başka yolcuyla paylaşılmaz.</li><li>Siz şoförü değil, şoför sizi bekler: uçuş takibi ve inişten sonra {wait} dakika ücretsiz bekleme.</li><li>Kapıdan kapıya: terminalden, otelden ya da kruvaziyer limanından verdiğiniz adrese.</li><li>Aracı siz seçersiniz: sedan (3), minivan (6), Mercedes V-Class (6) ya da minibüs (13).</li></ul>"],
      ["Özel taksi mi, sarı taksi mi?", "<p>İstanbul'da sarı taksi taksimetrelidir, ilk el kaldıranı alır ve yoğun saatte ya da yağmurda bulmak çoğu zaman zordur. Özel taksi ihtiyacınızdan önce ayırtılır; araç sizi zaten bekler ve fiyat önceden bellidir. {brand} bir taksi durağı değil, lisanslı bir transfer firmasıdır (TÜRSAB belge no {tursab}).</p>"],
      ["Nerelere gidiyoruz", "<p>Yalnızca İstanbul: İstanbul Havalimanı (IST), Sabiha Gökçen (SAW), Galataport kruvaziyer limanı ve Boğaz'ın iki yakasındaki tüm merkezi ilçeler; Sultanahmet, Taksim, Beşiktaş, Şişli, Kadıköy ve Üsküdar dahil.</p>"]
    ],
    faq: [
      ["İstanbul'da özel taksi nasıl ayırtılır?", "Sitemizde rotanızı, aracınızı ve saatinizi seçip talebi gönderin. Yaklaşık bir dakika sürer, hesap ya da ön ödeme gerekmez. Onay e-postası genellikle bir saat içinde gelir."],
      ["İstanbul Havalimanı'ndan özel taksi ne kadar?", "İlçeye göre başlangıç fiyatları araç başı sedanda €{istMin}, 6 kişilik minivanda €{van}, Mercedes V-Class'ta €{vip}."],
      ["Uçuşum gecikirse şoför bekler mi?", "Evet. Uçuşunuzu takip eder, alış saatini ona göre ayarlarız; inişten sonraki ilk {wait} dakika ücretsizdir."],
      ["İptal edebilir miyim?", "Evet, alış saatinden 24 saat öncesine kadar ücretsiz."]
    ]
  },
  black: {
    path: "/tr/vip-taksi-istanbul",
    nav: "VIP ve siyah taksi İstanbul",
    title: "VIP Taksi İstanbul · Mercedes V-Class, €{vip} ve Üzeri",
    desc: "İstanbul'da VIP transfer ve siyah taksi: profesyonel şoförlü siyah Mercedes V-Class, 6 yolcuya kadar araç başı en düşük €{vip} sabit fiyat. Havalimanı karşılama.",
    h1: "İstanbul'da VIP transfer ve siyah taksi",
    lead: "İstanbul'da siyah araçla yolculuk için {brand}, profesyonel şoförüyle bir <strong>Mercedes-Benz V-Class VIP</strong> gönderir; 6 yolcu ve 6 valize kadar <strong>araç başı en düşük €{vip} sabit fiyatla</strong>. Şoförünüz gelen yolcu salonunda isim tabelasıyla karşılar, ödemeyi yolculuk sonunda nakit yaparsınız.",
    tableH: "Mercedes V-Class VIP fiyatları",
    tableNote: "Tek yön, araç başı, 6 yolcu ve 6 valize kadar. Köprü, otoyol ve otopark dahil.",
    sections: [
      ["İstanbul'un siyah taksileri ve VIP transfer", "<p>İstanbul'da sarı taksilerin yanında turkuaz ve siyah taksiler de var; siyahlar en yüksek taksimetre tarifeli üst sınıftır. Yine de sokakta ya da durakta bulunmaları gerekir. VIP transfer ise önceden ayırtılır: indiğinizde siyah bir Mercedes V-Class sizi bekler, fiyatını da uçmadan önce bilirsiniz.</p>"],
      ["V-Class'ta neler var", "<ul><li>Sessiz bir kabinde altı geniş koltuk; yolda konuşmak ya da çalışmak için yer.</li><li>Altı valiz ya da golf çantası ve bebek arabası için alan.</li><li>Profesyonel şoför, uçuş takibi ve {wait} dakika ücretsiz bekleme.</li><li>Alıştan 24 saat öncesine kadar ücretsiz iptal.</li></ul>"],
      ["Kimler için uygun", "<p>İş seyahatleri, uzun uçuştan sonra konfor isteyen aileler, balayı çiftleri, otel ve etkinlik transferleri. Daha büyük gruplar için 13 kişilik Mercedes Sprinter minibüsün başlangıç fiyatı araç başı €{bus}.</p>"]
    ],
    faq: [
      ["İstanbul'da siyah taksi var mı?", "Evet. İstanbul'un resmi taksileri sarı, turkuaz ve siyahtır; siyah, taksimetreli üst sınıftır. Havalimanında sizi sabit fiyatla bekleyen siyah bir araç istiyorsanız {brand} ile Mercedes V-Class VIP transfer ayırtın."],
      ["İstanbul Havalimanı'ndan VIP transfer ne kadar?", "İstanbul Havalimanı'ndan (IST) Mercedes V-Class'ın başlangıç fiyatı, ilçeye göre 6 yolcuya kadar araç başı €{vip}."],
      ["V-Class fiyatı kişi başı mı?", "Hayır, 6 yolcu ve 6 valize kadar araç başıdır."],
      ["Nasıl ödenir?", "Yolculuk sonunda şoföre nakit; euro, ABD doları ya da Türk lirası ile. Kapora yoktur."]
    ]
  },
  best: {
    path: "/tr/en-iyi-istanbul-havalimani-transferi",
    nav: "En iyi İstanbul havalimanı transferi",
    title: "En İyi İstanbul Havalimanı Transferi · Nasıl Seçilir",
    desc: "En iyi İstanbul havalimanı transferi nasıl seçilir: sabit fiyat, lisans, karşılama, uçuş takibi, ücretsiz iptal. Seçenekleri ve fiyatları karşılaştırın.",
    h1: "En iyi İstanbul havalimanı transferi nasıl seçilir",
    lead: "En iyi İstanbul havalimanı taksisi ya da transferi size <strong>araç başı sabit fiyat</strong>, <strong>lisanslı bir firma</strong>, <strong>terminalin içinde adınızla bekleyen</strong> bir şoför, <strong>uçuş takibi</strong> ve <strong>ücretsiz iptal</strong> sunar. {brand} bu beşini de araç başı en düşük €{min} fiyatla ve şoföre nakit ödemeyle sunar.",
    tableH: "En çok ayırtılan rotaların sabit fiyatları",
    tableNote: "Köprü, otoyol, otopark ve bekleme süresi dahil.",
    sections: [
      ["Rezervasyondan önce kontrol edilecek beş şey", "<ol><li><strong>Araç başı sabit fiyat</strong>; köprü ve otopark dahil, kişi başı fiyat ya da tahmini tutar değil.</li><li><strong>Lisans.</strong> Türkiye'de transfer firmaları TÜRSAB belgelidir; bizimki {tursab}.</li><li><strong>Gelen yolcu salonunda karşılama</strong>, \"inince bizi arayın\" değil.</li><li><strong>Uçuş takibi ve ücretsiz bekleme</strong>; rötar size bir şey kaybettirmez. Bizde inişten sonra {wait} dakika.</li><li><strong>Ücretsiz iptal ve ön ödeme yok</strong>; planlar değişebilir.</li></ol>"],
      ["İstanbul havalimanlarında seçenekleriniz", "<ul><li><strong>Taksi durağı:</strong> rezervasyon gerekmez ama çoğu zaman kuyruk olur, taksimetre trafikte işler ve şoför otelinizi bilmeyebilir.</li><li><strong>Taksi uygulamaları:</strong> İstanbul'da çoğunlukla aynı taksimetreli sarı taksiyi çağırır.</li><li><strong>Otobüs ve metro:</strong> en ucuzu, ama aktarma var ve bagajı siz taşırsınız.</li><li><strong>Özel transfer:</strong> önceden ayırtılır, fiyatı sabittir ve şoför adınızla bekler. Aileler, gruplar ve geç inenler için en kolay seçenek.</li></ul>"],
      ["Yolcular neden {brand} ile yolculuk ediyor", "<p>Yalnızca İstanbul'da çalışıyoruz; şoförlerimiz şehrin otellerini, havalimanlarının çıkışlarını ve Galataport kruvaziyer terminalini iyi bilir. Sedan, minivan, Mercedes V-Class ya da 13 kişilik minibüsü seçer, hesap açmadan yaklaşık bir dakikada ayırtırsınız; onay e-postası genellikle bir saat içinde gelir.</p>"]
    ],
    faq: [
      ["İstanbul Havalimanı'ndan şehre gitmenin en iyi yolu ne?", "Çoğu yolcu için önceden ayırtılan özel transfer: şoför isim tabelasıyla bekler, fiyat sabittir ve araç sizi otelinizin kapısına bırakır. {brand} ile İstanbul Havalimanı'ndan başlangıç fiyatı araç başı €{istMin}."],
      ["İstanbul'daki en iyi taksi firması hangisi?", "Araç başı sabit fiyat, karşılama, uçuş takibi ve ücretsiz iptal sunan lisanslı bir firma arayın. {brand}, bunların hepsini sunan TÜRSAB lisanslı ({tursab}) bir İstanbul transfer firmasıdır."],
      ["Havalimanı taksisini önceden ayırtmalı mıyım?", "Evet. Böylece aracınız sizi zaten bekler, taksi kuyruğuna girmezsiniz ve fiyatı uçmadan önce bilirsiniz."],
      ["Otelim için Sabiha Gökçen mi, İstanbul Havalimanı mı daha iyi?", "Avrupa yakası (Sultanahmet, Taksim, Beşiktaş) için genellikle İstanbul Havalimanı, Anadolu yakası (Kadıköy, Üsküdar, Ataşehir) için Sabiha Gökçen daha yakındır."]
    ]
  }
};
