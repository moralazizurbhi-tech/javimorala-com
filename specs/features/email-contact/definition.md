# Feature Definition: Email Contact

## Identity

- **id:** `email-contact`
- **name:** Email Contact
- **purpose:** Provide the signature, headline-scale "Send Me An E-Mail"
  device as the Contact view's primary channel for an interested visitor to
  reach Javi.

## Cohesive Functional Responsibility

Present the "Send Me An E-Mail" device as one cohesive element that
simultaneously serves as the Contact view's sign-off/closing message, its
encouragement to connect, and its primary contact-initiation mechanism —
replacing a conventional button or form with a large, headline-scale
treatment.

## Functional Boundary

### Included

- Presenting the headline-scale "Send Me An E-Mail" device as the Contact
  view's primary channel.
- Carrying the sign-off / encouragement-to-connect messaging as part of that
  same device, not as a separate element.
- The observable mechanism by which a visitor initiates email contact
  through the device.

### Excluded

- The persistent nav appearing within the Contact view — owned by
  `section-navigation`.
- The social link group (Instagram, LinkedIn) appearing within the Contact
  view — owned by `social-links`.
- Any motion/animation behavior applied to Contact elements — owned by
  cross-cutting `motion-interaction`.
- Resolving/rendering text into the visitor's active language — owned by
  `content-localization`.
- Actual CTA copy/wording, detailed interaction behavior, and visual/
  interaction specification — belong to later phases (Feature Context/UX),
  not Definition.

## Acknowledged Functional Dependencies

- **`content-localization`** — the device's text must render in the
  visitor's active language; the localization mechanism itself is not owned
  here.
- **`section-navigation`** — co-located in the Contact view; catalog
  relationship states `section-navigation` "enables" `email-contact`.
- **`social-links`** — co-located in the Contact view as an adjacent,
  separately-owned element.
- **`motion-interaction`** — cross-cutting; applies to Contact elements per
  catalog relationship, but defines the motion behavior itself elsewhere.

## Relationship to Catalog / Capabilities

- Realizes capability `contact-links`: "Provide direct links to external
  contact channels (email, social) so an interested visitor can reach
  Javi" — the email portion specifically; the social portion is realized by
  `social-links`.
- No Feature-to-Feature relationship is recorded on the `email-contact`
  catalog entry itself; the dependencies above are inferred from the
  *other* Features' recorded relationships (`section-navigation` enables
  it; `motion-interaction` applies across it) plus shared Contact-view
  co-location with `social-links` and the Project UX Contact view
  description.

## Pending (out of scope for this phase)

Detailed content/copy, use cases, acceptance criteria, solution design,
observable contract, UX specification, technical design, implementation.

---

*Created: 2026-08-31*
