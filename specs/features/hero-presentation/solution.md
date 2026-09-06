# Feature Solution: Hero Presentation

**Status:** Approved

## Solution Intent

### Functional Objective

Present a cohesive first-impression composition — headline/tagline,
ornamental-mark placement, and entry scroll cue — to every visitor
immediately on arrival, sufficient for Javi's identity and experimental
character to come through authentically before the visitor scrolls or
interacts, resolving the arrival-moment problem identified in Feature
Context (framed as self-expression landing, not bounce/credibility risk,
per Context).

## Solution Behaviour

### Behaviours

- On arrival, the visitor experiences the complete Hero composition —
  headline/tagline (as supplied by `content-localization` for the active
  language), the ornamental mark in its centerpiece placement, and the
  scroll cue — as one coordinated composition. "Complete" means all three
  elements have reached their arrival state before the visitor scrolls or
  otherwise interacts with the page; this Solution does not constrain how
  `motion-interaction` sequences or times their appearance up to that
  point.
- The scroll cue is a passive visual affordance only: it signals that
  further content exists below but does not itself trigger scrolling or
  navigation.
- The composition requires device-class-appropriate treatment (not a plain
  reflow of one universal layout) — flagged as a boundary point for
  Feature UX to resolve, not specified here.

### Flows

- Page load → Hero composition reaches its complete arrival state (per
  the Rules below) → visitor perceives Javi's identity and character →
  visitor free-scrolls, uses `section-navigation`, or leaves. This
  Solution does not evaluate that outcome as success/failure, consistent
  with Context's self-expression-not-persuasion framing.

### Rules

- The three elements (headline/tagline, ornamental mark, scroll cue) are
  never presented independently of one another.
- Headline/tagline content reflects whatever `content-localization`
  resolves at render time; hero-presentation does not decide language or
  reactively re-render on a later language change (out of scope for this
  Solution).
- The scroll cue never triggers navigation or scrolling.
- Regardless of how `motion-interaction` sequences or times the elements'
  entrance, the composition must reach its complete state (all three
  elements present) as part of arrival, before the visitor scrolls or
  otherwise interacts with the page. This Solution constrains only this
  completeness invariant, not entrance timing/sequencing mechanics
  themselves.
- The composition's completeness must never be undermined or delayed by
  heavier visual elements (e.g. the ornamental-mark asset) — visual
  richness is never an acceptable reason for the composition to fall short
  of the completeness invariant above.

### States and Transitions

None identified — no interactive substates beyond the single rendered
composition.

### Constraints

- Device-class-appropriate composition is a required behavior (not
  optional), even though its specific treatment is deferred to UX —
  narrows Context's confirmed "distinct mobile treatment" constraint into
  a solution-level requirement.
- The composition must reach completeness during arrival, before
  scroll/interaction, regardless of motion sequencing.

### Boundaries

#### Included

- Composing headline/tagline (given, localized), ornamental-mark
  placement, and scroll cue together, with a completeness guarantee
  anchored to arrival.
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
- Nav behavior.
- Performance implementation mechanisms (loading spinners, preload
  strategies, rendering techniques).

---

*Created: 2026-09-06*
