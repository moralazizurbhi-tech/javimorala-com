# Feature Definition: Content Localization

**Status:** Approved

## Identity

- **id:** `content-localization`
- **name:** Content Localization
- **purpose:** Ensure every visitor sees the site's content in a language
  they understand by default, without requiring any action, while
  remaining consistent with whatever active language is currently in
  effect (detected or overridden).

## Cohesive Functional Responsibility

Detect the visitor's browser locale on arrival and resolve/render all
site content — visible page copy and non-visible SEO metadata (page
`<title>`, meta description, `html lang` attribute, image `alt` text) —
in the corresponding language among English, Spanish (Castellano), or
Euskera. When the detected locale is none of these three, fall back to
English. When an explicit language choice is in effect (via
`language-override`), render content in that language instead of the
detected one. The Feature owns resolving and rendering content into the
active language; it does not own how that active language is chosen,
switched, or remembered when the choice is explicit.

## Functional Boundary

### Included

- Browser-locale detection on arrival, for visitors who have not set an
  explicit override.
- Resolving and rendering visible page content in the active language
  (English, Castellano, Euskera).
- Resolving and rendering non-visible SEO metadata (title, meta
  description, `html lang`, alt text) in the active language.
- Falling back to English when the detected browser locale is not one of
  the three supported languages.
- Consuming the "active language" signal, whichever source set it
  (detection here, or override from `language-override`).

### Excluded

- The explicit manual override control itself (its UI, placement,
  switching logic) — owned by `language-override`.
- Remembering/persisting an explicit language choice across future
  visits — owned by `language-override`.
- The override control's visual placement within the nav — owned by
  `section-navigation` (hosts it).
- Translation content/copy authoring itself, and the exact per-string
  translations — belongs to later phases (Context/UX), not Definition.
- URL/routing scheme for language-specific routes (if any) and any other
  implementation mechanism for detection or rendering — belongs to
  Solution/Technical Design, not Definition.
- Any motion/animation/microinteraction behavior — owned by cross-cutting
  `motion-interaction`.

## Acknowledged Functional Dependencies

- **`language-override`** — feeds this Feature the active language when a
  visitor has made an explicit choice; this Feature only consumes that
  signal, it does not own the override mechanism.
- **`section-navigation`** — hosts the override control's placement
  (indirect dependency, via `language-override`); no direct dependency of
  this Feature on section-navigation's own responsibilities.
- **`motion-interaction`** — cross-cutting; applies to this Feature per
  catalog relationship.
- **`accessibility`** — cross-cutting; applies to this Feature per
  catalog relationship.

## Relationship to Catalog / Capabilities

- Realizes capability `localization`.
- Catalog relationship records `language-override` as feeding this
  Feature.

## Pending (out of scope for this phase)

- Exact translation strings/copy for all three languages.
- Detection/rendering mechanism (e.g., `Accept-Language` header vs.
  `navigator.language`, static vs. server-rendered routes) — Solution /
  Technical Design.
- Use cases, acceptance criteria, observable contract, UX specification,
  implementation.

---

*Created: 2026-09-07*
