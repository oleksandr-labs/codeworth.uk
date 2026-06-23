export type StartupCategory = "saas" | "marketplace" | "dtc" | "mobile" | "community" | "fintech" | "b2b" | "impact";

export interface StartupSolution {
  slug: string;
  title: string;
  titleEn: string;
  category: StartupCategory;
  tagline: string;
  taglineEn: string;
  description: string;
  descriptionEn: string;
  targetAudience: string;
  targetAudienceEn: string;
  hypothesis: string;
  hypothesisEn: string;
  deliveryDays: number;
  priceFrom: number; // GBP
  tags: string[];
  conversionGoal: string;
  conversionGoalEn: string;
  successMetric: string;
  successMetricEn: string;
  sections: string[];
  sectionsEn: string[];
  color: string;      // Tailwind bg color for accent
  textColor: string;  // Tailwind text color
  icon: string;       // emoji
}

export const STARTUP_CATEGORY_LABELS_EN: Record<StartupCategory, string> = {
  saas:        "SaaS",
  marketplace: "Marketplace",
  dtc:         "D2C / E-commerce",
  mobile:      "Mobile App",
  community:   "Community & Media",
  fintech:     "Fintech",
  b2b:         "B2B / Tools",
  impact:      "Impact / Social",
};

export const STARTUP_CATEGORY_LABELS_UK: Record<StartupCategory, string> = {
  saas:        "SaaS",
  marketplace: "Маркетплейс",
  dtc:         "D2C / E-commerce",
  mobile:      "Мобільний додаток",
  community:   "Спільнота та медіа",
  fintech:     "Фінтех",
  b2b:         "B2B / Інструменти",
  impact:      "Соціальний стартап",
};

export const STARTUP_SOLUTIONS: StartupSolution[] = [];

export function getStartupSolution(slug: string): StartupSolution | undefined {
  return STARTUP_SOLUTIONS.find((s) => s.slug === slug);
}

export function getStartupByCategory(category: StartupCategory): StartupSolution[] {
  return STARTUP_SOLUTIONS.filter((s) => s.category === category);
}
