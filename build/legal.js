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
  ru: {
    terms: {
      title: "Условия обслуживания",
      desc: "Условия заказа, цена, оплата наличными, время ожидания и бесплатная отмена для трансферов из аэропорта Стамбула, заказанных на этом сайте.",
      html: `<p>Эти условия действуют для трансферов, заказанных на этом сайте, которым управляет {company} ({address}), лицензия TÜRSAB {tursab}.</p>
<h2>Заказ</h2><p>Отправка формы — это заявка. Заказ становится обязательным только после того, как мы пришлём письмо с подтверждением. Если мы не можем выполнить заявку, мы сообщим об этом по e-mail.</p>
<h2>Цена и оплата</h2><p>Цена, показанная при заказе, фиксирована за машину и включает платные дороги, парковку и время ожидания, указанное ниже. Оплата — наличными водителю в конце поездки: в евро, долларах США или турецких лирах по курсу дня.</p>
<h2>Время ожидания</h2><p>В аэропортах первые 60 минут после посадки рейса бесплатны. По другим адресам водитель ждёт 15 минут после заказанного времени.</p>
<h2>Изменение и отмена</h2><p>Изменить или отменить заказ можно бесплатно не позднее чем за 24 часа до подачи, ответив на письмо с подтверждением или написав в WhatsApp. Если вы не пришли и не предупредили нас, мы можем попросить оплатить поездку.</p>
<h2>Пассажиры и багаж</h2><p>Число пассажиров и чемоданов должно соответствовать заказанной машине. Для детей нужно детское кресло, его можно добавить при заказе.</p>
<h2>Контакты</h2><p>{email} · {phone}</p>`
    },
    privacy: {
      title: "Политика конфиденциальности",
      desc: "Как мы используем имя, телефон, e-mail и данные рейса, которые вы указываете при заказе трансфера в Стамбуле, и как с нами связаться по этому поводу.",
      html: `<p>{company} обрабатывает персональные данные, которые вы указываете при заказе (имя, e-mail, телефон, номер рейса, адреса, комментарии), только для организации и выполнения трансфера, связи с вами по заказу и выполнения требований турецкого закона о защите персональных данных (KVKK) и учёта пассажиров.</p>
<p>Ваши данные передаются только водителю или партнёру, выполняющему поездку, и поставщикам услуг, которые обеспечивают работу сайта (хостинг, база данных, e-mail). Они хранятся столько, сколько требует закон.</p>
<p>Чтобы получить, исправить или удалить свои данные, напишите на {email}.</p>`
    }
  }
};
