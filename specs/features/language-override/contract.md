# Feature Contract: Language Override

**Status:** Approved

## Contract Commitments

### Commitment 1 — Explicit Selection Sets Override and Navigates

Relationship to Solution: resolves "selecting a language via the control
sets that language as the explicit override, persists it, and navigates
to that language's URL."

**Acceptance Criteria**

- AC1: Selecting a language via the control that differs from the current
  active language results in navigation to that language's URL.
- AC2: After such a selection, the override signal reflects the selected
  language.

**Validation Scenarios**

- Scenario — visitor with active language English selects Spanish via the
  control
  - Success Condition: active language becomes Spanish, URL reflects
    Spanish.
  - Failure Condition: no navigation occurs, or the override signal
    remains English.

### Commitment 2 — Same-Language Selection Is a No-op

Relationship to Solution: resolves "selecting the currently active
language via the control is a no-op."

**Acceptance Criteria**

- AC1: Selecting the currently active language via the control triggers
  no navigation.
- AC2: It does not alter the persisted override state.

**Validation Scenarios**

- Scenario — visitor with override set to Spanish selects Spanish again
  - Success Condition: no navigation occurs; override remains Spanish.
  - Failure Condition: navigation occurs, or the override state changes.

### Commitment 3 — Persisted Override Excludes Direct-URL Arrivals

Relationship to Solution: resolves "landing on any language's URL by
other means... does not set or change the persisted override."

**Acceptance Criteria**

- AC1: Visiting a language's URL directly (not via the control) does not
  create or change a persisted override.
- AC2: An existing persisted override remains unchanged after such a
  direct-URL visit.

**Validation Scenarios**

- Scenario — visitor with no persisted override navigates directly to the
  Spanish URL (e.g. a shared link)
  - Success Condition: no override is persisted afterward.
  - Failure Condition: a subsequent fresh visit is forced into Spanish
    regardless of detected locale.
- Scenario — visitor with persisted override English navigates directly
  to the Euskera URL
  - Success Condition: persisted override remains English afterward.
  - Failure Condition: persisted override becomes Euskera.

### Commitment 4 — Persisted Override Honored on Future Visits

Relationship to Solution: resolves "the persisted override must be
available to `content-localization` prior to its resolution priority
being applied."

**Acceptance Criteria**

- AC1: When a visitor has a persisted override, a subsequent visit
  exposes that language as the override signal before resolution occurs.

**Validation Scenarios**

- Scenario — visitor set override to Euskera on a previous visit; browser
  locale is English; returns on a new visit
  - Success Condition: the override signal available to
    `content-localization` is Euskera.
  - Failure Condition: the signal is absent or reflects the wrong
    language.

### Commitment 5 — Override Persists Without a Revert Path

Relationship to Solution: resolves "no action clears the override back to
automatic detection" and the monotonic constraint.

**Acceptance Criteria**

- AC1: Once set, the override remains in effect on every subsequent visit
  until the visitor explicitly selects a different supported language via
  the control.
- AC2: No control action or state exists that clears the override back to
  automatic detection.

**Validation Scenarios**

- Scenario — visitor sets override to Spanish, then makes several
  separate visits with no further interaction
  - Success Condition: override remains Spanish across all of them, and
    no reset control is present or functional.
  - Failure Condition: override reverts to detection on any visit.

---

*Created: 2026-09-07*
