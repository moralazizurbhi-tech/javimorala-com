// Motion Playback Store (T-019) — the sole reader/writer for "which
// one-time, visit-scoped motion moments have already played"
// (motion-interaction/technical-design.md, Motion Playback Store).
// sessionStorage-backed rather than localStorage (contrast
// language-override/overrideStore.ts): sessionStorage's own native
// semantics already give exactly the required scope — survives a
// same-tab reload/route change, cleared when the tab/window closes —
// with no extra logic needed to enforce it.

const STORAGE_KEY = 'motion-playback';

interface PlaybackState {
  heroEntrancePlayed: boolean;
  revealedPieceIds: string[];
}

const DEFAULT_STATE: PlaybackState = { heroEntrancePlayed: false, revealedPieceIds: [] };

function getStorage(): Storage | undefined {
  try {
    return typeof sessionStorage === 'undefined' ? undefined : sessionStorage;
  } catch {
    // Storage access can throw (e.g. blocked by browser privacy settings).
    return undefined;
  }
}

function readState(): PlaybackState {
  const storage = getStorage();
  if (!storage) return DEFAULT_STATE;

  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      heroEntrancePlayed: parsed.heroEntrancePlayed === true,
      revealedPieceIds: Array.isArray(parsed.revealedPieceIds)
        ? parsed.revealedPieceIds.filter((id: unknown): id is string => typeof id === 'string')
        : [],
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function writeState(state: PlaybackState): void {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Write failed (e.g. storage full/blocked) — degrade silently.
  }
}

/** Synchronous read of whether the Hero entrance sequence has already played this tab session. */
export function isHeroEntrancePlayed(): boolean {
  return readState().heroEntrancePlayed;
}

/**
 * Marks the Hero entrance as played for the rest of this tab session.
 * No corresponding "unmark" export exists — once set, it stays set
 * (technical-design.md: "no operation that clears an individual flag
 * once set").
 */
export function markHeroEntrancePlayed(): void {
  const state = readState();
  if (state.heroEntrancePlayed) return;
  writeState({ ...state, heroEntrancePlayed: true });
}

/** Synchronous read of which About Narrative piece IDs have already revealed this tab session. */
export function getRevealedPieceIds(): string[] {
  return readState().revealedPieceIds;
}

/** Merges the given piece IDs into the revealed set (idempotent, order-independent). */
export function markPiecesRevealed(ids: readonly string[]): void {
  if (ids.length === 0) return;
  const state = readState();
  const merged = Array.from(new Set([...state.revealedPieceIds, ...ids]));
  writeState({ ...state, revealedPieceIds: merged });
}
