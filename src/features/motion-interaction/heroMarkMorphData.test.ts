// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { boundingBoxOfD, buildInterpolatedD, loadHeroMarkMorphData, tokenizePathD } from './heroMarkMorphData';

describe('tokenizePathD', () => {
  it('tokenizes M/L/C/Z commands into command and number tokens, in order', () => {
    const tokens = tokenizePathD('M1,2 L3,4 C5,6,7,8,9,10 Z');
    expect(tokens).toEqual([
      { cmd: 'M' },
      { num: 1 },
      { num: 2 },
      { cmd: 'L' },
      { num: 3 },
      { num: 4 },
      { cmd: 'C' },
      { num: 5 },
      { num: 6 },
      { num: 7 },
      { num: 8 },
      { num: 9 },
      { num: 10 },
      { cmd: 'Z' },
    ]);
  });

  it('emits a repeated command token for each implicit repeated coordinate group', () => {
    // SVG allows omitting the letter for subsequent groups of the same command.
    const tokens = tokenizePathD('M0,0 C1,1,2,2,3,3 4,4,5,5,6,6');
    const cmds = tokens?.filter((t) => 'cmd' in t).map((t) => (t as { cmd: string }).cmd);
    expect(cmds).toEqual(['M', 'C', 'C']);
  });

  it('returns null for an unsupported command', () => {
    expect(tokenizePathD('M0,0 A5,5,0,0,1,10,10')).toBeNull();
  });

  it('returns null for an empty/unparseable string', () => {
    expect(tokenizePathD('')).toBeNull();
  });
});

describe('buildInterpolatedD', () => {
  it('reproduces the from-path exactly at t=0 and the to-path exactly at t=1', () => {
    const template = tokenizePathD('M0,0 C1,1,2,2,3,3')!;
    const fromNumbers = [0, 0, 1, 1, 2, 2, 3, 3];
    const toNumbers = [10, 10, 11, 11, 12, 12, 13, 13];

    expect(buildInterpolatedD(template, fromNumbers, toNumbers, 0)).toBe('M 0 0 C 1 1 2 2 3 3');
    expect(buildInterpolatedD(template, fromNumbers, toNumbers, 1)).toBe('M 10 10 C 11 11 12 12 13 13');
  });

  it('linearly interpolates every numeric slot at intermediate t', () => {
    const template = tokenizePathD('M0,0 L10,20')!;
    const d = buildInterpolatedD(template, [0, 0, 10, 20], [100, 200, 10, 20], 0.5);
    expect(d).toBe('M 50 100 L 10 20');
  });
});

describe('boundingBoxOfD', () => {
  it('computes the bounding box from every (x, y) pair across commands', () => {
    const box = boundingBoxOfD('M0,0 L10,5 C-5,20,15,-3,8,8');
    expect(box).toEqual({ minX: -5, minY: -3, maxX: 15, maxY: 20 });
  });

  it('returns a zero-area box for a collapsed (repeated-point) path', () => {
    const box = boundingBoxOfD('M5,5 C5,5,5,5,5,5');
    expect(box).toEqual({ minX: 5, minY: 5, maxX: 5, maxY: 5 });
  });

  it('returns null for an unparseable path', () => {
    expect(boundingBoxOfD('')).toBeNull();
  });
});

function svg(paths: Array<{ d: string; fill?: string }>, viewBox = '0 0 100 100') {
  const pathTags = paths.map((p) => `<path d="${p.d}" fill="${p.fill ?? 'none'}"/>`).join('');
  return `<svg viewBox="${viewBox}"><defs><linearGradient id="g"></linearGradient></defs><g>${pathTags}</g></svg>`;
}

function mockFetch(responses: Record<string, string>): typeof fetch {
  return vi.fn((url: string) =>
    Promise.resolve({ text: () => Promise.resolve(responses[url]) }),
  ) as unknown as typeof fetch;
}

describe('loadHeroMarkMorphData', () => {
  it('loads structurally-matching mark/logo pairs, computing the real (non-collapsed) logo bbox as the target viewBox', () => {
    const mark = svg(
      [
        { d: 'M0,0 L100,100', fill: 'url(#a)' }, // orphan in mark, collapses in logo
        { d: 'M40,40 L160,160', fill: 'url(#b)' }, // real path, present in both
      ],
      '0 0 200 200',
    );
    const logo = svg([
      { d: 'M0,0 L0,0', fill: 'url(#a)' }, // collapsed to a point
      { d: 'M45,45 L155,155', fill: 'url(#b)' }, // the real, final geometry
    ]);

    const fetchImpl = mockFetch({ '/ornamental-mark-morph.svg': mark, '/ornamental-logo-morph.svg': logo });
    return loadHeroMarkMorphData(fetchImpl).then((data) => {
      expect(data).not.toBeNull();
      expect(data!.paths).toHaveLength(2);
      expect(data!.fromViewBox).toEqual([0, 0, 200, 200]);
      expect(data!.toViewBox).toEqual([45, 45, 110, 110]);
      expect(data!.gradientDefsMarkup).toContain('linearGradient');

      // Path 0 (orphan): flagged as not real — developer direction is to
      // fade these out in place rather than morph their geometry.
      expect(data!.paths[0].isReal).toBe(false);
      expect(buildInterpolatedD(data!.paths[0].template, data!.paths[0].fromNumbers, data!.paths[0].toNumbers, 1)).toBe(
        'M 0 0 L 0 0',
      );
      // Path 1 (real): flagged as real, morphs into its final logo position.
      expect(data!.paths[1].isReal).toBe(true);
      expect(buildInterpolatedD(data!.paths[1].template, data!.paths[1].fromNumbers, data!.paths[1].toNumbers, 1)).toBe(
        'M 45 45 L 155 155',
      );
    });
  });

  it('classifies a thin decorative sliver (non-zero but small bbox) as an orphan, not real geometry — regression: the real asset pair has hairline paths that collapse in one dimension but not exactly to a point, which a too-small epsilon previously let through as "real" and left morphing instead of joining their fade group', async () => {
    const mark = svg([
      { d: 'M0,0 L100,100' }, // real: substantial in both dimensions
      { d: 'M10,10 L15,25' }, // sliver in mark
    ]);
    const logo = svg([
      { d: 'M20,20 L120,140' }, // real target, ~100x120
      { d: 'M12,12 L18,20' }, // sliver in logo too: 6x8, non-zero but negligible
    ]);
    const data = await loadHeroMarkMorphData(mockFetch({ '/ornamental-mark-morph.svg': mark, '/ornamental-logo-morph.svg': logo }));
    expect(data).not.toBeNull();
    expect(data!.paths[0].isReal).toBe(true);
    expect(data!.paths[1].isReal).toBe(false);
  });

  it('returns null when the mark and logo have a different number of paths', async () => {
    const mark = svg([{ d: 'M0,0 L1,1' }, { d: 'M2,2 L3,3' }]);
    const logo = svg([{ d: 'M0,0 L0,0' }]);
    const data = await loadHeroMarkMorphData(mockFetch({ '/ornamental-mark-morph.svg': mark, '/ornamental-logo-morph.svg': logo }));
    expect(data).toBeNull();
  });

  it('returns null when a same-index pair has a different command structure', async () => {
    const mark = svg([{ d: 'M0,0 L1,1' }]);
    const logo = svg([{ d: 'M0,0 C1,1,2,2,3,3' }]);
    const data = await loadHeroMarkMorphData(mockFetch({ '/ornamental-mark-morph.svg': mark, '/ornamental-logo-morph.svg': logo }));
    expect(data).toBeNull();
  });

  it('returns null when every logo path is collapsed (no real target geometry)', async () => {
    const mark = svg([{ d: 'M0,0 L10,10' }]);
    const logo = svg([{ d: 'M5,5 L5,5' }]);
    const data = await loadHeroMarkMorphData(mockFetch({ '/ornamental-mark-morph.svg': mark, '/ornamental-logo-morph.svg': logo }));
    expect(data).toBeNull();
  });

  it('returns null on fetch failure', async () => {
    const fetchImpl = vi.fn(() => Promise.reject(new Error('network error'))) as unknown as typeof fetch;
    const data = await loadHeroMarkMorphData(fetchImpl);
    expect(data).toBeNull();
  });
});
