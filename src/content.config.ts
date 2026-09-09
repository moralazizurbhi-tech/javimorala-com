import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

// Content Layer Schema (T-003) — structure only. Locale-keyed content
// collections for the three Domain Sections (project-architecture.md,
// System Structure — Content Layer). Each entry's id is a supported
// locale (en/es/eu); its data is a flexible string-keyed record since
// the concrete content fields are each Feature's own authoring decision
// from Phase 2 onward (Implementation Plan, Phase 0) — this schema only
// guarantees the locale-keyed structure the i18n/Routing Layer and
// Domain Sections depend on, not the field names within it.
const localeContentSchema = z.record(z.string(), z.string());

const introduction = defineCollection({
  loader: file('src/content/introduction.json'),
  schema: localeContentSchema,
});

const personalNarrative = defineCollection({
  loader: file('src/content/personal-narrative.json'),
  schema: localeContentSchema,
});

const connection = defineCollection({
  loader: file('src/content/connection.json'),
  schema: localeContentSchema,
});

export const collections = { introduction, personalNarrative, connection };
