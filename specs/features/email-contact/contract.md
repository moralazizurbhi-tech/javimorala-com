# Feature Contract: Email Contact

## Contract Commitments

### Commitment 1 — Primary Email-Initiation Trigger

Relationship to Solution: resolves Behaviour 1 (single primary channel;
activation opens client), the single-address Rule, the no-form/no-backend
Rule, and the single-destination-address Constraint. Resolves Feature
Context's "no on-site form/no backend" constraint and the core problem of
needing a prominent, primary email channel.

**Acceptance Criteria**

- AC1: The Contact view exposes exactly one primary, activatable device
  for initiating email contact with Javi.
- AC2: Activating the device initiates a native, client-side email action
  addressed to Javi's single correct destination address — never through
  an in-app form, in-app data submission, or backend/API call.
- AC3: The resolved destination address is identical every time the
  device is activated, regardless of visitor session, state, or locale.

**Validation Scenarios**

- Scenario A — Standard activation
  - Success Condition: activation initiates a client-side email action
    addressed to the correct address, with no form submission or
    network/backend call.
  - Failure Condition: activation triggers a form submission, a backend
    call, or resolves to an incorrect/different address.
- Scenario B — Repeated/varied-locale activation
  - Success Condition: the resolved address is identical across repeated
    activations and across locales.
  - Failure Condition: the address differs across activations or
    locales.

### Commitment 2 — Non-Plain-Text Address Exposure

Relationship to Solution: resolves the non-plain-text-exposure Rule and
Constraint, including its extension to the fallback path. Resolves
Feature Context's acknowledged email-scraping constraint.

**Acceptance Criteria**

- AC1: The email address never appears as literal, directly-scrapable
  plain text within the page's rendered content or source markup.
- AC2: This holds in both the device's default state and its
  fallback-active state (Commitment 3) — neither exposes the address as
  scrapable plain text.

**Validation Scenarios**

- Scenario — Inspecting rendered content/source in both states
  - Success Condition: no literal, directly-scrapable plain-text email
    address is present in either state.
  - Failure Condition: the address appears as literal plain text in
    either state.

### Commitment 3 — No-Client Fallback Availability

Relationship to Solution: resolves Behaviour 3 and the required-fallback
Constraint. Resolves Feature Context's motivation that the channel be
genuinely actionable, not just present.

**Acceptance Criteria**

- AC1: When activating the device does not result in the visitor's email
  client opening, the visitor has an available means, provided by the
  Feature, to obtain Javi's correct destination address.
- AC2: The address obtained via the fallback path is identical to the
  address used by the primary trigger.

**Validation Scenarios**

- Scenario A — No mail client configured
  - Success Condition: the visitor obtains Javi's correct address
    through the Feature-provided fallback.
  - Failure Condition: no fallback exists, or the visitor cannot obtain
    the address after the primary trigger fails to open a client.
- Scenario B — Fallback address consistency
  - Success Condition: the fallback-obtained address matches the primary
    trigger's address.
  - Failure Condition: the addresses differ.

### Commitment 4 — Sign-Off/Trigger Inseparability

Relationship to Solution: resolves Behaviour 2 and the inseparability
Rule. Resolves Feature Definition's "one cohesive device" boundary.

**Acceptance Criteria**

- AC1: Wherever the device's sign-off/closing message text is presented,
  it is also the email-initiation trigger — no rendering exists with one
  but not the other.

**Validation Scenarios**

- Scenario — Inspecting the Contact view
  - Success Condition: the sign-off/closing message and the
    email-initiation trigger are the same (or inseparably combined)
    element.
  - Failure Condition: the view presents the message without the
    trigger, or the trigger without the message.

---

*Created: 2026-08-31*
