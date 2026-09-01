# Task Catalog: Javi Morala

## Task Grouping Rationale

Task decomposition is based on executable units of work, real dependencies, and
verifiable outcomes — not a mechanical mirror of each Feature's Technical Components.

- **Locale Layer stays one task** — its own Technical Design explicitly argues against
  splitting (Active Language Resolution is "one ordered decision inside a single
  component... rather than splitting detection and override-precedence," specifically to
  make the single-active-language guarantee structural).
- **Motion Mode Resolver / Section-Page Provider / Micro-Interaction Provider stay three
  tasks** — the two Providers are independently buildable/parallelizable once the
  Resolver exists, and merging the Resolver into either Provider would duplicate
  "resolve once" logic the Technical Design deliberately centralizes.
- **Section Nav / Mobile Nav Overlay stay two tasks** — a real sequential dependency
  exists (the Overlay can't be built without Section Nav's destination structure and
  scroll-anchor service to call into), and the Overlay carries the Feature's only
  stateful lifecycle, isolated by the Technical Design's own Design Decision.
- **Hero, About, Email Contact Device, Social Link Group, Language Override Control each
  stay single tasks** — each is one self-contained composition/behavior unit with its
  own Contract-level objective.
- **Mounting rule**: Components with architecture-defined composition slots may be
  implemented and mounted within the same implementation task. Composition
  relationships introduced or extended at Feature level are represented as separate
  integration tasks. This is why Hero/About/Email Contact Device stay single
  implementation tasks (their slots are Architecture-original), and why Language
  Override Control also folds its App Shell hosting into its own implementation task
  (T-026) — Project Architecture's System Structure explicitly names App Shell as its
  host, so no Feature-level extension is involved, unlike Social Link Group and Section
  Nav, whose composition into App Shell was proposed at Feature Technical Design level,
  extending Architecture, and so stay split into a standalone implementation task plus a
  separate integration task. An earlier draft of this catalog split Language Override
  Control the same way (T-026 + a since-removed T-032), inconsistent with this rule's
  own stated purpose.
- **T-040–043 are explicitly verification type**, not component implementation — they
  check behavior across already-composed Features, matching the Implementation Plan's
  Phase 3 bullets one-to-one.
- **DAG-decision labeling**: where a Confirmed collaboration is conceptually
  bidirectional and doesn't itself determine build order, the single directed edge this
  catalog picks is labeled Planning-derived execution ordering, distinct from a
  Confirmed dependency. The only place this applies: Locale Layer ↔ Language Override
  Control (see T-013's note and T-026's dependency annotation).
- **Motion-provider assignment per component is Derived**, cross-referenced against
  `motion-interaction`'s own component-level consumer lists ("Social Links," "Email
  Contact's device," "Language Override control," "nav links" → Micro-Interaction;
  section/page entry, nav-overlay open/close → Section/Page-level), since each
  consuming Feature's own Technical Design names only generic "Animation Layer."

## Task Type / Commitment-Reference Convention

- `infrastructure` tasks: `enablesCommitments` (substrate only; no Feature Contract applies).
- `implementation` tasks: `realizesCommitments` (the behavior fulfilling the commitment is built here).
- `integration` tasks: `composesCommitments` (structural wiring; some commitments only become meaningfully checkable once composed).
- `verification` tasks: `validatesCommitments` (confirms behavior already realized/composed elsewhere).

## Tasks

### Infrastructure

- id: T-001
  name: Project Scaffold Initialization
  type: infrastructure
  objective: Initialize the React + Vite project producing static build output.
  references: project-architecture.md (Technology Decisions)
  dependencies: none
  inputs: Project Architecture
  outputs: buildable static project skeleton
  completionCriteria:
    - Project builds to static assets suitable for static hosting; no server runtime introduced.
  enablesCommitments: none
  readiness: Ready

- id: T-002
  name: Styling System Foundation
  type: infrastructure
  objective: Establish the shared Sass/SCSS token/mixin partials all components will consume.
  references: project-architecture.md (System Structure: Styling System); project-ux.md (UX Constraints)
  dependencies: T-001
  inputs: Project Architecture, Project UX global constraints
  outputs: shared Sass tokens/mixins
  completionCriteria:
    - Tokens encode dark-only base, single accent colour, two-tier typography; no component-specific styling embedded.
  enablesCommitments: none
  readiness: Ready

- id: T-003
  name: Content Data Layer Scaffold
  type: infrastructure
  objective: Establish the locale-keyed content file structure, decoupled from component code.
  references: project-architecture.md (System Structure: Content Data Layer; Technology Decisions; Architectural Principles)
  dependencies: T-001
  inputs: Project Architecture
  outputs: locale-keyed (English/Spanish) content file structure, per section
  completionCriteria:
    - Structure supports per-section, per-locale content with no code change required to add/edit copy.
  enablesCommitments: none
  readiness: Ready

- id: T-004
  name: App Shell Core Composition
  type: infrastructure
  objective: Mount the App Shell composing Hero/About/Contact section slots in fixed order — the composition explicitly stated in Project Architecture, and only that.
  references: project-architecture.md (System Structure: App Shell; Component Relationships)
  dependencies: T-001, T-002
  inputs: Project Architecture, styling tokens (T-002)
  outputs: App Shell mounting Hero/About/Contact in fixed order (no other composed children yet)
  completionCriteria:
    - Hero, About, Contact compose in fixed order; no client-side router.
    - Does not pre-declare slots for Section Nav or Social Link Group — see mounting rule above; their App Shell composition is a Feature-level extension, scoped to T-030 and T-031. Language Override Control's hosting is Architecture-original and is built and mounted together at T-026.
  enablesCommitments: none
  readiness: Ready

### Implementation — Foundational Layers

- id: T-010
  name: Motion Mode Resolver
  type: implementation
  objective: Resolve Standard/Reduced Motion Mode once per visit and expose it as a fixed value for the remainder of the visit.
  references: motion-interaction/technical-design.md (Motion Mode Resolver)
  dependencies: T-001
  inputs: visitor's reduced-motion preference at load (architectural capability, not owned here)
  outputs: fixed Motion Mode value, consumed by T-011 and T-012
  completionCriteria:
    - Preference read exactly once at load; no re-evaluation mechanism exposed mid-visit.
  realizesCommitments: motion-interaction Commitment 6
  readiness: Ready

- id: T-011
  name: Section/Page-level Motion Provider
  type: implementation
  objective: Apply bold entry motion to sections on first viewport entry and bold transition motion to every nav-overlay open/close occurrence.
  references: motion-interaction/technical-design.md (Section/Page-level Motion Provider)
  dependencies: T-010
  inputs: Motion Mode value (T-010); viewport-entry/overlay-toggle signals from consuming components
  outputs: Section/Page-level motion application interface
  completionCriteria:
    - Exposes an application interface consuming components can invoke for viewport-entry and overlay-toggle events.
    - Once-per-visit gate applies only to section entry, never to overlay transitions.
  realizesCommitments: motion-interaction Commitments 2, 4, 5, 7, 8
  readiness: Ready

- id: T-012
  name: Micro-Interaction Motion Provider
  type: implementation
  objective: Apply restrained motion feedback to every qualifying interaction on interactive elements, unsuppressed, every occurrence.
  references: motion-interaction/technical-design.md (Micro-Interaction Motion Provider)
  dependencies: T-010
  inputs: Motion Mode value (T-010); interaction events from consuming components
  outputs: Micro-Interaction motion application interface
  completionCriteria:
    - Exposes an application interface consuming components can invoke on hover/focus/press/activate; no gating state.
  realizesCommitments: motion-interaction Commitments 3, 5, 7, 8
  readiness: Ready

- id: T-013
  name: Locale Layer
  type: implementation
  objective: Resolve exactly one active language per visit (persisted override, else browser detection with English fallback) and broadcast resolved content to consumers; expose an Override Signal Handling entry point for later callers.
  references: content-localization/technical-design.md (Locale Layer)
  dependencies: T-003
  inputs: Content Data Layer (T-003)
  outputs: Resolved Content Broadcast interface; Override Signal Handling entry point; active-language read interface
  completionCriteria:
    - Default/fallback/persisted-override resolution implemented and ordered as one decision (per the Technical Design's own no-split rationale).
    - Override Signal Handling entry point exists and is independently callable/testable without Language Override Control existing yet.
  realizesCommitments: content-localization Commitments 1–6
  readiness: Ready
  note: Corrects an earlier draft's T-011/T-012 dependency, which came from motion-interaction's feature-catalog relationship line rather than content-localization's own Technical Design (which names only Content Data Layer and Language Override Control). This also surfaced a matching error in the Implementation Plan's Phase 1 sequencing claim, since reconciled by a 2026-09-01 plan-organization pass — Phase 1 no longer sequences content-localization after motion-interaction.

### Implementation — Feature Components

- id: T-020
  name: Hero Section Component
  type: implementation
  objective: Compose headline/tagline, wordmark centerpiece, and passive scroll cue as one coordinated arrival unit, mounted in App Shell's Architecture-original Hero slot.
  references: hero-presentation/technical-design.md
  dependencies: T-002, T-004, T-011, T-013
  inputs: locale-resolved headline/tagline (T-013); Section/Page-level entry motion (T-011); styling tokens (T-002); Hero slot (T-004)
  outputs: Hero Section component, mounted
  completionCriteria:
    - Implemented and rendered into App Shell's existing Hero slot; three elements structurally inseparable per the Technical Design's Owned Concepts.
  realizesCommitments: hero-presentation Commitments 1–4
  readiness: Constrained — Readiness Issue 1 (hero-presentation/ux.md leaves exact layout "Pending, left to detailed visual design"); behavioral/structural work can proceed, final visual closure cannot.

- id: T-021
  name: About Section Component
  type: implementation
  objective: Compose the intro hook and bio content as one continuous, blended dual-dimension narrative unit, mounted in App Shell's Architecture-original About slot.
  references: about-narrative/technical-design.md
  dependencies: T-002, T-004, T-011, T-013
  inputs: locale-resolved intro-hook/bio text (T-013); Section/Page-level reveal motion (T-011); styling tokens (T-002); About slot (T-004)
  outputs: About Section component, mounted
  completionCriteria:
    - Implemented and rendered into App Shell's existing About slot; hook-then-body and dual-dimension blending structural per Owned Concepts.
  realizesCommitments: about-narrative Commitments 1–6
  readiness: Constrained — Readiness Issue 1 (exact layout Pending; background-texture treatment also flagged as an open tension in about-narrative/ux.md).

- id: T-022
  name: Social Link Group Component
  type: implementation
  objective: Build one reusable component exposing independent Instagram/LinkedIn triggers, as a standalone unit not yet mounted anywhere (mounting is Feature-level composition — T-030).
  references: social-links/technical-design.md
  dependencies: T-002, T-012, T-013
  inputs: locale-resolved label text (T-013); Micro-Interaction feedback (T-012); styling tokens (T-002)
  outputs: Social Link Group component (unmounted)
  completionCriteria:
    - Component built and independently testable against social-links' Owned Concepts (Channel trigger, Cross-instantiation consistency, Session-preserving activation), without requiring App Shell.
  realizesCommitments: social-links Commitments 1, 3 (Commitment 2 — cross-placement consistency — only meaningfully checkable once mounted; fully validated at T-043)
  readiness: Constrained — Readiness Issue 1 (exact layout in both placements Pending).

- id: T-023
  name: Email Contact Device Component
  type: implementation
  objective: Present the single primary email-initiation trigger doubling as the Contact view's sign-off message, mounted in App Shell's Architecture-original Contact Section slot.
  references: email-contact/technical-design.md
  dependencies: T-002, T-004, T-012, T-013
  inputs: locale-resolved sign-off text (T-013); Micro-Interaction feedback (T-012); styling tokens (T-002); Contact Section slot (T-004, Architecture-original)
  outputs: Email Contact Device component, mounted
  completionCriteria:
    - Implemented and rendered into App Shell's existing Contact Section slot; trigger and sign-off message structurally inseparable.
  realizesCommitments: email-contact Commitments 1–4
  readiness: Constrained — Readiness Issue 1 (exact layout Pending). Address-exposure-guard technique is correctly Implementation-scope per the Technical Design, not a readiness gap.

- id: T-024
  name: Section Nav Component
  type: implementation
  objective: Own the canonical three-destination structure and select exactly one presentation form (inline or overlay-hosting) per viewport, as a standalone unit not yet mounted anywhere (mounting is Feature-level composition — T-031).
  references: section-navigation/technical-design.md (Section Nav)
  dependencies: T-002, T-012, T-013
  inputs: locale-resolved destination labels (T-013); nav-link Micro-Interaction feedback (T-012, for the inline form); styling tokens (T-002)
  outputs: Section Nav component (unmounted)
  completionCriteria:
    - Destination resolution and form-selection logic implemented and independently testable, without App Shell.
  realizesCommitments: section-navigation Commitments 1, 2, 3, 5 (Commitment 4 realized jointly with T-025)
  readiness: Constrained — Readiness Issue 1 (device-class viewport threshold and visual treatment Pending).

- id: T-025
  name: Mobile Nav Overlay Component
  type: implementation
  objective: Own the overlay's Closed/Open lifecycle and its selection/dismiss behavior, hosted by Section Nav — an intra-Feature composition, not App-Shell-level, so it stays implementation type.
  references: section-navigation/technical-design.md (Mobile Nav Overlay)
  dependencies: T-024, T-002, T-011, T-012
  inputs: destination structure from Section Nav (T-024); overlay open/close bold motion (T-011); internal-link Micro-Interaction feedback (T-012); styling tokens (T-002)
  outputs: Mobile Nav Overlay component, hosted by Section Nav
  completionCriteria:
    - Open/Closed lifecycle implemented; selection performs anchor-request-to-Section-Nav + close as one action; dismissal closes without anchoring.
  realizesCommitments: section-navigation Commitment 4 (+ Commitment 3, jointly with T-024)
  readiness: Constrained — Readiness Issue 1 (full-screen vs. slide-in exact treatment Pending).

- id: T-026
  name: Language Override Control Component
  type: implementation
  objective: Present exactly two language options, reflect the active language, signal Locale Layer on selection of the non-active option, and mount into App Shell as a persistent, fixed-position element across all three views — per Architecture's own text naming App Shell as its host.
  references: language-override/technical-design.md; project-architecture.md (System Structure: App Shell hosts the manual language-override control)
  dependencies: T-002, T-004, T-012, T-013 (T-013 dependency is Planning-derived execution ordering — see T-013's note; Locale Layer owns the signal interface, so it's built first, though the two Features' Technical Designs describe this as a bidirectional service collaboration, not a stated build order)
  inputs: active-language read from Locale Layer (T-013); Micro-Interaction feedback (T-012); styling tokens (T-002); App Shell (T-004, Architecture-original host)
  outputs: Language Override Control component, mounted in App Shell
  completionCriteria:
    - Control implemented and independently testable against Locale Layer's exposed read/signal interface.
    - Mounted and reachable from Hero/About/Contact views without overlapping Section Nav's own presentation.
  realizesCommitments: language-override Commitments 1–4 (Commitment 5 realized jointly with T-013's Persisted Override State)
  readiness: Ready — language-override/ux.md has no Pending marker (unlike its five sibling Feature UX docs); no readiness constraint applies.

### Integration

- id: T-030
  name: Compose Social Link Group into App Shell
  type: integration
  objective: Mount the built Social Link Group component twice — alongside Hero Section and alongside Email Contact Device — per social-links' Technical Design, extending App Shell beyond Architecture's literal text.
  references: social-links/technical-design.md (App Shell as composer, both placements)
  dependencies: T-004, T-022
  inputs: App Shell (T-004); Social Link Group component (T-022)
  outputs: two live Social Link Group instantiations composed into the page
  completionCriteria:
    - Both placements mounted, each instantiated from the same component definition with no per-instantiation variation.
  composesCommitments: social-links Commitment 2 (structurally completed by this composition — both instantiations now coexist; full validation is T-043's job)
  readiness: Constrained — Readiness Issue 2 (project-ux.md's "Persistent nav" description still lists social icons; this task proceeds on social-links'/section-navigation's Contracts, which keep Social Link Group App-Shell-composed and separate from nav — authoritative for build purposes, but at risk of rework pending project-ux reconciliation).

- id: T-031
  name: Compose Section Nav into App Shell
  type: integration
  objective: Mount the built Section Nav (with its hosted Mobile Nav Overlay) into App Shell, resolving the Architecture gap section-navigation's Technical Design flagged.
  references: section-navigation/technical-design.md (App Shell proposed as composer)
  dependencies: T-004, T-024, T-025
  inputs: App Shell (T-004); Section Nav + Mobile Nav Overlay components (T-024, T-025)
  outputs: Section Nav composed into App Shell, available across all three views
  completionCriteria:
    - Nav accessible from any scroll position once mounted; presentation-form selection functions against the live viewport.
  composesCommitments: section-navigation Commitments 1–5 (availability and exclusivity only become meaningfully checkable once mounted; component-internal logic already realized at T-024/T-025)
  readiness: Constrained — Readiness Issue 2 (same nav/social-icons contradiction as T-030). Readiness Issue 1's viewport-threshold gap also affects this mounting's responsive behavior.

### Verification

- id: T-040
  name: Verify Section-Navigation × Motion-Interaction Scroll Integrity
  type: verification
  objective: Confirm nav's scroll-anchor invocation and the Animation Layer's motion coexist without either violating the scroll-control invariant.
  references: motion-interaction/contract.md; section-navigation/contract.md
  dependencies: T-025, T-031, T-011
  inputs: composed Section Nav + Mobile Nav Overlay (via T-031) running against Section/Page-level Motion Provider (T-011)
  outputs: verification record
  completionCriteria:
    - Destination activation still scroll-anchors correctly while nav-overlay bold transitions are in effect; no motion writes scroll position outside the visitor's own input or an explicit nav/anchor activation.
  validatesCommitments: motion-interaction Commitment 8; section-navigation Commitments 1, 4, 5
  readiness: Constrained — inherits T-031's Constrained status (Readiness Issues 1 and 2); executable once T-031 closes.

- id: T-041
  name: Verify Language-Switch × Motion × Content-Broadcast Integration
  type: verification
  objective: Confirm an override signal produces a complete, non-mixed-language update with no scroll side-effect, regardless of any accompanying motion transition.
  references: content-localization/contract.md; motion-interaction/contract.md; language-override/contract.md
  dependencies: T-026, T-013, T-011, T-012
  inputs: composed and mounted Language Override Control (T-026) triggering Locale Layer (T-013) while Animation Layer (T-011, T-012) is active
  outputs: verification record
  completionCriteria:
    - No mixed-language state observable during or after a switch; no reload/navigation; no scroll-position change.
  validatesCommitments: content-localization Commitments 4, 5, 6; motion-interaction Commitment 8; language-override Commitment 3
  readiness: Ready — all four dependencies (T-026, T-013, T-011, T-012) are themselves Ready; a direct result of the T-013 dependency correction.

- id: T-042
  name: Verify Reduced-Motion Functional Equivalence Across All Consuming Features
  type: verification
  objective: Confirm every consuming Feature reaches the same functional outcomes under Reduced Motion Mode as under Standard Mode.
  references: motion-interaction/contract.md Commitment 7
  dependencies: T-010, T-011, T-012, T-020, T-021, T-022, T-023, T-024, T-025, T-026, T-030, T-031
  inputs: fully composed page with Motion Mode Resolver forced to Reduced
  outputs: verification record
  completionCriteria:
    - Section reveal, micro-interaction feedback, and nav-overlay toggle each reach their expected end state with no fade/rise/scale; no Feature's functionality depends on motion actually playing.
  validatesCommitments: motion-interaction Commitment 7
  readiness: Constrained — inherits Constrained status from T-020, T-021, T-022, T-023, T-024, T-025, T-030, T-031 (Readiness Issues 1 and 2); the broadest-scope verification task, so it closes last.

- id: T-043
  name: Verify Social Link Group Cross-Instantiation Consistency
  type: verification
  objective: Confirm both live Social Link Group instantiations, once composed together, expose identical triggers/destinations and behave identically.
  references: social-links/contract.md Commitment 2
  dependencies: T-030
  inputs: both placements composed via T-030
  outputs: verification record
  completionCriteria:
    - Hero and Contact placements expose the same two triggers resolving to the same two destinations; activation behaves identically from either.
  validatesCommitments: social-links Commitment 2
  readiness: Constrained — inherits T-030's Constrained status (Readiness Issue 2).

## Coverage and DAG Checks

- 21 tasks; every unique stable identifier appears exactly once.
- Every task has one execution objective; every task references at least one approved artifact.
- Dependency graph is a strict DAG: Infrastructure → Implementation → Integration →
  Verification, plus the intra-tier edges T-010→T-011/T-012, T-024→T-025, T-003→T-013,
  T-013→T-026 (Planning-derived). No circular task dependency exists.
- All 11 Technical Components across the 8 Features are covered (hero-presentation,
  about-narrative, social-links, email-contact, content-localization, language-override
  — 1 each; section-navigation — 2; motion-interaction — 3), plus 4 infrastructure tasks,
  2 integration tasks, and 4 verification tasks matching the Implementation Plan's Phase
  3 bullets one-to-one.
- Consistency with the Implementation Plan: phase-to-tier mapping holds (Phase 0 →
  Infrastructure, Phase 1 → Foundational Implementation, Phase 2 → Feature
  Implementation + Integration, Phase 3 → Verification). Both discrepancies previously
  found between this catalog and the Implementation Plan's Phase 0/Phase 1 text have
  since been reconciled by a plan-organization pass (2026-09-01): Phase 1's internal
  sequencing claim was removed, and Phase 0's premature App-Shell-extension bullet was
  moved to Phase 2, matching how this catalog already modeled the work (T-030, T-031 as
  `integration` type, not folded into T-004).
- This same pass also corrected an internal inconsistency in this catalog: T-032 (Host
  Language Override Control in App Shell) has been merged into T-026, since App Shell's
  role as its host is Architecture-original (named directly in project-architecture.md's
  System Structure), unlike Social Link Group's and Section Nav's App Shell composition,
  which genuinely extends Architecture at Feature Technical Design level and so
  correctly stays split into separate integration tasks (T-030, T-031).
- Both Readiness Issues from the Implementation Plan are represented as explicit
  `readiness: Constrained` fields on every task they affect (T-020, T-021, T-022, T-023,
  T-024, T-025 for Readiness Issue 1; T-030, T-031 for Readiness Issue 2), and propagate
  through to the verification tasks that depend on them (T-040, T-042, T-043) — not
  resolved or invented here.

---

*Created: 2026-09-01*
