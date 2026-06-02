export type UseCaseCategory =
  | "conversion"
  | "automation"
  | "seo"
  | "ecommerce"
  | "ai"
  | "trust";

export interface UseCase {
  slug: string;
  titleEn: string;
  titleUk: string;
  category: UseCaseCategory;
  icon: string;
  whoEn: string;
  whoUk: string;
  problemEn: string;
  problemUk: string;
  solutionEn: string;
  solutionUk: string;
  resultQuoteEn: string;
  resultQuoteUk: string;
  metaTitleEn: string;
  metaTitleUk: string;
  metaDescriptionEn: string;
  metaDescriptionUk: string;
  relatedPortfolio: string[];
  relatedServices: string[];
  relatedExtras: string[];
}

export const USE_CASES: UseCase[] = [
  {
    slug: "increase-online-bookings",
    titleEn: "How to get more online bookings",
    titleUk: "Як збільшити кількість онлайн-записів",
    category: "conversion",
    icon: "📅",
    whoEn: "Beauty salons, medical clinics, car services, fitness studios",
    whoUk: "Салони краси, медичні клініки, автосервіси, фітнес-студії",
    problemEn:
      "Clients call or message on Instagram — there's no online booking. The phone rings constantly, staff waste time managing the diary, and evening bookings are missed entirely.",
    problemUk:
      "Клієнти дзвонять або пишуть в Instagram — онлайн-запису немає. Телефон дзвонить постійно, адміністратор витрачає час на ведення журналу, а вечірні записи повністю пропускаються.",
    solutionEn:
      "We integrate the `feat-booking` online booking module with real-time slot availability, automatic Telegram and email notifications to both client and staff, and a mobile-first booking flow that takes under 60 seconds to complete.",
    solutionUk:
      "Ми інтегруємо модуль онлайн-запису `feat-booking` з відображенням вільних слотів у реальному часі, автоматичними Telegram та email-сповіщеннями для клієнта і персоналу, і мобільним флоу запису менш ніж за 60 секунд.",
    resultQuoteEn:
      "Our clients typically receive 60–120 online bookings per month without phone calls, with no-show rates dropping by up to 34% due to automated reminders.",
    resultQuoteUk:
      "Наші клієнти зазвичай отримують 60–120 онлайн-записів на місяць без дзвінків, а показник неявок знижується до 34% завдяки автоматичним нагадуванням.",
    metaTitleEn: "How to Get More Online Bookings | Codeworth",
    metaTitleUk: "Як збільшити онлайн-записи | Codeworth",
    metaDescriptionEn:
      "Salon, clinic or gym? Add online booking in 3 weeks. 60–120 bookings/month without phone calls. Codeworth feat-booking module.",
    metaDescriptionUk:
      "Салон, клініка або спортзал? Онлайн-запис за 3 тижні. 60–120 записів/міс без дзвінків. Модуль feat-booking від Codeworth.",
    relatedPortfolio: ["beauty-salon", "auto-service", "medical-clinic"],
    relatedServices: ["web-apps"],
    relatedExtras: ["feat-booking", "int-telegram-bot"],
  },
  {
    slug: "reduce-abandoned-orders",
    titleEn: "How to reduce abandoned shopping carts",
    titleUk: "Як зменшити кількість кинутих кошиків",
    category: "ecommerce",
    icon: "🛒",
    whoEn: "Online stores, e-commerce businesses",
    whoUk: "Інтернет-магазини, e-commerce бізнеси",
    problemEn:
      "70% of shopping carts are abandoned before payment. Customers add products but leave without buying — often just needing a small nudge to complete the purchase.",
    problemUk:
      "70% кошиків кидають до оплати. Клієнти додають товари, але йдуть без покупки — часто достатньо невеликого поштовху для завершення замовлення.",
    solutionEn:
      "We implement an abandoned cart recovery system: automated email sequence (1h, 24h, 72h), exit-intent popup with a small discount, and social proof strip showing recent purchases — without any third-party subscription fees.",
    solutionUk:
      "Ми впроваджуємо систему відновлення кинутих кошиків: автоматична email-серія (1 год, 24 год, 72 год), exit-intent попап зі знижкою та стрічка соціального доказу з нещодавніми покупками — без абонплати сторонніх сервісів.",
    resultQuoteEn:
      "Clients see 12–18% of abandoned carts recovered within the first month of deployment, with the email sequence alone generating ROI within 2–3 weeks.",
    resultQuoteUk:
      "Клієнти бачать відновлення 12–18% кинутих кошиків протягом першого місяця після запуску, а email-серія самостійно окупається за 2–3 тижні.",
    metaTitleEn: "Reduce Abandoned Carts | E-commerce Recovery | Codeworth",
    metaTitleUk: "Зменшити кинуті кошики | Відновлення e-commerce | Codeworth",
    metaDescriptionEn:
      "Recover 12–18% of abandoned carts with automated email sequences and exit-intent popups. No SaaS fees. Codeworth.",
    metaDescriptionUk:
      "Відновіть 12–18% кинутих кошиків за допомогою email-серій та exit-intent попапів. Без абонплати. Codeworth.",
    relatedPortfolio: ["fashion-store", "flower-shop"],
    relatedServices: ["web-apps"],
    relatedExtras: ["feat-fomo", "int-mailchimp"],
  },
  {
    slug: "increase-landing-conversion",
    titleEn: "How to increase landing page conversion",
    titleUk: "Як підвищити конверсію лендінгу",
    category: "conversion",
    icon: "📈",
    whoEn: "Startups, schools, service businesses, B2B",
    whoUk: "Стартапи, школи, сервісні бізнеси, B2B",
    problemEn:
      "Traffic exists but leads are scarce. Visitors arrive but don't convert — the page doesn't communicate value clearly, lacks urgency, and has no qualification mechanism.",
    problemUk:
      "Трафік є, але заявок мало. Відвідувачі приходять, але не конвертуються — сторінка нечітко передає цінність, не створює терміновості та не має механізму кваліфікації.",
    solutionEn:
      "We apply a conversion optimisation stack: A/B-tested headlines, Lead Quiz to qualify intent before the form, FOMO social proof widget, and Exit Intent Popup. Each element is measurable via conversion events.",
    solutionUk:
      "Ми застосовуємо стек оптимізації конверсії: A/B-тестовані заголовки, Lead Quiz для кваліфікації перед формою, FOMO-віджет соціального доказу та Exit Intent Popup. Кожен елемент вимірюється через conversion events.",
    resultQuoteEn:
      "Typical conversion lift is 40–80% on the primary CTA after implementing the full stack — measured over 4-week A/B test windows with statistical significance above 95%.",
    resultQuoteUk:
      "Типовий приріст конверсії — 40–80% на основний CTA після впровадження повного стеку, виміряний за 4-тижневими A/B-вікнами з довірчим рівнем понад 95%.",
    metaTitleEn: "Increase Landing Page Conversion | Codeworth",
    metaTitleUk: "Підвищити конверсію лендінгу | Codeworth",
    metaDescriptionEn:
      "A/B testing, Lead Quiz, FOMO widget, Exit Intent Popup. Conversion lift 40–80%. Codeworth.",
    metaDescriptionUk:
      "A/B-тестування, Lead Quiz, FOMO, Exit Intent. Приріст конверсії 40–80%. Codeworth.",
    relatedPortfolio: ["math-school-online", "dental-clinic-landing"],
    relatedServices: ["web-apps", "marketing"],
    relatedExtras: ["feat-fomo", "feat-lead-quiz"],
  },
  {
    slug: "automate-support",
    titleEn: "How to automate customer support 24/7",
    titleUk: "Як автоматизувати підтримку клієнтів 24/7",
    category: "automation",
    icon: "🤖",
    whoEn: "SaaS companies, e-commerce, clinics",
    whoUk: "SaaS-компанії, e-commerce, клініки",
    problemEn:
      "Support team answers the same 20 questions every day. Nights and weekends are unattended. First-response time is over 4 hours and customer satisfaction is falling.",
    problemUk:
      "Служба підтримки щодня відповідає на одні й ті самі 20 питань. Ночі та вихідні без відповіді. Час першої відповіді перевищує 4 години, задоволеність клієнтів падає.",
    solutionEn:
      "We build a RAG-powered chatbot trained on your FAQs, documentation, and product knowledge base using GPT-4o. It handles 68% of incoming queries automatically, escalates complex cases to humans, and responds in under 2 seconds, 24/7.",
    solutionUk:
      "Ми розробляємо RAG-чатбот, навчений на ваших FAQ, документації та базі знань продукту, на основі GPT-4o. Він обробляє 68% вхідних запитів автоматично, ескалує складні кейси до операторів і відповідає менш ніж за 2 секунди, 24/7.",
    resultQuoteEn:
      "After deploying our RAG chatbot, clients see 68% of queries resolved automatically, support team workload reduced by half, and customer satisfaction scores improve by 12–18 NPS points.",
    resultQuoteUk:
      "Після запуску RAG-чатбота клієнти бачать автоматичне вирішення 68% запитів, навантаження на підтримку знижується вдвічі, а NPS покращується на 12–18 пунктів.",
    metaTitleEn: "Automate Customer Support 24/7 | AI Chatbot | Codeworth",
    metaTitleUk: "Автоматизувати підтримку 24/7 | AI чат-бот | Codeworth",
    metaDescriptionEn:
      "GPT-4o RAG chatbot for 24/7 support. 68% queries resolved automatically. From £1,800. Codeworth.",
    metaDescriptionUk:
      "RAG чат-бот GPT-4o для підтримки 24/7. 68% запитів вирішується автоматично. Від 75 000 ₴. Codeworth.",
    relatedPortfolio: ["ai-chatbot-saas"],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: ["ai-chatbot-rag", "feat-floating-chat"],
  },
  {
    slug: "automate-order-notifications",
    titleEn: "How to automate order and booking notifications",
    titleUk: "Як автоматизувати сповіщення про замовлення та записи",
    category: "automation",
    icon: "🔔",
    whoEn: "Shops, restaurants, service businesses",
    whoUk: "Магазини, ресторани, сервісні бізнеси",
    problemEn:
      "Staff manually notify customers about order status, booking confirmations, and reminders. It takes 15–30 minutes per day and mistakes happen regularly — wrong times, forgotten reminders.",
    problemUk:
      "Персонал вручну повідомляє клієнтів про статус замовлень, підтвердження записів та нагадування. Це займає 15–30 хвилин на день, а помилки трапляються регулярно — неправильний час, забуті нагадування.",
    solutionEn:
      "We build automated notification flows: Telegram bot for instant order updates, email sequences for booking confirmation + reminder + feedback request, with all templates customizable in your admin panel.",
    solutionUk:
      "Ми розробляємо автоматизовані флоу сповіщень: Telegram-бот для миттєвих оновлень замовлень, email-серії для підтвердження запису + нагадування + запиту відгуку, з усіма шаблонами, налаштованими в адмін-панелі.",
    resultQuoteEn:
      "Zero manual notification effort for standard order flows. No-show rates drop by 25–40% with automated appointment reminders. Staff save 2–3 hours per week.",
    resultQuoteUk:
      "Нульові ручні витрати на стандартні флоу сповіщень. Неявки знижуються на 25–40% з автоматичними нагадуваннями. Персонал економить 2–3 години на тиждень.",
    metaTitleEn: "Automate Order Notifications | Telegram + Email | Codeworth",
    metaTitleUk: "Автоматизувати сповіщення про замовлення | Codeworth",
    metaDescriptionEn:
      "Telegram bot + email sequences for order and booking notifications. Zero manual effort. Codeworth.",
    metaDescriptionUk:
      "Telegram-бот + email-серії для сповіщень про замовлення та записи. Нуль ручних зусиль. Codeworth.",
    relatedPortfolio: ["restaurant-booking", "beauty-salon"],
    relatedServices: ["web-apps"],
    relatedExtras: ["int-telegram-bot", "int-mailchimp"],
  },
  {
    slug: "automate-content-generation",
    titleEn: "How to generate product descriptions with AI",
    titleUk: "Як генерувати описи товарів за допомогою AI",
    category: "ai",
    icon: "✍️",
    whoEn: "E-commerce with large catalogues",
    whoUk: "E-commerce з великим каталогом товарів",
    problemEn:
      "Catalogue has 500–5,000 products with duplicate or missing descriptions. Writing unique SEO copy manually would take months. The product pages are weak and don't rank.",
    problemUk:
      "Каталог містить 500–5 000 товарів з дублікатами або відсутніми описами. Написання унікального SEO-тексту вручну зайняло б місяці. Сторінки товарів слабкі і не ранжуються.",
    solutionEn:
      "We deploy the AI product descriptions extra powered by GPT-4o: bulk generation from product title + category + attributes, SEO-optimised with primary keyword in H1 and first paragraph, tone-of-voice consistent with your brand, exportable to any catalogue format.",
    solutionUk:
      "Ми розгортаємо AI-генератор описів товарів на GPT-4o: масова генерація з назви товару + категорії + атрибутів, SEO-оптимізація з ключовим словом у H1 та першому абзаці, тон відповідає вашому бренду, експорт у будь-який формат каталогу.",
    resultQuoteEn:
      "100–1,000 SEO-optimised product descriptions generated in a single run. Clients see organic product page traffic increase 40–120% within 3 months after deployment.",
    resultQuoteUk:
      "100–1 000 SEO-оптимізованих описів товарів за один запуск. Клієнти бачать зростання органічного трафіку на товарних сторінках на 40–120% протягом 3 місяців після запуску.",
    metaTitleEn: "AI Product Descriptions Generator | Codeworth",
    metaTitleUk: "AI-генератор описів товарів | Codeworth",
    metaDescriptionEn:
      "Generate 1,000 SEO product descriptions in one run with GPT-4o. Organic traffic +40–120%. Codeworth.",
    metaDescriptionUk:
      "1 000 SEO-описів товарів за один запуск з GPT-4o. Органічний трафік +40–120%. Codeworth.",
    relatedPortfolio: ["fashion-store", "ai-visual-search-ecommerce"],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: ["ai-product-descriptions"],
  },
  {
    slug: "rank-local-seo",
    titleEn: "How to rank in Google for local searches",
    titleUk: "Як вийти в топ Google по місту",
    category: "seo",
    icon: "📍",
    whoEn: "Clinics, restaurants, salons, services with physical locations",
    whoUk: "Клініки, ресторани, салони, сервіси з фізичним розташуванням",
    problemEn:
      "The business doesn't appear in Google Maps results for the most valuable searches (\"dentist Kyiv\", \"hairdresser near me\"). Competitors dominate the local 3-pack and get most of the walk-in traffic.",
    problemUk:
      "Бізнес не з'являється в результатах Google Maps для найцінніших запитів («стоматолог Київ», «перукарня поруч»). Конкуренти домінують у локальному 3-pack і отримують більшість трафіку з вулиці.",
    solutionEn:
      "We implement a local SEO package: LocalBusiness + GeoCoordinates Schema.org, dedicated geo-landing pages for each city/district, Google Business Profile optimisation brief, and NAP consistency audit across all directories.",
    solutionUk:
      "Ми впроваджуємо пакет локального SEO: Schema.org LocalBusiness + GeoCoordinates, геолендінгові сторінки для кожного міста/району, бриф для оптимізації Google Business Profile та аудит узгодженості NAP у всіх каталогах.",
    resultQuoteEn:
      "Clients typically see first-page rankings for local queries within 6–10 weeks, with Google Maps impressions increasing 3–5× and phone call volume up 40–80%.",
    resultQuoteUk:
      "Клієнти зазвичай потрапляють на першу сторінку за локальними запитами за 6–10 тижнів, покази в Google Maps зростають у 3–5 разів, а кількість дзвінків зростає на 40–80%.",
    metaTitleEn: "Rank in Local Google Search | Local SEO | Codeworth",
    metaTitleUk: "Вийти в топ Google по місту | Локальний SEO | Codeworth",
    metaDescriptionEn:
      "Local SEO: geo-pages, LocalBusiness schema, GMB optimisation. 1st page in 6–10 weeks. Codeworth.",
    metaDescriptionUk:
      "Локальне SEO: геосторінки, Schema LocalBusiness, оптимізація GMB. Перша сторінка за 6–10 тижнів. Codeworth.",
    relatedPortfolio: ["dental-clinic-landing", "beauty-salon"],
    relatedServices: ["seo"],
    relatedExtras: ["analytics-seo-audit"],
  },
  {
    slug: "get-rich-snippets",
    titleEn: "How to get star ratings and rich results in Google",
    titleUk: "Як отримати зірки та розширені результати в Google",
    category: "seo",
    icon: "⭐",
    whoEn: "All businesses with reviews, FAQs, or products",
    whoUk: "Усі бізнеси з відгуками, FAQ або товарами",
    problemEn:
      "Search results show only blue links — no stars, no FAQ accordion, no price snippet. Competitors with rich results get 2–3× more clicks at the same position.",
    problemUk:
      "Результати пошуку показують лише сині посилання — жодних зірок, FAQ-акордеону, сніпету ціни. Конкуренти з розширеними результатами отримують у 2–3 рази більше кліків на тій самій позиції.",
    solutionEn:
      "We implement the full Schema.org stack: FAQPage on every service/product page, AggregateRating from verified review collection, Article with author markup, BreadcrumbList, and Product with price ranges — all validated against Google's Rich Results Test.",
    solutionUk:
      "Ми впроваджуємо повний стек Schema.org: FAQPage на кожній сторінці послуги/товару, AggregateRating із верифікованих відгуків, Article з авторською розміткою, BreadcrumbList та Product з діапазонами цін — все перевірено через Google Rich Results Test.",
    resultQuoteEn:
      "Clients see star ratings appear in search results within 2–4 weeks of implementation. Average CTR increases 35–60% as rich snippets displace competitor plain links visually.",
    resultQuoteUk:
      "Клієнти бачать зірки в результатах пошуку через 2–4 тижні після впровадження. Середній CTR зростає на 35–60% оскільки розширені сніпети візуально витісняють звичайні посилання конкурентів.",
    metaTitleEn: "Get Google Rich Snippets & Star Ratings | Schema.org | Codeworth",
    metaTitleUk: "Отримати зірки та розширені результати Google | Codeworth",
    metaDescriptionEn:
      "Schema.org FAQPage + AggregateRating + Product. Star ratings in 2–4 weeks. CTR +35–60%. Codeworth.",
    metaDescriptionUk:
      "Schema.org FAQPage + AggregateRating + Product. Зірки за 2–4 тижні. CTR +35–60%. Codeworth.",
    relatedPortfolio: [],
    relatedServices: ["seo"],
    relatedExtras: ["analytics-seo-audit"],
  },
  {
    slug: "launch-online-store",
    titleEn: "How to launch an online store in 14 days",
    titleUk: "Як запустити інтернет-магазин за 14 днів",
    category: "ecommerce",
    icon: "🚀",
    whoEn: "Retail, fashion, handmade, food producers",
    whoUk: "Ритейл, fashion, хенд-мейд, виробники їжі",
    problemEn:
      "Business is selling on Instagram, Prom, or Rozetka and paying 15% commission on every order. There's no independent storefront, no email list, no repeat purchase mechanic.",
    problemUk:
      "Бізнес продає в Instagram, Prom або Rozetka і платить 15% комісії з кожного замовлення. Немає незалежного магазину, списку email, механіки повторних покупок.",
    solutionEn:
      "We deploy the ecom-mini-shop extra or a full custom e-commerce build depending on catalogue size. Includes product listing, cart, checkout with LiqPay/Monobank, order management, and discount code system — live in 14 days.",
    solutionUk:
      "Ми розгортаємо extra ecom-mini-shop або повноцінний e-commerce залежно від розміру каталогу. Включає лістинг товарів, кошик, чекаут з LiqPay/Monobank, управління замовленнями та систему промокодів — запуск за 14 днів.",
    resultQuoteEn:
      "Clients save 15% marketplace commission from day one. The average independent store pays for itself within 2–4 months from commission savings alone.",
    resultQuoteUk:
      "Клієнти економлять 15% комісії маркетплейсу з першого дня. Середній незалежний магазин окупається за 2–4 місяці лише завдяки заощадженій комісії.",
    metaTitleEn: "Launch an Online Store in 14 Days | Codeworth",
    metaTitleUk: "Запустити інтернет-магазин за 14 днів | Codeworth",
    metaDescriptionEn:
      "E-commerce mini-store in 14 days. Save 15% marketplace commission. LiqPay + Monobank. From £800. Codeworth.",
    metaDescriptionUk:
      "E-commerce магазин за 14 днів. Збережіть 15% комісії маркетплейсу. LiqPay + Monobank. Від 35 000 ₴. Codeworth.",
    relatedPortfolio: ["flower-shop", "fashion-store"],
    relatedServices: ["web-apps"],
    relatedExtras: ["ecom-mini-shop", "int-liqpay"],
  },
  {
    slug: "increase-average-order",
    titleEn: "How to increase average order value by 20–40%",
    titleUk: "Як збільшити середній чек на 20–40%",
    category: "ecommerce",
    icon: "💰",
    whoEn: "Shops, bakeries, gift businesses, service providers",
    whoUk: "Магазини, кондитерські, подарунковий бізнес, сервіси",
    problemEn:
      "Customers buy the minimum — one item, base package, no upsells. Revenue per transaction is flat despite healthy traffic. Product pages have no cross-sell logic.",
    problemUk:
      "Клієнти купують мінімум — один товар, базовий пакет, без апсейлів. Виручка за транзакцію стагнує попри здоровий трафік. На сторінках товарів немає логіки перехресних продажів.",
    solutionEn:
      "We implement a Bundle Builder (curated sets at bundle discount), smart product recommendations (\"customers also bought\"), and a loyalty points module to incentivise higher spend per visit.",
    solutionUk:
      "Ми впроваджуємо Bundle Builder (куровані набори зі знижкою за набір), розумні рекомендації товарів («клієнти також купили») та модуль програми лояльності для стимулювання вищих витрат за відвідування.",
    resultQuoteEn:
      "Bundle Builder alone increases AOV by 20–30% within the first month. Adding the loyalty module extends this to 35–45% over 3 months as repeat purchase frequency increases.",
    resultQuoteUk:
      "Bundle Builder сам по собі збільшує AOV на 20–30% протягом першого місяця. Додавання модуля лояльності поширює цей ефект до 35–45% за 3 місяці зі зростанням частоти повторних покупок.",
    metaTitleEn: "Increase Average Order Value 20–40% | Bundle Builder | Codeworth",
    metaTitleUk: "Збільшити середній чек на 20–40% | Codeworth",
    metaDescriptionEn:
      "Bundle Builder + loyalty module. AOV +20–40%. No third-party subscription. Codeworth.",
    metaDescriptionUk:
      "Bundle Builder + програма лояльності. AOV +20–40%. Без абонплати. Codeworth.",
    relatedPortfolio: ["fashion-store", "flower-shop"],
    relatedServices: ["web-apps"],
    relatedExtras: ["ecom-bundle-builder", "ecom-loyalty"],
  },
  {
    slug: "sell-without-marketplace",
    titleEn: "How to sell without Rozetka or Prom.ua",
    titleUk: "Як продавати без Rozetka та Prom.ua",
    category: "ecommerce",
    icon: "🏪",
    whoEn: "Sellers on Rozetka, Prom, OLX, Instagram",
    whoUk: "Продавці на Rozetka, Prom, OLX, Instagram",
    problemEn:
      "Every order donates 12–18% to the marketplace. There's no direct customer relationship — no email list, no repeat purchase data, no ability to run your own promotions.",
    problemUk:
      "Кожне замовлення відраховує 12–18% маркетплейсу. Немає прямих відносин з клієнтом — немає списку email, даних про повторні покупки, неможливо запустити власні акції.",
    solutionEn:
      "We build your own e-commerce store and help you transition customers from marketplace to direct. Includes SEO-optimised product pages, email capture, and a first-purchase direct incentive (e.g. 5% discount for newsletter sign-up).",
    solutionUk:
      "Ми будуємо ваш власний e-commerce магазин і допомагаємо переводити клієнтів з маркетплейсу на прямі продажі. Включає SEO-оптимізовані сторінки товарів, збір email та стимул першої прямої покупки (наприклад, 5% знижки за підписку на розсилку).",
    resultQuoteEn:
      "Clients save an average of £3,500–£18,000 per year in marketplace commissions after transitioning. One fashion client saved 45,000 UAH/month within 6 months of launch.",
    resultQuoteUk:
      "Клієнти заощаджують в середньому 145 000–740 000 ₴ на рік на комісіях маркетплейсу після переходу. Один fashion-клієнт заощаджував 45 000 ₴/міс через 6 місяців після запуску.",
    metaTitleEn: "Sell Without Rozetka or Prom | Your Own Online Store | Codeworth",
    metaTitleUk: "Продавати без Rozetka і Prom | Власний магазин | Codeworth",
    metaDescriptionEn:
      "Build your own store, stop paying 15% commission. One fashion client saved 45K UAH/month. Codeworth.",
    metaDescriptionUk:
      "Власний магазин замість Rozetka. Fashion-клієнт заощаджував 45 000 ₴/міс. Без комісій. Codeworth.",
    relatedPortfolio: ["fashion-store"],
    relatedServices: ["web-apps"],
    relatedExtras: ["ecom-mini-shop"],
  },
  {
    slug: "implement-ai-support",
    titleEn: "How to add AI support without a large investment",
    titleUk: "Як впровадити AI-підтримку без великих інвестицій",
    category: "ai",
    icon: "💬",
    whoEn: "SaaS, e-commerce, B2B services",
    whoUk: "SaaS, e-commerce, B2B-сервіси",
    problemEn:
      "AI sounds expensive and complex. The team doesn't know where to start — whether it needs a custom model, how much data is required, or what the realistic ROI looks like.",
    problemUk:
      "AI звучить дорого і складно. Команда не знає з чого почати — чи потрібна кастомна модель, скільки даних потрібно, який реальний ROI.",
    solutionEn:
      "We start with the smallest viable AI: a RAG chatbot using your existing FAQ or docs as the knowledge base. No custom model training, no large dataset. From £1,800 / 75,000 UAH. Live in 3 weeks.",
    solutionUk:
      "Ми починаємо з найменшого можливого AI: RAG-чатбот на вашому існуючому FAQ або документації як базі знань. Без навчання кастомної моделі, без великого датасету. Від 75 000 ₴. Запуск за 3 тижні.",
    resultQuoteEn:
      "68% of support queries resolved automatically. Support team workload halved. Average payback period: 6–8 weeks from reduced support staff hours.",
    resultQuoteUk:
      "68% запитів підтримки вирішуються автоматично. Навантаження на команду підтримки зменшується вдвічі. Середній термін окупності: 6–8 тижнів за рахунок скорочення годин роботи підтримки.",
    metaTitleEn: "Add AI Customer Support From £1,800 | RAG Chatbot | Codeworth",
    metaTitleUk: "AI-підтримка від 75 000 ₴ | RAG чат-бот | Codeworth",
    metaDescriptionEn:
      "RAG chatbot on your existing docs. 68% queries automated. From £1,800 / 3 weeks. Codeworth.",
    metaDescriptionUk:
      "RAG чат-бот на вашій документації. 68% запитів автоматизовано. Від 75 000 ₴ / 3 тижні. Codeworth.",
    relatedPortfolio: ["ai-chatbot-saas"],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: ["ai-chatbot-rag"],
  },
  {
    slug: "monitor-brand-reputation",
    titleEn: "How to monitor brand reviews in real time",
    titleUk: "Як відстежувати відгуки про бренд у реальному часі",
    category: "ai",
    icon: "👁️",
    whoEn: "E-commerce, restaurants, clinics, franchises",
    whoUk: "E-commerce, ресторани, клініки, франшизи",
    problemEn:
      "Negative reviews on Google, Prom, or social media are discovered late — sometimes days after posting. By then the damage is done. There's no central view across all platforms.",
    problemUk:
      "Негативні відгуки на Google, Prom або соцмережах виявляються пізно — іноді через дні після публікації. До того часу збиток вже нанесений. Немає централізованого огляду всіх платформ.",
    solutionEn:
      "We build a brand sentiment monitoring dashboard that aggregates reviews from Google, Prom, OLX, and social media using NLP sentiment classification. Negative reviews trigger instant Telegram/email alerts so you can respond within 30 minutes.",
    solutionUk:
      "Ми будуємо дашборд моніторингу сентименту бренду, що агрегує відгуки з Google, Prom, OLX та соцмереж за допомогою NLP-класифікації сентименту. Негативні відгуки запускають миттєві Telegram/email-сповіщення, щоб ви могли відповісти протягом 30 хвилин.",
    resultQuoteEn:
      "Clients respond to negative reviews 10× faster. Brands that respond within 1 hour see 33% higher review scores over 6 months compared to those that take 24+ hours.",
    resultQuoteUk:
      "Клієнти відповідають на негативні відгуки у 10 разів швидше. Бренди, що відповідають протягом 1 години, мають оцінки відгуків на 33% вищі за 6 місяців порівняно з тими, хто відповідає через 24+ години.",
    metaTitleEn: "Monitor Brand Reviews in Real Time | NLP Sentiment | Codeworth",
    metaTitleUk: "Моніторинг відгуків про бренд у реальному часі | Codeworth",
    metaDescriptionEn:
      "NLP sentiment monitoring across Google, Prom, social. Negative review alerts in 30 min. Codeworth.",
    metaDescriptionUk:
      "NLP-моніторинг відгуків: Google, Prom, соцмережі. Сповіщення про негатив за 30 хв. Codeworth.",
    relatedPortfolio: ["nlp-review-monitor"],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: ["ai-sentiment-monitor"],
  },
  {
    slug: "build-trust-online",
    titleEn: "How to build customer trust for a new business",
    titleUk: "Як підвищити довіру клієнтів до нового бізнесу",
    category: "trust",
    icon: "🤝",
    whoEn: "New businesses, startups, freelancers going independent",
    whoUk: "Нові бізнеси, стартапи, фрілансери, що стають незалежними",
    problemEn:
      "The business is new — no reviews, no case studies, no recognisable brand. Potential clients visit the site and leave without converting because they can't verify quality or reliability.",
    problemUk:
      "Бізнес новий — немає відгуків, кейсів, впізнаваного бренду. Потенційні клієнти відвідують сайт і йдуть без конверсії, бо не можуть перевірити якість або надійність.",
    solutionEn:
      "We build a trust stack: Schema.org AggregateRating with verified review collection flow, client logo strip, case study page with real metrics, team page with LinkedIn-linked profiles, and a process transparency section (\"How we work\").",
    solutionUk:
      "Ми будуємо стек довіри: Schema.org AggregateRating з верифікованим збором відгуків, стрічка логотипів клієнтів, сторінка кейсів з реальними метриками, сторінка команди з LinkedIn-профілями та секція прозорості процесу («Як ми працюємо»).",
    resultQuoteEn:
      "New businesses typically see 25–40% higher enquiry rates after implementing the full trust stack within 30 days — even before collecting their first public reviews.",
    resultQuoteUk:
      "Нові бізнеси зазвичай бачать на 25–40% більше запитів після впровадження повного стеку довіри за 30 днів — навіть до отримання перших публічних відгуків.",
    metaTitleEn: "Build Online Trust for New Business | Social Proof | Codeworth",
    metaTitleUk: "Довіра онлайн для нового бізнесу | Соціальний доказ | Codeworth",
    metaDescriptionEn:
      "Trust stack: reviews schema, client logos, case studies, team profiles. +25–40% enquiries. Codeworth.",
    metaDescriptionUk:
      "Стек довіри: Schema відгуків, логотипи, кейси, команда. +25–40% запитів. Codeworth.",
    relatedPortfolio: [],
    relatedServices: ["web-apps"],
    relatedExtras: ["ecom-reviews", "feat-fomo"],
  },
  {
    slug: "showcase-portfolio-online",
    titleEn: "How to showcase your portfolio effectively online",
    titleUk: "Як ефективно презентувати своє портфоліо онлайн",
    category: "trust",
    icon: "🎨",
    whoEn: "Photographers, designers, builders, creative studios",
    whoUk: "Фотографи, дизайнери, будівельники, творчі студії",
    problemEn:
      "Work exists but isn't displayed compellingly. Google Drive folders, Instagram grids, or a basic PDF portfolio don't communicate professionalism or help clients understand the scope of past projects.",
    problemUk:
      "Роботи є, але презентовані неефективно. Папки Google Drive, Instagram-сітка або базовий PDF-портфоліо не передають професіоналізм і не допомагають клієнтам зрозуміти масштаб минулих проєктів.",
    solutionEn:
      "We build a case-study portfolio page with before/after sliders, project filtration by category, lightbox image gallery, result metrics per project, and a testimonial video embed system — all with lazy-loaded images for Core Web Vitals compliance.",
    solutionUk:
      "Ми будуємо сторінку портфоліо у вигляді кейсів з before/after слайдерами, фільтрацією проєктів за категорією, lightbox-галереєю зображень, метриками результатів на проєкт та системою вбудованих відео-відгуків — із lazy-loaded зображеннями для Core Web Vitals.",
    resultQuoteEn:
      "Portfolio pages with before/after sliders see 2.3× longer session duration and 45% higher quote request rates compared to static image galleries.",
    resultQuoteUk:
      "Сторінки портфоліо з before/after слайдерами мають у 2,3 рази довшу тривалість сесії та на 45% вищі показники запитів цін порівняно зі статичними галереями зображень.",
    metaTitleEn: "Showcase Your Portfolio Online | Before/After Slider | Codeworth",
    metaTitleUk: "Презентація портфоліо онлайн | Before/After слайдер | Codeworth",
    metaDescriptionEn:
      "Portfolio page with before/after sliders, case studies, lightbox. Session time 2.3×. Codeworth.",
    metaDescriptionUk:
      "Сторінка портфоліо: before/after слайдери, кейси, lightbox. Час сесії ×2,3. Codeworth.",
    relatedPortfolio: [],
    relatedServices: ["web-apps"],
    relatedExtras: ["feat-before-after", "feat-lightbox"],
  },
];

export const USE_CASE_CATEGORY_LABELS: Record<
  UseCaseCategory,
  { en: string; uk: string; color: string }
> = {
  conversion: { en: "Conversion", uk: "Конверсія", color: "emerald" },
  automation: { en: "Automation", uk: "Автоматизація", color: "violet" },
  seo: { en: "SEO", uk: "SEO", color: "blue" },
  ecommerce: { en: "E-commerce", uk: "E-commerce", color: "orange" },
  ai: { en: "AI", uk: "AI", color: "cyan" },
  trust: { en: "Trust", uk: "Довіра", color: "amber" },
};
