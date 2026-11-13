// Hero mark morph visibility with a hysteresis band (Commitment 12, AC4).
// The morph SVG hides once heroProgress reaches HIDE_AT and only shows
// again below SHOW_BELOW, so small scroll oscillations inside the band
// (0.98–1) never flip visibility back and forth.
const HIDE_AT = 1;
const SHOW_BELOW = 0.98;

export function nextMorphVisible(wasVisible: boolean, heroProgress: number): boolean {
  return wasVisible ? heroProgress < HIDE_AT : heroProgress < SHOW_BELOW;
}
