# Feature Context: Accessibility

**Status:** Approved

## Problem

Across the Feature Development specs, all seven Features that host
interactive or static content each repeat only the same inherited UX
Constraint line ("full keyboard operability, visible focus states,
sufficient contrast, and assistive-technology compatibility") without any
Feature actually defining, resolving, or owning the concrete guarantee.
Four concrete gaps:

1. `section-navigation`'s own Solution explicitly excludes "detailed
   accessibility implementation (specific ARIA patterns, focus
   management)" from its scope — the Active Screen Indicator's accessible
   current-section semantics, and nav structural ARIA beyond what Radix
   UI's headless primitives supply by default, are unowned.
2. `content-localization`'s Context names a correct `html lang` attribute
   only as an example of the cross-cutting accessibility dependency —
   never confirmed as anyone's owned deliverable.
3. No Feature spec, and no project-level artifact, states a concrete
   accessibility conformance target — Project Design explicitly defers
   this ("the specific accessibility standard or conformance level is
   left to a later phase").
4. Every per-feature UI Definition that reaches a focus-state/contrast
   value defers it as Pending (e.g. `presence-links`/ui.md,
   `direct-contact`/ui.md both mark colour token values Pending) — no
   concrete, checkable contrast or focus-style value exists anywhere in
   the project yet.

Left unresolved, the seven dependent Features would each individually
claim the same inherited guarantee without a single artifact establishing
what "sufficient," "compatible," or "operable" concretely means, or how
it would be verified.

## Motivation

Directly serves Project Design's Design Constraint ("the experience must
remain accessible to visitors regardless of ability") and Project UX's UX
Constraints, which every downstream Feature spec already inherits
verbatim but none has yet fulfilled concretely.

## Scope

### Included

- The problem of no Feature owning concrete ARIA/focus-management for
  `section-navigation`'s current-section indication and nav semantics
  (Gap 1).
- The problem of `html lang` correctness for `content-localization`
  having no confirmed owner (Gap 2).
- The problem of no concrete accessibility conformance target existing
  anywhere in the project (Gap 3) — resolved within this Context as
  **WCAG 2.1 Level AA**.
- The problem of no concrete, checkable contrast/focus-style value
  existing anywhere yet (Gap 4).
- The general problem of verifying, once each Feature is implemented,
  that it actually satisfies the inherited guarantee.

### Excluded

- Skip-link / "skip to content" mechanism — excluded; the persistent,
  always-reachable nav already provides quick navigation, so a
  skip-link's usual benefit (bypassing long repeated nav content) is
  minimal here.
- The content, structure, and functional contract of each Feature —
  unchanged, per Feature Definition's boundary.
- The motion character of focus/hover/active states and the
  reduced-motion mechanism — owned by `motion-interaction`, per Feature
  Definition's boundary.
- Visual design token values themselves (exact colours/typography) —
  Styling System substrate; this Feature owns the sufficiency guarantee
  as a testable rule, not the values.
- Radix UI's own internal accessibility implementation — an
  already-adopted, external Architecture-level decision (Accessible
  Primitives Layer) this Feature builds on, not redesigns.

## Constraints

- Interactive components already built on Radix UI
  (`language-override`'s switcher, `section-navigation`'s mobile
  toggle/overlay) inherit baseline keyboard/ARIA semantics by
  construction — this Feature's role there is to confirm/verify, not
  build from scratch.
- Purely static content (rendered without hydration, per Project
  Architecture) has no such automatic baseline — semantic markup
  (headings, landmarks, alt text, `html lang`) is this Feature's to
  define and verify directly.
- Target conformance level: **WCAG 2.1 Level AA**.
- Concrete implementation technology/technique is out of scope here —
  left to Technical Design, consistent with every sibling Feature's
  Context.
- Inherited from project level: must work across the full device range;
  static-generated architecture with no backend; solo effort with no
  fixed deadline.

## Known Dependencies

- Applies across: `hero-presentation`, `about-narrative`,
  `direct-contact`, `presence-links`, `content-localization`,
  `language-override`, `section-navigation` — per catalog.
- `motion-interaction` — boundary fixed at Feature Definition: Motion &
  Interaction owns the motion character of states this Feature
  guarantees exist.
- Project Architecture's Accessible Primitives Layer (Radix UI) —
  existing infrastructure this Feature depends on for every
  already-interactive component.
- `hero-presentation` — already committed to non-interactive/
  non-focusable scroll-cue markup, specifically to avoid a false AT
  affordance (a compatible existing precedent).
- `direct-contact` — already committed that its email-obfuscation
  technique must not compromise keyboard/screen-reader accessibility.
- `presence-links` — already committed that each link needs an
  accessible name identifying its destination.
- `language-override` — already committed to full keyboard operability
  and correct ARIA menu semantics, built on Radix.

---

*Created: 2026-09-07*
