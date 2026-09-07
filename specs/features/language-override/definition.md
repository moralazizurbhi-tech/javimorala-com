# Feature Definition: Language Override

**Status:** Approved

## Identity

- **id:** `language-override`
- **name:** Language Override
- **purpose:** Let a visitor explicitly choose the site's active language,
  overriding whatever locale was detected, and have that choice remembered
  for future visits.

## Cohesive Functional Responsibility

Provide the explicit language-selection control and the logic that, when a
visitor makes a choice, sets the active language to that choice —
overriding the detected locale — and remembers it for future visits,
feeding the resulting active-language signal to `content-localization` for
rendering. The Feature owns the override's own switching and persistence
logic; it does not own browser-locale detection, resolving/rendering
content into the active language, or the control's visual placement within
the nav.

## Functional Boundary

### Included

- The selection control's interaction/switching logic — the mechanism by
  which a visitor's explicit choice becomes the active language.
- Overriding the detected locale with the visitor's explicit choice.
- Persisting the explicit choice across future visits.
- Exposing the resulting active-language signal for `content-localization`
  to consume.

### Excluded

- Browser-locale detection on arrival — owned by `content-localization`.
- Resolving/rendering visible content or SEO metadata into the active
  language — owned by `content-localization`.
- The control's visual placement within the nav (desktop and mobile
  overlay) — owned by `section-navigation`, which hosts it.
- The set of supported languages and their exact labels/copy — belongs to
  later phases (Feature Context/UX), not Definition.
- The persistence mechanism's implementation (e.g., cookie vs.
  `localStorage`) — belongs to Solution/Technical Design, not Definition.
- Any motion/animation/microinteraction behavior — owned by cross-cutting
  `motion-interaction`.

## Acknowledged Functional Dependencies

- **`content-localization`** — consumes this Feature's active-language
  signal to resolve/render content; this Feature does not own detection or
  rendering itself.
- **`section-navigation`** — hosts this control's visual placement within
  the nav (desktop and mobile overlay); this Feature owns only the
  control's own switching/persistence behavior.
- **`motion-interaction`** — cross-cutting; applies to this Feature per
  catalog relationship, but defines the motion behavior itself elsewhere.
- **`accessibility`** — cross-cutting; applies to this Feature per catalog
  relationship.

## Relationship to Catalog / Capabilities

- Realizes capability `localization`.
- Catalog relationship records this Feature as feeding `content-localization`.
- Consistent with `section-navigation`'s own Definition, which records
  hosting this Feature's control placement while excluding its
  switching/persistence logic.

## Pending (out of scope for this phase)

- The control's visual/interaction design (e.g., dropdown, toggle) and
  exact copy/labels — Feature UX Specification / UI Definition, once the
  Feature is Closed.
- Persistence mechanism (cookie vs. `localStorage`, etc.) — Solution /
  Technical Design.
- Use cases, acceptance criteria, observable contract, implementation.

---

*Created: 2026-09-07*
