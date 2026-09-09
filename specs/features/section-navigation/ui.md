# Feature UI Definition: Section Navigation

**Status:** Approved

## UI Scope

Realizes Feature UX's nav-bar/overlay composition across all three
screens — wordmark, "about"/"contact" links, conditional compact
logomark, active-indicator (Pending), language control hosting, mobile
toggle/overlay — informed by the same explicitly-provided Figma reference
(file `CCwye9dUj8Sy4f2lgy6i9f`: "Home" `4:65`/"Home - mobile" `22:41`,
"About" `13:2`/"About - mobile" `22:112`, "Contact" `22:2`/"Contact -
mobile" `22:126`, "Menu - mobile" `22:99`), treated as evidence, not
persistent project knowledge. Project UX's Visual Foundations now define concrete typography (a single
rounded, geometric sans-serif family, weight-driven hierarchy) and
colour (warm near-black/off-white base, gradient reserved for emphasis)
at the outcome level; exact sizing below remains a Feature-specific
extension, mapped to existing tiers where it visibly corresponds
(mirrors Direct Contact's UI approach). Excludes
the ornamental mark's own visual design/asset, each destination screen's
own content, `language-override`'s own control behavior, and all
motion/transition treatment (`motion-interaction`).

## Typography Application

- Wordmark ("javimorala.com"), desktop and mobile-open-overlay: small
  body/label-tier text, regular weight, lowercase as observed — measured
  height 46, an exact match to Hero's nav-link tier (also 46), not just
  a qualitative "compact nav/label text" resemblance.
- Wordmark, mobile closed state: measured height 23 — exactly half the
  desktop/open-overlay size, a distinct smaller treatment specific to
  the collapsed mobile bar.
- "about"/"contact" links (desktop and inside the open mobile overlay):
  same tier as the desktop wordmark, regular weight, lowercase, matching
  its visual weight (no separate emphasis) — measured height 46 in both
  contexts, confirming no size reduction once the overlay opens.
- No distinct typographic treatment observed for an active state —
  consistent with Feature UX's Pending marker on the indicator's visual
  expression.

## Spacing and Layout

### Desktop

- Full-width top bar spanning the frame's horizontal margins: wordmark
  at the far left; "about" then "contact" grouped at the far right,
  left-to-right in that order, with "contact" closest to the frame's
  right edge; a consistent gap between the two links.
- A thin horizontal divider line runs the bar's full width beneath it,
  separating the nav from the screen content below — present on all
  three screens, including Introduction (confirmed: Introduction's own
  frame has its own divider-line pair, just not grouped into a named
  container the way About/Contact's nav row is).
- On About and Contact, the compact logomark icon is centered
  horizontally within this same row, vertically aligned with the
  wordmark and links; its frame measures 117x216 — exactly as tall as
  the entire nav row — spanning the row's full height rather than
  sitting as a small inline icon at text baseline. On Introduction, that
  same row contains only the wordmark and links — no centered element —
  leaving the Hero's own large centerpiece mark (owned by
  `hero-presentation`) as the only mark on that screen.
- The bar's row height, divider position, and left/right link alignment
  stay visually consistent across all three screens — only the compact
  logomark's presence changes.

### Mobile

- Closed: wordmark top-left at its half-size (measured 23), hamburger
  toggle top-right measuring 32x8 (two horizontal lines) — no divider
  line observed in the mobile reference.
- Open (overlay): the toggle is replaced by a close ("X") glyph in the
  same top-right position, measuring ~22.6x23 (two crossed lines);
  "about" and "contact" are centered together in the vertical middle of
  the full-screen overlay at their full size (measured 46, unchanged
  from desktop), stacked with a large gap between them — no wordmark or
  compact logomark observed within the open overlay in this reference.
- The language control's placement within either mobile form isn't
  observed in this Figma reference (older exploration, predates the
  confirmed `language-override` addition) — its concrete position is
  Pending, to be resolved when `language-override`'s own UI is defined
  or this Definition is next refined.

## Component Anatomy and Variants

- **Persistent Nav Bar (desktop):** plain text wordmark + plain text
  links, no button chrome, border, or pill shape — consistent with the
  site's chrome-free, typography-driven aesthetic. The compact logomark
  renders as a small standalone mark, no container.
- **Mobile Hamburger Toggle:** two-horizontal-line glyph, no surrounding
  button surface.
- **Mobile Close Control:** an "X" glyph in the toggle's same position
  when open — a state-swap of the same control, not a separate element.
- **Mobile Navigation Overlay:** full-screen flat surface (same
  background as the rest of the site), links as plain centered text, no
  button chrome.
- **Active Screen Indicator:** Pending — no anatomy observed in Figma;
  left to a future refinement of this Definition once a treatment is
  decided (color change, underline, weight change, or similar), per
  Feature UX's Pending marker.

## Colour Application

- Background: plain, warm near-black base (Figma: solid #221e24 on
  every screen's frame) — the same base used everywhere, no gradient.
- Wordmark, nav links, and the compact logomark: the project's soft
  off-white foreground (`#ebeaec`, observed directly in Figma), no
  accent-gradient treatment.
- No colour differentiation observed between "about" and "contact," or
  between any nav element and the shared near-black background.
- Active-indicator colour: Pending, per Feature UX — no value to extend
  from Visual Foundations yet, since no active-state treatment exists in
  the reference.

## Borders, Radii, Shadows, Surfaces

None identified — no bordered/surfaced elements in the nav bar or mobile
overlay, consistent with the site's chrome-free style.

## Iconography

- Hamburger toggle: two horizontal lines (observed).
- Close control: two crossed lines forming an "X" (observed, "Menu -
  mobile").
- No icons for "about"/"contact" or the wordmark — plain text only.

## Visual States and Responsive Layout

- Mobile Overlay Closed / Open: two concrete realizations as above
  (toggle vs. close glyph, collapsed bar vs. full-screen link list) —
  Feature UX's Mobile Overlay states.
- Active Screen Indicator: no concrete visual realization yet — remains
  Pending, consistent with Feature UX; this Definition intentionally
  does not invent one.
- Desktop vs. mobile: two distinct concrete layouts, not a resize/reflow
  of one layout — matching Feature UX's device-distinct treatment.

---

*Created: 2026-09-07*
