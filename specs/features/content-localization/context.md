# Feature Context: Content Localization

**Status:** Approved

## Problem

The site presents Javi's identity and voice to a general, unqualified
visitor audience. Without language resolution, every visitor sees content
in a single fixed language regardless of what they actually read, which
undermines the site's core purpose of genuine self-expression reaching
whoever encounters it — a Spanish- or Basque-speaking visitor may not
fully understand content authored only in English (or vice versa). There
is currently no mechanism to detect a visitor's language and render the
site's content — visible copy or metadata — accordingly.

## Motivation

Directly serves Project Design's Cross-Functional Rule that all domain
content is available in English, Spanish, and Euskera at launch, with
visitor language auto-detected from browser locale by default and a
manual override always available, and the Functional Principle of
Authenticity — content must reach each visitor in a language they
genuinely understand for the self-expression to land as intended. As a
Capability-Realizing Feature, its value is direct: it is what makes the
site's authentic voice actually accessible across languages, not merely a
supporting mechanism.

## Scope

### Included

- A visitor whose browser locale is English, Spanish, or Euskera seeing
  site content resolved into that language automatically, with no action
  required.
- Resolution covering all site content: visible copy and non-visible SEO
  metadata (title, meta description, `html lang`, alt text).
- A visitor whose browser locale doesn't match any of the three still
  getting a coherent experience via the English fallback, not an error or
  undefined state.
- Content rendering in the correct language from first paint — no visible
  detect-then-swap flash.
- Each language variant being independently reachable via its own
  shareable URL, for direct links and per-language discoverability/
  indexing.
- Remaining consistent with an explicit override already in effect,
  rather than always re-detecting from scratch.

### Excluded

- The override control's own UI, switching action, and remembering the
  choice — `language-override`'s problem.
- Where the override control is placed in the UI — `section-navigation`'s
  problem (hosts it).
- Authoring the actual translated content/copy strings — a later concern
  once this and other Features' content phases produce copy to translate.
- The technical detection/rendering/routing mechanism itself (e.g.,
  build-time per-locale pages vs. client-side routing) — Solution/
  Technical Design's problem, not Context's.
- The site's motion/interaction feel — `motion-interaction`'s problem.

## Constraints

- Content across all domains and languages is authored directly and
  solely by Javi Morala — no CMS or multi-author translation workflow.
- Static-generated architecture, no backend, no user accounts.
- The approach must be designed to extend to additional languages beyond
  the initial three over time — not hard-coded to exactly EN/ES/EU
  forever.
- Solo effort, no fixed deadline.
- No "must feel instant" or other explicit performance constraint
  declared beyond the no-flash requirement above — left open, consistent
  with how other Features' Contexts left the same class of question open.

## Known Dependencies

- **`language-override`** — feeds this Feature the active language when a
  visitor makes an explicit choice; this Feature only consumes that
  signal.
- **`section-navigation`** — hosts the override control's placement
  (indirect dependency, via `language-override`).
- **`hero-presentation`, `about-narrative`, `direct-contact`,
  `presence-links`** — each owns its own content/copy; this Feature must
  resolve and render that content in the active language, but does not
  own or author it.
- **`motion-interaction`** — cross-cutting; applies per catalog
  relationship, though not central to this Feature's problem.
- **`accessibility`** — cross-cutting; e.g., a correct `html lang`
  attribute matters for assistive-technology pronunciation and language
  switching.

---

*Created: 2026-09-07*
