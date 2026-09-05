import type { Stack } from './types';

export interface Project {
  type: 'project';
  title: string;
  description: string;
  image: ImageMetadata;
  stack: Stack[];
  href?: string;
  github?: string;
  disabled?: boolean;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    type: 'project',
    title: 'Finora',
    description: 'A financial OS client and mcp for AI chatbots/agents',
    image: schoolThingImage,
    stack: ['expo', 'clerk', 'typescript', 'hono', 'cloudflare-workers'],
    href: 'https://finora-web.vercel.app',
    github: 'https://github.com/mhaadiabu/finora',
    disabled: true,
  },
  {
    type: 'project',
    title: 'UPSA HMS',
    description:
      'A comprehensive Hospital Management System built for the UPSA Ewuntoma Clinic.',
    image: schoolThingImage,
    stack: ['tanstack', 'convex'],
    disabled: true,
  },
  {
    type: 'project',
    title: 'SchoolThing',
    description:
      'A unified school management system for tertiary institutions bringing student workflows into one focused experience.',
    image: schoolThingImage,
    stack: ['tanstack', 'convex'],
    href: 'https://school-thing-zeta.vercel.app',
    disabled: true,
  },
  {
    type: 'project',
    title: 'TaskThing',
    description: 'A simple full-stack todo application for tracking tasks.',
    image: taskThingImage,
    stack: [
      'reactjs',
      'vite',
      'typescript',
      'tailwindcss',
      'trpc',
      'drizzle',
      'neondb',
      'tanstack-query',
    ],
    href: 'https://task-thing.onrender.com',
    github: 'https://github.com/mhaadiabu/task-thing',
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
import type { ImageMetadata } from 'astro';
import schoolThingImage from '../assets/projects/school-thing.png';
import taskThingImage from '../assets/projects/task-thing.png';
