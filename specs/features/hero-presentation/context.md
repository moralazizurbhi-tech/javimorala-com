# Feature Context: Hero Presentation

## Problem

Visitors arrive at the site with no prior context about who Javi is. Two
related risks motivate this Feature: (1) a visitor may leave before
grasping who Javi is or why he's worth attention (bounce risk), and (2) a
weak or generic-feeling arrival moment undercuts the site's goal of
credibly demonstrating design/development capability and personal identity
(credibility risk).

## Motivation

A deliberate first impression directly serves the project's vision of
being a credible, self-owned professional/personal reference point: it
determines whether a visitor continues into About/Contact or leaves, and
it's the first data point shaping their perception of Javi's capability
and identity.

## Scope

### Included

- The problem of the visitor's first few seconds of arrival, before any
  scrolling or navigation choice — communicating identity and value
  quickly enough to prevent bounce, and making a credible-feeling
  impression.

### Excluded

- The problem of wayfinding through the rest of the site
  (`section-navigation`'s problem).
- The problem of establishing detailed personal/professional depth
  (`about-narrative`'s problem).
- The problem of enabling actual outreach/contact (`email-contact` /
  `social-links`'s problem).
- The problem of resolving content into the visitor's language
  (`content-localization`'s problem).
- The problem of the site's motion/interaction feel in general
  (`motion-interaction`'s problem).

## Constraints

- Must render fast / feel instant on arrival — as the very first thing a
  visitor sees, perceived load/render speed is a real constraint on
  solving this problem.
- Must express within the already-established visual identity
  (near-black/purple palette, ornamental wordmark, two-tier typography,
  per `project-ux.md`) — not invent new brand elements.
- Must work across the full device range, from small mobile to large
  desktop (`project-ux.md` notes Hero has a distinct mobile treatment, not
  a plain reflow).
- Inherited from project level: solo effort (Javi alone builds/maintains),
  no fixed deadline.

## Known Dependencies

- **`content-localization`** — the first-impression problem must hold
  regardless of the visitor's resolved locale; headline/tagline text
  depends on this Feature to be in the right language.
- **`section-navigation`** — shares the Hero view's visual space; the
  first-impression composition problem can't assume the full viewport is
  free.
- **`social-links`** — likewise shares Hero view space as an adjacent,
  separately-owned element.
- **`motion-interaction`** — governs any arrival motion/microinteraction;
  interacts with the "feel instant" constraint above without this Feature
  defining the motion itself.
- **Styling System** (architecture-level term, `project-architecture.md`)
  — the shared Sass/SCSS visual tokens this Feature must express within,
  per the visual-identity constraint above.

---

*Created: 2026-08-25*
