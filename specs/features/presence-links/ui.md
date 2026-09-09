# Feature UI Definition: Presence Links

**Status:** Approved

## UI Scope

Realizes Feature UX's two placements — the Introduction glimpse
(bottom-left) and the Connection group (secondary, alongside the
CTA/farewell). Direct Contact's own UI Definition already observed this
Feature within its Connection composition (plain inline text links,
horizontal, lavender/accent-tinted, no icons) — treated here as the
baseline, applied consistently at both placements per Contract Commitment
2. Project UX's Visual Foundations now define concrete typography (a single
rounded, geometric sans-serif family, weight-driven hierarchy) and
colour (warm near-black/off-white base, lilac-to-purple gradient
reserved for emphasis) at the outcome level; exact sizing and the
lavender/accent colour value below remain Feature-specific extensions
(mirrors Direct Contact's own UI).

## Typography Application

- Instagram/LinkedIn labels: small body/label-tier text, regular weight,
  plain text, no icon — measured height 28 in the Figma source, the same
  compact tier confirmed for Hero's scroll-cue/presence-links text and
  Direct Contact's farewell lines — a consistently measured tier across
  three Features, not just a qualitative match.

## Spacing and Layout

### Connection placement

- Horizontally arranged with a gap between the two entries, positioned
  within the farewell/Presence-Links cluster at the bottom of the
  Connection screen (Direct Contact's own layout, existing).

### Introduction placement

- Positioned bottom-left (Confirmed by the user), same horizontal-with-
  gap treatment, same identity (Contract Commitment 2). Cross-referenced
  against hero-presentation's own UI Definition: bottom-left corner,
  mirroring the scroll cue's bottom-right placement, a small quiet text
  row. Exact pixel margin/offset from the screen edge remains Pending —
  Hero's own description is relative, not a literal value — left to
  implementation within the site's established margin/gutter convention.

### Mobile — Connection placement

- Reflows within the narrower column, matching Direct Contact's own
  mobile realization of this cluster.

### Mobile — Introduction placement

- Omitted — hero-presentation's own UI Definition establishes no mobile
  realization exists for this placement; the viewport doesn't have room
  to show it without compromising Hero's primary composition (Hero
  Contract Commitment 5). This Feature's Connection placement is
  unaffected.

## Component Anatomy and Variants

- Presence Link Group: plain inline text links, horizontally arranged
  with a gap — no icons, no button chrome/border/pill shape, consistent
  with the site's chrome-free aesthetic.

## Colour Application

- Both labels: Project UX's confirmed lilac-to-purple gradient, applied
  as a static text fill (not the animated moving sweep motion-interaction
  gives the Direct Contact CTA) — visibly different from the plain
  off-white used for each placement's primary content. Realizes Contract
  Commitment 4 and the visual-distinctness constraint already established
  from the Connection side (Direct Contact's UI), and matches the value
  motion-interaction's own UI Definition already assumes this Feature
  carries.

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
