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
   mechanism). The opening line, given its distinct typographic emphasis
   as the composition's "greeting moment," gets its own distinct reveal
   treatment, separate from both the uniform paragraph treatment and the
   photo treatment. Direct-navigation arrival at the section shows all
   content immediately.
2. **Hero First-Load Entrance** — on true first load in a visit, the
   Hero's elements — including Presence Links when Hero composes it —
   enter in a defined sequence; later in-session returns via nav show the
   complete state directly, with no replay.
3. **Nav Identity Transition** — the nav transitions between its
   Hero-context and post-Hero presentation as scroll crosses that
   boundary, in both directions. Realized via the Hero mark's own
   scroll-linked transformation (Behaviour 12) becoming the nav's
   compact logo — a single continuously-transforming element, not two
   separate assets crossfading — with hysteresis (distinct show/hide
   thresholds) to prevent flicker near the boundary.
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
10. **Nav Divider Segment Transition** — the divider transitions between
    its segmented state (split around a centered mark) and continuous
    state as the corresponding mark-presence fact changes, in a defined,
    observable way rather than snapping instantly.
11. **Hero Scroll-Linked Content Exit** — as the visitor scrolls past the
    Hero, its headline, scroll cue, and Presence Links (when composed)
    fade out along the same scroll-progress value that drives the
    mark's transformation (Behaviour 12), not an independently-timed
    exit. Reversible 1:1 with scroll position — scrolling back restores
    the elements along the same curve, not a one-way dismissal
    (distinct from About Narrative's one-way reveal, Behaviour 1).
12. **Hero Mark Transformation** — as the visitor scrolls past the Hero
    boundary, the Hero's own mark continuously transforms into the
    nav's compact logo identity — a single element, not a second asset
    crossfading in. Desktop: a continuous scroll-linked morph. Mobile:
    no logomark destination exists there; the mark instead dissolves
    via a reverse stroke-trace of its own entrance gesture. Tablet:
    unresolved — which treatment applies depends on Section
    Navigation's own nav-composition decision for that breakpoint
    (Context Problem 12), not decided here.
13. **About Narrative Photo Tilt** — once revealed (Behaviour 1), each
    photo tilts in response to cursor position (desktop, max 4°) or
    scroll direction/velocity (mobile), easing back to rest when the
    input cue stops. Layers additively onto whatever static base
    rotation About Narrative's own composition establishes (currently
    undefined there, Context Problem 13) — this motion functions
    correctly regardless, starting from that base or from level if none
    exists.
14. **Shared Scroll-Progress Source** — this Feature's own scroll-driven
    behaviours (Hero's content exit and mark transformation, the nav
    progress fill, the nav divider segmentation) derive from one
    shared, singly-observed scroll-progress value, not independent
    per-component listeners. Scoped to this Feature's own components
    only — does not extend to Section Navigation's own active-section
    detection, which remains its own concern; this Feature continues
    only reading the resulting exposed state.
15. **Direct Contact CTA Discoverability Motion** — extends Behaviour 5
    with an underline that draws left-to-right on hover (the same
    stroke/trace language as Behaviour 12) and a momentary scale-down
    on tap. When Direct Contact's own composition eventually adds a
    persistent affordance icon (Context Problem 15, blocked, not
    decided here), this Feature's tap gesture also applies a brief
    flourish to it. This treatment mitigates but does not fully resolve
    Problem 15 — full resolution is blocked until that icon exists.
16. **Reduced-Motion Equivalence** — every behavior above still reaches
    its full end-state without animated motion when the visitor's
    reduced-motion preference is active. The ambient gradient drift and
    every hover sweep/fill were already resolved before this Feature's
    current refinement (forced to Static; discrete non-animated
    feedback, respectively) — unchanged. The scroll-linked content exit
    and mark transformation (Behaviours 11, 12) remain fully active
    under reduced motion — they are driven directly by the visitor's
    own scroll position, not independently-timed animation, and are
    functionally meaningful (actual content visibility, actual mark
    identity), unlike purely decorative motion — so reduced motion does
    not suppress them. The photo tilt (Behaviour 13) is disabled
    entirely under reduced motion — purely decorative and rotation-
    based, the same treatment as the ambient gradient drift. Behaviour
    15's underline/tap-scale get normal coverage: resolve to final
    state without the draw-on/scale animation, consistent with the
    existing hover-feedback pattern.

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
- Mark presence/centering at the nav divider's position changes → divider
  transitions between segmented and continuous state.
- Visitor scrolls past the Hero → headline/scroll cue/Presence Links fade
  out and the mark transforms into the nav logo, along the same shared
  scroll-progress value; visitor scrolls back → both reverse along the
  same curve.
- Visitor hovers/moves cursor over a revealed About Narrative photo
  (desktop) → the photo tilts, following the cursor; cursor leaves → the
  photo eases back to rest. Visitor scrolls on mobile → the photo tilts
  per scroll direction/velocity.
- Visitor hovers the Direct Contact CTA → the underline draws left-to-
  right alongside existing feedback; visitor taps/clicks → the text
  scales down momentarily (and, once Direct Contact's own icon exists,
  it flourishes too) → unchanged `mailto:` hand-off.
- Reduced-motion active → every flow above still completes fully, without
  relying on animation, except where explicitly noted Pending
  (Behaviour 16).

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
- Presence Links, when part of Hero's composition, enters as part of the
  same sequence as the Hero's other elements, together with the scroll
  cue as the sequence's final step — not as an independently-timed
  addition.
- The divider's segmented/continuous transition derives from the same
  mark-presence fact Section Navigation and Hero expose, not a
  separately invented heuristic.
- This transition is functionally distinct from the Merged
  Active/Progress Indicator's active-screen component — the two usually
  coincide but are governed independently, consistent with Section
  Navigation's own distinction.
- The divider serves as the physical carrier for both the Merged
  Active/Progress Indicator and the Nav Divider Segment Transition; how
  their combined presentation is realized on one shared element is
  Feature UX/UI's concern, not decided here.
- Behaviours 11 and 12 derive from one shared scroll-progress value over
  the Hero's height, with intentionally overlapping ranges — the mark's
  transformation begins before the content's fade-out completes — so
  the two read as one continuous transition.
- Behaviour 13's tilt derives from cursor position (desktop) or scroll
  motion (mobile), never a device gyroscope — no system permission
  required.
- Behaviour 15's tap gesture ships in two independently-committable
  parts: the text scale-down (available now) and the icon flourish
  (blocked until the icon exists) — the whole Behaviour isn't blocked,
  only that portion.

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
- **Nav Divider Segmentation:** `Segmented ⇄ Continuous`. Segmented while
  a mark occupies the divider's center position; Continuous otherwise;
  transitions are observable, never instant.
- **Hero Content Exit:** continuous opacity value 1⇄0, scroll-progress-
  driven, reversible.
- **Hero Mark Transformation:** continuous Hero-form ⇄ nav-logo-form
  (desktop/tablet-morph) or Hero-form ⇄ dissolved (mobile-stroke-
  reverse), scroll-progress-driven, reversible; hysteresis applied near
  the boundary to prevent flicker.
- **Photo Tilt** (desktop, per photo): rest ⇄ tilted, continuously
  following cursor while hovered, ease-out on cursor-leave. (mobile):
  continuously derived from scroll motion, no discrete rest/active
  split.
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
- The divider's segmented/continuous transition requires the solution to
  consume a mark-presence signal exposed by Section Navigation and Hero,
  not derive this fact independently.
- Behaviour 12's device-conditional treatment requires the solution to
  functionally distinguish device/viewport class, similar to Behaviour
  6's existing input-capability branching.
- Behaviour 14's shared source is internal to this Feature's own
  components only — no authority claimed over Section Navigation's own
  detection mechanism.

### Boundaries

#### Included

- The 16 behaviours above (About Narrative reveal, Hero entrance, Nav
  identity transition, merged Active/Progress Indicator, Direct Contact
  CTA feedback, touch-equivalent feedback, nav link hover/focus feedback,
  Presence Link hover/focus feedback, Language Switcher interaction
  feedback, Nav Divider Segment Transition, Hero scroll-linked content
  exit, Hero mark transformation, About Narrative photo tilt, shared
  scroll-progress source, Direct Contact CTA discoverability motion, and
  reduced-motion equivalence applying to all of them).

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
- Ambient motion for the Ornamental Logo ghost-texture instances on About
  Narrative/Direct Contact — confirmed to stay static, matching those
  Features' own Technical Design; not in scope.
- About Narrative parallax (text and photos) — considered and excluded,
  to avoid visual fatigue in the section with the most running text.
- The underline→envelope-icon morph on the CTA — excluded; too much
  production effort for the short perception window before `mailto:`
  fires.
- About Narrative's photo scale-in reveal — excluded outright; replaced
  by a blur/desaturation+tint-to-sharp/colour treatment (Behaviour 1).
- A device-gyroscope-based tilt on mobile — noted as a possible future
  v2 enhancement, not this scope.

---

*Created: 2026-09-07*
