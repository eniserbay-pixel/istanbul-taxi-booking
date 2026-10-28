// "Company" pages (footer): four application forms whose answers go to the panel (Başvurular) through
// api/apply.js. kind = the form's `kind` there. Each form lists its fields; a field is
// [name, type, required, options] with type text | email | tel | url | number | select | checks | textarea.
const FORMS = {
  corporate: [["company", "text", 1], ["sector", "text"], ["name", "text", 1], ["role", "text"], ["email", "email", 1], ["phone", "tel", 1],
    ["volume", "select", 0, ["lt10", "10to50", "gt50"]], ["msg", "textarea"]],
  supplier: [["stype", "select", 1, ["company", "driver"]], ["company", "text"], ["name", "text", 1], ["phone", "tel", 1], ["email", "email"], ["city", "text", 1],
    ["fleet", "number"], ["classes", "checks", 0, ["sedan", "minivan", "vclass", "minibus"]], ["docs", "checks", 0, ["d2", "src", "psy", "tursab"]], ["msg", "textarea"]],
  b2b: [["company", "text", 1], ["ctype", "select", 0, ["agency", "operator", "hotel", "platform", "other"]], ["country", "text"], ["website", "url"],
    ["name", "text", 1], ["email", "email", 1], ["phone", "tel", 1], ["volume", "select", 0, ["lt10", "10to50", "gt50"]], ["msg", "textarea"]],
  partner: [["ptype", "select", 1, ["hotel", "guide", "influencer", "blog", "other"]], ["company", "text"], ["name", "text", 1], ["email", "email", 1], ["phone", "tel", 1],
    ["website", "url"], ["msg", "textarea"]]
};
const ORDER = ["corporate", "supplier", "b2b", "partner"];
const SLUG = { corporate: "corporate-accounts", supplier: "become-a-supplier", b2b: "b2b", partner: "partnerships" };
const path = (lang, kind) => (lang === "en" ? "" : "/" + lang) + "/company/" + SLUG[kind];

const T = {
  en: {
    head: "Company",
    labels: { company: "Company", sector: "Industry", name: "Full name", role: "Position", email: "E-mail", phone: "Phone (with country code)", volume: "Transfers per month",
      stype: "I am", city: "District / city", fleet: "Number of vehicles", classes: "Vehicle types", docs: "Documents", ctype: "Business type", country: "Country / city",
      website: "Website or profile", ptype: "Partnership type", msg: "Message" },
    opts: { lt10: "Under 10", "10to50": "10–50", gt50: "More than 50", company: "A transport company", driver: "A driver with my own car",
      sedan: "Sedan", minivan: "Minivan", vclass: "Mercedes V-Class", minibus: "Minibus", d2: "D2 licence", src: "SRC", psy: "Psychotechnical certificate", tursab: "TÜRSAB",
      agency: "Travel agency", operator: "Tour operator / DMC", hotel: "Hotel", platform: "Online platform", other: "Other", guide: "Tour guide", influencer: "Influencer / creator", blog: "Travel blog or website" },
    send: "Send application", ok: "Thank you! We received your application and will contact you within one working day.",
    err: "We could not send your application. Please try again or write to us on WhatsApp.", req: "Please fill in the required fields.", wa: "WhatsApp",
    pages: {
      corporate: { nav: "Corporate accounts", title: "Corporate Transfer Accounts in Istanbul · {brand}", desc: "Airport and city transfers for your company's staff and guests in Istanbul: fixed prices, monthly invoicing and one contact. Apply for a corporate account.",
        h1: "Corporate transfer accounts", lead: "Book airport and city transfers for your employees, visitors and clients with one account, fixed prices and one monthly invoice.",
        points: ["Fixed prices per car, agreed in advance", "Monthly invoice instead of cash in the car", "One contact person for all bookings, 24/7", "Name sign, flight tracking and licensed drivers"] },
      supplier: { nav: "Become a supplier", title: "Become a Transfer Supplier in Istanbul · {brand}", desc: "Transport companies and drivers with their own car: get regular airport transfer work in Istanbul from ITB Transfer. Apply in two minutes.",
        h1: "Drive with us", lead: "Transport companies and drivers with their own licensed vehicle: get regular airport and city transfer work in Istanbul.",
        points: ["Regular bookings from IST, SAW and Galataport", "Clear prices per transfer, paid on time", "Work at the hours that suit you", "Licensed vehicles (D2) and professional drivers only"] },
      b2b: { nav: "B2B for agencies", title: "B2B Transfer Partnership for Agencies · {brand}", desc: "Travel agencies, tour operators, hotels and platforms: book Istanbul airport transfers at net B2B prices on your own partner page. Apply now.",
        h1: "B2B transfers for agencies", lead: "Travel agencies, tour operators, hotels and online platforms: book Istanbul transfers for your guests at net prices on your own partner page.",
        points: ["Net B2B prices for every route and car", "Your own booking page with your bookings and invoices", "Your guests met with a name sign, 24/7", "Cash collected from guests if you wish"] },
      partner: { nav: "Partnerships", title: "Partnerships · Hotels, Guides and Creators · {brand}", desc: "Hotels, tour guides, influencers and travel sites: recommend ITB Transfer to your guests and readers and earn on every booking. Apply for a partnership.",
        h1: "Work together with us", lead: "Hotels, tour guides, influencers and travel websites: recommend our transfers to your guests and readers and earn on every booking.",
        points: ["A commission or special price on every booking", "A booking link with your name", "Fast answers for your guests on WhatsApp", "Fixed prices your guests can trust"] }
    }
  },
  ru: {
    head: "Компания",
    labels: { company: "Компания", sector: "Сфера деятельности", name: "Имя и фамилия", role: "Должность", email: "E-mail", phone: "Телефон (с кодом страны)", volume: "Трансферов в месяц",
      stype: "Я", city: "Район / город", fleet: "Количество машин", classes: "Типы машин", docs: "Документы", ctype: "Вид деятельности", country: "Страна / город",
      website: "Сайт или профиль", ptype: "Вид сотрудничества", msg: "Сообщение" },
    opts: { lt10: "Меньше 10", "10to50": "10–50", gt50: "Больше 50", company: "Транспортная компания", driver: "Водитель со своей машиной",
      sedan: "Седан", minivan: "Минивэн", vclass: "Mercedes V-Class", minibus: "Микроавтобус", d2: "Лицензия D2", src: "SRC", psy: "Психотехнический сертификат", tursab: "TÜRSAB",
      agency: "Турагентство", operator: "Туроператор / DMC", hotel: "Отель", platform: "Онлайн-платформа", other: "Другое", guide: "Гид", influencer: "Блогер / автор", blog: "Сайт о путешествиях" },
    send: "Отправить заявку", ok: "Спасибо! Мы получили вашу заявку и свяжемся с вами в течение одного рабочего дня.",
    err: "Не удалось отправить заявку. Попробуйте ещё раз или напишите нам в WhatsApp.", req: "Заполните обязательные поля.", wa: "WhatsApp",
    pages: {
      corporate: { nav: "Корпоративным клиентам", title: "Корпоративные трансферы в Стамбуле · {brand}", desc: "Трансферы из аэропорта и по городу для сотрудников и гостей вашей компании в Стамбуле: фиксированные цены, ежемесячный счёт, один контакт.",
        h1: "Корпоративный аккаунт", lead: "Заказывайте трансферы для сотрудников, гостей и клиентов через один аккаунт, по фиксированным ценам и с одним счётом в месяц.",
        points: ["Фиксированные цены за машину, согласованные заранее", "Ежемесячный счёт вместо оплаты наличными", "Один контакт для всех заказов, 24/7", "Табличка с именем, отслеживание рейса, лицензированные водители"] },
      supplier: { nav: "Стать перевозчиком", title: "Станьте перевозчиком в Стамбуле · {brand}", desc: "Транспортные компании и водители со своей машиной: получайте регулярные заказы на трансферы из аэропортов Стамбула от ITB Transfer.",
        h1: "Работайте с нами", lead: "Транспортные компании и водители с собственной лицензированной машиной: регулярные заказы на трансферы из аэропортов и по Стамбулу.",
        points: ["Регулярные заказы из IST, SAW и Галатапорта", "Понятная цена за трансфер и оплата вовремя", "Работа в удобные часы", "Только лицензированные машины (D2) и профессиональные водители"] },
      b2b: { nav: "B2B для агентств", title: "B2B-трансферы для турагентств · {brand}", desc: "Турагентства, туроператоры, отели и платформы: заказывайте трансферы в Стамбуле по нетто-ценам на собственной партнёрской странице.",
        h1: "B2B-трансферы для агентств", lead: "Турагентства, туроператоры, отели и онлайн-платформы: заказывайте трансферы для гостей по нетто-ценам на своей партнёрской странице.",
        points: ["Нетто-цены B2B на все маршруты и машины", "Своя страница с заказами и счетами", "Встреча гостей с табличкой, 24/7", "Сбор оплаты с гостей по желанию"] },
      partner: { nav: "Сотрудничество", title: "Сотрудничество: отели, гиды и блогеры · {brand}", desc: "Отели, гиды, блогеры и сайты о путешествиях: рекомендуйте ITB Transfer гостям и читателям и зарабатывайте с каждого заказа.",
        h1: "Давайте работать вместе", lead: "Отели, гиды, блогеры и сайты о путешествиях: рекомендуйте наши трансферы гостям и читателям и получайте доход с каждого заказа.",
        points: ["Комиссия или специальная цена с каждого заказа", "Ссылка для заказа с вашим именем", "Быстрые ответы вашим гостям в WhatsApp", "Фиксированные цены, которым доверяют"] }
    }
  },
  de: {
    head: "Unternehmen",
    labels: { company: "Firma", sector: "Branche", name: "Vor- und Nachname", role: "Position", email: "E-Mail", phone: "Telefon (mit Ländervorwahl)", volume: "Transfers pro Monat",
      stype: "Ich bin", city: "Bezirk / Stadt", fleet: "Anzahl Fahrzeuge", classes: "Fahrzeugtypen", docs: "Dokumente", ctype: "Geschäftsart", country: "Land / Stadt",
      website: "Website oder Profil", ptype: "Art der Partnerschaft", msg: "Nachricht" },
    opts: { lt10: "Unter 10", "10to50": "10–50", gt50: "Mehr als 50", company: "Ein Transportunternehmen", driver: "Fahrer mit eigenem Auto",
      sedan: "Limousine", minivan: "Minivan", vclass: "Mercedes V-Klasse", minibus: "Kleinbus", d2: "D2-Lizenz", src: "SRC", psy: "Psychotechnisches Zeugnis", tursab: "TÜRSAB",
      agency: "Reisebüro", operator: "Reiseveranstalter / DMC", hotel: "Hotel", platform: "Online-Plattform", other: "Sonstiges", guide: "Reiseleiter", influencer: "Influencer / Creator", blog: "Reiseblog oder Website" },
    send: "Bewerbung senden", ok: "Vielen Dank! Wir haben Ihre Anfrage erhalten und melden uns innerhalb eines Werktags.",
    err: "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns auf WhatsApp.", req: "Bitte füllen Sie die Pflichtfelder aus.", wa: "WhatsApp",
    pages: {
      corporate: { nav: "Firmenkunden", title: "Firmentransfers in Istanbul · Firmenkonto · {brand}", desc: "Flughafen- und Stadttransfers für Mitarbeiter und Gäste Ihrer Firma in Istanbul: Festpreise, Monatsrechnung und ein Ansprechpartner.",
        h1: "Firmenkonto für Transfers", lead: "Buchen Sie Flughafen- und Stadttransfers für Mitarbeiter, Besucher und Kunden mit einem Konto, zu Festpreisen und mit einer Monatsrechnung.",
        points: ["Feste Preise pro Auto, vorab vereinbart", "Monatsrechnung statt Barzahlung im Auto", "Ein Ansprechpartner für alle Buchungen, rund um die Uhr", "Namensschild, Flugverfolgung, lizenzierte Fahrer"] },
      supplier: { nav: "Partner-Fahrer werden", title: "Transportpartner in Istanbul werden · {brand}", desc: "Transportunternehmen und Fahrer mit eigenem Auto: Erhalten Sie regelmäßig Flughafentransfers in Istanbul von ITB Transfer. Jetzt bewerben.",
        h1: "Fahren Sie mit uns", lead: "Transportunternehmen und Fahrer mit eigenem lizenziertem Fahrzeug: regelmäßige Flughafen- und Stadttransfers in Istanbul.",
        points: ["Regelmäßige Aufträge ab IST, SAW und Galataport", "Klare Preise pro Transfer, pünktlich bezahlt", "Arbeiten zu Zeiten, die Ihnen passen", "Nur lizenzierte Fahrzeuge (D2) und professionelle Fahrer"] },
      b2b: { nav: "B2B für Agenturen", title: "B2B-Transferpartner für Reisebüros · {brand}", desc: "Reisebüros, Veranstalter, Hotels und Plattformen: Buchen Sie Istanbul-Transfers zu Netto-B2B-Preisen auf Ihrer eigenen Partnerseite.",
        h1: "B2B-Transfers für Agenturen", lead: "Reisebüros, Reiseveranstalter, Hotels und Online-Plattformen: Buchen Sie Transfers für Ihre Gäste zu Nettopreisen auf Ihrer eigenen Partnerseite.",
        points: ["Netto-B2B-Preise für alle Strecken und Fahrzeuge", "Eigene Buchungsseite mit Buchungen und Rechnungen", "Abholung Ihrer Gäste mit Namensschild, rund um die Uhr", "Inkasso bei Ihren Gästen auf Wunsch"] },
      partner: { nav: "Kooperationen", title: "Kooperationen: Hotels, Guides und Creator · {brand}", desc: "Hotels, Reiseleiter, Influencer und Reiseseiten: Empfehlen Sie ITB Transfer Ihren Gästen und Lesern und verdienen Sie an jeder Buchung.",
        h1: "Arbeiten Sie mit uns zusammen", lead: "Hotels, Reiseleiter, Influencer und Reise-Websites: Empfehlen Sie unsere Transfers Ihren Gästen und Lesern und verdienen Sie an jeder Buchung.",
        points: ["Provision oder Sonderpreis bei jeder Buchung", "Ein Buchungslink mit Ihrem Namen", "Schnelle Antworten für Ihre Gäste auf WhatsApp", "Feste Preise, denen Ihre Gäste vertrauen"] }
    }
  },
  fr: {
    head: "Entreprise",
    labels: { company: "Société", sector: "Secteur", name: "Nom et prénom", role: "Fonction", email: "E-mail", phone: "Téléphone (avec indicatif)", volume: "Transferts par mois",
      stype: "Je suis", city: "Quartier / ville", fleet: "Nombre de véhicules", classes: "Types de véhicules", docs: "Documents", ctype: "Type d'activité", country: "Pays / ville",
      website: "Site web ou profil", ptype: "Type de partenariat", msg: "Message" },
    opts: { lt10: "Moins de 10", "10to50": "10–50", gt50: "Plus de 50", company: "Une société de transport", driver: "Un chauffeur avec sa voiture",
      sedan: "Berline", minivan: "Monospace", vclass: "Mercedes Classe V", minibus: "Minibus", d2: "Licence D2", src: "SRC", psy: "Certificat psychotechnique", tursab: "TÜRSAB",
      agency: "Agence de voyages", operator: "Tour-opérateur / DMC", hotel: "Hôtel", platform: "Plateforme en ligne", other: "Autre", guide: "Guide", influencer: "Influenceur / créateur", blog: "Blog ou site de voyage" },
    send: "Envoyer la candidature", ok: "Merci ! Nous avons bien reçu votre demande et vous contacterons sous un jour ouvré.",
    err: "Votre demande n'a pas pu être envoyée. Réessayez ou écrivez-nous sur WhatsApp.", req: "Veuillez remplir les champs obligatoires.", wa: "WhatsApp",
    pages: {
      corporate: { nav: "Comptes entreprise", title: "Transferts pour entreprises à Istanbul · {brand}", desc: "Transferts aéroport et ville pour le personnel et les invités de votre entreprise à Istanbul : prix fixes, facture mensuelle, un seul contact.",
        h1: "Compte entreprise", lead: "Réservez les transferts aéroport et ville de vos salariés, visiteurs et clients avec un seul compte, des prix fixes et une facture mensuelle.",
        points: ["Prix fixes par voiture, convenus à l'avance", "Facture mensuelle au lieu d'espèces", "Un seul contact pour toutes les réservations, 24h/24", "Pancarte nominative, suivi du vol, chauffeurs agréés"] },
      supplier: { nav: "Devenir transporteur", title: "Devenez transporteur partenaire à Istanbul · {brand}", desc: "Sociétés de transport et chauffeurs avec leur voiture : recevez des transferts aéroport réguliers à Istanbul avec ITB Transfer.",
        h1: "Roulez avec nous", lead: "Sociétés de transport et chauffeurs avec un véhicule agréé : recevez des transferts aéroport et ville réguliers à Istanbul.",
        points: ["Courses régulières depuis IST, SAW et Galataport", "Prix clairs par transfert, payés à temps", "Travaillez aux heures qui vous conviennent", "Uniquement véhicules agréés (D2) et chauffeurs professionnels"] },
      b2b: { nav: "B2B agences", title: "Partenariat B2B pour agences de voyages · {brand}", desc: "Agences, tour-opérateurs, hôtels et plateformes : réservez vos transferts à Istanbul à prix nets B2B sur votre propre page partenaire.",
        h1: "Transferts B2B pour agences", lead: "Agences de voyages, tour-opérateurs, hôtels et plateformes : réservez les transferts de vos clients à prix nets sur votre page partenaire.",
        points: ["Prix nets B2B pour tous les trajets et véhicules", "Votre page de réservation avec réservations et factures", "Accueil de vos clients avec pancarte, 24h/24", "Encaissement auprès de vos clients si vous le souhaitez"] },
      partner: { nav: "Partenariats", title: "Partenariats : hôtels, guides et créateurs · {brand}", desc: "Hôtels, guides, influenceurs et sites de voyage : recommandez ITB Transfer à vos clients et lecteurs et gagnez sur chaque réservation.",
        h1: "Travaillons ensemble", lead: "Hôtels, guides, influenceurs et sites de voyage : recommandez nos transferts à vos clients et lecteurs et gagnez sur chaque réservation.",
        points: ["Commission ou prix spécial sur chaque réservation", "Un lien de réservation à votre nom", "Réponses rapides à vos clients sur WhatsApp", "Des prix fixes en qui vos clients ont confiance"] }
    }
  },
  it: {
    head: "Azienda",
    labels: { company: "Azienda", sector: "Settore", name: "Nome e cognome", role: "Ruolo", email: "E-mail", phone: "Telefono (con prefisso)", volume: "Transfer al mese",
      stype: "Sono", city: "Quartiere / città", fleet: "Numero di veicoli", classes: "Tipi di veicolo", docs: "Documenti", ctype: "Tipo di attività", country: "Paese / città",
      website: "Sito web o profilo", ptype: "Tipo di collaborazione", msg: "Messaggio" },
    opts: { lt10: "Meno di 10", "10to50": "10–50", gt50: "Più di 50", company: "Un'azienda di trasporti", driver: "Un autista con auto propria",
      sedan: "Berlina", minivan: "Minivan", vclass: "Mercedes Classe V", minibus: "Minibus", d2: "Licenza D2", src: "SRC", psy: "Certificato psicotecnico", tursab: "TÜRSAB",
      agency: "Agenzia di viaggi", operator: "Tour operator / DMC", hotel: "Hotel", platform: "Piattaforma online", other: "Altro", guide: "Guida turistica", influencer: "Influencer / creator", blog: "Blog o sito di viaggi" },
    send: "Invia la candidatura", ok: "Grazie! Abbiamo ricevuto la richiesta e vi contatteremo entro un giorno lavorativo.",
    err: "Non è stato possibile inviare la richiesta. Riprovate o scriveteci su WhatsApp.", req: "Compilate i campi obbligatori.", wa: "WhatsApp",
    pages: {
      corporate: { nav: "Clienti aziendali", title: "Transfer aziendali a Istanbul · Account aziendale · {brand}", desc: "Transfer aeroporto e città per dipendenti e ospiti della vostra azienda a Istanbul: prezzi fissi, fattura mensile e un unico referente.",
        h1: "Account aziendale", lead: "Prenotate transfer aeroporto e città per dipendenti, visitatori e clienti con un solo account, prezzi fissi e una fattura mensile.",
        points: ["Prezzi fissi per auto, concordati in anticipo", "Fattura mensile invece del contante", "Un unico referente per tutte le prenotazioni, 24/7", "Cartello con nome, monitoraggio volo, autisti autorizzati"] },
      supplier: { nav: "Diventa fornitore", title: "Diventa fornitore di transfer a Istanbul · {brand}", desc: "Aziende di trasporto e autisti con auto propria: ricevete transfer aeroportuali regolari a Istanbul da ITB Transfer. Candidatevi ora.",
        h1: "Guidate con noi", lead: "Aziende di trasporto e autisti con veicolo autorizzato: transfer aeroportuali e in città regolari a Istanbul.",
        points: ["Servizi regolari da IST, SAW e Galataport", "Prezzi chiari per transfer, pagati puntualmente", "Lavorate negli orari che preferite", "Solo veicoli autorizzati (D2) e autisti professionisti"] },
      b2b: { nav: "B2B per agenzie", title: "Partnership B2B per agenzie di viaggi · {brand}", desc: "Agenzie, tour operator, hotel e piattaforme: prenotate transfer a Istanbul a prezzi netti B2B sulla vostra pagina partner.",
        h1: "Transfer B2B per agenzie", lead: "Agenzie di viaggi, tour operator, hotel e piattaforme online: prenotate i transfer dei vostri clienti a prezzi netti sulla vostra pagina partner.",
        points: ["Prezzi netti B2B per tutte le tratte e i veicoli", "La vostra pagina con prenotazioni e fatture", "Accoglienza con cartello per i vostri clienti, 24/7", "Incasso dai vostri clienti se lo desiderate"] },
      partner: { nav: "Collaborazioni", title: "Collaborazioni: hotel, guide e creator · {brand}", desc: "Hotel, guide, influencer e siti di viaggio: consigliate ITB Transfer a ospiti e lettori e guadagnate su ogni prenotazione.",
        h1: "Lavoriamo insieme", lead: "Hotel, guide turistiche, influencer e siti di viaggio: consigliate i nostri transfer a ospiti e lettori e guadagnate su ogni prenotazione.",
        points: ["Commissione o prezzo speciale su ogni prenotazione", "Un link di prenotazione con il vostro nome", "Risposte rapide ai vostri ospiti su WhatsApp", "Prezzi fissi di cui i vostri ospiti si fidano"] }
    }
  },
  nl: {
    head: "Bedrijf",
    labels: { company: "Bedrijf", sector: "Branche", name: "Voor- en achternaam", role: "Functie", email: "E-mail", phone: "Telefoon (met landcode)", volume: "Transfers per maand",
      stype: "Ik ben", city: "Wijk / stad", fleet: "Aantal voertuigen", classes: "Voertuigtypen", docs: "Documenten", ctype: "Type bedrijf", country: "Land / stad",
      website: "Website of profiel", ptype: "Soort samenwerking", msg: "Bericht" },
    opts: { lt10: "Minder dan 10", "10to50": "10–50", gt50: "Meer dan 50", company: "Een vervoersbedrijf", driver: "Een chauffeur met eigen auto",
      sedan: "Sedan", minivan: "Minivan", vclass: "Mercedes V-Klasse", minibus: "Minibus", d2: "D2-vergunning", src: "SRC", psy: "Psychotechnisch certificaat", tursab: "TÜRSAB",
      agency: "Reisbureau", operator: "Touroperator / DMC", hotel: "Hotel", platform: "Online platform", other: "Anders", guide: "Gids", influencer: "Influencer / creator", blog: "Reisblog of website" },
    send: "Aanvraag versturen", ok: "Bedankt! We hebben uw aanvraag ontvangen en nemen binnen één werkdag contact op.",
    err: "Uw aanvraag kon niet worden verzonden. Probeer het opnieuw of stuur ons een bericht op WhatsApp.", req: "Vul de verplichte velden in.", wa: "WhatsApp",
    pages: {
      corporate: { nav: "Zakelijke klanten", title: "Zakelijke transfers in Istanbul · Bedrijfsaccount · {brand}", desc: "Luchthaven- en stadstransfers voor medewerkers en gasten van uw bedrijf in Istanbul: vaste prijzen, maandfactuur en één contactpersoon.",
        h1: "Zakelijk account", lead: "Boek luchthaven- en stadstransfers voor medewerkers, bezoekers en klanten met één account, vaste prijzen en één maandfactuur.",
        points: ["Vaste prijzen per auto, vooraf afgesproken", "Maandfactuur in plaats van contant in de auto", "Eén contactpersoon voor alle boekingen, 24/7", "Naambord, vluchtvolging en erkende chauffeurs"] },
      supplier: { nav: "Word vervoerder", title: "Word vervoerspartner in Istanbul · {brand}", desc: "Vervoersbedrijven en chauffeurs met eigen auto: krijg regelmatig luchthaventransfers in Istanbul via ITB Transfer. Meld u nu aan.",
        h1: "Rijd met ons", lead: "Vervoersbedrijven en chauffeurs met een eigen erkend voertuig: regelmatig luchthaven- en stadsritten in Istanbul.",
        points: ["Regelmatige ritten vanaf IST, SAW en Galataport", "Duidelijke prijs per transfer, op tijd betaald", "Werk op de uren die u uitkomen", "Alleen erkende voertuigen (D2) en professionele chauffeurs"] },
      b2b: { nav: "B2B voor reisbureaus", title: "B2B-transferpartner voor reisbureaus · {brand}", desc: "Reisbureaus, touroperators, hotels en platforms: boek transfers in Istanbul tegen netto B2B-prijzen op uw eigen partnerpagina.",
        h1: "B2B-transfers voor reisbureaus", lead: "Reisbureaus, touroperators, hotels en online platforms: boek transfers voor uw gasten tegen nettoprijzen op uw eigen partnerpagina.",
        points: ["Netto B2B-prijzen voor alle routes en voertuigen", "Eigen boekingspagina met boekingen en facturen", "Ontvangst van uw gasten met naambord, 24/7", "Inning bij uw gasten als u dat wilt"] },
      partner: { nav: "Samenwerkingen", title: "Samenwerkingen: hotels, gidsen en creators · {brand}", desc: "Hotels, gidsen, influencers en reissites: raad ITB Transfer aan bij uw gasten en lezers en verdien aan elke boeking. Meld u aan.",
        h1: "Laten we samenwerken", lead: "Hotels, gidsen, influencers en reiswebsites: raad onze transfers aan bij uw gasten en lezers en verdien aan elke boeking.",
        points: ["Commissie of speciale prijs op elke boeking", "Een boekingslink met uw naam", "Snelle antwoorden voor uw gasten op WhatsApp", "Vaste prijzen waar uw gasten op vertrouwen"] }
    }
  }
};

module.exports = { FORMS, ORDER, T, path };
