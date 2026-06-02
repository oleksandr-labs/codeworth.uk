import type { Metadata } from "next";
import Link from "next/link";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { REVIEWS, REVIEWS_AGGREGATE } from "@/lib/data/reviews";
import { ReviewsClient } from "@/components/reviews/ReviewsClient";
import { Star, ExternalLink, ArrowRight } from "lucide-react";

export async function generateStaticParams() {
  return [{ lang: "uk" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  const { averageRating, totalCount } = REVIEWS_AGGREGATE;
  const title = isUk
    ? `Відгуки про CodeNest — веб-студію, якій довіряють | ★${averageRating}/5`
    : `CodeNest Reviews — A Web Studio You Can Trust | ★${averageRating}/5`;
  const desc = isUk
    ? `Реальні відгуки ${totalCount}+ клієнтів CodeNest. Рейтинг ${averageRating}/5. Ресторани, клініки, магазини, SaaS — читайте реальні результати.`
    : `Real reviews from ${totalCount}+ CodeNest clients. Rating ${averageRating}/5. Restaurants, clinics, shops, SaaS — read real results.`;
  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      type: "website",
      url: `https://codeworth.uk/${lang}/reviews`,
      images: [{ url: "/og/reviews.png", width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, images: ["/og/reviews.png"] },
    alternates: buildAlternates(lang, "/reviews"),
  };
}

function StarRatingLg({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-6 h-6 ${s <= rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}`}
        />
      ))}
    </div>
  );
}

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isUk = lang === "uk";
  const { averageRating, totalCount, fiveStars, fourStars, threeStars } = REVIEWS_AGGREGATE;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isUk ? "Головна" : "Home", item: `https://codeworth.uk/${lang}` },
      { "@type": "ListItem", position: 2, name: isUk ? "Відгуки" : "Reviews" },
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CodeNest",
    url: "https://codeworth.uk",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating,
      reviewCount: totalCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: REVIEWS.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.authorName },
      datePublished: r.date,
      reviewBody: isUk ? r.text : r.textEn,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
      },
    })),
  };

  const ratingBars = [
    { stars: 5, count: fiveStars, pct: totalCount ? Math.round((fiveStars / totalCount) * 100) : 0 },
    { stars: 4, count: fourStars, pct: totalCount ? Math.round((fourStars / totalCount) * 100) : 0 },
    { stars: 3, count: threeStars, pct: totalCount ? Math.round((threeStars / totalCount) * 100) : 0 },
    { stars: 2, count: 0, pct: 0 },
    { stars: 1, count: 0, pct: 0 },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-linear-to-br from-amber-50 via-white to-orange-50 py-16 sm:py-20 border-b">
          <Container>
            <nav className="mb-6 text-sm text-gray-500">
              <Link href={`/${lang}`} className="hover:text-gray-900 transition-colors">
                {isUk ? "Головна" : "Home"}
              </Link>
              <span className="mx-2">›</span>
              <span className="text-gray-900">{isUk ? "Відгуки" : "Reviews"}</span>
            </nav>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  {isUk
                    ? "Відгуки клієнтів CodeNest — реальні проєкти та результати"
                    : "CodeNest Client Reviews — Real Projects & Results"}
                </h1>
                <p className="text-gray-600 text-lg mb-8">
                  {isUk
                    ? `${totalCount}+ компаній обрали CodeNest для розробки свого сайту. Ось що вони кажуть.`
                    : `${totalCount}+ companies chose CodeNest for their website development. Here's what they say.`}
                </p>
                {/* Big rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-6xl font-bold text-amber-500">{averageRating}</div>
                  <div>
                    <StarRatingLg rating={Math.round(averageRating)} />
                    <p className="text-sm text-gray-500 mt-1">
                      {isUk ? `з 5 — на основі ${totalCount} відгуків` : `out of 5 — based on ${totalCount} reviews`}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    { label: "Google Business", href: "https://g.page/r/codenest", color: "bg-white border border-gray-200 text-gray-700 hover:border-blue-400" },
                    { label: "Clutch", href: "https://clutch.co", color: "bg-white border border-gray-200 text-gray-700 hover:border-red-400" },
                    { label: "DOU", href: "https://dou.ua", color: "bg-white border border-gray-200 text-gray-700 hover:border-emerald-400" },
                  ].map(({ label, href, color }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${color}`}>
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      {label}
                      <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Rating breakdown */}
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h2 className="font-semibold text-gray-800 mb-4">
                  {isUk ? "Розподіл оцінок" : "Rating Breakdown"}
                </h2>
                <div className="space-y-2.5">
                  {ratingBars.map(({ stars, count, pct }) => (
                    <div key={stars} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-8 shrink-0">
                        <span className="text-sm text-gray-600">{stars}</span>
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      </div>
                      <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-amber-400 h-full rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="flex items-center gap-1.5 w-14 shrink-0">
                        <span className="text-sm text-gray-700 font-medium">{count}</span>
                        <span className="text-xs text-gray-400">{pct > 0 ? `${pct}%` : ""}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t">
                  <Link
                    href={`/${lang}/contact`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors text-sm"
                  >
                    {isUk ? "Стати нашим клієнтом" : "Become Our Client"}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Reviews grid with filters */}
        <ReviewsClient reviews={REVIEWS} lang={lang} isUk={isUk} />

        {/* How to leave a Google review */}
        <section className="py-16 bg-amber-50 border-t border-amber-100">
          <Container>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                {isUk
                  ? "Як залишити відгук у Google за 3 кроки"
                  : "How to Leave a Google Review in 3 Steps"}
              </h2>
              <p className="text-gray-500 text-center mb-10 text-sm">
                {isUk
                  ? "Займає 2 хвилини — і дуже допомагає іншим клієнтам нас знайти"
                  : "Takes 2 minutes — and really helps other clients find us"}
              </p>
              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                {(
                  isUk
                    ? [
                        {
                          step: 1,
                          title: "Перейдіть за посиланням",
                          desc: "Натисніть кнопку «Google відгук» нижче — ми відкриємо вашу Google-сторінку CodeNest.",
                        },
                        {
                          step: 2,
                          title: "Оберіть оцінку",
                          desc: "Виставте від 1 до 5 зірок. Ваша чесна оцінка важлива нам.",
                        },
                        {
                          step: 3,
                          title: "Напишіть пару слів",
                          desc: "Розкажіть про свій досвід: що сподобалось, який результат отримали.",
                        },
                      ]
                    : [
                        {
                          step: 1,
                          title: "Click the link",
                          desc: "Click the “Google Review” button below — we'll open CodeNest's Google page.",
                        },
                        {
                          step: 2,
                          title: "Choose a rating",
                          desc: "Give us 1 to 5 stars. Your honest opinion matters to us.",
                        },
                        {
                          step: 3,
                          title: "Write a few words",
                          desc: "Share your experience: what you liked and what results you got.",
                        },
                      ]
                ).map(({ step, title, desc }) => (
                  <div key={step} className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-amber-400 text-white font-bold text-lg flex items-center justify-center mb-4 shrink-0">
                      {step}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <a
                  href="https://g.page/r/codenest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold px-8 py-3 rounded-xl transition-colors"
                >
                  <Star className="w-5 h-5 fill-current" />
                  {isUk ? "Залишити відгук у Google" : "Leave a Google Review"}
                  <ExternalLink className="w-4 h-4" />
                </a>
                <p className="mt-3 text-xs text-gray-400">
                  {isUk
                    ? "Потрібен акаунт Google — увійдіть або зареєструйтесь безкоштовно"
                    : "A Google account is required — sign in or create one for free"}
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Leave a review */}
        <section className="py-16 bg-white border-t">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {isUk ? "Ви наш клієнт? Залиште відгук" : "Are You Our Client? Leave a Review"}
              </h2>
              <p className="text-gray-600 mb-8">
                {isUk
                  ? "Ваш відгук допомагає іншим власникам бізнесу обрати надійного партнера для розробки сайту."
                  : "Your review helps other business owners choose a reliable web development partner."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://g.page/r/codenest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-gray-800 border-2 border-gray-200 font-semibold px-6 py-3 rounded-xl hover:border-indigo-400 transition-colors"
                >
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  {isUk ? "Google відгук" : "Google Review"}
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  {isUk ? "Замовити сайт" : "Order a Website"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
