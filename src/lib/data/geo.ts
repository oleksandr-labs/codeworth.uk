export interface GeoCity {
  slug: string;
  nameUk: string;
  nameEn: string;
  region: string;
  regionEn: string;
  population: string;
  populationEn: string;
  businesses: number;
  description: string;
  descriptionEn: string;
  seoTitle: string;
  seoTitleEn: string;
  seoDesc: string;
  seoDescEn: string;
  stats: { label: string; labelEn: string; value: string }[];
  faq: { q: string; qEn: string; a: string; aEn: string }[];
}

export const GEO_CITIES: GeoCity[] = [
  {
    slug: "london",
    nameUk: "Лондон",
    nameEn: "London",
    region: "Велика Лондонська агломерація",
    regionEn: "Greater London",
    population: "9.7 млн",
    populationEn: "9.7 million",
    businesses: 1100000,
    description:
      "Лондон — найбільший центр AI та машинного навчання у Великобританії. Тут зосереджені найбільші фінтех-компанії, банки, стартапи та enterprise-бізнеси, що активно впроваджують ML для оптимізації операцій, виявлення шахрайства та персоналізації клієнтського досвіду. Команда Codeworth розробляє ML-рішення для лондонських фінтех-стартапів, банків і рітейлерів з урахуванням регуляторних вимог FCA та ICO.",
    descriptionEn:
      "London is the UK's largest hub for AI and machine learning, home to major fintech firms, challenger banks, enterprise retailers, and thousands of tech startups. The city's concentration of financial services, e-commerce, and healthtech companies creates massive demand for production-grade ML: fraud detection, credit scoring, demand forecasting, and NLP automation. Codeworth builds ML systems for London businesses that meet FCA, ICO, and UK GDPR requirements.",
    seoTitle: "ML-консалтинг у Лондоні | Машинне навчання для бізнесу | Codeworth",
    seoTitleEn: "Machine Learning Consultant London | ML Agency | Codeworth",
    seoDesc:
      "ML-консалтинг у Лондоні: fraud detection, credit scoring, churn prediction, NLP. FCA-сумісні рішення від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant London: fraud detection, credit scoring, NLP automation. FCA-compliant ML from £4,000. Codeworth ML agency.",
    stats: [
      { label: "Фінтех-компаній", labelEn: "FinTech companies", value: "3,600+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "54,000+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "1,450+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£86k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "14+" },
    ],
    faq: [
      {
        q: "Скільки коштує ML-консалтинг у Лондоні?",
        qEn: "How much does machine learning consulting cost in London?",
        a: "Вартість залежить від типу рішення: proof-of-concept — від £4,000–£8,000 (4–6 тижнів), production-grade ML-система — від £15,000–£50,000. У Лондоні ставки ML-фрілансерів вищі (£650–£1,200/день), тому агентство фіксованою ціною часто вигідніше.",
        aEn: "Cost depends on the solution type: proof-of-concept from £4,000–£8,000 (4–6 weeks), production ML system from £15,000–£50,000. London ML freelancer rates run £650–£1,200/day, so a fixed-price agency engagement typically delivers better value.",
      },
      {
        q: "Чи можете ви розробляти FCA-сумісні ML-рішення для лондонських фінтех-компаній?",
        qEn: "Can you build FCA-compliant ML for London fintech companies?",
        a: "Так. Ми будуємо моделі з Model Risk Management документацією, SHAP-поясненнями та champion-challenger тестуванням відповідно до FCA SS1/23. Наші fraud detection та credit scoring моделі відповідають вимогам PRA Model Risk Guidelines.",
        aEn: "Yes. We build models with Model Risk Management documentation, SHAP explainability, and champion-challenger testing per FCA SS1/23. Our fraud detection and credit scoring models comply with PRA Model Risk Guidelines and UK GDPR Article 22.",
      },
      {
        q: "Як швидко можна запустити ML-проєкт у Лондоні?",
        qEn: "How quickly can an ML project launch in London?",
        a: "Початкова ML-система (churn prediction, fraud detection, demand forecasting) виходить у production за 4–8 тижнів. PoC на ваших даних — за 2–3 тижні. Повний enterprise ML з MLOps-пайплайном — 3–4 місяці.",
        aEn: "An initial ML system (churn prediction, fraud detection, demand forecasting) reaches production in 4–8 weeks. A PoC on your data takes 2–3 weeks. Full enterprise ML with MLOps pipeline takes 3–4 months.",
      },
      {
        q: "Яку вигоду отримує лондонський бізнес від ML?",
        qEn: "What ROI do London businesses see from ML?",
        a: "Типові результати: fraud detection — збитки −82%, churn prediction — відтік −28%, demand forecasting — списання запасів −31%. Середній термін окупності — 3–6 місяців.",
        aEn: "Typical results from our London clients: fraud detection losses −82%, churn −28%, inventory waste −31%. Average payback period is 3–6 months.",
      },
      {
        q: "Чи є у вас офіс у Лондоні?",
        qEn: "Do you have an office in London?",
        a: "Ми працюємо як розподілена команда ML-інженерів та data scientists. Для лондонських клієнтів ми проводимо discovery-зустрічі та sprint-демо у відеоформаті. Це дозволяє зберегти якість лондонського рівня при значно нижчій ціні.",
        aEn: "We operate as a distributed team of ML engineers and data scientists delivering projects fully remotely. For London clients we run discovery meetings and sprint demos via video — delivering London-quality work at significantly lower rates.",
      },
    ],
  },
  {
    slug: "manchester",
    nameUk: "Манчестер",
    nameEn: "Manchester",
    region: "Великий Манчестер",
    regionEn: "Greater Manchester",
    population: "2.9 млн",
    populationEn: "2.9 million",
    businesses: 145000,
    description:
      "Манчестер — другий за величиною технологічний хаб Великобританії з активно зростаючою AI-екосистемою. Auto Trader будує ML для оцінки вартості авто та рекомендацій, Co-op застосовує машинне навчання для рітейлу і логістики, TalkTalk — для прогнозу відтоку в телекомі, а Університет Манчестера є провідним ML-дослідницьким центром. NHS Greater Manchester впроваджує клінічний ML по всьому регіону. Codeworth розробляє production ML для манчестерського бізнесу за ставками на 30–40% нижчими за лондонські.",
    descriptionEn:
      "Manchester is the UK's second-largest tech hub with a rapidly growing AI ecosystem. Auto Trader builds ML for vehicle valuation and recommendations, the Co-op applies machine learning across retail and supply chain, TalkTalk uses ML for telecom churn prediction, and the University of Manchester is a leading ML research centre. NHS Greater Manchester deploys clinical ML across the region. Codeworth delivers production ML for Manchester businesses at rates 30–40% below London equivalents.",
    seoTitle: "ML Consultancy Manchester | Machine Learning Agency | Codeworth",
    seoTitleEn: "ML Consultancy Manchester | Machine Learning Agency | Codeworth",
    seoDesc:
      "ML-консалтинг у Манчестері: retail ML (Auto Trader, Co-op), telecom churn (TalkTalk), NHS GM clinical AI. Від £4,000. Codeworth.",
    seoDescEn:
      "ML consultancy Manchester: retail ML (Auto Trader, Co-op), telecom churn (TalkTalk), NHS Greater Manchester clinical AI. From £4,000. Codeworth.",
    stats: [
      { label: "Tech- та рітейл-компаній", labelEn: "Tech & retail companies", value: "12,000+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "9,800+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "560+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£66k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "13+" },
    ],
    faq: [
      {
        q: "Які ML-рішення найбільш затребувані у Манчестері?",
        qEn: "Which ML solutions are most in demand in Manchester?",
        a: "Для манчестерського рітейлу — demand forecasting та personalisation. Для виробничих компаній — predictive maintenance та quality control CV. Для фінтех — fraud detection та credit scoring.",
        aEn: "For Manchester retail: demand forecasting and personalisation engines. For manufacturing: predictive maintenance and computer vision quality control. For fintech: fraud detection and credit scoring.",
      },
      {
        q: "Скільки коштує ML-агентство у Манчестері?",
        qEn: "How much does a Manchester ML agency cost?",
        a: "ML-консалтинг у Манчестері на 20–30% дешевший за Лондон. Наші фіксовані пакети стартують від £4,000 для базового PoC до £25,000 для production MLOps-системи.",
        aEn: "Manchester ML consulting is 20–30% cheaper than London. Our fixed-price packages start from £4,000 for a PoC up to £25,000 for a production MLOps system with drift monitoring.",
      },
      {
        q: "Чи маєте ви досвід з манчестерськими рітейлерами на кшталт Co-op та Auto Trader?",
        qEn: "Do you have experience with Manchester retailers like Co-op and Auto Trader?",
        a: "Так. Ми розробляли demand forecasting та personalisation ML для UK e-commerce і multi-location retail — задачі, близькі до Co-op (логістика, прогноз попиту) та Auto Trader (оцінка вартості, рекомендації). Стек: XGBoost + Prophet для прогнозування, collaborative filtering та gradient boosting для рекомендацій і pricing.",
        aEn: "Yes. We have built demand forecasting and personalisation ML for UK e-commerce and multi-location retail — close to Co-op (supply chain, demand) and Auto Trader (valuation, recommendations) use cases. Stack: XGBoost + Prophet for forecasting, collaborative filtering and gradient boosting for recommendations and pricing.",
      },
      {
        q: "Чи можете ви будувати churn prediction для телеком-компаній на кшталт TalkTalk?",
        qEn: "Can you build churn prediction for telecom firms like TalkTalk?",
        a: "Так. Для телекому ми будуємо churn prediction (60-денне попередження) на даних usage, billing та support-тикетів, next-best-action для retention та network anomaly detection. Типовий результат — відтік −25–30%. Стек: gradient boosting + survival models.",
        aEn: "Yes. For telecom we build churn prediction (60-day early warning) on usage, billing, and support-ticket data, next-best-action for retention, and network anomaly detection — close to TalkTalk-scale use cases. Typical result: churn −25–30%. Stack: gradient boosting + survival models.",
      },
      {
        q: "Чи підтримуєте ви моделі після запуску?",
        qEn: "Do you support models after launch?",
        a: "Так. Всі пакети включають підтримку 3–12 місяців. Ми налаштовуємо автоматичний drift monitoring та retraining — ваша команда отримує алерти, коли модель потребує оновлення.",
        aEn: "Yes. All packages include 3–12 months support. We set up automated drift monitoring and retraining pipelines — your team receives alerts when model performance degrades.",
      },
    ],
  },
  {
    slug: "birmingham",
    nameUk: "Бірмінгем",
    nameEn: "Birmingham",
    region: "Уест-Мідлендс",
    regionEn: "West Midlands",
    population: "2.6 млн",
    populationEn: "2.6 million",
    businesses: 95000,
    description:
      "Бірмінгем — серце автомобільної промисловості Великобританії та потужний фінансовий центр Мідлендсу. Jaguar Land Rover активно впроваджує ML для контролю якості та оптимізації виробництва, HSBC та Lloyds мають великі аналітичні хаби в місті, а NHS University Hospitals Birmingham є одним із найбільших NHS Trust у країні. Codeworth розробляє ML-рішення для бірмінгемських автовиробників, банків та NHS з урахуванням специфіки кожного сектору.",
    descriptionEn:
      "Birmingham is the heart of UK automotive manufacturing and a major Midlands financial centre. Jaguar Land Rover actively deploys ML for quality control, battery health monitoring, and supply chain optimisation. HSBC UK and Lloyds Banking Group operate large analytics hubs in the city, and NHS University Hospitals Birmingham is one of the UK's largest NHS Trusts. Codeworth builds production ML for Birmingham's automotive, banking, and healthcare sectors without the overhead of a full in-house data science team.",
    seoTitle: "ML-консалтинг у Бірмінгемі | Машинне навчання для автомобільної галузі | Codeworth",
    seoTitleEn: "ML Consultancy Birmingham | Machine Learning Agency | Codeworth",
    seoDesc:
      "ML-консалтинг у Бірмінгемі: Jaguar Land Rover automotive ML, HSBC banking AI, NHS healthcare ML. Від £4,000. Codeworth.",
    seoDescEn:
      "ML consultancy Birmingham: automotive ML, banking fraud detection, NHS clinical AI. JLR, HSBC, Lloyds supply chain. From £4,000. Codeworth.",
    stats: [
      { label: "Автомобільних компаній (регіон)", labelEn: "Automotive companies (region)", value: "2,800+" },
      { label: "Data scientists у місті", labelEn: "Data scientists in the city", value: "8,400+" },
      { label: "Tech-стартапів", labelEn: "Tech startups", value: "2,300+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£62k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "12+" },
    ],
    faq: [
      {
        q: "Чи є у вас досвід ML для Jaguar Land Rover та їх постачальників?",
        qEn: "Do you have ML experience for Jaguar Land Rover and their suppliers?",
        a: "Так. Ми будуємо ML для автомобільного виробництва: predictive maintenance з LSTM-автоенкодерами на вібраційних і температурних даних, computer vision для QC зварних швів та фарбування (YOLOv8), EV battery health monitoring та demand forecasting для ланцюга постачання. Досвід SCADA/OPC-UA інтеграцій.",
        aEn: "Yes. We build ML for automotive manufacturing: predictive maintenance with LSTM autoencoders on vibration and temperature data, computer vision for weld and paint QC (YOLOv8), EV battery health monitoring, and supply chain demand forecasting. Experience with SCADA/OPC-UA integrations relevant to JLR-tier suppliers.",
      },
      {
        q: "Які ML-рішення потрібні HSBC та Lloyds у Бірмінгемі?",
        qEn: "What ML solutions do HSBC and Lloyds operations in Birmingham need?",
        a: "Великі банки та їх партнери потребують: fraud detection з XGBoost+SHAP (FCA SS1/23 compliant), credit scoring на альтернативних даних, NLP для автоматизації compliance документів, churn prediction для роздрібних клієнтів та AML transaction monitoring. Всі рішення — з Model Risk Management документацією.",
        aEn: "Large bank operations and their partners need: fraud detection with XGBoost+SHAP (FCA SS1/23 compliant), credit scoring on alternative data, NLP for compliance document automation, retail churn prediction, and AML transaction monitoring. All solutions include Model Risk Management documentation.",
      },
      {
        q: "Скільки коштує ML для NHS University Hospitals Birmingham?",
        qEn: "How much does ML cost for NHS University Hospitals Birmingham?",
        a: "Клінічний ML для NHS: PoC від £4,000 (4–6 тижнів). Ключові моделі: patient readmission prediction, A&E demand forecasting, sepsis early warning. Повна NHS-система з DSPT compliance, FHIR R4 та GDPR Article 9 — від £15,000.",
        aEn: "Clinical ML for NHS: PoC from £4,000 (4–6 weeks). Key models: patient readmission prediction, A&E demand forecasting, sepsis early warning. Full NHS system with DSPT compliance, FHIR R4 integration, and GDPR Article 9 compliance from £15,000.",
      },
      {
        q: "Чи підходять ваші ML-рішення для manufacturing SMEs у Бірмінгемі?",
        qEn: "Are your ML solutions suitable for Birmingham manufacturing SMEs?",
        a: "Так. Ми маємо пакет для SME: sensor data integration, baseline predictive maintenance, OEE dashboard — від £7,000. Не потребує великої in-house команди. Made Smarter West Midlands гранти можуть покрити до 50% вартості.",
        aEn: "Yes. We have an SME package: sensor data integration, baseline predictive maintenance, OEE dashboard — from £7,000. No large in-house team required. Made Smarter West Midlands grants can cover up to 50% of the cost.",
      },
      {
        q: "Чи можна почати з малого пілота у Бірмінгемі?",
        qEn: "Can we start with a small pilot in Birmingham?",
        a: "Так, це рекомендований підхід. 4-тижневий PoC на одному процесі або датасеті — від £4,000. Після підтвердження ROI — масштабування. Безкоштовна discovery-сесія (60 хвилин) для оцінки вашого кейсу.",
        aEn: "Yes, that is our recommended approach. A 4-week PoC on one process or dataset from £4,000. After confirming ROI, scale to full deployment. Free discovery session (60 minutes) to assess your use case.",
      },
    ],
  },
  {
    slug: "edinburgh",
    nameUk: "Единбург",
    nameEn: "Edinburgh",
    region: "Шотландія",
    regionEn: "Scotland",
    population: "560 тис.",
    populationEn: "560,000",
    businesses: 32000,
    description:
      "Единбург — технологічна столиця Шотландії та провідний центр AI-досліджень Великобританії. RBS/NatWest і Standard Life будують ML для ризик-скорингу й fraud detection, Skyscanner застосовує машинне навчання для ранжування і прогнозу цін, Amazon має dev-центр у місті, а Університет Единбурга і Robotics Lab при Heriot-Watt є провідними ML/робототехнічними центрами Європи. Codeworth розробляє ML для фінансових послуг, travel-tech і NHS Scotland.",
    descriptionEn:
      "Edinburgh is Scotland's tech capital and one of the UK's leading AI research hubs. RBS/NatWest and Standard Life build ML for risk scoring and fraud detection, Skyscanner applies machine learning to ranking and price prediction, Amazon runs a development centre in the city, and the University of Edinburgh and the Robotics Lab at Heriot-Watt are among Europe's top ML and robotics centres. Codeworth delivers ML for financial services, travel-tech, and NHS Scotland.",
    seoTitle: "ML Consultancy Edinburgh | Machine Learning Agency | Codeworth",
    seoTitleEn: "ML Consultancy Edinburgh | Machine Learning Agency | Codeworth",
    seoDesc:
      "ML-консалтинг в Единбурзі: banking (RBS/NatWest), Standard Life, travel ML (Skyscanner), Heriot-Watt robotics. Від £4,000. Codeworth.",
    seoDescEn:
      "ML consultancy Edinburgh: banking (RBS/NatWest), Standard Life, travel ML (Skyscanner), Heriot-Watt robotics. From £4,000. Codeworth.",
    stats: [
      { label: "Фінансових і tech-компаній", labelEn: "Finance & tech companies", value: "7,100+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "8,200+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "480+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£70k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "12+" },
    ],
    faq: [
      {
        q: "Яка ML-специфіка единбурзького ринку?",
        qEn: "What is unique about the Edinburgh ML market?",
        a: "Единбург має сильний сектор фінансових послуг та страхування (RBS/NatWest, Standard Life, Baillie Gifford) — особливий попит на FCA-сумісні моделі ризик-скорингу та fraud detection. Плюс NHS Scotland — великий ринок для клінічного ML.",
        aEn: "Edinburgh has an exceptionally strong financial services sector (NatWest, Standard Life, Baillie Gifford) with strong demand for FCA-compliant risk scoring and fraud detection. NHS Scotland is also a major market for clinical ML: readmission prediction and patient risk scoring.",
      },
      {
        q: "Чи можете ви розробляти ML для Scottish NHS?",
        qEn: "Can you build ML for NHS Scotland?",
        a: "Так. Ми розробляємо клінічний ML з NHS Digital DSPT compliance, GDPR Article 9 та NICE standards. FHIR R4 конектори для EMIS та SystmOne. Ключові моделі: patient readmission, sepsis early warning, bed demand forecasting.",
        aEn: "Yes. We build clinical ML with NHS Digital DSPT compliance, GDPR Article 9, and NICE evidence standards. FHIR R4 connectors for EMIS and SystmOne. Key models: readmission prediction, sepsis early warning, bed demand forecasting.",
      },
      {
        q: "Скільки коштує ML-консалтинг в Единбурзі?",
        qEn: "What does ML consulting cost in Edinburgh?",
        a: "Ставки в Единбурзі нижчі за лондонські на 15–25%. Наші фіксовані пакети: PoC від £4,000 (4–6 тижнів), production ML від £12,000–£30,000.",
        aEn: "Edinburgh rates are 15–25% below London. Fixed-price packages: PoC from £4,000 (4–6 weeks), production ML system from £12,000–£30,000.",
      },
      {
        q: "Чи підходять ваші рішення для travel-tech на кшталт Skyscanner та для Amazon dev-центру?",
        qEn: "Are your solutions suitable for travel-tech like Skyscanner and Amazon's Edinburgh dev centre?",
        a: "Так. Для travel-tech (Skyscanner) — learning-to-rank для пошуку, price-prediction моделі, demand forecasting та personalisation. Для масштабних dev-команд на кшталт Amazon — production MLOps, A/B-евалуація та recommender systems. Плюс actuarial/claims-fraud ML для страховиків Единбурга (Solvency II/FCA).",
        aEn: "Yes. For travel-tech (Skyscanner) — learning-to-rank for search, price-prediction models, demand forecasting, and personalisation. For large dev teams like Amazon's Edinburgh centre — production MLOps, A/B evaluation, and recommender systems. Plus actuarial/claims-fraud ML for Edinburgh insurers (Solvency II/FCA).",
      },
      {
        q: "Чи стежите ви за дослідженнями Університету Единбурга та Robotics Lab при Heriot-Watt?",
        qEn: "Do you follow research from the University of Edinburgh and the Heriot-Watt Robotics Lab?",
        a: "Так. Ми стежимо за ML-дослідженнями University of Edinburgh (School of Informatics), Alan Turing Institute та Edinburgh Centre for Robotics при Heriot-Watt і доводимо academic advances до production — RAGAS для оцінки RAG-систем, fairness-aware credit scoring, reinforcement learning для роботики.",
        aEn: "Yes. We follow ML research from the University of Edinburgh (School of Informatics), the Alan Turing Institute, and the Edinburgh Centre for Robotics at Heriot-Watt, taking academic advances into production — RAGAS for RAG evaluation, fairness-aware credit scoring, and reinforcement learning for robotics.",
      },
    ],
  },
  {
    slug: "bristol",
    nameUk: "Брістоль",
    nameEn: "Bristol",
    region: "Південно-Захід Англії",
    regionEn: "South West England",
    population: "470 тис.",
    populationEn: "470,000",
    businesses: 28000,
    description:
      "Брістоль — третій за розміром tech-кластер Великобританії з особливою силою в аерокосмосі (Airbus UK будує ML для predictive maintenance компонентів), фінтеху (Hargreaves Lansdown застосовує ML для investment-аналітики й fraud detection), медіа (Channel 4) та енергетиці (OVO Energy використовує ML для прогнозу попиту і smart-grid). Університет Брістоля є провідним AI-дослідницьким центром. Codeworth розробляє production ML для брістольського аерокосмосу, фінтеху, медіа та енергетики.",
    descriptionEn:
      "Bristol is the UK's third-largest tech cluster, with exceptional strength in aerospace (Airbus UK builds ML for component predictive maintenance), fintech (Hargreaves Lansdown uses ML for investment analytics and fraud detection), media (Channel 4), and energy (OVO Energy applies ML to demand forecasting and smart-grid optimisation). The University of Bristol is a leading AI research centre. Codeworth delivers production ML for Bristol's aerospace, fintech, media, and energy sectors.",
    seoTitle: "ML Consultancy Bristol | Machine Learning Agency | Codeworth",
    seoTitleEn: "ML Consultancy Bristol | Machine Learning Agency | Codeworth",
    seoDesc:
      "ML-консалтинг у Брістолі: aerospace (Airbus), fintech (Hargreaves Lansdown), energy (OVO), Channel 4. Від £4,000. Codeworth.",
    seoDescEn:
      "ML consultancy Bristol: aerospace ML (Airbus), fintech (Hargreaves Lansdown), energy (OVO Energy), Channel 4. From £4,000. Codeworth.",
    stats: [
      { label: "Аерокосмічних і фін-компаній", labelEn: "Aerospace & finance companies", value: "1,200+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "7,400+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "560+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£67k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "10+" },
    ],
    faq: [
      {
        q: "Чи є у вас досвід ML для аерокосмічного сектору?",
        qEn: "Do you have ML experience for the aerospace sector?",
        a: "Так. Ми розробляли predictive maintenance для виробничих підприємств із схожими IoT-профілями. Для аерокосмосу: LSTM Autoencoder для детекції аномалій, explainability для safety-critical рішень та AS9100 documentation.",
        aEn: "Yes. We have built predictive maintenance for manufacturing plants with similar IoT profiles (vibration, temperature, acoustics). For aerospace: LSTM Autoencoder anomaly detection, full explainability for safety-critical decisions, AS9100 compatible documentation.",
      },
      {
        q: "Які ML-рішення актуальні для Bristol SaaS-компаній?",
        qEn: "What ML solutions are relevant for Bristol SaaS companies?",
        a: "Churn prediction (60-денне попередження), LTV scoring та upsell propensity models. Також NLP для автоматизації підтримки та personalisation engines для retention. Типові результати: churn −28%, expansion revenue +34%.",
        aEn: "Churn prediction (60-day early warning), LTV scoring, and upsell propensity models. Also NLP for support automation and personalisation engines. Typical results: churn −28%, expansion revenue +34%.",
      },
      {
        q: "Скільки коштує ML-консалтинг у Брістолі?",
        qEn: "How much does ML consulting cost in Bristol?",
        a: "Наші пакети стартують від £4,000 для PoC. Predictive maintenance для аерокосмосу — від £7,000. Повна SaaS ML suite — від £18,000.",
        aEn: "Packages start from £4,000 for a PoC. Predictive maintenance for aerospace from £7,000. Full SaaS ML suite from £18,000.",
      },
      {
        q: "Чи будуєте ви ML для фінтеху та енергетики на кшталт Hargreaves Lansdown і OVO Energy?",
        qEn: "Do you build ML for fintech and energy firms like Hargreaves Lansdown and OVO Energy?",
        a: "Так. Для інвестиційного фінтеху — fraud detection, портфельна аналітика, churn та NLP для compliance (FCA SS1/23). Для енергетики на кшталт OVO — demand/load forecasting (MAPE <2.5%), smart-meter anomaly detection та tariff-optimisation ML. Університет Брістоля — джерело сильних academic-методів, які ми доводимо до production.",
        aEn: "Yes. For investment fintech — fraud detection, portfolio analytics, churn, and NLP for compliance (FCA SS1/23), relevant to Hargreaves Lansdown. For energy firms like OVO Energy — demand/load forecasting (MAPE <2.5%), smart-meter anomaly detection, and tariff-optimisation ML. We translate University of Bristol-grade academic methods into production systems.",
      },
      {
        q: "Чи підтримуєте ви моделі після деплою?",
        qEn: "Do you support models post-deployment?",
        a: "Так. Усі пакети включають підтримку 3–12 місяців, автоматичний drift monitoring та SLA на retraining. Email/Slack-сповіщення при деградації точності моделей.",
        aEn: "Yes. All packages include 3–12 months support, automated drift monitoring, and retraining SLA. You receive email/Slack notifications when model accuracy degrades.",
      },
    ],
  },
  {
    slug: "leeds",
    nameUk: "Лідс",
    nameEn: "Leeds",
    region: "Йоркшир",
    regionEn: "Yorkshire",
    population: "1.9 млн",
    populationEn: "1.9 million",
    businesses: 68000,
    description:
      "Лідс — провідний фінансовий та digital-хаб Йоркширу і місце розташування штаб-квартири NHS Digital. Asda (HQ) застосовує ML для grocery-forecasting та цін, Yorkshire Bank і Leeds Building Society — для credit scoring і fraud detection, Sky UK має великий dev-центр у місті, а Direct Line будує actuarial та claims-fraud ML. Codeworth розробляє production ML для лідського рітейлу, банків, страховиків і NHS West Yorkshire.",
    descriptionEn:
      "Leeds is Yorkshire's leading financial and digital hub and the home of NHS Digital's headquarters. Asda (HQ) applies ML to grocery demand forecasting and pricing, Yorkshire Bank and Leeds Building Society use ML for credit scoring and fraud detection, Sky UK runs a large development centre in the city, and Direct Line builds actuarial and claims-fraud ML. Codeworth delivers production ML for Leeds retail, banking, insurance, and NHS West Yorkshire ICB.",
    seoTitle: "ML Consultancy Leeds | Machine Learning Agency | Codeworth",
    seoTitleEn: "ML Consultancy Leeds | Machine Learning Agency | Codeworth",
    seoDesc:
      "ML-консалтинг у Лідсі: retail (Asda), banking (Yorkshire Bank, Leeds BS), insurance (Direct Line), NHS Digital. Від £4,000. Codeworth.",
    seoDescEn:
      "ML consultancy Leeds: retail ML (Asda), banking (Yorkshire Bank, Leeds Building Society), insurance (Direct Line), NHS Digital. From £4,000. Codeworth.",
    stats: [
      { label: "Рітейл- та фін-компаній", labelEn: "Retail & finance companies", value: "9,650+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "6,800+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "420+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£64k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "11+" },
    ],
    faq: [
      {
        q: "Які ML-можливості є у лідського рітейлу?",
        qEn: "What ML opportunities exist for Leeds retail companies?",
        a: "Великий потенціал у demand forecasting (особливо grocery та fashion), personalisation engines для e-commerce та dynamic pricing. Асda та M&S вже використовують ML — менші рітейлери можуть отримати подібну перевагу від £5,000.",
        aEn: "Major opportunities in demand forecasting (especially grocery and fashion), personalisation engines for e-commerce, and dynamic pricing. Asda and M&S already use ML at scale — smaller retailers can access similar capabilities from £5,000.",
      },
      {
        q: "Чи маєте ви досвід з Yorkshire Bank, Leeds Building Society та Direct Line?",
        qEn: "Do you have experience relevant to Yorkshire Bank, Leeds Building Society and Direct Line?",
        a: "Так. Для банків і будівельних товариств — credit scoring на альтернативних даних, fraud detection для mortgage applications і churn prediction. Для страховиків на кшталт Direct Line — actuarial loss models, claims-fraud detection та NLP для обробки претензій. Усі рішення відповідають FCA Conduct Rules, PRA Model Risk Guidelines та Solvency II.",
        aEn: "Yes. For banks and building societies — credit scoring on alternative data, fraud detection for mortgage applications, and churn prediction. For insurers like Direct Line — actuarial loss models, claims-fraud detection, and NLP for claims processing. All comply with FCA Conduct Rules, PRA Model Risk Guidelines, and Solvency II.",
      },
      {
        q: "Як ML допомагає NHS West Yorkshire та чи працюєте ви зі стандартами NHS Digital?",
        qEn: "How can ML help NHS West Yorkshire and do you align with NHS Digital standards?",
        a: "Так — штаб-квартира NHS Digital у Лідсі задає стандарти, яких ми дотримуємось. Ключові застосування: patient readmission prediction (−34% повторні госпіталізації), bed demand forecasting та NLP для обробки клінічних нотаток. Усі рішення — з NHS DSPT compliance, FHIR R4 та GDPR Article 9.",
        aEn: "Yes — NHS Digital's Leeds HQ sets the standards we build to. Key applications: patient readmission prediction (−34% readmissions), bed demand forecasting, and NLP for clinical note processing. All solutions include NHS DSPT compliance, FHIR R4, and GDPR Article 9.",
      },
      {
        q: "Скільки коштує ML у Лідсі?",
        qEn: "How much does ML cost in Leeds?",
        a: "Лідс — один із найдоступніших ML-ринків у Великобританії. Ставки нижчі за лондонські на 25–35%. Наші фіксовані пакети від £4,000 (PoC) до £20,000 (full production система).",
        aEn: "Leeds is one of the most affordable ML markets in the UK — rates 25–35% below London. Fixed-price packages range from £4,000 (PoC) to £20,000 (full production system).",
      },
      {
        q: "Чи проводите ви discovery-сесії для лідських клієнтів?",
        qEn: "Do you run discovery sessions for Leeds clients?",
        a: "Так. Перша discovery-сесія безкоштовна (відеозустріч, 60 хвилин). Ми аналізуємо ваші дані, бізнес-цілі та технічний стек, потім готуємо ML roadmap з конкретними deliverables та ROI-прогнозом.",
        aEn: "Yes. The first discovery session is free (video call, 60 minutes). We analyse your data, business goals, and tech stack, then produce an ML roadmap with specific deliverables and ROI projections.",
      },
    ],
  },
  {
    slug: "glasgow",
    nameUk: "Глазго",
    nameEn: "Glasgow",
    region: "Шотландія",
    regionEn: "Scotland",
    population: "1.8 млн",
    populationEn: "1.8 million",
    businesses: 52000,
    description:
      "Глазго — найбільше місто Шотландії та активно зростаючий tech-хаб. NHS Greater Glasgow and Clyde (найбільший NHS Trust Великобританії) впроваджує клінічний ML, Barclays розгорнув великий tech-хаб у місті, енергокомпанії SSE та ScottishPower застосовують ML для прогнозу генерації і smart-grid, а Університет Глазго є провідним AI-дослідницьким центром. Codeworth допомагає глазгоському бізнесу з клінічним ML, energy forecasting, fraud detection і predictive maintenance.",
    descriptionEn:
      "Glasgow is Scotland's largest city and a growing tech hub. NHS Greater Glasgow and Clyde (the UK's largest NHS Trust) deploys clinical ML, Barclays runs a major technology hub in the city, energy firms SSE and ScottishPower apply ML to generation forecasting and smart-grid optimisation, and the University of Glasgow is a leading AI research centre. Codeworth helps Glasgow businesses with clinical ML, energy forecasting, fraud detection, and predictive maintenance.",
    seoTitle: "ML Consultancy Glasgow | Machine Learning Agency | Codeworth",
    seoTitleEn: "ML Consultancy Glasgow | Machine Learning Agency | Codeworth",
    seoDesc:
      "ML-консалтинг у Глазго: NHS clinical AI, Barclays tech hub, energy ML (SSE, ScottishPower). Від £4,000. Codeworth.",
    seoDescEn:
      "ML consultancy Glasgow: NHS clinical AI, Barclays tech hub, energy ML (SSE, ScottishPower). From £4,000. Codeworth.",
    stats: [
      { label: "Медичних і енерго-компаній", labelEn: "Healthcare & energy firms", value: "4,200+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "7,600+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "390+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£65k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "11+" },
    ],
    faq: [
      {
        q: "Чи можете ви розробляти ML для NHS Greater Glasgow?",
        qEn: "Can you build ML for NHS Greater Glasgow and Clyde?",
        a: "Так. Клінічний ML з повним DSPT compliance, GDPR Article 9, NICE standards та DCB0129 clinical safety case. FHIR R4 конектори для EMIS та SystmOne. Ключові моделі: patient readmission prediction, sepsis early warning, bed demand forecasting.",
        aEn: "Yes. Clinical ML with full DSPT compliance, GDPR Article 9, NICE evidence standards, and DCB0129 clinical safety case. FHIR R4 connectors for EMIS and SystmOne. Key models: readmission prediction, sepsis early warning, bed demand forecasting.",
      },
      {
        q: "Чи є у вас досвід ML для енергокомпаній на кшталт SSE та ScottishPower?",
        qEn: "Do you have energy ML experience relevant to SSE and ScottishPower?",
        a: "Так. Wind/solar generation forecasting (MAPE <3.5% на 48-годинний горизонт), load forecasting (MAPE <2.1%), smart-meter anomaly detection та battery dispatch optimisation — задачі, типові для SSE і ScottishPower. NWP weather model integration (ECMWF, MetOffice) стандартна.",
        aEn: "Yes. Wind/solar generation forecasting (MAPE <3.5% on 48-hour horizon), grid load forecasting (MAPE <2.1%), smart-meter anomaly detection, and battery dispatch optimisation — typical SSE and ScottishPower use cases. NWP weather model integration (ECMWF, MetOffice) is standard.",
      },
      {
        q: "Чи будуєте ви ML для банків на кшталт Barclays tech hub у Глазго?",
        qEn: "Do you build ML for banking operations like the Barclays tech hub in Glasgow?",
        a: "Так. Для масштабних банківських tech-хабів (Barclays має великий у Глазго) — fraud detection з XGBoost+SHAP (FCA SS1/23), AML transaction monitoring, credit scoring та production MLOps. Ми доводимо до production останні методи з Університету Глазго (School of Computing Science).",
        aEn: "Yes. For large banking technology hubs (Barclays runs a major one in Glasgow) — fraud detection with XGBoost+SHAP (FCA SS1/23), AML transaction monitoring, credit scoring, and production MLOps. We take recent methods from the University of Glasgow (School of Computing Science) into production.",
      },
      {
        q: "Скільки коштує ML у Глазго?",
        qEn: "How much does ML cost in Glasgow?",
        a: "Глазго пропонує ставки нижчі за Лондон на 20–30%. Наші фіксовані пакети: PoC від £4,000, клінічна ML система від £8,000–£30,000, energy forecasting від £4,000–£18,000.",
        aEn: "Glasgow ML rates are 20–30% below London. Fixed-price packages: PoC from £4,000, clinical ML from £8,000–£30,000, energy forecasting from £4,000–£18,000.",
      },
      {
        q: "Чи можете ви підтримувати ongoing ML-операції?",
        qEn: "Can you support ongoing ML operations for a Glasgow company?",
        a: "Так. Managed MLOps: автоматичний drift monitoring, retraining pipelines, model versioning в MLflow та SLA-підтримка. Щомісячні звіти продуктивності. Від £500/місяць для базового моніторингу.",
        aEn: "Yes. Managed MLOps: automated drift monitoring, retraining pipelines, MLflow model versioning, and SLA support. Monthly performance reports. From £500/month for baseline monitoring.",
      },
    ],
  },
  {
    slug: "cardiff",
    nameUk: "Кардіфф",
    nameEn: "Cardiff",
    region: "Уельс",
    regionEn: "Wales",
    population: "500 тис.",
    populationEn: "500,000",
    businesses: 24000,
    description:
      "Кардіфф — столиця Уельсу та найбільш швидкозростаючий tech-хаб Великобританії поза межами Лондона. Місто має розвинені сектори охорони здоров'я (NHS Wales), фінансових послуг та активний tech-стартап ринок. Завдяки Wales Digital Competitiveness Plan та Development Bank of Wales grants, welsh SMBs мають доступ до субсидій для впровадження AI/ML.",
    descriptionEn:
      "Cardiff is Wales' capital and the UK's fastest-growing tech hub outside London, with strong sectors in healthcare (NHS Wales), financial services, and a dynamic startup ecosystem. The Wales Digital Competitiveness Plan and Development Bank of Wales funding mean Welsh SMBs can access grants for AI/ML adoption. Welsh language ML requirements add a unique localisation dimension.",
    seoTitle: "ML-консалтинг у Кардіффі | Машинне навчання для Уельсу | Codeworth",
    seoTitleEn: "Machine Learning Consultant Cardiff | ML Agency Wales | Codeworth",
    seoDesc:
      "Машинне навчання у Кардіффі: NHS Wales, фінансові послуги, welsh AI grants. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Cardiff: NHS Wales, financial services ML, Welsh AI grants. From £4,000. Codeworth.",
    stats: [
      { label: "Tech-компаній", labelEn: "Tech companies", value: "3,850+" },
      { label: "AI-субсидій (DBW)", labelEn: "AI grants available (DBW)", value: "£2.4M+" },
      { label: "Медичних організацій", labelEn: "Healthcare organisations", value: "1,300+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£58k" },
      { label: "Зростання tech-сектора (3р)", labelEn: "Tech sector growth (3yr)", value: "+49%" },
    ],
    faq: [
      {
        q: "Чи є гранти для ML у Уельсі?",
        qEn: "Are there grants for ML adoption in Wales?",
        a: "Так. Development Bank of Wales та Innovate UK Wales мають програми фінансування для SMBs. Wales Innovation Fund надає до £50,000 на AI проєкти. Codeworth може допомогти з оформленням заявки — це значно знижує реальну вартість ML-проєкту.",
        aEn: "Yes. The Development Bank of Wales and Innovate UK Wales run funding schemes for SMBs adopting AI/ML. The Wales Innovation Fund provides up to £50,000 for AI projects. Codeworth can assist with grant applications.",
      },
      {
        q: "Чи можете ви розробляти ML для NHS Wales?",
        qEn: "Can you build ML for NHS Wales?",
        a: "Так. ML для NHS Wales з повним DSPT compliance, GDPR та NICE standards. Підтримка Welsh language у звітах та інтерфейсах. Ключові моделі: patient readmission, A&E demand forecasting, clinical pathway optimisation.",
        aEn: "Yes. ML for NHS Wales with full DSPT compliance, GDPR, and NICE standards. Welsh language support in reports and dashboards. Key models: patient readmission prediction, A&E demand forecasting, clinical pathway optimisation.",
      },
      {
        q: "Чи можете ви обробляти дані валлійською мовою?",
        qEn: "Can you handle Welsh language data?",
        a: "Так. Ми обробляємо NLP-задачі на білінгвальних (EN/CY) текстових корпусах. Наша NLP pipeline підтримує Welsh language tokenization та sentiment analysis.",
        aEn: "Yes. We handle NLP tasks on bilingual (EN/CY) text corpora. Our NLP pipeline supports Welsh language tokenisation and sentiment analysis. Welsh Translation Service API is integrated where required.",
      },
      {
        q: "Скільки коштує ML у Кардіффі?",
        qEn: "What does ML cost in Cardiff?",
        a: "Кардіфф пропонує найнижчі ставки серед великих UK-міст. Наші пакети від £4,000 (PoC). З урахуванням welsh AI grants реальна вартість може бути нижчою на 30–50%.",
        aEn: "Cardiff offers the lowest ML rates among major UK cities. Our packages start from £4,000 (PoC). With Welsh AI grants, the net cost can be 30–50% lower.",
      },
      {
        q: "Чи маєте ви досвід з Welsh fintech?",
        qEn: "Do you have Welsh fintech experience?",
        a: "Ми розробляємо ML для UK фінтеху, включаючи Welsh-based companies: credit scoring, fraud detection та churn prediction. Всі моделі відповідають FCA Conduct Rules та UK GDPR.",
        aEn: "We build ML for UK fintech broadly, including Welsh-based companies: credit scoring on alternative data, fraud detection, and churn prediction. All comply with FCA Conduct Rules and UK GDPR.",
      },
    ],
  },
  {
    slug: "cambridge",
    nameUk: "Кембридж",
    nameEn: "Cambridge",
    region: "Кембриджшир, Схід Англії",
    regionEn: "Cambridgeshire, East of England",
    population: "140 тис.",
    populationEn: "140,000",
    businesses: 12000,
    description:
      "Кембридж — глобальний центр AI та deep tech, де концентрація ML-таланту на душу населення найвища у Великобританії. AstraZeneca застосовує AI для drug discovery, ARM Holdings будує ML для проєктування чипів, Microsoft Research Cambridge веде fundamental AI-дослідження, а Cambridge Consultants розробляє custom-ML для клієнтів по всьому світу. Університет Кембриджу і сотні deep tech стартапів формують Silicon Fen, що залучив £9+ млрд венчурних інвестицій. Codeworth надає research-grade ML із суворою евалуацією.",
    descriptionEn:
      "Cambridge is a global AI and deep tech powerhouse — the UK's highest per-capita concentration of ML talent. AstraZeneca applies AI to drug discovery, ARM Holdings builds ML for chip design, Microsoft Research Cambridge runs fundamental AI research, and Cambridge Consultants develops custom ML for clients worldwide. The University of Cambridge and hundreds of deep tech startups form the 'Silicon Fen' cluster, which attracted £9bn+ in venture investment. Codeworth delivers research-grade ML with rigorous evaluation standards.",
    seoTitle: "ML Consultancy Cambridge | Machine Learning Agency | Codeworth",
    seoTitleEn: "ML Consultancy Cambridge | Machine Learning Agency | Codeworth",
    seoDesc:
      "ML-консалтинг у Кембриджі: pharma AI (AstraZeneca), chip ML (ARM), deep learning, NLP. Silicon Fen. Від £4,000. Codeworth.",
    seoDescEn:
      "ML consultancy Cambridge: pharma AI (AstraZeneca), chip ML (ARM Holdings), deep learning, NLP for Silicon Fen. From £4,000. Codeworth.",
    stats: [
      { label: "Deep tech компаній", labelEn: "Deep tech companies", value: "1,700+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "11,500+" },
      { label: "AI-стартапів (Silicon Fen)", labelEn: "AI startups (Silicon Fen)", value: "720+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£82k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "13+" },
    ],
    faq: [
      {
        q: "Чи є у вас досвід роботи з Cambridge University spin-outs?",
        qEn: "Do you work with Cambridge University spin-outs?",
        a: "Так. Ми розуміємо специфіку deep tech стартапів: translational research, IP-стратегія, investor-grade ML validation. Наша команда знайома з вимогами Cambridge Enterprise та UKRI innovate UK grants.",
        aEn: "Yes. We understand deep tech startup requirements: translational research to product, IP strategy, investor-grade ML validation. We're familiar with Cambridge Enterprise requirements and UKRI Innovate UK grant applications.",
      },
      {
        q: "Чим ML у Кембриджі відрізняється від інших UK-міст?",
        qEn: "What makes ML in Cambridge different from other UK cities?",
        a: "Кембридж вимагає research-grade стандартів: суворе cross-validation, ablation studies, reproducibility. Клієнти часто мають власні ML-команди та очікують від нас external validation і production engineering, а не базові послуги.",
        aEn: "Cambridge clients typically demand research-grade rigour: strict cross-validation, ablation studies, reproducibility standards. Many have in-house ML researchers and need external production engineering and independent validation rather than basic ML services.",
      },
      {
        q: "Чи може Codeworth допомогти з UKRI/Innovate UK заявкою?",
        qEn: "Can Codeworth help with UKRI/Innovate UK grant applications?",
        a: "Так. Ми допомагаємо з технічними секціями Innovate UK заявок: описом ML-методології, feasibility analysis, impact metrics та work package структурою. R&D tax credits також застосовні до ML-проєктів.",
        aEn: "Yes. We assist with technical sections of Innovate UK applications: ML methodology description, feasibility analysis, impact metrics, and work package structure. R&D tax credits also apply to qualifying ML development.",
      },
      {
        q: "Скільки коштує ML-консалтинг у Кембриджі?",
        qEn: "How much does ML consulting cost in Cambridge?",
        a: "Наші пакети починаються від £4,000 (PoC). Для Cambridge deep tech стартапів, що отримали Innovate UK грант, ми пропонуємо гнучкі умови milestone-based оплати.",
        aEn: "Our packages start from £4,000 (PoC). For Cambridge deep tech startups with Innovate UK or other grant funding, we offer flexible milestone-based payment terms.",
      },
      {
        q: "Чи маєте ви досвід з pharma ML (AstraZeneca) та chip/hardware ML (ARM Holdings)?",
        qEn: "Do you have experience with pharma ML (AstraZeneca) and chip/hardware ML (ARM Holdings)?",
        a: "Так. Для фарми на кшталт AstraZeneca — drug discovery ML (molecule property prediction), clinical trial outcome modelling, genomics pipelines та medical imaging (GxP/MHRA/NHS IG). Для chip-дизайну на кшталт ARM — ML для design-space exploration, performance prediction та telemetry anomaly detection. Ми працюємо на research-grade рівні, близькому до Microsoft Research та Cambridge Consultants.",
        aEn: "Yes. For pharma like AstraZeneca — drug discovery ML (molecule property prediction), clinical trial outcome modelling, genomics pipelines, and medical imaging (GxP/MHRA/NHS IG). For chip design like ARM Holdings — ML for design-space exploration, performance prediction, and telemetry anomaly detection. We work at a research-grade level close to Microsoft Research and Cambridge Consultants.",
      },
    ],
  },
  {
    slug: "oxford",
    nameUk: "Оксфорд",
    nameEn: "Oxford",
    region: "Оксфордшир, Захід Англії",
    regionEn: "Oxfordshire, South East England",
    population: "160 тис.",
    populationEn: "160,000",
    businesses: 14000,
    description:
      "Оксфорд — другий за значимістю UK академічний AI центр після Кембриджу. Oxford Biomedica застосовує AI для drug discovery та cell/gene therapy, завод BMW MINI у Каулі використовує ML для контролю якості й виробництва, Sophos будує ML для кібербезпеки, а Oxbotica (тепер Oxa) розробляє автономні транспортні засоби. Oxford ML Lab та Robotics Institute задають академічний рівень. Codeworth надає production ML для оксфордської фарми, автовиробництва, кібербезпеки та AV-сектору.",
    descriptionEn:
      "Oxford is the UK's second most significant academic AI hub. Oxford Biomedica applies AI to drug discovery and cell/gene therapy, the BMW MINI plant at Cowley uses ML for quality control and production, Sophos builds ML for cybersecurity, and Oxbotica (now Oxa) develops autonomous vehicles. The Oxford ML lab and Robotics Institute set the academic standard. Codeworth delivers production ML for Oxford's pharma, automotive, cybersecurity, and AV sectors.",
    seoTitle: "ML Consultancy Oxford | Machine Learning Agency | Codeworth",
    seoTitleEn: "ML Consultancy Oxford | Machine Learning Agency | Codeworth",
    seoDesc:
      "ML-консалтинг в Оксфорді: pharma AI (Oxford Biomedica), automotive ML (BMW MINI), cybersecurity (Sophos), AVs (Oxbotica). Від £4,000. Codeworth.",
    seoDescEn:
      "ML consultancy Oxford: pharma AI (Oxford Biomedica), automotive ML (BMW MINI), cybersecurity (Sophos), AVs (Oxbotica). From £4,000. Codeworth.",
    stats: [
      { label: "Pharma та MedTech компаній", labelEn: "Pharma & MedTech companies", value: "455+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "9,200+" },
      { label: "AI spinouts (Uni Oxford)", labelEn: "AI spinouts (Uni Oxford)", value: "360+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£78k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "12+" },
    ],
    faq: [
      {
        q: "Чи є у вас досвід ML для фарми на кшталт Oxford Biomedica?",
        qEn: "Do you have pharma ML experience relevant to Oxford Biomedica?",
        a: "Так. Для фарми/біотеху на кшталт Oxford Biomedica — drug discovery ML (QSAR modelling, molecule screening), cell/gene therapy process analytics, clinical data analysis та bioinformatics pipelines. MHRA та ICH E9 guidance compliance для regulatory submissions.",
        aEn: "Yes. For pharma/biotech like Oxford Biomedica — drug discovery ML (QSAR modelling, molecule screening), cell/gene therapy process analytics, clinical data analysis, and bioinformatics pipelines. MHRA and ICH E9 guidance compliance for regulatory submissions.",
      },
      {
        q: "Скільки коштує ML для MedTech стартапу в Оксфорді?",
        qEn: "What does ML cost for a MedTech startup in Oxford?",
        a: "PoC від £4,000 (3–4 тижні) — ідеально для investor validation. Повна production ML система для MedTech: £8,000–£25,000 залежно від обсягу даних та regulatory вимог.",
        aEn: "PoC from £4,000 (3–4 weeks) — ideal for investor validation. Full production ML for MedTech: £8,000–£25,000 depending on data volume and regulatory requirements.",
      },
      {
        q: "Чи підтримуєте ви Innovate UK та NIHR гранти в Оксфорді?",
        qEn: "Do you support Innovate UK and NIHR grants in Oxford?",
        a: "Так. NIHR (National Institute for Health Research) гранти для MedTech та NHS AI, Innovate UK для загальних AI/ML проєктів. Ми допомагаємо з технічними секціями заявок та R&D tax credit documentation.",
        aEn: "Yes. NIHR grants for MedTech and NHS AI projects, Innovate UK for general AI/ML. We assist with technical sections of applications and R&D tax credit documentation.",
      },
      {
        q: "Чи маєте ви досвід з Oxford University spin-outs?",
        qEn: "Do you work with Oxford University spin-outs?",
        a: "Так. Розуміємо IP transfer процес та специфіку Oxford University Innovation (OUI). Допомагаємо spin-outs масштабувати ML від дослідницького прототипу до комерційного продукту.",
        aEn: "Yes. We understand the IP transfer process and Oxford University Innovation (OUI) requirements. We help spin-outs scale ML from research prototype to commercial product.",
      },
      {
        q: "Чи будуєте ви ML для автовиробництва (BMW MINI), кібербезпеки (Sophos) та AV (Oxbotica)?",
        qEn: "Do you build ML for automotive (BMW MINI), cybersecurity (Sophos), and AVs (Oxbotica)?",
        a: "Так. Для заводу на кшталт BMW MINI у Каулі — computer vision QC (YOLOv8), predictive maintenance та supply-chain forecasting. Для кібербезпеки на кшталт Sophos — malware/anomaly detection та NLP для threat intelligence. Для AV-сектору на кшталт Oxbotica — perception ML, sensor fusion та safety-critical evaluation з повною explainability.",
        aEn: "Yes. For an automotive plant like BMW MINI at Cowley — computer vision QC (YOLOv8), predictive maintenance, and supply-chain forecasting. For cybersecurity like Sophos — malware/anomaly detection and NLP for threat intelligence. For AVs like Oxbotica — perception ML, sensor fusion, and safety-critical evaluation with full explainability.",
      },
    ],
  },
  {
    slug: "sheffield",
    nameUk: "Шеффілд",
    nameEn: "Sheffield",
    region: "Йоркшир і Гамбер",
    regionEn: "Yorkshire and the Humber",
    population: "560 тис.",
    populationEn: "560,000",
    businesses: 28000,
    description:
      "Шеффілд — промисловий центр UK, що трансформується через advanced manufacturing та Industry 4.0. AMRC (Advanced Manufacturing Research Centre) при Університеті Шеффілда — світовий лідер у ML для виробництва (computer vision QA, predictive maintenance, digital twin), а School of Computer Science Університету є сильним ML-центром. Gripple впроваджує industrial IoT та ML на власних лініях, NHS Sheffield застосовує клінічний ML. Boeing, Rolls-Royce та BAE Systems — якорні партнери AMRC. Codeworth розробляє production ML для шеффілдського виробництва та NHS.",
    descriptionEn:
      "Sheffield is the UK's advanced manufacturing hub, transforming through Industry 4.0 and ML-driven production. The AMRC (Advanced Manufacturing Research Centre) at the University of Sheffield is a world leader in ML for manufacturing (computer vision QA, predictive maintenance, digital twins), and the University's School of Computer Science is a strong ML centre. Gripple deploys industrial IoT and ML on its own lines, and NHS Sheffield applies clinical ML. Boeing, Rolls-Royce, and BAE Systems are AMRC anchor partners. Codeworth delivers production ML for Sheffield manufacturing and the NHS.",
    seoTitle: "ML Consultancy Sheffield | Machine Learning Agency | Codeworth",
    seoTitleEn: "ML Consultancy Sheffield | Machine Learning Agency | Codeworth",
    seoDesc:
      "ML-консалтинг у Шеффілді: AMRC manufacturing ML, industrial IoT (Gripple), computer vision QA, NHS Sheffield. Від £4,000. Codeworth.",
    seoDescEn:
      "ML consultancy Sheffield: AMRC manufacturing ML, industrial IoT (Gripple), computer vision QA, NHS Sheffield. From £4,000. Codeworth.",
    stats: [
      { label: "Manufacturing компаній", labelEn: "Manufacturing companies", value: "3,350+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "5,200+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "260+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£60k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "10+" },
    ],
    faq: [
      {
        q: "Чи є у вас досвід ML для Sheffield manufacturing?",
        qEn: "Do you have manufacturing ML experience relevant to Sheffield?",
        a: "Так. Computer vision для виявлення дефектів (YOLOv8), predictive maintenance на sensor data (LSTM/XGBoost), OEE оптимізація та digital twin integrations. Досвід роботи з даними SCADA/MES систем.",
        aEn: "Yes. Computer vision for defect detection (YOLOv8), predictive maintenance on sensor data (LSTM/XGBoost), OEE optimisation, and digital twin integrations. Experience with SCADA/MES data systems.",
      },
      {
        q: "Чи можете ви інтегруватися з AMRC проєктами?",
        qEn: "Can you integrate with AMRC-led projects?",
        a: "Так. Ми розуміємо AMRC методологію та можемо виступати як commercial ML partner для AMRC spin-out або licensing projects. Знайомі з Catapult (High Value Manufacturing Catapult) процесами.",
        aEn: "Yes. We understand AMRC methodology and can act as commercial ML partner for AMRC spin-outs or licensing projects. Familiar with High Value Manufacturing Catapult processes.",
      },
      {
        q: "Скільки коштує predictive maintenance ML у Шеффілді?",
        qEn: "What does predictive maintenance ML cost in Sheffield?",
        a: "Типовий проєкт: підключення до sensor API, feature engineering на vibration/temperature/power data, XGBoost або LSTM модель, alert pipeline. PoC £5,000–£8,000 (4–6 тижнів). Production: £15,000–£35,000.",
        aEn: "Typical project: sensor API integration, feature engineering on vibration/temperature/power data, XGBoost or LSTM model, alert pipeline. PoC £5,000–£8,000 (4–6 weeks). Production: £15,000–£35,000.",
      },
      {
        q: "Чи будуєте ви industrial IoT ML (Gripple) та клінічний ML для NHS Sheffield?",
        qEn: "Do you build industrial IoT ML (Gripple) and clinical ML for NHS Sheffield?",
        a: "Так. Для industrial IoT на кшталт Gripple — sensor-stream анотація, predictive maintenance і process optimisation ML (temperature/yield/scrap) на edge та в хмарі. Для NHS Sheffield — patient readmission prediction, bed demand forecasting та NLP для клінічних нотаток з повним DSPT compliance, GDPR Article 9 і NICE standards.",
        aEn: "Yes. For industrial IoT like Gripple — sensor-stream analytics, predictive maintenance, and process optimisation ML (temperature/yield/scrap) at the edge and in the cloud. For NHS Sheffield — patient readmission prediction, bed demand forecasting, and NLP for clinical notes with full DSPT compliance, GDPR Article 9, and NICE standards.",
      },
      {
        q: "Чи є гранти для Industry 4.0 ML у Шеффілді?",
        qEn: "Are there grants for Industry 4.0 ML in Sheffield?",
        a: "Так. Made Smarter programme, Innovate UK Advanced Manufacturing grants та South Yorkshire Investment Zone incentives. Ми допомагаємо з технічними секціями грантових заявок.",
        aEn: "Yes. Made Smarter programme, Innovate UK Advanced Manufacturing grants, and South Yorkshire Investment Zone incentives. We assist with technical sections of grant applications.",
      },
    ],
  },
  {
    slug: "newcastle",
    nameUk: "Ньюкасл",
    nameEn: "Newcastle",
    region: "Північно-Схід Англії",
    regionEn: "North East England",
    population: "300 тис.",
    populationEn: "300,000",
    businesses: 18000,
    description:
      "Ньюкасл — стратегічний AI хаб Північно-Східної Англії. Sage Group (HQ) вбудовує AI в ERP та accounting-софт, Procter & Gamble має великий data-центр у регіоні, NHS North East застосовує клінічний ML, а Університет Ньюкасла й National Innovation Centre for Data (NICD) є провідними ML-центрами. Поруч завод Nissan у Сандерленді впроваджує ML для контролю якості й виробництва. Codeworth розробляє production ML для ньюкаслських SaaS, NHS, виробництва та фінтеху за конкурентними ставками.",
    descriptionEn:
      "Newcastle is the strategic AI hub of North East England. Sage Group (HQ) embeds AI into ERP and accounting software, Procter & Gamble runs a large data operation in the region, NHS North East deploys clinical ML, and Newcastle University plus the National Innovation Centre for Data (NICD) are leading ML centres. Nearby, the Nissan plant in Sunderland uses ML for quality control and production. Codeworth delivers production ML for Newcastle SaaS, NHS, manufacturing, and fintech at competitive rates.",
    seoTitle: "ML Consultancy Newcastle | Machine Learning Agency | Codeworth",
    seoTitleEn: "ML Consultancy Newcastle | Machine Learning Agency | Codeworth",
    seoDesc:
      "ML-консалтинг у Ньюкаслі: ERP/AI (Sage), P&G data, NHS North East, Nissan Sunderland ML. Від £3,500. Codeworth.",
    seoDescEn:
      "ML consultancy Newcastle: ERP/AI (Sage Group), P&G data, NHS North East, Nissan Sunderland ML. From £3,500. Codeworth.",
    stats: [
      { label: "Tech- та SaaS-компаній", labelEn: "Tech & SaaS companies", value: "2,200+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "4,100+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "210+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£55k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "9+" },
    ],
    faq: [
      {
        q: "Чи є досвід ML для Newcastle NHS?",
        qEn: "Do you have experience with Newcastle NHS ML projects?",
        a: "Так. ML для NHS з повним DSPT compliance, UK GDPR, NICE guidelines. Ключові моделі для Newcastle: patient readmission prediction, surgical outcome risk, A&E demand forecasting.",
        aEn: "Yes. ML for NHS with full DSPT compliance, UK GDPR, and NICE guidelines. Key models for Newcastle NHS: patient readmission prediction, surgical outcome risk scoring, A&E demand forecasting.",
      },
      {
        q: "Чи є гранти для AI у Ньюкаслі та чи стежите ви за дослідженнями Newcastle University?",
        qEn: "Are there AI grants in Newcastle and do you follow Newcastle University ML research?",
        a: "Так. North East Investment Zone, Innovate UK North East, British Business Bank scale-up loans. Ми стежимо за ML-дослідженнями Newcastle University (School of Computing) та National Innovation Centre for Data (NICD) і доводимо їх до production. NICD також надає технічну підтримку ML-проєктам.",
        aEn: "Yes. North East Investment Zone, Innovate UK North East cluster, British Business Bank scale-up loans. We follow ML research from Newcastle University (School of Computing) and the National Innovation Centre for Data (NICD), taking it into production. NICD also provides technical support for ML projects.",
      },
      {
        q: "Скільки коштує ML-консалтинг у Ньюкаслі?",
        qEn: "What does ML consulting cost in Newcastle?",
        a: "Ньюкасл — одне з найбільш cost-effective міст UK для ML. Наші пакети від £3,500 (PoC). Завдяки нижчим local overheads ми можемо запропонувати більш конкурентні ставки ніж лондонські ML-агентства.",
        aEn: "Newcastle is one of the UK's most cost-effective cities for ML. Our packages start from £3,500 (PoC). Lower local overheads allow us to offer more competitive rates than London-based ML agencies.",
      },
      {
        q: "Чи будуєте ви ML для SaaS (Sage), data (P&G) та виробництва (Nissan Sunderland)?",
        qEn: "Do you build ML for SaaS (Sage), data (P&G), and manufacturing (Nissan Sunderland)?",
        a: "Так. Для ERP/accounting SaaS на кшталт Sage Group — anomaly detection у транзакціях, cash-flow forecasting, document NLP та churn prediction. Для data-операцій на кшталт P&G — demand forecasting і marketing-mix ML. Для заводу на кшталт Nissan у Сандерленді — computer vision QC (YOLOv8) та predictive maintenance. Плюс FCA-compliant ML для North East fintech (Atom Bank).",
        aEn: "Yes. For ERP/accounting SaaS like Sage Group — transaction anomaly detection, cash-flow forecasting, document NLP, and churn prediction. For data operations like P&G — demand forecasting and marketing-mix ML. For a plant like Nissan in Sunderland — computer vision QC (YOLOv8) and predictive maintenance. Plus FCA-compliant ML for North East fintech (Atom Bank).",
      },
      {
        q: "Чи обслуговуєте ви весь North East регіон?",
        qEn: "Do you serve the entire North East region?",
        a: "Так. Ньюкасл, Сандерленд, Мідлсбро, Дарем та весь North East. Повністю дистанційна робота — географія не впливає на якість deliverables.",
        aEn: "Yes. Newcastle, Sunderland, Middlesbrough, Durham, and the entire North East region. Fully remote delivery — geography does not affect the quality of our deliverables.",
      },
    ],
  },
  {
    slug: "nottingham",
    nameUk: "Ноттінгем",
    nameEn: "Nottingham",
    region: "Іст-Мідлендс",
    regionEn: "East Midlands",
    population: "330 тис.",
    populationEn: "330,000",
    businesses: 22000,
    description:
      "Ноттінгем — зростаючий ML хаб Іст-Мідлендсу з помітними секторами retail analytics (Boots HQ, Capital One UK HQ), охорони здоров'я (Nottingham University Hospitals NHS Trust — один з найбільших UK) та logistics ML (East Midlands Airport є найбільшим UK cargo hub). Університет Ноттінгему підтримує активне ML-дослідницьке середовище.",
    descriptionEn:
      "Nottingham is the East Midlands' growing ML hub with strong sectors in retail analytics (Boots UK and Capital One UK are headquartered here), healthcare (Nottingham University Hospitals NHS Trust — one of the UK's largest), and logistics ML (East Midlands Airport is the UK's largest cargo hub). The University of Nottingham maintains an active ML research environment.",
    seoTitle: "ML-консалтинг у Ноттінгемі | Машинне навчання Іст-Мідлендс | Codeworth",
    seoTitleEn: "Machine Learning Consultant Nottingham | ML Agency East Midlands | Codeworth",
    seoDesc:
      "ML-консалтинг у Ноттінгемі: retail analytics, NHS ML, logistics forecasting. Від £3,500. Codeworth.",
    seoDescEn:
      "Machine learning consultant Nottingham: retail analytics, NHS ML, logistics demand forecasting. From £3,500. Codeworth.",
    stats: [
      { label: "Retail компаній (HQ)", labelEn: "Retail companies (HQ)", value: "145+" },
      { label: "Logistics/warehouse jobs", labelEn: "Logistics / warehouse jobs", value: "42,000+" },
      { label: "NHS Trust ліжок", labelEn: "NHS Trust beds", value: "2,050+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£58k" },
      { label: "Tech компаній", labelEn: "Tech companies", value: "2,500+" },
    ],
    faq: [
      {
        q: "Чи є у вас досвід retail ML для Nottingham-based компаній?",
        qEn: "Do you have retail ML experience relevant to Nottingham?",
        a: "Так. Demand forecasting, inventory optimisation, customer segmentation та churn prediction для UK рітейлерів. Досвід роботи з Salesforce Commerce Cloud, Magento та custom retail data warehouses.",
        aEn: "Yes. Demand forecasting, inventory optimisation, customer segmentation, and churn prediction for UK retailers. Experience with Salesforce Commerce Cloud, Magento, and custom retail data warehouses.",
      },
      {
        q: "Скільки коштує logistics ML для East Midlands Airport cluster?",
        qEn: "What does logistics ML cost for the East Midlands Airport cluster?",
        a: "Logistics demand forecasting PoC: £5,000–£9,000 (4–6 тижнів). Охоплює: historical shipment data integration, seasonal feature engineering, XGBoost/Prophet model, API для WMS/TMS систем.",
        aEn: "Logistics demand forecasting PoC: £5,000–£9,000 (4–6 weeks). Covers: historical shipment data integration, seasonal feature engineering, XGBoost/Prophet model, API for WMS/TMS systems.",
      },
      {
        q: "Чи маєте ви досвід ML для Capital One UK типу fintech?",
        qEn: "Do you have experience with Capital One UK-type fintech ML?",
        a: "Так. Credit risk ML (logistic regression, gradient boosting на alternative data), fraud detection, customer lifetime value prediction. Всі моделі FCA SS1/23 compliant з SHAP explainability.",
        aEn: "Yes. Credit risk ML (logistic regression, gradient boosting on alternative data), fraud detection, customer lifetime value prediction. All models FCA SS1/23 compliant with SHAP explainability.",
      },
      {
        q: "Чи обслуговуєте ви весь East Midlands?",
        qEn: "Do you serve the whole East Midlands?",
        a: "Так. Ноттінгем, Лестер, Дербі, Лінкольн, Нортемптон та весь East Midlands. Повністю remote delivery.",
        aEn: "Yes. Nottingham, Leicester, Derby, Lincoln, Northampton, and the entire East Midlands. Fully remote delivery.",
      },
      {
        q: "Скільки коштує ML у Ноттінгемі порівняно з Лондоном?",
        qEn: "How does Nottingham ML pricing compare to London?",
        a: "Nottingham ML ставки на 20–30% нижчі ніж у Лондоні при тому ж рівні якості. Наші пакети від £3,500 (PoC). Менші local overheads дозволяють більш конкурентне ціноутворення.",
        aEn: "Nottingham ML rates are 20–30% lower than London at the same quality level. Our packages start from £3,500 (PoC). Lower local overheads allow more competitive pricing without compromising on deliverable quality.",
      },
    ],
  },
  {
    slug: "liverpool",
    nameUk: "Ліверпуль",
    nameEn: "Liverpool",
    region: "Мерсісайд",
    regionEn: "Merseyside",
    population: "2.2 млн",
    populationEn: "2.2 million",
    businesses: 68000,
    description:
      "Ліверпуль — динамічний технологічний хаб із потужним кластером цифрової охорони здоров'я (Liverpool Health Partners, £1.2B екосистема), розвиненим FinTech-районом Baltic Triangle, логістичним AI на базі Порту Ліверпуль та зростаючою life sciences індустрією. Codeworth розробляє ML-рішення для ліверпульських healthtech, фінтех та логістичних компаній, поєднуючи академічні дослідження університету з production-grade інженерією.",
    descriptionEn:
      "Liverpool is a dynamic tech hub anchored by a £1.2B digital health cluster (Liverpool Health Partners), the Baltic Triangle fintech and creative tech district, maritime logistics AI at the Port of Liverpool, and a growing life sciences sector. The city's strong university research base and diverse industry mix create significant demand for health data ML, fraud detection, and supply chain optimisation. Codeworth delivers production ML for Liverpool businesses at rates well below London.",
    seoTitle: "ML-консалтинг у Ліверпулі | Машинне навчання для healthtech | Codeworth",
    seoTitleEn: "Machine Learning Consultant Liverpool | ML Agency | Codeworth",
    seoDesc:
      "Машинне навчання у Ліверпулі: healthtech AI, фінтех, логістика. Від £3,500. Codeworth.",
    seoDescEn:
      "Machine learning consultant Liverpool: health data ML, fintech fraud detection, logistics AI. From £3,500. Codeworth ML agency.",
    stats: [
      { label: "ML-компаній", labelEn: "ML companies", value: "420+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "2,800+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "95+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£52k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "7+" },
    ],
    faq: [
      {
        q: "Як розвивається ML-ринок у Ліверпулі?",
        qEn: "How is the ML market developing in Liverpool?",
        a: "Ліверпуль активно розвиває AI-екосистему завдяки інвестиціям у цифрову охорону здоров'я, фінтех-дистрикту Baltic Triangle та університетським дослідженням. Кількість AI-стартапів зросла на 35% за два роки, що свідчить про динамічний ринок ML-послуг.",
        aEn: "Liverpool's AI ecosystem is growing rapidly, driven by £1.2B investment in digital health, the Baltic Triangle fintech district, and strong university research output. The number of AI startups grew 35% in two years, reflecting healthy demand for ML consultancy and development services.",
      },
      {
        q: "Що таке Baltic Triangle і як він пов'язаний з AI?",
        qEn: "What is the Baltic Triangle and how is it connected to AI?",
        a: "Baltic Triangle — це цифровий та креативний дистрикт Ліверпуля, де сконцентровані фінтех, маркетингові технологічні компанії та digital-агентства. Багато з них активно впроваджують ML для автоматизації маркетингу, fraud detection та аналітики клієнтської поведінки.",
        aEn: "The Baltic Triangle is Liverpool's creative and digital district, home to fintech firms, marketing technology companies, and digital agencies. Many are adopting ML for marketing automation, fraud detection, and customer behaviour analytics — making it a high-demand area for Codeworth's services.",
      },
      {
        q: "Чи можете ви розробляти ML для Liverpool Health Partners?",
        qEn: "Can you build ML solutions for Liverpool health tech companies?",
        a: "Так. Ми розробляємо health data ML з дотриманням вимог GDPR, NHS Data Security and Protection Toolkit та ICO. Наші рішення включають clinical NLP для аналізу медичних записів, predictive modelling для клінічних результатів та аналітику пацієнтів.",
        aEn: "Yes. We build health data ML compliant with UK GDPR, NHS Data Security and Protection Toolkit, and ICO guidelines. Solutions include clinical NLP for medical records analysis, predictive modelling for clinical outcomes, and patient analytics for NHS and private health providers.",
      },
      {
        q: "Яку роль відіграє AI у логістиці Порту Ліверпуль?",
        qEn: "What role does AI play in Port of Liverpool logistics?",
        a: "Порт Ліверпуль активно застосовує AI для оптимізації маршрутів, прогнозування затримок, управління запасами та автоматизації митних процесів. Ми розробляємо ML-рішення для логістичних компаній: route optimisation, demand forecasting та anomaly detection у ланцюгах поставок.",
        aEn: "The Port of Liverpool is adopting AI for route optimisation, delay prediction, inventory management, and customs automation. We build ML solutions for logistics firms operating from the port: route optimisation models, demand forecasting, and anomaly detection in supply chains.",
      },
      {
        q: "Скільки коштує ML-проєкт у Ліверпулі?",
        qEn: "How much does a typical ML project cost in Liverpool?",
        a: "ML-консалтинг у Ліверпулі на 20–25% дешевший за Лондон. Наші пакети стартують від £3,500 для PoC (3–4 тижні). Production ML-система — від £12,000. Фіксована ціна без прихованих витрат.",
        aEn: "ML consulting in Liverpool runs 20–25% below London rates. Our packages start from £3,500 for a PoC (3–4 weeks). Production ML systems from £12,000. Fixed-price engagements with no hidden costs.",
      },
    ],
  },
  {
    slug: "brighton",
    nameUk: "Брайтон",
    nameEn: "Brighton",
    region: "Іст-Сассекс",
    regionEn: "East Sussex",
    population: "650,000",
    populationEn: "650,000",
    businesses: 32000,
    description:
      "Брайтон — ML-хаб Південної Англії з унікальним фокусом на personalisation AI та marketing ML. Тут базуються American Express (UK ML-команда), Brandwatch (NLP для соцмереж), Lighthouse Games та сотні digital-агентств, що впроваджують ML-автоматизацію. Codeworth будує ML-рішення для брайтонського martech, gaming та e-commerce: customer LTV моделі, churn prediction та NLP-аналіз sentiment.",
    descriptionEn:
      "Brighton is a South of England ML hub specialising in personalisation AI and marketing machine learning. American Express has a major UK ML team here, Brandwatch (now Cision) built its NLP social media intelligence platform in Brighton, and Lighthouse Games anchors a game analytics cluster. Codeworth delivers production ML for Brighton's martech, gaming, and e-commerce companies: customer LTV models, churn prediction, campaign bid optimisation, and NLP sentiment analysis.",
    seoTitle: "ML-консалтинг у Брайтоні | Машинне навчання для digital-агентств | Codeworth",
    seoTitleEn: "Machine Learning Consultant Brighton | ML Agency | Codeworth",
    seoDesc:
      "Машинне навчання у Брайтоні: marketing AI, game analytics, personalisation. Від £3,500. Codeworth.",
    seoDescEn:
      "Machine learning consultant Brighton: marketing AI, game analytics, campaign optimisation ML. From £3,500. Codeworth ML agency.",
    stats: [
      { label: "Digital/martech агентств", labelEn: "Digital / martech agencies", value: "850+" },
      { label: "Gaming студій", labelEn: "Gaming studios", value: "120+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "2,100+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£54k" },
      { label: "AI-стартапів (Sussex+Brighton)", labelEn: "AI startups (Sussex+Brighton)", value: "95+" },
    ],
    faq: [
      {
        q: "Яка digital-технологічна сцена у Брайтоні?",
        qEn: "What is Brighton's digital tech scene like?",
        a: "Брайтон — один із найжвавіших digital-хабів Великобританії поза Лондоном. Тут сконцентровані сотні digital-агентств, маркетингових платформ, gaming-студій та sustainable tech компаній. Місто відоме своєю відкритою технологічною спільнотою та сильною культурою стартапів.",
        aEn: "Brighton hosts one of the UK's most vibrant digital tech communities outside London. Hundreds of digital agencies, martech platforms, gaming studios, and sustainable tech firms are based here. The city is known for its open tech community, regular meetups, and strong startup culture — making it a natural fit for adopting ML early.",
      },
      {
        q: "Які ML-застосування найбільш корисні для маркетингових компаній?",
        qEn: "Which ML use cases are most valuable for marketing companies?",
        a: "Для маркетингових компаній найбільш цінні: предиктивна сегментація аудиторії, ML-оптимізація рекламних кампаній, churn prediction для клієнтів, NLP-аналіз відгуків та LTV-прогнозування. Ці рішення безпосередньо покращують ROI рекламних витрат.",
        aEn: "For marketing companies the highest-value ML use cases are: predictive audience segmentation, ML-driven campaign bid optimisation, client churn prediction, NLP sentiment analysis of reviews, and customer LTV forecasting. These directly improve return on ad spend and client retention.",
      },
      {
        q: "Чи розробляєте ви ML для ігрової індустрії?",
        qEn: "Do you develop ML for the gaming industry?",
        a: "Так. Ми розробляємо ML для gaming: player behaviour analytics, churn prediction, dynamic difficulty adjustment, fraud detection для in-game транзакцій та matchmaking-алгоритми. Стек: PyTorch для нейронних мереж, Spark для event-стрімінгу, A/B тестування ML-гіпотез.",
        aEn: "Yes. We build gaming ML for player behaviour analytics, churn prediction, dynamic difficulty adjustment, in-game transaction fraud detection, and matchmaking algorithms. Stack: PyTorch for neural networks, Apache Spark for event streaming, and rigorous A/B testing of ML-driven feature changes.",
      },
      {
        q: "Чи можна працювати з вами дистанційно з Брайтона?",
        qEn: "Can we work with you remotely from Brighton?",
        a: "Так, ми повністю дистанційна команда. Більшість наших клієнтів по всій Великобританії взаємодіють через відео-зустрічі, Slack та async sprint-демо. Брайтонські клієнти відзначають, що отримують якість лондонського рівня при нижчих витратах.",
        aEn: "Yes, we operate as a fully remote team. Most of our UK clients engage via video calls, Slack, and async sprint demos. Brighton clients consistently note they receive London-quality ML engineering at significantly lower cost — with no travel overhead.",
      },
      {
        q: "Скільки коштує ML-консультант у Брайтоні?",
        qEn: "How much does an ML consultant cost in Brighton?",
        a: "Брайтонські ML-фрілансери беруть £450–£750/день. Наші фіксовані пакети стартують від £3,500 (PoC, 3–4 тижні) і дають передбачуваний бюджет без погодинного тарифу. Production ML — від £10,000.",
        aEn: "Brighton ML freelancer rates run £450–£750/day. Our fixed-price packages start from £3,500 for a PoC (3–4 weeks) — giving predictable budget without hourly billing. Production ML systems from £10,000.",
      },
    ],
  },
  {
    slug: "southampton",
    nameUk: "Саутгемптон",
    nameEn: "Southampton",
    region: "Гемпшир",
    regionEn: "Hampshire",
    population: "850,000",
    populationEn: "850,000",
    businesses: 38000,
    description:
      "Саутгемптон — UK-центр maritime ML та оборонного AI. ABP (Associated British Ports) застосовує ML для оптимізації портових операцій, Lloyd's Register веде ML-програму з безпеки суден, BAE Systems розробляє ML для підводних автономних систем. University of Southampton — топ-10 UK за ML-дослідженнями (RL, NLP, computer vision). Codeworth будує maritime predictive maintenance, route optimisation ML та defence supply-chain AI для саутгемптонського сектору.",
    descriptionEn:
      "Southampton is the UK's leading maritime ML and defence AI centre. ABP (Associated British Ports) uses ML for port traffic and cargo operations optimisation; Lloyd's Register runs an active ML programme for vessel safety prediction; BAE Systems (Filton/Southampton axis) deploys ML for autonomous underwater vehicle systems. The University of Southampton's AI group (top-10 UK) publishes research in RL, NLP, and computer vision. Codeworth builds maritime predictive maintenance, vessel route optimisation ML, and defence supply-chain AI for Southampton sector businesses.",
    seoTitle: "ML-консалтинг у Саутгемптоні | Машинне навчання для maritime & defence | Codeworth",
    seoTitleEn: "Machine Learning Consultant Southampton | ML Agency | Codeworth",
    seoDesc:
      "Машинне навчання у Саутгемптоні: maritime AI, defence tech, biotech ML. Від £3,500. Codeworth.",
    seoDescEn:
      "Machine learning consultant Southampton: maritime AI, defence supply chain, biotech ML. From £3,500. Codeworth ML agency.",
    stats: [
      { label: "Морських/оборонних компаній", labelEn: "Maritime / defence companies", value: "480+" },
      { label: "ML-дослідників (Uni Southampton)", labelEn: "ML researchers (Uni Southampton)", value: "340+" },
      { label: "Biotech/фарм компаній", labelEn: "Biotech / pharma companies", value: "95+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£57k" },
      { label: "AI-стартапів (Hampshire)", labelEn: "AI startups (Hampshire)", value: "110+" },
    ],
    faq: [
      {
        q: "Як ML застосовується у морській індустрії Саутгемптона?",
        qEn: "How is ML applied in Southampton's maritime industry?",
        a: "Maritime AI у Саутгемптоні охоплює: predictive maintenance для суднових двигунів і обладнання, оптимізацію маршрутів для зниження витрат палива, ML-аналітику порту для управління трафіком, anomaly detection у вантажних операціях та NLP для автоматизації митної документації.",
        aEn: "Maritime AI in Southampton covers predictive maintenance for ship engines and port equipment, route optimisation to reduce fuel costs, port traffic management ML, anomaly detection in cargo operations, and NLP for automated customs documentation. ABP and Lloyd's Register are active adopters — creating a strong ecosystem for maritime ML vendors.",
      },
      {
        q: "Яку роль відіграє University of Southampton у ML-досліджень?",
        qEn: "What role does the University of Southampton play in ML research?",
        a: "University of Southampton входить до топ-10 UK університетів за ML-дослідженнями, із сильними групами у reinforcement learning, NLP та computer vision. Університет активно співпрацює з індустрією через спінофи та дослідницькі партнерства. Codeworth підтримує зв'язок з академічними колами для впровадження найновіших методів.",
        aEn: "The University of Southampton ranks among the UK's top-10 ML research institutions, with strong groups in reinforcement learning, NLP, and computer vision. The university actively collaborates with industry through spinouts and research partnerships. This creates a pipeline of ML talent and cutting-edge techniques available to Southampton businesses.",
      },
      {
        q: "Які регуляторні особливості ML у оборонному секторі?",
        qEn: "What are the regulatory considerations for ML in the defence sector?",
        a: "Оборонний ML підпадає під суворі вимоги: UK GDPR, Defence and Security Accelerator (DASA) стандарти, MOD AI Ethics principles та export control regulations. Ми розробляємо explainable AI з SHAP-документацією та audit trails, що відповідають вимогам оборонних контрактів.",
        aEn: "Defence ML is subject to strict requirements including UK GDPR, Defence and Security Accelerator (DASA) standards, MOD AI Ethics Principles, and export control regulations. We build explainable ML with SHAP documentation and full audit trails — meeting the transparency requirements of MOD and prime contractor procurement.",
      },
      {
        q: "Як ML використовується у біотех та фармацевтиці Саутгемптона?",
        qEn: "How is ML used in Southampton biotech and pharma?",
        a: "Для біотех та фармацевтики ML застосовується у: прискоренні drug discovery через молекулярне моделювання, clinical trial optimisation, NLP для аналізу наукової літератури, predictive analytics для manufacturing quality control та adverse event detection у пост-маркетинговому спостереженні.",
        aEn: "Southampton biotech and pharma companies use ML for: accelerating drug discovery via molecular modelling, clinical trial optimisation, NLP analysis of scientific literature, predictive analytics for manufacturing quality control, and adverse event detection in post-market surveillance. We build compliant ML following GxP validation principles.",
      },
      {
        q: "Який ROI дає ML для виробничих компаній Саутгемптона?",
        qEn: "What ROI does ML deliver for Southampton manufacturing businesses?",
        a: "Типові результати для виробничих компаній: predictive maintenance — зниження незапланованих простоїв на 40–60%, quality control CV — зниження браку на 25–35%, process optimisation — зниження витрат енергії на 15–20%. Середній термін окупності — 4–8 місяців.",
        aEn: "Typical results for Southampton manufacturing clients: predictive maintenance reduces unplanned downtime by 40–60%, quality control CV cuts scrap rates by 25–35%, process optimisation lowers energy costs by 15–20%. Average payback period is 4–8 months — making the business case straightforward.",
      },
    ],
  },
  {
    slug: "leicester",
    nameUk: "Лестер",
    nameEn: "Leicester",
    region: "Іст-Мідлендс",
    regionEn: "East Midlands",
    population: "1.1 млн",
    populationEn: "1.1 million",
    businesses: 55000,
    description:
      "Лестер — UK-центр life sciences ML та фармацевтичної автоматизації. Piramal Pharma Solutions використовує ML для pharmaceutical manufacturing QC; Walgreens Boots Alliance (регіональний офіс) впроваджує ML у retail pharmacy personalisation та demand forecasting; SEGRO East Midlands Gateway логістичний хаб генерує попит на supply-chain ML. University of Leicester веде ML-дослідження у medical imaging та NLP. Codeworth будує pharma ML pipelines та retail forecasting для лестерських підприємств.",
    descriptionEn:
      "Leicester is a UK life sciences ML and pharma automation centre. Piramal Pharma Solutions uses ML for pharmaceutical manufacturing quality control; Walgreens Boots Alliance (regional office) deploys ML for retail pharmacy personalisation and demand forecasting; SEGRO East Midlands Gateway logistics hub drives supply-chain ML demand. The University of Leicester runs ML research in medical imaging and NLP epidemiology. Codeworth builds pharma ML pipelines, retail forecasting systems, and logistics optimisation for Leicester businesses.",
    seoTitle: "ML-консалтинг у Лестері | Машинне навчання для life sciences | Codeworth",
    seoTitleEn: "Machine Learning Consultant Leicester | ML Agency East Midlands | Codeworth",
    seoDesc:
      "Машинне навчання у Лестері: life sciences AI, фармацевтика, логістика, текстиль. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Leicester: life sciences AI, pharma ML, logistics forecasting, textile automation. From £4,000. Codeworth.",
    stats: [
      { label: "Pharma/life sciences компаній", labelEn: "Pharma / life sciences companies", value: "185+" },
      { label: "Логістичних/warehouse компаній", labelEn: "Logistics / warehouse companies", value: "620+" },
      { label: "Tech компаній (Leics cluster)", labelEn: "Tech companies (Leics cluster)", value: "3,200+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£52k" },
      { label: "ML-дослідників (Uni Leicester)", labelEn: "ML researchers (Uni Leicester)", value: "95+" },
    ],
    faq: [
      {
        q: "Який стан ML-ринку у Лестері?",
        qEn: "What is the Leicester ML market like?",
        a: "Лестер входить до топ-20 tech-кластерів Великобританії з понад 280 ML-компаніями та 1,850+ спеціалістами. Зростання зумовлене кластером life sciences, університетськими дослідженнями та сильним сектором логістики та рітейлу.",
        aEn: "Leicester ranks among the UK's top-20 tech clusters with 280+ ML companies and 1,850+ specialists. Growth is driven by the life sciences cluster, university research, and a strong logistics and retail sector underpinned by the SEGRO distribution park.",
      },
      {
        q: "Які ML-можливості існують у секторі life sciences Лестера?",
        qEn: "What ML opportunities exist in Leicester's life sciences sector?",
        a: "Фармацевтичні компанії Лестера, зокрема Piramal та Walgreens Boots Alliance, потребують ML для drug discovery, clinical trial optimisation, manufacturing quality control та pharmacovigilance. NLP-рішення для аналізу наукової літератури та adverse event detection також активно впроваджуються.",
        aEn: "Leicester pharma companies including Piramal and Walgreens Boots Alliance need ML for drug discovery, clinical trial optimisation, manufacturing quality control, and pharmacovigilance. NLP solutions for scientific literature analysis and adverse event detection are also in strong demand.",
      },
      {
        q: "Як Midlands Engine підтримує ML-ініціативи у Лестері?",
        qEn: "How does the Midlands Engine support ML initiatives in Leicester?",
        a: "Midlands Engine та LLEP (Leicester & Leicestershire Enterprise Partnership) надають гранти на цифровізацію та AI-впровадження для малого та середнього бізнесу. Компанії можуть отримати до 50% співфінансування на ML PoC через схеми Innovate UK та ERDF.",
        aEn: "The Midlands Engine and LLEP (Leicester & Leicestershire Enterprise Partnership) provide digitalisation and AI adoption grants for SMEs. Businesses can access up to 50% co-funding for ML PoCs through Innovate UK and ERDF schemes.",
      },
      {
        q: "Як ML використовується у текстильному виробництві Лестера?",
        qEn: "How is ML used in Leicester's textile manufacturing sector?",
        a: "Текстильні та трикотажні підприємства Лестера використовують ML для: прогнозування попиту та оптимізації запасів, computer vision для контролю якості тканини, предиктивного обслуговування ткацького обладнання та автоматизації дизайну патернів.",
        aEn: "Leicester textile and hosiery manufacturers use ML for: demand forecasting and inventory optimisation, computer vision for fabric quality control (defect detection), predictive maintenance of knitting machinery, and automated pattern design optimisation.",
      },
      {
        q: "Які AI-дослідження проводить Університет Лестера?",
        qEn: "What AI research does the University of Leicester conduct?",
        a: "Університет Лестера має активні AI-дослідницькі групи у сферах machine learning для медичної візуалізації, NLP, computer vision та data-driven epidemiology. Бізнеси можуть співпрацювати через Knowledge Transfer Partnerships (KTP) для спільної розробки ML-рішень.",
        aEn: "The University of Leicester has active AI research groups in machine learning for medical imaging, NLP, computer vision, and data-driven epidemiology. Businesses can collaborate via Knowledge Transfer Partnerships (KTP) to co-develop ML solutions with academic support.",
      },
    ],
  },
  {
    slug: "coventry",
    nameUk: "Ковентрі",
    nameEn: "Coventry",
    region: "Уест-Мідлендс",
    regionEn: "West Midlands",
    population: "985,000",
    populationEn: "985,000",
    businesses: 42000,
    description:
      "Ковентрі — серце UK automotive та EV ML. Jaguar Land Rover (штаб-квартира в Гейдон, ~10 км) використовує ML для predictive quality в фарбувальних цехах та battery health monitoring в EV Range Rover; London Electric Vehicle Company впроваджує ML для fleet management; Horiba MIRA (автомобільне випробувальне середовище) тестує ML для автономних систем. University of Warwick (топ-10 CS) забезпечує pipeline ML-талантів. Codeworth будує automotive ML та EV-оптимізацію для ковентрійських виробників.",
    descriptionEn:
      "Coventry is at the heart of UK automotive and EV machine learning. Jaguar Land Rover (HQ at Gaydon, ~10 km) uses ML for predictive quality in paint shops and battery health monitoring in EV Range Rover models; London Electric Vehicle Company deploys ML for fleet management optimisation; Horiba MIRA (automotive proving ground) tests ML for autonomous vehicle systems. The University of Warwick (top-10 Computer Science UK) supplies a strong ML talent pipeline. Codeworth builds automotive ML systems and EV battery optimisation for Coventry-area manufacturers.",
    seoTitle: "ML-консалтинг у Ковентрі | Машинне навчання для автовиробництва | Codeworth",
    seoTitleEn: "Machine Learning Consultant Coventry | Automotive AI Agency | Codeworth",
    seoDesc:
      "Машинне навчання у Ковентрі: automotive AI, EV ML, advanced manufacturing, WMCA smart region. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Coventry: automotive AI, EV manufacturing ML, advanced manufacturing automation. From £4,000. Codeworth.",
    stats: [
      { label: "Automotive/EV компаній (регіон)", labelEn: "Automotive / EV companies (region)", value: "1,850+" },
      { label: "ML-дослідників (Uni Warwick)", labelEn: "ML researchers (Uni Warwick)", value: "280+" },
      { label: "Advanced manufacturing jobs", labelEn: "Advanced manufacturing jobs", value: "55,000+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£56k" },
      { label: "WMCA AI-грантів (щорічно)", labelEn: "WMCA AI grants (annual)", value: "£8M+" },
    ],
    faq: [
      {
        q: "Яка ML-екосистема у Ковентрі?",
        qEn: "What is the Coventry ML ecosystem like?",
        a: "Ковентрі має понад 265 ML-компаній та 1,720+ спеціалістів, зосереджених переважно в automotive/EV та advanced manufacturing секторах. Університети Ковентрі та Ворвік забезпечують сильну академічну базу, а WMCA активно фінансує AI-ініціативи в регіоні.",
        aEn: "Coventry has 265+ ML companies and 1,720+ specialists, concentrated primarily in automotive/EV and advanced manufacturing sectors. The Universities of Coventry and Warwick provide strong academic foundations, while WMCA actively funds AI initiatives across the region.",
      },
      {
        q: "Які ML-застосування існують в автомобільній промисловості Ковентрі?",
        qEn: "What ML applications exist in Coventry's automotive industry?",
        a: "Автомобільні компанії Ковентрі впроваджують ML для: predictive maintenance виробничого обладнання, computer vision для контролю якості зварних швів та покриттів, оптимізації EV-батарейних циклів, прогнозування ланцюга постачання та автономного тестування транспортних засобів.",
        aEn: "Coventry automotive companies deploy ML for: predictive maintenance of manufacturing equipment, computer vision for weld and coating quality control, EV battery cycle optimisation, supply chain forecasting, and autonomous vehicle testing. The JLR influence drives strong demand for production-grade ML engineering.",
      },
      {
        q: "Які гранти WMCA доступні для ML-проєктів?",
        qEn: "What West Midlands ML grants are available?",
        a: "WMCA та West Midlands Growth Company пропонують кілька схем фінансування: Digital Growth Programme (до £10,000 для SME), Made Smarter West Midlands (до 50% покриття ML-пілотів для виробництва) та Innovate UK Smart Grants. Codeworth може допомогти з підготовкою заявки.",
        aEn: "WMCA and West Midlands Growth Company offer several funding schemes: Digital Growth Programme (up to £10,000 for SMEs), Made Smarter West Midlands (up to 50% co-funding for manufacturing ML pilots), and Innovate UK Smart Grants. Codeworth can assist with application preparation.",
      },
      {
        q: "Як JLR впроваджує ML у виробництво?",
        qEn: "How is JLR adopting ML in manufacturing?",
        a: "JLR активно впроваджує ML для predictive quality у фарбувальних цехах (зниження переробок на 40%), оптимізації закупівель, demand sensing для планування виробництва та battery health monitoring в EV-моделях Range Rover та Defender. Постачальники JLR теж потребують ML-компетенцій.",
        aEn: "JLR is actively deploying ML for predictive quality in paint shops (reducing rework by 40%), procurement optimisation, demand sensing for production planning, and battery health monitoring in Range Rover and Defender EV models. JLR tier-1 and tier-2 suppliers increasingly need ML capabilities to meet JLR quality standards.",
      },
      {
        q: "Як автоматизація виробництва у Ковентрі пов'язана з ML?",
        qEn: "How does manufacturing automation in Coventry connect to ML?",
        a: "Advanced manufacturing у Ковентрі переходить від rule-based автоматизації до adaptive ML-систем: роботи-зварювальники з CV-коригуванням траєкторії, AGV з reinforcement learning маршрутизацією, та цифрові двійники виробничих ліній для симуляції та оптимізації. Codeworth проєктує ці ML-шари поверх існуючої автоматики.",
        aEn: "Advanced manufacturing in Coventry is transitioning from rule-based automation to adaptive ML systems: welding robots with CV trajectory correction, AGVs with reinforcement learning routing, and digital twins of production lines for simulation and optimisation. Codeworth designs these ML layers on top of existing automation infrastructure.",
      },
    ],
  },
  {
    slug: "reading",
    nameUk: "Редінг",
    nameEn: "Reading",
    region: "Беркшир",
    regionEn: "Berkshire",
    population: "342,000",
    populationEn: "342,000",
    businesses: 38000,
    description:
      "Редінг — серце технологічного коридору Темзи-Веллі з штаб-квартирами Microsoft UK, Oracle, Hewlett Packard Enterprise та Verizon. Розташований за 45 хвилин від Лондона, Редінг поєднує столичні зарплатні очікування з нижчими операційними витратами. Університет Редінга розвиває data science напрям, а потужна присутність fintech та cybersecurity компаній робить місто стратегічним ML-хабом. Codeworth будує ML для редінгських технологічних компаній, fintech та enterprise бізнесів.",
    descriptionEn:
      "Reading is the heart of the Thames Valley tech corridor, hosting Microsoft UK HQ, Oracle, Hewlett Packard Enterprise, and Verizon. Located 45 minutes from London, Reading combines capital-level talent expectations with lower operating costs. The University of Reading's data science programme and strong fintech and cybersecurity presence make it a strategic ML hub. Codeworth builds ML for Reading tech companies, fintech, and enterprise businesses.",
    seoTitle: "ML-консалтинг у Редінгу | Машинне навчання Thames Valley | Codeworth",
    seoTitleEn: "Machine Learning Consultant Reading | Thames Valley ML Agency | Codeworth",
    seoDesc:
      "Машинне навчання у Редінгу: Thames Valley tech corridor, Microsoft UK, fintech ML, cybersecurity AI. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Reading: Thames Valley tech corridor, fintech ML, cybersecurity AI, enterprise automation. From £4,000. Codeworth.",
    stats: [
      { label: "ML-компаній", labelEn: "ML companies", value: "390+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "2,600+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "84+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£60k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "6+" },
    ],
    faq: [
      {
        q: "Що таке технологічний коридор Thames Valley у Редінгу?",
        qEn: "What is the Reading Thames Valley tech corridor?",
        a: "Thames Valley tech corridor — це концентрація глобальних технологічних компаній між Редінгом та Лондоном. Редінг є центром коридору з Microsoft UK, Oracle, HPE, Verizon, Fujitsu та сотнями SaaS та fintech компаній. Місто має найвищу щільність tech-роботодавців за межами Лондона.",
        aEn: "The Thames Valley tech corridor is the concentration of global technology companies between Reading and London. Reading anchors the corridor with Microsoft UK, Oracle, HPE, Verizon, Fujitsu, and hundreds of SaaS and fintech companies. The city has the highest density of tech employers outside London.",
      },
      {
        q: "Які ML-партнерські можливості надає Microsoft UK у Редінгу?",
        qEn: "What Microsoft UK ML partnership opportunities exist in Reading?",
        a: "Завдяки присутності Microsoft UK у Редінгу, місцеві бізнеси мають привілейований доступ до Azure ML partner ecosystem, Microsoft for Startups програми та Co-Sell partnerships. Codeworth є досвідченим у Azure ML Studio, Azure OpenAI Service та MLOps на Azure DevOps.",
        aEn: "With Microsoft UK headquartered in Reading, local businesses have privileged access to the Azure ML partner ecosystem, Microsoft for Startups programme, and Co-Sell partnerships. Codeworth is experienced in Azure ML Studio, Azure OpenAI Service, and MLOps on Azure DevOps — making Reading engagements particularly well-suited to Azure-native deployments.",
      },
      {
        q: "Які зарплатні орієнтири для ML-спеціалістів у Редінгу?",
        qEn: "What are the ML salary benchmarks in Reading?",
        a: "Зарплати ML-спеціалістів у Редінгу: Junior Data Scientist — £40,000–£50,000, Mid-level ML Engineer — £55,000–£70,000, Senior ML Engineer — £75,000–£95,000, Principal/Staff — £100,000+. Рівень на 10–15% нижче Лондона, але вартість проживання значно менша.",
        aEn: "Reading ML specialist salaries: Junior Data Scientist £40,000–£50,000, Mid-level ML Engineer £55,000–£70,000, Senior ML Engineer £75,000–£95,000, Principal/Staff £100,000+. Rates run 10–15% below London but living costs are significantly lower, making Reading attractive for ML talent retention.",
      },
      {
        q: "Як Thames Valley fintech компанії використовують ML?",
        qEn: "How do Thames Valley fintech companies use ML?",
        a: "Fintech компанії Thames Valley застосовують ML для: fraud detection та AML (anti-money laundering), credit risk scoring, algorithmic trading, customer churn prediction, NLP для автоматизації compliance та regtech рішень. Proximity до Лондонського фінансового центру забезпечує доступ до фінансових датасетів та регуляторної експертизи.",
        aEn: "Thames Valley fintech companies deploy ML for: fraud detection and AML, credit risk scoring, algorithmic trading signals, customer churn prediction, and NLP for compliance automation and regtech solutions. Proximity to the London financial centre provides access to financial datasets and regulatory expertise.",
      },
      {
        q: "Яка перевага Редінга для ML-компаній порівняно з Лондоном?",
        qEn: "What is Reading's advantage for ML companies compared to London?",
        a: "Редінг пропонує лондонський рівень tech-талантів та корпоративних клієнтів при витратах на 30–40% нижче. Офісна оренда у 3–4 рази дешевше, ніж у Центральному Лондоні. Crossrail (Elizabeth line) забезпечує 27-хвилинний маршрут до Паддінгтону, що дозволяє командам легко зустрічатися з лондонськими клієнтами.",
        aEn: "Reading offers London-level tech talent and corporate clients at 30–40% lower costs. Office rents are 3–4x cheaper than Central London. The Elizabeth line (Crossrail) provides a 27-minute journey to Paddington, enabling teams to meet London clients easily while maintaining the cost advantages of a Thames Valley base.",
      },
    ],
  },
  {
    slug: "plymouth",
    nameUk: "Плімут",
    nameEn: "Plymouth",
    region: "Девон, Південно-Захід Англії",
    regionEn: "Devon, South West England",
    population: "264 тис.",
    populationEn: "264,000",
    businesses: 14000,
    description:
      "Плімут — UK-центр оборонного AI та морського ML. Babcock International застосовує ML для predictive maintenance атомних підводних човнів у Devonport; QinetiQ веде ML-програму для autonomous underwater vehicles (AUV); Plymouth Marine Laboratory використовує ML для класифікації планктону та прогнозу океанічного клімату. Університет Плімута має спеціалізований AI-курс для оборонних та морських застосувань у партнерстві з Dstl. Codeworth будує defence ML та maritime predictive systems для плімутських підрядників.",
    descriptionEn:
      "Plymouth is the UK centre for defence AI and maritime ML. Babcock International applies ML for predictive maintenance of nuclear submarines at Devonport — the UK's largest naval base; QinetiQ runs an active ML programme for autonomous underwater vehicles (AUVs) and mine countermeasure systems; Plymouth Marine Laboratory uses ML for plankton classification and ocean climate forecasting. The University of Plymouth offers a specialist AI course for defence and maritime applications in partnership with Dstl. Codeworth builds defence ML systems and maritime predictive maintenance for Plymouth contractors.",
    seoTitle: "ML-консалтинг у Плімуті | Оборонні та морські технології AI | Codeworth",
    seoTitleEn: "Machine Learning Consultant Plymouth | Defence & Maritime AI | Codeworth",
    seoDesc:
      "ML-консалтинг у Плімуті: оборонний AI, морське машинне навчання, смарт-порт. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Plymouth: defence AI, maritime ML, smart port analytics. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "Оборонних/морських компаній", labelEn: "Defence / maritime companies", value: "320+" },
      { label: "ML-дослідників (Uni Plymouth)", labelEn: "ML researchers (Uni Plymouth)", value: "85+" },
      { label: "Dstl-фінансованих AI проєктів", labelEn: "Dstl-funded AI projects (region)", value: "40+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£49k" },
      { label: "Tech компаній у Девоні", labelEn: "Tech companies in Devon", value: "2,400+" },
    ],
    faq: [
      {
        q: "Як AI застосовується в оборонному секторі Плімута?",
        qEn: "How is AI used in Plymouth's defence sector?",
        a: "Оборонні компанії Плімута — Babcock, Devonport та QinetiQ — використовують ML для прогнозованого технічного обслуговування суден, розпізнавання об'єктів на підводних апаратах, кіберзахисту оборонних мереж та аналізу розвідувальних даних. AI допомагає скорочувати витрати на технічне обслуговування та підвищувати надійність обладнання.",
        aEn: "Plymouth's defence companies — Babcock, Devonport, and QinetiQ — use ML for predictive vessel maintenance, object recognition on autonomous underwater vehicles, cybersecurity of defence networks, and intelligence data analysis. AI reduces maintenance costs and improves equipment reliability across naval operations.",
      },
      {
        q: "Які морські ML-застосунки розробляє Плімут?",
        qEn: "What marine ML applications does Plymouth develop?",
        a: "Plymouth Marine Laboratory використовує ML для класифікації планктону, моніторингу якості океанічної води та прогнозування кліматичних змін. Морські компанії міста застосовують ML для оптимізації маршрутів суден, скорочення витрати палива та планування технічного обслуговування флоту.",
        aEn: "Plymouth Marine Laboratory uses ML for plankton classification, ocean water quality monitoring, and climate change prediction. Maritime companies apply ML to vessel route optimisation, fuel consumption reduction, and fleet maintenance planning.",
      },
      {
        q: "Як розвивається ML-екосистема Південно-Захід Англії?",
        qEn: "How is the South West England ML ecosystem developing?",
        a: "Південний захід Англії формує унікальну ML-нішу, орієнтовану на оборонні та морські технології. Університети Плімута, Екзетера та Бристоля готують спеціалістів з AI. Регіональні гранти для оборонно-промислового комплексу стимулюють ML-інновації, а Агенція оборонних науки та технологій (Dstl) фінансує дослідницькі партнерства.",
        aEn: "South West England is building a unique ML niche focused on defence and maritime technology. Plymouth, Exeter, and Bristol universities supply AI talent. Regional grants for the defence industrial base drive ML innovation, and the Defence Science and Technology Laboratory (Dstl) funds research partnerships.",
      },
      {
        q: "Що досліджує лабораторія AI Університету Плімута?",
        qEn: "What does Plymouth University's AI lab research?",
        a: "Лабораторія AI Університету Плімута зосереджена на робототехніці та автономних системах, обробці природної мови для морських застосувань, комп'ютерному зорі для підводних апаратів і ML для охорони здоров'я. Співпраця з місцевими оборонними підприємствами забезпечує прикладний характер досліджень.",
        aEn: "Plymouth University's AI lab focuses on robotics and autonomous systems, natural language processing for maritime applications, computer vision for underwater vehicles, and ML for healthcare. Collaboration with local defence firms ensures research stays applied and commercially relevant.",
      },
      {
        q: "Чи застосовується AI у державних оборонних закупівлях у Плімуті?",
        qEn: "Is AI used in defence procurement in Plymouth?",
        a: "Так. Міністерство оборони Великобританії та великі оборонні підрядники Плімута активно інтегрують AI у процеси закупівель: від прогнозування попиту на запчастини до оцінювання ризиків у ланцюгах постачання. ML допомагає виявляти аномалії в контрактах та оптимізувати логістику.",
        aEn: "Yes. The UK MoD and Plymouth's major defence contractors are integrating AI into procurement processes: from spare parts demand forecasting to supply chain risk assessment. ML helps detect contract anomalies and optimise logistics across naval supply chains.",
      },
    ],
  },
  {
    slug: "derby",
    nameUk: "Дербі",
    nameEn: "Derby",
    region: "Дербішир, Іст-Мідлендс",
    regionEn: "Derbyshire, East Midlands",
    population: "261 тис.",
    populationEn: "261,000",
    businesses: 16000,
    description:
      "Дербі — серце британської аерокосмічної та передової виробничої промисловості. Тут розташована штаб-квартира Rolls-Royce, виробництво компонентів Airbus та завод Toyota Manufacturing UK, що формують потужний кластер промислового AI та предиктивного технічного обслуговування. Університет Дербі веде дослідження у галузі AI для виробництва, а кластер передового машинобудування Іст-Мідлендс приваблює ML-інвестиції. Codeworth розробляє ML-рішення для аерокосмічного та автомобільного секторів.",
    descriptionEn:
      "Derby is the heart of the UK aerospace and advanced manufacturing industry. Rolls-Royce global headquarters, Airbus component manufacturing, and Toyota Manufacturing UK anchor a powerful industrial AI and predictive maintenance cluster. The University of Derby drives AI research for manufacturing, and the East Midlands advanced manufacturing cluster attracts ML investment. Codeworth builds ML solutions for Derby's aerospace and automotive sectors.",
    seoTitle: "ML-консалтинг у Дербі | Аерокосмічний та виробничий AI | Codeworth",
    seoTitleEn: "Machine Learning Consultant Derby | Aerospace & Manufacturing AI | Codeworth",
    seoDesc:
      "ML-консалтинг у Дербі: аерокосмічний AI, предиктивне обслуговування, виробничий ML. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Derby: aerospace AI, predictive maintenance, manufacturing ML. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "ML-компаній у регіоні", labelEn: "ML companies in the region", value: "230+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "1,540+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "51+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£46,000" },
      { label: "Реалізованих проєктів Codeworth", labelEn: "Codeworth projects delivered", value: "3" },
    ],
    faq: [
      {
        q: "Як Rolls-Royce використовує ML у Дербі?",
        qEn: "How does Rolls-Royce use ML in Derby?",
        a: "Rolls-Royce застосовує ML для предиктивного обслуговування авіадвигунів через платформу IntelligentEngine, аналізу телеметрії польотів у реальному часі, оптимізації виробничих процесів та контролю якості за допомогою комп'ютерного зору. Центр даних компанії у Дербі обробляє мільярди точок даних щодня.",
        aEn: "Rolls-Royce uses ML for predictive aero-engine maintenance through its IntelligentEngine platform, real-time flight telemetry analysis, manufacturing process optimisation, and computer vision quality control. The company's data centre in Derby processes billions of data points daily to keep engines airworthy.",
      },
      {
        q: "Які можливості ML є у виробництві Дербі?",
        qEn: "What ML opportunities exist in Derby manufacturing?",
        a: "Виробничий сектор Дербі потребує ML для прогнозованого технічного обслуговування обладнання, виявлення дефектів за допомогою комп'ютерного зору, оптимізації ланцюгів постачання та планування виробництва. Toyota UK та Airbus активно інвестують у цифрові двійники та AI-автоматизацію.",
        aEn: "Derby's manufacturing sector needs ML for equipment predictive maintenance, computer vision defect detection, supply chain optimisation, and production scheduling. Toyota UK and Airbus are actively investing in digital twins and AI-driven automation to improve quality and reduce downtime.",
      },
      {
        q: "Як розвиваються ML-інвестиції в Іст-Мідлендс?",
        qEn: "How is ML investment developing in the East Midlands?",
        a: "Іст-Мідлендс отримує значні інвестиції в ML завдяки кластеру передового машинобудування. Midlands Engine інвестиційний фонд підтримує AI-стартапи. Аерокосмічна та автомобільна промисловість залучають провідних ML-спеціалістів, а близькість до Нотінгему та Лестера розширює талант-пул.",
        aEn: "East Midlands is attracting significant ML investment through its advanced manufacturing cluster. The Midlands Engine investment fund supports AI startups. Aerospace and automotive sectors attract top ML talent, and proximity to Nottingham and Leicester broadens the talent pool for growing tech companies.",
      },
      {
        q: "Як Toyota застосовує ML у своєму ланцюгу постачання в Дербі?",
        qEn: "How does Toyota use ML in its Derby supply chain?",
        a: "Toyota Manufacturing UK у Дербі використовує ML для прогнозування попиту на компоненти, оптимізації логістики між постачальниками, виявлення аномалій у виробничих процесах за методологією Toyota Production System та предиктивного обслуговування роботизованих ліній.",
        aEn: "Toyota Manufacturing UK in Derby uses ML for component demand forecasting, supplier logistics optimisation, anomaly detection in production processes aligned with Toyota Production System methodology, and predictive maintenance of robotic assembly lines.",
      },
      {
        q: "Де знайти ML-таланти у Дербі?",
        qEn: "Where can you find ML talent in Derby?",
        a: "Університет Дербі готує ML-спеціалістів з акцентом на промислові застосування. Місцеві ML-спільноти та hackathon-заходи об'єднують фахівців аерокосмічного та автомобільного секторів. Дербі також привертає ML-спеціалістів з Бірмінгема та Нотінгему завдяки розвиненій транспортній інфраструктурі.",
        aEn: "The University of Derby trains ML specialists with an emphasis on industrial applications. Local ML meetups and hackathons connect professionals from aerospace and automotive sectors. Derby also attracts ML talent from Birmingham and Nottingham thanks to strong rail and road connections.",
      },
    ],
  },
  {
    slug: "portsmouth",
    nameUk: "Портсмут",
    nameEn: "Portsmouth",
    region: "Гемпшир, Південна Англія",
    regionEn: "Hampshire, South East England",
    population: "215 тис.",
    populationEn: "215,000",
    businesses: 13000,
    description:
      "Портсмут — провідний центр військово-морського оборонного AI та кібербезпеки Великобританії. BAE Systems і Міністерство оборони Великобританії формують потужний кластер оборонних технологій, а Університет Портсмута відомий дослідженнями у галузі AI та кібербезпеки. Морський фінтех та цифровий ігровий кластер додають різноманіття технологічній екосистемі. Команда Codeworth розробляє ML-рішення для оборонного сектору, кібербезпеки та морської аналітики.",
    descriptionEn:
      "Portsmouth is a leading UK hub for naval defence AI and cybersecurity. BAE Systems and the UK Ministry of Defence anchor a powerful defence technology cluster, while the University of Portsmouth is recognised for AI and cybersecurity research. Maritime fintech and a digital gaming cluster add diversity to the tech ecosystem. Codeworth builds ML solutions for Portsmouth's defence sector, cybersecurity firms, and maritime data analytics.",
    seoTitle: "ML-консалтинг у Портсмуті | Оборонний AI та кібербезпека | Codeworth",
    seoTitleEn: "Machine Learning Consultant Portsmouth | Defence AI & Cybersecurity ML | Codeworth",
    seoDesc:
      "ML-консалтинг у Портсмуті: оборонний AI, кібербезпека ML, морська аналітика. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Portsmouth: defence AI, cybersecurity ML, maritime data science. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "ML-компаній у регіоні", labelEn: "ML companies in the region", value: "210+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "1,390+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "47+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£45,000" },
      { label: "Реалізованих проєктів Codeworth", labelEn: "Codeworth projects delivered", value: "2" },
    ],
    faq: [
      {
        q: "Як AI застосовується в оборонному секторі Портсмута?",
        qEn: "How is AI used in Portsmouth's defence sector?",
        a: "BAE Systems та підрозділи Міністерства оборони у Портсмуті використовують AI для аналізу розвідувальних даних, предиктивного обслуговування бойових кораблів, виявлення кіберзагроз у військових мережах та автономних морських систем. Портсмут є одним із ключових центрів розробки оборонного AI в Великобританії.",
        aEn: "BAE Systems and MoD units in Portsmouth use AI for intelligence data analysis, predictive maintenance of warships, cyber threat detection in military networks, and autonomous maritime systems. Portsmouth is one of the UK's key centres for defence AI development and testing.",
      },
      {
        q: "Які ML-методи застосовуються в кібербезпеці Портсмута?",
        qEn: "What ML methods are used in Portsmouth cybersecurity?",
        a: "Кібербезпекові компанії Портсмута активно використовують ML для виявлення аномалій у мережевому трафіку, класифікації шкідливого програмного забезпечення, прогнозування кіберінцидентів та автоматизованого реагування на загрози. Університет Портсмута проводить дослідження adversarial ML та stealthy attack detection.",
        aEn: "Portsmouth cybersecurity companies use ML for network traffic anomaly detection, malware classification, cyber incident prediction, and automated threat response. The University of Portsmouth conducts research in adversarial ML and stealthy attack detection relevant to both defence and commercial cybersecurity.",
      },
      {
        q: "Які ML-курси пропонує Університет Портсмута?",
        qEn: "What ML courses does the University of Portsmouth offer?",
        a: "Університет Портсмута пропонує програми з AI та машинного навчання, кібербезпеки та цифрової криміналістики, науки про дані, а також спеціалізований курс AI для оборонних та морських застосувань. Партнерство з оборонною промисловістю забезпечує практичну орієнтацію програм.",
        aEn: "The University of Portsmouth offers programmes in AI and machine learning, cybersecurity and digital forensics, data science, and a specialist course in AI for defence and maritime applications. Industry partnerships with defence contractors ensure graduates have practical, employment-ready skills.",
      },
      {
        q: "Як розвивається морська наука про дані у Портсмуті?",
        qEn: "How is maritime data science developing in Portsmouth?",
        a: "Портсмут розвиває морську науку про дані через аналітику трафіку судноплавства, оптимізацію портових операцій за допомогою IoT-сенсорів, ML для прогнозування морського страхування та аналіз даних морського фінтеху. Близькість до Саутгемптона розширює можливості регіонального морського технологічного кластеру.",
        aEn: "Portsmouth is developing maritime data science through shipping traffic analytics, port operations optimisation with IoT sensors, ML for marine insurance forecasting, and maritime fintech data analysis. Proximity to Southampton extends the regional maritime tech cluster's capabilities.",
      },
      {
        q: "Чи є у Портсмуті технологічний коридор Південного узбережжя?",
        qEn: "Is Portsmouth part of a South coast tech corridor?",
        a: "Так. Портсмут входить до технологічного коридору Південного узбережжя разом з Саутгемптоном, Борнмутом та Брайтоном. Цей коридор спеціалізується на оборонних технологіях, морській промисловості та цифровому медіа. M27/A3(M) та залізничні сполучення полегшують переміщення спеціалістів між містами регіону.",
        aEn: "Yes. Portsmouth is part of the South coast tech corridor alongside Southampton, Bournemouth, and Brighton. This corridor specialises in defence technology, maritime industry, and digital media. M27/A3(M) and rail connections facilitate talent mobility between cities, creating a cohesive regional ML ecosystem.",
      },
    ],
  },
  {
    slug: "sunderland",
    nameUk: "Сандерленд",
    nameEn: "Sunderland",
    region: "Норт-Іст Англія",
    regionEn: "North East England",
    population: "275,000",
    populationEn: "275,000",
    businesses: 9800,
    description:
      "Сандерленд — хаб технологічного зростання Північно-Східної Англії, що поєднує передове виробництво Nissan UK, кластер офшорної вітроенергетики та цифрові ініціативи Software Centre Sunderland. Університет Сандерленда розвиває програми AI та data science, а державні програми Levelling Up залучають ML-інвестиції в регіон. Codeworth надає ML-консалтинг для сандерлендських компаній у сферах виробництва, відновлюваної енергетики та програмного забезпечення.",
    descriptionEn:
      "Sunderland is a North East England tech growth hub combining Nissan UK's advanced manufacturing, a burgeoning offshore wind energy ML cluster, and the Sunderland Software Centre digital initiative. The University of Sunderland drives AI and data science programmes while UK Levelling Up funding channels ML investment into the region. Codeworth provides ML consulting for Sunderland businesses across manufacturing, renewable energy, and software development.",
    seoTitle: "ML-консалтинг у Сандерленді | Машинне навчання для бізнесу | Codeworth",
    seoTitleEn: "Machine Learning Consultant Sunderland | ML Agency | Codeworth",
    seoDesc:
      "ML-консалтинг у Сандерленді: Nissan manufacturing AI, offshore wind ML, Levelling Up tech. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Sunderland: manufacturing AI, offshore wind ML, North East tech growth. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "ML-компаній у місті", labelEn: "ML companies in the city", value: "165+" },
      { label: "ML-спеціалістів", labelEn: "ML specialists", value: "980+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "38+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£41,000" },
      { label: "Реалізованих проєктів Codeworth", labelEn: "Codeworth projects delivered", value: "1" },
    ],
    faq: [
      {
        q: "Як завод Nissan у Сандерленді використовує ML у виробництві?",
        qEn: "How does the Nissan Sunderland plant use ML in manufacturing?",
        a: "Завод Nissan у Сандерленді є одним із найавтоматизованіших автомобільних виробництв у Великобританії та активно впроваджує ML для прогнозованого технічного обслуговування, контролю якості за допомогою комп'ютерного зору та оптимізації ланцюжка постачання. Codeworth допомагає підрядникам і постачальникам Nissan розробляти ML-рішення, сумісні з виробничою екосистемою Nissan.",
        aEn: "The Nissan Sunderland plant is one of the UK's most automated automotive facilities, actively deploying ML for predictive maintenance, computer-vision quality control, and supply chain optimisation. Codeworth helps Nissan contractors and suppliers build ML solutions compatible with Nissan's manufacturing ecosystem.",
      },
      {
        q: "Як розвивається технологічна сцена Північно-Східної Англії?",
        qEn: "How is the North East England tech scene developing?",
        a: "Технологічна сцена Північного Сходу стрімко зростає завдяки державним програмам Levelling Up, ініціативі North East Local Enterprise Partnership та інвестиціям у цифрову інфраструктуру. Сандерленд, Ньюкасл та Гейтсгед формують взаємопов'язаний технологічний кластер із доступним талантом і нижчими операційними витратами порівняно з Лондоном.",
        aEn: "The North East tech scene is growing rapidly through Levelling Up programmes, the North East Local Enterprise Partnership, and digital infrastructure investment. Sunderland, Newcastle, and Gateshead form an interconnected tech cluster offering accessible talent and lower operating costs compared to London.",
      },
      {
        q: "Які можливості ML існують у секторі офшорної вітроенергетики поблизу Сандерленда?",
        qEn: "What ML opportunities exist in offshore wind energy near Sunderland?",
        a: "Узбережжя Північно-Східної Англії є одним із найперспективніших районів офшорної вітроенергетики у Великобританії. ML застосовується для прогнозування відмов турбін, оптимізації виробітку енергії, планування технічного обслуговування та моделювання морського середовища. Codeworth розробляє ML-системи для енергетичних компаній і сервісних підрядників Норт-Іст.",
        aEn: "The North East coastline is one of the UK's prime offshore wind zones. ML is applied to turbine failure prediction, energy yield optimisation, maintenance scheduling, and marine environment modelling. Codeworth builds ML systems for North East energy companies and service contractors operating in this sector.",
      },
      {
        q: "Що таке Software Centre Sunderland і як він підтримує AI?",
        qEn: "What is Sunderland Software Centre and how does it support AI?",
        a: "Sunderland Software Centre — це ініціатива цифрового розвитку міста, що об'єднує технологічні компанії, стартапи та навчальні програми під одним дахом. Центр підтримує розробку AI-рішень, надаючи коворкінг-простір, доступ до університетських досліджень та мережеві заходи для ML-фахівців Норт-Іст.",
        aEn: "Sunderland Software Centre is a city digital development initiative that co-locates tech companies, startups, and training programmes. The centre supports AI development by providing co-working space, access to university research, and networking events for North East ML practitioners.",
      },
      {
        q: "Як програма Levelling Up впливає на ML-інвестиції у Сандерленді?",
        qEn: "How does the Levelling Up programme affect ML investment in Sunderland?",
        a: "Програма Levelling Up спрямовує значні кошти на цифрову інфраструктуру, перекваліфікацію кадрів та підтримку технологічних підприємств у Сандерленді та ширшому регіоні Норт-Іст. Це знижує бар'єри для впровадження ML для місцевого бізнесу та залучає нових технологічних інвесторів. Codeworth використовує ці можливості для надання ML-рішень, що кваліфікуються під грантове фінансування.",
        aEn: "The Levelling Up programme directs significant funding to digital infrastructure, workforce reskilling, and tech business support in Sunderland and the broader North East. This lowers ML adoption barriers for local businesses and attracts new tech investors. Codeworth helps clients structure ML projects that qualify for Innovate UK and regional grant funding.",
      },
    ],
  },
  {
    slug: "belfast",
    nameUk: "Белфаст",
    nameEn: "Belfast",
    region: "Північна Ірландія",
    regionEn: "Northern Ireland",
    population: "340 тис.",
    populationEn: "340,000",
    businesses: 28000,
    description:
      "Белфаст — провідний центр фінансових технологій та аутсорсингу Великобританії, де розташовані великі операційні хаби Citi, Allstate, PwC та Deloitte. Університет Квінз Белфаст веде активні дослідження у сферах кібербезпеки та ML. Місто стало стратегічним майданчиком для глобальних фінансових компаній, що впроваджують ML для автоматизації фінансових операцій, управління ризиками та виявлення шахрайства. Codeworth надає ML-консалтинг для белфастських фінансових та технологічних компаній.",
    descriptionEn:
      "Belfast is a major UK hub for financial services back-office operations and tech outsourcing, home to large operational centres for Citi (1,600+ staff), Allstate (Northern Ireland's largest private employer), PwC, and Deloitte. Queen's University Belfast drives cybersecurity and ML research through its Institute of Electronics, Communications and Information Technology. The city's concentration of financial operations creates strong demand for ML-powered fraud detection, financial operations automation, and regulatory compliance AI. Codeworth builds production ML for Belfast financial services and tech firms.",
    seoTitle: "ML-консалтинг у Белфасті | Машинне навчання для фінансів | Codeworth",
    seoTitleEn: "Machine Learning Consultant Belfast | ML Agency Northern Ireland | Codeworth",
    seoDesc:
      "Машинне навчання у Белфасті: fraud detection, фінансовий ML, кібербезпека, NLP-автоматизація. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Belfast: fraud detection, financial operations ML, cybersecurity AI. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "Фінансових компаній", labelEn: "Financial services firms", value: "1,200+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "3,800+" },
      { label: "Tech-компаній", labelEn: "Tech companies", value: "1,500+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£52k" },
      { label: "Зростання фінтех-сектору (2р)", labelEn: "Fintech sector growth (2yr)", value: "+38%" },
    ],
    faq: [
      {
        q: "Які ML-рішення найбільш затребувані у Белфасті?",
        qEn: "Which ML solutions are most in demand in Belfast?",
        a: "Для белфастських фінансових компаній (Citi, Allstate, страхові): fraud detection, credit risk scoring, NLP для автоматизації claims та compliance. Для tech-аутсорсингу: NLP пайплайни, MLOps-інфраструктура. Для кібербезпеки: anomaly detection та threat intelligence ML.",
        aEn: "For Belfast financial firms (Citi, Allstate, insurance): fraud detection, credit risk scoring, NLP for claims and compliance automation. For tech outsourcing: NLP pipelines and MLOps infrastructure. For cybersecurity: anomaly detection and threat intelligence ML.",
      },
      {
        q: "Скільки коштує ML-консалтинг у Белфасті?",
        qEn: "How much does ML consulting cost in Belfast?",
        a: "Белфаст пропонує одні з найнижчих ставок ML-консалтингу у Великобританії — на 25–35% нижче лондонського рівня. Наші фіксовані пакети стартують від £4,000 для PoC до £22,000 для production ML-системи з MLOps.",
        aEn: "Belfast offers some of the lowest ML consulting rates in the UK — 25–35% below London equivalents. Our fixed-price packages start from £4,000 for a PoC up to £22,000 for a production ML system with MLOps monitoring.",
      },
      {
        q: "Чи маєте ви досвід роботи з фінансовими операціями глобальних банків?",
        qEn: "Do you have experience with global bank financial operations ML?",
        a: "Так. Ми будуємо ML-рішення для фінансових операцій: fraud detection моделі з SHAP-поясненнями для FCA compliance, credit scoring з Model Risk Management документацією, NLP для автоматизації document processing та compliance звітності.",
        aEn: "Yes. We build ML for financial operations: fraud detection models with SHAP explainability for FCA compliance, credit scoring with Model Risk Management documentation, and NLP for document processing and compliance reporting automation.",
      },
      {
        q: "Чи підтримуєте ви кібербезпекові ML-рішення для белфастських компаній?",
        qEn: "Do you support cybersecurity ML for Belfast companies?",
        a: "Так. Белфаст має активний кластер кібербезпеки завдяки Queen's University Belfast та LORCA NI. Ми розробляємо anomaly detection системи, ML-моделі для threat intelligence та NLP-рішення для аналізу security-логів. Стек: isolation forests, autoencoders, BERT для log analysis.",
        aEn: "Yes. Belfast has an active cybersecurity cluster anchored by Queen's University Belfast and LORCA NI. We build anomaly detection systems, ML threat intelligence models, and NLP solutions for security log analysis. Stack: isolation forests, autoencoders, BERT for log analysis.",
      },
      {
        q: "Яка роль Queen's University Belfast в AI-екосистемі міста?",
        qEn: "What is Queen's University Belfast's role in the city's AI ecosystem?",
        a: "Queen's University Belfast (QUB) веде дослідження ML та кібербезпеки через Institute of Electronics, Communications and Information Technology (ECIT). QUB є партнером Alan Turing Institute та публікує роботи з NLP, federated learning та medical ML. Codeworth відстежує академічні публікації QUB та впроваджує нові методи у production-рішення для белфастських клієнтів.",
        aEn: "Queen's University Belfast (QUB) leads ML and cybersecurity research through its Institute of Electronics, Communications and Information Technology (ECIT), an Alan Turing Institute partner. QUB publishes research in NLP, federated learning, and medical ML. Codeworth tracks QUB academic output and incorporates recent methods into production solutions for Belfast clients.",
      },
    ],
  },
  {
    slug: "aberdeen",
    nameUk: "Абердин",
    nameEn: "Aberdeen",
    region: "Абердиншир, Шотландія",
    regionEn: "Aberdeenshire, Scotland",
    population: "230 тис.",
    populationEn: "230,000",
    businesses: 14500,
    description:
      "Абердин — енергетична столиця Великобританії, центр нафтогазового сектору Північного моря та швидко зростаючого напрямку energy-tech. Компанії на кшталт BP, Shell, TAQA та десятки сервісних операторів впроваджують ML для прогнозного обслуговування бурового обладнання, оптимізації видобутку та переходу на відновлювану енергетику (офшорний вітер). Университет Абердина та Robert Gordon University готують інженерів даних для енергосектору. Codeworth будує ML-рішення для predictive maintenance, оптимізації енерговидобутку та ESG-звітності для абердинських енергокомпаній — тісно повʼязано з нашим напрямком /ml/energy.",
    descriptionEn:
      "Aberdeen is the UK's energy capital, hub of the North Sea oil and gas industry and a fast-growing energy-tech sector. Companies including BP, Shell, TAQA, and dozens of oilfield service operators use ML for predictive maintenance of drilling equipment, production optimisation, and the transition to offshore wind. The University of Aberdeen and Robert Gordon University train data engineers for the energy sector. Codeworth builds ML for predictive maintenance, production optimisation, and ESG reporting for Aberdeen energy companies — closely aligned with our /ml/energy practice.",
    seoTitle: "ML-консалтинг у Абердині | Машинне навчання для енергетики | Codeworth",
    seoTitleEn: "Machine Learning Consultant Aberdeen | Energy ML Agency | Codeworth",
    seoDesc:
      "ML-консалтинг у Абердині: predictive maintenance, оптимізація видобутку, offshore wind ML. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Aberdeen: predictive maintenance, production optimisation, offshore wind ML. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "Енергетичних компаній", labelEn: "Energy companies", value: "850+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "2,900+" },
      { label: "AI-стартапів (energy-tech)", labelEn: "AI startups (energy-tech)", value: "120+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£58k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "6+" },
    ],
    faq: [
      {
        q: "Які ML-рішення найбільш затребувані у Абердині?",
        qEn: "Which ML solutions are most in demand in Aberdeen?",
        a: "Для нафтогазових операторів: predictive maintenance бурового та насосного обладнання, аномалія-детекція для запобігання аваріям, оптимізація видобутку. Для офшорного вітру: прогноз виробітку та планування техобслуговування турбін.",
        aEn: "For oil and gas operators: predictive maintenance for drilling and pump equipment, anomaly detection to prevent failures, and production optimisation. For offshore wind: yield forecasting and turbine maintenance scheduling.",
      },
      {
        q: "Чи маєте ви досвід з energy-даними (SCADA, сенсори)?",
        qEn: "Do you have experience with energy sector data (SCADA, sensors)?",
        a: "Так. Ми працюємо з часовими рядами SCADA-систем, вібро- та термосенсорами обладнання, будуємо LSTM/gradient boosting моделі для прогнозу відмов за 2-4 тижні до події. Це знижує незаплановані простої на 30-40%.",
        aEn: "Yes. We work with SCADA time-series data and vibration/thermal sensor feeds, building LSTM and gradient-boosting models that predict failures 2-4 weeks in advance — cutting unplanned downtime by 30-40%.",
      },
      {
        q: "Скільки коштує ML-проєкт для енергокомпанії в Абердині?",
        qEn: "How much does an ML project cost for an Aberdeen energy company?",
        a: "PoC на історичних даних обладнання — від £5,000-£9,000 (4-6 тижнів). Production predictive maintenance система з дашбордом і алертами — від £18,000-£45,000 залежно від кількості одиниць обладнання.",
        aEn: "A PoC on historical equipment data starts from £5,000-£9,000 (4-6 weeks). A production predictive maintenance system with dashboards and alerting runs £18,000-£45,000 depending on equipment fleet size.",
      },
      {
        q: "Чи підтримуєте ви ML для переходу на відновлювану енергетику?",
        qEn: "Do you support ML for the renewable energy transition?",
        a: "Так. Ми будуємо моделі прогнозу виробітку офшорних вітропарків (weather-driven forecasting), оптимізації балансування мережі та ESG-звітності для абердинських компаній, що диверсифікуються від нафтогазу до відновлюваної енергетики.",
        aEn: "Yes. We build weather-driven yield forecasting models for offshore wind farms, grid-balancing optimisation, and ESG reporting ML for Aberdeen companies diversifying from oil and gas into renewables.",
      },
    ],
  },
  {
    slug: "dundee",
    nameUk: "Данді",
    nameEn: "Dundee",
    region: "Данді Сіті, Шотландія",
    regionEn: "Dundee City, Scotland",
    population: "150 тис.",
    populationEn: "150,000",
    businesses: 8200,
    description:
      "Данді — визнаний UNESCO City of Design та центр ігрової індустрії Великобританії: тут народилися Lemmings, Grand Theft Auto та Minecraft (студія 4J Studios). Abertay University має найстарішу в Європі програму розробки відеоігор, що живить локальний кластер game-tech і цифрових медіа. Data-driven геймдизайн, player behaviour analytics та ML для процедурної генерації контенту — швидко зростаючі напрямки. Codeworth розробляє ML для аналітики гравців, рекомендаційних систем та anti-cheat детекції для данді-студій.",
    descriptionEn:
      "Dundee is a UNESCO City of Design and the birthplace of UK gaming, home to studios behind Lemmings, Grand Theft Auto, and Minecraft (4J Studios). Abertay University runs Europe's oldest games development degree, feeding a thriving game-tech and digital media cluster. Data-driven game design, player behaviour analytics, and ML for procedural content generation are fast-growing niches. Codeworth builds ML for player analytics, recommendation engines, and anti-cheat detection for Dundee studios.",
    seoTitle: "ML-консалтинг у Данді | Машинне навчання для геймдев | Codeworth",
    seoTitleEn: "Machine Learning Consultant Dundee | Games & Digital Media ML | Codeworth",
    seoDesc:
      "ML-консалтинг у Данді: player analytics, anti-cheat ML, процедурна генерація. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Dundee: player analytics, anti-cheat ML, procedural content generation. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "Ігрових та tech-студій", labelEn: "Games & tech studios", value: "180+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "1,400+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "60+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£48k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "4+" },
    ],
    faq: [
      {
        q: "Які ML-рішення актуальні для ігрової індустрії Данді?",
        qEn: "Which ML solutions are relevant to Dundee's games industry?",
        a: "Player behaviour analytics для утримання гравців, рекомендаційні системи внутрішньоігрового контенту, anti-cheat детекція на основі аномалій, та процедурна генерація рівнів за допомогою ML.",
        aEn: "Player behaviour analytics for retention, in-game content recommendation engines, anomaly-based anti-cheat detection, and ML-driven procedural level generation.",
      },
      {
        q: "Чи працюєте ви зі студіями розміру інді або середнього масштабу?",
        qEn: "Do you work with indie or mid-sized studios?",
        a: "Так. Більшість наших ігрових клієнтів — студії 10-80 людей. Ми пропонуємо PoC-пакети від £4,500, що дозволяють протестувати гіпотезу (наприклад, churn-модель) на реальних даних гравців перед повним впровадженням.",
        aEn: "Yes. Most of our games clients are 10-80 person studios. We offer PoC packages from £4,500 to test a hypothesis — like a churn model — on real player data before full deployment.",
      },
      {
        q: "Скільки коштує player analytics система?",
        qEn: "How much does a player analytics system cost?",
        a: "Базова система churn prediction і сегментації гравців — від £6,000-£12,000. Повна аналітична платформа з рекомендаціями контенту та A/B-тестуванням — від £20,000-£40,000.",
        aEn: "A basic churn prediction and player segmentation system starts from £6,000-£12,000. A full analytics platform with content recommendations and A/B testing runs £20,000-£40,000.",
      },
      {
        q: "Яка роль Abertay University в AI-екосистемі Данді?",
        qEn: "What role does Abertay University play in Dundee's AI ecosystem?",
        a: "Abertay University готує розробників ігор та data scientists через програми Game Design and Production та Ethical Hacking, а її дослідницький центр GAME Lab активно вивчає ML у геймдизайні. Ми співпрацюємо з випускниками Abertay для доменної експертизи.",
        aEn: "Abertay University trains game developers and data scientists through its Game Design and Production and Ethical Hacking programmes, and its GAME Lab research centre actively studies ML in game design. We collaborate with Abertay graduates for domain expertise.",
      },
    ],
  },
  {
    slug: "york",
    nameUk: "Йорк",
    nameEn: "York",
    region: "Норт-Йоркшир",
    regionEn: "North Yorkshire",
    population: "155 тис.",
    populationEn: "155,000",
    businesses: 9500,
    description:
      "Йорк поєднує статус провідного туристичного та історичного центру Великобританії з міцним фінтех і страховим бек-офісним сектором — тут розташовані офіси Aviva, Hiscox та низка страхових операторів. University of York — визнаний центр досліджень штучного інтелекту. Готельний і туристичний бізнес міста активно впроваджує ML для динамічного ціноутворення та прогнозу попиту, а страхові компанії — для underwriting та claims-автоматизації. Codeworth будує ML для страхового underwriting, прогнозування туристичного попиту та NLP-автоматизації документообігу.",
    descriptionEn:
      "York combines its status as a leading UK heritage and tourism destination with a solid insurance and fintech back-office sector — home to Aviva and Hiscox operations among others. The University of York is a recognised AI research centre. The city's hospitality and tourism businesses increasingly use ML for dynamic pricing and demand forecasting, while insurers apply it to underwriting and claims automation. Codeworth builds ML for insurance underwriting, tourism demand forecasting, and NLP document automation.",
    seoTitle: "ML-консалтинг у Йорку | Машинне навчання для страхування та туризму | Codeworth",
    seoTitleEn: "Machine Learning Consultant York | Insurance & Tourism ML | Codeworth",
    seoDesc:
      "ML-консалтинг у Йорку: страховий underwriting ML, прогноз туристичного попиту, NLP-автоматизація. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant York: insurance underwriting ML, tourism demand forecasting, NLP document automation. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "Страхових та фінансових компаній", labelEn: "Insurance & financial firms", value: "310+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "1,650+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "70+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£51k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "5+" },
    ],
    faq: [
      {
        q: "Які ML-рішення актуальні для страхового сектору Йорка?",
        qEn: "Which ML solutions are relevant to York's insurance sector?",
        a: "Автоматизований underwriting з credit та risk-scoring моделями, NLP для обробки claims-документів, fraud detection для страхових виплат та прогноз збитковості портфеля.",
        aEn: "Automated underwriting with credit and risk-scoring models, NLP for claims document processing, fraud detection for insurance payouts, and portfolio loss-ratio forecasting.",
      },
      {
        q: "Чи можете ви будувати ML для прогнозу туристичного попиту?",
        qEn: "Can you build ML for tourism demand forecasting?",
        a: "Так. Для готелів та атракцій Йорка ми будуємо моделі прогнозу завантаженості (сезонність, події, погода) та dynamic pricing, що підвищують дохід на номер (RevPAR) на 8-15%.",
        aEn: "Yes. For York hotels and attractions we build occupancy forecasting models (seasonality, events, weather) and dynamic pricing engines that lift revenue per available room (RevPAR) by 8-15%.",
      },
      {
        q: "Скільки коштує ML-проєкт для страхової компанії в Йорку?",
        qEn: "How much does an ML project cost for a York insurance company?",
        a: "PoC для underwriting-моделі — від £5,000-£9,000. Production-система з SHAP-поясненнями та інтеграцією в policy admin систему — від £20,000-£45,000.",
        aEn: "A PoC for an underwriting model starts from £5,000-£9,000. A production system with SHAP explainability and policy admin integration runs £20,000-£45,000.",
      },
      {
        q: "Чи відповідають ваші моделі вимогам FCA для страхового underwriting?",
        qEn: "Do your models meet FCA requirements for insurance underwriting?",
        a: "Так. Ми документуємо моделі відповідно до FCA Consumer Duty та надаємо пояснення рішень (SHAP), необхідні для аудиту underwriting-процесів страховиками на кшталт Aviva та Hiscox.",
        aEn: "Yes. We document models to FCA Consumer Duty standards and provide SHAP-based decision explanations required for underwriting audits by insurers like Aviva and Hiscox.",
      },
    ],
  },
  {
    slug: "milton-keynes",
    nameUk: "Мілтон-Кінз",
    nameEn: "Milton Keynes",
    region: "Бакінгемшир",
    regionEn: "Buckinghamshire",
    population: "230 тис.",
    populationEn: "230,000",
    businesses: 13800,
    description:
      "Мілтон-Кінз — один з найбільших логістичних хабів Великобританії: тут розташовані фулфілмент-центри Amazon, розподільчі центри Argos, Santander UK головний офіс, а також швидко зростаюча спільнота tech scale-ups. Розташування на перетині M1 та залізниць Лондон-Бірмінгем робить місто ключовим вузлом last-mile доставки. Codeworth будує ML для оптимізації маршрутизації доставки, прогнозу попиту складів та route optimization — тісно повʼязано з нашим напрямком /ml/logistics.",
    descriptionEn:
      "Milton Keynes is one of the UK's largest logistics hubs — home to Amazon fulfilment centres, Argos distribution operations, Santander UK's head office, and a fast-growing tech scale-up community. Sitting at the junction of the M1 and the London-Birmingham rail corridor makes it a key last-mile delivery node. Codeworth builds ML for delivery route optimisation, warehouse demand forecasting, and last-mile route planning — closely aligned with our /ml/logistics practice.",
    seoTitle: "ML-консалтинг у Мілтон-Кінзі | Машинне навчання для логістики | Codeworth",
    seoTitleEn: "Machine Learning Consultant Milton Keynes | Logistics ML Agency | Codeworth",
    seoDesc:
      "ML-консалтинг у Мілтон-Кінзі: route optimization, прогноз попиту складів, last-mile ML. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Milton Keynes: route optimisation, warehouse demand forecasting, last-mile ML. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "Логістичних та tech-компаній", labelEn: "Logistics & tech companies", value: "1,900+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "2,300+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "95+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£56k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "5+" },
    ],
    faq: [
      {
        q: "Які ML-рішення найбільш затребувані у Мілтон-Кінзі?",
        qEn: "Which ML solutions are most in demand in Milton Keynes?",
        a: "Route optimization для last-mile доставки, прогноз попиту складів для оптимізації запасів, computer vision для контролю якості на розподільчих лініях, та ML для планування workforce у фулфілмент-центрах.",
        aEn: "Route optimisation for last-mile delivery, warehouse demand forecasting for inventory optimisation, computer vision for quality control on distribution lines, and workforce planning ML for fulfilment centres.",
      },
      {
        q: "Чи маєте ви досвід з логістичними ML-задачами масштабу Amazon-фулфілмент?",
        qEn: "Do you have experience with Amazon-fulfilment-scale logistics ML?",
        a: "Так. Ми будуємо системи прогнозу попиту (XGBoost + Prophet), оптимізації маршрутів (vehicle routing problem solvers) та inventory optimisation для складів і розподільчих мереж, що знижують витрати доставки на 15-25%.",
        aEn: "Yes. We build demand forecasting systems (XGBoost + Prophet), route optimisation (vehicle routing problem solvers), and inventory optimisation for warehouses and distribution networks, cutting delivery costs by 15-25%.",
      },
      {
        q: "Скільки коштує route optimization система?",
        qEn: "How much does a route optimisation system cost?",
        a: "PoC на історичних маршрутах — від £5,500-£10,000. Production-система з real-time API інтеграцією та dispatch-дашбордом — від £22,000-£50,000 залежно від масштабу флоту.",
        aEn: "A PoC on historical route data starts from £5,500-£10,000. A production system with real-time API integration and a dispatch dashboard runs £22,000-£50,000 depending on fleet size.",
      },
      {
        q: "Чи працюєте ви з tech scale-ups у Мілтон-Кінзі?",
        qEn: "Do you work with Milton Keynes tech scale-ups?",
        a: "Так. Ми пропонуємо гнучкі PoC-пакети для scale-ups, що дозволяють протестувати ML-гіпотезу за 2-3 тижні перед залученням внутрішньої data-команди чи розширенням фінансування.",
        aEn: "Yes. We offer flexible PoC packages for scale-ups, letting teams test an ML hypothesis in 2-3 weeks before hiring an internal data team or raising further funding.",
      },
    ],
  },
  {
    slug: "norwich",
    nameUk: "Норідж",
    nameEn: "Norwich",
    region: "Норфолк, Східна Англія",
    regionEn: "Norfolk, East of England",
    population: "145 тис.",
    populationEn: "145,000",
    businesses: 8600,
    description:
      "Норідж — історичний центр страхового сектору Великобританії, штаб-квартира Aviva, та зростаючий кластер agritech завдяки University of East Anglia (UEA) і сусідньому Norwich Research Park — одному з найбільших біологічних та агрокластерів Європи. Страхові компанії впроваджують ML для underwriting і claims-автоматизації, а agritech-стартапи — для прогнозу врожайності та точного землеробства. Codeworth будує ML для страхового ризик-скорингу та agritech-аналітики для норіджських компаній.",
    descriptionEn:
      "Norwich is the historic home of UK insurance, headquarters of Aviva, and a growing agritech cluster thanks to the University of East Anglia (UEA) and the neighbouring Norwich Research Park — one of Europe's largest bioscience and agricultural research clusters. Insurers apply ML to underwriting and claims automation, while agritech startups use it for yield forecasting and precision farming. Codeworth builds ML for insurance risk scoring and agritech analytics for Norwich businesses.",
    seoTitle: "ML-консалтинг у Норіджі | Машинне навчання для страхування та agritech | Codeworth",
    seoTitleEn: "Machine Learning Consultant Norwich | Insurance & Agritech ML | Codeworth",
    seoDesc:
      "ML-консалтинг у Норіджі: страховий risk-scoring, agritech прогноз врожайності, NLP claims. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Norwich: insurance risk scoring, agritech yield forecasting, NLP claims automation. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "Страхових та agritech-компаній", labelEn: "Insurance & agritech companies", value: "420+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "1,300+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "65+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£49k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "4+" },
    ],
    faq: [
      {
        q: "Які ML-рішення найбільш затребувані у Норіджі?",
        qEn: "Which ML solutions are most in demand in Norwich?",
        a: "Для страхового сектору (Aviva та інші): underwriting risk-scoring, NLP для claims-документів, fraud detection. Для agritech (Norwich Research Park): прогноз врожайності, computer vision для моніторингу культур, точне землеробство.",
        aEn: "For insurance (Aviva and others): underwriting risk scoring, NLP for claims documents, fraud detection. For agritech (Norwich Research Park): yield forecasting, computer vision for crop monitoring, precision farming.",
      },
      {
        q: "Чи маєте ви досвід з agritech ML для прогнозу врожайності?",
        qEn: "Do you have experience with agritech yield-forecasting ML?",
        a: "Так. Ми будуємо моделі прогнозу врожайності на основі супутникових знімків, погодних даних та даних сенсорів ґрунту (gradient boosting + time-series), а також computer vision для раннього виявлення хвороб рослин.",
        aEn: "Yes. We build yield forecasting models using satellite imagery, weather data, and soil sensor feeds (gradient boosting + time-series), plus computer vision for early crop disease detection.",
      },
      {
        q: "Скільки коштує ML-проєкт для страхової чи agritech-компанії?",
        qEn: "How much does an ML project cost for an insurance or agritech company?",
        a: "PoC — від £5,000-£9,000 (4-6 тижнів). Production-система (underwriting модель або yield-прогноз з дашбордом) — від £18,000-£42,000.",
        aEn: "A PoC starts from £5,000-£9,000 (4-6 weeks). A production system (underwriting model or yield forecast with dashboard) runs £18,000-£42,000.",
      },
      {
        q: "Чи співпрацюєте ви з UEA чи Norwich Research Park?",
        qEn: "Do you collaborate with UEA or Norwich Research Park?",
        a: "Ми не є формальним партнером UEA, але відстежуємо публікації Norwich Research Park з агрономії та біоінформатики й адаптуємо релевантні методи (наприклад, hyperspectral imaging аналіз) у production ML для наших клієнтів.",
        aEn: "We're not a formal UEA partner, but we track Norwich Research Park publications in agronomy and bioinformatics and adapt relevant methods — such as hyperspectral imaging analysis — into production ML for our clients.",
      },
    ],
  },
  {
    slug: "swansea",
    nameUk: "Свонсі",
    nameEn: "Swansea",
    region: "Уельс",
    regionEn: "Wales",
    population: "246 тис.",
    populationEn: "246,000",
    businesses: 13200,
    description:
      "Свонсі — другий за величиною економічний центр Уельсу з активним фінтех-сектором (Admiral Group, Principality Building Society) та зростаючим напрямком відновлюваної енергетики через проєкт Swansea Bay Tidal Lagoon і University of Swansea. Місто отримало статус UK City of Sanctuary та розвиває сильну дослідницьку базу з ML і матеріалознавства (SPECIFIC Innovation and Knowledge Centre). Codeworth будує ML для страхового ризик-скорингу, оптимізації відновлюваної енергетики та NLP-автоматизації для свонсійського бізнесу.",
    descriptionEn:
      "Swansea is Wales's second-largest economic centre with an active fintech sector (Admiral Group, Principality Building Society) and a growing renewable energy focus through the Swansea Bay Tidal Lagoon project and Swansea University. The city has a strong ML and materials-science research base via the SPECIFIC Innovation and Knowledge Centre. Codeworth builds ML for insurance risk scoring, renewable energy optimisation, and NLP automation for Swansea businesses.",
    seoTitle: "ML-консалтинг у Свонсі | Машинне навчання для фінтеху та енергетики | Codeworth",
    seoTitleEn: "Machine Learning Consultant Swansea | Fintech & Renewable Energy ML | Codeworth",
    seoDesc:
      "ML-консалтинг у Свонсі: страховий risk-scoring (Admiral), tidal energy ML, NLP-автоматизація. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Swansea: insurance risk scoring (Admiral), tidal energy ML, NLP automation. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "Фінансових та енергокомпаній", labelEn: "Financial & energy companies", value: "640+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "1,750+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "80+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£47k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "4+" },
    ],
    faq: [
      {
        q: "Які ML-рішення затребувані у Свонсі?",
        qEn: "Which ML solutions are in demand in Swansea?",
        a: "Для страхового сектору (Admiral, Principality): fraud detection, credit risk scoring, telematics-based pricing. Для відновлюваної енергетики: прогноз виробітку припливної енергії, оптимізація мережі.",
        aEn: "For insurance (Admiral, Principality): fraud detection, credit risk scoring, telematics-based pricing. For renewable energy: tidal energy yield forecasting and grid optimisation.",
      },
      {
        q: "Чи будуєте ви ML для telematics-страхування (як у Admiral)?",
        qEn: "Do you build ML for telematics insurance (like Admiral)?",
        a: "Так. Ми розробляємо моделі pricing на основі telematics-даних (стиль водіння, час доби, локація), що дозволяють точніше оцінювати ризик і пропонувати персоналізовані тарифи — типова задача для страховиків масштабу Admiral.",
        aEn: "Yes. We build telematics-based pricing models using driving behaviour, time-of-day, and location data, enabling more accurate risk assessment and personalised premiums — a common need for insurers at Admiral's scale.",
      },
      {
        q: "Скільки коштує ML-консалтинг у Свонсі?",
        qEn: "How much does ML consulting cost in Swansea?",
        a: "Ставки у Свонсі на 30-40% нижчі за лондонські. PoC — від £4,500-£8,500, production-система — від £16,000-£38,000.",
        aEn: "Swansea rates run 30-40% below London. A PoC starts from £4,500-£8,500, a production system from £16,000-£38,000.",
      },
      {
        q: "Чи маєте ви досвід з tidal energy прогнозуванням?",
        qEn: "Do you have experience with tidal energy forecasting?",
        a: "Ми будуємо time-series моделі прогнозу виробітку для відновлюваних джерел на основі приливних таблиць, погодних даних та історичного виробітку — методологія, застосовна до проєктів на кшталт Swansea Bay Tidal Lagoon.",
        aEn: "We build time-series yield forecasting models for renewable sources using tidal tables, weather data, and historical generation — a methodology applicable to projects like the Swansea Bay Tidal Lagoon.",
      },
    ],
  },
  {
    slug: "bath",
    nameUk: "Бат",
    nameEn: "Bath",
    region: "Сомерсет, Південно-Західна Англія",
    regionEn: "Somerset, South West England",
    population: "94 тис.",
    populationEn: "94,000",
    businesses: 6100,
    description:
      "Бат — місто зі статусом Світової спадщини ЮНЕСКО з високою концентрацією професійних послуг, консалтингу та швидко зростаючого кластеру SaaS scale-ups. University of Bath входить до топ-10 британських університетів з дослідженнями в галузі комп'ютерних наук. Малий і середній бізнес міста активно шукає ML для автоматизації консалтингових процесів, аналітики клієнтів та SaaS-продуктової аналітики. Codeworth будує ML-рішення для professional services та tech scale-ups Бата за конкурентними цінами поза лондонським ринком.",
    descriptionEn:
      "Bath, a UNESCO World Heritage city, has a high concentration of professional services, consultancies, and a fast-growing SaaS scale-up cluster. The University of Bath ranks among the UK's top 10 for computer science research. The city's SMEs increasingly seek ML for consulting process automation, customer analytics, and SaaS product analytics. Codeworth builds ML for Bath's professional services firms and tech scale-ups at rates well below the London market.",
    seoTitle: "ML-консалтинг у Баті | Машинне навчання для SaaS та консалтингу | Codeworth",
    seoTitleEn: "Machine Learning Consultant Bath | SaaS & Professional Services ML | Codeworth",
    seoDesc:
      "ML-консалтинг у Баті: SaaS product analytics, автоматизація консалтингу, churn prediction. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Bath: SaaS product analytics, consulting process automation, churn prediction. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "Professional services та SaaS-компаній", labelEn: "Professional services & SaaS companies", value: "480+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "1,050+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "55+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£54k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "4+" },
    ],
    faq: [
      {
        q: "Які ML-рішення затребувані у SaaS-компаній Бата?",
        qEn: "Which ML solutions do Bath SaaS companies need?",
        a: "Product analytics та churn prediction, автоматизація onboarding через NLP, рекомендаційні системи для фіч-адопції, та predictive scoring лідів для sales-команд.",
        aEn: "Product analytics and churn prediction, NLP-driven onboarding automation, feature-adoption recommendation engines, and predictive lead scoring for sales teams.",
      },
      {
        q: "Чи можете ви автоматизувати консалтингові процеси за допомогою ML?",
        qEn: "Can you automate consulting processes with ML?",
        a: "Так. Для консалтингових фірм ми будуємо NLP-системи для аналізу контрактів і звітів, автоматизацію research-завдань та predictive моделі для оцінки ризиків проєктів.",
        aEn: "Yes. For consultancies we build NLP systems for contract and report analysis, research task automation, and predictive models for project risk assessment.",
      },
      {
        q: "Скільки коштує ML для SaaS-стартапу в Баті?",
        qEn: "How much does ML cost for a Bath SaaS startup?",
        a: "PoC churn-моделі на ваших продуктових даних — від £4,500-£8,000. Production product analytics платформа — від £15,000-£35,000.",
        aEn: "A PoC churn model on your product data starts from £4,500-£8,000. A production product analytics platform runs £15,000-£35,000.",
      },
      {
        q: "Чи маєте ви досвід роботи з ранньостадійними scale-ups?",
        qEn: "Do you have experience with early-stage scale-ups?",
        a: "Так. Ми часто працюємо з Bath tech scale-ups на pre-Series A/B стадії, пропонуючи гнучкі помісячні engagement-моделі замість великих фіксованих контрактів.",
        aEn: "Yes. We regularly work with Bath tech scale-ups at pre-Series A/B stage, offering flexible month-to-month engagement models instead of large fixed contracts.",
      },
    ],
  },
  {
    slug: "exeter",
    nameUk: "Ексетер",
    nameEn: "Exeter",
    region: "Девон, Південно-Західна Англія",
    regionEn: "Devon, South West England",
    population: "130 тис.",
    populationEn: "130,000",
    businesses: 7400,
    description:
      "Ексетер поєднує сильний agritech-сектор, страхових операторів та світового рівня кліматичну науку через Met Office, штаб-квартира якого розташована саме тут. University of Exeter — один із провідних центрів дослідження кліматичних даних і environmental ML у Європі. Місцевий бізнес впроваджує ML для прогнозу погодних ризиків, страхового underwriting та точного землеробства. Codeworth будує ML-рішення для кліматичної аналітики, agritech та страхового ризик-скорингу для ексетерських компаній.",
    descriptionEn:
      "Exeter combines a strong agritech sector, insurance operators, and world-class climate science through the Met Office, headquartered in the city. The University of Exeter is a leading centre for climate data research and environmental ML in Europe. Local businesses use ML for weather-risk forecasting, insurance underwriting, and precision farming. Codeworth builds ML for climate analytics, agritech, and insurance risk scoring for Exeter companies.",
    seoTitle: "ML-консалтинг у Ексетері | Машинне навчання для клімату та agritech | Codeworth",
    seoTitleEn: "Machine Learning Consultant Exeter | Climate & Agritech ML | Codeworth",
    seoDesc:
      "ML-консалтинг у Ексетері: кліматична аналітика, agritech, страховий risk-scoring. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Exeter: climate risk analytics, agritech, insurance risk scoring. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "Agritech та страхових компаній", labelEn: "Agritech & insurance companies", value: "390+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "1,150+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "50+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£50k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "4+" },
    ],
    faq: [
      {
        q: "Які ML-рішення затребувані у Ексетері?",
        qEn: "Which ML solutions are in demand in Exeter?",
        a: "Прогноз погодних ризиків для страхового underwriting, кліматичне моделювання для agritech, computer vision для моніторингу врожаю та точного землеробства.",
        aEn: "Weather-risk forecasting for insurance underwriting, climate modelling for agritech, and computer vision for crop monitoring and precision farming.",
      },
      {
        q: "Чи маєте ви досвід з кліматичними даними (як у Met Office)?",
        qEn: "Do you have experience with climate data (Met Office-style)?",
        a: "Ми не працюємо безпосередньо з Met Office, але маємо досвід побудови моделей на основі відкритих метеорологічних та кліматичних датасетів для прогнозування погодних ризиків у страхуванні та сільському господарстві.",
        aEn: "We don't work directly with the Met Office, but we have experience building models on open meteorological and climate datasets for weather-risk forecasting in insurance and agriculture.",
      },
      {
        q: "Скільки коштує ML-проєкт для agritech-компанії в Ексетері?",
        qEn: "How much does an ML project cost for an Exeter agritech company?",
        a: "PoC для прогнозу врожайності чи погодного ризику — від £5,000-£9,000. Production-система з інтеграцією сенсорних даних — від £18,000-£40,000.",
        aEn: "A PoC for yield or weather-risk forecasting starts from £5,000-£9,000. A production system integrating sensor data runs £18,000-£40,000.",
      },
      {
        q: "Чи можете ви будувати climate-risk моделі для страховиків?",
        qEn: "Can you build climate-risk models for insurers?",
        a: "Так. Ми будуємо моделі оцінки ризику повеней, штормів та посух для property insurance underwriting, використовуючи історичні кліматичні дані та геопросторовий аналіз.",
        aEn: "Yes. We build flood, storm, and drought risk-assessment models for property insurance underwriting, using historical climate data and geospatial analysis.",
      },
    ],
  },
  {
    slug: "luton",
    nameUk: "Лутон",
    nameEn: "Luton",
    region: "Бедфордшир",
    regionEn: "Bedfordshire",
    population: "230 тис.",
    populationEn: "230,000",
    businesses: 11800,
    description:
      "Лутон — ключовий авіаційний та логістичний хаб Великобританії завдяки London Luton Airport, а також має міцну автомобільну спадщину (колишній завод Vauxhall) і сучасний логістично-виробничий сектор навколо M1. Авіакомпанії та логістичні оператори впроваджують ML для прогнозу пасажиропотоку, оптимізації розкладу та управління запасами запчастин. Codeworth будує ML для авіаційної аналітики, логістичної оптимізації та predictive maintenance для лутонських компаній.",
    descriptionEn:
      "Luton is a key UK aviation and logistics hub thanks to London Luton Airport, with a strong automotive heritage (the former Vauxhall plant) and a modern logistics-manufacturing sector along the M1 corridor. Airlines and logistics operators use ML for passenger-flow forecasting, schedule optimisation, and parts-inventory management. Codeworth builds ML for aviation analytics, logistics optimisation, and predictive maintenance for Luton businesses.",
    seoTitle: "ML-консалтинг у Лутоні | Машинне навчання для авіації та логістики | Codeworth",
    seoTitleEn: "Machine Learning Consultant Luton | Aviation & Logistics ML | Codeworth",
    seoDesc:
      "ML-консалтинг у Лутоні: прогноз пасажиропотоку, логістична оптимізація, predictive maintenance. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Luton: passenger-flow forecasting, logistics optimisation, predictive maintenance. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "Авіаційних та логістичних компаній", labelEn: "Aviation & logistics companies", value: "870+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "1,400+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "45+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£53k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "4+" },
    ],
    faq: [
      {
        q: "Які ML-рішення затребувані у Лутоні?",
        qEn: "Which ML solutions are in demand in Luton?",
        a: "Для авіації: прогноз пасажиропотоку, оптимізація розкладу рейсів та наземного обслуговування. Для логістики: route optimization, predictive maintenance автопарку та управління запасами.",
        aEn: "For aviation: passenger-flow forecasting, flight schedule and ground-handling optimisation. For logistics: route optimisation, fleet predictive maintenance, and inventory management.",
      },
      {
        q: "Чи маєте ви досвід з авіаційними даними (пасажиропотік, розклад)?",
        qEn: "Do you have experience with aviation data (passenger flow, scheduling)?",
        a: "Так. Ми будуємо time-series моделі прогнозу пасажиропотоку з урахуванням сезонності та подій, а також оптимізаційні моделі для розподілу gate-ресурсів і наземного персоналу.",
        aEn: "Yes. We build time-series passenger-flow forecasting models accounting for seasonality and events, plus optimisation models for gate resource and ground-staff allocation.",
      },
      {
        q: "Скільки коштує ML-проєкт для логістичної компанії в Лутоні?",
        qEn: "How much does an ML project cost for a Luton logistics company?",
        a: "PoC route optimization — від £5,000-£9,000. Production-система з real-time dispatch — від £20,000-£45,000.",
        aEn: "A PoC route optimisation project starts from £5,000-£9,000. A production system with real-time dispatch runs £20,000-£45,000.",
      },
      {
        q: "Чи будуєте ви predictive maintenance для автомобільного сектору?",
        qEn: "Do you build predictive maintenance for the automotive sector?",
        a: "Так. Спираючись на автомобільну спадщину Лутона, ми будуємо моделі прогнозу відмов виробничого обладнання та контролю якості на основі computer vision для виробничих ліній.",
        aEn: "Yes. Building on Luton's automotive heritage, we develop equipment-failure prediction models and computer-vision-based quality control for manufacturing lines.",
      },
    ],
  },
  {
    slug: "slough",
    nameUk: "Слау",
    nameEn: "Slough",
    region: "Беркшир, Долина Темзи",
    regionEn: "Berkshire, Thames Valley",
    population: "164 тис.",
    populationEn: "164,000",
    businesses: 12600,
    description:
      "Слау — серце tech-коридору Долини Темзи: тут розташовані європейські чи регіональні штаб-квартири O2, Mars, Amazon UK та десятків інших глобальних корпорацій завдяки безпосередній близькості до аеропорту Хітроу і Лондона. Висока концентрація корпоративних headquarters створює значний попит на enterprise ML: аналітику supply chain, customer analytics та автоматизацію бек-офісу. Codeworth будує enterprise-grade ML-рішення для корпорацій та їхніх регіональних офісів у Слау.",
    descriptionEn:
      "Slough is the heart of the Thames Valley tech corridor — home to European or regional headquarters for O2, Mars, Amazon UK, and dozens of other global corporations, thanks to its proximity to Heathrow and London. The high concentration of corporate HQs drives strong demand for enterprise ML: supply chain analytics, customer analytics, and back-office automation. Codeworth builds enterprise-grade ML for corporations and their regional offices in Slough.",
    seoTitle: "ML-консалтинг у Слау | Машинне навчання для корпорацій | Codeworth",
    seoTitleEn: "Machine Learning Consultant Slough | Enterprise ML Agency | Codeworth",
    seoDesc:
      "ML-консалтинг у Слау: supply chain analytics, customer analytics, автоматизація бек-офісу. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Slough: supply chain analytics, customer analytics, back-office automation. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "Корпоративних штаб-квартир", labelEn: "Corporate headquarters", value: "230+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "2,600+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "70+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£61k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "5+" },
    ],
    faq: [
      {
        q: "Які ML-рішення затребувані у корпорацій в Слау?",
        qEn: "Which ML solutions are in demand among Slough corporates?",
        a: "Supply chain forecasting для FMCG-компаній (на кшталт Mars), customer analytics і churn prediction для телекому (O2), а також автоматизація фінансового бек-офісу через NLP.",
        aEn: "Supply chain forecasting for FMCG companies (like Mars), customer analytics and churn prediction for telecom (O2), and financial back-office automation via NLP.",
      },
      {
        q: "Чи працюєте ви з регіональними офісами глобальних корпорацій?",
        qEn: "Do you work with regional offices of global corporations?",
        a: "Так. Ми часто виступаємо як гнучкий ML-партнер для регіональних офісів, що не мають власної data science команди, але потребують production ML-рішень швидше і дешевше за внутрішню розробку.",
        aEn: "Yes. We often act as a flexible ML partner for regional offices without an in-house data science team, delivering production ML faster and cheaper than internal development.",
      },
      {
        q: "Скільки коштує enterprise ML-проєкт у Слау?",
        qEn: "How much does an enterprise ML project cost in Slough?",
        a: "PoC для конкретного відділу — від £6,000-£10,000. Повна enterprise-система з інтеграцією в існуючий стек — від £25,000-£60,000.",
        aEn: "A PoC for a specific department starts from £6,000-£10,000. A full enterprise system integrated with existing infrastructure runs £25,000-£60,000.",
      },
      {
        q: "Чи можете ви інтегруватися з існуючими enterprise-системами (SAP, Salesforce)?",
        qEn: "Can you integrate with existing enterprise systems (SAP, Salesforce)?",
        a: "Так. Ми маємо досвід інтеграції ML-моделей з SAP, Salesforce та іншими enterprise-платформами через API та ETL-пайплайни, що дозволяє впроваджувати ML без переробки існуючої інфраструктури.",
        aEn: "Yes. We have experience integrating ML models with SAP, Salesforce, and other enterprise platforms via APIs and ETL pipelines, enabling ML adoption without reworking existing infrastructure.",
      },
    ],
  },
  {
    slug: "warwick",
    nameUk: "Ворик",
    nameEn: "Warwick",
    region: "Ворикшир, Уест-Мідлендс",
    regionEn: "Warwickshire, West Midlands",
    population: "145 тис.",
    populationEn: "145,000",
    businesses: 8100,
    description:
      "Ворик — науково-технологічне серце автомобільного кластеру Уест-Мідлендс завдяки WMG (Warwick Manufacturing Group) при University of Warwick, що співпрацює з Jaguar Land Rover, Aston Martin та десятками постачальників автопрому. WMG — провідний дослідницький центр Великобританії з ML для виробництва, батарейних технологій та автономних транспортних засобів. Codeworth будує ML для predictive maintenance, контролю якості на виробничих лініях та оптимізації supply chain для автовиробників і постачальників регіону — тісно повʼязано з нашим напрямком /ml/manufacturing.",
    descriptionEn:
      "Warwick is the research and technology heart of the West Midlands automotive cluster thanks to WMG (Warwick Manufacturing Group) at the University of Warwick, which partners with Jaguar Land Rover, Aston Martin, and dozens of automotive suppliers. WMG is a leading UK research centre for manufacturing ML, battery technology, and autonomous vehicles. Codeworth builds ML for predictive maintenance, production-line quality control, and supply chain optimisation for regional automakers and suppliers — closely aligned with our /ml/manufacturing practice.",
    seoTitle: "ML-консалтинг у Ворику | Машинне навчання для автопрому | Codeworth",
    seoTitleEn: "Machine Learning Consultant Warwick | Automotive Manufacturing ML | Codeworth",
    seoDesc:
      "ML-консалтинг у Ворику: predictive maintenance, quality control CV, supply chain для автопрому. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Warwick: predictive maintenance, computer vision quality control, automotive supply chain ML. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "Автомобільних та виробничих компаній", labelEn: "Automotive & manufacturing companies", value: "560+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "1,900+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "75+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£57k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "5+" },
    ],
    faq: [
      {
        q: "Які ML-рішення затребувані у автопромі Ворика?",
        qEn: "Which ML solutions are in demand in Warwick's automotive sector?",
        a: "Predictive maintenance виробничого обладнання, computer vision для контролю якості деталей на конвеєрі, оптимізація supply chain та ML для тестування батарейних технологій електромобілів.",
        aEn: "Predictive maintenance of manufacturing equipment, computer-vision quality control on production lines, supply chain optimisation, and ML for EV battery technology testing.",
      },
      {
        q: "Чи маєте ви досвід з автомобільними постачальниками масштабу JLR?",
        qEn: "Do you have experience with JLR-scale automotive suppliers?",
        a: "Ми не працювали безпосередньо з JLR, але маємо досвід побудови computer vision систем контролю якості (виявлення дефектів за фото/відео з конвеєра) та predictive maintenance для виробничого обладнання — задачі того ж класу, що й у постачальників JLR-рівня.",
        aEn: "We haven't worked directly with JLR, but we have experience building computer-vision quality control systems (defect detection from production-line imagery) and predictive maintenance for manufacturing equipment — the same class of problems faced by JLR-tier suppliers.",
      },
      {
        q: "Скільки коштує ML для виробничої лінії в Ворику?",
        qEn: "How much does ML cost for a Warwick production line?",
        a: "PoC computer vision для контролю якості — від £6,000-£11,000. Production-система з інтеграцією в конвеєр та real-time алертами — від £22,000-£55,000.",
        aEn: "A PoC computer-vision quality control system starts from £6,000-£11,000. A production system integrated with the line and real-time alerting runs £22,000-£55,000.",
      },
      {
        q: "Чи стежите ви за дослідженнями WMG (Warwick Manufacturing Group)?",
        qEn: "Do you track WMG (Warwick Manufacturing Group) research?",
        a: "Так. Ми відстежуємо публікації WMG з ML у виробництві, батарейних технологій та автономних транспортних засобів і адаптуємо релевантні методи (наприклад, digital twin моделювання) у production-рішення для наших клієнтів.",
        aEn: "Yes. We track WMG research in manufacturing ML, battery technology, and autonomous vehicles, adapting relevant methods — such as digital twin modelling — into production solutions for our clients.",
      },
    ],
  },
  {
    slug: "guildford",
    nameUk: "Гілдфорд",
    nameEn: "Guildford",
    region: "Суррей, Південно-Східна Англія",
    regionEn: "Surrey, South East England",
    population: "150 тис.",
    populationEn: "150,000",
    businesses: 9800,
    description:
      "Гілдфорд — центр британської ігрової індустрії та софтверного кластеру Суррею: тут базуються Criterion Games, Media Molecule та десятки студій розробки програмного забезпечення, а University of Surrey веде провідні дослідження в галузі AI та 5G. Концентрація геймдев і software-компаній створює попит на player analytics, recommendation-системи та ML-інфраструктуру для SaaS-продуктів. Codeworth будує ML для геймдев-студій та software-компаній Гілдфорда.",
    descriptionEn:
      "Guildford is a centre of the UK games industry and Surrey's software cluster — home to Criterion Games, Media Molecule, and dozens of software development studios, with the University of Surrey leading research in AI and 5G. The concentration of games and software companies drives demand for player analytics, recommendation engines, and ML infrastructure for SaaS products. Codeworth builds ML for Guildford's games studios and software companies.",
    seoTitle: "ML-консалтинг у Гілдфорді | Машинне навчання для геймдев та software | Codeworth",
    seoTitleEn: "Machine Learning Consultant Guildford | Games & Software ML | Codeworth",
    seoDesc:
      "ML-консалтинг у Гілдфорді: player analytics, recommendation-системи, SaaS ML-інфраструктура. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Guildford: player analytics, recommendation engines, SaaS ML infrastructure. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "Ігрових та software-компаній", labelEn: "Games & software companies", value: "310+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "2,100+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "90+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£62k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "5+" },
    ],
    faq: [
      {
        q: "Які ML-рішення затребувані у геймдев-компаній Гілдфорда?",
        qEn: "Which ML solutions do Guildford games companies need?",
        a: "Player behaviour analytics та retention prediction, рекомендаційні системи ігрового контенту, procedural content generation та anti-cheat детекція на основі аномалій.",
        aEn: "Player behaviour analytics and retention prediction, in-game content recommendation engines, procedural content generation, and anomaly-based anti-cheat detection.",
      },
      {
        q: "Чи маєте ви досвід зі студіями масштабу Criterion Games чи Media Molecule?",
        qEn: "Do you have experience with studios like Criterion Games or Media Molecule?",
        a: "Ми не працювали безпосередньо з цими студіями, але маємо профільний досвід у player analytics та recommendation-системах для ігрових продуктів — саме той клас задач, що вирішують команди даних у студіях подібного масштабу.",
        aEn: "We haven't worked directly with these studios, but we have relevant experience in player analytics and recommendation systems for games products — the same class of problems tackled by data teams at studios of this scale.",
      },
      {
        q: "Скільки коштує ML для геймдев-студії в Гілдфорді?",
        qEn: "How much does ML cost for a Guildford games studio?",
        a: "PoC churn/retention моделі — від £4,500-£8,500. Production player analytics платформа з рекомендаціями — від £18,000-£40,000.",
        aEn: "A PoC churn/retention model starts from £4,500-£8,500. A production player analytics platform with recommendations runs £18,000-£40,000.",
      },
      {
        q: "Чи будуєте ви ML-інфраструктуру для SaaS-компаній Суррею?",
        qEn: "Do you build ML infrastructure for Surrey SaaS companies?",
        a: "Так. Ми проєктуємо MLOps-пайплайни (feature store, model monitoring, CI/CD для моделей) для software-компаній Гілдфорда, що масштабують свої продуктові ML-функції.",
        aEn: "Yes. We design MLOps pipelines (feature stores, model monitoring, CI/CD for models) for Guildford software companies scaling their product ML features.",
      },
    ],
  },
  {
    slug: "bradford",
    nameUk: "Бредфорд",
    nameEn: "Bradford",
    region: "Уест-Йоркшир",
    regionEn: "West Yorkshire",
    population: "540 тис.",
    populationEn: "540,000",
    businesses: 22000,
    description:
      "Бредфорд — один з найбільших виробничих центрів Йоркширу з багатою текстильною спадщиною, що трансформується у сучасний виробничий та зростаючий tech/data сектор. Місто отримало статус UK City of Culture 2025 та активно інвестує в digital-трансформацію бізнесу. Порівняно з Лідсом чи Манчестером, у Бредфорді значно нижча конкуренція серед ML-постачальників при зростаючому попиті виробничих компаній на автоматизацію. Codeworth будує ML для контролю якості, predictive maintenance та оптимізації виробничих процесів для бредфордського бізнесу.",
    descriptionEn:
      "Bradford is one of Yorkshire's largest manufacturing centres, with a rich textile heritage now transforming into modern manufacturing and a growing tech/data sector. Designated UK City of Culture 2025, the city is investing heavily in digital business transformation. Compared to Leeds or Manchester, Bradford has significantly lower competition among ML providers, alongside rising demand from manufacturers for automation. Codeworth builds ML for quality control, predictive maintenance, and manufacturing process optimisation for Bradford businesses.",
    seoTitle: "ML-консалтинг у Бредфорді | Машинне навчання для виробництва | Codeworth",
    seoTitleEn: "Machine Learning Consultant Bradford | Manufacturing ML Agency | Codeworth",
    seoDesc:
      "ML-консалтинг у Бредфорді: контроль якості CV, predictive maintenance, оптимізація виробництва. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Bradford: computer vision quality control, predictive maintenance, manufacturing optimisation. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "Виробничих компаній", labelEn: "Manufacturing companies", value: "3,400+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "2,200+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "85+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£46k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "5+" },
    ],
    faq: [
      {
        q: "Які ML-рішення затребувані у виробничих компаній Бредфорда?",
        qEn: "Which ML solutions do Bradford manufacturers need?",
        a: "Computer vision для контролю якості продукції, predictive maintenance виробничого обладнання, оптимізація ланцюга поставок та прогноз попиту для планування виробництва.",
        aEn: "Computer vision for product quality control, predictive maintenance of manufacturing equipment, supply chain optimisation, and demand forecasting for production planning.",
      },
      {
        q: "Чому ML-консалтинг у Бредфорді дешевший за Лідс чи Манчестер?",
        qEn: "Why is ML consulting cheaper in Bradford than Leeds or Manchester?",
        a: "Нижча конкуренція серед локальних ML-постачальників та нижчі операційні витрати дозволяють пропонувати бредфордському бізнесу такі ж production-grade рішення за ставками на 15-25% нижчими за сусідні великі міста.",
        aEn: "Lower competition among local ML providers and lower operating costs mean Bradford businesses can access the same production-grade solutions at rates 15-25% below neighbouring larger cities.",
      },
      {
        q: "Скільки коштує ML-проєкт для виробничої компанії в Бредфорді?",
        qEn: "How much does an ML project cost for a Bradford manufacturer?",
        a: "PoC computer vision для контролю якості — від £5,000-£9,000. Production-система з інтеграцією в конвеєр — від £18,000-£42,000.",
        aEn: "A PoC computer-vision quality control system starts from £5,000-£9,000. A production system integrated with the line runs £18,000-£42,000.",
      },
      {
        q: "Чи допомагаєте ви бізнесу з City of Culture 2025 цифровою трансформацією?",
        qEn: "Do you help businesses with City of Culture 2025 digital transformation?",
        a: "Так. Ми консультуємо бредфордські компанії, що інвестують у digital-трансформацію на хвилі City of Culture 2025, впроваджуючи ML для аналітики відвідувачів, персоналізації та операційної ефективності.",
        aEn: "Yes. We advise Bradford businesses investing in digital transformation around City of Culture 2025, implementing ML for visitor analytics, personalisation, and operational efficiency.",
      },
    ],
  },
  {
    slug: "hull",
    nameUk: "Гулль",
    nameEn: "Hull",
    region: "Іст-Йоркшир",
    regionEn: "East Yorkshire",
    population: "270 тис.",
    populationEn: "270,000",
    businesses: 13500,
    description:
      "Гулль (Кінгстон-апон-Гулль) — центр офшорної вітроенергетики Великобританії завдяки заводу Siemens Gamesa та порту, а також ключовий логістичний хаб на узбережжі Північного моря. Енергетичні компанії впроваджують ML для прогнозу виробітку вітропарків та predictive maintenance турбін, а портова логістика — для оптимізації вантажообігу. Codeworth будує ML для відновлюваної енергетики та портової логістики для гулльського бізнесу.",
    descriptionEn:
      "Hull (Kingston upon Hull) is the UK's offshore wind energy hub thanks to the Siemens Gamesa blade factory and port, and a key North Sea logistics gateway. Energy companies use ML for wind farm yield forecasting and turbine predictive maintenance, while port logistics operators apply it to cargo throughput optimisation. Codeworth builds ML for renewable energy and port logistics businesses in Hull.",
    seoTitle: "ML-консалтинг у Гуллі | Машинне навчання для вітроенергетики та порту | Codeworth",
    seoTitleEn: "Machine Learning Consultant Hull | Offshore Wind & Port Logistics ML | Codeworth",
    seoDesc:
      "ML-консалтинг у Гуллі: прогноз виробітку вітропарків, predictive maintenance турбін, портова логістика. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Hull: offshore wind yield forecasting, turbine predictive maintenance, port logistics ML. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "Енергетичних та логістичних компаній", labelEn: "Energy & logistics companies", value: "740+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "1,300+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "40+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£45k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "4+" },
    ],
    faq: [
      {
        q: "Які ML-рішення затребувані у Гуллі?",
        qEn: "Which ML solutions are in demand in Hull?",
        a: "Для офшорної вітроенергетики: прогноз виробітку турбін на основі погодних даних, predictive maintenance лопатей та генераторів. Для порту: оптимізація вантажообігу, прогноз завантаженості причалів.",
        aEn: "For offshore wind: weather-driven turbine yield forecasting, predictive maintenance of blades and generators. For the port: cargo throughput optimisation and berth-utilisation forecasting.",
      },
      {
        q: "Чи маєте ви досвід з offshore wind даними?",
        qEn: "Do you have experience with offshore wind data?",
        a: "Так. Ми будуємо моделі прогнозу виробітку на основі метеоданих і SCADA-сенсорів турбін, а також anomaly detection для раннього виявлення механічних несправностей — знижуючи незаплановані простої на 25-35%.",
        aEn: "Yes. We build yield forecasting models using weather data and turbine SCADA sensors, plus anomaly detection for early mechanical fault identification — reducing unplanned downtime by 25-35%.",
      },
      {
        q: "Скільки коштує ML-проєкт для енергетичної чи логістичної компанії в Гуллі?",
        qEn: "How much does an ML project cost for a Hull energy or logistics company?",
        a: "PoC — від £5,000-£9,000. Production predictive maintenance чи оптимізація логістики — від £18,000-£42,000.",
        aEn: "A PoC starts from £5,000-£9,000. A production predictive maintenance or logistics optimisation system runs £18,000-£42,000.",
      },
      {
        q: "Чи можете ви оптимізувати портову логістику за допомогою ML?",
        qEn: "Can you optimise port logistics with ML?",
        a: "Так. Ми будуємо моделі прогнозу завантаженості причалів, оптимізації розкладу розвантаження та route planning для контейнерних і вантажних потоків через порт Гулля.",
        aEn: "Yes. We build berth-utilisation forecasting models, unloading schedule optimisation, and route planning for container and cargo flows through the Port of Hull.",
      },
    ],
  },
  {
    slug: "wolverhampton",
    nameUk: "Вулвергемптон",
    nameEn: "Wolverhampton",
    region: "Уест-Мідлендс",
    regionEn: "West Midlands",
    population: "265 тис.",
    populationEn: "265,000",
    businesses: 12400,
    description:
      "Вулвергемптон — важлива ланка автомобільного ланцюга поставок Уест-Мідлендс з десятками виробників компонентів та tier-2/tier-3 постачальників для великих автовиробників регіону. Виробничий сектор міста активно шукає ML для контролю якості, прогнозування відмов обладнання та оптимізації виробничих процесів у міру автоматизації заводів. Codeworth будує ML для автомобільного supply chain та контролю якості для вулвергемптонських виробників.",
    descriptionEn:
      "Wolverhampton is a key link in the West Midlands automotive supply chain, home to dozens of component manufacturers and tier-2/tier-3 suppliers for the region's major automakers. The city's manufacturing sector is increasingly seeking ML for quality control, equipment failure prediction, and process optimisation as factories automate. Codeworth builds ML for automotive supply chain and quality control for Wolverhampton manufacturers.",
    seoTitle: "ML-консалтинг у Вулвергемптоні | Машинне навчання для автопрому | Codeworth",
    seoTitleEn: "Machine Learning Consultant Wolverhampton | Automotive Supply Chain ML | Codeworth",
    seoDesc:
      "ML-консалтинг у Вулвергемптоні: контроль якості CV, predictive maintenance, supply chain для автопрому. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Wolverhampton: computer vision quality control, predictive maintenance, automotive supply chain ML. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "Виробничих компаній", labelEn: "Manufacturing companies", value: "1,900+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "1,050+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "35+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£45k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "4+" },
    ],
    faq: [
      {
        q: "Які ML-рішення затребувані у автомобільних постачальників Вулвергемптона?",
        qEn: "Which ML solutions do Wolverhampton automotive suppliers need?",
        a: "Computer vision для виявлення дефектів деталей на конвеєрі, predictive maintenance штампувального та зварювального обладнання, та оптимізація supply chain для узгодження з графіками tier-1 постачальників.",
        aEn: "Computer vision for defect detection on production lines, predictive maintenance of stamping and welding equipment, and supply chain optimisation to align with tier-1 supplier schedules.",
      },
      {
        q: "Чи маєте ви досвід з tier-2/tier-3 постачальниками?",
        qEn: "Do you have experience with tier-2/tier-3 suppliers?",
        a: "Так. Ми розуміємо специфіку роботи з jidoka та just-in-time графіками tier-2/3 постачальників і будуємо ML, що інтегрується з існуючими MES/ERP-системами без порушення виробничого циклу.",
        aEn: "Yes. We understand the constraints of jidoka and just-in-time scheduling for tier-2/3 suppliers, and build ML that integrates with existing MES/ERP systems without disrupting the production cycle.",
      },
      {
        q: "Скільки коштує computer vision система контролю якості?",
        qEn: "How much does a computer vision quality control system cost?",
        a: "PoC на зразках дефектів — від £5,000-£9,000. Production-система з камерами на лінії та real-time алертами — від £20,000-£45,000.",
        aEn: "A PoC on defect samples starts from £5,000-£9,000. A production system with line-mounted cameras and real-time alerting runs £20,000-£45,000.",
      },
      {
        q: "Чи можете ви прогнозувати відмови виробничого обладнання?",
        qEn: "Can you predict manufacturing equipment failures?",
        a: "Так. Ми будуємо моделі predictive maintenance на основі вібро- та термо-сенсорів, що прогнозують відмови за 1-3 тижні наперед, знижуючи незаплановані простої на 30%+.",
        aEn: "Yes. We build predictive maintenance models using vibration and thermal sensor data that forecast failures 1-3 weeks ahead, cutting unplanned downtime by 30%+.",
      },
    ],
  },
  {
    slug: "stoke-on-trent",
    nameUk: "Сток-он-Трент",
    nameEn: "Stoke-on-Trent",
    region: "Стаффордшир",
    regionEn: "Staffordshire",
    population: "260 тис.",
    populationEn: "260,000",
    businesses: 11200,
    description:
      "Сток-он-Трент — історична столиця британської кераміки, що трансформується у центр передових матеріалів і сучасного виробництва. Місцеві компанії застосовують ML для контролю якості кераміки та матеріалів через computer vision, а логістичні оператори — для оптимізації розподілу. Staffordshire University розвиває дослідження в галузі матеріалознавства і AI. Codeworth будує ML для контролю якості виробництва, predictive maintenance та логістичної оптимізації для стоківського бізнесу.",
    descriptionEn:
      "Stoke-on-Trent, the historic home of British ceramics, is transforming into a hub for advanced materials and modern manufacturing. Local companies use ML for computer-vision-based ceramics and materials quality control, while logistics operators apply it to distribution optimisation. Staffordshire University is building research strength in materials science and AI. Codeworth builds ML for manufacturing quality control, predictive maintenance, and logistics optimisation for Stoke-on-Trent businesses.",
    seoTitle: "ML-консалтинг у Сток-он-Тренті | Машинне навчання для виробництва | Codeworth",
    seoTitleEn: "Machine Learning Consultant Stoke-on-Trent | Manufacturing ML Agency | Codeworth",
    seoDesc:
      "ML-консалтинг у Сток-он-Тренті: контроль якості кераміки CV, predictive maintenance, логістика. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Stoke-on-Trent: ceramics computer vision quality control, predictive maintenance, logistics ML. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "Виробничих компаній", labelEn: "Manufacturing companies", value: "1,650+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "820+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "30+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£44k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "4+" },
    ],
    faq: [
      {
        q: "Які ML-рішення затребувані у виробників кераміки та матеріалів Стока?",
        qEn: "Which ML solutions do Stoke ceramics and materials manufacturers need?",
        a: "Computer vision для виявлення дефектів обпалу та поверхневих тріщин, predictive maintenance печей і виробничих ліній, та прогноз попиту для планування партій виробництва.",
        aEn: "Computer vision for detecting firing defects and surface cracks, predictive maintenance of kilns and production lines, and demand forecasting for batch production planning.",
      },
      {
        q: "Скільки коштує ML для контролю якості на виробництві?",
        qEn: "How much does ML for manufacturing quality control cost?",
        a: "PoC computer vision на зразках дефектної продукції — від £4,500-£8,500. Production-система з камерами на лінії — від £16,000-£38,000.",
        aEn: "A PoC computer vision system on defective sample product starts from £4,500-£8,500. A production system with line cameras runs £16,000-£38,000.",
      },
      {
        q: "Чи маєте ви досвід з advanced materials виробництвом?",
        qEn: "Do you have experience with advanced materials manufacturing?",
        a: "Ми будуємо ML-рішення для контролю якості та predictive maintenance, застосовні як до традиційної кераміки, так і до сучасних advanced materials (технічна кераміка, композити), що розвиваються у регіоні.",
        aEn: "We build ML for quality control and predictive maintenance applicable to both traditional ceramics and the modern advanced materials (technical ceramics, composites) growing in the region.",
      },
      {
        q: "Чи можете ви оптимізувати логістику для виробників Стока?",
        qEn: "Can you optimise logistics for Stoke manufacturers?",
        a: "Так. Ми будуємо моделі прогнозу попиту та оптимізації маршрутів доставки для виробників, що постачають продукцію по всій Великобританії та на експорт.",
        aEn: "Yes. We build demand forecasting and delivery route optimisation models for manufacturers distributing across the UK and to export markets.",
      },
    ],
  },
  {
    slug: "middlesbrough",
    nameUk: "Мідлсбро",
    nameEn: "Middlesbrough",
    region: "Норт-Йоркшир, Тіс-Веллі",
    regionEn: "North Yorkshire, Tees Valley",
    population: "174 тис.",
    populationEn: "174,000",
    businesses: 8900,
    description:
      "Мідлсбро — центр хімічної та процесної промисловості Тіс-Веллі, одного з найбільших промислових кластерів Великобританії, з десятками хімічних заводів, нафтопереробки та важкого машинобудування. Компанії регіону впроваджують ML для predictive maintenance критичного обладнання, оптимізації процесів та моніторингу безпеки. Teesside University готує інженерів для хімічної промисловості з акцентом на process engineering. Codeworth будує ML для predictive maintenance та оптимізації процесів для мідлсброзьких промислових компаній.",
    descriptionEn:
      "Middlesbrough is the centre of Tees Valley's chemical and process industries, one of the UK's largest industrial clusters, with dozens of chemical plants, refining operations, and heavy engineering firms. Regional companies use ML for predictive maintenance of critical equipment, process optimisation, and safety monitoring. Teesside University trains engineers for the chemical industry with a focus on process engineering. Codeworth builds ML for predictive maintenance and process optimisation for Middlesbrough industrial companies.",
    seoTitle: "ML-консалтинг у Мідлсбро | Машинне навчання для хімічної промисловості | Codeworth",
    seoTitleEn: "Machine Learning Consultant Middlesbrough | Chemical & Process Industry ML | Codeworth",
    seoDesc:
      "ML-консалтинг у Мідлсбро: predictive maintenance, оптимізація процесів, моніторинг безпеки. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Middlesbrough: predictive maintenance, process optimisation, safety monitoring ML. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "Хімічних та промислових компаній", labelEn: "Chemical & industrial companies", value: "560+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "680+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "25+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£46k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "3+" },
    ],
    faq: [
      {
        q: "Які ML-рішення затребувані у хімічній промисловості Мідлсбро?",
        qEn: "Which ML solutions are in demand in Middlesbrough's chemical industry?",
        a: "Predictive maintenance критичного обладнання (реактори, насоси, компресори), оптимізація процесних параметрів для зниження енерговитрат, та anomaly detection для моніторингу безпеки виробництва.",
        aEn: "Predictive maintenance of critical equipment (reactors, pumps, compressors), process parameter optimisation to reduce energy consumption, and anomaly detection for production safety monitoring.",
      },
      {
        q: "Чи маєте ви досвід з process-даними (тиск, температура, витрати)?",
        qEn: "Do you have experience with process data (pressure, temperature, flow)?",
        a: "Так. Ми працюємо з time-series даними промислових датчиків (DCS/SCADA), будуючи моделі прогнозу відмов та оптимізації setpoints, що знижують енерговитрати на 5-12% і незаплановані зупинки на 25-35%.",
        aEn: "Yes. We work with industrial sensor time-series data (DCS/SCADA), building failure-prediction and setpoint-optimisation models that cut energy consumption by 5-12% and unplanned shutdowns by 25-35%.",
      },
      {
        q: "Скільки коштує ML-проєкт для хімічного заводу в Мідлсбро?",
        qEn: "How much does an ML project cost for a Middlesbrough chemical plant?",
        a: "PoC на історичних процесних даних — від £5,500-£10,000. Production-система з інтеграцією в DCS та алертами — від £20,000-£48,000.",
        aEn: "A PoC on historical process data starts from £5,500-£10,000. A production system integrated with DCS and alerting runs £20,000-£48,000.",
      },
      {
        q: "Чи враховуєте ви вимоги безпеки промислових об'єктів (COMAH)?",
        qEn: "Do you account for industrial safety requirements (COMAH)?",
        a: "Так. Наші anomaly detection та predictive maintenance системи проєктуються з урахуванням вимог безпеки COMAH-об'єктів, забезпечуючи ранні алерти без хибних спрацювань, що можуть порушити безпечну експлуатацію.",
        aEn: "Yes. Our anomaly detection and predictive maintenance systems are designed with COMAH site safety requirements in mind, providing early alerts without false positives that could disrupt safe operations.",
      },
    ],
  },
  {
    slug: "swindon",
    nameUk: "Свіндон",
    nameEn: "Swindon",
    region: "Вілтшир",
    regionEn: "Wiltshire",
    population: "230 тис.",
    populationEn: "230,000",
    businesses: 13100,
    description:
      "Свіндон поєднує автомобільну спадщину (колишній завод Honda) з розвиненим логістичним сектором на перетині M4 та зростаючим tech-кластером — тут розташовані офіси Nationwide Building Society, WHSmith та десятків tech-компаній. Логістичні оператори застосовують ML для оптимізації розподільчих мереж, а фінансові компанії — для кредитного скорингу. Codeworth будує ML для логістичної оптимізації, financial services та виробничої аналітики для свіндонського бізнесу.",
    descriptionEn:
      "Swindon combines automotive heritage (the former Honda plant) with a strong logistics sector at the M4 junction and a growing tech cluster — home to Nationwide Building Society, WHSmith, and dozens of tech companies. Logistics operators use ML for distribution network optimisation, while financial firms apply it to credit scoring. Codeworth builds ML for logistics optimisation, financial services, and manufacturing analytics for Swindon businesses.",
    seoTitle: "ML-консалтинг у Свіндоні | Машинне навчання для логістики та фінансів | Codeworth",
    seoTitleEn: "Machine Learning Consultant Swindon | Logistics & Financial Services ML | Codeworth",
    seoDesc:
      "ML-консалтинг у Свіндоні: логістична оптимізація, кредитний скоринг, виробнича аналітика. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Swindon: logistics optimisation, credit scoring, manufacturing analytics. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "Логістичних та фінансових компаній", labelEn: "Logistics & financial companies", value: "780+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "1,550+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "60+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£54k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "4+" },
    ],
    faq: [
      {
        q: "Які ML-рішення затребувані у Свіндоні?",
        qEn: "Which ML solutions are in demand in Swindon?",
        a: "Для логістики: route optimization та прогноз попиту на розподільчих центрах M4-коридору. Для фінансових компаній (Nationwide): кредитний скоринг та fraud detection. Для виробництва: predictive maintenance.",
        aEn: "For logistics: route optimisation and demand forecasting for M4-corridor distribution centres. For financial firms (Nationwide): credit scoring and fraud detection. For manufacturing: predictive maintenance.",
      },
      {
        q: "Чи маєте ви досвід з кредитним скорингом для building societies?",
        qEn: "Do you have experience with credit scoring for building societies?",
        a: "Так. Ми будуємо credit risk моделі з SHAP-поясненнями відповідно до вимог FCA Consumer Duty, застосовні для building societies та ощадних інституцій масштабу Nationwide.",
        aEn: "Yes. We build credit risk models with SHAP explainability that meet FCA Consumer Duty requirements, applicable to building societies and savings institutions at Nationwide's scale.",
      },
      {
        q: "Скільки коштує ML-проєкт для логістичної компанії в Свіндоні?",
        qEn: "How much does an ML project cost for a Swindon logistics company?",
        a: "PoC route optimization — від £5,000-£9,000. Production-система з інтеграцією в TMS — від £20,000-£44,000.",
        aEn: "A PoC route optimisation project starts from £5,000-£9,000. A production system integrated with a TMS runs £20,000-£44,000.",
      },
      {
        q: "Чи будуєте ви ML для колишніх автомобільних виробничих об'єктів?",
        qEn: "Do you build ML for former automotive manufacturing sites?",
        a: "Так. Ми будуємо predictive maintenance та quality control ML для виробничих компаній, що використовують інфраструктуру, успадковану від автомобільної промисловості Свіндона (штампування, складання, логістика запчастин).",
        aEn: "Yes. We build predictive maintenance and quality control ML for manufacturers using infrastructure inherited from Swindon's automotive industry (stamping, assembly, parts logistics).",
      },
    ],
  },
  {
    slug: "bournemouth",
    nameUk: "Борнмут",
    nameEn: "Bournemouth",
    region: "Дорсет, Борнмут-Крайстчерч-Пул",
    regionEn: "Dorset, Bournemouth-Christchurch-Poole",
    population: "200 тис.",
    populationEn: "200,000",
    businesses: 12800,
    description:
      "Борнмут — важливий фінтех та страховий центр на південному узбережжі: тут розташовані офіси JPMorgan, LV= (Liverpool Victoria) та зростаюча креативно-цифрова індустрія. Bournemouth University має один з найсильніших у Великобританії факультетів медіа та комп'ютерної анімації. Фінансові компанії впроваджують ML для fraud detection та credit scoring, а креативний сектор — для генерації контенту і персоналізації. Codeworth будує ML для фінансових операцій та цифрової креативної індустрії Борнмута.",
    descriptionEn:
      "Bournemouth is a significant fintech and insurance centre on the south coast — home to JPMorgan and LV= (Liverpool Victoria) offices, alongside a growing digital creative industry. Bournemouth University has one of the UK's strongest media and computer animation faculties. Financial firms deploy ML for fraud detection and credit scoring, while the creative sector applies it to content generation and personalisation. Codeworth builds ML for financial operations and the digital creative industry in Bournemouth.",
    seoTitle: "ML-консалтинг у Борнмуті | Машинне навчання для фінтеху та креативної індустрії | Codeworth",
    seoTitleEn: "Machine Learning Consultant Bournemouth | Fintech & Creative Industry ML | Codeworth",
    seoDesc:
      "ML-консалтинг у Борнмуті: fraud detection, credit scoring, ML для креативної індустрії. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Bournemouth: fraud detection, credit scoring, creative industry ML. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "Фінансових та креативних компаній", labelEn: "Financial & creative companies", value: "690+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "2,050+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "80+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£55k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "5+" },
    ],
    faq: [
      {
        q: "Які ML-рішення затребувані у фінансових компаній Борнмута?",
        qEn: "Which ML solutions do Bournemouth financial companies need?",
        a: "Fraud detection та credit risk scoring для страхових операцій (LV=), NLP для claims-обробки, а також ML-моделі для управління інвестиційними портфелями та операційного ризику (JPMorgan-масштабу офіси).",
        aEn: "Fraud detection and credit risk scoring for insurance operations (LV=), NLP for claims processing, and ML models for portfolio management and operational risk at JPMorgan-scale offices.",
      },
      {
        q: "Чи будуєте ви ML для креативної/медіа-індустрії?",
        qEn: "Do you build ML for the creative/media industry?",
        a: "Так. Для медіа та анімаційних студій ми будуємо ML для автоматизації рендерингу, розпізнавання контенту та персоналізованих рекомендацій — актуально з огляду на сильну медіа-програму Bournemouth University.",
        aEn: "Yes. For media and animation studios we build ML for render automation, content recognition, and personalised recommendations — relevant given Bournemouth University's strong media programme.",
      },
      {
        q: "Скільки коштує ML-консалтинг у Борнмуті?",
        qEn: "How much does ML consulting cost in Bournemouth?",
        a: "PoC — від £5,000-£9,000. Production fraud detection чи credit scoring система з FCA-документацією — від £18,000-£45,000.",
        aEn: "A PoC starts from £5,000-£9,000. A production fraud detection or credit scoring system with FCA documentation runs £18,000-£45,000.",
      },
      {
        q: "Чи маєте ви досвід з операційним ризиком для великих фінансових офісів?",
        qEn: "Do you have experience with operational risk for large financial offices?",
        a: "Ми будуємо anomaly detection та ML-моделі раннього виявлення операційних ризиків (помилки в транзакціях, аномальна активність), застосовні для регіональних офісів глобальних банків масштабу JPMorgan.",
        aEn: "We build anomaly detection and early operational-risk-warning ML models (transaction errors, anomalous activity), applicable to regional offices of global banks at JPMorgan's scale.",
      },
    ],
  },
  {
    slug: "colchester",
    nameUk: "Колчестер",
    nameEn: "Colchester",
    region: "Ессекс, Східна Англія",
    regionEn: "Essex, East of England",
    population: "192 тис.",
    populationEn: "192,000",
    businesses: 10400,
    description:
      "Колчестер — найстаріше зареєстроване місто Великобританії, що поєднує зростаючий tech-сектор при University of Essex (сильна школа комп'ютерних наук і штучного інтелекту) з логістичним вузлом на перетині A12 та близькості до порту Харідж. Місцевий бізнес шукає ML для оптимізації розподілу, аналітики клієнтів та автоматизації малого і середнього бізнесу. Codeworth будує ML-рішення для логістики та зростаючих tech-компаній Колчестера.",
    descriptionEn:
      "Colchester, Britain's oldest recorded town, combines a growing tech sector anchored by the University of Essex (a strong computer science and AI school) with a logistics node at the A12 junction near the Port of Harwich. Local businesses seek ML for distribution optimisation, customer analytics, and SME automation. Codeworth builds ML for logistics and growing tech companies in Colchester.",
    seoTitle: "ML-консалтинг у Колчестері | Машинне навчання для логістики та tech | Codeworth",
    seoTitleEn: "Machine Learning Consultant Colchester | Logistics & Tech ML Agency | Codeworth",
    seoDesc:
      "ML-консалтинг у Колчестері: логістична оптимізація, аналітика клієнтів, автоматизація МСБ. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Colchester: logistics optimisation, customer analytics, SME automation. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "Логістичних та tech-компаній", labelEn: "Logistics & tech companies", value: "560+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "980+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "42+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£48k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "3+" },
    ],
    faq: [
      {
        q: "Які ML-рішення затребувані у Колчестері?",
        qEn: "Which ML solutions are in demand in Colchester?",
        a: "Для логістики (порт Харідж, A12): route optimization та прогноз вантажопотоку. Для tech-стартапів при University of Essex: MVP ML-функції та customer analytics. Для МСБ: автоматизація через NLP.",
        aEn: "For logistics (Port of Harwich, A12): route optimisation and freight-flow forecasting. For University of Essex tech startups: MVP ML features and customer analytics. For SMEs: NLP-driven automation.",
      },
      {
        q: "Чи працюєте ви зі стартапами при University of Essex?",
        qEn: "Do you work with University of Essex startups?",
        a: "Так. Ми пропонуємо доступні PoC-пакети для ранньостадійних стартапів, що дозволяють протестувати ML-гіпотезу на обмеженому бюджеті перед залученням інвестицій чи грантів.",
        aEn: "Yes. We offer accessible PoC packages for early-stage startups, letting them test an ML hypothesis on a limited budget before raising investment or grant funding.",
      },
      {
        q: "Скільки коштує ML-проєкт для логістичної компанії в Колчестері?",
        qEn: "How much does an ML project cost for a Colchester logistics company?",
        a: "PoC route optimization чи прогноз попиту — від £4,500-£8,500. Production-система — від £16,000-£38,000.",
        aEn: "A PoC route optimisation or demand forecast starts from £4,500-£8,500. A production system runs £16,000-£38,000.",
      },
      {
        q: "Чи можете ви допомогти малому бізнесу Колчестера з автоматизацією?",
        qEn: "Can you help Colchester small businesses with automation?",
        a: "Так. Для МСБ ми пропонуємо доступні NLP-рішення для автоматизації обробки замовлень, клієнтської підтримки та email-класифікації — часто окупні за 2-4 місяці.",
        aEn: "Yes. For SMEs we offer affordable NLP solutions for order processing automation, customer support, and email classification — typically paying back in 2-4 months.",
      },
    ],
  },
];

export function getCity(slug: string): GeoCity | undefined {
  return GEO_CITIES.find((c) => c.slug === slug);
}

export const GEO_CITY_SLUGS = GEO_CITIES.map((c) => c.slug);
