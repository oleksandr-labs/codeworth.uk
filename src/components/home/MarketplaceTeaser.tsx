import Link from "next/link";
import { ArrowRight, Banknote, Stethoscope, ShoppingCart, Building2 } from "lucide-react";
import { Container } from "@/components/layout/Container";

const INDUSTRIES_UK = [
  {
    icon: Banknote,
    title: "FinTech та Банкінг",
    description: "Fraud detection, скоринг ризиків, AML, KYC-автоматизація",
    tag: "FCA-compliant",
    color: "from-emerald-400 to-teal-500",
  },
  {
    icon: Stethoscope,
    title: "Охорона здоров'я",
    description: "Clinical NLP, витяг даних, підтримка діагностичних рішень",
    tag: "GDPR-ready",
    color: "from-blue-400 to-indigo-500",
  },
  {
    icon: ShoppingCart,
    title: "Retail та E-commerce",
    description: "Churn prediction, dynamic pricing, прогноз попиту",
    tag: "Популярне",
    color: "from-pink-400 to-rose-500",
  },
  {
    icon: Building2,
    title: "Виробництво",
    description: "Computer vision QC, predictive maintenance, дефект-детекція",
    tag: "Нове",
    color: "from-amber-400 to-orange-500",
  },
];

const INDUSTRIES_EN = [
  {
    icon: Banknote,
    title: "FinTech & Banking",
    description: "Fraud detection, risk scoring, AML, KYC automation",
    tag: "FCA-compliant",
    color: "from-emerald-400 to-teal-500",
  },
  {
    icon: Stethoscope,
    title: "Healthcare",
    description: "Clinical NLP, data extraction, diagnostic decision support",
    tag: "GDPR-ready",
    color: "from-blue-400 to-indigo-500",
  },
  {
    icon: ShoppingCart,
    title: "Retail & E-commerce",
    description: "Churn prediction, dynamic pricing, demand forecasting",
    tag: "Popular",
    color: "from-pink-400 to-rose-500",
  },
  {
    icon: Building2,
    title: "Manufacturing",
    description: "Computer vision QC, predictive maintenance, defect detection",
    tag: "New",
    color: "from-amber-400 to-orange-500",
  },
];

export function MarketplaceTeaser({ lang }: { lang: string }) {
  const isUk = lang === "uk";
  const INDUSTRIES = isUk ? INDUSTRIES_UK : INDUSTRIES_EN;
  const lp = (path: string) => `/${lang}${path}`;

  return (
    <section className="py-24 bg-neutral-950 text-white overflow-hidden relative">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-200 h-100 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-sm font-medium text-indigo-300">
            🤖 {isUk ? "AI за галузями" : "AI by industry"}
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-extrabold text-white mb-4">
            {isUk ? (
              <>AI/ML рішення для{" "}<span className="gradient-text">вашої галузі</span></>
            ) : (
              <>AI/ML solutions for{" "}<span className="gradient-text">your industry</span></>
            )}
          </h2>
          <p className="text-lg text-neutral-400">
            {isUk
              ? "Кастомні ML-моделі для специфіки кожної галузі — від FinTech до агро."
              : "Custom ML models tailored to each industry's unique challenges — from FinTech to agriculture."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {INDUSTRIES.map((industry) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.title}
                className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${industry.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white/70 mb-3">
                  {industry.tag}
                </span>
                <h3 className="font-heading font-bold text-white mb-1">{industry.title}</h3>
                <p className="text-sm text-neutral-400">{industry.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={lp("/portfolio")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-linear-to-r from-indigo-600 to-indigo-500 text-white font-semibold hover:from-indigo-500 hover:to-indigo-400 transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5"
          >
            {isUk ? "Дивитися кейси" : "View case studies"}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href={lp("/use-cases")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5"
          >
            ⚡ {isUk ? "Use cases" : "Use cases"}
          </Link>
          <Link
            href={lp("/contact")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5"
          >
            🚀 {isUk ? "Отримати консультацію" : "Get a consultation"}
          </Link>
        </div>
      </Container>
    </section>
  );
}
