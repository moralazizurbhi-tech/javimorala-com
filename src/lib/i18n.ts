// i18n/Routing Layer — core resolution interface (Task Catalog T-005;
// content-localization/technical-design.md, i18n/Routing Layer).
//
// Consumed by per-locale static routes (src/pages/[locale]/index.astro)
// and, later, by Domain Section Features (Hero, About Narrative, Direct
// Contact — Task Catalog T-008/T-009/T-010), which must read locale-
// resolved content only through this Layer, never the Content Layer
// directly (Project Architecture, Component Relationships).
//
// Scope note: this module realizes Commitments 2 and 3 only (per-locale
// static routes; content/metadata resolution). The override→detected→
// English resolution priority for the language-agnostic root (Commitments
// 1, 4) is T-006's own scope, not this module's.

import { getEntry } from 'astro:content';
import { type Locale, type PageMetadata, derivePageMetadata } from './locale';

export { SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale, type PageMetadata } from './locale';

export interface ResolvedLocaleContent {
  locale: Locale;
  introduction: { headline: string; tagline: string };
  personalNarrative: { narrative: string[] };
  connection: { heading: string; ctaText: string; farewell: string[] };
  navigation: { wordmark: string; aboutLabel: string; contactLabel: string };
  metadata: PageMetadata;
}

// Resolves every Content Layer collection for one locale. Content-
// collection completeness across all three locales is assumed guaranteed
// before a route is actually built for real (content-localization
// Technical Design, Design Decisions; hero-presentation/technical-
// design.md, Known Limitations) — no runtime fallback for a missing
// locale entry is defined here. Until Task Catalog T-025 authors final
// Spanish/Euskera copy, the es/eu entries resolved here are placeholder
// text carried over from T-003, not real translations.
export async function resolveLocaleContent(locale: Locale): Promise<ResolvedLocaleContent> {
  const [introduction, personalNarrative, connection, navigation] = await Promise.all([
    getEntry('introduction', locale),
    getEntry('personalNarrative', locale),
    getEntry('connection', locale),
    getEntry('navigation', locale),
  ]);

  if (!introduction || !personalNarrative || !connection || !navigation) {
    throw new Error(`Content Layer is missing a "${locale}" entry in one or more collections.`);
  }

  return {
    locale,
    introduction: introduction.data,
    personalNarrative: personalNarrative.data,
    connection: connection.data,
    navigation: navigation.data,
    metadata: derivePageMetadata(navigation.data, introduction.data),
  };
}
