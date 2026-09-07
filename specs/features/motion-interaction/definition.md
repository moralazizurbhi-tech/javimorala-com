# Feature Definition: Motion & Interaction

**Status:** Approved

## Identity

- **id:** `motion-interaction`
- **name:** Motion & Interaction
- **purpose:** Express the site's modern, alternative, experimental design
  character through a consistent, deliberate motion and interaction system —
  scroll-triggered reveals, animated transitions, and interaction-state
  feedback — applied across every Feature's presentation, with a mandatory
  reduced-motion fallback that keeps the full experience available without
  animation.

## Cohesive Functional Responsibility

Define and implement the site's global motion system — scroll-triggered
reveals, animated transitions, and consistent interaction-state feedback —
expressing the experimental design character across every Feature, with a
mandatory reduced-motion fallback.

## Functional Boundary

### Included

- Scroll-triggered reveal motion for content as it enters the viewport,
  across Features.
- Animated transitions for state/composition changes (e.g. Hero arrival
  sequencing, mobile nav overlay open/close, language switch).
- Consistent hover/focus/active interaction-state motion feedback for
  interactive elements, in one unified motion feel.
- Defining and implementing the mandatory reduced-motion fallback,
  equivalent in function and completeness to the animated experience.
- Layering this behavior on top of each Feature's own static presentation
  output, without altering that Feature's content, structure, or functional
  contract.

### Excluded

- The content, structure, and functional contract of what's animated —
  stays owned by each individual Feature.
- Visible focus-state existence, contrast sufficiency, and keyboard
  operability guarantees — owned by cross-cutting `accessibility`; Motion &
  Interaction owns the motion character layered on states Accessibility
  already guarantees exist and are perceivable, not whether they exist or
  comply.
- Adding interactivity to an element a Feature has defined as
  non-interactive (e.g. Hero's scroll cue must stay non-focusable) — may
  animate it, must not make it a control.
- Gating any content or function behind an interaction as a side effect of
  motion (e.g. About Narrative's pieces must stay visible without
  click/hover/expand).
- Visual design tokens themselves (colour/typography/spacing values) —
  Styling System substrate, consumed not owned here.
- Concrete technology/library, timing values, easing curves, hydration
  mechanism, and the inventory of exactly which motions apply where —
  belong to later phases (Feature Context onward), not this Definition.

## Acknowledged Functional Dependencies

- Applies across: `hero-presentation`, `about-narrative`, `direct-contact`,
  `presence-links`, `content-localization`, `language-override`,
  `section-navigation` — per the catalog's recorded relationship.
- `accessibility` — supplies the existence/compliance guarantee for
  interactive/focus states this Feature animates; the two Features stay
  separate, with the boundary above.
- Firm invariants inherited from already-Approved Features, which this
  Feature's later phases must not violate:
  - Hero Presentation's composition must reach its complete visual state
    during arrival, before scroll/interaction, regardless of the entrance
    sequencing/timing chosen here.
  - Hero's scroll cue stays non-interactive/non-focusable.
  - About Narrative's content pieces must never require a visitor action to
    become visible.
  - A reduced-motion fallback is mandatory and must be visually/
    functionally equivalent to the completed static state.

## Relationship to Catalog / Capabilities

- Realizes: none — no independent capability (cross-cutting), per
  `feature-catalog.md`.
- Traces to Project Design's "Motion & interaction as expression"
  Functional Principle, and Project UX's Experience Overview / Visual
  Foundations / Constraints.
- Catalog relationship: "applies across" the seven Features listed above.

## Pending (out of scope for this phase)

- The concrete inventory of which motions apply to which elements,
  including any not yet mentioned by another Feature — to be gathered in
  Feature Context.
- Timing/easing values, animation technology/library choice, and the
  reduced-motion implementation mechanism — Feature UX Specification and
  Technical Design.
- Use cases, acceptance criteria, solution design, observable contract,
  implementation.

---

*Created: 2026-09-07*
