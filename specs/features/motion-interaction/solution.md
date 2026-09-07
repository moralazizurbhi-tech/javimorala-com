# Feature Solution: Motion & Interaction

**Status:** Approved

## Solution Intent

### Functional Objective

Provide a consistent, purposeful motion-and-interaction layer — applied on
top of each Feature's static output — that resolves the problems Feature
Context identifies, with a functionally complete non-animated fallback
whenever reduced motion is preferred, and where every included behavior
serves an articulable purpose rather than decoration.

## Solution Behaviour

### Behaviours

1. **About Narrative Content Reveal** — content pieces (paragraphs and
   photos) become visible progressively during scroll; once visible, a
   piece stays visible for the rest of the visit. Photos get a distinct
   entrance treatment as part of this reveal (not a mask/wipe "discover"
   mechanism). Direct-navigation arrival at the section shows all content
   immediately.
2. **Hero First-Load Entrance** — on true first load in a visit, the
   Hero's elements enter in a defined sequence; later in-session returns
   via nav show the complete state directly, with no replay.
3. **Nav Identity Transition** — the nav transitions between its
   Hero-context and post-Hero presentation as scroll crosses that
   boundary, in both directions.
4. **Merged Active/Progress Indicator** — one indicator communicates both
   which screen is active and overall scroll progress (not two separate
   elements); it transitions between states rather than swapping
   instantly.
5. **Direct Contact CTA Feedback** — a distinct interaction feedback
   beyond basic color/scale hover.
6. **Touch-Input Equivalent Feedback** — every hover-based feedback
   (including the CTA's) has a functionally equivalent touch/tap
   counterpart.
7. **Nav Link Hover/Focus Feedback** — Section Navigation's "about" and
   "contact" links get a distinct hover/focus feedback treatment, without
   altering their destination behavior.
8. **Presence Link Hover/Focus Feedback** — every Presence Link, at both
   placements, gets the same distinct hover/focus feedback treatment,
   without altering destination or new-tab behavior.
9. **Language Switcher Interaction Feedback** — the Language Switcher's
   trigger and each option get a distinct hover/focus feedback treatment,
   and the dropdown's open/close is a discrete, observable transition
   rather than an instant show/hide — without altering Language
   Override's own selection, persistence, or no-op behavior.
10. **Reduced-Motion Equivalence** — every behavior above still reaches
    its full end-state without animated motion when the visitor's
    reduced-motion preference is active.

### Flows

- First visit-load → Hero entrance sequence plays → visitor scrolls/
  navigates onward.
- In-session return to Hero via nav → complete state shown directly, no
  replay.
- Scroll through About Narrative → pieces reveal in turn, stay revealed on
  scroll-up.
- Direct-nav arrival at About Narrative → all content visible immediately.
- Scroll past the Hero boundary (either direction) → nav identity
  transitions.
- Active screen changes (scroll or nav-link) → merged indicator
  transitions, reflecting both section and progress.
- CTA interaction (hover or tap) → defined feedback, equivalent across
  input types.
- Nav link hover/focus/tap → defined feedback, destination unchanged.
- Presence Link hover/focus/tap, at either placement → the same defined
  feedback, destination/new-tab behavior unchanged.
- Language Switcher trigger activation → hover/focus feedback →
  dropdown opens with a discrete transition → option hover/focus →
  feedback → selection → dropdown closes with a discrete transition →
  Language Override's own flow continues unchanged.
- Reduced-motion active → every flow above still completes fully, without
  relying on animation.

### Rules

- Content reveal is one-way — never re-hidden by scrolling back.
- Progressive vs. direct-nav arrival always converges on the same end
  state: fully visible.
- The Hero's entrance sequence plays at most once per visit.
- Nav identity depends on scroll position alone, not navigation method —
  consistent with Section Navigation's existing rule that its
  active-indicator state derives from actual scroll/viewport position.
- The indicator's active/progress components always reflect actual scroll
  position, never merely "last link clicked."
- Every hover feedback has a defined touch equivalent.
- The nav link, Presence Link, and Language Switcher trigger/option
  feedback treatments are identical wherever they recur (both nav links;
  both Presence Link placements; every switcher option) — one system,
  not per-instance variation.
- The Language Switcher's dropdown open/close is always a discrete,
  observable transition, never an instant show/hide.
- Reduced motion never blocks reaching any functional end-state.
- Every included behavior must serve an articulable purpose — a behavior
  without one is out of scope for this solution, regardless of technical
  feasibility.

### States and Transitions

- **Hero First-Load Entrance:** `Not yet played ⇄ Played` (per visit).
  Not yet played → Played on true first load; stays Played for the rest
  of the session, including on later returns to Hero via nav.
- **About Narrative Content Piece Reveal** (per piece, including photos):
  `Hidden ⇄ Revealed`, one-way within the visit. Hidden → Revealed on
  viewport entry during scroll, or on direct-navigation arrival at the
  section (which reveals all pieces at once).
- **Nav Identity:** `Hero-context ⇄ Post-Hero`. Transitions on scroll
  position crossing the Hero/Introduction boundary, in either direction.
- **Active/Progress Indicator:** reflects one of `{Introduction, Personal
  Narrative, Connection}` (extends Section Navigation's existing Active
  Screen Indicator state) plus a progress component derived from scroll
  position; transitions between states rather than swapping instantly.
- **Nav Link / Presence Link Feedback:** rest state ⇄ feedback state, on
  hover/focus (sustained) or tap (momentary). Identical across both nav
  links and both Presence Link placements.
- **Switcher Trigger/Option Feedback:** rest state ⇄ feedback state, on
  hover/focus (sustained) or tap (momentary), for the trigger and each
  option.
- **Switcher Dropdown:** `Closed ⇄ Open`, extending Language Override's
  existing state with a discrete, observable transition in each
  direction rather than an instant change.
- **Reduced-Motion Mode:** `Off ⇄ On`, derived from the visitor's system/
  browser preference; when On, every state above still reaches its
  end-state without relying on animated motion.

### Constraints

- The "played once per visit" Hero state and the "revealed,
  non-reversible" per-piece About Narrative state both require some form
  of visit-scoped memory of prior state — a functional requirement on the
  solution; its storage/technical mechanism is not decided here.
- Distinguishing "arrived via direct navigation" from "arrived via
  progressive scroll" requires the solution to functionally distinguish
  these two arrival paths, not just react to viewport intersection
  blindly.
- Providing a touch-input equivalent for hover-based feedback requires the
  solution to functionally branch on input capability/type.
- The Language Switcher's dropdown open/close transition requires the
  solution to distinguish the dropdown's open/closed state from a plain
  instantaneous visibility toggle.
- Merging progress into the Active Indicator requires the indicator's
  state model to carry more than a single enum value (active screen) — it
  must also express a continuous/graduated progress component.
- Every included behavior must have an articulable purpose; a behavior
  lacking one is out of scope for this solution regardless of technical
  feasibility.

### Boundaries

#### Included

- The 10 behaviours above (About Narrative reveal, Hero entrance, Nav
  identity transition, merged Active/Progress Indicator, Direct Contact
  CTA feedback, touch-equivalent feedback, nav link hover/focus feedback,
  Presence Link hover/focus feedback, Language Switcher interaction
  feedback, and reduced-motion equivalence applying to all of them).

#### Excluded

- A standalone scroll-progress indicator — merged into the Active
  Indicator instead, not a separate element.
- A standalone inter-section transition treatment — folded into the
  general coherent scroll-motion feel, not a discrete deliverable.
- An image mask/wipe "discover" reveal mechanism specifically — photos
  still get a distinct treatment as part of About Narrative's general
  reveal, but not that mechanism.
- A custom cursor (desktop) — no established purpose; not in scope.
- An initial page loader — no data-fetch/backend delay exists per
  Context's static-generated constraint; not in scope.
- Keyboard-focus motion beyond Accessibility's plain visibility
  guarantee — not in scope.
- The concrete visual/motion character (exact choreography, colors,
  curves, iconography) — Feature UX Specification.
- The exact technical mechanism (visit-scoped storage, input-type
  detection, animation technology) — Technical Design.
- Content/structure of what's animated, and focus-state existence/
  compliance — unchanged from Feature Definition's boundary, owned
  elsewhere.

---

*Created: 2026-09-07*
