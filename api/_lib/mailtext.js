// Texts of the customer e-mails and of the booking-change page (/booking-change), one set per site language.
// {n} is the customer's name. English is the fallback for any language not listed.
module.exports = {
  en: {
    hi: "Hello {n},",
    rcv_s: "Booking request received", rcv_1: "Thank you for booking with ITB Transfer. We have received your request and will check availability and confirm it by e-mail shortly.", rcv_2: "Your booking is final once you receive our confirmation e-mail.",
    ok_s: "Booking confirmed", ok_1: "Good news: your booking is confirmed. Your transfer details are below.", ok_2: "Our driver will be at the pickup point on time. For airport arrivals we track your flight and wait for you with a name sign.",
    no_s: "About your booking request", no_1: "Unfortunately we cannot accept your booking request.", no_2: "You are welcome to make a new booking on our website, or contact us and we will look for a solution together.",
    ch_s: "Please review a change to your booking", ch_1: "We need to change some details of your booking request. Please review the updated booking below and tell us whether you accept it.", ch_2: "Once you accept, your booking is confirmed automatically. Changed details are highlighted.",
    why: "Reason", note: "Message from our team", acc: "Accept the change", dec: "Decline",
    ref: "Booking number", out: "Outbound", ret: "Return", date: "Date", time: "Time", from: "Pickup", to: "Drop-off", flight: "Flight", pax: "Passengers", bags: "Luggage", car: "Vehicle", seats: "Child seats", baby: "baby seat", booster: "booster seat", total: "Total", pay: "Payment", notel: "Note",
    pays: { nakit: "Cash to the driver", kart: "Card", havale: "Bank transfer", cari: "On account" },
    foot: "Questions? Reply to this e-mail or message us on WhatsApp: +90 541 334 21 02",
    pg_t: "Change to your booking", pg_cur: "Your original request", pg_new: "Updated booking", pg_ok: "Thank you. Your booking is confirmed and we have e-mailed you the details.", pg_dec: "You declined the change. We will contact you shortly to find a solution.", pg_bad: "This link is no longer valid. Please contact us if you have any questions.", pg_err: "Something went wrong. Please try again or message us on WhatsApp.", pg_conf: "This booking is confirmed.", pg_q: "Do you accept the updated booking?"
  },
  tr: {
    hi: "Merhaba {n},",
    rcv_s: "Rezervasyon talebiniz alındı", rcv_1: "ITB Transfer'ı tercih ettiğiniz için teşekkür ederiz. Talebinizi aldık; uygunluğu kontrol edip kısa süre içinde e-posta ile onaylayacağız.", rcv_2: "Rezervasyonunuz, onay e-postamızı aldığınızda kesinleşir.",
    ok_s: "Rezervasyonunuz onaylandı", ok_1: "Rezervasyonunuz onaylandı. Transfer bilgileriniz aşağıdadır.", ok_2: "Şoförümüz alış noktasında zamanında olacak. Havalimanı karşılamalarında uçuşunuzu takip eder, sizi isim tabelasıyla bekleriz.",
    no_s: "Rezervasyon talebiniz hakkında", no_1: "Maalesef rezervasyon talebinizi kabul edemiyoruz.", no_2: "Sitemizden yeni bir rezervasyon yapabilir ya da bize ulaşarak birlikte bir çözüm bulabilirsiniz.",
    ch_s: "Rezervasyonunuzdaki değişikliği onaylayın", ch_1: "Rezervasyon talebinizde bazı bilgileri değiştirmemiz gerekiyor. Lütfen aşağıdaki güncel rezervasyonu inceleyip kabul edip etmediğinizi bize bildirin.", ch_2: "Kabul ettiğinizde rezervasyonunuz otomatik olarak onaylanır. Değişen bilgiler işaretlenmiştir.",
    why: "Neden", note: "Ekibimizden not", acc: "Değişikliği kabul et", dec: "Reddet",
    ref: "Rezervasyon numarası", out: "Gidiş", ret: "Dönüş", date: "Tarih", time: "Saat", from: "Alış yeri", to: "Bırakış yeri", flight: "Uçuş", pax: "Yolcu", bags: "Bavul", car: "Araç", seats: "Çocuk koltuğu", baby: "bebek koltuğu", booster: "yükseltici", total: "Toplam", pay: "Ödeme", notel: "Not",
    pays: { nakit: "Şoföre nakit", kart: "Kart", havale: "Havale / EFT", cari: "Cari hesap" },
    foot: "Sorunuz mu var? Bu e-postayı yanıtlayın ya da WhatsApp'tan yazın: +90 541 334 21 02",
    pg_t: "Rezervasyonunuzda değişiklik", pg_cur: "İlk talebiniz", pg_new: "Güncel rezervasyon", pg_ok: "Teşekkürler. Rezervasyonunuz onaylandı, bilgileri e-posta ile gönderdik.", pg_dec: "Değişikliği kabul etmediniz. Bir çözüm bulmak için kısa süre içinde size ulaşacağız.", pg_bad: "Bu bağlantı artık geçerli değil. Sorularınız için bize ulaşabilirsiniz.", pg_err: "Bir sorun oluştu. Lütfen tekrar deneyin ya da WhatsApp'tan yazın.", pg_conf: "Bu rezervasyon onaylandı.", pg_q: "Güncel rezervasyonu kabul ediyor musunuz?"
  },
  de: {
    hi: "Hallo {n},",
    rcv_s: "Buchungsanfrage erhalten", rcv_1: "Vielen Dank für Ihre Buchung bei ITB Transfer. Wir haben Ihre Anfrage erhalten, prüfen die Verfügbarkeit und bestätigen sie in Kürze per E-Mail.", rcv_2: "Ihre Buchung ist verbindlich, sobald Sie unsere Bestätigungs-E-Mail erhalten.",
    ok_s: "Buchung bestätigt", ok_1: "Ihre Buchung ist bestätigt. Die Details Ihres Transfers finden Sie unten.", ok_2: "Unser Fahrer ist pünktlich am Abholort. Bei Ankünften am Flughafen verfolgen wir Ihren Flug und erwarten Sie mit einem Namensschild.",
    no_s: "Zu Ihrer Buchungsanfrage", no_1: "Leider können wir Ihre Buchungsanfrage nicht annehmen.", no_2: "Sie können gerne eine neue Buchung auf unserer Website vornehmen oder uns kontaktieren, damit wir gemeinsam eine Lösung finden.",
    ch_s: "Bitte prüfen Sie eine Änderung Ihrer Buchung", ch_1: "Wir müssen einige Angaben Ihrer Buchungsanfrage ändern. Bitte prüfen Sie die aktualisierte Buchung unten und teilen Sie uns mit, ob Sie einverstanden sind.", ch_2: "Sobald Sie zustimmen, ist Ihre Buchung automatisch bestätigt. Geänderte Angaben sind hervorgehoben.",
    why: "Grund", note: "Nachricht von unserem Team", acc: "Änderung annehmen", dec: "Ablehnen",
    ref: "Buchungsnummer", out: "Hinfahrt", ret: "Rückfahrt", date: "Datum", time: "Uhrzeit", from: "Abholort", to: "Zielort", flight: "Flug", pax: "Personen", bags: "Gepäck", car: "Fahrzeug", seats: "Kindersitze", baby: "Babysitz", booster: "Sitzerhöhung", total: "Gesamt", pay: "Zahlung", notel: "Hinweis",
    pays: { nakit: "Bar beim Fahrer", kart: "Karte", havale: "Überweisung" },
    foot: "Fragen? Antworten Sie auf diese E-Mail oder schreiben Sie uns auf WhatsApp: +90 541 334 21 02",
    pg_t: "Änderung Ihrer Buchung", pg_cur: "Ihre ursprüngliche Anfrage", pg_new: "Aktualisierte Buchung", pg_ok: "Vielen Dank. Ihre Buchung ist bestätigt, die Details haben wir Ihnen per E-Mail geschickt.", pg_dec: "Sie haben die Änderung abgelehnt. Wir melden uns in Kürze, um eine Lösung zu finden.", pg_bad: "Dieser Link ist nicht mehr gültig. Bei Fragen kontaktieren Sie uns bitte.", pg_err: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie uns auf WhatsApp.", pg_conf: "Diese Buchung ist bestätigt.", pg_q: "Nehmen Sie die aktualisierte Buchung an?"
  },
  fr: {
    hi: "Bonjour {n},",
    rcv_s: "Demande de réservation reçue", rcv_1: "Merci d'avoir réservé avec ITB Transfer. Nous avons bien reçu votre demande ; nous vérifions la disponibilité et vous la confirmerons très vite par e-mail.", rcv_2: "Votre réservation est définitive dès réception de notre e-mail de confirmation.",
    ok_s: "Réservation confirmée", ok_1: "Votre réservation est confirmée. Vous trouverez le détail de votre transfert ci-dessous.", ok_2: "Notre chauffeur sera au point de prise en charge à l'heure. Pour les arrivées à l'aéroport, nous suivons votre vol et vous attendons avec une pancarte à votre nom.",
    no_s: "À propos de votre demande de réservation", no_1: "Nous sommes désolés, nous ne pouvons pas accepter votre demande de réservation.", no_2: "Vous pouvez faire une nouvelle réservation sur notre site ou nous contacter pour trouver ensemble une solution.",
    ch_s: "Merci de vérifier une modification de votre réservation", ch_1: "Nous devons modifier certains détails de votre demande de réservation. Merci de vérifier la réservation mise à jour ci-dessous et de nous dire si vous l'acceptez.", ch_2: "Dès que vous acceptez, votre réservation est confirmée automatiquement. Les éléments modifiés sont mis en évidence.",
    why: "Motif", note: "Message de notre équipe", acc: "Accepter la modification", dec: "Refuser",
    ref: "Numéro de réservation", out: "Aller", ret: "Retour", date: "Date", time: "Heure", from: "Prise en charge", to: "Dépose", flight: "Vol", pax: "Passagers", bags: "Bagages", car: "Véhicule", seats: "Sièges enfant", baby: "siège bébé", booster: "rehausseur", total: "Total", pay: "Paiement", notel: "Remarque",
    pays: { nakit: "Espèces au chauffeur", kart: "Carte", havale: "Virement bancaire" },
    foot: "Des questions ? Répondez à cet e-mail ou écrivez-nous sur WhatsApp : +90 541 334 21 02",
    pg_t: "Modification de votre réservation", pg_cur: "Votre demande initiale", pg_new: "Réservation mise à jour", pg_ok: "Merci. Votre réservation est confirmée et nous vous en avons envoyé le détail par e-mail.", pg_dec: "Vous avez refusé la modification. Nous vous contacterons rapidement pour trouver une solution.", pg_bad: "Ce lien n'est plus valide. Contactez-nous si vous avez des questions.", pg_err: "Une erreur s'est produite. Réessayez ou écrivez-nous sur WhatsApp.", pg_conf: "Cette réservation est confirmée.", pg_q: "Acceptez-vous la réservation mise à jour ?"
  },
  it: {
    hi: "Buongiorno {n},",
    rcv_s: "Richiesta di prenotazione ricevuta", rcv_1: "Grazie per aver prenotato con ITB Transfer. Abbiamo ricevuto la sua richiesta: verifichiamo la disponibilità e la confermeremo a breve via e-mail.", rcv_2: "La prenotazione è definitiva quando riceve la nostra e-mail di conferma.",
    ok_s: "Prenotazione confermata", ok_1: "La sua prenotazione è confermata. Trova i dettagli del transfer qui sotto.", ok_2: "Il nostro autista sarà puntuale al punto di partenza. Per gli arrivi in aeroporto seguiamo il suo volo e la aspettiamo con un cartello con il suo nome.",
    no_s: "Sulla sua richiesta di prenotazione", no_1: "Purtroppo non possiamo accettare la sua richiesta di prenotazione.", no_2: "Può effettuare una nuova prenotazione sul nostro sito oppure contattarci per trovare insieme una soluzione.",
    ch_s: "Verifichi una modifica alla sua prenotazione", ch_1: "Dobbiamo modificare alcuni dettagli della sua richiesta di prenotazione. Controlli la prenotazione aggiornata qui sotto e ci dica se la accetta.", ch_2: "Quando accetta, la prenotazione viene confermata automaticamente. I dati modificati sono evidenziati.",
    why: "Motivo", note: "Messaggio del nostro team", acc: "Accetta la modifica", dec: "Rifiuta",
    ref: "Numero di prenotazione", out: "Andata", ret: "Ritorno", date: "Data", time: "Ora", from: "Partenza", to: "Arrivo", flight: "Volo", pax: "Passeggeri", bags: "Bagagli", car: "Veicolo", seats: "Seggiolini", baby: "seggiolino neonato", booster: "rialzo", total: "Totale", pay: "Pagamento", notel: "Nota",
    pays: { nakit: "Contanti all'autista", kart: "Carta", havale: "Bonifico" },
    foot: "Domande? Risponda a questa e-mail o ci scriva su WhatsApp: +90 541 334 21 02",
    pg_t: "Modifica alla sua prenotazione", pg_cur: "La sua richiesta originale", pg_new: "Prenotazione aggiornata", pg_ok: "Grazie. La prenotazione è confermata e le abbiamo inviato i dettagli via e-mail.", pg_dec: "Ha rifiutato la modifica. La contatteremo a breve per trovare una soluzione.", pg_bad: "Questo link non è più valido. Ci contatti se ha domande.", pg_err: "Qualcosa è andato storto. Riprovi o ci scriva su WhatsApp.", pg_conf: "Questa prenotazione è confermata.", pg_q: "Accetta la prenotazione aggiornata?"
  },
  es: {
    hi: "Hola {n}:",
    rcv_s: "Solicitud de reserva recibida", rcv_1: "Gracias por reservar con ITB Transfer. Hemos recibido su solicitud; comprobaremos la disponibilidad y se la confirmaremos en breve por e-mail.", rcv_2: "Su reserva es definitiva cuando reciba nuestro e-mail de confirmación.",
    ok_s: "Reserva confirmada", ok_1: "Su reserva está confirmada. Abajo tiene los datos de su traslado.", ok_2: "Nuestro conductor estará puntual en el punto de recogida. En las llegadas al aeropuerto seguimos su vuelo y le esperamos con un cartel con su nombre.",
    no_s: "Sobre su solicitud de reserva", no_1: "Lamentablemente no podemos aceptar su solicitud de reserva.", no_2: "Puede hacer una nueva reserva en nuestra web o contactarnos para buscar juntos una solución.",
    ch_s: "Revise un cambio en su reserva", ch_1: "Necesitamos cambiar algunos datos de su solicitud de reserva. Revise la reserva actualizada y díganos si la acepta.", ch_2: "Cuando la acepte, su reserva quedará confirmada automáticamente. Los datos modificados están resaltados.",
    why: "Motivo", note: "Mensaje de nuestro equipo", acc: "Aceptar el cambio", dec: "Rechazar",
    ref: "Número de reserva", out: "Ida", ret: "Vuelta", date: "Fecha", time: "Hora", from: "Recogida", to: "Destino", flight: "Vuelo", pax: "Pasajeros", bags: "Equipaje", car: "Vehículo", seats: "Sillas infantiles", baby: "silla de bebé", booster: "elevador", total: "Total", pay: "Pago", notel: "Nota",
    pays: { nakit: "Efectivo al conductor", kart: "Tarjeta", havale: "Transferencia bancaria" },
    foot: "¿Preguntas? Responda a este e-mail o escríbanos por WhatsApp: +90 541 334 21 02",
    pg_t: "Cambio en su reserva", pg_cur: "Su solicitud original", pg_new: "Reserva actualizada", pg_ok: "Gracias. Su reserva está confirmada y le hemos enviado los datos por e-mail.", pg_dec: "Ha rechazado el cambio. Nos pondremos en contacto con usted en breve para buscar una solución.", pg_bad: "Este enlace ya no es válido. Contáctenos si tiene alguna pregunta.", pg_err: "Algo salió mal. Inténtelo de nuevo o escríbanos por WhatsApp.", pg_conf: "Esta reserva está confirmada.", pg_q: "¿Acepta la reserva actualizada?"
  },
  nl: {
    hi: "Hallo {n},",
    rcv_s: "Boekingsaanvraag ontvangen", rcv_1: "Bedankt voor uw boeking bij ITB Transfer. We hebben uw aanvraag ontvangen, controleren de beschikbaarheid en bevestigen die binnenkort per e-mail.", rcv_2: "Uw boeking is definitief zodra u onze bevestigingsmail ontvangt.",
    ok_s: "Boeking bevestigd", ok_1: "Uw boeking is bevestigd. Hieronder vindt u de gegevens van uw transfer.", ok_2: "Onze chauffeur staat op tijd op de ophaalplek. Bij aankomst op de luchthaven volgen we uw vlucht en wachten we u op met een naambord.",
    no_s: "Over uw boekingsaanvraag", no_1: "Helaas kunnen we uw boekingsaanvraag niet accepteren.", no_2: "U kunt een nieuwe boeking maken op onze website of contact met ons opnemen, dan zoeken we samen naar een oplossing.",
    ch_s: "Controleer een wijziging in uw boeking", ch_1: "We moeten enkele gegevens van uw boekingsaanvraag wijzigen. Bekijk de bijgewerkte boeking hieronder en laat ons weten of u akkoord gaat.", ch_2: "Zodra u akkoord gaat, is uw boeking automatisch bevestigd. Gewijzigde gegevens zijn gemarkeerd.",
    why: "Reden", note: "Bericht van ons team", acc: "Wijziging accepteren", dec: "Weigeren",
    ref: "Boekingsnummer", out: "Heenreis", ret: "Terugreis", date: "Datum", time: "Tijd", from: "Ophaalplek", to: "Bestemming", flight: "Vlucht", pax: "Passagiers", bags: "Bagage", car: "Voertuig", seats: "Kinderzitjes", baby: "babyzitje", booster: "zittingverhoger", total: "Totaal", pay: "Betaling", notel: "Opmerking",
    pays: { nakit: "Contant aan de chauffeur", kart: "Kaart", havale: "Bankoverschrijving" },
    foot: "Vragen? Beantwoord deze e-mail of stuur ons een bericht via WhatsApp: +90 541 334 21 02",
    pg_t: "Wijziging in uw boeking", pg_cur: "Uw oorspronkelijke aanvraag", pg_new: "Bijgewerkte boeking", pg_ok: "Bedankt. Uw boeking is bevestigd en we hebben u de gegevens gemaild.", pg_dec: "U heeft de wijziging geweigerd. We nemen binnenkort contact met u op om een oplossing te vinden.", pg_bad: "Deze link is niet meer geldig. Neem contact met ons op als u vragen heeft.", pg_err: "Er ging iets mis. Probeer het opnieuw of stuur ons een bericht via WhatsApp.", pg_conf: "Deze boeking is bevestigd.", pg_q: "Gaat u akkoord met de bijgewerkte boeking?"
  },
  ro: {
    hi: "Bună ziua {n},",
    rcv_s: "Cererea de rezervare a fost primită", rcv_1: "Vă mulțumim că ați rezervat la ITB Transfer. Am primit cererea dumneavoastră; verificăm disponibilitatea și o vom confirma în curând prin e-mail.", rcv_2: "Rezervarea este definitivă după ce primiți e-mailul nostru de confirmare.",
    ok_s: "Rezervare confirmată", ok_1: "Rezervarea dumneavoastră este confirmată. Detaliile transferului sunt mai jos.", ok_2: "Șoferul nostru va fi la punctul de preluare la timp. La sosirile în aeroport urmărim zborul și vă așteptăm cu o pancartă cu numele dumneavoastră.",
    no_s: "Despre cererea dumneavoastră de rezervare", no_1: "Din păcate, nu putem accepta cererea dumneavoastră de rezervare.", no_2: "Puteți face o nouă rezervare pe site-ul nostru sau ne puteți contacta pentru a găsi împreună o soluție.",
    ch_s: "Vă rugăm să verificați o modificare a rezervării", ch_1: "Trebuie să modificăm câteva detalii ale cererii dumneavoastră de rezervare. Vă rugăm să verificați rezervarea actualizată de mai jos și să ne spuneți dacă o acceptați.", ch_2: "După ce acceptați, rezervarea este confirmată automat. Detaliile modificate sunt evidențiate.",
    why: "Motiv", note: "Mesaj de la echipa noastră", acc: "Accept modificarea", dec: "Refuz",
    ref: "Număr rezervare", out: "Dus", ret: "Retur", date: "Data", time: "Ora", from: "Preluare", to: "Destinație", flight: "Zbor", pax: "Pasageri", bags: "Bagaje", car: "Vehicul", seats: "Scaune copii", baby: "scaun bebeluș", booster: "înălțător", total: "Total", pay: "Plată", notel: "Notă",
    pays: { nakit: "Numerar la șofer", kart: "Card", havale: "Transfer bancar" },
    foot: "Întrebări? Răspundeți la acest e-mail sau scrieți-ne pe WhatsApp: +90 541 334 21 02",
    pg_t: "Modificare a rezervării", pg_cur: "Cererea inițială", pg_new: "Rezervarea actualizată", pg_ok: "Vă mulțumim. Rezervarea este confirmată și v-am trimis detaliile prin e-mail.", pg_dec: "Ați refuzat modificarea. Vă vom contacta în curând pentru a găsi o soluție.", pg_bad: "Acest link nu mai este valabil. Contactați-ne dacă aveți întrebări.", pg_err: "Ceva nu a mers. Încercați din nou sau scrieți-ne pe WhatsApp.", pg_conf: "Această rezervare este confirmată.", pg_q: "Acceptați rezervarea actualizată?"
  },
  ru: {
    hi: "Здравствуйте, {n}!",
    rcv_s: "Заявка на бронирование получена", rcv_1: "Спасибо, что выбрали ITB Transfer. Мы получили вашу заявку, проверим наличие машин и вскоре подтвердим бронирование по e-mail.", rcv_2: "Бронирование становится окончательным после нашего письма с подтверждением.",
    ok_s: "Бронирование подтверждено", ok_1: "Ваше бронирование подтверждено. Детали трансфера ниже.", ok_2: "Наш водитель будет в месте посадки вовремя. При встрече в аэропорту мы отслеживаем ваш рейс и ждём вас с табличкой с вашим именем.",
    no_s: "О вашей заявке на бронирование", no_1: "К сожалению, мы не можем принять вашу заявку на бронирование.", no_2: "Вы можете оформить новое бронирование на нашем сайте или связаться с нами, и мы вместе найдём решение.",
    ch_s: "Пожалуйста, проверьте изменение в бронировании", ch_1: "Нам нужно изменить некоторые данные вашей заявки. Пожалуйста, проверьте обновлённое бронирование ниже и сообщите, согласны ли вы.", ch_2: "Как только вы согласитесь, бронирование будет подтверждено автоматически. Изменённые данные выделены.",
    why: "Причина", note: "Сообщение от нашей команды", acc: "Принять изменение", dec: "Отклонить",
    ref: "Номер бронирования", out: "Туда", ret: "Обратно", date: "Дата", time: "Время", from: "Откуда", to: "Куда", flight: "Рейс", pax: "Пассажиры", bags: "Багаж", car: "Автомобиль", seats: "Детские кресла", baby: "детское кресло", booster: "бустер", total: "Итого", pay: "Оплата", notel: "Примечание",
    pays: { nakit: "Наличными водителю", kart: "Картой", havale: "Банковский перевод" },
    foot: "Есть вопросы? Ответьте на это письмо или напишите нам в WhatsApp: +90 541 334 21 02",
    pg_t: "Изменение в бронировании", pg_cur: "Ваша исходная заявка", pg_new: "Обновлённое бронирование", pg_ok: "Спасибо. Ваше бронирование подтверждено, детали мы отправили на e-mail.", pg_dec: "Вы отклонили изменение. Мы скоро свяжемся с вами, чтобы найти решение.", pg_bad: "Эта ссылка больше не действительна. Свяжитесь с нами, если у вас есть вопросы.", pg_err: "Что-то пошло не так. Попробуйте ещё раз или напишите нам в WhatsApp.", pg_conf: "Это бронирование подтверждено.", pg_q: "Вы принимаете обновлённое бронирование?"
  },
  el: {
    hi: "Γεια σας {n},",
    rcv_s: "Το αίτημα κράτησης ελήφθη", rcv_1: "Σας ευχαριστούμε που κάνατε κράτηση στην ITB Transfer. Λάβαμε το αίτημά σας· θα ελέγξουμε τη διαθεσιμότητα και θα το επιβεβαιώσουμε σύντομα με e-mail.", rcv_2: "Η κράτησή σας οριστικοποιείται μόλις λάβετε το e-mail επιβεβαίωσης.",
    ok_s: "Η κράτηση επιβεβαιώθηκε", ok_1: "Η κράτησή σας επιβεβαιώθηκε. Τα στοιχεία της μεταφοράς σας είναι παρακάτω.", ok_2: "Ο οδηγός μας θα βρίσκεται στο σημείο παραλαβής στην ώρα του. Στις αφίξεις στο αεροδρόμιο παρακολουθούμε την πτήση σας και σας περιμένουμε με πινακίδα με το όνομά σας.",
    no_s: "Σχετικά με το αίτημα κράτησής σας", no_1: "Δυστυχώς δεν μπορούμε να δεχτούμε το αίτημα κράτησής σας.", no_2: "Μπορείτε να κάνετε νέα κράτηση στον ιστότοπό μας ή να επικοινωνήσετε μαζί μας για να βρούμε μαζί μια λύση.",
    ch_s: "Ελέγξτε μια αλλαγή στην κράτησή σας", ch_1: "Πρέπει να αλλάξουμε ορισμένα στοιχεία του αιτήματος κράτησής σας. Ελέγξτε την ενημερωμένη κράτηση παρακάτω και πείτε μας αν τη δέχεστε.", ch_2: "Μόλις αποδεχτείτε, η κράτησή σας επιβεβαιώνεται αυτόματα. Τα στοιχεία που άλλαξαν είναι επισημασμένα.",
    why: "Αιτία", note: "Μήνυμα από την ομάδα μας", acc: "Αποδοχή της αλλαγής", dec: "Απόρριψη",
    ref: "Αριθμός κράτησης", out: "Μετάβαση", ret: "Επιστροφή", date: "Ημερομηνία", time: "Ώρα", from: "Παραλαβή", to: "Προορισμός", flight: "Πτήση", pax: "Επιβάτες", bags: "Αποσκευές", car: "Όχημα", seats: "Παιδικά καθίσματα", baby: "κάθισμα μωρού", booster: "κάθισμα ανύψωσης", total: "Σύνολο", pay: "Πληρωμή", notel: "Σημείωση",
    pays: { nakit: "Μετρητά στον οδηγό", kart: "Κάρτα", havale: "Τραπεζική μεταφορά" },
    foot: "Ερωτήσεις; Απαντήστε σε αυτό το e-mail ή γράψτε μας στο WhatsApp: +90 541 334 21 02",
    pg_t: "Αλλαγή στην κράτησή σας", pg_cur: "Το αρχικό σας αίτημα", pg_new: "Ενημερωμένη κράτηση", pg_ok: "Ευχαριστούμε. Η κράτησή σας επιβεβαιώθηκε και σας στείλαμε τα στοιχεία με e-mail.", pg_dec: "Απορρίψατε την αλλαγή. Θα επικοινωνήσουμε σύντομα μαζί σας για να βρούμε λύση.", pg_bad: "Αυτός ο σύνδεσμος δεν ισχύει πλέον. Επικοινωνήστε μαζί μας για οποιαδήποτε ερώτηση.", pg_err: "Κάτι πήγε στραβά. Δοκιμάστε ξανά ή γράψτε μας στο WhatsApp.", pg_conf: "Αυτή η κράτηση έχει επιβεβαιωθεί.", pg_q: "Αποδέχεστε την ενημερωμένη κράτηση;"
  },
  sr: {
    hi: "Zdravo {n},",
    rcv_s: "Zahtev za rezervaciju je primljen", rcv_1: "Hvala što ste rezervisali kod ITB Transfer. Primili smo vaš zahtev; proverićemo raspoloživost i uskoro ga potvrditi e-mailom.", rcv_2: "Rezervacija je konačna kada dobijete naš e-mail sa potvrdom.",
    ok_s: "Rezervacija je potvrđena", ok_1: "Vaša rezervacija je potvrđena. Detalji transfera su u nastavku.", ok_2: "Naš vozač će biti na mestu preuzimanja na vreme. Pri dolasku na aerodrom pratimo vaš let i čekamo vas sa tablom sa vašim imenom.",
    no_s: "O vašem zahtevu za rezervaciju", no_1: "Nažalost, ne možemo da prihvatimo vaš zahtev za rezervaciju.", no_2: "Možete napraviti novu rezervaciju na našem sajtu ili nas kontaktirati da zajedno nađemo rešenje.",
    ch_s: "Proverite izmenu vaše rezervacije", ch_1: "Moramo da izmenimo neke podatke vašeg zahteva za rezervaciju. Pogledajte ažuriranu rezervaciju u nastavku i javite nam da li je prihvatate.", ch_2: "Kada prihvatite, rezervacija se automatski potvrđuje. Izmenjeni podaci su označeni.",
    why: "Razlog", note: "Poruka našeg tima", acc: "Prihvatam izmenu", dec: "Odbijam",
    ref: "Broj rezervacije", out: "Odlazak", ret: "Povratak", date: "Datum", time: "Vreme", from: "Preuzimanje", to: "Odredište", flight: "Let", pax: "Putnici", bags: "Prtljag", car: "Vozilo", seats: "Dečja sedišta", baby: "sedište za bebe", booster: "podizač", total: "Ukupno", pay: "Plaćanje", notel: "Napomena",
    pays: { nakit: "Gotovina vozaču", kart: "Kartica", havale: "Bankovni prenos" },
    foot: "Pitanja? Odgovorite na ovaj e-mail ili nam pišite na WhatsApp: +90 541 334 21 02",
    pg_t: "Izmena vaše rezervacije", pg_cur: "Vaš prvobitni zahtev", pg_new: "Ažurirana rezervacija", pg_ok: "Hvala. Rezervacija je potvrđena i poslali smo vam detalje e-mailom.", pg_dec: "Odbili ste izmenu. Uskoro ćemo vas kontaktirati da nađemo rešenje.", pg_bad: "Ovaj link više ne važi. Kontaktirajte nas ako imate pitanja.", pg_err: "Nešto nije u redu. Pokušajte ponovo ili nam pišite na WhatsApp.", pg_conf: "Ova rezervacija je potvrđena.", pg_q: "Da li prihvatate ažuriranu rezervaciju?"
  },
  ar: {
    hi: "مرحبًا {n}،",
    rcv_s: "تم استلام طلب الحجز", rcv_1: "شكرًا لحجزك مع ITB Transfer. استلمنا طلبك، وسنتحقق من التوفر ونؤكده لك قريبًا عبر البريد الإلكتروني.", rcv_2: "يصبح الحجز نهائيًا عند وصول رسالة التأكيد منا.",
    ok_s: "تم تأكيد الحجز", ok_1: "تم تأكيد حجزك. تجد تفاصيل التوصيلة أدناه.", ok_2: "سيكون سائقنا في نقطة الانطلاق في الموعد. عند الوصول إلى المطار نتابع رحلتك وننتظرك بلوحة تحمل اسمك.",
    no_s: "بخصوص طلب الحجز", no_1: "نأسف، لا يمكننا قبول طلب الحجز الخاص بك.", no_2: "يمكنك إجراء حجز جديد على موقعنا أو التواصل معنا لنجد حلًا معًا.",
    ch_s: "يرجى مراجعة تعديل على حجزك", ch_1: "نحتاج إلى تعديل بعض تفاصيل طلب الحجز. يرجى مراجعة الحجز المحدّث أدناه وإخبارنا إن كنت توافق عليه.", ch_2: "عند موافقتك يتم تأكيد الحجز تلقائيًا. التفاصيل المعدّلة مميزة.",
    why: "السبب", note: "رسالة من فريقنا", acc: "قبول التعديل", dec: "رفض",
    ref: "رقم الحجز", out: "الذهاب", ret: "العودة", date: "التاريخ", time: "الوقت", from: "مكان الانطلاق", to: "الوجهة", flight: "الرحلة", pax: "الركاب", bags: "الحقائب", car: "السيارة", seats: "مقاعد الأطفال", baby: "مقعد رضيع", booster: "مقعد رافع", total: "المجموع", pay: "الدفع", notel: "ملاحظة",
    pays: { nakit: "نقدًا للسائق", kart: "بطاقة", havale: "تحويل بنكي" },
    foot: "لديك سؤال؟ رد على هذه الرسالة أو راسلنا على واتساب: ‎+90 541 334 21 02",
    pg_t: "تعديل على حجزك", pg_cur: "طلبك الأصلي", pg_new: "الحجز المحدّث", pg_ok: "شكرًا. تم تأكيد حجزك وأرسلنا التفاصيل إلى بريدك الإلكتروني.", pg_dec: "لقد رفضت التعديل. سنتواصل معك قريبًا لإيجاد حل.", pg_bad: "هذا الرابط لم يعد صالحًا. تواصل معنا إن كان لديك أي سؤال.", pg_err: "حدث خطأ ما. حاول مرة أخرى أو راسلنا على واتساب.", pg_conf: "هذا الحجز مؤكد.", pg_q: "هل توافق على الحجز المحدّث؟"
  }
};
