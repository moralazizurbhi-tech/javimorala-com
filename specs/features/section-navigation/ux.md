# Feature UX Specification: Section Navigation

## UX Scope

Specializes Project UX's Hero/About/Contact view Screens plus the "Mobile
nav overlay" Screen, the "Quick jump" User Flow, the "Persistent nav" and
"Mobile nav overlay" UI Components, and the global UX Constraints — for
the three-destination nav (Home, About, Contact) presented inline on
desktop and via overlay on mobile. Consistent with Feature
Solution/Contract's boundary: excludes social links (not hosted in nav —
flagged conflict, not resolved here), each destination view's own
content, motion timing, the localization mechanism, and actual label
copy/visual treatment.

## User Flows

### Quick jump

Specializes Project UX's "Quick jump" flow.

- Visitor anywhere on the page → activates a nav destination (inline,
  desktop) → page scroll-anchors to that section (Contract Commitment 1).
- Visitor on mobile → activates the nav trigger → overlay opens
  (Commitment 4) → visitor either selects a destination (anchor + close
  together) or dismisses without selecting (close only, no anchor).
- Coexists with, never replaces, free scroll — both remain valid at all
  times (Commitment 5; Project UX's explicit "Nav clicks and free
  scrolling are both always valid" note).

## Screens

### Hero view / About view / Contact view

Existing identity, from Project UX's Screens.

- Purpose (this Feature's slice): host the nav's persistent presence —
  inline on desktop, trigger on mobile — available throughout, without
  redefining each view's own composition/content. Participates in Quick
  jump.
- Composition direction: nav available across all three views (Existing,
  Project UX Navigation section); exact positioning/visual treatment
  Pending, left to detailed visual design.

### Mobile nav overlay

Existing identity, from Project UX's Screens (its own fourth entry,
distinct from Hero/About/Contact).

- Purpose: present the same three destinations as the inline nav, in a
  form suited to touch, triggered from the persistent nav. Participates
  in Quick jump.
- Full-screen or slide-in treatment (Existing, Project UX legacy note);
  exact treatment Pending.
- Must be dismissible without forcing a destination selection (Existing
  global UX Constraint + Commitment 4 AC3).

## Interaction States

- **Inline/default (desktop-class)** — all destinations simultaneously
  visible; steady state whenever the overlay form isn't selected
  (Commitment 3).
- **Overlay: Closed (mobile-class)** — trigger visible, destinations
  hidden; default mobile steady state.
- **Overlay: Open (mobile-class)** — full destination list visible;
  entered via trigger activation (Commitment 4).
- **Reduced-motion** — per Project UX's mandatory fallback, overlay
  open/close and any nav highlight still reach their settled state
  without relying on animated transition.

## Feature Components

- **Persistent nav (inline, desktop-class)** — specializes Project UX's
  "Persistent nav" component for its three-destination role here;
  excludes the social icons Project UX's description still lists
  (flagged conflict, carried from Definition/Context, not resolved
  here). Home destination reuses the shared wordmark/logo asset as its
  link — the asset itself remains outside this Feature's ownership
  (Definition boundary).
- **Nav trigger (mobile-class)** — the activator that opens the Mobile
  nav overlay; specializes the mobile portion of Project UX's
  "Persistent nav" description.
- **Mobile nav overlay** — specializes Project UX's existing "Mobile nav
  overlay" component for its three-destination selection/dismiss
  behavior (Commitment 4).

## UX Constraints

- Composition must express within the existing visual identity —
  dark-only, single accent, two-tier typography (Existing, global).
- Reduced-motion fallback mandatory for overlay open/close and any nav
  highlight motion (Existing, global).
- Free scrolling must always work as a complete substitute for nav
  clicks (Existing global UX Constraint — carries Commitment 5 into UX).
- The mobile overlay must be dismissible without forcing a destination
  selection (Existing global UX Constraint — carries Commitment 4 AC3
  into UX).
- Desktop and mobile must each receive a purpose-built treatment, not a
  generic reflow (Existing, global — realizes Commitment 3's
  device-appropriate form).

---

*Created: 2026-08-31*
