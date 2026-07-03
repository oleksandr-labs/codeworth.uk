import { locales } from "@/i18n";

const BASE_URL = "https://codeworth.uk";

// sitemap.ts is split per-locale via generateSitemaps() (→ /sitemap/0.xml,
// /sitemap/1.xml) to keep each file small. Next.js reserves the exact path
// /sitemap.xml for that metadata convention and won't let a route.ts claim
// it directly, so this route serves the real index content, and a rewrite
// in next.config.ts maps the public /sitemap.xml URL to this route — the
// address visitors and crawlers use keeps working.
export async function GET() {
  const now = new Date().toISOString();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locales
  .map(
    (_, id) => `<sitemap>
<loc>${BASE_URL}/sitemap/${id}.xml</loc>
<lastmod>${now}</lastmod>
</sitemap>`
  )
  .join("\n")}
</sitemapindex>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
}
