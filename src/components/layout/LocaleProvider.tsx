'use client';

import { createContext, useContext } from 'react';
import type { Locale } from '@/i18n';

const LocaleContext = createContext<Locale>('en');

export function LocaleProvider({
  lang,
  children,
}: {
  lang: Locale;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={lang}>{children}</LocaleContext.Provider>
  );
}

/** Read the current locale in any Client Component */
export function useLocale(): Locale {
  return useContext(LocaleContext);
}
