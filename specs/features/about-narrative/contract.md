# Feature Contract: About Narrative

**Status:** Approved

## Contract Commitments

### Commitment 1 — Composition Completeness

Relationship to Solution: resolves the Behaviour ("complete... composition
... requiring no interaction to access") and Rule ("all three content
pieces... always presented together... none conditionally shown or
hidden... no content piece requires a visitor action... to become
visible"). Resolves the depth-of-identity problem in Feature Context.

**Acceptance Criteria**

- AC1: The rendered composition presents all three content pieces —
  narrative text, photo(s), and the AI-assisted-development note —
  without requiring any visitor interaction.
- AC2: No valid rendered state exists with only a subset of the three
  pieces.

**Validation Scenarios**

- Scenario — Standard render
  - Success Condition: all three pieces are present and visible without
    any visitor interaction.
  - Failure Condition: one or more pieces is missing, or requires an
    interaction (click, hover, expand) to become visible.

### Commitment 2 — AI Note Subordinate Positioning

Relationship to Solution: resolves the Rule that the AI-assisted-
development note "is always positioned after or alongside the narrative
— never before it."

**Acceptance Criteria**

- AC1: The note's position relative to the narrative text is always
  after or alongside it, never preceding it.

**Validation Scenarios**

- Scenario — Rendered composition order
  - Success Condition: the note appears after or alongside the
    narrative text.
  - Failure Condition: the note appears before the narrative text.

### Commitment 3 — Localized Content at Render

Relationship to Solution: resolves the Rule that "content reflects
whatever `content-localization` resolves at render time; this Feature
does not decide language."

**Acceptance Criteria**

- AC1: Narrative text, timeline entries, and the AI note text match the
  language `content-localization` resolves at render time.
- AC2: `about-narrative` does not itself decide or override the active
  language.

**Validation Scenarios**

- Scenario — Render with a resolved locale
  - Success Condition: all text content is in the language
    `content-localization` resolved.
  - Failure Condition: any text content is in a different language than
    the one resolved.

Excluded from this Commitment, unchanged from Solution: reactive
re-render on a later language change — no commitment or failure
condition applies to that scenario.

### Commitment 4 — Static Photo Presentation

Relationship to Solution: resolves the Behaviour that "photos are
presented simultaneously (not toggled, paged, or enlarged on
interaction) if two are used."

**Acceptance Criteria**

- AC1: When two photos are used, both are present in the rendered
  composition simultaneously.
- AC2: No visitor interaction with a photo changes which photo(s) are
  displayed or enlarges them.

**Validation Scenarios**

- Scenario — Visitor interacts with a photo
  - Success Condition: the displayed photo(s) remain unchanged after the
    interaction.
  - Failure Condition: the interaction triggers a toggle, paging, or
    enlargement of the photo.

---

*Created: 2026-09-06*
