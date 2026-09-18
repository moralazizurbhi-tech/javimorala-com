// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import NavActiveIndicatorIsland from './NavActiveIndicatorIsland';
import type { ActiveNavSection, ScrollProgress } from './scrollProgressStore';

const animateCalls: Array<{ target: Element; keyframes: Record<string, unknown>; options: Record<string, unknown> }> = [];

// Awaitable (not just `{ stop }`) so the component's real sequential
// `await animate(...)` phase-chaining is genuinely exercised — same
// rationale as HeroEntranceIsland.test.tsx's own mock. Resolves on the
// next microtask (not instantly) so cross-phase ordering assertions are
// meaningful.
vi.mock('framer-motion', () => ({
  animate: (target: Element, keyframes: Record<string, unknown>, options: Record<string, unknown>) => {
    animateCalls.push({ target, keyframes, options });
    const promise = Promise.resolve();
    return { stop: () => {}, then: promise.then.bind(promise) };
  },
}));

let snapshotListener: ((snapshot: ScrollProgress) => void) | undefined;
const unsubscribeSpy = vi.fn();

vi.mock('./scrollProgressStore', () => ({
  subscribeScrollProgress: (listener: (snapshot: ScrollProgress) => void) => {
    snapshotListener = listener;
    return unsubscribeSpy;
  },
}));

function emit(activeNavSection: ActiveNavSection) {
  snapshotListener?.({ heroProgress: 0, pageProgress: 0, activeNavSection });
}

async function flushMicrotasks(times = 10) {
  for (let i = 0; i < times; i++) {
    await Promise.resolve();
  }
}

function matchMediaMock(matches: boolean) {
  return (query: string) => ({
    matches,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  });
}

function stubNav() {
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Primary');
  document.body.appendChild(nav);

  const about = document.createElement('a');
  about.setAttribute('href', '#personal-narrative');
  vi.spyOn(about, 'getBoundingClientRect').mockReturnValue({ left: 100, width: 60 } as DOMRect);

  const contact = document.createElement('a');
  contact.setAttribute('href', '#connection');
  vi.spyOn(contact, 'getBoundingClientRect').mockReturnValue({ left: 300, width: 80 } as DOMRect);

  nav.append(about, contact);
  return { nav, about, contact };
}

// about: left 100 + width/2 (30) - CREST_WIDTH_PX/2 (37.5) = 92.5
// contact: left 300 + width/2 (40) - CREST_WIDTH_PX/2 (37.5) = 302.5
const ABOUT_LEFT = 92.5;
const CONTACT_LEFT = 302.5;

describe('NavActiveIndicatorIsland (motion-interaction/contract.md Commitment 4)', () => {
  beforeEach(() => {
    animateCalls.length = 0;
    unsubscribeSpy.mockClear();
    snapshotListener = undefined;
  });

  afterEach(() => {
    cleanup();
    document.body.innerHTML = '';
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('starts hidden (opacity 0) before any snapshot arrives', () => {
    vi.stubGlobal('matchMedia', matchMediaMock(false));
    stubNav();
    const { container } = render(<NavActiveIndicatorIsland />);

    const crest = container.querySelector<HTMLElement>('.nav-active-indicator__crest')!;
    expect(crest.style.opacity).toBe('0');
  });

  it('resolves the first-ever snapshot directly, with no animated phases', () => {
    vi.stubGlobal('matchMedia', matchMediaMock(false));
    stubNav();
    const { container } = render(<NavActiveIndicatorIsland />);

    emit('about');

    expect(animateCalls).toHaveLength(0);
    const crest = container.querySelector<HTMLElement>('.nav-active-indicator__crest')!;
    expect(crest.style.opacity).toBe('1');
    expect(crest.style.left).toBe(`${ABOUT_LEFT}px`);
    expect(crest.style.transform).toBe('scaleY(1)');
  });

  it('AC1/AC3: transitioning between two defined sections runs the three sequential, non-overlapping phases', async () => {
    vi.stubGlobal('matchMedia', matchMediaMock(false));
    stubNav();
    render(<NavActiveIndicatorIsland />);
    emit('about'); // first snapshot: resolves directly
    animateCalls.length = 0;

    emit('contact');
    await flushMicrotasks();

    expect(animateCalls).toHaveLength(3);
    expect(animateCalls[0].keyframes).toEqual({ scaleY: [1, 0.08] });
    expect(animateCalls[0].options).toMatchObject({ duration: 0.09, ease: 'easeOut' });
    expect(animateCalls[1].keyframes).toEqual({ left: [ABOUT_LEFT, CONTACT_LEFT] });
    expect(animateCalls[1].options).toMatchObject({ duration: 0.12, ease: 'linear' });
    expect(animateCalls[2].keyframes).toEqual({ scaleY: [0.08, 1] });
    expect(animateCalls[2].options).toMatchObject({ duration: 0.09, ease: 'backOut' });
  });

  it('AC4/Commitment 16: reduced motion resolves the transition directly, with no animated phases', () => {
    vi.stubGlobal('matchMedia', matchMediaMock(true));
    stubNav();
    const { container } = render(<NavActiveIndicatorIsland />);
    emit('about');
    animateCalls.length = 0;

    emit('contact');

    expect(animateCalls).toHaveLength(0);
    const crest = container.querySelector<HTMLElement>('.nav-active-indicator__crest')!;
    expect(crest.style.opacity).toBe('1');
    expect(crest.style.left).toBe(`${CONTACT_LEFT}px`);
    expect(crest.style.transform).toBe('scaleY(1)');
  });

  it('Introduction boundary: hides directly (no three-phase sequence) when leaving "about"/"contact" for Introduction', () => {
    vi.stubGlobal('matchMedia', matchMediaMock(false));
    stubNav();
    const { container } = render(<NavActiveIndicatorIsland />);
    emit('about');
    animateCalls.length = 0;

    emit(null);

    expect(animateCalls).toHaveLength(0);
    const crest = container.querySelector<HTMLElement>('.nav-active-indicator__crest')!;
    expect(crest.style.opacity).toBe('0');
  });

  it('Introduction boundary: shows directly (no three-phase sequence) when arriving at "about"/"contact" from Introduction', () => {
    vi.stubGlobal('matchMedia', matchMediaMock(false));
    stubNav();
    const { container } = render(<NavActiveIndicatorIsland />);
    emit(null); // first snapshot: Introduction, resolves directly
    animateCalls.length = 0;

    emit('contact');

    expect(animateCalls).toHaveLength(0);
    const crest = container.querySelector<HTMLElement>('.nav-active-indicator__crest')!;
    expect(crest.style.opacity).toBe('1');
    expect(crest.style.left).toBe(`${CONTACT_LEFT}px`);
  });

  it('ignores a repeated snapshot for the same already-active section (no redundant re-position)', () => {
    vi.stubGlobal('matchMedia', matchMediaMock(false));
    stubNav();
    const { container } = render(<NavActiveIndicatorIsland />);
    emit('about');
    const crest = container.querySelector<HTMLElement>('.nav-active-indicator__crest')!;
    crest.style.left = '-999px'; // sentinel: would be overwritten if re-applied

    emit('about');

    expect(crest.style.left).toBe('-999px');
    expect(animateCalls).toHaveLength(0);
  });

  it('re-measures the active link position on resize', () => {
    vi.stubGlobal('matchMedia', matchMediaMock(false));
    const { about } = stubNav();
    const { container } = render(<NavActiveIndicatorIsland />);
    emit('about');

    vi.spyOn(about, 'getBoundingClientRect').mockReturnValue({ left: 500, width: 60 } as DOMRect);
    window.dispatchEvent(new Event('resize'));

    const crest = container.querySelector<HTMLElement>('.nav-active-indicator__crest')!;
    expect(crest.style.left).toBe(`${500 + 30 - 37.5}px`);
  });

  it('unsubscribes from the store and removes its resize listener on unmount', () => {
    vi.stubGlobal('matchMedia', matchMediaMock(false));
    stubNav();
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<NavActiveIndicatorIsland />);

    unmount();

    expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
    expect(removeSpy.mock.calls.some((call) => call[0] === 'resize')).toBe(true);
  });
});
