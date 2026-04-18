export type Stack =
  | "nextjs"
  | "reactjs"
  | "typescript"
  | "javascript"
  | "tailwindcss"
  | "trpc"
  | "convex"
  | "vite"
  | "tanstack"
  | "shadcn-ui"
  | "prisma"
  | "drizzle"
  | "nodejs"
  | "express"
  | "mongodb"
  | "postgresql"
  | "redis"
  | "graphql"
  | "docker"
  | "aws"
  | "vercel"
  | "supabase"
  | "firebase"
  | "clerk"
  | "zod"
  | "zustand"
  | "framer-motion"
  | "radix-ui"
  | "neondb"
  | "tanstack-query";

export interface Project {
  title: string;
  description: string;
  image: string;
  stack: Stack[];
  href?: string;
  github?: string;
  disabled?: boolean;
}

export const projects: Project[] = [
  {
    title: "UPSA HMS",
    description: "A comprehensive Hospital Management System built for the UPSA Ewuntoma Clinic.",
    image: "/projects/school-thing.png",
    stack: ["tanstack", "convex"],
    disabled: true,
  },
  {
    title: "SchoolThing",
    description: "A comprehensive school management system with student and teacher dashboards.",
    image: "/projects/school-thing.png",
    stack: ["tanstack", "convex"],
    href: "https://school-thing-zeta.vercel.app",
    disabled: true,
  },
  {
    title: "TaskThing",
    description: "A simple full-stack todo application for tracking tasks.",
    image: "/projects/task-thing.png",
    stack: [
      "reactjs",
      "vite",
      "typescript",
      "tailwindcss",
      "trpc",
      "drizzle",
      "neondb",
      "tanstack-query",
    ],
    href: "https://task-thing.onrender.com",
    github: "https://github.com/mhaadiabu/task-thing",
  },
];

export const featuredProjects = projects.slice(0, 2);
