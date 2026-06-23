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
    slug: "vs-inhouse-ml-team",
    competitorUk: "Власна ML-команда",
    competitorEn: "In-house ML Team",
    taglineUk: "Коли вигідніше найняти консалтинг, а не будувати власну ML-команду?",
    taglineEn: "When is it better to hire an ML consultancy rather than build an in-house team?",
    summaryUk: "Порівняємо реальні витрати та ризики побудови власної ML-команди з нуля проти залучення Codeworth як ML-партнера.",
    summaryEn: "A realistic comparison of the costs and risks of building an in-house ML team from scratch versus engaging Codeworth as an ML partner.",
    seoTitleUk: "Codeworth ML-консалтинг vs Власна ML-команда — порівняння",
    seoTitleEn: "Codeworth ML Consultancy vs In-house ML Team — Comparison",
    seoDescUk: "Порівняйте витрати, терміни та ризики: ML-консалтинг Codeworth проти побудови власної ML-команди. Детальний аналіз для бізнесу.",
    seoDescEn: "Compare costs, timelines, and risks: Codeworth ML consultancy vs building your own ML team. Detailed analysis for businesses.",
    verdictUk: "Для більшості компаній без зрілої data culture Codeworth забезпечує швидший старт, фіксовану вартість і ready-to-ship результат — без ризиків найму та онбордингу ML-фахівців.",
    verdictEn: "For most companies without mature data culture, Codeworth delivers faster time-to-value, fixed costs, and a ready-to-ship result — without the hiring and onboarding risks of building an in-house team.",
    competitorColor: "text-slate-700",
    competitorBg: "bg-slate-100",
    rows: [
      {
        feature: "Час до першої моделі",
        featureEn: "Time to first model",
        Codeworth: "3–6 тижнів (PoC)",
        CodeworthEn: "3–6 weeks (PoC)",
        competitor: "6–18 місяців (найм + онбординг)",
        competitorEn: "6–18 months (hiring + onboarding)",
        winner: "Codeworth",
      },
      {
        feature: "Вартість запуску",
        featureEn: "Launch cost",
        Codeworth: "від £1,800 (PoC)",
        CodeworthEn: "from £1,800 (PoC)",
        competitor: "£80k–£200k+ (зарплати за рік)",
        competitorEn: "£80k–£200k+ (annual salaries)",
        winner: "Codeworth",
      },
      {
        feature: "Фіксована вартість",
        featureEn: "Fixed cost",
        Codeworth: true,
        CodeworthEn: true,
        competitor: false,
        competitorEn: false,
        winner: "Codeworth",
      },
      {
        feature: "MLOps з першого дня",
        featureEn: "MLOps from day one",
        Codeworth: true,
        CodeworthEn: true,
        competitor: "Лише якщо в команді є MLOps-інженер",
        competitorEn: "Only if you hire an MLOps engineer",
        winner: "Codeworth",
      },
      {
        feature: "Глибоке знання домену",
        featureEn: "Deep domain knowledge",
        Codeworth: "У FinTech, Health, Retail",
        CodeworthEn: "In FinTech, Health, Retail",
        competitor: "Накопичується з часом",
        competitorEn: "Builds up over time",
        winner: "tie",
      },
      {
        feature: "Довгострокова підтримка",
        featureEn: "Long-term maintenance",
        Codeworth: "MLOps-ретейнер від £800/міс",
        CodeworthEn: "MLOps retainer from £800/month",
        competitor: true,
        competitorEn: true,
        winner: "competitor",
      },
      {
        feature: "Масштабування команди",
        featureEn: "Team scaling",
        Codeworth: "Обмежено (8 спеціалістів)",
        CodeworthEn: "Limited (8 specialists)",
        competitor: "Необмежено",
        competitorEn: "Unlimited",
        winner: "competitor",
      },
      {
        feature: "Гарантія якості моделі",
        featureEn: "Model quality guarantee",
        Codeworth: "Precision/Recall мін. поріг у spec",
        CodeworthEn: "Precision/Recall min threshold in spec",
        competitor: "Залежить від інженера",
        competitorEn: "Depends on the engineer",
        winner: "Codeworth",
      },
    ],
    useCasesCodeworthUk: [
      "Швидкий PoC для валідації ML-ідеї",
      "Обмежений бюджет на перший ML-проєкт",
      "Немає внутрішньої ML-компетенції",
      "Разовий або рідкісний ML-проєкт",
    ],
    useCasesCodeworthEn: [
      "Fast PoC to validate an ML idea",
      "Limited budget for a first ML project",
      "No internal ML competency",
      "One-off or infrequent ML project",
    ],
    useCasesCompetitorUk: [
      "ML — ключова компетенція продукту",
      "Потрібно 5+ ML-проєктів на рік",
      "Жорсткі вимоги до конфіденційності даних",
      "Є бюджет і час на побудову команди",
    ],
    useCasesCompetitorEn: [
      "ML is a core product competency",
      "You need 5+ ML projects per year",
      "Strict data confidentiality requirements",
      "Budget and time to build a team",
    ],
  },
  {
    slug: "vs-automl",
    competitorUk: "AutoML-платформи",
    competitorEn: "AutoML Platforms",
    taglineUk: "Codeworth vs AutoML (Google AutoML, Azure ML, H2O.ai) — коли потрібен кастомний підхід?",
    taglineEn: "Codeworth vs AutoML (Google AutoML, Azure ML, H2O.ai) — when do you need a custom approach?",
    summaryUk: "AutoML — чудовий старт. Але як тільки ваша задача виходить за рамки стандартних сценаріїв, потрібен кастомний ML.",
    summaryEn: "AutoML is a great starting point. But once your task goes beyond standard scenarios, you need custom ML.",
    seoTitleUk: "Codeworth vs AutoML-платформи — порівняння підходів",
    seoTitleEn: "Codeworth vs AutoML Platforms — Approach Comparison",
    seoDescUk: "Коли AutoML достатньо, а коли потрібен кастомний ML від Codeworth? Детальне порівняння для бізнесу.",
    seoDescEn: "When is AutoML enough, and when do you need custom ML from Codeworth? Detailed comparison for businesses.",
    verdictUk: "AutoML ідеально підходить для табличних задач зі стандартними метриками. Codeworth — коли потрібні кастомні фічі, доменна логіка, NLP/CV або MLOps-інтеграція у ваш стек.",
    verdictEn: "AutoML is ideal for tabular tasks with standard metrics. Codeworth is the choice when you need custom features, domain logic, NLP/CV, or MLOps integration into your stack.",
    competitorColor: "text-blue-700",
    competitorBg: "bg-blue-50",
    rows: [
      {
        feature: "Кастомна архітектура моделі",
        featureEn: "Custom model architecture",
        Codeworth: true,
        CodeworthEn: true,
        competitor: "Обмежено",
        competitorEn: "Limited",
        winner: "Codeworth",
      },
      {
        feature: "NLP та Computer Vision",
        featureEn: "NLP and Computer Vision",
        Codeworth: true,
        CodeworthEn: true,
        competitor: "Частково (базові задачі)",
        competitorEn: "Partially (basic tasks)",
        winner: "Codeworth",
      },
      {
        feature: "Простота запуску",
        featureEn: "Ease of start",
        Codeworth: "Потрібен discovery call",
        CodeworthEn: "Requires a discovery call",
        competitor: "Вивантаж CSV → результат",
        competitorEn: "Upload CSV → get results",
        winner: "competitor",
      },
      {
        feature: "Вартість для простої задачі",
        featureEn: "Cost for simple tasks",
        Codeworth: "від £1,800",
        CodeworthEn: "from £1,800",
        competitor: "$0–$500/міс",
        competitorEn: "$0–$500/month",
        winner: "competitor",
      },
      {
        feature: "Доменна логіка та фічі",
        featureEn: "Domain logic and features",
        Codeworth: true,
        CodeworthEn: true,
        competitor: false,
        competitorEn: false,
        winner: "Codeworth",
      },
      {
        feature: "MLOps у ваш існуючий стек",
        featureEn: "MLOps into your existing stack",
        Codeworth: true,
        CodeworthEn: true,
        competitor: "Тільки у рамках платформи",
        competitorEn: "Within platform only",
        winner: "Codeworth",
      },
      {
        feature: "On-prem деплой",
        featureEn: "On-prem deployment",
        Codeworth: true,
        CodeworthEn: true,
        competitor: false,
        competitorEn: false,
        winner: "Codeworth",
      },
    ],
    useCasesCodeworthUk: [
      "Складна доменна задача (fraud з кастомними правилами)",
      "NLP для галузевих документів",
      "Computer vision з кастомними класами",
      "Інтеграція у власну інфраструктуру",
    ],
    useCasesCodeworthEn: [
      "Complex domain task (fraud with custom rules)",
      "NLP for industry-specific documents",
      "Computer vision with custom classes",
      "Integration into your own infrastructure",
    ],
    useCasesCompetitorUk: [
      "Стандартні табличні задачі (прогноз відтоку, класифікація)",
      "Швидкий baseline без ML-команди",
      "Обмежений бюджет",
      "Хмарний стек Google/Azure/AWS",
    ],
    useCasesCompetitorEn: [
      "Standard tabular tasks (churn prediction, classification)",
      "Quick baseline without an ML team",
      "Limited budget",
      "Google/Azure/AWS cloud stack",
    ],
  },
];

export function getCompare(slug: string): CompareData | undefined {
  return COMPARE_DATA.find((c) => c.slug === slug);
}

export const COMPARE_SLUGS = COMPARE_DATA.map((c) => c.slug);
