# Technical Design: Section Navigation

**Status:** Approved

## Technical Components

### Section Navigation Composition

**Purpose**

Realize `section-navigation`'s Feature Contract by rendering the
persistent navigation surface — desktop bar / mobile toggle+overlay —
once at Root Layout level, visible and functional across all three
Domain Sections.

**Responsibilities**

- Render, once at Root Layout composition level (not nested inside any
  single Domain Section), a persistent nav surface present across all
  three Domain Sections' scroll extent (Commitment 1).
- Provide anchor-based links to Personal Narrative's and Connection's
  anchor targets, and a logomark link fixed to Introduction's top anchor
  — same-page navigation only, no route change (Commitments 2, 3).
- Track, at runtime, which Domain Section currently occupies the
  viewport, exposing it as one shared "active section" state (Commitment
  5).
- Derive the compact logomark icon's presence from that same
  active-section state — hidden while Introduction is active, shown
  otherwise (Commitment 4); not a second, independently tracked concept.
- On mobile, provide a toggle that opens/closes a full-screen overlay
  exposing the same links, the active-section indicator, and the
  language control's hosting slot; closes on link activation (with
  navigation) or an explicit close action (without navigation)
  (Commitment 6).
- Render a hosting slot for the language override control within both
  the desktop bar and the mobile overlay, without owning or rendering
  the control's own behavior (Commitment 7).
- Render the connecting line as two independent segments with a gap,
  never one continuous line covered by a mark, wherever a mark occupies
  the row's center: the nav's own compact logomark icon (Personal
  Narrative/Connection, constant), or an externally observed signal
  indicating Hero's mark remains visible at that position (Introduction
  only, scroll-derived) — reverting to one segment-free continuous line
  once neither condition holds (Commitment 8).

**Owned Concepts**

- The single "active section" runtime state (which of the three Domain
  Sections currently occupies the viewport) — the one source both the
  Active Screen Indicator and the compact-logomark condition derive
  from.
- Mobile overlay open/closed state.
- A second runtime state, distinct from "active section," tracking
  whether a mark currently occupies the row's center: derived from the
  existing logomark condition on Personal Narrative/Connection, and from
  an externally observed scroll signal (see Collaborations) while on
  Introduction.

**Collaborations**

- Hero Composition — this Feature observes, but does not own, a
  scroll-position signal indicating whether Hero's own mark remains
  visible at the nav row's position (e.g. a sentinel element at the
  mark's own visible boundary, observed the same way Domain Section
  boundaries already are). The exact mechanism is Hero's own Technical
  Design's decision to expose; this Feature only consumes the resulting
  boundary state.

- Root Layout — composes this component once, outside/above the three
  Domain Sections, so it can persist and observe all three uniformly.
- Accessible Primitives Layer (Radix UI) — underlies the toggle/overlay's
  interactive and focus-management behavior (Project Architecture
  explicitly names "in-page navigation aid" as built on this layer).
- Styling System — supplies typography/spacing/colour tokens (Feature UI
  Definition).
- i18n/Routing Layer — supplies locale-resolved "about"/"contact" display
  text and the wordmark.
- `language-override`'s own component — hosted within this component's
  markup at a defined slot; not owned or rendered by this component.
- Domain Sections (Introduction/Personal Narrative/Connection) —
  observed for anchor targets and active-section boundaries; not owned
  or modified.

**Dependencies**

- Root Layout (Project Architecture) — external.
- Accessible Primitives Layer — external.
- i18n/Routing Layer — external.
- `language-override`'s own component — external; hosted, not owned.
- Domain Sections — external; observed only.

**Constraints**

- Must hydrate as a client-side island — active-section tracking and
  overlay state are runtime concerns unresolvable at static build time
  (Project Architecture explicitly anticipates this).
- No client-side router or route change on link activation (Project
  Architecture: domains are composed, not routed) — satisfied by
  same-page anchor navigation only.
- No server/API/network call — this component reads only local
  scroll/viewport state and already-resolved locale content.
- Interactive elements (toggle, close control, links) must be built on
  the Accessible Primitives Layer, not custom-built — inherited from
  Architecture's "accessible by construction" principle, realizing
  Feature UX's accessibility requirement rather than inventing a new
  one.
- The compact logomark's presence must be derived from the shared
  active-section state, never tracked separately — a second,
  independently-maintained state would risk disagreeing with the Active
  Screen Indicator, which the Contract does not allow.

**Design Decisions**

1. One shared "active section" state drives both the Active Screen
   Indicator and the compact-logomark condition, rather than two
   independently tracked states. Rationale: Feature Solution's "composed
   over the Hero screen" framing plus Project UX's single
   persistent-bar description indicate one nav instance reacting to one
   underlying scroll position; tracking it twice risks desync, which
   Commitments 4 and 5 together forbid.
2. Section Navigation Composition renders at Root Layout level, not
   nested inside any one Domain Section. Rationale: it must remain
   functional across all three Domain Sections' scroll extent
   (Commitment 1); nesting inside one section would tie its lifecycle to
   that section alone.
3. Active-section determination and overlay state are resolved only at
   runtime, via client-side hydration — no attempt to resolve them at
   build time. Rationale: both depend on the visitor's live scroll
   position/interaction, information unavailable at build time,
   consistent with Architecture's static-first hydration principle.
4. This component hosts, but does not own, the language override
   control. Rationale: mirrors `presence-links`' composed-but-not-owned
   precedent; keeps `language-override`'s own switching/detection/
   persistence logic in its own Technical Design, consistent with
   Feature Definition's boundary.
5. The static (pre-hydration) baseline renders the wordmark,
   "about"/"contact" links with correct anchor hrefs, and the toggle
   button — functional without JS — with the compact logomark omitted
   by default, matching Commitment 5 AC1's "Introduction active on
   initial load." Hydration then takes over to update the active-section
   state, the compact-logomark condition, and the overlay's
   interactivity. Rationale: keeps the nav's core navigation
   (Commitments 1–3) working even before/without hydration completing,
   consistent with Architecture's static-first, fast-first-paint
   principle — this Feature's only meaningful failure mode is "JS
   hasn't hydrated yet," not a data or network failure.
6. The desktop bar and mobile toggle/overlay are two responsive
   presentations of one component tree (Styling System breakpoints
   determine which renders), not two separately maintained components.
   Rationale: avoids duplicating active-section/link/logomark logic
   across two implementations; matches Feature UI's framing of them as
   two realizations of one Feature.
7. The divider line is structurally two independently rendered segments
   (each sized via Styling System breakpoint/proportion tokens), not one
   continuous line with a mark rendered on top to visually cover it.
   Rationale: the current implementation does the latter by coincidence
   (the compact-logomark placeholder's height happens to cover the
   border), which is exactly the kind of accidental-not-designed state
   this phase exists to close — and it structurally cannot produce
   Introduction's segmented state at all, since no element there
   currently covers the line.

**Contract Traceability**

- Commitment 1 → Root-Layout-level rendering, present across all Domain
  Sections' scroll extent.
- Commitment 2 → anchor-link navigation to Domain Section anchors, no
  route change.
- Commitment 3 → logomark link's fixed target (Introduction's top
  anchor).
- Commitment 4 → derived from the shared active-section state.
- Commitment 5 → the active-section state itself (client-side
  observation of Domain Section boundaries).
- Commitment 6 → mobile overlay open/close state, built on the
  Accessible Primitives Layer.
- Commitment 7 → hosting slot for `language-override`'s own component,
  in both nav forms.
- Commitment 8 → the two-segment line as an Owned runtime state, driven
  by the logomark condition (Personal Narrative/Connection) or the
  externally observed Hero-mark-visibility signal (Introduction).

## Cross-Component Relationships

- Root Layout → Section Navigation Composition: composes it once,
  outside/above the three Domain Sections.
- Section Navigation Composition → Domain Sections: observes
  anchors/boundaries for active-section state and link targets; does not
  render or own their content.
- Section Navigation Composition → Accessible Primitives Layer: consumes
  it for toggle/overlay interactivity (Existing pattern, explicitly
  anticipated by Architecture).
- Section Navigation Composition → Styling System: consumes shared
  tokens (Existing pattern).
- Section Navigation Composition → i18n/Routing Layer: consumes
  locale-resolved label/wordmark text (Existing pattern).
- Section Navigation Composition → `language-override`'s own component:
  hosts it at a defined slot; no reverse dependency introduced here.
- No dependency on `motion-interaction`'s Motion Layer; its technical
  design (out of scope here) may apply transition treatment to this
  component's output, depending outward on it, not the reverse (mirrors
  Direct Contact's precedent).
- No dependency on `presence-links` — consistent with Feature
  Definition's flagged boundary.

No circular dependencies: Section Navigation Composition depends outward
on Root Layout (as composing parent), the Accessible Primitives Layer,
the Styling System, the i18n/Routing Layer, and the Domain Sections
(observed only); none depend back on it functionally.

---

*Created: 2026-09-07*
