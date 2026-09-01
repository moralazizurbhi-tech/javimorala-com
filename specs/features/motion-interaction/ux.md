# Feature UX Specification: Motion & Interaction

## UX Scope

Specializes Project UX's Experience Overview (motion as a deliberate new
layer; bold/confident/technical impression; "show, don't tell") and the
global UX Constraints (bold section/page motion vs. restrained
micro-interaction; scroll never hijacked; mandatory reduced-motion
fallback) — for the existing Hero, About, Contact views and the Mobile nav
overlay, defining the qualitative visual character of the two treatment
categories those views already reference structurally.

Excludes: exact timing/easing/duration values and implementation
(Technical Design); each view's own content/composition (owned by
Hero/About/Contact/`section-navigation`); locale/content rendering
(`content-localization`).

## User Flows

### First-time Section Reveal

Specializes Project UX's existing "First impression" / "Learn about Javi"
/ "Reach out" flows (Contract Commitment 2).

- Visitor scrolls, or uses the persistent nav, into a section not yet
  entered this visit (or the section is visible at page load) → the
  section's content fades in while rising into place → content settles at
  rest, fully interactive.
- Visitor later scrolls away and back into the same section → content is
  already at rest; no reveal repeats.

### Micro-Interaction Feedback

Specializes the general interaction pattern shared across all UI
Components (Contract Commitment 3).

- Visitor hovers, focuses, presses, or activates an interactive element
  (nav links, social icons, language-override control, the "Send Me An
  E-Mail" device, cards) → element responds with a small scale change
  plus an opacity/colour shift → returns to rest when the interaction
  ends. Repeats identically every time.

### Mobile Nav Overlay Toggle

Specializes Project UX's "Mobile nav trigger -> Menu overlay" flow
(Contract Commitment 4).

- Visitor taps the nav trigger → overlay content fades in while rising
  into place, using the same bold character as Section Reveal → visitor
  selects a destination or dismisses → overlay fades/rises out
  symmetrically. Repeats identically on every open/close, never
  suppressed.

### Reduced-Motion Visit

Specializes Project UX's mandatory reduced-motion fallback (Contract
Commitments 6, 7).

- Visitor's system reduced-motion preference is active at page load → for
  the remainder of the visit, every Section Reveal, Micro-Interaction, and
  Nav Overlay Toggle above occurs as an instant state change — no fade, no
  rise, no scale — while still reaching the same end state.

## Screens

### Hero view / About view / Contact view

Existing identity, from Project UX's Screens.

- Purpose (this Feature's slice): host Section Reveal on first entry and
  Micro-Interaction feedback on their interactive elements, without
  redefining each view's own composition/content. Participates in Section
  Reveal, Micro-Interaction Feedback, Reduced-Motion Visit.

### Mobile nav overlay

Existing identity, from Project UX's Screens.

- Purpose (this Feature's slice): host the Nav Overlay Toggle's bold
  transition and Micro-Interaction feedback on its internal links, without
  redefining its own structure/content (owned by `section-navigation`).
  Participates in Mobile Nav Overlay Toggle, Micro-Interaction Feedback,
  Reduced-Motion Visit.

## Interaction States

- **Not-yet-entered / Entered (per section)** — a section not yet visited
  this visit is poised to play its Section Reveal on first arrival; once
  Entered, it appears immediately at rest on any later view.
- **Micro-interaction rest / active** — an interactive element at rest
  vs. actively receiving hover/focus/press feedback; transitions
  immediately with the input and back on release/blur.
- **Nav overlay closed / open** — each transition, either direction,
  always shows the full bold reveal/exit character; no "already seen"
  distinction, unlike sections.
- **Reduced-motion** — per Project UX's mandatory fallback, Section
  Reveal, Micro-Interaction, and Nav Overlay Toggle all reach their
  settled/end state instantly, with no animated transition, for the
  remainder of the visit.

## Feature Components

- **Bold Section Reveal pattern** — fade + upward rise; the shared,
  reusable motion pattern applied to section-level content entry and to
  the nav overlay's open/close transition alike, so both read as the same
  bold "vocabulary."
- **Restrained Micro-Interaction pattern** — subtle scale plus an
  opacity/colour shift; the shared, reusable feedback pattern applied to
  interactive elements across features, without redefining those
  elements' own visual design (owned by their respective Features /
  Project UX's Styling System).
- **Reduced-Motion Equivalent pattern** — fully static, instant state
  change substituting for both patterns above whenever Reduced Mode is
  active.

## UX Constraints

- The Bold Section Reveal and the Nav Overlay transition always share the
  same visual character (fade + upward rise); they never diverge into two
  different bold "vocabularies."
- The Restrained Micro-Interaction pattern never adopts the Bold pattern's
  character (no upward rise, no fade-based reveal) — limited to scale +
  opacity/colour shift, preserving the intensity contrast (Existing,
  global — "restrained by contrast").
- In Reduced Mode, no fade, rise, or scale occurs anywhere; every state
  change is instant, with no exception for any of the three patterns.
- None of the three patterns may alter scroll position, consistent with
  the Feature Solution's scroll-control invariant (Existing).
- Text/interactive elements must maintain accessible contrast at every
  point in the Micro-Interaction active state (Existing, global).
- Perceived performance must not be compromised by any of the three
  patterns (Existing, global).

---

*Created: 2026-09-01*
