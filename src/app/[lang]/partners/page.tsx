import type { Metadata } from "next";
import Link from "next/link";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { ArrowRight, CheckCircle, ExternalLink } from "lucide-react";
import { PartnershipForm } from "@/components/partners/PartnershipForm";

export async function generateStaticParams() {
  return [{ lang: "uk" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  const title = isUk
    ? "Технологічний стек та партнери Codeworth — Next.js, Vercel, Tailwind"
    : "Codeworth Tech Stack & Partners — Next.js, Vercel, Tailwind";
  const desc = isUk
    ? "Технологічний стек Codeworth: Next.js 15, TypeScript, Tailwind CSS, Vercel. Партнерська програма для агентств та фрілансерів."
    : "Codeworth tech stack: Next.js 15, TypeScript, Tailwind CSS, Vercel. Partner program for agencies and freelancers.";
  return {
    title,
    description: desc,
    openGraph: { title, description: desc, type: "website", url: `https://codeworth.uk/${lang}/partners` },
    alternates: buildAlternates(lang, "/partners"),
  };
}

interface TechItem {
  name: string;
  description: { uk: string; en: string };
  category: string;
  why: { uk: string; en: string };
  url: string;
  tag: { uk: string; en: string };
  tagColor: string;
}

const TECH_STACK: TechItem[] = [
  {
    name: "Next.js 15",
    description: { uk: "React-фреймворк з App Router, SSG, SSR, ISR та Server Components", en: "React framework with App Router, SSG, SSR, ISR and Server Components" },
    category: "frontend",
    why: { uk: "Максимальний PageSpeed, SEO-готовність, Vercel-деплой", en: "Maximum PageSpeed, SEO-ready, Vercel deployment" },
    url: "https://nextjs.org",
    tag: { uk: "Основний", en: "Primary" },
    tagColor: "bg-indigo-100 text-indigo-700",
  },
  {
    name: "TypeScript",
    description: { uk: "Статично типізована надмножина JavaScript — запобігає помилкам до запуску", en: "Statically typed superset of JavaScript — prevents errors before runtime" },
    category: "frontend",
    why: { uk: "0 TypeScript errors у всіх проєктах — надійний код", en: "0 TypeScript errors in all projects — reliable code" },
    url: "https://typescriptlang.org",
    tag: { uk: "Обов'язковий", en: "Required" },
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    name: "Tailwind CSS v4",
    description: { uk: "Utility-first CSS фреймворк для швидкого створення адаптивних інтерфейсів", en: "Utility-first CSS framework for rapidly building responsive interfaces" },
    category: "frontend",
    why: { uk: "Швидка розробка, консистентний дизайн, мінімальний CSS bundle", en: "Fast development, consistent design, minimal CSS bundle" },
    url: "https://tailwindcss.com",
    tag: { uk: "Основний", en: "Primary" },
    tagColor: "bg-cyan-100 text-cyan-700",
  },
  {
    name: "React 19",
    description: { uk: "Бібліотека для побудови компонентних інтерфейсів з Server Components", en: "Library for building component-based UIs with Server Components" },
    category: "frontend",
    why: { uk: "Найпоширеніший стандарт фронтенду, величезна екосистема", en: "The most common frontend standard, huge ecosystem" },
    url: "https://react.dev",
    tag: { uk: "Основний", en: "Primary" },
    tagColor: "bg-sky-100 text-sky-700",
  },
  {
    name: "Vercel",
    description: { uk: "Платформа для деплою Next.js: CDN, ISR, Edge Functions, Preview Deployments", en: "Platform for deploying Next.js: CDN, ISR, Edge Functions, Preview Deployments" },
    category: "infrastructure",
    why: { uk: "Автоматичний деплой, глобальний CDN, SSL — нульова конфігурація", en: "Auto deployment, global CDN, SSL — zero configuration" },
    url: "https://vercel.com",
    tag: { uk: "Хостинг", en: "Hosting" },
    tagColor: "bg-gray-100 dark:bg-neutral-800 text-gray-700",
  },
  {
    name: "PostgreSQL + Prisma",
    description: { uk: "Реляційна СУБД з type-safe ORM для надійного зберігання даних", en: "Relational database with type-safe ORM for reliable data storage" },
    category: "backend",
    why: { uk: "Надійність, продуктивність, type-safe запити без SQL-ін'єкцій", en: "Reliability, performance, type-safe queries without SQL injections" },
    url: "https://prisma.io",
    tag: { uk: "Backend", en: "Backend" },
    tagColor: "bg-green-100 text-green-700",
  },
  {
    name: "Sanity / Strapi",
    description: { uk: "Headless CMS для управління контентом через UI без деплою", en: "Headless CMS for content management via UI without redeployment" },
    category: "cms",
    why: { uk: "Клієнт редагує контент сам — без залучення розробника", en: "Client edits content themselves — no developer needed" },
    url: "https://sanity.io",
    tag: { uk: "CMS", en: "CMS" },
    tagColor: "bg-orange-100 text-orange-700",
  },
  {
    name: "Playwright",
    description: { uk: "E2E тестування: автоматична перевірка сайту у браузері після кожного деплою", en: "E2E testing: automatic browser checks after every deployment" },
    category: "testing",
    why: { uk: "Ловимо regression-баги до того, як їх побачить клієнт", en: "We catch regression bugs before the client sees them" },
    url: "https://playwright.dev",
    tag: { uk: "Тестування", en: "Testing" },
    tagColor: "bg-purple-100 text-purple-700",
  },
  {
    name: "Lucide React",
    description: { uk: "Бібліотека SVG-іконок: 1400+ іконок у єдиному стилі, tree-shakeable", en: "SVG icon library: 1400+ icons in a consistent style, tree-shakeable" },
    category: "frontend",
    why: { uk: "Легка, красива, TypeScript-ready — 0 bloat", en: "Lightweight, beautiful, TypeScript-ready — 0 bloat" },
    url: "https://lucide.dev",
    tag: { uk: "UI", en: "UI" },
    tagColor: "bg-yellow-100 text-yellow-700",
  },
  {
    name: "GitHub Actions",
    description: { uk: "CI/CD: автоматичні тести, лінтинг, Lighthouse CI та деплой на кожен PR", en: "CI/CD: automated tests, linting, Lighthouse CI and deployment on every PR" },
    category: "devops",
    why: { uk: "Безпечний деплой — лише код, що пройшов всі перевірки", en: "Safe deployment — only code that passed all checks" },
    url: "https://github.com/features/actions",
    tag: { uk: "CI/CD", en: "CI/CD" },
    tagColor: "bg-slate-100 text-slate-700",
  },
  {
    name: "GitHub",
    description: { uk: "Контроль версій, code review, pull requests та командна розробка", en: "Version control, code review, pull requests and collaborative development" },
    category: "devops",
    why: { uk: "Весь код зберігається, будь-яку зміну можна повернути, PR — аудит кожної правки", en: "All code is versioned, every change is reversible, PRs audit every edit" },
    url: "https://github.com",
    tag: { uk: "VCS", en: "VCS" },
    tagColor: "bg-gray-100 dark:bg-neutral-800 text-gray-700",
  },
  {
    name: "Contentful",
    description: { uk: "Enterprise headless CMS з потужним API та мультимедійним управлінням", en: "Enterprise headless CMS with powerful API and rich media management" },
    category: "cms",
    why: { uk: "Для великих проєктів з командою редакторів та складними структурами контенту", en: "For large-scale projects with editorial teams and complex content models" },
    url: "https://contentful.com",
    tag: { uk: "Enterprise CMS", en: "Enterprise CMS" },
    tagColor: "bg-amber-100 text-amber-700",
  },
  {
    name: "Linear",
    description: { uk: "Сучасний трекер задач для розробників: спринти, проєкти, cycle time", en: "Modern issue tracker for developers: sprints, projects, cycle time" },
    category: "devops",
    why: { uk: "Швидкий, клавіатурно-орієнтований — менше кліків, більше коду", en: "Fast, keyboard-first — less clicking, more coding" },
    url: "https://linear.app",
    tag: { uk: "Управління", en: "Management" },
    tagColor: "bg-violet-100 text-violet-700",
  },
  {
    name: "Hotjar",
    description: { uk: "Теплові карти, записи сесій та аналіз конверсій для UX-оптимізації", en: "Heatmaps, session recordings, and conversion analysis for UX optimization" },
    category: "devops",
    why: { uk: "Показує де клікають та де губляться користувачі — дані замість здогадок", en: "Shows where users click and drop off — data instead of guesswork" },
    url: "https://hotjar.com",
    tag: { uk: "Аналітика", en: "Analytics" },
    tagColor: "bg-red-100 text-red-700",
  },
  {
    name: "Storybook",
    description: { uk: "Ізольована розробка та документація UI-компонентів з інтерактивними прикладами", en: "Isolated development and documentation of UI components with interactive examples" },
    category: "testing",
    why: { uk: "Компоненти розробляються незалежно — швидше, якісніше, з документацією", en: "Components are developed in isolation — faster, higher quality, with documentation" },
    url: "https://storybook.js.org",
    tag: { uk: "Документація", en: "Docs" },
    tagColor: "bg-pink-100 text-pink-700",
  },
];

const PARTNER_BENEFITS = {
  uk: [
    { emoji: "💰", title: "Реферальна комісія 15%", desc: "За кожного приведеного клієнта ви отримуєте 15% від суми проєкту" },
    { emoji: "🔧", title: "White-label розробка", desc: "Виконуємо технічну частину під вашим брендом — ви отримуєте результат" },
    { emoji: "📊", title: "Звіти для клієнтів", desc: "Готові звіти, брифи та презентації для вашої комунікації з клієнтами" },
    { emoji: "🚀", title: "Пріоритетний деплой", desc: "Партнерські проєкти виконуються позачергово з гарантованим терміном" },
    { emoji: "🎓", title: "Навчання та матеріали", desc: "Доступ до наших внутрішніх гайдів, чек-листів та best practices" },
    { emoji: "🤝", title: "Особистий менеджер", desc: "Виділений менеджер для комунікації по всіх партнерських проєктах" },
  ],
  en: [
    { emoji: "💰", title: "15% Referral Commission", desc: "For every referred client you receive 15% of the project amount" },
    { emoji: "🔧", title: "White-label Development", desc: "We handle the technical side under your brand — you deliver the result" },
    { emoji: "📊", title: "Client Reports", desc: "Ready-made reports, briefs, and presentations for your client communication" },
    { emoji: "🚀", title: "Priority Deployment", desc: "Partner projects are fast-tracked with guaranteed deadlines" },
    { emoji: "🎓", title: "Training & Materials", desc: "Access to our internal guides, checklists, and best practices" },
    { emoji: "🤝", title: "Dedicated Manager", desc: "A dedicated manager for communication on all partner projects" },
  ],
};

const TECH_CATEGORIES: { id: string; uk: string; en: string }[] = [
  { id: "frontend", uk: "Frontend", en: "Frontend" },
  { id: "backend", uk: "Backend", en: "Backend" },
  { id: "infrastructure", uk: "Інфраструктура", en: "Infrastructure" },
  { id: "cms", uk: "CMS", en: "CMS" },
  { id: "testing", uk: "Тестування", en: "Testing" },
  { id: "devops", uk: "DevOps та Аналітика", en: "DevOps & Analytics" },
];

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isUk = lang === "uk";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isUk ? "Головна" : "Home", item: `https://codeworth.uk/${lang}` },
      { "@type": "ListItem", position: 2, name: isUk ? "Партнери" : "Partners" },
    ],
  };

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: isUk
      ? "Технологічний стек Codeworth — інструменти, якими ми будуємо продукти"
      : "Codeworth Tech Stack — Tools We Use to Build Products",
    description: isUk
      ? "Огляд технологічного стеку Codeworth: Next.js 15, TypeScript, Tailwind CSS, Vercel та ін."
      : "Overview of Codeworth tech stack: Next.js 15, TypeScript, Tailwind CSS, Vercel and more.",
    author: { "@type": "Organization", name: "Codeworth", url: "https://codeworth.uk" },
    publisher: { "@type": "Organization", name: "Codeworth", url: "https://codeworth.uk" },
    datePublished: "2024-01-01",
    dateModified: "2026-01-01",
    url: `https://codeworth.uk/${lang}/partners`,
    inLanguage: lang,
    about: TECH_STACK.map((t) => ({
      "@type": "SoftwareApplication",
      name: t.name,
      url: t.url,
      applicationCategory: "DeveloperApplication",
      description: isUk ? t.description.uk : t.description.en,
    })),
  };

  const benefits = isUk ? PARTNER_BENEFITS.uk : PARTNER_BENEFITS.en;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-linear-to-br from-gray-900 via-slate-800 to-indigo-900 py-20">
          <Container>
            <nav className="mb-6 text-sm text-gray-400">
              <Link href={`/${lang}`} className="hover:text-white transition-colors">{isUk ? "Головна" : "Home"}</Link>
              <span className="mx-2">›</span>
              <span className="text-white">{isUk ? "Партнери та Стек" : "Partners & Stack"}</span>
            </nav>
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                {isUk ? "Технологічний стек та партнерська програма" : "Tech Stack & Partner Program"}
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                {isUk
                  ? "Розкриваємо стек, на якому будуємо сайти. Та пропонуємо вигідну партнерську програму для агентств та фрілансерів."
                  : "We reveal the stack we build websites on. And offer a lucrative partner program for agencies and freelancers."}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="#tech-stack" className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition-colors">
                  {isUk ? "Технологічний стек ↓" : "Tech Stack ↓"}
                </Link>
                <Link href="#partner-program" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors">
                  {isUk ? "Партнерська програма ↓" : "Partner Program ↓"}
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Tech Stack */}
        <section id="tech-stack" className="py-16 bg-white dark:bg-neutral-950">
          <Container>
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {isUk ? "Технологічний стек Codeworth" : "Codeworth Tech Stack"}
              </h2>
              <p className="text-gray-600 dark:text-neutral-300 max-w-2xl">
                {isUk
                  ? "Використовуємо сучасний, добре перевірений стек. Нічого модного заради модного — лише технології, що забезпечують якість, швидкість та підтримуваність."
                  : "We use a modern, well-tested stack. Nothing trendy for the sake of trends — only technologies that ensure quality, speed, and maintainability."}
              </p>
            </div>

            {TECH_CATEGORIES.map((cat) => {
              const items = TECH_STACK.filter((t) => t.category === cat.id);
              if (items.length === 0) return null;
              return (
                <div key={cat.id} className="mb-10">
                  <h3 className="text-lg font-semibold text-gray-500 dark:text-neutral-400 uppercase tracking-wide mb-4">
                    {isUk ? cat.uk : cat.en}
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((tech) => (
                      <div key={tech.name} className="bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl p-5">
                        <div className="flex items-start justify-between mb-2">
                          <span className="font-bold text-gray-900">{tech.name}</span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tech.tagColor}`}>
                            {isUk ? tech.tag.uk : tech.tag.en}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-neutral-300 mb-3 leading-relaxed">
                          {isUk ? tech.description.uk : tech.description.en}
                        </p>
                        <div className="bg-white border border-gray-100 dark:border-neutral-700 rounded-lg p-2.5 mb-3">
                          <p className="text-xs text-indigo-700">
                            <span className="font-medium">{isUk ? "Чому:" : "Why:"}</span>{" "}
                            {isUk ? tech.why.uk : tech.why.en}
                          </p>
                        </div>
                        <a
                          href={tech.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-gray-400 dark:text-neutral-500 hover:text-indigo-600 transition-colors"
                        >
                          {tech.url.replace("https://", "")}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </Container>
        </section>

        {/* Partner Program */}
        <section id="partner-program" className="py-16 bg-indigo-50 border-t">
          <Container>
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {isUk ? "Партнерська програма" : "Partner Program"}
              </h2>
              <p className="text-gray-600 dark:text-neutral-300 max-w-2xl">
                {isUk
                  ? "Для агентств, фрілансерів та консультантів, які хочуть надавати клієнтам якісні веб-рішення. Заробляйте на рефералах або передайте технічну частину нам."
                  : "For agencies, freelancers, and consultants who want to provide clients with quality web solutions. Earn on referrals or delegate the technical side to us."}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {benefits.map((b) => (
                <div key={b.title} className="bg-white rounded-xl p-5 border border-indigo-100">
                  <div className="text-3xl mb-3">{b.emoji}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{b.title}</h3>
                  <p className="text-sm text-gray-600">{b.desc}</p>
                </div>
              ))}
            </div>

            {/* Partner tiers */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  title: isUk ? "Реферал" : "Referral",
                  desc: isUk ? "Рекомендуєте нас клієнтам — отримуєте 15% комісії" : "You recommend us to clients — get 15% commission",
                  features: isUk
                    ? ["15% від суми проєкту", "Миттєва виплата", "Немає зобов'язань"]
                    : ["15% of project amount", "Instant payout", "No obligations"],
                  cta: isUk ? "Стати рефералом" : "Become a Referral",
                  highlighted: false,
                },
                {
                  title: isUk ? "Агентство" : "Agency",
                  desc: isUk ? "Передаєте технічну розробку нам — ми White-label підрядник" : "You delegate technical dev to us — we're your white-label subcontractor",
                  features: isUk
                    ? ["White-label розробка", "Пріоритетний деплой", "Особистий менеджер", "Знижка 10% на проєкти"]
                    : ["White-label development", "Priority deployment", "Dedicated manager", "10% discount on projects"],
                  cta: isUk ? "Стати партнером" : "Become Partner",
                  highlighted: true,
                },
                {
                  title: isUk ? "Технологічний партнер" : "Tech Partner",
                  desc: isUk ? "Для SaaS та хостинг-провайдерів — взаємна інтеграція та co-marketing" : "For SaaS and hosting providers — mutual integration and co-marketing",
                  features: isUk
                    ? ["Co-marketing активності", "Інтеграція продуктів", "Спільні кейси", "Взаємні посилання"]
                    : ["Co-marketing activities", "Product integration", "Joint case studies", "Mutual backlinks"],
                  cta: isUk ? "Обговорити" : "Discuss",
                  highlighted: false,
                },
              ].map((tier) => (
                <div
                  key={tier.title}
                  className={`rounded-2xl p-6 border ${
                    tier.highlighted
                      ? "bg-indigo-600 border-indigo-500 text-white"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <h3 className={`text-xl font-bold mb-2 ${tier.highlighted ? "text-white" : "text-gray-900"}`}>
                    {tier.title}
                  </h3>
                  <p className={`text-sm mb-5 ${tier.highlighted ? "text-indigo-200" : "text-gray-600"}`}>
                    {tier.desc}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <CheckCircle className={`w-4 h-4 shrink-0 ${tier.highlighted ? "text-indigo-300" : "text-indigo-500"}`} />
                        <span className={`text-sm ${tier.highlighted ? "text-indigo-100" : "text-gray-700"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/${lang}/contact`}
                    className={`w-full inline-flex items-center justify-center gap-2 font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm ${
                      tier.highlighted
                        ? "bg-white text-indigo-600 hover:bg-indigo-50"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    {tier.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </section>
        {/* Partnership application form */}
        <section className="py-20 bg-white dark:bg-neutral-950" id="apply">
          <Container>
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {isUk ? "Стати партнером" : "Become a Partner"}
                </h2>
                <p className="text-gray-600">
                  {isUk
                    ? "Заповніть форму і ми зв'яжемося з вами протягом 2 робочих днів."
                    : "Fill out the form and we'll get back to you within 2 business days."}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-neutral-900 rounded-2xl p-8 border border-gray-200">
                <PartnershipForm lang={lang} />
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
