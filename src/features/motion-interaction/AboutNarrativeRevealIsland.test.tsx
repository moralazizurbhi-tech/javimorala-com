// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import AboutNarrativeRevealIsland from './AboutNarrativeRevealIsland';
import * as motionPlaybackStore from './motionPlaybackStore';

const animateCalls: Array<{ target: Element; keyframes: Record<string, unknown>; options: Record<string, unknown> }> = [];

vi.mock('framer-motion', () => ({
  animate: (target: Element, keyframes: Record<string, unknown>, options: Record<string, unknown>) => {
    animateCalls.push({ target, keyframes, options });
    return { stop: () => {} };
  },
}));

let observerInstances: MockIntersectionObserver[] = [];

class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  elements: Element[] = [];
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    observerInstances.push(this);
  }
  observe(el: Element) {
    this.elements.push(el);
  }
  unobserve(el: Element) {
    this.elements = this.elements.filter((e) => e !== el);
  }
  disconnect() {}
}

function triggerIntersect(el: Element) {
  const observer = observerInstances.find((o) => o.elements.includes(el));
  observer?.callback([{ target: el, isIntersecting: true } as unknown as IntersectionObserverEntry], {} as IntersectionObserver);
}

function matchMediaMock(matches: boolean) {
  return (query: string) => ({
    matches,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  });
}

function narrativeStaticMarkup() {
  return (
    <div className="narrative">
      <div className="narrative__text">
        <p className="narrative__kicker">get to know me</p>
        <p className="narrative__paragraph narrative__paragraph--opening">Opening line.</p>
        <img className="narrative__photo narrative__photo--landscape" src="/landscape.jpg" alt="" />
        <div className="narrative__middle">
          <p className="narrative__paragraph">Paragraph 2.</p>
          <p className="narrative__paragraph">Paragraph 3.</p>
          <p className="narrative__paragraph">Paragraph 4.</p>
        </div>
        <img className="narrative__photo narrative__photo--portrait" src="/portrait.jpg" alt="" />
        <p className="narrative__paragraph">Paragraph 5.</p>
        <p className="narrative__paragraph">Paragraph 6.</p>
      </div>
    </div>
  );
}

describe('AboutNarrativeRevealIsland (motion-interaction/contract.md Commitment 1, 16)', () => {
  beforeEach(() => {
    animateCalls.length = 0;
    observerInstances = [];
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    vi.stubGlobal('sessionStorage', undefined);
    window.location.hash = '';
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    window.location.hash = '';
  });

  it("never alters About Narrative Composition's own static markup/content", () => {
    vi.stubGlobal('matchMedia', matchMediaMock(true));
    const { container } = render(<AboutNarrativeRevealIsland>{narrativeStaticMarkup()}</AboutNarrativeRevealIsland>);

    expect(container.querySelectorAll('.narrative__paragraph')).toHaveLength(6);
    expect(container.querySelectorAll('.narrative__photo')).toHaveLength(2);
    expect(container.querySelector('.narrative__paragraph--opening')?.textContent).toBe('Opening line.');
  });

  it('reduced motion: every piece reaches its revealed state directly, with no animation', () => {
    vi.stubGlobal('matchMedia', matchMediaMock(true));
    render(<AboutNarrativeRevealIsland>{narrativeStaticMarkup()}</AboutNarrativeRevealIsland>);

    expect(animateCalls).toHaveLength(0);
    expect(observerInstances).toHaveLength(0);
  });

  it('not yet revealed: starts hidden and observes each piece, revealing it (and writing its ID) only once scrolled to', () => {
    vi.stubGlobal('matchMedia', matchMediaMock(false));
    const markRevealedSpy = vi.spyOn(motionPlaybackStore, 'markPiecesRevealed').mockImplementation(() => {});

    const { container } = render(<AboutNarrativeRevealIsland>{narrativeStaticMarkup()}</AboutNarrativeRevealIsland>);

    const opening = container.querySelector<HTMLElement>('.narrative__paragraph--opening')!;
    expect(opening.style.opacity).toBe('0');
    expect(markRevealedSpy).not.toHaveBeenCalled();

    triggerIntersect(opening);

    expect(markRevealedSpy).toHaveBeenCalledWith(['about-paragraph-0']);
    const openingCall = animateCalls.find((c) => c.target === opening);
    expect(openingCall?.keyframes.y).toEqual([32, 0]);
  });

  it('AC2: a previously revealed piece renders in its final state directly and is never re-hidden', () => {
    vi.stubGlobal('matchMedia', matchMediaMock(false));
    vi.spyOn(motionPlaybackStore, 'getRevealedPieceIds').mockReturnValue(['about-paragraph-0', 'about-photo-landscape']);

    const { container } = render(<AboutNarrativeRevealIsland>{narrativeStaticMarkup()}</AboutNarrativeRevealIsland>);

    const opening = container.querySelector<HTMLElement>('.narrative__paragraph--opening')!;
    const landscape = container.querySelector<HTMLElement>('.narrative__photo--landscape')!;
    expect(opening.style.opacity).toBe('1');
    expect(landscape.style.opacity).toBe('1');
    // Not observed — nothing left to reveal for these two.
    expect(observerInstances[0]?.elements).not.toContain(opening);
    expect(observerInstances[0]?.elements).not.toContain(landscape);
  });

  it('AC3: direct-navigation arrival reveals every not-yet-revealed piece immediately, with no per-piece animation', () => {
    window.location.hash = '#personal-narrative';
    vi.stubGlobal('matchMedia', matchMediaMock(false));
    const markRevealedSpy = vi.spyOn(motionPlaybackStore, 'markPiecesRevealed').mockImplementation(() => {});

    const { container } = render(<AboutNarrativeRevealIsland>{narrativeStaticMarkup()}</AboutNarrativeRevealIsland>);

    expect(animateCalls).toHaveLength(0);
    for (const el of container.querySelectorAll<HTMLElement>('.narrative__paragraph, .narrative__photo')) {
      expect(el.style.opacity).toBe('1');
    }
    expect(markRevealedSpy).toHaveBeenCalledTimes(1);
    expect(markRevealedSpy.mock.calls[0][0]).toHaveLength(8);
  });

  it('a later hashchange to this section reveals remaining pieces without re-touching already-revealed ones', () => {
    vi.stubGlobal('matchMedia', matchMediaMock(false));
    vi.spyOn(motionPlaybackStore, 'getRevealedPieceIds').mockReturnValue(['about-paragraph-0']);
    const markRevealedSpy = vi.spyOn(motionPlaybackStore, 'markPiecesRevealed').mockImplementation(() => {});

    const { container } = render(<AboutNarrativeRevealIsland>{narrativeStaticMarkup()}</AboutNarrativeRevealIsland>);
    const opening = container.querySelector<HTMLElement>('.narrative__paragraph--opening')!;
    expect(opening.style.opacity).toBe('1');

    window.location.hash = '#personal-narrative';
    window.dispatchEvent(new Event('hashchange'));

    expect(markRevealedSpy).toHaveBeenCalledTimes(1);
    expect(markRevealedSpy.mock.calls[0][0]).not.toContain('about-paragraph-0');
    expect(markRevealedSpy.mock.calls[0][0]).toHaveLength(7);
  });

  it('never animates the photo pieces with a positional transform (no scale/translation per ui.md)', () => {
    vi.stubGlobal('matchMedia', matchMediaMock(false));
    vi.spyOn(motionPlaybackStore, 'markPiecesRevealed').mockImplementation(() => {});

    const { container } = render(<AboutNarrativeRevealIsland>{narrativeStaticMarkup()}</AboutNarrativeRevealIsland>);
    const landscape = container.querySelector<HTMLElement>('.narrative__photo--landscape')!;
    triggerIntersect(landscape);

    const photoCalls = animateCalls.filter((c) => c.target === landscape);
    expect(photoCalls.length).toBeGreaterThan(0);
    for (const call of photoCalls) {
      expect(call.keyframes.y).toBeUndefined();
      expect(call.keyframes.transform).toBeUndefined();
    }
    expect(photoCalls.some((c) => 'filter' in c.keyframes)).toBe(true);
    expect(photoCalls.some((c) => 'boxShadow' in c.keyframes)).toBe(true);
  });
});
