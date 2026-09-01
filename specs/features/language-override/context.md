# Feature Context: Language Override

## Problem

A visitor whose browser locale doesn't match their actual preferred reading
language — because their device is configured differently than the
language they'd choose, they're on a shared/public machine, or they simply
want to read the site in the other supported language — has no way to
correct auto-detection once it has picked a language. Locale-detection
alone can put the wrong language in front of a visitor with no way out,
undermining the very content they came to read.

## Motivation

The site's Vision is a credible, self-owned reference point for a
bilingual (English/Spanish) audience. Project Architecture explicitly
rules out locale-detection-only ("must always expose a manual override —
locale-detection-only is not acceptable"), so an always-available
correction path is a precondition for that vision, not an optional
nicety.

## Scope

### Included

- The need for an explicit, always-discoverable way to switch the active
  language, independent of what auto-detection chose.
- The need for that choice, once made, to be remembered on the visitor's
  device across future visits — so a visitor doesn't have to re-correct
  auto-detection every time they return.

### Excluded

- How locale is auto-detected, and how content is actually
  resolved/rendered in the chosen language — `content-localization`'s
  problem.
- Any wayfinding/nav need — `section-navigation`'s problem; this control
  is not part of nav (per this Feature's own Definition).
- The control's motion/interaction feel — `motion-interaction`'s problem.
- Any solution shape: exact widget (toggle/dropdown/etc.), visual
  treatment, positioning within App Shell — belongs to Feature
  Solution/UX/Technical Design.

## Constraints

- Only two supported languages (English/Spanish) — "no automated
  translation service," content authored directly by Javi Morala for
  both.
- Remembering the override across visits must be purely client-side (e.g.
  on-device) — the project's "no backend, no persistence, no accounts"
  architectural principle rules out server-side storage of this choice.
- No client-side router / single continuous page — the override applies
  to content resolution, not navigation.
- Inherited from project level: solo effort, no fixed deadline.

## Known Dependencies

- **`content-localization`** — this Feature's control signals a change
  that `content-localization` must consume to detect/resolve/render
  content; per this Feature's Definition, `language-override` "feeds"
  `content-localization`.
- **`section-navigation`** — explicitly no dependency; not co-located
  with or hosted by nav.
- **Project Architecture's App Shell** — hosts the control per System
  Structure, but the App Shell's own composition/wiring is not owned
  here.

---

*Created: 2026-09-01*
