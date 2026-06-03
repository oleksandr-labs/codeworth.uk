import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import Link from "next/link";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { SERVICES_DATA, getServiceLocalized } from "@/lib/data/services";
import { BLOG_POSTS } from "@/lib/data/blog";
import { PROJECTS } from "@/lib/data/portfolio";
import { NICHES_DATA, NICHE_CATEGORIES, NICHE_CATEGORY_EN, getNicheLocalized } from "@/lib/data/niches";
import { EXTRAS, EXTRA_CATEGORIES } from "@/lib/data/extras";
import {
  Home,
  Briefcase,
  ShoppingBag,
  BookOpen,
  Info,
  Phone,
  HelpCircle,
  FileText,
  LayoutGrid,
  Users,
  DollarSign,
  Image,
  Map,
  ChevronRight,
  Zap,
} from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk ? "Карта сайту | Codeworth — Веб-студія" : "Site Map | Codeworth — Web Studio",
    description: isUk
      ? "Повна карта сайту Codeworth — всі сторінки послуг, маркетплейсу, рішень, блогу та компанії в одному місці."
      : "Complete Codeworth site map — all service pages, marketplace, solutions, blog, and company pages in one place.",
    robots: { index: true, follow: true },
    openGraph: {
      title: isUk ? "Карта сайту — Codeworth" : "Site Map — Codeworth",
      description: isUk
        ? "Повна карта сайту Codeworth — всі сторінки послуг, маркетплейсу, рішень, блогу та компанії."
        : "Complete Codeworth site map — all service pages, marketplace, solutions, blog, and company pages.",
      type: "website",
      url: `https://codeworth.uk/${lang}/sitemap`,
      images: [{ url: "/og/sitemap.png", width: 1200, height: 630, alt: isUk ? "Карта сайту Codeworth" : "Codeworth Site Map" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isUk ? "Карта сайту — Codeworth" : "Site Map — Codeworth",
      images: ["/og/sitemap.png"],
    },
    alternates: buildAlternates(lang, 'sitemap'),
  };
}

interface SitemapSection {
  title: string;
  icon: React.ElementType;
  color: string;
  links: { href: string; label: string; description?: string }[];
}

export default async function SitemapPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isUk = lang === "uk";
  const lp = (path: string) => `/${lang}${path}`;

  const nichesByCategory = NICHE_CATEGORIES.map((cat) => ({
    category: isUk ? cat : (NICHE_CATEGORY_EN[cat] ?? cat),
    niches: NICHES_DATA.filter((n) => n.category === cat).map((n) => getNicheLocalized(n.slug, lang) ?? n),
  })).filter((g) => g.niches.length > 0);

  const sections: SitemapSection[] = [
    {
      title: isUk ? "Головні сторінки" : "Main pages",
      icon: Home,
      color: "indigo",
      links: [
        { href: lp("/"), label: isUk ? "Головна" : "Home", description: isUk ? "Презентація студії та ключові послуги" : "Studio presentation and key services" },
        { href: lp("/about"), label: isUk ? "Про нас" : "About us", description: isUk ? "Команда, місія та цінності Codeworth" : "Team, mission, and values of Codeworth" },
        { href: lp("/portfolio"), label: isUk ? "Портфоліо" : "Portfolio", description: isUk ? "Наші кращі реалізовані проєкти" : "Our best completed projects" },
        { href: lp("/pricing"), label: isUk ? "Ціни" : "Pricing", description: isUk ? "Тарифи та пакети послуг" : "Plans and service packages" },
        { href: lp("/contact"), label: isUk ? "Контакти" : "Contact", description: isUk ? "Зв'яжіться з нами" : "Get in touch with us" },
        { href: lp("/faq"), label: "FAQ", description: isUk ? "Відповіді на поширені запитання" : "Answers to frequently asked questions" },
        { href: lp("/privacy"), label: isUk ? "Політика конфіденційності" : "Privacy Policy", description: isUk ? "Умови обробки даних" : "Data processing terms" },
        { href: lp("/terms-of-service"), label: isUk ? "Угода користувача" : "Terms of Service", description: isUk ? "Умови надання послуг" : "Service terms and conditions" },
      ],
    },
    {
      title: isUk ? "Послуги" : "Services",
      icon: Briefcase,
      color: "violet",
      links: [
        { href: lp("/services"), label: isUk ? "Всі послуги" : "All services", description: isUk ? "Огляд усіх послуг Codeworth" : "Overview of all Codeworth services" },
        ...SERVICES_DATA.map((s) => {
          const svc = getServiceLocalized(s.slug, lang) ?? s;
          return {
            href: lp(`/services/${svc.slug}`),
            label: svc.title,
            description: svc.description,
          };
        }),
      ],
    },
    {
      title: isUk ? "Маркетплейс" : "Marketplace",
      icon: ShoppingBag,
      color: "emerald",
      links: [
        { href: lp("/marketplace"), label: isUk ? "Головна маркетплейсу" : "Marketplace home", description: isUk ? "Готові рішення для бізнесу" : "Ready-made solutions for business" },
        { href: lp("/niches"), label: isUk ? "Всі рішення (33+)" : "All Solutions (33+)", description: isUk ? "Готові сайти по галузях" : "Ready-made websites by industry" },
        { href: lp("/marketplace/catalog"), label: isUk ? "Каталог рішень" : "Solutions catalog", description: isUk ? "Всі продукти з фільтрами" : "All products with filters" },
        ...NICHES_DATA.slice(0, 6).map((rawN) => {
          const n = getNicheLocalized(rawN.slug, lang) ?? rawN;
          return {
            href: lp(`/marketplace/product/${n.slug}`),
            label: `${n.emoji} ${n.title}`,
            description: isUk
              ? `Готове рішення — від ${n.priceFrom.toLocaleString("uk-UA")} ₴`
              : `Ready-made solution — from $${Math.round(n.priceFrom / 40)}`,
          };
        }),
        { href: lp("/marketplace/catalog"), label: isUk ? "→ Усі 33 продукти в каталозі" : "→ All 33 products in catalog", description: "" },
        { href: lp("/startup"), label: isUk ? "🚀 Стартап-рішення" : "🚀 Startup Solutions", description: isUk ? "5+ готових лендінгів для стартапів" : "5+ ready-made landing pages for startups" },
      ],
    },
    {
      title: isUk ? "Блог" : "Blog",
      icon: BookOpen,
      color: "blue",
      links: [
        { href: lp("/blog"), label: isUk ? "Всі статті" : "All articles", description: isUk ? "Корисний контент про веб-розробку та маркетинг" : "Useful content about web development and marketing" },
        ...BLOG_POSTS.map((p) => ({
          href: lp(`/blog/${p.slug}`),
          label: `${p.emoji} ${p.title}`,
          description: p.excerpt,
        })),
      ],
    },
    {
      title: isUk ? "Портфоліо" : "Portfolio",
      icon: Image,
      color: "pink",
      links: [
        { href: lp("/portfolio"), label: isUk ? "Всі проєкти" : "All projects", description: isUk ? "Кейси та реалізовані роботи" : "Case studies and completed work" },
        ...PROJECTS.map((p) => ({
          href: lp(`/portfolio/${p.slug}`),
          label: `${p.emoji} ${p.title}`,
          description: p.description,
        })),
      ],
    },
    {
      title: isUk ? "Доробки та модулі" : "Add-ons & modules",
      icon: Zap,
      color: "orange",
      links: [
        { href: lp("/extras"), label: isUk ? "Всі доробки" : "All add-ons", description: isUk ? "42+ готових модулі для сайту" : "42+ ready-made modules for your site" },
        ...EXTRA_CATEGORIES.map((cat) => {
          const count = EXTRAS.filter((e) => e.category === cat.value).length;
          return {
            href: lp(`/extras#${cat.value}`),
            label: `${cat.emoji} ${cat.label}`,
            description: `${count} ${isUk ? "позицій" : "items"} — ${cat.description}`,
          };
        }),
      ],
    },
  ];

  const colorMap: Record<string, string> = {
    indigo: "bg-indigo-100 text-indigo-700",
    violet: "bg-violet-100 text-violet-700",
    emerald: "bg-emerald-100 text-emerald-700",
    blue: "bg-blue-100 text-blue-700",
    pink: "bg-pink-100 text-pink-700",
    orange: "bg-orange-100 text-orange-700",
  };

  const iconBorderMap: Record<string, string> = {
    indigo: "border-indigo-200",
    violet: "border-violet-200",
    emerald: "border-emerald-200",
    blue: "border-blue-200",
    pink: "border-pink-200",
    orange: "border-orange-200",
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="bg-linear-to-br from-indigo-950 via-gray-900 to-black py-16">
          <Container>
            <div className="flex items-center gap-3 text-indigo-400 mb-4">
              <Map className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-widest">{isUk ? "Навігація" : "Navigation"}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {isUk ? "Карта сайту" : "Site Map"}
            </h1>
            <p className="text-gray-400 dark:text-neutral-500 text-lg max-w-2xl">
              {isUk
                ? "Всі розділи, сторінки послуг, продукти маркетплейсу, статті блогу та нішеві demo-сторінки в одному зручному місці."
                : "All sections, service pages, marketplace products, blog articles, and niche demo pages in one convenient place."}
            </p>
          </Container>
        </section>

        {/* Main sections */}
        <section className="py-16">
          <Container>
            <div className="grid gap-10">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <div key={section.title} className={`border rounded-2xl overflow-hidden ${iconBorderMap[section.color]}`}>
                    <div className={`px-6 py-4 flex items-center gap-3 ${colorMap[section.color]} bg-opacity-10`}>
                      <Icon className="w-5 h-5" />
                      <h2 className="text-lg font-semibold">{section.title}</h2>
                      <span className="ml-auto text-sm opacity-60">{section.links.length} {isUk ? "сторінок" : "pages"}</span>
                    </div>
                    <ul className="divide-y divide-gray-100">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="flex items-start gap-3 px-6 py-3 hover:bg-gray-50 dark:bg-neutral-900 transition-colors group"
                          >
                            <ChevronRight className="w-4 h-4 mt-0.5 text-gray-400 dark:text-neutral-500 group-hover:text-indigo-600 shrink-0 transition-colors" />
                            <div>
                              <span className="text-sm font-medium text-gray-800 dark:text-neutral-200 group-hover:text-indigo-700 transition-colors">
                                {link.label}
                              </span>
                              {link.description && (
                                <p className="text-xs text-gray-500 dark:text-neutral-400 mt-0.5 line-clamp-1">{link.description}</p>
                              )}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Niches section */}
        <section className="py-8 bg-gray-50">
          <Container>
            <div className="flex items-center gap-3 mb-8">
              <LayoutGrid className="w-5 h-5 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">{isUk ? "Готові рішення по галузях" : "Ready-Made Solutions by Industry"}</h2>
              <span className="ml-2 px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full font-medium">
                {isUk ? `${NICHES_DATA.length}+ рішень` : `${NICHES_DATA.length}+ solutions`}
              </span>
            </div>
            <div className="grid gap-6">
              {nichesByCategory.map(({ category, niches }) => (
                <div key={category} className="border border-orange-200 rounded-xl overflow-hidden">
                  <div className="px-5 py-3 bg-orange-50 border-b border-orange-100">
                    <h3 className="text-sm font-semibold text-orange-800">{category}</h3>
                  </div>
                  <ul className="divide-y divide-gray-100 bg-white">
                    {niches.map((niche) => (
                      <li key={niche.slug}>
                        <Link
                          href={lp(`/niches/${niche.slug}`)}
                          className="flex items-center gap-3 px-5 py-2.5 hover:bg-orange-50 transition-colors group"
                        >
                          <EmojiIcon emoji={niche.emoji} className="w-5 h-5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-medium text-gray-800 dark:text-neutral-200 group-hover:text-orange-700 transition-colors">
                              {niche.title}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-neutral-500 ml-2">{niche.subtitle}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-orange-500 shrink-0 transition-colors" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* XML sitemap note */}
        <section className="py-10">
          <Container>
            <div className="rounded-xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <FileText className="w-6 h-6 text-gray-500 dark:text-neutral-400 shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-700">{isUk ? "XML Sitemap для пошукових систем" : "XML Sitemap for search engines"}</p>
                <p className="text-xs text-gray-500 dark:text-neutral-400 mt-0.5">
                  {isUk
                    ? "Автоматично генерується Next.js. Містить всі публічні URL з пріоритетами та датами оновлення."
                    : "Automatically generated by Next.js. Contains all public URLs with priorities and update dates."}
                </p>
              </div>
              <Link
                href="/sitemap.xml"
                target="_blank"
                className="ml-auto shrink-0 text-sm text-indigo-600 hover:text-indigo-800 font-medium underline underline-offset-2"
              >
                /sitemap.xml →
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
