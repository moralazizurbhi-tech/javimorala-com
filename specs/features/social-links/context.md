# Feature Context: Social Links

## Problem

A visitor who isn't ready to commit to direct email contact still wants a
lower-commitment way to connect with or follow Javi, via his existing social
profiles (Instagram, LinkedIn) — as a secondary, complementary channel
alongside (not a replacement for) `email-contact`'s primary channel. That
option needs to be available at two distinct visitor moments: immediately on
arrival (Hero, for a visitor who's already decided) and at the point of
contact decision (Contact, paired with the primary email device).

## Motivation

Serves the Connection domain's "Reach out" goal (Project UX: a visitor
"follows an external link (social/email) to actually make contact") and the
site's Vision of being a credible reference point visitors can act on — by
not gating connection behind a single high-commitment channel or a single
page moment.

## Scope

### Included

- The need for a lower-commitment, secondary way to connect with/follow
  Javi via existing social profiles, distinct from and complementary to
  `email-contact`'s primary channel.
- The need for that option to exist at two distinct visitor moments: on
  arrival (Hero) and at the contact decision point (Contact).
- The need for the group to present the same identity/behavior consistently
  across both.

### Excluded

- How a visitor arrives at the Hero or Contact view — `section-navigation`'s
  / free-scroll's problem.
- The primary email contact device's own need — `email-contact`'s problem.
- The persistent nav and the About view — no instantiation here, per the
  refined Feature Definition.
- Motion/animation concerns — `motion-interaction`.
- The localization mechanism itself — `content-localization`.
- Any solution shape: icon treatment, visual styling, interaction detail,
  copy — belongs to Feature Solution/UX/Technical Design.

## Constraints

- No backend, server, or API call may resolve a social-channel action —
  native browser links only (outbound URLs to Instagram/LinkedIn).
- No on-site form and no visitor data collection — the group only opens
  external links.
- No accounts or persistence anywhere in the system.
- Any label/accessible text must be authored directly in English and
  Spanish — no automated translation — though rendering the right one is
  `content-localization`'s job.
- The two placements must present the same reusable device, not two
  independently designed link groups, per the Feature Definition's
  cohesive-responsibility requirement.

## Known Dependencies

- `hero-presentation` — hosts this Feature's Hero-view placement.
- `email-contact` — hosts this Feature's Contact-view placement; co-located
  as the secondary channel alongside the primary email device.
- `content-localization` — resolves any label text into the visitor's
  active language.
- `motion-interaction` — cross-cutting motion applied to Hero/Contact
  elements.
- Project Architecture's Contact Section note: outbound-only native browser
  links (mailto/social URLs), no in-app network call — applies equally
  here.

---

*Created: 2026-08-31*
