import { Zap, Shield, Lock, TrendingUp, Cpu, HeartHandshake } from "lucide-react";
import { Container } from "@/components/layout/Container";

const REASONS_UK = [
  {
    icon: Zap,
    title: "Швидкий прототип",
    description: "Proof of concept за 2–3 тижні — без місяців R&D і мільйонних бюджетів.",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/40",
  },
  {
    icon: Shield,
    title: "Продакшн-якість",
    description: "Не іграшкові моделі. MLflow, Docker, CI/CD та дрейф-моніторинг від першого дня.",
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-950/40",
  },
  {
    icon: Lock,
    title: "Конфіденційність даних",
    description: "On-prem або приватний хмарний деплой. Ваші дані не покидають інфраструктуру.",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    icon: TrendingUp,
    title: "Вимірюваний ROI",
    description: "Метрики точності, business-impact звіти та дашборди — не маркетинговий хайп.",
    color: "text-pink-500",
    bg: "bg-pink-50 dark:bg-pink-950/40",
  },
  {
    icon: Cpu,
    title: "MLOps з першого дня",
    description: "Дрейф-детекція, A/B-тести моделей та автоматичне перенавчання закладено в архітектуру одразу.",
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-950/40",
  },
  {
    icon: HeartHandshake,
    title: "Партнерство, не угода",
    description: "Консультуємо навіть після завершення контракту. Ваш успіх — наш успіх.",
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-950/40",
  },
];

const REASONS_EN = [
  {
    icon: Zap,
    title: "Rapid Prototyping",
    description: "Proof of concept in 2–3 weeks — no months of R&D or seven-figure budgets.",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/40",
  },
  {
    icon: Shield,
    title: "Production-Ready Models",
    description: "Not toy demos. MLflow, Docker, CI/CD and drift monitoring from day one.",
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-950/40",
  },
  {
    icon: Lock,
    title: "Data Privacy First",
    description: "On-prem or private cloud deployment. Your data never leaves your infrastructure.",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    icon: TrendingUp,
    title: "Measurable ROI",
    description: "Accuracy metrics, business impact reports and dashboards — not marketing hype.",
    color: "text-pink-500",
    bg: "bg-pink-50 dark:bg-pink-950/40",
  },
  {
    icon: Cpu,
    title: "MLOps from Day One",
    description: "Drift detection, model A/B testing and automated retraining built into the architecture from the start.",
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-950/40",
  },
  {
    icon: HeartHandshake,
    title: "Partnership, Not a Deal",
    description: "We advise even after the contract ends. Your success is our success.",
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-950/40",
  },
];

export function WhyUsSection({ lang }: { lang: string }) {
  const isUk = lang === "uk";
  const REASONS = isUk ? REASONS_UK : REASONS_EN;

  return (
    <>
      {/* Why Us */}
      <section className="py-24 gradient-mesh bg-neutral-50 dark:bg-neutral-950">
        <Container>
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
              {isUk ? "Чому Codeworth" : "Why Codeworth"}
            </p>
            <h2 className="text-4xl lg:text-5xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
              {isUk ? (
                <>Обирають нас,{" "}<span className="gradient-text">бо ML справді окупається</span></>
              ) : (
                <>They choose us{" "}<span className="gradient-text">because ML actually delivers ROI</span></>
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
