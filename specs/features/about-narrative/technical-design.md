# Technical Design: About Narrative

## Technical Components

### About Section

Existing identity — from Project Architecture's System Structure. This
Feature's Technical Design elaborates its internal organization; it does
not rename or duplicate it.

**Purpose**

Realize `about-narrative`'s Feature Contract by composing the intro hook
and bio content as one coordinated, blended narrative presentation.

**Responsibilities**

- Compose the intro hook and bio content together as one continuous,
  blended narrative unit — never presented independently or through
  separate access points (Commitment 1).
- Ensure the bio content addresses both professional and personal
  dimensions with genuine, comparable weight, blended rather than split
  into separate labeled sections (Commitment 2).
- Maintain the hook as functionally lighter/framing relative to the bio
  content's substantiating depth — the hook alone must not satisfy
  dual-dimension coverage (Commitment 3).
- Ensure the narrative excludes portfolio/work-listing framing and any
  contact call-to-action (Commitment 4).
- Render the complete narrative without any reader-triggered gating
  mechanism (Commitment 5).

**Owned Concepts**

- *About narrative composition* — the grouping of intro hook + bio
  content into one coordinated, blended presentational unit; owned
  exclusively here.
- *Dual-dimension blending* — the requirement that professional and
  personal material be interleaved rather than separated into
  independent sections.
- *Hook/body asymmetry* — the functional distinction ensuring the hook
  doesn't independently carry full dual-dimension depth.

**Collaborations**

- Consumes locale-resolved intro-hook and bio-content text from the
  Locale Layer (Existing pattern, per Architecture: section components
  consume locale-resolved content from the Locale Layer, rather than
  reading the Content Data Layer directly).
- Uses the Animation Layer for any reveal/scroll-triggered presentation
  of narrative elements; reveal timing/sequencing is entirely the
  Animation Layer's decision (per Feature Solution's boundary) — no
  additional coordination concept is required from About Section beyond
  presenting hook+body as one composed unit.
- Consumes the Styling System's shared visual tokens/mixins for visual
  coherence and for whatever device-class-appropriate treatment Feature
  UX defines; the concrete treatment variants themselves are not decided
  here.
- Composed by the App Shell in fixed section order, after Hero Section
  and before Contact Section (Existing).

**Dependencies**

- Locale Layer (content resolution).
- Animation Layer (reveal/motion mechanics).
- Styling System (visual tokens).

**Constraints**

- Must not depend on or invoke `section-navigation`'s or
  `email-contact`/`social-links`' components — excluded from this
  Feature's boundary.
- Must not implement or request any reader-triggered gating mechanism
  (expand/collapse, tabs) — this is how Commitment 5 is satisfied
  structurally.
- Must not implement or expose a contact call-to-action control or link
  — this is how Commitment 4's AC2 is satisfied structurally.
- Must not organize dual-dimension content into separately identifiable/
  labeled sub-components — this is how Commitment 2's AC4 is satisfied
  structurally.
- Must not decide concrete responsive treatment variants or visual
  composition — that decision belongs to Feature UX.

**Design Decisions**

- Modeled as a single cohesive component, not two independent sibling
  components (hook vs. body) — directly reflects Commitment 1's
  inseparability requirement and the Feature Definition's ownership of
  coordination.
- Dual-dimension blending is not modeled as an explicit internal state or
  content-tagging mechanism (e.g. no "professional"/"personal" flags) —
  the Contract's blending requirement (Commitment 2 AC4) is satisfied
  structurally by treating the bio content as one undifferentiated body
  of locale-resolved text, not by any dimension-tracking construct. No
  demonstrated technical need for such a construct was identified.
- Hook/body asymmetry is not modeled as a measured/scored property (e.g.
  no word-count or depth-scoring mechanism) — Commitment 3 is satisfied
  structurally by keeping the hook and body as two distinct content slots
  within the same composition, where only the body slot is expected to
  carry the substantiating depth; no dedicated verification mechanism is
  introduced here.
- Device-class-appropriate treatment is not owned as selection logic
  here, mirroring Hero Section's precedent — About Section presents
  whatever treatment Feature UX and the Styling System establish.

**Contract Traceability**

- Commitment 1 (Hook-Then-Body Sequencing & Inseparability) —
  Responsibility 1, Owned Concept "About narrative composition," Design
  Decision 1.
- Commitment 2 (Dual-Dimension Coverage) — Responsibility 2, Owned
  Concept "Dual-dimension blending," Design Decision 2.
- Commitment 3 (Hook/Body Functional Asymmetry) — Responsibility 3, Owned
  Concept "Hook/body asymmetry," Design Decision 3.
- Commitment 4 (No Portfolio Framing, No Contact CTA) — Responsibility 4,
  Constraint (no CTA control).
- Commitment 5 (No Reader-Triggered Content Gating) — Responsibility 5,
  Constraint (no gating mechanism).
- Commitment 6 (Localized Content at Render) — Collaboration with Locale
  Layer.

## Cross-Component Relationships

- App Shell → About Section: composes it in fixed order, after Hero
  Section (Existing).
- About Section → Locale Layer: consumes resolved content (Existing
  pattern).
- About Section → Animation Layer: supplies elements for reveal
  presentation; no completeness/blending concept exposed, no dependency
  back.
- About Section → Styling System: consumes shared visual tokens
  (Existing pattern).
- About Section ⇸ section-navigation, email-contact, social-links:
  explicitly no dependency (boundary preserved).

No circular dependencies: About Section depends outward on Locale Layer,
Animation Layer, and Styling System; none of those depend back on About
Section.

---

*Created: 2026-08-31*
