import { useLayoutEffect, useEffect, useRef, type ReactNode } from 'react';
import { animate, type AnimationPlaybackControlsWithThen } from 'framer-motion';
import { getRevealedPieceIds, markPiecesRevealed } from './motionPlaybackStore';

// About Narrative Reveal Island (T-020 progressive-reveal +
// direct-navigation-arrival, Commitment 1; T-036 photo tilt, Commitment
// 13 — the Task Catalog's own explicit split of one Technical Design
// component, "About Narrative Reveal Island," across two Tasks; both
// land in this one file per that component's own Design Decision 3:
// "realized within the same island already wrapping About Narrative's
// photos, rather than a separate component"). Composed around About
// Narrative Composition's (about-narrative/AboutNarrativeComposition.astro)
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

// Photo Tilt (T-036, motion-interaction/technical-design.md, "About
// Narrative Reveal Island" — tilt responsibilities; Commitment 13) —
// additive to each photo's own static base rotation
// (about-narrative/AboutNarrativeComposition.astro's own
// `rotate(...) translateX(...)`, e.g. `.narrative__photo--portrait`/
// `--landscape`). Read live via `getComputedStyle` rather than
// duplicating those numbers here, so this applies correctly "whether
// the base is 0° or something else" (this Task's own Constraints) and
// never needs hand-syncing if about-narrative's own values change —
// unlike navTransitions.scss's/NavActiveIndicatorIsland's own
// deliberately-hand-synced constants, there's no reason to accept that
// drift risk here when the live DOM already carries the exact answer.
// Desktop vs mobile is decided once at mount via `(hover: hover) and
// (pointer: fine)` — the same media feature
// secondaryInteractionFeedback.scss already uses for this codebase's
// hover/touch split — consistent with this island's own established
// pattern of not reacting to breakpoint changes at runtime.

const MAX_TILT_DEG = 4; // Commitment 13 AC1's own stated ceiling.
const TILT_RESET_DURATION = 0.4; // AC2: eases back, doesn't snap.
// Mobile has no prescribed numeric formula (Commitment 13 AC3 only
// names "scroll direction/velocity") — Implementation Detail, tuned so
// a brisk scroll (~1px/ms) reads as a clearly visible, not extreme,
// tilt, decaying back toward rest once scrolling stops.
const SCROLL_TILT_SENSITIVITY = 1.5; // deg per (px/ms) of scroll velocity.
const SCROLL_TILT_DECAY = 0.85; // multiplier applied per animation frame at rest.

interface BaseTransform {
  rotateDeg: number;
  xPx: number;
}

const IDENTITY_BASE: BaseTransform = { rotateDeg: 0, xPx: 0 };

// Decomposes a `matrix(a, b, c, d, e, f)` produced by
// `rotate(θ) translateX(tx)` back into (θ, tx): for that specific
// function pair, a = cosθ, b = sinθ, e = cosθ·tx — exact (not an
// approximation) for any rotate+translateX combination, which is the
// only shape About Narrative Composition's own photo transforms use.
function readBaseTransform(el: HTMLElement): BaseTransform {
  const computed = window.getComputedStyle(el).transform;
  if (!computed || computed === 'none') return IDENTITY_BASE;
  const match = /^matrix\(([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+)\)$/.exec(computed.replace(/\s+/g, ''));
  if (!match) return IDENTITY_BASE;
  const a = Number(match[1]);
  const b = Number(match[2]);
  const e = Number(match[5]);
  const rotateRad = Math.atan2(b, a);
  const cos = Math.cos(rotateRad);
  const xPx = Math.abs(cos) > 1e-4 ? e / cos : e;
  return { rotateDeg: (rotateRad * 180) / Math.PI, xPx };
}

function clampTilt(deg: number): number {
  return Math.max(-MAX_TILT_DEG, Math.min(MAX_TILT_DEG, deg));
}

function applyTiltTransform(el: HTMLElement, base: BaseTransform, tiltDeg: number): void {
  el.style.transform = `translateX(${base.xPx}px) rotate(${base.rotateDeg + tiltDeg}deg)`;
}

function prefersFinePointerHover(): boolean {
  try {
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  } catch {
    return false;
  }
}

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

    // T-036 (Commitment 13): photo tilt, gated per-photo on that
    // photo's own Revealed state via `revealedIds` — the same Set the
    // reveal logic above already maintains, so a `Hidden` photo simply
    // never receives a non-zero tilt (AC: "a Hidden photo doesn't
    // tilt"), with no separate tracking needed.
    const photoPieces = pieces.filter((piece) => piece.kind === 'photo');
    const baseTransforms = new Map<HTMLElement, BaseTransform>(
      photoPieces.map((piece) => [piece.el, readBaseTransform(piece.el)]),
    );
    const tiltCleanups: Array<() => void> = [];

    if (prefersFinePointerHover()) {
      // Desktop (AC1/AC2): cursor position relative to the photo drives
      // rotation directly while hovered (continuous following, no
      // easing mid-hover); leaving eases back to rest instead of
      // snapping.
      for (const piece of photoPieces) {
        const el = piece.el;
        const base = baseTransforms.get(el) ?? IDENTITY_BASE;
        let currentDeg = 0;
        let resetControls: AnimationPlaybackControlsWithThen | undefined;

        function onPointerMove(event: PointerEvent): void {
          if (!revealedIds.has(piece.id)) return;
          resetControls?.stop();
          const rect = el.getBoundingClientRect();
          const nx = rect.width > 0 ? ((event.clientX - rect.left) / rect.width) * 2 - 1 : 0;
          currentDeg = clampTilt(nx * MAX_TILT_DEG);
          applyTiltTransform(el, base, currentDeg);
        }

        function onPointerLeave(): void {
          resetControls?.stop();
          resetControls = animate(currentDeg, 0, {
            duration: TILT_RESET_DURATION,
            ease: 'easeOut',
            onUpdate: (deg) => {
              currentDeg = deg;
              applyTiltTransform(el, base, deg);
            },
          });
          track([resetControls]);
        }

        el.addEventListener('pointermove', onPointerMove);
        el.addEventListener('pointerleave', onPointerLeave);
        tiltCleanups.push(() => {
          el.removeEventListener('pointermove', onPointerMove);
          el.removeEventListener('pointerleave', onPointerLeave);
          resetControls?.stop();
        });
      }
    } else if (photoPieces.length > 0) {
      // Mobile (AC3): one shared scroll-velocity-derived tilt, applied
      // identically to every currently-Revealed photo — no device
      // orientation/motion permission requested or required. Decays
      // back toward rest once scrolling stops, rather than sticking at
      // the last value.
      let lastY = window.scrollY;
      let lastTime = performance.now();
      let currentDeg = 0;
      let decayFrame: number | undefined;

      function applyToRevealed(deg: number): void {
        for (const piece of photoPieces) {
          if (!revealedIds.has(piece.id)) continue;
          applyTiltTransform(piece.el, baseTransforms.get(piece.el) ?? IDENTITY_BASE, deg);
        }
      }

      function stepDecay(): void {
        currentDeg *= SCROLL_TILT_DECAY;
        if (Math.abs(currentDeg) < 0.05) {
          currentDeg = 0;
          applyToRevealed(0);
          decayFrame = undefined;
          return;
        }
        applyToRevealed(currentDeg);
        decayFrame = window.requestAnimationFrame(stepDecay);
      }

      function onScroll(): void {
        const now = performance.now();
        const dt = Math.max(now - lastTime, 1);
        const dy = window.scrollY - lastY;
        lastY = window.scrollY;
        lastTime = now;

        currentDeg = clampTilt((dy / dt) * SCROLL_TILT_SENSITIVITY);
        applyToRevealed(currentDeg);
        if (decayFrame === undefined) decayFrame = window.requestAnimationFrame(stepDecay);
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      tiltCleanups.push(() => {
        window.removeEventListener('scroll', onScroll);
        if (decayFrame !== undefined) window.cancelAnimationFrame(decayFrame);
      });
    }

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      observer?.disconnect();
      activeControls.forEach((controls) => controls.stop());
      tiltCleanups.forEach((cleanup) => cleanup());
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
