# Feature UX Specification: Language Override

## UX Scope

Specializes Project UX's Experience Overview (bold/confident/technical
impression, dark-only) and the global UX Constraints (contrast, dark-only
single accent, two-tier typography, reduced-motion, purpose-built mobile
treatment, performance) — for a persistent, fixed-corner language control
appearing consistently across the Hero/About/Contact views.

**Flagged gap, not resolved here:** Project UX Specification currently
names no Screen, Navigation entry, User Flow, or UI Component for a
language/locale control at all — this Feature introduces UX knowledge
with no existing Project UX element to specialize, unlike sibling
Features. Mirrors the precedent set by `section-navigation`'s Technical
Design, which flagged and proceeded past an analogous Architecture gap.

Excludes: locale detection/resolution mechanism (`content-localization`),
nav (`section-navigation`), motion timing (`motion-interaction`), App
Shell's own composition (Technical Design/Architecture).

## User Flows

### Switch language

New flow — no existing Project UX flow to specialize, per the flagged gap
above.

- Visitor anywhere on Hero/About/Contact → activates the fixed-corner
  trigger (minimal icon/two-letter code showing the current language) →
  menu expands, showing both language options with the active one
  indicated (Contract Commitments 1, 2).
- Visitor selects the non-active option → menu closes, content updates
  immediately in place to the new language (Commitment 3); choice is
  remembered for future visits (Commitment 5).
- Visitor selects the already-active option, or dismisses without
  selecting → menu closes, no change (Commitment 4).

## Screens

### Hero view / About view / Contact view

Existing identity, from Project UX's Screens.

- Purpose (this Feature's slice): host the control's persistent,
  fixed-corner presence across all three, without redefining each view's
  own composition/content. Participates in Switch language.

## Interaction States

- **Collapsed (default)** — trigger only visible (minimal icon/
  current-language code); steady state.
- **Expanded** — trigger activated; menu reveals both language options,
  active one indicated.
- **Reduced-motion** — per Project UX's mandatory fallback, expand/
  collapse and the active-indicator update still reach their settled
  state without relying on animated transition.

## Feature Components

- **Language control trigger** — minimal, persistent, fixed-corner
  element (icon or two-letter language code) showing the current active
  language; activates the menu. Sized/shaped to remain minimal even if
  more languages are added later, without committing this Feature's
  scope beyond the two currently supported.
- **Language menu** — lists the currently-supported language options
  (English, Spanish), indicates the active one, and closes on selection
  (switching or no-op) or dismissal.

## UX Constraints

- Composition must express within the existing visual identity —
  dark-only, single accent, two-tier typography (Existing, global).
- Reduced-motion fallback mandatory for expand/collapse and
  active-indicator change (Existing, global).
- Text/interactive elements must maintain accessible contrast, including
  the minimal trigger's icon/code (Existing, global).
- The fixed-corner control must not overlap or interfere with the
  persistent nav's own presentation, inline or overlay — both are
  independent fixed elements per this Feature's Definition boundary.
- The control must remain reachable and usable at every viewport, with
  its own deliberate mobile treatment rather than a generic reflow
  (Existing, global — "every view must receive an equally deliberate,
  purpose-designed mobile treatment").
- Hover/focus feedback on the trigger and menu items follows the site's
  restrained micro-interaction principle (Existing, global —
  micro-interactions stay restrained by contrast to page-level motion).
- Perceived performance must not be compromised by the menu's
  expand/collapse (Existing, global).

---

*Created: 2026-09-01*
