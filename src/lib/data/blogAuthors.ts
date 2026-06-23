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
    bio: "10+ років у розробці ML-систем. Спеціалізується на MLOps, NLP та production deployment на AWS/Azure. Будує масштабовані AI-продукти для UK та міжнародних клієнтів.",
    bioEn: "10+ years building ML systems for production. Specialises in MLOps, NLP, and cloud deployment on AWS/Azure. Builds scalable AI products for UK and international clients.",
    emoji: "👨‍💻",
  },
  {
    slug: "denys-bondarenko",
    name: "Денис Бондаренко",
    nameEn: "Denys Bondarenko",
    role: "Data Scientist",
    roleEn: "Data Scientist",
    bio: "Expертиза в computer vision, time series forecasting та deep learning. PyTorch contributor. Досвід ML-проєктів у retail, manufacturing та FinTech.",
    bioEn: "Expert in computer vision, time series forecasting, and deep learning. PyTorch contributor. ML project experience across retail, manufacturing, and FinTech.",
    emoji: "🧠",
  },
  {
    slug: "kateryna-lysenko",
    name: "Катерина Лисенко",
    nameEn: "Kateryna Lysenko",
    role: "AI Strategy Consultant",
    roleEn: "AI Strategy Consultant",
    bio: "Консультує UK бізнеси щодо AI/ML стратегії, ROI оцінки та регуляторної відповідності (FCA, UK GDPR). Досвід у FinTech та Healthcare.",
    bioEn: "Advises UK businesses on AI/ML strategy, ROI assessment, and regulatory compliance (FCA, UK GDPR). Experience across FinTech and Healthcare sectors.",
    emoji: "📊",
  },
  {
    slug: "alina-moroz",
    name: "Аліна Мороз",
    nameEn: "Alina Moroz",
    role: "MLOps інженер",
    roleEn: "MLOps Engineer",
    bio: "Будує надійні ML production pipeline: MLflow, Kubeflow, drift monitoring, retraining automation. Спеціаліст з AWS SageMaker та Azure ML.",
    bioEn: "Builds reliable ML production pipelines: MLflow, Kubeflow, drift monitoring, and retraining automation. Specialist in AWS SageMaker and Azure ML.",
    emoji: "⚙️",
  },
];

export function getAuthorBySlug(slug: string): BlogAuthor | undefined {
  return BLOG_AUTHORS.find((a) => a.slug === slug);
}

export function getAuthorByName(name: string): BlogAuthor | undefined {
  return BLOG_AUTHORS.find((a) => a.name === name || a.nameEn === name);
}
