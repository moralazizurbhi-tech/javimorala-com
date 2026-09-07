# Feature Definition: Accessibility

**Status:** Approved

## Identity

- **id:** `accessibility`
- **name:** Accessibility
- **purpose:** Guarantee the experience is usable regardless of ability
  across every Feature — full keyboard operability, visible focus states,
  sufficient contrast, and assistive-technology compatibility — as an
  intrinsic property of the design, not a bolted-on layer.

## Cohesive Functional Responsibility

Ensure the experience is usable regardless of ability across every
Feature — full keyboard operability, visible focus states, sufficient
contrast, and assistive-technology compatibility.

## Functional Boundary

### Included

- Guaranteeing every interactive element, across every Feature, is
  reachable and operable by keyboard alone.
- Guaranteeing every interactive element has a visible, sufficiently
  distinguishable focus state.
- Guaranteeing sufficient colour/text contrast across every Feature's
  content and UI.
- Guaranteeing assistive-technology compatibility (semantic structure,
  appropriate roles/labels) across every Feature.
- Establishing the concrete accessibility conformance standard/level the
  site targets — left open by Project Design ("specific accessibility
  standard or conformance level is left to a later phase") — to be
  settled in this Feature's own later phases (Context onward), not here.
- Layering this guarantee across each Feature's own content and
  structure, without altering that Feature's functional contract.

### Excluded

- The motion character of focus/hover/active states and the
  reduced-motion fallback mechanism — owned by cross-cutting
  `motion-interaction`; Accessibility guarantees these states exist and
  are perceivable/operable, Motion & Interaction owns how they move.
- Visual design tokens themselves (exact colour/typography values) —
  Styling System substrate; Accessibility owns the sufficiency guarantee,
  not the token values.
- The content, structure, and functional contract of what's made
  accessible — stays owned by each individual Feature.
- Concrete technology, ARIA pattern inventory, specific conformance
  target (e.g. WCAG level), and per-element contrast ratios — later
  phases (Feature Context onward).

## Acknowledged Functional Dependencies

- Applies across: `hero-presentation`, `about-narrative`,
  `direct-contact`, `presence-links`, `content-localization`,
  `language-override`, `section-navigation` — per the catalog's recorded
  relationship.
- `motion-interaction` — owns the motion/reduced-motion layer on top of
  the states this Feature guarantees exist; the two Features stay
  separate, with the boundary above.
- Firm invariant inherited from already-Approved Features: Hero's scroll
  cue is defined as non-interactive/non-focusable — Accessibility's
  keyboard/focus guarantees apply to actual interactive elements, not to
  that cue.

## Relationship to Catalog / Capabilities

- Realizes: none — no independent capability (cross-cutting), per
  `feature-catalog.md`.
- Traces to Project Design's accessibility Design Constraint, and Project
  UX's UX Constraints (full keyboard operability, visible focus states,
  sufficient contrast, assistive-technology compatibility) and Visual
  Foundations ("clearly visible, on-brand focus state").
- Catalog relationship: "applies across" the seven Features listed above.

## Pending (out of scope for this phase)

- The concrete accessibility conformance standard/level the site
  targets.
- ARIA patterns, contrast ratios, and keyboard-interaction patterns per
  element.
- Use cases, acceptance criteria, solution design, observable contract,
  implementation.

---

*Created: 2026-09-07*
