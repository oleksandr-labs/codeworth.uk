import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { CTASection } from "@/components/home/CTASection";
import { PortfolioContent } from "@/components/portfolio/PortfolioContent";
import { CountUp } from "@/components/ui/CountUp";
import { ExternalLink } from "lucide-react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import { PROJECTS } from "@/lib/data/portfolio";
import { NICHES_DATA, getNicheLocalized } from "@/lib/data/niches";
import { cn } from "@/lib/utils";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk
      ? "Готові рішення та кейси — Codeworth | від £499 | Запуск за 3–7 днів"
      : "Ready Solutions & Case Studies — Codeworth | from £499 | Launch in 3–7 days",
    description: isUk
      ? "120+ готових рішень для різних ніш бізнесу від Codeworth. Ресторани, салони краси, медицина, е-комерс, SaaS — від £499, запуск за 3–7 днів."
      : "120+ ready-made solutions for various business niches by Codeworth. Restaurants, beauty salons, medical, e-commerce, SaaS — from £499, launch in 3–7 days.",
    alternates: buildAlternates(lang, 'portfolio'),
    openGraph: {
      title: isUk
        ? "Готові рішення та кейси — Codeworth | від £499"
        : "Ready Solutions & Case Studies — Codeworth | from £499",
      description: isUk
        ? "120+ готових рішень для різних ніш бізнесу від Codeworth. від £499, запуск за 3–7 днів."
        : "120+ ready-made solutions for various business niches by Codeworth. From £499, launch in 3–7 days.",
      type: "website",
      url: `https://codeworth.uk/${lang}/portfolio`,
      images: [{ url: "/og/portfolio.png", width: 1200, height: 630, alt: isUk ? "Портфоліо Codeworth" : "Codeworth Portfolio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isUk ? "Портфоліо — Codeworth" : "Portfolio — Codeworth",
      description: isUk ? "120+ реалізованих проєктів від веб-студії Codeworth." : "120+ completed projects by Codeworth web studio.",
      images: ["/og/portfolio.png"],
    },
  };
}

const portfolioItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Портфоліо Codeworth",
  description: "Реалізовані проєкти веб-студії Codeworth",
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
                {isUk ? "Готові рішення та кейси" : "Ready Solutions & Case Studies"}
              </p>
              <h1 className="text-5xl lg:text-6xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
                {isUk ? "Що ми можемо зробити для вас" : "What We Can Build for You"}
              </h1>
              <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto mb-6">
                {isUk
                  ? "Кожен проєкт нижче — це готове рішення, яке ви можете замовити. Натисніть щоб побачити деталі та ціну."
                  : "Every project below is a ready-made solution you can order. Click to see details and pricing."}
              </p>
              <div className="flex items-center justify-center gap-3 text-sm">
                <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-medium inline-flex items-center gap-1">
                  <EmojiIcon emoji="✅" className="w-3.5 h-3.5" />{isUk ? "Від £499" : "From £499"}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 font-medium inline-flex items-center gap-1">
                  <EmojiIcon emoji="⚡" className="w-3.5 h-3.5" />{isUk ? "Запуск за 3–7 днів" : "Launch in 3–7 days"}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 font-medium inline-flex items-center gap-1">
                  <EmojiIcon emoji="🎨" className="w-3.5 h-3.5" />Customizer
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
                { end: 120, suffix: "+", label: isUk ? "Проєктів" : "Projects" },
                { end: 85, suffix: "+", label: isUk ? "Клієнтів" : "Clients" },
                { end: 4, suffix: "+", label: isUk ? "Роки роботи" : "Years" },
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

        {/* How it works */}
        <section className="py-16 bg-white dark:bg-neutral-800 border-b border-neutral-100">
          <Container>
            <div className="max-w-xl mx-auto text-center mb-10">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                {isUk ? "Як це працює" : "How It Works"}
              </p>
              <h2 className="text-3xl font-heading font-extrabold text-neutral-900">
                {isUk ? "Від прикладу до запуску — 3 кроки" : "From Example to Launch — 3 Steps"}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  step: "01",
                  icon: "👀",
                  title: isUk ? "Вибери приклад" : "Pick an Example",
                  desc: isUk
                    ? "Перегляньте кейси та готові демо-сайти нижче. Знайдіть рішення для вашої ніші або схожий стиль."
                    : "Browse the case studies and live demo sites below. Find the solution for your niche or a similar style.",
                  color: "bg-indigo-50 text-indigo-600",
                },
                {
                  step: "02",
                  icon: "🖥️",
                  title: isUk ? "Перегляньте демо" : "View the Demo",
                  desc: isUk
                    ? "Кожен проєкт — живий сайт. Натисніть «Демо» щоб побачити як він виглядає в дії, змініть кольори і шрифти."
                    : "Every project is a live site. Click 'Demo' to see it in action, change colors and fonts to match your brand.",
                  color: "bg-violet-50 text-violet-600",
                },
                {
                  step: "03",
                  icon: "🚀",
                  title: isUk ? "Замовте та запустіться" : "Order & Launch",
                  desc: isUk
                    ? "Натисніть «Замовити подібне», ми зв'яжемось протягом кількох годин і запустимо ваш сайт за 3–7 днів."
                    : "Click 'Order Similar', we'll reach out within hours and launch your site in 3–7 days.",
                  color: "bg-emerald-50 text-emerald-600",
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

        {/* Client success metrics */}
        <section className="py-16 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-10">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                {isUk ? "Результати клієнтів" : "Client Results"}
              </p>
              <h2 className="text-3xl font-heading font-extrabold text-neutral-900">
                {isUk ? "Що отримують наші клієнти" : "What Our Clients Achieve"}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  metric: isUk ? "+60%" : "+60%",
                  label: isUk ? "середній ріст онлайн-замовлень у перший місяць" : "average growth in online orders in the first month",
                  example: isUk ? "Ресторан «Смачно»" : "Restaurant 'Smachno'",
                  color: "from-emerald-500 to-teal-600",
                },
                {
                  metric: isUk ? "90+" : "90+",
                  label: isUk ? "PageSpeed Score у кожного клієнта після запуску" : "PageSpeed Score for every client after launch",
                  example: isUk ? "Core Web Vitals: LCP < 2.5с" : "Core Web Vitals: LCP < 2.5s",
                  color: "from-indigo-500 to-violet-600",
                },
                {
                  metric: isUk ? "3 дні" : "3 days",
                  label: isUk ? "середній термін запуску готового нішевого рішення" : "average launch time for a ready-made niche solution",
                  example: isUk ? "vs 3–8 тижнів з нуля" : "vs 3–8 weeks from scratch",
                  color: "from-amber-500 to-orange-600",
                },
                {
                  metric: isUk ? "98%" : "98%",
                  label: isUk ? "задоволених клієнтів рекомендують нас іншим" : "of satisfied clients recommend us to others",
                  example: isUk ? "за результатами опитування 2025" : "based on 2025 survey",
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

        {/* Niche demo projects */}
        <section className="py-24 bg-neutral-50 dark:bg-neutral-900 ">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                {isUk ? "Готові рішення по нішах" : "Ready Solutions by Niche"}
              </p>
              <h2 className="text-4xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
                {isUk ? `${NICHES_DATA.length}+ рішень — оберіть своє` : `${NICHES_DATA.length}+ Solutions — Choose Yours`}
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {isUk
                  ? "Живі демо-сайти для різних типів бізнесу. Саме так виглядатиме ваш сайт. Можна замовити вже сьогодні."
                  : "Live demo sites for different business types. This is exactly what your site will look like. Order today."}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-10">
              {NICHES_DATA.map((rawNiche) => {
                const niche = getNicheLocalized(rawNiche.slug, lang) ?? rawNiche;
                return (<Link
                  key={niche.slug}
                  href={`/${lang}/niches/${niche.slug}`}
                  className="group relative p-4 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 hover:border-indigo-100 hover:shadow-md transition-all text-center overflow-hidden"
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${niche.gradient}`} />
                  <div className="mb-2"><EmojiIcon emoji={niche.emoji} className="w-8 h-8 text-white/80" /></div>
                  <div className="font-semibold text-neutral-900 dark:text-white text-xs leading-tight mb-1.5 group-hover:text-indigo-700 transition-colors">
                    {niche.title}
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full font-medium",
                      niche.complexity === "simple" ? "bg-emerald-50 text-emerald-600" :
                      niche.complexity === "medium" ? "bg-amber-50 text-amber-600" :
                      "bg-red-50 text-red-600"
                    )}>
                      {niche.complexity === "simple" ? "🟢" : niche.complexity === "medium" ? "🟡" : "🔴"}
                    </span>
                    <span className="text-xs text-neutral-400">
                      {isUk ? `від ${(niche.priceFrom / 1000).toFixed(0)}к` : `from $${Math.round(niche.priceFrom / 40)}`}
                    </span>
                  </div>
                  <div className="mt-2 text-[10px] text-indigo-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                    <ExternalLink className="w-3 h-3" /> Live Demo
                  </div>
                </Link>
                );
              })}
            </div>

            <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={`/${lang}/niches`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
              >
                {isUk ? "Всі рішення по нішах" : "All Solutions by Niche"}
                <ExternalLink className="w-4 h-4" />
              </Link>
              <Link
                href={`/${lang}/marketplace`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-indigo-200 text-indigo-700 font-semibold hover:bg-indigo-50 transition-colors"
              >
                {isUk ? "Маркетплейс (каталог + ціни)" : "Marketplace (catalog + prices)"}
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </section>

        <CTASection lang={lang} />
      </main>
      <Footer />
    </div>
  );
}
