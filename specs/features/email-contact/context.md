# Feature Context: Email Contact

## Problem

A visitor who reaches the Contact view and wants to actually email Javi
needs a direct, prominent, primary way to do so from that view — distinct
from and more prominent than the secondary social links — consistent with
the legacy site's headline-scale "Send Me An E-Mail" treatment that Project
UX names as a strength worth carrying forward, and consistent with the
site's own architecture, which requires contact to resolve through a native
mailto link rather than an in-app form.

## Motivation

Completes the Connection domain's "Reach out" goal, and directly serves the
site's Vision of being a credible professional/personal reference point
that visitors (potential employers, collaborators, personal contacts) can
actually act on, not just read about.

## Scope

### Included

- The need to present a direct, primary, headline-scale device inviting a
  visitor to email Javi as the Contact view's main channel.
- The need for that device to also carry the view's sign-off/closing
  message (per Feature Definition — one cohesive element).
- The need for the device to function as the observable trigger of an
  outbound email action.

### Excluded

- How a visitor arrives at the Contact view — `section-navigation`'s
  problem.
- The social link group's own need — `social-links`' problem.
- Motion/animation concerns — `motion-interaction`.
- The localization mechanism itself — `content-localization`.
- Any solution shape: exact copy, visual treatment, obfuscation technique,
  interaction detail — belongs to Feature Solution/UX/Technical Design.

## Constraints

- No backend, server, or API call may resolve the contact action — must be
  a native browser link (mailto).
- No on-site form and no visitor data collection — contact resolves via
  external links only.
- No accounts or persistence anywhere in the system.
- Content must be authored directly in both English and Spanish (no
  automated translation) — the device's copy needs bilingual authoring,
  though rendering the right one is `content-localization`'s job.
- Known domain concern: a plain-text email address in a mailto link is
  exposed to scraping/harvesting. Acknowledged as a constraint to weigh
  during Feature Solution design — no mitigation technique decided here.

## Known Dependencies

- `section-navigation` — enables reaching the Contact view where this
  device lives.
- `social-links` — co-located, secondary contact channel in the same view.
- `content-localization` — resolves the device's copy into the visitor's
  active language.
- `motion-interaction` — cross-cutting motion applied to Contact elements.
- Project Architecture's Contact Section — outbound-only native browser
  links, no in-app network call.

---

*Created: 2026-08-31*
