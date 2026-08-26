# Feature UX Specification: Hero Presentation

## UX Scope

Specializes Project UX's Hero view (Screens), the "First impression"
User Flow, the Scroll cue and Ornamental mark UI Components, and the
global UX Constraints — for the composition of headline/tagline,
wordmark centerpiece, and scroll cue as one arrival moment. Consistent
with Feature Solution/Contract's boundary: excludes nav, social links,
the wordmark's visual asset, motion timing/sequencing, the localization
mechanism, and actual copy.

## User Flows

### Hero arrival

Specializes Project UX's "First impression" flow.

- Visitor lands on Hero → composition reaches its complete state
  (headline/tagline, wordmark, scroll cue all present, per Feature
  Contract Commitment 1) → visitor perceives identity/value and sees the
  scroll cue's invitation → visitor continues via free scroll or the
  persistent nav (owned by `section-navigation`, not redefined here) →
  or leaves.
- No separate "activate scroll cue" flow exists — Contract Commitment 3
  establishes the scroll cue produces no scroll/navigation effect when
  activated.

## Screens

### Hero view

Existing identity, from Project UX's Screens.

- Purpose: present the first-impression composition as one moment.
  Participates in the Hero arrival flow.
- Composition direction — desktop/tablet: open, but guided by the
  legacy design's "feel" (asymmetric/staggered headline placement,
  centered wordmark, scroll cue anchored toward the layout's
  extremities, per Project UX's legacy reference) reinterpreted with
  modern execution; exact layout is Pending, left to detailed visual
  design.
- Composition direction — mobile: also open, keeping the same "feel,"
  deliberately left more open than desktop/tablet; must still be a
  purpose-built treatment, not a generic reflow (Project UX global
  constraint, Contract Commitment 4). Mechanism/specifics Pending.

Per Project UX, Hero/About/Contact each get a distinct responsive layout
but remain the same view, not additional screens — no separate "Mobile
Hero" screen is introduced.

## Interaction States

- **Composition complete** — the settled state where headline/tagline,
  wordmark, and scroll cue are all presented together; the primary
  steady state the visitor perceives and interacts from (Contract
  Commitment 1). Any entrance transition into this state belongs to
  `motion-interaction`'s definition, not this Feature's UX state model.
- **Reduced-motion** — per Project UX's mandatory reduced-motion
  fallback, the accessibility variant in which the composition still
  reaches its complete state without relying on animated entrance.

## Feature Components

- **Headline/tagline block** — Feature-specific text presentation of the
  arrival message; content itself supplied by `content-localization`,
  actual copy excluded from this Feature.
- **Wordmark (Hero centerpiece placement)** — specializes Project UX's
  "Ornamental mark" component for its Hero centerpiece role in this
  composition; the mark's own visual design/asset is not owned here
  (Feature Definition boundary).
- **Scroll cue (Hero placement)** — specializes Project UX's "Scroll
  cue" component for its role in this composition; passive affordance
  only (Feature Solution/Contract).

## UX Constraints

- Composition must express within the existing visual identity —
  dark-only, single accent, two-tier typography (Existing, global,
  reaffirmed here as directly applicable).
- Reduced-motion fallback is mandatory for this Feature's arrival
  presentation (Existing, global).
- Desktop, tablet, and mobile must each receive a purpose-built
  treatment, not a generic reflow (Existing, global + Contract
  Commitment 4).
- Perceived performance must not be compromised by visual richness
  (Existing, global, ties to Feature Solution's performance rule).

---

*Created: 2026-08-26*
