import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { FAQContent } from "@/components/faq/FAQContent";
import { CTASection } from "@/components/home/CTASection";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk
      ? "FAQ — Часті питання про ML/AI | Codeworth"
      : "FAQ — Frequently Asked Questions about ML/AI | Codeworth",
    description: isUk
      ? "Відповіді на популярні питання про ML-розробку, вартість проєктів, дані, конфіденційність, MLOps та підтримку моделей. Codeworth ML-консалтинг."
      : "Answers to common questions about ML development, project costs, data, privacy, MLOps and model support. Codeworth ML consultancy.",
    alternates: buildAlternates(lang, "faq"),
    openGraph: {
      title: isUk ? "FAQ — Codeworth ML" : "FAQ — Codeworth ML",
      description: isUk
        ? "Відповіді на питання про ML-розробку, ціни, дані та підтримку моделей."
        : "Answers about ML development, pricing, data, and model support.",
      type: "website",
      url: `https://codeworth.uk/${lang}/faq`,
      images: [{ url: "/og/faq.png", width: 1200, height: 630, alt: "FAQ — Codeworth" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "FAQ — Codeworth",
      description: isUk ? "Відповіді на питання про ML/AI від Codeworth." : "Answers about ML/AI from Codeworth.",
      images: ["/og/faq.png"],
    },
  };
}

const FAQ_SECTIONS_EN = [
  {
    id: "general",
    title: "General",
    items: [
      {
        q: "What does Codeworth do?",
        a: "Codeworth is an ML/AI consultancy. We build custom machine learning models, fraud detection systems, NLP pipelines, RAG chatbots, and computer vision solutions — then deploy them to production with full MLOps infrastructure.",
      },
      {
        q: "Which industries do you work with?",
        a: "Our main sectors are FinTech (fraud detection, credit scoring), Healthcare (clinical NLP, triage automation), Retail (demand forecasting, recommendation engines), Manufacturing (quality control CV), and SaaS (churn prediction, LLM features).",
      },
      {
        q: "Where are you based? Do you work remotely?",
        a: "We are a UK-based ML consultancy serving clients in the UK, EU, and globally. All collaboration happens remotely via Zoom, Slack, Notion, and GitHub.",
      },
      {
        q: "Can I see examples of your ML work?",
        a: "Yes — our portfolio has 40+ ML case studies. Each case shows the business problem, data used, ML approach, metrics achieved (F1, precision, recall, ROI), and the MLOps setup.",
      },
    ],
  },
  {
    id: "ml-process",
    title: "ML Process",
    items: [
      {
        q: "What does a typical ML project look like?",
        a: "Every project follows five phases: (1) Discovery — understand the business problem and data availability; (2) Data Audit — assess quality, labelling needs, and gaps; (3) Model Training — iterative experiments with MLflow tracking; (4) Production Deploy — FastAPI serving, Docker/K8s packaging, CI/CD; (5) MLOps — drift monitoring, automatic retraining, documentation handover.",
      },
      {
        q: "How long does an ML project take?",
        a: "A proof of concept runs 3–6 weeks. A full production deployment with monitoring takes 8–16 weeks. The primary variable is data readiness — projects where you already have labelled data move significantly faster.",
      },
      {
        q: "What metrics do you guarantee?",
        a: "We specify minimum acceptance metrics in the project spec before starting (e.g. precision ≥ 0.90, recall ≥ 0.85, AUC ≥ 0.92). The model is considered production-ready only when it meets those thresholds. If it doesn't — we keep training at no extra charge.",
      },
      {
        q: "Do you do the data labelling too?",
        a: "Yes — we can manage the labelling process using Label Studio, Prodigy, or third-party annotators. Labelling costs are estimated separately based on dataset size and annotation complexity.",
      },
      {
        q: "What happens after the model is deployed?",
        a: "We hand over all code, model artefacts, API specs, MLflow configuration, and documentation. We also offer ongoing MLOps retainer packages for drift monitoring, automatic retraining, and version management.",
      },
    ],
  },
  {
    id: "data-privacy",
    title: "Data & Privacy",
    items: [
      {
        q: "Do you need access to our production data?",
        a: "Not necessarily. We can work with anonymised or synthetic data for development and use real data only for final validation. For sensitive sectors (healthcare, finance) we support on-prem compute so data never leaves your infrastructure.",
      },
      {
        q: "How do you handle GDPR compliance?",
        a: "We sign a Data Processing Agreement (DPA) before any data exchange. Training data is stored only as long as needed. On-prem deployments are available for maximum data sovereignty. We document all data flows for your compliance records.",
      },
      {
        q: "Can the model run on our own servers (on-prem)?",
        a: "Yes. We support on-prem, private cloud (AWS/GCP/Azure VPC), and hybrid deployments. For regulated sectors this is often the preferred option — your data and model weights never leave your environment.",
      },
      {
        q: "Who owns the model and code after delivery?",
        a: "You do. After full payment all code, model artefacts, training notebooks, and MLflow experiment logs transfer to you. We retain the right to mention the project type in our portfolio (without client data).",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing",
    items: [
      {
        q: "How much does ML development cost?",
        a: "A proof of concept starts at £1,800 (3–4 weeks). A full production model with API and MLOps monitoring starts at £4,500 (8–12 weeks). Enterprise multi-model systems are priced individually after a discovery call.",
      },
      {
        q: "What payment terms do you offer?",
        a: "50% upfront after signing the contract, 50% on final delivery. For larger engagements we can split into three milestones: 30% / 40% / 30% aligned to discovery, prototype approval, and production deploy.",
      },
      {
        q: "Is there a cheaper way to start?",
        a: "Yes — our Proof of Concept package (£1,800) is designed exactly for this. You get a working prototype with documented performance metrics. Most clients use it to validate the ML approach before committing to a full production build.",
      },
      {
        q: "Do you offer ongoing maintenance pricing?",
        a: "Yes — MLOps retainer packages start at £800/month. They include drift monitoring, automatic retraining triggers, monthly performance reports, and up to 4 hours of model updates.",
      },
    ],
  },
  {
    id: "compliance",
    title: "Compliance & Regulation",
    items: [
      {
        q: "What is FCA SS1/23 and why does it matter for ML?",
        a: "FCA SS1/23 is the Financial Conduct Authority's Supervisory Statement on Model Risk Management published in 2023. It sets out expectations for UK financial firms on model governance, validation, documentation, and ongoing monitoring. Any ML model used for credit decisions, insurance pricing, or trading at a regulated firm must comply. Codeworth delivers model documentation packages meeting SS1/23 requirements.",
      },
      {
        q: "Do we need a DPIA for our ML project?",
        a: "A Data Protection Impact Assessment is mandatory under UK GDPR for high-risk ML processing: large-scale profiling, systematic monitoring, or processing sensitive categories (health, financial, biometric data). Most production ML models in fintech, healthcare, and HR require a DPIA. We complete DPIAs as part of our project delivery — you receive a ready-to-submit document for your DPO.",
      },
      {
        q: "How does UK GDPR Article 22 affect ML systems?",
        a: "UK GDPR Article 22 gives individuals the right not to be subject to solely automated decisions with significant effects (loan refusal, insurance denial, hiring rejection). You must provide: a human review option, meaningful explanation of the decision, and ability to contest it. Codeworth builds explanation modules and human review workflows into every regulated ML system.",
      },
      {
        q: "What is Consumer Duty and how does it affect ML?",
        a: "FCA Consumer Duty (July 2023) requires financial firms to demonstrate good customer outcomes. ML models used for pricing, product selection, or customer communications must be shown not to harm retail customers — including vulnerable customers. Codeworth conducts Consumer Duty impact assessments for ML systems and documents outcomes monitoring frameworks.",
      },
      {
        q: "How do you ensure ML models are not biased against protected characteristics?",
        a: "We run disaggregated performance analysis across UK Equality Act protected characteristics (or proxies), apply SHAP fairness analysis to detect proxy discrimination, and document our bias testing methodology in the model card. For FCA-regulated models, we follow the FCA's fairness in financial services ML guidance.",
      },
    ],
  },
  {
    id: "technology",
    title: "Technology & Integration",
    items: [
      {
        q: "What cloud platforms do you work with?",
        a: "We are cloud-agnostic: AWS (primary — SageMaker, Lambda, RDS, S3), Microsoft Azure (Azure ML, Cognitive Services, Cosmos DB), Google Cloud (Vertex AI, BigQuery, Cloud Run). For UK regulated industries requiring data residency, we deploy to AWS eu-west-2 (London) or Azure UK South. We also support on-premises deployment for NHS and defence clients.",
      },
      {
        q: "Can your ML integrate with our existing software?",
        a: "Yes. We integrate with CRM (Salesforce, HubSpot, Dynamics 365), ERP (SAP S/4HANA, Oracle ERP Cloud, Sage), data warehouses (Snowflake, BigQuery, Redshift, Azure Synapse), and business applications via REST APIs, webhooks, or native connectors. We document all integration points in technical architecture specifications.",
      },
      {
        q: "What is your standard ML tech stack?",
        a: "Python 3.12, scikit-learn, PyTorch or TensorFlow, FastAPI for model serving, MLflow for experiment tracking, Airflow for pipeline orchestration, Docker and Kubernetes for deployment, Great Expectations for data quality. We adapt the stack to your existing infrastructure — if you're invested in Azure, we use Azure ML and Databricks rather than AWS.",
      },
      {
        q: "How long does it take to deploy a production ML model?",
        a: "PoC: 3-6 weeks. Production build: 8-16 weeks. Full MLOps pipeline including monitoring and retraining: add 2-4 weeks. Timeline depends on data readiness, integration complexity, and regulatory documentation requirements. NHS and FCA-regulated projects add 2-4 weeks for compliance documentation and review.",
      },
      {
        q: "Do you provide model documentation and handover?",
        a: "Yes. Every production ML delivery includes: model card (intended use, performance metrics, limitations, training data description), technical architecture diagram, API documentation, MLOps runbook, and FCA-compliant model risk register entry. We also provide 4 weeks of hypercare support after go-live and optional ongoing MLOps retainer from £800/month.",
      },
    ],
  },
  {
    id: "support",
    title: "Support",
    items: [
      {
        q: "What warranty do you provide?",
        a: "All projects include 3 months of warranty support after production deployment. If the model performance drops below the agreed thresholds for reasons within our scope — we fix it at no extra cost.",
      },
      {
        q: "How does ongoing support work?",
        a: "Via Slack or email — we respond within 4 business hours. For critical production issues (model down, serving errors) we target a 2-hour response and same-day resolution.",
      },
      {
        q: "Can your team train our in-house data scientists?",
        a: "Yes. We offer knowledge transfer sessions covering model architecture decisions, MLflow setup, deployment configuration, and monitoring dashboards. We also provide annotated notebooks and written runbooks.",
      },
      {
        q: "What if our data distribution changes significantly after deployment?",
        a: "This is called concept drift — it's expected and normal. Our MLOps setup monitors data and model performance metrics continuously and alerts you when drift exceeds a threshold. The MLOps retainer includes automatic retraining triggers for this scenario.",
      },
    ],
  },
];

const FAQ_SECTIONS_UK = [
  {
    id: "general",
    title: "Загальні питання",
    items: [
      {
        q: "Що робить Codeworth?",
        a: "Codeworth — ML/AI консалтинг. Ми будуємо кастомні ML-моделі, системи fraud detection, NLP-пайплайни, RAG-чатботи та комп'ютерний зір — і деплоємо їх у продакшн із повною MLOps-інфраструктурою.",
      },
      {
        q: "З якими галузями ви працюєте?",
        a: "Основні сектори: FinTech (fraud detection, кредитний скоринг), Healthcare (клінічний NLP, автоматизація тріажу), Retail (прогнозування попиту, рекомендаційні системи), Manufacturing (комп'ютерний зір для контролю якості) та SaaS (churn prediction, LLM-фічі).",
      },
      {
        q: "Де ви знаходитесь? Чи працюєте дистанційно?",
        a: "Команда розподілена між Україною та ЄС. Клієнти — UK, ЄС та глобально. Вся комунікація — дистанційно: Zoom, Slack, Notion, GitHub.",
      },
      {
        q: "Чи є приклади ваших ML-проєктів?",
        a: "Так — у портфоліо 40+ ML-кейсів. Кожен кейс показує бізнес-задачу, дані, ML-підхід, досягнуті метрики (F1, precision, recall, ROI) та MLOps-налаштування.",
      },
    ],
  },
  {
    id: "ml-process",
    title: "ML-процес",
    items: [
      {
        q: "Як виглядає типовий ML-проєкт?",
        a: "Кожен проєкт проходить 5 фаз: (1) Discovery — розуміємо бізнес-задачу та наявність даних; (2) Data Audit — оцінюємо якість, потреби в розмітці; (3) Навчання моделі — ітераційні експерименти з MLflow; (4) Продакшн-деплой — FastAPI, Docker/K8s, CI/CD; (5) MLOps — моніторинг дрейфу, перенавчання, документація.",
      },
      {
        q: "Скільки часу займає ML-проєкт?",
        a: "Proof of concept — 3–6 тижнів. Повний продакшн-деплой з моніторингом — 8–16 тижнів. Головна змінна — готовність даних: проєкти з розміченими даними рухаються значно швидше.",
      },
      {
        q: "Які метрики ви гарантуєте?",
        a: "До початку роботи ми фіксуємо мінімальні метрики у специфікації (наприклад, precision ≥ 0.90, recall ≥ 0.85, AUC ≥ 0.92). Модель вважається готовою тільки після досягнення цих порогів. Якщо ні — продовжуємо навчання безкоштовно.",
      },
      {
        q: "Ви займаєтесь розміткою даних?",
        a: "Так — ми управляємо процесом розмітки через Label Studio, Prodigy або сторонніх анотаторів. Вартість розмітки оцінюється окремо залежно від обсягу датасету та складності анотацій.",
      },
      {
        q: "Що відбувається після деплою моделі?",
        a: "Передаємо весь код, ваги моделі, специфікацію API, конфігурацію MLflow та документацію. Також пропонуємо MLOps-ретейнери для моніторингу дрейфу, автоматичного перенавчання та версіонування.",
      },
    ],
  },
  {
    id: "data-privacy",
    title: "Дані та конфіденційність",
    items: [
      {
        q: "Вам потрібен доступ до наших виробничих даних?",
        a: "Не обов'язково. Можемо працювати з анонімізованими або синтетичними даними для розробки та реальними тільки для фінальної валідації. Для чутливих секторів (охорона здоров'я, фінанси) підтримуємо on-prem обчислення — дані не виходять з вашої інфраструктури.",
      },
      {
        q: "Як ви забезпечуєте дотримання GDPR?",
        a: "Підписуємо DPA (угоду про обробку даних) до будь-якого обміну даними. Навчальні дані зберігаються тільки на час проєкту. On-prem деплой доступний для максимального суверенітету над даними. Документуємо всі потоки даних для ваших комплаєнс-записів.",
      },
      {
        q: "Чи може модель працювати на наших серверах (on-prem)?",
        a: "Так. Підтримуємо on-prem, приватну хмару (AWS/GCP/Azure VPC) та гібридні деплої. Для регульованих секторів це часто є пріоритетним варіантом.",
      },
      {
        q: "Кому належить модель та код після здачі?",
        a: "Вам. Після повної оплати весь код, ваги моделі, навчальні ноутбуки та MLflow-логи переходять до вас. Ми залишаємо право згадати тип проєкту у портфоліо (без клієнтських даних).",
      },
    ],
  },
  {
    id: "pricing",
    title: "Ціни",
    items: [
      {
        q: "Скільки коштує ML-розробка?",
        a: "Proof of concept — від £1,800 / 75 000 ₴ (3–4 тижні). Повна продакшн-модель з API та MLOps — від £4,500 / 180 000 ₴ (8–12 тижнів). Enterprise-системи оцінюються індивідуально після discovery call.",
      },
      {
        q: "Які умови оплати?",
        a: "50% передоплата після підписання договору, 50% після здачі. Для більших проєктів можна розбити на 3 етапи: 30% / 40% / 30% відповідно до discovery, затвердження прототипу та продакшн-деплою.",
      },
      {
        q: "Чи є більш доступний старт?",
        a: "Так — наш Proof of Concept пакет (£1,800 / 75 000 ₴) саме для цього. Ви отримуєте робочий прототип з документованими метриками ефективності. Більшість клієнтів використовують його для валідації ML-підходу до повного продакшн-білду.",
      },
      {
        q: "Чи є послуги постійної підтримки?",
        a: "Так — MLOps-ретейнери від £800/місяць (32 000 ₴). Включають: моніторинг дрейфу, тригери автоматичного перенавчання, щомісячні звіти ефективності та до 4 годин оновлень моделі.",
      },
    ],
  },
  {
    id: "compliance",
    title: "Комплаєнс та регулювання",
    items: [
      {
        q: "Що таке FCA SS1/23 і чому це важливо для ML?",
        a: "FCA SS1/23 — це Supervisory Statement Управління фінансового нагляду щодо управління ризиками моделей, опублікований у 2023 році. Він встановлює вимоги для UK-фінансових компаній щодо управління моделями, валідації, документування та постійного моніторингу. Будь-яка ML-модель, що використовується для кредитних рішень, страхового ціноутворення або торгівлі у регульованій компанії, зобов'язана відповідати цим вимогам. Codeworth надає пакети документації моделей, що відповідають вимогам SS1/23.",
      },
      {
        q: "Чи потрібна нам DPIA для ML-проєкту?",
        a: "Оцінка впливу на захист даних є обов'язковою за UK GDPR для високоризикової ML-обробки: масштабне профілювання, систематичний моніторинг або обробка чутливих категорій (здоров'я, фінансові, біометричні дані). Більшість продакшн ML-моделей у фінтех, охороні здоров'я та HR потребують DPIA. Ми виконуємо DPIA в рамках доставки проєкту — ви отримуєте готовий до подання документ для вашого DPO.",
      },
      {
        q: "Як Стаття 22 UK GDPR впливає на ML-системи?",
        a: "Стаття 22 UK GDPR надає фізичним особам право не піддаватися виключно автоматизованим рішенням зі значними наслідками (відмова у кредиті, відмова у страхуванні, відхилення при найомі). Ви зобов'язані забезпечити: можливість людського перегляду, змістовне пояснення рішення та можливість його оскарження. Codeworth вбудовує модулі пояснень та робочі процеси людського перегляду у кожну регульовану ML-систему.",
      },
      {
        q: "Що таке Consumer Duty і як це впливає на ML?",
        a: "FCA Consumer Duty (липень 2023) зобов'язує фінансові компанії демонструвати добрі результати для клієнтів. ML-моделі, що використовуються для ціноутворення, відбору продуктів або комунікацій з клієнтами, мають підтверджувати відсутність шкоди роздрібним клієнтам — включно з вразливими клієнтами. Codeworth проводить оцінки впливу Consumer Duty для ML-систем і документує фреймворки моніторингу результатів.",
      },
      {
        q: "Як ви забезпечуєте відсутність упередженості ML-моделей щодо захищених характеристик?",
        a: "Ми проводимо дезагрегований аналіз продуктивності за захищеними характеристиками Закону про рівність UK (або проксі-ознаками), застосовуємо SHAP-аналіз справедливості для виявлення проксі-дискримінації та документуємо методологію тестування упередженості у картці моделі. Для FCA-регульованих моделей ми дотримуємось керівництва FCA щодо справедливості у ML для фінансових послуг.",
      },
    ],
  },
  {
    id: "technology",
    title: "Технології та інтеграція",
    items: [
      {
        q: "З якими хмарними платформами ви працюєте?",
        a: "Ми не прив'язані до конкретної хмари: AWS (основна — SageMaker, Lambda, RDS, S3), Microsoft Azure (Azure ML, Cognitive Services, Cosmos DB), Google Cloud (Vertex AI, BigQuery, Cloud Run). Для UK-регульованих галузей, що вимагають резидентності даних, розгортаємо в AWS eu-west-2 (Лондон) або Azure UK South. Також підтримуємо on-premises розгортання для NHS та оборонних клієнтів.",
      },
      {
        q: "Чи може ваш ML інтегруватися з нашим існуючим ПЗ?",
        a: "Так. Ми інтегруємося з CRM (Salesforce, HubSpot, Dynamics 365), ERP (SAP S/4HANA, Oracle ERP Cloud, Sage), сховищами даних (Snowflake, BigQuery, Redshift, Azure Synapse) та бізнес-додатками через REST API, вебхуки або нативні конектори. Усі точки інтеграції документуємо в технічних специфікаціях архітектури.",
      },
      {
        q: "Який у вас стандартний ML-стек технологій?",
        a: "Python 3.12, scikit-learn, PyTorch або TensorFlow, FastAPI для сервінгу моделей, MLflow для відстеження експериментів, Airflow для оркестрації пайплайнів, Docker і Kubernetes для розгортання, Great Expectations для якості даних. Ми адаптуємо стек до вашої існуючої інфраструктури — якщо ви інвестували в Azure, використовуємо Azure ML і Databricks замість AWS.",
      },
      {
        q: "Скільки часу займає розгортання продакшн ML-моделі?",
        a: "PoC: 3-6 тижнів. Продакшн-білд: 8-16 тижнів. Повний MLOps-пайплайн із моніторингом і перенавчанням: додати 2-4 тижні. Терміни залежать від готовності даних, складності інтеграції та вимог до комплаєнс-документації. NHS та FCA-регульовані проєкти додають 2-4 тижні на комплаєнс-документацію та перевірку.",
      },
      {
        q: "Чи надаєте ви документацію моделі та передачу?",
        a: "Так. Кожна продакшн ML-поставка включає: картку моделі (призначення, метрики продуктивності, обмеження, опис навчальних даних), діаграму технічної архітектури, документацію API, MLOps runbook та запис у реєстрі ризиків моделей, що відповідає FCA. Також надаємо 4 тижні hypercare-підтримки після запуску та опційний MLOps-ретейнер від £800/місяць.",
      },
    ],
  },
  {
    id: "support",
    title: "Підтримка",
    items: [
      {
        q: "Яка гарантія включена?",
        a: "Всі проєкти включають 3 місяці гарантійної підтримки після продакшн-деплою. Якщо показники моделі падають нижче погоджених порогів з нашої вини — виправляємо безкоштовно.",
      },
      {
        q: "Як працює поточна підтримка?",
        a: "Через Slack або email — відповідаємо протягом 4 робочих годин. Для критичних продакшн-проблем (модель не відповідає, помилки сервінгу) цільовий час відповіді — 2 години, вирішення — в той же день.",
      },
      {
        q: "Чи навчаєте ви наших data scientists?",
        a: "Так. Проводимо сесії передачі знань: архітектурні рішення, налаштування MLflow, конфігурація деплою, дашборди моніторингу. Надаємо анотовані ноутбуки та письмові runbooks.",
      },
      {
        q: "Що якщо розподіл наших даних значно зміниться після деплою?",
        a: "Це називається concept drift — очікуване і нормальне явище. Наш MLOps-стек безперервно моніторить метрики даних і моделі та сповіщає при перевищенні порогу дрейфу. MLOps-ретейнер включає тригери автоматичного перенавчання саме для цього сценарію.",
      },
    ],
  },
];

export default async function FAQPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isUk = lang === "uk";
  const FAQ_SECTIONS = isUk ? FAQ_SECTIONS_UK : FAQ_SECTIONS_EN;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isUk ? "Головна" : "Home", item: `https://codeworth.uk/${lang}` },
      { "@type": "ListItem", position: 2, name: "FAQ", item: `https://codeworth.uk/${lang}/faq` },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_SECTIONS.flatMap((section) =>
      section.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      }))
    ),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-16 gradient-hero">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-4">FAQ</p>
              <h1 className="text-5xl lg:text-6xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
                {isUk
                  ? <>{`Відповіді на ваші`}<br /><span className="gradient-text">{`ML-запитання`}</span></>
                  : <>{"Answers to your"}<br /><span className="gradient-text">{"ML questions"}</span></>}
              </h1>
              <p className="text-lg text-neutral-500 dark:text-neutral-400">
                {isUk
                  ? "Все що варто знати про ML-розробку, дані, ціни та підтримку."
                  : "Everything worth knowing about ML development, data, pricing, and support."}
              </p>
            </div>
          </Container>
        </section>

        {/* Category nav */}
        <div className="sticky top-16 z-40 bg-white dark:bg-neutral-800 border-b border-neutral-100 dark:border-neutral-700 shadow-sm">
          <Container>
            <div className="flex gap-1 overflow-x-auto py-3 no-scrollbar">
              {FAQ_SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="shrink-0 px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:bg-indigo-50 hover:text-indigo-700 transition-colors whitespace-nowrap"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </Container>
        </div>

        <section className="py-16 bg-white dark:bg-neutral-950">
          <Container>
            <FAQContent sections={FAQ_SECTIONS} />
          </Container>
        </section>

        <CTASection lang={lang} />
      </main>
      <Footer />
    </div>
  );
}
