import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "linear-gradient(135deg, #1E1B4B 0%, #4338ca 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          {/* Nest arcs */}
          <path d="M20 78 Q60 28 100 78" stroke="#f59e0b" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M34 90 Q60 52 86 90" stroke="#fcd34d" strokeWidth="8.5" strokeLinecap="round" fill="none" />
          <path d="M48 100 Q60 78 72 100" stroke="#fde68a" strokeWidth="7" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
