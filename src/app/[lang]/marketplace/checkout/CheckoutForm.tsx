"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Building2, CreditCard, CheckCircle, Shield, Lock, Loader2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useLocale } from "@/components/layout/LocaleProvider";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { analytics } from "@/lib/analytics";

export default function CheckoutForm() {
  const lang = useLocale();
  const isUk = lang === "uk";

  const STEPS = [
    { id: 1, label: isUk ? "Дані" : "Details", icon: User },
    { id: 2, label: isUk ? "Проєкт" : "Project", icon: Building2 },
    { id: 3, label: isUk ? "Оплата" : "Payment", icon: CreditCard },
    { id: 4, label: isUk ? "Готово" : "Done", icon: CheckCircle },
  ];

  // LiqPay is only available for Ukrainian hryvnia (UAH) payments
  const PAYMENT_METHODS = [
    { id: "card", label: isUk ? "Банківська картка" : "Bank Card", sub: "Visa, Mastercard" },
    ...(isUk ? [{ id: "liqpay", label: "LiqPay", sub: "Приват24, Monobank" }] : []),
    { id: "invoice", label: isUk ? "Рахунок (юр. особи)" : "Invoice (legal entities)", sub: isUk ? "Безготівкова оплата" : "Bank transfer (non-cash)" },
  ];
  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState("card");
  const [agreed, setAgreed] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [orderId, setOrderId] = useState("");

  const { items, subtotal, clearCart } = useCart();
  const { getToken } = useRecaptcha();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    businessName: "",
    domain: "",
    description: "",
    wishes: "",
  });

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const submitLiqPay = (liqPayData: { data: string; signature: string; checkoutUrl: string }) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = liqPayData.checkoutUrl;
    form.style.display = "none";

    const dataInput = document.createElement("input");
    dataInput.name = "data";
    dataInput.value = liqPayData.data;
    form.appendChild(dataInput);

    const sigInput = document.createElement("input");
    sigInput.name = "signature";
    sigInput.value = liqPayData.signature;
    form.appendChild(sigInput);

    document.body.appendChild(form);
    form.submit();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (step < 3) {
      setStep((s) => s + 1);
      return;
    }
    // Final step — submit order
    setLoading(true);
    try {
      const paymentLabel = PAYMENT_METHODS.find((m) => m.id === payment)?.label ?? payment;
      const recaptchaToken = await getToken("order");
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          paymentMethod: paymentLabel,
          items: items.map((item) => ({
            title: item.title,
            package: item.package,
            price: item.price,
          })),
          total: subtotal,
          ...(recaptchaToken ? { recaptchaToken } : {}),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? (isUk ? "Помилка оформлення. Спробуйте ще раз." : "Order failed. Please try again."));
        setLoading(false);
        return;
      }
      const createdOrderId: string = data.orderId ?? "";
      setOrderId(createdOrderId);
      analytics.marketplacePurchase(
        items.map((i) => i.slug).join(","),
        subtotal,
        isUk ? "UAH" : "GBP"
      );
      clearCart();

      // LiqPay — redirect to payment page
      if (payment === "liqpay" && subtotal > 0) {
        const description = items.map((i) => i.title).join(", ") || "CodeNest order";
        const liqRes = await fetch("/api/liqpay/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: subtotal,
            orderId: createdOrderId,
            description,
            email: form.email,
          }),
        });
        if (liqRes.ok) {
          const liqData = await liqRes.json();
          submitLiqPay(liqData);
          return; // redirect happening, no need to show done screen
        }
        // If LiqPay create fails — fall through to done screen
        setErrorMsg(isUk ? "LiqPay недоступний. Наш менеджер зв'яжеться з вами для оплати." : "LiqPay unavailable. Our manager will contact you for payment.");
      }

      setDone(true);
      setStep(4);
    } catch {
      setErrorMsg(isUk ? "Мережева помилка. Спробуйте ще раз або зв'яжіться з нами напряму." : "Network error. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold font-syne text-gray-900 mb-3">
          {isUk ? "Дякуємо за замовлення!" : "Thank you for your order!"}
        </h2>
        <p className="text-gray-600 mb-2">
          {isUk ? `Ваше замовлення ${orderId ? `#${orderId}` : ""} прийнято.` : `Your order ${orderId ? `#${orderId}` : ""} has been received.`}
        </p>
        <p className="text-gray-500 text-sm mb-8">
          {isUk
            ? <>Ми надіслали підтвердження на <strong>{form.email || "вашу пошту"}</strong>. Наш менеджер зв'яжеться з вами протягом 30 хвилин.</>
            : <>We sent a confirmation to <strong>{form.email || "your email"}</strong>. Our manager will contact you within 30 minutes.</>}
        </p>
        <div className="bg-indigo-50 rounded-2xl p-6 text-left mb-8 text-sm space-y-2">
          <div className="font-semibold text-gray-900 mb-3">{isUk ? "Що далі?" : "What's next?"}</div>
          {(isUk
            ? [
                "Очікуйте дзвінка або повідомлення від менеджера",
                "Обговоримо деталі та підтвердимо технічне завдання",
                "Ви отримаєте доступ до особистого кабінету",
                "Ми розпочнемо роботу над вашим сайтом",
              ]
            : [
                "Expect a call or message from our manager",
                "We'll discuss details and confirm the technical brief",
                "You'll receive access to your personal account",
                "We'll start working on your website",
              ]
          ).map((s, i) => (
            <div key={i} className="flex items-start gap-2 text-gray-600">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              {s}
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/${lang}/marketplace/catalog`}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium text-sm hover:bg-indigo-700 transition-colors"
          >
            {isUk ? "До каталогу" : "To Catalog"}
          </Link>
          <Link
            href={`/${lang}`}
            className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            {isUk ? "На головну" : "Home"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <div className="lg:col-span-2">
        {/* Step indicator */}
        <div className="flex items-center mb-8">
          {STEPS.slice(0, 3).map((s, idx) => (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => step > s.id && setStep(s.id)}
                className={`flex items-center gap-2 ${step > s.id ? "cursor-pointer" : "cursor-default"}`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    step === s.id
                      ? "bg-indigo-600 text-white"
                      : step > s.id
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step > s.id ? <CheckCircle className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
                </div>
                <span
                  className={`text-sm font-medium hidden sm:block ${
                    step === s.id ? "text-indigo-600" : step > s.id ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {s.label}
                </span>
              </button>
              {idx < 2 && (
                <div className={`flex-1 h-0.5 mx-3 ${step > s.id ? "bg-green-300" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          {/* Step 1: Personal data */}
          {step === 1 && (
            <>
              <h2 className="text-lg font-bold text-gray-900">{isUk ? "Особисті дані" : "Personal Details"}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label={isUk ? "Ім'я *" : "First Name *"} value={form.firstName} onChange={(v) => set("firstName", v)} placeholder={isUk ? "Олег" : "John"} required autoComplete="given-name" />
                <Field label={isUk ? "Прізвище *" : "Last Name *"} value={form.lastName} onChange={(v) => set("lastName", v)} placeholder={isUk ? "Коваленко" : "Smith"} required autoComplete="family-name" />
              </div>
              <Field label="Email *" type="email" value={form.email} onChange={(v) => set("email", v)} placeholder="oleg@company.ua" required autoComplete="email" />
              <Field label={isUk ? "Телефон *" : "Phone *"} type="tel" value={form.phone} onChange={(v) => set("phone", v)} placeholder="+380 67 000 00 00" required autoComplete="tel" />
              <Field label={isUk ? "Компанія (необов'язково)" : "Company (optional)"} value={form.company} onChange={(v) => set("company", v)} placeholder={isUk ? "ТОВ «Ваш Бізнес»" : "Your Company Ltd"} autoComplete="organization" />
            </>
          )}

          {/* Step 2: Project */}
          {step === 2 && (
            <>
              <h2 className="text-lg font-bold text-gray-900">{isUk ? "Деталі проєкту" : "Project Details"}</h2>
              <Field label={isUk ? "Назва вашого бізнесу *" : "Your Business Name *"} value={form.businessName} onChange={(v) => set("businessName", v)} placeholder={isUk ? "Кафе «Сонечко»" : "My Business"} required />
              <Field label={isUk ? "Домен (якщо є)" : "Domain (if any)"} value={form.domain} onChange={(v) => set("domain", v)} placeholder="example.com.ua" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {isUk ? "Короткий опис бізнесу *" : "Brief Business Description *"}
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder={isUk ? "Розкажіть про ваш бізнес, цільову аудиторію, особливості..." : "Tell us about your business, target audience, features..."}
                  rows={3}
                  required
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {isUk ? "Додаткові побажання" : "Additional Wishes"}
                </label>
                <textarea
                  value={form.wishes}
                  onChange={(e) => set("wishes", e.target.value)}
                  placeholder={isUk ? "Особливі вимоги, стиль, кольори, референси..." : "Special requirements, style, colors, references..."}
                  rows={3}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
                />
              </div>
            </>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <>
              <h2 className="text-lg font-bold text-gray-900">{isUk ? "Оплата" : "Payment"}</h2>
              <div className="space-y-3">
                {PAYMENT_METHODS.map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      payment === m.id ? "border-indigo-400 bg-indigo-50" : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={m.id}
                      checked={payment === m.id}
                      onChange={() => setPayment(m.id)}
                      className="mt-0.5 accent-indigo-600"
                    />
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{m.label}</div>
                      <div className="text-xs text-gray-500">{m.sub}</div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                <Lock className="w-4 h-4 inline mr-1.5 text-amber-600" />
                {isUk ? "Ваші платіжні дані захищені SSL-шифруванням. Ми не зберігаємо дані карток." : "Your payment data is protected by SSL encryption. We do not store card details."}
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 accent-indigo-600 w-4 h-4 shrink-0"
                  required
                />
                <span className="text-sm text-gray-600">
                  {isUk ? "Я погоджуюсь з" : "I agree to the"}{" "}
                  <Link href={`/${lang}/privacy`} className="text-indigo-600 hover:underline">
                    {isUk ? "умовами обслуговування та політикою конфіденційності" : "terms of service and privacy policy"}
                  </Link>
                </span>
              </label>
            </>
          )}

          {errorMsg && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
              {errorMsg}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="px-5 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                {isUk ? "← Назад" : "← Back"}
              </button>
            )}
            <button
              type="submit"
              disabled={(step === 3 && !agreed) || loading}
              className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {isUk ? "Оформляємо..." : "Processing..."}
                </>
              ) : step < 3 ? (
                isUk ? "Далі →" : "Next →"
              ) : (
                isUk ? "Оформити замовлення" : "Place Order"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Order summary sidebar */}
      <div className="space-y-5">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-900 mb-4 text-sm">{isUk ? "Ваше замовлення" : "Your Order"}</h3>

          {items.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">
              {isUk ? "Кошик порожній" : "Your cart is empty"}
            </p>
          ) : (
            <div className="space-y-3 pb-4 border-b border-gray-100">
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-xl shrink-0">
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate">{item.title}</div>
                    <div className="text-xs text-gray-500">
                      {isUk ? "Пакет:" : "Package:"} {item.package}
                    </div>
                  </div>
                  <div className="text-sm font-bold text-gray-900 shrink-0">
                    {item.price.toLocaleString(isUk ? "uk-UA" : "en-GB")} {isUk ? "₴" : "£"}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>{isUk ? "Підсумок" : "Subtotal"}</span>
              <span>{subtotal.toLocaleString(isUk ? "uk-UA" : "en-GB")} {isUk ? "₴" : "£"}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
              <span>{isUk ? "Разом" : "Total"}</span>
              <span>{subtotal.toLocaleString(isUk ? "uk-UA" : "en-GB")} {isUk ? "₴" : "£"}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-2">
          {[
            { icon: Shield, text: isUk ? "Безпечна оплата" : "Secure Payment" },
            { icon: CheckCircle, text: isUk ? "Гарантія якості" : "Quality Guarantee" },
          ].map((b) => (
            <div key={b.text} className="flex items-center gap-2 text-xs text-gray-500">
              <b.icon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              {b.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />
    </div>
  );
}
