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
// الترجمة الإنجليزية:
// - كل حقل عربي (name / description / title) له نظير إنجليزي اختياري
//   بنفس الاسم + En في الآخر (nameEn / descriptionEn / titleEn).
// - لو ملأتش الحقل الإنجليزي، الموقع هيعرض النص العربي كـ fallback
//   تلقائيًا حتى لو اللغة إنجليزي (أحسن من ما يفضل فاضي).

export interface PartnerOffer {
  id: string;
  image: string;        // مسار الصورة أو رابطها
  title?: string;        // عنوان العرض (عربي)
  titleEn?: string;       // عنوان العرض (إنجليزي - اختياري)
  titleFr?: string;       // عنوان العرض (فرنسي - اختياري)
  description?: string;  // وصف قصير للعرض (عربي)
  descriptionEn?: string; // وصف قصير للعرض (إنجليزي - اختياري)
  descriptionFr?: string; // وصف قصير للعرض (فرنسي - اختياري)
}

export interface Partner {
  id: string;
  name: string;          // اسم الشركة (عربي)
  nameEn?: string;         // اسم الشركة (إنجليزي - اختياري)
  nameFr?: string;         // اسم الشركة (فرنسي - اختياري)
  logo?: string;          // شعار الشركة (اختياري)
  description?: string;   // وصف مختصر عن الشركة (عربي)
  descriptionEn?: string; // وصف مختصر عن الشركة (إنجليزي - اختياري)
  descriptionFr?: string; // وصف مختصر عن الشركة (فرنسي - اختياري)
  offers: PartnerOffer[];
}

export const partners: Partner[] = [
  {
    id: 'al-reda-international',
    name: 'الرضا انترناشونال للسفر والسياحة',
    nameEn: 'Al Reda International Travel & Tourism',
    nameFr: 'Al Reda International Voyage & Tourisme',
    logo: '',
    description: 'ترخيص رقم 73205221 - رحلات وباقات سياحية داخلية وخارجية',
    descriptionEn: 'License No. 73205221 - Domestic and international travel packages',
    descriptionFr: 'Licence n° 73205221 - Voyages et forfaits touristiques nationaux et internationaux',
    offers: [
      {
        id: 'al-reda-offer-1',
        image: '/partners1.jpg',
        title: 'رحلات الشمال التركي - رحلات الصيف',
        titleEn: 'Northern Turkey Trips - Summer Getaways',
        titleFr: "Voyages dans le nord de la Turquie - Escapades d'été",
        description: 'بالتعاون مع الخطوط التركية - جدول يضم 8 رحلات بمواعيد مختلفة من يوليو حتى أغسطس، بأسعار 4450 / 4650 / 4950 ريال للفرد في الغرفة المزدوجة (باقات برونزية وفضية وذهبية).',
        descriptionEn: 'In partnership with Turkish Airlines - a schedule of 8 trips at different dates from July to August, priced at 4,450 / 4,650 / 4,950 SAR per person (double room, bronze/silver/gold packages).',
        descriptionFr: "En partenariat avec Turkish Airlines - un programme de 8 voyages à différentes dates de juillet à août, aux prix de 4 450 / 4 650 / 4 950 SAR par personne en chambre double (forfaits bronze, argent et or).",
      },
      {
        id: 'al-reda-offer-2',
        image: '/partners2.jpg',
        title: 'رحلة البوسنة - 8 أيام',
        titleEn: 'Bosnia Trip - 8 Days',
        titleFr: 'Voyage en Bosnie - 8 jours',
        description: 'موعدين للسفر: من 03 إلى 11 أغسطس، ومن 20 إلى 28 صفر. سعر الفرد بالغرفة المزدوجة 6300 ريال، تشمل تذاكر طيران وحجوزات فنادق واستقبال وتوديع وجولات سياحية ووجبة إفطار.',
        descriptionEn: 'Two travel dates: August 03-11, and Safar 20-28. Price per person in a double room is 6,300 SAR, including flight tickets, hotel bookings, airport transfers, sightseeing tours, and breakfast.',
        descriptionFr: "Deux dates de voyage : du 3 au 11 août, et du 20 au 28 Safar. Prix par personne en chambre double : 6 300 SAR, comprenant billets d'avion, réservations d'hôtel, transferts aéroport, circuits touristiques et petit-déjeuner.",
      },
      {
        id: 'al-reda-offer-3',
        image: '/partners3.jpg',
        title: 'عرض بولندا - الريف الأوروبي',
        titleEn: 'Poland Offer - European Countryside',
        titleFr: 'Offre Pologne - Campagne européenne',
        description: 'موعدين للسفر: من 10 إلى 19 أغسطس، ومن 27 صفر إلى 06 ربيع الأول. خصم خاص 500 ريال - سعر الفرد بالغرفة المفردة 12300 ريال، وبالغرفة المزدوجة 7700 ريال.',
        descriptionEn: 'Two travel dates: August 10-19, and Safar 27 - Rabi al-Awwal 06. Special 500 SAR discount - single room 12,300 SAR per person, double room 7,700 SAR per person.',
        descriptionFr: "Deux dates de voyage : du 10 au 19 août, et du 27 Safar au 6 Rabi al-Awwal. Remise spéciale de 500 SAR - chambre simple 12 300 SAR par personne, chambre double 7 700 SAR par personne.",
      },
      {
        id: 'al-reda-offer-4',
        image: '/partners4.jpg',
        title: 'الشمال التركي - باقات مميزة',
        titleEn: 'Northern Turkey - Premium Packages',
        titleFr: 'Nord de la Turquie - Forfaits premium',
        description: 'موعدين للسفر: من 16 إلى 23 أغسطس، ومن 03 إلى 10 ربيع الأول. باقات برونزية 4450 ريال، فضية 4650 ريال، وذهبية 4950 ريال للفرد في الغرفة المزدوجة.',
        descriptionEn: 'Two travel dates: August 16-23, and Rabi al-Awwal 03-10. Bronze package 4,450 SAR, Silver 4,650 SAR, Gold 4,950 SAR per person in a double room.',
        descriptionFr: "Deux dates de voyage : du 16 au 23 août, et du 3 au 10 Rabi al-Awwal. Forfait bronze 4 450 SAR, argent 4 650 SAR, et or 4 950 SAR par personne en chambre double.",
      },
      {
        id: 'al-reda-offer-5',
        image: '/partners5.jpg',
        title: 'الشمال التركي - 7 أيام',
        titleEn: 'Northern Turkey - 7 Days',
        titleFr: 'Nord de la Turquie - 7 jours',
        description: 'رحلة 7 أيام تشمل تذاكر الطيران والاستقبال والتوديع وحجوزات الفنادق ووجبة الإفطار والجولات السياحية.',
        descriptionEn: 'A 7-day trip including flight tickets, airport transfers, hotel bookings, breakfast, and sightseeing tours.',
        descriptionFr: "Un voyage de 7 jours comprenant billets d'avion, transferts aéroport, réservations d'hôtel, petit-déjeuner et circuits touristiques.",
      },
    ],
  },
  {
    id: 'jawla-horra-nile-blue',
    name: 'جولة حرة - بالتعاون مع نايل بلو',
    nameEn: 'Jawla Horra - in partnership with Nile Blue',
    nameFr: 'Jawla Horra - en partenariat avec Nile Blue',
    logo: '',
    description: 'رحلات العمرة المباركة لعام 1448هـ / 2026م',
    descriptionEn: 'Blessed Umrah trips for the year 1448H / 2026',
    descriptionFr: "Voyages bénis de la Omra pour l'année 1448H / 2026",
    offers: [
      {
        id: 'jawla-horra-offer-1',
        image: '/partners7.jpg',
        title: 'رحلة العمرة المباركة 1448هـ - 2026م',
        titleEn: 'Blessed Umrah Trip 1448H - 2026',
        titleFr: 'Voyage béni de la Omra 1448H - 2026',
        description: 'ثلاث برامج: خمس نجوم 9 ليالي بسعر 50000، ثلاث نجوم 14 ليلة بسعر 38500، اقتصادي 14 ليلة بسعر 34500 (ريال رباعي).',
        descriptionEn: 'Three packages: 5-star 9 nights at 50,000 SAR, 3-star 14 nights at 38,500 SAR, economy 14 nights at 34,500 SAR (quad room, SAR).',
        descriptionFr: "Trois formules : 5 étoiles 9 nuits à 50 000 SAR, 3 étoiles 14 nuits à 38 500 SAR, économique 14 nuits à 34 500 SAR (chambre quadruple, SAR).",
      },
      {
        id: 'jawla-horra-offer-2',
        image: '/partners8.jpg',
        title: 'تفاصيل برامج العمرة لعام 1448هـ / 2026م',
        titleEn: 'Umrah Package Details for 1448H / 2026',
        titleFr: "Détails des formules de la Omra pour 1448H / 2026",
        description: 'تفاصيل الفنادق والأسعار لكل برنامج في مكة والمدينة، شاملة التأشيرة وتذكرة الطيران والباصات.',
        descriptionEn: 'Hotel and pricing details for each package in Makkah and Madinah, including visa, flight ticket, and bus transport.',
        descriptionFr: "Détails des hôtels et des tarifs pour chaque formule à La Mecque et Médine, incluant visa, billet d'avion et transport en bus.",
      },
    ],
  },

  // ⬇️ شركة الجبر - عروض شهر أغسطس ⬇️
  {
    id: 'almajraal-kawniya',
    name: 'المجرة الكونية',
    nameEn: 'Al Majra Al Kawniya',
    nameFr: 'Al Majra Al Kawniya',
    logo: '',
    description: 'عروض شهر أغسطس - رحلات ووجهات سياحية متنوعة بالتقسيط مع تابي وتمارا',
    descriptionEn: 'August offers - various tourist trips and destinations, installments with Tabby and Tamara',
    descriptionFr: "Offres du mois d'août - divers voyages et destinations touristiques, paiement en plusieurs fois avec Tabby et Tamara",
    offers: [
      {
        id: 'almajraal-kawniya-offer-1',
        image: '/الجبر1.jpeg',
        title: 'البوسنة والهرسك: جنة البلقان',
        titleEn: 'Bosnia and Herzegovina: Paradise of the Balkans',
        titleFr: 'Bosnie-Herzégovine : paradis des Balkans',
        description: 'سعر الفرد 2600 ريال - تقسيط مع تابي وتمارا. يشمل جسر موستار القديم، شلالات كرافيتشي، تكية بلاغاي، وسوق باشجارشيا.',
        descriptionEn: 'Price per person 2,600 SAR - installments with Tabby and Tamara. Includes the Old Mostar Bridge, Kravice Waterfalls, Blagaj Tekke, and Baščaršija market.',
        descriptionFr: "Prix par personne 2 600 SAR - paiement en plusieurs fois avec Tabby et Tamara. Comprend le vieux pont de Mostar, les chutes de Kravice, la Tekke de Blagaj et le marché de Baščaršija.",
      },
      {
        id: 'almajraal-kawniya-offer-2',
        image: '/الجبر2.jpeg',
        title: 'اسطنبول: عاصمة الحضارة',
        titleEn: 'Istanbul: Capital of Civilization',
        titleFr: 'Istanbul : capitale de la civilisation',
        description: 'العرض 6 ليالي 7 أيام - سعر الفرد 1500 ريال - تقسيط مع تابي وتمارا. يشمل مضيق البوسفور، آيا صوفيا والجامع الأزرق، ساحة السلطان أحمد، وقصر توبكابي.',
        descriptionEn: '6 nights 7 days package - price per person 1,500 SAR - installments with Tabby and Tamara. Includes the Bosphorus Strait, Hagia Sophia and the Blue Mosque, Sultanahmet Square, and Topkapi Palace.',
        descriptionFr: "Forfait 6 nuits / 7 jours - prix par personne 1 500 SAR - paiement en plusieurs fois avec Tabby et Tamara. Comprend le détroit du Bosphore, Sainte-Sophie et la Mosquée bleue, la place Sultanahmet et le palais de Topkapi.",
      },
      {
        id: 'almajraal-kawniya-offer-3',
        image: '/الجبر3.jpeg',
        title: 'البوسنة والهرسك: جنة خفية',
        titleEn: 'Bosnia and Herzegovina: Hidden Paradise',
        titleFr: 'Bosnie-Herzégovine : paradis caché',
        description: 'اكتشف جمال البلقان - يشمل جسر موستار القديم، شلالات كرافيتشي، تكية بلاغاي، وسوق باشجارشيا.',
        descriptionEn: 'Discover the beauty of the Balkans - includes the Old Mostar Bridge, Kravice Waterfalls, Blagaj Tekke, and Baščaršija market.',
        descriptionFr: "Découvrez la beauté des Balkans - comprend le vieux pont de Mostar, les chutes de Kravice, la Tekke de Blagaj et le marché de Baščaršija.",
      },
      {
        id: 'almajraal-kawniya-offer-4',
        image: '/الجبر4.jpeg',
        title: 'ماليزيا: لؤلؤة الشرق',
        titleEn: 'Malaysia: Pearl of the East',
        titleFr: "Malaisie : la perle de l'Orient",
        description: 'العرض 6 ليالي 7 أيام - سعر الفرد 2700 ريال - تقسيط مع تابي وتمارا. يشمل كهوف باتو، برجي بتروناس التوأمين، مرتفعات كاميرون، ولانكاوي.',
        descriptionEn: '6 nights 7 days package - price per person 2,700 SAR - installments with Tabby and Tamara. Includes Batu Caves, the Petronas Twin Towers, Cameron Highlands, and Langkawi.',
        descriptionFr: "Forfait 6 nuits / 7 jours - prix par personne 2 700 SAR - paiement en plusieurs fois avec Tabby et Tamara. Comprend les grottes de Batu, les tours jumelles Petronas, les Cameron Highlands et Langkawi.",
      },
      {
        id: 'almajraal-kawniya-offer-5',
        image: '/الجبر5.jpeg',
        title: 'جورجيا: سحر القوقاز',
        titleEn: 'Georgia: Charm of the Caucasus',
        titleFr: 'Géorgie : le charme du Caucase',
        description: 'العرض 6 ليالي 7 أيام - سعر الفرد 1700 ريال - تقسيط مع تابي وتمارا. يشمل تبليسي القديمة وقلعة ناريكالا، كنيسة جرجيتي ترينيتي وجبل كازبيك، مدينة فارديزيا الصخرية، وباتومي وساحل البحر الأسود.',
        descriptionEn: '6 nights 7 days package - price per person 1,700 SAR - installments with Tabby and Tamara. Includes Old Tbilisi and Narikala Fortress, Gergeti Trinity Church and Mount Kazbek, the Vardzia rock city, and Batumi and the Black Sea coast.',
        descriptionFr: "Forfait 6 nuits / 7 jours - prix par personne 1 700 SAR - paiement en plusieurs fois avec Tabby et Tamara. Comprend le vieux Tbilissi et la forteresse de Narikala, l'église de la Trinité de Gergeti et le mont Kazbek, la ville rupestre de Vardzia, ainsi que Batoumi et la côte de la mer Noire.",
      },
      {
        id: 'almajraal-kawniya-offer-6',
        image: '/الجبر6.jpeg',
        title: 'إندونيسيا وتايلاند: لؤلؤة الشرق الأوسط',
        titleEn: 'Indonesia and Thailand: Pearl of the East',
        titleFr: "Indonésie et Thaïlande : la perle de l'Orient",
        description: 'العرض 6 ليالي 7 أيام - سعر الفرد 1500 ريال - تقسيط مع تابي وتمارا. يشمل القصر الكبير ومعبد بوذا الزمردي، خليج فانغ نغا وجزيرة جيمس بوند، جزر في وشاطئ مايا باي، والمعبد الأبيض التاريخي.',
        descriptionEn: '6 nights 7 days package - price per person 1,500 SAR - installments with Tabby and Tamara. Includes the Grand Palace and Emerald Buddha Temple, Phang Nga Bay and James Bond Island, Phi Phi Islands and Maya Bay, and the historic White Temple.',
        descriptionFr: "Forfait 6 nuits / 7 jours - prix par personne 1 500 SAR - paiement en plusieurs fois avec Tabby et Tamara. Comprend le Grand Palais et le Temple du Bouddha d'émeraude, la baie de Phang Nga et l'île de James Bond, les îles Phi Phi et la baie de Maya, ainsi que le célèbre Temple blanc.",
      },
      {
        id: 'almajraal-kawniya-offer-7',
        image: '/الجبر7.jpeg',
        title: 'أذربيجان: لؤلؤة القوقاز',
        titleEn: 'Azerbaijan: Pearl of the Caucasus',
        titleFr: 'Azerbaïdjan : la perle du Caucase',
        description: 'العرض 6 ليالي 7 أيام - سعر الفرد 1300 ريال - تقسيط مع تابي وتمارا. يشمل قصر الشروانشاهين والمدينة القديمة، أبراج الشعلة وكورنيش باكو، مركز حيدر علييف الثقافي، وبرج العذراء وخليج باكو.',
        descriptionEn: '6 nights 7 days package - price per person 1,300 SAR - installments with Tabby and Tamara. Includes the Shirvanshah Palace and Old City, Flame Towers and Baku Boulevard, the Heydar Aliyev Cultural Center, and the Maiden Tower and Baku Bay.',
        descriptionFr: "Forfait 6 nuits / 7 jours - prix par personne 1 300 SAR - paiement en plusieurs fois avec Tabby et Tamara. Comprend le palais des Chirvanchahs et la vieille ville, les tours de la Flamme et le boulevard de Bakou, le centre culturel Heydar Aliyev, ainsi que la Tour de la Vierge et la baie de Bakou.",
      },
      {
        id: 'almajraal-kawniya-offer-8',
        image: '/الجبر8.jpeg',
        title: 'الشمال التركي: طبيعة خلابة',
        titleEn: 'Northern Turkey: Stunning Nature',
        titleFr: 'Nord de la Turquie : une nature à couper le souffle',
        description: 'سعر الفرد 2100 ريال - تقسيط مع تابي وتمارا. يشمل بحيرة أوزنجول، دير سوميلا، وادي العاصفة، وشملي همشين.',
        descriptionEn: 'Price per person 2,100 SAR - installments with Tabby and Tamara. Includes Uzungol Lake, Sumela Monastery, Storm Valley, and Hemsin.',
        descriptionFr: "Prix par personne 2 100 SAR - paiement en plusieurs fois avec Tabby et Tamara. Comprend le lac Uzungöl, le monastère de Sumela, la vallée de la Tempête et Hemşin.",
      },
      {
        id: 'almajraal-kawniya-offer-9',
        image: '/الجبر9.jpeg',
        title: 'موسكو: عاصمة الحضارة',
        titleEn: 'Moscow: Capital of Civilization',
        titleFr: 'Moscou : capitale de la civilisation',
        description: 'العرض 6 ليالي 7 أيام - سعر الفرد 1700 ريال - تقسيط مع تابي وتمارا. يشمل كاتدرائية القديس باسيل الحمراء، الكرملين ونهر موسكفا، مترو موسكو التاريخي، ومسرح البولشوي.',
        descriptionEn: '6 nights 7 days package - price per person 1,700 SAR - installments with Tabby and Tamara. Includes St. Basil\'s Cathedral, the Kremlin and Moskva River, the historic Moscow Metro, and the Bolshoi Theatre.',
        descriptionFr: "Forfait 6 nuits / 7 jours - prix par personne 1 700 SAR - paiement en plusieurs fois avec Tabby et Tamara. Comprend la cathédrale Saint-Basile, le Kremlin et la rivière Moskova, le célèbre métro de Moscou, et le théâtre Bolchoï.",
      },
      {
        id: 'almajraal-kawniya-offer-10',
        image: '/الجبر10.jpeg',
        title: 'إندونيسيا: لؤلؤة الشرق الأوسط',
        titleEn: 'Indonesia: Pearl of the East',
        titleFr: "Indonésie : la perle de l'Orient",
        description: 'العرض 6 ليالي 7 أيام - سعر الفرد 2000 ريال - تقسيط مع تابي وتمارا. يشمل معبد أولون دانو براتان وبحيرة براتان، جبل برومو والمناظر البركانية، شاطئ كيلينكينج ونوسا بينيدا، ومعبد بوروبودور التاريخي.',
        descriptionEn: '6 nights 7 days package - price per person 2,000 SAR - installments with Tabby and Tamara. Includes Ulun Danu Beratan Temple and Lake Beratan, Mount Bromo and volcanic views, Kelingking Beach and Nusa Penida, and the historic Borobudur Temple.',
        descriptionFr: "Forfait 6 nuits / 7 jours - prix par personne 2 000 SAR - paiement en plusieurs fois avec Tabby et Tamara. Comprend le temple d'Ulun Danu Beratan et le lac Beratan, le mont Bromo et ses paysages volcaniques, la plage de Kelingking et Nusa Penida, ainsi que le célèbre temple de Borobudur.",
      },
    ],
  },

  // ⬇️ ضيف شركاتك الجديدة هنا زي المثال فوق ⬇️
  {
    id: 'al-jabr',
    name: 'شركة الابراهيمي للتجارة',
    nameEn: 'Al Ibrahimi Trading Company',
    nameFr: 'Al Ibrahimi Trading Company',
    logo: '',
    description: 'عروض شهر أغسطس - رحلات ووجهات سياحية متنوعة بالتقسيط مع تابي وتمارا',
    descriptionEn: 'August offers - various tourist trips and destinations, installments with Tabby and Tamara',
    descriptionFr: "Offres du mois d'août - divers voyages et destinations touristiques, paiement en plusieurs fois avec Tabby et Tamara",
    offers: [

    ],
  }
];