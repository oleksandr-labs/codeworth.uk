"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { useLocale } from "@/components/layout/LocaleProvider";

export function CTAForm() {
  const lang = useLocale();
  const isUk = lang === "uk";
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
          service: isUk ? "Безкоштовна консультація (CTA)" : "Free consultation (CTA)",
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
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-10">
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
          className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
        />
        <input
          name="contact"
          type="text"
          required
          placeholder={isUk ? "Телефон або Email" : "Phone or Email"}
          autoComplete="email"
          className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
        />
      </div>
      {status === "error" && (
        <p className="text-red-300 text-xs mt-2">
          {isUk ? "Помилка. Напишіть нам у Telegram." : "Error. Please message us on Telegram."}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-3 w-full px-8 py-4 rounded-xl bg-amber-400 text-neutral-900 font-bold hover:bg-amber-300 transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-amber-400/30 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
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
