"use client";

import { useMemo, useState } from "react";
import { ShoppingCart, Plus, Minus, X, Check, Trash2 } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const PRODUCTS = [
  { id: "p1", nameEn: "Coffee Beans Espresso", nameUk: "Кавові зерна Espresso", price: 450, emoji: "☕", color: "from-amber-700 to-orange-800", category: "drinks" },
  { id: "p2", nameEn: "Organic Tea Selection", nameUk: "Органічна добірка чаю", price: 280, emoji: "🍵", color: "from-emerald-600 to-teal-700", category: "drinks" },
  { id: "p3", nameEn: "Artisan Chocolate", nameUk: "Авторський шоколад", price: 320, emoji: "🍫", color: "from-amber-900 to-rose-900", category: "sweets" },
  { id: "p4", nameEn: "Honey 500g", nameUk: "Мед 500г", price: 380, emoji: "🍯", color: "from-amber-500 to-yellow-600", category: "sweets" },
  { id: "p5", nameEn: "Granola Mix", nameUk: "Гранола міксована", price: 220, emoji: "🥣", color: "from-amber-600 to-orange-600", category: "snacks" },
  { id: "p6", nameEn: "Energy Bar Pack", nameUk: "Набір батончиків", price: 180, emoji: "🍫", color: "from-rose-600 to-pink-700", category: "snacks" },
];

const CATEGORIES = {
  all: { en: "All", uk: "Всі" },
  drinks: { en: "Drinks", uk: "Напої" },
  sweets: { en: "Sweets", uk: "Солодке" },
  snacks: { en: "Snacks", uk: "Снеки" },
};

type CartItem = { id: string; qty: number };
type Stage = "shop" | "cart" | "checkout" | "done";

export function MiniShopDemo({ isUk }: Props) {
  const [stage, setStage] = useState<Stage>("shop");
  const [filter, setFilter] = useState<keyof typeof CATEGORIES>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const visible = useMemo(
    () => PRODUCTS.filter((p) => filter === "all" || p.category === filter),
    [filter]
  );

  const addToCart = (id: string) => {
    setCart((c) => {
      const existing = c.find((i) => i.id === id);
      if (existing) return c.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { id, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart((c) =>
      c
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id: string) => setCart((c) => c.filter((i) => i.id !== id));

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => {
    const p = PRODUCTS.find((p) => p.id === i.id);
    return s + (p ? p.price * i.qty : 0);
  }, 0);

  const fmt = (uah: number) =>
    isUk ? `${uah.toLocaleString("uk-UA")} ₴` : `£${Math.ceil(uah / 40)}`;

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setStage("done");
  };

  const reset = () => {
    setStage("shop");
    setCart([]);
    setName("");
    setPhone("");
  };

  if (stage === "done") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-10 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center">
          <Check className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-neutral-900">
          {isUk ? "Замовлення прийнято!" : "Order placed!"}
        </h3>
        <p className="text-neutral-600">
          {isUk
            ? "Менеджер зв'яжеться з вами протягом 15 хвилин для підтвердження."
            : "A manager will contact you within 15 minutes to confirm."}
        </p>
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
        >
          {isUk ? "Нове замовлення" : "New order"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top bar with cart counter */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>).map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                k === filter
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-neutral-100 text-neutral-600 hover:bg-indigo-50"
              }`}
              aria-pressed={k === filter}
            >
              {isUk ? CATEGORIES[k].uk : CATEGORIES[k].en}
            </button>
          ))}
        </div>
        <button
          onClick={() => setStage(stage === "shop" ? "cart" : "shop")}
          className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          {stage === "cart" ? (isUk ? "Назад до каталогу" : "Back to shop") : (isUk ? "Кошик" : "Cart")}
          {totalItems > 0 && stage === "shop" && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-xs font-bold flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {stage === "shop" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {visible.map((p) => {
            const inCart = cart.find((i) => i.id === p.id);
            return (
              <div key={p.id} className="rounded-xl border border-neutral-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
                <div className={`h-28 bg-linear-to-br ${p.color} flex items-center justify-center text-5xl`}>
                  {p.emoji}
                </div>
                <div className="p-3 space-y-2">
                  <h3 className="font-semibold text-neutral-900 text-sm leading-tight">
                    {isUk ? p.nameUk : p.nameEn}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-700">{fmt(p.price)}</span>
                    {inCart ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQty(p.id, -1)}
                          className="w-7 h-7 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center"
                          aria-label={isUk ? "Зменшити" : "Decrease"}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-semibold w-6 text-center tabular-nums">{inCart.qty}</span>
                        <button
                          onClick={() => updateQty(p.id, 1)}
                          className="w-7 h-7 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center"
                          aria-label={isUk ? "Збільшити" : "Increase"}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(p.id)}
                        className="px-3 py-1 rounded-md bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors"
                      >
                        +
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {stage === "cart" && (
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-4">
          {cart.length === 0 ? (
            <p className="text-center py-8 text-neutral-500">
              {isUk ? "Кошик порожній" : "Cart is empty"}
            </p>
          ) : (
            <>
              <div className="space-y-2">
                {cart.map((item) => {
                  const p = PRODUCTS.find((p) => p.id === item.id);
                  if (!p) return null;
                  return (
                    <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50">
                      <div className={`w-12 h-12 rounded-md bg-linear-to-br ${p.color} flex items-center justify-center text-xl shrink-0`}>
                        {p.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-neutral-900 text-sm truncate">{isUk ? p.nameUk : p.nameEn}</div>
                        <div className="text-xs text-neutral-500">{fmt(p.price)} × {item.qty}</div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded bg-neutral-100 text-neutral-700 flex items-center justify-center" aria-label="−"><Minus className="w-3 h-3" /></button>
                        <span className="text-sm font-semibold w-5 text-center tabular-nums">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded bg-neutral-100 text-neutral-700 flex items-center justify-center" aria-label="+"><Plus className="w-3 h-3" /></button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-rose-400 hover:text-rose-600 p-1" aria-label={isUk ? "Видалити" : "Remove"}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                <span className="text-sm text-neutral-500">{isUk ? "Разом:" : "Total:"}</span>
                <span className="text-xl font-bold text-indigo-700">{fmt(totalPrice)}</span>
              </div>
              <button
                onClick={() => setStage("checkout")}
                className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
              >
                {isUk ? "Оформити замовлення" : "Checkout"}
              </button>
            </>
          )}
        </div>
      )}

      {stage === "checkout" && (
        <form onSubmit={placeOrder} className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-4">
          <h3 className="font-bold text-neutral-900">{isUk ? "Контактні дані" : "Contact details"}</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={isUk ? "Ваше ім'я" : "Your name"}
            required
            className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-sm"
            aria-label={isUk ? "Ім'я" : "Name"}
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+380 ..."
            required
            className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-sm"
            aria-label={isUk ? "Телефон" : "Phone"}
          />
          <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 text-sm">
            <span className="text-neutral-500">{isUk ? "До оплати:" : "Total:"}</span>
            <span className="font-bold text-indigo-700">{fmt(totalPrice)}</span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStage("cart")}
              className="px-4 py-2.5 rounded-lg border border-neutral-200 text-neutral-700 text-sm font-medium hover:bg-neutral-50 transition-colors"
            >
              {isUk ? "Назад" : "Back"}
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
            >
              {isUk ? "Підтвердити замовлення" : "Confirm order"}
            </button>
          </div>
        </form>
      )}

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Мінімальний e-commerce flow: каталог → кошик → checkout → підтвердження. Production: LiqPay/Stripe, Telegram-нотифікація."
          : "Minimal e-commerce flow: catalog → cart → checkout → confirmation. Production: LiqPay/Stripe, Telegram notification."}
      </p>
    </div>
  );
}
