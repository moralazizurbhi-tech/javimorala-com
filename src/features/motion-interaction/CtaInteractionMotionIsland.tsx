import { useLayoutEffect, useEffect, useRef, type ReactNode } from 'react';

// CTA Interaction Motion Island (T-023) —
// motion-interaction/technical-design.md, "CTA Interaction Motion"
// (Contract Commitments 5, 6; contributes 16). Composed around Direct
// Contact Composition's already-rendered static output via the same
// static-children-in-island pattern as HeroEntranceIsland/
// AboutNarrativeRevealIsland — targets its CTA anchor
// (`.contact__cta`, DirectContactComposition.astro's own public class)
// by class after mount, never imports or alters that file. The
// heading/farewell lines/Presence Links sharing this same wrapped
// subtree are never touched — only `.contact__cta` is ever queried or
// mutated (Responsibilities: "the heading and farewell lines stay
// untouched, purely static").
//
// Design Decision: distinguishing sustained-hover (loop) from
// momentary-tap (single pass) needs JS (technical-design.md, Design
// Decisions — unlike the CSS-only Secondary Interaction Feedback
// Styles, "a static fill has no such failure mode"; this sweep does).
// The actual sweep animation itself stays a plain CSS `@keyframes`
// (ctaInteractionMotion.scss), started/stopped by toggling one of three
// mutually-exclusive classes here — no Framer Motion dependency needed
// for this component, since a CSS animation is trivially restartable/
// stoppable by class toggling alone.
//
// Input-capability detection (technical-design.md, Owned Concepts) is
// done per-interaction via each PointerEvent's own `pointerType`, not a
// single mount-time `matchMedia` check — correctly handles hybrid
// devices (a laptop with both a trackpad and a touchscreen) where the
// same CTA can receive either input type in the same session.

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

// Momentary touch sweep's own duration — hand-synced with
// ctaInteractionMotion.scss's own `.contact__cta--sweep-once` animation
// duration (`cta-sweep 0.7s`); this timeout is what removes the class
// once that single pass has finished playing.
const SWEEP_ONCE_MS = 700;

const SWEEP_CLASS = 'contact__cta--sweep';
const SWEEP_ONCE_CLASS = 'contact__cta--sweep-once';
const STATIC_ACTIVE_CLASS = 'contact__cta--static-active';

interface Props {
  children: ReactNode;
}

export default function CtaInteractionMotionIsland({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cta = container.querySelector<HTMLElement>('.contact__cta');
    if (!cta) return;

    let sweepOnceTimeout: ReturnType<typeof setTimeout> | undefined;

    function clearSweepOnceTimeout(): void {
      if (sweepOnceTimeout !== undefined) {
        clearTimeout(sweepOnceTimeout);
        sweepOnceTimeout = undefined;
      }
    }

    // Commitment 16 AC5 / T-023 AC3: under reduced motion, hover/tap
    // still registers interaction via a discrete, non-animated visual
    // change instead of the sweep — toggles the flat static-fill class
    // only; the sweep/sweep-once classes are never applied in this
    // branch, so the CSS `@keyframes` animation never runs.
    if (prefersReducedMotion()) {
      function activateStatic(): void {
        cta!.classList.add(STATIC_ACTIVE_CLASS);
      }
      function deactivateStatic(): void {
        cta!.classList.remove(STATIC_ACTIVE_CLASS);
      }
      cta.addEventListener('pointerenter', activateStatic);
      cta.addEventListener('pointerleave', deactivateStatic);
      cta.addEventListener('pointerdown', activateStatic);
      cta.addEventListener('pointerup', deactivateStatic);
      cta.addEventListener('pointercancel', deactivateStatic);
      return () => {
        cta.removeEventListener('pointerenter', activateStatic);
        cta.removeEventListener('pointerleave', deactivateStatic);
        cta.removeEventListener('pointerdown', activateStatic);
        cta.removeEventListener('pointerup', deactivateStatic);
        cta.removeEventListener('pointercancel', deactivateStatic);
      };
    }

    // Commitment 5 AC1 / T-023 AC1: hover-capable input (mouse/pen) gets
    // the sustained, looping sweep for the hover's duration.
    function handlePointerEnter(event: PointerEvent): void {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      cta!.classList.remove(SWEEP_ONCE_CLASS);
      cta!.classList.add(SWEEP_CLASS);
    }
    function handlePointerLeave(event: PointerEvent): void {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      cta!.classList.remove(SWEEP_CLASS);
    }

    // Commitment 6 AC1 / T-023 AC1's touch-equivalent: touch-only input
    // gets the same sweep momentarily around the tap, rather than a
    // sustained hover (which touch has no equivalent of).
    function handlePointerDown(event: PointerEvent): void {
      if (event.pointerType !== 'touch') return;
      clearSweepOnceTimeout();
      cta!.classList.remove(SWEEP_ONCE_CLASS);
      // Forces a reflow so re-adding the class restarts the CSS
      // animation from its `from` keyframe if a previous tap's own
      // sweep hasn't finished playing yet (a bare remove+add in the
      // same task is a no-op to the animation engine without this).
      void cta!.offsetWidth;
      cta!.classList.add(SWEEP_ONCE_CLASS);
      sweepOnceTimeout = setTimeout(() => {
        cta!.classList.remove(SWEEP_ONCE_CLASS);
        sweepOnceTimeout = undefined;
      }, SWEEP_ONCE_MS);
    }

    cta.addEventListener('pointerenter', handlePointerEnter);
    cta.addEventListener('pointerleave', handlePointerLeave);
    cta.addEventListener('pointerdown', handlePointerDown);

    return () => {
      cta.removeEventListener('pointerenter', handlePointerEnter);
      cta.removeEventListener('pointerleave', handlePointerLeave);
      cta.removeEventListener('pointerdown', handlePointerDown);
      clearSweepOnceTimeout();
    };
  }, []);

  // `display: contents`: a pure JS hook with no layout footprint of its
  // own — same rationale as HeroEntranceIsland's identical wrapper.
  return (
    <div ref={containerRef} style={{ display: 'contents' }}>
      {children}
    </div>
  );
}
