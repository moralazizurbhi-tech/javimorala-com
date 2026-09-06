# Feature UX Specification: Hero Presentation

**Status:** Approved

## UX Scope

Specializes Project UX's Introduction screen, the "Get an impression of
who Javi is" User Flow, the Scroll/Continue Cue UI Component, and the
Visual Identity's decorative-mark entrance role — for the composition of
headline/tagline, ornamental-mark placement, and entry scroll cue as one
arrival moment. Consistent with Feature Solution/Contract's boundary:
excludes nav, presence links, the ornamental mark's visual asset, and
motion timing/sequencing.

## User Flows

### Hero arrival

Specializes Project UX's "Get an impression of who Javi is" flow.

- Visitor lands on Introduction → composition reaches its complete state
  (headline/tagline, ornamental mark, scroll cue all present, per Feature
  Contract Commitment 1) → visitor perceives Javi's identity/character
  and sees the scroll cue's invitation → visitor continues via free
  scroll or the persistent nav (owned by `section-navigation`, not
  redefined here) → or leaves.
- No separate "activate scroll cue" flow exists — Contract Commitment 3
  establishes the scroll cue produces no scroll/navigation effect when
  activated.

## Screens

### Introduction (Hero view)

Existing identity, from Project UX's Screens.

- Purpose: present the first-impression composition as one moment.
  Participates in the Hero arrival flow.
- Perceptual/experience direction: the headline is the primary,
  first-perceived element carrying Javi's voice and character; the
  ornamental mark reads as a secondary, anchoring visual presence
  alongside the headline, not competing with it for primary attention;
  the scroll cue is the last, quieter invitation, perceived only after
  headline and mark have landed. This is the experience Feature UI must
  realize — exact spatial layout, sizing, and positioning are Pending,
  left entirely to Feature UI.
- Desktop/tablet and mobile both realize this same experience, each
  through its own purpose-built treatment, not a generic reflow (Contract
  Commitment 4) — the specific per-device-class realization is Pending,
  left to Feature UI.

## Interaction States

- **Composition complete** — the settled state where headline/tagline,
  ornamental mark, and scroll cue are all presented together; the
  primary steady state the visitor perceives and interacts from (Contract
  Commitment 1). Any entrance transition into this state belongs to
  `motion-interaction`'s definition, not this Feature's UX state model.
- **Reduced-motion** — per Project UX's mandatory reduced-motion
  fallback, the variant in which the composition still reaches its
  complete state without relying on animated entrance.

## Feature Components

- **Headline/tagline block** — Feature-specific text presentation of the
  arrival message; content confirmed below.
- **Ornamental mark (Hero centerpiece placement)** — specializes Project
  UX's Visual Identity note on the larger, decorative mark's
  entrance-moment role; the mark's own visual design/asset is not owned
  here (Feature Definition boundary).
- **Scroll cue (Hero placement)** — specializes Project UX's
  Scroll/Continue Cue component for its role in this composition;
  passive affordance only (Feature Solution/Contract), carrying a short
  text label per below.

## Content and Assets

- **Headline/tagline text (English)** — Confirmed: "Building / the web /
  with a rebellious streak" (three-line arrangement; exact
  typographic/line-break treatment is Feature UI's decision — this
  confirms the words and their intended multi-line rhythm as part of the
  experience).
- **Headline/tagline text (Spanish, Euskera)** — Pending: authoritative
  translated values not yet confirmed; resolved via
  `content-localization`'s authoring process before launch.
- **Scroll cue text (English)** — Confirmed: "there's more below."
- **Scroll cue text (Spanish, Euskera)** — Pending.
- **Ornamental mark asset** — Excluded: the visual asset itself is shared
  substrate, not a content requirement owned by this Feature; only its
  placement is this Feature's concern.

## UX Constraints

- Composition must express within the existing visual identity —
  near-black/off-white base palette with vivid gradient accents reserved
  for emphasis.
- Reduced-motion fallback is mandatory for this Feature's arrival
  presentation.
- Desktop, tablet, and mobile must each receive a purpose-built
  treatment, not a generic reflow.
- Full keyboard operability, visible focus states, sufficient contrast,
  and assistive-technology compatibility apply to the scroll cue if it is
  an interactive/focusable element.

---

*Created: 2026-09-06*
