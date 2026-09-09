// i18n/Routing Layer — locale resolution (T-006). Pure, synchronous logic
// implementing content-localization/contract.md Commitment 1's priority
// order: override > detected supported locale > English fallback.

import type { OverrideValue } from '../language-override/overrideStore';

export const SUPPORTED_LOCALES = ['en', 'es', 'eu'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = 'en';

export function isSupportedLocale(value: string | null | undefined): value is SupportedLocale {
  return typeof value === 'string' && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

/**
 * Reads the visitor's browser-reported language and returns it only if it
 * is one of the three supported locales — synchronous, no network call.
 */
export function detectBrowserLocale(): SupportedLocale | null {
  if (typeof navigator === 'undefined') return null;

  const primarySubtag = navigator.language?.split('-')[0];
  return isSupportedLocale(primarySubtag) ? primarySubtag : null;
}

/**
 * Resolution priority: an explicit override wins outright; otherwise a
 * supported detected locale; otherwise English (Commitment 1, AC1–AC3).
 */
export function resolveActiveLocale(input: {
  override: OverrideValue;
  detected: SupportedLocale | null;
}): SupportedLocale {
  if (input.override !== 'unset') return input.override;
  if (input.detected) return input.detected;
  return DEFAULT_LOCALE;
}
