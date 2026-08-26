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

- On arrival, the visitor experiences the complete Hero composition —
  headline/tagline (as supplied by `content-localization` for the active
  language), the wordmark in its centerpiece placement, and the scroll
  cue — as one coordinated composition. "Complete" means all three
  elements have reached their arrival state before the visitor scrolls
  or otherwise interacts with the page; this Solution does not constrain
  how `motion-interaction` sequences or times their appearance up to
  that point.
- The scroll cue is a passive visual affordance only: it signals that
  further content exists below but does not itself trigger scrolling or
  navigation.
- The composition requires device-class-appropriate treatment (not a
  plain reflow of one universal layout) — flagged as a boundary point for
  Feature UX to resolve, not specified here.

### Flows

- Page load → Hero composition reaches its complete arrival state (per
  the Rules below) → visitor perceives
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
- Regardless of how `motion-interaction` sequences or times the
  elements' entrance, the composition must reach its complete state
  (all three elements present) as part of arrival — before the visitor
  scrolls or otherwise interacts with the page. This Solution
  constrains only this completeness invariant, not the entrance
  timing/sequencing mechanics themselves.
- The composition's completeness must never be undermined or delayed by
  heavier visual elements (e.g. the wordmark asset) — visual richness is
  never an acceptable reason for the composition to fall short of the
  completeness invariant above.

### States and Transitions

None identified — no interactive substates beyond the single rendered
composition.

### Constraints

- Device-class-appropriate composition is a required behavior (not
  optional), even though its specific treatment is deferred to UX. This
  constraint is introduced by this Solution, distinct from the Context's
  inherited constraints (fast render, existing visual identity, full
  device range).
- The composition must reach completeness during arrival, before
  scroll/interaction, regardless of motion sequencing. Introduced by
  this Solution; narrows (without contradicting) the Context's "must
  render fast / feel instant" constraint and the "governed by
  `motion-interaction`" boundary.

### Boundaries

#### Included

- Composing headline/tagline (given, localized), wordmark placement, and
  scroll cue together, with a completeness guarantee anchored to
  arrival.
- Requiring device-class-appropriate composition as a boundary point
  handed to UX.
- Requiring that visual richness never compromise the composition's
  completeness guarantee.

#### Excluded

- Scroll cue as an interactive/triggering control.
- Reactive re-render on runtime language change.
- Entrance/exit motion timing, sequencing, easing, or animation
  implementation (owned by `motion-interaction`).
- Specific visual/device treatments.
- Actual headline/tagline copy content.
- Nav and social-links behavior.
- Performance implementation mechanisms (loading spinners, preload
  strategies, rendering techniques).

---

*Created: 2026-08-25*
