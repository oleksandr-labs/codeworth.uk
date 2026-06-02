"use client";

import { useState } from "react";
import { useLocale } from "@/components/layout/LocaleProvider";

interface Props {
  variant?: "inline" | "compact";
  className?: string;
}

export function NewsletterForm({ variant = "inline", className = "" }: Props) {
  const isUk = useLocale() === "uk";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading" || status === "success") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? (isUk ? "Щось пішло не так" : "Something went wrong"));
      }
    } catch {
      setStatus("error");
      setErrorMsg(isUk ? "Помилка мережі. Спробуйте ще раз." : "Network error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div role="alert" aria-live="polite" className={`text-center py-3 ${className}`}>
        <div className="text-2xl mb-1">🎉</div>
        <p className="text-sm font-semibold text-indigo-700">{isUk ? "Дякуємо! Перевірте email." : "Thank you! Check your email."}</p>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className={className}>
        <label htmlFor="newsletter-email-compact" className="sr-only">
          {isUk ? "Ваш email для підписки" : "Your email for subscription"}
        </label>
        <input
          id="newsletter-email-compact"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          aria-describedby={errorMsg ? "newsletter-error-compact" : undefined}
          className="w-full px-3 py-2 rounded-lg border border-indigo-200 bg-white dark:bg-neutral-900 text-sm dark:text-white mb-2 focus:outline-none focus:border-indigo-400 dark:border-indigo-700 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
        />
        {errorMsg && (
          <p id="newsletter-error-compact" role="alert" aria-live="assertive" className="text-xs text-red-500 mb-2">
            {errorMsg}
          </p>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          aria-disabled={status === "loading"}
          aria-busy={status === "loading"}
          className="w-full py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-60"
        >
          <span aria-live="polite">{status === "loading" ? (isUk ? "Надсилаємо..." : "Sending...") : (isUk ? "Підписатися" : "Subscribe")}</span>
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 max-w-md mx-auto ${className}`}>
      <label htmlFor="newsletter-email-inline" className="sr-only">
        {isUk ? "Ваш email для підписки" : "Your email for subscription"}
      </label>
      <input
        id="newsletter-email-inline"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        aria-describedby={errorMsg ? "newsletter-error-inline" : undefined}
        className="flex-1 px-5 py-3 rounded-xl border border-indigo-200 bg-white text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-indigo-400 transition-colors"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        aria-disabled={status === "loading"}
        aria-busy={status === "loading"}
        className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-60"
      >
        <span aria-live="polite">{status === "loading" ? (isUk ? "Надсилаємо..." : "Sending...") : (isUk ? "Підписатися" : "Subscribe")}</span>
      </button>
      {errorMsg && (
        <p id="newsletter-error-inline" role="alert" aria-live="assertive" className="text-xs text-red-500 text-center w-full">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
