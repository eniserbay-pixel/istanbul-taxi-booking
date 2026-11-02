// English terms of service and privacy notice. DRAFT: have a lawyer check every language before relying on it.
// Placeholders filled by build.js: {company} {brand} {address} {email} {phone} {tursab} {url} {seat} {wait}
// {returnPct} {details} (company details list from data/site.json → legal) {privacyLink} {termsLink}.
module.exports = {
  updated: "2 November 2026",
  ui: {
    updated: "Last updated", toc: "Contents",
    rows: { company: "Company", address: "Registered address", mersis: "MERSIS number", tax: "Tax office and number", tradeReg: "Trade registry number",
      kep: "Registered e-mail (KEP)", tursab: "TÜRSAB licence", verbis: "VERBIS registration", euRep: "EU representative (GDPR art. 27)", email: "E-mail", phone: "Phone and WhatsApp" }
  },
  terms: {
    title: "Terms of service",
    desc: "Terms for Istanbul transfers booked here: booking, fixed price, cash payment, waiting time, luggage, child seats, free cancellation and liability.",
    intro: `<p>These terms form the contract between you and {company} ("we", "us"), the company that runs {brand} and carries out the transfers booked on {url}. Please read them before you send a booking. By ticking the box in the booking form you accept them together with our {privacyLink}.</p>`,
    sections: [
      ["Who we are and what we offer", `<p>{brand} is the transfer service of {company}, a travel agency licensed by TÜRSAB under number {tursab}. We offer private transfers with a driver <strong>inside the province of Istanbul only</strong>: to and from Istanbul Airport (IST), Sabiha Gökçen Airport (SAW), the Galataport cruise port, hotels, addresses and sights in the city. A ride that starts or ends outside Istanbul is possible only if we agree to it in writing before the ride.</p>
<p>The ride is carried out by our own drivers and vehicles or by licensed transport companies and drivers working for us. In every case we remain your contact and are responsible to you for the booking.</p>`],
      ["Booking and confirmation", `<ul><li>Sending the booking form is a <strong>request</strong>, not yet a contract. You receive an e-mail saying we have received it.</li>
<li>The contract is made when we send you the <strong>confirmation e-mail</strong> with your booking reference and voucher. We usually answer within an hour; if we cannot carry out the request we tell you by e-mail and nothing is owed.</li>
<li>If we can only offer a different time, vehicle or price, we send you the proposal and the booking is made only if you accept it.</li>
<li>You must be at least 18 years old to book. Whoever books on behalf of other passengers accepts these terms for them and makes sure their details are correct.</li>
<li>Please check the confirmation. Write to us at once if a date, time, address, flight number or passenger number is wrong: we drive according to the confirmation.</li></ul>`],
      ["Vehicles", `<p>You book a vehicle class, not a specific model or number plate:</p>
<ul><li><strong>Sedan</strong>: up to 3 passengers and 3 suitcases (Skoda Octavia, Toyota Corolla or similar).</li>
<li><strong>Minivan</strong>: up to 7 passengers and 7 suitcases (Mercedes Vito, Ford Tourneo or similar).</li>
<li><strong>Mercedes V-Class</strong>: up to 6 passengers and 6 suitcases.</li>
<li><strong>Minibus</strong>: up to 16 passengers and 16 suitcases (Mercedes Sprinter or similar).</li></ul>
<p>Pictures on the site show examples. We may send a vehicle of the same or a higher class at no extra cost. All vehicles are licensed for commercial passenger transport, insured as Turkish law requires and non-smoking.</p>`],
      ["Prices", `<ul><li>Prices are <strong>fixed per vehicle</strong>, not per person, and are shown in euro before you send the request. The price in your confirmation is the price you pay.</li>
<li>The price includes fuel, motorway, bridge and tunnel tolls, airport parking, the free waiting time below and meet and greet with a name sign.</li>
<li>At busy hours a surcharge may apply; it is always included in the price shown before you book. A booking with a return transfer gets {returnPct}% off the return. A child seat costs €{seat} per seat.</li>
<li>The price changes only if the booking changes: another address, an extra stop or detour, more passengers or luggage than booked, or waiting beyond the free time. The driver or the office tells you the extra cost before it applies.</li>
<li>Traffic, a longer route chosen by the driver or a delayed flight never change the price.</li></ul>`],
      ["Payment", `<ul><li>You pay the <strong>driver in cash at the end of the ride</strong>, in euro, US dollar or Turkish lira at the day's exchange rate. No prepayment, deposit or card details are needed to book.</li>
<li>Companies and partners with a written agreement may pay by bank transfer or on account, as that agreement says.</li>
<li>If you need an invoice, tell us before or right after the ride and give the billing name, address and tax number. Invoices are issued as Turkish law requires.</li></ul>`],
      ["Pickup, meeting point and waiting time", `<ul><li><strong>Airports</strong>: we track your flight. The driver waits in the arrivals area with a sign showing your name. The first <strong>{wait} minutes after your flight actually lands</strong> are free, enough for passport control and baggage.</li>
<li><strong>Cruise port</strong>: the driver waits at the terminal exit; we follow the ship's disembarkation time.</li>
<li><strong>Hotels and other addresses</strong>: the driver waits <strong>15 minutes</strong> after the booked time at the entrance or the place you named.</li>
<li>If you need longer (lost baggage, long queues), write or call us: we keep waiting when we can and tell you if extra waiting is charged.</li>
<li>If the free waiting time is over and we cannot reach you by phone, WhatsApp or e-mail, the driver may leave and the ride counts as a no-show (see cancellation).</li>
<li>For rides to the airport, plan the pickup time with enough margin for traffic and check-in. We recommend at least 3 hours before an international departure; we can advise you when you book.</li></ul>`],
      ["Your duties", `<p>Please give a correct name, a phone number reachable on arrival (WhatsApp if possible), e-mail, flight number, addresses, number of passengers and luggage. Tell us as soon as possible if your flight is cancelled, diverted or rebooked, or if your plans change. We are not responsible for a failed pickup caused by wrong or missing details.</p>`],
      ["Changes by you", `<ul><li>You can change the date, time, address, vehicle or number of passengers <strong>free of charge up to 24 hours before pickup</strong>, by replying to your confirmation e-mail or on WhatsApp.</li>
<li>Later changes are accepted when a suitable vehicle and driver are available. A change can change the price; we tell you the new price before it applies.</li>
<li>A delayed flight with the same flight number is not a change: we follow it automatically.</li></ul>`],
      ["Cancellation and refunds", `<ul><li><strong>Free cancellation up to 24 hours before pickup.</strong> Reply to your confirmation e-mail or write to us on WhatsApp. You receive a cancellation e-mail.</li>
<li>If you cancel less than 24 hours before pickup, or the passenger does not show up without telling us (no-show), we may charge up to the full price of the ride, especially when the driver is already on the way.</li>
<li>If your flight is cancelled and you tell us before the pickup time, we cancel free of charge.</li>
<li>If you have paid anything in advance (for example by bank transfer under a company agreement), we refund amounts not owed within 14 days, by the same payment method.</li>
<li>Because the service is passenger transport on a fixed date, the statutory right of withdrawal for distance contracts does not apply. The free cancellation above takes its place.</li></ul>`],
      ["If we cancel or are late", `<p>If we have to cancel a confirmed booking, we tell you as early as possible and try to arrange another vehicle at the same price. If no replacement can be found you pay nothing, and anything you have paid is refunded in full. If you cannot find your driver, call or write to us on WhatsApp right away so we can help on the spot.</p>`],
      ["Passengers and luggage", `<ul><li>The number of passengers (babies and children included) and suitcases must not exceed the capacity of the booked vehicle. Turkish law does not allow more passengers than seats. If there are more, the driver may refuse the ride or a larger vehicle may be needed at extra cost.</li>
<li>Capacity means one standard suitcase and one small hand bag per passenger. Tell us in advance about bulky items such as golf bags, skis, bicycles, wheelchairs, pushchairs or musical instruments.</li>
<li>Pets travel only if agreed before the ride, in a closed carrier. Please tell us in advance about an assistance dog.</li>
<li>Dangerous, illegal or flammable items are not carried.</li>
<li>Please take all belongings with you. We help to look for lost items but are not liable for items left in the vehicle.</li></ul>`],
      ["Child seats", `<ul><li>Children must travel in a child seat suitable for their age, height and weight, as Turkish traffic rules require. Add the number of child seats in the booking form (€{seat} each) and write the children's ages in the note.</li>
<li>We provide baby seats and booster seats on request. You may also bring your own approved seat.</li>
<li>If a child seat is needed but was not booked, the driver may not be able to take the child, and we cannot be held responsible for the delay.</li>
<li>A parent or accompanying adult is responsible for placing the child in the seat; the driver helps fit the seat.</li></ul>`],
      ["Conduct in the vehicle", `<ul><li>Seat belts must be worn by all passengers. Smoking, including e-cigarettes, is forbidden by Turkish law in commercial vehicles.</li>
<li>The driver may refuse or end a ride if a passenger is violent, abusive, seriously intoxicated or endangers safety. The full price is then due.</li>
<li>Damage or heavy soiling caused by passengers (for example vomiting) may be charged at the documented cost of cleaning or repair.</li></ul>`],
      ["Liability", `<ul><li>We carry out the ride with due care and with drivers who hold the licences required by law. Passengers are covered by the compulsory insurance for commercial passenger transport.</li>
<li>We are not liable for delays or missed flights, ships or appointments caused by events beyond our control, such as traffic accidents, road closures, police checks, severe weather or events, if we acted with due care. We are not liable for indirect losses such as missed connections, hotel nights or business losses, unless caused by our intent or gross negligence.</li>
<li>Our liability for luggage damage is limited to what the law allows; please report damage to the driver right away and to us within 7 days.</li>
<li>Nothing in these terms limits liability for death or personal injury, for intent or gross negligence, or your mandatory rights as a consumer.</li></ul>`],
      ["Force majeure", `<p>Neither party is responsible for failing to perform because of events it cannot control, such as natural disasters, epidemics, war, strikes, official orders, airport or road closures. In that case either side may cancel free of charge and any advance payment is refunded.</p>`],
      ["Complaints", `<p>If something went wrong, write to {email} with your booking reference, ideally within 30 days. We answer within 14 days. As a consumer in Türkiye you may also apply to the consumer arbitration committee (Tüketici Hakem Heyeti) or the consumer court within the legal limits; consumers in the EU may contact their national consumer centre.</p>`],
      ["Law, jurisdiction and changes to these terms", `<p>These terms are governed by the law of the Republic of Türkiye. The courts and enforcement offices of Istanbul are competent, without prejudice to mandatory consumer rules that give you the right to apply to the courts or authorities of your place of residence. We may update these terms; the version in force when you sent your booking applies to that booking. If a clause is invalid, the rest remains valid. These terms are published in several languages; if they differ, the Turkish version prevails.</p>`],
      ["Contact and company details", `{details}`]
    ]
  },
  privacy: {
    title: "Privacy notice",
    desc: "Privacy notice under KVKK and GDPR: what data we collect when you book an Istanbul transfer, why, who receives it, how long we keep it, cookies and your rights.",
    intro: `<p>This notice explains how {company} handles your personal data when you visit {url}, book a transfer or contact us. It is our information notice under Turkish Personal Data Protection Law No. 6698 (KVKK) and, for visitors in the European Union and the UK, under the General Data Protection Regulation (GDPR). See also our {termsLink}.</p>`,
    sections: [
      ["Data controller", `<p>The data controller is {company}, {address}. You can reach us about your data at {email} or {phone}.</p>`],
      ["Data we collect", `<ul><li><strong>Booking details</strong>: name, e-mail, phone or WhatsApp number, pickup and drop-off addresses, date and time, flight or ship details, number of passengers, luggage and child seats, notes for the driver, chosen vehicle and price.</li>
<li><strong>Passenger details for the authorities</strong>: for rides with our own vehicles Turkish law requires us to report passengers to the Ministry of Transport's U-ETDS system. For this we may ask for the name, nationality, gender and passport or Turkish ID number of each passenger.</li>
<li><strong>Unfinished bookings</strong>: if you enter your name, phone or e-mail in the booking form but do not send it, we save what you typed so that our office can contact you once to help you finish the booking.</li>
<li><strong>Messages</strong>: what you write to us by e-mail, WhatsApp, phone or the company application forms (corporate accounts, suppliers, partners).</li>
<li><strong>Technical data</strong>: IP address, browser type, the page you came from, approximate country and city derived from the IP address, and pages viewed. Our own visit counter does not use cookies and does not store your IP address.</li>
<li><strong>Analytics data</strong>: only if you accept analytics cookies, see "Cookies" below.</li></ul>
<p>We do not ask for payment card data, and we do not collect sensitive data (such as health data) except what you choose to tell us, for example that a passenger uses a wheelchair, which we use only to arrange the ride.</p>`],
      ["Why we use your data and on what legal basis", `<ul><li><strong>To make and carry out your transfer</strong>: confirming the booking, sending the voucher, giving the driver what is needed for the pickup, tracking your flight, contacting you about the ride, changes and cancellations. Legal basis: performance of a contract (KVKK art. 5(2)(c); GDPR art. 6(1)(b)).</li>
<li><strong>To meet legal duties</strong>: U-ETDS passenger reporting, invoicing, accounting and tax records, answering requests from authorities. Legal basis: legal obligation (KVKK art. 5(2)(a) and (ç); GDPR art. 6(1)(c)).</li>
<li><strong>To help you finish an unfinished booking, handle complaints, prevent abuse and protect our rights</strong>, and to keep the site secure and count visits without cookies. Legal basis: our legitimate interest (KVKK art. 5(2)(e) and (f); GDPR art. 6(1)(f)).</li>
<li><strong>Analytics cookies</strong>: only with your consent (KVKK art. 5(1); GDPR art. 6(1)(a)), which you can withdraw at any time.</li></ul>
<p>We collect data through the booking form, our e-mail and WhatsApp channels, the phone, our partners who pass on bookings, and automatically through the website. We do not send advertising messages without your separate consent and we do not make decisions about you based solely on automated processing.</p>`],
      ["Who receives your data", `<ul><li>The <strong>driver</strong> and, where a partner carries out the ride, the <strong>licensed transport company</strong>: only what is needed for the ride (name, phone, pickup details, flight, passengers).</li>
<li><strong>Service providers</strong> who process data on our behalf: website hosting (Vercel), database (Upstash), e-mail delivery (Resend), the office's booking notifications (Telegram), flight information (AeroDataBox), our booking management system, and an AI service (Anthropic) that helps the office read booking messages you send us.</li>
<li><strong>Google</strong> (Google Analytics), only if you accept analytics cookies.</li>
<li><strong>Public authorities</strong> where the law requires it, such as the Ministry of Transport (U-ETDS), tax authorities, courts and law enforcement.</li>
<li>Our accountants and lawyers, under a duty of confidentiality, where needed.</li></ul>
<p>We do not sell your data.</p>`],
      ["Transfers abroad", `<p>Some of the service providers above store or process data outside Türkiye, in the European Union or the United States (for example, our website runs on servers in Frankfurt, Germany). We transfer data abroad only as allowed by KVKK art. 9: where the transfer is necessary for the contract with you, under standard contractual clauses notified to the Personal Data Protection Authority, or with another safeguard the law provides. For transfers from the EU we rely on the European Commission's standard contractual clauses or adequacy decisions.</p>`],
      ["How long we keep your data", `<ul><li><strong>Bookings and related messages</strong>: for 10 years after the ride, as Turkish commercial and tax law requires for business records, then deleted or anonymised.</li>
<li><strong>U-ETDS passenger data</strong>: for the period the transport legislation requires.</li>
<li><strong>Unfinished bookings</strong>: deleted automatically after 30 days, or at once when you send the booking.</li>
<li><strong>Links in e-mails</strong> to accept a change: 60 days.</li>
<li><strong>Company application forms</strong>: up to 2 years, or for the duration of any agreement that follows.</li>
<li><strong>Analytics data</strong>: no longer than 14 months in Google Analytics. Visit statistics in our own counter are aggregated and contain no personal data.</li></ul>
<p>Data may be kept longer if needed for a legal dispute. When the retention period ends we delete, destroy or anonymise the data under our retention policy.</p>`],
      ["Cookies and similar technologies", `<ul><li><strong>Necessary storage</strong>: the site keeps your booking-form entries and the page you arrived from in your browser's session storage until you close the tab, so you do not lose what you typed. No consent is needed for this.</li>
<li><strong>Visit counting</strong>: our own counter sends one cookieless request per page view (page, referring site, language); the result is aggregate statistics.</li>
<li><strong>Analytics cookies (Google Analytics)</strong>: set only after you click "Accept" in the cookie banner. They help us see how the site is used. Your choice is saved in your browser; you can change it any time through "Cookie settings" or by clearing your browser data.</li></ul>
<p>We do not use advertising or tracking cookies of social networks.</p>`],
      ["How we protect your data", `<p>Data is sent over encrypted connections (HTTPS). Access to bookings is limited to staff who need it and protected with passwords; drivers see only what they need for the ride. Our service providers are bound by contracts to keep the data confidential and secure. If a data breach occurs, we inform the authorities and you as the law requires.</p>`],
      ["Your rights", `<p>Under KVKK art. 11 you can ask us whether we process your data, get information about it and its purposes, learn who it was shared with in Türkiye or abroad, have incomplete or wrong data corrected, have it deleted or destroyed when the conditions in KVKK art. 7 are met, have the recipients informed of a correction or deletion, object to a result against you arising solely from automated analysis, and claim compensation for damage caused by unlawful processing.</p>
<p>Under the GDPR you also have the right of access, rectification, erasure, restriction of processing, data portability, to object to processing based on our legitimate interest, and to withdraw consent at any time without affecting earlier processing.</p>`],
      ["How to use your rights and complain", `<p>Write to {email} or send a signed letter to {address}, stating your name, contact details and your request; we may ask for proof of identity. We answer free of charge within 30 days. If you are not satisfied you may complain to the Turkish Personal Data Protection Authority (KVKK, www.kvkk.gov.tr) and, if you live in the EU or the UK, to the data protection authority of your country.</p>`],
      ["Children", `<p>Bookings must be made by adults. We process children's data (age, need for a child seat, U-ETDS details) only as part of a booking made by a parent or accompanying adult.</p>`],
      ["Changes to this notice", `<p>We update this notice when our processing changes. The date at the top shows the current version.</p>`],
      ["Contact and company details", `{details}`]
    ]
  }
};
