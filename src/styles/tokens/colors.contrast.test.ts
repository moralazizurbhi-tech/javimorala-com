import { describe, expect, it } from 'vitest';
import { contrastRatio } from './contrast';

// Mirrors the fixed values in _colors.scss — keep in sync if either changes.
const COLOR_BASE_BG = '#221e24';
const COLOR_BASE_FG = '#ebeaec';
const COLOR_GRADIENT_START = '#9b7fd4';
const COLOR_GRADIENT_END = '#4b2178';
const COLOR_ACCENT = COLOR_GRADIENT_START;

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
});
