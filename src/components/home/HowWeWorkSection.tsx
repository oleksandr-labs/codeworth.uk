import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { FileSearch, Palette, Code2, Rocket, LifeBuoy, ArrowRight } from "lucide-react";

const STEPS_UK = [
  {
    number: "01",
    icon: FileSearch,
    title: "Брифінг та аналіз",
    description: "Обговорюємо цілі, аудиторію та конкурентів. Складаємо детальне ТЗ з фіксованою ціною та термінами.",
    duration: "1–2 дні",
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  {
    number: "02",
    icon: Palette,
    title: "Дизайн",
    description: "Розробляємо макет у Figma з урахуванням вашого бренду. Два раунди правок включені.",
    duration: "3–7 днів",
    color: "bg-violet-50 text-violet-600 border-violet-100",
  },
  {
    number: "03",
    icon: Code2,
    title: "Розробка",
    description: "Верстаємо та програмуємо на Next.js + TypeScript. SEO, доступність та швидкість — з першого рядка.",
    duration: "5–20 днів",
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Здача та запуск",
    description: "Тестуємо, налаштовуємо аналітику, навчаємо роботі з CMS. Запускаємо на Vercel або ваш хостинг.",
    duration: "1–2 дні",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    number: "05",
    icon: LifeBuoy,
    title: "Підтримка",
    description: "Місяць безкоштовної гарантії. Далі — гнучкий план підтримки від 3 000 грн/місяць.",
    duration: "Ongoing",
    color: "bg-amber-50 text-amber-600 border-amber-100",
  },
];

const STEPS_EN = [
  {
    number: "01",
    icon: FileSearch,
    title: "Brief & Analysis",
    description: "We discuss goals, audience and competitors. We create a detailed spec with a fixed price and timeline.",
    duration: "1–2 days",
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  {
    number: "02",
    icon: Palette,
    title: "Design",
    description: "We create mockups in Figma tailored to your brand. Two rounds of revisions included.",
    duration: "3–7 days",
    color: "bg-violet-50 text-violet-600 border-violet-100",
  },
  {
    number: "03",
    icon: Code2,
    title: "Development",
    description: "We build with Next.js + TypeScript. SEO, accessibility and performance from the first line of code.",
    duration: "5–20 days",
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Handoff & Launch",
    description: "Testing, analytics setup, CMS training. Deploy to Vercel or your own hosting.",
    duration: "1–2 days",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    number: "05",
    icon: LifeBuoy,
    title: "Support",
    description: "One month free warranty. Then a flexible support plan starting from $75/month.",
    duration: "Ongoing",
    color: "bg-amber-50 text-amber-600 border-amber-100",
  },
];

export function HowWeWorkSection({ lang }: { lang: string }) {
  const isUk = lang === "uk";
  const STEPS = isUk ? STEPS_UK : STEPS_EN;

  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-900 ">
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
            {isUk ? "Процес" : "Process"}
          </p>
          <h2 className="text-4xl lg:text-5xl font-heading font-extrabold text-neutral-900">
            {isUk ? "Як ми працюємо" : "How we work"}
          </h2>
          <p className="mt-4 text-lg text-neutral-500">
            {isUk
              ? "Прозорий процес від першого дзвінка до запуску. Ніяких сюрпризів."
              : "A transparent process from the first call to launch. No surprises."}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connector line (desktop) */}
          <div className="hidden lg:block absolute left-[calc(50%-1px)] top-8 bottom-8 w-0.5 bg-neutral-200" />

          <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-0">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={step.number}
                  className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-0 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  {/* Content side */}
                  <div className={`flex-1 ${isLeft ? "lg:pr-16 lg:text-right" : "lg:pl-16 lg:text-left"}`}>
                    <div className={`inline-flex items-start lg:${isLeft ? "justify-end" : "justify-start"} gap-4 ${isLeft ? "flex-row-reverse lg:flex-row" : ""}`}>
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${step.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">{step.number}</div>
                        <h3 className="text-xl font-heading font-bold text-neutral-900 dark:text-white mb-2">{step.title}</h3>
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed max-w-xs">{step.description}</p>
                        <span className="inline-block mt-2 px-3 py-1 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-500">
                          ⏱ {step.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Center circle */}
                  <div className="hidden lg:flex w-10 h-10 rounded-full bg-white dark:bg-neutral-800 border-2 border-indigo-200 items-center justify-center shrink-0 z-10 shadow-sm">
                    <span className="text-indigo-600 font-bold text-xs">{step.number}</span>
                  </div>

                  {/* Empty side */}
                  <div className="hidden lg:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
          >
            {isUk ? "Почати проєкт" : "Start a project"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
