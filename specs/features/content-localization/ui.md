# Feature UI Definition: Content Localization

**Status:** Approved

## UI Scope

Realizes Feature UX's conclusion that this Feature introduces no screen,
no component, and no visible state of its own — it silently resolves the
active language and renders the existing Introduction, Personal
Narrative, and Connection screens correctly in it, with no perceivable
transition, indicator, or fallback treatment (Feature UX's Screens,
Interaction States, and UX Constraints sections). Consequently this
Feature has no material interface of its own to specify: the concrete
typography, spacing, colour, and layout that make each screen's content
readable in a given language are realized by that content's own owning
Feature's UI Definition (e.g. `about-narrative`'s UI Definition for the
Personal Narrative screen), not here. An external Figma reference was
checked for any global style tokens relevant to this Feature's boundary;
it contains no localization-specific frame (no language switcher, no
multi-language variant) and confirms no additional UI evidence applies.

## Typography Application

None. No typography value is applied or extended by this Feature; each
domain Feature's own UI Definition applies Project UX's typography
tiers to its own content, independent of which language is active.

## Spacing and Layout

None. No layout is introduced or altered by this Feature; each screen's
spacing/layout is realized by that screen's owning Feature.

## Component Anatomy and Variants

None. This Feature defines no component of its own (Feature UX:
"consumes ... the shared UI Components ... without redefining them").

## Colour Application

None. No colour value is applied or extended by this Feature.

## Borders, Radii, Shadows, Surfaces

None identified — no surfaced element belongs to this Feature.

## Iconography

None identified — no icon belongs to this Feature.

## Visual States and Responsive Layout

- **Resolved (steady state)** — the only state Feature UX identifies; it
  has no distinct visual realization of its own, since it is
  indistinguishable from each screen's normal rendering in the active
  language (Feature UX: "presented as the same steady, fully-rendered
  state").
- No responsive variation belongs to this Feature — desktop/tablet/mobile
  realization is each screen's owning Feature's decision, unaffected by
  which language is active.

---

*Created: 2026-09-07*
