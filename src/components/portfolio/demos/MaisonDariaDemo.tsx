"use client";

import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const COLLECTIONS = [
  { key: "ss2025", labelEn: "SS 2025", labelUk: "SS 2025" },
  { key: "aw2024", labelEn: "AW 2024", labelUk: "AW 2024" },
  { key: "resort2024", labelEn: "Resort 2024", labelUk: "Resort 2024" },
];

const COLLECTION_STORIES: Record<
  string,
  { nameEn: string; nameUk: string; storyEn: string; storyUk: string; swatchA: string; swatchB: string; swatchC: string }
> = {
  ss2025: {
    nameEn: "Spring/Summer 2025",
    nameUk: "Весна/Літо 2025",
    storyEn:
      "Inspired by the architecture of early morning light on Kyiv's limestone façades, SS 2025 explores the tension between structure and softness. Each silhouette begins from a single draped gesture — an arm extended, a shoulder dropped. Linen, silk and bamboo are chosen not for trend but for their kinship with living skin.",
    storyUk:
      "Натхненна архітектурою раннього ранкового світла на вапняних фасадах Києва, SS 2025 досліджує напругу між структурою та м'якістю. Кожен силует починається з єдиного жесту — витягнута рука, опущене плече. Льон, шовк і бамбук обрані не за трендом, а через спорідненість із живою шкірою.",
    swatchA: "#C8B99A",
    swatchB: "#D4B896",
    swatchC: "#8B7B6A",
  },
  aw2024: {
    nameEn: "Autumn/Winter 2024",
    nameUk: "Осінь/Зима 2024",
    storyEn:
      "AW 2024 is a meditation on warmth as resistance. The collection draws from archival photographs of Ukrainian women in the 1930s — their layering, their resolve. Wool crepe and duchess satin are cut with deliberate weight, garments that hold the wearer rather than the wearer holding them.",
    storyUk:
      "AW 2024 — це медитація на тепло як спротив. Колекція черпає натхнення з архівних фотографій українських жінок 1930-х — їхнє нашарування, їхня рішучість. Вовняний крепон і атлас герцогині кроєні з навмисною вагою — вироби, що тримають носія, а не навпаки.",
    swatchA: "#4A3728",
    swatchB: "#6B5344",
    swatchC: "#3D2E1E",
  },
  resort2024: {
    nameEn: "Resort 2024",
    nameUk: "Резорт 2024",
    storyEn:
      "Resort 2024 imagines a slow afternoon somewhere between the Carpathian foothills and the Aegean coast. Organza overlays catch the breeze; linen blends soften with each sea rinse. The palette is bleached, sun-washed — colour distilled to its quietest note.",
    storyUk:
      "Резорт 2024 уявляє повільний полудень десь між Карпатськими передгір'ями та узбережжям Егейського моря. Органзові накладення ловлять бриз; лляні суміші пом'якшуються після кожного морського полоскання. Палітра вибілена, вимита сонцем — колір зведено до найтихішої ноти.",
    swatchA: "#E8DCC8",
    swatchB: "#D4C9A8",
    swatchC: "#BFB09A",
  },
};

const PIECES = [
  {
    num: "01",
    nameEn: '"Sofia" Linen Coat',
    nameUk: 'Пальто "Sofія" Льон',
    fabricEn: "Belgian linen",
    fabricUk: "Бельгійський льон",
    price: "₴12,800",
    color: "#C8B99A",
  },
  {
    num: "02",
    nameEn: '"Kira" Silk Dress',
    nameUk: 'Сукня "Kіра" Шовк',
    fabricEn: "Naturally dyed silk",
    fabricUk: "Натурально фарбований шовк",
    price: "₴8,400",
    color: "#C9A87C",
  },
  {
    num: "03",
    nameEn: '"Nika" Wide Trousers',
    nameUk: 'Широкі брюки "Ніка"',
    fabricEn: "Wool crepe",
    fabricUk: "Вовняний крепон",
    price: "₴5,600",
    color: "#6B5344",
  },
  {
    num: "04",
    nameEn: '"Alya" Blouse',
    nameUk: 'Блуза "Аля"',
    fabricEn: "Organic cotton voile",
    fabricUk: "Органічний бавовняний вуаль",
    price: "₴4,200",
    color: "#D4C9A8",
  },
  {
    num: "05",
    nameEn: '"Marta" Evening Dress',
    nameUk: 'Вечірня сукня "Марта"',
    fabricEn: "Duchess satin",
    fabricUk: "Атлас герцогині",
    price: "₴18,500",
    color: "#4A3728",
  },
  {
    num: "06",
    nameEn: '"Dasha" Wrap Skirt',
    nameUk: 'Спідниця-запах "Даша"',
    fabricEn: "Bamboo twill",
    fabricUk: "Бамбуковий твіл",
    price: "₴4,800",
    color: "#B8A882",
  },
];

const LOOKBOOK = [
  { bg: "#1A1714", pieceEn: '"Sofia" Linen Coat', pieceUk: 'Пальто "Sofія"', fabricEn: "Belgian linen, natural undyed. Weight: 190g/m². The coat falls to the mid-calf with a single closure at the sternum — nothing else interrupts the line.", fabricUk: "Бельгійський льон, натуральний, нефарбований. Вага: 190г/м². Пальто спадає до середини литки з єдиною застібкою на грудині — більше нічого не перериває лінію." },
  { bg: "#2A1F1A", pieceEn: '"Kira" Silk Dress', pieceUk: 'Сукня "Kіра"', fabricEn: "Naturally dyed silk using walnut hull extract. The colour shifts from deep ochre at the hem to near-ivory at the collar. No two pieces are identical.", fabricUk: "Натурально фарбований шовк із екстракту шкаралупи волоського горіха. Колір переходить від глибокої охри внизу до майже слонової кістки біля коміра. Жодні два вироби не ідентичні." },
  { bg: "#111111", pieceEn: '"Marta" Evening Dress', pieceUk: 'Вечірня сукня "Марта"', fabricEn: "Duchess satin, hand-finished. The structured bodice holds its shape without boning — achieved through a precise internal geometry of lining panels. An eight-hour garment.", fabricUk: "Атлас герцогині, ручна обробка. Структурований ліф тримає форму без вусів — досягнуто завдяки точній внутрішній геометрії підкладки. Виріб на вісім годин." },
  { bg: "#1E1610", pieceEn: '"Nika" Wide Trousers', pieceUk: 'Широкі брюки "Ніка"', fabricEn: "Double-faced wool crepe. The trouser is cut on a diagonal grain so it moves with the body rather than hanging from it. Side pockets are hidden in the outseam.", fabricUk: "Двостороній вовняний крепон. Брюки кроєні по діагоналі нитки, щоб рухатися з тілом, а не висіти. Бічні кишені сховані у зовнішньому шві." },
  { bg: "#160E08", pieceEn: '"Dasha" Wrap Skirt', pieceUk: 'Спідниця-запах "Даша"', fabricEn: "Bamboo twill, pre-washed three times for maximum softness. The wrap fastens with a single fabric tie rather than buttons — the knot is worn at the hip or small of the back.", fabricUk: "Бамбуковий твіл, тричі попередньо випраний для максимальної м'якості. Запах фіксується єдиним тканинним зав'язком замість гудзиків — вузол носиться на стегні або крижах." },
];

const PRESS = [
  { pub: "Vogue UA", quoteEn: "Maison Daria speaks the quiet language of restraint — and it is deafening.", quoteUk: "Maison Daria говорить тихою мовою стриманості — і це приголомшує." },
  { pub: "Elle Ukraine", quoteEn: "Every seam is a sentence. Every silhouette a paragraph worth rereading.", quoteUk: "Кожен шов — речення. Кожен силует — абзац, гідний перечитання." },
  { pub: "Harper's Bazaar", quoteEn: "A designer who refuses to choose between beauty and integrity.", quoteUk: "Дизайнер, який відмовляється обирати між красою та цілісністю." },
  { pub: "L'Officiel", quoteEn: "The most compelling new voice from Kyiv in a generation.", quoteUk: "Найпереконливіший новий голос з Києва за покоління." },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function MaisonDariaDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeCollection, setActiveCollection] = useState("ss2025");
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [lookbookIndex, setLookbookIndex] = useState(0);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: "",
    email: "",
    phone: "",
    fabric: "",
    occasion: "",
    bust: "",
    waist: "",
    hips: "",
    timeline: "",
    budget: "",
    notes: "",
  });

  const col = COLLECTION_STORIES[activeCollection];

  function handleOrderChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setOrderForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleOrderSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOrderSubmitted(true);
  }

  return (
    <div
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif", backgroundColor: "#111111", color: "#FFFFF0" }}
      className="w-full overflow-x-hidden"
    >
      {/* ═══════════════════════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#111111" }}
      >
        {/* thin vertical scroll indicator */}
        <div
          className="absolute left-1/2 bottom-0 -translate-x-1/2"
          style={{ width: "1px", height: "80px", backgroundColor: "#D4B896", opacity: 0.5 }}
        />

        {/* top label */}
        <p
          className="absolute top-10 left-1/2 -translate-x-1/2 tracking-[0.35em] uppercase text-xs"
          style={{ color: "#D4B896" }}
        >
          {isUk ? "Київ, Україна" : "Kyiv, Ukraine"}
        </p>

        {/* brand name */}
        <div className="text-center px-6 select-none">
          <h1
            className="font-normal leading-none tracking-[0.12em] uppercase"
            style={{ fontSize: "clamp(2.8rem, 10vw, 9rem)", color: "#FFFFF0", letterSpacing: "0.08em" }}
          >
            MAISON
          </h1>
          <h1
            className="font-normal leading-none tracking-[0.28em] uppercase"
            style={{ fontSize: "clamp(2.8rem, 10vw, 9rem)", color: "#FFFFF0" }}
          >
            DARIA
          </h1>

          {/* thin rule */}
          <div className="mx-auto my-8" style={{ width: "120px", height: "1px", backgroundColor: "#D4B896" }} />

          <p
            className="tracking-[0.3em] uppercase text-xs"
            style={{ color: "#D4B896" }}
          >
            {isUk ? "Колекція SS 2025" : "SS 2025 Collection"}
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mt-16">
          <button
            className="px-10 py-3 text-xs tracking-[0.25em] uppercase transition-all duration-300 hover:bg-white/5"
            style={{ border: "1px solid #FFFFF0", color: "#FFFFF0", background: "transparent" }}
          >
            {isUk ? "Увійти" : "Enter"}
          </button>
          <button
            className="px-10 py-3 text-xs tracking-[0.25em] uppercase transition-all duration-300 hover:opacity-80"
            style={{ backgroundColor: "#D4B896", color: "#111111" }}
          >
            {isUk ? "Переглянути колекцію" : "View Collection"}
          </button>
        </div>

        {/* asymmetric accent lines */}
        <div
          className="absolute top-1/4 right-8 hidden lg:block"
          style={{ width: "1px", height: "200px", backgroundColor: "#D4B896", opacity: 0.2 }}
        />
        <div
          className="absolute bottom-1/3 left-8 hidden lg:block"
          style={{ width: "1px", height: "140px", backgroundColor: "#D4B896", opacity: 0.2 }}
        />
      </section>

      {/* ═══════════════════════════════════════════════════════════
          2. COLLECTIONS
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-16 lg:px-28" style={{ backgroundColor: "#0E0D0B" }}>
        {/* section label */}
        <p className="tracking-[0.3em] uppercase text-xs mb-12" style={{ color: "#D4B896" }}>
          {isUk ? "Колекції" : "Collections"}
        </p>

        {/* tabs */}
        <div className="flex gap-8 mb-16 overflow-x-auto">
          {COLLECTIONS.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCollection(c.key)}
              className="shrink-0 pb-2 text-sm tracking-[0.2em] uppercase transition-all duration-200"
              style={{
                color: activeCollection === c.key ? "#FFFFF0" : "#6B6050",
                borderBottom: activeCollection === c.key ? "1px solid #D4B896" : "1px solid transparent",
                background: "transparent",
              }}
            >
              {isUk ? c.labelUk : c.labelEn}
            </button>
          ))}
        </div>

        {/* collection content */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* story */}
          <div>
            <h2
              className="font-normal mb-6 leading-tight"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#FFFFF0" }}
            >
              {isUk ? col.nameUk : col.nameEn}
            </h2>
            <p className="leading-relaxed text-sm" style={{ color: "#B0A090" }}>
              {isUk ? col.storyUk : col.storyEn}
            </p>
          </div>

          {/* lookbook grid */}
          <div className="grid grid-cols-2 gap-3" style={{ gridTemplateRows: "200px 120px" }}>
            {/* large placeholder */}
            <div
              className="row-span-2 col-span-1 flex items-end p-4"
              style={{ backgroundColor: col.swatchA, minHeight: "200px" }}
            >
              <span
                className="text-xs tracking-[0.2em] uppercase"
                style={{ color: "rgba(255,255,240,0.6)" }}
              >
                {isUk ? "Лукбук" : "Lookbook"}
              </span>
            </div>
            {/* small placeholders */}
            <div className="col-span-1" style={{ backgroundColor: col.swatchB }} />
            <div className="col-span-1" style={{ backgroundColor: col.swatchC }} />
          </div>
        </div>

        {/* pieces grid */}
        <p className="tracking-[0.3em] uppercase text-xs mb-10" style={{ color: "#D4B896" }}>
          {isUk ? "Вироби" : "Pieces"}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "#2A2520" }}>
          {PIECES.map((piece, i) => (
            <div
              key={piece.num}
              className="p-8 cursor-pointer transition-all duration-200"
              style={{
                backgroundColor: selectedPiece === i ? "#1A1510" : "#0E0D0B",
                borderTop: selectedPiece === i ? "1px solid #D4B896" : "1px solid transparent",
              }}
              onClick={() => setSelectedPiece(selectedPiece === i ? null : i)}
            >
              {/* swatch + number row */}
              <div className="flex items-center gap-3 mb-5">
                <div className="shrink-0 w-6 h-6 rounded-full" style={{ backgroundColor: piece.color }} />
                <span className="text-xs tracking-[0.2em]" style={{ color: "#6B6050" }}>
                  {piece.num}
                </span>
              </div>

              <h3 className="font-normal mb-1 text-base" style={{ color: "#FFFFF0" }}>
                {isUk ? piece.nameUk : piece.nameEn}
              </h3>
              <p className="text-xs mb-5" style={{ color: "#8A7A6A" }}>
                {isUk ? piece.fabricUk : piece.fabricEn}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: "#D4B896" }}>
                  {piece.price}
                </span>
                <button
                  className="text-xs tracking-[0.2em] uppercase px-4 py-2 transition-all duration-200 hover:opacity-80"
                  style={{ border: "1px solid #D4B896", color: "#D4B896", background: "transparent" }}
                >
                  {isUk ? "Запит" : "Inquire"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          3. LOOKBOOK / EDITORIAL
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24" style={{ backgroundColor: "#111111" }}>
        <div className="px-6 md:px-16 lg:px-28 mb-12">
          <p className="tracking-[0.3em] uppercase text-xs mb-4" style={{ color: "#D4B896" }}>
            {isUk ? "Редакційний лукбук" : "Editorial Lookbook"}
          </p>
          <h2
            className="font-normal leading-tight"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#FFFFF0" }}
          >
            {isUk ? "Погляд зблизька" : "A Closer Look"}
          </h2>
        </div>

        {/* mobile: vertical strip */}
        <div className="lg:hidden flex flex-col gap-2 px-6">
          {LOOKBOOK.map((item, i) => (
            <div key={i} className="relative" style={{ height: "260px", backgroundColor: item.bg }}>
              <div className="absolute bottom-0 left-0 right-0 p-5" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.85))" }}>
                <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: "#D4B896" }}>
                  {isUk ? item.pieceUk : item.pieceEn}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "#9A8A7A", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {isUk ? item.fabricUk : item.fabricEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* desktop: full-width with sticky sidebar */}
        <div className="hidden lg:flex" style={{ minHeight: "600px" }}>
          {/* photo area */}
          <div className="flex-1 relative" style={{ backgroundColor: LOOKBOOK[lookbookIndex].bg }}>
            {/* navigation dots */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
              {LOOKBOOK.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setLookbookIndex(i)}
                  className="rounded-full transition-all duration-200"
                  style={{
                    width: lookbookIndex === i ? "8px" : "4px",
                    height: lookbookIndex === i ? "8px" : "4px",
                    backgroundColor: lookbookIndex === i ? "#D4B896" : "#4A4035",
                  }}
                />
              ))}
            </div>

            {/* prev / next */}
            <div className="absolute bottom-10 left-10 flex gap-6">
              <button
                onClick={() => setLookbookIndex((prev) => Math.max(0, prev - 1))}
                className="text-xs tracking-[0.2em] uppercase transition-colors duration-200"
                style={{ color: lookbookIndex === 0 ? "#3A3025" : "#D4B896", background: "transparent" }}
              >
                {isUk ? "← Попередній" : "← Prev"}
              </button>
              <button
                onClick={() => setLookbookIndex((prev) => Math.min(LOOKBOOK.length - 1, prev + 1))}
                className="text-xs tracking-[0.2em] uppercase transition-colors duration-200"
                style={{ color: lookbookIndex === LOOKBOOK.length - 1 ? "#3A3025" : "#D4B896", background: "transparent" }}
              >
                {isUk ? "Наступний →" : "Next →"}
              </button>
            </div>

            {/* index indicator */}
            <div className="absolute top-10 left-10">
              <span className="text-xs" style={{ color: "#4A4035" }}>
                {String(lookbookIndex + 1).padStart(2, "0")} / {String(LOOKBOOK.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* sticky sidebar */}
          <div
            className="shrink-0 flex flex-col justify-center p-12"
            style={{ width: "340px", backgroundColor: "#0A0908", borderLeft: "1px solid #2A2520" }}
          >
            <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "#D4B896" }}>
              {isUk ? "Виріб" : "Piece"}
            </p>
            <h3
              className="font-normal mb-6 leading-snug"
              style={{ fontSize: "1.5rem", color: "#FFFFF0" }}
            >
              {isUk ? LOOKBOOK[lookbookIndex].pieceUk : LOOKBOOK[lookbookIndex].pieceEn}
            </h3>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "#8A7A6A" }}>
              {isUk ? LOOKBOOK[lookbookIndex].fabricUk : LOOKBOOK[lookbookIndex].fabricEn}
            </p>
            <a
              href="#order"
              className="text-xs tracking-[0.25em] uppercase inline-block transition-opacity duration-200 hover:opacity-70"
              style={{ color: "#D4B896" }}
            >
              {isUk ? "Дізнатись більше →" : "Learn More →"}
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          4. ABOUT THE DESIGNER
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-16 lg:px-28" style={{ backgroundColor: "#0A0908" }}>
        <p className="tracking-[0.3em] uppercase text-xs mb-16" style={{ color: "#D4B896" }}>
          {isUk ? "Про дизайнера" : "About the Designer"}
        </p>

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* portrait placeholder */}
          <div
            className="relative"
            style={{ backgroundColor: "#2A1F18", minHeight: "520px" }}
          >
            <div className="absolute inset-0 flex items-end p-8">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: "#D4B896" }}>
                  {isUk ? "Дарія, засновниця" : "Daria, founder"}
                </p>
                <p className="text-xs" style={{ color: "#4A3A2A" }}>Kyiv, 2024</p>
              </div>
            </div>
          </div>

          {/* bio */}
          <div className="flex flex-col gap-8 pt-4">
            <h2
              className="font-normal leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#FFFFF0" }}
            >
              {isUk
                ? "Одяг, що пам'ятає тіло, яке його носило"
                : "Clothes that remember the body that wore them"}
            </h2>

            <p className="text-sm leading-relaxed" style={{ color: "#8A7A6A" }}>
              {isUk
                ? "Дарія навчалась у Флоренції та Антверпені, перш ніж повернутися до Києва у 2018 році. Вона знайшла в місті щось, чого не вистачало в академічному навчанні: конкретність матерії, щоденне тертя між красою та виживанням."
                : "Daria studied in Florence and Antwerp before returning to Kyiv in 2018. She found in the city something missing from her academic training: the specificity of matter, the daily friction between beauty and survival."}
            </p>

            <p className="text-sm leading-relaxed" style={{ color: "#8A7A6A" }}>
              {isUk
                ? "Кожна річ Maison Daria шиється вручну в ательє на Подолі. Немає конвеєра, немає партій — лише двоє кравчинь і один стіл зі світлом. Тканини замовляються невеликими відрізами у постачальників, з якими підтримуються багаторічні відносини."
                : "Every Maison Daria piece is sewn by hand in the atelier in Podil. No conveyor, no batches — only two seamstresses and one table with light. Fabrics are ordered in small cuts from suppliers with whom multi-year relationships are maintained."}
            </p>

            <p className="text-sm leading-relaxed" style={{ color: "#8A7A6A" }}>
              {isUk
                ? "Натхнення — це не пошук. Воно приходить від конкретного жіночого плеча, від того, як пальто лягає на плечі клієнтки в примірочній кімнаті, де не грає музика."
                : "Inspiration is not a search. It comes from a specific woman's shoulder, from the way a coat settles onto a client's frame in the fitting room where no music plays."}
            </p>

            {/* quote block */}
            <div
              className="py-8 px-8 mt-4"
              style={{ borderLeft: "2px solid #D4B896", backgroundColor: "#111111" }}
            >
              <p
                className="font-normal leading-snug mb-3"
                style={{ fontSize: "1.1rem", color: "#FFFFF0" }}
              >
                {isUk
                  ? "Все шиється вручну в Україні"
                  : "Everything handmade in Ukraine"}
              </p>
              <p className="text-xs tracking-[0.2em] uppercase" style={{ color: "#D4B896" }}>
                — Maison Daria
              </p>
            </div>

            {/* atelier address */}
            <div className="mt-4">
              <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "#D4B896" }}>
                {isUk ? "Ательє" : "Atelier"}
              </p>
              <p className="text-sm" style={{ color: "#8A7A6A" }}>
                {isUk ? "вул. Спаська 12, Поділ" : "12 Spaska St, Podil"}
              </p>
              <p className="text-sm" style={{ color: "#8A7A6A" }}>
                {isUk ? "Київ, Україна" : "Kyiv, Ukraine"}
              </p>
              <p className="text-sm mt-1" style={{ color: "#6A5A4A" }}>
                {isUk ? "За попереднім записом" : "By appointment only"}
              </p>
            </div>
          </div>
        </div>

        {/* studio photo placeholder */}
        <div
          className="w-full flex items-end p-8"
          style={{ backgroundColor: "#1A140E", minHeight: "280px" }}
        >
          <p className="text-xs tracking-[0.2em] uppercase" style={{ color: "#4A3A2A" }}>
            {isUk ? "Студія, Поділ — 2024" : "Studio, Podil — 2024"}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          5. CUSTOM ORDER FORM
      ═══════════════════════════════════════════════════════════ */}
      <section id="order" className="py-24 px-6 md:px-16 lg:px-28" style={{ backgroundColor: "#111111" }}>
        <p className="tracking-[0.3em] uppercase text-xs mb-4" style={{ color: "#D4B896" }}>
          {isUk ? "Індивідуальне замовлення" : "Custom Order"}
        </p>
        <h2
          className="font-normal mb-4 leading-tight"
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#FFFFF0" }}
        >
          {isUk ? "Запит на виготовлення" : "Request a Piece"}
        </h2>
        <p className="text-sm mb-16 max-w-xl" style={{ color: "#8A7A6A" }}>
          {isUk
            ? "Ми зв'яжемося протягом 24 годин для обговорення деталей та призначення першої примірки."
            : "We will contact you within 24 hours to discuss details and arrange a first fitting."}
        </p>

        {orderSubmitted ? (
          <div
            className="max-w-xl py-16 px-12 text-center"
            style={{ border: "1px solid #D4B896" }}
          >
            <div className="mb-6" style={{ color: "#D4B896", fontSize: "2rem" }}>✦</div>
            <h3 className="font-normal text-xl mb-4" style={{ color: "#FFFFF0" }}>
              {isUk ? "Запит отримано" : "Request Received"}
            </h3>
            <p className="text-sm" style={{ color: "#8A7A6A" }}>
              {isUk
                ? "Дякуємо. Ми зв'яжемося з вами протягом 24 годин."
                : "Thank you. We will be in touch within 24 hours."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleOrderSubmit} className="max-w-2xl flex flex-col gap-10">
            {/* contact */}
            <div>
              <p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ color: "#D4B896" }}>
                {isUk ? "Контактна інформація" : "Contact Information"}
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { name: "name", labelEn: "Full Name", labelUk: "Повне ім'я" },
                  { name: "email", labelEn: "Email", labelUk: "Email" },
                  { name: "phone", labelEn: "Phone", labelUk: "Телефон" },
                ].map((f) => (
                  <div key={f.name} className="flex flex-col gap-2">
                    <label
                      htmlFor={`order-${f.name}`}
                      className="text-xs tracking-[0.15em] uppercase"
                      style={{ color: "#6A5A4A" }}
                    >
                      {isUk ? f.labelUk : f.labelEn}
                    </label>
                    <input
                      id={`order-${f.name}`}
                      name={f.name}
                      value={orderForm[f.name as keyof typeof orderForm]}
                      onChange={handleOrderChange}
                      className="bg-transparent text-sm py-3 outline-none focus:border-b-white/40 transition-colors duration-200"
                      style={{ borderBottom: "1px solid #2A2520", color: "#FFFFF0" }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* preferences */}
            <div>
              <p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ color: "#D4B896" }}>
                {isUk ? "Переваги" : "Preferences"}
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {/* fabric */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="order-fabric"
                    className="text-xs tracking-[0.15em] uppercase"
                    style={{ color: "#6A5A4A" }}
                  >
                    {isUk ? "Перевага тканини" : "Fabric Preference"}
                  </label>
                  <select
                    id="order-fabric"
                    name="fabric"
                    value={orderForm.fabric}
                    onChange={handleOrderChange}
                    className="bg-transparent text-sm py-3 outline-none cursor-pointer"
                    style={{ borderBottom: "1px solid #2A2520", color: orderForm.fabric ? "#FFFFF0" : "#4A3A2A" }}
                  >
                    <option value="" style={{ backgroundColor: "#111111" }}>
                      {isUk ? "Оберіть тканину" : "Select fabric"}
                    </option>
                    {[
                      { v: "linen", en: "Belgian Linen", uk: "Бельгійський льон" },
                      { v: "silk", en: "Natural Silk", uk: "Натуральний шовк" },
                      { v: "wool", en: "Wool Crepe", uk: "Вовняний крепон" },
                      { v: "cotton", en: "Organic Cotton", uk: "Органічна бавовна" },
                      { v: "satin", en: "Duchess Satin", uk: "Атлас герцогині" },
                      { v: "bamboo", en: "Bamboo Twill", uk: "Бамбуковий твіл" },
                    ].map((o) => (
                      <option key={o.v} value={o.v} style={{ backgroundColor: "#111111" }}>
                        {isUk ? o.uk : o.en}
                      </option>
                    ))}
                  </select>
                </div>

                {/* occasion */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="order-occasion"
                    className="text-xs tracking-[0.15em] uppercase"
                    style={{ color: "#6A5A4A" }}
                  >
                    {isUk ? "Нагода" : "Occasion"}
                  </label>
                  <select
                    id="order-occasion"
                    name="occasion"
                    value={orderForm.occasion}
                    onChange={handleOrderChange}
                    className="bg-transparent text-sm py-3 outline-none cursor-pointer"
                    style={{ borderBottom: "1px solid #2A2520", color: orderForm.occasion ? "#FFFFF0" : "#4A3A2A" }}
                  >
                    <option value="" style={{ backgroundColor: "#111111" }}>
                      {isUk ? "Оберіть нагоду" : "Select occasion"}
                    </option>
                    {[
                      { v: "everyday", en: "Everyday wear", uk: "Повсякденне носіння" },
                      { v: "work", en: "Office / Work", uk: "Офіс / Робота" },
                      { v: "evening", en: "Evening event", uk: "Вечірній захід" },
                      { v: "wedding", en: "Wedding", uk: "Весілля" },
                      { v: "photoshoot", en: "Photo shoot", uk: "Фотосесія" },
                    ].map((o) => (
                      <option key={o.v} value={o.v} style={{ backgroundColor: "#111111" }}>
                        {isUk ? o.uk : o.en}
                      </option>
                    ))}
                  </select>
                </div>

                {/* timeline */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="order-timeline"
                    className="text-xs tracking-[0.15em] uppercase"
                    style={{ color: "#6A5A4A" }}
                  >
                    {isUk ? "Часові рамки" : "Timeline"}
                  </label>
                  <select
                    id="order-timeline"
                    name="timeline"
                    value={orderForm.timeline}
                    onChange={handleOrderChange}
                    className="bg-transparent text-sm py-3 outline-none cursor-pointer"
                    style={{ borderBottom: "1px solid #2A2520", color: orderForm.timeline ? "#FFFFF0" : "#4A3A2A" }}
                  >
                    <option value="" style={{ backgroundColor: "#111111" }}>
                      {isUk ? "Оберіть термін" : "Select timeframe"}
                    </option>
                    {[
                      { v: "1m", en: "Up to 1 month", uk: "До 1 місяця" },
                      { v: "2m", en: "1–2 months", uk: "1–2 місяці" },
                      { v: "3m", en: "2–3 months", uk: "2–3 місяці" },
                      { v: "flex", en: "Flexible", uk: "Гнучкі" },
                    ].map((o) => (
                      <option key={o.v} value={o.v} style={{ backgroundColor: "#111111" }}>
                        {isUk ? o.uk : o.en}
                      </option>
                    ))}
                  </select>
                </div>

                {/* budget */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="order-budget"
                    className="text-xs tracking-[0.15em] uppercase"
                    style={{ color: "#6A5A4A" }}
                  >
                    {isUk ? "Бюджет" : "Budget Range"}
                  </label>
                  <select
                    id="order-budget"
                    name="budget"
                    value={orderForm.budget}
                    onChange={handleOrderChange}
                    className="bg-transparent text-sm py-3 outline-none cursor-pointer"
                    style={{ borderBottom: "1px solid #2A2520", color: orderForm.budget ? "#FFFFF0" : "#4A3A2A" }}
                  >
                    <option value="" style={{ backgroundColor: "#111111" }}>
                      {isUk ? "Оберіть бюджет" : "Select budget"}
                    </option>
                    {[
                      { v: "under5", en: "Under ₴5,000", uk: "До ₴5,000" },
                      { v: "5-10", en: "₴5,000 – ₴10,000", uk: "₴5,000 – ₴10,000" },
                      { v: "10-20", en: "₴10,000 – ₴20,000", uk: "₴10,000 – ₴20,000" },
                      { v: "20plus", en: "₴20,000+", uk: "₴20,000+" },
                    ].map((o) => (
                      <option key={o.v} value={o.v} style={{ backgroundColor: "#111111" }}>
                        {isUk ? o.uk : o.en}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* measurements */}
            <div>
              <p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ color: "#D4B896" }}>
                {isUk ? "Мірки (см)" : "Measurements (cm)"}
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { name: "bust", labelEn: "Bust", labelUk: "Груди" },
                  { name: "waist", labelEn: "Waist", labelUk: "Талія" },
                  { name: "hips", labelEn: "Hips", labelUk: "Стегна" },
                ].map((f) => (
                  <div key={f.name} className="flex flex-col gap-2">
                    <label
                      htmlFor={`order-${f.name}`}
                      className="text-xs tracking-[0.15em] uppercase"
                      style={{ color: "#6A5A4A" }}
                    >
                      {isUk ? f.labelUk : f.labelEn}
                    </label>
                    <input
                      id={`order-${f.name}`}
                      name={f.name}
                      type="number"
                      placeholder="—"
                      value={orderForm[f.name as keyof typeof orderForm]}
                      onChange={handleOrderChange}
                      className="bg-transparent text-sm py-3 outline-none w-full"
                      style={{ borderBottom: "1px solid #2A2520", color: "#FFFFF0" }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* notes */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="order-notes"
                className="text-xs tracking-[0.15em] uppercase"
                style={{ color: "#6A5A4A" }}
              >
                {isUk ? "Додаткові побажання" : "Additional Notes"}
              </label>
              <textarea
                id="order-notes"
                name="notes"
                rows={4}
                value={orderForm.notes}
                onChange={handleOrderChange}
                className="bg-transparent text-sm py-3 outline-none resize-none"
                style={{ borderBottom: "1px solid #2A2520", color: "#FFFFF0" }}
              />
            </div>

            {/* submit */}
            <div className="flex items-center gap-8">
              <button
                type="submit"
                className="px-12 py-4 text-xs tracking-[0.25em] uppercase transition-all duration-200 hover:opacity-80"
                style={{ backgroundColor: "#D4B896", color: "#111111" }}
              >
                {isUk ? "Надіслати запит" : "Send Request"}
              </button>
              <p className="text-xs" style={{ color: "#4A3A2A" }}>
                {isUk ? "Відповідь протягом 24 год." : "Reply within 24h."}
              </p>
            </div>
          </form>
        )}
      </section>

      {/* ═══════════════════════════════════════════════════════════
          6. PRESS & RECOGNITION
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-16 lg:px-28" style={{ backgroundColor: "#0A0908" }}>
        <p className="tracking-[0.3em] uppercase text-xs mb-16" style={{ color: "#D4B896" }}>
          {isUk ? "Преса та визнання" : "Press & Recognition"}
        </p>

        <div className="grid sm:grid-cols-2 gap-px" style={{ backgroundColor: "#1A1510" }}>
          {PRESS.map((item, i) => (
            <div
              key={i}
              className="p-10 flex flex-col gap-6"
              style={{ backgroundColor: "#0A0908" }}
            >
              <span
                className="inline-block text-xs tracking-[0.3em] uppercase px-4 py-2 self-start"
                style={{ border: "1px solid #2A2520", color: "#D4B896" }}
              >
                {item.pub}
              </span>
              <blockquote
                className="text-sm leading-relaxed font-normal"
                style={{ color: "#8A7A6A", fontStyle: "italic" }}
              >
                &ldquo;{isUk ? item.quoteUk : item.quoteEn}&rdquo;
              </blockquote>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          7. FOOTER
      ═══════════════════════════════════════════════════════════ */}
      <footer
        className="py-16 px-6 md:px-16 lg:px-28"
        style={{ backgroundColor: "#080706", borderTop: "1px solid #1A1510" }}
      >
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* brand */}
          <div>
            <p
              className="font-normal tracking-[0.15em] uppercase mb-4"
              style={{ fontSize: "1.1rem", color: "#FFFFF0" }}
            >
              MAISON DARIA
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#4A3A2A" }}>
              {isUk
                ? "Ательє жіночого одягу ручної роботи. Київ, Україна."
                : "Women's bespoke atelier. Kyiv, Ukraine."}
            </p>
          </div>

          {/* navigation */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase mb-5" style={{ color: "#D4B896" }}>
              {isUk ? "Навігація" : "Navigation"}
            </p>
            <div className="flex flex-col gap-3">
              {[
                { en: "Collections", uk: "Колекції" },
                { en: "Lookbook", uk: "Лукбук" },
                { en: "About", uk: "Про нас" },
                { en: "Custom Order", uk: "Індивідуальне замовлення" },
                { en: "Press", uk: "Преса" },
              ].map((link) => (
                <a
                  key={link.en}
                  href="#"
                  className="text-xs transition-colors duration-200 hover:opacity-100"
                  style={{ color: "#4A3A2A" }}
                >
                  {isUk ? link.uk : link.en}
                </a>
              ))}
            </div>
          </div>

          {/* contact */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase mb-5" style={{ color: "#D4B896" }}>
              {isUk ? "Контакти" : "Contact"}
            </p>
            <div className="flex flex-col gap-3">
              <p className="text-xs" style={{ color: "#4A3A2A" }}>atelier@maisondaria.ua</p>
              <p className="text-xs" style={{ color: "#4A3A2A" }}>+380 (44) 000-00-00</p>
              <p className="text-xs" style={{ color: "#4A3A2A" }}>
                {isUk ? "вул. Спаська 12, Київ" : "12 Spaska St, Kyiv"}
              </p>
              <p className="text-xs mt-2" style={{ color: "#2A1E18" }}>
                {isUk ? "Лише за записом" : "By appointment only"}
              </p>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div
          className="flex flex-col sm:flex-row justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid #1A1510" }}
        >
          <p className="text-xs" style={{ color: "#2A1E18" }}>
            © 2025 Maison Daria.{" "}
            {isUk ? "Всі права захищено." : "All rights reserved."}
          </p>
          <p className="text-xs tracking-[0.2em] uppercase" style={{ color: "#2A1E18" }}>
            {isUk ? "Зроблено в Україні" : "Made in Ukraine"}
          </p>
        </div>
      </footer>
    </div>
  );
}
