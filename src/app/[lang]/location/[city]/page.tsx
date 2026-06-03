import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { GEO_CITIES, GEO_CITY_SLUGS, getCity } from "@/lib/data/geo";
import { MapPin, ArrowRight, CheckCircle, Star, Clock, Phone } from "lucide-react";

type Params = { lang: string; city: string };

export async function generateStaticParams() {
  const langs = ["en", "uk"];
  return langs.flatMap((lang) => GEO_CITY_SLUGS.map((city) => ({ lang, city })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang, city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) return {};
  const isUk = lang === "uk";
  const title = isUk ? city.seoTitle : city.seoTitleEn;
  const desc = isUk ? city.seoDesc : city.seoDescEn;
  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      type: "website",
      url: `https://codeworth.uk/${lang}/location/${city.slug}`,
      images: [{ url: "/og/location.png", width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, images: ["/og/location.png"] },
    alternates: buildAlternates(lang, `/location/${city.slug}`),
  };
}

const SERVICES = [
  {
    icon: "🌐",
    titleUk: "Розробка сайтів",
    titleEn: "Website Development",
    descUk: "Корпоративні сайти, лендінги, портали на Next.js з SSG та PageSpeed 90+",
    descEn: "Corporate sites, landing pages, portals on Next.js with SSG and PageSpeed 90+",
  },
  {
    icon: "🛒",
    titleUk: "Інтернет-магазини",
    titleEn: "Online Stores",
    descUk: "E-commerce від каталогу товарів до повноцінного магазину з оплатою та CRM",
    descEn: "E-commerce from product catalog to a full store with payment and CRM",
  },
  {
    icon: "🔍",
    titleUk: "SEO-просування",
    titleEn: "SEO Promotion",
    descUk: "Локальне та загальне SEO: топ Google за 3–6 місяців, Google My Business",
    descEn: "Local and general SEO: top Google in 3–6 months, Google My Business",
  },
  {
    icon: "🎨",
    titleUk: "UI/UX Дизайн",
    titleEn: "UI/UX Design",
    descUk: "Сучасний дизайн рівня Awwwards: фірмовий стиль, прототип, Figma",
    descEn: "Award-level design: branding, prototype, Figma",
  },
  {
    icon: "📱",
    titleUk: "PWA та мобільні додатки",
    titleEn: "PWA & Mobile Apps",
    descUk: "Progressive Web App — сайт, що працює як мобільний додаток без App Store",
    descEn: "Progressive Web App — a site that works like a mobile app, no App Store needed",
  },
  {
    icon: "🤖",
    titleUk: "Чат-боти та автоматизація",
    titleEn: "Chatbots & Automation",
    descUk: "Telegram-бот, AI-асистент, автоматичні воронки — підключення за 3–7 днів",
    descEn: "Telegram bot, AI assistant, automated funnels — setup in 3–7 days",
  },
];

const WHY_US = [
  { icon: "⚡", labelUk: "Швидкий запуск", labelEn: "Fast launch", descUk: "Лендінг за 5–10 днів, корпоративний сайт — 2–4 тижні", descEn: "Landing in 5–10 days, corporate site — 2–4 weeks" },
  { icon: "🏆", labelUk: "Гарантія якості", labelEn: "Quality guarantee", descUk: "1 місяць безкоштовної підтримки після запуску", descEn: "1 month free support after launch" },
  { icon: "📈", labelUk: "SEO з першого дня", labelEn: "SEO from day one", descUk: "Базове SEO, Schema.org та sitemap.xml включені в усі тарифи", descEn: "Basic SEO, Schema.org, and sitemap.xml included in all packages" },
  { icon: "📱", labelUk: "Mobile First", labelEn: "Mobile First", descUk: "Проєктуємо з мобільного — 70%+ трафіку з телефонів", descEn: "Designed mobile-first — 70%+ traffic from phones" },
  { icon: "💬", labelUk: "Зрозуміла комунікація", labelEn: "Clear communication", descUk: "Telegram, Zoom, звіт щотижня, без «програмістської» мови", descEn: "Telegram, Zoom, weekly reports, no tech jargon" },
  { icon: "🔒", labelUk: "Офіційний договір", labelEn: "Official contract", descUk: "Підписуємо договір, захищаємо ваш бюджет, фіксуємо терміни", descEn: "Signed contract, budget protection, fixed deadlines" },
];

export default async function CityPage({ params }: { params: Promise<Params> }) {
  const { lang, city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) notFound();

  const isUk = lang === "uk";
  const cityName = isUk ? city.nameUk : city.nameEn;
  const regionName = isUk ? city.region : city.regionEn;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isUk ? "Головна" : "Home", item: `https://codeworth.uk/${lang}` },
      { "@type": "ListItem", position: 2, name: isUk ? "Міста" : "Cities", item: `https://codeworth.uk/${lang}/location` },
      { "@type": "ListItem", position: 3, name: cityName },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Codeworth",
    description: isUk ? city.description : city.descriptionEn,
    url: `https://codeworth.uk/${lang}/location/${city.slug}`,
    email: "hello@codeworth.uk",
    address: {
      "@type": "PostalAddress",
      addressLocality: isUk ? "Київ" : "Kyiv",
      addressCountry: "UA",
    },
    areaServed: { "@type": "City", name: cityName },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isUk ? "Послуги веб-розробки" : "Web Development Services",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.faq.map((item) => ({
      "@type": "Question",
      name: isUk ? item.q : item.qEn,
      acceptedAnswer: { "@type": "Answer", text: isUk ? item.a : item.aEn },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-20 bg-neutral-950 text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }}
          />
          <div className="absolute inset-0 bg-linear-to-br from-indigo-900/40 to-transparent" />
          <Container className="relative">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-8">
                <Link href={`/${lang}`} className="hover:text-white transition-colors">{isUk ? "Головна" : "Home"}</Link>
                <span>/</span>
                <Link href={`/${lang}/location`} className="hover:text-white transition-colors">{isUk ? "Міста" : "Cities"}</Link>
                <span>/</span>
                <span className="text-neutral-300">{cityName}</span>
              </nav>

              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 bg-indigo-500/20 text-indigo-300 text-sm font-medium px-3 py-1.5 rounded-full border border-indigo-500/30">
                  <MapPin className="w-3.5 h-3.5" /> {regionName}
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-heading font-extrabold mb-6 leading-tight">
                {isUk
                  ? <>{`Розробка сайтів `}<span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">{`у ${cityName}`}</span></>
                  : <>{`Website Development `}<span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">{`in ${cityName}`}</span></>}
              </h1>
              <p className="text-lg text-neutral-300 max-w-2xl mb-10">
                {isUk ? city.description : city.descriptionEn}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors"
                >
                  {isUk ? "Замовити сайт" : "Order a Website"} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/${lang}/niches`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-all"
                >
                  {isUk ? "Готові рішення" : "Ready Solutions"}
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Stats */}
        <section className="py-12 bg-indigo-600">
          <Container>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {city.stats.map((stat) => (
                <div key={stat.label} className="text-center text-white">
                  <div className="text-3xl font-sans font-extrabold tabular-nums tracking-tight mb-1">{stat.value}</div>
                  <div className="text-indigo-200 text-sm">{isUk ? stat.label : stat.labelEn}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Services in city */}
        <section className="py-20 bg-white dark:bg-neutral-950">
          <Container>
            <div className="max-w-2xl mb-12">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                {isUk ? `Послуги у ${cityName}` : `Services in ${cityName}`}
              </p>
              <h2 className="text-3xl lg:text-4xl font-heading font-extrabold text-neutral-900">
                {isUk ? "Що ми робимо для вашого бізнесу" : "What we do for your business"}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s) => (
                <div key={s.titleUk} className="rounded-2xl border border-neutral-100 dark:border-neutral-700 p-6 hover:shadow-lg hover:shadow-neutral-100 transition-shadow">
                  <span className="text-3xl mb-4 block">{s.icon}</span>
                  <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-2">
                    {isUk ? s.titleUk : s.titleEn}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {isUk ? s.descUk : s.descEn}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Why us */}
        <section className="py-20 bg-neutral-50 dark:bg-neutral-900 ">
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl lg:text-4xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
                {isUk ? `Чому обирають Codeworth у ${cityName}` : `Why businesses in ${cityName} choose Codeworth`}
              </h2>
              <p className="text-neutral-500">
                {isUk
                  ? "Ми розуміємо потреби локального бізнесу та допомагаємо рости в Google"
                  : "We understand local business needs and help you grow on Google"}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {WHY_US.map((item) => (
                <div key={item.labelUk} className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-100">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <div className="font-heading font-bold text-neutral-900 dark:text-white mb-1">
                      {isUk ? item.labelUk : item.labelEn}
                    </div>
                    <p className="text-sm text-neutral-500">{isUk ? item.descUk : item.descEn}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Process */}
        <section className="py-20 bg-white dark:bg-neutral-950">
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
                {isUk ? "Як ми працюємо" : "How we work"}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { num: "01", uk: "Консультація", en: "Consultation", dUk: "Обговорюємо цілі, аудиторію та бюджет. Безкоштовно.", dEn: "We discuss goals, audience, and budget. Free of charge." },
                { num: "02", uk: "ТЗ та дизайн", en: "Brief & Design", dUk: "Готуємо ТЗ та дизайн-макет у Figma. Затверджуємо разом.", dEn: "We prepare the brief and Figma design. Approved together." },
                { num: "03", uk: "Розробка", en: "Development", dUk: "Верстаємо, програмуємо, тестуємо. Ви бачите прогрес щотижня.", dEn: "We code, develop, and test. You see progress weekly." },
                { num: "04", uk: "Запуск та SEO", en: "Launch & SEO", dUk: "Розгортаємо на сервері, налаштовуємо SEO, передаємо доступи.", dEn: "Deploy on server, configure SEO, hand over access." },
              ].map((step) => (
                <div key={step.num} className="relative">
                  <div className="text-6xl font-heading font-extrabold text-neutral-100 mb-3">{step.num}</div>
                  <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-2">{isUk ? step.uk : step.en}</h3>
                  <p className="text-sm text-neutral-500">{isUk ? step.dUk : step.dEn}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ */}
        {city.faq.length > 0 && (
          <section className="py-20 bg-neutral-50 dark:bg-neutral-900 ">
            <Container>
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-heading font-extrabold text-neutral-900 dark:text-white mb-10 text-center">
                  {isUk ? `Часті питання — веб-розробка у ${cityName}` : `FAQ — Web development in ${cityName}`}
                </h2>
                <div className="space-y-4">
                  {city.faq.map((item) => (
                    <div key={item.q} className="rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 p-6">
                      <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-2">
                        {isUk ? item.q : item.qEn}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">{isUk ? item.a : item.aEn}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* Other cities */}
        <section className="py-16 bg-white dark:bg-neutral-800 border-t border-neutral-100">
          <Container>
            <h2 className="text-xl font-heading font-bold text-neutral-900 dark:text-white mb-6">
              {isUk ? "Також працюємо у містах:" : "We also serve cities:"}
            </h2>
            <div className="flex flex-wrap gap-3">
              {GEO_CITIES.filter((c) => c.slug !== city.slug).map((c) => (
                <Link
                  key={c.slug}
                  href={`/${lang}/location/${c.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-700 dark:text-neutral-300 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 transition-all"
                >
                  <MapPin className="w-3 h-3" /> {isUk ? c.nameUk : c.nameEn}
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-20 bg-neutral-950 text-white">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-heading font-extrabold mb-4">
                {isUk
                  ? <>{"Готові запустити сайт "}<span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">{`у ${cityName}`}</span>{"?"}</>
                  : <>{"Ready to launch a website "}<span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">{`in ${cityName}`}</span>{"?"}</>}
              </h2>
              <p className="text-neutral-400 mb-8">
                {isUk
                  ? "Консультація безкоштовна. Відповідаємо протягом 2 годин."
                  : "Consultation is free. We respond within 2 hours."}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg transition-colors"
                >
                  {isUk ? "Отримати консультацію" : "Get a Consultation"} <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href={`/${lang}/pricing`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-all"
                >
                  {isUk ? "Переглянути ціни" : "View Pricing"}
                </Link>
              </div>
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </div>
  );
}
