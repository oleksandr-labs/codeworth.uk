export interface Tool {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  category: "calculator" | "audit" | "checklist" | "generator";
  icon: string;
  href: string;
  isBuilt: boolean;
  badge?: string;
}

export const TOOLS: Tool[] = [
  {
    id: "website-cost-calculator",
    slug: "website-cost-calculator",
    title: "Калькулятор вартості сайту",
    titleEn: "Website Cost Calculator",
    description: "Інтерактивний калькулятор для оцінки вартості проєкту залежно від типу та функцій сайту.",
    descriptionEn: "Interactive calculator that estimates project cost based on site type and chosen features.",
    category: "calculator",
    icon: "💰",
    href: "tools/website-cost-calculator",
    isBuilt: true,
    badge: "Popular",
  },
  {
    id: "seo-checklist",
    slug: "seo-checklist",
    title: "SEO-чек-ліст запуску сайту",
    titleEn: "Website Launch SEO Checklist",
    description: "30-пунктовий інтерактивний чек-ліст для перевірки SEO перед запуском сайту.",
    descriptionEn: "30-point interactive checklist to verify SEO before launching a website.",
    category: "checklist",
    icon: "✅",
    href: "tools/seo-checklist",
    isBuilt: true,
  },
  {
    id: "page-speed-audit",
    slug: "page-speed-audit",
    title: "Аудит швидкості сторінки",
    titleEn: "Page Speed Audit Tool",
    description: "Введіть URL та отримайте оцінку Core Web Vitals та рекомендації щодо швидкості.",
    descriptionEn: "Enter a URL and get a Core Web Vitals estimate with speed improvement recommendations.",
    category: "audit",
    icon: "⚡",
    href: "tools/page-speed-audit",
    isBuilt: true,
    badge: "New",
  },
  {
    id: "meta-tag-generator",
    slug: "meta-tag-generator",
    title: "Генератор мета-тегів",
    titleEn: "Meta Tag Generator",
    description: "Заповніть заголовок, опис та ключові слова — отримайте готовий HTML-код мета-тегів.",
    descriptionEn: "Fill in title, description and keywords, then get the ready-to-paste HTML meta tags.",
    category: "generator",
    icon: "🏷",
    href: "tools/meta-tag-generator",
    isBuilt: true,
    badge: "Popular",
  },
  {
    id: "color-contrast-checker",
    slug: "color-contrast-checker",
    title: "Перевірка контрасту кольорів",
    titleEn: "Color Contrast Checker",
    description: "Інструмент перевірки коефіцієнта контрасту для забезпечення доступності інтерфейсу.",
    descriptionEn: "Accessibility contrast ratio tool to ensure your interface meets WCAG standards.",
    category: "audit",
    icon: "🎨",
    href: "tools/color-contrast-checker",
    isBuilt: true,
  },
  {
    id: "keyword-density-checker",
    slug: "keyword-density-checker",
    title: "Перевірка щільності ключових слів",
    titleEn: "Keyword Density Checker",
    description: "Вставте текст і отримайте аналіз частоти ключових слів та щільності контенту.",
    descriptionEn: "Paste text and get a keyword frequency analysis with content density insights.",
    category: "audit",
    icon: "🔍",
    href: "tools/keyword-density-checker",
    isBuilt: true,
  },
  {
    id: "mobile-readiness-checker",
    slug: "mobile-readiness-checker",
    title: "Перевірка мобільної готовності",
    titleEn: "Mobile Readiness Checker",
    description: "Чек-ліст для перевірки мобільної оптимізації сайту за всіма ключовими критеріями.",
    descriptionEn: "Checklist to verify mobile optimisation across all key criteria.",
    category: "checklist",
    icon: "📱",
    href: "tools/mobile-readiness-checker",
    isBuilt: true,
  },
  {
    id: "schema-generator",
    slug: "schema-generator",
    title: "Генератор Schema.org",
    titleEn: "Schema.org Generator",
    description: "Оберіть тип схеми, заповніть поля та отримайте готовий JSON-LD код для вашої сторінки.",
    descriptionEn: "Select a schema type, fill in the fields and get ready JSON-LD code for your page.",
    category: "generator",
    icon: "📋",
    href: "tools/schema-generator",
    isBuilt: true,
    badge: "New",
  },
  {
    id: "utm-builder",
    slug: "utm-builder",
    title: "Генератор UTM-посилань",
    titleEn: "UTM Link Builder",
    description: "Створюйте UTM-посилання для відстеження трафіку з різних маркетингових кампаній.",
    descriptionEn: "Build UTM tracking URLs to measure traffic from different marketing campaigns.",
    category: "generator",
    icon: "🔗",
    href: "tools/utm-builder",
    isBuilt: true,
  },
  {
    id: "robots-txt-generator",
    slug: "robots-txt-generator",
    title: "Генератор robots.txt",
    titleEn: "robots.txt Generator",
    description: "Оберіть параметри і отримайте готовий файл robots.txt для вашого сайту.",
    descriptionEn: "Select your options and get a ready robots.txt file for your website.",
    category: "generator",
    icon: "🤖",
    href: "tools/robots-txt-generator",
    isBuilt: true,
  },
];

export const TOOL_CATEGORIES: { id: string; labelUk: string; labelEn: string }[] = [
  { id: "all", labelUk: "Всі", labelEn: "All" },
  { id: "calculator", labelUk: "Калькулятор", labelEn: "Calculator" },
  { id: "audit", labelUk: "Аудит", labelEn: "Audit" },
  { id: "checklist", labelUk: "Чек-ліст", labelEn: "Checklist" },
  { id: "generator", labelUk: "Генератор", labelEn: "Generator" },
];
