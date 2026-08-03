export type Stack =
  | 'nextjs'
  | 'tanstack'
  | 'reactjs'
  | 'typescript'
  | 'javascript'
  | 'tailwindcss'
  | 'trpc'
  | 'convex'
  | 'vite'
  | 'shadcn-ui'
  | 'prisma'
  | 'drizzle'
  | 'nodejs'
  | 'express'
  | 'mongodb'
  | 'postgresql'
  | 'redis'
  | 'graphql'
  | 'docker'
  | 'aws'
  | 'vercel'
  | 'supabase'
  | 'firebase'
  | 'clerk'
  | 'zod'
  | 'zustand'
  | 'framer-motion'
  | 'radix-ui'
  | 'neondb'
  | 'tanstack-query';

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
      'A comprehensive school management system with student and teacher dashboards.',
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
