# Feature Solution: Email Contact

## Solution Intent

### Functional Objective

Enable an interested visitor at the Contact view to initiate email contact
with Javi through one primary, prominent action, resolving the "Reach out
via email" need identified in Feature Context — while satisfying its
inherited constraints (mailto-only resolution, no backend/form/data
collection) and remaining usable even when the visitor has no configured
mail client.

## Solution Behaviour

### Behaviours

- The device renders as the Contact view's single, primary channel for
  initiating email contact; activating it opens the visitor's email
  client addressed to Javi.
- The device's text simultaneously functions as the view's sign-off/
  closing message (per Feature Definition) — there is no separate sign-off
  element.
- If activating the device does not result in a mail client opening (no
  client configured on the visitor's device), the visitor can still obtain
  Javi's email address through a fallback path.

### Flows

- Visitor reaches Contact view (out of scope — `section-navigation`) →
  device renders with locale-resolved text → visitor activates the
  device → visitor's email client opens addressed to Javi, **or**, if
  none opens, the visitor uses the fallback path to obtain the address →
  visitor completes/sends the message in their own client (outside this
  Feature's scope).

### Rules

- The device always resolves to the same single, correct destination
  address — no state-, locale-, or session-dependent variation.
- Activating the device must never route through an in-app form, in-app
  data collection, or backend/API call — only a native, purely
  client-side email-initiation mechanism is permitted.
- The address must not appear as directly-scrapable plain text anywhere
  in the rendered/source content; the specific obfuscation/indirection
  technique is deferred to Technical Design.
- The fallback path (when no mail client opens) must still satisfy the
  above non-plain-text-exposure rule — it cannot reintroduce scrapable
  plain text as a side effect of solving the no-client case.
- The device's sign-off/CTA text and the email-initiation trigger are
  inseparable — no scenario renders one without the other.

### States and Transitions

None identified. The device is a single, stateless trigger; the fallback
path is an alternative outcome of the same activation, not a distinct
interactive state.

### Constraints

- Non-plain-text address exposure is a required behavior, not optional —
  narrows Context's "acknowledged concern" into a binding requirement,
  technique left open.
- A no-client fallback is a required behavior, not optional — ensures the
  "primary channel" objective holds even when the native mailto mechanism
  can't complete on its own.
- Exactly one destination address, applied consistently — no per-locale
  or per-state variation.

### Boundaries

#### Included

- Rendering the device as the Contact view's primary, single-trigger
  channel, doubling as the sign-off message.
- Triggering a native, client-side email-initiation action addressed to
  Javi's one correct address.
- Guaranteeing the address is obtainable via a fallback path when the
  mailto trigger doesn't open a client.
- Requiring non-plain-text exposure of the address across both the
  primary trigger and the fallback path.

#### Excluded

- The actual obfuscation/indirection technique and the fallback
  mechanism's implementation (Technical Design).
- Visual/interaction specification of the device and its fallback
  (Feature UX).
- Actual copy/wording (Feature UX/content).
- What happens after the visitor's email client opens, or after they
  obtain the address via fallback.
- Social link behavior (`social-links`).
- Arrival at the Contact view (`section-navigation`).
- Motion (`motion-interaction`).
- The localization mechanism itself (`content-localization`) — though
  device text must be locale-resolved.

---

*Created: 2026-08-31*
