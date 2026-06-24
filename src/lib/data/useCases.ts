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
  {
    slug: "predict-fraud-banking",
    titleEn: "How to detect banking fraud in real time with ML",
    titleUk: "Як виявляти банківське шахрайство в реальному часі за допомогою ML",
    category: "ai",
    icon: "🔐",
    whoEn: "UK retail banks, challenger banks, credit unions, payment institutions",
    whoUk: "Британські роздрібні банки, челленджер-банки, кредитні спілки, платіжні установи",
    problemEn:
      "UK banks lose over £1.2 billion annually to authorised push payment (APP) and card fraud. Legacy rule-based systems flag 3–4% of legitimate transactions as suspicious, damaging customer trust, while missing novel fraud patterns that cost £8,000–£40,000 per incident. FCA and MLRO obligations require a full audit trail for every decision.",
    problemUk:
      "Британські банки щороку втрачають понад £1.2 млрд через шахрайство з авторизованими платежами (APP) та картками. Застарілі системи на правилах помилково позначають 3–4% легітимних транзакцій як підозрілі, підриваючи довіру клієнтів, та пропускають нові шахрайські схеми вартістю £8,000–£40,000 за інцидент. Вимоги FCA та MLRO зобов'язують вести повний аудит-лог кожного рішення.",
    solutionEn:
      "We build a real-time transaction scoring engine using XGBoost and graph neural networks trained on your historical transaction and account data. Each transaction is scored in under 30 ms with SHAP explainability, generating a human-readable rationale for every flag. The system ships with an FCA-compliant MLRO audit dashboard and automated Suspicious Activity Report (SAR) drafting.",
    solutionUk:
      "Ми будуємо движок скорингу транзакцій у реальному часі на базі XGBoost та graph neural networks, навчених на ваших транзакційних та акаунт-даних. Кожна транзакція оцінюється менш ніж за 30 мс з SHAP-поясненням, генеруючи людиночитану причину для кожного флага. Система постачається з FCA-сумісним MLRO-дашбордом аудиту та автоматичним складанням Suspicious Activity Report (SAR).",
    resultQuoteEn:
      "Clients reduce false-positive fraud alerts by 65%, cut APP fraud losses by £380,000 in the first year, and pass FCA model-risk review with zero audit findings.",
    resultQuoteUk:
      "Клієнти скорочують помилкові сповіщення про шахрайство на 65%, зменшують збитки від APP-шахрайства на £380,000 у першому році та успішно проходять перевірку моделі FCA без зауважень.",
    metaTitleEn: "ML Banking Fraud Detection | FCA-Ready | Codeworth",
    metaTitleUk: "ML-виявлення банківського шахрайства | FCA | Codeworth",
    metaDescriptionEn:
      "Real-time transaction scoring in <30 ms. XGBoost + GNN + SHAP. FCA MLRO audit dashboard. Reduce APP fraud losses by £380k. Codeworth.",
    metaDescriptionUk:
      "Скоринг транзакцій у реальному часі за <30 мс. XGBoost + GNN + SHAP. MLRO-дашборд для FCA. Зниження збитків на £380k. Codeworth.",
    relatedPortfolio: ["fraud-detection-bank", "fraud-detection-fintech"],
    relatedServices: ["machine-learning", "artificial-intelligence", "mlops"],
    relatedExtras: ["ml-explainability", "compliance-audit-trail"],
  },
  {
    slug: "predictive-maintenance-manufacturing",
    titleEn: "How to prevent equipment failures with ML predictive maintenance",
    titleUk: "Як запобігти відмовам обладнання за допомогою ML-предиктивного обслуговування",
    category: "automation",
    icon: "⚙️",
    whoEn: "UK manufacturers, food processors, automotive suppliers, energy companies",
    whoUk: "Британські виробники, харчові переробники, автомобільні постачальники, енергетичні компанії",
    problemEn:
      "Unplanned downtime costs UK manufacturers an average of £260,000 per hour on critical production lines. Preventive maintenance schedules are calendar-based rather than condition-based, leading to either premature part replacement or catastrophic failure. IoT sensors on the shop floor generate millions of data points that no team has capacity to analyse manually.",
    problemUk:
      "Незаплановані простої коштують британським виробникам у середньому £260,000 на годину на критичних виробничих лініях. Графіки технічного обслуговування базуються на календарі, а не на стані обладнання, що призводить до передчасної заміни деталей або катастрофічних відмов. IoT-датчики на виробничому майданчику генерують мільйони точок даних, які жодна команда не здатна аналізувати вручну.",
    solutionEn:
      "We deploy a time-series anomaly detection and failure prediction pipeline using LSTM networks and isolation forests on your existing sensor streams (vibration, temperature, pressure, current). The system predicts failure windows 72–120 hours in advance, automatically creates work orders in your CMMS, and continuously retrains as new failure events are logged.",
    solutionUk:
      "Ми розгортаємо пайплайн виявлення аномалій у часових рядах та прогнозу відмов на основі LSTM-мереж та isolation forests на ваших існуючих потоках датчиків (вібрація, температура, тиск, струм). Система прогнозує вікна відмов за 72–120 годин наперед, автоматично створює наряди в CMMS та безперервно перенавчається у міру надходження нових подій відмов.",
    resultQuoteEn:
      "Clients reduce unplanned downtime by 42%, cut maintenance costs by £120,000 per year per production line, and extend average equipment lifespan by 18 months.",
    resultQuoteUk:
      "Клієнти скорочують незаплановані простої на 42%, зменшують витрати на обслуговування на £120,000 на рік на виробничу лінію та продовжують середній термін служби обладнання на 18 місяців.",
    metaTitleEn: "ML Predictive Maintenance for UK Manufacturing | Codeworth",
    metaTitleUk: "ML-предиктивне обслуговування для UK виробництва | Codeworth",
    metaDescriptionEn:
      "IoT sensor ML: predict equipment failure 72–120 h ahead. Downtime −42%, maintenance costs −£120k/year per line. Codeworth.",
    metaDescriptionUk:
      "ML на IoT-датчиках: прогноз відмов за 72–120 год. Простої −42%, витрати −£120k/рік на лінію. Codeworth.",
    relatedPortfolio: ["churn-prediction-saas", "fraud-detection-bank"],
    relatedServices: ["machine-learning", "mlops"],
    relatedExtras: ["iot-ml-pipeline", "anomaly-detection"],
  },
  {
    slug: "nlp-contract-analysis",
    titleEn: "How to automate contract review and risk scoring with NLP",
    titleUk: "Як автоматизувати перевірку договорів та ризик-скоринг за допомогою NLP",
    category: "ai",
    icon: "📜",
    whoEn: "UK law firms, in-house legal teams, corporate M&A, commercial real estate",
    whoUk: "Британські юридичні фірми, корпоративні юридичні відділи, M&A, комерційна нерухомість",
    problemEn:
      "A mid-size UK law firm spends 2–4 hours reviewing each commercial contract at a cost of £400–£1,200 per document. Associates spend 60% of their time on clause extraction and risk identification rather than strategic advice. Deal timelines stretch to 3–6 weeks even for standard agreements, frustrating clients and capping revenue per partner.",
    problemUk:
      "Середня британська юридична фірма витрачає 2–4 години на перевірку кожного комерційного договору вартістю £400–£1,200 за документ. Молодші юристи витрачають 60% часу на вилучення пунктів та ідентифікацію ризиків замість стратегічних консультацій. Терміни угод розтягуються до 3–6 тижнів навіть для стандартних договорів, що розчаровує клієнтів та обмежує дохід на партнера.",
    solutionEn:
      "We fine-tune a domain-specific NLP model on UK contract law corpora to extract 140+ standard clause types, flag missing or non-standard terms, and produce a RAG risk score with source citations. Integration with your document management system (iManage, NetDocuments) means lawyers receive a structured risk report in under 4 minutes per contract.",
    solutionUk:
      "Ми дообробляємо доменно-специфічну NLP-модель на корпусах британського договірного права для вилучення 140+ стандартних типів пунктів, позначення відсутніх або нестандартних умов та формування RAG-оцінки ризику з посиланнями на джерела. Інтеграція з вашою системою управління документами (iManage, NetDocuments) означає, що юристи отримують структурований звіт про ризики менш ніж за 4 хвилини на договір.",
    resultQuoteEn:
      "Contract review time drops from 3.2 hours to 18 minutes. Law firms recover £280,000 per year in billable associate hours, and deal cycle time falls from 4 weeks to 6 days.",
    resultQuoteUk:
      "Час перевірки договору скорочується з 3.2 години до 18 хвилин. Юридичні фірми повертають £280,000 на рік у вигляді оплачуваних годин асоціатів, а цикл угод скорочується з 4 тижнів до 6 днів.",
    metaTitleEn: "NLP Contract Review & Risk Scoring for UK Law | Codeworth",
    metaTitleUk: "NLP-аналіз договорів та ризик-скоринг для UK права | Codeworth",
    metaDescriptionEn:
      "Fine-tuned NLP: 140+ clause types, risk score with citations. Review time 3.2 h → 18 min. Recover £280k/year. Codeworth.",
    metaDescriptionUk:
      "NLP: 140+ типів пунктів, ризик-скор з посиланнями. Перевірка 3.2 год → 18 хв. Повернення £280k/рік. Codeworth.",
    relatedPortfolio: ["ai-chatbot-saas", "fraud-detection-bank"],
    relatedServices: ["nlp", "llm-rag", "artificial-intelligence"],
    relatedExtras: ["doc-intelligence", "legal-rag"],
  },
  {
    slug: "ml-dynamic-pricing",
    titleEn: "How to optimise pricing with ML demand elasticity models",
    titleUk: "Як оптимізувати ціноутворення за допомогою ML-моделей еластичності попиту",
    category: "ecommerce",
    icon: "💷",
    whoEn: "UK e-commerce retailers, marketplace sellers, travel and hospitality businesses",
    whoUk: "Британські e-commerce ритейлери, продавці маркетплейсів, туристичні та готельні бізнеси",
    problemEn:
      "UK retailers running static price lists leave 12–18% gross margin on the table. Manual repricing cannot react to competitor moves, seasonal shifts, or live inventory levels fast enough. Overstock costs £3,500 per SKU per quarter in warehousing and markdown, while stockout events cost £1,800 per SKU in lost revenue.",
    problemUk:
      "Британські ритейлери зі статичними прайсами втрачають 12–18% валової маржі. Ручне переоцінювання не може достатньо швидко реагувати на кроки конкурентів, сезонні зміни або поточні рівні запасів. Надлишок запасів коштує £3,500 на SKU на квартал у складуванні та уцінці, тоді як відсутність товару коштує £1,800 на SKU у втраченому доході.",
    solutionEn:
      "We build a real-time dynamic pricing engine that models demand elasticity per SKU using gradient boosting on your sales history, competitor price feeds, weather, and event calendars. The engine reprices up to 50,000 SKUs every 15 minutes and includes guardrails for MAP agreements and margin floors, with a merchant override dashboard.",
    solutionUk:
      "Ми будуємо движок динамічного ціноутворення в реальному часі, що моделює еластичність попиту на SKU за допомогою gradient boosting на основі вашої торгової історії, конкурентних цін, погоди та подійних календарів. Движок переоцінює до 50,000 SKU кожні 15 хвилин та включає захисні бар'єри для MAP-угод та мінімальної маржі з дашбордом управління для мерчантів.",
    resultQuoteEn:
      "Retailers using our ML pricing engine see gross margin increase of 14–19%, revenue uplift of £220,000 per year for a £2M annual turnover business, and stockout rate fall by 31%.",
    resultQuoteUk:
      "Ритейлери, що використовують наш ML-движок ціноутворення, бачать зростання валової маржі на 14–19%, приріст виручки на £220,000 на рік для бізнесу з £2M річного обороту та зниження частки відсутніх товарів на 31%.",
    metaTitleEn: "ML Dynamic Pricing for UK E-commerce | Codeworth",
    metaTitleUk: "ML динамічне ціноутворення для UK e-commerce | Codeworth",
    metaDescriptionEn:
      "Demand elasticity ML: reprice 50k SKUs every 15 min. Margin +14–19%, revenue +£220k/year. MAP guardrails included. Codeworth.",
    metaDescriptionUk:
      "ML еластичності попиту: переоцінка 50k SKU кожні 15 хв. Маржа +14–19%, виручка +£220k/рік. MAP-захист включено. Codeworth.",
    relatedPortfolio: ["churn-prediction-saas", "fraud-detection-bank"],
    relatedServices: ["machine-learning", "mlops"],
    relatedExtras: ["pricing-engine", "competitor-price-feed"],
  },
  {
    slug: "credit-scoring-ml",
    titleEn: "How to build FCA-compliant ML credit underwriting",
    titleUk: "Як побудувати ML-андерайтинг кредитів відповідно до вимог FCA",
    category: "ai",
    icon: "🏦",
    whoEn: "UK consumer lenders, buy-now-pay-later platforms, mortgage brokers, credit unions",
    whoUk: "Британські споживчі кредитори, BNPL-платформи, іпотечні брокери, кредитні спілки",
    problemEn:
      "UK lenders relying on thin-file credit bureau data reject 28% of creditworthy applicants, leaving £4,200 average annual revenue per customer on the table. Traditional scorecard models cannot incorporate alternative data signals, leading to 9–14% default rates on approved loans and rising provisions that compress net interest margin.",
    problemUk:
      "Британські кредитори, що покладаються на дані кредитних бюро з мінімальною інформацією, відхиляють 28% кредитоспроможних заявників, втрачаючи в середньому £4,200 річного доходу на клієнта. Традиційні скорингові моделі не можуть враховувати альтернативні сигнали даних, що призводить до рівня дефолту 9–14% за затвердженими кредитами та зростання резервів, що стискають чисту відсоткову маржу.",
    solutionEn:
      "We build an XGBoost credit scoring pipeline that fuses bureau data with open banking transaction signals, income verification, and behavioural metadata. Every decision ships with SHAP-based explanations that satisfy FCA Consumer Duty requirements for explainability and adverse action notices, ensuring you can respond to any ICO Subject Access Request in under 72 hours.",
    solutionUk:
      "Ми будуємо XGBoost-пайплайн кредитного скорингу, що поєднує дані бюро з сигналами транзакцій open banking, верифікацією доходу та поведінковими метаданими. Кожне рішення постачається з SHAP-поясненнями, що задовольняють вимоги FCA Consumer Duty щодо пояснюваності та повідомлень про несприятливі дії, забезпечуючи відповідь на будь-який запит ICO SAR менш ніж за 72 години.",
    resultQuoteEn:
      "Lenders cut default rates from 11% to 6.4%, approve 22% more creditworthy applicants, and generate an additional £1.8M in interest income per £10M loan book annually.",
    resultQuoteUk:
      "Кредитори знижують рівень дефолту з 11% до 6.4%, схвалюють на 22% більше кредитоспроможних заявників та генерують додаткові £1.8M відсоткового доходу на £10M кредитного портфеля щорічно.",
    metaTitleEn: "ML Credit Scoring | FCA Consumer Duty Compliant | Codeworth",
    metaTitleUk: "ML кредитний скоринг | FCA Consumer Duty | Codeworth",
    metaDescriptionEn:
      "XGBoost + open banking credit scoring. Default rate −42%, approvals +22%. SHAP explainability for FCA Consumer Duty. Codeworth.",
    metaDescriptionUk:
      "XGBoost + open banking скоринг. Дефолти −42%, схвалення +22%. SHAP-пояснення для FCA Consumer Duty. Codeworth.",
    relatedPortfolio: ["fraud-detection-bank", "churn-prediction-saas"],
    relatedServices: ["machine-learning", "artificial-intelligence", "mlops"],
    relatedExtras: ["ml-explainability", "open-banking-integration"],
  },
  {
    slug: "medical-imaging-ai",
    titleEn: "How to assist radiologists with AI medical image classification",
    titleUk: "Як допомогти радіологам за допомогою AI-класифікації медичних зображень",
    category: "ai",
    icon: "🩻",
    whoEn: "UK NHS trusts, private radiology groups, medical device companies, teleradiology platforms",
    whoUk: "Британські трасти NHS, приватні радіологічні групи, виробники медичних пристроїв, платформи телерадіології",
    problemEn:
      "NHS radiology departments face a backlog of 1.7 million scans, with radiologists reporting 12–14 hour reporting queues for routine X-rays and MRIs. Missed findings in 3–5% of scans lead to delayed diagnoses that cost trusts an average of £82,000 per clinical negligence claim. Radiologist recruitment takes 12–18 months and costs £180,000 per hire.",
    problemUk:
      "Радіологічні відділення NHS стикаються з черговістю 1.7 мільйона знімків, при цьому радіологи повідомляють про черги 12–14 годин для рутинних рентгенівських знімків та МРТ. Пропущені знахідки у 3–5% знімків призводять до затриманих діагнозів, що коштують трастам у середньому £82,000 за кожну претензію через клінічну недбалість. Найм радіолога займає 12–18 місяців та коштує £180,000.",
    solutionEn:
      "We build a computer vision triage pipeline using CNN ensembles fine-tuned on DICOM datasets to classify chest X-rays, brain MRIs, and musculoskeletal studies. The system flags critical findings (pneumothorax, haemorrhage, fracture) for immediate review, auto-prioritises the worklist, and generates a structured pre-report that radiologists approve in 4 minutes rather than 18. All models are validated against UKCA/CE-IVD requirements.",
    solutionUk:
      "Ми будуємо пайплайн тріажу комп'ютерного зору з використанням CNN-ансамблів, дооброблених на DICOM-датасетах, для класифікації рентгенівських знімків грудної клітки, МРТ головного мозку та опорно-рухового апарату. Система позначає критичні знахідки (пневмоторакс, крововилив, перелом) для негайного огляду, автоматично пріоритизує список завдань та генерує структурований пре-репорт, який радіологи затверджують за 4 хвилини замість 18. Усі моделі валідовані відповідно до вимог UKCA/CE-IVD.",
    resultQuoteEn:
      "Radiology teams report 62% reduction in mean reporting time, 91% sensitivity on critical finding detection, and a £340,000 annual saving per 5-radiologist department through worklist efficiency gains.",
    resultQuoteUk:
      "Радіологічні команди повідомляють про скорочення середнього часу опису на 62%, 91% чутливість при виявленні критичних знахідок та £340,000 щорічної економії на 5-радіологічний відділ завдяки ефективності списку завдань.",
    metaTitleEn: "AI Medical Imaging for UK NHS Radiology | Codeworth",
    metaTitleUk: "AI медична візуалізація для радіології NHS | Codeworth",
    metaDescriptionEn:
      "CNN triage for chest X-ray, brain MRI. Critical findings flagged instantly. Report time −62%. UKCA-validated. Codeworth.",
    metaDescriptionUk:
      "CNN тріаж рентгену та МРТ. Критичні знахідки виявляються миттєво. Час опису −62%. UKCA-валідація. Codeworth.",
    relatedPortfolio: ["fraud-detection-bank", "churn-prediction-saas"],
    relatedServices: ["computer-vision", "machine-learning", "mlops"],
    relatedExtras: ["dicom-integration", "clinical-ai-validation"],
  },
  {
    slug: "customer-segmentation-ml",
    titleEn: "How to personalise campaigns with ML customer segmentation",
    titleUk: "Як персоналізувати кампанії за допомогою ML-сегментації клієнтів",
    category: "conversion",
    icon: "🎯",
    whoEn: "UK retail chains, e-commerce brands, subscription services, financial services",
    whoUk: "Британські роздрібні мережі, e-commerce бренди, підписочні сервіси, фінансові послуги",
    problemEn:
      "UK retailers sending the same promotional email to their entire database see average open rates of 18% and conversion rates under 2%. Without behavioural segmentation, high-value customers receive the same low-margin discount offers as dormant accounts, eroding brand equity. Marketing teams spend £140,000 annually on campaigns that deliver a blended 2.8× ROAS when RFM segmentation could unlock 6–8× ROAS for top tiers.",
    problemUk:
      "Британські ритейлери, що надсилають один рекламний лист по всій базі, бачать середній open rate 18% та конверсію нижче 2%. Без поведінкової сегментації high-value клієнти отримують ті самі низькомаржинальні знижкові пропозиції, що й неактивні акаунти, підриваючи капітал бренду. Маркетингові команди витрачають £140,000 щорічно на кампанії з сукупним ROAS 2.8×, тоді як RFM-сегментація могла б розблокувати 6–8× ROAS для топ-рівнів.",
    solutionEn:
      "We build an automated ML segmentation pipeline combining RFM scoring, K-means and DBSCAN clustering on purchase history, browsing behaviour, and CRM lifecycle stage. Output is 8–12 actionable micro-segments synced daily to your CRM (Klaviyo, Salesforce, HubSpot) with tailored content recommendations and send-time optimisation per segment.",
    solutionUk:
      "Ми будуємо автоматизований ML-пайплайн сегментації, що поєднує RFM-скоринг, K-means та DBSCAN кластеризацію на основі історії покупок, поведінки перегляду та стадії CRM life-cycle. Результат — 8–12 дієвих мікросегментів, що щоденно синхронізуються з вашою CRM (Klaviyo, Salesforce, HubSpot) з персоналізованими рекомендаціями контенту та оптимізацією часу відправлення для кожного сегмента.",
    resultQuoteEn:
      "Clients see email revenue grow by £190,000 per year, average order value increase 24%, and ROAS improve from 2.8× to 6.4× within 90 days of the first segmented send.",
    resultQuoteUk:
      "Клієнти бачать зростання email-виручки на £190,000 на рік, збільшення середнього чека на 24% та покращення ROAS з 2.8× до 6.4× протягом 90 днів від першого сегментованого надсилання.",
    metaTitleEn: "ML Customer Segmentation for UK Retail | Codeworth",
    metaTitleUk: "ML сегментація клієнтів для UK ритейлу | Codeworth",
    metaDescriptionEn:
      "RFM + K-means segmentation synced to Klaviyo/Salesforce. Email revenue +£190k/year, ROAS 2.8× → 6.4×. Codeworth.",
    metaDescriptionUk:
      "RFM + K-means сегментація, синхронізована з Klaviyo/Salesforce. Email-виручка +£190k/рік, ROAS 2.8× → 6.4×. Codeworth.",
    relatedPortfolio: ["churn-prediction-saas", "ai-chatbot-saas"],
    relatedServices: ["machine-learning", "artificial-intelligence"],
    relatedExtras: ["crm-ml-sync", "personalisation-engine"],
  },
  {
    slug: "demand-forecasting-retail",
    titleEn: "How to reduce stockouts 40% with ML demand forecasting",
    titleUk: "Як скоротити відсутність товарів на 40% за допомогою ML-прогнозу попиту",
    category: "erp",
    icon: "📦",
    whoEn: "UK grocery retailers, FMCG distributors, wholesale suppliers, pharmacy chains",
    whoUk: "Британські продовольчі ритейлери, FMCG-дистриб'ютори, оптові постачальники, аптечні мережі",
    problemEn:
      "UK retailers carry £21 billion in excess inventory while simultaneously losing £11 billion annually to out-of-stock events. Traditional ERP demand planning relies on 12-week rolling averages that cannot adapt to weather events, Bank Holidays, or viral social trends. Buyers spend 3–4 days per week on manual reorder adjustments that still result in a 9% stockout rate and a 22% overstock rate across the estate.",
    problemUk:
      "Британські ритейлери тримають £21 млрд надлишкових запасів, одночасно втрачаючи £11 млрд щорічно через відсутність товарів. Традиційне ERP-планування попиту покладається на 12-тижневі ковзні середні, які не можуть адаптуватися до погодних явищ, банківських свят або вірусних соціальних трендів. Покупці витрачають 3–4 дні на тиждень на ручне коригування замовлень, що все одно призводить до 9% відсутності товарів та 22% надлишку по мережі.",
    solutionEn:
      "We build a hierarchical demand forecasting model using LightGBM and Prophet with external regressors including weather API, Google Trends, promotional calendar, and competitor out-of-stock signals. The system generates SKU-store-day level forecasts 12 weeks ahead, auto-generates purchase orders in your ERP (SAP, Oracle, Microsoft D365), and retrains weekly on actuals.",
    solutionUk:
      "Ми будуємо ієрархічну модель прогнозу попиту на основі LightGBM та Prophet із зовнішніми регресорами: weather API, Google Trends, промо-календар та сигнали про відсутність товарів у конкурентів. Система генерує прогнози на рівні SKU-магазин-день на 12 тижнів вперед, автоматично генерує замовлення на закупівлю у вашій ERP (SAP, Oracle, Microsoft D365) та перенавчається щотижня на фактичних даних.",
    resultQuoteEn:
      "Retailers using our demand forecasting engine cut stockout rates from 9% to 5.2%, reduce inventory holding costs by 25% (saving £480,000 per year for a 50-store estate), and free buyers from 14 hours of weekly manual reorder work.",
    resultQuoteUk:
      "Ритейлери з нашим движком прогнозу попиту скорочують відсутність товарів з 9% до 5.2%, зменшують витрати на зберігання запасів на 25% (економія £480,000 на рік для мережі з 50 магазинів) та звільняють покупців від 14 годин щотижневої ручної роботи з замовленнями.",
    metaTitleEn: "ML Demand Forecasting for UK Retail | ERP Integration | Codeworth",
    metaTitleUk: "ML прогноз попиту для UK ритейлу | ERP | Codeworth",
    metaDescriptionEn:
      "LightGBM + Prophet demand forecasting. Stockouts −40%, inventory costs −25%, save £480k/year. SAP/Oracle/D365 integration. Codeworth.",
    metaDescriptionUk:
      "LightGBM + Prophet прогноз попиту. Відсутність товарів −40%, запаси −25%, економія £480k/рік. SAP/Oracle/D365. Codeworth.",
    relatedPortfolio: ["churn-prediction-saas", "fraud-detection-bank"],
    relatedServices: ["machine-learning", "mlops"],
    relatedExtras: ["erp-ml-integration", "supply-chain-analytics"],
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
