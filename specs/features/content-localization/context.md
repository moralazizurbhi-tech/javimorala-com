# Feature Context: Content Localization

## Problem

Without this Feature, the site can only ever present content in one fixed
language regardless of a visitor's browser locale — failing the portion of
its bilingual (English/Spanish) audience whose locale doesn't match
whatever is hardcoded. Separately, `language-override`'s manual control
would have nothing to act on: it can only signal a language change, but
with no mechanism to detect a default locale, hold the active-language
state, and resolve/render content accordingly, that signal is functionally
inert.

## Motivation

The site's Vision is a credible, self-owned professional and personal
reference point reaching a bilingual (English/Spanish) audience. Project
Architecture's principle that the site is "bilingual by construction:
content is locale-keyed from the Content Data Layer outward, not
retrofitted onto single-language content" makes actually resolving and
rendering that locale-keyed content a precondition for the Vision, not an
optional nicety.

## Scope

### Included

- The need to determine, for each visitor, a default active language from
  their browser locale.
- The need for unsupported/unrecognized browser locales to still resolve
  to a sensible default rather than failing or showing mixed content.
- The need to keep displayed content matching the visitor's active
  language at all times, including immediately after a manual override.
- The need for a manual override, once made, to persist across future
  visits rather than being lost on return.

### Excluded

- How a visitor signals wanting to change language, and that control's
  presentation — `language-override`'s problem.
- What the actual English/Spanish copy says, per section — each
  content-owning Feature's and the Content Data Layer's concern.
- Visual/motion treatment of a language change — `motion-interaction`'s
  concern.
- The persistent nav's own wayfinding structure — `section-navigation`'s
  concern (though its destination labels' text is content this Feature
  must still resolve).

## Constraints

- Only two supported languages: English and Spanish — no automated
  translation service; all copy is authored directly by Javi Morala for
  both.
- Unsupported/unrecognized browser locales fall back to English as the
  default.
- Any persisted override state must be purely client-side (e.g. on-device
  storage) — the project's "no backend, no persistence, no accounts"
  principle rules out server-side storage of this choice.
- Content must be locale-keyed from the Content Data Layer outward by
  architectural principle, not retrofitted onto single-language content.
- Inherited from project level: solo effort, no fixed deadline.

## Known Dependencies

- **`language-override`** — feeds this Feature; its control raises the
  language-change signal this Feature consumes.
- **`hero-presentation`**, **`about-narrative`**, **`email-contact`**,
  **`social-links`**, **`section-navigation`** — each depends on this
  Feature to resolve/render its text content (including, for
  `section-navigation`, its destination labels) in the active language.
- **Content Data Layer** (Project Architecture) — the structured,
  locale-keyed content files this Feature resolves from; a shared
  substrate, not owned by any Feature.

---

*Created: 2026-09-01*
