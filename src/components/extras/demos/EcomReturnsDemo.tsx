"use client";

import { useState } from "react";
import { Package, ChevronRight, Check, AlertCircle, Truck, RotateCcw } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const ORDERS = [
  { id: "ORD-2026-00184", date: "2026-04-22", total: 4290, items: [
    { id: "i1", nameEn: "Wool Coat Camel", nameUk: "Вовняне пальто Camel", emoji: "🧥", price: 4290, eligible: true },
  ]},
  { id: "ORD-2026-00179", date: "2026-04-18", total: 3580, items: [
    { id: "i2", nameEn: "Sneakers Urban Pro", nameUk: "Кросівки Urban Pro", emoji: "👟", price: 2890, eligible: true },
    { id: "i3", nameEn: "Sport Socks 3-pack", nameUk: "Шкарпетки 3 шт.", emoji: "🧦", price: 690, eligible: false },
  ]},
];

const REASONS = [
  { id: "size", labelEn: "Wrong size", labelUk: "Не підійшов розмір" },
  { id: "quality", labelEn: "Quality issue", labelUk: "Проблема з якістю" },
  { id: "different", labelEn: "Different from description", labelUk: "Відрізняється від опису" },
  { id: "damaged", labelEn: "Arrived damaged", labelUk: "Прибув пошкодженим" },
  { id: "changed-mind", labelEn: "Changed my mind", labelUk: "Передумав" },
];

type Stage = "select-order" | "select-items" | "reason" | "submitted";

export function EcomReturnsDemo({ isUk }: Props) {
  const [stage, setStage] = useState<Stage>("select-order");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [items, setItems] = useState<Set<string>>(new Set());
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");

  const order = ORDERS.find((o) => o.id === orderId);
  const fmt = (uah: number) => isUk ? `${uah.toLocaleString("uk-UA")} ₴` : `£${Math.round(uah / 40)}`;
  const totalRefund = order ? order.items.filter((i) => items.has(i.id)).reduce((s, i) => s + i.price, 0) : 0;

  const reset = () => {
    setStage("select-order");
    setOrderId(null);
    setItems(new Set());
    setReason("");
    setComment("");
  };

  return (
    <div className="space-y-6">
      {/* Stepper */}
      <div className="flex items-center justify-between">
        {["select-order", "select-items", "reason", "submitted"].map((s, i) => {
          const stages = ["select-order", "select-items", "reason", "submitted"];
          const currentIdx = stages.indexOf(stage);
          const done = i < currentIdx;
          const active = i === currentIdx;
          return (
            <div key={s} className="flex items-center flex-1 last:flex-initial">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                done ? "bg-emerald-500 text-white" : active ? "bg-indigo-600 text-white" : "bg-neutral-200 text-neutral-400"
              }`}>
                {done ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              {i < 3 && <div className={`flex-1 h-0.5 ${done ? "bg-emerald-500" : "bg-neutral-200"}`} />}
            </div>
          );
        })}
      </div>

      {stage === "select-order" && (
        <div className="space-y-3">
          <h3 className="font-bold text-neutral-900">{isUk ? "Оберіть замовлення" : "Select an order"}</h3>
          {ORDERS.map((o) => (
            <button
              key={o.id}
              onClick={() => { setOrderId(o.id); setStage("select-items"); }}
              className="w-full text-left p-4 rounded-xl border border-neutral-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all flex items-center gap-3"
            >
              <Package className="w-5 h-5 text-neutral-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-mono font-semibold text-neutral-900 text-sm">{o.id}</p>
                <p className="text-xs text-neutral-500">{o.date} · {o.items.length} {isUk ? "товар(ів)" : "item(s)"} · {fmt(o.total)}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-400" />
            </button>
          ))}
        </div>
      )}

      {stage === "select-items" && order && (
        <div className="space-y-4">
          <h3 className="font-bold text-neutral-900">{isUk ? "Що хочете повернути?" : "What do you want to return?"}</h3>
          <div className="space-y-2">
            {order.items.map((item) => {
              const checked = items.has(item.id);
              return (
                <label
                  key={item.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    !item.eligible ? "border-neutral-100 bg-neutral-50 cursor-not-allowed opacity-60" :
                    checked ? "border-indigo-300 bg-indigo-50/50" : "border-neutral-200 hover:bg-neutral-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                      const next = new Set(items);
                      if (checked) next.delete(item.id);
                      else next.add(item.id);
                      setItems(next);
                    }}
                    disabled={!item.eligible}
                    className="rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="text-2xl">{item.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-neutral-900 text-sm">{isUk ? item.nameUk : item.nameEn}</p>
                    {!item.eligible && (
                      <p className="text-xs text-rose-500 flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3 h-3" />
                        {isUk ? "Не підлягає поверненню (гігієна)" : "Not returnable (hygiene)"}
                      </p>
                    )}
                  </div>
                  <span className="text-sm font-semibold tabular-nums">{fmt(item.price)}</span>
                </label>
              );
            })}
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-neutral-100">
            <button onClick={() => setStage("select-order")} className="text-sm text-neutral-500 hover:text-neutral-900">
              ← {isUk ? "Назад" : "Back"}
            </button>
            <button
              onClick={() => setStage("reason")}
              disabled={items.size === 0}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed transition-colors"
            >
              {isUk ? `Далі — повернути ${fmt(totalRefund)}` : `Next — refund ${fmt(totalRefund)}`} →
            </button>
          </div>
        </div>
      )}

      {stage === "reason" && (
        <div className="space-y-4">
          <h3 className="font-bold text-neutral-900">{isUk ? "Причина повернення" : "Reason for return"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {REASONS.map((r) => (
              <label
                key={r.id}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  reason === r.id ? "border-indigo-500 bg-indigo-50" : "border-neutral-200 hover:bg-neutral-50"
                }`}
              >
                <input
                  type="radio"
                  name="reason"
                  value={r.id}
                  checked={reason === r.id}
                  onChange={(e) => setReason(e.target.value)}
                  className="border-neutral-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-neutral-900">{isUk ? r.labelUk : r.labelEn}</span>
              </label>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={isUk ? "Додатковий коментар (опціонально)" : "Additional comment (optional)"}
            rows={3}
            className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-sm resize-none"
            aria-label={isUk ? "Коментар" : "Comment"}
          />
          <div className="flex justify-between items-center pt-3 border-t border-neutral-100">
            <button onClick={() => setStage("select-items")} className="text-sm text-neutral-500 hover:text-neutral-900">
              ← {isUk ? "Назад" : "Back"}
            </button>
            <button
              onClick={() => setStage("submitted")}
              disabled={!reason}
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed transition-colors"
            >
              {isUk ? "Подати запит на повернення" : "Submit return request"}
            </button>
          </div>
        </div>
      )}

      {stage === "submitted" && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center">
            <Check className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900">
            {isUk ? "Заявку на повернення прийнято" : "Return request received"}
          </h3>
          <p className="text-sm text-neutral-600 max-w-md mx-auto">
            {isUk
              ? `RMA #RMA-2026-${Math.floor(Math.random() * 9000) + 1000}. Ми надішлемо інструкції на email протягом 24 годин.`
              : `RMA #RMA-2026-${Math.floor(Math.random() * 9000) + 1000}. We'll send shipping instructions to your email within 24 hours.`}
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-neutral-500">
            <div className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" />
              {isUk ? "Безкоштовна доставка" : "Free shipping"}
            </div>
            <div className="flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5" />
              {isUk ? "Повернення коштів за 5-7 днів" : "Refund in 5-7 days"}
            </div>
          </div>
          <button onClick={reset} className="mt-2 text-sm text-emerald-700 hover:underline">
            {isUk ? "Створити новий запит" : "Create new request"}
          </button>
        </div>
      )}

      <p className="text-sm text-neutral-500">
        {isUk
          ? "4-крокова RMA-форма: order → items → reason → submit. Status workflow в адмінці. Email-нотифікації."
          : "4-step RMA form: order → items → reason → submit. Status workflow in admin. Email notifications."}
      </p>
    </div>
  );
}
