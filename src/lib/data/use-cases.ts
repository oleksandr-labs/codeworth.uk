export type UseCaseCategory =
  | "conversion"
  | "automation"
  | "seo"
  | "ecommerce"
  | "ai"
  | "trust";

export interface UseCase {
  slug: string;
  title: string;
  titleEn: string;
  category: UseCaseCategory;
  icon: string;
  who: string;
  whoEn: string;
  problem: string;
  problemEn: string;
  solution: string;
  solutionEn: string;
  resultQuote: string;
  resultQuoteEn: string;
  relatedPortfolio: string[];
  relatedServices: string[];
  relatedExtras: string[];
}

export interface UseCaseCategoryMeta {
  id: UseCaseCategory;
  icon: string;
  labelUk: string;
  labelEn: string;
}

export const USE_CASE_CATEGORIES: UseCaseCategoryMeta[] = [
  { id: "conversion", icon: "🎯", labelUk: "Конверсія", labelEn: "Conversion" },
  { id: "automation", icon: "⚙️", labelUk: "Автоматизація", labelEn: "Automation" },
  { id: "seo", icon: "📈", labelUk: "SEO", labelEn: "SEO" },
  { id: "ecommerce", icon: "🛒", labelUk: "E-commerce", labelEn: "E-commerce" },
  { id: "ai", icon: "🤖", labelUk: "AI", labelEn: "AI" },
  { id: "trust", icon: "💼", labelUk: "Довіра", labelEn: "Trust" },
];

export const USE_CASES: UseCase[] = [
  {
    slug: "increase-online-bookings",
    title: "Як збільшити кількість онлайн-записів",
    titleEn: "How to get more online bookings",
    category: "conversion",
    icon: "📅",
    who: "Салони краси, медичні клініки, автосервіси, фітнес-студії",
    whoEn: "Beauty salons, medical clinics, car services, fitness studios",
    problem:
      "Клієнти дзвонять або пишуть в Instagram — онлайн-запису немає. Телефон дзвонить постійно, адміністратор витрачає час на ведення журналу, а вечірні записи повністю пропускаються.",
    problemEn:
      "Clients call or message on Instagram — there's no online booking. The phone rings constantly, staff waste time managing the diary, and evening bookings are missed entirely.",
    solution:
      "Ми інтегруємо модуль онлайн-запису `feat-booking` з відображенням вільних слотів у реальному часі, автоматичними Telegram та email-сповіщеннями для клієнта і персоналу, і мобільним флоу запису менш ніж за 60 секунд.",
    solutionEn:
      "We integrate the `feat-booking` online booking module with real-time slot availability, automatic Telegram and email notifications to both client and staff, and a mobile-first booking flow that takes under 60 seconds to complete.",
    resultQuote:
      "Наші клієнти зазвичай отримують 60–120 онлайн-записів на місяць без дзвінків, а показник неявок знижується до 34% завдяки автоматичним нагадуванням.",
    resultQuoteEn:
      "Our clients typically receive 60–120 online bookings per month without phone calls, with no-show rates dropping by up to 34% due to automated reminders.",
    relatedPortfolio: ["beauty-salon", "auto-service", "medical-clinic"],
    relatedServices: ["web-apps"],
    relatedExtras: ["feat-booking", "int-telegram-bot"],
  },
  {
    slug: "reduce-abandoned-orders",
    title: "Як зменшити кількість кинутих кошиків",
    titleEn: "How to reduce abandoned shopping carts",
    category: "ecommerce",
    icon: "🛒",
    who: "Інтернет-магазини, e-commerce бізнеси",
    whoEn: "Online stores, e-commerce businesses",
    problem:
      "70% кошиків кидають до оплати. Клієнти додають товари, але йдуть без покупки — часто достатньо невеликого поштовху для завершення замовлення.",
    problemEn:
      "70% of shopping carts are abandoned before payment. Customers add products but leave without buying — often just needing a small nudge to complete the purchase.",
    solution:
      "Ми впроваджуємо систему відновлення кинутих кошиків: автоматична email-серія (1 год, 24 год, 72 год), exit-intent попап зі знижкою та стрічка соціального доказу з нещодавніми покупками — без абонплати сторонніх сервісів.",
    solutionEn:
      "We implement an abandoned cart recovery system: automated email sequence (1h, 24h, 72h), exit-intent popup with a small discount, and social proof strip showing recent purchases — without any third-party subscription fees.",
    resultQuote:
      "Клієнти бачать відновлення 12–18% кинутих кошиків протягом першого місяця після запуску, а email-серія самостійно окупається за 2–3 тижні.",
    resultQuoteEn:
      "Clients see 12–18% of abandoned carts recovered within the first month of deployment, with the email sequence alone generating ROI within 2–3 weeks.",
    relatedPortfolio: ["fashion-store", "flower-shop"],
    relatedServices: ["web-apps"],
    relatedExtras: ["feat-fomo", "int-mailchimp"],
  },
  {
    slug: "increase-landing-conversion",
    title: "Як підвищити конверсію лендінгу",
    titleEn: "How to increase landing page conversion",
    category: "conversion",
    icon: "📈",
    who: "Стартапи, школи, сервісні бізнеси, B2B",
    whoEn: "Startups, schools, service businesses, B2B",
    problem:
      "Трафік є, але заявок мало. Відвідувачі приходять, але не конвертуються — сторінка нечітко передає цінність, не створює терміновості та не має механізму кваліфікації.",
    problemEn:
      "Traffic exists but leads are scarce. Visitors arrive but don't convert — the page doesn't communicate value clearly, lacks urgency, and has no qualification mechanism.",
    solution:
      "Ми застосовуємо стек оптимізації конверсії: A/B-тестовані заголовки, Lead Quiz для кваліфікації перед формою, FOMO-віджет соціального доказу та Exit Intent Popup. Кожен елемент вимірюється через conversion events.",
    solutionEn:
      "We apply a conversion optimisation stack: A/B-tested headlines, Lead Quiz to qualify intent before the form, FOMO social proof widget, and Exit Intent Popup. Each element is measurable via conversion events.",
    resultQuote:
      "Типовий приріст конверсії — 40–80% на основний CTA після впровадження повного стеку, виміряний за 4-тижневими A/B-вікнами з довірчим рівнем понад 95%.",
    resultQuoteEn:
      "Typical conversion lift is 40–80% on the primary CTA after implementing the full stack — measured over 4-week A/B test windows with statistical significance above 95%.",
    relatedPortfolio: ["math-school-online", "dental-clinic-landing"],
    relatedServices: ["web-apps", "marketing"],
    relatedExtras: ["feat-fomo", "feat-lead-quiz"],
  },
  {
    slug: "automate-support",
    title: "Як автоматизувати підтримку клієнтів 24/7",
    titleEn: "How to automate customer support 24/7",
    category: "automation",
    icon: "🤖",
    who: "SaaS-компанії, e-commerce, клініки",
    whoEn: "SaaS companies, e-commerce, clinics",
    problem:
      "Служба підтримки щодня відповідає на одні й ті самі 20 питань. Ночі та вихідні без відповіді. Час першої відповіді перевищує 4 години, задоволеність клієнтів падає.",
    problemEn:
      "Support team answers the same 20 questions every day. Nights and weekends are unattended. First-response time is over 4 hours and customer satisfaction is falling.",
    solution:
      "Ми розробляємо RAG-чатбот, навчений на ваших FAQ, документації та базі знань продукту, на основі GPT-4o. Він обробляє 68% вхідних запитів автоматично, ескалує складні кейси до операторів і відповідає менш ніж за 2 секунди, 24/7.",
    solutionEn:
      "We build a RAG-powered chatbot trained on your FAQs, documentation, and product knowledge base using GPT-4o. It handles 68% of incoming queries automatically, escalates complex cases to humans, and responds in under 2 seconds, 24/7.",
    resultQuote:
      "Після запуску RAG-чатбота клієнти бачать автоматичне вирішення 68% запитів, навантаження на підтримку знижується вдвічі, а NPS покращується на 12–18 пунктів.",
    resultQuoteEn:
      "After deploying our RAG chatbot, clients see 68% of queries resolved automatically, support team workload reduced by half, and customer satisfaction scores improve by 12–18 NPS points.",
    relatedPortfolio: ["ai-chatbot-saas"],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: ["ai-chatbot-rag", "feat-floating-chat"],
  },
  {
    slug: "automate-order-notifications",
    title: "Як автоматизувати сповіщення про замовлення та записи",
    titleEn: "How to automate order and booking notifications",
    category: "automation",
    icon: "🔔",
    who: "Магазини, ресторани, сервісні бізнеси",
    whoEn: "Shops, restaurants, service businesses",
    problem:
      "Персонал вручну повідомляє клієнтів про статус замовлень, підтвердження записів та нагадування. Це займає 15–30 хвилин на день, а помилки трапляються регулярно — неправильний час, забуті нагадування.",
    problemEn:
      "Staff manually notify customers about order status, booking confirmations, and reminders. It takes 15–30 minutes per day and mistakes happen regularly — wrong times, forgotten reminders.",
    solution:
      "Ми розробляємо автоматизовані флоу сповіщень: Telegram-бот для миттєвих оновлень замовлень, email-серії для підтвердження запису + нагадування + запиту відгуку, з усіма шаблонами, налаштованими в адмін-панелі.",
    solutionEn:
      "We build automated notification flows: Telegram bot for instant order updates, email sequences for booking confirmation + reminder + feedback request, with all templates customizable in your admin panel.",
    resultQuote:
      "Нульові ручні витрати на стандартні флоу сповіщень. Неявки знижуються на 25–40% з автоматичними нагадуваннями. Персонал економить 2–3 години на тиждень.",
    resultQuoteEn:
      "Zero manual notification effort for standard order flows. No-show rates drop by 25–40% with automated appointment reminders. Staff save 2–3 hours per week.",
    relatedPortfolio: ["restaurant-booking", "beauty-salon"],
    relatedServices: ["web-apps"],
    relatedExtras: ["int-telegram-bot", "int-mailchimp"],
  },
  {
    slug: "automate-content-generation",
    title: "Як генерувати описи товарів за допомогою AI",
    titleEn: "How to generate product descriptions with AI",
    category: "ai",
    icon: "✍️",
    who: "E-commerce з великим каталогом товарів",
    whoEn: "E-commerce with large catalogues",
    problem:
      "Каталог містить 500–5 000 товарів з дублікатами або відсутніми описами. Написання унікального SEO-тексту вручну зайняло б місяці. Сторінки товарів слабкі і не ранжуються.",
    problemEn:
      "Catalogue has 500–5,000 products with duplicate or missing descriptions. Writing unique SEO copy manually would take months. The product pages are weak and don't rank.",
    solution:
      "Ми розгортаємо AI-генератор описів товарів на GPT-4o: масова генерація з назви товару + категорії + атрибутів, SEO-оптимізація з ключовим словом у H1 та першому абзаці, тон відповідає вашому бренду, експорт у будь-який формат каталогу.",
    solutionEn:
      "We deploy the AI product descriptions extra powered by GPT-4o: bulk generation from product title + category + attributes, SEO-optimised with primary keyword in H1 and first paragraph, tone-of-voice consistent with your brand, exportable to any catalogue format.",
    resultQuote:
      "100–1 000 SEO-оптимізованих описів товарів за один запуск. Клієнти бачать зростання органічного трафіку на товарних сторінках на 40–120% протягом 3 місяців після запуску.",
    resultQuoteEn:
      "100–1,000 SEO-optimised product descriptions generated in a single run. Clients see organic product page traffic increase 40–120% within 3 months after deployment.",
    relatedPortfolio: ["fashion-store", "ai-visual-search-ecommerce"],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: ["ai-product-descriptions"],
  },
  {
    slug: "rank-local-seo",
    title: "Як вийти в топ Google по місту",
    titleEn: "How to rank in Google for local searches",
    category: "seo",
    icon: "📍",
    who: "Клініки, ресторани, салони, сервіси з фізичним розташуванням",
    whoEn: "Clinics, restaurants, salons, services with physical locations",
    problem:
      "Бізнес не з'являється в результатах Google Maps для найцінніших запитів («стоматолог Київ», «перукарня поруч»). Конкуренти домінують у локальному 3-pack і отримують більшість трафіку з вулиці.",
    problemEn:
      "The business doesn't appear in Google Maps results for the most valuable searches (\"dentist Kyiv\", \"hairdresser near me\"). Competitors dominate the local 3-pack and get most of the walk-in traffic.",
    solution:
      "Ми впроваджуємо пакет локального SEO: Schema.org LocalBusiness + GeoCoordinates, геолендінгові сторінки для кожного міста/району, бриф для оптимізації Google Business Profile та аудит узгодженості NAP у всіх каталогах.",
    solutionEn:
      "We implement a local SEO package: LocalBusiness + GeoCoordinates Schema.org, dedicated geo-landing pages for each city/district, Google Business Profile optimisation brief, and NAP consistency audit across all directories.",
    resultQuote:
      "Клієнти зазвичай потрапляють на першу сторінку за локальними запитами за 6–10 тижнів, покази в Google Maps зростають у 3–5 разів, а кількість дзвінків зростає на 40–80%.",
    resultQuoteEn:
      "Clients typically see first-page rankings for local queries within 6–10 weeks, with Google Maps impressions increasing 3–5× and phone call volume up 40–80%.",
    relatedPortfolio: ["dental-clinic-landing", "beauty-salon"],
    relatedServices: ["seo"],
    relatedExtras: ["analytics-seo-audit"],
  },
  {
    slug: "get-rich-snippets",
    title: "Як отримати зірки та розширені результати в Google",
    titleEn: "How to get star ratings and rich results in Google",
    category: "seo",
    icon: "⭐",
    who: "Усі бізнеси з відгуками, FAQ або товарами",
    whoEn: "All businesses with reviews, FAQs, or products",
    problem:
      "Результати пошуку показують лише сині посилання — жодних зірок, FAQ-акордеону, сніпету ціни. Конкуренти з розширеними результатами отримують у 2–3 рази більше кліків на тій самій позиції.",
    problemEn:
      "Search results show only blue links — no stars, no FAQ accordion, no price snippet. Competitors with rich results get 2–3× more clicks at the same position.",
    solution:
      "Ми впроваджуємо повний стек Schema.org: FAQPage на кожній сторінці послуги/товару, AggregateRating із верифікованих відгуків, Article з авторською розміткою, BreadcrumbList та Product з діапазонами цін — все перевірено через Google Rich Results Test.",
    solutionEn:
      "We implement the full Schema.org stack: FAQPage on every service/product page, AggregateRating from verified review collection, Article with author markup, BreadcrumbList, and Product with price ranges — all validated against Google's Rich Results Test.",
    resultQuote:
      "Клієнти бачать зірки в результатах пошуку через 2–4 тижні після впровадження. Середній CTR зростає на 35–60% оскільки розширені сніпети візуально витісняють звичайні посилання конкурентів.",
    resultQuoteEn:
      "Clients see star ratings appear in search results within 2–4 weeks of implementation. Average CTR increases 35–60% as rich snippets displace competitor plain links visually.",
    relatedPortfolio: [],
    relatedServices: ["seo"],
    relatedExtras: ["analytics-seo-audit"],
  },
  {
    slug: "launch-online-store",
    title: "Як запустити інтернет-магазин за 14 днів",
    titleEn: "How to launch an online store in 14 days",
    category: "ecommerce",
    icon: "🚀",
    who: "Ритейл, fashion, хенд-мейд, виробники їжі",
    whoEn: "Retail, fashion, handmade, food producers",
    problem:
      "Бізнес продає в Instagram, Prom або Rozetka і платить 15% комісії з кожного замовлення. Немає незалежного магазину, списку email, механіки повторних покупок.",
    problemEn:
      "Business is selling on Instagram, Prom, or Rozetka and paying 15% commission on every order. There's no independent storefront, no email list, no repeat purchase mechanic.",
    solution:
      "Ми розгортаємо extra ecom-mini-shop або повноцінний e-commerce залежно від розміру каталогу. Включає лістинг товарів, кошик, чекаут з LiqPay/Monobank, управління замовленнями та систему промокодів — запуск за 14 днів.",
    solutionEn:
      "We deploy the ecom-mini-shop extra or a full custom e-commerce build depending on catalogue size. Includes product listing, cart, checkout with LiqPay/Monobank, order management, and discount code system — live in 14 days.",
    resultQuote:
      "Клієнти економлять 15% комісії маркетплейсу з першого дня. Середній незалежний магазин окупається за 2–4 місяці лише завдяки заощадженій комісії.",
    resultQuoteEn:
      "Clients save 15% marketplace commission from day one. The average independent store pays for itself within 2–4 months from commission savings alone.",
    relatedPortfolio: ["flower-shop", "fashion-store"],
    relatedServices: ["web-apps"],
    relatedExtras: ["ecom-mini-shop", "int-liqpay"],
  },
  {
    slug: "increase-average-order",
    title: "Як збільшити середній чек на 20–40%",
    titleEn: "How to increase average order value by 20–40%",
    category: "ecommerce",
    icon: "💰",
    who: "Магазини, кондитерські, подарунковий бізнес, сервіси",
    whoEn: "Shops, bakeries, gift businesses, service providers",
    problem:
      "Клієнти купують мінімум — один товар, базовий пакет, без апсейлів. Виручка за транзакцію стагнує попри здоровий трафік. На сторінках товарів немає логіки перехресних продажів.",
    problemEn:
      "Customers buy the minimum — one item, base package, no upsells. Revenue per transaction is flat despite healthy traffic. Product pages have no cross-sell logic.",
    solution:
      "Ми впроваджуємо Bundle Builder (куровані набори зі знижкою за набір), розумні рекомендації товарів («клієнти також купили») та модуль програми лояльності для стимулювання вищих витрат за відвідування.",
    solutionEn:
      "We implement a Bundle Builder (curated sets at bundle discount), smart product recommendations (\"customers also bought\"), and a loyalty points module to incentivise higher spend per visit.",
    resultQuote:
      "Bundle Builder сам по собі збільшує AOV на 20–30% протягом першого місяця. Додавання модуля лояльності поширює цей ефект до 35–45% за 3 місяці зі зростанням частоти повторних покупок.",
    resultQuoteEn:
      "Bundle Builder alone increases AOV by 20–30% within the first month. Adding the loyalty module extends this to 35–45% over 3 months as repeat purchase frequency increases.",
    relatedPortfolio: ["fashion-store", "flower-shop"],
    relatedServices: ["web-apps"],
    relatedExtras: ["ecom-bundle-builder", "ecom-loyalty"],
  },
  {
    slug: "sell-without-marketplace",
    title: "Як продавати без Rozetka та Prom.ua",
    titleEn: "How to sell without Rozetka or Prom.ua",
    category: "ecommerce",
    icon: "🏪",
    who: "Продавці на Rozetka, Prom, OLX, Instagram",
    whoEn: "Sellers on Rozetka, Prom, OLX, Instagram",
    problem:
      "Кожне замовлення відраховує 12–18% маркетплейсу. Немає прямих відносин з клієнтом — немає списку email, даних про повторні покупки, неможливо запустити власні акції.",
    problemEn:
      "Every order donates 12–18% to the marketplace. There's no direct customer relationship — no email list, no repeat purchase data, no ability to run your own promotions.",
    solution:
      "Ми будуємо ваш власний e-commerce магазин і допомагаємо переводити клієнтів з маркетплейсу на прямі продажі. Включає SEO-оптимізовані сторінки товарів, збір email та стимул першої прямої покупки (наприклад, 5% знижки за підписку на розсилку).",
    solutionEn:
      "We build your own e-commerce store and help you transition customers from marketplace to direct. Includes SEO-optimised product pages, email capture, and a first-purchase direct incentive (e.g. 5% discount for newsletter sign-up).",
    resultQuote:
      "Клієнти заощаджують в середньому 145 000–740 000 ₴ на рік на комісіях маркетплейсу після переходу. Один fashion-клієнт заощаджував 45 000 ₴/міс через 6 місяців після запуску.",
    resultQuoteEn:
      "Clients save an average of £3,500–£18,000 per year in marketplace commissions after transitioning. One fashion client saved 45,000 UAH/month within 6 months of launch.",
    relatedPortfolio: ["fashion-store"],
    relatedServices: ["web-apps"],
    relatedExtras: ["ecom-mini-shop"],
  },
  {
    slug: "implement-ai-support",
    title: "Як впровадити AI-підтримку без великих інвестицій",
    titleEn: "How to add AI support without a large investment",
    category: "ai",
    icon: "💬",
    who: "SaaS, e-commerce, B2B-сервіси",
    whoEn: "SaaS, e-commerce, B2B services",
    problem:
      "AI звучить дорого і складно. Команда не знає з чого почати — чи потрібна кастомна модель, скільки даних потрібно, який реальний ROI.",
    problemEn:
      "AI sounds expensive and complex. The team doesn't know where to start — whether it needs a custom model, how much data is required, or what the realistic ROI looks like.",
    solution:
      "Ми починаємо з найменшого можливого AI: RAG-чатбот на вашому існуючому FAQ або документації як базі знань. Без навчання кастомної моделі, без великого датасету. Від 75 000 ₴. Запуск за 3 тижні.",
    solutionEn:
      "We start with the smallest viable AI: a RAG chatbot using your existing FAQ or docs as the knowledge base. No custom model training, no large dataset. From £1,800 / 75,000 UAH. Live in 3 weeks.",
    resultQuote:
      "68% запитів підтримки вирішуються автоматично. Навантаження на команду підтримки зменшується вдвічі. Середній термін окупності: 6–8 тижнів за рахунок скорочення годин роботи підтримки.",
    resultQuoteEn:
      "68% of support queries resolved automatically. Support team workload halved. Average payback period: 6–8 weeks from reduced support staff hours.",
    relatedPortfolio: ["ai-chatbot-saas"],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: ["ai-chatbot-rag"],
  },
  {
    slug: "monitor-brand-reputation",
    title: "Як відстежувати відгуки про бренд у реальному часі",
    titleEn: "How to monitor brand reviews in real time",
    category: "ai",
    icon: "👁️",
    who: "E-commerce, ресторани, клініки, франшизи",
    whoEn: "E-commerce, restaurants, clinics, franchises",
    problem:
      "Негативні відгуки на Google, Prom або соцмережах виявляються пізно — іноді через дні після публікації. До того часу збиток вже нанесений. Немає централізованого огляду всіх платформ.",
    problemEn:
      "Negative reviews on Google, Prom, or social media are discovered late — sometimes days after posting. By then the damage is done. There's no central view across all platforms.",
    solution:
      "Ми будуємо дашборд моніторингу сентименту бренду, що агрегує відгуки з Google, Prom, OLX та соцмереж за допомогою NLP-класифікації сентименту. Негативні відгуки запускають миттєві Telegram/email-сповіщення, щоб ви могли відповісти протягом 30 хвилин.",
    solutionEn:
      "We build a brand sentiment monitoring dashboard that aggregates reviews from Google, Prom, OLX, and social media using NLP sentiment classification. Negative reviews trigger instant Telegram/email alerts so you can respond within 30 minutes.",
    resultQuote:
      "Клієнти відповідають на негативні відгуки у 10 разів швидше. Бренди, що відповідають протягом 1 години, мають оцінки відгуків на 33% вищі за 6 місяців порівняно з тими, хто відповідає через 24+ години.",
    resultQuoteEn:
      "Clients respond to negative reviews 10× faster. Brands that respond within 1 hour see 33% higher review scores over 6 months compared to those that take 24+ hours.",
    relatedPortfolio: ["nlp-review-monitor"],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: ["ai-sentiment-monitor"],
  },
  {
    slug: "build-trust-online",
    title: "Як підвищити довіру клієнтів до нового бізнесу",
    titleEn: "How to build customer trust for a new business",
    category: "trust",
    icon: "🤝",
    who: "Нові бізнеси, стартапи, фрілансери, що стають незалежними",
    whoEn: "New businesses, startups, freelancers going independent",
    problem:
      "Бізнес новий — немає відгуків, кейсів, впізнаваного бренду. Потенційні клієнти відвідують сайт і йдуть без конверсії, бо не можуть перевірити якість або надійність.",
    problemEn:
      "The business is new — no reviews, no case studies, no recognisable brand. Potential clients visit the site and leave without converting because they can't verify quality or reliability.",
    solution:
      "Ми будуємо стек довіри: Schema.org AggregateRating з верифікованим збором відгуків, стрічка логотипів клієнтів, сторінка кейсів з реальними метриками, сторінка команди з LinkedIn-профілями та секція прозорості процесу («Як ми працюємо»).",
    solutionEn:
      "We build a trust stack: Schema.org AggregateRating with verified review collection flow, client logo strip, case study page with real metrics, team page with LinkedIn-linked profiles, and a process transparency section (\"How we work\").",
    resultQuote:
      "Нові бізнеси зазвичай бачать на 25–40% більше запитів після впровадження повного стеку довіри за 30 днів — навіть до отримання перших публічних відгуків.",
    resultQuoteEn:
      "New businesses typically see 25–40% higher enquiry rates after implementing the full trust stack within 30 days — even before collecting their first public reviews.",
    relatedPortfolio: [],
    relatedServices: ["web-apps"],
    relatedExtras: ["ecom-reviews", "feat-fomo"],
  },
  {
    slug: "showcase-portfolio-online",
    title: "Як ефективно презентувати своє портфоліо онлайн",
    titleEn: "How to showcase your portfolio effectively online",
    category: "trust",
    icon: "🎨",
    who: "Фотографи, дизайнери, будівельники, творчі студії",
    whoEn: "Photographers, designers, builders, creative studios",
    problem:
      "Роботи є, але презентовані неефективно. Папки Google Drive, Instagram-сітка або базовий PDF-портфоліо не передають професіоналізм і не допомагають клієнтам зрозуміти масштаб минулих проєктів.",
    problemEn:
      "Work exists but isn't displayed compellingly. Google Drive folders, Instagram grids, or a basic PDF portfolio don't communicate professionalism or help clients understand the scope of past projects.",
    solution:
      "Ми будуємо сторінку портфоліо у вигляді кейсів з before/after слайдерами, фільтрацією проєктів за категорією, lightbox-галереєю зображень, метриками результатів на проєкт та системою вбудованих відео-відгуків — із lazy-loaded зображеннями для Core Web Vitals.",
    solutionEn:
      "We build a case-study portfolio page with before/after sliders, project filtration by category, lightbox image gallery, result metrics per project, and a testimonial video embed system — all with lazy-loaded images for Core Web Vitals compliance.",
    resultQuote:
      "Сторінки портфоліо з before/after слайдерами мають у 2,3 рази довшу тривалість сесії та на 45% вищі показники запитів цін порівняно зі статичними галереями зображень.",
    resultQuoteEn:
      "Portfolio pages with before/after sliders see 2.3× longer session duration and 45% higher quote request rates compared to static image galleries.",
    relatedPortfolio: [],
    relatedServices: ["web-apps"],
    relatedExtras: ["feat-before-after", "feat-lightbox"],
  },
];
