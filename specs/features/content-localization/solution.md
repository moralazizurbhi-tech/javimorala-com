# Feature Solution: Content Localization

**Status:** Approved

## Solution Intent

### Functional Objective

Resolve the visitor's active language — from an explicit override signal,
else detected browser locale, else English fallback — and render all site
content (visible copy and metadata) in that language from first paint,
with every language independently reachable via its own URL, resolving
Feature Context's language-mismatch problem.

## Solution Behaviour

### Behaviours

- On any page load, the active language is resolved before content
  renders (no detect-then-swap).
- Resolution priority: (1) an explicit override signal from
  `language-override`, if present; (2) detected browser locale, if it is
  English, Spanish, or Euskera; (3) English fallback.
- All site content — visible copy and metadata (title, meta description,
  `html lang`, alt text) — renders consistently in the single resolved
  active language; no page ever mixes languages.
- Each of the three languages has its own independently reachable URL, so
  a visitor (or search engine) can land directly on a specific language's
  content without relying on detection having run.
- A visitor arriving without specifying a language resolves, via the
  priority order above, to that language's own URL/content.

### Flows

- Visitor arrives without specifying a language → active language
  resolved via priority order → visitor views content at that language's
  URL, rendered in that language from first paint.
- Visitor arrives directly at a specific language's URL (e.g., a shared
  link) → that language is active immediately; detection is bypassed
  since the language is already explicit.
- Visitor has a prior override in effect (signaled by `language-override`)
  → that language resolves on arrival, ahead of fresh browser-locale
  detection.

### Rules

- Exactly one language is active per page view; content and metadata are
  never partially resolved.
- Detected browser locale is honored only when it is one of the three
  supported languages; any other detected locale resolves to the English
  fallback.
- All three languages must have equivalent content coverage across every
  content surface — no surface is complete in only some languages.
- Content resolution must complete before first paint (no visible
  language swap after initial render).

### States and Transitions

- **Active Language:** one of `{English, Spanish, Euskera}`, resolved
  once per page load via the priority order above. This Feature defines
  the resolution result only — it does not define what triggers a change
  within a session (that belongs to `language-override`'s own solution).

### Constraints

- Because active language is resolved per page load/URL rather than
  toggled in place, any language change necessarily involves arriving at
  a different URL — consistent with Project UX's note that choosing a
  language navigates to that language's route.
- All three languages' content must ship together (equivalent coverage)
  rather than rolling out incrementally, to satisfy the no-partial-
  language rule above.

### Boundaries

#### Included

- Locale-detection priority logic and English fallback.
- Content/metadata resolution and rendering per active language.
- Per-language URL reachability as a functional requirement.
- The no-flash, first-paint-correct rendering requirement.

#### Excluded

- The override control's own UI, switching action, and remembering the
  choice — `language-override`'s solution.
- Whether a direct-language-URL visit updates the visitor's remembered
  preference — `language-override`'s decision, since it owns persistence;
  not decided here.
- Authoring the actual translated content/copy strings.
- The exact technical mechanism (build-time per-locale pages, client-side
  routing, redirects, URL prefix scheme) — Technical Design.
- Motion/transition specifics for any language-change navigation —
  `motion-interaction`.

---

*Created: 2026-09-07*
