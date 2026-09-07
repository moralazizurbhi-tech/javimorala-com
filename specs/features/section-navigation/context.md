# Feature Context: Section Navigation

**Status:** Approved

## Problem

The site is a single, continuously-scrolling page across three screens
(Introduction, Personal Narrative, Connection), reached primarily by free
scrolling. A visitor has no way to jump directly to a screen without
scrolling through everything, and — once scrolling or after using any
shortcut — has no persistent cue for which screen they're currently
viewing. This gap exists identically on desktop and mobile, which have
different interaction affordances (inline bar vs. hamburger-triggered
overlay) that must both solve it equivalently.

## Motivation

Directly serves Project UX's confirmed decision to Preserve the persistent
nav + mobile overlay pattern from the reference design, and its Experience
Overview statement that "a persistent, minimal navigation keeps the
visitor oriented at every point." As a Supporting/Enabling Feature (per
catalog classification), its value isn't self-expression on its own — it's
making the rest of the self-expression experience (`hero-presentation`,
`about-narrative`, `direct-contact`) reachable and legible.

## Scope

### Included

- A visitor needing a direct, non-scroll way to reach any of the three
  screens from anywhere in the experience.
- A visitor losing track of which screen they're currently viewing, during
  free scroll or after using the nav.
- This mechanism needing to work equivalently on desktop (inline bar) and
  mobile (hamburger overlay), not as a plain responsive reflow of one
  design.
- Hosting the language override control's placement on this same
  persistent surface, so it's reachable wherever the nav is (not the
  switching mechanism itself).

### Excluded

- What a visitor finds once they reach a screen — each destination
  screen's own problem (`hero-presentation`, `about-narrative`,
  `direct-contact`).
- Resolving or switching which language content displays in
  (`language-override` / `content-localization`'s problem).
- The site's motion/interaction feel in general (`motion-interaction`'s
  problem).
- `presence-links`' reachability — it has no independent nav anchor (per
  Feature Definition's flagged boundary), so it isn't part of this
  Feature's wayfinding problem.

## Constraints

- Strictly single-page, anchor-based navigation — "about" and "contact"
  are scroll destinations, never separate routes (Project UX Navigation
  philosophy). This rules out any client-side-routing-based solution.
- Must be reachable from anywhere, on every screen and device (Project UX
  Constraint).
- Must work across the full device range with genuinely distinct
  desktop/mobile treatments (inline bar vs. full-screen overlay), not just
  a responsive reflow.
- Full keyboard operability, visible focus states, and assistive-
  technology compatibility (`accessibility`, cross-cutting).
- Inherited from project level: solo effort, no fixed deadline, static-
  generated architecture with no backend.
- No "must feel instant" performance constraint declared — left
  open/unconfirmed, consistent with how `hero-presentation`'s Context left
  the same question open.

## Known Dependencies

- **`hero-presentation`**, **`about-narrative`**, **`direct-contact`** —
  the destination screens this Feature must make reachable; their own
  content/composition isn't this Feature's problem.
- **`language-override`** — this Feature's problem includes making its
  control reachable everywhere the nav is; the override mechanism itself
  is `language-override`'s problem.
- **`content-localization`** — nav labels must resolve into the visitor's
  active language.
- **`motion-interaction`** — governs overlay open/close and
  active-indicator motion; interacts with this Feature without this
  Feature defining that motion.
- **`accessibility`** — cross-cutting; this Feature's reachability problem
  includes being keyboard-operable and focus-visible.

---

*Created: 2026-09-07*
