# Feature Context: Section Navigation

## Problem

A visitor who wants to reach a specific section (About or Contact) —
because they already know what they're after, or are returning — has no
way to get there except scrolling through everything in between; free
scroll alone makes every visit start-to-finish even when that's not what
the visitor wants. On mobile, screen space is too constrained for an
always-visible set of links, so the same wayfinding need requires a
distinct, space-appropriate form there.

## Motivation

Because the site is a single continuous page with no client-side router
(Project Architecture), a persistent nav is the only available shortcut —
without it, wayfinding is scroll-only. Respecting visitor agency this way
serves the site's Vision (a credible reference point visitors can actually
act on) by not forcing every visitor through the same linear path
regardless of intent.

## Scope

### Included

- The need for a wayfinding shortcut to each section (Home/Hero, About,
  Contact), available from anywhere on the page regardless of scroll
  position.
- The need for that shortcut to take a device-appropriate form — space
  allows an always-visible form on desktop, but not on mobile.
- The need for the shortcut to coexist with, never replace or gate, free
  scroll.

### Excluded

- What a section presents once reached — `hero-presentation` /
  `about-narrative` / `email-contact`'s own problems.
- The social-links option's own need — `social-links`' problem; per this
  Feature's Definition, social links are not part of the nav (conflict
  already flagged there, carried forward, not re-litigated here).
- Resolving nav labels into the visitor's language —
  `content-localization`'s problem.
- Nav's motion/interaction feel — `motion-interaction`'s problem.
- Any solution shape: visual treatment, exact overlay mechanics,
  icon/label design — belongs to Feature Solution/UX/Technical Design.

## Constraints

- No client-side router, no multi-page navigation (Project Architecture) —
  the jump mechanism must be in-page scroll-anchoring, not route
  navigation.
- Free scrolling must always work as a complete substitute for nav clicks
  — nav is a shortcut, never a requirement (Project UX explicit UX
  Constraint).
- The mobile overlay must be dismissible without forcing a section
  selection (Project UX explicit UX Constraint).
- Must work across the full device range — the desktop/mobile
  presentation split is itself a constraint, not a later choice.
- Inherited from project level: solo effort, no fixed deadline.

## Known Dependencies

- **`hero-presentation`**, **`about-narrative`**, **`email-contact`** —
  nav needs a stable anchor point in each view to jump to; doesn't own
  their content.
- **`social-links`** — excluded from nav per this Feature's own
  Definition; the Project UX / catalog conflict flagged there still
  stands, unresolved.
- **`content-localization`** — nav destination labels must resolve into
  the visitor's active language.
- **`motion-interaction`** — cross-cutting motion applied to nav elements.
- **Project Architecture's App Shell** — composes the three sections and
  hosts the language-override control, but does not explicitly name a nav
  component in System Structure; likely host, not confirmed — a gap for
  Feature Solution/Technical Design to resolve, not this phase.

---

*Created: 2026-08-31*
