# Feature UI Definition: About Narrative

**Status:** Approved

## UI Scope

Realizes Feature UX's Personal Narrative composition — narrative text
leading with an elevated opening-line emphasis, two personal photos with
contrasting orientations placed alongside it — informed by an
explicitly-provided external reference (Figma "About"/"About - mobile"
frames), treated as evidence, not persistent project knowledge. Project
UX's Visual Foundations now define concrete typography (a single
rounded, geometric sans-serif family, weight-driven hierarchy) and
colour (warm near-black/off-white base + lilac-to-purple gradient
reserved for emphasis) at the outcome level; exact sizing ratios and
positions below remain Feature-specific extensions, not traced to an
existing token. Also realizes the Ornamental Logo's large-scale
decorative background placement (Feature UX) — the same asset family
used in the nav bar and at Direct Contact's Connection screen, distinct
from Hero's separate Ornamental Mark — carrying Project UX's confirmed
lilac-to-purple gradient.

## Typography Application

- Opening line ("I'm Javi. I like making things...") — Project UX's
  heavy/bold display weight, sized as an elevated but text-length-
  appropriate extension (not a literal transfer of Hero's 185-unit
  headline size, since this is a full sentence, not a two-word greeting),
  realizing Feature UX's opening-line emphasis.
- Paragraphs 2-6, including the AI-development line, render at one
  consistent, shared tier — Project UX's medium-weight section/body-copy
  typography; measured reference from the Figma source: body-paragraph
  line height (~55-60 units) closely matches Hero's secondary headline
  tier (60 units) — the same weight-driven scale recurring across
  Features. Realizes Feature UX's "AI line stays subordinate/quiet"
  intent alongside the rest of the lower tier.

## Spacing and Layout

### Desktop/tablet

- Narrative text renders in a comfortable reading-width column.
- The two photos (contrasting orientations — one landscape-leaning, one
  portrait-leaning) are staggered at different vertical offsets rather
  than aligned in a uniform companion-column row: the portrait photo is
  anchored near the opening line, the landscape photo positioned lower
  alongside a later paragraph — the concrete, more experimental
  realization of Feature UX's "photos alongside the narrative, not
  preceding it" and its contrasting-orientation variety.
- Generous, uncluttered spacing within and between elements, per Project
  UX's spacing-scale principle.
- Ornamental Logo (large-scale ambient instance): Figma grounding —
  measures ~668×1234 (node "logo smallll 2"), taller than the frame's
  own visible content, bleeding beyond it. Rendered at extremely low
  opacity as ambient background texture with no positional relationship
  to any specific paragraph or photo (per Feature UX). Rendered as a
  background layer, behind all narrative content in stacking order.

### Mobile

- Single column: the opening line first, at its elevated size.
- The portrait photo directly below the opening line, proximate to the
  greeting.
- The remaining narrative paragraphs continue below.
- The landscape photo placed further down, alongside a later paragraph
  rather than immediately paired with the portrait photo — the mobile
  realization of the same staggered, contrasting-orientation placement.
- Ornamental Logo: same ambient treatment as desktop; exact mobile
  scale/crop not independently confirmed in this reference — Pending,
  left to a future refinement, consistent with sibling Features' own
  Pending markers for device-specific mark crops.

## Component Anatomy and Variants

- Narrative Text: six discrete paragraph blocks; the opening block at the
  elevated display tier, the remaining five (including the AI line) at
  one shared body tier — no heading/label component.
- Personal Photos: two plain image containers with contrasting
  orientations (landscape + portrait), staggered rather than uniformly
  paired; presented simultaneously; no card/border framing — the
  discarded skills-pitch card pattern is not reintroduced here.
- Ornamental Logo (large-scale ambient instance): the same compact mark
  family used in the nav bar and at Direct Contact, scaled up
  significantly and rendered at extremely low opacity as ambient
  background texture — not Hero's separate Ornamental Mark asset; its
  own design is out of this Feature's scope.

## Colour Application

- Narrative text, including the opening line and the AI-development
  line: base off-white foreground colour throughout, no accent gradient
  — the opening line's emphasis comes from size/weight alone, not
  colour. Keeps the AI line visually unremarkable, consistent with its
  subordinate positioning (Contract Commitment 2).
- Photos: no colour treatment applied by this Feature; the image content
  itself, once selected, provides its own colour.
- Ornamental Logo (large-scale ambient instance): carries Project UX's
  confirmed lilac-to-purple gradient at extremely low opacity — the
  asset is an SVG; the gradient lives on it, not on the page background.

## Borders, Radii, Shadows, Surfaces

None identified — no bordered/surfaced elements in this composition.

## Iconography

None identified — no icons needed for this Feature's components.

## Visual States and Responsive Layout

- **Composition complete**: the single settled state described above,
  including the opening-line emphasis and staggered photo placement; no
  partial-composition state exists (Feature UX has no interaction
  states; Contract Commitment 1 forbids a partial render).
- Desktop/tablet vs. mobile: two distinct realizations as above, not a
  single fluid reflow — each still presents all three content pieces
  (Contract Commitment 1), each preserving the opening-line emphasis and
  photo orientation variety per Feature UX's constraint.
- The Ornamental Logo's presence/absence carries no completeness
  requirement of its own (Commitment 5) — only narrative text, photo(s),
  and the AI note are covered by Commitment 1's completeness guarantee.

---

*Created: 2026-09-06*
