# Implementation Plan: Javi Morala

## Strategy

Sequence execution by actual technical-dependency tier, derived from each Feature's
approved Technical Design and from Project Architecture's System Structure — never
from the Feature Catalog's Capability-Realizing/Supporting/Cross-Cutting
classification, which carries no build-order authority (confirmed explicitly in
`motion-interaction`'s and `accessibility`'s own Technical Designs: every one of
their components depends *outward* on another Feature's already-built output,
never the reverse). Seven phases: unowned project foundations first, then the one
Feature that acts as shared infrastructure for almost everything else, then the
three independent content Features, then the two Features that compose on top of
them, then the personalization Feature that needs a hosting slot from one of those,
then the two cross-cutting layers that wrap the finished set, then a final
integration-and-validation pass. English-first: all phases build and verify in
English; Spanish/Euskera authoring and the cross-locale build check are
deliberately deferred to the final phase (explicit user decision).

## Phases

### Phase 0 — Project Foundations

**Derived infrastructure** — owned by no Feature; sourced directly from Project
Architecture's System Structure and Technology Selection sections, which are its
sufficient owning artifact. Root Layout, the Styling System's base Sass/SCSS
token/mixin partials, and the Content Layer's locale-keyed collection schema are
named as System Structure components in Project Architecture, but no approved
Feature Technical Design claims to realize any of them — every one treats them as
"external, not redefined here."

- Initialize the Astro project with React, Sass, Framer Motion, Radix UI, and
  Vitest (**Confirmed dependency** — Project Architecture, Technology Selection).
- Establish the Styling System's shared Sass/SCSS token/mixin partials, placeholder
  values acceptable — exact values are each Feature UI Definition's own detail
  (**Confirmed dependency** — Project Architecture, System Structure).
- Establish the global browser-default reset/base styling (box-sizing and
  margin/padding normalization, root html/body base colour/typography, default
  link/list/button chrome removed), built on the Styling System's tokens
  (**Confirmed dependency** — Project UX, Visual Foundations; Project
  Architecture, Architectural Principles: Enforced visual coherence).
- Establish the Content Layer's locale-keyed collection schema (structure only;
  content authored per Feature in Phase 2+) (**Confirmed dependency** — Project
  Architecture, System Structure).
- Stand up Root Layout composing three empty Domain Section placeholders in fixed
  order (**Confirmed dependency** — Project Architecture, Component Relationships).

### Phase 1 — Feature Foundation: Content Localization

**Confirmed dependency**: `content-localization`'s i18n/Routing Layer is the one
piece of shared infrastructure nearly everything else names as a direct interface
dependency — Hero, About Narrative, and Direct Contact each "consume... from the
i18n/Routing Layer... never read the Content Layer directly"; Section Navigation
consumes it for nav labels.

- Build the i18n/Routing Layer's core resolution interface and the `/en/`, `/es/`,
  `/eu/` route structure, against placeholder content.
- Root-redirect UX polish, the no-JS fallback, and the cross-locale coverage check
  (Commitment 5) do not block anything downstream — validated for real in Phase 6.

**Planning decision**: this Feature precedes Phase 2 because its interface is a
direct dependency of three other Features, not because of its Feature Catalog
classification.

### Phase 2 — Core Domain Features

**Confirmed dependency**: `hero-presentation`, `about-narrative`, `direct-contact`
each depend only on Phase 0 (Root Layout, Styling System) + Phase 1 (i18n/Routing
Layer interface) — no dependency among the three, either direction, per each
Technical Design's own Cross-Component Relationships.

- `hero-presentation`
- `about-narrative`
- `direct-contact`

**Planning decision**: no build order is imposed among these three — explicit user
confirmation that dependency-tier equality should be left unordered.

### Phase 3 — Composed Features

**Confirmed dependency** (technical prerequisite, not full-Feature completion):

- `presence-links` — needs Hero's and Direct Contact's Domain Section markup to
  exist as the container it composes after in DOM order (its own Technical
  Design: "no dependency... each only establishes DOM-order precedence over it").
- `section-navigation` — needs Root Layout (Phase 0) and the three Domain
  Sections' anchor markup to exist to observe as boundaries, plus the i18n
  interface for nav labels.

No dependency between these two. **Planning decision**: unordered/parallelizable.

### Phase 4 — Language Override

**Confirmed dependency** (interface, not full-Feature completion): `language-
override`'s Language Switcher must be hosted inside `section-navigation`'s nav
bar/mobile overlay slot (Section Navigation's own design: "hosts, does not own").
Only that hosting slot is required, not Section Navigation's full active-section-
tracking polish — real overlap with late Phase 3 is possible. Its Override Store
has no dependency and could start anytime from Phase 0 onward if useful.

### Phase 5 — Cross-Cutting Motion Layer

**Confirmed dependency**: `motion-interaction`'s seven components (Hero Entrance &
Ambient Motion, About Narrative Reveal, Nav Transition Styles, Nav Progress
Overlay, CTA Interaction Motion, Secondary Interaction Feedback Styles, Switcher
Dropdown Transition) each wrap or target a specific Phase 2–4 Feature's already-
built static/DOM output — explicitly one-directional in its own Technical Design's
Cross-Component Relationships. Must follow all of Phases 2–4.

- `motion-interaction` (all seven components).
- `accessibility`'s Nav Current-State AT Exposure — same dependency shape (Section
  Navigation's signal).

**Planning decision**: `accessibility`'s Focus-Visible Style Module is excluded
from this phase — it depends only on Styling System tokens (Phase 0), so it may be
built opportunistically as early as Phase 0/1, in parallel with everything else.

### Phase 6 — Cross-Feature Integration & Application-Level Validation

**Planning decision** — owned by no Feature; the seams between independently-built
pieces surface only once composed:

- Wire `language-override`'s real Override Store into `content-localization`'s
  root-bootstrap priority read (both sides already agree on the interface shape;
  this is the composition step).
- Exercise `content-localization`'s cross-locale content-coverage build check for
  real, once English/Spanish/Euskera content is authored across every
  content-bearing Feature (deferred here per explicit user decision).
- Verify `accessibility`'s whole-experience commitments that have no dedicated
  component and are "realized by existing architecture" — keyboard operability,
  contrast ratios, AT compatibility, document-language sync — across the fully
  composed, motion-enabled experience.
- Verify reduced-motion equivalence holds simultaneously across every
  `motion-interaction` consumer.
- Full responsive (mobile/desktop) regression across the composed three-domain
  experience, all three locales.

This Plan does not decompose Phase 6 into individual test cases or tasks — that
belongs to Task Catalog.

## Plan Cohesion

- **Project Foundations** — Phase 0 (Root Layout, Styling System base, Content
  Layer schema, project scaffold).
- **Feature Foundations** — Phase 1 (`content-localization`'s i18n/Routing Layer).
- **Cross-Feature Integration** — Phase 6's first two bullets (override-signal
  wiring; cross-locale coverage check), plus Phase 5 itself, which is inherently
  an integration layer (every component composes onto another Feature's finished
  output).
- **Application-Level Validation** — Phase 6's remaining bullets (accessibility
  whole-experience verification, reduced-motion equivalence, full
  responsive/locale regression).
- No stage is inapplicable to this project — its small surface still exercises
  all four, compactly.

## Milestones

- **M0 — Foundations Ready**: Phase 0 complete; project builds; Root Layout
  renders three empty Domain Section placeholders per locale-route stub.
- **M1 — Localization Operational**: Phase 1 complete; i18n/Routing Layer
  resolves per-locale routes/content end-to-end against placeholder content.
- **M2 — Core Content Delivered**: Phase 2 complete; Hero, About Narrative,
  Direct Contact render real English content per device class.
- **M3 — Composed Experience Assembled**: Phase 3 complete; Presence Links
  correctly placed at both locations; Section Navigation persists with working
  active-section tracking and mobile overlay.
- **M4 — Personalization Complete**: Phase 4 complete; Language Switcher
  functional from its nav slot.
- **M5 — Motion & Interaction Layered**: Phase 5 complete; all motion
  components live; reduced-motion respected; AT active-state exposure working.
- **M6 — Experience Verified & Launch-Ready**: Phase 6 complete; full EN/ES/EU
  content authored and coverage-checked; whole-experience accessibility and
  responsive validation passed.

## Priorities

1. Phase 0 → 1 → {2, 3} → 4 → 5 → 6 is a **Confirmed dependency** chain and is
   non-negotiable.
2. Within Phase 2 (Hero/About/Direct Contact) and Phase 3 (Presence Links/Section
   Navigation): equal priority, unordered (**Confirmed** — explicit user decision;
   Feature Catalog classification deliberately not used as an ordering signal).
3. `accessibility`'s Focus-Visible Style Module carries no fixed phase — build
   opportunistically as soon as Phase 0's Styling tokens exist (**Planning
   decision**, not forced into Phase 5).
4. Locale completeness (Spanish/Euskera) deferred to Phase 6 rather than pursued
   per-Feature (**Confirmed** — explicit user decision).

## Dependencies

**Confirmed dependency** (from Technical Designs and Project Architecture):

- `hero-presentation`, `about-narrative`, `direct-contact` → i18n/Routing Layer
  (interface) + Styling System + Root Layout. No dependency among the three.
- `presence-links` → Hero's and Direct Contact's Domain Section markup
  (composition slot, DOM-order only).
- `section-navigation` → Root Layout, the three Domain Sections' anchor markup,
  i18n/Routing Layer.
- `language-override` → `section-navigation`'s hosting slot (interface, not full
  completion).
- `content-localization` → Content Layer, Root Layout; needs `language-
  override`'s Override Store only for its override-priority path, not its core
  routing.
- `motion-interaction` → the specific Feature each component wraps (Hero, About
  Narrative, Direct Contact, Section Navigation, Presence Links, Language
  Switcher), plus Styling System / Motion Layer. No consuming Feature depends
  back (stated explicitly in every one of `motion-interaction`'s own component
  entries).
- `accessibility`'s Focus-Visible Style Module → Styling System only. Its Nav
  Current-State AT Exposure → `section-navigation`'s signal. Its remaining
  commitments are verification-only across everything else.

**Derived infrastructure**:

- Root Layout's, Styling System's, and Content Layer's foundational
  establishment — none owned by any approved Feature; established at Project
  Architecture level (see Phase 0).

## Readiness Issues (Upstream Gaps)

These are not resolved by this Plan. They are surfaced here because they affect
readiness of specific phases' work; Implementation must not invent these
decisions silently.

1. **Content and asset Pending items across several approved Feature UX
   Specifications.** Hero Presentation's and About Narrative's headline/
   tagline/narrative translations, and About Narrative's final photo assets, are
   each flagged Pending in their own Feature UX Specification, authored directly
   by Javi Morala per Project Context's solo-effort constraint. Non-blocking for
   Phase 2 construction (placeholders stand in); resolves during Phase 6's
   localization pass.
2. **Section Navigation's indicator visual anatomy and mobile progress-bar
   treatment remain Pending** in `section-navigation`'s own Feature UI
   Definition. `motion-interaction`'s Nav Transition Styles and Nav Progress
   Overlay are designed anatomy-agnostic, so Phase 5 is not structurally
   blocked, but final visual polish of Section Navigation's own indicator
   requires this resolved. Owning artifact: `section-navigation`'s UI
   Definition.
3. **Styling System's exact focus-ring color/radius and contrast-ratio token
   values remain Pending.** Each Feature UI Definition's own detail; not a
   Planning blocker for Phase 0 or Phase 5's Focus-Visible Style Module.

## Excluded

Individual task definitions, functional requirements, technical redesign,
resolution of the three Readiness Issues above, source code, tests,
configuration, deployment/infrastructure.

---

*Created: 2026-09-07*
