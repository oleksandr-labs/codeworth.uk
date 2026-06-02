import { PROJECTS, CATEGORIES, NICHES } from "../data/portfolio";

describe("PROJECTS", () => {
  it("contains at least 20 projects", () => {
    expect(PROJECTS.length).toBeGreaterThanOrEqual(20);
  });

  it("every project has required fields", () => {
    PROJECTS.forEach((p) => {
      expect(p.slug).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.client).toBeTruthy();
      expect(p.category).toBeTruthy();
      expect(p.niche).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.result).toBeTruthy();
      expect(["simple", "medium", "complex"]).toContain(p.complexity);
      expect(p.year).toBeGreaterThanOrEqual(2021);
      expect(Array.isArray(p.tags)).toBe(true);
      expect(p.tags.length).toBeGreaterThanOrEqual(1);
      expect(Array.isArray(p.tech)).toBe(true);
      expect(p.tech.length).toBeGreaterThanOrEqual(1);
      expect(p.color).toMatch(/from-\S+/);
      expect(p.emoji).toBeTruthy();
    });
  });

  it("all slugs are unique and URL-safe", () => {
    const slugs = PROJECTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((s) => expect(s).toMatch(/^[a-z0-9-]+$/));
  });

  it("projects with nicheSlug have valid slug format", () => {
    PROJECTS.filter((p) => p.nicheSlug).forEach((p) => {
      expect(p.nicheSlug).toMatch(/^[a-z0-9-]+$/);
    });
  });

  it("projects with caseStudy have all required caseStudy fields", () => {
    PROJECTS.filter((p) => p.caseStudy).forEach((p) => {
      const cs = p.caseStudy!;
      expect(cs.challenge).toBeTruthy();
      expect(cs.solution).toBeTruthy();
      expect(Array.isArray(cs.results)).toBe(true);
      expect(cs.results.length).toBeGreaterThanOrEqual(2);
    });
  });

  it("includes the new real-estate-agency project", () => {
    const project = PROJECTS.find((p) => p.slug === "real-estate-agency");
    expect(project).toBeDefined();
    expect(project?.nicheSlug).toBe("realestate");
    expect(project?.complexity).toBe("complex");
  });

  it("includes the new education-platform project", () => {
    const project = PROJECTS.find((p) => p.slug === "education-platform");
    expect(project).toBeDefined();
    expect(project?.nicheSlug).toBe("education");
  });

  it("includes the new travel-hotel project", () => {
    const project = PROJECTS.find((p) => p.slug === "travel-hotel");
    expect(project).toBeDefined();
    expect(project?.nicheSlug).toBe("travel");
    expect(project?.complexity).toBe("medium");
  });
});

describe("CATEGORIES and NICHES", () => {
  it("CATEGORIES is a non-empty array", () => {
    expect(Array.isArray(CATEGORIES)).toBe(true);
    expect(CATEGORIES.length).toBeGreaterThan(0);
  });

  it("NICHES includes new categories", () => {
    expect(Array.isArray(NICHES)).toBe(true);
    expect(NICHES).toContain("Нерухомість");
    expect(NICHES).toContain("Освіта");
    expect(NICHES).toContain("Туризм");
  });

  it("NICHES includes 'Всі' as first entry", () => {
    expect(NICHES[0]).toBe("Всі");
  });
});
