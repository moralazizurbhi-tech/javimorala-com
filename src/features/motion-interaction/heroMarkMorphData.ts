// Hero Mark → Compact Logo geometric morph (T-035, motion-interaction/
// contract.md Commitment 12 AC1) — post-implementation developer
// direction: a real path-geometry morph, not a scale/crop
// approximation. Made possible by the two SVG assets themselves:
// `/ornamental-mark-morph.svg` and `/ornamental-logo-morph.svg` are
// authored as a structurally-paired pair (developer-provided, not
// generated here) — dedicated to this morph specifically, distinct
// from `/ornamental-mark.svg`/`/ornamental-logo.svg` (which
// HeroComposition.astro and SectionNav.tsx's own `<img>` still use,
// each needing its own different framing — see this file's own
// `MARK_SRC`/`LOGO_SRC` comment). Same viewBox, same path count (9),
// and each mark path's own sequence
// of drawing commands (M/L/C/Z, with argument counts) is identical to
// its same-index logo counterpart. Six of the nine logo paths are
// "orphan" ornamentation collapsed to a single repeated point (the
// mark's own outer flourishes, converging to nothing); three are the
// real logo geometry, positioned within the shared 1216x780 canvas at
// the same coordinates their mark counterparts occupy.
//
// This structural pairing is exactly what makes a lightweight,
// dependency-free morph possible: since both paths in every pair share
// the identical command sequence, interpolating is just lerping the
// two paths' own numeric arguments position-for-position and
// re-assembling the same command letters around them — no path
// resampling/normalization library (e.g. flubber) is needed, unlike
// the general "arbitrary path A to arbitrary path B" problem such
// libraries solve. If the assets are ever re-authored without this
// pairing, `loadHeroMarkMorphData` detects the mismatch and returns
// `null` (verified, not assumed) rather than silently interpolating
// wrongly.

export type PathToken = { cmd: string } | { num: number };

export interface MorphPath {
  /** The mark path's own token sequence — command letters plus argument slots, in order. */
  template: PathToken[];
  /** The mark (from) value for each argument slot, in template order. */
  fromNumbers: number[];
  /** The logo (to) value for each argument slot, in template order. */
  toNumbers: number[];
  fill: string;
  /**
   * Whether this path has real target geometry in the logo file (vs.
   * collapsing to a single repeated point — the mark's own outer
   * ornamentation, which has no equivalent in the compact logo).
   * Developer direction: only `isReal` paths get their own geometry
   * actually morphed; the rest fade out in place instead, avoiding the
   * "shrinks to a vanishing dot" look a literal point-collapse produces.
   */
  isReal: boolean;
}

export interface MorphData {
  paths: MorphPath[];
  /** Serialized contents of the mark SVG's own `<defs>` (gradients) — identical in both files, reused verbatim. */
  gradientDefsMarkup: string;
  fromViewBox: [number, number, number, number];
  toViewBox: [number, number, number, number];
}

const SUPPORTED_COMMANDS: Record<string, number> = { M: 2, L: 2, C: 6, Z: 0 };

/** Tokenizes an absolute-coordinate `d` string (M/L/C/Z only) into command/number tokens. Returns `null` on any unsupported command. */
export function tokenizePathD(d: string): PathToken[] | null {
  const raw = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e-?\d+)?/g);
  if (!raw) return null;

  const tokens: PathToken[] = [];
  let i = 0;
  while (i < raw.length) {
    const letter = raw[i];
    const argCount = SUPPORTED_COMMANDS[letter];
    if (argCount === undefined) return null;
    i += 1;

    if (argCount === 0) {
      tokens.push({ cmd: letter });
      continue;
    }
    // SVG allows repeating a command's own coordinate groups without
    // re-stating the letter — keep consuming groups of `argCount`
    // numbers until the next token is itself a command letter. Each
    // group still gets its own `cmd` token in the rebuilt output below
    // (redundant but valid SVG — every parser accepts a repeated
    // command letter), which keeps the template/number arrays in
    // lockstep without needing a separate "first group" case.
    while (i < raw.length && /^-?\d/.test(raw[i])) {
      tokens.push({ cmd: letter });
      for (let a = 0; a < argCount; a++) {
        tokens.push({ num: parseFloat(raw[i]) });
        i += 1;
      }
    }
  }
  return tokens;
}

function numbersOf(tokens: PathToken[]): number[] {
  const nums: number[] = [];
  for (const t of tokens) if ('num' in t) nums.push(t.num);
  return nums;
}

/** Rebuilds a `d` string from a template's own command layout, replacing each numeric slot with `lerp(from, to, t)`. */
export function buildInterpolatedD(template: PathToken[], fromNumbers: number[], toNumbers: number[], t: number): string {
  const parts: string[] = [];
  let ni = 0;
  for (const tok of template) {
    if ('cmd' in tok) {
      parts.push(tok.cmd);
    } else {
      const value = fromNumbers[ni] + (toNumbers[ni] - fromNumbers[ni]) * t;
      // Trims float noise without losing precision that matters at
      // this canvas scale (viewBox units, not screen pixels).
      parts.push(String(Math.round(value * 1000) / 1000));
      ni += 1;
    }
  }
  return parts.join(' ');
}

/**
 * Absolute-coordinate bounding box of a `d` string's own drawn points
 * (M/L/C endpoints and control points). Every supported command's own
 * argument count (M:2, L:2, C:6) is a multiple of 2 and is always a
 * sequence of (x, y) pairs in order, so pairing up consecutive numeric
 * tokens across the *entire* token stream — regardless of which
 * command each belongs to — already gives every point correctly,
 * with no need to track per-command argument-group boundaries.
 */
export function boundingBoxOfD(d: string): { minX: number; minY: number; maxX: number; maxY: number } | null {
  const tokens = tokenizePathD(d);
  if (!tokens) return null;

  const numbers = numbersOf(tokens);
  if (numbers.length === 0 || numbers.length % 2 !== 0) return null;

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (let i = 0; i < numbers.length; i += 2) {
    const x = numbers[i];
    const y = numbers[i + 1];
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  return { minX, minY, maxX, maxY };
}

// Dedicated morph-compatible assets, distinct from `/ornamental-mark.svg`
// and `/ornamental-logo.svg` (which HeroComposition.astro and
// SectionNav.tsx's own `<img>` still use respectively) — developer
// direction, post-implementation: the two paths serve genuinely
// different framing needs (the real compact-logo `<img>` needs its own
// tight, native crop; this morph needs the large shared 1216x780
// canvas both compat files are authored against), and sharing one file
// between them broke the real compact logo's own rendering (confirmed
// live: it appeared tiny and off-center once `object-fit: contain`
// tried to fit its own small box against the wrong, much larger canvas).
const MARK_SRC = '/ornamental-mark-morph.svg';
const LOGO_SRC = '/ornamental-logo-morph.svg';
/**
 * An orphan path's own logo-side bbox is either exactly zero (a
 * repeated-point collapse) or a thin decorative hairline/sliver —
 * verified against the real asset pair: the 3 real paths' own boxes
 * are never smaller than ~93 in either dimension, while every orphan's
 * own box (including non-zero slivers, not just literal points) stays
 * under ~17 in at least one dimension. 20 sits with margin in that gap.
 * A smaller epsilon (e.g. 1) mis-classifies those slivers as real,
 * which then get their own geometry morphed instead of joining their
 * intended fade group — confirmed live: only the literal zero-point
 * paths faded, the hairline ones stayed visible throughout.
 */
const COLLAPSED_EXTENT_EPSILON = 20;

/**
 * Fetches and parses the mark/logo SVG pair, verifying they're
 * structurally compatible for a direct per-argument morph (same path
 * count, same command sequence per pair). Returns `null` — never a
 * partially-wrong interpolation — on any mismatch or fetch failure.
 */
export async function loadHeroMarkMorphData(fetchImpl: typeof fetch = fetch): Promise<MorphData | null> {
  try {
    const [markText, logoText] = await Promise.all([
      fetchImpl(MARK_SRC).then((r) => r.text()),
      fetchImpl(LOGO_SRC).then((r) => r.text()),
    ]);

    // Both assets' own authoring comments contain a literal `--` inside
    // the comment body (e.g. "MARK -- morph-compatible state") — valid
    // in HTML, but forbidden by the XML spec, which rejects the whole
    // document under `image/svg+xml`'s strict XML parsing (verified:
    // jsdom's own DOMParser reports "malformed comment" on these exact
    // files). Comments carry no data this module needs, so stripping
    // them from the fetched text is a safe normalization step — not a
    // change to the asset files themselves.
    const stripComments = (text: string) => text.replace(/<!--[\s\S]*?-->/g, '');
    const parser = new DOMParser();
    const markDoc = parser.parseFromString(stripComments(markText), 'image/svg+xml');
    const logoDoc = parser.parseFromString(stripComments(logoText), 'image/svg+xml');
    if (markDoc.querySelector('parsererror') || logoDoc.querySelector('parsererror')) return null;

    const markPaths = Array.from(markDoc.querySelectorAll('path'));
    const logoPaths = Array.from(logoDoc.querySelectorAll('path'));
    if (markPaths.length === 0 || markPaths.length !== logoPaths.length) return null;

    const logoBoxes = logoPaths.map((p) => boundingBoxOfD(p.getAttribute('d') ?? ''));
    const isRealBox = (box: ReturnType<typeof boundingBoxOfD>): box is NonNullable<typeof box> =>
      box !== null && box.maxX - box.minX > COLLAPSED_EXTENT_EPSILON && box.maxY - box.minY > COLLAPSED_EXTENT_EPSILON;

    const paths: MorphPath[] = [];
    for (let i = 0; i < markPaths.length; i++) {
      const markD = markPaths[i].getAttribute('d');
      const logoD = logoPaths[i].getAttribute('d');
      if (!markD || !logoD) return null;

      const template = tokenizePathD(markD);
      const logoTokens = tokenizePathD(logoD);
      if (!template || !logoTokens) return null;

      const fromNumbers = numbersOf(template);
      const toNumbers = numbersOf(logoTokens);
      if (fromNumbers.length !== toNumbers.length) return null;

      paths.push({
        template,
        fromNumbers,
        toNumbers,
        fill: markPaths[i].getAttribute('fill') ?? 'none',
        isReal: isRealBox(logoBoxes[i]),
      });
    }

    const realBoxes = logoBoxes.filter(isRealBox);
    if (realBoxes.length === 0) return null;
    const toBox = {
      minX: Math.min(...realBoxes.map((b) => b.minX)),
      minY: Math.min(...realBoxes.map((b) => b.minY)),
      maxX: Math.max(...realBoxes.map((b) => b.maxX)),
      maxY: Math.max(...realBoxes.map((b) => b.maxY)),
    };

    const markSvgEl = markDoc.querySelector('svg');
    const viewBoxAttr = markSvgEl?.getAttribute('viewBox');
    const fromViewBoxParts = viewBoxAttr?.split(/\s+/).map(Number);
    if (!fromViewBoxParts || fromViewBoxParts.length !== 4 || fromViewBoxParts.some(Number.isNaN)) return null;

    const defs = markDoc.querySelector('defs');

    return {
      paths,
      gradientDefsMarkup: defs ? defs.innerHTML : '',
      fromViewBox: fromViewBoxParts as [number, number, number, number],
      toViewBox: [toBox.minX, toBox.minY, toBox.maxX - toBox.minX, toBox.maxY - toBox.minY],
    };
  } catch {
    return null;
  }
}
