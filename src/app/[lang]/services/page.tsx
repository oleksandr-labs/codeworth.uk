import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { CTASection } from "@/components/home/CTASection";
import { SERVICES_DATA, getServiceLocalized } from "@/lib/data/services";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ArrowRight, CheckCircle, Clock, Users, Star } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk
      ? "ML та AI послуги для бізнесу | NLP, CV, MLOps, LLM, Предиктивна аналітика | Codeworth"
      : "ML & AI Services UK | NLP, Computer Vision, MLOps, LLM & RAG, Predictive Analytics | Codeworth",
    description: isUk
      ? "NLP-розробка, комп'ютерний зір, MLOps, LLM та RAG, предиктивна аналітика, кастомні ML-моделі. Codeworth — ML-консалтинг UK та EU. Від PoC до продакшну."
      : "NLP development, computer vision, MLOps, LLM & RAG, predictive analytics and custom ML models — UK consultancy from PoC to production. Free discovery call.",
    alternates: buildAlternates(lang, 'services'),
    openGraph: {
      title: isUk ? "ML та AI послуги — Codeworth" : "ML & AI Services — Codeworth",
      description: isUk
        ? "NLP, комп'ютерний зір, MLOps, LLM & RAG, предиктивна аналітика та кастомні ML-моделі від Codeworth."
        : "NLP, computer vision, MLOps, LLM & RAG, predictive analytics and custom ML models by Codeworth.",
      type: "website",
      url: `https://codeworth.uk/${lang}/services`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: isUk ? "ML-послуги Codeworth" : "Codeworth ML Services" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isUk ? "ML-послуги — Codeworth" : "ML Services — Codeworth",
      description: isUk ? "Fraud detection, NLP, MLOps та комп'ютерний зір від Codeworth." : "Fraud detection, NLP, MLOps and computer vision by Codeworth.",
      images: ["/opengraph-image"],
    },
  };
}

const SERVICES_FAQ_EN = [
  {
    q: "What ML services does Codeworth offer?",
    a: "We specialise in end-to-end ML development: custom predictive models, fraud detection systems, NLP pipelines, RAG chatbots, computer vision, and MLOps infrastructure. Every engagement covers discovery, data engineering, training, deployment, and monitoring.",
  },
  {
    q: "What is the difference between your AI and ML services?",
    a: "Our Artificial Intelligence service focuses on LLM-powered products — RAG chatbots, document extraction, GenAI pipelines. Our Machine Learning service builds classical and deep learning models — predictive analytics, fraud scoring, churn prevention, CV systems. Both share the same MLOps foundation.",
  },
  {
    q: "How long does a typical ML project take?",
    a: "A proof of concept runs 3–6 weeks. A full production deployment with monitoring takes 8–16 weeks. Timeline depends on data availability, complexity, and how much labelled data already exists.",
  },
  {
    q: "Do you provide ongoing model maintenance after launch?",
    a: "Yes. All projects include 3 months of warranty support. We also offer MLOps retainer packages for continuous drift monitoring, automatic retraining, and model versioning — so your model stays accurate as data changes.",
  },
  {
    q: "Can you work with our existing data infrastructure?",
    a: "Yes. We integrate with your existing data warehouse, cloud storage, or on-prem servers. We have experience with AWS, GCP, Azure, Snowflake, BigQuery, and most SQL/NoSQL databases.",
  },
];

const SERVICES_FAQ_UK = [
  {
    q: "Які ML-послуги надає Codeworth?",
    a: "Ми спеціалізуємось на повному циклі ML-розробки: кастомні предиктивні моделі, fraud detection, NLP-пайплайни, RAG-чатботи, комп'ютерний зір та MLOps-інфраструктура. Кожен проєкт охоплює discovery, data engineering, тренування, деплой та моніторинг.",
  },
  {
    q: "Яка різниця між AI та ML-послугами?",
    a: "Послуга штучного інтелекту фокусується на LLM-продуктах — RAG-чатботи, вилучення даних з документів, GenAI-пайплайни. Послуга машинного навчання будує класичні та deep learning моделі — предиктивна аналітика, fraud scoring, churn prevention, CV-системи. Обидва сервіси базуються на єдиному MLOps-фундаменті.",
  },
  {
    q: "Скільки часу займає типовий ML-проєкт?",
    a: "Proof of concept — 3–6 тижнів. Повний продакшн-деплой з моніторингом — 8–16 тижнів. Терміни залежать від наявності даних, складності задачі та кількості вже розміченого датасету.",
  },
  {
    q: "Ви підтримуєте модель після запуску?",
    a: "Так. Всі проєкти включають 3 місяці гарантійної підтримки. Ми також пропонуємо MLOps-ретейнери для безперервного моніторингу дрейфу, автоматичного перенавчання та версіонування моделей.",
  },
  {
    q: "Чи можете ви інтегруватися з нашою існуючою інфраструктурою?",
    a: "Так. Ми інтегруємося з вашим data warehouse, хмарним сховищем або on-prem серверами. Маємо досвід з AWS, GCP, Azure, Snowflake, BigQuery та більшістю SQL/NoSQL баз даних.",
  },
];

const PROCESS_STEPS_EN = [
  { num: "01", title: "Discovery", desc: "Free call to understand your problem, goals, data availability, and success metrics." },
  { num: "02", title: "Data Audit", desc: "We assess your data quality, volume, and labelling needs. Define the ML approach and timeline." },
  { num: "03", title: "Model Training", desc: "Iterative model development with MLflow experiment tracking. Regular progress updates." },
  { num: "04", title: "Production Deploy", desc: "FastAPI serving, Docker/Kubernetes packaging, CI/CD pipeline setup. Staging validation." },
  { num: "05", title: "MLOps & Monitor", desc: "Drift detection, performance dashboards, automatic retraining triggers, documentation handover." },
];

const PROCESS_STEPS_UK = [
  { num: "01", title: "Discovery", desc: "Безкоштовний дзвінок для розуміння задачі, цілей, наявних даних та метрик успіху." },
  { num: "02", title: "Аудит даних", desc: "Оцінюємо якість, обсяг та потреби в розмітці. Визначаємо ML-підхід та терміни." },
  { num: "03", title: "Навчання моделі", desc: "Ітераційна розробка моделі з MLflow-трекінгом. Регулярні звіти прогресу." },
  { num: "04", title: "Деплой", desc: "FastAPI-сервінг, Docker/Kubernetes-пакування, CI/CD-пайплайн. Валідація на staging." },
  { num: "05", title: "MLOps", desc: "Детекція дрейфу, дашборди точності, тригери перенавчання, передача документації." },
];

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isUk = lang === "uk";
  const PROCESS_STEPS = isUk ? PROCESS_STEPS_UK : PROCESS_STEPS_EN;
  const faqItems = isUk ? SERVICES_FAQ_UK : SERVICES_FAQ_EN;

  const servicesItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isUk ? "ML-послуги Codeworth" : "Codeworth ML Services",
    url: `https://codeworth.uk/${lang}/services`,
    itemListElement: SERVICES_DATA.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      url: `https://codeworth.uk/${lang}/services/${s.slug}`,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesItemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-20 gradient-hero relative overflow-hidden">
          <div className="absolute -top-32 right-0 w-125 h-125 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
          <Container className="relative">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-4">
                {isUk ? "Послуги" : "Services"}
              </p>
              <h1 className="text-5xl lg:text-6xl font-heading font-extrabold text-neutral-900 dark:text-white mb-6 leading-tight">
                {isUk
                  ? <>{`ML-послуги`}<br /><span className="gradient-text">{`для бізнесу`}</span></>
                  : <>{"ML services"}<br /><span className="gradient-text">{"for business"}</span></>}
              </h1>
              <p className="text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-2xl mb-8">
                {isUk
                  ? "Від аудиту даних та proof of concept до продакшн-деплою та MLOps-моніторингу. Всі ML-послуги — в одному місці."
                  : "From data audit and proof of concept to production deployment and MLOps monitoring. All ML services in one place."}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-indigo-600 to-indigo-700 text-white font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5">
                  {isUk ? "Обговорити проєкт" : "Discuss a Project"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href={`/${lang}/portfolio`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold hover:border-indigo-200 hover:text-indigo-700 hover:bg-indigo-50 transition-all">
                  {isUk ? "Приклади ML-проєктів" : "ML Portfolio"}
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Stats */}
        <section className="py-10 bg-white dark:bg-neutral-800 border-y border-neutral-100 dark:border-neutral-700">
          <Container>
            <div className="flex flex-wrap items-center justify-center gap-12">
              {[
                { icon: CheckCircle, end: 40, suffix: "+", label: isUk ? "ML-моделей" : "ML Models", isStatic: false },
                { icon: Users, end: 12, suffix: "+", label: isUk ? "Галузей" : "Industries", isStatic: false },
                { icon: Star, end: 92, suffix: "%", label: isUk ? "Середній F1 Score" : "Avg F1 Score", isStatic: false },
                { icon: Clock, end: 4, suffix: "+", label: isUk ? "Роки в ML" : "Years in ML", isStatic: false },
              ].map(({ icon: Icon, end, suffix, label, isStatic }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-sans font-extrabold tabular-nums tracking-tight text-neutral-900 dark:text-white">
                      {isStatic ? suffix : <CountUp end={end} suffix={suffix} />}
                    </div>
                    <div className="text-xs text-neutral-400">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Services Grid */}
        <section className="py-24 bg-white dark:bg-neutral-950">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
                {isUk ? "Що ми робимо" : "What We Do"}
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400">
                {isUk ? "Натисніть на послугу, щоб дізнатися більше." : "Click on a service to learn more."}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {SERVICES_DATA.map((rawService) => {
                const service = getServiceLocalized(rawService.slug, lang) ?? rawService;
                const Icon = service.icon;
                return (
                  <Link
                    key={service.slug}
                    href={`/${lang}/services/${service.slug}`}
                    className="group p-8 rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${service.bg}`}>
                      <Icon className={`w-7 h-7 ${service.iconColor}`} />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-neutral-900 dark:text-white mb-2 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">
                      {service.shortTitle}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-5">{service.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-indigo-600 font-semibold">{isUk ? `від ${service.priceFrom}` : `from ${service.priceFrom}`}</span>
                      <span className="flex items-center gap-1 text-indigo-600 font-medium">
                        {isUk ? "Детальніше" : "Learn more"} <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Process */}
        <section className="py-24 bg-neutral-50 dark:bg-neutral-900">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-16">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                {isUk ? "Процес" : "Process"}
              </p>
              <h2 className="text-4xl font-heading font-extrabold text-neutral-900 dark:text-white">
                {isUk ? "Як ми працюємо" : "How We Work"}
              </h2>
              <p className="mt-3 text-neutral-500 dark:text-neutral-400">
                {isUk ? "5 кроків від ідеї до задеплоєної ML-моделі в продакшені." : "5 steps from idea to a deployed ML model in production."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className="relative">
                  <div className="p-5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 text-center h-full">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-600 to-indigo-800 text-white font-heading font-bold flex items-center justify-center mx-auto mb-3 shadow-md shadow-indigo-500/25 text-sm">
                      {step.num}
                    </div>
                    <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-1 text-sm">{step.title}</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{step.desc}</p>
                  </div>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-10 -right-2 z-10 text-neutral-300 text-lg">›</div>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-white dark:bg-neutral-800 border-t border-neutral-100 dark:border-neutral-700">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">FAQ</p>
              <h2 className="text-4xl font-heading font-extrabold text-neutral-900 dark:text-white">
                {isUk ? "Часті питання про ML-послуги" : "Frequently Asked Questions"}
              </h2>
              <p className="mt-4 text-neutral-500 dark:text-neutral-400">
                {isUk
                  ? "Все, що варто знати перед початком ML-проєкту."
                  : "Everything worth knowing before starting an ML project."}
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqItems.map((item) => (
                <div key={item.q} className="p-6 rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
                  <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-2">{item.q}</h3>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <TestimonialsSection />
        <CTASection lang={lang} />
      </main>
      <Footer />
    </div>
  );
}
