import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from '@astrojs/compiler';
import type { Node, ParentNode } from '@astrojs/compiler/types';

const pagePath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'index.astro');
const source = fs.readFileSync(pagePath, 'utf-8');

function isParent(node: Node): node is ParentNode {
  return Array.isArray((node as ParentNode).children);
}

function findAll(node: Node, name: string): Node[] {
  const matches: Node[] = [];
  if (node.type === 'element' && node.name === name) matches.push(node);
  if (isParent(node)) {
    for (const child of node.children) matches.push(...findAll(child, name));
  }
  return matches;
}

function attr(node: Node, name: string): string | undefined {
  if (node.type !== 'element') return undefined;
  return node.attributes.find((a) => a.name === name)?.value;
}

function textContent(node: Node): string {
  if (node.type === 'text') return node.value;
  if (isParent(node)) return node.children.map(textContent).join('');
  return '';
}

describe('i18n/Routing Layer — Root Bootstrap & Redirect (T-006)', () => {
  it('root renders no visible content: empty <body>, no visible text anywhere', async () => {
    const { ast } = await parse(source);
    const [body] = findAll(ast, 'body');

    expect(body).toBeDefined();
    expect(textContent(body).trim()).toBe('');
  });

  it('carries exactly one inline, unbundled redirect script in <head>', async () => {
    const { ast } = await parse(source);
    const scripts = findAll(ast, 'script');

    expect(scripts).toHaveLength(1);
    expect(attr(scripts[0], 'is:inline')).toBeDefined();
  });

  it('provides a <noscript> meta-refresh fallback to /en/', async () => {
    const { ast } = await parse(source);
    const [noscript] = findAll(ast, 'noscript');
    expect(noscript).toBeDefined();

    const [meta] = findAll(noscript, 'meta');
    expect(attr(meta, 'http-equiv')).toBe('refresh');
    expect(attr(meta, 'content')).toBe('0; url=/en/');
  });

  it('resolves the active locale per override → detected → English priority (Commitment 1)', async () => {
    const { ast } = await parse(source);
    const [script] = findAll(ast, 'script');
    const scriptSrc = textContent(script);

    const match = scriptSrc.match(/function resolveLocale[\s\S]*?\n\s{8}\}/);
    expect(match).not.toBeNull();

    const resolveLocale = new Function(
      'SUPPORTED',
      'FALLBACK',
      `${match![0]}\nreturn resolveLocale.apply(null, Array.prototype.slice.call(arguments, 2));`,
    ) as (supported: string[], fallback: string, override: string, detected: string) => string;

    const run = (override: string, detected: string) =>
      resolveLocale(['en', 'es', 'eu'], 'en', override, detected);

    // AC1: override present wins regardless of detected locale.
    expect(run('eu', 'en')).toBe('eu');
    // AC2: no (supported) override, detected locale is supported.
    expect(run('unset', 'es')).toBe('es');
    // AC3: no supported override or detected locale falls back to English.
    expect(run('unset', 'fr')).toBe('en');
    expect(run('unset', '')).toBe('en');
  });

  it('executes synchronously end-to-end and redirects via location.replace (Commitment 4)', async () => {
    const { ast } = await parse(source);
    const [script] = findAll(ast, 'script');
    const scriptSrc = textContent(script);

    const calls: string[] = [];
    const run = (languageValue: string) => {
      calls.length = 0;
      const fn = new Function('navigator', 'location', scriptSrc);
      fn({ language: languageValue }, { replace: (url: string) => calls.push(url) });
    };

    // Override stub always reads "unset" until T-024 wires the real store
    // (Implementation Decision) — only the detected/fallback branches are
    // exercisable here; the override-priority branch itself is covered by
    // the resolveLocale unit test above.
    run('es-ES');
    expect(calls).toEqual(['/es/']);

    run('fr-FR');
    expect(calls).toEqual(['/en/']);

    run('eu-ES');
    expect(calls).toEqual(['/eu/']);
  });
});
