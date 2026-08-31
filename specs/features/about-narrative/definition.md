# Feature Definition: About Narrative

## Identity

- **id:** `about-narrative`
- **name:** About Narrative
- **purpose:** Present Javi's authentic professional and personal identity to
  a visitor, as one continuous narrative combining an intro hook and
  structured bio content.

## Cohesive Functional Responsibility

Present Javi's authentic professional and personal identity as one
continuous narrative — an intro hook followed by structured bio content.

## Functional Boundary

### Included

- Presenting the intro hook that opens the narrative.
- Presenting the structured bio content that follows it.
- Coordinating the hook and bio content as one continuous narrative, not two
  independent pieces.

### Excluded

- The persistent nav appearing within the About view — owned by
  `section-navigation`.
- Any motion/animation behavior applied to About elements — owned by
  cross-cutting `motion-interaction`.
- Resolving/rendering text into the visitor's active language — owned by
  `content-localization`.
- The Contact view's sign-off/social links — a separate view, owned by
  `email-contact`/`social-links`.
- Actual bio copy, intro-hook wording, detailed narrative structure, and
  visual/interaction specification — belong to later phases (Feature
  Context/UX), not Definition.

## Acknowledged Functional Dependencies

- **`content-localization`** — about-narrative's intro hook and bio content
  must render in the visitor's active language; the localization mechanism
  itself is not owned here.
- **`section-navigation`** — co-located in the About view; catalog
  relationship states `section-navigation` "enables" `about-narrative`.
- **`motion-interaction`** — cross-cutting; applies to About elements per
  catalog relationship, but defines the motion behavior itself elsewhere.

## Relationship to Catalog / Capabilities

- Realizes capability `about-narrative`: "Present Javi's authentic
  professional and personal identity through structured bio content."
- No Feature-to-Feature relationship is recorded on the `about-narrative`
  catalog entry itself; the dependencies above are inferred from the
  *other* Features' recorded relationships (`section-navigation` enables
  it; `motion-interaction` applies across it) plus the Project UX About
  view description and content flow.

## Pending (out of scope for this phase)

Detailed content/copy, use cases, acceptance criteria, solution design,
observable contract, UX specification, technical design, implementation.

---

*Created: 2026-08-31*
