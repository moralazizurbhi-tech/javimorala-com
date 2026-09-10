# Feature Contract: Section Navigation

**Status:** Approved

## Contract Commitments

### Commitment 1 — Nav/Toggle Persistently Present and Reachable

Relationship to Solution: resolves the Rule that the nav (desktop bar, or
mobile toggle) is present on every screen/device and cannot be dismissed;
resolves Context's "reachable from anywhere" constraint.

**Acceptance Criteria**

- AC1: On desktop, the nav bar is rendered and visible on every screen
  (Introduction, Personal Narrative, Connection).
- AC2: On mobile, the hamburger toggle is rendered and visible on every
  screen.
- AC3: No visitor action removes or hides the nav bar (desktop) / toggle
  (mobile) while on any screen.

**Validation Scenarios**

- Scenario — visitor scrolls through all three screens on desktop
  - Success Condition: nav bar remains visible throughout.
  - Failure Condition: it disappears or becomes unreachable.
- Scenario — visitor scrolls through all three screens on mobile
  - Success Condition: toggle remains visible throughout.
  - Failure Condition: it disappears or becomes unreachable.

### Commitment 2 — Nav Link Anchor Navigation

Relationship to Solution: resolves "activating any link scrolls/jumps to
that screen's anchor" and "resolve to in-page anchors only — no full page
navigation/reload."

**Acceptance Criteria**

- AC1: Activating "about" moves the page position to Personal Narrative's
  anchor without a full page reload.
- AC2: Activating "contact" moves the page position to Connection's
  anchor without a full page reload.
- AC3: No nav link triggers a full browser navigation/reload.

**Validation Scenarios**

- Scenario — activate "about" from any screen
  - Success Condition: position is Personal Narrative, no reload.
  - Failure Condition: reload occurs, or lands elsewhere.
- Scenario — activate "contact" from any screen
  - Success Condition: position is Connection, no reload.
  - Failure Condition: reload occurs, or lands elsewhere.

### Commitment 3 — Logomark Always Links to Introduction's Top

Relationship to Solution: resolves "logomark link always targets
Introduction's top, regardless of current scroll position or active
screen."

**Acceptance Criteria**

- AC1: Activating the logomark from any screen moves the page position to
  Introduction's top.

**Validation Scenarios**

- Scenario — activate logomark from Personal Narrative or Connection
  - Success Condition: position becomes Introduction's top.
  - Failure Condition: stays put or moves elsewhere.
- Scenario — activate logomark while partway scrolled through Introduction
  - Success Condition: position becomes Introduction's top (not a
    no-op).
  - Failure Condition: no change occurs.

### Commitment 4 — Compact Logomark Icon Conditional Presence

Relationship to Solution: resolves "nav omits its own compact
logomark-icon element while over Introduction/Hero... includes it on
Personal Narrative, Connection."

**Acceptance Criteria**

- AC1: While Introduction is active, the nav does not render the compact
  logomark icon.
- AC2: While Personal Narrative or Connection is active, the nav renders
  the compact logomark icon.

**Validation Scenarios**

- Scenario — visitor on Introduction
  - Success Condition: no compact icon present.
  - Failure Condition: icon present.
- Scenario — visitor on Personal Narrative or Connection
  - Success Condition: icon present.
  - Failure Condition: icon absent.

### Commitment 5 — Active Screen Indicator Accuracy

Relationship to Solution: resolves "exactly one screen is active...
reflects exactly that screen," the viewport-derived Constraint, and the
state transitions on link activation / free scroll.

**Acceptance Criteria**

- AC1: On initial load, the indicator reflects Introduction as active.
- AC2: After a nav-link activation, the indicator reflects the target
  screen as active.
- AC3: After free-scrolling (no nav link used) into a different screen's
  viewport, the indicator updates to that screen.
- AC4: The indicator never reflects more than one screen, or none, once
  the visitor has begun interacting with the page.

**Validation Scenarios**

- Scenario — initial page load
  - Success Condition: indicator shows Introduction.
  - Failure Condition: shows another screen, or none.
- Scenario — activate "contact"
  - Success Condition: indicator shows Connection.
  - Failure Condition: shows a different screen or is unchanged.
- Scenario — free-scroll from Introduction into Personal Narrative
  without touching the nav
  - Success Condition: indicator updates to Personal Narrative once
    reached.
  - Failure Condition: remains on Introduction or shows the wrong screen.

### Commitment 6 — Mobile Overlay Open/Close Behavior

Relationship to Solution: resolves the Mobile Overlay states and the
overlay Behaviour/Constraint (full-screen, exclusive of underlying
content).

**Acceptance Criteria**

- AC1: Activating the toggle while closed opens the overlay, showing all
  nav links, the active-indicator, and the language override control.
- AC2: While open, activating a nav link closes the overlay and navigates
  to that link's target.
- AC3: While open, an explicit close action closes the overlay without
  changing the active screen.
- AC4: While open, the visitor cannot interact with the underlying page
  content behind it.

**Validation Scenarios**

- Scenario — mobile visitor opens the overlay
  - Success Condition: full-screen overlay shows links + indicator +
    language control; underlying page not interactable.
  - Failure Condition: any element missing, or underlying page remains
    interactable.
- Scenario — visitor taps a link inside the open overlay
  - Success Condition: overlay closes and page navigates to the target.
  - Failure Condition: overlay stays open, or no navigation occurs.
- Scenario — visitor closes the overlay without selecting a link
  - Success Condition: overlay closes, active screen unchanged.
  - Failure Condition: overlay stays open, or active screen changes.

### Commitment 7 — Language Override Control Hosted in Both Nav Forms

Relationship to Solution: resolves "hosts the language override control's
placement" across both desktop bar and mobile overlay.

**Acceptance Criteria**

- AC1: The language override control is present within the desktop nav
  bar on every screen.
- AC2: The language override control is present within the mobile
  overlay when open, on every screen.
- AC3: This Feature does not alter the control's own
  switching/detection/persistence behavior (owned by `language-override`).

**Validation Scenarios**

- Scenario — desktop visitor views the nav on any screen
  - Success Condition: language override control present.
  - Failure Condition: absent.
- Scenario — mobile visitor opens the overlay on any screen
  - Success Condition: language override control present.
  - Failure Condition: absent.

### Commitment 8 — Nav Divider Line Segmented Presence

Relationship to Solution: resolves the Behaviour/Rule that the nav's
connecting line renders as two segments flanking whichever mark occupies
the row's center, never as one continuous line, on every screen —
including the scroll-derived distinction on Introduction between when
Hero's own mark is still visible at that position and when it has
scrolled past.

**Acceptance Criteria**

- AC1: On every screen, the nav's connecting line is never rendered as a
  single unbroken line across the full bar width.
- AC2: On Personal Narrative and Connection, the line presents as two
  segments flanking this Feature's own compact logomark icon.
- AC3: While Introduction is active and Hero's own mark remains visible
  at the nav row's position given the current scroll offset, the line
  presents as two segments flanking it; once that mark has scrolled past
  the nav's row — even while Introduction is still nominally the active
  section — the line reverts to one continuous line, since no mark
  occupies the gap.

**Validation Scenarios**

- Scenario — visitor on Personal Narrative or Connection
  - Success Condition: the connecting line is visibly interrupted at the
    compact logomark icon's position.
  - Failure Condition: the line renders as one continuous line straight
    through/over the icon.
- Scenario — visitor on Introduction, at a scroll position where Hero's
  mark is still visible at the nav row
  - Success Condition: the connecting line is visibly interrupted at the
    position Hero's own mark occupies.
  - Failure Condition: the line renders as one continuous line straight
    across, ignoring the mark beneath it.
- Scenario — visitor scrolls within Introduction past where Hero's mark
  disappears from the nav's row, without yet reaching Personal Narrative
  - Success Condition: the line is continuous (no mark present at that
    position).
  - Failure Condition: the line remains segmented with an empty gap.

---

*Created: 2026-09-07*
