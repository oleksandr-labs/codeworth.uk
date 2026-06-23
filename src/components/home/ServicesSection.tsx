import Link from "next/link";
import { ArrowRight, Cpu, Bot, Shield, Eye, TrendingUp, Workflow, MessageSquare, Lightbulb } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const SERVICES_UK = [
  {
    icon: Cpu,
    title: "Розробка ML-моделей",
    description: "Кастомні моделі класифікації, регресії та кластеризації — від прототипу до продакшену.",
    href: "/services/ml-models",
    bg: "bg-indigo-50 dark:bg-indigo-950/40",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    icon: MessageSquare,
    title: "Обробка природньої мови",
    description: "Класифікація тексту, NER, sentiment analysis, summarization та витяг структурованих даних.",
    href: "/services/nlp",
    bg: "bg-violet-50 dark:bg-violet-950/40",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    icon: Eye,
    title: "Комп'ютерний зір",
    description: "Детекція об'єктів, OCR, розпізнавання дефектів та аномалій на зображеннях і відео.",
    href: "/services/computer-vision",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: Shield,
    title: "Виявлення шахрайства",
    description: "ML-системи для детекції аномалій, шахрайських транзакцій та верифікації у реальному часі.",
    href: "/services/fraud-detection",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: TrendingUp,
    title: "Предиктивна аналітика",
    description: "Прогнозування відтоку клієнтів, попиту, цін та ризиків на основі ваших даних.",
    href: "/services/predictive-analytics",
    bg: "bg-pink-50 dark:bg-pink-950/40",
    iconColor: "text-pink-600 dark:text-pink-400",
  },
  {
    icon: Bot,
    title: "AI-чатботи та RAG",
    description: "GPT-4o чатботи з Retrieval-Augmented Generation на ваших документах і базі знань.",
    href: "/services/ai-chatbots",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: Workflow,
    title: "MLOps та деплой",
    description: "CI/CD для моделей, моніторинг дрейфу, A/B-тестування та автоматичне перенавчання.",
    href: "/services/mlops",
    bg: "bg-cyan-50 dark:bg-cyan-950/40",
    iconColor: "text-cyan-600 dark:text-cyan-400",
  },
  {
    icon: Lightbulb,
    title: "AI-консалтинг",
    description: "Аудит даних, AI-стратегія, вибір стеку і roadmap впровадження ML у вашій компанії.",
    href: "/services/ai-consulting",
    bg: "bg-slate-50 dark:bg-slate-800/60",
    iconColor: "text-slate-600 dark:text-slate-400",
  },
];

const SERVICES_EN = [
  {
    icon: Cpu,
    title: "Custom ML Models",
    description: "Classification, regression and clustering models built and deployed from prototype to production.",
    href: "/services/ml-models",
    bg: "bg-indigo-50 dark:bg-indigo-950/40",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    icon: MessageSquare,
    title: "Natural Language Processing",
    description: "Text classification, NER, sentiment analysis, summarisation and structured data extraction at scale.",
    href: "/services/nlp",
    bg: "bg-violet-50 dark:bg-violet-950/40",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    description: "Object detection, OCR, face recognition, defect detection and visual anomaly systems.",
    href: "/services/computer-vision",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: Shield,
    title: "Fraud Detection",
    description: "Real-time anomaly detection, transaction fraud scoring and identity verification with ML.",
    href: "/services/fraud-detection",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics",
    description: "Churn prediction, demand forecasting, dynamic pricing and risk scoring on your data.",
    href: "/services/predictive-analytics",
    bg: "bg-pink-50 dark:bg-pink-950/40",
    iconColor: "text-pink-600 dark:text-pink-400",
  },
  {
    icon: Bot,
    title: "AI Chatbots & RAG",
    description: "GPT-4o chatbots with Retrieval-Augmented Generation built on your documents and knowledge base.",
    href: "/services/ai-chatbots",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: Workflow,
    title: "MLOps & Deployment",
    description: "Model CI/CD, drift monitoring, A/B testing and automated retraining pipelines.",
    href: "/services/mlops",
    bg: "bg-cyan-50 dark:bg-cyan-950/40",
    iconColor: "text-cyan-600 dark:text-cyan-400",
  },
  {
    icon: Lightbulb,
    title: "AI Strategy & Consulting",
    description: "Data audit, AI roadmap, stack selection and implementation planning for your organisation.",
    href: "/services/ai-consulting",
    bg: "bg-slate-50 dark:bg-slate-800/60",
    iconColor: "text-slate-600 dark:text-slate-400",
  },
];

export function ServicesSection({ lang }: { lang: string }) {
  const isUk = lang === "uk";
  const SERVICES = isUk ? SERVICES_UK : SERVICES_EN;
  const lp = (path: string) => `/${lang}${path}`;

  return (
    <section className="py-24 bg-white dark:bg-neutral-950">
      <Container>
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
            {isUk ? "Наші послуги" : "Our Services"}
          </p>
          <h2 className="text-4xl lg:text-5xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
            {isUk ? (
              <>Все що потрібно для{" "}<span className="gradient-text">ML у бізнесі</span></>
            ) : (
              <>Everything you need for{" "}<span className="gradient-text">ML in business</span></>
            )}
          </h2>
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            {isUk
              ? "Від першого ML-прототипу до MLOps у продакшні — повний цикл."
              : "From first ML prototype to MLOps in production — the full cycle."}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.href}
                href={lp(service.href)}
                className="group relative p-6 rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                    service.bg
                  )}
                >
                  <Icon className={cn("w-6 h-6", service.iconColor)} />
                </div>
                <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {isUk ? "Детальніше" : "Learn more"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href={lp("/services")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:border-indigo-300 transition-all duration-200"
          >
            {isUk ? "Переглянути всі послуги" : "View all services"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
