// Italian terms of service and privacy notice. DRAFT: have a lawyer check before relying on it. Placeholders: see en.js.
module.exports = {
  updated: "2 novembre 2026",
  ui: {
    updated: "Ultimo aggiornamento", toc: "Indice",
    rows: { company: "Società", address: "Sede legale", mersis: "Numero MERSIS", tax: "Ufficio e codice fiscale", tradeReg: "Numero di registro delle imprese",
      kep: "PEC (KEP)", tursab: "Licenza TÜRSAB", verbis: "Registrazione VERBIS", euRep: "Rappresentante UE (art. 27 GDPR)", email: "E-mail", phone: "Telefono e WhatsApp" }
  },
  terms: {
    title: "Termini e condizioni",
    desc: "Termini dei transfer a Istanbul: prenotazione, prezzo fisso, pagamento in contanti, attesa, bagagli, seggiolini, cancellazione gratuita e responsabilità.",
    intro: `<p>Questi termini costituiscono il contratto tra te e {company} ("noi"), la società che gestisce {brand} ed effettua i transfer prenotati su {url}. Leggili prima di inviare una prenotazione. Spuntando la casella nel modulo li accetti e prendi visione della nostra {privacyLink}.</p>`,
    sections: [
      ["Chi siamo e cosa offriamo", `<p>{brand} è il servizio transfer di {company}, agenzia di viaggi con licenza TÜRSAB n. {tursab}. Offriamo transfer privati con autista <strong>solo all'interno della provincia di Istanbul</strong>: da e per l'aeroporto di Istanbul (IST), l'aeroporto Sabiha Gökçen (SAW), il porto crociere Galataport, hotel, indirizzi e luoghi di interesse della città. Una corsa che inizia o termina fuori Istanbul è possibile solo se la concordiamo per iscritto in anticipo.</p>
<p>La corsa è effettuata dai nostri autisti e veicoli o da società di trasporto e autisti autorizzati che lavorano per noi. In ogni caso restiamo il tuo referente e siamo responsabili verso di te della prenotazione.</p>`],
      ["Prenotazione e conferma", `<ul><li>L'invio del modulo è una <strong>richiesta</strong>, non ancora un contratto. Ricevi un'e-mail che conferma la ricezione.</li>
<li>Il contratto si conclude quando ti inviamo l'<strong>e-mail di conferma</strong> con il numero di prenotazione e il voucher. Di solito rispondiamo entro un'ora; se non possiamo effettuare la richiesta te lo comunichiamo via e-mail e nulla è dovuto.</li>
<li>Se possiamo offrire solo un altro orario, veicolo o prezzo, ti inviamo una proposta; la prenotazione si conclude solo se la accetti.</li>
<li>Per prenotare devi avere almeno 18 anni. Chi prenota per altri passeggeri accetta questi termini anche per loro e garantisce la correttezza dei loro dati.</li>
<li>Controlla la conferma e scrivici subito se data, ora, indirizzo, numero di volo o numero di passeggeri sono errati: la corsa segue la conferma.</li></ul>`],
      ["Veicoli", `<p>Prenoti una categoria di veicolo, non un modello o una targa specifici:</p>
<ul><li><strong>Berlina</strong>: fino a 3 passeggeri e 3 valigie (Skoda Octavia, Toyota Corolla o simile).</li>
<li><strong>Minivan</strong>: fino a 6 passeggeri e 7 valigie (Mercedes Vito, Ford Tourneo o simile).</li>
<li><strong>Mercedes Classe V</strong>: fino a 6 passeggeri e 6 valigie.</li>
<li><strong>Minibus</strong>: fino a 13 passeggeri e 16 valigie (Mercedes Sprinter o simile).</li></ul>
<p>Le foto sul sito sono esempi. Possiamo inviare senza sovrapprezzo un veicolo della stessa categoria o superiore. Tutti i veicoli sono autorizzati al trasporto commerciale di passeggeri, assicurati come richiede la legge turca e per non fumatori.</p>`],
      ["Prezzi", `<ul><li>I prezzi sono <strong>fissi per veicolo</strong>, non a persona, e sono mostrati in euro prima dell'invio della richiesta. Il prezzo nella conferma è quello che paghi.</li>
<li>Il prezzo include carburante, pedaggi di autostrade, ponti e tunnel, parcheggio in aeroporto, il tempo di attesa gratuito indicato sotto e l'accoglienza con cartello nominativo.</li>
<li>Nelle ore di punta può applicarsi un supplemento, sempre incluso nel prezzo mostrato prima della prenotazione. Con il transfer di ritorno hai il {returnPct}% di sconto sul ritorno. Un seggiolino costa {seat} € ciascuno.</li>
<li>Il prezzo cambia solo se cambia la prenotazione: altro indirizzo, fermata o deviazione aggiuntiva, più passeggeri o bagagli del previsto, o attesa oltre il tempo gratuito. L'autista o l'ufficio ti comunica il costo extra prima di applicarlo.</li>
<li>Traffico, un percorso più lungo scelto dall'autista o un volo in ritardo non cambiano mai il prezzo.</li></ul>`],
      ["Pagamento", `<ul><li>Paghi <strong>l'autista in contanti alla fine della corsa</strong>, in euro, dollari USA o lire turche al cambio del giorno. Non servono pagamento anticipato, caparra o dati della carta.</li>
<li>Aziende e partner con accordo scritto possono pagare con bonifico o in conto, come previsto dall'accordo.</li>
<li>Se ti serve una fattura, comunicacelo prima o subito dopo la corsa con intestazione, indirizzo e codice fiscale. Le fatture sono emesse secondo la legge turca.</li></ul>`],
      ["Prelievo, punto d'incontro e tempo di attesa", `<ul><li><strong>Aeroporti</strong>: monitoriamo il tuo volo. L'autista ti aspetta nella sala arrivi con un cartello con il tuo nome. I primi <strong>{wait} minuti dopo l'atterraggio effettivo</strong> sono gratuiti, sufficienti per controllo passaporti e bagagli.</li>
<li><strong>Porto crociere</strong>: l'autista aspetta all'uscita del terminal; seguiamo l'orario di sbarco della nave.</li>
<li><strong>Hotel e altri indirizzi</strong>: l'autista aspetta <strong>15 minuti</strong> dopo l'orario prenotato all'ingresso o nel luogo indicato.</li>
<li>Se ti serve più tempo (bagaglio smarrito, lunghe code), scrivici o chiamaci: se possibile continuiamo ad aspettare e ti diciamo se l'attesa extra è a pagamento.</li>
<li>Se il tempo gratuito è scaduto e non riusciamo a contattarti per telefono, WhatsApp o e-mail, l'autista può andare via e la corsa è considerata mancata presentazione (vedi cancellazione).</li>
<li>Per le corse verso l'aeroporto prevedi margine per traffico e check-in. Consigliamo il prelievo almeno 3 ore prima di un volo internazionale; possiamo consigliarti al momento della prenotazione.</li></ul>`],
      ["I tuoi obblighi", `<p>Indica nome corretto, un numero di telefono raggiungibile all'arrivo (possibilmente WhatsApp), e-mail, numero di volo, indirizzi, numero di passeggeri e bagagli. Avvisaci al più presto se il volo è cancellato, dirottato o riprogrammato o se cambiano i tuoi piani. Non siamo responsabili di un prelievo mancato per dati errati o mancanti.</p>`],
      ["Modifiche da parte tua", `<ul><li>Puoi modificare data, ora, indirizzo, veicolo o numero di passeggeri <strong>gratuitamente fino a 24 ore prima del prelievo</strong>, rispondendo all'e-mail di conferma o su WhatsApp.</li>
<li>Le modifiche successive sono accettate se sono disponibili un veicolo e un autista adatti. Una modifica può cambiare il prezzo; te lo comunichiamo prima di applicarlo.</li>
<li>Un volo in ritardo con lo stesso numero non è una modifica: lo seguiamo automaticamente.</li></ul>`],
      ["Cancellazione e rimborsi", `<ul><li><strong>Cancellazione gratuita fino a 24 ore prima del prelievo.</strong> Rispondi all'e-mail di conferma o scrivici su WhatsApp. Ricevi un'e-mail di cancellazione.</li>
<li>Se cancelli meno di 24 ore prima del prelievo, o il passeggero non si presenta senza avvisare, possiamo addebitare fino all'intero prezzo della corsa, soprattutto se l'autista è già in viaggio.</li>
<li>Se il tuo volo viene cancellato e ce lo comunichi prima dell'orario di prelievo, cancelliamo gratuitamente.</li>
<li>Se hai pagato in anticipo (per esempio con bonifico in base a un accordo aziendale), rimborsiamo gli importi non dovuti entro 14 giorni con lo stesso metodo di pagamento.</li>
<li>Poiché il servizio è un trasporto di passeggeri in una data determinata, il diritto legale di recesso dei contratti a distanza non si applica. Al suo posto vale la cancellazione gratuita sopra descritta.</li></ul>`],
      ["Se cancelliamo noi o siamo in ritardo", `<p>Se dobbiamo cancellare una prenotazione confermata, ti avvisiamo il prima possibile e cerchiamo un altro veicolo allo stesso prezzo. Se non troviamo un'alternativa non paghi nulla e quanto versato è rimborsato per intero. Se non trovi l'autista, chiamaci o scrivici subito su WhatsApp per ricevere aiuto sul posto.</p>`],
      ["Passeggeri e bagagli", `<ul><li>Il numero di passeggeri (neonati e bambini inclusi) e di valigie non può superare la capienza del veicolo prenotato. La legge turca non ammette più passeggeri dei posti. Altrimenti l'autista può rifiutare la corsa o può servire un veicolo più grande con supplemento.</li>
<li>La capienza si intende per una valigia standard e un piccolo bagaglio a mano a passeggero. Segnala in anticipo oggetti ingombranti come sacche da golf, sci, biciclette, sedie a rotelle, passeggini o strumenti musicali.</li>
<li>Gli animali viaggiano solo previo accordo, in un trasportino chiuso. Segnala in anticipo un cane d'assistenza.</li>
<li>Non si trasportano oggetti pericolosi, illegali o infiammabili.</li>
<li>Ricorda di prendere tutti i tuoi effetti. Aiutiamo a cercare oggetti smarriti ma non siamo responsabili di quanto lasciato nel veicolo.</li></ul>`],
      ["Seggiolini per bambini", `<ul><li>Secondo il codice della strada turco i bambini devono viaggiare in un seggiolino adatto a età, altezza e peso. Indica il numero di seggiolini nel modulo ({seat} € ciascuno) e l'età dei bambini nella nota.</li>
<li>Su richiesta forniamo ovetti e rialzi. Puoi anche portare il tuo seggiolino omologato.</li>
<li>Se serve un seggiolino ma non è stato prenotato, l'autista potrebbe non poter trasportare il bambino; non siamo responsabili del ritardo che ne deriva.</li>
<li>Sistemare il bambino nel seggiolino spetta al genitore o all'adulto accompagnatore; l'autista aiuta a montarlo.</li></ul>`],
      ["Comportamento a bordo", `<ul><li>Tutti i passeggeri devono allacciare le cinture. Fumare, anche sigarette elettroniche, è vietato per legge nei veicoli commerciali in Turchia.</li>
<li>L'autista può rifiutare o interrompere la corsa se un passeggero è violento, offensivo, gravemente ubriaco o mette in pericolo la sicurezza. In tal caso è dovuto l'intero prezzo.</li>
<li>Danni o sporco grave causati dai passeggeri (per esempio vomito) possono essere addebitati al costo documentato di pulizia o riparazione.</li></ul>`],
      ["Responsabilità", `<ul><li>Effettuiamo la corsa con la dovuta diligenza e con autisti in possesso delle abilitazioni di legge. I passeggeri sono coperti dalle assicurazioni obbligatorie per il trasporto commerciale di persone.</li>
<li>Non siamo responsabili di ritardi o voli, navi o appuntamenti persi per eventi fuori dal nostro controllo (incidenti, chiusure stradali, controlli di polizia, maltempo, eventi), se abbiamo agito con diligenza. Rispondiamo di danni indiretti (coincidenze perse, notti d'hotel, perdite d'affari) solo per dolo o colpa grave.</li>
<li>La nostra responsabilità per danni ai bagagli è limitata nella misura consentita dalla legge; segnala il danno subito all'autista ed entro 7 giorni a noi.</li>
<li>Nulla in questi termini limita la responsabilità per morte o lesioni, per dolo o colpa grave, né i tuoi diritti inderogabili di consumatore.</li></ul>`],
      ["Forza maggiore", `<p>Nessuna parte è responsabile dell'inadempimento dovuto a eventi fuori dal suo controllo: calamità naturali, epidemie, guerre, scioperi, provvedimenti delle autorità, chiusure di aeroporti o strade. In tal caso ciascuna parte può cancellare gratuitamente e gli acconti sono rimborsati.</p>`],
      ["Reclami", `<p>Se qualcosa è andato storto, scrivi a {email} con il numero di prenotazione, preferibilmente entro 30 giorni. Rispondiamo entro 14 giorni. I consumatori in Turchia possono rivolgersi anche alla commissione arbitrale dei consumatori (Tüketici Hakem Heyeti) o al tribunale dei consumatori nei limiti di legge; i consumatori UE al proprio centro europeo consumatori.</p>`],
      ["Legge applicabile, foro e modifiche", `<p>Questi termini sono regolati dalla legge della Repubblica di Turchia. Sono competenti i tribunali e gli uffici esecutivi di Istanbul, fatte salve le norme inderogabili che consentono al consumatore di rivolgersi ai giudici o alle autorità del proprio luogo di residenza. Possiamo aggiornare questi termini; a ogni prenotazione si applica la versione in vigore al momento dell'invio. Se una clausola è invalida, le altre restano valide. I termini sono pubblicati in più lingue; in caso di differenze prevale la versione turca.</p>`],
      ["Contatti e dati societari", `{details}`]
    ]
  },
  privacy: {
    title: "Informativa sulla privacy",
    desc: "Privacy secondo KVKK e GDPR: quali dati raccogliamo quando prenoti un transfer, perché, chi li riceve, per quanto tempo, cookie e i tuoi diritti.",
    intro: `<p>Questa informativa spiega come {company} tratta i tuoi dati personali quando visiti {url}, prenoti un transfer o ci contatti. È la nostra informativa ai sensi della legge turca n. 6698 sulla protezione dei dati personali (KVKK) e, per i visitatori dell'Unione europea e del Regno Unito, del Regolamento generale sulla protezione dei dati (GDPR). Vedi anche i nostri {termsLink}.</p>`,
    sections: [
      ["Titolare del trattamento", `<p>Il titolare del trattamento è {company}, {address}. Per i tuoi dati puoi contattarci a {email} o al {phone}.</p>`],
      ["Dati raccolti", `<ul><li><strong>Dati di prenotazione</strong>: nome, e-mail, numero di telefono o WhatsApp, indirizzi di prelievo e destinazione, data e ora, dati del volo o della nave, numero di passeggeri, bagagli e seggiolini, nota per l'autista, veicolo scelto e prezzo.</li>
<li><strong>Dati dei passeggeri per le autorità</strong>: per le corse con veicoli propri la legge turca impone di comunicare i passeggeri al sistema U-ETDS del Ministero dei Trasporti. Per questo possiamo chiedere nome, nazionalità, sesso e numero di passaporto o di carta d'identità turca di ciascun passeggero.</li>
<li><strong>Prenotazioni non completate</strong>: se inserisci nome, telefono o e-mail nel modulo ma non lo invii, salviamo quanto digitato affinché il nostro ufficio possa contattarti una volta per aiutarti a completare.</li>
<li><strong>Messaggi</strong>: ciò che ci scrivi via e-mail, WhatsApp, telefono o tramite i moduli di candidatura per aziende (account aziendali, fornitori, partner).</li>
<li><strong>Dati tecnici</strong>: indirizzo IP, tipo di browser, pagina di provenienza, paese e città approssimativi ricavati dall'IP, pagine visitate. Il nostro contatore di visite non usa cookie e non conserva il tuo indirizzo IP.</li>
<li><strong>Dati di analisi</strong>: solo se accetti i cookie di analisi, vedi "Cookie".</li></ul>
<p>Non chiediamo dati di carte di pagamento e non raccogliamo dati particolari (per esempio sulla salute), salvo ciò che scegli di comunicarci, ad esempio che un passeggero usa una sedia a rotelle, informazione usata solo per organizzare la corsa.</p>`],
      ["Finalità e basi giuridiche", `<ul><li><strong>Concludere ed eseguire il transfer</strong>: conferma, invio del voucher, comunicazione all'autista delle informazioni necessarie, monitoraggio del volo, contatti su corsa, modifiche e cancellazioni. Base giuridica: esecuzione del contratto (KVKK art. 5(2)(c); GDPR art. 6(1)(b)).</li>
<li><strong>Adempiere obblighi di legge</strong>: comunicazione U-ETDS, fatturazione, contabilità e fisco, risposte alle autorità. Base giuridica: obbligo legale (KVKK art. 5(2)(a) e (ç); GDPR art. 6(1)(c)).</li>
<li><strong>Aiutarti a completare una prenotazione iniziata, gestire reclami, prevenire abusi e tutelare i nostri diritti</strong>, proteggere il sito e contare le visite senza cookie. Base giuridica: legittimo interesse (KVKK art. 5(2)(e) e (f); GDPR art. 6(1)(f)).</li>
<li><strong>Cookie di analisi</strong>: solo con il tuo consenso (KVKK art. 5(1); GDPR art. 6(1)(a)), revocabile in qualsiasi momento.</li></ul>
<p>Raccogliamo i dati tramite il modulo di prenotazione, e-mail e WhatsApp, telefono, partner che ci inoltrano prenotazioni e automaticamente tramite il sito. Non inviamo comunicazioni promozionali senza consenso separato e non adottiamo decisioni basate unicamente su trattamenti automatizzati.</p>`],
      ["Destinatari", `<ul><li>L'<strong>autista</strong> e, se la corsa è svolta da un partner, la <strong>società di trasporto autorizzata</strong>: solo quanto necessario (nome, telefono, dati di prelievo, volo, passeggeri).</li>
<li><strong>Fornitori</strong> che trattano dati per nostro conto: hosting del sito (Vercel), database (Upstash), invio e-mail (Resend), notifiche di prenotazione all'ufficio (Telegram), informazioni sui voli (AeroDataBox), il nostro sistema di gestione prenotazioni e un servizio di IA (Anthropic) che aiuta l'ufficio a leggere i messaggi di prenotazione che ci invii.</li>
<li><strong>Google</strong> (Google Analytics), solo se accetti i cookie di analisi.</li>
<li><strong>Autorità pubbliche</strong> quando la legge lo richiede: Ministero dei Trasporti (U-ETDS), autorità fiscali, tribunali, forze dell'ordine.</li>
<li>Se necessario, i nostri commercialisti e avvocati, tenuti alla riservatezza.</li></ul>
<p>Non vendiamo i tuoi dati.</p>`],
      ["Trasferimenti all'estero", `<p>Alcuni fornitori conservano o trattano dati fuori dalla Turchia, nell'Unione europea o negli Stati Uniti (il sito, ad esempio, gira su server a Francoforte). Trasferiamo dati all'estero solo nei casi ammessi dall'art. 9 KVKK: quando necessario per il contratto con te, sulla base di clausole contrattuali standard notificate all'Autorità per la protezione dei dati, o con altre garanzie previste dalla legge. Per i trasferimenti dall'UE ci basiamo sulle clausole contrattuali standard della Commissione europea o su decisioni di adeguatezza.</p>`],
      ["Periodi di conservazione", `<ul><li><strong>Prenotazioni e relativa corrispondenza</strong>: 10 anni dopo la corsa, come richiesto dal diritto commerciale e fiscale turco per i documenti aziendali, poi cancellate o anonimizzate.</li>
<li><strong>Dati passeggeri U-ETDS</strong>: per il periodo previsto dalla normativa sui trasporti.</li>
<li><strong>Prenotazioni non completate</strong>: cancellate automaticamente dopo 30 giorni o subito all'invio della prenotazione.</li>
<li><strong>Link nelle e-mail</strong> per accettare una modifica: 60 giorni.</li>
<li><strong>Moduli di candidatura aziendali</strong>: fino a 2 anni o per la durata dell'eventuale accordo successivo.</li>
<li><strong>Dati di analisi</strong>: non oltre 14 mesi in Google Analytics. Le statistiche del nostro contatore sono aggregate e non contengono dati personali.</li></ul>
<p>I dati possono essere conservati più a lungo se necessario per una controversia. Alla scadenza vengono cancellati, distrutti o anonimizzati secondo la nostra politica di conservazione.</p>`],
      ["Cookie e tecnologie simili", `<ul><li><strong>Memorizzazione necessaria</strong>: il sito conserva i dati inseriti nel modulo di prenotazione e la pagina di provenienza nella memoria di sessione (session storage) del browser fino alla chiusura della scheda, così non perdi quanto digitato. Non serve consenso.</li>
<li><strong>Conteggio visite</strong>: il nostro contatore invia una richiesta senza cookie per ogni pagina vista (pagina, sito di provenienza, lingua); il risultato è una statistica aggregata.</li>
<li><strong>Cookie di analisi (Google Analytics)</strong>: impostati solo dopo aver cliccato "Accetta" nel banner. Ci aiutano a capire come viene usato il sito. La tua scelta è salvata nel browser; puoi cambiarla in qualsiasi momento da "Impostazioni cookie" o cancellando i dati del browser.</li></ul>
<p>Non usiamo cookie pubblicitari né tracker dei social network.</p>`],
      ["Come proteggiamo i dati", `<p>I dati sono trasmessi tramite connessione cifrata (HTTPS). L'accesso alle prenotazioni è limitato al personale che ne ha bisogno ed è protetto da password; gli autisti vedono solo quanto serve per la corsa. I fornitori sono vincolati per contratto a riservatezza e sicurezza. In caso di violazione dei dati informiamo le autorità e te come prevede la legge.</p>`],
      ["I tuoi diritti", `<p>Ai sensi dell'art. 11 KVKK puoi sapere se trattiamo i tuoi dati, ottenere informazioni su di essi e sulle finalità, conoscere a chi sono stati comunicati in Turchia o all'estero, far correggere dati incompleti o inesatti, farli cancellare o distruggere alle condizioni dell'art. 7 KVKK, far informare i destinatari di correzioni o cancellazioni, opporti a un risultato sfavorevole derivante esclusivamente da analisi automatizzate e chiedere il risarcimento dei danni da trattamento illecito.</p>
<p>Ai sensi del GDPR hai inoltre diritto di accesso, rettifica, cancellazione, limitazione, portabilità, opposizione al trattamento basato sul legittimo interesse e revoca del consenso in qualsiasi momento, senza effetti sui trattamenti precedenti.</p>`],
      ["Come esercitare i diritti e reclami", `<p>Scrivi a {email} o invia una lettera firmata a {address} indicando nome, recapiti e richiesta; possiamo chiedere una prova d'identità. Rispondiamo gratuitamente entro 30 giorni. Se non sei soddisfatto puoi presentare reclamo all'Autorità turca per la protezione dei dati (KVKK, www.kvkk.gov.tr) e, se risiedi nell'UE o nel Regno Unito, all'autorità di controllo del tuo paese.</p>`],
      ["Minori", `<p>Le prenotazioni devono essere fatte da adulti. Trattiamo i dati dei minori (età, necessità di seggiolino, dati U-ETDS) solo nell'ambito di una prenotazione fatta da un genitore o da un adulto accompagnatore.</p>`],
      ["Modifiche a questa informativa", `<p>Aggiorniamo l'informativa quando cambiano i nostri trattamenti. La data in alto indica la versione in vigore.</p>`],
      ["Contatti e dati societari", `{details}`]
    ]
  }
};
