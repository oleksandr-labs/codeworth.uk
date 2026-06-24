import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { ArrowRight, CheckCircle, Clock, Zap } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk
      ? "ML-пакети для бізнесу | Готові рішення від Codeworth"
      : "ML Solution Packages for Business | Ready-Made ML from Codeworth",
    description: isUk
      ? "Готові ML-пакети для UK бізнесу: fraud detection, churn prediction, demand forecasting, NLP, computer vision. Фіксована ціна, швидкий запуск, FCA-compliant."
      : "Ready-made ML packages for UK business: fraud detection, churn prediction, demand forecasting, NLP, computer vision. Fixed price, fast launch, FCA-compliant.",
    alternates: buildAlternates(lang, "marketplace"),
    openGraph: {
      title: isUk ? "ML-пакети | Codeworth" : "ML Solution Packages | Codeworth",
      description: isUk
        ? "Готові ML-рішення для UK бізнесу. Фіксована ціна, deployment за 4–8 тижнів."
        : "Ready-made ML solutions for UK business. Fixed price, deployment in 4–8 weeks.",
      type: "website",
      url: `https://codeworth.uk/${lang}/marketplace`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: isUk ? "ML-пакети Codeworth" : "Codeworth ML Packages" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isUk ? "ML-пакети | Codeworth" : "ML Packages | Codeworth",
      description: isUk ? "Готові ML-рішення. Швидкий старт, фіксована ціна." : "Ready-made ML solutions. Fast start, fixed price.",
      images: ["/opengraph-image"],
    },
  };
}

const ML_PACKAGES = [
  {
    group: { uk: "💳 FinTech та Фінанси", en: "💳 FinTech & Finance" },
    items: [
      { nameUk: "Fraud Detection", nameEn: "Fraud Detection", price: "£8,000", weeks: "6–8", emoji: "🛡️", color: "from-red-500 to-rose-600", slug: "fraud-detection", descUk: "XGBoost + graph analytics для виявлення шахрайства в реальному часі. FCA SS1/23 compliant.", descEn: "XGBoost + graph analytics for real-time fraud detection. FCA SS1/23 compliant with SHAP explainability." },
      { nameUk: "Credit Scoring ML", nameEn: "Credit Scoring ML", price: "£10,000", weeks: "8–10", emoji: "📊", color: "from-blue-600 to-indigo-600", slug: "credit-scoring", descUk: "ML кредитний скоринг на alternative data. UK GDPR Article 22 compliant, SHAP explanations.", descEn: "ML credit scoring on alternative data with UK GDPR Article 22 compliance and SHAP explanations." },
      { nameUk: "Customer Churn Prediction", nameEn: "Customer Churn Prediction", price: "£5,500", weeks: "4–6", emoji: "📉", color: "from-orange-500 to-amber-600", slug: "churn-prediction", descUk: "Прогнозування відтоку клієнтів: LightGBM + retention action triggers. CRM-інтеграція включена.", descEn: "Customer churn prediction: LightGBM + automated retention action triggers. CRM integration included." },
      { nameUk: "CLV Prediction", nameEn: "Customer Lifetime Value", price: "£6,000", weeks: "5–7", emoji: "💰", color: "from-emerald-600 to-teal-600", slug: "clv-prediction", descUk: "ML-прогнозування CLV для оптимізації CAC та retention budget.", descEn: "ML customer lifetime value prediction for CAC optimisation and retention budget allocation." },
    ],
  },
  {
    group: { uk: "🏭 Виробництво та Логістика", en: "🏭 Manufacturing & Logistics" },
    items: [
      { nameUk: "Demand Forecasting", nameEn: "Demand Forecasting", price: "£7,500", weeks: "6–8", emoji: "📦", color: "from-cyan-600 to-blue-700", slug: "demand-forecasting", descUk: "XGBoost + Prophet для прогнозування попиту на рівні SKU×тиждень. ERP-інтеграція.", descEn: "XGBoost + Prophet demand forecasting at SKU×week granularity with ERP integration." },
      { nameUk: "Predictive Maintenance", nameEn: "Predictive Maintenance", price: "£9,000", weeks: "8–10", emoji: "⚙️", color: "from-slate-600 to-gray-700", slug: "predictive-maintenance", descUk: "LSTM на sensor data для прогнозування відмов обладнання. SCADA/OPC-UA інтеграція.", descEn: "LSTM on sensor data for equipment failure prediction. SCADA/OPC-UA integration included." },
      { nameUk: "Computer Vision QA", nameEn: "Computer Vision QA", price: "£12,000", weeks: "8–12", emoji: "👁️", color: "from-violet-600 to-purple-700", slug: "computer-vision-qa", descUk: "YOLOv8 для виявлення дефектів на виробничій лінії в реальному часі. Edge deployment.", descEn: "YOLOv8 real-time defect detection on production line. Edge deployment on NVIDIA Jetson." },
      { nameUk: "Supply Chain Risk ML", nameEn: "Supply Chain Risk ML", price: "£8,500", weeks: "7–9", emoji: "🚛", color: "from-teal-600 to-cyan-700", slug: "supply-chain-risk", descUk: "ML-моніторинг ризиків постачальників: Companies House + geopolitical signals + AIS.", descEn: "ML supplier risk monitoring: Companies House data + geopolitical signals + AIS vessel tracking." },
    ],
  },
  {
    group: { uk: "💬 NLP та Автоматизація", en: "💬 NLP & Automation" },
    items: [
      { nameUk: "RAG Knowledge Bot", nameEn: "RAG Knowledge Bot", price: "£5,000", weeks: "3–5", emoji: "🤖", color: "from-indigo-600 to-blue-700", slug: "rag-knowledge-bot", descUk: "GPT-4o RAG chatbot на вашій документації. Qdrant vector DB + citation layer. UK GDPR compliant.", descEn: "GPT-4o RAG chatbot on your documentation. Qdrant vector DB + citation layer. UK GDPR compliant." },
      { nameUk: "Document Intelligence", nameEn: "Document Intelligence", price: "£6,500", weeks: "5–7", emoji: "📋", color: "from-amber-600 to-orange-700", slug: "document-intelligence", descUk: "Витяг структурованих даних з PDF/Word/email: контракти, рахунки, заявки. GPT-4o Vision.", descEn: "Structured data extraction from PDF/Word/email: contracts, invoices, applications. GPT-4o Vision." },
      { nameUk: "Sentiment & NPS ML", nameEn: "Sentiment & NPS ML", price: "£4,500", weeks: "3–5", emoji: "💬", color: "from-pink-600 to-rose-700", slug: "sentiment-nps-ml", descUk: "NLP-аналіз відгуків та NPS: sentiment, themes, alert pipeline. Slack/email integrations.", descEn: "NLP analysis of reviews and NPS: sentiment scoring, theme extraction, alert pipeline." },
      { nameUk: "Contract Review NLP", nameEn: "Contract Review NLP", price: "£7,000", weeks: "6–8", emoji: "⚖️", color: "from-blue-600 to-violet-700", slug: "contract-review-nlp", descUk: "AI-рев'ю контрактів: виявлення ризикових клаузул, ключових зобов'язань та дедлайнів.", descEn: "AI contract review: detection of risky clauses, key obligations, and deadlines. UK law aware." },
    ],
  },
  {
    group: { uk: "🏥 Охорона здоров'я та Retail", en: "🏥 Healthcare & Retail" },
    items: [
      { nameUk: "NHS Patient Readmission", nameEn: "NHS Patient Readmission", price: "£9,000", weeks: "8–12", emoji: "🏥", color: "from-emerald-600 to-green-700", slug: "nhs-readmission", descUk: "XGBoost на EHR-даних для прогнозування 30-денного ризику повторної госпіталізації. DSPT compliant.", descEn: "XGBoost on EHR data for 30-day readmission risk prediction. DSPT and UK GDPR compliant." },
      { nameUk: "Retail Personalisation ML", nameEn: "Retail Personalisation ML", price: "£8,000", weeks: "7–9", emoji: "🛍️", color: "from-rose-600 to-pink-700", slug: "retail-personalisation", descUk: "Recommendation engine (collaborative filtering) + dynamic pricing ML для UK e-commerce.", descEn: "Recommendation engine (collaborative filtering) + dynamic pricing ML for UK e-commerce." },
    ],
  },
];

const WHY_PACKAGES = [
  { icon: "💰", titleUk: "Фіксована ціна", titleEn: "Fixed Price", descUk: "Ніяких сюрпризів — повна вартість зафіксована у Statement of Work до початку роботи.", descEn: "No surprises — full cost fixed in Statement of Work before work begins." },
  { icon: "⚡", titleUk: "Швидкий старт", titleEn: "Fast Start", descUk: "Готові пакети стартують за 2–3 дні після підписання SOW — без тривалого discovery.", descEn: "Ready packages start within 2–3 days of SOW signing — no lengthy discovery phase." },
  { icon: "🔍", titleUk: "Документований ROI", titleEn: "Documented ROI", descUk: "Кожен пакет включає business case template з вимірюваними KPI та 30/60/90-день звітом.", descEn: "Every package includes a business case template with measurable KPIs and a 30/60/90-day impact report." },
  { icon: "⚖️", titleUk: "UK-compliant", titleEn: "UK-Compliant", descUk: "FCA SS1/23, UK GDPR, Consumer Duty — всі пакети проєктовані з урахуванням UK regulatory вимог.", descEn: "FCA SS1/23, UK GDPR, Consumer Duty — all packages designed with UK regulatory requirements built in." },
  { icon: "🔧", titleUk: "3 місяці підтримки", titleEn: "3 Months Support", descUk: "Гарантійна підтримка включена: якщо метрики нижче погоджених порогів — виправляємо безкоштовно.", descEn: "Warranty support included: if metrics fall below agreed thresholds — we fix it at no cost." },
  { icon: "📊", titleUk: "Production-ready", titleEn: "Production-Ready", descUk: "Не Jupyter ноутбук — повноцінний FastAPI serving endpoint, Docker, CI/CD та MLOps моніторинг.", descEn: "Not a Jupyter notebook — a full FastAPI serving endpoint, Docker, CI/CD, and MLOps monitoring." },
];

export default async function MarketplacePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isUk = lang === "uk";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isUk ? "Головна" : "Home", item: `https://codeworth.uk/${lang}` },
      { "@type": "ListItem", position: 2, name: isUk ? "ML-пакети" : "ML Packages" },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-20 bg-linear-to-br from-slate-900 via-indigo-900 to-slate-900">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm px-3 py-1.5 rounded-full mb-6">
                <Zap className="w-4 h-4" />
                {isUk ? "Готові ML-рішення" : "Ready-Made ML Solutions"}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                {isUk ? "ML-пакети для UK бізнесу" : "ML Solution Packages for UK Business"}
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                {isUk
                  ? "Готові ML-рішення з фіксованою ціною, чіткими deliverables та гарантованим deployment. Fraud detection, demand forecasting, NLP, computer vision — оберіть свій пакет."
                  : "Ready-made ML solutions with fixed pricing, clear deliverables, and guaranteed deployment. Fraud detection, demand forecasting, NLP, computer vision — choose your package."}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors">
                  {isUk ? "Обговорити пакет" : "Discuss a Package"} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href={`/${lang}/pricing`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-all">
                  {isUk ? "Переглянути ціни" : "View Pricing"}
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Why packages */}
        <section className="py-16 bg-white dark:bg-neutral-900 border-b">
          <Container>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {WHY_PACKAGES.map((item) => (
                <div key={item.titleEn} className="flex gap-4">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{isUk ? item.titleUk : item.titleEn}</h3>
                    <p className="text-gray-600 dark:text-neutral-300 text-sm">{isUk ? item.descUk : item.descEn}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Package groups */}
        {ML_PACKAGES.map((group) => (
          <section key={group.group.en} className="py-16 bg-gray-50 dark:bg-neutral-800 border-b">
            <Container>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                {isUk ? group.group.uk : group.group.en}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {group.items.map((item) => (
                  <div key={item.slug} className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-700 p-5 flex flex-col">
                    <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${item.color} flex items-center justify-center text-lg mb-4`}>
                      {item.emoji}
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{isUk ? item.nameUk : item.nameEn}</h3>
                    <p className="text-gray-500 dark:text-neutral-400 text-sm mb-4 flex-1">{isUk ? item.descUk : item.descEn}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-bold text-indigo-600">{item.price}</span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {item.weeks} {isUk ? "тиж." : "wks"}
                      </span>
                    </div>
                    <Link href={`/${lang}/contact`} className="block text-center py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors">
                      {isUk ? "Замовити" : "Order"}
                    </Link>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        ))}

        {/* Process */}
        <section className="py-16 bg-white dark:bg-neutral-900">
          <Container>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-10 text-center">
              {isUk ? "Як це працює" : "How It Works"}
            </h2>
            <div className="grid sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { num: "01", uk: "Обираєте пакет", en: "Choose a package", dUk: "Обираєте ML-рішення та зв'язуєтесь з нами.", dEn: "Select the ML solution and contact us." },
                { num: "02", uk: "Discovery Call", en: "Discovery Call", dUk: "30-хв дзвінок для підтвердження fit та даних.", dEn: "30-min call to confirm data fit and requirements." },
                { num: "03", uk: "SOW + Старт", en: "SOW + Start", dUk: "Statement of Work підписано, починаємо за 2–3 дні.", dEn: "Statement of Work signed, we start in 2–3 days." },
                { num: "04", uk: "Delivery + ROI", en: "Delivery + ROI", dUk: "Production deployment + 30/60/90-день звіт ROI.", dEn: "Production deployment + 30/60/90-day ROI report." },
              ].map((s) => (
                <div key={s.num} className="text-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold mx-auto mb-3">{s.num}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{isUk ? s.uk : s.en}</h3>
                  <p className="text-gray-500 text-sm">{isUk ? s.dUk : s.dEn}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 bg-indigo-600">
          <Container>
            <div className="text-center text-white max-w-xl mx-auto">
              <h2 className="text-2xl font-bold mb-3">
                {isUk ? "Не знайшли потрібний пакет?" : "Didn't find the right package?"}
              </h2>
              <p className="text-indigo-100 mb-6">
                {isUk ? "Ми розробляємо кастомні ML-рішення для будь-якого бізнес-завдання." : "We build custom ML solutions for any business challenge."}
              </p>
              <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-indigo-600 font-bold hover:bg-indigo-50 transition-colors">
                {isUk ? "Обговорити кастомне рішення" : "Discuss a Custom Solution"} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </div>
  );
}
