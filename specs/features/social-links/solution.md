# Feature Solution: Social Links

## Solution Intent

### Functional Objective

Provide an interested visitor with a lower-commitment, secondary way to
reach or follow Javi through his existing social channels (Instagram,
LinkedIn), available identically at both the point of arrival (Hero) and
the point of contact decision (Contact), resolving the Feature Context's
need for a connection option that doesn't gate on the single
high-commitment email channel or a single page moment — while preserving
the visitor's place on the site when they use it.

## Solution Behaviour

### Behaviours

- The group presents two independent triggers, one per social channel
  (Instagram, LinkedIn); activating either opens that channel's external
  profile — the other trigger is unaffected.
- The same pair of triggers, resolving to the same two destinations,
  appears in both the Hero and Contact placements — activating a given
  channel's trigger behaves identically regardless of which placement it
  was activated from.
- Activating a trigger opens the destination in a way that preserves the
  visitor's current position on the site (does not replace the current
  page).

### Flows

- Visitor reaches the Hero or Contact view (out of scope — hosted by
  `hero-presentation` / `email-contact`) → group renders with
  locale-resolved labels → visitor activates one trigger → the
  corresponding external social channel opens in a way that preserves the
  visitor's site session → visitor may continue browsing the site or has
  moved to the external channel.

### Rules

- Each trigger always resolves to the same single correct destination URL
  for its channel — no state-, locale-, or session-dependent variation.
- The two placements must expose the identical pair of triggers/
  destinations — no placement may show a subset, superset, or a different
  target for the same channel.
- Activating a trigger must never route through an in-app form, in-app
  data collection, or backend/API call — purely a native outbound link.
- No no-client-style fallback path is required — unlike `email-contact`'s
  mailto dependency, an outbound web link to a social profile has no
  equivalent "isn't configured" failure mode.

### States and Transitions

None identified. Each trigger is an independent, stateless outbound link;
there is no interactive state beyond the two rendered triggers.

### Constraints

- Preserving the visitor's site session on activation is a required
  behavior, not optional — introduced by this Solution, distinct from
  Context's inherited constraints.
- Exactly two triggers, exactly two destinations, applied identically
  across both placements — no per-locale or per-placement variation.

### Boundaries

#### Included

- Rendering two independent triggers (Instagram, LinkedIn) as one group,
  present in both the Hero and Contact placements.
- Triggering a native outbound link to the correct external profile per
  channel.
- Guaranteeing the same set of triggers/destinations across both
  placements.
- Preserving the visitor's site session when a trigger is activated.

#### Excluded

- Visual/interaction specification, icon assets, visual ordering, and
  label copy (Feature UX).
- The actual profile URLs/content values themselves (content data, not
  functional Solution).
- Motion/animation (`motion-interaction`).
- The localization mechanism itself (`content-localization`) — though
  trigger labels must be locale-resolved.
- The Hero/Contact view's own composition hosting the group
  (`hero-presentation` / `email-contact`).
- Nav and About placement (already excluded at Feature Definition level).

---

*Created: 2026-08-31*
