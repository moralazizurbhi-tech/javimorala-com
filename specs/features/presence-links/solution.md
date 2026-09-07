# Feature Solution: Presence Links

**Status:** Approved

## Solution Intent

### Functional Objective

Provide the visitor a consistent, always-visible set of links to Javi's
external profiles, opening each on a single activation, presented as a
light-touch glimpse at Introduction and the fuller presentation at
Connection — resolving Feature Context's "wants a lower-commitment way to
connect/follow" problem at both visitor moments.

## Solution Behaviour

### Behaviours

- The link set is presented statically and always visible wherever it's
  composed in; no interaction required to reveal it.
- Activating any individual link opens that external profile — a single
  action, no on-site form, no data collection.
- Link labels render in the visitor's active language via
  `content-localization`.
- The same link set (same profiles, same identity/order) is presented
  consistently at both placements — no divergent subset.

### Flows

- Visitor reaches Introduction (page load) → Hero content plus a
  light-touch presence-links glimpse are visible → visitor either
  activates a presence link (hand-off to that external profile) or
  continues without interacting.
- Visitor reaches the Connection screen (scroll or `section-navigation`'s
  "contact" link) → CTA, the fuller presence-links presentation, and the
  farewell line are all visible → visitor either activates a presence
  link, activates the CTA, or takes no action → end of the single-page
  experience.

### Rules

- Each link resolves in exactly one external hand-off action — no
  multi-step flow, no in-site confirmation state.
- Each link opens in a new browser tab, preserving the visitor's position
  in the single-page experience.
- No form fields, no visitor data collection, at any point.
- The same set of profile links must be used at both placements — no
  per-placement content divergence.
- At each placement, presence links stay functionally secondary to that
  placement's own primary element (Hero's headline/mark/scroll-cue at
  Introduction; the CTA at Connection) — exact visual styling is UX/UI's
  concern.

### States and Transitions

None — each link is a stateless external hand-off; control passes to the
browser/OS, no in-page loading/confirmation/success state.

### Constraints

- Consistent single link-set across both placements is a solution-level
  requirement, narrowing Context's "same identity/behavior consistently
  across both" into an explicit rule.
- Single external-link activation per profile is a solution-level
  requirement, narrowing Context's inherited "no backend/no on-site form"
  constraint.

### Boundaries

#### Included

- Each link's single-action external hand-off behavior, opening in a new
  browser tab.
- Presenting the same link set consistently at both placements, each
  staying functionally secondary to its host's own primary element.

#### Excluded

- The Hero moment's own composition/coordination — `hero-presentation`'s
  own solution.
- The Connection screen's own CTA/farewell-line behavior —
  `direct-contact`'s own solution.
- The actual set of profiles/platforms and link copy/labels — Feature
  UX's Content and Assets.
- Detailed visual/positional layout — Feature UX/UI.
- Entrance/reveal motion, timing — `motion-interaction`.
- Nav behavior — `section-navigation`.
- Reactive re-render on runtime language change —
  `content-localization` resolves at render time only.

---

*Created: 2026-09-07*
