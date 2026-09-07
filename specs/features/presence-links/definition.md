# Feature Definition: Presence Links

**Status:** Approved

## Identity

- **id:** `presence-links`
- **name:** Presence Links
- **purpose:** Let an interested visitor discover Javi's broader online
  presence through links to his external profiles (social/professional),
  distinct from and secondary to direct contact.

## Cohesive Functional Responsibility

Provide the set of external profile links (social/professional) and the
observable mechanism by which a visitor opens each one, presented
consistently wherever it's composed in — the Hero moment and the
Connection screen — without owning either host composition itself.

## Functional Boundary

### Included

- Presenting the external profile links (content/list) as one coherent
  set.
- The observable mechanism by which a visitor opens each linked channel.
- Keeping the link set's identity and behavior consistent across its two
  instantiations (Hero, Connection screen).

### Excluded

- The Hero screen's overall composition/coordination — owned by
  `hero-presentation`, which coordinates this Feature's placement there as
  a minor/secondary element.
- The Connection screen's overall composition/coordination — owned by
  `direct-contact`, which coordinates this Feature's placement there,
  secondary to its CTA.
- Any independent persistent-nav destination — this Feature has no nav
  anchor of its own; it is reached only via whichever screen hosts it
  (`section-navigation` owns the nav itself).
- Any motion/animation behavior — owned by cross-cutting
  `motion-interaction`.
- Resolving/rendering link labels into the visitor's active language —
  owned by `content-localization`.
- Any work/project catalog or portfolio showcase — excluded project-wide
  (Project Design's Design Constraints).
- The actual set of profiles/platforms, link copy/labels, icon assets, and
  visual/interaction specification — belong to later phases (Feature
  Context/UX), not Definition.

## Acknowledged Functional Dependencies

- **`hero-presentation`** — composes/coordinates this Feature's
  Hero-moment instantiation.
- **`direct-contact`** — composes/coordinates this Feature's
  Connection-screen instantiation, secondary to its CTA.
- **`content-localization`** — link labels must render in the visitor's
  active language; the localization mechanism itself is not owned here.
- **`motion-interaction`** — cross-cutting; applies to this Feature's
  elements per catalog relationship, but defines the motion behavior
  itself elsewhere.
- **`accessibility`** — cross-cutting; applies to this Feature's elements
  per catalog relationship.

## Relationship to Catalog / Capabilities

- Realizes capability `presence-links`.
- **Unresolved conflict, flagged not fixed here:** the Feature Catalog
  records `section-navigation` as "enabling" `presence-links` directly,
  but this Definition finds no independent nav anchor — Presence Links is
  reached only through its two host compositions (`hero-presentation`,
  `direct-contact`). Requires review by Feature Discovery/Catalog
  Organization.
- No Feature-to-Feature relationship for the Hero-composition or
  Connection-screen-composition relationships is recorded on the
  `presence-links` catalog entry itself; both are inferred from
  `hero-presentation`'s and `direct-contact`'s own Definitions.

## Pending (out of scope for this phase)

- The actual set of profiles/platforms, link copy/labels, and icon
  assets — resolved with an authoritative value (or explicit Pending
  marker) in the Feature UX Specification's "Content and Assets" section,
  once the Feature is Closed.
- Detailed visual/positional relationship within each host composition —
  UX/UI phases.
- Also pending, per the same skill boundary: use cases, acceptance
  criteria, solution design, observable contract, technical design,
  implementation.

---

*Created: 2026-09-07*
