import type { Metadata } from "next";
import Link from "next/link";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { ArrowRight, CheckCircle, Database } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk
      ? "ML-інтеграція з ERP та CRM | Codeworth — SAP, Dynamics, Salesforce"
      : "ML Integration with ERP & CRM | Codeworth — SAP, Dynamics, Salesforce",
    description: isUk
      ? "Інтеграція ML-моделей з вашими бізнес-системами: SAP, Microsoft Dynamics, Salesforce, Oracle, Sage. Demand forecasting, fraud detection, churn prediction безпосередньо у ваш workflow."
      : "Integrate ML models with your business systems: SAP, Microsoft Dynamics, Salesforce, Oracle, Sage. Demand forecasting, fraud detection, churn prediction directly into your workflow.",
    alternates: buildAlternates(lang, "erp-development"),
    openGraph: {
      title: isUk ? "ML + ERP/CRM інтеграція | Codeworth" : "ML + ERP/CRM Integration | Codeworth",
      description: isUk
        ? "ML-моделі, що працюють всередині SAP, Dynamics, Salesforce. Без заміни систем."
        : "ML models that work inside SAP, Dynamics, Salesforce. No system replacement needed.",
      type: "website",
      url: `https://codeworth.uk/${lang}/erp-development`,
    },
  };
}

const INTEGRATIONS = [
  { name: "SAP S/4HANA", logo: "🔷", uk: "SAP BTP ML inference + IBP demand forecasting API. ABAP custom RFC → ML scoring pipeline.", en: "SAP BTP ML inference + IBP demand forecasting API. ABAP custom RFC → ML scoring pipeline." },
  { name: "Microsoft Dynamics 365", logo: "🟦", uk: "Azure ML integration via Power Automate або custom Dataverse plugin. Real-time scoring у Dynamics workflows.", en: "Azure ML integration via Power Automate or custom Dataverse plugin. Real-time scoring in Dynamics workflows." },
  { name: "Salesforce", logo: "☁️", uk: "Einstein ML API або custom Apex callout до FastAPI inference endpoint. Lead scoring, churn prediction у CRM.", en: "Einstein ML API or custom Apex callout to FastAPI inference endpoint. Lead scoring, churn prediction in CRM." },
  { name: "Oracle ERP Cloud", logo: "🔴", uk: "Oracle Integration Cloud (OIC) → ML inference API. Demand planning та financial anomaly detection.", en: "Oracle Integration Cloud (OIC) → ML inference API. Demand planning and financial anomaly detection." },
  { name: "Sage Intacct / 200", logo: "🟢", uk: "REST API integration. Fraud detection та cash flow forecasting для UK SME.", en: "REST API integration. Fraud detection and cash flow forecasting for UK SMEs." },
  { name: "Custom ERP/WMS", logo: "⚙️", uk: "REST, GraphQL або message queue (Kafka/RabbitMQ) інтеграція з будь-якою custom системою.", en: "REST, GraphQL or message queue (Kafka/RabbitMQ) integration with any custom system." },
];

const ML_USE_CASES = [
  {
    titleUk: "Demand Forecasting → ERP Reorder",
    titleEn: "Demand Forecasting → ERP Reorder",
    emoji: "📦",
    descUk: "ML-прогноз попиту (XGBoost/Prophet) записується назад до ERP як reorder proposal. Жодного ручного введення.",
    descEn: "ML demand forecast (XGBoost/Prophet) writes back to ERP as reorder proposals. Zero manual entry.",
    systems: ["SAP", "Dynamics", "Oracle"],
  },
  {
    titleUk: "Fraud Scoring → Transaction Approval",
    titleEn: "Fraud Scoring → Transaction Approval",
    emoji: "🛡️",
    descUk: "Real-time ML fraud score вбудований у платіжний workflow. Автоматичне challenge/decline при перевищенні порогу.",
    descEn: "Real-time ML fraud score embedded in payment workflow. Automatic challenge/decline when threshold exceeded.",
    systems: ["Salesforce", "Sage", "Custom"],
  },
  {
    titleUk: "Churn Prediction → CRM Action",
    titleEn: "Churn Prediction → CRM Action",
    emoji: "📉",
    descUk: "Щоденний batch ML scoring → CRM task для sales rep при high churn risk. Retention action trackable у CRM.",
    descEn: "Daily batch ML scoring → CRM task for sales rep on high churn risk. Retention action trackable in CRM.",
    systems: ["Salesforce", "Dynamics", "HubSpot"],
  },
  {
    titleUk: "Anomaly Detection → Finance Alert",
    titleEn: "Anomaly Detection → Finance Alert",
    emoji: "🚨",
    descUk: "ML-аномалії у фінансових транзакціях → автоматичний alert у accounting module. Making Tax Digital сумісно.",
    descEn: "ML anomalies in financial transactions → automatic alert in accounting module. Making Tax Digital compatible.",
    systems: ["Sage", "Xero", "Dynamics"],
  },
];

const INTEGRATION_PATTERNS = [
  {
    pattern: { uk: "Real-time API", en: "Real-time API" },
    descUk: "FastAPI ML endpoint → синхронний HTTP callout з ERP/CRM під час транзакції. Latency < 100ms. Для fraud detection та credit scoring.",
    descEn: "FastAPI ML endpoint → synchronous HTTP callout from ERP/CRM during transaction. Latency <100ms. For fraud detection and credit scoring.",
  },
  {
    pattern: { uk: "Batch Scoring", en: "Batch Scoring" },
    descUk: "Нічний або щогодинний batch job: ERP data export → ML inference → writeback results до ERP таблиці. Для demand forecasting та churn scoring.",
    descEn: "Nightly or hourly batch job: ERP data export → ML inference → writeback results to ERP table. For demand forecasting and churn scoring.",
  },
  {
    pattern: { uk: "Event-Driven (Kafka)", en: "Event-Driven (Kafka)" },
    descUk: "ERP → Kafka event stream → ML consumer → action trigger. Zero-latency для high-volume transaction processing.",
    descEn: "ERP → Kafka event stream → ML consumer → action trigger. Zero-latency for high-volume transaction processing.",
  },
  {
    pattern: { uk: "Embedded Plugin", en: "Embedded Plugin" },
    descUk: "ML-логіка вбудована у ERP як native plugin/extension (ABAP для SAP, Apex для Salesforce). Найтісніша інтеграція.",
    descEn: "ML logic embedded in ERP as native plugin/extension (ABAP for SAP, Apex for Salesforce). Tightest integration.",
  },
];

export default async function ErpDevelopmentPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isUk = lang === "uk";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isUk ? "Головна" : "Home", item: `https://codeworth.uk/${lang}` },
      { "@type": "ListItem", position: 2, name: "ML + ERP/CRM" },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-20 bg-linear-to-br from-slate-900 via-blue-900 to-slate-900">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm px-3 py-1.5 rounded-full mb-6">
                <Database className="w-4 h-4" />
                {isUk ? "ML + Бізнес-системи" : "ML + Business Systems"}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                {isUk ? "ML-інтеграція з ERP та CRM" : "ML Integration with ERP & CRM"}
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                {isUk
                  ? "Ваші бізнес-системи вже зберігають цінні дані. Ми вбудовуємо ML-моделі безпосередньо у SAP, Dynamics, Salesforce — без заміни систем, без ручного введення."
                  : "Your business systems already hold valuable data. We embed ML models directly into SAP, Dynamics, Salesforce — no system replacement, no manual data entry."}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors">
                  {isUk ? "Обговорити інтеграцію" : "Discuss Integration"} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href={`/${lang}/services`} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-all">
                  {isUk ? "Наші ML-послуги" : "Our ML Services"}
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Supported systems */}
        <section className="py-16 bg-white dark:bg-neutral-900 border-b">
          <Container>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {isUk ? "Підтримувані системи" : "Supported Systems"}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {INTEGRATIONS.map((item) => (
                <div key={item.name} className="bg-gray-50 dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{item.logo}</span>
                    <h3 className="font-bold text-gray-900 dark:text-white">{item.name}</h3>
                  </div>
                  <p className="text-gray-500 dark:text-neutral-400 text-sm">{isUk ? item.uk : item.en}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ML use cases in ERP */}
        <section className="py-16 bg-gray-50 dark:bg-neutral-800 border-b">
          <Container>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {isUk ? "ML use cases в ERP/CRM" : "ML Use Cases in ERP/CRM"}
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {ML_USE_CASES.map((uc) => (
                <div key={uc.titleEn} className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-700 p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{uc.emoji}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">{isUk ? uc.titleUk : uc.titleEn}</h3>
                      <p className="text-gray-500 text-sm mb-3">{isUk ? uc.descUk : uc.descEn}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {uc.systems.map((s) => (
                          <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Integration patterns */}
        <section className="py-16 bg-white dark:bg-neutral-900 border-b">
          <Container>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {isUk ? "Патерни інтеграції" : "Integration Patterns"}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {INTEGRATION_PATTERNS.map((p) => (
                <div key={p.pattern.en} className="bg-gray-50 dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700 p-5">
                  <h3 className="font-bold text-blue-600 mb-2">{isUk ? p.pattern.uk : p.pattern.en}</h3>
                  <p className="text-gray-500 text-sm">{isUk ? p.descUk : p.descEn}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Why ML in existing systems */}
        <section className="py-16 bg-gray-50 dark:bg-neutral-800">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                {isUk ? "Чому ML всередині ERP — правильний підхід?" : "Why ML Inside ERP Is the Right Approach?"}
              </h2>
              <div className="space-y-4">
                {[
                  {
                    uk: "Дані вже там. Ваш ERP містить роки транзакцій, інвентарю, клієнтів — ідеальна ML-сировина без дорогої міграції.",
                    en: "The data is already there. Your ERP contains years of transactions, inventory, customers — perfect ML raw material without expensive migration.",
                  },
                  {
                    uk: "Користувачі вже у системі. ML-результати у знайомому інтерфейсі — adoption rate значно вищий ніж окремий AI-дашборд.",
                    en: "Users are already in the system. ML results in the familiar interface — adoption rate is significantly higher than a standalone AI dashboard.",
                  },
                  {
                    uk: "Action-oriented. ML score, що автоматично створює задачу у CRM або reorder у ERP — це ROI. Score у таблиці Excel — це не ROI.",
                    en: "Action-oriented. ML score that automatically creates a CRM task or ERP reorder — that's ROI. Score in an Excel table — that's not.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-700">
                    <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-gray-600 dark:text-neutral-300">{isUk ? item.uk : item.en}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 bg-blue-600">
          <Container>
            <div className="max-w-xl mx-auto text-center text-white">
              <h2 className="text-2xl font-bold mb-3">
                {isUk ? "Яку систему використовує ваш бізнес?" : "Which system does your business use?"}
              </h2>
              <p className="text-blue-100 mb-6">
                {isUk
                  ? "Зв'яжіться з нами — проведемо безкоштовний ML integration assessment за 30 хвилин."
                  : "Contact us — we'll run a free ML integration assessment in 30 minutes."}
              </p>
              <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-600 font-bold hover:bg-blue-50 transition-colors">
                {isUk ? "Отримати assessment" : "Get an Assessment"} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </div>
  );
}
