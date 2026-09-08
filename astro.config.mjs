// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [react()],
  // i18n/Routing Layer (Task Catalog T-005; content-localization
  // Technical Design, Design Decision 2): English served at /en/, not
  // unprefixed at root — all three locales symmetric.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'eu'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
