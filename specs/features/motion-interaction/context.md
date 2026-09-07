# Feature Context: Motion & Interaction

**Status:** Approved

## Problem

The site's Features already output complete, functional static content and
structure — but a specific, already-identified set of moments has no
defined motion or interaction behavior at all:

1. About Narrative's content has no defined progressive-reveal behavior,
   including what happens when a visitor arrives at the section directly
   via nav rather than by scrolling into it.
2. The Hero's elements have no defined first-load entrance choreography,
   distinct from returning to the Hero via in-page navigation.
3. Section Navigation's nav has no defined transition between its
   Hero-context and post-Hero visual identity — already flagged Pending in
   its own UX Specification.
4. Section Navigation's Active Screen Indicator has no defined motion/
   feedback for reflecting a scroll-spy-driven change — also flagged
   Pending in its own UX Specification.
5. Direct Contact's CTA has no interaction treatment beyond a generic
   hover.
6. Touch/mobile devices have no defined equivalent feedback for
   hover-dependent interactions.

Left unresolved, the site's individually strong Features would read as
functionally complete but experientially inert, undermining the modern,
alternative, experimental character Project Design names as the core
creative thread running through the whole experience.

## Motivation

Directly serves Project Design's "Motion & interaction as expression" and
"Show, don't just tell" Functional Principles — the site's own execution,
including its motion, is the primary evidence of Javi's design and
implementation capability. Project UX's Experience Overview explicitly
pushes the experience to be "more expressive in motion... rather than
assumed."

## Scope

### Included

- The problem of About Narrative's content having no defined
  progressive-reveal behavior, including the direct-arrival-via-nav case
  (Problem 1).
- The problem of the Hero having no defined first-load entrance
  choreography, distinct from in-session return navigation (Problem 2).
- The problem of the nav having no defined transition between its
  Hero-context and post-Hero visual identity (Problem 3).
- The problem of the nav's Active Screen Indicator having no defined
  motion/feedback (Problem 4).
- The problem of Direct Contact's CTA having no interaction treatment
  beyond a generic hover (Problem 5).
- The problem of touch/mobile devices having no defined equivalent
  feedback for hover-dependent interactions (Problem 6).
- The general problem of motion needing to read as one coherent system
  (a single curve/timing character) rather than isolated per-element
  treatments.
- The general problem of one-time entrance animations needing to not
  replay on later in-session re-navigation.

Raised as candidates but not yet confirmed in or out of scope — a scope
decision deferred to Feature Solution: a scroll-progress indicator,
inter-section transition treatment, image-reveal-with-mask treatment, a
custom cursor on desktop, an initial page loader, and the motion
expression of keyboard-focus states specifically (beyond Accessibility's
existence guarantee).

### Excluded

- The actual choreography, timing, and curve specifics themselves —
  belong to Feature Solution / Feature UX Specification; captured here
  only as problems to resolve, not as designed behavior.
- The concrete technical mechanism or animation library/technology —
  explicitly left to whoever implements, with access to code and Figma;
  Technical Design's concern.
- The content, structure, and functional contract of what's animated, and
  focus-state existence/compliance — unchanged from Feature Definition's
  boundary, owned by each individual Feature / `accessibility`
  respectively.
- Content Localization's language-switch visual effect — not raised in
  this conversation; not included in this Context's scope.

## Constraints

- Motion must read as one coherent system across the whole site — a
  single consistent curve/timing character, not isolated per-element
  treatments.
- Must respect the visitor's `prefers-reduced-motion` preference
  (inherited firm invariant from Feature Definition).
- One-time entrance animations (e.g. the Hero's first-load choreography)
  must not re-trigger on later in-session re-navigation to the same
  section/screen — requires session/visit-scoped state.
- Concrete implementation choices (animation library, easing/timing
  values, technical mechanism) are explicitly left to whoever implements,
  with access to the codebase and Figma.
- Inherited from project level: must work across the full device range
  (mobile/desktop); static-generated architecture with no backend; solo
  effort with no fixed deadline.

## Known Dependencies

- Applies across `hero-presentation`, `about-narrative`, `direct-contact`,
  `presence-links`, `content-localization`, `language-override`,
  `section-navigation` — per the catalog's recorded relationship.
- **`accessibility`** — supplies the existence/compliance guarantee for
  interactive/focus states this Feature animates.
- **`section-navigation`** — its own approved UX Specification already
  defers the Hero-vs-rest identity transition, the Active Screen
  Indicator's motion, and the mobile overlay's open/close transition to
  this Feature; confirmed here as this Feature's problem to resolve, not
  new scope invented unilaterally.
- **`direct-contact`** — its CTA is the specific element needing
  elaborated interaction treatment; this Feature depends on its existing
  markup/function without altering it.
- Firm invariants inherited from Feature Definition: Hero's composition
  must reach its complete visual state during arrival before scroll/
  interaction; Hero's scroll cue stays non-interactive/non-focusable;
  About Narrative's content pieces must never require a visitor action to
  become visible; a reduced-motion fallback is mandatory everywhere.

---

*Created: 2026-09-07*
