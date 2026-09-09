# Implementation Report: Javi Morala

## Progress Summary

Phase 0 (Project Foundations, T-001–T-004) and Phase 1 (Feature
Foundation: Localization, T-005–T-008) are both complete, unchanged from
the prior report — Phase 0 merged into `main`; Phase 1 lives on branch
`worktree-t005-override-store`, pushed to origin, not yet merged into
`main`.

**Phase 2 (Hero Presentation + Section Navigation, T-009–T-012) is now
individually complete at the task level — 12 of 32 catalog tasks — but
split across two independent, non-stacked branches, neither merged.**
`worktree-t009-hero-composition` (T-009, T-010) and
`worktree-t011-section-navigation` (T-011, T-012) both branch from
Phase 1's own `dc0ce4e`; neither contains the other's work.
`content-localization`'s and `language-override`'s Phase 1 mechanisms are
now exercised against real (not merely structural-placeholder) content
for the first time — Hero's headline/tagline/scroll-cue and Section
Navigation's wordmark/nav-labels, in English, Spanish, and Euskera.
`hero-presentation`'s own Commitment 5 (Presence Links inclusion) remains
pending Phase 5's T-018, so the Feature itself isn't fully technically
complete even though both of its Phase 2 tasks are.
`section-navigation` is fully technically complete — T-011 + T-012 cover
all 7 of its Contract Commitments.

**Observation:** Milestone M2 ("Hero & Navigation Live... render real
content... with the language switcher functional from its nav slot") is
met at the *per-task* level but not yet at the *single, integrated*
level: the T-011/T-012 branch's Introduction Domain Section still shows
Phase 1's scaffold placeholder (`<h1>Javi Morala</h1>` +
`IntegrationCheck`), not Hero's real composition, since it doesn't
contain T-009/T-010's work; conversely the T-009/T-010 branch has no
Section Navigation at all. Recorded here for reconciliation, not a
defect in either task pair's own completed work — the same class of gap
the prior report flagged for Phase 1's M1.

## Feature Realization

| Feature | Technically Complete? | Realization Status |
| --- | --- | --- |
| content-localization | Yes (T-006, T-007 done; T-029 real-content exercise still pending) | Provisional — mechanism now exercised against some real content (Hero's and Section Navigation's own copy, Phase 2) alongside structural placeholders elsewhere (about-narrative, direct-contact, presence-links not yet authored); full real-content coverage still deferred to those Features' own later phases |
| language-override | Yes (T-005, T-008 done; both Feature Contract `realizesCommitments` fully covered) | No longer Blocked — T-012 now hosts the Language Switcher in both nav forms (desktop bar and mobile overlay), on `worktree-t011-section-navigation`, not yet merged. Realized on that branch, pending merge into a shared integration. Still carries the pre-existing Implementation Placeholder (`"EN"`/`"ES"`/`"EU"` labels standing in for `ux.md`/`ui.md`'s own Pending exact-copy items) |
| hero-presentation | Partial — T-009, T-010 done (Commitments 1-4); Commitment 5 (Presence Links inclusion) is T-018, Phase 5, not started | Provisional — real, Confirmed English headline/tagline/scroll-cue copy; Spanish/Euskera copy is AI-drafted (Provisional Product Value, pending native-speaker review, per the Implementation Plan's own Phase 2 assignment of translation authoring to this phase); ornamental-mark asset is an Implementation Placeholder (CSS-gradient stand-in for the out-of-scope shared SVG asset); device-class responsive treatment (T-010) real and verified |
| section-navigation | Yes — T-011, T-012 done, all 7 Contract Commitments covered | Realized — real, functional desktop bar and mobile toggle/overlay, verified end-to-end (links, active-section tracking, logomark, language-control hosting) via headless-browser interaction, on `worktree-t011-section-navigation`, not yet merged. Two Implementation Placeholders remain: the compact-logomark icon and hamburger/close glyphs stand in for out-of-scope shared visual assets; the Active Screen Indicator's final visual anatomy (colour/underline/weight) remains Pending per the Feature's own UX/UI Definition (Implementation Plan Readiness Issue 1) — the state-tracking mechanism itself is fully delivered regardless, per the Task Catalog's own readiness note |
| about-narrative | Pending (no task started) | — |
| direct-contact | Pending (no task started) | — |
| presence-links | Pending (no task started) | — |
| motion-interaction | Pending (no task started) | — |
| accessibility | Pending (no task started) | — |

## Completed Work

- **T-001 — Scaffold Project Initialization.** Astro + React + Sass +
  Framer Motion + Radix UI (headless, `radix-ui` package) + Vitest wired
  in; hand-authored global browser-default reset (not
  `@radix-ui/themes`, which doesn't cascade document-wide). Commit
  `aa5e600`.
- **T-002 — Styling System Foundation.** Sass token/mixin partials
  (colour, typography, spacing, breakpoints, motion, interaction mixins
  incl. focus-ring); fixed the previously-Pending focus-ring/gradient/
  accent colour values, verified by an automated WCAG contrast-ratio
  Vitest suite (4 tests, all passing). Commit `041326d`.
- **T-003 — Content Layer Schema.** Three locale-keyed Astro content
  collections (introduction, personalNarrative, connection),
  structure-only per-locale schema; placeholder en/es/eu entries
  validated (and a deliberate invalid-entry case confirmed the schema
  rejects bad data, then reverted). Commit `1c8aa63`.
- **T-004 — Root Layout Composition.** Three Domain Section placeholders
  (introduction/personal-narrative/connection) composed in fixed order
  via a new `RootLayout.astro`; T-002's theme tokens applied to `body`;
  T-001's `BaseLayout.astro` left untouched. Commit `71b1d73`.
- **T-005 — Override Store.** Tri-state (unset/en/es/eu), synchronously-
  readable, durable client-side store (`localStorage`-backed); no
  clear/reset operation exists anywhere in the module interface
  (Commitment 5); write path exposed only as an explicit function, never
  invoked as a read-time side effect (Commitment 3); degrades silently
  (no throw) when storage is unavailable. 6 Vitest tests. Commit
  `238579b`.
- **T-006 — i18n/Routing Layer Core.** Locale detection
  (`detectBrowserLocale`), pure resolution-priority logic
  (`resolveActiveLocale`: override > detected-supported > English), the
  `/en/`, `/es/`, `/eu/` static routes (via `getStaticPaths()`) each
  resolving `html lang` and meta description from the Content Layer, and
  the root (`/`) rewritten as a content-free bootstrap that reads the
  Override Store, detects the browser locale, and redirects before
  anything paints, with a `<noscript>` meta-refresh fallback to `/en/`.
  `BaseLayout`/`RootLayout` extended to accept `lang`/`description` props
  (previously hardcoded to English). 8 Vitest tests; build produces
  exactly the 4 expected routes; live dev-server fetch confirmed correct
  `html lang`/meta description per route and the root's content-free
  bootstrap/noscript markup. Commit `81ec80d`.
- **T-007 — Cross-Locale Content-Coverage Build Check.**
  `findCoverageGaps()` compares field-key sets across en/es/eu for each
  domain collection, reading the Content Layer's raw JSON directly (not
  `astro:content`, which isn't reachable from a plain Vitest process
  outside `astro build`/`dev` — an established limitation from T-003).
  4 Vitest tests (3 synthetic pass/fail cases + 1 running against real
  content); additionally verified live end-to-end by deliberately
  introducing a real coverage gap in `introduction.json`, confirming the
  check failed with the correct locale/key identified, then reverting.
  Commit `23f3f0f`.
- **T-008 — Language Switcher Component.** Hydrated dropdown built on
  Radix `DropdownMenu` (Accessible Primitives Layer): selecting a
  different language writes the Override Store then lets the anchor's
  default click complete navigation (Commitment 1); reselecting the
  active language calls `preventDefault()` and skips the write
  (Commitment 2); the matching item is bold-weighted from the current
  override on render (contributes to Commitment 4). Deliberately
  unplaced — no page composes it (hosting is T-012's job). Added `jsdom`
  + `@testing-library/react`/`user-event` as dev dependencies (none
  existed previously) to genuinely exercise Radix's pointer-driven
  open/select interactions under Vitest, since static HTML inspection
  can't verify click/no-op behavior. 4 interaction tests; additionally
  verified with a temporary live mount into a real locale route via the
  dev server (SSR markup, ARIA attributes, CSS module class all
  confirmed), then reverted. Commit `9c29130`.
- **T-009 — Hero Composition: Elements & Content.** Static Astro
  component (no client hydration) rendering headline/tagline,
  ornamental-mark placeholder, and scroll cue as one unconditional
  composition — never sequenced at runtime, so completeness (Commitment
  1) is structurally guaranteed regardless of asset weight. Content
  consumed as props already resolved by the i18n/Routing Layer's
  per-locale route, never re-read from the Content Layer or re-resolved
  (Commitment 2). Scroll cue is plain, non-focusable markup — no
  button/link/tabindex — since activation must have no effect
  (Commitment 3). Authored real English, Spanish, and Euskera
  headline/tagline/scroll-cue content in the Content Layer, per the
  Implementation Plan's own Phase 2 assignment of translation authoring
  to this phase. Replaced T-006's scaffold placeholder in the
  Introduction slot. Commit `a4d6113`, branch
  `worktree-t009-hero-composition`.
- **T-010 — Hero Responsive Treatment.** Device-class-specific layout
  within the same shared markup — CSS Grid `grid-template-areas` swapped
  via the existing `desktop-up` breakpoint mixin (Technical Design's
  single-template Design Decision), not two separate template paths.
  Mobile: dominant headline word rotated 90° and anchored left, mark
  cropped/bled off the top-right edge, scroll cue full-width at the
  bottom. Desktop/tablet: asymmetric lower-left/lower-right headline
  spread, mark centered near the top, scroll cue in the bottom-right
  corner. Neither treatment is a scaled/wrapped copy of the other.
  Verified by building and visually inspecting the built site at
  390px/800px/1440px viewports via headless Chromium. Commit `e6896c5`,
  branch `worktree-t009-hero-composition`.
- **T-011 — Section Navigation: Core Bar & Active-Section State.**
  Desktop nav bar (wordmark, "about"/"contact" anchors, conditionally
  rendered compact logomark) hydrated at Root Layout level, outside all
  three Domain Sections (Commitments 1-4). A single hydrated island
  tracks which Domain Section is active via IntersectionObserver
  (Commitment 5), driving both the Active Screen Indicator and the
  compact-logomark condition from one shared state. Static
  pre-hydration baseline: wordmark/links work via native anchor
  navigation before hydration completes. A real defect was found and
  fixed during manual verification — a viewport-centre scroll-spy
  heuristic could hand initial-load activation to Personal Narrative
  whenever Introduction's content is shorter than the trigger band,
  breaking Commitment 5 AC1 regardless of actual scroll position;
  replaced with a top-crossing band plus an earliest-wins tie-break over
  a running intersecting-set, covered by a regression test. Authored
  real English, Spanish, and Euskera nav-label/wordmark content. Commit
  `85449e3`, branch `worktree-t011-section-navigation`.
- **T-012 — Section Navigation: Mobile Overlay & Language-Control
  Hosting.** Mobile toggle/full-screen overlay built on Radix UI
  `Dialog` (Accessible Primitives Layer) — its modal focus-trap and
  backdrop satisfy Commitment 6 AC4 (underlying page not interactable
  while open) without custom focus-management code; each overlay link
  wrapped in `Dialog.Close` (`asChild`) so activating it both closes the
  overlay and lets the anchor's own navigation proceed (AC2); the
  separate close control only closes, with no navigation side effect
  (AC3). Hosts the Language Switcher (T-008) in both the desktop bar and
  the mobile overlay (Commitment 7), without altering its own
  switching/detection/persistence behavior. A real desktop-layout
  defect was found and fixed during verification — adding the language
  control as a third flex sibling had pushed "about"/"contact" to the
  bar's centre instead of grouping them at the right edge next to it,
  contradicting `ui.md`; restructured into a wordmark-left /
  (links + language-control)-right two-group layout. Commit `3d62f0f`,
  branch `worktree-t011-section-navigation`.

## Pending Work

- T-013–T-032 (20 tasks) — not started.
- hero-presentation's Commitment 5 (Presence Links as a minor/secondary
  Hero element) — owned by T-018 (Phase 5), which itself depends on
  T-017 (Presence Link Group Component, not started).
- **Reconciling the two independent Phase 2 branches** (and Phase 1's
  own still-unmerged branch) into a single integrated state — required
  before M2 is met end-to-end, not merely per-task. Not a fast-forward
  merge; see Known Issues for the specific files that will conflict.
- T-011's Active Screen Indicator visual anatomy remains Pending, still
  gating T-021/T-022 per the Implementation Plan's own Readiness
  Issues — unaffected by, and unresolved by, Phase 2's completion.
- Native-speaker review of Hero's and Section Navigation's AI-drafted
  Spanish/Euskera copy — recommended before launch, not a blocker to
  Phase 2's own completion (translation authoring was this phase's own
  confirmed scope per the Implementation Plan).

## Generated Artifacts

- **Config:** `package.json`, `package-lock.json` (T-008 added `jsdom`,
  `@testing-library/react`, `@testing-library/user-event` as dev
  dependencies), `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`,
  `src/content.config.ts`
- **Layouts:** `src/layouts/BaseLayout.astro`,
  `src/layouts/RootLayout.astro` (T-006 added `lang`/`description`
  props; T-011/T-012 — on `worktree-t011-section-navigation` only —
  compose `SectionNav` and add `scroll-margin-top` for both fixed bars)
- **Pages:** `src/pages/index.astro` (T-006 rewrote as the content-free
  root bootstrap), `src/pages/[locale]/index.astro` (T-006, new —
  per-locale static route; independently extended on both Phase 2
  branches — T-009 wires in `HeroComposition`, T-011/T-012 resolves nav
  content and passes the new `RootLayout` props — **not unified**)
- **Components:** `src/components/IntegrationCheck.tsx` (still present
  in the Introduction slot on `worktree-t011-section-navigation`, since
  T-009's replacement of it lives only on the other Phase 2 branch)
- **Feature modules:**
  `src/features/language-override/overrideStore.ts` (T-005),
  `src/features/language-override/LanguageSwitcher.tsx` (T-008),
  `src/features/language-override/LanguageSwitcher.module.scss` (T-008),
  `src/features/content-localization/localeResolution.ts` (T-006),
  `src/features/content-localization/crossLocaleCoverage.ts` (T-007),
  `src/features/hero-presentation/HeroComposition.astro` (T-009, T-010 —
  branch `worktree-t009-hero-composition`),
  `src/features/section-navigation/SectionNav.tsx`,
  `src/features/section-navigation/SectionNav.module.scss` (T-011,
  T-012 — branch `worktree-t011-section-navigation`)
- **Styles:** `src/styles/_reset.scss`, `src/styles/global.scss`,
  `src/styles/tokens/{_colors,_typography,_spacing,_breakpoints,_motion,_index}.scss`,
  `src/styles/mixins/{_fluid,_breakpoints,_interaction,_index}.scss`
- **Content data:** `src/content/introduction.json` — extended
  independently on both Phase 2 branches with *different* new keys
  (`headlinePrimary`/`headlineSecondaryLine1`/`headlineSecondaryLine2`/
  `scrollCue` on `worktree-t009-hero-composition`; `wordmark` on
  `worktree-t011-section-navigation`); `src/content/personal-narrative.json`,
  `src/content/connection.json` — extended with `navLabel`
  (`worktree-t011-section-navigation` only)
- **Tests:** `src/scaffold.test.ts`,
  `src/styles/tokens/{contrast.ts,colors.contrast.test.ts}`,
  `src/features/language-override/overrideStore.test.ts` (T-005),
  `src/features/language-override/LanguageSwitcher.test.tsx` (T-008),
  `src/features/content-localization/localeResolution.test.ts` (T-006),
  `src/features/content-localization/crossLocaleCoverage.test.ts`
  (T-007), `src/features/section-navigation/SectionNav.test.tsx` (T-011,
  T-012 — 11 tests, branch `worktree-t011-section-navigation`)

## Implementation Decisions

- Dropped `@radix-ui/themes` (not part of the approved headless-only
  Technology Selection; its `.rt-reset` class is a per-element opt-in,
  not a document-wide cascade) — hand-authored an equivalent global
  reset instead.
- Base colours (`#221e24`, `#ebeaec`) reused from values already
  Observed/Confirmed in approved Feature UI Definitions
  (section-navigation, direct-contact, language-override), not
  reinvented.
- Fixed the gradient/accent/focus-ring values via explicit WCAG
  luminance-contrast computation, verified by an automated test — per
  the Implementation Plan's own Phase 0 authorization to fix these as a
  non-blocking implementation detail.
- Fredoka chosen as the "rounded, geometric... warm, current"
  sans-serif; 768px chosen as the one mobile/desktop breakpoint; fluid
  `clamp()` scaling anchored to Project UX's own cited Figma reference
  frames (390px/1728px) — all as Implementation Details, not new
  product decisions.
- T-003's schema leaves per-locale field names open
  (`z.record(string,string)`) rather than pre-inventing each Feature's
  content fields, which the Plan reserves for each Feature's own later
  phase.
- T-004 kept `BaseLayout.astro` untouched at the time; `RootLayout.astro`
  reaches `body` via `:global()` from its own scoped style; the three
  placeholder sections carry no `aria-label` yet, deliberately, so as
  not to preempt each Domain Feature's own localized accessible-naming
  work.
- Override Store persisted via `localStorage` directly (Technical Design
  left the exact storage API open); storage access wrapped so a
  blocked/unavailable store degrades silently rather than throwing.
- i18n/Routing Layer's three locale routes implemented as one dynamic
  Astro route (`src/pages/[locale]/index.astro` + `getStaticPaths()`)
  rather than three duplicated files — an equivalent implementation
  mechanism with no externally meaningful consequence.
- Root bootstrap's redirect uses `window.location.replace()` (not
  `href=`/`assign()`) so the content-free root never enters browser
  history — a Local coding decision with no product-visible effect.
- Cross-locale coverage check reads the Content Layer's raw JSON files
  directly rather than via `astro:content`, continuing T-003's own
  documented Vitest/content-layer limitation.
- Meta description for each locale route reuses T-003's existing
  placeholder value (`"TODO"`) rather than inventing new SEO copy —
  actual copy authoring is explicitly out of scope per
  `content-localization/ux.md` ("authoring the actual values is each
  surface-owning Feature's concern").
- Language Switcher's display labels use plain locale codes
  (`"EN"`/`"ES"`/`"EU"`) as an explicit Implementation Placeholder, since
  `language-override/ux.md` and `ui.md` leave the exact display copy
  Pending — chosen to avoid inventing final product copy while still
  fully demonstrating the functional mechanism.
- Language Switcher's active-indicator reads the Override Store directly
  (matching Technical Design's literal wording and T-008's own
  acceptance criterion "matching the current override"), rather than
  also considering the page's merely-*detected* (non-overridden) locale
  — the latter would require a reverse dependency on
  `content-localization`, which that Feature's own Technical Design
  forbids.
- Added `jsdom` + `@testing-library/react`/`user-event` as dev
  dependencies — the project's only prior test tool (Vitest, environment
  `node`) had no way to exercise real click/pointer interaction; scoped
  to the one test file that needs it via a per-file `@vitest-environment
  jsdom` pragma, leaving all other tests on the faster default
  environment.
- Hero Composition (T-009) built as a purely static Astro component, no
  client island, per Technical Design's explicit constraint that none of
  Commitments 1-3 need runtime state.
- Hero's and Section Navigation's Spanish/Euskera copy authored directly
  (AI-drafted) rather than left as structural placeholders, per the
  Implementation Plan's own Phase 2 assignment of translation authoring
  to this phase — flagged as a Provisional Product Value pending native
  review, not an invented product decision.
- Device-class layout (T-010) realized as one shared markup with CSS
  Grid areas swapped via the existing breakpoint mixin — no separate
  template paths, per Technical Design's Design Decision.
- Resolved an apparent tension between Commitment 3 ("logomark always
  links home, including partway through Introduction") and Commitment 4
  ("compact logomark icon absent while Introduction is active") by
  treating the always-present wordmark as a second, ever-present
  home-link alongside the conditionally-shown icon — an Implementation
  Detail resolving the mechanism, not a new product decision.
- Active-section tracking (T-011) implemented via a top-crossing
  IntersectionObserver band plus an earliest-wins tie-break over a
  running intersecting-set, chosen after a centre-line heuristic was
  found, during manual verification, not to structurally guarantee
  Commitment 5 AC1 when Introduction's content is shorter than its
  neighbour.
- Section Navigation's own content (wordmark, nav-label translations)
  placed within the existing per-domain Content Layer collections
  (wordmark → introduction; "about" → personal-narrative; "contact" →
  connection), since the approved Content Layer schema has no dedicated
  cross-cutting/global collection — a content-placement decision, not a
  schema change.
- Mobile toggle/overlay (T-012) built on Radix UI's `Dialog` primitive
  per Technical Design's explicit Accessible-Primitives-Layer
  constraint.
- Fixed a real desktop-layout defect found in manual verification: the
  Language Switcher, added as a third flex child, broke
  `justify-content: space-between`'s intended grouping — restructured
  into a wordmark-left / (links + language-control)-right two-group
  layout.
- `scroll-margin-top` added for both the desktop and mobile fixed nav
  bars so anchor-link jumps land clear of them — a necessary consequence
  of introducing fixed positioning, not a scope expansion.

## Known Issues

- **Phase 2's two task pairs live on two independent branches that
  don't contain each other's work.** `worktree-t009-hero-composition`
  (T-009, T-010) and `worktree-t011-section-navigation` (T-011, T-012)
  both branch from Phase 1's own `dc0ce4e`; neither is merged into the
  other or into `main`. Concretely: the T-011/T-012 branch's
  Introduction Domain Section still shows Phase 1's scaffold placeholder
  (`<h1>Javi Morala</h1>` + `IntegrationCheck`), not Hero's real
  composition; the T-009/T-010 branch has no Section Navigation at all.
  **M2 ("Hero & Navigation Live") is not yet met as a single, integrated
  experience** — each half is independently complete and verified, but
  they have not been composed together. A merge/integration step is
  required, and it will not be a fast-forward: both branches
  independently modified `src/content/introduction.json` (different new
  keys — `headlinePrimary`/`headlineSecondaryLine1`/
  `headlineSecondaryLine2`/`scrollCue` on one side, `wordmark` on the
  other) and `src/pages/[locale]/index.astro` (Hero composition wiring
  on one side, Section Navigation content resolution + `RootLayout`
  props on the other) — both will need manual conflict resolution.
- Carried forward: several other unmerged worktree branches in this
  repository claim overlapping/related task work (a longer list now per
  `git branch -a`, including e.g. `worktree-t008-hero-composition`,
  `worktree-section-navigation-feature`,
  `worktree-hero-presentation-feature-dev`) — none inspected or
  reconciled here, consistent with the prior report's explicit-decision
  framing to work fresh from `main`/the Task Catalog's own dependency
  graph rather than reconcile every stray branch.
- hero-presentation's Commitment 5 (Presence Links as a minor/secondary
  Hero element) is not yet realized — owned by T-018 (Phase 5), which
  itself depends on T-017 (Presence Link Group Component, not started).
  Expected per the Task Catalog, not a Phase 2 defect.
- Hero's and Section Navigation's Spanish and Euskera copy
  (headline/tagline/scroll-cue; "about"/"contact" nav labels) is
  AI-drafted, not reviewed by a native speaker — flagged as a
  Provisional Product Value in both tasks' own execution; recommended
  before launch, not before Phase 2 is considered done per the
  Implementation Plan's own framing (translation authoring was this
  phase's own confirmed scope).
- T-011's Active Screen Indicator visual anatomy (colour/underline/
  weight) remains Pending in `section-navigation/ux.md`/`ui.md`
  (Implementation Plan Readiness Issue 1) — still gates
  `motion-interaction`'s T-021/T-022 in Phase 6. Unaffected by, and
  unresolved by, Phase 2's completion; the state-tracking mechanism
  itself (Commitment 5) is fully delivered regardless, per the Task
  Catalog's own readiness note on T-011.
- Carried forward: language-override's two Pending copy items
  (`ux.md`/`ui.md` — exact display labels; closed-trigger displayed
  value) remain open, still stood in for with the same Implementation
  Placeholder (`"EN"`/`"ES"`/`"EU"`) from T-008.
- Carried forward: `@fontsource-variable/fredoka` is installed but its
  `@font-face` CSS is not yet imported anywhere — the `font-family`
  token falls back to `system-ui` until whichever task first renders
  real text wires it in. Unaffected by Phase 2 (Hero/Nav text renders,
  just not in the intended webfont yet).
- The compact-logomark icon (Section Navigation) and the ornamental-mark
  placeholder (Hero) are both stand-in CSS-gradient shapes for the same
  shared, project-wide SVG asset, which remains out of both Features'
  own scope to design — an explicit Implementation Placeholder in both
  tasks, not a gap either task itself needed to close.
- T-002's accent/focus-ring colour is verified against near-black and
  the gradient's darkest stop only; full verification "against every
  background it appears on" across the fully composed UI is explicitly
  deferred to T-028 per the Implementation Plan's own phasing —
  expected, not a gap in T-002 itself.

## Execution Evidence

- `npm run build` (astro build) passing after each of T-001–T-008;
  produces exactly `/`, `/en/`, `/es/`, `/eu/` since T-006.
- `npm run test` (Vitest) — 26/26 passing through T-008: 1 scaffold
  smoke test, 4 WCAG contrast-ratio assertions (T-002), 6 Override Store
  tests (T-005), 8 locale-resolution tests (T-006), 4
  cross-locale-coverage tests (T-007, including 1 running against real
  content), 4 Language Switcher interaction tests (T-008, `jsdom`
  environment).
- Live `astro dev` HTTP fetches confirming: rendered output matches
  build output for T-001/T-004 (section order, theme CSS values); the
  root's content-free bootstrap script/noscript markup and correct
  `html lang`/meta description per locale route (T-006); the Language
  Switcher's SSR markup, ARIA attributes, and CSS module class on all
  three locale routes (T-008, mounted temporarily then reverted).
- Direct HTML inspection of build output: reset CSS present, theme CSS
  values (`#221e24`/`#ebeaec`/Fredoka/500) present on `body`, sections in
  exact order `introduction`/`personal-narrative`/`connection`.
- Deliberate negative-case test for T-003: an invalid (non-string) entry
  caused `astro build` to fail with a precise Zod validation error
  naming collection/locale/field; reverted afterward.
- Deliberate negative-case test for T-007: a real coverage gap
  temporarily introduced in `introduction.json` caused the coverage test
  to fail with the exact locale(s)/key(s) named; reverted afterward,
  confirmed clean via `git diff`.
- **`worktree-t009-hero-composition`** (HEAD `e6896c5`): `npm run test`
  26/26 passing; `astro build` producing the 4 expected routes; built
  HTML inspected directly for all three locales, confirming Commitment 1
  (all three composition elements present unconditionally) and
  Commitment 2 (each locale's own resolved text, no override); real
  headless-Chromium screenshots at 390px, 800px, and 1440px viewports
  confirming Commitment 4's distinct, non-reflowed device-class
  treatments.
- **`worktree-t011-section-navigation`** (HEAD `3d62f0f`): `npm run
  test` 37/37 passing (11 SectionNav-specific tests, including a
  regression test for the scroll-spy defect found and fixed during
  verification); `astro build` producing the 4 expected routes; real
  headless-Chromium sessions driving: a full scroll sequence confirming
  Commitment 5's active-section tracking (AC1-AC4) and Commitment 4's
  conditional compact-logomark presence; a logomark click from
  Connection confirming Commitment 3 (`scrollY: 0` after); a full mobile
  toggle → open → link-click/close cycle confirming Commitment 6
  (AC1-AC4, including an `elementFromPoint` hit-test proving the
  underlying page is genuinely uninteractable while the overlay is
  open); the desktop bar's corrected right-hand-group layout confirmed
  visually after the fix.
- Commits: `aa5e600` (T-001), `041326d` (T-002), `1c8aa63` (T-003),
  `71b1d73` (T-004) — merged into `main`/`origin/main`. `238579b`
  (T-005), `81ec80d` (T-006), `23f3f0f` (T-007), `9c29130` (T-008) — all
  on `worktree-t005-override-store`, pushed to
  `origin/worktree-t005-override-store`; working tree clean, `npm run
  test` green at HEAD (`9c29130`). `a4d6113` (T-009), `e6896c5` (T-010)
  — on `worktree-t009-hero-composition`, pushed to
  `origin/worktree-t009-hero-composition`; working tree clean at HEAD.
  `85449e3` (T-011), `3d62f0f` (T-012) — on
  `worktree-t011-section-navigation`, pushed to
  `origin/worktree-t011-section-navigation`; working tree clean at HEAD.

---

*Created: 2026-09-09*
