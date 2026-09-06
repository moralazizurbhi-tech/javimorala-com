# Technical Design: About Narrative

**Status:** Approved

## Technical Components

### About Narrative Composition

Existing identity — realized within Project Architecture's Personal
Narrative Domain Section; this Technical Design elaborates its internal
organization, not a new top-level component.

**Purpose**

Realize about-narrative's Feature Contract by composing narrative text
(including the woven-in AI-assisted-development line) and two personal
photos as one coordinated, fully static composition, per device class.

**Responsibilities**

- Render narrative text and both photos together in a single static
  template — never independently or conditionally — so completeness
  (Commitment 1) is structurally guaranteed, not sequenced at runtime.
- Consume the Personal Narrative domain's locale-resolved narrative text
  (including the AI-development line, since it is part of the same
  content block) from the i18n/Routing Layer for the active route's
  locale (Commitment 3); never read the Content Layer directly, never
  re-resolve or override the active language.
- Preserve the narrative text's paragraph order exactly as authored — the
  AI-development line is content-authored as the final paragraph, not
  positioned by component logic — structurally guaranteeing Commitment 2
  (never before the narrative) by ordering, not conditional placement
  logic.
- Render both photos as plain, non-interactive image elements — no
  carousel/lightbox/toggle affordance — since Commitment 4 forbids any
  interaction changing which photo(s) display.
- Apply the device-class-specific layout (two-column desktop/tablet vs.
  single-column mobile ordering, per Feature UI Definition) entirely
  through the Styling System's responsive breakpoints within one shared
  markup structure, rather than branching to separate templates per
  device class.

**Owned Concepts**

- The single-template completeness invariant (all three pieces, one
  render path).
- The mapping from Feature UI's two device-class layout descriptions to
  Styling System breakpoints.
- Preservation of authored paragraph order as the mechanism guaranteeing
  AI-note subordinate positioning.

**Collaborations**

- i18n/Routing Layer — supplies resolved Personal-Narrative-domain
  content (narrative text, including its closing AI-development
  paragraph) for the active locale.
- Styling System — supplies breakpoint tokens, typography/colour tokens
  (uniform body-copy tier, off-white foreground), and column/spacing
  layout primitives for the two-column/single-column arrangements.

**Dependencies**

- i18n/Routing Layer (Project Architecture) — external, not redefined
  here.
- Styling System (Project Architecture) — external, not redefined here.
- The two personal photo assets — external; final selection/production is
  out of this Feature's scope (Feature Definition boundary); placeholders
  stand in meanwhile.

**Constraints**

- No client-side hydration/React island is required for this Feature's
  own contractual behavior — none of Commitments 1-4 need interactivity
  or runtime state; `motion-interaction`'s entrance treatment, if
  applied, is a separate concern layered on top and doesn't change what
  this component must itself guarantee.
- Device-class layout resolves at build/render time via CSS breakpoints,
  not runtime JavaScript — consistent with the static-first architectural
  principle.
- No reactive re-render on a later language change — locale resolves
  once per static route; this component has no mechanism to detect or
  respond to a subsequent change.
- Content-collection completeness across English, Spanish, and Euskera
  for the narrative text (Feature UX's Pending translation) is assumed
  guaranteed before a given locale route is built; no runtime fallback
  for missing locale content is defined here.
- Final photo asset availability (Feature UX's Pending item) is assumed
  resolved before a given route is built; no runtime fallback/
  placeholder-swap mechanism is defined here — placeholders are
  themselves the authored asset until replaced.

**Design Decisions**

- Render as a purely static Astro component, no React island. Rationale:
  static-first principle; none of the Feature's committed behaviors need
  client-side logic.
- Single shared markup with CSS-only device-class branching (column
  arrangement via breakpoints), not two separate template paths.
  Rationale: keeps the completeness invariant trivially true across
  device classes — one render path to guarantee, not two that could
  diverge.
- AI-development line authored as part of the same narrative content
  block (its final paragraph), not rendered as a separate
  component/slot. Rationale: Feature UX/UI require it to read as an
  integrated, undistinguished part of the narrative, not a bolt-on note;
  content authoring order alone guarantees it never precedes the
  narrative.

**Contract Traceability**

- Commitment 1 → single-template rendering of narrative text and both
  photos.
- Commitment 2 → authored paragraph ordering (AI line last).
- Commitment 3 → i18n/Routing Layer consumption.
- Commitment 4 → non-interactive photo rendering.

## Cross-Component Relationships

- Root Layout → About Narrative Composition: composes it within the
  Personal Narrative Domain Section (Existing).
- About Narrative Composition → i18n/Routing Layer: consumes resolved
  content (Existing pattern).
- About Narrative Composition → Styling System: consumes shared tokens
  (Existing pattern).
- `motion-interaction`'s technical design (out of scope here) may
  wrap/hydrate elements this component renders; it depends outward on
  About Narrative Composition's static output, not the reverse.
- No dependency on `section-navigation`, `presence-links`, or
  `direct-contact` (boundary preserved).

No circular dependencies: About Narrative Composition depends outward on
i18n/Routing Layer and the Styling System; neither depends back on it.

---

*Created: 2026-09-06*
