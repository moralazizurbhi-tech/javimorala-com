// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import HeroEntranceIsland from './HeroEntranceIsland';
import * as motionPlaybackStore from './motionPlaybackStore';

const animateCalls: Array<{ target: Element; keyframes: Record<string, unknown>; options: Record<string, unknown> }> = [];
const stoppedControls: Element[] = [];

vi.mock('framer-motion', () => ({
  animate: (target: Element, keyframes: Record<string, unknown>, options: Record<string, unknown>) => {
    animateCalls.push({ target, keyframes, options });
    return { stop: () => stoppedControls.push(target) };
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
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
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
    await vi.advanceTimersByTimeAsync(600);
    const headlineTargets = animateCalls.slice(1).map((call) => (call.target as Element).className);
    expect(headlineTargets.some((c) => c.includes('hero__headline-primary'))).toBe(true);
    expect(headlineTargets.some((c) => c.includes('hero__headline-secondary--1'))).toBe(true);
    expect(headlineTargets.some((c) => c.includes('hero__headline-secondary--2'))).toBe(true);
    expect(markPlayedSpy).not.toHaveBeenCalled();

    // Closing beat (scroll cue + Presence Links) plus settle.
    await vi.advanceTimersByTimeAsync(2000);
    const closingTargets = animateCalls.map((call) => (call.target as Element).className);
    expect(closingTargets.some((c) => c.includes('hero__scroll-cue'))).toBe(true);
    expect(closingTargets.some((c) => c.includes('introduction__presence-links'))).toBe(true);
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
