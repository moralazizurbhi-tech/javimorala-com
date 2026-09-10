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
- Apply the device-class-specific layout (staggered, contrasting-
  orientation photo placement on desktop/tablet vs. single-column
  ordering with the portrait photo proximate to the opening line on
  mobile, per Feature UI Definition) entirely through the Styling
  System's responsive breakpoints within one shared markup structure,
  rather than branching to separate templates per device class.
- Expose the narrative's first paragraph block as a distinctly styled
  element — a heavier display-weight treatment as the composition's
  opening/greeting, per Feature UI Definition — while the remaining
  five blocks (including the AI-development line) share one uniform
  body-tier style; applied via markup/selector structure, not by
  giving the first block special functional behavior.
- Render the Ornamental Logo's large-scale ambient instance as a
  non-interactive background layer, behind all other narrative content
  in stacking order, with no focusable/interactive markup (Commitment
  5) — referencing the shared Ornamental Logo SVG asset (the same asset
  `section-navigation` and `direct-contact` also reference), without
  owning or duplicating its definition.

**Owned Concepts**

- The single-template completeness invariant (all three pieces, one
  render path).
- The mapping from Feature UI's two device-class layout descriptions to
  Styling System breakpoints.
- Preservation of authored paragraph order as the mechanism guaranteeing
  AI-note subordinate positioning.
- The narrative's first-paragraph distinct styling hook, separating its
  display-tier treatment from the remaining five blocks' shared body
  tier.
- The Ornamental Logo's large-scale non-interactive background stacking
  treatment (shared asset referenced, not redefined).

**Collaborations**

- i18n/Routing Layer — supplies resolved Personal-Narrative-domain
  content (narrative text, including its closing AI-development
  paragraph) for the active locale.
- Styling System — supplies breakpoint tokens, typography/colour tokens
  (the opening line's distinct display tier plus the shared body-copy
  tier for the remaining five blocks, off-white foreground), and
  column/spacing layout primitives for the staggered, contrasting-
  orientation photo placement and single-column mobile ordering.

**Dependencies**

- i18n/Routing Layer (Project Architecture) — external, not redefined
  here.
- Styling System (Project Architecture) — external, not redefined here.
- The two personal photo assets — external; final selection/production is
  out of this Feature's scope (Feature Definition boundary); placeholders
  stand in meanwhile.
- Shared Ornamental Logo Asset (external, project-wide substrate, not
  owned by any Feature; distinct from Hero's separate Ornamental Mark
  asset) — this component references it at a large scale for its own
  ambient background placement, the same asset `section-navigation` and
  `direct-contact` also reference.

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
- Single shared markup with CSS-only device-class branching (staggered
  photo placement and column arrangement via breakpoints), not two
  separate template paths. Rationale: keeps the completeness invariant
  trivially true across device classes — one render path to guarantee,
  not two that could diverge.
- AI-development line authored as part of the same narrative content
  block (its final paragraph), not rendered as a separate
  component/slot. Rationale: Feature UX/UI require it to read as an
  integrated, undistinguished part of the narrative, not a bolt-on note;
  content authoring order alone guarantees it never precedes the
  narrative.
- The Ornamental Logo's large-scale ambient instance is rendered as a
  purely static background layer with no hydration — consistent with
  this component's existing no-React-island design; Commitment 5
  requires no interactivity, so no island is needed for it either.

**Contract Traceability**

- Commitment 1 → single-template rendering of narrative text and both
  photos.
- Commitment 2 → authored paragraph ordering (AI line last).
- Commitment 3 → i18n/Routing Layer consumption.
- Commitment 4 → non-interactive photo rendering.
- Commitment 5 → non-interactive background-layer rendering of the
  shared Ornamental Logo asset (large-scale ambient instance), with no
  completeness dependency.

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
