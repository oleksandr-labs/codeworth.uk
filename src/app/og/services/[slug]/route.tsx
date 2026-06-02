import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const SERVICE_CONFIGS: Record<
  string,
  {
    title: string;
    subtitle: string;
    chips: string[];
    gradient: [string, string];
    accentColor: string;
    emoji: string;
    icon: "brain" | "chart" | "globe" | "code" | "megaphone" | "default";
  }
> = {
  "artificial-intelligence": {
    title: "Artificial Intelligence",
    subtitle: "LLM · RAG · Computer Vision · NLP",
    chips: ["GPT-4o", "RAG", "Fine-tuning", "GDPR-ready"],
    gradient: ["#1e1b4b", "#4c1d95"],
    accentColor: "#a78bfa",
    emoji: "🧠",
    icon: "brain",
  },
  "machine-learning": {
    title: "Machine Learning",
    subtitle: "Predictive Models · MLOps · Time Series",
    chips: ["XGBoost", "LSTM", "MLOps", "Scikit-learn"],
    gradient: ["#0c1a2e", "#1e3a5f"],
    accentColor: "#60a5fa",
    emoji: "📊",
    icon: "chart",
  },
  "website-dev": {
    title: "Website Development",
    subtitle: "Next.js · TypeScript · Responsive · SEO",
    chips: ["Next.js", "TypeScript", "Tailwind", "Core Web Vitals"],
    gradient: ["#1e1b4b", "#312e81"],
    accentColor: "#818cf8",
    emoji: "🌐",
    icon: "globe",
  },
  "web-apps": {
    title: "Web Applications",
    subtitle: "Full-stack · SaaS · APIs · Dashboards",
    chips: ["React", "Node.js", "PostgreSQL", "REST API"],
    gradient: ["#0f172a", "#1e3a5f"],
    accentColor: "#38bdf8",
    emoji: "💻",
    icon: "code",
  },
  seo: {
    title: "SEO Optimisation",
    subtitle: "Technical SEO · Content · Link Building",
    chips: ["Core Web Vitals", "Schema.org", "Link Building", "Analytics"],
    gradient: ["#052e16", "#14532d"],
    accentColor: "#4ade80",
    emoji: "🔍",
    icon: "default",
  },
  marketing: {
    title: "Digital Marketing",
    subtitle: "PPC · Social Ads · Email · Analytics",
    chips: ["Google Ads", "Meta Ads", "Email", "GA4"],
    gradient: ["#431407", "#7c2d12"],
    accentColor: "#fb923c",
    emoji: "📣",
    icon: "megaphone",
  },
};

function renderIcon(type: string, color: string) {
  if (type === "brain") {
    return (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <ellipse cx="18" cy="26" rx="12" ry="16" stroke={color} strokeWidth="2.5" fill="none" opacity="0.9" />
        <ellipse cx="34" cy="26" rx="12" ry="16" stroke={color} strokeWidth="2.5" fill="none" opacity="0.9" />
        <line x1="26" y1="10" x2="26" y2="42" stroke={color} strokeWidth="2" opacity="0.5" />
        <circle cx="18" cy="18" r="2.5" fill={color} opacity="0.7" />
        <circle cx="18" cy="34" r="2.5" fill={color} opacity="0.7" />
        <circle cx="34" cy="18" r="2.5" fill={color} opacity="0.7" />
        <circle cx="34" cy="34" r="2.5" fill={color} opacity="0.7" />
      </svg>
    );
  }
  if (type === "chart") {
    return (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <rect x="6" y="30" width="8" height="14" rx="2" fill={color} opacity="0.6" />
        <rect x="18" y="20" width="8" height="24" rx="2" fill={color} opacity="0.8" />
        <rect x="30" y="10" width="8" height="34" rx="2" fill={color} />
        <rect x="42" y="16" width="4" height="28" rx="2" fill={color} opacity="0.7" />
        <path d="M6 36 L22 24 L34 14 L46 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9" />
      </svg>
    );
  }
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="20" stroke={color} strokeWidth="2.5" fill="none" opacity="0.8" />
      <ellipse cx="26" cy="26" rx="10" ry="20" stroke={color} strokeWidth="2" fill="none" opacity="0.5" />
      <line x1="6" y1="26" x2="46" y2="26" stroke={color} strokeWidth="2" opacity="0.5" />
    </svg>
  );
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const cfg = SERVICE_CONFIGS[slug] ?? {
    title: "CodeNest Service",
    subtitle: "Professional Digital Solutions",
    chips: ["Next.js", "TypeScript", "Tailwind"],
    gradient: ["#1e1b4b", "#312e81"] as [string, string],
    accentColor: "#818cf8",
    emoji: "⚡",
    icon: "default" as const,
  };

  const [gradFrom, gradTo] = cfg.gradient;

  return new ImageResponse(
    (
      <div
        style={{
          background: `linear-gradient(135deg, ${gradFrom} 0%, ${gradTo} 60%, ${gradFrom} 100%)`,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background dots */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow circles */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${cfg.accentColor}22 0%, transparent 70%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${cfg.accentColor}15 0%, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 80px",
            position: "relative",
          }}
        >
          {/* Logo + brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 13,
                background: "linear-gradient(135deg, #312e81, #4338ca)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1.5px solid rgba(255,255,255,0.2)",
              }}
            >
              <svg width="34" height="34" viewBox="0 0 58 58" fill="none">
                <path d="M8 38 Q29 12 50 38" stroke="#f59e0b" strokeWidth="5.5" strokeLinecap="round" fill="none" />
                <path d="M15 44 Q29 24 43 44" stroke="#fcd34d" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                <path d="M22 50 Q29 38 36 50" stroke="#fde68a" strokeWidth="3.8" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 22, fontWeight: 600, letterSpacing: "0.02em" }}>
              CodeNest
            </span>
          </div>

          {/* Main content row */}
          <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
            {/* Icon */}
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: 28,
                background: `rgba(255,255,255,0.08)`,
                border: `1.5px solid ${cfg.accentColor}44`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {renderIcon(cfg.icon, cfg.accentColor)}
            </div>

            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: cfg.accentColor,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                CodeNest · AI & ML Services
              </div>
              <div
                style={{
                  fontSize: 64,
                  fontWeight: 800,
                  color: "white",
                  letterSpacing: "-1px",
                  lineHeight: 1.05,
                  marginBottom: 16,
                }}
              >
                {cfg.title}
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: "rgba(255,255,255,0.6)",
                  letterSpacing: "0.02em",
                  marginBottom: 32,
                }}
              >
                {cfg.subtitle}
              </div>

              {/* Chips */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {cfg.chips.map((chip) => (
                  <div
                    key={chip}
                    style={{
                      padding: "7px 18px",
                      borderRadius: 100,
                      background: `${cfg.accentColor}18`,
                      border: `1px solid ${cfg.accentColor}44`,
                      color: cfg.accentColor,
                      fontSize: 16,
                      fontWeight: 600,
                    }}
                  >
                    {chip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer bar */}
        <div
          style={{
            padding: "18px 80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid rgba(255,255,255,0.08)`,
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 16 }}>codenest.com.ua</span>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 16 }}>UK-based · GDPR-compliant</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
