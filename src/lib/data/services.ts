import { TrendingUp, Brain } from "lucide-react";

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
    metaDescription: "Штучний інтелект для бізнесу в Україні. GPT-боти, RAG, NLP, комп'ютерний зір, GenAI. Codeworth від 15 000 грн. Реальні кейси: -68% навантаження на підтримку, -96% пропущених дефектів.",
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
        price: "від 15 000 грн",
        desc: "GPT-бот для сайту або Telegram",
        features: ["GPT-4o / Claude 3.5 Sonnet", "До 200 документів у RAG", "Telegram або iframe на сайт", "Fallback на менеджера при невпевненості", "Аналітика запитів (дашборд)", "1 міс. підтримки"],
        highlight: false,
      },
      {
        name: "RAG Solution",
        price: "від 40 000 грн",
        desc: "AI навчений на вашому контенті",
        features: ["RAG-пайплайн (LangChain + Qdrant)", "До 10 000 документів / сторінок", "Мультимодальні джерела (PDF, web, DB)", "API + інтеграція у будь-який канал", "Дашборд аналітики + intent analytics", "3 міс. підтримки + щомісячна оптимізація"],
        highlight: true,
      },
      {
        name: "Computer Vision / NLP",
        price: "від 50 000 грн",
        desc: "CV або NLP-система корпоративного рівня",
        features: ["YOLOv8 / BERT / CLIP моделі", "Навчання на ваших даних (custom dataset)", "Real-time inference endpoint (< 100ms)", "React-дашборд з аналітикою та алертами", "MLOps моніторинг якості моделі", "Edge або хмарний деплой (NVIDIA Jetson / AWS)"],
        highlight: false,
      },
    ],
    faq: [
      { q: "Для якого бізнесу підходить AI?", a: "Для будь-якого, де є повторювані задачі: підтримка клієнтів, класифікація заявок, аналіз текстів, скринінг документів, контроль якості на виробництві, генерація контенту в масштабі." },
      { q: "Скільки коштує GPT-бот для сайту?", a: "Базовий RAG-бот з 200 документами у базі — від 15 000 грн. Корпоративний RAG-пайплайн до 10 000 документів з дашбордом аналітики — від 40 000 грн. CV або NLP-система — від 50 000 грн." },
      { q: "Чи буде бот «галюцинувати»?", a: "З RAG — ні. Бот відповідає лише на основі вашого контенту (вектори у Qdrant). Якщо відповіді немає в базі — відповідає 'не знаю' або переключає на менеджера. Ніяких вигаданих фактів." },
      { q: "Чи підтримуєте після запуску?", a: "Так. Усі пакети включають підтримку (1–3 міс.). Після — monthly retainer від 5 000 грн: моніторинг якості, оновлення бази знань, оптимізація промптів, alert при деградації точності." },
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
    priceFrom: "15 000 грн",
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
    metaDescription: "Machine Learning для бізнесу в Україні. Fraud detection, прогноз відтоку, рекомендації, MLOps. Codeworth від 30 000 грн. Реальні кейси: -97% fraud, +176% CTR рекомендацій, -34% залишків.",
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
        price: "від 30 000 грн",
        desc: "Аудит даних + перша ML-модель",
        features: ["Аудит якості та підготовка даних", "Базова модель (XGBoost / LightGBM)", "Hyperparameter tuning + валідація", "REST API endpoint", "Jupyter-звіт з поясненням результатів (SHAP)", "1 міс. підтримки"],
        highlight: false,
      },
      {
        name: "ML Production",
        price: "від 60 000 грн",
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
      { q: "Скільки коштує ML-система для автоматизації підтримки клієнтів?", a: "Базова класифікація тікетів (fine-tuned BERT, Zendesk integration, до 5 категорій): від 25 000 грн. Повна система (14+ категорій, priority scoring, assignee routing, GPT-4o draft responses, auto-response для типових запитів): від 60 000 грн. Економія для B2B SaaS на 1 200 тікетів/тиждень: −65% часу тріажу, SLA compliance з 67% до 95%+." },
      { q: "Коли ML краще, ніж ручні правила (rule-based logic)?", a: "Правила добре працюють, коли логіка стабільна і однозначна (наприклад, 'якщо сума > 50 000 — запит у перевірку'). ML перевершує правила, коли: (1) факторів багато і їх взаємодія нелінійна (fraud має 50+ ознак); (2) розподіл даних постійно змінюється (нові схеми шахрайства, нові категорії клієнтів); (3) правил стає >50 і вони починають суперечити одне одному; (4) потрібна персоналізація на рівні кожного клієнта (рекомендації, dynamic pricing). Практичне правило: якщо ваш аналітик не може пояснити рішення менше ніж 10 умовами — час для ML." },
    ],
    deliveryTime: "4–12 тижнів",
    priceFrom: "30 000 грн",
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
};

export function getServiceLocalized(slug: string, lang: string): Service | undefined {
  const s = SERVICES_DATA.find((s) => s.slug === slug);
  if (!s) return undefined;
  if (lang === "en" && SERVICES_EN[slug]) {
    return { ...s, ...SERVICES_EN[slug] } as Service;
  }
  return s;
}
