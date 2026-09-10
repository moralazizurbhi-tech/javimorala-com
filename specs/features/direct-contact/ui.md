# Feature UI Definition: Direct Contact

**Status:** Approved

## UI Scope

Realizes Feature UX's Connection-screen composition — section eyebrow
header (desktop/tablet only), contact heading, CTA link, farewell lines,
composed alongside Presence Links (secondary) — filling exactly one
viewport's height. Informed by an explicitly-provided external reference
(Figma "Contact" / "Contact - mobile" frames, `22:2` / `22:126`), treated
as evidence, not persistent project knowledge. Project UX's Visual
Foundations now define concrete typography (a single rounded, geometric
sans-serif family, weight-driven hierarchy) and colour (warm near-black/
off-white base, lilac-to-purple gradient reserved for emphasis) at the
outcome level; exact sizing ratios and positions below remain
Feature-specific extensions. Also realizes the Ornamental Logo's
large-scale decorative background placement (Feature UX) — a distinct,
scaled-up instance of the same compact Ornamental Logo used in the nav
bar (not Hero's separate Ornamental Mark asset) — carrying Project UX's
confirmed lilac-to-purple gradient. Excludes the Ornamental Logo's own
visual design/asset, nav,
and Presence Links' own definition (only their observed position/scale
within this composition is noted).

## Typography Application

- Section Eyebrow Header ("let's get in touch"): measured height 74 —
  exact match to About Narrative's "get to know me." eyebrow tier; same
  light/compact weight family. Desktop/tablet only.
- Contact heading ("let's get in touch", CTA-adjacent): measured height
  37 — a compact sub-tier between Hero's scroll-cue/presence-links tier
  (28) and its nav-link tier (46); within Project UX's light/compact
  weight family, exact size a Feature-specific extension; rendered
  exactly in the confirmed lowercase (no capitalization transform).
- CTA link text: rendered as "Send Me An E-Mail" — a capitalized display
  treatment over the confirmed lowercase content ("send me an e-mail") —
  measured height 185 desktop, 160 mobile (two-line reflow); the desktop
  height is an exact match to Hero's dominant headline tier (185),
  confirming Project UX's heavy/bold display weight assignment with
  direct measurement. This is the single largest, most visually dominant
  element on the screen — the concrete realization of Contract
  Commitment 4's "CTA takes functional precedence," achieved through
  scale rather than position alone.
- Farewell line 1 ("thanks for your visit!") and Farewell line 2 ("you
  can follow my socials too"): measured height 28 on both desktop and
  mobile — exact match to Hero's compact tier (scroll-cue/presence-links,
  28); bold-lead/regular-follow pairing, line 2 directly beneath line 1.

## Spacing and Layout

### Desktop/tablet

- The whole composition fills exactly one viewport's height — Figma
  grounding: the "Contact" frame (1728×1117) is the same size as Hero's
  "Home" frame, confirming a full-viewport treatment, not a taller,
  scrolled block.
- Content is left-aligned within the frame, with the same generous
  horizontal margin/gutter used elsewhere on the site.
- Vertical stack, top to bottom: Section Eyebrow Header (topmost,
  divider-flanked) → generous space, distributed to fill the fixed
  viewport rather than organic scroll-based spacing → heading label
  (tight above the CTA, headline-plus-label pairing) → the oversized CTA
  display text (the screen's visual center of gravity) → a large empty
  vertical gap → the farewell line pair → Presence Links (composed
  alongside, horizontally arranged with a gap between entries) at the
  very bottom.
- The large gap between the CTA and the farewell/Presence-Links cluster
  visually separates the primary CTA from the secondary footer-like
  group — the concrete realization of "CTA primary, Presence Links
  secondary."
- Ornamental Logo (large-scale ambient instance): Figma grounding —
  measures ~1205×1878, taller than the Contact viewport itself (1117),
  bleeding vertically beyond the frame's visible bounds. Rendered at
  extremely low opacity — a near-invisible ghost/watermark texture, not
  a moderately-visible centerpiece — as pure ambient atmosphere with no
  positional relationship to the CTA, heading, or farewell text (per
  explicit confirmation). Rendered as a background layer, behind all
  Connection content (eyebrow, CTA, farewell, Presence Links) in
  stacking order, so it never interferes with legibility. Distinct from
  the separate, small, opaque Ornamental Logo instance already in the
  nav bar above this screen.

### Mobile

- Ornamental Logo (large-scale ambient instance): present, contrary to
  this Definition's previous claim of no mobile equivalent — Figma
  grounding: measures ~541×844, exactly the mobile viewport's height,
  wider than its 390-unit width so it bleeds off both edges. Same
  extremely low-opacity ambient treatment as desktop, no positional
  relationship to other content.
- Section Eyebrow Header: omitted — Figma's mobile frame has no separate
  eyebrow instance; only the CTA-adjacent Contact Heading appears.
- Same vertical order otherwise; the CTA display text reflows from one
  line to two ("Send Me An" / "E-Mail") within the narrower column,
  measured height 160 vs. 185 desktop — proportionally smaller but still
  the single dominant tier, reflow rather than shrinkage preserving its
  dominance.
- Farewell block and Presence Links retain the same grouping/order,
  single column, comfortable margins.
- Composition still fills exactly one viewport (390×844 frame matches a
  standard mobile viewport size).

## Component Anatomy and Variants

- Section Eyebrow Header: plain text label flanked by two short
  horizontal rule marks (Figma "Line 3"/"Line 4"), off-white;
  desktop/tablet only, no mobile variant.
- Contact Heading: plain text label, no icon or decoration.
- Contact CTA/Mechanism: realized as the oversized display-type text
  itself acting as the link — no button chrome, border, or pill shape;
  consistent with the site's chrome-free, typography-driven aesthetic
  (mirrors About Narrative's "no bordered/surfaced elements").
- Farewell Line: two-line text stack (bold lead + regular follow), no
  icon.
- Presence Links (composed alongside; not this Feature's own
  definition): observed as plain inline text links, horizontally
  arranged with a gap — no icons in this reference.
- Ornamental Logo (large-scale ambient instance): the same compact mark
  family used in the nav bar and reused as About's own background
  texture, scaled up significantly and rendered at extremely low
  opacity as ambient background texture — not Hero's separate
  Ornamental Mark asset; rendered as a background layer, non-interactive;
  its own design is out of this Feature's scope (Feature Definition
  boundary).

## Colour Application

- Background: plain, warm near-black base (Figma: solid #221e24 on both
  desktop and mobile frames) — the same base used across every screen,
  no gradient.
- Section Eyebrow Header, contact heading, CTA text, and both farewell
  lines: the project's soft off-white foreground, no accent gradient —
  the CTA needs no colour-based emphasis since scale alone establishes
  its primacy.
- Presence Links text (Observed, not this Feature's own token to
  define): a distinct, lavender/accent-tinted colour — visibly different
  from the plain off-white used everywhere else in this composition.
  This is the concrete visual realization of the UX Constraint that
  Presence Links must read as distinct from the CTA; the exact colour
  token value is Pending, belonging to `presence-links`' own Feature UI
  (or a shared Visual Foundations token not yet named) — this Feature
  only asserts the differentiation, not the literal value.
- Ornamental Logo (large-scale ambient instance): carries Project UX's
  confirmed lilac-to-purple gradient at extremely low opacity — the
  asset is an SVG; the gradient lives on it, not on the page
  background.

## Borders, Radii, Shadows, Surfaces

None identified beyond the Section Eyebrow Header's flanking rule marks
noted above — no bordered/surfaced elements otherwise, consistent with
the site's chrome-free style.

## Iconography

None observed in this reference — Presence Links appear as plain text
labels, not icons, here.

## Visual States and Responsive Layout

- Single settled state — no partial/loading/interaction state exists
  (Feature UX has none; Contract Commitment 1 forbids a partial render).
- Desktop/tablet vs. mobile: two concrete realizations as above, both
  filling exactly one viewport; the only structural difference is the
  Section Eyebrow Header's presence (desktop/tablet) vs. absence
  (mobile), per Feature UX — the rest reflows rather than resizing down.
- The ornamental mark's presence/absence carries no completeness
  requirement of its own (Commitment 6) — Direct Contact has no joint
  multi-element completeness invariant the way Hero does; only the
  CTA's own presence is committed (Commitment 1).

---

*Created: 2026-09-07*
