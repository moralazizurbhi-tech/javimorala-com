# Feature Context: About Narrative

## Problem

Once a visitor moves past the Hero's first impression, they lack the
substance to actually trust or connect with Javi as a professional and a
person. Two risks: (1) without structured, authentic bio content, a
visitor stays at a superficial impression and never builds the
credibility/connection needed to justify reaching out via Contact; (2)
generic- or template-feeling identity content undermines the project's
core differentiator — an authentic, self-owned reference point, distinct
from third-party platforms like LinkedIn or GitHub.

## Motivation

Serves Project Context's vision of a credible, self-owned professional/
personal reference point, and directly embodies Project Design's
"Authenticity" and "Show, don't just tell" functional principles for the
Personal Narrative domain. It's the substantive bridge between the
fleeting Hero impression and the Contact action.

## Scope

### Included

- The problem of establishing enough professional and personal depth/
  credibility, for a visitor already engaged past the first impression, to
  justify moving toward Contact — structured as an intro hook leading into
  bio content.

### Excluded

- The first-impression/arrival problem — `hero-presentation`'s problem.
- The wayfinding/quick-jump problem — `section-navigation`'s problem.
- The problem of enabling actual outreach — `email-contact`/
  `social-links`'s problem.
- The problem of resolving content into the visitor's language —
  `content-localization`'s problem.
- The site's motion/interaction feel in general — `motion-interaction`'s
  problem.

## Constraints

- The About view is the most visually outdated part of the legacy design,
  was never designed with interaction in mind, and had the weakest
  responsive/mobile treatment of the three views (`project-ux.md`
  Weaknesses) — a known starting deficiency this Feature must overcome,
  not a design decision itself.
- No work/portfolio-showcase capability — "show, don't tell" relies on the
  site's own execution, not a listed project catalog, which bounds what
  "professional identity" content can be.
- Content is authored directly and solely by Javi — no CMS, ghostwriter,
  or multi-author workflow (Project Design Design Constraint).
- Bilingual (EN/ES) content is authored directly by Javi — no translation
  service (Project Design Design Constraint).
- Must receive an equally deliberate, purpose-designed mobile treatment,
  never a generic reflow (Project UX Constraint) — notable given the
  legacy weakness above.
- Inherited from project level: solo effort, no fixed deadline.

## Known Dependencies

- **`content-localization`** — the intro hook and bio content must render
  in the visitor's active language.
- **`section-navigation`** — co-located in the About view via the
  persistent nav; also the "quick jump" path into this view.
- **`motion-interaction`** — governs any reveal/scroll motion or
  micro-interaction applied to About elements, without this Feature
  defining it.
- **Styling System** (`project-architecture.md`) — shared visual tokens
  this Feature must express within.

---

*Created: 2026-08-31*
