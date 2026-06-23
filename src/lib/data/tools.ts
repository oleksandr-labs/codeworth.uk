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
    id: "ml-roi-calculator",
    slug: "ml-roi-calculator",
    title: "Калькулятор ROI ML-проєкту",
    titleEn: "ML Project ROI Calculator",
    description: "Оцінка вартості ML-проєкту та очікуваного ROI за 4 кроки: тип задачі, стан даних, тип деплою, терміни.",
    descriptionEn: "Estimate your ML project cost and expected ROI in 4 steps: problem type, data readiness, deployment, timeline.",
    category: "calculator",
    icon: "🤖",
    href: "tools/ml-roi-calculator",
    isBuilt: true,
    badge: "New",
  },
  {
    id: "mlops-checklist",
    slug: "mlops-checklist",
    title: "MLOps Production Checklist",
    titleEn: "MLOps Production Checklist",
    description: "30-пунктовий чек-ліст готовності ML-моделі до production: data pipeline, versioning, monitoring, alerting.",
    descriptionEn: "30-point checklist for ML model production readiness: data pipeline, versioning, monitoring, alerting.",
    category: "checklist",
    icon: "✅",
    href: "tools/mlops-checklist",
    isBuilt: false,
  },
  {
    id: "ml-readiness-audit",
    slug: "ml-readiness-audit",
    title: "Аудит готовності до ML",
    titleEn: "ML Readiness Audit",
    description: "Оцініть готовність вашого бізнесу до впровадження ML: дані, інфраструктура, команда, бізнес-процеси.",
    descriptionEn: "Assess your business's readiness for ML adoption: data, infrastructure, team, business processes.",
    category: "audit",
    icon: "🔍",
    href: "tools/ml-readiness-audit",
    isBuilt: false,
    badge: "Soon",
  },
  {
    id: "model-card-generator",
    slug: "model-card-generator",
    title: "Генератор ML Model Card",
    titleEn: "ML Model Card Generator",
    description: "Заповніть параметри моделі та отримайте готовий Model Card для документації, compliance та investor deck.",
    descriptionEn: "Fill in model parameters and get a ready Model Card for documentation, compliance, and investor decks.",
    category: "generator",
    icon: "📋",
    href: "tools/model-card-generator",
    isBuilt: false,
  },
  {
    id: "fca-ml-compliance-checklist",
    slug: "fca-ml-compliance-checklist",
    title: "FCA ML Compliance Checklist",
    titleEn: "FCA ML Compliance Checklist",
    description: "Чек-ліст відповідності ML-моделі вимогам FCA SS1/23 Model Risk Management та UK GDPR Article 22.",
    descriptionEn: "Checklist for ML model compliance with FCA SS1/23 Model Risk Management and UK GDPR Article 22.",
    category: "checklist",
    icon: "🏛️",
    href: "tools/fca-ml-compliance-checklist",
    isBuilt: false,
    badge: "Soon",
  },
  {
    id: "keyword-density-checker",
    slug: "keyword-density-checker",
    title: "Аналіз щільності ключових слів",
    titleEn: "Keyword Density Analyser",
    description: "Вставте текст і отримайте аналіз частоти ключових слів та щільності контенту.",
    descriptionEn: "Paste text and get a keyword frequency analysis with content density insights.",
    category: "audit",
    icon: "📊",
    href: "tools/keyword-density-checker",
    isBuilt: true,
  },
  {
    id: "color-contrast-checker",
    slug: "color-contrast-checker",
    title: "Перевірка контрасту кольорів",
    titleEn: "Color Contrast Checker",
    description: "Інструмент перевірки коефіцієнта контрасту для забезпечення доступності інтерфейсу (WCAG 2.1).",
    descriptionEn: "Accessibility contrast ratio tool to ensure your interface meets WCAG 2.1 standards.",
    category: "audit",
    icon: "🎨",
    href: "tools/color-contrast-checker",
    isBuilt: true,
  },
  {
    id: "schema-generator",
    slug: "schema-generator",
    title: "Генератор Schema.org JSON-LD",
    titleEn: "Schema.org JSON-LD Generator",
    description: "Оберіть тип схеми, заповніть поля та отримайте готовий JSON-LD код для вашої сторінки.",
    descriptionEn: "Select a schema type, fill in the fields and get ready JSON-LD code for your page.",
    category: "generator",
    icon: "🏷️",
    href: "tools/schema-generator",
    isBuilt: true,
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
  { id: "all",        labelUk: "Всі",          labelEn: "All"         },
  { id: "calculator", labelUk: "Калькулятор",  labelEn: "Calculator"  },
  { id: "audit",      labelUk: "Аудит",        labelEn: "Audit"       },
  { id: "checklist",  labelUk: "Чек-ліст",     labelEn: "Checklist"   },
  { id: "generator",  labelUk: "Генератор",    labelEn: "Generator"   },
];
