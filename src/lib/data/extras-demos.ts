export interface ExtraDemoExample {
  id: string;
  extraId: string;
  title: string;
  titleUk: string;
  description: string;
  descriptionUk: string;
  industry: string;
  industryUk: string;
  /** Tailwind gradient classes for the preview card background */
  previewGradient: string;
  /** Tailwind text color for preview card */
  previewTextColor: string;
}

export const EXTRA_DEMOS: Record<string, ExtraDemoExample[]> = {
  "ai-chatbot-rag": [
    {
      id: "business-chatbot",
      extraId: "ai-chatbot-rag",
      title: "Business AI Assistant (RAG)",
      titleUk: "AI Асистент для бізнесу (RAG)",
      description: "Chat interface with GPT-4o trained on company FAQ. Quick questions, fallback-to-operator button, online badge.",
      descriptionUk: "Чат з GPT-4o, навченим на FAQ компанії. Швидкі питання, кнопка оператора, online-статус.",
      industry: "Any Business",
      industryUk: "Будь-який бізнес",
      previewGradient: "from-indigo-600 to-violet-700",
      previewTextColor: "text-white",
    },
  ],

  "ai-smart-search": [
    {
      id: "semantic-product-search",
      extraId: "ai-smart-search",
      title: "Semantic Product Search",
      titleUk: "Семантичний пошук товарів",
      description: "Try intent-based queries: 'listen to music', 'for sport' — AI returns relevant results even without exact keyword match.",
      descriptionUk: "Спробуйте: 'слухати музику', 'для спорту' — AI знаходить релевантне навіть без точного збігу.",
      industry: "E-commerce",
      industryUk: "Інтернет-магазин",
      previewGradient: "from-indigo-500 to-blue-600",
      previewTextColor: "text-white",
    },
  ],

  "ai-copywriter": [
    {
      id: "model-card-demo",
      extraId: "ai-copywriter",
      title: "ML Model Card Generator Demo",
      titleUk: "Демо генератора карток ML-моделей",
      description: "Generate FCA-compliant ML model documentation cards with intended use, performance, limitations",
      descriptionUk: "Генерація карток документації ML-моделей відповідно до FCA: призначення, продуктивність, обмеження.",
      industry: "ML / FinTech / Compliance",
      industryUk: "ML / Фінтех / Комплаєнс",
      previewGradient: "from-violet-600 to-purple-700",
      previewTextColor: "text-white",
    },
  ],

  "ai-voice-search": [
    {
      id: "ecommerce-voice-search",
      extraId: "ai-voice-search",
      title: "E-commerce Voice Search",
      titleUk: "Голосовий пошук для магазину",
      description: "Press the mic or pick a preset query — AI understands natural language and filters the product catalogue in real time.",
      descriptionUk: "Натисніть мікрофон або оберіть пресет-запит — AI розуміє природну мову і фільтрує каталог у реальному часі.",
      industry: "E-commerce",
      industryUk: "Інтернет-магазин",
      previewGradient: "from-blue-500 to-indigo-600",
      previewTextColor: "text-white",
    },
  ],

  "ai-price-optimizer": [
    {
      id: "ecommerce-price-optimizer",
      extraId: "ai-price-optimizer",
      title: "E-commerce AI Price Optimiser",
      titleUk: "AI Оптимізатор Цін для Магазину",
      description: "Interactive table of 6 products with AI-recommended prices, revenue uplift summary, mode selector and one-click apply.",
      descriptionUk: "Інтерактивна таблиця 6 товарів з AI-рекомендованими цінами, підсумок виручки, вибір режиму та застосування одним кліком.",
      industry: "E-commerce",
      industryUk: "Інтернет-магазин",
      previewGradient: "from-amber-500 to-orange-600",
      previewTextColor: "text-white",
    },
  ],
};

/** Returns demo examples for a given extra id, or empty array if no demos */
export function getDemoExamples(extraId: string): ExtraDemoExample[] {
  return EXTRA_DEMOS[extraId] ?? [];
}

/** Returns all extra IDs that have demos */
export function getExtrasWithDemos(): string[] {
  return Object.keys(EXTRA_DEMOS);
}
