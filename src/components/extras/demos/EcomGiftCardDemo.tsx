"use client";

import { useState } from "react";
import { Gift, Mail, Calendar, CreditCard, Sparkles } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const DESIGNS = [
  { id: "birthday", labelEn: "Birthday", labelUk: "День народження", gradient: "from-rose-400 via-pink-400 to-fuchsia-500", emoji: "🎂" },
  { id: "holiday", labelEn: "Holiday", labelUk: "Свято", gradient: "from-red-500 via-emerald-500 to-amber-400", emoji: "🎄" },
  { id: "love", labelEn: "Love", labelUk: "Love", gradient: "from-rose-500 to-red-600", emoji: "❤️" },
  { id: "minimal", labelEn: "Minimal", labelUk: "Мінімал", gradient: "from-neutral-700 to-neutral-900", emoji: "✨" },
];

const AMOUNTS = [500, 1000, 2000, 5000, 10000];

export function EcomGiftCardDemo({ isUk }: Props) {
  const [design, setDesign] = useState(DESIGNS[0]);
  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [sendDate, setSendDate] = useState("");

  const finalAmount = customAmount ? parseInt(customAmount, 10) || 0 : amount;
  const fmt = (uah: number) => isUk ? `${uah.toLocaleString("uk-UA")} ₴` : `£${Math.round(uah / 40)}`;
  const code = `GC-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configurator */}
        <div className="space-y-5">
          {/* Designs */}
          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              {isUk ? "Дизайн картки" : "Card design"}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {DESIGNS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDesign(d)}
                  className={`aspect-square rounded-xl bg-linear-to-br ${d.gradient} text-3xl flex items-center justify-center transition-all ${
                    design.id === d.id ? "ring-2 ring-indigo-500 ring-offset-2 scale-105" : "hover:scale-105"
                  }`}
                  aria-pressed={design.id === d.id}
                  aria-label={isUk ? d.labelUk : d.labelEn}
                >
                  {d.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              {isUk ? "Сума" : "Amount"}
            </label>
            <div className="grid grid-cols-5 gap-2 mb-2">
              {AMOUNTS.map((a) => (
                <button
                  key={a}
                  onClick={() => { setAmount(a); setCustomAmount(""); }}
                  className={`py-2 rounded-lg text-sm font-semibold transition-colors ${
                    !customAmount && amount === a
                      ? "bg-indigo-600 text-white"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {fmt(a)}
                </button>
              ))}
            </div>
            <input
              type="number"
              min={100}
              max={50000}
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder={isUk ? "Або введіть свою суму (₴)" : "Or enter custom amount (£)"}
              className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-sm"
              aria-label={isUk ? "Своя сума" : "Custom amount"}
            />
          </div>

          {/* Recipient */}
          <div>
            <label htmlFor="recipient-input" className="block text-sm font-semibold text-neutral-900 mb-2">
              <Mail className="w-3.5 h-3.5 inline mr-1" />
              {isUk ? "Email отримувача" : "Recipient email"}
            </label>
            <input
              id="recipient-input"
              type="email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="recipient@example.com"
              className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-sm"
            />
          </div>

          {/* Personal message */}
          <div>
            <label htmlFor="message-input" className="block text-sm font-semibold text-neutral-900 mb-2">
              {isUk ? "Особисте повідомлення" : "Personal message"}
            </label>
            <textarea
              id="message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={isUk ? "Щасливого Дня народження!" : "Happy birthday!"}
              maxLength={200}
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-sm resize-none"
            />
            <p className="text-xs text-neutral-400 mt-1">{message.length}/200</p>
          </div>

          {/* Send date */}
          <div>
            <label htmlFor="senddate-input" className="block text-sm font-semibold text-neutral-900 mb-2">
              <Calendar className="w-3.5 h-3.5 inline mr-1" />
              {isUk ? "Дата відправлення" : "Send date"}
            </label>
            <input
              id="senddate-input"
              type="date"
              value={sendDate}
              onChange={(e) => setSendDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-sm"
            />
          </div>

          <button
            disabled={!recipient || finalAmount <= 0}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:bg-neutral-200 disabled:text-neutral-400 transition-colors"
          >
            <CreditCard className="w-4 h-4" />
            {isUk ? `Купити за ${fmt(finalAmount)}` : `Buy for ${fmt(finalAmount)}`}
          </button>
        </div>

        {/* Card preview */}
        <div className="lg:sticky lg:top-4 space-y-3">
          <p className="text-sm font-semibold text-neutral-900">{isUk ? "Прев'ю картки" : "Card preview"}</p>
          <div className={`aspect-[1.6/1] rounded-2xl bg-linear-to-br ${design.gradient} text-white p-6 shadow-xl relative overflow-hidden`}>
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold">
              <Sparkles className="w-3 h-3" />
              {isUk ? "Gift Card" : "Gift Card"}
            </div>
            <div className="flex flex-col h-full">
              <div className="text-5xl mb-2">{design.emoji}</div>
              <div className="mt-auto">
                <p className="text-white/70 text-xs uppercase tracking-wider mb-1">{isUk ? "Номінал" : "Value"}</p>
                <p className="text-4xl font-extrabold mb-2 tabular-nums">{fmt(finalAmount || 0)}</p>
                <p className="text-white/80 text-xs">Codeworth Store</p>
                <p className="font-mono text-xs mt-1 text-white/70">{code}</p>
              </div>
            </div>
          </div>

          {message && (
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3">
              <p className="text-xs text-amber-700 uppercase tracking-wider mb-1">{isUk ? "Повідомлення" : "Message"}</p>
              <p className="text-sm text-neutral-700 italic">"{message}"</p>
            </div>
          )}

          {sendDate && (
            <div className="text-xs text-neutral-500 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {isUk ? "Буде надіслано:" : "Will be sent:"} {sendDate}
            </div>
          )}
        </div>
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Подарункові картки — додатковий revenue stream. Unique codes, баланс, термін дії, scheduled delivery, можна частково використати."
          : "Gift cards — additional revenue stream. Unique codes, balance, expiration, scheduled delivery, partial redemption."}
      </p>
    </div>
  );
}
