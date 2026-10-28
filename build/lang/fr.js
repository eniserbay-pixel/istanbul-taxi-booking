// French: page texts (same keys as the English block in i18n.js), blog posts and legal texts.
const SRC = require("../blog-src");
const B = {
  shortage: "pourquoi-est-il-difficile-de-trouver-un-taxi-a-istanbul",
  versus: "aeroport-istanbul-taxi-ou-transfert",
  howto: "reserver-transfert-aeroport-istanbul"
};

const ui = {
  htmlLang: "fr",
  paths: {
    home: "/fr", book: "/fr/reserver", prices: "/fr/prix", terms: "/fr/conditions", privacy: "/fr/confidentialite",
    IST: "/fr/taxi-aeroport-istanbul", SAW: "/fr/taxi-aeroport-sabiha-gokcen",
    route: (a, z) => a === "IST" ? `/fr/taxi-aeroport-istanbul-vers-${z}` : `/fr/taxi-sabiha-gokcen-vers-${z}`,
    airportPair: "/fr/taxi-aeroport-istanbul-sabiha-gokcen", blog: "/fr/blog"
  },
  assure: [["price", "Prix fixes", "Pas de compteur, pas de surprise"], ["cancel", "Annulation gratuite", "Jusqu'à 24 h avant la prise en charge"], ["clock", "Service 24h/24", "Pour chaque vol, de jour comme de nuit"], ["shield", "Voyage en sécurité", "Chauffeurs expérimentés, véhicules assurés"]],
  nav: { prices: "Prix", fleet: "Véhicules", how: "Comment ça marche", faq: "FAQ", blog: "Blog", book: "Réserver" },
  ui: { route: "Trajet", from: "dès ", min: "min", terms: "Conditions", privacy: "Confidentialité" },
  blog: { title: "Blog transfert Istanbul · Conseils taxi aux voyageurs", desc: "Conseils pratiques pour Istanbul : pourquoi les taxis sont difficiles à trouver, taxi ou transfert à l'aéroport et comment réserver votre trajet en une minute.", h1: "Blog transfert Istanbul", lead: "Des conseils pratiques pour arriver à Istanbul et rejoindre votre hôtel sans stress.", read: "Lire l'article", latest: "Sur notre blog", more: "Autres articles", updated: "Mis à jour", widgetH: "Réservez votre transfert" },
  form: {
    title: "Votre prix fixe", from: "Départ", to: "Arrivée", date: "Date", time: "Heure de prise en charge", pax: "Passagers",
    ret: "Ajouter le retour (−10 %)", rdate: "Date du retour", rtime: "Heure du retour", submit: "Voir les prix",
    airports: "Aéroports", districts: "Istanbul", port: "Port de croisière", choose: "Choisir…", swap: "Inverser"
  },
  home: {
    title: "Taxi et transfert privé aéroport d'Istanbul dès {min} € · {brand}",
    desc: "{brand}, société de transfert à Istanbul : taxi privé depuis les aéroports IST et Sabiha Gökçen à prix fixe dès {min} € par véhicule. Paiement en espèces.",
    h1: "Taxi et transfert privé aéroport à Istanbul à <em>prix fixe</em>",
    lead: "{brand} est une société de transfert à Istanbul. Nous vous conduisons de l'aéroport d'Istanbul (IST) ou de Sabiha Gökçen (SAW) à votre hôtel en voiture privée, dès {min} € par véhicule. Votre chauffeur vous attend avec une pancarte à votre nom et vous payez en espèces à la fin du trajet.",
    fleetH: "Choisissez votre véhicule", fleetLead: "Le prix est par véhicule, pas par personne. Péages, parking et attente sont compris.",
    routesH: "Trajets de transfert populaires à Istanbul", routesLead: "Prix fixes par véhicule, aller simple. Les prises en charge à IST de 15h00 à 19h00 et à SAW de 14h45 à 21h00 coûtent 30 % de plus.",
    vsH: "Taxi au compteur ou notre taxi aéroport ?",
    vs: [["Prix", "Dépend du trafic et de l'itinéraire du chauffeur", "Fixé à la réservation"], ["À l'arrivée", "File d'attente à la station de taxis", "Chauffeur avec une pancarte à votre nom"], ["Retard du vol", "-", "Suivi du vol, 60 min d'attente offertes"], ["Bagages et groupes", "Petit taxi jaune", "Berline, monospace, Classe V ou minibus jusqu'à 16"], ["Paiement", "Au compteur, souvent en espèces", "En espèces au chauffeur en EUR, USD ou TRY"]],
    vsCols: ["", "Taxi classique", "{brand}"],
    howH: "Comment ça marche",
    how: [["Demande", "Choisissez votre trajet, votre véhicule et l'heure. Cela prend une minute, sans paiement à l'avance."], ["Confirmation", "Nous vérifions la disponibilité et vous envoyons une confirmation par e-mail, en général dans l'heure."], ["Trajet", "Votre chauffeur vous accueille avec une pancarte à votre nom. Vous payez le prix fixe en espèces à la fin."]],
    meetH: "Où vous attend votre chauffeur",
    ctaH: "Vous arrivez bientôt à Istanbul ?", ctaP: "Demandez votre taxi aéroport maintenant et recevez la confirmation par e-mail.",
    faqH: "Questions fréquentes"
  },
  faq: [
    ["Est-il difficile de trouver un taxi à Istanbul ?", `Souvent, oui. Istanbul compte environ un taxi pour 1 000 habitants, un chiffre presque inchangé depuis les années 1990, et la plainte la plus fréquente auprès de la municipalité concerne les chauffeurs qui choisissent leurs clients et leurs trajets. Les files à l'aéroport, les heures de pointe et la pluie aggravent la situation. <a href="/fr/blog/${B.shortage}">En savoir plus</a>.`],
    ["Pourquoi réserver avant d'arriver ?", `Parce que votre voiture vous attend déjà. Votre chauffeur suit votre vol et se tient dans le hall des arrivées avec une pancarte à votre nom : pas de file d'attente, pas besoin d'expliquer l'adresse de l'hôtel, pas de compteur ni de marchandage. Vous connaissez le prix avant de partir. <a href="/fr/blog/${B.versus}">Taxi ou transfert : comparatif</a>.`],
    ["Combien de temps faut-il pour réserver avec {brand} ?", `Environ une minute. Choisissez votre trajet, votre véhicule et l'heure, indiquez votre nom, téléphone, e-mail et numéro de vol, puis envoyez. Sans compte et sans paiement à l'avance. La confirmation arrive en général dans l'heure. <a href="/fr/blog/${B.howto}">Les étapes</a>.`],
    ["S'agit-il d'un taxi stambouliote classique ?", "Non. {brand} est une société de transfert agréée : vous voyagez dans une voiture privée avec un chauffeur professionnel, réservée à l'avance à prix fixe. Beaucoup de voyageurs parlent de taxi aéroport, mais il n'y a pas de compteur et le chauffeur vous attend dans le terminal."],
    ["Comment payer ?", "En espèces au chauffeur à la fin du trajet, en euros, dollars américains ou livres turques. Pas de paiement en ligne ni d'acompte."],
    ["Quand ma réservation est-elle confirmée ?", "Dès l'envoi du formulaire, nous vous écrivons que nous avons reçu votre demande. Une fois le véhicule attribué, en général dans l'heure, vous recevez l'e-mail de confirmation."],
    ["Et si mon vol est en retard ?", "Nous suivons votre vol et adaptons l'heure de prise en charge. Les 60 premières minutes après l'atterrissage sont gratuites."],
    ["Le prix est-il par personne ?", "Non, le prix est par véhicule. Une berline accueille jusqu'à 3 passagers, un monospace jusqu'à 7, une Classe V jusqu'à 6 et un minibus jusqu'à 16."],
    ["Puis-je annuler ?", "Oui, gratuitement jusqu'à 24 heures avant la prise en charge. Répondez simplement à l'e-mail de confirmation ou écrivez-nous sur WhatsApp."]
  ],
  route: {
    title: "Taxi {from} – {to} · prix fixe {price} €",
    desc: "Taxi privé {from} – {to} : prix fixe dès {price} € par véhicule, {km} km, environ {min} min. Pancarte à votre nom, suivi du vol, paiement en espèces.",
    h1: "Taxi {from} – {to}",
    answer: "Un taxi privé de {fromLong} à {toLong} coûte un prix fixe de <strong>{price} € par véhicule</strong> en berline, jusqu'à 3 passagers. Les {km} km prennent environ {min} minutes hors heures de pointe. Péages et parking compris, paiement en espèces au chauffeur.",
    answerNoDist: "Un taxi privé de {fromLong} à {toLong} coûte un prix fixe de <strong>{price} € par véhicule</strong> en berline, jusqu'à 3 passagers. Péages et parking compris, paiement en espèces au chauffeur.",
    pricesH: "Prix {from} – {to}", car: "Véhicule", seats: "Passagers", bags: "Valises", price: "Prix par véhicule",
    areaH: "Quartiers à ce prix", meetH: "Où vous attend votre chauffeur",
    faq: [
      ["Combien coûte un taxi {from} – {to} ?", "Chez nous, un prix fixe de {price} € par véhicule en berline, {van} € en monospace jusqu'à 7, {vclass} € en Mercedes Classe V et {bus} € en minibus jusqu'à 16 personnes."],
      ["Combien de temps dure le trajet ?", "Environ {min} minutes pour {km} km hors heures de pointe. Les soirs de semaine, cela peut être plus long ; le prix ne change pas."],
      ["Dois-je payer plus si mon vol est en retard ?", "Non. Nous suivons votre vol et les 60 premières minutes après l'atterrissage sont gratuites."]
    ],
    faqNoDist: 1,
    otherH: "Autres trajets depuis {from}", back: "Tous les prix de taxi depuis {from}"
  },
  hub: {
    title: "Taxi {from} · prix fixes vers tous les quartiers",
    desc: "Taxi privé à prix fixe depuis {from} vers Sultanahmet, Taksim, Kadıköy et tous les quartiers centraux, dès {price} € par véhicule. Pancarte à votre nom.",
    h1: "Prix des taxis depuis {from}",
    lead: "Prix fixes par véhicule depuis {fromLong} vers les quartiers centraux d'Istanbul. Choisissez votre destination pour voir les quatre véhicules."
  },
  prices: { title: "Prix des taxis aéroport d'Istanbul · {brand}", desc: "Tous les prix fixes du taxi depuis l'aéroport d'Istanbul et Sabiha Gökçen, par véhicule : berline, monospace, Classe V et minibus.", h1: "Prix des taxis aéroport", to: "Destination" },
  book: {
    title: "Réserver votre taxi aéroport · {brand}", h1: "Réserver votre taxi aéroport",
    steps: ["Véhicule", "Coordonnées", "Vérification"],
    noRoute: "Choisissez votre départ et votre destination pour voir les prix.",
    noPrice: "Nous n'avons pas encore de prix fixe pour ce trajet. Écrivez-nous sur WhatsApp pour un devis.",
    tooMany: "Trop de passagers pour ce véhicule",
    choose: "Choisir", perCar: "par véhicule", oneWay: "aller simple", withReturn: "retour inclus",
    name: "Nom et prénom", email: "E-mail", phone: "Téléphone mobile (avec l'indicatif)", flight: "Numéro de vol",
    flightHelp: "Pour que nous puissions suivre votre vol", pickup: "Hôtel ou adresse de prise en charge", dropoff: "Hôtel ou adresse de destination",
    bags: "Valises", seats: "Sièges enfant ({seat} € chacun)", note: "Message pour le chauffeur (facultatif)",
    retFlight: "Numéro du vol retour (facultatif)", retPickup: "Adresse de prise en charge au retour",
    next: "Continuer", back: "Retour", send: "Envoyer la demande",
    terms: "J'accepte les <a href=\"/fr/conditions\" target=\"_blank\">conditions</a> et la <a href=\"/fr/confidentialite\" target=\"_blank\">politique de confidentialité</a>.",
    review: "Vérifiez votre réservation", total: "Total", pay: "Paiement : en espèces au chauffeur à la fin du trajet (EUR, USD ou TRY).",
    peak: "Supplément heures de pointe inclus", seatsLine: "Sièges enfant",
    required: "Veuillez remplir ce champ", invalidEmail: "Veuillez vérifier votre adresse e-mail", invalidPhone: "Veuillez vérifier votre numéro de téléphone", accept: "Veuillez accepter les conditions",
    doneH: "Demande reçue", doneP: "Merci ! Votre référence est <strong>{ref}</strong>. Nous avons envoyé les détails à {email} et confirmerons votre réservation par e-mail très bientôt. La réservation n'est ferme qu'après notre confirmation.",
    error: "Votre demande n'a pas pu être envoyée. Réessayez ou écrivez-nous sur WhatsApp.",
    whatsapp: "Demander sur WhatsApp"
  },
  footer: { rights: "Tous droits réservés.", tursab: "Licence TÜRSAB", contact: "Contact", legal: "Mentions", routes: "Trajets populaires" },
  notFound: { title: "Page introuvable", p: "Cette page n'existe pas. Trouvez le prix de votre taxi aéroport ci-dessous.", home: "Retour à l'accueil" }
};

const blog = {
  "taxi-shortage": {
    slug: B.shortage,
    title: "Pourquoi est-il si difficile de trouver un taxi à Istanbul ?",
    desc: "Istanbul compte environ un taxi pour 1 000 habitants et des milliers de plaintes par an. Pourquoi les taxis sont rares et comment réserver à l'avance.",
    lead: "Istanbul compte plus de 16 millions d'habitants, mais sa flotte de taxis n'a presque pas augmenté en 30 ans. C'est pourquoi trouver un taxi peut prendre du temps, surtout à l'aéroport, aux heures de pointe ou sous la pluie.",
    body: `<h2>Trop peu de taxis pour une très grande ville</h2>
<p>Selon les chiffres de la municipalité métropolitaine d'Istanbul publiés en 2021, la ville comptait <strong>17 395 taxis</strong>, autant que dans les années 1990, alors que la population a plus que doublé, de 7,5 à plus de 16 millions. Cela fait <strong>environ un taxi pour 1 000 habitants</strong>. À titre de comparaison, New York comptait 13 587 taxis pour 8,4 millions d'habitants (<a href="${SRC.density}" target="_blank" rel="noopener">source</a>).</p>
<p>Le résultat est simple : aux heures chargées, il y a beaucoup plus de personnes qui cherchent un taxi que de taxis.</p>
{widget}
<h2>Les chauffeurs choisissent leurs clients</h2>
<p>La plainte la plus fréquente sur les taxis d'Istanbul ne concerne pas le prix, mais les chauffeurs qui choisissent leurs clients et leurs trajets. Au premier semestre 2023, la municipalité a reçu <strong>33 878 plaintes</strong> sur les taxis. Plus de la moitié, <strong>18 079</strong>, concernaient des chauffeurs qui choisissaient le client ou la destination. Les autres portaient sur des prix excessifs (3 026), des détours (1 386), des refus de courses courtes (1 290) et des compteurs non allumés (712) (<a href="${SRC.complaints}" target="_blank" rel="noopener">source</a>).</p>
<p>Pour un voyageur avec des valises qui ne parle pas turc, c'est exactement ce qui rend la première heure à Istanbul stressante.</p>
<h2>Là où c'est le plus difficile</h2>
<ul>
<li><strong>À l'aéroport après un vol tardif :</strong> longues files à la station de taxis, et les familles ou les groupes ne tiennent souvent pas dans un seul taxi jaune.</li>
<li><strong>Aux heures de pointe et sous la pluie :</strong> les taxis sont pris ou les chauffeurs refusent les trajets dans les bouchons.</li>
<li><strong>Courses courtes et rive asiatique :</strong> certains chauffeurs refusent les courses peu rentables ou la traversée du Bosphore.</li>
</ul>
<h2>La solution simple : réserver avant d'atterrir</h2>
<p>Un transfert réservé à l'avance règle tout cela. Avec {brand}, vous choisissez votre véhicule et voyez le prix fixe avant de partir. Votre chauffeur suit votre vol et vous attend dans le hall des arrivées avec une pancarte à votre nom : pas de file, pas de négociation, pas de compteur. Vous payez ce même prix en espèces à la fin du trajet.</p>
<p>La réservation prend environ une minute, sans compte et sans paiement à l'avance. Vous recevez un e-mail confirmant la réception de votre demande, puis la confirmation dès que votre véhicule est attribué.</p>
{widget}`
  },
  "taxi-vs-transfer": {
    slug: B.versus,
    title: "Aéroport d'Istanbul : taxi ou transfert réservé ?",
    desc: "Taxi à la station de l'aéroport d'Istanbul ou de Sabiha Gökçen, ou transfert privé réservé avant le départ : prix, attente, bagages et sécurité comparés.",
    lead: "Vous atterrissez à l'aéroport d'Istanbul ou à Sabiha Gökçen et devez rejoindre votre hôtel. Vous pouvez faire la queue pour un taxi, ou trouver un chauffeur qui vous attend déjà. Voici comment les deux se comparent.",
    body: `<h2>Prix : compteur ou prix fixe</h2>
<p>Un taxi classique fonctionne au compteur : le prix dépend du trafic et de l'itinéraire choisi par le chauffeur. Les prix excessifs et les détours font partie des plaintes les plus fréquentes reçues par la municipalité au sujet des taxis d'Istanbul (<a href="${SRC.complaints}" target="_blank" rel="noopener">source</a>). Un transfert réservé a un prix fixe par véhicule, connu avant le voyage. Péages et parking compris.</p>
{widget}
<h2>Attente : file ou pancarte à votre nom</h2>
<p>À la station de taxis, vous faites la queue, parfois longtemps quand plusieurs vols atterrissent en même temps. Avec un transfert, votre chauffeur suit votre vol et vous attend dans le hall des arrivées avec une pancarte à votre nom. Chez {brand}, les 60 premières minutes après l'atterrissage sont gratuites : une longue file au contrôle des passeports ou une valise en retard ne coûtent rien de plus.</p>
<h2>Bagages et groupes</h2>
<p>Un taxi jaune prend jusqu'à quatre passagers et peu de bagages. Avec un transfert, vous choisissez le véhicule adapté : une berline jusqu'à 3, un monospace jusqu'à 7, une Mercedes Classe V jusqu'à 6 ou un minibus jusqu'à 16 personnes. Un prix par véhicule, pas par personne.</p>
<h2>Langue et sécurité</h2>
<p>Inutile d'expliquer l'adresse de votre hôtel en turc : elle figure déjà dans votre réservation. Vous voyagez avec un chauffeur professionnel qui connaît le chemin et vous payez le prix convenu à la fin.</p>
<h2>Quand un taxi reste une bonne option</h2>
<p>Si vous arrivez à une heure calme, voyagez seul et léger et que votre hôtel est proche, un taxi à la station peut convenir. Pour les familles, les groupes, les arrivées tardives et tous ceux qui veulent connaître le prix à l'avance, la réservation est plus simple.</p>
{widget}`
  },
  "how-to-book": {
    slug: B.howto,
    title: "Réserver son transfert aéroport à Istanbul en une minute",
    desc: "Réservez votre transfert aéroport à Istanbul avec ITB Transfer en une minute environ, sans compte ni prépaiement. Ce qui se passe après l'envoi, étape par étape.",
    lead: "Réserver un transfert avec {brand} est plus rapide que d'attendre à la station de taxis. Cela prend environ une minute, sans compte et sans paiement à l'avance. Voici exactement comment cela se passe.",
    body: `<h2>1. Choisissez votre trajet et l'heure</h2>
<p>Dans le formulaire de réservation, choisissez votre point de départ (aéroport d'Istanbul, Sabiha Gökçen ou un quartier) et votre destination, puis la date, l'heure de prise en charge et le nombre de passagers. Pour une prise en charge à l'aéroport, indiquez l'heure d'atterrissage. Vous pouvez ajouter le retour avec 10 % de réduction.</p>
{widget}
<h2>2. Choisissez votre véhicule et voyez le prix fixe</h2>
<p>Vous voyez les quatre véhicules avec le prix par véhicule : berline, monospace, Mercedes Classe V et minibus. Les véhicules trop petits pour votre groupe sont grisés. Le prix affiché est le prix que vous payez.</p>
<h2>3. Indiquez vos coordonnées</h2>
<p>Votre nom, votre numéro de mobile avec l'indicatif, votre e-mail et votre numéro de vol, pour que nous puissions suivre votre vol. Pour une prise en charge ou une dépose à l'hôtel, ajoutez l'adresse. Vous pouvez ajouter des sièges enfant et un message pour le chauffeur.</p>
<h2>4. Envoyez la demande</h2>
<p>Vérifiez le récapitulatif et envoyez-le. Vous recevez aussitôt un e-mail confirmant la réception de votre demande. Une fois votre véhicule attribué, en général dans l'heure, vous recevez la confirmation avec le point de rendez-vous.</p>
<h2>5. Retrouvez votre chauffeur et payez en espèces</h2>
<p>Votre chauffeur vous attend dans le hall des arrivées avec une pancarte à votre nom. À la fin du trajet, vous payez le prix fixe en espèces, en euros, dollars américains ou livres turques. Annulation gratuite jusqu'à 24 heures avant la prise en charge.</p>
{widget}`
  }
};

const legal = {
  terms: {
    title: "Conditions générales",
    desc: "Conditions de réservation, prix fixe, paiement en espèces, temps d'attente et annulation gratuite des transferts aéroport à Istanbul réservés sur ce site.",
    html: `<p>Ces conditions s'appliquent aux transferts réservés sur ce site, exploité par {company} ({address}), licence TÜRSAB {tursab}.</p>
<h2>Réservation</h2><p>L'envoi du formulaire de réservation constitue une demande. La réservation ne devient ferme qu'après l'envoi de notre e-mail de confirmation. Si nous ne pouvons pas donner suite à votre demande, nous vous en informons par e-mail.</p>
<h2>Prix et paiement</h2><p>Le prix affiché lors de la réservation est fixe par véhicule et comprend les péages, le parking et le temps d'attente ci-dessous. Vous payez le chauffeur en espèces à la fin du trajet, en euros, dollars américains ou livres turques au cours du jour.</p>
<h2>Temps d'attente</h2><p>Aux aéroports, les 60 premières minutes après l'atterrissage sont gratuites. Aux autres adresses, le chauffeur attend 15 minutes après l'heure réservée.</p>
<h2>Modification et annulation</h2><p>Vous pouvez modifier ou annuler gratuitement jusqu'à 24 heures avant la prise en charge, en répondant à l'e-mail de confirmation ou sur WhatsApp. En cas d'absence sans prévenir, nous pouvons demander le prix de la course.</p>
<h2>Passagers et bagages</h2><p>Le nombre de passagers et de valises doit correspondre au véhicule réservé. Les enfants doivent voyager dans un siège enfant, à ajouter lors de la réservation.</p>
<h2>Contact</h2><p>{email} · {phone}</p>`
  },
  privacy: {
    title: "Politique de confidentialité",
    desc: "Comment nous utilisons le nom, le téléphone, l'e-mail et les informations de vol que vous indiquez en réservant un taxi aéroport à Istanbul, et comment nous joindre.",
    html: `<p>{company} traite les données personnelles que vous indiquez lors de la réservation (nom, e-mail, téléphone, numéro de vol, adresses, messages) uniquement pour organiser et effectuer votre transfert, vous contacter à ce sujet et respecter ses obligations légales, comme les listes de passagers exigées par la loi turque.</p>
<p>Vos données ne sont communiquées qu'au chauffeur ou au partenaire qui effectue le trajet et aux prestataires que nous utilisons pour faire fonctionner ce site (hébergement, base de données, e-mail). Elles sont conservées aussi longtemps que la loi l'exige.</p>
<p>Vous pouvez demander à consulter, corriger ou supprimer vos données en écrivant à {email}.</p>`
  }
};

module.exports = { ui, blog, legal };
