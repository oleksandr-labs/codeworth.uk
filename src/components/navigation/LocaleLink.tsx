'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { useLocale } from '@/components/layout/LocaleProvider';

type Props = ComponentProps<typeof Link> & { href: string };

/**
 * Drop-in replacement for next/link that automatically
 * prepends the current locale to absolute paths.
 *
 * Usage: <LocaleLink href="/about">About</LocaleLink>
 * → renders as <a href="/en/about"> or <a href="/uk/about">
 */
export function LocaleLink({ href, ...props }: Props) {
  const lang = useLocale();
  const localizedHref =
    href.startsWith('/') && !href.startsWith(`/${lang}`)
      ? `/${lang}${href}`
      : href;

  return <Link href={localizedHref} {...props} />;
}
