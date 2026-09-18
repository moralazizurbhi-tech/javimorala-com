// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getScrollProgress, subscribeScrollProgress } from './scrollProgressStore';

function stubHero(rect: Partial<DOMRect>) {
  const hero = document.createElement('div');
  hero.className = 'hero';
  document.body.appendChild(hero);
  vi.spyOn(hero, 'getBoundingClientRect').mockReturnValue({
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
  return hero;
}

function stubSection(id: string, top: number) {
  const el = document.createElement('div');
  el.id = id;
  document.body.appendChild(el);
  vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
    top,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  } as DOMRect);
  return el;
}

describe('Shared Scroll Progress Store (motion-interaction/technical-design.md, Shared Scroll Progress Store)', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('defaults both progress values to 0 and activeNavSection to null with no `.hero`/section elements and no scroll', () => {
    expect(getScrollProgress()).toEqual({ heroProgress: 0, pageProgress: 0, activeNavSection: null });
  });

  it('computes heroProgress as -rect.top / rect.height, clamped to 0-1', () => {
    stubHero({ top: -300, height: 1000 });

    expect(getScrollProgress().heroProgress).toBeCloseTo(0.3);
  });

  it('clamps heroProgress to 1 once scrolled past the Hero entirely', () => {
    stubHero({ top: -2000, height: 1000 });

    expect(getScrollProgress().heroProgress).toBe(1);
  });

  it('clamps heroProgress to 0 for a `.hero` with zero/negative height (avoids NaN)', () => {
    stubHero({ top: 0, height: 0 });

    expect(getScrollProgress().heroProgress).toBe(0);
  });

  it('computes pageProgress as scrolled distance over total scrollable height, clamped to 0-1', () => {
    vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(2000);
    vi.stubGlobal('innerHeight', 1000);
    vi.stubGlobal('scrollY', 400);

    expect(getScrollProgress().pageProgress).toBeCloseTo(0.4);
  });

  it('reports pageProgress 0 when the page has no scrollable overflow', () => {
    vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(800);
    vi.stubGlobal('innerHeight', 1000);
    vi.stubGlobal('scrollY', 0);

    expect(getScrollProgress().pageProgress).toBe(0);
  });

  it('subscribe immediately invokes the listener once with the current snapshot', () => {
    stubHero({ top: -500, height: 1000 });
    const listener = vi.fn();

    const unsubscribe = subscribeScrollProgress(listener);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0].heroProgress).toBeCloseTo(0.5);
    unsubscribe();
  });

  it('attaches exactly one scroll/resize listener regardless of subscriber count, and detaches once the last unsubscribes', () => {
    const addSpy = vi.spyOn(window, 'addEventListener');
    const removeSpy = vi.spyOn(window, 'removeEventListener');

    const unsubscribeA = subscribeScrollProgress(() => {});
    const unsubscribeB = subscribeScrollProgress(() => {});

    expect(addSpy.mock.calls.filter((call) => call[0] === 'scroll')).toHaveLength(1);
    expect(addSpy.mock.calls.filter((call) => call[0] === 'resize')).toHaveLength(1);

    unsubscribeA();
    expect(removeSpy).not.toHaveBeenCalled();

    unsubscribeB();
    expect(removeSpy.mock.calls.filter((call) => call[0] === 'scroll')).toHaveLength(1);
    expect(removeSpy.mock.calls.filter((call) => call[0] === 'resize')).toHaveLength(1);
  });

  it('notifies subscribers via rAF on scroll, coalescing bursts into a single notification', () => {
    stubHero({ top: 0, height: 1000 });
    let rafCallback: (() => void) | undefined;
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn((cb: () => void) => {
        rafCallback = cb;
        return 1;
      }),
    );
    const listener = vi.fn();
    const unsubscribe = subscribeScrollProgress(listener);
    listener.mockClear();

    window.dispatchEvent(new Event('scroll'));
    window.dispatchEvent(new Event('scroll'));
    window.dispatchEvent(new Event('scroll'));

    expect(listener).not.toHaveBeenCalled();
    rafCallback?.();

    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
  });

  describe('activeNavSection (T-041)', () => {
    beforeEach(() => {
      vi.stubGlobal('innerHeight', 1000);
    });

    it('is null while only Introduction has crossed the ~30%-from-top threshold', () => {
      stubSection('introduction', 0);
      stubSection('personal-narrative', 800); // below the 300px threshold line
      stubSection('connection', 1600);

      expect(getScrollProgress().activeNavSection).toBeNull();
    });

    it("is 'about' once Personal Narrative's top edge crosses the threshold", () => {
      stubSection('introduction', -800);
      stubSection('personal-narrative', 200); // above the 300px threshold line
      stubSection('connection', 1200);

      expect(getScrollProgress().activeNavSection).toBe('about');
    });

    it("is 'contact' once Connection's top edge also crosses the threshold (last section in document order wins)", () => {
      stubSection('introduction', -1600);
      stubSection('personal-narrative', -800);
      stubSection('connection', 100); // above the 300px threshold line

      expect(getScrollProgress().activeNavSection).toBe('contact');
    });

    it('tolerates a missing section element, computing from whichever sections exist', () => {
      stubSection('personal-narrative', 200); // above the 300px threshold line
      // no #introduction, no #connection

      expect(getScrollProgress().activeNavSection).toBe('about');
    });

    it('is included in the snapshot subscribers receive', () => {
      stubSection('introduction', -800);
      stubSection('personal-narrative', -200);
      stubSection('connection', 900);
      const listener = vi.fn();

      const unsubscribe = subscribeScrollProgress(listener);

      expect(listener.mock.calls[0][0].activeNavSection).toBe('about');
      unsubscribe();
    });
  });
});
