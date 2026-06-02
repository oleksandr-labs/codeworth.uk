"use client";

import { useState } from "react";
import { Printer, FileText, Download } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const TYPES = [
  { id: "invoice", labelEn: "Invoice", labelUk: "Рахунок-фактура", icon: FileText },
  { id: "case", labelEn: "Project Case", labelUk: "Кейс проєкту", icon: FileText },
  { id: "cv", labelEn: "CV / Resume", labelUk: "Резюме / CV", icon: FileText },
];

export function PrintPdfDemo({ isUk }: Props) {
  const [type, setType] = useState<"invoice" | "case" | "cv">("invoice");
  const [toast, setToast] = useState<string | null>(null);

  const handlePrint = () => {
    setToast(isUk ? "→ window.print() викликано (у демо без реального друку)" : "→ window.print() called (no actual print in demo)");
    setTimeout(() => setToast(null), 2500);
  };

  const handleDownload = () => {
    setToast(isUk ? "→ PDF згенеровано (jsPDF/Puppeteer на бекенді)" : "→ PDF generated (jsPDF/Puppeteer on backend)");
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {TYPES.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setType(t.id as typeof type)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                type === t.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-indigo-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {isUk ? t.labelUk : t.labelEn}
            </button>
          );
        })}
        <div className="ml-auto flex gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 dark:bg-neutral-900 transition-colors"
          >
            <Printer className="w-4 h-4" />
            {isUk ? "Друк" : "Print"}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            PDF
          </button>
        </div>
      </div>

      {toast && (
        <div
          role="status"
          className="px-4 py-2 rounded-lg bg-indigo-50 border border-indigo-200 text-sm text-indigo-700"
        >
          {toast}
        </div>
      )}

      {/* Preview */}
      <div className="rounded-2xl border-2 border-dashed border-neutral-300 bg-white dark:bg-neutral-800 p-8 max-w-2xl mx-auto print:border-0 print:p-0 print:max-w-none">
        {type === "invoice" && <InvoicePreview isUk={isUk} />}
        {type === "case" && <CasePreview isUk={isUk} />}
        {type === "cv" && <CVPreview isUk={isUk} />}
      </div>
    </div>
  );
}

function InvoicePreview({ isUk }: { isUk: boolean }) {
  return (
    <div className="space-y-5">
      <div className="flex justify-between border-b pb-4">
        <div>
          <h3 className="text-2xl font-bold text-neutral-900">{isUk ? "Рахунок-фактура №2026-001" : "Invoice #2026-001"}</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{isUk ? "Дата:" : "Date:"} 2026-05-04</p>
        </div>
        <div className="text-right">
          <div className="font-bold text-indigo-600">Codeworth</div>
          <div className="text-xs text-neutral-500">codeworth.uk</div>
        </div>
      </div>
      <table className="w-full text-sm">
        <thead className="text-neutral-500 dark:text-neutral-400 text-xs uppercase">
          <tr><th className="text-left pb-2">{isUk ? "Послуга" : "Service"}</th><th className="text-right pb-2">{isUk ? "Сума" : "Amount"}</th></tr>
        </thead>
        <tbody>
          <tr className="border-t"><td className="py-2">{isUk ? "Розробка лендінгу" : "Landing development"}</td><td className="text-right py-2">{isUk ? "₴25,000" : "£625"}</td></tr>
          <tr className="border-t"><td className="py-2">{isUk ? "SEO базовий" : "Basic SEO"}</td><td className="text-right py-2">{isUk ? "₴8,000" : "£200"}</td></tr>
          <tr className="border-t font-bold"><td className="py-3">{isUk ? "Разом" : "Total"}</td><td className="text-right py-3 text-indigo-600">{isUk ? "₴33,000" : "£825"}</td></tr>
        </tbody>
      </table>
    </div>
  );
}

function CasePreview({ isUk }: { isUk: boolean }) {
  return (
    <div className="space-y-3">
      <h3 className="text-2xl font-bold text-neutral-900">{isUk ? "Кейс: Сайт ресторану «Смачно»" : "Case: Restaurant «Smachno» Website"}</h3>
      <p className="text-sm text-neutral-500">{isUk ? "Категорія:" : "Category:"} HoReCa | 2024</p>
      <div className="grid grid-cols-3 gap-3 py-4 border-y">
        <div><div className="text-2xl font-bold text-indigo-600">+89%</div><div className="text-xs text-neutral-500">{isUk ? "Конверсія" : "Conversion"}</div></div>
        <div><div className="text-2xl font-bold text-emerald-600">98</div><div className="text-xs text-neutral-500">Lighthouse</div></div>
        <div><div className="text-2xl font-bold text-amber-600">14d</div><div className="text-xs text-neutral-500">Delivery</div></div>
      </div>
      <p className="text-sm leading-relaxed text-neutral-600">{isUk ? "Створили SSG-сайт з онлайн-бронюванням, інтеграцією з Telegram-ботом для замовлень..." : "Built SSG site with online booking, Telegram bot integration for orders..."}</p>
    </div>
  );
}

function CVPreview({ isUk }: { isUk: boolean }) {
  return (
    <div className="space-y-3">
      <div className="text-center pb-3 border-b">
        <h3 className="text-2xl font-bold text-neutral-900">Oleksiy Kovalenko</h3>
        <p className="text-sm text-neutral-500">{isUk ? "Lead Developer · Codeworth" : "Lead Developer · Codeworth"}</p>
      </div>
      <div>
        <h4 className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold mb-2">{isUk ? "Досвід" : "Experience"}</h4>
        <p className="text-sm leading-relaxed text-neutral-600">10+ years building Next.js / React apps. Specialises in SSG, performance, SEO architecture. 50+ shipped projects.</p>
      </div>
      <div>
        <h4 className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold mb-2">{isUk ? "Технології" : "Stack"}</h4>
        <p className="text-sm text-neutral-600">Next.js · React · TypeScript · Tailwind · Node.js · PostgreSQL · Prisma</p>
      </div>
    </div>
  );
}
