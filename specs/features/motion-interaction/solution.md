# Feature Solution: Motion & Interaction

## Solution Intent

### Functional Objective

Ensure every section/page-level transition and every micro-interaction
across the six consuming features is rendered through exactly one of two
coherent motion treatments (bold/assertive for section/page-level,
restrained-by-contrast for micro-interaction), that scroll control never
transfers away from the visitor, and that a reduced-motion-preferring
visitor gets a functionally complete experience with motion suppressed —
without each consuming feature independently designing its own motion.

## Solution Behaviour

### Behaviours

1. Classify every animatable moment across the six consuming features into
   exactly one of two categories: **Section/Page-level** (bold) or
   **Micro-interaction** (restrained). No third or unclassified category.
2. Play a section's bold entry motion the first time it enters the viewport
   during a visit (including if already visible at page load); never
   replay it on later re-entries.
3. Play restrained micro-interaction feedback on every qualifying
   interaction (hover/focus/press/activate on buttons, links, cards, the
   language-override control, etc.), returning to rest after.
4. Treat the mobile nav overlay's open/close transition as Section/Page-
   level (bold).
5. Resolve the visitor's reduced-motion preference exactly once, at page
   load, fixing Motion Mode for the rest of the visit.
6. In Reduced Motion Mode, both categories are replaced by a minimal/no-
   motion equivalent that still delivers the same functional outcome
   (content shown, feedback perceptible).
7. No motion, in either mode, may capture, delay past visitor intent, lock,
   or force-snap scroll — scroll changes only from the visitor's own
   scrolling or explicit nav/anchor activation.

### Flows

- **Page load** — reduced-motion preference resolved once; Motion Mode
  fixed (Standard/Reduced); whatever section is initially visible counts
  as "entered" (no future replay for it).
- **Section entry** — visitor scrolls or nav-anchor jumps into a
  not-yet-entered section; bold entry motion plays once; subsequent
  re-entries produce no replay.
- **Micro-interaction** — visitor interacts with an element; restrained
  feedback plays; element returns to rest.
- **Nav overlay open/close** — an explicit, repeatable visitor-triggered
  toggle; bold transition plays on every occurrence, since it is a
  deliberate action, not a passive re-entry, so the once-per-visit
  suppression does not apply to it.
- **Reduced Motion Mode** — the same flows above occur, but each motion
  moment resolves to its minimal/no-motion equivalent instead.

### Rules

- R1: Every animatable moment resolves to exactly one of the two
  categories — exhaustive, mutually exclusive.
- R2: Section/Page-level bold entry motion plays only on a section's first
  view-entry per visit (load-visible counts as entered); no replay after.
- R3: The nav overlay's open/close bold transition is exempt from the
  once-per-visit suppression — it plays every occurrence.
- R4: Micro-interaction motion has no once-per-visit suppression — it
  plays on every qualifying interaction.
- R5: Section/Page-level treatment is always visually bolder/more
  assertive than Micro-interaction treatment; never equal or inverted.
- R6: Reduced-motion preference is resolved exactly once, at load; a
  mid-visit system-level change has no effect until the visitor reloads.
- R7: In Reduced Motion Mode, every moment from R2–R4 still occurs
  functionally, with motion minimized/removed.
- R8: No motion behavior may ever take scroll-position control away from
  the visitor.

### States and Transitions

- **Motion Mode**: `{Standard, Reduced}` — set once at load per R6; fixed
  for the visit; no in-visit transition.
- **Section Entry State** (per animatable section-level moment):
  `{Not yet entered → Entered}` — one-way transition on first viewport
  entry or load-visibility; governs R2.
- **Nav Overlay State**: `{Closed ⇄ Open}` — each transition (either
  direction) independently triggers its own bold motion occurrence per R3,
  unconstrained by Section Entry State's one-time rule.

### Constraints

- The two-category classification is exhaustive/mutually exclusive by
  design — future consuming-feature elements must resolve into one of the
  two, never a new category.
- Motion Mode is a one-time, load-resolved binary, not a continuously
  observed value.
- The once-per-visit suppression is scoped to passive viewport entry only;
  it does not extend to explicit repeatable visitor-triggered toggles (nav
  overlay).

### Boundaries

#### Included

- The two-category classification scheme.
- Section entry once-per-visit rule.
- Micro-interaction always-on rule.
- Nav overlay classification and repeat-play behavior.
- Reduced-motion resolution timing and functional-equivalence guarantee.
- The scroll-never-hijacked enforcement scope.

#### Excluded

- Exact choreography/timing/easing values.
- Each feature's own content/layout.
- Framer Motion or any implementation mechanism.
- UX specification of how each treatment visually looks.
- Technical design of how the reduced-motion preference is read.

---

*Created: 2026-09-01*
