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
      "Ми починаємо з найменшого можливого AI: RAG-чатбот на вашому існуючому FAQ або документації як базі знань. Без навчання кастомної моделі, без великого датасету. Від £1,800. Запуск за 3 тижні.",
    solutionEn:
      "We start with the smallest viable AI: a RAG chatbot using your existing FAQ or docs as the knowledge base. No custom model training, no large dataset. From £1,800. Live in 3 weeks.",
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
  {
    slug: "aml-transaction-monitoring",
    title: "Моніторинг транзакцій AML для банків Великобританії",
    titleEn: "AML Transaction Monitoring for UK Banks",
    category: "ai",
    icon: "🏦",
    who: "Банки, платіжні системи, фінтех-компанії у Великобританії",
    whoEn: "UK banks, payment processors, and fintech companies",
    problem:
      "Правила FCA щодо боротьби з відмиванням грошей вимагають моніторингу транзакцій у реальному часі. Ручні перевірки пропускають складні схеми відмивання, а хибнопозитивні спрацьовування перевантажують compliance-команди.",
    problemEn:
      "FCA anti-money laundering rules require real-time transaction monitoring. Manual reviews miss complex laundering patterns while false positives overwhelm compliance teams.",
    solution:
      "Ми розробляємо систему на основі граф-нейронних мереж, що виявляє підозрілі мережі транзакцій. Модель навчається на ваших історичних SAR-звітах та патернах відмивання. Інтеграція з існуючою core-банківською системою через API. Відповідає вимогам FCA. Від £8,500.",
    solutionEn:
      "We build a graph neural network system that detects suspicious transaction networks. The model trains on your historical SAR reports and known laundering patterns. API integration with your core banking system. FCA compliant. From £8,500.",
    resultQuote:
      "Скорочення хибнопозитивних спрацьовувань на 60%, виявлення складних схем відмивання у 3 рази швидше, повна відповідність вимогам FCA Reg Review.",
    resultQuoteEn:
      "60% reduction in false positives, 3x faster detection of complex laundering schemes, full FCA Regulatory Review compliance.",
    relatedPortfolio: [],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: [],
  },
  {
    slug: "predictive-equipment-maintenance",
    title: "Прогностичне обслуговування обладнання",
    titleEn: "Predictive Equipment Maintenance",
    category: "ai",
    icon: "🔧",
    who: "Виробничі підприємства, енергетичні компанії, логістичні оператори",
    whoEn: "Manufacturing plants, energy companies, logistics operators",
    problem:
      "Незапланований простій обладнання коштує тисячі фунтів на годину. Планове технічне обслуговування надто консервативне — замінюються ще придатні деталі. Сигнали датчиків є, але ніхто їх не аналізує.",
    problemEn:
      "Unplanned equipment downtime costs thousands of pounds per hour. Scheduled maintenance is overly conservative — parts are replaced while still viable. Sensor signals exist but no one analyses them.",
    solution:
      "Ми підключаємо IoT-датчики (вібрація, температура, тиск) до ML-пайплайну, що передбачає відмову обладнання за 7–14 днів. Алерти надсилаються в CMMS або Slack. Без зупинки виробництва під час розгортання. Від £6,500.",
    solutionEn:
      "We connect IoT sensors (vibration, temperature, pressure) to an ML pipeline that predicts equipment failure 7–14 days ahead. Alerts push to your CMMS or Slack. No production stoppage during deployment. From £6,500.",
    resultQuote:
      "Скорочення незапланованих простоїв на 40–70%, зниження витрат на техобслуговування на 25%, термін окупності — 4–6 місяців.",
    resultQuoteEn:
      "40–70% reduction in unplanned downtime, 25% lower maintenance costs, payback period 4–6 months.",
    relatedPortfolio: [],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: [],
  },
  {
    slug: "clinical-coding-automation",
    title: "Автоматизація клінічного кодування NHS",
    titleEn: "NHS Clinical Coding Automation",
    category: "ai",
    icon: "🏥",
    who: "Трасти NHS, приватні клініки, медичні страховики у Великобританії",
    whoEn: "NHS Trusts, private clinics, and medical insurers in the UK",
    problem:
      "Ручне кодування ICD-10/SNOMED з клінічних записів займає 20–30 хвилин на випадок. Помилки кодування призводять до недоотримання фінансування. Нестача кваліфікованих клінічних кодувальників.",
    problemEn:
      "Manual ICD-10/SNOMED coding from clinical notes takes 20–30 minutes per episode. Coding errors cause underfunding. Shortage of qualified clinical coders.",
    solution:
      "Ми розробляємо NLP-модель, навчену на клінічних записах NHS, для автоматичного призначення кодів ICD-10 та SNOMED CT. Система пропонує коди з поясненнями, кодувальник верифікує. Відповідає вимогам DSPT та NHS DTAC. Від £7,000.",
    solutionEn:
      "We build an NLP model trained on NHS clinical notes to automatically assign ICD-10 and SNOMED CT codes. The system suggests codes with explanations; a coder verifies. DSPT and NHS DTAC compliant. From £7,000.",
    resultQuote:
      "Скорочення часу кодування на 75%, підвищення точності на 18 відсоткових пунктів, збільшення відшкодування за рахунок коректнішого кодування.",
    resultQuoteEn:
      "75% reduction in coding time, 18 percentage-point accuracy improvement, increased reimbursement through more accurate coding.",
    relatedPortfolio: [],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: [],
  },
  {
    slug: "llm-customer-support",
    title: "LLM-агент підтримки клієнтів",
    titleEn: "LLM Customer Support Agent",
    category: "ai",
    icon: "💬",
    who: "SaaS-компанії, e-commerce, B2B-сервіси з Zendesk або Freshdesk",
    whoEn: "SaaS companies, e-commerce, and B2B services using Zendesk or Freshdesk",
    problem:
      "Перший рівень підтримки витрачає 70% часу на типові запити. Час першої відповіді перевищує норму SLA. Масштабування підтримки вимагає непропорційного зростання штату.",
    problemEn:
      "Tier-1 support spends 70% of time on routine queries. First-response time breaches SLA. Scaling support requires disproportionate headcount growth.",
    solution:
      "Ми розгортаємо RAG-агента на базі LLM, що автоматично відповідає на типові запити з вашої бази знань. Безшовна інтеграція з Zendesk або Freshdesk. Складні кейси автоматично ескалюються до операторів. Від £5,500.",
    solutionEn:
      "We deploy an LLM-powered RAG agent that automatically answers routine queries from your knowledge base. Seamless integration with Zendesk or Freshdesk. Complex cases auto-escalate to human agents. From £5,500.",
    resultQuote:
      "Автоматичне вирішення 65–70% вхідних тикетів, скорочення середнього часу обробки на 55%, підвищення задоволеності клієнтів за CSAT.",
    resultQuoteEn:
      "65–70% of incoming tickets resolved automatically, 55% reduction in average handling time, improved CSAT scores.",
    relatedPortfolio: ["ai-chatbot-saas"],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: ["ai-chatbot-rag"],
  },
  {
    slug: "dynamic-pricing-ml",
    title: "Рушій динамічного ціноутворення",
    titleEn: "Dynamic Pricing Engine",
    category: "ai",
    icon: "💰",
    who: "E-commerce, travel, SaaS-компанії на ринку Великобританії",
    whoEn: "UK e-commerce, travel, and SaaS companies",
    problem:
      "Статичні ціни залишають гроші на столі в пікові періоди та знижують конкурентоспроможність у слабкий попит. Ручне коригування цін не встигає за змінами ринку.",
    problemEn:
      "Static prices leave money on the table during peak periods and reduce competitiveness during low demand. Manual price adjustments cannot keep pace with market changes.",
    solution:
      "Ми будуємо ML-рушій ціноутворення, що в реальному часі оптимізує ціни на основі попиту, конкурентів та сегментів клієнтів у межах правил CMA. Інтеграція з вашою платформою через API. Від £7,500.",
    solutionEn:
      "We build an ML pricing engine that optimises prices in real time based on demand, competitors, and customer segments within CMA guidelines. API integration with your platform. From £7,500.",
    resultQuote:
      "Зростання доходу на 8–15%, збільшення маржі на 4–7 відсоткових пунктів, повна відповідність вимогам CMA.",
    resultQuoteEn:
      "8–15% revenue uplift, 4–7 percentage-point margin improvement, full CMA compliance.",
    relatedPortfolio: [],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: [],
  },
  {
    slug: "employee-attrition-prediction",
    title: "Прогнозування плинності кадрів",
    titleEn: "Employee Attrition Prediction",
    category: "ai",
    icon: "👥",
    who: "HR-відділи компаній з 50+ співробітниками у Великобританії",
    whoEn: "HR departments at UK companies with 50+ employees",
    problem:
      "Заміна одного співробітника коштує 6–9 місячних зарплат. Звільнення талантів стає несподіванкою, коли вже пізно. Відділ кадрів реагує постфактум замість попереджувальних дій.",
    problemEn:
      "Replacing one employee costs 6–9 months of salary. Top talent departures come as a surprise when it is already too late. HR reacts after the fact instead of taking preventive action.",
    solution:
      "Ми розробляємо ML-модель, що прогнозує добровільне звільнення кожного співробітника за 90 днів. На основі HR-даних (engagement, tenure, performance, компенсація). Алерти у HRIS або Slack. Від £4,000.",
    solutionEn:
      "We build an ML model that predicts each employee's voluntary departure 90 days ahead. Trained on HR data (engagement, tenure, performance, compensation). Alerts in your HRIS or Slack. From £4,000.",
    resultQuote:
      "Зниження плинності кадрів на 20–35%, збереження ключових талантів, скорочення витрат на рекрутинг на £50k–£200k на рік.",
    resultQuoteEn:
      "20–35% reduction in attrition rate, retention of key talent, £50k–£200k annual savings on recruitment costs.",
    relatedPortfolio: [],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: [],
  },
  {
    slug: "document-intelligence",
    title: "Інтелектуальна обробка документів",
    titleEn: "Intelligent Document Processing",
    category: "ai",
    icon: "📄",
    who: "Юридичні фірми, бухгалтерські компанії, страховики, логістичні оператори",
    whoEn: "Law firms, accounting companies, insurers, and logistics operators",
    problem:
      "Ручне введення даних з рахунків-фактур, договорів та форм займає сотні годин на місяць. Помилки призводять до штрафів та затримок платежів. Документи в різних форматах ускладнюють уніфіковану обробку.",
    problemEn:
      "Manual data entry from invoices, contracts, and forms takes hundreds of hours per month. Errors cause penalties and payment delays. Documents in varied formats make unified processing difficult.",
    solution:
      "Ми будуємо OCR + NLP пайплайн для автоматичного вилучення структурованих даних з будь-яких документів. Інтеграція з вашою ERP або бухгалтерською системою. Точність > 98% на типових документах. Від £5,000.",
    solutionEn:
      "We build an OCR + NLP pipeline for automatic structured data extraction from any document type. Integration with your ERP or accounting system. Accuracy > 98% on typical documents. From £5,000.",
    resultQuote:
      "Скорочення часу обробки документів на 80%, точність вилучення > 98%, повернення 200+ годин на місяць команді.",
    resultQuoteEn:
      "80% reduction in document processing time, >98% extraction accuracy, 200+ hours returned to the team each month.",
    relatedPortfolio: [],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: [],
  },
  {
    slug: "retail-demand-sensing",
    title: "Зондування попиту в роздрібній торгівлі",
    titleEn: "Retail Demand Sensing",
    category: "ai",
    icon: "🛒",
    who: "Роздрібні мережі, FMCG-бренди, дистриб'ютори у Великобританії",
    whoEn: "UK retail chains, FMCG brands, and distributors",
    problem:
      "Традиційні прогнози попиту спираються на дані тижневої давності. Несподівані події (погода, свята, новини) спричиняють дефіцит або надлишок запасів. Втрачені продажі та списання підривають маржу.",
    problemEn:
      "Traditional demand forecasts rely on week-old data. Unexpected events (weather, holidays, news) cause stock-outs or overstock. Lost sales and write-offs erode margin.",
    solution:
      "Ми інтегруємо високочастотні сигнали попиту — дані POS у реальному часі, прогноз погоди, місцеві події — в ML-модель прогнозування. Оновлення щоденне або частіше. Від £6,000.",
    solutionEn:
      "We integrate high-frequency demand signals — real-time POS data, weather forecasts, local events — into an ML forecasting model. Updates daily or more frequently. From £6,000.",
    resultQuote:
      "Скорочення дефіциту запасів на 30%, зниження рівня надлишків на 22%, підвищення точності прогнозування на 35 відсоткових пунктів.",
    resultQuoteEn:
      "30% reduction in stock-outs, 22% lower overstock levels, 35 percentage-point improvement in forecast accuracy.",
    relatedPortfolio: [],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: [],
  },
  {
    slug: "credit-risk-ml",
    title: "ML-скоринг кредитного ризику",
    titleEn: "ML Credit Risk Scoring",
    category: "ai",
    icon: "📊",
    who: "UK-кредитори: банки, кредитні спілки, P2P-платформи, BNPL-провайдери",
    whoEn: "UK lenders: banks, credit unions, P2P platforms, BNPL providers",
    problem:
      "Традиційні скорингові моделі не враховують альтернативні дані та поведінкові сигнали. Вимоги IFRS 9 щодо ECL-розрахунків потребують точних моделей PD/LGD/EAD. Принципи FCA Consumer Duty вимагають пояснюваності рішень.",
    problemEn:
      "Traditional scoring models miss alternative data and behavioural signals. IFRS 9 ECL requirements demand accurate PD/LGD/EAD models. FCA Consumer Duty principles require explainable decisions.",
    solution:
      "Ми розробляємо IFRS 9 сумісні моделі PD/LGD/EAD з використанням gradient boosting та SHAP-поясненнями для відповідності Consumer Duty. Інтеграція альтернативних даних. Валідація за PRA-стандартами. Від £9,000.",
    solutionEn:
      "We build IFRS 9 compliant PD/LGD/EAD models using gradient boosting with SHAP explanations for Consumer Duty compliance. Alternative data integration. PRA-standard validation. From £9,000.",
    resultQuote:
      "Покращення Gini-коефіцієнта на 12–20 пунктів, скорочення втрат від дефолтів на 15–25%, повна відповідність IFRS 9 та FCA Consumer Duty.",
    resultQuoteEn:
      "12–20 Gini point improvement, 15–25% reduction in default losses, full IFRS 9 and FCA Consumer Duty compliance.",
    relatedPortfolio: [],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: [],
  },
  {
    slug: "churn-propensity-model",
    title: "Модель схильності до відтоку для SaaS",
    titleEn: "SaaS Churn Propensity Model",
    category: "ai",
    icon: "📉",
    who: "B2B SaaS-компанії з підписочною моделлю",
    whoEn: "B2B SaaS companies with subscription revenue models",
    problem:
      "Відтік клієнтів виявляється лише після того, як вони скасовують підписку. Customer Success діє реактивно. Немає чіткого розуміння, хто знаходиться в зоні ризику і чому.",
    problemEn:
      "Churn is detected only after customers cancel. Customer Success acts reactively. No clear picture of who is at risk and why.",
    solution:
      "Ми будуємо модель схильності до відтоку на основі поведінкових ознак: частота входів, використання функцій, тенденції підтримки, активність команди. Тригери втручання доставляються в CRM або Slack за 30–60 днів до ймовірного відтоку. Від £4,500.",
    solutionEn:
      "We build a churn propensity model on behavioural features: login frequency, feature usage, support trends, team activity. Intervention triggers delivered to your CRM or Slack 30–60 days before likely churn. From £4,500.",
    resultQuote:
      "Зниження відтоку MRR на 18–28%, збільшення NRR на 8–12 відсоткових пунктів, рання ідентифікація 80% відтоку, що підлягає попередженню.",
    resultQuoteEn:
      "18–28% reduction in MRR churn, 8–12 percentage-point NRR improvement, early identification of 80% of preventable churn.",
    relatedPortfolio: [],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: [],
  },
];
