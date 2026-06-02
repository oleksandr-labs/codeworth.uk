import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildAlternates } from "@/i18n";
import { EXTRAS } from "@/lib/data/extras";
import { getDemoExamples } from "@/lib/data/extras-demos";

interface Props {
  params: Promise<{ lang: string; id: string }>;
}

export async function generateStaticParams() {
  const params: { lang: string; id: string }[] = [];
  for (const lang of ["en", "uk"]) {
    for (const extra of EXTRAS.filter((e) => e.hasDemo)) {
      params.push({ lang, id: extra.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, id } = await params;
  const isUk = lang === "uk";
  const extra = EXTRAS.find((e) => e.id === id);
  if (!extra) return {};

  const title = isUk
    ? `Демо: ${extra.title} — Codeworth`
    : `Demo: ${extra.title} — Codeworth`;
  const description = isUk
    ? `Перегляньте живі приклади модуля «${extra.title}» від Codeworth.`
    : `See live examples of the ${extra.title} module by Codeworth.`;

  return {
    title,
    description,
    alternates: buildAlternates(`/extras/demo/${id}`),
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://codeworth.uk/${lang}/extras/demo/${id}`,
    },
  };
}

export default async function ExtraDemoGalleryPage({ params }: Props) {
  const { lang, id } = await params;
  const isUk = lang === "uk";
  const extra = EXTRAS.find((e) => e.id === id);
  if (!extra || !extra.hasDemo) notFound();

  const examples = getDemoExamples(id);
  if (examples.length === 0) notFound();

  const subject = encodeURIComponent(
    isUk ? `Замовлення: ${extra.title}` : `Order: ${extra.title}`
  );
  const orderHref = `/${lang}/contact?subject=${subject}&extra=${extra.id}`;

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="border-b border-neutral-100 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-neutral-500">
          <Link href={`/${lang}`} className="hover:text-indigo-600 transition-colors">
            {isUk ? "Головна" : "Home"}
          </Link>
          <span>/</span>
          <Link href={`/${lang}/extras`} className="hover:text-indigo-600 transition-colors">
            {isUk ? "Модулі" : "Add-ons"}
          </Link>
          <span>/</span>
          <span className="text-neutral-900 font-medium">{isUk ? "Демо" : "Demo"}</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-5">{extra.emoji}</div>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
          {extra.title}
        </h1>
        <p className="text-lg text-neutral-500 max-w-2xl mx-auto mb-8">
          {isUk
            ? `Перегляньте ${examples.length} живих приклади цього модуля в різних нішах. Кожен приклад — унікальний дизайн та контекст.`
            : `See ${examples.length} live examples of this module in different niches. Each example has a unique design and context.`}
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium">
            {extra.priceFrom.toLocaleString("uk-UA")} {isUk ? "грн" : "UAH"}
          </span>
          <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-sm font-medium">
            {extra.deliveryDays} {isUk ? "дні" : "days"}
          </span>
          {extra.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Demo Examples Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {examples.map((example, index) => (
            <div
              key={example.id}
              className="group rounded-3xl border border-neutral-100 overflow-hidden hover:shadow-2xl hover:shadow-neutral-200/80 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Preview card */}
              <div
                className={`relative h-52 bg-gradient-to-br ${example.previewGradient} flex items-center justify-center overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-24 h-3 rounded-full bg-white/40" />
                  <div className="absolute top-10 left-4 w-40 h-3 rounded-full bg-white/20" />
                  <div className="absolute top-16 left-4 w-32 h-3 rounded-full bg-white/20" />
                  <div className="absolute bottom-8 right-4 w-16 h-8 rounded-lg bg-white/30" />
                  <div className="absolute bottom-8 right-24 w-16 h-8 rounded-lg bg-white/20" />
                </div>
                <div className="relative text-center px-6">
                  <div className={`text-4xl font-bold font-heading ${example.previewTextColor} mb-1`}>
                    {index + 1}
                  </div>
                  <div className={`text-sm font-medium ${example.previewTextColor} opacity-80`}>
                    {isUk ? example.industryUk : example.industry}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-1 text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                  {isUk ? "Приклад" : "Example"} {index + 1}
                </div>
                <h2 className="font-heading text-xl font-bold text-neutral-900 mb-3">
                  {isUk ? example.titleUk : example.title}
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                  {isUk ? example.descriptionUk : example.description}
                </p>
                <Link
                  href={`/${lang}/extras/demo/${id}/${example.id}`}
                  className="block w-full py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold text-center hover:bg-indigo-700 transition-colors"
                >
                  {isUk ? "Відкрити демо" : "Open demo"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-neutral-100 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-4">
            {isUk ? "Підключимо до вашого сайту" : "We'll integrate it into your site"}
          </h2>
          <p className="text-neutral-500 mb-8">
            {isUk
              ? "Налаштуємо модуль під ваш дизайн і стек. Передаємо чистий код."
              : "We'll customize the module to your design and stack. Clean code delivery."}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href={orderHref}
              className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              {isUk ? "Замовити модуль" : "Order module"}
            </Link>
            <Link
              href={`/${lang}/extras`}
              className="px-8 py-3 rounded-xl border border-neutral-200 text-neutral-700 font-semibold hover:bg-neutral-100 transition-colors"
            >
              {isUk ? "Інші модулі" : "Other modules"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
