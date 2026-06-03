import type { Metadata } from "next";
import Link from "next/link";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { CTASection } from "@/components/home/CTASection";
import { ERPRoiCalculator } from "@/components/erp/ERPRoiCalculator";
import { ERPDiscoverySection } from "@/components/erp/ERPDiscoverySection";
import {
  Warehouse, UtensilsCrossed, HardHat, ShoppingBag, Briefcase, Stethoscope, Truck,
  ArrowRight, Database, Workflow, Rocket, CheckCircle2, FileSpreadsheet,
  Layers, Network, ShieldCheck, Users, BarChart3, FileText, Plug2,
  ClipboardList, Banknote, ChevronDown,
} from "lucide-react";

const MODULES = [
  { icon: Warehouse, en: "Warehouse & Inventory", uk: "Склад та інвентар", desc: { en: "Real-time stock levels, multi-location, barcode/QR scanning, automated reorder points.", uk: "Залишки в реальному часі, мультискладність, штрих-коди/QR, автозамовлення." } },
  { icon: Banknote, en: "Finance & Accounting", uk: "Фінанси та бухгалтерія", desc: { en: "Invoicing, expense tracking, P&L, VAT returns, MTD-ready reports.", uk: "Інвойсинг, витрати, P&L, ПДВ, MTD-звіти для HMRC." } },
  { icon: Users, en: "HR & Payroll", uk: "Персонал та зарплата", desc: { en: "Employee records, timesheets, holiday/sick tracking, payroll integration.", uk: "Картки співробітників, табелі, відпустки/лікарняні, інтеграція з payroll." } },
  { icon: ClipboardList, en: "Projects & Tasks", uk: "Проєкти та задачі", desc: { en: "Project budgets, Gantt views, time logging, profitability per job.", uk: "Бюджет проєкту, Gantt, трекінг часу, рентабельність по кожному замовленню." } },
  { icon: Network, en: "CRM & Sales Pipeline", uk: "CRM та продажі", desc: { en: "Leads, quotes, pipeline stages, email history, customer portal.", uk: "Ліди, комерційні пропозиції, стадії угоди, листування, портал клієнта." } },
  { icon: BarChart3, en: "Analytics & Dashboards", uk: "Аналітика та дашборди", desc: { en: "Custom KPI boards, drill-down reports, export to Excel/PDF.", uk: "Власні KPI-борди, drill-down звіти, експорт у Excel/PDF." } },
  { icon: FileText, en: "Document Management", uk: "Документообіг", desc: { en: "Contracts, PDFs, version history, e-signature, audit trail.", uk: "Договори, PDF, версіонування, електронний підпис, журнал дій." } },
  { icon: Plug2, en: "API & Integrations", uk: "API та інтеграції", desc: { en: "Connect Xero, QuickBooks, Stripe, Shopify, Royal Mail, or any REST API.", uk: "Підключення Xero, QuickBooks, Stripe, Shopify, Royal Mail чи будь-якого REST API." } },
];

const COMPARE = [
  { feature: { en: "Price", uk: "Ціна" }, custom: { en: "From £1,999 — pay only for what you need", uk: "Від £1,999 — платите тільки за потрібне" }, shelf: { en: "£500–£5,000+/mo licences forever", uk: "£500–£5,000+/міс ліцензій назавжди" } },
  { feature: { en: "Ownership", uk: "Право власності" }, custom: { en: "100% yours — code, data, hosting", uk: "100% ваше — код, дані, хостинг" }, shelf: { en: "Vendor lock-in, data held elsewhere", uk: "Залежність від вендора, дані на чужих серверах" } },
  { feature: { en: "Fit to your process", uk: "Відповідність процесам" }, custom: { en: "Built exactly around how you work", uk: "Побудовано під ваш реальний процес" }, shelf: { en: "You adapt your process to the software", uk: "Адаптуєте процеси під програму" } },
  { feature: { en: "Scalability", uk: "Масштабованість" }, custom: { en: "Add modules as you grow, no extra licence", uk: "Додаєте модулі з ростом, без нових ліцензій" }, shelf: { en: "Tier upgrades, add-on fees", uk: "Апгрейд тарифу, додаткові тарифи за модулі" } },
  { feature: { en: "Integration", uk: "Інтеграції" }, custom: { en: "We integrate any tool you already use", uk: "Інтегруємо будь-який інструмент, яким ви вже користуєтесь" }, shelf: { en: "Only certified partner integrations", uk: "Тільки сертифіковані партнерські інтеграції" } },
  { feature: { en: "Support", uk: "Підтримка" }, custom: { en: "Direct access to the dev team (EN + UA)", uk: "Прямий доступ до команди розробників (EN + UA)" }, shelf: { en: "Ticketing queue, often overseas", uk: "Черга тікетів, часто закордонна підтримка" } },
];

const FAQS = [
  {
    q: { en: "How long does it take to build a custom ERP?", uk: "Скільки часу займає розробка кастомної ERP?" },
    a: { en: "Most projects take 4–12 weeks depending on the number of modules and integrations. A focused MVP (e.g. inventory + invoicing) can be live in 4 weeks.", uk: "Більшість проєктів займають 4–12 тижнів залежно від кількості модулів та інтеграцій. Фокусний MVP (наприклад, склад + інвойсинг) можна запустити за 4 тижні." },
  },
  {
    q: { en: "Can you migrate data from our spreadsheets / old system?", uk: "Чи можете ви перенести дані з наших таблиць / старої системи?" },
    a: { en: "Yes. We handle data migration as part of every project — cleaning, mapping, and importing your existing records into the new system before go-live.", uk: "Так. Перенесення даних входить до кожного проєкту — очищення, маппінг і імпорт ваших поточних записів до нової системи перед запуском." },
  },
  {
    q: { en: "Do I own the source code?", uk: "Чи маю я права на вихідний код?" },
    a: { en: "Yes, fully. You receive the complete repository. We can continue maintaining it, or you can hand it to any developer.", uk: "Так, повністю. Ви отримуєте повний репозиторій. Ми можемо продовжити підтримку, або ви можете передати його будь-якому розробнику." },
  },
  {
    q: { en: "What tech stack do you use?", uk: "Який технологічний стек ви використовуєте?" },
    a: { en: "Next.js (React), PostgreSQL, Prisma ORM, TypeScript, Tailwind CSS. Hosted on your server or cloud of choice. All open-source, battle-tested technologies.", uk: "Next.js (React), PostgreSQL, Prisma ORM, TypeScript, Tailwind CSS. Розміщення на вашому сервері або обраному хмарному провайдері. Весь стек open-source." },
  },
  {
    q: { en: "Can the ERP integrate with our existing tools (Xero, Shopify, etc.)?", uk: "Чи може ERP інтегруватися з нашими поточними інструментами (Xero, Shopify тощо)?" },
    a: { en: "Absolutely. We integrate with any REST API — Xero, QuickBooks, Stripe, Shopify, Royal Mail, and more. If it has an API, we can connect it.", uk: "Так. Інтегруємо з будь-яким REST API — Xero, QuickBooks, Stripe, Shopify, Royal Mail та ін. Якщо є API — підключимо." },
  },
  {
    q: { en: "What does a free discovery call include?", uk: "Що входить у безкоштовний discovery-дзвінок?" },
    a: { en: "A 30–45 minute call where we map your current workflow, identify the biggest pain points, and give you a rough scope and price estimate — no obligation.", uk: "30–45 хвилин, де ми аналізуємо ваш поточний процес, визначаємо ключові болі та даємо приблизні обсяг і оцінку вартості — без зобов'язань." },
  },
];

const CASES = [
  { slug: "erp-wholesale", icon: Warehouse, name: "WholesaleHub", sector: { en: "Wholesale distributor · Birmingham", uk: "Оптовий дистриб'ютор · Бірмінгем" }, metric: { en: "Order time 25 → 7 min", uk: "Час замовлення 25 → 7 хв" }, colour: "from-slate-600 to-slate-800" },
  { slug: "erp-restaurant-chain", icon: UtensilsCrossed, name: "ChainOps", sector: { en: "8-venue restaurant group · Manchester", uk: "Мережа 8 ресторанів · Манчестер" }, metric: { en: "Food waste −34%", uk: "Списання −34%" }, colour: "from-orange-600 to-red-700" },
  { slug: "erp-construction", icon: HardHat, name: "BuildTrack", sector: { en: "Housebuilder · Leeds", uk: "Забудовник · Лідс" }, metric: { en: "CIS: 2 days → 15 min", uk: "CIS: 2 дні → 15 хв" }, colour: "from-amber-600 to-yellow-700" },
  { slug: "erp-retail-chain", icon: ShoppingBag, name: "RetailCore", sector: { en: "12-store fashion chain · London", uk: "Мережа 12 магазинів · Лондон" }, metric: { en: "Sell-through +19%", uk: "Sell-through +19%" }, colour: "from-violet-600 to-purple-700" },
  { slug: "erp-agency", icon: Briefcase, name: "AgencyDesk", sector: { en: "Digital agency · Edinburgh", uk: "Digital-агенція · Единбург" }, metric: { en: "Admin 12% → 3%", uk: "Адмін 12% → 3%" }, colour: "from-cyan-600 to-teal-700" },
  { slug: "erp-clinic", icon: Stethoscope, name: "CareHub", sector: { en: "4-site private clinic group · Bristol", uk: "Мережа 4 клінік · Брістоль" }, metric: { en: "Bookings +42%, zero conflicts", uk: "Запис +42%, нуль конфліктів" }, colour: "from-sky-600 to-blue-700" },
  { slug: "erp-logistics", icon: Truck, name: "FleetDesk", sector: { en: "38-truck haulier · Leicester", uk: "Перевізник 38 тягачів · Лестер" }, metric: { en: "SLA misses −74%, pick acc. 99.4%", uk: "SLA −74%, точність пікінгу 99.4%" }, colour: "from-orange-600 to-amber-700" },
];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk
      ? "Розробка ERP-систем під бізнес | Codeworth"
      : "Custom ERP Development for UK Business | Codeworth",
    description: isUk
      ? "Розробка кастомних ERP-систем для британського бізнесу: склад, фінанси, персонал, проєкти. Заміна Excel на єдину систему. 7 реальних кейсів. Від £1999."
      : "Custom ERP systems for UK SMB: warehouse, finance, staff, projects in one place. Replace spreadsheets with a system built for you. 7 real cases. From £1,999.",
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
                  {isUk ? "7 реальних кейсів" : "See 7 real cases"}
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

        {/* MODULES */}
        <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
          <Container>
            <div className="max-w-2xl mb-12">
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">{isUk ? "Що входить" : "What's included"}</p>
              <h2 className="text-3xl font-heading font-extrabold text-neutral-900 dark:text-white">
                {isUk ? "Модулі ERP-системи" : "ERP modules we build"}
              </h2>
              <p className="mt-3 text-neutral-500 dark:text-neutral-400">
                {isUk
                  ? "Підбираємо тільки потрібні модулі — не платите за зайве. Кожен інтегрований між собою з єдиною базою даних."
                  : "We pick only the modules you need — no bloat. Every module shares one database and talks to the others."}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {MODULES.map((m) => (
                <div key={m.en} className="p-5 rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-800">
                  <m.icon className="w-7 h-7 text-indigo-500 mb-3" />
                  <h3 className="font-heading font-bold text-sm text-neutral-900 dark:text-white mb-1">{isUk ? m.uk : m.en}</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{isUk ? m.desc.uk : m.desc.en}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ROI CALCULATOR */}
        <ERPRoiCalculator lang={lang} />

        {/* CASES */}
        <section id="cases" className="py-20 bg-white dark:bg-neutral-950">
          <Container>
            <div className="max-w-2xl mb-12">
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">{isUk ? "Кейси" : "Case studies"}</p>
              <h2 className="text-3xl font-heading font-extrabold text-neutral-900 dark:text-white">
                {isUk ? "7 ERP-систем, які ми побудували" : "7 ERP systems we've built"}
              </h2>
              <p className="mt-3 text-neutral-500 dark:text-neutral-400">
                {isUk ? "Кожна — з живим інтерактивним демо. Натисніть, щоб спробувати." : "Each with a live interactive demo. Click through to try them."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CASES.map((c) => (
                <Link key={c.slug} href={lp(`/portfolio/${c.slug}`)} className="group rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className={`h-28 bg-linear-to-br ${c.colour} flex items-center justify-center`}>
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

        {/* CUSTOM VS SHELF */}
        <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
          <Container>
            <div className="max-w-2xl mb-12">
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">{isUk ? "Порівняння" : "Comparison"}</p>
              <h2 className="text-3xl font-heading font-extrabold text-neutral-900 dark:text-white">
                {isUk ? "Кастомна ERP vs SAP / Sage / Dynamics" : "Custom ERP vs SAP / Sage / Dynamics 365"}
              </h2>
              <p className="mt-3 text-neutral-500 dark:text-neutral-400">
                {isUk
                  ? "Готові системи підходять великим корпораціям. Для бізнесу до 200 людей кастомне рішення дешевше і точніше."
                  : "Off-the-shelf works for large enterprises. For businesses under 200 people, a custom system is cheaper and a better fit."}
              </p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-neutral-100 dark:border-neutral-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-neutral-100 dark:bg-neutral-800">
                    <th className="text-left px-5 py-3 font-semibold text-neutral-500 dark:text-neutral-400 w-1/3">{isUk ? "Критерій" : "Feature"}</th>
                    <th className="text-left px-5 py-3 font-semibold text-indigo-600 dark:text-indigo-400">{isUk ? "Codeworth Custom" : "Codeworth Custom"}</th>
                    <th className="text-left px-5 py-3 font-semibold text-neutral-400">{isUk ? "Готова система" : "Off-the-shelf"}</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((row, i) => (
                    <tr key={i} className="border-t border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 odd:bg-neutral-50 odd:dark:bg-neutral-850">
                      <td className="px-5 py-4 font-medium text-neutral-700 dark:text-neutral-300">{isUk ? row.feature.uk : row.feature.en}</td>
                      <td className="px-5 py-4 text-neutral-700 dark:text-neutral-200">
                        <span className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          {isUk ? row.custom.uk : row.custom.en}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-neutral-400">{isUk ? row.shelf.uk : row.shelf.en}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

        {/* FAQ */}
        <section className="py-20 bg-white dark:bg-neutral-950">
          <Container>
            <div className="max-w-2xl mb-12">
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">FAQ</p>
              <h2 className="text-3xl font-heading font-extrabold text-neutral-900 dark:text-white">
                {isUk ? "Часті запитання" : "Frequently asked questions"}
              </h2>
            </div>
            <div className="max-w-3xl space-y-3">
              {FAQS.map((faq, i) => (
                <details key={i} className="group rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 open:border-indigo-200 dark:open:border-indigo-800 transition-colors">
                  <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer font-semibold text-neutral-900 dark:text-white list-none">
                    {isUk ? faq.q.uk : faq.q.en}
                    <ChevronDown className="w-5 h-5 text-neutral-400 group-open:rotate-180 transition-transform shrink-0" />
                  </summary>
                  <p className="px-6 pb-5 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {isUk ? faq.a.uk : faq.a.en}
                  </p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        {/* RELATED CONTENT */}
        <section className="py-16 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">
          <Container>
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-8">{isUk ? "Пов'язані матеріали" : "Further reading"}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
              <Link href={lp("/use-cases/erp-wholesale-order-time")} className="group p-5 rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-800 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <div className="text-2xl mb-3">🏭</div>
                <h3 className="font-heading font-bold text-neutral-900 dark:text-white text-sm leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {isUk
                    ? "Як оптовик з Бірмінгема скоротив час замовлення на 72%"
                    : "How a Birmingham wholesaler cut order time 72%"}
                </h3>
                <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">{isUk ? "Кейс · Use case" : "Case study · Use case"}</p>
              </Link>
              <Link href={lp("/blog/custom-erp-uk-cost-timeline")} className="group p-5 rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-800 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <div className="text-2xl mb-3">📖</div>
                <h3 className="font-heading font-bold text-neutral-900 dark:text-white text-sm leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {isUk
                    ? "Кастомна ERP для UK SMB: вартість, терміни та чого очікувати"
                    : "Custom ERP for UK SMB — cost, timeline, what to expect"}
                </h3>
                <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">{isUk ? "Стаття · 11 хв читання" : "Article · 11 min read"}</p>
              </Link>
            </div>
          </Container>
        </section>

        {/* DISCOVERY CALL */}
        <ERPDiscoverySection lang={lang} />

        <CTASection lang={lang} />
      </main>
      <Footer />
    </div>
  );
}
