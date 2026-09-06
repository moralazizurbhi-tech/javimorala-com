# Feature Context: Hero Presentation

**Status:** Approved

## Problem

A visitor arrives at the site with no prior context about who Javi is. The
Hero moment is the site's first — and highest-leverage — opportunity for
Javi's identity and experimental design character to come through
authentically and immediately, before any scrolling or interaction,
consistent with the project's self-expression (not persuasion) vision.

## Motivation

Directly serves Project Context's Vision: "success means Javi's identity
and vision come through genuinely to whoever encounters it." The Hero
moment sets the tone for the whole single-page experience — it's the first
and most concentrated expression of that vision, not a means to any
conversion or audience-capture outcome.

## Scope

### Included

- The problem of the visitor's first few seconds of arrival, before any
  scrolling or navigation choice — communicating identity and the site's
  experimental character authentically and immediately.
- The problem of coordinating headline/tagline, ornamental-mark placement,
  and entry scroll cue into a single legible first impression (mirrors
  Feature Definition's boundary).

### Excluded

- The problem of wayfinding through the rest of the site
  (`section-navigation`'s problem).
- The problem of establishing detailed personal/professional depth
  (`about-narrative`'s problem).
- The problem of enabling actual outreach/contact (`direct-contact` /
  `presence-links`'s problem).
- The problem of resolving content into the visitor's language
  (`content-localization`'s problem).
- The problem of the site's motion/interaction feel in general
  (`motion-interaction`'s problem).

## Constraints

- Must express within the established visual identity — near-black/off-
  white base palette, vivid gradient accents reserved for emphasis, and the
  ornamental mark's entrance-moment role.
- Must work across the full device range, and specifically needs a
  distinct mobile treatment for the Hero moment, not a plain responsive
  reflow.
- Inherited from project level: solo effort, no fixed deadline, static-
  generated architecture with no backend.
- No "must feel instant on arrival" performance constraint is declared
  here — left open/unconfirmed for now; revisit if it surfaces in
  Solution/UX.

## Known Dependencies

- **`content-localization`** — the first-impression problem must hold
  regardless of resolved locale; headline/tagline text depends on this
  Feature to be in the right language.
- **`section-navigation`** — catalog relationship states it "enables"
  `hero-presentation`; shares presence in the Hero view without being part
  of this Feature's composition.
- **`motion-interaction`** — governs any arrival motion/microinteraction;
  interacts with this Feature's presentation without this Feature defining
  the motion itself.

---

*Created: 2026-09-06*
