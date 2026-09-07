# Feature UX Specification: Accessibility

**Status:** Approved

## UX Scope

Specializes Project UX's UX Constraints ("full keyboard operability,
visible focus states, sufficient contrast, and assistive-technology
compatibility") and Visual Foundations' "clearly visible, on-brand focus
state," for the guarantees Feature Contract closes: keyboard
operability, focus visibility, contrast, AT compatibility, nav
current-state exposure, and document-language correctness. Excludes each
Feature's own content/structure/functional contract, and the motion
character of focus/hover/active states (owned by `motion-interaction`).

## User Flows

### Keyboard navigation across the experience

Specializes every dependent Feature's own flow.

- Visitor tabs through the persistent nav's links and language switcher,
  into whichever screen's content is reachable, to Direct Contact's CTA
  and Presence Links → each element is reached and operable in visual
  order (Contract Commitment 1).

### Focus visibility

- Visitor tabs to any interactive element → a focus indicator becomes
  visible immediately, distinguishable from hover/non-focused states,
  remaining visible against both the near-black base and gradient-accent
  areas (Contract Commitment 2).

### Assistive-technology navigation

Specializes each dependent Feature's own flow for AT users.

- Screen-reader visitor navigates by heading/landmark → structure
  matches Introduction/Personal Narrative/Connection organization;
  reaches each meaningful element with an accessible name; the Hero's
  scroll cue is never announced as interactive (Contract Commitment 4).
- Screen-reader visitor inspects the nav at any scroll position → nav
  communicates the current section (Contract Commitment 5).

### Language-attribute sync

Specializes Content Localization's and Language Override's own flows.

- Visitor loads the site (auto-detected or overridden language), or
  switches language mid-visit → document language attribute matches the
  active language at every point (Contract Commitment 6).

## Screens

This Feature is cross-cutting and owns no screen of its own; it
participates in the three Project UX screens through the Features that
own them.

- **Introduction** — guarantees Hero's scroll cue exposes no false
  interactive affordance, and Presence Links' secondary appearance meets
  keyboard/focus/contrast/AT guarantees. Participates in Keyboard
  navigation, Focus visibility, AT navigation.
- **Personal Narrative** — guarantees About Narrative's content structure
  is AT-navigable, and the nav's post-Hero presentation and
  Active/Progress Indicator expose current-state to AT. Participates in
  the same three flows.
- **Connection** — guarantees Direct Contact's CTA and Presence Links
  meet keyboard/focus/contrast/AT guarantees. Participates in the same
  three flows.
- Language-attribute sync applies globally via the persistent nav
  present on every screen.

## Interaction States

- **Focus State** (per interactive element): `Unfocused` / `Focused` — a
  visible indicator is present only in `Focused`; the motion character
  of the transition between them is owned by `motion-interaction`.
- **Nav Current-Section AT State**: exposed value from `{Introduction,
  Personal Narrative, Connection}` — an AT-perceivable representation of
  the state Section Navigation/Motion & Interaction already track
  visually.
- **Document Language State**: reflects `{English, Spanish, Euskera}` —
  always in sync with Content Localization/Language Override's active
  language state.

## Feature Components

- **Focus Indicator Style** — applies to every interactive element
  across every Feature; exact visual treatment (colour, shape, offset)
  Pending, Feature UI.
- **Accessible Name & Landmark Structure** — semantic roles/labels/
  headings applied across every Feature's markup.
- **Nav Current-State AT Exposure** — specializes Section Navigation's
  existing nav/indicator with an AT-perceivable current-state signal.
- **Document Language Sync** — keeps the document's language attribute
  aligned with Content Localization/Language Override's active state.

## Content and Assets

Excluded — accessible-name/label text is each dependent Feature's own
content, per Feature Definition's boundary; this Feature specifies that
such names/labels must exist and be meaningful (Contract AC1/AC4), not
their copy.

## UX Constraints

- WCAG 2.1 AA contrast ratios apply, as confirmed in Feature Context.
- Focus indicator must remain visible across every background in the
  palette (near-black base and gradient accents alike).
- The motion character of focus/hover/active states, and any AT-state
  transition, is owned by `motion-interaction`; this Feature must not
  conflict with it, only guarantee existence/perceivability.
- Nav/indicator AT exposure must not require altering Section
  Navigation's own defined content/links, nor Motion & Interaction's
  animated implementation — exposure/state layer only.
- Document language sync must never leave a stale or mismatched value,
  even momentarily, during a language switch.
- Accessible names/labels are each dependent Feature's own content —
  this Feature guarantees their existence and correctness, not their
  authorship.

---

*Created: 2026-09-07*
