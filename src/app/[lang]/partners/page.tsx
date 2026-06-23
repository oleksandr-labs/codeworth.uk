import type { Metadata } from "next";
import Link from "next/link";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { ArrowRight, CheckCircle, ExternalLink } from "lucide-react";
import { PartnershipForm } from "@/components/partners/PartnershipForm";

export async function generateStaticParams() {
  return [{ lang: "uk" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  const title = isUk
    ? "ML Tech Stack та партнери Codeworth — Python, PyTorch, AWS SageMaker"
    : "Codeworth ML Tech Stack & Partners — Python, PyTorch, AWS SageMaker";
  const desc = isUk
    ? "ML-стек Codeworth: Python, PyTorch, scikit-learn, FastAPI, AWS SageMaker, MLflow. Партнерська програма для data consultancies та системних інтеграторів."
    : "Codeworth ML stack: Python, PyTorch, scikit-learn, FastAPI, AWS SageMaker, MLflow. Partner program for data consultancies and system integrators.";
  return {
    title,
    description: desc,
    openGraph: { title, description: desc, type: "website", url: `https://codeworth.uk/${lang}/partners` },
    alternates: buildAlternates(lang, "/partners"),
  };
}

interface TechItem {
  name: string;
  description: { uk: string; en: string };
  category: string;
  why: { uk: string; en: string };
  url: string;
  tag: { uk: string; en: string };
  tagColor: string;
}

const TECH_STACK: TechItem[] = [
  {
    name: "Python 3.12",
    description: { uk: "Основна мова для ML: pandas, numpy, scikit-learn, PyTorch, FastAPI — все в одній екосистемі.", en: "Primary ML language: pandas, numpy, scikit-learn, PyTorch, FastAPI — all in one ecosystem." },
    category: "ml-core",
    why: { uk: "Найширша ML-екосистема. 90% наших ML-моделей написані на Python.", en: "Widest ML ecosystem. 90% of our ML models are written in Python." },
    url: "https://python.org",
    tag: { uk: "Основний", en: "Primary" },
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    name: "PyTorch",
    description: { uk: "Deep learning фреймворк: neural networks, NLP трансформери, computer vision моделі.", en: "Deep learning framework: neural networks, NLP transformers, computer vision models." },
    category: "ml-core",
    why: { uk: "Гнучкість для research + production-ready TorchScript/ONNX export.", en: "Flexibility for research + production-ready TorchScript/ONNX export." },
    url: "https://pytorch.org",
    tag: { uk: "Deep Learning", en: "Deep Learning" },
    tagColor: "bg-orange-100 text-orange-700",
  },
  {
    name: "scikit-learn",
    description: { uk: "Класичний ML: XGBoost, Random Forest, logistic regression, clustering, feature pipelines.", en: "Classical ML: XGBoost, Random Forest, logistic regression, clustering, feature pipelines." },
    category: "ml-core",
    why: { uk: "Швидкий PoC та production-ready pipeline за один API. sklearn.Pipeline + joblib serialization.", en: "Fast PoC and production-ready pipeline in one API. sklearn.Pipeline + joblib serialization." },
    url: "https://scikit-learn.org",
    tag: { uk: "Classical ML", en: "Classical ML" },
    tagColor: "bg-indigo-100 text-indigo-700",
  },
  {
    name: "Hugging Face",
    description: { uk: "Pre-trained LLM та transformer моделі: BERT, GPT-2, Llama, Mistral, embedding моделі.", en: "Pre-trained LLM and transformer models: BERT, GPT-2, Llama, Mistral, embedding models." },
    category: "ml-core",
    why: { uk: "Не тренуємо LLM з нуля — fine-tune або RAG over pre-trained. Значна економія клієнтського бюджету.", en: "We don't train LLMs from scratch — fine-tune or RAG over pre-trained. Significant client budget saving." },
    url: "https://huggingface.co",
    tag: { uk: "LLM/NLP", en: "LLM/NLP" },
    tagColor: "bg-yellow-100 text-yellow-700",
  },
  {
    name: "FastAPI",
    description: { uk: "ML inference API: async Python, OpenAPI docs, Pydantic validation, < 10ms overhead.", en: "ML inference API: async Python, OpenAPI docs, Pydantic validation, <10ms overhead." },
    category: "serving",
    why: { uk: "Найшвидший Python web-фреймворк для ML serving. Auto-generated swagger docs для клієнтів.", en: "Fastest Python web framework for ML serving. Auto-generated swagger docs for clients." },
    url: "https://fastapi.tiangolo.com",
    tag: { uk: "ML Serving", en: "ML Serving" },
    tagColor: "bg-green-100 text-green-700",
  },
  {
    name: "AWS SageMaker",
    description: { uk: "Managed ML platform: training jobs, hyperparameter tuning, model registry, batch transform, endpoints.", en: "Managed ML platform: training jobs, hyperparameter tuning, model registry, batch transform, endpoints." },
    category: "cloud",
    why: { uk: "Для клієнтів на AWS. Reproducible training, versioned models, A/B deployment.", en: "For clients on AWS. Reproducible training, versioned models, A/B deployment." },
    url: "https://aws.amazon.com/sagemaker",
    tag: { uk: "AWS", en: "AWS" },
    tagColor: "bg-amber-100 text-amber-700",
  },
  {
    name: "Azure ML",
    description: { uk: "Microsoft ML platform: compute clusters, pipelines, model registry, responsible AI dashboards.", en: "Microsoft ML platform: compute clusters, pipelines, model registry, responsible AI dashboards." },
    category: "cloud",
    why: { uk: "Для клієнтів на Azure (Dynamics 365, Power Platform). Native integration з MS екосистемою.", en: "For clients on Azure (Dynamics 365, Power Platform). Native integration with MS ecosystem." },
    url: "https://azure.microsoft.com/en-us/products/machine-learning",
    tag: { uk: "Azure", en: "Azure" },
    tagColor: "bg-sky-100 text-sky-700",
  },
  {
    name: "MLflow",
    description: { uk: "ML experiment tracking: runs, parameters, metrics, artifact storage, model registry.", en: "ML experiment tracking: runs, parameters, metrics, artifact storage, model registry." },
    category: "mlops",
    why: { uk: "Кожен PoC повністю відтворюваний. Клієнт бачить всі спроби моделі та метрики.", en: "Every PoC is fully reproducible. Client sees all model attempts and metrics." },
    url: "https://mlflow.org",
    tag: { uk: "MLOps", en: "MLOps" },
    tagColor: "bg-purple-100 text-purple-700",
  },
  {
    name: "Docker + Kubernetes",
    description: { uk: "Containerized ML serving: reproducible environments, horizontal scaling, rolling deployments.", en: "Containerized ML serving: reproducible environments, horizontal scaling, rolling deployments." },
    category: "mlops",
    why: { uk: "ML model у Docker = однаковий результат на ноутбуці, CI та production.", en: "ML model in Docker = same result on laptop, CI, and production." },
    url: "https://docker.com",
    tag: { uk: "Infrastructure", en: "Infrastructure" },
    tagColor: "bg-cyan-100 text-cyan-700",
  },
  {
    name: "Apache Airflow",
    description: { uk: "ML pipeline orchestration: scheduled retraining, data ingestion, feature engineering DAGs.", en: "ML pipeline orchestration: scheduled retraining, data ingestion, feature engineering DAGs." },
    category: "mlops",
    why: { uk: "Автоматичне щотижневе перенавчання моделі на нових даних — model drift prevention.", en: "Automatic weekly model retraining on new data — model drift prevention." },
    url: "https://airflow.apache.org",
    tag: { uk: "Pipelines", en: "Pipelines" },
    tagColor: "bg-rose-100 text-rose-700",
  },
  {
    name: "Grafana + Prometheus",
    description: { uk: "ML monitoring: prediction drift, data quality, latency, throughput dashboards.", en: "ML monitoring: prediction drift, data quality, latency, throughput dashboards." },
    category: "mlops",
    why: { uk: "FCA SS1/23 Model Risk вимагає ongoing model monitoring. Grafana dashboard для compliance evidence.", en: "FCA SS1/23 Model Risk requires ongoing model monitoring. Grafana dashboard for compliance evidence." },
    url: "https://grafana.com",
    tag: { uk: "Monitoring", en: "Monitoring" },
    tagColor: "bg-orange-100 text-orange-700",
  },
  {
    name: "GitHub Actions",
    description: { uk: "ML CI/CD: model tests, data validation, automated deployment, regression detection.", en: "ML CI/CD: model tests, data validation, automated deployment, regression detection." },
    category: "mlops",
    why: { uk: "PR-level model quality gates: accuracy regression → блокуємо merge автоматично.", en: "PR-level model quality gates: accuracy regression → auto-block merge." },
    url: "https://github.com/features/actions",
    tag: { uk: "CI/CD", en: "CI/CD" },
    tagColor: "bg-slate-100 text-slate-700",
  },
];

const PARTNER_BENEFITS = {
  uk: [
    { emoji: "💰", title: "Реферальна комісія 15%", desc: "За кожного приведеного ML-клієнта отримуєте 15% від суми проєкту." },
    { emoji: "🔧", title: "White-label ML розробка", desc: "Виконуємо ML під вашим брендом — ви надаєте клієнту готове рішення." },
    { emoji: "📊", title: "SOW та технічні звіти", desc: "Готові Statement of Work, ML model cards та compliance документи." },
    { emoji: "🚀", title: "Пріоритетний PoC", desc: "Партнерські PoC виконуються позачергово — 3 тижні гарантовано." },
    { emoji: "🎓", title: "ML Due Diligence підтримка", desc: "Допомагаємо вашим клієнтам пройти ML readiness assessment." },
    { emoji: "🤝", title: "Co-selling підтримка", desc: "Технічний пресейл разом з вашою командою для великих угод." },
  ],
  en: [
    { emoji: "💰", title: "15% Referral Commission", desc: "For every referred ML client you receive 15% of the project value." },
    { emoji: "🔧", title: "White-label ML Development", desc: "We deliver ML under your brand — you present the finished solution." },
    { emoji: "📊", title: "SOW & Technical Reports", desc: "Ready-made Statement of Work, ML model cards and compliance docs." },
    { emoji: "🚀", title: "Priority PoC Delivery", desc: "Partner PoCs are fast-tracked — 3 weeks guaranteed." },
    { emoji: "🎓", title: "ML Due Diligence Support", desc: "We help your clients pass ML readiness assessments." },
    { emoji: "🤝", title: "Co-selling Support", desc: "Technical pre-sales alongside your team for large deals." },
  ],
};

const TECH_CATEGORIES: { id: string; uk: string; en: string }[] = [
  { id: "ml-core", uk: "ML Core", en: "ML Core" },
  { id: "serving", uk: "ML Serving", en: "ML Serving" },
  { id: "cloud", uk: "Cloud Platforms", en: "Cloud Platforms" },
  { id: "mlops", uk: "MLOps & Infrastructure", en: "MLOps & Infrastructure" },
];

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isUk = lang === "uk";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isUk ? "Головна" : "Home", item: `https://codeworth.uk/${lang}` },
      { "@type": "ListItem", position: 2, name: isUk ? "Партнери та Стек" : "Partners & Stack" },
    ],
  };

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: isUk
      ? "ML Tech Stack Codeworth — інструменти для ML консалтингу"
      : "Codeworth ML Tech Stack — Tools We Use for ML Consulting",
    description: isUk
      ? "Огляд ML-стеку Codeworth: Python, PyTorch, scikit-learn, FastAPI, AWS SageMaker, MLflow."
      : "Overview of Codeworth ML stack: Python, PyTorch, scikit-learn, FastAPI, AWS SageMaker, MLflow.",
    author: { "@type": "Organization", name: "Codeworth", url: "https://codeworth.uk" },
    publisher: { "@type": "Organization", name: "Codeworth", url: "https://codeworth.uk" },
    datePublished: "2024-01-01",
    dateModified: "2026-01-01",
    url: `https://codeworth.uk/${lang}/partners`,
    inLanguage: lang,
    about: TECH_STACK.map((t) => ({
      "@type": "SoftwareApplication",
      name: t.name,
      url: t.url,
      applicationCategory: "DeveloperApplication",
      description: isUk ? t.description.uk : t.description.en,
    })),
  };

  const benefits = isUk ? PARTNER_BENEFITS.uk : PARTNER_BENEFITS.en;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-linear-to-br from-gray-900 via-slate-800 to-blue-900 py-20">
          <Container>
            <nav className="mb-6 text-sm text-gray-400">
              <Link href={`/${lang}`} className="hover:text-white transition-colors">{isUk ? "Головна" : "Home"}</Link>
              <span className="mx-2">›</span>
              <span className="text-white">{isUk ? "ML Стек та Партнери" : "ML Stack & Partners"}</span>
            </nav>
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                {isUk ? "ML Tech Stack та партнерська програма" : "ML Tech Stack & Partner Program"}
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                {isUk
                  ? "Розкриваємо ML-стек, на якому будуємо рішення для UK-бізнесу. Та пропонуємо партнерську програму для data consultancies та системних інтеграторів."
                  : "We reveal the ML stack behind our UK business solutions. And offer a partner program for data consultancies and system integrators."}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="#tech-stack" className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition-colors">
                  {isUk ? "ML Tech Stack ↓" : "ML Tech Stack ↓"}
                </Link>
                <Link href="#partner-program" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                  {isUk ? "Партнерська програма ↓" : "Partner Program ↓"}
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Tech Stack */}
        <section id="tech-stack" className="py-16 bg-white dark:bg-neutral-950">
          <Container>
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {isUk ? "ML Tech Stack Codeworth" : "Codeworth ML Tech Stack"}
              </h2>
              <p className="text-gray-600 dark:text-neutral-300 max-w-2xl">
                {isUk
                  ? "Використовуємо перевірений, відкритий ML-стек. Жодних vendor lock-in та proprietary black-box рішень — тільки інструменти, що забезпечують reproducibility, compliance та production-ready deployment."
                  : "We use a proven, open-source ML stack. No vendor lock-in or proprietary black-box solutions — only tools that ensure reproducibility, compliance, and production-ready deployment."}
              </p>
            </div>

            {TECH_CATEGORIES.map((cat) => {
              const items = TECH_STACK.filter((t) => t.category === cat.id);
              if (items.length === 0) return null;
              return (
                <div key={cat.id} className="mb-10">
                  <h3 className="text-lg font-semibold text-gray-500 dark:text-neutral-400 uppercase tracking-wide mb-4">
                    {isUk ? cat.uk : cat.en}
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((tech) => (
                      <div key={tech.name} className="bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl p-5">
                        <div className="flex items-start justify-between mb-2">
                          <span className="font-bold text-gray-900 dark:text-white">{tech.name}</span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tech.tagColor}`}>
                            {isUk ? tech.tag.uk : tech.tag.en}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-neutral-300 mb-3 leading-relaxed">
                          {isUk ? tech.description.uk : tech.description.en}
                        </p>
                        <div className="bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 rounded-lg p-2.5 mb-3">
                          <p className="text-xs text-blue-700 dark:text-blue-400">
                            <span className="font-medium">{isUk ? "Чому:" : "Why:"}</span>{" "}
                            {isUk ? tech.why.uk : tech.why.en}
                          </p>
                        </div>
                        <a
                          href={tech.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-gray-400 dark:text-neutral-500 hover:text-blue-600 transition-colors"
                        >
                          {tech.url.replace("https://", "").split("/")[0]}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </Container>
        </section>

        {/* Partner Program */}
        <section id="partner-program" className="py-16 bg-blue-50 border-t">
          <Container>
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {isUk ? "Партнерська програма" : "Partner Program"}
              </h2>
              <p className="text-gray-600 dark:text-neutral-300 max-w-2xl">
                {isUk
                  ? "Для data consultancies, системних інтеграторів та IT-агентств, що хочуть надавати клієнтам ML-рішення. Заробляйте на рефералах або передайте ML-розробку нам."
                  : "For data consultancies, system integrators and IT agencies that want to deliver ML solutions to clients. Earn on referrals or delegate ML development to us."}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {benefits.map((b) => (
                <div key={b.title} className="bg-white rounded-xl p-5 border border-blue-100">
                  <div className="text-2xl mb-3">{b.emoji}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{b.title}</h3>
                  <p className="text-sm text-gray-600">{b.desc}</p>
                </div>
              ))}
            </div>

            {/* Partner tiers */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  title: isUk ? "Реферал" : "Referral",
                  desc: isUk ? "Рекомендуєте нас ML-клієнтам — отримуєте 15% комісії" : "You refer ML clients to us — get 15% commission",
                  features: isUk
                    ? ["15% від суми проєкту", "Виплата після delivery", "Немає зобов'язань"]
                    : ["15% of project value", "Paid after delivery", "No obligations"],
                  cta: isUk ? "Стати рефералом" : "Become a Referral",
                  highlighted: false,
                },
                {
                  title: isUk ? "ML партнер" : "ML Partner",
                  desc: isUk ? "Передаєте ML-розробку нам — ми white-label підрядник" : "You delegate ML development to us — we're your white-label subcontractor",
                  features: isUk
                    ? ["White-label ML delivery", "Пріоритетний PoC (3 тижні)", "Технічний пресейл", "Знижка 10%"]
                    : ["White-label ML delivery", "Priority PoC (3 weeks)", "Technical pre-sales support", "10% discount"],
                  cta: isUk ? "Стати партнером" : "Become Partner",
                  highlighted: true,
                },
                {
                  title: isUk ? "Технологічний партнер" : "Tech Partner",
                  desc: isUk ? "Для SaaS, cloud та platform провайдерів — взаємна інтеграція" : "For SaaS, cloud and platform providers — mutual integration",
                  features: isUk
                    ? ["Co-marketing активності", "Технічна інтеграція", "Спільні case studies", "Взаємні посилання"]
                    : ["Co-marketing activities", "Technical integration", "Joint case studies", "Mutual backlinks"],
                  cta: isUk ? "Обговорити" : "Discuss",
                  highlighted: false,
                },
              ].map((tier) => (
                <div
                  key={tier.title}
                  className={`rounded-2xl p-6 border ${
                    tier.highlighted
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <h3 className={`text-xl font-bold mb-2 ${tier.highlighted ? "text-white" : "text-gray-900"}`}>
                    {tier.title}
                  </h3>
                  <p className={`text-sm mb-5 ${tier.highlighted ? "text-blue-200" : "text-gray-600"}`}>
                    {tier.desc}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <CheckCircle className={`w-4 h-4 shrink-0 ${tier.highlighted ? "text-blue-300" : "text-blue-500"}`} />
                        <span className={`text-sm ${tier.highlighted ? "text-blue-100" : "text-gray-700"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/${lang}/contact`}
                    className={`w-full inline-flex items-center justify-center gap-2 font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm ${
                      tier.highlighted
                        ? "bg-white text-blue-600 hover:bg-blue-50"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {tier.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Partnership application form */}
        <section className="py-20 bg-white dark:bg-neutral-950" id="apply">
          <Container>
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {isUk ? "Стати партнером" : "Become a Partner"}
                </h2>
                <p className="text-gray-600">
                  {isUk
                    ? "Заповніть форму і ми зв'яжемося з вами протягом 2 робочих днів."
                    : "Fill out the form and we'll get back to you within 2 business days."}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-neutral-900 rounded-2xl p-8 border border-gray-200">
                <PartnershipForm lang={lang} />
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
