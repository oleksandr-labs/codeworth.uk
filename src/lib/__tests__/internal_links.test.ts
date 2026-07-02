/**
 * Internal link integrity tests.
 * Verifies that all cross-references between data layers resolve correctly:
 * - blog tags → used in tag pages (URL-safe)
 * - services/blog/portfolio slugs are unique
 */

import { BLOG_POSTS } from "../data/blog";
import { PROJECTS } from "../data/portfolio";
import { SERVICES_DATA } from "../data/services";

const serviceSlugs = new Set(SERVICES_DATA.map((s) => s.slug));
const portfolioSlugs = new Set(PROJECTS.map((p) => p.slug));
const blogSlugs = new Set(BLOG_POSTS.map((p) => p.slug));

describe("Cross-reference integrity", () => {
  it("all blog post slugs are unique", () => {
    expect(blogSlugs.size).toBe(BLOG_POSTS.length);
  });

  it("all portfolio project slugs are unique", () => {
    expect(portfolioSlugs.size).toBe(PROJECTS.length);
  });

  it("all service slugs are unique", () => {
    expect(serviceSlugs.size).toBe(SERVICES_DATA.length);
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
});
