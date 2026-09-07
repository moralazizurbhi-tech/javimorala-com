# Feature Context: Language Override

**Status:** Approved

## Problem

A visitor's auto-detected browser locale may not match the language they
actually want to read the site in — e.g., a non-matching locale falling
back to English, a bilingual visitor preferring a language other than
their browser default, or a misdetected locale. Without an explicit
override, such a visitor has no way to change the active language, and —
since detection would otherwise re-run each visit — even a visitor who
successfully changed it once has no way to keep that choice without
re-selecting it on every return visit.

## Motivation

Directly serves Project Design's Cross-Functional Rule ("manual override
always available") and Project UX's Experience Overview ("Switch
language" flow) and Interactive Elements spec (Language Switcher, "once
set, the choice is remembered ... rather than reverting to automatic
detection").

## Scope

### Included

- A persistent, always-reachable control (hosted by `section-navigation`)
  letting a visitor pick among the supported languages.
- Choosing a language sets the active language to that choice
  immediately, overriding whatever was auto-detected.
- The choice navigates to that language's own route.
- The choice persists across future visits, honored instead of reverting
  to auto-detection.
- Identical reachability/function across every screen and both
  desktop-nav and mobile-overlay forms.

### Excluded

- Locale detection and default/fallback behavior before any override
  exists — `content-localization`'s problem.
- Rendering content into the chosen language — `content-localization`'s
  problem.
- Visual placement/design of the control within the nav —
  `section-navigation`'s problem (hosts it).
- Per-language route/URL scheme's technical implementation — Solution/
  Technical Design.
- Persistence storage mechanism's implementation — Solution/Technical
  Design.
- Motion/interaction feel of the control — `motion-interaction`.

## Constraints

- Static-generated architecture, no backend, no user accounts —
  persistence must be client-side only.
- Three languages at launch (EN/ES/EU), approach extensible to more over
  time.
- Choosing a language must navigate to that language's own route
  (project-level, per Project UX).
- Content authored solely by Javi Morala; solo effort, no fixed deadline.

## Known Dependencies

- **`content-localization`** — consumes this Feature's active-language
  signal; does not perform detection/rendering here.
- **`section-navigation`** — hosts the control's visual placement on
  every screen/device.
- **`motion-interaction`** — cross-cutting; applies per catalog
  relationship, though not central to this Feature's problem.
- **`accessibility`** — cross-cutting; e.g., keyboard operability and
  focus visibility for the control itself.

---

*Created: 2026-09-07*
