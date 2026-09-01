# Feature Definition: Content Localization

## Identity

- **id:** `content-localization`
- **name:** Content Localization
- **purpose:** Present all site content in the visitor's language for a
  bilingual (English/Spanish) audience — defaulting to their
  browser-detected locale and staying current with any manual override.

## Cohesive Functional Responsibility

Detect the visitor's browser locale by default, hold the active-language
state — including persisting a manual override on-device so it is
remembered across future visits — and resolve/render all site content in
that active language to the consuming Features, as one cohesive
language-resolution mechanism.

## Functional Boundary

### Included

- Detecting the visitor's browser locale on arrival to determine the
  default active language.
- Holding the current active-language state, including persisting a
  manual override on-device so it survives across future visits.
- Consuming the language-change signal raised by `language-override`'s
  control and updating the active language accordingly.
- Resolving and rendering all site content in the active language to the
  Features that own that content.

### Excluded

- Presenting or hosting the explicit manual-override control and its
  interaction mechanism — owned by `language-override`; this Feature only
  consumes the signal it emits.
- Authoring the actual English/Spanish copy/content per section — owned by
  each content-owning Feature and the shared Content Data Layer.
- The persistent nav's structure/presentation/overlay behavior — owned by
  `section-navigation`.
- Any motion/animation behavior applied during a language change — owned
  by cross-cutting `motion-interaction`.
- Exact detection/resolution mechanism (browser API, storage format, i18n
  library wiring), visual/interaction specification, detailed
  content/copy, use cases, acceptance criteria, solution design,
  observable contract, UX specification, technical design, implementation
  — belong to later phases.

## Acknowledged Functional Dependencies

- **`language-override`** — feeds this Feature; content-localization
  consumes the language-change signal it raises but does not own the
  control itself. Catalog records `language-override` "feeds"
  `content-localization`.
- **`hero-presentation`**, **`about-narrative`**, **`email-contact`**,
  **`social-links`** — each depends on this Feature to resolve/render its
  text content in the active language; each explicitly excludes that
  resolution from its own scope.
- **`section-navigation`** — also depends on this Feature to
  resolve/render nav destination labels in the active language, per its
  own Definition's exclusion and acknowledged dependency.

## Relationship to Catalog / Capabilities

- Realizes capability `localization` (Capability Catalog, Primary):
  "Present all site content in the visitor's language (English or
  Spanish), auto-detected from browser locale by default, with an
  always-available manual override" — the auto-detection, state-holding,
  and content-resolution/rendering portion; the manual-override control
  itself is realized by `language-override`.
- No relationship is recorded on `content-localization`'s own catalog
  entry; the dependencies above are inferred from the *other* Features'
  recorded relationships and exclusions, consistent with the pattern
  already used in `hero-presentation`'s Definition.

## Pending (out of scope for this phase)

Exact detection/resolution mechanism, storage format for the persisted
override, visual/interaction specification, detailed content/copy, use
cases, acceptance criteria, solution design, observable contract, UX
specification, technical design, implementation.

---

*Created: 2026-09-01*
