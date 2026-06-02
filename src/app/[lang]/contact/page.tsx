import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { Phone, Mail, MapPin, Clock, MessageCircle, HelpCircle } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk ? "Контакти — Codeworth | Зв'яжіться з нами" : "Contact — Codeworth | Get in Touch",
    description: isUk
      ? "Зв'яжіться з командою Codeworth для обговорення вашого проєкту. Telegram, Email, телефон. Відповідаємо протягом 2 годин."
      : "Contact the Codeworth team to discuss your project. Telegram, Email, phone. We respond within 2 hours.",
    alternates: buildAlternates(lang, 'contact'),
    openGraph: {
      title: isUk ? "Контакти — Codeworth" : "Contact — Codeworth",
      description: isUk
        ? "Зв'яжіться з командою Codeworth. Telegram, Email, телефон. Відповідаємо протягом 2 годин."
        : "Contact the Codeworth team. Telegram, Email, phone. We respond within 2 hours.",
      type: "website",
      url: `https://codeworth.uk/${lang}/contact`,
      images: [{ url: "/og/contact.png", width: 1200, height: 630, alt: isUk ? "Контакти Codeworth" : "Codeworth Contacts" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isUk ? "Контакти — Codeworth" : "Contact — Codeworth",
      description: isUk ? "Відповідаємо протягом 2 годин." : "We respond within 2 hours.",
      images: ["/og/contact.png"],
    },
  };
}

const MESSENGERS = [
  { name: "Telegram", handle: "@codeworth_uk", href: "https://t.me/codenest_ua", bg: "bg-sky-500", emoji: "✈️" },
  { name: "Instagram", handle: "@codenest.ua", href: "https://instagram.com/codenest.ua", bg: "bg-linear-to-br from-purple-500 to-pink-500", emoji: "📷" },
  { name: "Viber", handle: "+38 (000) 000-00-00", href: "viber://chat?number=+380000000000", bg: "bg-violet-600", emoji: "📱" },
  { name: "Facebook", handle: "Codeworth UA", href: "https://facebook.com/codenest.ua", bg: "bg-blue-600", emoji: "📘" },
];

const QUICK_FAQ_UK = [
  { q: "Скільки коштує розробка сайту?", a: "Від 8 000 грн за лендінг до 60 000+ грн за складний портал. Точну ціну визначаємо після брифу." },
  { q: "Скільки часу займає розробка?", a: "Лендінг — 5–10 днів, корпоративний сайт — 2–4 тижні, e-commerce — 4–8 тижнів." },
  { q: "Чи можу я редагувати сайт самостійно?", a: "Так, ми підключаємо CMS (Sanity) — ви самі змінюєте тексти, фото та сторінки." },
  { q: "Чи є гарантія та підтримка?", a: "Так, 1–6 місяців безкоштовної підтримки залежно від пакету + платні плани обслуговування." },
];

const QUICK_FAQ_EN = [
  { q: "How much does a website cost?", a: "From $200 for a landing page to $1,500+ for a complex portal. Exact price is determined after briefing." },
  { q: "How long does development take?", a: "Landing page — 5–10 days, corporate site — 2–4 weeks, e-commerce — 4–8 weeks." },
  { q: "Can I edit the website myself?", a: "Yes, we connect a CMS (Sanity) — you can update texts, photos, and pages yourself." },
  { q: "Is there a warranty and support?", a: "Yes, 1–6 months of free support depending on the package + paid maintenance plans." },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://codeworth.uk/#business",
  name: "Codeworth",
  description: "Веб-студія повного циклу — розробка сайтів, SEO, дизайн та маркетплейс готових рішень для бізнесу в Україні.",
  url: "https://codeworth.uk",
  email: "hello@codeworth.uk",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Київ",
    addressCountry: "UA",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  priceRange: "₴₴",
  currenciesAccepted: "UAH",
  paymentAccepted: "Bank Transfer, LiqPay, Monobank",
  areaServed: {
    "@type": "Country",
    name: "Ukraine",
  },
  sameAs: [
    "https://instagram.com/codenest.ua",
    "https://facebook.com/codenest.ua",
    "https://t.me/codenest_ua",
  ],
};

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isUk = lang === "uk";
  const QUICK_FAQ = isUk ? QUICK_FAQ_UK : QUICK_FAQ_EN;
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-16 gradient-hero">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-4">
                {isUk ? "Контакти" : "Contact"}
              </p>
              <h1 className="text-5xl lg:text-6xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
                {isUk
                  ? <>{`Обговоримо`}<br /><span className="gradient-text">{`ваш проєкт?`}</span></>
                  : <>{"Let's discuss"}<br /><span className="gradient-text">{"your project?"}</span></>}
              </h1>
              <p className="text-lg text-neutral-500">
                {isUk
                  ? "Відповідаємо протягом 2 годин у робочий час. Безкоштовна консультація без зобов'язань."
                  : "We respond within 2 hours during business hours. Free consultation, no obligations."}
              </p>
            </div>
          </Container>
        </section>

        {/* Quick FAQ */}
        <section className="py-12 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100">
          <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {QUICK_FAQ.map((item) => (
                <div key={item.q} className="p-5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 hover:border-indigo-200 hover:shadow-sm transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                    <h3 className="text-sm font-heading font-bold text-neutral-900">{item.q}</h3>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-24 bg-white dark:bg-neutral-950">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

              {/* Contact form */}
              <div className="lg:col-span-3">
                <h2 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white mb-8">
                  {isUk ? "Написати нам" : "Write to Us"}
                </h2>
                <Suspense fallback={<div className="h-96 animate-pulse bg-neutral-100 dark:bg-neutral-800 rounded-2xl" />}>
                  <ContactForm />
                </Suspense>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-2 space-y-8">
                {/* Contact info */}
                <div>
                  <h3 className="text-lg font-heading font-bold text-neutral-900 dark:text-white mb-5">
                    {isUk ? "Контактна інформація" : "Contact Information"}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-400 mb-0.5">{isUk ? "Телефон" : "Phone"}</p>
                        <a href="tel:+380000000000" className="font-medium text-neutral-900 dark:text-white hover:text-indigo-600 transition-colors">
                          +38 (000) 000-00-00
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-400 mb-0.5">Email</p>
                        <a href="mailto:hello@codeworth.uk" className="font-medium text-neutral-900 dark:text-white hover:text-indigo-600 transition-colors">
                          hello@codeworth.uk
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-400 mb-0.5">{isUk ? "Розташування" : "Location"}</p>
                        <span className="font-medium text-neutral-900">{isUk ? "Київ, Україна" : "Kyiv, Ukraine"}</span>
                        <p className="text-xs text-neutral-400">
                          {isUk ? "Працюємо дистанційно по всій Україні" : "Working remotely across Ukraine"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-400 mb-0.5">{isUk ? "Графік роботи" : "Working Hours"}</p>
                        <span className="font-medium text-neutral-900">{isUk ? "Пн–Пт: 9:00–19:00" : "Mon–Fri: 9:00–19:00"}</span>
                        <p className="text-xs text-neutral-400">
                          {isUk ? "Відповідь протягом 2 годин" : "Response within 2 hours"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messengers */}
                <div>
                  <h3 className="text-lg font-heading font-bold text-neutral-900 dark:text-white mb-5">
                    {isUk ? "Месенджери" : "Messengers"}
                  </h3>
                  <div className="space-y-3">
                    {MESSENGERS.map((m) => (
                      <a
                        key={m.name}
                        href={m.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl border border-neutral-100 dark:border-neutral-700 hover:border-indigo-200 hover:bg-indigo-50 transition-all group"
                      >
                        <div className={`w-10 h-10 rounded-xl ${m.bg} flex items-center justify-center text-lg`}>
                          {m.emoji}
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900 dark:text-white text-sm group-hover:text-indigo-700 transition-colors">{m.name}</p>
                          <p className="text-xs text-neutral-400">{m.handle}</p>
                        </div>
                        <MessageCircle className="w-4 h-4 text-neutral-300 group-hover:text-indigo-400 ml-auto transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </div>
  );
}
