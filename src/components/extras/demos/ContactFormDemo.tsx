"use client";

import { useState } from "react";

interface Props {
  variant: string;
  isUk: boolean;
}

function ServiceContactForm({ isUk }: { isUk: boolean }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", service: "", budget: "", message: "" });

  if (sent) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📬</div>
        <h3 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
          {isUk ? "Заявку отримано!" : "Request received!"}
        </h3>
        <p className="text-neutral-500 dark:text-neutral-400 mb-6">
          {isUk ? "Менеджер зв'яжеться з вами протягом 2 годин." : "A manager will contact you within 2 hours."}
        </p>
        <button onClick={() => { setSent(false); setForm({ name: "", phone: "", service: "", budget: "", message: "" }); }}
          className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold">
          {isUk ? "Нова заявка" : "New request"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Форма зворотного зв'язку — B2B Сервіс" : "Contact Form — B2B Service"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk ? "Вибір послуги, бюджет, honeypot захист, Telegram-сповіщення." : "Service selector, budget, honeypot protection, Telegram notification."}
      </p>
      <div className="max-w-xl mx-auto bg-blue-50 rounded-3xl p-8">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-1.5">{isUk ? "Ім'я *" : "Name *"}</label>
              <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                type="text" placeholder={isUk ? "Ваше ім'я" : "Your name"}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white focus:border-blue-400 focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-1.5">{isUk ? "Телефон *" : "Phone *"}</label>
              <input value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                type="tel" placeholder="+38 (0__) ___-__-__"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white focus:border-blue-400 focus:outline-none text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-1.5">{isUk ? "Послуга" : "Service"}</label>
            <select value={form.service} onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white focus:border-blue-400 focus:outline-none text-sm">
              <option value="">{isUk ? "Оберіть послугу" : "Select service"}</option>
              <option>{isUk ? "Розробка сайту" : "Website Development"}</option>
              <option>{isUk ? "SEO просування" : "SEO Promotion"}</option>
              <option>{isUk ? "Підтримка сайту" : "Website Maintenance"}</option>
              <option>{isUk ? "Дизайн" : "Design"}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-1.5">{isUk ? "Бюджет" : "Budget"}</label>
            <select value={form.budget} onChange={(e) => setForm((p) => ({ ...p, budget: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white focus:border-blue-400 focus:outline-none text-sm">
              <option value="">{isUk ? "Оберіть діапазон" : "Select range"}</option>
              <option>{isUk ? "до 15 000 ₴" : "up to ₴15,000"}</option>
              <option>{isUk ? "15 000 – 50 000 ₴" : "₴15,000 – ₴50,000"}</option>
              <option>{isUk ? "50 000 – 150 000 ₴" : "₴50,000 – ₴150,000"}</option>
              <option>{isUk ? "150 000+ ₴" : "₴150,000+"}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-1.5">{isUk ? "Повідомлення" : "Message"}</label>
            <textarea value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
              rows={3} placeholder={isUk ? "Коротко про ваш проєкт..." : "Brief about your project..."}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white focus:border-blue-400 focus:outline-none text-sm resize-none" />
          </div>

          {/* Honeypot (hidden) */}
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="flex items-start gap-2">
            <input type="checkbox" className="mt-0.5 accent-blue-600 w-4 h-4" defaultChecked />
            <p className="text-xs text-neutral-500">
              {isUk ? "Погоджуюсь на обробку персональних даних відповідно до Політики конфіденційності." : "I agree to the processing of personal data per the Privacy Policy."}
            </p>
          </div>

          <button disabled={!form.name || !form.phone} onClick={() => setSent(true)}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {isUk ? "Надіслати заявку" : "Send request"}
          </button>

          <div className="flex items-center gap-2 justify-center">
            <span className="text-lg">✈️</span>
            <p className="text-xs text-neutral-400">{isUk ? "Ми отримаємо сповіщення у Telegram миттєво" : "We'll receive a Telegram notification instantly"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RealEstateForm({ isUk }: { isUk: boolean }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🏠</div>
        <h3 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
          {isUk ? "Заявку отримано!" : "Inquiry received!"}
        </h3>
        <p className="text-neutral-500">{isUk ? "Агент зв'яжеться з вами найближчим часом." : "An agent will contact you shortly."}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Форма запиту — Нерухомість" : "Inquiry Form — Real Estate"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk ? "Тип нерухомості, бюджет, площа, райони — мульти-вибір." : "Property type, budget, area, districts — multi-select."}
      </p>
      <div className="max-w-xl mx-auto bg-slate-50 rounded-3xl p-8">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-2">{isUk ? "Тип нерухомості" : "Property type"}</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: isUk ? "🏢 Квартира" : "🏢 Apartment" },
                { label: isUk ? "🏠 Будинок" : "🏠 House" },
                { label: isUk ? "🏪 Офіс" : "🏪 Office" },
                { label: isUk ? "🏗 Новобудова" : "🏗 New Build" },
              ].map(({ label }) => (
                <label key={label} className="flex items-center gap-2 p-3 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 cursor-pointer hover:border-blue-300">
                  <input type="checkbox" className="accent-blue-600 w-4 h-4" />
                  <span className="text-sm text-neutral-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-1.5">{isUk ? "Бюджет (₴)" : "Budget (UAH)"}</label>
              <select className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white focus:border-blue-400 focus:outline-none text-sm">
                <option>{isUk ? "до 2 млн" : "up to 2M"}</option>
                <option>{isUk ? "2–5 млн" : "2–5M"}</option>
                <option>{isUk ? "5–10 млн" : "5–10M"}</option>
                <option>{isUk ? "10+ млн" : "10M+"}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-1.5">{isUk ? "Площа (м²)" : "Area (m²)"}</label>
              <select className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white focus:border-blue-400 focus:outline-none text-sm">
                <option>до 50</option>
                <option>50–80</option>
                <option>80–120</option>
                <option>120+</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-2">{isUk ? "Бажані райони" : "Preferred districts"}</label>
            <div className="flex flex-wrap gap-2">
              {(isUk ? ["Шевченківський", "Печерський", "Подільський", "Голосіївський", "Оболонський"] : ["Shevchenkivsky", "Pechersky", "Podilsky", "Holosiivsky", "Obolon"]).map((d) => (
                <label key={d} className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-neutral-200 dark:border-neutral-700 cursor-pointer hover:border-blue-400 text-sm">
                  <input type="checkbox" className="accent-blue-600 w-3 h-3" />
                  {d}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder={isUk ? "Ваше ім'я" : "Your name"}
              className="px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white focus:border-blue-400 focus:outline-none text-sm" />
            <input type="tel" placeholder="+38 (0__) ___-__-__"
              className="px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white focus:border-blue-400 focus:outline-none text-sm" />
          </div>

          <button onClick={() => setSent(true)}
            className="w-full py-3 rounded-xl bg-slate-800 text-amber-400 font-semibold hover:bg-slate-900 transition-colors">
            {isUk ? "Надіслати запит агенту" : "Send request to agent"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ContactFormDemo({ variant, isUk }: Props) {
  if (variant === "real-estate-contact-form") return <RealEstateForm isUk={isUk} />;
  return <ServiceContactForm isUk={isUk} />;
}
