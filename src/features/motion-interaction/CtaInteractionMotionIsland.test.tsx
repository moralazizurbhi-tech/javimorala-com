// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CtaInteractionMotionIsland from './CtaInteractionMotionIsland';

function matchMediaMock(matches: boolean) {
  return (query: string) => ({
    matches,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  });
}

function renderWithCta(reducedMotion: boolean) {
  vi.stubGlobal('matchMedia', matchMediaMock(reducedMotion));
  const utils = render(
    <CtaInteractionMotionIsland>
      <a className="contact__cta" href="mailto:%68%69@example.com">
        Get In Touch
        <svg className="contact__cta-icon" aria-hidden="true" />
      </a>
    </CtaInteractionMotionIsland>,
  );
  const cta = utils.container.querySelector<HTMLElement>('.contact__cta')!;
  return { ...utils, cta };
}

function firePointer(el: HTMLElement, type: string, pointerType: string) {
  el.dispatchEvent(new PointerEvent(type, { pointerType, bubbles: true }));
}

describe('CtaInteractionMotionIsland (motion-interaction/contract.md Commitments 5, 6, contributes 16; T-023)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('AC1: mouse hover adds the sustained sweep class, and removes it on pointer-leave', () => {
    const { cta } = renderWithCta(false);

    firePointer(cta, 'pointerenter', 'mouse');
    expect(cta.classList.contains('contact__cta--sweep')).toBe(true);

    firePointer(cta, 'pointerleave', 'mouse');
    expect(cta.classList.contains('contact__cta--sweep')).toBe(false);
  });

  it('AC1 touch-equivalent: a touch tap applies the momentary sweep-once class, then removes it after the sweep finishes', async () => {
    const { cta } = renderWithCta(false);

    firePointer(cta, 'pointerdown', 'touch');
    expect(cta.classList.contains('contact__cta--sweep-once')).toBe(true);

    await vi.advanceTimersByTimeAsync(700);
    expect(cta.classList.contains('contact__cta--sweep-once')).toBe(false);
  });

  it('touch does not trigger the sustained hover sweep', () => {
    const { cta } = renderWithCta(false);

    firePointer(cta, 'pointerenter', 'touch');
    expect(cta.classList.contains('contact__cta--sweep')).toBe(false);
  });

  it('mouse pointerdown does not trigger the momentary sweep-once (hover already covers it)', () => {
    const { cta } = renderWithCta(false);

    firePointer(cta, 'pointerdown', 'mouse');
    expect(cta.classList.contains('contact__cta--sweep-once')).toBe(false);
  });

  it('AC3/Commitment 16 AC5: under reduced motion, hover applies the discrete static-active class instead of the sweep', () => {
    const { cta } = renderWithCta(true);

    firePointer(cta, 'pointerenter', 'mouse');
    expect(cta.classList.contains('contact__cta--static-active')).toBe(true);
    expect(cta.classList.contains('contact__cta--sweep')).toBe(false);

    firePointer(cta, 'pointerleave', 'mouse');
    expect(cta.classList.contains('contact__cta--static-active')).toBe(false);
  });

  it('AC3/Commitment 16 AC5: under reduced motion, a touch tap also applies the discrete static-active class instead of the sweep', () => {
    const { cta } = renderWithCta(true);

    firePointer(cta, 'pointerdown', 'touch');
    expect(cta.classList.contains('contact__cta--static-active')).toBe(true);
    expect(cta.classList.contains('contact__cta--sweep-once')).toBe(false);

    firePointer(cta, 'pointerup', 'touch');
    expect(cta.classList.contains('contact__cta--static-active')).toBe(false);
  });

  it('AC2: never alters the anchor\'s href or text content', () => {
    const { cta } = renderWithCta(false);
    const originalHref = cta.getAttribute('href');
    const originalText = cta.textContent;

    firePointer(cta, 'pointerenter', 'mouse');
    firePointer(cta, 'pointerdown', 'touch');

    expect(cta.getAttribute('href')).toBe(originalHref);
    expect(cta.textContent).toBe(originalText);
  });

  it('cleans up its listeners and any pending sweep-once timeout on unmount', () => {
    const { cta, unmount } = renderWithCta(false);
    firePointer(cta, 'pointerdown', 'touch');
    expect(cta.classList.contains('contact__cta--sweep-once')).toBe(true);

    unmount();

    // No pending timer should throw or mutate an unmounted tree.
    expect(() => vi.advanceTimersByTime(700)).not.toThrow();
  });

  it('is a no-op when no `.contact__cta` element is present among its children', () => {
    vi.stubGlobal('matchMedia', matchMediaMock(false));
    expect(() =>
      render(
        <CtaInteractionMotionIsland>
          <p>no cta here</p>
        </CtaInteractionMotionIsland>,
      ),
    ).not.toThrow();
  });
});
