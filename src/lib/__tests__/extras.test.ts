import { EXTRAS, EXTRA_CATEGORIES, type Extra, type ExtraCategory } from "../data/extras";

describe("EXTRAS", () => {
  it("contains at least 25 AI items", () => {
    expect(EXTRAS.length).toBeGreaterThanOrEqual(25);
  });

  it("every extra has required fields", () => {
    EXTRAS.forEach((e) => {
      expect(e.id).toBeTruthy();
      expect(e.title).toBeTruthy();
      expect(e.description).toBeTruthy();
      expect(e.emoji).toBeTruthy();
      expect(e.priceFrom).toBeGreaterThan(0);
      expect(e.deliveryDays).toBeGreaterThan(0);
      expect(Array.isArray(e.tags)).toBe(true);
      expect(e.tags.length).toBeGreaterThan(0);
    });
  });

  it("all IDs are unique", () => {
    const ids = EXTRAS.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("all IDs are URL-safe slugs", () => {
    EXTRAS.forEach((e) => {
      expect(e.id).toMatch(/^[a-z0-9-]+$/);
    });
  });

  it("all categories are valid ExtraCategory values", () => {
    const validCategories: ExtraCategory[] = ["pages", "features", "analytics", "integrations", "content", "security", "admin", "ecommerce", "marketing", "ai"];
    EXTRAS.forEach((e) => {
      expect(validCategories).toContain(e.category);
    });
  });

  it("isPopular and isNew are booleans", () => {
    EXTRAS.forEach((e) => {
      expect(typeof e.isPopular).toBe("boolean");
      expect(typeof e.isNew).toBe("boolean");
    });
  });

  it("priceFrom is a positive integer", () => {
    EXTRAS.forEach((e) => {
      expect(Number.isInteger(e.priceFrom)).toBe(true);
      expect(e.priceFrom).toBeGreaterThan(0);
    });
  });

  it("has items in all 10 categories", () => {
    const categories = new Set(EXTRAS.map((e) => e.category));
    expect(categories.size).toBe(10);
  });
});

describe("EXTRA_CATEGORIES", () => {
  it("contains exactly 1 category (AI)", () => {
    expect(EXTRA_CATEGORIES).toHaveLength(1);
  });

  it("every category has required fields", () => {
    EXTRA_CATEGORIES.forEach((cat) => {
      expect(cat.value).toBeTruthy();
      expect(cat.label).toBeTruthy();
      expect(cat.emoji).toBeTruthy();
      expect(cat.description).toBeTruthy();
    });
  });

  it("all category values are unique", () => {
    const values = EXTRA_CATEGORIES.map((c) => c.value);
    expect(new Set(values).size).toBe(values.length);
  });

  it("each category has at least one extra", () => {
    EXTRA_CATEGORIES.forEach((cat) => {
      const count = EXTRAS.filter((e) => e.category === cat.value).length;
      expect(count).toBeGreaterThan(0);
    });
  });
});
