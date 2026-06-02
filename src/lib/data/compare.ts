export interface CompareRow {
  feature: string;
  featureEn: string;
  Codeworth: string | boolean;
  CodeworthEn?: string | boolean;
  competitor: string | boolean;
  competitorEn?: string | boolean;
  winner: "Codeworth" | "competitor" | "tie";
}

export interface CompareData {
  slug: string;
  competitorUk: string;
  competitorEn: string;
  taglineUk: string;
  taglineEn: string;
  summaryUk: string;
  summaryEn: string;
  seoTitleUk: string;
  seoTitleEn: string;
  seoDescUk: string;
  seoDescEn: string;
  verdictUk: string;
  verdictEn: string;
  competitorColor: string;
  competitorBg: string;
  rows: CompareRow[];
  useCasesCodeworthUk: string[];
  useCasesCodeworthEn: string[];
  useCasesCompetitorUk: string[];
  useCasesCompetitorEn: string[];
}

export const COMPARE_DATA: CompareData[] = [
  {
    slug: "Codeworth-vs-wix",
    competitorUk: "Wix",
    competitorEn: "Wix",
    taglineUk: "Самостійний конструктор сайтів",
    taglineEn: "DIY website builder",
    summaryUk:
      "Wix — популярний drag-and-drop конструктор, що дозволяє створити сайт без програміста. Codeworth — веб-студія, що розробляє індивідуальні сайти на Next.js із SEO-оптимізацією, унікальним дизайном та технічною підтримкою.",
    summaryEn:
      "Wix is a popular drag-and-drop builder that lets you create a site without a developer. Codeworth is a web studio that builds custom sites on Next.js with SEO optimization, unique design, and technical support.",
    seoTitleUk: "Codeworth vs Wix — що краще для вашого бізнесу?",
    seoTitleEn: "Codeworth vs Wix — what's better for your business?",
    seoDescUk:
      "Порівняйте Codeworth і Wix: ціни, SEO, швидкість, дизайн, підтримку. Дізнайтесь чому бізнес обирає індивідуальну розробку замість конструктора.",
    seoDescEn:
      "Compare Codeworth vs Wix: pricing, SEO, speed, design, support. Learn why businesses choose custom development over a website builder.",
    verdictUk:
      "Wix підходить для особистих блогів та мікробізнесів з обмеженим бюджетом. Codeworth — для бізнесу, якому важлива швидкість, SEO у топі Google та можливість масштабуватись без обмежень конструктора.",
    verdictEn:
      "Wix is suitable for personal blogs and micro-businesses on a tight budget. Codeworth is for businesses that care about speed, top Google SEO rankings, and the ability to scale without a builder's limitations.",
    competitorColor: "#0c6efd",
    competitorBg: "from-blue-600 to-blue-700",
    rows: [
      { feature: "PageSpeed Mobile", featureEn: "PageSpeed Mobile", Codeworth: "90–98", competitorEn: "60–80", competitor: "60–80", winner: "Codeworth" },
      { feature: "SEO-можливості", featureEn: "SEO Capabilities", Codeworth: "Повний контроль: metadata, Schema.org, sitemap, robots", CodeworthEn: "Full control: metadata, Schema.org, sitemap, robots", competitor: "Базові SEO-налаштування, обмежені можливості Schema.org", competitorEn: "Basic SEO settings, limited Schema.org options", winner: "Codeworth" },
      { feature: "Унікальний дизайн", featureEn: "Unique Design", Codeworth: "100% індивідуальний під бренд", CodeworthEn: "100% custom for your brand", competitor: "Шаблон (сотні бізнесів використовують той самий)", competitorEn: "Template (hundreds of businesses use the same one)", winner: "Codeworth" },
      { feature: "Власний хостинг", featureEn: "Own Hosting", Codeworth: true, competitor: false, winner: "Codeworth" },
      { feature: "Вихідний код у власності", featureEn: "You Own the Code", Codeworth: true, competitor: false, winner: "Codeworth" },
      { feature: "Щомісячна абонплата", featureEn: "Monthly Subscription", Codeworth: "Необов'язкова (тільки підтримка)", CodeworthEn: "Optional (support only)", competitor: "від $17/міс (обов'язкова)", competitorEn: "from $17/month (mandatory)", winner: "Codeworth" },
      { feature: "Масштабованість", featureEn: "Scalability", Codeworth: "Без обмежень — будь-яка функція", CodeworthEn: "Unlimited — any feature possible", competitor: "Обмежена конструктором", competitorEn: "Limited by the builder", winner: "Codeworth" },
      { feature: "Старт без технічних знань", featureEn: "No-Code Start", Codeworth: false, competitor: true, winner: "competitor" },
      { feature: "Час запуску (лендінг)", featureEn: "Launch Time (landing)", Codeworth: "5–10 днів", CodeworthEn: "5–10 days", competitor: "1–3 дні", competitorEn: "1–3 days", winner: "competitor" },
      { feature: "Технічна підтримка", featureEn: "Technical Support", Codeworth: "Персональний менеджер + Telegram", CodeworthEn: "Personal manager + Telegram", competitor: "Загальна підтримка Wix", competitorEn: "General Wix support", winner: "Codeworth" },
      { feature: "Інтеграції та API", featureEn: "Integrations & API", Codeworth: "Будь-які: CRM, платежі, ERP, власні API", CodeworthEn: "Any: CRM, payments, ERP, custom APIs", competitor: "Обмежені Wix App Market", competitorEn: "Limited to Wix App Market", winner: "Codeworth" },
      { feature: "Ціна (одноразово)", featureEn: "One-time Cost", Codeworth: "від 8 000 грн", CodeworthEn: "from $200", competitor: "Безкоштовно або від $200/рік", competitorEn: "Free or from $200/year", winner: "tie" },
    ],
    useCasesCodeworthUk: ["Бізнес із SEO-пріоритетом", "Інтернет-магазин з власним складом", "Корпоративний сайт із CRM", "Масштабований портал", "Сайт де брендинг критично важливий"],
    useCasesCodeworthEn: ["SEO-focused business", "Online store with own inventory", "Corporate site with CRM", "Scalable portal", "Site where branding is critical"],
    useCasesCompetitorUk: ["Особистий блог або портфоліо", "Мінімальний бюджет", "Сайт-візитка без SEO-цілей", "Тест ідеї за 1 день"],
    useCasesCompetitorEn: ["Personal blog or portfolio", "Minimal budget", "Business card site without SEO goals", "Idea validation in 1 day"],
  },
  {
    slug: "Codeworth-vs-tilda",
    competitorUk: "Tilda",
    competitorEn: "Tilda",
    taglineUk: "No-code конструктор на блоках",
    taglineEn: "No-code block-based builder",
    summaryUk:
      "Tilda — популярний в Україні no-code конструктор із готовими блоками для лендінгів і корпоративних сайтів. Codeworth — повна веб-студія з кастомним кодом, SSG-оптимізацією та індивідуальним дизайном від нуля.",
    summaryEn:
      "Tilda is a popular no-code builder in Ukraine with ready-made blocks for landing pages and corporate sites. Codeworth is a full web studio with custom code, SSG optimization, and unique design from scratch.",
    seoTitleUk: "Codeworth vs Tilda — що обрати для сайту бізнесу?",
    seoTitleEn: "Codeworth vs Tilda — which to choose for your business site?",
    seoDescUk:
      "Детальне порівняння Codeworth і Tilda: SEO, швидкість, дизайн, ціни, інтеграції. Допоможемо обрати правильний інструмент для вашого бізнесу.",
    seoDescEn:
      "Detailed comparison of Codeworth and Tilda: SEO, speed, design, pricing, integrations. We'll help you choose the right tool for your business.",
    verdictUk:
      "Tilda відмінна для швидкого лендінгу або MVP без бюджету на розробку. Codeworth — коли потрібні SEO у топі Google, унікальний дизайн рівня Awwwards та складні інтеграції без обмежень конструктора.",
    verdictEn:
      "Tilda is great for a quick landing page or MVP without a development budget. Codeworth is when you need top Google SEO, award-level unique design, and complex integrations without builder limitations.",
    competitorColor: "#191919",
    competitorBg: "from-neutral-800 to-neutral-900",
    rows: [
      { feature: "PageSpeed Mobile", featureEn: "PageSpeed Mobile", Codeworth: "90–98", competitor: "55–75", winner: "Codeworth" },
      { feature: "SEO-контроль", featureEn: "SEO Control", Codeworth: "Повний: metadata, Schema.org, hreflang, canonical", CodeworthEn: "Full: metadata, Schema.org, hreflang, canonical", competitor: "Обмежений (немає Schema.org, обмежений robots)", competitorEn: "Limited (no Schema.org, restricted robots)", winner: "Codeworth" },
      { feature: "Уникальний дизайн", featureEn: "Unique Design", Codeworth: "100% custom Figma → код", CodeworthEn: "100% custom Figma → code", competitor: "Блоки Tilda (однотипний вигляд)", competitorEn: "Tilda blocks (similar look across sites)", winner: "Codeworth" },
      { feature: "Core Web Vitals (CWV)", featureEn: "Core Web Vitals", Codeworth: "LCP < 2.5c, CLS < 0.1", CodeworthEn: "LCP < 2.5s, CLS < 0.1", competitor: "Часто LCP > 3c через CMS", competitorEn: "Often LCP > 3s due to CMS overhead", winner: "Codeworth" },
      { feature: "Власний хостинг/домен", featureEn: "Own Hosting/Domain", Codeworth: true, competitor: "Тільки з Business-тарифом", winner: "Codeworth" },
      { feature: "Код у власності", featureEn: "Code Ownership", Codeworth: true, competitor: false, winner: "Codeworth" },
      { feature: "Абонплата", featureEn: "Subscription", Codeworth: "Необов'язкова", CodeworthEn: "Optional", competitor: "від $10/міс (обов'язкова)", competitorEn: "from $10/month (mandatory)", winner: "Codeworth" },
      { feature: "Без кодингу", featureEn: "No-Code", Codeworth: false, competitor: true, winner: "competitor" },
      { feature: "Швидкість запуску", featureEn: "Launch Speed", Codeworth: "5–30 днів", CodeworthEn: "5–30 days", competitor: "1–5 днів", competitorEn: "1–5 days", winner: "competitor" },
      { feature: "Інтеграції CRM/ERP", featureEn: "CRM/ERP Integrations", Codeworth: "Будь-які через API", CodeworthEn: "Any via API", competitor: "Обмежено (AmoCRM, Bitrix24)", competitorEn: "Limited (AmoCRM, Bitrix24)", winner: "Codeworth" },
      { feature: "E-commerce", featureEn: "E-commerce", Codeworth: "Повноцінний магазин", CodeworthEn: "Full-featured store", competitor: "Tilda Shop (обмежений)", competitorEn: "Tilda Shop (limited)", winner: "Codeworth" },
      { feature: "Технічна підтримка", featureEn: "Technical Support", Codeworth: "Персональна + Telegram", CodeworthEn: "Personal + Telegram", competitor: "Онлайн-чат Tilda", competitorEn: "Tilda online chat", winner: "Codeworth" },
    ],
    useCasesCodeworthUk: ["Сайт із ціллю потрапити в топ Google", "Магазин із складним каталогом", "Корпоративний портал із кабінетом", "Сайт де важливий унікальний бренд"],
    useCasesCodeworthEn: ["Site aiming for top Google rankings", "Store with a complex catalog", "Corporate portal with user accounts", "Site where unique branding matters"],
    useCasesCompetitorUk: ["Швидкий лендінг для тестування", "Акційна сторінка", "Мінімальний бюджет", "Немає технічної команди"],
    useCasesCompetitorEn: ["Quick landing page for testing", "Promotional page", "Minimal budget", "No technical team"],
  },
  {
    slug: "Codeworth-vs-wordpress",
    competitorUk: "WordPress",
    competitorEn: "WordPress",
    taglineUk: "Найпопулярніша CMS у світі",
    taglineEn: "The world's most popular CMS",
    summaryUk:
      "WordPress — найпоширеніша CMS у світі, що займає 43% усіх сайтів. Codeworth розробляє на Next.js — сучаснішому стеку зі статичною генерацією, кращим Core Web Vitals та вищою безпекою.",
    summaryEn:
      "WordPress is the world's most widespread CMS, powering 43% of all websites. Codeworth builds on Next.js — a modern stack with static generation, better Core Web Vitals, and higher security.",
    seoTitleUk: "Codeworth (Next.js) vs WordPress — що краще для SEO та бізнесу?",
    seoTitleEn: "Codeworth (Next.js) vs WordPress — what's better for SEO & business?",
    seoDescUk:
      "Порівняйте Next.js від Codeworth і WordPress: швидкість, безпека, SEO, вартість підтримки. Чому сучасний стек виграє у довгостроковій перспективі.",
    seoDescEn:
      "Compare Codeworth Next.js vs WordPress: speed, security, SEO, maintenance cost. Why modern stack wins in the long run.",
    verdictUk:
      "WordPress підходить для контентних ресурсів де потрібна самостійна редакція матеріалів без розробника. Codeworth/Next.js — для швидких, безпечних бізнес-сайтів де SEO та Core Web Vitals мають вирішальне значення.",
    verdictEn:
      "WordPress suits content-heavy resources where self-editing without a developer is needed. Codeworth/Next.js is for fast, secure business sites where SEO and Core Web Vitals are critical.",
    competitorColor: "#3858e9",
    competitorBg: "from-blue-700 to-indigo-700",
    rows: [
      { feature: "PageSpeed Mobile", featureEn: "PageSpeed Mobile", Codeworth: "90–98", competitor: "40–70", winner: "Codeworth" },
      { feature: "Безпека", featureEn: "Security", Codeworth: "Висока (статичний сайт, немає PHP)", CodeworthEn: "High (static site, no PHP)", competitor: "Часті взломи через плагіни (43% зломів у WP)", competitorEn: "Frequent hacks via plugins (43% of all CMS hacks)", winner: "Codeworth" },
      { feature: "Core Web Vitals", featureEn: "Core Web Vitals", Codeworth: "LCP < 2.5c, CLS < 0.1 — стабільно", CodeworthEn: "LCP < 2.5s, CLS < 0.1 — stable", competitor: "Залежить від теми та плагінів", competitorEn: "Depends on theme and plugins", winner: "Codeworth" },
      { feature: "Самостійне редагування контенту", featureEn: "Self-Editing Content", Codeworth: "Через CMS (Sanity/Strapi) за потреби", CodeworthEn: "Via CMS (Sanity/Strapi) if needed", competitor: true, winner: "competitor" },
      { feature: "Вартість підтримки", featureEn: "Maintenance Cost", Codeworth: "Нижча (немає оновлень плагінів)", CodeworthEn: "Lower (no plugin updates)", competitor: "Вища: оновлення ядра + плагінів + тема", competitorEn: "Higher: core + plugin + theme updates", winner: "Codeworth" },
      { feature: "Кількість плагінів", featureEn: "Plugin Ecosystem", Codeworth: "npm (500k+ пакетів)", CodeworthEn: "npm (500k+ packages)", competitor: "59 000+ плагінів WP", competitorEn: "59,000+ WP plugins", winner: "tie" },
      { feature: "Хостинг", featureEn: "Hosting", Codeworth: "Vercel (CDN, глобальний, безкоштовний tier)", CodeworthEn: "Vercel (CDN, global, free tier)", competitor: "Потребує PHP-хостингу (від $5–20/міс)", competitorEn: "Requires PHP hosting ($5–20/month)", winner: "Codeworth" },
      { feature: "SEO-можливості", featureEn: "SEO Capabilities", Codeworth: "Вбудовано: SSG, Schema.org, sitemap, hreflang", CodeworthEn: "Built-in: SSG, Schema.org, sitemap, hreflang", competitor: "Потребує Yoast SEO плагіну", competitorEn: "Requires Yoast SEO plugin", winner: "Codeworth" },
      { feature: "Захист від DDoS/злому", featureEn: "DDoS/Hack Protection", Codeworth: "Вбудовано через Vercel Edge", CodeworthEn: "Built-in via Vercel Edge", competitor: "Додаткові плагіни + сервіси", competitorEn: "Additional plugins + services", winner: "Codeworth" },
      { feature: "TypeScript та сучасний стек", featureEn: "TypeScript & Modern Stack", Codeworth: true, competitor: false, winner: "Codeworth" },
      { feature: "Поширеність на ринку", featureEn: "Market Adoption", Codeworth: "Зростаючий", CodeworthEn: "Growing", competitor: "43% всіх сайтів у світі", competitorEn: "43% of all websites worldwide", winner: "competitor" },
    ],
    useCasesCodeworthUk: ["Сайт де SEO і швидкість критичні", "E-commerce з унікальними функціями", "SaaS та веб-додатки", "Портал з авторизацією та персоналізацією"],
    useCasesCodeworthEn: ["Site where SEO and speed are critical", "E-commerce with unique features", "SaaS and web apps", "Portal with auth and personalization"],
    useCasesCompetitorUk: ["Новинний портал або блог із сотнями матеріалів", "Клієнт хоче сам редагувати контент без розробника", "Великий маркетплейс WooCommerce", "Обмежений бюджет на розробку"],
    useCasesCompetitorEn: ["News portal or blog with hundreds of articles", "Client wants to edit content without a developer", "Large WooCommerce marketplace", "Limited development budget"],
  },
  {
    slug: "Codeworth-vs-shopify",
    competitorUk: "Shopify",
    competitorEn: "Shopify",
    taglineUk: "SaaS-платформа для інтернет-магазинів",
    taglineEn: "SaaS e-commerce platform",
    summaryUk:
      "Shopify — популярна SaaS-платформа для e-commerce з готовою екосистемою. Codeworth розробляє кастомні інтернет-магазини на Next.js без щомісячної абонплати та з повним контролем над функціоналом.",
    summaryEn:
      "Shopify is a popular SaaS e-commerce platform with a ready-made ecosystem. Codeworth builds custom online stores on Next.js without monthly fees and with full control over features.",
    seoTitleUk: "Codeworth vs Shopify — що краще для інтернет-магазину в Україні?",
    seoTitleEn: "Codeworth vs Shopify — which is better for an online store in Ukraine?",
    seoDescUk:
      "Порівняйте Codeworth та Shopify для e-commerce: комісія з продажів, SEO, швидкість, локалізація. Обираємо найкраще рішення для українського бізнесу.",
    seoDescEn:
      "Compare Codeworth vs Shopify for e-commerce: sales commission, SEO, speed, localization. Choosing the best solution for Ukrainian businesses.",
    verdictUk:
      "Shopify ідеальний для дропшипінгу та старту без технічних знань. Codeworth — для бізнесу де важлива відсутність абонплати та комісій, унікальний UX та повна локалізація під Україну (ПриватБанк, Нова Пошта, LiqPay).",
    verdictEn:
      "Shopify is ideal for dropshipping and starting without technical knowledge. Codeworth is for businesses where no subscription fees or commissions matter, unique UX, and full localization for Ukraine (PrivatBank, Nova Poshta, LiqPay).",
    competitorColor: "#96bf48",
    competitorBg: "from-green-600 to-green-700",
    rows: [
      { feature: "Щомісячна абонплата", featureEn: "Monthly Fee", Codeworth: "Немає", CodeworthEn: "None", competitor: "від $39/міс (Basic)", competitorEn: "from $39/month (Basic)", winner: "Codeworth" },
      { feature: "Комісія з продажів", featureEn: "Sales Commission", Codeworth: "0%", competitor: "0.5–2% (без Shopify Payments)", winner: "Codeworth" },
      { feature: "Локалізація (Україна)", featureEn: "Ukraine Localization", Codeworth: "LiqPay, ПриватБанк, Нова Пошта, Укрпошта", CodeworthEn: "LiqPay, PrivatBank, Nova Poshta, Ukrposhta", competitor: "Обмежена (немає нативної інтеграції НП)", competitorEn: "Limited (no native Nova Poshta integration)", winner: "Codeworth" },
      { feature: "Унікальний дизайн", featureEn: "Unique Design", Codeworth: "100% кастом", CodeworthEn: "100% custom", competitor: "Теми ($150–350 одноразово)", competitorEn: "Themes ($150–350 one-time)", winner: "Codeworth" },
      { feature: "SEO контроль", featureEn: "SEO Control", Codeworth: "Повний: Schema.org Product, hreflang, SSG", CodeworthEn: "Full: Schema.org Product, hreflang, SSG", competitor: "Обмежений (URL структура задана)", competitorEn: "Limited (URL structure fixed)", winner: "Codeworth" },
      { feature: "PageSpeed", featureEn: "PageSpeed", Codeworth: "90–98", competitor: "65–85", winner: "Codeworth" },
      { feature: "Старт без розробника", featureEn: "Start Without Developer", Codeworth: false, competitor: true, winner: "competitor" },
      { feature: "Готова екосистема додатків", featureEn: "App Ecosystem", Codeworth: "npm + кастомна розробка", CodeworthEn: "npm + custom development", competitor: "8000+ Shopify Apps", competitorEn: "8,000+ Shopify Apps", winner: "competitor" },
      { feature: "Масштабованість", featureEn: "Scalability", Codeworth: "Без обмежень", CodeworthEn: "Unlimited", competitor: "Обмежена тарифом", competitorEn: "Limited by plan", winner: "Codeworth" },
      { feature: "Повернення коштів / чекаут", featureEn: "Checkout / Refunds", Codeworth: "Кастомний UX", CodeworthEn: "Custom UX", competitor: "Shopify Checkout (стандартний)", competitorEn: "Shopify Checkout (standard)", winner: "Codeworth" },
      { feature: "Підтримка", featureEn: "Support", Codeworth: "Персональна + Telegram", CodeworthEn: "Personal + Telegram", competitor: "24/7 Shopify support", competitorEn: "24/7 Shopify support", winner: "tie" },
    ],
    useCasesCodeworthUk: ["Магазин без щомісячної абонплати", "E-commerce з локальними платежами (LiqPay)", "Інтеграція з ERP/1C/складом", "Унікальний UX checkout"],
    useCasesCodeworthEn: ["Store without monthly subscription", "E-commerce with local payments (LiqPay)", "ERP/1C/warehouse integration", "Unique checkout UX"],
    useCasesCompetitorUk: ["Дропшипінг на міжнародний ринок", "Швидкий старт без розробника", "Мультивалютний магазин глобально", "Великий маркетплейс"],
    useCasesCompetitorEn: ["International dropshipping", "Quick start without a developer", "Multi-currency global store", "Large marketplace"],
  },
  {
    slug: "Codeworth-vs-freelancer",
    competitorUk: "Фрілансер",
    competitorEn: "Freelancer",
    taglineUk: "Один розробник на всі питання",
    taglineEn: "One developer handling everything",
    summaryUk:
      "Фрілансер — доступна альтернатива студії, але пов'язана з ризиками: залежність від однієї людини, відсутність команди, нестабільна якість. Codeworth — команда з дизайнером, розробником, SEO-спеціалістом та менеджером під одним дахом.",
    summaryEn:
      "A freelancer is an affordable alternative to a studio, but comes with risks: dependence on one person, no team, inconsistent quality. Codeworth is a team with a designer, developer, SEO specialist, and manager under one roof.",
    seoTitleUk: "Codeworth vs Фрілансер — студія або приватний розробник?",
    seoTitleEn: "Codeworth vs Freelancer — agency or solo developer?",
    seoDescUk:
      "Порівняйте замовлення сайту у веб-студії Codeworth та у фрілансера: гарантії, якість, терміни, команда, підтримка після здачі.",
    seoDescEn:
      "Compare ordering a site from Codeworth web studio vs a freelancer: guarantees, quality, deadlines, team, post-launch support.",
    verdictUk:
      "Фрілансер підходить для разових задач — правки, проста верстка, мінімальний лендінг. Codeworth — коли важливий повний цикл: дизайн → розробка → SEO → підтримка, і ви хочете гарантій.",
    verdictEn:
      "A freelancer suits one-time tasks — edits, simple markup, a minimal landing. Codeworth is when the full cycle matters: design → development → SEO → support, and you want guarantees.",
    competitorColor: "#f5a623",
    competitorBg: "from-amber-500 to-orange-600",
    rows: [
      { feature: "Команда спеціалістів", featureEn: "Team of Specialists", Codeworth: "Дизайнер + розробник + SEO + PM", CodeworthEn: "Designer + developer + SEO + PM", competitor: "Один розробник", competitorEn: "One developer", winner: "Codeworth" },
      { feature: "Стабільність і надійність", featureEn: "Reliability", Codeworth: "Компанія з договором та гарантіями", CodeworthEn: "Company with contract and guarantees", competitor: "Ризик зникнення або зриву термінів", competitorEn: "Risk of disappearing or missing deadlines", winner: "Codeworth" },
      { feature: "Офіційний договір", featureEn: "Official Contract", Codeworth: true, competitor: "Рідко", competitorEn: "Rarely", winner: "Codeworth" },
      { feature: "Гарантійна підтримка", featureEn: "Warranty Support", Codeworth: "1 місяць безкоштовно", CodeworthEn: "1 month free", competitor: "Не гарантована", competitorEn: "Not guaranteed", winner: "Codeworth" },
      { feature: "SEO + дизайн у пакеті", featureEn: "SEO + Design in Package", Codeworth: true, competitor: false, winner: "Codeworth" },
      { feature: "Ціна", featureEn: "Price", Codeworth: "Середньо-ринкова", CodeworthEn: "Market average", competitor: "Часто нижча (але є ризики)", competitorEn: "Often lower (but with risks)", winner: "competitor" },
      { feature: "Швидкість комунікації", featureEn: "Communication Speed", Codeworth: "Менеджер на зв'язку, Telegram", CodeworthEn: "Manager available, Telegram", competitor: "Залежить від фрілансера", competitorEn: "Depends on the freelancer", winner: "Codeworth" },
      { feature: "Довгострокова підтримка", featureEn: "Long-term Support", Codeworth: "Тарифи підтримки від 1 500 грн/міс", CodeworthEn: "Support plans from $40/month", competitor: "Непередбачувана", competitorEn: "Unpredictable", winner: "Codeworth" },
      { feature: "Портфоліо та кейси", featureEn: "Portfolio & Case Studies", Codeworth: "34 публічних кейси з результатами", CodeworthEn: "34 public cases with results", competitor: "Varies", winner: "Codeworth" },
      { feature: "Паралельна робота над проєктом", featureEn: "Parallel Project Work", Codeworth: "Так (кілька спеціалістів одночасно)", CodeworthEn: "Yes (multiple specialists simultaneously)", competitor: "Ні (один на все)", competitorEn: "No (one person for everything)", winner: "Codeworth" },
    ],
    useCasesCodeworthUk: ["Повна розробка під ключ", "Великий проєкт із різними фахівцями", "Потрібен SEO + дизайн + код", "Важлива гарантія та договір"],
    useCasesCodeworthEn: ["Full turnkey development", "Large project with multiple specializations", "SEO + design + code needed", "Guarantee and contract are important"],
    useCasesCompetitorUk: ["Дрібні правки на існуючому сайті", "Мінімальний бюджет", "Разова проста задача", "Є знайомий перевірений розробник"],
    useCasesCompetitorEn: ["Minor edits on existing site", "Minimal budget", "One-time simple task", "You know a trusted developer personally"],
  },
  {
    slug: "Codeworth-vs-template",
    competitorUk: "Готовий шаблон",
    competitorEn: "Ready-Made Template",
    taglineUk: "Купити та самостійно адаптувати",
    taglineEn: "Buy and adapt yourself",
    summaryUk:
      "Готові HTML/WordPress/Webflow шаблони дозволяють швидко запустити сайт за $30–200. Але адаптація під бренд, інтеграції та унікальний дизайн потребують значних зусиль. Codeworth пропонує унікальну розробку або готові нішеві рішення — швидко та без компромісів.",
    summaryEn:
      "Ready HTML/WordPress/Webflow templates let you launch a site for $30–200. But adapting to your brand, integrations, and unique design requires significant effort. Codeworth offers custom development or ready-made niche solutions — fast and without compromise.",
    seoTitleUk: "Codeworth vs Готовий шаблон — розробка або шаблон для бізнесу?",
    seoTitleEn: "Codeworth vs Template — custom development or template for business?",
    seoDescUk:
      "Порівняємо замовлення сайту у Codeworth та купівлю готового шаблону: час, якість, SEO, підтримка, унікальність. Чому бізнес обирає індивідуальну розробку.",
    seoDescEn:
      "Compare ordering a site from Codeworth vs buying a ready-made template: time, quality, SEO, support, uniqueness. Why businesses choose custom development.",
    verdictUk:
      "Шаблон підходить для тестування ідеї з мінімальними інвестиціями. Codeworth — коли ваш бізнес серйозний: потрібно відрізнятись від конкурентів, мати SEO у топі та підтримку без зайвих клопотів.",
    verdictEn:
      "A template is suitable for testing an idea with minimal investment. Codeworth is when your business is serious: you need to stand out from competitors, have top SEO rankings, and support without hassle.",
    competitorColor: "#8b5cf6",
    competitorBg: "from-violet-600 to-purple-700",
    rows: [
      { feature: "Унікальність дизайну", featureEn: "Design Uniqueness", Codeworth: "100% ексклюзивний під бренд", CodeworthEn: "100% exclusive for your brand", competitor: "Тисячі сайтів виглядають однаково", competitorEn: "Thousands of sites look identical", winner: "Codeworth" },
      { feature: "SEO з першого дня", featureEn: "SEO from Day One", Codeworth: "Вбудоване в структуру коду", CodeworthEn: "Built into code structure", competitor: "Часто шаблони мають поганий SEO-код", competitorEn: "Templates often have poor SEO code", winner: "Codeworth" },
      { feature: "PageSpeed", featureEn: "PageSpeed", Codeworth: "90–98", competitor: "50–75 (залежить від шаблону)", competitorEn: "50–75 (depends on template)", winner: "Codeworth" },
      { feature: "Ціна входу", featureEn: "Entry Price", Codeworth: "від 8 000 грн / від 4 900 грн (нішеве рішення)", CodeworthEn: "from $200 / from $125 (niche solution)", competitor: "$30–300", winner: "competitor" },
      { feature: "Час до запуску", featureEn: "Time to Launch", Codeworth: "5–30 днів", CodeworthEn: "5–30 days", competitor: "1–7 днів (без адаптації)", competitorEn: "1–7 days (without adaptation)", winner: "competitor" },
      { feature: "Адаптація під бренд", featureEn: "Brand Adaptation", Codeworth: "Включена (дизайнер)", CodeworthEn: "Included (designer)", competitor: "Самостійно або доп. оплата", competitorEn: "DIY or extra cost", winner: "Codeworth" },
      { feature: "Технічна підтримка", featureEn: "Technical Support", Codeworth: "Включена 1 місяць + тарифи", CodeworthEn: "Included 1 month + plans", competitor: "Немає (або платна)", competitorEn: "None (or paid)", winner: "Codeworth" },
      { feature: "Кастомні інтеграції", featureEn: "Custom Integrations", Codeworth: "Будь-які", CodeworthEn: "Any", competitor: "Обмежені або неможливі", competitorEn: "Limited or impossible", winner: "Codeworth" },
      { feature: "Гарантія безпеки", featureEn: "Security Guarantee", Codeworth: "Аудит безпеки + захищений стек", CodeworthEn: "Security audit + secure stack", competitor: "Часто вразливий код", competitorEn: "Often vulnerable code", winner: "Codeworth" },
      { feature: "Оновлення та підтримка коду", featureEn: "Code Updates & Maintenance", Codeworth: "Codeworth відповідає", CodeworthEn: "Codeworth is responsible", competitor: "Самостійно або не підтримується", competitorEn: "Self-maintained or unsupported", winner: "Codeworth" },
    ],
    useCasesCodeworthUk: ["Бізнес-сайт для серйозної компанії", "SEO-просування в Google", "Унікальний бренд важливіший за ціну", "Потрібні інтеграції та підтримка"],
    useCasesCodeworthEn: ["Business site for a serious company", "Google SEO promotion", "Unique brand matters more than price", "Integrations and support needed"],
    useCasesCompetitorUk: ["Тест MVP з нульовим бюджетом", "Особистий проєкт або хобі", "Разовий захід або промо-акція", "Нема часу на розробку взагалі"],
    useCasesCompetitorEn: ["MVP test with zero budget", "Personal project or hobby", "One-time event or promo action", "No time for development at all"],
  },
];

export function getCompare(slug: string): CompareData | undefined {
  return COMPARE_DATA.find((c) => c.slug === slug);
}

export const COMPARE_SLUGS = COMPARE_DATA.map((c) => c.slug);
