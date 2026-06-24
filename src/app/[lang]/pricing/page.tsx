import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { CTASection } from "@/components/home/CTASection";
import { PricingContent } from "@/components/pricing/PricingContent";
import { PriceCalculator } from "@/components/pricing/PriceCalculator";
import { Shield, Clock, CreditCard } from "lucide-react";
import { PageAnalytics } from "@/components/analytics/PageAnalytics";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk
      ? "Ціни на ML/AI послуги — Codeworth | Прозорі тарифи"
      : "ML/AI Services Pricing — Codeworth | Transparent Rates",
    description: isUk
      ? "Прозорі ціни на ML-розробку: Proof of Concept від £1,800, Production-модель від £4,500. MLOps-ретейнер від £800/місяць. Без прихованих платежів."
      : "Transparent ML development pricing: Proof of Concept from £1,800, Production model from £4,500. MLOps retainer from £800/month. No hidden fees.",
    alternates: buildAlternates(lang, 'pricing'),
    openGraph: {
      title: isUk ? "ML-ціни — Codeworth" : "ML Pricing — Codeworth",
      description: isUk
        ? "PoC від £1,800, Production від £4,500, MLOps-ретейнер від £800/міс."
        : "PoC from £1,800, Production from £4,500, MLOps retainer from £800/month.",
      type: "website",
      url: `https://codeworth.uk/${lang}/pricing`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: isUk ? "ML-ціни Codeworth" : "Codeworth ML Pricing" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isUk ? "ML-ціни — Codeworth" : "ML Pricing — Codeworth",
      description: isUk ? "Прозорі ціни на ML/AI від Codeworth." : "Transparent ML/AI pricing by Codeworth.",
      images: ["/opengraph-image"],
    },
  };
}

const FAQ_UK = [
  { q: "Чи є приховані платежі?", a: "Ні. До початку роботи ми надаємо детальну специфікацію з переліком робіт та фіксованою ціною. Додаткова робота — тільки з вашого підтвердження та окремим кошторисом." },
  { q: "Яка схема оплати?", a: "50% передоплата після підписання договору, 50% після фінальної здачі. Для більших проєктів можна розбити на 3 етапи: 30% / 40% / 30% за результатами discovery, затвердження прототипу та продакшн-деплою." },
  { q: "Що входить у гарантійну підтримку?", a: "3 місяці гарантійної підтримки після продакшн-деплою включено у всі тарифи. Якщо метрики моделі падають нижче погоджених порогів з нашої вини — виправляємо безкоштовно." },
  { q: "Що таке MLOps-ретейнер?", a: "Щомісячна підписка від £800/міс, що включає: моніторинг дрейфу даних та моделі, тригери автоматичного перенавчання, щомісячний звіт ефективності та до 4 годин оновлень. Ідеально для моделей, що потребують актуальності." },
  { q: "Скільки коштує proof of concept?", a: "PoC-пакет — від £1,800 (3–4 тижні). Ви отримуєте робочий прототип моделі з документованими метриками (precision, recall, F1). Більшість клієнтів використовують PoC для валідації підходу перед повним продакшн-білдом." },
  { q: "Чи можна поставити проєкт на паузу?", a: "Так. Ми працюємо двотижневими спринтами з чіткими deliverables. Якщо бізнес-пріоритети змінюються — можна зупинитися після будь-якого спринту, і всі напрацювання передаємо вам. Відновлення не потребує додаткової плати, якщо скоуп залишається незмінним." },
  { q: "Чи працюєте ви зі стартапами до Series A?", a: "Так — PoC-пакет від £1,800 розроблено спеціально для pre-Series A стартапів у Великій Британії. Гранти Innovate UK SMART та Accelerated Knowledge Transfer можуть покрити до 70% вартості ML-проєкту. Допомагаємо з заявками на гранти безкоштовно." },
  { q: "Що, якщо модель не покаже очікуваних результатів?", a: "До старту ми узгоджуємо вимірювані критерії успіху (наприклад, AUC >80%, частота хибнопозитивних <5%). Якщо PoC не досягає погоджених порогів — надаємо аналіз першопричин та рекомендуємо альтернативи, перш ніж рухатися в продакшн. Рахунок за продакшн-розробку виставляємо лише після підтвердження успіху PoC." },
  { q: "Чи підписуєте ви NDA та угоди про обробку даних?", a: "Так. Усі проєкти покриваються NDA та Data Processing Agreement (DPA), що відповідає статті 28 UK GDPR. Ми зареєстровані в ICO (Information Commissioner's Office) як обробник даних." },
  { q: "Чи можете ви працювати з нашими існуючими ML-інструментами та хмарним провайдером?", a: "Так. Ми хмаро-агностичні (AWS, Azure, GCP) і працюємо з вашим поточним налаштуванням MLflow, SageMaker, Azure ML або Databricks. Не вимагаємо змінювати вендорів чи інструменти. Наша мета — ML-результати, а не прив'язка до нашої інфраструктури." },
];

const FAQ_EN = [
  { q: "Are there hidden fees?", a: "No. We provide a detailed specification with a complete list of deliverables and a fixed price before work begins. Additional work is only done with your approval and a separate estimate." },
  { q: "What are the payment terms?", a: "50% upfront after signing the contract, 50% upon final delivery. For larger engagements we can split into 3 milestones: 30% / 40% / 30% tied to discovery, prototype approval, and production deployment." },
  { q: "What is included in warranty support?", a: "3 months of warranty support after production deployment is included in all packages. If model performance drops below agreed thresholds due to our scope — we fix it at no extra cost." },
  { q: "What is the MLOps retainer?", a: "A monthly subscription from £800/month covering drift monitoring, automatic retraining triggers, monthly performance reports, and up to 4 hours of model updates. Ideal for models that need to stay current with changing data." },
  { q: "How much does a proof of concept cost?", a: "PoC package starts at £1,800 (3–4 weeks). You get a working model prototype with documented performance metrics (precision, recall, F1). Most clients use it to validate the ML approach before committing to a full production build." },
  { q: "Can we pause a project mid-way?", a: "Yes. We work in 2-week sprints with clear deliverables. If business priorities change, we can pause after any sprint milestone with all work-in-progress handed over. Resuming later incurs no restart fee provided scope remains the same." },
  { q: "Do you work with startups before Series A?", a: "Yes — our PoC package at £1,800 is specifically designed for pre-Series A UK startups. Innovate UK SMART and Accelerated Knowledge Transfer grants can cover up to 70% of ML project costs. We help with grant applications at no extra charge." },
  { q: "What happens if the model does not perform as expected?", a: "We agree measurable success criteria (e.g., >80% AUC, <5% false positive rate) before starting. If the PoC does not meet agreed thresholds, we provide a root cause analysis and recommend alternative approaches before proceeding to production. We do not invoice for production work until PoC success is confirmed." },
  { q: "Do you sign NDAs and data processing agreements?", a: "Yes. All engagements are covered by an NDA and a Data Processing Agreement (DPA) compliant with UK GDPR Article 28. We are registered with the ICO (Information Commissioner's Office) as a data processor." },
  { q: "Can you work with our existing ML tools and cloud provider?", a: "Yes. We are cloud-agnostic (AWS, Azure, GCP) and work with your existing MLflow, SageMaker, Azure ML, or Databricks setup. We do not require you to switch vendors or tooling. Our goal is to deliver ML outcomes, not lock you into our infrastructure." },
];

export default async function PricingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isUk = lang === "uk";
  const FAQ = isUk ? FAQ_UK : FAQ_EN;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isUk ? "Головна" : "Home", item: `https://codeworth.uk/${lang}` },
      { "@type": "ListItem", position: 2, name: isUk ? "Ціни" : "Pricing", item: `https://codeworth.uk/${lang}/pricing` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  // PriceSpecification / Offer schema for the three main development tiers
  const offersSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isUk ? "ML/AI послуги — Codeworth" : "ML/AI Services — Codeworth",
    provider: { "@type": "Organization", name: "Codeworth", url: "https://codeworth.uk" },
    url: `https://codeworth.uk/${lang}/pricing`,
    offers: [
      {
        "@type": "Offer",
        name: isUk ? "Proof of Concept" : "Proof of Concept",
        description: isUk ? "Прототип ML-моделі з документованими метриками за 3–4 тижні" : "ML model prototype with documented metrics in 3–4 weeks",
        priceCurrency: "GBP",
        price: "1800",
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/InStock",
        url: `https://codeworth.uk/${lang}/pricing`,
      },
      {
        "@type": "Offer",
        name: isUk ? "Production ML" : "Production ML",
        description: isUk ? "Повна продакшн-модель з API та MLOps-моніторингом" : "Full production model with API and MLOps monitoring",
        priceCurrency: "GBP",
        price: "4500",
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/InStock",
        url: `https://codeworth.uk/${lang}/pricing`,
      },
      {
        "@type": "Offer",
        name: "Enterprise / MLOps",
        description: isUk ? "Multi-model системи, real-time inference, повна MLOps-інфраструктура" : "Multi-model systems, real-time inference, full MLOps infrastructure",
        priceCurrency: "GBP",
        price: "0",
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/InStock",
        url: `https://codeworth.uk/${lang}/contact`,
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PageAnalytics event="pricingView" />
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offersSchema) }} />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-16 gradient-hero">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-4">
                {isUk ? "Ціни" : "Pricing"}
              </p>
              <h1 className="text-5xl lg:text-6xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
                {isUk
                  ? <>{`ML-ціни без`}<br /><span className="gradient-text">{`сюрпризів`}</span></>
                  : <>{"ML pricing —"}<br /><span className="gradient-text">{"no surprises"}</span></>}
              </h1>
              <p className="text-lg text-neutral-500 dark:text-neutral-400">
                {isUk
                  ? "Фіксована ціна, чіткі метрики якості та детальна специфікація до старту. Ніяких прихованих доплат."
                  : "Fixed price, clear quality metrics, and a detailed spec before we start. No hidden charges."}
              </p>
            </div>
          </Container>
        </section>

        {/* Trust badges */}
        <section className="py-8 bg-white dark:bg-neutral-800 border-y border-neutral-100">
          <Container>
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-neutral-600 dark:text-neutral-300">
              <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-500" /> {isUk ? "Без прихованих платежів" : "No hidden fees"}</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-indigo-500" /> {isUk ? "Гарантія метрик якості" : "Quality metrics guarantee"}</span>
              <span className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-amber-500" /> {isUk ? "50% після деплою" : "50% upon deployment"}</span>
            </div>
          </Container>
        </section>

        <PricingContent />

        <PriceCalculator />

        {/* FAQ */}
        <section className="py-24 bg-neutral-50 dark:bg-neutral-900 ">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                {isUk ? "Питання і відповіді" : "Questions & Answers"}
              </p>
              <h2 className="text-4xl font-heading font-extrabold text-neutral-900">
                {isUk ? "FAQ по цінах" : "Pricing FAQ"}
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {FAQ.map((item) => (
                <div key={item.q} className="p-6 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-100">
                  <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-2">{item.q}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <CTASection lang={lang} />
      </main>
      <Footer />
    </div>
  );
}
