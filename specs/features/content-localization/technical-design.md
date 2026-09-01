# Technical Design: Content Localization

## Technical Components

### Locale Layer

Existing component — named in Project Architecture's System Structure
("detects the visitor's browser locale by default, holds the manual
override when set, and resolves the current locale's content to section
components"). Architecture gives only a one-line description; this phase
defines its full technical specification for the first time, since
`content-localization` is the Feature that owns it.

**Purpose**

Realize all of `content-localization`'s Feature Contract: resolve exactly
one active language per visitor at all times — from a persisted override
when one exists, otherwise from browser-locale detection with an English
fallback — and deliver content in that language to every consumer,
updating completely and only in response to an explicit override signal.

**Responsibilities**

- Determine the active language on arrival: persisted override if one
  exists; otherwise detected browser locale (English/Spanish) or the
  English fallback.
- Hold the active-language state for the duration of a visit, changing it
  only upon an accepted override signal.
- Persist an explicit override on-device so it is read back on future
  visits.
- Resolve per-locale content from the Content Data Layer for the active
  language and deliver it to consuming components.
- Receive the language-change signal from `language-override`'s control
  and, on acceptance, update the active language, persist it as the new
  override, and redeliver content in full.

**Owned Concepts**

- *Locale Detection* — determining the visitor's browser locale; invoked
  only when no Persisted Override State exists. Owned exclusively here.
- *Locale Fallback Resolution* — mapping any detected locale outside
  {English, Spanish}, or an undetectable locale, deterministically to
  English. Owned exclusively here.
- *Persisted Override State* — the on-device record of an explicit
  language selection, read on arrival and taking precedence over
  detection whenever present. Owned exclusively here. (Resolves the
  persistence question `language-override`'s Technical Design flagged as
  an open gap — Contract Commitments 2 and 3 settle it.)
- *Active Language Resolution* — the single ordered decision producing
  exactly one active language per visit: Persisted Override State if
  present, else Locale Detection + Fallback. Owned exclusively here.
- *Override Signal Handling* — accepting `language-override`'s change
  signal, updating Active Language Resolution's result, and writing the
  new Persisted Override State. Owned exclusively here.
- *Resolved Content Broadcast* — delivering the Content Data Layer's
  per-locale content for the current active language to all consumers,
  atomically and completely, triggered only at visit initialization or on
  an accepted Override Signal — never autonomously. Owned exclusively
  here.

**Collaborations**

- Reads per-locale content from Content Data Layer for the active
  language (Existing, per Architecture).
- Delivers Resolved Content Broadcast to Hero Section, About Section,
  Contact Section, and Section Nav, which consume it rather than reading
  Content Data Layer directly (Existing pattern, per Architecture and
  `section-navigation`'s Technical Design).
- Receives Override Signal Handling input from `language-override`'s
  Language Override Control; exposes the current active language for
  that control's own indicator (Existing, per `language-override`'s
  Technical Design, established from that component's side).

**Dependencies**

- Content Data Layer (Architecture) — source of per-locale content; not
  owned here.
- Language Override Control (`language-override` Feature) — source of
  the override signal.

**Constraints**

- Must never hold or deliver more than one active language at a time —
  no partial/mixed-language state (Commitment 4).
- Must not perform Locale Detection when Persisted Override State exists
  — precedence is absolute, never re-evaluated against a changed browser
  locale while an override is set (Commitments 2, 3).
- Must not change the active language absent an accepted Override Signal
  — no timers, polling, or re-detection mid-visit (Commitment 6).
- Persisted Override State must be stored purely client-side/on-device —
  no server-side storage (inherited from Feature Context; concrete
  storage technology is Implementation, not this phase).
- Must not author or hold the actual per-language copy itself — sourced
  exclusively from Content Data Layer.

**Design Decisions**

- Persisted Override State is modeled as owned exclusively by Locale
  Layer, not by the Language Override Control — directly reflects both
  Features' Definitions (the control only signals; state-holding belongs
  here) and resolves the cross-visit-persistence question left open by
  `language-override`'s Technical Design.
- Active Language Resolution is modeled as one ordered decision inside a
  single component rather than splitting detection and override-
  precedence across components — makes Commitment 4's single-active-
  language guarantee structural rather than coordinated at runtime.
- Resolved Content Broadcast is modeled as a single atomic operation
  fired only at initialization or on an accepted Override Signal —
  directly satisfies Commitment 5's "complete update, no partial" and
  Commitment 6's "no autonomous change."

**Contract Traceability**

- Commitment 1 (Default Resolution) — Locale Detection, Locale Fallback
  Resolution.
- Commitment 2 (Persisted Override Precedence) — Persisted Override
  State, Active Language Resolution.
- Commitment 3 (Fresh Detection Absent Override) — Active Language
  Resolution's ordering.
- Commitment 4 (Complete Single-Language Coverage) — Resolved Content
  Broadcast, single-active-language Constraint.
- Commitment 5 (Immediate/Complete Update on Signal) — Override Signal
  Handling, Resolved Content Broadcast.
- Commitment 6 (No Autonomous Change) — no-autonomous-change Constraint,
  Resolved Content Broadcast's trigger scope.

## Cross-Component Relationships

- Content Data Layer → Locale Layer: supplies per-locale content
  (Existing).
- Locale Layer → Hero Section, About Section, Contact Section, Section
  Nav: delivers Resolved Content Broadcast (Existing pattern).
- Language Override Control ⇄ Locale Layer: sends Override Signal
  Handling input; reads back active language for its indicator (Existing,
  from `language-override`'s own Technical Design).
- Locale Layer has no composer of its own — it sits alongside Content
  Data Layer, Styling System, and Animation Layer as a coequal
  foundational layer in Project Architecture's System Structure, not a
  child composed by App Shell.

No circular dependencies: Locale Layer's relationship with Language
Override Control is a bidirectional service collaboration (signal in,
state read out), not a composition cycle — neither component composes
the other.

---

*Created: 2026-09-01*
