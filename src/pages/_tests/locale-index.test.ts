import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from '@astrojs/compiler';
import type { Node, ParentNode } from '@astrojs/compiler/types';

const pagePath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '[locale]',
  'index.astro',
);
const source = fs.readFileSync(pagePath, 'utf-8');

function isParent(node: Node): node is ParentNode {
  return Array.isArray((node as ParentNode).children);
}

function findAll(node: Node, name: string): Node[] {
  const matches: Node[] = [];
  if ((node.type === 'element' || node.type === 'component') && node.name === name) {
    matches.push(node);
  }
  if (isParent(node)) {
    for (const child of node.children) matches.push(...findAll(child, name));
  }
  return matches;
}

function attr(node: Node, name: string): string | undefined {
  if (node.type !== 'element' && node.type !== 'component') return undefined;
  return node.attributes.find((a) => a.name === name)?.value;
}

describe('i18n/Routing Layer route mounts Hero Composition (T-008)', () => {
  it('mounts exactly one Hero Composition into RootLayout\'s introduction slot', async () => {
    const { ast } = await parse(source);
    const heroes = findAll(ast, 'HeroComposition');

    expect(heroes).toHaveLength(1);
    expect(attr(heroes[0], 'slot')).toBe('introduction');
  });

  it("passes resolved introduction content as a prop, not the raw Content Layer", () => {
    expect(source).toMatch(/introduction=\{introduction\}/);
    expect(source).toMatch(/resolveLocaleContent\(locale\)/);
  });
});
