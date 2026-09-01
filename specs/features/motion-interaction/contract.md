# Feature Contract: Motion & Interaction

## Contract Commitments

### Commitment 1 — Two-Category Motion Classification

Relationship to Solution: resolves Rule R1 (every animatable moment
resolves to exactly one of the two categories) and Behaviour 1.

**Acceptance Criteria**

- AC1: Any given animated moment observably exhibits either the bold
  Section/Page-level treatment or the restrained Micro-interaction
  treatment — never a treatment that reads as neither, and never one that
  reads as an undefined third category.

**Validation Scenarios**

- Scenario — Inspect any animated moment across the six consuming features
  (section entry, nav overlay, interactive-element feedback)
  - Success Condition: it reads unambiguously as one of the two
    treatments.
  - Failure Condition: it reads as neither treatment, or as an
    inconsistent/undefined third category.

### Commitment 2 — One-Time Section Entry Motion

Relationship to Solution: resolves Rule R2 and Behaviour 2 (section entry
motion plays once per visit, no replay on re-entry).

**Acceptance Criteria**

- AC1: The first time a section enters the viewport during a visit
  (including if already visible at page load), its bold entry motion
  plays.
- AC2: Any subsequent re-entry of that same section into the viewport
  during the same visit does not replay the entry motion.

**Validation Scenarios**

- Scenario A — First entry: visitor scrolls a section into view for the
  first time this visit
  - Success Condition: bold entry motion plays.
  - Failure Condition: no motion plays.
- Scenario B — Re-entry: visitor scrolls the section out of view then back
  into view again in the same visit
  - Success Condition: no entry motion replay occurs.
  - Failure Condition: entry motion plays again.

### Commitment 3 — Persistent Micro-Interaction Feedback

Relationship to Solution: resolves Rule R4 and Behaviour 3 (micro-
interaction feedback has no once-per-visit suppression).

**Acceptance Criteria**

- AC1: Every qualifying interaction (hover/focus/press/activate) on an
  interactive element produces restrained motion feedback.
- AC2: This feedback occurs every time the interaction happens, without
  suppression after the first occurrence.

**Validation Scenarios**

- Scenario A — First interaction: visitor interacts with an element for
  the first time
  - Success Condition: restrained feedback plays.
  - Failure Condition: no feedback plays.
- Scenario B — Repeated interaction: visitor interacts with the same
  element multiple times in one visit
  - Success Condition: feedback plays every time.
  - Failure Condition: feedback stops after the first occurrence.

### Commitment 4 — Nav Overlay Transition on Every Occurrence

Relationship to Solution: resolves Rule R3 and Behaviour 4 (the nav
overlay's bold transition is exempt from once-per-visit suppression).

**Acceptance Criteria**

- AC1: Opening the mobile nav overlay plays the bold Section/Page-level
  transition.
- AC2: Closing the mobile nav overlay plays the bold Section/Page-level
  transition.
- AC3: This holds on every occurrence of opening or closing within a
  visit, not only the first.

**Validation Scenarios**

- Scenario A — First open/close: visitor opens then closes the overlay for
  the first time this visit
  - Success Condition: bold transition plays for both the open and the
    close.
  - Failure Condition: the transition is missing, or reads as restrained
    rather than bold.
- Scenario B — Repeated open/close within the same visit
  - Success Condition: bold transition plays on every occurrence.
  - Failure Condition: the transition stops appearing after the first
    open/close cycle.

### Commitment 5 — Intensity Contrast Between Categories

Relationship to Solution: resolves Rule R5 (Section/Page-level treatment
is always bolder/more assertive than Micro-interaction treatment).

**Acceptance Criteria**

- AC1: Section/Page-level motion is observably bolder/more assertive than
  Micro-interaction motion at all times.
- AC2: No animated moment inverts this contrast.

**Validation Scenarios**

- Scenario — Compare any Section/Page-level moment against any
  Micro-interaction moment
  - Success Condition: a clear, consistent intensity contrast holds.
  - Failure Condition: the intensities are equal or inverted.

### Commitment 6 — One-Time Reduced-Motion Resolution

Relationship to Solution: resolves Rule R6 and Behaviour 5 (reduced-motion
preference resolved once at load, fixed for the visit).

**Acceptance Criteria**

- AC1: The visitor's reduced-motion preference, as set at the moment the
  page loads, determines Motion Mode for that entire visit.
- AC2: A change to that system-level preference occurring after load does
  not alter Motion Mode until the visitor reloads the page.

**Validation Scenarios**

- Scenario A — Preference set to reduced before load
  - Success Condition: Reduced Motion Mode is active for the whole visit.
  - Failure Condition: Standard Mode is used, or the mode changes mid-visit
    without a reload.
- Scenario B — Preference changed mid-visit, no reload
  - Success Condition: Motion Mode remains whatever was resolved at load.
  - Failure Condition: Motion Mode changes without a reload.

### Commitment 7 — Functional Equivalence Under Reduced Motion

Relationship to Solution: resolves Rule R7 and Behaviour 6 (Reduced Motion
Mode still delivers the same functional outcomes).

**Acceptance Criteria**

- AC1: In Reduced Motion Mode, every functional outcome that Standard
  Mode's motion would have produced (content becoming visible/
  interactive, feedback being perceptible, overlay opening/closing) still
  occurs, using minimized or no motion.

**Validation Scenarios**

- Scenario — Reduced Motion Mode active; visitor performs a section entry,
  a micro-interaction, and a nav overlay toggle
  - Success Condition: each produces its expected functional outcome
    without requiring the bold/restrained motion itself.
  - Failure Condition: any outcome fails to occur, or is only achievable
    via the suppressed motion.

### Commitment 8 — Visitor Retains Scroll Control at All Times

Relationship to Solution: resolves Rule R8, the hard invariant carried
from Feature Context/Definition.

**Acceptance Criteria**

- AC1: No motion behavior, in either Motion Mode, changes scroll position
  except as a direct result of the visitor's own scrolling or an explicit
  nav/anchor activation.
- AC2: No motion behavior delays, locks, or force-snaps the scroll
  position beyond the visitor's own input.

**Validation Scenarios**

- Scenario — Visitor scrolls freely through the page while section-entry
  and micro-interaction motions are triggering
  - Success Condition: scroll position and speed reflect only the
    visitor's own input at every moment.
  - Failure Condition: scroll position jumps, pauses, or snaps in a way
    not directly caused by the visitor's own scrolling/nav action.

---

*Created: 2026-09-01*
