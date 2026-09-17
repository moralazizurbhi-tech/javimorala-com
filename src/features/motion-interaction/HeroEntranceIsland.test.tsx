// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import HeroEntranceIsland from './HeroEntranceIsland';
import * as motionPlaybackStore from './motionPlaybackStore';

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
    // jsdom has no built-in IntersectionObserver; heroStaticMarkup()'s
    // `#hero-mark-boundary` sentinel (T-035) needs one to exist so this
    // component's own read-only observer of it doesn't throw.
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
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
    render(<HeroEntranceIsland>{heroStaticMarkup()}</HeroEntranceIsland>);

    vi.advanceTimersByTime(30_000);

    expect(animateCalls).toHaveLength(0);
  });

  it('already played this session: renders final state directly (no entrance animation) but starts ambient drift', () => {
    vi.stubGlobal('matchMedia', matchMediaMock(false));
    vi.spyOn(motionPlaybackStore, 'isHeroEntrancePlayed').mockReturnValue(true);
    const markPlayedSpy = vi.spyOn(motionPlaybackStore, 'markHeroEntrancePlayed');

    render(<HeroEntranceIsland>{heroStaticMarkup()}</HeroEntranceIsland>);

    expect(animateCalls).toHaveLength(1);
    expect((animateCalls[0].target as Element).className).toContain('hero__mark');
    expect(animateCalls[0].options.repeat).toBe(Infinity);
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
    const offsetCalls = animateCalls.filter((call) =>
      offsetTargetClasses.some((cls) => (call.target as Element).className.includes(cls)),
    );

    expect(offsetCalls).toHaveLength(4);
    for (const call of offsetCalls) {
      expect(call.keyframes.translate).toBeUndefined();
      expect(call.keyframes.y).toEqual([12, 0]);
    }
  });
});

let markBoundaryObserverInstances: MockIntersectionObserver[] = [];

class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    markBoundaryObserverInstances.push(this);
  }
  observe() {}
  disconnect() {}
  unobserve() {}
}

function fireMarkBoundary(isIntersecting: boolean) {
  const observer = markBoundaryObserverInstances[markBoundaryObserverInstances.length - 1];
  observer.callback([{ isIntersecting } as unknown as IntersectionObserverEntry], {} as IntersectionObserver);
}

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
    markBoundaryObserverInstances = [];
    vi.stubGlobal('sessionStorage', undefined);
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    // Runs the store's rAF-scheduled notification synchronously so each
    // test can assert immediately after dispatching a scroll event,
    // without depending on jsdom's own asynchronous rAF timing.
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });
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

  it('desktop: continuously morphs `.hero__mark` — the same element, fixed-positioned — between the natural and nav-target rects across the 25%-70% window (Commitment 12 AC1, AC3)', () => {
    const { container } = renderReducedMotion(true);
    const mark = container.querySelector<HTMLElement>('.hero__mark')!;

    // Before the window starts, `top` tracks the natural probe's own
    // live (scroll-drifting) rect directly — this is the regression a
    // live-Chrome check caught: an earlier version pre-applied the
    // window-start freeze even here, snapping the mark to a shifted
    // position the instant this effect mounted, before any scrolling.
    setHeroProgress(container, 0.1);
    expect(mark.style.top).toBe('170px');

    setHeroProgress(container, 0.25);
    expect(mark.style.position).toBe('fixed');
    expect(mark.style.top).toBe('20px');
    expect(mark.style.width).toBe('700px');
    expect(mark.style.height).toBe('700px');

    setHeroProgress(container, (0.25 + 0.7) / 2);
    expect(mark.style.top).toBe('14px');
    expect(mark.style.width).toBe('415px');
    expect(mark.style.height).toBe('470px');

    setHeroProgress(container, 0.7);
    expect(mark.style.top).toBe('8px');
    expect(mark.style.width).toBe('130px');
    expect(mark.style.height).toBe('240px');

    // Reversible: scrolling back to the window's start restores the
    // natural rect exactly (Commitment 12 AC3).
    setHeroProgress(container, 0.25);
    expect(mark.style.top).toBe('20px');
  });

  it('desktop: hides the docked mark once Hero\'s own mark-visibility sentinel clears the viewport, handing the visual role back to Section Navigation\'s own compact-logo mechanism (regression: the two otherwise double up at the same position)', () => {
    const { container } = renderReducedMotion(true);
    const mark = container.querySelector<HTMLElement>('.hero__mark')!;
    setHeroProgress(container, 0.7);
    expect(mark.style.opacity).toBe('1');

    fireMarkBoundary(false);
    setHeroProgress(container, 0.9);
    expect(mark.style.opacity).toBe('0');

    // Scrolling back up restores it, symmetric with the sentinel
    // re-intersecting.
    fireMarkBoundary(true);
    setHeroProgress(container, 0.7);
    expect(mark.style.opacity).toBe('1');
  });

  it('mobile: dissolves `.hero__mark` via a reverse trace of its own entrance stroke (clip-path), never overriding its position (Commitment 12 AC2)', () => {
    const { container } = renderReducedMotion(false);
    const mark = container.querySelector<HTMLElement>('.hero__mark')!;

    setHeroProgress(container, 0.25);
    expect(mark.style.clipPath).toBe('inset(0 0% 0 0%)');
    expect(mark.style.position).toBe('');

    setHeroProgress(container, 0.7);
    expect(mark.style.clipPath).toBe('inset(0 50% 0 50%)');
    expect(mark.style.position).toBe('');
  });
});
