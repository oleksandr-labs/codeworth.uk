import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { CTASection } from "@/components/home/CTASection";
import { CountUp } from "@/components/ui/CountUp";
import {
  Target, Heart, Users, Lightbulb, CheckCircle,
  ArrowRight, Code2, Figma, Database, Globe, Zap
} from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk ? "Про нас — Codeworth" : "About Us — Codeworth",
    description: isUk
      ? "Дізнайтеся більше про команду Codeworth — веб-студію повного циклу. Наша місія, цінності, методологія та технічний стек."
      : "Learn more about the Codeworth team — a full-cycle web studio. Our mission, values, methodology, and tech stack.",
    alternates: buildAlternates(lang, 'about'),
    openGraph: {
      title: isUk ? "Про нас — Codeworth" : "About Us — Codeworth",
      description: isUk
        ? "Дізнайтеся більше про команду Codeworth — веб-студію повного циклу. Наша місія, цінності та технічний стек."
        : "Learn more about the Codeworth team — a full-cycle web studio. Our mission, values, and tech stack.",
      type: "website",
      url: `https://codeworth.uk/${lang}/about`,
      images: [{ url: "/og/about.png", width: 1200, height: 630, alt: "Codeworth Team" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isUk ? "Про нас — Codeworth" : "About Us — Codeworth",
      description: isUk ? "Команда Codeworth — веб-студія повного циклу в Україні." : "Codeworth team — full-cycle web studio.",
      images: ["/og/about.png"],
    },
  };
}

const VALUES_UK = [
  { icon: Target, title: "Результат", description: "Ми не продаємо красивий дизайн заради дизайну. Кожне рішення — для досягнення конкретного бізнес-результату." },
  { icon: Heart, title: "Чесність", description: "Кажемо правду навіть якщо вона незручна. Не беремо проєкти, в яких не впевнені." },
  { icon: Lightbulb, title: "Якість", description: "Чистий код, pixel-perfect дизайн, детальне тестування. Ніяких shortcuts." },
  { icon: Users, title: "Партнерство", description: "Ми не підрядник — ми партнер. Ваш бізнес росте — ми разом." },
];

const VALUES_EN = [
  { icon: Target, title: "Results", description: "We don't sell pretty design for design's sake. Every decision is made to achieve a concrete business outcome." },
  { icon: Heart, title: "Honesty", description: "We tell the truth even when it's uncomfortable. We don't take on projects we're not confident in." },
  { icon: Lightbulb, title: "Quality", description: "Clean code, pixel-perfect design, thorough testing. No shortcuts." },
  { icon: Users, title: "Partnership", description: "We're not a contractor — we're a partner. Your business grows — we grow together." },
];

const TIMELINE_UK = [
  { year: "2021", title: "Заснування", text: "Перші фріланс-проєкти. Перша команда з 2 осіб." },
  { year: "2022", title: "Перші проєкти", text: "Перший корпоративний сайт, перший e-commerce проєкт." },
  { year: "2023", title: "Студія", text: "Реєстрація студії, розширення до 5 спеціалістів, 60+ шаблонів." },
  { year: "2024", title: "Маркетплейс", text: "Запуск маркетплейсу готових нішевих рішень, 120+ шаблонів." },
  { year: "2025", title: "Codeworth 2.0", text: "Новий сайт, нові продукти, масштабування команди." },
];

const TIMELINE_EN = [
  { year: "2021", title: "Founded", text: "First freelance projects. First team of 2." },
  { year: "2022", title: "First Projects", text: "First corporate website, first e-commerce project." },
  { year: "2023", title: "Studio", text: "Official registration, expanded to 5 specialists, 60+ templates." },
  { year: "2024", title: "Marketplace", text: "Launched marketplace of niche ready-made solutions, 120+ templates." },
  { year: "2025", title: "Codeworth 2.0", text: "New website, new products, team scaling." },
];

const TECH_STACK = [
  { name: "Next.js", color: "bg-black text-white" },
  { name: "TypeScript", color: "bg-blue-600 text-white" },
  { name: "React", color: "bg-cyan-500 text-white" },
  { name: "Tailwind CSS", color: "bg-teal-500 text-white" },
  { name: "PostgreSQL", color: "bg-blue-800 text-white" },
  { name: "Prisma", color: "bg-indigo-700 text-white" },
  { name: "Sanity CMS", color: "bg-red-500 text-white" },
  { name: "Figma", color: "bg-purple-600 text-white" },
  { name: "Vercel", color: "bg-neutral-900 text-white" },
  { name: "Node.js", color: "bg-green-600 text-white" },
  { name: "Framer Motion", color: "bg-pink-600 text-white" },
  { name: "Stripe", color: "bg-violet-600 text-white" },
];

const STATS_UK = [
  { end: 2021, suffix: "", label: "Рік заснування" },
  { end: 120, suffix: "+", label: "Готових шаблонів" },
  { end: 60, suffix: "+", label: "Ніш" },
  { end: 8, suffix: "", label: "Спеціалістів" },
];

const STATS_EN = [
  { end: 2021, suffix: "", label: "Founded" },
  { end: 120, suffix: "+", label: "Ready Templates" },
  { end: 60, suffix: "+", label: "Niches" },
  { end: 8, suffix: "", label: "Specialists" },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Codeworth",
  url: "https://codeworth.uk",
  logo: "https://codeworth.uk/logo.svg",
  description: "Веб-студія повного циклу — розробка сайтів, SEO, дизайн та маркетплейс готових рішень для бізнесу в Україні.",
  foundingDate: "2021",
  numberOfEmployees: { "@type": "QuantitativeValue", value: 8 },
  address: { "@type": "PostalAddress", addressLocality: "Київ", addressCountry: "UA" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hello@codeworth.uk",
    availableLanguage: ["Ukrainian", "English"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Головна", item: "https://codeworth.uk" },
    { "@type": "ListItem", position: 2, name: "Про нас" },
  ],
};

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isUk = lang === "uk";
  const VALUES = isUk ? VALUES_UK : VALUES_EN;
  const TIMELINE = isUk ? TIMELINE_UK : TIMELINE_EN;
  const STATS = isUk ? STATS_UK : STATS_EN;
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-20 gradient-hero relative overflow-hidden">
          <div className="absolute -top-40 right-0 w-125 h-125 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
          <Container className="relative">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-4">
                {isUk ? "Про нас" : "About Us"}
              </p>
              <h1 className="text-5xl lg:text-6xl font-heading font-extrabold text-neutral-900 dark:text-white mb-6 leading-tight">
                {isUk ? <>Будуємо цифрові гнізда<br /><span className="gradient-text">для бізнесу</span></> : <>Building digital nests<br /><span className="gradient-text">for business</span></>}
              </h1>
              <p className="text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-2xl">
                {isUk
                  ? "Codeworth — команда розробників, дизайнерів та маркетологів, що перетворює ідеї на продукти. Ми вірємо, що якісний сайт може бути доступним кожному бізнесу в Україні."
                  : "Codeworth is a team of developers, designers, and marketers that turns ideas into products. We believe quality websites can be accessible to every business."}
              </p>
            </div>
          </Container>
        </section>

        {/* Stats */}
        <section className="py-16 bg-white dark:bg-neutral-800 border-y border-neutral-100">
          <Container>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-4xl font-heading font-extrabold gradient-text-primary mb-2">
                    <CountUp end={s.end} suffix={s.suffix} />
                  </div>
                  <div className="text-sm text-neutral-500">{s.label}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Mission */}
        <section className="py-24 bg-white dark:bg-neutral-950">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                  {isUk ? "Наша місія" : "Our Mission"}
                </p>
                <h2 className="text-4xl font-heading font-extrabold text-neutral-900 dark:text-white mb-6">
                  {isUk ? <>Технології доступні<br />кожному бізнесу</> : <>Technology accessible<br />to every business</>}
                </h2>
                <div className="space-y-4 text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {isUk ? (
                    <>
                      <p>Codeworth виник з простої ідеї: малий та середній бізнес в Україні заслуговує на той самий рівень цифрових продуктів, що й корпорації.</p>
                      <p>Ми розробляємо сайти, що не просто гарно виглядають — вони продають, залучають трафік і автоматизують рутину. Кожен проєкт — це інвестиція у зростання бізнесу клієнта.</p>
                      <p>Наш маркетплейс готових нішевих рішень — спроба ще більше знизити бар&apos;єр входу: якісний сайт з першого дня, за передбачуваною ціною.</p>
                    </>
                  ) : (
                    <>
                      <p>Codeworth was born from a simple idea: small and medium-sized businesses deserve the same level of digital products as corporations.</p>
                      <p>We build websites that don't just look great — they sell, drive traffic, and automate routine tasks. Every project is an investment in the client's business growth.</p>
                      <p>Our marketplace of ready-made niche solutions is an effort to lower the barrier even further: a quality website from day one, at a predictable price.</p>
                    </>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {VALUES.map((v) => {
                  const Icon = v.icon;
                  return (
                    <div key={v.title} className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5 text-indigo-600" />
                      </div>
                      <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-1 text-sm">{v.title}</h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{v.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>

        {/* Timeline */}
        <section className="py-24 bg-neutral-50 dark:bg-neutral-900 ">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-16">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                {isUk ? "Наш шлях" : "Our Journey"}
              </p>
              <h2 className="text-4xl font-heading font-extrabold text-neutral-900">
                {isUk ? "Як ми росли" : "How We Grew"}
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              {TIMELINE.map((item, i) => (
                <div key={item.year} className="flex gap-6 mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-600 to-indigo-800 text-white font-heading font-bold text-sm flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/25">
                      {item.year}
                    </div>
                    {i < TIMELINE.length - 1 && <div className="w-0.5 flex-1 mt-2 bg-indigo-100" />}
                  </div>
                  <div className="pb-8">
                    <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-neutral-500">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Team / Hiring */}
        <section className="py-24 bg-white dark:bg-neutral-950">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                {isUk ? "Команда" : "Team"}
              </p>
              <h2 className="text-4xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
                {isUk
                  ? <>{`Команда, що `}<span className="gradient-text">росте</span></>
                  : <>A team that <span className="gradient-text">keeps growing</span></>}
              </h2>
              <p className="mt-3 text-neutral-500 dark:text-neutral-400">
                {isUk
                  ? "Розробники, дизайнери та маркетологи, що перетворюють ідеї на продукти. Ми розширюємось — і шукаємо нових людей у команду."
                  : "Developers, designers, and marketers turning ideas into products. We're growing — and looking for new people to join us."}
              </p>
            </div>
            {/* Hiring */}
            <div className="p-8 rounded-2xl bg-linear-to-br from-indigo-50 to-violet-50 border border-indigo-100 text-center max-w-2xl mx-auto">
              <h3 className="font-heading font-bold text-xl text-neutral-900 dark:text-white mb-2">
                {isUk ? "Ми наймаємо!" : "We're Hiring!"}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 mb-4 max-w-lg mx-auto text-sm">
                {isUk
                  ? "Шукаємо Frontend Developer та UI/UX Designer. Повністю дистанційно, гнучкий графік, цікаві проєкти."
                  : "Looking for a Frontend Developer and UI/UX Designer. Fully remote, flexible hours, exciting projects."}
              </p>
              <a href="mailto:jobs@codeworth.uk" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors">
                {isUk ? "Надіслати CV" : "Send CV"}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Container>
        </section>

        {/* Tech Stack */}
        <section className="py-24 bg-neutral-50 dark:bg-neutral-900 ">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                {isUk ? "Технології" : "Technologies"}
              </p>
              <h2 className="text-4xl font-heading font-extrabold text-neutral-900">
                {isUk ? "Наш стек" : "Our Stack"}
              </h2>
              <p className="mt-3 text-neutral-500">
                {isUk ? "Працюємо тільки з перевіреними, сучасними інструментами." : "We work only with proven, modern tools."}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {TECH_STACK.map((tech) => (
                <span key={tech.name} className={`px-5 py-2 rounded-full text-sm font-semibold ${tech.color} shadow-sm`}>
                  {tech.name}
                </span>
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
