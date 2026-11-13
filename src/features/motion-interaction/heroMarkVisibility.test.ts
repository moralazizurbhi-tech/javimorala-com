import { describe, expect, it } from 'vitest';
import { nextMorphVisible } from './heroMarkVisibility';

describe('nextMorphVisible', () => {
  it('starts visible: visible state stays visible below the hide threshold', () => {
    expect(nextMorphVisible(true, 0)).toBe(true);
    expect(nextMorphVisible(true, 0.5)).toBe(true);
  });

  it('starts hidden: hidden state stays hidden at the hide threshold', () => {
    expect(nextMorphVisible(false, 1)).toBe(false);
  });

  it('crossing up: visible hides when heroProgress reaches 1', () => {
    expect(nextMorphVisible(true, 0.99)).toBe(true);
    expect(nextMorphVisible(true, 1)).toBe(false);
  });

  it('crossing down: hidden shows again below 0.98', () => {
    expect(nextMorphVisible(false, 0.98)).toBe(false);
    expect(nextMorphVisible(false, 0.97)).toBe(true);
  });

  it('oscillating inside the band does not change visibility', () => {
    let visible = true;
    for (const progress of [0.99, 1, 0.985, 0.99, 0.981, 1]) {
      visible = nextMorphVisible(visible, progress);
      expect(visible).toBe(false);
    }
    // Hidden-side oscillation inside the band also keeps it hidden.
    expect(nextMorphVisible(false, 0.99)).toBe(false);
  });
});
