export type UseCaseCategory =
  | "automation"
  | "ai"
  | "conversion"
  | "seo"
  | "ecommerce"
  | "trust"
  | "erp";

export interface UseCase {
  slug: string;
  titleEn: string;
  titleUk: string;
  category: UseCaseCategory;
  icon: string;
  whoEn: string;
  whoUk: string;
  problemEn: string;
  problemUk: string;
  solutionEn: string;
  solutionUk: string;
  resultQuoteEn: string;
  resultQuoteUk: string;
  metaTitleEn: string;
  metaTitleUk: string;
  metaDescriptionEn: string;
  metaDescriptionUk: string;
  relatedPortfolio: string[];
  relatedServices: string[];
  relatedExtras: string[];
}

export const USE_CASES: UseCase[] = [
  {
    slug: "automate-support",
    titleEn: "How to automate customer support 24/7",
    titleUk: "Як автоматизувати підтримку клієнтів 24/7",
    category: "automation",
    icon: "🤖",
    whoEn: "SaaS companies, e-commerce, clinics",
    whoUk: "SaaS-компанії, e-commerce, клініки",
    problemEn:
      "Support team answers the same 20 questions every day. Nights and weekends are unattended. First-response time is over 4 hours and customer satisfaction is falling.",
    problemUk:
      "Служба підтримки щодня відповідає на одні й ті самі 20 питань. Ночі та вихідні без відповіді. Час першої відповіді перевищує 4 години, задоволеність клієнтів падає.",
    solutionEn:
      "We build a RAG-powered chatbot trained on your FAQs, documentation, and product knowledge base using GPT-4o. It handles 68% of incoming queries automatically, escalates complex cases to humans, and responds in under 2 seconds, 24/7.",
    solutionUk:
      "Ми розробляємо RAG-чатбот, навчений на ваших FAQ, документації та базі знань продукту, на основі GPT-4o. Він обробляє 68% вхідних запитів автоматично, ескалує складні кейси до операторів і відповідає менш ніж за 2 секунди, 24/7.",
    resultQuoteEn:
      "After deploying our RAG chatbot, clients see 68% of queries resolved automatically, support team workload reduced by half, and customer satisfaction scores improve by 12–18 NPS points.",
    resultQuoteUk:
      "Після запуску RAG-чатбота клієнти бачать автоматичне вирішення 68% запитів, навантаження на підтримку знижується вдвічі, а NPS покращується на 12–18 пунктів.",
    metaTitleEn: "Automate Customer Support 24/7 | AI Chatbot | Codeworth",
    metaTitleUk: "Автоматизувати підтримку 24/7 | AI чат-бот | Codeworth",
    metaDescriptionEn:
      "GPT-4o RAG chatbot for 24/7 support. 68% queries resolved automatically. From £1,800. Codeworth.",
    metaDescriptionUk:
      "RAG чат-бот GPT-4o для підтримки 24/7. 68% запитів вирішується автоматично. Від £1,800. Codeworth.",
    relatedPortfolio: ["ai-chatbot-saas"],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: ["ai-chatbot-rag", "feat-floating-chat"],
  },
  {
    slug: "automate-content-generation",
    titleEn: "How to generate content at scale with AI",
    titleUk: "Як генерувати контент у масштабі за допомогою AI",
    category: "ai",
    icon: "✍️",
    whoEn: "Marketing agencies, content teams, e-commerce with large catalogues",
    whoUk: "Маркетингові агентства, контент-команди, e-commerce з великим каталогом",
    problemEn:
      "Creating high-quality, brand-consistent content at scale takes months and costs a fortune. Manual production limits growth — you can only serve as many clients as your team can write for.",
    problemUk:
      "Створення якісного, брендово-консистентного контенту у масштабі займає місяці і коштує стан. Ручне виробництво обмежує зростання — ви обслуговуєте стільки клієнтів, скільки може написати ваша команда.",
    solutionEn:
      "We deploy an AI editorial pipeline powered by GPT-4o: brand voice capture from existing content corpus, LangChain research agent for competitive analysis, automated SEO audit, and human-in-the-loop verification. Content that took 3–5 days now takes 35–45 minutes.",
    solutionUk:
      "Ми розгортаємо AI-редакційний пайплайн на GPT-4o: захоплення бренд-голосу з існуючого корпусу контенту, LangChain-агент для конкурентного аналізу, автоматизований SEO-аудит та human-in-the-loop верифікація. Контент, що займав 3–5 днів, тепер створюється за 35–45 хвилин.",
    resultQuoteEn:
      "100–1,000 SEO-optimised pieces generated in a single run. Content production cost drops from 68% to 29% of revenue. Client base grows 52% with the same headcount.",
    resultQuoteUk:
      "100–1 000 SEO-оптимізованих матеріалів за один запуск. Витрати на виробництво контенту знижуються з 68% до 29% від доходу. Клієнтська база зростає на 52% з тим самим штатом.",
    metaTitleEn: "AI Content Generation at Scale | GPT-4o Pipeline | Codeworth",
    metaTitleUk: "AI-генерація контенту у масштабі | GPT-4o | Codeworth",
    metaDescriptionEn:
      "AI editorial pipeline: brand voice + LangChain research + GPT-4o draft + SEO audit. Production time −85%. Codeworth.",
    metaDescriptionUk:
      "AI-редакційний пайплайн: бренд-голос + LangChain + GPT-4o + SEO-аудит. Час виробництва −85%. Codeworth.",
    relatedPortfolio: ["ai-content-studio"],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: ["ai-product-descriptions"],
  },
  {
    slug: "implement-ai-support",
    titleEn: "How to add AI support without a large investment",
    titleUk: "Як впровадити AI-підтримку без великих інвестицій",
    category: "ai",
    icon: "💬",
    whoEn: "SaaS, B2B services, enterprises looking to start with AI",
    whoUk: "SaaS, B2B-сервіси, підприємства, що починають з AI",
    problemEn:
      "AI sounds expensive and complex. The team doesn't know where to start — whether it needs a custom model, how much data is required, or what the realistic ROI looks like.",
    problemUk:
      "AI звучить дорого і складно. Команда не знає з чого почати — чи потрібна кастомна модель, скільки даних потрібно, який реальний ROI.",
    solutionEn:
      "We start with the smallest viable AI: a RAG chatbot using your existing FAQ or docs as the knowledge base. No custom model training, no large dataset. From £1,800. Live in 3 weeks.",
    solutionUk:
      "Ми починаємо з найменшого можливого AI: RAG-чатбот на вашому існуючому FAQ або документації як базі знань. Без навчання кастомної моделі, без великого датасету. Від £1,800. Запуск за 3 тижні.",
    resultQuoteEn:
      "68% of support queries resolved automatically. Support team workload halved. Average payback period: 6–8 weeks from reduced support staff hours.",
    resultQuoteUk:
      "68% запитів підтримки вирішуються автоматично. Навантаження на команду підтримки зменшується вдвічі. Середній термін окупності: 6–8 тижнів за рахунок скорочення годин роботи підтримки.",
    metaTitleEn: "Add AI Customer Support From £1,800 | RAG Chatbot | Codeworth",
    metaTitleUk: "AI-підтримка від £1,800 | RAG чат-бот | Codeworth",
    metaDescriptionEn:
      "RAG chatbot on your existing docs. 68% queries automated. From £1,800 / 3 weeks. Codeworth.",
    metaDescriptionUk:
      "RAG чат-бот на вашій документації. 68% запитів автоматизовано. Від £1,800 / 3 тижні. Codeworth.",
    relatedPortfolio: ["ai-chatbot-saas"],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: ["ai-chatbot-rag"],
  },
  {
    slug: "reduce-customer-churn",
    titleEn: "How to predict and reduce customer churn with ML",
    titleUk: "Як передбачити та скоротити відтік клієнтів за допомогою ML",
    category: "ai",
    icon: "📉",
    whoEn: "SaaS, subscription businesses, telecom, fintech",
    whoUk: "SaaS, підписочні бізнеси, телеком, фінтех",
    problemEn:
      "You only find out a customer has churned after they cancel. Retention teams reach out too late, offers go to the wrong accounts, and monthly churn sits at 4–7% despite heavy discount spend.",
    problemUk:
      "Ви дізнаєтесь про відтік клієнта тільки після скасування. Команда retention реагує занадто пізно, пропозиції йдуть не тим акаунтам, а місячний churn тримається на рівні 4–7% попри витрати на знижки.",
    solutionEn:
      "We build a churn prediction model trained on your behavioural, product usage, and payment data. The model scores every customer weekly on 30-day churn probability. High-risk accounts are surfaced to your CSM team with the top 3 intervention reasons — 2–3 weeks before they decide to leave.",
    solutionUk:
      "Ми будуємо модель прогнозу відтоку на основі ваших поведінкових, продуктових та платіжних даних. Модель щотижня скорює кожного клієнта за ймовірністю відтоку протягом 30 днів. Акаунти з високим ризиком виводяться у CSM-команду з топ-3 причинами для втручання — за 2–3 тижні до ухвалення рішення про відхід.",
    resultQuoteEn:
      "Clients with active churn prediction cut monthly churn from 6.2% to 3.8% within 90 days. Retention team efficiency doubles: same headcount saves 2.3× more revenue at-risk.",
    resultQuoteUk:
      "Клієнти з активним прогнозом відтоку скорочують місячний churn з 6.2% до 3.8% протягом 90 днів. Ефективність retention-команди подвоюється: той самий штат зберігає у 2.3× більше MRR під ризиком.",
    metaTitleEn: "Predict and Reduce Customer Churn with ML | Codeworth",
    metaTitleUk: "Прогноз та скорочення відтоку клієнтів з ML | Codeworth",
    metaDescriptionEn:
      "ML churn prediction model: weekly scoring, top 3 intervention reasons, 2–3 weeks lead time. Churn reduced 38%. Codeworth.",
    metaDescriptionUk:
      "ML-модель прогнозу відтоку: щотижневе скорування, топ-3 причини втручання, 2–3 тижні lead time. Churn знижено на 38%. Codeworth.",
    relatedPortfolio: ["ml-churn-predictor"],
    relatedServices: ["machine-learning", "predictive-analytics"],
    relatedExtras: [],
  },
  {
    slug: "automate-fraud-detection",
    titleEn: "How to detect payment fraud in real time with ML",
    titleUk: "Як виявляти платіжне шахрайство в реальному часі за допомогою ML",
    category: "ai",
    icon: "🛡️",
    whoEn: "Fintech, payment processors, e-commerce, lending platforms",
    whoUk: "Фінтех, платіжні процесори, e-commerce, кредитні платформи",
    problemEn:
      "Rule-based fraud filters block legitimate customers at 2–3% false-positive rate while missing sophisticated fraud patterns. Your fraud team reviews 800+ alerts daily but 60% are noise. Chargebacks cost 3–5× the original transaction.",
    problemUk:
      "Правильні фільтри шахрайства блокують легітимних клієнтів з false-positive rate 2–3%, пропускаючи складні шахрайські патерни. Ваша команда розглядає 800+ сповіщень щодня, але 60% — шум. Chargeback коштує у 3–5× більше від початкової транзакції.",
    solutionEn:
      "We build a real-time ML fraud detection system using gradient boosting + graph neural networks on your transaction history. The model runs in <50ms per transaction, cuts false positives by 60–70%, and surfaces high-confidence fraud cases with explainability (SHAP values) so analysts can act in seconds.",
    solutionUk:
      "Ми будуємо ML-систему виявлення шахрайства в реальному часі з використанням gradient boosting + graph neural networks на вашій транзакційній історії. Модель працює за <50ms на транзакцію, скорочує false positives на 60–70%, та виводить high-confidence випадки шахрайства з поясненнями (SHAP values) — аналітики реагують за секунди.",
    resultQuoteEn:
      "After deployment: 60–70% drop in false-positive fraud alerts, chargeback rate down 45%, fraud team reviews 4× fewer alerts for the same detection rate.",
    resultQuoteUk:
      "Після запуску: зниження false-positive сповіщень про шахрайство на 60–70%, рівень chargeback знижується на 45%, команда fraud розглядає у 4× менше сповіщень при тому самому рівні виявлення.",
    metaTitleEn: "Real-Time ML Fraud Detection for Fintech | Codeworth",
    metaTitleUk: "ML-виявлення шахрайства у реальному часі для фінтех | Codeworth",
    metaDescriptionEn:
      "ML fraud detection: <50ms per transaction, 60–70% fewer false positives, SHAP explainability. FCA-ready audit trail. Codeworth.",
    metaDescriptionUk:
      "ML-виявлення шахрайства: <50ms на транзакцію, 60–70% менше false positives, SHAP-пояснення. Готовий аудит-лог для FCA. Codeworth.",
    relatedPortfolio: ["fraud-detection-fintech"],
    relatedServices: ["machine-learning", "predictive-analytics"],
    relatedExtras: [],
  },
  {
    slug: "monitor-brand-reputation",
    titleEn: "How to monitor brand reviews in real time",
    titleUk: "Як відстежувати відгуки про бренд у реальному часі",
    category: "ai",
    icon: "👁️",
    whoEn: "E-commerce, restaurants, clinics, franchises",
    whoUk: "E-commerce, ресторани, клініки, франшизи",
    problemEn:
      "Negative reviews on Google, Prom, or social media are discovered late — sometimes days after posting. By then the damage is done. There's no central view across all platforms.",
    problemUk:
      "Негативні відгуки на Google, Prom або соцмережах виявляються пізно — іноді через дні після публікації. До того часу збиток вже нанесений. Немає централізованого огляду всіх платформ.",
    solutionEn:
      "We build a brand sentiment monitoring dashboard that aggregates reviews from Google, Trustpilot, and social media using NLP sentiment classification. Negative reviews trigger instant Telegram/email alerts so you can respond within 30 minutes.",
    solutionUk:
      "Ми будуємо дашборд моніторингу сентименту бренду, що агрегує відгуки з Google, Trustpilot та соцмереж за допомогою NLP-класифікації сентименту. Негативні відгуки запускають миттєві Telegram/email-сповіщення, щоб ви могли відповісти протягом 30 хвилин.",
    resultQuoteEn:
      "Clients respond to negative reviews 10× faster. Brands that respond within 1 hour see 33% higher review scores over 6 months compared to those that take 24+ hours.",
    resultQuoteUk:
      "Клієнти відповідають на негативні відгуки у 10 разів швидше. Бренди, що відповідають протягом 1 години, мають оцінки відгуків на 33% вищі за 6 місяців порівняно з тими, хто відповідає через 24+ години.",
    metaTitleEn: "Monitor Brand Reviews in Real Time | NLP Sentiment | Codeworth",
    metaTitleUk: "Моніторинг відгуків про бренд у реальному часі | Codeworth",
    metaDescriptionEn:
      "NLP sentiment monitoring across Google, Trustpilot, social media. Negative review alerts in 30 min. Codeworth.",
    metaDescriptionUk:
      "NLP-моніторинг відгуків: Google, Trustpilot, соцмережі. Сповіщення про негатив за 30 хв. Codeworth.",
    relatedPortfolio: ["nlp-review-monitor"],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: ["ai-sentiment-monitor"],
  },
];

export const USE_CASE_CATEGORY_LABELS: Record<
  UseCaseCategory,
  { en: string; uk: string; color: string }
> = {
  automation: { en: "Automation", uk: "Автоматизація", color: "violet" },
  ai: { en: "AI", uk: "AI", color: "cyan" },
  conversion: { en: "Conversion", uk: "Конверсія", color: "emerald" },
  seo: { en: "SEO", uk: "SEO", color: "blue" },
  ecommerce: { en: "E-commerce", uk: "E-commerce", color: "orange" },
  trust: { en: "Trust & Authority", uk: "Довіра", color: "amber" },
  erp: { en: "ERP & Operations", uk: "ERP та операції", color: "slate" },
};
