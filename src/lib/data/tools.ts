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
    id: "ml-bias-detector",
    slug: "ml-bias-detector",
    title: "ML Bias Detector",
    titleEn: "ML Bias Detector",
    description: "Перевірте дані на упередженість",
    descriptionEn: "Check training data for bias and fairness issues",
    category: "audit",
    icon: "📊",
    href: "tools/ml-bias-detector",
    isBuilt: true,
  },
  {
    id: "ml-data-quality-checker",
    slug: "ml-data-quality-checker",
    title: "ML Data Quality Checker",
    titleEn: "ML Data Quality Checker",
    description: "Оцініть якість даних для ML",
    descriptionEn: "Assess dataset quality for ML readiness",
    category: "audit",
    icon: "🎨",
    href: "tools/ml-data-quality-checker",
    isBuilt: true,
  },
  {
    id: "ml-cost-estimator",
    slug: "ml-cost-estimator",
    title: "ML Project Cost Estimator",
    titleEn: "ML Project Cost Estimator",
    description: "Розрахуйте бюджет ML-проєкту",
    descriptionEn: "Estimate ML project budget and timeline",
    category: "calculator",
    icon: "🏷️",
    href: "tools/ml-cost-estimator",
    isBuilt: true,
  },
  {
    id: "llm-prompt-evaluator",
    slug: "llm-prompt-evaluator",
    title: "LLM Prompt Evaluator",
    titleEn: "LLM Prompt Evaluator",
    description: "Оцініть ефективність LLM-промптів",
    descriptionEn: "Evaluate and optimise LLM prompt quality",
    category: "audit",
    icon: "🔗",
    href: "tools/llm-prompt-evaluator",
    isBuilt: true,
  },
  {
    id: "ml-deployment-checklist",
    slug: "ml-deployment-checklist",
    title: "ML Deployment Checklist",
    titleEn: "ML Deployment Checklist",
    description: "Перевірте готовність моделі до деплою",
    descriptionEn: "Verify ML model is ready for production deployment",
    category: "checklist",
    icon: "🤖",
    href: "tools/ml-deployment-checklist",
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
