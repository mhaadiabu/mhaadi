// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://mhaadi.dev',
  fonts: [{
    provider: fontProviders.fontsource(),
    name: 'Geist Mono',
    cssVariable: '--font-geist-mono',
    weights: ['100 900'],
    styles: ['normal'],
    subsets: ['latin'],
    formats: ['woff2'],
    fallbacks: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
    optimizedFallbacks: true,
    display: 'swap',
  }],

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [icon()],
});
