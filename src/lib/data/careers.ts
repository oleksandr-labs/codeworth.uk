export interface JobPosting {
  slug: string;
  titleUk: string;
  titleEn: string;
  departmentUk: string;
  departmentEn: string;
  typeUk: string;
  typeEn: string;
  locationUk: string;
  locationEn: string;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  descriptionUk: string;
  descriptionEn: string;
  requirementsUk: string[];
  requirementsEn: string[];
  niceToHaveUk?: string[];
  niceToHaveEn?: string[];
  responsibilitiesUk: string[];
  responsibilitiesEn: string[];
  benefitsUk: string[];
  benefitsEn: string[];
  datePosted: string;
  isUrgent?: boolean;
}

// ─── Team testimonials ────────────────────────────────────────────────────────

export interface TeamTestimonial {
  nameUk: string;
  nameEn: string;
  roleUk: string;
  roleEn: string;
  yearsInTeam: number;
  quoteUk: string;
  quoteEn: string;
  emoji: string;
}

export const TEAM_TESTIMONIALS: TeamTestimonial[] = [
  {
    nameUk: "Андрій Коваленко",
    nameEn: "Andriy Kovalenko",
    roleUk: "ML Engineer",
    roleEn: "ML Engineer",
    yearsInTeam: 2,
    quoteUk:
      "За 2 роки в Codeworth я задеплоїв модель виявлення шахрайства для великого FinTech-клієнта — від сирих транзакцій до FastAPI-сервісу в продакшені. Тут дають справжню свободу в технічних рішеннях і підтримують у будь-яких ML-експериментах.",
    quoteEn:
      "In 2 years at Codeworth I deployed a fraud detection model for a major FinTech client — from raw transactions to a FastAPI service in production. Here you get real freedom in technical decisions and full support for ML experiments.",
    emoji: "🤖",
  },
  {
    nameUk: "Дарія Морозова",
    nameEn: "Daria Morozova",
    roleUk: "Data Scientist",
    roleEn: "Data Scientist",
    yearsInTeam: 1.5,
    quoteUk:
      "Найцікавіший проєкт — оптимізація витрат у сфері охорони здоров'я за допомогою ML. Завдяки нашій моделі прогнозування клієнт скоротив операційні витрати на 18%. Робота, яка реально впливає на людей.",
    quoteEn:
      "The most exciting project was using ML to cut healthcare costs. Our predictive model helped the client reduce operational expenses by 18%. This is work that genuinely impacts people's lives.",
    emoji: "📊",
  },
  {
    nameUk: "Іван Петренко",
    nameEn: "Ivan Petrenko",
    roleUk: "MLOps Engineer",
    roleEn: "MLOps Engineer",
    yearsInTeam: 1,
    quoteUk:
      "Я побудував MLOps-платформу з нуля — Kubernetes, MLflow, автоматичне перенавчання при дрейфі даних. Моделі тепер живуть довго і надійно. Це саме той виклик, заради якого я прийшов у ML-інфраструктуру.",
    quoteEn:
      "I built an MLOps platform from scratch — Kubernetes, MLflow, automatic retraining on data drift. Models now live long and reliably in production. That's exactly the challenge I came to ML infrastructure for.",
    emoji: "⚙️",
  },
];

export const JOBS: JobPosting[] = [
  {
    slug: "ml-engineer",
    titleUk: "ML Engineer",
    titleEn: "ML Engineer",
    departmentUk: "Розробка",
    departmentEn: "Engineering",
    typeUk: "Повна зайнятість",
    typeEn: "Full-time",
    locationUk: "Віддалено, UK/EU",
    locationEn: "Remote, UK/EU",
    salaryMin: 4000,
    salaryMax: 7000,
    currency: "GBP",
    descriptionUk:
      "Розробляємо ML-рішення від збору даних до продакшену. Ви будуєте пайплайни обробки даних, навчаєте моделі, розгортаєте їх через FastAPI та підтримуєте MLOps-інфраструктуру.",
    descriptionEn:
      "Building production ML models end-to-end — data pipelines, model training, FastAPI serving, MLOps infrastructure.",
    requirementsUk: [
      "3+ роки досвіду в ML та Python",
      "PyTorch або TensorFlow",
      "scikit-learn",
      "FastAPI або Flask",
      "Docker / Kubernetes",
      "MLflow або Weights & Biases",
      "Git",
    ],
    requirementsEn: [
      "3+ years ML/Python experience",
      "PyTorch or TensorFlow",
      "scikit-learn",
      "FastAPI or Flask",
      "Docker / Kubernetes",
      "MLflow or Weights & Biases",
      "Git",
    ],
    niceToHaveUk: [
      "LLM / LangChain",
      "Apache Spark",
      "Хмарні платформи (AWS / GCP / Azure)",
      "Комп'ютерний зір",
    ],
    niceToHaveEn: [
      "LLM / LangChain",
      "Apache Spark",
      "Cloud platforms (AWS / GCP / Azure)",
      "Computer vision",
    ],
    responsibilitiesUk: [
      "Навчання та розгортання ML-моделей у продакшені",
      "Побудова MLOps-пайплайнів",
      "Написання unit-тестів",
      "Участь у code review",
      "Технічна комунікація з клієнтами",
    ],
    responsibilitiesEn: [
      "Train and deploy ML models to production",
      "Build MLOps pipelines",
      "Write unit tests",
      "Participate in code review",
      "Communicate with clients on technical matters",
    ],
    benefitsUk: [
      "100% Remote",
      "Гнучкий графік (core hours 10–16 UTC)",
      "£1 500/рік на навчання",
      "Опціони на акції",
      "MacBook або £2 000 на обладнання",
      "25 днів відпустки на рік",
    ],
    benefitsEn: [
      "100% remote",
      "Flexible hours (core 10–16 UTC)",
      "£1,500/year learning budget",
      "Equity options",
      "MacBook or £2,000 equipment budget",
      "25 days PTO",
    ],
    datePosted: "2026-05-01",
    isUrgent: true,
  },
  {
    slug: "data-scientist",
    titleUk: "Data Scientist",
    titleEn: "Data Scientist",
    departmentUk: "Аналіз даних",
    departmentEn: "Data Science",
    typeUk: "Повна зайнятість",
    typeEn: "Full-time",
    locationUk: "Віддалено, UK/EU",
    locationEn: "Remote, UK/EU",
    salaryMin: 3500,
    salaryMax: 6000,
    currency: "GBP",
    descriptionUk:
      "Проєктуєте та проводите ML-експерименти, виконуєте розвідувальний аналіз даних, інженерію ознак, оцінку та вдосконалення моделей.",
    descriptionEn:
      "Designing and running ML experiments, EDA, feature engineering, model evaluation and improvement.",
    requirementsUk: [
      "2+ роки досвіду в Data Science",
      "Python: pandas, numpy, scikit-learn",
      "Jupyter Notebooks",
      "Статистичне моделювання",
      "SQL",
      "Відстеження експериментів",
    ],
    requirementsEn: [
      "2+ years data science experience",
      "Python (pandas / numpy / sklearn)",
      "Jupyter Notebooks",
      "Statistical modelling",
      "SQL",
      "Experiment tracking",
    ],
    niceToHaveUk: [
      "Часові ряди",
      "NLP",
      "Plotly / Streamlit",
      "A/B-тестування",
    ],
    niceToHaveEn: [
      "Time series",
      "NLP",
      "Plotly / Streamlit",
      "A/B testing",
    ],
    responsibilitiesUk: [
      "Ведення фаз дослідження даних та EDA",
      "Проєктування експериментів",
      "Написання звітів з оцінки моделей",
      "Комунікація інсайтів з нетехнічними стейкхолдерами",
    ],
    responsibilitiesEn: [
      "Lead data discovery and EDA phases",
      "Design experiments",
      "Write model evaluation reports",
      "Communicate insights to non-technical stakeholders",
    ],
    benefitsUk: [
      "100% Remote",
      "Гнучкий графік (core hours 10–16 UTC)",
      "£1 500/рік на навчання",
      "Опціони на акції",
      "MacBook або £2 000 на обладнання",
      "25 днів відпустки на рік",
    ],
    benefitsEn: [
      "100% remote",
      "Flexible hours (core 10–16 UTC)",
      "£1,500/year learning budget",
      "Equity options",
      "MacBook or £2,000 equipment budget",
      "25 days PTO",
    ],
    datePosted: "2026-05-10",
    isUrgent: true,
  },
  {
    slug: "mlops-engineer",
    titleUk: "MLOps Engineer",
    titleEn: "MLOps Engineer",
    departmentUk: "Інфраструктура",
    departmentEn: "Infrastructure",
    typeUk: "Повна зайнятість",
    typeEn: "Full-time",
    locationUk: "Віддалено, UK/EU",
    locationEn: "Remote, UK/EU",
    salaryMin: 4000,
    salaryMax: 7000,
    currency: "GBP",
    descriptionUk:
      "Будуєте та підтримуєте інфраструктуру, яка забезпечує надійну роботу ML-моделей у продакшені — CI/CD, моніторинг, виявлення дрейфу даних, автоматизація перенавчання.",
    descriptionEn:
      "Building and maintaining the infrastructure that keeps ML models reliable in production — CI/CD, monitoring, drift detection, retraining automation.",
    requirementsUk: [
      "3+ роки досвіду в DevOps / MLOps",
      "Kubernetes",
      "Docker",
      "Terraform або Helm",
      "MLflow або Kubeflow",
      "CI/CD: GitHub Actions",
      "PostgreSQL",
      "Моніторинг: Prometheus / Grafana",
    ],
    requirementsEn: [
      "3+ years DevOps / MLOps experience",
      "Kubernetes",
      "Docker",
      "Terraform or Helm",
      "MLflow or Kubeflow",
      "CI/CD (GitHub Actions)",
      "PostgreSQL",
      "Monitoring (Prometheus / Grafana)",
    ],
    niceToHaveUk: [
      "AWS SageMaker",
      "Azure ML",
      "Apache Airflow",
      "Apache Spark",
    ],
    niceToHaveEn: [
      "AWS SageMaker",
      "Azure ML",
      "Apache Airflow",
      "Apache Spark",
    ],
    responsibilitiesUk: [
      "Побудова та супровід ML-пайплайнів у продакшені",
      "Налаштування моніторингу та алертів для моделей",
      "Автоматизація перенавчання при дрейфі даних",
      "Підтримка CI/CD для ML-репозиторіїв",
      "Оптимізація витрат хмарної інфраструктури",
    ],
    responsibilitiesEn: [
      "Build and maintain production ML pipelines",
      "Set up model monitoring and alerting",
      "Automate retraining on data drift",
      "Maintain CI/CD for ML repositories",
      "Optimise cloud infrastructure costs",
    ],
    benefitsUk: [
      "100% Remote",
      "Гнучкий графік (core hours 10–16 UTC)",
      "£1 500/рік на навчання",
      "Опціони на акції",
      "MacBook або £2 000 на обладнання",
      "25 днів відпустки на рік",
    ],
    benefitsEn: [
      "100% remote",
      "Flexible hours (core 10–16 UTC)",
      "£1,500/year learning budget",
      "Equity options",
      "MacBook or £2,000 equipment budget",
      "25 days PTO",
    ],
    datePosted: "2026-05-15",
    isUrgent: false,
  },
  {
    slug: "ml-tech-lead",
    titleUk: "Технічний лід ML",
    titleEn: "Technical ML Lead",
    departmentUk: "Керівництво",
    departmentEn: "Leadership",
    typeUk: "Повна зайнятість",
    typeEn: "Full-time",
    locationUk: "Віддалено, UK/EU",
    locationEn: "Remote, UK/EU",
    salaryMin: 7000,
    salaryMax: 10000,
    currency: "GBP",
    descriptionUk:
      "Керуєте доставкою ML-проєктів від discovery до продакшену. Визначаєте архітектуру, менторите інженерів, спілкуєтеся з клієнтами.",
    descriptionEn:
      "Leading ML project delivery from discovery to production. Define architecture, mentor engineers, communicate with clients.",
    requirementsUk: [
      "5+ років досвіду в ML-розробці",
      "Підтверджений досвід запуску ML у продакшен",
      "Впевнений Python",
      "Проєктування архітектури систем",
      "Відмінна англійська (C1+)",
    ],
    requirementsEn: [
      "5+ years ML engineering experience",
      "Proven track record shipping ML to production",
      "Strong Python",
      "Architecture design",
      "Excellent English (C1+)",
    ],
    responsibilitiesUk: [
      "Визначення технічної архітектури ML-рішень",
      "Менторство та code review для команди інженерів",
      "Ведення технічного discovery з клієнтами",
      "Оцінка ризиків та планування спринтів",
      "Забезпечення якості та своєчасної доставки проєктів",
    ],
    responsibilitiesEn: [
      "Define technical architecture for ML solutions",
      "Mentor engineers and lead code reviews",
      "Run technical discovery sessions with clients",
      "Assess risks and plan sprints",
      "Ensure quality and on-time project delivery",
    ],
    benefitsUk: [
      "100% Remote",
      "Гнучкий графік (core hours 10–16 UTC)",
      "£2 000/рік на навчання",
      "Опціони на акції",
      "MacBook або £2 000 на обладнання",
      "25 днів відпустки на рік",
    ],
    benefitsEn: [
      "100% remote",
      "Flexible hours (core 10–16 UTC)",
      "£2,000/year learning budget",
      "Equity options",
      "MacBook or £2,000 equipment budget",
      "25 days PTO",
    ],
    datePosted: "2026-06-01",
    isUrgent: false,
  },
];

export const JOB_SLUGS = JOBS.map((j) => j.slug);

export function getJob(slug: string): JobPosting | undefined {
  return JOBS.find((j) => j.slug === slug);
}
