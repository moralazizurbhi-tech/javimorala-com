# Feature UX Specification: Direct Contact

**Status:** Approved

## UX Scope

Specializes Project UX's Connection screen and its "Reach Javi" User Flow,
for the section eyebrow header, CTA composition (heading + `mailto:`
link), closing farewell line, and the ornamental mark's decorative
background role, composed alongside Presence Links (secondary, owned by
`presence-links`) into one cohesive closing-screen moment that fills
exactly one viewport's height. Informed by an explicitly provided
external Figma source (file `CCwye9dUj8Sy4f2lgy6i9f`, "Contact" frame
`22:2` desktop / "Contact - mobile" `22:126`) — treated as observed
evidence, confirmed against by the user, not persistent project
knowledge. Excludes Presence Links' own link content, nav, the
ornamental mark's own visual design/asset, motion timing, the
localization mechanism, and the anti-scraping technique (Technical
Design).

## User Flows

### Reach Javi

Specializes Project UX's "Reach Javi" flow.

- Visitor reaches the Connection screen (via scroll or
  `section-navigation`'s "contact" link) → the heading, CTA link,
  Presence Links, and farewell lines are all visible immediately, with no
  interaction required to reveal any part (Contract Commitment 1) →
  visitor either activates the CTA ("send me an e-mail" → `mailto:`
  hand-off to Javi's email client) or follows a presence link
  (`presence-links`' own flow) or takes no action → end of the
  single-page experience.

## Screens

### Connection

Existing identity, from Project UX's Screens.

- Purpose: give the visitor a primary way to reach Javi directly, closing
  the single-page journey with a sense of resolution. Participates in the
  Reach Javi flow. Shared with `presence-links` — direct-contact is
  dominant/primary; presence links secondary/supporting (Project UX
  Screen Composition).
- Perceptual/experience direction (Observed from Figma, Confirmed by the
  user): a section eyebrow header ("let's get in touch," divider-flanked)
  is the topmost element, read before the CTA cluster; a heading
  introduces the section; the CTA link is the primary actionable element
  below/alongside it (Contract Commitment 4); Presence Links
  (presence-links' own content) appear as a secondary group; the farewell
  line closes the screen as two lines — a primary line, then a secondary
  line nodding toward Presence Links. The Ornamental Logo, at a large
  scale, renders as an extremely low-opacity, full-bleed ambient
  background texture across the whole screen — present identically on
  desktop and mobile — purely decorative, non-interactive, and
  subordinate to the CTA at all times (Contract Commitment 6); it never
  competes with the CTA for primary attention and carries no positional
  relationship to the CTA/farewell text, functioning as pure ambient
  atmosphere rather than a composed gesture (distinct from Hero's own
  Ornamental Mark, which does relate positionally to its headline). This
  large-scale instance is distinct from the small, opaque Ornamental
  Logo instance already present in the nav bar above this screen. The
  whole composition fills exactly
  one viewport's height, not a taller, scrolled block. Exact spatial
  layout, sizing, and positioning are Pending, left entirely to Feature
  UI.
- Desktop/tablet and mobile both realize this same core structure, with
  one exception: the section eyebrow header is desktop/tablet-only,
  omitted on mobile (Observed — the Figma mobile frame has no separate
  eyebrow instance), mirroring Hero's established space-constrained
  mobile-omission pattern for secondary elements; the CTA cluster and the
  farewell/Presence-Links group appear on both device classes. Specific
  per-device-class realization is otherwise Pending, left to Feature UI.

## Interaction States

- None — the CTA is a stateless external hand-off; no loading,
  confirmation, success, or error state renders in-page (Contract
  Commitment 1 AC4; Solution's "no in-page loading/confirmation/success
  state").

## Feature Components

- **Section Eyebrow Header** — a divider-flanked label introducing the
  screen, positioned above and before the CTA cluster; observed from
  Figma, distinct from the smaller Contact Heading below; reuses the same
  confirmed "Contact heading" text values under Content and Assets — no
  separate copy. Desktop/tablet only — omitted on mobile, where the
  viewport doesn't have room to show it separately from the CTA-adjacent
  Contact Heading without compromising the primary composition.
- **Contact Heading** — a short section heading introducing the
  Connection screen's contact moment. Feature-specific component,
  observed from Figma.
- **Contact CTA/Mechanism** — existing identity from Project UX's UI
  Components. This Feature's specific realization: a `mailto:` link
  labeled "send me an e-mail" (Contract Commitment 1), its target address
  protected against scraping (Contract Commitment 2) — obfuscation
  technique itself Pending, Technical Design.
- **Farewell Line** — two short closing text lines presented statically,
  positioned after/alongside the CTA and Presence Links.
- **Ornamental Logo (Connection background placement)** (renamed from
  Ornamental Mark) — a large-scale, extremely low-opacity ambient
  texture instance of Project UX's compact Ornamental Logo (distinct
  from Hero's separate Ornamental Mark, and from the small opaque
  nav-bar instance of this same Logo); its own visual design/asset is
  not owned here (Feature Definition boundary); purely decorative,
  non-interactive, subordinate to the CTA, no positional relationship to
  other content (Contract Commitment 6).

## Content and Assets

- **Contact heading (English)** — Confirmed: "let's get in touch"
- **Contact heading (Spanish)** — Confirmed: "pongámonos en contacto"
- **Contact heading (Euskera)** — Confirmed (lower-confidence draft;
  flagged for native review before launch, since Project Architecture
  requires all three languages to be authored directly by Javi Morala,
  not machine-translated): "jar gaitezen harremanetan"
- **CTA link text (English)** — Confirmed: "send me an e-mail"
- **CTA link text (Spanish)** — Confirmed: "envíame un correo"
- **CTA link text (Euskera)** — Confirmed (lower-confidence draft; same
  native-review flag): "bidali e-posta bat"
- **CTA `mailto:` target address** — Confirmed, language-independent:
  `javimorala@outlook.com`
- **Farewell line 1 (English)** — Confirmed: "thanks for your visit!"
- **Farewell line 1 (Spanish)** — Confirmed: "¡gracias por tu visita!"
- **Farewell line 1 (Euskera)** — Confirmed (lower-confidence draft; same
  native-review flag): "eskerrik asko bisitagatik!"
- **Farewell line 2 (English)** — Confirmed: "you can follow my socials
  too"
- **Farewell line 2 (Spanish)** — Confirmed: "también puedes seguirme en
  mis redes"
- **Farewell line 2 (Euskera)** — Confirmed (lower-confidence draft; same
  native-review flag): "nire sare sozialetan ere jarrai nazakezu"

## UX Constraints

- The CTA must stay visually distinct from and primary over Presence
  Links (inherited from Project UX: "a direct-contact call-to-action is
  kept visually distinct from those presence links").
- The anti-scraping mechanism (Technical Design) must not compromise
  keyboard/screen-reader accessibility, nor require the CTA to be
  imperceptible to assistive technology.
- Full keyboard operability, visible focus states, sufficient contrast,
  and assistive-technology compatibility apply to this screen's content,
  consistent with Project UX's UX Constraints.
- No motion, timing, or reveal behavior is defined here — owned by
  `motion-interaction`.
- The Connection screen's composition fills exactly one viewport's
  height on desktop and mobile alike — not a taller, scrolled
  composition.
- The Ornamental Logo (large-scale background instance) must remain
  visually subordinate to the CTA, carry no interactive affordance, and
  require no positional relationship to other content (Contract
  Commitment 6).

---

*Created: 2026-09-07*
