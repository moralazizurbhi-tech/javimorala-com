# Technical Design: Motion & Interaction

**Status:** Approved

## Technical Components

### Hero Entrance & Ambient Motion Island

**Purpose**

Realize the Hero first-load entrance choreography and the post-entrance
ambient gradient drift (Contract Commitment 2), layered on top of Hero
Composition's static output without altering it.

**Responsibilities**

- Hydrate as a thin client-side island composed around Hero Composition's
  static markup (the framework's static-children-in-island composition
  pattern), individually targeting the three existing elements
  (background mark, headline, scroll cue) it already renders.
- On mount, read Motion Playback Store's Hero-entrance-played flag. If not
  played: sequence the three elements' appearance per Feature UI's order
  (mark bloom → headline cascade, overlapping → scroll cue after a pause)
  and pacing, then write the flag as played. If already played: render
  all three in their final settled state directly, no animation.
- After settling (by either path), begin the ambient gradient drift on
  the background mark, unless reduced-motion is active.
- Read the reduced-motion platform signal directly; when active, skip the
  entrance sequence to its end-state and never begin the ambient drift
  (Commitment 7).

**Owned Concepts**

- The entrance sequencing/orchestration logic and its per-element
  targeting within Hero Composition's static markup.
- The ambient-drift loop's start/stop lifecycle.

**Collaborations**

- Hero Composition (external, `hero-presentation`) — wraps its static
  output; depends outward on it, per Hero's own Technical Design ("may
  wrap/hydrate elements this component renders; it depends outward on
  Hero Composition's static output, not the reverse").
- Motion Playback Store (internal to this Feature) — reads/writes the
  entrance-played flag.
- Motion Layer (Framer Motion, external, Project Architecture) — the
  animation mechanism.
- Reduced-motion platform signal (external, browser) — read-only.

**Dependencies**

- Hero Composition — external, read-only (static output only).
- Motion Playback Store — internal.
- Motion Layer — external.

**Constraints**

- Must not alter Hero Composition's markup, content, or its own
  completeness guarantee (Hero Contract Commitment 1) — this component
  only adds presentation-layer motion around already-complete static
  output.
- Must hydrate as a client-side island — entrance sequencing and ambient
  motion are runtime concerns unresolvable at static build time.
- Must never repeat the entrance sequence once the visit-scoped flag is
  set, regardless of how many times Hero re-enters the viewport via
  scroll (Commitment 2 AC2).

**Design Decisions**

1. Composed around Hero Composition's static output via the
   static-children-in-island pattern, rather than converting Hero
   Composition itself into a React island. Rationale: preserves Hero's
   own static-first design (its Technical Design explicitly keeps it
   static); motion is a separate, additive concern layered on top, per
   the dependency direction Hero's own design already establishes.
2. Reduced-motion is read directly from the platform signal by this
   component, not from a shared owned store. Rationale: it is read-only
   external state, not app-owned data; no shared component is needed for
   every consumer to read the same platform signal independently.

**Contract Traceability**

- Commitment 2 → entrance sequencing, once-per-visit guard via Motion
  Playback Store.
- Contributes to Commitment 7 → reduced-motion handling for the entrance
  and the ambient drift.

### Motion Playback Store

**Purpose**

Own the technical concept of "which one-time, visit-scoped motion
moments have already played" — the sole reader/writer for the Hero
entrance-played flag and the About Narrative revealed-piece-ID set.

**Responsibilities**

- Persist a boolean (Hero entrance played) and a set of piece identifiers
  (About Narrative pieces revealed), both scoped to the current browser
  tab session — surviving a same-tab reload (including a language-switch
  route change) but not surviving to a genuinely new visit (new tab/
  window, or the session ending).
- Expose read/write operations to Hero Entrance & Ambient Motion Island
  (the played flag) and About Narrative Reveal Island (the revealed-piece
  set); no other component reads or writes it.
- Expose no operation that clears an individual flag once set within the
  same tab session — a piece or the Hero sequence, once marked played/
  revealed, stays that way for the rest of that session.

**Owned Concepts**

- The played/revealed values' storage and retrieval mechanism.
- The tab-session-scoped persistence semantic (distinct from
  `language-override`'s Override Store, which is durable across visits
  indefinitely — this store is deliberately narrower-scoped).

**Collaborations**

- Hero Entrance & Ambient Motion Island — reads/writes the entrance-played
  flag.
- About Narrative Reveal Island — reads/writes the revealed-piece set.

**Dependencies**

None internal; no outward dependency on either collaborator.

**Constraints**

- No backend/server persistence (Project Architecture forbids any
  backend/API call) — client-side-only browser storage.
- Must be tab-session-scoped, not durable across a genuinely new visit —
  the functional distinction from a permanent preference like the
  language override.
- Must survive a same-tab route change (a language switch), since that
  is treated as continuing the same visit, not starting a new one.
- The exact storage API is an Implementation-level choice, not fixed
  here, consistent with how `language-override`'s Override Store left
  the same category of detail open.

**Design Decisions**

1. Modeled as a single shared store for both flags, rather than each
   consuming island managing its own persistence independently.
   Rationale: both are the same category of concept (one-time,
   visit-scoped motion memory) with the same persistence semantic;
   a shared owner avoids two independent, potentially inconsistent
   implementations of the same rule.
2. Scoped to the browser tab session rather than either pure in-memory
   state or a permanently-durable mechanism. Rationale: Project
   Architecture's single continuous page and anchor-based in-page
   navigation mean a plain in-memory island would already survive normal
   in-page returns to Hero without any store at all; the store's actual
   purpose is surviving the one genuine reload this site produces (a
   language-switch route change), which is a real technical requirement
   in Feature Solution's Constraints. Treating a language switch as
   still "the same visit" is a deliberate interpretation, not an
   inherited fact — chosen because the visitor has not left the site.
   Not scoped further (durable across true new visits) because nothing
   in the Feature Contract requires the entrance/reveal to stay
   permanently skipped on a return visit.

**Contract Traceability**

- Commitment 1 → the revealed-piece set (About Narrative's one-way
  reveal).
- Commitment 2 → the entrance-played flag (Hero's once-per-visit rule).

### About Narrative Reveal Island

**Purpose**

Realize About Narrative's progressive scroll-triggered reveal and its
direct-navigation-arrival immediate-reveal behavior (Contract Commitment
1), layered on top of About Narrative Composition's static output.

**Responsibilities**

- Hydrate as a thin client-side island composed around About Narrative
  Composition's static markup, individually targeting its
  already-separately-addressable paragraph and photo units.
- On mount, read Motion Playback Store for already-revealed piece IDs and
  render those immediately in their revealed state, no animation.
- For not-yet-revealed pieces, observe each piece's viewport intersection
  and reveal it (with the entrance treatment Feature UI describes) when
  reached during scroll; on reveal, write that piece's ID to Motion
  Playback Store.
- Distinguish direct-navigation arrival from progressive-scroll arrival
  by listening for the browser's native same-page anchor-navigation
  signal (a hash change / anchor activation) targeting this section's own
  anchor. When that signal fires, reveal every not-yet-revealed piece in
  the section immediately, write all their IDs to Motion Playback Store,
  and do not apply per-piece scroll-triggered animation for that arrival.
- Read the reduced-motion platform signal directly; when active, every
  piece reaches its revealed state directly, without the scroll-triggered
  or direct-arrival animation (Commitment 7).

**Owned Concepts**

- The viewport-intersection-driven per-piece reveal logic.
- The direct-navigation-arrival detection and its all-at-once reveal
  behavior.

**Collaborations**

- About Narrative Composition (external, `about-narrative`) — wraps its
  static output; depends outward on it, per its own Technical Design.
- Motion Playback Store (internal to this Feature) — reads/writes
  revealed-piece IDs.
- The browser's native same-page anchor-navigation signal (external,
  platform) — a signal Section Navigation's existing anchor-link markup
  produces by construction (Project Architecture: same-page anchor
  navigation only); this is a platform dependency, not a code dependency
  on Section Navigation's own component.
- Motion Layer (external, Project Architecture).
- Reduced-motion platform signal (external).

**Dependencies**

- About Narrative Composition — external, read-only.
- Motion Playback Store — internal.
- Motion Layer — external.

**Constraints**

- Must not alter About Narrative Composition's markup, content, or its
  own completeness guarantee (About Narrative Contract Commitment 1) —
  presentation-layer motion only, layered on already-complete static
  output.
- Must hydrate as a client-side island — viewport-intersection tracking
  and reveal state are runtime concerns unresolvable at build time.
- Must never re-hide a piece once revealed within the same tab session
  (Feature Solution's one-way rule).

**Design Decisions**

1. Direct-navigation arrival is detected via the platform's native
   same-page anchor-navigation signal, rather than a new coupling to
   Section Navigation's own component. Rationale: Section Navigation's
   own Technical Design already commits to "no dependency on
   motion-interaction... not the reverse"; using the browser's own
   hash-change/anchor-activation event — a signal that already exists
   because Section Navigation's links are same-page anchors, per Project
   Architecture — resolves Feature Solution's "must distinguish arrival
   paths" requirement with zero coupling in either direction.
2. Composed around About Narrative Composition's static output via the
   same static-children-in-island pattern as the Hero component.
   Rationale: consistency with the established pattern; preserves About
   Narrative's own static-first design.

**Contract Traceability**

- Commitment 1 → viewport-intersection reveal, direct-arrival immediate
  reveal, Motion Playback Store's revealed-piece set.
- Contributes to Commitment 7 → reduced-motion handling for both reveal
  paths.

### Nav Transition Styles

**Purpose**

Realize the transition for the compact-logomark-icon's Hero-context/
post-Hero presence change, and for whatever value-change transition
Section Navigation's own (currently Pending) indicator anatomy supports
via class/attribute changes (Contract Commitment 3, contributing to 4) —
without any code dependency on Section Navigation's own component.

**Responsibilities**

- Provide an SCSS stylesheet partial (Styling System's authoring
  language, compiling to standard CSS transitions) that targets Section
  Navigation's existing, already-approved DOM/class contract — the
  compact logomark icon's conditional presence, and whatever
  class/attribute Section Navigation's own indicator anatomy exposes for
  its active value — applying a smooth transition whenever that
  underlying class/attribute changes, rather than an instant swap.
- Disable/shorten these transitions under the browser's
  `prefers-reduced-motion` media query, natively, without any JavaScript
  detection.

**Owned Concepts**

- The transition timing/property declarations themselves (exact values
  Implementation-level, per Feature UI's qualitative pacing guidance).

**Collaborations**

- Section Navigation Composition (external, `section-navigation`) — this
  stylesheet targets its existing, already-public DOM/class contract;
  Section Navigation's own component neither imports nor is aware of
  this stylesheet, satisfying its own Technical Design's "no dependency
  on motion-interaction... not the reverse."
- Styling System (external, Project Architecture) — this component is
  authored as one of its SCSS partials, alongside the others.

**Dependencies**

- Section Navigation Composition's DOM/class contract — external,
  read-only (a stable, already-public surface, not a code import).
- Styling System — external.

**Constraints**

- Must not require Section Navigation's own component code to import,
  reference, or otherwise become aware of this stylesheet.
- Must resolve to no transition (an instant value) under
  `prefers-reduced-motion: reduce`, satisfying Commitment 7 for this
  specific transition without any JavaScript.
- Cannot itself define the indicator's base visual anatomy — that
  remains Pending, owned by Section Navigation's own UI Definition; this
  stylesheet only adds a transition to whatever anatomy is eventually
  assigned there.

**Design Decisions**

1. Realized as an SCSS/CSS-only mechanism rather than a React component
   Section Navigation would need to compose. Rationale: Section
   Navigation's own Technical Design explicitly forbids depending on
   motion-interaction; a stylesheet that targets an already-public DOM/
   class contract from outside achieves the same visible transition with
   zero code coupling in either direction — CSS transitions fire
   automatically whenever the underlying class/attribute Section
   Navigation's own state management already changes, requiring no
   JavaScript coordination between the two Features.

**Contract Traceability**

- Commitment 3 → the logomark-icon presence transition.
- Contributes to Commitment 4 → transitions whatever indicator-value
  change Section Navigation's own anatomy exposes.
- Contributes to Commitment 7 → reduced-motion handling via native media
  query.

### Nav Progress Overlay

**Purpose**

Realize the merged indicator's progress component (Contract Commitment
4) — a concept Section Navigation does not itself compute — as an
independently-rendered visual, with zero dependency on Section
Navigation's own component.

**Responsibilities**

- Hydrate as its own, separately-rendered client-side island — not
  composed inside Section Navigation's component tree — positioned via
  the Styling System's shared layout tokens/breakpoints to visually align
  with the nav bar's existing divider location.
- Compute the visitor's scroll position as a graduated progress value and
  render a fill reflecting it, updating as scroll position changes.
- Read the reduced-motion platform signal directly; when active, the fill
  still reflects accurate progress at all times, without a smoothing/
  animated interpolation between values (Commitment 7).

**Owned Concepts**

- The scroll-to-progress-value computation.
- The fill's independent rendering and positioning.

**Collaborations**

- Styling System (external, Project Architecture) — supplies the layout
  tokens this component uses to align itself with the nav bar's divider
  location, without reading Section Navigation's component internals.
- Motion Layer (external).
- Reduced-motion platform signal (external).

**Dependencies**

- Styling System — external.
- Motion Layer — external.

**Constraints**

- Must not import, reference, or otherwise depend on Section Navigation's
  own component code — visual alignment is achieved only through shared
  Styling System tokens, the same mechanism every Feature already uses
  for cross-component visual coherence.
- Must hydrate as a client-side island — scroll position is a runtime-
  only concern.
- Must remain visually subordinate to and aligned with the nav bar across
  both desktop and the (Pending, per Feature UI) mobile treatment.

**Design Decisions**

1. Rendered as a wholly separate island rather than being composed inside
   Section Navigation's own tree. Rationale: the progress dimension is a
   new concept Section Navigation itself never tracks or exposes;
   introducing it there would require Section Navigation's own component
   to change to accommodate it, which this phase has no authority to
   require, and which would violate its own Technical Design's "no
   dependency on motion-interaction" commitment. Visual alignment via
   shared Styling System tokens is the same mechanism every Feature
   already relies on for coherence, so no new architectural pattern is
   introduced.

**Contract Traceability**

- Commitment 4 → the progress component of the merged indicator.
- Contributes to Commitment 7 → reduced-motion handling (accurate value,
  no animated smoothing).

### CTA Interaction Motion

**Purpose**

Realize Direct Contact's CTA gradient-sweep feedback and its
touch-equivalent (Contract Commitments 5, 6), layered on top of Direct
Contact Composition's static CTA anchor without altering it.

**Responsibilities**

- Hydrate as a thin client-side island composed around Direct Contact
  Composition's CTA anchor specifically — not the whole Connection-screen
  composition; the heading and farewell lines stay untouched, purely
  static.
- Detect input capability (hover-capable pointer vs. touch-only) to
  decide sustained-hover vs. momentary-tap behavior.
- On hover (pointer-capable input), apply the gradient-sweep animation
  for the duration of the hover. On tap (touch-only input), apply the
  same sweep momentarily around the moment of the tap.
- Pass the anchor's existing `href` and text content through completely
  unmodified — this component adds a presentation-layer visual effect
  only, never touching Direct Contact's anti-scraping character-reference
  encoding or the anchor's accessible name.
- Read the reduced-motion platform signal directly; when active, register
  interaction with a discrete, non-animated visual change instead of the
  sweep (Commitment 7).

**Owned Concepts**

- The gradient-sweep animation and its hover/tap trigger logic.
- The input-capability detection used to choose between sustained-hover
  and momentary-tap behavior.

**Collaborations**

- Direct Contact Composition (external, `direct-contact`) — wraps its CTA
  anchor's static output; depends outward on it, per Direct Contact's own
  Technical Design ("may apply entrance treatment to elements this
  component renders; it depends outward on this component's static
  output, not the reverse").
- Motion Layer (external).
- Reduced-motion platform signal (external).

**Dependencies**

- Direct Contact Composition — external, read-only (CTA anchor's static
  output only).
- Motion Layer — external.

**Constraints**

- Must never alter, obscure, or interfere with the anti-scraping
  character-reference encoding Direct Contact's own Technical Design
  applies to the anchor's `href`/text, nor with its accessibility tree —
  this component wraps presentation only.
- Must hydrate as a client-side island — hover/tap detection and the
  sweep animation are runtime concerns.
- The touch-equivalent feedback must never leave the CTA without any
  feedback at all on a touch-only device (Commitment 6 AC2).

**Design Decisions**

1. Wraps only the CTA anchor, not Direct Contact's full composition.
   Rationale: proportionality — the heading and farewell lines have no
   defined motion behavior; wrapping the whole composition would
   introduce unnecessary hydration surface for elements that stay purely
   static.
2. Composed around the CTA's static output via the same
   static-children-in-island pattern used for Hero and About Narrative.
   Rationale: consistency with the established pattern; preserves Direct
   Contact's own static-first, zero-script-required design for its core
   contractual behavior (Commitment 1's stateless hand-off still works
   with no JS, since this component only adds an optional visual layer).

**Contract Traceability**

- Commitment 5 → the hover gradient-sweep.
- Commitment 6 → the touch-equivalent momentary sweep, input-capability
  detection.
- Contributes to Commitment 7 → reduced-motion handling.

## Cross-Component Relationships

- Hero Entrance & Ambient Motion Island → Hero Composition (external):
  depends outward, wraps its static output, never the reverse.
- Hero Entrance & Ambient Motion Island → Motion Playback Store
  (internal): reads/writes the entrance-played flag.
- About Narrative Reveal Island → About Narrative Composition (external):
  depends outward, wraps its static output, never the reverse.
- About Narrative Reveal Island → Motion Playback Store (internal):
  reads/writes revealed-piece IDs.
- About Narrative Reveal Island → the browser's native anchor-navigation
  signal (external, platform): reads only; not a dependency on Section
  Navigation's component.
- Nav Transition Styles → Section Navigation Composition's DOM/class
  contract (external): targets it from outside; Section Navigation's own
  component has no dependency back, consistent with its own Technical
  Design.
- Nav Progress Overlay → Styling System (external): aligns itself via
  shared tokens only; no dependency on Section Navigation's component.
- CTA Interaction Motion → Direct Contact Composition (external): depends
  outward, wraps its CTA anchor's static output, never the reverse.
- All motion-bearing components → Motion Layer (Framer Motion, external,
  Project Architecture): the shared animation mechanism.
- All motion-bearing components (except Nav Transition Styles, which uses
  a native CSS media query) → the reduced-motion platform signal
  (external): read directly, independently, by each component.

No circular dependencies: every component here depends outward on the
Feature it layers motion onto, on the Styling System, or on the Motion
Layer; none of those depend back. Section Navigation's own Technical
Design's "no dependency on motion-interaction" commitment is preserved
by construction — no component here requires Section Navigation's code
to import or reference anything from this Feature.

---

*Created: 2026-09-07*
