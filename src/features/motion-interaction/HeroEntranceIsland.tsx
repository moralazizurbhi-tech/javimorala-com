import { useLayoutEffect, useEffect, useRef, type ReactNode } from 'react';
import { animate, type AnimationPlaybackControlsWithThen } from 'framer-motion';
import { isHeroEntrancePlayed, markHeroEntrancePlayed } from './motionPlaybackStore';
import { subscribeScrollProgress, type ScrollProgress } from './scrollProgressStore';

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

// Mark bloom: a center-outward clip-path wipe standing in for the
// "traced" stroke-reveal ui.md describes (see file-top note) — begins
// immediately, the longest/unhurried beat (ui.md, Relative Entrance
// Pacing). Revealed by shrinking equal left/right insets from the
// center simultaneously (developer direction, post-implementation
// refinement — was a plain left-to-right wipe).
const MARK_CLIP_HIDDEN = 'inset(0 50% 0 50%)';
const MARK_CLIP_VISIBLE = 'inset(0 0% 0 0%)';
const MARK_BLOOM_DURATION = 1.6; // developer direction: longer than the original 1.1s

// Headline cascade: starts while the mark is still blooming (ui.md:
// "overlapping it rather than waiting for it to finish"), each of the
// three lines staggering in quickly. Start delay lengthened (developer
// direction: text should enter later) from an original 260ms.
const HEADLINE_START_DELAY_MS = 550;
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

// Hero Scroll-Linked Content Exit & Mark Transformation (T-035,
// motion-interaction/technical-design.md; Commitments 11, 12) — both
// windows are fractions of Shared Scroll Progress Store's Hero-relative
// progress value (ui.md, Interaction Choreography: content exit ~0-35%
// of Hero height; mark transformation ~25-70%, overlapping it). Unlike
// the entrance sequence above, this is driven directly and continuously
// by scroll position, not a timed animation — Commitment 16 AC9: stays
// fully active under reduced motion.
const CONTENT_EXIT_END = 0.35;
const MARK_TRANSFORM_START = 0.25;
const MARK_TRANSFORM_END = 0.7;

// Mirrors `styles/tokens/_breakpoints.scss`'s own `$breakpoint-desktop`
// — that file's own comment already treats this exact value as an
// Implementation Detail with no Technical Design authority fixing it;
// duplicated here since JS has no access to Sass tokens at runtime.
const DESKTOP_QUERY = '(min-width: 768px)';

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

interface Props {
  children: ReactNode;
}

export default function HeroEntranceIsland({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // BaseLayout.astro's blocking script pre-hides these elements via
    // this class (see RootLayout.astro's matching CSS) so there's no
    // flash of fully-visible content before this effect ever runs — its
    // job is done the moment this component takes over, in every
    // branch below (each one either sets its own inline hidden styles
    // before animating, or renders the final state directly).
    document.documentElement.classList.remove('js-hero-entrance-pending');

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
    const contentExitEls = [headlinePrimary, ...secondaryHeadlineEls, ...finalBeatEls].filter(isElement);
    const hero = container.querySelector<HTMLElement>('.hero');
    const naturalProbe = container.querySelector<HTMLElement>('.hero-mark-natural-probe');
    const targetProbe = container.querySelector<HTMLElement>('.hero-mark-target-probe');
    const markBoundarySentinel = container.querySelector<HTMLElement>('#hero-mark-boundary');

    // Once Hero's own mark-visibility sentinel clears the viewport,
    // Section Navigation's own divider (Commitment 8) already stops
    // treating Hero's mark as occupying the nav's center gap — read-only
    // observation of that same, already-public sentinel (this
    // component depends outward on it, same as Section Navigation does;
    // never the reverse). Without this, the docked mark (desktop) stays
    // permanently visible for the rest of the page, and once Section
    // Navigation's own compact-logo mechanism later activates
    // (`navTransitions.scss`'s `::after`, a separate, already-approved
    // element), the two visibly double up at the identical position — a
    // real defect a live Chrome check caught, not something either
    // Feature's own contract anticipates. Hiding this element once the
    // sentinel clears hands the visual role back to Section
    // Navigation's own pre-existing mechanism cleanly, at the same
    // threshold its own divider already uses for "Hero's mark is gone" —
    // consistent with, not a new addition to, that existing behavior.
    let heroMarkBoundaryVisible = true;
    let markBoundaryObserver: IntersectionObserver | undefined;
    if (markBoundarySentinel) {
      markBoundaryObserver = new IntersectionObserver(
        ([entry]) => {
          heroMarkBoundaryVisible = entry.isIntersecting;
        },
        { threshold: 0 },
      );
      markBoundaryObserver.observe(markBoundarySentinel);
    }

    // Hero Scroll-Linked Content Exit & Mark Transformation (Commitments
    // 11, 12) — reads Shared Scroll Progress Store's Hero-relative value
    // directly and continuously; Commitment 16 AC9 requires this to stay
    // active under reduced motion, unlike the entrance/ambient-drift
    // logic below, so it is wired up independently of every branch's own
    // reduced-motion/already-played decision (see the three call sites
    // below), never gated on `prefersReducedMotion()`.
    function applyScrollLinkedMotion(progress: ScrollProgress) {
      const exitT = clamp01(progress.heroProgress / CONTENT_EXIT_END);
      const exitOpacity = 1 - exitT;
      contentExitEls.forEach((el) => {
        el.style.opacity = String(exitOpacity);
      });

      if (!mark) return;
      const markT = clamp01(
        (progress.heroProgress - MARK_TRANSFORM_START) / (MARK_TRANSFORM_END - MARK_TRANSFORM_START),
      );

      if (window.matchMedia(DESKTOP_QUERY).matches && hero && naturalProbe && targetProbe) {
        // Desktop/tablet-with-space (Commitment 12 AC1): continuously
        // morphs the same element — never crossfades with a second one
        // — toward the nav's compact-logo position/form. `.hero__mark`
        // is an `<img>`, not inline SVG (see this file's own top-of-file
        // note re: T-019's identical constraint), so literal SVG shape
        // interpolation is unreachable; realized instead as a continuous
        // position/size morph between the two probes' own live rects
        // (heroMarkMorph.scss) — same "continuously transforms toward
        // the nav logo's position/form" observable outcome, without
        // requiring DOM access this element doesn't expose.
        //
        // `top` needs one extra step width/height don't: the natural
        // probe is `position: absolute` (document-flow, scroll-
        // following), so its *live* rect keeps drifting upward for as
        // long as the visitor keeps scrolling — blending directly
        // against that live, still-moving value made the mark appear to
        // race off-screen mid-transformation before snapping back near
        // the target at markT≈1 (live Chrome verification caught this;
        // no unit test did, since those mock the probes' rects as
        // static). Converting to document-space (`+ window.scrollY`)
        // and evaluating it at the *fixed* scroll position where this
        // window itself starts (`MARK_TRANSFORM_START`) — not the
        // current, later scroll position — gives a stable interpolation
        // source: correct at markT=0 by construction, and never drifts
        // for the rest of the window.
        const heroRect = hero.getBoundingClientRect();
        const heroDocTop = heroRect.top + window.scrollY;
        const naturalRect = naturalProbe.getBoundingClientRect();
        const naturalDocTop = naturalRect.top + window.scrollY;
        // Before the window starts (heroProgress <= MARK_TRANSFORM_START,
        // markT already clamped to 0), the frozen value below isn't used
        // at all yet — the live natural top tracks scroll normally, same
        // as this element's own un-overridden CSS would. The two are
        // identical exactly at the boundary (by construction), so
        // switching source there is seamless.
        const naturalTopAtWindowStart =
          heroRect.height > 0
            ? naturalDocTop - heroDocTop - MARK_TRANSFORM_START * heroRect.height
            : naturalRect.top;
        const naturalTopSource = progress.heroProgress <= MARK_TRANSFORM_START ? naturalRect.top : naturalTopAtWindowStart;
        const target = targetProbe.getBoundingClientRect();
        mark.style.clipPath = '';
        mark.style.position = 'fixed';
        mark.style.left = '50%';
        mark.style.right = 'auto';
        mark.style.transform = 'translateX(-50%)';
        mark.style.top = `${lerp(naturalTopSource, target.top, markT)}px`;
        mark.style.width = `${lerp(naturalRect.width, target.width, markT)}px`;
        mark.style.height = `${lerp(naturalRect.height, target.height, markT)}px`;
        mark.style.opacity = heroMarkBoundaryVisible ? '1' : '0';
      } else {
        // Mobile (Commitment 12 AC2): no logomark destination exists —
        // dissolves via a reverse trace of its own entrance stroke.
        // `.hero__mark` isn't inline SVG (see above), so realized as the
        // exact reverse of the entrance's own center-out `clip-path`
        // reveal (MARK_CLIP_HIDDEN/MARK_CLIP_VISIBLE above), same "drawn
        // off" character. Clears any desktop-branch overrides first, in
        // case the viewport crossed the breakpoint mid-transformation.
        mark.style.position = '';
        mark.style.left = '';
        mark.style.right = '';
        mark.style.top = '';
        mark.style.width = '';
        mark.style.height = '';
        mark.style.transform = '';
        mark.style.opacity = '';
        const inset = 50 * markT;
        mark.style.clipPath = `inset(0 ${inset}% 0 ${inset}%)`;
      }
    }

    let cancelled = false;
    let ambientControls: AnimationPlaybackControlsWithThen | undefined;
    let unsubscribeScroll: (() => void) | undefined;
    const activeControls: AnimationPlaybackControlsWithThen[] = [];

    function track(controls: AnimationPlaybackControlsWithThen): AnimationPlaybackControlsWithThen {
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
      unsubscribeScroll = subscribeScrollProgress(applyScrollLinkedMotion);
      return () => {
        ambientControls?.stop();
        unsubscribeScroll?.();
        markBoundaryObserver?.disconnect();
      };
    }

    // Commitment 2 AC2: any settled visit (this session already played
    // the sequence) renders final state directly, no replay.
    if (isHeroEntrancePlayed()) {
      startAmbientDrift();
      unsubscribeScroll = subscribeScrollProgress(applyScrollLinkedMotion);
      return () => {
        ambientControls?.stop();
        unsubscribeScroll?.();
        markBoundaryObserver?.disconnect();
      };
    }

    async function playEntrance() {
      // Every animation this sequence starts is collected here so
      // settlement (below) can wait on their own real completion —
      // never on a `setTimeout` guessed to match their duration. A
      // guessed-duration wait fires on schedule regardless of whether
      // the animations themselves actually finished (confirmed via a
      // live repro: a freshly opened tab, throttled while not yet
      // visible, reached `markHeroEntrancePlayed()` — and stopped
      // replaying forever — while the mark/headline were still stuck at
      // their pre-entrance hidden state, never having visibly played at
      // all). Awaiting each animation's own `AnimationPlaybackControlsWithThen`
      // (Framer's DOM `animate()` return value is itself awaitable,
      // resolving only once that animation truly finishes) makes
      // settlement wait for what actually happened on screen, not an
      // assumption about elapsed time.
      const sequenceAnimations: AnimationPlaybackControlsWithThen[] = [];

      if (mark) {
        mark.style.opacity = '0';
        mark.style.clipPath = MARK_CLIP_HIDDEN;
        sequenceAnimations.push(
          track(
            animate(
              mark,
              { opacity: [0, 1], clipPath: [MARK_CLIP_HIDDEN, MARK_CLIP_VISIBLE] },
              { duration: MARK_BLOOM_DURATION, ease: 'easeOut' },
            ),
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

      // This delay is deliberate choreography (the headline cascade
      // starting before the mark's own bloom finishes, per ui.md's
      // "overlapping it rather than waiting for it to finish") — unlike
      // the guessed-duration settlement wait above, its role is pacing
      // between beats, not deciding whether anything has finished.
      await wait(HEADLINE_START_DELAY_MS);
      if (cancelled) return;

      if (headlinePrimary) {
        sequenceAnimations.push(
          track(animate(headlinePrimary, { opacity: [0, 1] }, { duration: HEADLINE_LINE_DURATION, ease: 'easeOut' })),
        );
      }
      for (const [index, el] of secondaryHeadlineEls.entries()) {
        if (index > 0) {
          await wait(HEADLINE_STAGGER_MS);
          if (cancelled) return;
        }
        sequenceAnimations.push(
          track(
            animate(
              el,
              { opacity: [0, 1], y: [ENTRANCE_Y_OFFSET, 0] },
              { duration: HEADLINE_LINE_DURATION, ease: 'easeOut' },
            ),
          ),
        );
      }

      await wait(HEADLINE_STAGGER_MS + CLOSING_BEAT_PAUSE_MS);
      if (cancelled) return;

      finalBeatEls.forEach((el) => {
        sequenceAnimations.push(
          track(
            animate(
              el,
              { opacity: [0, 1], y: [ENTRANCE_Y_OFFSET, 0] },
              { duration: FINAL_BEAT_DURATION, ease: 'easeOut' },
            ),
          ),
        );
      });

      await Promise.all(sequenceAnimations);
      if (cancelled) return;

      markHeroEntrancePlayed();
      startAmbientDrift();
      unsubscribeScroll = subscribeScrollProgress(applyScrollLinkedMotion);
    }

    playEntrance();

    return () => {
      cancelled = true;
      activeControls.forEach((controls) => controls.stop());
      ambientControls?.stop();
      unsubscribeScroll?.();
      markBoundaryObserver?.disconnect();
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
      {/*
        Hero Mark Transformation measurement probes (T-035) — invisible,
        `aria-hidden` elements this island's own children (not Hero
        Composition's or Section Navigation's markup); see
        heroMarkMorph.scss's own header comment for why they exist.
      */}
      <div className="hero-mark-natural-probe" aria-hidden="true" />
      <div className="hero-mark-target-probe" aria-hidden="true" />
    </div>
  );
}
