const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function resolveMotionMode() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'standard';
  }
  return window.matchMedia(REDUCED_MOTION_QUERY).matches ? 'reduced' : 'standard';
}

const MOTION_MODE = resolveMotionMode();

export function useMotionMode() {
  return MOTION_MODE;
}
