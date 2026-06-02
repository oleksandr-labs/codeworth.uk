"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { useLocale } from "@/components/layout/LocaleProvider";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const lang = useLocale();
  const isUk = lang === "uk";

  useEffect(() => {
    // Log to error tracking (e.g. Sentry)
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 flex items-center bg-white dark:bg-neutral-900">
        <Container className="py-24 text-center">
          <div role="alert" aria-live="assertive">
          <div className="text-8xl mb-8 select-none" aria-hidden="true">⚠️</div>
          <h1 className="text-3xl md:text-4xl font-bold font-syne text-gray-900 dark:text-white mb-4">
            {isUk ? "Щось пішло не так" : "Something went wrong"}
          </h1>
          <p className="text-gray-500 dark:text-neutral-400 text-lg max-w-md mx-auto mb-10">
            {isUk
              ? "Виникла несподівана помилка. Спробуйте оновити сторінку або поверніться на головну."
              : "An unexpected error occurred. Try refreshing the page or return to the homepage."}
          </p>
          {error.digest && (
            <div className="inline-block mb-8 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-sm font-mono">
              Error ID: {error.digest}
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
            >
              {isUk ? "Спробувати знову" : "Try Again"}
            </button>
            <Link
              href={`/${lang}`}
              className="px-6 py-3 border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 rounded-xl font-semibold hover:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-colors"
            >
              {isUk ? "На головну" : "Go Home"}
            </Link>
          </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
