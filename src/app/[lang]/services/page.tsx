import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { CTASection } from "@/components/home/CTASection";
import { SERVICES_DATA, getServiceLocalized } from "@/lib/data/services";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ArrowRight, CheckCircle, Clock, Users, Star } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk
      ? "Послуги веб-розробки та digital-маркетингу | Codeworth"
      : "Web Development & Digital Marketing Services | Codeworth",
    description: isUk
      ? "Повний цикл digital-послуг: розробка сайтів, інтернет-магазинів, PWA, SEO, UI/UX дизайн, CRM, чат-боти. Codeworth — веб-студія повного циклу в Україні."
      : "Full-cycle digital services: website development, e-commerce, PWA, SEO, UI/UX design, CRM, chatbots. Codeworth — full-cycle web studio.",
    alternates: buildAlternates(lang, 'services'),
    openGraph: {
      title: isUk ? "Послуги — Codeworth" : "Services — Codeworth",
      description: isUk
        ? "Повний цикл digital-послуг: розробка сайтів, SEO, UI/UX дизайн, CRM, чат-боти. Веб-студія повного циклу в Україні."
        : "Full-cycle digital services: website development, SEO, UI/UX design, CRM, chatbots. Full-cycle web studio.",
      type: "website",
      url: `https://codeworth.uk/${lang}/services`,
      images: [{ url: "/og/services.png", width: 1200, height: 630, alt: isUk ? "Послуги Codeworth" : "Codeworth Services" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isUk ? "Послуги — Codeworth" : "Services — Codeworth",
      description: isUk ? "Розробка сайтів, SEO, дизайн та digital-маркетинг від Codeworth." : "Web development, SEO, design, and digital marketing by Codeworth.",
      images: ["/og/services.png"],
    },
  };
}

const SERVICES_FAQ_UK = [
  { q: "Які послуги надає Codeworth?", a: "Codeworth — веб-студія повного циклу. Ми розробляємо сайти та інтернет-магазини, займаємось SEO-просуванням, UI/UX дизайном, налаштуванням CRM і чат-ботів, SMM та email-маркетингом. Всі послуги — в одному місці." },
  { q: "Чи можна замовити кілька послуг одразу?", a: "Так. Більшість наших клієнтів замовляють комплекс: розробка сайту + SEO + UI/UX дизайн. Комплексні проєкти виконуються швидше і вигідніше, ніж окремі замовлення у різних виконавців." },
  { q: "Чи працюєте ви з малим бізнесом?", a: "Так, це наш основний клієнт. Ми розробили спеціальний маркетплейс готових нішевих рішень — сайт для ресторану, салону, лікаря, юриста тощо — за фіксованою ціною і швидкі терміни запуску." },
  { q: "Чи надаєте послуги після здачі проєкту?", a: "Так. До кожного проєкту входить 1 місяць гарантійної підтримки. Далі — пакети технічної підтримки, SEO-супровід та доробки за фіксованим тарифом." },
  { q: "Чи є у вас портфоліо виконаних робіт?", a: "Так, у нашому портфоліо 37+ кейсів по різних нішах: e-commerce, ресторани, медицина, нерухомість, SaaS та інші. Кожен кейс містить опис задачі, рішення та конкретні метрики результату." },
];

const SERVICES_FAQ_EN = [
  { q: "What services does Codeworth offer?", a: "Codeworth is a full-cycle web studio. We build websites and e-commerce stores, handle SEO, UI/UX design, CRM setup, chatbots, SMM, and email marketing. Everything in one place — no need to manage multiple agencies." },
  { q: "Can I order multiple services at once?", a: "Yes. Most of our clients order a bundle: website development + SEO + UI/UX design. Combined projects are completed faster and are more cost-effective than separate orders from different vendors." },
  { q: "Do you work with small businesses?", a: "Yes, that's our core audience. We've built a marketplace of ready-made niche solutions — websites for restaurants, salons, doctors, lawyers and more — at a fixed price with fast launch timelines." },
  { q: "Do you provide ongoing support after project delivery?", a: "Yes. Every project includes 1 month of free warranty support. After that, technical support packages, SEO maintenance, and add-on development are available at a fixed monthly rate." },
  { q: "Do you have a portfolio of completed work?", a: "Yes — 37+ cases across different niches: e-commerce, restaurants, healthcare, real estate, SaaS, and more. Each case includes the task description, our solution, and measurable results." },
];

const PROCESS_STEPS_UK = [
  { num: "01", title: "Консультація", desc: "Безкоштовна зустріч для обговорення задачі, цілей та бюджету." },
  { num: "02", title: "Аналіз та ТЗ", desc: "Аналіз конкурентів, складання технічного завдання та кошторису." },
  { num: "03", title: "Дизайн", desc: "Wireframes та hi-fi макети у Figma. Затвердження з клієнтом." },
  { num: "04", title: "Розробка", desc: "Чистий код, TypeScript, code review, щотижневі звіти прогресу." },
  { num: "05", title: "Запуск", desc: "Тестування, SEO-налаштування, деплой та навчання." },
];

const PROCESS_STEPS_EN = [
  { num: "01", title: "Consultation", desc: "Free meeting to discuss the task, goals, and budget." },
  { num: "02", title: "Analysis & Spec", desc: "Competitor analysis, technical specification, and estimate." },
  { num: "03", title: "Design", desc: "Wireframes and hi-fi mockups in Figma. Client approval." },
  { num: "04", title: "Development", desc: "Clean code, TypeScript, code review, weekly progress reports." },
  { num: "05", title: "Launch", desc: "Testing, SEO setup, deployment, and training." },
];

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isUk = lang === "uk";
  const PROCESS_STEPS = isUk ? PROCESS_STEPS_UK : PROCESS_STEPS_EN;
  const faqItems = isUk ? SERVICES_FAQ_UK : SERVICES_FAQ_EN;

  const servicesItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isUk ? "Послуги Codeworth" : "Codeworth Services",
    url: `https://codeworth.uk/${lang}/services`,
    itemListElement: SERVICES_DATA.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      url: `https://codeworth.uk/${lang}/services/${s.slug}`,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesItemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-20 gradient-hero relative overflow-hidden">
          <div className="absolute -top-32 right-0 w-125 h-125 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
          <Container className="relative">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-4">
                {isUk ? "Послуги" : "Services"}
              </p>
              <h1 className="text-5xl lg:text-6xl font-heading font-extrabold text-neutral-900 dark:text-white mb-6 leading-tight">
                {isUk
                  ? <>{`Повний цикл`}<br /><span className="gradient-text">{`цифрового розвитку`}</span></>
                  : <>{"Full-cycle"}<br /><span className="gradient-text">{"digital growth"}</span></>}
              </h1>
              <p className="text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-2xl mb-8">
                {isUk
                  ? "Від ідеї та дизайну до запуску та підтримки. Всі послуги — в одному місці, без передоручень підрядникам."
                  : "From idea and design to launch and support. All services in one place, no outsourcing to third parties."}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-indigo-600 to-indigo-700 text-white font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5">
                  {isUk ? "Обговорити проєкт" : "Discuss a Project"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href={`/${lang}/portfolio`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold hover:border-indigo-200 hover:text-indigo-700 hover:bg-indigo-50 transition-all">
                  {isUk ? "Приклади робіт" : "Portfolio"}
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Stats */}
        <section className="py-10 bg-white dark:bg-neutral-800 border-y border-neutral-100">
          <Container>
            <div className="flex flex-wrap items-center justify-center gap-12">
              {[
                { icon: CheckCircle, end: 120, suffix: "+", label: isUk ? "Шаблонів" : "Templates", static: false },
                { icon: Users, end: 60, suffix: "+", label: isUk ? "Ніш" : "Niches", static: false },
                { icon: Star, end: 0, suffix: "90+", label: isUk ? "Core Web Vitals" : "Core Web Vitals", static: true },
                { icon: Clock, end: 4, suffix: "+", label: isUk ? "Роки досвіду" : "Years exp.", static: false },
              ].map(({ icon: Icon, end, suffix, label, static: isStatic }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-heading font-extrabold text-neutral-900">
                      {isStatic ? suffix : <CountUp end={end} suffix={suffix} />}
                    </div>
                    <div className="text-xs text-neutral-400">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Services Grid */}
        <section className="py-24 bg-white dark:bg-neutral-950">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
                {isUk ? "Що ми робимо" : "What We Do"}
              </h2>
              <p className="text-neutral-500">{isUk ? "Натисніть на послугу, щоб дізнатися більше." : "Click on a service to learn more."}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {SERVICES_DATA.map((rawService) => {
                const service = getServiceLocalized(rawService.slug, lang) ?? rawService;
                const Icon = service.icon;
                return (
                  <Link
                    key={service.slug}
                    href={`/${lang}/services/${service.slug}`}
                    className="group p-7 rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${service.bg}`}>
                      <Icon className={`w-6 h-6 ${service.iconColor}`} />
                    </div>
                    <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-indigo-700 transition-colors">
                      {service.shortTitle}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">{service.description}</p>
                    <div className="flex items-center justify-between text-xs text-neutral-400">
                      <span className="text-indigo-600 font-semibold">{isUk ? `від ${service.priceFrom}` : `from ${service.priceFrom}`}</span>
                      <span className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600 font-medium">
                        {isUk ? "Детальніше" : "Learn more"} <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Extras teaser */}
        <section className="py-10 bg-indigo-50 border-y border-indigo-100">
          <Container>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-heading font-bold text-neutral-900 dark:text-white mb-1">
                  {isUk ? "⚡ Вже є сайт, але потрібна одна функція?" : "⚡ Already have a site but need one feature?"}
                </p>
                <p className="text-sm text-neutral-500">
                  {isUk ? "42+ готових модулі: форми, інтеграції, аналітика, сторінки — від 800 грн." : "42+ ready-made modules: forms, integrations, analytics, pages — from $20."}
                </p>
              </div>
              <Link
                href={`/${lang}/extras`}
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors"
              >
                {isUk ? "Доробки та модулі" : "Add-ons & Modules"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </section>

        {/* Process */}
        <section className="py-24 bg-neutral-50 dark:bg-neutral-900 ">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-16">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                {isUk ? "Процес" : "Process"}
              </p>
              <h2 className="text-4xl font-heading font-extrabold text-neutral-900">
                {isUk ? "Як ми працюємо" : "How We Work"}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className="relative">
                  <div className="p-5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 text-center h-full">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-600 to-indigo-800 text-white font-heading font-bold flex items-center justify-center mx-auto mb-3 shadow-md shadow-indigo-500/25 text-sm">
                      {step.num}
                    </div>
                    <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-1 text-sm">{step.title}</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{step.desc}</p>
                  </div>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-10 -right-2 z-10 text-neutral-300 text-lg">›</div>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-white dark:bg-neutral-800 border-t border-neutral-100">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">FAQ</p>
              <h2 className="text-4xl font-heading font-extrabold text-neutral-900">
                {isUk ? "Часті питання про наші послуги" : "Frequently Asked Questions"}
              </h2>
              <p className="mt-4 text-neutral-500">
                {isUk
                  ? "Все, що варто знати перед тим, як замовити послугу."
                  : "Everything worth knowing before placing an order."}
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqItems.map((item) => (
                <div key={item.q} className="p-6 rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-neutral-50">
                  <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-2">{item.q}</h3>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <TestimonialsSection />
        <CTASection lang={lang} />
      </main>
      <Footer />
    </div>
  );
}
