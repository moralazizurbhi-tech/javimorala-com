# Feature Contract: About Narrative

## Contract Commitments

### Commitment 1 — Hook-Then-Body Sequencing & Inseparability

Relationship to Solution: resolves the Rule "intro hook always precedes
the bio content... never presented independently or reachable through
separate access points" and the Behaviour describing the hook-then-body
order. Resolves the Feature Context's problem — the visitor needs the
full narrative to build trust.

**Acceptance Criteria**

- AC1: In every presentation of the About view, the intro hook appears
  before the bio content in reading order.
- AC2: No entry point delivers the bio content without the intro hook
  also present in the same narrative.
- AC3: No entry point delivers the intro hook without the bio content
  also present in the same narrative.

**Validation Scenarios**

- Scenario A — Entry via nav "about" link / mobile overlay selection
  - Success Condition: the presented narrative includes the intro hook
    positioned before the bio content.
  - Failure Condition: entry delivers bio content without the hook, or
    delivers them out of order.
- Scenario B — Entry via free scroll from Hero
  - Success Condition: the visitor encounters the hook before the bio
    content while scrolling.
  - Failure Condition: bio content is encountered before, or
    independently of, the hook.

### Commitment 2 — Dual-Dimension Coverage in the Bio Content

Relationship to Solution: resolves the Rule "bio content must address
both professional and personal identity... presenting only one
dimension... does not satisfy" and the Constraint that both dimensions
must carry genuine weight, never organized into separate labeled
sections. Resolves the Context's professional+personal credibility
problem.

**Acceptance Criteria**

- AC1: The bio content includes substantive material addressing Javi's
  professional identity.
- AC2: The bio content includes substantive material addressing Javi's
  personal identity.
- AC3: Neither dimension is reduced to a token/passing mention while the
  other receives extended treatment.
- AC4: The two dimensions are not organized into separate, independently
  labeled or navigable sections.

**Validation Scenarios**

- Scenario — Reviewing the rendered bio content
  - Success Condition: both dimensions present, woven together, each
    with genuine substance.
  - Failure Condition: one dimension absent/token, or split into labeled
    sections.

### Commitment 3 — Hook/Body Functional Asymmetry

Relationship to Solution: resolves the Rule that the hook must stay
functionally distinguishable from the body ("if it carried equivalent
depth... the distinction would collapse") and the matching Constraint.

**Acceptance Criteria**

- AC1: The intro hook alone does not satisfy Commitment 2's
  dual-dimension coverage.
- AC2: The substantiating depth required by Commitment 2 is carried by
  the bio content, not the hook.

**Validation Scenarios**

- Scenario — Isolating the hook from the body
  - Success Condition: the hook alone does not fully cover both
    dimensions with genuine weight; that coverage completes only with
    the bio content included.
  - Failure Condition: the hook alone already satisfies dual-dimension
    coverage.

### Commitment 4 — No Portfolio Framing, No Contact Call-to-Action

Relationship to Solution: resolves the Rules "must not read as a
portfolio/work-listing" and "responsibility ends at building
credibility/connection... must not include or function as a contact
call-to-action." Resolves the Context's "no portfolio-showcase
capability" constraint.

**Acceptance Criteria**

- AC1: The narrative does not present a listing/catalog of projects or
  work items.
- AC2: The narrative does not include a call-to-action or prompt
  directing the visitor to make contact.

**Validation Scenarios**

- Scenario — Reviewing rendered narrative content
  - Success Condition: no project catalog, no contact CTA present.
  - Failure Condition: either appears.

### Commitment 5 — No Reader-Triggered Content Gating

Relationship to Solution: resolves the Behaviour/Rule that the full
narrative renders as flowing content with no reader-triggered
interaction gating any part of it.

**Acceptance Criteria**

- AC1: The complete intro hook and bio content are present/readable once
  the visitor reaches the About view, without requiring interaction to
  reveal additional content.
- AC2: No expand/collapse control, tab-switch, or similar mechanism is
  required to access any part of the narrative.

**Validation Scenarios**

- Scenario — Visitor reaches the About view and takes no additional
  action
  - Success Condition: the entire narrative is present/readable via
    scrolling alone.
  - Failure Condition: part of the narrative stays hidden until an added
    interaction occurs.

### Commitment 6 — Localized Content at Render

Relationship to Solution: resolves the Rule that narrative text language
reflects whatever `content-localization` resolves at render time.
Mirrors `hero-presentation`'s equivalent commitment.

**Acceptance Criteria**

- AC1: The intro hook and bio content text render in the language
  `content-localization` resolves at render time.
- AC2: about-narrative does not itself decide or override the active
  language.

**Validation Scenarios**

- Scenario — Arrival with a resolved locale
  - Success Condition: text is in the resolved language.
  - Failure Condition: text is in a different language.

Excluded from this Commitment, unchanged from Solution: reactive
re-render on a later language change — no commitment or failure
condition applies to that scenario.

---

*Created: 2026-08-31*
