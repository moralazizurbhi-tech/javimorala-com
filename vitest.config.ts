import { getViteConfig } from 'astro/config';
import { configDefaults } from 'vitest/config';

// Excluye las copias de worktrees (.claude/worktrees), que tienen su propio node_modules.
export default getViteConfig({
  test: {
    exclude: [...configDefaults.exclude, '.claude/**'],
  },
});
