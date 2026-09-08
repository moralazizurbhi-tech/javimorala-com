import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { compileString } from 'sass';

const stylesDir = path.dirname(fileURLToPath(import.meta.url));

describe('styling system tokens/mixins', () => {
  it('exposes typography, spacing, colour, breakpoint, and interaction-state tokens/mixins', () => {
    const probe = `
      @use 'index' as styles;

      .probe {
        color: styles.$color-foreground;
        background-color: styles.$color-background;
        background-image: styles.$gradient-accent;
        font-family: styles.$font-family-base;
        font-size: styles.$font-size-display;
        font-weight: styles.$font-weight-bold;
        padding: styles.space('md');
        @include styles.interactive-transition;

        @include styles.respond-to('desktop') {
          font-size: styles.$font-size-heading;
        }
      }
    `;

    const result = compileString(probe, { loadPaths: [stylesDir] });

    expect(result.css).toContain('.probe');
    expect(result.css).toContain('transition-property');
    expect(result.css).toMatch(/@media/);
  });
});
