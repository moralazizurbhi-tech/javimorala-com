# Technical Design: Accessibility

**Status:** Approved

## Technical Components

### Focus-Visible Style Module

**Purpose**

Realize a visible, on-brand focus indicator across every interactive
element (Commitment 2), contributing to Commitment 3's ≥3:1 ratio once
Styling System fixes its token value.

**Responsibilities**

- Apply a `:focus-visible` (not `:focus`) style universally to every
  interactive element, using an offset outline referencing Styling
  System's accent-colour token and matching each element's own corner
  radius.
- Apply automatically to every interactive element without requiring any
  Feature's own component to opt in or import this module.

**Owned Concepts**

- The focus-visible selector strategy and its universal, zero-opt-in
  application rule.

**Collaborations**

- Styling System (external) — supplies colour/radius tokens.
- Every Feature's own interactive markup (external, read-only) —
  targeted generically via the `:focus-visible` pseudo-class, not
  per-component integration, mirroring `motion-interaction`'s Nav
  Transition Styles zero-coupling pattern.

**Dependencies**

- Styling System — external (colour/radius tokens, currently Pending
  values).

**Constraints**

- Must apply automatically, globally — no Feature's own component may
  need to reference it.
- Colour/radius trace to Styling System tokens; this component does not
  fix their values.

**Design Decisions**

1. `:focus-visible` rather than `:focus`. Rationale: shows the ring for
   keyboard interaction while not over-triggering on mouse click,
   satisfying "visible focus indicator" (Commitment 2) without a jarring
   ring on every pointer click.

**Contract Traceability**

- Commitment 2 (primary); contributes to Commitment 3 once Styling
  System's token value is fixed.

### Nav Current-State AT Exposure

**Purpose**

Expose Section Navigation's existing "active section" state to
assistive technology (Commitment 5 — closes Context Gap 1), without
requiring Section Navigation's own component to change.

**Responsibilities**

- Hydrate as a thin client-side island observing Section Navigation's
  existing, already-public active-section DOM/class signal — the same
  signal `motion-interaction`'s own Nav Transition Styles component
  already targets externally.
- Whenever that signal changes, mirror it into an AT-current-state
  attribute on the corresponding nav link, and remove it from the
  previously-current one.
- Derive this purely from Section Navigation's already-owned state —
  introduces no second, independently-tracked "active section" concept
  (avoiding the desync risk Section Navigation's own Technical Design
  already flagged for its compact-logomark condition).
- If Section Navigation's signal is not yet available (not hydrated),
  set no current-state attribute until it is — an eventually-consistent
  fallback rather than an error state.

**Owned Concepts**

- The DOM-signal-to-AT-attribute mirroring logic.

**Collaborations**

- Section Navigation Composition (external, `section-navigation`) —
  targets its existing, already-public active-section DOM/class contract
  from outside; Section Navigation's own component remains unaware of
  this island, consistent with its own Technical Design's "no dependency
  on motion-interaction" precedent, extended here.

**Dependencies**

- Section Navigation Composition's active-section DOM/class contract —
  external, read-only.

**Constraints**

- Must not alter Section Navigation's own defined content or links —
  attribute mirroring only.
- Must not introduce a second, independently-tracked active-section
  state.

**Design Decisions**

1. A self-contained external island (mirroring the state) rather than
   requiring Section Navigation's own Technical Design to add this
   responsibility. Rationale: Section Navigation's Technical Design is
   already Approved; imposing a retroactive interface on it would
   require reopening a closed artifact this phase has no authority to
   modify. A self-contained island observing its already-public signal
   achieves Commitment 5 with zero coupling in either direction,
   following the exact pattern `motion-interaction`'s Nav Transition
   Styles already established and this project already accepted.

**Contract Traceability**

- Commitment 5.

## Commitments Realized by Existing Architecture (No New Component)

- **Commitment 1 (Keyboard Operability)** — realized by the Accessible
  Primitives Layer (Radix UI, Project Architecture) underlying every
  interactive component, plus native `<a href>` semantics for plain
  links (Direct Contact CTA, Presence Links) and Hero's scroll cue being
  defined non-interactive by `hero-presentation`'s own Contract. No new
  component required; this Feature's role is verification against these
  already-existing guarantees.
- **Commitment 3, body-text/UI contrast values** — a constraint on
  Styling System's token values (externally owned, currently Pending),
  not a runtime mechanism. Whichever values Styling System eventually
  fixes must independently satisfy the ratios Commitment 3 specifies.
- **Commitment 4 (AT compatibility)** — AC1 (interactive elements)
  realized by the Accessible Primitives Layer, as above. AC2/AC4
  (heading/landmark structure, alt text, decorative-hiding) are realized
  directly within each Domain Section's own static markup, authored per
  Feature — exact heading levels/landmark roles/alt text are each Domain
  Section's own Implementation-level authoring decision, guided by
  Feature Solution's existing Rule that structure must reflect actual
  content organization. AC3 (Hero's scroll cue non-focusable) is already
  committed in `hero-presentation`'s own Contract.
- **Commitment 6 (Document Language Sync)** — already fully realized by
  the combination of `content-localization`'s i18n/Routing Layer
  (generates each static route with its correct `html lang` from the
  Content Layer) and `language-override`'s Language Switcher Component
  (a full navigation to the target locale's route on selection, per its
  own Technical Design). Because language switching is a full navigation
  to a freshly-rendered document, no code path exists where content
  renders under one locale while `html lang` reflects another — no new
  component needed.

## Cross-Component Relationships

- Focus-Visible Style Module → Styling System (external): consumes
  colour/radius tokens; no reverse dependency.
- Nav Current-State AT Exposure → Section Navigation Composition
  (external): reads its public active-section signal only; Section
  Navigation has no dependency back, consistent with its own Technical
  Design.
- Neither new component depends on the Motion Layer or introduces any
  new persisted state.

No circular dependencies: both new components depend outward only on
already-existing, external architecture; nothing depends back on them.

---

*Created: 2026-09-07*
