# Feature UX Specification: About Narrative

## UX Scope

Specializes Project UX's About view (Screens), the "Learn about Javi"
User Flow, and the global UX Constraints — for the composition of the
intro hook and bio content as one blended narrative moment. Consistent
with Feature Solution/Contract's boundary: excludes nav, social links,
motion timing/sequencing, the localization mechanism, actual copy, and
any reader-triggered interactive gating.

## User Flows

### Learn about Javi arrival

Specializes Project UX's "Learn about Javi" flow.

- Visitor reaches the About view (nav "about" link, mobile nav overlay
  selection, or scroll from Hero) → the intro hook presents first → bio
  content follows immediately as one continuous blended narrative,
  addressing both professional and personal identity with genuine weight
  (Contract Commitments 1–3) → visitor has read enough to feel a
  credible connection to Javi → visitor continues via free scroll or the
  persistent nav (owned by `section-navigation`) toward Contact, or
  leaves.
- No separate "expand" or "switch dimension" flow exists — Contract
  Commitment 5 establishes that no reader-triggered interaction gates
  any part of the narrative.

## Screens

### About view

Existing identity, from Project UX's Screens.

- Purpose: present the blended professional/personal narrative as one
  continuous read. Participates in the Learn about Javi arrival flow.
- Composition direction — desktop/tablet: open, informed by the legacy
  design's asymmetric, offset (non-aligned) layout "feel" (Project UX
  legacy reference), reinterpreted with modern execution; exact layout
  Pending, left to detailed visual design.
- Composition direction — mobile: per Project UX's global constraint,
  must receive an equally deliberate, purpose-built treatment —
  particularly notable since Project UX flags the About view's mobile
  treatment as the legacy design's weakest point. Mechanism/specifics
  Pending.
- Background texture: Project UX's legacy reference notes the oversized
  repeated wordmark texture read as too heavy in its literal legacy
  form, but removing it entirely left the composition feeling empty —
  flagged as a known open tension for detailed visual design, not
  resolved here.

Per Project UX, Hero/About/Contact each get a distinct responsive layout
but remain the same view, not additional screens — no separate "Mobile
About" screen is introduced.

## Interaction States

- **Narrative complete** — the settled state where the intro hook and
  full bio content are both presented together, readable via scrolling
  alone; the primary steady state the visitor reads from (Contract
  Commitment 5). Any reveal/entrance transition into this state belongs
  to `motion-interaction`, not this Feature's UX state model.
- **Reduced-motion** — per Project UX's mandatory reduced-motion
  fallback, the accessibility variant in which the full narrative is
  still reachable/readable without relying on animated reveal.

## Feature Components

- **Intro hook block** — Feature-specific text presentation opening the
  narrative as a distinct narrative moment; explicitly not an instance
  of Project UX's generic "Section header pattern" component (Feature
  Solution: "a distinct opening moment, not a section label"). Content
  supplied by `content-localization`; actual copy excluded.
- **Bio content block** — Feature-specific text presentation of the
  blended professional/personal narrative body. Content supplied by
  `content-localization`; actual copy excluded.

## UX Constraints

- Composition must express within the existing visual identity —
  dark-only, single accent, two-tier typography (Existing, global).
- Reduced-motion fallback is mandatory for this Feature's reveal
  presentation (Existing, global).
- Desktop, tablet, and mobile must each receive a purpose-built
  treatment, not a generic reflow (Existing, global) — especially
  significant given the About view's flagged legacy mobile weakness.
- Perceived performance must not be compromised by visual richness
  (Existing, global).
- No reader-triggered interactive gating (expand/collapse, tabs) may be
  introduced at the UX level — reaffirms Contract Commitment 5.
- No visually distinct, separately labeled sub-sections for professional
  vs. personal content — reaffirms Contract Commitment 2 AC4 at the UX
  layer.

---

*Created: 2026-08-31*
