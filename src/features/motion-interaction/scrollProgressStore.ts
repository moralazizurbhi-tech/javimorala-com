// Shared Scroll Progress Store (T-035, extended T-041) —
// motion-interaction/technical-design.md, "Shared Scroll Progress
// Store". A single scroll/resize listener, lazily attached on first
// subscriber and torn down once the last one unsubscribes, deriving
// every scroll-driven value this Feature's own components need so they
// stay mutually consistent (Contract Commitment 14) without each
// independently observing scroll itself (Constraints: "must observe
// scroll position exactly once").
//
// T-035 established the Hero-relative progress Hero Entrance & Ambient
// Motion Island consumes, and the overall page-progress value Nav
// Progress Overlay will consume (T-022, still deferred/unbuilt). T-041
// (this extension) adds the third value, `activeNavSection` — reusing
// this same single observed scroll position rather than attaching a
// separate IntersectionObserver (Nav Active Indicator Transition
// Island's own Constraint: "no separate IntersectionObserver").

/**
 * Which nav section is active for Nav Active Indicator Transition
 * Island's own purposes — 'about' (Personal Narrative), 'contact'
 * (Connection), or `null` (Introduction, where no indicator exists).
 * Derived from each section's top edge crossing a fixed ~30%-from-top
 * viewport point (technical-design.md, Shared Scroll Progress Store).
 * Independently derived from, and may disagree at the margins with,
 * Section Navigation's own `aria-current` detection (a different
 * threshold model) — an accepted tradeoff, not reconciled here
 * (technical-design.md, Design Decision 2).
 */
export type ActiveNavSection = 'about' | 'contact' | null;

export interface ScrollProgress {
  /** 0→1, mapped across `.hero`'s own height; clamped, reversible. */
  heroProgress: number;
  /** 0→1, scrolled distance over total scrollable page height — weighted by actual content length, not a fixed per-section split. */
  pageProgress: number;
  activeNavSection: ActiveNavSection;
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

// Document order matters: the active section is the LAST one (closest
// to the bottom) whose top edge has crossed the threshold line — a
// plain scrollspy walk, not an IntersectionObserver (Constraint: "no
// separate IntersectionObserver"). 'introduction' maps to `null` (no
// indicator there, matching SectionNav.tsx's own `crestLeft === null`
// on Introduction).
const ACTIVE_NAV_SECTION_ORDER: ReadonlyArray<{ id: string; value: ActiveNavSection }> = [
  { id: 'introduction', value: null },
  { id: 'personal-narrative', value: 'about' },
  { id: 'connection', value: 'contact' },
];
const ACTIVE_NAV_SECTION_THRESHOLD_RATIO = 0.3;

function computeActiveNavSection(): ActiveNavSection {
  const thresholdY = window.innerHeight * ACTIVE_NAV_SECTION_THRESHOLD_RATIO;
  let active: ActiveNavSection = null;
  for (const { id, value } of ACTIVE_NAV_SECTION_ORDER) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= thresholdY) {
      active = value;
    }
  }
  return active;
}

function computeSnapshot(): ScrollProgress {
  return {
    heroProgress: computeHeroProgress(),
    pageProgress: computePageProgress(),
    activeNavSection: computeActiveNavSection(),
  };
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
