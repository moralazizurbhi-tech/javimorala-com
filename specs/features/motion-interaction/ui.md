# Feature UI Definition: Motion & Interaction

**Status:** Approved

## UI Scope

Realizes Feature UX's six motion moments — Hero first-load entrance and
ambient drift, About Narrative's progressive reveal, Section Navigation's
identity transition and merged indicator, and Direct Contact's CTA
feedback and touch-equivalent — using Project UX's Visual Foundations
(near-black/off-white base, vivid accent gradient reserved for emphasis)
as shared vocabulary, building directly on each realized Feature's own
approved UI Definition (Hero, About Narrative, Section Navigation, Direct
Contact) without altering their static compositions. Informed by the same
explicitly-provided Figma reference other Features cite (file
`CCwye9dUj8Sy4f2lgy6i9f`), consulted here specifically for the accent
gradient's actual look — a lavender-to-violet-grey gradient, the same one
already carried by the ornamental mark and Presence Links' tint — treated
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
merged indicator's progress component is realized as Section Navigation's
existing thin horizontal divider line (already running beneath the
desktop nav bar) filling proportionally left-to-right with scroll
position — no new UI real estate added. On mobile, where Section
Navigation's own UI Definition observes no equivalent divider, this stays
Pending.

## Component Anatomy and Variants

- **Hero background mark entrance:** fades in (transparent → full
  opacity) as the ambient backdrop establishes — existing anatomy from
  Hero's UI Definition, no new element.
- **Ambient gradient drift:** the mark's existing accent gradient
  subtly shifts its focal point/hue continuously once settled — a motion
  property applied to an existing value, not a new colour.
- **Headline entrance:** the three existing text lines enter with a
  slight upward translation + fade, staggered per line as a quick,
  rapid cascade — not a uniform block fade — realizing Feature UX's
  "distinct per-element character."
- **Scroll cue entrance:** the existing text+arrow unit fades/translates
  in last, after the headline cascade completes.
- **About Narrative paragraph reveal:** each of the six existing blocks
  translates up slightly + fades in as revealed.
- **About Narrative photo reveal:** a distinct treatment from
  paragraphs — a subtle scale-in (reduced → full size) alongside fade,
  distinguishing photos without a mask/wipe mechanism (excluded per
  Feature Solution).
- **Nav identity transition:** the existing compact logomark icon
  fades/scales in when transitioning to the post-Hero presentation,
  reversing symmetrically on scroll-back — a transition on an existing
  conditional element, no new component.
- **Merged indicator:** the progress component is realized via the
  divider-fill described under Spacing and Layout; the active-screen
  transition applies smoothly to whatever base anatomy Section
  Navigation's own UI Definition eventually assigns (currently Pending
  there).
- **CTA feedback (gradient sweep):** on hover, the CTA's existing
  display text is filled by the site's accent gradient (the same
  lavender-to-violet-grey gradient the ornamental mark and Presence
  Links already carry), and the gradient's position animates across the
  text — a moving sweep, like light passing over the letters — rather
  than a flat before/after fill swap. On touch, the same sweep plays
  momentarily on tap/press rather than persisting like a sustained
  hover.
- **Touch-feedback pattern (general):** wherever hover feedback exists,
  touch triggers the same visual treatment momentarily on tap/press
  rather than requiring a sustained hover state. Currently the CTA is
  this Feature's only feedback-bearing element.

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
- The CTA's gradient sweep is more leisurely and deliberate than the
  scroll-tied motions above — a discrete hover moment, not a continuous
  one, so it can take its time.

## Colour Application

- The ambient gradient drift and the CTA gradient sweep both reuse the
  existing accent gradient value already carried by the ornamental mark
  and Presence Links (lavender-to-violet-grey, per the Figma reference) —
  no new colour token introduced.
- Progress-bar fill: the same accent gradient, layered onto the
  divider's existing base colour — the divider's own exact base colour
  value is Pending, inherited from Section Navigation's UI Definition,
  which did not specify it.

## Borders, Radii, Shadows, Surfaces

None — consistent with the site's chrome-free style; motion introduces
no borders or surfaces.

## Iconography

None new.

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
- **Indicator:** progress = divider-fill width; active-screen anatomy
  Pending (Section Navigation's own artifact) — this Feature's
  transition applies to whatever anatomy is eventually assigned there.
- **CTA Feedback:** gradient sweep, sustained while hovering / momentary
  on tap.
- **Reduced-Motion** `On`: every state above renders its final value
  directly, with no transition; ambient drift forced to `Static`.
- Desktop vs. mobile: motion applies atop each realized Feature's own
  existing per-device layout; no new per-device split beyond the
  progress-bar's mobile Pending status noted above.

---

*Created: 2026-09-07*
