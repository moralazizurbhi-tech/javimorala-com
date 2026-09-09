import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  detectBrowserLocale,
  isSupportedLocale,
  resolveActiveLocale,
} from './localeResolution';

describe('resolveActiveLocale (content-localization/contract.md Commitment 1)', () => {
  it('AC1: an override wins regardless of the detected locale', () => {
    expect(resolveActiveLocale({ override: 'es', detected: 'en' })).toBe('es');
    expect(resolveActiveLocale({ override: 'eu', detected: null })).toBe('eu');
  });

  it('AC2: no override + a supported detected locale matches detection', () => {
    expect(resolveActiveLocale({ override: 'unset', detected: 'es' })).toBe('es');
    expect(resolveActiveLocale({ override: 'unset', detected: 'eu' })).toBe('eu');
  });

  it('AC3: no override + no/unsupported detection falls back to English', () => {
    expect(resolveActiveLocale({ override: 'unset', detected: null })).toBe(DEFAULT_LOCALE);
  });
});

describe('isSupportedLocale', () => {
  it('accepts exactly en/es/eu and rejects everything else', () => {
    for (const locale of SUPPORTED_LOCALES) {
      expect(isSupportedLocale(locale)).toBe(true);
    }
    expect(isSupportedLocale('fr')).toBe(false);
    expect(isSupportedLocale(null)).toBe(false);
    expect(isSupportedLocale(undefined)).toBe(false);
  });
});

describe('detectBrowserLocale', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns the primary language subtag when supported', () => {
    vi.stubGlobal('navigator', { language: 'es-ES' });
    expect(detectBrowserLocale()).toBe('es');
  });

  it('returns null when the detected language is unsupported', () => {
    vi.stubGlobal('navigator', { language: 'fr-FR' });
    expect(detectBrowserLocale()).toBeNull();
  });

  it('returns null when navigator is unavailable', () => {
    vi.stubGlobal('navigator', undefined);
    expect(detectBrowserLocale()).toBeNull();
  });
});
