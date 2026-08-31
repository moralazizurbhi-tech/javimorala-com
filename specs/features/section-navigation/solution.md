# Feature Solution: Section Navigation

## Solution Intent

### Functional Objective

Let a visitor jump directly to any section (Home/Hero, About, Contact)
from anywhere on the page, in a form appropriate to their device, without
ever blocking or replacing free scroll — resolving the Context's
wayfinding-shortcut need on a single-page, router-less site.

## Solution Behaviour

### Behaviours

- The nav offers three destinations — Home (Hero), About, Contact — each
  scroll-anchoring to its section when activated.
- The nav is available regardless of current scroll position.
- On viewports with adequate space, all three destinations are
  simultaneously visible (inline); on constrained viewports, they're
  hidden behind a trigger and revealed as a full overlay when activated.
  The device-class threshold itself is deferred to UX.
- Selecting a destination inside the overlay scroll-anchors to the target
  section and closes the overlay, as one action.
- The overlay can be dismissed without selecting any destination, leaving
  scroll position unchanged.
- Free scrolling always remains independently capable of reaching every
  section.

### Flows

- Visitor activates an inline destination → page scroll-anchors to that
  section.
- Visitor activates the mobile trigger → overlay opens → visitor either
  selects a destination (anchor + close together) or dismisses without
  selecting (close only, no anchor). (Grounded in `project-ux.md`'s
  existing Navigation section — not redefined here.)
- Visitor free-scrolls without any nav interaction → reaches sections in
  natural order, uninvolved with this Feature.

### Rules

- Every destination always resolves to the same one target section — no
  state/locale/session-dependent variation.
- Selecting a destination while the overlay is open always performs
  anchor + close together — never one without the other.
- Dismissing the overlay never triggers scroll-anchoring.
- The nav never disables, intercepts, or otherwise interferes with free
  scroll.
- Exactly one presentation form (inline or overlay) is active for a given
  viewport — never both, never neither.

### States and Transitions

- Mobile-class viewports: two states, **Closed** (trigger visible, overlay
  hidden) and **Open** (overlay visible). Closed → Open on trigger
  activation; Open → Closed either via destination selection (also
  anchors) or explicit dismissal (no anchor).
- Desktop-class viewports: no additional states — destinations are always
  simultaneously present.

### Constraints

- Selection-closes-overlay is a required atomic behavior, not optional —
  introduced by this Solution.
- Exactly one presentation form active at a time — introduced by this
  Solution; concretizes the Context's "device-appropriate form" constraint
  into a mutual-exclusivity requirement.

### Boundaries

#### Included

- Three destinations and their scroll-anchor behavior.
- Persistent availability regardless of scroll position.
- The two presentation forms and their mutual exclusivity.
- The overlay's open / select-anchors-and-closes / dismiss-without-anchor
  behavior.
- Free scroll's continued, independent validity.

#### Excluded

- The desktop/mobile viewport threshold itself — Feature UX.
- Visual/interaction specification of both forms, trigger icon, overlay
  treatment — Feature UX.
- Destination label copy, and resolving it into the visitor's language —
  content / `content-localization`.
- Social-links' own triggers — never part of nav (per Definition/Context;
  conflict already flagged, not re-litigated here).
- Motion/animation of open/close or any highlight state —
  `motion-interaction`.
- What each destination section itself presents — `hero-presentation` /
  `about-narrative` / `email-contact`.
- Implementation of the scroll-anchoring mechanism itself — Technical
  Design.

---

*Created: 2026-08-31*
