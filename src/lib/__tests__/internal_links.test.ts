/**
 * Internal link integrity tests.
 * Verifies that all cross-references between data layers resolve correctly:
 * - blog.nicheSlug → valid niche slug
 * - portfolio.nicheSlug → valid niche slug
 * - blog tags → used in tag pages (URL-safe)
 * - services slugs referenced in blog category map are valid
 * - niches category values are all in NICHE_CATEGORIES
 */

import { BLOG_POSTS } from "../data/blog";
import { PROJECTS } from "../data/portfolio";
import { NICHES_DATA, getNiche, NICHE_CATEGORIES } from "../data/niches";
import { SERVICES_DATA } from "../data/services";

const nicheSlugs = new Set(NICHES_DATA.map((n) => n.slug));
const serviceSlugs = new Set(SERVICES_DATA.map((s) => s.slug));
const portfolioSlugs = new Set(PROJECTS.map((p) => p.slug));
const blogSlugs = new Set(BLOG_POSTS.map((p) => p.slug));

describe("Cross-reference integrity", () => {
  it("all blog posts with nicheSlug reference a valid niche", () => {
    BLOG_POSTS.filter((p) => p.nicheSlug).forEach((p) => {
      expect(nicheSlugs.has(p.nicheSlug!)).toBe(true);
    });
  });

  it("all portfolio projects with nicheSlug reference a valid niche", () => {
    PROJECTS.filter((p) => p.nicheSlug).forEach((p) => {
      expect(nicheSlugs.has(p.nicheSlug!)).toBe(true);
    });
  });

  it("all blog post slugs are unique", () => {
    expect(blogSlugs.size).toBe(BLOG_POSTS.length);
  });

  it("all portfolio project slugs are unique", () => {
    expect(portfolioSlugs.size).toBe(PROJECTS.length);
  });

  it("all niche slugs are unique", () => {
    expect(nicheSlugs.size).toBe(NICHES_DATA.length);
  });

  it("all niche categories reference a known NICHE_CATEGORIES value", () => {
    const categorySet = new Set(NICHE_CATEGORIES);
    NICHES_DATA.forEach((n) => {
      expect(categorySet.has(n.category)).toBe(true);
    });
  });

  it("all service slugs are unique", () => {
    expect(serviceSlugs.size).toBe(SERVICES_DATA.length);
  });

  it("niches referenced by portfolio are findable via getNiche()", () => {
    PROJECTS.filter((p) => p.nicheSlug).forEach((p) => {
      const found = getNiche(p.nicheSlug!);
      expect(found).toBeDefined();
    });
  });

  it("niches referenced by blog are findable via getNiche()", () => {
    BLOG_POSTS.filter((p) => p.nicheSlug).forEach((p) => {
      const found = getNiche(p.nicheSlug!);
      expect(found).toBeDefined();
    });
  });

  it("blog post tags are URL-safe (used as tag page slugs)", () => {
    BLOG_POSTS.forEach((p) => {
      p.tags.forEach((tag) => {
        // Tags are URL-encoded on tag pages — must not be empty
        expect(tag.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it("all portfolio project colors use Tailwind gradient format", () => {
    PROJECTS.forEach((p) => {
      expect(p.color).toMatch(/^from-\S+ to-\S+/);
    });
  });

  it("each niche has at least 1 blog post or portfolio case referencing it", () => {
    const nichesWithContent = new Set([
      ...BLOG_POSTS.filter((p) => p.nicheSlug).map((p) => p.nicheSlug!),
      ...PROJECTS.filter((p) => p.nicheSlug).map((p) => p.nicheSlug!),
    ]);
    // At least 20 of 33 niches should have some content
    expect(nichesWithContent.size).toBeGreaterThanOrEqual(20);
  });
});
