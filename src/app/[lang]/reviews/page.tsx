import type { Metadata } from "next";
import Link from "next/link";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
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
  const title = isUk
    ? "Відгуки про Codeworth ML — залиште свій відгук"
    : "Codeworth ML Reviews — Leave Your Review";
  const desc = isUk
    ? "Ви наш ML-клієнт? Залиште відгук у Google або Clutch та допоможіть іншим знайти надійного ML-партнера."
    : "Are you our ML client? Leave a review on Google or Clutch and help others find a reliable ML partner.";
  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      type: "website",
      url: `https://codeworth.uk/${lang}/reviews`,
    },
    alternates: buildAlternates(lang, "/reviews"),
  };
}

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isUk = lang === "uk";

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-linear-to-br from-amber-50 via-white to-orange-50 py-16 sm:py-24 border-b">
          <Container>
            <nav className="mb-6 text-sm text-gray-500">
              <Link href={`/${lang}`} className="hover:text-gray-900 transition-colors">
                {isUk ? "Головна" : "Home"}
              </Link>
              <span className="mx-2">›</span>
              <span className="text-gray-900">{isUk ? "Відгуки" : "Reviews"}</span>
            </nav>
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {isUk
                  ? "Відгуки про Codeworth"
                  : "Codeworth Reviews"}
              </h1>
              <p className="text-gray-600 dark:text-neutral-300 text-lg">
                {isUk
                  ? "Ми тільки починаємо збирати відгуки від реальних клієнтів. Якщо ви вже співпрацювали з нами — будемо вдячні за ваш відгук."
                  : "We are just starting to collect reviews from real clients. If you have already worked with us — we would greatly appreciate your feedback."}
              </p>
            </div>
          </Container>
        </section>

        {/* How to leave a Google review */}
        <section className="py-16 bg-amber-50 border-t border-amber-100">
          <Container>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                {isUk
                  ? "Як залишити відгук у Google за 3 кроки"
                  : "How to Leave a Google Review in 3 Steps"}
              </h2>
              <p className="text-gray-500 dark:text-neutral-400 text-center mb-10 text-sm">
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
                          desc: "Натисніть кнопку «Google відгук» нижче — ми відкриємо вашу Google-сторінку Codeworth.",
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
                          desc: "Click the \"Google Review\" button below — we'll open Codeworth's Google page.",
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
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                    <p className="text-sm text-gray-600 dark:text-neutral-300 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <a
                  href="mailto:feedback@codeworth.uk"
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
        <section className="py-16 bg-white dark:bg-neutral-800 border-t">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {isUk ? "Ви наш клієнт? Залиште відгук" : "Are You Our Client? Leave a Review"}
              </h2>
              <p className="text-gray-600 dark:text-neutral-300 mb-8">
                {isUk
                  ? "Ваш відгук допомагає іншим власникам бізнесу обрати надійного ML/AI партнера."
                  : "Your review helps other business owners choose a reliable ML/AI partner."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:feedback@codeworth.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-gray-800 dark:text-neutral-200 border-2 border-gray-200 dark:border-neutral-700 font-semibold px-6 py-3 rounded-xl hover:border-indigo-400 transition-colors"
                >
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  {isUk ? "Google відгук" : "Google Review"}
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  {isUk ? "Замовити ML проєкт" : "Start ML Project"}
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
