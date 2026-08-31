# Technical Design: Social Links

## Technical Components

### Social Link Group

Proposed new component, composed directly by Project Architecture's App
Shell (Existing) as a sibling within both the Hero view and the Contact
view — preserving `hero-presentation`'s and `email-contact`'s Technical
Designs, both of which explicitly declare no dependency on `social-links`.

**Purpose**

Realize `social-links`' Feature Contract by providing one reusable
component, instantiated identically within both the Hero and Contact
views, exposing two independent, session-preserving outbound triggers
(Instagram, LinkedIn).

**Responsibilities**

- Render two independently activatable triggers, one per channel
  (Instagram, LinkedIn).
- Resolve each trigger to the single correct destination URL for its
  channel, consistently regardless of session, locale, or host view.
- Ensure activation preserves the visitor's current position on the site
  (non-navigating outbound behavior).
- Present as one reusable definition instantiated identically wherever
  composed — no per-instantiation variation in trigger set or
  destinations.

**Owned Concepts**

- *Channel trigger* — an independently activatable element mapped 1:1 to
  a social channel and its destination. Owned exclusively here.
- *Cross-instantiation consistency* — the requirement that every
  instantiation of this component expose the same set of channel
  triggers resolving to the same destinations, regardless of which view
  hosts it. Owned exclusively here.
- *Session-preserving activation* — the behavior that activating a
  trigger doesn't replace or navigate away from the current page. Owned
  exclusively here (the concrete mechanism is Implementation).

**Collaborations**

- Instantiated by App Shell within the Hero view (alongside Hero
  Section) and within the Contact view (alongside the Email Contact
  Device) — composed, not composing.
- Consumes locale-resolved label text from the Locale Layer (Existing
  pattern).
- Uses the Animation Layer for any interaction/motion presentation;
  motion behavior itself is `motion-interaction`'s decision.
- Consumes the Styling System's shared visual tokens/mixins; concrete
  visual/interaction treatment deferred to Feature UX.

**Dependencies**

- Locale Layer (content resolution).
- Animation Layer (interaction presentation mechanics).
- Styling System (visual tokens).

**Constraints**

- Must not depend on or invoke `section-navigation`'s, `hero-presentation`'s
  (Hero Section), or `email-contact`'s (Email Contact Device) components —
  excluded from this Feature's boundary; composition flows inbound from
  App Shell only.
- Must not implement or request any in-app form submission or
  backend/API call — outbound native links only (per Project
  Architecture: Contact/Connection resolves outbound only via native
  browser links).
- Must not vary trigger destinations by locale, session, or which view
  hosts the instantiation — a single canonical destination pair.
- Must not decide concrete visual/interaction treatment, icon assets, or
  trigger ordering — Feature UX.

**Design Decisions**

- Modeled as a single reusable component instantiated twice by App
  Shell, not as two independently designed components (one per view) —
  directly reflects Contract Commitment 2's identical-cross-placement
  requirement and the Feature Definition's "one consistent device"
  requirement.
- Not modeled with any runtime coordination/state between its two live
  instances — consistency is structural (same component definition,
  same data), not an inter-instance synchronization mechanism. Avoids
  inventing coordination the Contract doesn't require.
- The two channel triggers are modeled as two owned concepts within one
  component, not as two separate components — Commitment 1 requires
  them to activate independently (AC2) while being exposed as one group
  (AC1); parallel owned concepts within a single component reflects that
  without over-splitting.
- Session-preserving activation is modeled as this component's own
  required behavior, not delegated to whichever view hosts it — it is
  identical regardless of host, so the host views should not need to
  implement or know about it.
- App Shell is the composer of both instantiations, rather than Hero
  Section / Email Contact Device — required to preserve those Features'
  existing Technical Designs, which explicitly declare no dependency on
  `social-links`.

**Contract Traceability**

- Commitment 1 (Independent Per-Channel Triggers) — Responsibility 1,
  Owned Concept "Channel trigger," Design Decision 3, no-form/backend
  Constraint.
- Commitment 2 (Consistent Presence Across Placements) — Responsibility
  4, Owned Concept "Cross-instantiation consistency," Design Decisions
  1 & 2.
- Commitment 3 (Session-Preserving Activation) — Responsibility 3, Owned
  Concept "Session-preserving activation," Design Decision 4.

## Cross-Component Relationships

- App Shell → Social Link Group (Hero instantiation): composes it within
  the Hero view, alongside Hero Section, without Hero Section depending
  on it.
- App Shell → Social Link Group (Contact instantiation): composes it
  within the Contact view, alongside the Email Contact Device, without
  the Email Contact Device depending on it.
- Social Link Group → Locale Layer: consumes resolved label text
  (Existing pattern).
- Social Link Group → Animation Layer: supplies elements for interaction
  presentation; no state/coordination concept exposed.
- Social Link Group → Styling System: consumes shared visual tokens
  (Existing pattern).
- Social Link Group ⇸ `section-navigation`, Hero Section, Email Contact
  Device: explicitly no dependency (boundary preserved; composition is
  inbound-only from App Shell).

No circular dependencies: Social Link Group depends outward on Locale
Layer, Animation Layer, and Styling System; App Shell composes it inbound
only (twice); none depend back.

---

*Created: 2026-08-31*
