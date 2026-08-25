# Feature Solution: Hero Presentation

## Solution Intent

### Functional Objective

Present a cohesive first-impression composition — headline/tagline,
wordmark centerpiece, entry scroll cue — to every visitor immediately on
arrival, sufficient for them to understand who Javi is, perceive
credibility, and be invited to continue exploring, resolving the bounce
risk and credibility risk identified in the Feature Context.

## Solution Behaviour

### Behaviours

- On arrival, render the headline/tagline (as supplied by
  `content-localization` for the active language), the wordmark in its
  centerpiece placement, and the scroll cue — together, as one
  composition.
- The scroll cue is a passive visual affordance only: it signals that
  further content exists below but does not itself trigger scrolling or
  navigation.
- The composition requires device-class-appropriate treatment (not a
  plain reflow of one universal layout) — flagged as a boundary point for
  Feature UX to resolve, not specified here.

### Flows

- Page load → Hero composition renders complete → visitor perceives
  identity/value and the invitation to continue → visitor free-scrolls,
  uses `section-navigation`, or leaves. (Grounded in `project-ux.md`'s
  existing "First impression" User Flow — not redefined here.)

### Rules

- The three elements (headline/tagline, wordmark, scroll cue) are never
  presented independently of one another.
- Headline/tagline content reflects whatever `content-localization`
  resolves at render time; hero-presentation does not decide language or
  reactively re-render on a later language change (out of scope for this
  Solution).
- The scroll cue never triggers navigation or scrolling.
- Entrance timing/sequencing of the three elements is unconstrained by
  this Solution — governed entirely by `motion-interaction`.

### States and Transitions

None identified — no interactive substates beyond the single rendered
composition.

### Constraints

- Device-class-appropriate composition is a required behavior (not
  optional), even though its specific treatment is deferred to UX. This
  constraint is introduced by this Solution, distinct from the Context's
  inherited constraints (fast render, existing visual identity, full
  device range).

### Boundaries

#### Included

- Composing headline/tagline (given, localized), wordmark placement, and
  scroll cue together on arrival.
- Requiring device-class-appropriate composition as a boundary point
  handed to UX.

#### Excluded

- Scroll cue as an interactive/triggering control.
- Reactive re-render on runtime language change.
- Entrance/exit motion sequencing.
- Specific visual/device treatments.
- Actual headline/tagline copy content.
- Nav and social-links behavior.

---

*Created: 2026-08-25*
