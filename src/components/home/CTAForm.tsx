"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { useLocale } from "@/components/layout/LocaleProvider";
import { SERVICE_OPTIONS_UK, SERVICE_OPTIONS_EN, BUDGET_OPTIONS_UK, BUDGET_OPTIONS_EN } from "@/lib/contactOptions";

const inputClasses =
  "px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all";
const selectClasses =
  "px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all [&>option]:text-neutral-900";

export function CTAForm({ expanded = false }: { expanded?: boolean }) {
  const lang = useLocale();
  const isUk = lang === "uk";
  const SERVICE_OPTIONS = isUk ? SERVICE_OPTIONS_UK : SERVICE_OPTIONS_EN;
  const BUDGET_OPTIONS = isUk ? BUDGET_OPTIONS_UK : BUDGET_OPTIONS_EN;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name") as string,
          contact: data.get("contact") as string,
          service: (data.get("service") as string) || (isUk ? "Безкоштовна консультація (CTA)" : "Free consultation (CTA)"),
          budget: (data.get("budget") as string) || undefined,
          message: (data.get("message") as string) || undefined,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="max-w-lg mx-auto mb-10 p-6 rounded-2xl bg-white/10 border border-white/20 text-center">
        <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
        <p className="text-white font-semibold">
          {isUk ? "Заявку отримано! Зв'яжемося протягом 24 годин." : "Request received! We'll get in touch within 24 hours."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={expanded ? "max-w-2xl mx-auto mb-10" : "max-w-lg mx-auto mb-10"}>
      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} aria-hidden="true" className="hidden" />
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          name="name"
          type="text"
          required
          minLength={2}
          placeholder={isUk ? "Ваше ім'я" : "Your name"}
          autoComplete="name"
          className={`flex-1 ${inputClasses}`}
        />
        <input
          name="contact"
          type="text"
          required
          placeholder={isUk ? "Телефон або Email" : "Phone or Email"}
          autoComplete="email"
          className={`flex-1 ${inputClasses}`}
        />
      </div>
      {expanded && (
        <>
          <div className="flex flex-col sm:flex-row gap-3 mt-3">
            <select name="service" defaultValue="" className={`flex-1 ${selectClasses}`}>
              <option value="" className="text-neutral-900">{isUk ? "Тип послуги" : "Service type"}</option>
              {SERVICE_OPTIONS.map((o) => (
                <option key={o} value={o} className="text-neutral-900">{o}</option>
              ))}
            </select>
            <select name="budget" defaultValue="" className={`flex-1 ${selectClasses}`}>
              <option value="" className="text-neutral-900">{isUk ? "Бюджет проєкту" : "Project budget"}</option>
              {BUDGET_OPTIONS.map((o) => (
                <option key={o} value={o} className="text-neutral-900">{o}</option>
              ))}
            </select>
          </div>
          <textarea
            name="message"
            rows={4}
            placeholder={isUk ? "Розкажіть про ваш бізнес, задачу та побажання..." : "Tell us about your business, task, and requirements..."}
            className={`w-full mt-3 resize-none ${inputClasses}`}
          />
        </>
      )}
      {status === "error" && (
        <p className="text-red-300 text-xs mt-2">
          {isUk ? "Помилка. Напишіть на hello@codeworth.uk або в Telegram." : "Error. Please email hello@codeworth.uk or message us on Telegram."}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-3 w-full px-8 py-4 rounded-xl bg-amber-400 text-neutral-900 dark:text-white font-bold hover:bg-amber-300 transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-amber-400/30 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {status === "loading" ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> {isUk ? "Відправляємо..." : "Sending..."}</>
        ) : (
          <>{isUk ? "Отримати безкоштовну консультацію" : "Get a free consultation"} <ArrowRight className="w-5 h-5" /></>
        )}
      </button>
      <p className="text-xs text-white/40 mt-3">
        {isUk ? "Натискаючи кнопку, ви погоджуєтеся з" : "By clicking the button, you agree to the"}{" "}
        <a href={`/${lang}/privacy`} className="underline hover:text-white/70">
          {isUk ? "Політикою конфіденційності" : "Privacy Policy"}
        </a>
      </p>
    </form>
  );
}
