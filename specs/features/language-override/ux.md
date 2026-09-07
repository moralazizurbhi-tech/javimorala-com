# Feature UX Specification: Language Override

**Status:** Approved

## UX Scope

Specializes Project UX's "Language Switcher" UI Component and the "Switch
language" User Flow's switching mechanism itself — continuing
`section-navigation`'s own UX flow "Switch language (nav-hosting only)"
from the point of activation. Excludes nav bar/overlay composition and
control placement (`section-navigation`), locale detection/rendering
(`content-localization`), and motion (`motion-interaction`).

## User Flows

### Switch to a different language

Specializes Project UX's "Switch language" flow (switching mechanism
itself) and continues `section-navigation`'s "Switch language
(nav-hosting only)" flow from the point of activation.

- Visitor activates the language control (reachable per
  `section-navigation`'s hosting) → dropdown opens, listing the supported
  languages with the current active language indicated → visitor selects
  a different language → dropdown closes → navigation to that language's
  URL, content renders in the new language (Contract Commitment 1) →
  choice persisted for future visits (Contract Commitment 4).

### Select the already-active language (no-op)

- Visitor opens the dropdown → selects the language already active →
  dropdown closes → no navigation, no persisted-state change (Contract
  Commitment 2).

### Return with a previously set language

- Visitor with a persisted override arrives on a later visit → the
  control's active-indicator reflects the persisted language without
  requiring the visitor to reopen/reselect it (Contract Commitment 4).

## Screens

Introduction, Personal Narrative, Connection (existing identity, from
Project UX's Screens). This Feature owns no screen composition of its
own — the control appears wherever `section-navigation` places it
(desktop bar, mobile overlay) on all three, and participates in "Switch
to a different language" on each.

## Interaction States

- **Dropdown:** `Closed` (default/rest state) → `Open` (lists the
  languages); closes on selection or dismissal.
- **Current-Language Indicator:** the active language is visually
  distinguished within the open list at all times when open; exact
  visual treatment Pending, left to Feature UI.
- No loading, empty, or error state applies — this Feature is a static
  list with a client-side switch, with no data-fetch or fallible
  operation.

## Feature Components

- **Language Switcher** — existing identity, Project UX UI Components
  ("manual locale override, available from both nav forms on every
  screen"). This Feature's realization: a dropdown/menu trigger plus a
  list of the supported languages with the current one indicated,
  embedded within `section-navigation`'s desktop bar and mobile overlay
  forms (hosting/placement is `section-navigation`'s own UX).

## Content and Assets

- **Language option display labels** — Pending: exact display strings
  for each of the three languages (e.g., full names vs. codes).
- **Trigger's closed-state displayed value** — Pending: what the closed
  dropdown trigger shows (current language code/name/icon) — Feature UI.

## UX Constraints

- The control must be reachable from the persistent nav on every
  screen/device (Project UX Constraint, inherited via
  `section-navigation`'s hosting).
- Full keyboard operability — open/close the dropdown, navigate options,
  select an option — visible focus states, sufficient contrast, and
  correct assistive-technology/ARIA menu semantics (Project UX UX
  Constraints).
- Once set, the choice is remembered for that visitor's future visits
  (Project UX Constraint; Contract Commitments 4, 5).
- No motion, timing, or transition behavior (dropdown open/close) is
  defined here — owned by `motion-interaction`.

---

*Created: 2026-09-07*
