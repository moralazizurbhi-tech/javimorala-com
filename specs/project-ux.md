# Project UX Specification: Javi Morala

## UX Analysis

Visual identity: a near-black background with soft off-white text as the
base palette, plus vivid gradient fills reserved for accent/highlight
moments. Two related logomark treatments: a compact mark for a persistent
nav bar, and a larger, more decorative mark used at high-impact moments
(entrance, closing).

Interaction patterns: a persistent top navigation (logomark + anchor
links) stays visible across every section on larger screens; on small
screens it collapses to a hamburger toggle that opens a full-screen
overlay exposing the same links. An explicit scroll cue with a directional
arrow invites the visitor from the first screen into the rest of the
experience.

Navigation philosophy: strictly single-page and anchor-based — "about"
and "contact" are scroll destinations within one continuous page, never
separate routes.

Information hierarchy: the first screen is minimal (a short, bold,
multi-line headline plus a scroll invitation, nothing else). The identity
screen is the richest: an informal personal greeting, a narrative
biography, then a row of parallel highlight cards. The closing screen is
compact: a direct contact call-to-action, presence links, and a brief
farewell line.

Motion language: not directly observable in a static reference — no
animation, timing, or easing is evidenced — but the explicit scroll cue
signals an intended scroll-driven entrance into the page.

Composition: an equal-weight, side-by-side multi-card row is the one
clear repeating composition pattern present.

Recurring motifs: presence links (social profiles) appear repeated across
multiple sections rather than confined to the closing section alone; a
direct-contact call-to-action is kept visually distinct from those
presence links.

Strengths: clear, uncluttered per-section purpose; consistent persistent
wayfinding; strong natural contrast between background and text.

Weaknesses / things not to mistake for intentional decisions: the
highlight-card copy reads as a skills/value-proposition pitch aimed at an
employer or client audience — in tension with this project's confirmed
principle that content should be self-expression rather than persuasion
toward any segment. The source is explicitly an early exploration, not a
finished design, so its exact colour values, logo forms, and copy are
starting points, not final answers. No accessibility handling (focus
states, keyboard behavior, reduced-motion handling) is evidenced at all.

Preserve / Evolve / Replace / Discard:
- Persistent nav + mobile overlay menu → Preserve
- Dark, high-contrast base palette → Preserve
- Gradient accents for emphasis → Evolve (kept as a concept; exact values open)
- Scroll cue on the first screen → Evolve (expanded into a more prominent,
  more motion-forward feel across the whole experience, not just the
  entrance)
- Repeated presence links across multiple sections → Discarded as a
  Decision here — Project Design already scopes "Presence links" to the
  Connection domain specifically; carrying the reference's repetition
  forward would redefine that domain assignment, which is out of this
  phase's authority. Flagged rather than silently dropped or silently
  copied.
- Three-card "skills pitch" pattern → Discarded as a confirmed Decision,
  per explicit confirmation — left open for the Feature-level UI phase,
  with the self-expression-vs-persuasion tension recorded so it isn't
  reintroduced unnoticed.
- Overall polish/interactivity level → Evolve — used as a foundation to
  build a more current, more accessible, more motion-forward experience
  on top of, not a ceiling.

## Experience Overview

A single, continuously scrolling, scroll-and-motion-driven experience
across three screens — Introduction, Personal Narrative, and Connection —
built on a confident, high-contrast dark aesthetic. A persistent, minimal
navigation keeps the visitor oriented at every point, collapsing into a
full-screen overlay on small screens. Rather than reproducing the
reference direction wholesale, the experience pushes it further: more
current in feel, more expressive in motion (scroll-triggered reveals,
animated transitions, responsive interaction states), and accessible by
construction — strong contrast, full keyboard support, visible focus
states — rather than assumed. The experience is built around
self-expression rather than any conversion outcome, per the project's
confirmed vision: interaction patterns favor calm, exploratory engagement
over persuasive calls-to-action — the reason the Analysis above flagged
rather than adopted a skills-pitch framing for the identity screen.

## Screens

- Introduction — first impression; minimal content, a short expressive
  headline and a cue inviting the visitor to continue.
- Personal Narrative — Javi's identity in his own voice; internal
  composition left open for the Feature-level UI phase.
- Connection — direct contact and presence links, plus a closing moment.

## Screen Composition

- Personal Narrative screen — shared by the "About narrative" and
  "AI-assisted development note" capabilities. About narrative is the
  dominant, primary content; the AI-assisted development note is a minor,
  visually subordinate element appearing alongside or after it — quiet
  enough that it never competes with the narrative for attention, per
  Project Design.
- Connection screen — shared by "Direct contact" and "Presence links."
  Direct contact is the primary call-to-action; presence links are
  secondary/supporting.

## Navigation

- Introduction → Personal Narrative: scroll, or the nav's "about" link.
- Introduction → Connection: the nav's "contact" link.
- Personal Narrative → Connection: scroll, or the nav's "contact" link.
- Any screen → any other: via the persistent nav's anchor links, or the
  logo returning to Introduction. On mobile, the same transitions are
  reached via the hamburger-triggered overlay.

## User Flows

- Get an impression of who Javi is: land on Introduction → read the
  headline → optionally follow the scroll cue into Personal Narrative.
- Learn about Javi: land anywhere → nav to "about" or scroll → read
  Personal Narrative content.
- Reach Javi: land anywhere → nav to "contact" or scroll → use direct
  contact, or follow a presence link.
- Switch language: the manual override is reachable from the persistent
  nav (or its mobile overlay) at any point in the experience; choosing a
  language navigates to that language's route, and the choice is
  remembered for future visits.

## UI Components

- Persistent Navigation Bar (desktop) — logomark, anchor links, and the
  language switcher; visible throughout the experience.
- Mobile Navigation Overlay — hamburger toggle opens a full-screen
  overlay with the same links and switcher.
- Scroll/Continue Cue — a motion-expressed invitation to keep scrolling
  from the Introduction.
- Language Switcher — manual locale override, available from both nav
  forms on every screen; once set, the choice is remembered for that
  visitor's future visits rather than reverting to automatic detection
  each time.
- Contact CTA/Mechanism — the primary direct-contact action on the
  Connection screen; resolves via a native external link only (e.g.
  opens the visitor's email client), consistent with the project's
  no-backend, no-on-site-form constraints. Exact channel/destination is
  decided at Feature level.
- Presence Links — a list/row of links to Javi's external profiles,
  distinct from the Contact CTA/Mechanism; a first-level element on the
  Connection screen.

## Visual Foundations

- Typography scale: a clear hierarchy from an expressive, large-scale
  display treatment for impression moments down through section text,
  narrative body copy, and compact nav/label text — reading as deliberate
  and current, not a generic system-font default.
- Spacing scale: generous, uncluttered spacing within and between
  screens, consistent across all three domains and both device sizes.
- Colour system: a high-contrast, dark-leaning base (near-black
  background, soft off-white foreground) with a vivid accent colour
  reserved for emphasis — chosen to read as a deliberate creative choice,
  not "dark mode" as a default.
- Base element / browser-default outcomes: every interactive element
  (links, switcher, nav toggle) reads as deliberately designed, with a
  clearly visible, on-brand focus state — accessibility expressed in the
  same visual language as everything else, not bolted on.
- Shared interaction-state conventions: hover, focus, and active states
  are consistent across every interactive element site-wide, using the
  same motion feel as scroll-triggered reveals elsewhere.

## UX Constraints

- Full keyboard operability, visible focus states, sufficient contrast,
  and assistive-technology compatibility across the whole experience.
- Motion is an enhancement, never the only way to perceive information or
  complete a task, and respects a visitor's reduced-motion preference.
- The persistent navigation (or its mobile overlay) is reachable from
  anywhere, on every device.
- The manual language override is reachable from that same navigation on
  every screen and device, never buried in content, and once set is
  remembered for that visitor's future visits.
- Visual coherence (the confirmed palette, one typography and spacing
  system) applies uniformly across all three screens and all three
  languages.

---

*Created: 2026-09-06*
