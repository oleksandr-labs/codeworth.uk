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
  {
    slug: "uk-ai-safety-institute-guide",
    titleUk: "UK AI Safety Institute: Фреймворк тестування передових AI-систем",
    titleEn: "UK AI Safety Institute: Frontier AI Testing Framework",
    descriptionUk:
      "Практичний гайд по фреймворку оцінки безпеки AISI для організацій, що розгортають передові AI-системи у Великій Британії. Охоплює методологію оцінки ризиків, вимоги до тестування, протоколи red-teaming та порядок взаємодії з регуляторами. Ключовий ресурс для UK-компаній, що використовують великі мовні моделі або агентні AI-системи.",
    descriptionEn:
      "Practical guide to the AISI safety evaluation framework for UK organisations deploying advanced AI systems. Covers risk assessment methodology, testing requirements, red-teaming protocols, and regulator engagement. Essential reading for UK companies leveraging large language models or agentic AI systems.",
    category: "guide",
    format: "page",
    emailRequired: false,
    relatedService: "machine-learning",
    tags: ["AI safety", "AISI", "frontier AI", "UK regulation", "LLM testing", "red-teaming"],
    updatedAt: "2026-06-01",
    isPopular: true,
    readTime: 22,
  },
  {
    slug: "innovate-uk-ai-grant-guide-2026",
    titleUk: "Innovate UK: Повний гайд по грантах на AI та Data-проєкти 2026",
    titleEn: "Innovate UK AI & Data Grants: Complete Guide 2026",
    descriptionUk:
      "Детальний огляд усіх потоків фінансування Innovate UK для AI/ML-проєктів у 2026 році. Охоплює програми Smart Grants (£25k–£500k), Accelerated Knowledge Transfer, партнерства з Catapult-центрами та критерії відбору. Покрокові поради щодо структурування проєкту та оформлення заявки для максимізації шансів на успіх.",
    descriptionEn:
      "Comprehensive overview of all Innovate UK funding streams for AI/ML projects in 2026. Covers Smart Grants (£25k–£500k), Accelerated Knowledge Transfer, Catapult programme partnerships, and eligibility criteria. Step-by-step guidance on project structuring and application writing to maximise your chances of success.",
    category: "guide",
    format: "page",
    emailRequired: false,
    relatedService: "machine-learning",
    tags: ["Innovate UK", "AI grants", "funding", "Smart Grants", "Catapult", "R&D tax relief"],
    updatedAt: "2026-06-01",
    isPopular: true,
    readTime: 25,
  },
  {
    slug: "fca-ai-lab-ml-finance",
    titleEn: "FCA AI Lab: ML Applications in UK Financial Services",
    titleUk: "FCA AI Lab: застосування ML у фінансових послугах Великої Британії",
    descriptionUk:
      "Аналітичний звіт на основі висновків регуляторного пісочниці FCA AI Lab: затверджені use-cases ML у фінтеху, страхуванні та кредитуванні. Охоплює вимоги щодо пояснюваності рішень, наслідки Consumer Duty для AI-систем та практичні настанови для ліцензованих фірм, що впроваджують автоматизоване прийняття рішень.",
    descriptionEn:
      "Analytical report drawn from FCA AI Lab regulatory sandbox findings: approved ML use cases in fintech, insurance, and credit. Covers explainability requirements, Consumer Duty implications for AI systems, and practical guidance for regulated firms implementing automated decision-making under UK financial services law.",
    category: "report",
    format: "page",
    emailRequired: false,
    relatedService: "machine-learning",
    tags: ["FCA", "AI Lab", "fintech", "Consumer Duty", "explainability", "automated decisions", "UK finance"],
    updatedAt: "2026-06-01",
    isPopular: true,
    readTime: 28,
  },
  {
    slug: "alan-turing-institute-priorities-2026",
    titleEn: "Alan Turing Institute: UK AI & ML Research Priorities 2026",
    titleUk: "Alan Turing Institute: пріоритети AI та ML досліджень у Великій Британії 2026",
    descriptionUk:
      "Огляд стратегічного дослідницького порядку денного Інституту Алана Тюрінга на 2026 рік: безпечний AI, кліматичне ML, охорона здоров'я, економічна стійкість. Охоплює ключові академічно-промислові партнерства, програму Turing Fellowships та напрямки, що отримують пріоритетне фінансування. Корисно для UK ML-команд, що хочуть відстежувати національні R&D-пріоритети та можливості спільних досліджень.",
    descriptionEn:
      "Overview of the Alan Turing Institute's 2026 strategic research agenda: safe AI, climate ML, healthcare AI, and economic resilience. Covers key academic-industry partnerships, Turing Fellowships programme, and priority-funded research directions. Essential for UK ML teams benchmarking against national R&D priorities and exploring collaborative research opportunities.",
    category: "report",
    format: "page",
    emailRequired: false,
    relatedService: "machine-learning",
    tags: ["Alan Turing Institute", "UK AI research", "safe AI", "climate ML", "healthcare AI", "Turing Fellowships"],
    updatedAt: "2026-06-01",
    isPopular: false,
    readTime: 20,
  },
  {
    slug: "ico-ml-uk-gdpr-compliance",
    titleEn: "ICO Guide: ML Projects and UK GDPR Compliance",
    titleUk: "Гайд ICO: ML-проєкти та відповідність UK GDPR",
    descriptionUk:
      "Практичний посібник ICO з дотримання вимог UK GDPR у ML-проєктах. Охоплює проведення DPIA (оцінки впливу на захист даних), статтю 22 щодо автоматизованого прийняття рішень, законні підстави для навчання ML-моделей, право на пояснення та стандарти анонімізації. Незамінний ресурс для дата-інженерів і ML-команд у регульованих секторах.",
    descriptionEn:
      "Practical ICO guidance on UK GDPR compliance for ML projects. Covers conducting DPIAs for ML systems, Article 22 automated decision-making restrictions, lawful bases for ML training data, right to explanation requirements, and anonymisation standards. Essential for data engineers and ML teams operating in regulated UK sectors.",
    category: "guide",
    format: "page",
    emailRequired: false,
    relatedService: "machine-learning",
    tags: ["ICO", "UK GDPR", "DPIA", "automated decisions", "data protection", "Article 22", "anonymisation"],
    updatedAt: "2026-06-01",
    isPopular: true,
    readTime: 24,
  },
  {
    slug: "nhs-digital-ai-framework-2026",
    titleEn: "NHS Digital AI Framework: Deploying ML in Healthcare",
    titleUk: "Фреймворк NHS Digital AI: розгортання ML у системі охорони здоров'я",
    descriptionUk:
      "Офіційний фреймворк NHS Digital для клінічного впровадження AI. Охоплює вимоги DSPT (Data Security & Protection Toolkit), клінічну безпеку DCB0129/DCB0160, підходи до пояснюваності для клінічного персоналу та шлях сертифікації через NHS AI Lab. Обов'язковий ресурс для healthtech-компаній та лікарень, що впроваджують ML-рішення в NHS.",
    descriptionEn:
      "Official NHS Digital framework for clinical AI deployment in UK healthcare. Covers DSPT (Data Security & Protection Toolkit) compliance, clinical safety standards DCB0129/DCB0160, explainability approaches for clinical staff, and the NHS AI Lab approved deployment pathway. Mandatory reading for healthtech companies and NHS trusts implementing ML solutions.",
    category: "guide",
    format: "page",
    emailRequired: false,
    relatedService: "machine-learning",
    tags: ["NHS", "healthcare AI", "DSPT", "clinical safety", "DCB0129", "NHS AI Lab", "healthtech UK"],
    updatedAt: "2026-06-01",
    isPopular: false,
    readTime: 26,
  },
  {
    slug: "uk-ai-regulation-white-paper",
    titleEn: "UK Government AI Regulation: White Paper Business Guide",
    titleUk: "Регулювання AI у Великій Британії: практичний гайд по Білій книзі для бізнесу",
    descriptionUk:
      "Практичний огляд проінноваційного підходу Уряду Великої Британії до регулювання AI (на противагу EU AI Act). Пояснює 5 ключових принципів (безпека, захищеність, справедливість, підзвітність, можливість оскарження), розподіл відповідальності між секторальними регуляторами та конкретні дії, які UK-компанії повинні вжити вже сьогодні. Включає порівняння з вимогами EU AI Act для транскордонних операцій.",
    descriptionEn:
      "Practical overview of the UK Government's pro-innovation AI regulation approach versus the EU AI Act. Explains the 5 core principles (safety, security, fairness, accountability, contestability), sector regulator responsibility framework, and concrete actions UK businesses must take now. Includes comparison with EU AI Act requirements for cross-border operations.",
    category: "report",
    format: "page",
    emailRequired: false,
    relatedService: "machine-learning",
    tags: ["UK AI regulation", "White Paper", "EU AI Act", "AI governance", "compliance", "pro-innovation", "sector regulators"],
    updatedAt: "2026-06-01",
    isPopular: true,
    readTime: 18,
  },
  {
    slug: "ofcom-online-safety-ai-guide",
    titleUk: "Посібник Ofcom щодо ШІ в Законі про онлайн-безпеку: зобов'язання платформ",
    titleEn: "Ofcom Online Safety Act AI Guide: Obligations for UK Platforms",
    descriptionUk:
      "Офіційне керівництво Ofcom щодо зобов'язань у сфері ШІ для UK-платформ відповідно до Закону про онлайн-безпеку. Охоплює модерацію контенту, створеного ШІ, вимоги до прозорості та звітності. Обов'язковий документ для онлайн-сервісів.",
    descriptionEn:
      "Official Ofcom guidance on AI obligations for UK platforms under the Online Safety Act. Covers AI-generated content moderation, transparency requirements, and reporting obligations. Essential reading for any online service operating in the UK.",
    category: "guide",
    format: "page",
    emailRequired: false,
    tags: ["Ofcom", "Online Safety Act", "AI content moderation", "UK platforms", "transparency", "compliance"],
    updatedAt: "2026-06-01",
    readTime: 14,
  },
  {
    slug: "nhs-ai-lab-evaluation-framework",
    titleUk: "Фреймворк SAFE від NHS AI Lab: стандарти оцінки клінічного ШІ",
    titleEn: "NHS AI Lab SAFE Evaluation Framework: Evidence Standards for Clinical AI",
    descriptionUk:
      "Фреймворк SAFE (Safety, Accuracy, Fairness, Explainability) від NHS AI Lab для валідації клінічних рішень на основі ШІ. Визначає стандарти доказової бази, необхідні для розгортання в NHS, та вимоги до клінічних випробувань.",
    descriptionEn:
      "The NHS AI Lab SAFE (Safety, Accuracy, Fairness, Explainability) validation framework for clinical AI solutions. Defines the evidence standards required for NHS deployment, clinical trial requirements, and post-market surveillance expectations.",
    category: "guide",
    format: "pdf",
    emailRequired: false,
    tags: ["NHS AI Lab", "clinical AI", "SAFE framework", "validation", "healthcare", "UK health tech"],
    updatedAt: "2026-06-01",
    readTime: 20,
  },
  {
    slug: "ukri-responsible-ai-programme",
    titleUk: "Програма відповідального ШІ UKRI: пріоритети фінансування 2024–2027",
    titleEn: "UKRI Responsible AI Programme: £36M Funding Streams 2024–2027",
    descriptionUk:
      "Огляд програми відповідального ШІ Ради з досліджень та інновацій Великої Британії (UKRI) з бюджетом £36 млн на 2024–2027 роки. Охоплює пріоритети досліджень, умови подачі заявок, партнерства промисловості та академії.",
    descriptionEn:
      "Overview of the UK Research and Innovation (UKRI) Responsible AI programme committing £36M for 2024–2027. Covers research priorities, application eligibility, industry-academia partnership models, and expected deliverables for funded projects.",
    category: "report",
    format: "page",
    emailRequired: false,
    tags: ["UKRI", "responsible AI", "research funding", "UK innovation", "2024-2027", "AI research"],
    updatedAt: "2026-06-01",
    readTime: 12,
  },
  {
    slug: "cdei-portfolio-algorithmic-tools",
    titleUk: "Портфоліо алгоритмічних інструментів CDEI у держсекторі Великої Британії",
    titleEn: "CDEI Portfolio of Algorithmic Tools in UK Public Sector",
    descriptionUk:
      "Аналіз Центру з питань етики даних та інновацій (CDEI) щодо використання алгоритмічних інструментів у держсекторі Великої Британії. Документує застосування в охороні здоров'я, поліції, освіті та соціальних послугах із оцінкою ризиків.",
    descriptionEn:
      "The Centre for Data Ethics and Innovation (CDEI) portfolio cataloguing algorithmic tool deployments across UK public sector organisations. Documents use cases in health, policing, education, and social services with risk assessments and accountability mechanisms.",
    category: "report",
    format: "pdf",
    emailRequired: false,
    tags: ["CDEI", "algorithmic tools", "public sector", "data ethics", "AI accountability", "UK government"],
    updatedAt: "2026-06-01",
    readTime: 22,
  },
  {
    slug: "deloitte-uk-ai-adoption-2026",
    titleUk: "Deloitte UK: дослідження впровадження ШІ 2026 — показники по галузях і ROI",
    titleEn: "Deloitte UK AI Adoption Survey 2026: Industry Rates, Barriers and ROI",
    descriptionUk:
      "Щорічне дослідження Deloitte UK охоплює понад 1 000 організацій. Аналізує показники впровадження ШІ по секторах, ключові бар'єри (дефіцит кадрів, якість даних, регулювання), задокументований ROI та прогнози на 2027 рік.",
    descriptionEn:
      "Deloitte UK's annual survey covering 1,000+ organisations. Analyses AI adoption rates by sector, key barriers including talent shortages, data quality, and regulation, documented ROI figures, and forecasts for the UK AI market in 2027.",
    category: "report",
    format: "pdf",
    emailRequired: true,
    tags: ["Deloitte", "AI adoption", "UK survey", "ROI", "industry benchmarks", "2026"],
    updatedAt: "2026-06-01",
    isPopular: true,
    readTime: 16,
  },
  {
    slug: "mckinsey-state-ai-uk-2026",
    titleUk: "McKinsey: стан ШІ у Великій Британії 2026 — інвестиції, таланти, продуктивність",
    titleEn: "McKinsey State of AI in the UK 2026: Investment, Talent and Productivity Impact",
    descriptionUk:
      "Звіт McKinsey аналізує тенденції інвестицій у ШІ у Великій Британії, ринок талантів, вплив на продуктивність і конкурентоспроможність у порівнянні з ЄС та США. Містить секторальні кейс-стадіз та рекомендації для бізнесу.",
    descriptionEn:
      "McKinsey's flagship UK AI report analyses investment trends, the talent market, measured productivity uplift across sectors, and UK competitiveness versus the EU and US. Includes sector-specific case studies and actionable recommendations for business leaders.",
    category: "report",
    format: "pdf",
    emailRequired: true,
    tags: ["McKinsey", "UK AI", "investment", "talent", "productivity", "2026", "market analysis"],
    updatedAt: "2026-06-01",
    isPopular: true,
    readTime: 19,
  },
  {
    slug: "ons-ai-labour-market-uk",
    titleUk: "ONS: вплив ШІ на ринок праці Великої Британії — оцінки зайнятості за секторами",
    titleEn: "ONS Analysis of AI Impact on UK Labour Market: Occupational Exposure and Productivity",
    descriptionUk:
      "Аналіз Управління національної статистики (ONS) щодо впливу ШІ на ринок праці Великої Британії. Надає бали ризику для 370 професій, оцінки підвищення продуктивності та прогнози зайнятості до 2030 року.",
    descriptionEn:
      "Official ONS analysis quantifying AI exposure across UK occupations. Provides occupational exposure scores for 370 job categories, measured productivity uplift data, displacement risk assessments, and employment projections to 2030.",
    category: "report",
    format: "page",
    emailRequired: false,
    tags: ["ONS", "labour market", "AI impact", "occupational exposure", "productivity", "UK employment"],
    updatedAt: "2026-06-01",
    readTime: 17,
  },
  {
    slug: "nist-ai-risk-management-uk",
    titleUk: "Посібник із застосування NIST AI RMF для Великої Британії: відповідність FCA та ICO",
    titleEn: "NIST AI Risk Management Framework UK Applicability Guide: Mapping to FCA and ICO",
    descriptionUk:
      "Практичний посібник з адаптації фреймворку управління ризиками NIST AI RMF до регуляторного середовища Великої Британії. Містить покрокову таблицю відповідності між NIST і вимогами FCA, ICO та CMA для UK-організацій.",
    descriptionEn:
      "Practical guide for applying the US NIST AI Risk Management Framework within the UK regulatory environment. Provides a detailed crosswalk mapping NIST controls to FCA, ICO, and CMA requirements, with implementation guidance for UK organisations.",
    category: "guide",
    format: "pdf",
    emailRequired: false,
    tags: ["NIST AI RMF", "risk management", "FCA", "ICO", "UK compliance", "AI governance", "framework"],
    updatedAt: "2026-06-01",
    readTime: 15,
  },
  {
    slug: "bcs-ml-professional-standards",
    titleUk: "Стандарти професійної сертифікації BCS з ML для UK-практиків",
    titleEn: "BCS ML Professional Certification Standards for UK Practitioners",
    descriptionUk:
      "Стандарти Британського комп'ютерного товариства (BCS) щодо сертифікації фахівців з машинного навчання у Великій Британії. Охоплює шляхи до сертифікації, компетентнісні рамки, вимоги до безперервного навчання та визнання роботодавцями.",
    descriptionEn:
      "BCS (Chartered Institute for IT) professional certification standards for machine learning practitioners in the UK. Covers certification pathways, competency frameworks, continuing professional development requirements, and employer recognition across UK industries.",
    category: "guide",
    format: "page",
    emailRequired: false,
    tags: ["BCS", "ML certification", "professional standards", "UK practitioners", "CPD", "chartered IT"],
    updatedAt: "2026-06-01",
    readTime: 11,
  },
  {
    slug: "techuk-ai-skills-report-2026",
    titleUk: "techUK: звіт про дефіцит AI-навичок 2026 — 85 000 вакансій та шляхи усунення прогалини",
    titleEn: "techUK AI Skills Gap Report 2026: 85,000 ML Jobs Unfilled and Training Pathways",
    descriptionUk:
      "Щорічний звіт techUK фіксує 85 000 незаповнених ML-вакансій у Великій Британії. Аналізує прогалини в навичках за регіонами та секторами, оцінює ефективність програм перепідготовки, учнівства та університетських курсів.",
    descriptionEn:
      "techUK's annual skills report identifies 85,000 unfilled ML roles across the UK. Analyses skills gaps by region and sector, evaluates the effectiveness of retraining programmes, apprenticeship schemes, and university AI curricula in closing the shortage.",
    category: "report",
    format: "pdf",
    emailRequired: true,
    tags: ["techUK", "AI skills", "skills gap", "ML jobs", "apprenticeships", "UK workforce", "2026"],
    updatedAt: "2026-06-01",
    isPopular: true,
    readTime: 13,
  },
];

export const RESOURCE_SLUGS = RESOURCES.map((r) => r.slug);

export function getResource(slug: string): Resource | undefined {
  return RESOURCES.find((r) => r.slug === slug);
}
