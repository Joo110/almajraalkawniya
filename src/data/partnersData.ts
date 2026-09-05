// src/data/partnersData.ts
//
// ده الملف اللي بتضيف فيه شركاتك وعروض كل شركة.
// كل شركة (Partner) عندها اسم + شعار (اختياري) + مصفوفة من العروض (Offers)
// وكل عرض هو صورة + عنوان اختياري + وصف اختياري.
//
// طريقة رفع الصور:
// - حط كل صور العروض في فولدر public في مشروعك (نفس مكان logo.jpeg مثلاً)
// - وسمّيها زي ما انت عايز (partners1.jpg, partners2.jpg... إلخ)
// - واكتب المسار هنا بالشكل ده: "/partners1.jpg"
// - أو ممكن تستخدم رابط صورة مباشر من الإنترنت (يبدأ بـ https://)
//
// طريقة إضافة شركة جديدة:
// 1. انسخ عنصر كامل من المصفوفة partners (من { لحد }) والصقه قبل الـ ]
// 2. غيّر id (لازم يكون فريد ومكتوب بحروف انجليزية بدون مسافات)
// 3. غيّر name (اسم الشركة اللي هيظهر للزوار)
// 4. ضيف الصور جوه offers
//
// الترجمة:
// - كل حقل عربي (name / description / title) له نظير مترجم اختياري
//   بنفس الاسم + En / Fr / Tr / Ru في الآخر
//   (nameEn / descriptionEn / titleEn, nameFr / descriptionFr / titleFr,
//    nameTr / descriptionTr / titleTr, nameRu / descriptionRu / titleRu).
// - لو ملأتش أي حقل مترجم، الموقع هيعرض النص العربي كـ fallback
//   تلقائيًا حتى لو اللغة مش عربي (أحسن من ما يفضل فاضي).

export interface PartnerOffer {
  id: string;
  image: string;        // مسار الصورة أو رابطها
  title?: string;        // عنوان العرض (عربي)
  titleEn?: string;       // عنوان العرض (إنجليزي - اختياري)
  titleFr?: string;       // عنوان العرض (فرنسي - اختياري)
  titleTr?: string;       // عنوان العرض (تركي - اختياري)
  titleRu?: string;       // عنوان العرض (روسي - اختياري)
  description?: string;  // وصف قصير للعرض (عربي)
  descriptionEn?: string; // وصف قصير للعرض (إنجليزي - اختياري)
  descriptionFr?: string; // وصف قصير للعرض (فرنسي - اختياري)
  descriptionTr?: string; // وصف قصير للعرض (تركي - اختياري)
  descriptionRu?: string; // وصف قصير للعرض (روسي - اختياري)
}

export interface Partner {
  id: string;
  name: string;          // اسم الشركة (عربي)
  nameEn?: string;         // اسم الشركة (إنجليزي - اختياري)
  nameFr?: string;         // اسم الشركة (فرنسي - اختياري)
  nameTr?: string;         // اسم الشركة (تركي - اختياري)
  nameRu?: string;         // اسم الشركة (روسي - اختياري)
  logo?: string;          // شعار الشركة (اختياري)
  description?: string;   // وصف مختصر عن الشركة (عربي)
  descriptionEn?: string; // وصف مختصر عن الشركة (إنجليزي - اختياري)
  descriptionFr?: string; // وصف مختصر عن الشركة (فرنسي - اختياري)
  descriptionTr?: string; // وصف مختصر عن الشركة (تركي - اختياري)
  descriptionRu?: string; // وصف مختصر عن الشركة (روسي - اختياري)
  offers: PartnerOffer[];
}

export const partners: Partner[] = [
  {
    id: 'al-reda-international',
    name: 'الرضا انترناشونال للسفر والسياحة',
    nameEn: 'Al Reda International Travel & Tourism',
    nameFr: 'Al Reda International Voyage & Tourisme',
    nameTr: 'Al Reda International Seyahat ve Turizm',
    nameRu: 'Al Reda International Travel & Tourism',
    logo: '',
    description: 'ترخيص رقم 73205221 - رحلات وباقات سياحية داخلية وخارجية',
    descriptionEn: 'License No. 73205221 - Domestic and international travel packages',
    descriptionFr: 'Licence n° 73205221 - Voyages et forfaits touristiques nationaux et internationaux',
    descriptionTr: 'Lisans No. 73205221 - Yurt içi ve yurt dışı seyahat paketleri',
    descriptionRu: 'Лицензия № 73205221 - Внутренние и международные туристические пакеты',
    offers: [
      {
        id: 'al-reda-offer-1',
        image: '/partners1.jpg',
        title: 'رحلات الشمال التركي - رحلات الصيف',
        titleEn: 'Northern Turkey Trips - Summer Getaways',
        titleFr: "Voyages dans le nord de la Turquie - Escapades d'été",
        titleTr: 'Kuzey Türkiye Turları - Yaz Kaçamakları',
        titleRu: 'Поездки на север Турции - летние путешествия',
        description: 'بالتعاون مع الخطوط التركية - جدول يضم 8 رحلات بمواعيد مختلفة من يوليو حتى أغسطس، بأسعار 4450 / 4650 / 4950 ريال للفرد في الغرفة المزدوجة (باقات برونزية وفضية وذهبية).',
        descriptionEn: 'In partnership with Turkish Airlines - a schedule of 8 trips at different dates from July to August, priced at 4,450 / 4,650 / 4,950 SAR per person (double room, bronze/silver/gold packages).',
        descriptionFr: "En partenariat avec Turkish Airlines - un programme de 8 voyages à différentes dates de juillet à août, aux prix de 4 450 / 4 650 / 4 950 SAR par personne en chambre double (forfaits bronze, argent et or).",
        descriptionTr: 'Turkish Airlines iş birliğiyle - Temmuz ile Ağustos arasında farklı tarihlerde 8 gezilik program, kişi başı çift kişilik odada 4.450 / 4.650 / 4.950 SAR (bronz/gümüş/altın paketler).',
        descriptionRu: 'В партнёрстве с Turkish Airlines - расписание из 8 поездок в разные даты с июля по август, стоимостью 4450 / 4650 / 4950 SAR на человека в двухместном номере (пакеты бронза/серебро/золото).',
      },
      {
        id: 'al-reda-offer-2',
        image: '/partners2.jpg',
        title: 'رحلة البوسنة - 8 أيام',
        titleEn: 'Bosnia Trip - 8 Days',
        titleFr: 'Voyage en Bosnie - 8 jours',
        titleTr: 'Bosna Turu - 8 Gün',
        titleRu: 'Поездка в Боснию - 8 дней',
        description: 'موعدين للسفر: من 03 إلى 11 أغسطس، ومن 20 إلى 28 صفر. سعر الفرد بالغرفة المزدوجة 6300 ريال، تشمل تذاكر طيران وحجوزات فنادق واستقبال وتوديع وجولات سياحية ووجبة إفطار.',
        descriptionEn: 'Two travel dates: August 03-11, and Safar 20-28. Price per person in a double room is 6,300 SAR, including flight tickets, hotel bookings, airport transfers, sightseeing tours, and breakfast.',
        descriptionFr: "Deux dates de voyage : du 3 au 11 août, et du 20 au 28 Safar. Prix par personne en chambre double : 6 300 SAR, comprenant billets d'avion, réservations d'hôtel, transferts aéroport, circuits touristiques et petit-déjeuner.",
        descriptionTr: 'İki seyahat tarihi: 03-11 Ağustos ve Safer 20-28. Çift kişilik odada kişi başı fiyat 6.300 SAR olup uçak bileti, otel rezervasyonu, karşılama-uğurlama, turlar ve kahvaltı dahildir.',
        descriptionRu: 'Две даты поездки: 3-11 августа и Сафар 20-28. Цена на человека в двухместном номере - 6300 SAR, включая авиабилеты, бронирование отелей, трансферы, экскурсии и завтрак.',
      },
      {
        id: 'al-reda-offer-3',
        image: '/partners3.jpg',
        title: 'عرض بولندا - الريف الأوروبي',
        titleEn: 'Poland Offer - European Countryside',
        titleFr: 'Offre Pologne - Campagne européenne',
        titleTr: 'Polonya Fırsatı - Avrupa Kırsalı',
        titleRu: 'Предложение по Польше - европейская сельская местность',
        description: 'موعدين للسفر: من 10 إلى 19 أغسطس، ومن 27 صفر إلى 06 ربيع الأول. خصم خاص 500 ريال - سعر الفرد بالغرفة المفردة 12300 ريال، وبالغرفة المزدوجة 7700 ريال.',
        descriptionEn: 'Two travel dates: August 10-19, and Safar 27 - Rabi al-Awwal 06. Special 500 SAR discount - single room 12,300 SAR per person, double room 7,700 SAR per person.',
        descriptionFr: "Deux dates de voyage : du 10 au 19 août, et du 27 Safar au 6 Rabi al-Awwal. Remise spéciale de 500 SAR - chambre simple 12 300 SAR par personne, chambre double 7 700 SAR par personne.",
        descriptionTr: 'İki seyahat tarihi: 10-19 Ağustos ve Safer 27 - Rebiülevvel 06. Özel 500 SAR indirim - tek kişilik odada kişi başı 12.300 SAR, çift kişilik odada kişi başı 7.700 SAR.',
        descriptionRu: 'Две даты поездки: 10-19 августа и Сафар 27 - Раби аль-авваль 06. Специальная скидка 500 SAR - одноместный номер 12300 SAR с человека, двухместный номер 7700 SAR с человека.',
      },
      {
        id: 'al-reda-offer-4',
        image: '/partners4.jpg',
        title: 'الشمال التركي - باقات مميزة',
        titleEn: 'Northern Turkey - Premium Packages',
        titleFr: 'Nord de la Turquie - Forfaits premium',
        titleTr: 'Kuzey Türkiye - Ayrıcalıklı Paketler',
        titleRu: 'Северная Турция - премиум-пакеты',
        description: 'موعدين للسفر: من 16 إلى 23 أغسطس، ومن 03 إلى 10 ربيع الأول. باقات برونزية 4450 ريال، فضية 4650 ريال، وذهبية 4950 ريال للفرد في الغرفة المزدوجة.',
        descriptionEn: 'Two travel dates: August 16-23, and Rabi al-Awwal 03-10. Bronze package 4,450 SAR, Silver 4,650 SAR, Gold 4,950 SAR per person in a double room.',
        descriptionFr: "Deux dates de voyage : du 16 au 23 août, et du 3 au 10 Rabi al-Awwal. Forfait bronze 4 450 SAR, argent 4 650 SAR, et or 4 950 SAR par personne en chambre double.",
        descriptionTr: 'İki seyahat tarihi: 16-23 Ağustos ve Rebiülevvel 03-10. Bronz paket 4.450 SAR, Gümüş 4.650 SAR, Altın 4.950 SAR - çift kişilik odada kişi başı.',
        descriptionRu: 'Две даты поездки: 16-23 августа и Раби аль-авваль 03-10. Бронзовый пакет 4450 SAR, серебряный 4650 SAR, золотой 4950 SAR на человека в двухместном номере.',
      },
      {
        id: 'al-reda-offer-5',
        image: '/partners5.jpg',
        title: 'الشمال التركي - 7 أيام',
        titleEn: 'Northern Turkey - 7 Days',
        titleFr: 'Nord de la Turquie - 7 jours',
        titleTr: 'Kuzey Türkiye - 7 Gün',
        titleRu: 'Северная Турция - 7 дней',
        description: 'رحلة 7 أيام تشمل تذاكر الطيران والاستقبال والتوديع وحجوزات الفنادق ووجبة الإفطار والجولات السياحية.',
        descriptionEn: 'A 7-day trip including flight tickets, airport transfers, hotel bookings, breakfast, and sightseeing tours.',
        descriptionFr: "Un voyage de 7 jours comprenant billets d'avion, transferts aéroport, réservations d'hôtel, petit-déjeuner et circuits touristiques.",
        descriptionTr: 'Uçak bileti, karşılama-uğurlama, otel rezervasyonu, kahvaltı ve turları içeren 7 günlük bir gezi.',
        descriptionRu: '7-дневная поездка, включающая авиабилеты, трансферы, бронирование отелей, завтрак и экскурсии.',
      },
    ],
  },
  {
    id: 'jawla-horra-nile-blue',
    name: 'جولة حرة - بالتعاون مع نايل بلو',
    nameEn: 'Jawla Horra - in partnership with Nile Blue',
    nameFr: 'Jawla Horra - en partenariat avec Nile Blue',
    nameTr: 'Jawla Horra - Nile Blue iş birliğiyle',
    nameRu: 'Jawla Horra - в партнёрстве с Nile Blue',
    logo: '',
    description: 'رحلات العمرة المباركة لعام 1448هـ / 2026م',
    descriptionEn: 'Blessed Umrah trips for the year 1448H / 2026',
    descriptionFr: "Voyages bénis de la Omra pour l'année 1448H / 2026",
    descriptionTr: '1448H / 2026 yılı için mübarek Umre yolculukları',
    descriptionRu: 'Благословенные поездки на Умру на 1448 г.х. / 2026 г.',
    offers: [
      {
        id: 'jawla-horra-offer-1',
        image: '/partners7.jpg',
        title: 'رحلة العمرة المباركة 1448هـ - 2026م',
        titleEn: 'Blessed Umrah Trip 1448H - 2026',
        titleFr: 'Voyage béni de la Omra 1448H - 2026',
        titleTr: 'Mübarek Umre Yolculuğu 1448H - 2026',
        titleRu: 'Благословенная поездка на Умру 1448 г.х. - 2026',
        description: 'ثلاث برامج: خمس نجوم 9 ليالي بسعر 50000، ثلاث نجوم 14 ليلة بسعر 38500، اقتصادي 14 ليلة بسعر 34500 (ريال رباعي).',
        descriptionEn: 'Three packages: 5-star 9 nights at 50,000 SAR, 3-star 14 nights at 38,500 SAR, economy 14 nights at 34,500 SAR (quad room, SAR).',
        descriptionFr: "Trois formules : 5 étoiles 9 nuits à 50 000 SAR, 3 étoiles 14 nuits à 38 500 SAR, économique 14 nuits à 34 500 SAR (chambre quadruple, SAR).",
        descriptionTr: 'Üç paket: 5 yıldız 9 gece 50.000 SAR, 3 yıldız 14 gece 38.500 SAR, ekonomik 14 gece 34.500 SAR (4 kişilik oda, SAR).',
        descriptionRu: 'Три программы: 5 звёзд 9 ночей за 50000 SAR, 3 звезды 14 ночей за 38500 SAR, эконом 14 ночей за 34500 SAR (номер на четверых, SAR).',
      },
      {
        id: 'jawla-horra-offer-2',
        image: '/partners8.jpg',
        title: 'تفاصيل برامج العمرة لعام 1448هـ / 2026م',
        titleEn: 'Umrah Package Details for 1448H / 2026',
        titleFr: "Détails des formules de la Omra pour 1448H / 2026",
        titleTr: '1448H / 2026 Umre Paketi Detayları',
        titleRu: 'Детали пакетов Умры на 1448 г.х. / 2026',
        description: 'تفاصيل الفنادق والأسعار لكل برنامج في مكة والمدينة، شاملة التأشيرة وتذكرة الطيران والباصات.',
        descriptionEn: 'Hotel and pricing details for each package in Makkah and Madinah, including visa, flight ticket, and bus transport.',
        descriptionFr: "Détails des hôtels et des tarifs pour chaque formule à La Mecque et Médine, incluant visa, billet d'avion et transport en bus.",
        descriptionTr: 'Mekke ve Medine için her paketin otel ve fiyat detayları; vize, uçak bileti ve otobüs ulaşımı dahildir.',
        descriptionRu: 'Подробности отелей и цен для каждой программы в Мекке и Медине, включая визу, авиабилет и автобусный транспорт.',
      },
    ],
  },

  // ⬇️ شركة الجبر - عروض شهر أغسطس ⬇️
  {
    id: 'almajraal-kawniya',
    name: 'المجرة الكونية',
    nameEn: 'Al Majra Al Kawniya',
    nameFr: 'Al Majra Al Kawniya',
    nameTr: 'Al Majra Al Kawniya',
    nameRu: 'Al Majra Al Kawniya',
    logo: '',
    description: 'عروض شهر أغسطس - رحلات ووجهات سياحية متنوعة بالتقسيط مع تابي وتمارا',
    descriptionEn: 'August offers - various tourist trips and destinations, installments with Tabby and Tamara',
    descriptionFr: "Offres du mois d'août - divers voyages et destinations touristiques, paiement en plusieurs fois avec Tabby et Tamara",
    descriptionTr: 'Ağustos ayı fırsatları - Tabby ve Tamara ile taksitli çeşitli turlar ve turistik destinasyonlar',
    descriptionRu: 'Августовские предложения - различные туристические поездки и направления, рассрочка с Tabby и Tamara',
    offers: [
      {
        id: 'almajraal-kawniya-offer-1',
        image: '/الجبر1.jpeg',
        title: 'البوسنة والهرسك: جنة البلقان',
        titleEn: 'Bosnia and Herzegovina: Paradise of the Balkans',
        titleFr: 'Bosnie-Herzégovine : paradis des Balkans',
        titleTr: 'Bosna-Hersek: Balkanların Cenneti',
        titleRu: 'Босния и Герцеговина: рай Балкан',
        description: 'سعر الفرد 2600 ريال - تقسيط مع تابي وتمارا. يشمل جسر موستار القديم، شلالات كرافيتشي، تكية بلاغاي، وسوق باشجارشيا.',
        descriptionEn: 'Price per person 2,600 SAR - installments with Tabby and Tamara. Includes the Old Mostar Bridge, Kravice Waterfalls, Blagaj Tekke, and Baščaršija market.',
        descriptionFr: "Prix par personne 2 600 SAR - paiement en plusieurs fois avec Tabby et Tamara. Comprend le vieux pont de Mostar, les chutes de Kravice, la Tekke de Blagaj et le marché de Baščaršija.",
        descriptionTr: 'Kişi başı fiyat 2.600 SAR - Tabby ve Tamara ile taksit. Eski Mostar Köprüsü, Kravice Şelaleleri, Blagaj Tekkesi ve Baščaršija çarşısını içerir.',
        descriptionRu: 'Цена на человека 2600 SAR - рассрочка с Tabby и Tamara. Включает Старый мост в Мостаре, водопады Кравице, текие Благай и рынок Башчаршия.',
      },
      {
        id: 'almajraal-kawniya-offer-2',
        image: '/الجبر2.jpeg',
        title: 'اسطنبول: عاصمة الحضارة',
        titleEn: 'Istanbul: Capital of Civilization',
        titleFr: 'Istanbul : capitale de la civilisation',
        titleTr: 'İstanbul: Medeniyetin Başkenti',
        titleRu: 'Стамбул: столица цивилизации',
        description: 'العرض 6 ليالي 7 أيام - سعر الفرد 1500 ريال - تقسيط مع تابي وتمارا. يشمل مضيق البوسفور، آيا صوفيا والجامع الأزرق، ساحة السلطان أحمد، وقصر توبكابي.',
        descriptionEn: '6 nights 7 days package - price per person 1,500 SAR - installments with Tabby and Tamara. Includes the Bosphorus Strait, Hagia Sophia and the Blue Mosque, Sultanahmet Square, and Topkapi Palace.',
        descriptionFr: "Forfait 6 nuits / 7 jours - prix par personne 1 500 SAR - paiement en plusieurs fois avec Tabby et Tamara. Comprend le détroit du Bosphore, Sainte-Sophie et la Mosquée bleue, la place Sultanahmet et le palais de Topkapi.",
        descriptionTr: '6 gece 7 gün paket - kişi başı fiyat 1.500 SAR - Tabby ve Tamara ile taksit. Boğaz, Ayasofya ve Sultanahmet Camii, Sultanahmet Meydanı ve Topkapı Sarayı’nı içerir.',
        descriptionRu: 'Пакет 6 ночей 7 дней - цена на человека 1500 SAR - рассрочка с Tabby и Tamara. Включает Босфор, Айя-Софию и Голубую мечеть, площадь Султанахмет и дворец Топкапы.',
      },
      {
        id: 'almajraal-kawniya-offer-3',
        image: '/الجبر3.jpeg',
        title: 'البوسنة والهرسك: جنة خفية',
        titleEn: 'Bosnia and Herzegovina: Hidden Paradise',
        titleFr: 'Bosnie-Herzégovine : paradis caché',
        titleTr: 'Bosna-Hersek: Gizli Cennet',
        titleRu: 'Босния и Герцеговина: скрытый рай',
        description: 'اكتشف جمال البلقان - يشمل جسر موستار القديم، شلالات كرافيتشي، تكية بلاغاي، وسوق باشجارشيا.',
        descriptionEn: 'Discover the beauty of the Balkans - includes the Old Mostar Bridge, Kravice Waterfalls, Blagaj Tekke, and Baščaršija market.',
        descriptionFr: "Découvrez la beauté des Balkans - comprend le vieux pont de Mostar, les chutes de Kravice, la Tekke de Blagaj et le marché de Baščaršija.",
        descriptionTr: 'Balkanların güzelliğini keşfedin - Eski Mostar Köprüsü, Kravice Şelaleleri, Blagaj Tekkesi ve Baščaršija çarşısını içerir.',
        descriptionRu: 'Откройте для себя красоту Балкан - включает Старый мост в Мостаре, водопады Кравице, текие Благай и рынок Башчаршия.',
      },
      {
        id: 'almajraal-kawniya-offer-4',
        image: '/الجبر4.jpeg',
        title: 'ماليزيا: لؤلؤة الشرق',
        titleEn: 'Malaysia: Pearl of the East',
        titleFr: "Malaisie : la perle de l'Orient",
        titleTr: 'Malezya: Doğu\'nun İncisi',
        titleRu: 'Малайзия: жемчужина Востока',
        description: 'العرض 6 ليالي 7 أيام - سعر الفرد 2700 ريال - تقسيط مع تابي وتمارا. يشمل كهوف باتو، برجي بتروناس التوأمين، مرتفعات كاميرون، ولانكاوي.',
        descriptionEn: '6 nights 7 days package - price per person 2,700 SAR - installments with Tabby and Tamara. Includes Batu Caves, the Petronas Twin Towers, Cameron Highlands, and Langkawi.',
        descriptionFr: "Forfait 6 nuits / 7 jours - prix par personne 2 700 SAR - paiement en plusieurs fois avec Tabby et Tamara. Comprend les grottes de Batu, les tours jumelles Petronas, les Cameron Highlands et Langkawi.",
        descriptionTr: '6 gece 7 gün paket - kişi başı fiyat 2.700 SAR - Tabby ve Tamara ile taksit. Batu Mağaraları, Petronas İkiz Kuleleri, Cameron Highlands ve Langkawi\'yi içerir.',
        descriptionRu: 'Пакет 6 ночей 7 дней - цена на человека 2700 SAR - рассрочка с Tabby и Tamara. Включает пещеры Бату, башни-близнецы Петронас, Кэмерон-Хайлендс и Лангкави.',
      },
      {
        id: 'almajraal-kawniya-offer-5',
        image: '/الجبر5.jpeg',
        title: 'جورجيا: سحر القوقاز',
        titleEn: 'Georgia: Charm of the Caucasus',
        titleFr: 'Géorgie : le charme du Caucase',
        titleTr: 'Gürcistan: Kafkasların Cazibesi',
        titleRu: 'Грузия: очарование Кавказа',
        description: 'العرض 6 ليالي 7 أيام - سعر الفرد 1700 ريال - تقسيط مع تابي وتمارا. يشمل تبليسي القديمة وقلعة ناريكالا، كنيسة جرجيتي ترينيتي وجبل كازبيك، مدينة فارديزيا الصخرية، وباتومي وساحل البحر الأسود.',
        descriptionEn: '6 nights 7 days package - price per person 1,700 SAR - installments with Tabby and Tamara. Includes Old Tbilisi and Narikala Fortress, Gergeti Trinity Church and Mount Kazbek, the Vardzia rock city, and Batumi and the Black Sea coast.',
        descriptionFr: "Forfait 6 nuits / 7 jours - prix par personne 1 700 SAR - paiement en plusieurs fois avec Tabby et Tamara. Comprend le vieux Tbilissi et la forteresse de Narikala, l'église de la Trinité de Gergeti et le mont Kazbek, la ville rupestre de Vardzia, ainsi que Batoumi et la côte de la mer Noire.",
        descriptionTr: '6 gece 7 gün paket - kişi başı fiyat 1.700 SAR - Tabby ve Tamara ile taksit. Eski Tiflis ve Narikala Kalesi, Gergeti Teslis Kilisesi ve Kazbek Dağı, Vardzia kaya şehri, Batum ve Karadeniz kıyısını içerir.',
        descriptionRu: 'Пакет 6 ночей 7 дней - цена на человека 1700 SAR - рассрочка с Tabby и Tamara. Включает Старый Тбилиси и крепость Нарикала, храм Гергети Троица и гору Казбек, пещерный город Вардзиа, а также Батуми и побережье Чёрного моря.',
      },
      {
        id: 'almajraal-kawniya-offer-6',
        image: '/الجبر6.jpeg',
        title: 'إندونيسيا وتايلاند: لؤلؤة الشرق الأوسط',
        titleEn: 'Indonesia and Thailand: Pearl of the East',
        titleFr: "Indonésie et Thaïlande : la perle de l'Orient",
        titleTr: 'Endonezya ve Tayland: Doğu\'nun İncisi',
        titleRu: 'Индонезия и Таиланд: жемчужина Востока',
        description: 'العرض 6 ليالي 7 أيام - سعر الفرد 1500 ريال - تقسيط مع تابي وتمارا. يشمل القصر الكبير ومعبد بوذا الزمردي، خليج فانغ نغا وجزيرة جيمس بوند، جزر في وشاطئ مايا باي، والمعبد الأبيض التاريخي.',
        descriptionEn: '6 nights 7 days package - price per person 1,500 SAR - installments with Tabby and Tamara. Includes the Grand Palace and Emerald Buddha Temple, Phang Nga Bay and James Bond Island, Phi Phi Islands and Maya Bay, and the historic White Temple.',
        descriptionFr: "Forfait 6 nuits / 7 jours - prix par personne 1 500 SAR - paiement en plusieurs fois avec Tabby et Tamara. Comprend le Grand Palais et le Temple du Bouddha d'émeraude, la baie de Phang Nga et l'île de James Bond, les îles Phi Phi et la baie de Maya, ainsi que le célèbre Temple blanc.",
        descriptionTr: '6 gece 7 gün paket - kişi başı fiyat 1.500 SAR - Tabby ve Tamara ile taksit. Büyük Saray ve Zümrüt Buda Tapınağı, Phang Nga Körfezi ve James Bond Adası, Phi Phi Adaları ve Maya Bay, tarihi Beyaz Tapınak’ı içerir.',
        descriptionRu: 'Пакет 6 ночей 7 дней - цена на человека 1500 SAR - рассрочка с Tabby и Tamara. Включает Большой дворец и храм Изумрудного Будды, залив Пханг Нга и остров Джеймса Бонда, острова Пхи-Пхи и залив Майя, а также исторический Белый храм.',
      },
      {
        id: 'almajraal-kawniya-offer-7',
        image: '/الجبر7.jpeg',
        title: 'أذربيجان: لؤلؤة القوقاز',
        titleEn: 'Azerbaijan: Pearl of the Caucasus',
        titleFr: 'Azerbaïdjan : la perle du Caucase',
        titleTr: 'Azerbaycan: Kafkasların İncisi',
        titleRu: 'Азербайджан: жемчужина Кавказа',
        description: 'العرض 6 ليالي 7 أيام - سعر الفرد 1300 ريال - تقسيط مع تابي وتمارا. يشمل قصر الشروانشاهين والمدينة القديمة، أبراج الشعلة وكورنيش باكو، مركز حيدر علييف الثقافي، وبرج العذراء وخليج باكو.',
        descriptionEn: '6 nights 7 days package - price per person 1,300 SAR - installments with Tabby and Tamara. Includes the Shirvanshah Palace and Old City, Flame Towers and Baku Boulevard, the Heydar Aliyev Cultural Center, and the Maiden Tower and Baku Bay.',
        descriptionFr: "Forfait 6 nuits / 7 jours - prix par personne 1 300 SAR - paiement en plusieurs fois avec Tabby et Tamara. Comprend le palais des Chirvanchahs et la vieille ville, les tours de la Flamme et le boulevard de Bakou, le centre culturel Heydar Aliyev, ainsi que la Tour de la Vierge et la baie de Bakou.",
        descriptionTr: '6 gece 7 gün paket - kişi başı fiyat 1.300 SAR - Tabby ve Tamara ile taksit. Şirvanşahlar Sarayı ve Eski Şehir, Alev Kuleleri ve Bakü Bulvarı, Haydar Aliyev Kültür Merkezi, Kız Kulesi ve Bakü Körfezi’ni içerir.',
        descriptionRu: 'Пакет 6 ночей 7 дней - цена на человека 1300 SAR - рассрочка с Tabby и Tamara. Включает дворец Ширваншахов и Старый город, Пламенные башни и бульвар Баку, культурный центр Гейдара Алиева, а также Девичью башню и Бакинскую бухту.',
      },
      {
        id: 'almajraal-kawniya-offer-8',
        image: '/الجبر8.jpeg',
        title: 'الشمال التركي: طبيعة خلابة',
        titleEn: 'Northern Turkey: Stunning Nature',
        titleFr: 'Nord de la Turquie : une nature à couper le souffle',
        titleTr: 'Kuzey Türkiye: Muhteşem Doğa',
        titleRu: 'Северная Турция: потрясающая природа',
        description: 'سعر الفرد 2100 ريال - تقسيط مع تابي وتمارا. يشمل بحيرة أوزنجول، دير سوميلا، وادي العاصفة، وشملي همشين.',
        descriptionEn: 'Price per person 2,100 SAR - installments with Tabby and Tamara. Includes Uzungol Lake, Sumela Monastery, Storm Valley, and Hemsin.',
        descriptionFr: "Prix par personne 2 100 SAR - paiement en plusieurs fois avec Tabby et Tamara. Comprend le lac Uzungöl, le monastère de Sumela, la vallée de la Tempête et Hemşin.",
        descriptionTr: 'Kişi başı fiyat 2.100 SAR - Tabby ve Tamara ile taksit. Uzungöl, Sümela Manastırı, Fırtına Vadisi ve Hemşin’i içerir.',
        descriptionRu: 'Цена на человека 2100 SAR - рассрочка с Tabby и Tamara. Включает озеро Узунгёль, монастырь Сумела, Штормовую долину и Хемшин.',
      },
      {
        id: 'almajraal-kawniya-offer-9',
        image: '/الجبر9.jpeg',
        title: 'موسكو: عاصمة الحضارة',
        titleEn: 'Moscow: Capital of Civilization',
        titleFr: 'Moscou : capitale de la civilisation',
        titleTr: 'Moskova: Medeniyetin Başkenti',
        titleRu: 'Москва: столица цивилизации',
        description: 'العرض 6 ليالي 7 أيام - سعر الفرد 1700 ريال - تقسيط مع تابي وتمارا. يشمل كاتدرائية القديس باسيل الحمراء، الكرملين ونهر موسكفا، مترو موسكو التاريخي، ومسرح البولشوي.',
        descriptionEn: '6 nights 7 days package - price per person 1,700 SAR - installments with Tabby and Tamara. Includes St. Basil\'s Cathedral, the Kremlin and Moskva River, the historic Moscow Metro, and the Bolshoi Theatre.',
        descriptionFr: "Forfait 6 nuits / 7 jours - prix par personne 1 700 SAR - paiement en plusieurs fois avec Tabby et Tamara. Comprend la cathédrale Saint-Basile, le Kremlin et la rivière Moskova, le célèbre métro de Moscou, et le théâtre Bolchoï.",
        descriptionTr: '6 gece 7 gün paket - kişi başı fiyat 1.700 SAR - Tabby ve Tamara ile taksit. Aziz Basil Katedrali, Kremlin ve Moskova Nehri, tarihi Moskova Metrosu ve Bolşoy Tiyatrosu’nu içerir.',
        descriptionRu: 'Пакет 6 ночей 7 дней - цена на человека 1700 SAR - рассрочка с Tabby и Tamara. Включает Собор Василия Блаженного, Кремль и Москву-реку, историческое метро Москвы и Большой театр.',
      },
      {
        id: 'almajraal-kawniya-offer-10',
        image: '/الجبر10.jpeg',
        title: 'إندونيسيا: لؤلؤة الشرق الأوسط',
        titleEn: 'Indonesia: Pearl of the East',
        titleFr: "Indonésie : la perle de l'Orient",
        titleTr: 'Endonezya: Doğu\'nun İncisi',
        titleRu: 'Индонезия: жемчужина Востока',
        description: 'العرض 6 ليالي 7 أيام - سعر الفرد 2000 ريال - تقسيط مع تابي وتمارا. يشمل معبد أولون دانو براتان وبحيرة براتان، جبل برومو والمناظر البركانية، شاطئ كيلينكينج ونوسا بينيدا، ومعبد بوروبودور التاريخي.',
        descriptionEn: '6 nights 7 days package - price per person 2,000 SAR - installments with Tabby and Tamara. Includes Ulun Danu Beratan Temple and Lake Beratan, Mount Bromo and volcanic views, Kelingking Beach and Nusa Penida, and the historic Borobudur Temple.',
        descriptionFr: "Forfait 6 nuits / 7 jours - prix par personne 2 000 SAR - paiement en plusieurs fois avec Tabby et Tamara. Comprend le temple d'Ulun Danu Beratan et le lac Beratan, le mont Bromo et ses paysages volcaniques, la plage de Kelingking et Nusa Penida, ainsi que le célèbre temple de Borobudur.",
        descriptionTr: '6 gece 7 gün paket - kişi başı fiyat 2.000 SAR - Tabby ve Tamara ile taksit. Ulun Danu Beratan Tapınağı ve Beratan Gölü, Bromo Dağı ve volkanik manzaralar, Kelingking Sahili ve Nusa Penida, tarihi Borobudur Tapınağı’nı içerir.',
        descriptionRu: 'Пакет 6 ночей 7 дней - цена на человека 2000 SAR - рассрочка с Tabby и Tamara. Включает храм Улун Дану Братан и озеро Братан, гору Бромо и вулканические пейзажи, пляж Келингкинг и Нуса-Пениду, а также исторический храм Боробудур.',
      },
    ],
  },

  // ⬇️ ضيف شركاتك الجديدة هنا زي المثال فوق ⬇️
  {
    id: 'al-jabr',
    name: 'شركة الابراهيمي للتجارة',
    nameEn: 'Al Ibrahimi Trading Company',
    nameFr: 'Al Ibrahimi Trading Company',
    nameTr: 'Al Ibrahimi Trading Company',
    nameRu: 'Al Ibrahimi Trading Company',
    logo: '',
    description: 'عروض شهر أغسطس - رحلات ووجهات سياحية متنوعة بالتقسيط مع تابي وتمارا',
    descriptionEn: 'August offers - various tourist trips and destinations, installments with Tabby and Tamara',
    descriptionFr: "Offres du mois d'août - divers voyages et destinations touristiques, paiement en plusieurs fois avec Tabby et Tamara",
    descriptionTr: 'Ağustos ayı fırsatları - Tabby ve Tamara ile taksitli çeşitli turlar ve turistik destinasyonlar',
    descriptionRu: 'Августовские предложения - различные туристические поездки и направления, рассрочка с Tabby и Tamara',
    offers: [

    ],
  }
];