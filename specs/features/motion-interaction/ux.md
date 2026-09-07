# Feature UX Specification: Motion & Interaction

**Status:** Approved

## UX Scope

Specializes Project UX's Experience Overview ("more expressive in
motion... scroll-triggered reveals, animated transitions, responsive
interaction states") and Visual Foundations' "Shared interaction-state
conventions," for the moments Feature Solution/Contract define: Hero's
first-load entrance, About Narrative's progressive reveal, Section
Navigation's identity transition and merged indicator, Direct Contact's
CTA feedback, and touch-equivalent feedback. Excludes each Feature's own
content/structure, focus-state existence (owned by `accessibility`), and
the concrete technical mechanism (Feature Technical Design).

## User Flows

### Hero first-load entrance

Specializes Hero Presentation's "Hero arrival" flow.

- Visitor loads the site for the first time this visit → the ornamental
  mark's background gradient establishes first — the ambient backdrop the
  composition arrives into — then the headline appears on top of it as
  the primary, dominant content beat, then the scroll cue appears last as
  the quiet closing beat, timed as the sequence's natural conclusion —
  each element with its own distinct entrance character, not a uniform
  synchronized fade → composition reaches its complete state (Contract
  Commitment 2).
- Later in the same visit, returning to Hero via nav/logomark shows this
  complete state directly — no replay of the sequence.

### Hero ambient steady-state

Extends Hero Presentation's existing "Composition complete" interaction
state with a purely atmospheric elaboration — not a new functional
behavior, and not covered by a Feature Contract commitment, since it has
no functional pass/fail condition.

- Once the entrance sequence has settled, the background mark's gradient
  drifts slowly and continuously — subtle, ambient only, never applied to
  foreground content elements (headline, scroll cue). Pauses and stays
  static whenever the visitor's reduced-motion preference is active.

### About Narrative progressive reveal

Specializes About Narrative's "Learn about Javi" flow.

- Visitor scrolls into Personal Narrative → each paragraph and each photo
  (About Narrative's existing separately-addressable structural units)
  becomes visible as the visitor's scroll reaches it, in reading order,
  and stays visible (Contract Commitment 1).
- Visitor arrives at Personal Narrative directly via nav → the complete
  narrative (all paragraphs, both photos) is visible immediately.

### Nav identity transition + indicator

Specializes Section Navigation's "Orient during free scroll" and "Reach
any screen directly" flows.

- Visitor scrolls from Introduction into Personal Narrative → the nav
  transitions from its Hero-context presentation (wordmark + links, no
  compact logomark icon, per Section Navigation UX) to its post-Hero
  presentation (wordmark + compact logomark icon + links) as a visible
  transition, not an instant swap; the merged Active/Progress indicator
  simultaneously shifts to reflect the new active screen and progress
  (Contract Commitment 3, 4).
- Visitor scrolls back toward Introduction → the reverse transition
  occurs.
- Visitor activates a nav link → the indicator transitions to the target
  screen; if the jump crosses the Hero boundary, the nav identity
  transition also occurs.

### Direct Contact CTA + touch-equivalent feedback

Specializes Direct Contact's "Reach Javi" flow.

- Desktop visitor hovers the CTA → the CTA responds with a distinct
  interaction feedback beyond simple color/scale change (exact visual
  treatment Pending, Feature UI) → visitor activates it → unchanged
  `mailto:` hand-off, per Direct Contact's own flow (Contract Commitment
  5).
- Touch-device visitor taps the CTA → an equivalent, necessarily
  momentary feedback registers at the moment of tap, since touch has no
  hover → unchanged `mailto:` hand-off proceeds (Contract Commitment 6).

### Reduced-motion

- Visitor with reduced-motion preference active experiences every flow
  above, but each transition/reveal resolves directly to its end-state
  without intermediate animated motion — Hero shows complete on load,
  About Narrative content is revealed without animated motion (at each
  scroll-reach point, or immediately on direct-nav arrival), nav identity/
  indicator update directly, CTA/touch feedback still register as a
  discrete, non-animated visual change, and the Hero's ambient gradient
  drift pauses (Contract Commitment 7).

## Screens

This Feature is cross-cutting and owns no screen of its own; it
participates in the three Project UX screens through the Features that
own them.

### Introduction

- Motion purpose: stages the first-load entrance choreography, the Hero
  ambient steady-state, and the nav's Hero-context identity. Participates
  in the Hero first-load entrance, Hero ambient steady-state, and Nav
  identity transition flows.

### Personal Narrative

- Motion purpose: stages About Narrative's progressive reveal and the
  nav's post-Hero identity. Participates in the About Narrative
  progressive reveal and Nav identity transition flows.

### Connection

- Motion purpose: stages Direct Contact's CTA feedback. Participates in
  the Direct Contact CTA flow.

## Interaction States

- **Hero First-Load Entrance:** `Not yet played` (sequenced entrance
  shows) / `Played` (complete state shows directly, persists for the rest
  of the visit).
- **Hero Ambient Drift:** `Static` (pre-entrance, or whenever
  reduced-motion is active) / `Drifting` (default, post-entrance) — the
  background mark's continuous gradient motion.
- **About Narrative Piece** (per piece): `Hidden` / `Revealed` (permanent
  for the visit once reached).
- **Nav Identity:** `Hero-context` / `Post-Hero`, transitioning with
  scroll.
- **Active/Progress Indicator:** reflects the active screen plus a
  graduated progress reading, giving the visitor an ambient sense of
  "where am I" and "how far through."
- **CTA Feedback:** momentary states on hover (desktop) or tap (touch).
- **Reduced-Motion:** `Off` / `On` — On removes animated transitions
  (including the ambient drift) but preserves every functional end-state.

## Feature Components

- **Hero Entrance Choreographer** — sequences Hero's existing elements
  (background mark, headline, scroll cue) per the order above.
- **Ambient Gradient Drift** — continuous, slow, subtle motion applied
  only to the Hero background mark.
- **About Narrative Scroll-Reveal Treatment** — applies to About
  Narrative's existing paragraph/photo units.
- **Nav Identity Transition** — specializes Section Navigation's nav bar/
  overlay for the Hero-context/post-Hero shift.
- **Merged Active/Progress Indicator** — extends Section Navigation's
  existing Active Screen Indicator with a progress dimension.
- **CTA Interaction Feedback** — specializes Direct Contact's CTA with
  hover/touch feedback.
- **Touch-Feedback Pattern** — general pattern applied wherever hover
  feedback exists.

## Content and Assets

- Excluded — this Feature introduces no new user-visible text or asset
  content; it applies motion treatment to content owned by other
  Features.

## UX Constraints

- Motion must read as one coherent system — consistent character across
  every treatment.
- Reduced-motion fallback is mandatory across every state above,
  including the ambient gradient drift.
- Every included behavior must serve an articulable purpose (inherited
  from Feature Solution).
- Nav and indicator transitions must not alter Section Navigation's own
  defined content/links — presentation/transition only.
- CTA feedback must not compromise keyboard/screen-reader accessibility
  or alter its destination.
- Full keyboard operability, visible focus states, sufficient contrast,
  and assistive-technology compatibility apply — motion must not
  interfere with those guarantees.
- The ambient gradient drift must be slow and subtle enough to never
  compete with or distract from foreground content.

---

*Created: 2026-09-07*
