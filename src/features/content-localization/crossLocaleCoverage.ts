// Cross-Locale Content-Coverage Check (T-007). Build-time/test-time
// mechanism enforcing content-localization/contract.md Commitment 5:
// every content entry present in one locale's collection must be present
// in the other two. Operates on the Content Layer's raw locale-keyed JSON
// directly, not the astro:content module — that module's generated store
// isn't reachable from a plain Vitest process outside astro build/dev
// (established limitation, see T-003's Implementation Report entry).

import { SUPPORTED_LOCALES, type SupportedLocale } from './localeResolution';

export type LocaleKeyedContent = Partial<Record<SupportedLocale, Record<string, string>>>;

export interface CoverageGap {
  collection: string;
  locale: SupportedLocale;
  missingKeys: string[];
}

/**
 * Returns one gap per locale that is missing at least one key present in
 * another locale for the same collection. An empty result means full
 * coverage across all three supported locales.
 */
export function findCoverageGaps(collectionName: string, content: LocaleKeyedContent): CoverageGap[] {
  const allKeys = new Set<string>();
  for (const locale of SUPPORTED_LOCALES) {
    for (const key of Object.keys(content[locale] ?? {})) {
      allKeys.add(key);
    }
  }

  const gaps: CoverageGap[] = [];
  for (const locale of SUPPORTED_LOCALES) {
    const localeKeys = new Set(Object.keys(content[locale] ?? {}));
    const missingKeys = [...allKeys].filter((key) => !localeKeys.has(key));
    if (missingKeys.length > 0) {
      gaps.push({ collection: collectionName, locale, missingKeys });
    }
  }

  return gaps;
}
