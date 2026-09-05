export interface Package {
  type: 'package';
  /** display title, e.g. "BetterSVG" — falls back to the package name */
  title?: string;
  /** astro-icon name shown next to the title */
  icon?: string;
  name: string;
  scope?: string;
  description: string;
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
    description: 'Inline SVG rendering for React, React Native, Vue & Svelte',
    version: '0.2.3',
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
    version: '0.1.1',
    npm: 'https://www.npmjs.com/package/@mhaadi/thinking-orbs-native',
    github: 'https://github.com/mhaadiabu/thinking-orbs-native',
    website: 'https://orbs-native.mhaadi.dev',
    installCommand: 'pnpm add @mhaadi/thinking-orbs-native',
  },
];
