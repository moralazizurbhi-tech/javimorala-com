# Feature UX Specification: Content Localization

**Status:** Approved

## UX Scope

Specializes Project UX's detection portion of the "Switch language" User
Flow (not the switching mechanism itself — owned by `language-override`)
and the Visual Foundations' cross-language consistency note ("Visual
coherence ... applies uniformly across all three screens and all three
languages"). Realizes the existing Introduction, Personal Narrative, and
Connection screens in the resolved active language; introduces no screen
or visible moment of its own, consistent with Technical Design's
content-free root redirect. Excludes the override control's own UI/
switching (`language-override`), nav placement (`section-navigation`),
and motion (`motion-interaction`).

## User Flows

### Arrive and see correct-language content (auto-detect)

Specializes Feature Solution's "visitor arrives without specifying a
language" flow.

- Visitor lands at the site root with no active override → active
  language resolves silently (override → detected supported locale →
  English fallback, Contract Commitment 1) before anything paints →
  visitor perceives the Introduction screen already in the resolved
  language, indistinguishable from having landed there directly
  (Commitment 4).

### Arrive at a specific language's URL directly

Specializes Feature Solution's "visitor arrives directly at a specific
language's URL" flow.

- Visitor follows a shared/direct link to a given language's route → that
  language is active immediately; no detection or redirect step is
  perceivable → screen renders normally (Commitment 3).

### Fallback to English (unsupported locale or no JavaScript)

- Visitor's browser locale isn't one of the three, or JavaScript is
  unavailable → active language resolves to English (Commitment 1 AC3;
  Technical Design's `<noscript>` path) → experience is presented exactly
  as a genuine English-locale visit, with no indication a fallback
  occurred (Confirmed).

### Consistent with a prior override

- Visitor with a prior override in effect arrives → that language is
  honored ahead of fresh detection → same silent, first-paint-correct
  experience as above.

## Screens

No Feature-specific screen (Confirmed). This Feature realizes the
existing Introduction, Personal Narrative, and Connection screens
(Existing, Project UX Screens) in the resolved active language; the root
route itself carries no visible content of its own (Existing, Technical
Design) and is not a perceivable screen.

## Interaction States

- **Resolved (steady state)** — the only user-perceivable state: content
  and metadata already correct for the active language from first paint.
  No "resolving"/loading state is perceivable, since resolution completes
  before paint (Commitment 4).
- No loading, empty, warning, or error state applies — resolution either
  succeeds (detected/overridden/direct-URL) or falls back to English;
  both outcomes present as the same steady, fully-rendered state.
- Fallback (unsupported locale / no-JS) is not a distinct visible state —
  presented identically to a genuine English-locale visit (Confirmed).

## Feature Components

No new Feature-specific component (Confirmed). This Feature consumes and
correctly localizes the existing screens' content and the shared UI
Components (Persistent Nav Bar, Language Switcher, etc. — each owned by
`section-navigation`/`language-override`) without redefining them.

## Content and Assets

- **Per-language copy/metadata coverage** — Confirmed as a requirement,
  not authored content: every content surface each domain Feature (Hero
  Presentation, About Narrative, Direct Contact, Presence Links) already
  defines must have equivalent English, Spanish, and Euskera values
  (Commitment 5); this Feature does not author or enumerate those
  strings.
- **Individual translated strings** (headline, narrative copy, alt text,
  etc.) — Excluded from this artifact; each owning domain Feature's own
  UX confirms its own Spanish/Euskera values (e.g. Hero Presentation's UX
  already marks its headline/scroll-cue translations Pending, "resolved
  via content-localization's authoring process" — read as: resolved
  within that Feature's own UX, subject to this Feature's coverage
  requirement).
- **SEO metadata per language** (title, meta description, `html lang`,
  alt text) — same treatment: this Feature requires equivalent
  per-language values exist and render correctly; authoring the actual
  values is each surface-owning Feature's concern.

## UX Constraints

- No visible transition, flash, or swap between languages is ever
  perceivable, for any resolution path (Existing, Commitment 4).
- Fallback to English (unsupported locale, no JS) must be visually and
  experientially identical to a genuine English-locale visit — no
  fallback indicator (Confirmed).
- Visual coherence — palette, typography, spacing — applies uniformly
  across all three languages (Existing, Project UX Visual Foundations).
- Full keyboard operability, visible focus states, sufficient contrast,
  and assistive-technology compatibility apply identically regardless of
  active language, including correct `html lang` for AT pronunciation
  (Existing, Project UX UX Constraints; Commitment 2).

---

*Created: 2026-09-07*
