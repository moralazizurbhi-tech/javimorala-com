# Feature Contract: Accessibility

**Status:** Approved

## Contract Commitments

### Commitment 1 — Keyboard Operability Across Every Feature

Relationship to Solution: resolves Behaviour 1 (Keyboard Operability
Guarantee), the Rule that no interactive element may be reachable by
pointer/touch only, and the Rule that tab order must follow visual/
reading order.

**Acceptance Criteria**

- AC1: Every interactive element across every Feature can be reached via
  Tab/Shift+Tab and activated via keyboard (Enter/Space, or arrow keys
  for a defined composite control such as a menu).
- AC2: Tab order follows each element's visual/reading order on the
  page.

**Validation Scenarios**

- Scenario — visitor navigates the entire single-page experience using
  only the keyboard, from the persistent nav's language switcher through
  the mobile overlay toggle to the Direct Contact CTA and Presence
  Links.
  - Success Condition: every interactive element is reached and
    operable, in visual order.
  - Failure Condition: any interactive element is skipped, unreachable,
    or reached out of visual order.

### Commitment 2 — Visible Focus Indicator on Every Interactive Element

Relationship to Solution: resolves Behaviour 2 (Visible Focus Indicator
Guarantee) and the Rule that focus indicators must remain visible
against every background they appear on.

**Acceptance Criteria**

- AC1: When an interactive element receives keyboard focus, a focus
  indicator becomes visible and is perceivably distinguishable from that
  same element's non-focused and hover states.
- AC2: The focus indicator remains perceivable regardless of which
  background (near-black base or a vivid gradient-accent area) the
  element appears against.

**Validation Scenarios**

- Scenario — visitor tabs to an interactive element positioned against
  the near-black base.
  - Success Condition: a visible, distinguishable focus indicator
    appears.
  - Failure Condition: no visible change occurs, or the change is
    indistinguishable from hover.
- Scenario — visitor tabs to an interactive element positioned against a
  gradient-accent area.
  - Success Condition: the focus indicator remains visible and
    distinguishable.
  - Failure Condition: the indicator is not perceivable against that
    background.

### Commitment 3 — Sufficient Contrast Across Text and Meaningful UI

Relationship to Solution: resolves Behaviour 3 (Sufficient Contrast
Guarantee) and the WCAG 2.1 Level AA target conformance level confirmed
in Feature Context.

**Acceptance Criteria**

- AC1: All text meets a contrast ratio of at least 4.5:1 against its
  background (at least 3:1 for large-scale text), in each of English,
  Spanish, and Euskera content.
- AC2: Every meaningful non-text UI element, including focus indicators,
  meets a contrast ratio of at least 3:1 against its adjacent
  background.

**Validation Scenarios**

- Scenario — contrast of body text and headline text is measured
  against the near-black base, in each of English, Spanish, and Euskera
  content.
  - Success Condition: every measurement meets or exceeds the
    applicable ratio.
  - Failure Condition: any measurement falls below it.
- Scenario — contrast of a focus indicator and of an icon-only control
  (e.g. mobile nav toggle) is measured against its background.
  - Success Condition: meets or exceeds 3:1.
  - Failure Condition: falls below it.

### Commitment 4 — Assistive-Technology Compatibility

Relationship to Solution: resolves Behaviour 4 (Assistive-Technology
Compatibility Guarantee), the Rule that elements defined as
non-interactive must never expose an interactive AT affordance, and the
Rule that meaningful images/icons have accessible text alternatives
while decorative elements are hidden from AT.

**Acceptance Criteria**

- AC1: Every meaningful element exposes an accessible name, role, and,
  where applicable, state to assistive technology.
- AC2: Heading and landmark structure, as exposed to assistive
  technology, reflects the page's actual content organization.
- AC3: An element a Feature defines as non-interactive (e.g. Hero's
  scroll cue) is not exposed to assistive technology as a focusable or
  actionable control.
- AC4: Purely decorative visual elements are hidden from assistive
  technology; meaningful images/icons expose an accessible text
  alternative describing their meaning.

**Validation Scenarios**

- Scenario — a screen-reader user navigates by heading and landmark.
  - Success Condition: the structure encountered matches the page's
    actual Introduction/Personal Narrative/Connection organization.
  - Failure Condition: headings/landmarks are missing, out of order, or
    don't reflect actual structure.
- Scenario — a screen-reader user reaches the Hero's scroll cue.
  - Success Condition: it is not announced as an interactive/focusable
    control.
  - Failure Condition: it is exposed as a button/link or otherwise
    focusable.
- Scenario — a screen-reader user reaches Presence Links or the Direct
  Contact CTA.
  - Success Condition: each exposes an accessible name identifying its
    destination/purpose.
  - Failure Condition: an element is announced with no identifiable name
    or purpose.

### Commitment 5 — Section Navigation Current-State Exposed to Assistive Technology

Relationship to Solution: resolves Behaviour 5 (Section Navigation
Accessible Current-State Behaviour) — closes Feature Context Gap 1.

**Acceptance Criteria**

- AC1: At any time, assistive technology can determine which section/
  screen the nav currently indicates as active.
- AC2: The nav's structure (its set of links) is exposed to assistive
  technology as a navigable list/landmark, not as unstructured content.

**Validation Scenarios**

- Scenario — visitor scrolls into Connection; a screen-reader user then
  inspects the nav.
  - Success Condition: the nav communicates Connection as the current
    section.
  - Failure Condition: no current-section information is exposed, or it
    doesn't match actual scroll position.

### Commitment 6 — Document Language Always Matches Active Language

Relationship to Solution: resolves Behaviour 6 (Correct Document
Language Behaviour) — closes Feature Context Gap 2.

**Acceptance Criteria**

- AC1: The document's language attribute matches the visitor's currently
  active resolved language (English, Spanish, or Euskera) at all times,
  including immediately after a Language Override change.

**Validation Scenarios**

- Scenario — visitor loads the site in each of the three supported
  languages (via detection or override) and inspects the document
  language.
  - Success Condition: the attribute matches the active language in
    every case.
  - Failure Condition: any mismatch is observed.
- Scenario — visitor switches language via Language Override mid-visit.
  - Success Condition: the document language updates to match the newly
    active language.
  - Failure Condition: it remains on the previous language or is left
    unset.

---

Note: Solution Behaviour 7 (Verification Behaviour) introduces no
independent observable commitment of its own — it is realized by
Commitments 1–6 above applying across all seven dependent Features.

---

*Created: 2026-09-07*
