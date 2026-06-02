"use client";

import { useEffect, useState } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [lang, setLang] = useState("uk");

  useEffect(() => {
    const seg = window.location.pathname.split("/");
    if (seg[1] === "en") setLang("en");
  }, []);

  const isUk = lang === "uk";

  useEffect(() => {
    console.error(error);
    fetch("/api/alert/critical", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: error.message,
        digest: error.digest,
        url: typeof window !== "undefined" ? window.location.href : undefined,
      }),
    }).catch(() => {});
  }, [error]);

  return (
    <html lang={lang}>
      <body className="min-h-screen flex flex-col items-center justify-center bg-white antialiased p-6">
        <div
          role="alert"
          aria-live="assertive"
          className="text-center max-w-md"
        >
          <div className="text-7xl mb-6 select-none" aria-hidden="true">⚠️</div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-3">
            {isUk ? "Критична помилка додатку" : "Critical application error"}
          </h1>
          <p className="text-neutral-500 mb-2">
            {isUk
              ? "Щось пішло не так на рівні програми. Спробуйте оновити сторінку."
              : "Something went wrong at the application level. Please try refreshing the page."}
          </p>
          {error.digest && (
            <p className="text-sm font-mono text-red-500 mb-8">
              Error ID: {error.digest}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
            >
              {isUk ? "Спробувати знову" : "Try again"}
            </button>
            <a
              href="/"
              className="px-6 py-3 border border-neutral-200 text-neutral-700 rounded-xl font-semibold hover:bg-neutral-50 transition-colors"
            >
              {isUk ? "На головну" : "Go home"}
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
