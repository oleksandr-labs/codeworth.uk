"use client";

import { useState } from "react";

/* ─── data ─── */

const NAV = [
  { en: "Services", uk: "Послуги" },
  { en: "Portfolio", uk: "Портфоліо" },
  { en: "Pricing", uk: "Ціни" },
  { en: "Team", uk: "Команда" },
  { en: "Contact", uk: "Контакт" },
];

const EVENT_TYPES = [
  { id: "birthday",  emoji: "🎂", en: "Birthday Parties",  uk: "Дні народження",    descEn: "From intimate dinners to epic blowouts — we make your birthday unforgettable with themed décor, music and surprises.", descUk: "Від камерних вечерь до грандіозних вечірок — робимо ваш день народження незабутнім з тематичним декором та сюрпризами.", price: 3500 },
  { id: "corporate", emoji: "💼", en: "Corporate Events",   uk: "Корпоративи",       descEn: "Team buildings, galas, product launches — professional events with a creative twist that energizes your team.", descUk: "Тімбілдинги, гали, презентації — професійні заходи з креативним підходом, що надихають вашу команду.", price: 8000 },
  { id: "wedding",   emoji: "💒", en: "Weddings",           uk: "Весілля",            descEn: "Modern, fun and stylish weddings that break traditions. Dance floors, neon signs and all-night parties.", descUk: "Сучасні, веселі та стильні весілля, що ламають стереотипи. Танцполи, неон та вечірки до ранку.", price: 15000 },
  { id: "themed",    emoji: "🎭", en: "Themed Parties",     uk: "Тематичні вечірки",  descEn: "Gatsby, Hollywood, Y2K retro, neon rave — any theme you dream, we bring to life in stunning detail.", descUk: "Гетсбі, Голлівуд, Y2K ретро, неон-рейв — будь-яку тему втілимо в життя з неймовірною деталізацією.", price: 5000 },
  { id: "kids",      emoji: "🧸", en: "Kids Parties",       uk: "Дитячі свята",       descEn: "Safe, magical and wildly fun celebrations for little ones — characters, games, balloons and sweet tables.", descUk: "Безпечні, чарівні та неймовірно веселі свята для малечі — персонажі, ігри, кульки та солодкий стіл.", price: 2500 },
  { id: "concerts",  emoji: "🎤", en: "Concerts & Shows",   uk: "Концерти та шоу",    descEn: "Live performances, DJ nights and spectacular shows with professional sound, lighting and stage design.", descUk: "Живі виступи, DJ-вечірки та видовищні шоу з професійним звуком, світлом та сценічним дизайном.", price: 12000 },
];

const SERVICES = [
  { emoji: "🎨", titleEn: "Decor & Design",        titleUk: "Декор та дизайн",       descEn: "Balloons, neon, florals, LED installations — we create Instagram-worthy spaces that wow your guests.", descUk: "Кульки, неон, флористика, LED-інсталяції — створюємо простори, гідні Instagram, які вражають гостей." },
  { emoji: "🎧", titleEn: "Music & DJ",             titleUk: "Музика та DJ",          descEn: "Top DJs, live bands, custom playlists and professional sound systems to keep the party going all night.", descUk: "Топові DJ, живі гурти, кастомні плейлисти та професійний звук, щоб вечірка не зупинялась." },
  { emoji: "📸", titleEn: "Photo & Video",          titleUk: "Фото та відео",         descEn: "Professional photographers, drone footage, 360° booths and instant prints for unforgettable memories.", descUk: "Професійні фотографи, зйомка з дронів, 360°-будки та миттєвий друк для незабутніх спогадів." },
  { emoji: "🍕", titleEn: "Catering",               titleUk: "Кейтеринг",            descEn: "From gourmet buffets to street food corners and cocktail bars — food experiences your guests will love.", descUk: "Від гурме-буфетів до стріт-фуд зон та коктейль-барів — гастрономічний досвід, який полюблять гості." },
  { emoji: "🎪", titleEn: "Entertainment",           titleUk: "Розваги",              descEn: "Fire shows, acrobats, magicians, photo booths, karaoke and interactive games for all ages.", descUk: "Вогняні шоу, акробати, фокусники, фотозони, караоке та інтерактивні ігри для будь-якого віку." },
  { emoji: "🎙️", titleEn: "Hosting & MC",           titleUk: "Ведучий та MC",        descEn: "Charismatic hosts who set the vibe, run games and keep the energy at maximum the entire event.", descUk: "Харизматичні ведучі, що задають настрій, проводять ігри та тримають енергію на максимумі." },
];

const ADDONS = [
  { id: "dj",         emoji: "🎧", en: "DJ Set",            uk: "DJ-сет",             price: 3000 },
  { id: "photobooth", emoji: "📷", en: "Photo Booth",       uk: "Фотобудка",          price: 2500 },
  { id: "liveband",   emoji: "🎸", en: "Live Band",         uk: "Живий гурт",         price: 8000 },
  { id: "confetti",   emoji: "🎊", en: "Confetti Cannon",   uk: "Конфеті-гармата",    price: 1500 },
  { id: "ledfloor",   emoji: "💡", en: "LED Dance Floor",   uk: "LED-танцпол",        price: 5000 },
  { id: "chocolate",  emoji: "🍫", en: "Chocolate Fountain", uk: "Шоколадний фонтан", price: 2000 },
];

const VENUE_TYPES = [
  { id: "indoor",     en: "Indoor Venue",  uk: "Закрите приміщення", mult: 1.0 },
  { id: "outdoor",    en: "Outdoor",        uk: "Відкритий простір",  mult: 0.9 },
  { id: "restaurant", en: "Restaurant",     uk: "Ресторан",           mult: 1.2 },
  { id: "club",       en: "Club",           uk: "Клуб",              mult: 1.3 },
];

const PORTFOLIO_ITEMS = [
  { emoji: "🎂", catEn: "Birthday",     catUk: "День народження", nameEn: "Alina's Neon 25th",                  nameUk: "Неоновий 25-й Аліни",             guests: 60  },
  { emoji: "💼", catEn: "Corporate",    catUk: "Корпоратив",      nameEn: "IT-Hub Annual Party 2025",           nameUk: "Щорічна вечірка IT-Hub 2025",     guests: 300 },
  { emoji: "💒", catEn: "Wedding",      catUk: "Весілля",         nameEn: "Marta & Oleh — Rooftop Wedding",    nameUk: "Марта & Олег — Весілля на даху",  guests: 120 },
  { emoji: "🎭", catEn: "Themed",       catUk: "Тематична",       nameEn: "Retro Disco Night",                  nameUk: "Ретро диско ніч",                 guests: 150 },
  { emoji: "🧸", catEn: "Kids",         catUk: "Дитяча",          nameEn: "Timko's Superhero 7th",              nameUk: "Супергеройський 7-й Тімка",       guests: 30  },
  { emoji: "🎤", catEn: "Concert",      catUk: "Концерт",         nameEn: "Summer Beats Open-Air Festival",     nameUk: "Фестиваль Summer Beats Open-Air", guests: 500 },
];

const TEAM = [
  { emoji: "👩‍🎤", nameEn: "Yana Kovalenko",   nameUk: "Яна Коваленко",   specEn: "Wedding Specialist",    specUk: "Спеціаліст з весіль",      events: 180 },
  { emoji: "🧔",  nameEn: "Dmytro Savchuk",   nameUk: "Дмитро Савчук",   specEn: "Corporate & Shows",     specUk: "Корпоративи та шоу",       events: 240 },
  { emoji: "👩‍🎨", nameEn: "Oksana Marchenko", nameUk: "Оксана Марченко", specEn: "Kids & Themed Parties", specUk: "Дитячі та тематичні свята", events: 150 },
];

const REVIEWS = [
  { name: "Інна М.",         eventEn: "Birthday Party",     eventUk: "День народження",  textEn: "Wow Event made my 30th birthday absolutely epic! The neon décor, DJ and surprise confetti moment — my friends are still talking about it weeks later.", textUk: "Wow Event зробили мій 30-й день народження просто епічним! Неоновий декор, DJ та сюрприз з конфеті — друзі досі обговорюють!" },
  { name: "Oleksiy P., CTO", eventEn: "Corporate Party",    eventUk: "Корпоратив",       textEn: "We needed something beyond a typical corporate event. Wow Event delivered an incredible themed party for 200 people that boosted team morale like nothing else.", textUk: "Нам потрібно було щось більше за типовий корпоратив. Wow Event організували неймовірну тематичну вечірку на 200 осіб, що підняла командний дух." },
  { name: "Тетяна & Роман К.", eventEn: "Wedding",          eventUk: "Весілля",          textEn: "Our wedding was a non-stop dance party from start to finish. The LED floor, live band and fireworks — pure magic. Thank you for the best night of our lives!", textUk: "Наше весілля було безперервною танцювальною вечіркою. LED-підлога, живий гурт та феєрверки — чиста магія. Дякуємо за найкращу ніч!" },
];

const INSTA_SQUARES = [
  { emoji: "🪩", bg: "bg-pink-600" },
  { emoji: "🎉", bg: "bg-blue-500" },
  { emoji: "🎊", bg: "bg-fuchsia-600" },
  { emoji: "🎭", bg: "bg-indigo-600" },
  { emoji: "🎤", bg: "bg-pink-500" },
  { emoji: "💃", bg: "bg-blue-600" },
];

/* ─── helpers ─── */

function calcPackagePrice(
  eventTypeId: string,
  guests: number,
  venueId: string,
  addonIds: string[],
): number {
  const base = EVENT_TYPES.find((e) => e.id === eventTypeId)?.price ?? 5000;
  const venueMult = VENUE_TYPES.find((v) => v.id === venueId)?.mult ?? 1;
  const addonTotal = addonIds.reduce((sum, id) => {
    const a = ADDONS.find((ad) => ad.id === id);
    return sum + (a?.price ?? 0);
  }, 0);
  const guestMult = 1 + (guests - 10) * 0.008;
  return Math.round(base * guestMult * venueMult + addonTotal);
}

/* ─── component ─── */

export function WowEventDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  /* configurator state */
  const [cfgEvent, setCfgEvent] = useState("birthday");
  const [cfgGuests, setCfgGuests] = useState(50);
  const [cfgVenue, setCfgVenue] = useState("indoor");
  const [cfgAddons, setCfgAddons] = useState<string[]>([]);

  /* contact form state */
  const [formType, setFormType] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formGuests, setFormGuests] = useState("");
  const [formBudget, setFormBudget] = useState("");
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formSent, setFormSent] = useState(false);

  const toggleAddon = (id: string) =>
    setCfgAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );

  const packagePrice = calcPackagePrice(cfgEvent, cfgGuests, cfgVenue, cfgAddons);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* ═══ HEADER ═══ */}
      <header className="sticky top-0 z-30 border-b border-pink-500/20 bg-[#0f172a]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <span className="text-xl font-extrabold tracking-tight">
            <span className="text-pink-400">🎪&nbsp;Wow</span>{" "}
            <span className="text-blue-400">Event</span>
          </span>

          <nav className="hidden gap-5 text-sm font-medium text-slate-300 md:flex">
            {NAV.map((n) => (
              <span
                key={n.en}
                className="cursor-pointer transition-colors hover:text-pink-400"
              >
                {isUk ? n.uk : n.en}
              </span>
            ))}
          </nav>

          <button className="rounded-full bg-pink-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-pink-600/30 transition hover:bg-pink-500">
            {isUk ? "Планувати свято" : "Plan My Event"}
          </button>
        </div>
      </header>

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden py-24 text-center">
        {/* gradient blobs */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-pink-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-3xl px-4">
          <div className="mb-6 flex items-center justify-center gap-3 text-4xl">
            {["🎉", "🎊", "🪩", "🎭"].map((e) => (
              <span key={e} className="animate-pulse">
                {e}
              </span>
            ))}
          </div>

          <h1 className="mb-4 text-4xl font-black leading-tight md:text-6xl">
            {isUk
              ? "Зробимо Ваше Свято WOW!"
              : "Make Your Celebration WOW!"}
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-lg text-slate-300">
            {isUk
              ? "Від камерних вечірок до масштабних фестивалів — ми створюємо події, які запам'ятаються назавжди."
              : "From intimate parties to massive festivals — we create events that will be remembered forever."}
          </p>

          <button className="rounded-full bg-linear-to-br from-pink-600 to-blue-500 px-8 py-3 text-lg font-bold shadow-xl shadow-pink-600/25 transition hover:opacity-90">
            {isUk ? "Замовити подію" : "Book Your Event"}
          </button>

          <p className="mt-8 text-sm font-semibold text-pink-300">
            🎪 2,000+ {isUk ? "створених подій" : "events created"}
          </p>
        </div>
      </section>

      {/* ═══ EVENT TYPES ═══ */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-2 text-center text-3xl font-extrabold">
            {isUk ? "Які події ми створюємо" : "Events We Create"}
          </h2>
          <p className="mb-12 text-center text-slate-400">
            {isUk
              ? "Оберіть свій тип — ми зробимо його WOW"
              : "Pick your vibe — we'll make it WOW"}
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {EVENT_TYPES.map((ev) => (
              <div
                key={ev.id}
                className="group rounded-2xl border border-pink-500/20 bg-[#1e293b] p-6 transition hover:border-pink-500/60 hover:shadow-lg hover:shadow-pink-600/10"
              >
                <div className="mb-3 text-4xl">{ev.emoji}</div>
                <h3 className="mb-1 text-lg font-bold text-pink-300">
                  {isUk ? ev.uk : ev.en}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-slate-400">
                  {isUk ? ev.descUk : ev.descEn}
                </p>
                <p className="text-sm font-semibold text-blue-400">
                  {isUk ? "від" : "from"}{" "}
                  {ev.price.toLocaleString()}&nbsp;₴
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES GRID ═══ */}
      <section className="bg-[#1e293b]/50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-2 text-center text-3xl font-extrabold">
            {isUk ? "Наші послуги" : "Our Services"}
          </h2>
          <p className="mb-12 text-center text-slate-400">
            {isUk
              ? "Все для ідеальної вечірки в одному місці"
              : "Everything for the perfect party in one place"}
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div
                key={s.titleEn}
                className="rounded-2xl border border-blue-500/20 bg-[#0f172a] p-6 transition hover:border-blue-500/50"
              >
                <div className="mb-3 text-3xl">{s.emoji}</div>
                <h3 className="mb-2 text-lg font-bold text-blue-300">
                  {isUk ? s.titleUk : s.titleEn}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {isUk ? s.descUk : s.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PARTY CONFIGURATOR ═══ */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-2 text-center text-3xl font-extrabold">
            🎛️ {isUk ? "Конфігуратор вечірки" : "Party Configurator"}
          </h2>
          <p className="mb-12 text-center text-slate-400">
            {isUk
              ? "Складіть свій ідеальний пакет і дізнайтесь орієнтовну вартість"
              : "Build your perfect package and get an estimated price"}
          </p>

          <div className="rounded-3xl border border-pink-500/30 bg-[#1e293b] p-6 md:p-10">
            {/* Event type */}
            <div className="mb-8">
              <label className="mb-3 block text-sm font-semibold text-pink-300">
                {isUk ? "Тип події" : "Event Type"}
              </label>
              <div className="flex flex-wrap gap-2">
                {EVENT_TYPES.map((ev) => (
                  <button
                    key={ev.id}
                    onClick={() => setCfgEvent(ev.id)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      cfgEvent === ev.id
                        ? "bg-pink-600 text-white shadow-lg shadow-pink-600/30"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    {ev.emoji} {isUk ? ev.uk : ev.en}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest count */}
            <div className="mb-8">
              <label className="mb-3 block text-sm font-semibold text-pink-300">
                {isUk ? "Кількість гостей" : "Guest Count"}:{" "}
                <span className="text-white">{cfgGuests}</span>
              </label>
              <input
                type="range"
                min={10}
                max={300}
                value={cfgGuests}
                onChange={(e) => setCfgGuests(Number(e.target.value))}
                className="w-full accent-pink-500"
              />
              <div className="mt-1 flex justify-between text-xs text-slate-500">
                <span>10</span>
                <span>300</span>
              </div>
            </div>

            {/* Venue type */}
            <div className="mb-8">
              <label className="mb-3 block text-sm font-semibold text-pink-300">
                {isUk ? "Тип локації" : "Venue Type"}
              </label>
              <div className="flex flex-wrap gap-2">
                {VENUE_TYPES.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setCfgVenue(v.id)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      cfgVenue === v.id
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    {isUk ? v.uk : v.en}
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div className="mb-8">
              <label className="mb-3 block text-sm font-semibold text-pink-300">
                {isUk ? "Додатки" : "Add-ons"}
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {ADDONS.map((a) => {
                  const active = cfgAddons.includes(a.id);
                  return (
                    <button
                      key={a.id}
                      onClick={() => toggleAddon(a.id)}
                      className={`flex items-center gap-2 rounded-xl border p-3 text-left text-sm transition ${
                        active
                          ? "border-pink-500 bg-pink-600/20 text-white"
                          : "border-slate-600 bg-slate-800 text-slate-300 hover:border-slate-500"
                      }`}
                    >
                      <span className="shrink-0 text-xl">{a.emoji}</span>
                      <span>
                        <span className="block font-medium">
                          {isUk ? a.uk : a.en}
                        </span>
                        <span className="text-xs text-slate-400">
                          +{a.price.toLocaleString()}&nbsp;₴
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price estimate */}
            <div className="rounded-2xl bg-linear-to-br from-pink-600/20 to-blue-500/20 p-6 text-center">
              <p className="mb-1 text-sm text-slate-400">
                {isUk ? "Орієнтовна вартість пакету" : "Estimated Package Price"}
              </p>
              <p className="text-4xl font-black text-pink-400">
                {packagePrice.toLocaleString()}&nbsp;₴
              </p>
              <p className="mt-2 text-xs text-slate-500">
                {isUk
                  ? "* Фінальна ціна може відрізнятись після консультації"
                  : "* Final price may vary after consultation"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PORTFOLIO ═══ */}
      <section className="bg-[#1e293b]/50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-2 text-center text-3xl font-extrabold">
            {isUk ? "Наші події" : "Our Events"}
          </h2>
          <p className="mb-12 text-center text-slate-400">
            {isUk
              ? "Частина наших нещодавніх проєктів"
              : "A selection of our recent projects"}
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PORTFOLIO_ITEMS.map((p, i) => {
              const colors = [
                "from-pink-600 to-fuchsia-500",
                "from-blue-500 to-indigo-600",
                "from-pink-500 to-rose-600",
                "from-indigo-500 to-blue-500",
                "from-fuchsia-500 to-pink-500",
                "from-blue-600 to-cyan-500",
              ];
              return (
                <div
                  key={p.nameEn}
                  className="group overflow-hidden rounded-2xl border border-pink-500/20 bg-[#0f172a] transition hover:border-pink-500/50"
                >
                  {/* colored placeholder */}
                  <div
                    className={`flex h-44 items-center justify-center bg-linear-to-br ${colors[i % colors.length]}`}
                  >
                    <span className="text-6xl">{p.emoji}</span>
                  </div>
                  <div className="p-5">
                    <span className="mb-2 inline-block rounded-full bg-pink-600/20 px-3 py-0.5 text-xs font-semibold text-pink-300">
                      {isUk ? p.catUk : p.catEn}
                    </span>
                    <h3 className="mb-1 text-base font-bold">
                      {isUk ? p.nameUk : p.nameEn}
                    </h3>
                    <p className="text-sm text-slate-400">
                      👥 {p.guests} {isUk ? "гостей" : "guests"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-2 text-center text-3xl font-extrabold">
            {isUk ? "Наша команда" : "Our Team"}
          </h2>
          <p className="mb-12 text-center text-slate-400">
            {isUk
              ? "Професіонали, що створюють ваше WOW"
              : "Professionals who create your WOW"}
          </p>

          <div className="grid gap-5 sm:grid-cols-3">
            {TEAM.map((t) => (
              <div
                key={t.nameEn}
                className="rounded-2xl border border-pink-500/20 bg-[#1e293b] p-6 text-center transition hover:border-pink-500/50"
              >
                <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-pink-600 to-blue-500 text-4xl">
                  {t.emoji}
                </div>
                <h3 className="text-lg font-bold">
                  {isUk ? t.nameUk : t.nameEn}
                </h3>
                <p className="mb-2 text-sm text-pink-300">
                  {isUk ? t.specUk : t.specEn}
                </p>
                <p className="text-sm text-slate-400">
                  🎪 {t.events}+ {isUk ? "подій" : "events"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REVIEWS ═══ */}
      <section className="bg-[#1e293b]/50 py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-2 text-center text-3xl font-extrabold">
            {isUk ? "Відгуки клієнтів" : "Client Reviews"}
          </h2>
          <p className="mb-12 text-center text-slate-400">
            {isUk
              ? "Що кажуть ті, хто вже святкував з нами"
              : "What those who partied with us have to say"}
          </p>

          <div className="grid gap-5 md:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                className="rounded-2xl border border-blue-500/20 bg-[#0f172a] p-6 transition hover:border-blue-500/50"
              >
                <div className="mb-3 text-lg text-yellow-400">★★★★★</div>
                <p className="mb-4 text-sm leading-relaxed text-slate-300">
                  &ldquo;{isUk ? r.textUk : r.textEn}&rdquo;
                </p>
                <div>
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-xs text-pink-300">
                    {isUk ? r.eventUk : r.eventEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INSTAGRAM-STYLE ═══ */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-2 text-center text-3xl font-extrabold">
            📸 {isUk ? "Наш настрій" : "Our Vibe"}
          </h2>
          <p className="mb-10 text-center text-slate-400">
            {isUk ? "@wowevent • Слідкуйте за нами" : "@wowevent • Follow us"}
          </p>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {INSTA_SQUARES.map((sq, i) => (
              <div
                key={i}
                className={`flex aspect-square items-center justify-center rounded-xl ${sq.bg} text-4xl shadow-lg transition hover:scale-105`}
              >
                {sq.emoji}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT FORM ═══ */}
      <section className="bg-[#1e293b]/50 py-20">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="mb-2 text-center text-3xl font-extrabold">
            🎪 {isUk ? "Замовити подію" : "Book an Event"}
          </h2>
          <p className="mb-10 text-center text-slate-400">
            {isUk
              ? "Заповніть форму і ми зв'яжемось протягом 1 години"
              : "Fill in the form and we'll reach out within 1 hour"}
          </p>

          {formSent ? (
            <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-10 text-center">
              <p className="mb-2 text-4xl">🎉</p>
              <p className="text-lg font-bold text-green-300">
                {isUk ? "Дякуємо! Ми скоро зв'яжемось!" : "Thanks! We'll be in touch soon!"}
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
              }}
              className="space-y-4 rounded-2xl border border-pink-500/30 bg-[#0f172a] p-6 md:p-10"
            >
              {/* Event type */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-pink-300">
                  {isUk ? "Тип події" : "Event Type"}
                </label>
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm text-white focus:border-pink-500 focus:outline-none"
                >
                  <option value="">{isUk ? "Оберіть тип" : "Select type"}</option>
                  {EVENT_TYPES.map((ev) => (
                    <option key={ev.id} value={ev.id}>
                      {ev.emoji} {isUk ? ev.uk : ev.en}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Guests row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-pink-300">
                    {isUk ? "Бажана дата" : "Preferred Date"}
                  </label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm text-white focus:border-pink-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-pink-300">
                    {isUk ? "Кількість гостей" : "Number of Guests"}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={1000}
                    placeholder={isUk ? "напр. 80" : "e.g. 80"}
                    value={formGuests}
                    onChange={(e) => setFormGuests(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm text-white focus:border-pink-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-pink-300">
                  {isUk ? "Бюджет (₴)" : "Budget (₴)"}
                </label>
                <select
                  value={formBudget}
                  onChange={(e) => setFormBudget(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm text-white focus:border-pink-500 focus:outline-none"
                >
                  <option value="">{isUk ? "Оберіть діапазон" : "Select range"}</option>
                  <option value="5000">5,000 – 15,000 ₴</option>
                  <option value="15000">15,000 – 30,000 ₴</option>
                  <option value="30000">30,000 – 60,000 ₴</option>
                  <option value="60000">60,000+ ₴</option>
                </select>
              </div>

              {/* Name & Phone row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-pink-300">
                    {isUk ? "Ваше ім'я" : "Your Name"}
                  </label>
                  <input
                    type="text"
                    placeholder={isUk ? "Ім'я" : "Name"}
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm text-white focus:border-pink-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-pink-300">
                    {isUk ? "Телефон" : "Phone"}
                  </label>
                  <input
                    type="tel"
                    placeholder="+380 ..."
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm text-white focus:border-pink-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-linear-to-br from-pink-600 to-blue-500 py-3 text-base font-bold shadow-xl shadow-pink-600/20 transition hover:opacity-90"
              >
                {isUk ? "Надіслати заявку" : "Send Request"} 🎉
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-pink-500/20 bg-[#0f172a] py-14">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-10 md:grid-cols-3">
            {/* Brand */}
            <div>
              <p className="mb-3 text-xl font-extrabold">
                <span className="text-pink-400">🎪 Wow</span>{" "}
                <span className="text-blue-400">Event</span>
              </p>
              <p className="text-sm leading-relaxed text-slate-400">
                {isUk
                  ? "Створюємо незабутні події з 2018 року. Від маленьких вечірок до грандіозних фестивалів — з нами буде WOW!"
                  : "Creating unforgettable events since 2018. From small parties to grand festivals — with us it's always WOW!"}
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-3 font-bold text-pink-300">
                {isUk ? "Контакти" : "Contact"}
              </h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>📍 {isUk ? "Київ, вул. Хрещатик 22" : "Kyiv, 22 Khreshchatyk St."}</li>
                <li>📞 +380 44 123-45-67</li>
                <li>✉️ hello@wowevent.ua</li>
                <li>🕐 {isUk ? "Пн–Сб: 10:00 – 20:00" : "Mon–Sat: 10:00 – 20:00"}</li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="mb-3 font-bold text-pink-300">
                {isUk ? "Соціальні мережі" : "Social Media"}
              </h3>
              <div className="flex gap-3 text-2xl">
                <span className="cursor-pointer transition hover:scale-110">📷</span>
                <span className="cursor-pointer transition hover:scale-110">🎵</span>
                <span className="cursor-pointer transition hover:scale-110">📘</span>
                <span className="cursor-pointer transition hover:scale-110">▶️</span>
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-300">
                {isUk
                  ? "Давайте створимо щось неймовірне! ✨"
                  : "Let's create something amazing! ✨"}
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-700 pt-6 text-center text-xs text-slate-500">
            © 2026 Wow Event. {isUk ? "Усі права захищено." : "All rights reserved."}
          </div>
        </div>
      </footer>
    </div>
  );
}
