# Feature Definition: Language Override

## Identity

- **id:** `language-override`
- **name:** Language Override
- **purpose:** Let a visitor explicitly change the active display language
  (English/Spanish) regardless of the browser-detected default, via an
  always-available control hosted by the App Shell.

## Cohesive Functional Responsibility

Provide the explicit, always-available control by which a visitor overrides
the auto-detected language and signals a language change — a standalone App
Shell element, independent of the persistent nav or any section — without
itself detecting locale, holding the resolved override state, or
resolving/rendering content in the chosen language.

## Functional Boundary

### Included

- Presenting an explicit, always-available control letting a visitor pick
  between the supported languages (English/Spanish).
- The observable mechanism by which a visitor interacts with the control to
  signal a language change (exact widget mechanism — toggle, dropdown, etc.
  — left open to Feature UX).
- Standing as its own standalone element hosted by the App Shell, not
  co-located with or part of the persistent nav.

### Excluded

- Detecting the visitor's browser locale by default, holding/persisting the
  resolved override state, and resolving/rendering site content in the
  active language — owned by `content-localization`.
- The persistent nav's structure, presentation, and overlay behavior —
  owned by `section-navigation`; this control is not part of nav.
- Any motion/animation behavior applied to the control — owned by
  cross-cutting `motion-interaction`.
- Visual/interaction specification of the control (exact widget shape,
  icon/label treatment, positioning within App Shell) — belongs to later
  phases (Feature Context/UX), not Definition.

## Acknowledged Functional Dependencies

- **`content-localization`** — this Feature's control signals a language
  change that `content-localization` must consume to actually resolve and
  render content in the chosen language; the resolution/rendering mechanism
  itself is not owned here. Catalog records this as `language-override`
  "feeds" `content-localization`.
- **`section-navigation`** — no functional dependency; explicitly not
  co-located with or hosted by the nav (see Excluded).

## Relationship to Catalog / Capabilities

- Realizes capability `localization` (Capability Catalog, Primary):
  "Present all site content in the visitor's language (English or
  Spanish), auto-detected from browser locale by default, with an
  always-available manual override" — the manual-override-control portion
  specifically; browser-locale auto-detection and content
  resolution/rendering are realized by `content-localization`.
- Catalog records `language-override` "feeds" `content-localization`,
  consistent with the Acknowledged Functional Dependencies above.
- Project Architecture corroborates: App Shell "hosts the manual
  language-override control," and the Locale Layer "holds the manual
  override when set" — placing state-holding in the Locale
  Layer/`content-localization`, not in this Feature.

## Pending (out of scope for this phase)

Exact control widget/mechanism, visual/interaction specification, detailed
content/copy, use cases, acceptance criteria, solution design, observable
contract, UX specification, technical design, implementation.

---

*Created: 2026-09-01*
