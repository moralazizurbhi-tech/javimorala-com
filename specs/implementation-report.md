# Implementation Report: Javi Morala

## Progress Summary

Prior implementation activity (through T-005 and T-030, with its own
Implementation Report) was wiped by commit ea27f37 ("reset implementation");
this report's baseline was established fresh from that reset point,
starting at T-001.

9 of 30 Task Catalog tasks complete: T-001, T-002, T-030, T-003, T-004 (all
of Phase 0 — 5/5), T-005, T-006, T-007 (all of Phase 1 — 3/3), and T-008
(first task of Phase 2, Core Domain Features). Milestone M0 ("Foundations
Ready") remains reached. Milestone M1 ("Localization Operational") is now
reached as an integrated whole: the previous report's merge-ordering gap
(T-006 and T-007 each on their own unmerged branch, neither containing the
other's commit) is resolved — both commits (`2bb1550`, `33253fa`) are
confirmed ancestors of current `main` (`27e3639`, via `git merge-base
--is-ancestor`), merged via that commit. A single buildable ref now
demonstrates the root bootstrap and the coverage check together.

## Feature Realization

- hero-presentation — Technically complete (T-008). Realized for
  structure/localization-mechanism; Provisional overall — three Missing
  Realization Dependencies remain: (1) the ornamental mark's real visual
  asset (explicitly out of this Feature's scope per its own Technical
  Design); (2) Spanish/Euskera headline/tagline copy (T-025, not started);
  (3) the scroll cue's text has no Content Layer field to carry a
  translation — currently a Feature-owned static English string (see Known
  Issues).
- about-narrative — Not started
- direct-contact — Not started
- presence-links — Not started
- section-navigation — Not started
- language-override — Not started
- content-localization — Technically partial, Blocked overall.
  - Commitments 2, 3 (T-005): mechanism Realized (per-locale static
    routes, content/metadata resolution) — verified working for real via
    built HTML. Content fidelity itself is not yet Realized: /en/'s copy
    is Provisional (itself still placeholder pending final English
    wording, per Implementation Plan Readiness Issue 1); /es/ and /eu/'s
    copy is Blocked on a Missing Realization Dependency (T-025 — real
    Spanish/Euskera authoring; the current es/eu entries are
    English-language filler tagged "Pending," not translations).
  - Commitment 1 (T-006): AC2/AC3 (detected-locale, English-fallback)
    Realized and verified. AC1 (override honored) is Blocked on a Missing
    Realization Dependency — T-024, which wires the real Override Store;
    the root bootstrap's override read is currently a stub always
    returning "unset."
  - Commitment 4 (T-006): structurally Realized (content-free root,
    synchronous pre-paint script) to the extent verifiable outside a real
    browser; true first-paint/no-flash timing is not exercisable under
    this project's Vitest/Node test environment — flagged, not treated as
    a defect (same category as T-005's own alt-text limitation below).
  - Commitment 5 (T-007): mechanism Realized and verified against
    placeholder data. The Commitment's real-world guarantee (final
    EN/ES/EU content actually symmetric) remains Blocked on Missing
    Realization Dependencies T-025 (authoring) and T-029 (real
    enforcement run) — T-007's own Task Catalog entry declares "mechanism
    only." T-005's alt-text sub-criterion remains not yet exercisable —
    Hero Composition (T-008) does not introduce any `<img>`-based content
    (its ornamental mark is a CSS placeholder, not an image element); this
    will first become exercisable at T-009.
- motion-interaction — Not started
- accessibility — Not started

## Completed Work

- T-001 — Project Scaffold Initialization (infrastructure). Astro project
  initialized with React, Sass, Framer Motion, Radix UI, and Vitest;
  produces static build output. Both acceptance criteria met:
  - "Project builds to static assets; no server runtime introduced" —
    `npm run build` logged output: "static" / mode: "static"; 1 page
    built into `dist/`.
  - "React, Sass, Framer Motion, Radix UI, Vitest all present and
    importable" — verified via a ScaffoldCheck React island (using
    framer-motion's motion.div and radix-ui's Slot) rendered through a
    Sass-styled Astro page, plus a Vitest suite (2/2 passing) importing
    each library directly; `sass` required successfully in isolation.
- T-002 — Styling System Foundation. Sass token/mixin partials
  (typography, spacing, colour, breakpoints, interaction-state
  transitions), placeholder values per Project UX. Both acceptance
  criteria met: all five token/mixin categories present; no
  component-specific styling embedded (verified by inspection). Verified
  via a Sass-compileString Vitest test exercising every category.
- T-030 — Global Base & Reset Styles. Box-sizing/margin/padding
  normalization; body applies T-002's colour/typography tokens; default
  link/list/button chrome removed; outline/focus deliberately untouched
  (reserved for T-023). Verified via a Sass-compileString Vitest test
  asserting each behavior, including the *absence* of any outline rule.
- T-004 — Root Layout Composition. Three named Domain Section slots
  (introduction, personal-narrative, connection) in fixed order behind one
  HTML shell, `lang` prop threaded through, no client-side router.
  Verified via `@astrojs/compiler`'s AST parser (section order, single
  `<html>`, zero `<script>` tags) plus the real Astro pipeline (`astro
  check`: 10 files, 0 errors — stronger verification than the pre-reset
  attempt had available, since the build pipeline now works).
- T-003 — Content Layer Schema. Four locale-keyed collections
  (introduction, personalNarrative, connection, navigation) via Astro's
  Content Layer glob loader, fields traced directly to each
  content-bearing Feature's Technical Design "Collaborations" section.
  English placeholder entries only (Spanish/Euskera authoring is T-025's).
  Verified via a raw-JSON Vitest suite plus, for the first time, real
  `astro sync` validating every entry against the Zod schema. One fix
  along the way: switched the `z` import from the deprecated
  `astro:content` re-export to `astro/zod`.
- T-005 — i18n/Routing Layer — Core Resolution & Per-Locale Routes.
  Astro's native `i18n` config (`defaultLocale: 'en'`,
  `prefixDefaultLocale: true`) plus one shared dynamic route
  (`src/pages/[locale]/index.astro`) generate `/en/`, `/es/`, `/eu/`, each
  resolving title/meta-description/`html lang` from the Content Layer via
  a reusable interface (`src/lib/i18n.ts`) that later Domain Section
  Features will consume. Added placeholder `es.json`/`eu.json` entries
  (mirroring T-003's own English placeholder convention, marked "Pending
  final [locale] copy (T-025)") across all four collections so all three
  routes build for real today — filler, not translation; this was an
  explicit user decision (see Implementation Decisions). Verified via a
  Vitest suite for the pure metadata-derivation logic, plus the real
  pipeline: `astro sync`, `astro build` (generating distinct
  `/en/index.html`, `/es/index.html`, `/eu/index.html`), direct inspection
  of the generated HTML confirming distinct correct `html lang`/title/
  meta-description per locale, and `astro check` (0 errors/warnings/
  hints). Alt-text resolution is not yet exercisable — no image-bearing
  content exists until T-008/T-009 compose Hero/About Narrative.
- T-006 — i18n/Routing Layer — Root Bootstrap & Redirect. Rewrote the
  T-001 scaffold root page (`src/pages/index.astro`) into
  content-localization's language-agnostic root: a synchronous
  `is:inline` script resolving the active language via override →
  detected browser locale → English, redirecting via `location.replace`
  before any content paints, with a `<noscript>` meta-refresh fallback to
  `/en/` for no-JS visitors. The override read is a stub always returning
  `"unset"` until T-024 wires the real Override Store — so Commitment 1's
  override-priority branch (AC1) is algorithm-proven but not yet live
  end-to-end; detected-locale/fallback branches (AC2, AC3) are live.
  Verified via `@astrojs/compiler` AST assertions (empty `<body>`, single
  `is:inline` script, noscript/meta-refresh shape), direct execution of
  the extracted `resolveLocale` priority logic and the full shipped script
  against mocked `navigator`/`location`, plus the real pipeline: `astro
  sync`, `astro build` (4 pages: `/`, `/en/`, `/es/`, `/eu/`), generated
  `dist/index.html` inspected directly, and `astro check` (17 files,
  0/0/0). A first attempt placed the test directly under `src/pages/`,
  which broke the build — Astro treats any file there as a route; fixed
  by moving it under an underscore-prefixed directory the router ignores.
- T-007 — i18n/Routing Layer — Cross-Locale Coverage Check Mechanism.
  Added `checkCrossLocaleCoverage` (`src/lib/content-coverage.ts`), a
  pure, fs-based build-time/test check verifying every Content Layer
  domain directory holds a `<locale>.json` entry for every supported
  locale, independent of the `astro:content` virtual module.
  `src/content/coverage.test.ts` (4 tests) confirms it passes against the
  real placeholder Content Layer (symmetric en/es/eu across all four
  domains) and, via temp-directory fixtures, that it correctly detects and
  reports gaps when a domain is missing one or more locales' entries.
  Mechanism only, per its own declared scope — currently passes against
  T-005's English-filler es/eu placeholder data, not real translations;
  real enforcement against final authored content is T-029's job, gated
  on T-025.
- T-008 — Hero Composition. Renders headline/tagline, ornamental-mark
  placement, and scroll cue as one coordinated, single-template arrival
  composition, mounted in Root Layout's Introduction slot via the
  i18n/Routing Layer's resolved content. Two device-class arrangements
  (mobile: dominant line alone, secondary+tagline grouped; desktop:
  dominant+secondary grouped, tagline alone — hero-presentation/ui.md's
  groupings genuinely differ, not a reflow) render as separate static
  markup, toggled by CSS `display:none` per breakpoint — never
  JS-sequenced, so no partial-composition state can exist. Populated the
  Content Layer's English introduction entry with hero-presentation/
  ux.md's Confirmed copy (previously placeholder text). All four
  acceptance criteria (Commitments 1–4) verified: completeness (AST test +
  visual check), localized-content-via-props-only (source test, no
  `astro:content` import), non-interactive scroll cue (AST test: no
  href/onclick/tabindex in its subtree), device-class CSS-only layout
  (source test + visual check at both viewports). Also fixed a
  pre-existing gap found during visual verification: T-030's global reset
  stylesheet was built and unit-tested but never wired into any page;
  wired it into RootLayout.astro (see Implementation Decisions).

## Pending Work

- T-009–T-029 (21 tasks) remain per the Task Catalog's DAG. T-009, T-010,
  T-014, T-018, T-023 are dependency-unblocked (T-002/T-004/T-005
  satisfied) but not started.
- T-024 (Wire Override Store into i18n Root Bootstrap) remains blocked on
  T-013 (Language Switcher + Override Store), not yet started — needed to
  make Commitment 1 AC1 live for real.
- T-025 (content authoring) and its dependents (T-028, T-029) carry the
  Implementation Plan's Readiness Issue 1 (Javi Morala's own authoring,
  not schedulable as ordinary implementation work) — now also the
  concrete blocker for T-005's ES/EU content realization, hero-
  presentation's ES/EU realization, and T-007's mechanism becoming a real
  enforcement (see Feature Realization).

## Generated Artifacts

- T-001: package.json, package-lock.json, astro.config.mjs (base),
  tsconfig.json, vitest.config.ts, src/pages/index.astro,
  src/components/ScaffoldCheck.{tsx,test.tsx}, restored .vscode/public
  files.
- T-002: src/styles/index.scss, src/styles/tokens/{_color,_typography,
  _spacing,_breakpoints}.scss, src/styles/mixins/_interaction-state.scss,
  src/styles/index.test.ts; package.json/-lock gained `@types/node`.
- T-030: src/styles/base/_reset.scss, src/styles/base/reset.test.ts.
- T-004: src/layouts/RootLayout.astro, src/layouts/RootLayout.test.ts;
  package.json/-lock gained `@astrojs/compiler`.
- T-003: src/content.config.ts, src/content/{introduction,
  personal-narrative,connection,navigation}/en.json,
  src/content/shape.test.ts.
- T-005: astro.config.mjs (i18n block added), src/lib/{i18n.ts,locale.ts,
  locale.test.ts}, src/pages/[locale]/index.astro, src/content/
  {introduction,personal-narrative,connection,navigation}/{es,eu}.json
  (8 files).
- T-006: src/pages/index.astro (rewritten from the T-001 scaffold page),
  src/pages/_tests/index.test.ts (new — underscore-prefixed directory so
  Astro's router ignores it).
- T-007: src/lib/content-coverage.ts, src/content/coverage.test.ts.
- T-008: src/components/HeroComposition.astro,
  src/components/HeroComposition.test.ts,
  src/pages/_tests/locale-index.test.ts (new); src/pages/[locale]/
  index.astro (mounts HeroComposition into the introduction slot);
  src/content/introduction/en.json (populated with Confirmed English
  copy, was placeholder); src/layouts/RootLayout.astro (wired T-030's
  reset stylesheet in — see Implementation Decisions).
- Location (T-001–T-005, T-030): branch worktree-t001-scaffold-init,
  commits 922f8ef (T-002), 565d52a (T-030), c2d157c (T-004), fd606c9
  (T-003), 1fe530b (T-005), all merged to `main` (current `main` HEAD:
  67f896a).
- Location (T-006): branch worktree-t006-root-bootstrap-redirect, commit
  2bb1550, pushed to origin
  (https://github.com/moralazizurbhi-tech/javimorala-com), branched from
  `main`@67f896a. Now merged into `main` via `27e3639` — see Progress
  Summary.
- Location (T-007): branch worktree-t007-coverage-check-mechanism, commit
  33253fa, pushed to origin, branched from `main`@67f896a. Now merged into
  `main` via `27e3639` — see Progress Summary.
- Location (T-008): branch worktree-t008-hero-composition, commit
  160c944, pushed to origin, branched from `main`@27e3639 (already
  includes T-006 and T-007). PR not yet opened.

## Implementation Decisions

- T-001/T-002/T-030/T-004/T-003 reused exact dependency versions/file
  layouts verified working in the pre-reset implementation —
  reproducibility, not new decisions.
- For T-005's ES/EU content gap (T-005's own declared inputs name only
  "English placeholder content," yet its acceptance criteria require all
  three routes to pre-render resolved content), the user explicitly
  chose: add placeholder ES/EU JSON files mirroring English's own
  placeholder convention, rather than (a) building an English-fallback
  mechanism inside the resolution interface — which would have
  contradicted hero-presentation/technical-design.md's explicit "no
  runtime fallback for missing locale content is defined here" — or
  (b) leaving /es/ and /eu/ unbuilt pending T-025.
- Split `src/lib/i18n.ts` (astro:content-dependent) from `src/lib/
  locale.ts` (pure constants/derivation) so the latter is directly
  unit-testable under Vitest without the unresolvable `astro:content`
  virtual module.
- T-006: the redirect algorithm is written directly inside the
  `is:inline` script rather than imported from a shared TS module, since
  `is:inline` scripts cannot import ES modules and the script must stay
  synchronous/unbundled for Commitment 4. Verified by extracting and
  executing the actual shipped script text in tests, avoiding drift risk
  from a separately-typed mirror implementation.
- T-006/T-007: each executed in its own fresh worktree/branch off `main`
  this session (rather than one shared long-lived worktree, as
  T-001–T-005 used), per the executing session's isolation requirement —
  consequence: the two branches don't contain each other's work (see
  Known Issues).
- T-008: the introduction Content Layer schema (T-003, approved) holds
  only `headline`/`tagline` string fields, while Feature UI's approved
  typography needs three independently-sized lines. Chose to encode the
  first two lines newline-separated within `headline` (grouped together
  per UI's own Spacing and Layout description) and the third in
  `tagline`, split at render time — keeps the split content-driven, no
  hardcoded line text, without touching T-003's approved schema.
- T-008: the scroll cue's text has no Content Layer field (Technical
  Design's Collaborations section names only headline/tagline as
  i18n-consumed content). Implemented as a Feature-owned static English
  string rather than extending T-003's approved schema, which would
  exceed this Task's own scope — flagged under Known Issues for Planning.
- T-008: wired T-030's already-built, already-unit-tested global reset
  stylesheet into RootLayout.astro. Judgment call by the executing
  session — technically outside T-008's own component-file boundary
  (RootLayout is nominally T-004's artifact) — made because Hero
  Composition's own visual output was illegible without it (off-white
  text, no background colour reaching the browser) and the fix is
  mechanical completion of already-approved prior work, not a new
  styling decision. Flagged transparently rather than silently expanding
  scope elsewhere.
- T-008: two independent device-class DOM arrangements, CSS
  `display:none`-toggled, rather than one CSS-Grid structure with
  per-breakpoint area reassignment — the Grid approach was abandoned
  mid-investigation by explicit user instruction after surfacing a
  Chromium-specific layout quirk (see Known Issues); the flexbox
  dual-layout replacement passes all automated checks and was visually
  verified at both viewports.
- T-008: the ornamental mark renders as a CSS radial-gradient placeholder,
  not a real asset — the real asset is explicitly out of
  hero-presentation's Feature scope (Technical Design, Dependencies); the
  placeholder exists only so Commitment 1's completeness invariant is
  structurally satisfiable today.

## Known Issues

- The reset (ea27f37) discarded all prior progress and its Implementation
  Report; Task Catalog/Implementation Plan unaffected. Traceability-only,
  no owning workflow.
- The previously-documented git-worktree tsconfig resolver defect has now
  not reproduced across eight further build/check cycles (T-002 through
  T-008, including three fresh worktree checkouts for T-006, T-007, and
  T-008). Still not confirmed as fixed — the mechanism (walking to the
  main checkout's node_modules-less `.git`) is unchanged. Future tasks
  should keep verifying rather than assume immunity.
- Main checkout still has no package.json/node_modules of its own.
- Planning inconsistency, for Planning's awareness: T-005's Task Catalog
  entry lists only "English placeholder content" as an input, yet its
  acceptance criteria (traced from content-localization's Commitment 2)
  require /es/ and /eu/ to render content that actually matches the
  active language — content-localization's Technical Design also
  explicitly rules out a runtime English-fallback mechanism as the fix.
  Neither the Task Catalog nor the Implementation Plan states where ES/EU
  *placeholder* (not final) content should come from to make Phase 1's
  routes buildable now, though the Implementation Plan's Phase 1 text does
  say routes are built "against placeholder content." Resolved this
  session by explicit user decision (see Implementation Decisions); Task
  Catalog/Implementation Plan authors may want to make this input
  explicit for future phases with the same shape (e.g., any task building
  all three locale routes before T-025 completes). Owning workflow:
  Planning.
- T-005's alt-text acceptance sub-criterion is not yet exercisable — Hero
  Composition (T-008) did not introduce any `<img>`-based content either
  (its ornamental mark is a CSS placeholder). Not a defect; flagged so it
  isn't mistaken for an oversight when T-026/T-028 later verify it — first
  exercisable at T-009.
- RESOLVED (was open in the prior report): Phase 1's merge-ordering gap —
  T-006 and T-007 were each implemented on their own branch off `main`
  (67f896a), and at the time of the prior report neither branch contained
  the other's commit. Both are now confirmed ancestors of current `main`
  (`27e3639`) — see Progress Summary. No longer an open issue.
- hero-presentation's scroll cue text has no Content Layer field to carry
  a translation; Technical Design's Collaborations section names only
  headline/tagline as i18n-consumed content. Currently a Feature-owned
  static English string with no Spanish/Euskera path defined anywhere in
  approved content. Owning workflow: Planning (content-localization's
  Content Layer schema, or hero-presentation's Technical Design —
  Planning's call which artifact should absorb this).
- T-030's global reset stylesheet was built and unit-tested in isolation
  at its own Task but never wired into any real page until T-008 found
  and fixed the gap during visual verification. No Task Catalog entry
  explicitly owned that wiring step — a similar shape to the
  already-flagged T-005 ES/EU-placeholder-input gap above. Future tasks
  producing shared/global styling artifacts might benefit from an
  explicit "wired into the real page" acceptance criterion. Owning
  workflow: Planning.
- A Chromium-specific CSS layout quirk was found and investigated during
  T-008's visual verification: an absolutely-positioned CSS Grid
  container with an `auto`-sized, row-spanning track column paired with a
  sibling `minmax(0, 1fr)` track fails to constrain the second track's
  width for text wrapping (reproduced in isolated minimal repro files;
  caching and dev-server timing were ruled out as causes). Investigation
  was stopped by explicit user instruction before being conclusively
  root-caused against the CSS specification. The component was rewritten
  to a different, simpler CSS pattern (dual flexbox layouts toggled via
  `display:none`) that avoids the pattern entirely and passes every
  automated check. On real narrow-viewport screens the tagline's
  right-edge margin may still read as tighter than its desktop
  counterpart — a minor visual-polish item, not a Contract violation,
  since Feature UX explicitly leaves exact spatial values Pending/to
  Feature UI. Flagged for a future visual QA pass, not blocking.
  Traceability-only, no owning workflow required unless a future task
  hits the same CSS pattern.

## Execution Evidence

- T-001: `npm install` (414 packages, 0 vulnerabilities); `npx astro
  sync`; `npm run build` (static, 1 page); `npm run test` (2/2 passing);
  `npm run check` (6 files, 0/0/0).
- T-002: Vitest (Sass-compile test) passing; contributed to the running
  suite total.
- T-030: Vitest (Sass-compile test, 2 assertions incl. outline absence)
  passing.
- T-004: Vitest (`@astrojs/compiler` AST test) passing; `astro check`: 10
  files, 0 errors/warnings/hints.
- T-003: Vitest (raw-JSON shape test) passing; `astro sync` validated
  real Zod-schema compliance; `astro check`: 12 files, 0/0/0.
- T-005: Vitest (pure logic) passing; `astro sync`; `astro build` — 4
  pages (`/`, `/en/`, `/es/`, `/eu/`); generated HTML inspected directly
  (`grep` on `dist/{en,es,eu}/index.html`) confirming distinct `html
  lang="en"/"es"/"eu"` and locale-correct title/meta-description; `astro
  check`: 16 files, 0/0/0.
- T-006: Vitest (5 tests: empty-body/script/noscript AST checks,
  `resolveLocale` priority-branch extraction test, full-script
  mocked-navigator/location execution test) passing; `astro sync`; `astro
  build` — 4 pages (`/`, `/en/`, `/es/`, `/eu/`); generated
  `dist/index.html` inspected directly (script/noscript content confirmed
  verbatim, unbundled); `astro check`: 17 files, 0/0/0. Cumulative in that
  worktree: `npm run test` — 7 test files, 19 tests, all passing.
- T-007: Vitest (4 tests: real-content pass, synthetic-symmetric-fixture
  pass, single-domain-gap detection, multi-domain-gap detection) passing;
  `astro sync`; `astro build` — 4 pages (fresh worktree off `main`, so
  root is still T-001's scaffold page — expected, T-007 doesn't touch it);
  `astro check`: 18 files, 0/0/0. Cumulative in that worktree: `npm run
  test` — 7 test files, 18 tests, all passing.
- T-008: Vitest — 7 tests across HeroComposition.test.ts (5) and
  locale-index.test.ts (2): template completeness/dual-arrangement
  presence, props-only content consumption (no astro:content import),
  non-interactive scroll cue (no href/onclick/tabindex anywhere in its
  subtree), CSS-only breakpoint layout, single HeroComposition mount into
  RootLayout's introduction slot — all passing. `astro sync`; `astro
  build` — 4 pages; generated `dist/en/index.html` inspected directly
  (grep confirmed "Building"/"the web"/"with a rebellious streak"/
  scroll-cue text and every `hero__*` class present). `astro check` — 22
  files, 0 errors/0 warnings/0 hints. Visually verified in headless
  Chrome (both the dev server and the static build output) at desktop
  (1440×900) and mobile (390×844) viewports — confirmed real rendering,
  not just markup presence: headline/mark/scroll-cue visible together,
  colours matching Styling System tokens once the RootLayout
  reset-wiring fix landed. Cumulative in that worktree: `npm run test` —
  10 test files, 30 tests, all passing.
- Cumulative current state (after T-005, on `main`): `npm run test` — 6
  test files, 14 tests, all passing. `npm run check` — 16 files, 0
  errors, 0 warnings, 0 hints. `npm run build` — 4 static pages generated.
  (T-006's and T-007's own cumulative figures above are each per their own
  branch as of when each was executed — both branches are now merged into
  `main` via `27e3639`, see Progress Summary; T-008's cumulative figures
  above are per its own still-unmerged branch.)
- Commits 922f8ef, 565d52a, c2d157c, fd606c9, 1fe530b on branch
  worktree-t001-scaffold-init, merged to `main`. Commits 2bb1550 (T-006)
  and 33253fa (T-007), each originally on their own branch, both now
  merged into `main` via `27e3639`. Commit 160c944 (T-008) on branch
  worktree-t008-hero-composition, pushed to origin, branched from
  `main`@27e3639.

---

*Created: 2026-09-08*
