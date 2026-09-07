# Technical Design: Language Override

**Status:** Approved

## Technical Components

### Language Switcher Component

**Purpose**

Realize the visible dropdown (trigger + list) per Feature UX/UI; on
explicit selection, write the override and navigate to the target
language's route.

**Responsibilities**

- Render a dropdown (trigger + list) hosted within `section-navigation`'s
  nav bar/mobile overlay (placement itself is `section-navigation`'s own
  responsibility; this component provides only the interactive element
  embedded there).
- On selecting a different language: invoke Override Store's write, then
  navigate to that language's route.
- On selecting the currently active language: no-op — no write, no
  navigation (Contract Commitment 2).
- Read the current override on render to indicate the active item (bold
  weight, per Feature UI).

**Owned Concepts**

- The selection-to-navigation mapping.
- The same-language no-op guard.

**Collaborations**

- **Override Store** — writes on selection; reads for the active
  indicator.
- **i18n/Routing Layer** (external, `content-localization`'s own
  component) — navigation target only; not read or written by this
  component.
- **Accessible Primitives Layer** (external, Architecture-level).

**Dependencies**

- Override Store — internal to this Feature.
- Accessible Primitives Layer — external.

**Constraints**

- Must not write to Override Store except from an explicit user selection
  (Commitment 3).
- Selecting the active language must be idempotent (Commitment 2).

**Design Decisions**

1. Implemented as a hydrated island (Project Architecture's islands
   model) — dropdown open/close and click handling require interactivity;
   no static-only realization is possible.
2. Built on the Accessible Primitives Layer (Radix UI), which Project
   Architecture explicitly names for "language switcher" — supplies the
   keyboard/ARIA menu semantics Feature UX's UX Constraints require,
   without this Feature re-implementing them.

**Contract Traceability**

- Commitment 1 → selection → navigate.
- Commitment 2 → same-language no-op.
- Contributes to Commitment 4 → reads Override Store to render the
  indicator.

### Override Store

**Purpose**

Own the technical concept of "the visitor's persisted language
override" — the sole place that sets, reads, and never clears it — and
expose it as the read-only interface `content-localization`'s
i18n/Routing Layer already declared as its dependency.

**Responsibilities**

- Persist a tri-state value (`unset` / `en` / `es` / `eu`), synchronously
  readable with no network round-trip — exactly the interface
  `content-localization`'s Technical Design already fixed as its
  requirement.
- Expose a write operation, invoked only by Language Switcher Component's
  explicit-selection handler.
- Expose a read operation consumed by: (a) i18n/Routing Layer's root
  bootstrap (external, read-only, per `content-localization`'s own
  design), and (b) Language Switcher Component, for the active-item
  indicator.
- Expose no clear/reset operation at all — there is no code path that
  removes a set override.

**Owned Concepts**

- The override value's storage/retrieval mechanism.
- Its tri-state shape.

**Collaborations**

- **Language Switcher Component** — writer and reader.
- **i18n/Routing Layer** (external) — read-only consumer, per
  `content-localization`'s already-declared dependency.

**Dependencies**

None internal; no outward dependency on either collaborator.

**Constraints**

- Synchronously readable, no network round-trip (inherited from
  `content-localization`'s Technical Design).
- Tri-state shape `unset`/`en`/`es`/`eu` (inherited, same source).
- No backend/server persistence — Project Architecture forbids any
  backend or API call — so this must be a durable, client-side-only
  browser storage mechanism, not a server-validated one.
- Must survive across visits/sessions — rules out in-memory-only state.

**Design Decisions**

1. Persisted via a durable, synchronously-readable client-side browser
   storage mechanism (the exact storage API is an Implementation-level
   choice, not fixed here, consistent with how `content-localization`'s
   own Technical Design left this same detail open).
2. No clear/reset operation exists in the interface — the technical
   enforcement of Contract Commitment 5's "no revert path," a deliberate
   omission rather than an incidental one.
3. The write operation is reachable only from Language Switcher
   Component's explicit-selection handler; no other code path (e.g., a
   direct-URL page load) may invoke it — technical enforcement of
   Commitment 3.
4. Failure behavior: if a write fails (storage blocked/unavailable), the
   current selection's navigation still proceeds (Commitment 1 is
   unaffected); only future-visit persistence silently degrades to fresh
   detection. No error state is surfaced — consistent with Feature UX
   defining no loading/error state for this Feature.

**Contract Traceability**

- Commitment 3 → write restricted to explicit selection.
- Commitment 4 → synchronous read exposed to i18n/Routing Layer.
- Commitment 5 → no clear operation.

## Cross-Component Relationships

- Language Switcher Component → Override Store: writes on explicit
  selection; reads to render the active indicator.
- Override Store → i18n/Routing Layer (external): read-only consumption,
  per `content-localization`'s own declared dependency; no reverse
  dependency.
- Language Switcher Component → i18n/Routing Layer (external): triggers
  navigation to the target locale route only; does not read/write its
  internals.
- Language Switcher Component → Accessible Primitives Layer (external,
  Architecture-level): built on Radix UI.

No circular dependencies: Override Store depends outward on nothing;
both other components depend on it or trigger navigation outward, never
the reverse.

---

*Created: 2026-09-07*
