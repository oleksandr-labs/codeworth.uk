export type StartupCategory = "saas" | "marketplace" | "dtc" | "mobile" | "community" | "fintech" | "b2b" | "impact";

export interface StartupSolution {
  slug: string;
  title: string;
  titleEn: string;
  category: StartupCategory;
  tagline: string;
  taglineEn: string;
  description: string;
  descriptionEn: string;
  targetAudience: string;
  targetAudienceEn: string;
  hypothesis: string;
  hypothesisEn: string;
  deliveryDays: number;
  priceFrom: number; // GBP
  tags: string[];
  conversionGoal: string;
  conversionGoalEn: string;
  successMetric: string;
  successMetricEn: string;
  sections: string[];
  sectionsEn: string[];
  color: string;      // Tailwind bg color for accent
  textColor: string;  // Tailwind text color
  icon: string;       // emoji
}

export const STARTUP_CATEGORY_LABELS_EN: Record<StartupCategory, string> = {
  saas:        "SaaS",
  marketplace: "Marketplace",
  dtc:         "D2C / E-commerce",
  mobile:      "Mobile App",
  community:   "Community & Media",
  fintech:     "Fintech",
  b2b:         "B2B / Tools",
  impact:      "Impact / Social",
};

export const STARTUP_CATEGORY_LABELS_UK: Record<StartupCategory, string> = {
  saas:        "SaaS",
  marketplace: "Маркетплейс",
  dtc:         "D2C / E-commerce",
  mobile:      "Мобільний додаток",
  community:   "Спільнота та медіа",
  fintech:     "Фінтех",
  b2b:         "B2B / Інструменти",
  impact:      "Соціальний стартап",
};

export const STARTUP_SOLUTIONS: StartupSolution[] = [
  {
    slug: "ml-saas-starter",
    title: "ML SaaS Стартер",
    titleEn: "ML SaaS Starter",
    category: "saas",
    tagline: "Від ідеї до перших 10 платних клієнтів за 8 тижнів",
    taglineEn: "From idea to first 10 paying customers in 8 weeks",
    description:
      "Будуємо готовий до продажу ML SaaS продукт: одна ключова ML-фіча (класифікація, прогнозування або NLP), лендінг з A/B тестами, автентифікація, Stripe-оплата та повна відповідність UK GDPR. Архітектура розрахована на масштаб від перших 100 до 10 000 користувачів без переписування коду. Ви отримуєте репозиторій, документацію та 30-денну підтримку після запуску.",
    descriptionEn:
      "We build a market-ready ML SaaS product: one core ML feature (classification, forecasting, or NLP), a conversion-optimised landing page with A/B testing, authentication, Stripe billing, and full UK GDPR compliance. Architecture is designed to scale from the first 100 to 10,000 users without a rewrite. You receive the repository, documentation, and 30 days of post-launch support.",
    targetAudience:
      "Технічні засновники та продуктові менеджери у Великій Британії, які мають підтверджену гіпотезу і хочуть вийти на ринок до того, як конкуренти займуть нішу.",
    targetAudienceEn:
      "Technical founders and product managers in the UK who have a validated hypothesis and want to reach market before competitors claim the niche.",
    hypothesis:
      "Якщо ми доставимо ML-цінність в один клік, принаймні 10 ранніх користувачів конвертуються в платних клієнтів протягом першого місяця.",
    hypothesisEn:
      "If we deliver ML value in one click, at least 10 early users will convert to paying customers within the first month.",
    deliveryDays: 56,
    priceFrom: 8500,
    tags: ["ML", "SaaS", "Stripe", "UK GDPR", "Next.js", "FastAPI", "PostgreSQL"],
    conversionGoal: "10 платних клієнтів протягом 30 днів після запуску",
    conversionGoalEn: "10 paying customers within 30 days of launch",
    successMetric: "MRR £1 000+ у перший місяць, churn < 10%",
    successMetricEn: "MRR £1,000+ in month one, churn < 10%",
    sections: [
      "Дискавері-сесія та визначення ML-фічі",
      "Дизайн архітектури та ERD",
      "Розробка ML-моделі та API",
      "Лендінг, автентифікація, Stripe",
      "UK GDPR: cookie consent, DPA, Privacy Notice",
      "QA, staging, production deploy",
      "30-денна підтримка після запуску",
    ],
    sectionsEn: [
      "Discovery session and ML feature definition",
      "Architecture design and ERD",
      "ML model development and API",
      "Landing page, authentication, Stripe billing",
      "UK GDPR: cookie consent, DPA, Privacy Notice",
      "QA, staging, production deploy",
      "30-day post-launch support",
    ],
    color: "bg-violet-500",
    textColor: "text-violet-700",
    icon: "rocket",
  },
  {
    slug: "fintech-ml-mvp",
    title: "Фінтех ML MVP",
    titleEn: "Fintech ML MVP",
    category: "fintech",
    tagline: "FCA-готовий кредитний скоринг або виявлення шахрайства з документацією SS1/23",
    taglineEn: "FCA-ready credit scoring or fraud detection MVP with SS1/23 documentation",
    description:
      "Розробляємо MVP для кредитного скорингу або виявлення шахрайства з повним пакетом документації згідно з вимогами FCA SS1/23 щодо моделей ML/AI. Інтегруємо Open Banking API (через TrueLayer або Plaid UK), будуємо пояснювану ML-модель (XGBoost або логістична регресія з SHAP), налаштовуємо моніторинг дрейфу моделі та fairness-аудит відповідно до вимог FCA Consumer Duty. За даними FCA, у 2023 році у Великій Британії було зафіксовано понад £1.2 млрд збитків від шахрайства — ринок для превентивних ML-рішень величезний.",
    descriptionEn:
      "We build a credit-scoring or fraud-detection MVP with a full FCA SS1/23 model-risk documentation package. Integration covers Open Banking API (via TrueLayer or Plaid UK), explainable ML model (XGBoost or logistic regression with SHAP values), model-drift monitoring, and a fairness audit aligned with FCA Consumer Duty requirements. With over £1.2 bn in fraud losses recorded in the UK in 2023 (FCA data), the market for preventive ML solutions is substantial.",
    targetAudience:
      "Фінтех-стартапи, що готуються до отримання FCA-авторизації або вже мають дозвіл, а також challenger banks та BNPL-провайдери у Великій Британії.",
    targetAudienceEn:
      "Fintech startups preparing for or already holding FCA authorisation, as well as UK challenger banks and BNPL providers.",
    hypothesis:
      "Пояснювана ML-модель із документацією SS1/23 дозволить пройти FCA-перевірку з першого разу та скоротити операційні збитки від шахрайства на 30%+.",
    hypothesisEn:
      "An explainable ML model with SS1/23 documentation will pass FCA review on the first submission and reduce operational fraud losses by 30%+.",
    deliveryDays: 70,
    priceFrom: 12000,
    tags: ["FCA", "SS1/23", "Open Banking", "XGBoost", "SHAP", "Consumer Duty", "Fraud Detection"],
    conversionGoal: "Успішна FCA-перевірка моделі та перші 5 B2B-клієнтів",
    conversionGoalEn: "Successful FCA model review and first 5 B2B clients",
    successMetric: "Точність моделі AUC-ROC > 0.85, false-positive rate < 5%",
    successMetricEn: "Model accuracy AUC-ROC > 0.85, false-positive rate < 5%",
    sections: [
      "FCA SS1/23 gap-аналіз та план документації",
      "Open Banking API інтеграція",
      "Розробка та навчання ML-моделі",
      "SHAP-пояснюваність та fairness-аудит",
      "Моніторинг дрейфу та dashboard",
      "Пакет FCA-документації",
      "QA, penetration testing, production deploy",
    ],
    sectionsEn: [
      "FCA SS1/23 gap analysis and documentation plan",
      "Open Banking API integration",
      "ML model development and training",
      "SHAP explainability and fairness audit",
      "Model drift monitoring and dashboard",
      "FCA documentation package",
      "QA, penetration testing, production deploy",
    ],
    color: "bg-emerald-500",
    textColor: "text-emerald-700",
    icon: "credit-card",
  },
  {
    slug: "healthtech-ml-mvp",
    title: "Healthtech ML MVP",
    titleEn: "Healthtech ML MVP",
    category: "saas",
    tagline: "NHS-готова ML-підтримка клінічних рішень із DSPT та FHIR API",
    taglineEn: "NHS-ready clinical decision support ML with DSPT compliance and NHS FHIR API",
    description:
      "Будуємо ML-систему підтримки клінічних рішень (CDS), готову до розгортання в NHS: відповідність Data Security and Protection Toolkit (DSPT), клінічна документація безпеки за DCB0129/DCB0160, інтеграція з NHS FHIR R4 API та SNOMED CT. ML-компонент — ризикова стратифікація пацієнтів або детекція аномалій у клінічних даних. Ринок NHS Digital Transformation у Великій Британії оцінюється у £9.6 млрд до 2027 року (Hyland Research), а нові ICS-структури активно закуповують ML-рішення.",
    descriptionEn:
      "We build an NHS-ready clinical decision support (CDS) ML system: Data Security and Protection Toolkit (DSPT) compliance, clinical safety documentation under DCB0129/DCB0160, NHS FHIR R4 API and SNOMED CT integration. The ML component covers patient risk stratification or anomaly detection in clinical data. The UK NHS Digital Transformation market is projected at £9.6 bn by 2027 (Hyland Research), with new ICS structures actively procuring ML solutions.",
    targetAudience:
      "Healthtech-стартапи та цифрові постачальники NHS, що проходять або планують процедуру NHS Clinical Safety та DSPT-відповідності.",
    targetAudienceEn:
      "Healthtech startups and NHS digital suppliers undergoing or planning NHS Clinical Safety and DSPT compliance processes.",
    hypothesis:
      "ML-рішення з повним DSPT та клінічною документацією безпеки отримає NHS procurement approval швидше конкурентів без такої документації.",
    hypothesisEn:
      "An ML solution with complete DSPT and clinical safety documentation will receive NHS procurement approval faster than competitors lacking such documentation.",
    deliveryDays: 84,
    priceFrom: 15000,
    tags: ["NHS", "DSPT", "FHIR R4", "SNOMED CT", "DCB0129", "Clinical Safety", "Risk Stratification"],
    conversionGoal: "DSPT-відповідність та перший NHS Trust або GP Surgery як клієнт",
    conversionGoalEn: "DSPT compliance achieved and first NHS Trust or GP Surgery as a client",
    successMetric: "Чутливість моделі > 80% при специфічності > 90% на клінічному датасеті",
    successMetricEn: "Model sensitivity > 80% at specificity > 90% on clinical dataset",
    sections: [
      "DSPT gap-аналіз та план відповідності",
      "NHS FHIR R4 API інтеграція",
      "Розробка ML-моделі ризику",
      "Клінічна документація безпеки DCB0129/DCB0160",
      "SNOMED CT кодування та валідація",
      "Penetration testing та ISO 27001-аліgnment",
      "Staging в NHS-сумісному середовищі",
    ],
    sectionsEn: [
      "DSPT gap analysis and compliance plan",
      "NHS FHIR R4 API integration",
      "Risk ML model development",
      "Clinical safety documentation DCB0129/DCB0160",
      "SNOMED CT coding and validation",
      "Penetration testing and ISO 27001 alignment",
      "Staging in NHS-compatible environment",
    ],
    color: "bg-sky-500",
    textColor: "text-sky-700",
    icon: "hospital",
  },
  {
    slug: "b2b-ml-analytics-platform",
    title: "B2B ML Аналітична Платформа",
    titleEn: "B2B ML Analytics Platform",
    category: "b2b",
    tagline: "White-label ML аналітика для UK enterprise: предиктивні дашборди та NL-запити",
    taglineEn: "White-label ML analytics for UK enterprise: predictive dashboards and NL queries",
    description:
      "Розробляємо white-label ML аналітичну платформу для перепродажу UK enterprise-клієнтам: предиктивні дашборди з автоматичними прогнозами, виявлення аномалій у реальному часі та інтерфейс запитів природною мовою (NL-to-SQL через LLM). Мультиорендна архітектура з ізоляцією даних клієнтів, рольовий доступ та SSO (SAML 2.0/OIDC). За даними Gartner, 65% UK enterprise-компаній планують збільшити витрати на аналітику та BI у 2024–2025 роках.",
    descriptionEn:
      "We build a white-label ML analytics platform for resale to UK enterprise clients: predictive dashboards with automated forecasts, real-time anomaly detection, and a natural-language query interface (NL-to-SQL via LLM). Multi-tenant architecture with per-client data isolation, role-based access, and SSO (SAML 2.0/OIDC). Per Gartner, 65% of UK enterprise companies plan to increase analytics and BI spend in 2024–2025.",
    targetAudience:
      "UK SaaS-компанії та системні інтегратори, які хочуть додати ML-аналітику до свого продукту або пропозиції для enterprise-клієнтів без побудови власної ML-команди.",
    targetAudienceEn:
      "UK SaaS companies and system integrators wanting to add ML analytics to their product or enterprise offering without building an in-house ML team.",
    hypothesis:
      "White-label ML-аналітика дозволить партнерам збільшити ARPU на 40%+ та скоротити відтік enterprise-клієнтів завдяки глибокій інтеграції у робочі процеси.",
    hypothesisEn:
      "White-label ML analytics will allow partners to increase ARPU by 40%+ and reduce enterprise client churn through deep workflow integration.",
    deliveryDays: 63,
    priceFrom: 11000,
    tags: ["White-label", "Multi-tenant", "NL-to-SQL", "Anomaly Detection", "SSO", "SAML", "Enterprise"],
    conversionGoal: "3 enterprise-партнери підписують reseller-угоди протягом 60 днів після запуску",
    conversionGoalEn: "3 enterprise partners sign reseller agreements within 60 days of launch",
    successMetric: "NPS партнерів > 50, середній ACV £15 000+ на enterprise-клієнта",
    successMetricEn: "Partner NPS > 50, average ACV £15,000+ per enterprise client",
    sections: [
      "Enterprise requirements discovery та архітектура",
      "Мультиорендна інфраструктура та ізоляція даних",
      "ML-модулі: прогнозування та аномалії",
      "NL-to-SQL інтерфейс запитів",
      "SSO, RBAC та аудит-логи",
      "White-label брендинг та кастомізація",
      "SLA-документація та onboarding-пакет",
    ],
    sectionsEn: [
      "Enterprise requirements discovery and architecture",
      "Multi-tenant infrastructure and data isolation",
      "ML modules: forecasting and anomaly detection",
      "NL-to-SQL query interface",
      "SSO, RBAC and audit logs",
      "White-label branding and customisation",
      "SLA documentation and onboarding package",
    ],
    color: "bg-blue-500",
    textColor: "text-blue-700",
    icon: "chart-bar",
  },
  {
    slug: "marketplace-ml-matching",
    title: "Маркетплейс ML Матчинг",
    titleEn: "Marketplace ML Matching",
    category: "marketplace",
    tagline: "ML-рушій матчингу для двосторонніх маркетплейсів: скоринг, ранжування, довіра",
    taglineEn: "ML matching engine for two-sided marketplaces: fit scoring, personalised ranking, trust ML",
    description:
      "Будуємо ML-рушій матчингу для двосторонніх маркетплейсів: скоринг відповідності постачальника та покупця, персоналізоване ранжування пропозицій і ML-модель довіри (виявлення підозрілих акторів та фейкових відгуків). Рекомендаційний двигун на основі collaborative filtering та content-based ознак. За даними McKinsey, маркетплейси з ML-матчингом збільшують конверсію на 15–35% порівняно з rule-based системами. Архітектура підтримує cold-start через гібридні підходи.",
    descriptionEn:
      "We build an ML matching engine for two-sided marketplaces: supplier-buyer fit scoring, personalised listing ranking, and a trust ML model (suspicious actor detection and fake-review flagging). Recommendation engine based on collaborative filtering and content-based features. Per McKinsey, marketplaces with ML matching increase conversion by 15–35% compared with rule-based systems. Architecture supports cold-start via hybrid approaches.",
    targetAudience:
      "Засновники UK-маркетплейсів з наявною базою користувачів (500+ з кожного боку), які хочуть перейти від ручної модерації та базового пошуку до інтелектуального матчингу.",
    targetAudienceEn:
      "UK marketplace founders with an existing user base (500+ on each side) who want to move from manual moderation and basic search to intelligent matching.",
    hypothesis:
      "Персоналізований ML-матчинг збільшить кількість успішних угод на 25%+ і знизить time-to-match на 40% протягом перших 90 днів після впровадження.",
    hypothesisEn:
      "Personalised ML matching will increase successful transactions by 25%+ and reduce time-to-match by 40% within the first 90 days post-deployment.",
    deliveryDays: 56,
    priceFrom: 9500,
    tags: ["Collaborative Filtering", "Ranking", "Trust & Safety", "Cold Start", "Recommendations", "Two-sided Market"],
    conversionGoal: "Зростання GMV на 20%+ за перші 60 днів після впровадження ML-матчингу",
    conversionGoalEn: "20%+ GMV growth in the first 60 days after ML matching deployment",
    successMetric: "Precision@10 > 0.6, середній час до першої транзакції скорочується на 30%",
    successMetricEn: "Precision@10 > 0.6, average time to first transaction reduced by 30%",
    sections: [
      "Аудит даних маркетплейсу та feature engineering",
      "Модель скорингу відповідності (fit scoring)",
      "Персоналізоване ранжування пропозицій",
      "Trust ML: виявлення аномалій та фейків",
      "A/B тестування матчингу",
      "Real-time API та кешування",
      "Дашборд метрик маркетплейсу",
    ],
    sectionsEn: [
      "Marketplace data audit and feature engineering",
      "Fit scoring model",
      "Personalised listing ranking",
      "Trust ML: anomaly and fake-review detection",
      "Matching A/B testing",
      "Real-time API and caching",
      "Marketplace metrics dashboard",
    ],
    color: "bg-orange-500",
    textColor: "text-orange-700",
    icon: "link",
  },
  {
    slug: "dtc-ml-personalisation",
    title: "D2C ML Персоналізація",
    titleEn: "D2C ML Personalisation",
    category: "dtc",
    tagline: "ML персоналізація для D2C брендів: рекомендації, відтік, CLV та email",
    taglineEn: "ML personalisation for D2C brands: recommendations, churn prediction, CLV scoring, personalised email",
    description:
      "Впроваджуємо повний ML-стек персоналізації для D2C-брендів, що продають у Великій Британії: рекомендаційний рушій (collaborative filtering + content-based), прогнозування відтоку з автоматичними retention-тригерами, скоринг CLV (lifetime value) та персоналізовані email-кампанії через Klaviyo або Braze API. Інтеграція з Shopify або WooCommerce. За даними Salesforce, 76% UK-споживачів очікують персоналізованого досвіду, а бренди з ML-персоналізацією показують ROAS на 20-30% вище.",
    descriptionEn:
      "We deploy a full ML personalisation stack for D2C brands selling in the UK: recommendation engine (collaborative filtering + content-based), churn prediction with automated retention triggers, CLV (lifetime value) scoring, and personalised email campaigns via Klaviyo or Braze API. Shopify or WooCommerce integration included. Per Salesforce, 76% of UK consumers expect personalised experiences, while brands with ML personalisation show ROAS 20–30% higher.",
    targetAudience:
      "D2C-бренди Великої Британії з оборотом від £500k на рік та базою покупців від 5 000 осіб, які хочуть перейти від масових email-розсилок до ML-персоналізації.",
    targetAudienceEn:
      "UK D2C brands with £500k+ annual revenue and a customer base of 5,000+, looking to move from mass email blasts to ML personalisation.",
    hypothesis:
      "ML-персоналізація збільшить повторні покупки на 25%+ та знизить churn rate на 15% протягом першого кварталу після запуску.",
    hypothesisEn:
      "ML personalisation will increase repeat purchases by 25%+ and reduce churn rate by 15% within the first quarter after launch.",
    deliveryDays: 42,
    priceFrom: 7500,
    tags: ["Recommendations", "Churn Prediction", "CLV", "Shopify", "Klaviyo", "D2C", "Retention"],
    conversionGoal: "Email CTR зростає на 30%+, repeat purchase rate збільшується на 20%",
    conversionGoalEn: "Email CTR increases by 30%+, repeat purchase rate increases by 20%",
    successMetric: "ROAS персоналізованих кампаній > 4x, churn rate знижується на 15% за 90 днів",
    successMetricEn: "Personalised campaign ROAS > 4x, churn rate down 15% in 90 days",
    sections: [
      "Аудит даних Shopify/WooCommerce",
      "Рекомендаційний рушій",
      "Модель прогнозування відтоку",
      "CLV-скоринг та сегментація",
      "Klaviyo/Braze ML-інтеграція",
      "Retention-автоматизація та тригери",
      "Дашборд конверсії та ROI",
    ],
    sectionsEn: [
      "Shopify/WooCommerce data audit",
      "Recommendation engine",
      "Churn prediction model",
      "CLV scoring and segmentation",
      "Klaviyo/Braze ML integration",
      "Retention automation and triggers",
      "Conversion and ROI dashboard",
    ],
    color: "bg-pink-500",
    textColor: "text-pink-700",
    icon: "shopping-bag",
  },
  {
    slug: "legaltech-nlp-mvp",
    title: "LegalTech NLP MVP",
    titleEn: "LegalTech NLP MVP",
    category: "b2b",
    tagline: "UK юридичний NLP: витяг клаузул, ризик-флагінг та регуляторна відповідність",
    taglineEn: "UK legal NLP: contract clause extraction, risk flagging, document search, regulatory compliance",
    description:
      "Будуємо NLP-продукт для UK юридичного ринку: автоматичний витяг клаузул із договорів (NER + трансформери), ризик-флагінг відповідно до UK законодавства (Unfair Contract Terms Act, Consumer Rights Act), семантичний пошук по документах та перевірка відповідності регуляторним вимогам (FCA, ICO, CMA). Тонке налаштування моделі на корпусі UK legal English. За даними Thomson Reuters, 72% UK-юристів планують збільшити використання AI-інструментів до 2025 року, а ринок LegalTech у Великій Британії зростає на 20% на рік.",
    descriptionEn:
      "We build an NLP product for the UK legal market: automated contract clause extraction (NER + transformers), risk flagging aligned with UK law (Unfair Contract Terms Act, Consumer Rights Act), semantic document search, and regulatory compliance checking (FCA, ICO, CMA). Fine-tuning is performed on a UK legal English corpus. Per Thomson Reuters, 72% of UK lawyers plan to increase AI tool usage by 2025, and the UK LegalTech market grows at 20% per year.",
    targetAudience:
      "UK law firms (Silver Circle та регіональні), юридичні департаменти корпорацій та LegalTech стартапи, що хочуть автоматизувати contract review та compliance-перевірки.",
    targetAudienceEn:
      "UK law firms (Silver Circle and regional), corporate legal departments, and LegalTech startups seeking to automate contract review and compliance checks.",
    hypothesis:
      "NLP-автоматизація contract review скорочує час перевірки договору на 60%+ і знижує ризик пропуску критичних клаузул до менш ніж 2%.",
    hypothesisEn:
      "NLP automation of contract review reduces review time by 60%+ and lowers the risk of missing critical clauses to under 2%.",
    deliveryDays: 70,
    priceFrom: 13500,
    tags: ["NLP", "Contract Analysis", "NER", "Transformers", "FCA", "ICO", "UK Law", "Semantic Search"],
    conversionGoal: "5 law firm або corporate legal пілотів із підпискою після 60-денного trial",
    conversionGoalEn: "5 law firm or corporate legal pilots converting to paid subscription after 60-day trial",
    successMetric: "F1-score витягу клаузул > 0.88, час перевірки договору скорочується на 55%",
    successMetricEn: "Clause extraction F1-score > 0.88, contract review time reduced by 55%",
    sections: [
      "Корпус UK legal English та анотація",
      "NER-модель витягу клаузул",
      "Ризик-флагінг за UK законодавством",
      "Семантичний пошук по документах",
      "Регуляторний compliance-чекер",
      "Інтеграція з документами (Word, PDF)",
      "SOC 2-аліgnment та UK GDPR",
    ],
    sectionsEn: [
      "UK legal English corpus and annotation",
      "Clause extraction NER model",
      "Risk flagging against UK legislation",
      "Semantic document search",
      "Regulatory compliance checker",
      "Document integration (Word, PDF)",
      "SOC 2 alignment and UK GDPR",
    ],
    color: "bg-amber-500",
    textColor: "text-amber-700",
    icon: "scales",
  },
  {
    slug: "impact-ml-social-good",
    title: "Impact ML для Соціального Блага",
    titleEn: "Impact ML for Social Good",
    category: "impact",
    tagline: "ML для UK благодійних організацій: прогнозування результатів, вимірювання впливу, ESG",
    taglineEn: "ML for UK charities and social enterprises: outcome prediction, impact measurement, ESG tracking",
    description:
      "Будуємо ML-платформу для UK благодійних організацій та соціальних підприємств: прогнозування результатів програм (outcome prediction) для звітності перед донорами, вимірювання соціального впливу відповідно до Social Value Act 2012, автоматичний ESG-трекінг та генерація звітів. Архітектура враховує бюджетні обмеження третього сектора: open-source ML стек, self-hosted або low-cost cloud. NCVO звітує, що 78% UK благодійних організацій відчувають тиск щодо evidence-based звітності, але лише 12% використовують аналітичні інструменти.",
    descriptionEn:
      "We build an ML platform for UK charities and social enterprises: programme outcome prediction for donor reporting, social impact measurement aligned with the Social Value Act 2012, automated ESG tracking, and report generation. Architecture accounts for third-sector budget constraints: open-source ML stack, self-hosted or low-cost cloud. NCVO reports that 78% of UK charities face pressure for evidence-based reporting, yet only 12% use analytical tools.",
    targetAudience:
      "UK зареєстровані благодійні організації (Charity Commission), соціальні підприємства та B-Corp компанії, що потребують доказової бази впливу для грантів, інвесторів та партнерів.",
    targetAudienceEn:
      "UK registered charities (Charity Commission), social enterprises, and B-Corp companies requiring an evidence base of impact for grants, investors, and partners.",
    hypothesis:
      "ML-доказова база результатів програм збільшить успішність грантових заявок на 30%+ та скоротить час підготовки щорічного звіту про вплив на 50%.",
    hypothesisEn:
      "ML-evidenced programme outcomes will increase grant application success rates by 30%+ and reduce annual impact report preparation time by 50%.",
    deliveryDays: 42,
    priceFrom: 6500,
    tags: ["Social Value Act", "ESG", "Outcome Prediction", "Charities", "B-Corp", "Open Source ML", "Impact Measurement"],
    conversionGoal: "10 благодійних організацій використовують платформу для річного звіту про вплив",
    conversionGoalEn: "10 charities using the platform for their annual impact report",
    successMetric: "Точність прогнозу результатів програм > 75%, економія часу на звітність 8+ годин на місяць",
    successMetricEn: "Programme outcome prediction accuracy > 75%, reporting time saving of 8+ hours per month",
    sections: [
      "Impact framework та метрики вимірювання",
      "ML-модель прогнозування результатів",
      "Дашборд соціального впливу",
      "ESG-трекінг та автозвіти",
      "Social Value Act 2012 alignment",
      "Інтеграція з Charity Commission API",
      "Навчання персоналу та документація",
    ],
    sectionsEn: [
      "Impact framework and measurement metrics",
      "Programme outcome prediction ML model",
      "Social impact dashboard",
      "ESG tracking and automated reports",
      "Social Value Act 2012 alignment",
      "Charity Commission API integration",
      "Staff training and documentation",
    ],
    color: "bg-green-500",
    textColor: "text-green-700",
    icon: "leaf",
  },
];

export function getStartupSolution(slug: string): StartupSolution | undefined {
  return STARTUP_SOLUTIONS.find((s) => s.slug === slug);
}

export function getStartupByCategory(category: StartupCategory): StartupSolution[] {
  return STARTUP_SOLUTIONS.filter((s) => s.category === category);
}
