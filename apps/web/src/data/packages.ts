export interface Package {
  type: 'package';
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
    name: 'svg',
    scope: 'mhaadi',
    description: 'Inline SVG rendering for React.',
    version: '0.1.1',
    npm: 'https://www.npmjs.com/package/@mhaadi/svg',
    github: 'https://github.com/mhaadiabu/better-svg',
    website: 'https://svg.mhaadi.dev',
    installCommand: 'pnpm add @mhaadi/svg',
  },
];
