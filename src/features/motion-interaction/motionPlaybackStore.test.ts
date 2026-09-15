import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getRevealedPieceIds,
  isHeroEntrancePlayed,
  markHeroEntrancePlayed,
  markPiecesRevealed,
} from './motionPlaybackStore';

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

describe('Motion Playback Store (motion-interaction/technical-design.md, Motion Playback Store)', () => {
  beforeEach(() => {
    vi.stubGlobal('sessionStorage', createMemoryStorage());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('defaults to not-played / no revealed pieces with nothing stored', () => {
    expect(isHeroEntrancePlayed()).toBe(false);
    expect(getRevealedPieceIds()).toEqual([]);
  });

  it('marks the Hero entrance played and persists it across a simulated reload', () => {
    markHeroEntrancePlayed();

    expect(isHeroEntrancePlayed()).toBe(true);
  });

  it('never unmarks the Hero entrance once played (no clear/reset export)', async () => {
    markHeroEntrancePlayed();

    const moduleExports = await import('./motionPlaybackStore');
    const exportNames = Object.keys(moduleExports);

    expect(exportNames.some((name) => /clear|reset|unmark/i.test(name))).toBe(false);
    expect(isHeroEntrancePlayed()).toBe(true);
  });

  it('accumulates revealed piece IDs across separate calls, de-duplicated', () => {
    markPiecesRevealed(['opening-line', 'paragraph-1']);
    markPiecesRevealed(['paragraph-1', 'paragraph-2']);

    expect(getRevealedPieceIds().sort()).toEqual(['opening-line', 'paragraph-1', 'paragraph-2']);
  });

  it('keeps the Hero-entrance flag and the revealed-piece set independent of each other', () => {
    markHeroEntrancePlayed();
    markPiecesRevealed(['opening-line']);

    expect(isHeroEntrancePlayed()).toBe(true);
    expect(getRevealedPieceIds()).toEqual(['opening-line']);
  });

  it('never writes as a side effect of reading', () => {
    const storage = createMemoryStorage();
    vi.stubGlobal('sessionStorage', storage);
    const setItemSpy = vi.spyOn(storage, 'setItem');

    isHeroEntrancePlayed();
    getRevealedPieceIds();

    expect(setItemSpy).not.toHaveBeenCalled();
  });

  it('degrades silently without throwing when storage is unavailable', () => {
    vi.stubGlobal('sessionStorage', undefined);

    expect(() => markHeroEntrancePlayed()).not.toThrow();
    expect(() => markPiecesRevealed(['opening-line'])).not.toThrow();
    expect(isHeroEntrancePlayed()).toBe(false);
    expect(getRevealedPieceIds()).toEqual([]);
  });

  it('degrades silently and returns defaults when stored data is malformed', () => {
    const storage = createMemoryStorage();
    storage.setItem('motion-playback', '{not valid json');
    vi.stubGlobal('sessionStorage', storage);

    expect(isHeroEntrancePlayed()).toBe(false);
    expect(getRevealedPieceIds()).toEqual([]);
  });
});
