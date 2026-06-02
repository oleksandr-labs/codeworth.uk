"use client";

import { useState } from "react";

export function BridalLuxDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeTab, setActiveTab] = useState("designer");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    weddingDate: "",
    size: "",
    budget: "",
    guests: "",
    comment: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const designerDresses = [
    {
      name: "Adele",
      style: isUk ? "Кристали та вишивка" : "Crystals & embroidery",
      price: "від 28000₴",
    },
    {
      name: "Sophia",
      style: isUk ? "Мереживні рукави" : "Lace sleeves",
      price: "від 32000₴",
    },
    {
      name: "Victoria",
      style: isUk ? "Відкрита спина" : "Open back",
      price: "від 24000₴",
    },
    {
      name: "Isabella",
      style: isUk ? "Королівський шлейф" : "Royal train",
      price: "від 38000₴",
    },
    {
      name: "Charlotte",
      style: isUk ? "Мінімалістичний крепдешин" : "Minimalist crepe",
      price: "від 22000₴",
    },
    {
      name: "Aurora",
      style: isUk ? "Квіткова аплікація" : "Floral appliqué",
      price: "від 45000₴",
    },
  ];

  const classicDresses = [
    {
      name: "Diana",
      style: isUk ? "Спідниця-принцеса" : "Princess skirt",
      price: "від 18000₴",
    },
    {
      name: "Elena",
      style: isUk ? "Силует А-лайн" : "A-line silhouette",
      price: "від 16000₴",
    },
    {
      name: "Maria",
      style: isUk ? "Ампір" : "Empire waist",
      price: "від 14000₴",
    },
    {
      name: "Natalie",
      style: isUk ? "Русалка" : "Mermaid fit",
      price: "від 20000₴",
    },
    {
      name: "Anna",
      style: isUk ? "Без бретелей" : "Strapless",
      price: "від 15000₴",
    },
    {
      name: "Julia",
      style: isUk ? "Відкриті плечі" : "Off-shoulder",
      price: "від 17000₴",
    },
  ];

  const bohoDresses = [
    {
      name: "Lily",
      style: isUk ? "Мереживне бохо" : "Lace boho",
      price: "від 19000₴",
    },
    {
      name: "Daisy",
      style: isUk ? "Квіткова корона" : "Floral crown",
      price: "від 17000₴",
    },
    {
      name: "Rose",
      style: isUk ? "Деталі макраме" : "Macramé details",
      price: "від 21000₴",
    },
    {
      name: "Iris",
      style: isUk ? "Легкий шифон" : "Flowy chiffon",
      price: "від 16000₴",
    },
    {
      name: "Willow",
      style: isUk ? "Земляні відтінки" : "Earthy tones",
      price: "від 18000₴",
    },
    {
      name: "Jasmine",
      style: isUk ? "Пляжне бохо" : "Beach boho",
      price: "від 20000₴",
    },
  ];

  const activeDresses =
    activeTab === "designer"
      ? designerDresses
      : activeTab === "classic"
      ? classicDresses
      : bohoDresses;

  const services = [
    {
      emoji: "👗",
      title: isUk ? "Примірка суконь" : "Dress Fittings",
      price: isUk ? "Безкоштовно" : "Free",
      desc: isUk
        ? "Безкоштовна примірка трьох суконь на вибір у комфортній приватній кімнаті"
        : "Free fitting of up to three dresses in a comfortable private room",
    },
    {
      emoji: "✂️",
      title: isUk ? "Підгонка" : "Alterations",
      price: "від 2000₴",
      desc: isUk
        ? "Підгонка будь-якого плаття під ваші індивідуальні мірки майстром-кравцем"
        : "Professional tailoring alterations for any dress to your exact measurements",
    },
    {
      emoji: "🎀",
      title: isUk ? "Оренда" : "Rental",
      price: "від 4000₴",
      desc: isUk
        ? "Оренда весільної сукні на 2 дні — ідеально для виїзних церемоній"
        : "2-day dress rental — ideal for destination ceremonies",
    },
    {
      emoji: "💍",
      title: isUk ? "Аксесуари" : "Accessories",
      price: isUk ? "За запитом" : "On request",
      desc: isUk
        ? "Фата, прикраси та рукавички — повний образ нареченої в одному місці"
        : "Veil, jewelry, and gloves — complete bridal look in one place",
    },
  ];

  const reviews = [
    {
      name: isUk ? "Анастасія К." : "Anastasia K.",
      date: isUk ? "Червень 2025" : "June 2025",
      stars: 5,
      text: isUk
        ? "BridalLux — це справжня казка. Мене зустріли з теплом, допомогли вибрати ідеальне плаття Sophia, і я виглядала приголомшливо. Кожна деталь була продумана до дрібниць."
        : "BridalLux is a true fairy tale. They welcomed me warmly, helped me choose the perfect Sophia gown, and I looked absolutely stunning. Every detail was thoughtfully considered.",
      dress: "Sophia — Designer Collection",
    },
    {
      name: isUk ? "Марія Г." : "Maria H.",
      date: isUk ? "Серпень 2025" : "August 2025",
      stars: 5,
      text: isUk
        ? "Обрала сукню Rose з колекції Бохо. Стиліст витратила на мене дві години і знайшла саме те, про що я мріяла. Підгонка була зроблена бездоганно."
        : "I chose the Rose gown from the Boho collection. The stylist spent two hours with me and found exactly what I had dreamed of. The alterations were done impeccably.",
      dress: "Rose — Boho Collection",
    },
    {
      name: isUk ? "Юлія С." : "Julia S.",
      date: isUk ? "Жовтень 2025" : "October 2025",
      stars: 5,
      text: isUk
        ? "Сукня Aurora — справжній витвір мистецтва. Я заходила в салон просто подивитися, але вийшла з платтям своєї мрії. Команда BridalLux неймовірна!"
        : "The Aurora gown is a true work of art. I walked in just to browse but walked out with my dream dress. The BridalLux team is incredible!",
      dress: "Aurora — Designer Collection",
    },
    {
      name: isUk ? "Олена В." : "Olena V.",
      date: isUk ? "Лютий 2026" : "February 2026",
      stars: 5,
      text: isUk
        ? "Замовила сукню Diana для зимового весілля. Все пройшло ідеально — від першої примірки до дня весілля. Дякую за увагу та турботу!"
        : "I ordered the Diana gown for my winter wedding. Everything went perfectly — from the first fitting to the wedding day itself. Thank you for your care and attention!",
      dress: "Diana — Classic Collection",
    },
  ];

  function handleFormChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-stone-50 min-h-screen font-sans text-stone-800">

      {/* Navbar */}
      <nav className="bg-white border-b border-stone-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-serif text-2xl tracking-widest text-stone-800 select-none">
            Bridal<span className="text-rose-400">Lux</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-stone-600">
            <a href="#collections" className="hover:text-rose-400 transition-colors">
              {isUk ? "Колекції" : "Collections"}
            </a>
            <a href="#services" className="hover:text-rose-400 transition-colors">
              {isUk ? "Послуги" : "Services"}
            </a>
            <a href="#reviews" className="hover:text-rose-400 transition-colors">
              {isUk ? "Наречені" : "Brides"}
            </a>
            <a href="#contact" className="hover:text-rose-400 transition-colors">
              {isUk ? "Контакт" : "Contact"}
            </a>
          </div>
          <a
            href="#booking"
            className="border border-rose-300 text-rose-400 px-5 py-2 text-sm rounded-full hover:bg-rose-50 transition-colors"
          >
            {isUk ? "Записатись" : "Book Fitting"}
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-stone-50 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-7xl mb-8 select-none">🌸</div>
          <h1 className="font-serif text-5xl md:text-6xl text-stone-800 leading-tight mb-6 tracking-wide">
            {isUk
              ? "Ваша Весільна Казка Починається Тут"
              : "Your Wedding Story Starts Here"}
          </h1>
          <p className="text-stone-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {isUk
              ? "BridalLux — найелегантніший весільний салон у Києві. Понад 300 суконь від провідних дизайнерів, індивідуальний підхід до кожної нареченої та незабутній досвід вибору сукні мрії."
              : "BridalLux — Kyiv's most elegant bridal salon. Over 300 dresses from leading designers, a personal approach to every bride, and an unforgettable experience finding your dream gown."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#booking"
              className="bg-rose-400 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-rose-500 transition-colors shadow-md"
            >
              {isUk ? "Записатись на Примірку" : "Book a Fitting"}
            </a>
            <a
              href="#collections"
              className="border border-stone-300 text-stone-700 px-8 py-3 rounded-full text-sm font-medium hover:border-rose-300 hover:text-rose-400 transition-colors"
            >
              {isUk ? "Переглянути Колекції" : "View Collections"}
            </a>
          </div>
          <div className="mt-16 flex flex-wrap justify-center gap-10 text-center">
            <div>
              <div className="text-3xl font-serif text-rose-400">300+</div>
              <div className="text-xs text-stone-500 mt-1">
                {isUk ? "Суконь в колекції" : "Dresses in collection"}
              </div>
            </div>
            <div>
              <div className="text-3xl font-serif text-rose-400">12</div>
              <div className="text-xs text-stone-500 mt-1">
                {isUk ? "Років досвіду" : "Years of experience"}
              </div>
            </div>
            <div>
              <div className="text-3xl font-serif text-rose-400">2500+</div>
              <div className="text-xs text-stone-500 mt-1">
                {isUk ? "Щасливих наречених" : "Happy brides"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Lookbook */}
      <section id="collections" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl text-center text-stone-800 mb-2">
            {isUk ? "Наші Колекції" : "Our Collections"}
          </h2>
          <p className="text-stone-500 text-center mb-10 text-sm">
            {isUk
              ? "Оберіть стиль, що відображає вашу унікальність"
              : "Choose the style that reflects your unique beauty"}
          </p>
          <div className="flex justify-center gap-2 mb-10">
            {[
              {
                id: "designer",
                label: isUk ? "Дизайнерські" : "Designer",
              },
              {
                id: "classic",
                label: isUk ? "Класичні" : "Classic",
              },
              {
                id: "boho",
                label: isUk ? "Бохо" : "Boho",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-full text-sm transition-colors border ${
                  activeTab === tab.id
                    ? "bg-rose-400 text-white border-rose-400"
                    : "bg-white text-stone-600 border-stone-200 hover:border-rose-300 hover:text-rose-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {activeDresses.map((dress) => (
              <div
                key={dress.name}
                className="bg-stone-50 border border-stone-100 rounded-2xl p-6 flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                <div className="text-4xl text-center py-6 bg-rose-50 rounded-xl">
                  👰
                </div>
                <div className="font-serif text-xl text-stone-800">
                  {dress.name}
                </div>
                <div className="text-xs text-stone-500">{dress.style}</div>
                <div className="text-rose-400 font-medium text-sm">
                  {dress.price}
                </div>
                <button className="mt-auto border border-rose-300 text-rose-400 py-2 rounded-full text-sm hover:bg-rose-50 transition-colors">
                  {isUk ? "Спробувати" : "Try On"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-6 bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-4xl text-center text-stone-800 mb-2">
            {isUk ? "Послуги Салону" : "Salon Services"}
          </h2>
          <p className="text-stone-500 text-center mb-12 text-sm">
            {isUk
              ? "Все, що потрібно для ідеального образу нареченої"
              : "Everything you need for the perfect bridal look"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-white border border-stone-100 rounded-2xl p-7 flex gap-5 items-start hover:shadow-md transition-shadow"
              >
                <div className="text-4xl shrink-0">{s.emoji}</div>
                <div>
                  <div className="font-serif text-lg text-stone-800 mb-1">
                    {s.title}
                  </div>
                  <div className="text-rose-400 text-sm font-medium mb-2">
                    {s.price}
                  </div>
                  <div className="text-stone-500 text-sm leading-relaxed">
                    {s.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-4xl text-center text-stone-800 mb-2">
            {isUk ? "Наші Наречені" : "Our Brides"}
          </h2>
          <p className="text-stone-500 text-center mb-12 text-sm">
            {isUk
              ? "Реальні відгуки справжніх наречених"
              : "Real reviews from real brides"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="bg-stone-50 border border-rose-100 rounded-2xl p-7 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-stone-800">{r.name}</div>
                    <div className="text-xs text-stone-400">{r.date}</div>
                  </div>
                  <div className="text-rose-300 text-lg tracking-tight">
                    {"★".repeat(r.stars)}
                  </div>
                </div>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {r.text}
                </p>
                <div className="text-xs text-rose-400 font-medium mt-1">
                  {r.dress}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section id="booking" className="py-20 px-6 bg-rose-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl text-center text-stone-800 mb-2">
            {isUk ? "Запис на Примірку" : "Book a Fitting"}
          </h2>
          <p className="text-stone-500 text-center mb-10 text-sm">
            {isUk
              ? "Заповніть форму, і ми зв'яжемося з вами для підтвердження"
              : "Fill in the form and we will contact you to confirm your appointment"}
          </p>

          {submitted ? (
            <div className="bg-white border border-rose-200 rounded-2xl p-10 text-center">
              <div className="text-5xl mb-4">🌸</div>
              <h3 className="font-serif text-2xl text-stone-800 mb-2">
                {isUk ? "Дякуємо!" : "Thank You!"}
              </h3>
              <p className="text-stone-500 text-sm">
                {isUk
                  ? "Ми отримали ваш запит і зв'яжемося з вами найближчим часом для підтвердження примірки."
                  : "We have received your request and will contact you shortly to confirm your fitting appointment."}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-rose-100 rounded-2xl p-8 flex flex-col gap-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-stone-500 font-medium">
                    {isUk ? "Ваше ім'я" : "Your name"}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    placeholder={isUk ? "Наприклад: Анастасія" : "E.g. Anastasia"}
                    className="border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-rose-300 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-stone-500 font-medium">
                    {isUk ? "Телефон" : "Phone"}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleFormChange}
                    placeholder="+38 (0xx) xxx-xx-xx"
                    className="border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-rose-300 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-stone-500 font-medium">
                  {isUk ? "Дата весілля" : "Wedding date"}
                </label>
                <input
                  type="date"
                  name="weddingDate"
                  value={form.weddingDate}
                  onChange={handleFormChange}
                  className="border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 focus:outline-none focus:border-rose-300 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-stone-500 font-medium">
                    {isUk ? "Розмір" : "Size"}
                  </label>
                  <select
                    name="size"
                    value={form.size}
                    onChange={handleFormChange}
                    className="border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 focus:outline-none focus:border-rose-300 transition-colors bg-white"
                  >
                    <option value="">
                      {isUk ? "Оберіть розмір" : "Select size"}
                    </option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="2XL">2XL</option>
                    <option value="3XL">3XL</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-stone-500 font-medium">
                    {isUk ? "Бюджет" : "Budget"}
                  </label>
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={handleFormChange}
                    className="border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 focus:outline-none focus:border-rose-300 transition-colors bg-white"
                  >
                    <option value="">
                      {isUk ? "Оберіть бюджет" : "Select budget"}
                    </option>
                    <option value="to15">
                      {isUk ? "до 15000₴" : "Up to 15000₴"}
                    </option>
                    <option value="15to25">15000–25000₴</option>
                    <option value="25to40">25000–40000₴</option>
                    <option value="40plus">40000₴+</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-stone-500 font-medium">
                  {isUk
                    ? "Кількість гостей на примірці"
                    : "Guests at fitting"}
                </label>
                <select
                  name="guests"
                  value={form.guests}
                  onChange={handleFormChange}
                  className="border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 focus:outline-none focus:border-rose-300 transition-colors bg-white"
                >
                  <option value="">
                    {isUk ? "Оберіть кількість" : "Select number"}
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-stone-500 font-medium">
                  {isUk ? "Коментар" : "Comment"}
                </label>
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={handleFormChange}
                  rows={3}
                  placeholder={
                    isUk
                      ? "Розкажіть про ваші побажання або стиль весілля..."
                      : "Tell us about your preferences or wedding style..."
                  }
                  className="border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-rose-300 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="bg-rose-400 text-white py-3 rounded-full text-sm font-medium hover:bg-rose-500 transition-colors shadow-md"
              >
                {isUk ? "Записатись" : "Book Now"}
              </button>

              <p className="text-center text-xs text-stone-400">
                {isUk
                  ? "Примірка безкоштовна — оплата лише при замовленні"
                  : "Fitting is free — pay only when ordering"}
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-stone-800 text-stone-300 py-14 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div>
            <div className="font-serif text-2xl tracking-widest text-white mb-3">
              Bridal<span className="text-rose-300">Lux</span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              {isUk
                ? "Весільний салон у серці Києва. Ми допоможемо вам знайти сукню мрії."
                : "A bridal salon in the heart of Kyiv. We will help you find your dream gown."}
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-500 mb-4">
              {isUk ? "Адреса та Години" : "Address & Hours"}
            </div>
            <div className="text-sm space-y-2 text-stone-400">
              <div>
                {isUk
                  ? "вул. Хрещатик 15, офіс 3"
                  : "15 Khreshchatyk St, Office 3"}
              </div>
              <div>{isUk ? "Київ, Україна" : "Kyiv, Ukraine"}</div>
              <div className="pt-2">
                {isUk ? "Вт–Нд: 10:00–19:00" : "Tue–Sun: 10:00–19:00"}
              </div>
              <div>{isUk ? "Пн: вихідний" : "Mon: closed"}</div>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-500 mb-4">
              {isUk ? "Контакти" : "Contact"}
            </div>
            <div className="text-sm space-y-2 text-stone-400">
              <div>
                <a
                  href="tel:+380441234567"
                  className="hover:text-rose-300 transition-colors"
                >
                  +38 (044) 123-45-67
                </a>
              </div>
              <div>
                <a
                  href="mailto:hello@bridallux.ua"
                  className="hover:text-rose-300 transition-colors"
                >
                  hello@bridallux.ua
                </a>
              </div>
              <div className="pt-2">
                <a
                  href="https://instagram.com/bridallux"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-rose-300 transition-colors"
                >
                  @bridallux
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-10 pt-6 border-t border-stone-700 text-xs text-stone-500 text-center">
          © 2026 BridalLux.{" "}
          {isUk ? "Всі права захищені." : "All rights reserved."}
        </div>
      </footer>
    </div>
  );
}
