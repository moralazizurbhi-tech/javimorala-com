# Feature Definition: Section Navigation

## Identity

- **id:** `section-navigation`
- **name:** Section Navigation
- **purpose:** Let a visitor move directly between sections via a persistent
  nav — inline on desktop, overlay on mobile — as a shortcut alongside free
  scrolling, enabling the primary capabilities rather than standing as an end
  goal in itself.

## Cohesive Functional Responsibility

Let a visitor jump directly to a section via a persistent nav, presented
responsively (inline desktop / overlay mobile), alongside free scroll —
enabling the capability-realizing Features rather than standing as an end
goal itself. The Feature owns the nav's destination structure, the
responsive inline/overlay presentation split, the scroll-anchor jump
mechanism, and the overlay's open/select/dismiss behavior — not the content
or composition of the views it links to.

## Functional Boundary

### Included

- Presenting the persistent nav's destination structure (Home/wordmark,
  About, Contact).
- The responsive presentation split: nav rendered inline on desktop; nav
  rendered behind a menu trigger + overlay on mobile.
- The observable mechanism by which a visitor scroll-anchors directly to a
  section from either presentation.
- The mobile overlay's own behavior: trigger to open, destination selection
  scroll-anchors and closes it, and dismissal without selecting a
  destination.
- Coexisting with free scroll as an equally valid, non-exclusive way to move
  between views — nav is a shortcut, never a requirement.

### Excluded

- Content/composition of the views nav links to — owned by
  `hero-presentation`, `about-narrative`, `email-contact`.
- The social link group and its icons — owned by `social-links`.
  **Unresolved conflict, flagged not fixed here:** Project UX's "Persistent
  nav" UI Component (`project-ux.md`) still lists social icons (Instagram,
  LinkedIn) as part of nav, and this Feature's own catalog entry records
  `section-navigation` "enables" `social-links`, which could be read as
  co-location. Both are in tension with `social-links`' own Definition,
  which already excludes nav-hosting and flags the same conflict for
  `project-ux` review. This Definition treats social icons as excluded from
  the nav pending that resolution.
- The wordmark/logo's visual design/asset itself — shared substrate
  ("Ornamental mark" per `feature-catalog.md`'s excluded-from-Feature-status
  note); only its use as the nav's Home-destination link is included here.
- Any motion/animation behavior applied to nav elements (inline or overlay)
  — owned by cross-cutting `motion-interaction`.
- Resolving/rendering nav destination labels into the visitor's active
  language — owned by `content-localization`.
- Actual destination label copy and detailed overlay visual/interaction
  specification — belong to later phases (Feature Context/UX), not
  Definition.

## Acknowledged Functional Dependencies

- **`hero-presentation`**, **`about-narrative`**, **`email-contact`** —
  the nav's Home/About/Contact destinations scroll-anchor into these views;
  section-navigation depends on each exposing a stable anchor point, without
  owning the view's own content/composition.
- **`social-links`** — catalog records `section-navigation` "enables"
  `social-links`, but per `social-links`' own Definition and this
  Definition's Excluded section, nav does not host the social link group;
  treated here as reachability adjacency only, pending the flagged
  project-ux/catalog conflict.
- **`content-localization`** — nav destination labels must render in the
  visitor's active language; the localization mechanism itself is not owned
  here.
- **`motion-interaction`** — cross-cutting; applies to nav elements (inline
  and overlay) per catalog relationship, but defines the motion behavior
  itself elsewhere.

## Relationship to Catalog / Capabilities

- Realizes capability `section-navigation` (Capability Catalog, Supporting):
  "Let a visitor move directly between sections via a persistent nav —
  inline on desktop, overlay on mobile — as a shortcut alongside free
  scrolling. Enables the primary capabilities rather than standing as an end
  goal in itself."
- Unlike the sibling Features' Definitions, the `enables hero-presentation,
  about-narrative, email-contact, social-links` relationship is recorded
  directly on this Feature's own `feature-catalog.md` entry rather than
  inferred from others'.
- **Unresolved conflict, flagged not fixed here:** see Excluded section
  above — Project UX's "Persistent nav" UI Component and this catalog
  entry's `social-links` relationship both conflict with `social-links`'
  own Definition. Already flagged there for `project-ux` review; carried
  forward here since it directly affects this Feature's boundary.

## Pending (out of scope for this phase)

Detailed destination copy, use cases, acceptance criteria, solution design,
observable contract, UX specification (mobile overlay visual treatment),
technical design, implementation.

---

*Created: 2026-08-31*
