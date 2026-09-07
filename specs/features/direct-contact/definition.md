# Feature Definition: Direct Contact

**Status:** Approved

## Identity

- **id:** `direct-contact`
- **name:** Direct Contact
- **purpose:** Give an interested visitor the primary way to reach Javi
  directly through an external channel (e.g. email), with no on-site form or
  data collection.

## Cohesive Functional Responsibility

Provide the primary way for an interested visitor to reach Javi directly
through an external channel — and, as the Connection screen's primary
element, coordinate that CTA together with Presence Links and the closing
farewell line into one cohesive closing-screen moment (composition,
ordering, relative prominence, CTA kept primary/presence-links secondary
per Project UX). The Feature does not own Presence Links' own link content,
the exact contact channel/mechanism, any copy, or detailed visual/
interaction styling.

## Functional Boundary

### Included

- Presenting the primary direct-contact CTA/mechanism (external channel
  only, e.g. email; no on-site form or visitor data collection).
- Presenting the closing farewell line as a minor element of the Connection
  screen.
- Coordinating the direct-contact CTA, Presence Links, and farewell line
  into one cohesive Connection-screen moment — CTA primary, Presence Links
  secondary.

### Excluded

- Presence Links' own link content/list — owned by `presence-links`; this
  Feature only coordinates its placement/prominence relative to the CTA.
- The persistent nav / "contact" anchor link that brings a visitor here —
  owned by `section-navigation`.
- Any motion/animation/scroll-reveal behavior applied to this screen's
  elements — owned by cross-cutting `motion-interaction`.
- Resolving/rendering text into the visitor's active language — owned by
  `content-localization`.
- Any work/project catalog or portfolio showcase — excluded project-wide
  (Project Design's Design Constraints).
- Exact contact channel/mechanism, CTA copy, farewell-line wording, and
  detailed visual/interaction specification — belong to later phases
  (Feature Context/UX/UI), not Definition.

## Acknowledged Functional Dependencies

- **`presence-links`** — composed into this Feature's Connection screen;
  owns its own link content, this Feature owns coordinating its placement.
- **`section-navigation`** — hosts the "contact" anchor link that brings a
  visitor here.
- **`motion-interaction`** — cross-cutting; applies to this Feature's
  elements per catalog relationship, but defines the motion behavior
  itself elsewhere.
- **`accessibility`** — cross-cutting; applies to this Feature's elements
  per catalog relationship.
- **`content-localization`** — CTA copy and farewell line must render in
  the visitor's active language; the localization mechanism itself is not
  owned here.

## Relationship to Catalog / Capabilities

- Realizes capability `direct-contact`.
- No Feature-to-Feature relationship is recorded on the `direct-contact` or
  `presence-links` catalog entries for the Connection-screen composition
  relationship established in this Definition; a Feature Discovery/Catalog
  Organization pass may want to record it there for consistency.

## Pending (out of scope for this phase)

- Contact channel/mechanism decision, CTA copy, and farewell-line wording —
  resolved with an authoritative value (or explicit Pending marker) in the
  Feature UX Specification's "Content and Assets" section, once the Feature
  is Closed.
- Detailed visual/positional relationship among the CTA, Presence Links,
  and farewell line — UX/UI phases.
- Also pending, per the same skill boundary: use cases, acceptance
  criteria, solution design, observable contract, technical design,
  implementation.

---

*Created: 2026-09-07*
