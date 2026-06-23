import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { HowWeWorkSection } from "@/components/home/HowWeWorkSection";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { CasesSection } from "@/components/home/CasesSection";
import { ClientLogosSection } from "@/components/home/ClientLogosSection";
import { FAQSection } from "@/components/home/FAQSection";
// Lazy-load below-fold sections for better LCP
const MarketplaceTeaser = dynamic(() => import("@/components/home/MarketplaceTeaser").then((m) => ({ default: m.MarketplaceTeaser })));
const TestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection })));
const FoundingClientSection = dynamic(() => import("@/components/home/FoundingClientSection").then((m) => ({ default: m.FoundingClientSection })));
const BlogPreviewSection = dynamic(() => import("@/components/home/BlogPreviewSection").then((m) => ({ default: m.BlogPreviewSection })));
const CTASection = dynamic(() => import("@/components/home/CTASection").then((m) => ({ default: m.CTASection })));

const HOME_FAQ_UK = [
  {
    q: "Скільки коштує розробка ML-моделі?",
    a: "Вартість залежить від задачі та складності. Proof of concept — від 75 000 ₴ (3 тижні). Продакшн-модель з API та MLOps-моніторингом — від 150 000 ₴. Точна оцінка після безкоштовного аудиту ваших даних та цілей.",
  },
  {
    q: "Скільки часу займає ML-проєкт?",
    a: "Discovery та аудит даних — 1–2 тижні. Прототип — 3–6 тижнів. Повний продакшн-деплой з MLOps — 8–16 тижнів. Терміни залежать від якості наявних даних та складності задачі.",
  },
  {
    q: "Скільки даних потрібно для початку?",
    a: "Залежить від задачі. Text classification — від 1 000 прикладів. Fraud detection — від 10 000 транзакцій. Комп'ютерний зір — від 500 зображень на клас. Ми оцінюємо якість і достатність даних на першому етапі.",
  },
  {
    q: "Ми зможемо підтримувати модель самостійно після деплою?",
    a: "Так. Ми проводимо навчання команди, передаємо документацію, API-специфікацію та MLOps-конфігурацію. За бажанням налаштовуємо автоматичне перенавчання без вашої участі.",
  },
  {
    q: "На якому стеку ви розробляєте ML-рішення?",
    a: "Python + PyTorch/TensorFlow, FastAPI для REST API, MLflow для трекінгу, Docker + Kubernetes для деплою. Для LLM-рішень — LangChain, GPT-4o або відкриті моделі залежно від вимог до конфіденційності.",
  },
  {
    q: "Чи можна розгорнути рішення на нашому сервері (on-prem)?",
    a: "Так. Ми підтримуємо on-prem деплой, приватну хмару (AWS/GCP/Azure) та гібридні варіанти. Для чутливих галузей — медицина, фінанси — on-prem є пріоритетним варіантом.",
  },
  {
    q: "Яка гарантія якості моделі?",
    a: "Ми фіксуємо мінімальні метрики у специфікації (наприклад, precision ≥ 0.90, recall ≥ 0.85). Модель вважається готовою тільки якщо досягає цих порогів. 3 місяці гарантійної підтримки після деплою включені.",
  },
  {
    q: "Як виміряти ROI від ML-рішення?",
    a: "Разом з вами визначаємо бізнес-метрики до старту: час на операцію, відсоток помилок, витрати на персонал, відтік клієнтів тощо. Після деплою готуємо звіт про зміни за 30/60/90 днів.",
  },
  {
    q: "Ви працюєте з клієнтами за межами України?",
    a: "Так. Основний ринок — UK, EU та США. Усі договори та фінансові операції адаптовані для міжнародних клієнтів. Комунікація — англійською або українською.",
  },
  {
    q: "Що таке MLOps і навіщо це потрібно?",
    a: "MLOps — це CI/CD для ML-моделей: автоматизований деплой нових версій, моніторинг точності у продакшені, автоматичне перенавчання при деградації. Без MLOps модель «старіє» за 3–6 місяців — дані змінюються, якість падає.",
  },
];

const HOME_FAQ_EN = [
  {
    q: "How much does ML model development cost?",
    a: "Cost depends on the task and complexity. A proof of concept starts from £1,800 (3 weeks). A production model with API and MLOps monitoring starts from £3,800. Exact pricing follows a free data and goals audit.",
  },
  {
    q: "How long does an ML project take?",
    a: "Discovery and data audit — 1–2 weeks. Prototype — 3–6 weeks. Full production deployment with MLOps — 8–16 weeks. Timelines depend on data quality and task complexity.",
  },
  {
    q: "How much data do we need to start?",
    a: "It depends on the task. Text classification — from 1,000 labelled examples. Fraud detection — from 10,000 transactions. Computer vision — from 500 images per class. We assess data quality and sufficiency in the first stage.",
  },
  {
    q: "Can we maintain the model ourselves after deployment?",
    a: "Yes. We provide team training, documentation, API specs and MLOps configuration handover. Optionally, we set up automatic retraining with no manual intervention needed.",
  },
  {
    q: "What tech stack do you use for ML solutions?",
    a: "Python + PyTorch/TensorFlow, FastAPI for REST APIs, MLflow for experiment tracking, Docker + Kubernetes for deployment. For LLM solutions — LangChain, GPT-4o or open-source models depending on privacy requirements.",
  },
  {
    q: "Can the solution be deployed on our own server (on-prem)?",
    a: "Yes. We support on-prem, private cloud (AWS/GCP/Azure) and hybrid deployments. For sensitive sectors — healthcare, finance — on-prem is the default recommendation.",
  },
  {
    q: "What quality guarantee does the model come with?",
    a: "We specify minimum metrics in the project spec (e.g. precision ≥ 0.90, recall ≥ 0.85). The model is considered production-ready only when it meets those targets. 3 months of warranty support post-deployment included.",
  },
  {
    q: "How do we measure ROI from an ML solution?",
    a: "We define business metrics with you before starting: time per operation, error rate, staff costs, churn rate etc. After deployment, we produce a 30/60/90-day impact report.",
  },
  {
    q: "Do you work with clients outside the UK?",
    a: "Yes. While we are UK-focused, we work with EU and US clients too. All contracts are governed by English law and payments are in GBP or EUR. Communication in English.",
  },
  {
    q: "What is MLOps and why does it matter?",
    a: "MLOps is CI/CD for ML models: automated deployment of new versions, accuracy monitoring in production, and automatic retraining on drift. Without MLOps, a model goes stale in 3–6 months as data distributions shift and performance degrades.",
  },
];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk
      ? "Codeworth — ML-компанія | Машинне навчання для бізнесу"
      : "Codeworth — ML Company | Machine Learning for Business",
    description: isUk
      ? "Кастомні ML-моделі, fraud detection, NLP, комп'ютерний зір, MLOps. Proof of concept за 3 тижні. Codeworth — ML-консалтинг для UK та EU."
      : "Custom ML models, fraud detection, NLP, computer vision, MLOps. Proof of concept in 3 weeks. Codeworth — ML consultancy for UK & EU businesses.",
    keywords: isUk
      ? ["машинне навчання", "ML-моделі", "fraud detection", "NLP", "комп'ютерний зір", "MLOps", "AI-консалтинг", "Codeworth"]
      : ["machine learning", "ML models", "fraud detection", "NLP", "computer vision", "MLOps", "AI consultancy", "Codeworth"],
    openGraph: {
      title: isUk ? "Codeworth — ML-компанія" : "Codeworth — ML Company",
      description: isUk
        ? "Кастомні ML-моделі, fraud detection, NLP, комп'ютерний зір та MLOps для бізнесу."
        : "Custom ML models, fraud detection, NLP, computer vision and MLOps for businesses.",
      type: "website",
      url: `https://codeworth.uk/${lang}`,
      images: [{ url: "/og/home.png", width: 1200, height: 630, alt: isUk ? "Codeworth — ML-компанія" : "Codeworth — ML Company" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isUk ? "Codeworth — ML-компанія" : "Codeworth — ML Company",
      description: isUk
        ? "Fraud detection, NLP, MLOps. Proof of concept за 3 тижні."
        : "Fraud detection, NLP, MLOps. Proof of concept in 3 weeks.",
      images: ["/og/home.png"],
    },
    alternates: buildAlternates(lang),
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isUk = lang === "uk";
  const faqItems = isUk ? HOME_FAQ_UK : HOME_FAQ_EN;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://codeworth.uk/#organization",
    name: "Codeworth",
    url: "https://codeworth.uk",
    logo: "https://codeworth.uk/logo.png",
    image: "https://codeworth.uk/og/home.png",
    description: isUk
      ? "ML/AI консалтинг для бізнесу — кастомні ML-моделі, NLP, комп'ютерний зір, MLOps, LLM та RAG системи."
      : "ML/AI consultancy for business — custom ML models, NLP, computer vision, MLOps, LLM and RAG systems.",
    email: "hello@codeworth.uk",
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "GB",
    },
    areaServed: ["GB", "EU", "US"],
    knowsAbout: [
      "Machine Learning", "NLP", "Computer Vision", "MLOps", "LLM", "RAG",
      "Predictive Analytics", "Fraud Detection", "Deep Learning", "Python",
    ],
    sameAs: [],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://codeworth.uk/#website",
    url: "https://codeworth.uk",
    name: "Codeworth",
    publisher: { "@id": "https://codeworth.uk/#organization" },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: "https://codeworth.uk/en/blog?q={search_term_string}" },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <ServicesSection lang={lang} />
        <CasesSection lang={lang} />
        <HowWeWorkSection lang={lang} />
        <WhyUsSection lang={lang} />
        <TestimonialsSection />
        <ClientLogosSection lang={lang} />
        <MarketplaceTeaser lang={lang} />
        <BlogPreviewSection lang={lang} />
        <FoundingClientSection lang={lang} />
        <FAQSection items={faqItems} isUk={isUk} />
        <CTASection lang={lang} />
      </main>
      <Footer />
    </div>
  );
}
