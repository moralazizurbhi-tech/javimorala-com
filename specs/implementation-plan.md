# Implementation Plan: Javi Morala

## Strategy

Sequence execution by actual technical-dependency tier, derived from each Feature's
Technical Design and from Project Architecture's System Structure — not from the
Feature Catalog's Primary/Supporting/Cross-Cutting classification, which is a product
categorization and carries no build-order authority. Four phases: infrastructure first,
then the two shared layers every Feature depends on, then all remaining Features as one
flat, parallelizable set, then integration verification once they're composed together.

## Phases

### Phase 0 — Infrastructure Scaffold

**Derived infrastructure** — not a Feature; sourced directly from Project Architecture's
System Structure and Technology Decisions sections, which are its sufficient owning
artifact (App Shell, Content Data Layer, and Styling System are explicitly excluded from
Feature status in the Feature Catalog).

- Initialize the React + Vite project producing static output (**Confirmed dependency** —
  Project Architecture, Technology Decisions).
- Establish the Styling System's shared Sass/SCSS token/mixin partials (**Confirmed
  dependency** — Project Architecture, System Structure).
- Establish the Content Data Layer's locale-keyed content file structure, format left to
  Implementation (**Confirmed dependency** — Project Architecture: "specific file format
  left to implementation").
- Build the App Shell mounting empty Hero/About/Contact slots in fixed order, and hosting
  the language-override control per Architecture's own text (**Confirmed dependency** —
  Project Architecture, Component Relationships). Extending App Shell's composer role
  beyond this explicit Architecture text — to also host Section Nav and instantiate
  Social Link Group twice — is Feature-level composition work, not infrastructure; see
  Phase 2. An earlier draft of this Plan miscategorized that extension as Phase 0
  infrastructure, contradicting this Plan's own Readiness Issue 2.

### Phase 1 — Foundational Shared Layers

**Confirmed dependency**: both foundational layers depend only on Phase 0 outputs, and
on no other Feature-internal component — this corrects an earlier claim that
`content-localization` depends on the Animation Layer; `content-localization`'s own
Technical Design Dependencies section names only Content Data Layer and Language
Override Control, no Animation Layer.

- `motion-interaction` (Animation Layer: Motion Mode Resolver, Section/Page-level Motion
  Provider, Micro-Interaction Motion Provider) — depends on nothing Feature-internal.
- `content-localization` (Locale Layer: Locale Detection, Locale Fallback Resolution,
  Persisted Override State, Active Language Resolution, Override Signal Handling,
  Resolved Content Broadcast) — depends only on Phase 0's Content Data Layer.

**Planning decision**: no internal ordering is imposed between these two — both are
independent, parallelizable workstreams within Phase 1. An earlier draft of this Plan
sequenced them, unsupported by either Technical Design.

### Phase 2 — Remaining Features

**Confirmed dependency**: all six remaining Features depend only on Phase 0 + Phase 1
outputs, and on no other Feature's internals — verified pairwise in each Technical
Design's Cross-Component Relationships / explicit "no dependency" declarations:

- `hero-presentation` → Locale Layer, Animation Layer, Styling System.
- `about-narrative` → Locale Layer, Animation Layer, Styling System.
- `email-contact` → Locale Layer, Animation Layer, Styling System.
- `social-links` → Locale Layer, Animation Layer, Styling System (composed by App Shell,
  Phase 0).
- `section-navigation` → App Shell's fixed section mount points (Phase 0 — the section
  positions existing, not the other Features' internals or completion state), Locale
  Layer, Animation Layer, Styling System.
- `language-override` → content-localization's Locale Layer (override-signal interface),
  App Shell hosting (Phase 0).

`social-links`' and `section-navigation`'s composition into App Shell — extending its
composer role beyond Project Architecture's literal text, per those Features' own
Technical Designs — is realized within this phase, not Phase 0.

**Planning decision**: no build order is imposed among these six. Nothing in any
Technical Design justifies sequencing one ahead of another; the Feature Catalog's
Primary/Supporting/Cross-Cutting classification is deliberately not used as an ordering
signal. Any relative priority among them is a product/business choice outside this Plan's
authority to assume.

**Readiness issues affecting this phase** (see Readiness Issues section below — must be
resolved upstream before/during execution of the affected Features, not decided by this
Plan or invented during Implementation):
- `hero-presentation`, `about-narrative`, `social-links`, `email-contact`,
  `section-navigation` — detailed visual design gap.
- `section-navigation` and `social-links` — Persistent nav / social icons contradiction.

### Phase 3 — Integration Verification

**Planning decision** — not a Feature; a cross-cutting verification pass once Phase 2's
six Features are composed together, since seams between them (motion, locale,
navigation) only surface at composition time:
- Section-navigation's scroll-anchoring composed with motion-interaction's section-entry
  motion.
- Language-override's language switch composed with motion-interaction's content-swap
  transition and content-localization's atomic content broadcast.
- Reduced-motion equivalence holding across every consuming Feature simultaneously.
- Social Link Group's two live instantiations (Hero, Contact) presenting identically once
  composed by App Shell.

This Plan does not decompose Phase 3 into individual test cases or tasks — that belongs
to Task Catalog.

## Milestones

- **M0 — Scaffold Ready**: Phase 0 complete; project builds; App Shell renders empty
  Hero/About/Contact slots in fixed order.
- **M1 — Foundation Operational**: Phase 1 complete; Animation Layer and Locale Layer
  functioning end-to-end, demonstrable against placeholder content.
- **M2 — Features Delivered**: Phase 2 complete; all six remaining Features built against
  the Phase 0/1 substrate.
- **M3 — Integration Verified**: Phase 3 complete; the full eight-Feature composition
  checked together.

## Priorities

1. Phase 0 → Phase 1 → Phase 2 is a **Confirmed dependency** chain and is non-negotiable.
2. Phase 2's six Features carry equal technical priority — explicitly not sequenced by
   Feature Catalog classification (**Planning decision**).
3. The two Readiness Issues below should be resolved before or during Phase 2 execution
   for the Features they affect (**Planning decision**: this Plan flags them; it does not
   resolve them or authorize Implementation to invent the missing decisions).
4. Phase 3 is the final gate; it structurally requires Phase 2's Features to exist in
   composed form first (**Confirmed dependency**).

## Dependencies

**Confirmed dependency** (from Technical Designs and Project Architecture):
- `hero-presentation`, `about-narrative`, `email-contact`, `social-links` → Locale Layer +
  Animation Layer + Styling System.
- `section-navigation` → App Shell's fixed section mount points (Phase 0) + Locale Layer +
  Animation Layer + Styling System.
- `language-override` → content-localization's Locale Layer (override-signal interface) +
  App Shell hosting.
- `content-localization` → Content Data Layer.
- `motion-interaction` → none (Feature-internal); externally assumes an architectural
  capability (reduced-motion preference readable at load).
- No dependency, in either direction, among any pair of the six Phase 2 Features
  (confirmed pairwise, both directions, across all six Technical Designs).

**Derived infrastructure**:
- App Shell's composition role for Section Nav and Social Link Group (×2), beyond Project
  Architecture's literal System Structure text — established at Feature Technical Design
  level (`section-navigation`, `social-links`).

## Readiness Issues (Upstream Gaps)

These are not resolved by this Plan. They are surfaced here because they affect
readiness of specific Phase 2 work; Implementation must not invent these decisions
silently — resolution belongs to a `feature-ux` or `project-ux` refinement pass.

1. **Detailed visual design left Pending in five Feature UX Specifications.**
   `hero-presentation`, `about-narrative`, `social-links`, `email-contact`, and
   `section-navigation`'s Feature UX Specifications each explicitly leave exact layout,
   positioning, and/or mobile-treatment mechanism as "Pending, left to detailed visual
   design." No skill or artifact in this repo's planning framework currently owns a
   "detailed visual design" phase. Affects: the five Features named above, within Phase 2.
   Does not affect Phase 0, Phase 1, or the dependency graph itself — only the readiness
   of these Features' visual/compositional specifics at execution time.

2. **Unresolved contradiction: does the Persistent nav include social icons?**
   `project-ux.md`'s "Persistent nav" UI Component description includes social icons
   (Instagram, LinkedIn). `section-navigation`'s Definition, Context, Contract, Technical
   Design, and UX Specification all explicitly exclude social icons from nav's scope and
   flag this exact conflict as "not resolved here" at every phase. `social-links`'
   Technical Design separately has App Shell instantiate Social Link Group directly in the
   Hero and Contact views, not via nav. Affects: `section-navigation` and `social-links`'
   composition scope within Phase 2. Does not change either Feature's technical
   dependency structure — it is a composition-scope question, not a sequencing one.

## Excluded

Individual task definitions, functional requirements, technical redesign, resolution of
the two Readiness Issues above, source code, tests, configuration,
deployment/infrastructure.

---

*Created: 2026-09-01*
