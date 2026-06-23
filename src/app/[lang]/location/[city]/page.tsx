import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { GEO_CITIES, GEO_CITY_SLUGS, getCity } from "@/lib/data/geo";
import { MapPin, ArrowRight } from "lucide-react";

type Params = { lang: string; city: string };

export async function generateStaticParams() {
  const langs = ["en", "uk"];
  return langs.flatMap((lang) => GEO_CITY_SLUGS.map((city) => ({ lang, city })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang, city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) return {};
  const isUk = lang === "uk";
  const title = isUk ? city.seoTitle : city.seoTitleEn;
  const desc = isUk ? city.seoDesc : city.seoDescEn;
  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      type: "website",
      url: `https://codeworth.uk/${lang}/location/${city.slug}`,
      images: [{ url: "/og/location.png", width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, images: ["/og/location.png"] },
    alternates: buildAlternates(lang, `/location/${city.slug}`),
  };
}

const SERVICES = [
  {
    icon: "🤖",
    titleUk: "Machine Learning",
    titleEn: "Machine Learning",
    descUk: "Прогнозування відтоку, demand forecasting, fraud detection — виробничі ML-моделі від PoC до deployment",
    descEn: "Churn prediction, demand forecasting, fraud detection — production ML models from PoC to deployment",
  },
  {
    icon: "🧠",
    titleUk: "Штучний інтелект",
    titleEn: "Artificial Intelligence",
    descUk: "RAG-системи, GPT-боти, Computer Vision рішення для вашого бізнесу",
    descEn: "RAG systems, GPT bots, Computer Vision solutions tailored to your business",
  },
  {
    icon: "💬",
    titleUk: "NLP & LLM",
    titleEn: "NLP & LLM",
    descUk: "Обробка тексту, класифікація документів, sentiment analysis, аналіз контрактів",
    descEn: "Text processing, document classification, sentiment analysis, contract review automation",
  },
  {
    icon: "👁️",
    titleUk: "Computer Vision",
    titleEn: "Computer Vision",
    descUk: "Виявлення дефектів, розпізнавання об'єктів, аналіз зображень для промисловості та рітейлу",
    descEn: "Defect detection, object recognition, image analysis for manufacturing and retail",
  },
  {
    icon: "⚙️",
    titleUk: "MLOps",
    titleEn: "MLOps",
    descUk: "CI/CD для ML, model monitoring, automated retraining, drift detection у production",
    descEn: "CI/CD for ML, model monitoring, automated retraining, drift detection in production",
  },
  {
    icon: "📊",
    titleUk: "Predictive Analytics",
    titleEn: "Predictive Analytics",
    descUk: "Прогнозні аналітичні рішення для фінансів, supply chain та operational planning",
    descEn: "Predictive analytics for finance, supply chain, and operational planning",
  },
];

const WHY_US = [
  { icon: "🏛️", labelUk: "UK GDPR Compliance", labelEn: "UK GDPR Compliance", descUk: "Дані залишаються у UK. Усі рішення відповідають UK GDPR та DPA 2018", descEn: "Data stays in the UK. All solutions comply with UK GDPR and DPA 2018" },
  { icon: "⚖️", labelUk: "FCA & Регуляторне знання", labelEn: "FCA & Regulatory Knowledge", descUk: "FCA SS1/23, Consumer Duty, NHS IG Toolkit — знаємо вимоги вашої галузі", descEn: "FCA SS1/23, Consumer Duty, NHS IG Toolkit — we know your sector's requirements" },
  { icon: "🔍", labelUk: "Explainable AI", labelEn: "Explainable AI", descUk: "SHAP, LIME, counterfactual explanations — відповідаємо вимогам UK GDPR Article 22", descEn: "SHAP, LIME, counterfactual explanations — meeting UK GDPR Article 22 requirements" },
  { icon: "🌐", labelUk: "Remote-first по всьому UK", labelEn: "Remote-First Across the UK", descUk: "Повністю дистанційна робота, однакова якість deliverables у будь-якому місті UK", descEn: "Fully remote delivery, consistent quality regardless of UK location" },
  { icon: "📈", labelUk: "ROI-фокус", labelEn: "ROI-Focused", descUk: "Кожен ML-проєкт — бізнес-кейс з вимірюваним ROI. Не будуємо ML заради ML", descEn: "Every ML project starts with a business case and measurable ROI. We don't build ML for ML's sake" },
  { icon: "🔒", labelUk: "SOW та фіксований бюджет", labelEn: "SOW & Fixed Budget", descUk: "Statement of Work з чіткими deliverables, фіксованим бюджетом та milestone payments", descEn: "Statement of Work with clear deliverables, fixed budget, and milestone payments" },
];

export default async function CityPage({ params }: { params: Promise<Params> }) {
  const { lang, city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) notFound();

  const isUk = lang === "uk";
  const cityName = isUk ? city.nameUk : city.nameEn;
  const regionName = isUk ? city.region : city.regionEn;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isUk ? "Головна" : "Home", item: `https://codeworth.uk/${lang}` },
      { "@type": "ListItem", position: 2, name: isUk ? "Міста" : "Cities", item: `https://codeworth.uk/${lang}/location` },
      { "@type": "ListItem", position: 3, name: cityName },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Codeworth",
    description: isUk ? city.description : city.descriptionEn,
    url: `https://codeworth.uk/${lang}/location/${city.slug}`,
    email: "hello@codeworth.uk",
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "GB",
    },
    areaServed: { "@type": "City", name: cityName },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isUk ? "ML та AI Послуги" : "ML and AI Services",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.faq.map((item) => ({
      "@type": "Question",
      name: isUk ? item.q : item.qEn,
      acceptedAnswer: { "@type": "Answer", text: isUk ? item.a : item.aEn },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-20 bg-neutral-950 text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }}
          />
          <div className="absolute inset-0 bg-linear-to-br from-indigo-900/40 to-transparent" />
          <Container className="relative">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-8">
                <Link href={`/${lang}`} className="hover:text-white transition-colors">{isUk ? "Головна" : "Home"}</Link>
                <span>/</span>
                <Link href={`/${lang}/location`} className="hover:text-white transition-colors">{isUk ? "Міста" : "Cities"}</Link>
                <span>/</span>
                <span className="text-neutral-300">{cityName}</span>
              </nav>

              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 bg-indigo-500/20 text-indigo-300 text-sm font-medium px-3 py-1.5 rounded-full border border-indigo-500/30">
                  <MapPin className="w-3.5 h-3.5" /> {regionName}
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-heading font-extrabold mb-6 leading-tight">
                {isUk
                  ? <>{`ML та AI Консалтинг `}<span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">{`у ${cityName}`}</span></>
                  : <>{`ML and AI Consulting `}<span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">{`in ${cityName}`}</span></>}
              </h1>
              <p className="text-lg text-neutral-300 max-w-2xl mb-10">
                {isUk ? city.description : city.descriptionEn}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors"
                >
                  {isUk ? "Замовити ML-консультацію" : "Book ML Consultation"} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/${lang}/services`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-all"
                >
                  {isUk ? "Наші послуги" : "Our Services"}
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Stats */}
        <section className="py-12 bg-indigo-600">
          <Container>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {city.stats.map((stat) => (
                <div key={stat.label} className="text-center text-white">
                  <div className="text-3xl font-sans font-extrabold tabular-nums tracking-tight mb-1">{stat.value}</div>
                  <div className="text-indigo-200 text-sm">{isUk ? stat.label : stat.labelEn}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Services in city */}
        <section className="py-20 bg-white dark:bg-neutral-950">
          <Container>
            <div className="max-w-2xl mb-12">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                {isUk ? `Послуги у ${cityName}` : `Services in ${cityName}`}
              </p>
              <h2 className="text-3xl lg:text-4xl font-heading font-extrabold text-neutral-900">
                {isUk ? "ML та AI послуги для вашого бізнесу" : "ML and AI services for your business"}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s) => (
                <div key={s.titleUk} className="rounded-2xl border border-neutral-100 dark:border-neutral-700 p-6 hover:shadow-lg hover:shadow-neutral-100 transition-shadow">
                  <span className="text-3xl mb-4 block">{s.icon}</span>
                  <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-2">
                    {isUk ? s.titleUk : s.titleEn}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {isUk ? s.descUk : s.descEn}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Why us */}
        <section className="py-20 bg-neutral-50 dark:bg-neutral-900 ">
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl lg:text-4xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
                {isUk ? `Чому обирають Codeworth у ${cityName}` : `Why businesses in ${cityName} choose Codeworth`}
              </h2>
              <p className="text-neutral-500">
                {isUk
                  ? "Ми розуміємо UK-специфіку ML: від FCA compliance до NHS data requirements — будуємо ML, що реально працює в production"
                  : "We understand UK ML specifics: from FCA compliance to NHS data requirements — we build ML that actually works in production"}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {WHY_US.map((item) => (
                <div key={item.labelUk} className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-100">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <div className="font-heading font-bold text-neutral-900 dark:text-white mb-1">
                      {isUk ? item.labelUk : item.labelEn}
                    </div>
                    <p className="text-sm text-neutral-500">{isUk ? item.descUk : item.descEn}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Process */}
        <section className="py-20 bg-white dark:bg-neutral-950">
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
                {isUk ? "Як ми працюємо" : "How we work"}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { num: "01", uk: "ML Discovery", en: "ML Discovery", dUk: "Аналіз бізнес-проблеми, даних та ROI-потенціалу. Discovery Call безкоштовний.", dEn: "Business problem analysis, data assessment, and ROI potential. Discovery call is free." },
                { num: "02", uk: "PoC (2–4 тижні)", en: "PoC (2–4 weeks)", dUk: "Proof of Concept — перевіряємо feasibility ML-рішення на реальних даних.", dEn: "Proof of Concept — we verify ML feasibility on your real data." },
                { num: "03", uk: "Production Build", en: "Production Build", dUk: "Повноцінна розробка: model training, API, integration, testing. Milestones щотижня.", dEn: "Full development: model training, API, integration, testing. Weekly milestones." },
                { num: "04", uk: "MLOps & Підтримка", en: "MLOps & Support", dUk: "Deployment, monitoring, automated retraining, drift alerts. SLA-підтримка.", dEn: "Deployment, monitoring, automated retraining, drift alerts. SLA support." },
              ].map((step) => (
                <div key={step.num} className="relative">
                  <div className="text-6xl font-heading font-extrabold text-neutral-100 mb-3">{step.num}</div>
                  <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-2">{isUk ? step.uk : step.en}</h3>
                  <p className="text-sm text-neutral-500">{isUk ? step.dUk : step.dEn}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ */}
        {city.faq.length > 0 && (
          <section className="py-20 bg-neutral-50 dark:bg-neutral-900 ">
            <Container>
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-heading font-extrabold text-neutral-900 dark:text-white mb-10 text-center">
                  {isUk ? `Часті питання — ML-консалтинг у ${cityName}` : `FAQ — ML consulting in ${cityName}`}
                </h2>
                <div className="space-y-4">
                  {city.faq.map((item) => (
                    <div key={item.q} className="rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 p-6">
                      <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-2">
                        {isUk ? item.q : item.qEn}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">{isUk ? item.a : item.aEn}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* Other cities */}
        <section className="py-16 bg-white dark:bg-neutral-800 border-t border-neutral-100">
          <Container>
            <h2 className="text-xl font-heading font-bold text-neutral-900 dark:text-white mb-6">
              {isUk ? "Також працюємо у містах:" : "We also serve cities:"}
            </h2>
            <div className="flex flex-wrap gap-3">
              {GEO_CITIES.filter((c) => c.slug !== city.slug).map((c) => (
                <Link
                  key={c.slug}
                  href={`/${lang}/location/${c.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-700 dark:text-neutral-300 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 transition-all"
                >
                  <MapPin className="w-3 h-3" /> {isUk ? c.nameUk : c.nameEn}
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-20 bg-neutral-950 text-white">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-heading font-extrabold mb-4">
                {isUk
                  ? <>{"Розпочати ML-проєкт "}<span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">{`у ${cityName}`}</span>{"?"}</>
                  : <>{"Start an ML project "}<span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">{`in ${cityName}`}</span>{"?"}</>}
              </h2>
              <p className="text-neutral-400 mb-8">
                {isUk
                  ? "ML Discovery Call безкоштовний. Відповідаємо протягом 2 годин."
                  : "ML Discovery Call is free. We respond within 2 hours."}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg transition-colors"
                >
                  {isUk ? "Отримати консультацію" : "Get a Consultation"} <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href={`/${lang}/services`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-all"
                >
                  {isUk ? "Наші ML-послуги" : "Our ML Services"}
                </Link>
              </div>
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </div>
  );
}
