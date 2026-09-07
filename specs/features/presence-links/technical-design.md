# Technical Design: Presence Links

**Status:** Approved

## Technical Components

### Presence Link Group Composition

New identity — a sibling component within both the Introduction and
Connection Domain Sections (Project Architecture).

**Purpose**

Realize `presence-links`' Feature Contract by rendering the same set of
external profile links (Instagram, LinkedIn) as one reusable, static
composition, instantiated identically within both Domain Sections.

**Responsibilities**

- Render each profile link as a static anchor using a `target` attribute
  directing the browser to open a new browsing context (Commitment 1
  AC3) — no script-driven `window.open`.
- Render the exact same link set (same profiles, same order) from a
  single shared definition in both instantiations — never two
  independently authored lists (Commitment 2).
- Render each link's visible text as the platform name itself
  ("Instagram"/"LinkedIn") — satisfying the accessible-name UX Constraint
  by construction, since there's no icon-only rendering to compensate
  for.
- Render activation as a single, stateless native link hand-off — no
  in-page loading/confirmation state, no form fields, no data collection
  (Commitment 1 AC1, AC4, AC5).

**Owned Concepts**

- The static, locale-independent profile link data (platform label +
  destination URL pairs, in their confirmed order) — defined once,
  consumed by both instantiations.
- The "opens in a new browsing context" anchor mechanism.

**Collaborations**

- Introduction Domain Section — hosts one instantiation, positioned per
  Feature UI (bottom-left), composed alongside Hero Composition
  (external; not owned here).
- Connection Domain Section — hosts the other instantiation, composed
  alongside Direct Contact Composition, following it in DOM order (per
  Direct Contact's own Technical Design, which already established this
  precedence relative to `presence-links`).
- Styling System — supplies the label typography tier, lavender/accent
  colour token, and spacing primitives (Feature UI Definition).

**Dependencies**

- Introduction Domain Section, Connection Domain Section (Project
  Architecture) — external; composed inside each, doesn't own or define
  either.
- Styling System (Project Architecture) — external, not redefined here.
- No dependency on the i18n/Routing Layer — see Design Decisions.

**Constraints**

- No server/API/network call may resolve or transmit any profile-link
  action at any point (Project Architecture: native browser links only,
  no API/network calls) — satisfied by construction via static,
  build-time-embedded anchors.
- No client-side script or hydration required — no React island —
  consistent with Architecture's static-first principle.
- Content is locale-independent — unlike sibling Features, no
  locale-content-completeness concern applies here.

**Design Decisions**

- Native anchor with a `target` attribute for "opens in a new tab,"
  rather than a script-driven mechanism. Rationale: satisfies Commitment
  1 AC3 with zero script/hydration, works identically with or without
  JavaScript.
- A single shared link-data definition, instantiated identically inside
  both Domain Sections, rather than two independently maintained lists.
  Rationale: the only mechanism that can guarantee Commitment 2's
  cross-placement consistency without risking future divergence.
- No i18n/Routing Layer consumption for this component's own content.
  Rationale: Feature UX confirmed both the platform labels and
  destination URLs as language-independent; routing static, non-varying
  content through locale resolution would add a dependency with no
  functional purpose.
- Purely static component, no React island, no Framer Motion. Rationale:
  static-first principle; none of this Feature's committed behaviors
  need client-side logic.

**Contract Traceability**

- Commitment 1 → static anchors with a `target` attribute; no
  client-side state.
- Commitment 2 → single shared link-data definition instantiated
  identically in both Domain Sections.
- Commitment 3 → satisfied by construction: Feature UX confirmed the
  label value as identical across English/Spanish/Euskera, so whichever
  locale resolves, the visible label already matches — no active
  per-locale resolution step needed.
- Commitment 4 → DOM-order positioning: composed after Hero Composition
  within the Introduction Domain Section, and after Direct Contact
  Composition within the Connection Domain Section (matching Direct
  Contact's existing DOM-order design).

## Cross-Component Relationships

- Root Layout → Introduction Domain Section, Connection Domain Section:
  composes both in fixed order (Existing).
- Introduction Domain Section → Hero Composition + Presence Link Group
  Composition: composes both; Hero Composition precedes it in DOM order
  (mirrors the Connection-side precedence pattern).
- Connection Domain Section → Direct Contact Composition + Presence Link
  Group Composition: composes both; Direct Contact Composition precedes
  it in DOM order (Existing pattern, already established by Direct
  Contact's own Technical Design).
- Presence Link Group Composition → Styling System: consumes shared
  tokens.
- No dependency on `section-navigation` or `motion-interaction` (boundary
  preserved); `motion-interaction`'s technical design, out of scope
  here, may wrap/hydrate elements this component renders, depending
  outward on it, not the reverse.

No circular dependencies: this component depends outward on the Styling
System only; neither Hero Composition nor Direct Contact Composition
depends back on it — each only establishes DOM-order precedence over it.

---

*Created: 2026-09-07*
