// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  output: 'static',
  site: 'https://mhaadi.dev',
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  build: { inlineStylesheets: 'auto' },
  vite: {
    plugins: [tailwindcss()],
    build: {
      // lightningcss minifies media queries into range syntax ((width>=40rem)),
      // which Safari < 16.4 can't parse — every breakpoint dies on old iOS.
      // esbuild keeps plain max-width/min-width queries.
      cssMinify: 'esbuild',
    },
  },
  integrations: [icon(), sitemap()],
});
