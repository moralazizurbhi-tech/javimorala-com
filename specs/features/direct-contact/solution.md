# Feature Solution: Direct Contact

**Status:** Approved

## Solution Intent

### Functional Objective

Provide the visitor a primary, always-visible CTA that opens a `mailto:`
hand-off to reach Javi directly, without exposing his email address to
automated scraping, coordinated with Presence Links (secondary), the
closing farewell line, and the ornamental mark's decorative background
placement as one closing composition — resolving Feature Context's "no
path to real contact" problem.

## Solution Behaviour

### Behaviours

- The CTA is presented statically and always visible; no interaction is
  required to reveal it.
- Activating the CTA opens a `mailto:` link, handing off to the visitor's
  native email client — a single action, no on-site form, no data
  collection.
- The email address is never exposed as directly scrapable plain text/href
  in the page's static source.
- CTA copy and the farewell line render in the visitor's active language
  via `content-localization`.
- Presence Links is composed alongside the CTA as a secondary element; its
  own link behavior is `presence-links`' own solution.
- The ornamental mark is presented in the Connection composition as a
  purely decorative background element — it carries no interactive
  behavior and does not compete with the CTA for primary attention. Its
  presence carries no completeness guarantee of its own, mirroring how
  Presence Links is already treated here.

### Flows

- Visitor reaches the Connection screen (scroll or `section-navigation`'s
  "contact" link) → CTA, Presence Links, and farewell line are all visible
  immediately → visitor either activates the CTA (hands off to their email
  client, pre-addressed to Javi) or activates a presence link (hands off
  to that external profile) or takes no action → end of the single-page
  experience.

### Rules

- The CTA resolves in exactly one external hand-off action — no
  multi-step flow, no in-site confirmation state.
- No form fields, no visitor data collection, at any point.
- The email address must never appear as plain, directly-crawlable text
  or a literal `mailto:` href in static HTML source.
- The CTA functionally takes precedence over Presence Links (matches
  Definition's "primary" framing) — the first/most prominent actionable
  element; exact visual styling is UX/UI's concern.
- The farewell line is presented statically, with no interactive behavior
  of its own.
- The ornamental mark, when shown, must remain visually subordinate to
  the CTA — never competing with it for primary attention.

### States and Transitions

None — the CTA is a stateless external hand-off (like a normal link
activation); control passes to the OS/email client, with no in-page
loading/confirmation/success state.

### Constraints

- Single external-link activation is a solution-level requirement,
  narrowing Context's inherited "no backend/no on-site form" constraint
  into an explicit rule.
- Anti-scraping is a solution-level requirement: the email address must
  not be trivially harvestable from static page source. The specific
  obfuscation/rendering mechanism is Technical Design's decision, not
  this phase's.

### Boundaries

#### Included

- The CTA's single-action `mailto:` hand-off behavior, with its
  anti-scraping requirement.
- Composing the CTA, Presence Links, and farewell line together, with the
  CTA taking functional precedence.
- Coordinating the ornamental mark's decorative background placement
  alongside the CTA, Presence Links, and farewell line, as a purely
  decorative, non-interactive element.

#### Excluded

- Presence Links' own link content/behavior — `presence-links`'s own
  solution.
- The ornamental mark's own visual design/asset (shared substrate, owned
  by no Feature).
- The specific anti-scraping technique/mechanism — Technical Design.
- Exact CTA copy, farewell-line wording, and the actual email address
  content — Feature UX's Content and Assets.
- Detailed visual/positional layout — Feature UX/UI.
- Entrance/reveal motion, timing — `motion-interaction`.
- Nav behavior — `section-navigation`.
- Reactive re-render on runtime language change — `content-localization`
  resolves at render time only.

---

*Created: 2026-09-07*
