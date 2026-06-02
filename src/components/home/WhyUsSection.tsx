import { Zap, Shield, Paintbrush, Search, Award, HeartHandshake } from "lucide-react";
import { Container } from "@/components/layout/Container";

const REASONS_UK = [
  {
    icon: Zap,
    title: "Швидкий запуск",
    description: "Лендінг — за 5 днів. Корпоративний сайт — за 2-3 тижні. Не затягуємо терміни.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: Paintbrush,
    title: "Преміальний дизайн",
    description: "Кожен проєкт — унікальний. Жодних шаблонів із Envato. Тільки кастомний дизайн.",
    color: "text-pink-500",
    bg: "bg-pink-50",
  },
  {
    icon: Search,
    title: "SEO з першого дня",
    description: "Технічна оптимізація, мікророзмітка Schema.org та правильна структура — в базі.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: Shield,
    title: "Безпека та надійність",
    description: "HTTPS, захист від DDoS, бекапи, моніторинг uptime — ваш сайт завжди онлайн.",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
  {
    icon: Award,
    title: "Гарантія якості",
    description: "6 місяців безкоштовної підтримки після запуску. Виправляємо все за домовленістю.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    icon: HeartHandshake,
    title: "Партнерство, не угода",
    description: "Радимо, навіть якщо задача виходить за рамки договору. Ваш успіх — наш успіх.",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
];

const REASONS_EN = [
  {
    icon: Zap,
    title: "Fast Launch",
    description: "Landing page in 5 days. Corporate site in 2–3 weeks. We never miss deadlines.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: Paintbrush,
    title: "Premium Design",
    description: "Every project is unique. No Envato templates. Custom design only.",
    color: "text-pink-500",
    bg: "bg-pink-50",
  },
  {
    icon: Search,
    title: "SEO from Day One",
    description: "Technical optimization, Schema.org markup and correct structure built in from the start.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: Shield,
    title: "Security & Reliability",
    description: "HTTPS, DDoS protection, backups, uptime monitoring — your site is always online.",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description: "6 months of free support after launch. We fix everything as agreed.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    icon: HeartHandshake,
    title: "Partnership, Not a Deal",
    description: "We advise even when the task goes beyond the contract. Your success is our success.",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
];

export function WhyUsSection({ lang }: { lang: string }) {
  const isUk = lang === "uk";
  const REASONS = isUk ? REASONS_UK : REASONS_EN;

  return (
    <>
      {/* Why Us */}
      <section className="py-24 gradient-mesh bg-neutral-50">
        <Container>
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
              {isUk ? "Чому Codeworth" : "Why Codeworth"}
            </p>
            <h2 className="text-4xl lg:text-5xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
              {isUk ? (
                <>Обирають нас,{" "}<span className="gradient-text">бо ми результат</span></>
              ) : (
                <>They choose us{" "}<span className="gradient-text">because we deliver</span></>
              )}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REASONS.map((reason) => {
              const Icon = reason.icon;
              return (
                <div
                  key={reason.title}
                  className="p-6 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${reason.bg}`}>
                    <Icon className={`w-6 h-6 ${reason.color}`} />
                  </div>
                  <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-2">{reason.title}</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{reason.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
