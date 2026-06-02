"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
  isUk: boolean;
}

export function ShareButtons({ url, title, isUk }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const el = document.createElement("input");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="mt-6 p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-700 flex items-center justify-between flex-wrap gap-3">
      <span className="text-sm font-medium text-neutral-700">
        {isUk ? "Поділитися статтею:" : "Share this article:"}
      </span>
      <div className="flex items-center gap-2 flex-wrap">
        <a
          href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-600 dark:text-neutral-300 hover:border-sky-300 hover:text-sky-600 transition-colors"
        >
          Telegram
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-600 dark:text-neutral-300 hover:border-blue-400 hover:text-blue-700 transition-colors"
        >
          Facebook
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-600 dark:text-neutral-300 hover:border-neutral-400 hover:text-neutral-900 dark:text-white transition-colors"
        >
          X / Twitter
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-600 dark:text-neutral-300 hover:border-blue-500 hover:text-blue-700 transition-colors"
        >
          LinkedIn
        </a>
        <button
          onClick={copyLink}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-600 dark:text-neutral-300 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-500" />
              {isUk ? "Скопійовано!" : "Copied!"}
            </>
          ) : (
            <>
              <Link2 className="w-3.5 h-3.5" />
              {isUk ? "Копіювати" : "Copy link"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
