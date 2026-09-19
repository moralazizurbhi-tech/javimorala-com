# Feature UI Definition: Language Override

**Status:** Approved

## UI Scope

Realizes Feature UX's responsive Language Switcher (desktop trigger + open
list; mobile inline options; current-language indication), informed by an explicitly-provided Figma
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
  inline within the overlay (mobile), vertically stacked list items, using
  the same generous, uncluttered spacing rhythm used elsewhere on the
  site.
- Mobile inline options: `EN`, `ES`, and `EU` appear in one horizontal
  group inside the open overlay, with consistent spacing between options.

## Component Anatomy and Variants

- **Language Switcher Trigger:** plain text using the active language's
  compact code (`EN`, `ES`, or `EU`), no button chrome, border, icon, or
  pill shape — consistent with the site's chrome-free, typography-driven
  aesthetic.
- **Language Switcher Dropdown List (open state):** plain stacked text
  list on the same near-black base, with a restrained divider border and
  soft shadow so the desktop menu is legible against the page without
  becoming a card. Separation between items relies on spacing and the
  active-item weight distinction.
- **Active Language Indicator (within the open list):** bold weight on
  the matching list item — extends the bold/regular pairing pattern
  already used for Direct Contact's farewell lines.
- **Mobile Language Options:** three plain text buttons (`EN`, `ES`,
  `EU`) in a horizontal group; the active option uses the same bold-weight
  distinction as the desktop active item.
- Desktop dropdown labels are `English`, `Castellano`, and `Euskara`, in
  that order.

## Colour Application

- Trigger and all list item text: the project's soft off-white foreground
  (`#ebeaec`), no accent-gradient — matching every other nav/text element
  site-wide.
- No colour differentiation for the active item — weight carries that
  distinction instead, consistent with the chrome-free direction.

## Borders, Radii, Shadows, Surfaces

- Desktop dropdown: no radius; a restrained divider border and soft shadow
  provide separation from the page while preserving the near-black base.
- Mobile inline option group: no independent surface, border, or shadow;
  it remains part of the flat overlay composition.

## Iconography

None — no globe/language icon; trigger and list items are plain text
only, consistent with "no icons for 'about'/'contact' or the wordmark"
precedent from `section-navigation`.

## Visual States and Responsive Layout

- Desktop dropdown `Closed` / `Open`: `Closed` shows only the trigger;
  `Open` reveals the stacked list beneath it.
- Mobile overlay: the inline options are visible while the overlay is
  open and disappear with it; there is no separate dropdown trigger.
- Active-item bold weight is the concrete realization of Feature UX's
  "current active language indicated" requirement in both forms.
- Desktop vs. mobile: two responsive presentations of the same control,
  with the desktop dropdown and mobile inline option group preserving the
  same language order and selection semantics.

---

*Created: 2026-09-07*
