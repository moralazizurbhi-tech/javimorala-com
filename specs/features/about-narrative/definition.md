# Feature Definition: About Narrative

**Status:** Approved

## Identity

- **id:** `about-narrative`
- **name:** About Narrative
- **purpose:** Give a visitor an authentic sense of who Javi is, in his own
  voice, as personal self-expression — including a small, low-key note that
  the site itself was built through AI-assisted development.

## Cohesive Functional Responsibility

Present Javi's identity authentically, in his own voice, as self-expression
rather than persuasion toward any particular audience — narrative text and
one or two personal photos — together with a small, low-key mention of the
site's AI-assisted development process, kept
subordinate to the narrative. The Feature owns composing these pieces into
one cohesive Personal Narrative screen moment; it does not own the photos'
final selection/production, the narrative's or note's exact copy, or any
element's detailed visual/interaction styling.

## Functional Boundary

### Included

- Presenting Javi's personal/professional narrative text, in his own voice.
- Presenting one or two personal photos of Javi — placeholder imagery until
  final photos are decided.
- Presenting the AI-assisted-development note as a minor, subordinate
  element alongside or after the narrative.
- Coordinating narrative text, photo(s), and the AI note into one cohesive
  screen moment (composition, ordering, relative prominence).

### Excluded

- The persistent nav / "about" anchor link that brings a visitor here —
  owned by `section-navigation`.
- Any direct-contact or presence-link content/CTAs — owned by
  `direct-contact` / `presence-links`.
- Any work/project catalog or portfolio showcase — excluded project-wide
  (Project Design's Design Constraints).
- Any motion/animation/scroll-reveal behavior applied to this screen's
  elements — owned by cross-cutting `motion-interaction`.
- Resolving/rendering text into the visitor's active language — owned by
  `content-localization`.
- Actual narrative copy, note wording, and final photo assets, plus
  detailed visual composition/interaction specification — belong to later
  phases (Feature Context/UX/UI), not Definition.

## Acknowledged Functional Dependencies

- **`section-navigation`** — catalog relationship states it "enables"
  `about-narrative`; its nav link is present/reachable but not part of this
  Feature's own composition.
- **`motion-interaction`** — cross-cutting; applies to this Feature's
  elements per catalog relationship, but defines the motion behavior
  itself elsewhere.
- **`accessibility`** — cross-cutting; applies to this Feature's elements
  per catalog relationship.
- **`content-localization`** — narrative, note, and skills/timeline content
  must render in the visitor's active language; the localization mechanism
  itself is not owned here.

## Relationship to Catalog / Capabilities

- Realizes capabilities `about-narrative` and `ai-assisted-development-note`.
- No Feature-to-Feature relationship is recorded on the `about-narrative`
  catalog entry itself; dependencies above are inferred from other
  Features' recorded relationships, plus Project Design/UX's explicit
  statement that the AI-assisted-development-note lives inside About
  Narrative's content, subordinate to it.

## Pending (out of scope for this phase)

- Final photo selection/assets (placeholders meanwhile), narrative copy,
  and AI-note wording — resolved with an authoritative value (or explicit
  Pending marker) in the Feature UX Specification's "Content and Assets"
  section, once the Feature is Closed.
- Detailed visual/positional relationship among narrative, photos,
  skills/timeline, and the AI note — UX/UI phases.
- Also pending, per the same skill boundary: use cases, acceptance
  criteria, solution design, observable contract, technical design,
  implementation.

---

*Created: 2026-09-06*
