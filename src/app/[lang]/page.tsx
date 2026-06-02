import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { HowWeWorkSection } from "@/components/home/HowWeWorkSection";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { CasesSection } from "@/components/home/CasesSection";
import { ClientLogosSection } from "@/components/home/ClientLogosSection";
// Lazy-load below-fold sections for better LCP
const MarketplaceTeaser = dynamic(() => import("@/components/home/MarketplaceTeaser").then((m) => ({ default: m.MarketplaceTeaser })));
const TestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection })));
const BlogPreviewSection = dynamic(() => import("@/components/home/BlogPreviewSection").then((m) => ({ default: m.BlogPreviewSection })));
const CTASection = dynamic(() => import("@/components/home/CTASection").then((m) => ({ default: m.CTASection })));

const HOME_FAQ_UK = [
  { q: "Скільки коштує розробка сайту?", a: "Вартість залежить від типу проєкту. Лендінг — від 4 900 грн, корпоративний сайт — від 15 000 грн, інтернет-магазин — від 25 000 грн. Точна ціна формується після безкоштовної консультації та аналізу ваших цілей." },
  { q: "Скільки часу займає розробка?", a: "Лендінг — 1–2 тижні, корпоративний сайт — 3–4 тижні, інтернет-магазин — 4–8 тижнів. Терміни залежать від складності функціоналу та швидкості погодження з вашого боку." },
  { q: "На якому технологічному стеку ви розробляєте?", a: "Ми працюємо на Next.js 16 + TypeScript + Tailwind CSS. Цей стек забезпечує максимальну швидкість (Core Web Vitals 90+), SEO-оптимізацію та надійність. Хостинг — Vercel або будь-який сервер під ваші потреби." },
  { q: "Чи займаєтесь SEO-просуванням після запуску?", a: "Так. Базова SEO-оптимізація входить в кожен проєкт: title, description, Schema.org, sitemap, robots.txt. Також надаємо послуги технічного SEO-аудиту та щомісячного супроводу." },
  { q: "Чи можу я редагувати сайт після запуску самостійно?", a: "Звісно. Ми підключаємо Sanity CMS — інтуїтивна панель керування контентом без знання коду. Проводимо навчання та надаємо відео-інструкції." },
  { q: "Яка гарантія та підтримка після здачі?", a: "1 місяць безкоштовної гарантійної підтримки входить у кожен проєкт. Далі — пакети підтримки від 1 500 грн/місяць. Час реакції на критичні баги — до 4 годин." },
];

const HOME_FAQ_EN = [
  { q: "How much does website development cost?", a: "Pricing depends on the project type. A landing page starts from £120, a corporate website from £375, and an e-commerce store from £625. The exact price is set after a free consultation and analysis of your goals." },
  { q: "How long does development take?", a: "A landing page takes 1–2 weeks, a corporate website 3–4 weeks, and an e-commerce store 4–8 weeks. Timelines depend on feature complexity and how quickly approvals come from your side." },
  { q: "What tech stack do you use?", a: "We build on Next.js 16 + TypeScript + Tailwind CSS. This stack guarantees top speed (Core Web Vitals 90+), built-in SEO, and long-term reliability. Hosting on Vercel or any server of your choice." },
  { q: "Do you handle SEO after launch?", a: "Yes. Basic SEO is included in every project: title, description, Schema.org, sitemap, robots.txt. We also offer technical SEO audits and monthly ongoing support packages." },
  { q: "Can I edit the website myself after launch?", a: "Absolutely. We integrate Sanity CMS — an intuitive content management panel that requires no coding knowledge. We provide training and video tutorials." },
  { q: "What warranty and support do you offer post-launch?", a: "1 month of free warranty support is included in every project. After that, support packages start from £37/month. Response time for critical issues — within 4 hours." },
];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk
      ? "CodeNest — Веб-студія повного циклу | Розробка сайтів в Україні"
      : "CodeNest — Full-Cycle Web Studio | Website Development",
    description: isUk
      ? "Розробка сайтів, інтернет-магазинів, SEO, UI/UX дизайн. Маркетплейс готових нішевих рішень. 120+ проєктів. Старт від 4 900 грн."
      : "Website development, e-commerce, SEO, UI/UX design. 120+ projects delivered. Starting from £120. Free consultation.",
    keywords: isUk
      ? ["розробка сайтів", "веб-студія Україна", "інтернет-магазин", "SEO", "UI/UX дизайн", "CodeNest"]
      : ["website development", "web studio", "e-commerce", "SEO", "UI/UX design", "CodeNest"],
    openGraph: {
      title: isUk ? "CodeNest — Веб-студія повного циклу" : "CodeNest — Full-Cycle Web Studio",
      description: isUk
        ? "Розробка сайтів, інтернет-магазинів, SEO та UI/UX дизайн. Маркетплейс готових нішевих рішень. 120+ проєктів."
        : "Website development, e-commerce, SEO, and UI/UX design. Marketplace of ready-made niche solutions. 120+ projects.",
      type: "website",
      url: `https://codenest.com.ua/${lang}`,
      images: [{ url: "/og/home.png", width: 1200, height: 630, alt: isUk ? "CodeNest — Веб-студія" : "CodeNest — Web Studio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isUk ? "CodeNest — Веб-студія повного циклу" : "CodeNest — Full-Cycle Web Studio",
      description: isUk
        ? "120+ проєктів. Сайти, магазини, SEO. Старт від 4 900 грн."
        : "120+ projects. Websites, stores, SEO. Starting from £120.",
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <ServicesSection lang={lang} />
        <HowWeWorkSection lang={lang} />
        <WhyUsSection lang={lang} />
        <CasesSection lang={lang} />
        <ClientLogosSection lang={lang} />
        <MarketplaceTeaser lang={lang} />
        <TestimonialsSection />
        <BlogPreviewSection lang={lang} />

        {/* FAQ */}
        <section className="py-24 bg-neutral-50 border-t border-neutral-100">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">FAQ</p>
              <h2 className="text-4xl font-heading font-extrabold text-neutral-900">
                {isUk ? "Часті питання" : "Frequently Asked Questions"}
              </h2>
              <p className="mt-4 text-neutral-500">
                {isUk
                  ? "Відповіді на найпоширеніші запитання про розробку сайтів та роботу з CodeNest."
                  : "Answers to the most common questions about website development and working with CodeNest."}
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqItems.map((item) => (
                <div key={item.q} className="p-6 rounded-2xl border border-neutral-100 bg-white">
                  <h3 className="font-heading font-bold text-neutral-900 mb-2">{item.q}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{item.a}</p>
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
