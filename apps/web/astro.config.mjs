import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField } from 'astro/config';

import icon from 'astro-icon';

const alchemyConfigPath = fileURLToPath(
  new URL('./.alchemy/local/wrangler.jsonc', import.meta.url),
);
const shouldUseAlchemy = existsSync(alchemyConfigPath);

// Only import the Cloudflare adapter when running under `alchemy dev`,
// otherwise use the Node adapter for bare `astro dev` with HMR.
const adapter = shouldUseAlchemy
  ? (await import('alchemy/cloudflare/astro')).default({ platformProxy: { configPath: alchemyConfigPath } })
  : (await import('@astrojs/node')).default({ mode: 'standalone' });

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter,

  env: {
    schema: {
      PUBLIC_SERVER_URL: envField.string({
        access: 'public',
        context: 'client',
        default: 'http://localhost:3000',
      }),
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [icon()],
});