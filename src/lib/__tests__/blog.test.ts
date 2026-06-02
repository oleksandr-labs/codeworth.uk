import { BLOG_POSTS, BLOG_CATEGORIES } from "../data/blog";

describe("BLOG_POSTS", () => {
  it("contains at least 40 posts", () => {
    expect(BLOG_POSTS.length).toBeGreaterThanOrEqual(40);
  });

  it("every post has required fields", () => {
    BLOG_POSTS.forEach((p) => {
      expect(p.slug).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.excerpt).toBeTruthy();
      expect(p.category).toBeTruthy();
      expect(p.date).toBeTruthy();
      expect(p.readTime).toBeGreaterThan(0);
      expect(p.author).toBeTruthy();
      expect(p.emoji).toBeTruthy();
      expect(p.color).toMatch(/from-\S+/);
    });
  });

  it("all slugs are unique and URL-safe", () => {
    const slugs = BLOG_POSTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((s) => expect(s).toMatch(/^[a-z0-9-]+$/));
  });

  it("all posts have non-empty tags array", () => {
    BLOG_POSTS.forEach((p) => {
      expect(Array.isArray(p.tags)).toBe(true);
      expect(p.tags.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("dates are valid ISO date strings", () => {
    BLOG_POSTS.forEach((p) => {
      expect(p.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(new Date(p.date).toString()).not.toBe("Invalid Date");
    });
  });

  it("posts with nicheSlug have valid slug format", () => {
    BLOG_POSTS.filter((p) => p.nicheSlug).forEach((p) => {
      expect(p.nicheSlug).toMatch(/^[a-z0-9-]+$/);
    });
  });

  it("at least 10 posts have a nicheSlug", () => {
    const withNiche = BLOG_POSTS.filter((p) => p.nicheSlug);
    expect(withNiche.length).toBeGreaterThanOrEqual(10);
  });

  it("at least one featured post exists", () => {
    const featured = BLOG_POSTS.filter((p) => p.featured);
    expect(featured.length).toBeGreaterThanOrEqual(1);
  });

  it("next-js-seo-guide-2024 is among featured posts", () => {
    const featured = BLOG_POSTS.filter((p) => p.featured);
    expect(featured.some((p) => p.slug === "next-js-seo-guide-2024")).toBe(true);
  });

  it("all categories match BLOG_CATEGORIES (excluding 'all')", () => {
    const validLabels = BLOG_CATEGORIES.filter((c) => c.id !== "all").map((c) => c.label.uk);
    BLOG_POSTS.forEach((p) => {
      expect(validLabels).toContain(p.category);
    });
  });

  it("each category has at least one post", () => {
    const validCategories = BLOG_CATEGORIES.filter((c) => c.id !== "all");
    validCategories.forEach((cat) => {
      const posts = BLOG_POSTS.filter((p) => p.category === cat.label.uk);
      expect(posts.length).toBeGreaterThanOrEqual(1);
    });
  });
});

describe("BLOG_CATEGORIES", () => {
  it("first entry has id 'all'", () => {
    expect(BLOG_CATEGORIES[0].id).toBe("all");
  });

  it("contains all expected category ids", () => {
    const ids = BLOG_CATEGORIES.map((c) => c.id);
    expect(ids).toContain("seo");
    expect(ids).toContain("development");
    expect(ids).toContain("ai");
    expect(ids).toContain("design");
    expect(ids).toContain("ecommerce");
    expect(ids).toContain("cases");
    expect(ids).toContain("niches");
    expect(ids).toContain("performance");
    expect(ids).toContain("local-seo");
    expect(ids).toContain("mobile");
    expect(ids).toContain("email");
    expect(ids).toContain("social");
  });

  it("all entries have id, label.en, label.uk", () => {
    BLOG_CATEGORIES.forEach((c) => {
      expect(typeof c.id).toBe("string");
      expect(c.id.length).toBeGreaterThan(0);
      expect(typeof c.label.en).toBe("string");
      expect(c.label.en.length).toBeGreaterThan(0);
      expect(typeof c.label.uk).toBe("string");
      expect(c.label.uk.length).toBeGreaterThan(0);
    });
  });

  it("has at least 20 categories (including all)", () => {
    expect(BLOG_CATEGORIES.length).toBeGreaterThanOrEqual(20);
  });
});

describe("Blog post content", () => {
  it("all posts have at least one content array (content or contentEn)", () => {
    BLOG_POSTS.forEach((p) => {
      const hasContent = (p.content && p.content.length >= 4) || (p.contentEn && p.contentEn.length >= 4);
      expect(hasContent).toBe(true);
    });
  });

  it("each content paragraph is a non-empty string", () => {
    BLOG_POSTS.forEach((p) => {
      const paragraphs = (p.contentEn && p.contentEn.length > 0 ? p.contentEn : p.content) ?? [];
      paragraphs.forEach((paragraph) => {
        expect(typeof paragraph).toBe("string");
        expect(paragraph.length).toBeGreaterThan(50);
      });
    });
  });

  it("last content paragraph contains 'Висновок' or 'Conclusion' for most posts", () => {
    const postsWithConclusion = BLOG_POSTS.filter((p) => {
      const arr = p.contentEn && p.contentEn.length > 0 ? p.contentEn : p.content;
      if (!arr || arr.length === 0) return false;
      const last = arr[arr.length - 1];
      return last.includes("Висновок") || last.includes("Conclusion") || last.includes("conclusion");
    });
    expect(postsWithConclusion.length).toBeGreaterThanOrEqual(40);
  });

  it("content paragraphs are unique across posts (no copy-paste)", () => {
    const firstParagraphs = BLOG_POSTS.map((p) => {
      const arr = p.contentEn && p.contentEn.length > 0 ? p.contentEn : p.content;
      return arr?.[0] ?? "";
    }).filter(Boolean);
    expect(new Set(firstParagraphs).size).toBe(firstParagraphs.length);
  });
});
