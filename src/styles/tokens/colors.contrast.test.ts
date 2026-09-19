import { describe, expect, it } from 'vitest';
import { contrastRatio } from './contrast';

// Mirrors the fixed values in _colors.scss — keep in sync if either changes.
const COLOR_BASE_BG = '#221e24';
const COLOR_BASE_FG = '#ebeaec';
const COLOR_GRADIENT_START = '#9b7fd4';
const COLOR_GRADIENT_END = '#4b2178';
const COLOR_ACCENT = COLOR_GRADIENT_START;

// T-030 post-motion regression fix — two independently-owned
// motion-interaction stylesheets each paint gradient text directly via
// `background-clip: text; color: transparent` (secondaryInteractionFeedback.scss's
// nav-link/Presence-Link/Switcher hover-focus fill, and
// ctaInteractionMotion.scss's CTA sweep), both reusing this exact
// `color-mix(in srgb, start 92%, end 8%)` blend as every dark-stop
// occurrence instead of the raw gradient-end token, so those stops
// independently satisfy Commitment 3 AC1 (≥4.5:1) when rendered as
// literal text foreground colour. Kept numerically in sync with both
// files' own mixins by hand — no shared source of truth between a Sass
// `color-mix()` computation and this TS test.
const COLOR_GRADIENT_TEXT_FILL_DARK_STOP = '#9577cd';

describe('Styling System colour tokens (accessibility/contract.md Commitment 3)', () => {
  it('body text meets >=4.5:1 against the near-black base (AC1)', () => {
    expect(contrastRatio(COLOR_BASE_FG, COLOR_BASE_BG)).toBeGreaterThanOrEqual(4.5);
  });

  it('the accent/focus-ring colour meets >=3:1 against the near-black base (AC2)', () => {
    expect(contrastRatio(COLOR_ACCENT, COLOR_BASE_BG)).toBeGreaterThanOrEqual(3);
  });

  it("the gradient family's lighter stop meets >=4.5:1 against the near-black base (supports presence-links' gradient text-fill)", () => {
    expect(contrastRatio(COLOR_GRADIENT_START, COLOR_BASE_BG)).toBeGreaterThanOrEqual(4.5);
  });

  it('the accent/focus-ring colour meets >=3:1 against the gradient\'s darker stop (accessibility/ui.md: "every background it appears on")', () => {
    expect(contrastRatio(COLOR_ACCENT, COLOR_GRADIENT_END)).toBeGreaterThanOrEqual(3);
  });

  it('the raw gradient-end token fails >=4.5:1 as literal text colour (documents why the text-fill mixin cannot use it directly)', () => {
    expect(contrastRatio(COLOR_GRADIENT_END, COLOR_BASE_BG)).toBeLessThan(4.5);
  });

  it("the gradient text-fill's blended dark stop meets >=4.5:1 against the near-black base (T-030 fix)", () => {
    expect(contrastRatio(COLOR_GRADIENT_TEXT_FILL_DARK_STOP, COLOR_BASE_BG)).toBeGreaterThanOrEqual(4.5);
  });
});
