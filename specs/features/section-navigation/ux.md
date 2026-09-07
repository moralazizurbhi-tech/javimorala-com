# Feature UX Specification: Section Navigation

**Status:** Approved

## UX Scope

Specializes Project UX's Navigation section (persistent nav bar / mobile
overlay) and its cross-screen navigation model ("Any screen → any other:
via the persistent nav's anchor links, or the logo returning to
Introduction. On mobile, the same transitions are reached via the
hamburger-triggered overlay."), plus the hosting aspect of the "Switch
language" flow. Informed by an explicitly provided external Figma source
(file `CCwye9dUj8Sy4f2lgy6i9f`: "Home" `4:65` desktop / "Home - mobile"
`22:41`, "About" `13:2` / "About - mobile" `22:112`, "Contact" `22:2` /
"Contact - mobile" `22:126`, "Menu - mobile" `22:99`) — treated as
observed evidence confirmed by the user, not persistent project
knowledge. Excludes each destination screen's own content,
`presence-links` (no nav anchor), `language-override`'s own mechanism,
and motion timing (`motion-interaction`).

## User Flows

### Reach any screen directly (nav)

Specializes Project UX's cross-screen navigation note.

- **Desktop:** visitor anywhere → activates "about"/"contact" or the
  logomark in the persistent bar → page jumps to that screen's anchor
  (Contract Commitments 2, 3) → active-indicator updates (Commitment 5).
- **Mobile:** visitor anywhere → taps the hamburger toggle → full-screen
  overlay opens with "about"/"contact" + active-indicator + language
  control (Commitment 6, observed toggle/close icons in "Home -
  mobile"/"Menu - mobile") → visitor taps a link (overlay closes, page
  jumps, indicator updates) or taps close (overlay closes, no
  navigation).

### Orient during free scroll

Specializes Project UX's "persistent navigation keeps the visitor
oriented at every point."

- Visitor free-scrolls without touching the nav → as their viewport
  enters each screen, the active-indicator updates to reflect it
  (Commitment 5), with no separate action required.

### Switch language (nav-hosting only)

Specializes Project UX's "Switch language" flow's hosting aspect only —
the switching behavior itself is `language-override`'s own flow.

- Visitor anywhere → locates the language control within the nav bar or
  overlay → activates it → `language-override`'s own flow takes over from
  there (Commitment 7).

## Screens

### Introduction

Existing identity, from Project UX's Screens.

- Purpose (nav portion): the visitor's first exposure to the persistent
  nav, without competing with the Hero's own large centerpiece mark —
  shows wordmark + "about"/"contact" links, without the compact logomark
  icon (Contract Commitment 4; observed absence in Figma's "Home"/"Home -
  mobile" vs. its presence in "About"/"Contact"). Participates in "Reach
  any screen directly" and "Orient during free scroll."

### Personal Narrative

Existing identity, from Project UX's Screens.

- Purpose (nav portion): the same persistent nav, now including the
  compact logomark icon (Commitment 4; observed in "About"/"About -
  mobile"). Participates in the same two flows.

### Connection

Existing identity, from Project UX's Screens.

- Purpose (nav portion): the same persistent nav with the compact
  logomark icon (observed in "Contact"/"Contact - mobile"). Participates
  in the same two flows.

Exact spatial layout, sizing, and positioning within each screen are
Pending, left entirely to Feature UI, consistent with sibling Features'
pattern.

## Interaction States

- **Mobile Overlay:** `Closed` / `Open` (Commitment 6) — Closed is the
  default/rest state; Open is full-screen and blocks interaction with the
  underlying page (observed in "Menu - mobile").
- **Active Screen Indicator:** reflects exactly one of Introduction /
  Personal Narrative / Connection at all times (Commitment 5) — the
  Figma reference is an early static exploration with no distinct
  "active" visual treatment evidenced, so its exact visual expression
  (color, underline, weight, etc.) is Pending, left to Feature UI.
- No loading, empty, or error state applies — this Feature has no
  data-fetch or fallible operation; it's a static composed surface
  driven by scroll position and confirmed link targets.

## Feature Components

- **Persistent Nav Bar (desktop)** — existing identity, Project UX UI
  Components. This Feature's realization: wordmark + "about"/"contact"
  links + language control, with the compact logomark icon appearing
  only outside the Introduction screen (Commitment 4). Observed in Figma
  "Home"/"About"/"Contact."
- **Mobile Navigation Overlay** — existing identity, Project UX UI
  Components. This Feature's realization: hamburger toggle (open) /
  close action, full-screen overlay with "about"/"contact" +
  active-indicator + language control (Commitment 6). Observed in Figma
  "Home - mobile"/"Menu - mobile" — note that specific frame doesn't show
  a language control (older exploration predating the confirmed
  `language-override` addition); its presence there is Existing, drawn
  from Project UX's Navigation section ("Mobile Navigation Overlay ...
  exposing the same links and switcher"), not from this Figma frame.
- **Active Screen Indicator** — Feature-specific component; no distinct
  visual treatment observed in Figma (Pending, Feature UI).
- **Logomark Home-Link** — this Feature's realization of the shared
  ornamental-mark asset (owned project-wide, not by this Feature) as a
  clickable link to Introduction; compact form here, distinct from the
  Hero's large centerpiece form (Commitments 3, 4).

## Content and Assets

- **Nav link labels ("about", "contact")** — Confirmed, language-
  independent identifiers, observed in Figma; localized display text is
  `content-localization`'s concern.
- **Wordmark text ("javimorala.com")** — Confirmed, observed in Figma,
  consistent across all three screens' nav.
- **Compact logomark asset** — Pending: the mark's visual asset is shared
  project-wide substrate (excluded from Feature status per Feature
  Catalog); this Feature only decides where/when it's shown, not its
  design.
- **Hamburger toggle / close icon glyphs** — Pending, exact iconography
  left to Feature UI (observed only as simple line-based icons in the
  early Figma exploration).

## UX Constraints

- Full keyboard operability, visible focus states, sufficient contrast,
  and assistive-technology compatibility apply across both nav forms,
  consistent with Project UX's UX Constraints.
- The persistent nav (or its mobile overlay) must be reachable from
  anywhere, on every screen and device (Project UX Constraint; Contract
  Commitment 1).
- The manual language override must be reachable from the same nav on
  every screen/device, never buried in content (Project UX Constraint;
  Contract Commitment 7).
- No motion, timing, or transition behavior (overlay open/close,
  active-indicator change, logomark appearance change between screens) is
  defined here — owned by `motion-interaction`.

---

*Created: 2026-09-07*
