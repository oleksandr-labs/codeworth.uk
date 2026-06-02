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
    role: "Провідний розробник і співзасновник",
    roleEn: "Lead Developer & Co-founder",
    bio: "10+ років у веб-розробці. Спеціалізується на Next.js, продуктивності та SEO-архітектурі. Будує масштабовані продукти для українських та міжнародних клієнтів. Ділиться практичним досвідом сучасної розробки.",
    bioEn: "10+ years building web products. Specialises in Next.js, performance, and SEO architecture. Builds scalable products for Ukrainian and international clients. Shares practical insights on modern web development.",
    emoji: "👨‍💻",
  },
  {
    slug: "denys-bondarenko",
    name: "Денис Бондаренко",
    nameEn: "Denys Bondarenko",
    role: "Frontend-розробник",
    roleEn: "Frontend Engineer",
    bio: "Експерт з React, Tailwind та дизайн-систем. Захоплюється UI-продуктивністю та доступними інтерфейсами. Контрибьютор відкритого ПЗ та спікер на frontend-мітапах.",
    bioEn: "Expert in React, Tailwind, and design systems. Passionate about UI performance and accessible interfaces. Open-source contributor and frontend meetup speaker.",
    emoji: "🎨",
  },
  {
    slug: "kateryna-lysenko",
    name: "Катерина Лисенко",
    nameEn: "Kateryna Lysenko",
    role: "SEO та маркетинг-спеціаліст",
    roleEn: "SEO & Marketing Specialist",
    bio: "Збільшує органічний трафік через технічне SEO, контент-стратегію та прийняття рішень на основі даних. Досвід з 50+ проєктами в Україні та Великобританії.",
    bioEn: "Drives organic growth through technical SEO, content strategy, and data-driven decision making. Experience with 50+ projects in Ukraine and the UK.",
    emoji: "📊",
  },
  {
    slug: "alina-moroz",
    name: "Аліна Мороз",
    nameEn: "Alina Moroz",
    role: "UX/UI дизайнер",
    roleEn: "UX/UI Designer",
    bio: "Створює орієнтовані на користувача інтерфейси, зосереджені на конверсії та залученні. Спеціаліст із Figma та дизайн-систем. Авторка нішевих demo-шаблонів Codeworth.",
    bioEn: "Creates user-centred experiences focused on conversion and engagement. Specialist in Figma and design systems. Author of Codeworth's niche demo templates.",
    emoji: "✨",
  },
];

export function getAuthorBySlug(slug: string): BlogAuthor | undefined {
  return BLOG_AUTHORS.find((a) => a.slug === slug);
}

export function getAuthorByName(name: string): BlogAuthor | undefined {
  return BLOG_AUTHORS.find((a) => a.name === name || a.nameEn === name);
}
