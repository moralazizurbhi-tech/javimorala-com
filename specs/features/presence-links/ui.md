# Feature UI Definition: Presence Links

**Status:** Approved

## UI Scope

Realizes Feature UX's two placements — the Introduction glimpse
(bottom-left) and the Connection group (secondary, alongside the
CTA/farewell). Direct Contact's own UI Definition already observed this
Feature within its Connection composition (plain inline text links,
horizontal, lavender/accent-tinted, no icons) — treated here as the
baseline, applied consistently at both placements per Contract Commitment
2. Project UX's Visual Foundations don't yet define concrete
type/spacing/colour tokens, so most values below are Feature-specific
extensions (mirrors Direct Contact's own UI).

## Typography Application

- Instagram/LinkedIn labels: small body/label-tier text, regular weight,
  plain text, no icon — the same tier Direct Contact's UI already
  assigned this Feature.

## Spacing and Layout

### Connection placement

- Horizontally arranged with a gap between the two entries, positioned
  within the farewell/Presence-Links cluster at the bottom of the
  Connection screen (Direct Contact's own layout, existing).

### Introduction placement

- Positioned bottom-left (Confirmed by the user), same horizontal-with-
  gap treatment, same identity (Contract Commitment 2). Exact
  margin/offset from the screen edge is Pending — no specific Figma
  frame identified there with confidence; left to implementation within
  the site's established margin/gutter convention.

### Mobile (both placements)

- Same relative order/grouping as desktop; reflows within the narrower
  column, matching Direct Contact's own mobile realization of this
  cluster.

## Component Anatomy and Variants

- Presence Link Group: plain inline text links, horizontally arranged
  with a gap — no icons, no button chrome/border/pill shape, consistent
  with the site's chrome-free aesthetic.

## Colour Application

- Both labels: a distinct, lavender/accent-tinted colour — visibly
  different from the plain off-white used for each placement's primary
  content. Realizes Contract Commitment 4 and the visual-distinctness
  constraint already established from the Connection side (Direct
  Contact's UI). Exact colour token value is Pending — Project UX's
  Visual Foundations don't yet name one; this Feature only asserts the
  consistent differentiation.

## Borders, Radii, Shadows, Surfaces

None — no bordered/surfaced elements, consistent with the site's
chrome-free style.

## Iconography

None — plain text labels at both placements.

## Visual States and Responsive Layout

- Single settled state — no partial/loading/interaction state exists
  (Contract Commitment 1 AC5).
- Desktop/tablet vs. mobile: same content, same relative scale/weight/
  order at both placements, reflowed rather than resized down.

---

*Created: 2026-09-07*
