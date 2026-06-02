import type { Metadata } from "next";
import Link from "next/link";
import { buildAlternates } from "@/i18n";
import { EXTRAS } from "@/lib/data/extras";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

interface Props {
  params: Promise<{ lang: string }>;
}

const AI_PRODUCTS = EXTRAS.filter((e) => e.category === "ai");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";

  const title = isUk
    ? `AI Каталог рішень — ${AI_PRODUCTS.length} готових AI-продуктів | CodeNest`
    : `AI Solutions Catalog — ${AI_PRODUCTS.length} ready-to-deploy AI products | CodeNest`;
  const description = isUk
    ? `${AI_PRODUCTS.length} готових AI-рішень для бізнесу: чат-боти, генератори контенту, vision search, recommendation engines. Ціни від ₴2 500. SoftwareApplication schema, Rich Snippets ready.`
    : `${AI_PRODUCTS.length} ready-to-deploy AI products: chatbots, content generators, visual search, recommendation engines. From £75. SoftwareApplication schema, Rich Snippets ready.`;

  return {
    title,
    description,
    alternates: buildAlternates(lang, "/ai-solutions"),
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://codenest.com.ua/${lang}/ai-solutions`,
    },
  };
}

function gbpFromUah(uah: number): number {
  return Math.round(uah / 40);
}

export default async function AISolutionsCatalogPage({ params }: Props) {
  const { lang } = await params;
  const isUk = lang === "uk";

  // Schema.org: ItemList of SoftwareApplication
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isUk ? "Каталог AI-рішень CodeNest" : "CodeNest AI Solutions Catalog",
    numberOfItems: AI_PRODUCTS.length,
    itemListElement: AI_PRODUCTS.map((product, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: product.title,
        description: product.description,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: isUk ? product.priceFrom : gbpFromUah(product.priceFrom),
          priceCurrency: isUk ? "UAH" : "GBP",
          availability: "https://schema.org/InStock",
        },
        url: `https://codenest.com.ua/${lang}/extras/${product.id}`,
        provider: {
          "@type": "Organization",
          name: "CodeNest",
        },
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isUk ? "Головна" : "Home", item: `https://codenest.com.ua/${lang}` },
      { "@type": "ListItem", position: 2, name: isUk ? "AI-рішення" : "AI Solutions", item: `https://codenest.com.ua/${lang}/ai` },
      { "@type": "ListItem", position: 3, name: isUk ? "Каталог" : "Catalog", item: `https://codenest.com.ua/${lang}/ai-solutions` },
    ],
  };

  const popularProducts = AI_PRODUCTS.filter((p) => p.isPopular);
  const otherProducts = AI_PRODUCTS.filter((p) => !p.isPopular);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative py-20 bg-linear-to-br from-violet-900 via-indigo-900 to-slate-900">
          <Container>
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
              <Link href={`/${lang}`} className="hover:text-white transition-colors">{isUk ? "Головна" : "Home"}</Link>
              <span>/</span>
              <Link href={`/${lang}/ai`} className="hover:text-white transition-colors">{isUk ? "AI-рішення" : "AI Solutions"}</Link>
              <span>/</span>
              <span className="text-white">{isUk ? "Каталог" : "Catalog"}</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-semibold mb-4">
              <Sparkles className="w-3 h-3" />
              {AI_PRODUCTS.length} {isUk ? "AI-продуктів" : "AI products"}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl">
              {isUk ? "Готові AI-рішення для вашого бізнесу" : "Ready-to-deploy AI solutions for your business"}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl">
              {isUk
                ? "Чат-боти, генератори контенту, semantic search, computer vision. Інтегруємо за 3–14 днів."
                : "Chatbots, content generators, semantic search, computer vision. Integrated in 3–14 days."}
            </p>
          </Container>
        </section>

        {/* Popular */}
        {popularProducts.length > 0 && (
          <section className="py-16 bg-white">
            <Container>
              <h2 className="text-3xl font-bold text-neutral-900 mb-3">
                {isUk ? "Популярні рішення" : "Popular solutions"}
              </h2>
              <p className="text-neutral-500 mb-10">
                {isUk ? "Найчастіше замовляють наші клієнти" : "Most ordered by our clients"}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {popularProducts.map((p) => (
                  <ProductCard key={p.id} product={p} lang={lang} isUk={isUk} highlight />
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* All other */}
        <section className="py-16 bg-neutral-50">
          <Container>
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">
              {isUk ? "Всі AI-рішення" : "All AI solutions"}
            </h2>
            <p className="text-neutral-500 mb-10">
              {isUk
                ? `${AI_PRODUCTS.length} продуктів у каталозі — від базової автоматизації до enterprise RAG.`
                : `${AI_PRODUCTS.length} products in catalog — from basic automation to enterprise RAG.`}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {otherProducts.map((p) => (
                <ProductCard key={p.id} product={p} lang={lang} isUk={isUk} />
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 bg-linear-to-r from-indigo-600 to-violet-600">
          <Container className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {isUk ? "Не знаєте з чого почати?" : "Not sure where to start?"}
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              {isUk
                ? "Безкоштовна 30-хвилинна консультація — обговоримо ваш кейс і підберемо оптимальне рішення."
                : "Free 30-min consultation — we'll discuss your use case and recommend the best solution."}
            </p>
            <Link
              href={`/${lang}/contact?subject=AI%20Solutions`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-indigo-700 font-semibold hover:bg-white/90 transition-colors"
            >
              {isUk ? "Безкоштовна консультація" : "Free consultation"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ProductCard({
  product,
  lang,
  isUk,
  highlight = false,
}: {
  product: (typeof EXTRAS)[number];
  lang: string;
  isUk: boolean;
  highlight?: boolean;
}) {
  const price = isUk
    ? `від ₴${product.priceFrom.toLocaleString("uk-UA")}`
    : `from £${gbpFromUah(product.priceFrom).toLocaleString("en-GB")}`;

  return (
    <Link
      href={`/${lang}/extras/${product.id}`}
      className={`group rounded-2xl border bg-white p-6 hover:shadow-xl transition-all hover:-translate-y-1 ${
        highlight ? "border-violet-200 ring-1 ring-violet-100" : "border-neutral-100"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="text-3xl">{product.emoji}</div>
        {product.hasDemo && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
            <CheckCircle2 className="w-3 h-3" />
            Demo
          </span>
        )}
      </div>
      <h3 className="font-semibold text-neutral-900 group-hover:text-indigo-700 transition-colors mb-2">
        {product.title}
      </h3>
      <p className="text-sm text-neutral-500 leading-relaxed mb-4 line-clamp-3">{product.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {product.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 text-xs font-medium">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <span className="text-sm font-semibold text-indigo-700">{price}</span>
        <span className="text-xs text-neutral-400">
          {product.deliveryDays} {isUk ? "днів" : "days"}
        </span>
      </div>
    </Link>
  );
}
