// Override Store (T-005) — the sole place that sets, reads, and never
// clears the visitor's persisted language override. Synchronously
// readable, no network round-trip, tri-state (unset/en/es/eu), per
// content-localization/technical-design.md's declared dependency.

export type SupportedLocale = 'en' | 'es' | 'eu';
export type OverrideValue = SupportedLocale | 'unset';

const STORAGE_KEY = 'language-override';
const SUPPORTED_LOCALES: readonly SupportedLocale[] = ['en', 'es', 'eu'];

function isSupportedLocale(value: unknown): value is SupportedLocale {
  return typeof value === 'string' && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

function getStorage(): Storage | undefined {
  try {
    return typeof localStorage === 'undefined' ? undefined : localStorage;
  } catch {
    // Storage access can throw (e.g. blocked by browser privacy settings).
    return undefined;
  }
}

/**
 * Synchronous read of the persisted override. Returns 'unset' whenever no
 * valid override is present, including when storage is unavailable.
 */
export function readOverride(): OverrideValue {
  const storage = getStorage();
  if (!storage) return 'unset';

  try {
    const raw = storage.getItem(STORAGE_KEY);
    return isSupportedLocale(raw) ? raw : 'unset';
  } catch {
    return 'unset';
  }
}

/**
 * Persists the given locale as the override. Callers are responsible for
 * only invoking this from an explicit user selection (Commitment 3) — this
 * module exposes no other write path and no clear/reset operation
 * (Commitment 5).
 *
 * If storage is unavailable or the write fails, this silently no-ops:
 * per Technical Design Decision 4, the caller's own navigation is
 * unaffected and only future-visit persistence degrades.
 */
export function writeOverride(locale: SupportedLocale): void {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.setItem(STORAGE_KEY, locale);
  } catch {
    // Write failed (e.g. storage full/blocked) — degrade silently.
  }
}
