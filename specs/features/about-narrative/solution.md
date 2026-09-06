# Feature Solution: About Narrative

**Status:** Approved

## Solution Intent

### Functional Objective

Present Javi's authentic personal/professional identity — narrative text,
one or two personal photos, and a skills/experience timeline — together
with a small, subordinate note that the site was built through
AI-assisted development, as one coherent, fully static composition,
resolving the depth-of-identity problem identified in Feature Context.

## Solution Behaviour

### Behaviours

- The visitor is presented the complete About Narrative composition —
  narrative text, photo(s), skills/timeline, and the AI-assisted-
  development note — as static content requiring no interaction to
  access; nothing is hidden behind an interactive trigger.
- Narrative text, timeline entries, and the AI note render in the
  visitor's active language, as resolved by `content-localization`; this
  Feature does not decide language or reactively re-render on a later
  language change.
- Photos are presented simultaneously (not toggled, paged, or enlarged on
  interaction) if two are used.
- The skills/experience timeline is static content, read top to bottom,
  with no expand/filter interaction.

### Flows

- Visitor reaches the Personal Narrative screen (via scroll or
  `section-navigation`'s "about" link) → the complete About Narrative
  composition is available immediately, with no interaction required to
  reveal any part of it → visitor reads at their own pace and continues
  (scrolls onward, uses `section-navigation`, or leaves). This Solution
  does not evaluate that outcome as success/failure, consistent with
  Context's self-expression framing.

### Rules

- All four content pieces (narrative text, photo(s), skills/timeline, AI
  note) are always presented together as one composition; none is
  conditionally shown or hidden.
- The AI-assisted-development note is always positioned after or
  alongside the narrative — never before it — preserving its subordinate
  role.
- No content piece requires a visitor action (click, hover-to-reveal,
  expand) to become visible.
- Content reflects whatever `content-localization` resolves at render
  time; this Feature does not decide language.

### States and Transitions

None identified — every element in this Feature's composition renders
directly and statically; no interactive substates.

### Constraints

- The composition's static nature is a solution-level requirement, not an
  implementation shortcut — narrows Context's inherited no-backend/no-CMS
  constraints into an explicit solution rule.
- The AI-assisted-development note's subordinate positioning (after/
  alongside narrative, never before) is a solution rule, not only a later
  visual-styling concern.

### Boundaries

#### Included

- Composing narrative text, photo(s), skills/timeline, and the AI note
  together as one static, always-fully-visible composition.
- The ordering rule keeping the AI note after/alongside the narrative,
  never before it.

#### Excluded

- Any interactive/stateful behavior on photos or timeline (carousel,
  lightbox, expand, filter).
- Entrance/reveal motion, timing, sequencing — owned by
  `motion-interaction`.
- Specific visual/device treatments and exact positional layout — owned
  by Feature UX/UI.
- Actual narrative copy, note wording, final photo assets, and timeline
  entries — content, decided in UX's "Content and Assets."
- Nav behavior.
- Reactive re-render on runtime language change.

---

*Created: 2026-09-06*
