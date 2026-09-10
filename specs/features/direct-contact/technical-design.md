# Technical Design: Direct Contact

**Status:** Approved

## Technical Components

### Direct Contact Composition

Existing identity — realized within Project Architecture's Connection
Domain Section; this Technical Design elaborates its internal
organization, alongside (but not including) `presence-links`' own
composition within the same Domain Section.

**Purpose**

Realize `direct-contact`'s Feature Contract by rendering the section
eyebrow header, contact heading, CTA link, farewell lines, and the
ornamental mark's decorative background placement as one coordinated,
fully static composition filling exactly one viewport's height, with
the CTA's target address protected from static-source scraping.

**Responsibilities**

- Render the section eyebrow header (desktop/tablet only), contact
  heading, CTA anchor, both farewell lines, and the ornamental mark's
  decorative background layer together in the Connection Domain
  Section's static markup, with the CTA preceding `presence-links`' own
  composed content in DOM order (Commitment 4).
- Size the Connection Domain Section's outer container to exactly one
  viewport's height (desktop and mobile alike) via the Styling System's
  breakpoint/sizing primitives, rather than allowing content to
  determine a taller, scrolled block.
- Render the Ornamental Logo's large-scale ambient instance as a
  non-interactive background layer, behind all other Connection content
  in stacking order, with no focusable/interactive markup (Commitment
  6) — referencing the shared Ornamental Logo SVG asset (distinct from
  Hero's own Ornamental Mark asset), without owning or duplicating its
  definition, present identically on desktop and mobile.
- Consume the Connection domain's locale-resolved content (heading, CTA
  link text, farewell lines) from the i18n/Routing Layer for the active
  route's locale (Commitment 3); never read the Content Layer directly,
  never re-resolve or override the active language.
- Render the CTA as an anchor whose static, build-time markup embeds the
  target address and its `mailto:` href using HTML character-reference
  encoding rather than literal, directly-crawlable text — natively
  rendered as a real, working link by every browser with no script
  required (Commitment 2; also strengthens Commitment 1's "resolves to a
  working `mailto:` link" for every visitor, JS or not). See "Anti-
  Scraping Encoding Mechanism" below.
- Render the CTA's activation as a single, stateless native link
  hand-off — no in-page loading/confirmation state, no form fields, no
  data collection (Commitment 1).
- Render the farewell lines as static, non-interactive text (Commitment
  5) — no handlers, no state.

**Owned Concepts**

- The character-reference encoding applied to the CTA's address/href
  within the static markup.
- DOM-order precedence of the CTA over `presence-links`' composed
  content within the shared Connection Domain Section.
- The Connection Domain Section's fixed one-viewport-height sizing.
- The Ornamental Logo's large-scale non-interactive background stacking
  treatment
  (shared asset referenced, not redefined).

**Collaborations**

- i18n/Routing Layer — supplies resolved Connection-domain content
  (heading, CTA text, farewell lines) for the active locale.
- Styling System — supplies the display-scale typography tier, off-white
  colour token, and spacing/breakpoint primitives for the desktop/mobile
  layout (Feature UI Definition).
- Connection Domain Section — composes this alongside `presence-links`'
  own composition, CTA-before-Presence-Links in DOM order.

**Dependencies**

- i18n/Routing Layer (Project Architecture) — external, not redefined
  here.
- Styling System (Project Architecture) — external, not redefined here.
- `presence-links`' own composition — external; this component only
  establishes DOM-order precedence relative to it, never owns or renders
  its content.
- Shared Ornamental Logo Asset (external, project-wide substrate, not
  owned by any Feature; distinct from Hero's separate Ornamental Mark
  asset) — this component references it at a large scale for its own
  ambient background placement, the same asset `section-navigation`
  references at nav scale.

**Constraints**

- No server/API/network call may resolve or transmit the address at any
  point (Project Architecture: native browser links only, no API/network
  calls) — satisfied by construction since the address is embedded
  directly in static, build-time-rendered markup.
- The encoding must require no client-side script or hydration — no
  React island is introduced; consistent with Architecture's static-first
  principle.
- The encoding must not compromise keyboard/screen-reader accessibility
  (Feature UX Constraint) — the rendered DOM presents a standard,
  focusable `<a href="mailto:...">`; only the raw pre-render source is
  obscured, never the accessibility tree.
- Locale-content completeness (English/Spanish/Euskera) for heading/
  CTA/farewell text is assumed guaranteed before a given route is built;
  no runtime fallback for missing locale content is defined here (mirrors
  About Narrative's precedent). Euskera's lower-confidence-draft status
  (Feature UX flag) doesn't gate build — content readiness is an
  authoring concern, not a technical one.

**Design Decisions**

- Character-reference encoding of the CTA's address/href directly in
  static markup, instead of a client-side JS-decode mechanism. Rationale:
  satisfies the anti-scraping commitment with zero script/hydration —
  stays purely static, avoids an unnecessary React island, and works
  identically regardless of whether the visitor's browser runs
  JavaScript.
- DOM-order precedence (CTA markup precedes Presence Links) as the
  mechanism realizing functional precedence, rather than a visual-only
  (CSS order) mechanism. Rationale: keeps the precedence guarantee
  independent of Feature UI's visual styling and naturally aligns with
  assistive-technology reading order.
- Purely static Astro component — no React island, no Framer Motion.
  Rationale: static-first principle; none of the Feature's committed
  behaviors need client-side logic once the encoding decision above is
  made.
- The Ornamental Logo's large-scale ambient instance is rendered as a
  purely static background layer with no hydration — consistent with
  this component's existing no-React-island design; Commitment 6
  requires no interactivity, so no island is needed for it either.

**Anti-Scraping Encoding Mechanism**

- What it is: the CTA's target address and its `mailto:` href are
  represented in the static HTML using HTML character (numeric)
  references — each character as its code-point reference — rather than
  literal ASCII text, for both the visible link text and the `href`
  attribute value.
- Why it defeats scraping: automated email harvesters pattern-match
  plain, literal text against email-shaped strings (`user@domain.tld`)
  or a literal `mailto:` substring directly in the raw HTML/source they
  fetch. Encoded as character references, neither the address nor the
  `mailto:` prefix appears as matchable literal text anywhere in the
  delivered static source — satisfying Contract Commitment 2's AC1 (no
  plain-text address) and AC2 (no literal, directly-parseable `mailto:`
  href).
- Why it still works for every visitor: HTML character references are
  decoded natively by the browser's standard HTML parser — this is
  baseline HTML parsing, not a script. The browser reconstructs the real
  characters and renders a normal, fully functional
  `<a href="mailto:...">` element, whether or not JavaScript runs.
  Assistive technology reads the parsed (post-decode) DOM the same way,
  so accessibility is unaffected — this is why no React island or
  client-side decode step is needed anywhere in this design.

**Contract Traceability**

- Commitment 1 → single static anchor, no client-side state.
- Commitment 2 → character-reference encoding of address/href in static
  markup (Anti-Scraping Encoding Mechanism).
- Commitment 3 → i18n/Routing Layer consumption.
- Commitment 4 → DOM-order precedence over Presence Links.
- Commitment 5 → static, non-interactive text rendering.
- Commitment 6 → non-interactive background-layer rendering of the
  shared Ornamental Logo asset (large-scale ambient instance), with no
  completeness dependency.

## Cross-Component Relationships

- Root Layout → Connection Domain Section: composes it in fixed order
  (Existing).
- Connection Domain Section → Direct Contact Composition +
  `presence-links`' own composition: composes both, Direct Contact
  Composition preceding in DOM order.
- Direct Contact Composition → i18n/Routing Layer: consumes resolved
  content (Existing pattern).
- Direct Contact Composition → Styling System: consumes shared tokens
  (Existing pattern).
- No dependency on `section-navigation`, `motion-interaction`,
  `about-narrative`, or `hero-presentation` (boundary preserved).
  `motion-interaction`'s technical design (out of scope here) may apply
  entrance treatment to elements this component renders; it depends
  outward on this component's static output, not the reverse.

No circular dependencies: Direct Contact Composition depends outward on
the i18n/Routing Layer and the Styling System; neither depends back on
it.

---

*Created: 2026-09-07*
