import { describe, expect, it } from 'vitest';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, derivePageMetadata } from './locale';

describe('i18n/Routing Layer resolution interface (T-005)', () => {
  it('supports exactly the three approved locales, English as default', () => {
    expect(SUPPORTED_LOCALES).toEqual(['en', 'es', 'eu']);
    expect(DEFAULT_LOCALE).toBe('en');
  });

  it('derives page title/description from existing Content Layer fields, per locale', () => {
    const metadata = derivePageMetadata(
      { wordmark: 'Wordmark ES' },
      { tagline: 'Tagline ES' },
    );

    expect(metadata).toEqual({ title: 'Wordmark ES', description: 'Tagline ES' });
  });
});
