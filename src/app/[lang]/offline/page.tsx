import type { Metadata } from "next";
import Link from "next/link";
import { ReloadButton } from "./ReloadButton";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk ? "Немає з'єднання | Codeworth" : "No Connection | Codeworth",
    robots: { index: false, follow: false },
  };
}

export default async function OfflinePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isUk = lang === "uk";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-[#FAFAF9]">
      <div className="text-6xl mb-6">📡</div>
      <h1 className="text-3xl font-bold font-syne text-gray-900 mb-3">
        {isUk ? "Немає з'єднання з мережею" : "No Internet Connection"}
      </h1>
      <p className="text-gray-500 max-w-md mb-8">
        {isUk
          ? "Схоже, ви офлайн. Перевірте з'єднання з інтернетом та спробуйте ще раз."
          : "It looks like you're offline. Check your internet connection and try again."}
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <ReloadButton label={isUk ? "Оновити сторінку" : "Refresh Page"} />
        <Link
          href={`/${lang}`}
          className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors"
        >
          {isUk ? "На головну" : "Go Home"}
        </Link>
      </div>
    </div>
  );
}
