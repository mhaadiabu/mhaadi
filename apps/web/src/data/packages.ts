import type { Stack } from './types';

export interface Package {
  type: 'package';
  /** display title, e.g. "BetterSVG" — falls back to the package name */
  title?: string;
  /** Local SVG name shown next to the title */
  icon?: string;
  name: string;
  scope?: string;
  description: string;
  stack: Stack[];
  version: string;
  npm: string;
  github?: string;
  website?: string;
  installCommand?: string;
}

export const packages: Package[] = [
  {
    type: 'package',
    title: 'BetterSVG',
    name: 'svg',
    scope: 'mhaadi',
    description: 'Cross-framework SVG runtime for React, React Native, Vue, Svelte, Solid, Astro and Angular',
    stack: ['typescript', 'svelte'],
    version: '0.5.1',
    npm: 'https://www.npmjs.com/package/@mhaadi/svg',
    github: 'https://github.com/mhaadiabu/better-svg',
    website: 'https://svg.mhaadi.dev',
    installCommand: 'pnpm add @mhaadi/svg',
  },
  {
    type: 'package',
    title: 'Thinking Orbs Native',
    name: 'thinking-orbs-native',
    scope: 'mhaadi',
    description: 'Animated thinking orbs for React Native.',
    stack: ['typescript'],
    version: '0.1.2',
    npm: 'https://www.npmjs.com/package/@mhaadi/thinking-orbs-native',
    github: 'https://github.com/mhaadiabu/thinking-orbs-native',
    website: 'https://orbs-native.mhaadi.dev',
    installCommand: 'pnpm add @mhaadi/thinking-orbs-native',
  },
];
