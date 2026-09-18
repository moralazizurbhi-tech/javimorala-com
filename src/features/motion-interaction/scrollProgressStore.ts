// Shared Scroll Progress Store (T-035) —
// motion-interaction/technical-design.md, "Shared Scroll Progress
// Store". A single scroll/resize listener, lazily attached on first
// subscriber and torn down once the last one unsubscribes, deriving
// every scroll-driven value this Feature's own components need so they
// stay mutually consistent (Contract Commitment 14) without each
// independently observing scroll itself (Constraints: "must observe
// scroll position exactly once").
//
// Establishes two of the store's three eventual values now — the
// Hero-relative progress Hero Entrance & Ambient Motion Island consumes
// (this task's own scope), and the overall page-progress value Nav
// Progress Overlay will consume (T-022, "established at T-035" per
// task-catalog.md). The third value (active-nav-section) is explicitly
// T-041's own later extension of this same store, not this task's
// scope (task-catalog.md T-041: "extends the store established at
// T-035").

export interface ScrollProgress {
  /** 0→1, mapped across `.hero`'s own height; clamped, reversible. */
  heroProgress: number;
  /** 0→1, scrolled distance over total scrollable page height — weighted by actual content length, not a fixed per-section split. */
  pageProgress: number;
}

type Listener = (progress: ScrollProgress) => void;

const listeners = new Set<Listener>();
let scheduled = false;
let attached = false;

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function computeHeroProgress(): number {
  const hero = document.querySelector<HTMLElement>('.hero');
  if (!hero) return 0;
  const rect = hero.getBoundingClientRect();
  if (rect.height <= 0) return 0;
  return clamp01(-rect.top / rect.height);
}

function computePageProgress(): number {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollableHeight <= 0) return 0;
  return clamp01(window.scrollY / scrollableHeight);
}

function computeSnapshot(): ScrollProgress {
  return { heroProgress: computeHeroProgress(), pageProgress: computePageProgress() };
}

function notify(): void {
  const snapshot = computeSnapshot();
  listeners.forEach((listener) => listener(snapshot));
}

function handleScrollOrResize(): void {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    notify();
  });
}

function attach(): void {
  if (attached) return;
  attached = true;
  window.addEventListener('scroll', handleScrollOrResize, { passive: true });
  window.addEventListener('resize', handleScrollOrResize);
}

function detach(): void {
  if (!attached) return;
  attached = false;
  window.removeEventListener('scroll', handleScrollOrResize);
  window.removeEventListener('resize', handleScrollOrResize);
}

/**
 * Subscribes to live scroll-progress updates, immediately invoking
 * `listener` once with the current snapshot. Attaches the store's sole
 * scroll/resize listener on the first subscriber and tears it down once
 * the last subscriber unsubscribes.
 */
export function subscribeScrollProgress(listener: Listener): () => void {
  listeners.add(listener);
  attach();
  listener(computeSnapshot());

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) detach();
  };
}

/** Synchronous, one-off read of the current scroll-progress snapshot. */
export function getScrollProgress(): ScrollProgress {
  return computeSnapshot();
}
