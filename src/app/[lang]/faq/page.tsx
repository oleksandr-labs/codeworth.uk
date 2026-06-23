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
