"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Container } from "./Container";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
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
  { label: "Блог", href: "/blog" },
  { label: "Глосарій", href: "/glossary" },
  { label: "Контакти", href: "/contact" },
  { label: "Карта сайту", href: "/sitemap" },
];

const COMPANY_EN = [
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Reviews", href: "/reviews" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Glossary", href: "/glossary" },
  { label: "Contact", href: "/contact" },
  { label: "Sitemap", href: "/sitemap" },
];

const AI_NICHES_UK = [
  { label: "AI для медицини", href: "/ai/healthcare" },
  { label: "AI для e-commerce", href: "/ai/ecommerce" },
  { label: "AI для FinTech", href: "/ai/fintech" },
  { label: "AI для маркетингу", href: "/ai/marketing" },
  { label: "AI для HR", href: "/ai/hr" },
];

const AI_NICHES_EN = [
  { label: "AI for Healthcare", href: "/ai/healthcare" },
  { label: "AI for E-commerce", href: "/ai/ecommerce" },
  { label: "AI for FinTech", href: "/ai/fintech" },
  { label: "AI for Marketing", href: "/ai/marketing" },
  { label: "AI for HR", href: "/ai/hr" },
];

const ML_NICHES_UK = [
  { label: "ML для банківства", href: "/ml/banking" },
  { label: "ML для рітейлу", href: "/ml/retail" },
  { label: "ML для SaaS", href: "/ml/saas" },
  { label: "ML для логістики", href: "/ml/logistics" },
  { label: "ML для агробізнесу", href: "/ml/agritech" },
];

const ML_NICHES_EN = [
  { label: "ML for Banking", href: "/ml/banking" },
  { label: "ML for Retail", href: "/ml/retail" },
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
            <p className="text-sm text-neutral-400 leading-relaxed mb-5">
              {isUk
                ? "ML/AI консалтинг для бізнесу. Розробляємо моделі, що вирішують реальні задачі."
                : "ML/AI consultancy for business. We build models that solve real problems."}
            </p>
            <div className="flex flex-col gap-2 text-sm mb-5">
              <a href="mailto:hello@codeworth.uk" onClick={() => analytics.ctaClick("email", "footer")} className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4 shrink-0 text-indigo-400" />
                hello@codeworth.uk
              </a>
              <span className="flex items-center gap-2 text-neutral-400">
                <MapPin className="w-4 h-4 shrink-0 text-indigo-400" />
                {isUk ? "Київ, Україна" : "Kyiv, Ukraine"}
              </span>
            </div>
            <Link
              href={lp("/contact")}
              className="inline-block px-5 py-2.5 text-sm font-semibold rounded-xl bg-linear-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-500 hover:to-indigo-400 transition-all duration-200 hover:-translate-y-0.5"
            >
              {isUk ? "Замовити проєкт" : "Start a project"}
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
          <div className="flex items-center gap-4">
            <Link href={lp("/privacy")} className="hover:text-neutral-300 transition-colors">
              {isUk ? "Політика конфіденційності" : "Privacy Policy"}
            </Link>
            <span className="text-neutral-700">|</span>
            <Link href={lp("/terms-of-service")} className="hover:text-neutral-300 transition-colors">
              {isUk ? "Угода користувача" : "Terms of Service"}
            </Link>
            <span className="text-neutral-700">|</span>
            <Link href={lp("/sitemap")} className="hover:text-neutral-300 transition-colors">
              {isUk ? "Карта сайту" : "Sitemap"}
            </Link>
            <span className="text-neutral-700">|</span>
            <span>{isUk ? "Зроблено з ❤️ в Україні" : "Made with ❤️ in Ukraine"}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
