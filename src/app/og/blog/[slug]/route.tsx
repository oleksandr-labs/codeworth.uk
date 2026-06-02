import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { BLOG_POSTS } from "@/lib/data/blog";

export const runtime = "edge";

// Map Tailwind gradient classes → hex pairs
const GRADIENT_MAP: Record<string, [string, string]> = {
  "from-indigo-500 to-violet-600": ["#6366f1", "#7c3aed"],
  "from-teal-400 to-cyan-600": ["#2dd4bf", "#0891b2"],
  "from-orange-400 to-red-500": ["#fb923c", "#ef4444"],
  "from-amber-400 to-yellow-500": ["#fbbf24", "#eab308"],
  "from-pink-400 to-rose-500": ["#f472b6", "#f43f5e"],
  "from-emerald-400 to-green-600": ["#34d399", "#16a34a"],
  "from-pink-500 to-rose-400": ["#ec4899", "#fb7185"],
  "from-blue-500 to-indigo-600": ["#3b82f6", "#4f46e5"],
  "from-cyan-500 to-blue-600": ["#06b6d4", "#2563eb"],
  "from-violet-500 to-purple-600": ["#8b5cf6", "#9333ea"],
  "from-lime-400 to-green-500": ["#a3e635", "#22c55e"],
  "from-sky-400 to-blue-500": ["#38bdf8", "#3b82f6"],
  "from-fuchsia-500 to-pink-600": ["#d946ef", "#db2777"],
  "from-rose-500 to-orange-400": ["#f43f5e", "#fb923c"],
  "from-green-400 to-teal-500": ["#4ade80", "#14b8a6"],
  "from-yellow-400 to-orange-500": ["#facc15", "#f97316"],
  "from-purple-500 to-indigo-600": ["#a855f7", "#4f46e5"],
  "from-red-500 to-rose-600": ["#ef4444", "#e11d48"],
};

function resolveGradient(colorClass: string): [string, string] {
  if (GRADIENT_MAP[colorClass]) return GRADIENT_MAP[colorClass];
  // Try to extract individual from/to parts
  const fromMatch = colorClass.match(/from-(\w+)-(\d+)/);
  const toMatch = colorClass.match(/to-(\w+)-(\d+)/);
  if (fromMatch && toMatch) {
    // Fallback to indigo gradient
    return ["#6366f1", "#4f46e5"];
  }
  return ["#1e1b4b", "#312e81"];
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  const title = post?.title ?? "CodeNest Blog";
  const excerpt = post?.excerpt ?? "Insights on web development, SEO, and digital marketing.";
  const category = post?.category ?? "Blog";
  const author = post?.author ?? "CodeNest Team";
  const readTime = post?.readTime ?? 5;
  const date = post?.date ? formatDate(post.date) : "";
  const emoji = post?.emoji ?? "📝";
  const colorClass = post?.color ?? "from-indigo-500 to-violet-600";
  const tags = post?.tags?.slice(0, 3) ?? [];

  const [gradFrom, gradTo] = resolveGradient(colorClass);

  // Darken gradients for better text contrast
  const bgFrom = `${gradFrom}dd`;
  const bgTo = `${gradTo}dd`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${bgFrom} 0%, ${bgTo} 100%)`,
        }}
      >
        {/* Dot pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)`,
            backgroundSize: "36px 36px",
          }}
        />
        {/* Top-right glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)`,
          }}
        />

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "52px 72px",
            position: "relative",
          }}
        >
          {/* Top row: logo + category badge */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: "rgba(0,0,0,0.25)",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="30" height="30" viewBox="0 0 58 58" fill="none">
                  <path d="M8 38 Q29 12 50 38" stroke="#f59e0b" strokeWidth="5.5" strokeLinecap="round" fill="none" />
                  <path d="M15 44 Q29 24 43 44" stroke="#fcd34d" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                  <path d="M22 50 Q29 38 36 50" stroke="#fde68a" strokeWidth="3.8" strokeLinecap="round" fill="none" />
                </svg>
              </div>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 20, fontWeight: 600, letterSpacing: "0.02em" }}>
                CodeNest Blog
              </span>
            </div>
            <div
              style={{
                padding: "6px 18px",
                borderRadius: 100,
                background: "rgba(0,0,0,0.25)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.85)",
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "0.04em",
                maxWidth: 300,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {category}
            </div>
          </div>

          {/* Article content */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 40 }}>
            {/* Emoji */}
            <div
              style={{
                width: 110,
                height: 110,
                borderRadius: 24,
                background: "rgba(0,0,0,0.2)",
                border: "1.5px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 58,
                flexShrink: 0,
              }}
            >
              {emoji}
            </div>

            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              {/* Title */}
              <div
                style={{
                  fontSize: title.length > 60 ? 42 : 52,
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.5px",
                  lineHeight: 1.1,
                  marginBottom: 16,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {title}
              </div>

              {/* Excerpt */}
              <div
                style={{
                  fontSize: 19,
                  color: "rgba(255,255,255,0.72)",
                  lineHeight: 1.5,
                  marginBottom: 24,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {excerpt}
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      style={{
                        padding: "4px 14px",
                        borderRadius: 100,
                        background: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        color: "rgba(255,255,255,0.8)",
                        fontSize: 14,
                        fontWeight: 500,
                      }}
                    >
                      #{tag}
                    </div>
                  ))}
                </div>
              )}

              {/* Meta row */}
              <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 14px",
                    borderRadius: 8,
                    background: "rgba(0,0,0,0.2)",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: 15,
                  }}
                >
                  ✍️ {author}
                </div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 15 }}>
                  📅 {date}
                </div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 15 }}>
                  ⏱ {readTime} min read
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "16px 72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            position: "relative",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 15 }}>codeworth.uk</span>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 15 }}>Web Studio · UK</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
