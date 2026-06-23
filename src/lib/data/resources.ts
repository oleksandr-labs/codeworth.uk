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
    slug: "ml-roi-checklist",
    titleUk: "Чек-ліст оцінки ROI від ML: 30 питань перед інвестицією в машинне навчання",
    titleEn: "ML ROI Assessment Checklist: 30 Questions Before Investing in Machine Learning",
    descriptionUk:
      "Практичний чек-ліст для оцінки готовності бізнесу до ML та розрахунку очікуваного ROI. Охоплює якість даних, бізнес-кейс, технічну інфраструктуру та регуляторні вимоги. Збережіть 10+ годин попереднього аналізу.",
    descriptionEn:
      "Practical checklist for assessing your business readiness for ML and calculating expected ROI. Covers data quality, business case, technical infrastructure, and regulatory requirements. Save 10+ hours of preliminary analysis.",
    category: "checklist",
    format: "interactive",
    emailRequired: false,
    relatedService: "machine-learning",
    tags: ["ROI", "ML readiness", "business case", "data quality"],
    updatedAt: "2026-06-01",
    isPopular: true,
    readTime: 20,
    items: [
      "Чи є у вас щонайменше 12 місяців historical даних по цільовій метриці?",
      "Чи можете ви кількісно виразити фінансовий вплив проблеми, яку вирішує ML?",
      "Чи призначений власник ML-проєкту (product owner + data owner)?",
      "Чи визначено baseline (поточна продуктивність без ML)?",
      "Чи є у вас план для A/B тестування ML-рішення?",
      "Чи збираєте ви feedback/outcome labels для supervised learning?",
      "Чи розуміє бізнес різницю між accuracy та business metric?",
      "Чи є план для monitoring та retraining після деплою?",
    ],
    itemsEn: [
      "Do you have at least 12 months of historical data on the target metric?",
      "Can you quantify the financial impact of the problem ML will solve?",
      "Is there a designated ML project owner (product owner + data owner)?",
      "Have you defined the baseline (current performance without ML)?",
      "Do you have a plan for A/B testing the ML solution?",
      "Are you collecting feedback/outcome labels for supervised learning?",
      "Does the business understand the difference between accuracy and business metric?",
      "Is there a plan for monitoring and retraining after deployment?",
    ],
  },
  {
    slug: "mlops-production-checklist",
    titleUk: "MLOps чек-ліст: 35 кроків для надійного деплою ML у production",
    titleEn: "MLOps Production Checklist: 35 Steps for Reliable ML Deployment",
    descriptionUk:
      "Повний чек-ліст MLOps від data versioning до production monitoring. Охоплює CI/CD pipeline, model registry, drift monitoring, rollback procedure та compliance documentation для regulated industries.",
    descriptionEn:
      "Complete MLOps checklist from data versioning to production monitoring. Covers CI/CD pipeline, model registry, drift monitoring, rollback procedures, and compliance documentation for regulated industries.",
    category: "checklist",
    format: "interactive",
    emailRequired: false,
    relatedService: "mlops",
    tags: ["MLOps", "CI/CD", "model monitoring", "production", "MLflow"],
    updatedAt: "2026-06-01",
    isPopular: true,
    readTime: 25,
    items: [
      "Data versioning налаштовано (DVC або Delta Lake)",
      "Reproducible training pipeline (фіксовані random seeds + requirements.txt)",
      "Model registry налаштований (MLflow / W&B / SageMaker Registry)",
      "Unit тести на data validation (Great Expectations / Pydantic)",
      "Model performance regression tests у CI pipeline",
      "Champion-challenger A/B test framework налаштовано",
      "Feature drift monitoring (Evidently AI / WhyLabs)",
      "Rollback procedure документована та протестована",
      "Automated retraining trigger налаштовано (drift threshold / schedule)",
      "Audit log для всіх model version predictions (FCA/GDPR requirement)",
    ],
    itemsEn: [
      "Data versioning configured (DVC or Delta Lake)",
      "Reproducible training pipeline (fixed random seeds + requirements.txt)",
      "Model registry set up (MLflow / W&B / SageMaker Registry)",
      "Unit tests on data validation (Great Expectations / Pydantic)",
      "Model performance regression tests in CI pipeline",
      "Champion-challenger A/B test framework configured",
      "Feature drift monitoring enabled (Evidently AI / WhyLabs)",
      "Rollback procedure documented and tested",
      "Automated retraining trigger set (drift threshold / schedule)",
      "Audit log for all model version predictions (FCA/GDPR requirement)",
    ],
  },
  {
    slug: "ml-vendor-selection-template",
    titleUk: "Шаблон RFP для вибору ML-вендора: 50 питань для оцінки агентства чи консультанта",
    titleEn: "ML Vendor RFP Template: 50 Questions for Evaluating an ML Agency or Consultant",
    descriptionUk:
      "Готовий шаблон запиту пропозицій (RFP) для вибору ML-агентства або консультанта. 50 структурованих питань по технічній компетентності, MLOps, безпеці, compliance та ціноутворенню.",
    descriptionEn:
      "Ready-to-use RFP template for selecting an ML agency or consultant. 50 structured questions covering technical competency, MLOps maturity, security, regulatory compliance, and pricing transparency.",
    category: "template",
    format: "page",
    emailRequired: false,
    relatedService: "machine-learning",
    tags: ["RFP", "vendor selection", "ML procurement", "due diligence"],
    updatedAt: "2026-06-01",
    isPopular: false,
    readTime: 30,
    items: [
      "Наведіть 3 завершених ML-проєкти зі схожою складністю. Які метрики ROI досягли клієнти?",
      "Який ваш процес оцінки якості даних перед початком проєкту?",
      "Як ви обробляєте class imbalance у fraud detection / churn prediction?",
      "Опишіть ваш підхід до ML monitoring та drift detection у production.",
      "Чи маєте ви досвід з FCA/MHRA/NHS DSPT compliance?",
      "Яка ваша політика щодо ownership ML-артефактів (моделі, коду, даних)?",
      "Як ви забезпечуєте reproducibility тренування?",
      "Опишіть ваш SLA на retraining при деградації моделі.",
    ],
    itemsEn: [
      "List 3 completed ML projects of similar complexity. What ROI metrics did clients achieve?",
      "What is your process for assessing data quality before starting a project?",
      "How do you handle class imbalance in fraud detection / churn prediction?",
      "Describe your approach to ML monitoring and drift detection in production.",
      "Do you have experience with FCA/MHRA/NHS DSPT compliance?",
      "What is your policy on ML artifact ownership (models, code, data)?",
      "How do you ensure training reproducibility?",
      "Describe your SLA for model retraining on performance degradation.",
    ],
  },
  {
    slug: "ml-data-audit-guide",
    titleUk: "Гайд з ML Data Audit: як оцінити якість даних перед ML-проєктом",
    titleEn: "ML Data Audit Guide: How to Assess Data Quality Before an ML Project",
    descriptionUk:
      "Покроковий гайд з проведення data audit для ML. Охоплює оцінку completeness, consistency, accuracy та timeliness даних. Містить Python-скрипти для автоматичного profiling та список red flags.",
    descriptionEn:
      "Step-by-step guide to running a data audit for ML. Covers completeness, consistency, accuracy, and timeliness assessment. Includes Python snippets for automated profiling and a red flag checklist.",
    category: "guide",
    format: "page",
    emailRequired: false,
    relatedService: "machine-learning",
    tags: ["data quality", "data audit", "EDA", "feature engineering"],
    updatedAt: "2026-06-01",
    isPopular: false,
    readTime: 18,
    items: [
      "Completeness: частка missing values по кожній фічі (поріг: >20% = red flag)",
      "Consistency: перевірка referential integrity між таблицями",
      "Accuracy: порівняння з зовнішніми джерелами для ключових метрик",
      "Timeliness: чи є lag між подією та записом у даних?",
      "Class balance: перевірка target distribution (imbalance ratio)",
      "Data leakage audit: чи є в train-set дані, недоступні в production?",
      "Schema drift: чи змінювались схеми таблиць з часом?",
      "Volume trend: чи є аномальні спади в обсязі даних (gap detection)?",
    ],
    itemsEn: [
      "Completeness: missing values rate per feature (threshold: >20% = red flag)",
      "Consistency: check referential integrity between tables",
      "Accuracy: compare key metrics against external authoritative sources",
      "Timeliness: is there lag between event occurrence and data recording?",
      "Class balance: check target distribution (imbalance ratio for classification)",
      "Data leakage audit: does train set contain data unavailable in production?",
      "Schema drift: have table schemas changed over time?",
      "Volume trend: are there anomalous dips in data volume (gap detection)?",
    ],
  },
  {
    slug: "uk-ml-market-report-2026",
    titleUk: "Звіт: ринок машинного навчання у Великобританії 2026 — тренди, зарплати, ROI",
    titleEn: "UK Machine Learning Market Report 2026: Trends, Salaries, and ROI Benchmarks",
    descriptionUk:
      "Аналіз стану ринку ML у Великобританії: зростання по галузях, середні зарплати data scientists по містах, типові ROI по use cases та прогноз на 2027. Базується на публічних даних ONS, LinkedIn та реальних кейсах клієнтів.",
    descriptionEn:
      "Analysis of the UK ML market: sector-by-sector growth, average data scientist salaries by city, typical ROI benchmarks by use case, and a 2027 outlook. Based on ONS public data, LinkedIn salary surveys, and client case studies.",
    category: "report",
    format: "page",
    emailRequired: false,
    relatedService: "machine-learning",
    tags: ["UK market", "ML trends", "data science salaries", "ROI benchmarks", "2026"],
    updatedAt: "2026-06-01",
    isPopular: true,
    readTime: 22,
    items: [
      "Ринок AI/ML у UK: $4.2B у 2025, прогноз $11.8B до 2030 (CAGR 23%)",
      "Topові галузі-адаптери: фінансові послуги (34%), охорона здоров'я (21%), рітейл (18%)",
      "Середня зарплата Data Scientist: Лондон £72k, Манчестер £55k, Единбург £58k",
      "ML фрілансер UK: £600–£1,200/день залежно від спеціалізації",
      "Типовий ROI fraud detection: окупність 3–6 місяців, ROI 300–500%",
      "Топ ML-перешкод для UK SMBs: брак даних (42%), невизначеність ROI (38%), дефіцит ML-кадрів (35%)",
    ],
    itemsEn: [
      "UK AI/ML market: $4.2B in 2025, forecast $11.8B by 2030 (CAGR 23%)",
      "Top adopting sectors: financial services (34%), healthcare (21%), retail (18%)",
      "Average Data Scientist salary: London £72k, Manchester £55k, Edinburgh £58k",
      "ML freelancer UK: £600–£1,200/day depending on specialisation",
      "Typical fraud detection ROI: payback 3–6 months, ROI 300–500%",
      "Top ML barriers for UK SMBs: data gaps (42%), ROI uncertainty (38%), ML talent shortage (35%)",
    ],
  },
  {
    slug: "fca-ml-compliance-guide",
    titleUk: "Гайд FCA ML Compliance: що потрібно знати фінтех-компаніям про ML у 2026",
    titleEn: "FCA ML Compliance Guide: What UK FinTech Companies Need to Know About ML in 2026",
    descriptionUk:
      "Практичний огляд регуляторних вимог FCA до ML-моделей: SS1/23 Model Risk Management, UK GDPR Article 22 (автоматизовані рішення), Consumer Duty та вимоги до explainability. Включає чек-ліст compliance gaps.",
    descriptionEn:
      "Practical overview of FCA regulatory requirements for ML models: SS1/23 Model Risk Management, UK GDPR Article 22 (automated decisions), Consumer Duty, and explainability requirements. Includes compliance gap checklist.",
    category: "guide",
    format: "page",
    emailRequired: false,
    relatedService: "machine-learning",
    tags: ["FCA", "ML compliance", "Model Risk Management", "SS1/23", "Consumer Duty"],
    updatedAt: "2026-06-01",
    isPopular: true,
    readTime: 20,
    items: [
      "FCA SS1/23: моделі 'high-risk' вимагають Model Risk Management framework",
      "UK GDPR Article 22: право на пояснення для автоматизованих рішень (SHAP/LIME)",
      "Consumer Duty (2023): ML-моделі не повинні disadvantage vulnerable customers",
      "PRA Supervisory Statement: стрес-тестування моделей, challenger models",
      "Anti-money laundering (AMLR): документування ML-рішень у AML процесах",
      "ICO Guidance (2023): explainability та fairness аудити для AI в credit",
    ],
    itemsEn: [
      "FCA SS1/23: 'high-risk' models require a Model Risk Management framework",
      "UK GDPR Article 22: right to explanation for automated decisions (SHAP/LIME)",
      "Consumer Duty (2023): ML models must not disadvantage vulnerable customers",
      "PRA Supervisory Statement: model stress testing, challenger models required",
      "Anti-money laundering: document ML decision logic in AML workflows",
      "ICO Guidance (2023): explainability and fairness audits for AI in credit decisions",
    ],
  },
  {
    slug: "ml-project-brief-template",
    titleUk: "Шаблон ML Project Brief: як правильно сформулювати технічне завдання для ML-проєкту",
    titleEn: "ML Project Brief Template: How to Write a Machine Learning Technical Brief",
    descriptionUk:
      "Готовий шаблон технічного завдання для ML-проєкту. Включає секції: бізнес-проблема, target variable, success metrics, data sources, constraints, timeline та budget. Допомагає отримувати точніші пропозиції від ML-вендорів.",
    descriptionEn:
      "Ready-to-use ML project brief template. Includes sections: business problem, target variable, success metrics, data sources, constraints, timeline, and budget. Helps you get more accurate proposals from ML vendors.",
    category: "template",
    format: "page",
    emailRequired: false,
    relatedService: "machine-learning",
    tags: ["ML project", "technical brief", "RFP", "project management"],
    updatedAt: "2026-06-01",
    isPopular: false,
    readTime: 15,
    items: [
      "Business problem: опис проблеми у фінансових термінах (£/рік)",
      "Target variable: що саме передбачає ML (label definition)",
      "Success metrics: primary KPI (business) та secondary KPI (ML)",
      "Data sources: перелік доступних датасетів з обсягом та форматом",
      "Constraints: regulatory (GDPR/FCA), latency, infrastructure",
      "Baseline: поточна продуктивність без ML",
      "Timeline: очікувані milestones (PoC / pilot / production)",
      "Budget range: орієнтовний бюджет або cost-per-outcome очікування",
    ],
    itemsEn: [
      "Business problem: describe the problem in financial terms (£/year impact)",
      "Target variable: what exactly does ML predict (label definition)",
      "Success metrics: primary KPI (business outcome) and secondary KPI (ML metric)",
      "Data sources: list of available datasets with volume and format",
      "Constraints: regulatory (GDPR/FCA), latency requirements, infrastructure limits",
      "Baseline: current performance without ML",
      "Timeline: expected milestones (PoC / pilot / production)",
      "Budget range: indicative budget or cost-per-outcome expectations",
    ],
  },
];

export const RESOURCE_SLUGS = RESOURCES.map((r) => r.slug);

export function getResource(slug: string): Resource | undefined {
  return RESOURCES.find((r) => r.slug === slug);
}
