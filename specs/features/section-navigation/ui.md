# Feature UI Definition: Section Navigation

**Status:** Approved

## UI Scope

Realizes Feature UX's nav-bar/overlay composition across all three
screens — wordmark, "about"/"contact" links, conditional compact
logomark, active-indicator, language control hosting, mobile
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
- No distinct typographic treatment for an active state — the Active
  Screen Indicator's visual expression is a background pill (Component
  Anatomy and Variants), not a font-weight or size change.

## Spacing and Layout

### Desktop

- Full-width top bar spanning the frame's horizontal margins: wordmark
  at the far left; "about" then "contact" grouped at the far right,
  left-to-right in that order, with "contact" closest to the frame's
  right edge; a consistent gap between the two links.
- The horizontal divider line beneath the bar is never one continuous
  line — it presents as two segments with a centered gap sized to
  whichever mark occupies that position (Contract Commitment 8). On
  About/Contact, each segment measures 700 units in the Figma reference
  (≈40% of the 1728-unit bar width each, ≈19% gap) for the compact
  logomark icon. On Introduction, each segment measures 418 units (≈24%
  each, ≈52% gap) for Hero's own larger mark — present only while that
  mark remains visible at the nav row given scroll position; once it
  scrolls past, the segments extend into one continuous line (Commitment
  8 AC3), even though this Feature doesn't own or render that mark, only
  its own line's response to it.
- On About and Contact, the compact logomark icon is centered
  horizontally in the gap; its frame is 211x389 (80% larger than the
  previously-specified 117x216, uniform scaling to preserve the mark's
  proportions — a Feature-specific extension beyond the Figma
  reference, which only shows the original size; enlarged in two
  further developer-review passes, from an initial 158x292/35% and then
  176x324/50%, both of which still read as too small in the live
  rendering). It no longer fits exactly within the row's height. The
  nav bar sits flush against the viewport's own
  top edge, so there is no room to grow upward without the icon's top
  portion being clipped by the browser viewport itself (developer
  verification against the live rendering, correcting this Definition's
  earlier upward-growth assumption). The icon's top edge sits a small
  breathing margin below the row's own top — the Styling System's
  smallest spacing tier, not flush against it — and the growth extends
  downward from there, under the nav bar and over the page content
  beneath the fixed row. The icon itself is a symmetric, spiked,
  hourglass-shaped mini-mark with crown-like tendrils at both top and
  bottom (observed in Figma "logo smallll") — not a plain geometric
  shape. On
  Introduction, no icon of this Feature's own renders in the gap;
  whatever fills it is entirely Hero's own mark, outside this Feature's
  rendering.
- The bar's row height, divider-segment position, and left/right link
  alignment stay visually consistent across all three screens — only
  which mark (if any) occupies the center gap changes.

### Mobile

- Closed: wordmark top-left at its half-size (measured 23), hamburger
  toggle top-right measuring 32x8 (two horizontal lines) — no divider
  line observed in the mobile reference.
- Closed, logomark addition (new, not observed in the Figma reference —
  confirmed by explicit user decision): the compact logomark icon (same
  Ornamental Logo asset as desktop) renders immediately before the
  wordmark, on every screen including Introduction (Contract Commitment
  4 AC3). Proposed sizing: scaled noticeably larger than the
  wordmark's own measured height (23 units) — no longer sized to
  merely match it — while remaining vertically centered with the
  wordmark text; exact scale factor is an Implementation Detail tuned
  via developer visual review (mirrors the desktop compact mark's own
  iterative-enlargement precedent, above). If the enlarged icon no
  longer comfortably fits the mobile bar's existing row height, the
  bar's own height is free to grow to accommodate it — that dimension
  was never pinned by this Definition. Small gap (a reduced fraction of
  `$space-xs`) between icon and text unchanged.
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
  links, no button chrome or border — consistent with the site's
  chrome-free, typography-driven aesthetic. The Active Screen Indicator
  (below) is the one deliberate exception to this, a small ornamental
  crest fused with the connecting line at the active link's own
  position. The connecting line otherwise renders as two independent
  segments, not one
  bar-wide element sitting behind a mark. The compact logomark
  (Ornamental Logo) is a symmetric, spiked, hourglass-shaped mini-mark
  with crown tendrils top and bottom — a small standalone mark, no
  container — not a plain geometric shape (e.g. not a simple
  circle/pill).
- **Mobile Hamburger Toggle:** two-horizontal-line glyph, no surrounding
  button surface.
- **Mobile Close Control:** an "X" glyph in the toggle's same position
  when open — a state-swap of the same control, not a separate element.
- **Mobile Navigation Overlay:** full-screen flat surface (same
  background as the rest of the site), links as plain centered text, no
  button chrome.
- **Active Screen Indicator, desktop:** revised from an earlier
  series of per-link pill/blob treatments (each read as diffuse or
  detached in live rendering, developer visual review) to a distinct
  crest element — the divider line itself, fused into a small spiky
  ornamental shape — positioned above whichever of "about"/"contact"
  is currently active. Distinct from, and in addition to, the compact
  logomark's own fixed presence in the divider's center gap (above),
  which this doesn't touch or replace. Since neither link has a fixed
  pixel position (fluid text width, locale-dependent), the crest's
  horizontal position tracks the active link's own measured center at
  runtime. Sized to sit clear of the active link's own text — it must
  never overlap or dim it (an earlier, larger sizing did overlap;
  legibility is unaffected by construction, not by opacity tuning).
  Applies only to "about"/"contact"; the wordmark never carries it, and
  Introduction shows no indicator at all (Hero's own presence already
  signals it — a deliberate, confirmed interpretation of Feature
  Contract Commitment 5 AC1, not a gap).
- **Active Screen Indicator, mobile overlay:** since the overlay stacks
  links vertically rather than along a divider line, the equivalent
  indicator here is a vertical line positioned immediately to the left
  of whichever link is active — a distinct per-device realization
  confirmed by the user, not the same crest element scaled down.

## Colour Application

- Background: plain, warm near-black base (Figma: solid #221e24 on
  every screen's frame) — the same base used everywhere, no gradient.
- Wordmark and nav links: the project's soft off-white foreground
  (`#ebeaec`, observed directly in Figma), no accent-gradient treatment.
- The compact logomark icon (Ornamental Logo): carries the site's
  confirmed lilac-to-purple gradient (Project UX Visual Foundations),
  not the plain off-white used for the wordmark/links — corrects this
  Definition's previous grouping of the icon with the off-white
  elements, which didn't match Figma (observed directly on the "logo
  smallll" instance: light lilac gradient tones, not flat off-white).
- The divider line: `#e6bdfb`, a light lilac accent tint (observed
  directly in Figma, both segments, on every screen checked) — not a
  neutral off-white/near-black line as previously assumed here; in the
  same accent family as, but distinct from, the Ornamental Mark/Logo's
  own gradient and the flat lilac accent colour Project UX assigns to
  interactive/focus states.
- No colour differentiation observed between "about" and "contact," or
  between any nav element and the shared near-black background.
- Active-indicator colour, desktop crest: a small internal gradient —
  bright at the crest's own center (the site's off-white foreground,
  `#ebeaec`) fading to the divider line's own colour (`#e6bdfb`) at its
  edge — so the shape reads as a lit-up core fused with, and colour-
  matched to, the line it emerges from, plus a soft glow (blurred, not
  a second gradient layer) in that same divider colour. Revised from an
  interim flat-`$color-accent` treatment (used on an earlier, now-
  discarded pill/blob anatomy) once the crest concept itself was
  confirmed.
- Active-indicator colour, mobile overlay vertical line: solid
  `$color-accent` (`#9b7fd4`, lilac) at full opacity — reuses Project
  UX's own flat lilac tone, already established there as the site's
  accent colour for interactive/focus states. Link text colour remains
  unchanged (off-white) in both realizations.

## Borders, Radii, Shadows, Surfaces

None identified — no bordered/surfaced elements in the nav bar or mobile
overlay, consistent with the site's chrome-free style.

## Iconography

- Hamburger toggle: two horizontal lines (observed).
- Close control: two crossed lines forming an "X" (observed, "Menu -
  mobile").
- No icons for "about"/"contact" or the wordmark — plain text only.
- Compact logomark (Ornamental Logo): the same asset already used on
  desktop, now also rendered on mobile's closed bar (Spacing and
  Layout — Mobile).
- Active Screen Indicator crest, desktop: a distinct decorative asset
  (`nav-active-crest.svg`) from the compact logomark — a symmetric
  spiked crest with long thin tapering tails, cropped to just the crest
  cluster since the real divider line already provides continuity on
  either side.

## Visual States and Responsive Layout

- Mobile Overlay Closed / Open: two concrete realizations as above
  (toggle vs. close glyph, collapsed bar vs. full-screen link list) —
  Feature UX's Mobile Overlay states.
- Active Screen Indicator: `Inactive` (no indicator) / `Active` —
  desktop's realization is the crest fused with the divider line above
  the active link; the mobile overlay's is the vertical line beside it
  (Component Anatomy and Variants, two distinct per-device
  realizations, not one element resized). Never on the wordmark.
- Desktop vs. mobile: two distinct concrete layouts, not a resize/reflow
  of one layout — matching Feature UX's device-distinct treatment.

---

*Created: 2026-09-07*
