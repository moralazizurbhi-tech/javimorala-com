import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from '@astrojs/compiler';
import type { Node, ParentNode } from '@astrojs/compiler/types';

// Parses the .astro source directly via the standalone Astro compiler
// package, rather than rendering through Astro's Vite pipeline — this
// project's `astro build`/`astro sync`/`astro dev` currently all fail
// on a pre-existing, unrelated tsconfig resolution defect (see T-004's
// Implementation Report entry), so this is the strongest structural
// verification available in this environment for a .astro file.

const layoutPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'RootLayout.astro',
);

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

describe('Root Layout Composition (T-005)', () => {
  it('composes the three Domain Sections in fixed order: Introduction, Personal Narrative, Connection', async () => {
    const source = fs.readFileSync(layoutPath, 'utf-8');
    const { ast } = await parse(source);

    const sections = findAll(ast, 'section');
    expect(sections.map((s) => attr(s, 'id'))).toEqual([
      'introduction',
      'personal-narrative',
      'connection',
    ]);
  });

  it('renders one <html> document shell with no client-side router', async () => {
    const source = fs.readFileSync(layoutPath, 'utf-8');
    const { ast } = await parse(source);

    expect(findAll(ast, 'html')).toHaveLength(1);
    expect(findAll(ast, 'script')).toHaveLength(0);
    expect(source).not.toMatch(/react-router|@reach\/router|history/i);
  });
});
