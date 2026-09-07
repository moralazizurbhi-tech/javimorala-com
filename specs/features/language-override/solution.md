# Feature Solution: Language Override

**Status:** Approved

## Solution Intent

### Functional Objective

Let a visitor explicitly select one of the supported languages via a
control reachable from anywhere, immediately switch the active language
to that selection (navigating to that language's URL), and remember that
explicit choice — set only by explicit control interaction, never by
merely landing on a language's URL — so future visits honor it ahead of
fresh locale detection.

## Solution Behaviour

### Behaviours

- The control offers a choice among the supported languages, reachable
  from any screen/device at any time.
- Selecting a language via the control sets that language as the explicit
  override, persists it, and navigates to that language's URL.
- Selecting the currently active language via the control is a no-op (no
  navigation, no state change).
- Landing on any language's URL by other means (direct link, search
  result, etc.) does not set or change the persisted override.
- Once set, the override is exposed as the signal `content-localization`
  honors ahead of fresh browser-locale detection on every subsequent
  visit.
- No action clears the override back to automatic detection.

### Flows

- Visitor selects a language via the control → override set and persisted
  → navigation to that language's URL.
- Returning visitor with a previously set override → override read from
  persistence → exposed to `content-localization` ahead of detection.
- Visitor lands on a specific language's URL without using the control →
  that language displays for the visit; stored override (if any) is left
  unchanged.

### Rules

- The override is set only through explicit control interaction — never
  inferred from navigation, URL, or detected locale.
- Once set, the override remains in effect indefinitely until the visitor
  explicitly selects a different language; no separate clear/revert
  action exists.
- The persisted override must be available to `content-localization`
  prior to its resolution priority being applied.

### States and Transitions

- **Override state per visitor:** `Unset` (content-localization uses
  detection) → `Set to Language X` (via explicit control selection).
  `Set to X` → `Set to Y` via a further explicit selection. No transition
  back to `Unset`.

### Constraints

- Monotonic per visitor: once set, only re-selection changes it — no
  revert path.
- Only explicit control interaction may write to persisted state;
  direct-URL arrivals must never trigger a write.

### Boundaries

#### Included

- The override signal's set/read behavior and priority exposure to
  `content-localization`.
- The explicit-interaction-only persistence rule.
- The absence of a revert action.
- Navigation to the chosen language's URL as the effect of selection.

#### Excluded

- Locale detection and resolution-priority mechanics —
  `content-localization`'s solution.
- Rendering content in the chosen language — `content-localization`'s
  solution.
- Visual/interaction design of the control — Feature UX/UI Definition.
- Persistence storage technology (cookie/localStorage) — Technical
  Design.
- Motion/transition behavior for the navigation — `motion-interaction`.

---

*Created: 2026-09-07*
