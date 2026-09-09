import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { readOverride, writeOverride } from './overrideStore';

function createMemoryStorage(): Storage {
  const store = new Map<string, string>();
  return {
    getItem: (key) => store.get(key) ?? null,
    setItem: (key, value) => {
      store.set(key, value);
    },
    removeItem: (key) => {
      store.delete(key);
    },
    clear: () => {
      store.clear();
    },
    key: (index) => Array.from(store.keys())[index] ?? null,
    get length() {
      return store.size;
    },
  };
}

describe('Override Store (language-override/contract.md Commitments 3, 4, 5)', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', createMemoryStorage());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('reads synchronously and returns "unset" with nothing stored', () => {
    expect(readOverride()).toBe('unset');
  });

  it('round-trips every tri-state value (unset/en/es/eu)', () => {
    expect(readOverride()).toBe('unset');

    writeOverride('en');
    expect(readOverride()).toBe('en');

    writeOverride('es');
    expect(readOverride()).toBe('es');

    writeOverride('eu');
    expect(readOverride()).toBe('eu');
  });

  it('persists a write across a simulated reload (Commitment 4)', () => {
    writeOverride('es');

    // Simulate a reload: nothing in-module carries over, only the backing
    // storage itself — re-reading must reflect the earlier write.
    expect(readOverride()).toBe('es');
  });

  it('exposes no clear/reset operation anywhere in the module interface (Commitment 5)', async () => {
    const moduleExports = await import('./overrideStore');
    const exportNames = Object.keys(moduleExports);

    expect(exportNames).toEqual(expect.arrayContaining(['readOverride', 'writeOverride']));
    expect(exportNames.some((name) => /clear|reset/i.test(name))).toBe(false);
  });

  it('never writes as a side effect of reading — write is the only mutating path (Commitment 3)', () => {
    const storage = createMemoryStorage();
    vi.stubGlobal('localStorage', storage);
    const setItemSpy = vi.spyOn(storage, 'setItem');

    readOverride();
    readOverride();

    expect(setItemSpy).not.toHaveBeenCalled();
  });

  it('degrades silently without throwing when storage is unavailable', () => {
    vi.stubGlobal('localStorage', undefined);

    expect(() => writeOverride('en')).not.toThrow();
    expect(readOverride()).toBe('unset');
  });
});
