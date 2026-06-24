export interface MLIndustry {
  slug: string;
  titleEn: string;
  titleUk: string;
  icon: string;
  color: string;
  descriptionEn: string;
  descriptionUk: string;
  statsEn: string;
  statsUk: string;
  applications: {
    titleEn: string;
    titleUk: string;
    roiEn: string;
    roiUk: string;
  }[];
  caseStudySlug?: string;
  regulatoryContextEn: string;
  regulatoryContextUk: string;
  keyClientsEn: string;
  relatedServices: string[];
}

export const INDUSTRIES: MLIndustry[] = [
  {
    slug: "financial-services",
    titleEn: "Financial Services",
    titleUk: "Фінансові послуги",
    icon: "🏦",
    color: "blue",
    descriptionEn:
      "FCA-regulated machine learning solutions for UK financial institutions — from credit scoring and fraud detection to AML monitoring and algorithmic trading. We help banks, fintechs, and insurers deploy explainable, compliant ML models that drive measurable commercial outcomes.",
    descriptionUk:
      "Рішення машинного навчання, регульовані FCA, для фінансових установ Великої Британії — від кредитного скорингу та виявлення шахрайства до моніторингу ПВК та алгоритмічної торгівлі. Ми допомагаємо банкам, фінтехам та страховикам впроваджувати прозорі, сумісні з регуляторними вимогами моделі ML.",
    statsEn: "£200B+ in UK financial services revenue influenced by ML annually",
    statsUk: "Понад £200 млрд доходу у фінансових послугах Великої Британії щорічно залежить від ML",
    applications: [
      {
        titleEn: "Credit Scoring",
        titleUk: "Кредитний скоринг",
        roiEn: "25–40% reduction in default rates",
        roiUk: "Зниження рівня дефолтів на 25–40%",
      },
      {
        titleEn: "Fraud Detection",
        titleUk: "Виявлення шахрайства",
        roiEn: "Up to 60% fewer false positives vs rule-based systems",
        roiUk: "До 60% менше хибних спрацьовувань порівняно з правиловими системами",
      },
      {
        titleEn: "AML Monitoring",
        titleUk: "Моніторинг ПВК",
        roiEn: "3–5× improvement in suspicious activity detection",
        roiUk: "Покращення виявлення підозрілої активності у 3–5 разів",
      },
      {
        titleEn: "Algorithmic Trading",
        titleUk: "Алгоритмічна торгівля",
        roiEn: "10–30% alpha generation improvement",
        roiUk: "Покращення генерації альфи на 10–30%",
      },
    ],
    regulatoryContextEn:
      "FCA SS1/23 (Model Risk Management), PRA SS3/18 (Model Risk). All models delivered with explainability documentation, model risk management frameworks, and SR 11-7 aligned governance.",
    regulatoryContextUk:
      "FCA SS1/23 (управління модельним ризиком), PRA SS3/18 (модельний ризик). Усі моделі постачаються з документацією щодо пояснюваності, фреймворками управління модельними ризиками та відповідністю SR 11-7.",
    keyClientsEn: "Lloyds, NatWest, Monzo, Starling, Barclays",
    relatedServices: ["machine-learning", "predictive-analytics", "mlops"],
  },
  {
    slug: "healthcare",
    titleEn: "Healthcare & Life Sciences",
    titleUk: "Охорона здоров'я та науки про життя",
    icon: "🏥",
    color: "green",
    descriptionEn:
      "NHS DSPT-compliant machine learning for clinical decision support, medical imaging analysis, patient pathway optimisation, and drug discovery. Our solutions help NHS trusts and life sciences organisations improve patient outcomes while meeting stringent UK data governance requirements.",
    descriptionUk:
      "Машинне навчання, сумісне з NHS DSPT, для підтримки клінічних рішень, аналізу медичних зображень, оптимізації маршрутів пацієнтів та розробки ліків. Наші рішення допомагають трастам NHS та організаціям у галузі наук про життя покращувати результати для пацієнтів.",
    statsEn: "£3.5B NHS efficiency savings potential identified through AI/ML annually",
    statsUk: "Потенційна економія для NHS від ШІ/ML складає £3,5 млрд щорічно",
    applications: [
      {
        titleEn: "Clinical Decision Support",
        titleUk: "Підтримка клінічних рішень",
        roiEn: "15–30% reduction in diagnostic errors",
        roiUk: "Зниження діагностичних помилок на 15–30%",
      },
      {
        titleEn: "Medical Imaging Analysis",
        titleUk: "Аналіз медичних зображень",
        roiEn: "40% faster radiology reporting turnaround",
        roiUk: "Прискорення обробки рентгенологічних звітів на 40%",
      },
      {
        titleEn: "Patient Pathway Optimisation",
        titleUk: "Оптимізація маршруту пацієнта",
        roiEn: "20% reduction in average length of stay",
        roiUk: "Скорочення середньої тривалості перебування на 20%",
      },
      {
        titleEn: "Drug Discovery",
        titleUk: "Розробка ліків",
        roiEn: "50% reduction in early-stage candidate screening time",
        roiUk: "Скорочення часу скринінгу кандидатів на ранніх стадіях на 50%",
      },
    ],
    regulatoryContextEn:
      "NHS DSPT (Data Security and Protection Toolkit), NHS SAFE (Secure Anonymised Federation Environment), MHRA AI/ML guidance. All solutions designed with data minimisation, pseudonymisation, and NHS Cloud First principles.",
    regulatoryContextUk:
      "NHS DSPT (набір інструментів захисту даних), NHS SAFE, керівництво MHRA щодо ШІ/ML. Усі рішення розроблені з урахуванням мінімізації даних, псевдонімізації та принципів NHS Cloud First.",
    keyClientsEn: "NHS Trusts, AstraZeneca, GlaxoSmithKline, Babylon Health",
    relatedServices: ["machine-learning", "computer-vision", "nlp", "predictive-analytics"],
  },
  {
    slug: "manufacturing",
    titleEn: "Manufacturing & Engineering",
    titleUk: "Виробництво та інженерія",
    icon: "⚙️",
    color: "orange",
    descriptionEn:
      "Made Smarter-aligned machine learning for UK manufacturers — predictive maintenance, visual quality inspection, demand forecasting, and energy optimisation. We help engineering firms reduce downtime, improve quality, and cut energy costs through industrial ML solutions.",
    descriptionUk:
      "Машинне навчання відповідно до програми Made Smarter для виробників Великої Британії — прогнозне технічне обслуговування, візуальний контроль якості, прогнозування попиту та оптимізація споживання енергії.",
    statsEn: "£7.4B potential productivity gains for UK manufacturing through AI adoption",
    statsUk: "Потенційне підвищення продуктивності британського виробництва завдяки ШІ складає £7,4 млрд",
    applications: [
      {
        titleEn: "Predictive Maintenance",
        titleUk: "Прогнозне технічне обслуговування",
        roiEn: "35–50% reduction in unplanned downtime",
        roiUk: "Скорочення незапланованих простоїв на 35–50%",
      },
      {
        titleEn: "Visual Quality Inspection",
        titleUk: "Візуальний контроль якості",
        roiEn: "99.5%+ defect detection accuracy",
        roiUk: "Точність виявлення дефектів понад 99,5%",
      },
      {
        titleEn: "Demand Forecasting",
        titleUk: "Прогнозування попиту",
        roiEn: "20–30% reduction in inventory holding costs",
        roiUk: "Зниження витрат на утримання запасів на 20–30%",
      },
      {
        titleEn: "Energy Optimisation",
        titleUk: "Оптимізація споживання енергії",
        roiEn: "10–25% reduction in energy consumption",
        roiUk: "Зниження споживання енергії на 10–25%",
      },
    ],
    regulatoryContextEn:
      "ISO 9001 (Quality Management), UKCA and CE marking compliance for AI-enabled products. Made Smarter programme alignment for SME manufacturers. Cyber Essentials Plus for connected factory solutions.",
    regulatoryContextUk:
      "ISO 9001 (управління якістю), відповідність маркуванню UKCA та CE для продуктів із функціями ШІ. Відповідність програмі Made Smarter для малих і середніх виробників.",
    keyClientsEn: "Rolls-Royce, BAE Systems, Jaguar Land Rover, Unilever",
    relatedServices: ["machine-learning", "computer-vision", "predictive-analytics", "mlops"],
  },
  {
    slug: "retail-ecommerce",
    titleEn: "Retail & E-commerce",
    titleUk: "Роздрібна торгівля та електронна комерція",
    icon: "🛒",
    color: "purple",
    descriptionEn:
      "ML solutions for UK's £120B e-commerce market — personalised recommendation engines, demand forecasting, dynamic price optimisation, and customer lifetime value modelling. We help retailers compete with platform giants through data-driven intelligence.",
    descriptionUk:
      "Рішення ML для британського ринку електронної комерції обсягом £120 млрд — персоналізовані рекомендаційні рушії, прогнозування попиту, динамічна оптимізація цін та моделювання довічної цінності клієнта.",
    statsEn: "£120B UK e-commerce market; ML-driven personalisation lifts revenue by 15–25%",
    statsUk: "Ринок е-комерції Великої Британії — £120 млрд; персоналізація на основі ML підвищує дохід на 15–25%",
    applications: [
      {
        titleEn: "Recommendation Engines",
        titleUk: "Рекомендаційні рушії",
        roiEn: "15–25% increase in average order value",
        roiUk: "Збільшення середньої вартості замовлення на 15–25%",
      },
      {
        titleEn: "Demand Forecasting",
        titleUk: "Прогнозування попиту",
        roiEn: "30% reduction in overstock and stockout events",
        roiUk: "Зниження надлишкових запасів та дефіциту на 30%",
      },
      {
        titleEn: "Price Optimisation",
        titleUk: "Оптимізація цін",
        roiEn: "5–12% gross margin improvement",
        roiUk: "Покращення валової маржі на 5–12%",
      },
      {
        titleEn: "Customer Lifetime Value Modelling",
        titleUk: "Моделювання довічної цінності клієнта",
        roiEn: "20–40% improvement in marketing ROI",
        roiUk: "Покращення ROI маркетингу на 20–40%",
      },
    ],
    regulatoryContextEn:
      "UK GDPR and Privacy and Electronic Communications Regulations (PECR) compliance for personalisation and profiling. ICO guidance on AI and data protection. Competition and Markets Authority (CMA) algorithmic pricing guidelines.",
    regulatoryContextUk:
      "Відповідність UK GDPR та PECR для персоналізації та профілювання. Керівництво ICO щодо ШІ та захисту даних. Рекомендації CMA щодо алгоритмічного ціноутворення.",
    keyClientsEn: "ASOS, Marks & Spencer, John Lewis, Tesco, Ocado",
    relatedServices: ["machine-learning", "predictive-analytics", "nlp"],
  },
  {
    slug: "legal-services",
    titleEn: "Legal Services",
    titleUk: "Юридичні послуги",
    icon: "⚖️",
    color: "gray",
    descriptionEn:
      "NLP and ML solutions for UK's £8.4B legal sector — intelligent contract analysis, document search and review, litigation outcome prediction, and compliance monitoring. We help law firms and in-house legal teams reduce manual effort and surface critical insights faster.",
    descriptionUk:
      "Рішення NLP та ML для британського юридичного сектору обсягом £8,4 млрд — інтелектуальний аналіз договорів, пошук та перевірка документів, прогнозування результатів судових процесів та моніторинг відповідності.",
    statsEn: "£8.4B UK legal services market; document review automation saves 60–80% of associate time",
    statsUk: "Ринок юридичних послуг Великої Британії — £8,4 млрд; автоматизація перевірки документів заощаджує 60–80% часу юристів",
    applications: [
      {
        titleEn: "Contract Analysis",
        titleUk: "Аналіз договорів",
        roiEn: "70% reduction in contract review time",
        roiUk: "Скорочення часу перевірки договорів на 70%",
      },
      {
        titleEn: "Document Search & Review",
        titleUk: "Пошук та перевірка документів",
        roiEn: "80% reduction in e-discovery costs",
        roiUk: "Зниження витрат на електронне виявлення на 80%",
      },
      {
        titleEn: "Litigation Prediction",
        titleUk: "Прогнозування результатів судових процесів",
        roiEn: "More informed settlement decisions, 15–20% cost savings",
        roiUk: "Більш обґрунтовані рішення щодо врегулювання, економія 15–20%",
      },
      {
        titleEn: "Compliance Monitoring",
        titleUk: "Моніторинг відповідності",
        roiEn: "Continuous monitoring vs quarterly manual reviews",
        roiUk: "Безперервний моніторинг замість щоквартальних ручних перевірок",
      },
    ],
    regulatoryContextEn:
      "SRA (Solicitors Regulation Authority) technology guidance, AML compliance under the Money Laundering Regulations 2017, UK GDPR for client data processing. Legal Professional Privilege considerations for AI-assisted document review.",
    regulatoryContextUk:
      "Технологічне керівництво SRA, відповідність ПВК згідно з Регламентом про відмивання грошей 2017, UK GDPR для обробки даних клієнтів. Міркування щодо правничої таємниці при перевірці документів за допомогою ШІ.",
    keyClientsEn: "Clifford Chance, Freshfields, DLA Piper",
    relatedServices: ["nlp", "llm-rag", "machine-learning"],
  },
  {
    slug: "energy-utilities",
    titleEn: "Energy & Utilities",
    titleUk: "Енергетика та комунальні послуги",
    icon: "⚡",
    color: "yellow",
    descriptionEn:
      "ML solutions supporting UK net-zero targets — energy demand forecasting, smart meter analytics, grid fault prediction, and renewable energy optimisation. We help energy companies and utilities maximise asset performance and accelerate the transition to clean energy.",
    descriptionUk:
      "Рішення ML для досягнення цілей Великої Британії щодо нульових викидів — прогнозування попиту на енергію, аналітика смарт-лічильників, прогнозування несправностей мережі та оптимізація відновлюваної енергетики.",
    statsEn: "UK energy transition requires £50B+ annual investment; ML optimisation cuts costs by 10–20%",
    statsUk: "Енергетичний перехід Великої Британії потребує понад £50 млрд щорічних інвестицій; оптимізація ML знижує витрати на 10–20%",
    applications: [
      {
        titleEn: "Energy Demand Forecasting",
        titleUk: "Прогнозування попиту на енергію",
        roiEn: "95%+ forecast accuracy, reducing balancing costs by 15%",
        roiUk: "Точність прогнозу понад 95%, зниження витрат на балансування на 15%",
      },
      {
        titleEn: "Smart Meter Analytics",
        titleUk: "Аналітика смарт-лічильників",
        roiEn: "20% reduction in customer churn through proactive engagement",
        roiUk: "Зниження відтоку клієнтів на 20% завдяки проактивній взаємодії",
      },
      {
        titleEn: "Grid Fault Prediction",
        titleUk: "Прогнозування несправностей мережі",
        roiEn: "40% reduction in unplanned outage duration",
        roiUk: "Скорочення тривалості незапланованих відключень на 40%",
      },
      {
        titleEn: "Renewable Optimisation",
        titleUk: "Оптимізація відновлюваної енергетики",
        roiEn: "8–15% increase in renewable generation yield",
        roiUk: "Збільшення виробітку відновлюваної енергії на 8–15%",
      },
    ],
    regulatoryContextEn:
      "Ofgem regulatory framework, TCFD (Task Force on Climate-related Financial Disclosures) reporting requirements, BEIS Net Zero Strategy compliance. Smart Metering Implementation Programme (SMIP) data standards.",
    regulatoryContextUk:
      "Регуляторна база Ofgem, вимоги до звітності TCFD, відповідність стратегії BEIS щодо нульових викидів. Стандарти даних Програми впровадження смарт-лічильників (SMIP).",
    keyClientsEn: "National Grid, SSE, Centrica, Octopus Energy",
    relatedServices: ["machine-learning", "predictive-analytics", "mlops"],
  },
  {
    slug: "insurance",
    titleEn: "Insurance",
    titleUk: "Страхування",
    icon: "🛡️",
    color: "indigo",
    descriptionEn:
      "ML solutions for UK's £80B insurance market — intelligent underwriting and pricing, claims fraud detection, customer lifetime value optimisation, and telematics-based scoring. We help insurers price risk accurately, reduce fraud losses, and improve customer retention.",
    descriptionUk:
      "Рішення ML для британського страхового ринку обсягом £80 млрд — інтелектуальний андерайтинг та ціноутворення, виявлення шахрайства у претензіях, оптимізація довічної цінності клієнта та телематичне скорингування.",
    statsEn: "£80B UK insurance market; ML fraud detection saves £1.3B+ annually",
    statsUk: "Страховий ринок Великої Британії — £80 млрд; виявлення шахрайства за допомогою ML заощаджує понад £1,3 млрд щорічно",
    applications: [
      {
        titleEn: "ML Underwriting & Pricing",
        titleUk: "Андерайтинг та ціноутворення на основі ML",
        roiEn: "10–20% improvement in combined ratio",
        roiUk: "Покращення комбінованого коефіцієнта на 10–20%",
      },
      {
        titleEn: "Claims Fraud Detection",
        titleUk: "Виявлення шахрайства у претензіях",
        roiEn: "30–50% more fraudulent claims identified",
        roiUk: "Виявлення шахрайських претензій більше на 30–50%",
      },
      {
        titleEn: "Customer Lifetime Value",
        titleUk: "Довічна цінність клієнта",
        roiEn: "25% improvement in retention of high-value customers",
        roiUk: "Покращення утримання цінних клієнтів на 25%",
      },
      {
        titleEn: "Telematics Scoring",
        titleUk: "Телематичне скорингування",
        roiEn: "15–30% reduction in claims frequency for telematics policyholders",
        roiUk: "Зниження частоти претензій для власників телематичних полісів на 15–30%",
      },
    ],
    regulatoryContextEn:
      "FCA and PRA dual regulation, Solvency II (UK version post-Brexit) for capital modelling, FCA Consumer Duty for fair pricing, ICO guidance on automated decision-making in insurance.",
    regulatoryContextUk:
      "Подвійне регулювання FCA та PRA, Solvency II (версія Великої Британії після Brexit) для моделювання капіталу, Споживчий обов'язок FCA щодо справедливого ціноутворення.",
    keyClientsEn: "Aviva, Legal & General, Direct Line, RSA, Zurich",
    relatedServices: ["machine-learning", "predictive-analytics", "artificial-intelligence"],
  },
  {
    slug: "logistics-transport",
    titleEn: "Logistics & Transport",
    titleUk: "Логістика та транспорт",
    icon: "🚚",
    color: "red",
    descriptionEn:
      "ML solutions for UK's £77B logistics sector — intelligent route optimisation, delivery time prediction, warehouse automation, and fleet predictive maintenance. We help logistics operators reduce costs, improve on-time delivery, and cut carbon emissions.",
    descriptionUk:
      "Рішення ML для британського логістичного сектору обсягом £77 млрд — інтелектуальна оптимізація маршрутів, прогнозування часу доставки, автоматизація складів та прогнозне обслуговування автопарку.",
    statsEn: "£77B UK logistics market; ML route optimisation cuts fuel costs by 10–20%",
    statsUk: "Логістичний ринок Великої Британії — £77 млрд; оптимізація маршрутів за допомогою ML знижує витрати на паливо на 10–20%",
    applications: [
      {
        titleEn: "Route Optimisation",
        titleUk: "Оптимізація маршрутів",
        roiEn: "10–20% reduction in fuel and operational costs",
        roiUk: "Зниження витрат на паливо та операційних витрат на 10–20%",
      },
      {
        titleEn: "Delivery Time Prediction",
        titleUk: "Прогнозування часу доставки",
        roiEn: "95%+ on-time delivery accuracy, 30% fewer customer contacts",
        roiUk: "Точність своєчасної доставки понад 95%, на 30% менше звернень клієнтів",
      },
      {
        titleEn: "Warehouse ML",
        titleUk: "ML для складів",
        roiEn: "25–40% improvement in pick-and-pack efficiency",
        roiUk: "Підвищення ефективності комплектування на 25–40%",
      },
      {
        titleEn: "Fleet Predictive Maintenance",
        titleUk: "Прогнозне обслуговування автопарку",
        roiEn: "30% reduction in vehicle breakdown incidents",
        roiUk: "Зниження кількості поломок транспортних засобів на 30%",
      },
    ],
    regulatoryContextEn:
      "DVSA (Driver and Vehicle Standards Agency) compliance for fleet safety, DfT (Department for Transport) Future of Transport regulatory framework, ORR (Office of Rail and Road) for rail freight. UK GDPR for driver and customer data.",
    regulatoryContextUk:
      "Відповідність DVSA для безпеки автопарку, регуляторна база DfT «Майбутнє транспорту», ORR для залізничних вантажних перевезень. UK GDPR для даних водіїв та клієнтів.",
    keyClientsEn: "Royal Mail, DHL, Amazon Logistics, DPD, Network Rail",
    relatedServices: ["machine-learning", "predictive-analytics", "computer-vision"],
  },
];
