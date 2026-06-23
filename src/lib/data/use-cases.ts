export type UseCaseCategory =
  | "automation"
  | "ai";

export interface UseCase {
  slug: string;
  title: string;
  titleEn: string;
  category: UseCaseCategory;
  icon: string;
  who: string;
  whoEn: string;
  problem: string;
  problemEn: string;
  solution: string;
  solutionEn: string;
  resultQuote: string;
  resultQuoteEn: string;
  relatedPortfolio: string[];
  relatedServices: string[];
  relatedExtras: string[];
}

export interface UseCaseCategoryMeta {
  id: UseCaseCategory;
  icon: string;
  labelUk: string;
  labelEn: string;
}

export const USE_CASE_CATEGORIES: UseCaseCategoryMeta[] = [
  { id: "automation", icon: "⚙️", labelUk: "Автоматизація", labelEn: "Automation" },
  { id: "ai", icon: "🤖", labelUk: "AI", labelEn: "AI" },
];

export const USE_CASES: UseCase[] = [
  {
    slug: "automate-support",
    title: "Як автоматизувати підтримку клієнтів 24/7",
    titleEn: "How to automate customer support 24/7",
    category: "automation",
    icon: "🤖",
    who: "SaaS-компанії, клініки, B2B-сервіси",
    whoEn: "SaaS companies, clinics, B2B services",
    problem:
      "Служба підтримки щодня відповідає на одні й ті самі 20 питань. Ночі та вихідні без відповіді. Час першої відповіді перевищує 4 години, задоволеність клієнтів падає.",
    problemEn:
      "Support team answers the same 20 questions every day. Nights and weekends are unattended. First-response time is over 4 hours and customer satisfaction is falling.",
    solution:
      "Ми розробляємо RAG-чатбот, навчений на ваших FAQ, документації та базі знань продукту, на основі GPT-4o. Він обробляє 68% вхідних запитів автоматично, ескалує складні кейси до операторів і відповідає менш ніж за 2 секунди, 24/7.",
    solutionEn:
      "We build a RAG-powered chatbot trained on your FAQs, documentation, and product knowledge base using GPT-4o. It handles 68% of incoming queries automatically, escalates complex cases to humans, and responds in under 2 seconds, 24/7.",
    resultQuote:
      "Після запуску RAG-чатбота клієнти бачать автоматичне вирішення 68% запитів, навантаження на підтримку знижується вдвічі, а NPS покращується на 12–18 пунктів.",
    resultQuoteEn:
      "After deploying our RAG chatbot, clients see 68% of queries resolved automatically, support team workload reduced by half, and customer satisfaction scores improve by 12–18 NPS points.",
    relatedPortfolio: ["ai-chatbot-saas"],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: ["ai-chatbot-rag"],
  },
  {
    slug: "automate-content-generation",
    title: "Як генерувати контент у масштабі за допомогою AI",
    titleEn: "How to generate content at scale with AI",
    category: "ai",
    icon: "✍️",
    who: "Маркетингові агентства, контент-команди, видавці",
    whoEn: "Marketing agencies, content teams, publishers",
    problem:
      "Виробництво якісного контенту займає 3–5 днів на матеріал. Масштабування = найм більше авторів. Бренд-голос не зберігається при використанні різних виконавців.",
    problemEn:
      "Producing quality content takes 3–5 days per piece. Scaling means hiring more writers. Brand voice is inconsistent across different contributors.",
    solution:
      "Ми розгортаємо AI-редакційний пайплайн на GPT-4o: захоплення бренд-голосу з корпусу, LangChain-агент для дослідження, автоматизований SEO-аудит, human-in-the-loop верифікація.",
    solutionEn:
      "We deploy an AI editorial pipeline on GPT-4o: brand voice capture from corpus, LangChain research agent, automated SEO audit, human-in-the-loop verification.",
    resultQuote:
      "Час виробництва контенту −85%. Витрати знижуються з 68% до 29% від доходу. Клієнтська база зростає на 52% з тим самим штатом.",
    resultQuoteEn:
      "Content production time −85%. Cost share drops from 68% to 29% of revenue. Client base grows 52% with the same headcount.",
    relatedPortfolio: ["ai-content-studio"],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: ["ai-product-descriptions"],
  },
  {
    slug: "implement-ai-support",
    title: "Як впровадити AI-підтримку без великих інвестицій",
    titleEn: "How to add AI support without a large investment",
    category: "ai",
    icon: "💬",
    who: "SaaS, B2B-сервіси, підприємства, що починають з AI",
    whoEn: "SaaS, B2B services, enterprises starting with AI",
    problem:
      "AI звучить дорого і складно. Команда не знає з чого почати — чи потрібна кастомна модель, скільки даних потрібно, який реальний ROI.",
    problemEn:
      "AI sounds expensive and complex. The team doesn't know where to start — whether it needs a custom model, how much data is required, or what the realistic ROI looks like.",
    solution:
      "Ми починаємо з найменшого можливого AI: RAG-чатбот на вашому існуючому FAQ або документації як базі знань. Без навчання кастомної моделі, без великого датасету. Від 75 000 ₴. Запуск за 3 тижні.",
    solutionEn:
      "We start with the smallest viable AI: a RAG chatbot using your existing FAQ or docs as the knowledge base. No custom model training, no large dataset. From £1,800 / 75,000 UAH. Live in 3 weeks.",
    resultQuote:
      "68% запитів підтримки вирішуються автоматично. Навантаження на команду підтримки зменшується вдвічі. Середній термін окупності: 6–8 тижнів.",
    resultQuoteEn:
      "68% of support queries resolved automatically. Support team workload halved. Average payback period: 6–8 weeks from reduced support staff hours.",
    relatedPortfolio: ["ai-chatbot-saas"],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: ["ai-chatbot-rag"],
  },
  {
    slug: "monitor-brand-reputation",
    title: "Як відстежувати відгуки про бренд у реальному часі",
    titleEn: "How to monitor brand reviews in real time",
    category: "ai",
    icon: "👁️",
    who: "Компанії з онлайн-репутацією: клініки, ресторани, франшизи",
    whoEn: "Companies with online reputation: clinics, restaurants, franchises",
    problem:
      "Негативні відгуки виявляються пізно — іноді через дні після публікації. Немає централізованого огляду всіх платформ.",
    problemEn:
      "Negative reviews are discovered late — sometimes days after posting. There's no central view across all platforms.",
    solution:
      "Ми будуємо дашборд моніторингу сентименту бренду: NLP-класифікація відгуків з Google, Trustpilot та соцмереж. Негативні відгуки запускають миттєві Telegram/email-сповіщення.",
    solutionEn:
      "We build a brand sentiment monitoring dashboard: NLP classification of reviews from Google, Trustpilot, and social media. Negative reviews trigger instant Telegram/email alerts.",
    resultQuote:
      "Клієнти відповідають на негативні відгуки у 10 разів швидше. NPS зростає на 33% за 6 місяців.",
    resultQuoteEn:
      "Clients respond to negative reviews 10× faster. Review scores improve 33% over 6 months.",
    relatedPortfolio: ["nlp-review-monitor"],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: ["ai-sentiment-monitor"],
  },
];
