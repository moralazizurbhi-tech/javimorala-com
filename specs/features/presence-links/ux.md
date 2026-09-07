# Feature UX Specification: Presence Links

**Status:** Approved

## UX Scope

Specializes Project UX's Introduction screen (light-touch glimpse, shared
with `hero-presentation`) and Connection screen (fuller presentation,
shared with `direct-contact`) and their respective flows. Presence Links
owns only its own link content/behavior at each placement — not either
host screen's own composition. Partly informed by the same externally-
provided Figma source Direct Contact's UX cites (file
`CCwye9dUj8Sy4f2lgy6i9f`) for the Connection placement; the Introduction
placement's existence and rough position (bottom-left) rest on the user's
direct confirmation rather than a specific frame independently identified
in that file.

## User Flows

### Discover Javi's broader presence

Specializes Project UX's "Get an impression of who Javi is" and "Reach
Javi" flows.

- At Introduction: visitor lands → headline and the light-touch
  presence-links glimpse are visible immediately (Contract Commitment 1)
  → visitor either activates a presence link (opens in a new tab, AC3)
  or continues without interacting.
- At Connection: visitor reaches the Connection screen → CTA, the fuller
  presence-links presentation, and the farewell line are all visible →
  visitor either activates a presence link, activates the CTA
  (`direct-contact`'s own flow), or takes no action.

## Screens

### Introduction

Existing identity, from Project UX's Screens.

- Purpose: first impression, plus a light-touch presence-links glimpse.
  Participates in the "Discover Javi's broader presence" flow. Shared
  with `hero-presentation` — hero-presentation is dominant/primary;
  presence links secondary/minor (Project UX Screen Composition; Contract
  Commitment 4).
- Perceptual/experience direction (Confirmed by the user): the glimpse
  sits bottom-left of the Introduction screen. Exact spatial layout,
  sizing, positioning, and device-class realization are Pending, left
  entirely to Feature UI.

### Connection

Existing identity, from Project UX's Screens.

- Purpose: give the visitor a fuller presentation of Javi's broader
  online presence at the point of contact decision. Participates in the
  "Discover Javi's broader presence" flow. Shared with `direct-contact` —
  direct-contact is dominant/primary; presence links secondary/supporting
  (Project UX Screen Composition; Contract Commitment 4).
- Perceptual/experience direction (Observed from Figma, Confirmed by the
  user — file `CCwye9dUj8Sy4f2lgy6i9f`, "Contact" frame `22:2` desktop /
  "Contact - mobile" `22:126`, same source Direct Contact's UX cites):
  presence links form a secondary group alongside the CTA and farewell
  line. Exact spatial layout is Pending, left to Feature UI.

## Interaction States

- None — each link is a stateless external hand-off; no loading,
  confirmation, success, or error state renders in-page (Contract
  Commitment 1 AC5; Solution's "no in-page loading/confirmation/success
  state").

## Feature Components

- **Presence Link Group** — existing identity from Project UX's UI
  Components ("Presence Links"). This Feature's specific realization: a
  set of links, each opening its external profile in a new tab (Contract
  Commitment 1), presented identically at both placements (Contract
  Commitment 2).

## Content and Assets

- **Instagram link label** — Confirmed, language-independent: "Instagram"
- **LinkedIn link label** — Confirmed, language-independent: "LinkedIn"
- **Instagram destination URL** — Confirmed as a placeholder, to be
  replaced by the user before launch: `https://instagram.com/REPLACE_ME`
- **LinkedIn destination URL** — Confirmed as a placeholder, to be
  replaced by the user before launch:
  `https://linkedin.com/in/REPLACE_ME`
- **Link order** — Confirmed: Instagram, then LinkedIn.

## UX Constraints

- Each link stays visually secondary/minor relative to its placement's
  own primary element (Contract Commitment 4).
- Full keyboard operability, visible focus states, sufficient contrast,
  and assistive-technology compatibility apply at both placements,
  consistent with Project UX's UX Constraints.
- Each link's accessible name must clearly identify the destination
  platform — no bare icon with no text alternative.
- No motion, timing, or reveal behavior is defined here — owned by
  `motion-interaction`.

---

*Created: 2026-09-07*
