module.exports = {
  ui: { perPerson: "A persona", more: "Altre guide" },
  cheap: {
    path: "/it/taxi-economico-istanbul",
    nav: "Taxi economico Istanbul",
    title: "Taxi economico a Istanbul · prezzo fisso da €{min}",
    desc: "Taxi privato economico a Istanbul a prezzo fisso da €{min} per auto, pedaggi inclusi. Niente tassametro né deviazioni, pagamento in contanti all'autista.",
    h1: "Taxi economico a Istanbul a prezzo fisso",
    lead: "Il taxi privato più economico con {brand} costa <strong>€{min} per auto</strong> (berlina, fino a 3 passeggeri). Dall'aeroporto di Istanbul (IST) i prezzi partono da €{istMin}, da Sabiha Gökçen (SAW) da €{sawMin}. Il prezzo è fissato alla prenotazione, pedaggi e parcheggio sono inclusi e pagate l'autista in contanti.",
    tableH: "Le tratte di transfer più economiche a Istanbul",
    tableNote: "A persona: il prezzo dell'auto diviso per un'auto piena.",
    sections: [
      ["Perché un prezzo fisso spesso costa meno del tassametro", "<p>Un taxi a tassametro dall'aeroporto sembra economico finché non si sommano traffico, un percorso più lungo o la tariffa notturna. Il nostro prezzo è per auto e fissato prima del volo: lo stesso che il viaggio duri 45 minuti o due ore. Nessun pedaggio, parcheggio o supplemento bagagli in più.</p>"],
      ["Come pagare il meno possibile", "<ul><li><strong>Riempite l'auto.</strong> Un minivan fino a 6 costa da €{van}, quindi un gruppo di sei paga pochi euro a testa.</li><li><strong>Prenotate anche il ritorno.</strong> Il transfer di ritorno ha il {ret}% di sconto.</li><li><strong>Evitate il picco serale.</strong> I ritiri a IST {istFrom}–{istTo} e a SAW {sawFrom}–{sawTo} costano il {peak}% in più.</li><li><strong>Scegliete l'aeroporto giusto.</strong> Per la sponda asiatica (Kadıköy, Üsküdar, Ataşehir) Sabiha Gökçen è più vicino e più economico.</li></ul>"],
      ["Più economico del taxi: i mezzi pubblici", "<p>Se il budget conta più di tutto e viaggiate leggeri, dall'aeroporto di Istanbul partono la metro M11 e i bus Havaist, da Sabiha Gökçen la metro M4 e Havabus. Costano pochi euro a persona, ma con cambi, scale e bagagli da portare. In due o più, o a tarda notte, un taxi privato a prezzo fisso conviene di solito di più.</p>"]
    ],
    faq: [
      ["Qual è il taxi più economico a Istanbul?", "Con {brand} il taxi privato più economico costa €{min} per auto, in berlina fino a 3 passeggeri. Il prezzo è fisso, pedaggi e parcheggio inclusi, e pagate in contanti a fine viaggio."],
      ["Quanto costa un taxi economico dall'aeroporto di Istanbul alla città?", "Dall'aeroporto di Istanbul (IST) una berlina costa da €{istMin} per auto per Taksim e Şişli, €{istSult} per Sultanahmet. Tutte le tratte sono nel listino prezzi."],
      ["Il prezzo è a persona?", "No, per auto. Una berlina porta fino a 3 passeggeri, un minivan fino a 6 e un minibus fino a 13: più l'auto è piena, meno si paga a testa."],
      ["Ci sono costi nascosti?", "No. Pedaggi, parcheggio e i primi {wait} minuti di attesa dopo l'atterraggio sono inclusi. Il seggiolino per bambini costa €{seat} se lo richiedete."]
    ]
  },
  private: {
    path: "/it/taxi-privato-istanbul",
    nav: "Taxi privato Istanbul",
    title: "Taxi privato a Istanbul · l'autista vi aspetta, da €{min}",
    desc: "Prenotate un taxi privato a Istanbul: auto e autista solo per voi, prezzo fisso da €{min} per auto, cartello con il nome agli arrivi e monitoraggio del volo.",
    h1: "Taxi privato a Istanbul con il vostro autista",
    lead: "Un taxi privato con {brand} è la vostra auto con un autista professionista, prenotata in anticipo a un <strong>prezzo fisso da €{min} per auto</strong>. L'autista segue il volo, vi aspetta nella sala arrivi con un cartello con il vostro nome e vi porta direttamente in hotel. Pagate in contanti a fine viaggio.",
    tableH: "Prezzi del taxi privato sulle tratte più richieste",
    tableNote: "Pedaggi e parcheggio inclusi.",
    sections: [
      ["Cosa lo rende privato", "<ul><li>L'auto è solo per voi e il vostro gruppo, mai condivisa con altri passeggeri.</li><li>È l'autista ad aspettare voi: monitoraggio del volo e {wait} minuti di attesa gratuita dopo l'atterraggio.</li><li>Porta a porta: dal terminal, dall'hotel o dal porto crociere all'indirizzo che indicate.</li><li>Scegliete voi l'auto: berlina (3), minivan (6), Mercedes Classe V (6) o minibus (13).</li></ul>"],
      ["Taxi privato o taxi per strada?", "<p>A Istanbul il taxi di strada va a tassametro, prende chi alza la mano per primo ed è spesso difficile da trovare nelle ore di punta o con la pioggia. Il taxi privato si prenota prima: l'auto è già lì e il prezzo è già concordato. {brand} è un'azienda di transfer autorizzata (licenza TÜRSAB {tursab}), non un posteggio di taxi.</p>"],
      ["Dove andiamo", "<p>Solo a Istanbul: aeroporto di Istanbul (IST), Sabiha Gökçen (SAW), il porto crociere Galataport e tutti i quartieri centrali sulle due sponde del Bosforo, tra cui Sultanahmet, Taksim, Beşiktaş, Şişli, Kadıköy e Üsküdar.</p>"]
    ],
    faq: [
      ["Come si prenota un taxi privato a Istanbul?", "Scegliete sul nostro sito tratta, auto e orario e inviate la richiesta. Ci vuole circa un minuto, senza account e senza pagamento anticipato. L'e-mail di conferma arriva di solito entro un'ora."],
      ["Quanto costa un taxi privato dall'aeroporto di Istanbul?", "A seconda del quartiere, da €{istMin} per auto in berlina, €{van} in minivan fino a 6 e €{vip} in Mercedes Classe V."],
      ["L'autista aspetta se il volo è in ritardo?", "Sì. Seguiamo il vostro volo e adattiamo il ritiro; i primi {wait} minuti dopo l'atterraggio sono gratuiti."],
      ["Posso cancellare?", "Sì, gratis fino a 24 ore prima del ritiro."]
    ]
  },
  black: {
    path: "/it/taxi-vip-istanbul",
    nav: "Taxi VIP e taxi nero Istanbul",
    title: "Taxi VIP a Istanbul · Mercedes Classe V da €{vip}",
    desc: "Transfer VIP e taxi nero a Istanbul: Mercedes Classe V nera con autista professionista, prezzo fisso da €{vip} per auto fino a 6 passeggeri.",
    h1: "Transfer VIP e taxi nero a Istanbul",
    lead: "Per un viaggio in auto nera a Istanbul, {brand} manda una <strong>Mercedes-Benz Classe V VIP</strong> con autista professionista a un <strong>prezzo fisso da €{vip} per auto</strong> fino a 6 passeggeri e 6 valigie. L'autista vi accoglie agli arrivi con il cartello e pagate in contanti a fine viaggio.",
    tableH: "Prezzi Mercedes Classe V VIP",
    tableNote: "Solo andata, per auto, fino a 6 passeggeri e 6 valigie. Pedaggi e parcheggio inclusi.",
    sections: [
      ["I taxi neri di Istanbul e il transfer VIP", "<p>Oltre ai taxi gialli, Istanbul ha taxi turchesi e neri; i neri sono la classe premium con la tariffa a tassametro più alta. Bisogna comunque trovarli per strada o al posteggio. Il transfer VIP si prenota in anticipo: una Mercedes Classe V nera vi aspetta all'atterraggio, a un prezzo che conoscete prima di partire.</p>"],
      ["Cosa offre la Classe V", "<ul><li>Sei sedili ampi in un abitacolo silenzioso, con spazio per parlare o lavorare durante il viaggio.</li><li>Spazio per sei valigie, sacche da golf o passeggini.</li><li>Autista professionista, monitoraggio del volo e {wait} minuti di attesa gratuita.</li><li>Cancellazione gratuita fino a 24 ore prima del ritiro.</li></ul>"],
      ["Ideale per", "<p>Viaggi di lavoro, famiglie che vogliono comfort dopo un volo lungo, viaggi di nozze e transfer per hotel ed eventi. Per gruppi più grandi il minibus Mercedes Sprinter fino a 13 posti costa da €{bus} per auto.</p>"]
    ],
    faq: [
      ["Esistono taxi neri a Istanbul?", "Sì. I taxi ufficiali di Istanbul sono gialli, turchesi e neri; il nero è la classe premium a tassametro. Se volete un'auto nera che vi aspetti in aeroporto a prezzo fisso, prenotate con {brand} un transfer VIP in Mercedes Classe V."],
      ["Quanto costa un transfer VIP dall'aeroporto di Istanbul?", "Una Mercedes Classe V dall'aeroporto di Istanbul (IST) costa da €{vip} per auto fino a 6 passeggeri, a seconda del quartiere."],
      ["Il prezzo della Classe V è a persona?", "No, è per auto, fino a 6 passeggeri e 6 valigie."],
      ["Come si paga?", "In contanti all'autista a fine viaggio, in euro, dollari USA o lire turche. Nessun acconto."]
    ]
  },
  best: {
    path: "/it/miglior-transfer-aeroporto-istanbul",
    nav: "Miglior transfer aeroporto Istanbul",
    title: "Miglior transfer aeroporto Istanbul · come scegliere",
    desc: "Come scegliere il miglior transfer o taxi dall'aeroporto di Istanbul: prezzo fisso, licenza, accoglienza, monitoraggio volo, cancellazione gratuita.",
    h1: "Come scegliere il miglior transfer aeroportuale a Istanbul",
    lead: "Il miglior taxi o transfer dall'aeroporto di Istanbul vi dà un <strong>prezzo fisso per auto</strong>, un'<strong>azienda autorizzata</strong>, un autista che <strong>vi aspetta nel terminal con il vostro nome</strong>, il <strong>monitoraggio del volo</strong> e la <strong>cancellazione gratuita</strong>. {brand} offre tutti e cinque, da €{min} per auto, con pagamento in contanti all'autista.",
    tableH: "Prezzi fissi delle tratte più prenotate",
    tableNote: "Pedaggi, parcheggio e attesa inclusi.",
    sections: [
      ["Cinque cose da controllare prima di prenotare", "<ol><li><strong>Prezzo fisso per auto</strong>, pedaggi e parcheggio inclusi, non un prezzo a persona o una stima.</li><li><strong>Una licenza.</strong> In Turchia le aziende di transfer sono autorizzate dal TÜRSAB; la nostra è {tursab}.</li><li><strong>Accoglienza nella sala arrivi</strong>, non «chiamateci quando atterrate».</li><li><strong>Monitoraggio del volo e attesa gratuita</strong>, così un ritardo non vi costa nulla. Da noi {wait} minuti dopo l'atterraggio.</li><li><strong>Cancellazione gratuita e nessun pagamento anticipato</strong>, perché i piani possono cambiare.</li></ol>"],
      ["Le vostre opzioni negli aeroporti di Istanbul", "<ul><li><strong>Posteggio taxi:</strong> nessuna prenotazione, ma spesso c'è la coda, il tassametro corre nel traffico e l'autista può non conoscere il vostro hotel.</li><li><strong>App di taxi:</strong> a Istanbul chiamano per lo più un normale taxi giallo, con lo stesso tassametro.</li><li><strong>Bus e metro:</strong> la scelta più economica, ma con cambi e bagagli da portare.</li><li><strong>Transfer privato:</strong> prenotato in anticipo, a prezzo fisso, con un autista che aspetta con il vostro nome. La scelta più semplice per famiglie, gruppi e arrivi tardi.</li></ul>"],
      ["Perché i viaggiatori prenotano {brand}", "<p>Lavoriamo solo a Istanbul, quindi i nostri autisti conoscono gli hotel della città, le uscite degli aeroporti e il terminal crociere Galataport. Scegliete berlina, minivan, Mercedes Classe V o minibus fino a 13, prenotate in circa un minuto senza account e ricevete l'e-mail di conferma, di solito entro un'ora.</p>"]
    ],
    faq: [
      ["Qual è il modo migliore per andare dall'aeroporto di Istanbul in città?", "Per la maggior parte dei viaggiatori un transfer privato prenotato in anticipo: l'autista aspetta con il cartello, il prezzo è fisso e l'auto vi lascia davanti all'hotel. Con {brand} da €{istMin} per auto dall'aeroporto di Istanbul."],
      ["Qual è la migliore compagnia di taxi a Istanbul?", "Cercate un'azienda autorizzata con prezzi fissi per auto, accoglienza, monitoraggio del volo e cancellazione gratuita. {brand} è un'azienda di transfer di Istanbul con licenza TÜRSAB ({tursab}) che offre tutto questo."],
      ["Conviene prenotare il taxi dall'aeroporto in anticipo?", "Sì. L'auto vi aspetta già, evitate la coda dei taxi e conoscete il prezzo prima di partire."],
      ["Per il mio hotel è meglio Sabiha Gökçen o l'aeroporto di Istanbul?", "Per la sponda europea (Sultanahmet, Taksim, Beşiktaş) di solito è più vicino l'aeroporto di Istanbul, per quella asiatica (Kadıköy, Üsküdar, Ataşehir) Sabiha Gökçen."]
    ]
  }
};
