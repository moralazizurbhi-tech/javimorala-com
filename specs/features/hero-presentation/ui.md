# Feature UI Definition: Hero Presentation

**Status:** Approved

## UI Scope

Realizes Feature UX's Introduction/Hero experience — headline emphasis,
ornamental-mark placement, and scroll-cue realization — informed by an
explicitly-provided external reference (legacy Figma "Home"/"Home -
mobile" frames), treated as evidence, not persistent project knowledge.
Project UX's Visual Foundations don't yet define concrete type/spacing/
colour tokens, so most values below are Feature-specific extensions, not
traced to an existing token.

## Typography Application

- "Building" — the largest, dominant display size on the page (extension;
  observed ratio from reference: dominant line ≈3x the height of the
  secondary lines).
- "the web" and "with a rebellious streak" — a shared secondary size,
  smaller than "Building" but still within Project UX's "expressive
  display" tier, bold weight.
- Scroll cue text — the compact nav/label-text tier (smallest), same
  weight family as elsewhere.

## Spacing and Layout

### Desktop/tablet

- Ornamental mark: rendered as a background layer, behind the headline
  and scroll cue in stacking order — large, horizontally centered,
  anchored near the top of the viewport, its bounding area extending down
  far enough to overlap the headline's general region; its gradient fades
  to near-transparent well before reaching the headline's position, so
  text legibility and contrast are never compromised by the overlap.
- Headline and scroll cue render in the foreground layer, above the mark.
- Headline: "Building" + "the web" stacked, left-aligned, lower-left
  region of the viewport; "with a rebellious streak" positioned
  separately in the lower-right region, roughly level with "the web" — an
  asymmetric, spread arrangement, not one stacked block.
- Scroll cue (text + arrow): bottom-right corner, clear of the headline.

### Mobile

- Ornamental mark: repositioned and cropped toward the top-right, smaller,
  partially bleeding off-screen — a distinct crop, not a scaled copy of
  desktop; still rendered as a background layer, behind the headline.
- Headline: "Building" rotated 90° (reads bottom-to-top), anchored to the
  left edge, still the dominant visual element; "the web" and "with a
  rebellious streak" both stack normally to its right, at the same
  secondary size — collapsing desktop's left/right split into one stacked
  pair.
- Scroll cue: bottom of the viewport, full-width oriented.

## Component Anatomy and Variants

- Headline: three text lines, two size variants (dominant / secondary).
- Ornamental mark: single shared graphical asset, rendered as a
  background layer (z-order beneath all Hero text); only its
  placement/crop/fade/z-order vary by device class here — its own design
  is out of this Feature's scope.
- Scroll cue: text label + directional arrow icon, paired as one unit.

## Colour Application

- Headline text: base off-white foreground colour throughout — no accent
  gradient on the letters.
- Ornamental mark: carries the accent gradient treatment.
- Scroll cue: base off-white foreground colour.

## Borders, Radii, Shadows, Surfaces

None identified — no bordered/surfaced elements in this composition.

## Iconography

- Scroll cue arrow: simple downward directional arrow, stroke-only,
  off-white.

## Visual States and Responsive Layout

- **Composition complete**: the settled desktop/tablet or mobile layout
  described above; no partial-composition visual exists (Contract
  Commitment 1 forbids it).
- **Reduced-motion**: visually identical to Composition complete, reached
  without animated entrance — this Feature's UI contributes no distinct
  reduced-motion look, only confirms the static layout is reachable
  directly.
- Desktop/tablet vs. mobile: two distinct realizations as above, not a
  single fluid reflow.

---

*Created: 2026-09-06*
