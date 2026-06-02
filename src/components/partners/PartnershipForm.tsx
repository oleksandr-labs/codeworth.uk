"use client";

import { useState } from "react";
import { CheckCircle, Loader2, Send } from "lucide-react";

type PartnerType = "referral" | "agency" | "tech";

const TYPE_OPTIONS: { value: PartnerType; label: { uk: string; en: string }; description: { uk: string; en: string } }[] = [
  {
    value: "referral",
    label: { uk: "Реферальна програма", en: "Referral Program" },
    description: { uk: "15% від суми договору за кожного клієнта", en: "15% commission per referred client" },
  },
  {
    value: "agency",
    label: { uk: "Агентське партнерство", en: "Agency Partnership" },
    description: { uk: "Субпідряд та white-label розробка", en: "Subcontracting & white-label development" },
  },
  {
    value: "tech",
    label: { uk: "Технологічне партнерство", en: "Tech Partnership" },
    description: { uk: "Взаємна інтеграція та co-marketing", en: "Mutual integration & co-marketing" },
  },
];

export function PartnershipForm({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<PartnerType>("referral");
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const resp = await fetch("/api/partnership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, type, description, audience: audience || undefined, honeypot }),
      });
      const data = await resp.json() as { success?: boolean; error?: string };
      if (!resp.ok) {
        throw new Error(data.error ?? (isUk ? "Помилка надсилання" : "Submission error"));
      }
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : isUk
          ? "Невідома помилка"
          : "Unknown error"
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="w-7 h-7 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">
          {isUk ? "Заявку отримано!" : "Application received!"}
        </h3>
        <p className="text-gray-600 dark:text-neutral-300 max-w-sm">
          {isUk
            ? "Ми розглянемо вашу заявку та зв'яжемося протягом 2 робочих днів."
            : "We'll review your application and get back to you within 2 business days."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
        autoComplete="off"
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="partner-name" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1.5">
            {isUk ? "Ім'я та прізвище" : "Full Name"} <span className="text-red-500">*</span>
          </label>
          <input
            id="partner-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={isUk ? "Олена Коваль" : "Jane Smith"}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          />
        </div>
        <div>
          <label htmlFor="partner-email" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="partner-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      <div>
        <p className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
          {isUk ? "Тип партнерства" : "Partnership Type"} <span className="text-red-500">*</span>
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          {TYPE_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`relative flex flex-col gap-1 p-3 border-2 rounded-xl cursor-pointer transition-colors ${
                type === opt.value
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 dark:border-neutral-700 hover:border-indigo-300"
              }`}
            >
              <input
                type="radio"
                name="partnership-type"
                value={opt.value}
                checked={type === opt.value}
                onChange={() => setType(opt.value)}
                className="sr-only"
              />
              <span className="text-sm font-semibold text-gray-900">{opt.label[isUk ? "uk" : "en"]}</span>
              <span className="text-xs text-gray-500 dark:text-neutral-400 leading-snug">{opt.description[isUk ? "uk" : "en"]}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="partner-audience" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1.5">
          {isUk ? "Розмір аудиторії або клієнтської бази" : "Audience or client base size"}
          <span className="ml-1 text-gray-400 dark:text-neutral-500 text-xs">{isUk ? "(необов'язково)" : "(optional)"}</span>
        </label>
        <input
          id="partner-audience"
          type="text"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          placeholder={isUk ? "напр. 500+ підписників, 20 клієнтів/міс" : "e.g. 500+ followers, 20 clients/mo"}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
        />
      </div>

      <div>
        <label htmlFor="partner-description" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1.5">
          {isUk ? "Розкажіть про себе та свій бізнес" : "Tell us about yourself and your business"}{" "}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          id="partner-description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          minLength={20}
          placeholder={
            isUk
              ? "Хто ви, чим займаєтесь, чому хочете стати партнером Codeworth..."
              : "Who you are, what you do, why you want to partner with Codeworth..."
          }
          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm resize-none"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        aria-disabled={loading}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-7 py-3 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {isUk ? "Надсилаємо..." : "Sending..."}
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            {isUk ? "Надіслати заявку" : "Submit Application"}
          </>
        )}
      </button>
    </form>
  );
}
