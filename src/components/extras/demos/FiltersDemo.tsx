"use client";

import { useState } from "react";

interface Props {
  variant: string;
  isUk: boolean;
}

// ── Fashion store data ──────────────────────────────────────────────
const FASHION_PRODUCTS = [
  { id: 1, name: "Oversize Hoodie", nameUk: "Худі оверсайз", price: 1290, size: ["S", "M", "L"], color: "black", brand: "Urban" },
  { id: 2, name: "Linen Blazer", nameUk: "Льняний блейзер", price: 3490, size: ["S", "M"], color: "beige", brand: "Moda" },
  { id: 3, name: "Cargo Pants", nameUk: "Карго штани", price: 2190, size: ["M", "L", "XL"], color: "green", brand: "Urban" },
  { id: 4, name: "Silk Blouse", nameUk: "Шовкова блуза", price: 1890, size: ["S", "M", "L"], color: "white", brand: "Lumé" },
  { id: 5, name: "Denim Jacket", nameUk: "Джинсова куртка", price: 2790, size: ["M", "L", "XL"], color: "blue", brand: "Moda" },
  { id: 6, name: "Knit Dress", nameUk: "В'язана сукня", price: 1690, size: ["S", "M"], color: "beige", brand: "Lumé" },
];

const COLORS = [
  { id: "black", label: "Black", labelUk: "Чорний", hex: "#1a1a1a" },
  { id: "beige", label: "Beige", labelUk: "Бежевий", hex: "#d4b896" },
  { id: "white", label: "White", labelUk: "Білий", hex: "#f5f5f5" },
  { id: "green", label: "Green", labelUk: "Зелений", hex: "#4a7c59" },
  { id: "blue", label: "Blue", labelUk: "Синій", hex: "#3b5998" },
];

// ── Electronics store data ──────────────────────────────────────────
const ELECTRONICS = [
  { id: 1, name: 'MacBook Air 15"', nameUk: 'MacBook Air 15"', price: 56990, ram: "16GB", storage: "512GB", brand: "Apple" },
  { id: 2, name: "Dell XPS 15", nameUk: "Dell XPS 15", price: 49900, ram: "32GB", storage: "1TB", brand: "Dell" },
  { id: 3, name: "Lenovo ThinkPad X1", nameUk: "Lenovo ThinkPad X1", price: 44900, ram: "16GB", storage: "512GB", brand: "Lenovo" },
  { id: 4, name: "ASUS ZenBook 14", nameUk: "ASUS ZenBook 14", price: 32900, ram: "16GB", storage: "512GB", brand: "ASUS" },
  { id: 5, name: "HP Spectre x360", nameUk: "HP Spectre x360", price: 51900, ram: "32GB", storage: "1TB", brand: "HP" },
  { id: 6, name: "Acer Swift Go 14", nameUk: "Acer Swift Go 14", price: 28900, ram: "16GB", storage: "512GB", brand: "Acer" },
];

function FashionFilters({ isUk }: { isUk: boolean }) {
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [brands, setBrands] = useState<string[]>([]);
  const [sort, setSort] = useState("new");

  const toggleSize = (s: string) =>
    setSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  const toggleColor = (c: string) =>
    setColors((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  const toggleBrand = (b: string) =>
    setBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));

  const filtered = FASHION_PRODUCTS.filter((p) => {
    if (sizes.length && !sizes.some((s) => p.size.includes(s))) return false;
    if (colors.length && !colors.includes(p.color)) return false;
    if (p.price > maxPrice) return false;
    if (brands.length && !brands.includes(p.brand)) return false;
    return true;
  }).sort((a, b) => sort === "asc" ? a.price - b.price : sort === "desc" ? b.price - a.price : 0);

  const activeCount = sizes.length + colors.length + brands.length + (maxPrice < 5000 ? 1 : 0);

  return (
    <div className="bg-white">
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Фільтрація каталогу — Fashion Store" : "Catalog Filters — Fashion Store"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk ? "Мультифільтри: розміри, кольори, бренд, ціна, сортування." : "Multi-filters: sizes, colors, brand, price, sorting."}
      </p>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="w-full lg:w-64 shrink-0 space-y-6">
          {/* Active filters */}
          {activeCount > 0 && (
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button key={s} onClick={() => toggleSize(s)} className="flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium">
                  {s} ×
                </button>
              ))}
              {colors.map((c) => (
                <button key={c} onClick={() => toggleColor(c)} className="flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium">
                  {COLORS.find((x) => x.id === c)?.[isUk ? "labelUk" : "label"]} ×
                </button>
              ))}
              {brands.map((b) => (
                <button key={b} onClick={() => toggleBrand(b)} className="flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium">
                  {b} ×
                </button>
              ))}
              <button
                onClick={() => { setSizes([]); setColors([]); setBrands([]); setMaxPrice(5000); }}
                className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-xs"
              >
                {isUk ? "Очистити все" : "Clear all"}
              </button>
            </div>
          )}

          {/* Size */}
          <div>
            <p className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">{isUk ? "Розмір" : "Size"}</p>
            <div className="flex flex-wrap gap-2">
              {["S", "M", "L", "XL"].map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSize(s)}
                  className={`w-12 h-10 rounded-lg border text-sm font-medium transition-all ${
                    sizes.includes(s)
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-indigo-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <p className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">{isUk ? "Колір" : "Color"}</p>
            <div className="flex flex-wrap gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => toggleColor(c.id)}
                  title={isUk ? c.labelUk : c.label}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    colors.includes(c.id) ? "border-indigo-600 scale-110" : "border-transparent"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <div className="flex justify-between mb-2">
              <p className="text-sm font-semibold text-neutral-900">{isUk ? "Ціна" : "Price"}</p>
              <p className="text-sm text-indigo-600 font-medium">{isUk ? `до ${maxPrice} ₴` : `up to ₴${maxPrice}`}</p>
            </div>
            <input
              type="range"
              min={500}
              max={5000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-neutral-400 mt-1">
              <span>500 ₴</span><span>5 000 ₴</span>
            </div>
          </div>

          {/* Brand */}
          <div>
            <p className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">{isUk ? "Бренд" : "Brand"}</p>
            {["Urban", "Moda", "Lumé"].map((b) => (
              <label key={b} className="flex items-center gap-2 cursor-pointer mb-2">
                <input
                  type="checkbox"
                  checked={brands.includes(b)}
                  onChange={() => toggleBrand(b)}
                  className="accent-indigo-600 w-4 h-4"
                />
                <span className="text-sm text-neutral-700">{b}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-neutral-500">
              {isUk ? `Знайдено ${filtered.length} товарів` : `Found ${filtered.length} items`}
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-1.5 text-neutral-700"
            >
              <option value="new">{isUk ? "Новинки" : "Newest"}</option>
              <option value="asc">{isUk ? "Ціна ↑" : "Price ↑"}</option>
              <option value="desc">{isUk ? "Ціна ↓" : "Price ↓"}</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.length === 0 ? (
              <p className="col-span-3 text-center text-neutral-400 py-12">
                {isUk ? "Товарів не знайдено. Спробуйте інші фільтри." : "No items found. Try other filters."}
              </p>
            ) : (
              filtered.map((p) => (
                <div key={p.id} className="rounded-xl border border-neutral-100 dark:border-neutral-700 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-40 bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                    <span className="text-4xl">👕</span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-neutral-400 mb-1">{p.brand}</p>
                    <p className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">{isUk ? p.nameUk : p.name}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {p.size.map((s) => (
                        <span key={s} className="text-xs px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-600">{s}</span>
                      ))}
                    </div>
                    <p className="font-bold text-neutral-900">{p.price.toLocaleString("uk-UA")} ₴</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ElectronicsFilters({ isUk }: { isUk: boolean }) {
  const [rams, setRams] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(60000);

  const toggleRam = (r: string) =>
    setRams((prev) => (prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]));
  const toggleBrand = (b: string) =>
    setBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));

  const filtered = ELECTRONICS.filter((p) => {
    if (rams.length && !rams.includes(p.ram)) return false;
    if (brands.length && !brands.includes(p.brand)) return false;
    if (p.price > maxPrice) return false;
    return true;
  });

  return (
    <div className="bg-white">
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Фільтрація каталогу — Магазин електроніки" : "Catalog Filters — Electronics Store"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk ? "Технічні характеристики: RAM, бренд, ціна. Динамічно по категорії." : "Tech specs: RAM, brand, price. Dynamic per category."}
      </p>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 shrink-0 space-y-6">
          <div>
            <p className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">RAM</p>
            {["16GB", "32GB"].map((r) => (
              <label key={r} className="flex items-center gap-2 cursor-pointer mb-2">
                <input type="checkbox" checked={rams.includes(r)} onChange={() => toggleRam(r)} className="accent-cyan-500 w-4 h-4" />
                <span className="text-sm text-neutral-300">{r}</span>
              </label>
            ))}
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <p className="text-sm font-semibold text-neutral-300">{isUk ? "Ціна" : "Price"}</p>
              <p className="text-sm text-cyan-400 font-medium">{isUk ? `до ${maxPrice.toLocaleString("uk-UA")} ₴` : `up to ₴${maxPrice.toLocaleString()}`}</p>
            </div>
            <input type="range" min={20000} max={60000} step={1000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-cyan-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-300 mb-3">{isUk ? "Бренд" : "Brand"}</p>
            {["Apple", "Dell", "Lenovo", "ASUS", "HP", "Acer"].map((b) => (
              <label key={b} className="flex items-center gap-2 cursor-pointer mb-2">
                <input type="checkbox" checked={brands.includes(b)} onChange={() => toggleBrand(b)} className="accent-cyan-500 w-4 h-4" />
                <span className="text-sm text-neutral-300">{b}</span>
              </label>
            ))}
          </div>
        </aside>
        <div className="flex-1">
          <p className="text-sm text-neutral-400 mb-4">
            {isUk ? `Знайдено ${filtered.length} ноутбуків` : `Found ${filtered.length} laptops`}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.length === 0 ? (
              <p className="col-span-3 text-center text-neutral-500 dark:text-neutral-400 py-12">
                {isUk ? "Не знайдено. Змініть фільтри." : "Not found. Change filters."}
              </p>
            ) : (
              filtered.map((p) => (
                <div key={p.id} className="rounded-xl border border-neutral-700 bg-neutral-800 overflow-hidden">
                  <div className="h-36 bg-neutral-700 flex items-center justify-center">
                    <span className="text-4xl">💻</span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-cyan-400 mb-1">{p.brand}</p>
                    <p className="font-semibold text-white text-sm mb-2">{isUk ? p.nameUk : p.name}</p>
                    <div className="flex gap-2 mb-3">
                      <span className="text-xs px-2 py-0.5 bg-neutral-700 rounded text-neutral-300">{p.ram}</span>
                      <span className="text-xs px-2 py-0.5 bg-neutral-700 rounded text-neutral-300">{p.storage}</span>
                    </div>
                    <p className="font-bold text-white">{p.price.toLocaleString("uk-UA")} ₴</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FiltersDemo({ variant, isUk }: Props) {
  if (variant === "electronics-filters") {
    return (
      <div className="bg-slate-900 rounded-3xl p-6 md:p-10">
        <ElectronicsFilters isUk={isUk} />
      </div>
    );
  }
  return <FashionFilters isUk={isUk} />;
}
