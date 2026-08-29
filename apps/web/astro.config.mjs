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
  vite: { plugins: [tailwindcss()] },
  integrations: [icon(), sitemap()],
});
