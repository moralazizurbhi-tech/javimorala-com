# Feature Contract: Motion & Interaction

**Status:** Approved

## Contract Commitments

### Commitment 1 — About Narrative Progressive Content Reveal

Relationship to Solution: resolves Behaviour 1 (About Narrative Content
Reveal), the one-way reveal Rule, the progressive/direct-nav convergence
Rule, and the Content Piece Reveal state (`Hidden ⇄ Revealed`).

**Acceptance Criteria**

- AC1: A content piece is not shown in its revealed state before the
  visitor's viewport reaches it during scroll.
- AC2: Once a piece has been revealed, it remains visible for the rest of
  the visit, including after the visitor scrolls back up past it.
- AC3: If the visitor arrives at the About Narrative section via direct
  navigation rather than progressive scroll, all content pieces in the
  section are visible immediately upon arrival.

**Validation Scenarios**

- Scenario — visitor scrolls progressively through About Narrative,
  top to bottom
  - Success Condition: each piece becomes visible as the viewport reaches
    it, in order.
  - Failure Condition: a piece is never revealed, or remains invisible
    after being reached.
- Scenario — visitor reveals pieces by scrolling down, then scrolls back
  up past them
  - Success Condition: previously revealed pieces remain visible.
  - Failure Condition: a previously revealed piece becomes hidden again.
- Scenario — visitor jumps to About Narrative via nav link without
  scrolling through it first
  - Success Condition: all content pieces are visible immediately.
  - Failure Condition: any piece remains hidden, waiting for in-section
    scroll.

### Commitment 2 — Hero First-Load Entrance, Once Per Visit

Relationship to Solution: resolves Behaviour 2 (Hero First-Load
Entrance), the Hero First-Load Entrance state (`Not yet played ⇄
Played`), and the Rule that the sequence plays at most once per visit.

**Acceptance Criteria**

- AC1: On the visit's true first load, the Hero's elements do not all
  appear simultaneously — they enter in a defined sequence.
- AC2: Any subsequent arrival at the Hero via in-page navigation within
  the same visit shows the Hero's complete state directly, without
  repeating the entrance sequence.

**Validation Scenarios**

- Scenario — visitor loads the site for the first time this visit
  - Success Condition: Hero elements appear sequenced, not
    simultaneously.
  - Failure Condition: all elements appear at once, or no sequencing
    occurs.
- Scenario — visitor scrolls away from Hero then returns to it via nav
  within the same visit
  - Success Condition: Hero's complete state shown immediately, no
    sequence replay.
  - Failure Condition: the entrance sequence replays.

### Commitment 3 — Nav Identity Transition on Scroll

Relationship to Solution: resolves Behaviour 3 (Nav Identity Transition),
the Nav Identity state (`Hero-context ⇄ Post-Hero`), and the Rule that
nav identity depends on scroll position alone.

**Acceptance Criteria**

- AC1: While the visitor's scroll position is within the Hero/
  Introduction screen, the nav is in its Hero-context presentation.
- AC2: Once scroll position crosses past the Hero/Introduction screen,
  the nav transitions to its post-Hero presentation.
- AC3: Scrolling back up past that same boundary transitions the nav back
  to its Hero-context presentation.
- AC4: This transition occurs regardless of whether the boundary crossing
  happened via free scroll or a nav-link jump.

**Validation Scenarios**

- Scenario — visitor scrolls from Introduction into Personal Narrative
  - Success Condition: nav transitions from Hero-context to post-Hero
    presentation as the boundary is crossed.
  - Failure Condition: nav presentation does not change, or changes at
    the wrong point.
- Scenario — visitor scrolls back up from Personal Narrative into
  Introduction
  - Success Condition: nav transitions back to Hero-context presentation.
  - Failure Condition: nav remains in post-Hero presentation while within
    Introduction.
- Scenario — visitor jumps directly to Connection via nav link from
  Introduction
  - Success Condition: nav ends in post-Hero presentation.
  - Failure Condition: nav remains in Hero-context presentation.

### Commitment 4 — Merged Active/Progress Indicator Transition

Relationship to Solution: resolves Behaviour 4 (Merged Active/Progress
Indicator), the Active/Progress Indicator state, and the Rule that its
components always reflect actual scroll position.

**Acceptance Criteria**

- AC1: The indicator reflects exactly one of {Introduction, Personal
  Narrative, Connection} as active at all times, consistent with Section
  Navigation's existing Active Screen Indicator commitment.
- AC2: The indicator also expresses the visitor's overall progress
  through the page (a graduated component), not only the active screen.
- AC3: When the active screen changes (by scroll or nav-link activation),
  the indicator's transition from the previous state to the new one is a
  discrete, observable transition — not an instantaneous value
  replacement.

**Validation Scenarios**

- Scenario — visitor free-scrolls from Introduction through Personal
  Narrative to Connection
  - Success Condition: the active component updates at each screen
    boundary and the progress component increases monotonically with
    scroll position.
  - Failure Condition: the active component fails to update at a
    boundary, or the progress component does not track scroll position.
- Scenario — visitor activates a nav link to jump to a non-adjacent
  screen (e.g. Introduction → Connection)
  - Success Condition: the indicator transitions to reflect Connection as
    active and progress updates to match the new position.
  - Failure Condition: the indicator jumps with no observable transition,
    or fails to update.

### Commitment 5 — Direct Contact CTA Distinct Interaction Feedback

Relationship to Solution: resolves Behaviour 5 (Direct Contact CTA
Feedback).

**Acceptance Criteria**

- AC1: Hovering the Direct Contact CTA (desktop/pointer input) produces
  feedback beyond a basic color or scale change alone.
- AC2: The feedback does not alter the CTA's destination or function —
  it still resolves via the same external channel per Direct Contact's
  own contract.

**Validation Scenarios**

- Scenario — desktop visitor hovers the CTA
  - Success Condition: a feedback treatment beyond a plain color/scale
    change is observable.
  - Failure Condition: no feedback occurs, or only a basic color/scale
    change occurs.

### Commitment 6 — Touch-Equivalent Feedback for Hover-Based Interactions

Relationship to Solution: resolves Behaviour 6 (Touch-Input Equivalent
Feedback) and the Rule that every hover feedback has a defined touch
equivalent.

**Acceptance Criteria**

- AC1: For every interactive element with a defined hover-based feedback
  (including the Direct Contact CTA, the nav links, Presence Links, and
  the Language Switcher's trigger and options), an equivalent,
  functionally defined feedback occurs on touch/tap interaction with that
  element.
- AC2: Touch interaction does not leave any such element without any
  interaction feedback at all.

**Validation Scenarios**

- Scenario — touch-device visitor taps the Direct Contact CTA
  - Success Condition: a defined feedback occurs, functionally
    equivalent in purpose to the hover feedback.
  - Failure Condition: no feedback occurs on tap.

### Commitment 7 — Nav Link Hover/Focus Feedback

Relationship to Solution: resolves Behaviour 7 (Nav Link Hover/Focus
Feedback), extending Section Navigation's own contract without altering
its destination behavior.

**Acceptance Criteria**

- AC1: Hovering (pointer) or focusing (keyboard) a nav link ("about" or
  "contact") produces feedback that observably distinguishes it from its
  rest state.
- AC2: The feedback does not alter the link's destination or function —
  it still resolves via the same anchor-jump behavior defined by Section
  Navigation's own contract.

**Validation Scenarios**

- Scenario — desktop visitor hovers a nav link
  - Success Condition: an observable feedback treatment distinguishes it
    from rest state.
  - Failure Condition: no feedback occurs, or the link's destination
    changes.
- Scenario — keyboard visitor tabs focus onto a nav link
  - Success Condition: the same feedback treatment is observable on
    focus.
  - Failure Condition: no feedback occurs on focus.

### Commitment 8 — Presence Link Hover/Focus Feedback

Relationship to Solution: resolves Behaviour 8 (Presence Link Hover/Focus
Feedback), extending Presence Links' own contract without altering its
destination or new-tab behavior.

**Acceptance Criteria**

- AC1: Hovering or focusing a Presence Link, at either placement
  (Introduction glimpse, Connection group), produces feedback that
  observably distinguishes it from its rest state.
- AC2: The feedback is the same treatment at both placements — one
  system, not two independently defined treatments.
- AC3: The feedback does not alter the link's destination or new-tab
  behavior — Presence Links' own contract commitments are unchanged.

**Validation Scenarios**

- Scenario — visitor hovers a Presence Link at the Introduction placement
  - Success Condition: an observable feedback treatment distinguishes it
    from rest state.
  - Failure Condition: no feedback occurs.
- Scenario — visitor hovers a Presence Link at the Connection placement
  - Success Condition: the same feedback treatment as the Introduction
    placement is observable.
  - Failure Condition: no feedback occurs, or a visibly different
    treatment is used.

### Commitment 9 — Language Switcher Interaction Feedback

Relationship to Solution: resolves Behaviour 9 (Language Switcher
Interaction Feedback), extending Language Override's own contract without
altering its selection, persistence, or no-op behavior.

**Acceptance Criteria**

- AC1: Opening the Language Switcher's dropdown is an observable,
  discrete transition, not an instantaneous show.
- AC2: Closing the dropdown (on selection or dismissal) is an observable,
  discrete transition, not an instantaneous hide.
- AC3: Hovering or focusing the trigger, and hovering or focusing each
  option in the open list, produces feedback that observably
  distinguishes it from its rest state.
- AC4: None of this alters Language Override's own functional behavior —
  selection, persistence, and the same-language no-op remain exactly as
  defined by its own contract.

**Validation Scenarios**

- Scenario — visitor activates the Language Switcher trigger
  - Success Condition: the dropdown's open transition is an observable,
    discrete change, and the trigger shows hover/focus feedback beforehand.
  - Failure Condition: the dropdown appears instantly with no transition.
- Scenario — visitor hovers or focuses an option in the open dropdown
  - Success Condition: an observable feedback treatment distinguishes it
    from rest state.
  - Failure Condition: no feedback occurs.
- Scenario — visitor selects an option, closing the dropdown
  - Success Condition: the close transition is an observable, discrete
    change; Language Override's own selection/persistence behavior is
    unaffected.
  - Failure Condition: the dropdown disappears instantly, or selection
    behavior changes.

### Commitment 10 — Reduced-Motion Functional Equivalence

Relationship to Solution: resolves Behaviour 10 (Reduced-Motion
Equivalence), the Rule that reduced motion never blocks reaching a
functional end-state, and the inherited firm invariant that a
reduced-motion fallback is mandatory.

**Acceptance Criteria**

- AC1: When the visitor's reduced-motion preference is active, About
  Narrative's content pieces still reach their fully-visible end-state
  (Commitment 1's end-state), without relying on animated motion.
- AC2: When active, the Hero reaches its complete, fully-composed
  end-state on first load, without relying on animated entrance
  sequencing.
- AC3: When active, the nav still reaches the correct Hero-context or
  post-Hero presentation for the current scroll position (Commitment 3's
  end-states), without relying on an animated transition.
- AC4: When active, the Active/Progress Indicator still reaches the
  correct active-screen and progress values (Commitment 4's end-states),
  without relying on an animated transition.
- AC5: When active, the Direct Contact CTA's and touch-equivalent
  feedback (Commitments 5, 6) still functionally register interaction,
  without relying on animated motion as the sole cue.
- AC6: When active, the nav links', Presence Links', and Language
  Switcher's hover/focus feedback (Commitments 7, 8, 9) still
  functionally register interaction, and the dropdown still reaches its
  correct open/closed state, without relying on animated motion as the
  sole cue.

**Validation Scenarios**

- Scenario — visitor with reduced-motion preference active loads the site
  and navigates through it as in Commitments 1–9's scenarios
  - Success Condition: every end-state in Commitments 1–9 is still
    reached.
  - Failure Condition: any end-state requires animated motion to be
    reached, or is unreachable without it.

---

*Created: 2026-09-07*
