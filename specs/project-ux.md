# Project UX: Javi Morala

## Experience Overview

A single, continuously scrolling experience across the three domains fixed in Project
Design (Introduction, Personal Narrative, Connection), carrying forward the overall feel
of the legacy design — an immersive, editorial, scroll-driven journey — while
substantially modernizing its visual and interaction execution. The visitor is invited to
explore primarily by scrolling — a "scroll to begin your journey" cue on entry sets this
expectation — while a persistent lightweight nav offers scroll-anchor shortcuts for anyone
who wants to jump directly to a section. Consistent with "show, don't tell": the scroll
and motion interactions themselves are meant to read as evidence of craft, not just the
content.

The experience is meant to leave visitors with a distinctive, memorable impression of
Javi as bold, confident, and technical — not a muted, generically "professional" one.
Motion and interaction, absent from the legacy design entirely, are a deliberate new
layer: page- and section-level motion is bold and assertive, matching the visual
identity, while micro-interactions (buttons, links, cards) stay more restrained by
contrast. Scrolling always remains under the visitor's control — motion may respond to
scroll but never hijacks, locks, or force-snaps it.

## UX Analysis (Legacy Design Reference)

Descriptive knowledge preserved from the legacy design evidence (Figma), so it does not
need to be re-consulted. This records what the legacy design was, not how the new
experience should be built.

**Visual identity** — near-black/deep purple background, off-white text, a single
lavender/purple gradient accent; an ornamental, thorned wordmark ("metal-band" styled
lettering) as the primary visual signature, appearing as a full hero centerpiece, a
recurring small header glyph, and an oversized low-opacity background texture; two-tier
typography — a bold, blocky, tight display face for headlines paired with a calm,
rounded sans for navigation, labels, and body copy.

**Composition and hierarchy** — Hero/Contact used a centered mark under the nav,
staggered/asymmetric headline placement, and socials/scroll-cue anchored at the
layout's extremities. About used an asymmetric, offset (non-aligned) photo layout, with
large centered content sitting atop an oversized repeated version of the mark as
background texture. Mobile Home used a distinct, purpose-built treatment rather than a
plain reflow (e.g. a rotated headline used as a graphic element). Mobile navigation used
a full-screen overlay with centered links.

**Interaction and motion** — the legacy design was entirely static; no interaction
states, hover behavior, or motion were ever designed into it.

**Strengths** — the ornamental mark, the dark palette, the type contrast, and Contact's
large headline-scale "Send Me An E-Mail" treatment used in place of a conventional
button or form.

**Weaknesses** — the About view is the most visually outdated part of the legacy
design, was not designed with interaction in mind, and had the weakest
responsive/mobile treatment. The literal, full-bleed repetition of the background
texture reads as too heavy as originally used, though removing it entirely left the
composition feeling empty.

## Screens

Conceptually distinct views within the one continuous page, per Project Architecture.

- **Hero view** — first impression: headline/tagline, wordmark, nav, social links, scroll
  cue.
- **About view** — narrative content: an intro hook followed by structured bio content.
- **Contact view** — closing: sign-off message, social links, encouragement to connect.
- **Mobile nav overlay** — a menu state triggered from the persistent nav on small
  viewports, presenting the same destinations as the desktop inline nav, suited to touch.

Each of Hero/About/Contact has a distinct responsive layout on mobile but these are the
same three views, not additional screens.

## Navigation

- Hero -> About: nav "about" link (scroll-anchors to the section) OR continued natural
  scroll.
- About -> Contact: nav "contact" link OR continued natural scroll.
- About/Contact -> Hero: nav wordmark/logo link OR scroll back up.
- Mobile nav trigger -> Menu overlay: tap opens overlay; selecting a destination
  scroll-anchors there and closes the overlay; the overlay is also dismissible without
  selecting anything.
- Nav clicks and free scrolling are both always valid — neither is the only way to move
  between views.

## User Flows

- **First impression** — visitor lands on Hero, reads headline, sees the scroll cue,
  moves into the rest of the page (via scroll or nav).
- **Learn about Javi** — visitor reaches the About view (nav or scroll), reads the intro
  and narrative content.
- **Reach out** — visitor reaches the Contact view (nav or scroll) and follows an
  external link (social/email) to actually make contact, completing the Connection
  domain's goal.
- **Quick jump** — visitor uses the persistent nav (inline on desktop, overlay on
  mobile) to go straight to About or Contact without manually scrolling through.

## UI Components

- **Persistent nav** — Home/wordmark, About, Contact links plus social icons (Instagram,
  LinkedIn); rendered inline on desktop, behind a menu trigger + overlay on mobile.
- **Scroll cue** — an entry-point affordance (label + directional arrow) inviting the
  visitor from Hero into the rest of the page.
- **Section header pattern** — a consistent header treatment introducing a section's
  content, reused across views for visual coherence.
- **Social link group** — reusable icon/label pairing (Instagram, LinkedIn) appearing in
  both Hero and Contact views.
- **Mobile nav overlay** — full-screen (or slide-in) overlay presenting the same nav
  destinations for touch, replacing the desktop inline nav pattern.
- **Ornamental mark** — the recurring identity glyph, appearing as the hero centerpiece,
  a small header glyph, and occasional decorative background texture; used sparingly as
  texture rather than heavy full-bleed repetition.

## UX Constraints

- Free scrolling must always work as a complete substitute for nav clicks — the nav is a
  shortcut, never a requirement, on both desktop and mobile.
- The mobile nav overlay must be dismissible without forcing a section selection.
- Text and interactive elements must maintain accessible contrast against whatever base
  visual treatment is chosen, at every view and viewport.
- A single, restrained accent colour is used against the dark/near-black and off-white
  base — no additional accent colours.
- The experience is dark-only by design — no light theme or toggle.
- The two-tier typography contrast (bold display / calm body) is preserved as a global
  principle across all sections, sustaining an editorial rhythm.
- Asymmetric/offset composition is a global layout principle, not limited to a single
  section.
- Page- and section-level motion is always bold and assertive; micro-interaction
  feedback is always more restrained by contrast, never a toned-down copy of the same
  energy.
- Motion must never hijack, lock, or force-snap scrolling — scroll control always stays
  with the visitor.
- A reduced-motion fallback, respecting the visitor's reduced-motion preference, is
  mandatory globally.
- Every view must receive an equally deliberate, purpose-designed mobile treatment —
  never a generic reflow of the desktop layout.
- Perceived performance must not be compromised by visual richness — motion and
  decoration are never an excuse for sluggishness.

---

*Created: 2026-08-20*
