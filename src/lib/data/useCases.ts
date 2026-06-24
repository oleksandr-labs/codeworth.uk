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
  {
    slug: "ma-due-diligence-automation",
    titleEn: "M&A Due Diligence Automation",
    titleUk: "Автоматизація M&A due diligence",
    category: "ai",
    icon: "⚖️",
    whoEn: "Magic Circle and Silver Circle law firms, corporate M&A teams",
    whoUk: "Magic Circle та Silver Circle юридичні фірми, корпоративні M&A команди",
    problemEn:
      "Magic Circle and Silver Circle law firms spend 3-4 weeks per transaction on manual contract review, consuming £800/hour senior associate time on mechanical document extraction.",
    problemUk:
      "Magic Circle та Silver Circle юридичні фірми витрачають 3-4 тижні на транзакцію на ручний перегляд контрактів, використовуючи час старших помічників за £800/год на механічне вилучення документів.",
    solutionEn:
      "Fine-tuned BERT/LegalBERT extracts clauses, flags risks (indemnities, change of control, IP assignment), and cross-references anomalies across 400-600 page data rooms in hours.",
    solutionUk:
      "Fine-tuned BERT/LegalBERT витягує пункти, сигналізує про ризики та перехресно посилається на аномалії у кімнатах даних на 400-600 сторінок за години.",
    resultQuoteEn:
      "Due diligence review reduced from 3-4 weeks to 4-5 days. Associate time on mechanical review cut 73%. Firms win competitive mandates citing faster timelines.",
    resultQuoteUk:
      "Due diligence скорочено з 3-4 тижнів до 4-5 днів. Час на механічний перегляд зменшено на 73%. Фірми виграють мандати завдяки швидшим термінам.",
    metaTitleEn: "M&A Due Diligence Automation | LegalBERT | Codeworth",
    metaTitleUk: "Автоматизація M&A Due Diligence | LegalBERT | Codeworth",
    metaDescriptionEn:
      "Fine-tuned BERT/LegalBERT for M&A data rooms. Review time 3-4 weeks → 4-5 days. Associate time cut 73%. Codeworth.",
    metaDescriptionUk:
      "Fine-tuned BERT/LegalBERT для M&A data rooms. Перегляд 3-4 тижні → 4-5 днів. Час асоціата скорочено на 73%. Codeworth.",
    relatedPortfolio: ["nlp-contract-analysis", "fraud-detection-bank"],
    relatedServices: ["nlp", "machine-learning", "artificial-intelligence"],
    relatedExtras: ["legal-rag", "doc-intelligence"],
  },
  {
    slug: "variable-rate-application-agritech",
    titleEn: "Variable Rate Application for Arable Farms",
    titleUk: "Диференційоване внесення добрив для орних ферм",
    category: "erp",
    icon: "🌾",
    whoEn: "UK arable farm estates, AgriTech operators, farm management consultancies",
    whoUk: "UK орні ферми, AgriTech оператори, консультанти з управління фермами",
    problemEn:
      "UK arable farms applying uniform fertiliser rates across variable soil types waste 20-30% of input costs in productive zones while under-performing in marginal areas.",
    problemUk:
      "UK орні ферми що вносять однорідні норми добрив на різних типах ґрунту витрачають 20-30% витрат на виробничі зони та недовиконують на маргінальних ділянках.",
    solutionEn:
      "Sentinel-2 satellite imagery combined with soil sensor data and 5-year yield maps generates per-field VRA prescriptions exported directly to John Deere and CNH machinery.",
    solutionUk:
      "Супутникові знімки Sentinel-2 разом з даними ґрунтових датчиків та 5-річними картами врожайності генерують рецепти VRA на поле, що експортуються прямо на техніку John Deere і CNH.",
    resultQuoteEn:
      "22% reduction in fertiliser costs (£340K/year on 12,000-hectare estate). 8% average yield improvement. 1,240 tonnes CO2e ELMS carbon credits earned.",
    resultQuoteUk:
      "Зниження витрат на добрива на 22% (£340K/рік на 12 000 га). Середнє підвищення врожайності на 8%. Отримано 1 240 тонн CO2e вуглецевих кредитів ELMS.",
    metaTitleEn: "ML Variable Rate Application for UK Arable Farms | Codeworth",
    metaTitleUk: "ML Диференційоване внесення добрив для UK ферм | Codeworth",
    metaDescriptionEn:
      "Sentinel-2 + soil sensors → VRA prescriptions. Fertiliser costs −22% (£340K/year). ELMS carbon credits. John Deere/CNH export. Codeworth.",
    metaDescriptionUk:
      "Sentinel-2 + ґрунтові датчики → рецепти VRA. Витрати на добрива −22% (£340K/рік). Вуглецеві кредити ELMS. Codeworth.",
    relatedPortfolio: ["churn-prediction-saas", "fraud-detection-bank"],
    relatedServices: ["machine-learning", "mlops"],
    relatedExtras: ["iot-ml-pipeline", "supply-chain-analytics"],
  },
  {
    slug: "ml-portfolio-optimisation-wealth",
    titleEn: "ML-Enhanced Portfolio Construction for UK Wealth Managers",
    titleUk: "ML-покращена побудова портфелів для UK wealth managers",
    category: "ai",
    icon: "📈",
    whoEn: "UK wealth managers, DFMs, multi-family offices, FCA-regulated investment firms",
    whoUk: "UK wealth managers, DFM, multi-family offices, FCA-регульовані інвестиційні фірми",
    problemEn:
      "Traditional mean-variance optimisation underperforms during UK market regime changes (2022 rate cycle, 2023 banking stress). Manual rebalancing cannot react fast enough to maintain FCA Consumer Duty suitability.",
    problemUk:
      "Традиційна mean-variance оптимізація недостатньо ефективна під час змін ринкового режиму UK. Ручне ребалансування не може реагувати достатньо швидко для підтримки відповідності FCA Consumer Duty.",
    solutionEn:
      "Black-Litterman combined with Hidden Markov Model regime detection and factor exposure management. Consumer Duty suitability reports auto-generated per client per rebalancing event.",
    solutionUk:
      "Black-Litterman поєднаний з Hidden Markov Model для виявлення режимів та управління факторним впливом. Звіти відповідності Consumer Duty автоматично генеруються для кожного клієнта.",
    resultQuoteEn:
      "Sharpe ratio improved 0.31 to 0.47. Maximum drawdown reduced 18% during volatile periods. 4 hours/advisor/month saved on Consumer Duty documentation.",
    resultQuoteUk:
      "Sharpe ratio покращився з 0.31 до 0.47. Максимальна просадка зменшилась на 18%. Збережено 4 год/менеджер/міс на документацію Consumer Duty.",
    metaTitleEn: "ML Portfolio Optimisation for UK Wealth Managers | Codeworth",
    metaTitleUk: "ML оптимізація портфелів для UK wealth managers | Codeworth",
    metaDescriptionEn:
      "Black-Litterman + HMM regime detection. Sharpe 0.31 → 0.47, drawdown −18%. FCA Consumer Duty reports automated. Codeworth.",
    metaDescriptionUk:
      "Black-Litterman + HMM виявлення режимів. Sharpe 0.31 → 0.47, просадка −18%. Автоматичні звіти FCA Consumer Duty. Codeworth.",
    relatedPortfolio: ["fraud-detection-bank", "churn-prediction-saas"],
    relatedServices: ["machine-learning", "artificial-intelligence", "mlops"],
    relatedExtras: ["ml-explainability", "compliance-audit-trail"],
  },
  {
    slug: "nhs-dna-prediction",
    titleEn: "Did-Not-Attend (DNA) Prediction for NHS Outpatients",
    titleUk: "Прогнозування неявок (DNA) для амбулаторних пацієнтів NHS",
    category: "ai",
    icon: "🏥",
    whoEn: "NHS trusts, acute hospital groups, community health providers",
    whoUk: "NHS трасти, гострі лікарняні групи, постачальники громадської охорони здоров'я",
    problemEn:
      "NHS trusts lose £1.2B annually to missed outpatient appointments. Rule-based reminder systems achieve only 12% reduction in DNAs while flooding low-risk patients with unnecessary communications.",
    problemUk:
      "NHS трасти щорічно втрачають £1.2 млрд через пропущені амбулаторні прийоми. Системи нагадувань на основі правил досягають лише 12% зниження DNA.",
    solutionEn:
      "ML model combining patient history, appointment type, distance, weather, and day-of-week signals. High-risk patients receive targeted interventions (calls, transport assistance, rescheduling offers).",
    solutionUk:
      "ML модель що поєднує історію пацієнта, тип прийому, відстань, погоду та сигнали дня тижня. Пацієнти з високим ризиком отримують цільові втручання.",
    resultQuoteEn:
      "33% reduction in non-attendances. £490K annual saving per trust. Caldicott Guardian and NHS DSPT compliant. Model explainability report provided for clinical governance.",
    resultQuoteUk:
      "Зниження неявок на 33%. £490K економія на рік на траст. Відповідність Caldicott Guardian та NHS DSPT. Надано звіт про інтерпретованість моделі.",
    metaTitleEn: "NHS DNA Prediction | ML Outpatient No-Show | Codeworth",
    metaTitleUk: "NHS Прогноз неявок DNA | ML | Codeworth",
    metaDescriptionEn:
      "ML model for NHS DNA prediction. Non-attendances −33%, £490K saved per trust. NHS DSPT & Caldicott compliant. Codeworth.",
    metaDescriptionUk:
      "ML модель для прогнозу неявок NHS. Неявки −33%, £490K економія на траст. Відповідність NHS DSPT. Codeworth.",
    relatedPortfolio: ["fraud-detection-bank", "churn-prediction-saas"],
    relatedServices: ["machine-learning", "predictive-analytics"],
    relatedExtras: ["clinical-ai-validation", "ml-explainability"],
  },
  {
    slug: "ecommerce-personalised-recommendations",
    titleEn: "Personalised Product Recommendations for UK E-commerce",
    titleUk: "Персоналізовані рекомендації продуктів для UK e-commerce",
    category: "ecommerce",
    icon: "🛒",
    whoEn: "UK online retailers, DTC brands, marketplace sellers",
    whoUk: "UK онлайн-рітейлери, DTC бренди, продавці маркетплейсів",
    problemEn:
      "UK online retailers average 2.3% conversion rate. Showing all customers the same bestseller list ignores individual preferences and leaves 40-60% of product catalogue permanently undiscovered.",
    problemUk:
      "UK онлайн-рітейлери в середньому мають 2.3% конверсії. Показуючи всім клієнтам однаковий список бестселерів ігнорує індивідуальні вподобання.",
    solutionEn:
      "Two-tower neural network collaborative filtering personalises homepage, email, and basket page recommendations. Cold-start handled with content-based features for new products and new users.",
    solutionUk:
      "Two-tower нейромережний collaborative filtering персоналізує рекомендації на головній сторінці, в електронній пошті та на сторінці кошика.",
    resultQuoteEn:
      "Average order value increased 19%. Email CTR improved from 3.1% to 7.8%. 26% of revenue now from recommended products (up from 8%). Paid back in 6 weeks.",
    resultQuoteUk:
      "Середня вартість замовлення збільшилась на 19%. CTR електронної пошти покращився з 3.1% до 7.8%. 26% доходу тепер від рекомендованих продуктів.",
    metaTitleEn: "Personalised Product Recommendations for UK E-commerce | Codeworth",
    metaTitleUk: "Персоналізовані рекомендації для UK e-commerce | Codeworth",
    metaDescriptionEn:
      "Two-tower neural network recommendations. AOV +19%, email CTR 3.1% → 7.8%, 26% revenue from recs. ROI in 6 weeks. Codeworth.",
    metaDescriptionUk:
      "Two-tower нейромережеві рекомендації. AOV +19%, CTR 3.1% → 7.8%, 26% доходу від рекомендацій. Окупність за 6 тижнів. Codeworth.",
    relatedPortfolio: ["churn-prediction-saas", "ai-chatbot-saas"],
    relatedServices: ["machine-learning", "artificial-intelligence"],
    relatedExtras: ["personalisation-engine", "crm-ml-sync"],
  },
  {
    slug: "ueba-insider-threat-detection",
    titleEn: "UEBA Insider Threat and Account Takeover Detection",
    titleUk: "Виявлення внутрішніх загроз та захоплення акаунтів через UEBA",
    category: "ai",
    icon: "🔐",
    whoEn: "UK fintechs, challenger banks, payment processors, regulated financial firms",
    whoUk: "UK фінтехи, челленджер-банки, платіжні процесори, регульовані фінансові фірми",
    problemEn:
      "Rule-based fraud detection triggers 34% false positive rate — blocking legitimate customers and overwhelming fraud operations teams. Sophisticated account takeover attacks evade static rules.",
    problemUk:
      "Виявлення шахрайства на основі правил дає 34% хибних спрацювань — блокуючи законних клієнтів та перевантажуючи команди боротьби з шахрайством.",
    solutionEn:
      "LSTM autoencoders detect session behavioural anomalies. Graph ML identifies fraud rings through relationship analysis. Sub-100ms real-time scoring with adaptive thresholds via champion/challenger.",
    solutionUk:
      "LSTM автоенкодери виявляють аномалії поведінки сесії. Graph ML ідентифікує шахрайські кільця. Оцінка в реальному часі менш ніж за 100 мс.",
    resultQuoteEn:
      "Fraud losses reduced 71% (£128K/month saved). False positive rate 34% to 6.2%. Fraud ops workload cut 58%. FCA-compliant adverse action notices auto-generated.",
    resultQuoteUk:
      "Шахрайські збитки зменшено на 71% (заощаджено £128K/міс). Хибні спрацювання 34% до 6.2%. Навантаження на ops скорочено на 58%.",
    metaTitleEn: "UEBA Insider Threat & Account Takeover Detection | Codeworth",
    metaTitleUk: "UEBA виявлення внутрішніх загроз та ATO | Codeworth",
    metaDescriptionEn:
      "LSTM + Graph ML for UEBA. Fraud losses −71% (£128K/month), false positives 34% → 6.2%. FCA adverse action notices. Codeworth.",
    metaDescriptionUk:
      "LSTM + Graph ML для UEBA. Шахрайство −71% (£128K/міс), хибні спрацювання 34% → 6.2%. Codeworth.",
    relatedPortfolio: ["fraud-detection-bank", "fraud-detection-fintech"],
    relatedServices: ["machine-learning", "artificial-intelligence", "mlops"],
    relatedExtras: ["ml-explainability", "compliance-audit-trail"],
  },
  {
    slug: "saas-churn-prediction-prevention",
    titleEn: "Customer Churn Prediction and Prevention for UK SaaS",
    titleUk: "Прогнозування та запобігання відтоку клієнтів для UK SaaS",
    category: "ai",
    icon: "📊",
    whoEn: "UK SaaS companies, subscription platforms, B2B software vendors",
    whoUk: "UK SaaS компанії, підписочні платформи, B2B постачальники програмного забезпечення",
    problemEn:
      "UK SaaS companies average 15-20% annual churn. Customer success teams discover at-risk accounts only when cancellation notices arrive — too late for effective intervention.",
    problemUk:
      "UK SaaS компанії мають 15-20% річного відтоку. Команди customer success дізнаються про проблемні акаунти лише коли надходять повідомлення про скасування — надто пізно.",
    solutionEn:
      "Gradient boosting model on 60+ product usage signals (login frequency, feature adoption, support tickets, invoice latency). At-risk score updated daily. Automated playbooks trigger CS outreach at optimal intervention points.",
    solutionUk:
      "Gradient boosting модель на 60+ сигналах використання продукту. Оцінка ризику оновлюється щодня. Автоматизовані playbooks запускають outreach CS у оптимальні моменти втручання.",
    resultQuoteEn:
      "Churn rate reduced from 18% to 11% in 12 months. MRR saved: £380K/year. CS team capacity freed by 35% through prioritised outreach list. 94% model accuracy at 30-day horizon.",
    resultQuoteUk:
      "Відтік знизився з 18% до 11% за 12 місяців. Збережений MRR: £380K/рік. Потужність CS команди звільнена на 35% завдяки пріоритетному списку.",
    metaTitleEn: "SaaS Churn Prediction & Prevention for UK | Codeworth",
    metaTitleUk: "Прогноз та запобігання відтоку SaaS для UK | Codeworth",
    metaDescriptionEn:
      "Gradient boosting on 60+ usage signals. Churn 18% → 11%, MRR saved £380K/year. CS capacity freed 35%. Codeworth.",
    metaDescriptionUk:
      "Gradient boosting на 60+ сигналах. Відтік 18% → 11%, збережений MRR £380K/рік. CS потужність +35%. Codeworth.",
    relatedPortfolio: ["ml-churn-predictor", "churn-prediction-saas"],
    relatedServices: ["machine-learning", "predictive-analytics"],
    relatedExtras: ["crm-ml-sync"],
  },
  {
    slug: "food-manufacturing-predictive-maintenance",
    titleEn: "Predictive Maintenance for UK Food Manufacturing",
    titleUk: "Прогностичне обслуговування для UK харчового виробництва",
    category: "automation",
    icon: "⚙️",
    whoEn: "UK food manufacturers, FMCG producers, beverage companies, co-packers",
    whoUk: "UK харчові виробники, FMCG виробники, виробники напоїв, co-packers",
    problemEn:
      "Unplanned equipment downtime in UK food manufacturing costs £180K-£500K per hour (including regulatory compliance implications for batch recall). Preventive maintenance schedules are based on calendar time, not actual equipment condition.",
    problemUk:
      "Незапланований простій обладнання у UK харчовому виробництві коштує £180K-£500K на годину. Профілактичне обслуговування базується на календарному часі, а не фактичному стані обладнання.",
    solutionEn:
      "Multivariate time-series anomaly detection on vibration, temperature, pressure, and power consumption sensors. LSTM model trained on 3 years of historical failure data predicts failures 72-96 hours before occurrence.",
    solutionUk:
      "Багатовимірне виявлення аномалій часового ряду на датчиках вібрації, температури, тиску та споживання енергії. LSTM модель прогнозує відмови за 72-96 годин.",
    resultQuoteEn:
      "Unplanned downtime reduced 67%. Maintenance costs cut 31% through condition-based scheduling. OEE improved from 71% to 84%. ROI achieved in 7 months.",
    resultQuoteUk:
      "Незапланований простій скорочено на 67%. Витрати на обслуговування знижено на 31%. OEE покращився з 71% до 84%. ROI досягнуто за 7 місяців.",
    metaTitleEn: "Predictive Maintenance for UK Food Manufacturing | Codeworth",
    metaTitleUk: "Прогностичне обслуговування для UK харчового виробництва | Codeworth",
    metaDescriptionEn:
      "LSTM anomaly detection on IoT sensors. Downtime −67%, maintenance costs −31%, OEE 71% → 84%. ROI in 7 months. Codeworth.",
    metaDescriptionUk:
      "LSTM виявлення аномалій на IoT датчиках. Простій −67%, обслуговування −31%, OEE 71% → 84%. ROI за 7 місяців. Codeworth.",
    relatedPortfolio: ["churn-prediction-saas", "fraud-detection-bank"],
    relatedServices: ["machine-learning", "mlops"],
    relatedExtras: ["iot-ml-pipeline", "anomaly-detection"],
  },
  {
    slug: "telecoms-churn-prediction",
    titleEn: "Telecom Operator Churn Prediction with Survival Analysis",
    titleUk: "Прогнозування відтоку телеком-оператора за допомогою survival analysis",
    category: "ai",
    icon: "📡",
    whoEn: "UK telecom operators, MVNOs, broadband providers",
    whoUk: "UK телеком-оператори, MVNO, постачальники широкосмугового зв'язку",
    problemEn:
      "UK telecom operators face intense switching pressure driven by OFCOM portability rules and aggressive offers from BT, EE, and Vodafone. Retention campaigns sent to the entire base waste budget and accelerate switching for customers who were not planning to leave.",
    problemUk:
      "UK телеком-оператори стикаються з інтенсивним тиском переходу клієнтів завдяки правилам OFCOM та агресивним пропозиціям BT, EE та Vodafone. Кампанії утримання, що надсилаються по всій базі, витрачають бюджет та прискорюють перехід клієнтів, які не планували йти.",
    solutionEn:
      "We build a survival analysis pipeline combined with XGBoost on OFCOM switching data, call detail records, and contract tenure signals. The model outputs 30/60/90-day churn probability per subscriber with top intervention features, enabling targeted retention offers only to genuinely at-risk customers.",
    solutionUk:
      "Ми будуємо пайплайн survival analysis у поєднанні з XGBoost на даних переходу OFCOM, деталях дзвінків та сигналах тривалості контракту. Модель видає ймовірність відтоку за 30/60/90 днів на абонента з топ-ознаками для втручання, дозволяючи цільові пропозиції утримання лише реально ризикованим клієнтам.",
    resultQuoteEn:
      "Clients reduce monthly churn by 23%, cut retention campaign spend by 35% through precise targeting, and recover £290,000 per year in subscriber revenue on a 500,000-subscriber base.",
    resultQuoteUk:
      "Клієнти скорочують місячний відтік на 23%, зменшують витрати на кампанії утримання на 35% завдяки точному таргетингу та повертають £290,000 на рік у доходах від абонентів на базі 500,000 абонентів.",
    metaTitleEn: "Telecom Churn Prediction | Survival Analysis + XGBoost | Codeworth",
    metaTitleUk: "Прогноз відтоку телеком | Survival Analysis + XGBoost | Codeworth",
    metaDescriptionEn:
      "Survival analysis + XGBoost for OFCOM-regulated telecoms. Monthly churn −23%, campaign spend −35%. BT/EE/Vodafone market. Codeworth.",
    metaDescriptionUk:
      "Survival analysis + XGBoost для OFCOM-ринку. Відтік −23%, витрати на кампанії −35%. Codeworth.",
    relatedPortfolio: ["ml-churn-predictor", "churn-prediction-saas"],
    relatedServices: ["machine-learning", "predictive-analytics"],
    relatedExtras: ["crm-ml-sync"],
  },
  {
    slug: "media-content-recommendation",
    titleEn: "Broadcaster Content Recommendation Engine",
    titleUk: "Движок рекомендацій контенту для мовника",
    category: "ai",
    icon: "📺",
    whoEn: "UK broadcasters, streaming platforms, VOD services",
    whoUk: "UK мовники, стрімінгові платформи, VOD-сервіси",
    problemEn:
      "UK broadcasters including BBC and ITV compete against Netflix and Disney for viewing time. Generic top-content carousels ignore individual viewing history, leading to low session depth and high abandonment rates. GDPR pseudonymisation requirements constrain the use of personal identifiers in recommendation models.",
    problemUk:
      "Британські мовники, включаючи BBC та ITV, конкурують з Netflix та Disney за час перегляду. Загальні каруселі топ-контенту ігнорують індивідуальну історію перегляду, що призводить до низької глибини сесії та високого відсотку виходу. Вимоги GDPR щодо псевдонімізації обмежують використання персональних ідентифікаторів у рекомендаційних моделях.",
    solutionEn:
      "We deploy a collaborative filtering engine with NLP content embeddings built on pseudonymised viewing signals in compliance with GDPR and Ofcom guidelines. The system personalises homepage, continue-watching, and end-card recommendations, with A/B testing infrastructure to measure watch-time uplift per cohort.",
    solutionUk:
      "Ми розгортаємо движок collaborative filtering з NLP-ембедингами контенту на основі псевдонімізованих сигналів перегляду відповідно до GDPR та рекомендацій Ofcom. Система персоналізує головну сторінку, рекомендації продовження перегляду та фінальні картки з A/B-тестовою інфраструктурою для вимірювання приросту часу перегляду по когортах.",
    resultQuoteEn:
      "Watch-time per session increases 34%. Content discovery rate for catalogue titles outside top 100 improves by 48%. Subscriber churn attributable to content dissatisfaction falls 19%.",
    resultQuoteUk:
      "Час перегляду за сесію зростає на 34%. Рівень відкриття контенту поза топ-100 покращується на 48%. Відтік підписників через незадоволеність контентом падає на 19%.",
    metaTitleEn: "Content Recommendation Engine for UK Broadcasters | Codeworth",
    metaTitleUk: "Движок рекомендацій контенту для UK мовників | Codeworth",
    metaDescriptionEn:
      "Collaborative filtering + NLP embeddings. Watch-time +34%, GDPR pseudonymised. BBC/ITV/VOD scale. Ofcom compliant. Codeworth.",
    metaDescriptionUk:
      "Collaborative filtering + NLP ембединги. Час перегляду +34%, GDPR-псевдонімізація. Відповідність Ofcom. Codeworth.",
    relatedPortfolio: ["churn-prediction-saas", "ai-chatbot-saas"],
    relatedServices: ["machine-learning", "artificial-intelligence"],
    relatedExtras: ["personalisation-engine"],
  },
  {
    slug: "government-fraud-detection-ml",
    titleEn: "Government Benefits and Tax Fraud Detection with ML",
    titleUk: "Виявлення шахрайства з пільгами та податками в держсекторі за допомогою ML",
    category: "ai",
    icon: "🏛️",
    whoEn: "UK government departments, HMRC, DWP, local authorities",
    whoUk: "Державні відомства UK, HMRC, DWP, місцеві органи влади",
    problemEn:
      "UK benefit fraud and error costs the public purse over £8 billion annually. HMRC and DWP rely on rule-based checks that flag only high-volume pattern matches, missing sophisticated multi-claim and identity fraud. Cabinet Office AI framework mandates explainability and human oversight for every automated public-sector decision.",
    problemUk:
      "Шахрайство та помилки з пільгами у Великобританії коштують державній скарбниці понад £8 млрд щорічно. HMRC та DWP покладаються на перевірки на основі правил, що виявляють лише патерни великого обсягу, пропускаючи складне шахрайство з кількома заявками та ідентифікаційне шахрайство. Рамкова AI-стратегія Cabinet Office зобов'язує забезпечити пояснюваність та людський нагляд за кожним автоматизованим рішенням.",
    solutionEn:
      "We build an anomaly detection and graph ML pipeline that cross-references claimant data across benefit streams and tax records to surface fraud rings and identity re-use. Every flag includes a SHAP-driven plain-English explanation for investigator review, and all model decisions are logged for Cabinet Office AI framework audit compliance.",
    solutionUk:
      "Ми будуємо пайплайн виявлення аномалій та graph ML, що перехресно посилається на дані заявників по потоках пільг та податкових записах для виявлення шахрайських угруповань та повторного використання ідентичностей. Кожен сигнал включає SHAP-пояснення зрозумілою мовою для огляду слідчих, а всі рішення моделі реєструються для перевірки відповідності AI-стратегії Cabinet Office.",
    resultQuoteEn:
      "Pilot deployments prevent an estimated £245M in fraudulent claims in year one, with investigator referral precision improving from 31% to 74% and false-positive investigation workload reduced by 58%.",
    resultQuoteUk:
      "Пілотні розгортання запобігають приблизно £245M шахрайських виплат у першому році, точність направлень слідчих покращується з 31% до 74%, а навантаження на розслідування хибних спрацювань знижується на 58%.",
    metaTitleEn: "Government Fraud Detection ML | HMRC DWP | Codeworth",
    metaTitleUk: "ML-виявлення шахрайства в держсекторі | HMRC DWP | Codeworth",
    metaDescriptionEn:
      "Anomaly detection + graph ML for HMRC/DWP fraud. £245M prevented. Cabinet Office AI framework compliant. SHAP explainability. Codeworth.",
    metaDescriptionUk:
      "Anomaly detection + graph ML для HMRC/DWP. £245M запобіжено. Відповідність Cabinet Office AI. SHAP-пояснення. Codeworth.",
    relatedPortfolio: ["fraud-detection-bank", "fraud-detection-fintech"],
    relatedServices: ["machine-learning", "artificial-intelligence", "mlops"],
    relatedExtras: ["ml-explainability", "compliance-audit-trail"],
  },
  {
    slug: "construction-defect-detection",
    titleEn: "Building Defect Detection via Computer Vision",
    titleUk: "Виявлення будівельних дефектів за допомогою комп'ютерного зору",
    category: "ai",
    icon: "🏗️",
    whoEn: "UK construction contractors, housing developers, building inspectors",
    whoUk: "UK будівельні підрядники, забудовники, будівельні інспектори",
    problemEn:
      "Post-Grenfell safety standards and CDM 2015 regulations require thorough defect documentation at every stage of construction. Manual visual inspection misses 20-35% of structural and finishing defects, leading to costly remediation, BIM record inaccuracies, and potential liability under the Building Safety Act 2022.",
    problemUk:
      "Стандарти безпеки після Грейнфелл та норми CDM 2015 вимагають ретельної документації дефектів на кожному етапі будівництва. Ручний візуальний огляд пропускає 20-35% структурних та оздоблювальних дефектів, що призводить до дорогих виправлень, неточностей BIM-записів та потенційної відповідальності згідно із Законом про безпеку будівель 2022 року.",
    solutionEn:
      "We train a YOLOv8 object detection model on a custom dataset of UK construction defect imagery covering cracks, water ingress, fire-stopping gaps, and cladding anomalies. The model runs on-site via mobile app or drone feed, logs findings directly to your BIM model, and generates a CDM-compliant defect report with GPS coordinates and photographic evidence.",
    solutionUk:
      "Ми навчаємо модель виявлення об'єктів YOLOv8 на кастомному датасеті зображень будівельних дефектів UK, що охоплює тріщини, проникнення води, прогалини у вогнезахисті та аномалії облицювання. Модель працює на будівельному майданчику через мобільний додаток або відеопотік дрона, реєструє знахідки безпосередньо у BIM-модель та генерує CDM-сумісний звіт про дефекти з GPS-координатами та фотодоказами.",
    resultQuoteEn:
      "Missed defect rate falls 67%, site inspection time reduces by 41%, and remediation costs decrease by £180,000 per major project through earlier detection.",
    resultQuoteUk:
      "Частка пропущених дефектів падає на 67%, час інспекції об'єкта скорочується на 41%, а витрати на усунення знижуються на £180,000 на великий проект завдяки ранньому виявленню.",
    metaTitleEn: "Construction Defect Detection | YOLOv8 | BIM | Codeworth",
    metaTitleUk: "Виявлення будівельних дефектів | YOLOv8 | BIM | Codeworth",
    metaDescriptionEn:
      "YOLOv8 defect detection for UK construction. Missed defects −67%. CDM 2015 + BIM compliant. Drone and mobile deployment. Codeworth.",
    metaDescriptionUk:
      "YOLOv8 виявлення дефектів для будівництва UK. Пропущені дефекти −67%. CDM 2015 + BIM. Codeworth.",
    relatedPortfolio: ["fraud-detection-bank", "churn-prediction-saas"],
    relatedServices: ["computer-vision", "machine-learning"],
    relatedExtras: ["dicom-integration"],
  },
  {
    slug: "dynamic-pricing-retail-ml",
    titleEn: "Dynamic Pricing for UK Retailers with CMA-Compliant ML",
    titleUk: "Динамічне ціноутворення для UK ритейлу з ML, сумісним з CMA",
    category: "ecommerce",
    icon: "🏷️",
    whoEn: "UK omnichannel retailers, grocery chains, marketplace sellers",
    whoUk: "UK омніканальні ритейлери, продовольчі мережі, продавці маркетплейсів",
    problemEn:
      "UK retailers using static price lists lose 12-18% gross margin to competitors with dynamic pricing capabilities. Manual repricing cannot react to intraday competitor moves while staying within Competition Act 1998 and CMA guidance on algorithmic pricing collusion risks.",
    problemUk:
      "UK ритейлери зі статичними прайсами втрачають 12-18% валової маржі конкурентам із можливостями динамічного ціноутворення. Ручне переоцінювання не може реагувати на внутрішньоденні кроки конкурентів, дотримуючись при цьому Закону про конкуренцію 1998 року та рекомендацій CMA щодо ризиків алгоритмічного цінового змови.",
    solutionEn:
      "We build a price elasticity ML model on your sales history, competitor price feeds, and demand signals, with CMA-compliant guardrails that prevent algorithmic price signalling. The engine reprices up to 50,000 SKUs every 15 minutes while enforcing margin floors, MAP agreements, and a full audit trail for CMA review.",
    solutionUk:
      "Ми будуємо ML-модель цінової еластичності на основі вашої торгової історії, цінових фідів конкурентів та сигналів попиту з захисними бар'єрами, що відповідають CMA та запобігають алгоритмічним сигналам про ціни. Движок переоцінює до 50,000 SKU кожні 15 хвилин, дотримуючись мінімальної маржі, MAP-угод та повного журналу аудиту для перевірки CMA.",
    resultQuoteEn:
      "UK retailers using the engine see gross margin improve by 4.2 percentage points, stockout rate fall by 28%, and pricing team manual workload reduced by 80%.",
    resultQuoteUk:
      "UK ритейлери, що використовують движок, бачать покращення валової маржі на 4.2 відсоткових пункти, зниження відсутності товарів на 28% та скорочення ручного навантаження на команду ціноутворення на 80%.",
    metaTitleEn: "Dynamic Pricing ML for UK Retailers | CMA Compliant | Codeworth",
    metaTitleUk: "ML динамічне ціноутворення для UK ритейлу | CMA | Codeworth",
    metaDescriptionEn:
      "Price elasticity ML: 50k SKUs repriced every 15 min. Gross margin +4.2pp. CMA + Competition Act 1998 compliant guardrails. Codeworth.",
    metaDescriptionUk:
      "ML цінової еластичності: 50k SKU кожні 15 хв. Маржа +4.2pp. CMA + Закон про конкуренцію 1998. Codeworth.",
    relatedPortfolio: ["churn-prediction-saas", "fraud-detection-bank"],
    relatedServices: ["machine-learning", "mlops"],
    relatedExtras: ["pricing-engine", "competitor-price-feed"],
  },
  {
    slug: "clinical-coding-automation",
    titleEn: "NHS Clinical Coding Automation with BERT",
    titleUk: "Автоматизація клінічного кодування NHS за допомогою BERT",
    category: "automation",
    icon: "🩺",
    whoEn: "NHS trusts, private hospital groups, clinical coding departments",
    whoUk: "NHS трасти, приватні лікарняні групи, відділи клінічного кодування",
    problemEn:
      "NHS clinical coding departments face a 40% vacancy rate for certified clinical coders. Manual ICD-10 and SNOMED coding of discharge summaries takes 45-90 minutes per episode, delays HRG-based tariff submissions, and introduces a 6-9% error rate that affects NHS trust income. NHS DSPT and Information Governance Toolkit requirements mandate strict access controls on patient data used in ML training.",
    problemUk:
      "Відділи клінічного кодування NHS мають рівень вакансій 40% для сертифікованих клінічних кодерів. Ручне кодування ICD-10 та SNOMED виписних епікризів займає 45-90 хвилин на епізод, затримує подання тарифів на основі HRG та вносить 6-9% похибок, що впливають на дохід NHS-трасту. Вимоги NHS DSPT та IG Toolkit зобов'язують суворий контроль доступу до даних пацієнтів, що використовуються при навчанні ML.",
    solutionEn:
      "We fine-tune a clinical BERT model on NHS discharge summary corpora to automatically assign ICD-10 primary and secondary diagnosis codes and SNOMED procedure codes. The pipeline integrates with your PAS and EPR systems, achieves 94.3% coding accuracy, flags low-confidence episodes for human review, and operates entirely within your NHS network under DSPT compliance.",
    solutionUk:
      "Ми дообробляємо клінічну BERT-модель на корпусах виписних епікризів NHS для автоматичного присвоєння кодів первинного та вторинного діагнозу ICD-10 і кодів процедур SNOMED. Пайплайн інтегрується з вашими системами PAS та EPR, досягає 94.3% точності кодування, позначає епізоди з низькою впевненістю для людського огляду та працює повністю у вашій мережі NHS відповідно до DSPT.",
    resultQuoteEn:
      "Clinical coding time falls 62%, coding accuracy improves to 94.3%, and trusts recover an additional £420,000 per year in correctly coded HRG tariff income.",
    resultQuoteUk:
      "Час клінічного кодування скорочується на 62%, точність кодування покращується до 94.3%, а трасти отримують додаткові £420,000 на рік у правильно закодованому тарифному доході HRG.",
    metaTitleEn: "NHS Clinical Coding Automation | BERT ICD-10 SNOMED | Codeworth",
    metaTitleUk: "Автоматизація клінічного кодування NHS | BERT ICD-10 | Codeworth",
    metaDescriptionEn:
      "Fine-tuned clinical BERT for ICD-10/SNOMED coding. Manual time −62%, accuracy 94.3%. NHS DSPT + IG Toolkit compliant. Codeworth.",
    metaDescriptionUk:
      "Fine-tuned BERT для ICD-10/SNOMED. Час −62%, точність 94.3%. NHS DSPT + IG Toolkit. Codeworth.",
    relatedPortfolio: ["fraud-detection-bank", "churn-prediction-saas"],
    relatedServices: ["nlp", "machine-learning", "artificial-intelligence"],
    relatedExtras: ["clinical-ai-validation", "doc-intelligence"],
  },
  {
    slug: "logistics-route-optimisation",
    titleEn: "Last-Mile Delivery Route Optimisation with ML",
    titleUk: "Оптимізація маршрутів доставки останньої милі за допомогою ML",
    category: "erp",
    icon: "🚚",
    whoEn: "UK logistics operators, courier networks, grocery delivery services",
    whoUk: "UK логістичні оператори, кур'єрські мережі, служби доставки продуктів",
    problemEn:
      "UK last-mile delivery operators including Royal Mail, DPD, and Evri face rising fuel costs and customer expectations for 2-hour delivery windows. Static route plans built the night before cannot adapt to real-time traffic, failed deliveries, or surge demand from same-day orders, leading to 18-22% route inefficiency and CO2 overshoot on SECR reporting.",
    problemUk:
      "UK-оператори доставки останньої милі, включаючи Royal Mail, DPD та Evri, стикаються із зростанням витрат на паливо та очікуваннями клієнтів щодо 2-годинних вікон доставки. Статичні плани маршрутів, складені напередодні ввечері, не можуть адаптуватися до трафіку в реальному часі, невдалих доставок або сплеску попиту від замовлень того ж дня, що призводить до 18-22% неефективності маршрутів та перевищення CO2 у звітності SECR.",
    solutionEn:
      "We deploy Google OR-Tools vehicle routing combined with ML demand forecasting that pre-positions delivery density by postcode district. Real-time re-routing integrates TfL API, Royal Mail address database, and failed-delivery feedback loops. The system generates SECR-ready CO2 per-route reporting automatically.",
    solutionUk:
      "Ми розгортаємо маршрутизацію транспортних засобів Google OR-Tools у поєднанні з ML-прогнозом попиту, що попередньо розміщує щільність доставок за поштовими районами. Маршрутизація в реальному часі інтегрує TfL API, базу даних адрес Royal Mail та петлі зворотного зв'язку про невдалі доставки. Система автоматично генерує SECR-готові звіти CO2 на маршрут.",
    resultQuoteEn:
      "Fuel costs reduce by 18%, CO2 emissions per delivery fall 22%, first-attempt delivery success rate improves from 81% to 94%, and routing team planning time is cut by 3 hours per day.",
    resultQuoteUk:
      "Витрати на паливо знижуються на 18%, викиди CO2 на доставку падають на 22%, частка успішних доставок з першої спроби покращується з 81% до 94%, а час планування маршрутів скорочується на 3 години на день.",
    metaTitleEn: "Last-Mile Route Optimisation ML | UK Logistics | Codeworth",
    metaTitleUk: "ML оптимізація маршрутів для UK логістики | Codeworth",
    metaDescriptionEn:
      "OR-Tools + ML demand forecasting for last-mile. Fuel −18%, CO2 −22%, first-attempt delivery 81% → 94%. SECR reporting. Codeworth.",
    metaDescriptionUk:
      "OR-Tools + ML прогноз попиту. Паливо −18%, CO2 −22%, доставка з першої спроби 81% → 94%. SECR. Codeworth.",
    relatedPortfolio: ["churn-prediction-saas", "fraud-detection-bank"],
    relatedServices: ["machine-learning", "mlops"],
    relatedExtras: ["supply-chain-analytics", "erp-ml-integration"],
  },
  {
    slug: "rental-yield-prediction-proptech",
    titleEn: "Rental Yield Prediction for UK PropTech Platforms",
    titleUk: "Прогнозування дохідності оренди для UK PropTech платформ",
    category: "ai",
    icon: "🏠",
    whoEn: "UK PropTech platforms, buy-to-let investors, property management firms",
    whoUk: "UK PropTech платформи, інвестори в оренду, фірми управління нерухомістю",
    problemEn:
      "UK buy-to-let investors relying on Rightmove and Zoopla asking rents overpay by 8-15% on acquisition or underestimate void periods, destroying projected yield. Manual LHA rate lookups and Land Registry comparable analysis take 4-6 hours per property, limiting the number of deals an investor can assess.",
    problemUk:
      "UK інвестори в оренду, що покладаються на запитані орендні ставки Rightmove та Zoopla, переплачують на 8-15% при придбанні або недооцінюють порожні періоди, знищуючи прогнозовану дохідність. Ручний пошук ставок LHA та аналіз порівнянних даних Land Registry займають 4-6 годин на об'єкт, обмежуючи кількість угод, які інвестор може оцінити.",
    solutionEn:
      "We build an XGBoost rental yield prediction model combining Land Registry sold prices, Rightmove asking rents, LHA reference rates, postcode-level amenity scores, school Ofsted ratings, and transport accessibility indices. The model achieves a mean absolute percentage error of 3.8% on held-out test sets and scores new properties in under 2 seconds via API.",
    solutionUk:
      "Ми будуємо XGBoost-модель прогнозування дохідності оренди, що поєднує ціни продажу Land Registry, запитані орендні ставки Rightmove, референтні ставки LHA, оцінки зручностей на рівні поштового індексу, рейтинги шкіл Ofsted та індекси транспортної доступності. Модель досягає середньої абсолютної відсоткової похибки 3.8% на тестових вибірках і оцінює нові об'єкти менш ніж за 2 секунди через API.",
    resultQuoteEn:
      "PropTech platforms using the model see investor acquisition overpay reduced by 11%, portfolio yield improve by 0.6 percentage points, and property assessment throughput increase 8-fold.",
    resultQuoteUk:
      "PropTech платформи, що використовують модель, бачать зниження переплати інвесторів при придбанні на 11%, покращення дохідності портфеля на 0.6 відсоткових пункти та 8-кратне збільшення пропускної здатності оцінки об'єктів.",
    metaTitleEn: "Rental Yield Prediction ML for UK PropTech | Codeworth",
    metaTitleUk: "ML прогноз дохідності оренди для UK PropTech | Codeworth",
    metaDescriptionEn:
      "XGBoost + Land Registry + LHA: rental yield MAPE 3.8%. Investor overpay −11%, yield +0.6pp. Rightmove/Zoopla features. Codeworth.",
    metaDescriptionUk:
      "XGBoost + Land Registry + LHA: MAPE 3.8%. Переплата −11%, дохідність +0.6pp. Codeworth.",
    relatedPortfolio: ["churn-prediction-saas", "fraud-detection-bank"],
    relatedServices: ["machine-learning", "predictive-analytics"],
    relatedExtras: ["ml-explainability"],
  },
  {
    slug: "carbon-footprint-prediction-ml",
    titleEn: "Manufacturing Carbon Footprint Prediction with ML",
    titleUk: "Прогнозування вуглецевого сліду виробництва за допомогою ML",
    category: "automation",
    icon: "🌿",
    whoEn: "UK manufacturers, industrial companies, TCFD-reporting corporates",
    whoUk: "UK виробники, промислові компанії, корпорації з TCFD-звітністю",
    problemEn:
      "UK manufacturers under UK ETS and TCFD mandatory reporting obligations struggle to produce accurate scope 1 and scope 2 emission forecasts from heterogeneous IoT sensor data, energy bills, and production schedules. Manual emissions accounting introduces a 15-25% forecasting error that inflates UK ETS allowance purchases and creates greenwashing liability risk.",
    problemUk:
      "UK виробники, зобов'язані звітувати за UK ETS та TCFD, стикаються з труднощами при формуванні точних прогнозів викидів scope 1 та scope 2 з неоднорідних даних IoT-датчиків, рахунків за енергію та виробничих графіків. Ручний облік викидів вносить 15-25% прогнозну похибку, що збільшує закупівлю квот UK ETS та створює ризик відповідальності за гринвошинг.",
    solutionEn:
      "We build a gradient boosting emissions forecasting model on your IoT sensor streams (energy consumption, fuel usage, process temperatures), production plan data, and utility meter readings. The model provides 12-week rolling scope 1 and scope 2 forecasts at plant and process level, with TCFD-formatted reporting dashboards and UK ETS allowance purchase recommendations.",
    solutionUk:
      "Ми будуємо модель прогнозування викидів на gradient boosting на основі ваших потоків IoT-датчиків (споживання енергії, використання палива, технологічні температури), даних виробничого плану та показань лічильників комунальних послуг. Модель надає 12-тижневі ковзні прогнози scope 1 та scope 2 на рівні заводу та процесу з інформаційними панелями у форматі TCFD та рекомендаціями щодо закупівлі квот UK ETS.",
    resultQuoteEn:
      "Scope 1 and 2 emissions forecasting error reduces by 28%, UK ETS allowance over-purchase falls by £340,000 per year, and TCFD reporting preparation time is cut from 6 weeks to 4 days.",
    resultQuoteUk:
      "Прогнозна похибка викидів scope 1 та 2 знижується на 28%, надлишкова закупівля квот UK ETS падає на £340,000 на рік, а час підготовки TCFD-звітності скорочується з 6 тижнів до 4 днів.",
    metaTitleEn: "Manufacturing Carbon Footprint ML | UK ETS + TCFD | Codeworth",
    metaTitleUk: "ML вуглецевий слід виробництва | UK ETS + TCFD | Codeworth",
    metaDescriptionEn:
      "Gradient boosting on IoT sensors for scope 1/2 forecasting. Forecast error −28%, ETS over-purchase −£340k/year. TCFD dashboards. Codeworth.",
    metaDescriptionUk:
      "Gradient boosting на IoT для scope 1/2. Похибка −28%, надлишок ETS −£340k/рік. TCFD. Codeworth.",
    relatedPortfolio: ["churn-prediction-saas", "fraud-detection-bank"],
    relatedServices: ["machine-learning", "mlops"],
    relatedExtras: ["iot-ml-pipeline", "anomaly-detection"],
  },
  {
    slug: "knowledge-graph-legal-research",
    titleEn: "Legal Research Knowledge Graph for UK Law Firms",
    titleUk: "Граф знань для юридичних досліджень у UK юридичних фірмах",
    category: "ai",
    icon: "⚖️",
    whoEn: "UK law firms, barristers chambers, in-house legal teams, legal publishers",
    whoUk: "UK юридичні фірми, барристерські камери, корпоративні юридичні відділи",
    problemEn:
      "UK lawyers spend 30-40% of billable time on case law research across legislation.gov.uk, Westlaw, and LexisNexis. Disconnected search results miss analogous authorities from adjacent practice areas, and citation networks are too large to traverse manually. SRA continuing competence requirements demand up-to-date awareness of recent decisions.",
    problemUk:
      "UK юристи витрачають 30-40% оплачуваного часу на дослідження прецедентного права через legislation.gov.uk, Westlaw та LexisNexis. Роз'єднані результати пошуку пропускають аналогічні авторитети із суміжних галузей права, а мережі цитування занадто великі для ручного обходу. Вимоги SRA щодо постійної компетентності зобов'язують бути в курсі останніх рішень.",
    solutionEn:
      "We build a legal knowledge graph using NLP entity extraction on UK case law and statute corpora, stored in Neo4j and queryable via SPARQL and natural language. The system surfaces analogous precedents across practice areas, traces citation lineage, and links statutory provisions to case law interpretation automatically. Associates receive a structured research memo in under 8 minutes.",
    solutionUk:
      "Ми будуємо граф юридичних знань за допомогою NLP-вилучення сутностей з корпусів прецедентного права та статутів UK, збереженого в Neo4j та доступного через SPARQL та природну мову. Система виявляє аналогічні прецеденти по галузях права, відстежує ланцюжки цитування та автоматично пов'язує статутні норми з тлумаченням прецедентного права. Помічники отримують структурований меморандум з дослідженнями менш ніж за 8 хвилин.",
    resultQuoteEn:
      "Legal research time reduces by 74%, associates surface relevant precedents missed in initial searches 3.2× more often, and firms bill 28% more research hours per associate per month.",
    resultQuoteUk:
      "Час юридичних досліджень скорочується на 74%, помічники виявляють релевантні прецеденти, пропущені в початкових пошуках, у 3.2 рази частіше, а фірми виставляють рахунки на 28% більше годин досліджень на помічника на місяць.",
    metaTitleEn: "Legal Research Knowledge Graph | NLP + Neo4j | UK Law | Codeworth",
    metaTitleUk: "Граф знань для юридичних досліджень | NLP + Neo4j | Codeworth",
    metaDescriptionEn:
      "NLP + Neo4j knowledge graph for UK case law. Research time −74%. legislation.gov.uk + SRA compliant. SPARQL + natural language queries. Codeworth.",
    metaDescriptionUk:
      "NLP + Neo4j для прецедентного права UK. Дослідження −74%. SRA-відповідність. Codeworth.",
    relatedPortfolio: ["nlp-contract-analysis", "fraud-detection-bank"],
    relatedServices: ["nlp", "artificial-intelligence", "llm-rag"],
    relatedExtras: ["legal-rag", "doc-intelligence"],
  },
  {
    slug: "hr-skills-gap-analysis-ml",
    titleEn: "HR Skills Gap Analysis and Succession Planning with ML",
    titleUk: "ML-аналіз прогалин навичок та планування наступності в HR",
    category: "ai",
    icon: "👥",
    whoEn: "UK enterprises, HR departments, people analytics teams",
    whoUk: "UK підприємства, HR-відділи, команди people analytics",
    problemEn:
      "UK HR teams spend 6-8 weeks per cycle manually mapping competency frameworks to employee profiles for skills gap analysis. The process relies on self-reported data, misses latent skills visible in work outputs, and cannot identify succession candidates for critical roles at pace. Equality Act 2010 requires that any scoring model used in employment decisions be free from protected characteristic bias.",
    problemUk:
      "UK HR-команди витрачають 6-8 тижнів на цикл, вручну зіставляючи рамки компетенцій з профілями співробітників для аналізу прогалин навичок. Процес покладається на самозвітні дані, пропускає приховані навички, видимі у результатах роботи, і не може швидко визначити кандидатів для наступності на критичних посадах. Закон про рівність 2010 року вимагає, щоб будь-яка скорингова модель, що використовується в рішеннях про зайнятість, була вільна від упередженості щодо захищених характеристик.",
    solutionEn:
      "We build an NLP clustering pipeline that analyses performance reviews, project outputs, and job description embeddings to surface latent skills and map each employee to a competency vector. The model identifies skills gaps, succession readiness scores, and learning path recommendations. Every model output is audited for Equality Act 2010 protected characteristic bias before deployment.",
    solutionUk:
      "Ми будуємо NLP-пайплайн кластеризації, що аналізує відгуки про ефективність, результати проектів та ембединги посадових інструкцій для виявлення прихованих навичок та відображення кожного співробітника на вектор компетентності. Модель визначає прогалини навичок, оцінки готовності до наступності та рекомендації щодо навчального шляху. Кожен результат моделі перевіряється на упередженість щодо захищених характеристик Закону про рівність 2010 перед розгортанням.",
    resultQuoteEn:
      "Skills gap identification time falls by 45%, succession planning cycle compresses from 8 weeks to 9 days, and HR teams identify 3.1× more internal promotion candidates per quarter.",
    resultQuoteUk:
      "Час виявлення прогалин навичок скорочується на 45%, цикл планування наступності стискається з 8 тижнів до 9 днів, а HR-команди виявляють у 3.1 рази більше кандидатів для внутрішнього просування на квартал.",
    metaTitleEn: "HR Skills Gap Analysis ML | Equality Act 2010 | Codeworth",
    metaTitleUk: "ML аналіз прогалин навичок HR | Закон про рівність | Codeworth",
    metaDescriptionEn:
      "NLP clustering for skills gap and succession planning. Identification time −45%. Equality Act 2010 bias audit included. Codeworth.",
    metaDescriptionUk:
      "NLP кластеризація для прогалин навичок та наступності. Час −45%. Аудит Закону про рівність 2010. Codeworth.",
    relatedPortfolio: ["churn-prediction-saas", "ai-chatbot-saas"],
    relatedServices: ["nlp", "machine-learning", "artificial-intelligence"],
    relatedExtras: ["ml-explainability"],
  },
  {
    slug: "insurance-claims-image-assessment",
    titleEn: "Motor Insurance Claims Image Damage Assessment",
    titleUk: "Оцінка пошкоджень за зображеннями у страхуванні автомобілів",
    category: "ai",
    icon: "🚗",
    whoEn: "UK motor insurers, claims management companies, vehicle repairers",
    whoUk: "UK страховики автомобілів, компанії управління претензіями, авторемонтники",
    problemEn:
      "UK motor insurers process 2.8 million claims annually, with each physical inspection costing £180-£350 and taking 3-5 working days to schedule. Manual assessments introduce 12-18% repair estimate variance, enabling fraud inflation and lengthening claims cycles. FCA PS20/2 requires fair claims handling and transparent settlement decision rationale under the Insurance Distribution Directive.",
    problemUk:
      "UK страховики автомобілів обробляють 2.8 мільйона претензій щорічно, при цьому кожна фізична інспекція коштує £180-£350 та займає 3-5 робочих днів для планування. Ручна оцінка вносить 12-18% дисперсію в кошторис ремонту, дозволяючи завищення через шахрайство та подовжуючи цикли претензій. FCA PS20/2 вимагає справедливого врегулювання претензій та прозорого обгрунтування рішень щодо виплат.",
    solutionEn:
      "We train a CNN damage assessment model on ABI-standardised vehicle damage imagery to classify damage severity, estimate repair cost bands, and flag fraud indicators such as pre-existing damage and staged accident patterns. Claims scoring under 87% auto-settlement confidence are routed to human assessors. Every decision includes a visual explanation overlay for FCA PS20/2 compliance.",
    solutionUk:
      "Ми навчаємо CNN-модель оцінки пошкоджень на стандартизованих ABI зображеннях пошкоджень транспортних засобів для класифікації тяжкості пошкоджень, оцінки діапазонів вартості ремонту та позначення індикаторів шахрайства, таких як попередні пошкодження та інсценовані шаблони аварій. Претензії з оцінкою автоматичного врегулювання нижче 87% впевненості направляються до оцінщиків-людей. Кожне рішення включає накладення візуального пояснення для відповідності FCA PS20/2.",
    resultQuoteEn:
      "87% of straightforward claims settle automatically, average claims cycle time reduces from 12 days to 3.4 days, and fraudulent inflation detection improves by 43%.",
    resultQuoteUk:
      "87% простих претензій врегульовуються автоматично, середній час циклу претензій скорочується з 12 до 3.4 дня, а виявлення шахрайського завищення покращується на 43%.",
    metaTitleEn: "Motor Insurance Claims Image AI | FCA PS20/2 | Codeworth",
    metaTitleUk: "AI оцінка збитків страхування авто | FCA PS20/2 | Codeworth",
    metaDescriptionEn:
      "CNN motor damage assessment: 87% auto-settlement rate, cycle 12 → 3.4 days. FCA PS20/2 + ABI compliant. Fraud detection included. Codeworth.",
    metaDescriptionUk:
      "CNN оцінка пошкоджень авто: 87% авто-врегулювання, цикл 12 → 3.4 дні. FCA PS20/2 + ABI. Codeworth.",
    relatedPortfolio: ["fraud-detection-bank", "fraud-detection-fintech"],
    relatedServices: ["computer-vision", "machine-learning", "artificial-intelligence"],
    relatedExtras: ["ml-explainability", "compliance-audit-trail"],
  },
  {
    slug: "sports-performance-analytics-ml",
    titleEn: "Sports Performance Analytics with ML and Pose Estimation",
    titleUk: "Аналітика спортивних показників за допомогою ML та оцінки пози",
    category: "ai",
    icon: "⚽",
    whoEn: "UK Premier League clubs, national governing bodies, UK Sport-funded programmes",
    whoUk: "UK клуби Прем'єр-ліги, національні керуючі органи, програми UK Sport",
    problemEn:
      "Premier League clubs and UK Sport-funded programmes generate terabytes of GPS, accelerometer, and video data per week that coaching staff cannot process manually. Injury prediction models built on aggregate load data miss biomechanical risk factors visible only in pose estimation, leading to 22% of soft tissue injuries that could have been prevented with earlier intervention.",
    problemUk:
      "Клуби Прем'єр-ліги та програми UK Sport генерують терабайти даних GPS, акселерометра та відео на тиждень, які тренерський штаб не може обробляти вручну. Моделі прогнозування травм, побудовані на агрегованих даних навантаження, пропускають біомеханічні фактори ризику, видимі лише в оцінці пози, що призводить до 22% травм м'яких тканин, яким можна було б запобігти раніше.",
    solutionEn:
      "We build a multi-modal ML pipeline combining time-series load data from GPS vests with MediaPipe and OpenPose biomechanical analysis of training and match footage. The system outputs individualised injury risk scores updated after each session, performance trend analysis, and recommended load adjustments, integrated with your squad management platform.",
    solutionUk:
      "Ми будуємо мультимодальний ML-пайплайн, що поєднує часові ряди даних навантаження від GPS-жилетів з біомеханічним аналізом MediaPipe та OpenPose відеозаписів тренувань та матчів. Система видає індивідуалізовані оцінки ризику травм, оновлювані після кожної сесії, аналіз тенденцій ефективності та рекомендовані коригування навантаження, інтегровані з вашою платформою управління командою.",
    resultQuoteEn:
      "Soft tissue injury prediction accuracy improves by 12 percentage points, injury-related missed match days reduce by 31%, and coaching staff analysis preparation time falls by 4 hours per match week.",
    resultQuoteUk:
      "Точність прогнозування травм м'яких тканин покращується на 12 відсоткових пунктів, кількість пропущених матчів через травми знижується на 31%, а час підготовки аналізу тренерського штабу скорочується на 4 години на матчтиждень.",
    metaTitleEn: "Sports Performance Analytics ML | Premier League | Codeworth",
    metaTitleUk: "ML аналітика спортивних показників | Прем'єр-ліга | Codeworth",
    metaDescriptionEn:
      "Time series + pose estimation for Premier League and UK Sport. Injury prediction +12pp accuracy, missed days −31%. Codeworth.",
    metaDescriptionUk:
      "Часові ряди + оцінка пози для Прем'єр-ліги та UK Sport. Прогноз травм +12pp, пропущені дні −31%. Codeworth.",
    relatedPortfolio: ["churn-prediction-saas", "fraud-detection-bank"],
    relatedServices: ["machine-learning", "computer-vision", "predictive-analytics"],
    relatedExtras: ["anomaly-detection"],
  },
  {
    slug: "ecommerce-return-prediction-ml",
    titleEn: "E-commerce Product Return Prediction with LightGBM",
    titleUk: "Прогнозування повернень товарів в e-commerce за допомогою LightGBM",
    category: "ecommerce",
    icon: "↩️",
    whoEn: "UK online retailers, fashion brands, electronics e-commerce",
    whoUk: "UK онлайн-ритейлери, fashion бренди, e-commerce електроніки",
    problemEn:
      "UK e-commerce returns cost retailers an estimated £7 billion annually. High return rates in fashion and electronics are driven by size uncertainty, misleading product imagery, and serial returners exploiting the Consumer Rights Act 2015 free 14-day return window. Without return prediction, fulfilling and processing avoidable returns costs £18-£35 per item in logistics and restocking.",
    problemUk:
      "Повернення в UK e-commerce обходяться ритейлерам приблизно в £7 млрд щорічно. Високі ставки повернень у fashion та електроніці обумовлені невизначеністю розміру, оманливими зображеннями продуктів та серійними поверненнями, що використовують безкоштовне 14-денне вікно повернення за Законом про права споживачів 2015 року. Без прогнозу повернень виконання та обробка запобіжних повернень коштує £18-£35 на одиницю у логістиці та поповненні запасів.",
    solutionEn:
      "We train a LightGBM return prediction model on order features including product category, price point, customer return history, review sentiment, and size-chart engagement signals. High-return-risk orders trigger pre-emptive interventions such as personalised fit advice, enhanced product imagery, or review prompts before dispatch. Serial returner detection operates within Consumer Rights Act 2015 boundaries.",
    solutionUk:
      "Ми навчаємо LightGBM-модель прогнозування повернень на ознаках замовлення, включаючи категорію продукту, цінову точку, історію повернень клієнта, сентимент відгуків та сигнали взаємодії з таблицею розмірів. Замовлення з високим ризиком повернення запускають превентивні втручання, такі як персоналізовані поради щодо відповідності, покращені зображення продукту або запити відгуків перед відправкою. Виявлення серійних покупців, що повертають, здійснюється в межах Закону про права споживачів 2015 року.",
    resultQuoteEn:
      "Avoidable return rate falls 31%, generating £2.1 million per year in logistics and restocking savings for a £50M turnover retailer, while customer satisfaction scores remain stable.",
    resultQuoteUk:
      "Частка запобіжних повернень падає на 31%, генеруючи £2.1 мільйона на рік у заощадженнях на логістику та поповнення запасів для ритейлера з оборотом £50M, тоді як оцінки задоволеності клієнтів залишаються стабільними.",
    metaTitleEn: "E-commerce Return Prediction ML | LightGBM | Codeworth",
    metaTitleUk: "ML прогноз повернень e-commerce | LightGBM | Codeworth",
    metaDescriptionEn:
      "LightGBM return prediction. Avoidable returns −31%, £2.1M/year savings. Consumer Rights Act 2015 compliant. Codeworth.",
    metaDescriptionUk:
      "LightGBM прогноз повернень. Запобіжні повернення −31%, £2.1M/рік. Закон про права споживачів 2015. Codeworth.",
    relatedPortfolio: ["churn-prediction-saas", "ai-chatbot-saas"],
    relatedServices: ["machine-learning", "predictive-analytics"],
    relatedExtras: ["personalisation-engine", "crm-ml-sync"],
  },
  {
    slug: "proptech-planning-approval-ml",
    titleEn: "Planning Permission Outcome Prediction for UK PropTech",
    titleUk: "Прогнозування результату дозволу на планування для UK PropTech",
    category: "ai",
    icon: "📋",
    whoEn: "UK property developers, PropTech platforms, planning consultants",
    whoUk: "UK забудовники, PropTech платформи, консультанти з планування",
    problemEn:
      "UK developers spend £25,000-£80,000 on planning applications with a 30% national refusal rate. Pre-application feasibility assessments rely on manual LPA policy interpretation that takes 3-4 weeks and misses analogous appeal decisions published in the PINS database. TCPA 1990 interpretation varies significantly across 333 local planning authorities.",
    problemUk:
      "UK забудовники витрачають £25,000-£80,000 на заявки на планування з 30% національним рівнем відмов. Попередня оцінка здійсненності покладається на ручну інтерпретацію політики LPA, що займає 3-4 тижні та пропускає аналогічні апеляційні рішення, опубліковані в базі даних PINS. Інтерпретація TCPA 1990 значно варіюється по 333 місцевих органах планування.",
    solutionEn:
      "We build a Random Forest planning outcome prediction model trained on LPA historical decision data, PINS appeal outcomes, site characteristics, and local plan policies. The model predicts approval probability at 78% accuracy for major residential applications, surfaces the top risk factors specific to the LPA, and recommends analogous approved applications as precedent evidence.",
    solutionUk:
      "Ми будуємо модель прогнозування результатів планування на Random Forest, навчену на даних про рішення LPA, результатах апеляцій PINS, характеристиках ділянки та місцевих планових політиках. Модель прогнозує ймовірність схвалення з точністю 78% для великих житлових заявок, виявляє топ-фактори ризику, специфічні для LPA, та рекомендує аналогічні схвалені заявки як прецедентні докази.",
    resultQuoteEn:
      "Developers using the model reduce abortive planning spend by 34%, improve application approval rates by 18 percentage points through better-targeted proposals, and compress pre-application feasibility from 4 weeks to 5 days.",
    resultQuoteUk:
      "Забудовники, що використовують модель, скорочують витрати на планування, що не дало результатів, на 34%, покращують рівень схвалення заявок на 18 відсоткових пунктів завдяки більш цільовим пропозиціям та стискають попереднє планування здійсненності з 4 тижнів до 5 днів.",
    metaTitleEn: "Planning Permission Prediction ML | UK PropTech | PINS | Codeworth",
    metaTitleUk: "ML прогноз дозволу на планування | UK PropTech | PINS | Codeworth",
    metaDescriptionEn:
      "Random Forest on LPA + PINS data. 78% prediction accuracy. Approval rate +18pp, abortive spend −34%. TCPA 1990. Codeworth.",
    metaDescriptionUk:
      "Random Forest на LPA + PINS. Точність 78%. Схвалення +18pp, невдалі витрати −34%. TCPA 1990. Codeworth.",
    relatedPortfolio: ["churn-prediction-saas", "fraud-detection-bank"],
    relatedServices: ["machine-learning", "predictive-analytics"],
    relatedExtras: ["ml-explainability"],
  },
  {
    slug: "charity-donor-lifetime-value-ml",
    titleEn: "Charity Donor LTV Prediction and Campaign Optimisation",
    titleUk: "Прогнозування LTV донора та оптимізація кампаній для благодійних організацій",
    category: "ai",
    icon: "❤️",
    whoEn: "UK charities, fundraising teams, third-sector organisations",
    whoUk: "UK благодійні організації, команди збору коштів, організації третього сектора",
    problemEn:
      "UK charities spend 22-28% of fundraising budgets on communications to lapsed and low-value donors while under-investing in high-lifetime-value supporters. Manual RFM segmentation misses complex giving pattern signals, and Gift Aid reclaim delays cost charities an average of £48,000 per year through missed higher-rate taxpayer declarations. GDPR legitimate interest balancing tests must be documented for every marketing communication to donors.",
    problemUk:
      "UK благодійні організації витрачають 22-28% бюджетів на збір коштів на комунікацію з пасивними та низькоцінними донорами, недоінвестуючи у прихильників з високою довічною цінністю. Ручна RFM-сегментація пропускає складні сигнали патернів пожертвувань, а затримки з поверненням Gift Aid обходяться благодійним організаціям у середньому в £48,000 на рік через пропущені декларації платників податків за вищою ставкою. Тест балансування законних інтересів GDPR повинен документуватися для кожної маркетингової комунікації з донорами.",
    solutionEn:
      "We build a donor lifetime value prediction model combining survival models and RFM features trained on your donation history, Gift Aid declarations, and campaign response data. The system segments donors into LTV deciles, optimises communication frequency per segment to maximise net income, and auto-generates GDPR legitimate interest balancing test documentation for Charity Commission audit readiness.",
    solutionUk:
      "Ми будуємо модель прогнозування довічної цінності донора, що поєднує survival models та RFM-ознаки, навчені на вашій історії пожертвувань, деклараціях Gift Aid та даних про відгуки на кампанії. Система сегментує донорів на децилі LTV, оптимізує частоту комунікацій на сегмент для максимізації чистого доходу та автоматично генерує документацію тесту балансування законних інтересів GDPR для готовності до перевірки Charity Commission.",
    resultQuoteEn:
      "Charities see donation ROI improve by 28%, communications budget waste reduce by 34%, and Gift Aid reclaim completeness improve by 19 percentage points through better higher-rate taxpayer identification.",
    resultQuoteUk:
      "Благодійні організації бачать покращення ROI пожертвувань на 28%, скорочення витраченого бюджету на комунікації на 34% та покращення повноти повернення Gift Aid на 19 відсоткових пунктів завдяки кращій ідентифікації платників податків за вищою ставкою.",
    metaTitleEn: "Charity Donor LTV Prediction | Gift Aid | GDPR | Codeworth",
    metaTitleUk: "Прогноз LTV донора | Gift Aid | GDPR | Codeworth",
    metaDescriptionEn:
      "Survival models + RFM for charity donor LTV. Donation ROI +28%, Gift Aid completeness +19pp. Charity Commission + GDPR compliant. Codeworth.",
    metaDescriptionUk:
      "Survival models + RFM для LTV донора. ROI +28%, Gift Aid +19pp. Charity Commission + GDPR. Codeworth.",
    relatedPortfolio: ["churn-prediction-saas", "ai-chatbot-saas"],
    relatedServices: ["machine-learning", "predictive-analytics"],
    relatedExtras: ["crm-ml-sync", "ml-explainability"],
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
