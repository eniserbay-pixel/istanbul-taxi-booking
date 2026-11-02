// Dutch terms of service and privacy notice. DRAFT: have a lawyer check before relying on it. Placeholders: see en.js.
module.exports = {
  updated: "2 november 2026",
  ui: {
    updated: "Laatst bijgewerkt", toc: "Inhoud",
    rows: { company: "Bedrijf", address: "Statutair adres", mersis: "MERSIS-nummer", tax: "Belastingkantoor en -nummer", tradeReg: "Handelsregisternummer",
      kep: "Geregistreerd e-mailadres (KEP)", tursab: "TÜRSAB-licentie", verbis: "VERBIS-registratie", euRep: "EU-vertegenwoordiger (art. 27 AVG)", email: "E-mail", phone: "Telefoon en WhatsApp" }
  },
  terms: {
    title: "Algemene voorwaarden",
    desc: "Voorwaarden voor transfers in Istanbul: boeking, vaste prijs, contante betaling, wachttijd, bagage, kinderzitjes, gratis annulering en aansprakelijkheid.",
    intro: `<p>Deze voorwaarden vormen de overeenkomst tussen jou en {company} ("wij"), het bedrijf dat {brand} exploiteert en de transfers uitvoert die op {url} worden geboekt. Lees ze voordat je een boeking verstuurt. Door het vakje in het boekingsformulier aan te vinken ga je ermee akkoord en neem je kennis van onze {privacyLink}.</p>`,
    sections: [
      ["Wie we zijn en wat we bieden", `<p>{brand} is de transferdienst van {company}, een reisbureau met TÜRSAB-licentie nr. {tursab}. We bieden privétransfers met chauffeur <strong>uitsluitend binnen de provincie Istanbul</strong>: van en naar Istanbul Airport (IST), Sabiha Gökçen Airport (SAW), de cruisehaven Galataport, hotels, adressen en bezienswaardigheden in de stad. Een rit die buiten Istanbul begint of eindigt is alleen mogelijk als we dat vooraf schriftelijk afspreken.</p>
<p>De rit wordt uitgevoerd door onze eigen chauffeurs en voertuigen of door vergunde vervoersbedrijven en chauffeurs die voor ons werken. Wij blijven altijd je aanspreekpunt en zijn tegenover jou verantwoordelijk voor de boeking.</p>`],
      ["Boeking en bevestiging", `<ul><li>Het versturen van het boekingsformulier is een <strong>aanvraag</strong>, nog geen overeenkomst. Je krijgt een e-mail dat we die hebben ontvangen.</li>
<li>De overeenkomst komt tot stand als we je de <strong>bevestigingsmail</strong> met je boekingsnummer en voucher sturen. Meestal antwoorden we binnen een uur; kunnen we de aanvraag niet uitvoeren, dan laten we dat per e-mail weten en ben je niets verschuldigd.</li>
<li>Kunnen we alleen een ander tijdstip, voertuig of prijs bieden, dan sturen we je een voorstel; de boeking komt alleen tot stand als je het accepteert.</li>
<li>Je moet minstens 18 jaar zijn om te boeken. Wie voor andere passagiers boekt, aanvaardt deze voorwaarden ook voor hen en zorgt dat hun gegevens kloppen.</li>
<li>Controleer de bevestiging en laat het ons meteen weten als datum, tijd, adres, vluchtnummer of aantal passagiers niet klopt: we rijden volgens de bevestiging.</li></ul>`],
      ["Voertuigen", `<p>Je boekt een voertuigklasse, geen bepaald model of kenteken:</p>
<ul><li><strong>Sedan</strong>: tot 3 passagiers en 3 koffers (Skoda Octavia, Toyota Corolla of vergelijkbaar).</li>
<li><strong>Minivan</strong>: tot 6 passagiers en 7 koffers (Mercedes Vito, Ford Tourneo of vergelijkbaar).</li>
<li><strong>Mercedes V-Klasse</strong>: tot 6 passagiers en 6 koffers.</li>
<li><strong>Minibus</strong>: tot 13 passagiers en 16 koffers (Mercedes Sprinter of vergelijkbaar).</li></ul>
<p>De foto's op de site zijn voorbeelden. We kunnen zonder meerprijs een voertuig van dezelfde of een hogere klasse sturen. Alle voertuigen hebben een vergunning voor commercieel personenvervoer, zijn verzekerd zoals de Turkse wet voorschrijft en zijn rookvrij.</p>`],
      ["Prijzen", `<ul><li>Prijzen zijn <strong>vast per voertuig</strong>, niet per persoon, en worden in euro getoond voordat je de aanvraag verstuurt. De prijs in je bevestiging is de prijs die je betaalt.</li>
<li>De prijs omvat brandstof, tol voor snelwegen, bruggen en tunnels, parkeren op de luchthaven, de gratis wachttijd hieronder en ontvangst met naambordje.</li>
<li>Op drukke uren kan een toeslag gelden; die zit altijd in de prijs die je vóór het boeken ziet. Bij een boeking met terugrit krijg je {returnPct}% korting op de terugrit. Een kinderzitje kost €{seat} per stuk.</li>
<li>De prijs verandert alleen als de boeking verandert: een ander adres, een extra stop of omweg, meer passagiers of bagage dan geboekt, of wachten na de gratis tijd. De chauffeur of het kantoor meldt de meerprijs vooraf.</li>
<li>File, een langere route die de chauffeur kiest of een vertraagde vlucht veranderen de prijs nooit.</li></ul>`],
      ["Betaling", `<ul><li>Je betaalt <strong>de chauffeur contant aan het einde van de rit</strong>, in euro, Amerikaanse dollar of Turkse lira tegen de dagkoers. Voor de boeking zijn geen vooruitbetaling, aanbetaling of kaartgegevens nodig.</li>
<li>Bedrijven en partners met een schriftelijke overeenkomst kunnen per overschrijving of op rekening betalen, zoals die overeenkomst bepaalt.</li>
<li>Heb je een factuur nodig, geef dan vóór of direct na de rit de factuurnaam, het adres en het btw- of belastingnummer door. Facturen worden volgens de Turkse wet opgemaakt.</li></ul>`],
      ["Ophalen, ontmoetingspunt en wachttijd", `<ul><li><strong>Luchthavens</strong>: we volgen je vlucht. De chauffeur wacht in de aankomsthal met een bordje met je naam. De eerste <strong>{wait} minuten na de werkelijke landing</strong> zijn gratis, genoeg voor paspoortcontrole en bagage.</li>
<li><strong>Cruisehaven</strong>: de chauffeur wacht bij de uitgang van de terminal; we volgen de ontschepingstijd.</li>
<li><strong>Hotels en andere adressen</strong>: de chauffeur wacht <strong>15 minuten</strong> na de geboekte tijd bij de ingang of op de plek die je opgaf.</li>
<li>Heb je meer tijd nodig (zoekgeraakte bagage, lange rijen), stuur ons een bericht of bel: we wachten verder als het kan en zeggen het als extra wachttijd kost.</li>
<li>Is de gratis wachttijd voorbij en kunnen we je niet bereiken via telefoon, WhatsApp of e-mail, dan mag de chauffeur vertrekken en geldt de rit als no-show (zie annulering).</li>
<li>Plan bij ritten naar de luchthaven ruim tijd voor verkeer en inchecken. We raden ophalen minstens 3 uur voor een internationale vlucht aan; we adviseren je graag bij het boeken.</li></ul>`],
      ["Jouw verplichtingen", `<p>Geef een juiste naam, een bij aankomst bereikbaar telefoonnummer (liefst WhatsApp), e-mail, vluchtnummer, adressen en het aantal passagiers en bagagestukken. Laat het ons zo snel mogelijk weten als je vlucht is geannuleerd, omgeleid of omgeboekt of als je plannen veranderen. We zijn niet aansprakelijk als het ophalen mislukt door onjuiste of ontbrekende gegevens.</p>`],
      ["Wijzigingen door jou", `<ul><li>Datum, tijd, adres, voertuig of aantal passagiers kun je <strong>tot 24 uur voor het ophalen gratis wijzigen</strong>, door op de bevestigingsmail te antwoorden of via WhatsApp.</li>
<li>Latere wijzigingen zijn mogelijk als er een geschikt voertuig en een chauffeur vrij zijn. Een wijziging kan de prijs veranderen; we melden de nieuwe prijs vooraf.</li>
<li>Een vertraagde vlucht met hetzelfde vluchtnummer is geen wijziging: die volgen we automatisch.</li></ul>`],
      ["Annulering en terugbetaling", `<ul><li><strong>Gratis annuleren tot 24 uur voor het ophalen.</strong> Antwoord op de bevestigingsmail of stuur ons een WhatsApp-bericht. Je krijgt een annuleringsmail.</li>
<li>Annuleer je minder dan 24 uur voor het ophalen, of komt de passagier zonder bericht niet opdagen (no-show), dan kunnen we tot de volledige ritprijs vragen, zeker als de chauffeur al onderweg is.</li>
<li>Wordt je vlucht geannuleerd en meld je dat vóór het ophaaltijdstip, dan annuleren we gratis.</li>
<li>Heb je vooraf betaald (bijvoorbeeld per overschrijving onder een bedrijfsovereenkomst), dan betalen we niet verschuldigde bedragen binnen 14 dagen terug via dezelfde betaalmethode.</li>
<li>Omdat de dienst personenvervoer op een vaste datum is, geldt het wettelijke herroepingsrecht voor overeenkomsten op afstand niet. De gratis annulering hierboven komt daarvoor in de plaats.</li></ul>`],
      ["Als wij annuleren of te laat zijn", `<p>Moeten wij een bevestigde boeking annuleren, dan laten we het zo vroeg mogelijk weten en proberen we een ander voertuig voor dezelfde prijs te regelen. Lukt dat niet, dan betaal je niets en krijg je alles wat je betaald hebt volledig terug. Kun je je chauffeur niet vinden, bel ons dan meteen of stuur een WhatsApp-bericht zodat we ter plekke kunnen helpen.</p>`],
      ["Passagiers en bagage", `<ul><li>Het aantal passagiers (baby's en kinderen inbegrepen) en koffers mag de capaciteit van het geboekte voertuig niet overschrijden. De Turkse wet staat niet meer passagiers toe dan zitplaatsen. Anders kan de chauffeur de rit weigeren of is een groter voertuig tegen meerprijs nodig.</li>
<li>De capaciteit gaat uit van één standaardkoffer en één kleine handbagage per passagier. Meld grote spullen zoals golftassen, ski's, fietsen, rolstoelen, kinderwagens of muziekinstrumenten vooraf.</li>
<li>Huisdieren reizen alleen na afspraak vooraf, in een gesloten reismand. Meld een hulphond graag vooraf.</li>
<li>Gevaarlijke, illegale of brandbare voorwerpen worden niet vervoerd.</li>
<li>Neem al je spullen mee. We helpen zoeken naar verloren voorwerpen, maar zijn niet aansprakelijk voor wat in het voertuig blijft liggen.</li></ul>`],
      ["Kinderzitjes", `<ul><li>Volgens de Turkse verkeersregels moeten kinderen in een zitje reizen dat past bij hun leeftijd, lengte en gewicht. Geef het aantal kinderzitjes op in het boekingsformulier (€{seat} per stuk) en de leeftijd van de kinderen in de opmerking.</li>
<li>Babyzitjes en zittingverhogers leveren we op aanvraag. Je mag ook je eigen goedgekeurde zitje meebrengen.</li>
<li>Is een kinderzitje nodig maar niet geboekt, dan kan de chauffeur het kind mogelijk niet meenemen; voor de vertraging zijn we niet aansprakelijk.</li>
<li>Het vastzetten van het kind is de verantwoordelijkheid van de ouder of begeleider; de chauffeur helpt bij het plaatsen van het zitje.</li></ul>`],
      ["Gedrag in het voertuig", `<ul><li>Alle passagiers dragen de gordel. Roken, ook e-sigaretten, is in commerciële voertuigen bij Turkse wet verboden.</li>
<li>De chauffeur kan een rit weigeren of beëindigen als een passagier gewelddadig, beledigend of zwaar beschonken is of de veiligheid in gevaar brengt. De volledige prijs is dan verschuldigd.</li>
<li>Schade of zware vervuiling door passagiers (bijvoorbeeld braaksel) kan worden aangerekend tegen de aangetoonde kosten van reiniging of herstel.</li></ul>`],
      ["Aansprakelijkheid", `<ul><li>We voeren de rit zorgvuldig uit met chauffeurs die de wettelijk vereiste vergunningen hebben. Passagiers zijn gedekt door de verplichte verzekeringen voor commercieel personenvervoer.</li>
<li>We zijn niet aansprakelijk voor vertraging of gemiste vluchten, schepen of afspraken door gebeurtenissen buiten onze macht, zoals ongevallen, wegafsluitingen, politiecontroles, noodweer of evenementen, als we zorgvuldig hebben gehandeld. Voor indirecte schade, zoals gemiste aansluitingen, hotelnachten of zakelijk verlies, zijn we alleen aansprakelijk bij opzet of grove nalatigheid.</li>
<li>Onze aansprakelijkheid voor bagageschade is beperkt voor zover de wet dat toestaat; meld schade meteen aan de chauffeur en binnen 7 dagen aan ons.</li>
<li>Niets in deze voorwaarden beperkt de aansprakelijkheid voor overlijden of letsel, voor opzet of grove nalatigheid, of je dwingende rechten als consument.</li></ul>`],
      ["Overmacht", `<p>Geen van beide partijen is aansprakelijk voor niet-nakoming door gebeurtenissen buiten haar macht, zoals natuurrampen, epidemieën, oorlog, stakingen, overheidsbesluiten of afsluiting van luchthavens of wegen. Beide partijen kunnen dan kosteloos annuleren en vooruitbetalingen worden terugbetaald.</p>`],
      ["Klachten", `<p>Ging er iets mis, schrijf dan met je boekingsnummer naar {email}, bij voorkeur binnen 30 dagen. We antwoorden binnen 14 dagen. Consumenten in Turkije kunnen binnen de wettelijke grenzen ook terecht bij de consumentenarbitragecommissie (Tüketici Hakem Heyeti) of de consumentenrechtbank; consumenten in de EU bij hun nationale consumentenloket.</p>`],
      ["Toepasselijk recht, bevoegde rechter en wijzigingen", `<p>Op deze voorwaarden is het recht van de Republiek Turkije van toepassing. De rechtbanken en executiekantoren van Istanbul zijn bevoegd, onverminderd dwingende consumentenregels die je het recht geven je te wenden tot de rechter of instanties van je woonplaats. We kunnen deze voorwaarden bijwerken; op een boeking is de versie van toepassing die gold toen je de boeking verstuurde. Is een bepaling ongeldig, dan blijft de rest geldig. De voorwaarden verschijnen in meerdere talen; bij verschillen gaat de Turkse versie voor.</p>`],
      ["Contact en bedrijfsgegevens", `{details}`]
    ]
  },
  privacy: {
    title: "Privacyverklaring",
    desc: "Privacy volgens KVKK en AVG: welke gegevens we verzamelen bij een transferboeking, waarom, wie ze krijgt, bewaartermijnen, cookies en je rechten.",
    intro: `<p>Deze verklaring legt uit hoe {company} je persoonsgegevens verwerkt als je {url} bezoekt, een transfer boekt of contact met ons opneemt. Het is onze informatieplicht volgens de Turkse wet nr. 6698 op de bescherming van persoonsgegevens (KVKK) en, voor bezoekers in de Europese Unie en het Verenigd Koninkrijk, volgens de Algemene Verordening Gegevensbescherming (AVG). Zie ook onze {termsLink}.</p>`,
    sections: [
      ["Verwerkingsverantwoordelijke", `<p>Verantwoordelijk is {company}, {address}. Over je gegevens bereik je ons via {email} of {phone}.</p>`],
      ["Welke gegevens we verzamelen", `<ul><li><strong>Boekingsgegevens</strong>: naam, e-mail, telefoon- of WhatsApp-nummer, ophaal- en afzetadres, datum en tijd, vlucht- of schipgegevens, aantal passagiers, bagagestukken en kinderzitjes, opmerkingen voor de chauffeur, gekozen voertuig en prijs.</li>
<li><strong>Passagiersgegevens voor de overheid</strong>: voor ritten met eigen voertuigen verplicht de Turkse wet ons passagiers te melden in het U-ETDS-systeem van het ministerie van Verkeer. Daarvoor kunnen we naam, nationaliteit, geslacht en paspoort- of Turks identiteitsnummer van elke passagier vragen.</li>
<li><strong>Onvoltooide boekingen</strong>: vul je naam, telefoon of e-mail in het boekingsformulier in zonder het te versturen, dan bewaren we wat je typte, zodat ons kantoor je één keer kan contacteren om je te helpen afronden.</li>
<li><strong>Berichten</strong>: wat je ons schrijft via e-mail, WhatsApp, telefoon of de aanvraagformulieren voor bedrijven (zakelijke klanten, leveranciers, partners).</li>
<li><strong>Technische gegevens</strong>: IP-adres, browsertype, de pagina waar je vandaan kwam, globaal land en stad afgeleid van het IP-adres, bekeken pagina's. Onze eigen bezoekersteller gebruikt geen cookies en bewaart je IP-adres niet.</li>
<li><strong>Analysegegevens</strong>: alleen als je analytische cookies accepteert, zie "Cookies".</li></ul>
<p>We vragen geen betaalkaartgegevens en verzamelen geen bijzondere persoonsgegevens (zoals gezondheidsgegevens), behalve wat je ons zelf vertelt, bijvoorbeeld dat een passagier een rolstoel gebruikt; dat gebruiken we alleen om de rit te regelen.</p>`],
      ["Doelen en rechtsgronden", `<ul><li><strong>Je transfer afsluiten en uitvoeren</strong>: bevestiging, voucher, de chauffeur de nodige gegevens geven, je vlucht volgen, contact over de rit, wijzigingen en annuleringen. Rechtsgrond: uitvoering van de overeenkomst (KVKK art. 5(2)(c); AVG art. 6(1)(b)).</li>
<li><strong>Wettelijke plichten nakomen</strong>: U-ETDS-melding, facturering, boekhouding en belastingadministratie, vragen van autoriteiten. Rechtsgrond: wettelijke verplichting (KVKK art. 5(2)(a) en (ç); AVG art. 6(1)(c)).</li>
<li><strong>Je helpen een begonnen boeking af te ronden, klachten afhandelen, misbruik voorkomen en onze rechten beschermen</strong>, de site beveiligen en bezoeken zonder cookies tellen. Rechtsgrond: gerechtvaardigd belang (KVKK art. 5(2)(e) en (f); AVG art. 6(1)(f)).</li>
<li><strong>Analytische cookies</strong>: alleen met je toestemming (KVKK art. 5(1); AVG art. 6(1)(a)), die je altijd kunt intrekken.</li></ul>
<p>We ontvangen gegevens via het boekingsformulier, e-mail en WhatsApp, telefoon, partners die boekingen doorsturen en automatisch via de website. We sturen geen reclame zonder aparte toestemming en nemen geen besluiten over jou die uitsluitend op geautomatiseerde verwerking berusten.</p>`],
      ["Ontvangers", `<ul><li>De <strong>chauffeur</strong> en, als een partner de rit uitvoert, het <strong>vergunde vervoersbedrijf</strong>: alleen wat nodig is voor de rit (naam, telefoon, ophaalgegevens, vlucht, passagiers).</li>
<li><strong>Dienstverleners</strong> die namens ons gegevens verwerken: websitehosting (Vercel), database (Upstash), e-mailverzending (Resend), boekingsmeldingen voor het kantoor (Telegram), vluchtinformatie (AeroDataBox), ons boekingsbeheersysteem en een AI-dienst (Anthropic) die het kantoor helpt boekingsberichten te lezen die je ons stuurt.</li>
<li><strong>Google</strong> (Google Analytics), alleen als je analytische cookies accepteert.</li>
<li><strong>Overheidsinstanties</strong> als de wet dat vereist: ministerie van Verkeer (U-ETDS), belastingdienst, rechtbanken en politie.</li>
<li>Zo nodig onze boekhouders en advocaten, die tot geheimhouding verplicht zijn.</li></ul>
<p>We verkopen je gegevens niet.</p>`],
      ["Doorgifte naar het buitenland", `<p>Sommige van deze dienstverleners bewaren of verwerken gegevens buiten Turkije, in de Europese Unie of de Verenigde Staten (onze website draait bijvoorbeeld op servers in Frankfurt). We geven gegevens alleen door naar het buitenland zoals art. 9 KVKK toestaat: als het nodig is voor de overeenkomst met jou, op basis van standaardcontracten die bij de Turkse toezichthouder zijn gemeld, of met andere wettelijke waarborgen. Voor doorgifte vanuit de EU baseren we ons op de standaardcontractbepalingen van de Europese Commissie of op adequaatheidsbesluiten.</p>`],
      ["Bewaartermijnen", `<ul><li><strong>Boekingen en bijbehorende correspondentie</strong>: 10 jaar na de rit, zoals het Turkse handels- en belastingrecht voor bedrijfsdocumenten vereist; daarna verwijderd of geanonimiseerd.</li>
<li><strong>U-ETDS-passagiersgegevens</strong>: zolang de vervoerswetgeving voorschrijft.</li>
<li><strong>Onvoltooide boekingen</strong>: automatisch verwijderd na 30 dagen, of meteen als je de boeking verstuurt.</li>
<li><strong>Links in e-mails</strong> om een wijziging te aanvaarden: 60 dagen.</li>
<li><strong>Aanvraagformulieren van bedrijven</strong>: tot 2 jaar, of zolang een daaropvolgende overeenkomst loopt.</li>
<li><strong>Analysegegevens</strong>: maximaal 14 maanden in Google Analytics. De statistieken van onze eigen teller zijn geaggregeerd en bevatten geen persoonsgegevens.</li></ul>
<p>Gegevens kunnen langer worden bewaard als dat nodig is voor een juridisch geschil. Na afloop van de termijn worden ze volgens ons bewaarbeleid verwijderd, vernietigd of geanonimiseerd.</p>`],
      ["Cookies en vergelijkbare technieken", `<ul><li><strong>Noodzakelijke opslag</strong>: de site bewaart je invoer in het boekingsformulier en de pagina waar je vandaan kwam in de sessieopslag (session storage) van je browser tot je het tabblad sluit, zodat je niets kwijtraakt. Hiervoor is geen toestemming nodig.</li>
<li><strong>Bezoeken tellen</strong>: onze eigen teller stuurt per paginaweergave één verzoek zonder cookies (pagina, herkomstsite, taal); het resultaat is een geaggregeerde statistiek.</li>
<li><strong>Analytische cookies (Google Analytics)</strong>: worden pas geplaatst nadat je in de cookiebanner op "Accepteren" klikt. Ze helpen ons te zien hoe de site wordt gebruikt. Je keuze wordt in je browser bewaard; je kunt hem altijd wijzigen via "Cookie-instellingen" of door je browsergegevens te wissen.</li></ul>
<p>We gebruiken geen advertentiecookies of trackers van sociale netwerken.</p>`],
      ["Hoe we je gegevens beschermen", `<p>Gegevens gaan over een versleutelde verbinding (HTTPS). Toegang tot boekingen is beperkt tot medewerkers die die nodig hebben en beveiligd met wachtwoorden; chauffeurs zien alleen wat nodig is voor de rit. Onze dienstverleners zijn contractueel verplicht de gegevens vertrouwelijk en veilig te houden. Bij een datalek informeren we de autoriteiten en jou zoals de wet vereist.</p>`],
      ["Je rechten", `<p>Volgens art. 11 KVKK kun je vragen of we je gegevens verwerken, informatie krijgen over de gegevens en de doelen, weten aan wie ze in Turkije of het buitenland zijn doorgegeven, onvolledige of onjuiste gegevens laten corrigeren, ze laten wissen of vernietigen onder de voorwaarden van art. 7 KVKK, ontvangers laten informeren over correctie of wissing, bezwaar maken tegen een voor jou nadelig resultaat dat uitsluitend uit geautomatiseerde analyse voortkomt, en schadevergoeding vragen bij onrechtmatige verwerking.</p>
<p>Volgens de AVG heb je bovendien recht op inzage, rectificatie, wissing, beperking van de verwerking, overdraagbaarheid, bezwaar tegen verwerking op grond van gerechtvaardigd belang en het op elk moment intrekken van toestemming, zonder gevolgen voor eerdere verwerking.</p>`],
      ["Je rechten uitoefenen en klagen", `<p>Schrijf naar {email} of stuur een ondertekende brief naar {address} met je naam, contactgegevens en verzoek; we kunnen om een identiteitsbewijs vragen. We antwoorden kosteloos binnen 30 dagen. Ben je niet tevreden, dan kun je klagen bij de Turkse toezichthouder voor persoonsgegevens (KVKK, www.kvkk.gov.tr) en, als je in de EU of het VK woont, bij de toezichthouder in je eigen land.</p>`],
      ["Kinderen", `<p>Boekingen moeten door volwassenen worden gemaakt. Gegevens van kinderen (leeftijd, behoefte aan een zitje, U-ETDS-gegevens) verwerken we alleen als onderdeel van een boeking door een ouder of begeleider.</p>`],
      ["Wijzigingen in deze verklaring", `<p>We werken deze verklaring bij als onze verwerking verandert. De datum bovenaan toont de huidige versie.</p>`],
      ["Contact en bedrijfsgegevens", `{details}`]
    ]
  }
};
