export type ResourceCategory = "checklist" | "guide" | "template" | "tool" | "report";
export type ResourceFormat = "pdf" | "page" | "interactive";

export interface Resource {
  slug: string;
  titleUk: string;
  titleEn: string;
  descriptionUk: string;
  descriptionEn: string;
  category: ResourceCategory;
  format: ResourceFormat;
  emailRequired: boolean;
  relatedService?: string;
  tags: string[];
  updatedAt: string;
  isPopular?: boolean;
  readTime?: number; // minutes
  items?: string[]; // checklist items preview (uk)
  itemsEn?: string[]; // checklist items preview (en)
}

export const RESOURCE_CATEGORIES: { value: ResourceCategory; labelUk: string; labelEn: string; emoji: string }[] = [
  { value: "checklist", labelUk: "Чек-листи", labelEn: "Checklists", emoji: "✅" },
  { value: "guide", labelUk: "Гайди", labelEn: "Guides", emoji: "📖" },
  { value: "template", labelUk: "Шаблони", labelEn: "Templates", emoji: "📋" },
  { value: "tool", labelUk: "Інструменти", labelEn: "Tools", emoji: "🔧" },
  { value: "report", labelUk: "Звіти", labelEn: "Reports", emoji: "📊" },
];

export const RESOURCES: Resource[] = [
  {
    slug: "website-launch-checklist",
    titleUk: "Чек-ліст запуску сайту: 40 пунктів перед виходом в онлайн",
    titleEn: "Website Launch Checklist: 40 Points Before Going Live",
    descriptionUk:
      "Повний чек-ліст для перевірки сайту перед запуском: технічне SEO, безпека, форми, мобільна версія, аналітика та юридичні вимоги. Зберегли вам 5+ годин перевірок.",
    descriptionEn:
      "Complete pre-launch checklist: technical SEO, security, forms, mobile version, analytics, and legal requirements. Save yourself 5+ hours of manual checks.",
    category: "checklist",
    format: "interactive",
    emailRequired: false,
    relatedService: "website-dev",
    tags: ["SEO", "Безпека", "Launch", "Checklist"],
    updatedAt: "2026-01-15",
    isPopular: true,
    readTime: 15,
    items: [
      "SSL-сертифікат встановлено і HTTPS активний",
      "www → non-www redirect налаштований",
      "Sitemap.xml згенерований і переданий у Google Search Console",
      "Robots.txt перевірений — немає блокування важливих сторінок",
      "Всі форми протестовані та відправляють дані",
      "Мобільна версія перевірена на 3+ пристроях",
      "Google Analytics 4 підключений і відстежує події",
      "Schema.org розмітка додана на всіх сторінках",
      "OG-теги перевірені через Facebook Sharing Debugger",
      "404-сторінка кастомна і веде на головну",
    ],
    itemsEn: [
      "SSL certificate installed and HTTPS active",
      "www → non-www redirect configured",
      "Sitemap.xml generated and submitted to Google Search Console",
      "Robots.txt checked — no blocking of important pages",
      "All forms tested and sending data correctly",
      "Mobile version checked on 3+ devices",
      "Google Analytics 4 connected and tracking events",
      "Schema.org markup added on all pages",
      "OG tags verified via Facebook Sharing Debugger",
      "Custom 404 page redirects to homepage",
    ],
  },
  {
    slug: "seo-audit-checklist",
    titleUk: "SEO-аудит сайту самостійно: чек-ліст з 30 пунктів",
    titleEn: "DIY SEO Audit Checklist: 30-Point Guide",
    descriptionUk:
      "Перевірте SEO свого сайту за 30 пунктами: технічне SEO, On-Page, контент, мобільна версія. Без спеціальних знань — тільки конкретні дії.",
    descriptionEn:
      "Audit your website SEO with 30 checkpoints: technical SEO, On-Page, content, mobile. No specialized knowledge required — just concrete actions.",
    category: "checklist",
    format: "interactive",
    emailRequired: false,
    relatedService: "seo",
    tags: ["SEO", "Аудит", "Technical SEO"],
    updatedAt: "2026-02-10",
    isPopular: true,
    readTime: 20,
    items: [
      "Сайт доступний через HTTPS",
      "Robots.txt не блокує важливі сторінки",
      "Sitemap.xml присутній і актуальний",
      "Кожна сторінка має унікальний Title (50–60 символів)",
      "Кожна сторінка має унікальний Meta Description (150–160 символів)",
      "На кожній сторінці є один H1",
      "Всі зображення мають alt-атрибути",
      "Внутрішні посилання використовуються для зв'язку сторінок",
      "Сторінки завантажуються менше ніж за 3 секунди",
      "Core Web Vitals: LCP < 2.5с, CLS < 0.1",
    ],
  },
  {
    slug: "ux-conversion-checklist",
    titleUk: "UX-чек-ліст конверсійного сайту: 25 пунктів",
    titleEn: "UX Checklist for High-Converting Website: 25 Points",
    descriptionUk:
      "Перевірте UX вашого сайту за 25 пунктами: CTA, форми, соціальні докази, навігація. Підвищте конверсію без редизайну.",
    descriptionEn:
      "Audit your website UX with 25 checkpoints: CTAs, forms, social proof, navigation. Improve conversion without a redesign.",
    category: "checklist",
    format: "interactive",
    emailRequired: false,
    relatedService: "design",
    tags: ["UX", "Конверсія", "CTA"],
    updatedAt: "2026-01-20",
    readTime: 12,
    items: [
      "Головний CTA видимий без прокрутки (above the fold)",
      "CTA описує конкретну дію та вигоду",
      "Форма містить не більше 5 полів",
      "Є відгуки або соціальні докази на сторінці",
      "Телефон та email видимі у хедері",
      "Навігація зрозуміла з першого погляду",
      "Мобільне меню зручне — кнопки великі",
      "Сторінка завантажується менше ніж за 3 секунди",
    ],
  },
  {
    slug: "website-cost-guide",
    titleUk: "Скільки коштує створити сайт в Україні: повний гайд 2026",
    titleEn: "Website Development Cost in Ukraine: Complete 2026 Guide",
    descriptionUk:
      "Детальний гайд: ціни на розробку сайтів у 2026 році, порівняння виконавців (фрілансер/студія/конструктор), з чого складається ціна та де можна заощадити без шкоди для якості.",
    descriptionEn:
      "Detailed guide: website development prices in 2026, comparison of providers (freelancer/studio/builder), what makes up the cost, and where to save without sacrificing quality.",
    category: "guide",
    format: "page",
    emailRequired: false,
    relatedService: "website-dev",
    tags: ["Ціни", "Порівняння", "Бюджет"],
    updatedAt: "2026-01-01",
    isPopular: true,
    readTime: 12,
  },
  {
    slug: "seo-starter-guide",
    titleUk: "SEO для малого бізнесу: покроковий гайд для початківців",
    titleEn: "SEO for Small Business: Step-by-Step Beginner Guide",
    descriptionUk:
      "Покроковий гайд з SEO для власників бізнесу без технічного досвіду: ключові слова, технічне SEO, контент-стратегія, локальне SEO та відстеження результатів.",
    descriptionEn:
      "Step-by-step SEO guide for non-technical business owners: keywords, technical SEO, content strategy, local SEO, and results tracking.",
    category: "guide",
    format: "page",
    emailRequired: false,
    relatedService: "seo",
    tags: ["SEO", "Початківці", "Гайд"],
    updatedAt: "2026-02-01",
    readTime: 18,
  },
  {
    slug: "digital-marketing-guide",
    titleUk: "Цифровий маркетинг для МСБ: з чого почати у 2026",
    titleEn: "Digital Marketing for SMB: Where to Start in 2026",
    descriptionUk:
      "Огляд каналів цифрового маркетингу для малого та середнього бізнесу: SEO, контекстна реклама, SMM, email. Що обрати залежно від бюджету та ніші.",
    descriptionEn:
      "Overview of digital marketing channels for SMBs: SEO, paid ads, SMM, email. How to choose based on your budget and niche.",
    category: "guide",
    format: "page",
    emailRequired: false,
    relatedService: "ads",
    tags: ["Маркетинг", "SMM", "Реклама"],
    updatedAt: "2026-02-15",
    readTime: 14,
  },
  {
    slug: "content-plan-template",
    titleUk: "Шаблон контент-плану для соцмереж та блогу",
    titleEn: "Content Plan Template for Social Media and Blog",
    descriptionUk:
      "Готовий шаблон контент-плану в Google Sheets: дата, тема, канал, тип контенту, статус. Плануйте публікації на місяць вперед за 30 хвилин.",
    descriptionEn:
      "Ready-made Google Sheets content plan template: date, topic, channel, content type, status. Plan a month of content in 30 minutes.",
    category: "template",
    format: "pdf",
    emailRequired: true,
    relatedService: "smm",
    tags: ["Контент", "SMM", "Шаблон"],
    updatedAt: "2026-01-10",
    readTime: 5,
  },
  {
    slug: "sitemap-template",
    titleUk: "Шаблон структури сайту: ієрархія сторінок для бізнесу",
    titleEn: "Website Structure Template: Page Hierarchy for Business",
    descriptionUk:
      "Шаблон структури сайту для різних типів бізнесу: корпоративний сайт, лендінг, інтернет-магазин, портфоліо. Скопіюйте та адаптуйте під свій проєкт.",
    descriptionEn:
      "Website structure template for different business types: corporate site, landing page, e-commerce, portfolio. Copy and adapt for your project.",
    category: "template",
    format: "pdf",
    emailRequired: true,
    relatedService: "website-dev",
    tags: ["Структура", "Шаблон", "Планування"],
    updatedAt: "2026-01-25",
    readTime: 8,
  },
  {
    slug: "website-speed-test",
    titleUk: "Безкоштовний аналіз Core Web Vitals вашого сайту",
    titleEn: "Free Core Web Vitals Analysis for Your Website",
    descriptionUk:
      "Введіть URL вашого сайту та отримайте миттєвий аналіз Core Web Vitals: LCP, INP, CLS. Конкретні рекомендації щодо покращення швидкості.",
    descriptionEn:
      "Enter your website URL and get instant Core Web Vitals analysis: LCP, INP, CLS. Specific recommendations to improve speed.",
    category: "tool",
    format: "interactive",
    emailRequired: false,
    relatedService: "seo",
    tags: ["Core Web Vitals", "PageSpeed", "Інструмент"],
    updatedAt: "2026-03-01",
    isPopular: true,
    readTime: 2,
  },
];

export const RESOURCE_SLUGS = RESOURCES.map((r) => r.slug);

export function getResource(slug: string): Resource | undefined {
  return RESOURCES.find((r) => r.slug === slug);
}
