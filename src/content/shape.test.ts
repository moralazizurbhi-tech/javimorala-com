import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { describe, expect, it } from 'vitest';

const contentDir = path.dirname(fileURLToPath(import.meta.url));

function readEntry(domain: string, locale: string) {
  const raw = fs.readFileSync(path.join(contentDir, domain, `${locale}.json`), 'utf-8');
  return JSON.parse(raw);
}

describe('Content Layer schema (T-004): locale-keyed placeholder entries', () => {
  it("holds fields sufficient for hero-presentation's headline/tagline", () => {
    const entry = readEntry('introduction', 'en');
    expect(typeof entry.headline).toBe('string');
    expect(typeof entry.tagline).toBe('string');
  });

  it("holds fields sufficient for about-narrative's narrative text", () => {
    const entry = readEntry('personal-narrative', 'en');
    expect(Array.isArray(entry.narrative)).toBe(true);
    expect(entry.narrative.length).toBeGreaterThan(0);
    entry.narrative.forEach((paragraph: unknown) => expect(typeof paragraph).toBe('string'));
  });

  it("holds fields sufficient for direct-contact's heading/CTA/farewell text", () => {
    const entry = readEntry('connection', 'en');
    expect(typeof entry.heading).toBe('string');
    expect(typeof entry.ctaText).toBe('string');
    expect(Array.isArray(entry.farewell)).toBe(true);
    expect(entry.farewell.length).toBeGreaterThan(0);
  });

  it("holds fields sufficient for section-navigation's nav labels/wordmark", () => {
    const entry = readEntry('navigation', 'en');
    expect(typeof entry.wordmark).toBe('string');
    expect(typeof entry.aboutLabel).toBe('string');
    expect(typeof entry.contactLabel).toBe('string');
  });

  it('is locale-keyed by filename, so an English-only build is not the only supported shape', () => {
    // Each collection is loaded from a directory of per-locale JSON files
    // (glob loader, id = filename minus extension); adding es.json/eu.json
    // alongside en.json (Task Catalog T-025) requires no code change here.
    const domains = ['introduction', 'personal-narrative', 'connection', 'navigation'];
    domains.forEach((domain) => {
      const files = fs.readdirSync(path.join(contentDir, domain));
      expect(files).toContain('en.json');
    });
  });
});
