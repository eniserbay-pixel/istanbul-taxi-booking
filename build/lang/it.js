// Italian: page texts (same keys as the English block in i18n.js), blog posts and legal texts.
const SRC = require("../blog").SRC;
const B = {
  shortage: "perche-e-difficile-trovare-un-taxi-a-istanbul",
  versus: "aeroporto-istanbul-taxi-o-transfer",
  howto: "prenotare-transfer-aeroporto-istanbul"
};

const ui = {
  htmlLang: "it",
  paths: {
    home: "/it", book: "/it/prenota", prices: "/it/prezzi", terms: "/it/condizioni", privacy: "/it/privacy",
    IST: "/it/taxi-aeroporto-istanbul", SAW: "/it/taxi-aeroporto-sabiha-gokcen",
    route: (a, z) => a === "IST" ? `/it/taxi-aeroporto-istanbul-per-${z}` : `/it/taxi-sabiha-gokcen-per-${z}`,
    airportPair: "/it/taxi-aeroporto-istanbul-sabiha-gokcen", blog: "/it/blog"
  },
  assure: [["price", "Prezzi fissi", "Niente tassametro, niente sorprese"], ["cancel", "Cancellazione gratuita", "Fino a 24 ore prima del ritiro"], ["clock", "Servizio 24/7", "Per ogni volo, giorno e notte"], ["shield", "Viaggio sicuro", "Autisti esperti, auto assicurate"]],
  nav: { prices: "Prezzi", fleet: "Veicoli", how: "Come funziona", faq: "FAQ", blog: "Blog", book: "Prenota" },
  ui: { route: "Percorso", from: "da ", min: "min", terms: "Condizioni", privacy: "Privacy" },
  blog: { title: "Blog transfer Istanbul · Consigli taxi per viaggiatori", desc: "Guide pratiche per muoversi a Istanbul: perché è difficile trovare un taxi, taxi o transfer in aeroporto e come prenotare la corsa in un minuto.", h1: "Blog transfer Istanbul", lead: "Guide pratiche per arrivare a Istanbul e raggiungere l'hotel senza stress.", read: "Leggi la guida", latest: "Dal nostro blog", more: "Altre guide", updated: "Aggiornato", widgetH: "Prenota ora il tuo transfer" },
  form: {
    title: "Il tuo prezzo fisso", from: "Da", to: "A", date: "Data", time: "Ora di ritiro", pax: "Passeggeri",
    ret: "Aggiungi il ritorno (−10%)", rdate: "Data del ritorno", rtime: "Ora di ritiro al ritorno", submit: "Vedi i prezzi",
    airports: "Aeroporti", districts: "Istanbul", port: "Porto crociere", choose: "Scegli…", swap: "Inverti"
  },
  home: {
    title: "Taxi e transfer aeroporto di Istanbul da €{min} · {brand}",
    desc: "{brand} è una società di transfer a Istanbul: taxi privato dagli aeroporti IST e Sabiha Gökçen a prezzo fisso da €{min} per auto. Pagamento in contanti.",
    h1: "Taxi e transfer dall'aeroporto di Istanbul a <em>prezzo fisso</em>",
    lead: "{brand} è una società di transfer a Istanbul. Ti portiamo dall'aeroporto di Istanbul (IST) o da Sabiha Gökçen (SAW) al tuo hotel con un'auto privata, da €{min} per auto. L'autista ti aspetta con un cartello con il tuo nome e paghi in contanti a fine corsa.",
    fleetH: "Scegli il tuo veicolo", fleetLead: "Il prezzo è per auto, non per persona. Pedaggi, parcheggio e attesa sono inclusi.",
    routesH: "Percorsi di transfer più richiesti a Istanbul", routesLead: "Prezzi fissi per auto, solo andata. I ritiri all'IST dalle 15:00 alle 19:00 e al SAW dalle 14:45 alle 21:00 costano il 30% in più.",
    vsH: "Taxi con tassametro o il nostro taxi aeroporto?",
    vs: [["Prezzo", "Dipende dal traffico e dal percorso dell'autista", "Fissato al momento della prenotazione"], ["All'arrivo", "Coda al posteggio taxi", "L'autista ti aspetta con il cartello"], ["Ritardo del volo", "-", "Seguiamo il volo, 60 min di attesa gratuita"], ["Bagagli e gruppi", "Piccolo taxi giallo", "Berlina, minivan, Classe V o minibus fino a 16"], ["Pagamento", "Tassametro, spesso solo contanti", "In contanti all'autista in EUR, USD o TRY"]],
    vsCols: ["", "Taxi normale", "{brand}"],
    howH: "Come funziona",
    how: [["Richiesta", "Scegli percorso, veicolo e orario. Ci vuole un minuto e non serve pagare in anticipo."], ["Conferma", "Verifichiamo la disponibilità e ti inviamo una conferma via e-mail, di solito entro un'ora."], ["Viaggio", "L'autista ti accoglie con un cartello con il tuo nome. Paghi il prezzo fisso in contanti alla fine."]],
    meetH: "Dove ti aspetta l'autista",
    ctaH: "Atterri presto a Istanbul?", ctaP: "Richiedi ora il tuo taxi aeroporto e ricevi la conferma via e-mail.",
    faqH: "Domande frequenti"
  },
  faq: [
    ["È difficile trovare un taxi a Istanbul?", `Spesso sì. Istanbul ha circa un taxi ogni 1.000 abitanti, un numero rimasto quasi invariato dagli anni '90, e la lamentela più comune al comune riguarda gli autisti che scelgono passeggeri e percorsi. Code in aeroporto, ore di punta e pioggia peggiorano la situazione. <a href="/it/blog/${B.shortage}">Scopri perché</a>.`],
    ["Perché prenotare prima di arrivare?", `Perché così l'auto ti sta già aspettando. L'autista segue il tuo volo e ti attende nella sala arrivi con un cartello con il tuo nome: niente code, niente indirizzo dell'hotel da spiegare, niente tassametro né trattative. Conosci il prezzo prima di partire. <a href="/it/blog/${B.versus}">Taxi o transfer a confronto</a>.`],
    ["Quanto è veloce prenotare con {brand}?", `Circa un minuto. Scegli percorso, veicolo e orario, inserisci nome, telefono, e-mail e numero di volo e invia. Senza account e senza pagamento anticipato. La conferma arriva di solito entro un'ora. <a href="/it/blog/${B.howto}">Tutti i passaggi</a>.`],
    ["È un normale taxi di Istanbul?", "No. {brand} è una società di transfer autorizzata: viaggi in un'auto privata con autista professionista, prenotata in anticipo a prezzo fisso. Molti viaggiatori lo chiamano taxi aeroporto, ma non c'è tassametro e l'autista ti aspetta dentro il terminal."],
    ["Come si paga?", "In contanti all'autista a fine corsa, in euro, dollari USA o lire turche. Nessun pagamento online e nessun acconto."],
    ["Quando è confermata la mia prenotazione?", "Subito dopo l'invio del modulo ti scriviamo che abbiamo ricevuto la richiesta. Quando assegniamo l'auto, di solito entro un'ora, ricevi l'e-mail di conferma."],
    ["E se il mio volo è in ritardo?", "Seguiamo il tuo volo e adattiamo l'orario di ritiro. I primi 60 minuti dopo l'atterraggio sono gratuiti."],
    ["Il prezzo è a persona?", "No, il prezzo è per auto. Una berlina porta fino a 3 passeggeri, un minivan fino a 7, una Classe V fino a 6 e un minibus fino a 16."],
    ["Posso cancellare?", "Sì, gratis fino a 24 ore prima del ritiro. Rispondi all'e-mail di conferma o scrivici su WhatsApp."]
  ],
  route: {
    title: "Taxi {from} – {to} · prezzo fisso €{price}",
    desc: "Taxi privato {from} – {to}: prezzo fisso da €{price} per auto, {km} km, circa {min} min. Cartello con il nome, volo monitorato, pagamento in contanti.",
    h1: "Taxi {from} – {to}",
    answer: "Un taxi privato da {fromLong} a {toLong} costa un prezzo fisso di <strong>€{price} per auto</strong> in berlina, fino a 3 passeggeri. I {km} km richiedono circa {min} minuti fuori dalle ore di punta. Pedaggi e parcheggio inclusi, paghi l'autista in contanti.",
    answerNoDist: "Un taxi privato da {fromLong} a {toLong} costa un prezzo fisso di <strong>€{price} per auto</strong> in berlina, fino a 3 passeggeri. Pedaggi e parcheggio inclusi, paghi l'autista in contanti.",
    pricesH: "Prezzi {from} – {to}", car: "Veicolo", seats: "Passeggeri", bags: "Valigie", price: "Prezzo per auto",
    areaH: "Zone incluse in questo prezzo", meetH: "Dove ti aspetta l'autista",
    faq: [
      ["Quanto costa un taxi {from} – {to}?", "Con noi il prezzo è fisso: €{price} per auto in berlina, €{van} in minivan fino a 7, €{vclass} in Mercedes Classe V ed €{bus} in minibus fino a 16 persone."],
      ["Quanto dura il viaggio?", "Circa {min} minuti per {km} km fuori dalle ore di punta. Le sere dei giorni feriali può volerci di più; il prezzo non cambia."],
      ["Pago di più se il volo è in ritardo?", "No. Seguiamo il tuo volo e i primi 60 minuti dopo l'atterraggio sono gratuiti."]
    ],
    faqNoDist: 1,
    otherH: "Altri percorsi da {from}", back: "Tutti i prezzi dei taxi da {from}"
  },
  hub: {
    title: "Taxi {from} · prezzi fissi per tutti i quartieri",
    desc: "Taxi privato a prezzo fisso da {from} per Sultanahmet, Taksim, Kadıköy e tutti i quartieri centrali, da €{price} per auto. Cartello con il tuo nome.",
    h1: "Prezzi dei taxi da {from}",
    lead: "Prezzi fissi per auto da {fromLong} ai quartieri centrali di Istanbul. Scegli la destinazione per vedere tutti e quattro i veicoli."
  },
  prices: { title: "Prezzi taxi aeroporto di Istanbul · {brand}", desc: "Tutti i prezzi fissi del taxi dall'aeroporto di Istanbul e da Sabiha Gökçen, per auto: berlina, minivan, Classe V e minibus.", h1: "Prezzi taxi aeroporto", to: "Destinazione" },
  book: {
    title: "Prenota il tuo taxi aeroporto · {brand}", h1: "Prenota il tuo taxi aeroporto",
    steps: ["Veicolo", "Dati", "Conferma"],
    noRoute: "Scegli partenza e destinazione per vedere i prezzi.",
    noPrice: "Per questo percorso non abbiamo ancora un prezzo fisso. Scrivici su WhatsApp per un preventivo.",
    tooMany: "Troppi passeggeri per questo veicolo",
    choose: "Scegli", perCar: "per auto", oneWay: "solo andata", withReturn: "con ritorno",
    name: "Nome e cognome", email: "E-mail", phone: "Cellulare (con prefisso internazionale)", flight: "Numero di volo",
    flightHelp: "Per poter seguire il tuo volo", pickup: "Hotel o indirizzo di ritiro", dropoff: "Hotel o indirizzo di arrivo",
    bags: "Valigie", seats: "Seggiolini per bambini (€{seat} ciascuno)", note: "Nota per l'autista (facoltativa)",
    retFlight: "Numero del volo di ritorno (facoltativo)", retPickup: "Indirizzo di ritiro per il ritorno",
    next: "Continua", back: "Indietro", send: "Invia la richiesta",
    terms: "Accetto le <a href=\"/it/condizioni\" target=\"_blank\">condizioni</a> e l'<a href=\"/it/privacy\" target=\"_blank\">informativa sulla privacy</a>.",
    review: "Controlla la prenotazione", total: "Totale", pay: "Pagamento: in contanti all'autista a fine corsa (EUR, USD o TRY).",
    peak: "Supplemento ore di punta incluso", seatsLine: "Seggiolini per bambini",
    required: "Compila questo campo", invalidEmail: "Controlla l'indirizzo e-mail", invalidPhone: "Controlla il numero di telefono", accept: "Accetta le condizioni",
    doneH: "Richiesta ricevuta", doneP: "Grazie! Il tuo codice è <strong>{ref}</strong>. Abbiamo inviato i dettagli a {email} e confermeremo la prenotazione via e-mail a breve. La prenotazione è valida solo dopo la nostra conferma.",
    error: "Non è stato possibile inviare la richiesta. Riprova o scrivici su WhatsApp.",
    whatsapp: "Chiedi su WhatsApp"
  },
  footer: { rights: "Tutti i diritti riservati.", tursab: "Licenza TÜRSAB", contact: "Contatti", legal: "Note legali", routes: "Percorsi più richiesti" },
  notFound: { title: "Pagina non trovata", p: "Questa pagina non esiste. Trova qui sotto il prezzo del tuo taxi aeroporto.", home: "Vai alla home page" }
};

const blog = {
  "taxi-shortage": {
    slug: B.shortage,
    title: "Perché è così difficile trovare un taxi a Istanbul?",
    desc: "Istanbul ha circa un taxi ogni 1.000 abitanti e migliaia di reclami all'anno. Perché i taxi scarseggiano e come evitarlo prenotando prima.",
    lead: "Istanbul ha oltre 16 milioni di abitanti, ma la sua flotta di taxi è cresciuta pochissimo in 30 anni. Per questo trovare un taxi può richiedere molto tempo, soprattutto in aeroporto, nelle ore di punta o quando piove.",
    body: `<h2>Troppo pochi taxi per una città enorme</h2>
<p>Secondo i dati del Comune metropolitano di Istanbul pubblicati nel 2021, in città c'erano <strong>17.395 taxi</strong>, lo stesso numero degli anni '90, mentre la popolazione è più che raddoppiata, da 7,5 a oltre 16 milioni. Significa <strong>circa un taxi ogni 1.000 abitanti</strong>. Per fare un confronto, New York aveva 13.587 taxi per 8,4 milioni di persone (<a href="${SRC.density}" target="_blank" rel="noopener">fonte</a>).</p>
<p>Il risultato è semplice: nei momenti di punta le persone che cercano un taxi sono molte di più dei taxi disponibili.</p>
{widget}
<h2>Gli autisti scelgono i passeggeri</h2>
<p>La lamentela più comune sui taxi di Istanbul non riguarda il prezzo, ma gli autisti che scelgono passeggeri e percorsi. Nei primi sei mesi del 2023 il Comune ha ricevuto <strong>33.878 reclami</strong> sui taxi. Più della metà, <strong>18.079</strong>, riguardava autisti selettivi sul passeggero o sulla destinazione. Gli altri riguardavano prezzi gonfiati (3.026), percorsi più lunghi (1.386), corse brevi rifiutate (1.290) e tassametro non acceso (712) (<a href="${SRC.complaints}" target="_blank" rel="noopener">fonte</a>).</p>
<p>Per un viaggiatore con le valigie che non parla turco, è proprio questo a rendere stressante la prima ora a Istanbul.</p>
<h2>Dove è più difficile</h2>
<ul>
<li><strong>In aeroporto dopo un volo serale:</strong> lunghe code al posteggio taxi, e famiglie o gruppi spesso non entrano in un solo taxi giallo.</li>
<li><strong>Nelle ore di punta e con la pioggia:</strong> i taxi sono occupati o gli autisti rifiutano le corse nel traffico.</li>
<li><strong>Corse brevi e sponda asiatica:</strong> alcuni autisti rifiutano le corse poco convenienti o l'attraversamento del Bosforo.</li>
</ul>
<h2>La soluzione semplice: prenotare prima di atterrare</h2>
<p>Un transfer prenotato in anticipo risolve tutto questo. Con {brand} scegli il veicolo e vedi il prezzo fisso prima di partire. L'autista segue il tuo volo e ti aspetta nella sala arrivi con un cartello con il tuo nome: niente code, niente trattative, niente tassametro. A fine corsa paghi lo stesso prezzo in contanti.</p>
<p>La prenotazione richiede circa un minuto, senza account e senza pagamento anticipato. Ricevi un'e-mail che conferma la ricezione della richiesta e poi la conferma quando l'auto è assegnata.</p>
{widget}`
  },
  "taxi-vs-transfer": {
    slug: B.versus,
    title: "Aeroporto di Istanbul: taxi o transfer prenotato?",
    desc: "Taxi dal posteggio dell'aeroporto di Istanbul o di Sabiha Gökçen, oppure transfer privato prenotato prima del volo: prezzo, attesa, bagagli e sicurezza a confronto.",
    lead: "Atterri all'aeroporto di Istanbul o a Sabiha Gökçen e devi raggiungere l'hotel. Puoi metterti in coda per un taxi o trovare un autista che ti aspetta già. Ecco come si confrontano.",
    body: `<h2>Prezzo: tassametro o prezzo fisso</h2>
<p>Un taxi normale funziona con il tassametro, quindi il prezzo dipende dal traffico e dal percorso scelto dall'autista. Prezzi gonfiati e percorsi più lunghi sono tra i reclami più frequenti che il Comune riceve sui taxi di Istanbul (<a href="${SRC.complaints}" target="_blank" rel="noopener">fonte</a>). Un transfer prenotato ha un prezzo fisso per auto, che conosci prima di partire. Pedaggi e parcheggio inclusi.</p>
{widget}
<h2>Attesa: coda o cartello con il nome</h2>
<p>Al posteggio taxi si fa la coda, a volte a lungo quando atterrano più voli insieme. Con un transfer l'autista segue il tuo volo e ti aspetta nella sala arrivi con un cartello con il tuo nome. Con {brand} i primi 60 minuti dopo l'atterraggio sono gratuiti, quindi una lunga coda al controllo passaporti o un bagaglio in ritardo non costano nulla in più.</p>
<h2>Bagagli e gruppi</h2>
<p>Un taxi giallo porta fino a quattro passeggeri e pochi bagagli. Con un transfer scegli l'auto giusta: una berlina fino a 3, un minivan fino a 7, una Mercedes Classe V fino a 6 o un minibus fino a 16 persone. Un prezzo per auto, non a persona.</p>
<h2>Lingua e sicurezza</h2>
<p>Non devi spiegare l'indirizzo dell'hotel in turco: è già nella prenotazione. Viaggi con un autista professionista che conosce la strada e paghi il prezzo concordato alla fine.</p>
<h2>Quando il taxi va comunque bene</h2>
<p>Se atterri in un momento tranquillo, viaggi da solo con poco bagaglio e l'hotel è vicino, un taxi dal posteggio può andare bene. Per famiglie, gruppi, arrivi in tarda serata e chi vuole conoscere il prezzo in anticipo, prenotare è più semplice.</p>
{widget}`
  },
  "how-to-book": {
    slug: B.howto,
    title: "Come prenotare il transfer dall'aeroporto di Istanbul in un minuto",
    desc: "Prenota il tuo transfer dall'aeroporto di Istanbul con ITB Transfer in un minuto, senza account né anticipo. Cosa succede dopo l'invio, passo per passo.",
    lead: "Prenotare un transfer con {brand} è più veloce che aspettare al posteggio taxi. Ci vuole circa un minuto, senza account e senza pagamento anticipato. Ecco esattamente cosa succede.",
    body: `<h2>1. Scegli percorso e orario</h2>
<p>Nel modulo di prenotazione scegli da dove parti (aeroporto di Istanbul, Sabiha Gökçen o un quartiere) e dove vai, poi data, ora di ritiro e numero di passeggeri. Per un ritiro in aeroporto indica l'orario di atterraggio. Puoi aggiungere il ritorno con il 10% di sconto.</p>
{widget}
<h2>2. Scegli il veicolo e vedi il prezzo fisso</h2>
<p>Vedi tutti e quattro i veicoli con il prezzo per auto: berlina, minivan, Mercedes Classe V e minibus. I veicoli troppo piccoli per il tuo gruppo sono disattivati. Il prezzo che vedi è il prezzo che paghi.</p>
<h2>3. Inserisci i tuoi dati</h2>
<p>Nome, cellulare con prefisso internazionale, e-mail e numero di volo, così possiamo seguire il tuo volo. Per un ritiro o un arrivo in hotel aggiungi l'indirizzo. Puoi aggiungere seggiolini per bambini e una nota per l'autista.</p>
<h2>4. Invia la richiesta</h2>
<p>Controlla il riepilogo e invialo. Ricevi subito un'e-mail che conferma la ricezione della richiesta. Quando assegniamo l'auto, di solito entro un'ora, ricevi l'e-mail di conferma con il punto d'incontro.</p>
<h2>5. Incontra l'autista e paga in contanti</h2>
<p>L'autista ti aspetta nella sala arrivi con un cartello con il tuo nome. A fine corsa paghi il prezzo fisso in contanti, in euro, dollari USA o lire turche. Cancellazione gratuita fino a 24 ore prima del ritiro.</p>
{widget}`
  }
};

const legal = {
  terms: {
    title: "Condizioni di servizio",
    desc: "Prenotazione, prezzo fisso, pagamento in contanti, attesa e cancellazione gratuita dei transfer aeroportuali a Istanbul prenotati su questo sito.",
    html: `<p>Queste condizioni si applicano ai transfer prenotati su questo sito, gestito da {company} ({address}), licenza TÜRSAB {tursab}.</p>
<h2>Prenotazione</h2><p>L'invio del modulo di prenotazione è una richiesta. La prenotazione è vincolante solo dopo l'invio della nostra e-mail di conferma. Se non possiamo accettare la richiesta, te lo comunichiamo via e-mail.</p>
<h2>Prezzo e pagamento</h2><p>Il prezzo indicato al momento della prenotazione è fisso per auto e comprende pedaggi, parcheggio e il tempo di attesa indicato sotto. Paghi l'autista in contanti a fine corsa, in euro, dollari USA o lire turche al cambio del giorno.</p>
<h2>Tempo di attesa</h2><p>Negli aeroporti i primi 60 minuti dopo l'atterraggio sono gratuiti. Agli altri indirizzi l'autista attende 15 minuti dopo l'orario prenotato.</p>
<h2>Modifiche e cancellazione</h2><p>Puoi modificare o cancellare gratuitamente fino a 24 ore prima del ritiro, rispondendo all'e-mail di conferma o su WhatsApp. In caso di mancata presentazione senza avviso, possiamo richiedere il prezzo della corsa.</p>
<h2>Passeggeri e bagagli</h2><p>Il numero di passeggeri e valigie deve essere adatto all'auto prenotata. I bambini devono viaggiare su un seggiolino, che puoi aggiungere durante la prenotazione.</p>
<h2>Contatti</h2><p>{email} · {phone}</p>`
  },
  privacy: {
    title: "Informativa sulla privacy",
    desc: "Come usiamo il nome, il telefono, l'e-mail e i dati del volo che indichi prenotando un taxi aeroporto a Istanbul, e come contattarci al riguardo.",
    html: `<p>{company} tratta i dati personali che fornisci durante la prenotazione (nome, e-mail, telefono, numero di volo, indirizzi, note) solo per organizzare ed eseguire il tuo transfer, contattarti a riguardo e rispettare gli obblighi di legge, come gli elenchi dei passeggeri richiesti dalla legge turca.</p>
<p>I tuoi dati sono condivisi solo con l'autista o il partner che effettua la corsa e con i fornitori che usiamo per gestire questo sito (hosting, database, e-mail). Sono conservati per il tempo richiesto dalla legge.</p>
<p>Puoi chiedere di consultare, correggere o cancellare i tuoi dati scrivendo a {email}.</p>`
  }
};

module.exports = { ui, blog, legal };
