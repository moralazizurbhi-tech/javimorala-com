// i18n/Routing Layer — cross-locale content-coverage check mechanism
// (Task Catalog T-007; content-localization Technical Design, i18n/Routing
// Layer Design Decision 4; content-localization/contract.md Commitment 5).
//
// Pure, fs-based, and independent of the astro:content virtual module —
// mirrors src/lib/locale.ts's own split — so it runs directly under
// Vitest as a build-time/test check (Design Decision 4) without going
// through Astro's pipeline.
//
// The Content Layer (Task Catalog T-003) is locale-keyed by construction:
// each domain directory holds one JSON file per locale, named `<locale>.json`.
// A "content entry" (Commitment 5's "content surface") is therefore one
// domain's file for one locale; coverage means every domain directory has a
// file for every supported locale.

import fs from 'node:fs';
import path from 'node:path';

export interface CoverageGap {
  domain: string;
  missingLocales: string[];
}

// Checks every domain directory under `contentDir` for a `<locale>.json`
// file per entry of `locales`. Returns one CoverageGap per domain that is
// missing at least one locale's entry; an empty array means symmetric
// coverage (Commitment 5 AC1) across every domain.
export function checkCrossLocaleCoverage(
  contentDir: string,
  locales: readonly string[],
): CoverageGap[] {
  const domains = fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  const gaps: CoverageGap[] = [];

  for (const domain of domains) {
    const files = new Set(fs.readdirSync(path.join(contentDir, domain)));
    const missingLocales = locales.filter((locale) => !files.has(`${locale}.json`));
    if (missingLocales.length > 0) {
      gaps.push({ domain, missingLocales });
    }
  }

  return gaps;
}
