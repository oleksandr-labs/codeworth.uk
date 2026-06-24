import { TrendingUp, Brain, Eye, GitBranch, Bot, BarChart3, MessageSquare } from "lucide-react";

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServicePackage {
  name: string;
  price: string;
  desc: string;
  features: string[];
  highlight: boolean;
}

export interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceCaseStudy {
  client: string;
  niche: string;
  result: string;
  metric: string;
}

export interface ServiceUseCase {
  niche: string;
  emoji: string;
  description: string;
}

export interface ServiceComparisonRow {
  approach: string;
  ukDesc: string;
  enDesc: string;
  ukWhen: string;
  enWhen: string;
}

export interface ServiceBeforeAfterRow {
  metric: string;
  before: string;
  after: string;
  improvement: string;
}

export interface ServiceCrossLink {
  slug: string;
  ukLabel: string;
  enLabel: string;
  ukDesc: string;
  enDesc: string;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  iconColor: string;
  gradient: string;
  keyword: string;
  metaDescription: string;
  features: ServiceFeature[];
  includes: string[];
  packages?: ServicePackage[];
  faq: { q: string; a: string }[];
  deliveryTime: string;
  priceFrom: string;
  processSteps?: ServiceProcessStep[];
  caseStudies?: ServiceCaseStudy[];
  useCases?: ServiceUseCase[];
  techStack?: string[];
  crossLink?: ServiceCrossLink;
  comparisonTable?: ServiceComparisonRow[];
  beforeAfter?: ServiceBeforeAfterRow[];
  demoComponent?: "ai-copywriter" | "ai-edtech" | "ai-hospitality";
}

export const SERVICES_DATA: Service[] = [
  {
    slug: "artificial-intelligence",
    title: "Штучний інтелект для бізнесу",
    shortTitle: "Штучний інтелект",
    description: "GPT-боти, комп'ютерний зір, NLP — AI, що автоматизує реальні бізнес-процеси та скорочує витрати.",
    longDescription: "Впроваджуємо рішення на основі штучного інтелекту: від RAG-бота для підтримки клієнтів 24/7 (обробляє до 68% запитів без оператора) до Computer Vision-систем для виробничого контролю якості (-96% пропущених дефектів). NLP аналізує тисячі відгуків щохвилини, GenAI генерує контент у 12× швидше за людину. Обираємо підхід — Prompt Engineering, RAG або Fine-tuning — залежно від вашого завдання та бюджету.",
    icon: Brain,
    color: "from-violet-500 to-purple-700",
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
    gradient: "from-violet-600 to-purple-700",
    keyword: "штучний інтелект для бізнесу Україна",
    metaDescription: "Штучний інтелект для бізнесу в Україні. GPT-боти, RAG, NLP, комп'ютерний зір, GenAI. Codeworth від £375. Реальні кейси: -68% навантаження на підтримку, -96% пропущених дефектів.",
    features: [
      { title: "GPT-бот з базою знань (RAG)", description: "Чат-бот на GPT-4o або Claude навчений на вашому контенті — відповідає клієнтам 24/7 без «галюцинацій». Кейс: SupportAI — 68% запитів закриваються без оператора, -$38K/рік на підтримку." },
      { title: "Комп'ютерний зір (CV)", description: "Детекція дефектів, об'єктів, обличь у реальному часі. YOLOv8 + PyTorch. Кейс: QualityEye — пропущених дефектів -96%, швидкість контролю ×12 vs ручний." },
      { title: "NLP та аналіз тексту", description: "Sentiment-аналіз відгуків, класифікація запитів, NER, аналіз договорів. Кейс: BrandPulse — час реакції на негатив з 48 год до 1.8 год, рейтинг +0.7 зірки." },
      { title: "AI-аналіз документів (LegalTech)", description: "RAG-пайплайн на LangChain: автоматичний витяг умов договорів, ризикових клаузул, порівняння версій. Кейс: DocSense — аналіз договору з 2 год до 18 хв." },
      { title: "Генерація контенту (GenAI)", description: "Автоматичне створення SEO-текстів, описів товарів, постів — у вашому brand voice. Час на контент ×12 швидше, стабільна якість на масштабі тисяч одиниць." },
      { title: "Голосовий AI та розпізнавання мови", description: "Транскрипція дзвінків (Whisper), голосові боти для call-центрів, voice search для mobile-застосунків. Підтримка UA/EN/RU мов." },
    ],
    includes: [
      "AI-аудит бізнес-задачі та вибір підходу з максимальним ROI (LLM / RAG / CV / GenAI)",
      "Розробка RAG-пайплайну, CV-рішення або NLP-системи",
      "API-інтеграція у ваш сайт, CRM, ERP або Telegram",
      "Vector DB для семантичного пошуку (Qdrant / Pinecone / Weaviate)",
      "Тестування якості та точності моделі на реальних даних",
      "Хмарний деплой (AWS EU / GCP / self-hosted) + Docker",
      "Документація, навчання команди та 3 місяці підтримки",
    ],
    packages: [
      {
        name: "AI Assistant",
        price: "від £375",
        desc: "GPT-бот для сайту або Telegram",
        features: ["GPT-4o / Claude 3.5 Sonnet", "До 200 документів у RAG", "Telegram або iframe на сайт", "Fallback на менеджера при невпевненості", "Аналітика запитів (дашборд)", "1 міс. підтримки"],
        highlight: false,
      },
      {
        name: "RAG Solution",
        price: "від £1,000",
        desc: "AI навчений на вашому контенті",
        features: ["RAG-пайплайн (LangChain + Qdrant)", "До 10 000 документів / сторінок", "Мультимодальні джерела (PDF, web, DB)", "API + інтеграція у будь-який канал", "Дашборд аналітики + intent analytics", "3 міс. підтримки + щомісячна оптимізація"],
        highlight: true,
      },
      {
        name: "Computer Vision / NLP",
        price: "від £1,250",
        desc: "CV або NLP-система корпоративного рівня",
        features: ["YOLOv8 / BERT / CLIP моделі", "Навчання на ваших даних (custom dataset)", "Real-time inference endpoint (< 100ms)", "React-дашборд з аналітикою та алертами", "MLOps моніторинг якості моделі", "Edge або хмарний деплой (NVIDIA Jetson / AWS)"],
        highlight: false,
      },
    ],
    faq: [
      { q: "Для якого бізнесу підходить AI?", a: "Для будь-якого, де є повторювані задачі: підтримка клієнтів, класифікація заявок, аналіз текстів, скринінг документів, контроль якості на виробництві, генерація контенту в масштабі." },
      { q: "Скільки коштує GPT-бот для сайту?", a: "Базовий RAG-бот з 200 документами у базі — від £375. Корпоративний RAG-пайплайн до 10 000 документів з дашбордом аналітики — від £1,000. CV або NLP-система — від £1,250." },
      { q: "Чи буде бот «галюцинувати»?", a: "З RAG — ні. Бот відповідає лише на основі вашого контенту (вектори у Qdrant). Якщо відповіді немає в базі — відповідає 'не знаю' або переключає на менеджера. Ніяких вигаданих фактів." },
      { q: "Чи підтримуєте після запуску?", a: "Так. Усі пакети включають підтримку (1–3 міс.). Після — monthly retainer від £125: моніторинг якості, оновлення бази знань, оптимізація промптів, alert при деградації точності." },
      { q: "Яка точність комп'ютерного зору?", a: "Залежить від задачі та якості датасету. На типових задачах (дефекти виробництва, QR, штрих-коди, обличчя) — 90–97%. Для медичної діагностики — від 94%. Гарантуємо baseline accuracy на PoC-фазі." },
      { q: "Де зберігаються дані клієнтів?", a: "RAG-вектори зберігаються у Qdrant на вашому сервері або EU-хмарі (AWS Frankfurt / GCP europe-west3). Запити до OpenAI/Claude йдуть через enterprise tier — не використовуються для навчання моделей. CV-обробка — виключно на вашій інфраструктурі. Підписуємо NDA та DPA (Data Processing Agreement) до початку роботи." },
      { q: "Скільки часу займає впровадження?", a: "Простий GPT-бот — 1–2 тижні. RAG-рішення — 3–5 тижнів. CV або NLP-система корпоративного рівня — 5–10 тижнів залежно від об'єму даних. Завжди починаємо з PoC за 1–2 тижні, щоб ви побачили результат до повного бюджету." },
      { q: "Чи можна AI інтегрувати в CRM або Telegram?", a: "Так. Інтегруємо в будь-який канал через REST API: ваш сайт, Telegram-бот, Viber, CRM (Salesforce, HubSpot, Bitrix24), ERP, 1C, Shopify, власні системи. Усі інтеграції входять у вартість пакету." },
      { q: "Чи відповідає AI-рішення вимогам GDPR?", a: "Так. Для GDPR-чутливих проєктів (медицина, фінанси, HR) будуємо self-hosted архітектуру: Qdrant векторна база на вашому сервері, ніяких ПД за межами інфраструктури клієнта. Для UK-проєктів — UK GDPR + ICO compliance. Підписуємо DPA (Data Processing Agreement) до початку роботи з будь-якими персональними даними." },
      { q: "Що таке RAG і чим він кращий за звичайного GPT-бота?", a: "RAG (Retrieval-Augmented Generation) — бот спочатку шукає відповідь у вашій базі знань (документи, FAQ, каталог), а потім генерує відповідь на основі знайденого. Звичайний GPT відповідає зі своїх тренувальних даних — може вигадати факти. RAG-бот відповідає лише з вашого контенту, цитує джерело і каже 'не знаю', якщо відповіді немає. Жодних галюцинацій." },
      { q: "Чи можна зробити бота, що відповідає двома мовами (українська + англійська)?", a: "Так, це наша спеціалізація для UK+UA ринку. Білінгвальний RAG-бот: одна база знань, дві локалі — автодетекція мови запиту через langdetect, locale-tagged документи у Qdrant, GPT-4o відповідає мовою клієнта з локально-специфічним контентом (ціни £/₴, контакти, адреси). Підходить для діаспорних бізнесів та компаній з представництвами в Україні і Великобританії." },
      { q: "Що таке Making Tax Digital і як AI допомагає з MTD compliance?", a: "MTD — обов'язкова програма HMRC (UK), що вимагає вести цифровий облік та подавати VAT-звіти через API-сумісне ПЗ. Наша система AI-обробки рахунків (InvoiceAI) автоматично витягує дані з документів через GPT-4o Vision та синхронізує з Xero/QuickBooks у MTD-сумісному форматі. Штрафи HMRC за порушення MTD — від £200 на квартал." },
      { q: "Коли обирати AI (GPT/RAG/CV), а коли ML (XGBoost/LSTM)?", a: "AI — якщо задача пов'язана з мовою, текстом, зображеннями або голосом: чат-боти, аналіз документів, генерація контенту, комп'ютерний зір, мовна модель навчена на вашому контенті (RAG). ML — якщо задача про структуровані дані та прогнозування: fraud detection, churn prediction, demand forecasting, кредитний скоринг, рекомендації. Часто вони доповнюють одне одного: ML-модель прогнозує ризик відтоку → AI-бот надсилає персоналізований retention-офер. Безкоштовна консультація допоможе визначити оптимальний підхід для вашої задачі." },
    ],
    deliveryTime: "2–10 тижнів",
    priceFrom: "£375",
    techStack: ["OpenAI GPT-4o", "Claude 3.5 Sonnet", "LangChain", "LlamaIndex", "Qdrant", "Pinecone", "YOLOv8", "OpenCV", "Whisper", "HuggingFace", "FastAPI", "Python", "Docker"],
    demoComponent: "ai-copywriter",
    crossLink: {
      slug: "machine-learning",
      ukLabel: "Потрібна кастомна ML-модель?",
      enLabel: "Need a custom ML model?",
      ukDesc: "Fraud detection, прогноз попиту, рекомендаційні системи та MLOps — дивіться наш розділ Machine Learning.",
      enDesc: "Fraud detection, demand forecasting, recommendation engines and MLOps — see our Machine Learning service.",
    },
    comparisonTable: [
      {
        approach: "Prompt Engineering",
        ukDesc: "Налаштування запитів до готової LLM без навчання",
        enDesc: "Tuning prompts for an existing LLM with no training",
        ukWhen: "Швидкий старт, невеликий бюджет, загальні задачі",
        enWhen: "Quick start, limited budget, general tasks",
      },
      {
        approach: "RAG",
        ukDesc: "LLM + ваша база знань (документи, FAQ, каталог, сайт)",
        enDesc: "LLM + your knowledge base (docs, FAQ, catalogue, website)",
        ukWhen: "Точні відповіді з вашого контенту, без «галюцинацій», будь-який обсяг",
        enWhen: "Accurate answers from your own content, no hallucinations, any scale",
      },
      {
        approach: "Fine-tuning",
        ukDesc: "Донавчання базової моделі на ваших даних та стилі",
        enDesc: "Further training a base model on your own data and tone",
        ukWhen: "Специфічний домен, тон бренду, максимальна точність у вузькій задачі",
        enWhen: "Specific domain, brand voice, maximum accuracy for a narrow task",
      },
      {
        approach: "Computer Vision",
        ukDesc: "Навчання моделі YOLOv8 / CLIP на ваших зображеннях",
        enDesc: "Training a YOLOv8 / CLIP model on your own images",
        ukWhen: "Візуальний контроль якості, пошук за фото, детекція об'єктів",
        enWhen: "Visual QA, image-based search, object or defect detection",
      },
    ],
    beforeAfter: [
      { metric: "Запити підтримки (без оператора)", before: "0% автоматизовано", after: "68% закриває AI-бот", improvement: "+68 пп" },
      { metric: "Час аналізу документу", before: "2 год / договір", after: "18 хв / договір", improvement: "−85%" },
      { metric: "Пропущені дефекти (CV-контроль)", before: "15% дефектів пропущено", after: "0.6% дефектів пропущено", improvement: "−96%" },
      { metric: "Час реакції на негативний відгук", before: "48 год", after: "1.8 год", improvement: "−96%" },
      { metric: "Швидкість генерації контенту", before: "1 текст / 45 хв (копірайтер)", after: "1 текст / 4 хв (GenAI)", improvement: "×12" },
    ],
    processSteps: [
      { step: 1, title: "AI-аудит задачі", description: "Аналізуємо ваші процеси, дані та цілі. Визначаємо підхід (RAG / CV / NLP / GenAI) з найвищим ROI та прогнозованим бізнес-ефектом." },
      { step: 2, title: "Proof of Concept (1–2 тижні)", description: "Будуємо прототип на реальних даних. Ви бачите точність та корисність рішення до повного бюджету — знижуємо ризик рішення." },
      { step: 3, title: "Продакшн-розробка", description: "Масштабуємо PoC до надійного продакшн-рішення: API, інтеграції, дашборд, алерти, безпека даних (NDA + DPA)." },
      { step: 4, title: "Запуск та моніторинг", description: "Деплой, навчання команди, моніторинг якості моделі. Щомісячна оптимізація промптів та бази знань у retainer." },
    ],
    caseStudies: [
      { client: "SupportAI", niche: "SaaS / Підтримка клієнтів", result: "RAG-бот обробляє 68% запитів без оператора. Навантаження на підтримку -$38K/рік.", metric: "−68%" },
      { client: "QualityEye", niche: "Виробництво (Textile)", result: "CV-система YOLOv8: пропущених дефектів -96%, швидкість контролю ×12 vs ручний.", metric: "−96%" },
      { client: "DocSense", niche: "LegalTech", result: "AI аналіз договорів (LangChain + GPT-4o): час review з 2 год до 18 хв, пропущені ризики -94%.", metric: "18 хв" },
    ],
    useCases: [
      { niche: "Підтримка клієнтів", emoji: "🎧", description: "RAG чат-бот 24/7 — відповідає з вашої бази знань, переключає на менеджера тільки при складних випадках" },
      { niche: "LegalTech / Документи", emoji: "⚖️", description: "AI-аналіз договорів: витяг умов, ризикові клаузули, порівняння версій — замість 2 год ручного read" },
      { niche: "Виробництво / QA", emoji: "🏭", description: "Computer Vision для контролю якості на конвеєрі: детекція дефектів у реальному часі, -96% браку" },
      { niche: "E-commerce / Fashion", emoji: "🛒", description: "Візуальний пошук (CLIP + Qdrant), AI-генерація описів товарів, персоналізація каталогу" },
      { niche: "HR та рекрутинг", emoji: "👥", description: "AI-скринінг резюме (spaCy + GPT-4o): 300 CV за 4 год замість 4 днів, точність відбору 89%" },
      { niche: "Контент та маркетинг", emoji: "✍️", description: "GenAI-копірайтинг у вашому brand voice: SEO-тексти, описи, пости — ×12 швидше за людину" },
      { niche: "FinTech та бухгалтерія", emoji: "🧾", description: "GPT-4o Vision OCR рахунків: обробка 8 хв → 25 сек (−95%), Making Tax Digital (UK), Xero/1С sync, −99% помилок введення" },
      { niche: "Освіта (EdTech)", emoji: "🎓", description: "AI-тьютор з адаптивним навчанням (IRT діагностика, Whisper вимова, GPT-4o розмовна практика): completion rate 34% → 71%" },
      { niche: "Готельний бізнес (Hospitality)", emoji: "🏨", description: "Voice AI консьєрж: Whisper STT → GPT-4o → ElevenLabs TTS, EN/UA/PL, check-in/послуги/ресторан без персоналу" },
      { niche: "Медицина та клініки", emoji: "🏥", description: "GDPR-сумісний RAG для клінік: пошук у медичній документації -87% часу, клінічний чат-бот, AI-аналіз симптомів. FHIR R4, дані зберігаються on-premise." },
    ],
  },
  {
    slug: "machine-learning",
    title: "Machine Learning для бізнесу",
    shortTitle: "Machine Learning",
    description: "Кастомні ML-моделі, предиктивна аналітика та MLOps — перетворюємо ваші дані на конкурентну перевагу.",
    longDescription: "Розробляємо та впроваджуємо ML-рішення повного циклу: fraud detection (-97% шахрайства за 2 місяці), прогнозування відтоку (-31% churn), demand forecasting (-34% надлишку запасів), рекомендаційні системи (+176% CTR), динамічне ціноутворення (+18% маржі). Від аудиту даних і навчання моделі — до продакшн-деплою з MLOps-моніторингом та автоматичним перенавчанням.",
    icon: TrendingUp,
    color: "from-indigo-500 to-blue-700",
    bg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    gradient: "from-indigo-600 to-blue-700",
    keyword: "machine learning для бізнесу Україна",
    metaDescription: "Machine Learning для бізнесу в Україні. Fraud detection, прогноз відтоку, рекомендації, MLOps. Codeworth від £750. Реальні кейси: -97% fraud, +176% CTR рекомендацій, -34% залишків.",
    features: [
      { title: "Предиктивна аналітика та Churn", description: "XGBoost / LightGBM на 40+ поведінкових фічах. Кейс: RetainIQ — churn з 8.4% до 5.8% (-31%), MRR retention +$42K/міс, Customer Success продуктивність ×3." },
      { title: "Fraud Detection та скоринг", description: "Real-time ML-пайплайн: LightGBM + Kafka + Redis feature store, p99 latency < 30ms. Кейс: FraudShield — fraud rate -97%, false positives -40%, збитки -$180K/міс." },
      { title: "Рекомендаційні системи", description: "Hybrid: collaborative filtering (PyTorch) + content-based (TF-IDF + embeddings). Кейс: PersonaCart — CTR рекомендацій +176% (1.3%→3.6%), середній чек +22%, revenue +$380K/кв." },
      { title: "Demand Forecasting", description: "Ensemble XGBoost + Prophet по кожній SKU × магазин, Airflow DAG щоночі. Кейс: StockSense — надлишок запасів -34%, списання -41%, MAPE 8.3% vs 27% baseline." },
      { title: "Динамічне ціноутворення", description: "LightGBM з 30+ фічами (конкуренти, залишки, сезонність), оновлення щогодини. Кейс: PriceSense — маржа +18%, revenue +$67K/міс при тому ж трафіку." },
      { title: "MLOps та продакшн-деплой", description: "MLflow для версіонування, Airflow DAG для перенавчання, моніторинг drift. Без MLOps модель деградує за 3–6 місяців — ми цього не допускаємо." },
    ],
    includes: [
      "Аудит даних: якість, обсяг, feature importance, оцінка досяжної точності",
      "Feature engineering: очистка, трансформації, синтетичні дані при нестачі",
      "Навчання та валідація моделі з hyperparameter tuning (Optuna / Ray Tune)",
      "REST / gRPC API-інтеграція у ваш стек (CRM, ERP, Shopify, 1C)",
      "A/B тестування нової ML-моделі проти базової метрики",
      "Продакшн-деплой: Docker + FastAPI / AWS SageMaker / GCP Vertex AI",
      "MLOps: MLflow + Airflow, моніторинг data drift, автоматичне перенавчання",
    ],
    packages: [
      {
        name: "ML Starter",
        price: "від £750",
        desc: "Аудит даних + перша ML-модель",
        features: ["Аудит якості та підготовка даних", "Базова модель (XGBoost / LightGBM)", "Hyperparameter tuning + валідація", "REST API endpoint", "Jupyter-звіт з поясненням результатів (SHAP)", "1 міс. підтримки"],
        highlight: false,
      },
      {
        name: "ML Production",
        price: "від £1,500",
        desc: "Кастомна модель + деплой + MLOps",
        features: ["Розширений feature engineering", "Ансамблі моделей + A/B тест vs baseline", "FastAPI endpoint (< 50ms latency)", "Інтеграція у ваш стек (CRM / ERP / SaaS)", "MLflow версіонування + моніторинг drift", "Дашборд метрик (React) + Telegram-алерти", "3 міс. підтримки + quarterly model review"],
        highlight: true,
      },
      {
        name: "ML Platform",
        price: "за узгодженням",
        desc: "Кілька моделей + Airflow + повна автоматизація",
        features: ["2–5 ML-моделей на одній платформі", "Airflow DAG: automated retraining", "Streaming data pipeline (Kafka / Spark)", "Feature store (Redis / Feast)", "Дашборд C-level з бізнес-метриками", "Щоквартальний ML-огляд та roadmap"],
        highlight: false,
      },
    ],
    faq: [
      { q: "Скільки даних потрібно для ML-моделі?", a: "Мінімум 1 000–5 000 записів для базових задач (класифікація, регресія). Fraud detection або рекомендації — від 10 000–50 000. Якщо даних мало, використовуємо transfer learning, синтетичну генерацію (SMOTE) та feature engineering для компенсації обсягу." },
      { q: "Яка точність ML-моделей?", a: "Залежить від задачі та якості даних. Fraud detection: AUC 0.97–0.99, precision 92–95%. Прогноз відтоку: AUC 0.85–0.95, F1 0.80–0.91. Demand forecasting: MAPE 5–12%. Рекомендації: CTR +100–200% vs baseline. Гарантуємо baseline accuracy до початку повної розробки — показуємо на PoC." },
      { q: "Що таке MLOps і навіщо він потрібен?", a: "MLOps — підтримка ML-моделі в продакшні. Без нього: за 3–6 місяців розподіл вхідних даних зміщується (data drift) і точність моделі падає непомітно. З MLOps: автоматичний моніторинг якості, Telegram-алерт при деградації нижче порогу, автоматичне перенавчання за розкладом (Airflow). Включено у пакети ML Production та ML Platform." },
      { q: "Як ML інтегрується у наші системи?", a: "Через REST або gRPC API — ваш бекенд надсилає запит і отримує прогноз за < 50ms. Підтримуємо інтеграцію з CRM (Salesforce, HubSpot, Bitrix24), ERP (SAP, 1C), Shopify, WooCommerce, власними системами. Для real-time завдань (fraud detection) — Kafka streaming pipeline з Redis feature store." },
      { q: "Де обробляються дані для навчання моделі?", a: "Дані залишаються на вашій інфраструктурі або EU-хмарі (AWS Frankfurt / GCP europe-west3). Після завершення проєкту ми не зберігаємо ваших даних. Підписуємо NDA та DPA (Data Processing Agreement) до початку будь-якої роботи з даними." },
      { q: "Скільки часу займає проєкт ML?", a: "ML Starter (перша модель + API): 4–6 тижнів. ML Production (повний цикл + MLOps): 8–12 тижнів. ML Platform (кілька моделей + автоматизація): 3–5 місяців. Завжди починаємо з 2-тижневого PoC — ви бачите результат і приймаєте рішення про продовження." },
      { q: "Що якщо модель не дасть очікуваного результату?", a: "Тому й починаємо з PoC: за 2 тижні ми визначаємо досяжну точність на реальних ваших даних. Якщо PoC показує недостатній ефект — чесно говоримо про це до старту повного проєкту. Прозорість важливіша за продаж." },
      { q: "Чи можна ML-модель зробити поясненою (explainable AI)?", a: "Так. Використовуємо SHAP (SHapley Additive exPlanations) та LIME для інтерпретації будь-якої black-box моделі. Важливо для кредитного скорингу (регуляторні вимоги), медицини та HR — де потрібно пояснити чому модель прийняла рішення." },
      { q: "Чи відповідають ваші ML-рішення вимогам FCA (UK)?", a: "Так. Для FinTech-клієнтів у Великобританії будуємо FCA-compliant системи: SHAP-пояснення для кожного автоматизованого рішення (блокування транзакції, кредитний скоринг), appeals workflow для клієнтів, immutable audit log (5 років). Consumer Duty 2023 compliance — включено в архітектуру з першого дня, не як afterthought." },
      { q: "Як ML допомагає з оптимізацією ланцюга поставок?", a: "XGBoost-модель прогнозує попит по кожному SKU та локації (MAPE 8–13%), автоматично розраховує reorder points та safety stock. Google OR-Tools оптимізує маршрути доставки (Vehicle Routing Problem) — зазвичай −15–25% кілометражу. Типовий результат для FMCG: stockout −70–80%, неліквід на складі −30–45%. ROI — перший повний операційний сезон." },
      { q: "Скільки коштує ML-система для автоматизації підтримки клієнтів?", a: "Базова класифікація тікетів (fine-tuned BERT, Zendesk integration, до 5 категорій): від £625. Повна система (14+ категорій, priority scoring, assignee routing, GPT-4o draft responses, auto-response для типових запитів): від £1,500. Економія для B2B SaaS на 1 200 тікетів/тиждень: −65% часу тріажу, SLA compliance з 67% до 95%+." },
      { q: "Коли ML краще, ніж ручні правила (rule-based logic)?", a: "Правила добре працюють, коли логіка стабільна і однозначна (наприклад, 'якщо сума > 50 000 — запит у перевірку'). ML перевершує правила, коли: (1) факторів багато і їх взаємодія нелінійна (fraud має 50+ ознак); (2) розподіл даних постійно змінюється (нові схеми шахрайства, нові категорії клієнтів); (3) правил стає >50 і вони починають суперечити одне одному; (4) потрібна персоналізація на рівні кожного клієнта (рекомендації, dynamic pricing). Практичне правило: якщо ваш аналітик не може пояснити рішення менше ніж 10 умовами — час для ML." },
    ],
    deliveryTime: "4–12 тижнів",
    priceFrom: "£750",
    techStack: ["Python", "XGBoost", "LightGBM", "PyTorch", "scikit-learn", "Prophet", "MLflow", "Airflow", "Kafka", "Redis", "FastAPI", "Docker", "SHAP", "OR-Tools", "GeoPandas", "PostGIS", "TimescaleDB", "Sentinel-2 API"],
    crossLink: {
      slug: "artificial-intelligence",
      ukLabel: "Шукаєте GPT-бота або NLP?",
      enLabel: "Looking for a GPT bot or NLP?",
      ukDesc: "Чат-боти з базою знань (RAG), комп'ютерний зір, аналіз документів, генерація контенту — дивіться наш розділ Artificial Intelligence.",
      enDesc: "Knowledge-base chatbots (RAG), computer vision, document analysis, content generation — see our Artificial Intelligence service.",
    },
    beforeAfter: [
      { metric: "Відтік клієнтів (churn)", before: "8.4% / міс", after: "5.8% / міс", improvement: "−31%" },
      { metric: "Fraud rate (платіжна платформа)", before: "1.8% транзакцій", after: "0.054% транзакцій", improvement: "−97%" },
      { metric: "Прогноз попиту (MAPE)", before: "27%", after: "8.3%", improvement: "−69%" },
      { metric: "CTR рекомендаційного блоку", before: "1.3%", after: "3.6%", improvement: "+176%" },
      { metric: "Маржинальність (dynamic pricing)", before: "baseline", after: "+18% margin", improvement: "+18%" },
      { metric: "Незапланований простій обладнання", before: "47 год / міс", after: "12.7 год / міс", improvement: "−73%" },
    ],
    processSteps: [
      { step: 1, title: "Аудит даних (1 тиждень)", description: "Оцінюємо якість, обсяг та повноту ваших даних. Визначаємо ML-задачу, прогнозуємо досяжну точність і ROI. Без аудиту — не починаємо." },
      { step: 2, title: "PoC та валідація (1–2 тижні)", description: "Навчаємо першу версію моделі на реальних даних. Вимірюємо точність та бізнес-ефект. Ви приймаєте рішення про продовження на основі фактів." },
      { step: 3, title: "Продакшн-розробка (3–8 тижнів)", description: "Масштабуємо PoC: feature engineering, ансамблі, A/B тест, FastAPI endpoint, інтеграція в CRM/ERP, дашборд для команди." },
      { step: 4, title: "MLOps та моніторинг", description: "MLflow для версіонування, Airflow для автоматичного перенавчання, моніторинг data drift, Telegram-алерти при деградації якості. Модель завжди актуальна." },
    ],
    caseStudies: [
      { client: "FraudShield", niche: "FinTech / Платіжна платформа", result: "ML fraud detection (LightGBM + Kafka): fraud rate -97%, збитки -$180K/міс, latency p99 < 30ms.", metric: "−97%" },
      { client: "RetainIQ", niche: "B2B SaaS (HR-автоматизація)", result: "Churn prediction (XGBoost, 40+ фіч): відтік -31% за квартал, MRR retention +$42K/міс.", metric: "−31%" },
      { client: "StockSense", niche: "Рітейл (120 магазинів)", result: "Demand forecasting (XGBoost + Prophet): надлишок запасів -34%, списання -41%, MAPE 8.3%.", metric: "−34%" },
    ],
    useCases: [
      { niche: "Фінанси та FinTech", emoji: "💰", description: "Fraud detection (< 30ms latency), кредитний скоринг (SHAP-explainability), прогноз дефолту" },
      { niche: "E-commerce та ритейл", emoji: "🛒", description: "Рекомендації (+176% CTR), динамічне ціноутворення (+18% маржі), demand forecasting (-34% залишків)" },
      { niche: "SaaS та продукти", emoji: "💻", description: "Churn prediction (-31% відтоку), LTV-оцінка, аномалії в поведінці користувачів" },
      { niche: "Виробництво та IoT", emoji: "🏭", description: "Predictive maintenance (LSTM + IoT): незапланований простій -73%, ROI за 5 місяців" },
      { niche: "Логістика", emoji: "🚛", description: "Оптимізація маршрутів, прогноз затримок, управління складськими залишками" },
      { niche: "HR та рекрутинг", emoji: "👥", description: "Предиктивний HR-аналітика: прогноз звільнення (12 факторів), turnover -28%, ROI $8/$1" },
      { niche: "Нерухомість (PropTech)", emoji: "🏠", description: "AVM — автоматична оцінка нерухомості (XGBoost + PostGIS, MAPE 4.2%), прогноз орендної дохідності, ризик-скоринг об'єктів" },
      { niche: "Сільське господарство (AgriTech)", emoji: "🌾", description: "ML-прогноз врожайності (MAPE 6.3%), NDVI satellite monitoring, YOLOv8 дронова діагностика хвороб, ELM UK звітність" },
      { niche: "Кібербезпека", emoji: "🛡️", description: "Поведінкова аномалія (Isolation Forest + LSTM), real-time scoring 180ms, FCA/GDPR compliance з SHAP-поясненнями та audit log" },
    ],
  },
  // ─── NLP & Text Processing ───────────────────────────────────────────────
  {
    slug: "nlp",
    title: "NLP та обробка тексту",
    shortTitle: "NLP",
    description: "Класифікація текстів, NER, sentiment-аналіз, RAG — перетворюємо неструктуровані тексти на цінні бізнес-інсайти.",
    longDescription: "Розробляємо NLP-системи повного циклу: від класифікації тікетів підтримки (93% точності) до RAG-пайплайнів для корпоративних документів. Обробляємо сотні тисяч текстів щоденно — відгуки, договори, заявки, медичні нотатки. Підтримуємо мультилінгвальний NLP: EN + UK + PL.",
    icon: MessageSquare,
    color: "from-indigo-500 to-blue-600",
    bg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    gradient: "from-indigo-600 to-blue-600",
    keyword: "NLP розробка Україна",
    metaDescription: "NLP та обробка тексту для бізнесу. Класифікація, NER, sentiment, RAG. Codeworth від £1,125. Реальні кейси: 93% точність класифікації тікетів, -65% часу тріажу.",
    features: [
      { title: "Класифікація текстів та тікетів", description: "Fine-tuned BERT на ваших даних: 14+ категорій, автоматичний routing, prioritization. Кейс: 1 200 тікетів/тиждень — -65% часу тріажу, SLA з 67% до 95%+" },
      { title: "Sentiment-аналіз та репутація бренду", description: "Аналіз відгуків, соцмереж, NPS у реальному часі. Багатокласовий sentiment (позитив/нейтраль/негатив/urgent). Кейс: BrandPulse — час реакції з 48 год до 1.8 год, рейтинг +0.7." },
      { title: "Named Entity Recognition (NER)", description: "Витяг сутностей з контрактів, медичних нотаток, фінансових документів: дати, суми, персони, організації, ризикові клаузули." },
      { title: "RAG та пошук по документах", description: "LangChain + Qdrant: семантичний пошук у корпоративній базі знань, Q&A по PDF/web/DB. Відповіді з посиланням на джерело, без галюцинацій." },
      { title: "Автоматичне резюме та виявлення ключових думок", description: "Abstractive + extractive summarization для дзвінків, нарад, email-ланцюгів. Стиснення до 10–15% без втрати ключових фактів." },
      { title: "Мультилінгвальний NLP (EN + UK + PL)", description: "Один пайплайн — три мови. Auto-detect мови, locale-aware класифікація, переклад з збереженням структури. Підходить для UK+UA бізнесів." },
    ],
    includes: [
      "Аудит задачі та вибір архітектури (fine-tuning / RAG / prompt engineering)",
      "Розмітка та підготовка датасету (annotation pipeline)",
      "Навчання та валідація моделі (F1, precision, recall)",
      "REST API endpoint (FastAPI, < 200ms latency)",
      "Інтеграція з вашим стеком (Zendesk, Salesforce, власна CRM)",
      "Дашборд моніторингу якості + alert при деградації",
      "3 місяці підтримки та дооптимізації",
    ],
    packages: [
      {
        name: "NLP Starter",
        price: "від £1,125",
        desc: "Класифікатор або sentiment-аналізатор",
        features: ["Fine-tuned BERT/DistilBERT", "До 5 класів / категорій", "Датасет від 2 000 прикладів", "REST API endpoint", "SHAP-пояснення рішень", "1 міс. підтримки"],
        highlight: false,
      },
      {
        name: "NLP Production",
        price: "від £2,000",
        desc: "Повна NLP-система з моніторингом",
        features: ["14+ класів, мультизадачна модель", "NER + класифікація + sentiment одночасно", "RAG-пайплайн (LangChain + Qdrant)", "Інтеграція у CRM / Helpdesk", "Дашборд + MLOps моніторинг", "3 міс. підтримки + monthly review"],
        highlight: true,
      },
      {
        name: "Enterprise NLP",
        price: "за узгодженням",
        desc: "Платформа обробки мільйонів текстів",
        features: ["Streaming pipeline (Kafka + Spark NLP)", "Custom transformer від нуля", "On-premise деплой (GDPR-sensitive)", "Active learning з feedback loop", "Дашборд C-level аналітики", "SLA 4 год + quarterly roadmap"],
        highlight: false,
      },
    ],
    faq: [
      { q: "Скільки даних потрібно для NLP-моделі?", a: "Для класифікації тексту — мінімум 500–2 000 прикладів на клас. Для NER — від 1 000 розмічених документів. Якщо даних мало, використовуємо few-shot learning та data augmentation. Точний обсяг визначаємо після аудиту." },
      { q: "Чи підтримує NLP українську мову?", a: "Так. Використовуємо mBERT, XLM-R та uk-specific моделі (робerta-base-uk). Для мультилінгвальних задач — один модель на EN+UK+PL з auto-detect мови. Підходить для UK+UA бізнесів з клієнтами обох ринків." },
      { q: "Яка точність NLP-класифікатора?", a: "Для класифікації тікетів підтримки: F1 92–96% на 14+ категоріях. Sentiment на продуктових відгуках: accuracy 89–93%. NER для договорів: precision 94%, recall 91%. Точні метрики залежать від якості та кількості ваших даних." },
      { q: "Скільки коштує NLP-система?", a: "Базовий класифікатор (до 5 класів, BERT fine-tuning): від £1,125. Повна NLP-система (14+ класів, NER + sentiment, CRM-інтеграція, MLOps): від £2,000. Enterprise-платформа зі streaming та on-premise — за погодженням." },
      { q: "Чи можна NLP інтегрувати в Zendesk або Salesforce?", a: "Так. Ми інтегруємо NLP-моделі через REST API у будь-який helpdesk або CRM: Zendesk (webhook trigger), Salesforce (Apex callout), Freshdesk, Intercom, або власну систему. Час реакції < 200ms, щоб не сповільнювати workflow операторів." },
      { q: "Що таке RAG і коли варто використовувати NLP замість нього?", a: "RAG — пошук + генерація відповіді з бази документів (підходить для Q&A, чат-ботів). NLP — класифікація, витяг сутностей, sentiment (підходить для структурування даних, routing, аналітики). Часто вони доповнюють одне одного: NLP класифікує запит → RAG знаходить відповідь у базі → GPT-4o формулює." },
      { q: "Which NLP models work best for UK legal and financial documents?", a: "General-purpose models (BERT, RoBERTa) work well as starting points. Domain-specific models improve significantly: LegalBERT for UK legal documents, FinBERT for financial text, BioBERT for clinical/life sciences content. For very specialised UK content (FCA Handbook, Companies Act, NHS clinical pathways), fine-tuning on domain data typically adds 8-15% precision over base models. We benchmark multiple models on a sample of your data before committing to an architecture." },
      { q: "What is the difference between NLP and an LLM?", a: "Traditional NLP uses task-specific models — a sentiment classifier, a named entity recogniser, a document classifier — each trained for a specific task with labelled data. LLMs (GPT-4, Claude, Llama) are general-purpose models that can perform many NLP tasks through prompting without task-specific training. LLMs are more flexible but more expensive, slower, and harder to guarantee consistency for high-volume production pipelines. The right choice depends on your use case — we often combine both: an LLM for complex reasoning tasks, a traditional NLP model for high-volume classification." },
      { q: "How do you handle UK English spelling and terminology in NLP models?", a: "UK English has systematic differences from US English that affect NLP model performance: spelling (colour vs color, analyse vs analyze), vocabulary (flat vs apartment, CV vs resume), regulatory terminology (FCA not SEC, VAT not sales tax). We apply UK English pre-processing, fine-tune on UK text corpora where possible, and include UK-specific evaluation benchmarks. This is particularly important for finance and legal NLP where US-trained models miss UK-specific entities and terminology." },
      { q: "Can NLP handle handwritten documents or scanned PDFs?", a: "NLP processes text, not images. Handwritten or scanned documents first require Optical Character Recognition (OCR) — Tesseract (open-source), AWS Textract, Azure Form Recognizer, or Google Document AI — before NLP can process the extracted text. We deliver end-to-end pipelines combining OCR and NLP for document digitisation projects. Quality of OCR output significantly affects NLP accuracy — poor scan quality (faded ink, skewed pages, handwriting) requires pre-processing and may limit achievable NLP accuracy." },
      { q: "What NLP accuracy is achievable for UK document classification?", a: "For well-defined document classification tasks (contract type, invoice routing, regulatory filing categorisation) with sufficient labelled data (1,000+ examples), F1 scores of 0.90-0.97 are achievable. For more subjective tasks (intent classification, sentiment with nuanced context) 0.80-0.90 F1 is typical. For complex information extraction (clause-level contract analysis, multi-entity relationship extraction), precision above 0.85 with recall above 0.80 is the practical target. We set realistic expectations during scoping and always measure against your current manual process." },
    ],
    deliveryTime: "3–8 тижнів",
    priceFrom: "£1,125",
    techStack: ["BERT", "XLM-R", "DistilBERT", "spaCy", "HuggingFace", "LangChain", "Qdrant", "FastAPI", "Python", "Docker", "MLflow"],
    crossLink: {
      slug: "artificial-intelligence",
      ukLabel: "Потрібен GPT-бот на основі ваших документів?",
      enLabel: "Need a GPT chatbot trained on your documents?",
      ukDesc: "Чат-боти 24/7, RAG-рішення та GenAI — дивіться наш розділ Artificial Intelligence.",
      enDesc: "24/7 chatbots, RAG solutions and GenAI — see our Artificial Intelligence service.",
    },
    beforeAfter: [
      { metric: "Час тріажу тікетів підтримки", before: "4.5 год / 100 тікетів", after: "1.6 год / 100 тікетів", improvement: "−65%" },
      { metric: "SLA compliance (helpdesk)", before: "67%", after: "95%+", improvement: "+28 пп" },
      { metric: "Час реакції на негативний відгук", before: "48 год", after: "1.8 год", improvement: "−96%" },
      { metric: "Витяг ключових даних з договорів", before: "2 год / договір (ручна)", after: "4 хв / договір (NER)", improvement: "−97%" },
    ],
    processSteps: [
      { step: 1, title: "Аудит NLP-задачі", description: "Визначаємо тип задачі (класифікація / NER / sentiment / RAG), аналізуємо наявні дані, оцінюємо досяжну точність та строки." },
      { step: 2, title: "Розмітка та PoC (2 тижні)", description: "Налаштовуємо annotation pipeline, розмічаємо seed-датасет, навчаємо перший класифікатор. Ви бачите F1-score до старту повного проєкту." },
      { step: 3, title: "Продакшн-розробка (3–5 тижнів)", description: "Масштабуємо модель: active learning, багатозадачний підхід, API, інтеграція в CRM/helpdesk, дашборд аналітики." },
      { step: 4, title: "Деплой та моніторинг", description: "Запуск, навчання команди, моніторинг дрейфу даних, автоматичне перенавчання при деградації F1." },
    ],
    caseStudies: [
      { client: "SupportML", niche: "B2B SaaS / Helpdesk", result: "BERT-класифікатор 14 категорій: -65% часу тріажу, SLA з 67% до 95%+, Zendesk-інтеграція.", metric: "−65%" },
      { client: "BrandPulse", niche: "Retail / Brand Monitoring", result: "Sentiment-аналіз відгуків: час реакції на негатив з 48 год до 1.8 год, рейтинг +0.7 зірки.", metric: "1.8 год" },
      { client: "DocSense Legal", niche: "LegalTech", result: "NER-пайплайн для договорів: витяг ключових даних з 2 год до 4 хв, покриття ризиків +94%.", metric: "−97%" },
    ],
    useCases: [
      { niche: "Helpdesk / Customer Support", emoji: "🎧", description: "Автокласифікація тікетів, routing до потрібного відділу, priority scoring, draft-відповіді" },
      { niche: "Legal / Compliance", emoji: "⚖️", description: "NER витяг умов договорів, ризикові клаузули, порівняння версій, compliance-check" },
      { niche: "Retail / E-commerce", emoji: "🛒", description: "Sentiment відгуків, brand monitoring, класифікація повернень, автогенерація описів" },
      { niche: "Healthcare / Medtech", emoji: "🏥", description: "Clinical NLP: витяг медичних сутностей (ICD-10, SNOMED), аналіз нотаток лікарів" },
      { niche: "Finance / FinTech", emoji: "💰", description: "Класифікація фінансових документів, NER у звітах, аналіз новин для торгових сигналів" },
      { niche: "HR / Recruitment", emoji: "👥", description: "Скринінг резюме (NER + класифікація), аналіз оцінок співробітників, exit interview insights" },
    ],
  },

  // ─── Computer Vision ─────────────────────────────────────────────────────
  {
    slug: "computer-vision",
    title: "Комп'ютерний зір для бізнесу",
    shortTitle: "Computer Vision",
    description: "Детекція об'єктів, контроль якості, медична візуалізація та OCR — ML-системи, що бачать краще людини.",
    longDescription: "Розробляємо CV-системи для автоматизації візуального контролю: від YOLOv8 детекції дефектів на виробничих лініях (-96% пропущеного браку) до медичної імаджинг-аналітики та OCR для документів. Деплоємо на edge-пристрої (NVIDIA Jetson), хмару або on-premise залежно від ваших вимог до затримки та GDPR.",
    icon: Eye,
    color: "from-sky-500 to-cyan-600",
    bg: "bg-sky-50",
    iconColor: "text-sky-600",
    gradient: "from-sky-600 to-cyan-600",
    keyword: "комп'ютерний зір для бізнесу Україна",
    metaDescription: "Комп'ютерний зір (Computer Vision) для бізнесу. YOLOv8, OCR, медична візуалізація. Codeworth від £1,500. Реальні кейси: -96% пропущених дефектів, ×12 швидкість контролю.",
    features: [
      { title: "Детекція дефектів та контроль якості (QA)", description: "YOLOv8 + кастомний датасет: real-time інспекція конвеєра, класифікація типів браку. Кейс: QualityEye (Textile) — пропущені дефекти -96%, швидкість ×12 vs ручний контроль." },
      { title: "Детекція та трекінг об'єктів", description: "YOLO + ByteTrack: рахування відвідувачів, моніторинг складу (RFID-free), охоронне відеоспостереження з AI-тривогою. Latency < 50ms на RTX GPU." },
      { title: "OCR та витяг даних з документів", description: "PaddleOCR + GPT-4o Vision: рахунки, ID-документи, форми, медичні бланки. Accuracy > 97% на типових бізнес-документах. MTD-compatible для UK бухгалтерії." },
      { title: "Медична візуалізація (Medical Imaging)", description: "Класифікація знімків (X-ray, pathology slides), сегментація пухлин/тканин. On-premise деплой, HIPAA/GDPR-compliant, HL7 FHIR R4 інтеграція." },
      { title: "Візуальний пошук та схожість зображень", description: "CLIP + Qdrant: пошук товарів за фото, повторна ідентифікація (re-ID), similar product matching для e-commerce. Векторний пошук < 20ms." },
      { title: "Edge CV та деплой на пристрої", description: "ONNX / TensorRT: оптимізація для NVIDIA Jetson, Raspberry Pi, промислових камер. Offload від хмари для GDPR-sensitive або low-latency задач." },
    ],
    includes: [
      "Аудит CV-задачі та вибір архітектури (detection / segmentation / classification / OCR)",
      "Збір або підготовка датасету, annotation (bounding boxes, masks, keypoints)",
      "Навчання та валідація моделі (mAP, precision, recall)",
      "Оптимізація під цільову платформу (cloud / edge / on-premise)",
      "REST API або SDK для інтеграції у ваші системи",
      "Дашборд відеоаналітики та звіти про якість",
      "3 місяці підтримки та дооптимізації",
    ],
    packages: [
      {
        name: "CV PoC",
        price: "від £1,500",
        desc: "Перша CV-модель на ваших зображеннях",
        features: ["YOLOv8 / EfficientDet fine-tuning", "Датасет 500–2 000 зображень", "До 5 класів об'єктів", "REST inference API", "Jupyter-звіт з метриками", "1 міс. підтримки"],
        highlight: false,
      },
      {
        name: "CV Production",
        price: "від £3,000",
        desc: "Повна CV-система з реальним деплоєм",
        features: ["Custom dataset 5 000+ зображень", "Multi-class detection + tracking", "Real-time відеострим (< 50ms)", "React-дашборд аналітики + алерти", "Edge або хмарний деплой", "3 міс. підтримки + MLOps моніторинг"],
        highlight: true,
      },
      {
        name: "CV Enterprise",
        price: "за узгодженням",
        desc: "Багатокамерні CV-платформи",
        features: ["10+ камер / потоків одночасно", "Multi-task: detection + OCR + tracking", "On-premise або приватна хмара", "GDPR / HIPAA-compliant архітектура", "Інтеграція у MES / ERP / SCADA", "SLA 4 год + quarterly roadmap"],
        highlight: false,
      },
    ],
    faq: [
      { q: "Скільки зображень потрібно для навчання CV-моделі?", a: "Мінімум 200–500 зображень на клас для базового fine-tuning. Для production: 1 000–5 000+. Якщо зображень мало — використовуємо data augmentation (Albumentations), transfer learning та synthetic data generation." },
      { q: "Яка точність виявлення дефектів?", a: "На типових задачах промислового контролю якості: mAP@0.5 ≥ 0.88–0.95 (залежить від різноманітності дефектів та якості підсвічування). Для медичної візуалізації: AUC 0.90–0.97. Показуємо baseline точність на PoC до старту повного проєкту." },
      { q: "Чи може CV працювати в реальному часі (відео)?", a: "Так. YOLOv8 + TensorRT на RTX 4070: 120+ FPS, latency < 8ms. На NVIDIA Jetson Orin (edge): 30–60 FPS, < 33ms. Для IP-камер — streaming через RTSP + OpenCV pipeline з буферизацією черги." },
      { q: "Де обробляються відеодані?", a: "Для GDPR-чутливих задач (обличчя, медичні дані) — виключно on-premise або на вашому приватному сервері. Для загальних задач (дефекти, QR-коди) — cloud inference (AWS Rekognition або власний GPU-сервер в EU). Підписуємо NDA та DPA до початку роботи." },
      { q: "Скільки коштує CV-система для виробничого контролю якості?", a: "PoC (перша модель, 1–3 типи дефектів, REST API): від £1,500. Production-система (5+ типів дефектів, real-time відеоаналіз, дашборд, edge деплой): від £3,000. Enterprise (10+ камер, MES інтеграція, on-premise): за погодженням." },
      { q: "Чи підходить CV для мобільного застосунку?", a: "Так. Конвертуємо моделі в TFLite або Core ML для iOS/Android. Типові задачі: сканування документів, визначення продуктів за фото, AR-try-on для fashion. Inference на пристрої — без відправки зображень на сервер." },
      { q: "What hardware is required to run computer vision in production?", a: "It depends on throughput and latency requirements. For real-time video processing (security cameras, production line inspection at 30+ fps), NVIDIA GPU inference (T4, A10G, or Jetson edge devices) is standard. For batch processing (analysing photos uploaded overnight), CPU inference is sufficient and much cheaper. We right-size hardware to use case — many UK manufacturing quality inspection deployments run on NVIDIA Jetson at the factory floor for sub-50ms latency without cloud round-trip." },
      { q: "How much training data does a computer vision model need?", a: "Object detection and classification models typically need 1,000-5,000 labelled images per class for good performance using transfer learning from ImageNet pre-trained models. Medical imaging and highly specific industrial defect detection may require 5,000-20,000 labelled examples due to high precision requirements. Data augmentation (rotation, crop, brightness, synthetic data generation) can reduce requirements by 40-60%. We conduct a data readiness assessment before confirming project scope." },
      { q: "Can computer vision work with existing CCTV or industrial cameras?", a: "Yes. We integrate with RTSP streams from IP cameras, USB/GigE industrial cameras, and existing CCTV infrastructure. Frame capture and pre-processing handles common issues: variable lighting, camera angle variation, motion blur. We have integrated with Axis, Hikvision, and Bosch cameras for UK retail and manufacturing clients. New camera specification recommendations provided if existing hardware is insufficient." },
      { q: "What are the UK GDPR implications of using computer vision on people?", a: "Computer vision capturing or processing images of identifiable individuals is personal data processing under UK GDPR. Legitimate interest or contract legal basis must be documented. A Data Protection Impact Assessment (DPIA) is required. Biometric data (facial recognition) is special category data requiring explicit consent or specific legal basis. ICO guidance on workplace CCTV and facial recognition is strict — Codeworth provides GDPR compliance documentation as standard for all people-facing CV deployments." },
      { q: "How is computer vision model quality validated before deployment?", a: "We use held-out test sets (data never seen during training) to measure precision, recall, F1, and mAP for detection tasks. For safety-critical applications (medical imaging, industrial quality inspection), we additionally run human expert comparison studies measuring model performance against qualified professionals. NHS clinical AI requires validation meeting the SAFE framework. UK manufacturing QC deployments include a parallel-run period comparing model decisions against existing manual inspection before full deployment." },
    ],
    deliveryTime: "4–10 тижнів",
    priceFrom: "£1,500",
    techStack: ["YOLOv8", "YOLOv10", "EfficientDet", "PyTorch", "OpenCV", "TensorRT", "ONNX", "PaddleOCR", "CLIP", "Albumentations", "FastAPI", "Docker", "NVIDIA Jetson"],
    crossLink: {
      slug: "machine-learning",
      ukLabel: "Потрібна предиктивна аналітика з CV-даних?",
      enLabel: "Need predictive analytics from CV data?",
      ukDesc: "ML-моделі для прогнозу збоїв на основі CV-метрик, predictive maintenance — дивіться Machine Learning.",
      enDesc: "ML models predicting failures from CV metrics, predictive maintenance — see Machine Learning.",
    },
    beforeAfter: [
      { metric: "Пропущені дефекти (візуальний QA)", before: "15% дефектів пропущено", after: "0.6% дефектів пропущено", improvement: "−96%" },
      { metric: "Швидкість контролю якості", before: "1 оператор — 200 одиниць/год", after: "Автоматично — 2 400 одиниць/год", improvement: "×12" },
      { metric: "Обробка рахунків (OCR)", before: "8 хв / рахунок (ручна)", after: "25 сек / рахунок (CV+NLP)", improvement: "−95%" },
      { metric: "Хибні тривоги (охоронна система)", before: "47 хибних тривог/добу", after: "3 хибних тривоги/добу", improvement: "−94%" },
    ],
    processSteps: [
      { step: 1, title: "CV-аудит задачі", description: "Визначаємо тип CV-задачі, аналізуємо наявні зображення, оцінюємо кількість annotation та досяжну точність моделі." },
      { step: 2, title: "Датасет та PoC (2–3 тижні)", description: "Налаштовуємо annotation pipeline, розмічаємо seed-датасет, навчаємо першу модель. Ви бачите mAP до старту повного проєкту." },
      { step: 3, title: "Production-розробка (3–6 тижнів)", description: "Масштабуємо датасет, тюнимо архітектуру, оптимізуємо для цільової платформи (cloud/edge), будуємо дашборд." },
      { step: 4, title: "Деплой та моніторинг", description: "Запуск на production, навчання операторів, налаштування алертів, MLOps моніторинг дрейфу акуратності моделі." },
    ],
    caseStudies: [
      { client: "QualityEye", niche: "Виробництво (Textile)", result: "YOLOv8 + кастомний датасет 8 типів дефектів: пропущений брак -96%, швидкість ×12 vs ручний.", metric: "−96%" },
      { client: "InvoiceAI", niche: "FinTech / Бухгалтерія", result: "PaddleOCR + GPT-4o Vision: обробка рахунків з 8 хв до 25 сек, MTD-compatible, -99% помилок.", metric: "−95%" },
      { client: "CrowdSense", niche: "Retail / Торговельні центри", result: "YOLO + ByteTrack підрахунок відвідувачів: хибні тривоги -94%, теплова карта трафіку real-time.", metric: "×12" },
    ],
    useCases: [
      { niche: "Виробництво та QA", emoji: "🏭", description: "Детекція дефектів на конвеєрі, класифікація браку, real-time alert оператору" },
      { niche: "Healthcare / Медицина", emoji: "🏥", description: "Аналіз медичних знімків, сегментація тканин, GDPR-compliant on-premise деплой" },
      { niche: "FinTech / Бухгалтерія", emoji: "🧾", description: "OCR рахунків, ID-верифікація, автоматизоване введення даних (MTD UK compliance)" },
      { niche: "Retail / E-commerce", emoji: "🛒", description: "Візуальний пошук за фото, контроль викладки полиць, аналітика трафіку покупців" },
      { niche: "Логістика / Склад", emoji: "🚛", description: "Розпізнавання QR/штрих-кодів, підрахунок вантажів, контроль комплектації замовлень" },
      { niche: "Безпека / Охорона", emoji: "🛡️", description: "Детекція вторгнень, підрахунок людей, аналіз поведінки, зниження хибних тривог" },
    ],
  },

  // ─── MLOps & Deployment ──────────────────────────────────────────────────
  {
    slug: "mlops",
    title: "MLOps та деплой ML-моделей",
    shortTitle: "MLOps",
    description: "MLOps-пайплайни, моніторинг дрейфу та автоматичне перенавчання — тримаємо ваші ML-моделі точними у продакшні.",
    longDescription: "87% ML-моделей так і не потрапляють у продакшн. Ми вирішуємо саме цю проблему: будуємо automated CI/CD для ML, налаштовуємо моніторинг data drift та concept drift, автоматизуємо перенавчання через Airflow DAG. Результат — модель не деградує через 3–6 місяців, а завжди актуальна. Включає MLOps Retainer £800/mo для ongoing підтримки.",
    icon: GitBranch,
    color: "from-orange-500 to-red-600",
    bg: "bg-orange-50",
    iconColor: "text-orange-600",
    gradient: "from-orange-500 to-red-600",
    keyword: "MLOps деплой ML Україна",
    metaDescription: "MLOps та деплой ML-моделей для бізнесу. CI/CD для ML, моніторинг дрейфу, автоперенавчання. Codeworth від £750 або retainer £800/mo. 87% моделей без MLOps деградують за 6 місяців.",
    features: [
      { title: "ML Pipeline Automation (CI/CD for ML)", description: "Airflow / Prefect DAG: автоматизований пайплайн від інжинірингу фіч до деплою нової версії. GitHub Actions для версіонування, автоматичний тест якості перед релізом." },
      { title: "Model Serving (FastAPI / BentoML / Seldon)", description: "REST або gRPC endpoint, < 50ms latency, auto-scaling. A/B testing: shadow deployment та champion-challenger testing без downtime." },
      { title: "Data Drift та Concept Drift Monitoring", description: "Evidently AI + Grafana: моніторинг розподілу вхідних даних у реальному часі. Telegram-алерт при drift > threshold. Кейс: виявлення drift за 48 год проти 2 тижнів ручного аналізу." },
      { title: "Auto-Retraining Pipelines", description: "Scheduled + triggered retraining: Airflow DAG запускає перенавчання за розкладом або при drift-алерті. Автоматичне порівняння нової версії з production-baseline, rollback при деградації." },
      { title: "MLflow + Weights & Biases", description: "Версіонування моделей, метадані експериментів, model registry, reproducibility. Повна аудит-стежка для регуляторних вимог (FCA, NHS Digital)." },
      { title: "MLOps Retainer (ongoing підтримка)", description: "£800/mo: щомісячний аудит якості, drift alerts, перенавчання при необхідності, SLA-відповідь 4 год. Підходить для компаній без власних ML-інженерів." },
    ],
    includes: [
      "Аудит поточної ML-інфраструктури та виявлення вузьких місць",
      "Налаштування CI/CD pipeline для ML (GitHub Actions + Docker)",
      "Model serving endpoint з auto-scaling та load balancing",
      "Data drift monitoring (Evidently AI + Grafana dashboard)",
      "Airflow DAG для автоматичного перенавчання за розкладом",
      "MLflow model registry та версіонування",
      "Telegram-алерти + документація для команди",
    ],
    packages: [
      {
        name: "MLOps Setup",
        price: "від £750",
        desc: "Базова MLOps-інфраструктура для однієї моделі",
        features: ["CI/CD pipeline (GitHub Actions)", "FastAPI model serving", "MLflow versioning", "Evidently drift monitoring", "Базовий Grafana dashboard", "1 міс. онбординг підтримки"],
        highlight: false,
      },
      {
        name: "MLOps Platform",
        price: "від £1,500",
        desc: "Повна платформа для кількох моделей",
        features: ["Airflow DAG з auto-retraining", "Multi-model serving (3–5 моделей)", "A/B testing + champion-challenger", "Повний Grafana/Prometheus stack", "MLflow + W&B model registry", "3 міс. підтримки + monthly review"],
        highlight: true,
      },
      {
        name: "MLOps Retainer",
        price: "від £800/міс",
        desc: "Ongoing MLOps підтримка без in-house команди",
        features: ["Щомісячний аудит якості моделей", "Drift monitoring 24/7", "Перенавчання при необхідності", "SLA-відповідь 4 години", "Щомісячний звіт для CTO/CPO", "Приоритет у черзі нових запитів"],
        highlight: false,
      },
    ],
    faq: [
      { q: "Що таке MLOps і навіщо він потрібен?", a: "MLOps (Machine Learning Operations) — практики підтримки ML-моделей у продакшні. Без MLOps: розподіл вхідних даних змінюється → модель деградує непомітно → бізнес-метрики падають. З MLOps: автоматичний моніторинг, alert при деградації, auto-retraining. Середня модель без MLOps деградує на 10–15% за 6 місяців." },
      { q: "Чим MLOps відрізняється від DevOps?", a: "DevOps — деплой і моніторинг програмного коду. MLOps — деплой і моніторинг ML-моделей, де виходить не тільки код, але й артефакти моделей, датасети, метрики якості (F1, AUC) та розподіл вхідних даних. MLOps додає model registry, drift detection та automated retraining." },
      { q: "Скільки коштують MLOps-послуги?", a: "Базовий MLOps setup (CI/CD + model serving + monitoring для 1 моделі): від £750. Повна платформа (3–5 моделей + Airflow + A/B testing): від £1,500. MLOps Retainer (ongoing): £800/міс без зобов'язань." },
      { q: "Чи можна впровадити MLOps для вже існуючої моделі?", a: "Так, це навіть поширеніший сценарій. Аудитуємо поточний деплой, виявляємо ризики (відсутність моніторингу, ручне перенавчання, відсутність версіонування), впроваджуємо MLOps поступово без зупинки production." },
      { q: "Які MLOps-інструменти ви використовуєте?", a: "Orchestration: Airflow, Prefect, ZenML. Serving: FastAPI, BentoML, Seldon Core. Monitoring: Evidently AI, Grafana, Prometheus. Tracking: MLflow, Weights & Biases. CI/CD: GitHub Actions, Docker, Kubernetes. Вибір залежить від вашого стеку та бюджету." },
      { q: "What MLOps tools does Codeworth use?", a: "Our primary MLOps stack is MLflow for experiment tracking and model registry, Seldon Core for Kubernetes-native model serving, Evidently AI for drift monitoring, Airflow for pipeline orchestration, and GitHub Actions for CI/CD. We adapt to client existing tooling — if you already use SageMaker, Azure ML, or Vertex AI, we build within your platform." },
      { q: "How long does it take to set up an MLOps pipeline?", a: "A standard MLOps pipeline (experiment tracking, model registry, automated deployment, drift monitoring) takes 2-4 weeks to build and 1-2 weeks to validate. For clients starting from scratch with no existing CI/CD or cloud infrastructure, allow 6-8 weeks. We deliver fully documented pipelines with runbooks so your team can operate them independently." },
      { q: "What is model drift and how do you detect it?", a: "Model drift is when a deployed ML model degrades because the real-world data patterns it was trained on have changed. Data drift means input feature distributions shift (customer demographics evolve); concept drift means the relationship between features and outcomes changes (fraud patterns evolve as criminals adapt). We detect drift using Population Stability Index (PSI) and statistical tests, with automated alerts when thresholds are breached. FCA SS1/23 requires documented drift monitoring for regulated ML models." },
      { q: "Can you integrate MLOps with our existing CI/CD pipelines?", a: "Yes. We integrate ML model deployment into existing GitHub Actions, Azure DevOps, or Jenkins pipelines. Model promotion triggers (staging to production) are added as pipeline gates alongside existing code deployment steps. Model versioning in MLflow or the native registry integrates with git tags. We have done this for clients using Azure DevOps in FCA-regulated environments and GitHub Actions in NHS-compliant architectures." },
      { q: "What are the FCA requirements for ML model monitoring?", a: "FCA SS1/23 Model Risk Management requires documented ongoing monitoring of material ML models — performance metrics tracked over time, data drift detected and investigated, model recalibration trigger thresholds defined, and a model risk governance process with escalation paths. Monitoring must be proportionate to model materiality. Codeworth delivers FCA SS1/23 compliant monitoring dashboards and governance documentation as part of every regulated MLOps engagement." },
    ],
    deliveryTime: "2–6 тижнів (setup), потім retainer",
    priceFrom: "£750",
    techStack: ["MLflow", "Prefect", "Apache Airflow", "Evidently AI", "FastAPI", "BentoML", "Seldon Core", "Prometheus", "Grafana", "Docker", "Kubernetes", "GitHub Actions"],
    crossLink: {
      slug: "machine-learning",
      ukLabel: "Потрібна розробка ML-моделі з нуля?",
      enLabel: "Need an ML model built from scratch?",
      ukDesc: "Fraud detection, churn prediction, demand forecasting, рекомендації — дивіться Machine Learning.",
      enDesc: "Fraud detection, churn prediction, demand forecasting, recommendation engines — see Machine Learning.",
    },
    beforeAfter: [
      { metric: "Виявлення drift моделі", before: "2 тижні (ручний аналіз)", after: "48 год (автоматичний алерт)", improvement: "−86%" },
      { metric: "Час від коміту до production", before: "3–5 днів (ручний деплой)", after: "2 год (automated pipeline)", improvement: "−83%" },
      { metric: "Деградація точності за 6 місяців", before: "−12% F1 (без MLOps)", after: "< −1% F1 (з MLOps)", improvement: "×12" },
      { metric: "Час на перенавчання", before: "1–2 дні (ручне)", after: "4 год (автоматичне)", improvement: "−83%" },
    ],
    processSteps: [
      { step: 1, title: "Аудит ML-інфраструктури", description: "Оцінюємо поточний деплой, виявляємо MLOps-борг: відсутній моніторинг, ручні процеси, нестабільний деплой, відсутнє версіонування." },
      { step: 2, title: "MLOps Setup (1–2 тижні)", description: "Встановлюємо CI/CD pipeline, model serving, MLflow registry, базовий drift monitoring. Перша версія за 2 тижні." },
      { step: 3, title: "Автоматизація (2–4 тижні)", description: "Airflow DAG для retraining, A/B testing framework, повний Grafana stack, alert-система." },
      { step: 4, title: "Ongoing Retainer", description: "Щомісячний аудит моделей, drift alerts, перенавчання при необхідності, звіти CTO. SLA 4 год на критичні алерти." },
    ],
    caseStudies: [
      { client: "FraudShield", niche: "FinTech / Fraud Detection", result: "MLOps для LightGBM моделі: drift detection за 48 год замість 2 тижнів, деплой з 3 днів до 2 год.", metric: "−83%" },
      { client: "RetainIQ", niche: "B2B SaaS / Churn Model", result: "Airflow auto-retraining: деградація точності за 6 місяців з -12% до <-1% F1.", metric: "×12" },
      { client: "MedML", niche: "Healthcare / Clinical NLP", result: "MLOps на NHS Digital-сумісній інфраструктурі: MLflow audit trail, auto-retraining при зміні ICD-кодів.", metric: "100%" },
    ],
    useCases: [
      { niche: "Фінанси / FinTech", emoji: "💰", description: "MLOps для fraud detection: drift при нових схемах шахрайства → auto-retraining → alert 4 год" },
      { niche: "Retail / E-commerce", emoji: "🛒", description: "Реtraining рекомендаційних систем при зміні сезону / асортименту, A/B тест нових моделей" },
      { niche: "SaaS продукти", emoji: "💻", description: "CI/CD для churn-моделі: нові фічі → автотест якості → staged rollout → Grafana dashboard" },
      { niche: "Виробництво / IoT", emoji: "🏭", description: "Predictive maintenance: drift при заміні обладнання → triggered retraining → SLA alert" },
      { niche: "Healthcare", emoji: "🏥", description: "MLOps з audit trail для регуляторних вимог (NHS Digital, MHRA): MLflow + immutable logs" },
      { niche: "Будь-який ML-проєкт", emoji: "🧠", description: "MLOps Retainer £800/mo: ongoing моніторинг для компаній без власних ML-інженерів" },
    ],
  },

  // ─── LLM & RAG Development ───────────────────────────────────────────────
  {
    slug: "llm-rag",
    title: "LLM та RAG-розробка для бізнесу",
    shortTitle: "LLM / RAG",
    description: "Корпоративні RAG-системи, fine-tuned LLM та AI-чат-боти — з GDPR-compliant архітектурою для UK/EU бізнесу.",
    longDescription: "Розробляємо LLM-застосунки корпоративного рівня: RAG-системи для корпоративних баз знань, fine-tuned моделі для вашого домену (медицина, право, фінанси), AI-чат-боти для підтримки клієнтів. Ключовий акцент: GDPR/UK GDPR compliance, можливість повного on-premise деплою без відправки даних до OpenAI.",
    icon: Bot,
    color: "from-violet-500 to-purple-700",
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
    gradient: "from-violet-600 to-purple-700",
    keyword: "LLM RAG розробка Україна",
    metaDescription: "LLM та RAG розробка для бізнесу. GPT-4o, Llama 3, корпоративні чат-боти, knowledge base Q&A. Codeworth від £1,125. GDPR-compliant, on-premise деплой.",
    features: [
      { title: "RAG Системи (Retrieval-Augmented Generation)", description: "LangChain / LlamaIndex + Qdrant: семантичний пошук у корпоративних документах (PDF, web, DB), Q&A без галюцинацій. До 1M+ документів у векторній базі. Кейс: 68% запитів підтримки → AI без оператора." },
      { title: "Fine-Tuning LLM під ваш домен", description: "LoRA / QLoRA fine-tuning GPT-4o, Llama 3, Mistral на ваших даних: медична термінологія, юридичний стиль, фінансовий жаргон. Результат: точність у вузькому домені +40–60% vs zero-shot." },
      { title: "AI Customer Support Бот", description: "Multi-channel бот (web / Telegram / WhatsApp): RAG відповіді з вашої бази, ескалація на оператора при low-confidence, аналітика intent. SLA < 2с на відповідь." },
      { title: "Document Intelligence та Q&A", description: "Завантажте PDF / Word / Excel → задайте питання. RAG-пайплайн витягує точну відповідь з посиланням на сторінку джерела. Підходить для: юридичні документи, технічна документація, HR-polítics." },
      { title: "LLM API Інтеграція у ваш продукт", description: "Plug AI у ваш SaaS/CRM/ERP через REST API. Prompt engineering, output parsing, function calling. Підтримуємо: OpenAI, Anthropic Claude, Google Gemini, Mistral, open-source Llama 3." },
      { title: "GDPR-Compliant та On-Premise LLM", description: "Self-hosted Llama 3 / Mistral на вашому сервері: жодних даних за межами вашої інфраструктури. Підходить для: медицина (HIPAA/GDPR), право (client confidentiality), фінанси (FCA compliance)." },
    ],
    includes: [
      "Аудит задачі: RAG vs Fine-Tuning vs Prompt Engineering",
      "Розробка RAG-пайплайну (LangChain + Qdrant / Pinecone)",
      "Налаштування документного інгесту (PDF, HTML, DB, API)",
      "Prompt engineering та систематичне тестування (LLM Evals)",
      "REST API endpoint + SDK для інтеграції",
      "Дашборд аналітики (intent, satisfaction, escalation rate)",
      "3 місяці підтримки та оптимізації",
    ],
    packages: [
      {
        name: "RAG Starter",
        price: "від £1,125",
        desc: "RAG-бот для корпоративної бази знань",
        features: ["GPT-4o або Claude 3.5 Sonnet", "До 500 документів у Qdrant", "Web-інтерфейс або iframe", "Prompt engineering + eval", "Аналітика запитів", "1 міс. підтримки"],
        highlight: false,
      },
      {
        name: "RAG Production",
        price: "від £2,000",
        desc: "Корпоративна RAG-платформа",
        features: ["До 100 000 документів", "Multi-source ingestion (PDF/web/DB/API)", "Multi-channel (web/Telegram/WhatsApp)", "LLM Evals + автоматичне тестування", "MLOps моніторинг якості відповідей", "3 міс. підтримки + monthly review"],
        highlight: true,
      },
      {
        name: "LLM Fine-Tune",
        price: "від £1,750",
        desc: "Fine-tuned модель під ваш домен",
        features: ["LoRA/QLoRA fine-tuning Llama 3 / Mistral", "Підготовка датасету (1 000–10 000 пар)", "Автоматичне benchmarking vs GPT-4o", "On-premise деплой (vLLM / Ollama)", "GDPR/HIPAA-сумісна архітектура", "Технічна документація + навчання команди"],
        highlight: false,
      },
    ],
    faq: [
      { q: "Що таке RAG і чим він кращий за звичайного GPT-бота?", a: "RAG (Retrieval-Augmented Generation): бот спочатку шукає у вашій базі знань → потім генерує відповідь на основі знайденого. Звичайний GPT відповідає зі своїх загальних знань і може вигадати факти. RAG-бот відповідає виключно з вашого контенту та цитує джерело. Нуль галюцинацій." },
      { q: "Що краще: RAG чи Fine-Tuning?", a: "RAG — якщо дані часто оновлюються (ціни, документи, FAQ) або обсяг великий (1M+ сторінок). Fine-Tuning — якщо потрібний специфічний стиль відповіді, доменний жаргон або максимальна точність у вузькій задачі. Часто найкращий результат — RAG + Fine-Tuning разом." },
      { q: "Чи є GDPR-compliant LLM без відправки даних до OpenAI?", a: "Так. Self-hosted Llama 3 8B або Mistral 7B на вашому GPU-сервері: all inference on-premise, no data leaving your infrastructure. Ми розгортаємо через vLLM або Ollama з REST API, що є сумісним з OpenAI API. Продуктивність нижча ніж GPT-4o, але достатня для більшості бізнес-задач." },
      { q: "Скільки коштує RAG-система?", a: "RAG Starter (до 500 документів, web-інтерфейс): від £1,125. RAG Production (100K+ документів, multi-channel, MLOps): від £2,000. Fine-tuning Llama 3 під ваш домен: від £1,750. On-premise LLM deployment: від £625 (якщо модель вже є)." },
      { q: "Скільки часу займає побудова RAG-системи?", a: "RAG Starter: 2–3 тижні. RAG Production з multi-channel та MLOps: 5–8 тижнів. LLM Fine-tuning: 3–5 тижнів (залежить від обсягу датасету та GPU-ресурсів)." },
      { q: "Які LLM-моделі ви підтримуєте?", a: "OpenAI: GPT-4o, GPT-4o mini. Anthropic: Claude 3.5 Sonnet, Claude 3 Haiku. Google: Gemini 1.5 Pro. Open-source: Llama 3 (8B/70B), Mistral 7B/8x7B, Phi-3, Qwen 2.5. Вибір залежить від budget, privacy requirements та задачі." },
    ],
    deliveryTime: "2–8 тижнів",
    priceFrom: "£1,125",
    techStack: ["GPT-4o", "Claude 3.5", "Llama 3", "Mistral", "LangChain", "LlamaIndex", "Qdrant", "Pinecone", "vLLM", "Ollama", "FastAPI", "Python", "Docker"],
    crossLink: {
      slug: "nlp",
      ukLabel: "Потрібна класифікація або NER без LLM?",
      enLabel: "Need classification or NER without LLM overhead?",
      ukDesc: "Для задач з великим обсягом (мільйони текстів) та без потреби в генерації — класичний NLP (BERT) дешевший і швидший.",
      enDesc: "For high-throughput tasks (millions of texts) where generation isn't needed — classic NLP (BERT) is cheaper and faster.",
    },
    beforeAfter: [
      { metric: "Запити підтримки, закриті AI", before: "0% (ручна обробка)", after: "68% закриває RAG-бот", improvement: "+68 пп" },
      { metric: "Час пошуку в корп. документах", before: "25 хв / запит (ручний пошук)", after: "12 сек / запит (RAG)", improvement: "−99%" },
      { metric: "Точність відповідей у домені", before: "71% (zero-shot GPT-4o)", after: "94% (RAG + fine-tune)", improvement: "+23 пп" },
      { metric: "Витрати на підтримку клієнтів", before: "£38K/рік (5 операторів)", after: "£8K/рік (1 оператор + AI)", improvement: "−79%" },
    ],
    processSteps: [
      { step: 1, title: "Аудит задачі LLM", description: "Визначаємо: RAG vs Fine-Tuning vs Prompt Engineering. Оцінюємо обсяг і тип документів, privacy requirements, бюджет на inference." },
      { step: 2, title: "PoC за 2 тижні", description: "Будуємо базовий RAG на ваших 50–100 документах. Ви тестуєте якість відповідей та приймаєте рішення про масштаб." },
      { step: 3, title: "Production RAG (3–5 тижнів)", description: "Повний document ingestion pipeline, LLM Evals для автоматичного контролю якості, multi-channel deployment, аналітика." },
      { step: 4, title: "Оптимізація та підтримка", description: "Щомісячний аудит якості відповідей, оновлення бази знань, оптимізація prompt templates, моніторинг hallucinations." },
    ],
    caseStudies: [
      { client: "SupportAI", niche: "SaaS / Customer Support", result: "GPT-4o RAG + Qdrant: 68% тікетів закриває AI, -£30K/рік на підтримку, < 2с latency.", metric: "−68%" },
      { client: "LexAI", niche: "LegalTech UK", result: "On-premise Llama 3 + RAG: Q&A по 50 000 судових рішень, 94% точність, GDPR-compliant.", metric: "94%" },
      { client: "MedKnowledge", niche: "Healthcare / NHS", result: "Fine-tuned Llama 3 + FHIR RAG: клінічний асистент, NHS Digital-сумісний, on-premise.", metric: "23 пп" },
    ],
    useCases: [
      { niche: "Підтримка клієнтів", emoji: "🎧", description: "RAG-бот 24/7: відповідає з вашої бази, ескалація при low-confidence, multi-channel" },
      { niche: "Корпоративна база знань", emoji: "📚", description: "HR-policies, technical docs, runbooks: employee Q&A за 12 сек замість 25 хв пошуку" },
      { niche: "LegalTech / Право", emoji: "⚖️", description: "Q&A по судовим рішенням, договорам, нормативним актам — on-premise для client confidentiality" },
      { niche: "Healthcare", emoji: "🏥", description: "Клінічний асистент: FHIR RAG, GDPR/NHS Digital compliant, on-premise, clinical NLP" },
      { niche: "FinTech", emoji: "💰", description: "FCA-compliant AI: відповіді на питання регулювання, аналіз KYC-документів, internal audit Q&A" },
      { niche: "EdTech", emoji: "🎓", description: "AI-тьютор: адаптивні відповіді, пояснення з курсових матеріалів, перевірка знань" },
    ],
  },

  // ─── Predictive Analytics ─────────────────────────────────────────────────
  {
    slug: "predictive-analytics",
    title: "Предиктивна аналітика для бізнесу",
    shortTitle: "Predictive Analytics",
    description: "ML-прогнозування попиту, відтоку, виручки та ризиків — перетворюємо ваші дані на точні бізнес-прогнози.",
    longDescription: "Спеціалізуємося на бізнес-прогнозуванні через ML: demand forecasting (MAPE < 10%), churn prediction (AUC > 0.90), credit risk scoring та revenue forecasting. Від data audit до production ML моделі з SHAP-поясненнями та MLOps-моніторингом. Середній ROI у retail-клієнтів — 12× за перший рік.",
    icon: BarChart3,
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    gradient: "from-emerald-500 to-teal-600",
    keyword: "предиктивна аналітика для бізнесу Україна",
    metaDescription: "Предиктивна аналітика для бізнесу. ML-прогноз попиту, відтоку клієнтів, кредитного ризику. Codeworth від £750. MAPE < 10%, AUC > 0.90. Реальні кейси: -34% надлишків, -31% відтоку.",
    features: [
      { title: "Demand Forecasting та управління запасами", description: "XGBoost + Prophet по кожному SKU × магазин, Airflow DAG щоночі. Кейс: StockSense — надлишок запасів -34%, списання -41%, MAPE 8.3% vs 27% baseline." },
      { title: "Churn Prediction та утримання клієнтів", description: "XGBoost на 40+ поведінкових фічах, SHAP-пояснення причин відтоку. Кейс: RetainIQ — churn з 8.4% до 5.8% (-31%), MRR retention +£1,050/міс." },
      { title: "Revenue Forecasting та фінансове планування", description: "Ансамбль моделей з scenario modelling (base / optimistic / pessimistic), 90-денний rolling forecast. Accuracy MAPE 5–8% для SaaS-бізнесів." },
      { title: "Credit Risk Scoring", description: "LightGBM з 50+ фічами, SHAP для explainability (FCA UK-вимоги), appeals workflow. AUC 0.92–0.97 для UK SME кредитування." },
      { title: "Predictive Maintenance", description: "LSTM + IoT sensor data: прогноз збоїв обладнання за 24–72 год до відмови. Кейс: незапланований простій -73%, maintenance costs -28%." },
      { title: "Lead Scoring та пріоритизація продажів", description: "Gradient Boosting на CRM-даних: ймовірність конвертації, кращий час контакту, LTV-оцінка. Sales team efficiency +34%, conversion rate +22%." },
    ],
    includes: [
      "Аудит даних: якість, completeness, feature importance, прогноз досяжної точності",
      "Feature engineering (часові ряди, поведінкові фічі, зовнішні дані)",
      "Навчання ensemble-моделі з hyperparameter tuning (Optuna)",
      "SHAP-пояснення для interpretable AI (регуляторні вимоги)",
      "REST API endpoint для інтеграції у ваш стек",
      "Аналітичний дашборд з прогнозами та confidence intervals",
      "MLOps: drift monitoring + auto-retraining (Airflow DAG)",
    ],
    packages: [
      {
        name: "Analytics PoC",
        price: "від £750",
        desc: "Перша модель прогнозування на ваших даних",
        features: ["XGBoost / LightGBM / Prophet", "Аудит та підготовка даних", "Hyperparameter tuning", "REST API endpoint", "SHAP-пояснення + Jupyter-звіт", "1 міс. підтримки"],
        highlight: false,
      },
      {
        name: "Analytics Production",
        price: "від £1,500",
        desc: "Production forecasting система з MLOps",
        features: ["Ensemble моделей (XGB + LSTM + Prophet)", "Scenario modelling (base/pessimistic/optimistic)", "React дашборд + confidence intervals", "Inтеграція у ERP / BI-систему", "MLOps: Airflow DAG + drift monitoring", "3 міс. підтримки + quarterly review"],
        highlight: true,
      },
      {
        name: "Analytics Platform",
        price: "за узгодженням",
        desc: "Корпоративна платформа прогнозування",
        features: ["5+ прогностичних моделей", "Real-time streaming predictions", "Зовнішні дані (ринкові, погода, геодані)", "Feature store (Redis / Feast)", "C-level BI дашборд", "Щоквартальний roadmap ML"],
        highlight: false,
      },
    ],
    faq: [
      { q: "Чим предиктивна аналітика відрізняється від BI та звітності?", a: "BI та звітність — що сталося в минулому (backward-looking). Предиктивна аналітика — що станеться в майбутньому (forward-looking). BI показує: продажі впали на 15% минулого кварталу. ML-прогноз показує: наступний квартал 23% клієнтів ризикують відтоку — ось їх список, ось причини (SHAP)." },
      { q: "Яка точність demand forecasting?", a: "MAPE 5–12% на типових retail задачах (120 магазинів, 5 000 SKU, 3 роки history). Seasonal adjustment включено. Для FMCG з волатильним попитом — MAPE 12–18%. Порівняно з ручним прогнозом (MAPE 25–40%) — значне покращення навіть у складних категоріях." },
      { q: "Скільки даних потрібно для предиктивної аналітики?", a: "Demand forecasting: мінімум 12–18 місяців продажів по SKU. Churn prediction: від 3 000 записів клієнтів з 6+ місяців history. Credit risk: від 2 000 виданих кредитів з відомими outcomes. Менше даних → transfer learning та feature engineering для компенсації." },
      { q: "Чи є SHAP-пояснення для кредитного скорингу (FCA UK)?", a: "Так, це обов'язкова вимога для FCA-regulated кредитування. SHAP надає покоефіцієнтне пояснення кожного рішення: які фічі найбільше вплинули на відмову. Appeals workflow з human-in-the-loop review. Consumer Duty 2023 compliance вбудовано в архітектуру." },
      { q: "Скільки коштує ML demand forecasting для retail?", a: "PoC (базова forecast-модель, 1 категорія товарів, REST API): від £750. Production система (всі SKU × магазини, Airflow DAG, BI інтеграція): від £1,500. Типовий ROI для 120-магазинної мережі: -34% надлишків на складі = £100K+/рік." },
    ],
    deliveryTime: "3–10 тижнів",
    priceFrom: "£750",
    techStack: ["XGBoost", "LightGBM", "Prophet", "LSTM", "scikit-learn", "SHAP", "Optuna", "Airflow", "FastAPI", "MLflow", "Plotly", "Python", "PostgreSQL"],
    crossLink: {
      slug: "machine-learning",
      ukLabel: "Потрібна складніша ML-платформа?",
      enLabel: "Need a more comprehensive ML platform?",
      ukDesc: "Реkoмендаційні системи, fraud detection, MLOps-платформа для кількох моделей — дивіться Machine Learning.",
      enDesc: "Recommendation engines, fraud detection, multi-model MLOps platform — see Machine Learning.",
    },
    beforeAfter: [
      { metric: "Точність прогнозу попиту (MAPE)", before: "27% (ручний прогноз)", after: "8.3% (XGBoost + Prophet)", improvement: "−69%" },
      { metric: "Надлишок запасів на складах", before: "baseline", after: "−34%", improvement: "−34%" },
      { metric: "Відтік клієнтів (churn)", before: "8.4% / міс", after: "5.8% / міс", improvement: "−31%" },
      { metric: "Незапланований простій обладнання", before: "47 год / міс", after: "12.7 год / міс", improvement: "−73%" },
    ],
    processSteps: [
      { step: 1, title: "Data Audit (1 тиждень)", description: "Оцінюємо якість, обсяг та completeness ваших даних. Визначаємо ML-задачу (classification / regression / time series), прогнозуємо MAPE / AUC." },
      { step: 2, title: "PoC (1–2 тижні)", description: "Навчаємо першу версію моделі на реальних даних. Вимірюємо MAPE / AUC / lift. Ви приймаєте рішення на основі фактів." },
      { step: 3, title: "Production ML (3–7 тижнів)", description: "Ensemble моделей, scenario modelling, React дашборд, інтеграція у ERP/BI, MLOps setup." },
      { step: 4, title: "MLOps та моніторинг", description: "Airflow DAG для auto-retraining, drift monitoring, щомісячний звіт точності, quarterly model review." },
    ],
    caseStudies: [
      { client: "StockSense", niche: "Retail (120 магазинів)", result: "Demand forecasting XGBoost + Prophet: MAPE 8.3% vs 27%, надлишки -34%, списання -41%.", metric: "−34%" },
      { client: "RetainIQ", niche: "B2B SaaS (HR Automation)", result: "Churn prediction (XGBoost, 40+ фіч): відтік -31%, MRR retention +£1,050/міс.", metric: "−31%" },
      { client: "EquipSense", niche: "Виробництво / IoT", result: "Predictive maintenance (LSTM + sensor data): простій -73%, maintenance costs -28%.", metric: "−73%" },
    ],
    useCases: [
      { niche: "Retail та FMCG", emoji: "🛒", description: "Demand forecasting per SKU × location, автоматичні reorder points, зниження списань" },
      { niche: "SaaS та підписки", emoji: "💻", description: "Churn prediction (AUC > 0.90), LTV оцінка, revenue forecasting з confidence intervals" },
      { niche: "Фінанси та FinTech", emoji: "💰", description: "Credit risk scoring (SHAP, FCA UK), fraud propensity, default probability" },
      { niche: "Виробництво / IoT", emoji: "🏭", description: "Predictive maintenance: прогноз відмов за 24–72 год, оптимізація сервісних бригад" },
      { niche: "Енергетика", emoji: "⚡", description: "Прогноз споживання, balancing renewable output, оптимізація закупівель енергії" },
      { niche: "B2B Sales", emoji: "📈", description: "Lead scoring, deal win probability, optimal contact time, pipeline forecasting" },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug);
}

// EN locale overrides — key fields translated for the EN locale
const SERVICES_EN: Record<string, Partial<Service>> = {
  "artificial-intelligence": {
    title: "Artificial Intelligence for Business",
    shortTitle: "Artificial Intelligence",
    description: "GPT bots, computer vision, NLP — AI that automates real business processes and cuts costs.",
    longDescription: "We deploy AI solutions across the full spectrum: RAG chatbots that handle up to 68% of support tickets without a human agent, Computer Vision systems that catch 96% more production defects, NLP that analyses thousands of reviews per minute, and GenAI that creates content 12× faster. We select the right approach — Prompt Engineering, RAG, or Fine-tuning — based on your task and budget.",
    deliveryTime: "2–10 weeks",
    priceFrom: "from £375",
    metaDescription: "AI development for UK businesses — GPT chatbots, RAG, NLP, computer vision, GenAI. Codeworth from £375. Real results: -68% support load, -96% missed defects.",
    keyword: "AI development UK",
    features: [
      { title: "GPT Bot with Knowledge Base (RAG)", description: "Chatbot powered by GPT-4o or Claude, trained on your own content — answers customers 24/7 with zero hallucinations. Case: SupportAI — 68% of tickets handled by AI, saving £30K/year in support costs." },
      { title: "Computer Vision (CV)", description: "Real-time object, defect and face detection. YOLOv8 + PyTorch. Case: QualityEye — missed defects -96%, inspection speed ×12 vs manual quality control." },
      { title: "NLP & Text Analytics", description: "Sentiment analysis, request classification, NER, contract analysis. Case: BrandPulse — response time to negative reviews from 48 h to 1.8 h, marketplace rating +0.7 stars." },
      { title: "AI Document Analysis (LegalTech)", description: "RAG pipeline on LangChain: automatic extraction of contract terms, risky clauses, version comparison. Case: DocSense — contract review from 2 hours to 18 minutes." },
      { title: "Content Generation (GenAI)", description: "Automated creation of SEO articles, product descriptions, social posts — in your brand voice. Content produced ×12 faster, consistent quality at scale." },
      { title: "Voice AI & Speech Recognition", description: "Call transcription (Whisper), voice bots for contact centres, voice search for mobile apps. Supports English, Ukrainian and Russian." },
    ],
    includes: [
      "AI audit of your business challenge and selection of the highest-ROI approach (LLM / RAG / CV / GenAI)",
      "RAG pipeline, CV system or NLP solution development",
      "API integration into your website, CRM, ERP or Telegram",
      "Vector DB for semantic search (Qdrant / Pinecone / Weaviate)",
      "Model quality and accuracy testing on real data",
      "Cloud deployment (AWS EU / GCP / self-hosted) + Docker",
      "Documentation, team training and 3 months of support",
    ],
    packages: [
      {
        name: "AI Assistant",
        price: "from £375",
        desc: "GPT bot for your website or Telegram",
        features: ["GPT-4o / Claude 3.5 Sonnet", "Up to 200 documents in RAG", "Telegram or website iframe embed", "Fallback to human agent on low confidence", "Query analytics dashboard", "1 month support"],
        highlight: false,
      },
      {
        name: "RAG Solution",
        price: "from £1,000",
        desc: "AI trained on your own content",
        features: ["RAG pipeline (LangChain + Qdrant)", "Up to 10,000 documents / pages", "Multi-source ingestion (PDF, web, DB)", "API + integration into any channel", "Analytics dashboard + intent analytics", "3 months support + monthly optimisation"],
        highlight: true,
      },
      {
        name: "Computer Vision / NLP",
        price: "from £1,250",
        desc: "Enterprise-grade CV or NLP system",
        features: ["YOLOv8 / BERT / CLIP models", "Custom dataset training", "Real-time inference endpoint (< 100ms)", "React dashboard with analytics & alerts", "MLOps model quality monitoring", "Edge or cloud deployment (NVIDIA Jetson / AWS)"],
        highlight: false,
      },
    ],
    faq: [
      { q: "What types of businesses benefit from AI?", a: "Any business with repetitive tasks: customer support, request classification, text analysis, document screening, production quality control, or content generation at scale." },
      { q: "How much does a GPT chatbot cost?", a: "A basic RAG bot with 200 documents starts from £375. An enterprise RAG pipeline for up to 10,000 documents with an analytics dashboard starts from £1,000. A CV or NLP system starts from £1,250." },
      { q: "Will the bot hallucinate?", a: "No — not with RAG. The bot only answers from your knowledge base (vectors stored in Qdrant). If the answer isn't in the knowledge base, it says so and optionally escalates to a human agent. No fabricated facts." },
      { q: "Do you provide post-launch support?", a: "Yes. All packages include support (1–3 months). After that, a monthly retainer from £125/month covers quality monitoring, knowledge base updates, prompt tuning and alerts on accuracy degradation." },
      { q: "How accurate is computer vision?", a: "Accuracy depends on the task and dataset quality. For typical tasks (production defects, QR codes, barcodes, faces) we achieve 90–97%. For medical imaging — from 94%. We guarantee a baseline accuracy figure at the PoC stage before committing to full development." },
      { q: "Where is client data stored?", a: "RAG vectors are stored in Qdrant on your own server or an EU cloud (AWS Frankfurt / GCP europe-west3). Requests to OpenAI/Claude go via enterprise tier — not used for model training. CV processing runs exclusively on your infrastructure. We sign NDA and DPA before any work begins." },
      { q: "How long does implementation take?", a: "A simple GPT bot: 1–2 weeks. A RAG solution: 3–5 weeks. An enterprise CV or NLP system: 5–10 weeks depending on data volume. We always start with a 1–2 week PoC so you see results before committing the full budget." },
      { q: "Can AI be integrated into a CRM or Telegram?", a: "Yes. We integrate via REST API into any channel: your website, Telegram, Viber, CRM (Salesforce, HubSpot, Bitrix24), ERP, Shopify, or custom systems. All integrations are included in the package price." },
      { q: "Is your AI solution GDPR compliant?", a: "Yes. For GDPR-sensitive projects (healthcare, finance, HR) we build self-hosted architectures: Qdrant vector database on your own server, no personal data leaving your infrastructure. For UK projects we comply with UK GDPR and ICO requirements. We sign a DPA (Data Processing Agreement) before any work with personal data begins." },
      { q: "What is RAG and why is it better than a basic GPT chatbot?", a: "RAG (Retrieval-Augmented Generation) — the bot first searches your knowledge base (documents, FAQs, catalogue) and then generates an answer from what it found. A plain GPT bot answers from its training data and can fabricate facts. A RAG bot only answers from your content, cites the source, and says 'I don't know' if the answer isn't there. Zero hallucinations." },
      { q: "Can you build a bot that handles both Ukrainian and English queries?", a: "Yes — this is our specialisation for the UK+UA market. A bilingual RAG bot uses one knowledge base with two locales: automatic language detection via langdetect, locale-tagged documents in Qdrant, and GPT-4o responding in the client's language with locale-specific content (£/₴ pricing, UK vs UA contacts, opening hours). Ideal for diaspora businesses and companies with offices in both markets." },
      { q: "What is Making Tax Digital and how does AI help with MTD compliance?", a: "MTD is a mandatory HMRC programme requiring digital record-keeping and VAT submissions via API-compatible software. Our AI invoice processing system (InvoiceAI) automatically extracts document data via GPT-4o Vision and syncs with Xero/QuickBooks in MTD-compliant format. HMRC penalties for MTD non-compliance start at £200 per quarter." },
      { q: "When should I choose AI (GPT/RAG/CV) vs ML (XGBoost/LSTM)?", a: "Choose AI when the task involves language, text, images or voice: chatbots, document analysis, content generation, computer vision, a language model trained on your own content (RAG). Choose ML when the task is about structured data and prediction: fraud detection, churn prediction, demand forecasting, credit scoring, recommendations. They often complement each other: an ML model predicts churn risk → an AI bot delivers a personalised retention offer. A free consultation will help identify the best approach for your specific task." },
    ],
    comparisonTable: [
      {
        approach: "Prompt Engineering",
        ukDesc: "Налаштування запитів до готової LLM без навчання",
        enDesc: "Tuning prompts for an existing LLM with no training",
        ukWhen: "Швидкий старт, невеликий бюджет, загальні задачі",
        enWhen: "Quick start, limited budget, general tasks",
      },
      {
        approach: "RAG",
        ukDesc: "LLM + ваша база знань (документи, FAQ, каталог, сайт)",
        enDesc: "LLM + your knowledge base (docs, FAQ, catalogue, website)",
        ukWhen: "Точні відповіді з вашого контенту, без «галюцинацій», будь-який обсяг",
        enWhen: "Accurate answers from your own content, no hallucinations, any scale",
      },
      {
        approach: "Fine-tuning",
        ukDesc: "Донавчання базової моделі на ваших даних та стилі",
        enDesc: "Further training a base model on your own data and tone",
        ukWhen: "Специфічний домен, тон бренду, максимальна точність у вузькій задачі",
        enWhen: "Specific domain, brand voice, maximum accuracy for a narrow task",
      },
      {
        approach: "Computer Vision",
        ukDesc: "Навчання моделі YOLOv8 / CLIP на ваших зображеннях",
        enDesc: "Training a YOLOv8 / CLIP model on your own images",
        ukWhen: "Візуальний контроль якості, пошук за фото, детекція об'єктів",
        enWhen: "Visual QA, image-based search, object or defect detection",
      },
    ],
    beforeAfter: [
      { metric: "Support tickets handled without agent", before: "0% automated", after: "68% resolved by AI bot", improvement: "+68 pp" },
      { metric: "Contract review time", before: "2 h per document", after: "18 min per document", improvement: "−85%" },
      { metric: "Missed defects (CV quality control)", before: "15% defects missed", after: "0.6% defects missed", improvement: "−96%" },
      { metric: "Response time to negative review", before: "48 hours", after: "1.8 hours", improvement: "−96%" },
      { metric: "Content generation speed", before: "1 text / 45 min (copywriter)", after: "1 text / 4 min (GenAI)", improvement: "×12" },
    ],
    processSteps: [
      { step: 1, title: "AI Audit", description: "We analyse your processes, data and goals. We select the highest-ROI approach (RAG / CV / NLP / GenAI) and forecast the business impact." },
      { step: 2, title: "Proof of Concept (1–2 weeks)", description: "We build a prototype on real data. You see accuracy and usefulness before committing the full budget — risk is minimised." },
      { step: 3, title: "Production Development", description: "We scale the PoC to a reliable production solution: API, integrations, dashboard, alerts, and data security (NDA + DPA)." },
      { step: 4, title: "Launch & Monitoring", description: "Deployment, team training, model quality monitoring. Monthly prompt and knowledge-base optimisation on retainer." },
    ],
    caseStudies: [
      { client: "SupportAI", niche: "SaaS / Customer Support", result: "RAG bot handles 68% of tickets without a human agent. Support cost saving £30K/year.", metric: "−68%" },
      { client: "QualityEye", niche: "Manufacturing (Textile)", result: "YOLOv8 CV system: missed defects -96%, inspection speed ×12 vs manual.", metric: "−96%" },
      { client: "DocSense", niche: "LegalTech", result: "AI contract analysis (LangChain + GPT-4o): review time from 2 h to 18 min, missed risks -94%.", metric: "18 min" },
    ],
    useCases: [
      { niche: "Customer Support", emoji: "🎧", description: "RAG chatbot 24/7 — answers from your knowledge base, escalates to a human only on complex cases" },
      { niche: "LegalTech / Documents", emoji: "⚖️", description: "AI contract analysis: extract terms, flag risky clauses, compare versions — instead of 2 h manual review" },
      { niche: "Manufacturing / QA", emoji: "🏭", description: "Computer Vision for production line QA: real-time defect detection, -96% missed defects" },
      { niche: "E-commerce / Fashion", emoji: "🛒", description: "Visual search (CLIP + Qdrant), AI product description generation, catalogue personalisation" },
      { niche: "HR & Recruitment", emoji: "👥", description: "AI CV screening (spaCy + GPT-4o): 300 CVs in 4 hours instead of 4 days, 89% selection accuracy" },
      { niche: "Content & Marketing", emoji: "✍️", description: "GenAI copywriting in your brand voice: SEO articles, descriptions, posts — ×12 faster than human" },
      { niche: "FinTech & Accounting", emoji: "🧾", description: "GPT-4o Vision invoice OCR: processing 8 min → 25 sec (−95%), Making Tax Digital (UK), Xero/QuickBooks sync, −99% data entry errors" },
      { niche: "Education (EdTech)", emoji: "🎓", description: "AI tutor with adaptive learning (IRT diagnostics, Whisper pronunciation, GPT-4o conversation practice): course completion 34% → 71%" },
      { niche: "Hospitality", emoji: "🏨", description: "Voice AI concierge: Whisper STT → GPT-4o → ElevenLabs TTS, EN/UA/PL, handles check-in, services & restaurant bookings without staff" },
    ],
  },
  "machine-learning": {
    title: "Machine Learning for Business",
    shortTitle: "Machine Learning",
    description: "Custom ML models, predictive analytics and MLOps — turning your data into a competitive edge.",
    longDescription: "We build and deploy full-cycle ML solutions: fraud detection (-97% fraud in 2 months), churn prediction (-31%), demand forecasting (-34% excess stock), recommendation engines (+176% CTR), and dynamic pricing (+18% margin). From data audit and model training to production deployment with MLOps monitoring and automated retraining.",
    deliveryTime: "4–12 weeks",
    priceFrom: "from £750",
    metaDescription: "Machine Learning for UK businesses — fraud detection, churn prediction, recommendations, MLOps. Codeworth from £750. Real results: -97% fraud, +176% recommendation CTR, -34% excess stock.",
    keyword: "machine learning development UK",
    features: [
      { title: "Predictive Analytics & Churn", description: "XGBoost / LightGBM on 40+ behavioural features. Case: RetainIQ — churn from 8.4% to 5.8% (-31%), MRR retention +£1,050/month, Customer Success productivity ×3." },
      { title: "Fraud Detection & Scoring", description: "Real-time ML pipeline: LightGBM + Kafka + Redis feature store, p99 latency < 30ms. Case: FraudShield — fraud rate -97%, false positives -40%, losses -£4,500/month." },
      { title: "Recommendation Engines", description: "Hybrid: collaborative filtering (PyTorch) + content-based (TF-IDF + embeddings). Case: PersonaCart — recommendation CTR +176% (1.3%→3.6%), average order value +22%, revenue +£9,500/quarter." },
      { title: "Demand Forecasting", description: "Ensemble XGBoost + Prophet per SKU × store, Airflow DAG nightly retraining. Case: StockSense — excess inventory -34%, write-offs -41%, MAPE 8.3% vs 27% baseline." },
      { title: "Dynamic Pricing", description: "LightGBM with 30+ features (competitors, stock, seasonality), hourly price updates. Case: PriceSense — margin +18%, revenue +£1,675/month with the same traffic." },
      { title: "MLOps & Production Deployment", description: "MLflow for versioning, Airflow DAG for retraining, drift monitoring. Without MLOps a model degrades within 3–6 months — we don't let that happen." },
    ],
    includes: [
      "Data audit: quality, volume, feature importance, achievable accuracy estimate",
      "Feature engineering: cleaning, transformations, synthetic data when volume is low",
      "Model training and validation with hyperparameter tuning (Optuna / Ray Tune)",
      "REST / gRPC API integration into your stack (CRM, ERP, Shopify)",
      "A/B test of new ML model vs baseline metric",
      "Production deployment: Docker + FastAPI / AWS SageMaker / GCP Vertex AI",
      "MLOps: MLflow + Airflow, data drift monitoring, automated retraining",
    ],
    packages: [
      {
        name: "ML Starter",
        price: "from £750",
        desc: "Data audit + first ML model",
        features: ["Data quality audit and preparation", "Baseline model (XGBoost / LightGBM)", "Hyperparameter tuning + validation", "REST API endpoint", "Jupyter report with SHAP explanations", "1 month support"],
        highlight: false,
      },
      {
        name: "ML Production",
        price: "from £1,500",
        desc: "Custom model + deployment + MLOps",
        features: ["Advanced feature engineering", "Model ensembles + A/B test vs baseline", "FastAPI endpoint (< 50ms latency)", "Integration into your stack (CRM / ERP / SaaS)", "MLflow versioning + drift monitoring", "React metrics dashboard + Telegram alerts", "3 months support + quarterly model review"],
        highlight: true,
      },
      {
        name: "ML Platform",
        price: "on request",
        desc: "Multiple models + Airflow + full automation",
        features: ["2–5 ML models on a single platform", "Airflow DAG: automated retraining", "Streaming data pipeline (Kafka / Spark)", "Feature store (Redis / Feast)", "C-level dashboard with business metrics", "Quarterly ML review and roadmap"],
        highlight: false,
      },
    ],
    faq: [
      { q: "How much data do I need for an ML model?", a: "At least 1,000–5,000 records for basic tasks (classification, regression). Fraud detection or recommendation engines need 10,000–50,000+. If data is scarce, we use transfer learning, synthetic generation (SMOTE) and feature engineering to compensate." },
      { q: "How accurate are ML models?", a: "It depends on the task and data quality. Fraud detection: AUC 0.97–0.99, precision 92–95%. Churn prediction: AUC 0.85–0.95, F1 0.80–0.91. Demand forecasting: MAPE 5–12%. Recommendations: CTR +100–200% vs baseline. We guarantee a baseline accuracy figure on the PoC before committing to full development." },
      { q: "What is MLOps and why do I need it?", a: "MLOps keeps an ML model performing in production. Without it, data distributions shift over 3–6 months (data drift) and accuracy silently degrades. With MLOps: automatic quality monitoring, Telegram alert when performance drops below a threshold, and scheduled retraining (Airflow). Included in ML Production and ML Platform packages." },
      { q: "How does ML integrate with our existing systems?", a: "Via REST or gRPC API — your backend sends a request and receives a prediction in < 50ms. We support integration with CRM (Salesforce, HubSpot), ERP (SAP), Shopify, WooCommerce and custom systems. For real-time tasks (fraud detection) we build a Kafka streaming pipeline with Redis feature store." },
      { q: "Where is training data processed?", a: "Data stays on your infrastructure or an EU cloud (AWS Frankfurt / GCP europe-west3). We don't retain your data after project completion. We sign an NDA and DPA before any data work begins." },
      { q: "How long does an ML project take?", a: "ML Starter (first model + API): 4–6 weeks. ML Production (full cycle + MLOps): 8–12 weeks. ML Platform (multiple models + automation): 3–5 months. We always begin with a 2-week PoC — you see real results before committing the full budget." },
      { q: "What if the model doesn't deliver the expected result?", a: "That's exactly why we start with a PoC: in 2 weeks we establish the achievable accuracy on your real data. If the PoC shows insufficient impact, we tell you honestly before the full project starts. Transparency matters more than a sale." },
      { q: "Can the ML model be made explainable (XAI)?", a: "Yes. We use SHAP and LIME to interpret any black-box model. This is important for credit scoring (regulatory requirements), healthcare, and HR — wherever you need to explain why the model made a specific decision." },
      { q: "Do your ML solutions meet FCA requirements (UK)?", a: "Yes. For UK FinTech clients we build FCA-compliant systems from day one: SHAP explanations for every automated decision (transaction blocking, credit scoring), customer appeals workflow with human-in-the-loop review, and an immutable audit log retained for 5 years. Consumer Duty 2023 compliance is built into the architecture, not added as an afterthought." },
      { q: "Can ML optimise our supply chain and inventory?", a: "Yes — this is one of the strongest ML use cases for FMCG and distribution. XGBoost forecasts demand per SKU per location (MAPE 8–13%), auto-calculates reorder points and safety stock. Google OR-Tools optimises delivery routes (Vehicle Routing Problem) — typically −15–25% in distance driven. Typical results: stockout −70–80%, slow-moving stock −30–45%, driver overtime −85%." },
      { q: "How does support ticket automation work with ML?", a: "We fine-tune a BERT model on 18+ months of your resolved tickets: it learns your specific product terminology, error codes, and classification taxonomy. Result: 93–95% classification accuracy, Zendesk integration in under 8 seconds per ticket, pre-populated draft responses via GPT-4o-mini. At 1,200 tickets per week, the cost per classification is 95%+ lower than GPT-4o for the same accuracy on narrow domain tasks." },
      { q: "When is ML better than rule-based logic?", a: "Rules work well when logic is stable and unambiguous (e.g. 'if amount > £5,000 → flag for review'). ML outperforms rules when: (1) there are many interacting factors with non-linear relationships (fraud has 50+ signals); (2) data distribution keeps shifting (new fraud patterns, new customer segments); (3) you have 50+ rules that start contradicting each other; (4) you need per-customer personalisation (recommendations, dynamic pricing). Practical rule: if your analyst can't explain the decision in under 10 conditions — it's time for ML." },
    ],
    beforeAfter: [
      { metric: "Customer churn rate", before: "8.4% / month", after: "5.8% / month", improvement: "−31%" },
      { metric: "Fraud rate (payment platform)", before: "1.8% of transactions", after: "0.054% of transactions", improvement: "−97%" },
      { metric: "Demand forecast error (MAPE)", before: "27%", after: "8.3%", improvement: "−69%" },
      { metric: "Recommendation block CTR", before: "1.3%", after: "3.6%", improvement: "+176%" },
      { metric: "Gross margin (dynamic pricing)", before: "baseline", after: "+18% margin", improvement: "+18%" },
      { metric: "Unplanned equipment downtime", before: "47 h / month", after: "12.7 h / month", improvement: "−73%" },
    ],
    processSteps: [
      { step: 1, title: "Data Audit (1 week)", description: "We assess the quality, volume and completeness of your data. We define the ML task, forecast achievable accuracy and ROI. No audit — no project start." },
      { step: 2, title: "PoC & Validation (1–2 weeks)", description: "We train the first model version on real data. We measure accuracy and business impact. You decide whether to proceed based on facts, not promises." },
      { step: 3, title: "Production Development (3–8 weeks)", description: "We scale the PoC: feature engineering, model ensembles, A/B test, FastAPI endpoint, CRM/ERP integration, team dashboard." },
      { step: 4, title: "MLOps & Monitoring", description: "MLflow for versioning, Airflow for automated retraining, data drift monitoring, Telegram alerts on quality degradation. The model stays accurate." },
    ],
    caseStudies: [
      { client: "FraudShield", niche: "FinTech / Payment Platform", result: "ML fraud detection (LightGBM + Kafka): fraud rate -97%, losses -£4,500/month, p99 latency < 30ms.", metric: "−97%" },
      { client: "RetainIQ", niche: "B2B SaaS (HR Automation)", result: "Churn prediction (XGBoost, 40+ features): churn -31% in first quarter, MRR retention +£1,050/month.", metric: "−31%" },
      { client: "StockSense", niche: "Retail (120 stores)", result: "Demand forecasting (XGBoost + Prophet): excess inventory -34%, write-offs -41%, MAPE 8.3%.", metric: "−34%" },
    ],
    useCases: [
      { niche: "Finance & FinTech", emoji: "💰", description: "Fraud detection (< 30ms latency), credit scoring (SHAP explainability), default probability modelling" },
      { niche: "E-commerce & Retail", emoji: "🛒", description: "Recommendations (+176% CTR), dynamic pricing (+18% margin), demand forecasting (-34% excess stock)" },
      { niche: "SaaS & Products", emoji: "💻", description: "Churn prediction (-31%), LTV estimation, user behaviour anomaly detection" },
      { niche: "Manufacturing & IoT", emoji: "🏭", description: "Predictive maintenance (LSTM + IoT): unplanned downtime -73%, ROI in 5 months" },
      { niche: "Logistics", emoji: "🚛", description: "Route optimisation, delay prediction, warehouse stock management" },
      { niche: "HR & People Analytics", emoji: "👥", description: "Predictive HR: turnover prediction (12 factors), attrition -28%, ROI £8 per £1 spent" },
      { niche: "Real Estate (PropTech)", emoji: "🏠", description: "AVM — automated property valuation (XGBoost + PostGIS, MAPE 4.2%), rental yield prediction, property risk scoring" },
      { niche: "Agriculture (AgriTech)", emoji: "🌾", description: "ML yield forecasting (MAPE 6.3%), Sentinel-2 NDVI monitoring, YOLOv8 drone disease detection, UK ELM compliance reporting" },
      { niche: "Cybersecurity", emoji: "🛡️", description: "Behavioural anomaly detection (Isolation Forest + LSTM), real-time scoring 180ms, FCA/GDPR compliance with SHAP explanations and immutable audit log" },
    ],
  },
  nlp: {
    title: "NLP Development Services UK",
    shortTitle: "NLP",
    description: "Text classification, NER, sentiment analysis, RAG — turning unstructured text into business insights at scale.",
    longDescription: "We build full-cycle NLP systems: from support ticket classifiers (93% accuracy) to enterprise RAG pipelines for corporate documents. We process hundreds of thousands of texts daily — reviews, contracts, tickets, medical notes. Multilingual NLP supported: EN + UK + PL.",
    deliveryTime: "3–8 weeks",
    priceFrom: "from £1,125",
    metaDescription: "NLP development services UK — text classification, NER, sentiment analysis, RAG pipelines. Codeworth from £1,125. Real results: 93% ticket classification accuracy, -65% triage time.",
    keyword: "NLP development services UK",
    features: [
      { title: "Text & Ticket Classification", description: "Fine-tuned BERT on your data: 14+ categories, automatic routing, priority scoring. Case: 1,200 tickets/week — -65% triage time, SLA from 67% to 95%+." },
      { title: "Sentiment Analysis & Brand Monitoring", description: "Real-time review, social media and NPS analysis. Multi-class sentiment (positive/neutral/negative/urgent). Case: BrandPulse — response time from 48 h to 1.8 h, rating +0.7." },
      { title: "Named Entity Recognition (NER)", description: "Extract entities from contracts, medical notes, financial documents: dates, amounts, persons, organisations, risky clauses." },
      { title: "RAG & Document Search", description: "LangChain + Qdrant: semantic search across corporate knowledge bases, Q&A over PDF/web/DB. Answers with source citations, zero hallucinations." },
      { title: "Summarisation & Key Insight Extraction", description: "Abstractive + extractive summarisation for calls, meetings, email threads. Compression to 10–15% with no loss of key facts." },
      { title: "Multilingual NLP (EN + UK + PL)", description: "One pipeline — three languages. Auto language detection, locale-aware classification, translation preserving document structure." },
    ],
    includes: [
      "Task audit and architecture selection (fine-tuning / RAG / prompt engineering)",
      "Dataset labelling and annotation pipeline setup",
      "Model training and validation (F1, precision, recall)",
      "REST API endpoint (FastAPI, < 200ms latency)",
      "Integration with your stack (Zendesk, Salesforce, custom CRM)",
      "Quality monitoring dashboard + degradation alerts",
      "3 months of support and optimisation",
    ],
    packages: [
      {
        name: "NLP Starter",
        price: "from £1,125",
        desc: "Classifier or sentiment analyser",
        features: ["Fine-tuned BERT/DistilBERT", "Up to 5 classes/categories", "Dataset from 2,000 examples", "REST API endpoint", "SHAP decision explanations", "1 month support"],
        highlight: false,
      },
      {
        name: "NLP Production",
        price: "from £2,000",
        desc: "Full NLP system with monitoring",
        features: ["14+ classes, multi-task model", "NER + classification + sentiment in one pipeline", "RAG pipeline (LangChain + Qdrant)", "CRM / Helpdesk integration", "Dashboard + MLOps monitoring", "3 months support + monthly review"],
        highlight: true,
      },
      {
        name: "Enterprise NLP",
        price: "on request",
        desc: "Platform processing millions of texts",
        features: ["Streaming pipeline (Kafka + Spark NLP)", "Custom transformer from scratch", "On-premise deployment (GDPR-sensitive)", "Active learning with feedback loop", "C-level analytics dashboard", "SLA 4h + quarterly roadmap"],
        highlight: false,
      },
    ],
    faq: [
      { q: "How much data do I need for an NLP model?", a: "For text classification: minimum 500–2,000 examples per class. For NER: from 1,000 labelled documents. When data is scarce, we use few-shot learning and data augmentation. The exact volume is defined after an audit." },
      { q: "Does NLP support the Ukrainian language?", a: "Yes. We use mBERT, XLM-R and uk-specific models (roberta-base-uk). For multilingual tasks — one model for EN+UK+PL with auto language detection. Ideal for UK+UA businesses with customers in both markets." },
      { q: "How accurate is an NLP text classifier?", a: "For support ticket classification: F1 92–96% at 14+ categories. Sentiment on product reviews: accuracy 89–93%. NER for contracts: precision 94%, recall 91%. Exact metrics depend on the quality and volume of your data." },
      { q: "How much does an NLP system cost in the UK?", a: "Basic classifier (up to 5 classes, BERT fine-tuning): from £1,125. Full NLP system (14+ classes, NER + sentiment, CRM integration, MLOps): from £2,000. Enterprise streaming platform: on request." },
      { q: "Can NLP integrate with Zendesk or Salesforce?", a: "Yes. We integrate NLP models via REST API into any helpdesk or CRM: Zendesk (webhook trigger), Salesforce (Apex callout), Freshdesk, Intercom, or a custom system. Response time < 200ms so it doesn't slow down agent workflow." },
      { q: "What is RAG and when should I use NLP instead?", a: "RAG — search + answer generation from a document base (ideal for Q&A, chatbots). NLP — classification, entity extraction, sentiment (ideal for structuring data, routing, analytics). They often complement each other: NLP classifies the request → RAG finds the answer in the knowledge base → GPT-4o formulates the response." },
    ],
    beforeAfter: [
      { metric: "Support ticket triage time", before: "4.5 h per 100 tickets", after: "1.6 h per 100 tickets", improvement: "−65%" },
      { metric: "SLA compliance (helpdesk)", before: "67%", after: "95%+", improvement: "+28 pp" },
      { metric: "Response time to negative review", before: "48 hours", after: "1.8 hours", improvement: "−96%" },
      { metric: "Key data extraction from contracts", before: "2 h per contract (manual)", after: "4 min per contract (NER)", improvement: "−97%" },
    ],
    processSteps: [
      { step: 1, title: "NLP Task Audit", description: "We define the task type (classification / NER / sentiment / RAG), analyse available data, estimate achievable accuracy and timeline." },
      { step: 2, title: "Labelling & PoC (2 weeks)", description: "We set up the annotation pipeline, label a seed dataset, train the first classifier. You see the F1 score before the full project begins." },
      { step: 3, title: "Production Development (3–5 weeks)", description: "Scale the model: active learning, multi-task approach, API, CRM/helpdesk integration, analytics dashboard." },
      { step: 4, title: "Deployment & Monitoring", description: "Launch, team training, data drift monitoring, automatic retraining on F1 degradation." },
    ],
    caseStudies: [
      { client: "SupportML", niche: "B2B SaaS / Helpdesk", result: "BERT classifier 14 categories: -65% triage time, SLA from 67% to 95%+, Zendesk integration.", metric: "−65%" },
      { client: "BrandPulse", niche: "Retail / Brand Monitoring", result: "Review sentiment analysis: response time to negatives from 48 h to 1.8 h, rating +0.7 stars.", metric: "1.8 h" },
      { client: "DocSense Legal", niche: "LegalTech", result: "NER pipeline for contracts: key data extraction from 2 h to 4 min, risk coverage +94%.", metric: "−97%" },
    ],
    useCases: [
      { niche: "Helpdesk / Customer Support", emoji: "🎧", description: "Auto-classify tickets, route to the right team, priority scoring, draft responses" },
      { niche: "Legal / Compliance", emoji: "⚖️", description: "NER extraction of contract terms, risky clauses, version comparison, compliance check" },
      { niche: "Retail / E-commerce", emoji: "🛒", description: "Review sentiment, brand monitoring, returns classification, automated description generation" },
      { niche: "Healthcare / Medtech", emoji: "🏥", description: "Clinical NLP: extract medical entities (ICD-10, SNOMED), analyse physician notes" },
      { niche: "Finance / FinTech", emoji: "💰", description: "Financial document classification, NER in reports, news analysis for trading signals" },
      { niche: "HR / Recruitment", emoji: "👥", description: "CV screening (NER + classification), performance review analysis, exit interview insights" },
    ],
  },
  "computer-vision": {
    title: "Computer Vision Development Services UK",
    shortTitle: "Computer Vision",
    description: "Object detection, quality inspection, medical imaging and OCR — ML systems that see better than humans.",
    longDescription: "We build CV systems for automated visual inspection: from YOLOv8 defect detection on production lines (-96% missed defects) to medical imaging analytics and OCR for documents. We deploy on edge devices (NVIDIA Jetson), cloud or on-premise depending on your latency and GDPR requirements.",
    deliveryTime: "4–10 weeks",
    priceFrom: "from £1,500",
    metaDescription: "Computer vision development services UK — YOLOv8 object detection, OCR, quality inspection, medical imaging. Codeworth from £1,500. Real results: -96% missed defects, ×12 inspection speed.",
    keyword: "computer vision development UK",
    features: [
      { title: "Defect Detection & Quality Control (QA)", description: "YOLOv8 + custom dataset: real-time conveyor inspection, defect type classification. Case: QualityEye (Textile) — missed defects -96%, speed ×12 vs manual QC." },
      { title: "Object Detection & Tracking", description: "YOLO + ByteTrack: visitor counting, warehouse monitoring (RFID-free), security CCTV with AI alerts. Latency < 50ms on RTX GPU." },
      { title: "OCR & Document Data Extraction", description: "PaddleOCR + GPT-4o Vision: invoices, ID documents, forms, medical forms. Accuracy > 97% on typical business documents. MTD-compatible for UK accounting." },
      { title: "Medical Imaging", description: "X-ray and pathology slide classification, tissue/tumour segmentation. On-premise deployment, HIPAA/GDPR-compliant, HL7 FHIR R4 integration." },
      { title: "Visual Search & Image Similarity", description: "CLIP + Qdrant: search by photo, person re-identification, similar product matching for e-commerce. Vector search < 20ms." },
      { title: "Edge CV Deployment", description: "ONNX / TensorRT: optimisation for NVIDIA Jetson, Raspberry Pi, industrial cameras. Cloud offload removed for GDPR-sensitive or low-latency tasks." },
    ],
    includes: [
      "CV task audit and architecture selection (detection / segmentation / classification / OCR)",
      "Dataset collection or preparation, annotation (bounding boxes, masks, keypoints)",
      "Model training and validation (mAP, precision, recall)",
      "Optimisation for target platform (cloud / edge / on-premise)",
      "REST API or SDK for integration into your systems",
      "Video analytics dashboard and quality reports",
      "3 months of support and optimisation",
    ],
    packages: [
      {
        name: "CV PoC",
        price: "from £1,500",
        desc: "First CV model trained on your images",
        features: ["YOLOv8 / EfficientDet fine-tuning", "Dataset 500–2,000 images", "Up to 5 object classes", "REST inference API", "Jupyter report with metrics", "1 month support"],
        highlight: false,
      },
      {
        name: "CV Production",
        price: "from £3,000",
        desc: "Full CV system with real-world deployment",
        features: ["Custom dataset 5,000+ images", "Multi-class detection + tracking", "Real-time video stream (< 50ms)", "React analytics dashboard + alerts", "Edge or cloud deployment", "3 months support + MLOps monitoring"],
        highlight: true,
      },
      {
        name: "CV Enterprise",
        price: "on request",
        desc: "Multi-camera CV platforms",
        features: ["10+ simultaneous camera streams", "Multi-task: detection + OCR + tracking", "On-premise or private cloud", "GDPR / HIPAA-compliant architecture", "MES / ERP / SCADA integration", "SLA 4h + quarterly roadmap"],
        highlight: false,
      },
    ],
    faq: [
      { q: "How many images do I need to train a CV model?", a: "Minimum 200–500 images per class for basic fine-tuning. For production: 1,000–5,000+. When images are scarce — we use data augmentation (Albumentations), transfer learning and synthetic data generation." },
      { q: "How accurate is defect detection?", a: "For typical industrial quality control tasks: mAP@0.5 ≥ 0.88–0.95 (depends on defect variety and lighting quality). For medical imaging: AUC 0.90–0.97. We show baseline accuracy at the PoC stage before committing to full development." },
      { q: "Can CV work in real time (live video)?", a: "Yes. YOLOv8 + TensorRT on RTX 4070: 120+ FPS, latency < 8ms. On NVIDIA Jetson Orin (edge): 30–60 FPS, < 33ms. For IP cameras — streaming via RTSP + OpenCV pipeline with queue buffering." },
      { q: "Where is video data processed?", a: "For GDPR-sensitive tasks (faces, medical data) — exclusively on-premise or on your private server. For general tasks (defects, QR codes) — cloud inference (AWS or own EU GPU server). We sign NDA and DPA before any work begins." },
      { q: "How much does a CV system for manufacturing QC cost?", a: "PoC (first model, 1–3 defect types, REST API): from £1,500. Production system (5+ defect types, real-time video, dashboard, edge deployment): from £3,000. Enterprise (10+ cameras, MES integration, on-premise): on request." },
      { q: "Does CV work in mobile apps?", a: "Yes. We convert models to TFLite or Core ML for iOS/Android. Typical tasks: document scanning, product identification by photo, AR try-on for fashion. On-device inference — no images sent to a server." },
    ],
    beforeAfter: [
      { metric: "Missed defects (visual QA)", before: "15% of defects missed", after: "0.6% of defects missed", improvement: "−96%" },
      { metric: "Quality inspection speed", before: "1 operator — 200 units/h", after: "Automated — 2,400 units/h", improvement: "×12" },
      { metric: "Invoice processing (OCR)", before: "8 min per invoice (manual)", after: "25 sec per invoice (CV+NLP)", improvement: "−95%" },
      { metric: "False alarms (security system)", before: "47 false alarms/day", after: "3 false alarms/day", improvement: "−94%" },
    ],
    processSteps: [
      { step: 1, title: "CV Task Audit", description: "We define the CV task type, analyse available images, estimate annotation volume and achievable model accuracy." },
      { step: 2, title: "Dataset & PoC (2–3 weeks)", description: "We set up the annotation pipeline, label the seed dataset, train the first model. You see mAP before the full project starts." },
      { step: 3, title: "Production Development (3–6 weeks)", description: "Scale the dataset, tune the architecture, optimise for the target platform (cloud/edge), build the dashboard." },
      { step: 4, title: "Deployment & Monitoring", description: "Production launch, operator training, alert configuration, MLOps monitoring for model accuracy drift." },
    ],
    caseStudies: [
      { client: "QualityEye", niche: "Manufacturing (Textile)", result: "YOLOv8 + custom dataset 8 defect types: missed defects -96%, speed ×12 vs manual.", metric: "−96%" },
      { client: "InvoiceAI", niche: "FinTech / Accounting", result: "PaddleOCR + GPT-4o Vision: invoice processing from 8 min to 25 sec, MTD-compatible, -99% errors.", metric: "−95%" },
      { client: "CrowdSense", niche: "Retail / Shopping Centres", result: "YOLO + ByteTrack visitor counting: false alarms -94%, real-time footfall heat map.", metric: "×12" },
    ],
    useCases: [
      { niche: "Manufacturing & QA", emoji: "🏭", description: "Conveyor defect detection, defect classification, real-time operator alerts" },
      { niche: "Healthcare / Medicine", emoji: "🏥", description: "Medical image analysis, tissue segmentation, GDPR-compliant on-premise deployment" },
      { niche: "FinTech / Accounting", emoji: "🧾", description: "Invoice OCR, ID verification, automated data entry (MTD UK compliance)" },
      { niche: "Retail / E-commerce", emoji: "🛒", description: "Visual search by photo, shelf monitoring, shopper traffic analytics" },
      { niche: "Logistics / Warehouse", emoji: "🚛", description: "QR/barcode recognition, cargo counting, order picking verification" },
      { niche: "Security", emoji: "🛡️", description: "Intrusion detection, people counting, behaviour analysis, false alarm reduction" },
    ],
  },
  mlops: {
    title: "MLOps Services UK — From Prototype to Production",
    shortTitle: "MLOps",
    description: "MLOps pipelines, drift monitoring and automated retraining — keeping your ML models accurate in production.",
    longDescription: "87% of ML models never reach production. We solve exactly that problem: building automated CI/CD for ML, setting up data and concept drift monitoring, automating retraining via Airflow DAG. The result — models don't degrade within 3–6 months, they stay accurate. Includes MLOps Retainer £800/mo for ongoing support.",
    deliveryTime: "2–6 weeks (setup), then retainer",
    priceFrom: "from £750",
    metaDescription: "MLOps services UK — CI/CD for ML, model serving, drift monitoring, auto-retraining. Codeworth from £750 or £800/mo retainer. 87% of models without MLOps degrade within 6 months.",
    keyword: "MLOps services UK",
    features: [
      { title: "ML Pipeline Automation (CI/CD for ML)", description: "Airflow / Prefect DAG: automated pipeline from feature engineering to deploying a new model version. GitHub Actions for versioning, automatic quality testing before release." },
      { title: "Model Serving (FastAPI / BentoML / Seldon)", description: "REST or gRPC endpoint, < 50ms latency, auto-scaling. A/B testing: shadow deployment and champion-challenger testing without downtime." },
      { title: "Data Drift & Concept Drift Monitoring", description: "Evidently AI + Grafana: real-time monitoring of input data distributions. Telegram alert when drift exceeds threshold. Case: drift detected in 48 h vs 2 weeks of manual analysis." },
      { title: "Auto-Retraining Pipelines", description: "Scheduled + triggered retraining: Airflow DAG starts retraining on a schedule or drift alert. Automatic comparison of new version vs production baseline, rollback on degradation." },
      { title: "MLflow + Weights & Biases", description: "Model versioning, experiment metadata, model registry, reproducibility. Full audit trail for regulatory requirements (FCA, NHS Digital)." },
      { title: "MLOps Retainer (ongoing support)", description: "£800/mo: monthly model quality audit, drift alerts, retraining when needed, 4-hour SLA response. Ideal for companies without in-house ML engineers." },
    ],
    includes: [
      "Current ML infrastructure audit and bottleneck identification",
      "CI/CD pipeline setup for ML (GitHub Actions + Docker)",
      "Model serving endpoint with auto-scaling and load balancing",
      "Data drift monitoring (Evidently AI + Grafana dashboard)",
      "Airflow DAG for automated scheduled retraining",
      "MLflow model registry and versioning",
      "Telegram alerts + team documentation",
    ],
    packages: [
      {
        name: "MLOps Setup",
        price: "from £750",
        desc: "Basic MLOps infrastructure for one model",
        features: ["CI/CD pipeline (GitHub Actions)", "FastAPI model serving", "MLflow versioning", "Evidently drift monitoring", "Basic Grafana dashboard", "1 month onboarding support"],
        highlight: false,
      },
      {
        name: "MLOps Platform",
        price: "from £1,500",
        desc: "Full platform for multiple models",
        features: ["Airflow DAG with auto-retraining", "Multi-model serving (3–5 models)", "A/B testing + champion-challenger", "Full Grafana/Prometheus stack", "MLflow + W&B model registry", "3 months support + monthly review"],
        highlight: true,
      },
      {
        name: "MLOps Retainer",
        price: "from £800/mo",
        desc: "Ongoing MLOps support without in-house team",
        features: ["Monthly model quality audit", "24/7 drift monitoring", "Retraining when needed", "4-hour SLA response", "Monthly CTO/CPO report", "Priority queue for new requests"],
        highlight: false,
      },
    ],
    faq: [
      { q: "What is MLOps and why does my business need it?", a: "MLOps (Machine Learning Operations) — practices for maintaining ML models in production. Without MLOps: input data distributions shift → model silently degrades → business metrics drop. With MLOps: automatic monitoring, alert when performance drops below threshold, scheduled retraining. The average model without MLOps degrades 10–15% in 6 months." },
      { q: "How is MLOps different from DevOps?", a: "DevOps handles deployment and monitoring of software code. MLOps handles deployment and monitoring of ML models — where the output includes not just code, but model artefacts, datasets, quality metrics (F1, AUC) and input data distributions. MLOps adds model registry, drift detection and automated retraining." },
      { q: "How much do MLOps services cost in the UK?", a: "Basic MLOps setup (CI/CD + model serving + monitoring for 1 model): from £750. Full platform (3–5 models + Airflow + A/B testing): from £1,500. MLOps Retainer (ongoing): £800/mo, no commitment." },
      { q: "Can you implement MLOps for an existing model?", a: "Yes — this is actually the more common scenario. We audit the current deployment, identify risks (missing monitoring, manual retraining, no versioning), and implement MLOps gradually without stopping production." },
      { q: "What MLOps tools do you use?", a: "Orchestration: Airflow, Prefect, ZenML. Serving: FastAPI, BentoML, Seldon Core. Monitoring: Evidently AI, Grafana, Prometheus. Tracking: MLflow, Weights & Biases. CI/CD: GitHub Actions, Docker, Kubernetes. The choice depends on your stack and budget." },
    ],
    beforeAfter: [
      { metric: "Model drift detection time", before: "2 weeks (manual analysis)", after: "48 hours (automated alert)", improvement: "−86%" },
      { metric: "Time from commit to production", before: "3–5 days (manual deploy)", after: "2 hours (automated pipeline)", improvement: "−83%" },
      { metric: "Accuracy degradation over 6 months", before: "−12% F1 (no MLOps)", after: "< −1% F1 (with MLOps)", improvement: "×12" },
      { metric: "Time to retrain model", before: "1–2 days (manual)", after: "4 hours (automated)", improvement: "−83%" },
    ],
    processSteps: [
      { step: 1, title: "ML Infrastructure Audit", description: "We assess the current deployment, identify MLOps debt: missing monitoring, manual processes, unstable deployments, no versioning." },
      { step: 2, title: "MLOps Setup (1–2 weeks)", description: "Deploy CI/CD pipeline, model serving, MLflow registry, basic drift monitoring. First version live in 2 weeks." },
      { step: 3, title: "Automation (2–4 weeks)", description: "Airflow DAG for retraining, A/B testing framework, full Grafana stack, alert system." },
      { step: 4, title: "Ongoing Retainer", description: "Monthly model audits, drift alerts, retraining when needed, CTO reports. 4-hour SLA on critical alerts." },
    ],
    caseStudies: [
      { client: "FraudShield", niche: "FinTech / Fraud Detection", result: "MLOps for LightGBM model: drift detection in 48 h instead of 2 weeks, deployment from 3 days to 2 h.", metric: "−83%" },
      { client: "RetainIQ", niche: "B2B SaaS / Churn Model", result: "Airflow auto-retraining: accuracy degradation over 6 months from -12% to <-1% F1.", metric: "×12" },
      { client: "MedML", niche: "Healthcare / Clinical NLP", result: "MLOps on NHS Digital-compatible infrastructure: MLflow audit trail, auto-retraining on ICD code changes.", metric: "100%" },
    ],
    useCases: [
      { niche: "Finance / FinTech", emoji: "💰", description: "MLOps for fraud detection: drift on new fraud patterns → auto-retraining → 4h alert" },
      { niche: "Retail / E-commerce", emoji: "🛒", description: "Retraining recommendation systems on seasonal/assortment changes, A/B testing new models" },
      { niche: "SaaS Products", emoji: "💻", description: "CI/CD for churn model: new features → auto quality test → staged rollout → Grafana dashboard" },
      { niche: "Manufacturing / IoT", emoji: "🏭", description: "Predictive maintenance: drift on equipment replacement → triggered retraining → SLA alert" },
      { niche: "Healthcare", emoji: "🏥", description: "MLOps with audit trail for regulatory compliance (NHS Digital, MHRA): MLflow + immutable logs" },
      { niche: "Any ML Project", emoji: "🧠", description: "MLOps Retainer £800/mo: ongoing monitoring for companies without in-house ML engineers" },
    ],
  },
  "llm-rag": {
    title: "LLM & RAG Development Services UK",
    shortTitle: "LLM / RAG",
    description: "Enterprise RAG systems, fine-tuned LLMs and AI chatbots — with GDPR-compliant architecture for UK/EU business.",
    longDescription: "We build enterprise-grade LLM applications: RAG systems for corporate knowledge bases, fine-tuned models for your domain (healthcare, legal, finance), AI chatbots for customer support. Key focus: GDPR/UK GDPR compliance, option for full on-premise deployment without sending data to OpenAI.",
    deliveryTime: "2–8 weeks",
    priceFrom: "from £1,125",
    metaDescription: "LLM & RAG development services UK — GPT-4o, Llama 3, enterprise chatbots, knowledge base Q&A. Codeworth from £1,125. GDPR-compliant, on-premise deployment available.",
    keyword: "LLM development company UK",
    features: [
      { title: "RAG Systems (Retrieval-Augmented Generation)", description: "LangChain / LlamaIndex + Qdrant: semantic search across corporate documents (PDF, web, DB), zero-hallucination Q&A. Up to 1M+ documents in the vector database. Case: 68% of support requests → AI without an agent." },
      { title: "LLM Fine-Tuning for Your Domain", description: "LoRA / QLoRA fine-tuning GPT-4o, Llama 3, Mistral on your data: medical terminology, legal style, financial jargon. Result: narrow-domain accuracy +40–60% vs zero-shot." },
      { title: "AI Customer Support Bot", description: "Multi-channel bot (web / Telegram / WhatsApp): RAG answers from your knowledge base, escalation on low confidence, intent analytics. SLA < 2s response time." },
      { title: "Document Intelligence & Q&A", description: "Upload PDF / Word / Excel → ask questions. The RAG pipeline extracts the exact answer with a page-level source citation. Ideal for: legal documents, technical documentation, HR policies." },
      { title: "LLM API Integration into Your Product", description: "Plug AI into your SaaS/CRM/ERP via REST API. Prompt engineering, output parsing, function calling. We support: OpenAI, Anthropic Claude, Google Gemini, Mistral, open-source Llama 3." },
      { title: "GDPR-Compliant & On-Premise LLM", description: "Self-hosted Llama 3 / Mistral on your server: no data ever leaving your infrastructure. Ideal for: healthcare (HIPAA/GDPR), legal (client confidentiality), finance (FCA compliance)." },
    ],
    includes: [
      "Task audit: RAG vs Fine-Tuning vs Prompt Engineering",
      "RAG pipeline development (LangChain + Qdrant / Pinecone)",
      "Document ingestion setup (PDF, HTML, DB, API)",
      "Prompt engineering and systematic testing (LLM Evals)",
      "REST API endpoint + SDK for integration",
      "Analytics dashboard (intent, satisfaction, escalation rate)",
      "3 months of support and optimisation",
    ],
    packages: [
      {
        name: "RAG Starter",
        price: "from £1,125",
        desc: "RAG bot for corporate knowledge base",
        features: ["GPT-4o or Claude 3.5 Sonnet", "Up to 500 documents in Qdrant", "Web interface or iframe embed", "Prompt engineering + eval", "Query analytics", "1 month support"],
        highlight: false,
      },
      {
        name: "RAG Production",
        price: "from £2,000",
        desc: "Enterprise RAG platform",
        features: ["Up to 100,000 documents", "Multi-source ingestion (PDF/web/DB/API)", "Multi-channel (web/Telegram/WhatsApp)", "LLM Evals + automated testing", "MLOps answer quality monitoring", "3 months support + monthly review"],
        highlight: true,
      },
      {
        name: "LLM Fine-Tune",
        price: "from £1,750",
        desc: "Fine-tuned model for your domain",
        features: ["LoRA/QLoRA fine-tuning Llama 3 / Mistral", "Dataset preparation (1,000–10,000 pairs)", "Automated benchmarking vs GPT-4o", "On-premise deployment (vLLM / Ollama)", "GDPR/HIPAA-compliant architecture", "Technical documentation + team training"],
        highlight: false,
      },
    ],
    faq: [
      { q: "What is RAG and why is it better than a plain GPT chatbot?", a: "RAG (Retrieval-Augmented Generation): the bot first searches your knowledge base → then generates an answer from what it found. A plain GPT bot answers from general training data and can hallucinate facts. A RAG bot answers exclusively from your content and cites the source. Zero hallucinations." },
      { q: "Which is better: RAG or Fine-Tuning?", a: "RAG — when data changes frequently (prices, documents, FAQs) or the volume is large (1M+ pages). Fine-Tuning — when you need a specific response style, domain jargon, or maximum accuracy on a narrow task. Often the best result comes from RAG + Fine-Tuning combined." },
      { q: "Is there a GDPR-compliant LLM that doesn't send data to OpenAI?", a: "Yes. Self-hosted Llama 3 8B or Mistral 7B on your GPU server: all inference on-premise, no data leaving your infrastructure. We deploy via vLLM or Ollama with an OpenAI-compatible REST API. Performance is lower than GPT-4o but sufficient for most business tasks." },
      { q: "How much does a RAG system cost in the UK?", a: "RAG Starter (up to 500 documents, web interface): from £1,125. RAG Production (100K+ documents, multi-channel, MLOps): from £2,000. Llama 3 fine-tuning for your domain: from £1,750. On-premise LLM deployment: from £625 (when model already exists)." },
      { q: "How long does it take to build a RAG system?", a: "RAG Starter: 2–3 weeks. RAG Production with multi-channel and MLOps: 5–8 weeks. LLM Fine-tuning: 3–5 weeks (depends on dataset volume and GPU resources)." },
      { q: "Which LLM models do you support?", a: "OpenAI: GPT-4o, GPT-4o mini. Anthropic: Claude 3.5 Sonnet, Claude 3 Haiku. Google: Gemini 1.5 Pro. Open-source: Llama 3 (8B/70B), Mistral 7B/8x7B, Phi-3, Qwen 2.5. The choice depends on budget, privacy requirements and task." },
      { q: "Which LLM should we use for our UK business RAG system?", a: "For UK regulated industries (financial services, healthcare, legal), Azure OpenAI UK South (GPT-4o, GPT-4o mini) is typically the preferred choice — Microsoft guarantees UK data residency, enterprise SLA, and abuse monitoring that satisfies FCA and NHS procurement requirements. For lower-sensitivity applications, direct OpenAI or Anthropic Claude APIs are cost-effective. For maximum data control (no data leaves your infrastructure), open-source models (Llama 3.1 70B, Mistral Large) self-hosted on Azure or AWS UK are viable at higher operational complexity. We recommend based on your specific sensitivity and scale requirements." },
      { q: "How do you prevent LLM hallucination in RAG systems?", a: "Hallucination in RAG is primarily prevented by grounding: the LLM is instructed to answer only from retrieved context and must cite the source. Key techniques: strict system prompt instructions to refuse out-of-context answers, retrieval quality improvement (better chunking, hybrid dense+sparse search), citation enforcement (answer includes specific document and page reference), automated faithfulness scoring using RAGAS metrics, and human review triggers when confidence is low. We typically achieve faithfulness scores above 0.90 on production UK enterprise RAG systems." },
      { q: "What is the difference between RAG and fine-tuning an LLM?", a: "RAG retrieves relevant information at query time and passes it to the LLM as context — your knowledge base stays external and updateable without retraining. Fine-tuning bakes knowledge into the model weights by retraining on your data. RAG is better for: frequently updated information (pricing, policy, products), large knowledge bases, when citations are important, and most enterprise use cases. Fine-tuning is better for: consistent tone and style, domain-specific reasoning patterns, and latency-critical applications. For most UK enterprise deployments, RAG is the right architecture — we rarely recommend fine-tuning as a first step." },
      { q: "How much does it cost to run an LLM RAG system in production?", a: "Costs depend on query volume, document context size, and LLM choice. Illustrative UK enterprise example: 10,000 queries per day using GPT-4o mini with 2,000 token average context costs approximately £300-500 per month. Same volume with GPT-4o costs £2,000-4,000 per month. Switching to self-hosted Llama 3.1 70B on a single A10G GPU costs £400-800/month in Azure UK compute with no per-token charge. Vector database (Qdrant, Pinecone) adds £100-500/month depending on scale. Codeworth conducts cost modelling before architecture selection." },
      { q: "Can a RAG system work with confidential UK client documents?", a: "Yes, and this is one of the primary reasons UK enterprises choose RAG over public LLMs directly. The document corpus stays within your controlled infrastructure — vector embeddings are stored in your Qdrant, Weaviate, or Azure AI Search instance. LLM API calls can be routed through Azure OpenAI UK South (data does not leave UK data centres per Microsoft contract). For maximum security (classified, legally privileged, or highly sensitive commercial data), we architect fully air-gapped RAG using self-hosted LLMs on your private cloud — no external API calls at all." },
    ],
    beforeAfter: [
      { metric: "Support requests resolved by AI", before: "0% (manual handling)", after: "68% resolved by RAG bot", improvement: "+68 pp" },
      { metric: "Search time in corporate documents", before: "25 min per query (manual)", after: "12 sec per query (RAG)", improvement: "−99%" },
      { metric: "Answer accuracy in domain", before: "71% (zero-shot GPT-4o)", after: "94% (RAG + fine-tune)", improvement: "+23 pp" },
      { metric: "Customer support cost", before: "£38K/year (5 agents)", after: "£8K/year (1 agent + AI)", improvement: "−79%" },
    ],
    processSteps: [
      { step: 1, title: "LLM Task Audit", description: "We determine: RAG vs Fine-Tuning vs Prompt Engineering. We assess document volume and type, privacy requirements, inference budget." },
      { step: 2, title: "PoC in 2 Weeks", description: "We build a basic RAG on your 50–100 documents. You test answer quality and decide on scale." },
      { step: 3, title: "Production RAG (3–5 weeks)", description: "Full document ingestion pipeline, LLM Evals for automated quality control, multi-channel deployment, analytics." },
      { step: 4, title: "Optimisation & Support", description: "Monthly answer quality audit, knowledge base updates, prompt template optimisation, hallucination monitoring." },
    ],
    caseStudies: [
      { client: "SupportAI", niche: "SaaS / Customer Support", result: "GPT-4o RAG + Qdrant: 68% of tickets resolved by AI, saving £30K/year on support, < 2s latency.", metric: "−68%" },
      { client: "LexAI", niche: "LegalTech UK", result: "On-premise Llama 3 + RAG: Q&A over 50,000 case law documents, 94% accuracy, GDPR-compliant.", metric: "94%" },
      { client: "MedKnowledge", niche: "Healthcare / NHS", result: "Fine-tuned Llama 3 + FHIR RAG: clinical assistant, NHS Digital-compatible, on-premise.", metric: "23 pp" },
    ],
    useCases: [
      { niche: "Customer Support", emoji: "🎧", description: "RAG bot 24/7: answers from your knowledge base, escalates on low confidence, multi-channel" },
      { niche: "Corporate Knowledge Base", emoji: "📚", description: "HR policies, technical docs, runbooks: employee Q&A in 12 sec instead of 25 min search" },
      { niche: "LegalTech / Legal", emoji: "⚖️", description: "Q&A over case law, contracts, regulations — on-premise for client confidentiality" },
      { niche: "Healthcare", emoji: "🏥", description: "Clinical assistant: FHIR RAG, GDPR/NHS Digital compliant, on-premise, clinical NLP" },
      { niche: "FinTech", emoji: "💰", description: "FCA-compliant AI: regulation Q&A, KYC document analysis, internal audit Q&A" },
      { niche: "EdTech", emoji: "🎓", description: "AI tutor: adaptive answers, explanations from course materials, knowledge checking" },
    ],
  },
  "predictive-analytics": {
    title: "Predictive Analytics Services UK",
    shortTitle: "Predictive Analytics",
    description: "ML-powered demand, churn, revenue and risk forecasting — turning your data into accurate business predictions.",
    longDescription: "We specialise in business forecasting with ML: demand forecasting (MAPE < 10%), churn prediction (AUC > 0.90), credit risk scoring and revenue forecasting. From data audit to production ML model with SHAP explanations and MLOps monitoring. Average ROI for retail clients: 12× in the first year.",
    deliveryTime: "3–10 weeks",
    priceFrom: "from £750",
    metaDescription: "Predictive analytics services UK — ML demand forecasting, churn prediction, credit risk scoring. Codeworth from £750. MAPE < 10%, AUC > 0.90. Real results: -34% excess stock, -31% churn.",
    keyword: "predictive analytics company UK",
    features: [
      { title: "Demand Forecasting & Inventory Management", description: "XGBoost + Prophet per SKU × store, nightly Airflow DAG. Case: StockSense — excess inventory -34%, write-offs -41%, MAPE 8.3% vs 27% baseline." },
      { title: "Churn Prediction & Customer Retention", description: "XGBoost on 40+ behavioural features, SHAP explanations of churn reasons. Case: RetainIQ — churn from 8.4% to 5.8% (-31%), MRR retention +£1,050/month." },
      { title: "Revenue Forecasting & Financial Planning", description: "Model ensemble with scenario modelling (base / optimistic / pessimistic), 90-day rolling forecast. MAPE accuracy 5–8% for SaaS businesses." },
      { title: "Credit Risk Scoring", description: "LightGBM with 50+ features, SHAP for explainability (FCA UK requirements), appeals workflow. AUC 0.92–0.97 for UK SME lending." },
      { title: "Predictive Maintenance", description: "LSTM + IoT sensor data: equipment failure prediction 24–72 hours ahead. Case: unplanned downtime -73%, maintenance costs -28%." },
      { title: "Lead Scoring & Sales Prioritisation", description: "Gradient Boosting on CRM data: conversion probability, optimal contact time, LTV estimation. Sales team efficiency +34%, conversion rate +22%." },
    ],
    includes: [
      "Data audit: quality, completeness, feature importance, achievable accuracy forecast",
      "Feature engineering (time series, behavioural features, external data)",
      "Ensemble model training with hyperparameter tuning (Optuna)",
      "SHAP explanations for interpretable AI (regulatory requirements)",
      "REST API endpoint for integration into your stack",
      "Analytics dashboard with forecasts and confidence intervals",
      "MLOps: drift monitoring + auto-retraining (Airflow DAG)",
    ],
    packages: [
      {
        name: "Analytics PoC",
        price: "from £750",
        desc: "First forecasting model trained on your data",
        features: ["XGBoost / LightGBM / Prophet", "Data audit and preparation", "Hyperparameter tuning", "REST API endpoint", "SHAP explanations + Jupyter report", "1 month support"],
        highlight: false,
      },
      {
        name: "Analytics Production",
        price: "from £1,500",
        desc: "Production forecasting system with MLOps",
        features: ["Model ensemble (XGB + LSTM + Prophet)", "Scenario modelling (base/pessimistic/optimistic)", "React dashboard + confidence intervals", "ERP / BI system integration", "MLOps: Airflow DAG + drift monitoring", "3 months support + quarterly review"],
        highlight: true,
      },
      {
        name: "Analytics Platform",
        price: "on request",
        desc: "Enterprise forecasting platform",
        features: ["5+ predictive models", "Real-time streaming predictions", "External data (market, weather, geodata)", "Feature store (Redis / Feast)", "C-level BI dashboard", "Quarterly ML roadmap"],
        highlight: false,
      },
    ],
    faq: [
      { q: "How is predictive analytics different from BI and reporting?", a: "BI and reporting — what happened in the past (backward-looking). Predictive analytics — what will happen next (forward-looking). BI shows: sales dropped 15% last quarter. ML forecast shows: next quarter 23% of customers are at churn risk — here's the list, here are the reasons (SHAP)." },
      { q: "How accurate is demand forecasting?", a: "MAPE 5–12% on typical retail tasks (120 stores, 5,000 SKUs, 3 years of history). Seasonal adjustment included. For FMCG with volatile demand — MAPE 12–18%. Compared to manual forecasting (MAPE 25–40%) — a significant improvement even in complex categories." },
      { q: "How much data do I need for predictive analytics?", a: "Demand forecasting: minimum 12–18 months of per-SKU sales data. Churn prediction: from 3,000 customer records with 6+ months of history. Credit risk: from 2,000 issued loans with known outcomes. Less data → transfer learning and feature engineering to compensate." },
      { q: "Do you provide SHAP explanations for credit scoring (FCA UK)?", a: "Yes — this is a mandatory requirement for FCA-regulated lending. SHAP provides a per-feature explanation for each decision: which features most influenced a rejection. Appeals workflow with human-in-the-loop review. Consumer Duty 2023 compliance is built into the architecture from day one." },
      { q: "How much does ML demand forecasting cost for UK retail?", a: "PoC (basic forecast model, 1 product category, REST API): from £750. Production system (all SKUs × stores, Airflow DAG, BI integration): from £1,500. Typical ROI for a 120-store chain: -34% excess stock = £100K+/year." },
    ],
    beforeAfter: [
      { metric: "Demand forecast error (MAPE)", before: "27% (manual forecast)", after: "8.3% (XGBoost + Prophet)", improvement: "−69%" },
      { metric: "Excess warehouse stock", before: "baseline", after: "−34%", improvement: "−34%" },
      { metric: "Customer churn rate", before: "8.4% / month", after: "5.8% / month", improvement: "−31%" },
      { metric: "Unplanned equipment downtime", before: "47 h / month", after: "12.7 h / month", improvement: "−73%" },
    ],
    processSteps: [
      { step: 1, title: "Data Audit (1 week)", description: "We assess data quality, volume and completeness. We define the ML task (classification / regression / time series), forecast MAPE / AUC." },
      { step: 2, title: "PoC (1–2 weeks)", description: "We train the first model version on real data. We measure MAPE / AUC / lift. You decide based on facts, not promises." },
      { step: 3, title: "Production ML (3–7 weeks)", description: "Model ensemble, scenario modelling, React dashboard, ERP/BI integration, MLOps setup." },
      { step: 4, title: "MLOps & Monitoring", description: "Airflow DAG for auto-retraining, drift monitoring, monthly accuracy report, quarterly model review." },
    ],
    caseStudies: [
      { client: "StockSense", niche: "Retail (120 stores)", result: "Demand forecasting XGBoost + Prophet: MAPE 8.3% vs 27%, excess stock -34%, write-offs -41%.", metric: "−34%" },
      { client: "RetainIQ", niche: "B2B SaaS (HR Automation)", result: "Churn prediction (XGBoost, 40+ features): churn -31%, MRR retention +£1,050/month.", metric: "−31%" },
      { client: "EquipSense", niche: "Manufacturing / IoT", result: "Predictive maintenance (LSTM + sensor data): downtime -73%, maintenance costs -28%.", metric: "−73%" },
    ],
    useCases: [
      { niche: "Retail & FMCG", emoji: "🛒", description: "Demand forecasting per SKU × location, automated reorder points, write-off reduction" },
      { niche: "SaaS & Subscriptions", emoji: "💻", description: "Churn prediction (AUC > 0.90), LTV estimation, revenue forecasting with confidence intervals" },
      { niche: "Finance & FinTech", emoji: "💰", description: "Credit risk scoring (SHAP, FCA UK), fraud propensity, default probability" },
      { niche: "Manufacturing / IoT", emoji: "🏭", description: "Predictive maintenance: failure prediction 24–72 h ahead, service team optimisation" },
      { niche: "Energy", emoji: "⚡", description: "Consumption forecasting, renewable output balancing, energy procurement optimisation" },
      { niche: "B2B Sales", emoji: "📈", description: "Lead scoring, deal win probability, optimal contact time, pipeline forecasting" },
    ],
  },
};

export function getServiceLocalized(slug: string, lang: string): Service | undefined {
  const s = SERVICES_DATA.find((s) => s.slug === slug);
  if (!s) return undefined;
  if (lang === "en" && SERVICES_EN[slug]) {
    return { ...s, ...SERVICES_EN[slug] } as Service;
  }
  return s;
}
