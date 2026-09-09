// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SectionNav from './SectionNav';

let observerCallback: IntersectionObserverCallback;

class MockIntersectionObserver {
  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback;
  }
  observe() {}
  disconnect() {}
  unobserve() {}
}

// Models one IntersectionObserver callback batch: `entering` ids report
// isIntersecting: true, `exiting` ids report isIntersecting: false — same
// shape a real scroll produces (the section leaving the trigger band
// reports its exit in the same, or an adjacent, batch as the one entering
// it).
function triggerIntersectionChange(entering: string[], exiting: string[] = []) {
  act(() => {
    observerCallback(
      [
        ...entering.map((id) => ({ target: { id }, isIntersecting: true }) as unknown as IntersectionObserverEntry),
        ...exiting.map((id) => ({ target: { id }, isIntersecting: false }) as unknown as IntersectionObserverEntry),
      ],
      {} as IntersectionObserver,
    );
  });
}

beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  document.body.innerHTML =
    '<div id="introduction"></div><div id="personal-narrative"></div><div id="connection"></div>';
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function renderNav() {
  render(<SectionNav wordmark="javimorala.com" navLabelAbout="about" navLabelContact="contact" />);
}

describe('SectionNav (section-navigation/contract.md Commitments 1-5)', () => {
  it('Commitment 3: the wordmark always links to Introduction\'s top', () => {
    renderNav();
    // Both the desktop bar's and the mobile closed-state bar's wordmark
    // (T-012) are always present in the DOM, CSS-only hidden per device
    // class — every instance must resolve to the same target.
    const wordmarks = screen.getAllByRole('link', { name: 'javimorala.com' });
    expect(wordmarks.length).toBeGreaterThan(0);
    for (const link of wordmarks) {
      expect(link.getAttribute('href')).toBe('#introduction');
    }
  });

  it('Commitment 2: "about"/"contact" resolve to in-page anchors, not a full navigation', () => {
    renderNav();
    expect(screen.getByRole('link', { name: 'about' }).getAttribute('href')).toBe('#personal-narrative');
    expect(screen.getByRole('link', { name: 'contact' }).getAttribute('href')).toBe('#connection');
  });

  it('Commitment 4 AC1 & 5 AC1: Introduction is active and the compact logomark is absent on initial render', () => {
    renderNav();
    expect(screen.queryByRole('link', { name: 'Introduction' })).toBeNull();
    expect(screen.getByRole('link', { name: 'about' }).className).not.toMatch(/linkActive/);
    expect(screen.getByRole('link', { name: 'contact' }).className).not.toMatch(/linkActive/);
  });

  it('Commitment 4 AC2 & 5 AC2/AC3: entering Personal Narrative shows the compact logomark and marks "about" active', () => {
    renderNav();
    triggerIntersectionChange(['personal-narrative'], ['introduction']);

    expect(screen.getByRole('link', { name: 'Introduction' }).getAttribute('href')).toBe('#introduction');
    expect(screen.getByRole('link', { name: 'about' }).className).toMatch(/linkActive/);
    expect(screen.getByRole('link', { name: 'contact' }).className).not.toMatch(/linkActive/);
  });

  it('Commitment 5 AC3/AC4: free-scrolling into Connection updates the indicator to exactly that screen', () => {
    renderNav();
    triggerIntersectionChange(['personal-narrative'], ['introduction']);
    triggerIntersectionChange(['connection'], ['personal-narrative']);

    expect(screen.getByRole('link', { name: 'about' }).className).not.toMatch(/linkActive/);
    expect(screen.getByRole('link', { name: 'contact' }).className).toMatch(/linkActive/);
  });

  it('Commitment 5 AC1: Introduction wins even when it is simultaneously intersecting with Personal Narrative', () => {
    // Regression for a real defect found in manual verification: a
    // viewport-centre / "last entry wins" scroll-spy can hand initial-load
    // activation to Personal Narrative when Introduction's own content is
    // shorter than the trigger band, breaking Commitment 5 AC1 regardless
    // of the actual scroll position. Introduction never reports exiting
    // here — exactly the initial-load case, where both are simultaneously
    // within the band and neither has left it yet.
    renderNav();
    triggerIntersectionChange(['introduction', 'personal-narrative']);

    expect(screen.queryByRole('link', { name: 'Introduction' })).toBeNull();
    expect(screen.getByRole('link', { name: 'about' }).className).not.toMatch(/linkActive/);
  });

  it('Commitment 4 AC1: returning to Introduction removes the compact logomark again', () => {
    renderNav();
    triggerIntersectionChange(['personal-narrative'], ['introduction']);
    triggerIntersectionChange(['introduction'], ['personal-narrative']);

    expect(screen.queryByRole('link', { name: 'Introduction' })).toBeNull();
  });
});

describe('SectionNav mobile overlay (section-navigation/contract.md Commitment 6)', () => {
  it('AC1: the overlay is closed by default and opens on activating the toggle, showing links and the language control', () => {
    renderNav();
    expect(screen.queryByRole('dialog')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));

    const dialog = screen.getByRole('dialog');
    expect(dialog).not.toBeNull();
    expect(screen.getAllByRole('link', { name: 'about' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'contact' }).length).toBeGreaterThan(0);
    // The language control is hosted, not owned, here — its own trigger
    // renders inside the open dialog (Commitment 7, AC2).
    expect(screen.getAllByRole('button', { name: 'EN' }).length).toBeGreaterThan(0);
  });

  it('AC2: activating a link inside the open overlay closes it (its own default navigation is left to proceed)', () => {
    renderNav();
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));

    const overlayAbout = screen
      .getAllByRole('link', { name: 'about' })
      .find((el) => el.getAttribute('href') === '#personal-narrative');
    expect(overlayAbout).toBeDefined();

    fireEvent.click(overlayAbout as HTMLElement);

    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('AC3: the explicit close action closes the overlay without changing the active screen', () => {
    renderNav();
    triggerIntersectionChange(['personal-narrative'], ['introduction']);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('dialog')).not.toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Close menu' }));

    expect(screen.queryByRole('dialog')).toBeNull();
    // Desktop "about" link (still in the DOM, dialog now unmounted)
    // remains the active one — unaffected by the close action.
    expect(screen.getByRole('link', { name: 'about' }).className).toMatch(/linkActive/);
  });
});

describe('SectionNav Language Override hosting (section-navigation/contract.md Commitment 7)', () => {
  it('AC1: the language control is present within the desktop bar on every render', () => {
    renderNav();
    expect(screen.getByRole('button', { name: 'EN' })).not.toBeNull();
  });
});
