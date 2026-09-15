import { useLayoutEffect, useEffect, useRef, type ReactNode } from 'react';
import { animate, type AnimationPlaybackControlsWithThen } from 'framer-motion';
import { getRevealedPieceIds, markPiecesRevealed } from './motionPlaybackStore';

// About Narrative Reveal Island (T-020) —
// motion-interaction/technical-design.md, "About Narrative Reveal
// Island" (progressive-reveal + direct-navigation-arrival
// responsibilities only, Commitment 1; the same component's photo-tilt
// responsibility, Commitment 13, is T-036's own separate scope, per the
// Task Catalog's explicit split). Composed around About Narrative
// Composition's (about-narrative/AboutNarrativeComposition.astro)
// already-rendered static markup via the same static-children-in-island
// pattern as HeroEntranceIsland — targets it by class after mount,
// never alters its own file.
//
// Below-the-fold hydration window (Implementation Detail, documented
// rather than fixed): unlike Hero (which got a pre-hide CSS guard in
// BaseLayout.astro/RootLayout.astro after a reported flash-of-visible-
// content bug), this component's pieces are not pre-hidden before
// hydration. Building that guard here would need CSS selectors precise
// enough to target each of the 8 individual pieces — six paragraphs
// split across two different parent containers, otherwise identical in
// class — with no distinguishing hook beyond DOM structure/position;
// doing that robustly means `nth-of-type` selectors tightly coupled to
// about-narrative's exact current markup shape, silently breaking (the
// wrong piece hidden) if that markup's own structure ever changes later
// for an unrelated reason. Accepted as a narrower risk than Hero's: this
// content sits below the fold, so a visitor must actively scroll to it,
// giving hydration a substantially larger head start than Hero's
// immediately-visible-on-load case. Hydrated via `client:load` (not
// `client:visible`, which would narrow this window further in a real
// browser) for consistency with HeroEntranceIsland and because
// `client:visible`'s own hydration trigger could not be verified live
// in this project's Chrome-automation harness.

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

// Section anchor Section Navigation's own nav link targets
// (RootLayout.astro's `<section id="personal-narrative">`) — the
// platform's own same-page anchor-navigation signal this component
// distinguishes direct arrival with (Design Decision 1), zero coupling
// to Section Navigation's own component.
const SECTION_ANCHOR = '#personal-narrative';

// Paragraph reveal: "translates up slightly + fades in" (ui.md) —
// brief/snappy, since it repeats on every scroll.
const PARAGRAPH_Y_OFFSET = 14; // px
const PARAGRAPH_DURATION = 0.35;

// Opening-line reveal: same treatment, "more pronounced travel distance
// and slightly slower pacing — a heavier, more deliberate arrival"
// (ui.md) — a one-time distinguishing beat, not a repeated pattern.
const OPENING_Y_OFFSET = 32; // px
const OPENING_DURATION = 0.55;

// Photo reveal: "resolves from blurred + desaturated-with-a-purple-
// tint-overlay... to sharp + full colour... the blur clears a touch
// before the overlay fully clears" (ui.md) — no scale/translation at
// all, unlike the paragraphs. The "tint overlay" needs a second layered
// element to blend against for a true `mix-blend-mode`, which would
// mean adding markup this component must not add — realized instead as
// an inset `box-shadow` (a solid veil drawn on top of the image's own
// box, no extra DOM node needed), independently animated from the blur
// so the two finish at slightly different times, as ui.md describes.
// Colour reuses tokens/_colors.scss's $color-gradient-end (#4b2178,
// deep purple) — the same accent family already carried by the
// Ornamental Mark/Logo elsewhere in this Feature.
const PHOTO_BLUR_PX = 14;
const PHOTO_BLUR_DURATION = 0.5;
const PHOTO_TINT_RGB = '75, 33, 120';
const PHOTO_TINT_ALPHA = 0.75;
const PHOTO_TINT_DURATION = 0.7; // longer than the blur, so it clears a touch after it

type PieceKind = 'paragraph' | 'opening' | 'photo';

interface Piece {
  el: HTMLElement;
  id: string;
  kind: PieceKind;
}

function tintShadow(alpha: number): string {
  return `inset 0 0 0 999px rgba(${PHOTO_TINT_RGB}, ${alpha})`;
}

function applyFinal(piece: Piece): void {
  piece.el.style.opacity = '1';
  if (piece.kind === 'photo') {
    piece.el.style.filter = '';
    piece.el.style.boxShadow = '';
  } else {
    piece.el.style.transform = '';
  }
}

function applyHidden(piece: Piece): void {
  piece.el.style.opacity = '0';
  if (piece.kind === 'photo') {
    piece.el.style.filter = `blur(${PHOTO_BLUR_PX}px)`;
    piece.el.style.boxShadow = tintShadow(PHOTO_TINT_ALPHA);
  } else {
    const offset = piece.kind === 'opening' ? OPENING_Y_OFFSET : PARAGRAPH_Y_OFFSET;
    piece.el.style.transform = `translateY(${offset}px)`;
  }
}

function animateReveal(piece: Piece): AnimationPlaybackControlsWithThen[] {
  if (piece.kind === 'photo') {
    return [
      animate(piece.el, { opacity: [0, 1] }, { duration: PHOTO_TINT_DURATION, ease: 'easeOut' }),
      animate(
        piece.el,
        { filter: [`blur(${PHOTO_BLUR_PX}px)`, 'blur(0px)'] },
        { duration: PHOTO_BLUR_DURATION, ease: 'easeOut' },
      ),
      animate(
        piece.el,
        { boxShadow: [tintShadow(PHOTO_TINT_ALPHA), tintShadow(0)] },
        { duration: PHOTO_TINT_DURATION, ease: 'easeOut' },
      ),
    ];
  }
  const offset = piece.kind === 'opening' ? OPENING_Y_OFFSET : PARAGRAPH_Y_OFFSET;
  const duration = piece.kind === 'opening' ? OPENING_DURATION : PARAGRAPH_DURATION;
  return [animate(piece.el, { opacity: [0, 1], y: [offset, 0] }, { duration, ease: 'easeOut' })];
}

interface Props {
  children: ReactNode;
}

export default function AboutNarrativeRevealIsland({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const paragraphEls = Array.from(container.querySelectorAll<HTMLElement>('.narrative__paragraph'));
    const landscapePhoto = container.querySelector<HTMLElement>('.narrative__photo--landscape');
    const portraitPhoto = container.querySelector<HTMLElement>('.narrative__photo--portrait');

    const pieces: Piece[] = [
      ...paragraphEls.map(
        (el, index): Piece => ({
          el,
          id: `about-paragraph-${index}`,
          kind: el.classList.contains('narrative__paragraph--opening') ? 'opening' : 'paragraph',
        }),
      ),
      ...[landscapePhoto, portraitPhoto]
        .filter(isElement)
        .map((el): Piece => ({ el, id: el.classList.contains('narrative__photo--landscape') ? 'about-photo-landscape' : 'about-photo-portrait', kind: 'photo' })),
    ];

    const activeControls: AnimationPlaybackControlsWithThen[] = [];
    function track(controls: AnimationPlaybackControlsWithThen[]): void {
      activeControls.push(...controls);
    }

    // Commitment 16: reduced-motion reaches every piece's revealed
    // state directly, with no scroll-triggered or direct-arrival
    // animation at all — checked before anything else, exactly as
    // HeroEntranceIsland does.
    if (prefersReducedMotion()) {
      pieces.forEach(applyFinal);
      return () => {};
    }

    const revealedIds = new Set(getRevealedPieceIds());
    let observer: IntersectionObserver | undefined;
    const observedPieces = new Map<Element, Piece>();

    function isDirectArrival(): boolean {
      return window.location.hash === SECTION_ANCHOR;
    }

    // Commitment 1 AC3: direct-navigation arrival reveals every
    // not-yet-revealed piece immediately, no per-piece animation.
    function revealAllRemaining(): void {
      const newlyRevealed: string[] = [];
      for (const piece of pieces) {
        if (revealedIds.has(piece.id)) continue;
        applyFinal(piece);
        revealedIds.add(piece.id);
        newlyRevealed.push(piece.id);
        const observedTarget = piece.el;
        if (observer) observer.unobserve(observedTarget);
        observedPieces.delete(observedTarget);
      }
      if (newlyRevealed.length > 0) markPiecesRevealed(newlyRevealed);
    }

    if (isDirectArrival()) {
      revealAllRemaining();
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const piece = observedPieces.get(entry.target);
            if (!piece) continue;
            observer?.unobserve(entry.target);
            observedPieces.delete(entry.target);
            applyHidden(piece); // re-assert the starting point synchronously before animating.
            track(animateReveal(piece));
            revealedIds.add(piece.id);
            markPiecesRevealed([piece.id]);
          }
        },
        // A piece is considered "reached" once a fifth of it has
        // entered the viewport — close enough to "the viewport reaches
        // it" (Commitment 1 AC1) without waiting for full visibility.
        { threshold: 0.2 },
      );

      for (const piece of pieces) {
        if (revealedIds.has(piece.id)) {
          applyFinal(piece);
        } else {
          applyHidden(piece);
          observedPieces.set(piece.el, piece);
          observer.observe(piece.el);
        }
      }
    }

    function onHashChange(): void {
      if (isDirectArrival()) revealAllRemaining();
    }
    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      observer?.disconnect();
      activeControls.forEach((controls) => controls.stop());
    };
  }, []);

  // `display: contents`: a pure JS hook with no layout footprint of its
  // own, same rationale as HeroEntranceIsland's own wrapper.
  return (
    <div ref={containerRef} style={{ display: 'contents' }}>
      {children}
    </div>
  );
}
