# Feature UX Specification: About Narrative

**Status:** Approved

## UX Scope

Specializes Project UX's Personal Narrative screen and its "Learn about
Javi" User Flow, for the composition of narrative text and two personal
photos into one cohesive, fully static screen moment — together with a
small, subordinate mention that the site was built through AI-assisted
development, woven directly into the narrative text rather than presented
as a separate element. Consistent with Feature Solution/Contract's
boundary: excludes nav, presence links, motion timing/sequencing, and any
skills/experience timeline (removed from this Feature's scope by this
cycle's Refine Feature Definition/Context/Solution/Contract changes).

## User Flows

### Learn about Javi

Specializes Project UX's "Learn about Javi" flow.

- Visitor reaches the Personal Narrative screen (via scroll or
  `section-navigation`'s "about" link) → the complete About Narrative
  composition — narrative text, including its closing AI-development
  line, and the two personal photos — is available immediately, with no
  interaction required to reveal any part of it (Contract Commitment 1)
  → visitor reads at their own pace → continues (scrolls onward, uses
  `section-navigation`, or leaves).

## Screens

### Personal Narrative

Existing identity, from Project UX's Screens.

- Purpose: present Javi's identity in his own voice, in depth, as one
  cohesive moment. Participates in the Learn about Javi flow. Shared with
  the `ai-assisted-development-note` capability — About Narrative is
  dominant/primary content; the AI-development line stays
  subordinate/quiet within it (Project UX Screen Composition).
- Perceptual/experience direction: the narrative text leads the
  composition — its first line functions as the opening/greeting, rather
  than a separate preceding intro block; the two photos are presented
  alongside the narrative text, not before it as their own section; each
  narrative paragraph and each photo is a separately addressable
  structural unit, a composition choice made so the separately owned
  `motion-interaction` Feature has individual pieces to apply
  scroll-reveal/interaction treatment to later — this Feature defines no
  motion, timing, or reveal behavior itself. Exact spatial layout, sizing,
  and positioning are Pending, left entirely to Feature UI.
- Desktop and mobile both realize this same experience; the specific
  per-device-class realization is Pending, left to Feature UI.

## Interaction States

- None — the composition renders directly and statically; no loading,
  empty, success, error, or transitional states apply (Feature Solution's
  "no interactive substates"; Contract Commitments 1 and 4 — no visitor
  interaction reveals, hides, toggles, or enlarges any piece).

## Feature Components

- **Narrative Text** — Javi's confirmed personal narrative, in his own
  voice; structured as discrete paragraph-level blocks (not one merged
  block), with the AI-assisted-development line as its final block —
  never its opening line (Contract Commitment 2).
- **Personal Photos (×2)** — two photos, presented simultaneously
  (Contract Commitment 4), each its own discrete container, placed
  alongside the narrative text rather than preceding it.

## Content and Assets

- **Narrative text (English)** — Confirmed, verbatim:
  1. "I'm Javi. I like making things. Software is one of the ways I do
     it, but probably not the most interesting way to describe me."
  2. "I'm a computer engineer by background, and I've spent the last
     several years building software professionally. Along the way,
     I've realised that what I enjoy most isn't necessarily writing the
     code itself. It's everything around it: thinking about what could
     exist, exploring different approaches, experimenting with ideas and
     eventually making something real."
  3. "I'm drawn to things that don't feel completely familiar. New
     ideas, unusual approaches, modern experiences — anything that makes
     me stop and think, why not do it differently?"
  4. "That mindset tends to follow me outside technology too. I like
     learning things I don't already know, and finding new ways to
     create. At the moment, for example, I'm learning how to sew. Not
     because it has anything to do with software, but because making
     something with your hands is another kind of problem-solving, and I
     like that."
  5. "Technology itself is changing in much the same way. AI is
     reshaping how software is built, and I don't think the interesting
     question is whether we should use it. The interesting question is
     what becomes possible when creating software no longer depends so
     heavily on writing every line ourselves. I'm interested in that
     shift. Less time spent on the mechanics of coding. More time
     thinking, exploring, directing and creating. That's probably where
     I want to keep going."
  6. "This site itself is one small example of that — built with
     AI-assisted development, with more of my time spent directing and
     thinking than typing every line."
- **Narrative text (Spanish, Euskera)** — Pending: authoritative
  translated values not yet confirmed; resolved via
  `content-localization`'s authoring process before launch.
- **Personal photos** — Confirmed: two photos. Pending: actual image
  assets — placeholders meanwhile, per Feature Context.

## UX Constraints

- The AI-development line must never precede the narrative text (Contract
  Commitment 2); satisfied by construction as the narrative's final
  block.
- No visitor interaction may reveal, hide, toggle, page, or enlarge any
  content piece (Contract Commitments 1 and 4).
- Narrative paragraphs and photo containers are structured as discrete,
  separately addressable units — a composition choice made for the
  benefit of the separately owned `motion-interaction` Feature; this
  Feature defines no motion, timing, or reveal behavior itself.
- Presence links (e.g., Instagram/LinkedIn) are excluded from this
  screen — scoped instead to the `presence-links` Feature on the
  Connection screen, per Project UX's existing Decision.
- Full keyboard operability, visible focus states, sufficient contrast,
  and assistive-technology compatibility apply to this screen's content,
  consistent with Project UX's UX Constraints.

---

*Created: 2026-09-06*
