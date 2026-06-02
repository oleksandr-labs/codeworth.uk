export interface GeoCity {
  slug: string;
  nameUk: string;
  nameEn: string;
  region: string;
  regionEn: string;
  population: string;
  populationEn: string;
  businesses: number;
  description: string;
  descriptionEn: string;
  seoTitle: string;
  seoTitleEn: string;
  seoDesc: string;
  seoDescEn: string;
  stats: { label: string; labelEn: string; value: string }[];
  faq: { q: string; qEn: string; a: string; aEn: string }[];
}

export const GEO_CITIES: GeoCity[] = [
  {
    slug: "kyiv",
    nameUk: "Київ",
    nameEn: "Kyiv",
    region: "Київська область",
    regionEn: "Kyiv Region",
    population: "2,9 млн",
    populationEn: "2.9M",
    businesses: 180000,
    description:
      "Київ — найбільший ринок України з понад 180 тисячами активних бізнесів. Конкуренція у столиці висока, тому сайт із сильним SEO та сучасним дизайном — необхідність, а не розкіш. Codeworth допоможе вашому бізнесу виділитися у Гугл серед тисяч конкурентів.",
    descriptionEn:
      "Kyiv is Ukraine's largest market with 180,000+ active businesses. Competition in the capital is fierce — a fast website with strong SEO is a necessity. Codeworth helps your Kyiv business stand out on Google.",
    seoTitle: "Розробка сайтів у Києві — Веб-студія Codeworth",
    seoTitleEn: "Website Development in Kyiv — Codeworth Web Studio",
    seoDesc:
      "Замовити сайт у Києві від 8 000 грн. Розробка корпоративних сайтів, інтернет-магазинів, лендінгів. SEO-оптимізація, Mobile First, результат за 10–30 днів. Codeworth — веб-студія у Києві.",
    seoDescEn:
      "Order a website in Kyiv from $200. Corporate sites, online stores, landing pages. SEO optimization, Mobile First, results in 10–30 days. Codeworth web studio in Kyiv.",
    stats: [
      { label: "Клієнтів з Києва", labelEn: "Clients from Kyiv", value: "40+" },
      { label: "Середній рейтинг", labelEn: "Avg. rating", value: "4.9 / 5" },
      { label: "Зростання трафіку", labelEn: "Traffic growth", value: "+120%" },
      { label: "Запуск проєкту", labelEn: "Project launch", value: "10–30 днів" },
    ],
    faq: [
      {
        q: "Чи є у вас офіс у Києві?",
        qEn: "Do you have an office in Kyiv?",
        a: "Ми базуємось у Києві та працюємо дистанційно. Зустрічі — онлайн у Zoom або Telegram. За потреби можемо організувати особисту зустріч.",
        aEn: "We are based in Kyiv and work remotely. Meetings are online via Zoom or Telegram. We can arrange in-person meetings if needed.",
      },
      {
        q: "Скільки коштує розробка сайту у Києві?",
        qEn: "How much does website development cost in Kyiv?",
        a: "Лендінг — від 8 000 грн, корпоративний сайт — від 15 000 грн, інтернет-магазин — від 40 000 грн. Всі ціни фіксуємо у договорі.",
        aEn: "Landing page — from $200, corporate site — from $375, online store — from $1,000. All prices are fixed in the contract.",
      },
      {
        q: "Як швидко ви розробляєте сайти для київських клієнтів?",
        qEn: "How quickly do you develop sites for Kyiv clients?",
        a: "Лендінг — 5–10 днів, корпоративний сайт — 2–4 тижні, інтернет-магазин — 4–8 тижнів. Терміни фіксуються у ТЗ та договорі.",
        aEn: "Landing page — 5–10 days, corporate site — 2–4 weeks, online store — 4–8 weeks. Deadlines are fixed in the contract.",
      },
      {
        q: "Чи займаєтесь SEO для київських сайтів?",
        qEn: "Do you do SEO for Kyiv websites?",
        a: "Так. Базове SEO включено у всі тарифи. Локальне SEO для Києва — Google My Business, геозапити, Schema.org з адресою — за окремим тарифом.",
        aEn: "Yes. Basic SEO is included in all packages. Local SEO for Kyiv — Google My Business, geo queries, Schema.org — available as a separate add-on.",
      },
    ],
  },
  {
    slug: "kharkiv",
    nameUk: "Харків",
    nameEn: "Kharkiv",
    region: "Харківська область",
    regionEn: "Kharkiv Region",
    population: "1,4 млн",
    populationEn: "1.4M",
    businesses: 75000,
    description:
      "Харків — друге за величиною місто України, потужний освітній та промисловий центр. Тут активно розвиваються IT-компанії, виробничі підприємства, ресторанний та ритейл бізнес. Codeworth допомагає харківським підприємцям будувати сильну онлайн-присутність.",
    descriptionEn:
      "Kharkiv is Ukraine's second-largest city and a major educational and industrial hub. IT companies, manufacturers, restaurants, and retail are thriving here. Codeworth helps Kharkiv entrepreneurs build a strong online presence.",
    seoTitle: "Розробка сайтів у Харкові — Веб-студія Codeworth",
    seoTitleEn: "Website Development in Kharkiv — Codeworth Web Studio",
    seoDesc:
      "Замовити сайт у Харкові від 8 000 грн. Корпоративні сайти, інтернет-магазини, лендінги. SEO-просування, Modern Next.js. Здаємо за 10–30 днів.",
    seoDescEn:
      "Order a website in Kharkiv from $200. Corporate sites, online stores, landing pages. SEO promotion, modern Next.js stack. Delivered in 10–30 days.",
    stats: [
      { label: "Клієнтів з Харкова", labelEn: "Clients from Kharkiv", value: "15+" },
      { label: "Середній рейтинг", labelEn: "Avg. rating", value: "4.9 / 5" },
      { label: "Зростання трафіку", labelEn: "Traffic growth", value: "+95%" },
      { label: "Запуск проєкту", labelEn: "Project launch", value: "10–30 днів" },
    ],
    faq: [
      {
        q: "Чи працюєте ви з клієнтами з Харкова дистанційно?",
        qEn: "Do you work with Kharkiv clients remotely?",
        a: "Так, повністю дистанційно — Telegram, Zoom, Notion. Більшість наших клієнтів з різних міст України, і ми налагодили ефективні процеси онлайн-роботи.",
        aEn: "Yes, fully remotely — Telegram, Zoom, Notion. Most of our clients are from different cities across Ukraine, and we have efficient online work processes.",
      },
      {
        q: "Яка ніша бізнесу в Харкові найбільш популярна серед ваших клієнтів?",
        qEn: "What business niche is most popular among your Kharkiv clients?",
        a: "IT-компанії, ресторани та кафе, юридичні послуги та освітні заклади. Але ми розробляємо для будь-якої ніші — у нас 33 готових нішевих рішення.",
        aEn: "IT companies, restaurants and cafes, legal services, and educational institutions. But we develop for any niche — we have 33 ready-made niche solutions.",
      },
      {
        q: "Скільки коштує SEO-просування в Харкові?",
        qEn: "How much does SEO promotion cost in Kharkiv?",
        a: "SEO-аудит — від 3 000 грн. Щомісячне просування — від 8 000 грн/міс з гарантованим ростом позицій. Локальне SEO для Харкова — від 4 000 грн/міс.",
        aEn: "SEO audit — from $75. Monthly promotion — from $200/month with guaranteed position growth. Local SEO for Kharkiv — from $100/month.",
      },
    ],
  },
  {
    slug: "lviv",
    nameUk: "Львів",
    nameEn: "Lviv",
    region: "Львівська область",
    regionEn: "Lviv Region",
    population: "730 тис.",
    populationEn: "730K",
    businesses: 52000,
    description:
      "Львів — культурна столиця України та один із найактивніших підприємницьких міст. Тут розквітають туристичний бізнес, ресторани, IT-компанії, готелі та ремісниче виробництво. Codeworth допомагає львівському бізнесу конкурувати в Google і виходити на міжнародну аудиторію.",
    descriptionEn:
      "Lviv is Ukraine's cultural capital and one of its most entrepreneurial cities. Tourism, restaurants, IT companies, hotels, and craftspeople thrive here. Codeworth helps Lviv businesses compete on Google and reach international audiences.",
    seoTitle: "Розробка сайтів у Львові — Веб-студія Codeworth",
    seoTitleEn: "Website Development in Lviv — Codeworth Web Studio",
    seoDesc:
      "Замовити сайт у Львові від 8 000 грн. Туристичні сайти, ресторани, IT, готелі. SEO-просування, двомовні сайти EN/UK. Codeworth — веб-студія повного циклу.",
    seoDescEn:
      "Order a website in Lviv from $200. Tourism sites, restaurants, IT, hotels. SEO promotion, bilingual EN/UK sites. Codeworth — full-cycle web studio.",
    stats: [
      { label: "Клієнтів зі Львова", labelEn: "Clients from Lviv", value: "20+" },
      { label: "Двомовних сайтів", labelEn: "Bilingual sites", value: "8" },
      { label: "Туристичних проєктів", labelEn: "Tourism projects", value: "6" },
      { label: "Запуск проєкту", labelEn: "Project launch", value: "10–30 днів" },
    ],
    faq: [
      {
        q: "Чи розробляєте ви двомовні сайти для туристичного бізнесу Львова?",
        qEn: "Do you build bilingual sites for Lviv's tourism businesses?",
        a: "Так, це одна з наших спеціалізацій. Розробляємо сайти з підтримкою EN/UK — з автоматичним перемиканням мови та hreflang розміткою для Google.",
        aEn: "Yes, this is one of our specializations. We build sites with EN/UK support — with automatic language switching and hreflang markup for Google.",
      },
      {
        q: "Чи можете ви розробити сайт для готелю або апартаментів у Львові?",
        qEn: "Can you build a site for a hotel or apartments in Lviv?",
        a: "Так, у нас є готові рішення для готельного бізнесу з системою бронювання, галереєю номерів та інтеграцією з Booking.com.",
        aEn: "Yes, we have ready-made solutions for the hotel business with a booking system, room gallery, and Booking.com integration.",
      },
    ],
  },
  {
    slug: "odesa",
    nameUk: "Одеса",
    nameEn: "Odesa",
    region: "Одеська область",
    regionEn: "Odesa Region",
    population: "1,0 млн",
    populationEn: "1.0M",
    businesses: 62000,
    description:
      "Одеса — морська столиця України з потужним портовим бізнесом, туристичним сектором та торгівлею. Конкуренція у готельному, ресторанному та логістичному сегментах дуже висока. Codeworth допоможе вашому одеському бізнесу виділитися в мережі.",
    descriptionEn:
      "Odesa is Ukraine's maritime capital with a powerful port industry, tourism, and trade. Competition in hospitality, restaurants, and logistics is fierce. Codeworth helps your Odesa business stand out online.",
    seoTitle: "Розробка сайтів в Одесі — Веб-студія Codeworth",
    seoTitleEn: "Website Development in Odesa — Codeworth Web Studio",
    seoDesc:
      "Замовити сайт в Одесі від 8 000 грн. Готелі, ресторани, торгівля, логістика. SEO-просування, Mobile First. Codeworth — сучасна веб-студія.",
    seoDescEn:
      "Order a website in Odesa from $200. Hotels, restaurants, trade, logistics. SEO promotion, Mobile First. Codeworth — modern web studio.",
    stats: [
      { label: "Клієнтів з Одеси", labelEn: "Clients from Odesa", value: "12+" },
      { label: "Готельних проєктів", labelEn: "Hotel projects", value: "4" },
      { label: "Зростання трафіку", labelEn: "Traffic growth", value: "+110%" },
      { label: "Запуск проєкту", labelEn: "Project launch", value: "10–30 днів" },
    ],
    faq: [
      {
        q: "Чи займаєтесь ви SEO для готельного бізнесу в Одесі?",
        qEn: "Do you do SEO for hotel businesses in Odesa?",
        a: "Так, у нас є досвід роботи з готельним бізнесом: локальне SEO, Schema.org Hotel, оптимізація під запити 'готель Одеса', 'апартаменти Одеса' тощо.",
        aEn: "Yes, we have experience with hotel businesses: local SEO, Schema.org Hotel, optimization for queries like 'hotel Odesa', 'apartments Odesa', etc.",
      },
      {
        q: "Чи інтегруєте ви системи онлайн-бронювання?",
        qEn: "Do you integrate online booking systems?",
        a: "Так. Інтегруємо Booking.com widget, Google Hotel Ads, Airbnb, а також розробляємо власні системи бронювання з CRM-функціональністю.",
        aEn: "Yes. We integrate Booking.com widget, Google Hotel Ads, Airbnb, and build custom booking systems with CRM functionality.",
      },
    ],
  },
  {
    slug: "dnipro",
    nameUk: "Дніпро",
    nameEn: "Dnipro",
    region: "Дніпропетровська область",
    regionEn: "Dnipropetrovsk Region",
    population: "970 тис.",
    populationEn: "970K",
    businesses: 65000,
    description:
      "Дніпро — індустріальне та бізнес-серце центральної України. Металургія, будівництво, ритейл та IT активно розвиваються. Місцеві компанії все активніше шукають клієнтів онлайн. Codeworth допомагає дніпровському бізнесу зайняти топові позиції в Google.",
    descriptionEn:
      "Dnipro is the industrial and business heart of central Ukraine. Metallurgy, construction, retail, and IT are thriving. Local companies are increasingly seeking clients online. Codeworth helps Dnipro businesses reach the top of Google.",
    seoTitle: "Розробка сайтів у Дніпрі — Веб-студія Codeworth",
    seoTitleEn: "Website Development in Dnipro — Codeworth Web Studio",
    seoDesc:
      "Замовити сайт у Дніпрі від 8 000 грн. Промисловість, будівництво, ритейл, IT. SEO-просування, корпоративні сайти та магазини. Codeworth веб-студія.",
    seoDescEn:
      "Order a website in Dnipro from $200. Industry, construction, retail, IT. SEO promotion, corporate sites and stores. Codeworth web studio.",
    stats: [
      { label: "Клієнтів з Дніпра", labelEn: "Clients from Dnipro", value: "10+" },
      { label: "B2B проєктів", labelEn: "B2B projects", value: "7" },
      { label: "Зростання трафіку", labelEn: "Traffic growth", value: "+88%" },
      { label: "Запуск проєкту", labelEn: "Project launch", value: "10–30 днів" },
    ],
    faq: [
      {
        q: "Чи розробляєте ви B2B сайти для промислових компаній з Дніпра?",
        qEn: "Do you build B2B sites for industrial companies from Dnipro?",
        a: "Так, це один з наших спеціалізованих напрямів. Корпоративні сайти з каталогом продукції, онлайн-замовленнями та B2B кабінетом.",
        aEn: "Yes, this is one of our specialized directions. Corporate sites with product catalogs, online ordering, and B2B customer portals.",
      },
      {
        q: "Скільки коштує корпоративний сайт у Дніпрі?",
        qEn: "How much does a corporate site cost in Dnipro?",
        a: "Корпоративний сайт з каталогом — від 20 000 грн, з CRM-інтеграцією та B2B-кабінетом — від 50 000 грн. Точний кошторис після консультації.",
        aEn: "Corporate site with catalog — from $500. With CRM integration and B2B portal — from $1,250. Exact quote after consultation.",
      },
    ],
  },
  {
    slug: "zaporizhzhia",
    nameUk: "Запоріжжя",
    nameEn: "Zaporizhzhia",
    region: "Запорізька область",
    regionEn: "Zaporizhzhia Region",
    population: "720 тис.",
    populationEn: "720K",
    businesses: 38000,
    description:
      "Запоріжжя — промисловий центр з активним малим та середнім бізнесом. Конкуренція в ритейлі, послугах та харчуванні зростає. Локальні підприємці звертаються до Codeworth для створення сучасних сайтів із SEO-просуванням.",
    descriptionEn:
      "Zaporizhzhia is an industrial center with an active SME sector. Competition in retail, services, and food is growing. Local entrepreneurs turn to Codeworth for modern websites with SEO promotion.",
    seoTitle: "Розробка сайтів у Запоріжжі — Веб-студія Codeworth",
    seoTitleEn: "Website Development in Zaporizhzhia — Codeworth Web Studio",
    seoDesc:
      "Замовити сайт у Запоріжжі від 8 000 грн. Послуги, ритейл, харчування, промисловість. SEO-просування, Mobile First, Next.js. Codeworth веб-студія.",
    seoDescEn:
      "Order a website in Zaporizhzhia from $200. Services, retail, food, industry. SEO promotion, Mobile First, Next.js. Codeworth web studio.",
    stats: [
      { label: "Клієнтів із Запоріжжя", labelEn: "Clients from Zaporizhzhia", value: "8+" },
      { label: "Середній рейтинг", labelEn: "Avg. rating", value: "4.8 / 5" },
      { label: "Зростання трафіку", labelEn: "Traffic growth", value: "+75%" },
      { label: "Запуск проєкту", labelEn: "Project launch", value: "10–30 днів" },
    ],
    faq: [
      {
        q: "Чи можу я замовити лендінг для свого бізнесу в Запоріжжі?",
        qEn: "Can I order a landing page for my business in Zaporizhzhia?",
        a: "Так, лендінг від 8 000 грн — готовий за 5–10 днів. Ідеально для запуску нового продукту або послуги.",
        aEn: "Yes, landing page from $200 — ready in 5–10 days. Ideal for launching a new product or service.",
      },
    ],
  },
  {
    slug: "vinnytsia",
    nameUk: "Вінниця",
    nameEn: "Vinnytsia",
    region: "Вінницька область",
    regionEn: "Vinnytsia Region",
    population: "370 тис.",
    populationEn: "370K",
    businesses: 28000,
    description:
      "Вінниця — регіональний центр із розвиненим аграрним, медичним та IT-бізнесом. Попит на якісні сайти стабільно зростає. Codeworth розробляє сучасні сайти для вінницьких підприємців із повним SEO-супроводом.",
    descriptionEn:
      "Vinnytsia is a regional center with developed agricultural, medical, and IT businesses. Demand for quality websites is steadily growing. Codeworth develops modern sites for Vinnytsia entrepreneurs with full SEO support.",
    seoTitle: "Розробка сайтів у Вінниці — Веб-студія Codeworth",
    seoTitleEn: "Website Development in Vinnytsia — Codeworth Web Studio",
    seoDesc:
      "Замовити сайт у Вінниці від 8 000 грн. Агро, медицина, IT, послуги. SEO-просування, корпоративні сайти, магазини. Codeworth веб-студія.",
    seoDescEn:
      "Order a website in Vinnytsia from $200. Agro, medical, IT, services. SEO promotion, corporate sites, stores. Codeworth web studio.",
    stats: [
      { label: "Клієнтів з Вінниці", labelEn: "Clients from Vinnytsia", value: "6+" },
      { label: "Середній рейтинг", labelEn: "Avg. rating", value: "5.0 / 5" },
      { label: "Зростання трафіку", labelEn: "Traffic growth", value: "+92%" },
      { label: "Запуск проєкту", labelEn: "Project launch", value: "10–30 днів" },
    ],
    faq: [
      {
        q: "Чи допомагаєте ви з Google My Business для Вінниці?",
        qEn: "Do you help with Google My Business for Vinnytsia?",
        a: "Так, налаштування та оптимізація Google My Business включена у пакет локального SEO від 3 000 грн.",
        aEn: "Yes, Google My Business setup and optimization is included in our local SEO package from $75.",
      },
    ],
  },
  {
    slug: "poltava",
    nameUk: "Полтава",
    nameEn: "Poltava",
    region: "Полтавська область",
    regionEn: "Poltava Region",
    population: "270 тис.",
    populationEn: "270K",
    businesses: 20000,
    description:
      "Полтава — культурний та аграрний центр з активним розвитком малого бізнесу. Ресторани, послуги, аграрний сектор та медицина потребують сильної онлайн-присутності. Codeworth допомагає полтавським компаніям виходити на нових клієнтів через сайт.",
    descriptionEn:
      "Poltava is a cultural and agricultural center with active SME development. Restaurants, services, agriculture, and medical businesses need a strong online presence. Codeworth helps Poltava companies reach new clients.",
    seoTitle: "Розробка сайтів у Полтаві — Веб-студія Codeworth",
    seoTitleEn: "Website Development in Poltava — Codeworth Web Studio",
    seoDesc:
      "Замовити сайт у Полтаві від 8 000 грн. Ресторани, медицина, агро, послуги. SEO та Mobile First. Codeworth веб-студія повного циклу.",
    seoDescEn:
      "Order a website in Poltava from $200. Restaurants, medical, agro, services. SEO and Mobile First. Codeworth full-cycle web studio.",
    stats: [
      { label: "Клієнтів з Полтави", labelEn: "Clients from Poltava", value: "5+" },
      { label: "Аграрних проєктів", labelEn: "Agro projects", value: "3" },
      { label: "Зростання трафіку", labelEn: "Traffic growth", value: "+80%" },
      { label: "Запуск проєкту", labelEn: "Project launch", value: "10–30 днів" },
    ],
    faq: [
      {
        q: "Чи розробляєте сайти для аграрних компаній з Полтави?",
        qEn: "Do you build sites for agricultural companies from Poltava?",
        a: "Так, маємо досвід із агро-нішею: сайти-каталоги для фермерської продукції, корпоративні сайти агропідприємств, інтернет-магазини органічних товарів.",
        aEn: "Yes, we have experience in agro: catalog sites for farm products, corporate sites for agro enterprises, online stores for organic goods.",
      },
    ],
  },
  {
    slug: "cherkasy",
    nameUk: "Черкаси",
    nameEn: "Cherkasy",
    region: "Черкаська область",
    regionEn: "Cherkasy Region",
    population: "260 тис.",
    populationEn: "260K",
    businesses: 17000,
    description:
      "Черкаси — затишне місто з активним малим бізнесом у сфері торгівлі, послуг та харчування. Codeworth розробляє сайти для черкаських підприємців із повним SEO-супроводом та швидким запуском.",
    descriptionEn:
      "Cherkasy is a cozy city with active SME in trade, services, and food. Codeworth builds sites for Cherkasy entrepreneurs with full SEO support and fast launch.",
    seoTitle: "Розробка сайтів у Черкасах — Веб-студія Codeworth",
    seoTitleEn: "Website Development in Cherkasy — Codeworth Web Studio",
    seoDesc:
      "Замовити сайт у Черкасах від 8 000 грн. Торгівля, послуги, ресторани. SEO та Modern Next.js. Codeworth — веб-студія з гарантією результату.",
    seoDescEn:
      "Order a website in Cherkasy from $200. Trade, services, restaurants. SEO and modern Next.js. Codeworth — web studio with guaranteed results.",
    stats: [
      { label: "Клієнтів з Черкас", labelEn: "Clients from Cherkasy", value: "4+" },
      { label: "Середній рейтинг", labelEn: "Avg. rating", value: "4.9 / 5" },
      { label: "Зростання трафіку", labelEn: "Traffic growth", value: "+85%" },
      { label: "Запуск проєкту", labelEn: "Project launch", value: "10–30 днів" },
    ],
    faq: [
      {
        q: "Чи підходять ваші рішення для малого бізнесу в Черкасах?",
        qEn: "Are your solutions suitable for small businesses in Cherkasy?",
        a: "Так, наші готові нішеві рішення від 4 900 грн ідеально підходять для старту. Запуск — 3 дні після отримання контенту.",
        aEn: "Yes, our ready-made niche solutions from $125 are ideal for starting out. Launch in 3 days after receiving your content.",
      },
    ],
  },
  {
    slug: "sumy",
    nameUk: "Суми",
    nameEn: "Sumy",
    region: "Сумська область",
    regionEn: "Sumy Region",
    population: "250 тис.",
    populationEn: "250K",
    businesses: 16000,
    description:
      "Суми — університетське місто з розвиненою промисловістю та малим бізнесом. Попит на онлайн-просування стабільно зростає. Codeworth допомагає сумським підприємствам будувати ефективну цифрову присутність.",
    descriptionEn:
      "Sumy is a university city with developed industry and small business. Demand for online promotion is steadily growing. Codeworth helps Sumy businesses build effective digital presence.",
    seoTitle: "Розробка сайтів у Сумах — Веб-студія Codeworth",
    seoTitleEn: "Website Development in Sumy — Codeworth Web Studio",
    seoDesc:
      "Замовити сайт у Сумах від 8 000 грн. Промисловість, послуги, освіта. SEO-просування, сучасний стек. Codeworth веб-студія.",
    seoDescEn:
      "Order a website in Sumy from $200. Industry, services, education. SEO promotion, modern stack. Codeworth web studio.",
    stats: [
      { label: "Клієнтів з Сум", labelEn: "Clients from Sumy", value: "4+" },
      { label: "Університетських проєктів", labelEn: "University projects", value: "2" },
      { label: "Зростання трафіку", labelEn: "Traffic growth", value: "+72%" },
      { label: "Запуск проєкту", labelEn: "Project launch", value: "10–30 днів" },
    ],
    faq: [
      {
        q: "Чи розробляєте ви сайти для освітніх установ у Сумах?",
        qEn: "Do you build sites for educational institutions in Sumy?",
        a: "Так, маємо готові рішення для шкіл, курсів, університетів із каталогом спеціальностей, новинами, формою вступу та системою онлайн-оплати.",
        aEn: "Yes, we have ready solutions for schools, courses, and universities with a specialties catalog, news, admission forms, and online payment systems.",
      },
    ],
  },
  {
    slug: "ternopil",
    nameUk: "Тернопіль",
    nameEn: "Ternopil",
    region: "Тернопільська область",
    regionEn: "Ternopil Region",
    population: "220 тис.",
    populationEn: "220K",
    businesses: 15000,
    description:
      "Тернопіль — активне місто з розвиненим бізнесом у торгівлі, медицині та послугах. Місцеві підприємці все частіше обирають Codeworth для розробки сайтів із сучасним дизайном та SEO.",
    descriptionEn:
      "Ternopil is an active city with developed trade, medical, and service businesses. Local entrepreneurs increasingly choose Codeworth for websites with modern design and SEO.",
    seoTitle: "Розробка сайтів у Тернополі — Веб-студія Codeworth",
    seoTitleEn: "Website Development in Ternopil — Codeworth Web Studio",
    seoDesc:
      "Замовити сайт у Тернополі від 8 000 грн. Торгівля, медицина, послуги. SEO, сучасний дизайн. Codeworth веб-студія.",
    seoDescEn:
      "Order a website in Ternopil from $200. Trade, medical, services. SEO, modern design. Codeworth web studio.",
    stats: [
      { label: "Клієнтів з Тернополя", labelEn: "Clients from Ternopil", value: "5+" },
      { label: "Середній рейтинг", labelEn: "Avg. rating", value: "5.0 / 5" },
      { label: "Зростання трафіку", labelEn: "Traffic growth", value: "+90%" },
      { label: "Запуск проєкту", labelEn: "Project launch", value: "10–30 днів" },
    ],
    faq: [
      {
        q: "Чи є приклади сайтів для медичних клінік у Тернополі?",
        qEn: "Do you have examples of sites for medical clinics in Ternopil?",
        a: "Так, перегляньте наше нішеве демо для медичної клініки. Включає онлайн-запис, розклад лікарів, відгуки та Schema.org MedicalOrganization.",
        aEn: "Yes, check out our niche demo for a medical clinic. Includes online booking, doctor schedules, reviews, and Schema.org MedicalOrganization.",
      },
    ],
  },
  {
    slug: "lutsk",
    nameUk: "Луцьк",
    nameEn: "Lutsk",
    region: "Волинська область",
    regionEn: "Volyn Region",
    population: "215 тис.",
    populationEn: "215K",
    businesses: 14000,
    description:
      "Луцьк — найбільше місто Волині з активним розвитком торгівлі, ресторанного та туристичного бізнесу. Codeworth розробляє сайти для луцьких підприємців із локальним SEO-просуванням.",
    descriptionEn:
      "Lutsk is the largest city in Volyn with active trade, restaurant, and tourism development. Codeworth builds sites for Lutsk entrepreneurs with local SEO promotion.",
    seoTitle: "Розробка сайтів у Луцьку — Веб-студія Codeworth",
    seoTitleEn: "Website Development in Lutsk — Codeworth Web Studio",
    seoDesc:
      "Замовити сайт у Луцьку від 8 000 грн. Торгівля, ресторани, туризм. SEO та Mobile First. Codeworth веб-студія.",
    seoDescEn:
      "Order a website in Lutsk from $200. Trade, restaurants, tourism. SEO and Mobile First. Codeworth web studio.",
    stats: [
      { label: "Клієнтів з Луцька", labelEn: "Clients from Lutsk", value: "4+" },
      { label: "Туристичних проєктів", labelEn: "Tourism projects", value: "2" },
      { label: "Зростання трафіку", labelEn: "Traffic growth", value: "+78%" },
      { label: "Запуск проєкту", labelEn: "Project launch", value: "10–30 днів" },
    ],
    faq: [
      {
        q: "Чи розробляєте сайти для туристичних атракцій у Луцьку?",
        qEn: "Do you build sites for tourist attractions in Lutsk?",
        a: "Так, маємо готові рішення для туристичного бізнесу: замки, музеї, тури, бронювання. Двомовні сайти EN/UK для іноземних туристів.",
        aEn: "Yes, we have ready solutions for tourism: castles, museums, tours, bookings. Bilingual EN/UK sites for foreign tourists.",
      },
    ],
  },
  {
    slug: "rivne",
    nameUk: "Рівне",
    nameEn: "Rivne",
    region: "Рівненська область",
    regionEn: "Rivne Region",
    population: "245 тис.",
    populationEn: "245K",
    businesses: 16000,
    description:
      "Рівне — обласний центр на заході України з розвиненою торгівлею, будівництвом та послугами. Codeworth допомагає рівненському бізнесу отримувати клієнтів через Google та Instagram.",
    descriptionEn:
      "Rivne is a regional center in western Ukraine with developed trade, construction, and services. Codeworth helps Rivne businesses get clients through Google and Instagram.",
    seoTitle: "Розробка сайтів у Рівному — Веб-студія Codeworth",
    seoTitleEn: "Website Development in Rivne — Codeworth Web Studio",
    seoDesc:
      "Замовити сайт у Рівному від 8 000 грн. Будівництво, торгівля, послуги. SEO-просування. Codeworth веб-студія.",
    seoDescEn:
      "Order a website in Rivne from $200. Construction, trade, services. SEO promotion. Codeworth web studio.",
    stats: [
      { label: "Клієнтів з Рівного", labelEn: "Clients from Rivne", value: "4+" },
      { label: "Будівельних проєктів", labelEn: "Construction projects", value: "3" },
      { label: "Зростання трафіку", labelEn: "Traffic growth", value: "+82%" },
      { label: "Запуск проєкту", labelEn: "Project launch", value: "10–30 днів" },
    ],
    faq: [
      {
        q: "Чи розробляєте сайти для будівельних компаній у Рівному?",
        qEn: "Do you build sites for construction companies in Rivne?",
        a: "Так, маємо готові рішення для будівельних компаній: портфоліо проєктів, калькулятор вартості, відгуки та онлайн-консультація.",
        aEn: "Yes, we have ready solutions for construction companies: project portfolio, cost calculator, reviews, and online consultation.",
      },
    ],
  },
  {
    slug: "khmelnytskyi",
    nameUk: "Хмельницький",
    nameEn: "Khmelnytskyi",
    region: "Хмельницька область",
    regionEn: "Khmelnytskyi Region",
    population: "270 тис.",
    populationEn: "270K",
    businesses: 19000,
    description:
      "Хмельницький — один з найактивніших підприємницьких міст України. Тут швидко розвиваються ресторани, салони краси, магазини та IT-компанії. Codeworth розробляє сайти та допомагає з SEO-просуванням для хмельницького бізнесу.",
    descriptionEn:
      "Khmelnytskyi is one of Ukraine's most active entrepreneurial cities. Restaurants, beauty salons, stores, and IT companies are growing fast. Codeworth builds sites and helps with SEO for Khmelnytskyi businesses.",
    seoTitle: "Розробка сайтів у Хмельницькому — Веб-студія Codeworth",
    seoTitleEn: "Website Development in Khmelnytskyi — Codeworth Web Studio",
    seoDesc:
      "Замовити сайт у Хмельницькому від 8 000 грн. Ресторани, салони, магазини, IT. SEO-просування, Modern Next.js. Codeworth веб-студія.",
    seoDescEn:
      "Order a website in Khmelnytskyi from $200. Restaurants, salons, stores, IT. SEO promotion, modern Next.js. Codeworth web studio.",
    stats: [
      { label: "Клієнтів з Хмельницького", labelEn: "Clients from Khmelnytskyi", value: "5+" },
      { label: "Середній рейтинг", labelEn: "Avg. rating", value: "4.9 / 5" },
      { label: "Зростання трафіку", labelEn: "Traffic growth", value: "+95%" },
      { label: "Запуск проєкту", labelEn: "Project launch", value: "10–30 днів" },
    ],
    faq: [
      {
        q: "Яка вартість сайту для салону краси у Хмельницькому?",
        qEn: "What is the cost of a website for a beauty salon in Khmelnytskyi?",
        a: "Готове нішеве рішення для салону краси — від 4 900 грн. Запуск за 3 дні. Або розробка під замовлення від 15 000 грн з унікальним дизайном.",
        aEn: "Ready-made niche solution for a beauty salon — from $125. Launch in 3 days. Or custom development from $375 with a unique design.",
      },
    ],
  },
  {
    slug: "kropyvnytskyi",
    nameUk: "Кропивницький",
    nameEn: "Kropyvnytskyi",
    region: "Кіровоградська область",
    regionEn: "Kirovohrad Region",
    population: "220 тис.",
    populationEn: "220K",
    businesses: 13000,
    description:
      "Кропивницький — центр Кіровоградської області з активним торгово-промисловим та сервісним бізнесом. Codeworth допомагає місцевим підприємствам виходити в онлайн та залучати нових клієнтів через Google.",
    descriptionEn:
      "Kropyvnytskyi is the center of Kirovohrad region with active trade, industry, and service businesses. Codeworth helps local businesses go online and attract new clients through Google.",
    seoTitle: "Розробка сайтів у Кропивницькому — Веб-студія Codeworth",
    seoTitleEn: "Website Development in Kropyvnytskyi — Codeworth Web Studio",
    seoDesc:
      "Замовити сайт у Кропивницькому від 8 000 грн. Торгівля, промисловість, послуги. SEO-просування. Codeworth веб-студія.",
    seoDescEn:
      "Order a website in Kropyvnytskyi from $200. Trade, industry, services. SEO promotion. Codeworth web studio.",
    stats: [
      { label: "Клієнтів з Кропивницького", labelEn: "Clients from Kropyvnytskyi", value: "3+" },
      { label: "Середній рейтинг", labelEn: "Avg. rating", value: "5.0 / 5" },
      { label: "Зростання трафіку", labelEn: "Traffic growth", value: "+70%" },
      { label: "Запуск проєкту", labelEn: "Project launch", value: "10–30 днів" },
    ],
    faq: [
      {
        q: "Чи підходять ваші послуги для малого бізнесу у Кропивницькому?",
        qEn: "Are your services suitable for small businesses in Kropyvnytskyi?",
        a: "Так, спеціально для малого бізнесу — готові нішеві рішення від 4 900 грн. Запускаємо за 3 дні з повним налаштуванням.",
        aEn: "Yes, specifically for small business — ready-made niche solutions from $125. Launch in 3 days with full setup.",
      },
    ],
  },
];

export function getCity(slug: string): GeoCity | undefined {
  return GEO_CITIES.find((c) => c.slug === slug);
}

export const GEO_CITY_SLUGS = GEO_CITIES.map((c) => c.slug);
