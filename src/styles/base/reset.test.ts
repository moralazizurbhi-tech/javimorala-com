import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { compileString } from 'sass';

const baseDir = path.dirname(fileURLToPath(import.meta.url));

describe('global base & reset styles', () => {
  it('normalizes box-sizing/margin/padding and applies base colour + typography tokens to body', () => {
    const result = compileString(`@use 'reset';`, { loadPaths: [baseDir] });

    expect(result.css).toMatch(/box-sizing:\s*border-box/);
    expect(result.css).toMatch(/background-color:\s*#0a0a0a/);
    expect(result.css).toMatch(/color:\s*#f5f5f0/);
    expect(result.css).toMatch(/font-family:/);
    expect(result.css).toMatch(/font-size:\s*1rem/);
  });

  it('removes default browser chrome from links, lists, and buttons without touching outline/focus styling', () => {
    const result = compileString(`@use 'reset';`, { loadPaths: [baseDir] });

    expect(result.css).toMatch(/text-decoration:\s*none/);
    expect(result.css).toMatch(/list-style:\s*none/);
    expect(result.css).toMatch(/cursor:\s*pointer/);
    expect(result.css).not.toMatch(/outline/);
  });
});
