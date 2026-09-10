# Feature UX Specification: Hero Presentation

**Status:** Approved

## UX Scope

Specializes Project UX's Introduction screen, the "Get an impression of
who Javi is" User Flow, the Scroll/Continue Cue UI Component, the
Presence Links UI Component's minor/secondary Introduction-screen role,
and the Visual Identity's decorative-mark entrance role — for the
composition of headline/tagline, the Ornamental Mark's placement, entry
scroll cue, and Presence Links' conditional placement as one arrival
moment.
Consistent with Feature Solution/Contract's boundary: excludes nav,
Presence Links' own link content, the ornamental mark's visual asset, and
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
- On device classes/viewports with room for it, the visitor also
  perceives Presence Links as a minor, secondary glimpse alongside the
  composition (Contract Commitment 5); on constrained/small screens it is
  not shown, and its absence there is not a partial-composition failure
  (Commitment 5 AC2/AC4).

## Screens

### Introduction (Hero view)

Existing identity, from Project UX's Screens.

- Purpose: present the first-impression composition as one moment.
  Participates in the Hero arrival flow. The composition also includes
  Presence Links as a minor/secondary glimpse when the device
  class/viewport has room for it (Commitment 5); it's omitted on
  constrained/small screens rather than compromising the primary
  composition.
- Perceptual/experience direction: the headline is the primary,
  first-perceived element carrying Javi's voice and character; the
  Ornamental Mark reads as a secondary, anchoring presence — but the two
  aren't independently placed elements that merely coexist. The mark's
  own descending form and the headline's two-group arrangement (a
  dominant word group, a lighter secondary-line group) are one
  compositional gesture: the mark reaches down toward each group at a
  different depth of connection matching that group's own weight —
  closer, interleaved contact with the dominant group; a lighter,
  proximate touch with the secondary group — so the mark reads as
  growing into/framing the headline rather than sitting behind it. On
  mobile, where the mark is cropped to bleed off-screen, only its
  trailing tendril reaches the dominant word — a lighter, single-point
  version of the same relationship; the secondary lines sit clear of the
  mark entirely, appropriate to its reduced footprint there. The mark
  never compromises legibility where it nears or crosses text (Project
  UX's Mark/Logo legibility constraint). The scroll cue is perceived only
  after headline and mark have landed together as this one composition.
  Exact spatial values are Feature UI's decision; this direction
  constrains their relationship, not literal coordinates.
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
- **Ornamental Mark** (Hero centerpiece placement) — specializes Project
  UX's Ornamental Mark, used only at this Introduction moment (distinct
  from the compact Ornamental Logo used in the nav bar and on
  About/Contact); the mark's own visual design/asset is not owned here
  (Feature Definition boundary). Its top-anchored height is tall enough
  to visually reach the nav row above it — an intentional echo of the
  Ornamental Logo's own nav-integrated placement elsewhere, not itself a
  claim on the nav's own composition (owned by `section-navigation`).
- **Scroll cue (Hero placement)** — specializes Project UX's
  Scroll/Continue Cue component for its role in this composition;
  passive affordance only (Feature Solution/Contract), carrying a short
  text label per below.
- **Presence Links (Hero placement)** — specializes Project UX's
  Presence Links component for its secondary/minor role at Introduction;
  shown only on device classes/viewports with room to accommodate it
  without compromising the primary composition (Commitment 5); its own
  link content is owned by `presence-links` — this Feature only
  coordinates its conditional placement/prominence here.

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
- **Presence Links content/list** — Excluded: link content itself is
  `presence-links`' own concern; this Feature only decides whether/where
  to show it within the Hero moment.
- **Ornamental mark asset** — Excluded: the visual asset itself is shared
  substrate, not a content requirement owned by this Feature; only its
  placement is this Feature's concern.

## UX Constraints

- Composition must express within the existing visual identity — a
  plain, warm near-black/off-white base palette (no gradient on the
  background), with the confirmed lilac-to-purple gradient — lilac
  dominant at the mark's crown, fading to a darker, muted purple at its
  receding tendrils (Project UX Visual Foundations) — applied
  specifically to the Ornamental Mark (an SVG asset) as the composition's
  emphasis element, faded enough at any overlap with the headline to
  preserve legibility (Project UX's Mark/Logo legibility constraint).
- Reduced-motion fallback is mandatory for this Feature's arrival
  presentation.
- Desktop, tablet, and mobile must each receive a purpose-built
  treatment, not a generic reflow.
- Full keyboard operability, visible focus states, sufficient contrast,
  and assistive-technology compatibility apply to the scroll cue if it is
  an interactive/focusable element.
- When shown, Presence Links must read as visually subordinate to
  headline/tagline, ornamental mark, and scroll cue — never competing
  with them for primary attention (Contract Commitment 5).

---

*Created: 2026-09-06*
