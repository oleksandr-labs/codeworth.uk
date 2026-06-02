"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

interface Props {
  isUk: boolean;
}

type SchemaType = "Organization" | "LocalBusiness" | "Article" | "Product" | "FAQPage" | "Person";

const SCHEMA_TYPES: { id: SchemaType; label: string; labelEn: string; icon: string; desc: string; descEn: string }[] = [
  { id: "Organization", label: "Організація", labelEn: "Organization", icon: "🏢", desc: "Для компаній та брендів", descEn: "For companies and brands" },
  { id: "LocalBusiness", label: "Місцевий бізнес", labelEn: "Local Business", icon: "📍", desc: "Для локальних підприємств", descEn: "For local businesses" },
  { id: "Article", label: "Стаття / Блог", labelEn: "Article / Blog", icon: "📝", desc: "Для публікацій та новин", descEn: "For blog posts and news" },
  { id: "Product", label: "Товар / Послуга", labelEn: "Product / Service", icon: "🛍️", desc: "Для продуктів з цінами", descEn: "For products with prices" },
  { id: "FAQPage", label: "FAQ-сторінка", labelEn: "FAQ Page", icon: "❓", desc: "Для сторінок з питаннями", descEn: "For pages with Q&A" },
  { id: "Person", label: "Персона / Автор", labelEn: "Person / Author", icon: "👤", desc: "Для профілів та авторів", descEn: "For profiles and authors" },
];

function buildSchema(type: SchemaType, fields: Record<string, string>, faqItems: { q: string; a: string }[]) {
  const base = { "@context": "https://schema.org", "@type": type } as Record<string, unknown>;
  switch (type) {
    case "Organization":
      return { ...base, name: fields.name, url: fields.url, logo: fields.logo, description: fields.description, email: fields.email, telephone: fields.phone };
    case "LocalBusiness":
      return { ...base, name: fields.name, url: fields.url, telephone: fields.phone, email: fields.email, description: fields.description, address: { "@type": "PostalAddress", streetAddress: fields.street, addressLocality: fields.city, addressCountry: fields.country || "UA" }, openingHours: fields.hours };
    case "Article":
      return { ...base, headline: fields.title, description: fields.description, author: { "@type": "Person", name: fields.author }, datePublished: fields.datePublished, dateModified: fields.dateModified || fields.datePublished, url: fields.url, image: fields.image };
    case "Product":
      return { ...base, name: fields.name, description: fields.description, image: fields.image, offers: { "@type": "Offer", price: fields.price, priceCurrency: fields.currency || "UAH", availability: "https://schema.org/InStock", url: fields.url } };
    case "FAQPage":
      return { ...base, mainEntity: faqItems.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
    case "Person":
      return { ...base, name: fields.name, jobTitle: fields.jobTitle, url: fields.url, image: fields.image, description: fields.description, sameAs: fields.social ? fields.social.split(",").map((s) => s.trim()) : [] };
  }
}

export function SchemaGenerator({ isUk }: Props) {
  const [schemaType, setSchemaType] = useState<SchemaType | null>(null);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [faqItems, setFaqItems] = useState<{ q: string; a: string }[]>([{ q: "", a: "" }, { q: "", a: "" }]);
  const [copied, setCopied] = useState(false);

  const t = isUk
    ? {
        title: "Оберіть тип схеми",
        outputLabel: "Готовий JSON-LD код",
        copy: "Скопіювати", copied: "Скопійовано!",
        reset: "Скинути",
        addFaq: "+ Додати питання",
        faqQ: "Питання", faqA: "Відповідь",
        instruction: "Вставте цей код у <head> вашої сторінки як <script type=\"application/ld+json\">",
        fields: {
          Organization: [
            { key: "name", label: "Назва компанії", ph: "Codeworth" },
            { key: "url", label: "URL сайту", ph: "https://codeworth.uk" },
            { key: "email", label: "Email", ph: "hello@codeworth.uk" },
            { key: "phone", label: "Телефон", ph: "+380441234567" },
            { key: "logo", label: "URL логотипу", ph: "https://codeworth.uk/logo.png" },
            { key: "description", label: "Опис", ph: "Веб-студія повного циклу..." },
          ],
          LocalBusiness: [
            { key: "name", label: "Назва", ph: "Студія Codeworth" },
            { key: "url", label: "URL", ph: "https://codeworth.uk" },
            { key: "phone", label: "Телефон", ph: "+380441234567" },
            { key: "email", label: "Email", ph: "hello@codeworth.uk" },
            { key: "street", label: "Вулиця", ph: "вул. Хрещатик, 1" },
            { key: "city", label: "Місто", ph: "Київ" },
            { key: "country", label: "Країна (код)", ph: "UA" },
            { key: "hours", label: "Години роботи", ph: "Mo-Fr 09:00-18:00" },
            { key: "description", label: "Опис", ph: "Розробка сайтів та інтернет-маркетинг" },
          ],
          Article: [
            { key: "title", label: "Заголовок статті", ph: "Як вибрати веб-студію" },
            { key: "description", label: "Опис", ph: "Короткий опис статті..." },
            { key: "author", label: "Автор", ph: "Олексій Коваленко" },
            { key: "datePublished", label: "Дата публікації", ph: "2026-05-02" },
            { key: "dateModified", label: "Дата оновлення", ph: "2026-05-02" },
            { key: "url", label: "URL статті", ph: "https://codeworth.uk/blog/slug" },
            { key: "image", label: "URL зображення", ph: "https://codeworth.uk/og.jpg" },
          ],
          Product: [
            { key: "name", label: "Назва продукту", ph: "Розробка лендінгу" },
            { key: "description", label: "Опис", ph: "Лендінг з формою заявки..." },
            { key: "price", label: "Ціна", ph: "15000" },
            { key: "currency", label: "Валюта", ph: "UAH" },
            { key: "url", label: "URL продукту", ph: "https://codeworth.uk/services/landing" },
            { key: "image", label: "URL зображення", ph: "https://codeworth.uk/img/landing.jpg" },
          ],
          FAQPage: [],
          Person: [
            { key: "name", label: "Ім'я та прізвище", ph: "Олексій Коваленко" },
            { key: "jobTitle", label: "Посада", ph: "Lead Developer" },
            { key: "url", label: "URL профілю", ph: "https://codeworth.uk/team/oleksiy" },
            { key: "image", label: "URL фото", ph: "https://codeworth.uk/team/photo.jpg" },
            { key: "description", label: "Про себе", ph: "5 років у веб-розробці..." },
            { key: "social", label: "Соцмережі (через кому)", ph: "https://linkedin.com/in/oleksiy, https://github.com/oleksiy" },
          ],
        } as Record<SchemaType, { key: string; label: string; ph: string }[]>,
      }
    : {
        title: "Choose schema type",
        outputLabel: "Generated JSON-LD code",
        copy: "Copy", copied: "Copied!",
        reset: "Reset",
        addFaq: "+ Add Question",
        faqQ: "Question", faqA: "Answer",
        instruction: "Paste this code into your page's <head> as <script type=\"application/ld+json\">",
        fields: {
          Organization: [
            { key: "name", label: "Company name", ph: "Codeworth" },
            { key: "url", label: "Website URL", ph: "https://codeworth.uk" },
            { key: "email", label: "Email", ph: "hello@codeworth.uk" },
            { key: "phone", label: "Phone", ph: "+44 20 1234 5678" },
            { key: "logo", label: "Logo URL", ph: "https://codeworth.uk/logo.png" },
            { key: "description", label: "Description", ph: "Full-cycle web studio..." },
          ],
          LocalBusiness: [
            { key: "name", label: "Business name", ph: "Codeworth Studio" },
            { key: "url", label: "URL", ph: "https://codeworth.uk" },
            { key: "phone", label: "Phone", ph: "+44 20 1234 5678" },
            { key: "email", label: "Email", ph: "hello@codeworth.uk" },
            { key: "street", label: "Street address", ph: "123 High Street" },
            { key: "city", label: "City", ph: "London" },
            { key: "country", label: "Country code", ph: "GB" },
            { key: "hours", label: "Opening hours", ph: "Mo-Fr 09:00-18:00" },
            { key: "description", label: "Description", ph: "Web development and digital marketing" },
          ],
          Article: [
            { key: "title", label: "Article headline", ph: "How to choose a web agency" },
            { key: "description", label: "Description", ph: "Short excerpt..." },
            { key: "author", label: "Author name", ph: "Alex Kovalenko" },
            { key: "datePublished", label: "Published date", ph: "2026-05-02" },
            { key: "dateModified", label: "Modified date", ph: "2026-05-02" },
            { key: "url", label: "Article URL", ph: "https://codeworth.uk/blog/slug" },
            { key: "image", label: "Image URL", ph: "https://codeworth.uk/og.jpg" },
          ],
          Product: [
            { key: "name", label: "Product name", ph: "Landing Page Development" },
            { key: "description", label: "Description", ph: "Landing page with contact form..." },
            { key: "price", label: "Price", ph: "500" },
            { key: "currency", label: "Currency", ph: "GBP" },
            { key: "url", label: "Product URL", ph: "https://codeworth.uk/services/landing" },
            { key: "image", label: "Image URL", ph: "https://codeworth.uk/img/landing.jpg" },
          ],
          FAQPage: [],
          Person: [
            { key: "name", label: "Full name", ph: "Alex Kovalenko" },
            { key: "jobTitle", label: "Job title", ph: "Lead Developer" },
            { key: "url", label: "Profile URL", ph: "https://codeworth.uk/team/alex" },
            { key: "image", label: "Photo URL", ph: "https://codeworth.uk/team/photo.jpg" },
            { key: "description", label: "Bio", ph: "5 years in web development..." },
            { key: "social", label: "Social links (comma-separated)", ph: "https://linkedin.com/in/alex, https://github.com/alex" },
          ],
        } as Record<SchemaType, { key: string; label: string; ph: string }[]>,
      };

  const output = schemaType
    ? JSON.stringify(buildSchema(schemaType, fields, faqItems.filter((i) => i.q.trim())), null, 2)
    : "";

  function handleCopy() {
    if (!output) return;
    navigator.clipboard.writeText(`<script type="application/ld+json">\n${output}\n</script>`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleReset() {
    setSchemaType(null);
    setFields({});
    setFaqItems([{ q: "", a: "" }, { q: "", a: "" }]);
  }

  const fieldDefs = schemaType ? (t.fields[schemaType] ?? []) : [];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left: Config */}
      <div className="space-y-6">
        {/* Type selector */}
        <div>
          <p className="text-sm font-semibold text-neutral-700 mb-3">{t.title}</p>
          <div className="grid grid-cols-2 gap-2">
            {SCHEMA_TYPES.map((s) => (
              <button
                key={s.id}
                onClick={() => { setSchemaType(s.id); setFields({}); }}
                className={`flex items-center gap-2 p-3 rounded-xl border-2 text-left transition-all text-xs ${
                  schemaType === s.id
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-neutral-200 bg-white hover:border-indigo-300"
                }`}
              >
                <span className="text-lg">{s.icon}</span>
                <div>
                  <p className="font-semibold text-neutral-900">{isUk ? s.label : s.labelEn}</p>
                  <p className="text-neutral-400">{isUk ? s.desc : s.descEn}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Fields */}
        {schemaType && fieldDefs.length > 0 && (
          <div className="space-y-3">
            {fieldDefs.map((f) => (
              <div key={f.key}>
                <label className="block text-xs font-semibold text-neutral-600 mb-1">{f.label}</label>
                <input
                  type="text"
                  value={fields[f.key] ?? ""}
                  onChange={(e) => setFields((prev) => ({ ...prev, [f.key]: e.target.value }))}
                  placeholder={f.ph}
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            ))}
          </div>
        )}

        {/* FAQ items */}
        {schemaType === "FAQPage" && (
          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-neutral-200 space-y-2">
                <input
                  type="text"
                  value={item.q}
                  onChange={(e) => setFaqItems((prev) => prev.map((x, i) => i === idx ? { ...x, q: e.target.value } : x))}
                  placeholder={`${t.faqQ} ${idx + 1}`}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <textarea
                  value={item.a}
                  onChange={(e) => setFaqItems((prev) => prev.map((x, i) => i === idx ? { ...x, a: e.target.value } : x))}
                  placeholder={`${t.faqA} ${idx + 1}`}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                />
              </div>
            ))}
            <button
              onClick={() => setFaqItems((prev) => [...prev, { q: "", a: "" }])}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              {t.addFaq}
            </button>
          </div>
        )}
      </div>

      {/* Right: Output */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-neutral-700">{t.outputLabel}</label>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-neutral-200 text-neutral-600 hover:border-neutral-300 transition-colors"
            >
              <RefreshCw className="w-3 h-3" /> {t.reset}
            </button>
            <button
              onClick={handleCopy}
              disabled={!output}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? t.copied : t.copy}
            </button>
          </div>
        </div>
        <pre className="w-full min-h-72 h-auto p-4 rounded-xl bg-neutral-900 text-green-400 text-xs font-mono overflow-auto whitespace-pre-wrap break-all leading-relaxed">
          {output
            ? `<script type="application/ld+json">\n${output}\n</script>`
            : (isUk ? "// Оберіть тип схеми зліва..." : "// Select a schema type on the left...")}
        </pre>
        {output && (
          <p className="text-xs text-neutral-400 leading-relaxed">{t.instruction}</p>
        )}
      </div>
    </div>
  );
}
