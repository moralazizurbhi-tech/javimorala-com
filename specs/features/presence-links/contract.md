# Feature Contract: Presence Links

**Status:** Approved

## Contract Commitments

### Commitment 1 — Static, Single-Action External Hand-off (New Tab)

Relationship to Solution: resolves Behaviours ("presented statically and
always visible... no interaction required to reveal", "Activating any
individual link opens that external profile — a single action, no
on-site form, no data collection") and Rules ("single hand-off action,
no in-site confirmation state", "opens in a new browser tab").

**Acceptance Criteria**

- AC1: Each presence link is present and visible in its host placement
  without requiring prior visitor interaction.
- AC2: Activating a presence link opens the corresponding external
  profile as its only effect.
- AC3: The link opens in a new browser tab, leaving the single-page
  experience's current scroll position/state unchanged.
- AC4: No on-site form field or data-collection mechanism is presented
  before, during, or after link activation.
- AC5: No intermediate/confirmation state is rendered in-page between
  activation and hand-off.

**Validation Scenarios**

- Scenario — Standard render (either placement)
  - Success Condition: each presence link is visible without any
    visitor interaction.
  - Failure Condition: a presence link is absent, or requires
    interaction to reveal.
- Scenario — Link activation
  - Success Condition: exactly one external hand-off occurs in a new
    browser tab, with no in-page state change and no data captured.
  - Failure Condition: the current page is replaced/unloaded, an
    on-site form appears, data is captured, or a multi-step/confirmation
    flow is presented.

### Commitment 2 — Consistent Link Set Across Both Placements

Relationship to Solution: resolves the Rule that the same set of profile
links must be used at both placements — no per-placement content
divergence — and the Behaviour that the link set is presented
consistently at both placements.

**Acceptance Criteria**

- AC1: The set of linked profiles (identity and order) is identical
  between the Introduction placement and the Connection placement.
- AC2: No profile link appears at one placement but not the other.

**Validation Scenarios**

- Scenario — Compare both placements at render
  - Success Condition: the Introduction and Connection placements list
    the exact same profiles, in the same order.
  - Failure Condition: the two placements present a different set,
    order, or count of profile links.

### Commitment 3 — Localized Link Labels at Render

Relationship to Solution: resolves the Behaviour that link labels render
in the visitor's active language via `content-localization`.

**Acceptance Criteria**

- AC1: Link labels match the language `content-localization` resolves
  at render time.
- AC2: `presence-links` does not itself decide or override the active
  language.

**Validation Scenarios**

- Scenario — Render with a resolved locale
  - Success Condition: link labels are in the language
    `content-localization` resolved.
  - Failure Condition: labels are in a different language than the one
    resolved.

Excluded from this Commitment, unchanged from Solution: reactive
re-render on a later language change — no commitment or failure
condition applies to that scenario.

### Commitment 4 — Functional Secondary Precedence at Each Placement

Relationship to Solution: resolves the Rule that at each placement,
presence links stay functionally secondary to that placement's own
primary element (Hero's headline/mark/scroll-cue at Introduction; the
CTA at Connection).

**Acceptance Criteria**

- AC1: At the Introduction placement, no presence link is rendered as
  functionally primary over Hero's headline/tagline, mark, or scroll
  cue.
- AC2: At the Connection placement, no presence link is rendered as
  functionally primary over the direct-contact CTA (consistent with
  Direct Contact's own Commitment 4).

**Validation Scenarios**

- Scenario — Standard render, Introduction
  - Success Condition: presence links render as a secondary/minor
    element relative to Hero's own elements.
  - Failure Condition: a presence link is treated as the primary or
    first actionable element of the Introduction screen.
- Scenario — Standard render, Connection
  - Success Condition: presence links render as secondary to the CTA.
  - Failure Condition: a presence link is treated as the primary
    contact element on the Connection screen.

---

*Created: 2026-09-07*
