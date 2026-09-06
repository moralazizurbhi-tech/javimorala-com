# Technical Design: Hero Presentation

**Status:** Approved

## Technical Components

### Hero Composition

Existing identity — realized within Project Architecture's Introduction
Domain Section; this Technical Design elaborates its internal
organization, not a new top-level component.

**Purpose**

Realize hero-presentation's Feature Contract by composing
headline/tagline, ornamental-mark placement, and scroll cue as one
coordinated arrival presentation, per device class.

**Responsibilities**

- Render all three composition elements together in a single static
  template — never independently — so completeness (Commitment 1) is
  structurally guaranteed, not sequenced at runtime.
- Consume the Introduction domain's locale-resolved headline/tagline text
  from the i18n/Routing Layer for the active route's locale (Commitment
  2); never read the Content Layer directly, never re-resolve or
  override the active language.
- Render the scroll cue as non-interactive, non-focusable markup — since
  Commitment 3 requires activation to have no effect, making it a
  focusable control would present a false affordance to assistive
  technology.
- Apply the device-class-specific layout (the desktop/tablet vs. mobile
  arrangement Feature UI Definition describes) entirely through the
  Styling System's responsive breakpoints within one shared markup
  structure, rather than branching to separate templates per device
  class.
- Render the ornamental mark as a background-layer reference (the asset
  itself out of scope), stacked behind the headline/scroll cue via the
  Styling System's z-index/layering convention.

**Owned Concepts**

- The single-template completeness invariant.
- The mapping from Feature UI's two device-class layout descriptions to
  Styling System breakpoints.
- The scroll cue's non-interactive rendering decision.

**Collaborations**

- i18n/Routing Layer — supplies resolved Introduction-domain content
  (headline/tagline) for the active locale.
- Styling System — supplies breakpoint tokens, off-white/accent-gradient
  colour tokens, and the layering convention placing the mark behind the
  text.

**Dependencies**

- i18n/Routing Layer (Project Architecture) — external, not redefined
  here.
- Styling System (Project Architecture) — external, not redefined here.
- The ornamental mark's shared visual asset — external; its own design is
  out of this Feature's scope (Feature Definition boundary).

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
  for the headline/tagline (Feature UX's two Pending translations) is
  assumed guaranteed before a given locale route is built; no runtime
  fallback for missing locale content is defined here.

**Design Decisions**

- Render as a purely static Astro component, no React island. Rationale:
  static-first principle; none of the Feature's committed behaviors need
  client-side logic.
- Single shared markup with CSS-only device-class branching (e.g. a CSS
  transform for the mobile rotated headline), not two separate template
  paths. Rationale: keeps the completeness invariant trivially true
  across device classes — one render path to guarantee, not two that
  could diverge.
- Scroll cue rendered as non-interactive/non-focusable markup. Rationale:
  no functional behavior on activation; a focusable no-op control would
  misrepresent itself to keyboard/AT users. This resolves Feature UX's
  conditional ("if it is interactive") toward non-interactive, per
  explicit confirmation.

**Contract Traceability**

- Commitment 1 → single-template rendering.
- Commitment 2 → i18n/Routing Layer consumption.
- Commitment 3 → non-interactive scroll-cue rendering.
- Commitment 4 → CSS-breakpoint-driven layout per Feature UI Definition.

## Cross-Component Relationships

- Root Layout → Hero Composition: composes it within the Introduction
  Domain Section (Existing).
- Hero Composition → i18n/Routing Layer: consumes resolved content
  (Existing pattern).
- Hero Composition → Styling System: consumes shared tokens (Existing
  pattern).
- `motion-interaction`'s technical design (out of scope here) may
  wrap/hydrate elements this component renders; it depends outward on
  Hero Composition's static output, not the reverse.
- No dependency on `section-navigation` (boundary preserved).

No circular dependencies: Hero Composition depends outward on i18n/
Routing Layer and the Styling System; neither depends back on it.

---

*Created: 2026-09-06*
