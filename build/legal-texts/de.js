// German terms of service and privacy notice. DRAFT: have a lawyer check before relying on it. Placeholders: see en.js.
module.exports = {
  updated: "2. November 2026",
  ui: {
    updated: "Zuletzt aktualisiert", toc: "Inhalt",
    rows: { company: "Unternehmen", address: "Eingetragene Anschrift", mersis: "MERSIS-Nummer", tax: "Finanzamt und Steuernummer", tradeReg: "Handelsregisternummer",
      kep: "Registrierte E-Mail (KEP)", tursab: "TÜRSAB-Lizenz", verbis: "VERBIS-Registrierung", euRep: "EU-Vertreter (Art. 27 DSGVO)", email: "E-Mail", phone: "Telefon und WhatsApp" }
  },
  terms: {
    title: "Allgemeine Geschäftsbedingungen",
    desc: "AGB für Istanbul-Transfers: Buchung, Festpreis, Barzahlung, Wartezeit, Gepäck, Kindersitze, kostenlose Stornierung und Haftung.",
    intro: `<p>Diese Bedingungen bilden den Vertrag zwischen Ihnen und {company} („wir“), dem Unternehmen, das {brand} betreibt und die auf {url} gebuchten Transfers durchführt. Bitte lesen Sie sie, bevor Sie eine Buchung absenden. Mit dem Häkchen im Buchungsformular akzeptieren Sie diese Bedingungen und nehmen die {privacyLink} zur Kenntnis.</p>`,
    sections: [
      ["Wer wir sind und was wir anbieten", `<p>{brand} ist der Transferdienst von {company}, einem von TÜRSAB unter der Nummer {tursab} lizenzierten Reisebüro. Wir bieten private Transfers mit Fahrer <strong>ausschließlich innerhalb der Provinz Istanbul</strong> an: von und zum Flughafen Istanbul (IST), zum Flughafen Sabiha Gökçen (SAW), zum Kreuzfahrthafen Galataport, zu Hotels, Adressen und Sehenswürdigkeiten der Stadt. Eine Fahrt, die außerhalb Istanbuls beginnt oder endet, ist nur möglich, wenn wir sie vorher schriftlich vereinbaren.</p>
<p>Die Fahrt wird von unseren eigenen Fahrern und Fahrzeugen oder von lizenzierten Transportunternehmen und Fahrern in unserem Auftrag durchgeführt. In jedem Fall bleiben wir Ihr Ansprechpartner und Ihnen gegenüber für die Buchung verantwortlich.</p>`],
      ["Buchung und Bestätigung", `<ul><li>Das Absenden des Buchungsformulars ist eine <strong>Anfrage</strong>, noch kein Vertrag. Sie erhalten eine E-Mail, dass wir sie erhalten haben.</li>
<li>Der Vertrag kommt zustande, wenn wir Ihnen die <strong>Bestätigungs-E-Mail</strong> mit Buchungsnummer und Voucher senden. Meist antworten wir innerhalb einer Stunde; können wir die Anfrage nicht ausführen, teilen wir Ihnen das per E-Mail mit und es entstehen keine Kosten.</li>
<li>Können wir nur eine andere Zeit, ein anderes Fahrzeug oder einen anderen Preis anbieten, senden wir Ihnen einen Vorschlag; die Buchung kommt nur zustande, wenn Sie ihn annehmen.</li>
<li>Sie müssen mindestens 18 Jahre alt sein. Wer für andere Fahrgäste bucht, akzeptiert diese Bedingungen auch für sie und sorgt für richtige Angaben.</li>
<li>Bitte prüfen Sie die Bestätigung. Melden Sie sich sofort, wenn Datum, Uhrzeit, Adresse, Flugnummer oder Personenzahl falsch sind: Wir fahren nach der Bestätigung.</li></ul>`],
      ["Fahrzeuge", `<p>Sie buchen eine Fahrzeugklasse, kein bestimmtes Modell und kein Kennzeichen:</p>
<ul><li><strong>Limousine</strong>: bis 3 Fahrgäste und 3 Koffer (Skoda Octavia, Toyota Corolla oder ähnlich).</li>
<li><strong>Minivan</strong>: bis 6 Fahrgäste und 7 Koffer (Mercedes Vito, Ford Tourneo oder ähnlich).</li>
<li><strong>Mercedes V-Klasse</strong>: bis 6 Fahrgäste und 6 Koffer.</li>
<li><strong>Kleinbus</strong>: bis 13 Fahrgäste und 16 Koffer (Mercedes Sprinter oder ähnlich).</li></ul>
<p>Die Bilder auf der Website sind Beispiele. Wir können ohne Aufpreis ein Fahrzeug derselben oder einer höheren Klasse schicken. Alle Fahrzeuge sind für die gewerbliche Personenbeförderung zugelassen, nach türkischem Recht versichert und Nichtraucherfahrzeuge.</p>`],
      ["Preise", `<ul><li>Die Preise sind <strong>Festpreise pro Fahrzeug</strong>, nicht pro Person, und werden vor dem Absenden in Euro angezeigt. Der Preis in Ihrer Bestätigung ist der Preis, den Sie zahlen.</li>
<li>Im Preis enthalten sind Kraftstoff, Autobahn-, Brücken- und Tunnelmaut, Flughafenparken, die kostenlose Wartezeit (siehe unten) und der Empfang mit Namensschild.</li>
<li>Zu Stoßzeiten kann ein Zuschlag gelten; er ist immer im vor der Buchung angezeigten Preis enthalten. Bei einer Buchung mit Rückfahrt erhalten Sie {returnPct} % Rabatt auf die Rückfahrt. Ein Kindersitz kostet €{seat} pro Sitz.</li>
<li>Der Preis ändert sich nur, wenn sich die Buchung ändert: andere Adresse, zusätzlicher Halt oder Umweg, mehr Fahrgäste oder Gepäck als gebucht oder Wartezeit über die kostenlose Zeit hinaus. Fahrer oder Büro nennen Ihnen den Aufpreis vorher.</li>
<li>Stau, eine längere Route nach Wahl des Fahrers oder ein verspäteter Flug ändern den Preis nie.</li></ul>`],
      ["Zahlung", `<ul><li>Sie zahlen <strong>am Ende der Fahrt bar beim Fahrer</strong>, in Euro, US-Dollar oder türkischer Lira zum Tageskurs. Für die Buchung sind keine Vorauszahlung, Anzahlung oder Kartendaten nötig.</li>
<li>Unternehmen und Partner mit schriftlicher Vereinbarung können laut Vereinbarung per Überweisung oder auf Rechnung zahlen.</li>
<li>Benötigen Sie eine Rechnung, teilen Sie uns vor oder direkt nach der Fahrt Rechnungsname, Anschrift und Steuernummer mit. Rechnungen werden nach türkischem Recht ausgestellt.</li></ul>`],
      ["Abholung, Treffpunkt und Wartezeit", `<ul><li><strong>Flughäfen</strong>: Wir verfolgen Ihren Flug. Der Fahrer wartet in der Ankunftshalle mit einem Schild mit Ihrem Namen. Die ersten <strong>{wait} Minuten nach der tatsächlichen Landung</strong> sind kostenlos, genug für Passkontrolle und Gepäck.</li>
<li><strong>Kreuzfahrthafen</strong>: Der Fahrer wartet am Terminalausgang; wir verfolgen die Ausschiffungszeit.</li>
<li><strong>Hotels und andere Adressen</strong>: Der Fahrer wartet <strong>15 Minuten</strong> nach der gebuchten Zeit am Eingang oder am genannten Ort.</li>
<li>Brauchen Sie länger (verlorenes Gepäck, lange Schlangen), schreiben Sie oder rufen Sie an: Wir warten weiter, wenn möglich, und sagen Ihnen, ob zusätzliche Wartezeit kostet.</li>
<li>Ist die kostenlose Wartezeit vorbei und erreichen wir Sie weder telefonisch noch per WhatsApp oder E-Mail, darf der Fahrer abfahren; die Fahrt gilt dann als Nichterscheinen (siehe Stornierung).</li>
<li>Planen Sie bei Fahrten zum Flughafen genug Zeit für Verkehr und Check-in ein. Für internationale Abflüge empfehlen wir die Abholung mindestens 3 Stunden vor Abflug; wir beraten Sie bei der Buchung.</li></ul>`],
      ["Ihre Pflichten", `<p>Bitte geben Sie richtigen Namen, eine bei Ankunft erreichbare Telefonnummer (möglichst WhatsApp), E-Mail, Flugnummer, Adressen, Zahl der Fahrgäste und Gepäckstücke an. Informieren Sie uns so schnell wie möglich, wenn Ihr Flug annulliert, umgeleitet oder umgebucht wird oder sich Ihre Pläne ändern. Für eine gescheiterte Abholung wegen falscher oder fehlender Angaben haften wir nicht.</p>`],
      ["Änderungen durch Sie", `<ul><li>Datum, Uhrzeit, Adresse, Fahrzeug oder Personenzahl können Sie <strong>bis 24 Stunden vor der Abholung kostenlos ändern</strong>, per Antwort auf die Bestätigungs-E-Mail oder über WhatsApp.</li>
<li>Spätere Änderungen sind möglich, wenn ein passendes Fahrzeug und ein Fahrer frei sind. Eine Änderung kann den Preis ändern; den neuen Preis nennen wir vorher.</li>
<li>Eine Flugverspätung mit derselben Flugnummer ist keine Änderung: Wir verfolgen sie automatisch.</li></ul>`],
      ["Stornierung und Erstattung", `<ul><li><strong>Kostenlose Stornierung bis 24 Stunden vor der Abholung.</strong> Antworten Sie auf die Bestätigungs-E-Mail oder schreiben Sie per WhatsApp. Sie erhalten eine Stornobestätigung.</li>
<li>Bei Stornierung weniger als 24 Stunden vor der Abholung oder Nichterscheinen ohne Absage können wir bis zum vollen Fahrpreis verlangen, besonders wenn der Fahrer schon unterwegs ist.</li>
<li>Wird Ihr Flug annulliert und teilen Sie uns das vor der Abholzeit mit, stornieren wir kostenlos.</li>
<li>Haben Sie im Voraus bezahlt (z. B. per Überweisung bei Firmenvereinbarung), erstatten wir nicht geschuldete Beträge innerhalb von 14 Tagen auf demselben Zahlungsweg.</li>
<li>Da es sich um eine Personenbeförderung zu einem bestimmten Termin handelt, gilt das gesetzliche Widerrufsrecht für Fernabsatzverträge nicht. An seine Stelle tritt die oben beschriebene kostenlose Stornierung.</li></ul>`],
      ["Wenn wir stornieren oder uns verspäten", `<p>Müssen wir eine bestätigte Buchung stornieren, informieren wir Sie so früh wie möglich und versuchen, ein anderes Fahrzeug zum gleichen Preis zu organisieren. Gelingt das nicht, zahlen Sie nichts und bereits Gezahltes wird vollständig erstattet. Finden Sie Ihren Fahrer nicht, rufen Sie uns sofort an oder schreiben Sie per WhatsApp, damit wir vor Ort helfen können.</p>`],
      ["Fahrgäste und Gepäck", `<ul><li>Die Zahl der Fahrgäste (einschließlich Babys und Kinder) und Koffer darf die Kapazität des gebuchten Fahrzeugs nicht übersteigen. Das türkische Recht erlaubt nicht mehr Fahrgäste als Sitzplätze. Andernfalls kann der Fahrer die Fahrt ablehnen oder ein größeres Fahrzeug gegen Aufpreis nötig sein.</li>
<li>Die Kapazität bezieht sich auf einen Standardkoffer und eine kleine Handtasche pro Person. Melden Sie sperrige Gegenstände wie Golfbags, Ski, Fahrräder, Rollstühle, Kinderwagen oder Musikinstrumente vorab.</li>
<li>Haustiere nur nach vorheriger Absprache und in einer geschlossenen Transportbox. Bitte melden Sie einen Assistenzhund vorab an.</li>
<li>Gefährliche, illegale oder brennbare Gegenstände werden nicht befördert.</li>
<li>Bitte nehmen Sie alle Sachen mit. Wir helfen bei der Suche nach Fundsachen, haften aber nicht für im Fahrzeug vergessene Gegenstände.</li></ul>`],
      ["Kindersitze", `<ul><li>Kinder müssen nach den türkischen Verkehrsregeln in einem für Alter, Größe und Gewicht geeigneten Kindersitz fahren. Geben Sie die Zahl der Kindersitze im Buchungsformular an (€{seat} pro Sitz) und das Alter der Kinder in der Notiz.</li>
<li>Babyschalen und Sitzerhöhungen stellen wir auf Anfrage. Sie können auch Ihren eigenen zugelassenen Sitz mitbringen.</li>
<li>Ist ein Kindersitz nötig, aber nicht gebucht, kann der Fahrer das Kind eventuell nicht mitnehmen; für die Verzögerung haften wir nicht.</li>
<li>Für das Anschnallen des Kindes ist ein Elternteil oder eine Begleitperson verantwortlich; der Fahrer hilft beim Einbau des Sitzes.</li></ul>`],
      ["Verhalten im Fahrzeug", `<ul><li>Alle Fahrgäste müssen angeschnallt sein. Rauchen, auch von E-Zigaretten, ist in gewerblichen Fahrzeugen gesetzlich verboten.</li>
<li>Der Fahrer kann eine Fahrt ablehnen oder beenden, wenn ein Fahrgast gewalttätig, beleidigend, stark betrunken ist oder die Sicherheit gefährdet. Dann ist der volle Preis fällig.</li>
<li>Von Fahrgästen verursachte Schäden oder starke Verschmutzung (z. B. Erbrechen) können zu den belegten Reinigungs- oder Reparaturkosten berechnet werden.</li></ul>`],
      ["Haftung", `<ul><li>Wir führen die Fahrt mit der gebotenen Sorgfalt und mit Fahrern durch, die die gesetzlich vorgeschriebenen Berechtigungen haben. Fahrgäste sind durch die Pflichtversicherungen der gewerblichen Personenbeförderung versichert.</li>
<li>Wir haften nicht für Verspätungen oder verpasste Flüge, Schiffe oder Termine aufgrund von Ereignissen außerhalb unserer Kontrolle, etwa Unfälle, Straßensperrungen, Polizeikontrollen, Unwetter oder Veranstaltungen, sofern wir sorgfältig gehandelt haben. Für mittelbare Schäden wie verpasste Anschlüsse, Hotelnächte oder Geschäftsverluste haften wir nur bei Vorsatz oder grober Fahrlässigkeit.</li>
<li>Unsere Haftung für Gepäckschäden ist im gesetzlich zulässigen Umfang begrenzt; melden Sie Schäden sofort dem Fahrer und innerhalb von 7 Tagen uns.</li>
<li>Nichts in diesen Bedingungen beschränkt die Haftung für Tod oder Körperverletzung, für Vorsatz oder grobe Fahrlässigkeit oder Ihre zwingenden Verbraucherrechte.</li></ul>`],
      ["Höhere Gewalt", `<p>Keine Partei haftet für Nichterfüllung wegen Ereignissen außerhalb ihrer Kontrolle, etwa Naturkatastrophen, Epidemien, Krieg, Streiks, behördliche Anordnungen, Flughafen- oder Straßensperrungen. In diesem Fall kann jede Seite kostenlos stornieren und Vorauszahlungen werden erstattet.</p>`],
      ["Beschwerden", `<p>Wenn etwas schiefgelaufen ist, schreiben Sie mit Ihrer Buchungsnummer an {email}, möglichst innerhalb von 30 Tagen. Wir antworten innerhalb von 14 Tagen. Verbraucher in der Türkei können sich im gesetzlichen Rahmen auch an die Verbraucherschiedsstelle (Tüketici Hakem Heyeti) oder das Verbrauchergericht wenden; Verbraucher in der EU an ihr nationales Verbraucherzentrum.</p>`],
      ["Recht, Gerichtsstand und Änderungen", `<p>Es gilt das Recht der Republik Türkei. Zuständig sind die Gerichte und Vollstreckungsbehörden Istanbuls, unbeschadet zwingender Verbraucherschutzvorschriften, nach denen Sie sich an Gerichte oder Behörden Ihres Wohnorts wenden können. Wir können diese Bedingungen aktualisieren; für eine Buchung gilt die Fassung zum Zeitpunkt ihres Absendens. Ist eine Klausel unwirksam, bleibt der Rest wirksam. Die Bedingungen erscheinen in mehreren Sprachen; bei Abweichungen gilt die türkische Fassung.</p>`],
      ["Kontakt und Unternehmensangaben", `{details}`]
    ]
  },
  privacy: {
    title: "Datenschutzhinweise",
    desc: "Datenschutz nach KVKK und DSGVO: welche Daten wir bei der Transferbuchung erheben, wozu, wer sie erhält, Speicherdauer, Cookies und Ihre Rechte.",
    intro: `<p>Diese Hinweise erklären, wie {company} Ihre personenbezogenen Daten verarbeitet, wenn Sie {url} besuchen, einen Transfer buchen oder uns kontaktieren. Sie sind unsere Information nach dem türkischen Datenschutzgesetz Nr. 6698 (KVKK) und, für Besucher in der Europäischen Union und im Vereinigten Königreich, nach der Datenschutz-Grundverordnung (DSGVO). Siehe auch: {termsLink}.</p>`,
    sections: [
      ["Verantwortlicher", `<p>Verantwortlich ist {company}, {address}. Zu Ihren Daten erreichen Sie uns unter {email} oder {phone}.</p>`],
      ["Welche Daten wir erheben", `<ul><li><strong>Buchungsdaten</strong>: Name, E-Mail, Telefon- oder WhatsApp-Nummer, Abhol- und Zieladresse, Datum und Uhrzeit, Flug- oder Schiffsdaten, Zahl der Fahrgäste, Gepäckstücke und Kindersitze, Hinweise für den Fahrer, gewähltes Fahrzeug und Preis.</li>
<li><strong>Fahrgastdaten für Behörden</strong>: Für Fahrten mit eigenen Fahrzeugen verlangt das türkische Recht die Meldung der Fahrgäste an das U-ETDS-System des Verkehrsministeriums. Dafür können wir Name, Staatsangehörigkeit, Geschlecht und Pass- oder türkische Ausweisnummer jedes Fahrgasts erfragen.</li>
<li><strong>Nicht abgeschlossene Buchungen</strong>: Geben Sie Name, Telefon oder E-Mail im Buchungsformular ein, senden es aber nicht ab, speichern wir das Eingegebene, damit unser Büro Sie einmal kontaktieren und beim Abschluss helfen kann.</li>
<li><strong>Nachrichten</strong>: was Sie uns per E-Mail, WhatsApp, Telefon oder über die Bewerbungsformulare für Unternehmen (Firmenkunden, Lieferanten, Partner) schreiben.</li>
<li><strong>Technische Daten</strong>: IP-Adresse, Browsertyp, Herkunftsseite, aus der IP-Adresse abgeleitetes ungefähres Land und Stadt, aufgerufene Seiten. Unser eigener Besuchszähler nutzt keine Cookies und speichert Ihre IP-Adresse nicht.</li>
<li><strong>Analysedaten</strong>: nur wenn Sie Analyse-Cookies akzeptieren, siehe „Cookies“.</li></ul>
<p>Wir fragen keine Kartendaten ab und erheben keine besonderen Kategorien von Daten (z. B. Gesundheitsdaten), außer was Sie uns selbst mitteilen, etwa dass ein Fahrgast einen Rollstuhl nutzt; das verwenden wir nur zur Organisation der Fahrt.</p>`],
      ["Zwecke und Rechtsgrundlagen", `<ul><li><strong>Abschluss und Durchführung Ihres Transfers</strong>: Bestätigung, Voucher, Weitergabe der nötigen Angaben an den Fahrer, Flugverfolgung, Kontakt zu Fahrt, Änderungen und Stornierungen. Rechtsgrundlage: Vertragserfüllung (KVKK Art. 5(2)(c); DSGVO Art. 6(1)(b)).</li>
<li><strong>Erfüllung gesetzlicher Pflichten</strong>: U-ETDS-Meldung, Rechnungsstellung, Buchhaltung und Steuerunterlagen, Auskünfte an Behörden. Rechtsgrundlage: rechtliche Verpflichtung (KVKK Art. 5(2)(a) und (ç); DSGVO Art. 6(1)(c)).</li>
<li><strong>Hilfe beim Abschluss einer begonnenen Buchung, Bearbeitung von Beschwerden, Missbrauchsverhinderung und Wahrung unserer Rechte</strong>, Sicherheit der Website und cookielose Besuchszählung. Rechtsgrundlage: berechtigtes Interesse (KVKK Art. 5(2)(e) und (f); DSGVO Art. 6(1)(f)).</li>
<li><strong>Analyse-Cookies</strong>: nur mit Ihrer Einwilligung (KVKK Art. 5(1); DSGVO Art. 6(1)(a)), die Sie jederzeit widerrufen können.</li></ul>
<p>Wir erhalten Daten über das Buchungsformular, E-Mail und WhatsApp, Telefon, Partner, die Buchungen weiterleiten, und automatisch über die Website. Ohne gesonderte Einwilligung senden wir keine Werbung, und wir treffen keine ausschließlich automatisierten Entscheidungen über Sie.</p>`],
      ["Empfänger", `<ul><li>Der <strong>Fahrer</strong> und, wenn ein Partner fährt, das <strong>lizenzierte Transportunternehmen</strong>: nur das für die Fahrt Nötige (Name, Telefon, Abholdaten, Flug, Fahrgäste).</li>
<li><strong>Dienstleister</strong>, die in unserem Auftrag Daten verarbeiten: Website-Hosting (Vercel), Datenbank (Upstash), E-Mail-Versand (Resend), Buchungsbenachrichtigungen des Büros (Telegram), Fluginformationen (AeroDataBox), unser Buchungsverwaltungssystem und ein KI-Dienst (Anthropic), der dem Büro hilft, von Ihnen gesendete Buchungsnachrichten zu lesen.</li>
<li><strong>Google</strong> (Google Analytics), nur wenn Sie Analyse-Cookies akzeptieren.</li>
<li><strong>Behörden</strong>, wenn das Gesetz es verlangt, etwa Verkehrsministerium (U-ETDS), Steuerbehörden, Gerichte und Strafverfolgung.</li>
<li>Bei Bedarf unsere zur Verschwiegenheit verpflichteten Steuerberater und Anwälte.</li></ul>
<p>Wir verkaufen Ihre Daten nicht.</p>`],
      ["Übermittlung ins Ausland", `<p>Einige der genannten Dienstleister speichern oder verarbeiten Daten außerhalb der Türkei, in der Europäischen Union oder den USA (unsere Website läuft z. B. auf Servern in Frankfurt). Wir übermitteln Daten ins Ausland nur, soweit Art. 9 KVKK es erlaubt: wenn es für den Vertrag mit Ihnen nötig ist, auf Grundlage von der Datenschutzbehörde gemeldeten Standardverträgen oder mit anderen gesetzlich vorgesehenen Garantien. Für Übermittlungen aus der EU stützen wir uns auf Standardvertragsklauseln der EU-Kommission oder Angemessenheitsbeschlüsse.</p>`],
      ["Speicherdauer", `<ul><li><strong>Buchungen und zugehörige Korrespondenz</strong>: 10 Jahre nach der Fahrt, wie es türkisches Handels- und Steuerrecht für Geschäftsunterlagen verlangt; danach gelöscht oder anonymisiert.</li>
<li><strong>U-ETDS-Fahrgastdaten</strong>: so lange, wie das Verkehrsrecht es vorschreibt.</li>
<li><strong>Nicht abgeschlossene Buchungen</strong>: automatisch nach 30 Tagen gelöscht oder sofort, wenn Sie die Buchung absenden.</li>
<li><strong>Links in E-Mails</strong> zur Annahme einer Änderung: 60 Tage.</li>
<li><strong>Bewerbungsformulare von Unternehmen</strong>: bis zu 2 Jahre oder für die Dauer einer folgenden Vereinbarung.</li>
<li><strong>Analysedaten</strong>: höchstens 14 Monate in Google Analytics. Die Statistik unseres eigenen Zählers ist aggregiert und enthält keine personenbezogenen Daten.</li></ul>
<p>Für einen Rechtsstreit können Daten länger aufbewahrt werden. Nach Ablauf werden sie gemäß unserer Löschrichtlinie gelöscht, vernichtet oder anonymisiert.</p>`],
      ["Cookies und ähnliche Technologien", `<ul><li><strong>Notwendige Speicherung</strong>: Die Website speichert Ihre Eingaben im Buchungsformular und die Herkunftsseite im Sitzungsspeicher (Session Storage) Ihres Browsers, bis Sie den Tab schließen, damit nichts verloren geht. Dafür ist keine Einwilligung nötig.</li>
<li><strong>Besuchszählung</strong>: Unser eigener Zähler sendet pro Seitenaufruf eine cookielose Anfrage (Seite, Herkunftsseite, Sprache); das Ergebnis ist eine aggregierte Statistik.</li>
<li><strong>Analyse-Cookies (Google Analytics)</strong>: werden erst gesetzt, nachdem Sie im Cookie-Banner auf „Akzeptieren“ klicken. Sie zeigen uns, wie die Website genutzt wird. Ihre Wahl wird im Browser gespeichert; Sie können sie jederzeit über „Cookie-Einstellungen“ oder durch Löschen der Browserdaten ändern.</li></ul>
<p>Wir nutzen keine Werbe-Cookies und keine Tracking-Cookies sozialer Netzwerke.</p>`],
      ["Wie wir Ihre Daten schützen", `<p>Daten werden verschlüsselt (HTTPS) übertragen. Zugriff auf Buchungen haben nur Mitarbeiter, die ihn brauchen, passwortgeschützt; Fahrer sehen nur das für die Fahrt Nötige. Unsere Dienstleister sind vertraglich zu Vertraulichkeit und Sicherheit verpflichtet. Bei einer Datenpanne informieren wir die Behörden und Sie wie gesetzlich vorgeschrieben.</p>`],
      ["Ihre Rechte", `<p>Nach Art. 11 KVKK können Sie erfahren, ob wir Ihre Daten verarbeiten, Auskunft über diese und die Zwecke verlangen, erfahren, an wen sie im In- oder Ausland übermittelt wurden, unvollständige oder falsche Daten berichtigen, sie unter den Voraussetzungen von Art. 7 KVKK löschen oder vernichten lassen, die Empfänger über Berichtigung oder Löschung informieren lassen, einem für Sie nachteiligen Ergebnis ausschließlich automatisierter Analyse widersprechen und Ersatz für Schäden aus rechtswidriger Verarbeitung verlangen.</p>
<p>Nach der DSGVO haben Sie zudem das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit, Widerspruch gegen Verarbeitung auf Grundlage berechtigter Interessen und jederzeitigen Widerruf einer Einwilligung ohne Wirkung für die Vergangenheit.</p>`],
      ["Rechte ausüben und Beschwerde", `<p>Schreiben Sie an {email} oder senden Sie einen unterschriebenen Brief an {address} mit Name, Kontaktdaten und Anliegen; wir können einen Identitätsnachweis verlangen. Wir antworten kostenlos innerhalb von 30 Tagen. Sind Sie nicht zufrieden, können Sie sich bei der türkischen Datenschutzbehörde (KVKK, www.kvkk.gov.tr) beschweren und, wenn Sie in der EU oder im Vereinigten Königreich leben, bei der Datenschutzaufsicht Ihres Landes.</p>`],
      ["Kinder", `<p>Buchungen müssen von Erwachsenen vorgenommen werden. Daten von Kindern (Alter, Kindersitzbedarf, U-ETDS-Angaben) verarbeiten wir nur im Rahmen einer Buchung durch einen Elternteil oder eine Begleitperson.</p>`],
      ["Änderungen dieser Hinweise", `<p>Wir aktualisieren diese Hinweise, wenn sich unsere Verarbeitung ändert. Das Datum oben zeigt die aktuelle Fassung.</p>`],
      ["Kontakt und Unternehmensangaben", `{details}`]
    ]
  }
};
