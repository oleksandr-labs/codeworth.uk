import Link from "next/link";
import { EXTRAS, EXTRA_CATEGORIES } from "@/lib/data/extras";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

export function ExtrasHero({ lang }: { lang: string }) {
  const isUk = lang === "uk";
  const popularCount = EXTRAS.filter((e) => e.isPopular).length;

  return (
    <section className="relative py-24 bg-linear-to-br from-indigo-950 via-indigo-900 to-violet-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-700/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-indigo-200 text-sm font-medium mb-6 backdrop-blur-sm">
          <span>⚡</span>
          <span>{EXTRAS.length} {isUk ? "готових рішень" : "ready-made solutions"}</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
          {isUk ? (
            <>Готові AI-{" "}<span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-yellow-300">модулі</span></>
          ) : (
            <>Ready-to-deploy{" "}<span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-yellow-300">AI modules</span></>
          )}
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-indigo-200 mb-8 leading-relaxed">
          {isUk
            ? "Готові AI-продукти для швидкого деплою у ваш бізнес: RAG чат-боти, NLP-пайплайни, комп'ютерний зір, recommendation engines. Від ідеї до продакшну за 3–14 днів."
            : "Ready-to-deploy AI products for your business: RAG chatbots, NLP pipelines, computer vision, recommendation engines. From idea to production in 3–14 days."}
        </p>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {EXTRA_CATEGORIES.map((cat) => (
            <span
              key={cat.value}
              className="px-4 py-2 rounded-xl bg-white/10 text-white text-sm font-medium backdrop-blur-sm border border-white/10"
            >
              <EmojiIcon emoji={cat.emoji} className="w-4 h-4 inline-block align-middle mr-1" />{isUk ? cat.label : cat.labelEn}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8">
          <div className="text-center">
            <p className="text-3xl font-extrabold text-white">{EXTRAS.length}+</p>
            <p className="text-indigo-300 text-sm mt-1">{isUk ? "AI-модулів" : "AI modules"}</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-extrabold text-white">{popularCount}</p>
            <p className="text-indigo-300 text-sm mt-1">{isUk ? "популярних" : "popular"}</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-extrabold text-white">{isUk ? "від 2 500 ₴" : "from £350"}</p>
            <p className="text-indigo-300 text-sm mt-1">{isUk ? "мінімальна вартість" : "starting price"}</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-extrabold text-white">{isUk ? "3–14 днів" : "3–14 days"}</p>
            <p className="text-indigo-300 text-sm mt-1">{isUk ? "строк деплою" : "deployment time"}</p>
          </div>
        </div>

        <div className="mt-10">
          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-amber-400 text-indigo-950 font-bold text-base hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/25"
          >
            {isUk ? "Не знайшли потрібне AI-рішення? Напишіть нам →" : "Need a custom AI solution? Contact us →"}
          </Link>
        </div>
      </div>
    </section>
  );
}
