# Task Catalog: Javi Morala

## Task Grouping Rationale

Task decomposition follows the Implementation Plan's phases and executable
units of work with genuinely independent dependencies or verification —
not a mechanical mirror of each Feature's Technical Components, and not a
one-task-per-Feature default.

- **Global reset/base styling has no standalone task** — folded into T-001
  (explicit user decision: Radix UI's own baseline, pulled in at scaffold
  time, already covers browser-default normalization; brand-token
  application to the root happens as part of T-004's global theme wiring).
- **Hero Presentation, Section Navigation, About Narrative, Direct
  Contact, and Presence Links are each split into two tasks by
  responsibility** (explicit user decision), rather than one task per
  Feature:
  - Hero: element/content/completeness behavior (T-009) vs. device-class
    responsive treatment (T-010) — Commitment 4's own dedicated
    cross-device validation scenario makes it separately verifiable.
  - Section Navigation: the core desktop bar + shared active-section state
    (T-011) vs. the mobile overlay + language-control hosting slot
    (T-012) — the overlay is a distinct interactive surface (its own
    open/close state) built on top of the core state, not the same
    execution objective.
  - About Narrative: narrative text + AI note (T-013) vs. photo
    presentation (T-014) — text/copy authoring and static-media handling
    are different concerns; Commitment 1's whole-composition completeness
    is verified jointly once both exist.
  - Direct Contact: the CTA's functional/anti-scraping mechanism (T-015)
    vs. supporting static content and the decorative mark (T-016) — the
    CTA is the Feature's one interactive, security-relevant surface;
    the rest is static copy/decoration.
  - Presence Links: the reusable link component itself (T-017) vs. its
    placement into both host Features plus Hero's own Commitment 5
    (T-018) — component-build and integration are different ownership
    domains (Integration work, per this Skill's task categories).
- **`motion-interaction`'s original seven components spanned seven
  separate tasks (T-019–T-025)** — each targets a meaningfully different
  Feature's already-built output (or, for Secondary Interaction Feedback
  Styles, three), is independently verifiable, and no consuming Feature
  depends back on any of them (confirmed in each one's own Technical
  Design). The Motion Playback Store has no independent verifiable
  behavior of its own and is folded into T-019, its first consumer; T-020
  depends on it being established there.
- **Three of those components were each further split into two tasks**,
  following the same by-responsibility logic already used for Hero
  (T-009/T-010) and About Narrative (T-013/T-014) — a later Feature
  refinement added a second, separately-verifiable Commitment to a
  component that already had a task:
  - Hero Entrance & Ambient Motion Island: first-load entrance/ambient
    drift (T-019, Commitment 2) vs. scroll-linked content exit and mark
    transformation (T-035, Commitments 11/12) — the latter has its own
    dedicated validation scenarios (reversibility, hysteresis, per-device
    treatment) genuinely distinct from entrance sequencing.
  - About Narrative Reveal Island: progressive reveal (T-020, Commitment
    1) vs. photo tilt (T-036, Commitment 13) — tilt is cursor/scroll-
    driven and independently verifiable regardless of reveal state.
  - CTA Interaction Motion: gradient sweep/touch feedback (T-023,
    Commitments 5/6) vs. discoverability motion — underline, tap-scale,
    icon flourish (T-038, Commitment 15) — the latter also depends on
    Direct Contact's own new affordance icon (T-034), a dependency the
    sweep/touch feedback never had.
- **Nav Divider Segment Transition (T-037) is a new, ninth
  `motion-interaction` task**, added when that Feature's own refinement
  introduced Commitment 10 — a genuinely new component realizing a
  genuinely new commitment, not a split of an existing one.
- **Section Navigation's logomark resize (T-033) and Direct Contact's
  discoverability icon (T-034) are new tasks outside `motion-interaction`
  entirely** — both revise/extend already-`Realized` Feature output
  (T-011's and T-015/T-016's) rather than reopening those tasks'
  identities, preserving their completion history.
- **`accessibility`'s Nav Current-State AT Exposure task (formerly
  T-027) has been removed** — `section-navigation`'s Technical Design
  (Design Decision 8, built at T-040) now exposes the active nav link's
  current-state via the native `aria-current="page"` attribute,
  resolving Contract Commitment 5 as existing architecture rather than a
  dedicated mirroring component (`accessibility`'s own Technical Design
  revised accordingly). Commitment 5 is now verified at T-028/T-030
  alongside Commitments 1, 3, 4, and 6 — the same treatment already
  given to Commitment 4's heading/landmark authoring below. Focus-Visible
  Style Module (T-026) is unaffected and remains `accessibility`'s one
  dedicated implementation task.
- **Content-localization's i18n/Routing Layer is one task (T-006), not
  split into route-generation and root-bootstrap-redirect halves** —
  unlike per-component decomposition elsewhere, these two halves are only
  meaningfully verifiable together: Commitments 1–4 cannot be checked
  (e.g. "override redirects correctly to the right route") without both
  existing at once. The cross-locale coverage check (T-007) is a
  genuinely separate execution objective — different verification method
  (build-time assertion vs. browser navigation behavior), different
  readiness timing (meaningful only once real content exists, exercised
  for real at T-029) — and stays its own task.
- **Accessibility's heading/landmark/alt-text authoring (Commitment 4,
  AC2/AC4) has no dedicated task** — each content Feature's own task
  (T-009, T-011, T-013, T-015) carries it as an acceptance-criteria item,
  per Technical Design's own framing that it is "each Domain Section's
  own implementation-level authoring decision." T-028 verifies it was
  done, across all of them, rather than redoing it.

## Task Type / Field Convention

- `infrastructure` tasks: no Feature Contract applies; `enablesCommitments: none`.
- `implementation` tasks: `realizesCommitments` — the behavior fulfilling
  the commitment is built here.
- `integration` tasks: `composesCommitments` — structural wiring across
  independently-built pieces; the commitment only becomes fully checkable
  once composed.
- `verification` tasks: `validatesCommitments` — confirms behavior already
  realized/composed elsewhere, without building new behavior of its own.

## Tasks

### Infrastructure

- id: T-001
  name: Scaffold Project Initialization
  type: infrastructure
  objective: Initialize a working Astro project with React, Sass, Framer Motion, Radix UI, and Vitest wired in, including baseline browser-default normalization.
  references: project-architecture.md (Technology Selection)
  dependencies: none
  inputs: none (greenfield)
  outputs: buildable Astro project skeleton with all five integrations installed; browser defaults normalized
  acceptanceCriteria:
    - `astro build` and `astro dev` succeed.
    - A trivial React island renders; a trivial Vitest test runs; Sass compiles; Framer Motion and Radix UI import without error.
    - Box-sizing, margin/padding, and default link/list/button chrome are normalized via the Radix UI baseline, independent of brand tokens.
  enablesCommitments: none
  readiness: Ready

- id: T-002
  name: Styling System Foundation
  type: infrastructure
  objective: Establish shared Sass token/mixin partials realizing Project UX's Visual Foundations, and fix the focus-ring/contrast-ratio token values that `accessibility`, `direct-contact`/ui.md, and `presence-links`/ui.md leave Pending.
  references: project-ux.md (Visual Foundations); project-architecture.md (Shared Technical Foundations); accessibility/technical-design.md (Focus-Visible Style Module); accessibility/contract.md (Commitment 3)
  dependencies: T-001
  inputs: Project UX's qualitative colour/typography/spacing constraints; Accessibility Contract's numeric thresholds (≥4.5:1 text, ≥3:1 large text/meaningful UI)
  outputs: colour/typography/spacing/breakpoint/focus-ring token partials; shared interaction-state mixins
  acceptanceCriteria:
    - All token categories (typography scale, spacing scale, fluid responsive bounds, colour system incl. lilac-to-purple gradient family, focus-ring, interaction-state conventions) exist and are importable.
    - Fixed focus-ring/text/UI colour values independently verify ≥4.5:1 (body text) and ≥3:1 (large text, meaningful UI incl. focus indicators) against the near-black background.
  enablesCommitments: none
  readiness: Ready

- id: T-003
  name: Content Layer Schema
  type: infrastructure
  objective: Define the locale-keyed content collection schema for the three domains (structure only).
  references: project-architecture.md (System Structure — Content Layer)
  dependencies: T-001
  inputs: none
  outputs: Astro content collection config, locale-keyed per domain
  acceptanceCriteria:
    - Collections type-check for en/es/eu per domain.
    - A placeholder entry per locale validates against the schema.
  enablesCommitments: none
  readiness: Ready

- id: T-004
  name: Root Layout Composition
  type: infrastructure
  objective: Stand up Root Layout composing three empty Domain Section placeholders in fixed order, with global theme wiring.
  references: project-architecture.md (System Structure, Component Relationships)
  dependencies: T-001, T-002
  inputs: Styling System tokens
  outputs: Root Layout rendering Introduction/Personal Narrative/Connection placeholders in fixed order, brand theme applied
  acceptanceCriteria:
    - The three placeholders render in that exact order; no client-side router across them.
    - Global theme (token colours/typography) applies at the root, on top of T-001's reset.
  enablesCommitments: none
  readiness: Ready

### Implementation — Localization Foundation

- id: T-005
  name: Override Store
  type: implementation
  objective: Implement the tri-state (unset/en/es/eu), synchronously-readable, durable Override Store — write restricted to explicit selection, no clear/reset operation.
  references: language-override/technical-design.md (Override Store); language-override/contract.md (Commitments 3, 4, 5)
  dependencies: T-001
  inputs: none
  outputs: Override Store module (read/write API)
  acceptanceCriteria:
    - Write persists across a simulated reload; read is synchronous with no network call.
    - No clear/reset API exists anywhere in the interface (Commitment 5).
    - Tri-state values (unset/en/es/eu) round-trip correctly.
    - Write path is reachable only from an explicit-selection caller (verified at the module's own interface level — Commitment 3).
  realizesCommitments: language-override Commitments 3, 4, 5
  readiness: Ready

- id: T-006
  name: i18n/Routing Layer Core
  type: implementation
  objective: Build locale detection, the `/en/`, `/es/`, `/eu/` static routes with resolved content/metadata, the root bootstrap's resolution-priority redirect, and its no-JS fallback.
  references: content-localization/technical-design.md (i18n/Routing Layer); content-localization/contract.md (Commitments 1–4)
  dependencies: T-003, T-004, T-005
  inputs: Content Layer schema; Override Store's read interface
  outputs: three static locale routes; root bootstrap script; noscript fallback
  acceptanceCriteria:
    - Override present → active language matches override regardless of detected browser locale (Commitment 1, AC1).
    - No override + supported detected locale → matches; no override + unsupported → English (Commitment 1, AC2–AC3).
    - All visible copy and metadata (title, meta description, html lang, alt text) render in exactly one language per page (Commitment 2).
    - Each locale is reachable directly by URL without detection running first (Commitment 3).
    - First paint already reflects the resolved language; no visible language swap after initial render (Commitment 4).
    - No-JS visitor reaches `/en/` via the noscript fallback.
  realizesCommitments: content-localization Commitments 1, 2, 3, 4
  readiness: Ready

- id: T-007
  name: Cross-Locale Content-Coverage Build Check
  type: implementation
  objective: Implement the build-time/test-time check that fails the build when any content entry present in one locale's collection is missing from another.
  references: content-localization/technical-design.md (Design Decision 4); content-localization/contract.md (Commitment 5)
  dependencies: T-003
  inputs: Content Layer schema
  outputs: a Vitest check runnable at build/test time
  acceptanceCriteria:
    - Check passes when all three locales' collections match.
    - Check fails (non-zero exit / failing test) when an entry exists in one locale's collection but not another's.
  realizesCommitments: content-localization Commitment 5 (mechanism only — real enforcement at T-029)
  readiness: Ready

- id: T-008
  name: Language Switcher Component
  type: implementation
  objective: Build the hydrated dropdown that writes the Override Store on explicit selection, no-ops on reselecting the active language, and reads the Override Store to indicate the active item — unplaced (hosting comes at T-012).
  references: language-override/technical-design.md (Language Switcher Component); language-override/contract.md (Commitments 1, 2; contributes 4)
  dependencies: T-001, T-002, T-005, T-006
  inputs: Override Store's read/write API; the three locale routes
  outputs: standalone Language Switcher Component
  acceptanceCriteria:
    - Selecting a different language writes the override and navigates to that language's route (Commitment 1).
    - Selecting the currently active language is a no-op — no write, no navigation (Commitment 2).
    - The active item is indicated on render, matching the current override (contributes to Commitment 4).
  realizesCommitments: language-override Commitments 1, 2; contributes to 4
  readiness: Ready

### Implementation — Hero Presentation & Section Navigation

- id: T-009
  name: Hero Composition — Elements & Content
  type: implementation
  objective: Render the headline/tagline, ornamental mark, and scroll cue as one localized composition, guaranteeing all three appear together before any interaction regardless of asset weight, with a passive, non-navigating scroll cue.
  references: hero-presentation/technical-design.md (Hero Composition); hero-presentation/contract.md (Commitments 1–3)
  dependencies: T-004, T-006
  inputs: i18n/Routing Layer's resolved headline/tagline content
  outputs: Hero's three elements, localized, within the Introduction Domain Section; heading level and alt text authored (accessibility Commitment 4, AC2/AC4 — verified at T-028)
  acceptanceCriteria:
    - All three elements are present together by the time the visitor scrolls or interacts, regardless of any element's visual weight (Commitment 1).
    - Headline/tagline text matches the language resolved at render time; this Feature never overrides it (Commitment 2).
    - The scroll cue is visually present but activating it never itself causes scrolling or navigation (Commitment 3).
  realizesCommitments: hero-presentation Commitments 1, 2, 3
  readiness: Ready

- id: T-010
  name: Hero Responsive Treatment
  type: implementation
  objective: Apply a purpose-built, device-class-appropriate layout to Hero's elements — not a plain reflow of one layout onto another.
  references: hero-presentation/contract.md (Commitment 4)
  dependencies: T-009
  inputs: Hero's rendered elements (T-009)
  outputs: device-class-specific Hero layout
  acceptanceCriteria:
    - Each device class the visitor's viewport falls into gets a treatment appropriate to it.
    - The smaller device class's composition is not an unmodified scale/wrap of the larger one's layout.
  realizesCommitments: hero-presentation Commitment 4
  readiness: Ready

- id: T-011
  name: Section Navigation — Core Bar & Active-Section State
  type: implementation
  objective: Build the persistent desktop nav bar, anchor-link navigation, logomark-to-Introduction link, compact-logomark conditional presence, and the shared active-section tracking state driving the Active Screen Indicator.
  references: section-navigation/technical-design.md (Section Navigation Composition); section-navigation/contract.md (Commitments 1–5)
  dependencies: T-004, T-006
  inputs: i18n/Routing Layer's resolved nav-label/wordmark text
  outputs: Section Navigation's core component tree and active-section state, rendered at Root Layout level; rendered as a navigable list/landmark (accessibility Commitment 5, AC2 — verified at T-028)
  acceptanceCriteria:
    - The nav bar is rendered and visible on every screen; no visitor action removes it (Commitment 1).
    - Activating "about"/"contact" moves the page position to the correct anchor without a full reload (Commitment 2).
    - The logomark always moves the page position to Introduction's top, from any screen or scroll position (Commitment 3).
    - The compact logomark icon is absent while Introduction is active and present otherwise, derived from one shared active-section state (Commitment 4).
    - The active-section state accurately reflects Introduction on load, the target screen after a nav-link activation, and the correct screen after free-scrolling, never ambiguous (Commitment 5).
    - The divider line renders as two independently-sized segments around whichever mark occupies the row's center — Hero's mark on Introduction (via its exposed visibility sentinel), the compact logomark on Personal Narrative/Connection — never one continuous line hidden behind a mark (Commitment 8).
  realizesCommitments: section-navigation Commitments 1, 2, 3, 4, 5, 8
  readiness: Realized — including Commitment 8, confirmed built in code (Implementation Report, commit `0c462b8`; this entry previously omitted it). The Active Screen Indicator's visual anatomy is now decided (`section-navigation/ui.md`); Commitment 4's new AC3 (mobile logomark) and Commitment 5's `aria-current` exposure are outside this task's original scope — covered by T-040, per the same non-reopening precedent as T-033/T-034.

- id: T-012
  name: Section Navigation — Mobile Overlay & Language-Control Hosting
  type: implementation
  objective: Build the mobile toggle/full-screen-overlay behavior and the language-override hosting slot in both nav forms, reusing the Core task's active-section state and link set.
  references: section-navigation/technical-design.md; section-navigation/contract.md (Commitments 6, 7)
  dependencies: T-011, T-008
  inputs: Section Navigation's core state and link set (T-011); Language Switcher Component (T-008)
  outputs: mobile toggle/overlay; language-control hosting slot in both nav forms
  acceptanceCriteria:
    - Activating the toggle while closed opens a full-screen overlay showing all nav links, the active-indicator, and the language control (Commitment 6, AC1).
    - Activating a link inside the open overlay closes it and navigates to that target (Commitment 6, AC2); an explicit close action closes it without changing the active screen (Commitment 6, AC3); the underlying page is not interactable while open (Commitment 6, AC4).
    - The language override control is present within the desktop bar and the mobile overlay on every screen, without this task altering its own switching/detection/persistence behavior (Commitment 7).
  realizesCommitments: section-navigation Commitments 6, 7
  readiness: Ready

### Implementation — About Narrative

- id: T-013
  name: About Narrative — Text Content & AI Note
  type: implementation
  objective: Render the narrative text and the AI-assisted-development note, localized, with the note always after or alongside the narrative, never before.
  references: about-narrative/technical-design.md; about-narrative/contract.md (Commitments 2, 3; contributes 1)
  dependencies: T-004, T-006
  inputs: i18n/Routing Layer's resolved narrative/AI-note content
  outputs: narrative text + AI note within the Personal Narrative Domain Section; heading level and landmark structure authored (accessibility Commitment 4, AC2/AC4 — verified at T-028)
  acceptanceCriteria:
    - The note's position relative to the narrative text is always after or alongside it, never preceding it (Commitment 2).
    - Narrative text and the AI note text match the language resolved at render time; this Feature never overrides it (Commitment 3).
  realizesCommitments: about-narrative Commitments 2, 3; contributes to 1
  readiness: Ready

- id: T-014
  name: About Narrative — Photo Presentation
  type: implementation
  objective: Render the photo(s) statically and simultaneously, with no toggle/paging/enlargement on interaction, plus the Ornamental Logo's decorative background layer.
  references: about-narrative/contract.md (Commitments 4, 5; contributes 1)
  dependencies: T-013
  inputs: photo assets (placeholders acceptable per this Feature's own Pending item)
  outputs: photo presentation composed alongside T-013's content; the Ornamental Logo background layer; alt text authored (accessibility Commitment 4, AC4 — verified at T-028)
  acceptanceCriteria:
    - When two photos are used, both are present simultaneously (Commitment 4, AC1).
    - No visitor interaction with a photo changes which photo(s) display or enlarges them (Commitment 4, AC2).
    - The Ornamental Logo renders as a non-interactive, low-opacity ambient background layer, never blocking Commitment 1's own completeness (Commitment 5).
    - Commitment 1's full three-piece completeness (narrative, photo, AI note, all present without interaction) is verified jointly once this task and T-013 are composed together.
  realizesCommitments: about-narrative Commitments 4, 5; contributes to 1
  readiness: Realized — including Commitment 5, confirmed built in code (Implementation Report, commit `7236462`; this entry previously omitted it).

### Implementation — Direct Contact

- id: T-015
  name: Direct Contact — CTA & Anti-Scraping Mechanism
  type: implementation
  objective: Build the always-visible, single-action mailto CTA with anti-scraping character-reference encoding, and establish its DOM-order/functional precedence over Presence Links.
  references: direct-contact/technical-design.md; direct-contact/contract.md (Commitments 1, 2, 4)
  dependencies: T-004, T-006
  inputs: i18n/Routing Layer's resolved CTA content
  outputs: CTA anchor within the Connection Domain Section, preceding the future Presence Links slot in DOM order
  acceptanceCriteria:
    - The CTA is present and visible without requiring prior interaction; activating it opens a mailto link as its only effect; no on-site form/data collection or confirmation state appears at any point (Commitment 1).
    - The static HTML source contains neither the plain-text email address nor a directly-parseable literal mailto href; a real visitor's activation still resolves to the correct address (Commitment 2).
    - The CTA is structurally the first actionable contact element, preceding any Presence Link in composition order, and is never superseded in prominence (Commitment 4).
  realizesCommitments: direct-contact Commitments 1, 2, 4
  readiness: Ready

- id: T-016
  name: Direct Contact — Supporting Content & Decorative Mark
  type: implementation
  objective: Render the localized eyebrow/heading/farewell copy and the non-interactive, CTA-subordinate ornamental mark.
  references: direct-contact/contract.md (Commitments 3, 5, 6)
  dependencies: T-015
  inputs: i18n/Routing Layer's resolved farewell content
  outputs: supporting content + decorative mark composed alongside T-015's CTA; heading level and decorative-hiding authored (accessibility Commitment 4, AC2/AC4 — verified at T-028)
  acceptanceCriteria:
    - CTA copy and farewell-line text match the language resolved at render time; this Feature never overrides it (Commitment 3).
    - The farewell line renders statically; no visitor interaction with it triggers any page change (Commitment 5).
    - The ornamental mark carries no interactive/focusable behavior, stays visually subordinate to the CTA, and its presence or absence never affects the CTA's own Commitment 1 guarantee (Commitment 6).
  realizesCommitments: direct-contact Commitments 3, 5, 6
  readiness: Ready

### Implementation — Presence Links

- id: T-017
  name: Presence Link Group Component
  type: implementation
  objective: Build the single, reusable, shared link-data component (static, single-action, new-tab hand-off), unplaced.
  references: presence-links/technical-design.md; presence-links/contract.md (Commitments 1, 2, 3)
  dependencies: T-002
  inputs: Styling System tokens
  outputs: standalone Presence Link Group Composition component
  acceptanceCriteria:
    - Each link is present without requiring prior interaction; activating one opens the external profile as its only effect, in a new tab, leaving the current page's scroll position/state unchanged; no on-site form/data collection or confirmation state appears (Commitment 1).
    - Both future instantiations render from one shared link-data definition — never two independently authored lists — guaranteeing identical set/order wherever composed (Commitment 2).
    - Link labels match across English, Spanish, and Euskera by construction, since Feature UX confirmed the label value as identical across all three (Commitment 3).
  realizesCommitments: presence-links Commitments 1, 2, 3
  readiness: Ready

- id: T-018
  name: Presence Links Placement & Hero Integration
  type: integration
  objective: Compose the component identically into both the Introduction placement (alongside Hero, realizing Hero's own Commitment 5) and the Connection placement (alongside Direct Contact, in DOM order).
  references: presence-links/technical-design.md (Cross-Component Relationships); presence-links/contract.md (Commitment 4); hero-presentation/contract.md (Commitment 5)
  dependencies: T-017, T-009, T-010, T-015, T-016
  inputs: Presence Link Group Composition (T-017); Hero's completed composition (T-009, T-010); Direct Contact's completed composition (T-015, T-016)
  outputs: Presence Links composed into both Domain Sections
  acceptanceCriteria:
    - At the Introduction placement, no presence link is rendered as functionally primary over Hero's headline/tagline, mark, or scroll cue (presence-links Commitment 4, AC1).
    - At the Connection placement, no presence link is rendered as functionally primary over the Direct Contact CTA, and the link is positioned after it in DOM order (presence-links Commitment 4, AC2).
    - On a device class/viewport with room, Hero's composition includes Presence Links as a minor/secondary element; on a constrained viewport, it may be omitted without that being a defect (hero-presentation Commitment 5, AC1–AC2).
    - When shown, Presence Links' visual prominence is subordinate to Hero's three primary elements, and its absence never blocks Hero's own Commitment 1 completeness (hero-presentation Commitment 5, AC3–AC4).
  composesCommitments: presence-links Commitment 4; hero-presentation Commitment 5
  readiness: Ready

### Implementation — Post-Refinement Feature Updates

Revisions to already-`Realized` Features, added after their own original
tasks completed — new tasks rather than reopening T-011's or T-015/
T-016's identities, preserving their completion history (Task Grouping
Rationale).

- id: T-033
  name: Section Navigation — Enlarge Compact Logomark
  type: implementation
  objective: Resize the compact logomark icon to its confirmed 158x292 frame (35% larger than the original 117x216), overflowing above the nav row with a top-margin clearance, bottom edge unchanged.
  references: section-navigation/ui.md (Spacing and Layout — Desktop)
  dependencies: T-011
  inputs: Section Navigation's existing compact logomark rendering (T-011)
  outputs: resized compact logomark icon
  acceptanceCriteria:
    - The icon's frame measures 158x292, uniform scaling from the original 117x216.
    - The icon overflows above the nav row by roughly 76 units, with a small top-margin clearance above its new top edge; its bottom edge stays anchored near the row, unchanged from before.
    - The existing divider gap (~19% of the bar width) is not altered — it already comfortably fits the larger icon.
  realizesCommitments: none — revises T-011's existing Commitment 4 realization, not a new commitment
  readiness: Ready

- id: T-034
  name: Direct Contact — CTA Discoverability Affordance Icon
  type: implementation
  objective: Add the persistent, always-visible envelope-outline affordance icon to the CTA, positioned after the text.
  references: direct-contact/technical-design.md (Direct Contact Composition — icon responsibility); direct-contact/contract.md (Commitment 7)
  dependencies: T-015, T-016
  inputs: the confirmed peaked-envelope SVG (direct-contact/ux.md, Content and Assets)
  outputs: static, inline SVG icon within the CTA anchor; a stable class hook exposed for `motion-interaction`'s own component to target externally
  acceptanceCriteria:
    - The icon is visible immediately upon the Connection screen rendering, without requiring hover, focus, or any prior interaction (Commitment 7, AC1).
    - The icon does not alter the CTA's destination, function, or accessible name (Commitment 7, AC2).
    - The icon ships as static markup — no hydration or client-side logic required.
    - Exposes a stable class hook, consumed later by `motion-interaction`'s T-038, with no dependency in the other direction.
  realizesCommitments: direct-contact Commitment 7
  readiness: Ready

- id: T-040
  name: Section Navigation — Active-Indicator Pill & Mobile Logomark
  type: implementation
  objective: Add the Active Screen Indicator's static background-pill styling, the mobile closed bar's unconditional compact logomark, and the active nav link's aria-current attribute exposure — revising T-011's already-Realized output without reopening its identity.
  references: section-navigation/ui.md (Active Screen Indicator; Mobile logomark addition); section-navigation/technical-design.md (aria-current Design Decision 8; device-split logomark); section-navigation/contract.md (Commitment 4 AC3; Commitment 5); accessibility/technical-design.md (Commitment 5 realized by existing architecture); accessibility/contract.md (Commitment 5 AC1)
  dependencies: T-011
  inputs: Section Navigation's existing active-section state and compact-logomark rendering (T-011)
  outputs: active-link aria-current attribute; static (non-animated) Active Screen Indicator pill; mobile closed-bar compact logomark
  acceptanceCriteria:
    - The active "about"/"contact" link carries aria-current="page"; the inactive one does not (section-navigation Commitment 5; accessibility Commitment 5 AC1 — verified at T-028).
    - A background pill (fully rounded, ~15% opacity accent) renders behind the active link's text, desktop and inside the mobile overlay; the wordmark never carries it; Introduction shows none.
    - Mobile's closed bar renders the compact logomark unconditionally, before the wordmark, on every screen including Introduction (Commitment 4 AC3). Desktop's existing per-screen behavior (AC1/AC2) is unchanged.
  realizesCommitments: section-navigation Commitment 4 AC3 (new); contributes to Commitment 5's visual realization; contributes to accessibility Commitment 5 AC1
  readiness: Ready — Solution, Contract, UI, and Technical Design are all Approved with this exact content.

### Implementation — Motion & Interaction

- id: T-019
  name: Hero Entrance & Ambient Motion Island
  type: implementation
  objective: Build Hero's first-load entrance choreography (mark → headline → scroll cue, once per visit) and post-entrance ambient gradient drift, including the shared Motion Playback Store.
  references: motion-interaction/technical-design.md (Hero Entrance & Ambient Motion Island); motion-interaction/contract.md (Commitment 2; contributes 16)
  dependencies: T-002, T-009, T-010
  inputs: Hero Composition's static output (read-only)
  outputs: Hero Entrance & Ambient Motion Island; Motion Playback Store (shared internal store)
  acceptanceCriteria:
    - The sequenced entrance (mark bloom → headline cascade → scroll cue) completes once per visit; a later in-visit return to Hero shows the settled state directly, no replay.
    - Ambient gradient drift begins only after the entrance settles.
    - With reduced-motion active, the sequence resolves directly to its end-state and the ambient drift never begins.
    - Never alters Hero Composition's own markup or completeness guarantee.
  realizesCommitments: motion-interaction Commitment 2; contributes to 16
  readiness: Ready

- id: T-020
  name: About Narrative Reveal Island
  type: implementation
  objective: Build About Narrative's progressive scroll-triggered reveal and its immediate-reveal behavior on direct-navigation arrival.
  references: motion-interaction/technical-design.md (About Narrative Reveal Island); motion-interaction/contract.md (Commitment 1; contributes 16)
  dependencies: T-002, T-013, T-014, T-019
  inputs: About Narrative Composition's static output (read-only); Motion Playback Store (T-019)
  outputs: About Narrative Reveal Island
  acceptanceCriteria:
    - Not-yet-revealed pieces reveal progressively as the visitor scrolls to them, and stay revealed within the same tab session.
    - Direct-navigation arrival (via the nav's anchor link) reveals every not-yet-revealed piece immediately, with no per-piece animation for that arrival.
    - With reduced-motion active, every piece reaches its revealed state directly, without animation.
  realizesCommitments: motion-interaction Commitment 1; contributes to 16
  readiness: Ready

- id: T-021
  name: Nav Transition Styles
  type: implementation
  objective: Add a smooth transition to the compact-logomark presence change, and synchronize the "about"/"contact" font-weight swap's timing (via `transition-delay`) to the separately-built indicator transition's own phase 2, targeting Section Navigation's existing DOM/class contract with zero code coupling.
  references: motion-interaction/technical-design.md (Nav Transition Styles); motion-interaction/contract.md (Commitment 3; contributes 4, 16)
  dependencies: T-002, T-011
  inputs: Section Navigation's public DOM/class contract (read-only)
  outputs: SCSS transition partial
  acceptanceCriteria:
    - On desktop, the compact-logomark presence change transitions smoothly in both directions, on free scroll or nav-link jump (Commitment 3) — deliverable and verifiable now, using T-011's existing output alone.
    - The "about"/"contact" font-weight swap (bold active / normal inactive) is delayed via `transition-delay` to start at T-041's own phase-2 onset (~30% into its total duration) — a fixed, hand-kept-in-sync constant shared with T-041, not a runtime coordination between the two.
    - Under `prefers-reduced-motion: reduce`, both the logomark transition and the font-weight swap resolve to an instant value change.
    - Never requires Section Navigation's own component code to import or reference this stylesheet.
  realizesCommitments: motion-interaction Commitment 3; contributes to 16
  readiness: Ready — both remaining acceptance criteria are buildable now using T-011's existing output alone; no longer blocked by T-040 now that the indicator's own value-change transition has moved to T-041.

- id: T-035
  name: Hero — Scroll-Linked Content Exit & Mark Transformation
  type: implementation
  objective: Build the Hero's scroll-linked content exit (headline/scroll cue/Presence Links fade) and mark transformation (desktop/tablet-with-space morph into the nav logo; mobile reverse stroke-reveal), sharing one scroll-progress value, including establishing the shared Shared Scroll Progress Store.
  references: motion-interaction/technical-design.md (Hero Entrance & Ambient Motion Island — scroll-linked responsibilities; Shared Scroll Progress Store); motion-interaction/contract.md (Commitments 11, 12; contributes 14, 16)
  dependencies: T-002, T-009, T-010, T-019, T-033
  inputs: Hero Composition's static output (read-only); the confirmed nav-logo target size (T-033)
  outputs: scroll-linked content exit and mark transformation, layered onto T-019's island; Shared Scroll Progress Store (shared internal store)
  acceptanceCriteria:
    - Headline/scroll cue/Presence Links fade continuously (opacity 1→0) tracked directly against scroll position over the Hero's height, reversible in both directions (Commitment 11).
    - Desktop/tablet-with-space: the mark continuously morphs (not crossfades with a second element) into the nav logo's confirmed 158x292 position/form; mobile: the mark dissolves via a reverse trace of its own entrance stroke (Commitment 12, AC1–AC2).
    - Both transformations are reversible 1:1 with scroll position (Commitment 12, AC3); a hysteresis margin prevents visible flicker near the boundary (Commitment 12, AC4).
    - Tablet: no committed behavior — genuinely Pending per Implementation Plan Readiness Issue 6, blocked by a Section Navigation nav-composition decision that doesn't exist yet.
    - Under reduced-motion, both remain fully active and unaffected — driven directly by scroll position, not autoplaying motion (Commitment 16 AC9).
  realizesCommitments: motion-interaction Commitments 11, 12 (desktop/mobile only — tablet not committed); contributes to 14, 16
  readiness: Ready for desktop/mobile. Tablet is Pending — see Implementation Plan Readiness Issue 6.

- id: T-022
  name: Nav Progress Overlay
  type: implementation
  objective: Build the independently-rendered scroll-progress fill as two segment fills aligned to Section Navigation's two existing divider segments, reading a shared, weighted-by-actual-length progress value, with zero code dependency on Section Navigation.
  references: motion-interaction/technical-design.md (Nav Progress Overlay); motion-interaction/contract.md (Commitment 4; contributes 14, 16)
  dependencies: T-002, T-035
  inputs: Styling System layout tokens; Shared Scroll Progress Store's overall page-progress value (established at T-035)
  outputs: Nav Progress Overlay island
  acceptanceCriteria:
    - The overall progress value is computed as actual scrolled distance over total scrollable page height — weighted by each section's real content length, not a fixed 1/3-per-section split.
    - That value maps sequentially across both segments: the first half fills the left segment left-to-right, the second half fills the right segment — a segmented/stepped pattern, not continuous fill across the gap, updating live on desktop.
    - The fill renders correctly regardless of the divider's current segmented/continuous state (T-037's concern, not this task's) — the two visually cohere on the same divider element without depending on each other's code.
    - Under reduced-motion, both segment fills still reflect accurate progress without smoothed interpolation.
    - Never imports or reads Section Navigation's own component internals — alignment via shared Styling System tokens only.
  realizesCommitments: motion-interaction Commitment 4 (progress component only); contributes to 14, 16
  readiness: Deferred — developer decision (2026-09-18) to deprioritize this task for now, independent of its dependencies. T-035 is complete, so desktop scope would otherwise be Ready; mobile treatment remains separately Pending in `motion-interaction/ui.md`. Not to be picked up until explicitly reprioritized.

- id: T-041
  name: Nav Active Indicator Transition Island
  type: implementation
  objective: Build the merged indicator's active-screen transition as a three-phase flatten/travel/sprout sequence via the Motion Layer, as a separate island rendering its own copy of the crest asset, extending Shared Scroll Progress Store with a new active-nav-section value.
  references: motion-interaction/technical-design.md (Nav Active Indicator Transition Island; Shared Scroll Progress Store); motion-interaction/contract.md (Commitment 4; contributes 16)
  dependencies: T-002, T-035, T-040
  inputs: Styling System layout tokens (to align with Section Navigation's static crest position, established at T-040); Shared Scroll Progress Store (established at T-035, extended here)
  outputs: Nav Active Indicator Transition Island; Shared Scroll Progress Store's active-nav-section value (extends the store established at T-035)
  acceptanceCriteria:
    - On nav-link activation or free-scroll section-boundary crossing, the indicator transitions via three sequential, non-overlapping phases — flatten (scaleY 1→~0.05-0.1, transform-origin center, clean ease-out, no overshoot), travel (translateX while flattened), sprout (scaleY back to 1 with a small overshoot/bounce) — approximately 30%/40%/30% of a 250–350ms total duration.
    - The active-nav-section value is derived from each section's top edge crossing a fixed ~30%-from-top viewport point, read from Shared Scroll Progress Store — no separate IntersectionObserver.
    - Renders as its own separate island, not composed inside Section Navigation's component tree, positioned via Styling System tokens to match Section Navigation's static crest position at rest.
    - Under reduced-motion, renders directly in the target position/scale with no animated phases.
  realizesCommitments: motion-interaction Commitment 4 (active-screen component); contributes to 16
  readiness: Ready once T-035 and T-040 complete. T-040 is already Realized; T-035 is Ready but not yet built.

- id: T-023
  name: CTA Interaction Motion
  type: implementation
  objective: Build Direct Contact's CTA hover gradient-sweep and its touch-equivalent momentary feedback.
  references: motion-interaction/technical-design.md (CTA Interaction Motion); motion-interaction/contract.md (Commitments 5, 6; contributes 16)
  dependencies: T-002, T-015
  inputs: Direct Contact's CTA anchor (read-only)
  outputs: CTA Interaction Motion island
  acceptanceCriteria:
    - Hover triggers the gradient-sweep for the hover's duration (Commitment 5); tap triggers the equivalent feedback momentarily (Commitment 6).
    - The anchor's `href`, text content, and anti-scraping encoding remain completely unaltered.
    - Under reduced-motion, a discrete, non-animated visual change registers interaction instead of the sweep.
  realizesCommitments: motion-interaction Commitments 5, 6; contributes to 16
  readiness: Ready

- id: T-024
  name: Secondary Interaction Feedback Styles
  type: implementation
  objective: Build the shared hover/focus/touch feedback treatment for Section Navigation's nav links, both Presence Links placements, and the Language Switcher's trigger/options.
  references: motion-interaction/technical-design.md (Secondary Interaction Feedback Styles); motion-interaction/contract.md (Commitments 7, 8; contributes 9, 16)
  dependencies: T-002, T-008, T-011, T-018
  inputs: each target's existing public DOM (read-only)
  outputs: SCSS feedback partial
  acceptanceCriteria:
    - Hover/focus on nav links produces feedback observably distinguishing them from rest, without altering destination (Commitment 7).
    - Hover/focus on Presence Links produces the same distinguishing feedback identically at both placements, without altering destination or new-tab behavior (Commitment 8).
    - Hover is gated to `(hover: hover) and (pointer: fine)`; `:active` covers touch/coarse-pointer input on all three targets, including the switcher's trigger/options (contributes to Commitment 9, AC3).
    - Under reduced-motion, the fill's transition duration is disabled.
  realizesCommitments: motion-interaction Commitments 7, 8; contributes to 9, 16
  readiness: Ready. Full Commitment 9 verification (dropdown open/close plus hover/focus/touch feedback together) requires this task and T-025 both complete.

- id: T-025
  name: Switcher Dropdown Transition
  type: implementation
  objective: Build the Language Switcher's dropdown open/close transition, targeting its Radix `data-state` attribute with zero code coupling.
  references: motion-interaction/technical-design.md (Switcher Dropdown Transition); motion-interaction/contract.md (Commitment 9; contributes 16)
  dependencies: T-002, T-008
  inputs: Language Switcher's open/closed state exposure (read-only)
  outputs: SCSS transition partial
  acceptanceCriteria:
    - The dropdown's open and its close are each an observable, discrete transition (Commitment 9, AC1–AC2).
    - Under reduced-motion, the transition resolves to an instant state change.
    - Never alters Language Override's own selection, persistence, or no-op behavior.
  realizesCommitments: motion-interaction Commitment 9 (open/close only); contributes to 16
  readiness: Ready. Full Commitment 9 verification requires this task and T-024 both complete.

- id: T-036
  name: About Narrative — Photo Tilt
  type: implementation
  objective: Add cursor-driven (desktop, max 4°) and scroll-driven (mobile) tilt to About Narrative's revealed photos, additive to any existing base rotation.
  references: motion-interaction/technical-design.md (About Narrative Reveal Island — tilt responsibilities); motion-interaction/contract.md (Commitment 13)
  dependencies: T-002, T-013, T-014, T-020
  inputs: About Narrative Composition's revealed photos (read-only, via T-020's reveal state)
  outputs: photo tilt, layered onto T-020's island
  acceptanceCriteria:
    - Desktop: tilt follows cursor position while hovered, up to 4°, additive to any existing base rotation; eases back to rest on cursor-leave, not an instant snap (Commitment 13, AC1–AC2).
    - Mobile: tilt derives from scroll direction/velocity, without requesting or requiring any device orientation/motion permission (Commitment 13, AC3).
    - Applies only to photos already `Revealed` (T-020's state) — a `Hidden` photo doesn't tilt.
    - Under reduced-motion, disabled entirely — photos remain at their static base rotation, no cursor/scroll-driven tilt (Commitment 16 AC10).
  realizesCommitments: motion-interaction Commitment 13
  readiness: Ready

- id: T-037
  name: Nav Divider Segment Transition
  type: implementation
  objective: Add a smooth extend/retract transition to the divider's segmented/continuous state, targeting Section Navigation's exposed segmentation-state class with zero code coupling.
  references: motion-interaction/technical-design.md (Nav Divider Segment Transition); motion-interaction/contract.md (Commitment 10; contributes 16)
  dependencies: T-002, T-011
  inputs: Section Navigation's exposed segmentation-state class/attribute (read-only — already built, per Implementation Report commit `0c462b8`)
  outputs: SCSS transition partial
  acceptanceCriteria:
    - While a mark occupies the divider's center, it renders segmented; otherwise continuous (Commitment 10, AC1–AC2).
    - The transition between states is observable and discrete, not an instantaneous snap (Commitment 10, AC3).
    - Independent of the Merged Active/Progress Indicator's active-screen transition — the two may coincide on Introduction but are governed separately (Commitment 10, AC4).
    - Under reduced-motion, resolves to an instant state change.
    - Never requires Section Navigation's own component code to import or reference this stylesheet.
  realizesCommitments: motion-interaction Commitment 10; contributes to 16
  readiness: Ready — Section Navigation's exposed segmentation state already exists in code (commit `0c462b8`), so this task has no upstream blocker despite being new.

- id: T-038
  name: Direct Contact — CTA Discoverability Motion
  type: implementation
  objective: Build the CTA's underline draw-on, tap scale-down, and the affordance icon's tap flourish.
  references: motion-interaction/technical-design.md (CTA Interaction Motion — discoverability responsibilities); motion-interaction/contract.md (Commitment 15; contributes 16)
  dependencies: T-002, T-023, T-034
  inputs: Direct Contact's CTA anchor and affordance icon (read-only, T-034's exposed class hook)
  outputs: underline draw-on, tap scale-down, and icon flourish, layered onto T-023's island
  acceptanceCriteria:
    - Hovering the CTA produces an underline that draws left-to-right beneath the text, in addition to T-023's existing sweep (Commitment 15, AC1).
    - Tapping/clicking produces a momentary scale-down of the text (Commitment 15, AC2), and a brief flourish on the affordance icon at the same moment (Commitment 15, AC4).
    - Neither treatment alters the CTA's destination, function, or the icon's presence/accessible name (Commitment 15, AC3, AC5).
    - The icon flourish targets T-034's exposed class hook, not its component code — no import or code dependency in either direction.
    - Under reduced-motion, all three resolve to their final state without the draw-on/scale/flourish motion, consistent with the existing hover-feedback pattern (Commitment 16 AC8).
  realizesCommitments: motion-interaction Commitment 15; contributes to 16
  readiness: Ready

### Implementation — Accessibility

- id: T-026
  name: Focus-Visible Style Module
  type: implementation
  objective: Apply a universal, automatic `:focus-visible` style to every interactive element site-wide.
  references: accessibility/technical-design.md (Focus-Visible Style Module); accessibility/contract.md (Commitment 2; contributes 3)
  dependencies: T-002
  inputs: Styling System's focus-ring token values (fixed at T-002)
  outputs: global focus-visible stylesheet
  acceptanceCriteria:
    - Every interactive element shows the focus indicator on keyboard focus only, not on mouse click.
    - The indicator is perceivable against both the near-black base and gradient-accent backgrounds.
    - No Feature's own component needs to import or opt into this module.
  realizesCommitments: accessibility Commitment 2; contributes to 3
  readiness: Ready — the Styling System token values this depends on are already fixed by T-002.

### Verification — Motion & Accessibility (Phase 6)

- id: T-028
  name: Accessibility Verification Pass
  type: verification
  objective: Verify, across everything built in Phases 1–5, the accessibility commitments that rely on already-existing mechanisms rather than a dedicated component.
  references: accessibility/contract.md (Commitments 1, 3, 4, 5, 6); accessibility/technical-design.md (Commitments Realized by Existing Architecture)
  dependencies: T-002, T-006, T-008, T-009, T-010, T-011, T-012, T-013, T-014, T-015, T-016, T-040
  inputs: the full set of Features built in Phases 1–5
  outputs: a verification record (pass/fail per commitment, with fixes applied where needed)
  acceptanceCriteria:
    - Every interactive element is Tab/Shift+Tab reachable and keyboard-activatable, in visual/reading order (Commitment 1).
    - Rendered text/UI contrast meets ≥4.5:1 (body) / ≥3:1 (large text, meaningful UI) using T-002's fixed token values, in all three locales (Commitment 3).
    - Heading/landmark structure and alt-text/decorative-hiding are correct across every Domain Section's authored markup (per T-009/T-011/T-013/T-015's own acceptance items), and non-interactive elements are never exposed as focusable (Commitment 4).
    - The active nav link exposes `aria-current="page"` matching the actual current section at every scroll position, and the nav's link set is exposed as a navigable list/landmark (Commitment 5).
    - `html lang` matches the active language immediately after a Language Override switch, with no code path producing a mismatch (Commitment 6).
  validatesCommitments: accessibility Commitments 1, 3, 4, 5, 6
  readiness: Ready once all listed dependencies are complete.

### Verification — Application-Level Validation (Phase 7)

- id: T-029
  name: Full-Content Cross-Locale Coverage Exercise
  type: verification
  objective: Run T-007's coverage check against the complete, real, authored content from Phases 1–5 and close any gap found.
  references: content-localization/contract.md (Commitment 5)
  dependencies: T-007, T-009, T-013, T-014, T-015, T-016, T-018
  inputs: complete English, Spanish, and Euskera content across all content-bearing Features
  outputs: a clean coverage-check run
  acceptanceCriteria:
    - The check passes with zero missing entries across every content surface, in all three languages.
  validatesCommitments: content-localization Commitment 5
  readiness: Ready once all listed dependencies are complete.

- id: T-030
  name: Whole-Experience Accessibility Regression (Post-Motion)
  type: verification
  objective: Re-verify T-028's commitments hold once Phase 6's motion layer is composed in, and confirm motion doesn't introduce a new accessibility defect.
  references: accessibility/contract.md (Commitments 1, 2, 3, 4, 5, 6)
  dependencies: T-019, T-020, T-021, T-022, T-023, T-024, T-025, T-026, T-028, T-033, T-034, T-035, T-036, T-037, T-038, T-040
  inputs: the fully composed, motion-enabled experience
  outputs: a verification record
  acceptanceCriteria:
    - Keyboard operability, contrast, focus visibility, AT compatibility, nav current-state AT exposure, and document-language sync all still hold with motion active.
  validatesCommitments: accessibility Commitments 1, 2, 3, 4, 5, 6
  readiness: Ready once all listed dependencies are complete.

- id: T-031
  name: Reduced-Motion Equivalence Cross-Check
  type: verification
  objective: Verify reduced-motion functional equivalence holds simultaneously across every `motion-interaction` consumer together, not just per-component.
  references: motion-interaction/contract.md (Commitment 16)
  dependencies: T-019, T-020, T-021, T-022, T-023, T-024, T-025, T-035, T-036, T-037, T-038
  inputs: the fully composed motion layer under `prefers-reduced-motion: reduce`
  outputs: a verification record
  acceptanceCriteria:
    - With reduced-motion active site-wide, every animated end-state remains reachable and no information or feedback is lost anywhere in the composed experience.
    - Two components are deliberately exempt from the "resolves to end-state directly, no motion" pattern, per Commitment 16 AC9/AC10 — confirm each holds its own specific treatment, not the default one: T-035's Hero scroll-linked content exit and mark transformation stay fully active and scroll-driven (they are not autoplaying motion, so are not suppressed); T-036's photo tilt is disabled entirely (no cursor/scroll-driven rotation at all, not merely non-animated).
  validatesCommitments: motion-interaction Commitment 16
  readiness: Ready once all listed dependencies are complete.

- id: T-032
  name: Full Responsive & Locale Regression
  type: verification
  objective: Regression-test the composed three-domain experience across device classes and all three locales.
  references: project-design.md (Cross-Functional Rules); project-ux.md (Visual Foundations — responsive scaling outcome)
  dependencies: T-009, T-010, T-011, T-012, T-013, T-014, T-015, T-016, T-018, T-029, T-030, T-031, T-033, T-034, T-040
  inputs: the fully integrated, motion-complete, three-locale experience
  outputs: a verification record
  acceptanceCriteria:
    - Every screen holds its composition, hierarchy, and functionality at both device classes and in all three languages, with no defect specific to a device-class/locale combination.
  validatesCommitments: none (cross-cutting, whole-experience check)
  readiness: Ready once all listed dependencies are complete.

### Infrastructure — Final Cleanup

- id: T-039
  name: Sass `calc()` Readability Refactor
  type: infrastructure
  objective: Simplify and clarify the codebase's existing dense/nested `calc()` expressions — no visual or behavioral change, readability only.
  references: none — a code-quality pass over existing implementation, not traceable to any Feature Commitment
  dependencies: T-002, T-009, T-010, T-011, T-012, T-013, T-014, T-015, T-016, T-017, T-018, T-033, T-034, T-035, T-036, T-037, T-038, T-040
  inputs: the full Sass codebase at that point, including `src/styles/mixins/_fluid.scss` (the `clamp(calc(...))` fluid-scaling composition) and `src/features/section-navigation/SectionNav.module.scss` (the divider-gap math, the `117/216`-style ratio calc, and centering-offset calcs) — the two files confirmed to contain dense `calc()` today; any other `calc()` introduced by Phase 6's motion work or by T-040's pill/logomark sizing in the meantime is in scope too
  outputs: the same Sass files, refactored for readability (named intermediate Sass variables/comments explaining each ratio or offset in place of unlabeled inline arithmetic)
  acceptanceCriteria:
    - Every existing `calc()` expression this task touches is functionally identical before and after — verified by pixel-level screenshot comparison at both device classes, not just a visual glance.
    - `npm run build` and the full test suite still pass unchanged.
    - No new visual defect, regression, or behavior change is introduced anywhere the refactored partials apply.
  enablesCommitments: none
  readiness: Ready once all listed dependencies are complete — deliberately scheduled last, per explicit user decision, so it accounts for every `calc()` this project will ever introduce rather than needing a second pass.

---

*Created: 2026-09-09*
