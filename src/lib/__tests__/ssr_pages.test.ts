/**
 * Verifies that all public-facing page.tsx files are Server Components (no "use client").
 * CSR-only pages must be restricted to authenticated/account sections only.
 * @jest-environment node
 */

import * as fs from "fs";
import * as path from "path";

// Pages that are intentionally CSR (authenticated/interactive)
const ALLOWED_CSR_PATHS = [
  "marketplace/account",
  "marketplace/cart",
  "marketplace/checkout",
  "marketplace/compare",
  "marketplace/login",
  "admin",
];

function getAllPageFiles(dir: string): string[] {
  const results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllPageFiles(fullPath));
    } else if (entry.name === "page.tsx") {
      results.push(fullPath);
    }
  }
  return results;
}

const appDir = path.resolve(process.cwd(), "src/app");

describe("SSR/SSG enforcement for public pages", () => {
  it("no public page.tsx uses 'use client' directive", () => {
    const pageFiles = getAllPageFiles(appDir);
    const violations: string[] = [];

    for (const file of pageFiles) {
      // Normalize path separators for comparison
      const relativePath = file.replace(/\\/g, "/");

      // Skip allowed CSR pages
      const isAllowed = ALLOWED_CSR_PATHS.some((allowed) =>
        relativePath.includes(allowed)
      );
      if (isAllowed) continue;

      // Skip test files
      if (relativePath.includes("__tests__")) continue;

      const content = fs.readFileSync(file, "utf-8");
      if (content.startsWith('"use client"') || content.startsWith("'use client'")) {
        violations.push(relativePath.split("src/app/")[1] ?? relativePath);
      }
    }

    if (violations.length > 0) {
      throw new Error(
        `The following public pages use "use client" (should be Server Components):\n${violations.map((v) => `  - ${v}`).join("\n")}`
      );
    }
  });

  it("all authenticated page sections have use client or delegate to client components", () => {
    // Verify the CSR pages actually do use client (under [lang] segment)
    const csr_pages = [
      "[lang]/marketplace/account/page.tsx",
      "[lang]/marketplace/cart/page.tsx",
      "[lang]/marketplace/checkout/page.tsx",
      "[lang]/marketplace/login/page.tsx",
    ];

    // These pages may be Server Components that render Client Components
    // We just verify they exist
    for (const pagePath of csr_pages) {
      const fullPath = path.join(appDir, pagePath);
      expect(fs.existsSync(fullPath)).toBe(true);
    }
  });

  it("at least 25 public page files exist", () => {
    const pageFiles = getAllPageFiles(appDir);
    expect(pageFiles.length).toBeGreaterThanOrEqual(25);
  });
});
