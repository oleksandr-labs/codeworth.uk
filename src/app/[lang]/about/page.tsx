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
  { year: "2022", title: "Перші 20 клієнтів", text: "Перший корпоративний клієнт, перший e-commerce проєкт." },
  { year: "2023", title: "Студія", text: "Реєстрація студії, розширення до 5 спеціалістів, 60+ проєктів." },
  { year: "2024", title: "Маркетплейс", text: "Запуск напряму готових нішевих рішень, 85+ клієнтів." },
  { year: "2025", title: "Codeworth 2.0", text: "Новий сайт, нові продукти, масштабування команди." },
];

const TIMELINE_EN = [
  { year: "2021", title: "Founded", text: "First freelance projects. First team of 2." },
  { year: "2022", title: "First 20 Clients", text: "First corporate client, first e-commerce project." },
  { year: "2023", title: "Studio", text: "Official registration, expanded to 5 specialists, 60+ projects." },
  { year: "2024", title: "Marketplace", text: "Launched niche ready-made solutions, 85+ clients." },
  { year: "2025", title: "Codeworth 2.0", text: "New website, new products, team scaling." },
];

const TEAM_UK = [
  { name: "Олексій Коваленко", role: "CEO & Full-Stack Developer", skills: "Next.js, TypeScript, PostgreSQL, Architecture", avatar: "О", bio: "10+ років у веб-розробці. Архітектор всіх проєктів Codeworth, відповідальний за технічну якість та масштабованість.", linkedin: "https://linkedin.com/in/", github: "https://github.com/" },
  { name: "Аліна Мороз", role: "Lead UI/UX Designer", skills: "Figma, Motion Design, Design Systems, Branding", avatar: "А", bio: "Спеціалізується на conversion-driven дизайні. Створює інтерфейси що не просто красиві, а продають.", linkedin: "https://linkedin.com/in/", dribbble: "https://dribbble.com/" },
  { name: "Денис Бондаренко", role: "Frontend Developer", skills: "React, Tailwind, Framer Motion, Performance", avatar: "Д", bio: "Фронтенд-розробник з пристрастю до анімацій та продуктивності. Lighthouse 95+ — його стандарт.", linkedin: "https://linkedin.com/in/", github: "https://github.com/" },
  { name: "Катерина Лисенко", role: "SEO & Content Strategist", skills: "SEO, Copywriting, Analytics, Link Building", avatar: "К", bio: "SEO-стратег що виводить сайти в ТОП-3 Google. Автор 40+ блог-постів та контент-стратегій.", linkedin: "https://linkedin.com/in/" },
];

const TEAM_EN = [
  { name: "Oleksiy Kovalenko", role: "CEO & Full-Stack Developer", skills: "Next.js, TypeScript, PostgreSQL, Architecture", avatar: "O", bio: "10+ years in web development. Architect of all Codeworth projects, responsible for technical quality and scalability.", linkedin: "https://linkedin.com/in/", github: "https://github.com/" },
  { name: "Alina Moroz", role: "Lead UI/UX Designer", skills: "Figma, Motion Design, Design Systems, Branding", avatar: "A", bio: "Specializes in conversion-driven design. Creates interfaces that aren't just beautiful — they sell.", linkedin: "https://linkedin.com/in/", dribbble: "https://dribbble.com/" },
  { name: "Denys Bondarenko", role: "Frontend Developer", skills: "React, Tailwind, Framer Motion, Performance", avatar: "D", bio: "Frontend developer with a passion for animations and performance. Lighthouse 95+ is his standard.", linkedin: "https://linkedin.com/in/", github: "https://github.com/" },
  { name: "Kateryna Lysenko", role: "SEO & Content Strategist", skills: "SEO, Copywriting, Analytics, Link Building", avatar: "K", bio: "SEO strategist who ranks sites in Google's top 3. Author of 40+ blog posts and content strategies.", linkedin: "https://linkedin.com/in/" },
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
  { end: 120, suffix: "+", label: "Виконаних проєктів" },
  { end: 85, suffix: "+", label: "Постійних клієнтів" },
  { end: 8, suffix: "", label: "Спеціалістів" },
];

const STATS_EN = [
  { end: 2021, suffix: "", label: "Founded" },
  { end: 120, suffix: "+", label: "Projects Delivered" },
  { end: 85, suffix: "+", label: "Regular Clients" },
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
  sameAs: [
    "https://instagram.com/codenest.ua",
    "https://facebook.com/codenest.ua",
    "https://t.me/codenest_ua",
  ],
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
  const TEAM = isUk ? TEAM_UK : TEAM_EN;
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

        {/* Team */}
        <section className="py-24 bg-white dark:bg-neutral-950">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-16">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                {isUk ? "Команда" : "Team"}
              </p>
              <h2 className="text-4xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
                {isUk
                  ? <>{`Люди, що стоять`}<br />{`за `}<span className="gradient-text">Codeworth</span></>
                  : <>The people behind<br /><span className="gradient-text">Codeworth</span></>}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {TEAM.map((member) => (
                <div key={member.name} className="text-center p-6 rounded-2xl border border-neutral-100 dark:border-neutral-700 hover:shadow-md transition-shadow duration-200">
                  <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500 to-indigo-700 text-white font-heading font-extrabold text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/25">
                    {member.avatar}
                  </div>
                  <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-0.5">{member.name}</h3>
                  <p className="text-sm text-indigo-600 font-medium mb-1">{member.role}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3">{member.bio}</p>
                  <p className="text-xs text-neutral-400 mb-3">{member.skills}</p>
                  <div className="flex items-center justify-center gap-2">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-indigo-100 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-indigo-600 transition-colors" aria-label={`LinkedIn ${member.name}`}>
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                    )}
                    {member.github && (
                      <a href={member.github} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:text-white transition-colors" aria-label={`GitHub ${member.name}`}>
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                      </a>
                    )}
                    {member.dribbble && (
                      <a href={member.dribbble} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-pink-100 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-pink-600 transition-colors" aria-label={`Dribbble ${member.name}`}>
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308a10.174 10.174 0 004.392-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4a10.05 10.05 0 006.12 2.068c1.47 0 2.874-.31 4.176-.718zM5.023 20.27c.23-.385 3.058-4.922 8.42-6.59.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.77 13.656 2.7 13.59 2.1 13.575v.45c0 2.424.93 4.637 2.464 6.295h.002l-.003-.05zm-2.79-8.793c.612.013 4.943.022 9.468-1.196a66.768 66.768 0 00-3.78-5.9C4.887 5.91 2.668 8.844 2.233 11.477zM9.6 3.51c.248.31 1.953 2.5 3.81 5.975 4.262-1.597 6.068-4.02 6.24-4.265A10.065 10.065 0 0012 2.107c-.84 0-1.656.15-2.4.403zM20.49 6.06c-.21.278-2.19 2.84-6.6 4.613.2.41.4.824.588 1.24l.2.46c3.42-.432 6.81.265 7.14.335a10.02 10.02 0 00-1.33-6.648h.002z"/></svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Hiring */}
            <div className="p-8 rounded-2xl bg-linear-to-br from-indigo-50 to-violet-50 border border-indigo-100 text-center">
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
