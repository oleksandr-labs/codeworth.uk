import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { SERVICES_DATA, getServiceLocalized } from "@/lib/data/services";
import { BLOG_POSTS } from "@/lib/data/blog";
import { PROJECTS } from "@/lib/data/portfolio";
import { EXTRAS, EXTRA_CATEGORIES } from "@/lib/data/extras";
import {
  Home,
  Briefcase,
  ShoppingBag,
  BookOpen,
  FileText,
  Image,
  Map,
  ChevronRight,
  Zap,
} from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk ? "Карта сайту | Codeworth — ML/AI Консалтинг" : "Site Map | Codeworth — ML/AI Consultancy",
    description: isUk
      ? "Повна карта сайту Codeworth — всі сторінки ML/AI послуг, кейсів, блогу та компанії в одному місці."
      : "Complete Codeworth site map — all ML/AI service pages, case studies, blog, and company pages in one place.",
    robots: { index: true, follow: true },
    openGraph: {
      title: isUk ? "Карта сайту — Codeworth" : "Site Map — Codeworth",
      description: isUk
        ? "Повна карта сайту Codeworth — всі сторінки ML/AI послуг, кейсів, блогу та компанії."
        : "Complete Codeworth site map — all ML/AI service pages, case studies, blog, and company pages.",
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

  const sections: SitemapSection[] = [
    {
      title: isUk ? "Головні сторінки" : "Main pages",
      icon: Home,
      color: "indigo",
      links: [
        { href: lp("/"), label: isUk ? "Головна" : "Home", description: isUk ? "ML/AI консалтинг для бізнесу" : "ML/AI consultancy for business" },
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
      title: isUk ? "AI & ML Рішення" : "AI & ML Solutions",
      icon: ShoppingBag,
      color: "emerald",
      links: [
        { href: lp("/ai"), label: isUk ? "AI рішення за галузями" : "AI solutions by industry", description: isUk ? "AI для FinTech, Healthcare, Retail та інших" : "AI for FinTech, Healthcare, Retail and more" },
        { href: lp("/ml"), label: isUk ? "ML рішення" : "ML solutions", description: isUk ? "Machine Learning для специфіки вашої ніші" : "Machine Learning tailored to your niche" },
        { href: lp("/use-cases"), label: isUk ? "Use cases" : "Use cases", description: isUk ? "Конкретні сценарії застосування ML/AI" : "Specific ML/AI application scenarios" },
        { href: lp("/compare"), label: isUk ? "Порівняння підходів" : "Compare approaches", description: isUk ? "Codeworth vs. in-house team vs. AutoML" : "Codeworth vs. in-house team vs. AutoML" },
        { href: lp("/extras"), label: isUk ? "AI-модулі" : "AI modules", description: isUk ? "Готові AI-продукти для швидкого деплою" : "Ready-to-deploy AI products" },
      ],
    },
    {
      title: isUk ? "Блог" : "Blog",
      icon: BookOpen,
      color: "blue",
      links: [
        { href: lp("/blog"), label: isUk ? "Всі статті" : "All articles", description: isUk ? "Корисний контент про ML/AI та машинне навчання" : "Useful content about ML/AI and machine learning" },
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
        { href: lp("/extras"), label: isUk ? "Всі AI-модулі" : "All AI modules", description: isUk ? "29+ готових AI-продуктів для бізнесу" : "29+ ready-to-deploy AI products for business" },
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
                ? "Всі розділи, сторінки ML/AI послуг, кейси, статті блогу та AI-модулі в одному зручному місці."
                : "All sections, ML/AI service pages, case studies, blog articles, and AI modules in one convenient place."}
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
