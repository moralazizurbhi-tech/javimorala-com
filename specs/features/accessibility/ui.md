# Feature UI Definition: Accessibility

**Status:** Approved

## UI Scope

Realizes Feature UX's four components — Focus Indicator Style,
Accessible Name & Landmark Structure, Nav Current-State AT Exposure,
Document Language Sync — using Project UX's Visual Foundations as shared
vocabulary. Excludes exact ARIA attribute names/technical implementation
(Feature Technical Design), and the motion character of the focus
transition (owned by `motion-interaction`).

## Typography Application

No new typography. Accessible name/label text and semantic structure
(headings/landmarks) reuse each Feature's own already-defined typography
treatment; this Feature introduces no visible text of its own.

## Spacing and Layout

Focus indicator uses a small offset from the focused element's own edge
(not inset), so it reads as distinct from the element rather than
absorbed into it — applied uniformly to every interactive element type,
not customized per component. Nav AT-state exposure, accessible-name/
landmark structure, and document-language sync introduce no visible
layout footprint.

## Component Anatomy and Variants

- **Focus Indicator** — a visible offset outline/ring around the
  focused element, applied identically to every interactive element
  (nav links, language switcher, mobile toggle, Direct Contact CTA,
  Presence Links).
- **Nav Current-State AT Exposure** — no new visual component; an
  AT-only signal layered onto Section Navigation's existing nav-link
  markup and Motion & Interaction's existing indicator, invisible to
  sighted visitors beyond what's already shown.
- **Accessible Name & Landmark Structure / Document Language Sync** — no
  visible component; structural/semantic only.

## Colour Application

The focus indicator uses the site's accent colour (the vivid gradient/
colour Visual Foundations reserves for emphasis), not the near-black/
off-white base pair — consistent with Visual Foundations' "clearly
visible, on-brand focus state." Exact colour/token value: Pending,
inherited from the Styling System, which has not fixed concrete colour
token values yet — consistent with sibling Features' own UI Definitions.
Whatever value is eventually fixed must independently satisfy Contract
Commitment 3's ≥3:1 ratio against every background it appears on
(near-black base and gradient-accent areas alike) — a constraint on the
token's value, not a value fixed here.

## Borders, Radii, Shadows, Surfaces

Focus indicator realized as a border/outline (ring) only — no shadow, no
filled surface. Its radius matches whatever radius the focused element
itself already has, so it reads as belonging to that element rather than
a generic system default.

## Iconography

None new.

## Visual States and Responsive Layout

- **Focus State** `Unfocused` / `Focused`: no ring → visible ring per
  Colour Application above. Identical on desktop and mobile (mobile
  still receives focus from external keyboards, switch devices, or AT,
  even though touch itself doesn't trigger it).
- **Nav Current-Section AT State**: no visible change beyond what Motion
  & Interaction's own indicator already shows sighted visitors; the
  AT-perceivable signal exists at the structural layer in both the
  desktop nav and the mobile overlay presentation.
- **Document Language State**: no visible UI.
- Whether the `Unfocused → Focused` transition animates is
  `motion-interaction`'s decision, not fixed here — this Definition only
  requires the focused end-state be visible.

---

*Created: 2026-09-07*
