import type { Metadata } from "next";
import Link from "next/link";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { CTASection } from "@/components/home/CTASection";
import {
  Warehouse, UtensilsCrossed, HardHat, ShoppingBag, Briefcase,
  ArrowRight, Database, Workflow, Rocket, CheckCircle2, FileSpreadsheet,
  Layers, Network, ShieldCheck,
} from "lucide-react";

const CASES = [
  { slug: "erp-wholesale", icon: Warehouse, name: "WholesaleHub", sector: { en: "Wholesale distributor · Birmingham", uk: "Оптовий дистриб'ютор · Бірмінгем" }, metric: { en: "Order time 25 → 7 min", uk: "Час замовлення 25 → 7 хв" }, colour: "from-slate-600 to-slate-800" },
  { slug: "erp-restaurant-chain", icon: UtensilsCrossed, name: "ChainOps", sector: { en: "8-venue restaurant group · Manchester", uk: "Мережа 8 ресторанів · Манчестер" }, metric: { en: "Food waste −34%", uk: "Списання −34%" }, colour: "from-orange-600 to-red-700" },
  { slug: "erp-construction", icon: HardHat, name: "BuildTrack", sector: { en: "Housebuilder · Leeds", uk: "Забудовник · Лідс" }, metric: { en: "CIS: 2 days → 15 min", uk: "CIS: 2 дні → 15 хв" }, colour: "from-amber-600 to-yellow-700" },
  { slug: "erp-retail-chain", icon: ShoppingBag, name: "RetailCore", sector: { en: "12-store fashion chain · London", uk: "Мережа 12 магазинів · Лондон" }, metric: { en: "Sell-through +19%", uk: "Sell-through +19%" }, colour: "from-violet-600 to-purple-700" },
  { slug: "erp-agency", icon: Briefcase, name: "AgencyDesk", sector: { en: "Digital agency · Edinburgh", uk: "Digital-агенція · Единбург" }, metric: { en: "Admin 12% → 3%", uk: "Адмін 12% → 3%" }, colour: "from-cyan-600 to-teal-700" },
];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk
      ? "Розробка ERP-систем під бізнес | Codeworth"
      : "Custom ERP Development for UK Business | Codeworth",
    description: isUk
      ? "Розробка кастомних ERP-систем для британського бізнесу: склад, фінанси, персонал, проєкти. Заміна Excel на єдину систему. 5 реальних кейсів. Від £1999."
      : "Custom ERP systems for UK SMB: warehouse, finance, staff, projects in one place. Replace spreadsheets with a system built for you. 5 real cases. From £1,999.",
    keywords: isUk
      ? ["розробка ERP", "ERP система під бізнес", "кастомна ERP", "автоматизація бізнесу"]
      : ["custom ERP development", "bespoke ERP UK", "ERP system development", "business management software UK"],
    alternates: buildAlternates(lang, "erp-development"),
    openGraph: {
      title: isUk ? "Розробка ERP-систем під бізнес — Codeworth" : "Custom ERP Development for UK Business — Codeworth",
      description: isUk
        ? "Кастомні ERP-системи для британського бізнесу. 5 реальних кейсів. Від £1999."
        : "Bespoke ERP systems for UK business. 5 real cases. From £1,999.",
      type: "website",
      url: `https://codeworth.uk${lang === "en" ? "" : "/" + lang}/erp-development`,
      images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Codeworth ERP Development" }],
    },
  };
}

export default async function ErpDevelopmentPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isUk = lang === "uk";
  const lp = (p: string) => (lang === "en" ? p : `/${lang}${p}`);

  const PAINS = [
    { icon: FileSpreadsheet, en: "Data scattered across spreadsheets", uk: "Дані розкидані по таблицях Excel" },
    { icon: Network, en: "Disconnected tools that don't talk to each other", uk: "Розрізнені інструменти, що не зв'язані між собою" },
    { icon: Layers, en: "Manual re-keying, duplicated effort, human error", uk: "Ручне перенесення даних, дублювання, помилки" },
    { icon: ShieldCheck, en: "No single source of truth for decisions", uk: "Немає єдиного джерела правди для рішень" },
  ];

  const PROCESS = [
    { icon: Workflow, n: "01", en: "Discovery & process mapping", uk: "Аналіз та мапування процесів", desc: { en: "We sit with your team, map every workflow, and find what to automate first.", uk: "Сідаємо з вашою командою, мапуємо процеси, визначаємо що автоматизувати першим." } },
    { icon: Database, n: "02", en: "Build on a solid stack", uk: "Розробка на надійному стеку", desc: { en: "Next.js + PostgreSQL + Prisma. Real-time, secure, scales with you.", uk: "Next.js + PostgreSQL + Prisma. Real-time, безпечно, масштабується." } },
    { icon: Rocket, n: "03", en: "Deploy, train, support", uk: "Запуск, навчання, підтримка", desc: { en: "We migrate your data, train your staff, and stay on for support.", uk: "Переносимо дані, навчаємо персонал, лишаємось на підтримці." } },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-1">

        {/* HERO */}
        <section className="relative pt-32 pb-20 bg-neutral-950 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <Container className="relative">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-5">
                <Database className="w-3.5 h-3.5" />
                {isUk ? "ERP-розробка під ключ" : "Bespoke ERP Development"}
              </div>
              <h1 className="text-4xl sm:text-5xl font-heading font-extrabold leading-tight">
                {isUk
                  ? "Кастомні ERP-системи для вашого бізнесу"
                  : "Custom ERP systems built around your business"}
              </h1>
              <p className="mt-5 text-lg text-neutral-300 leading-relaxed">
                {isUk
                  ? "Замініть Excel і розрізнені інструменти єдиною системою: склад, фінанси, персонал, проєкти — в одному місці, в реальному часі."
                  : "Replace spreadsheets and disconnected tools with one system: warehouse, finance, staff and projects — in one place, in real time."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={lp("/contact")} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold transition-colors">
                  {isUk ? "Обговорити проєкт" : "Discuss your project"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#cases" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 font-semibold transition-colors">
                  {isUk ? "5 реальних кейсів" : "See 5 real cases"}
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* PAIN POINTS */}
        <section className="py-20 bg-white dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-800">
          <Container>
            <div className="max-w-2xl mb-12">
              <h2 className="text-3xl font-heading font-extrabold text-neutral-900 dark:text-white">
                {isUk ? "Знайомо?" : "Sound familiar?"}
              </h2>
              <p className="mt-3 text-neutral-500 dark:text-neutral-400">
                {isUk ? "Більшість бізнесів переростають таблиці — але не знають, з чого почати." : "Most growing businesses outgrow spreadsheets — but don't know where to start."}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PAINS.map((p) => (
                <div key={p.en} className="p-5 rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                  <p.icon className="w-7 h-7 text-indigo-500 mb-3" />
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200">{isUk ? p.uk : p.en}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CASES */}
        <section id="cases" className="py-20 bg-neutral-50 dark:bg-neutral-900">
          <Container>
            <div className="max-w-2xl mb-12">
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">{isUk ? "Кейси" : "Case studies"}</p>
              <h2 className="text-3xl font-heading font-extrabold text-neutral-900 dark:text-white">
                {isUk ? "5 ERP-систем, які ми побудували" : "5 ERP systems we've built"}
              </h2>
              <p className="mt-3 text-neutral-500 dark:text-neutral-400">
                {isUk ? "Кожна — з живим інтерактивним демо. Натисніть, щоб спробувати." : "Each with a live interactive demo. Click through to try them."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CASES.map((c) => (
                <Link key={c.slug} href={lp(`/portfolio/${c.slug}`)} className="group rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className={`h-28 bg-gradient-to-br ${c.colour} flex items-center justify-center`}>
                    <c.icon className="w-12 h-12 text-white/90" strokeWidth={1.5} />
                  </div>
                  <div className="p-5">
                    <div className="font-heading font-bold text-lg text-neutral-900 dark:text-white">{c.name}</div>
                    <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">{isUk ? c.sector.uk : c.sector.en}</div>
                    <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      {isUk ? c.metric.uk : c.metric.en}
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:gap-2.5 transition-all">
                      {isUk ? "Кейс + живе демо" : "Case + live demo"}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* PROCESS */}
        <section className="py-20 bg-white dark:bg-neutral-950">
          <Container>
            <div className="max-w-2xl mb-12">
              <h2 className="text-3xl font-heading font-extrabold text-neutral-900 dark:text-white">
                {isUk ? "Як ми працюємо" : "How we work"}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PROCESS.map((s) => (
                <div key={s.n} className="relative p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                  <div className="absolute top-5 right-5 text-3xl font-heading font-black text-neutral-100 dark:text-neutral-800">{s.n}</div>
                  <s.icon className="w-8 h-8 text-indigo-500 mb-4" />
                  <h3 className="font-heading font-bold text-neutral-900 dark:text-white">{isUk ? s.uk : s.en}</h3>
                  <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{isUk ? s.desc.uk : s.desc.en}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* PRICING / TECH STRIP */}
        <section className="py-16 bg-neutral-950 text-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-heading font-extrabold">
                  {isUk ? "Прозоре ціноутворення" : "Transparent pricing"}
                </h2>
                <p className="mt-3 text-neutral-300">
                  {isUk
                    ? "Вартість залежить від складності процесів. Точну оцінку даємо після безкоштовного discovery-дзвінка."
                    : "Cost depends on process complexity. We give a firm quote after a free discovery call."}
                </p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-sm text-neutral-400">{isUk ? "від" : "from"}</span>
                  <span className="text-4xl font-heading font-black">£1,999</span>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Next.js", "PostgreSQL", "Prisma", "TypeScript", "Tailwind CSS"].map((t) => (
                    <span key={t} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm">{t}</span>
                  ))}
                </div>
                <Link href={lp("/contact")} className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold transition-colors">
                  {isUk ? "Замовити безкоштовну оцінку" : "Get a free estimate"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: "£1,999+", l: isUk ? "стартовий проєкт" : "starter project" },
                  { v: "4–12", l: isUk ? "тижнів розробки" : "weeks to build" },
                  { v: "100%", l: isUk ? "власність коду" : "you own the code" },
                  { v: "EN + UA", l: isUk ? "підтримка" : "support" },
                ].map((k) => (
                  <div key={k.l} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-2xl font-heading font-black">{k.v}</div>
                    <div className="text-xs text-neutral-400 mt-1">{k.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <CTASection lang={lang} />
      </main>
      <Footer />
    </div>
  );
}
