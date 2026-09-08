// Locale constants and pure content→metadata derivation for the
// i18n/Routing Layer (Task Catalog T-005). Kept free of the astro:content
// virtual module (unresolvable outside Astro's own Vite pipeline) so this
// logic is directly unit-testable under Vitest.

export const SUPPORTED_LOCALES = ['en', 'es', 'eu'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export interface PageMetadata {
  title: string;
  description: string;
}

// Page-level title/description are sourced from the Content Layer's
// existing navigation wordmark and Introduction tagline — no separate
// site-metadata field is invented, per this Task's boundary against
// introducing new schema (that is T-003's own scope).
export function derivePageMetadata(
  navigation: { wordmark: string },
  introduction: { tagline: string },
): PageMetadata {
  return {
    title: navigation.wordmark,
    description: introduction.tagline,
  };
}
