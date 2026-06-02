import { cn } from "@/lib/utils";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  status?: "online" | "offline" | "busy" | "away";
  className?: string;
}

const sizes: Record<AvatarSize, string> = {
  xs: "w-6 h-6 text-[10px]",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
};

const statusColors = {
  online: "bg-green-400",
  offline: "bg-neutral-300 dark:bg-neutral-600",
  busy: "bg-red-400",
  away: "bg-amber-400",
};

const statusSizes: Record<AvatarSize, string> = {
  xs: "w-1.5 h-1.5 border",
  sm: "w-2 h-2 border",
  md: "w-2.5 h-2.5 border-2",
  lg: "w-3 h-3 border-2",
  xl: "w-3.5 h-3.5 border-2",
};

function getInitials(name?: string): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Consistent color from name string
const AVATAR_COLORS = [
  "from-violet-500 to-indigo-600",
  "from-indigo-500 to-blue-600",
  "from-blue-500 to-cyan-600",
  "from-teal-500 to-emerald-600",
  "from-emerald-500 to-green-600",
  "from-amber-500 to-orange-500",
  "from-orange-500 to-rose-500",
  "from-rose-500 to-pink-600",
  "from-pink-500 to-fuchsia-600",
  "from-fuchsia-500 to-violet-600",
];

function nameToColor(name?: string): string {
  if (!name) return AVATAR_COLORS[0];
  const code = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_COLORS[code % AVATAR_COLORS.length];
}

export function Avatar({ src, alt, name, size = "md", status, className }: AvatarProps) {
  const gradient = nameToColor(name);

  return (
    <div className={cn("relative inline-flex shrink-0", className)}>
      <div
        className={cn(
          "rounded-full overflow-hidden flex items-center justify-center ring-2 ring-white dark:ring-neutral-900",
          sizes[size]
        )}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt ?? name ?? "Avatar"}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className={cn("w-full h-full flex items-center justify-center bg-linear-to-br font-semibold text-white", gradient)}>
            {getInitials(name)}
          </div>
        )}
      </div>

      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-white dark:border-neutral-900",
            statusColors[status],
            statusSizes[size]
          )}
          aria-label={status}
        />
      )}
    </div>
  );
}

// ─── AvatarGroup ─────────────────────────────────────────────────────────────

interface AvatarGroupProps {
  avatars: Pick<AvatarProps, "src" | "name" | "alt">[];
  max?: number;
  size?: AvatarSize;
  className?: string;
}

export function AvatarGroup({ avatars, max = 4, size = "md", className }: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <div className={cn("flex items-center", className)}>
      {visible.map((avatar, i) => (
        <div key={i} className={cn("relative", i > 0 && "-ml-2")}>
          <Avatar {...avatar} size={size} />
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            "-ml-2 relative rounded-full flex items-center justify-center ring-2 ring-white dark:ring-neutral-900",
            "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-semibold",
            sizes[size]
          )}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
