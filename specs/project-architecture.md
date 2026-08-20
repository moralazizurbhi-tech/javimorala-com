# Project Architecture: Javi Morala

## Architectural Style

Static, client-rendered single-page site (SPA): all three domains render as one
continuously scrolling page from a single client-side app, compiled to static assets
for static hosting. No backend, no server runtime, no data persistence.

## System Structure

- **App Shell** — mounts the page, composes the three section components in fixed
  order, owns global layout/theme wiring, and hosts the manual language-override
  control.
- **Hero Section** — renders the Introduction domain / Hero presentation capability.
- **About Section** — renders the Personal Narrative domain / About narrative
  capability.
- **Contact Section** — renders the Connection domain / Contact links capability
  (external links only).
- **Content Data Layer** — structured per-section, per-locale (English/Spanish)
  content files, decoupled from component code.
- **Styling System** — Sass/SCSS partials (variables/mixins/tokens) shared across
  sections for visual coherence.
- **Animation Layer** — Framer Motion, providing scroll/interaction motion effects
  used by section components.
- **Locale Layer** — detects the visitor's browser locale by default, holds the
  manual override when set, and resolves the current locale's content to section
  components. Built on react-i18next.

## Component Relationships

- App Shell composes Hero, About, and Contact Sections in fixed order (Introduction,
  then Personal Narrative, then Connection); no client-side router, no separate pages.
- App Shell hosts the language-override control, wired to the Locale Layer.
- The Locale Layer resolves per-section content from the Content Data Layer for the
  current locale.
- Section components consume locale-resolved content from the Locale Layer, rather
  than reading the Content Data Layer directly.
- Section components use the Animation Layer (Framer Motion) for motion effects; the
  Animation Layer has no dependency back on sections.
- All components consume the Styling System's shared Sass tokens/mixins, enforcing one
  coherent visual language.
- The Contact Section connects to external services outbound only, via native browser
  links (mailto/social URLs) — never an in-app API/network call.

## Technology Decisions

- React as the component model.
- Vite as the build/dev tool, producing static output (no SSR/server needed given no
  backend and no routing).
- Sass/SCSS for styling.
- Framer Motion for animation.
- react-i18next (with browser-locale detection) for the Locale Layer.
- Content authored in separate structured, locale-keyed data files, decoupled from
  component code (specific file format left to implementation).

## Architectural Principles

- Content/presentation separation: components own structure, data files own copy —
  content changes don't require code changes.
- Enforced visual coherence via one shared styling system rather than per-section ad
  hoc styles, supporting the "show, don't tell" and cross-domain consistency rules from
  Project Design.
- No backend, no persistence, no accounts — the Connection domain resolves purely
  through external native links.
- Bilingual by construction: content is locale-keyed from the Content Data Layer
  outward, not retrofitted onto single-language content.

## Architectural Constraints

- Single continuous page only: no client-side router, no multi-page navigation —
  sections compose in one shell, per Project Design.
- No server/backend component may be introduced at any point.
- No CMS or multi-author tooling; content data files are authored directly by Javi
  Morala.
- No automated translation service — English and Spanish content is authored directly
  by Javi Morala for every section.
- Locale always defaults to browser auto-detection but must always expose a manual
  override — locale-detection-only is not acceptable.

---

*Created: 2026-08-20*
