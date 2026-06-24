export interface BlogAuthor {
  slug: string;
  name: string;
  nameEn: string;
  role: string;
  roleEn: string;
  bio: string;
  bioEn: string;
  emoji: string;
  social?: { twitter?: string; linkedin?: string; github?: string };
}

export const BLOG_AUTHORS: BlogAuthor[] = [
  {
    slug: "oleksiy-kovalenko",
    name: "Олексій Коваленко",
    nameEn: "Oleksiy Kovalenko",
    role: "ML Engineer та співзасновник",
    roleEn: "ML Engineer & Co-founder",
    bio: "Співзасновник Codeworth із 7-річним досвідом у UK fintech ML. Спеціалізується на кредитному скорингу з дотриманням вимог FCA, ансамблевих методах — XGBoost та LightGBM — а також на управлінні ML-експериментами через Python та MLflow. Будував продакшн-системи для кредитних рішень, які обробляють мільйони заявок на рік під наглядом FCA. Глибоко розуміє вимоги FCA щодо пояснюваності моделей та документації згідно з Consumer Duty.",
    bioEn: "Co-founder of Codeworth with 7 years of UK fintech ML experience. Specialises in credit scoring with FCA compliance, ensemble methods including XGBoost and LightGBM, and ML experiment management via Python and MLflow. Has built production systems for credit decisioning processing millions of applications annually under FCA oversight. Holds deep knowledge of FCA model explainability requirements and Consumer Duty documentation standards.",
    emoji: "👨‍💻",
  },
  {
    slug: "denys-bondarenko",
    name: "Денис Бондаренко",
    nameEn: "Denys Bondarenko",
    role: "Data Scientist",
    roleEn: "Data Scientist",
    bio: "Data Scientist із спеціалізацією у computer vision та медичній візуалізації, відповідній вимогам NHS DSPT. Використовує PyTorch для глибокого навчання та займається часовими рядами для прогнозування в UK-виробництві. Має досвід впровадження ML-систем превентивного обслуговування на виробничих підприємствах Великої Британії. Добре орієнтується у питаннях відповідальності за даними в контексті NHS та промислових регуляторних вимог.",
    bioEn: "Data Scientist specialising in computer vision and medical imaging compliant with NHS DSPT standards. Works with PyTorch for deep learning and time series forecasting for UK manufacturing predictive maintenance. Has delivered ML-driven maintenance systems across British industrial facilities. Well-versed in NHS data governance and UK industrial regulatory requirements for deployed AI systems.",
    emoji: "🧠",
  },
  {
    slug: "kateryna-lysenko",
    name: "Катерина Лисенко",
    nameEn: "Kateryna Lysenko",
    role: "AI Strategy Consultant",
    roleEn: "AI Strategy Consultant",
    bio: "Консультант з AI-стратегії, що спеціалізується на ризиках моделей відповідно до SS1/23 FCA та впровадженні LLM і RAG-архітектур в корпоративних середовищах Великої Британії. Консультує фінансові установи щодо відповідального AI у контексті UK Equality Act, включаючи тестування на упередженість та аудит справедливості. Має досвід у стратегії NLP-перетворень від конкурентного аналізу до дорожньої карти впровадження. Веде навчання для керівних команд щодо регуляторних очікувань FCA до генеративного AI.",
    bioEn: "AI Strategy Consultant specialising in FCA SS1/23 model risk management and LLM and RAG enterprise deployments across UK organisations. Advises financial institutions on responsible AI under the UK Equality Act, including bias testing and fairness auditing of deployed models. Has end-to-end experience in NLP transformation strategy from competitive analysis through to deployment roadmaps. Delivers executive-level training on FCA regulatory expectations for generative AI.",
    emoji: "📊",
  },
  {
    slug: "alina-moroz",
    name: "Аліна Мороз",
    nameEn: "Alina Moroz",
    role: "MLOps інженер",
    roleEn: "MLOps Engineer",
    bio: "MLOps-інженер, що будує відмовостійкі ML production pipeline на Kubernetes у регіоні Azure UK South. Спеціалізується на MLflow та Seldon Core для версіонування моделей і обслуговування, а також на моніторингу дрейфу за допомогою Evidently AI. Проєктує pipeline управління моделями, що відповідають вимогам FCA до документації, аудиту та контролю моделей. Автоматизує retraining workflow та розгортання нових версій для фінтех-клієнтів із суворими вимогами до SLA.",
    bioEn: "MLOps Engineer building fault-tolerant ML production pipelines on Kubernetes in the Azure UK South region. Specialises in MLflow and Seldon Core for model versioning and serving, and drift monitoring with Evidently AI. Designs model governance pipelines compliant with FCA requirements for model documentation, audit trails, and change controls. Automates retraining workflows and canary deployments for fintech clients with strict SLA requirements.",
    emoji: "⚙️",
  },
  {
    slug: "marcus-powell",
    name: "Маркус Пауелл",
    nameEn: "Marcus Powell",
    role: "ML-архітектор рішень",
    roleEn: "ML Solutions Architect",
    bio: "ML-архітектор рішень Codeworth із 9-річним досвідом проєктування продакшн ML-систем для компаній зі списку FTSE 250. Спеціалізується на корпоративному дизайні ML-систем на Azure та AWS, із глибокою експертизою в клінічних AI-архітектурах, що відповідають вимогам NHS, та фреймворках модельних ризиків FCA. Керував ML-архітектурою для клієнтів у банківській, страховій та роздрібній сферах, впроваджуючи системи, що обробляють понад 50 млн прогнозів на день. Має сертифікати AWS Solutions Architect Professional та Azure AI Engineer.",
    bioEn: "Marcus is Codeworth UK Solutions Architect with 9 years designing production ML systems for FTSE 250 companies. He specialises in enterprise ML system design on Azure and AWS, with deep expertise in NHS-compliant clinical AI architectures and FCA model risk frameworks. Marcus has led ML architecture for banking, insurance, and retail clients, delivering systems processing 50M+ daily predictions. He holds AWS Solutions Architect Professional and Azure AI Engineer certifications.",
    emoji: "🏗️",
  },
  {
    slug: "priya-ramanathan",
    name: "Прія Раманатан",
    nameEn: "Priya Ramanathan",
    role: "Дослідник ML / NLP",
    roleEn: "ML Research Engineer",
    bio: "Дослідниця Codeworth, що поєднує академічні ML-дослідження з продакшн-впровадженнями для UK-бізнесів. Має ступінь PhD з обчислювальної лінгвістики UCL та спеціалізується на файн-тюнінгу LLM, проєктуванні RAG-архітектур і NLP для аналізу UK юридичних та фінансових документів. Регулярно публікується на тему прикладного NLP у регульованих галузях і очолює проєкти Codeworth із графами знань та оцінюванням LLM.",
    bioEn: "Priya is Codeworth Research Engineer bridging academic ML research and production UK business deployments. She holds a PhD in computational linguistics from UCL and specialises in LLM fine-tuning, RAG architecture design, and NLP for UK legal and financial document intelligence. Priya regularly publishes on applied NLP for regulated industries and leads Codeworth knowledge graph and LLM evaluation projects.",
    emoji: "🔬",
  },
];

export function getAuthorBySlug(slug: string): BlogAuthor | undefined {
  return BLOG_AUTHORS.find((a) => a.slug === slug);
}

export function getAuthorByName(name: string): BlogAuthor | undefined {
  return BLOG_AUTHORS.find((a) => a.name === name || a.nameEn === name);
}
