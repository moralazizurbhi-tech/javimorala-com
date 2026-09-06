# Feature UI Definition: About Narrative

**Status:** Approved

## UI Scope

Realizes Feature UX's Personal Narrative composition — narrative text
leading, two personal photos placed alongside it — informed by an
explicitly-provided external reference (legacy Figma "About"/"About -
mobile" frames), treated as evidence, not persistent project knowledge.
Project UX's Visual Foundations don't yet define concrete type/spacing/
colour tokens, so most values below are Feature-specific extensions, not
traced to an existing token.

## Typography Application

- All six narrative blocks (the five confirmed paragraphs plus the
  closing AI-assisted-development line) render at the same body-copy
  tier, same weight — no special "greeting" display size for paragraph
  1, and no visual distinction for the AI-development line; both realize
  Feature UX's "narrative leads" and "AI line stays subordinate/quiet"
  intent, applying Project UX's "narrative body copy" typography tier.

## Spacing and Layout

### Desktop/tablet

- Two-column arrangement: the narrative text renders in a comfortable
  reading-width column; the two photos are stacked vertically in a
  companion column alongside it, running roughly the height of the text
  block — the concrete realization of Feature UX's "photos alongside the
  narrative, not preceding it."
- Generous, uncluttered spacing within and between the two columns, per
  Project UX's spacing-scale principle.

### Mobile

- Single column: paragraph 1 first, then both photos stacked together,
  then the remaining narrative paragraphs continue below — placing the
  photos adjacent to the narrative's opening rather than isolated at the
  very top or very bottom of the composition, the mobile realization of
  "alongside."

## Component Anatomy and Variants

- Narrative Text: six discrete paragraph blocks, one consistent style
  throughout, no heading/label component.
- Personal Photos: two plain image containers, presented simultaneously;
  no card/border framing — the discarded skills-pitch card pattern is not
  reintroduced here.

## Colour Application

- Narrative text, including the AI-development line: base off-white
  foreground colour throughout, no accent gradient — keeps the AI line
  visually unremarkable, consistent with its subordinate positioning
  (Contract Commitment 2).
- Photos: no colour treatment applied by this Feature; the image content
  itself, once selected, provides its own colour.

## Borders, Radii, Shadows, Surfaces

None identified — no bordered/surfaced elements in this composition.

## Iconography

None identified — no icons needed for this Feature's components.

## Visual States and Responsive Layout

- **Composition complete**: the single settled state described above; no
  partial-composition state exists (Feature UX has no interaction
  states; Contract Commitment 1 forbids a partial render).
- Desktop/tablet vs. mobile: two distinct realizations as above, not a
  single fluid reflow — each still presents all three content pieces
  (Contract Commitment 1).

---

*Created: 2026-09-06*
