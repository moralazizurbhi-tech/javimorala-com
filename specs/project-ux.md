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

## UX Constraints

- Free scrolling must always work as a complete substitute for nav clicks — the nav is a
  shortcut, never a requirement, on both desktop and mobile.
- The mobile nav overlay must be dismissible without forcing a section selection.
- Text and interactive elements must maintain accessible contrast against whatever base
  visual treatment is chosen, at every view and viewport.

---

*Created: 2026-08-20*
