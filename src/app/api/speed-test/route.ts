import { rateLimit } from "@/lib/rateLimit";

interface PSIAudit {
  displayValue?: string;
  title?: string;
  description?: string;
  details?: { type: string };
  score?: number | null;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  const rl = rateLimit(ip, { limit: 5, windowMs: 15 * 60 * 1000 });
  if (!rl.success) {
    return Response.json(
      { error: "Rate limit exceeded. Try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const rawUrl = (body as { url?: unknown })?.url;
  if (typeof rawUrl !== "string" || !rawUrl) {
    return Response.json({ error: "url is required" }, { status: 400 });
  }

  let validUrl: URL;
  try {
    validUrl = new URL(rawUrl);
    if (!["http:", "https:"].includes(validUrl.protocol)) throw new Error();
  } catch {
    return Response.json(
      { error: "Invalid URL. Must start with http:// or https://" },
      { status: 400 }
    );
  }

  const apiUrl = new URL(
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
  );
  apiUrl.searchParams.set("url", validUrl.href);
  apiUrl.searchParams.set("strategy", "mobile");
  apiUrl.searchParams.set("category", "performance");

  let psiResp: Response;
  try {
    psiResp = await fetch(apiUrl.href, { cache: "no-store" });
  } catch {
    return Response.json(
      { error: "Failed to reach PageSpeed API" },
      { status: 502 }
    );
  }

  if (!psiResp.ok) {
    return Response.json(
      { error: "PageSpeed API returned an error" },
      { status: 502 }
    );
  }

  const data = (await psiResp.json()) as {
    lighthouseResult?: {
      audits?: Record<string, PSIAudit>;
      categories?: { performance?: { score?: number } };
    };
  };

  const audits = data.lighthouseResult?.audits;
  const perf = data.lighthouseResult?.categories?.performance;

  const score = Math.round((perf?.score ?? 0) * 100);

  const opportunities = audits
    ? Object.values(audits)
        .filter(
          (a) =>
            a.details?.type === "opportunity" &&
            typeof a.score === "number" &&
            a.score < 0.9
        )
        .slice(0, 3)
        .map((a) => ({ title: a.title ?? "", description: a.description ?? "" }))
    : [];

  return Response.json({
    score,
    lcp: audits?.["largest-contentful-paint"]?.displayValue ?? null,
    cls: audits?.["cumulative-layout-shift"]?.displayValue ?? null,
    fcp: audits?.["first-contentful-paint"]?.displayValue ?? null,
    ttfb: audits?.["server-response-time"]?.displayValue ?? null,
    opportunities,
  });
}
