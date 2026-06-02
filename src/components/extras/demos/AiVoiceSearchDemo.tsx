"use client";

import { useState } from "react";

interface Props {
  variant: string;
  isUk: boolean;
}

interface Product {
  id: number;
  name: string;
  nameUk: string;
  price: number;
  category: string;
  categoryUk: string;
  emoji: string;
  tags: string[];
  tagsUk: string[];
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Wireless Headphones", nameUk: "Бездротові навушники", price: 2499, category: "Electronics", categoryUk: "Електроніка", emoji: "🎧", tags: ["wireless", "music", "audio", "bluetooth", "headphones"], tagsUk: ["бездротові", "музика", "аудіо", "навушники", "bluetooth"] },
  { id: 2, name: "Running Shoes", nameUk: "Кросівки для бігу", price: 3200, category: "Sports", categoryUk: "Спорт", emoji: "👟", tags: ["running", "sport", "fitness", "shoes", "exercise"], tagsUk: ["біг", "спорт", "фітнес", "кросівки", "вправи"] },
  { id: 3, name: "Floral Perfume", nameUk: "Квіткові парфуми", price: 1800, category: "Beauty", categoryUk: "Краса", emoji: "🌸", tags: ["perfume", "gift", "for her", "beauty", "flowers", "fragrance"], tagsUk: ["парфуми", "подарунок", "для неї", "краса", "квіти", "аромат"] },
  { id: 4, name: "Laptop Stand", nameUk: "Підставка для ноутбука", price: 890, category: "Electronics", categoryUk: "Електроніка", emoji: "💻", tags: ["laptop", "work", "office", "desk", "tech"], tagsUk: ["ноутбук", "робота", "офіс", "стіл", "техніка"] },
  { id: 5, name: "Yoga Mat", nameUk: "Килимок для йоги", price: 650, category: "Sports", categoryUk: "Спорт", emoji: "🧘", tags: ["yoga", "fitness", "sport", "exercise", "running", "budget"], tagsUk: ["йога", "фітнес", "спорт", "вправи", "недорого"] },
  { id: 6, name: "Scented Candle Set", nameUk: "Набір ароматичних свічок", price: 520, category: "Home", categoryUk: "Дім", emoji: "🕯️", tags: ["gift", "for her", "home", "decor", "budget", "fragrance"], tagsUk: ["подарунок", "для неї", "дім", "декор", "недорого", "аромат"] },
  { id: 7, name: "Coffee Grinder", nameUk: "Кавомолка", price: 1350, category: "Kitchen", categoryUk: "Кухня", emoji: "☕", tags: ["coffee", "kitchen", "home", "morning", "budget"], tagsUk: ["кава", "кухня", "дім", "ранок", "недорого"] },
  { id: 8, name: "Bluetooth Speaker", nameUk: "Bluetooth колонка", price: 1990, category: "Electronics", categoryUk: "Електроніка", emoji: "🔊", tags: ["wireless", "music", "audio", "bluetooth", "speaker", "budget"], tagsUk: ["бездротові", "музика", "аудіо", "bluetooth", "колонка", "недорого"] },
];

const PRESET_QUERIES = [
  { uk: "бездротові навушники", en: "wireless headphones", tags: ["wireless", "audio", "bluetooth", "headphones", "music", "бездротові", "навушники", "аудіо"] },
  { uk: "для спорту", en: "for running", tags: ["running", "sport", "fitness", "yoga", "exercise", "спорт", "біг", "фітнес", "йога"] },
  { uk: "подарунок для неї", en: "gift for her", tags: ["gift", "for her", "beauty", "flowers", "fragrance", "подарунок", "для неї", "краса", "квіти", "аромат"] },
  { uk: "недорого", en: "budget friendly", tags: ["budget", "недорого"] },
];

function matchProducts(query: string, products: Product[], isUk: boolean): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return products;

  return products.filter((p) => {
    const name = (isUk ? p.nameUk : p.name).toLowerCase();
    const category = (isUk ? p.categoryUk : p.category).toLowerCase();
    const allTags = [...p.tags, ...p.tagsUk];
    return (
      name.includes(q) ||
      category.includes(q) ||
      q.split(" ").some((word) => word.length > 2 && (name.includes(word) || category.includes(word) || allTags.some((t) => t.includes(word))))
    );
  });
}

function matchProductsByPreset(presetTags: string[], products: Product[]): Product[] {
  return products.filter((p) => {
    const allTags = [...p.tags, ...p.tagsUk];
    return presetTags.some((pt) => allTags.some((t) => t === pt || t.includes(pt)));
  });
}

export function AiVoiceSearchDemo({ isUk }: Props) {
  const [query, setQuery] = useState("");
  const [listening, setListening] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [heard, setHeard] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [searched, setSearched] = useState(false);

  function doSearch(q: string, presetTags?: string[]) {
    setProcessing(true);
    setSearched(false);
    setTimeout(() => {
      setProcessing(false);
      setSearched(true);
      const matched = presetTags
        ? matchProductsByPreset(presetTags, PRODUCTS)
        : matchProducts(q, PRODUCTS, isUk);
      setResults(matched);
    }, 900);
  }

  function handlePreset(preset: (typeof PRESET_QUERIES)[0]) {
    const q = isUk ? preset.uk : preset.en;
    setQuery(q);
    setHeard(q);
    setSearched(false);
    doSearch(q, preset.tags);
  }

  function handleTextSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setHeard(query);
    doSearch(query);
  }

  function handleVoiceButton() {
    if (
      typeof window !== "undefined" &&
      ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    ) {
      type AnySR = { new (): { lang: string; onstart: (() => void) | null; onresult: ((e: { results: { [0]: { [0]: { transcript: string } } } }) => void) | null; onerror: (() => void) | null; onend: (() => void) | null; start(): void } };
      const SR: AnySR =
        (window as unknown as { SpeechRecognition: AnySR }).SpeechRecognition ||
        (window as unknown as { webkitSpeechRecognition: AnySR }).webkitSpeechRecognition;
      const recognition = new SR();
      recognition.lang = isUk ? "uk-UA" : "en-GB";
      recognition.onstart = () => setListening(true);
      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setListening(false);
        setQuery(transcript);
        setHeard(transcript);
        doSearch(transcript);
      };
      recognition.onerror = () => {
        setListening(false);
        simulateVoice();
      };
      recognition.onend = () => setListening(false);
      recognition.start();
    } else {
      simulateVoice();
    }
  }

  function simulateVoice() {
    setListening(true);
    const preset = PRESET_QUERIES[Math.floor(Math.random() * PRESET_QUERIES.length)];
    setTimeout(() => {
      setListening(false);
      const q = isUk ? preset.uk : preset.en;
      setQuery(q);
      setHeard(q);
      doSearch(q, preset.tags);
    }, 2200);
  }

  function handleClear() {
    setQuery("");
    setHeard("");
    setSearched(false);
    setResults([]);
  }

  const displayedProducts = searched ? (results.length > 0 ? results : []) : PRODUCTS;

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "AI Голосовий Пошук" : "AI Voice Search"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk
          ? "Натисніть мікрофон і скажіть що шукаєте, або оберіть готовий запит. AI розуміє природну мову."
          : "Press the mic and say what you're looking for, or pick a preset query. AI understands natural language."}
      </p>

      {/* Search bar */}
      <form onSubmit={handleTextSearch} className="flex gap-3 mb-5">
        <div className="flex-1 relative">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (!e.target.value) handleClear();
            }}
            type="text"
            placeholder={isUk ? "Або введіть текстом і натисніть Enter..." : "Or type and press Enter..."}
            className="w-full pl-4 pr-10 py-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white focus:border-blue-400 focus:outline-none text-sm shadow-sm"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:text-neutral-300 text-lg leading-none"
            >
              ×
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={handleVoiceButton}
          disabled={listening || processing}
          aria-label={isUk ? "Голосовий пошук" : "Voice search"}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all shrink-0 ${
            listening
              ? "bg-red-500 shadow-red-200 scale-105"
              : "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-200 hover:scale-105 active:scale-95"
          }`}
        >
          {listening ? (
            <span className="flex items-end gap-0.5 h-5">
              {[0, 1, 2, 1, 0].map((h, i) => (
                <span
                  key={i}
                  className="w-1 bg-white rounded-full animate-bounce"
                  style={{ height: `${8 + h * 4}px`, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </span>
          ) : (
            <span className="text-2xl">🎙️</span>
          )}
        </button>
      </form>

      {/* Preset chips */}
      <div className="flex flex-wrap gap-2 mb-7">
        <span className="text-xs text-neutral-400 font-medium self-center">
          {isUk ? "Спробуйте:" : "Try:"}
        </span>
        {PRESET_QUERIES.map((q) => (
          <button
            key={q.en}
            onClick={() => handlePreset(q)}
            className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium hover:bg-blue-100 transition-colors"
          >
            🔍 {isUk ? q.uk : q.en}
          </button>
        ))}
      </div>

      {/* Status banners */}
      {listening && (
        <div className="flex items-center gap-3 p-4 bg-red-50 rounded-2xl border border-red-100 mb-6">
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
          </span>
          <p className="text-sm font-semibold text-red-600">
            {isUk ? "Слухаю вас... говоріть!" : "Listening… speak now!"}
          </p>
        </div>
      )}

      {processing && (
        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100 mb-6">
          <span className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin shrink-0" />
          <div>
            <p className="text-xs text-blue-400 mb-0.5">
              {isUk ? "AI розпізнав:" : "AI heard:"}{" "}
              <span className="font-semibold text-blue-600">&ldquo;{heard}&rdquo;</span>
            </p>
            <p className="text-sm font-semibold text-blue-700">
              {isUk ? "Шукаю в каталозі..." : "Searching the catalogue..."}
            </p>
          </div>
        </div>
      )}

      {heard && searched && !processing && (
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <span className="text-xs text-neutral-500">{isUk ? "Результати для" : "Results for"}:</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
            &ldquo;{heard}&rdquo;
          </span>
          {results.length > 0 ? (
            <span className="text-xs text-neutral-400">
              — {results.length} {isUk ? "товарів" : "products"}
            </span>
          ) : (
            <span className="text-xs text-orange-500 font-medium">
              {isUk ? "— нічого не знайдено" : "— nothing found"}
            </span>
          )}
          <button onClick={handleClear} className="ml-auto text-xs text-neutral-400 hover:text-neutral-700 dark:text-neutral-300 underline">
            {isUk ? "Скинути" : "Reset"}
          </button>
        </div>
      )}

      {/* Product grid */}
      {searched && results.length === 0 ? (
        <div className="text-center py-16 text-neutral-400">
          <span className="text-5xl mb-3 block">🔍</span>
          <p className="text-sm font-medium">{isUk ? "Нічого не знайдено" : "Nothing found"}</p>
          <p className="text-xs mt-1">
            {isUk ? "Спробуйте інший запит або натисніть «Скинути»" : "Try another query or click Reset"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {displayedProducts.map((p) => (
            <div
              key={p.id}
              className={`rounded-2xl border p-4 transition-all cursor-pointer hover:shadow-md ${
                searched
                  ? "border-blue-200 bg-blue-50/50 shadow-sm"
                  : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-blue-300"
              }`}
              onClick={() => {
                const name = isUk ? p.nameUk : p.name;
                setQuery(name);
                setHeard(name);
                doSearch(name);
              }}
            >
              <div className="text-3xl mb-2.5">{p.emoji}</div>
              <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200 leading-tight">
                {isUk ? p.nameUk : p.name}
              </p>
              <p className="text-xs text-neutral-400 mt-0.5">
                {isUk ? p.categoryUk : p.category}
              </p>
              <p className="text-sm font-bold text-blue-600 mt-2">
                {p.price.toLocaleString(isUk ? "uk-UA" : "en-GB")} ₴
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-200">
        <p className="text-xs text-neutral-500">
          <span className="font-semibold text-neutral-700">
            {isUk ? "🔊 Мікрофон:" : "🔊 Microphone:"}
          </span>{" "}
          {isUk
            ? "На пристроях з підтримкою Web Speech API кнопка мікрофона працює в реальному часі. На інших — демонструє симульований пошук з пресет-запитів."
            : "On devices supporting Web Speech API the mic button works live. On others it demonstrates a simulated search with preset queries."}
        </p>
      </div>
    </div>
  );
}
