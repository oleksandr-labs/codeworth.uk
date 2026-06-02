import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { CTASection } from "@/components/home/CTASection";
import { PricingContent } from "@/components/pricing/PricingContent";
import { PriceCalculator } from "@/components/pricing/PriceCalculator";
import { Shield, Clock, CreditCard } from "lucide-react";
import { PageAnalytics } from "@/components/analytics/PageAnalytics";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk
      ? "Ціни на розробку сайтів — Codeworth | Прозорі тарифи"
      : "Website Development Pricing — Codeworth | Transparent Rates",
    description: isUk
      ? "Прозорі ціни на розробку сайтів, інтернет-магазинів та готових нішевих рішень. Starter від 15 000 грн, Business від 40 000 грн. Без прихованих платежів."
      : "Transparent pricing for website development, e-commerce, and ready-made niche solutions. Starter from $375, Business from $1,000. No hidden fees.",
    alternates: buildAlternates(lang, 'pricing'),
    openGraph: {
      title: isUk ? "Ціни — Codeworth | Прозорі тарифи" : "Pricing — Codeworth | Transparent Rates",
      description: isUk
        ? "Прозорі ціни на розробку сайтів та нішевих рішень. Starter від 15 000 грн. Без прихованих платежів."
        : "Transparent pricing for website development and niche solutions. Starter from $375. No hidden fees.",
      type: "website",
      url: `https://codeworth.uk/${lang}/pricing`,
      images: [{ url: "/og/pricing.png", width: 1200, height: 630, alt: isUk ? "Ціни Codeworth" : "Codeworth Pricing" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isUk ? "Ціни — Codeworth" : "Pricing — Codeworth",
      description: isUk ? "Прозорі ціни на веб-розробку від Codeworth." : "Transparent web development pricing by Codeworth.",
      images: ["/og/pricing.png"],
    },
  };
}

const FAQ_UK = [
  { q: "Чи є приховані платежі?", a: "Ні. Ми надаємо детальне ТЗ з повним переліком робіт та фіксованою ціною до початку розробки. Додаткові роботи — тільки за вашою згодою та окремим кошторисом." },
  { q: "Яка схема оплати?", a: "50% передоплата після підписання договору, 50% після здачі проєкту. Для Enterprise можлива поетапна оплата." },
  { q: "Чи можна платити частинами?", a: "Так, для тарифу Business і Enterprise можлива оплата у 3 етапи: 30% / 40% / 30% відповідно до виконаних робіт." },
  { q: "Скільки коштує додаткова функція?", a: "Додаткові функції розраховуються погодинно (1 000–1 500 грн/год залежно від складності) або фіксованою ціною після оцінки." },
  { q: "Що входить у вартість підтримки?", a: "Оновлення контенту, виправлення помилок, оновлення залежностей, резервні копії, моніторинг та консультації в межах оплачених годин." },
];

const FAQ_EN = [
  { q: "Are there hidden fees?", a: "No. We provide a detailed specification with a complete list of work and a fixed price before development begins. Additional work is only done with your approval and a separate estimate." },
  { q: "What is the payment scheme?", a: "50% upfront after signing the contract, 50% upon project delivery. Staged payments are available for Enterprise." },
  { q: "Can I pay in installments?", a: "Yes, for Business and Enterprise plans, payment can be made in 3 stages: 30% / 40% / 30% according to completed work." },
  { q: "How much does an extra feature cost?", a: "Additional features are priced hourly ($25–40/hour depending on complexity) or at a fixed price after assessment." },
  { q: "What's included in maintenance?", a: "Content updates, bug fixes, dependency updates, backups, monitoring, and consultations within paid hours." },
];

export default async function PricingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isUk = lang === "uk";
  const FAQ = isUk ? FAQ_UK : FAQ_EN;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isUk ? "Головна" : "Home", item: `https://codeworth.uk/${lang}` },
      { "@type": "ListItem", position: 2, name: isUk ? "Ціни" : "Pricing", item: `https://codeworth.uk/${lang}/pricing` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  // PriceSpecification / Offer schema for the three main development tiers
  const offersSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isUk ? "Розробка сайтів — Codeworth" : "Website Development — Codeworth",
    provider: { "@type": "Organization", name: "Codeworth", url: "https://codeworth.uk" },
    url: `https://codeworth.uk/${lang}/pricing`,
    offers: [
      {
        "@type": "Offer",
        name: "Starter",
        description: isUk ? "Лендінг або корпоративний сайт до 5 сторінок" : "Landing page or corporate website up to 5 pages",
        priceCurrency: isUk ? "UAH" : "GBP",
        price: isUk ? "15000" : "375",
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/InStock",
        url: `https://codeworth.uk/${lang}/pricing`,
      },
      {
        "@type": "Offer",
        name: "Business",
        description: isUk ? "Корпоративний сайт або інтернет-магазин до 20 сторінок" : "Corporate website or e-commerce store up to 20 pages",
        priceCurrency: isUk ? "UAH" : "GBP",
        price: isUk ? "40000" : "1000",
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/InStock",
        url: `https://codeworth.uk/${lang}/pricing`,
      },
      {
        "@type": "Offer",
        name: "Enterprise",
        description: isUk ? "Складний портал, CRM або SaaS з нестандартним функціоналом" : "Complex portal, CRM or SaaS with custom functionality",
        priceCurrency: isUk ? "UAH" : "GBP",
        price: isUk ? "80000" : "2000",
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/InStock",
        url: `https://codeworth.uk/${lang}/pricing`,
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PageAnalytics event="pricingView" />
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offersSchema) }} />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-16 gradient-hero">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-4">
                {isUk ? "Ціни" : "Pricing"}
              </p>
              <h1 className="text-5xl lg:text-6xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
                {isUk
                  ? <>{`Прозорі ціни —`}<br /><span className="gradient-text">{`без сюрпризів`}</span></>
                  : <>{"Transparent pricing —"}<br /><span className="gradient-text">{"no surprises"}</span></>}
              </h1>
              <p className="text-lg text-neutral-500">
                {isUk
                  ? "Фіксована ціна, чіткі терміни та детальне ТЗ до старту. Ніяких прихованих доплат."
                  : "Fixed price, clear deadlines, and a detailed spec before we start. No hidden charges."}
              </p>
            </div>
          </Container>
        </section>

        {/* Trust badges */}
        <section className="py-8 bg-white dark:bg-neutral-800 border-y border-neutral-100">
          <Container>
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-neutral-600">
              <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-500" /> {isUk ? "Без прихованих платежів" : "No hidden fees"}</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-indigo-500" /> {isUk ? "Гарантія термінів" : "Deadline guarantee"}</span>
              <span className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-amber-500" /> {isUk ? "50% після здачі" : "50% upon delivery"}</span>
            </div>
          </Container>
        </section>

        <PricingContent />

        <PriceCalculator />

        {/* FAQ */}
        <section className="py-24 bg-neutral-50 dark:bg-neutral-900 ">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                {isUk ? "Питання і відповіді" : "Questions & Answers"}
              </p>
              <h2 className="text-4xl font-heading font-extrabold text-neutral-900">
                {isUk ? "FAQ по цінах" : "Pricing FAQ"}
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {FAQ.map((item) => (
                <div key={item.q} className="p-6 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-100">
                  <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-2">{item.q}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">{item.a}</p>
                </div>
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
