# Feature Contract: Hero Presentation

## Contract Commitments

### Commitment 1 — Composition Completeness

Relationship to Solution: resolves the Behaviours ("as one coordinated
composition") and Rules ("never presented independently," the
completeness invariant, the richness non-excuse) and the Constraint that
completeness must be reached during arrival, before scroll/interaction,
regardless of motion sequencing. Resolves the Feature Context's bounce
risk and credibility risk.

**Acceptance Criteria**

- AC1: By the time the visitor scrolls or otherwise interacts with the
  page, the Hero composition presents all three elements —
  headline/tagline, wordmark centerpiece, and scroll cue — together.
- AC2: The composition is never presented, delivered, or usable in a
  settled/arrived state that has only a subset of the three elements
  (e.g. no valid arrival state exists with the wordmark shown but no
  scroll cue).
- AC3: Reaching completeness is never conditional on, or delayed by, the
  weight/complexity of any individual visual element (e.g. the wordmark
  asset).

**Validation Scenarios**

- Scenario A — Standard arrival
  - Success Condition: at the moment the visitor first scrolls or
    interacts, headline/tagline, wordmark, and scroll cue are all
    present.
  - Failure Condition: the visitor scrolls or interacts while one or
    more of the three elements has not yet appeared.
- Scenario B — Heavier visual element present
  - Success Condition: even when the wordmark (or another Hero visual
    element) is heavier/slower to render, the composition still reaches
    completeness before the visitor can scroll or interact.
  - Failure Condition: completeness is delayed or skipped because of
    that element's visual weight.

### Commitment 2 — Localized Content at Render

Relationship to Solution: resolves the Rule that headline/tagline
content reflects whatever `content-localization` resolves at render
time. Resolves the Feature Context's `content-localization` dependency.

**Acceptance Criteria**

- AC1: The headline/tagline text in the Hero composition matches the
  language `content-localization` resolves at render time.
- AC2: hero-presentation does not itself decide or override the active
  language.

**Validation Scenarios**

- Scenario — Arrival with a resolved locale
  - Success Condition: the headline/tagline text is in the language
    `content-localization` resolved.
  - Failure Condition: the headline/tagline text is in a different
    language than the one resolved.

Excluded from this Commitment, unchanged from Solution: reactive
re-render on a later language change — no commitment or failure
condition applies to that scenario.

### Commitment 3 — Passive Scroll Cue

Relationship to Solution: resolves the Behaviour and Rules establishing
the scroll cue as a passive visual affordance that never triggers
scrolling or navigation.

**Acceptance Criteria**

- AC1: The scroll cue is visually present within the completed
  composition, signaling that further content exists below.
- AC2: Activating the scroll cue (click/tap/etc.) does not itself cause
  scrolling or navigation.

**Validation Scenarios**

- Scenario — Visitor activates the scroll cue
  - Success Condition: no scroll or navigation occurs as a direct
    result of that activation.
  - Failure Condition: activating the scroll cue causes the page to
    scroll or navigate.

### Commitment 4 — Device-Class-Appropriate Composition

Relationship to Solution: resolves the Behaviour and Constraint
requiring device-class-appropriate treatment (not a plain reflow).
Resolves the Feature Context's full-device-range constraint.

**Acceptance Criteria**

- AC1: For each device class the visitor's viewport falls into, the
  Hero composition presents a treatment appropriate to that device
  class.
- AC2: The composition on a smaller device class is not an unmodified
  reflow (simple scaling/wrapping) of the layout used on a larger
  device class.

**Validation Scenarios**

- Scenario — Cross-device-class comparison
  - Success Condition: the compositions on two different device classes
    differ in a way that reflects purpose-built treatment for each (the
    concrete treatment itself is Feature UX's decision, not specified
    here).
  - Failure Condition: the smaller device class is simply a
    scaled/reflowed copy of the larger one with no distinct treatment.

---

*Created: 2026-08-26*
