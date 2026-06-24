import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { ArrowRight, CheckCircle, Clock, Zap, TrendingUp, Shield } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk
      ? "ML для UK Стартапів | Codeworth — PoC за 3 тижні, Series A validation"
      : "ML for UK Startups | Codeworth — PoC in 3 Weeks, Series A ML Validation",
    description: isUk
      ? "Спеціалізовані ML послуги для UK стартапів: швидкий PoC, Innovate UK grant support, investor-grade model validation, R&D tax credits. Від £1,800."
      : "Specialised ML services for UK startups: fast PoC, Innovate UK grant support, investor-grade model validation, R&D tax credits. From £1,800.",
    alternates: buildAlternates(lang, "startup"),
    openGraph: {
      title: isUk ? "ML для UK Стартапів | Codeworth" : "ML for UK Startups | Codeworth",
      description: isUk
        ? "PoC за 3 тижні. Innovate UK grant support. Series A validation."
        : "PoC in 3 weeks. Innovate UK grant support. Series A ML validation.",
      type: "website",
      url: `https://codeworth.uk/${lang}/startup`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: isUk ? "ML для стартапів Codeworth" : "Codeworth ML for Startups" }],
    },
  };
}

const STARTUP_PACKAGES = [
  {
    slug: "rapid-poc",
    titleUk: "Rapid ML PoC",
    titleEn: "Rapid ML PoC",
    price: "£1,800",
    delivery: { uk: "3 тижні", en: "3 weeks" },
    badgeUk: "Популярний",
    badgeEn: "Popular",
    highlight: true,
    descUk: "Швидке підтвердження ML-гіпотези перед залученням інвестицій або початком повного розроблення.",
    descEn: "Fast ML hypothesis validation before fundraising or committing to a full build.",
    includesUk: [
      "Data quality audit та EDA",
      "1 навчена та оцінена ML-модель",
      "Звіт метрик (precision/recall/F1/AUC)",
      "Порівняння з SOTA baseline",
      "Investor-ready model card",
      "Рекомендація: production або pivot",
    ],
    includesEn: [
      "Data quality audit and EDA",
      "1 trained and evaluated ML model",
      "Metrics report (precision/recall/F1/AUC)",
      "Comparison against SOTA baseline",
      "Investor-ready model card",
      "Recommendation: production or pivot",
    ],
  },
  {
    slug: "mvp-ml",
    titleUk: "MVP ML System",
    titleEn: "MVP ML System",
    price: "£4,500",
    delivery: { uk: "6–8 тижнів", en: "6–8 weeks" },
    badgeUk: null,
    badgeEn: null,
    highlight: false,
    descUk: "Production-ready ML система для MVP вашого продукту з API та базовим MLOps.",
    descEn: "Production-ready ML system for your product MVP with API and basic MLOps.",
    includesUk: [
      "Все з Rapid PoC",
      "FastAPI REST serving endpoint",
      "Docker containerisation",
      "CI/CD pipeline (GitHub Actions)",
      "Базовий MLOps моніторинг",
      "3 місяці гарантійної підтримки",
    ],
    includesEn: [
      "Everything in Rapid PoC",
      "FastAPI REST serving endpoint",
      "Docker containerisation",
      "CI/CD pipeline (GitHub Actions)",
      "Basic MLOps monitoring",
      "3 months warranty support",
    ],
  },
  {
    slug: "series-a-ml",
    titleUk: "Series A ML Validation",
    titleEn: "Series A ML Validation",
    price: "£3,000",
    delivery: { uk: "2–3 тижні", en: "2–3 weeks" },
    badgeUk: null,
    badgeEn: null,
    highlight: false,
    descUk: "Незалежна технічна валідація ML-системи для investor due diligence.",
    descEn: "Independent technical validation of your ML system for investor due diligence.",
    includesUk: [
      "Аудит ML codebase та методології",
      "Незалежна переоцінка метрик (holdout)",
      "Звіт: data leakage, overfitting, bias",
      "SHAP/explainability аналіз",
      "Technical ML risk assessment",
      "Investor-ready technical memo",
    ],
    includesEn: [
      "ML codebase and methodology audit",
      "Independent metric re-evaluation (holdout)",
      "Report: data leakage, overfitting, bias",
      "SHAP/explainability analysis",
      "Technical ML risk assessment",
      "Investor-ready technical memo",
    ],
  },
  {
    slug: "grant-support",
    titleUk: "Innovate UK Grant Support",
    titleEn: "Innovate UK Grant Support",
    price: "£1,500",
    delivery: { uk: "1–2 тижні", en: "1–2 weeks" },
    badgeUk: null,
    badgeEn: null,
    highlight: false,
    descUk: "Підготовка технічних секцій Innovate UK заявки та R&D tax credit документації.",
    descEn: "Technical sections of Innovate UK applications and R&D tax credit documentation.",
    includesUk: [
      "ML methodology section (TRL assessment)",
      "Feasibility analysis та uncertainty framing",
      "Work package структура",
      "Impact metrics та KPI framework",
      "R&D tax credit technical narrative",
      "HMRC documentation support",
    ],
    includesEn: [
      "ML methodology section (TRL assessment)",
      "Feasibility analysis and uncertainty framing",
      "Work package structure",
      "Impact metrics and KPI framework",
      "R&D tax credit technical narrative",
      "HMRC documentation support",
    ],
  },
];

const STARTUP_STAGES = [
  {
    stage: { uk: "Pre-Seed / Idea", en: "Pre-Seed / Idea" },
    emoji: "💡",
    needs: {
      uk: "Чи взагалі це можливо з ML? Rapid PoC відповість за 3 тижні.",
      en: "Is this even feasible with ML? Rapid PoC answers in 3 weeks.",
    },
    package: "rapid-poc",
  },
  {
    stage: { uk: "Seed / MVP Build", en: "Seed / MVP Build" },
    emoji: "🚀",
    needs: {
      uk: "MVP ML система для продукту. API готовий, PoC доведено.",
      en: "MVP ML system for your product. API ready, PoC proven.",
    },
    package: "mvp-ml",
  },
  {
    stage: { uk: "Series A / Fundraising", en: "Series A / Fundraising" },
    emoji: "📈",
    needs: {
      uk: "VCs вимагають незалежну ML-валідацію. Series A Validation package.",
      en: "VCs require independent ML validation. Series A Validation package.",
    },
    package: "series-a-ml",
  },
  {
    stage: { uk: "Grant Application", en: "Grant Application" },
    emoji: "🏛️",
    needs: {
      uk: "Innovate UK або UKRI grant. Технічні секції та R&D tax credits.",
      en: "Innovate UK or UKRI grant. Technical sections and R&D tax credits.",
    },
    package: "grant-support",
  },
];

export default async function StartupPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isUk = lang === "uk";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-20 bg-linear-to-br from-slate-900 via-violet-900 to-slate-900">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm px-3 py-1.5 rounded-full mb-6">
                <Zap className="w-4 h-4" />
                {isUk ? "Для UK стартапів" : "For UK Startups"}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                {isUk ? "ML для UK Стартапів" : "ML for UK Startups"}
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                {isUk
                  ? "Від PoC за 3 тижні до Series A ML validation. Підтримка Innovate UK грантів та R&D tax credits. Ми розуміємо специфіку стартап-ринку UK."
                  : "From PoC in 3 weeks to Series A ML validation. Innovate UK grant support and R&D tax credits. We understand UK startup market specifics."}
              </p>
              <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold transition-colors">
                {isUk ? "Поговорити про ваш стартап" : "Talk About Your Startup"} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </section>

        {/* Startup stages */}
        <section className="py-16 bg-white dark:bg-neutral-900 border-b">
          <Container>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {isUk ? "Пакет для кожного етапу" : "A Package for Every Stage"}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {STARTUP_STAGES.map((s) => (
                <div key={s.package} className="bg-gray-50 dark:bg-neutral-800 rounded-2xl p-5 border border-neutral-100 dark:border-neutral-700">
                  <div className="text-3xl mb-3">{s.emoji}</div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{isUk ? s.stage.uk : s.stage.en}</h3>
                  <p className="text-gray-500 dark:text-neutral-400 text-sm">{isUk ? s.needs.uk : s.needs.en}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Packages */}
        <section className="py-16 bg-gray-50 dark:bg-neutral-800">
          <Container>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-10 text-center">
              {isUk ? "Стартап-пакети" : "Startup Packages"}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {STARTUP_PACKAGES.map((pkg) => (
                <div key={pkg.slug} className={`rounded-2xl border p-6 flex flex-col ${pkg.highlight ? "border-violet-400 bg-white dark:bg-neutral-900 ring-2 ring-violet-400/30" : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900"}`}>
                  {(isUk ? pkg.badgeUk : pkg.badgeEn) && (
                    <span className="inline-block text-xs font-bold bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full mb-3">
                      {isUk ? pkg.badgeUk : pkg.badgeEn}
                    </span>
                  )}
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{isUk ? pkg.titleUk : pkg.titleEn}</h3>
                  <p className="text-gray-500 text-sm mb-4">{isUk ? pkg.descUk : pkg.descEn}</p>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl font-bold text-violet-600">{pkg.price}</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {isUk ? pkg.delivery.uk : pkg.delivery.en}
                    </span>
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {(isUk ? pkg.includesUk : pkg.includesEn).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-neutral-300">
                        <CheckCircle className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/${lang}/contact`} className={`block text-center py-2.5 rounded-xl font-semibold text-sm transition-colors ${pkg.highlight ? "bg-violet-600 hover:bg-violet-700 text-white" : "border border-violet-300 text-violet-700 hover:bg-violet-50"}`}>
                    {isUk ? "Замовити" : "Order"}
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* UK startup ecosystem */}
        <section className="py-16 bg-white dark:bg-neutral-900 border-b">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                {isUk ? "Чому ми розуміємо UK стартап-ринок" : "Why We Understand the UK Startup Market"}
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { icon: "🏛️", uk: "Innovate UK & UKRI", en: "Innovate UK & UKRI", dUk: "Допомагаємо з технічними секціями Innovate UK SMART, KTP, Future Leaders Fellowship заявок.", dEn: "We help with technical sections of Innovate UK SMART, KTP, Future Leaders Fellowship applications." },
                  { icon: "💸", uk: "R&D Tax Credits", en: "R&D Tax Credits", dUk: "Структуруємо ML-розробку для HMRC R&D tax credit eligibility. 20–30% eligible costs повертаються.", dEn: "We structure ML development for HMRC R&D tax credit eligibility. 20–30% of eligible costs returned." },
                  { icon: "📊", uk: "Investor-Ready ML", en: "Investor-Ready ML", dUk: "Cambridge Innovation Capital, Parkwalk, Deeptech Labs — ми знаємо що хочуть бачити UK VC у ML due diligence.", dEn: "Cambridge Innovation Capital, Parkwalk, Deeptech Labs — we know what UK VCs expect in ML due diligence." },
                ].map((item) => (
                  <div key={item.uk} className="bg-gray-50 dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-100">
                    <span className="text-3xl mb-3 block">{item.icon}</span>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{isUk ? item.uk : item.en}</h3>
                    <p className="text-gray-500 text-sm">{isUk ? item.dUk : item.dEn}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 bg-violet-600">
          <Container>
            <div className="max-w-xl mx-auto text-center text-white">
              <h2 className="text-2xl font-bold mb-3">
                {isUk ? "Готові запустити ML у вашому стартапі?" : "Ready to launch ML in your startup?"}
              </h2>
              <p className="text-violet-100 mb-6">
                {isUk ? "Discovery Call безкоштовний. Відповідаємо протягом 2 годин." : "Discovery Call is free. We respond within 2 hours."}
              </p>
              <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-violet-600 font-bold hover:bg-violet-50 transition-colors">
                {isUk ? "Розпочати" : "Get Started"} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </div>
  );
}
