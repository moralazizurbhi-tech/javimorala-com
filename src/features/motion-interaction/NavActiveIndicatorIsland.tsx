import { useLayoutEffect, useEffect, useRef } from 'react';
import { animate } from 'framer-motion';
import { subscribeScrollProgress, type ActiveNavSection, type ScrollProgress } from './scrollProgressStore';

// Nav Active Indicator Transition Island (T-041) —
// motion-interaction/technical-design.md, "Nav Active Indicator
// Transition Island" (Contract Commitment 4, active-screen component).
// Renders its own copy of the crest asset (`public/nav-active-crest.svg`)
// as a wholly separate island — never composed inside Section
// Navigation's own component tree (SectionNav.tsx), mirroring Nav
// Progress Overlay's own established pattern (Design Decision 1).
// Section Navigation's own already-built static crest (T-040,
// `.activeCrest` in SectionNav.module.scss) remains the correct
// pre-hydration/no-JS fallback underneath in every case (this file's
// own Constraints) — this island's own crest renders on top once
// hydrated, at the same rest position/size, so the two are visually
// indistinguishable except during this island's own brief transition
// window.
//
// Positioning/sizing constants below are hand-synced, by comment, with
// SectionNav.module.scss's own already-built T-040 crest geometry
// ($crest-crop-w/-h, $crest-w, mask position/size, gradient/filter) and
// $nav-height — the same "duplicate constant, kept in sync by hand"
// pattern this codebase already uses elsewhere (RootLayout.astro's own
// `scroll-margin-top` vs SectionNav.module.scss's own $nav-height), not
// a shared token file, since Section Navigation's own crest geometry was
// never promoted to one. See navActiveIndicator.scss for the geometry
// itself.
//
// PHASE_1/2/3_MS below are NOT this task's own free choice: T-021
// (already built, navTransitions.scss) hard-codes
// $indicator-total-duration: 300ms / $indicator-phase-1-duration: 90ms
// (30%) to delay the "about"/"contact" font-weight swap until this
// island's own phase-2 onset (task-catalog.md T-021: "a fixed,
// hand-kept-in-sync constant shared with T-041") — these three values
// must stay numerically identical to that already-built synchronization.
const PHASE_1_MS = 90; // flatten — 30% of 300ms
const PHASE_2_MS = 120; // travel — 40%
const PHASE_3_MS = 90; // sprout — 30%

// Never exactly 0 — ui.md: "avoiding a frame-drop flicker to nothing".
const FLATTEN_SCALE_Y = 0.08;

// Matches navActiveIndicator.scss's own $crest-w — hand-synced, see
// that file's header comment.
const CREST_WIDTH_PX = 75;

// Targets Section Navigation's own public, stable `href` contract
// (RootLayout.astro's section ids), zero code coupling — the same
// mechanism navTransitions.scss (T-021) already uses for this identical
// pair of links (`nav[aria-label='Primary'] a[href='#personal-narrative'],
// a[href='#connection']`). Scoped to the desktop bar's own `<nav
// aria-label="Primary">` landmark so it never matches the mobile
// overlay's identical-href links when both exist in the DOM at once.
const TARGET_SELECTOR: Record<'about' | 'contact', string> = {
  about: "nav[aria-label='Primary'] a[href='#personal-narrative']",
  contact: "nav[aria-label='Primary'] a[href='#connection']",
};

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

// Viewport-relative `left` for the crest's own left edge (not its
// center) — the container this element positions against is itself
// `position: fixed; inset: 0 0 auto 0` (viewport-anchored), so
// `getBoundingClientRect()`'s own viewport-relative coordinates apply
// directly, with no ancestor-offset math needed.
function measureTargetLeft(section: 'about' | 'contact'): number | null {
  const link = document.querySelector<HTMLElement>(TARGET_SELECTOR[section]);
  if (!link) return null;
  const rect = link.getBoundingClientRect();
  return rect.left + rect.width / 2 - CREST_WIDTH_PX / 2;
}

export default function NavActiveIndicatorIsland() {
  const crestRef = useRef<HTMLSpanElement>(null);
  const currentSectionRef = useRef<ActiveNavSection>(null);
  const currentLeftRef = useRef<number | null>(null);
  const positionedRef = useRef(false);
  const runIdRef = useRef(0);

  useIsomorphicLayoutEffect(() => {
    const crest = crestRef.current;
    if (!crest) return;

    function applyStatic(section: ActiveNavSection, left: number | null): void {
      if (section === null || left === null) {
        crest!.style.opacity = '0';
        return;
      }
      crest!.style.opacity = '1';
      crest!.style.left = `${left}px`;
      crest!.style.transform = 'scaleY(1)';
    }

    // Phases run strictly sequentially (never overlapping) via
    // await-chaining framer-motion's own awaitable `animate()` return
    // value — same pattern as HeroEntranceIsland's sequenced beats.
    // `runId` guards against a section change arriving mid-sequence
    // (rapid scroll/nav-link jumps): a stale run's own later phases
    // become no-ops once superseded.
    async function runTransition(fromLeft: number, toLeft: number, toSection: ActiveNavSection): Promise<void> {
      const runId = ++runIdRef.current;
      crest!.style.opacity = '1';
      crest!.style.left = `${fromLeft}px`;

      // Phase 1 — flatten, at the origin position.
      await animate(crest!, { scaleY: [1, FLATTEN_SCALE_Y] }, { duration: PHASE_1_MS / 1000, ease: 'easeOut' });
      if (runIdRef.current !== runId) return;

      // Phase 2 — travel, while flattened.
      await animate(crest!, { left: [fromLeft, toLeft] }, { duration: PHASE_2_MS / 1000, ease: 'linear' });
      if (runIdRef.current !== runId) return;

      // Phase 3 — sprout, with a small overshoot/bounce settling back
      // (ui.md: "this system's signature curve character").
      await animate(crest!, { scaleY: [FLATTEN_SCALE_Y, 1] }, { duration: PHASE_3_MS / 1000, ease: 'backOut' });
      if (runIdRef.current !== runId) return;
      if (toSection === null) crest!.style.opacity = '0';
    }

    function handleSnapshot({ activeNavSection }: ScrollProgress): void {
      const previousSection = currentSectionRef.current;
      if (activeNavSection === previousSection) return;

      const reduced = prefersReducedMotion();
      const left = activeNavSection === null ? null : measureTargetLeft(activeNavSection);
      currentSectionRef.current = activeNavSection;

      // First-ever snapshot, or reduced motion (Commitment 16 AC4):
      // resolve directly, no animated phases.
      if (!positionedRef.current || reduced) {
        positionedRef.current = true;
        currentLeftRef.current = left;
        runIdRef.current++; // supersede any in-flight sequence
        applyStatic(activeNavSection, left);
        return;
      }

      // Introduction boundary (either direction): no "about"/"contact"
      // position exists there to travel from/to — Section Navigation's
      // own static crest is likewise simply absent on Introduction
      // (SectionNav.tsx: `crestLeft === null`, no separate transition
      // built for that boundary either). Implementation Detail: this
      // island mirrors that with an instant show/hide rather than
      // forcing the three-phase sequence onto an undefined endpoint —
      // ui.md's/technical-design.md's own three-phase description only
      // covers "about"<->"contact" travel.
      if (previousSection === null || activeNavSection === null || left === null || currentLeftRef.current === null) {
        currentLeftRef.current = left;
        runIdRef.current++;
        applyStatic(activeNavSection, left);
        return;
      }

      const fromLeft = currentLeftRef.current;
      currentLeftRef.current = left;
      void runTransition(fromLeft, left, activeNavSection);
    }

    const unsubscribe = subscribeScrollProgress(handleSnapshot);

    // Re-measures the current target on resize: fluid typography and
    // viewport width both change the active link's own rendered
    // position (same rationale as SectionNav.tsx's own resize handler).
    function handleResize(): void {
      const section = currentSectionRef.current;
      if (section === null) return;
      const left = measureTargetLeft(section);
      if (left === null) return;
      currentLeftRef.current = left;
      crest!.style.left = `${left}px`;
    }
    window.addEventListener('resize', handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
      runIdRef.current++; // supersede any in-flight sequence
    };
  }, []);

  return (
    <div className="nav-active-indicator" aria-hidden="true">
      <span ref={crestRef} className="nav-active-indicator__crest" style={{ opacity: 0 }} />
    </div>
  );
}
