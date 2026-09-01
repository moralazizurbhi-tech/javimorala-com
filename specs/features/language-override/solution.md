# Feature Solution: Language Override

## Solution Intent

### Functional Objective

Let a visitor explicitly select their preferred language (English or
Spanish) from an always-available, state-indicating control, overriding
whatever auto-detection selected — with content updating immediately in
place and the choice remembered for future visits — resolving the
Context's need for a correction path when auto-detection doesn't match the
visitor's actual preference.

## Solution Behaviour

### Behaviours

- The control always offers exactly the two supported languages (English,
  Spanish).
- The control always indicates which language is currently active.
- Selecting the other language updates the site's displayed content to
  that language immediately, in place — no reload or navigation.
- Selecting the language that's already active produces no observable
  change.
- Once a visitor makes a selection, that choice is remembered and takes
  priority over auto-detection on future visits.

### Flows

- Visitor arrives → sees content in the resolved language (remembered
  override if one exists, otherwise auto-detected) → control reflects
  that language as active.
- Visitor activates the control's other-language option → content updates
  immediately to the new language → control's active-state indicator
  updates to match → choice is remembered for future visits.
- Returning visitor with a previously remembered override → site loads
  directly in that language, bypassing auto-detection → control still
  available for further changes.

### Rules

- The control's active-state indicator always matches the language
  currently resolved by `content-localization` — it reflects that state,
  it does not own it (per this Feature's Definition).
- Selecting a language always triggers an in-place content update — never
  a full page reload/navigation.
- A remembered override, once set, always takes priority over
  auto-detection until explicitly changed again.
- Selecting the already-active language is a no-op — no content update,
  no re-signal.

### States and Transitions

- Two mirrored display states: **English-active** and **Spanish-active**
  — reflecting (not owning) the locale `content-localization` currently
  resolves.
- English-active → Spanish-active, and the reverse, both triggered only
  by explicit visitor selection via the control.
- No other transitions (e.g. no timeout, no automatic reversion).

### Constraints

- Immediate in-place content update is a required behavior, not
  optional — concretizes Context's "no client-side router" constraint
  into a specific functional requirement.
- The control's active-state indicator must always be consistent with the
  resolved locale — introduced here to remove ambiguity about whether the
  control is state-aware or a blind toggle.

### Boundaries

#### Included

- The two-language selection behavior and its always-available,
  state-indicating control.
- The immediate, in-place update behavior on selection.
- The remembered-override behavior and its priority over auto-detection
  on return visits.

#### Excluded

- Auto-detecting browser locale, and the actual mechanism of
  resolving/rendering content in a language — `content-localization`.
- How/where the remembered choice is technically stored (localStorage,
  cookie, etc.) — Technical Design.
- Visual/interaction specification of the control (exact widget,
  indicator styling, positioning within App Shell) — Feature UX.
- Any nav-related behavior — `section-navigation`; not part of this
  control.
- Motion/animation on selection or state change — `motion-interaction`.

---

*Created: 2026-09-01*
