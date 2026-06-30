export type StackItemCategory =
  | 'language'
  | 'frontend'
  | 'backend'
  | 'database'
  | 'orm'
  | 'service'
  | 'tooling';

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

  { name: 'PostgreSQL', icon: 'postgresql', category: 'database' },
  { name: 'Neon', icon: 'neondb', category: 'database' },

  { name: 'Drizzle', icon: 'drizzle', category: 'orm' },

  { name: 'Convex', icon: 'convex', category: 'service' },
  { name: 'Clerk', icon: 'clerk', category: 'service' },
  { name: 'Appwrite', icon: 'appwrite', category: 'service' },

  { name: 'Vite', icon: 'vite', category: 'tooling' },
  { name: 'pnpm', icon: 'pnpm', category: 'tooling' },
  { name: 'Turborepo', icon: 'turborepo', category: 'tooling' },
  { name: 'Zed', icon: 'zed', category: 'tooling' },
];
