import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { CTASection } from "@/components/home/CTASection";
import { CountUp } from "@/components/ui/CountUp";
import {
  Target, Heart, Users, Lightbulb, CheckCircle,
  ArrowRight, Code2, Database, Shield, Cpu, Zap
} from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk ? "Про нас — Codeworth | ML-компанія" : "About Us — Codeworth | ML Company",
    description: isUk
      ? "Дізнайтеся більше про команду Codeworth — ML-компанію. Наша місія, цінності, методологія та технічний стек машинного навчання."
      : "Learn more about the Codeworth team — an ML consultancy. Our mission, values, methodology and machine learning tech stack.",
    alternates: buildAlternates(lang, 'about'),
    openGraph: {
      title: isUk ? "Про нас — Codeworth" : "About Us — Codeworth",
      description: isUk
        ? "ML-компанія: кастомні моделі, fraud detection, NLP, комп'ютерний зір та MLOps для UK та EU бізнесу."
        : "ML company: custom models, fraud detection, NLP, computer vision and MLOps for UK and EU businesses.",
      type: "website",
      url: `https://codeworth.uk/${lang}/about`,
      images: [{ url: "/og/about.png", width: 1200, height: 630, alt: "Codeworth Team" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isUk ? "Про нас — Codeworth" : "About Us — Codeworth",
      description: isUk ? "Команда Codeworth — ML-компанія для бізнесу." : "Codeworth team — ML company for business.",
      images: ["/og/about.png"],
    },
  };
}

const VALUES_UK = [
  { icon: Target, title: "Результат", description: "Ми не продаємо красиві алгоритми заради алгоритмів. Кожна модель — для досягнення конкретного бізнес-результату з вимірюваним ROI." },
  { icon: Heart, title: "Чесність", description: "Кажемо правду навіть якщо вона незручна. Якщо ML не вирішить вашу задачу — скажемо про це першими." },
  { icon: Lightbulb, title: "Якість", description: "Продакшн-якість з першого дня. MLflow, тести, моніторинг дрейфу, документація. Ніяких shortcuts." },
  { icon: Users, title: "Партнерство", description: "Ми не підрядник — ми ML-партнер. Ваші дані ростуть — ваш бізнес росте — ми разом." },
];

const VALUES_EN = [
  { icon: Target, title: "Results", description: "We don't sell pretty algorithms for their own sake. Every model is built to achieve a concrete business outcome with measurable ROI." },
  { icon: Heart, title: "Honesty", description: "We tell the truth even when it's uncomfortable. If ML won't solve your problem, we'll be the first to say so." },
  { icon: Lightbulb, title: "Quality", description: "Production quality from day one. MLflow, tests, drift monitoring, documentation. No shortcuts." },
  { icon: Users, title: "Partnership", description: "We're not a contractor — we're your ML partner. Your data grows, your business grows — we grow together." },
];

const TIMELINE_UK = [
  { year: "2021", title: "Заснування", text: "Перші фріланс-проєкти в data science та ML. Команда з 2 фахівців." },
  { year: "2022", title: "Перші ML-моделі", text: "Перша production-модель NLP-класифікатора. Перший контракт з UK-клієнтом." },
  { year: "2023", title: "ML-консалтинг", text: "Офіційна реєстрація, розширення до 5 спеціалістів. 10+ успішних ML-проєктів." },
  { year: "2024", title: "Масштабування", text: "Запуск MLOps-практики. Fraud detection для FinTech. 40+ задеплоєних моделей." },
  { year: "2025", title: "Codeworth 2.0", text: "Новий сайт, ML-портфоліо, вихід на UK та EU ринки." },
];

const TIMELINE_EN = [
  { year: "2021", title: "Founded", text: "First freelance projects in data science and ML. Team of 2 specialists." },
  { year: "2022", title: "First ML Models", text: "First production NLP classifier. First contract with a UK client." },
  { year: "2023", title: "ML Consultancy", text: "Official registration, expanded to 5 specialists. 10+ successful ML projects." },
  { year: "2024", title: "Scaling Up", text: "MLOps practice launch. Fraud detection for FinTech. 40+ deployed models." },
  { year: "2025", title: "Codeworth 2.0", text: "New website, ML portfolio, expansion to UK and EU markets." },
];

const TECH_STACK = [
  { name: "Python", color: "bg-blue-600 text-white" },
  { name: "PyTorch", color: "bg-orange-500 text-white" },
  { name: "TensorFlow", color: "bg-amber-500 text-white" },
  { name: "scikit-learn", color: "bg-blue-800 text-white" },
  { name: "FastAPI", color: "bg-teal-600 text-white" },
  { name: "MLflow", color: "bg-indigo-700 text-white" },
  { name: "LangChain", color: "bg-green-600 text-white" },
  { name: "Docker", color: "bg-sky-600 text-white" },
  { name: "Kubernetes", color: "bg-blue-700 text-white" },
  { name: "PostgreSQL", color: "bg-blue-900 text-white" },
  { name: "Apache Spark", color: "bg-red-500 text-white" },
  { name: "Airflow", color: "bg-neutral-700 text-white" },
];

const STATS_UK = [
  { end: 40, suffix: "+", label: "ML-моделей" },
  { end: 12, suffix: "+", label: "Галузей" },
  { end: 4, suffix: "+", label: "Роки в ML" },
  { end: 8, suffix: "", label: "Спеціалістів" },
];

const STATS_EN = [
  { end: 40, suffix: "+", label: "ML Models" },
  { end: 12, suffix: "+", label: "Industries" },
  { end: 4, suffix: "+", label: "Years in ML" },
  { end: 8, suffix: "", label: "Specialists" },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Codeworth",
  url: "https://codeworth.uk",
  logo: "https://codeworth.uk/logo.svg",
  description: "ML-компанія — кастомні моделі машинного навчання, fraud detection, NLP, комп'ютерний зір та MLOps для UK та EU бізнесу.",
  foundingDate: "2021",
  numberOfEmployees: { "@type": "QuantitativeValue", value: 8 },
  address: { "@type": "PostalAddress", addressLocality: "Kyiv", addressCountry: "UA" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hello@codeworth.uk",
    availableLanguage: ["Ukrainian", "English"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://codeworth.uk" },
    { "@type": "ListItem", position: 2, name: "About" },
  ],
};

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isUk = lang === "uk";
  const VALUES = isUk ? VALUES_UK : VALUES_EN;
  const TIMELINE = isUk ? TIMELINE_UK : TIMELINE_EN;
  const STATS = isUk ? STATS_UK : STATS_EN;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-20 gradient-hero relative overflow-hidden">
          <div className="absolute -top-40 right-0 w-125 h-125 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
          <Container className="relative">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-4">
                {isUk ? "Про нас" : "About Us"}
              </p>
              <h1 className="text-5xl lg:text-6xl font-heading font-extrabold text-neutral-900 dark:text-white mb-6 leading-tight">
                {isUk
                  ? <>{`Будуємо ML-рішення`}<br /><span className="gradient-text">{`для бізнесу`}</span></>
                  : <>{`Building ML solutions`}<br /><span className="gradient-text">{`for business`}</span></>}
              </h1>
              <p className="text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-2xl">
                {isUk
                  ? "Codeworth — команда ML-інженерів та data scientists, що перетворює дані на бізнес-результати. Від proof of concept до продакшн-деплою."
                  : "Codeworth is a team of ML engineers and data scientists that turns data into business outcomes. From proof of concept to production deployment."}
              </p>
            </div>
          </Container>
        </section>

        {/* Stats */}
        <section className="py-16 bg-white dark:bg-neutral-800 border-y border-neutral-100 dark:border-neutral-700">
          <Container>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-4xl font-sans font-extrabold tabular-nums tracking-tight gradient-text-primary mb-2">
                    <CountUp end={s.end} suffix={s.suffix} />
                  </div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">{s.label}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Mission */}
        <section className="py-24 bg-white dark:bg-neutral-950">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                  {isUk ? "Наша місія" : "Our Mission"}
                </p>
                <h2 className="text-4xl font-heading font-extrabold text-neutral-900 dark:text-white mb-6">
                  {isUk ? <>ML доступне<br />кожному бізнесу</> : <>ML accessible<br />to every business</>}
                </h2>
                <div className="space-y-4 text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {isUk ? (
                    <>
                      <p>Codeworth виник з простої ідеї: бізнес не повинен мати мільйонний R&D бюджет, щоб отримати вигоду від машинного навчання.</p>
                      <p>Ми розробляємо ML-моделі, що вирішують конкретні бізнес-задачі — від fraud detection у FinTech до computer vision для виробничого контролю якості. Кожен проєкт — від proof of concept до продакшн-деплою з MLOps.</p>
                      <p>Наш підхід: спочатку зрозуміти задачу та дані, потім обрати найпростіший підхід, що дасть бажаний ROI. Без overengineering, без зайвої складності.</p>
                    </>
                  ) : (
                    <>
                      <p>Codeworth was born from a simple idea: businesses shouldn&apos;t need a million-pound R&D budget to benefit from machine learning.</p>
                      <p>We build ML models that solve specific business problems — from fraud detection in FinTech to computer vision for manufacturing quality control. Every project runs from proof of concept to production deployment with MLOps.</p>
                      <p>Our approach: understand the problem and data first, then choose the simplest approach that delivers the desired ROI. No overengineering, no unnecessary complexity.</p>
                    </>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {VALUES.map((v) => {
                  const Icon = v.icon;
                  return (
                    <div key={v.title} className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-1 text-sm">{v.title}</h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{v.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>

        {/* Timeline */}
        <section className="py-24 bg-neutral-50 dark:bg-neutral-900">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-16">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                {isUk ? "Наш шлях" : "Our Journey"}
              </p>
              <h2 className="text-4xl font-heading font-extrabold text-neutral-900 dark:text-white">
                {isUk ? "Як ми росли" : "How We Grew"}
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              {TIMELINE.map((item, i) => (
                <div key={item.year} className="flex gap-6 mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-600 to-indigo-800 text-white font-heading font-bold text-sm flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/25">
                      {item.year}
                    </div>
                    {i < TIMELINE.length - 1 && <div className="w-0.5 flex-1 mt-2 bg-indigo-100 dark:bg-indigo-900" />}
                  </div>
                  <div className="pb-8">
                    <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Team / Hiring */}
        <section className="py-24 bg-white dark:bg-neutral-950">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                {isUk ? "Команда" : "Team"}
              </p>
              <h2 className="text-4xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
                {isUk
                  ? <>{`Команда, що `}<span className="gradient-text">росте</span></>
                  : <>A team that <span className="gradient-text">keeps growing</span></>}
              </h2>
              <p className="mt-3 text-neutral-500 dark:text-neutral-400">
                {isUk
                  ? "ML-інженери, data scientists та MLOps-фахівці, що перетворюють дані на бізнес-результати."
                  : "ML engineers, data scientists and MLOps specialists turning data into business outcomes."}
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-linear-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 border border-indigo-100 dark:border-indigo-900 text-center max-w-2xl mx-auto">
              <h3 className="font-heading font-bold text-xl text-neutral-900 dark:text-white mb-2">
                {isUk ? "Ми наймаємо!" : "We're Hiring!"}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 mb-4 max-w-lg mx-auto text-sm">
                {isUk
                  ? "Шукаємо ML Engineer та Data Scientist. Повністю дистанційно, гнучкий графік, цікаві проєкти у FinTech, Healthcare та Retail."
                  : "Looking for an ML Engineer and Data Scientist. Fully remote, flexible hours, exciting projects in FinTech, Healthcare and Retail."}
              </p>
              <a href="mailto:jobs@codeworth.uk" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors">
                {isUk ? "Надіслати CV" : "Send CV"}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Container>
        </section>

        {/* Tech Stack */}
        <section className="py-24 bg-neutral-50 dark:bg-neutral-900">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                {isUk ? "Технології" : "Technologies"}
              </p>
              <h2 className="text-4xl font-heading font-extrabold text-neutral-900 dark:text-white">
                {isUk ? "Наш ML-стек" : "Our ML Stack"}
              </h2>
              <p className="mt-3 text-neutral-500 dark:text-neutral-400">
                {isUk ? "Працюємо тільки з перевіреними, сучасними ML-інструментами." : "We work only with proven, modern ML tools."}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {TECH_STACK.map((tech) => (
                <span key={tech.name} className={`px-5 py-2 rounded-full text-sm font-semibold ${tech.color} shadow-sm`}>
                  {tech.name}
                </span>
              ))}
            </div>
          </Container>
        </section>

        <CTASection lang={lang} />
      </main>
      <Footer />
    </div>
  );
}
