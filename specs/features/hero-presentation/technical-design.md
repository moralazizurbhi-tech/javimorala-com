# Technical Design: Hero Presentation

## Technical Components

### Hero Section

Existing identity — from Project Architecture's System Structure. This
Feature's Technical Design elaborates its internal organization; it does
not rename or duplicate it.

**Purpose**

Realize `hero-presentation`'s Feature Contract by composing
headline/tagline, wordmark centerpiece, and scroll cue as one
coordinated arrival presentation, treated appropriately per device
class.

**Responsibilities**

- Compose the three owned elements together as a single unit — never as
  independently presentable pieces.
- Present the composition using whatever device-class-appropriate
  treatment Feature UX establishes, via the Styling System's shared
  visual tokens/mixins.
- Present the scroll cue as a strictly passive affordance, wired with no
  scroll/navigation behavior.

**Owned Concepts**

- *Hero composition* — the grouping of headline/tagline, wordmark, and
  scroll cue into one coordinated presentational unit; owned exclusively
  here.
- *Scroll cue passivity* — the absence of any scroll/navigation behavior
  attached to the scroll cue element.

**Collaborations**

- Consumes locale-resolved headline/tagline text from the Locale Layer
  (Existing pattern, per Architecture: section components consume
  locale-resolved content from the Locale Layer, rather than reading the
  Content Data Layer directly).
- Uses the Animation Layer for entrance presentation of its elements;
  entrance timing/sequencing is entirely the Animation Layer's decision
  (per Feature Solution's boundary) — no additional coordination concept
  is required from Hero Section beyond presenting the three elements as
  one composed unit.
- Consumes the Styling System's shared visual tokens/mixins for visual
  coherence and for whatever device-class-appropriate treatment Feature
  UX defines; the concrete treatment variants themselves are not decided
  here.
- Composed by the App Shell in fixed section order, alongside About
  Section and Contact Section (Existing).

**Dependencies**

- Locale Layer (content resolution).
- Animation Layer (entrance presentation mechanics).
- Styling System (visual tokens).

**Constraints**

- Must not depend on or invoke `section-navigation`'s or `social-links`'
  components — excluded from this Feature's boundary.
- Must not implement or request any scroll-blocking/locking mechanism.
- Must not gate or defer rendering of the composition based on an
  individual element's asset weight (e.g. must not withhold the
  composition pending a heavier element) — this is how Commitment 1's
  AC3 is satisfied structurally, without a dedicated tracking mechanism.
- Must not decide concrete responsive treatment variants or visual
  composition — that decision belongs to Feature UX.

**Design Decisions**

- Modeled as a single cohesive component, not three independent sibling
  components — directly reflects Commitment 1's "never independently
  presented" and the Feature Definition's ownership of coordination, not
  individual element styling.
- Composition completeness is not modeled as an explicit internal state.
  The Contract's completeness requirement (Commitment 1) is satisfied
  structurally — the three elements are only ever rendered together, as
  one unit — rather than by any tracked readiness mechanism. No
  demonstrated technical need for such state was identified.
- Device-class-appropriate treatment is not owned as selection logic
  here. Hero Section presents whatever treatment Feature UX and the
  Styling System establish; introducing a dedicated selection concept
  here would duplicate a decision that belongs to a later phase.

**Contract Traceability**

- Commitment 1 (Composition Completeness) — Responsibility 1, Design
  Decisions 1–2.
- Commitment 2 (Localized Content at Render) — Collaboration with Locale
  Layer.
- Commitment 3 (Passive Scroll Cue) — Responsibility 3, Owned Concept
  "scroll cue passivity."
- Commitment 4 (Device-Class-Appropriate Composition) — Responsibility
  2, Constraint deferring concrete variants to Feature UX.

## Cross-Component Relationships

- App Shell → Hero Section: composes it in fixed order (Existing).
- Hero Section → Locale Layer: consumes resolved content (Existing
  pattern).
- Hero Section → Animation Layer: supplies elements for entrance
  presentation; no completeness concept exposed, no dependency back.
- Hero Section → Styling System: consumes shared visual tokens (Existing
  pattern).
- Hero Section ⇸ section-navigation, social-links: explicitly no
  dependency (boundary preserved).

No circular dependencies: Hero Section depends outward on Locale Layer,
Animation Layer, and Styling System; none of those depend back on Hero
Section.

---

*Created: 2026-08-26*
