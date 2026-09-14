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
7. Section Navigation's "about"/"contact" nav links have no defined
   hover/focus feedback beyond default browser/link styling — already
   flagged Pending, deferred to this Feature, in Section Navigation's
   own UX Specification.
8. Presence Links have no defined hover/focus feedback at either
   placement (Introduction glimpse, Connection group) — already flagged
   Pending, deferred to this Feature, in Presence Links' own UX
   Specification.
9. The Language Switcher — trigger, dropdown open/close, and option
   list — has no defined motion or interaction feedback at all — already
   flagged Pending, deferred to this Feature, in Language Override's own
   UX Specification.
10. Section Navigation's divider line has no defined transition between
    its segmented state (split into two independently rendered segments
    around a centered mark) and its continuous state — already flagged as
    deferred to this Feature in Section Navigation's own approved
    Solution/Technical Design (Commitment 8).
11. Hero's headline, scroll cue, and Presence Links have no defined
    scroll-driven exit behavior as the visitor scrolls past the Hero.
    Whether this transition is reversible on scroll-up is unresolved by
    default; treated here as bidirectional, reversible 1:1 with
    scroll-progress (consistent with the mark's own transformation,
    Problem 12) — not a one-way "reveal once" state like About
    Narrative's paragraphs (Problem 1).
12. The Hero's ornamental mark has no defined mechanism for becoming the
    nav's compact logo identity as the visitor scrolls past the Hero
    boundary, as a single continuously-transforming element —
    superseding the crossfade-based approach Problem 3 originally
    assumed. Desktop: a continuous morph into the nav logo position.
    Mobile: already defined as a non-morph treatment — no logomark
    destination exists there, so the mark dissolves via a reverse
    stroke-trace (its entrance gesture, played backward). Tablet:
    genuinely unresolved and blocking — whether tablet's nav composition
    has room for a central logomark or collapses to mobile's hamburger
    composition is Section Navigation's own composition decision; this
    Problem cannot be fully resolved for tablet until that's settled
    there.
13. About Narrative's photos have no defined tilt/depth interaction
    responding to cursor position (desktop) or scroll motion (mobile).
    Depends on a static base "polaroid" rotation applied to the photos
    at rest — this does not currently exist in About Narrative's own
    approved UI Definition (which explicitly specifies no framing/
    rotation), so this Problem has a real, unresolved prerequisite
    there, distinct from this Feature's own additive tilt motion.
14. This Feature's own scroll-driven components (the Hero mark's
    transformation, the nav progress fill, the nav divider's
    segmentation, Section Navigation's active-section detection) each
    independently track scroll position, with no defined shared
    coordination.
15. Direct Contact's CTA has no defined motion treatment for a
    persistent, always-visible discoverability affordance (distinct
    from Problem 5's hover-only feedback). Not cosmetic: user testing
    found visitors don't perceive the CTA text as clickable at all, and
    Problem 5's hover-only feedback can't solve that (it only registers
    after a visitor already attempts to interact). Direct Contact's own
    composition now contains the affordance element (its own Contract
    Commitment 7) — this Problem is resolved as of this pass.

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
- The problem of Section Navigation's "about"/"contact" links having no
  defined hover/focus feedback (Problem 7).
- The problem of Presence Links having no defined hover/focus feedback
  at either placement (Problem 8).
- The problem of the Language Switcher having no defined
  interaction/motion treatment for its trigger, dropdown open/close, and
  option list (Problem 9).
- The problem of Section Navigation's divider line having no defined
  transition between its segmented state (a mark occupying the center)
  and continuous state (Problem 10).
- The problem of Hero's headline, scroll cue, and Presence Links having
  no defined scroll-driven exit behavior (Problem 11).
- The problem of the Hero's mark having no defined mechanism for
  becoming the nav's compact logo identity on scroll (Problem 12).
- The problem of About Narrative's photos having no defined tilt/depth
  interaction (Problem 13).
- The problem of this Feature's own scroll-driven components having no
  shared coordination (Problem 14).
- The problem of Direct Contact's CTA having no defined motion treatment
  for a persistent discoverability affordance (Problem 15).
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
- The ambient Ornamental Logo ghost-texture instances on About Narrative
  and Direct Contact — confirmed to stay static, matching those
  Features' own Technical Design; no motion-interaction treatment.
- About Narrative parallax (text and photos) — considered and excluded,
  to avoid visual fatigue in the section with the most running text.
- The underline→envelope-icon morph on the CTA — excluded; too much
  production effort for a perception window that short before `mailto:`
  fires.
- About Narrative's photo scale-in reveal — excluded outright; replaced
  by a blur/desaturation+tint-to-sharp/colour treatment (Problem 1).
- The envelope icon's existence as a UI element — Direct Contact's own
  scope, not this Feature's (Problem 15).
- The nav logo's exact rest-state size value — Section Navigation's own
  UI Definition's scope, not this Feature's (Problem 12).

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
  Indicator's motion, the mobile overlay's open/close transition, and its
  nav link hover/focus feedback (Problem 7) to this Feature; confirmed
  here as this Feature's problem to resolve, not new scope invented
  unilaterally. Its divider line — the element this Feature's Active
  Screen Indicator motion treatment (Problem 4) is applied to — is now
  structurally two independently rendered segments around whichever
  Ornamental Mark/Logo occupies the center, with a scroll-derived
  variable gap on the Introduction screen specifically, not a single
  continuous line (per its own approved Technical Design, Commitment 8);
  this Feature's existing Problem 4 treatment needs to be revisited
  against this structure, and Commitment 8's segmented/continuous
  transition itself is this Feature's problem to resolve (Problem 10).
  Also blocks Problem 12's tablet resolution — whether tablet retains a
  central-logomark-capable nav composition or collapses to mobile's
  hamburger composition is undecided anywhere in the catalog yet.
- **`hero-presentation`** — now composes Presence Links as a 4th
  first-load element (desktop/tablet only), subordinate to mark/headline/
  scroll cue — within Problem 2's existing entrance-choreography scope,
  not a new problem. Also exposes a mark-visibility sentinel that Problem
  10's transition will need to consume. The mark asset this Feature
  transforms into the nav position on scroll (Problem 12) is the same
  element Hero Composition renders, not a second element crossfading
  with it — a stronger continuity than Problem 3's original crossfade
  assumption.
- **`about-narrative`** — its opening line now carries distinct
  typographic emphasis as the composition's "greeting moment,"
  distinguishable from the other five body-tier blocks — a structural
  fact within Problem 1's existing reveal scope. Problem 13's tilt
  motion also has an unresolved prerequisite on About Narrative's own UI
  Definition adding a static base rotation — currently absent there.
- **`direct-contact`** — its CTA is the specific element needing
  elaborated interaction treatment; this Feature depends on its existing
  markup/function without altering it. Its CTA now composes a persistent
  discoverability-affordance icon (its own Contract Commitment 7) — this
  Feature depends on that element's existing markup without altering it,
  same as any other element it layers motion onto (Problem 15, now
  resolved).
- **`presence-links`** — its own approved UX Specification already
  defers all motion/hover treatment to this Feature ("No motion, timing,
  or reveal behavior is defined here — owned by `motion-interaction`");
  this Feature depends on its existing markup/placement at both
  placements without altering it (Problem 8).
- **`language-override`** — its own approved UX Specification already
  defers the dropdown's open/close transition and all hover/focus
  treatment to this Feature ("No motion, timing, or transition behavior
  ... is defined here — owned by `motion-interaction`"); this Feature
  depends on its existing markup/behavior without altering it (Problem
  9).
- Firm invariants inherited from Feature Definition: Hero's composition
  must reach its complete visual state during arrival before scroll/
  interaction; Hero's scroll cue stays non-interactive/non-focusable;
  About Narrative's content pieces must never require a visitor action to
  become visible; a reduced-motion fallback is mandatory everywhere.

---

*Created: 2026-09-07*
