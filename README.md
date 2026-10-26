# Istanbul Airport Taxi

İstanbul Havalimanı (IST) ve Sabiha Gökçen (SAW) için sabit fiyatlı havalimanı taksi (özel transfer) sitesi. İngilizce (`/`) ve Türkçe (`/tr`).

- **Rezervasyon akışı:** müşteri formu gönderir → kayıt "Talep" olarak düşer, müşteriye "talebinizi aldık", ofise "yeni talep" e-postası gider → `/admin` panelinde **Onayla** → müşteriye onay e-postası gider. Ödeme yolculuk sonunda şoföre nakit.
- **Araçlar:** Sedan (3), Minivan (7), Mercedes V-Class (6), Minibüs (16).
- **Fiyatlar:** `data/pricing.json` (euro, bölge × bölge × araç). Yoğun saat farkı, dönüş indirimi ve çocuk koltuğu da orada. Sunucu fiyatı aynı dosyadan yeniden hesaplar.
- **Marka ve iletişim bilgileri:** `data/site.json` (marka adı, alan adı, telefon, WhatsApp, e-posta, TÜRSAB no, şirket unvanı, buluşma noktası metni). Yayından önce doldurulmalı.

## Yapı

- `build/build.js` sayfaları `public/` içine üretir: ana sayfa, rezervasyon, 2 havalimanı sayfası, 25 rota sayfası, fiyat listesi, yasal sayfalar, `sitemap.xml`, `robots.txt`, `llms.txt`, `404.html`, `/admin`. Metinler `build/i18n.js`, yasal metinler `build/legal.js` (taslak, avukat kontrolünden geçmeli).
- `public/assets/` stil (`site.css`), rezervasyon ve arama kutusu (`site.js`), fiyat hesabı (`quote.js`, tarayıcı ve sunucu ortak).
- `api/booking.js` talebi kaydeder, `api/admin.js` panelin API'si. Paket bağımlılığı yok.

## Vercel kurulumu

1. Repoyu Vercel'e bağla. Framework: Other. `vercel.json` derleme komutunu ve çıktı klasörünü ayarlıyor.
2. **Storage → Upstash for Redis** ekle ve projeye bağla (`KV_REST_API_URL`, `KV_REST_API_TOKEN` otomatik gelir).
3. Ortam değişkenleri:
   - `ADMIN_PASSWORD`: panel şifresi.
   - `RESEND_API_KEY`: [Resend](https://resend.com) API anahtarı (alan adını Resend'de doğrula).
   - `MAIL_FROM`: ör. `Istanbul Airport Taxi <booking@alanadin.com>`.
   - `OFFICE_EMAIL`: yeni taleplerin gideceği adres.
   - `SITE_URL`: ör. `https://www.alanadin.com` (canonical, sitemap ve hreflang için; yoksa `data/site.json` içindeki `url`).
4. Yeniden deploy et.

## Yerel çalıştırma ve test

```
node build/build.js
node tests/server.js 4321      # http://127.0.0.1:4321, sahte Redis ve e-posta kaydı (/__mails)
node tests/run.js              # tarama + tarayıcıda rezervasyon + panelden onay; Playwright gerekir
```
