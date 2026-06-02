import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { ArrowRight, Clock, Zap } from "lucide-react";
import {
  STARTUP_SOLUTIONS,
  STARTUP_CATEGORY_LABELS_EN,
  STARTUP_CATEGORY_LABELS_UK,
  type StartupCategory,
} from "@/lib/data/startup";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk
      ? `Готові лендінги для стартапів — Codeworth | від £299 | Запуск за 3–7 днів`
      : `Startup Landing Pages — Codeworth | from £299 | Launch in 3–7 Days`,
    description: isUk
      ? `${STARTUP_SOLUTIONS.length}+ готових лендінгів для стартапів. SaaS waitlist, MVP, мобільний додаток, D2C бренд, newsletter. Тестуй гіпотезу — запускай за 3 дні від £299.`
      : `${STARTUP_SOLUTIONS.length}+ ready-made startup landing pages. SaaS waitlist, MVP, mobile app, D2C brand, newsletter. Test your hypothesis — launch in 3 days from £299.`,
    alternates: buildAlternates(lang, "startup"),
    openGraph: {
      title: isUk
        ? "Готові лендінги для стартапів — Codeworth"
        : "Startup Landing Pages — Codeworth",
      description: isUk
        ? "Тестуй гіпотезу і запускай за 3 дні від £299."
        : "Test your hypothesis and launch in 3 days from £299.",
      type: "website",
      url: `https://codeworth.uk/${lang}/startup`,
      images: [{ url: "/og/startup.png", width: 1200, height: 630, alt: isUk ? "Стартап лендінги Codeworth" : "Codeworth Startup Landings" }],
    },
  };
}

const CATEGORIES = Array.from(new Set(STARTUP_SOLUTIONS.map((s) => s.category))) as StartupCategory[];

export default async function StartupPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isUk = lang === "uk";
  const lp = (path: string) => `/${lang}${path}`;
  const CATEGORY_LABELS = isUk ? STARTUP_CATEGORY_LABELS_UK : STARTUP_CATEGORY_LABELS_EN;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-gray-950 via-indigo-950 to-violet-950 text-white">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-white/20">
                🚀 {isUk ? "Стартап рішення" : "Startup Solutions"}
              </div>
              <h1 className="text-5xl lg:text-6xl font-heading font-extrabold mb-6 leading-tight">
                {isUk ? "Запусти стартап за 3 дні" : "Launch Your Startup in 3 Days"}
              </h1>
              <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
                {isUk
                  ? "Готові лендінги для тестування гіпотез, залучення перших користувачів та інвесторів. Не трать місяці на розробку — тестуй швидко."
                  : "Ready-made landing pages to test hypotheses, attract first users and investors. Don't spend months building — test fast."}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 mb-10 text-sm">
                <span className="flex items-center gap-1.5 bg-white/10 border border-white/20 px-4 py-2 rounded-full">
                  <Zap className="w-4 h-4 text-amber-400" />
                  {STARTUP_SOLUTIONS.length}+ {isUk ? "шаблонів" : "templates"}
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 border border-white/20 px-4 py-2 rounded-full">
                  💰 {isUk ? "від £299" : "from £299"}
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 border border-white/20 px-4 py-2 rounded-full">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  {isUk ? "запуск за 3–7 днів" : "launch in 3–7 days"}
                </span>
              </div>
              <Link
                href={lp("/contact")}
                className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-8 py-4 rounded-2xl hover:bg-white/90 transition-colors text-lg shadow-lg"
              >
                {isUk ? "Замовити консультацію" : "Book a Free Consultation"}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </Container>
        </section>

        {/* What makes startups different */}
        <section className="py-16 bg-white border-b border-neutral-100">
          <Container>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-heading font-extrabold text-neutral-900 mb-3">
                {isUk ? "Чому стартапам потрібен окремий підхід?" : "Why Do Startups Need a Different Approach?"}
              </h2>
              <p className="text-neutral-500">
                {isUk
                  ? "Нішеві сайти для ресторанів та салонів — одне. Стартап-лендінг для тестування гіпотези — зовсім інше."
                  : "Niche sites for restaurants and salons are one thing. Startup landings for hypothesis testing are completely different."}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: "🎯",
                  title: isUk ? "Тестуй гіпотезу" : "Test Your Hypothesis",
                  desc: isUk
                    ? "Кожен шаблон побудований навколо ключової метрики. Дізнайся чи хочуть люди твій продукт — до того як витрачати гроші на розробку."
                    : "Every template is built around a key metric. Find out if people want your product — before spending money on development.",
                },
                {
                  icon: "⚡",
                  title: isUk ? "Швидко і дешево" : "Fast and Affordable",
                  desc: isUk
                    ? "3–7 днів замість 3–8 тижнів. £299–£599 замість £5,000+. Ідеально для pre-seed стадії."
                    : "3–7 days instead of 3–8 weeks. £299–£599 instead of £5,000+. Perfect for pre-seed stage.",
                },
                {
                  icon: "📈",
                  title: isUk ? "Вбудована аналітика" : "Analytics Built-in",
                  desc: isUk
                    ? "GA4 events, conversion tracking, heatmaps — все налаштовано. Одразу бачиш що працює."
                    : "GA4 events, conversion tracking, heatmaps — all configured. See immediately what works.",
                },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-indigo-200 hover:shadow-sm transition-all">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-neutral-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Solutions grid */}
        <section className="py-20 bg-neutral-50">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                {isUk ? "Готові рішення" : "Ready Solutions"}
              </p>
              <h2 className="text-4xl font-heading font-extrabold text-neutral-900">
                {isUk ? "Обери тип стартапу" : "Choose Your Startup Type"}
              </h2>
            </div>

            {/* Category filters row */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {CATEGORIES.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-white border border-neutral-200 text-neutral-600"
                >
                  {CATEGORY_LABELS[cat]}
                </span>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {STARTUP_SOLUTIONS.map((solution) => (
                <Link
                  key={solution.slug}
                  href={lp(`/startup/${solution.slug}`)}
                  className="group bg-white rounded-2xl border border-neutral-200 hover:border-indigo-300 hover:shadow-md transition-all overflow-hidden flex flex-col"
                >
                  {/* Top accent */}
                  <div className={`h-2 ${solution.color}`} />

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span className="text-3xl">{solution.icon}</span>
                      <span className="text-xs bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-full font-medium shrink-0">
                        {CATEGORY_LABELS[solution.category]}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-neutral-900 text-lg mb-1 group-hover:text-indigo-700 transition-colors">
                      {solution.titleEn}
                    </h3>
                    <p className={`text-sm font-semibold mb-3 ${solution.textColor}`}>
                      {isUk ? solution.tagline : solution.taglineEn}
                    </p>
                    <p className="text-sm text-neutral-500 leading-relaxed flex-1 mb-4">
                      {isUk ? solution.description : solution.descriptionEn}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                      <div className="flex items-center gap-3 text-xs text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {solution.deliveryDays} {isUk ? "днів" : "days"}
                        </span>
                        <span className="font-semibold text-neutral-800">
                          {isUk ? `від £${solution.priceFrom}` : `from £${solution.priceFrom}`}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:gap-2 transition-all">
                        {isUk ? "Детальніше" : "View"} <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-indigo-600 to-violet-700 text-white">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-heading font-extrabold mb-4">
                {isUk ? "Не знаєш з чого почати?" : "Not Sure Where to Start?"}
              </h2>
              <p className="text-indigo-200 mb-8 leading-relaxed">
                {isUk
                  ? "Розкажи про свій стартап — ми підберемо найкраще рішення і розробимо лендінг за 3–7 днів."
                  : "Tell us about your startup — we'll find the best solution and build your landing in 3–7 days."}
              </p>
              <Link
                href={lp("/contact?source=startup")}
                className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-8 py-4 rounded-2xl hover:bg-white/90 transition-colors shadow-lg"
              >
                {isUk ? "Безкоштовна консультація" : "Free Consultation"}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </div>
  );
}
