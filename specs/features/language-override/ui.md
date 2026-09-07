# Feature UI Definition: Language Override

**Status:** Approved

## UI Scope

Realizes Feature UX's Language Switcher dropdown (trigger + open list,
current-language indication), informed by an explicitly-provided Figma
reference (file `CCwye9dUj8Sy4f2lgy6i9f`, node `15:3`) — evidence of the
site's flat, chrome-free, typography-driven treatment; no dropdown-
specific frame exists in that file, so most values below are
Feature-specific extensions, mapped qualitatively (mirrors
`section-navigation`'s and `direct-contact`'s approach). Excludes control
placement/hosting (`section-navigation`), locale detection/rendering
(`content-localization`), and all motion/transition treatment
(`motion-interaction`).

## Typography Application

- Trigger text: same "compact nav/label text" tier as the wordmark/nav
  links (small body/label-tier, regular weight).
- Dropdown list item text: same compact nav/label-tier text as the
  trigger; the active language's item distinguished by bold weight, not
  colour — consistent with the site's colour-restraint pattern (accent
  colour reserved for genuine emphasis moments, not routine state
  indication).

## Spacing and Layout

- Trigger sits inline within the nav bar (desktop) / within the overlay's
  link list (mobile), alongside "about"/"contact," matching
  `section-navigation`'s existing link spacing/gap.
- Open dropdown list: appears directly below the trigger (desktop) or
  inline within the overlay (mobile), vertically stacked list items,
  using the same generous, uncluttered spacing rhythm used elsewhere on
  the site.

## Component Anatomy and Variants

- **Language Switcher Trigger:** plain text (current language label —
  exact copy Pending, per Feature UX), no button chrome, border, icon, or
  pill shape — consistent with the site's chrome-free, typography-driven
  aesthetic.
- **Language Switcher Dropdown List (open state):** plain stacked text
  list, no background surface, border, or shadow — fully chrome-free,
  mirroring `section-navigation`'s Mobile Navigation Overlay ("full-screen
  flat surface, same background as rest of site, no button chrome") and
  `direct-contact`'s/`about-narrative`'s "no bordered/surfaced elements"
  precedent. Separation between items relies on spacing and the
  active-item weight distinction alone.
- **Active Language Indicator (within the open list):** bold weight on
  the matching list item — extends the bold/regular pairing pattern
  already used for Direct Contact's farewell lines.

## Colour Application

- Trigger and all list item text: the project's soft off-white foreground
  (`#ebeaec`), no accent-gradient — matching every other nav/text element
  site-wide.
- No colour differentiation for the active item — weight carries that
  distinction instead, consistent with the chrome-free direction.

## Borders, Radii, Shadows, Surfaces

None — no bordered/surfaced elements anywhere in this component,
consistent with the site's chrome-free style and the explicit direction
to keep the same feel as the rest of the site.

## Iconography

None — no globe/language icon; trigger and list items are plain text
only, consistent with "no icons for 'about'/'contact' or the wordmark"
precedent from `section-navigation`.

## Visual States and Responsive Layout

- Dropdown `Closed` / `Open`: `Closed` shows only the trigger; `Open`
  reveals the stacked list beneath/within it, both realized as plain text
  with no surface change beyond the list appearing.
- Active-item bold weight is the single concrete realization of Feature
  UX's "current active language indicated" requirement.
- Desktop vs. mobile: same anatomy and treatment; the control inherits
  its host's (`section-navigation`) layout context in each case — no
  materially distinct mobile variant of the control itself.

---

*Created: 2026-09-07*
