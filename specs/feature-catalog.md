# Feature Catalog: Javi Morala

## Features

### Capability-Realizing

- **id:** `hero-presentation`
  **name:** Hero Presentation
  **responsibility:** Deliver the visitor's first-impression composition on
  arrival — headline/tagline, wordmark centerpiece, and the entry scroll cue
  that carries the impression into further exploration — as one cohesive
  moment.
  **realizes:** `hero-presentation`

- **id:** `about-narrative`
  **name:** About Narrative
  **responsibility:** Present Javi's authentic professional and personal
  identity as one continuous narrative — an intro hook followed by
  structured bio content.
  **realizes:** `about-narrative`

- **id:** `email-contact`
  **name:** Email Contact
  **responsibility:** Provide the signature, headline-scale "Send Me An
  E-Mail" contact device as the Contact view's primary channel.
  **realizes:** `contact-links`

- **id:** `social-links`
  **name:** Social Links
  **responsibility:** Provide the reusable social channel link group
  (Instagram, LinkedIn), presented consistently across its Hero, Contact,
  and nav placements.
  **realizes:** `contact-links`

- **id:** `content-localization`
  **name:** Content Localization
  **responsibility:** Detect the visitor's browser locale and resolve/render
  all site content in the active language.
  **realizes:** `localization`

### Supporting/Enabling

- **id:** `section-navigation`
  **name:** Section Navigation
  **responsibility:** Let a visitor jump directly to a section via a
  persistent nav, presented responsively (inline desktop / overlay mobile),
  alongside free scroll. Enables the capability-realizing features rather
  than standing as an end goal itself.
  **realizes:** `section-navigation`
  **relationships:** enables `hero-presentation`, `about-narrative`,
  `email-contact`, `social-links`

- **id:** `language-override`
  **name:** Language Override
  **responsibility:** Provide the explicit control letting a visitor change
  the active language regardless of detected locale.
  **realizes:** `localization`
  **relationships:** feeds `content-localization`

### Cross-Cutting

- **id:** `motion-interaction`
  **name:** Motion & Interaction
  **responsibility:** Define and implement the site's global motion system —
  bold section/page-level motion, more restrained micro-interaction
  feedback, scroll ownership always remaining with the visitor (motion never
  hijacks, locks, or force-snaps scroll), and a mandatory reduced-motion
  fallback.
  **realizes:** none — no independent capability; excluded from the
  Capability Catalog for the same reason. Traces instead to Project UX's
  Experience Overview and UX Constraints.
  **relationships:** applies across `hero-presentation`, `about-narrative`,
  `email-contact`, `social-links`, `content-localization`,
  `section-navigation`

## Excluded from Feature status

- **Ornamental mark** — recurring brand asset (Hero centerpiece, nav glyph);
  shared static visual substrate with no independent interactive behavior or
  contract of its own; folded into whichever feature displays it.
- **Typography / color / composition system** — shared design tokens
  (two-tier type contrast, single accent colour, asymmetric composition); no
  independent behavior or evolution surface beyond the Styling System every
  feature draws from.

---

*Created: 2026-08-25*
