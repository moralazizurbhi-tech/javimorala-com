# Implementation Report: Javi Morala

## Progress Summary

**Phase 0 (T-001–T-004) and Phase 1 (T-005–T-008) are now merged into
`main`.** The prior report described Phase 1 as living on its own
unmerged branch; that is no longer the case.

**Phase 2 (Hero Presentation + Section Navigation, T-009–T-012) is now
merged into `main` as a single, integrated experience — the prior
report's flagged gap ("M2 not met as a single integrated level," since
Phase 2 was split across two independent branches) is resolved.** Merge
commits `824b880` (`worktree-t009-hero-composition`) and `32f1d3b`
(`worktree-t011-section-navigation`) integrated both halves; the
Introduction Domain Section now contains Hero's real composition
alongside a fully functional Section Navigation in one state on `main`.
**Milestone M2 is now genuinely met**, not merely at the per-task level.

**A Mark/Logo split refinement (`7b324fe`, spec/asset-only, no source
changes) landed on `main` after that merge**, formalizing a distinction
between Hero's large Ornamental Mark and Section Navigation's compact
Ornamental Logo: added a real Ornamental Logo SVG asset, corrected the
mark's gradient direction back to the Figma-sourced lilac-dominant read,
reworked the mark/headline relationship into "one true compositional
gesture," and added Section Navigation Contract Commitment 8 (the nav
divider line renders as two segments around whichever mark occupies the
row's center). Four small fix commits on `main` immediately preceded it
(`e9d3676`, `3fc9978`, `0f3f941`, `2c9ab23`), replacing Hero's mark
placeholder with the real SVG asset and tuning mark/headline vertical
positioning.

**This session's own work (16 commits on branch
`worktree-hero-nav-mark-logo-refinement`, not yet merged, fully pushed)
first reconciled T-009/T-010/T-011 against that refinement, then carried
out an extended, multi-round post-implementation correction pass on
Hero's mobile and desktop composition** — the divider line, mark colour
and geometry, mark-relative headline anchoring, a full typography-system
change, and, after a developer-supplied real-device screenshot revealed
several further mobile defects (crop, rotation direction, scroll-cue
placement, grouping the mark and headline as one visually centered
unit), a further nine rounds of targeted fixes on top of that. Three of
those rounds were spent finding and fixing **two genuine desktop
regressions introduced by this session's own mobile-composition
refactor** — one from a CSS Grid behavior (a pseudo-element spacer
leaking into desktop's grid sizing via `display: contents`), the other
from a subtler one (an absolutely-positioned grid item's inset
properties resolving against its own named grid area, not the whole
grid, once that area assignment moved off the element). Both are now
fixed and verified via commit bisection and pixel-level screenshot
comparison against the pre-refactor state. Full detail in Completed
Work / Implementation Decisions below.

**A significant tooling limitation was also discovered and documented
this session**: this environment's headless Chrome screenshot tool
silently clamps any requested viewport width below ~500px to ~500px
internally while still labeling the output by the requested (smaller)
size — meaning automated "mobile" screenshots at 360–430px were not
trustworthy self-verification for part of this session, addressed by
having the developer supply real-device screenshots directly and by
using a ≥500px proxy width for automated checks from that point on.

## Feature Realization

| Feature | Technically Complete? | Realization Status |
| --- | --- | --- |
| content-localization | Yes (T-006, T-007 done; T-029 real-content exercise still pending) | Provisional — unchanged from the prior report; full real-content coverage still deferred to later Features' own phases |
| language-override | Yes (T-005, T-008 done) | **Realized and merged** — the prior report's "pending merge" is resolved; T-012's hosting now lives on `main`. Still carries the pre-existing Implementation Placeholder (`"EN"`/`"ES"`/`"EU"` labels) |
| hero-presentation | Partial — T-009, T-010 done (Commitments 1–4); Commitment 5 (Presence Links inclusion) still owned by T-018/Phase 5, not started | **Provisional, materially improved this session.** Real Ornamental Mark SVG asset (no longer a CSS-gradient placeholder); gradient colours corrected to match the Figma-sourced lilac-dominant read; headline anchored to the mark's own measured/rotated geometry rather than the viewport, on both device classes; new mark-visibility sentinel exposed for Section Navigation's Commitment 8. Spanish/Euskera copy remains AI-drafted, still pending native-speaker review. All of this session's work lives only on the unmerged `worktree-hero-nav-mark-logo-refinement` branch |
| section-navigation | Task Catalog's T-011 entry predates Commitment 8 (added by `7b324fe`) and still lists only Commitments 1–5 | **Realized, on the unmerged branch.** Commitment 8 (segmented divider line) newly built: two structurally independent plate elements, driven by the compact-logo condition (Personal Narrative/Connection) or Hero's mark-visibility sentinel (Introduction, scroll-derived). Real Ornamental Logo SVG replaces the gradient-pill placeholder. **Known inconsistency:** the Task Catalog's own T-011 entry was written before Commitment 8 existed — see Known Issues |
| about-narrative | Pending (no task started) | — |
| direct-contact | Pending (no task started) | — |
| presence-links | Pending (no task started) | — |
| motion-interaction | Pending (no task started) | — |
| accessibility | Pending (no task started) | — |

## Completed Work

*T-001–T-012 unchanged from the prior report's own account of that work
— preserved below for continuity; only their merge/branch status has
changed (see Progress Summary).*

- **T-001–T-008** (Scaffold, Styling System, Content Layer, Root Layout,
  Override Store, i18n/Routing Layer, Cross-Locale Coverage Check,
  Language Switcher) — as previously reported; all now on `main`.
- **T-009 / T-010** (Hero Composition: Elements & Content; Responsive
  Treatment) — as previously reported; now on `main`, and materially
  reworked by this session's own commits (below).
- **T-011 / T-012** (Section Navigation: Core Bar & Active-Section
  State; Mobile Overlay & Language-Control Hosting) — as previously
  reported; now on `main`, and extended by this session's own commits
  (below) to realize Commitment 8.

**This session's work, in sequence:**

- **`0c462b8` — Realize Mark/Logo split refinement in Hero & Section
  Navigation.** Added Hero's mark-visibility sentinel
  (`#hero-mark-boundary`). Implemented Section Navigation Commitment 8
  (two independent divider segments, `#e6bdfb` colour token, driven by
  the compact-logo condition or Hero's sentinel); swapped the
  compact-logo placeholder for the real Ornamental Logo SVG. Extended
  `SectionNav.test.tsx`'s `IntersectionObserver` mock to track multiple
  observer instances; added Commitment 8 test coverage (test count:
  37 → 41).
- **`90a779c`, `77434e0` — Correct Hero desktop mark colours/crop/
  alignment; mark-relative headline anchoring, Figma typography,
  Building/secondary ratio.** Corrected `ornamental-mark.svg`'s gradient
  to Figma's literal values (verified via raw SVG export, since Figma's
  node API doesn't expose gradient-stop data); fixed bottom-cropping
  (`object-fit: cover` → `contain`); rebuilt desktop headline positioning
  as percentages of the mark's own rendered box, measured directly from
  the production SVG via a `getBBox()` harness; replaced the
  never-actually-imported Fredoka with Gothic A1 (headings) / Darker
  Grotesque (body), both self-hosted, OFL-licensed; widened the
  Building/secondary size ratio toward Figma's measured ~3.08x.
- **`7de1543`, `7c27462` — Nav/scroll-cue sizes to Figma values; Pascal
  Case; capitalize-bug fix.** Raised nav/scroll-cue tiers toward Figma's
  measured values; Pascal Case via `text-transform: capitalize`; fixed
  (via `::first-letter`) a real bug where `capitalize`'s word-boundary
  detection silently merges across `position: absolute` siblings once
  the whitespace between them collapses away.
- **`41e0b05`, `dd73d83`, `1a90f99` — Mobile view overhaul, prompted by
  a real-device screenshot showing several defects a desktop-viewport
  proxy hadn't caught.** Switched `.hero`'s `min-height` to `100dvh`
  (falls back to `100vh`) so the scroll cue doesn't land below the real
  visible fold on mobile browsers with a collapsing address bar;
  rebuilt the mark's mobile crop after discovering it was 45° rotated in
  Figma's own mobile frame (first attempt had the rotation direction
  reversed, corrected the next round); restructured the two secondary
  headline lines into their own flex-column wrapper after a CSS Grid
  quirk (a spanning sibling forcing extra space into a two-row track)
  inflated their mutual gap; fixed a real CSS Grid overflow bug
  (`min-width: auto` letting long copy blow out its 1fr column instead
  of wrapping) that a later round's `justify-content: flex-end` change
  exposed. **Discovered and documented the headless-Chrome viewport-
  clamp tooling limitation** described in Progress Summary, via a
  from-scratch investigation (an iframe-based measurement harness,
  a temporary in-page debug script, and finally direct pixel-cropping of
  screenshots) after visually "fixed" mobile states kept not matching
  what a real device showed.
- **`31c7232`, `d509220`, `cebe2f1`, `d482ffe`, `0d50926` — Group Hero's
  mark and headline as one visually centered mobile unit; five rounds of
  developer-directed tuning.** Wrapped the mark and headline in a new
  `.hero__display` element so they move and center together, using a
  `::before` spacer to make the browser's auto-centering account for the
  mark's own (otherwise `position: absolute`-invisible) visual bulk;
  corrected the spacer's own height formula twice (first used the mark's
  full rotated bounding height, then a wrong "flush at the wrapper's own
  bottom" anchor, before landing on the correct "how far the mark's
  visual bottom sits below its own `top: 0`" derivation) — then
  developer-specified exact values directly replaced the derived formula
  entirely once real-device screenshots showed it still didn't match:
  final mark size/position, spacer height, headline left margin,
  secondary-headline size, and column-gap all set to precise
  developer-supplied numbers rather than further derived/estimated ones.
- **`f4dcf24`, `afed50d` — Two genuine desktop regressions found and
  fixed, both introduced by the grouping work above and both missed by
  this session's own "desktop confirmed unaffected" checks at the time
  they were introduced.** (1) `display: contents` on `.hero__display`
  removes *its own* box but not its `::before` pseudo-element's — that
  pseudo-element was still generating a box, promoted into `.hero`'s
  desktop grid, where its height forced that row to grow and pushed the
  composition around; fixed with `content: none` on the pseudo-element
  itself under desktop-up. (2) A second, independent regression the
  first fix didn't touch: moving `grid-area: headline` off
  `.hero__headline` onto the wrapper meant `.hero__headline`'s
  `position: absolute` offsets no longer resolved against the
  'headline' grid area's own box, falling back to `.hero`'s entire
  padding box instead — a different reference box, silently shifting
  the headline's desktop position despite its `top: calc(...)`
  formula's text never changing. Found via commit bisection (rebuilding
  and screenshotting the pre-regression commit, the regression commit,
  and two failed fix attempts in isolation) and a byte-level compiled-
  CSS diff; verified by pixel-comparing "Building"'s rendered position
  before and after (off by ~3px at 1440×900, within rendering-precision
  noise) and confirmed stable across repeated captures.

## Pending Work

- T-013–T-032 (20 tasks) — unchanged, not started.
- hero-presentation's Commitment 5 — unchanged, owned by T-018/Phase 5.
- **This session's 16 commits remain unmerged**, on
  `worktree-hero-nav-mark-logo-refinement`, pushed to origin, working
  tree clean at HEAD (`afed50d`) — the same unmerged-branch pattern the
  prior two reports flagged for their own phases.
- T-011's Active Screen Indicator visual anatomy (colour/underline/
  weight) — unchanged, still Pending in `section-navigation/ux.md`/
  `ui.md`, still gates `motion-interaction`'s T-021/T-022.
- Native-speaker review of Hero's/Section Navigation's AI-drafted
  Spanish/Euskera copy — unchanged, recommended before launch.
- Task Catalog's T-011 entry needs its own refresh to list Commitment 8
  (owned by Planning, not performed here).
- `motion-interaction`'s Nav Progress Overlay (T-022) still assumes one
  continuous divider line — factually superseded by Commitment 8's
  two-segment line; flagged in `7b324fe`'s own commit message as a
  deferred follow-up, carried forward here.
- Decorative Mark/Logo instances still lack an explicit `aria-hidden`
  commitment; also flagged in `7b324fe` as deferred.

## Generated Artifacts

*(new/changed since the prior report's own snapshot, `35526fc`)*

- **Assets:** `public/ornamental-mark.svg` (gradient corrected),
  `public/ornamental-logo.svg` (new, `7b324fe`, wired into Section
  Navigation this session)
- **Config:** `package.json`/`package-lock.json` — removed
  `@fontsource-variable/fredoka`; added `@fontsource/gothic-a1`,
  `@fontsource-variable/darker-grotesque`
- **Styles:** `src/styles/global.scss` (real `@font-face` imports);
  `src/styles/tokens/_typography.scss` (two-family system, size-tier
  recalibration); `src/styles/tokens/_colors.scss`
  (`$color-nav-divider`)
- **Feature modules:** `src/features/hero-presentation/
  HeroComposition.astro` (extensively reworked — mark geometry,
  mark/headline grouping, device-class typography); `src/features/
  section-navigation/SectionNav.tsx`/`.module.scss` (Commitment 8, real
  logo asset); `src/features/language-override/
  LanguageSwitcher.module.scss` (minor)
- **Tests:** `src/features/section-navigation/SectionNav.test.tsx`
  extended (Commitment 8 coverage) — 41 tests total, up from 37
- **Content data:** `src/content/{introduction,personal-narrative,
  connection}.json` — minor updates
- **Layouts/pages:** `src/layouts/RootLayout.astro`, `src/pages/
  [locale]/index.astro` — minor updates
- **Specs (via `7b324fe`, not this session's own work):** Mark/Logo
  split formalized across `project-ux.md` and the `hero-presentation`/
  `section-navigation`/`about-narrative`/`direct-contact`/
  `motion-interaction` Feature specs

## Implementation Decisions

*(new this session; full rationale in each commit's own message)*

- Mark gradient corrected to Figma's literal lilac-dominant values,
  matching `7b324fe`'s own project-ux.md correction — no longer a
  divergence from spec (a prior report round of this session had flagged
  this as a known inconsistency; `7b324fe` and this session's colour fix
  independently converged on the same correction, so it's resolved, not
  carried forward).
- Two-family typography (Gothic A1 / Darker Grotesque) adopted per
  direct developer instruction, sourced from their own Figma inspection
  (font configuration wasn't retrievable via the Figma MCP toolset —
  confirmed as a real tool limitation). **This is a still-open
  divergence from `project-ux.md`'s own text**, which still describes
  "a single rounded, geometric sans-serif family... expressed through
  weight and size" (confirmed unchanged by `7b324fe`, which touched
  `project-ux.md` extensively but not this passage) — see Known Issues.
- Commitment 8's divider line built as two real, independently-sized DOM
  elements (plates with their own `border-bottom`), not a continuous
  line hidden behind a mark, so the gap is genuinely unpainted and
  whichever mark occupies the row's center visually shows through.
- Mark-relative headline anchoring (desktop) derived from the mark's own
  measured SVG geometry (`getBBox()`), not guessed percentages — holds
  regardless of desktop viewport size.
- Building/secondary headline ratio kept Hero-local (a `calc()` off
  `$font-size-display`), deliberately not coupled to the shared
  `$font-size-heading` token, so other Features' future section
  headings aren't bound to Hero's own ratio.
- Pascal Case applied via CSS (`text-transform: capitalize` +
  `::first-letter` for the cross-sibling word-boundary bug), not by
  editing each locale's own content string, so it holds uniformly across
  English/Spanish/Euskera.
- Mobile mark/headline grouped as one composed unit (a new
  `.hero__display` wrapper) per explicit developer direction that they
  should read and move as a single element, not two independently-placed
  ones — final size/position/spacing values developer-specified directly
  after several derived-formula attempts didn't match their own visual
  target.
- Both desktop regressions from the grouping work were root-caused
  methodically rather than patched by trial and error: the first via
  reasoning about `display: contents`'s interaction with pseudo-elements
  (confirmed by screenshot); the second only after two plausible-seeming
  fixes failed, via git-commit bisection and a byte-level compiled-CSS
  diff between the working and regressed states — a deliberate escalation
  from "reason about the likely cause" to "measure the actual cause"
  once the first two attempts didn't hold up under verification.

## Known Issues

- **Task Catalog inconsistency:** T-011's `realizesCommitments` predates
  Commitment 8 and doesn't list it; T-009/T-010's entries don't
  reference the mark-visibility-sentinel collaboration Technical Design
  now requires. Both are realized in the implementation. Owning
  artifact: `specs/task-catalog.md` (Planning Workflow) — not modified
  here.
- **`project-ux.md`'s Typography passage still says "a single... sans-
  serif family... expressed through weight and size,"** now diverging
  from the implemented two-family Gothic A1/Darker Grotesque system — a
  deliberate, developer-confirmed correction, not an error, but the spec
  text itself needs its own reconciliation pass. (The Colour/gradient
  passage was independently corrected by `7b324fe` and is no longer a
  known issue — see Implementation Decisions.) Owning artifact:
  `project-ux.md`.
- This session's 16 commits are unmerged (branch
  `worktree-hero-nav-mark-logo-refinement`).
- **Tooling limitation (this session's own environment, not the
  product):** this environment's headless Chrome screenshot tool clamps
  any requested viewport width below ~500px to ~500px internally while
  still labeling output by the requested size — self-verified "mobile"
  screenshots below that threshold are not reliable. Worked around by
  using real-device screenshots and a ≥500px proxy width; no fix to the
  tooling itself was found or attempted this session.
- Carried forward unchanged: T-011's Active Screen Indicator visual
  anatomy still Pending; AI-drafted ES/EU copy still needs native
  review; `motion-interaction`'s Nav Progress Overlay now additionally
  outdated per Commitment 8; decorative Mark/Logo `aria-hidden`
  commitment still missing (both flagged in `7b324fe`, not yet
  actioned); several other long-unmerged worktree branches from earlier
  reports remain unreconciled (not re-investigated here).

## Execution Evidence

- `npm run test` (Vitest) — 41/41 passing (7 test files), current HEAD
  (`afed50d`); up from 37/37 at the prior report.
- `npm run build` (astro build) — clean after every commit this session;
  produces the 4 expected routes throughout.
- Figma verification: file `CCwye9dUj8Sy4f2lgy6i9f` — gradient colours
  confirmed via raw SVG export (node API doesn't expose gradient
  stops); headline size ratio confirmed via node dimensions; the mobile
  frame's mark rotation/scale confirmed via its own exported image (no
  rotation value exposed by the API either — confirmed via visual
  comparison and developer-supplied exact angle); font
  family/configuration and node x/y positions confirmed not retrievable
  via this Figma MCP toolset at any detail level.
- Custom `getBBox()` measurement harness (headless Chrome + inline SVG +
  `getPointAtLength` sampling) run against the production
  `ornamental-mark.svg` for exact tendril-tip coordinates.
- Isolated minimal-HTML reproductions used twice this session before
  touching real components: once for the `text-transform: capitalize`
  cross-sibling bug (reproduce → verify fix → apply), once implicitly
  via the CDP/iframe/direct-debug-script investigation chain that
  surfaced the viewport-clamp tooling limitation.
- **Commit bisection** (checking out `1a90f99`, `31c7232`, and an
  isolated `31c7232` + single-fix patch, rebuilding and screenshotting
  each) used to root-cause the second desktop regression, after two
  direct fix attempts had already been tried and verified-by-screenshot
  yet still didn't resolve it — escalated to bisection specifically
  because casual visual comparison wasn't catching a real, ~60px
  regression.
- Headless-Chrome screenshots across the session at 360–1920px and
  `en`/`es`/`eu` locale routes; ≥500px used exclusively for
  self-verification once the viewport-clamp limitation was identified.
  Two real-device screenshots supplied directly by the developer (412px)
  were the actual verification authority for the mobile-specific defects
  found in that range.
- Commits: `aa5e600`…`3d62f0f` (T-001–T-012) — on `main`. `824b880`,
  `32f1d3b` — Phase 2 merges, on `main`. `e9d3676`, `3fc9978`,
  `0f3f941`, `2c9ab23` — pre-session Hero fixes, on `main`. `7b324fe` —
  Mark/Logo split spec refinement, on `main`. `0c462b8` through
  `afed50d` (16 commits) — this session's work, on
  `worktree-hero-nav-mark-logo-refinement`, pushed to origin, working
  tree clean at HEAD.

---

*Created: 2026-09-09. Refined: 2026-09-11.*
