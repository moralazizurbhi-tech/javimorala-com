# Feature UI Definition: Motion & Interaction

**Status:** Approved

## UI Scope

Realizes Feature UX's motion moments — Hero first-load entrance, ambient
drift, scroll-linked exit, and mark transformation, About Narrative's
progressive reveal and photo tilt, Section Navigation's identity
transition, merged indicator, and divider segment transition,
Direct Contact's CTA feedback and discoverability motion,
nav link/Presence Link/Language Switcher hover-focus feedback, the
Language Switcher's dropdown open/close transition, and touch-equivalent
— using Project UX's Visual Foundations — now confirmed as a single
rounded, geometric sans-serif family and a warm near-black/off-white
base with a lilac-to-purple gradient reserved for emphasis — as shared
vocabulary, building directly on each realized Feature's own
approved UI Definition (Hero, About Narrative, Section Navigation, Direct
Contact) without altering their static compositions. Informed by the same
explicitly-provided Figma reference other Features cite (file
`CCwye9dUj8Sy4f2lgy6i9f`), consulted here specifically for the accent
gradient's actual look — a lilac-to-purple gradient, the same one
already carried by the Ornamental Mark, Ornamental Logo, and Presence
Links' tint — treated
as evidence, not persistent project knowledge. Excludes exact timing/
easing values and animation technology (Feature Technical Design), and
Section Navigation's own Active Screen Indicator base anatomy (Pending
there, not resolved here).

## Typography Application

No new typography. Motion applies to each element's existing type
treatment exactly as its own realized Feature's UI Definition specifies —
no size, weight, or tier changes.

## Spacing and Layout

No new spacing or positioning for existing elements. One reuse: the
merged indicator's progress component is realized against Section
Navigation's existing divider line — now structurally two independently
rendered segments around whichever mark occupies the center (per Section
Navigation's own UI Definition, Commitment 8), not one continuous line.
Progress fills sequentially across both segments as one continuous
scroll-progress value: the left segment fills first (0%→50% of overall
scroll maps to segment 1's own fill, left-to-right), then the right
segment fills as scroll continues past the midpoint (50%→100% maps to
segment 2's fill) — a segmented/stepped progress-bar pattern, not
continuous fill across the gap itself. On mobile, where Section
Navigation's own UI Definition observes no equivalent divider, this stays
Pending — unchanged. The underlying progress value itself is computed as
actual scrolled distance over total scrollable page height — weighted by
each section's real content length, not a fixed 1/3-per-section split —
consistent with the existing Contract rule that the indicator always
reflects actual scroll position.

## Component Anatomy and Variants

- **Hero background mark entrance:** the mark's outline draws on via a
  stroke reveal (SVG `stroke-dashoffset` 100%→0%), as if being traced —
  not a plain opacity fade — establishing the ambient backdrop with the
  same "drawn" character this Feature's stroke-based treatments now
  share (see Hero Mark Transformation below). Existing anatomy from
  Hero's UI Definition, no new element, but a new entrance mechanic.
- **Ambient gradient drift:** the mark's existing accent gradient
  subtly shifts its focal point/hue continuously once settled — a motion
  property applied to an existing value, not a new colour.
- **Headline entrance:** the headline's text is staggered by semantic
  group (phrase/clause) rather than by raw line position, so the
  cascade stays coherent under the project's fluid responsive scaling
  regardless of how a given viewport width wraps the text — each group
  enters with a slight upward translation + fade, as a quick, rapid
  cascade — not a uniform block fade — realizing Feature UX's "distinct
  per-element character."
- **Scroll cue entrance:** the existing text+arrow unit fades/translates
  in last, after the headline cascade completes.
- **Presence Links entrance:** fades/translates in alongside the scroll
  cue, in the same beat — not a separate, sequential step — existing
  anatomy from Presence Links' own UI Definition, no new element.
- **Hero scroll-linked content exit:** as the visitor scrolls past the
  Hero, the headline, scroll cue, and Presence Links fade continuously
  (opacity 1→0), scrubbed directly against scroll position over the
  Hero's height — not a discrete triggered animation. Reversible in
  both directions.
- **Hero mark transformation:** desktop/tablet-with-logomark-space — the
  Hero mark continuously morphs (SVG shape interpolation) from its
  Hero-scale form into the nav's compact logo form and position, tracked
  against the same shared scroll-progress value as the content exit
  above, overlapping it (starting before the content fade completes).
  The morphing element's container uses `overflow: visible` (it visually
  extends beyond the nav bar bounds at its larger nav-logo size) with
  `pointer-events: none` on the overflowing portion — sized to match
  the final logo dimensions Section Navigation's own UI Definition
  confirms: 158x292, 35% larger than its original 117x216, overflowing
  the nav row's height by roughly 76 units above the row with a small
  top-margin clearance (Context Problem 12 dependency, now resolved).
  Mobile: the mark dissolves via the same stroke-reveal mechanic as its
  entrance, played in reverse (`stroke-dashoffset` 0%→100%), tracked
  against the same scroll-progress value — no morph, since no logomark
  destination exists
  in that layout. Both directions apply a hysteresis margin (a small
  scroll-distance buffer before the transformation state flips) to
  prevent visible flicker from minor scroll oscillations near the
  boundary. Tablet: unresolved — Pending Section Navigation's own
  nav-composition decision (Context Problem 12).
- **About Narrative paragraph reveal:** each of the six existing blocks
  translates up slightly + fades in as revealed.
- **About Narrative opening-line reveal:** translates up + fades in like
  the other paragraphs, but with a more pronounced travel distance and
  slightly slower pacing — a heavier, more deliberate arrival
  distinguishing it as the greeting moment, paralleling how Hero's
  headline reads as the dominant beat versus the scroll cue's quiet one.
- **About Narrative photo reveal** (replaces the previous scale-in
  treatment entirely — discarded, read as a "PowerPoint effect"): the
  photo sits at its final position/size from the first frame, with no
  scale or translation movement. Instead, it resolves from blurred +
  desaturated-with-a-purple-tint-overlay (a colour blend, not a
  black-and-white desaturation) to sharp + full colour. The blur and
  the tint-overlay resolve with a slight offset between them — the blur
  clears a touch before the overlay fully clears — rather than
  perfectly synchronized.
- **Photo tilt:** desktop — each revealed photo tilts to follow cursor
  position while hovered, up to 4° of rotation, additive to whatever
  static base rotation the photo already carries (About Narrative's
  own, currently undefined there) — not replacing it. Eases back to
  rest (ease-out) when the cursor leaves. Mobile — tilt derives
  continuously from scroll direction/velocity rather than cursor
  position, and does not use the device gyroscope/orientation sensor
  (no permission prompt).
- **Nav identity transition:** the existing compact logomark icon
  fades/scales in when transitioning to the post-Hero presentation,
  reversing symmetrically on scroll-back — a transition on an existing
  conditional element, no new component.
- **Merged indicator (progress):** realized as the segmented
  divider-fill described under Spacing and Layout; each segment fills
  independently per its own half of overall scroll progress.
- **Merged indicator (active-screen):** the active-screen transition is
  realized as a layout animation — the indicator element itself
  slides/resizes toward the active link's position — rather than a
  cross-fade between states, wherever Section Navigation's own
  eventually-assigned anatomy supports a positionable/sizable element;
  applies to whatever base anatomy Section Navigation's own UI
  Definition eventually assigns (currently Pending there) — unchanged in
  its contingency, refined in its transition character.
- **Nav divider segment transition:** the gap between the two segments
  closes by both segments extending toward the center (continuous
  state), or opens by both segments retracting back to their segmented
  positions (segmented state) — a symmetric, reversible transition,
  mirroring the existing Nav Identity Transition's fade/scale pattern.
  Each segment's progress fill (above) continues to reflect its own
  filled proportion independent of the current segmentation state; when
  merged into one continuous line, the combined line shows the same
  progress reading computed across its full merged length. The gap's
  width scales proportionally with whatever final logo size Section
  Navigation's own UI Definition assigns (see Hero Mark Transformation
  above) — not a fixed value independent of it. Not applicable on
  mobile — no divider element exists there, consistent with Section
  Navigation's own UI Definition.
- **CTA feedback (gradient sweep):** on hover, the CTA's existing
  display text is filled by the site's accent gradient (the same
  lilac-to-purple gradient the Ornamental Mark, Ornamental Logo, and
  Presence Links already carry), and the gradient's position animates across the
  text — a moving sweep, like light passing over the letters — rather
  than a flat before/after fill swap. On touch, the same sweep plays
  momentarily on tap/press rather than persisting like a sustained
  hover.
- **CTA underline draw-on:** in addition to the gradient sweep above, a
  thin underline beneath the CTA's text draws left-to-right on
  hover/focus (`scaleX` 0→1, `transform-origin: left`) — the same
  stroke/trace language as the mark's entrance and transformation, for
  system coherence.
- **CTA tap gesture:** on tap/click, the CTA's text scales down
  momentarily (~0.97, ~100ms) as an activation cue, distinct from and
  in addition to the hover sweep/underline. At the same moment, Direct
  Contact's affordance icon (the envelope outline) takes a brief
  "flight" — a slight upward translation combined with a small rotation,
  as if taking off, settling back immediately after — a quick, snappy
  gesture matching the text scale-down's brisk pacing, not a lingering
  one.
- **Touch-feedback pattern (general):** wherever hover feedback exists,
  touch triggers the same visual treatment momentarily on tap/press
  rather than requiring a sustained hover state.
- **Nav link / Presence Link hover-focus feedback:** on hover or focus,
  the link's existing text fills with the site's accent gradient (the
  same lilac-to-purple gradient the CTA sweep, Ornamental Mark,
  Ornamental Logo, and Presence Links' tint already carry) as a static colour fill — not
  an animated moving sweep like the CTA's — keeping the CTA as the one
  elevated, primary interaction moment while these secondary links stay
  in the same gradient vocabulary at a lighter treatment. Identical
  treatment for "about," "contact," and every Presence Link at both
  placements. On touch, the same fill flashes momentarily on tap/press.
- **Language Switcher trigger hover-focus feedback:** the same static
  gradient-fill treatment as the nav links, since the trigger lives
  within the nav.
- **Language Switcher dropdown open/close transition:** the dropdown
  fades and translates slightly downward from the trigger as it opens,
  and reverses (fades and translates slightly upward) as it closes — a
  quick, responsive pace matching the nav identity/indicator transitions'
  character (Relative Entrance Pacing below), not the CTA sweep's more
  leisurely pace, since this is a functional menu rather than a
  decorative hover moment.
- **Language Switcher option hover-focus feedback:** each option in the
  open list receives the same static gradient-fill treatment as the nav
  links when hovered or focused; exact background/highlight treatment
  beyond the text fill is Pending, left to whoever implements, consistent
  with this Feature's existing Pending items.

### Relative Entrance Pacing (qualitative — exact values are Technical Design)

- The background mark's bloom begins immediately on load and takes the
  longest of the Hero entrance beats — it is the ambient atmosphere-
  setter, unhurried.
- The headline cascade begins shortly after the mark starts, overlapping
  it rather than waiting for it to finish; the three lines stagger in
  quickly, as a rapid cascade rather than evenly-spaced pauses.
- The scroll cue waits until the headline cascade completes, then
  appears after a brief pause — a genuine closing beat, not blended into
  the headline.
- About Narrative's per-piece reveal is brief/snappy, since it repeats on
  every scroll — a slow reveal would feel sluggish under continuous
  scrolling.
- The nav identity transition and indicator transition are quick and
  responsive, tracking scroll closely rather than lagging behind it.
- The Language Switcher's dropdown open/close transition is likewise
  quick and responsive, matching the nav's pacing rather than the CTA's.
- The CTA's gradient sweep is more leisurely and deliberate than the
  scroll-tied motions above — a discrete hover moment, not a continuous
  one, so it can take its time.
- The nav link, Presence Link, and Switcher trigger/option gradient-fill
  feedback is a near-instant colour change, not a sweep — the fastest of
  this Feature's hover treatments, since these are secondary, frequently
  re-triggered elements rather than the one elevated CTA moment.
- Presence Links enters in the same beat as the scroll cue — not a
  separate, sequential step.
- The About Narrative opening line's arrival is slightly slower/heavier
  than the other paragraphs' brisk, repeating reveal — a one-time
  distinguishing beat, not a repeated pattern.
- The nav divider's segmented/continuous transition is quick and
  responsive, matching the nav identity/indicator transitions' pacing.
- The Hero mark's draw-on entrance and the About Narrative opening
  line's reveal share the same easing-curve family — differing only in
  duration/delay, not character — keeping both anchored to this
  Feature's system-wide "drawn"/deliberate curve vocabulary rather than
  floating as isolated one-offs.
- The Hero's scroll-linked content exit and mark transformation are
  scrubbed directly against scroll position, not autoplaying on a fixed
  duration — their "pacing" is the visitor's own scroll speed; the
  range over which each occurs (roughly the first third of the Hero's
  height for content, the middle for the mark) is what's tuned, not a
  duration value.
- The CTA's underline draws at a pace matching the gradient sweep's
  leisurely character, not the nav's quick pacing — reinforcing that
  this is a discrete hover moment. The tap scale-down is near-instant
  (~100ms), a snappy activation cue rather than a lingering one.
- Photo tilt tracks the cursor/scroll input directly and continuously —
  no independent entrance pacing of its own, except the ease-out back
  to rest on cursor-leave (desktop), which is quick and responsive.

## Colour Application

- The ambient gradient drift, the CTA gradient sweep, and the nav
  link/Presence Link/Switcher trigger-option static gradient fill all
  reuse the existing accent gradient value already carried by the
  Ornamental Mark, Ornamental Logo, and Presence Links (lilac-to-purple,
  per the Figma reference) — no new colour token introduced.
- Progress-bar fill: the same accent gradient, layered onto the
  divider's existing base colour — `#e6bdfb`, per Section Navigation's
  UI Definition.
- About Narrative's photo tint overlay and the CTA's underline draw-on
  both reuse the same lilac-to-purple accent already carried by the
  Ornamental Mark/Logo/Presence Links/CTA sweep — no new colour token.

## Borders, Radii, Shadows, Surfaces

None persistent — consistent with the site's chrome-free style. One
transition-only exception: About Narrative's photo reveal applies a
temporary blur filter and colour-blend overlay during its transition,
resolving away once revealed — not a persistent border/surface.

## Iconography

None new for this Feature's own scope. Direct Contact's affordance icon
(the envelope outline) is now recorded in Direct Contact's own UI
Definition, not this Feature's — only the icon's own motion (the tap
flourish above) is this Feature's concern.

## Visual States and Responsive Layout

- **Hero Entrance** `Not yet played` / `Played`: pre-entrance
  offset+transparent state → final settled positions, exactly matching
  Hero's existing "Composition complete" UI state.
- **Ambient Drift** `Static` / `Drifting`: fixed gradient position vs.
  continuous subtle shift.
- **About Narrative Piece** `Hidden` / `Revealed`: offset+transparent →
  final position, exactly matching About Narrative's existing settled
  state.
- **Nav Identity** `Hero-context` / `Post-Hero`: icon absent → icon
  present, via the fade/scale transition described above.
- **Indicator:** progress = segmented divider-fill (each segment
  independently reflecting its half of overall progress, per Spacing and
  Layout); active-screen anatomy Pending (Section Navigation's own
  artifact) — this Feature's transition applies to whatever anatomy is
  eventually assigned there.
- **Nav Divider Segmentation** `Segmented` / `Continuous`: two-segment-
  with-gap state → merged single-line state, via the extend/retract
  transition described above. Not applicable on mobile.
- **Hero Content Exit:** continuous opacity 1→0 mapped directly to
  scroll position (~0-35% of Hero height); reversible. Reduced-motion:
  unaffected — continues exactly as specified, since it's driven
  directly by scroll position, not autoplaying motion.
- **Hero Mark Transformation:** desktop/tablet-with-space: continuous
  morph mapped to scroll position (~25-70% of Hero height, overlapping
  the content exit); mobile: continuous reverse stroke-reveal on the
  same mapping; tablet: unresolved. Hysteresis buffer prevents flicker
  near the boundary. Reduced-motion: unaffected, same reasoning as Hero
  Content Exit.
- **Photo Tilt:** continuous rotation value following cursor (desktop,
  ±4°) or scroll motion (mobile); ease-out to rest on cursor-leave
  (desktop). Reduced-motion: disabled entirely — photos stay at their
  static base rotation, same treatment as the ambient gradient drift
  (purely decorative, rotation-based).
- **CTA Feedback:** gradient sweep + underline draw-on, sustained while
  hovering / momentary on tap; tap also triggers the text scale-down
  (and, once it exists, the icon flourish).
- **Nav Link / Presence Link Feedback:** rest state (existing colour) →
  gradient-fill state, sustained while hovering/focused / momentary on
  tap. Identical across "about," "contact," and both Presence Link
  placements.
- **Switcher Trigger/Option Feedback:** same gradient-fill treatment as
  nav links, sustained while hovering/focused / momentary on tap.
- **Switcher Dropdown:** `Closed` (hidden, collapsed toward trigger) /
  `Open` (visible, settled position), via the fade+translate transition
  described above.
- **Reduced-Motion** `On`: every state above renders its final value
  directly, with no transition; ambient drift forced to `Static`; the
  dropdown's open/close renders as an instant state change rather than a
  fade+translate; the divider's segmented/continuous transition renders
  its final state directly, with no extend/retract animation; the CTA's
  underline/tap-scale resolve to their final state without the
  draw-on/scale animation, consistent with the existing hover-feedback
  pattern. Two exceptions to the "render final value directly, no
  transition" rule above: the Hero content exit and mark transformation
  remain fully active and scroll-linked (not autoplaying motion, so not
  suppressed); photo tilt is disabled entirely (purely decorative,
  rotation-based, same treatment as ambient drift).
- Desktop vs. mobile: motion applies atop each realized Feature's own
  existing per-device layout; new per-device splits this round: the
  Hero mark's morph (desktop/tablet-with-space) vs. reverse stroke-
  reveal (mobile), and photo tilt's cursor-driven (desktop) vs.
  scroll-driven (mobile) behavior — beyond the progress-bar's mobile
  Pending status noted above.

---

*Created: 2026-09-07*
