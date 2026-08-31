# Feature Definition: Social Links

## Identity

- **id:** `social-links`
- **name:** Social Links
- **purpose:** Let an interested visitor reach Javi's social channels
  (Instagram, LinkedIn) through one consistent, reusable link group presented
  in the Hero and Contact views.

## Cohesive Functional Responsibility

Provide the reusable social channel link group — the Instagram/LinkedIn
icon+label pairing and the mechanism by which a visitor opens each channel —
as one consistent device instantiated across the Hero and Contact
placements.

## Functional Boundary

### Included

- Presenting the Instagram/LinkedIn icon+label pairing as one reusable link
  group.
- The observable mechanism by which a visitor opens each social channel from
  the group.
- Keeping the group's identity and behavior consistent across its two
  instantiations — Hero and Contact.

### Excluded

- The Hero view's overall composition hosting the group — owned by
  `hero-presentation`.
- The Contact view's overall composition hosting the group — owned by
  `email-contact`.
- The persistent nav and its mobile overlay — do not host the social link
  group; nav destinations and structure remain entirely `section-navigation`'s,
  with no social-links instantiation inside it.
- The About view — does not get its own instantiation of the group.
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
- **`motion-interaction`** — cross-cutting; applies to social-links elements
  per catalog relationship, but defines the motion behavior itself elsewhere.

## Relationship to Catalog / Capabilities

- Realizes capability `contact-links`: "Provide direct links to external
  contact channels (email, social) so an interested visitor can reach
  Javi" — the social portion specifically; the email portion is realized by
  `email-contact`.
- **Unresolved conflict, flagged not fixed here:** the `social-links` Feature
  Catalog entry's responsibility text still names a "nav placement," and its
  recorded relationship "`section-navigation` enables `social-links`" was the
  basis for a nav-hosting dependency this Definition no longer carries.
  Requires review by `feature-catalog-organization`.
- **Unresolved conflict, flagged not fixed here:** Project UX's "Persistent
  nav" UI Component (`project-ux.md`) still lists social icons (Instagram,
  LinkedIn) as part of nav. Requires review by `project-ux`.
- The Hero/Contact dependencies above are inferred from shared view
  co-location and the sibling Feature Definitions' (`hero-presentation`,
  `email-contact`) own exclusions naming `social-links`.

## Pending (out of scope for this phase)

Detailed content/copy, use cases, acceptance criteria, solution design,
observable contract, UX specification, technical design, implementation.

---

*Created: 2026-08-31*
