import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { SERVICES_DATA, getServiceLocalized } from "@/lib/data/services";
import { BLOG_POSTS } from "@/lib/data/blog";
import { NICHES_DATA, getNicheLocalized } from "@/lib/data/niches";
import { ArrowRight, Check, Clock, ChevronRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { AiCopywriterDemo } from "@/components/extras/demos/AiCopywriterDemo";
import { AiEdtechDemo } from "@/components/extras/demos/AiEdtechDemo";
import { AiHospitalityDemo } from "@/components/extras/demos/AiHospitalityDemo";
import { MLOpsPipelineDiagram } from "@/components/services/MLOpsPipelineDiagram";
import { DatasetCalculator } from "@/components/services/DatasetCalculator";
import { ServiceStickyCta } from "@/components/services/ServiceStickyCta";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES_DATA.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const service = getServiceLocalized(slug, lang);
  if (!service) return {};
  const ogImage = `/og/services/${slug}.png`;
  return {
    title: `${service.title} | Codeworth`,
    description: service.metaDescription,
    keywords: [service.keyword],
    alternates: buildAlternates(lang, `services/${slug}`),
    openGraph: {
      title: service.title,
      description: service.metaDescription,
      type: "website",
      url: `https://codeworth.uk/${lang}/services/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: service.shortTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.metaDescription,
      images: [ogImage],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { lang, slug } = await params;
  const isUk = lang === "uk";
  const service = getServiceLocalized(slug, lang);
  if (!service) notFound();

  const Icon = service.icon;

  // Find related blog posts by matching category keywords or tags
  const relatedPosts = BLOG_POSTS.filter((p) => {
    const keywords = [service.slug, service.shortTitle.toLowerCase(), service.keyword?.toLowerCase()].filter(Boolean);
    return keywords.some((kw) =>
      kw && (p.category.toLowerCase().includes(kw) || p.tags.some((t) => t.toLowerCase().includes(kw)))
    );
  }).slice(0, 3);
  const blogPosts = relatedPosts.length >= 2 ? relatedPosts : BLOG_POSTS.slice(0, 3);

  // Pick 3 relevant niches based on service keyword match, then fall back to first 3
  const relatedNichesRaw = (() => {
    const keywords = [service.slug, service.shortTitle.toLowerCase(), service.keyword?.toLowerCase()].filter(Boolean) as string[];
    const matched = NICHES_DATA.filter((n) =>
      keywords.some((kw) =>
        n.slug.includes(kw) ||
        n.title.toLowerCase().includes(kw) ||
        n.subtitle.toLowerCase().includes(kw)
      )
    );
    return matched.length >= 2 ? matched.slice(0, 3) : NICHES_DATA.slice(0, 3);
  })();
  const relatedNiches = relatedNichesRaw.map((n) => getNicheLocalized(n.slug, lang) ?? n);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Головна", item: "https://codeworth.uk" },
      { "@type": "ListItem", position: 2, name: "Послуги", item: "https://codeworth.uk/services" },
      { "@type": "ListItem", position: 3, name: service.title },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "Codeworth",
      url: "https://codeworth.uk",
    },
    url: `https://codeworth.uk/services/${service.slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "UAH",
      price: service.priceFrom,
      availability: "https://schema.org/InStock",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className={`pt-32 pb-20 relative overflow-hidden bg-linear-to-br ${service.gradient}`}>
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <Container className="relative">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
              <Link href={`/${lang}`} className="hover:text-white transition-colors">{isUk ? "Головна" : "Home"}</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href={`/${lang}/services`} className="hover:text-white transition-colors">{isUk ? "Послуги" : "Services"}</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white/90">{service.shortTitle}</span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex items-center gap-3 text-white/70 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> {service.deliveryTime}
                  </span>
                  <span>·</span>
                  <span>{isUk ? `від ${service.priceFrom}` : `from ${service.priceFrom}`}</span>
                </div>
              </div>
              <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-white mb-5 leading-tight">
                {service.title}
              </h1>
              <p className="text-lg text-white/80 leading-relaxed max-w-2xl mb-8">
                {service.longDescription}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-indigo-700 font-bold hover:bg-white/90 transition-all shadow-lg hover:-translate-y-0.5"
                >
                  {isUk ? "Отримати пропозицію" : "Get a Quote"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/${lang}/portfolio`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all"
                >
                  {isUk ? "Дивитися портфоліо" : "View Portfolio"}
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Features */}
        <section className="py-24 bg-white dark:bg-neutral-950">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-heading font-extrabold text-neutral-900">
                {isUk ? "Що ви отримуєте" : "What You Get"}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {service.features.map((f) => (
                <div key={f.title} className="p-6 rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:shadow-md transition-shadow">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${service.bg}`}>
                    <Check className={`w-5 h-5 ${service.iconColor}`} />
                  </div>
                  <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Tech Stack */}
        {service.techStack && service.techStack.length > 0 && (
          <section className="py-12 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100">
            <Container>
              <p className="text-center text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-6">
                {isUk ? "Технологічний стек" : "Technology Stack"}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {service.techStack.map((tech) => (
                  <span
                    key={tech}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${service.bg} ${service.iconColor} border-current/20`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Live Demo — AI Copywriter (artificial-intelligence only) */}
        {service.demoComponent === "ai-copywriter" && (
          <section className="py-24 bg-white dark:bg-neutral-800 border-t border-neutral-100">
            <Container>
              <div className="max-w-2xl mx-auto text-center mb-12">
                <p className="text-sm font-semibold text-violet-600 uppercase tracking-widest mb-3">
                  {isUk ? "Спробуйте самі" : "Try It Yourself"}
                </p>
                <h2 className="text-4xl font-heading font-extrabold text-neutral-900">
                  {isUk ? "AI-копірайтер — live демо" : "AI Copywriter — Live Demo"}
                </h2>
                <p className="mt-4 text-neutral-500 dark:text-neutral-400 text-base">
                  {isUk
                    ? "Оберіть нішу та тон — AI згенерує заголовок, підзаголовок та CTA для вашого лендінгу."
                    : "Pick a niche and tone — AI generates a headline, subheadline, and CTA for your landing page."}
                </p>
              </div>
              <AiCopywriterDemo variant="service-page" isUk={isUk} />
            </Container>
          </section>
        )}

        {/* Live Demo — AI EdTech (artificial-intelligence only) */}
        {slug === "artificial-intelligence" && (
          <section className="py-24 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100">
            <Container>
              <div className="max-w-2xl mx-auto text-center mb-12">
                <p className="text-sm font-semibold text-violet-600 uppercase tracking-widest mb-3">
                  {isUk ? "Спробуйте самі" : "Try It Yourself"}
                </p>
                <h2 className="text-4xl font-heading font-extrabold text-neutral-900">
                  {isUk ? "AI-Навчання — live демо" : "AI Learning — Live Demo"}
                </h2>
                <p className="mt-4 text-neutral-500 dark:text-neutral-400 text-base">
                  {isUk
                    ? "Адаптивна система навчання, що підлаштовує складність під рівень учня в реальному часі."
                    : "Adaptive learning system that adjusts difficulty to the learner's level in real time."}
                </p>
              </div>
              <AiEdtechDemo variant="service-page" isUk={isUk} />
            </Container>
          </section>
        )}

        {/* Live Demo — AI Hospitality (artificial-intelligence only) */}
        {slug === "artificial-intelligence" && (
          <section className="py-24 bg-white dark:bg-neutral-800 border-t border-neutral-100">
            <Container>
              <div className="max-w-2xl mx-auto text-center mb-12">
                <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                  {isUk ? "Спробуйте самі" : "Try It Yourself"}
                </p>
                <h2 className="text-4xl font-heading font-extrabold text-neutral-900">
                  {isUk ? "AI-Консьєрж Готелю — live демо" : "Hotel AI Concierge — Live Demo"}
                </h2>
                <p className="mt-4 text-neutral-500 dark:text-neutral-400 text-base">
                  {isUk
                    ? "Мультимовний голосовий AI для готелів. 5 мов, 4 сценарії, інтеграція з PMS."
                    : "Multilingual voice AI for hotels. 5 languages, 4 scenarios, PMS integration."}
                </p>
              </div>
              <AiHospitalityDemo variant="service-page" isUk={isUk} />
            </Container>
          </section>
        )}

        {/* MLOps Pipeline Diagram — machine-learning only */}
        {slug === "machine-learning" && (
          <section className="py-24 bg-white dark:bg-neutral-800 border-t border-neutral-100">
            <Container>
              <div className="max-w-2xl mx-auto text-center mb-12">
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">
                  {isUk ? "Як це влаштовано" : "How It Works"}
                </p>
                <h2 className="text-4xl font-heading font-extrabold text-neutral-900">
                  {isUk ? "MLOps в продакшені" : "MLOps in Production"}
                </h2>
                <p className="mt-4 text-neutral-500 dark:text-neutral-400 text-base">
                  {isUk
                    ? "Від збору даних до авто-перенавчання в продакшені — повний цикл."
                    : "From data ingestion to auto-retraining in production — the full cycle."}
                </p>
              </div>
              <MLOpsPipelineDiagram isUk={isUk} />
            </Container>
          </section>
        )}

        {/* Dataset Readiness Calculator — machine-learning only */}
        {slug === "machine-learning" && (
          <section className="py-24 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100">
            <Container>
              <div className="max-w-2xl mx-auto text-center mb-12">
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">
                  {isUk ? "Інструмент" : "Tool"}
                </p>
                <h2 className="text-4xl font-heading font-extrabold text-neutral-900">
                  {isUk ? "Чи вистачає у вас даних для ML?" : "Do You Have Enough Data for ML?"}
                </h2>
                <p className="mt-4 text-neutral-500 dark:text-neutral-400 text-base">
                  {isUk
                    ? "Введіть параметри датасету — отримайте миттєву оцінку готовності."
                    : "Enter your dataset parameters and get an instant ML readiness assessment."}
                </p>
              </div>
              <DatasetCalculator isUk={isUk} />
            </Container>
          </section>
        )}

        {/* ML APIs catalog — machine-learning only */}
        {slug === "machine-learning" && (
          <section className="py-24 bg-white dark:bg-neutral-800 border-t border-neutral-100">
            <Container>
              <div className="max-w-2xl mx-auto text-center mb-12">
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">
                  {isUk ? "ML APIs" : "ML APIs"}
                </p>
                <h2 className="text-4xl font-heading font-extrabold text-neutral-900">
                  {isUk ? "Готові ML-API для бізнес-задач" : "Ready ML APIs for Business Use Cases"}
                </h2>
                <p className="mt-4 text-neutral-500 dark:text-neutral-400 text-base">
                  {isUk
                    ? "Замість 6-місячного research — підключайте готові ML-сервіси за тижні."
                    : "Skip the 6-month research cycle — integrate ready ML services in weeks."}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { name: "ChurnPredictor", desc: isUk ? "Прогноз відтоку клієнтів (SaaS, telco)" : "Customer churn prediction (SaaS, telco)", price: isUk ? "від £2,500" : "from £2,500", niche: "/ml/saas", emoji: "📉" },
                  { name: "FraudShield", desc: isUk ? "Виявлення шахрайства у транзакціях (FCA-compliant)" : "Transaction fraud detection (FCA-compliant)", price: isUk ? "від £4,500" : "from £4,500", niche: "/ml/banking", emoji: "🛡️" },
                  { name: "DemandForecast", desc: isUk ? "Прогноз попиту з оптимізацією запасів" : "Demand forecasting with inventory optimization", price: isUk ? "від £3,500" : "from £3,500", niche: "/ml/retail", emoji: "📊" },
                  { name: "PropertyValuation", desc: isUk ? "AVM-моделі оцінки нерухомості" : "AVM-based property valuation", price: isUk ? "від £3,000" : "from £3,000", niche: "/ml/real-estate", emoji: "🏘️" },
                  { name: "AnomalyDetect", desc: isUk ? "UEBA + SIEM аномалії для cybersec" : "UEBA + SIEM anomaly detection for cybersec", price: isUk ? "від £5,500" : "from £5,500", niche: "/ml/cybersecurity", emoji: "🔍" },
                  { name: "MaintenanceAI", desc: isUk ? "Predictive maintenance для обладнання" : "Predictive maintenance for industrial equipment", price: isUk ? "від £4,500" : "from £4,500", niche: "/ml/manufacturing", emoji: "⚙️" },
                ].map((api) => (
                  <Link
                    key={api.name}
                    href={`/${lang}${api.niche}`}
                    className="group p-5 rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-3xl">{api.emoji}</div>
                      <span className="text-xs font-semibold text-blue-600">{api.price}</span>
                    </div>
                    <h3 className="font-bold text-neutral-900 dark:text-white mb-1.5 group-hover:text-blue-700 transition-colors">
                      {api.name}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{api.desc}</p>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* What's included */}
        <section className="py-24 bg-neutral-50 dark:bg-neutral-900 ">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                  {isUk ? "Що входить" : "What's Included"}
                </p>
                <h2 className="text-4xl font-heading font-extrabold text-neutral-900 dark:text-white mb-6">
                  {isUk ? "Що ми зробимо для вас" : "What We'll Do for You"}
                </h2>
                <ul className="space-y-3">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-600" />
                      </div>
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* CTA card */}
              <div className={`p-8 rounded-2xl bg-linear-to-br ${service.gradient} text-white`}>
                <h3 className="text-2xl font-heading font-bold mb-3">
                  {isUk ? "Готові розпочати?" : "Ready to Start?"}
                </h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  {isUk
                    ? "Залишіть заявку — зв'яжемося протягом 2 годин для безкоштовної консультації."
                    : "Leave a request — we'll get back to you within 2 hours for a free consultation."}
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <Clock className="w-4 h-4" /> {isUk ? "Термін:" : "Timeline:"} {service.deliveryTime}
                  </div>
                  <div className="text-2xl font-heading font-extrabold">
                    {isUk ? `від ${service.priceFrom}` : `from ${service.priceFrom}`}
                  </div>
                </div>
                <Link
                  href={`/${lang}/contact`}
                  className="block text-center px-6 py-3.5 rounded-xl bg-white font-bold text-indigo-700 hover:bg-white/90 transition-colors"
                >
                  {isUk ? "Замовити консультацію" : "Book a Consultation"}
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Comparison Table — AI approaches */}
        {service.comparisonTable && service.comparisonTable.length > 0 && (
          <section className="py-24 bg-white dark:bg-neutral-800 border-t border-neutral-100">
            <Container>
              <div className="max-w-2xl mx-auto text-center mb-12">
                <p className="text-sm font-semibold text-violet-600 uppercase tracking-widest mb-3">
                  {isUk ? "Як обрати підхід" : "Choosing the Right Approach"}
                </p>
                <h2 className="text-4xl font-heading font-extrabold text-neutral-900">
                  {isUk ? "Prompt Engineering vs RAG vs Fine-tuning" : "Prompt Engineering vs RAG vs Fine-tuning"}
                </h2>
              </div>
              <div className="max-w-4xl mx-auto overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`bg-linear-to-r ${service.gradient} text-white`}>
                      <th className="text-left px-5 py-4 font-heading font-bold rounded-tl-xl">{isUk ? "Підхід" : "Approach"}</th>
                      <th className="text-left px-5 py-4 font-heading font-bold">{isUk ? "Що це" : "What It Is"}</th>
                      <th className="text-left px-5 py-4 font-heading font-bold rounded-tr-xl">{isUk ? "Коли обирати" : "When to Choose"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.comparisonTable.map((row, i) => (
                      <tr key={row.approach} className={i % 2 === 0 ? "bg-white" : "bg-neutral-50"}>
                        <td className="px-5 py-4 font-heading font-bold text-neutral-900 dark:text-white whitespace-nowrap">{row.approach}</td>
                        <td className="px-5 py-4 text-neutral-600">{isUk ? row.ukDesc : row.enDesc}</td>
                        <td className="px-5 py-4 text-neutral-600">{isUk ? row.ukWhen : row.enWhen}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Container>
          </section>
        )}

        {/* Packages */}
        {service.packages && service.packages.length > 0 && (
          <section className="py-24 bg-white dark:bg-neutral-950">
            <Container>
              <div className="max-w-2xl mx-auto text-center mb-12">
                <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">{isUk ? "Тарифи" : "Packages"}</p>
                <h2 className="text-4xl font-heading font-extrabold text-neutral-900">
                  {isUk ? "Оберіть свій пакет" : "Choose Your Package"}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {service.packages.map((pkg) => (
                  <div
                    key={pkg.name}
                    className={`relative rounded-2xl p-7 border-2 flex flex-col ${
                      pkg.highlight
                        ? `border-indigo-600 bg-linear-to-br ${service.gradient} text-white shadow-xl`
                        : "border-neutral-100 dark:border-neutral-700 bg-white"
                    }`}
                  >
                    {pkg.highlight && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-400 text-gray-900 dark:text-white text-xs font-bold rounded-full whitespace-nowrap">
                        {isUk ? "Рекомендовано" : "Recommended"}
                      </div>
                    )}
                    <div className={`text-lg font-heading font-bold mb-1 ${pkg.highlight ? "text-white" : "text-neutral-900"}`}>
                      {pkg.name}
                    </div>
                    <div className={`text-xs mb-5 ${pkg.highlight ? "text-white/70" : "text-neutral-500"}`}>
                      {pkg.desc}
                    </div>
                    <div className={`text-2xl font-heading font-extrabold mb-6 ${pkg.highlight ? "text-white" : "text-neutral-900"}`}>
                      {pkg.price}
                    </div>
                    <ul className="space-y-2.5 mb-8 flex-1">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.highlight ? "text-white" : "text-indigo-600"}`} />
                          <span className={`text-sm ${pkg.highlight ? "text-white/80" : "text-neutral-600"}`}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/${lang}/contact`}
                      className={`block text-center px-5 py-3 rounded-xl font-bold text-sm transition-colors ${
                        pkg.highlight
                          ? "bg-white text-indigo-700 hover:bg-white/90"
                          : "border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                      }`}
                    >
                      {isUk ? "Замовити" : "Order"}
                    </Link>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Before / After — ROI metrics */}
        {service.beforeAfter && service.beforeAfter.length > 0 && (
          <section className="py-24 bg-white dark:bg-neutral-800 border-t border-neutral-100">
            <Container>
              <div className="max-w-2xl mx-auto text-center mb-12">
                <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                  {isUk ? "ROI у цифрах" : "ROI in Numbers"}
                </p>
                <h2 className="text-4xl font-heading font-extrabold text-neutral-900">
                  {isUk ? "Бізнес-метрики до і після впровадження" : "Business Metrics Before & After Implementation"}
                </h2>
              </div>
              <div className="max-w-3xl mx-auto overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`bg-linear-to-r ${service.gradient} text-white`}>
                      <th className="text-left px-5 py-4 font-heading font-bold rounded-tl-xl">{isUk ? "Метрика" : "Metric"}</th>
                      <th className="text-left px-5 py-4 font-heading font-bold">{isUk ? "До" : "Before"}</th>
                      <th className="text-left px-5 py-4 font-heading font-bold">{isUk ? "Після" : "After"}</th>
                      <th className="text-left px-5 py-4 font-heading font-bold rounded-tr-xl">{isUk ? "Зміна" : "Change"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.beforeAfter.map((row, i) => (
                      <tr key={row.metric} className={i % 2 === 0 ? "bg-white" : "bg-neutral-50"}>
                        <td className="px-5 py-4 font-semibold text-neutral-900">{row.metric}</td>
                        <td className="px-5 py-4 text-neutral-500">{row.before}</td>
                        <td className="px-5 py-4 text-neutral-700 dark:text-neutral-300 font-medium">{row.after}</td>
                        <td className="px-5 py-4">
                          <span className={cn(
                            "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold",
                            row.improvement.startsWith("+") ? "bg-emerald-100 text-emerald-700" : "bg-indigo-100 text-indigo-700"
                          )}>
                            {row.improvement.startsWith("+") ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {row.improvement}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Container>
          </section>
        )}

        {/* Use Cases */}
        {service.useCases && service.useCases.length > 0 && (
          <section className="py-24 bg-neutral-50 dark:bg-neutral-900 ">
            <Container>
              <div className="max-w-2xl mx-auto text-center mb-16">
                <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">{isUk ? "Для кого" : "Who It's For"}</p>
                <h2 className="text-4xl font-heading font-extrabold text-neutral-900">
                  {isUk ? "Приклади по нішах" : "Niche Examples"}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                {service.useCases.map((uc) => (
                  <div key={uc.niche} className="flex items-start gap-4 p-5 rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:shadow-md transition-shadow">
                    <span className="text-2xl shrink-0" aria-hidden="true">{uc.emoji}</span>
                    <div>
                      <h3 className="font-heading font-bold text-neutral-900 dark:text-white text-sm mb-1">{uc.niche}</h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{uc.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Process Steps */}
        {service.processSteps && service.processSteps.length > 0 && (
          <section className="py-24 bg-neutral-50 dark:bg-neutral-900 ">
            <Container>
              <div className="max-w-2xl mx-auto text-center mb-16">
                <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">{isUk ? "Процес" : "Process"}</p>
                <h2 className="text-4xl font-heading font-extrabold text-neutral-900">
                  {isUk ? "Як це працює" : "How It Works"}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {service.processSteps.map((step) => (
                  <div key={step.step} className="relative text-center">
                    <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${service.gradient} flex items-center justify-center mx-auto mb-4 text-white font-heading font-extrabold text-lg shadow-lg`}>
                      {step.step}
                    </div>
                    <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Case Studies */}
        {service.caseStudies && service.caseStudies.length > 0 && (
          <section className="py-24 bg-white dark:bg-neutral-800 border-t border-neutral-100">
            <Container>
              <div className="max-w-2xl mx-auto text-center mb-16">
                <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">{isUk ? "Приклади" : "Examples"}</p>
                <h2 className="text-4xl font-heading font-extrabold text-neutral-900">
                  {isUk ? "Приклади результатів" : "Example Results"}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {service.caseStudies.map((cs) => (
                  <div key={cs.niche + cs.metric} className="p-6 rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:shadow-md transition-shadow">
                    <div className={`inline-flex items-center justify-center px-4 py-2 rounded-xl bg-linear-to-r ${service.gradient} text-white font-heading font-extrabold text-2xl mb-4`}>
                      {cs.metric}
                    </div>
                    <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wider mb-2">{cs.niche}</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{cs.result}</p>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* FAQ */}
        <section className="py-24 bg-white dark:bg-neutral-950">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-4xl font-heading font-extrabold text-neutral-900">
                {isUk ? "Часті питання" : "FAQ"}
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {service.faq.map((item) => (
                <div key={item.q} className="p-6 rounded-2xl border border-neutral-100">
                  <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-2">{item.q}</h3>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>

            {/* More questions CTA */}
            <div className="max-w-3xl mx-auto mt-8 text-center">
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                {isUk ? "Не знайшли відповідь?" : "Didn't find an answer?"}{" "}
                <Link href={`/${lang}/contact`} className="text-indigo-600 font-medium hover:underline">
                  {isUk ? "Напишіть нам" : "Contact us"}
                </Link>
                {" "}{isUk ? "або перегляньте" : "or check the"}{" "}
                <Link href={`/${lang}/faq`} className="text-indigo-600 font-medium hover:underline">
                  {isUk ? "повний FAQ" : "full FAQ"}
                </Link>
              </p>
            </div>
          </Container>
        </section>

        {/* Related blog posts */}
        {blogPosts.length > 0 && (
          <section className="py-16 bg-white dark:bg-neutral-800 border-t border-neutral-100">
            <Container>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-heading font-bold text-neutral-900">{isUk ? "Читайте також" : "Read Also"}</h3>
                <Link href={`/${lang}/blog`} className="text-sm text-indigo-600 font-medium hover:underline flex items-center gap-1">
                  {isUk ? "Всі статті" : "All Articles"} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {blogPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/${lang}/blog/${post.slug}`}
                    className="group rounded-2xl border border-neutral-100 dark:border-neutral-700 overflow-hidden hover:shadow-lg hover:shadow-neutral-200/60 transition-all duration-300 hover:-translate-y-1 bg-white"
                  >
                    <div className={cn(`h-28 bg-linear-to-br flex items-center justify-center text-4xl`, post.color)}>
                      {post.emoji}
                    </div>
                    <div className="p-4">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
                        {post.category}
                      </span>
                      <h4 className="font-heading font-bold text-neutral-900 dark:text-white text-sm leading-tight group-hover:text-indigo-700 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Related niches */}
        <section className="py-16 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100">
          <Container>
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-1">{isUk ? "Готові рішення" : "Ready-Made Solutions"}</p>
                <h3 className="text-2xl font-heading font-bold text-neutral-900">{isUk ? "Для вашої ніші" : "For Your Niche"}</h3>
              </div>
              <Link href={`/${lang}/niches`} className="text-sm text-indigo-600 font-medium hover:underline flex items-center gap-1">
                {isUk ? "Всі рішення" : "All Solutions"} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedNiches.map((niche) => (
                <Link
                  key={niche.slug}
                  href={`/${lang}/niches/${niche.slug}`}
                  className="group flex items-start gap-4 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-indigo-200 hover:shadow-md transition-all"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: `${niche.color}22` }}
                  >
                    {niche.emoji}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-neutral-900 dark:text-white group-hover:text-indigo-700 transition-colors text-sm">{niche.title}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-2">{niche.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* AI/ML niche hub cross-link */}
        {(slug === "artificial-intelligence" || slug === "machine-learning") && (
          <section className="py-12 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100">
            <Container>
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
                    {slug === "artificial-intelligence"
                      ? (isUk ? "AI по галузях" : "AI by Industry")
                      : (isUk ? "ML по галузях" : "ML by Industry")}
                  </p>
                  <h3 className="text-lg font-heading font-bold text-neutral-900 dark:text-white mb-1">
                    {slug === "artificial-intelligence"
                      ? (isUk ? "AI-рішення для вашої галузі" : "AI solutions for your industry")
                      : (isUk ? "ML-рішення для вашої галузі" : "ML solutions for your industry")}
                  </h3>
                  <p className="text-sm text-neutral-500">
                    {slug === "artificial-intelligence"
                      ? (isUk ? "10 спеціалізованих AI-рішень: медицина, e-commerce, FinTech, маркетинг та інші" : "10 specialised AI solutions: healthcare, e-commerce, FinTech, marketing and more")
                      : (isUk ? "10 ML-рішень для банків, рітейлу, SaaS, логістики та інших галузей" : "10 ML solutions for banking, retail, SaaS, logistics and more industries")}
                  </p>
                </div>
                <Link
                  href={`/${lang}/${slug === "artificial-intelligence" ? "ai" : "ml"}`}
                  className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors"
                >
                  {isUk ? "Переглянути всі" : "Browse all"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Container>
          </section>
        )}

        {/* Cross-link to related service */}
        {service.crossLink && (
          <section className="py-16 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100">
            <Container>
              <div className={`rounded-2xl p-8 bg-linear-to-br ${service.gradient} text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6`}>
                <div>
                  <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-2">
                    {isUk ? "Суміжна послуга" : "Related Service"}
                  </p>
                  <h3 className="text-2xl font-heading font-bold mb-2">
                    {isUk ? service.crossLink.ukLabel : service.crossLink.enLabel}
                  </h3>
                  <p className="text-white/80 text-sm max-w-lg">
                    {isUk ? service.crossLink.ukDesc : service.crossLink.enDesc}
                  </p>
                </div>
                <Link
                  href={`/${lang}/services/${service.crossLink.slug}`}
                  className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-neutral-900 dark:text-white font-bold text-sm hover:bg-white/90 transition-colors"
                >
                  {isUk ? "Дізнатись більше" : "Learn More"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Container>
          </section>
        )}

        {/* Other services */}
        <section className="py-16 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100">
          <Container>
            <h3 className="text-lg font-heading font-bold text-neutral-700 dark:text-neutral-300 mb-6">{isUk ? "Інші послуги" : "Other Services"}</h3>
            <div className="flex flex-wrap gap-3">
              {SERVICES_DATA.filter((s) => s.slug !== service.slug).map((rawS) => {
                const s = getServiceLocalized(rawS.slug, lang) ?? rawS;
                const SIcon = s.icon;
                return (
                  <Link
                    key={s.slug}
                    href={`/${lang}/services/${s.slug}`}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-indigo-200 hover:bg-indigo-50 transition-all text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-indigo-700"
                  >
                    <SIcon className={`w-4 h-4 ${s.iconColor}`} />
                    {s.shortTitle}
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <ServiceStickyCta lang={lang} serviceName={service.shortTitle} />
    </div>
  );
}
