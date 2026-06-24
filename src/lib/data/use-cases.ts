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
  {
    slug: "ml-for-credit-risk",
    title: "ML-скоринг кредитного ризику для UK-фінтех",
    titleEn: "ML Credit Risk Scoring for UK Fintech",
    category: "ai",
    icon: "💳",
    who: "UK-фінтех, банки, BNPL-провайдери та кредитні спілки",
    whoEn: "UK fintech lenders, banks, BNPL providers, and credit unions",
    problem:
      "Традиційні GLM-моделі не захоплюють нелінійні взаємозв'язки між ознаками та не використовують дані Open Banking. IFRS 9 ECL-розрахунки вимагають точних моделей PD/LGD/EAD, а FCA Consumer Duty — пояснюваності кожного рішення.",
    problemEn:
      "Traditional GLM models miss non-linear feature interactions and do not exploit Open Banking data. IFRS 9 ECL calculations require accurate PD/LGD/EAD models, while FCA Consumer Duty mandates explainable decisions for every applicant.",
    solution:
      "Ми замінюємо GLM на gradient boosting (XGBoost/LightGBM) із SHAP-поясненнями та інтегруємо транзакційні сигнали Open Banking. Моделі проходять валідацію за PRA-стандартами та відповідають IFRS 9 ECL. Від £9,500.",
    solutionEn:
      "We replace GLMs with gradient boosting (XGBoost/LightGBM) plus SHAP explanations and integrate Open Banking transactional signals. Models are PRA-validated and IFRS 9 ECL compliant. From £9,500.",
    resultQuote:
      "Покращення Gini-коефіцієнта на 8–15 пунктів, скорочення втрат від дефолтів на 15–22%, повна відповідність IFRS 9 та FCA Consumer Duty.",
    resultQuoteEn:
      "8–15 Gini point improvement, 15–22% reduction in default losses, full IFRS 9 and FCA Consumer Duty compliance.",
    relatedPortfolio: [],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: [],
  },
  {
    slug: "ml-for-hr-analytics",
    title: "ML для HR-аналітики та утримання талантів",
    titleEn: "ML for HR Analytics and Talent Retention",
    category: "ai",
    icon: "🧑‍💼",
    who: "HR-відділи UK-компаній з 100+ співробітниками",
    whoEn: "HR departments at UK companies with 100+ employees",
    problem:
      "Плинність кадрів коштує 6–9 місячних зарплат на заміну. Прогалини в навичках виявляються лише під час ревізій продуктивності. Відбір кандидатів залишається суб'єктивним і уповільнює найм.",
    problemEn:
      "Attrition costs 6–9 months of salary per replacement. Skills gaps surface only at performance reviews. Candidate screening stays subjective and slows hiring.",
    solution:
      "Ми будуємо модель прогнозування відтоку за 90 днів, NLP-аналіз прогалин навичок із резюме та оглядів продуктивності, а також інструмент ранжування кандидатів для скорочення часу найму. Від £5,500.",
    solutionEn:
      "We build a 90-day attrition prediction model, NLP skills-gap analysis from CVs and performance reviews, and a candidate-ranking tool to cut time-to-hire. From £5,500.",
    resultQuote:
      "Зниження плинності кадрів на 20–30%, скорочення витрат на найм на 35%, раннє виявлення прогалин навичок за 6+ місяців.",
    resultQuoteEn:
      "20–30% attrition reduction, 35% lower hiring costs, skills-gap visibility 6+ months ahead.",
    relatedPortfolio: [],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: [],
  },
  {
    slug: "computer-vision-retail-analytics",
    title: "Комп'ютерний зір для аналітики роздрібної торгівлі",
    titleEn: "Computer Vision Retail Analytics",
    category: "ai",
    icon: "🏪",
    who: "UK-ритейлери, торгові мережі та торгові центри",
    whoEn: "UK retailers, grocery chains, and shopping centres",
    problem:
      "Без даних про відвідуваність та поведінку покупців менеджери не можуть оптимізувати розміщення товарів, скорочувати черги або вимірювати вплив акцій на трафік у магазині.",
    problemEn:
      "Without footfall and shopper behaviour data, managers cannot optimise product placement, cut queue times, or measure the in-store impact of promotions.",
    solution:
      "Ми розгортаємо CV-систему на основі CCTV: підрахунок відвідуваності, теплові карти переміщень, виявлення черг та моніторинг наявності товарів на полицях. Без збереження персональних даних, відповідає UK GDPR. Від £7,000.",
    solutionEn:
      "We deploy a CV system on existing CCTV: footfall counting, movement heatmaps, queue detection, and shelf-availability monitoring. No PII stored, UK GDPR compliant. From £7,000.",
    resultQuote:
      "Зростання конверсії на 12–18%, скорочення часу очікування в черзі на 40%, підвищення доступності товарів на полицях на 25%.",
    resultQuoteEn:
      "12–18% conversion uplift, 40% queue wait-time reduction, 25% improvement in shelf availability.",
    relatedPortfolio: [],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: [],
  },
  {
    slug: "llm-rag-for-customer-support",
    title: "LLM RAG для підтримки клієнтів UK SaaS",
    titleEn: "LLM RAG for UK SaaS Customer Support",
    category: "ai",
    icon: "🎧",
    who: "UK SaaS-компанії з базою знань та тикет-системою",
    whoEn: "UK SaaS companies with a knowledge base and ticket system",
    problem:
      "Служба підтримки першого рівня витрачає 70% часу на повторювані запити. SLA порушуються у пікові години, а найм додаткових агентів непропорційно збільшує витрати.",
    problemEn:
      "Tier-1 support spends 70% of time on repetitive queries. SLAs breach during peak hours, and hiring more agents increases costs disproportionately.",
    solution:
      "Ми будуємо RAG-агента на основі вашої бази знань: автоматичні відповіді на 60% тикетів, безшовна ескалація до людини, інтеграція з Zendesk/Intercom. CSAT-моніторинг вбудований. Від £5,500.",
    solutionEn:
      "We build a RAG agent over your knowledge base: automatic resolution of 60% of tickets, seamless human escalation, Zendesk/Intercom integration. CSAT monitoring built in. From £5,500.",
    resultQuote:
      "Автоматичне відхилення 60% тикетів першого рівня, CSAT понад 4.2, скорочення середнього часу обробки на 55%.",
    resultQuoteEn:
      "60% tier-1 ticket deflection, CSAT above 4.2, 55% reduction in average handling time.",
    relatedPortfolio: ["ai-chatbot-saas"],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: ["ai-chatbot-rag"],
  },
  {
    slug: "ml-price-optimisation",
    title: "ML-оптимізація цін для UK e-commerce",
    titleEn: "ML Price Optimisation for UK E-commerce",
    category: "ai",
    icon: "🏷️",
    who: "UK e-commerce-ритейлери та маркетплейс-продавці",
    whoEn: "UK e-commerce retailers and marketplace sellers",
    problem:
      "Статичні ціни залишають виручку на столі під час піків попиту і знижують конкурентоспроможність у повільні періоди. Ручне коригування не встигає за змінами конкурентів у реальному часі.",
    problemEn:
      "Static prices leave revenue on the table during demand peaks and reduce competitiveness in slow periods. Manual adjustments cannot keep pace with real-time competitor moves.",
    solution:
      "Ми будуємо ML-рушій динамічного ціноутворення, що балансує дохід і конверсію: аналіз еластичності попиту, моніторинг конкурентів, A/B-тести цін. В межах правил CMA. Від £7,500.",
    solutionEn:
      "We build an ML dynamic pricing engine balancing revenue and conversion: demand elasticity modelling, competitor monitoring, price A/B testing. Within CMA guidelines. From £7,500.",
    resultQuote:
      "Зростання доходу на 8–14%, покращення маржі на 4–7 відсоткових пунктів, підвищення конверсії без шкоди для прибутку.",
    resultQuoteEn:
      "8–14% revenue uplift, 4–7 percentage-point margin improvement, conversion gains without sacrificing profitability.",
    relatedPortfolio: [],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: [],
  },
  {
    slug: "nlp-contract-review",
    title: "NLP-аналіз контрактів для юридичних і закупівельних команд",
    titleEn: "NLP Contract Review for Legal and Procurement Teams",
    category: "ai",
    icon: "📝",
    who: "Юридичні фірми, відділи закупівель та корпоративні юридичні команди у Великобританії",
    whoEn: "UK law firms, procurement departments, and in-house legal teams",
    problem:
      "Ручний перегляд контрактів займає 2–4 години на документ. Ключові ризикові клаузули пропускаються через втому або обсяг. Юридичні ресурси витрачаються на механічні завдання замість стратегічних.",
    problemEn:
      "Manual contract review takes 2–4 hours per document. Key risk clauses are missed due to fatigue or volume. Legal resources are consumed by mechanical tasks instead of strategic work.",
    solution:
      "Ми розробляємо NLP-систему для вилучення клаузул, класифікації ризиків та порівняння зі стандартними шаблонами. Позначає нестандартні умови та потенційні пастки. Від £6,500.",
    solutionEn:
      "We build an NLP pipeline for clause extraction, risk classification, and deviation flagging against standard templates. Highlights non-standard terms and potential traps. From £6,500.",
    resultQuote:
      "Перегляд контрактів у 10 разів швидше, скорочення пропущених ризикових клаузул на 85%, вивільнення старших юристів для роботи з вищою доданою вартістю.",
    resultQuoteEn:
      "10x faster contract review, 85% reduction in missed risk clauses, senior lawyer time freed for higher-value work.",
    relatedPortfolio: [],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: [],
  },
  {
    slug: "ml-energy-forecasting",
    title: "ML-прогнозування попиту на електроенергію",
    titleEn: "ML Energy Demand Forecasting",
    category: "ai",
    icon: "⚡",
    who: "UK-постачальники електроенергії, мережеві оператори та промислові споживачі",
    whoEn: "UK energy suppliers, network operators, and large industrial consumers",
    problem:
      "Неточні прогнози попиту призводять до дисбалансу в мережі та штрафних витрат на балансування. Традиційні статистичні моделі не враховують погоду, поведінку споживачів та відновлювальну генерацію.",
    problemEn:
      "Inaccurate demand forecasts lead to grid imbalance and costly balancing charges. Traditional statistical models fail to account for weather, consumer behaviour, and renewable generation.",
    solution:
      "Ми будуємо ML-ансамбль для добового та тижневого прогнозування попиту: градієнтний бустинг + LSTM із зовнішніми ознаками (погода, свята, тарифи). Інтеграція з SCADA та торговими системами. Від £8,000.",
    solutionEn:
      "We build an ML ensemble for day-ahead and week-ahead demand forecasting: gradient boosting + LSTM with exogenous features (weather, holidays, tariffs). SCADA and trading system integration. From £8,000.",
    resultQuote:
      "Скорочення витрат на дисбаланс на 22%, покращення точності прогнозу на 30 відсоткових пунктів, зниження пікових закупівель на 15%.",
    resultQuoteEn:
      "22% imbalance cost reduction, 30 percentage-point forecast accuracy improvement, 15% reduction in peak procurement costs.",
    relatedPortfolio: [],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: [],
  },
  {
    slug: "ml-healthcare-readmission",
    title: "ML-прогнозування повторної госпіталізації NHS",
    titleEn: "ML Healthcare Readmission Prediction for NHS",
    category: "ai",
    icon: "🩺",
    who: "Трасти NHS та організації первинної медичної допомоги у Великобританії",
    whoEn: "NHS Trusts and UK primary care organisations",
    problem:
      "30-денна повторна госпіталізація є ключовим показником якості NHS і дорого коштує системі. Клінічні команди не мають інструментів для раннього виявлення пацієнтів з високим ризиком виписки.",
    problemEn:
      "30-day readmission is a key NHS quality indicator and costly to the system. Clinical teams lack tools to identify high-risk patients at the point of discharge.",
    solution:
      "Ми будуємо модель прогнозування ризику повторної госпіталізації на основі даних EPR: діагнози, коморбідності, соціальні фактори, попередні госпіталізації. Відповідає вимогам DSPT та NHS DTAC. Від £7,500.",
    solutionEn:
      "We build a readmission risk prediction model on EPR data: diagnoses, comorbidities, social factors, prior admissions. DSPT and NHS DTAC compliant. From £7,500.",
    resultQuote:
      "Зниження рівня повторної госпіталізації на 18%, цільові втручання для 20% пацієнтів з найвищим ризиком, економія £1,200–£2,800 на запобіжній госпіталізації.",
    resultQuoteEn:
      "18% readmission rate reduction, targeted interventions for the top 20% highest-risk patients, £1,200–£2,800 saved per prevented readmission.",
    relatedPortfolio: [],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: [],
  },
  {
    slug: "ml-saas-conversion-optimisation",
    title: "ML-оптимізація конверсії пробного періоду SaaS",
    titleEn: "ML SaaS Trial-to-Paid Conversion Optimisation",
    category: "ai",
    icon: "📈",
    who: "UK SaaS-компанії з моделлю freemium або пробного доступу",
    whoEn: "UK SaaS companies with freemium or free-trial acquisition models",
    problem:
      "Більшість пробних користувачів не переходять на платний план. Onboarding однаковий для всіх, попри різну поведінку та наміри. Продажі витрачають час на ліди з низькою ймовірністю конверсії.",
    problemEn:
      "Most trial users do not convert to paid. Onboarding is the same for everyone despite different behaviour and intent signals. Sales spends time on low-probability leads.",
    solution:
      "Ми будуємо ML-скоринг конверсії пробного підписника: поведінкові ознаки в продукті, сигнали залученості, ICP-відповідність. Персоналізований onboarding-тригер для сегментів з високим балом. Від £5,000.",
    solutionEn:
      "We build an ML conversion score for trial users: in-product behavioural features, engagement signals, ICP fit. Personalised onboarding triggers fire for high-score segments. From £5,000.",
    resultQuote:
      "Зростання конверсії пробного доступу на 24%, скорочення витрат на залучення клієнтів на 18%, фокус продажів на ліди з найвищим балом.",
    resultQuoteEn:
      "24% trial-to-paid conversion uplift, 18% lower customer acquisition cost, sales focused on the highest-scoring leads.",
    relatedPortfolio: [],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: [],
  },
  {
    slug: "ml-social-care-needs-prediction",
    title: "ML-прогнозування потреб соціальної допомоги для місцевих рад",
    titleEn: "ML Social Care Needs Prediction for Local Councils",
    category: "ai",
    icon: "🏛️",
    who: "Місцеві ради та органи соціальної допомоги Великобританії",
    whoEn: "UK local councils and adult social care authorities",
    problem:
      "Запити на соціальну допомогу часто надходять у стані кризи, коли втручання обходиться найдорожче. Без прогностичних моделей ресурси розподіляються реактивно, а не превентивно.",
    problemEn:
      "Social care referrals often arrive in crisis, when intervention is most expensive. Without predictive models, resources are allocated reactively rather than preventively.",
    solution:
      "Ми будуємо модель раннього виявлення ризику на основі деперсоналізованих адміністративних даних: використання послуг, демографія, взаємодія з NHS. Відповідає UK GDPR та стандартам місцевих органів влади. Від £10,000.",
    solutionEn:
      "We build an early-risk identification model on de-personalised administrative data: service usage, demographics, NHS interactions. UK GDPR and local authority data-sharing standards compliant. From £10,000.",
    resultQuote:
      "Економія £4,200 на кейс завдяки ранньому втручанню, скорочення термінових направлень на 28%, оптимізація розподілу ресурсів соціальної допомоги.",
    resultQuoteEn:
      "£4,200 saved per case through early intervention, 28% reduction in emergency referrals, optimised social care resource allocation.",
    relatedPortfolio: [],
    relatedServices: ["artificial-intelligence"],
    relatedExtras: [],
  },
];
