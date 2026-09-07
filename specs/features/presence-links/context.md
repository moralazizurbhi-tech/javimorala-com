# Feature Context: Presence Links

**Status:** Approved

## Problem

A visitor who isn't ready to commit to direct contact still wants a
lower-commitment way to connect with or follow Javi via his existing
external profiles — distinct from and complementary to Direct Contact's
primary channel. That option needs to be available at two distinct
visitor moments: a light-touch glimpse immediately on arrival
(Introduction), and the fuller presentation at the point of contact
decision (Connection).

## Motivation

Serves Project Context's Vision — "success means Javi's identity and
vision come through genuinely to whoever encounters it" — by not gating
connection behind a single high-commitment channel or a single page
moment. Directly reflected in Project Design's Introduction and
Connection domain assignments (both revised to include Presence Links)
and Project UX's "Reach Javi" user flow, which already names following a
presence link as a valid path to connection.

## Scope

### Included

- The need for a lower-commitment, secondary way to connect with/follow
  Javi via his existing external profiles, distinct from and
  complementary to Direct Contact's primary channel.
- The need for that option to exist at two distinct visitor moments: a
  light-touch glimpse on arrival (Introduction) and the fuller
  presentation at the contact-decision point (Connection).
- The need for the link set to present the same identity/behavior
  consistently across both.

### Excluded

- How a visitor arrives at the Hero or Connection screen —
  `section-navigation`'s/free-scroll's problem.
- The primary direct-contact channel's own need — `direct-contact`'s
  problem.
- The Hero screen's own first-impression composition problem —
  `hero-presentation`'s problem.
- The Connection screen's own closing-resolution problem (CTA, farewell
  line) — `direct-contact`'s problem.
- Conveying who Javi is — `hero-presentation` / `about-narrative`'s
  problem.
- Resolving content into the visitor's language —
  `content-localization`'s problem.
- The site's motion/interaction feel in general — `motion-interaction`'s
  problem.
- Any on-site form, backend processing, or visitor data collection —
  excluded project-wide.
- Any work/project catalog or portfolio showcase — excluded project-wide.

## Constraints

- No backend, server, or API call may resolve a profile-link action —
  native browser links only.
- No on-site form and no visitor data collection (inherited, project-
  wide).
- No accounts or persistence anywhere in the system (inherited).
- Must express within the established visual identity, consistent with
  other screens.
- The two placements must present the same reusable link set/identity,
  not two independently designed groups.
- Must stay visually secondary/minor at both placements — secondary to
  the CTA at Connection, secondary to Hero's core elements at
  Introduction.
- No fixed deadline (inherited).

## Known Dependencies

- **`hero-presentation`** — hosts this Feature's Introduction/Hero-moment
  placement.
- **`direct-contact`** — hosts this Feature's Connection-screen
  placement, co-located alongside the primary CTA.
- **`content-localization`** — resolves any label text into the
  visitor's active language.
- **`motion-interaction`** — cross-cutting motion applied to elements in
  both placements.
- **`accessibility`** — cross-cutting; applies to elements in both
  placements.

---

*Created: 2026-09-07*
