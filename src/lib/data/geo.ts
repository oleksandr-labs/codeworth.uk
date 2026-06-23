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
      { label: "Фінтех-компаній", labelEn: "FinTech companies", value: "3,000+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "45,000+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "1,200+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£72k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "12+" },
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
      "Манчестер — другий за величиною технологічний хаб Великобританії з активно зростаючою AI-екосистемою. Тут базуються великі рітейлери, фінтех-компанії та виробничі підприємства. ML-рішення для манчестерського бізнесу охоплюють demand forecasting для рітейлу, predictive maintenance для виробництва та churn prediction для SaaS-компаній.",
    descriptionEn:
      "Manchester is the UK's second-largest tech hub with a rapidly growing AI ecosystem anchored by major retailers, fintech firms, and manufacturing companies. The city's mix of retail, manufacturing, and financial services creates strong demand for demand forecasting, predictive maintenance, and fraud detection ML. Codeworth delivers production ML for Manchester businesses at rates 30–40% below London equivalents.",
    seoTitle: "ML-консалтинг у Манчестері | Машинне навчання для рітейлу | Codeworth",
    seoTitleEn: "Machine Learning Consultant Manchester | ML Agency | Codeworth",
    seoDesc:
      "Машинне навчання у Манчестері: demand forecasting, predictive maintenance, fraud detection. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Manchester: demand forecasting, predictive maintenance, churn prediction. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "Tech-компаній", labelEn: "Tech companies", value: "10,000+" },
      { label: "Рітейл-підприємств", labelEn: "Retail businesses", value: "8,500+" },
      { label: "Виробничих підприємств", labelEn: "Manufacturing firms", value: "3,200+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£55k" },
      { label: "Зростання AI-сектору (2р)", labelEn: "AI sector growth (2yr)", value: "+34%" },
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
        q: "Чи маєте ви досвід з манчестерськими рітейлерами?",
        qEn: "Do you have experience with Manchester retailers?",
        a: "Так. Ми розробляли demand forecasting та personalisation ML для UK e-commerce та multi-location retail. Стек: XGBoost + Prophet для прогнозування, collaborative filtering для рекомендацій.",
        aEn: "Yes. We have built demand forecasting and personalisation ML for UK e-commerce and multi-location retail. Stack: XGBoost + Prophet for forecasting, collaborative filtering for personalisation.",
      },
      {
        q: "Як довго займає ML-проєкт для виробничого підприємства у Манчестері?",
        qEn: "How long does an ML project take for a Manchester manufacturing firm?",
        a: "Базовий predictive maintenance PoC — 4–5 тижнів. Повноцінна система з SCADA-інтеграцією та MLOps — 10–14 тижнів.",
        aEn: "A baseline predictive maintenance PoC takes 4–5 weeks. A full system with SCADA integration and MLOps pipeline takes 10–14 weeks.",
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
      "Бірмінгем — провідний промисловий та фінансовий центр Мідлендсу з великими виробничими підприємствами, автомобільними компаніями, фінансовими інститутами та зростаючим SaaS-сектором. ML-застосування охоплюють predictive maintenance для промислових підприємств, fraud detection для фінансових компаній та demand forecasting для рітейлу.",
    descriptionEn:
      "Birmingham is the Midlands' leading industrial and financial centre, home to major automotive manufacturers, engineering firms, and financial institutions including HSBC UK and Deutsche Bank. The city's manufacturing heritage creates strong demand for predictive maintenance, quality control CV, and process optimisation ML. Codeworth helps Birmingham businesses deploy ML without hiring full in-house data science teams.",
    seoTitle: "ML-консалтинг у Бірмінгемі | Машинне навчання для виробництва | Codeworth",
    seoTitleEn: "Machine Learning Consultant Birmingham | ML Agency | Codeworth",
    seoDesc:
      "Машинне навчання у Бірмінгемі: predictive maintenance, fraud detection, NLP. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Birmingham: predictive maintenance, fraud detection, demand forecasting. From £4,000. Codeworth.",
    stats: [
      { label: "Виробничих підприємств", labelEn: "Manufacturing firms", value: "5,200+" },
      { label: "Фінансових компаній", labelEn: "Financial companies", value: "2,800+" },
      { label: "Tech-стартапів", labelEn: "Tech startups", value: "1,900+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£52k" },
      { label: "Зростання digital-сектора", labelEn: "Digital sector growth (2yr)", value: "+28%" },
    ],
    faq: [
      {
        q: "Які ML-рішення потрібні бірмінгемському виробництву?",
        qEn: "What ML solutions do Birmingham manufacturing firms need?",
        a: "Найпопулярніші: predictive maintenance (прогноз відмов по сенсорних даних), computer vision для контролю якості (виявлення дефектів на конвеєрі), та process optimisation ML для зниження браку.",
        aEn: "Most popular: predictive maintenance (equipment failure prediction from sensor data), computer vision for quality control (defect detection on production lines), and process optimisation ML to reduce scrap rates and energy consumption.",
      },
      {
        q: "Чи є у вас досвід з автомобільним виробництвом?",
        qEn: "Do you have automotive manufacturing experience?",
        a: "Так. Ми розробляли ML для виробничих підприємств із SCADA-інтеграцією (Ignition, Siemens SIMATIC), OPC-UA endpoints та CMMS. Стек: LSTM Autoencoder для аномалій, YOLOv8 для CV-контролю якості.",
        aEn: "Yes. We have built ML for manufacturing plants with SCADA integration (Ignition, Siemens SIMATIC), OPC-UA endpoints, and CMMS. Stack: LSTM Autoencoder for anomaly detection, YOLOv8 for computer vision quality control.",
      },
      {
        q: "Скільки коштує ML для виробництва у Бірмінгемі?",
        qEn: "How much does manufacturing ML cost in Birmingham?",
        a: "Базовий predictive maintenance пакет — від £7,000 (5 тижнів). Повна industrial ML система з CV та MLOps — від £25,000 (14 тижнів). PoC-формат для пілотів — від £4,000.",
        aEn: "Baseline predictive maintenance package starts at £7,000 (5 weeks). Full industrial ML with CV and MLOps starts at £25,000 (14 weeks). PoC format from £4,000.",
      },
      {
        q: "Як ви інтегруєтесь із застарілими промисловими системами?",
        qEn: "How do you integrate with legacy industrial systems?",
        a: "Ми маємо конектори для OSIsoft PI, Wonderware, Ignition, GE Digital та OPC-UA/Modbus ендпойнтів. Для унікальних систем будуємо кастомні ETL-пайплайни без потреби замінювати існуючу інфраструктуру.",
        aEn: "We have connectors for OSIsoft PI, Wonderware, Ignition, GE Digital, and OPC-UA/Modbus. For unique systems we build custom ETL pipelines — no need to replace existing infrastructure.",
      },
      {
        q: "Чи можна почати з малого пілота?",
        qEn: "Can we start with a small pilot?",
        a: "Так, це рекомендований підхід. Спочатку — 4-тижневий PoC на одній виробничій лінії. Після підтвердження ROI — масштабування на весь завод. Ризик мінімальний, вартість початку — від £4,000.",
        aEn: "Yes, that is our recommended approach. Start with a 4-week PoC on one production line. After confirming ROI, scale to the full plant. Minimal risk, starting cost from £4,000.",
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
      "Единбург — технологічна столиця Шотландії та провідний центр AI-досліджень Великобританії. Місто є домом для Університету Единбурга (один з найвидатніших ML-дослідницьких центрів Європи), великих банків та страхових компаній, а також активної SaaS-екосистеми. ML-застосування особливо сильні у фінансових послугах, страхуванні та охороні здоров'я.",
    descriptionEn:
      "Edinburgh is Scotland's tech capital and one of the UK's leading AI research hubs, home to the University of Edinburgh — one of Europe's top ML research centres with Alan Turing Institute partnerships. Major financial institutions including NatWest and Standard Life Aberdeen base significant data operations here. The city's blend of financial services, NHS Scotland, and a vibrant SaaS startup scene creates diverse ML demand.",
    seoTitle: "ML-консалтинг в Единбурзі | Машинне навчання для фінансів | Codeworth",
    seoTitleEn: "Machine Learning Consultant Edinburgh | ML Agency Scotland | Codeworth",
    seoDesc:
      "Машинне навчання в Единбурзі: фінансові послуги, NHS Scotland, SaaS. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Edinburgh: financial services, NHS Scotland, SaaS ML. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "Фінансових компаній", labelEn: "Financial companies", value: "1,400+" },
      { label: "Дослідницьких інститутів", labelEn: "Research institutes", value: "12" },
      { label: "Tech-компаній", labelEn: "Tech companies", value: "4,500+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£58k" },
      { label: "AI-патентів від унів.", labelEn: "AI patents from local unis", value: "240+" },
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
        q: "Чи підходять ваші рішення для edinburgh-based insurance firms?",
        qEn: "Are your solutions suitable for Edinburgh insurance firms?",
        a: "Так. Для страхових компаній ми будуємо: actuarial ML для прогнозу збитків, fraud detection для страхових претензій, NLP для обробки claims. Всі рішення включають Solvency II/FCA Conduct Risk документацію.",
        aEn: "Yes. For insurance firms we build: actuarial ML for loss prediction, claims fraud detection, NLP for automated claims processing. All solutions include Solvency II and FCA Conduct Risk documentation.",
      },
      {
        q: "Чи маєте ви зв'язки з Університетом Единбурга?",
        qEn: "Do you follow research from the University of Edinburgh?",
        a: "Ми стежимо за ML-дослідженнями University of Edinburgh (School of Informatics) та Alan Turing Institute і впроваджуємо останні academic advances у production-рішення — RAGAS для оцінки RAG-систем, fairness-aware credit scoring тощо.",
        aEn: "We closely follow ML research from the University of Edinburgh and Alan Turing Institute, incorporating recent advances — including RAGAS for RAG evaluation and fairness-aware credit scoring — into our production implementations.",
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
      "Брістоль — третій за розміром tech-кластер Великобританії після Лондона і Манчестера з особливою силою в аерокосмічному секторі (Airbus, Rolls-Royce, BAE Systems), розвиненою AgriTech-екосистемою та зростаючим SaaS-ринком. ML-застосування охоплюють predictive maintenance для авіаційних компонентів, precision agriculture та MLOps для SaaS.",
    descriptionEn:
      "Bristol is the UK's third-largest tech cluster, with exceptional strength in aerospace (Airbus, Rolls-Royce, BAE Systems), a thriving deep-tech startup scene, and growing AgriTech driven by the South West's agricultural base. ML opportunities span predictive maintenance for aerospace components, precision agriculture for the surrounding region, computer vision for manufacturing quality, and MLOps for SaaS companies.",
    seoTitle: "ML-консалтинг у Брістолі | Машинне навчання для аерокосмосу | Codeworth",
    seoTitleEn: "Machine Learning Consultant Bristol | ML Agency South West | Codeworth",
    seoDesc:
      "Машинне навчання у Брістолі: аерокосмос, agritech, SaaS ML. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Bristol: aerospace predictive maintenance, agritech, SaaS ML. From £4,000. Codeworth.",
    stats: [
      { label: "Аерокосмічних компаній", labelEn: "Aerospace companies", value: "800+" },
      { label: "Tech-компаній", labelEn: "Tech companies", value: "6,800+" },
      { label: "AgriTech-стартапів", labelEn: "AgriTech startups", value: "120+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£56k" },
      { label: "Deep-tech стартапів", labelEn: "Deep-tech startups", value: "350+" },
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
        q: "Чи розробляєте ви AgriTech ML для Південного Заходу Англії?",
        qEn: "Do you build AgriTech ML for the South West?",
        a: "Так. Crop yield prediction (Sentinel-2 + погода + ґрунтові сенсори), pest detection (YOLOv8 на дронових знімках), та precision irrigation ML для фермерів Брістоля та навколишнього регіону.",
        aEn: "Yes. Crop yield prediction (Sentinel-2 + weather + soil sensors), pest detection (YOLOv8 on drone imagery), and precision irrigation ML that cuts input costs by 18% for South West farmers.",
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
      "Лідс — провідний фінансовий та digital-хаб Йоркширу з розвиненим сектором фінансових послуг. Місто є домом для Асda, Marks & Spencer, Yorkshire Building Society та великих NHS Trust. ML-застосування охоплюють demand forecasting для рітейлерів, fraud detection для банків та credit unions, та clinical ML для NHS West Yorkshire.",
    descriptionEn:
      "Leeds is Yorkshire's leading financial and digital hub, home to Asda (HQ), Marks & Spencer IT operations, Yorkshire Building Society, and major NHS Trusts. The city's blend of retail, financial services, and public sector creates strong ML demand across demand forecasting for grocery retail, fraud detection for building societies, and clinical ML for NHS West Yorkshire ICB.",
    seoTitle: "ML-консалтинг у Лідсі | Машинне навчання для рітейлу та фінансів | Codeworth",
    seoTitleEn: "Machine Learning Consultant Leeds | ML Agency Yorkshire | Codeworth",
    seoDesc:
      "Машинне навчання у Лідсі: рітейл forecasting, fraud detection, clinical ML. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Leeds: retail demand forecasting, fraud detection, clinical ML. From £4,000. Codeworth.",
    stats: [
      { label: "Рітейл-підприємств", labelEn: "Retail businesses", value: "6,200+" },
      { label: "Фінансових компаній", labelEn: "Financial companies", value: "1,800+" },
      { label: "Tech-компаній", labelEn: "Tech companies", value: "5,400+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£53k" },
      { label: "NHS Trust-ів", labelEn: "NHS Trusts", value: "12" },
    ],
    faq: [
      {
        q: "Які ML-можливості є у лідського рітейлу?",
        qEn: "What ML opportunities exist for Leeds retail companies?",
        a: "Великий потенціал у demand forecasting (особливо grocery та fashion), personalisation engines для e-commerce та dynamic pricing. Асda та M&S вже використовують ML — менші рітейлери можуть отримати подібну перевагу від £5,000.",
        aEn: "Major opportunities in demand forecasting (especially grocery and fashion), personalisation engines for e-commerce, and dynamic pricing. Asda and M&S already use ML at scale — smaller retailers can access similar capabilities from £5,000.",
      },
      {
        q: "Чи маєте ви досвід з Yorkshire Building Society та Credit Unions?",
        qEn: "Do you have experience with Yorkshire Building Society and Credit Unions?",
        a: "Ми розробляємо ML для будівельних товариств та кредитних спілок: credit scoring на альтернативних даних, fraud detection для mortgage applications, та churn prediction. Всі рішення відповідають FCA Conduct Rules та PRA Model Risk Guidelines.",
        aEn: "We build ML for building societies and credit unions: credit scoring on alternative data, fraud detection for mortgage applications, and churn prediction. All solutions comply with FCA Conduct Rules and PRA Model Risk Guidelines.",
      },
      {
        q: "Як ML допомагає NHS West Yorkshire?",
        qEn: "How can ML help NHS West Yorkshire?",
        a: "Ключові застосування: patient readmission prediction (−34% повторні госпіталізації), bed demand forecasting, та NLP для автоматизованої обробки клінічних нотаток. Всі рішення — з NHS DSPT compliance.",
        aEn: "Key applications: patient readmission prediction (−34% readmissions), bed demand forecasting for capacity planning, and NLP for automated clinical note processing. All solutions include NHS DSPT compliance.",
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
      "Глазго — найбільше місто Шотландії та активно зростаючий tech-хаб з особливою силою у сфері охорони здоров'я (NHS Greater Glasgow and Clyde — найбільший NHS Trust Великобританії), енергетики (renewables, North Sea) та фінансових послуг. Codeworth допомагає глазгоському бізнесу впроваджувати ML для клінічних рішень, оптимізації відновлюваної енергетики та predictive maintenance.",
    descriptionEn:
      "Glasgow is Scotland's largest city with exceptional strength in healthcare (NHS Greater Glasgow and Clyde — the UK's largest NHS Trust), energy (offshore wind, North Sea decommissioning, hydrogen), and financial services. The city also has a growing cybersecurity cluster. Codeworth helps Glasgow businesses deploy ML for clinical decision support, renewable energy forecasting, and offshore asset predictive maintenance.",
    seoTitle: "ML-консалтинг у Глазго | Машинне навчання для медицини та енергетики | Codeworth",
    seoTitleEn: "Machine Learning Consultant Glasgow | ML Agency Scotland | Codeworth",
    seoDesc:
      "Машинне навчання у Глазго: NHS, відновлювана енергетика, offshore ML. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Glasgow: NHS clinical ML, renewable energy forecasting, offshore predictive maintenance. From £4,000. Codeworth.",
    stats: [
      { label: "Медичних організацій", labelEn: "Healthcare organisations", value: "2,100+" },
      { label: "Енергетичних компаній", labelEn: "Energy companies", value: "1,400+" },
      { label: "Tech-компаній", labelEn: "Tech companies", value: "5,800+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£54k" },
      { label: "Offshore ML проєктів (регіон)", labelEn: "Offshore ML projects (region)", value: "80+" },
    ],
    faq: [
      {
        q: "Чи можете ви розробляти ML для NHS Greater Glasgow?",
        qEn: "Can you build ML for NHS Greater Glasgow and Clyde?",
        a: "Так. Клінічний ML з повним DSPT compliance, GDPR Article 9, NICE standards та DCB0129 clinical safety case. FHIR R4 конектори для EMIS та SystmOne. Ключові моделі: patient readmission prediction, sepsis early warning, bed demand forecasting.",
        aEn: "Yes. Clinical ML with full DSPT compliance, GDPR Article 9, NICE evidence standards, and DCB0129 clinical safety case. FHIR R4 connectors for EMIS and SystmOne. Key models: readmission prediction, sepsis early warning, bed demand forecasting.",
      },
      {
        q: "Чи є у вас досвід ML для відновлюваної енергетики?",
        qEn: "Do you have renewable energy ML experience?",
        a: "Так. Wind/solar generation forecasting (MAPE <3.5% на 48-годинний горизонт), load forecasting (MAPE <2.1%) та battery dispatch optimisation. NWP weather model integration (ECMWF, MetOffice) стандартна.",
        aEn: "Yes. Wind/solar generation forecasting (MAPE <3.5% on 48-hour horizon), grid load forecasting (MAPE <2.1%), and battery dispatch optimisation. NWP weather model integration (ECMWF, MetOffice) is standard.",
      },
      {
        q: "Чи підходять ваші рішення для нафтогазового сектору?",
        qEn: "Are your solutions suitable for the oil and gas sector?",
        a: "Так. Для offshore активів: predictive maintenance (LSTM на вібраційних та температурних сенсорах), corrosion detection CV та pipeline integrity ML. Включають offshore safety documentation та ATEX-сумісний деплой.",
        aEn: "Yes. For offshore assets: predictive maintenance (LSTM on vibration and temperature sensors), corrosion detection computer vision, and pipeline integrity ML. All include offshore safety documentation and ATEX-compatible deployment.",
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
      { label: "Tech-компаній", labelEn: "Tech companies", value: "3,200+" },
      { label: "AI-субсидій (DBW)", labelEn: "AI grants available (DBW)", value: "£2M+" },
      { label: "Медичних організацій", labelEn: "Healthcare organisations", value: "1,100+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£48k" },
      { label: "Зростання tech-сектора (3р)", labelEn: "Tech sector growth (3yr)", value: "+41%" },
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
      "Кембридж — глобальний центр AI та deep tech досліджень, де концентрація ML-таланту на душу населення є найвищою у Великобританії. Університет Кембриджу, ARM Holdings, Wayve та сотні deep tech стартапів формують унікальну екосистему для передових ML-проєктів. Cambridge AI Cluster (Silicon Fen) залучив £8+ млрд венчурних інвестицій за останні 5 років.",
    descriptionEn:
      "Cambridge is a global AI and deep tech research powerhouse — the UK's highest per-capita concentration of ML talent. University of Cambridge, ARM Holdings, Wayve, and hundreds of deep tech startups form the 'Silicon Fen' AI cluster, which attracted £8bn+ in venture investment over five years. Cambridge businesses demand research-grade ML solutions with rigorous evaluation standards.",
    seoTitle: "ML-консалтинг у Кембриджі | Машинне навчання Silicon Fen | Codeworth",
    seoTitleEn: "Machine Learning Consultant Cambridge | AI Agency Silicon Fen | Codeworth",
    seoDesc:
      "ML-консалтинг у Кембриджі: deep learning, NLP, computer vision. Silicon Fen AI cluster. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Cambridge: deep learning, NLP, computer vision for Silicon Fen startups. From £4,000. Codeworth.",
    stats: [
      { label: "AI-стартапів (Silicon Fen)", labelEn: "AI startups (Silicon Fen)", value: "600+" },
      { label: "ML-дослідників (Uni Cam)", labelEn: "ML researchers (Uni Cambridge)", value: "800+" },
      { label: "VC-інвестиції в AI (5р)", labelEn: "VC investment in AI (5yr)", value: "£8bn+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£68k" },
      { label: "Deep tech компаній", labelEn: "Deep tech companies", value: "1,400+" },
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
        q: "Чи маєте ви досвід з фармацевтичним та біотех ML?",
        qEn: "Do you have experience with pharma and biotech ML?",
        a: "Так. Drug discovery ML (molecule property prediction), clinical trial outcome modelling, genomics data pipelines та medical imaging. Дотримання GxP, MHRA та NHS IG вимог.",
        aEn: "Yes. Drug discovery ML (molecule property prediction), clinical trial outcome modelling, genomics data pipelines, and medical imaging. Compliance with GxP, MHRA, and NHS IG requirements.",
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
      "Оксфорд — другий за значимістю UK академічний AI центр після Кембриджу. Oxford Internet Institute, Oxford Robotics Institute та численні spinout компанії (включно з Exscientia — першою AI drug discovery компанією на LSE) формують унікальне середовище для biomed ML, NLP та safety-focused AI. Місцевий ринок охоплює фармацевтику, освіту та advanced manufacturing.",
    descriptionEn:
      "Oxford is the UK's second most significant academic AI hub, home to the Oxford Internet Institute, Oxford Robotics Institute, and spinouts including Exscientia (the first AI drug discovery company on the London Stock Exchange). Strengths: biomed ML, NLP, and AI safety research. The Oxford ecosystem spans pharma, MedTech, education technology, and advanced manufacturing.",
    seoTitle: "ML-консалтинг в Оксфорді | Машинне навчання для бізнесу | Codeworth",
    seoTitleEn: "Machine Learning Consultant Oxford | ML Agency Oxfordshire | Codeworth",
    seoDesc:
      "ML-консалтинг в Оксфорді: biomed ML, NLP, predictive analytics. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Oxford: biomed ML, NLP, predictive analytics for Oxfordshire businesses. From £4,000. Codeworth.",
    stats: [
      { label: "Фармацевтичних компаній", labelEn: "Pharmaceutical companies", value: "200+" },
      { label: "AI spinouts (Uni Oxford)", labelEn: "AI spinouts (Uni Oxford)", value: "300+" },
      { label: "MedTech компаній", labelEn: "MedTech companies", value: "180+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£65k" },
      { label: "EdTech стартапів", labelEn: "EdTech startups", value: "120+" },
    ],
    faq: [
      {
        q: "Чи є у вас досвід ML для фармацевтики в Оксфорді?",
        qEn: "Do you have experience with pharma ML in Oxford?",
        a: "Так. Drug discovery ML (QSAR modelling, molecule screening), clinical data analysis та bioinformatics pipelines. MHRA та ICH E9 guidance compliance для regulatory submissions.",
        aEn: "Yes. Drug discovery ML (QSAR modelling, molecule property screening), clinical data analysis, and bioinformatics pipelines. MHRA and ICH E9 guidance compliance for regulatory submissions.",
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
        q: "Чи підходить Codeworth для EdTech ML в Оксфорді?",
        qEn: "Is Codeworth suitable for EdTech ML in Oxford?",
        a: "Так. Adaptive learning systems, assessment ML, student outcome prediction та personalised content recommendation. Досвід GDPR for children's data та UK PECR compliance для EdTech платформ.",
        aEn: "Yes. Adaptive learning systems, assessment ML, student outcome prediction, and personalised content recommendation. Experience with GDPR for children's data and UK PECR compliance for EdTech platforms.",
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
      "Шеффілд — промисловий центр UK, що активно трансформується через advanced manufacturing та Industry 4.0 технології. AMRC (Advanced Manufacturing Research Centre) при Університеті Шеффілда є світовим лідером у machine learning для manufacturing — computer vision для QA, predictive maintenance та digital twin systems. Boeing, Rolls-Royce та BAE Systems є якорними партнерами.",
    descriptionEn:
      "Sheffield is the UK's advanced manufacturing hub, actively transforming through Industry 4.0 and ML-driven production optimisation. The AMRC (Advanced Manufacturing Research Centre) at the University of Sheffield is a world leader in ML for manufacturing — computer vision for quality assurance, predictive maintenance, and digital twin systems. Boeing, Rolls-Royce, and BAE Systems are anchor partners.",
    seoTitle: "ML-консалтинг у Шеффілді | Машинне навчання для Manufacturing | Codeworth",
    seoTitleEn: "Machine Learning Consultant Sheffield | ML for Manufacturing UK | Codeworth",
    seoDesc:
      "ML-консалтинг у Шеффілді: computer vision QA, predictive maintenance, Industry 4.0. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Sheffield: computer vision QA, predictive maintenance, Industry 4.0 ML. From £4,000. Codeworth.",
    stats: [
      { label: "Manufacturing компаній", labelEn: "Manufacturing companies", value: "2,800+" },
      { label: "AMRC партнерів", labelEn: "AMRC partners", value: "120+" },
      { label: "Advanced manufacturing jobs", labelEn: "Advanced manufacturing jobs", value: "50,000+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£50k" },
      { label: "Industry 4.0 проєктів (5р)", labelEn: "Industry 4.0 projects (5yr)", value: "400+" },
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
        q: "Чи підходить Codeworth для Sheffield steel / metals sector?",
        qEn: "Is Codeworth suitable for Sheffield's steel and metals sector?",
        a: "Так. Досвід з process optimisation ML для metals: temperature prediction, yield optimisation, scrap reduction через ML-моделювання хімічного складу та параметрів прокатки.",
        aEn: "Yes. Experience with process optimisation ML for metals: temperature prediction, yield optimisation, scrap reduction through ML modelling of chemical composition and rolling parameters.",
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
      "Ньюкасл є стратегічним AI хабом Північно-Східної Англії з сильним фокусом на охорону здоров'я ML (NHS Newcastle, National Innovation Centre for Data). Місцевий уряд активно субсидує AI впровадження через North East Investment Zone. Університети Ньюкасла та Нортумбрії виробляють значну кількість ML-спеціалістів, що робить місто привабливим для ML-стартапів з точки зору вартості talent.",
    descriptionEn:
      "Newcastle is the strategic AI hub of North East England with a strong focus on healthcare ML (Newcastle Hospitals NHS, National Innovation Centre for Data) and financial services. The North East Investment Zone provides active AI adoption subsidies. Newcastle and Northumbria Universities produce substantial ML talent, making the city attractive for ML startups from a cost perspective — significantly lower than London or Cambridge.",
    seoTitle: "ML-консалтинг у Ньюкаслі | Машинне навчання для Північно-Схід | Codeworth",
    seoTitleEn: "Machine Learning Consultant Newcastle | ML Agency North East | Codeworth",
    seoDesc:
      "ML-консалтинг у Ньюкаслі: NHS ML, data analytics, predictive models. Від £3,500. Codeworth.",
    seoDescEn:
      "Machine learning consultant Newcastle: NHS ML, data analytics, predictive models for North East businesses. From £3,500. Codeworth.",
    stats: [
      { label: "Охорони здоров'я організацій", labelEn: "Healthcare organisations", value: "600+" },
      { label: "Tech компаній", labelEn: "Tech companies", value: "1,800+" },
      { label: "Фінансових послуг компаній", labelEn: "Financial services firms", value: "400+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£46k" },
      { label: "North East Investment Zone grants", labelEn: "NE Investment Zone grants", value: "£80M+" },
    ],
    faq: [
      {
        q: "Чи є досвід ML для Newcastle NHS?",
        qEn: "Do you have experience with Newcastle NHS ML projects?",
        a: "Так. ML для NHS з повним DSPT compliance, UK GDPR, NICE guidelines. Ключові моделі для Newcastle: patient readmission prediction, surgical outcome risk, A&E demand forecasting.",
        aEn: "Yes. ML for NHS with full DSPT compliance, UK GDPR, and NICE guidelines. Key models for Newcastle NHS: patient readmission prediction, surgical outcome risk scoring, A&E demand forecasting.",
      },
      {
        q: "Чи є гранти для AI у Ньюкаслі?",
        qEn: "Are there AI grants available in Newcastle?",
        a: "Так. North East Investment Zone, Innovate UK North East, British Business Bank scale-up loans. National Innovation Centre for Data (NICD) при Newcastle University також надає технічну підтримку ML проєктам.",
        aEn: "Yes. North East Investment Zone, Innovate UK North East cluster, British Business Bank scale-up loans. The National Innovation Centre for Data (NICD) at Newcastle University also provides technical support for ML projects.",
      },
      {
        q: "Скільки коштує ML-консалтинг у Ньюкаслі?",
        qEn: "What does ML consulting cost in Newcastle?",
        a: "Ньюкасл — одне з найбільш cost-effective міст UK для ML. Наші пакети від £3,500 (PoC). Завдяки нижчим local overheads ми можемо запропонувати більш конкурентні ставки ніж лондонські ML-агентства.",
        aEn: "Newcastle is one of the UK's most cost-effective cities for ML. Our packages start from £3,500 (PoC). Lower local overheads allow us to offer more competitive rates than London-based ML agencies.",
      },
      {
        q: "Чи маєте ви досвід з North East fintech?",
        qEn: "Do you have North East fintech experience?",
        a: "Так. Bagshot, Atom Bank та інші North East fintech компанії використовують ML для credit scoring, fraud detection та customer analytics. Ми будуємо FCA-compliant ML для UK fintech.",
        aEn: "Yes. Atom Bank and other North East fintech companies actively use ML for credit scoring, fraud detection, and customer analytics. We build FCA-compliant ML solutions for UK fintech of all sizes.",
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
      { label: "Retail компаній (HQ)", labelEn: "Retail companies (HQ)", value: "120+" },
      { label: "Logistics/warehouse jobs", labelEn: "Logistics / warehouse jobs", value: "35,000+" },
      { label: "NHS Trust ліжок", labelEn: "NHS Trust beds", value: "1,700+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£48k" },
      { label: "Tech компаній", labelEn: "Tech companies", value: "2,100+" },
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
];

export function getCity(slug: string): GeoCity | undefined {
  return GEO_CITIES.find((c) => c.slug === slug);
}

export const GEO_CITY_SLUGS = GEO_CITIES.map((c) => c.slug);
