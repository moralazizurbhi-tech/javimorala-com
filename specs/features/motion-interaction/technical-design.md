# Technical Design: Motion & Interaction

All components below sit within Project Architecture's existing Animation
Layer; none of them redefine it. Project Architecture's "Animation Layer
has no dependency back on sections" is preserved throughout — consuming
features call into these components, never the reverse.

## Technical Components

### Motion Mode Resolver

**Purpose**: Determine, once per visit, whether Standard or Reduced Motion
Mode applies, and expose that fixed value to whatever needs it.

**Responsibilities**

- Read the visitor's reduced-motion preference exactly once, at page load.
- Expose a fixed Motion Mode value for the remainder of the visit; never
  re-evaluate mid-visit.

**Owned Concepts**

- `Motion Mode` (Standard | Reduced) — the single source of truth for
  which mode is active this visit.

**Collaborations**

- The Section/Page-level Motion Provider and the Micro-Interaction Motion
  Provider each consult this component before rendering any motion, to
  select their Standard or Reduced rendering path.

**Dependencies**

- None on other Feature-internal components. Externally assumes the
  visitor's reduced-motion preference is readable at load time — an
  architectural capability, not owned by this Feature.

**Constraints**

- Must resolve exactly once per visit; must not expose a mechanism for
  re-evaluation within the same visit.

**Design Decisions**

- Resolving once at load (rather than continuously) was fixed by the
  confirmed Feature Solution. This component exists specifically to
  enforce that fixation as one authoritative value, so no other component
  can independently re-check the preference and diverge.

**Contract Traceability**: Realizes Commitment 6 (One-Time Reduced-Motion
Resolution) fully; contributes to Commitment 7 (Functional Equivalence
Under Reduced Motion) by being the value both Providers branch on.

### Section/Page-level Motion Provider

**Purpose**: Apply the bold/assertive treatment to every Section/Page-
level motion moment — section viewport entries and nav-overlay open/close
transitions — consistent with the once-per-visit gating that applies to
one and not the other.

**Responsibilities**

- Apply bold entry motion to a section the first time it enters the
  viewport (or is visible at load) during a visit; suppress replay on
  subsequent re-entries.
- Apply bold transition motion to every occurrence of the nav overlay
  opening or closing, without suppression.
- Consult Motion Mode Resolver to choose between full bold treatment
  (Standard Mode) and a minimized/no-motion equivalent (Reduced Mode)
  while preserving the same triggering/outcome mapping.
- Maintain visually bolder intensity than the Micro-Interaction Motion
  Provider's treatment at all times.
- Never alter scroll position as a side effect of applying any of its
  motion.

**Owned Concepts**

- `Section Entry State` (Not yet entered | Entered) per section-level
  animatable unit — the only component that tracks or consults this
  state.
- Section/Page-level treatment intensity — the "bold" reference point
  other treatments are contrasted against.

**Collaborations**

- Consuming section-level components (Hero, About, Contact-related, and
  App Shell's nav-overlay chrome) invoke this Provider's exposed
  application interface to signal a viewport-entry or overlay open/close
  event; this Provider does not read their internal structure.
- Consults Motion Mode Resolver's `Motion Mode` value before rendering.

**Dependencies**

- Motion Mode Resolver.

**Constraints**

- Must never write/alter scroll position — may read scroll-relative
  viewport-entry signals but only to trigger motion, never to move the
  scroll position itself.
- Must remain visually bolder than the Micro-Interaction Motion Provider's
  treatment at all times.
- The once-per-visit gate (`Section Entry State`) applies only to section
  viewport-entry triggers, never to nav-overlay triggers.

**Design Decisions**

- A single Provider handles both section-entry and overlay-transition
  triggers, differentiated only by whether the once-per-visit gate is
  consulted, rather than splitting into two components — both triggers
  share the same bold-treatment intensity and Reduced Motion Mode
  branching logic, so separating them would duplicate that logic without
  adding ownership clarity.

**Contract Traceability**: Realizes Commitment 2 (One-Time Section Entry
Motion) and Commitment 4 (Nav Overlay Transition on Every Occurrence)
fully; contributes to Commitment 5 (Intensity Contrast — bold side),
Commitment 7 (Reduced Motion equivalence — bold side), and Commitment 8
(scroll control — bold side).

### Micro-Interaction Motion Provider

**Purpose**: Apply the restrained-by-contrast treatment to every
qualifying visitor interaction, every time it occurs, with no suppression.

**Responsibilities**

- Apply restrained motion feedback to a qualifying interaction
  (hover/focus/press/activate) on any interactive element across the six
  consuming features, every time it occurs.
- Consult Motion Mode Resolver to choose between full restrained treatment
  (Standard Mode) and a minimized/no-motion equivalent (Reduced Mode),
  preserving the same triggering/outcome mapping.
- Maintain visually more restrained intensity than the Section/Page-level
  Motion Provider's treatment at all times.
- Never alter scroll position as a side effect of applying any of its
  motion.

**Owned Concepts**

- Micro-interaction treatment intensity — the "restrained" reference point
  contrasted against the bold one.

**Collaborations**

- Interactive elements across the six consuming features (Email Contact's
  device, Social Links, Language Override control, nav links, cards,
  etc.) invoke this Provider's exposed application interface on qualifying
  interaction events; this Provider does not read their internal
  structure.

**Dependencies**

- Motion Mode Resolver.

**Constraints**

- Must never write/alter scroll position.
- Must remain visually more restrained than the Section/Page-level Motion
  Provider's treatment at all times.
- Has no once-per-visit gate of any kind — every qualifying interaction
  always produces feedback.

**Design Decisions**

- Deliberately owns no Entry-State-like gating concept, unlike the
  Section/Page-level Provider, since unconditional repeatability is
  required.

**Contract Traceability**: Realizes Commitment 3 (Persistent Micro-
Interaction Feedback) fully; contributes to Commitment 5 (restrained
side), Commitment 7 (Reduced Motion equivalence — restrained side), and
Commitment 8 (scroll control — restrained side).

## Cross-Component Relationships

- Exhaustiveness/mutual exclusivity of the two-category classification
  (Commitment 1) is structural, not owned by any single component: the
  Animation Layer exposes exactly two application interfaces — the
  Section/Page-level Motion Provider's and the Micro-Interaction Motion
  Provider's — and every consuming element integration must use exactly
  one; no third interface exists.
- Intensity contrast (Commitment 5) is a joint constraint on both
  Providers rather than a concept owned by either alone: each Provider's
  treatment must be authored so the Section/Page-level Provider's output
  is always bolder than the Micro-Interaction Provider's.
- Functional equivalence under Reduced Motion (Commitment 7) is achieved
  by both Providers sharing the same dependency on Motion Mode Resolver
  and each independently guaranteeing their triggering/outcome mapping
  holds in both rendering paths.
- Scroll integrity (Commitment 8) is a joint constraint on both Providers:
  neither may write to scroll position; only the visitor's own scrolling
  or an explicit nav/anchor activation (outside this Feature's ownership)
  may do so.
- None of the three components depends on any consuming feature's internal
  structure — consuming components (Hero, About, Contact-related, Social
  Links, Content Localization's rendered content, Section Navigation's
  overlay chrome hosted by App Shell) depend on this Feature's two
  Provider interfaces, never the reverse — consistent with Project
  Architecture's "Animation Layer has no dependency back on sections."

## Bidirectional Contract Traceability

- Commitment 1 → structural (both Providers + absence of a third
  interface)
- Commitment 2 → Section/Page-level Motion Provider
- Commitment 3 → Micro-Interaction Motion Provider
- Commitment 4 → Section/Page-level Motion Provider
- Commitment 5 → Section/Page-level Motion Provider + Micro-Interaction
  Motion Provider (joint constraint)
- Commitment 6 → Motion Mode Resolver
- Commitment 7 → Motion Mode Resolver + both Providers
- Commitment 8 → Section/Page-level Motion Provider + Micro-Interaction
  Motion Provider (joint constraint)

---

*Created: 2026-09-01*
