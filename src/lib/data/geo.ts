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
      { label: "Tech-компаній", labelEn: "Tech companies", value: "12,000+" },
      { label: "Рітейл-підприємств", labelEn: "Retail businesses", value: "10,200+" },
      { label: "Виробничих підприємств", labelEn: "Manufacturing firms", value: "3,840+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£66k" },
      { label: "Зростання AI-сектору (2р)", labelEn: "AI sector growth (2yr)", value: "+41%" },
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
      { label: "Виробничих підприємств", labelEn: "Manufacturing firms", value: "6,250+" },
      { label: "Фінансових компаній", labelEn: "Financial companies", value: "3,350+" },
      { label: "Tech-стартапів", labelEn: "Tech startups", value: "2,300+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£62k" },
      { label: "Зростання digital-сектора", labelEn: "Digital sector growth (2yr)", value: "+34%" },
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
      { label: "Фінансових компаній", labelEn: "Financial companies", value: "1,700+" },
      { label: "Дослідницьких інститутів", labelEn: "Research institutes", value: "14" },
      { label: "Tech-компаній", labelEn: "Tech companies", value: "5,400+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£70k" },
      { label: "AI-патентів від унів.", labelEn: "AI patents from local unis", value: "290+" },
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
      { label: "Аерокосмічних компаній", labelEn: "Aerospace companies", value: "960+" },
      { label: "Tech-компаній", labelEn: "Tech companies", value: "8,200+" },
      { label: "AgriTech-стартапів", labelEn: "AgriTech startups", value: "145+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£67k" },
      { label: "Deep-tech стартапів", labelEn: "Deep-tech startups", value: "420+" },
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
      { label: "Рітейл-підприємств", labelEn: "Retail businesses", value: "7,450+" },
      { label: "Фінансових компаній", labelEn: "Financial companies", value: "2,200+" },
      { label: "Tech-компаній", labelEn: "Tech companies", value: "6,500+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£64k" },
      { label: "NHS Trust-ів", labelEn: "NHS Trusts", value: "14" },
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
      { label: "Медичних організацій", labelEn: "Healthcare organisations", value: "2,500+" },
      { label: "Енергетичних компаній", labelEn: "Energy companies", value: "1,700+" },
      { label: "Tech-компаній", labelEn: "Tech companies", value: "7,000+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£65k" },
      { label: "Offshore ML проєктів (регіон)", labelEn: "Offshore ML projects (region)", value: "95+" },
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
      { label: "AI-стартапів (Silicon Fen)", labelEn: "AI startups (Silicon Fen)", value: "720+" },
      { label: "ML-дослідників (Uni Cam)", labelEn: "ML researchers (Uni Cambridge)", value: "960+" },
      { label: "VC-інвестиції в AI (5р)", labelEn: "VC investment in AI (5yr)", value: "£9.5bn+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£82k" },
      { label: "Deep tech компаній", labelEn: "Deep tech companies", value: "1,700+" },
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
      { label: "Фармацевтичних компаній", labelEn: "Pharmaceutical companies", value: "240+" },
      { label: "AI spinouts (Uni Oxford)", labelEn: "AI spinouts (Uni Oxford)", value: "360+" },
      { label: "MedTech компаній", labelEn: "MedTech companies", value: "215+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£78k" },
      { label: "EdTech стартапів", labelEn: "EdTech startups", value: "145+" },
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
      { label: "Manufacturing компаній", labelEn: "Manufacturing companies", value: "3,350+" },
      { label: "AMRC партнерів", labelEn: "AMRC partners", value: "145+" },
      { label: "Advanced manufacturing jobs", labelEn: "Advanced manufacturing jobs", value: "60,000+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£60k" },
      { label: "Industry 4.0 проєктів (5р)", labelEn: "Industry 4.0 projects (5yr)", value: "480+" },
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
      { label: "Охорони здоров'я організацій", labelEn: "Healthcare organisations", value: "720+" },
      { label: "Tech компаній", labelEn: "Tech companies", value: "2,200+" },
      { label: "Фінансових послуг компаній", labelEn: "Financial services firms", value: "480+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£55k" },
      { label: "North East Investment Zone grants", labelEn: "NE Investment Zone grants", value: "£95M+" },
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
      "Брайтон — провідний хаб для креативних технологій та digital-агентств у Південній Англії, відомий своєю розвиненою game dev спільнотою, marketing tech та sustainable tech екосистемою. Близькість до Лондона залучає талановитих ML-спеціалістів, які надають перевагу менш вартісному ринку нерухомості. Codeworth обслуговує брайтонські digital-агентства, gaming-студії та маркетингові платформи з production-grade ML.",
    descriptionEn:
      "Brighton is the South of England's leading creative tech and digital agency hub, with a thriving game development community, marketing technology firms, and sustainable tech startups. Its proximity to London attracts strong ML talent at lower cost-of-living rates. Codeworth serves Brighton digital agencies, gaming studios, and martech platforms with production-grade ML for personalisation, player analytics, and campaign optimisation.",
    seoTitle: "ML-консалтинг у Брайтоні | Машинне навчання для digital-агентств | Codeworth",
    seoTitleEn: "Machine Learning Consultant Brighton | ML Agency | Codeworth",
    seoDesc:
      "Машинне навчання у Брайтоні: marketing AI, game analytics, personalisation. Від £3,500. Codeworth.",
    seoDescEn:
      "Machine learning consultant Brighton: marketing AI, game analytics, campaign optimisation ML. From £3,500. Codeworth ML agency.",
    stats: [
      { label: "ML-компаній", labelEn: "ML companies", value: "290+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "1,950+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "68+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£48k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "4+" },
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
      "Саутгемптон — провідний центр морського AI (ABP, Lloyd's Register), оборонних технологій (BAE Systems), університетських досліджень ML (University of Southampton — один із провідних AI-дослідницьких центрів Великобританії) та фармацевтично-біотехнологічного сектору. Codeworth допомагає саутгемптонським компаніям впроваджувати ML у maritime operations, оборонних застосуваннях та life sciences.",
    descriptionEn:
      "Southampton is a centre for maritime AI (ABP, Lloyd's Register), defence technology (BAE Systems proximity), world-class ML research (University of Southampton AI group), and a growing pharma and biotech sector. The combination of heavy industry, academia, and regulated sectors creates demand for robust, explainable ML systems. Codeworth delivers production ML for Southampton businesses in maritime, defence supply chain, and life sciences.",
    seoTitle: "ML-консалтинг у Саутгемптоні | Машинне навчання для maritime & defence | Codeworth",
    seoTitleEn: "Machine Learning Consultant Southampton | ML Agency | Codeworth",
    seoDesc:
      "Машинне навчання у Саутгемптоні: maritime AI, defence tech, biotech ML. Від £3,500. Codeworth.",
    seoDescEn:
      "Machine learning consultant Southampton: maritime AI, defence supply chain, biotech ML. From £3,500. Codeworth ML agency.",
    stats: [
      { label: "ML-компаній", labelEn: "ML companies", value: "310+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "2,100+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "72+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£50k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "5+" },
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
      "Лестер — динамічний центр Іст-Мідлендсу з кластерами life sciences та фармацевтики (Piramal, Walgreens Boots Alliance), текстильно-швейною промисловістю, що впроваджує ML-оптимізацію, та університетськими AI-дослідженнями. Логістичний парк SEGRO та різноманітне етнічне підприємництво роблять місто 19-м за величиною tech-кластером Великобританії. Codeworth будує ML-рішення для лестерських підприємств у сферах фармацевтики, рітейлу та логістики.",
    descriptionEn:
      "Leicester is a dynamic East Midlands centre with life sciences and pharma clusters (Piramal, Walgreens Boots Alliance), a textile and hosiery industry adopting ML optimisation, and strong university AI research from the University of Leicester. The SEGRO distribution park and diverse ethnic entrepreneurship make Leicester the UK's 19th largest tech cluster. Codeworth builds production ML for Leicester businesses in pharma, retail, and logistics.",
    seoTitle: "ML-консалтинг у Лестері | Машинне навчання для life sciences | Codeworth",
    seoTitleEn: "Machine Learning Consultant Leicester | ML Agency East Midlands | Codeworth",
    seoDesc:
      "Машинне навчання у Лестері: life sciences AI, фармацевтика, логістика, текстиль. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Leicester: life sciences AI, pharma ML, logistics forecasting, textile automation. From £4,000. Codeworth.",
    stats: [
      { label: "ML-компаній", labelEn: "ML companies", value: "280+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "1,850+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "62+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£47k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "4+" },
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
      "Ковентрі — центр автомобільної та EV-промисловості Мідлендсу з потужним впливом Jaguar Land Rover та London Electric Vehicle Company. Ініціатива WMCA (West Midlands Combined Authority) щодо розумного регіону, AI-дослідження Університету Ковентрі та CS-центр Університету Ворвіка (топ-10 UK) роблять місто провідним центром advanced manufacturing ML. Codeworth допомагає ковентрійському бізнесу впроваджувати ML у виробництво, логістику та EV-технології.",
    descriptionEn:
      "Coventry is the Midlands' automotive and EV manufacturing hub with strong ties to Jaguar Land Rover and the London Electric Vehicle Company. The WMCA smart region initiative, Coventry University AI research, and the University of Warwick's top-10 Computer Science department make the city a leading advanced manufacturing ML centre. Codeworth helps Coventry businesses implement ML in manufacturing, logistics, and EV technology.",
    seoTitle: "ML-консалтинг у Ковентрі | Машинне навчання для автовиробництва | Codeworth",
    seoTitleEn: "Machine Learning Consultant Coventry | Automotive AI Agency | Codeworth",
    seoDesc:
      "Машинне навчання у Ковентрі: automotive AI, EV ML, advanced manufacturing, WMCA smart region. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Coventry: automotive AI, EV manufacturing ML, advanced manufacturing automation. From £4,000. Codeworth.",
    stats: [
      { label: "ML-компаній", labelEn: "ML companies", value: "265+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "1,720+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "58+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£48k" },
      { label: "Реалізованих ML-проєктів", labelEn: "ML projects delivered", value: "3+" },
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
      "Плімут — провідний центр оборонних та морських технологій Великобританії. Тут розташовані Babcock International, Devonport Naval Base та QinetiQ, що формують потужний кластер оборонного AI та морського машинного навчання. Університет Плімута веде активні дослідження у галузі AI, а Plymouth Marine Laboratory використовує ML для аналізу океанічних даних. Команда Codeworth розробляє ML-рішення для оборонного сектору, морської промисловості та «розумного» порту.",
    descriptionEn:
      "Plymouth is the UK's foremost hub for defence and maritime technology. Babcock International, Devonport Naval Base, and QinetiQ anchor a strong defence AI and maritime ML cluster. Plymouth University's AI lab drives applied research, while Plymouth Marine Laboratory applies machine learning to ocean data analytics. Codeworth delivers ML solutions for Plymouth's defence contractors, maritime operators, and smart port initiatives.",
    seoTitle: "ML-консалтинг у Плімуті | Оборонні та морські технології AI | Codeworth",
    seoTitleEn: "Machine Learning Consultant Plymouth | Defence & Maritime AI | Codeworth",
    seoDesc:
      "ML-консалтинг у Плімуті: оборонний AI, морське машинне навчання, смарт-порт. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Plymouth: defence AI, maritime ML, smart port analytics. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "ML-компаній у регіоні", labelEn: "ML companies in the region", value: "195+" },
      { label: "ML-спеціалістів у місті", labelEn: "ML specialists in the city", value: "1,280+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "44+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£44,000" },
      { label: "Реалізованих проєктів Codeworth", labelEn: "Codeworth projects delivered", value: "2" },
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
    slug: "nottingham",
    nameUk: "Ноттінгем",
    nameEn: "Nottingham",
    region: "Іст-Мідлендс",
    regionEn: "East Midlands",
    population: "330,000",
    populationEn: "330,000",
    businesses: 18500,
    description:
      "Ноттінгем — провідний хаб ігрової та творчої технологічної індустрії Великобританії, де поєднуються потужний сектор фінансових послуг та зростаючий ML-кластер. Тут розташовані штаб-квартири Experian та Boots UK, регіональний офіс Capital One UK та значний кластер ігрових студій. Університет Ноттінгема веде передові дослідження у сфері AI, а коридор Іст-Мідлендс формує нову хвилю ML-стартапів. Codeworth надає ML-консалтинг для ноттінгемських компаній фінансового сектору, охорони здоров'я та ігрової індустрії.",
    descriptionEn:
      "Nottingham is a leading UK games and creative tech hub with a powerful financial services sector and a growing ML cluster. Experian and Boots UK are headquartered here alongside Capital One UK's regional office and a vibrant games studio cluster. The University of Nottingham drives cutting-edge AI research while the East Midlands tech corridor fosters a new wave of ML startups. Codeworth delivers ML consulting for Nottingham businesses across financial data, digital health, and interactive entertainment.",
    seoTitle: "ML-консалтинг у Ноттінгемі | Машинне навчання для бізнесу | Codeworth",
    seoTitleEn: "Machine Learning Consultant Nottingham | ML Agency | Codeworth",
    seoDesc:
      "ML-консалтинг у Ноттінгемі: Experian data science, Boots digital health AI, ігрова аналітика. Від £4,000. Codeworth.",
    seoDescEn:
      "Machine learning consultant Nottingham: financial data science, digital health AI, games analytics. From £4,000. Codeworth ML agency.",
    stats: [
      { label: "ML-компаній у місті", labelEn: "ML companies in the city", value: "280+" },
      { label: "ML-спеціалістів", labelEn: "ML specialists", value: "1,820+" },
      { label: "AI-стартапів", labelEn: "AI startups", value: "63+" },
      { label: "Середня зарплата DS", labelEn: "Avg Data Scientist salary", value: "£47,000" },
      { label: "Реалізованих проєктів Codeworth", labelEn: "Codeworth projects delivered", value: "4" },
    ],
    faq: [
      {
        q: "Як Experian у Ноттінгемі використовує ML у data science?",
        qEn: "How does Experian in Nottingham use ML for data science?",
        a: "Experian — один із найбільших роботодавців у сфері data science у Ноттінгемі, що розробляє кредитні скорингові моделі, системи виявлення шахрайства та ML-інструменти для аналізу фінансових даних. Codeworth допомагає компаніям-партнерам Experian та фінтех-стартапам регіону будувати сумісні ML-пайплайни, що інтегруються з продуктами Experian API.",
        aEn: "Experian is one of Nottingham's largest data science employers, developing credit scoring models, fraud detection systems, and ML-powered financial analytics tools. Codeworth helps Experian partner companies and regional fintech startups build compatible ML pipelines that integrate with Experian's API products.",
      },
      {
        q: "Чи може Boots UK впровадити AI у цифрову охорону здоров'я з Ноттінгема?",
        qEn: "Can Boots UK adopt AI for digital health from its Nottingham base?",
        a: "Так. Boots UK зі штаб-квартирою у Ноттінгемі активно інвестує у цифрову трансформацію охорони здоров'я. Codeworth розробляє ML-рішення для рітейл-аптек: персоналізовані рекомендації щодо здоров'я, прогнозування попиту на ліки та NLP-обробку даних пацієнтів із дотриманням вимог MHRA та ICO.",
        aEn: "Yes. Boots UK, headquartered in Nottingham, is actively investing in digital health transformation. Codeworth builds ML solutions for retail pharmacy: personalised health recommendations, medicine demand forecasting, and NLP processing of patient data compliant with MHRA and ICO regulations.",
      },
      {
        q: "Що таке ML-коридор Іст-Мідлендс і як він впливає на бізнес?",
        qEn: "What is the East Midlands ML corridor and how does it affect business?",
        a: "ML-коридор Іст-Мідлендс — це мережа технологічних компаній, університетів та інвесторів, що простягається від Ноттінгема до Лестера та Дербі. Завдяки нижчій вартості оренди офісів і розгалуженій мережі фахівців регіон пропонує привабливий баланс «лондонська якість — регіональна вартість» для ML-проєктів.",
        aEn: "The East Midlands ML corridor is a network of tech companies, universities, and investors spanning Nottingham, Leicester, and Derby. With lower office costs and a deep talent pool, the region offers an attractive London-quality-at-regional-cost proposition for ML projects.",
      },
      {
        q: "Які ML-дослідження веде Університет Ноттінгема?",
        qEn: "What AI research does the University of Nottingham conduct?",
        a: "Університет Ноттінгема веде дослідження у сферах комп'ютерного зору, обробки природної мови та AI для охорони здоров'я через такі підрозділи, як IDAC та Nottingham Biomedical Research Centre. Codeworth співпрацює з університетськими стартапами, допомагаючи перетворювати академічні ML-прототипи на комерційні продукти.",
        aEn: "The University of Nottingham conducts research in computer vision, natural language processing, and healthcare AI through units such as IDAC and the Nottingham Biomedical Research Centre. Codeworth partners with university spin-outs to commercialise academic ML prototypes into production-grade systems.",
      },
      {
        q: "Чи активний ринок ML для фінансових послуг у Ноттінгемі?",
        qEn: "Is the ML market for financial services active in Nottingham?",
        a: "Так. Присутність Experian, Capital One UK та низки страхових компаній і кредитних посередників формує стабільний попит на ML у фінансовому секторі. Основні напрями: кредитний скоринг, виявлення шахрайства, оцінка ризиків та автоматизація клієнтського сервісу. Codeworth виконав 4 ML-проєкти для ноттінгемських фінансових клієнтів.",
        aEn: "Yes. The presence of Experian, Capital One UK, and a cluster of insurance companies and credit intermediaries creates sustained ML demand in financial services. Key use cases include credit scoring, fraud detection, risk assessment, and customer service automation. Codeworth has delivered 4 ML projects for Nottingham financial clients.",
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
];

export function getCity(slug: string): GeoCity | undefined {
  return GEO_CITIES.find((c) => c.slug === slug);
}

export const GEO_CITY_SLUGS = GEO_CITIES.map((c) => c.slug);
