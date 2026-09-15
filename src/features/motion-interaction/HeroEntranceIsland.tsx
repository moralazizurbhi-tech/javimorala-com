import { useLayoutEffect, useEffect, useRef, type ReactNode } from 'react';
import { animate, type AnimationPlaybackControls } from 'framer-motion';
import { isHeroEntrancePlayed, markHeroEntrancePlayed } from './motionPlaybackStore';

// Hero Entrance & Ambient Motion Island (T-019) —
// motion-interaction/technical-design.md, "Hero Entrance & Ambient
// Motion Island" (entrance/ambient-drift responsibilities only;
// Commitments 11/12's scroll-linked exit and mark transformation are
// T-035's own scope, layered onto this same island later). Composed
// around Hero Composition's (hero-presentation/HeroComposition.astro)
// and Presence Links' already-rendered static markup via the
// static-children-in-island pattern (Design Decision 1) — this
// component never renders that markup itself, only targets it by
// class after mount, and never touches HeroComposition.astro's own
// file.
//
// Two elements here (`.hero__mark`'s "drawn on" bloom, and the ambient
// gradient drift's own hue shift) are specified against SVG-level
// mechanisms (stroke-dashoffset, gradient focal-point) that assume the
// mark's artwork is inline SVG in the page. It isn't: HeroComposition
// renders it as `<img src="/ornamental-mark.svg">`, an external
// resource opaque to this page's CSS/JS — its internal <path> stroke
// and gradient stops are unreachable, and altering that markup to
// inline SVG is exactly what this component must not do (Constraints:
// "must not alter Hero Composition's markup"). Classified as an
// Implementation Detail, not a Contradiction: ui.md's own scope note
// excludes "animation technology" from its own commitment, leaving the
// concrete mechanism open. Realized instead via `clip-path` (bloom) and
// a `hue-rotate` filter (drift) applied to the `<img>` from outside —
// same observable "traced, not faded" / "hue-shifting" character ui.md
// describes, without requiring DOM access this element doesn't expose.

// SSR-safe layout effect: Astro's React integration pre-renders this
// component to static HTML during the build; useLayoutEffect logs a
// harmless but noisy warning under Node SSR, so it's used only once
// `window` exists (i.e. never during that server pass — this component
// has no client-only behavior to reconcile against server output
// either way, since none of this effect's DOM mutations are reflected
// in the server-rendered HTML).
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function isElement(value: HTMLElement | null): value is HTMLElement {
  return value !== null;
}

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Mark bloom: a left-to-right clip-path wipe standing in for the
// "traced" stroke-reveal ui.md describes (see file-top note) — begins
// immediately, the longest/unhurried beat (ui.md, Relative Entrance
// Pacing).
const MARK_CLIP_HIDDEN = 'inset(0 100% 0 0)';
const MARK_CLIP_VISIBLE = 'inset(0 0% 0 0)';
const MARK_BLOOM_DURATION = 1.1;

// Headline cascade: starts while the mark is still blooming (ui.md:
// "overlapping it rather than waiting for it to finish"), each of the
// three lines staggering in quickly.
const HEADLINE_START_DELAY_MS = 260;
const HEADLINE_STAGGER_MS = 90;
const HEADLINE_LINE_DURATION = 0.42;

// Scroll cue + Presence Links: "waits until the headline cascade
// completes, then appears after a brief pause — a genuine closing
// beat" (ui.md).
const CLOSING_BEAT_PAUSE_MS = 220;
const FINAL_BEAT_DURATION = 0.32;

// Vertical entrance offset for the two secondary headline lines and the
// final-beat elements — none of which carry an existing `transform` of
// their own (unlike `.hero__headline-primary` / `.hero__mark`, which do:
// mobile rotation / device-class positioning, in HeroComposition.astro's
// own stylesheet — animating `transform` there would silently overwrite
// it, which is why those two get no offset at all, opacity-only). Driven
// via Framer Motion's own `y` keyframe key (composes into
// `transform: translateY()` through Framer's positional-value system),
// not the literal CSS `translate` property: a live Chrome reproduction
// (T-019 post-implementation correction) confirmed Framer's DOM
// `animate()` silently drops an unrecognized `translate` keyframe
// instead of animating it — `getAnimations()[].effect.getKeyframes()`
// showed only `opacity` ever reached the resulting Web Animation,
// `translate` simply absent, with no thrown error to surface the defect.
const ENTRANCE_Y_OFFSET = 12; // px

const AMBIENT_DRIFT_DURATION = 18;
const AMBIENT_HUE_SHIFT_DEG = 10;

interface Props {
  children: ReactNode;
}

export default function HeroEntranceIsland({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mark = container.querySelector<HTMLElement>('.hero__mark');
    const headlinePrimary = container.querySelector<HTMLElement>('.hero__headline-primary');
    const secondaryHeadlineEls = [
      container.querySelector<HTMLElement>('.hero__headline-secondary--1'),
      container.querySelector<HTMLElement>('.hero__headline-secondary--2'),
    ].filter(isElement);
    // Presence Links composes as a sibling of Hero's own markup at the
    // layout level (RootLayout.astro), not inside HeroComposition.astro
    // itself — always present in the DOM (CSS-only `display: none` on
    // mobile, not an Astro-level conditional), so no separate
    // device-detection is needed here: animating it on mobile has no
    // observable effect since it isn't rendered there either way,
    // exactly matching "when Hero Composition's markup includes it"
    // (technical-design.md) in observable outcome.
    const finalBeatEls = [
      container.querySelector<HTMLElement>('.hero__scroll-cue'),
      container.querySelector<HTMLElement>('.introduction__presence-links'),
    ].filter(isElement);

    let cancelled = false;
    let ambientControls: AnimationPlaybackControls | undefined;
    const activeControls: AnimationPlaybackControls[] = [];

    function track(controls: AnimationPlaybackControls): AnimationPlaybackControls {
      activeControls.push(controls);
      return controls;
    }

    function startAmbientDrift() {
      if (!mark) return;
      ambientControls = animate(
        mark,
        {
          filter: [
            'hue-rotate(0deg)',
            `hue-rotate(${AMBIENT_HUE_SHIFT_DEG}deg)`,
            'hue-rotate(0deg)',
            `hue-rotate(-${AMBIENT_HUE_SHIFT_DEG}deg)`,
            'hue-rotate(0deg)',
          ],
        },
        { duration: AMBIENT_DRIFT_DURATION, repeat: Infinity, ease: 'easeInOut' },
      );
    }

    // Commitment 16 AC2: reduced-motion resolves directly to the
    // end-state and the ambient drift never begins — checked before the
    // played flag since it applies regardless of whether this is the
    // visit's first arrival.
    if (prefersReducedMotion()) {
      return () => {
        ambientControls?.stop();
      };
    }

    // Commitment 2 AC2: any settled visit (this session already played
    // the sequence) renders final state directly, no replay.
    if (isHeroEntrancePlayed()) {
      startAmbientDrift();
      return () => {
        ambientControls?.stop();
      };
    }

    async function playEntrance() {
      if (mark) {
        mark.style.opacity = '0';
        mark.style.clipPath = MARK_CLIP_HIDDEN;
        track(
          animate(
            mark,
            { opacity: [0, 1], clipPath: [MARK_CLIP_HIDDEN, MARK_CLIP_VISIBLE] },
            { duration: MARK_BLOOM_DURATION, ease: 'easeOut' },
          ),
        );
      }
      if (headlinePrimary) headlinePrimary.style.opacity = '0';
      secondaryHeadlineEls.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = `translateY(${ENTRANCE_Y_OFFSET}px)`;
      });
      finalBeatEls.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = `translateY(${ENTRANCE_Y_OFFSET}px)`;
      });

      await wait(HEADLINE_START_DELAY_MS);
      if (cancelled) return;

      if (headlinePrimary) {
        track(animate(headlinePrimary, { opacity: [0, 1] }, { duration: HEADLINE_LINE_DURATION, ease: 'easeOut' }));
      }
      for (const [index, el] of secondaryHeadlineEls.entries()) {
        if (index > 0) {
          await wait(HEADLINE_STAGGER_MS);
          if (cancelled) return;
        }
        track(
          animate(
            el,
            { opacity: [0, 1], y: [ENTRANCE_Y_OFFSET, 0] },
            { duration: HEADLINE_LINE_DURATION, ease: 'easeOut' },
          ),
        );
      }

      await wait(HEADLINE_STAGGER_MS + CLOSING_BEAT_PAUSE_MS);
      if (cancelled) return;

      finalBeatEls.forEach((el) => {
        track(
          animate(
            el,
            { opacity: [0, 1], y: [ENTRANCE_Y_OFFSET, 0] },
            { duration: FINAL_BEAT_DURATION, ease: 'easeOut' },
          ),
        );
      });

      await wait(FINAL_BEAT_DURATION * 1000);
      if (cancelled) return;

      markHeroEntrancePlayed();
      startAmbientDrift();
    }

    playEntrance();

    return () => {
      cancelled = true;
      activeControls.forEach((controls) => controls.stop());
      ambientControls?.stop();
    };
  }, []);

  // `display: contents`: a pure JS hook with no layout footprint of its
  // own — `.introduction__presence-links`'s `position: absolute`
  // resolves against `.introduction` exactly as before this wrapper
  // existed, skipping straight past it (RootLayout.astro, Constraints:
  // this component must not disturb existing layout/positioning).
  return (
    <div ref={containerRef} style={{ display: 'contents' }}>
      {children}
    </div>
  );
}
