# Technical Design: Content Localization

**Status:** Approved

## Technical Components

### i18n/Routing Layer

**Purpose**

Realize `content-localization`'s Feature Contract by resolving the
visitor's active language and ensuring all content/metadata renders
correctly, from first paint, at independently reachable per-language
routes.

**Responsibilities**

- At build time, generate one fully static, complete route per supported
  language — `/en/`, `/es/`, `/eu/` — each pre-rendering that language's
  resolved content and metadata (title, meta description, `html lang`,
  alt text) from the Content Layer (Commitments 2, 3, 5).
- At the language-agnostic root (`/`), run a synchronous, render-blocking
  script — before any content paints — that determines the active
  language via the priority order (override signal → detected browser
  locale if supported → English) and immediately navigates to that
  language's route. Because nothing paints at root before this runs, no
  language's content is ever visibly shown then swapped (Commitments 1,
  4).
- Read the override signal, when present, from an externally-owned store
  (see Dependencies) to give it priority over detection.
- Fall back to `/en/` when the detected locale isn't one of the three, or
  when detection/the override read is unavailable at all (e.g.,
  JavaScript disabled) — via a `<noscript>` fallback link/redirect at
  root to `/en/`. Satisfies Commitment 1 AC3 and covers the no-JS failure
  mode.
- Perform a build-time/test-time check that every content entry present
  in one locale's collection is present in all three, failing the
  build/test otherwise (Commitment 5).

**Owned Concepts**

- The resolution priority logic (override > detected-supported-locale >
  English fallback).
- The root bootstrap's redirect decision and its no-JS fallback.
- The cross-locale content-coverage check.

**Collaborations**

- **Content Layer** — supplies locale-keyed content per domain; the
  i18n/Routing Layer resolves from it for the current route's locale,
  never bypassed by Domain Sections.
- **Root Layout** — consumes resolved metadata (title, description,
  `html lang`) and content for composition.
- **Domain Sections** — consume locale-resolved content only via this
  Layer.
- **Override Signal** (external, owned by `language-override`'s own
  Technical Design — not yet designed) — read-only input to the
  resolution priority.

**Dependencies**

- Content Layer — external (Architecture-level, shared).
- Root Layout — external.
- Override Signal — external; interface constraint this Feature imposes,
  without deciding `language-override`'s internal mechanism: it must be
  synchronously readable (no network round-trip) and tri-state (unset /
  en / es / eu), since the root bootstrap must resolve it before first
  paint.

**Constraints**

- No server/API/network call for detection or resolution — everything
  resolves from build-time-generated static routes plus a synchronous
  client-side read at root.
- The root bootstrap must contain no visible content of its own — only
  the blocking resolution script and its `<noscript>` fallback — since
  any visible content there would violate the no-flash Commitment for
  visitors it doesn't match.
- Locale-level routing only (`/en/`, `/es/`, `/eu/`); no client-side
  router across domains.

**Design Decisions**

1. Root (`/`) is a content-free redirector, not a real page. Rationale:
   any visible root content would necessarily be in one language; a
   non-matching visitor would see it flash before redirecting, which
   Commitment 4 forbids. A content-free root is the only shape compatible
   with static/no-backend + no-flash + auto-detect simultaneously.
2. English is served at `/en/`, not unprefixed at `/`. Rationale:
   directly matches Architecture's own routing example (`/en/, /es/,
   /eu/`), keeping all three languages symmetric — this also avoids
   English visitors getting a fundamentally different (no-redirect) path
   than Spanish/Euskera visitors, keeping the resolution logic uniform.
3. No-JS visitors reach `/en/` via a `<noscript>` fallback at root, rather
   than being left with a permanently blank page. Rationale: consistent
   with Architecture's "static-first" progressive-enhancement ethos and
   Commitment 1 AC3's English-fallback rule, extended to cover "detection
   is impossible" as well as "detection yields an unsupported locale."
4. Cross-locale content-coverage (Commitment 5) is verified via a
   build-time/test check (Vitest — already named in Architecture's
   testing infrastructure for "locale resolution/override"), not a
   runtime mechanism. Rationale: coverage is a build-time property of the
   Content Layer's collections; checking it at runtime would be
   redundant cost with no visitor-facing benefit.
5. The override signal's storage mechanism is deliberately left undefined
   here, with only its logical shape (synchronously-readable, tri-state)
   fixed as a constraint on `language-override`'s future Technical
   Design. Rationale: persistence/storage ownership belongs to
   `language-override` per the Feature Definition boundary; this Feature
   must state what it needs without deciding how `language-override`
   provides it.

**Contract Traceability**

- Commitment 1 → root bootstrap's resolution-priority logic + `/en/`
  fallback route.
- Commitment 2 → per-locale static routes' content/metadata resolution
  from the Content Layer.
- Commitment 3 → the `/en/`, `/es/`, `/eu/` route structure itself.
- Commitment 4 → root's content-free, pre-paint redirect design.
- Commitment 5 → build-time/test cross-locale coverage check.

## Cross-Component Relationships

- Content Layer → i18n/Routing Layer: supplies locale-keyed content per
  domain.
- i18n/Routing Layer → Root Layout: supplies resolved locale, content,
  and metadata for composition.
- i18n/Routing Layer → Domain Sections: sole source of locale-resolved
  content.
- Override Signal (external, `language-override`'s future component) →
  i18n/Routing Layer: read-only; no reverse dependency introduced here.
- No dependency on Motion Layer or Accessible Primitives Layer — this
  Feature introduces no interactive component of its own.

No circular dependencies: i18n/Routing Layer depends outward on Content
Layer and the (future) Override Signal; Root Layout and Domain Sections
depend on it, not the reverse.

---

*Created: 2026-09-07*
