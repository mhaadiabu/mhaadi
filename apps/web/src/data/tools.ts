export type ToolCategory =
  | 'language'
  | 'frontend'
  | 'backend'
  | 'database'
  | 'orm'
  | 'service'
  | 'tooling';

export type Tool = {
  name: string;
  icon: string;
  category: ToolCategory;
};

export const iconLabels: Record<string, string> = {
  nextjs: 'Next.js',
  tanstack: 'TanStack Start',
  reactjs: 'React',
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  tailwindcss: 'Tailwind CSS',
  trpc: 'tRPC',
  convex: 'Convex',
  vite: 'Vite',
  'shadcn-ui': 'shadcn/ui',
  prisma: 'Prisma',
  drizzle: 'Drizzle',
  nodejs: 'Node.js',
  express: 'Express',
  mongodb: 'MongoDB',
  postgresql: 'PostgreSQL',
  redis: 'Redis',
  graphql: 'GraphQL',
  docker: 'Docker',
  aws: 'AWS',
  vercel: 'Vercel',
  supabase: 'Supabase',
  firebase: 'Firebase',
  clerk: 'Clerk',
  zod: 'Zod',
  zustand: 'Zustand',
  'framer-motion': 'Framer Motion',
  'radix-ui': 'Radix UI',
  neondb: 'Neon',
  'tanstack-query': 'TanStack Query',
  astro: 'Astro',
  expo: 'Expo',
};

export const tools: Tool[] = [
  { name: 'TypeScript', icon: 'typescript', category: 'language' },

  { name: 'React', icon: 'reactjs', category: 'frontend' },
  { name: 'Next.js', icon: 'nextjs', category: 'frontend' },
  { name: 'Astro', icon: 'astro', category: 'frontend' },
  { name: 'Expo', icon: 'expo', category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'tailwindcss', category: 'frontend' },
  { name: 'TanStack Start', icon: 'tanstack', category: 'frontend' },
  { name: 'TanStack Query', icon: 'tanstack-query', category: 'frontend' },

  { name: 'tRPC', icon: 'trpc', category: 'backend' },

  { name: 'Neon', icon: 'neondb', category: 'database' },

  { name: 'Drizzle', icon: 'drizzle', category: 'orm' },

  { name: 'Convex', icon: 'convex', category: 'service' },
  { name: 'Clerk', icon: 'clerk', category: 'service' },

  { name: 'Vite', icon: 'vite', category: 'tooling' },
];
