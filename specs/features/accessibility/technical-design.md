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
- **Commitment 5 (Section Navigation Current-State AT Exposure)** — AC1
  (current-section determinable by AT) realized by `section-navigation`'s
  own Technical Design, which marks the active nav link with the native
  `aria-current="page"` attribute (Design Decision 8) — natively
  understood by assistive technology, requiring no separate mirroring
  component. AC2 (nav structure exposed as a navigable list/landmark)
  realized directly within Section Navigation's own semantic markup,
  authored as part of that Feature's own component, consistent with how
  Commitment 4's heading/landmark structure is authored per Feature
  above. No new component required.
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
- This component does not depend on the Motion Layer or introduce any
  new persisted state.

No circular dependencies: the one new component depends outward only on
already-existing, external architecture; nothing depends back on it.

---

*Created: 2026-09-07*
