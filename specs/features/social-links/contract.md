# Feature Contract: Social Links

## Contract Commitments

### Commitment 1 — Independent Per-Channel Triggers

Relationship to Solution: resolves Behaviour 1 (two independent triggers;
activating one doesn't affect the other), the no-form/no-backend Rule, and
the same-destination-every-time Rule. Resolves Feature Context's inherited
"outbound native links only" constraint and the core need for a working
secondary channel.

**Acceptance Criteria**

- AC1: The group exposes exactly two independently activatable triggers —
  one for Instagram, one for LinkedIn.
- AC2: Activating one trigger opens only that channel's external profile;
  it does not affect or activate the other trigger.
- AC3: Activating a trigger initiates a native outbound link only — never
  an in-app form, in-app data submission, or backend/API call.
- AC4: Each trigger resolves to the same single correct destination URL
  for its channel every time, regardless of visitor session, state, or
  locale.

**Validation Scenarios**

- Scenario A — Standard activation of each trigger
  - Success Condition: activating the Instagram trigger opens Javi's
    Instagram profile; activating the LinkedIn trigger opens Javi's
    LinkedIn profile; neither triggers a form submission or backend call.
  - Failure Condition: activation opens the wrong destination, triggers a
    form/backend call, or activates both triggers at once.
- Scenario B — Repeated/varied-session activation
  - Success Condition: the resolved destination for each trigger is
    identical across repeated activations and across sessions/locales.
  - Failure Condition: a trigger's destination differs across activations
    or locales.

### Commitment 2 — Consistent Presence Across Placements

Relationship to Solution: resolves Behaviour 2, the
identical-pair-across-placements Rule, and the
exactly-two-triggers-applied-identically Constraint. Resolves Feature
Context's need for the same channel to exist at two distinct visitor
moments (Hero, Contact).

**Acceptance Criteria**

- AC1: The Hero placement and the Contact placement each expose the same
  two triggers (Instagram, LinkedIn), resolving to the same two
  destinations.
- AC2: Activating a given channel's trigger behaves identically whether
  done from the Hero placement or the Contact placement.
- AC3: No placement exposes a subset, superset, or a different
  destination for either channel compared to the other placement.

**Validation Scenarios**

- Scenario — Cross-placement comparison
  - Success Condition: Hero and Contact both expose Instagram+LinkedIn
    triggers resolving to matching destinations, and activating either
    from either placement produces the same outcome.
  - Failure Condition: one placement is missing a trigger, has an extra
    trigger, or a trigger's destination differs between placements.

### Commitment 3 — Session-Preserving Activation

Relationship to Solution: resolves Behaviour 3 and the session-preserving
Constraint. Resolves the Solution's explicit requirement that using this
secondary channel doesn't cost the visitor their place on the site.

**Acceptance Criteria**

- AC1: Activating either trigger opens the destination in a manner that
  does not replace or navigate away from the current site page.
- AC2: After activation, the visitor's original position/state on the
  site remains available.

**Validation Scenarios**

- Scenario — Visitor activates a trigger
  - Success Condition: the external channel opens without the current
    site page being replaced/navigated away from; the visitor's site
    position is preserved.
  - Failure Condition: activation replaces the current page, causing the
    visitor to lose their place on the site.

---

*Created: 2026-08-31*
