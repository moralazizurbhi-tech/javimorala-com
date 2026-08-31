# Feature Solution: About Narrative

## Solution Intent

### Functional Objective

Present a coherent narrative — an intro hook followed by blended bio
content spanning professional and personal identity — to a visitor who
has moved past the Hero impression, sufficient to build the credibility
and personal connection that justifies moving toward Contact, resolving
the credibility/connection risk and the "generic-feeling" risk identified
in the Feature Context.

## Solution Behaviour

### Behaviours

- When the visitor reaches the About view, they experience the intro hook
  first, followed immediately by the bio content, as one continuous,
  blended narrative — professional and personal identity woven together,
  not separated into labeled categories.
- The intro hook and the bio content are functionally linked, not two
  interchangeable blocks: the hook's job is to open/frame — establish a
  throughline, a human moment that draws the visitor in — while the bio
  content's job is to substantiate that frame with real depth. The hook
  is not a scaled-down preview of the body; the body is not a repetition
  of the hook.
- The bio content must give the visitor concrete, specific substance on
  both the professional dimension (what Javi does, his capability/domain)
  and the personal dimension (who Javi is beyond the professional
  identity) — each carrying genuine narrative weight, not a token or
  passing mention of either.
- The full narrative renders as flowing content the visitor consumes by
  reading/scrolling; no reader-triggered interaction (expand/collapse,
  tabs) gates any part of it.
- The narrative's authenticity requirement (Project Design's
  "Authenticity" principle) is functionally satisfied by specificity:
  content must read as concrete and particular to Javi, not
  generic/templated claims of skill or passion — directly resolving the
  Context's "generic-feeling content" risk.

### Flows

1. Visitor reaches the About view (entry points: nav "about" link, mobile
   nav overlay selection, or natural scroll from Hero).
2. The intro hook opens the narrative, framing a throughline the bio
   content will substantiate — a distinct opening moment, not a section
   label.
3. The bio content follows immediately, fulfilling that frame through one
   blended progression across both professional and personal identity,
   without a rigid per-topic split.
4. The narrative reaches a natural close once both dimensions have been
   meaningfully covered; it stops at building credibility/connection and
   does not itself gesture toward contacting Javi.
5. Visitor, now equipped with a credible, specific understanding of who
   Javi is, continues (scroll or nav) toward Contact, or leaves.
   (Grounded in `project-ux.md`'s existing "Learn about Javi" User Flow —
   not redefined here.)

### Rules

- The intro hook always precedes the bio content and the two are never
  presented independently or reachable through separate access points.
- Bio content must address both professional and personal identity within
  the same blended narrative — presenting only one dimension, giving one
  dimension only a passing mention, or separating them into independently
  labeled/navigable sections, does not satisfy this Solution.
- The intro hook must remain functionally distinguishable from the bio
  content: if it carried equivalent depth to the body, the hook/body
  distinction from the Feature Definition ("intro hook followed by
  structured bio content") would collapse.
- The narrative must not read as a portfolio/work-listing.
- The narrative's responsibility ends at building credibility/connection;
  it must not include or function as a contact call-to-action — that
  remains `email-contact`/`social-links`'s responsibility in the Contact
  view.
- No part of the narrative is gated behind a reader-triggered interaction.
- Narrative text language reflects whatever `content-localization`
  resolves at render time; about-narrative does not decide language or
  reactively re-render on a later language change.

### States and Transitions

None identified — the narrative is a single continuous, non-interactive
composition; no reader-triggered states exist.

### Constraints

- Blended-narrative structure is required: professional and personal
  identity must never be organized into separate, independently-labeled
  categories/sections.
- No interactive gating of content is required: the full narrative must
  be immediately available to a reading visitor, not progressively
  disclosed.
- Both professional and personal identity dimensions must carry genuine
  narrative weight — a functional completeness requirement, not a
  stylistic preference; neither may be reduced to a token mention.
- The hook must remain functionally lighter/framing relative to the
  body's substantiating depth — a required asymmetry between the two
  parts, distinct from just their sequence.

### Boundaries

#### Included

- Composing the intro hook and bio content as one blended, continuous
  narrative addressing both professional and personal identity, with the
  body giving each dimension genuine weight.
- Requiring the narrative to stay free of portfolio/work-listing framing,
  contact call-to-action content, and reader-triggered content gating.

#### Excluded

- Any tabbed, expandable, or otherwise reader-triggered interactive
  presentation.
- Explicit categorical separation of professional vs. personal content
  into distinct labeled sections.
- Entrance/reveal motion, timing, sequencing, or animation implementation
  (owned by `motion-interaction`).
- Specific visual/device treatment (owned by Feature UX).
- Actual intro-hook wording and bio copy content.
- Nav and social-links behavior.
- Reactive re-render on runtime language change.

---

*Created: 2026-08-31*
