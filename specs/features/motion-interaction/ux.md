# Feature UX Specification: Motion & Interaction

**Status:** Approved

## UX Scope

Specializes Project UX's Experience Overview ("more expressive in
motion... scroll-triggered reveals, animated transitions, responsive
interaction states") and Visual Foundations' "Shared interaction-state
conventions," for the moments Feature Solution/Contract define: Hero's
first-load entrance, About Narrative's progressive reveal, Section
Navigation's identity transition, merged indicator, and divider segment
transition, Hero's scroll-linked exit and mark transformation, About
Narrative's photo tilt, Direct Contact's CTA feedback and discoverability
motion, nav link/Presence Link/Language Switcher hover-focus
feedback, the Language Switcher's dropdown open/close transition, and
touch-equivalent feedback. Excludes each Feature's own content/structure,
focus-state existence (owned by `accessibility`), and the concrete
technical mechanism (Feature Technical Design).

## User Flows

### Hero first-load entrance

Specializes Hero Presentation's "Hero arrival" flow.

- Visitor loads the site for the first time this visit → the ornamental
  mark's background gradient establishes first — the ambient backdrop the
  composition arrives into — then the headline appears on top of it as
  the primary, dominant content beat, then the scroll cue appears last as
  the quiet closing beat, timed as the sequence's natural conclusion —
  joined simultaneously by Presence Links when Hero composes it
  (desktop/tablet), entering together with the scroll cue as the
  sequence's final beat — each element with its own distinct entrance
  character, not a uniform synchronized fade → composition reaches its
  complete state (Contract Commitment 2).
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

### Hero scroll-linked exit and mark transformation

Specializes Hero Presentation's "Hero arrival" flow's inverse — the
visitor's transition away from the Hero.

- Visitor scrolls down from the Hero → headline, scroll cue, and
  Presence Links (when composed) fade out continuously with scroll
  position (~0–35% of the Hero's height) → overlapping before that fade
  completes (~25–70%), the mark itself begins transforming: desktop,
  morphing continuously into the nav's compact logo position/form;
  mobile, dissolving via a reverse trace of its own entrance stroke —
  one continuous transition, not two coincidentally-timed events
  (Contract Commitments 11, 12).
- By ~70–100%, the mark has settled into its final nav-anchored form,
  coinciding with Nav Identity Transition's post-Hero presentation.
- Visitor scrolls back up at any point → both the fade and the
  transformation reverse along the same relationship to scroll
  position — fully bidirectional.
- Tablet: unresolved — depends on Section Navigation's own
  nav-composition decision (Context Problem 12), not decided here.

### About Narrative progressive reveal

Specializes About Narrative's "Learn about Javi" flow.

- Visitor scrolls into Personal Narrative → the opening line reveals with
  its own distinct treatment, distinguishing it as the composition's
  greeting moment, then each remaining paragraph and each photo (About
  Narrative's existing separately-addressable structural units) becomes
  visible as the visitor's scroll reaches it, in reading order, and stays
  visible (Contract Commitment 1).
- Visitor arrives at Personal Narrative directly via nav → the complete
  narrative (all paragraphs, both photos) is visible immediately.

### About Narrative photo tilt

Specializes About Narrative's "Learn about Javi" flow with an ambient,
exploratory elaboration — not itself required to register a discrete
pass/fail interaction the way hover feedback does, though Contract
Commitment 13 does define its observable bounds.

- Desktop visitor moves the cursor across a revealed photo → the photo
  tilts to follow cursor position, up to 4°, additive to whatever static
  base rotation the photo already carries (currently undefined in About
  Narrative's own UI) → cursor leaves → eases back to rest.
- Mobile visitor scrolls past a revealed photo → tilt derives from
  scroll direction/velocity, no device-permission prompt.

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

### Nav divider segment transition

Specializes Section Navigation's nav-bar composition (Contract
Commitment 10).

- Visitor on Introduction scrolls until Hero's mark no longer occupies
  the divider's center (per Hero's exposed mark-visibility sentinel) →
  the divider transitions from its segmented state to its continuous
  state, as a visible, discrete transition — not an instant snap.
- Visitor scrolls back so the mark re-occupies the center → the reverse
  transition occurs.
- On Personal Narrative/Connection, where the compact Ornamental Logo
  occupies the divider's center throughout, the divider stays in its
  segmented state.
- Independent of the Nav Identity transition and the Active/Progress
  Indicator above — the three may visually coincide near the same scroll
  position on Introduction but are governed separately.

### Direct Contact CTA + touch-equivalent feedback

Specializes Direct Contact's "Reach Javi" flow.

- Desktop visitor hovers the CTA → the CTA responds with a distinct
  interaction feedback beyond simple color/scale change (exact visual
  treatment Pending, Feature UI), also drawing an underline left-to-right
  beneath the text as part of that feedback (Contract Commitment 15) →
  visitor taps/clicks → the text scales down momentarily; once Direct
  Contact's own composition adds a persistent affordance icon (Context
  Problem 15, blocked, not decided here), this Feature's tap gesture
  will also apply a brief flourish to it → visitor activates it →
  unchanged `mailto:` hand-off, per Direct Contact's own flow (Contract
  Commitment 5).
- Touch-device visitor taps the CTA → an equivalent, necessarily
  momentary feedback registers at the moment of tap, since touch has no
  hover → unchanged `mailto:` hand-off proceeds (Contract Commitment 6).

### Nav link hover/focus feedback

Specializes Section Navigation's "Reach any screen directly" flow.

- Desktop visitor hovers "about" or "contact" → the link responds with a
  distinct feedback treatment (exact visual treatment Pending, Feature
  UI) → visitor activates it → unchanged anchor-jump, per Section
  Navigation's own flow (Contract Commitment 7).
- Keyboard visitor tabs focus onto a nav link → the same feedback
  treatment is observable on focus.

### Presence Link hover/focus feedback

Specializes Presence Links' "Discover Javi's broader presence" flow.

- Visitor hovers or focuses a Presence Link, at either placement
  (Introduction glimpse or Connection group) → the link responds with the
  same feedback treatment at both placements (exact visual treatment
  Pending, Feature UI) → visitor activates it → unchanged new-tab
  hand-off, per Presence Links' own flow (Contract Commitment 8).

### Language Switcher interaction feedback

Specializes Language Override's "Switch to a different language" flow.

- Visitor hovers or focuses the Language Switcher's trigger → feedback
  treatment shows (exact visual treatment Pending, Feature UI) → visitor
  activates the trigger → dropdown opens with a visible, discrete
  transition (Contract Commitment 9) → visitor hovers or focuses an
  option in the list → the same feedback treatment shows → visitor
  selects a different language → dropdown closes with a visible, discrete
  transition → Language Override's own flow continues from there
  unchanged.

### Reduced-motion

- Visitor with reduced-motion preference active experiences every flow
  above, but each transition/reveal resolves directly to its end-state
  without intermediate animated motion — Hero shows complete on load
  (including Presence Links, when composed), About Narrative content is
  revealed without animated motion (at each scroll-reach point, or
  immediately on direct-nav arrival), nav identity/indicator update
  directly, the nav divider reaches its correct segmented or continuous
  state directly, CTA/touch feedback (including the underline/tap-scale)
  still register as a discrete, non-animated visual change, nav
  link/Presence Link/Language Switcher hover/focus feedback still
  register without animated motion, the dropdown still reaches its
  open/closed state directly, and the Hero's ambient gradient drift
  pauses (Contract Commitment 16). The Hero's scroll-linked content exit
  and mark transformation continue exactly as specified, still driven
  directly by scroll position — not autoplaying motion, so not
  suppressed. About Narrative's photo tilt is disabled entirely —
  purely decorative and rotation-based, the same treatment as the
  ambient gradient drift.

## Screens

This Feature is cross-cutting and owns no screen of its own; it
participates in the three Project UX screens through the Features that
own them.

### Introduction

- Motion purpose: stages the first-load entrance choreography, the Hero
  ambient steady-state, and the nav's Hero-context identity. Participates
  in the Hero first-load entrance, Hero scroll-linked exit and mark
  transformation, Hero ambient steady-state, Nav identity transition, Nav
  divider segment transition, Nav link hover/focus feedback, Presence
  Link hover/focus feedback (Introduction placement), and Language
  Switcher interaction feedback flows.

### Personal Narrative

- Motion purpose: stages About Narrative's progressive reveal and the
  nav's post-Hero identity. Participates in the About Narrative
  progressive reveal, About Narrative photo tilt, Nav identity
  transition, Nav link hover/focus feedback, and Language Switcher
  interaction feedback flows.

### Connection

- Motion purpose: stages Direct Contact's CTA feedback. Participates in
  the Direct Contact CTA, Nav link hover/focus feedback, Presence Link
  hover/focus feedback (Connection placement), and Language Switcher
  interaction feedback flows.

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
- **Nav Link Feedback:** momentary states on hover/focus (desktop/
  keyboard) or tap (touch); same treatment for "about" and "contact."
- **Presence Link Feedback:** momentary states on hover/focus or tap;
  identical treatment at both placements (Introduction, Connection).
- **Switcher Trigger/Option Feedback:** momentary states on hover/focus
  or tap, for the trigger and for each option in the open list.
- **Switcher Dropdown:** elaborates Language Override's existing
  `Closed`/`Open` state with an observable, discrete open/close
  transition (rather than an instant show/hide).
- **Nav Divider Segmentation:** `Segmented` (a mark occupies the
  divider's center — Hero's mark on Introduction, the compact Ornamental
  Logo on Personal Narrative/Connection) / `Continuous` (no mark
  present) — transitions observably, governed independently of the
  Active/Progress Indicator.
- **Hero Content Exit:** `Visible ⇄ Faded`, continuous, scroll-progress-
  driven, reversible.
- **Hero Mark Transformation:** `Hero-form ⇄ Nav-logo-form` (desktop) or
  `Hero-form ⇄ Dissolved` (mobile), continuous, scroll-progress-driven,
  reversible; tablet unresolved.
- **Photo Tilt** (per photo): continuous rotation value, desktop
  cursor-driven / mobile scroll-driven, no discrete states.
- **Reduced-Motion:** `Off` / `On` — On removes animated transitions
  (including the ambient drift and the dropdown's open/close transition)
  but preserves every functional end-state.

## Feature Components

- **Hero Entrance Choreographer** — sequences Hero's existing elements
  (background mark, headline, scroll cue) and, when composed, Presence
  Links — entering together with the scroll cue as the sequence's final
  beat — per the order above.
- **Ambient Gradient Drift** — continuous, slow, subtle motion applied
  only to the Hero background mark.
- **Hero Scroll-Linked Exit** — fades the Hero's headline/scroll
  cue/Presence Links continuously with scroll.
- **Hero Mark Transformation** — desktop: morphs the mark into the nav
  logo; mobile: dissolves via reverse stroke-trace; tablet: unresolved
  (Context Problem 12).
- **About Narrative Scroll-Reveal Treatment** — applies to About
  Narrative's existing paragraph/photo units, giving the opening line its
  own distinct reveal treatment separate from the uniform paragraph/photo
  treatments.
- **Nav Identity Transition** — specializes Section Navigation's nav bar/
  overlay for the Hero-context/post-Hero shift.
- **Merged Active/Progress Indicator** — extends Section Navigation's
  existing Active Screen Indicator with a progress dimension.
- **CTA Interaction Feedback** — specializes Direct Contact's CTA with
  hover/touch feedback, an underline draw-on, and a tap scale-down; an
  icon flourish is contingent on Direct Contact's own composition
  eventually adding the icon (Context Problem 15, blocked).
- **Photo Tilt** — cursor-driven (desktop) or scroll-driven (mobile)
  tilt on About Narrative's revealed photos.
- **Nav Link Interaction Feedback** — specializes Section Navigation's
  "about"/"contact" links with hover/focus/touch feedback.
- **Presence Link Interaction Feedback** — specializes Presence Links'
  existing Presence Link Group with hover/focus/touch feedback, identical
  at both placements.
- **Switcher Interaction Feedback** — specializes Language Override's
  Language Switcher with trigger/option hover/focus/touch feedback and
  the dropdown's open/close transition.
- **Touch-Feedback Pattern** — general pattern applied wherever hover
  feedback exists.
- **Nav Divider Segment Transition** — specializes Section Navigation's
  divider line with a segmented/continuous transition driven by the
  mark-presence fact Section Navigation and Hero expose.

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
- Behaviour 12's tablet treatment and Behaviour 15's icon-flourish
  portion remain unresolved/blocked pending other Features' own
  decisions — not invented here.

---

*Created: 2026-09-07*
