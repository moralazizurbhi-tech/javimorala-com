# Feature Catalog: Javi Morala

## Features

### Capability-Realizing

- **id:** `hero-presentation`
  **name:** Hero Presentation
  **responsibility:** Deliver the visitor's first-impression composition on
  arrival — headline/tagline and the entry scroll cue that carries the
  impression into further exploration — as one cohesive moment.
  **realizes:** `hero-presentation`
  **lifecycle:** Approved for Development

- **id:** `about-narrative`
  **name:** About Narrative
  **responsibility:** Present Javi's identity authentically, in his own
  voice, as self-expression — the personal narrative content — together
  with a small, low-key mention of the site's AI-assisted development
  process, kept subordinate to the narrative.
  **realizes:** `about-narrative`, `ai-assisted-development-note`
  **lifecycle:** Approved for Development

- **id:** `direct-contact`
  **name:** Direct Contact
  **responsibility:** Provide the primary way for an interested visitor to
  reach Javi directly through an external channel (e.g. email), with no
  on-site form or data collection.
  **realizes:** `direct-contact`
  **lifecycle:** Approved for Development

- **id:** `presence-links`
  **name:** Presence Links
  **responsibility:** Provide links to Javi's broader external online
  presence (social/professional profiles), distinct from and secondary
  to direct contact.
  **realizes:** `presence-links`
  **lifecycle:** Approved for Development

- **id:** `content-localization`
  **name:** Content Localization
  **responsibility:** Detect the visitor's browser locale and resolve/render
  all site content (English, Spanish, or Euskera) in the active
  language.
  **realizes:** `localization`
  **lifecycle:** Approved for Development

- **id:** `language-override`
  **name:** Language Override
  **responsibility:** Provide the explicit control letting a visitor change
  the active language regardless of detected locale, remembering that
  choice for future visits.
  **realizes:** `localization`
  **relationships:** feeds `content-localization`
  **lifecycle:** Approved for Development

### Supporting/Enabling

- **id:** `section-navigation`
  **name:** Section Navigation
  **responsibility:** Let a visitor move directly between screens via a
  persistent navigation aid — inline on desktop, overlay on mobile — as
  a shortcut alongside free scrolling; also hosts the language override
  control.
  **realizes:** `section-navigation`
  **relationships:** enables `hero-presentation`, `about-narrative`,
  `direct-contact`, `presence-links`; hosts `language-override`
  **lifecycle:** Approved for Development

### Cross-Cutting

- **id:** `motion-interaction`
  **name:** Motion & Interaction
  **responsibility:** Define and implement the site's global motion system
  — scroll-triggered reveals, animated transitions, and consistent
  interaction-state feedback — expressing the experimental design
  character across every Feature, with a mandatory reduced-motion
  fallback.
  **realizes:** none — no independent capability; traces to Project Design's
  Functional Principles and Project UX's Experience Overview/Visual
  Foundations/Constraints.
  **relationships:** applies across `hero-presentation`, `about-narrative`,
  `direct-contact`, `presence-links`, `content-localization`,
  `language-override`, `section-navigation`
  **lifecycle:** Approved for Development

- **id:** `accessibility`
  **name:** Accessibility
  **responsibility:** Ensure the experience is usable regardless of ability
  across every Feature — full keyboard operability, visible focus
  states, sufficient contrast, and assistive-technology compatibility.
  **realizes:** none — no independent capability; traces to Project Design's
  accessibility Design Constraint and Project UX's UX Constraints.
  **relationships:** applies across `hero-presentation`, `about-narrative`,
  `direct-contact`, `presence-links`, `content-localization`,
  `language-override`, `section-navigation`
  **lifecycle:** Approved for Development

## Excluded from Feature status

- **Ornamental mark** — recurring brand asset (Hero centerpiece, nav glyph);
  shared static visual substrate with no independent interactive behavior or
  contract of its own; folded into whichever feature displays it.
- **Typography / colour / composition system** — shared design tokens; no
  independent behavior or evolution surface beyond the Styling System every
  feature draws from.

## Feature Lifecycle & Approval Model

Reconstructed from the Feature Development Workflow's Skills, since no
canonical reference document (`Feature Definition.md`) exists in this
workspace to define it. This section is the authoritative representation
for this project going forward.

Catalog-level gate — `Approved for Development`: a Feature Catalog entry
may carry a `lifecycle: Approved for Development` field. This is the only
Lifecycle transition ever granted directly at the catalog level, and it
must be an explicit user decision — never inferred from a Feature merely
existing in the catalog, having been discussed, or a conversational
preference. It is the precondition every Feature Development Skill
(`vibe-feature-definition` onward) requires before it will act on a
Feature. A Feature without this field cannot proceed to any Feature
Development phase.

Feature-level progression, once Feature Development begins: each of the
seven Feature Development artifacts — Feature Definition, Feature
Context, Feature Solution, Feature Contract, Feature UX Specification,
Feature UI Definition, Technical Design — is drafted by its own Skill and
then explicitly Approved by the user; an artifact may also be explicitly
Locked (approved and frozen against casual reopening) or Rejected
(blocking further downstream work on that Feature until resolved). These
states live on each artifact itself, not on this catalog, and each
artifact's own Skill decides its concrete representation when that phase
is reached.

- Feature Definition → Feature Context → Feature Solution → Feature
  Contract, in that sequence — each requires its predecessor Approved.
- The Feature becomes Closed the moment Feature Contract is Approved —
  its functional definition (the "what") is fully settled.
- Only once Closed may Feature UX Specification and Technical Design
  proceed — independently of each other, in parallel.
- Feature UI Definition requires the Feature to be Closed and Feature UX
  Specification Approved.
- The Feature becomes Ready for Planning once: Closed, Technical Design
  Approved, and (when the Feature has user-visible experience) Feature
  UX Approved. Only Features at this milestone are eligible for Task
  Catalog coverage.

Closed and Ready for Planning are derived from the approval state of
their constituent artifacts, not separately stored fields — an
orchestrator determines them by reading those artifacts directly.

---

*Created: 2026-09-06*
