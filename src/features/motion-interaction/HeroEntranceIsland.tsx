import { useLayoutEffect, useEffect, useRef, useState, type ReactNode } from 'react';
import { animate, type AnimationPlaybackControlsWithThen } from 'framer-motion';
import { createPortal } from 'react-dom';
import { isHeroEntrancePlayed, markHeroEntrancePlayed } from './motionPlaybackStore';
import { subscribeScrollProgress, type ScrollProgress } from './scrollProgressStore';
import { buildInterpolatedD, loadHeroMarkMorphData, type MorphData } from './heroMarkMorphData';

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
// The entrance bloom and ambient drift (below) are specified against
// SVG-level mechanisms (stroke-dashoffset, gradient focal-point) that
// assume the mark's artwork is inline SVG in the page. It isn't:
// HeroComposition renders it as `<img src="/ornamental-mark.svg">`, an
// external resource opaque to this page's CSS/JS — its internal <path>
// stroke and gradient stops are unreachable, and altering that markup
// to inline SVG is exactly what this component must not do
// (Constraints: "must not alter Hero Composition's markup"). Classified
// as an Implementation Detail, not a Contradiction: ui.md's own scope
// note excludes "animation technology" from its own commitment, leaving
// the concrete mechanism open. Realized instead via `clip-path` (bloom)
// and a `hue-rotate` filter (drift) applied to the `<img>` from outside
// — same observable "traced, not faded" / "hue-shifting" character
// ui.md describes, without requiring DOM access this element doesn't
// expose.
//
// The scroll-linked mark *transformation* (Commitment 12, further
// below) has the identical constraint but a different resolution: this
// component renders its own separate inline `<svg>` (`heroMarkMorphData.ts`
// fetches and parses `/ornamental-mark-morph.svg` and
// `/ornamental-logo-morph.svg` at runtime — dedicated assets, not the
// same `/ornamental-mark.svg`/`/ornamental-logo.svg` HeroComposition's
// own `<img>` and Section Navigation's own compact-logo `<img>` use,
// since those two need a different framing than this morph's own
// shared canvas does — never touching HeroComposition's own `<img>` or
// file) — a real path-geometry morph needs actual DOM access to
// `<path d>`, which only an inline SVG this component itself owns can
// provide.

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
const SCROLL_CUE_PULSE_CLASS = 'hero__scroll-cue--pulsing';

// Hero Scroll-Linked Content Exit & Mark Transformation (T-035,
// motion-interaction/technical-design.md; Commitments 11, 12) — both
// windows are fractions of Shared Scroll Progress Store's Hero-relative
// progress value (ui.md, Interaction Choreography: content exit ~0-35%
// of Hero height; mark transformation "~25-70%", itself an approximate
// figure). Unlike the entrance sequence above, this is driven directly
// and continuously by scroll position, not a timed animation —
// Commitment 16 AC9: stays fully active under reduced motion.
//
// The mark's own window starts at 0 (not some later fraction), per
// post-implementation developer direction on two counts: reaching the
// logo-like end state sooner, and — the more load-bearing reason — the
// mark must never be visibly cropped by the viewport's own top edge
// while scrolling. Before this component takes over, `.hero__mark` is
// `position: absolute` (document-flow) and scrolls normally, same as
// any other in-flow content — which means it *does* scroll off the top
// edge like normal content would, for as long as any "dead zone" delays
// this component's own `position: fixed` takeover (confirmed via a live
// Chrome check: with a start fraction of 0.1, the mark visibly clipped
// against the top edge for scroll positions *before* that threshold).
// Starting the window at 0 means the takeover — and with it, the
// guarantee the interpolated `top` never goes negative (both of its own
// endpoints are positive by construction) — begins at the very first
// pixel of scroll, leaving no such gap.
const CONTENT_EXIT_END = 0.35;
const MARK_TRANSFORM_START = 0;
const MARK_TRANSFORM_END = 0.35;

// Developer direction: the mark's own outer ornamentation (the 6 paths
// with no logo equivalent, `!isReal` in heroMarkMorphData.ts) doesn't
// all fade at once — it disappears in two sequential groups, fully
// gone before the 3 real paths (`isReal`) start morphing at all,
// rather than fading and morphing concurrently. Indices are 0-indexed
// file-order positions, specific to this exact asset pair
// (`/ornamental-mark-morph.svg` / `/ornamental-logo-morph.svg`)'s own
// known 9-path structure — confirmed against the developer's own
// color-coded reference (red/green/yellow, then orange/purple/cyan,
// leaving blue/magenta/lime to morph) — not a general inference from
// path geometry the way `isReal` itself is.
const MARK_FADE_GROUP_1_INDICES = new Set([0, 1, 2]);
const MARK_FADE_GROUP_2_INDICES = new Set([4, 5, 6]);
const MARK_FADE_GROUP_3_INDICES = new Set([3, 7, 8]);

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
  const morphSvgRef = useRef<SVGSVGElement>(null);
  const morphPathRefs = useRef<(SVGPathElement | null)[]>([]);
  // React state (triggers the one render that mounts the morph SVG's
  // own `<path>` elements) and a parallel ref (read fresh, every scroll
  // frame, by the stable — mount-once, empty-deps — layout effect
  // below, which would otherwise close over a stale `null` forever).
  const [morphData, setMorphData] = useState<MorphData | null>(null);
  const morphDataRef = useRef<MorphData | null>(null);
  const [mobileMorphHost, setMobileMorphHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (window.matchMedia(DESKTOP_QUERY).matches) return;
    setMobileMorphHost(containerRef.current?.querySelector<HTMLElement>('.hero__display') ?? null);
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadHeroMarkMorphData().then((data) => {
      if (cancelled) return;
      morphDataRef.current = data;
      setMorphData(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

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
    // Section Navigation's own public `data-testid` hook (never its
    // CSS-Modules-hashed class) — the same zero-code-coupling pattern
    // heroMarkMorph.scss's own (now-removed) CSS override used, and
    // `navTransitions.scss` also uses for this same Feature boundary.
    // Queried globally, not via `container`: the nav lives outside this
    // island's own subtree.
    const navDivider = document.querySelector<HTMLElement>('[data-testid="nav-divider"]');

    // This mark's own opacity fade-out point: stays fully visible for
    // the entire Hero scroll, handing off to Section Navigation's own
    // compact-logo mechanism (`navTransitions.scss`'s `::after`) only
    // once `isIntroduction` itself flips — driven by `#introduction`'s
    // bottom edge leaving the viewport, the same physical event
    // `heroProgress` reaching 1 tracks (`#introduction`/`.hero` share
    // the same box height). Per direct developer feedback ("keep the
    // morphed mark till the about also").
    const HERO_MARK_HIDE_THRESHOLD = 1;

    // Nav Divider gap (Section Navigation's own Commitment 8 state,
    // read/written here only through its public `data-testid` hook —
    // Design Decision, this file's own header note on the morph SVG
    // applies equally here: this component targets public DOM, never
    // Section Navigation's own code). Per direct developer feedback
    // ("close it slowly till reaches the about"): held fully open
    // (`DIVIDER_HERO_MARK_GAP_PERCENT`, matching SectionNav.module.
    // scss's own 'hero-mark' state) until half of Hero's height, then
    // closes continuously, tracking scroll 1:1, down to
    // `DIVIDER_LOGO_GAP_PERCENT` by the time Hero's full height is
    // scrolled (About reached) — set as an inline style rather than via
    // a class/attribute + CSS transition, for the same reason every
    // other value `applyScrollLinkedMotion` sets is: a CSS transition
    // would fight a per-frame scroll-driven value, lagging behind the
    // true scroll position instead of tracking it directly (Commitment
    // 16 AC9's own "driven directly by scroll position, not timed
    // animation" applies here too, even though this value isn't itself
    // a Contract commitment of this Feature's own).
    // Ends at `DIVIDER_LOGO_GAP_PERCENT` (SectionNav.module.scss's own
    // 'logo' state value), not fully closed (0%): per direct developer
    // feedback ("do not close it completly, finish the transition on
    // the same aperture as the about size"). Landing on the exact value
    // Section Navigation's own 'logo' state already uses means clearing
    // this override at `DIVIDER_CLOSE_END` (below) is visually
    // seamless — the divider is already sitting at the width Section
    // Navigation's own CSS would give it once `isIntroduction` flips,
    // so there's nothing left to animate at that hand-off.
    const DIVIDER_HERO_MARK_GAP_PERCENT = 52; // SectionNav.module.scss's own 'hero-mark' value — hand-synced.
    const DIVIDER_LOGO_GAP_PERCENT = 19; // SectionNav.module.scss's own 'logo' value — hand-synced.
    const DIVIDER_CLOSE_START = 0.5;
    const DIVIDER_CLOSE_END = 1;

    function clearDividerOverride() {
      navDivider?.style.removeProperty('--divider-gap');
      navDivider?.style.removeProperty('transition');
    }

    // Hero Scroll-Linked Content Exit & Mark Transformation (Commitments
    // 11, 12) — reads Shared Scroll Progress Store's Hero-relative value
    // directly and continuously; Commitment 16 AC9 requires this to stay
    // active under reduced motion, unlike the entrance/ambient-drift
    // logic below, so it is wired up independently of every branch's own
    // reduced-motion/already-played decision (see the three call sites
    // below), never gated on `prefersReducedMotion()`.
    function applyScrollLinkedMotion(progress: ScrollProgress) {
      if (navDivider) {
        if (progress.heroProgress < DIVIDER_CLOSE_END) {
          const closeT = clamp01(
            (progress.heroProgress - DIVIDER_CLOSE_START) / (DIVIDER_CLOSE_END - DIVIDER_CLOSE_START),
          );
          navDivider.style.setProperty(
            '--divider-gap',
            `${lerp(DIVIDER_HERO_MARK_GAP_PERCENT, DIVIDER_LOGO_GAP_PERCENT, closeT)}%`,
          );
          navDivider.style.setProperty('transition', 'none');
        } else {
          // About reached — hand control back to Section Navigation's
          // own CSS (including its own 250ms transition, now free to
          // animate the subsequent 0%→19% 'logo' handoff, since
          // Introduction itself has just been left).
          clearDividerOverride();
        }
      }

      const exitT = clamp01(progress.heroProgress / CONTENT_EXIT_END);
      const exitOpacity = 1 - exitT;
      contentExitEls.forEach((el) => {
        el.style.opacity = String(exitOpacity);
      });

      if (!mark) return;
      const markT = clamp01(
        (progress.heroProgress - MARK_TRANSFORM_START) / (MARK_TRANSFORM_END - MARK_TRANSFORM_START),
      );

      const morphData = morphDataRef.current;
      const morphSvg = morphSvgRef.current;

      if (window.matchMedia(DESKTOP_QUERY).matches && hero && naturalProbe && targetProbe && morphData && morphSvg) {
        // Desktop/tablet-with-space (Commitment 12 AC1): a real
        // path-geometry morph of the same element into the nav's
        // compact-logo form — never crossfades with a second one, per
        // developer direction rejecting an earlier scale/crop
        // approximation. `.hero__mark` itself stays a plain `<img>`
        // (hidden below, not morphed directly — still not inline SVG,
        // see this file's own top-of-file note); this island's own
        // separate inline `<svg>` (populated from `heroMarkMorphData.ts`)
        // is what actually morphs, positioned identically.
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

        // `.hero__mark` itself is never positioned/transformed on
        // desktop anymore — it's simply hidden. The morph SVG below is
        // this island's own element (a sibling of `.hero`, not a
        // descendant of it), so — unlike `.hero__mark` itself — it was
        // never trapped by `.hero`'s own `isolation: isolate` stacking
        // context in the first place (confirmed live: `.hero`'s own
        // isolation traps a *descendant's* z-index against the nav
        // bar's `z-index: 10`, regardless of that descendant's own
        // value — the fix that mattered was never touching this
        // element's own ancestry to begin with, not raising a number).
        mark.style.visibility = 'hidden';

        morphSvg.style.top = `${lerp(naturalTopSource, target.top, markT)}px`;
        morphSvg.style.width = `${lerp(naturalRect.width, target.width, markT)}px`;
        morphSvg.style.height = `${lerp(naturalRect.height, target.height, markT)}px`;
        morphSvg.style.opacity = progress.heroProgress < HERO_MARK_HIDE_THRESHOLD ? '1' : '0';

        // Developer direction: three *sequential* phases within the
        // same markT window (not concurrent) — fade group 1, then fade
        // group 2, then morph, each getting its own full 0→1 sub-range
        // of markT and clamping outside it. The morph (and the
        // viewBox crop that goes with it) only starts once both fade
        // groups have fully disappeared.
        const fadeGroup1T = clamp01(markT * 3);
        const fadeGroup2T = clamp01(markT * 3 - 1);
        const morphT = clamp01(markT * 3 - 2);

        const viewBox = morphData.fromViewBox.map((from, i) => lerp(from, morphData.toViewBox[i], morphT));
        morphSvg.setAttribute('viewBox', viewBox.join(' '));
        morphData.paths.forEach((p, i) => {
          const pathEl = morphPathRefs.current[i];
          if (!pathEl) return;
          if (p.isReal) {
            // The 3 paths with real target geometry: the actual
            // shape-morph, per Commitment 12 AC1.
            pathEl.setAttribute('d', buildInterpolatedD(p.template, p.fromNumbers, p.toNumbers, morphT));
          } else {
            // Developer direction: the 6 outer/lateral "orphan" paths
            // (no logo equivalent) fade out in place instead of having
            // their own geometry interpolated down to a single point —
            // collapsing real artwork to a vanishing dot read as a
            // shrink, not a fade, and looked like an artifact rather
            // than ornamentation dissolving away. `d` stays fixed at
            // the mark's own original shape throughout; only `opacity`
            // changes, in whichever of the two sequential groups this
            // path belongs to.
            const groupT = MARK_FADE_GROUP_1_INDICES.has(i)
              ? fadeGroup1T
              : MARK_FADE_GROUP_2_INDICES.has(i)
                ? fadeGroup2T
                : 0; // unexpected: neither group nor real — stays fully visible rather than guessing
            pathEl.style.opacity = String(1 - groupT);
          }
        });
      } else if (window.matchMedia(DESKTOP_QUERY).matches) {
        // Morph data hasn't loaded yet (or failed to) — graceful
        // fallback: leave `.hero__mark` in its plain, untransformed
        // resting state rather than reproducing a separate, cruder
        // mechanism. In practice this is a same-tab-session, sub-frame
        // window (a small local asset fetch), not a lasting degradation.
        mark.style.visibility = '';
        if (morphSvg) morphSvg.style.opacity = '0';
      } else {
        // Mobile (Commitment 12 AC2): no logomark destination exists —
        // dissolve the mark's own paths from the outside inward. The
        // same path data as the desktop morph is reused, but its geometry
        // and viewBox stay fixed: only opacity changes in three ordered
        // groups, so the effect reads as the ornamentation disappearing
        // into the center rather than shrinking or morphing into a logo.
        const mobileFadeGroup1T = clamp01(markT * 3);
        const mobileFadeGroup2T = clamp01(markT * 3 - 1);
        const mobileFadeGroup3T = clamp01(markT * 3 - 2);

        if (markT === 0) {
          mark.style.visibility = '';
          mark.style.clipPath = MARK_CLIP_VISIBLE;
        } else {
          mark.style.visibility = 'hidden';
          mark.style.clipPath = '';
        }

        if (morphSvg && morphData) {
          morphSvg.style.opacity = markT === 0 ? '0' : '1';
          morphSvg.setAttribute('viewBox', morphData.fromViewBox.join(' '));
          morphData.paths.forEach((p, i) => {
            const pathEl = morphPathRefs.current[i];
            if (!pathEl) return;
            pathEl.setAttribute('d', buildInterpolatedD(p.template, p.fromNumbers, p.fromNumbers, 0));
            const groupT = MARK_FADE_GROUP_1_INDICES.has(i)
              ? mobileFadeGroup1T
              : MARK_FADE_GROUP_2_INDICES.has(i)
                ? mobileFadeGroup2T
                : MARK_FADE_GROUP_3_INDICES.has(i)
                  ? mobileFadeGroup3T
                  : 0;
            pathEl.style.opacity = String(1 - groupT);
          });
        }
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
      const scrollCue = container.querySelector<HTMLElement>('.hero__scroll-cue');
      scrollCue?.classList.add(SCROLL_CUE_PULSE_CLASS);
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

    function settleHeroElements() {
      mark?.style.setProperty('opacity', '1');
      mark?.style.setProperty('clip-path', MARK_CLIP_VISIBLE);
      headlinePrimary?.style.setProperty('opacity', '1');
      secondaryHeadlineEls.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = '';
      });
      finalBeatEls.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = '';
      });
    }

    // Commitment 16 AC2: reduced-motion resolves directly to the
    // end-state and the ambient drift never begins — checked before the
    // played flag since it applies regardless of whether this is the
    // visit's first arrival.
    if (prefersReducedMotion()) {
      unsubscribeScroll = subscribeScrollProgress(applyScrollLinkedMotion);
      return () => {
        ambientControls?.stop();
        container.querySelector<HTMLElement>('.hero__scroll-cue')?.classList.remove(SCROLL_CUE_PULSE_CLASS);
        unsubscribeScroll?.();
        clearDividerOverride();
      };
    }

    // Commitment 2 AC2: any settled visit (this session already played
    // the sequence) renders final state directly, no replay.
    if (isHeroEntrancePlayed()) {
      settleHeroElements();
      startAmbientDrift();
      unsubscribeScroll = subscribeScrollProgress(applyScrollLinkedMotion);
      return () => {
        ambientControls?.stop();
        container.querySelector<HTMLElement>('.hero__scroll-cue')?.classList.remove(SCROLL_CUE_PULSE_CLASS);
        unsubscribeScroll?.();
        clearDividerOverride();
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
      container.querySelector<HTMLElement>('.hero__scroll-cue')?.classList.remove(SCROLL_CUE_PULSE_CLASS);
      unsubscribeScroll?.();
      clearDividerOverride();
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
      {/*
        Hero Mark → compact-logo morph (T-035, Commitment 12 AC1) — this
        island's own inline SVG (never Hero Composition's own `<img>`,
        which stays hidden but untouched on desktop), rendering the
        exact same paths/gradients `heroMarkMorphData.ts` fetched from
        `/ornamental-mark-morph.svg`. Its `d`/`viewBox` are set once here (the
        markT=0 state, identical to the plain mark) and imperatively
        thereafter, in the layout effect above — a real path-geometry
        morph needs actual attribute access no `<img>` can provide.
        Rendered only once the fetch resolves; `display: none` in its
        own stylesheet otherwise.
      */}
      {morphData &&
        (() => {
          const morphElement = (
            <svg
              ref={morphSvgRef}
              className="hero-mark-morph"
              viewBox={morphData.fromViewBox.join(' ')}
              aria-hidden="true"
            >
              <defs dangerouslySetInnerHTML={{ __html: morphData.gradientDefsMarkup }} />
              {morphData.paths.map((p, i) => (
                <path
                  key={i}
                  ref={(el) => {
                    morphPathRefs.current[i] = el;
                  }}
                  fill={p.fill}
                  d={buildInterpolatedD(p.template, p.fromNumbers, p.toNumbers, 0)}
                />
              ))}
            </svg>
          );
          return mobileMorphHost ? createPortal(morphElement, mobileMorphHost) : morphElement;
        })()}
    </div>
  );
}
