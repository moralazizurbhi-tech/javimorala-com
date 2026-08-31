# Feature Contract: Section Navigation

## Contract Commitments

### Commitment 1 — Destination Resolution Correctness

Relationship to Solution: resolves the three-destinations Behaviour and
the "every destination always resolves to the same one target section"
Rule. Resolves the Context's core wayfinding need.

**Acceptance Criteria**

- AC1: The nav exposes exactly three destinations — Home (Hero), About,
  Contact.
- AC2: Activating a destination scroll-anchors to its corresponding
  section.
- AC3: Each destination resolves to the same single target section every
  time, regardless of visitor state or session.

**Validation Scenarios**

- Scenario A — Standard activation of each destination
  - Success Condition: activating Home/About/Contact anchors to
    Hero/About/Contact respectively.
  - Failure Condition: activation anchors to the wrong section or has no
    effect.
- Scenario B — Repeated activation
  - Success Condition: a destination's target is stable across repeated
    activations and sessions.
  - Failure Condition: the target varies.

### Commitment 2 — Persistent Availability

Relationship to Solution: resolves the "available regardless of current
scroll position" Behaviour.

**Acceptance Criteria**

- AC1: The nav (inline destinations, or the trigger on mobile) remains
  accessible from any scroll position on the page.
- AC2: Scrolling away from the top does not remove or disable it.

**Validation Scenarios**

- Scenario — Visitor scrolls to top/middle/bottom
  - Success Condition: the nav/trigger is accessible at every scroll
    position.
  - Failure Condition: the nav/trigger disappears or becomes inaccessible
    at some scroll position.

### Commitment 3 — Mutually Exclusive Presentation Forms

Relationship to Solution: resolves the "exactly one presentation form
active — never both, never neither" Rule and Constraint.

**Acceptance Criteria**

- AC1: At a given viewport, exactly one of the two forms (inline
  destinations, or trigger+overlay) is presented.
- AC2: The overlay-only destinations are never simultaneously shown
  inline on the same viewport, and vice versa.

**Validation Scenarios**

- Scenario A — Desktop-class viewport
  - Success Condition: inline destinations are shown; no separate
    trigger/overlay form is present.
  - Failure Condition: both forms are shown, or neither.
- Scenario B — Mobile-class viewport
  - Success Condition: the trigger is shown; destinations are reachable
    only via the overlay.
  - Failure Condition: destinations are also shown inline, or there is no
    way to reach the nav at all.

### Commitment 4 — Overlay Selection Behavior

Relationship to Solution: resolves the Closed/Open States and Transitions
and the "selection performs anchor + close together; dismissal never
anchors" Rules.

**Acceptance Criteria**

- AC1: Activating the trigger while Closed transitions the overlay to
  Open, showing all three destinations.
- AC2: Selecting a destination while Open scroll-anchors to that section
  AND transitions the overlay to Closed, as one action.
- AC3: Dismissing the overlay without selecting transitions it to Closed
  without any scroll-anchoring.

**Validation Scenarios**

- Scenario A — Trigger activation
  - Success Condition: the overlay opens with all three destinations
    visible.
  - Failure Condition: it doesn't open, or opens incomplete.
- Scenario B — Destination selection
  - Success Condition: anchor and close happen together.
  - Failure Condition: one happens without the other, or neither happens.
- Scenario C — Dismissal without selection
  - Success Condition: the overlay closes, scroll position unchanged.
  - Failure Condition: the overlay stays open, or scroll position changes
    anyway.

### Commitment 5 — Non-Interference with Free Scroll

Relationship to Solution: resolves the "nav never disables, intercepts, or
interferes with free scroll" Rule and the free-scroll-validity Boundary.

**Acceptance Criteria**

- AC1: In every nav state (inline, overlay Open, overlay Closed), free
  scrolling remains fully functional and reaches every section.
- AC2: No nav state blocks, captures, or redirects scroll input intended
  as free scroll.

**Validation Scenarios**

- Scenario — Visitor free-scrolls the entire page without touching the nav
  - Success Condition: every section is reached via scroll alone,
    unimpeded.
  - Failure Condition: scroll is blocked, captured, or redirected by the
    nav in any state.

---

*Created: 2026-08-31*
