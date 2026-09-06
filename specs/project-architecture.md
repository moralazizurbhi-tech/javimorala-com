# Project Architecture: Javi Morala

## Architectural Style

Static-generated site with framework islands: pages are pre-rendered to
static HTML at build time for fast first paint and strong SEO (critical for
the Introduction domain's first-impression role), with JavaScript hydrated
only for the specific pieces that need interactivity or motion. No backend,
no server runtime, no data persistence.

## System Structure

- **Root Layout** — composes the three domain sections in fixed order for
  a given locale route, owns global layout/theme wiring.
- **Domain Sections** (Introduction, Personal Narrative, Connection) —
  statically-rendered content for each domain; hydrate React islands only
  where a specific piece needs interactivity or motion.
- **Content Layer** — locale-keyed content collections for all three
  domains, decoupled from section/component code.
- **Styling System** — Sass/SCSS partials (tokens/mixins) shared across
  all sections, enforcing visual coherence.
- **Motion Layer** — Framer Motion, used within React islands for
  scroll/interaction-driven motion.
- **Accessible Primitives Layer** — Radix UI (headless) primitives
  underlying every interactive component (e.g. language switcher, in-page
  navigation aid).
- **i18n/Routing Layer** — locale routing and resolution (English,
  Spanish, Euskera): auto-detects by default, holds the manual override,
  resolves per-domain content from the Content Layer for the current
  locale.

## Component Relationships

- Root Layout composes Introduction, Personal Narrative, and Connection
  in fixed order; no client-side router across domains — only
  locale-level routing exists above the Root Layout.
- The i18n/Routing Layer resolves per-domain content from the Content
  Layer for the current locale; Domain Sections consume locale-resolved
  content from the i18n/Routing Layer, never reading the Content Layer
  directly.
- Interactive pieces within Domain Sections (e.g. in-page navigation aid,
  language switcher) are built on the Accessible Primitives Layer and
  hydrated as islands; purely static content requires no hydration.
- Interactive/motion pieces use the Motion Layer; the Motion Layer has no
  dependency back on Domain Sections.
- All components consume the Styling System's shared Sass tokens/mixins.
- The Connection domain section connects to external services outbound
  only, via native browser links (mailto/social/profile URLs) — never an
  in-app network/API call.

## Technology Selection

- Astro as the static-site framework/build system.
- React as the island/component framework for interactive pieces.
- Sass/SCSS for styling.
- Framer Motion for motion within React islands.
- Radix UI for headless accessible primitives.
- Astro's built-in i18n routing and content collections for English,
  Spanish, and Euskera.
- Vitest for lightweight unit/component tests.

## Architectural Patterns

- Application structure: static-generated, one route per locale, each
  rendering a single continuously scrolling page composed of the three
  domains.
- Routing: locale-level routing only (e.g. /en/, /es/, /eu/); no
  client-side router for in-page domain navigation — domains are
  composed, not routed.
- State model: local component state plus the resolved locale from
  routing; no dedicated global state-management library — interactive
  state (current locale, motion/interaction triggers) is minimal.
- Data architecture: locale-keyed content collections, decoupled from
  presentation components.
- Styling architecture: shared Sass token/mixin system consumed by every
  component.
- Component architecture: statically-rendered domain sections composed
  by a root layout; islands hydrate only where required.
- Integration patterns: outbound-only via native browser links
  (mailto/https) for contact and presence; no in-app network/API calls
  anywhere in the system.

## Shared Technical Foundations

- UI/component primitives: Radix UI, as the foundation for every
  interactive component.
- Styling-architecture implementation: Sass/SCSS with a shared
  token/mixin system.
- Motion library: Framer Motion, used consistently for all
  motion/interaction.
- Utility libraries: kept minimal — no heavyweight general-purpose
  utility library assumed project-wide; small helpers introduced only
  where a Feature genuinely needs one.
- Testing infrastructure: Vitest, for unit/component-level tests of
  logic-bearing pieces (locale resolution/override, link resolution).

## Architectural Principles

- Static-first performance: pre-render everything possible at build
  time; ship JavaScript only for islands that truly require interactivity
  or motion.
- Locale-native architecture: language is a first-class routing/content
  concern from the start, supporting English, Spanish, and Euskera now
  and further languages later.
- Accessible by construction: interactive pieces are built on accessible
  primitives from the start, not retrofitted with ARIA/keyboard support
  later.
- Enforced visual coherence: one shared styling system, not per-section
  ad hoc styles, supporting Project Design's "show, don't tell" and
  cross-domain consistency rules.
- Content/presentation separation: content collections own copy per
  locale; components own structure and behavior — content or translation
  changes never require code changes.

## Architectural Constraints

- No backend or server-runtime component may be introduced at any point;
  all rendering is static/build-time, with hydration limited to islands.
- No client-side router or separate pages for the three domains — they
  remain composed in one continuous page per locale route.
- No CMS or multi-author tooling; content collections are authored
  directly by Javi Morala for all domains and all three languages.
- No automated translation service — English, Spanish, and Euskera
  content is authored directly by Javi Morala.
- Locale always defaults to automatic detection but must always expose a
  manual override.
- All outbound contact/presence integrations use native browser links
  only — no API/network calls of any kind.

---

*Created: 2026-09-06*
