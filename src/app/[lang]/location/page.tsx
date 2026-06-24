import type { Metadata } from "next";
import Link from "next/link";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { GEO_CITIES } from "@/lib/data/geo";
import { MapPin, ArrowRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  const title = isUk
    ? "ML-консалтинг по всьому UK — Codeworth | Лондон, Манчестер, Бірмінгем та інші"
    : "ML Consulting Across the UK — Codeworth | London, Manchester, Birmingham & More";
  const desc = isUk
    ? "Codeworth надає ML та AI послуги бізнесу у Лондоні, Манчестері, Бірмінгемі, Единбурзі та інших містах UK. Дистанційна робота, UK-GDPR compliance, повна підтримка від PoC до production."
    : "Codeworth delivers ML and AI services to businesses in London, Manchester, Birmingham, Edinburgh, and across the UK. Remote-first, UK-GDPR compliant, full support from PoC to production.";
  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      type: "website",
      url: `https://codeworth.uk/${lang}/location`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, images: ["/opengraph-image"] },
    alternates: buildAlternates(lang, "/location"),
  };
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://codeworth.uk" },
    { "@type": "ListItem", position: 2, name: "UK Locations" },
  ],
};

export default async function LocationIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isUk = lang === "uk";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-20 gradient-hero">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-4">
                {isUk ? "ML-консалтинг по всьому UK" : "ML Consulting Across the UK"}
              </p>
              <h1 className="text-4xl lg:text-6xl font-heading font-extrabold text-neutral-900 dark:text-white mb-6 leading-tight">
                {isUk
                  ? <>{`ML та AI для бізнесу `}<span className="gradient-text">{"у кожному місті UK"}</span></>
                  : <>{`ML and AI for Businesses `}<span className="gradient-text">{"Across the UK"}</span></>}
              </h1>
              <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
                {isUk
                  ? `Обслуговуємо бізнес у ${GEO_CITIES.length} містах UK. Remote-first підхід, UK-GDPR compliance, повна підтримка від PoC до production ML.`
                  : `We serve businesses in ${GEO_CITIES.length} UK cities. Remote-first approach, UK-GDPR compliant, full support from ML PoC to production deployment.`}
              </p>
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors"
              >
                {isUk ? "Замовити консультацію" : "Request Consultation"} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </section>

        {/* Cities grid */}
        <section className="py-20 bg-white dark:bg-neutral-950">
          <Container>
            <h2 className="text-2xl font-heading font-extrabold text-neutral-900 dark:text-white mb-10 text-center">
              {isUk ? "Оберіть ваше місто" : "Select your city"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {GEO_CITIES.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${lang}/location/${city.slug}`}
                  className="group rounded-2xl border border-neutral-100 dark:border-neutral-700 p-6 hover:shadow-lg hover:shadow-neutral-100 hover:-translate-y-1 transition-all duration-300 bg-white"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-indigo-500" />
                      <span className="font-heading font-extrabold text-lg text-neutral-900 dark:text-white group-hover:text-indigo-700 transition-colors">
                        {isUk ? city.nameUk : city.nameEn}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 line-clamp-2">
                    {isUk ? city.description : city.descriptionEn}
                  </p>
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>{isUk ? city.region : city.regionEn}</span>
                    <span>{isUk ? `${city.population} мешканців` : `${city.populationEn} residents`}</span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* Why UK ML consulting */}
        <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-14">
                <h2 className="text-3xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
                  {isUk ? "Чому Codeworth для UK бізнесу?" : "Why Codeworth for UK Businesses?"}
                </h2>
                <p className="text-neutral-500">
                  {isUk
                    ? "Ми розуміємо UK-специфіку: FCA compliance, NHS data requirements, Consumer Duty — і будуємо ML-рішення, що відповідають регуляторним вимогам."
                    : "We understand UK-specific requirements: FCA compliance, NHS data standards, Consumer Duty — and build ML solutions that meet regulatory demands."}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  {
                    uk: "UK GDPR & Data Protection",
                    en: "UK GDPR & Data Protection",
                    dUk: "Усі ML-рішення відповідають UK GDPR та DPA 2018. Дані залишаються у UK (AWS eu-west-2 або Azure UK South).",
                    dEn: "All ML solutions comply with UK GDPR and DPA 2018. Data stays in the UK (AWS eu-west-2 or Azure UK South).",
                    icon: "🔐",
                  },
                  {
                    uk: "FCA та галузева відповідність",
                    en: "FCA & Sector Compliance",
                    dUk: "FCA SS1/23 Model Risk Management, NHS IG Toolkit, Consumer Duty — ми знаємо регуляторні вимоги вашої галузі.",
                    dEn: "FCA SS1/23 Model Risk Management, NHS IG Toolkit, Consumer Duty — we know the regulatory requirements of your sector.",
                    icon: "⚖️",
                  },
                  {
                    uk: "Remote-first для всього UK",
                    en: "Remote-First Across the UK",
                    dUk: "Повністю дистанційна робота — команда в будь-якій точці UK. Ті ж стандарти deliverables незалежно від міста.",
                    dEn: "Fully remote delivery — team available anywhere in the UK. Same deliverable standards regardless of location.",
                    icon: "🌐",
                  },
                ].map((item) => (
                  <div key={item.uk} className="rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 p-6">
                    <span className="text-3xl mb-4 block">{item.icon}</span>
                    <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-2">{isUk ? item.uk : item.en}</h3>
                    <p className="text-sm text-neutral-500">{isUk ? item.dUk : item.dEn}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-20 bg-neutral-950 text-white">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-heading font-extrabold mb-4">
                {isUk ? "Не знайшли своє місто?" : "Don't see your city?"}
              </h2>
              <p className="text-neutral-400 mb-8">
                {isUk
                  ? "Ми працюємо по всьому UK — напишіть нам і ми організуємо ML-консультацію незалежно від вашого місця розташування."
                  : "We work across all of the UK — contact us and we'll arrange an ML consultation regardless of your location."}
              </p>
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors"
              >
                {isUk ? "Написати нам" : "Contact Us"} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </div>
  );
}
