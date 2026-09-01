# Feature UX Specification: Content Localization

## UX Scope

Specializes Project UX's Experience Overview (immersive, editorial,
scroll-driven journey) and global UX Constraints (two-tier typography,
asymmetric composition, accessible contrast, purpose-built mobile
treatment, performance) for how localized content presents across the
existing Hero, About, and Contact views and the persistent nav — ensuring
every view reads as equally deliberate and complete regardless of which
supported language (English or Spanish) is active.

This Feature introduces no new screen, control, or interactive component
of its own — it specializes the content already hosted by
Hero/About/Contact/nav, not their structure.

Excludes: the manual-override control's presentation
(`language-override`), nav's own structure (`section-navigation`),
transition motion/timing (`motion-interaction`), each section's own
composition and copy (respective Features).

## User Flows

### Arrive already localized

- Visitor arrives at the site → the active language (resolved from a
  remembered override or browser-locale detection, per Feature Solution)
  is settled before any language-dependent content is first painted →
  visitor sees the entire page, on first paint, in one consistent
  language with no visible flash of a different or default language.

### Content updates on language change

- Visitor triggers a language change via `language-override`'s control
  (owned by that Feature) → every piece of displayed content — across
  whichever view the visitor is currently on, and every other view —
  updates completely to the new language, with no element left in the
  prior language. Any visual transition accompanying this update is
  `motion-interaction`'s decision; this Feature only requires that once
  the transition (if any) settles, no mixed-language content remains
  visible.

## Screens

### Hero view / About view / Contact view / Mobile nav overlay

Existing identity, from Project UX's Screens.

- Purpose (this Feature's slice): host content resolved in the active
  language, without redefining each view's own composition. Participates
  in both flows above.

## Interaction States

- **Resolved (steady state)** — all content across every view is
  displayed in the currently active language; this is the only enduring
  state.
- **No loading/fetching state** — since content is locally available
  rather than asynchronously fetched (bilingual-by-construction), no
  loading, skeleton, or spinner state is introduced for language
  resolution.
- **Reduced-motion** — per Project UX's mandatory fallback, a language
  update still reaches its complete, single-language state without
  relying on animated transition.

## Feature Components

No Feature-specific UI component is introduced. Content is presented
through each section's own existing composition (Hero/About/Contact/nav);
this Feature only determines which language's copy populates that
composition.

## UX Constraints

- No content may be painted in a default/fallback language before the
  active language is resolved — the visitor must never see a flash of the
  wrong language on arrival.
- Every view's layout (Hero, About, Contact, and nav) must tolerate the
  length difference between English and Spanish copy without truncating
  text or breaking the asymmetric/two-tier composition.
- Composition must express within the existing visual identity —
  dark-only, single accent, two-tier typography (Existing, global).
- Reduced-motion fallback mandatory for any transition accompanying a
  language update (Existing, global).
- Text/interactive elements must maintain accessible contrast in both
  languages, at every view and viewport (Existing, global).
- Every view must receive an equally deliberate, purpose-designed mobile
  treatment regardless of active language — never a generic reflow
  (Existing, global).
- Perceived performance must not be compromised by a language update
  (Existing, global).

---

*Created: 2026-09-01*
