// Terms and privacy texts. DRAFTS: have them checked by a lawyer before going live.
// {brand} {company} {address} {email} {phone} {tursab} come from data/site.json.
module.exports = {
  en: {
    terms: {
      title: "Terms of service",
      desc: "Booking, price, cash payment, waiting time and free cancellation terms for Istanbul airport taxi transfers booked on this website.",
      html: `<p>These terms apply to transfers booked on this website, operated by {company} ({address}), TÜRSAB licence {tursab}.</p>
<h2>Booking</h2><p>Sending the booking form is a request. A booking is binding only after we send you a confirmation e-mail. If we cannot serve your request we tell you by e-mail.</p>
<h2>Price and payment</h2><p>The price shown when you book is fixed per car and includes tolls, parking and the waiting time below. You pay the driver in cash at the end of the ride, in euro, US dollar or Turkish lira at the day's rate.</p>
<h2>Waiting time</h2><p>At the airports the first 60 minutes after your flight lands are free. At other addresses the driver waits 15 minutes after the booked time.</p>
<h2>Changes and cancellation</h2><p>You can change or cancel free of charge up to 24 hours before pickup by replying to your confirmation e-mail or on WhatsApp. If you do not show up without telling us, we may ask for the price of the ride.</p>
<h2>Passengers and luggage</h2><p>The number of passengers and suitcases must fit the car you booked. Children need a child seat, which you can add when booking.</p>
<h2>Contact</h2><p>{email} · {phone}</p>`
    },
    privacy: {
      title: "Privacy notice",
      desc: "How we use the name, phone, e-mail and flight details you give when booking an Istanbul airport taxi, and how to reach us about them.",
      html: `<p>{company} processes the personal data you give when booking (name, e-mail, phone, flight number, addresses, notes) only to arrange and carry out your transfer, to contact you about it and to meet legal duties such as passenger records required by Turkish law.</p>
<p>Your data is shared only with the driver or partner who carries out the ride and with service providers we use to run this website (hosting, database, e-mail). It is kept as long as the law requires.</p>
<p>You can ask to see, correct or delete your data by writing to {email}.</p>`
    }
  },
  tr: {
    terms: {
      title: "Hizmet koşulları",
      desc: "Bu siteden yapılan İstanbul havalimanı taksi rezervasyonlarında rezervasyon, fiyat, nakit ödeme, bekleme ve ücretsiz iptal koşulları.",
      html: `<p>Bu koşullar, {company} ({address}, TÜRSAB belge no {tursab}) tarafından işletilen bu siteden yapılan transfer rezervasyonları için geçerlidir.</p>
<h2>Rezervasyon</h2><p>Rezervasyon formunu göndermek bir taleptir. Rezervasyon, size onay e-postası gönderdiğimizde kesinleşir. Talebinizi karşılayamazsak bunu e-postayla bildiririz.</p>
<h2>Fiyat ve ödeme</h2><p>Rezervasyonda gösterilen fiyat araç başı sabittir; köprü, otoyol, otopark ve aşağıdaki bekleme süresi dahildir. Ödemeyi yolculuk sonunda şoföre nakit yaparsınız: euro, ABD doları veya günün kuruyla Türk lirası.</p>
<h2>Bekleme süresi</h2><p>Havalimanlarında uçağın inişinden sonraki ilk 60 dakika ücretsizdir. Diğer adreslerde şoför rezervasyon saatinden sonra 15 dakika bekler.</p>
<h2>Değişiklik ve iptal</h2><p>Alış saatinden 24 saat öncesine kadar onay e-postasını yanıtlayarak veya WhatsApp'tan ücretsiz değişiklik ya da iptal yapabilirsiniz. Haber vermeden gelinmezse yolculuk bedeli talep edilebilir.</p>
<h2>Yolcu ve bagaj</h2><p>Yolcu ve bavul sayısı ayrılan araca uygun olmalıdır. Çocuklar için rezervasyonda çocuk koltuğu eklenmelidir.</p>
<h2>İletişim</h2><p>{email} · {phone}</p>`
    },
    privacy: {
      title: "KVKK aydınlatma metni",
      desc: "Havalimanı taksi rezervasyonunda verdiğiniz ad, telefon, e-posta ve uçuş bilgilerinin KVKK kapsamında nasıl işlendiğine dair aydınlatma metni.",
      html: `<p>Veri sorumlusu {company}, rezervasyon sırasında verdiğiniz kişisel verileri (ad soyad, e-posta, telefon, uçuş numarası, adresler, notlar) yalnızca transferinizi planlamak ve gerçekleştirmek, sizinle bu konuda iletişim kurmak ve U-ETDS gibi yasal yükümlülükleri yerine getirmek amacıyla, 6698 sayılı KVKK'nın 5. maddesindeki sözleşmenin ifası ve hukuki yükümlülük hukuki sebeplerine dayanarak işler.</p>
<p>Verileriniz yalnızca yolculuğu yapan şoför veya iş ortağıyla ve bu siteyi çalıştırmak için kullandığımız hizmet sağlayıcılarla (barındırma, veritabanı, e-posta) paylaşılır ve mevzuatın gerektirdiği süre kadar saklanır.</p>
<p>KVKK'nın 11. maddesindeki haklarınız için {email} adresine yazabilirsiniz.</p>`
    }
  }
};
