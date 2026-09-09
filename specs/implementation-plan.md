# Implementation Plan: Javi Morala

## Strategy

Sequence execution by actual technical-dependency tier — derived from each
Feature's Approved Technical Design and Project Architecture's System
Structure, never from the Feature Catalog's
Capability-Realizing/Supporting/Cross-Cutting classification (every
`motion-interaction` and `accessibility` component depends *outward* on
another Feature's already-built output, never the reverse — confirmed in
their own Technical Designs). Eight phases: unowned project foundations
first; the localization infrastructure next, built complete (routing
**and** override) since content ships localized from day one; the four
independently-buildable narrative Features as four separate phases, in the
site's own single-page reading order per explicit user decision — kept
separate rather than bundled into one phase, since only one of the four
transitions among them is a real technical dependency, the rest is pure
product-priority sequencing; the two cross-cutting layers (motion,
accessibility) as a distinct later milestone per explicit user decision; a
final integration-and-validation pass.

## Phases

### Phase 0 — Project Foundations

**Derived infrastructure**, owned by no Feature — sourced directly from
Project Architecture's System Structure/Technology Selection and Project
UX's Visual Foundations, which are its sufficient owning artifacts. Root
Layout, the Styling System's base tokens, and the Content Layer's schema
are named as System Structure components in Project Architecture, but no
approved Feature Technical Design claims to realize any of them — every
one treats them as external, not redefined there.

- Initialize the Astro project with React, Sass, Framer Motion, Radix UI,
  and Vitest (**Confirmed dependency** — Project Architecture, Technology
  Selection).
- Establish the Styling System's shared Sass/SCSS token/mixin partials
  realizing Project UX's Visual Foundations: typography scale, spacing
  scale, fluid responsive scaling bounds, the near-black/off-white base
  with the lilac-to-purple gradient family, and shared interaction-state
  conventions — including fixing the focus-ring and contrast-ratio token
  *values* that `accessibility`'s Technical Design, `direct-contact`'s UI
  Definition, and `presence-links`' UI Definition each leave Pending
  (**Non-blocking implementation detail** — Project UX's qualitative
  constraints, plus `accessibility`'s WCAG-derived contrast requirement,
  are sufficient to fix real values without inventing a new product
  decision).
- Establish the global browser-default reset/base styling (box-sizing and
  margin/padding normalization, root html/body base colour/typography,
  default link/list/button chrome removed), built on the Styling System's
  tokens (**Confirmed dependency** — Project UX, Visual Foundations;
  Project Architecture, Architectural Principles: Enforced visual
  coherence).
- Establish the Content Layer's locale-keyed collection schema (structure
  only; content authored per Feature from Phase 2 onward) (**Confirmed
  dependency** — Project Architecture, System Structure).
- Stand up Root Layout composing three empty Domain Section placeholders
  in fixed order (**Confirmed dependency** — Project Architecture,
  Component Relationships).

### Phase 1 — Feature Foundation: Localization

**Confirmed dependency**: `content-localization`'s i18n/Routing Layer is a
direct interface dependency of `hero-presentation`, `about-narrative`,
`direct-contact`, and `section-navigation` — each "consume[s]... from the
i18n/Routing Layer... never read[s] the Content Layer directly."

Built here as complete infrastructure — including `language-override`,
not deferred to a later phase — per **explicit user decision**
("localized from day one").

- Build `content-localization`'s locale detection, the `/en/`, `/es/`,
  `/eu/` route structure, and the resolution-priority logic, against
  structural/placeholder per-domain content (real per-domain content is
  each Feature's own responsibility from Phase 2 onward).
- Build `language-override`'s Override Store (tri-state — unset/en/es/eu,
  synchronously readable) fulfilling the interface `content-localization`
  pre-declares, plus the Language Switcher Component itself (its hosting
  slot comes from `section-navigation` in Phase 2).
- Wire the real Override Store into `content-localization`'s
  resolution-priority read — both sides already agree on the interface
  shape; this is the one piece of Phase-1-internal integration needed for
  the phase to be functionally complete.

**Planning decision**: this Feature Foundation precedes Phases 2–5 because
its interface is a direct dependency of four other Features, not because
of its Feature Catalog classification.

### Phase 2 — Hero Presentation + Section Navigation

**Confirmed dependency**: both depend only on Phase 0 (Root Layout,
Styling System) and Phase 1 (i18n/Routing Layer, Language Switcher) — no
dependency between the two, in either direction, per both Technical
Designs' own Cross-Component Relationships sections. Threaded together
because both are visible immediately on arrival.

- `hero-presentation` — all 4 Contract Commitments realized in Technical
  Design, plus Commitment 5 (space-conditional, subordinate Presence
  Links inclusion), whose mechanism is not traced by any Technical Design
  and is resolved locally here (**Non-blocking implementation detail** —
  a self-contained responsive-visibility choice with no architectural
  consequence).
- `section-navigation` — all 7 Contract Commitments, including hosting
  the already-built Language Switcher Component (Commitment 7).

Content authored in English, Spanish, and Euskera together for both
Features (**Confirmed** — localized from day one), resolving each
Feature's own Pending translation/copy items (Hero's headline/tagline/
scroll-cue es/eu values; Section Navigation's nav-label translations,
hamburger icon glyphs, compact logomark asset, and language-control
mobile-overlay exact position) as part of this phase's own work.

### Phase 3 — About Narrative

**Confirmed dependency**: depends only on Phase 0 + Phase 1, per its own
Technical Design's explicit boundary ("No dependency on
`section-navigation`, `presence-links`, or `direct-contact`").

- Realize all Contract Commitments in Technical Design.
- Author English, Spanish, and Euskera narrative content together
  (**Confirmed** — localized from day one), resolving the Feature's own
  Pending items (narrative translations, final photo assets — placeholder
  photos stand in only until this phase's own asset-authoring step).

**Planning decision**: sequenced after Phase 2 and before Phase 4 per
**explicit user decision** (single-page reading order), not a technical
dependency — About Narrative could equally be built in parallel with
Phase 2 or Phase 4 per its own Technical Design.

### Phase 4 — Direct Contact

**Confirmed dependency**: depends only on Phase 0 + Phase 1, per its own
Technical Design.

- Realize all Contract Commitments in Technical Design, including the
  anti-scraping character-reference encoding for the CTA's target
  address.
- Author English, Spanish, and Euskera CTA/farewell copy together
  (**Confirmed** — localized from day one), resolving this Feature's own
  Pending copy items.
- Establishes the DOM-order precedence over `presence-links`' own
  composition, per this Feature's Technical Design — consumed in Phase 5.

**Planning decision**: sequenced after Phase 3 per **explicit user
decision** (single-page reading order), not a technical dependency among
Phases 2–4.

### Phase 5 — Presence Links

**Confirmed dependency** (technical prerequisite, not full-Feature
completion): needs Hero's (Phase 2) and Direct Contact's (Phase 4) Domain
Section markup to exist as the container it composes after in DOM order —
this Feature's own Technical Design asserts both placements itself;
neither host Feature's Technical Design claims this composition work.

- Build the single shared link-data definition (platform label + URL
  pairs, fixed order) and compose it into both the Introduction Domain
  Section (alongside Hero) and the Connection Domain Section (alongside
  Direct Contact).
- Resolve this Feature's own Pending items (the actual profile/platform
  set, link copy/labels, icon assets) — link content is confirmed
  language-independent (per this Feature's own Design Decisions), so no
  localization work applies here.

**Planning decision**: closes out the core narrative per **explicit user
decision** (single-page reading order) — this is both the technical
dependency's natural conclusion and the confirmed priority's endpoint.

### Phase 6 — Cross-Cutting Layer: Motion & Accessibility

**Confirmed priority**: scheduled as a distinct later milestone, not
interleaved with Phases 2–5 (**explicit user decision** — core narrative
first, motion/polish as a later milestone). This does not relax Project
Architecture's "accessible by construction" principle: Phases 2–5's
interactive pieces are already built on Radix UI primitives from the
start, not retrofitted here.

- `accessibility`: the Focus-Visible Style Module (global CSS, build-once,
  applies everywhere automatically); the Nav Current-State AT Exposure
  bridge (needs `section-navigation`'s active-section signal from Phase
  2); and its whole-experience verification obligations (contrast ratios
  against Phase 0's final token values, heading/landmark structure, alt
  text, document-language sync) across everything built in Phases 1–5.
- `motion-interaction`: all 7 bridge components (Hero Entrance & Ambient
  Motion Island, About Narrative Reveal Island, Nav Transition Styles,
  Nav Progress Overlay, CTA Interaction Motion, Secondary Interaction
  Feedback Styles, Switcher Dropdown Transition), each wrapping a specific
  Phase 1–5 Feature's already-built static/interactive output, one
  directional, with no dependency back onto any of them (confirmed
  explicitly in every target Feature's own Technical Design).

**Pending gate — per explicit user decision**: Nav Transition Styles and
Nav Progress Overlay depend on `section-navigation`'s Active Screen
Indicator visual anatomy, which is explicitly left Pending in that
Feature's own Approved UX Specification and UI Definition (no anatomy —
colour change, underline, weight change, or similar — was ever decided).
Per your confirmed decision, this must be resolved as a return trip to
`section-navigation`'s UX/UI refinement **before** these two tasks are
scheduled for execution. The other 5 `motion-interaction` components and
all of `accessibility`'s work in this phase are unaffected and may proceed
independently of this gate.

### Phase 7 — Application-Level Validation

**Planning decision** — owned by no Feature; these seams and
whole-experience properties surface only once everything is integrated.

- Exercise `content-localization`'s cross-locale content-coverage build
  check for real, once English, Spanish, and Euskera content has been
  authored across every content-bearing Feature (Phases 1–5).
- Verify `accessibility`'s whole-experience commitments that have no
  dedicated component — keyboard operability, contrast ratios, AT
  compatibility, document-language sync — across the fully composed,
  motion-enabled experience.
- Verify reduced-motion equivalence holds simultaneously across every
  `motion-interaction` consumer.
- Full responsive (mobile/desktop) regression across the composed
  three-domain experience, all three locales.

This Plan does not decompose Phase 7 into individual test cases or
tasks — that belongs to Task Catalog.

## Plan Cohesion

- **Project Foundations** — Phase 0 (Root Layout, Styling System base,
  Content Layer schema, project scaffold).
- **Feature Foundations** — Phase 1 (`content-localization`'s
  i18n/Routing Layer, built complete with `language-override`).
- **Cross-Feature Integration** — Phase 1's Override Store wiring;
  Presence Links' two placements and Section Navigation's Language
  Switcher hosting (Phases 2 and 5); Phase 6 in its entirety (every
  component composes onto another Feature's already-finished output).
- **Application-Level Validation** — Phase 7.
- No stage is inapplicable to this project — its small surface still
  exercises all four, compactly.

## Milestones

- **M0 — Foundations Ready**: Phase 0 complete; project builds; Root
  Layout renders three empty Domain Section placeholders per
  locale-route stub.
- **M1 — Localization Operational**: Phase 1 complete; all three locale
  routes resolve end-to-end; the manual override persists across visits.
- **M2 — Hero & Navigation Live**: Phase 2 complete; Hero and Section
  Navigation render real content, fully localized, with the language
  switcher functional from its nav slot.
- **M3 — About Narrative Live**: Phase 3 complete; About Narrative
  renders real, fully localized content.
- **M4 — Direct Contact Live**: Phase 4 complete; Direct Contact renders
  real, fully localized content with a working, scrape-protected CTA.
- **M5 — Core Narrative Complete**: Phase 5 complete; Presence Links
  correctly placed at both the Introduction and Connection locations.
  Matches confirmed priority: the full core narrative, in all three
  languages, is now live.
- **M6 — Motion & Accessibility Complete**: Phase 6 complete, including
  resolution of the Active Screen Indicator gate; all motion components
  live and reduced-motion-respecting; accessibility commitments realized
  and verified. Matches confirmed priority: the later polish milestone.
- **M7 — Launch Ready**: Phase 7 complete; full EN/ES/EU content
  coverage-checked; whole-experience accessibility and responsive
  validation passed.

## Priorities

1. Phase 0 → Phase 1 is a **Confirmed dependency** chain.
2. Phase 1 → Phase 2 → Phase 3 → Phase 4 is a **Confirmed — explicit user
   decision** (single-page reading order), not a technical dependency:
   Hero+Navigation, About Narrative, and Direct Contact each declare no
   dependency on one another in their own Technical Designs and could be
   built in a different order or in parallel.
3. Phase 4 → Phase 5 is **both** a technical dependency (Presence Links'
   DOM-order requirement on Direct Contact) and consistent with the
   confirmed reading order.
4. Phases 2–5 (the core narrative) take priority over Phase 6
   (motion/accessibility polish) — **Confirmed**, explicit user decision.
5. Full localization (English, Spanish, Euskera) ships with every Feature
   as it is built, not deferred to a later catch-up phase — **Confirmed**,
   explicit user decision.

## Dependencies

**Confirmed dependency** (from Technical Designs and Project Architecture):

- `hero-presentation`, `about-narrative`, `direct-contact`,
  `section-navigation` → i18n/Routing Layer (interface) + Styling System +
  Root Layout. No dependency among `hero-presentation`, `about-narrative`,
  and `direct-contact`, in either direction.
- `presence-links` → Hero's and Direct Contact's Domain Section markup
  (composition target, DOM-order only); owns both placements itself, per
  its own Technical Design.
- `language-override` → `section-navigation`'s hosting slot (interface,
  not full Feature completion).
- `content-localization` → Content Layer, Root Layout; needs
  `language-override`'s Override Store only for its override-priority
  path, not its core routing.
- `motion-interaction` → the specific Feature each of its 7 components
  wraps (Hero, About Narrative, Direct Contact, Section Navigation,
  Presence Links, Language Switcher), plus Styling System / Motion Layer.
  No consuming Feature depends back — stated explicitly in every one of
  `motion-interaction`'s own component entries.
- `accessibility`'s Focus-Visible Style Module → Styling System only. Its
  Nav Current-State AT Exposure → `section-navigation`'s signal. Its
  remaining commitments are verification-only across everything else.

**Derived infrastructure**:

- Root Layout's, Styling System's, and Content Layer's foundational
  establishment — none owned by any approved Feature; established at
  Project Architecture level (see Phase 0).

## Readiness Issues (Upstream Gaps)

These are not resolved by this Plan. They are surfaced here because they
affect readiness of specific phases' work; Implementation must not invent
these decisions silently.

1. **Section Navigation's Active Screen Indicator visual anatomy remains
   Pending** in that Feature's own Approved UX Specification and UI
   Definition — no colour/underline/weight treatment was ever decided.
   `motion-interaction`'s Nav Transition Styles and Nav Progress Overlay
   depend on it. Per your confirmed decision, this gates those two Phase
   6 tasks specifically until resolved via a return trip to
   `section-navigation`'s own UX/UI refinement. Owning artifact:
   `section-navigation/ux.md`, `section-navigation/ui.md`.
2. **Content, copy, and asset Pending items** across nearly every
   Feature's UX/UI Definition — Hero's and About's Spanish/Euskera
   translations, About's final photo assets, Direct Contact's CTA/
   farewell copy, Presence Links' profile set/labels/icon assets, the
   Language Switcher's option labels and closed-state display value,
   Section Navigation's hamburger icon glyphs and compact logomark asset
   — each authored directly by Javi Morala per Project Context's
   solo-effort constraint. Non-blocking: since localization ships from
   day one, these are resolved within each Feature's own phase (Phases
   1–5) rather than deferred to a catch-up phase.
3. **Section Navigation's language-control mobile-overlay exact
   position** remains Pending in its own UI Definition. Non-blocking;
   resolved locally when building Phase 2's hosting commitment, since
   `language-override` is fully Approved and available by then.
4. **Styling System's exact focus-ring colour/radius and contrast-ratio
   token values** remain Pending across `accessibility`, `direct-contact`
   /ui.md, and `presence-links`/ui.md. Non-blocking for Phase 0, which is
   where these values are fixed, informed by `accessibility`'s
   WCAG-derived contrast requirement even though `accessibility`'s own
   dedicated verification work is scheduled later, in Phase 6.
5. **Accessibility's heading/landmark/alt-text specifics** are pushed to
   each Domain Section's own implementation-level authoring in
   `accessibility`'s Technical Design, and are not actually fixed
   anywhere. Non-blocking; resolved locally within each content Feature's
   own phase (2–4) as part of its markup authoring.

## Excluded

Individual task definitions, functional requirements, technical redesign,
resolution of the Readiness Issues above, source code, tests,
configuration, deployment/infrastructure.

## Note for the Record

This plan spans all 9 Features. `vibe-feature-set-review` has not been run
against this Feature set and is a recommended, not enforced, precondition
per this Skill's Methodological Dependencies. Noted here per methodology
rather than treated as a blocker; a future feature-set review could still
surface something that reopens this plan.

---

*Created: 2026-09-09*
