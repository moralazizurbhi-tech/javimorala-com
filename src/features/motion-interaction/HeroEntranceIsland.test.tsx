// @vitest-environment jsdom
import { cleanup, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import HeroEntranceIsland from './HeroEntranceIsland';
import * as motionPlaybackStore from './motionPlaybackStore';
import { loadHeroMarkMorphData, tokenizePathD, type MorphData } from './heroMarkMorphData';

// The morph itself (parsing/interpolating real SVG paths) is already
// thoroughly covered by heroMarkMorphData.test.ts in isolation; here,
// `loadHeroMarkMorphData` is mocked to a small canned fixture so these
// tests exercise only this component's own wiring (which element gets
// which attribute, when) without needing to fetch/parse real assets in
// jsdom.
vi.mock('./heroMarkMorphData', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./heroMarkMorphData')>();
  return { ...actual, loadHeroMarkMorphData: vi.fn() };
});

// Mirrors the real assets' own 9-path layout: indices 0/1/2 and 4/5/6
// are orphans (developer-confirmed two fade groups), 3/7/8 are the real
// morph trio — matching `HeroEntranceIsland`'s own
// `MARK_FADE_GROUP_1_INDICES`/`MARK_FADE_GROUP_2_INDICES` constants, so
// these tests exercise the same index positions the component hardcodes.
function morphFixture(): MorphData {
  const template = tokenizePathD('M0,0 L100,100')!;
  const orphan = (fill: string) =>
    ({ template, fromNumbers: [0, 0, 100, 100], toNumbers: [50, 50, 50, 50], fill, isReal: false }) as const;
  const real = (fill: string) =>
    ({ template, fromNumbers: [0, 0, 100, 100], toNumbers: [10, 10, 20, 20], fill, isReal: true }) as const;
  return {
    paths: [
      orphan('url(#o0)'),
      orphan('url(#o1)'),
      orphan('url(#o2)'),
      real('url(#r3)'),
      orphan('url(#o4)'),
      orphan('url(#o5)'),
      orphan('url(#o6)'),
      real('url(#r7)'),
      real('url(#r8)'),
    ],
    gradientDefsMarkup: '<linearGradient id="g"><stop offset="0" stop-color="#fff"/></linearGradient>',
    fromViewBox: [0, 0, 1216, 780],
    toViewBox: [400, 100, 200, 300],
  };
}

const animateCalls: Array<{ target: Element; keyframes: Record<string, unknown>; options: Record<string, unknown> }> = [];
const stoppedControls: Element[] = [];

// Returns a thenable (not just `{ stop }`) so the component's real
// `await Promise.all(sequenceAnimations)` gating logic — awaiting each
// animation's own completion rather than a guessed-duration timer — is
// genuinely exercised under fake timers, not short-circuited by a
// mock that resolves instantly regardless of `duration`. An
// infinite-repeat animation (the ambient drift) never resolves, same
// as a real one never "finishing".
vi.mock('framer-motion', () => ({
  animate: (target: Element, keyframes: Record<string, unknown>, options: Record<string, unknown>) => {
    animateCalls.push({ target, keyframes, options });
    let resolveFn: () => void = () => {};
    const promise = new Promise<void>((resolve) => {
      resolveFn = resolve;
    });
    if (options.repeat !== Infinity && typeof options.duration === 'number') {
      setTimeout(resolveFn, options.duration * 1000);
    }
    return { stop: () => stoppedControls.push(target), then: promise.then.bind(promise) };
  },
}));

function matchMediaMock(matches: boolean) {
  return (query: string) => ({
    matches,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  });
}

function heroStaticMarkup() {
  return (
    <div>
      <div className="hero">
        <div className="hero__display">
          <img className="hero__mark" src="/ornamental-mark.svg" alt="" />
          <span id="hero-mark-boundary" className="hero__mark-boundary" />
          <h1 className="hero__headline">
            <span className="hero__headline-primary">Building</span>
            <span className="hero__headline-secondary-group">
              <span className="hero__headline-secondary hero__headline-secondary--1">the web</span>
              <span className="hero__headline-secondary hero__headline-secondary--2">with a rebellious streak</span>
            </span>
          </h1>
        </div>
        <p className="hero__scroll-cue">
          <span>scroll</span>
        </p>
      </div>
      <div className="introduction__presence-links">
        <a href="https://example.com">presence link</a>
      </div>
    </div>
  );
}

describe('HeroEntranceIsland (motion-interaction/contract.md Commitment 2, 16)', () => {
  beforeEach(() => {
    animateCalls.length = 0;
    stoppedControls.length = 0;
    vi.useFakeTimers();
    vi.stubGlobal('sessionStorage', undefined);
    // Unrelated to this describe block's own entrance-sequence focus —
    // just a safe default so the separate morph-data-loading effect
    // (T-035) doesn't throw calling `.then()` on `vi.mock`'s own
    // default (parameterless `vi.fn()`, which returns `undefined`).
    vi.mocked(loadHeroMarkMorphData).mockResolvedValue(null);
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    document.documentElement.classList.remove('js-hero-entrance-pending');
  });

  it('removes BaseLayout\'s pre-hide guard class on mount, in every branch (reduced motion, already played, and the full sequence)', () => {
    // BaseLayout.astro's blocking script adds `js-hero-entrance-pending`
    // to <html> before first paint to avoid a flash of fully-visible
    // content; this component must remove it the moment it takes over,
    // regardless of which path it then takes.
    document.documentElement.classList.add('js-hero-entrance-pending');
    vi.stubGlobal('matchMedia', matchMediaMock(true));

    render(<HeroEntranceIsland>{heroStaticMarkup()}</HeroEntranceIsland>);

    expect(document.documentElement.classList.contains('js-hero-entrance-pending')).toBe(false);
  });

  it('never alters Hero Composition\'s own static markup/content', () => {
    vi.stubGlobal('matchMedia', matchMediaMock(true));
    const { container } = render(<HeroEntranceIsland>{heroStaticMarkup()}</HeroEntranceIsland>);

    expect(container.querySelector('.hero__mark')).not.toBeNull();
    expect(container.querySelector('.hero__headline-primary')?.textContent).toBe('Building');
    expect(container.querySelector('.introduction__presence-links')).not.toBeNull();
  });

  it('reduced motion: resolves directly to end-state with no animation and never starts ambient drift', () => {
    vi.stubGlobal('matchMedia', matchMediaMock(true));
    const { container } = render(<HeroEntranceIsland>{heroStaticMarkup()}</HeroEntranceIsland>);

    vi.advanceTimersByTime(30_000);

    expect(animateCalls).toHaveLength(0);
  });

  it('already played this session: renders final state directly (no entrance animation) but starts ambient drift', () => {
    vi.stubGlobal('matchMedia', matchMediaMock(false));
    vi.spyOn(motionPlaybackStore, 'isHeroEntrancePlayed').mockReturnValue(true);
    const markPlayedSpy = vi.spyOn(motionPlaybackStore, 'markHeroEntrancePlayed');

    const { container } = render(<HeroEntranceIsland>{heroStaticMarkup()}</HeroEntranceIsland>);

    expect(animateCalls).toHaveLength(1);
    expect((animateCalls[0].target as Element).className).toContain('hero__mark');
    expect(animateCalls[0].options.repeat).toBe(Infinity);
    expect(container.querySelector('.hero__scroll-cue')?.classList.contains('hero__scroll-cue--pulsing')).toBe(true);
    expect(container.querySelector<HTMLElement>('.hero__scroll-cue')?.style.opacity).toBe('1');
    expect(markPlayedSpy).not.toHaveBeenCalled();
  });

  it('not yet played, motion allowed: sequences mark, then headline lines, then the closing beat, then marks played and starts drift', async () => {
    vi.stubGlobal('matchMedia', matchMediaMock(false));
    vi.spyOn(motionPlaybackStore, 'isHeroEntrancePlayed').mockReturnValue(false);
    const markPlayedSpy = vi.spyOn(motionPlaybackStore, 'markHeroEntrancePlayed').mockImplementation(() => {});

    render(<HeroEntranceIsland>{heroStaticMarkup()}</HeroEntranceIsland>);

    // Mark bloom starts immediately.
    expect(animateCalls).toHaveLength(1);
    expect((animateCalls[0].target as Element).className).toContain('hero__mark');

    // Headline cascade (primary + two secondary lines) starts shortly after, before the closing beat.
    await vi.advanceTimersByTimeAsync(700);
    const headlineTargets = animateCalls.slice(1).map((call) => (call.target as Element).className);
    expect(headlineTargets.some((c) => c.includes('hero__headline-primary'))).toBe(true);
    expect(headlineTargets.some((c) => c.includes('hero__headline-secondary--1'))).toBe(true);
    expect(headlineTargets.some((c) => c.includes('hero__headline-secondary--2'))).toBe(true);
    expect(markPlayedSpy).not.toHaveBeenCalled();

    // Closing beat (scroll cue + Presence Links) starts and finishes well before the
    // mark's own (longer) bloom does — settlement must still wait for the mark.
    await vi.advanceTimersByTimeAsync(600);
    const closingTargets = animateCalls.map((call) => (call.target as Element).className);
    expect(closingTargets.some((c) => c.includes('hero__scroll-cue'))).toBe(true);
    expect(closingTargets.some((c) => c.includes('introduction__presence-links'))).toBe(true);
    expect(markPlayedSpy).not.toHaveBeenCalled();

    // Only once the slowest animation (the mark's own bloom) actually finishes does
    // settlement happen — the regression this guards: settlement must never fire on a
    // guessed elapsed-time timer while an animation is still genuinely in flight.
    await vi.advanceTimersByTimeAsync(1000);
    expect(markPlayedSpy).toHaveBeenCalledTimes(1);

    // Ambient drift begins only after settling, as the final call.
    const lastCall = animateCalls[animateCalls.length - 1];
    expect((lastCall.target as Element).className).toContain('hero__mark');
    expect(lastCall.options.repeat).toBe(Infinity);
  });

  it('starts a slow scroll-cue pulse only after the entrance settles', async () => {
    vi.stubGlobal('matchMedia', matchMediaMock(false));
    vi.spyOn(motionPlaybackStore, 'isHeroEntrancePlayed').mockReturnValue(false);
    vi.spyOn(motionPlaybackStore, 'markHeroEntrancePlayed').mockImplementation(() => {});

    const { container } = render(<HeroEntranceIsland>{heroStaticMarkup()}</HeroEntranceIsland>);
    expect(animateCalls.some((call) => (call.target as Element).className.includes('hero__scroll-cue'))).toBe(false);

    await vi.advanceTimersByTimeAsync(3000);

    expect(container.querySelector('.hero__scroll-cue')?.classList.contains('hero__scroll-cue--pulsing')).toBe(true);
  });

  it('never animates `transform` on elements whose existing transform must be preserved (mark, headline primary)', async () => {
    vi.stubGlobal('matchMedia', matchMediaMock(false));
    vi.spyOn(motionPlaybackStore, 'isHeroEntrancePlayed').mockReturnValue(false);
    vi.spyOn(motionPlaybackStore, 'markHeroEntrancePlayed').mockImplementation(() => {});

    render(<HeroEntranceIsland>{heroStaticMarkup()}</HeroEntranceIsland>);
    await vi.advanceTimersByTimeAsync(3000);

    for (const call of animateCalls) {
      const className = (call.target as Element).className;
      if (className.includes('hero__mark') || className.includes('hero__headline-primary')) {
        expect(call.keyframes.transform).toBeUndefined();
      }
    }
  });

  it('regression: gives the secondary headline lines, scroll cue, and Presence Links an actual `y` entrance offset, never the unsupported literal `translate` property', async () => {
    // Framer Motion's DOM `animate()` silently drops an unrecognized
    // `translate` keyframe instead of animating it (confirmed via a live
    // Chrome reproduction — T-019 post-implementation correction) — this
    // guards against reintroducing that exact regression.
    vi.stubGlobal('matchMedia', matchMediaMock(false));
    vi.spyOn(motionPlaybackStore, 'isHeroEntrancePlayed').mockReturnValue(false);
    vi.spyOn(motionPlaybackStore, 'markHeroEntrancePlayed').mockImplementation(() => {});

    render(<HeroEntranceIsland>{heroStaticMarkup()}</HeroEntranceIsland>);
    await vi.advanceTimersByTimeAsync(3000);

    const offsetTargetClasses = [
      'hero__headline-secondary--1',
      'hero__headline-secondary--2',
      'hero__scroll-cue',
      'introduction__presence-links',
    ];
    const offsetCalls = animateCalls.filter(
      (call) =>
        call.keyframes.y && !call.keyframes.scale && offsetTargetClasses.some((cls) => (call.target as Element).className.includes(cls)),
    );

    expect(offsetCalls).toHaveLength(4);
    for (const call of offsetCalls) {
      expect(call.keyframes.translate).toBeUndefined();
      expect(call.keyframes.y).toEqual([12, 0]);
    }
  });
});

function mockRect(container: HTMLElement, selector: string, rect: Partial<DOMRect>) {
  const el = container.querySelector<HTMLElement>(selector);
  if (!el) throw new Error(`missing ${selector}`);
  vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: () => ({}),
    ...rect,
  } as DOMRect);
  return el;
}

describe('HeroEntranceIsland — Hero Scroll-Linked Content Exit & Mark Transformation (T-035, motion-interaction/contract.md Commitment 11, 12, 16 AC9)', () => {
  beforeEach(() => {
    animateCalls.length = 0;
    stoppedControls.length = 0;
    vi.stubGlobal('sessionStorage', undefined);
    // Runs the store's rAF-scheduled notification synchronously so each
    // test can assert immediately after dispatching a scroll event,
    // without depending on jsdom's own asynchronous rAF timing.
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });
    vi.mocked(loadHeroMarkMorphData).mockResolvedValue(morphFixture());
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    document.documentElement.classList.remove('js-hero-entrance-pending');
  });

  // Reduced motion (Commitment 16 AC1) resolves the entrance synchronously,
  // so the scroll-linked subscription attaches immediately — the simplest
  // path to exercise it without waiting on the async entrance sequence,
  // and doubles as Commitment 16 AC9's own regression guard (stays active
  // under reduced motion, unlike the entrance/ambient-drift logic above).
  function renderReducedMotion(desktopMatches: boolean) {
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: query.includes('prefers-reduced-motion') ? true : desktopMatches,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    return render(<HeroEntranceIsland>{heroStaticMarkup()}</HeroEntranceIsland>);
  }

  function setHeroProgress(container: HTMLElement, fraction: number) {
    // heroProgress = -rect.top / rect.height; a 1000px-tall Hero makes
    // `fraction` read directly as -top/1000. Also mocks the natural
    // probe drifting by the same `scrollY` (it's `position: absolute`,
    // document-flow, exactly like `.hero__mark` itself pre-transform)
    // and the target probe staying put (it's `position: fixed`) — a
    // physically coherent scroll scenario, needed to exercise the
    // document-space freeze fix below (a live-Chrome-caught regression:
    // blending directly against the natural probe's own live,
    // still-drifting rect mid-transformation made the mark race
    // off-screen before snapping back near the target).
    const scrollY = 1000 * fraction;
    vi.stubGlobal('scrollY', scrollY);
    mockRect(container, '.hero', { top: -scrollY, height: 1000 });
    mockRect(container, '.hero-mark-natural-probe', { top: 270 - scrollY, width: 700, height: 700 });
    mockRect(container, '.hero-mark-target-probe', { top: 8, width: 130, height: 240 });
    window.dispatchEvent(new Event('scroll'));
  }

  it('fades headline/scroll-cue/Presence Links continuously (opacity 1→0) over the first 35% of Hero height, reversibly (Commitment 11)', () => {
    const { container } = renderReducedMotion(false);
    setHeroProgress(container, 0.35 / 2);

    const primary = container.querySelector<HTMLElement>('.hero__headline-primary')!;
    const secondary1 = container.querySelector<HTMLElement>('.hero__headline-secondary--1')!;
    const cue = container.querySelector<HTMLElement>('.hero__scroll-cue')!;
    const presence = container.querySelector<HTMLElement>('.introduction__presence-links')!;
    expect(primary.style.opacity).toBe('0.5');
    expect(secondary1.style.opacity).toBe('0.5');
    expect(cue.style.opacity).toBe('0.5');
    expect(presence.style.opacity).toBe('0.5');

    // Reversible 1:1 with scroll position, not a one-way dismissal.
    setHeroProgress(container, 0);
    expect(primary.style.opacity).toBe('1');

    setHeroProgress(container, 1);
    expect(primary.style.opacity).toBe('0');
  });

  it('desktop: hides the plain `.hero__mark` `<img>` and morphs this island\'s own inline SVG — position/size between the natural and nav-target rects, viewBox and the *real* path\'s own `d` between the mark and logo geometry — across the 0%-35% window (Commitment 12 AC1, AC3)', async () => {
    const { container } = renderReducedMotion(true);
    await waitFor(() => expect(container.querySelector('.hero-mark-morph')).not.toBeNull());
    const mark = container.querySelector<HTMLElement>('.hero__mark')!;
    const morphSvg = container.querySelector<SVGSVGElement>('.hero-mark-morph')!;
    // Index 3 is one of the fixture's "real" (morphing) paths — see
    // `morphFixture`'s own layout comment.
    const realPath = morphSvg.querySelectorAll('path')[3];

    // The window starts at 0 (not some later fraction) — post-
    // implementation developer direction, load-bearing reason: before
    // this effect's `position: fixed` takeover engages, `.hero__mark`
    // is still `position: absolute` (document-flow) and scrolls off the
    // top edge like any other in-flow content would. A live Chrome
    // check confirmed exactly that with a nonzero start fraction (the
    // mark visibly clipped against the top edge for scroll positions
    // before the threshold) — starting at 0 means the takeover, and the
    // guarantee `top` never goes negative, begins at the very first
    // pixel of scroll.
    setHeroProgress(container, 0);
    expect(mark.style.visibility).toBe('hidden');
    expect(morphSvg.style.top).toBe('270px');
    expect(morphSvg.style.width).toBe('700px');
    expect(morphSvg.style.height).toBe('700px');
    expect(morphSvg.getAttribute('viewBox')).toBe('0 0 1216 780');
    expect(realPath.getAttribute('d')).toBe('M 0 0 L 100 100');

    // Position/size track scroll continuously across the whole window,
    // but the real geometry and viewBox only morph in the *final* third
    // (markT 2/3→1) — developer direction: both fade groups must fully
    // disappear before the morph itself starts (see the two fade-group
    // tests below).
    setHeroProgress(container, 0.35 / 2);
    expect(parseFloat(morphSvg.style.top)).toBeCloseTo(139);
    expect(parseFloat(morphSvg.style.width)).toBeCloseTo(415);
    expect(parseFloat(morphSvg.style.height)).toBeCloseTo(470);
    expect(morphSvg.getAttribute('viewBox')).toBe('0 0 1216 780');
    expect(realPath.getAttribute('d')).toBe('M 0 0 L 100 100');

    setHeroProgress(container, 0.35);
    expect(morphSvg.style.top).toBe('8px');
    // Morphing means finishing at the same box the real compact logo
    // itself occupies (the target probe), not some approximated size.
    expect(morphSvg.style.width).toBe('130px');
    expect(morphSvg.style.height).toBe('240px');
    expect(morphSvg.getAttribute('viewBox')).toBe('400 100 200 300');
    expect(realPath.getAttribute('d')).toBe('M 10 10 L 20 20');

    // Reversible: scrolling back to the window's start restores the
    // natural rect and the mark's own original geometry exactly
    // (Commitment 12 AC3).
    setHeroProgress(container, 0);
    expect(morphSvg.style.top).toBe('270px');
    expect(realPath.getAttribute('d')).toBe('M 0 0 L 100 100');
  });

  it('desktop: fades the orphan (non-real) paths out in place, in two sequential groups that each fully finish before the next phase starts — developer direction, avoiding both a "shrinks to a vanishing dot" look and a busy all-at-once dissolve', async () => {
    const { container } = renderReducedMotion(true);
    await waitFor(() => expect(container.querySelector('.hero-mark-morph')).not.toBeNull());
    const morphSvg = container.querySelector<SVGSVGElement>('.hero-mark-morph')!;
    const paths = morphSvg.querySelectorAll('path');
    const group1Path = paths[0]; // MARK_FADE_GROUP_1_INDICES
    const group2Path = paths[4]; // MARK_FADE_GROUP_2_INDICES
    const realPath = paths[3]; // morph trio — untouched until both groups are gone

    setHeroProgress(container, 0);
    expect(group1Path.style.opacity).toBe('1');
    expect(group2Path.style.opacity).toBe('1');

    // First third: group 1 fades all the way out; group 2 hasn't started.
    setHeroProgress(container, 0.35 / 6); // markT = 1/6 → mid group-1 fade
    expect(group1Path.getAttribute('d')).toBe('M 0 0 L 100 100'); // `d` never changes — only opacity fades
    expect(group1Path.style.opacity).toBe('0.5');
    expect(group2Path.style.opacity).toBe('1');
    expect(realPath.getAttribute('d')).toBe('M 0 0 L 100 100');

    setHeroProgress(container, 0.35 / 3); // markT = 1/3 → group 1 fully gone
    expect(group1Path.style.opacity).toBe('0');
    expect(group2Path.style.opacity).toBe('1');
    expect(realPath.getAttribute('d')).toBe('M 0 0 L 100 100');

    // Second third: group 1 stays gone; group 2 fades out; the morph trio
    // still hasn't moved.
    setHeroProgress(container, 0.35 / 2); // markT = 1/2 → mid group-2 fade
    expect(group1Path.style.opacity).toBe('0');
    expect(group2Path.style.opacity).toBe('0.5');
    expect(realPath.getAttribute('d')).toBe('M 0 0 L 100 100');

    setHeroProgress(container, (0.35 * 2) / 3); // markT = 2/3 → group 2 fully gone
    expect(group1Path.style.opacity).toBe('0');
    expect(group2Path.style.opacity).toBe('0');
    expect(realPath.getAttribute('d')).toBe('M 0 0 L 100 100');

    // Final third: both groups already gone — only now does the morph trio move.
    setHeroProgress(container, 0.35 * (5 / 6)); // markT = 5/6 → mid morph
    expect(realPath.getAttribute('d')).toBe('M 5 5 L 60 60');

    setHeroProgress(container, 0.35);
    expect(realPath.getAttribute('d')).toBe('M 10 10 L 20 20');

    // Reversible, same as the real path.
    setHeroProgress(container, 0);
    expect(group1Path.style.opacity).toBe('1');
    expect(group2Path.style.opacity).toBe('1');
  });

  it('desktop: hides the morph SVG (not the already-hidden `.hero__mark`) once heroProgress reaches HERO_MARK_HIDE_THRESHOLD (1, a full Hero height scrolled), handing the visual role back to Section Navigation\'s own compact-logo mechanism (regression: the two otherwise double up at the same position)', async () => {
    const { container } = renderReducedMotion(true);
    await waitFor(() => expect(container.querySelector('.hero-mark-morph')).not.toBeNull());
    const mark = container.querySelector<HTMLElement>('.hero__mark')!;
    const morphSvg = container.querySelector<SVGSVGElement>('.hero-mark-morph')!;

    setHeroProgress(container, 0.9);
    expect(mark.style.visibility).toBe('hidden');
    expect(morphSvg.style.opacity).toBe('1');

    setHeroProgress(container, 1);
    expect(morphSvg.style.opacity).toBe('0');

    // Reversible: scrolling back up restores it.
    setHeroProgress(container, 0.9);
    expect(morphSvg.style.opacity).toBe('1');
  });

  it('desktop: closes Section Navigation\'s divider gap continuously from half of Hero\'s height to a full Hero height (About reached), tracking scroll 1:1 rather than snapping, landing on the same aperture as Section Navigation\'s own \'logo\' state (not fully closed) before handing control back to its own CSS', async () => {
    const navDivider = document.createElement('div');
    navDivider.setAttribute('data-testid', 'nav-divider');
    document.body.appendChild(navDivider);
    try {
      const { container } = renderReducedMotion(true);
      await waitFor(() => expect(container.querySelector('.hero-mark-morph')).not.toBeNull());

      setHeroProgress(container, 0.25);
      expect(navDivider.style.getPropertyValue('--divider-gap')).toBe('52%');
      expect(navDivider.style.transition).toBe('none');

      setHeroProgress(container, 0.75);
      expect(navDivider.style.getPropertyValue('--divider-gap')).toBe('35.5%');

      setHeroProgress(container, 1);
      expect(navDivider.style.getPropertyValue('--divider-gap')).toBe('');
      expect(navDivider.style.transition).toBe('');
    } finally {
      navDivider.remove();
    }
  });

  it('desktop: falls back to the plain, untransformed `.hero__mark` while morph data hasn\'t loaded yet (or failed to)', () => {
    vi.mocked(loadHeroMarkMorphData).mockReturnValue(new Promise(() => {})); // never resolves
    const { container } = renderReducedMotion(true);
    const mark = container.querySelector<HTMLElement>('.hero__mark')!;

    setHeroProgress(container, 0.2);

    expect(mark.style.visibility).toBe('');
    expect(container.querySelector('.hero-mark-morph')).toBeNull();
  });

  it('mobile: dissolves the mark paths from the outside inward, never overriding the mark position (Commitment 12 AC2)', async () => {
    const { container } = renderReducedMotion(false);
    const mark = container.querySelector<HTMLElement>('.hero__mark')!;
    await waitFor(() => expect(container.querySelector('.hero-mark-morph')).not.toBeNull());
    const morphSvg = container.querySelector<SVGSVGElement>('.hero-mark-morph')!;
    const paths = morphSvg.querySelectorAll('path');

    setHeroProgress(container, 0);
    expect(mark.style.visibility).toBe('');
    expect(morphSvg.style.opacity).toBe('0');
    expect(paths[0].style.opacity).toBe('1');
    expect(paths[4].style.opacity).toBe('1');
    expect(paths[3].style.opacity).toBe('1');
    expect(mark.style.position).toBe('');

    setHeroProgress(container, 0.35 / 6);
    expect(paths[0].style.opacity).toBe('0.5');
    expect(paths[4].style.opacity).toBe('1');
    expect(paths[3].style.opacity).toBe('1');

    setHeroProgress(container, 0.35 / 2);
    expect(paths[0].style.opacity).toBe('0');
    expect(paths[4].style.opacity).toBe('0.5');
    expect(paths[3].style.opacity).toBe('1');

    setHeroProgress(container, 0.35 * (5 / 6));
    expect(paths[0].style.opacity).toBe('0');
    expect(paths[4].style.opacity).toBe('0');
    expect(Number(paths[3].style.opacity)).toBeCloseTo(0.5);

    setHeroProgress(container, 0.35);
    expect(paths[3].style.opacity).toBe('0');

    setHeroProgress(container, 0);
    expect(mark.style.visibility).toBe('');
    expect(morphSvg.style.opacity).toBe('0');
    expect(paths[0].style.opacity).toBe('1');
    expect(mark.style.position).toBe('');
  });
});
