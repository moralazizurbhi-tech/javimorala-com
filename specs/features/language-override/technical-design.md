# Technical Design: Language Override

## Technical Components

### Language Override Control

Proposed new component — Project Architecture already names its host
("App Shell ... hosts the manual language-override control") but not the
control itself as a distinct component.

**Purpose**

Realize the visitor-facing control that lets a visitor pick between
English and Spanish, reflecting the currently active language and
signaling changes to the Locale Layer — without itself detecting locale,
resolving content, or persisting the override.

**Responsibilities**

- Present exactly two selectable options: English, Spanish.
- Reflect the currently active language, read from Locale Layer, as its
  active-state indicator.
- On selection of the non-active language, signal Locale Layer to change
  the override.
- On selection of the already-active language, take no action.

**Owned Concepts**

- *Selection signal* — communicating a visitor's chosen language to
  Locale Layer. Owned exclusively here.
- *Active-state reflection* — the control's indicated language always
  mirrors what Locale Layer currently resolves. Owned exclusively here
  (as a control-level guarantee; the underlying state itself is Locale
  Layer's).
- *Identical-selection guard* — selecting the already-active language
  produces no signal. Owned exclusively here.

**Collaborations**

- Reads the currently resolved locale from Locale Layer to drive its
  indicator (Existing pattern, per Architecture).
- Signals Locale Layer with the selected language when it differs from
  current; Locale Layer updates its held override and re-resolves
  content (Existing — "holds the manual override... resolves the current
  locale's content to section components").
- Consumes the supported-language set (English, Spanish) from Locale
  Layer/Content Data Layer rather than maintaining its own list.
- Composed/hosted by App Shell (Existing pattern, per Architecture).

**Dependencies**

- Locale Layer (active-locale read, override-signal target,
  supported-language set).
- App Shell (hosting/composition).

**Constraints**

- Must not itself detect locale, hold/persist override state, or
  resolve/render content — Locale Layer's exclusive responsibility, per
  this Feature's Definition boundary.
- Must not trigger a full page reload/navigation when signaling —
  Contract Commitment 3.
- Must not maintain an independent supported-language list.
- Must not depend on or be hosted by Section Nav — per this Feature's
  Definition, explicitly not co-located with nav.

**Design Decisions**

- No internal persisted state of its own — only reads Locale Layer's
  active locale and forwards selection signals — directly reflects this
  Feature's Definition/Context boundary (state-holding belongs to
  `content-localization`'s Locale Layer).
- Identical-selection no-op implemented as a guard in this component
  (compare selection to reflected active language before signaling), not
  delegated to Locale Layer — satisfies Commitment 4 at the interaction
  point without requiring Locale Layer to do redundant-change detection.
- **Flagged assumption (not resolved here):** Commitment 5 (persistence
  across visits) is treated as satisfied by Locale Layer's existing
  "holds the manual override when set." Architecture's text doesn't
  explicitly confirm that "holds" survives across visits versus only the
  current in-memory session — this Design assumes the cross-visit
  reading, since only that satisfies Commitment 5 and Context's
  client-side-persistence constraint. This is a gap for
  `project-architecture` to confirm/clarify, not something this phase
  resolves — mirrors how `section-navigation`'s Technical Design flagged
  and proceeded past a similar Architecture gap.

**Contract Traceability**

- Commitment 1 (Two-Language Availability) — supported-language-set
  consumption; "present exactly two options" Responsibility.
- Commitment 2 (Active-State Indication) — "Active-state reflection."
- Commitment 3 (Immediate In-Place Switch) — "Selection signal,"
  no-reload Constraint; realized jointly with Locale Layer's existing
  resolution responsibility.
- Commitment 4 (No-Op on Re-Selection) — "Identical-selection guard,"
  Design Decision 2.
- Commitment 5 (Persisted Override Across Visits) — realized by Locale
  Layer's existing "holds the manual override" responsibility (flagged
  assumption above); this component only signals.

## Cross-Component Relationships

- App Shell → Language Override Control: composes/hosts it (Existing
  pattern, per Architecture).
- Language Override Control → Locale Layer: reads active locale, signals
  language changes, consumes supported-language set.
- Language Override Control ⇸ Section Nav: explicitly no dependency.
- Language Override Control ⇸ Hero Section, About Section, Contact
  Section (internals): no direct dependency.

No circular dependencies: App Shell composes Language Override Control
inbound only; the control's one outbound reference to Locale Layer (read
+ signal) is a service collaboration — Locale Layer has no dependency
back on it specifically.

---

*Created: 2026-09-01*
