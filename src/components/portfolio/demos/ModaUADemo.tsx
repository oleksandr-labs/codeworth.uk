"use client";

import { useState, useMemo } from "react";

const PRODUCTS = [
  { id:1, nameUk:"Міді-сукня класик", nameEn:"Classic Midi Dress", brand:"ModaUA", catUk:"Плаття", catEn:"Dresses", price:1890, oldPrice:2490, colors:["#111111","#c8a882","#4a6741"], sizes:["XS","S","M","L","XL"], availSizes:["S","M","L"], badge:"SALE", emoji:"👗", rating:4.8, reviews:124 },
  { id:2, nameUk:"Кроп-топ в рубчик", nameEn:"Ribbed Crop Top", brand:"ModaUA", catUk:"Топи", catEn:"Tops", price:590, oldPrice:null, colors:["#FFFFFF","#111111","#d4a0a0"], sizes:["XS","S","M","L"], availSizes:["XS","S","M","L"], badge:null, emoji:"👚", rating:4.6, reviews:89 },
  { id:3, nameUk:"Прямі джинси wide leg", nameEn:"Wide Leg Straight Jeans", brand:"DenimUA", catUk:"Джинси", catEn:"Jeans", price:1650, oldPrice:null, colors:["#3b4a6b","#111111"], sizes:["XS","S","M","L","XL"], availSizes:["S","M","XL"], badge:"NEW", emoji:"👖", rating:4.7, reviews:203 },
  { id:4, nameUk:"Оверсайз бомбер", nameEn:"Oversized Bomber", brand:"UrbanUA", catUk:"Куртки", catEn:"Jackets", price:2990, oldPrice:3890, colors:["#4a6741","#111111","#c8a882"], sizes:["S","M","L","XL"], availSizes:["M","L"], badge:"SALE", emoji:"🧥", rating:4.9, reviews:67 },
  { id:5, nameUk:"Лляна сорочка оверсайз", nameEn:"Linen Oversized Shirt", brand:"ModaUA", catUk:"Сорочки", catEn:"Shirts", price:1190, oldPrice:null, colors:["#FEFCE8","#c8a882","#a0a882"], sizes:["XS","S","M","L","XL"], availSizes:["XS","S","M","L","XL"], badge:null, emoji:"👔", rating:4.5, reviews:156 },
  { id:6, nameUk:"Коротка спідниця плісе", nameEn:"Pleated Mini Skirt", brand:"ModaUA", catUk:"Спідниці", catEn:"Skirts", price:990, oldPrice:1290, colors:["#d4a0a0","#111111","#4a6741"], sizes:["XS","S","M","L"], availSizes:["XS","S","M"], badge:"SALE", emoji:"👗", rating:4.4, reviews:78 },
  { id:7, nameUk:"Трикотажне плаття-светр", nameEn:"Knit Sweater Dress", brand:"WarmUA", catUk:"Плаття", catEn:"Dresses", price:1490, oldPrice:null, colors:["#c8a882","#111111","#4a6741"], sizes:["S","M","L","XL"], availSizes:["S","M","L","XL"], badge:null, emoji:"🧶", rating:4.7, reviews:92 },
  { id:8, nameUk:"Брюки карго з кишенями", nameEn:"Cargo Trousers", brand:"UrbanUA", catUk:"Брюки", catEn:"Trousers", price:1350, oldPrice:null, colors:["#6b6b4a","#111111","#c8a882"], sizes:["XS","S","M","L","XL"], availSizes:["XS","M","L"], badge:"NEW", emoji:"👖", rating:4.6, reviews:44 },
  { id:9, nameUk:"Шовкова блуза з бантом", nameEn:"Silk Bow Blouse", brand:"ModaUA", catUk:"Блузи", catEn:"Blouses", price:1790, oldPrice:null, colors:["#FAF0E6","#111111","#d4a0a0"], sizes:["XS","S","M","L","XL"], availSizes:["XS","S","M","L"], badge:"NEW", emoji:"👒", rating:4.8, reviews:37 },
  { id:10, nameUk:"Пальто з вовняної суміші", nameEn:"Wool Blend Coat", brand:"WarmUA", catUk:"Пальта", catEn:"Coats", price:4490, oldPrice:5990, colors:["#c8a882","#111111","#6b6b4a"], sizes:["XS","S","M","L","XL"], availSizes:["M","L","XL"], badge:"SALE", emoji:"🧥", rating:4.9, reviews:89 },
  { id:11, nameUk:"Спортивний костюм рібчастий", nameEn:"Ribbed Tracksuit", brand:"UrbanUA", catUk:"Спорт", catEn:"Sportswear", price:1990, oldPrice:null, colors:["#111111","#FFFFFF","#d4a0a0"], sizes:["XS","S","M","L","XL"], availSizes:["XS","S","M","L","XL"], badge:null, emoji:"🩳", rating:4.5, reviews:62 },
  { id:12, nameUk:"Сукня максі в квіти", nameEn:"Maxi Floral Dress", brand:"ModaUA", catUk:"Плаття", catEn:"Dresses", price:2290, oldPrice:2990, colors:["#FEFCE8","#d4a0a0","#4a6741"], sizes:["XS","S","M","L"], availSizes:["XS","S","M"], badge:"SALE", emoji:"🌸", rating:4.7, reviews:54 },
];

const CATEGORIES = [
  { en:"all", uk:"Все" },
  { en:"Dresses", uk:"Плаття" },
  { en:"Tops", uk:"Топи" },
  { en:"Jeans", uk:"Джинси" },
  { en:"Jackets", uk:"Куртки" },
  { en:"Shirts", uk:"Сорочки" },
  { en:"Skirts", uk:"Спідниці" },
  { en:"Trousers", uk:"Брюки" },
  { en:"Blouses", uk:"Блузи" },
  { en:"Coats", uk:"Пальта" },
  { en:"Sportswear", uk:"Спорт" },
];

const ALL_SIZES = ["XS","S","M","L","XL"];
const BRANDS = ["ModaUA","DenimUA","UrbanUA","WarmUA"];

const SIZE_GUIDE = [
  { size:"XS", chest:"80–84", waist:"62–66", hips:"88–92", eu:"32–34", uk:"6–8" },
  { size:"S",  chest:"84–88", waist:"66–70", hips:"92–96", eu:"36–38", uk:"8–10" },
  { size:"M",  chest:"88–92", waist:"70–74", hips:"96–100", eu:"38–40", uk:"10–12" },
  { size:"L",  chest:"92–96", waist:"74–78", hips:"100–104", eu:"40–42", uk:"12–14" },
  { size:"XL", chest:"96–100", waist:"78–82", hips:"104–108", eu:"42–44", uk:"14–16" },
];

const LOOKS = [
  { id: 1, titleUk: "Офісний образ", titleEn: "Office Look", itemsUk: ["Лляна сорочка оверсайз", "Прямі джинси wide leg", "Шовкова блуза"], itemsEn: ["Linen Oversized Shirt", "Wide Leg Straight Jeans", "Silk Bow Blouse"], totalPrice: 4630, emojis: ["👔","👖","👒"], colorClass: "from-stone-200 to-amber-100" },
  { id: 2, titleUk: "Casual вихідний", titleEn: "Weekend Casual", itemsUk: ["Кроп-топ в рубчик", "Брюки карго з кишенями", "Оверсайз бомбер"], itemsEn: ["Ribbed Crop Top", "Cargo Trousers", "Oversized Bomber"], totalPrice: 4930, emojis: ["👚","👖","🧥"], colorClass: "from-green-100 to-stone-200" },
  { id: 3, titleUk: "Вечірній вихід", titleEn: "Evening Out", itemsUk: ["Міді-сукня класик", "Коротка спідниця плісе"], itemsEn: ["Classic Midi Dress", "Pleated Mini Skirt"], totalPrice: 2880, emojis: ["👗","👗"], colorClass: "from-rose-100 to-amber-50" },
];

const CUSTOMER_REVIEWS = [
  { nameUk: "Анна К., Київ", nameEn: "Anna K., Kyiv", textUk: "Замовила оверсайз бомбер — якість просто бомба! Шов рівний, тканина м'яка. Швидка доставка, все відповідає опису.", textEn: "Ordered the Oversized Bomber — quality is amazing! Even seams, soft fabric. Fast delivery, matches description perfectly.", rating: 5, productUk: "Оверсайз бомбер", productEn: "Oversized Bomber", emoji: "👩" },
  { nameUk: "Марія С., Одеса", nameEn: "Mariia S., Odesa", textUk: "Міді-сукня — найкраща покупка цього сезону. Розмірна сітка точна, S підійшов ідеально.", textEn: "The Midi Dress is my best purchase this season. Size chart is accurate, S fit perfectly.", rating: 5, productUk: "Міді-сукня класик", productEn: "Classic Midi Dress", emoji: "🌸" },
  { nameUk: "Тетяна В., Харків", nameEn: "Tetiana V., Kharkiv", textUk: "Лляна сорочка — улюблена річ у гардеробі. Комплектується з усім. Вже замовила другий колір!", textEn: "Linen shirt — my wardrobe staple. Goes with everything. Already ordered a second color!", rating: 5, productUk: "Лляна сорочка оверсайз", productEn: "Linen Oversized Shirt", emoji: "✨" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={i <= Math.round(rating) ? "text-amber-400" : "text-stone-200"} style={{fontSize:"12px"}}>★</span>
      ))}
    </span>
  );
}

export function ModaUADemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [catFilter, setCatFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("new");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<{id:number; size:string; color:string; qty:number}[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [careOpen, setCareOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (catFilter !== "all") list = list.filter(p => p.catEn === catFilter);
    if (sizeFilter !== "all") list = list.filter(p => p.availSizes.includes(sizeFilter));
    if (brandFilter.length > 0) list = list.filter(p => brandFilter.includes(p.brand));
    if (sortBy === "popular") list.sort((a,b) => b.reviews - a.reviews);
    else if (sortBy === "price-asc") list.sort((a,b) => a.price - b.price);
    else if (sortBy === "price-desc") list.sort((a,b) => b.price - a.price);
    else list.sort((a,b) => b.id - a.id);
    return list;
  }, [catFilter, sizeFilter, brandFilter, sortBy]);

  const detail = selectedProduct ? PRODUCTS.find(p => p.id === selectedProduct) : null;
  const cartTotal = cart.reduce((acc, item) => {
    const p = PRODUCTS.find(x => x.id === item.id);
    return acc + (p ? p.price * item.qty : 0);
  }, 0);
  const cartCount = cart.reduce((acc, i) => acc + i.qty, 0);
  const FREE_SHIPPING = 2000;
  const remainingForFree = Math.max(0, FREE_SHIPPING - cartTotal);

  function toggleWishlist(id: number) {
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
  }

  function openProduct(id: number) {
    const p = PRODUCTS.find(x => x.id === id)!;
    setSelectedProduct(id);
    setSelectedSize(p.availSizes[0] || "");
    setSelectedColor(p.colors[0] || "");
    setCareOpen(false);
    setShippingOpen(false);
    setTimeout(() => {
      document.getElementById("moda-detail")?.scrollIntoView({ behavior:"smooth" });
    }, 50);
  }

  function addToCart() {
    if (!detail || !selectedSize) return;
    setCart(c => {
      const idx = c.findIndex(i => i.id === detail.id && i.size === selectedSize && i.color === selectedColor);
      if (idx >= 0) {
        const next = [...c];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...c, { id:detail.id, size:selectedSize, color:selectedColor, qty:1 }];
    });
    setAddedToCart(detail.id);
    setTimeout(() => setAddedToCart(null), 2000);
  }

  function changeQty(id: number, size: string, color: string, delta: number) {
    setCart(c => c.map(i => i.id===id && i.size===size && i.color===color ? {...i, qty: Math.max(1, i.qty+delta)} : i));
  }

  function removeFromCart(id: number, size: string, color: string) {
    setCart(c => c.filter(i => !(i.id===id && i.size===size && i.color===color)));
  }

  function toggleBrand(brand: string) {
    setBrandFilter(b => b.includes(brand) ? b.filter(x => x !== brand) : [...b, brand]);
  }

  const t = (uk: string, en: string) => isUk ? uk : en;

  return (
    <div className="bg-white text-[#111111] font-sans min-h-screen" style={{fontFamily:"Inter, system-ui, sans-serif"}}>

      {/* STICKY NAV */}
      <nav className="sticky top-0 z-40 bg-white dark:bg-neutral-800 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-black text-xl tracking-widest text-[#111111]">MODAUA</span>
            <span className="text-[10px] text-stone-400 font-light tracking-widest hidden sm:block">FASHION</span>
          </div>
          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              t("Жінкам","Women"),
              t("Чоловікам","Men"),
              t("Новинки","New"),
              t("Розпродаж","Sale"),
            ].map(link => (
              <button key={link} className="text-sm text-stone-500 hover:text-[#111111] transition-colors tracking-wide">
                {link}
              </button>
            ))}
          </div>
          {/* Right icons */}
          <div className="flex items-center gap-3">
            <button className="text-lg text-stone-500 hover:text-[#111111] transition-colors">🔍</button>
            <button
              className="relative text-lg text-stone-500 hover:text-[#111111] transition-colors"
              onClick={() => {}}
            >
              ♡
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#111111] text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center leading-none">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              className="relative text-lg text-stone-500 hover:text-[#111111] transition-colors"
              onClick={() => setCartOpen(true)}
            >
              🛍
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#111111] text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden text-lg text-stone-500">☰</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-white py-16 sm:py-24 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: typography */}
            <div>
              <p className="text-xs tracking-[0.3em] text-stone-400 uppercase mb-6">
                {t("Весна–Літо 2025","Spring–Summer 2025")}
              </p>
              <h1
                className="font-black tracking-tighter text-[#111111] leading-none mb-8"
                style={{fontSize:"clamp(48px, 8vw, 96px)"}}
              >
                {isUk ? (
                  <>НОВА<br/>КОЛЕКЦІЯ</>
                ) : (
                  <>NEW<br/>COLLECTION</>
                )}
              </h1>
              <p className="text-stone-500 text-base mb-10 max-w-sm leading-relaxed">
                {t(
                  "Мінімалістична мода для сучасних жінок. Якість, що говорить сама за себе.",
                  "Minimalist fashion for the modern woman. Quality that speaks for itself."
                )}
              </p>
              <div className="flex flex-wrap gap-3 mb-12">
                <button
                  className="bg-[#111111] text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-stone-800 transition-colors"
                  onClick={() => document.getElementById("moda-catalog")?.scrollIntoView({behavior:"smooth"})}
                >
                  {t("Переглянути колекцію","View Collection")}
                </button>
                <button
                  className="border border-[#111111] text-[#111111] px-8 py-3 text-sm tracking-widest uppercase hover:bg-stone-50 transition-colors"
                  onClick={() => { setSortBy("new"); document.getElementById("moda-catalog")?.scrollIntoView({behavior:"smooth"}); }}
                >
                  {t("Новинки","New Arrivals")}
                </button>
              </div>
              {/* Stats */}
              <div className="flex flex-wrap gap-8 text-sm text-stone-500 border-t border-stone-100 pt-8">
                <div>
                  <span className="font-semibold text-[#111111] text-base">8 500+</span>
                  <span className="ml-1">{t("товарів","items")}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#111111] text-base">1–2</span>
                  <span className="ml-1">{t("дні доставки","day delivery")}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#111111] text-base">✓</span>
                  <span className="ml-1">{t("Безкоштовне повернення","Free returns")}</span>
                </div>
              </div>
            </div>
            {/* Right: fashion image mockup */}
            <div className="relative flex items-center justify-center h-80 sm:h-96">
              <div className="absolute inset-0 bg-linear-to-br from-stone-50 via-stone-100 to-stone-200 rounded-none" />
              <div className="absolute top-6 right-8 w-32 h-48 bg-linear-to-b from-[#c8a882]/30 to-[#c8a882]/10 rounded-sm" />
              <div className="absolute bottom-8 left-6 w-24 h-36 bg-linear-to-t from-[#4a6741]/20 to-transparent rounded-sm" />
              <div className="relative z-10 text-center">
                <div className="text-7xl mb-2">👗</div>
                <div className="text-xs text-stone-400 tracking-widest uppercase">{t("Нова колекція","New Collection")}</div>
              </div>
              <div className="absolute top-4 left-4 border border-stone-200 px-2 py-1 text-[10px] tracking-widest text-stone-400 uppercase bg-white">
                SS 2025
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT CATALOG */}
      <section id="moda-catalog" className="py-12 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-8">

            {/* LEFT SIDEBAR */}
            <aside className="hidden md:block w-52 shrink-0 space-y-8 sticky top-16 self-start max-h-[calc(100vh-80px)] overflow-y-auto pb-8">
              {/* Category filter */}
              <div>
                <h3 className="text-[10px] font-semibold tracking-[0.2em] text-stone-400 uppercase mb-3">
                  {t("Категорії","Category")}
                </h3>
                <div className="space-y-1">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.en}
                      onClick={() => setCatFilter(cat.en)}
                      className={`block w-full text-left text-sm py-1.5 px-2 transition-colors ${
                        catFilter === cat.en
                          ? "bg-[#111111] text-white"
                          : "text-stone-600 hover:text-[#111111] hover:bg-stone-50"
                      }`}
                    >
                      {isUk ? cat.uk : (cat.en === "all" ? "All" : cat.en)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size filter */}
              <div>
                <h3 className="text-[10px] font-semibold tracking-[0.2em] text-stone-400 uppercase mb-3">
                  {t("Розмір","Size")}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSizeFilter("all")}
                    className={`px-2.5 py-1 text-xs border transition-colors ${
                      sizeFilter === "all"
                        ? "bg-[#111111] text-white border-[#111111]"
                        : "border-stone-200 text-stone-600 hover:border-[#111111]"
                    }`}
                  >
                    {t("Всі","All")}
                  </button>
                  {ALL_SIZES.map(sz => (
                    <button
                      key={sz}
                      onClick={() => setSizeFilter(sz)}
                      className={`px-2.5 py-1 text-xs border transition-colors ${
                        sizeFilter === sz
                          ? "bg-[#111111] text-white border-[#111111]"
                          : "border-stone-200 text-stone-600 hover:border-[#111111]"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand filter */}
              <div>
                <h3 className="text-[10px] font-semibold tracking-[0.2em] text-stone-400 uppercase mb-3">
                  {t("Бренд","Brand")}
                </h3>
                <div className="space-y-2">
                  {BRANDS.map(brand => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={brandFilter.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-3.5 h-3.5 accent-[#111111]"
                      />
                      <span className="text-sm text-stone-600 group-hover:text-[#111111] transition-colors">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset filters */}
              {(catFilter !== "all" || sizeFilter !== "all" || brandFilter.length > 0) && (
                <button
                  onClick={() => { setCatFilter("all"); setSizeFilter("all"); setBrandFilter([]); }}
                  className="text-xs text-stone-400 underline hover:text-[#111111] transition-colors"
                >
                  {t("Скинути фільтри","Reset filters")}
                </button>
              )}
            </aside>

            {/* MAIN CONTENT */}
            <div className="flex-1 min-w-0">
              {/* Sort bar */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100">
                <p className="text-sm text-stone-500">
                  {t("Показано","Showing")} <span className="font-semibold text-[#111111]">{filtered.length}</span> {t("товарів","items")}
                </p>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="text-sm border border-stone-200 px-3 py-1.5 bg-white text-[#111111] focus:outline-none focus:border-[#111111]"
                >
                  <option value="new">{t("Спочатку нові","Newest first")}</option>
                  <option value="popular">{t("Популярні","Most popular")}</option>
                  <option value="price-asc">{t("Ціна: від низької","Price: low to high")}</option>
                  <option value="price-desc">{t("Ціна: від високої","Price: high to low")}</option>
                </select>
              </div>

              {/* Product grid */}
              {filtered.length === 0 ? (
                <div className="text-center py-24 text-stone-400">
                  <div className="text-4xl mb-4">🔍</div>
                  <p className="text-sm">{t("Товарів не знайдено. Спробуйте інші фільтри.","No items found. Try different filters.")}</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filtered.map(product => (
                    <div
                      key={product.id}
                      className="group bg-white dark:bg-neutral-800 border border-stone-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer relative"
                      onClick={() => openProduct(product.id)}
                    >
                      {/* Badge */}
                      {product.badge && (
                        <div className={`absolute top-2 left-2 z-10 px-2 py-0.5 text-[10px] font-semibold tracking-widest ${
                          product.badge === "SALE" ? "bg-red-500 text-white" : "bg-[#111111] text-white"
                        }`}>
                          {product.badge}
                        </div>
                      )}
                      {/* Wishlist button */}
                      <button
                        className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center bg-white dark:bg-neutral-800 border border-stone-200 hover:border-[#111111] transition-colors"
                        onClick={e => { e.stopPropagation(); toggleWishlist(product.id); }}
                      >
                        <span className={wishlist.includes(product.id) ? "text-red-500" : "text-stone-400"}>
                          {wishlist.includes(product.id) ? "♥" : "♡"}
                        </span>
                      </button>
                      {/* Image area */}
                      <div className="h-64 bg-stone-50 flex flex-col items-center justify-center relative overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product.id)}>
                        <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{product.emoji}</span>
                        {/* Color dots */}
                        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                          {product.colors.map(color => (
                            <div
                              key={color}
                              className="w-3 h-3 rounded-full border border-stone-300"
                              style={{backgroundColor:color}}
                            />
                          ))}
                        </div>
                      </div>
                      {/* Info */}
                      <div className="p-3">
                        <div className="text-[10px] text-stone-400 tracking-wide mb-0.5">{product.brand}</div>
                        <div className="text-sm font-medium text-[#111111] leading-snug mb-1">
                          {isUk ? product.nameUk : product.nameEn}
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          <StarRating rating={product.rating} />
                          <span className="text-[10px] text-stone-400">({product.reviews})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-[#111111]">{product.price.toLocaleString()} ₴</span>
                          {product.oldPrice && (
                            <span className="text-xs text-stone-400 line-through">{product.oldPrice.toLocaleString()} ₴</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT DETAIL */}
      {detail && (
        <section id="moda-detail" className="bg-stone-50 border-b border-stone-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-8">
              <nav className="text-xs text-stone-400 flex items-center gap-2">
                <span>{t("Головна","Home")}</span>
                <span>/</span>
                <span>{isUk ? detail.catUk : detail.catEn}</span>
                <span>/</span>
                <span className="text-[#111111]">{isUk ? detail.nameUk : detail.nameEn}</span>
              </nav>
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-8 h-8 flex items-center justify-center border border-stone-200 bg-white hover:bg-stone-100 transition-colors text-stone-500"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Left: image gallery */}
              <div>
                {/* Main image */}
                <div className="bg-white border border-stone-200 h-80 flex items-center justify-center mb-3">
                  <span className="text-8xl">{detail.emoji}</span>
                </div>
                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-2">
                  {[0,1,2,3].map(i => (
                    <div key={i} className="bg-white border border-stone-200 h-20 flex items-center justify-center cursor-pointer hover:border-[#111111] transition-colors">
                      <span className="text-2xl opacity-60">{detail.emoji}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: details */}
              <div>
                <div className="inline-block border border-stone-200 px-2 py-0.5 text-[10px] tracking-widest text-stone-500 uppercase mb-3">
                  {detail.brand}
                </div>
                <h2 className="text-2xl font-bold text-[#111111] mb-3">
                  {isUk ? detail.nameUk : detail.nameEn}
                </h2>
                <div className="flex items-center gap-2 mb-5">
                  <StarRating rating={detail.rating} />
                  <span className="text-sm text-stone-400">{detail.rating} ({detail.reviews} {t("відгуків","reviews")})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-bold text-[#111111]">{detail.price.toLocaleString()} ₴</span>
                  {detail.oldPrice && (
                    <>
                      <span className="text-lg text-stone-400 line-through">{detail.oldPrice.toLocaleString()} ₴</span>
                      <span className="text-sm font-semibold text-red-500">
                        -{Math.round((1 - detail.price / detail.oldPrice) * 100)}%
                      </span>
                    </>
                  )}
                </div>

                {/* Colors */}
                <div className="mb-5">
                  <div className="text-xs text-stone-500 tracking-wide uppercase mb-2">
                    {t("Колір","Color")}
                  </div>
                  <div className="flex gap-2">
                    {detail.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColor === color
                            ? "border-[#111111] ring-2 ring-[#111111] ring-offset-2"
                            : "border-stone-300 hover:border-stone-500"
                        }`}
                        style={{backgroundColor: color}}
                      />
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-stone-500 tracking-wide uppercase">{t("Розмір","Size")}</span>
                    <button
                      onClick={() => setSizeGuideOpen(true)}
                      className="text-xs text-stone-500 underline hover:text-[#111111] transition-colors"
                    >
                      {t("Розмірна сітка","Size Guide")}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {detail.sizes.map(sz => {
                      const avail = detail.availSizes.includes(sz);
                      return (
                        <button
                          key={sz}
                          disabled={!avail}
                          onClick={() => avail && setSelectedSize(sz)}
                          className={`w-12 h-10 text-sm border transition-all ${
                            !avail
                              ? "border-stone-100 text-stone-300 cursor-not-allowed line-through"
                              : selectedSize === sz
                              ? "bg-[#111111] text-white border-[#111111]"
                              : "border-stone-200 text-[#111111] hover:border-[#111111]"
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Add to cart */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={addToCart}
                    disabled={!selectedSize}
                    className={`flex-1 py-3.5 text-sm font-semibold tracking-widest uppercase transition-all ${
                      !selectedSize
                        ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                        : addedToCart === detail.id
                        ? "bg-green-600 text-white"
                        : "bg-[#111111] text-white hover:bg-stone-800"
                    }`}
                  >
                    {addedToCart === detail.id
                      ? (isUk ? "✓ Додано" : "✓ Added")
                      : !selectedSize
                      ? t("Оберіть розмір","Select size")
                      : t("Додати до кошика","Add to Cart")}
                  </button>
                  <button
                    onClick={() => toggleWishlist(detail.id)}
                    className="w-12 h-12 flex items-center justify-center border border-stone-200 hover:border-[#111111] transition-colors"
                  >
                    <span className={wishlist.includes(detail.id) ? "text-red-500" : "text-stone-400"}>
                      {wishlist.includes(detail.id) ? "♥" : "♡"}
                    </span>
                  </button>
                </div>

                {/* Accordions */}
                <div className="border-t border-stone-200">
                  <button
                    onClick={() => setCareOpen(v => !v)}
                    className="w-full flex items-center justify-between py-4 text-sm font-medium text-[#111111] hover:text-stone-600 transition-colors"
                  >
                    <span>{t("Склад та догляд","Materials & Care")}</span>
                    <span className="text-stone-400">{careOpen ? "−" : "+"}</span>
                  </button>
                  {careOpen && (
                    <div className="pb-4 text-sm text-stone-500 leading-relaxed border-b border-stone-100">
                      {t(
                        "100% бавовна преміум класу. Прання при 30°C. Не вибілювати. Прасувати при помірній температурі.",
                        "100% premium cotton. Wash at 30°C. Do not bleach. Iron at moderate temperature."
                      )}
                    </div>
                  )}
                  <button
                    onClick={() => setShippingOpen(v => !v)}
                    className="w-full flex items-center justify-between py-4 text-sm font-medium text-[#111111] hover:text-stone-600 transition-colors"
                  >
                    <span>{t("Доставка та повернення","Shipping & Returns")}</span>
                    <span className="text-stone-400">{shippingOpen ? "−" : "+"}</span>
                  </button>
                  {shippingOpen && (
                    <div className="pb-4 text-sm text-stone-500 leading-relaxed">
                      {t(
                        "Доставка Новою Поштою 1–2 дні. Безкоштовно від 2 000 ₴. Повернення протягом 30 днів.",
                        "Delivery via Nova Poshta 1–2 days. Free over 2 000 ₴. Returns within 30 days."
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── LOOKBOOK SECTION */}
      <section className="py-16 border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-stone-400 text-xs font-semibold uppercase tracking-widest mb-1">
                {isUk ? "Образи сезону" : "Season Looks"}
              </p>
              <h2 className="text-3xl font-black text-stone-900 tracking-tight">
                {isUk ? "Готові образи" : "Complete Looks"}
              </h2>
            </div>
            <p className="text-stone-400 text-sm hidden md:block">
              {isUk ? "Підбираємо образи, ви лише купуєте" : "We style, you shop"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LOOKS.map(look => (
              <div key={look.id} className={`bg-linear-to-br ${look.colorClass} rounded-3xl p-6 flex flex-col gap-4`}>
                <div className="flex gap-2">
                  {look.emojis.map((em, i) => (
                    <div key={i} className="w-16 h-16 bg-white/80 backdrop-blur rounded-2xl flex items-center justify-center text-3xl shadow-sm">
                      {em}
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="font-black text-stone-900 text-lg">{isUk ? look.titleUk : look.titleEn}</h3>
                  <ul className="mt-2 space-y-1">
                    {(isUk ? look.itemsUk : look.itemsEn).map((item, i) => (
                      <li key={i} className="text-stone-600 text-sm flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/50">
                  <span className="text-stone-700 text-sm font-semibold">{isUk ? "Весь образ:" : "Full look:"}</span>
                  <span className="font-black text-stone-900">{look.totalPrice.toLocaleString("uk-UA")} ₴</span>
                </div>
                <button className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-black text-sm rounded-2xl transition-colors">
                  {isUk ? "Придбати образ" : "Shop this look"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CUSTOMER REVIEWS SECTION */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-stone-900 mb-2">
              {isUk ? "Що кажуть покупці" : "What customers say"}
            </h2>
            <div className="flex items-center justify-center gap-6 text-sm text-stone-400 mt-3">
              <span>⭐ <strong className="text-stone-700">4.8</strong> {isUk ? "рейтинг" : "rating"}</span>
              <span>💬 <strong className="text-stone-700">3 400+</strong> {isUk ? "відгуків" : "reviews"}</span>
              <span>🔄 <strong className="text-stone-700">62%</strong> {isUk ? "купують знову" : "repeat buyers"}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CUSTOMER_REVIEWS.map((r, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
                <div className="flex gap-0.5 mb-3">
                  {[1,2,3,4,5].map(s => (
                    <span key={s} className={s <= r.rating ? "text-amber-400" : "text-stone-200"} style={{fontSize:"14px"}}>★</span>
                  ))}
                </div>
                <p className="text-stone-700 text-sm leading-relaxed mb-4">"{isUk ? r.textUk : r.textEn}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-lg">{r.emoji}</div>
                    <span className="font-semibold text-stone-800 text-sm">{isUk ? r.nameUk : r.nameEn}</span>
                  </div>
                  <span className="text-xs text-stone-400 bg-stone-50 px-2 py-1 rounded-lg">
                    {isUk ? r.productUk : r.productEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECENTLY VIEWED */}
      <section className="py-12 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-xs tracking-[0.25em] text-stone-400 uppercase mb-6">
            {t("Нещодавно переглянуті","Recently Viewed")}
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {PRODUCTS.slice(0, 6).map(product => (
              <div
                key={product.id}
                className="shrink-0 w-36 cursor-pointer group"
                onClick={() => openProduct(product.id)}
              >
                <div className="w-36 h-44 bg-stone-50 border border-stone-100 flex items-center justify-center mb-2 group-hover:shadow-md transition-shadow">
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-200">{product.emoji}</span>
                </div>
                <div className="text-xs text-stone-500 truncate">{isUk ? product.nameUk : product.nameEn}</div>
                <div className="text-xs font-semibold text-[#111111]">{product.price.toLocaleString()} ₴</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-stone-200 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="font-black text-xl tracking-widest text-[#111111] mb-3">MODAUA</div>
              <p className="text-sm text-stone-500 leading-relaxed">
                {t(
                  "Мінімалістична мода з України. Якість і стиль у кожній деталі.",
                  "Minimalist fashion from Ukraine. Quality and style in every detail."
                )}
              </p>
            </div>
            {/* Catalog */}
            <div>
              <h4 className="text-[10px] font-semibold tracking-[0.2em] text-stone-400 uppercase mb-4">
                {t("Каталог","Catalog")}
              </h4>
              <ul className="space-y-2">
                {[t("Жінкам","Women"), t("Чоловікам","Men"), t("Новинки","New Arrivals"), t("Розпродаж","Sale"), t("Колекції","Collections")].map(item => (
                  <li key={item}>
                    <button className="text-sm text-stone-500 hover:text-[#111111] transition-colors">{item}</button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Customer */}
            <div>
              <h4 className="text-[10px] font-semibold tracking-[0.2em] text-stone-400 uppercase mb-4">
                {t("Клієнтам","Customer")}
              </h4>
              <ul className="space-y-2">
                {[
                  t("Доставка і оплата","Shipping & Payment"),
                  t("Повернення","Returns"),
                  t("Розміри","Size Guide"),
                  t("Програма лояльності","Loyalty Program"),
                  t("FAQ","FAQ"),
                ].map(item => (
                  <li key={item}>
                    <button className="text-sm text-stone-500 hover:text-[#111111] transition-colors">{item}</button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Contact */}
            <div>
              <h4 className="text-[10px] font-semibold tracking-[0.2em] text-stone-400 uppercase mb-4">
                {t("Контакти","Contact")}
              </h4>
              <ul className="space-y-2">
                <li className="text-sm text-stone-500">info@modaua.com</li>
                <li className="text-sm text-stone-500">+38 (044) 000-00-00</li>
                <li className="text-sm text-stone-500">{t("Пн–Пт: 9:00–18:00","Mon–Fri: 9:00–18:00")}</li>
              </ul>
              <div className="flex gap-3 mt-4">
                {["IG","TG","FB"].map(s => (
                  <button key={s} className="w-8 h-8 border border-stone-200 flex items-center justify-center text-[10px] text-stone-500 hover:border-[#111111] hover:text-[#111111] transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-stone-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
            <span>© 2025 ModaUA. {t("Всі права захищені","All rights reserved")}</span>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <span className="border border-stone-200 px-1.5 py-0.5 text-[10px]">VISA</span>
                <span className="border border-stone-200 px-1.5 py-0.5 text-[10px]">MC</span>
              </div>
              <span className="text-stone-300">|</span>
              <span>{t("Демо — портфоліо Codeworth","Demo — Codeworth portfolio")}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── PRODUCT DETAIL MODAL */}
      {selectedProduct && (() => {
        const p = PRODUCTS.find(x => x.id === selectedProduct)!;
        const inCart = wishlist.includes(p.id); // reuse wishlist check for demo
        const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : null;
        return (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
            <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-5 border-b border-stone-100">
                <span className="text-stone-400 text-xs font-semibold uppercase tracking-widest">{isUk ? p.catUk : p.catEn}</span>
                <button onClick={() => setSelectedProduct(null)} className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500">✕</button>
              </div>
              <div className="p-6 grid md:grid-cols-2 gap-6">
                <div className="h-56 bg-stone-50 rounded-2xl flex items-center justify-center text-8xl">{p.emoji}</div>
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-stone-400 text-xs">{p.brand}</p>
                    <h2 className="font-black text-stone-900 text-xl mt-0.5">{isUk ? p.nameUk : p.nameEn}</h2>
                  </div>
                  <StarRating rating={p.rating} />
                  <span className="text-stone-400 text-xs">({p.reviews} {isUk ? "відгуків" : "reviews"})</span>
                  {/* Colors */}
                  <div className="flex gap-2">
                    {p.colors.map(c => (
                      <button key={c} className="w-6 h-6 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform" style={{backgroundColor: c}} />
                    ))}
                  </div>
                  {/* Sizes */}
                  <div className="flex gap-2 flex-wrap">
                    {p.sizes.map(s => (
                      <button key={s} className={`w-10 h-10 rounded-xl text-sm font-bold border-2 transition-colors ${p.availSizes.includes(s) ? "border-stone-200 hover:border-stone-900 text-stone-700" : "border-stone-100 text-stone-300 line-through cursor-not-allowed"}`}>{s}</button>
                    ))}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-stone-900">{p.price.toLocaleString("uk-UA")} ₴</span>
                    {p.oldPrice && <span className="text-stone-400 line-through text-sm">{p.oldPrice.toLocaleString("uk-UA")} ₴</span>}
                    {discount && <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-lg">-{discount}%</span>}
                  </div>
                  <button
                    onClick={() => { /* add to cart logic */ setSelectedProduct(null); }}
                    className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-black text-sm rounded-2xl transition-colors"
                  >
                    {isUk ? "Додати до кошика" : "Add to cart"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* MINI-CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setCartOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-white dark:bg-neutral-800 shadow-2xl flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 shrink-0">
              <h2 className="text-sm font-semibold tracking-widest uppercase text-[#111111]">
                {t("Кошик","Cart")}
                {cartCount > 0 && <span className="ml-2 text-stone-400 font-normal">({cartCount})</span>}
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-[#111111] border border-stone-200 hover:border-[#111111] transition-colors"
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="text-4xl mb-4">🛍</div>
                <p className="text-sm text-stone-500 mb-6">
                  {t("Ваш кошик порожній","Your cart is empty")}
                </p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="bg-[#111111] text-white px-6 py-3 text-sm tracking-widest uppercase hover:bg-stone-800 transition-colors"
                >
                  {t("Перейти до каталогу","Browse Catalog")}
                </button>
              </div>
            ) : (
              <>
                {/* Free shipping progress */}
                {remainingForFree > 0 && (
                  <div className="px-5 py-3 bg-stone-50 border-b border-stone-100 shrink-0">
                    <p className="text-xs text-stone-500 mb-1.5">
                      {t("До безкоштовної доставки:","Free shipping in:")} <span className="font-semibold text-[#111111]">{remainingForFree.toLocaleString()} ₴</span>
                    </p>
                    <div className="h-1 bg-stone-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#111111] transition-all duration-500"
                        style={{width:`${Math.min(100, (cartTotal / FREE_SHIPPING) * 100)}%`}}
                      />
                    </div>
                  </div>
                )}
                {remainingForFree === 0 && (
                  <div className="px-5 py-2.5 bg-green-50 border-b border-green-100 text-xs text-green-700 shrink-0">
                    ✓ {t("Безкоштовна доставка!","Free shipping!")}
                  </div>
                )}

                {/* Cart items */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                  {cart.map(item => {
                    const p = PRODUCTS.find(x => x.id === item.id)!;
                    return (
                      <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
                        <div className="w-16 h-20 bg-stone-50 border border-stone-100 flex items-center justify-center shrink-0">
                          <span className="text-2xl">{p.emoji}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-[#111111] leading-snug mb-0.5 truncate">
                            {isUk ? p.nameUk : p.nameEn}
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] text-stone-400">{item.size}</span>
                            <div
                              className="w-3 h-3 rounded-full border border-stone-300"
                              style={{backgroundColor: item.color}}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-stone-200">
                              <button
                                onClick={() => changeQty(item.id, item.size, item.color, -1)}
                                className="w-6 h-6 text-xs flex items-center justify-center hover:bg-stone-50 transition-colors"
                              >−</button>
                              <span className="w-6 text-center text-xs">{item.qty}</span>
                              <button
                                onClick={() => changeQty(item.id, item.size, item.color, 1)}
                                className="w-6 h-6 text-xs flex items-center justify-center hover:bg-stone-50 transition-colors"
                              >+</button>
                            </div>
                            <span className="text-sm font-semibold text-[#111111]">
                              {(p.price * item.qty).toLocaleString()} ₴
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id, item.size, item.color)}
                          className="text-stone-300 hover:text-stone-600 transition-colors self-start mt-0.5 text-sm"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom */}
                <div className="px-5 py-4 border-t border-stone-200 space-y-3 shrink-0">
                  {/* Promo code */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      placeholder={t("Промокод","Promo code")}
                      className="flex-1 border border-stone-200 px-3 py-2 text-xs text-[#111111] placeholder-stone-400 focus:outline-none focus:border-[#111111]"
                    />
                    <button className="border border-stone-200 px-3 py-2 text-xs text-stone-500 hover:border-[#111111] hover:text-[#111111] transition-colors whitespace-nowrap">
                      {t("Застосувати","Apply")}
                    </button>
                  </div>
                  {/* Total */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-stone-500">{t("Разом","Total")}</span>
                    <span className="text-lg font-bold text-[#111111]">{cartTotal.toLocaleString()} ₴</span>
                  </div>
                  {/* Checkout */}
                  <button className="w-full bg-[#111111] text-white py-3.5 text-sm font-semibold tracking-widest uppercase hover:bg-stone-800 transition-colors">
                    {t("Оформити замовлення","Checkout")}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* SIZE GUIDE MODAL */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setSizeGuideOpen(false)}
          />
          <div className="relative bg-white dark:bg-neutral-800 shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
              <h3 className="text-sm font-semibold tracking-widest uppercase text-[#111111]">
                {t("Розмірна сітка","Size Guide")}
              </h3>
              <button
                onClick={() => setSizeGuideOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-[#111111] border border-stone-200 hover:border-[#111111] transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-stone-200">
                    <th className="text-left py-2 px-3 text-[10px] tracking-widest text-stone-400 uppercase font-semibold">{t("Розмір","Size")}</th>
                    <th className="text-left py-2 px-3 text-[10px] tracking-widest text-stone-400 uppercase font-semibold">EU</th>
                    <th className="text-left py-2 px-3 text-[10px] tracking-widest text-stone-400 uppercase font-semibold">UK</th>
                    <th className="text-left py-2 px-3 text-[10px] tracking-widest text-stone-400 uppercase font-semibold">{t("Груди, см","Chest, cm")}</th>
                    <th className="text-left py-2 px-3 text-[10px] tracking-widest text-stone-400 uppercase font-semibold">{t("Талія, см","Waist, cm")}</th>
                    <th className="text-left py-2 px-3 text-[10px] tracking-widest text-stone-400 uppercase font-semibold">{t("Стегна, см","Hips, cm")}</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_GUIDE.map((row, i) => (
                    <tr key={row.size} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                      <td className="py-2.5 px-3 font-semibold text-[#111111]">{row.size}</td>
                      <td className="py-2.5 px-3 text-stone-600">{row.eu}</td>
                      <td className="py-2.5 px-3 text-stone-600">{row.uk}</td>
                      <td className="py-2.5 px-3 text-stone-600">{row.chest}</td>
                      <td className="py-2.5 px-3 text-stone-600">{row.waist}</td>
                      <td className="py-2.5 px-3 text-stone-600">{row.hips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-stone-400 mt-4">
                {t(
                  "Виміри наведені в сантиметрах. Якщо ваші виміри між розмірами — обирайте більший.",
                  "Measurements are in centimetres. If your measurements fall between sizes, choose the larger size."
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
