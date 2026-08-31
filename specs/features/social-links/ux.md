# Feature UX Specification: Social Links

## UX Scope

Specializes Project UX's Hero view and Contact view (Screens), the "Reach
out" User Flow (social portion), the "Social link group" UI Component,
and the global UX Constraints — for the two independently-activatable
Instagram/LinkedIn triggers presented identically in both placements.
Consistent with Feature Solution/Contract's boundary: excludes nav, the
About view, motion timing/sequencing, the localization mechanism, and
actual URLs/copy/icon assets.

## User Flows

### Social reach-out

Specializes Project UX's "Reach out" flow (social portion; the email
portion is `email-contact`'s own specialization).

- Visitor is at the Hero view or the Contact view (arrival at either not
  redefined here — owned by `hero-presentation` / `email-contact` /
  `section-navigation` / free scroll) → sees the Social Link Group
  (Instagram, LinkedIn triggers) presented alongside that view's other
  elements → visitor activates one trigger → the corresponding external
  profile opens in a way that preserves the visitor's position on the
  site (Contract Commitment 3) → visitor may continue browsing the site
  or has moved to the external channel.
- The same flow applies identically regardless of which placement (Hero
  or Contact) the visitor activates from (Contract Commitment 2).

## Screens

### Hero view

Existing identity, from Project UX's Screens.

- Purpose (this Feature's slice): host one instantiation of the Social
  Link Group alongside Hero Section's arrival composition — not
  redefining Hero view's overall purpose. Participates in the Social
  reach-out flow.
- Composition direction: open, guided by the legacy design's "socials...
  anchored at the layout's extremities" reference (Project UX's legacy
  Composition and hierarchy note), reinterpreted with modern execution;
  exact layout is Pending, left to detailed visual design.
- Mobile treatment must be purpose-built, not a generic reflow (Existing,
  global constraint); mechanism/specifics Pending.

### Contact view

Existing identity, from Project UX's Screens.

- Purpose (this Feature's slice): host one instantiation of the Social
  Link Group alongside the Email Contact Device — not redefining Contact
  view's overall purpose. Participates in the Social reach-out flow.
- Composition direction: open, guided by the same legacy reference; exact
  layout is Pending, left to detailed visual design.
- Mobile treatment must be purpose-built, not a generic reflow (Existing,
  global constraint); mechanism/specifics Pending.

## Interaction States

- **Default/composed** — the single steady state where both triggers
  (Instagram, LinkedIn) are presented together; the only steady state,
  since both are always present rather than conditionally revealed
  (Feature Solution: two independent, always-present triggers).
- **Reduced-motion** — per Project UX's mandatory reduced-motion
  fallback, the accessibility variant in which the group still reaches
  its complete/composed state without relying on animated entrance, if
  any entrance motion is applied.

## Feature Components

- **Social Link Group** — specializes Project UX's existing "Social link
  group" UI Component (already named there: "reusable icon/label pairing
  (Instagram, LinkedIn) appearing in both Hero and Contact views") for
  its role in this Feature: two independently-activatable,
  session-preserving triggers, identical across both placements.

## UX Constraints

- Composition must express within the existing visual identity —
  dark-only, single accent, two-tier typography (Existing, global,
  reaffirmed).
- Reduced-motion fallback is mandatory for any motion applied to this
  Feature's presentation (Existing, global).
- Desktop, tablet, and mobile must each receive a purpose-built
  treatment, not a generic reflow (Existing, global).
- Activating a trigger must never be presented/implemented in a way that
  replaces the current page — carries Contract Commitment 3's
  session-preserving requirement into the UX.
- Both placements must present the same component identity (same two
  triggers, same destinations) — layout/positioning may adapt per view,
  but trigger set and behavior may not diverge — carries Contract
  Commitment 2 into UX.

---

*Created: 2026-08-31*
