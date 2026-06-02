import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import { notFound } from "next/navigation";
import Link from "next/link";
import QRCode from "qrcode";
import {
  Check,
  Shield,
  Headphones,
  RefreshCw,
  ExternalLink,
  ArrowRight,
  Layers,
  ChevronDown,
  Clock,
  Star,
} from "lucide-react";
import { NICHES_DATA, getNicheLocalized, COMPLEXITY_LABELS_NICHE } from "@/lib/data/niches";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { StarRating } from "@/components/ui/StarRating";
import { Avatar } from "@/components/ui/Avatar";
import AddToCartSection from "./AddToCartSection";

export const revalidate = 600; // ISR: revalidate every 10 minutes

export async function generateStaticParams() {
  return NICHES_DATA.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const isUk = lang === "uk";
  const niche = getNicheLocalized(slug, lang);
  if (!niche) return {};

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: niche.title,
    description: niche.metaDescription,
    brand: { "@type": "Brand", name: "Codeworth" },
    offers: {
      "@type": "Offer",
      price: niche.priceFrom,
      priceCurrency: "UAH",
      availability: "https://schema.org/InStock",
      url: `https://codeworth.uk/marketplace/product/${niche.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "12",
    },
  };

  const ogTitle = isUk
    ? `${niche.title} — готовий сайт | Codeworth`
    : `${niche.title} — Ready Website | Codeworth`;
  const ogImage = `/og/niches/${slug}.png`;
  return {
    title: ogTitle,
    description: niche.metaDescription,
    keywords: niche.tags.join(", "),
    alternates: buildAlternates(lang, `marketplace/product/${slug}`),
    openGraph: {
      title: ogTitle,
      description: niche.metaDescription,
      type: "website",
      url: `https://codeworth.uk/${lang}/marketplace/product/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: niche.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: niche.metaDescription,
      images: [ogImage],
    },
    other: {
      "application/ld+json": JSON.stringify(productSchema),
    },
  };
}

function getPackages(isUk: boolean) {
  return [
    {
      name: isUk ? "Базовий" : "Basic",
      desc: isUk ? "Готовий дизайн з вашим контентом" : "Ready design with your content",
      multiplier: 1,
      features: isUk
        ? ["Готовий дизайн з адаптацією бренду", "До 5 сторінок сайту", "Базове SEO налаштування", "Мобільна адаптація", "1 місяць підтримки"]
        : ["Ready design with brand adaptation", "Up to 5 pages", "Basic SEO setup", "Mobile responsiveness", "1 month of support"],
      highlight: false,
    },
    {
      name: isUk ? "Розширений" : "Extended",
      desc: isUk ? "Повна кастомізація + додаткові функції" : "Full customization + extra features",
      multiplier: 1.7,
      features: isUk
        ? ["Все з Базового пакету", "До 10 сторінок + блог", "Розширене SEO + Schema.org", "Інтеграція Google Analytics", "Форма зворотного зв'язку", "3 місяці підтримки"]
        : ["Everything in Basic", "Up to 10 pages + blog", "Advanced SEO + Schema.org", "Google Analytics integration", "Contact form", "3 months of support"],
      highlight: true,
    },
    {
      name: isUk ? "Преміум" : "Premium",
      desc: isUk ? "Індивідуальна розробка під ваш бізнес" : "Custom development for your business",
      multiplier: 2.5,
      features: isUk
        ? ["Все з Розширеного пакету", "Необмежена кількість сторінок", "Онлайн-оплата або CRM-інтеграція", "Технічний SEO-аудит", "Навчання роботі з CMS", "6 місяців підтримки"]
        : ["Everything in Extended", "Unlimited pages", "Online payment or CRM integration", "Technical SEO audit", "CMS training", "6 months of support"],
      highlight: false,
    },
  ];
}

function getTrustBadges(isUk: boolean) {
  return [
    { icon: Shield, label: isUk ? "Безпечна оплата" : "Secure Payment", sub: "SSL + LiqPay" },
    { icon: RefreshCw, label: isUk ? "Повернення коштів" : "Money-Back", sub: isUk ? "протягом 14 днів" : "within 14 days" },
    { icon: Headphones, label: isUk ? "Підтримка 24/7" : "Support 24/7", sub: "Telegram / Email" },
    { icon: Star, label: isUk ? "Гарантія якості" : "Quality Guarantee", sub: isUk ? "100% задоволеність" : "100% satisfaction" },
  ];
}

function getFakeReviews(isUk: boolean) {
  return isUk
    ? [
        { name: "Олена Кравець", city: "Київ", text: "Сайт запустили за 12 днів. Все чисто, швидко і за бюджет. Замовники вже пишуть з сайту.", stars: 5 },
        { name: "Микола Бондар", city: "Львів", text: "Обрали розширений пакет — отримали більше ніж очікували. Менеджер весь час на зв'язку.", stars: 5 },
        { name: "Інна Сидоренко", city: "Харків", text: "Чудовий дизайн, швидкий сайт. Google вже індексує. Рекомендую Codeworth!", stars: 5 },
      ]
    : [
        { name: "Elena Kravets", city: "Kyiv", text: "The site launched in 12 days. Everything clean, fast, and on budget. Clients are already writing from the site.", stars: 5 },
        { name: "Mykola Bondar", city: "Lviv", text: "Chose the Extended package — got more than expected. The manager was always in touch.", stars: 5 },
        { name: "Inna Sydorenko", city: "Kharkiv", text: "Great design, fast website. Google is already indexing. I recommend Codeworth!", stars: 5 },
      ];
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const isUk = lang === "uk";
  const niche = getNicheLocalized(slug, lang);
  if (!niche) notFound();

  const PACKAGES = getPackages(isUk);
  const TRUST_BADGES = getTrustBadges(isUk);
  const FAKE_REVIEWS = getFakeReviews(isUk);

  const demoUrl = `https://codeworth.uk/${lang}/niches/${niche.slug}`;
  const qrSvg = await QRCode.toString(demoUrl, {
    type: "svg",
    margin: 1,
    color: { dark: "#ffffff", light: "#00000000" },
    width: 120,
  });

  const related = NICHES_DATA.filter(
    (n) => n.slug !== niche.slug && n.category === niche.category
  ).slice(0, 3);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Головна", item: "https://codeworth.uk" },
      { "@type": "ListItem", position: 2, name: "Маркетплейс", item: "https://codeworth.uk/marketplace" },
      { "@type": "ListItem", position: 3, name: "Каталог", item: "https://codeworth.uk/marketplace/catalog" },
      { "@type": "ListItem", position: 4, name: niche.title, item: `https://codeworth.uk/marketplace/product/${niche.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="bg-linear-to-br from-gray-950 to-gray-800 text-white py-16">
          <Container>
            <Breadcrumb
              className="text-white/60 mb-8 [&_a]:text-white/60 [&_a:hover]:text-white [&_span.text-gray-800]:text-white [&_svg]:text-white/40"
              items={[
                { label: isUk ? "Маркетплейс" : "Marketplace", href: `/${lang}/marketplace` },
                { label: isUk ? "Каталог" : "Catalog", href: `/${lang}/marketplace/catalog` },
                { label: niche.title },
              ]}
            />

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-4xl">{niche.emoji}</span>
                  <span className="text-sm text-white/60">{niche.category}</span>
                </div>
                <h1 className="text-4xl font-bold font-syne mb-4">{niche.title}</h1>
                <p className="text-white/70 text-lg mb-6 leading-relaxed">{niche.description}</p>

                {/* Stars */}
                <div className="mb-6">
                  <StarRating value={5} readonly size="md" showValue reviewCount={12} className="[&_svg]:text-amber-400 [&_svg]:fill-amber-400" />
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 text-sm">
                    <Clock className="w-4 h-4" /> {isUk ? `від ${niche.deliveryDays} днів` : `from ${niche.deliveryDays} days`}
                  </span>
                  <span className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 text-sm">
                    <Layers className="w-4 h-4" /> {COMPLEXITY_LABELS_NICHE[niche.complexity]}
                  </span>
                </div>

                <AddToCartSection niche={niche} />
              </div>

              {/* Preview card */}
              <div
                className={`rounded-2xl overflow-hidden bg-linear-to-br ${niche.gradient} aspect-[4/3] flex items-center justify-center relative`}
              >
                <span className="text-9xl drop-shadow-lg">{niche.emoji}</span>
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-white font-semibold">{niche.title}</div>
                    <div className="text-white/70 text-sm">codeworth.uk/niches/{niche.slug}</div>
                  </div>
                  <div
                    className="hidden md:flex flex-col items-center gap-1 shrink-0"
                    title={isUk ? "Скануй QR, щоб відкрити демо на телефоні" : "Scan QR to open demo on your phone"}
                  >
                    <div
                      className="w-18 h-18 p-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
                      dangerouslySetInnerHTML={{ __html: qrSvg }}
                    />
                    <span className="text-white/60 text-[10px]">{isUk ? "Демо на телефоні" : "Demo on phone"}</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Trust badges */}
        <section className="bg-white border-b border-gray-100">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
              {TRUST_BADGES.map((b) => (
                <div key={b.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                    <b.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{b.label}</div>
                    <div className="text-xs text-gray-500">{b.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Live Demo Preview */}
        <section className="py-12 bg-neutral-100 border-b border-neutral-200">
          <Container>
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-1">
                  {isUk ? "Жива демо-версія" : "Live Preview"}
                </p>
                <h2 className="text-xl font-bold text-neutral-900">
                  {isUk ? "Саме так виглядатиме ваш сайт" : "This is exactly what your site will look like"}
                </h2>
              </div>
              <Link
                href={`/${lang}/niches/${niche.slug}`}
                target="_blank"
                className="flex items-center gap-2 bg-white border border-neutral-200 text-neutral-700 px-4 py-2 rounded-xl text-sm font-medium hover:border-indigo-400 hover:text-indigo-600 transition-colors shadow-sm shrink-0"
              >
                <ExternalLink className="w-4 h-4" />
                {isUk ? "Відкрити повністю" : "Open Full Demo"}
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden border border-neutral-300 shadow-xl bg-white">
              <div className="bg-neutral-200 flex items-center gap-2 px-4 py-2.5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white rounded-lg px-3 py-1 text-xs text-neutral-400 text-center">
                  codeworth.uk/{lang}/niches/{niche.slug}
                </div>
                <Link
                  href={`/${lang}/niches/${niche.slug}`}
                  target="_blank"
                  className="text-neutral-400 hover:text-neutral-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
              <iframe
                src={`/${lang}/niches/${niche.slug}`}
                className="w-full"
                style={{ height: "600px", border: "none" }}
                title={isUk ? `Демо: ${niche.title}` : `Demo: ${niche.title}`}
                loading="lazy"
              />
            </div>
          </Container>
        </section>

        {/* Features + Tech */}
        <section className="py-16 bg-warm-50">
          <Container>
            <div className="grid md:grid-cols-2 gap-12">
              {/* Features */}
              <div>
                <h2 className="text-2xl font-bold font-syne text-gray-900 mb-6">
                  {isUk ? "Що включено" : "What's Included"}
                </h2>
                <ul className="space-y-3">
                  {niche.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-indigo-600" />
                      </div>
                      <span className="text-gray-700 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pages + Tech */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-3">{isUk ? "Сторінки сайту" : "Website Pages"}</h3>
                  <div className="flex flex-wrap gap-2">
                    {niche.pages.map((p) => (
                      <span key={p} className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-medium">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-3">{isUk ? "Технічний стек" : "Tech Stack"}</h3>
                  <div className="flex flex-wrap gap-2">
                    {niche.tech.map((t) => (
                      <span key={t} className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 border border-gray-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-3">{isUk ? "Процес роботи" : "Work Process"}</h3>
                  {(isUk
                    ? [
                        ["1", "Обговорення та бриф", "1-2 дні"],
                        ["2", "Дизайн та розробка", `${Math.round(niche.deliveryDays * 0.7)} дні`],
                        ["3", "Наповнення контентом", "2-3 дні"],
                        ["4", "Тестування та запуск", "1-2 дні"],
                      ]
                    : [
                        ["1", "Brief & Discussion", "1-2 days"],
                        ["2", "Design & Development", `${Math.round(niche.deliveryDays * 0.7)} days`],
                        ["3", "Content Population", "2-3 days"],
                        ["4", "Testing & Launch", "1-2 days"],
                      ]
                  ).map(([n, label, time]) => (
                    <div key={n} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                      <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {n}
                      </div>
                      <span className="text-sm text-gray-700 flex-1">{label}</span>
                      <span className="text-xs text-gray-400">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Packages */}
        <section className="py-16 bg-white">
          <Container>
            <h2 className="text-3xl font-bold font-syne text-gray-900 text-center mb-3">
              {isUk ? "Тарифні пакети" : "Pricing Packages"}
            </h2>
            <p className="text-gray-500 text-center mb-10">
              {isUk ? "Оберіть рівень, що відповідає вашим потребам та бюджету" : "Choose the tier that fits your needs and budget"}
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {PACKAGES.map((pkg) => {
                const price = Math.round((niche.priceFrom * pkg.multiplier) / 100) * 100;
                return (
                  <div
                    key={pkg.name}
                    className={`rounded-2xl p-6 border-2 relative ${
                      pkg.highlight
                        ? "border-indigo-600 bg-indigo-600 text-white shadow-xl shadow-indigo-100"
                        : "border-gray-100 bg-white"
                    }`}
                  >
                    {pkg.highlight && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-400 text-gray-900 text-xs font-bold rounded-full">
                        {isUk ? "Рекомендовано" : "Recommended"}
                      </div>
                    )}
                    <div className={`text-lg font-bold mb-1 ${pkg.highlight ? "text-white" : "text-gray-900"}`}>
                      {pkg.name}
                    </div>
                    <div className={`text-xs mb-5 ${pkg.highlight ? "text-white/70" : "text-gray-500"}`}>
                      {pkg.desc}
                    </div>
                    <div className={`text-3xl font-bold mb-6 ${pkg.highlight ? "text-white" : "text-gray-900"}`}>
                      {price.toLocaleString("uk-UA")} ₴
                    </div>
                    <ul className="space-y-2.5 mb-6">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.highlight ? "text-white" : "text-indigo-600"}`} />
                          <span className={`text-sm ${pkg.highlight ? "text-white/80" : "text-gray-600"}`}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      href={`/${lang}/contact`}
                      variant={pkg.highlight ? "secondary" : "outline"}
                      className="w-full justify-center"
                    >
                      {isUk ? "Замовити" : "Order"}
                    </Button>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Reviews */}
        <section className="py-16 bg-warm-50">
          <Container>
            <h2 className="text-2xl font-bold font-syne text-gray-900 mb-8">
              {isUk ? "Відгуки клієнтів" : "Client Reviews"}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {FAKE_REVIEWS.map((r) => (
                <div key={r.name} className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-gray-100 dark:border-neutral-800">
                  <StarRating value={r.stars} readonly size="sm" className="mb-4" />
                  <p className="text-gray-700 dark:text-neutral-300 text-sm mb-5 italic leading-relaxed">"{r.text}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar name={r.name} size="sm" />
                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">{r.name}</div>
                      <div className="text-xs text-gray-400 dark:text-neutral-500">{r.city}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <Container className="max-w-3xl">
            <h2 className="text-2xl font-bold font-syne text-gray-900 mb-8">
              {isUk ? "Питання та відповіді" : "FAQ"}
            </h2>
            <div className="space-y-3">
              {(isUk
                ? [
                    { q: "Чи можна змінити дизайн після запуску?", a: "Так, будь-які зміни можна внести — або самостійно через CMS, або замовити у нас." },
                    { q: "Чи включено хостинг у вартість?", a: "Базовий пакет не включає хостинг, але ми допоможемо вибрати та налаштувати. Розширений і Преміум включають перший рік хостингу." },
                    { q: "Скільки часу займе розробка?", a: `Від ${niche.deliveryDays} до ${niche.deliveryDays + 7} робочих днів залежно від обраного пакету та складності змін.` },
                    { q: "Чи можу я управляти контентом самостійно?", a: "Так. Ми підключаємо зручну CMS (Sanity або Strapi) і проводимо коротке навчання." },
                  ]
                : [
                    { q: "Can I change the design after launch?", a: "Yes, any changes can be made — either yourself via the CMS or by ordering from us." },
                    { q: "Is hosting included in the price?", a: "The Basic package does not include hosting, but we will help you choose and set it up. Extended and Premium include the first year of hosting." },
                    { q: "How long will development take?", a: `From ${niche.deliveryDays} to ${niche.deliveryDays + 7} business days depending on the package and complexity of changes.` },
                    { q: "Can I manage the content myself?", a: "Yes. We connect an easy CMS (Sanity or Strapi) and provide a brief training session." },
                  ]
              ).map((item) => (
                <details key={item.q} className="group border border-gray-100 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                    {item.q}
                    <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform shrink-0" />
                  </summary>
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </Container>
        </section>

        {/* Related products */}
        {related.length > 0 && (
          <section className="py-16 bg-warm-50">
            <Container>
              <h2 className="text-2xl font-bold font-syne text-gray-900 mb-8">
                {isUk ? "Схожі рішення" : "Similar Solutions"}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((n) => (
                  <Link
                    key={n.slug}
                    href={`/${lang}/marketplace/product/${n.slug}`}
                    className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-indigo-100 hover:shadow-md transition-all"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${n.gradient} flex items-center justify-center text-2xl mb-4`}>
                      {n.emoji}
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-1">
                      {n.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3">{n.subtitle}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{isUk ? `від ${n.priceFrom.toLocaleString("uk-UA")} ₴` : `from ${n.priceFrom.toLocaleString("en-US")} ₴`}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button href={`/${lang}/marketplace/catalog`} variant="outline">
                  {isUk ? "Усі рішення в каталозі" : "All Catalog Solutions"}
                </Button>
              </div>
            </Container>
          </section>
        )}

        {/* Final CTA */}
        <section className="py-16 bg-indigo-950 text-white">
          <Container className="text-center max-w-2xl">
            <h2 className="text-3xl font-bold font-syne mb-4">{isUk ? "Готові почати?" : "Ready to Start?"}</h2>
            <p className="text-white/70 mb-8">
              {isUk
                ? "Залиште заявку — наш менеджер зв'яжеться з вами протягом 30 хвилин."
                : "Leave a request — our manager will contact you within 30 minutes."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href={`/${lang}/contact`} variant="primary" size="lg">
                {isUk ? "Замовити зараз" : "Order Now"}
              </Button>
              <Button href={`/${lang}/marketplace/catalog`} variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                {isUk ? "Назад до каталогу" : "Back to Catalog"}
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
