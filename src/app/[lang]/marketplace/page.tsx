import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { NicheGrid } from "@/components/marketplace/NicheGrid";
import { ArrowRight, Check, Zap, DollarSign, Star, ShieldCheck, Headphones, Eye } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk
      ? "Маркетплейс готових сайтів для бізнесу | Codeworth"
      : "Ready-Made Business Website Marketplace | Codeworth",
    description: isUk
      ? "Готові нішеві сайти для 35 типів бізнесу: ресторани, салони, клініки, магазини, юристи. Запуск за 3 дні. Від 4 900 грн. Codeworth Marketplace."
      : "Ready-made niche websites for 35 business types: restaurants, salons, clinics, stores, lawyers. Launch in 3 days. Codeworth Marketplace.",
    alternates: buildAlternates(lang, 'marketplace'),
    openGraph: {
      title: isUk ? "Маркетплейс готових сайтів | Codeworth" : "Ready-Made Website Marketplace | Codeworth",
      description: isUk
        ? "Готові нішеві сайти для 35 типів бізнесу. Запуск за 3 дні. Від 4 900 грн."
        : "Ready-made niche websites for 35 business types. Launch in 3 days.",
      type: "website",
      url: `https://codeworth.uk/${lang}/marketplace`,
      images: [{ url: "/og/marketplace.png", width: 1200, height: 630, alt: isUk ? "Маркетплейс Codeworth" : "Codeworth Marketplace" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isUk ? "Маркетплейс готових сайтів | Codeworth" : "Ready-Made Website Marketplace | Codeworth",
      description: isUk ? "35 нішевих сайтів. Запуск за 3 дні." : "35 niche websites. Launch in 3 days.",
      images: ["/og/marketplace.png"],
    },
  };
}

const NICHES_UK = [
  {
    group: "🍽 Їжа та гостинність",
    items: [
      { name: "Ресторан / Кафе", slug: "restaurant", price: "9 900", complexity: "medium", emoji: "🍽", color: "from-orange-400 to-red-500" },
      { name: "Доставка їжі", slug: "food-delivery", price: "19 900", complexity: "complex", emoji: "🛵", color: "from-red-400 to-rose-600" },
      { name: "Кондитерська / Пекарня", slug: "bakery", price: "4 900", complexity: "simple", emoji: "🎂", color: "from-amber-400 to-orange-400" },
      { name: "Кав'ярня / Бар", slug: "coffee-bar", price: "9 900", complexity: "medium", emoji: "☕", color: "from-yellow-600 to-amber-700" },
    ],
  },
  {
    group: "💇 Краса та здоров'я",
    items: [
      { name: "Салон краси / Барбершоп", slug: "beauty", price: "9 900", complexity: "medium", emoji: "✂️", color: "from-pink-400 to-rose-500" },
      { name: "Фітнес-клуб / Тренер", slug: "fitness", price: "9 900", complexity: "medium", emoji: "💪", color: "from-emerald-400 to-teal-500" },
      { name: "Медична клініка", slug: "medical", price: "19 900", complexity: "complex", emoji: "🏥", color: "from-blue-400 to-indigo-500" },
      { name: "SPA / Тату-студія", slug: "tattoo-spa", price: "9 900", complexity: "medium", emoji: "🧘", color: "from-violet-400 to-purple-600" },
      { name: "Аптека", slug: "pharmacy", price: "19 900", complexity: "complex", emoji: "💊", color: "from-green-400 to-emerald-600" },
      { name: "Ветеринарна клініка", slug: "veterinary", price: "9 900", complexity: "medium", emoji: "🐾", color: "from-teal-400 to-cyan-600" },
    ],
  },
  {
    group: "🏗 Будівництво та нерухомість",
    items: [
      { name: "Будівництво / Ремонт", slug: "construction", price: "9 900", complexity: "medium", emoji: "🏗", color: "from-yellow-500 to-amber-600" },
      { name: "Нерухомість", slug: "realestate", price: "19 900", complexity: "complex", emoji: "🏠", color: "from-slate-500 to-slate-700" },
      { name: "Клінінг", slug: "cleaning", price: "4 900", complexity: "simple", emoji: "🧹", color: "from-sky-400 to-blue-500" },
    ],
  },
  {
    group: "📚 Освіта та консалтинг",
    items: [
      { name: "Онлайн-курси / LMS", slug: "education", price: "19 900", complexity: "complex", emoji: "🎓", color: "from-indigo-400 to-violet-600" },
      { name: "Юридичні послуги", slug: "law", price: "9 900", complexity: "medium", emoji: "⚖️", color: "from-slate-600 to-neutral-700" },
      { name: "Бухгалтерія / Консалтинг", slug: "consulting", price: "9 900", complexity: "medium", emoji: "📊", color: "from-blue-500 to-indigo-600" },
      { name: "Психолог / Коуч", slug: "psychology", price: "4 900", complexity: "simple", emoji: "🧠", color: "from-purple-400 to-violet-500" },
    ],
  },
  {
    group: "🚗 Авто та логістика",
    items: [
      { name: "Автосервіс / Автосалон", slug: "auto", price: "9 900", complexity: "medium", emoji: "🚗", color: "from-neutral-600 to-neutral-800" },
      { name: "Логістика / Перевезення", slug: "logistics", price: "9 900", complexity: "medium", emoji: "🚚", color: "from-amber-500 to-orange-600" },
    ],
  },
  {
    group: "🛒 E-commerce та ритейл",
    items: [
      { name: "Магазин одягу / Fashion", slug: "fashion", price: "19 900", complexity: "complex", emoji: "👗", color: "from-purple-400 to-violet-600" },
      { name: "Магазин електроніки", slug: "electronics", price: "19 900", complexity: "complex", emoji: "💻", color: "from-blue-600 to-indigo-700" },
      { name: "Меблі / Інтер'єр", slug: "furniture", price: "19 900", complexity: "complex", emoji: "🛋", color: "from-amber-600 to-brown-700" },
      { name: "Квітковий магазин", slug: "flowers", price: "4 900", complexity: "simple", emoji: "🌸", color: "from-pink-400 to-fuchsia-500" },
    ],
  },
  {
    group: "🎨 Креатив та розваги",
    items: [
      { name: "Фотограф / Відеограф", slug: "photographer", price: "4 900", complexity: "simple", emoji: "📷", color: "from-neutral-700 to-neutral-900" },
      { name: "Івент-агентство", slug: "events", price: "9 900", complexity: "medium", emoji: "🎉", color: "from-fuchsia-500 to-pink-600" },
      { name: "Туризм / Готель", slug: "travel", price: "19 900", complexity: "complex", emoji: "✈️", color: "from-sky-500 to-blue-600" },
      { name: "Квест / Розваги", slug: "entertainment", price: "9 900", complexity: "medium", emoji: "🎮", color: "from-violet-500 to-indigo-700" },
    ],
  },
  {
    group: "💻 IT та суспільство",
    items: [
      { name: "SaaS / IT-продукт", slug: "saas", price: "19 900", complexity: "complex", emoji: "⚙️", color: "from-indigo-600 to-violet-700" },
      { name: "NGO / Благодійний фонд", slug: "ngo", price: "4 900", complexity: "simple", emoji: "🤝", color: "from-emerald-500 to-teal-600" },
      { name: "HR / Рекрутинг", slug: "recruitment", price: "9 900", complexity: "medium", emoji: "👔", color: "from-blue-500 to-indigo-600" },
    ],
  },
  {
    group: "🌾 Виробництво та хенд-мейд",
    items: [
      { name: "Агро / Фермерська продукція", slug: "agriculture", price: "9 900", complexity: "medium", emoji: "🌿", color: "from-green-500 to-lime-600" },
      { name: "Хенд-мейд / Крафт", slug: "craft", price: "4 900", complexity: "simple", emoji: "🎨", color: "from-orange-400 to-amber-500" },
    ],
  },
  {
    group: "👶 Дитяча тематика",
    items: [
      { name: "Дитячий центр / Садок", slug: "kids-center", price: "9 900", complexity: "medium", emoji: "🎠", color: "from-yellow-400 to-orange-400" },
    ],
  },
];

const NICHES_EN = [
  {
    group: "🍽 Food & Hospitality",
    items: [
      { name: "Restaurant / Café", slug: "restaurant", price: "9 900", complexity: "medium", emoji: "🍽", color: "from-orange-400 to-red-500" },
      { name: "Food Delivery", slug: "food-delivery", price: "19 900", complexity: "complex", emoji: "🛵", color: "from-red-400 to-rose-600" },
      { name: "Bakery / Confectionery", slug: "bakery", price: "4 900", complexity: "simple", emoji: "🎂", color: "from-amber-400 to-orange-400" },
      { name: "Coffee Shop / Bar", slug: "coffee-bar", price: "9 900", complexity: "medium", emoji: "☕", color: "from-yellow-600 to-amber-700" },
    ],
  },
  {
    group: "💇 Beauty & Health",
    items: [
      { name: "Beauty Salon / Barbershop", slug: "beauty", price: "9 900", complexity: "medium", emoji: "✂️", color: "from-pink-400 to-rose-500" },
      { name: "Fitness Club / Trainer", slug: "fitness", price: "9 900", complexity: "medium", emoji: "💪", color: "from-emerald-400 to-teal-500" },
      { name: "Medical Clinic", slug: "medical", price: "19 900", complexity: "complex", emoji: "🏥", color: "from-blue-400 to-indigo-500" },
      { name: "SPA / Tattoo Studio", slug: "tattoo-spa", price: "9 900", complexity: "medium", emoji: "🧘", color: "from-violet-400 to-purple-600" },
      { name: "Pharmacy", slug: "pharmacy", price: "19 900", complexity: "complex", emoji: "💊", color: "from-green-400 to-emerald-600" },
      { name: "Veterinary Clinic", slug: "veterinary", price: "9 900", complexity: "medium", emoji: "🐾", color: "from-teal-400 to-cyan-600" },
    ],
  },
  {
    group: "🏗 Construction & Real Estate",
    items: [
      { name: "Construction / Renovation", slug: "construction", price: "9 900", complexity: "medium", emoji: "🏗", color: "from-yellow-500 to-amber-600" },
      { name: "Real Estate", slug: "realestate", price: "19 900", complexity: "complex", emoji: "🏠", color: "from-slate-500 to-slate-700" },
      { name: "Cleaning Service", slug: "cleaning", price: "4 900", complexity: "simple", emoji: "🧹", color: "from-sky-400 to-blue-500" },
    ],
  },
  {
    group: "📚 Education & Consulting",
    items: [
      { name: "Online Courses / LMS", slug: "education", price: "19 900", complexity: "complex", emoji: "🎓", color: "from-indigo-400 to-violet-600" },
      { name: "Legal Services", slug: "law", price: "9 900", complexity: "medium", emoji: "⚖️", color: "from-slate-600 to-neutral-700" },
      { name: "Accounting / Consulting", slug: "consulting", price: "9 900", complexity: "medium", emoji: "📊", color: "from-blue-500 to-indigo-600" },
      { name: "Psychologist / Coach", slug: "psychology", price: "4 900", complexity: "simple", emoji: "🧠", color: "from-purple-400 to-violet-500" },
    ],
  },
  {
    group: "🚗 Auto & Logistics",
    items: [
      { name: "Auto Service / Car Dealer", slug: "auto", price: "9 900", complexity: "medium", emoji: "🚗", color: "from-neutral-600 to-neutral-800" },
      { name: "Logistics / Transport", slug: "logistics", price: "9 900", complexity: "medium", emoji: "🚚", color: "from-amber-500 to-orange-600" },
    ],
  },
  {
    group: "🛒 E-commerce & Retail",
    items: [
      { name: "Clothing Store / Fashion", slug: "fashion", price: "19 900", complexity: "complex", emoji: "👗", color: "from-purple-400 to-violet-600" },
      { name: "Electronics Store", slug: "electronics", price: "19 900", complexity: "complex", emoji: "💻", color: "from-blue-600 to-indigo-700" },
      { name: "Furniture / Interior", slug: "furniture", price: "19 900", complexity: "complex", emoji: "🛋", color: "from-amber-600 to-brown-700" },
      { name: "Flower Shop", slug: "flowers", price: "4 900", complexity: "simple", emoji: "🌸", color: "from-pink-400 to-fuchsia-500" },
    ],
  },
  {
    group: "🎨 Creative & Entertainment",
    items: [
      { name: "Photographer / Videographer", slug: "photographer", price: "4 900", complexity: "simple", emoji: "📷", color: "from-neutral-700 to-neutral-900" },
      { name: "Event Agency", slug: "events", price: "9 900", complexity: "medium", emoji: "🎉", color: "from-fuchsia-500 to-pink-600" },
      { name: "Tourism / Hotel", slug: "travel", price: "19 900", complexity: "complex", emoji: "✈️", color: "from-sky-500 to-blue-600" },
      { name: "Quest / Entertainment", slug: "entertainment", price: "9 900", complexity: "medium", emoji: "🎮", color: "from-violet-500 to-indigo-700" },
    ],
  },
  {
    group: "💻 IT & Society",
    items: [
      { name: "SaaS / IT Product", slug: "saas", price: "19 900", complexity: "complex", emoji: "⚙️", color: "from-indigo-600 to-violet-700" },
      { name: "NGO / Charity", slug: "ngo", price: "4 900", complexity: "simple", emoji: "🤝", color: "from-emerald-500 to-teal-600" },
      { name: "HR / Recruitment", slug: "recruitment", price: "9 900", complexity: "medium", emoji: "👔", color: "from-blue-500 to-indigo-600" },
    ],
  },
  {
    group: "🌾 Production & Handmade",
    items: [
      { name: "Agriculture / Farm Products", slug: "agriculture", price: "9 900", complexity: "medium", emoji: "🌿", color: "from-green-500 to-lime-600" },
      { name: "Handmade / Craft", slug: "craft", price: "4 900", complexity: "simple", emoji: "🎨", color: "from-orange-400 to-amber-500" },
    ],
  },
  {
    group: "👶 Children's",
    items: [
      { name: "Children's Center / Daycare", slug: "kids-center", price: "9 900", complexity: "medium", emoji: "🎠", color: "from-yellow-400 to-orange-400" },
    ],
  },
];

const BENEFITS_UK = [
  { icon: Zap, title: "Запуск за 3 дні", desc: "Купуєте, надсилаєте контент — ми запускаємо." },
  { icon: DollarSign, title: "Прозора ціна", desc: "Фіксована вартість без прихованих доплат." },
  { icon: Star, title: "Awwwards-дизайн", desc: "Кожне рішення — преміальний дизайн." },
  { icon: ShieldCheck, title: "SEO в базі", desc: "Schema.org, Title, Description — все з коробки." },
  { icon: Headphones, title: "Підтримка 30 днів", desc: "Включена у будь-який пакет." },
  { icon: Eye, title: "Live Demo", desc: "Перегляньте кожне рішення перед покупкою." },
];

const BENEFITS_EN = [
  { icon: Zap, title: "Launch in 3 days", desc: "Purchase, send content — we launch." },
  { icon: DollarSign, title: "Transparent price", desc: "Fixed cost with no hidden fees." },
  { icon: Star, title: "Awwwards design", desc: "Every solution is premium design." },
  { icon: ShieldCheck, title: "SEO included", desc: "Schema.org, Title, Description — out of the box." },
  { icon: Headphones, title: "30-day support", desc: "Included in every package." },
  { icon: Eye, title: "Live Demo", desc: "Preview every solution before purchase." },
];

const HOW_IT_WORKS_UK = [
  { num: "01", title: "Оберіть нішу", desc: "Знайдіть готове рішення для вашого типу бізнесу." },
  { num: "02", title: "Надішліть контент", desc: "Тексти, фото та логотип — через зручний чеклист." },
  { num: "03", title: "Ми налаштовуємо", desc: "Підставляємо ваш контент, кольори та реквізити." },
  { num: "04", title: "Запуск!", desc: "Підключаємо домен та передаємо доступи." },
];

const HOW_IT_WORKS_EN = [
  { num: "01", title: "Choose a niche", desc: "Find a ready-made solution for your business type." },
  { num: "02", title: "Send content", desc: "Texts, photos, and logo — via a convenient checklist." },
  { num: "03", title: "We configure", desc: "We insert your content, colors, and details." },
  { num: "04", title: "Launch!", desc: "We connect the domain and hand over access." },
];

const FAQ_UK = [
  { q: "Що таке готові нішеві рішення?", a: "Це повноцінний сайт, розроблений під конкретну бізнес-нішу. Ви купуєте, ми налаштовуємо під вас і запускаємо." },
  { q: "Чим відрізняється від розробки з нуля?", a: "Готове рішення — у 3–5 разів дешевше та запускається за 3 дні замість 3–4 тижнів. Ідеально для старту." },
  { q: "Чи можна кастомізувати рішення?", a: "Так. Базова кастомізація включена — логотип, кольори, контент. Глибока кастомізація — за додатковою оплатою." },
  { q: "Що входить у підтримку 30 днів?", a: "Виправлення помилок, дрібні зміни контенту, консультації. Після закінчення — можна підключити тариф підтримки." },
];

const FAQ_EN = [
  { q: "What are ready-made niche solutions?", a: "It's a fully developed website built for a specific business niche. You purchase it, we customize it and launch." },
  { q: "How is it different from custom development?", a: "A ready-made solution is 3–5x cheaper and launches in 3 days instead of 3–4 weeks. Perfect for starting out." },
  { q: "Can the solution be customized?", a: "Yes. Basic customization is included — logo, colors, content. Deep customization is available for an extra fee." },
  { q: "What's included in 30-day support?", a: "Bug fixes, minor content changes, consultations. After that — you can subscribe to a support plan." },
];


const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Головна", item: "https://codeworth.uk" },
    { "@type": "ListItem", position: 2, name: "Маркетплейс" },
  ],
};

export default async function MarketplacePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isUk = lang === "uk";
  const NICHES = isUk ? NICHES_UK : NICHES_EN;
  const BENEFITS = isUk ? BENEFITS_UK : BENEFITS_EN;
  const HOW_IT_WORKS = isUk ? HOW_IT_WORKS_UK : HOW_IT_WORKS_EN;
  const FAQ = isUk ? FAQ_UK : FAQ_EN;
  const totalItems = NICHES.reduce((acc, g) => acc + g.items.length, 0);
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Маркетплейс готових сайтів для бізнесу",
    description: "Готові нішеві сайти для 35 типів бізнесу: ресторани, салони, клініки, магазини, юристи. Запуск за 3 дні.",
    url: "https://codeworth.uk/marketplace",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: NICHES.reduce((acc, g) => acc + g.items.length, 0),
      itemListElement: NICHES.flatMap((g) =>
        g.items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Product",
            name: `Сайт «${item.name}»`,
            url: `https://codeworth.uk/niches/${item.slug}`,
            offers: {
              "@type": "Offer",
              priceCurrency: "UAH",
              price: item.price.replace(/\s/g, ""),
              availability: "https://schema.org/InStock",
            },
          },
        }))
      ),
    },
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
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-20 bg-neutral-950 text-white relative overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-200 h-125 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <Container className="relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text content */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-sm font-medium text-indigo-300">
                  {isUk ? `✨ ${totalItems} готових рішень для ${NICHES.length} галузей` : `✨ ${totalItems} ready-made solutions for ${NICHES.length} industries`}
                </div>
                <h1 className="text-5xl lg:text-6xl font-heading font-extrabold text-white mb-6 leading-tight">
                  {isUk
                    ? <>{`Готові сайти для`}<br /><span className="gradient-text">{`вашого бізнесу`}</span></>
                    : <>{"Ready-made websites for"}<br /><span className="gradient-text">{"your business"}</span></>}
                </h1>
                <p className="text-xl text-neutral-300 leading-relaxed mb-10">
                  {isUk
                    ? "Купіть готовий сайт для вашої ніші. Запуск за 3 дні замість 3 тижнів. Дешевше у 5 разів."
                    : "Buy a ready-made website for your niche. Launch in 3 days instead of 3 weeks. 5x cheaper."}
                </p>
                <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
                  <a href="#catalog" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-linear-to-r from-indigo-600 to-indigo-500 text-white font-bold hover:from-indigo-500 hover:to-indigo-400 transition-all shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5">
                    {isUk ? "Переглянути каталог" : "Browse Catalog"}
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/20 text-white font-semibold hover:bg-white/10 transition-all">
                    {isUk ? "Підібрати рішення" : "Get Recommendation"}
                  </Link>
                </div>
              </div>

              {/* Hero illustration — niche emoji grid */}
              <div className="hidden lg:grid grid-cols-3 gap-3" aria-hidden="true">
                {[
                  { emoji: "🍽", name: isUk ? "Ресторан" : "Restaurant", color: "from-orange-400 to-red-500", price: isUk ? "9 900" : "$250" },
                  { emoji: "✂️", name: isUk ? "Салон краси" : "Beauty Salon", color: "from-pink-400 to-rose-500", price: isUk ? "9 900" : "$250" },
                  { emoji: "🚗", name: isUk ? "Автосервіс" : "Auto Service", color: "from-neutral-600 to-neutral-800", price: isUk ? "9 900" : "$250" },
                  { emoji: "🏥", name: isUk ? "Клініка" : "Clinic", color: "from-blue-400 to-indigo-500", price: isUk ? "19 900" : "$500" },
                  { emoji: "🎓", name: isUk ? "Навчання" : "Education", color: "from-indigo-400 to-violet-600", price: isUk ? "19 900" : "$500" },
                  { emoji: "🛒", name: isUk ? "Магазин" : "Store", color: "from-purple-400 to-violet-600", price: isUk ? "19 900" : "$500" },
                  { emoji: "🌿", name: isUk ? "Агро" : "Agriculture", color: "from-green-500 to-lime-600", price: isUk ? "9 900" : "$250" },
                  { emoji: "📷", name: isUk ? "Фотограф" : "Photographer", color: "from-neutral-700 to-neutral-900", price: isUk ? "4 900" : "$125" },
                  { emoji: "⚖️", name: isUk ? "Юристи" : "Lawyers", color: "from-slate-600 to-neutral-700", price: isUk ? "9 900" : "$250" },
                ].map((item, i) => (
                  <div
                    key={item.name}
                    className={`rounded-2xl p-4 bg-linear-to-br ${item.color} flex flex-col items-center gap-2 text-center
                      transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30
                      ${i === 4 ? "ring-2 ring-white/30 scale-105" : "opacity-80 hover:opacity-100"}`}
                  >
                    <span className="text-3xl">{item.emoji}</span>
                    <span className="text-white font-medium text-xs leading-tight">{item.name}</span>
                    <span className="text-white/70 text-[10px]">{isUk ? `від ${item.price} ₴` : `from ${item.price}`}</span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-white dark:bg-neutral-800 border-b border-neutral-100">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {BENEFITS.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.title} className="text-center p-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="font-heading font-bold text-neutral-900 dark:text-white text-sm mb-1">{b.title}</div>
                    <div className="text-xs text-neutral-400">{b.desc}</div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Catalog */}
        <section id="catalog" className="py-24 bg-white dark:bg-neutral-950">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-16">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                {isUk ? "Каталог" : "Catalog"}
              </p>
              <h2 className="text-4xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
                {isUk ? `${totalItems} рішень для ${NICHES.length} галузей` : `${totalItems} solutions for ${NICHES.length} industries`}
              </h2>
            </div>

            <NicheGrid niches={NICHES} />
          </Container>
        </section>

        {/* Extras cross-sell banner */}
        <section className="py-16 bg-linear-to-r from-violet-600 to-indigo-700">
          <Container>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-white">
                <p className="text-sm font-semibold text-violet-200 uppercase tracking-widest mb-2">
                  {isUk ? "Є готовий сайт?" : "Already have a site?"}
                </p>
                <h2 className="text-3xl font-heading font-extrabold mb-3">
                  {isUk ? "Доробки та модулі" : "Add-ons & Modules"}
                </h2>
                <p className="text-violet-100 max-w-md leading-relaxed">
                  {isUk
                    ? "Додайте окрему функцію, сторінку або інтеграцію до вашого сайту. 42+ готових модулі від 800 грн."
                    : "Add a feature, page, or integration to your website. 42+ ready-made modules from $20."}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {(isUk
                    ? ["📅 Онлайн-запис", "💳 Оплата онлайн", "🤖 Telegram-бот", "📊 Аналітика"]
                    : ["📅 Online Booking", "💳 Online Payment", "🤖 Telegram Bot", "📊 Analytics"]
                  ).map((item) => (
                    <span key={item} className="px-3 py-1 rounded-full bg-white/15 text-white text-xs font-medium border border-white/20">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href={`/${lang}/extras`}
                className="shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-indigo-700 font-bold text-base hover:bg-indigo-50 transition-colors shadow-xl shadow-indigo-900/20"
              >
                {isUk ? "Переглянути доробки" : "Browse Add-ons"}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </Container>
        </section>

        {/* How it works */}
        <section className="py-24 bg-neutral-50 dark:bg-neutral-900 ">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-16">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                {isUk ? "Процес" : "Process"}
              </p>
              <h2 className="text-4xl font-heading font-extrabold text-neutral-900">
                {isUk ? "Як це працює" : "How It Works"}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {HOW_IT_WORKS.map((step, i) => (
                <div key={step.num} className="relative p-6 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 text-center">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-600 to-indigo-800 text-white font-heading font-bold flex items-center justify-center mx-auto mb-4 shadow-md shadow-indigo-500/25">
                    {step.num}
                  </div>
                  <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-neutral-500">{step.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-white dark:bg-neutral-950">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-4xl font-heading font-extrabold text-neutral-900">FAQ</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {FAQ.map((item) => (
                <div key={item.q} className="p-6 rounded-2xl border border-neutral-100">
                  <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-2">{item.q}</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 bg-indigo-50 border-y border-indigo-100">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-heading font-bold text-neutral-900 dark:text-white mb-3">
                {isUk ? "Не знайшли підходящий варіант?" : "Didn't find the right fit?"}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                {isUk ? "Розробимо унікальний сайт під ваш бізнес з нуля." : "We'll build a unique website for your business from scratch."}
              </p>
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-linear-to-r from-indigo-600 to-indigo-700 text-white font-bold hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-lg shadow-indigo-500/25"
              >
                {isUk ? "Замовити індивідуальну розробку" : "Order Custom Development"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
