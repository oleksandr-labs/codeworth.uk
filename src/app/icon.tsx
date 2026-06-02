import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "linear-gradient(135deg, #1E1B4B 0%, #4338ca 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Nest arcs */}
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M4 14 Q11 6 18 14" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M6.5 16 Q11 10 15.5 16" stroke="#fcd34d" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M9 18 Q11 15 13 18" stroke="#fde68a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
