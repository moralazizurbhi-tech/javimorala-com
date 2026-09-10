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
- Derive the headline groups' vertical position from the Ornamental
  Mark's own geometry — not an independently authored offset — per
  device class: on desktop/tablet, the dominant-word group's position
  allows the mark's left tendrils to reach into its upper region, and
  the secondary line's position allows the mark's right tendril to
  approach without crossing it; on mobile, the dominant-word group's
  position allows the mark's trailing tendril to nearly reach it, with
  the secondary lines positioned clear of the mark's footprint (Feature
  UI Definition, Spacing and Layout).
- Expose a scroll-position signal (e.g. a sentinel element positioned at
  the Ornamental Mark's own effective lower-visibility boundary,
  informed by the mark-relative anchoring mechanism above) that other
  Features may observe to determine whether the mark remains visible at
  a given fixed screen position — without those Features needing any
  other knowledge of this component's internals.

**Owned Concepts**

- The single-template completeness invariant.
- The mapping from Feature UI's two device-class layout descriptions to
  Styling System breakpoints.
- The scroll cue's non-interactive rendering decision.
- The mark-relative headline anchoring mechanism — headline position as
  a function of the Ornamental Mark's own geometry, not an independently
  authored layout value.
- The mark-visibility sentinel — a marker at the mark's own effective
  visible boundary, exposed for external observation only.

**Collaborations**

- i18n/Routing Layer — supplies resolved Introduction-domain content
  (headline/tagline) for the active locale.
- Styling System — supplies breakpoint tokens, off-white/accent-gradient
  colour tokens, and the layering convention placing the mark behind the
  text.
- Section Navigation Composition — observes (does not own) this
  component's exposed mark-visibility sentinel to drive its own
  divider-line segmented/continuous state (`section-navigation` Contract
  Commitment 8); this component has no dependency back on Section
  Navigation.

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
- Any anchor value derived from the mark's geometry must be re-derived
  if the Ornamental Mark asset itself changes (a new SVG revision),
  since the relationship is defined relative to the asset's own shape,
  not an independent constant.
- The sentinel's position must track the mark's own actual visible
  boundary (informed by the mark-relative headline anchoring mechanism),
  not an independently authored value — the same re-derive-if-the-asset-
  changes constraint above applies here too.

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
- Headline vertical position is derived from the Ornamental Mark asset's
  own geometry (anchor points or proportional offsets relative to the
  mark's bounding shape), not authored as an independent layout value.
  Rationale: Feature UI Definition specifies the mark and headline as
  one compositional gesture with a precise, asset-dependent relationship
  — an independently authored offset can't preserve that relationship if
  the mark asset changes, and previously drifted away from it for
  exactly that reason.

**Contract Traceability**

- Commitment 1 → single-template rendering.
- Commitment 2 → i18n/Routing Layer consumption.
- Commitment 3 → non-interactive scroll-cue rendering.
- Commitment 4 → CSS-breakpoint-driven layout per Feature UI Definition,
  including the mark-relative headline anchoring mechanism above, itself
  derived from Feature UI's precise per-device relationship description.
- Note: the mark-visibility sentinel isn't required by any of this
  Feature's own Commitments 1-4; it exists solely as a cross-Feature
  technical provision enabling `section-navigation`'s Commitment 8,
  consistent with Collaborations describing relationships beyond this
  Feature's own contract.

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
- No dependency on `section-navigation` — this component has no
  awareness of or reliance on it; it exposes the mark-visibility
  sentinel as a passive marker for any observer, without depending back
  on whoever consumes it (`section-navigation` is one such consumer, per
  that Feature's own Technical Design).

No circular dependencies: Hero Composition depends outward on i18n/
Routing Layer and the Styling System; neither depends back on it.

---

*Created: 2026-09-06*
