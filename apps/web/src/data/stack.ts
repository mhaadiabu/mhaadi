export type StackItemCategory =
  | 'language'
  | 'frontend'
  | 'backend'
  | 'database'
  | 'orm'
  | 'service'
  | 'tooling'
  | 'design';

export type StackItem = {
  name: string;
  icon: string;
  category: StackItemCategory;
};

export const stack: StackItem[] = [
  { name: 'TypeScript', icon: 'typescript', category: 'language' },

  { name: 'React', icon: 'reactjs', category: 'frontend' },
  { name: 'Next.js', icon: 'nextjs', category: 'frontend' },
  { name: 'TanStack Start', icon: 'tanstack', category: 'frontend' },
  { name: 'Astro', icon: 'astro', category: 'frontend' },
  { name: 'Expo', icon: 'expo', category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'tailwindcss', category: 'frontend' },
  { name: 'GSAP', icon: 'gsap', category: 'frontend' },
  { name: 'TanStack Query', icon: 'tanstack-query', category: 'frontend' },

  { name: 'tRPC', icon: 'trpc', category: 'backend' },

  { name: 'Drizzle', icon: 'drizzle', category: 'orm' },

  { name: 'Convex', icon: 'convex', category: 'service' },
  { name: 'Appwrite', icon: 'appwrite', category: 'service' },

  { name: 'Vite', icon: 'vite', category: 'tooling' },
  { name: 'pnpm', icon: 'pnpm', category: 'tooling' },
  { name: 'Turborepo', icon: 'turborepo', category: 'tooling' },
  { name: 'Zed', icon: 'zed', category: 'tooling' },

  { name: 'Figma', icon: 'figma', category: 'design' },
  { name: 'Photoshop', icon: 'photoshop', category: 'design' },
  { name: 'Illustrator', icon: 'illustrator', category: 'design' },
  // { name: 'Canva', icon: 'canva', category: 'design' },
];
