# Feature Context: Direct Contact

**Status:** Approved

## Problem

After experiencing Javi's identity through the Hero and About Narrative, an
interested visitor reaches the end of the single-page experience with no
way to actually reach out. Without a clear, primary path to real contact,
engagement dead-ends at admiration rather than connection — undermining
the point of presenting an authentic identity in the first place.

## Motivation

Directly serves Project Context's Vision by giving genuine visitor
interest somewhere concrete to go. Project Design and UX explicitly place
this as the closing "Connection" screen of the single-page journey —
completing the arc from arrival → identity → connection — while Project
Design's "no backend/data persistence/accounts" constraint means this
Feature must resolve entirely through an external channel.

## Scope

### Included

- Enabling a visitor who wants to reach Javi to do so via a primary CTA
  that opens an external channel (e.g. email) — no in-site form, no data
  collection.
- Providing the closing sense of resolution to the single-page experience
  (the farewell line).
- Coordinating that CTA with Presence Links (secondary) into one cohesive
  Connection-screen problem, per the Definition's composition ownership.

### Excluded

- Presence Links' own external-profile discovery — `presence-links`'s own
  problem.
- Wayfinding/the nav "contact" link that brings a visitor here —
  `section-navigation`'s problem.
- Conveying who Javi is — `hero-presentation` / `about-narrative`'s
  problem.
- Resolving content into the visitor's language —
  `content-localization`'s problem.
- The site's motion/interaction feel in general — `motion-interaction`'s
  problem.
- Any on-site form, backend processing, or visitor data collection —
  excluded project-wide.
- Any work/project catalog or portfolio showcase — excluded project-wide.

## Constraints

- No on-site form or visitor data collection — the CTA must resolve via a
  native external link only (e.g. opens the visitor's email client).
- Static, backend-less architecture — no accounts, no data persistence,
  solo-effort constraint inherited from project level.
- Must express within the established visual identity, consistent with
  other screens.
- The CTA must stay visually distinct from and primary over Presence
  Links (Project UX: "a direct-contact call-to-action is kept visually
  distinct from those presence links").
- No fixed deadline (inherited).

## Known Dependencies

- **`presence-links`** — composed as the secondary element alongside this
  Feature's CTA on the shared Connection screen.
- **`section-navigation`** — hosts the "contact" nav anchor that brings a
  visitor here.
- **`content-localization`** — CTA copy and farewell-line text depend on
  this Feature being resolved in the right language.
- **`motion-interaction`** — governs any reveal/motion applied to this
  Feature's elements.
- **`accessibility`** — cross-cutting; applies to the CTA and
  farewell-line elements.

---

*Created: 2026-09-07*
