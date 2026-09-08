import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { motion } from 'framer-motion';
import { Slot } from 'radix-ui';
import ScaffoldCheck from './ScaffoldCheck';

describe('project scaffold', () => {
  it('imports React, Framer Motion, and Radix UI', () => {
    expect(motion.div).toBeDefined();
    expect(Slot.Root).toBeDefined();
  });

  it('renders the scaffold-check island to markup', () => {
    const markup = renderToStaticMarkup(<ScaffoldCheck />);
    expect(markup).toContain('Scaffold check');
  });
});
