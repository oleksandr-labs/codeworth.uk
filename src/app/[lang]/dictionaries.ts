import 'server-only';
import type { Locale } from '@/i18n';

type Dictionary = typeof import('./dictionaries/en.json');

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./dictionaries/en.json').then((m) => m.default),
  uk: () => import('./dictionaries/uk.json').then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

export type { Dictionary };
