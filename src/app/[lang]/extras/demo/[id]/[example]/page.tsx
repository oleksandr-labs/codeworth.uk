import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildAlternates } from "@/i18n";
import { EXTRAS } from "@/lib/data/extras";
import { getDemoExamples } from "@/lib/data/extras-demos";

// Demo implementations (lazy-loaded per module type)
import { GenericDemo } from "@/components/extras/demos/GenericDemo";
import { AiCopywriterDemo } from "@/components/extras/demos/AiCopywriterDemo";
import { AiVoiceSearchDemo } from "@/components/extras/demos/AiVoiceSearchDemo";
import { AiPriceOptimizerDemo } from "@/components/extras/demos/AiPriceOptimizerDemo";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

interface Props {
  params: Promise<{ lang: string; id: string; example: string }>;
}

export async function generateStaticParams() {
  const params: { lang: string; id: string; example: string }[] = [];
  for (const lang of ["en", "uk"]) {
    for (const extra of EXTRAS.filter((e) => e.hasDemo)) {
      const examples = getDemoExamples(extra.id);
      for (const ex of examples) {
        params.push({ lang, id: extra.id, example: ex.id });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, id, example } = await params;
  const isUk = lang === "uk";
  const extra = EXTRAS.find((e) => e.id === id);
  const examples = getDemoExamples(id);
  const ex = examples.find((e) => e.id === example);
  if (!extra || !ex) return {};

  const title = isUk
    ? `Демо: ${isUk ? ex.titleUk : ex.title} — Codeworth`
    : `Demo: ${ex.title} — Codeworth`;
  const description = isUk ? ex.descriptionUk : ex.description;

  return {
    title,
    description,
    alternates: buildAlternates(`/extras/demo/${id}/${example}`),
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://codeworth.uk/${lang}/extras/demo/${id}/${example}`,
    },
  };
}

function getDemoComponent(extraId: string, exampleId: string, lang: string) {
  const isUk = lang === "uk";
  switch (extraId) {
    case "ai-copywriter":
      return <AiCopywriterDemo variant={exampleId} isUk={isUk} />;
    case "ai-voice-search":
      return <AiVoiceSearchDemo variant={exampleId} isUk={isUk} />;
    case "ai-price-optimizer":
      return <AiPriceOptimizerDemo variant={exampleId} isUk={isUk} />;
    default:
      return <GenericDemo extraId={extraId} exampleId={exampleId} isUk={isUk} />;
  }
}

export default async function ExtraDemoExamplePage({ params }: Props) {
  const { lang, id, example } = await params;
  const isUk = lang === "uk";
  const extra = EXTRAS.find((e) => e.id === id);
  const examples = getDemoExamples(id);
  const ex = examples.find((e) => e.id === example);
  if (!extra || !extra.hasDemo || !ex) notFound();

  const subject = encodeURIComponent(
    isUk ? `Замовлення: ${extra.title}` : `Order: ${extra.title}`
  );
  const orderHref = `/${lang}/contact?subject=${subject}&extra=${extra.id}`;

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Breadcrumb */}
      <nav className="border-b border-neutral-100 dark:border-neutral-700 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 flex-wrap">
          <Link href={`/${lang}`} className="hover:text-indigo-600 transition-colors">
            {isUk ? "Головна" : "Home"}
          </Link>
          <span>/</span>
          <Link href={`/${lang}/extras`} className="hover:text-indigo-600 transition-colors">
            {isUk ? "Модулі" : "Add-ons"}
          </Link>
          <span>/</span>
          <Link
            href={`/${lang}/extras/demo/${id}`}
            className="hover:text-indigo-600 transition-colors"
          >
            {extra.title}
          </Link>
          <span>/</span>
          <span className="text-neutral-900 dark:text-white font-medium">
            {isUk ? ex.titleUk : ex.title}
          </span>
        </div>
      </nav>

      {/* Demo header */}
      <header className="border-b border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-900 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <EmojiIcon emoji={extra.emoji} className="w-6 h-6 text-indigo-500" />
            <div>
              <div className="text-xs text-neutral-400 mb-0.5">
                {isUk ? ex.industryUk : ex.industry}
              </div>
              <h1 className="font-heading font-bold text-neutral-900 dark:text-white text-lg leading-tight">
                {isUk ? ex.titleUk : ex.title}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={`/${lang}/extras/demo/${id}`}
              className="hidden sm:block text-sm text-neutral-500 dark:text-neutral-400 hover:text-indigo-600 transition-colors"
            >
              ← {isUk ? "Всі приклади" : "All examples"}
            </Link>
            <Link
              href={orderHref}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
            >
              {isUk ? "Замовити" : "Order"}
            </Link>
          </div>
        </div>
      </header>

      {/* Demo content */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {getDemoComponent(id, example, lang)}
      </div>

      {/* Other example CTA */}
      {examples.length > 1 && (
        <section className="border-t border-neutral-100 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-heading text-xl font-bold text-neutral-900 dark:text-white mb-6 text-center">
              {isUk ? "Інший приклад цього модуля" : "Another example of this module"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {examples
                .filter((e) => e.id !== example)
                .map((e) => (
                  <Link
                    key={e.id}
                    href={`/${lang}/extras/demo/${id}/${e.id}`}
                    className={`group rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all`}
                  >
                    <div
                      className={`h-28 bg-linear-to-br ${e.previewGradient} flex items-center justify-center`}
                    >
                      <span className={`text-sm font-semibold ${e.previewTextColor}`}>
                        {isUk ? e.industryUk : e.industry}
                      </span>
                    </div>
                    <div className="p-4 bg-white dark:bg-neutral-900">
                      <p className="font-semibold text-neutral-900 dark:text-white text-sm group-hover:text-indigo-700 transition-colors">
                        {isUk ? e.titleUk : e.title}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
