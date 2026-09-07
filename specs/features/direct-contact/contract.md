# Feature Contract: Direct Contact

**Status:** Approved

## Contract Commitments

### Commitment 1 — CTA Static, Single-Action Mailto Hand-off

Relationship to Solution: resolves the Behaviours ("CTA... always
visible; no interaction required to reveal it", "Activating the CTA
opens a `mailto:` link... single action, no on-site form, no data
collection") and the Rules/States (single hand-off action, no in-page
confirmation state). Resolves Feature Context's "no way to actually
reach out" problem and its "no on-site form/data collection" constraint.

**Acceptance Criteria**

- AC1: The CTA element is present and visible in the rendered Connection
  screen without requiring any prior visitor interaction.
- AC2: Activating the CTA opens a `mailto:` link as its only effect.
- AC3: No on-site form field or data-collection mechanism is presented
  at any point before, during, or after CTA activation.
- AC4: No intermediate/confirmation state is rendered in-page between
  CTA activation and the hand-off.

**Validation Scenarios**

- Scenario — Standard render
  - Success Condition: the CTA is visible without any visitor
    interaction.
  - Failure Condition: the CTA is absent, or requires interaction to
    reveal.
- Scenario — CTA activation
  - Success Condition: exactly one `mailto:` hand-off occurs, with no
    in-page state change.
  - Failure Condition: an on-site form appears, data is captured, or a
    multi-step/confirmation flow is presented.

### Commitment 2 — Anti-Scraping Email Protection

Relationship to Solution: resolves the Rule that the email address must
never appear as plain, directly-crawlable text or a literal `mailto:`
href in static HTML source, and the Solution's anti-scraping Constraint.

**Acceptance Criteria**

- AC1: The static HTML source delivered does not contain the email
  address as plain text.
- AC2: The static HTML source does not contain a literal
  `mailto:<address>` href exposing the full address in directly-
  parseable form.

**Validation Scenarios**

- Scenario — Inspect static page source
  - Success Condition: no plain-text email address and no directly-
    parseable `mailto:` href are present in the raw static HTML.
  - Failure Condition: the email address appears as plain text, or as a
    directly-parseable `mailto:` href, in the static source.
- Scenario — CTA activated by a real visitor
  - Success Condition: the hand-off still resolves to the correct,
    working address for a human visitor.
  - Failure Condition: activation does not resolve to a working
    `mailto:` link.

### Commitment 3 — Localized CTA and Farewell Content at Render

Relationship to Solution: resolves the Behaviour that CTA copy and the
farewell line render in the visitor's active language via
`content-localization`.

**Acceptance Criteria**

- AC1: CTA copy and farewell-line text match the language
  `content-localization` resolves at render time.
- AC2: `direct-contact` does not itself decide or override the active
  language.

**Validation Scenarios**

- Scenario — Render with a resolved locale
  - Success Condition: both CTA copy and farewell-line text are in the
    language `content-localization` resolved.
  - Failure Condition: either text is in a different language than the
    one resolved.

Excluded from this Commitment, unchanged from Solution: reactive
re-render on a later language change — no commitment or failure
condition applies to that scenario.

### Commitment 4 — CTA Functional Precedence over Presence Links

Relationship to Solution: resolves the Rule that the CTA functionally
takes precedence over Presence Links, as the first/most prominent
actionable element.

**Acceptance Criteria**

- AC1: In the composed Connection screen, the CTA is structurally the
  first actionable contact element, appearing before any Presence Link
  in composition order.
- AC2: No rendered state presents a Presence Link as functionally
  primary over the CTA.

**Validation Scenarios**

- Scenario — Standard render
  - Success Condition: the CTA precedes Presence Links in composition
    order and is not superseded in prominence by any Presence Link.
  - Failure Condition: a Presence Link appears before the CTA, or is
    treated as the primary contact element.

### Commitment 5 — Farewell Line Static Presentation

Relationship to Solution: resolves the Rule that the farewell line is
presented statically, with no interactive behavior of its own.

**Acceptance Criteria**

- AC1: The farewell line renders as static content requiring no visitor
  interaction to appear.
- AC2: No visitor interaction with the farewell line triggers any
  change in the page.

**Validation Scenarios**

- Scenario — Visitor interacts with the farewell line
  - Success Condition: no state change occurs.
  - Failure Condition: any interactive behavior (e.g. a click handler
    or toggle) is triggered.

---

*Created: 2026-09-07*
