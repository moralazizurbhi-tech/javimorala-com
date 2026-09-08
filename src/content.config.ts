// Content Layer — locale-keyed content collection structure for the
// three Domain Sections plus Section Navigation (Task Catalog T-003;
// Project Architecture, System Structure: Content Layer).
//
// Each collection is loaded from a directory of per-locale JSON files
// (`en.json`, `es.json`, `eu.json`); the glob loader derives each
// entry's id from its filename, so the collection is locale-keyed by
// construction. Adding or editing copy/translation is a data-file
// change only — no code path here requires a code change for that
// (this task's own acceptance criteria). Content authoring itself
// (Spanish/Euskera copy) is Task Catalog T-025's job, not this one:
// only English placeholder entries exist for now.

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Introduction domain — hero-presentation's headline/tagline
// (hero-presentation/technical-design.md, Collaborations).
const introduction = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/introduction' }),
  schema: z.object({
    headline: z.string(),
    tagline: z.string(),
  }),
});

// Personal Narrative domain — about-narrative's narrative text, authored
// as an ordered list of paragraphs; the AI-assisted-development line is
// the final entry by authoring order, not a distinct field (about-
// narrative/technical-design.md, Design Decisions).
const personalNarrative = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/personal-narrative' }),
  schema: z.object({
    narrative: z.array(z.string()).min(1),
  }),
});

// Connection domain — direct-contact's heading, CTA link text, and
// farewell lines (direct-contact/technical-design.md, Collaborations).
const connection = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/connection' }),
  schema: z.object({
    heading: z.string(),
    ctaText: z.string(),
    farewell: z.array(z.string()).min(1),
  }),
});

// Section Navigation — locale-resolved wordmark and "about"/"contact"
// nav labels, the exactly-two anchor destinations (Personal Narrative,
// Connection) plus the Introduction-anchored logomark
// (section-navigation/technical-design.md, Responsibilities).
const navigation = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/navigation' }),
  schema: z.object({
    wordmark: z.string(),
    aboutLabel: z.string(),
    contactLabel: z.string(),
  }),
});

export const collections = { introduction, personalNarrative, connection, navigation };
