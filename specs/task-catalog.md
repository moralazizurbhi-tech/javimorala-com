# Task Catalog: Javi Morala

## Task Grouping Rationale

Task decomposition is based on executable units of work, real dependencies, and
verifiable outcomes — not a mechanical mirror of each Feature's Technical
Components.

- **Language Switcher Component + Override Store stay one task (T-013)** —
  tightly coupled (the switcher directly calls the store), both entirely owned
  by `language-override`, small in scope. Splitting would mirror the Technical
  Design's internal component list rather than reflect a separately meaningful
  execution objective. The store's role as `content-localization`'s external
  interface is instead handled by a dedicated integration task (T-024), since
  that wiring is a genuine separate execution objective (composing two
  independently-built pieces).
- **Presence Link Group Composition stays one task (T-011) despite two
  instantiations** — one component definition, "never two independently
  authored lists" per its own Technical Design; the two placements are
  composition targets, not separate build objectives.
- **`motion-interaction`'s seven components become seven separate tasks
  (T-015–T-021), plus its shared store (T-014)** — each has a meaningfully
  different target dependency (Hero vs. About Narrative vs. Section
  Navigation's DOM vs. Direct Contact's CTA vs. three-Feature-wide DOM vs.
  Language Switcher's state), independently verifiable, matching the
  Incremental Cross-Cutting Work guidance rather than one monolithic Feature
  task.
- **`accessibility`'s two new components split by dependency, not kept
  together** — Focus-Visible Style Module (T-023) needs only Styling System
  tokens and can run far earlier than Nav Current-State AT Exposure (T-022),
  which needs Section Navigation's signal. Forcing them into one task would
  falsely gate the earlier-ready one.
- **Content authoring (T-025) and the coverage-check execution (T-029) are
  split from the check mechanism (T-007)** — T-007 builds the build-time check
  itself (buildable early, testable against placeholder data); T-025 is
  content-population work (Javi Morala's own authoring, per Project Context);
  T-029 is the verification step that only becomes meaningful once both exist.
  Three different ownership domains and three different readiness states.
- **`content-localization`'s i18n/Routing Layer splits into three tasks
  (T-005, T-006, T-007)** — per-locale route/content resolution (needed
  immediately by four other Features), root-bootstrap redirect logic (needed
  by nobody else), and the coverage-check mechanism (needed only at final
  validation) have meaningfully different consumers and readiness timing.

## Task Type / Field Convention

- `infrastructure` tasks: no Feature Contract applies; `enablesCommitments: none`.
- `implementation` tasks: `realizesCommitments` — the behavior fulfilling the
  commitment is built here.
- `integration` tasks: `composesCommitments` — structural wiring; the
  commitment only becomes fully checkable once composed.
- `verification` tasks: `validatesCommitments` — confirms behavior already
  realized/composed elsewhere.

## Tasks

### Infrastructure

- id: T-001
  name: Project Scaffold Initialization
  type: infrastructure
  objective: Initialize the Astro project with React, Sass, Framer Motion, Radix UI, and Vitest, producing static build output.
  references: project-architecture.md (Technology Selection)
  dependencies: none
  inputs: Project Architecture
  outputs: buildable static project skeleton with all named libraries installed
  acceptanceCriteria:
    - Project builds to static assets; no server runtime introduced.
    - React, Sass, Framer Motion, Radix UI, Vitest all present and importable.
  enablesCommitments: none
  readiness: Ready

- id: T-002
  name: Styling System Foundation
  type: infrastructure
  objective: Establish the shared Sass/SCSS token/mixin partials every Feature's UI Definition consumes.
  references: project-architecture.md (System Structure: Styling System); project-ux.md (Visual Foundations)
  dependencies: T-001
  inputs: Project Architecture, Project UX Visual Foundations
  outputs: shared Sass token/mixin partials (typography scale, spacing scale, colour system, breakpoints, interaction-state conventions)
  acceptanceCriteria:
    - Tokens/mixins exist for typography, spacing, colour, breakpoints, and shared hover/focus/active conventions; placeholder values acceptable, exact values Pending per each Feature UI Definition.
    - No component-specific styling embedded here.
  enablesCommitments: none
  readiness: Ready

- id: T-003
  name: Content Layer Schema
  type: infrastructure
  objective: Define the locale-keyed content collection structure for the three domains, decoupled from component code.
  references: project-architecture.md (System Structure: Content Layer); hero-presentation/contract.md; about-narrative/contract.md; direct-contact/contract.md; section-navigation/contract.md
  dependencies: T-001
  inputs: Project Architecture, the four content-bearing Features' Contracts
  outputs: content collection schema (structure only) covering English/Spanish/Euskera per domain
  acceptanceCriteria:
    - Schema holds fields sufficient for Hero's headline/tagline, About Narrative's narrative text, Direct Contact's heading/CTA/farewell text, and Section Navigation's nav labels/wordmark, each per locale.
    - No content-collection code path allows a code change to be required for a copy/translation edit.
  enablesCommitments: none
  readiness: Ready

- id: T-004
  name: Root Layout Composition
  type: infrastructure
  objective: Compose three empty Domain Section placeholders (Introduction, Personal Narrative, Connection) in fixed order.
  references: project-architecture.md (System Structure: Root Layout; Component Relationships)
  dependencies: T-001
  inputs: Project Architecture
  outputs: Root Layout mounting three empty Domain Section slots in fixed order
  acceptanceCriteria:
    - Three Domain Sections render in fixed order; no client-side router across them.
  enablesCommitments: none
  readiness: Ready

### Implementation — Content Localization

- id: T-005
  name: i18n/Routing Layer — Core Resolution & Per-Locale Routes
  type: implementation
  objective: Generate static /en/, /es/, /eu/ routes, each resolving that locale's content/metadata from the Content Layer.
  references: content-localization/technical-design.md (i18n/Routing Layer); content-localization/contract.md
  dependencies: T-003, T-004
  inputs: Content Layer schema (T-003), Root Layout (T-004), English placeholder content
  outputs: per-locale static routes; content/metadata resolution interface consumable by Domain Section Features
  acceptanceCriteria:
    - Each of /en/, /es/, /eu/ pre-renders resolved content/metadata (title, meta description, html lang, alt text) for its locale (Commitments 2, 3).
  realizesCommitments: content-localization Commitments 2, 3
  readiness: Ready

- id: T-006
  name: i18n/Routing Layer — Root Bootstrap & Redirect
  type: implementation
  objective: Resolve the active language at the language-agnostic root via override→detected-locale→English priority and redirect pre-paint, with a no-JS fallback to /en/.
  references: content-localization/technical-design.md (i18n/Routing Layer); content-localization/contract.md
  dependencies: T-005
  inputs: per-locale routes (T-005); override signal read defaults to "unset" until T-024 wires the real store
  outputs: root bootstrap script + noscript fallback
  acceptanceCriteria:
    - Root renders no visible content before redirecting (Commitment 4); redirects per the override→detected→English priority (Commitment 1); no-JS visitors reach /en/ via noscript fallback.
  realizesCommitments: content-localization Commitments 1, 4
  readiness: Ready

- id: T-007
  name: i18n/Routing Layer — Cross-Locale Coverage Check Mechanism
  type: implementation
  objective: Build the build-time/test check verifying every content entry present in one locale's collection is present in all three.
  references: content-localization/technical-design.md (i18n/Routing Layer, Design Decision 4); content-localization/contract.md Commitment 5
  dependencies: T-003, T-005
  inputs: Content Layer schema (T-003)
  outputs: build-time/Vitest coverage-check mechanism
  acceptanceCriteria:
    - Check fails the build/test when any locale collection is missing an entry present in another; passes against placeholder data with symmetric coverage.
  realizesCommitments: content-localization Commitment 5 (mechanism only — real enforcement at T-029)
  readiness: Ready

### Implementation — Core Domain Features

- id: T-008
  name: Hero Composition
  type: implementation
  objective: Render headline/tagline, ornamental-mark placement, and scroll cue as one coordinated, single-template arrival composition, per device class.
  references: hero-presentation/technical-design.md; hero-presentation/contract.md
  dependencies: T-002, T-004, T-005
  inputs: locale-resolved Introduction content (T-005); Styling System tokens (T-002); Root Layout's Introduction slot (T-004); English headline/tagline copy (Pending translation, per hero-presentation/ux.md)
  outputs: Hero Composition, mounted in the Introduction Domain Section
  acceptanceCriteria:
    - All three elements render together in one template, never independently (Commitment 1).
    - Content consumed only via the i18n/Routing Layer (Commitment 2).
    - Scroll cue renders non-interactive/non-focusable (Commitment 3).
    - Device-class layout resolves via CSS breakpoints only (Commitment 4).
  realizesCommitments: hero-presentation Commitments 1–4
  readiness: Ready (English copy); Spanish/Euskera copy Pending — see T-025

- id: T-009
  name: About Narrative Composition
  type: implementation
  objective: Render narrative text (including the closing AI-development paragraph) and two photos as one coordinated, single-template composition, per device class.
  references: about-narrative/technical-design.md; about-narrative/contract.md
  dependencies: T-002, T-004, T-005
  inputs: locale-resolved Personal Narrative content (T-005); Styling System tokens (T-002); Root Layout's Personal Narrative slot (T-004); English narrative copy + photo placeholders (both Pending, per about-narrative/ux.md)
  outputs: About Narrative Composition, mounted in the Personal Narrative Domain Section
  acceptanceCriteria:
    - Narrative text and both photos render together in one template (Commitment 1).
    - AI-development line never precedes the narrative, guaranteed by authored paragraph order (Commitment 2).
    - Content consumed only via the i18n/Routing Layer (Commitment 3).
    - Photos render non-interactive, no carousel/toggle (Commitment 4).
  realizesCommitments: about-narrative Commitments 1–4
  readiness: Ready (English copy, placeholder photos); final photos + Spanish/Euskera copy Pending — see T-025

- id: T-010
  name: Direct Contact Composition
  type: implementation
  objective: Render the contact heading, anti-scraping-encoded CTA link, and farewell lines as one coordinated composition, CTA preceding Presence Links in DOM order.
  references: direct-contact/technical-design.md; direct-contact/contract.md
  dependencies: T-002, T-004, T-005
  inputs: locale-resolved Connection content (T-005); Styling System tokens (T-002); Root Layout's Connection slot (T-004)
  outputs: Direct Contact Composition, mounted in the Connection Domain Section
  acceptanceCriteria:
    - Heading, CTA, and farewell lines render together, CTA preceding Presence Links' content in DOM order (Commitment 4).
    - CTA's address/href character-reference-encoded, never plain-text/literal mailto (Commitment 2).
    - Content consumed only via the i18n/Routing Layer (Commitment 3).
    - Farewell lines render static/non-interactive (Commitment 5); CTA is a single stateless native link hand-off (Commitment 1).
  realizesCommitments: direct-contact Commitments 1–5
  readiness: Ready

### Implementation — Composed Features

- id: T-011
  name: Presence Link Group Composition
  type: implementation
  objective: Build one reusable static link-list component and instantiate it identically within both the Introduction and Connection Domain Sections.
  references: presence-links/technical-design.md; presence-links/contract.md
  dependencies: T-002, T-008, T-010
  inputs: Styling System tokens (T-002); Hero Composition (T-008, DOM-order anchor); Direct Contact Composition (T-010, DOM-order anchor)
  outputs: Presence Link Group Composition, instantiated after Hero (Introduction) and after Direct Contact (Connection)
  acceptanceCriteria:
    - Each link uses a target-attributed static anchor, no script-driven window.open (Commitment 1).
    - Both instantiations render from one shared link-data definition, identical order (Commitment 2).
    - Positioned after Hero Composition and after Direct Contact Composition respectively (Commitment 4).
  realizesCommitments: presence-links Commitments 1, 2, 4 (Commitment 3 satisfied by construction — locale-independent labels)
  readiness: Ready

- id: T-012
  name: Section Navigation Composition
  type: implementation
  objective: Render the persistent nav (desktop bar / mobile toggle+overlay) once at Root Layout level, tracking active-section state and hosting the language-override slot.
  references: section-navigation/technical-design.md; section-navigation/contract.md
  dependencies: T-001, T-002, T-004, T-005, T-008, T-009, T-010
  inputs: Radix UI (T-001); Styling System tokens (T-002); Root Layout (T-004); locale-resolved nav labels/wordmark (T-005); anchor markup from all three Domain Sections (T-008, T-009, T-010) to observe as boundaries
  outputs: Section Navigation Composition, mounted at Root Layout level
  acceptanceCriteria:
    - Nav persists across all three Domain Sections' scroll extent (Commitment 1); anchor links navigate same-page, no route change (Commitments 2, 3).
    - Compact logomark presence derives from one shared active-section state, never tracked twice (Commitments 4, 5).
    - Mobile toggle opens/closes a full-screen overlay with the same links (Commitment 6).
    - Hosts (does not own) a language-override slot in both nav forms (Commitment 7).
  realizesCommitments: section-navigation Commitments 1–7
  readiness: Ready. Indicator visual anatomy and mobile progress-bar treatment remain Pending in section-navigation's own UI Definition (Readiness Issue 2, Implementation Plan) — behavioral work can proceed, final visual polish cannot.

### Implementation — Personalization

- id: T-013
  name: Language Switcher Component + Override Store
  type: implementation
  objective: Render the dropdown hosted in Section Navigation's slot; on selection, persist the override and navigate to the target locale route.
  references: language-override/technical-design.md; language-override/contract.md
  dependencies: T-001, T-005, T-012
  inputs: Radix UI (T-001); per-locale routes to navigate to (T-005); Section Navigation's hosting slot (T-012)
  outputs: Language Switcher Component (hydrated island) + Override Store, mounted in Section Navigation's slot
  acceptanceCriteria:
    - Selecting a different language writes the override then navigates (Commitment 1); selecting the active language is a no-op (Commitment 2).
    - Store writes only from explicit selection (Commitment 3); exposes a synchronous, tri-state read for the active indicator (Commitment 4) and for content-localization's future consumption (wired at T-024).
    - No clear/reset operation exists anywhere in the interface (Commitment 5).
  realizesCommitments: language-override Commitments 1–5
  readiness: Ready

### Implementation — Motion & Interaction

- id: T-014
  name: Motion Playback Store
  type: implementation
  objective: Own the tab-session-scoped record of which one-time motion moments (Hero entrance, About Narrative reveal pieces) have already played.
  references: motion-interaction/technical-design.md (Motion Playback Store); motion-interaction/contract.md
  dependencies: T-001
  inputs: none beyond project scaffold
  outputs: read/write store for the Hero-entrance-played flag and About Narrative's revealed-piece-ID set
  acceptanceCriteria:
    - Persists across a same-tab reload/route change but not to a new tab/window; exposes no clear operation.
  realizesCommitments: motion-interaction Commitments 1, 2 (storage substrate only)
  readiness: Ready

- id: T-015
  name: Hero Entrance & Ambient Motion Island
  type: implementation
  objective: Sequence Hero's first-load entrance choreography once per visit, then run ambient gradient drift, layered on Hero Composition's static output.
  references: motion-interaction/technical-design.md (Hero Entrance & Ambient Motion Island); motion-interaction/contract.md Commitment 2
  dependencies: T-008, T-014
  inputs: Hero Composition's static markup (T-008, read-only); Motion Playback Store (T-014)
  outputs: hydrated island wrapping Hero Composition
  acceptanceCriteria:
    - Entrance plays once per visit per Motion Playback Store's flag; ambient drift begins only after settling.
    - Reduced-motion: entrance skips to end-state, ambient drift never begins.
    - Never alters Hero Composition's markup/content/completeness guarantee.
  realizesCommitments: motion-interaction Commitment 2; contributes to Commitment 10
  readiness: Ready

- id: T-016
  name: About Narrative Reveal Island
  type: implementation
  objective: Progressively reveal About Narrative's paragraphs/photos on scroll, or immediately on direct-navigation arrival, layered on About Narrative Composition's static output.
  references: motion-interaction/technical-design.md (About Narrative Reveal Island); motion-interaction/contract.md Commitment 1
  dependencies: T-009, T-014
  inputs: About Narrative Composition's static markup (T-009, read-only); Motion Playback Store (T-014); browser's native anchor-navigation signal (platform)
  outputs: hydrated island wrapping About Narrative Composition
  acceptanceCriteria:
    - Not-yet-revealed pieces reveal on viewport intersection; already-revealed pieces (per store) render settled, no animation.
    - Direct-navigation arrival (hash change to this section) reveals all pieces immediately, no per-piece animation.
    - Reduced-motion: every piece reaches revealed state directly.
  realizesCommitments: motion-interaction Commitment 1; contributes to Commitment 10
  readiness: Ready. Full verification of the direct-navigation-arrival path requires T-012's anchor links to exist (soft dependency, verification-only — not a build blocker).

- id: T-017
  name: Nav Transition Styles
  type: implementation
  objective: Add a CSS transition to Section Navigation's compact-logomark presence change and its (Pending) indicator-value change, with zero code coupling to Section Navigation's own component.
  references: motion-interaction/technical-design.md (Nav Transition Styles); motion-interaction/contract.md Commitment 3
  dependencies: T-012
  inputs: Section Navigation's existing, already-public DOM/class contract (T-012, read-only)
  outputs: SCSS partial targeting Section Navigation's DOM from outside
  acceptanceCriteria:
    - Logomark-presence and indicator-value changes transition smoothly instead of an instant swap; resolves to instant under prefers-reduced-motion.
    - Section Navigation's own component code has no reference to this stylesheet.
  realizesCommitments: motion-interaction Commitment 3; contributes to Commitments 4, 10
  readiness: Ready. Full visual realization depends on section-navigation's indicator anatomy, currently Pending (Readiness Issue 2) — this task's transition mechanism is anatomy-agnostic and not blocked.

- id: T-018
  name: Nav Progress Overlay
  type: implementation
  objective: Render an independently-hydrated scroll-progress fill, visually aligned with the nav bar's divider location via shared Styling tokens only.
  references: motion-interaction/technical-design.md (Nav Progress Overlay); motion-interaction/contract.md Commitment 4
  dependencies: T-002
  inputs: Styling System's shared layout tokens (T-002)
  outputs: standalone hydrated island, not composed inside Section Navigation's component tree
  acceptanceCriteria:
    - Renders a fill reflecting scroll position, updating as it changes; no import/reference to Section Navigation's own code.
    - Reduced-motion: fill reflects accurate progress without animated smoothing.
  realizesCommitments: motion-interaction Commitment 4 (progress component only); contributes to Commitment 10
  readiness: Ready. Visual alignment target (T-012's nav bar) should exist for meaningful acceptance testing (soft dependency); mobile treatment remains Pending per section-navigation/ui.md.

- id: T-019
  name: CTA Interaction Motion
  type: implementation
  objective: Apply hover gradient-sweep (pointer input) and a momentary tap-equivalent (touch input) to Direct Contact's CTA anchor only, without touching its encoding or accessible name.
  references: motion-interaction/technical-design.md (CTA Interaction Motion); motion-interaction/contract.md Commitments 5, 6
  dependencies: T-010
  inputs: Direct Contact Composition's CTA anchor static output (T-010, read-only)
  outputs: hydrated island wrapping only the CTA anchor
  acceptanceCriteria:
    - Hover triggers a sustained sweep; touch triggers a momentary sweep around the tap; never leaves a touch-only device without feedback.
    - Anti-scraping character-reference encoding and accessible name remain untouched.
    - Reduced-motion: a discrete, non-animated visual change replaces the sweep.
  realizesCommitments: motion-interaction Commitments 5, 6; contributes to Commitment 10
  readiness: Ready

- id: T-020
  name: Secondary Interaction Feedback Styles
  type: implementation
  objective: Apply a shared gradient-fill hover/focus/touch treatment to Section Navigation's nav links, both Presence Links placements, and the Language Switcher's trigger/options — one CSS ruleset, zero code coupling.
  references: motion-interaction/technical-design.md (Secondary Interaction Feedback Styles); motion-interaction/contract.md Commitments 7, 8, 9
  dependencies: T-011, T-012, T-013
  inputs: Section Navigation's, Presence Link Group's, and Language Switcher's existing public DOM (all read-only)
  outputs: single shared SCSS partial targeting all three from outside
  acceptanceCriteria:
    - Identical treatment applies at every target; hover gated to (hover: hover) and (pointer: fine), :active handles touch.
    - Resolves to an instant fill under prefers-reduced-motion; none of the three target components' code references this stylesheet.
  realizesCommitments: motion-interaction Commitments 7, 8; contributes to Commitment 9; contributes to Commitment 10
  readiness: Ready

- id: T-021
  name: Switcher Dropdown Transition
  type: implementation
  objective: Add a fade + slight vertical translation to the Language Switcher's open/close state change, targeting Radix's existing data-state attribute from outside.
  references: motion-interaction/technical-design.md (Switcher Dropdown Transition); motion-interaction/contract.md Commitment 9
  dependencies: T-013
  inputs: Language Switcher Component's existing open/closed state exposure (T-013, read-only)
  outputs: SCSS partial targeting the switcher's data-state attribute
  acceptanceCriteria:
    - Open/close transitions with fade+translate instead of an instant show/hide; resolves to instant state change under prefers-reduced-motion.
    - Language Override's own component code has no reference to this stylesheet.
  realizesCommitments: motion-interaction Commitment 9; contributes to Commitment 10
  readiness: Ready

### Implementation — Accessibility

- id: T-022
  name: Nav Current-State AT Exposure
  type: implementation
  objective: Mirror Section Navigation's existing active-section signal into an AT-current-state attribute on the corresponding nav link, without changing Section Navigation's own component.
  references: accessibility/technical-design.md (Nav Current-State AT Exposure); accessibility/contract.md Commitment 5
  dependencies: T-012
  inputs: Section Navigation's existing, already-public active-section DOM/class signal (T-012, read-only)
  outputs: thin hydrated island observing Section Navigation's signal
  acceptanceCriteria:
    - AT-current-state attribute mirrors the active-section signal exactly, removed from the previously-current link; no second independently-tracked active-section concept introduced.
  realizesCommitments: accessibility Commitment 5
  readiness: Ready

- id: T-023
  name: Focus-Visible Style Module
  type: implementation
  objective: Apply a visible, on-brand :focus-visible style universally to every interactive element, with zero per-component opt-in.
  references: accessibility/technical-design.md (Focus-Visible Style Module); accessibility/contract.md Commitment 2
  dependencies: T-002
  inputs: Styling System's colour/radius tokens (T-002, values currently Pending)
  outputs: global :focus-visible stylesheet rule
  acceptanceCriteria:
    - Applies automatically to every interactive element across the site with no Feature-level import/reference.
  realizesCommitments: accessibility Commitment 2; contributes to Commitment 3
  readiness: Ready. Exact colour/radius values Pending Styling System's token decision (Readiness Issue 3) — mechanism itself is not blocked.

### Integration

- id: T-024
  name: Wire Override Store into i18n Root Bootstrap
  type: integration
  objective: Connect language-override's real Override Store as the live read source for content-localization's root-bootstrap priority logic, replacing the "always unset" default.
  references: content-localization/technical-design.md (Design Decision 5); language-override/technical-design.md (Override Store)
  dependencies: T-006, T-013
  inputs: root bootstrap (T-006); Override Store's read interface (T-013)
  outputs: root bootstrap reading the real, persisted override signal
  acceptanceCriteria:
    - Root redirect honors a real persisted override ahead of detected locale, end-to-end.
  composesCommitments: content-localization Commitment 1 (override branch); language-override Commitment 4
  readiness: Ready once T-006 and T-013 both exist

### Content Authoring & Validation

- id: T-025
  name: Author Final Spanish/Euskera Content
  type: implementation
  objective: Populate the Content Layer's Spanish and Euskera collections with final translated copy and final photo assets across all content-bearing Features.
  references: hero-presentation/ux.md; about-narrative/ux.md; direct-contact/ux.md; section-navigation/ux.md
  dependencies: T-003, T-008, T-009, T-010, T-012
  inputs: Content Layer schema (T-003); each Feature's approved English content as the source of meaning
  outputs: complete Spanish/Euskera content entries for every field English already has
  acceptanceCriteria:
    - Every content field populated in English (Hero headline/tagline, About Narrative text, About Narrative photos, Direct Contact heading/CTA/farewell, Section Navigation labels) has a Spanish and Euskera counterpart.
  realizesCommitments: none (content-authoring work; resolves Readiness Issue 1 from the Implementation Plan)
  readiness: Pending — Javi Morala's own authoring (Project Context: solo effort), not implementation work Planning can schedule beyond flagging it.

- id: T-026
  name: Accessibility Whole-Experience Verification
  type: verification
  objective: Confirm keyboard operability, contrast ratios, AT compatibility, and document-language sync across the fully composed, motion-enabled experience.
  references: accessibility/contract.md Commitments 1, 3, 4, 6
  dependencies: T-008, T-009, T-010, T-011, T-012, T-013, T-015, T-016, T-017, T-018, T-019, T-020, T-021, T-022, T-023
  inputs: the fully composed experience with motion and accessibility layers live
  outputs: verification record
  acceptanceCriteria:
    - Every interactive element is keyboard-operable (Commitment 1); body-text/UI contrast meets Commitment 3's ratios once Styling tokens are fixed; heading/landmark/alt-text structure and AT compatibility hold (Commitment 4); html lang never mismatches rendered content (Commitment 6).
  validatesCommitments: accessibility Commitments 1, 3, 4, 6
  readiness: Constrained — depends on Styling System's contrast token values (Readiness Issue 3) for Commitment 3.

- id: T-027
  name: Reduced-Motion Equivalence Verification
  type: verification
  objective: Confirm every motion-interaction consumer reaches identical functional outcomes under reduced-motion as under standard motion.
  references: motion-interaction/contract.md Commitment 10
  dependencies: T-015, T-016, T-017, T-018, T-019, T-020, T-021
  inputs: the composed experience with prefers-reduced-motion forced active
  outputs: verification record
  acceptanceCriteria:
    - Every motion-bearing component reaches its functional end-state with no animation; no Feature's functionality depends on motion actually playing.
  validatesCommitments: motion-interaction Commitment 10
  readiness: Ready once T-015–T-021 all exist

- id: T-028
  name: Full Responsive & Locale Regression
  type: verification
  objective: Verify the composed three-domain experience across mobile and desktop device classes, in English, Spanish, and Euskera.
  references: project-ux.md (UX Constraints); project-design.md (Design Constraints)
  dependencies: T-025, T-008, T-009, T-010, T-011, T-012, T-013, T-015, T-016, T-017, T-018, T-019, T-020, T-021, T-022, T-023
  inputs: the fully composed, fully localized experience
  outputs: verification record
  acceptanceCriteria:
    - No visual/functional regression across mobile and desktop for any of the three locale routes.
  validatesCommitments: none (cross-cutting UX/Design Constraint verification, not a single Feature Commitment)
  readiness: Constrained — depends on T-025 (content authoring) completing.

- id: T-029
  name: Cross-Locale Coverage Check Execution
  type: verification
  objective: Run content-localization's build-time coverage check against final, fully-authored content and confirm it passes.
  references: content-localization/contract.md Commitment 5
  dependencies: T-007, T-025
  inputs: coverage-check mechanism (T-007); final EN/ES/EU content (T-025)
  outputs: verification record; passing build
  acceptanceCriteria:
    - Build/test passes with no missing locale entries across any content collection.
  validatesCommitments: content-localization Commitment 5
  readiness: Constrained — depends on T-025 completing.

## Coverage and DAG Checks

- 29 tasks; every unique stable identifier appears exactly once.
- Every task has one execution objective; every task references at least one
  approved artifact.
- Dependency graph is a strict DAG: Infrastructure (T-001–004) →
  Content-Localization core (T-005–007) → Core/Composed/Personalization
  Features (T-008–013) → Motion/Accessibility layer (T-014–023) → Integration
  (T-024) → Content Authoring & Validation (T-025–029). No circular task
  dependency exists.
- All 9 Features covered: hero-presentation (T-008), about-narrative (T-009),
  direct-contact (T-010), presence-links (T-011), section-navigation (T-012),
  language-override (T-013), content-localization (T-005–007, T-024, T-029),
  motion-interaction (T-014–021, T-027), accessibility (T-022, T-023, T-026).
- No dependency is derived from Feature Catalog classification alone — every
  edge above traces to a specific Technical Design statement.
- The three Pending items from the Implementation Plan's Readiness Issues are
  represented as explicit `readiness` annotations (T-008/T-009/T-025 for
  content; T-012/T-017/T-018 for indicator anatomy; T-023/T-026 for Styling
  tokens) — not resolved or invented here.
- Consistent with the Implementation Plan's seven phases: Phase 0→T-001–004,
  Phase 1→T-005–007, Phase 2→T-008–010, Phase 3→T-011–012, Phase 4→T-013,
  Phase 5→T-014–023, Phase 6→T-024–029.

---

*Created: 2026-09-07*
