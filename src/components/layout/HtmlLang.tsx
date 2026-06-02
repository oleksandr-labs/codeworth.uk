'use client';

import { useEffect } from 'react';

/**
 * Updates document.documentElement.lang after hydration.
 * Root layout sets lang="en" (primary locale); this corrects it to "uk" for Ukrainian pages.
 */
export function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
