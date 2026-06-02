import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SkeletonCard } from "@/components/ui/Skeleton";
import CatalogClient from "./CatalogClient";

function CatalogFallback() {
  return (
    <section className="py-10">
      <Container>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </Container>
    </section>
  );
}

export const revalidate = 600; // ISR: revalidate every 10 minutes

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk
      ? "Каталог готових рішень — Маркетплейс"
      : "Ready-Made Solutions Catalog — Marketplace",
    description: isUk
      ? "Каталог готових сайтів для бізнесу — ресторани, салони краси, медицина, будівництво та ще 30+ ніш. Фільтрація за категорією, ціною та складністю."
      : "Catalog of ready-made websites for business — restaurants, beauty salons, medicine, construction and 30+ more niches. Filter by category, price, and complexity.",
    openGraph: {
      title: isUk ? "Каталог готових рішень — Codeworth" : "Ready-Made Solutions Catalog — Codeworth",
      description: isUk
        ? "33 готових нішевих сайти для бізнесу. Фільтруйте за категорією, ціною та складністю."
        : "33 ready-made niche websites for business. Filter by category, price, and complexity.",
      type: "website",
      url: `https://codeworth.uk/${lang}/marketplace/catalog`,
      images: [{ url: "/og/marketplace.png", width: 1200, height: 630, alt: isUk ? "Каталог Codeworth" : "Codeworth Catalog" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isUk ? "Каталог готових рішень — Codeworth" : "Ready-Made Solutions Catalog — Codeworth",
      images: ["/og/marketplace.png"],
    },
    alternates: buildAlternates(lang, 'marketplace/catalog'),
  };
}

export default async function CatalogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isUk = lang === "uk";
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="bg-linear-to-br from-indigo-950 to-indigo-800 text-white py-16 md:py-20">
          <Container>
            <Breadcrumb
              className="text-white/60 mb-8 [&_a]:text-white/60 [&_a:hover]:text-white [&_span.text-gray-800]:text-white [&_svg]:text-white/40"
              items={[
                { label: isUk ? "Маркетплейс" : "Marketplace", href: `/${lang}/marketplace` },
                { label: isUk ? "Каталог рішень" : "Solutions Catalog" },
              ]}
            />
            <h1 className="text-4xl md:text-5xl font-bold font-syne mb-4">
              {isUk ? "Каталог готових рішень" : "Ready-Made Solutions Catalog"}
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              {isUk
                ? "Обирайте готовий сайт для вашої ніші — налаштуємо під ваш бренд та запустимо за кілька днів."
                : "Choose a ready-made website for your niche — we'll customize it for your brand and launch it in a few days."}
            </p>
          </Container>
        </section>

        {/* Catalog with filters */}
        <Suspense fallback={<CatalogFallback />}>
          <CatalogClient />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
