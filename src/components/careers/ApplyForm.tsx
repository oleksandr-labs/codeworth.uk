"use client";

import { useState, useRef } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface Props {
  positionTitle: string;
  positionSlug: string;
  lang: string;
  isUk: boolean;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClasses =
  "w-full rounded-xl px-4 py-2.5 text-sm border bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent transition";

export function ApplyForm({ positionTitle, lang, isUk }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const [nameValue, setNameValue] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const nameValid = nameValue.trim().length >= 2;
  const emailValid = EMAIL_RE.test(emailValue.trim());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNameTouched(true);
    setEmailTouched(true);
    if (!nameValid || !emailValid) return;
    setStatus("loading");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      position: positionTitle,
      portfolioUrl: (fd.get("portfolioUrl") as string) || undefined,
      coverLetter: fd.get("coverLetter") as string,
      website: fd.get("website") as string, // honeypot
      lang,
    };

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? (isUk ? "Щось пішло не так." : "Something went wrong."));
        setStatus("error");
      } else {
        setStatus("success");
        formRef.current?.reset();
      }
    } catch {
      setErrorMsg(isUk ? "Помилка мережі. Спробуйте пізніше." : "Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-2xl p-6 text-center">
        <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
        <h3 className="font-bold text-green-900 dark:text-green-300 text-lg mb-2">
          {isUk ? "Заявку надіслано!" : "Application Sent!"}
        </h3>
        <p className="text-green-700 dark:text-green-400 text-sm">
          {isUk
            ? "Дякуємо за інтерес! Ми розглянемо вашу заявку та напишемо протягом 2 робочих днів."
            : "Thank you for your interest! We'll review your application and get back to you within 2 business days."}
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Honeypot — hidden from real users */}
      <input type="text" name="website" className="hidden" aria-hidden="true" tabIndex={-1} />

      <div>
        <label htmlFor="apply-name" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
          {isUk ? "Ім'я та прізвище" : "Full Name"} <span className="text-red-500">*</span>
        </label>
        <input
          id="apply-name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={100}
          autoComplete="name"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          onBlur={() => setNameTouched(true)}
          aria-invalid={nameTouched && !nameValid}
          className={`${inputClasses} ${
            nameTouched && !nameValid
              ? "border-red-300 focus:ring-red-500"
              : "border-gray-300 dark:border-neutral-700 focus:ring-indigo-500"
          }`}
          placeholder={isUk ? "Олексій Коваленко" : "Alex Smith"}
        />
        {nameTouched && !nameValid && (
          <p className="mt-1 text-xs text-red-600">
            {isUk ? "Ім'я має містити щонайменше 2 символи" : "Name must be at least 2 characters"}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="apply-email" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="apply-email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          onBlur={() => setEmailTouched(true)}
          aria-invalid={emailTouched && !emailValid}
          className={`${inputClasses} ${
            emailTouched && !emailValid
              ? "border-red-300 focus:ring-red-500"
              : "border-gray-300 dark:border-neutral-700 focus:ring-indigo-500"
          }`}
          placeholder="you@example.com"
        />
        {emailTouched && !emailValid && (
          <p className="mt-1 text-xs text-red-600">
            {isUk ? "Введіть коректний email" : "Enter a valid email address"}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="apply-portfolio" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
          {isUk ? "Портфоліо / GitHub / LinkedIn" : "Portfolio / GitHub / LinkedIn"}
        </label>
        <input
          id="apply-portfolio"
          name="portfolioUrl"
          type="url"
          maxLength={500}
          className={`${inputClasses} border-gray-300 dark:border-neutral-700 focus:ring-indigo-500`}
          placeholder="https://github.com/username"
        />
      </div>

      <div>
        <label htmlFor="apply-cover" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
          {isUk ? "Про себе / Cover letter" : "About You / Cover Letter"}{" "}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          id="apply-cover"
          name="coverLetter"
          required
          minLength={20}
          maxLength={3000}
          rows={5}
          className={`${inputClasses} border-gray-300 dark:border-neutral-700 focus:ring-indigo-500 resize-none`}
          placeholder={
            isUk
              ? "Розкажіть про свій досвід, чому хочете приєднатися до Codeworth та що вас виділяє серед інших кандидатів..."
              : "Tell us about your experience, why you want to join Codeworth, and what sets you apart from other candidates..."
          }
        />
      </div>

      {status === "error" && (
        <div role="alert" aria-live="assertive" className="flex items-start gap-2 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <span className="text-sm text-red-700 dark:text-red-400">{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
        className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            {isUk ? "Надсилаємо..." : "Sending..."}
          </>
        ) : (
          <>
            <Send className="w-4 h-4" aria-hidden="true" />
            {isUk ? "Надіслати заявку" : "Submit Application"}
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 dark:text-neutral-500 text-center">
        {isUk
          ? "Надсилаючи заявку, ви погоджуєтесь з нашою Політикою конфіденційності."
          : "By submitting, you agree to our Privacy Policy."}
      </p>
    </form>
  );
}
