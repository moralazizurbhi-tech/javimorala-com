# Feature Definition: Hero Presentation

**Status:** Approved

## Identity

- **id:** `hero-presentation`
- **name:** Hero Presentation
- **purpose:** Deliver an immediate, high-impact first impression of Javi's
  identity and character to any visitor arriving at the site.

## Cohesive Functional Responsibility

Deliver the visitor's first-impression composition on arrival — headline/
tagline copy, the ornamental-mark centerpiece's placement within that
moment, the entry scroll cue that carries the impression into further
exploration, and Presence Links' placement as a minor/secondary element —
as one cohesive moment. The Feature owns the coordination/composition of
these four elements into a single first-impression moment; it does not own
the mark's visual design/asset (shared substrate), Presence Links' own
link content, or any element's individual styling.

## Functional Boundary

### Included

- Presenting the headline/tagline copy as the arrival message.
- Presenting the ornamental mark in its Hero-centerpiece placement (display/
  placement only).
- Presenting the entry scroll cue inviting the visitor onward.
- Coordinating the four as one cohesive first-impression moment, including
  Presence Links' placement (minor/secondary element) alongside the
  headline/tagline, mark, and scroll cue.

### Excluded

- The persistent nav appearing over/around the Hero view — owned by
  `section-navigation`.
- The ornamental mark's visual design/asset itself — shared substrate
  ("Ornamental mark," per `feature-catalog.md`'s excluded-from-Feature-status
  note), not owned by any Feature.
- Any motion/animation behavior applied to Hero elements — owned by
  cross-cutting `motion-interaction`.
- Resolving/rendering text into the visitor's active language — owned by
  `content-localization`.
- Actual headline/tagline copy, detailed scroll-cue behavior, and visual/
  interaction specification — belong to later phases (Feature Context/UX),
  not Definition.
- Presence Links' own link content/list — owned by `presence-links`; this
  Feature only coordinates its placement/prominence within the Hero
  moment.

## Acknowledged Functional Dependencies

- **`content-localization`** — headline/tagline text must render in the
  visitor's active language; the localization mechanism itself is not owned
  here.
- **`section-navigation`** — catalog relationship states it "enables"
  `hero-presentation`; the persistent nav is present across the Hero view
  but not part of this Feature's composition.
- **`motion-interaction`** — cross-cutting; applies to Hero elements per
  catalog relationship, but defines the motion behavior itself elsewhere.
- **`presence-links`** — composed into this Feature's Hero moment as a
  secondary/minor element (mirrors the equivalent relationship already
  established in Direct Contact's Connection-screen composition); owns its
  own link content, this Feature owns coordinating its placement here.

## Relationship to Catalog / Capabilities

- Realizes capability `hero-presentation`.
- No Feature-to-Feature relationship is recorded on the `hero-presentation`
  catalog entry itself; dependencies above are inferred from other
  Features' recorded relationships plus the Project UX note on the
  decorative mark's entrance-moment role.
- No Feature-to-Feature relationship is recorded on the `hero-presentation`
  or `presence-links` catalog entries for this Hero-composition
  relationship (same gap already flagged in Direct Contact's Definition
  for the Connection-screen relationship); a Feature Discovery/Catalog
  Organization pass may want to record both.

## Pending (out of scope for this phase)

- Detailed content/copy — the actual headline/tagline text, and any
  presentation-level copy tied to the ornamental mark or scroll cue — is
  not decided in this Definition. It is an explicit obligation this Feature
  must resolve, with its authoritative value (or an explicit Pending
  marker) declared in the Feature UX Specification's "Content and Assets"
  section, once the Feature is Closed.
- Also pending, per the same skill boundary: use cases, acceptance
  criteria, solution design, observable contract, technical design,
  implementation.

---

*Created: 2026-09-06*
