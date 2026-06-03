import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import { Container } from "@/components/layout/Container";
import { PROJECTS } from "@/lib/data/portfolio";

const FEATURED_CASES = PROJECTS.filter((p) => p.caseStudy).slice(0, 3);

export function CasesSection({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-900 ">
      <Container>
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
            {isUk ? "Приклади рішень" : "Solution Examples"}
          </p>
          <h2 className="text-4xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
            {isUk ? "Що може досягти ваш бізнес" : "What your business can achieve"}
          </h2>
          <p className="text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed">
            {isUk
              ? "Реальні метрики з наших нішевих рішень — приклади того, що отримують бізнеси після запуску."
              : "Real metrics from our niche solutions — examples of what businesses achieve after launch."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_CASES.map((project) => (
            <Link
              key={project.slug}
              href={`/${lang}/portfolio/${project.slug}`}
              className="group flex flex-col rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-white overflow-hidden hover:shadow-lg hover:shadow-neutral-200/60 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Color header */}
              <div className={`h-28 bg-linear-to-br ${project.color} flex items-center justify-center`}>
                <EmojiIcon emoji={project.emoji} className="w-16 h-16 text-white/80" />
              </div>

              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
                    {project.niche}
                  </span>
                  <span className="text-neutral-300 text-xs">·</span>
                  <span className="text-neutral-400 text-xs">{project.year}</span>
                </div>

                <h3 className="font-heading font-bold text-neutral-900 dark:text-white text-base mb-2 group-hover:text-indigo-700 transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>

                {/* Top metric */}
                {project.caseStudy?.results[0] && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                    <TrendingUp className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-xs font-semibold text-emerald-700 leading-snug">
                      {project.caseStudy.results[0]}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={`/${lang}/portfolio`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-indigo-200 text-indigo-700 font-semibold hover:bg-indigo-50 transition-colors"
          >
            {isUk ? "Усі рішення" : "All solutions"} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
