// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import LanguageSwitcher from './LanguageSwitcher';
import styles from './LanguageSwitcher.module.scss';
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

  it('keeps the compact picker layout contract on narrow viewports', async () => {
    vi.spyOn(overrideStore, 'readOverride').mockReturnValue('en');

    render(<LanguageSwitcher />);
    const trigger = screen.getByRole('button');
    const items = await openDropdown();
    const menu = items[0].closest('[role="menu"]');

    expect(trigger.className).toContain(styles.trigger);
    expect(menu?.className).toContain(styles.content);
    expect(menu?.getAttribute('data-side')).toBe('bottom');
    expect(menu?.getAttribute('data-align')).toBe('end');
    expect(items).toHaveLength(3);
  });

  it('does not lock the page scroll while the picker is open', async () => {
    vi.spyOn(overrideStore, 'readOverride').mockReturnValue('en');

    render(<LanguageSwitcher />);
    await openDropdown();

    expect(document.body.getAttribute('data-scroll-locked')).toBeNull();
    expect(document.body.style.pointerEvents).toBe('');
  });

  it('T-032 post-implementation correction: with no override set, the closed trigger falls back to the current page\'s own active locale, not always English', () => {
    vi.spyOn(overrideStore, 'readOverride').mockReturnValue('unset');

    render(<LanguageSwitcher activeLocale="eu" />);

    expect(screen.getByRole('button').textContent).toBe('EU');
  });

  it('an explicit override still wins over the current page\'s active locale', () => {
    vi.spyOn(overrideStore, 'readOverride').mockReturnValue('es');

    render(<LanguageSwitcher activeLocale="eu" />);

    expect(screen.getByRole('button').textContent).toBe('ES');
  });

  it('renders compact inline options for the mobile overlay variant', () => {
    vi.spyOn(overrideStore, 'readOverride').mockReturnValue('unset');

    render(<LanguageSwitcher activeLocale="es" variant="mobile" />);

    const group = screen.getByRole('group', { name: 'Language' });
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.getAllByRole('link').map((link) => link.textContent)).toEqual(['EN', 'ES', 'EU']);
    expect(group.querySelector('[aria-current="page"]')?.textContent).toBe('ES');
    expect(group.querySelector('[aria-current="page"]')?.className).toContain(styles.itemActive);
  });
});
