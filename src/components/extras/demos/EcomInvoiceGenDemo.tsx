"use client";

import { useState } from "react";
import { FileText, Download, Mail, Printer, Eye, Code } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const TEMPLATES = [
  { id: "professional", labelEn: "Professional", labelUk: "Professional", color: "from-indigo-600 to-violet-600" },
  { id: "minimal", labelEn: "Minimal", labelUk: "Мінімал", color: "from-neutral-700 to-neutral-900" },
  { id: "corporate", labelEn: "Corporate", labelUk: "Corporate", color: "from-slate-600 to-blue-700" },
];

const INVOICE = {
  number: "INV-2026-00184",
  date: "2026-05-04",
  due: "2026-05-18",
  seller: {
    name: "Codeworth LLC",
    address: "Khreshchatyk 22, Kyiv 01001, Ukraine",
    vat: "UA 4567 8910",
    email: "billing@codeworth.uk",
  },
  client: {
    name: "FoodCo Restaurant Ltd",
    address: "10 Downing Street, London, UK",
    vat: "GB 123 4567",
    email: "ap@foodco.uk",
  },
  items: [
    { descEn: "Landing page development", descUk: "Розробка лендінгу", qty: 1, rate: 24990, amount: 24990 },
    { descEn: "Basic SEO setup", descUk: "Базовий SEO", qty: 1, rate: 8500, amount: 8500 },
    { descEn: "Monthly support (3 mo)", descUk: "Підтримка (3 міс)", qty: 3, rate: 2500, amount: 7500 },
  ],
};

export function EcomInvoiceGenDemo({ isUk }: Props) {
  const [template, setTemplate] = useState(TEMPLATES[0]);
  const [view, setView] = useState<"preview" | "html">("preview");
  const [downloaded, setDownloaded] = useState(false);
  const [sent, setSent] = useState(false);

  const subtotal = INVOICE.items.reduce((s, i) => s + i.amount, 0);
  const vat = Math.round(subtotal * 0.2);
  const total = subtotal + vat;
  const fmt = (uah: number) => isUk ? `${uah.toLocaleString("uk-UA")} ₴` : `£${Math.round(uah / 40)}`;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };
  const handleSend = () => {
    setSent(true);
    setTimeout(() => setSent(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-lg bg-neutral-100 p-1">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTemplate(t)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                template.id === t.id ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500"
              }`}
            >
              {isUk ? t.labelUk : t.labelEn}
            </button>
          ))}
        </div>
        <div className="flex gap-1 rounded-lg bg-neutral-100 p-1">
          <button
            onClick={() => setView("preview")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium ${
              view === "preview" ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            {isUk ? "Прев'ю" : "Preview"}
          </button>
          <button
            onClick={() => setView("html")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium ${
              view === "html" ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500"
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            HTML
          </button>
        </div>
      </div>

      {view === "preview" ? (
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 max-w-3xl mx-auto shadow-sm">
          {/* Header */}
          <div className={`-mx-8 -mt-8 mb-6 p-6 bg-linear-to-r ${template.color} text-white rounded-t-2xl`}>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">Codeworth</h2>
                <p className="text-xs text-white/80 mt-1">{INVOICE.seller.email}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest text-white/70">{isUk ? "Рахунок" : "Invoice"}</p>
                <p className="font-mono font-bold">{INVOICE.number}</p>
              </div>
            </div>
          </div>

          {/* Parties */}
          <div className="grid grid-cols-2 gap-6 mb-6 text-sm">
            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-500 mb-1">{isUk ? "Від" : "From"}</p>
              <p className="font-semibold text-neutral-900">{INVOICE.seller.name}</p>
              <p className="text-neutral-600">{INVOICE.seller.address}</p>
              <p className="text-xs text-neutral-500 mt-1">VAT: {INVOICE.seller.vat}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-500 mb-1">{isUk ? "Кому" : "To"}</p>
              <p className="font-semibold text-neutral-900">{INVOICE.client.name}</p>
              <p className="text-neutral-600">{INVOICE.client.address}</p>
              <p className="text-xs text-neutral-500 mt-1">VAT: {INVOICE.client.vat}</p>
            </div>
          </div>

          {/* Dates */}
          <div className="flex justify-between text-sm mb-6 pb-4 border-b border-neutral-100">
            <div>
              <span className="text-neutral-500">{isUk ? "Дата виставлення:" : "Issue date:"}</span>
              <span className="ml-2 font-semibold text-neutral-900">{INVOICE.date}</span>
            </div>
            <div>
              <span className="text-neutral-500">{isUk ? "Термін:" : "Due:"}</span>
              <span className="ml-2 font-semibold text-rose-600">{INVOICE.due}</span>
            </div>
          </div>

          {/* Items */}
          <table className="w-full text-sm mb-4">
            <thead>
              <tr className="border-b-2 border-neutral-200 text-xs uppercase tracking-wider text-neutral-500">
                <th className="text-left pb-2">{isUk ? "Опис" : "Description"}</th>
                <th className="text-right pb-2 w-12">{isUk ? "К-сть" : "Qty"}</th>
                <th className="text-right pb-2 w-24">{isUk ? "Ціна" : "Rate"}</th>
                <th className="text-right pb-2 w-24">{isUk ? "Сума" : "Amount"}</th>
              </tr>
            </thead>
            <tbody>
              {INVOICE.items.map((item, i) => (
                <tr key={i} className="border-b border-neutral-100">
                  <td className="py-3 text-neutral-700">{isUk ? item.descUk : item.descEn}</td>
                  <td className="py-3 text-right text-neutral-600 tabular-nums">{item.qty}</td>
                  <td className="py-3 text-right text-neutral-600 tabular-nums">{fmt(item.rate)}</td>
                  <td className="py-3 text-right font-semibold tabular-nums">{fmt(item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-72 space-y-1 text-sm">
              <div className="flex justify-between text-neutral-600">
                <span>{isUk ? "Сума" : "Subtotal"}</span>
                <span className="tabular-nums">{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>{isUk ? "ПДВ (20%)" : "VAT (20%)"}</span>
                <span className="tabular-nums">{fmt(vat)}</span>
              </div>
              <div className="flex justify-between pt-2 mt-2 border-t-2 border-neutral-900 text-base">
                <span className="font-bold">{isUk ? "Разом до сплати" : "Total due"}</span>
                <span className="font-bold tabular-nums">{fmt(total)}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-neutral-900 p-5 overflow-x-auto">
          <pre className="text-xs text-emerald-300 font-mono leading-relaxed">
            <span className="text-neutral-500">{`<!-- Generated via PDFKit / Puppeteer -->`}</span>{`\n`}
            <span className="text-violet-400">{`<html>`}</span>{`\n`}
            {`  `}<span className="text-violet-400">{`<head>`}</span>{`\n`}
            {`    `}<span className="text-violet-400">{`<title>`}</span>{`Invoice ${INVOICE.number}`}<span className="text-violet-400">{`</title>`}</span>{`\n`}
            {`  `}<span className="text-violet-400">{`</head>`}</span>{`\n`}
            {`  `}<span className="text-violet-400">{`<body>`}</span>{`\n`}
            {`    `}<span className="text-blue-300">{`/* Invoice payload */`}</span>{`\n`}
            {`    `}<span className="text-amber-300">number</span>{`:    `}<span className="text-green-300">{`"${INVOICE.number}"`}</span>{`\n`}
            {`    `}<span className="text-amber-300">date</span>{`:      `}<span className="text-green-300">{`"${INVOICE.date}"`}</span>{`\n`}
            {`    `}<span className="text-amber-300">due</span>{`:       `}<span className="text-green-300">{`"${INVOICE.due}"`}</span>{`\n`}
            {`    `}<span className="text-amber-300">items</span>{`:     `}<span className="text-yellow-300">{INVOICE.items.length}</span>{`\n`}
            {`    `}<span className="text-amber-300">subtotal</span>{`:  `}<span className="text-yellow-300">{subtotal.toLocaleString()}</span>{`\n`}
            {`    `}<span className="text-amber-300">vat</span>{`:       `}<span className="text-yellow-300">{vat.toLocaleString()}</span>{`\n`}
            {`    `}<span className="text-amber-300">total</span>{`:     `}<span className="text-yellow-300">{total.toLocaleString()}</span>{`\n`}
            {`  `}<span className="text-violet-400">{`</body>`}</span>{`\n`}
            <span className="text-violet-400">{`</html>`}</span>
          </pre>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={handleDownload}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
            downloaded ? "bg-emerald-600 text-white" : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          <Download className="w-4 h-4" />
          {downloaded ? (isUk ? "✓ Завантажено" : "✓ Downloaded") : (isUk ? "Завантажити PDF" : "Download PDF")}
        </button>
        <button
          onClick={handleSend}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm border transition-colors ${
            sent ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "border-neutral-200 text-neutral-700 hover:bg-neutral-50"
          }`}
        >
          <Mail className="w-4 h-4" />
          {sent ? (isUk ? "✓ Надіслано" : "✓ Sent") : (isUk ? "Надіслати на email" : "Send to email")}
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-200 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors">
          <Printer className="w-4 h-4" />
          {isUk ? "Друк" : "Print"}
        </button>
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Автоматична генерація PDF після замовлення. Production: PDFKit (Node), Puppeteer, або React-PDF. 3 шаблони, multi-currency, multi-language."
          : "Auto PDF generation post-order. Production: PDFKit (Node), Puppeteer, or React-PDF. 3 templates, multi-currency, multi-language."}
      </p>
    </div>
  );
}
