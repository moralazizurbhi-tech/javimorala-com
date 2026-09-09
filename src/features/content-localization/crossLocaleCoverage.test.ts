import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { findCoverageGaps, type LocaleKeyedContent } from './crossLocaleCoverage';

function readContentJson(relativePath: string): LocaleKeyedContent {
  const url = new URL(relativePath, import.meta.url);
  return JSON.parse(readFileSync(fileURLToPath(url), 'utf-8'));
}

describe('findCoverageGaps', () => {
  it('reports no gaps when every locale has the same keys', () => {
    const content: LocaleKeyedContent = {
      en: { headline: 'Hello' },
      es: { headline: 'Hola' },
      eu: { headline: 'Kaixo' },
    };

    expect(findCoverageGaps('example', content)).toEqual([]);
  });

  it('reports a gap when a key exists in one locale but not another', () => {
    const content: LocaleKeyedContent = {
      en: { headline: 'Hello', tagline: 'Welcome' },
      es: { headline: 'Hola' },
      eu: { headline: 'Kaixo', tagline: 'Ongi etorri' },
    };

    expect(findCoverageGaps('example', content)).toEqual([
      { collection: 'example', locale: 'es', missingKeys: ['tagline'] },
    ]);
  });

  it('reports a gap when a locale is entirely absent from the collection', () => {
    const content: LocaleKeyedContent = {
      en: { headline: 'Hello' },
      es: { headline: 'Hola' },
    };

    expect(findCoverageGaps('example', content)).toEqual([
      { collection: 'example', locale: 'eu', missingKeys: ['headline'] },
    ]);
  });
});

describe('Cross-locale content coverage (content-localization/contract.md Commitment 5)', () => {
  const collections: Record<string, LocaleKeyedContent> = {
    introduction: readContentJson('../../content/introduction.json'),
    personalNarrative: readContentJson('../../content/personal-narrative.json'),
    connection: readContentJson('../../content/connection.json'),
  };

  it('every content entry present in one locale is present in all three, for every domain collection', () => {
    const gaps = Object.entries(collections).flatMap(([name, content]) => findCoverageGaps(name, content));
    expect(gaps).toEqual([]);
  });
});
