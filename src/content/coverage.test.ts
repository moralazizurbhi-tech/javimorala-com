import { fileURLToPath } from 'node:url';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';
import { afterEach, describe, expect, it } from 'vitest';
import { checkCrossLocaleCoverage } from '../lib/content-coverage';
import { SUPPORTED_LOCALES } from '../lib/locale';

const realContentDir = path.dirname(fileURLToPath(import.meta.url));

let tmpDir: string | undefined;

afterEach(() => {
  if (tmpDir) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
    tmpDir = undefined;
  }
});

function makeFixture(domainFiles: Record<string, string[]>): string {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'content-coverage-'));
  for (const [domain, locales] of Object.entries(domainFiles)) {
    const domainDir = path.join(tmpDir, domain);
    fs.mkdirSync(domainDir, { recursive: true });
    for (const locale of locales) {
      fs.writeFileSync(path.join(domainDir, `${locale}.json`), '{}');
    }
  }
  return tmpDir;
}

describe('Cross-Locale Coverage Check Mechanism (T-007)', () => {
  it('passes against the real placeholder Content Layer: every domain has en/es/eu', () => {
    const gaps = checkCrossLocaleCoverage(realContentDir, SUPPORTED_LOCALES);
    expect(gaps).toEqual([]);
  });

  it('passes a fixture where every domain has an entry for every locale', () => {
    const dir = makeFixture({
      introduction: ['en', 'es', 'eu'],
      connection: ['en', 'es', 'eu'],
    });

    expect(checkCrossLocaleCoverage(dir, SUPPORTED_LOCALES)).toEqual([]);
  });

  it('fails when a locale collection is missing an entry present in another', () => {
    const dir = makeFixture({
      introduction: ['en', 'es', 'eu'],
      connection: ['en', 'es'], // missing eu — present in another domain/locale
    });

    const gaps = checkCrossLocaleCoverage(dir, SUPPORTED_LOCALES);
    expect(gaps).toEqual([{ domain: 'connection', missingLocales: ['eu'] }]);
  });

  it('reports every gap when multiple domains are asymmetric', () => {
    const dir = makeFixture({
      introduction: ['en'],
      connection: ['en', 'eu'],
      navigation: ['en', 'es', 'eu'],
    });

    const gaps = checkCrossLocaleCoverage(dir, SUPPORTED_LOCALES);
    expect(gaps.sort((a, b) => a.domain.localeCompare(b.domain))).toEqual([
      { domain: 'connection', missingLocales: ['es'] },
      { domain: 'introduction', missingLocales: ['es', 'eu'] },
    ]);
  });
});
