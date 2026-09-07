# Feature UI Definition: Direct Contact

**Status:** Approved

## UI Scope

Realizes Feature UX's Connection-screen composition — contact heading,
CTA link, farewell lines, composed alongside Presence Links (secondary) —
informed by an explicitly-provided external reference (Figma "Contact" /
"Contact - mobile" frames, `22:2` / `22:126`), treated as evidence, not
persistent project knowledge. Project UX's Visual Foundations don't yet
define concrete type/spacing/colour tokens, so most values below are
Feature-specific extensions, mapped qualitatively to the existing
typography tiers where they visibly correspond. Excludes the ornamental
mark, nav, and Presence Links' own definition (only their observed
position/scale within this composition is noted).

## Typography Application

- Contact heading ("let's get in touch"): small body/label-tier text,
  regular weight, rendered exactly in the confirmed lowercase (no
  capitalization transform) — Project UX's "compact nav/label text" tier.
- CTA link text: rendered as "Send Me An E-Mail" — a capitalized display
  treatment over the confirmed lowercase content ("send me an e-mail") —
  at the project's largest expressive display scale, bold weight: the
  same display tier Project UX assigns to Hero's headline ("large-scale
  display treatment for impression moments"), applied here to the CTA
  itself rather than a headline. This is the single largest, most
  visually dominant element on the screen — the concrete realization of
  Contract Commitment 4's "CTA takes functional precedence," achieved
  through scale rather than position alone.
- Farewell line 1 ("thanks for your visit!"): small text, bold weight.
- Farewell line 2 ("you can follow my socials too"): small text, regular
  weight, directly beneath line 1 — a bold-lead/regular-follow pairing.

## Spacing and Layout

### Desktop/tablet

- Content is left-aligned within the frame, with the same generous
  horizontal margin/gutter used elsewhere on the site.
- Vertical stack, top to bottom: heading label (tight above the CTA,
  headline-plus-label pairing) → the oversized CTA display text (the
  screen's visual center of gravity) → a large empty vertical gap → the
  farewell line pair → Presence Links (composed alongside, horizontally
  arranged with a gap between entries) at the very bottom.
- The large gap between the CTA and the farewell/Presence-Links cluster
  visually separates the primary CTA from the secondary footer-like
  group — the concrete realization of "CTA primary, Presence Links
  secondary."

### Mobile

- Same vertical order; the CTA display text reflows from one line to two
  ("Send Me An" / "E-Mail") within the narrower column, at the same
  relative scale/weight — reflow, not shrinkage, preserving its
  dominance.
- Farewell block and Presence Links retain the same grouping/order,
  single column, comfortable margins.

## Component Anatomy and Variants

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

## Colour Application

- Contact heading, CTA text, and both farewell lines: the project's soft
  off-white foreground, no accent gradient — the CTA needs no
  colour-based emphasis since scale alone establishes its primacy.
- Presence Links text (Observed, not this Feature's own token to
  define): a distinct, lavender/accent-tinted colour — visibly different
  from the plain off-white used everywhere else in this composition.
  This is the concrete visual realization of the UX Constraint that
  Presence Links must read as distinct from the CTA; the exact colour
  token value is Pending, belonging to `presence-links`' own Feature UI
  (or a shared Visual Foundations token not yet named) — this Feature
  only asserts the differentiation, not the literal value.

## Borders, Radii, Shadows, Surfaces

None identified — no bordered/surfaced elements in this composition,
consistent with the site's chrome-free style.

## Iconography

None observed in this reference — Presence Links appear as plain text
labels, not icons, here.

## Visual States and Responsive Layout

- Single settled state — no partial/loading/interaction state exists
  (Feature UX has none; Contract Commitment 1 forbids a partial render).
- Desktop/tablet vs. mobile: two concrete realizations as above — same
  content, same relative scale/weight/order, reflowed rather than
  resized down.

---

*Created: 2026-09-07*
