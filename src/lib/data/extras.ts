export type ExtraCategory = "pages" | "features" | "analytics" | "integrations" | "content" | "security" | "admin" | "ecommerce" | "marketing" | "ai";

import { EXTRAS_EN } from "./extras-en";

/** Returns display title for the given locale. Falls back to Ukrainian if no EN translation yet. */
export function getExtraTitle(extra: { id: string; title: string }, isUk: boolean): string {
  if (isUk) return extra.title;
  return EXTRAS_EN[extra.id]?.titleEn ?? extra.title;
}

/** Returns display description for the given locale. Falls back to Ukrainian if no EN translation yet. */
export function getExtraDesc(extra: { id: string; description: string }, isUk: boolean): string {
  if (isUk) return extra.description;
  return EXTRAS_EN[extra.id]?.descriptionEn ?? extra.description;
}

/**
 * Formats an extras price in the correct currency for the locale.
 * EN (UK market) → £ (GBP, derived as UAH/40 rounded up to nearest £5)
 * UK (Ukrainian market) → ₴ (UAH)
 */
export function formatExtrasPrice(uah: number, isUk: boolean): string {
  if (isUk) return `${uah.toLocaleString("uk-UA")} ₴`;
  const gbp = Math.ceil(uah / 40 / 5) * 5;
  return `£${gbp.toLocaleString("en-GB")}`;
}

export interface Extra {
  id: string;
  title: string;
  description: string;
  category: ExtraCategory;
  priceFrom: number; // UAH
  deliveryDays: number;
  tags: string[];
  emoji: string;
  isPopular: boolean;
  isNew: boolean;
  hasDemo: boolean;
}

export interface ExtraCategoryMeta {
  value: ExtraCategory;
  label: string;
  labelEn: string;
  emoji: string;
  description: string;
  descriptionEn: string;
}

export const EXTRA_CATEGORIES: ExtraCategoryMeta[] = [
  { value: "ai",           label: "AI/ML рішення",   labelEn: "AI/ML Solutions", emoji: "🤖", description: "Штучний інтелект та машинне навчання для бізнесу",  descriptionEn: "Artificial intelligence and machine learning for business automation" },
];

export const EXTRAS: Extra[] = [
  { id: "ai-chatbot-rag", title: "AI чат-бот з базою знань (RAG)", description: "Чат-бот на OpenAI GPT, навчений на ваших документах: FAQ, прайс, умови. Відповідає точно і по темі. Fallback на оператора.", category: "ai", priceFrom: 9000, deliveryDays: 12, tags: ["AI", "GPT", "RAG", "Підтримка"], emoji: "🧠", isPopular: true, isNew: true, hasDemo: true },
  { id: "ai-product-descriptions", title: "AI-генератор описів товарів", description: "Автоматична генерація SEO-описів для товарів через OpenAI. Масова обробка каталогу: 100–1000 товарів.", category: "ai", priceFrom: 5000, deliveryDays: 6, tags: ["AI", "E-commerce", "SEO", "GPT"], emoji: "✨", isPopular: false, isNew: true, hasDemo: false },
  { id: "ai-smart-search", title: "Семантичний AI-пошук", description: "Пошук за змістом, а не точним словом: знаходить схожі товари, статті, послуги. Vector embeddings + Pinecone/Weaviate.", category: "ai", priceFrom: 7000, deliveryDays: 10, tags: ["AI", "Пошук", "Embeddings", "UX"], emoji: "🔍", isPopular: false, isNew: true, hasDemo: true },
  { id: "ai-image-alt", title: "AI-генерація alt-текстів для зображень", description: "Автоматичне заповнення alt-атрибутів для всіх зображень сайту через Vision AI. SEO + accessibility одночасно.", category: "ai", priceFrom: 2500, deliveryDays: 3, tags: ["AI", "SEO", "Accessibility", "Зображення"], emoji: "🖼", isPopular: false, isNew: true, hasDemo: false },
  { id: "ai-personalization", title: "AI-персоналізація контенту", description: "Показуємо різний контент різним відвідувачам на основі поведінки: рекомендовані послуги, персональний hero-блок.", category: "ai", priceFrom: 8000, deliveryDays: 12, tags: ["AI", "Персоналізація", "Конверсія"], emoji: "🎯", isPopular: false, isNew: true, hasDemo: false },
  { id: "ai-review-sentiment", title: "AI-аналіз тональності відгуків", description: "Автоматичний аналіз нових відгуків: позитивний/негативний/нейтральний, тематика, алерт при негативному.", category: "ai", priceFrom: 3500, deliveryDays: 4, tags: ["AI", "Відгуки", "NLP", "Аналітика"], emoji: "💬", isPopular: false, isNew: true, hasDemo: false },
  { id: "ai-seo-optimizer", title: "AI SEO-асистент", description: "Аналіз контенту сторінки через AI: рекомендації по ключових словах, читабельності, внутрішніх посиланнях.", category: "ai", priceFrom: 4000, deliveryDays: 5, tags: ["AI", "SEO", "Контент", "GPT"], emoji: "📈", isPopular: false, isNew: true, hasDemo: false },
  { id: "ai-lead-scoring", title: "AI-скоринг лідів", description: "Автоматична оцінка якості ліда за джерелом, поведінкою та даними форми. Пріоритизація лідів у CRM.", category: "ai", priceFrom: 6000, deliveryDays: 8, tags: ["AI", "CRM", "Ліди", "B2B"], emoji: "🎖", isPopular: false, isNew: true, hasDemo: false },
  { id: "ai-voice-search", title: "AI Голосовий Пошук", description: "Кнопка мікрофона на сайті: клієнт говорить — AI розуміє і шукає. Web Speech API + NLP обробка запиту. Ідеально для мобільних та e-commerce.", category: "ai", priceFrom: 6000, deliveryDays: 8, tags: ["AI", "Пошук", "Voice", "UX"], emoji: "🎙", isPopular: false, isNew: true, hasDemo: true },
  { id: "ai-auto-translate", title: "AI Автопереклад Контенту", description: "Автоматичний переклад статей, товарів і сторінок на кілька мов через GPT-4o. Зберігає HTML-структуру, SEO-теги і тон бренду.", category: "ai", priceFrom: 4000, deliveryDays: 5, tags: ["AI", "i18n", "GPT", "SEO"], emoji: "🌐", isPopular: false, isNew: true, hasDemo: false },
  { id: "ai-price-optimizer", title: "AI Оптимізатор Цін", description: "Динамічне ціноутворення: AI аналізує попит, сезонність і конкурентів — пропонує оптимальну ціну. Режими «Максимальний прибуток» або «Максимальні продажі».", category: "ai", priceFrom: 8000, deliveryDays: 10, tags: ["AI", "E-commerce", "Ціни", "ML"], emoji: "💰", isPopular: false, isNew: true, hasDemo: true },
  { id: "ai-recommendations", title: "AI Рекомендаційна Система", description: "«Також купують» та «Схожі послуги» на основі поведінки користувачів. Collaborative filtering або content-based через OpenAI Embeddings.", category: "ai", priceFrom: 8000, deliveryDays: 10, tags: ["AI", "E-commerce", "Персоналізація", "ML"], emoji: "🤝", isPopular: false, isNew: true, hasDemo: false },
  { id: "ai-content-moderator", title: "AI Модерація Контенту", description: "Автоматична перевірка відгуків, коментарів і форм на спам, токсичність та нерелевантний контент. Алерт модератору + авто-блокування.", category: "ai", priceFrom: 3000, deliveryDays: 4, tags: ["AI", "Модерація", "NLP", "UGC"], emoji: "🛡️", isPopular: false, isNew: true, hasDemo: false },
  { id: "ai-copywriter", title: "AI-Копірайтер для Лендінгів", description: "Генерація текстів для hero-се��цій, переваг, CTA та about-сторінок через GPT-4o. Тон бренду, ключові слова, A/B варіанти.", category: "ai", priceFrom: 5000, deliveryDays: 6, tags: ["AI", "Копірайтинг", "GPT", "SEO"], emoji: "✍️", isPopular: true, isNew: true, hasDemo: true },
  { id: "ai-faq-generator", title: "AI Генератор FAQ", description: "Автоматична генерація розділу FAQ на основі контенту сайту, відгуків і пошукових запитів клієнтів. FAQPage Schema.org для featured snippets.", category: "ai", priceFrom: 2500, deliveryDays: 3, tags: ["AI", "FAQ", "GPT", "SEO"], emoji: "❓", isPopular: false, isNew: true, hasDemo: false },
  { id: "ai-demand-forecast", title: "AI Прогнозування Попиту", description: "ML-модель прогнозує продажі по товарах і послугах на 30–90 днів вперед. Враховує сезонність, свята та тренди. Dashboard з графіком та рекомендаціями.", category: "ai", priceFrom: 10000, deliveryDays: 14, tags: ["AI", "ML", "Аналітика", "E-commerce"], emoji: "📊", isPopular: false, isNew: true, hasDemo: false },
  { id: "ai-chat-summary", title: "AI Резюме Розмов (Chat Summary)", description: "Після кожного чату або дзвінка AI автоматично формує стислий підсумок для CRM: тема, проблема клієнта, наступний крок. Економить 5–10 хв на кожному лід.", category: "ai", priceFrom: 3500, deliveryDays: 4, tags: ["AI", "CRM", "GPT", "Підтримка"], emoji: "📝", isPopular: false, isNew: true, hasDemo: false },
  { id: "ai-form-assistant", title: "AI Асистент Форм", description: "Розумні підказки під час заповнення форм: автодоповнення, пояснення полів, виправлення помилок у реальному часі. Підвищує completion rate на 25–35%.", category: "ai", priceFrom: 4000, deliveryDays: 5, tags: ["AI", "UX", "Форми", "GPT"], emoji: "🤖", isPopular: false, isNew: true, hasDemo: false },

  // AI — UK + UA Dual Market (2026-05-02)
  { id: "ai-invoice-processor", title: "AI Обробка Рахунків та Накладних", description: "GPT-4o Vision витягує дані з PDF/фото/сканів: постачальник, сума, ПДВ, дата, категорія. Sync до Xero/QuickBooks (UK) або 1С XML (UA). Making Tax Digital сумісно. Confidence score + «needs review» черга.", category: "ai", priceFrom: 8000, deliveryDays: 10, tags: ["AI", "OCR", "Бухгалтерія", "GPT Vision", "UK", "MTD"], emoji: "🧾", isPopular: true, isNew: true, hasDemo: false },
  { id: "ai-document-summary", title: "AI Резюме Документів", description: "Завантаж PDF-договір або звіт → AI за 30 сек видає: ключові пункти, ризики, дати, зобов'язання сторін. Підтримка EN + UA документів. Ніші: юристи, тендери (Prozorro), нерухомість.", category: "ai", priceFrom: 4500, deliveryDays: 6, tags: ["AI", "GPT", "Документи", "Юридичне", "Rezюме"], emoji: "📋", isPopular: false, isNew: true, hasDemo: false },
  { id: "ai-quiz-generator", title: "AI Генератор Тестів та Квізів", description: "Завантаж навчальний матеріал → AI генерує тести: MCQ, true/false, open-ended. Рівні складності, shuffle варіантів, миттєвий feedback з поясненням правильної відповіді. Ніші: EdTech, корпоративне навчання.", category: "ai", priceFrom: 3500, deliveryDays: 5, tags: ["AI", "EdTech", "GPT", "Освіта", "Тести"], emoji: "🎓", isPopular: false, isNew: true, hasDemo: false },
  { id: "ai-learning-path", title: "AI Персоналізований Learning Path", description: "Вхідний тест → AI визначає прогалини → будує індивідуальний план навчання. Адаптивна складність. Прогрес-дашборд для вчителя. Streak та gamification. Ніші: онлайн-школи мов, корпоративні тренінги.", category: "ai", priceFrom: 7000, deliveryDays: 10, tags: ["AI", "EdTech", "Адаптивне навчання", "Персоналізація"], emoji: "📚", isPopular: false, isNew: true, hasDemo: false },
  { id: "ai-property-description", title: "AI Генератор Описів Нерухомості", description: "Агент вводить параметри → AI пише продаючий опис EN або UA. Стилі: casual, premium, інвестиційний. SEO-оптимізація заголовка. Bulk mode: 50+ оголошень за один CSV-запуск. Rightmove / DOM.RIA / OLX.", category: "ai", priceFrom: 3000, deliveryDays: 4, tags: ["AI", "Нерухомість", "PropTech", "GPT", "SEO"], emoji: "🏠", isPopular: false, isNew: true, hasDemo: false },
  { id: "ai-property-matcher", title: "AI Підбір Нерухомості за Описом", description: "Клієнт пише природньою мовою: «двокімнатна, тихий район, до 15 хв метро» → AI знаходить відповідні варіанти з каталогу. Semantic search по базі оголошень замість фільтрів. OpenAI Embeddings + Qdrant.", category: "ai", priceFrom: 9000, deliveryDays: 12, tags: ["AI", "Нерухомість", "PropTech", "Semantic Search", "RAG"], emoji: "🔍", isPopular: false, isNew: true, hasDemo: false },
  { id: "ai-bilingual-chatbot", title: "AI Білінгвальний Чат-бот UK/EN", description: "RAG-бот відповідає мовою запиту (UK або EN) автоматично. Одна база знань → дві мови, дві локалі (ціни £/₴, контакти, графік). Ідеально для українських компаній з UK-представництвом та діаспорних бізнесів.", category: "ai", priceFrom: 12000, deliveryDays: 14, tags: ["AI", "RAG", "Білінгвальний", "UK", "UA", "Діаспора"], emoji: "🌐", isPopular: false, isNew: true, hasDemo: false },
  { id: "ai-site-localization", title: "AI Локалізація Сайту UK/UA", description: "Автоматичний переклад + культурна адаптація всього контенту сайту: адаптує прайси (£↔₴), приклади, CTA під локальний контекст. Зберігає HTML-структуру та SEO-теги. Кешування у Postgres.", category: "ai", priceFrom: 6000, deliveryDays: 8, tags: ["AI", "i18n", "UK", "UA", "Локалізація", "GPT"], emoji: "🔄", isPopular: false, isNew: true, hasDemo: false },
  { id: "ai-crop-analysis", title: "AI Аналіз Стану Поля з Дрона", description: "Computer Vision аналізує дрон-знімки: детекція хвороб культур (14 класів), зони стресу, оцінка густоти посівів. YOLOv8 + OpenCV. Карта поля з зонами ризику + рекомендація. Ніші: агрохолдинги, UK precision farming.", category: "ai", priceFrom: 15000, deliveryDays: 18, tags: ["AI", "AgriTech", "Computer Vision", "YOLO", "Дрони", "UK"], emoji: "🌾", isPopular: false, isNew: true, hasDemo: false },
  { id: "ai-auto-crop", title: "AI Авто-Кадрування Зображень", description: "Автоматичне обрізання зображень під потрібний формат (1:1, 16:9, 4:3, банер). Smart crop: AI визначає головний об'єкт сцени і кадрує навколо нього — обличчя, продукт, логотип. Пакетна обробка до 500 зображень. Ніші: e-commerce (каталог), маркетинг (соцмережі), нерухомість (фото об'єктів).", category: "ai", priceFrom: 3000, deliveryDays: 4, tags: ["AI", "Зображення", "E-commerce", "Фото", "Computer Vision"], emoji: "🖼", isPopular: false, isNew: true, hasDemo: false },
  { id: "ai-chatbot-basic", title: "Базовий AI Чат-бот (Сценарний + GPT)", description: "Rule-based чат-бот з готовими сценаріями (меню, FAQ, контакти, запис) + GPT-fallback для нестандартних запитів. Без RAG — ідеально для малого бізнесу. Вбудовується на сайт за 1 день. Вартість нижча за RAG-рішення.", category: "ai", priceFrom: 14000, deliveryDays: 7, tags: ["AI", "Чат-бот", "GPT", "Автоматизація", "Підтримка"], emoji: "💬", isPopular: false, isNew: true, hasDemo: false },
];