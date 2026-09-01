# Feature Contract: Language Override

## Contract Commitments

### Commitment 1 — Two-Language Selection Availability

Relationship to Solution: resolves the "control always offers exactly two
supported languages" Behaviour; resolves the Context's core need for an
explicit way to switch language.

**Acceptance Criteria**

- AC1: The control exposes exactly two language options — English and
  Spanish — at all times.
- AC2: Both options remain available/selectable regardless of which one
  is currently active.

**Validation Scenarios**

- Scenario — Inspect the control in any state
  - Success Condition: exactly English and Spanish are offered, both
    selectable.
  - Failure Condition: fewer or more options are offered, or one option
    is unavailable.

### Commitment 2 — Active-State Indication

Relationship to Solution: resolves the "control always indicates which
language is currently active" Behaviour and the indicator-consistency
Constraint.

**Acceptance Criteria**

- AC1: At any time, the control indicates exactly one of the two
  languages as currently active.
- AC2: The indicated active language always matches the language the
  site's content is actually rendered in.

**Validation Scenarios**

- Scenario A — Content rendered in English
  - Success Condition: control indicates English as active.
  - Failure Condition: control indicates Spanish, or indicates
    neither/both.
- Scenario B — After switching to Spanish
  - Success Condition: control indicates Spanish as active.
  - Failure Condition: control still indicates English, or indicates
    neither/both.

### Commitment 3 — Immediate In-Place Language Switch

Relationship to Solution: resolves "selecting the other language updates
content immediately in place — no reload/navigation" Behaviour/Rule/
Constraint.

**Acceptance Criteria**

- AC1: Selecting the non-active language changes the site's displayed
  content to that language.
- AC2: The change occurs without a full page reload or navigation away
  from the current page.

**Validation Scenarios**

- Scenario — Visitor selects the non-active language
  - Success Condition: content switches to the selected language; no
    reload/navigation occurs.
  - Failure Condition: content doesn't change, or a reload/navigation
    occurs.

### Commitment 4 — No-Op on Re-Selecting the Active Language

Relationship to Solution: resolves "selecting the already-active language
is a no-op" Rule.

**Acceptance Criteria**

- AC1: Selecting the currently active language produces no change to
  displayed content.

**Validation Scenarios**

- Scenario — Visitor selects the already-active language
  - Success Condition: no observable change occurs.
  - Failure Condition: content re-renders or otherwise behaves as if a
    switch occurred.

### Commitment 5 — Persisted Override Across Visits

Relationship to Solution: resolves "choice is remembered and takes
priority over auto-detection on future visits" Behaviour/Rule; resolves
the Context's "remembered across visits" scope item.

**Acceptance Criteria**

- AC1: After a visitor selects a language, a subsequent visit renders
  content in that same language, regardless of what auto-detection would
  otherwise select.
- AC2: This priority holds until the visitor explicitly selects a
  different language.

**Validation Scenarios**

- Scenario A — Visitor selects Spanish, then revisits with a browser
  locale that would auto-detect English
  - Success Condition: site loads in Spanish.
  - Failure Condition: site loads in English, ignoring the remembered
    override.
- Scenario B — Visitor selects Spanish, then later selects English, then
  revisits
  - Success Condition: site loads in English.
  - Failure Condition: site loads in Spanish or reverts to
    auto-detection.

---

*Created: 2026-09-01*
