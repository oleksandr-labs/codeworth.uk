"use client";

import { useState } from "react";
import { Check, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

export function MultiStepFormDemo({ isUk }: Props) {
  const [step, setStep] = useState(0);
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const services = isUk
    ? [
        { id: "landing", label: "Лендінг / Презентаційна сторінка", icon: "🎯" },
        { id: "shop", label: "Інтернет-магазин", icon: "🛒" },
        { id: "corporate", label: "Корпоративний сайт", icon: "🏢" },
        { id: "app", label: "Веб-застосунок / SaaS", icon: "⚙️" },
        { id: "redesign", label: "Редизайн існуючого сайту", icon: "🔄" },
      ]
    : [
        { id: "landing", label: "Landing Page / Promo Site", icon: "🎯" },
        { id: "shop", label: "Online Store", icon: "🛒" },
        { id: "corporate", label: "Corporate Website", icon: "🏢" },
        { id: "app", label: "Web App / SaaS", icon: "⚙️" },
        { id: "redesign", label: "Website Redesign", icon: "🔄" },
      ];

  const budgets = isUk
    ? ["до 15 000 ₴", "15 000 – 35 000 ₴", "35 000 – 70 000 ₴", "70 000 ₴+"]
    : ["up to £600", "£600 – £1,500", "£1,500 – £3,000", "£3,000+"];

  const deadlines = isUk
    ? ["1–2 тижні (терміново)", "2–4 тижні", "1–2 місяці", "Без жорсткого дедлайну"]
    : ["1–2 weeks (urgent)", "2–4 weeks", "1–2 months", "No strict deadline"];

  const t = {
    step1: isUk ? "Тип проєкту" : "Project Type",
    step2: isUk ? "Деталі" : "Details",
    step3: isUk ? "Контакти" : "Contact Info",
    done: isUk ? "Відправлено" : "Sent",
    s1title: isUk ? "Який тип проєкту вас цікавить?" : "What type of project do you need?",
    s2title: isUk ? "Бюджет та терміни" : "Budget and timeline",
    s3title: isUk ? "Ваші контактні дані" : "Your contact details",
    budgetLabel: isUk ? "Орієнтовний бюджет" : "Approximate budget",
    deadlineLabel: isUk ? "Бажаний термін" : "Desired timeline",
    namePh: isUk ? "Ваше ім'я" : "Your name",
    phonePh: isUk ? "+380 XX XXX XX XX" : "+44 XXXX XXXXXX",
    emailPh: "hello@example.com",
    next: isUk ? "Далі →" : "Next →",
    back: isUk ? "← Назад" : "← Back",
    submit: isUk ? "Надіслати заявку" : "Submit Request",
    successTitle: isUk ? "Заявку отримано!" : "Request received!",
    successText: isUk
      ? "Дякуємо! Наш менеджер зв'яжеться з вами протягом 30 хвилин."
      : "Thank you! Our manager will contact you within 30 minutes.",
    successNote: isUk ? "Очікуйте дзвінок або email." : "Expect a call or email.",
    required: isUk ? "Обов'язкове поле" : "Required field",
    invalidEmail: isUk ? "Невірний email" : "Invalid email",
  };

  const steps = [t.step1, t.step2, t.step3, t.done];

  function validateStep2() {
    const e: Record<string, string> = {};
    if (!budget) e.budget = t.required;
    if (!deadline) e.deadline = t.required;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep3() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = t.required;
    if (!phone.trim()) e.phone = t.required;
    if (!email.trim()) e.email = t.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = t.invalidEmail;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (step === 0 && !service) return;
    if (step === 1 && !validateStep2()) return;
    if (step === 2) {
      if (!validateStep3()) return;
      setSubmitted(true);
      setStep(3);
      return;
    }
    setStep((s) => s + 1);
  }

  const pct = Math.round((step / 3) * 100);

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((label, i) => (
            <span key={i} className={`text-xs font-semibold ${i <= step ? "text-indigo-600" : "text-neutral-400"}`}>
              {i + 1}. {label}
            </span>
          ))}
        </div>
        <div className="h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Step 0 */}
      {step === 0 && (
        <div>
          <h2 className="text-xl font-heading font-extrabold text-neutral-900 dark:text-white mb-6">{t.s1title}</h2>
          <div className="space-y-2">
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => setService(s.id)}
                className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl border-2 text-left transition-all ${
                  service === s.id ? "border-indigo-500 bg-indigo-50" : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-indigo-300"
                }`}
              >
                <span className="text-xl">{s.icon}</span>
                <span className="font-semibold text-sm text-neutral-900 dark:text-white flex-1">{s.label}</span>
                {service === s.id && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!service}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t.next} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 1 */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-heading font-extrabold text-neutral-900 dark:text-white mb-6">{t.s2title}</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">{t.budgetLabel}</label>
              <div className="grid grid-cols-2 gap-2">
                {budgets.map((b) => (
                  <button
                    key={b}
                    onClick={() => { setBudget(b); setErrors((e) => ({ ...e, budget: "" })); }}
                    className={`px-3 py-2.5 rounded-xl border-2 text-xs font-semibold text-left transition-all ${
                      budget === b ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-indigo-300 text-neutral-700"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
              {errors.budget && <p className="text-xs text-red-500 mt-1">{errors.budget}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">{t.deadlineLabel}</label>
              <div className="grid grid-cols-2 gap-2">
                {deadlines.map((d) => (
                  <button
                    key={d}
                    onClick={() => { setDeadline(d); setErrors((e) => ({ ...e, deadline: "" })); }}
                    className={`px-3 py-2.5 rounded-xl border-2 text-xs font-semibold text-left transition-all ${
                      deadline === d ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-indigo-300 text-neutral-700"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              {errors.deadline && <p className="text-xs text-red-500 mt-1">{errors.deadline}</p>}
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep(0)} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 transition-colors">
              <ArrowLeft className="w-4 h-4" /> {t.back}
            </button>
            <button onClick={handleNext} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors">
              {t.next} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-heading font-extrabold text-neutral-900 dark:text-white mb-6">{t.s3title}</h2>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setErrors((er) => ({ ...er, name: "" })); }}
                placeholder={t.namePh}
                className={`w-full px-4 py-3 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.name ? "border-red-400" : "border-neutral-200"}`}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setErrors((er) => ({ ...er, phone: "" })); }}
                placeholder={t.phonePh}
                className={`w-full px-4 py-3 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.phone ? "border-red-400" : "border-neutral-200"}`}
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((er) => ({ ...er, email: "" })); }}
                placeholder={t.emailPh}
                className={`w-full px-4 py-3 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.email ? "border-red-400" : "border-neutral-200"}`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Summary */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-700 text-xs space-y-1.5">
              <p className="font-semibold text-neutral-600 dark:text-neutral-300 mb-2">{isUk ? "Ваш вибір:" : "Your selection:"}</p>
              <p className="text-neutral-700">🎯 {services.find((s) => s.id === service)?.label}</p>
              <p className="text-neutral-700">💰 {budget}</p>
              <p className="text-neutral-700">⏱ {deadline}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep(1)} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 transition-colors">
              <ArrowLeft className="w-4 h-4" /> {t.back}
            </button>
            <button onClick={handleNext} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors">
              {t.submit} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Success */}
      {step === 3 && submitted && (
        <div className="text-center py-8">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-heading font-extrabold text-neutral-900 dark:text-white mb-2">{t.successTitle}</h2>
          <p className="text-neutral-600 dark:text-neutral-300 mb-1">{t.successText}</p>
          <p className="text-sm text-neutral-400">{t.successNote}</p>
          <div className="mt-6 p-4 rounded-2xl bg-green-50 border border-green-100 text-xs text-left space-y-1.5">
            <p className="font-semibold text-green-700 mb-2">{isUk ? "Ваша заявка:" : "Your request:"}</p>
            <p className="text-neutral-700">👤 {name} · {phone} · {email}</p>
            <p className="text-neutral-700">🎯 {services.find((s) => s.id === service)?.label}</p>
            <p className="text-neutral-700">💰 {budget} · ⏱ {deadline}</p>
          </div>
          <button
            onClick={() => { setStep(0); setService(""); setBudget(""); setDeadline(""); setName(""); setPhone(""); setEmail(""); setSubmitted(false); }}
            className="mt-4 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:text-neutral-300 underline underline-offset-2 transition-colors"
          >
            {isUk ? "Заповнити ще раз" : "Fill again"}
          </button>
        </div>
      )}
    </div>
  );
}
