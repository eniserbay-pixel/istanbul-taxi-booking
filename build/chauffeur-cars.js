// The VIP cars with driver shown on the service pages (chauffeur by the hour, city tour, wedding): real photos of
// our own Mercedes V-Class VIP (Vito VIP), S-Class and E-Class, with what each car offers. Priced on WhatsApp.
// cars: id, photos (public/img/vip/<name>-640.webp and -1200.webp, 4:3, plates blurred), seats, large bags.
// T: the texts per language. In a car's text, alt holds one alt text per photo, in the same order.
module.exports = {
  cars: [
    { id: "vclass", photos: ["vip-vclass-1", "vip-vclass-2"], seats: 6, bags: 6 },
    { id: "sclass", photos: ["vip-sclass-1", "vip-sclass-2", "vip-sclass-3"], seats: 3, bags: 2 },
    { id: "eclass", photos: ["vip-eclass-1", "vip-eclass-2"], seats: 3, bags: 2 }
  ],
  T: {
    en: {
      h: "Our VIP cars with driver", lead: "Real photos of the cars that come for you. Every car is driven by an experienced, smartly dressed driver and is cleaned before each ride.",
      pax: "passengers", bags: "large bags", ask: "Ask for this car", waText: "Hello, I would like a price for the {car} with driver. Date: , hours: , passengers: ",
      cars: {
        vclass: { name: "Mercedes V-Class VIP (Vito VIP)", tag: "VIP minivan · business, families, groups up to 6",
          desc: "A Mercedes Vito rebuilt inside as a VIP lounge: the most spacious car for meetings on the road, families with luggage or a special evening out. You face each other as in a small living room, behind curtains.",
          feats: ["Reclining captain seats in quilted leather with leg rests", "Starry-sky ceiling and ambient lighting", "Curtains on every window for privacy", "Wood trim, side cabinet and cup holders"],
          alt: ["Black Mercedes V-Class VIP, front view", "Mercedes V-Class VIP interior: captain seats in quilted leather and starry-sky ceiling"] },
        sclass: { name: "Mercedes-Benz S-Class", tag: "Flagship sedan · executives, VIP guests, weddings",
          desc: "Mercedes' top saloon, for when the car is part of the impression: executive guests, airport pickups for VIPs, weddings and special days. The back seat is the best seat in the car.",
          feats: ["Rear seats in cream leather with comfort headrest pillows", "Panoramic sunroof", "Screens on the front seatbacks and a rear touch control", "Ambient lighting and a quiet, smooth ride"],
          alt: ["Black Mercedes-Benz S-Class, front three-quarter view", "Mercedes S-Class rear seats in cream leather with screens on the seatbacks", "Mercedes S-Class back seat with armrest, touch control and panoramic roof"] },
        eclass: { name: "Mercedes-Benz E-Class", tag: "Business sedan · meetings, airport, city days",
          desc: "The latest-generation E-Class: business comfort at a lower price than the S-Class. A good choice for a day of meetings, a business trip from the airport or a city day for two or three people.",
          feats: ["Rear seats in tan leather", "Fold-down armrest with cup holders", "Separate air vents and USB charging in the back", "Tinted rear windows"],
          alt: ["Black Mercedes-Benz E-Class, front view", "Mercedes E-Class rear seats in tan leather with fold-down armrest"] }
      }
    },
    tr: {
      h: "Şoförlü VIP araçlarımız", lead: "Sizi almaya gelen araçların gerçek fotoğrafları. Her araçta deneyimli, şık giyimli bir şoför var ve araç her yolculuktan önce temizlenir.",
      pax: "yolcu", bags: "büyük bavul", ask: "Bu araç için fiyat sor", waText: "Merhaba, şoförlü {car} için fiyat almak istiyorum. Tarih: , saat: , yolcu sayısı: ",
      cars: {
        vclass: { name: "Mercedes V-Class VIP (Vito VIP)", tag: "VIP minivan · iş, aile, 6 kişiye kadar grup",
          desc: "İçi VIP salon olarak yeniden yapılmış Mercedes Vito: yolda toplantı, bagajlı aileler ya da özel bir akşam için en geniş araç. Perdelerin arkasında, küçük bir oturma odasındaki gibi karşılıklı oturursunuz.",
          feats: ["Ayak destekli, yatabilen kapitone deri kaptan koltuklar", "Yıldızlı tavan ve ambiyans aydınlatması", "Mahremiyet için her camda perde", "Ahşap detaylar, yan dolap ve bardaklıklar"],
          alt: ["Siyah Mercedes V-Class VIP, önden görünüm", "Mercedes V-Class VIP iç mekân: kapitone deri kaptan koltuklar ve yıldızlı tavan"] },
        sclass: { name: "Mercedes-Benz S-Class", tag: "Amiral sedan · yöneticiler, VIP misafirler, düğünler",
          desc: "Mercedes'in en üst sedanı; aracın da izlenimin bir parçası olduğu anlar için: üst düzey misafirler, havalimanında VIP karşılama, düğün ve özel günler. Arka koltuk aracın en iyi yeridir.",
          feats: ["Konfor yastıklı krem deri arka koltuklar", "Panoramik cam tavan", "Ön koltuk arkalarında ekranlar ve arkada dokunmatik kumanda", "Ambiyans aydınlatması, sessiz ve yumuşak sürüş"],
          alt: ["Siyah Mercedes-Benz S-Class, önden çapraz görünüm", "Mercedes S-Class krem deri arka koltuklar ve koltuk arkası ekranlar", "Mercedes S-Class arka koltuk, kolçak, dokunmatik kumanda ve panoramik tavan"] },
        eclass: { name: "Mercedes-Benz E-Class", tag: "İş sedanı · toplantı, havalimanı, şehir içi gün",
          desc: "Yeni nesil E-Class: S-Class'tan daha uygun fiyata iş konforu. Toplantılarla geçen bir gün, havalimanından iş yolculuğu ya da iki üç kişilik bir şehir günü için iyi bir seçim.",
          feats: ["Taba rengi deri arka koltuklar", "Bardaklıklı katlanır kolçak", "Arkada ayrı klima çıkışları ve USB şarj", "Filmli arka camlar"],
          alt: ["Siyah Mercedes-Benz E-Class, önden görünüm", "Mercedes E-Class taba deri arka koltuklar ve katlanır kolçak"] }
      }
    },
    ru: {
      h: "Наши VIP-автомобили с водителем", lead: "Настоящие фотографии машин, которые приедут за вами. За рулём опытный водитель в деловой одежде, машину моют перед каждой поездкой.",
      pax: "пассажиров", bags: "больших чемоданов", ask: "Узнать цену на эту машину", waText: "Здравствуйте, хочу узнать цену: {car} с водителем. Дата: , часов: , пассажиров: ",
      cars: {
        vclass: { name: "Mercedes V-Class VIP (Vito VIP)", tag: "VIP-минивэн · бизнес, семьи, группы до 6",
          desc: "Mercedes Vito с салоном, переделанным в VIP-лаунж: самая просторная машина для встреч в дороге, семей с багажом или особого вечера. Вы сидите лицом друг к другу, как в маленькой гостиной, за шторками.",
          feats: ["Откидные капитанские кресла из стёганой кожи с подставками для ног", "Потолок «звёздное небо» и контурная подсветка", "Шторки на всех окнах", "Отделка деревом, боковой шкафчик и подстаканники"],
          alt: ["Чёрный Mercedes V-Class VIP, вид спереди", "Салон Mercedes V-Class VIP: капитанские кресла из стёганой кожи и звёздный потолок"] },
        sclass: { name: "Mercedes-Benz S-Class", tag: "Флагманский седан · руководители, VIP-гости, свадьбы",
          desc: "Главный седан Mercedes для случаев, когда машина тоже создаёт впечатление: важные гости, VIP-встреча в аэропорту, свадьбы и особые дни. Заднее сиденье здесь лучшее место в машине.",
          feats: ["Задние сиденья из кремовой кожи с подушками на подголовниках", "Панорамная крыша", "Экраны в спинках передних кресел и сенсорный пульт сзади", "Контурная подсветка, тихий и плавный ход"],
          alt: ["Чёрный Mercedes-Benz S-Class, вид спереди сбоку", "Задние сиденья Mercedes S-Class из кремовой кожи и экраны в спинках", "Заднее сиденье Mercedes S-Class с подлокотником, сенсорным пультом и панорамной крышей"] },
        eclass: { name: "Mercedes-Benz E-Class", tag: "Бизнес-седан · встречи, аэропорт, день в городе",
          desc: "E-Class нового поколения: бизнес-комфорт дешевле, чем S-Class. Хороший выбор для дня встреч, деловой поездки из аэропорта или дня в городе на двоих-троих.",
          feats: ["Задние сиденья из коричневой кожи", "Откидной подлокотник с подстаканниками", "Отдельные дефлекторы и USB-зарядка сзади", "Тонированные задние стёкла"],
          alt: ["Чёрный Mercedes-Benz E-Class, вид спереди", "Задние сиденья Mercedes E-Class из коричневой кожи с откидным подлокотником"] }
      }
    },
    de: {
      h: "Unsere VIP-Fahrzeuge mit Fahrer", lead: "Echte Fotos der Autos, die Sie abholen. Jedes Auto fährt ein erfahrener, gepflegt gekleideter Fahrer, und es wird vor jeder Fahrt gereinigt.",
      pax: "Personen", bags: "große Koffer", ask: "Preis für dieses Auto anfragen", waText: "Hallo, ich möchte einen Preis für: {car} mit Fahrer. Datum: , Stunden: , Personen: ",
      cars: {
        vclass: { name: "Mercedes V-Klasse VIP (Vito VIP)", tag: "VIP-Van · Geschäftlich, Familien, Gruppen bis 6",
          desc: "Ein Mercedes Vito, innen zur VIP-Lounge umgebaut: das geräumigste Auto für Besprechungen unterwegs, Familien mit Gepäck oder einen besonderen Abend. Sie sitzen sich hinter Vorhängen gegenüber wie in einem kleinen Salon.",
          feats: ["Verstellbare Kapitänssitze in gestepptem Leder mit Beinauflage", "Sternenhimmel und Ambientebeleuchtung", "Vorhänge an allen Fenstern", "Holzdekor, Seitenschrank und Getränkehalter"],
          alt: ["Schwarze Mercedes V-Klasse VIP von vorne", "Innenraum der Mercedes V-Klasse VIP: Kapitänssitze in gestepptem Leder und Sternenhimmel"] },
        sclass: { name: "Mercedes-Benz S-Klasse", tag: "Flaggschiff-Limousine · Führungskräfte, VIP-Gäste, Hochzeiten",
          desc: "Die Spitzenlimousine von Mercedes, wenn das Auto Teil des Eindrucks ist: wichtige Gäste, VIP-Abholung am Flughafen, Hochzeiten und besondere Tage. Der Fondsitz ist hier der beste Platz.",
          feats: ["Fondsitze in cremefarbenem Leder mit Komfortkissen", "Panorama-Schiebedach", "Bildschirme in den Vordersitzlehnen und Touch-Bedienung im Fond", "Ambientebeleuchtung, leise und sanfte Fahrt"],
          alt: ["Schwarze Mercedes-Benz S-Klasse schräg von vorne", "Fondsitze der Mercedes S-Klasse in cremefarbenem Leder mit Bildschirmen", "Fond der Mercedes S-Klasse mit Armlehne, Touch-Bedienung und Panoramadach"] },
        eclass: { name: "Mercedes-Benz E-Klasse", tag: "Business-Limousine · Termine, Flughafen, Stadttage",
          desc: "Die neueste E-Klasse: Business-Komfort günstiger als die S-Klasse. Gut für einen Tag voller Termine, eine Geschäftsreise ab dem Flughafen oder einen Stadttag zu zweit oder zu dritt.",
          feats: ["Fondsitze in hellbraunem Leder", "Klappbare Armlehne mit Getränkehaltern", "Eigene Luftdüsen und USB-Laden im Fond", "Getönte Scheiben hinten"],
          alt: ["Schwarze Mercedes-Benz E-Klasse von vorne", "Fondsitze der Mercedes E-Klasse in hellbraunem Leder mit Armlehne"] }
      }
    },
    fr: {
      h: "Nos voitures VIP avec chauffeur", lead: "De vraies photos des voitures qui viennent vous chercher. Chaque voiture est conduite par un chauffeur expérimenté en tenue soignée et nettoyée avant chaque course.",
      pax: "passagers", bags: "grandes valises", ask: "Demander un prix pour cette voiture", waText: "Bonjour, je souhaite un prix pour : {car} avec chauffeur. Date : , heures : , passagers : ",
      cars: {
        vclass: { name: "Mercedes Classe V VIP (Vito VIP)", tag: "Van VIP · affaires, familles, groupes jusqu'à 6",
          desc: "Un Mercedes Vito transformé à l'intérieur en salon VIP : la voiture la plus spacieuse pour une réunion en route, une famille avec bagages ou une soirée spéciale. Vous êtes face à face, derrière des rideaux, comme dans un petit salon.",
          feats: ["Fauteuils capitaine inclinables en cuir matelassé avec repose-jambes", "Plafond ciel étoilé et éclairage d'ambiance", "Rideaux à toutes les vitres", "Boiseries, meuble latéral et porte-gobelets"],
          alt: ["Mercedes Classe V VIP noire, vue de face", "Intérieur de la Mercedes Classe V VIP : fauteuils en cuir matelassé et ciel étoilé"] },
        sclass: { name: "Mercedes-Benz Classe S", tag: "Berline haut de gamme · dirigeants, invités VIP, mariages",
          desc: "La grande berline de Mercedes, quand la voiture fait partie de l'impression : invités importants, accueil VIP à l'aéroport, mariages et jours de fête. La banquette arrière est la meilleure place.",
          feats: ["Sièges arrière en cuir crème avec coussins d'appui-tête", "Toit ouvrant panoramique", "Écrans dans les dossiers avant et commande tactile à l'arrière", "Éclairage d'ambiance, conduite silencieuse et douce"],
          alt: ["Mercedes-Benz Classe S noire, vue de trois quarts avant", "Sièges arrière de la Mercedes Classe S en cuir crème avec écrans", "Arrière de la Mercedes Classe S avec accoudoir, commande tactile et toit panoramique"] },
        eclass: { name: "Mercedes-Benz Classe E", tag: "Berline affaires · rendez-vous, aéroport, journée en ville",
          desc: "La Classe E de dernière génération : le confort affaires à un prix inférieur à la Classe S. Un bon choix pour une journée de rendez-vous, un voyage d'affaires depuis l'aéroport ou une journée en ville à deux ou trois.",
          feats: ["Sièges arrière en cuir camel", "Accoudoir rabattable avec porte-gobelets", "Aérateurs séparés et prises USB à l'arrière", "Vitres arrière teintées"],
          alt: ["Mercedes-Benz Classe E noire, vue de face", "Sièges arrière de la Mercedes Classe E en cuir camel avec accoudoir"] }
      }
    },
    it: {
      h: "Le nostre auto VIP con autista", lead: "Foto reali delle auto che vengono a prendervi. Ogni auto ha un autista esperto e ben vestito e viene pulita prima di ogni corsa.",
      pax: "passeggeri", bags: "valigie grandi", ask: "Chiedi un prezzo per questa auto", waText: "Buongiorno, vorrei un prezzo per: {car} con autista. Data: , ore: , passeggeri: ",
      cars: {
        vclass: { name: "Mercedes Classe V VIP (Vito VIP)", tag: "Van VIP · lavoro, famiglie, gruppi fino a 6",
          desc: "Un Mercedes Vito trasformato all'interno in lounge VIP: l'auto più spaziosa per riunioni in viaggio, famiglie con bagagli o una serata speciale. Si siede uno di fronte all'altro, dietro le tende, come in un piccolo salotto.",
          feats: ["Poltrone capitano reclinabili in pelle trapuntata con poggiagambe", "Cielo stellato e luci d'ambiente", "Tende a tutti i finestrini", "Finiture in legno, mobiletto laterale e portabicchieri"],
          alt: ["Mercedes Classe V VIP nera, vista frontale", "Interni della Mercedes Classe V VIP: poltrone in pelle trapuntata e cielo stellato"] },
        sclass: { name: "Mercedes-Benz Classe S", tag: "Berlina ammiraglia · dirigenti, ospiti VIP, matrimoni",
          desc: "L'ammiraglia di Mercedes, quando anche l'auto fa parte dell'impressione: ospiti importanti, accoglienza VIP in aeroporto, matrimoni e giorni speciali. Il sedile posteriore è il posto migliore.",
          feats: ["Sedili posteriori in pelle crema con cuscini poggiatesta", "Tetto panoramico apribile", "Schermi negli schienali anteriori e comando touch dietro", "Luci d'ambiente, guida silenziosa e morbida"],
          alt: ["Mercedes-Benz Classe S nera, vista di tre quarti anteriore", "Sedili posteriori della Mercedes Classe S in pelle crema con schermi", "Posteriore della Mercedes Classe S con bracciolo, comando touch e tetto panoramico"] },
        eclass: { name: "Mercedes-Benz Classe E", tag: "Berlina business · appuntamenti, aeroporto, giornate in città",
          desc: "La Classe E di ultima generazione: comfort business a un prezzo più basso della Classe S. Una buona scelta per una giornata di appuntamenti, un viaggio di lavoro dall'aeroporto o una giornata in città in due o tre.",
          feats: ["Sedili posteriori in pelle color cuoio", "Bracciolo ribaltabile con portabicchieri", "Bocchette e ricarica USB dedicate dietro", "Vetri posteriori oscurati"],
          alt: ["Mercedes-Benz Classe E nera, vista frontale", "Sedili posteriori della Mercedes Classe E in pelle color cuoio con bracciolo"] }
      }
    },
    nl: {
      h: "Onze VIP-auto's met chauffeur", lead: "Echte foto's van de auto's die je komen halen. Elke auto heeft een ervaren, verzorgd geklede chauffeur en wordt voor elke rit schoongemaakt.",
      pax: "personen", bags: "grote koffers", ask: "Vraag een prijs voor deze auto", waText: "Hallo, ik wil graag een prijs voor: {car} met chauffeur. Datum: , uren: , personen: ",
      cars: {
        vclass: { name: "Mercedes V-Klasse VIP (Vito VIP)", tag: "VIP-bus · zakelijk, gezinnen, groepen tot 6",
          desc: "Een Mercedes Vito die van binnen is omgebouwd tot VIP-lounge: de ruimste auto voor overleg onderweg, gezinnen met bagage of een bijzondere avond. Je zit tegenover elkaar achter gordijnen, als in een kleine zitkamer.",
          feats: ["Verstelbare kapiteinsstoelen in doorgestikt leer met beensteun", "Sterrenhemel en sfeerverlichting", "Gordijnen voor alle ramen", "Houtafwerking, zijkastje en bekerhouders"],
          alt: ["Zwarte Mercedes V-Klasse VIP, vooraanzicht", "Interieur van de Mercedes V-Klasse VIP: leren kapiteinsstoelen en sterrenhemel"] },
        sclass: { name: "Mercedes-Benz S-Klasse", tag: "Topsedan · directie, VIP-gasten, bruiloften",
          desc: "De topsedan van Mercedes, voor als de auto bij de indruk hoort: belangrijke gasten, VIP-ontvangst op de luchthaven, bruiloften en bijzondere dagen. De achterbank is de beste plek in de auto.",
          feats: ["Achterstoelen in crèmekleurig leer met hoofdsteunkussens", "Panoramisch schuifdak", "Schermen in de voorstoelen en touchbediening achterin", "Sfeerverlichting, stil en soepel rijden"],
          alt: ["Zwarte Mercedes-Benz S-Klasse, schuin vooraanzicht", "Achterstoelen van de Mercedes S-Klasse in crèmekleurig leer met schermen", "Achterbank van de Mercedes S-Klasse met armsteun, touchbediening en panoramadak"] },
        eclass: { name: "Mercedes-Benz E-Klasse", tag: "Zakelijke sedan · afspraken, luchthaven, stadsdagen",
          desc: "De nieuwste E-Klasse: zakelijk comfort voor minder dan de S-Klasse. Een goede keuze voor een dag vol afspraken, een zakenreis vanaf de luchthaven of een stadsdag met twee of drie personen.",
          feats: ["Achterstoelen in cognackleurig leer", "Neerklapbare armsteun met bekerhouders", "Eigen ventilatie en USB-laden achterin", "Getinte achterruiten"],
          alt: ["Zwarte Mercedes-Benz E-Klasse, vooraanzicht", "Achterstoelen van de Mercedes E-Klasse in cognackleurig leer met armsteun"] }
      }
    },
    ar: {
      h: "سياراتنا الفاخرة مع سائق", lead: "صور حقيقية للسيارات التي تأتي لاستقبالك. يقود كل سيارة سائق ذو خبرة وبمظهر أنيق، وتُنظَّف السيارة قبل كل رحلة.",
      pax: "ركاب", bags: "حقائب كبيرة", ask: "اسأل عن سعر هذه السيارة", waText: "مرحباً، أريد سعراً لـ {car} مع سائق. التاريخ: ، عدد الساعات: ، عدد الركاب: ",
      cars: {
        vclass: { name: "Mercedes V-Class VIP (Vito VIP)", tag: "فان VIP · أعمال، عائلات، مجموعات حتى 6",
          desc: "مرسيدس فيتو أُعيد تصميم مقصورتها كصالة VIP: أوسع سيارة للاجتماعات أثناء الطريق أو للعائلات مع الأمتعة أو لأمسية خاصة. تجلسون متقابلين خلف الستائر كما في غرفة جلوس صغيرة.",
          feats: ["مقاعد كابتن قابلة للإمالة من الجلد المبطّن مع مسند للساقين", "سقف بإضاءة النجوم وإضاءة محيطية", "ستائر على جميع النوافذ للخصوصية", "لمسات خشبية وخزانة جانبية وحوامل أكواب"],
          alt: ["مرسيدس V-Class VIP سوداء من الأمام", "مقصورة مرسيدس V-Class VIP: مقاعد كابتن من الجلد المبطّن وسقف النجوم"] },
        sclass: { name: "Mercedes-Benz S-Class", tag: "سيدان رائدة · كبار الشخصيات، الضيوف، حفلات الزفاف",
          desc: "أفخم سيدان من مرسيدس، حين تكون السيارة جزءاً من الانطباع: ضيوف مهمّون، استقبال VIP في المطار، حفلات الزفاف والمناسبات الخاصة. المقعد الخلفي هو أفضل مكان في السيارة.",
          feats: ["مقاعد خلفية من الجلد الكريمي مع وسائد للرأس", "فتحة سقف بانورامية", "شاشات في ظهر المقاعد الأمامية وتحكم باللمس في الخلف", "إضاءة محيطية وقيادة هادئة وناعمة"],
          alt: ["مرسيدس-بنز S-Class سوداء من الأمام بزاوية", "المقاعد الخلفية لمرسيدس S-Class من الجلد الكريمي مع الشاشات", "المقعد الخلفي لمرسيدس S-Class مع مسند الذراع والتحكم باللمس والسقف البانورامي"] },
        eclass: { name: "Mercedes-Benz E-Class", tag: "سيدان أعمال · اجتماعات، مطار، يوم في المدينة",
          desc: "الجيل الأحدث من الفئة E: راحة رجال الأعمال بسعر أقل من الفئة S. خيار جيد ليوم مليء بالاجتماعات أو رحلة عمل من المطار أو يوم في المدينة لشخصين أو ثلاثة.",
          feats: ["مقاعد خلفية من الجلد البني الفاتح", "مسند ذراع قابل للطي مع حوامل أكواب", "فتحات تكييف منفصلة وشحن USB في الخلف", "نوافذ خلفية معتمة"],
          alt: ["مرسيدس-بنز E-Class سوداء من الأمام", "المقاعد الخلفية لمرسيدس E-Class من الجلد البني الفاتح مع مسند الذراع"] }
      }
    }
  }
};
