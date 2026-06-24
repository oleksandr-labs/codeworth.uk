interface FlagIconProps {
  code: "en" | "uk";
  className?: string;
  size?: number;
}

function FlagGB({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.65)}
      viewBox="0 0 20 13"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      <rect width="20" height="13" fill="#012169" />
      {/* White diagonals */}
      <path d="M0 0L20 13M20 0L0 13" stroke="white" strokeWidth="3.4" />
      {/* Red diagonals */}
      <path d="M0 0L20 13" stroke="#C8102E" strokeWidth="1.8" />
      <path d="M20 0L0 13" stroke="#C8102E" strokeWidth="1.8" />
      {/* White cross */}
      <path d="M10 0V13" stroke="white" strokeWidth="4.6" />
      <path d="M0 6.5H20" stroke="white" strokeWidth="4.6" />
      {/* Red cross */}
      <path d="M10 0V13" stroke="#C8102E" strokeWidth="2.6" />
      <path d="M0 6.5H20" stroke="#C8102E" strokeWidth="2.6" />
    </svg>
  );
}

function FlagUA({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.65)}
      viewBox="0 0 20 13"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      <rect width="20" height="6.5" fill="#005BBB" />
      <rect y="6.5" width="20" height="6.5" fill="#FFD500" />
    </svg>
  );
}

export function FlagIcon({ code, size = 20, className }: FlagIconProps) {
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}>
      {code === "en" ? <FlagGB size={size} /> : <FlagUA size={size} />}
    </span>
  );
}
