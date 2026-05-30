export type Tool = {
  name: string;
  icon: string;
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
  { name: 'React', icon: 'reactjs' },
  { name: 'Next.js', icon: 'nextjs' },
  { name: 'Tailwind CSS', icon: 'tailwindcss' },
  { name: 'TanStack Start', icon: 'tanstack' },
  { name: 'tRPC', icon: 'trpc' },
  { name: 'Drizzle', icon: 'drizzle' },
  { name: 'Astro', icon: 'astro' },
  { name: 'Convex', icon: 'convex' },
  { name: 'Expo', icon: 'expo' },
  { name: 'TanStack Query', icon: 'tanstack-query' },
  { name: 'Clerk', icon: 'clerk' },
];
