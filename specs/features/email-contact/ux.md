# Feature UX Specification: Email Contact

## UX Scope

Specializes Project UX's Contact view (Screens) and the email portion of
the "Reach out" User Flow, plus the global UX Constraints — for the
primary email-initiation device and its persistently available fallback.
Consistent with Feature Solution/Contract's boundary: excludes nav,
social links, motion timing/sequencing, the localization mechanism, the
address-exposure technique, and actual copy.

## User Flows

### Email reach-out

Specializes Project UX's "Reach out" flow (email portion; the social
portion is `social-links`' own specialization, not redefined here).

- Visitor reaches the Contact view (nav or scroll, not redefined here) →
  sees the Email Contact Device (primary trigger + sign-off message) and
  its fallback affordance presented together → visitor activates the
  primary trigger → visitor's email client opens addressed to Javi →
  visitor completes/sends the message in their own client (outside this
  Feature's scope).
- Alternative continuation: visitor uses the fallback affordance instead
  of, or in addition to, the primary trigger to obtain the address
  directly → visitor manually initiates contact outside the site
  (outside this Feature's scope).

## Screens

### Contact view

Existing identity, from Project UX's Screens.

- Purpose: present the closing sign-off message and enable the visitor
  to actually reach out via email, per Project UX's "closing: sign-off
  message… encouragement to connect." Participates in the Email
  reach-out flow.
- The persistent nav, wordmark, and social link group appearing in the
  same view are owned by `section-navigation`/`social-links`
  respectively — not redefined here.
- Composition direction is open, consistent with the legacy design's
  headline-scale "Send Me An E-Mail" treatment (Project UX's legacy
  Strengths reference) reinterpreted with modern execution; exact layout
  is Pending, left to detailed visual design.
- Mobile treatment must be purpose-built, not a generic reflow (Existing,
  global constraint); mechanism/specifics Pending.

## Interaction States

- **Default/composed** — the single steady state where the primary
  trigger (headline-scale device + sign-off message) and the fallback
  affordance are both presented together; the only steady state, since
  the fallback is always available rather than conditionally revealed.
- **Reduced-motion** — per Project UX's mandatory reduced-motion
  fallback, the accessibility variant in which the composition still
  reaches its complete/composed state without relying on animated
  entrance, if any entrance motion is applied.

## Feature Components

- **Email Contact Device** — Feature-specific primary trigger that
  doubles as the Contact view's sign-off/closing message (Feature
  Definition; Contract Commitment 4); new, specializing the Contact
  view's general "sign-off message… encouragement to connect"
  description — not a Project UX-named component.
- **Fallback address affordance** — Feature-specific secondary,
  persistently visible element presented alongside the Email Contact
  Device, giving the visitor another way to obtain Javi's address
  (Contract Commitment 3); new — not a Project UX-named component.

## UX Constraints

- Composition must express within the existing visual identity —
  dark-only, single accent, two-tier typography (global, reaffirmed).
- The primary trigger must remain a headline-scale treatment, consistent
  with Feature Definition's identity and the legacy design's named
  Strength — never reduced to a conventional small button.
- The fallback affordance, though persistently visible, must not expose
  the address as literal scrapable plain text — carries Contract
  Commitment 2's requirement into the always-visible presentation.
- Reduced-motion fallback is mandatory for any motion applied to this
  Feature's presentation (global).
- Desktop, tablet, and mobile must each receive a purpose-built
  treatment, not a generic reflow (global).
- Perceived performance must not be compromised by visual richness
  (global).

---

*Created: 2026-08-31*
