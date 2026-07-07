"use client";

import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle, AlertCircle, Loader2, Mail, Phone } from "lucide-react";
import { useLocale } from "@/components/layout/LocaleProvider";
import { analytics } from "@/lib/analytics";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { SERVICE_OPTIONS_UK, SERVICE_OPTIONS_EN, BUDGET_OPTIONS_UK, BUDGET_OPTIONS_EN } from "@/lib/contactOptions";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\d][\d\s()-]{6,}$/;

const MESSAGE_MAX = 1000;

function detectContactType(value: string): "email" | "phone" | null {
  const v = value.trim();
  if (!v) return null;
  if (EMAIL_RE.test(v)) return "email";
  if (PHONE_RE.test(v)) return "phone";
  return null;
}

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
  const defaultService = extraParam ? (isUk ? "AI-модуль / Готове рішення" : "AI Module / Ready Solution") : "";

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const { getToken } = useRecaptcha();

  const [nameValue, setNameValue] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [contactValue, setContactValue] = useState("");
  const [contactTouched, setContactTouched] = useState(false);
  const [messageValue, setMessageValue] = useState(defaultMessage);
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const nameValid = nameValue.trim().length >= 2;
  const contactType = detectContactType(contactValue);
  const contactValid = contactType !== null;
  const canSubmit = nameValid && contactValid && privacyChecked;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNameTouched(true);
    setContactTouched(true);
    if (!nameValid || !contactValid || !privacyChecked) return;
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
      setNameValue("");
      setNameTouched(false);
      setContactValue("");
      setContactTouched(false);
      setMessageValue("");
      setPrivacyChecked(false);
    } catch {
      setErrorMsg(isUk ? "Мережева помилка. Спробуйте ще раз або напишіть на hello@codeworth.uk чи в Telegram." : "Network error. Please try again, or email hello@codeworth.uk or message us on Telegram.");
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
        <h3 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white mb-2">
          {isUk ? "Заявку отримано!" : "Request received!"}
        </h3>
        <p className="text-neutral-500 dark:text-neutral-400 max-w-sm">
          {isUk
            ? "Зв'яжемося протягом 2 годин у робочий час (Пн–Пт 9:00–19:00)."
            : "We'll get in touch within 2 hours during business hours (Mon–Fri 9:00–19:00)."}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 px-5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 dark:bg-neutral-900 transition-colors"
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
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            {isUk ? "Ваше ім'я" : "Your name"} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              name="name"
              type="text"
              required
              minLength={2}
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              onBlur={() => setNameTouched(true)}
              placeholder={isUk ? "Іван Петренко" : "John Smith"}
              autoComplete="name"
              aria-invalid={nameTouched && !nameValid}
              className={`w-full px-4 py-3 pr-10 rounded-xl border bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-500 ${
                nameTouched && !nameValid
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-neutral-200 dark:border-neutral-700 focus:border-indigo-400 focus:ring-indigo-100 dark:focus:ring-indigo-900"
              }`}
            />
            {nameValid && (
              <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" aria-hidden="true" />
            )}
          </div>
          {nameTouched && !nameValid && (
            <p className="mt-1.5 text-xs text-red-600">
              {isUk ? "Ім'я має містити щонайменше 2 символи" : "Name must be at least 2 characters"}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            {isUk ? "Email або телефон" : "Email or phone"} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              name="contact"
              type="text"
              required
              value={contactValue}
              onChange={(e) => setContactValue(e.target.value)}
              onBlur={() => setContactTouched(true)}
              placeholder={isUk ? "hello@company.co.uk або +44..." : "hello@company.co.uk or +44..."}
              autoComplete="email"
              aria-invalid={contactTouched && !contactValid}
              className={`w-full px-4 py-3 pr-10 rounded-xl border bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-500 ${
                contactTouched && !contactValid
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-neutral-200 dark:border-neutral-700 focus:border-indigo-400 focus:ring-indigo-100 dark:focus:ring-indigo-900"
              }`}
            />
            {contactType === "email" && (
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" aria-hidden="true" />
            )}
            {contactType === "phone" && (
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" aria-hidden="true" />
            )}
          </div>
          {contactTouched && !contactValid && (
            <p className="mt-1.5 text-xs text-red-600">
              {isUk ? "Введіть коректний email або номер телефону" : "Enter a valid email or phone number"}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-service" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            {isUk ? "Тип послуги" : "Service type"}
          </label>
          <select
            id="contact-service"
            name="service"
            defaultValue={defaultService}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900"
          >
            <option value="">{isUk ? "Оберіть послугу" : "Select a service"}</option>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="contact-budget" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            {isUk ? "Бюджет проєкту" : "Project budget"}
          </label>
          <select
            id="contact-budget"
            name="budget"
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900"
          >
            <option value="">{isUk ? "Оберіть діапазон" : "Select a range"}</option>
            {BUDGET_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {isUk ? "Опис проєкту" : "Project description"}
          </label>
          <span className={`text-xs ${messageValue.length > MESSAGE_MAX ? "text-red-500" : "text-neutral-400 dark:text-neutral-500"}`}>
            {messageValue.length}/{MESSAGE_MAX}
          </span>
        </div>
        <textarea
          name="message"
          rows={5}
          maxLength={MESSAGE_MAX}
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
          placeholder={isUk ? "Розкажіть про ваш бізнес, задачу та побажання..." : "Tell us about your business, task, and requirements..."}
          className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-500 resize-none"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacy"
          name="privacy"
          required
          checked={privacyChecked}
          onChange={(e) => setPrivacyChecked(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
        />
        <label htmlFor="privacy" className="text-sm text-neutral-500 dark:text-neutral-400 cursor-pointer">
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

      {(nameTouched || contactTouched) && !canSubmit && (
        <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center -mb-1">
          {isUk
            ? "Заповніть ім'я, email/телефон і погодьтесь з політикою конфіденційності"
            : "Fill in your name, email/phone, and agree to the Privacy Policy"}
        </p>
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
