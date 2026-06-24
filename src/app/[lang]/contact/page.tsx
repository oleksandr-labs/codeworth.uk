import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { Mail, MapPin, Clock, MessageCircle, HelpCircle } from "lucide-react";

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
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: isUk ? "Контакти Codeworth" : "Codeworth Contacts" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isUk ? "Контакти — Codeworth" : "Contact — Codeworth",
      description: isUk ? "Відповідаємо протягом 2 годин." : "We respond within 2 hours.",
      images: ["/opengraph-image"],
    },
  };
}

const QUICK_FAQ_UK = [
  { q: "Скільки коштує ML-проєкт?", a: "Discovery від £3,000, PoC від £15,000, production ML-система від £40,000. Точна ціна після аудиту даних." },
  { q: "Скільки часу займає розробка?", a: "PoC — 4–6 тижнів, production ML — 8–12 тижнів, enterprise-система — 12–20 тижнів." },
  { q: "Чи потрібні нам власні дані?", a: "Для більшості ML-задач достатньо 1–10 тис. прикладів. Допомагаємо з розміткою та доповненням." },
  { q: "Чи є гарантія якості моделі?", a: "Гарантуємо мінімальний F1-score або AUC перед здачею. 90 днів гарантійної підтримки." },
  { q: "Чи є безкоштовна початкова консультація?", a: "Так — 30-хвилинний discovery call у відеоформаті, без жодних зобов'язань." },
  { q: "Чи можна зустрітися особисто у Великій Британії?", a: "Так. На запит зустрічаємося з клієнтами у Лондоні, Манчестері, Единбурзі та інших містах Великої Британії." },
  { q: "Яку інформацію підготувати до першого дзвінка?", a: "Короткий опис бізнес-проблеми, доступні джерела даних, приблизні терміни та бюджет. Усім іншим займаємося ми." },
  { q: "Як швидко ви можете розпочати проєкт?", a: "Більшість проєктів стартують упродовж 1–2 тижнів після підписання договору. PoC-проєкти можуть розпочатися за кілька днів у разі термінових потреб." },
  { q: "Як швидко ви можете розпочати ML-проєкт?", a: "Для нових клієнтів — зазвичай упродовж 2 тижнів після підписання договору: один тиждень на онбординг (NDA, DPA, доступ до середовища даних) і один тиждень на discovery-сесії. Для термінових проєктів (регуляторний дедлайн, конкурентне вікно) — старт за 3–5 робочих днів. Актуальна доступність — у нашому календарі бронювання." },
  { q: "Чи працюєте ви з клієнтами поза Лондоном?", a: "Так — 65% наших клієнтів у Великій Британії перебувають за межами Лондона. Більшість проєктів ведемо повністю дистанційно: відеодзвінки на discovery та milestone-рев'ю. Для проєктів, що потребують роботи на місці (NHS, виробництво), виїжджаємо до клієнтів по всій Великій Британії. Активні клієнти є у Манчестері, Единбурзі, Бірмінгемі, Брістолі, Лідсі, Шеффілді та інших містах." },
  { q: "Яку інформацію потрібно надати для оцінки проєкту?", a: "Для точного скоупінгу нам потрібно: (1) яку бізнес-проблему ви вирішуєте за допомогою ML; (2) які дані у вас є (приблизний обсяг, формат, глибина історії); (3) як виглядає успішний результат (вимірювана метрика); (4) ваші терміни та регуляторні обмеження. 30-хвилинного discovery call зазвичай достатньо, щоб підготувати письмову оцінку впродовж 48 годин. Технічних знань у сфері ML не потрібно." },
  { q: "Чи можна отримати відгуки від ваших попередніх клієнтів?", a: "Так. Ми можемо познайомити вас з клієнтами, які погодилися виступати як референції — як правило, 2–3 особи з близької до вашої галузі або кейсу. Усі розмови з референціями організовуються після початкового дзвінка з нами. Крім того, наші опубліковані кейс-стаді (див. Портфоліо) містять реальні імена клієнтів та верифіковані метрики результатів. Ми відкриті до due diligence." },
];

const QUICK_FAQ_EN = [
  { q: "How much does an ML project cost?", a: "From £1,800 for a PoC to £12,000+ for an enterprise ML system. Exact price after data audit." },
  { q: "How long does development take?", a: "PoC — 3–4 weeks, production ML — 8–12 weeks, enterprise platform — 12–20 weeks." },
  { q: "Do we need our own data?", a: "Most ML tasks need 1–10K labelled examples. We help with annotation and data augmentation." },
  { q: "Is there a quality guarantee?", a: "We guarantee minimum F1-score or AUC before delivery. 3-month warranty support included." },
  { q: "Do you offer a free initial consultation?", a: "Yes — 30-minute discovery call via video, no obligation." },
  { q: "Can we meet in person in the UK?", a: "Yes. We meet clients in London, Manchester, Edinburgh and other UK cities on request." },
  { q: "What information should I prepare for the first call?", a: "Brief description of the business problem, current data sources available, rough timeline, and budget range. We handle everything else." },
  { q: "How quickly can you start a project?", a: "Most projects can start within 1-2 weeks of contract signature. PoC projects can begin in days for urgent requirements." },
  { q: "How quickly can you start on our ML project?", a: "For new clients we typically start within 2 weeks of contract signing — one week for onboarding (NDA, DPA, access to data environment) and one week of discovery sessions. For urgent projects (regulatory deadline, competitive window) we can start within 3-5 business days. Current availability is shown on our booking calendar — reach out to check live capacity." },
  { q: "Do you work with clients outside London?", a: "Yes — 65% of our UK clients are outside London. We work fully remotely for most projects with video calls for discovery and milestone reviews. For projects requiring on-site data access or stakeholder workshops (common in NHS and manufacturing), we travel to client sites across the UK. We have active clients in Manchester, Edinburgh, Birmingham, Bristol, Leeds, Sheffield, and beyond." },
  { q: "What information do you need to provide a project estimate?", a: "To scope a project accurately we need: (1) what business problem you are solving with ML, (2) what data you have available (rough size, format, history length), (3) what a successful outcome looks like (measurable metric), (4) your timeline and any regulatory constraints. A 30-minute discovery call is usually enough to produce a written estimate within 48 hours. No technical ML knowledge required on your side for this conversation." },
  { q: "Can we speak to previous Codeworth clients as references?", a: "Yes. We can connect you with clients who have agreed to serve as references — typically 2-3 clients in a similar industry or use case to yours. All reference conversations are arranged after an initial call with us. Additionally, our published case studies (see Portfolio) include real client names and verifiable outcome metrics. We are comfortable with due diligence." },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://codeworth.uk/#business",
  name: "Codeworth",
  description: "ML/AI consultancy for business — custom machine learning models, MLOps, NLP, Computer Vision for UK and EU companies.",
  url: "https://codeworth.uk",
  email: "hello@codeworth.uk",
  address: {
    "@type": "PostalAddress",
    addressLocality: "London",
    addressCountry: "GB",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "18:00",
    },
  ],
  priceRange: "££",
  currenciesAccepted: "GBP, EUR",
  paymentAccepted: "Bank Transfer, SWIFT, Stripe",
  areaServed: [
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "European Union" },
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
                        <span className="font-medium text-neutral-900">{isUk ? "Лондон, Великобританія" : "London, United Kingdom"}</span>
                        <p className="text-xs text-neutral-400">
                          {isUk ? "Дистанційно — UK / EU" : "Remote — UK / EU"}
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
              </div>
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </div>
  );
}
