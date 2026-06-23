import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Codeworth — ML/AI Consultancy for Business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #1E1B4B 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorations */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(99, 102, 241, 0.15)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(245, 158, 11, 0.1)",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: 22,
            background: "linear-gradient(135deg, #312e81, #4338ca)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
            boxShadow: "0 24px 48px rgba(99,102,241,0.45)",
            border: "2px solid rgba(255,255,255,0.15)",
          }}
        >
          <svg width="58" height="58" viewBox="0 0 58 58" fill="none">
            <path d="M8 38 Q29 12 50 38" stroke="#f59e0b" strokeWidth="5.5" strokeLinecap="round" fill="none" />
            <path d="M15 44 Q29 24 43 44" stroke="#fcd34d" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path d="M22 50 Q29 38 36 50" stroke="#fde68a" strokeWidth="3.8" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "white",
            letterSpacing: "-1px",
            marginBottom: 16,
          }}
        >
          Codeworth
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.65)",
            marginBottom: 40,
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          ML/AI Consultancy — from PoC to production for UK &amp; EU business
        </div>

        {/* Chips */}
        <div style={{ display: "flex", gap: 12 }}>
          {["Machine Learning", "Artificial Intelligence", "MLOps", "UK / EU"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 20px",
                borderRadius: 100,
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.85)",
                fontSize: 18,
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            color: "rgba(255,255,255,0.4)",
            fontSize: 18,
          }}
        >
          codeworth.uk
        </div>
      </div>
    ),
    { ...size }
  );
}
