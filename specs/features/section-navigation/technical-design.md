# Technical Design: Section Navigation

## Technical Components

### Section Nav

Proposed new component — Project Architecture's System Structure does not
name a nav-hosting component (flagged in this Feature's Context); this
Design proposes App Shell as composer, resolving that gap at this phase's
level without modifying Project Architecture itself, mirroring the pattern
`social-links`' Technical Design used for a component Architecture doesn't
name.

**Purpose**

Realize destination resolution, persistent availability, and
presentation-form selection — presenting the three destinations either
inline or via the Mobile Nav Overlay it hosts, depending on device class,
remaining accessible from any scroll position.

**Responsibilities**

- Own the canonical destination structure: three destinations (Home,
  About, Contact), each mapped 1:1 to its target section.
- Select exactly one presentation form (inline destinations, or the
  trigger for Mobile Nav Overlay) for the current viewport — never both,
  never neither.
- Remain accessible/available regardless of the visitor's current scroll
  position.
- Perform the scroll-anchor invocation for a destination when activated
  inline, or on Mobile Nav Overlay's behalf when a destination is
  selected there.
- Never block, capture, or redirect scroll input intended as free scroll.

**Owned Concepts**

- *Destination structure* — the canonical set of three destinations and
  their 1:1 mapping to target sections; single source used by both
  presentation forms. Owned exclusively here.
- *Presentation-form selection* — the mutually exclusive choice between
  the inline form and the overlay-hosting form for the current viewport.
  Owned exclusively here.
- *Persistent positioning* — the requirement that the component (or its
  trigger) remains available independent of scroll position. Owned
  exclusively here; the concrete positioning mechanism is Implementation.
- *Scroll-anchor invocation* — the act of navigating to a destination's
  target section when activated, regardless of which form triggered it.
  Owned exclusively here; the concrete anchoring mechanism is
  Implementation.

**Collaborations**

- Hosts and composes Mobile Nav Overlay when the overlay form is
  selected; supplies it the destination structure to render, and
  receives its selection/dismiss outcomes.
- Consumes locale-resolved destination labels from the Locale Layer
  (Existing pattern, per Architecture).
- Uses the Animation Layer for any open/close/highlight presentation;
  motion behavior itself is `motion-interaction`'s decision.
- Consumes the Styling System's shared visual tokens/mixins for both
  forms' presentation; concrete visual/interaction treatment and the
  device-class threshold itself are deferred to Feature UX.
- Composed by App Shell (Proposed — see component note above).

**Dependencies**

- App Shell's fixed section composition (Existing architectural
  guarantee) — the single continuous page contains Hero, About, and
  Contact sections at fixed positions for Section Nav to target; the
  concrete addressing mechanism is Implementation.
- Locale Layer (destination label resolution).
- Animation Layer (open/close/highlight presentation mechanics).
- Styling System (visual tokens).

**Constraints**

- Must not depend on or invoke `social-links`' component — excluded from
  this Feature's boundary per its own Definition/Context.
- Must not depend on or invoke Hero Section's, About Section's, or Email
  Contact Device's internal components directly — targets the page's
  fixed section composition only, not their internals.
- Must not implement or request any scroll-blocking, scroll-locking, or
  scroll-capturing mechanism.
- Must not decide the concrete desktop/mobile viewport threshold, visual
  treatment, or destination label copy — Feature UX / content.

**Design Decisions**

- Modeled as a single component owning the canonical destination
  structure, rather than duplicating it once per presentation form —
  directly reflects Contract Commitment 1's consistent-resolution
  requirement across both forms.
- Presentation-form selection modeled as this component's own
  responsibility, not coordinated between independent sibling
  components — makes Commitment 3's mutual exclusivity structurally
  guaranteed rather than runtime-coordinated.
- Delegates the overlay-specific Open/Closed state and its
  selection/dismiss behavior to a separate Mobile Nav Overlay component
  rather than modeling it inline — isolates Commitment 4's stateful
  behavior, which only exists for one of the two forms, from Commitment
  1/2/3's form-agnostic concerns.
- App Shell is proposed as this component's composer, mirroring
  `social-links`' precedent of App Shell composing a component not named
  in Project Architecture's System Structure — resolves, at this phase's
  level, the open dependency flagged in this Feature's Context, without
  modifying Project Architecture itself.

**Contract Traceability**

- Commitment 1 (Destination Resolution Correctness) — Owned Concept
  "Destination structure," Design Decision 1.
- Commitment 2 (Persistent Availability) — Owned Concept "Persistent
  positioning."
- Commitment 3 (Mutually Exclusive Presentation Forms) — Owned Concept
  "Presentation-form selection," Design Decision 2.
- Commitment 5 (Non-Interference with Free Scroll) — scroll-blocking
  Constraint.
- Commitment 4 (Overlay Selection Behavior) realized jointly with Mobile
  Nav Overlay (see below).

### Mobile Nav Overlay

Proposed new component — named as a distinct UI Component in Project UX,
but not yet a Technical Design component; composed and hosted exclusively
by Section Nav, not directly by App Shell.

**Purpose**

Realize the overlay-specific portion of `section-navigation`'s Feature
Contract — the Open/Closed state and the selection/dismiss behavior —
when Section Nav selects the overlay presentation form.

**Responsibilities**

- Own and manage the Closed/Open state.
- Transition Closed → Open when its trigger is activated.
- On destination selection while Open, request Section Nav's
  scroll-anchor invocation for that destination and transition to
  Closed, as one action.
- On explicit dismissal while Open, transition to Closed without
  requesting any scroll-anchor invocation.
- Never block, capture, or redirect scroll input intended as free
  scroll.

**Owned Concepts**

- *Overlay open/closed state* — the two-state lifecycle (Closed, Open)
  and its transitions. Owned exclusively here.
- *Selection-triggers-close* — the requirement that a destination
  selection and the Closed transition occur together, never
  independently. Owned exclusively here.
- *Dismissal-without-anchor* — the requirement that explicit dismissal
  never invokes scroll-anchoring. Owned exclusively here.

**Collaborations**

- Renders the destination structure supplied by Section Nav
  (collaboration, not ownership) — does not maintain its own copy of
  destinations/targets.
- Requests Section Nav's scroll-anchor invocation when a destination is
  selected; does not perform anchoring itself.
- Uses the Animation Layer for open/close presentation; motion behavior
  itself is `motion-interaction`'s decision.
- Consumes the Styling System's shared visual tokens/mixins; concrete
  visual/interaction treatment deferred to Feature UX.

**Dependencies**

- Section Nav (destination structure, scroll-anchor invocation).
- Animation Layer (open/close presentation mechanics).
- Styling System (visual tokens).

**Constraints**

- Must not depend on or invoke `social-links`' component.
- Must not maintain a destination list independent of Section Nav's — a
  single canonical source, consumed not duplicated.
- Must not implement or request any scroll-blocking, scroll-locking, or
  scroll-capturing mechanism.
- Must not perform scroll-anchoring directly — always via Section Nav,
  preserving single ownership of that concept.
- Must not decide concrete visual/interaction treatment — Feature UX.

**Design Decisions**

- Modeled as a component distinct from Section Nav rather than an
  internal mode of it — isolates the only stateful part of this Feature
  (Commitment 4's Open/Closed lifecycle) from the form-agnostic concerns
  Section Nav owns, and matches Project UX's own naming of "Mobile nav
  overlay" as a distinct UI Component.
- Selection and closing modeled as a single combined transition (not two
  independently sequenced steps) — directly reflects Commitment 4 AC2's
  "anchor + close together, never one without the other."
- Delegates scroll-anchoring to Section Nav rather than duplicating that
  mechanism — keeps "Scroll-anchor invocation" single-owned per the
  Contract's consistent-resolution requirement (Commitment 1), which
  spans both presentation forms.

**Contract Traceability**

- Commitment 4 (Overlay Selection Behavior) — all three Owned Concepts,
  both Design Decisions.
- Commitment 5 (Non-Interference with Free Scroll) — scroll-blocking
  Constraint.
- Commitment 3 (Mutually Exclusive Presentation Forms) — this component
  only exists/renders when Section Nav has selected the overlay form;
  realized jointly with Section Nav's Presentation-form-selection
  concept.

## Cross-Component Relationships

- App Shell → Section Nav: composes it (Proposed, resolving the
  Context-flagged architecture gap), alongside Hero Section, About
  Section, Contact Section (Existing pattern).
- Section Nav → Mobile Nav Overlay: hosts/composes it when the overlay
  form is selected; supplies destination structure; receives
  selection/dismiss outcomes.
- Mobile Nav Overlay → Section Nav: requests scroll-anchor invocation on
  selection; no destination data owned independently.
- Section Nav → Locale Layer: consumes resolved destination labels
  (Existing pattern).
- Section Nav / Mobile Nav Overlay → Animation Layer: supply elements for
  motion presentation; motion behavior itself is `motion-interaction`'s
  decision.
- Section Nav / Mobile Nav Overlay → Styling System: consume shared
  visual tokens (Existing pattern).
- Section Nav ⇸ `social-links`: explicitly no dependency (boundary
  preserved).
- Section Nav ⇸ Hero Section, About Section, Email Contact Device
  (internals): no direct dependency; targets the page's fixed section
  composition only.

No circular dependencies: App Shell composes Section Nav inbound only;
Section Nav composes Mobile Nav Overlay inbound, and Mobile Nav Overlay's
one outbound reference back to Section Nav (scroll-anchor invocation
request) is a service call, not a composition cycle — Section Nav does
not depend on Mobile Nav Overlay's internal state, only on having created
it.

---

*Created: 2026-08-31*
