"use client";

import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useLocale } from "@/components/layout/LocaleProvider";
import { analytics } from "@/lib/analytics";
import { useRecaptcha } from "@/hooks/useRecaptcha";

const SERVICE_OPTIONS_UK = [
  "Розробка сайту",
  "Інтернет-магазин",
  "Лендінг",
  "SEO-просування",
  "UI/UX Дизайн",
  "Маркетплейс (готове рішення)",
  "Доробка / Модуль",
  "Технічна підтримка",
  "Інше",
];

const SERVICE_OPTIONS_EN = [
  "Website Development",
  "E-commerce",
  "Landing Page",
  "SEO Promotion",
  "UI/UX Design",
  "Marketplace (ready solution)",
  "Add-on / Module",
  "Technical Support",
  "Other",
];

const BUDGET_OPTIONS_UK = [
  "До 10 000 грн",
  "10 000 – 30 000 грн",
  "30 000 – 80 000 грн",
  "80 000+ грн",
  "Поки не визначився",
];

const BUDGET_OPTIONS_EN = [
  "Up to ₴10,000",
  "₴10,000 – ₴30,000",
  "₴30,000 – ₴80,000",
  "₴80,000+",
  "Not decided yet",
];

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const lang = useLocale();
  const isUk = lang === "uk";
  const SERVICE_OPTIONS = isUk ? SERVICE_OPTIONS_UK : SERVICE_OPTIONS_EN;
  const BUDGET_OPTIONS = isUk ? BUDGET_OPTIONS_UK : BUDGET_OPTIONS_EN;

  const searchParams = useSearchParams();
  const subjectParam = searchParams.get("subject") ?? "";
  const extraParam = searchParams.get("extra") ?? "";

  const defaultMessage = extraParam
    ? `${isUk ? "Хочу замовити" : "I want to order"}: ${decodeURIComponent(subjectParam || extraParam)}\n\n`
    : "";
  const defaultService = extraParam ? (isUk ? "Доробка / Модуль" : "Add-on / Module") : "";

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const { getToken } = useRecaptcha();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const recaptchaToken = await getToken("contact");
    const payload = {
      name: formData.get("name") as string,
      contact: formData.get("contact") as string,
      service: formData.get("service") as string,
      budget: formData.get("budget") as string,
      message: formData.get("message") as string,
      website: formData.get("website") as string,
      ...(recaptchaToken ? { recaptchaToken } : {}),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? (isUk ? "Помилка відправки" : "Submission error"));
        setStatus("error");
        return;
      }
      analytics.leadFormSubmit(payload.service, payload.budget);
      setStatus("success");
      formRef.current?.reset();
    } catch {
      setErrorMsg(isUk ? "Мережева помилка. Спробуйте ще раз або напишіть у Telegram." : "Network error. Please try again or write to us on Telegram.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="alert"
        aria-live="polite"
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-heading font-bold text-neutral-900 mb-2">
          {isUk ? "Заявку отримано!" : "Request received!"}
        </h3>
        <p className="text-neutral-500 max-w-sm">
          {isUk
            ? "Зв'яжемося протягом 2 годин у робочий час (Пн–Пт 9:00–19:00)."
            : "We'll get in touch within 2 hours during business hours (Mon–Fri 9:00–19:00)."}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 px-5 py-2.5 rounded-xl border border-neutral-200 text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors"
        >
          {isUk ? "Відправити ще одну заявку" : "Send another request"}
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot — hidden from real users, traps bots */}
      <input type="text" name="website" tabIndex={-1} aria-hidden="true" className="hidden" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {isUk ? "Ваше ім'я" : "Your name"} <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            type="text"
            required
            minLength={2}
            placeholder={isUk ? "Іван Петренко" : "John Smith"}
            autoComplete="name"
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-neutral-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {isUk ? "Email або телефон" : "Email or phone"} <span className="text-red-500">*</span>
          </label>
          <input
            name="contact"
            type="text"
            required
            placeholder="hello@company.ua або +380..."
            autoComplete="email"
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-neutral-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-service" className="block text-sm font-medium text-neutral-700 mb-2">
            {isUk ? "Тип послуги" : "Service type"}
          </label>
          <select
            id="contact-service"
            name="service"
            defaultValue={defaultService}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all text-neutral-700 bg-white"
          >
            <option value="">{isUk ? "Оберіть послугу" : "Select a service"}</option>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="contact-budget" className="block text-sm font-medium text-neutral-700 mb-2">
            {isUk ? "Бюджет проєкту" : "Project budget"}
          </label>
          <select
            id="contact-budget"
            name="budget"
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all text-neutral-700 bg-white"
          >
            <option value="">{isUk ? "Оберіть діапазон" : "Select a range"}</option>
            {BUDGET_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          {isUk ? "Опис проєкту" : "Project description"}
        </label>
        <textarea
          name="message"
          rows={5}
          defaultValue={defaultMessage}
          placeholder={isUk ? "Розкажіть про ваш бізнес, задачу та побажання..." : "Tell us about your business, task, and requirements..."}
          className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-neutral-400 resize-none"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacy"
          name="privacy"
          required
          className="mt-1 w-4 h-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
        />
        <label htmlFor="privacy" className="text-sm text-neutral-500 cursor-pointer">
          {isUk ? "Я погоджуюсь з" : "I agree to the"}{" "}
          <a href={`/${lang}/privacy`} className="text-indigo-600 hover:underline">
            {isUk ? "Політикою конфіденційності" : "Privacy Policy"}
          </a>
        </label>
      </div>

      {status === "error" && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-center gap-2 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        aria-disabled={status === "loading"}
        aria-busy={status === "loading"}
        className="w-full py-4 rounded-xl bg-linear-to-r from-indigo-600 to-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            <span aria-live="polite">{isUk ? "Відправляємо..." : "Sending..."}</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            {isUk ? "Відправити заявку" : "Send request"}
          </>
        )}
      </button>
    </form>
  );
}
