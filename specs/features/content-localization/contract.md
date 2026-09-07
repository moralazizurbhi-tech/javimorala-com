# Feature Contract: Content Localization

**Status:** Approved

## Contract Commitments

### Commitment 1 — Active Language Resolution Priority

Relationship to Solution: resolves the resolution priority (override →
detected supported locale → English fallback).

**Acceptance Criteria**

- AC1: When an override signal is present, the active language matches
  the override regardless of detected browser locale.
- AC2: When no override signal is present and the detected browser locale
  is English, Spanish, or Euskera, the active language matches that
  detected locale.
- AC3: When no override signal is present and the detected browser locale
  is none of the three, the active language is English.

**Validation Scenarios**

- Scenario — visitor with Spanish browser locale, no override
  - Success Condition: active language is Spanish.
  - Failure Condition: any other language.
- Scenario — visitor with an unsupported (e.g. French) browser locale, no
  override
  - Success Condition: active language is English.
  - Failure Condition: blank, error, or another language.
- Scenario — visitor with an override set to Euskera and an English
  browser locale
  - Success Condition: active language is Euskera.
  - Failure Condition: reverts to English.

### Commitment 2 — Full-Surface Single-Language Rendering

Relationship to Solution: resolves "all site content renders consistently
in the single resolved active language... no page mixes languages,"
including metadata.

**Acceptance Criteria**

- AC1: Visible page copy renders entirely in the active language.
- AC2: Page title, meta description, `html lang` attribute, and image alt
  text all match the active language.
- AC3: No page presents content or metadata in more than one language at
  once.

**Validation Scenarios**

- Scenario — inspect a page under each of the three active languages
  - Success Condition: all visible copy and metadata fields match that
    language.
  - Failure Condition: any field in a different language.

### Commitment 3 — Independent Per-Language Reachability

Relationship to Solution: resolves "each of the three languages has its
own independently reachable URL."

**Acceptance Criteria**

- AC1: Each of the three languages has a distinct URL at which its
  content can be reached directly, without detection needing to run
  first.
- AC2: Arriving directly at a given language's URL results in that
  language being active, regardless of detected browser locale.

**Validation Scenarios**

- Scenario — visitor with an English browser locale navigates directly to
  the Spanish URL
  - Success Condition: active language is Spanish.
  - Failure Condition: reverts to English.
- Scenario — visitor with a non-Euskera browser locale navigates directly
  to the Euskera URL
  - Success Condition: active language is Euskera.
  - Failure Condition: reverts to detected/fallback language.

### Commitment 4 — First-Paint Language Correctness (No Flash)

Relationship to Solution: resolves "content resolution must complete
before first paint... no visible language swap after initial render."

**Acceptance Criteria**

- AC1: The first rendered paint of any page already reflects the
  fully-resolved active language.
- AC2: No observable transition/swap from one language's content to
  another occurs after initial render, for a given page load.

**Validation Scenarios**

- Scenario — load a page under any locale/override combination
  - Success Condition: content is correct from first paint.
  - Failure Condition: content appears in one language then changes to
    another.

### Commitment 5 — Equivalent Content Coverage Across Languages

Relationship to Solution: resolves "all three languages must have
equivalent content coverage across every content surface... no surface is
complete in only some languages," and the ship-together constraint.

**Acceptance Criteria**

- AC1: For every content surface that exists in one supported language,
  an equivalent surface exists in the other two supported languages.

**Validation Scenarios**

- Scenario — enumerate all content surfaces (pages/sections)
  - Success Condition: each exists in English, Spanish, and Euskera
    versions.
  - Failure Condition: any surface missing in one or more languages.

---

*Created: 2026-09-07*
