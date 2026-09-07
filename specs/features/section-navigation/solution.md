# Feature Solution: Section Navigation

**Status:** Approved

## Solution Intent

### Functional Objective

Provide a persistent navigation mechanism — inline bar on desktop,
hamburger-triggered overlay on mobile — that lets a visitor jump directly
to any of the three screens and always see which screen is currently
active, resolving Feature Context's "no direct wayfinding, no orientation
cue" problem.

## Solution Behaviour

### Behaviours

- The nav bar is always visible on desktop; on mobile, a hamburger toggle
  is always visible and opens a full-screen overlay exposing the same
  links.
- The nav offers: a logomark link (→ Introduction), an "about" link (→
  Personal Narrative), a "contact" link (→ Connection), and hosts the
  language override control's placement.
- While composed over the Introduction/Hero screen, the nav omits its own
  compact logomark-icon element — the Hero's own large ornamental mark
  (owned by `hero-presentation`) already serves that identity role there.
  On every other screen (Personal Narrative, Connection), the nav includes
  its compact logomark icon alongside the wordmark and links. This is a
  confirmed, observed difference in the reference design (Figma), not a
  new element introduced here.
- Activating any link scrolls/jumps the page to that screen's anchor.
- The nav shows which screen is currently active at all times, updating
  as the visitor scrolls or after using a nav link — regardless of how the
  visitor arrived at that screen.
- On mobile, opening the overlay exposes links + active-indicator +
  language control; activating a link closes the overlay and navigates; a
  separate close action closes the overlay without navigating.

### Flows

- Visitor anywhere in the experience → activates a nav link → page jumps
  to the target screen's anchor → active-indicator updates to the new
  screen.
- Visitor free-scrolls without touching the nav → as their viewport
  crosses into a new screen, the active-indicator updates to match, with
  no nav action required.
- Mobile: visitor taps the hamburger toggle → overlay opens → visitor
  either taps a link (overlay closes, page jumps, indicator updates) or
  taps close/toggle again (overlay closes, no navigation).

### Rules

- Exactly one screen is "active" at any time; the indicator reflects
  exactly that screen — Introduction is active by default at rest/top of
  page.
- Nav link activation and free-scroll arrival at a screen produce the same
  resulting active-indicator state — the determination doesn't depend on
  how the visitor arrived.
- Nav links resolve to in-page anchors only — no full page
  navigation/reload (per Context's single-page constraint).
- The logomark link always targets Introduction's top, regardless of
  current scroll position or active screen.
- The nav (desktop bar, or mobile toggle) is present on every screen and
  device and cannot be dismissed by the visitor — only the mobile overlay
  itself opens/closes.

### States and Transitions

- **Mobile Overlay:** `Closed ⇄ Open`. Closed → Open on hamburger-toggle
  activation. Open → Closed on: link activation (then also navigates), or
  an explicit close action (no navigation).
- **Active Screen Indicator:** one of `{Introduction, Personal Narrative,
  Connection}`. Transitions on nav-link activation (jumps directly to the
  target) or free-scroll crossing into a different screen's viewport.

### Constraints

- The active-indicator's state must derive from actual scroll/viewport
  position (not merely "last link clicked"), since free scroll alone must
  also update it.
- The mobile overlay, while open, is full-screen and exclusive of
  interacting with the underlying page content (consistent with Project
  UX's "full-screen overlay" description).

### Boundaries

#### Included

- Link-activation and free-scroll-driven active-indicator behavior.
- Mobile overlay open/close behavior.
- Hosting the language override control's placement within both nav
  forms.
- The Hero-vs-other-screens logomark-presence difference described above
  (a functional "what element is shown where" statement).

#### Excluded

- The language override control's own switching/detection/persistence
  logic — `language-override`'s own solution.
- Each destination screen's own content/composition —
  `hero-presentation`, `about-narrative`, `direct-contact`.
- Motion/transition specifics (overlay animation, indicator movement, how
  the logomark visually appears/disappears between screens) —
  `motion-interaction`.
- Exact visual layout, iconography, and styling — Feature UX/UI.
- `presence-links` — no nav anchor, not part of this solution (per
  Definition's flagged boundary).
- Detailed accessibility implementation (specific ARIA patterns, focus
  trap mechanics) — inherited as a constraint, implemented at Technical
  Design.

---

*Created: 2026-09-07*
