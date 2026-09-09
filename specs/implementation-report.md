# Implementation Report: Javi Morala

## Progress Summary

Phase 0 (Project Foundations, T-001–T-004) and Phase 1 (Feature
Foundation: Localization, T-005–T-008) are both complete — 8 of 32
catalog tasks. Phase 0 (T-001–T-004) is merged into `main`
(`origin/main`, through commit `ae00eef`). Phase 1 (T-005–T-008) lives on
branch `worktree-t005-override-store`, pushed to origin, **not yet merged
into `main`**. content-localization's two implementation tasks (T-006,
T-007) and language-override's two implementation tasks (T-005, T-008)
are done, covering every Contract Commitment either Feature owns at the
mechanism level. Phase 2 (Hero Presentation + Section Navigation,
T-009–T-012) is now unblocked per the Task Catalog's dependency graph but
not started.

## Feature Realization

| Feature | Technically Complete? | Realization Status |
| --- | --- | --- |
| content-localization | Yes (T-006, T-007 done; T-029 real-content exercise still pending) | Provisional — mechanism fully built and tested against structural placeholder content (`"TODO"`); real per-locale copy is explicitly deferred to each content-owning Feature's own later phase (Confirmed, Implementation Plan Readiness Issue 2) |
| language-override | Yes (T-005, T-008 done; both Feature Contract `realizesCommitments` fully covered) | Blocked on a Missing Realization Dependency — the Language Switcher is built and unit/interaction-tested but deliberately unplaced; no page composes it, so no real visitor can reach or see it yet. Owning task: T-012 (Section Navigation — Mobile Overlay & Language-Control Hosting, Phase 2, not started). Secondarily, its display labels (`"EN"`/`"ES"`/`"EU"`) are an Implementation Placeholder standing in for `ux.md`/`ui.md`'s own Pending "exact display strings" and "closed-trigger displayed value" items |
| hero-presentation | Pending (no task started) | — |
| section-navigation | Pending (no task started) | — |
| about-narrative | Pending (no task started) | — |
| direct-contact | Pending (no task started) | — |
| presence-links | Pending (no task started) | — |
| motion-interaction | Pending (no task started) | — |
| accessibility | Pending (no task started) | — |

**Observation:** the Implementation Plan's own Milestone M1
("Localization Operational... the manual override persists across
visits") is met at the *mechanism* level (override read/write, routes,
redirect all independently verified) but not yet at the *end-to-end
visitor* level, since there is currently no reachable control anywhere on
the site for a visitor to invoke an override at all — that requires
T-012. Recorded here for reconciliation, not a defect in Phase 1's own
completed tasks.

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

## Pending Work

- T-009–T-032 (24 tasks) — not started. Phase 2 (Hero Presentation +
  Section Navigation: T-009 Hero Elements & Content, T-010 Hero
  Responsive Treatment, T-011 Section Navigation Core, T-012 Section
  Navigation Mobile Overlay & Language-Control Hosting) is now Ready per
  dependencies.
- T-011's Active Screen Indicator visual anatomy remains Pending, gating
  T-021/T-022 per the Implementation Plan's own Readiness Issues —
  unaffected by, and unresolved by, Phase 1's completion.
- language-override's Missing Realization Dependency (switcher unplaced)
  resolves once T-012 is executed — not a Phase 1 defect, expected per
  the Task Catalog's own "unplaced (hosting comes at T-012)" framing.

## Generated Artifacts

- **Config:** `package.json`, `package-lock.json` (T-008 added `jsdom`,
  `@testing-library/react`, `@testing-library/user-event` as dev
  dependencies), `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`,
  `src/content.config.ts`
- **Layouts:** `src/layouts/BaseLayout.astro`,
  `src/layouts/RootLayout.astro` (T-006 added `lang`/`description` props)
- **Pages:** `src/pages/index.astro` (T-006 rewrote as the content-free
  root bootstrap), `src/pages/[locale]/index.astro` (T-006, new —
  per-locale static route)
- **Components:** `src/components/IntegrationCheck.tsx`
- **Feature modules:**
  `src/features/language-override/overrideStore.ts` (T-005),
  `src/features/language-override/LanguageSwitcher.tsx` (T-008),
  `src/features/language-override/LanguageSwitcher.module.scss` (T-008),
  `src/features/content-localization/localeResolution.ts` (T-006),
  `src/features/content-localization/crossLocaleCoverage.ts` (T-007)
- **Styles:** `src/styles/_reset.scss`, `src/styles/global.scss`,
  `src/styles/tokens/{_colors,_typography,_spacing,_breakpoints,_motion,_index}.scss`,
  `src/styles/mixins/{_fluid,_breakpoints,_interaction,_index}.scss`
- **Content data:** `src/content/{introduction,personal-narrative,connection}.json`
- **Tests:** `src/scaffold.test.ts`,
  `src/styles/tokens/{contrast.ts,colors.contrast.test.ts}`,
  `src/features/language-override/overrideStore.test.ts` (T-005),
  `src/features/language-override/LanguageSwitcher.test.tsx` (T-008),
  `src/features/content-localization/localeResolution.test.ts` (T-006),
  `src/features/content-localization/crossLocaleCoverage.test.ts` (T-007)

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

## Known Issues

- **Correction to a prior report entry:** the previous version of this
  report stated "`main` still contains zero implementation artifacts."
  This is stale — `git log origin/main` confirms T-001–T-004 (commits
  `aa5e600`, `041326d`, `1c8aa63`, `71b1d73`) plus the prior
  Implementation Report update (`ae00eef`) are merged into `main`. Only
  Phase 1's work (T-005–T-008) remains unmerged, on
  `worktree-t005-override-store`.
- Several other unmerged worktree branches in this same repository claim
  overlapping/related task work — `worktree-t001-scaffold-init`,
  `worktree-t006-root-bootstrap-redirect`,
  `worktree-t007-coverage-check-mechanism`,
  `worktree-implementation-report-t007`, `worktree-t008-hero-composition`
  — none inspected or reconciled in this report (an earlier explicit
  user decision in this session was to disregard them and work fresh
  from `main`). A merge/consolidation decision is needed before Phase 2
  work risks duplicating or conflicting with them.
- language-override's Missing Realization Dependency (see Feature
  Realization above) — expected per the Task Catalog, not a defect.
- Two Pending copy items remain open in `language-override/ux.md`/
  `ui.md` (exact display labels; closed-trigger displayed value) — not
  resolved here, stood in for with an Implementation Placeholder per
  T-008's own execution.
- Astro's `astro:content` module isn't reachable from a bare Vitest
  process (no content-layer sync outside `astro build`/`dev`); T-003's
  schema validation is verified via build success/failure instead of a
  unit test, and T-007's coverage check reads raw JSON directly instead
  — a testing-infrastructure limitation, not a defect.
- `@fontsource-variable/fredoka` is installed but its `@font-face` CSS
  is not yet imported anywhere — the `font-family` token falls back to
  `system-ui` until whichever task first renders real text wires it in.
- T-002's accent/focus-ring colour is verified against near-black and
  the gradient's darkest stop only; full verification "against every
  background it appears on" across the fully composed UI is explicitly
  deferred to T-028 per the Implementation Plan's own phasing —
  expected, not a gap in T-002 itself.

## Execution Evidence

- `npm run build` (astro build) passing after each of T-001–T-008;
  produces exactly `/`, `/en/`, `/es/`, `/eu/` since T-006.
- `npm run test` (Vitest) — 26/26 passing: 1 scaffold smoke test, 4 WCAG
  contrast-ratio assertions (T-002), 6 Override Store tests (T-005), 8
  locale-resolution tests (T-006), 4 cross-locale-coverage tests (T-007,
  including 1 running against real content), 4 Language Switcher
  interaction tests (T-008, `jsdom` environment).
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
- Commits: `aa5e600` (T-001), `041326d` (T-002), `1c8aa63` (T-003),
  `71b1d73` (T-004) — merged into `main`/`origin/main`. `238579b`
  (T-005), `81ec80d` (T-006), `23f3f0f` (T-007), `9c29130` (T-008) — all
  on `worktree-t005-override-store`, pushed to
  `origin/worktree-t005-override-store`; working tree clean, `npm run
  test` green at HEAD (`9c29130`).

---

*Created: 2026-09-09*
