import type { Metadata } from "next";
import Link from "next/link";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { COMPARE_DATA } from "@/lib/data/compare";
import { Scale, ArrowRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  const title = isUk
    ? "Codeworth vs альтернативи — порівняння для бізнесу"
    : "Codeworth vs Alternatives — Business Comparison";
  const desc = isUk
    ? "Порівняйте Codeworth з Wix, Tilda, WordPress, Shopify, фрілансером та шаблонами. Об'єктивний аналіз щоб обрати найкраще рішення для вашого бізнесу."
    : "Compare Codeworth with Wix, Tilda, WordPress, Shopify, freelancers, and templates. Objective analysis to choose the best solution for your business.";
  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      type: "website",
      url: `https://codeworth.uk/${lang}/compare`,
      images: [{ url: "/og/compare.png", width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, images: ["/og/compare.png"] },
    alternates: buildAlternates(lang, "/compare"),
  };
}

export default async function CompareIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isUk = lang === "uk";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-20 gradient-hero">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
                <Scale className="w-4 h-4" />
                {isUk ? "Об'єктивний аналіз" : "Objective analysis"}
              </div>
              <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-neutral-900 mb-6 leading-tight">
                {isUk
                  ? <>{`Codeworth `}<span className="gradient-text">{"vs Альтернативи"}</span></>
                  : <>{`Codeworth `}<span className="gradient-text">{"vs Alternatives"}</span></>}
              </h1>
              <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                {isUk
                  ? "Порівняємо Codeworth з найпопулярнішими рішеннями для створення сайтів — чесно та об'єктивно, щоб ви обрали правильний варіант."
                  : "We compare Codeworth with the most popular website solutions — honestly and objectively, so you can make the right choice."}
              </p>
            </div>
          </Container>
        </section>

        {/* Comparisons grid */}
        <section className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {COMPARE_DATA.map((item) => {
                const codenestWins = item.rows.filter((r) => r.winner === "Codeworth").length;
                const total = item.rows.length;
                return (
                  <Link
                    key={item.slug}
                    href={`/${lang}/compare/${item.slug}`}
                    className="group rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-lg hover:shadow-neutral-100 hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Color header */}
                    <div className={`h-24 bg-linear-to-br ${item.competitorBg} flex items-center justify-between px-6`}>
                      <div className="text-white">
                        <div className="text-xs font-medium text-white/70 mb-1">Codeworth vs</div>
                        <div className="text-2xl font-heading font-extrabold">
                          {isUk ? item.competitorUk : item.competitorEn}
                        </div>
                      </div>
                      <Scale className="w-8 h-8 text-white/40" />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <p className="text-xs text-neutral-500 font-medium mb-3">
                        {isUk ? item.taglineUk : item.taglineEn}
                      </p>
                      <p className="text-sm text-neutral-600 leading-relaxed mb-4 line-clamp-2">
                        {isUk ? item.summaryUk : item.summaryEn}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span className="text-xs text-neutral-500">
                            {isUk ? `Codeworth виграє ${codenestWins}/${total}` : `Codeworth wins ${codenestWins}/${total}`}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs text-indigo-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          {isUk ? "Порівняти" : "Compare"} <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-20 bg-neutral-950 text-white">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-heading font-extrabold mb-4">
                {isUk ? "Все ще сумніваєтесь?" : "Still not sure?"}
              </h2>
              <p className="text-neutral-400 mb-8">
                {isUk
                  ? "Поспілкуйтесь з нашим менеджером — безкоштовно, без зобов'язань. Ми підберемо рішення під ваш бюджет і цілі."
                  : "Talk to our manager — free, no obligations. We'll recommend the right solution for your budget and goals."}
              </p>
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors"
              >
                {isUk ? "Безкоштовна консультація" : "Free Consultation"} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </div>
  );
}
