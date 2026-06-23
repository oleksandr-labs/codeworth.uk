import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { CTASection } from "@/components/home/CTASection";
import { PortfolioContent } from "@/components/portfolio/PortfolioContent";
import { CountUp } from "@/components/ui/CountUp";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import { PROJECTS } from "@/lib/data/portfolio";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk
      ? "ML/AI Кейси та портфоліо — Codeworth | Machine Learning для бізнесу"
      : "ML/AI Case Studies & Portfolio — Codeworth | Machine Learning for Business",
    description: isUk
      ? "Реальні ML/AI проєкти від Codeworth: predictive analytics, NLP, computer vision, recommendation engines для FinTech, Healthcare, Retail та SaaS."
      : "Real ML/AI projects by Codeworth: predictive analytics, NLP, computer vision, recommendation engines for FinTech, Healthcare, Retail and SaaS.",
    alternates: buildAlternates(lang, 'portfolio'),
    openGraph: {
      title: isUk
        ? "ML/AI Кейси та портфоліо — Codeworth"
        : "ML/AI Case Studies & Portfolio — Codeworth",
      description: isUk
        ? "ML/AI проєкти від Codeworth: predictive analytics, NLP, CV для FinTech, Healthcare, Retail."
        : "ML/AI projects by Codeworth: predictive analytics, NLP, CV for FinTech, Healthcare, Retail.",
      type: "website",
      url: `https://codeworth.uk/${lang}/portfolio`,
      images: [{ url: "/og/portfolio.png", width: 1200, height: 630, alt: isUk ? "Портфоліо Codeworth" : "Codeworth Portfolio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isUk ? "ML/AI Портфоліо — Codeworth" : "ML/AI Portfolio — Codeworth",
      description: isUk ? "Реальні ML/AI проєкти від Codeworth для FinTech, Healthcare, Retail." : "Real ML/AI projects by Codeworth for FinTech, Healthcare, Retail.",
      images: ["/og/portfolio.png"],
    },
  };
}

const portfolioItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Портфоліо Codeworth",
  description: "ML/AI проєкти та кейси Codeworth",
  url: "https://codeworth.uk/portfolio",
  numberOfItems: PROJECTS.length,
  itemListElement: PROJECTS.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: project.title,
    url: `https://codeworth.uk/portfolio/${project.slug}`,
    description: project.description,
  })),
};

export default async function PortfolioPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isUk = lang === "uk";
  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioItemListSchema) }}
      />
      <Header />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-16 gradient-hero">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-4">
                {isUk ? "ML/AI Кейси" : "ML/AI Case Studies"}
              </p>
              <h1 className="text-5xl lg:text-6xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
                {isUk ? "Реальні ML-проєкти для бізнесу" : "Real ML Projects for Business"}
              </h1>
              <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto mb-6">
                {isUk
                  ? "Кожен кейс нижче — реальний ML-проєкт із технічними деталями, метриками та бізнес-результатами."
                  : "Every case study below is a real ML project with technical details, metrics, and business outcomes."}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-medium inline-flex items-center gap-1">
                  <EmojiIcon emoji="🧠" className="w-3.5 h-3.5" />{isUk ? "40+ ML моделей" : "40+ ML models"}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 font-medium inline-flex items-center gap-1">
                  <EmojiIcon emoji="🏭" className="w-3.5 h-3.5" />{isUk ? "12 галузей" : "12 industries"}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 font-medium inline-flex items-center gap-1">
                  <EmojiIcon emoji="📊" className="w-3.5 h-3.5" />{isUk ? "92% середній F1" : "92% avg F1"}
                </span>
              </div>
            </div>
          </Container>
        </section>

        {/* Stats row */}
        <section className="py-10 bg-white dark:bg-neutral-800 border-y border-neutral-100">
          <Container>
            <div className="flex flex-wrap items-center justify-center gap-10 text-center">
              {[
                { end: 40, suffix: "+", label: isUk ? "ML моделей" : "ML Models" },
                { end: 12, suffix: "", label: isUk ? "Галузей" : "Industries" },
                { end: 4, suffix: "+", label: isUk ? "Роки роботи" : "Years" },
                { end: 92, suffix: "%", label: isUk ? "Середній F1" : "Avg F1 Score" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-sans font-extrabold tabular-nums tracking-tight gradient-text-primary">
                    <CountUp end={s.end} suffix={s.suffix} />
                  </div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* How ML projects work */}
        <section className="py-16 bg-white dark:bg-neutral-800 border-b border-neutral-100">
          <Container>
            <div className="max-w-xl mx-auto text-center mb-10">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                {isUk ? "Як ми працюємо" : "How We Work"}
              </p>
              <h2 className="text-3xl font-heading font-extrabold text-neutral-900 dark:text-white">
                {isUk ? "Від даних до production — 4 фази" : "From Data to Production — 4 Phases"}
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  step: "01",
                  icon: "🔍",
                  title: isUk ? "Discovery & Аудит даних" : "Discovery & Data Audit",
                  desc: isUk
                    ? "Визначаємо ML-задачу, аналізуємо ваші дані, оцінюємо якість та обсяг, формуємо технічне завдання."
                    : "Define the ML task, analyse your data, assess quality and volume, form a technical specification.",
                  color: "bg-indigo-50 text-indigo-600",
                },
                {
                  step: "02",
                  icon: "🧪",
                  title: isUk ? "PoC / Прототип" : "PoC / Prototype",
                  desc: isUk
                    ? "Тренуємо першу модель на ваших даних. Через 3–4 тижні ви бачите реальні метрики та можете рішити чи варто далі."
                    : "Train the first model on your data. In 3–4 weeks you see real metrics and can decide whether to proceed.",
                  color: "bg-violet-50 text-violet-600",
                },
                {
                  step: "03",
                  icon: "⚙️",
                  title: isUk ? "Production ML" : "Production ML",
                  desc: isUk
                    ? "Оптимізуємо модель, підключаємо до ваших систем через FastAPI, налаштовуємо моніторинг та CI/CD."
                    : "Optimise the model, connect it to your systems via FastAPI, set up monitoring and CI/CD pipelines.",
                  color: "bg-emerald-50 text-emerald-600",
                },
                {
                  step: "04",
                  icon: "🚀",
                  title: isUk ? "MLOps & Підтримка" : "MLOps & Support",
                  desc: isUk
                    ? "Автоматичне перетренування при drift, щомісячні звіти, SLA-відповідь за 4 години."
                    : "Automatic retraining on drift, monthly reports, SLA response within 4 hours.",
                  color: "bg-amber-50 text-amber-600",
                },
              ].map((item, i) => (
                <div key={i} className="relative p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-700 hover:border-indigo-200 hover:shadow-sm transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <EmojiIcon emoji={item.icon} className="w-7 h-7" />
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.color}`}>
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-neutral-900 dark:text-white text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ML results metrics */}
        <section className="py-16 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-10">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                {isUk ? "Результати клієнтів" : "Client Results"}
              </p>
              <h2 className="text-3xl font-heading font-extrabold text-neutral-900 dark:text-white">
                {isUk ? "Що отримують наші клієнти" : "What Our Clients Achieve"}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  metric: "-23%",
                  label: isUk ? "надлишкових запасів у ритейл-клієнта завдяки ML-прогнозуванню попиту" : "excess inventory for a retail client via ML demand forecasting",
                  example: isUk ? "XGBoost + Prophet, 120 магазинів" : "XGBoost + Prophet, 120 stores",
                  color: "from-emerald-500 to-teal-600",
                },
                {
                  metric: "97%",
                  label: isUk ? "точність виявлення шахрайства для FinTech-клієнта" : "fraud detection accuracy for a FinTech client",
                  example: isUk ? "LightGBM + real-time inference API" : "LightGBM + real-time inference API",
                  color: "from-indigo-500 to-violet-600",
                },
                {
                  metric: "+34%",
                  label: isUk ? "конверсія в покупку завдяки ML-рекомендаціям" : "purchase conversion via ML recommendations",
                  example: isUk ? "Collaborative filtering, A/B tested" : "Collaborative filtering, A/B tested",
                  color: "from-amber-500 to-orange-600",
                },
                {
                  metric: "3 міс",
                  label: isUk ? "до позитивного ROI у типовому Production ML проєкті" : "to positive ROI in a typical Production ML project",
                  example: isUk ? "Середнє по всіх кейсах 2024" : "Average across 2024 case studies",
                  color: "from-pink-500 to-rose-600",
                },
              ].map((item) => (
                <div key={item.metric} className="p-6 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 text-center hover:shadow-md transition-shadow">
                  <div className={`text-3xl font-sans font-extrabold tabular-nums tracking-tight bg-linear-to-r ${item.color} bg-clip-text text-transparent mb-2`}>
                    {item.metric}
                  </div>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 font-medium leading-snug mb-3">{item.label}</p>
                  <p className="text-xs text-neutral-400">{item.example}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Projects grid with filter */}
        <PortfolioContent />


        <CTASection lang={lang} />
      </main>
      <Footer />
    </div>
  );
}
