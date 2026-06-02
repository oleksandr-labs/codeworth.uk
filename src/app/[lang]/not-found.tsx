import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const headersList = await headers();
  const pathname = headersList.get("x-invoke-path") ?? headersList.get("referer") ?? "";
  const lang = pathname.startsWith("/uk") ? "uk" : "en";
  const isUk = lang === "uk";

  const popularLinks = isUk
    ? [
        { href: `/${lang}/portfolio`, label: "Портфоліо" },
        { href: `/${lang}/blog`, label: "Блог" },
        { href: `/${lang}/pricing`, label: "Ціни" },
        { href: `/${lang}/contact`, label: "Контакти" },
        { href: `/${lang}/faq`, label: "FAQ" },
      ]
    : [
        { href: `/${lang}/portfolio`, label: "Portfolio" },
        { href: `/${lang}/blog`, label: "Blog" },
        { href: `/${lang}/pricing`, label: "Pricing" },
        { href: `/${lang}/contact`, label: "Contact" },
        { href: `/${lang}/faq`, label: "FAQ" },
      ];

  return (
    <>
      <Header />
      <main className="flex-1 flex items-center bg-white dark:bg-neutral-900">
        <Container className="py-24 text-center">
          {/* Illustration */}
          <div className="relative inline-block mb-10">
            <div className="text-[10rem] leading-none select-none">
              <span className="relative">
                <span className="absolute inset-0 blur-3xl opacity-20 text-indigo-400">404</span>
                <span className="relative font-black text-transparent bg-clip-text bg-linear-to-br from-indigo-600 to-violet-500 font-syne">
                  404
                </span>
              </span>
            </div>
            {/* Floating emoji */}
            <div className="absolute -top-4 -right-6 text-4xl animate-bounce">🔍</div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold font-syne text-gray-900 dark:text-white mb-4">
            {isUk ? "Сторінку не знайдено" : "Page Not Found"}
          </h1>
          <p className="text-gray-500 dark:text-neutral-400 text-lg max-w-md mx-auto mb-10 leading-relaxed">
            {isUk
              ? "На жаль, ця сторінка не існує або була переміщена. Перевірте адресу або поверніться на головну."
              : "Sorry, this page doesn't exist or has been moved. Check the URL or go back to the homepage."}
          </p>

          {/* Quick links */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Button href={`/${lang}`} variant="primary" size="lg">
              {isUk ? "На головну" : "Home"}
            </Button>
            <Button href={`/${lang}/services`} variant="outline" size="lg">
              {isUk ? "Наші послуги" : "Our Services"}
            </Button>
            <Button href={`/${lang}/marketplace/catalog`} variant="outline" size="lg">
              {isUk ? "Маркетплейс" : "Marketplace"}
            </Button>
          </div>

          {/* Popular links */}
          <div className="text-sm text-gray-400 dark:text-neutral-500 dark:text-neutral-400 mb-4">
            {isUk ? "Популярні сторінки:" : "Popular pages:"}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {popularLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-neutral-300 text-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
