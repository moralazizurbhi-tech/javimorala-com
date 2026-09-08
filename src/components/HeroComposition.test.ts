import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from '@astrojs/compiler';
import type { Node, ParentNode } from '@astrojs/compiler/types';

const componentPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'HeroComposition.astro',
);

function isParent(node: Node): node is ParentNode {
  return Array.isArray((node as ParentNode).children);
}

function findAll(node: Node, predicate: (n: Node) => boolean): Node[] {
  const matches: Node[] = [];
  if (predicate(node)) matches.push(node);
  if (isParent(node)) {
    for (const child of node.children) matches.push(...findAll(child, predicate));
  }
  return matches;
}

function hasClass(node: Node, className: string): boolean {
  if (node.type !== 'element') return false;
  const cls = node.attributes.find((a) => a.name === 'class')?.value ?? '';
  return cls.split(/\s+/).includes(className);
}

function attrNames(node: Node): string[] {
  if (node.type !== 'element') return [];
  return node.attributes.map((a) => a.name);
}

describe('Hero Composition (T-008)', () => {
  it('renders headline, ornamental mark, and scroll cue together in one static template', async () => {
    const source = fs.readFileSync(componentPath, 'utf-8');
    const { ast } = await parse(source);

    const mark = findAll(ast, (n) => hasClass(n, 'hero__mark'));
    // Two copies of the headline exist in markup — one per device-class
    // arrangement (mobile groups secondary+tagline together, desktop
    // groups dominant+secondary together; hero-presentation/ui.md's
    // groupings genuinely differ, not just reflow). Exactly one is
    // shown at a time via CSS `display:none` per breakpoint, which also
    // removes the other from the accessibility tree — never a partial
    // composition (Contract Commitment 1).
    const headline = findAll(ast, (n) => hasClass(n, 'hero__line--dominant'));
    const tagline = findAll(ast, (n) => hasClass(n, 'hero__tagline'));
    const scrollCue = findAll(ast, (n) => hasClass(n, 'hero__scroll-cue'));

    expect(mark).toHaveLength(1);
    expect(headline).toHaveLength(2);
    expect(tagline).toHaveLength(2);
    expect(scrollCue).toHaveLength(1);

    // No <script> and no client:* directive anywhere — a purely static
    // template, so no runtime sequencing could ever produce a state with
    // only a subset of the three elements (Contract Commitment 1, AC1/AC2).
    expect(findAll(ast, (n) => n.type === 'element' && n.name === 'script')).toHaveLength(0);
    expect(source).not.toMatch(/client:(load|idle|visible|media|only)/);
  });

  it('shows exactly one device-class arrangement at a time via CSS display, not JS', () => {
    const source = fs.readFileSync(componentPath, 'utf-8');
    expect(source).toMatch(/\.hero__headline-desktop\s*\{\s*display:\s*none/);
    expect(source).toMatch(/\.hero__headline-mobile\s*\{\s*display:\s*none/);
  });

  it('never reads the Content Layer directly — content arrives only via props', () => {
    const source = fs.readFileSync(componentPath, 'utf-8');
    expect(source).not.toMatch(/astro:content/);
    expect(source).toMatch(/interface Props/);
  });

  it('renders the scroll cue as non-interactive, non-focusable markup', async () => {
    const source = fs.readFileSync(componentPath, 'utf-8');
    const { ast } = await parse(source);

    const [scrollCue] = findAll(ast, (n) => hasClass(n, 'hero__scroll-cue'));
    expect(scrollCue.type).toBe('element');
    if (scrollCue.type === 'element') {
      expect(scrollCue.name).not.toMatch(/^(a|button)$/);
    }

    const interactiveDescendants = findAll(
      scrollCue,
      (n) => n.type === 'element' && (n.name === 'a' || n.name === 'button'),
    );
    expect(interactiveDescendants).toHaveLength(0);

    for (const node of findAll(scrollCue, () => true)) {
      const names = attrNames(node);
      expect(names).not.toContain('href');
      expect(names).not.toContain('onclick');
      expect(names).not.toContain('tabindex');
    }
  });

  it('applies device-class layout via CSS breakpoints only, not runtime JavaScript', () => {
    const source = fs.readFileSync(componentPath, 'utf-8');
    expect(source).toMatch(/respond-to\('desktop'\)/);
    expect(source).not.toMatch(/matchMedia|window\.innerWidth/);
  });
});
