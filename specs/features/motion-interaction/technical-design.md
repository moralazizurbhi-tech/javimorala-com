# Technical Design: Motion & Interaction

**Status:** Approved

## Technical Components

### Hero Entrance & Ambient Motion Island

**Purpose**

Realize the Hero first-load entrance choreography, the post-entrance
ambient gradient drift, and the Hero's scroll-linked content exit and
mark transformation (Contract Commitments 2, 11, 12), layered on top of
Hero Composition's static output without altering it.

**Responsibilities**

- Hydrate as a thin client-side island composed around Hero Composition's
  static markup (the framework's static-children-in-island composition
  pattern), individually targeting the elements it already renders —
  background mark, headline, scroll cue, and, when Hero Composition's
  markup includes it (desktop/tablet only, per Hero's own conditional),
  Presence Links.
- On mount, read Motion Playback Store's Hero-entrance-played flag. If not
  played: sequence the elements' appearance per Feature UI's order and
  pacing (mark bloom → headline cascade, overlapping → scroll cue and
  Presence Links together after a pause, when Presence Links is present),
  then write the flag as played. If already played: render all of them in
  their final settled state directly, no animation.
- After settling (by either path), begin the ambient gradient drift on
  the background mark, unless reduced-motion is active.
- Read Shared Scroll Progress Store's Hero-relative progress value (a
  0→1 range mapped across the Hero's own height) and drive, directly and
  continuously from it: the headline/scroll cue/Presence Links' opacity
  (1→0 over the first ~35% of that range) and the mark's transformation
  (morph, desktop/tablet-with-space, or reverse stroke-reveal, mobile,
  overlapping from ~25%–70% of that range) — both reversible, since the
  underlying value itself is bidirectional.
- Apply a hysteresis margin around the transformation's completion
  threshold to prevent visible flicker from small scroll oscillations
  near the Hero/Introduction boundary.
- On tablet: no committed behavior — this component cannot resolve which
  treatment applies until Section Navigation's own nav-composition
  decision (Context Problem 12) settles it.
- Read the reduced-motion platform signal directly; when active, skip the
  entrance sequence to its end-state and never begin the ambient drift
  (Commitment 16). The scroll-linked content exit and mark
  transformation remain fully active and unaffected by this signal —
  they continue reading Shared Scroll Progress Store and driving opacity/
  transform exactly as when reduced motion is inactive, since they are
  directly driven by the visitor's own scroll position, not
  independently-timed animation (Commitment 16 AC9).

**Owned Concepts**

- The entrance sequencing/orchestration logic and its per-element
  targeting within Hero Composition's static markup.
- The ambient-drift loop's start/stop lifecycle.
- The scroll-progress-to-opacity and scroll-progress-to-transform-state
  mappings for the content exit and mark transformation, and the
  hysteresis margin's threshold logic.

**Collaborations**

- Hero Composition (external, `hero-presentation`) — wraps its static
  output; depends outward on it, per Hero's own Technical Design ("may
  wrap/hydrate elements this component renders; it depends outward on
  Hero Composition's static output, not the reverse").
- Motion Playback Store (internal to this Feature) — reads/writes the
  entrance-played flag.
- Shared Scroll Progress Store (internal to this Feature) — reads the
  Hero-relative scroll-progress value.
- Motion Layer (Framer Motion, external, Project Architecture) — the
  animation mechanism.
- Reduced-motion platform signal (external, browser) — read-only.

**Dependencies**

- Hero Composition — external, read-only (static output only).
- Motion Playback Store — internal.
- Shared Scroll Progress Store — internal.
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
- The mark-transformation's target size/position must match whatever
  final compact-logo dimensions Section Navigation's own UI Definition
  specifies — this component doesn't invent that value, it consumes it
  (Context Problem 12 dependency).

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
3. Presence Links' participation in the sequence is determined by its
   mere presence/absence in Hero Composition's rendered static markup,
   not by this component independently detecting viewport/device type.
   Rationale: Hero Composition's own conditional (desktop/tablet only)
   already determines whether the element exists in the DOM at all; this
   component's existing "individually targeting the elements it already
   renders" responsibility naturally extends to a variable element set
   with no new detection logic required.
4. The scroll-linked exit/transformation reads from Shared Scroll
   Progress Store rather than attaching its own independent scroll
   listener. Rationale: Contract Commitment 14 requires this value to
   stay mutually consistent with Nav Progress Overlay's; a single
   observed source guarantees that consistency architecturally rather
   than by convention.
5. Realized within the same island already wrapping Hero's elements,
   rather than a second island for the scroll-linked behavior.
   Rationale: both concerns target the identical DOM elements this
   island already hydrates around; a second island would duplicate
   hydration boundaries over the same markup for no architectural
   benefit.

**Contract Traceability**

- Commitment 2 → entrance sequencing (including Presence Links when
  composed, AC3), once-per-visit guard via Motion Playback Store.
- Commitment 11 → the scroll-linked content exit (desktop/mobile; tablet
  not committed).
- Commitment 12 → the mark transformation (desktop/mobile; tablet not
  committed, Pending).
- Contributes to Commitment 14 → this component's scroll-driven values
  are read from Shared Scroll Progress Store, guaranteeing
  synchronization with Nav Progress Overlay.
- Commitment 16 AC9 → the scroll-linked exit/transformation stays active
  and unaffected under reduced motion, reading Shared Scroll Progress
  Store exactly as normal.
- Contributes to Commitment 16 → reduced-motion handling for the
  entrance and the ambient drift.

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

### Shared Scroll Progress Store

**Purpose**

Own the single, canonical scroll-position-derived values this Feature's
own scroll-driven components consume, guaranteeing they stay mutually
consistent (Contract Commitment 14) without each independently
attaching its own scroll listener.

**Responsibilities**

- Observe the page's scroll position once (a single listener), and
  derive from it: (a) a Hero-relative progress value (0→1, mapped
  across the Hero's own height, for the content exit/mark
  transformation) and (b) an overall page-progress value (0→1, mapped
  across the total scrollable page height, weighted by actual content
  length — not a fixed per-section split) for the nav progress fill.
- Expose both values for read access to Hero Entrance & Ambient Motion
  Island and Nav Progress Overlay; no other component reads or writes
  it.
- Recompute both values on scroll, keeping them derived from the same
  single observed scroll position at all times — never independently
  re-measured per consumer.

**Owned Concepts**

- The scroll-position observation mechanism (a single listener/
  observer).
- The Hero-relative and overall page-progress derivation formulas.

**Collaborations**

- Hero Entrance & Ambient Motion Island — reads the Hero-relative
  progress value.
- Nav Progress Overlay — reads the overall page-progress value.

**Dependencies**

None internal; no outward dependency on either collaborator.

**Constraints**

- Must observe scroll position exactly once (a single source), not
  duplicate per-consumer listeners — the reason this component exists.
- Does not extend to Section Navigation's own active-section detection
  or the value Nav Divider Segment Transition consumes — both remain
  external to this store, consistent with this Feature's existing "no
  dependency on Section Navigation's own component" pattern. Nav
  Divider Segment Transition's consistency with the values here is
  achieved by construction (both ultimately derive from the same
  physical scroll position and the same Hero boundary), not by sharing
  this store directly.

**Design Decisions**

1. A single shared store computing both a Hero-relative and an overall
   page-progress value, rather than each consuming component deriving
   its own value from raw scroll position independently. Rationale:
   Contract Commitment 14 requires these values to stay mutually
   consistent; observing scroll once and deriving every needed value
   from that single observation guarantees consistency
   architecturally, avoiding the redundant-listener risk Context
   Problem 14 identified.
2. Scoped to this Feature's own components only (Hero Entrance & Ambient
   Motion Island, Nav Progress Overlay) — does not attempt to
   coordinate Section Navigation's own active-section detection or the
   value Nav Divider Segment Transition consumes (which traces back to
   Hero's separately-exposed sentinel, not this store). Rationale:
   extending this store's authority over another Feature's internal
   detection mechanism, or over a value this Feature already consumes
   externally by design (Nav Divider Segment Transition's own Design
   Decision), would introduce coupling this Feature doesn't need and
   doesn't have authority to impose.

**Contract Traceability**

- Commitment 14 → the shared, single-observed source guaranteeing Hero
  Entrance & Ambient Motion Island's and Nav Progress Overlay's values
  stay mutually consistent.

### About Narrative Reveal Island

**Purpose**

Realize About Narrative's progressive scroll-triggered reveal, its
direct-navigation-arrival immediate-reveal behavior, and its revealed
photos' cursor/scroll-driven tilt (Contract Commitments 1, 13), layered
on top of About Narrative Composition's static output.

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
- For each photo already in its `Revealed` state: on desktop, track
  cursor position relative to the photo while hovered and apply a
  proportional rotation up to 4°, additive to the photo's existing
  static transform if any; on cursor-leave, ease back to rest. On
  mobile, derive a continuous tilt value from scroll direction/velocity
  — no device orientation/motion permission requested. A `Hidden` photo
  (not yet scrolled to) doesn't tilt.
- Read the reduced-motion platform signal directly; when active, every
  piece reaches its revealed state directly, without the scroll-triggered
  or direct-arrival animation (Commitment 16). When active, photo tilt is
  disabled entirely — each photo renders at its static base rotation
  only, with no cursor/scroll-driven tilt applied (Commitment 16 AC10).

**Owned Concepts**

- The viewport-intersection-driven per-piece reveal logic.
- The direct-navigation-arrival detection and its all-at-once reveal
  behavior.
- The cursor-relative (desktop) and scroll-derived (mobile) tilt
  computation, applied per revealed photo.

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
- Tilt is additive to whatever static base rotation About Narrative's
  own UI Definition eventually establishes for the photo (currently
  undefined there, Context Problem 13) — this component doesn't invent
  or require that base value; it applies correctly whether the base is
  0° or something else.
- Mobile's tilt must not request or depend on the device's
  orientation/motion sensor permission.

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
3. Tilt is realized within the same island already wrapping About
   Narrative's photos, rather than a separate component. Rationale:
   both concerns (reveal state, tilt) target the identical DOM elements
   this island already hydrates around; a second island would duplicate
   hydration boundaries over the same markup for no architectural
   benefit.

**Contract Traceability**

- Commitment 1 → viewport-intersection reveal, direct-arrival immediate
  reveal, Motion Playback Store's revealed-piece set.
- Commitment 13 → the desktop cursor-tilt and mobile scroll-tilt
  behaviors.
- Commitment 16 AC10 → photo tilt is disabled entirely when reduced
  motion is active.
- Contributes to Commitment 16 → reduced-motion handling for both reveal
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
  `prefers-reduced-motion: reduce`, satisfying Commitment 16 for this
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
- Contributes to Commitment 16 → reduced-motion handling via native media
  query.

### Nav Progress Overlay

**Purpose**

Realize the merged indicator's progress component (Contract Commitment
4) — a concept Section Navigation does not itself compute — as two
independently-positioned segment fills aligned to Section Navigation's
existing divider segments, with zero dependency on Section Navigation's
own component.

**Responsibilities**

- Hydrate as its own, separately-rendered client-side island — not
  composed inside Section Navigation's component tree — positioned via
  the Styling System's shared layout tokens to align with each of
  Section Navigation's two existing divider segments individually (their
  per-screen-context layout positions, already defined by Section
  Navigation's own UI Definition), rather than one continuous divider
  location.
- Read Shared Scroll Progress Store's overall page-progress value —
  computed there as actual scrolled distance over total scrollable page
  height, weighted by real content length, not a fixed per-section
  split — and map it sequentially across both segments — the first half
  of that value fills the left segment left-to-right, the second half
  fills the right segment left-to-right — updating as the value changes,
  independent of the divider's current segmented/continuous visual state
  (Nav Divider Segment Transition's concern).
- Read the reduced-motion platform signal directly; when active, both
  segment fills still reflect accurate progress at all times, without a
  smoothing/animated interpolation between values (Commitment 16).

**Owned Concepts**

- The sequential mapping of Shared Scroll Progress Store's page-progress
  value across two independently-positioned segment fills (the value's
  own computation is owned by that store, not here).
- The fills' independent rendering and positioning, aligned to each
  segment individually.

**Collaborations**

- Shared Scroll Progress Store (internal to this Feature) — reads the
  overall page-progress value.
- Styling System (external, Project Architecture) — supplies the layout
  tokens this component uses to align itself with each of the nav bar's
  two existing divider segments, without reading Section Navigation's
  component internals.
- Motion Layer (external).
- Reduced-motion platform signal (external).

**Dependencies**

- Shared Scroll Progress Store — internal.
- Styling System — external.
- Motion Layer — external.

**Constraints**

- Must not import, reference, or otherwise depend on Section Navigation's
  own component code — visual alignment is achieved only through shared
  Styling System tokens, the same mechanism every Feature already uses
  for cross-component visual coherence.
- Must hydrate as a client-side island — scroll position is a runtime-
  only concern.
- Must remain visually subordinate to and aligned with each of the nav
  bar's two divider segments across both desktop and the (Pending, per
  Feature UI) mobile treatment.
- Must render correctly regardless of the divider's current segmented/
  continuous visual state — this component owns only the progress fill,
  not the segment gap's open/closed transition (Nav Divider Segment
  Transition's concern); the two must visually cohere on the same
  underlying divider element without either depending on the other's
  code.

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
2. This component and Nav Divider Segment Transition both target the
   same underlying divider element but do not depend on each other.
   Rationale: each owns a distinct concept (progress-fill amount vs. the
   segmented/continuous gap state) and each independently targets
   Section Navigation's public surface via Styling System tokens or its
   exposed state attribute; coupling the two motion-interaction
   components together for a purely visual coincidence would add
   architecture neither actually needs functionally.
3. Reads its progress value from Shared Scroll Progress Store rather
   than computing it independently. Rationale: Contract Commitment 14
   requires this value to stay mutually consistent with Hero Entrance &
   Ambient Motion Island's scroll-linked values; a single observed
   source guarantees that consistency architecturally.

**Contract Traceability**

- Commitment 4 → the progress component of the merged indicator, now
  realized as two segment fills.
- Commitment 14 → reads its progress value from Shared Scroll Progress
  Store, guaranteeing synchronization with the Hero mark's
  transformation.
- Contributes to Commitment 16 → reduced-motion handling (accurate
  value, no animated smoothing).

### Nav Divider Segment Transition

**Purpose**

Realize the divider's segmented/continuous state transition (Contract
Commitment 10), targeting Section Navigation's own exposed segmentation
state from outside, with zero code dependency on Section Navigation's or
Hero Presentation's own components.

**Responsibilities**

- Provide an SCSS stylesheet partial that targets whatever class/
  attribute Section Navigation's own component exposes on its divider
  segments to reflect the current segmented/continuous state — a state
  Section Navigation's own component computes internally, already
  consuming Hero Presentation's exposed mark-visibility sentinel per
  Hero's own Technical Design, a relationship this Feature has no part
  in and does not duplicate.
- Apply a smooth transition — both segments extending toward or
  retracting from the center — whenever that exposed class/attribute
  changes, rather than an instant snap.
- Disable/shorten this transition under the browser's
  `prefers-reduced-motion` media query, natively, without any JavaScript
  detection.

**Owned Concepts**

- The segment extend/retract transition's timing/property declarations
  (exact values Implementation-level, per Feature UI's qualitative
  pacing guidance).

**Collaborations**

- Section Navigation Composition (external, `section-navigation`) — this
  stylesheet targets its existing, already-exposed segmented/continuous
  class/attribute state; Section Navigation's own component neither
  imports nor is aware of this stylesheet, the same pattern Nav
  Transition Styles establishes for Section Navigation.
- Styling System (external, Project Architecture).

**Dependencies**

- Section Navigation Composition's exposed segmentation-state class/
  attribute — external, read-only.
- Styling System — external.

**Constraints**

- Must not require Section Navigation's own component code to import,
  reference, or otherwise become aware of this stylesheet.
- Must resolve to an instant state change (no extend/retract animation)
  under `prefers-reduced-motion: reduce`.
- Must not itself compute or determine which mark occupies the divider's
  center — that computation and its resulting exposed state belong
  entirely to Section Navigation's own Technical Design (which itself
  consumes Hero's exposed sentinel); this component only transitions the
  visual consequence of a state change it does not produce.

**Design Decisions**

1. Realized as an SCSS/CSS-only mechanism targeting Section Navigation's
   own exposed segmentation state, rather than this Feature
   independently computing mark-presence itself from Hero's sentinel.
   Rationale: Hero's own Technical Design already establishes that
   Section Navigation Composition observes Hero's exposed mark-
   visibility sentinel to drive its own divider segmented/continuous DOM
   state; duplicating that computation here would introduce a second,
   potentially inconsistent consumer of Hero's sentinel and a dependency
   this Feature does not need. Consuming Section Navigation's own
   already-resolved, already-public state exposure — the same "target
   public DOM from outside" pattern used throughout this design —
   achieves the transition with zero new coupling.

**Contract Traceability**

- Commitment 10 → the segmented/continuous extend/retract transition.
- Contributes to Commitment 16 → reduced-motion handling via native
  media query.

### CTA Interaction Motion

**Purpose**

Realize Direct Contact's CTA gradient-sweep feedback, its
touch-equivalent, and its underline draw-on and tap-scale discoverability
motion (Contract Commitments 5, 6, 15), layered on top of Direct Contact
Composition's static CTA anchor without altering it.

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
- On hover/focus, in addition to the gradient sweep, draw an underline
  beneath the CTA's text (`scaleX` 0→1 from a `transform-origin: left`),
  reversing on hover/focus-out.
- On tap/click (any input), apply a momentary scale-down (~0.97, ~100ms)
  to the CTA's text, independent of the hover-sweep/underline treatment.
- When Direct Contact's own composition eventually adds a persistent
  affordance icon (Context Problem 15, blocked — not yet true), apply a
  brief flourish to that icon at the same tap moment — this
  responsibility has no effect today, since the element it targets does
  not yet exist; it activates automatically once Direct Contact's own UI
  Definition and markup add it, requiring no further change to this
  component.
- Pass the anchor's existing `href` and text content through completely
  unmodified — this component adds a presentation-layer visual effect
  only, never touching Direct Contact's anti-scraping character-reference
  encoding or the anchor's accessible name.
- Read the reduced-motion platform signal directly; when active, register
  interaction with a discrete, non-animated visual change instead of the
  sweep, underline draw-on, or tap-scale (Commitment 16).

**Owned Concepts**

- The gradient-sweep animation and its hover/tap trigger logic.
- The input-capability detection used to choose between sustained-hover
  and momentary-tap behavior.
- The underline draw-on's `scaleX` transition and the tap scale-down's
  trigger logic.
- The icon-flourish trigger, dormant until the icon exists.

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
- The icon flourish must not error or behave unexpectedly if the icon
  element doesn't exist in the DOM — this component targets it
  defensively (e.g. a no-op if absent), not assuming its presence.

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
3. The icon flourish's targeting is written defensively against the
   icon's absence, rather than this component waiting for Direct
   Contact's own composition to change before shipping any of
   Commitment 15. Rationale: the underline and tap-scale are fully
   committable today (Contract Commitment 15's resolved ACs); gating the
   whole component on the icon's future existence would needlessly
   delay shipping the parts that don't depend on it.

**Contract Traceability**

- Commitment 5 → the hover gradient-sweep.
- Commitment 6 → the touch-equivalent momentary sweep, input-capability
  detection.
- Commitment 15 → the underline draw-on, tap scale-down, and (dormant,
  contingent) icon flourish.
- Contributes to Commitment 16 → reduced-motion handling.

### Secondary Interaction Feedback Styles

**Purpose**

Realize the shared hover/focus/touch feedback treatment for Section
Navigation's nav links, Presence Links (both placements), and the
Language Switcher's trigger and options (Contract Commitments 7, 8, 9's
feedback ACs) — as a CSS-only mechanism, with zero code dependency on any
of those Features' own components.

**Responsibilities**

- Provide an SCSS stylesheet partial that targets each of these
  Features' existing, already-approved anchor/button elements from
  outside, applying the gradient-fill treatment on `:hover` and
  `:focus-visible`.
- Gate the `:hover` treatment behind a `(hover: hover) and (pointer:
  fine)` media feature, and apply the same visual treatment on `:active`
  for touch/coarse-pointer input — satisfying the touch-equivalent
  requirement (Commitment 6 AC1) without any JavaScript input-capability
  detection, unlike CTA Interaction Motion's sweep (which needs to
  distinguish sustained-hover from momentary-tap explicitly; this
  treatment does not, since a static fill looks correct held or tapped).
- Disable the fill's transition duration (an instant value) under
  `prefers-reduced-motion: reduce`, natively, without JavaScript.

**Owned Concepts**

- The shared gradient-fill hover/focus/active treatment and its
  media-feature-gated hover/touch branching.

**Collaborations**

- Section Navigation Composition, Presence Link Group Composition, and
  Language Switcher Component (all external) — this stylesheet targets
  each one's existing, already-public DOM from outside; none of those
  components import or become aware of this stylesheet, consistent with
  the same "no dependency on motion-interaction" pattern Nav Transition
  Styles already establishes for Section Navigation.
- Styling System (external, Project Architecture) — supplies the accent
  gradient token this treatment reuses.

**Dependencies**

- Section Navigation Composition's, Presence Link Group Composition's, and
  Language Switcher Component's DOM — external, read-only.
- Styling System — external.

**Constraints**

- Must not require any of the three target components' own code to
  import, reference, or otherwise become aware of this stylesheet.
- Must resolve to an instant fill (no transition) under
  `prefers-reduced-motion: reduce`.
- Must apply the identical treatment wherever it targets — both nav
  links, both Presence Link placements, and every switcher option — one
  ruleset, not per-instance variants (Feature Solution's Rule).

**Design Decisions**

1. Realized as a single shared CSS-only mechanism across three different
   Features' elements, rather than three separate per-Feature
   stylesheets or a JS-driven component. Rationale: the same pattern Nav
   Transition Styles already established (an external stylesheet
   targeting a stable public DOM contract) extends cleanly here since
   the underlying elements are, in every case, plain anchors/buttons with
   no state this Feature needs to read — a single shared partial avoids
   duplicating the same three declarations three times, without
   introducing any new dependency direction.
2. Hover/touch branching handled via `(hover: hover)`/`:active` media
   features and pseudo-classes rather than the input-capability-detection
   JavaScript CTA Interaction Motion uses. Rationale: CTA Interaction
   Motion needs JS because its sweep must not sustain indefinitely on a
   touch "sticky hover"; a static fill has no such failure mode, so the
   simpler CSS-only mechanism fully satisfies Commitments 7 and
   8/9's feedback ACs with no added script.

**Contract Traceability**

- Commitment 7 → nav link hover/focus/touch feedback.
- Commitment 8 → Presence Link hover/focus/touch feedback, identical at
  both placements.
- Contributes to Commitment 9 → the switcher trigger's and each option's
  hover/focus/touch feedback (the dropdown's open/close transition itself
  is Switcher Dropdown Transition's concern, below).
- Contributes to Commitment 16 → reduced-motion handling via native media
  query.

### Switcher Dropdown Transition

**Purpose**

Realize the Language Switcher's dropdown open/close transition (Contract
Commitment 9's AC1/AC2), targeting its existing open/closed state from
outside, with zero code dependency on Language Override's own component.

**Responsibilities**

- Provide an SCSS stylesheet partial that targets the `data-state="open"`/
  `"closed"` attribute the Accessible Primitives Layer (Radix UI) already
  applies to Language Switcher Component's trigger/content elements by
  convention, and applies a fade + slight vertical translation whenever
  that attribute changes, rather than an instant show/hide.
- Disable the transition (resolving directly to the open or closed
  end-state) under `prefers-reduced-motion: reduce`, natively, without
  JavaScript.

**Owned Concepts**

- The open/close transition's timing/property declarations (exact values
  Implementation-level, per Feature UI's qualitative pacing guidance).

**Collaborations**

- Language Switcher Component (external, `language-override`) — this
  stylesheet targets its existing, already-public open/closed state
  exposure; Language Override's own component neither imports nor is
  aware of this stylesheet, the same pattern Nav Transition Styles
  establishes for Section Navigation.
- Styling System (external, Project Architecture).

**Dependencies**

- Language Switcher Component's open/closed state exposure — external,
  read-only.
- Styling System — external.

**Constraints**

- Must not require Language Override's own component code to import,
  reference, or otherwise become aware of this stylesheet.
- Must resolve to an instant state change under `prefers-reduced-motion:
  reduce`.
- Cannot alter Language Override's own selection, persistence, or
  no-op behavior — presentation-layer transition only.

**Design Decisions**

1. Realized as an SCSS/CSS-only mechanism targeting Language Override's
   existing public open/closed state exposure, rather than a React
   component Language Override would need to compose or a new shared
   store. Rationale: identical reasoning to Nav Transition Styles — the
   open/closed state already exists and already changes (Language
   Override's own dropdown already opens/closes functionally); this
   stylesheet only adds a transition on top of a state change that
   already fires, requiring no JavaScript coordination between the two
   Features.

**Contract Traceability**

- Commitment 9 → the dropdown's open and close transitions.
- Contributes to Commitment 16 → reduced-motion handling via native media
  query.

## Cross-Component Relationships

- Hero Entrance & Ambient Motion Island → Hero Composition (external):
  depends outward, wraps its static output, never the reverse.
- Hero Entrance & Ambient Motion Island → Motion Playback Store
  (internal): reads/writes the entrance-played flag.
- Hero Entrance & Ambient Motion Island → Shared Scroll Progress Store
  (internal): reads the Hero-relative scroll-progress value.
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
- Nav Progress Overlay → Shared Scroll Progress Store (internal): reads
  the overall page-progress value.
- Nav Progress Overlay → Styling System (external): aligns itself with
  each of Section Navigation's two divider segments via shared tokens
  only; no dependency on Section Navigation's component.
- Nav Divider Segment Transition → Section Navigation Composition's
  exposed segmentation-state class/attribute (external): targets it from
  outside; Section Navigation's own component has no dependency back,
  consistent with its own Technical Design (which itself depends outward
  on Hero's exposed sentinel — a relationship this Feature has no part
  in and does not duplicate).
- Nav Progress Overlay and Nav Divider Segment Transition share the same
  visual target (Section Navigation's divider) but have no dependency on
  each other — each owns a distinct concept and targets Section
  Navigation's public surface independently.
- CTA Interaction Motion → Direct Contact Composition (external): depends
  outward, wraps its CTA anchor's static output, never the reverse.
- CTA Interaction Motion → Direct Contact Composition's future
  discoverability icon (external, DOM query, defensive, not yet
  existing): targets it if/when present for the tap flourish; no
  dependency on its existence, and Direct Contact's own component has no
  awareness of this targeting.
- Secondary Interaction Feedback Styles → Section Navigation Composition,
  Presence Link Group Composition, Language Switcher Component (all
  external): targets each one's existing DOM from outside; none of those
  components depend back.
- Switcher Dropdown Transition → Language Switcher Component
  (external): targets its existing open/closed state exposure from
  outside; Language Override's own component has no dependency back.
- All motion-bearing components → Motion Layer (Framer Motion, external,
  Project Architecture): the shared animation mechanism.
- All motion-bearing components (except Nav Transition Styles, Nav
  Divider Segment Transition, Secondary Interaction Feedback Styles, and
  Switcher Dropdown Transition, which use native CSS media queries) →
  the reduced-motion platform signal (external): read directly,
  independently, by each component.

No circular dependencies: every component here depends outward on the
Feature it layers motion onto, on the Styling System, or on the Motion
Layer; none of those depend back. Section Navigation's and Presence
Links' own explicit "no dependency on motion-interaction" commitments are
preserved by construction; Language Override's own Technical Design
declares no such commitment (it never previously addressed
`motion-interaction`), but no component here requires its code to import
or reference anything from this Feature either, consistent with the same
pattern. Section Navigation's own dependency on Hero Presentation's
exposed mark-visibility sentinel (driving its divider's segmented/
continuous state) is a relationship between those two Features'
Technical Designs, established independently of this Feature. Shared
Scroll Progress Store is internal-only, with no outward dependency on
any collaborator — it exists purely to give Hero Entrance & Ambient
Motion Island and Nav Progress Overlay one consistent scroll source, not
to coordinate with anything external. Nav Divider Segment Transition
consumes only Section Navigation's resulting
public state, introducing no new edge into that relationship.

---

*Created: 2026-09-07*
