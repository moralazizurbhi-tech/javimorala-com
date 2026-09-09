// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import LanguageSwitcher from './LanguageSwitcher';
import * as overrideStore from './overrideStore';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

async function openDropdown() {
  // Radix's DropdownMenuTrigger opens on pointerdown, not click.
  fireEvent.pointerDown(screen.getByRole('button'), { button: 0, ctrlKey: false });
  return screen.findAllByRole('menuitem');
}

function itemFor(items: HTMLElement[], locale: string) {
  const item = items.find((el) => el.getAttribute('href') === `/${locale}/`);
  if (!item) throw new Error(`No dropdown item found for locale "${locale}"`);
  return item;
}

describe('LanguageSwitcher (language-override/contract.md Commitments 1, 2; contributes to 4)', () => {
  it('Commitment 1: selecting a different language writes the override and allows navigation to proceed', async () => {
    vi.spyOn(overrideStore, 'readOverride').mockReturnValue('en');
    const writeSpy = vi.spyOn(overrideStore, 'writeOverride').mockImplementation(() => {});

    render(<LanguageSwitcher />);
    const items = await openDropdown();
    const esItem = itemFor(items, 'es');

    const navigationNotPrevented = fireEvent.click(esItem);

    expect(writeSpy).toHaveBeenCalledExactlyOnceWith('es');
    expect(navigationNotPrevented).toBe(true);
  });

  it('Commitment 2: selecting the currently active language writes nothing and prevents navigation', async () => {
    vi.spyOn(overrideStore, 'readOverride').mockReturnValue('en');
    const writeSpy = vi.spyOn(overrideStore, 'writeOverride').mockImplementation(() => {});

    render(<LanguageSwitcher />);
    const items = await openDropdown();
    const enItem = itemFor(items, 'en');

    const navigationNotPrevented = fireEvent.click(enItem);

    expect(writeSpy).not.toHaveBeenCalled();
    expect(navigationNotPrevented).toBe(false);
  });

  it('contributes to Commitment 4: the active item on render matches the current override', async () => {
    vi.spyOn(overrideStore, 'readOverride').mockReturnValue('es');
    vi.spyOn(overrideStore, 'writeOverride').mockImplementation(() => {});

    render(<LanguageSwitcher />);
    const items = await openDropdown();

    expect(itemFor(items, 'es').className).toMatch(/itemActive/);
    expect(itemFor(items, 'en').className).not.toMatch(/itemActive/);
    expect(itemFor(items, 'eu').className).not.toMatch(/itemActive/);
  });

  it('every supported locale is offered as an option', async () => {
    vi.spyOn(overrideStore, 'readOverride').mockReturnValue('unset');
    vi.spyOn(overrideStore, 'writeOverride').mockImplementation(() => {});

    render(<LanguageSwitcher />);
    const items = await openDropdown();

    expect(items.map((item) => item.getAttribute('href')).sort()).toEqual(['/en/', '/es/', '/eu/']);
  });
});
