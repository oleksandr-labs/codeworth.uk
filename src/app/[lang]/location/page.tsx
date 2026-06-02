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
    ? "Розробка сайтів по всій Україні — Веб-студія Codeworth"
    : "Website Development Across Ukraine — Codeworth Web Studio";
  const desc = isUk
    ? "Codeworth розробляє сайти для бізнесу у Києві, Харкові, Львові, Одесі, Дніпрі та ще 10 містах України. Локальне SEO, швидкий запуск, офіційний договір."
    : "Codeworth builds websites for businesses in Kyiv, Kharkiv, Lviv, Odesa, Dnipro, and 10 more Ukrainian cities. Local SEO, fast launch, official contract.";
  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      type: "website",
      url: `https://codeworth.uk/${lang}/location`,
      images: [{ url: "/og/location.png", width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, images: ["/og/location.png"] },
    alternates: buildAlternates(lang, "/location"),
  };
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Головна", item: "https://codeworth.uk" },
    { "@type": "ListItem", position: 2, name: "Міста" },
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
                {isUk ? "Локальне SEO та веб-розробка" : "Local SEO & Web Development"}
              </p>
              <h1 className="text-4xl lg:text-6xl font-heading font-extrabold text-neutral-900 dark:text-white mb-6 leading-tight">
                {isUk
                  ? <>{`Розробка сайтів `}<span className="gradient-text">{"по всій Україні"}</span></>
                  : <>{`Website Development `}<span className="gradient-text">{"Across Ukraine"}</span></>}
              </h1>
              <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
                {isUk
                  ? `Ми обслуговуємо бізнес у ${GEO_CITIES.length} містах України. Дистанційна робота, локальне SEO, повний супровід від консультації до запуску.`
                  : `We serve businesses in ${GEO_CITIES.length} cities across Ukraine. Remote work, local SEO, full support from consultation to launch.`}
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

        {/* Why local SEO matters */}
        <section className="py-20 bg-neutral-50 dark:bg-neutral-900 ">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-14">
                <h2 className="text-3xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
                  {isUk ? "Чому важливо локальне SEO?" : "Why does local SEO matter?"}
                </h2>
                <p className="text-neutral-500">
                  {isUk
                    ? "82% користувачів шукають послуги у своєму місті. Ваш бізнес має бути першим у Google Maps та органічній видачі."
                    : "82% of users search for services in their city. Your business must appear first in Google Maps and organic search results."}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  {
                    uk: "Google My Business",
                    en: "Google My Business",
                    dUk: "Налаштовуємо та оптимізуємо профіль компанії в Google — зірки, відгуки, фото, графік роботи.",
                    dEn: "We set up and optimize your company profile on Google — stars, reviews, photos, business hours.",
                    icon: "📍",
                  },
                  {
                    uk: "Геозапити в SEO",
                    en: "Geo-queries in SEO",
                    dUk: "Оптимізуємо сайт під запити «послуга + місто» — потрапляємо в топ-3 Google у вашому регіоні.",
                    dEn: "We optimize the site for 'service + city' queries — reaching the top 3 on Google in your region.",
                    icon: "🔍",
                  },
                  {
                    uk: "Schema.org LocalBusiness",
                    en: "Schema.org LocalBusiness",
                    dUk: "Розмітка для Google про ваш бізнес — адреса, телефон, графік, відгуки відображаються у SERP.",
                    dEn: "Markup for Google about your business — address, phone, hours, reviews shown in SERP.",
                    icon: "⭐",
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
                  ? "Ми працюємо по всій Україні — напишіть нам і ми організуємо консультацію."
                  : "We work across all of Ukraine — write to us and we'll arrange a consultation."}
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
