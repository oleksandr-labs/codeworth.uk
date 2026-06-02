import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";

interface Social {
  label: string;
  href: string;
  icon: "linkedin" | "github" | "twitter" | "instagram" | "telegram";
}

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  photo?: string;
  skills?: string[];
  socials?: Social[];
}

const SocialIcon = ({ icon }: { icon: Social["icon"] }) => {
  switch (icon) {
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );
    case "twitter":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    case "telegram":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      );
  }
};

interface TeamCardProps {
  member: TeamMember;
  variant?: "default" | "compact";
  className?: string;
}

export function TeamCard({ member, variant = "default", className }: TeamCardProps) {
  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-700/50 hover:border-neutral-200 dark:hover:border-neutral-600 transition-colors",
          className
        )}
      >
        <Avatar src={member.photo} name={member.name} size="md" />
        <div className="min-w-0">
          <div className="font-semibold text-neutral-900 dark:text-white truncate">
            {member.name}
          </div>
          <div className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
            {member.role}
          </div>
        </div>
        {member.socials && member.socials.length > 0 && (
          <div className="flex gap-2 ml-auto shrink-0">
            {member.socials.map((s) => (
              <a
                key={s.icon}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="p-1.5 rounded-lg text-neutral-400 dark:text-neutral-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
              >
                <SocialIcon icon={s.icon} />
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group flex flex-col bg-white dark:bg-neutral-800/60 rounded-2xl border border-neutral-100 dark:border-neutral-700/50 hover:border-neutral-200 dark:hover:border-neutral-600 hover:shadow-lg hover:shadow-neutral-200/40 dark:hover:shadow-neutral-900/40 transition-all duration-300 overflow-hidden",
        className
      )}
    >
      {/* Photo / gradient header */}
      <div className="relative h-40 bg-linear-to-br from-indigo-100 to-indigo-200 dark:from-indigo-950 dark:to-indigo-900 flex items-end justify-start px-6 pb-0 overflow-hidden">
        {/* bg blob */}
        <div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-indigo-500/10 dark:bg-indigo-400/10 blur-2xl" />
        {/* Avatar — overlaps the card body */}
        <div className="relative z-10 mb-[-32px]">
          <Avatar
            src={member.photo}
            name={member.name}
            size="xl"
            className="ring-4 ring-white dark:ring-neutral-800 shadow-lg"
          />
        </div>
      </div>

      <div className="pt-10 pb-6 px-6 flex flex-col flex-1">
        <div>
          <div className="font-bold text-lg text-neutral-900 dark:text-white leading-tight">
            {member.name}
          </div>
          <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">
            {member.role}
          </div>
        </div>

        {member.bio && (
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed flex-1">
            {member.bio}
          </p>
        )}

        {member.skills && member.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {member.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded-md text-xs font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/60"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {member.socials && member.socials.length > 0 && (
          <div className="flex gap-2 mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-700/50">
            {member.socials.map((s) => (
              <a
                key={s.icon}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="p-2 rounded-xl text-neutral-400 dark:text-neutral-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
              >
                <SocialIcon icon={s.icon} />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
