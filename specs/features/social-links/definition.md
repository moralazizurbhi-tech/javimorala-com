# Feature Definition: Social Links

## Identity

- **id:** `social-links`
- **name:** Social Links
- **purpose:** Let an interested visitor reach Javi's social channels
  (Instagram, LinkedIn) through one consistent, reusable link group presented
  wherever the site offers a contact/identity touchpoint.

## Cohesive Functional Responsibility

Provide the reusable social channel link group — the Instagram/LinkedIn
icon+label pairing and the mechanism by which a visitor opens each channel —
as one consistent device instantiated across the Hero, Contact, and
persistent-nav placements.

## Functional Boundary

### Included

- Presenting the Instagram/LinkedIn icon+label pairing as one reusable link
  group.
- The observable mechanism by which a visitor opens each social channel from
  the group.
- Keeping the group's identity and behavior consistent wherever it is
  instantiated — Hero, Contact, and persistent nav (desktop inline + mobile
  overlay).

### Excluded

- The Hero view's overall composition hosting the group — owned by
  `hero-presentation`.
- The Contact view's overall composition hosting the group — owned by
  `email-contact`.
- The persistent nav's own structure, other nav destinations, and
  mobile-overlay mechanics hosting the group — owned by `section-navigation`.
  Social-links owns the group itself in all three placements; each host owns
  only its own compositional placement.
- Any motion/animation behavior applied to the link group — owned by
  cross-cutting `motion-interaction`.
- Resolving/rendering label text into the visitor's active language — owned
  by `content-localization`.
- Actual icon assets/visual styling, detailed interaction behavior, and
  visual/interaction specification — belong to later phases (Feature
  Context/UX), not Definition.

## Acknowledged Functional Dependencies

- **`content-localization`** — any label text must render in the visitor's
  active language; the localization mechanism itself is not owned here.
- **`hero-presentation`** — hosts the group's Hero-view placement.
- **`email-contact`** — hosts the group's Contact-view placement.
- **`section-navigation`** — hosts the group's persistent-nav placement;
  catalog relationship states `section-navigation` "enables" `social-links`.
- **`motion-interaction`** — cross-cutting; applies to social-links elements
  per catalog relationship, but defines the motion behavior itself elsewhere.

## Relationship to Catalog / Capabilities

- Realizes capability `contact-links`: "Provide direct links to external
  contact channels (email, social) so an interested visitor can reach
  Javi" — the social portion specifically; the email portion is realized by
  `email-contact`.
- Catalog relationship: `section-navigation` "enables" `social-links` (among
  others).
- No other Feature-to-Feature relationship is recorded on the `social-links`
  catalog entry itself; the dependencies above are inferred from
  `section-navigation`'s and `motion-interaction`'s recorded relationships,
  this conversation's confirmation of the nav-placement boundary, and Project
  UX's Screens/UI Components description of shared Hero/Contact/nav
  co-location.

## Pending (out of scope for this phase)

Detailed content/copy, use cases, acceptance criteria, solution design,
observable contract, UX specification, technical design, implementation.

---

*Created: 2026-08-31*
