"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Container } from "./Container";
import { Mail, MapPin, ArrowUpRight, Linkedin, Github } from "lucide-react";
import { LogoWordmark } from "@/components/ui/Logo";
import { analytics } from "@/lib/analytics";

const SERVICES_UK = [
  { label: "Штучний інтелект (AI)", href: "/services/artificial-intelligence" },
  { label: "Machine Learning", href: "/services/machine-learning" },
  { label: "NLP та обробка тексту", href: "/services/nlp" },
  { label: "Комп'ютерний зір (CV)", href: "/services/computer-vision" },
  { label: "MLOps та деплой", href: "/services/mlops" },
  { label: "LLM та RAG", href: "/services/llm-rag" },
  { label: "Предиктивна аналітика", href: "/services/predictive-analytics" },
  { label: "AI-модулі та рішення", href: "/extras" },
  { label: "Ціни", href: "/pricing" },
];

const SERVICES_EN = [
  { label: "Artificial Intelligence", href: "/services/artificial-intelligence" },
  { label: "Machine Learning", href: "/services/machine-learning" },
  { label: "NLP & Text Processing", href: "/services/nlp" },
  { label: "Computer Vision", href: "/services/computer-vision" },
  { label: "MLOps & Deployment", href: "/services/mlops" },
  { label: "LLM & RAG Development", href: "/services/llm-rag" },
  { label: "Predictive Analytics", href: "/services/predictive-analytics" },
  { label: "AI Modules & Solutions", href: "/extras" },
  { label: "Pricing", href: "/pricing" },
];

const COMPANY_UK = [
  { label: "Про нас", href: "/about" },
  { label: "Портфоліо", href: "/portfolio" },
  { label: "Відгуки", href: "/reviews" },
  { label: "Вакансії", href: "/careers" },
  { label: "Ресурси", href: "/resources" },
  { label: "Порівняти", href: "/compare" },
  { label: "Блог", href: "/blog" },
  { label: "Глосарій", href: "/glossary" },
  { label: "Контакти", href: "/contact" },
];

const COMPANY_EN = [
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Reviews", href: "/reviews" },
  { label: "Careers", href: "/careers" },
  { label: "Resources", href: "/resources" },
  { label: "Compare", href: "/compare" },
  { label: "Blog", href: "/blog" },
  { label: "Glossary", href: "/glossary" },
  { label: "Contact", href: "/contact" },
];

const AI_NICHES_UK = [
  { label: "AI для медицини", href: "/ai/healthcare" },
  { label: "AI для e-commerce", href: "/ai/ecommerce" },
  { label: "AI для FinTech", href: "/ai/fintech" },
  { label: "AI для маркетингу", href: "/ai/marketing" },
  { label: "AI для виробництва", href: "/ai/manufacturing" },
  { label: "AI для HR", href: "/ai/hr" },
];

const AI_NICHES_EN = [
  { label: "AI for Healthcare", href: "/ai/healthcare" },
  { label: "AI for E-commerce", href: "/ai/ecommerce" },
  { label: "AI for FinTech", href: "/ai/fintech" },
  { label: "AI for Marketing", href: "/ai/marketing" },
  { label: "AI for Manufacturing", href: "/ai/manufacturing" },
  { label: "AI for HR", href: "/ai/hr" },
];

const ML_NICHES_UK = [
  { label: "ML для банківства", href: "/ml/banking" },
  { label: "ML для рітейлу", href: "/ml/retail" },
  { label: "ML для страхування", href: "/ml/insurance" },
  { label: "ML для Legal Tech", href: "/ml/legal-tech" },
  { label: "ML для SaaS", href: "/ml/saas" },
  { label: "ML для логістики", href: "/ml/logistics" },
  { label: "ML для агробізнесу", href: "/ml/agritech" },
];

const ML_NICHES_EN = [
  { label: "ML for Banking", href: "/ml/banking" },
  { label: "ML for Retail", href: "/ml/retail" },
  { label: "ML for Insurance", href: "/ml/insurance" },
  { label: "ML for Legal Tech", href: "/ml/legal-tech" },
  { label: "ML for SaaS", href: "/ml/saas" },
  { label: "ML for Logistics", href: "/ml/logistics" },
  { label: "ML for AgriTech", href: "/ml/agritech" },
];


export function Footer() {
  const params = useParams();
  const lang = (params?.lang as string) ?? "en";
  const lp = (path: string) => lang === "en" ? (path || "/") : `/${lang}${path}`;
  const isUk = lang === "uk";

  const SERVICES = isUk ? SERVICES_UK : SERVICES_EN;
  const COMPANY = isUk ? COMPANY_UK : COMPANY_EN;
  const AI_NICHES = isUk ? AI_NICHES_UK : AI_NICHES_EN;
  const ML_NICHES = isUk ? ML_NICHES_UK : ML_NICHES_EN;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-neutral-300">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="xl:col-span-1">
            <Link href={lp("/")} className="inline-block mb-4 hover:opacity-80 transition-opacity">
              <LogoWordmark size={36} textClassName="text-white" />
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed mb-4">
              {isUk
                ? "Старші ML-інженери розробляють production-ready AI/ML рішення для UK бізнесу. FCA-aware, UK GDPR compliant."
                : "Senior ML engineers delivering production-grade AI/ML solutions for UK businesses. FCA-aware, UK GDPR compliant."}
            </p>
            <div className="flex flex-col gap-2 text-sm mb-4">
              <a href="mailto:hello@codeworth.uk" onClick={() => analytics.ctaClick("email", "footer")} className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4 shrink-0 text-indigo-400" />
                hello@codeworth.uk
              </a>
              <span className="flex items-center gap-2 text-neutral-400">
                <MapPin className="w-4 h-4 shrink-0 text-indigo-400" />
                {isUk ? "Лондон, UK · Київ, Україна" : "London, UK · Kyiv, Ukraine"}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-5">
              <a
                href="https://www.linkedin.com/company/codeworth"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-800 hover:bg-indigo-600 text-neutral-400 hover:text-white transition-all duration-200"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/codeworth-uk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-600 text-neutral-400 hover:text-white transition-all duration-200"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
            <Link
              href={lp("/contact")}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-linear-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-500 hover:to-indigo-400 transition-all duration-200 hover:-translate-y-0.5"
            >
              {isUk ? "Замовити проєкт" : "Start a project"}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Services */}
          <nav aria-label={isUk ? "Послуги" : "Services"}>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              {isUk ? "Послуги" : "Services"}
            </h4>
            <ul className="flex flex-col gap-2">
              {SERVICES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={lp(link.href)}
                    className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label={isUk ? "Компанія" : "Company"}>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              {isUk ? "Компанія" : "Company"}
            </h4>
            <ul className="flex flex-col gap-2">
              {COMPANY.map((link) => (
                <li key={link.href}>
                  <Link
                    href={lp(link.href)}
                    className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* AI Solutions */}
          <nav aria-label={isUk ? "AI Рішення" : "AI Solutions"}>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              AI Solutions
            </h4>
            <Link
              href={lp("/ai")}
              className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors mb-3 font-medium"
            >
              {isUk ? "Всі AI рішення →" : "All AI solutions →"}
            </Link>
            <ul className="flex flex-col gap-2">
              {AI_NICHES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={lp(link.href)}
                    className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ML Solutions */}
          <nav aria-label={isUk ? "ML Рішення" : "ML Solutions"}>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              ML Solutions
            </h4>
            <Link
              href={lp("/ml")}
              className="inline-flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors mb-3 font-medium"
            >
              {isUk ? "Всі ML рішення →" : "All ML solutions →"}
            </Link>
            <ul className="flex flex-col gap-2">
              {ML_NICHES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={lp(link.href)}
                    className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {currentYear} Codeworth. {isUk ? "Всі права захищені." : "All rights reserved."}</p>
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
            <Link href={lp("/privacy")} className="hover:text-neutral-300 transition-colors">
              {isUk ? "Політика конфіденційності" : "Privacy Policy"}
            </Link>
            <span className="text-neutral-700">|</span>
            <Link href={lp("/terms-of-service")} className="hover:text-neutral-300 transition-colors">
              {isUk ? "Угода користувача" : "Terms of Service"}
            </Link>
            <span className="text-neutral-700">|</span>
            <span>{isUk ? "Зроблено з ❤️ в Україні" : "Made with ❤️ in Ukraine"}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
