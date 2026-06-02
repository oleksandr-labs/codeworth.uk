import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { FAQContent } from "@/components/faq/FAQContent";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk
      ? "FAQ — Часті питання про розробку сайтів | Codeworth"
      : "FAQ — Frequently Asked Questions | Codeworth",
    description: isUk
      ? "Відповіді на популярні питання про розробку сайтів, ціни, терміни, оплату, маркетплейс та технічну підтримку. Codeworth веб-студія."
      : "Answers to common questions about web development, pricing, timelines, payment, marketplace, and technical support. Codeworth web studio.",
    alternates: buildAlternates(lang, 'faq'),
    openGraph: {
      title: isUk ? "FAQ — Codeworth" : "FAQ — Codeworth",
      description: isUk
        ? "Відповіді на популярні питання про розробку сайтів, ціни, терміни та технічну підтримку."
        : "Answers to common questions about web development, pricing, timelines, and technical support.",
      type: "website",
      url: `https://codeworth.uk/${lang}/faq`,
      images: [{ url: "/og/faq.png", width: 1200, height: 630, alt: "FAQ — Codeworth" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "FAQ — Codeworth",
      description: isUk ? "Відповіді на питання про веб-розробку від Codeworth." : "Answers about web development from Codeworth.",
      images: ["/og/faq.png"],
    },
  };
}

const FAQ_SECTIONS_UK = [
  {
    id: "general",
    title: "Загальні питання",
    items: [
      { q: "Що робить Codeworth?", a: "Codeworth — веб-студія повного циклу: розробка сайтів, інтернет-магазинів, PWA, SEO-просування, UI/UX дизайн, чат-боти та маркетплейс готових нішевих рішень для малого та середнього бізнесу." },
      { q: "Де ви знаходитесь? Чи працюєте дистанційно?", a: "Ми базуємось у Києві, але працюємо дистанційно по всій Україні. Всі комунікації — через Telegram, Zoom, Notion та Figma." },
      { q: "Скільки часу займає розробка сайту?", a: "Лендінг — 5–10 днів. Корпоративний сайт — 2–4 тижні. Інтернет-магазин — 4–8 тижнів. Складний портал — 2–4 місяці. Терміни фіксуємо у договорі." },
      { q: "Чи можна побачити приклади робіт?", a: "Так, перегляньте наше портфоліо з 8+ реалізованих проєктів. Також у маркетплейсі є 35 live демо-сторінок різних ніш." },
    ],
  },
  {
    id: "pricing",
    title: "Ціни та оплата",
    items: [
      { q: "Скільки коштує розробка сайту?", a: "Лендінг — від 8 000 грн, корпоративний сайт — від 15 000 грн, інтернет-магазин — від 40 000 грн. Готові нішеві рішення — від 4 900 грн. Точна ціна після консультації." },
      { q: "Які методи оплати ви приймаєте?", a: "Банківський переказ (ФОП), LiqPay, Monobank. Договір підписуємо офіційно." },
      { q: "Чи є передоплата?", a: "Так — 50% передоплата після підписання договору та затвердження ТЗ. Решта 50% — після здачі проєкту." },
      { q: "Що входить у вартість?", a: "Дизайн, верстка, розробка, базове SEO, підключення аналітики, налаштування CMS, навчання та 1 місяць гарантійної підтримки." },
      { q: "Чи є приховані платежі?", a: "Жодних. Ви отримуєте детальний кошторис до початку роботи. Будь-яка зміна обсягів — тільки з вашого підтвердження та нового кошторису." },
    ],
  },
  {
    id: "tech",
    title: "Технічні питання",
    items: [
      { q: "На якій платформі ви розробляєте сайти?", a: "Переважно Next.js 16 + TypeScript + Tailwind CSS — найсучасніший стек для швидких SEO-сайтів. Для простих задач — HTML/CSS + Vanilla JS. WordPress — за окремим запитом." },
      { q: "Чи буде мій сайт швидким?", a: "Так. Next.js з Static Site Generation та оптимізацією зображень дає LCP < 2.5с та PageSpeed 90+. Всі сайти проходять Core Web Vitals аудит перед запуском." },
      { q: "Чи підходить сайт для мобільних пристроїв?", a: "Обов'язково. Всі наші сайти — Mobile First: розробляємо спочатку для мобільного, потім для десктопу." },
      { q: "Чи буду я мати права на код?", a: "Так. Після повної оплати всі права на код та дизайн переходять до вас. Ми отримуємо право використовувати проєкт у портфоліо." },
      { q: "Чи інтегруєте Google Analytics та SEO?", a: "Так, у всіх тарифах включено: GA4, Google Search Console, базова SEO-оптимізація, Schema.org та sitemap.xml." },
    ],
  },
  {
    id: "marketplace",
    title: "Маркетплейс",
    items: [
      { q: "Що таке готові нішеві рішення?", a: "Це повноцінний сайт, заздалегідь розроблений для конкретної ніші бізнесу (ресторан, салон, клініка тощо). Ви купуєте, ми налаштовуємо під вас та запускаємо за 3 дні." },
      { q: "Як відрізняється шаблон від розробки з нуля?", a: "Готове рішення — у 3–5 разів дешевше та готове за 3 дні. Розробка з нуля — унікальний дизайн, повний контроль та зайнятість. Готові рішення ідеальні для старту або обмеженого бюджету." },
      { q: "Чи можна кастомізувати шаблон?", a: "Так. Базова кастомізація входить у ціну: ваш логотип, кольори, контент, контактні дані. Глибока зміна дизайну або функціоналу — за додатковим кошторисом." },
      { q: "Скільки часу займе запуск готового рішення?", a: "3 робочих дні після отримання вашого контенту (тексти, фото, логотип, реквізити)." },
      { q: "Що входить у підтримку після запуску?", a: "30 днів включено безкоштовно: дрібні правки, виправлення помилок, консультації. Далі можна підписатися на місячний тариф підтримки." },
    ],
  },
  {
    id: "support",
    title: "Підтримка та супровід",
    items: [
      { q: "Чи надаєте гарантію на роботи?", a: "Так — 1 місяць гарантійної безкоштовної підтримки після запуску. Якщо щось перестало працювати з нашої вини — виправляємо негайно." },
      { q: "Як відбувається технічна підтримка?", a: "Через Telegram або email. Відповідаємо протягом 2 годин у робочий час (Пн–Пт, 9:00–19:00)." },
      { q: "Що робити якщо сайт зламали?", a: "Телефонуйте або пишіть у Telegram — реагуємо терміново. Відновлюємо з резервної копії, закриваємо вразливість, проводимо аудит безпеки." },
      { q: "Чи навчаєте користуватися сайтом?", a: "Так. Після здачі проєкту проводимо онлайн-навчання (30–60 хв) по роботі з CMS. Записуємо відео-інструкцію для вашої команди." },
    ],
  },
];

const FAQ_SECTIONS_EN = [
  {
    id: "general",
    title: "General Questions",
    items: [
      { q: "What does Codeworth do?", a: "Codeworth is a full-cycle web studio: website development, e-commerce, PWA, SEO promotion, UI/UX design, chatbots, and a marketplace of ready-made niche solutions for small and medium businesses." },
      { q: "Where are you located? Do you work remotely?", a: "We are based in Kyiv but work remotely across Ukraine. All communication is via Telegram, Zoom, Notion, and Figma." },
      { q: "How long does website development take?", a: "Landing page — 5–10 days. Corporate site — 2–4 weeks. Online store — 4–8 weeks. Complex portal — 2–4 months. Deadlines are fixed in the contract." },
      { q: "Can I see examples of your work?", a: "Yes, check out our portfolio with 8+ completed projects. The marketplace also has 35 live demo pages across different niches." },
    ],
  },
  {
    id: "pricing",
    title: "Pricing & Payment",
    items: [
      { q: "How much does a website cost?", a: "Landing page — from $200, corporate site — from $375, online store — from $1,000. Ready-made niche solutions — from $125. Exact price after consultation." },
      { q: "What payment methods do you accept?", a: "Bank transfer, credit card, PayPal. We sign an official contract." },
      { q: "Is there an upfront payment?", a: "Yes — 50% upfront after signing the contract and approving the specification. The remaining 50% upon project delivery." },
      { q: "What's included in the price?", a: "Design, markup, development, basic SEO, analytics setup, CMS configuration, training, and 1 month of warranty support." },
      { q: "Are there hidden fees?", a: "None. You receive a detailed estimate before work begins. Any scope changes are only made with your approval and a new estimate." },
    ],
  },
  {
    id: "tech",
    title: "Technical Questions",
    items: [
      { q: "What platform do you build websites on?", a: "Primarily Next.js 16 + TypeScript + Tailwind CSS — the most modern stack for fast SEO websites. For simple tasks — HTML/CSS + Vanilla JS. WordPress — upon request." },
      { q: "Will my website be fast?", a: "Yes. Next.js with Static Site Generation and image optimization delivers LCP < 2.5s and PageSpeed 90+. All sites pass Core Web Vitals audit before launch." },
      { q: "Is the website mobile-friendly?", a: "Absolutely. All our websites are Mobile First: we design for mobile first, then desktop." },
      { q: "Will I own the code?", a: "Yes. After full payment, all rights to the code and design transfer to you. We retain the right to use the project in our portfolio." },
      { q: "Do you integrate Google Analytics and SEO?", a: "Yes, all packages include: GA4, Google Search Console, basic SEO optimization, Schema.org, and sitemap.xml." },
    ],
  },
  {
    id: "marketplace",
    title: "Marketplace",
    items: [
      { q: "What are ready-made niche solutions?", a: "It's a fully developed website built specifically for a business niche (restaurant, salon, clinic, etc.). You purchase it, we customize it for you and launch within 3 days." },
      { q: "How is a template different from custom development?", a: "A ready-made solution is 3–5 times cheaper and ready in 3 days. Custom development offers a unique design and full control. Ready solutions are ideal for starting out or with a limited budget." },
      { q: "Can the template be customized?", a: "Yes. Basic customization is included: your logo, colors, content, contact details. Deep design or functionality changes are quoted separately." },
      { q: "How long does it take to launch a ready-made solution?", a: "3 business days after receiving your content (texts, photos, logo, details)." },
      { q: "What's included in post-launch support?", a: "30 days included free: minor edits, bug fixes, consultations. After that you can subscribe to a monthly maintenance plan." },
    ],
  },
  {
    id: "support",
    title: "Support & Maintenance",
    items: [
      { q: "Do you provide a warranty?", a: "Yes — 1 month of free warranty support after launch. If something breaks due to our fault — we fix it immediately." },
      { q: "How does technical support work?", a: "Via Telegram or email. We respond within 2 hours during business hours (Mon–Fri, 9:00–19:00)." },
      { q: "What if the site gets hacked?", a: "Call or message us on Telegram — we respond urgently. We restore from backup, close the vulnerability, and conduct a security audit." },
      { q: "Do you train us to use the website?", a: "Yes. After project delivery we conduct an online training session (30–60 min) on working with the CMS. We record a video tutorial for your team." },
    ],
  },
];

export default async function FAQPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isUk = lang === "uk";
  const FAQ_SECTIONS = isUk ? FAQ_SECTIONS_UK : FAQ_SECTIONS_EN;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isUk ? "Головна" : "Home", item: `https://codeworth.uk/${lang}` },
      { "@type": "ListItem", position: 2, name: "FAQ", item: `https://codeworth.uk/${lang}/faq` },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_SECTIONS.flatMap((section) =>
      section.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      }))
    ),
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-16 gradient-hero">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-4">FAQ</p>
              <h1 className="text-5xl lg:text-6xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
                {isUk
                  ? <>{`Відповіді на ваші`}<br /><span className="gradient-text">{`запитання`}</span></>
                  : <>{"Answers to your"}<br /><span className="gradient-text">{"questions"}</span></>}
              </h1>
              <p className="text-lg text-neutral-500">
                {isUk
                  ? "Все що ви хотіли знати про Codeworth, розробку сайтів та маркетплейс."
                  : "Everything you wanted to know about Codeworth, web development, and the marketplace."}
              </p>
            </div>
          </Container>
        </section>

        {/* Category nav */}
        <div className="sticky top-16 z-40 bg-white dark:bg-neutral-800 border-b border-neutral-100 dark:border-neutral-700 shadow-sm">
          <Container>
            <div className="flex gap-1 overflow-x-auto py-3 no-scrollbar">
              {FAQ_SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="shrink-0 px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:bg-indigo-50 hover:text-indigo-700 transition-colors whitespace-nowrap"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </Container>
        </div>

        <section className="py-16 bg-white dark:bg-neutral-950">
          <Container>
            <FAQContent sections={FAQ_SECTIONS} />
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
