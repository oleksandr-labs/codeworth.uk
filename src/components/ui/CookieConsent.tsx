"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, ChevronDown, ChevronUp } from "lucide-react";
import { useParams } from "next/navigation";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const COOKIE_KEY = "Codeworth_cookie_consent";

export default function CookieConsent() {
  const params = useParams();
  const lang = (params?.lang as string) ?? "en";
  const isUk = lang === "uk";
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_KEY);
    if (!saved) {
      // Delay appearance slightly
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const save = (preferences: CookiePreferences) => {
    localStorage.setItem(
      COOKIE_KEY,
      JSON.stringify({ ...preferences, savedAt: Date.now() })
    );
    setVisible(false);
    window.dispatchEvent(new Event("cookieConsentUpdate"));
  };

  const acceptAll = () => {
    save({ necessary: true, analytics: true, marketing: true });
  };

  const rejectAll = () => {
    save({ necessary: true, analytics: false, marketing: false });
  };

  const saveCustom = () => {
    save(prefs);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50 animate-in slide-in-from-bottom-4 duration-300"
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
              <Cookie className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 id="cookie-title" className="font-bold text-gray-900 text-sm">
                {isUk ? "Ми використовуємо cookies" : "We use cookies"}
              </h2>
              <p id="cookie-desc" className="text-xs text-gray-500 mt-0.5">
                {isUk ? "Для покращення вашого досвіду на сайті" : "To improve your experience on the site"}
              </p>
            </div>
          </div>
          <button
            onClick={rejectAll}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100 flex-shrink-0"
            aria-label={isUk ? "Відхилити всі та закрити" : "Reject all and close"}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 pb-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            {isUk
              ? "Ми використовуємо cookies для аналітики та покращення сайту."
              : "We use cookies for analytics and to improve the site."}{" "}
            <Link href={`/${lang}/privacy`} className="text-indigo-600 hover:underline">
              {isUk ? "Детальніше" : "Learn more"}
            </Link>
          </p>

          {/* Expandable settings */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-700 mt-3 font-medium transition-colors"
          >
            {isUk ? "Налаштувати" : "Customize"}
            {expanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          {expanded && (
            <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
              {/* Necessary */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    {isUk ? "Необхідні" : "Necessary"}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {isUk ? "Потрібні для роботи сайту" : "Required for the site to function"}
                  </div>
                </div>
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="sr-only"
                    id="cookie-necessary"
                  />
                  <label
                    htmlFor="cookie-necessary"
                    className="w-10 h-5 rounded-full bg-indigo-600 opacity-60 cursor-not-allowed flex items-center px-0.5"
                  >
                    <div className="w-4 h-4 bg-white rounded-full translate-x-5"></div>
                  </label>
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <label
                    htmlFor="cookie-analytics"
                    className="text-sm font-medium text-gray-800 cursor-pointer"
                  >
                    {isUk ? "Аналітика" : "Analytics"}
                  </label>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {isUk ? "Google Analytics, статистика відвідувань" : "Google Analytics, visit statistics"}
                  </div>
                </div>
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    id="cookie-analytics"
                    checked={prefs.analytics}
                    onChange={(e) =>
                      setPrefs((p) => ({ ...p, analytics: e.target.checked }))
                    }
                    className="sr-only"
                  />
                  <label
                    htmlFor="cookie-analytics"
                    className={`w-10 h-5 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${
                      prefs.analytics ? "bg-indigo-600" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        prefs.analytics ? "translate-x-5" : "translate-x-0"
                      }`}
                    ></div>
                  </label>
                </div>
              </div>

              {/* Marketing */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <label
                    htmlFor="cookie-marketing"
                    className="text-sm font-medium text-gray-800 cursor-pointer"
                  >
                    {isUk ? "Маркетинг" : "Marketing"}
                  </label>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {isUk ? "Персоналізована реклама, ретаргетинг" : "Personalized ads, retargeting"}
                  </div>
                </div>
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    id="cookie-marketing"
                    checked={prefs.marketing}
                    onChange={(e) =>
                      setPrefs((p) => ({ ...p, marketing: e.target.checked }))
                    }
                    className="sr-only"
                  />
                  <label
                    htmlFor="cookie-marketing"
                    className={`w-10 h-5 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${
                      prefs.marketing ? "bg-indigo-600" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        prefs.marketing ? "translate-x-5" : "translate-x-0"
                      }`}
                    ></div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-5 pb-5 flex gap-2">
          {expanded ? (
            <>
              <button
                onClick={saveCustom}
                className="flex-1 py-2.5 px-4 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors"
              >
                {isUk ? "Зберегти" : "Save"}
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 py-2.5 px-4 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
              >
                {isUk ? "Прийняти всі" : "Accept all"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={rejectAll}
                className="flex-1 py-2.5 px-4 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                {isUk ? "Відхилити" : "Reject"}
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 py-2.5 px-4 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors"
              >
                {isUk ? "Прийняти всі" : "Accept all"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
