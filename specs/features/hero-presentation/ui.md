# Feature UI Definition: Hero Presentation

**Status:** Approved

## UI Scope

Realizes Feature UX's Introduction/Hero experience — headline emphasis,
ornamental-mark placement, scroll-cue realization, and Presence Links'
conditional realization — informed by an explicitly-provided external
reference (Figma "Home"/"Home - mobile" frames, now declared in Project
Context), treated as evidence, not persistent project knowledge. Project
UX's Visual Foundations now define the shared typographic character (a
single rounded, geometric sans-serif family, weight-driven hierarchy) and
accent colour (a lilac-to-purple gradient) at the outcome level; exact
sizing ratios, positions, and crops below remain Feature-specific
extensions, not traced to an existing token.

## Typography Application

- "Building" — the largest, dominant display tier; measured reference
  ratio ≈3.1x the secondary headline lines' size (185 vs 60 units tall in
  the source). Rendered in the heavy/bold weight of Project UX's
  confirmed rounded-geometric-sans family (family/weight trace to Project
  UX's Visual Foundations; the exact ratio is this Feature's extension).
- "the web" and "with a rebellious streak" — shared secondary tier, same
  heavy weight/family, within Project UX's display tier.
- Scroll cue text and Presence Links text (where shown) — the smallest,
  compact tier: measured as identical size to each other in the
  reference (both 28 units tall, vs. the secondary tier's 60) — confirms
  both share Project UX's lighter, compact nav/label-text tier.

## Spacing and Layout

### Desktop/tablet

- Ornamental Mark and headline compose as one gesture, not two
  independently positioned elements. Against the reference: the mark's
  left descending tendril cluster shares close to the same horizontal
  span as the dominant-word group ("Building"/"the web"), and its lowest
  strands pass behind and lightly through that group's upper glyphs
  before fading to near-transparent — genuine interleaving. The mark's
  single long right tendril descends to nearly touch, but not cross, the
  second secondary line's ("with a rebellious streak") top edge — a
  lighter, proximate connection matching that line's lesser weight.
- Ornamental mark: background layer behind headline/scroll cue in
  stacking order; large, horizontally centered, top-anchored, footprint
  spanning roughly 70% of viewport width/height — but its vertical
  extent is defined in relation to where the headline groups sit (per
  above), not as an independent value the headline is then offset from.
- Headline and scroll cue render in the foreground layer, above the mark.
- Headline: dominant-word group ("Building"/"the web") positioned so the
  mark's left tendrils reach into its upper region as described above,
  left-aligned, lower-left region of the viewport; "with a rebellious
  streak" positioned separately so the mark's right tendril nearly
  meets, without crossing, its top edge, in the lower-right region,
  roughly level with "the web" — an asymmetric, spread arrangement bound
  to the mark's own shape, not an independently centered block.
- Scroll cue (text + arrow): bottom-right corner, clear of the headline.
- Presence Links: bottom-left corner, mirroring the scroll cue's
  bottom-right placement — a small, quiet text row, clearly secondary to
  the headline and never competing with it (Commitment 5 AC3).
- Overall region map: top-center (mark) → lower-left (dominant headline
  word + first secondary line) → lower-right (second secondary line,
  roughly level with the first) → bottom-right (scroll cue) →
  bottom-left (Presence Links) — the last two forming an intentional
  bottom-row symmetry, each equally distant from its respective corner.

### Mobile

- Ornamental Mark and headline compose as one gesture here too, but more
  lightly than desktop: only the mark's trailing left-edge tendril — the
  remaining wisp after the crop pushes most of the shape off-screen
  right — descends far enough to nearly touch the top/end of the rotated
  dominant-word group. The two secondary lines sit entirely clear of the
  mark's footprint, with no tendril contact — a single-point
  relationship, not desktop's two-point (dominant + secondary)
  connection.
- Ornamental mark: repositioned and cropped toward the top-right,
  bleeding off-screen — a distinct crop, not a scaled copy of desktop;
  still rendered as a background layer, behind the headline. Extension
  grounded in the reference: its height holds the same ~70% of viewport
  height as the desktop/tablet treatment (a stable proportion carried
  across breakpoints), while its width intentionally exceeds 100% of the
  viewport, bleeding off the right edge rather than being contained as
  on desktop/tablet. Its remaining left-edge tendril is the only part
  reaching toward the headline, per above.
- Headline: "Building" rotated 90° (reads bottom-to-top), anchored to the
  left edge, positioned so the mark's trailing tendril nearly meets its
  top/end, still the dominant visual element; "the web" and "with a
  rebellious streak" both stack normally to its right, clear of the
  mark's footprint, at the same secondary size — collapsing desktop's
  left/right split into one stacked pair, with only the dominant group
  carrying a mark connection here.
- Scroll cue: bottom of the viewport, full-width oriented.
- Presence Links: omitted — the mobile viewport doesn't have room to
  accommodate it without compromising the primary composition
  (Commitment 5 AC2); no mobile realization exists for this element.

## Component Anatomy and Variants

- Headline: three text lines, two size variants (dominant / secondary).
- Ornamental mark: single shared graphical asset, rendered as a
  background layer (z-order beneath all Hero text); only its
  placement/crop/fade/z-order vary by device class here — its own design
  is out of this Feature's scope.
- Scroll cue: text label + directional arrow icon, paired as one unit.
- Presence Links: a small row of text links, realized only in the
  desktop/tablet layout (bottom-left, mirroring the scroll cue); no
  mobile variant exists for this Feature's placement (Commitment 5).

## Colour Application

- Headline text: base off-white foreground colour throughout — no accent
  gradient on the letters.
- Ornamental mark: carries Project UX's confirmed lilac-to-purple
  gradient treatment — the mark is an SVG asset; the gradient lives on
  it, not on the page background.
- Scroll cue: base off-white foreground colour.
- Presence Links text (where shown): base off-white foreground colour,
  same as headline/scroll cue — no accent gradient.

## Borders, Radii, Shadows, Surfaces

None identified — no bordered/surfaced elements in this composition.

## Iconography

- Scroll cue arrow: simple downward directional arrow, stroke-only,
  off-white.

## Visual States and Responsive Layout

- **Composition complete**: the settled desktop/tablet or mobile layout
  described above; no partial-composition visual exists for the three
  primary elements (Contract Commitment 1 forbids it). Presence Links'
  presence/absence by device class is not part of this invariant
  (Commitment 5).
- **Reduced-motion**: visually identical to Composition complete, reached
  without animated entrance — this Feature's UI contributes no distinct
  reduced-motion look, only confirms the static layout is reachable
  directly.
- Desktop/tablet vs. mobile: two distinct realizations as above, not a
  single fluid reflow — including Presence Links, which is realized only
  in the desktop/tablet layout and has no mobile counterpart.

---

*Created: 2026-09-06*
