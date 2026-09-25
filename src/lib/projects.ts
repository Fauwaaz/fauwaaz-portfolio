import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import type { Project, ProjectCategory, ProjectMetadata } from "@/types";

const PROJECTS_DIR = path.join(process.cwd(), "src", "content", "projects");

export const PROJECT_CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: "business", label: "Business websites" },
  { id: "ecommerce", label: "E-commerce" },
];

function parseProject(file: string): Project {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf-8");
  const { data, content } = matter(raw);

  const metadata: ProjectMetadata = {
    title: data.title ?? "",
    summary: data.summary ?? "",
    category: data.category === "ecommerce" ? "ecommerce" : "business",
    featured: data.featured === true,
    order: typeof data.order === "number" ? data.order : 999,
    client: data.client,
    location: data.location,
    stack: data.stack ?? [],
    publishedAt: data.publishedAt,
    image: data.image ?? "",
    images: data.images ?? [],
    team: data.team ?? [],
    link: data.link ?? "",
  };

  return { slug: path.basename(file, path.extname(file)), metadata, content };
}

/** All projects: featured first, then by `order`. Cached per request. */
export const getProjects = cache((): Project[] => {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => path.extname(file) === ".mdx")
    .map(parseProject)
    .sort(
      (a, b) =>
        Number(b.metadata.featured) - Number(a.metadata.featured) ||
        a.metadata.order - b.metadata.order,
    );
});

export function getProject(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

export type ProjectFilter = {
  /** 1-based inclusive: [1, 1] = first only, [2] = second onward. Applied after filtering. */
  range?: [number, number?];
  exclude?: string[];
  featured?: boolean;
  category?: ProjectCategory;
};

export function selectProjects(
  projects: Project[],
  { range, exclude = [], featured, category }: ProjectFilter = {},
): Project[] {
  const filtered = projects.filter(
    ({ slug, metadata }) =>
      !exclude.includes(slug) &&
      (featured === undefined || metadata.featured === featured) &&
      (category === undefined || metadata.category === category),
  );
  return range ? filtered.slice(range[0] - 1, range[1] ?? filtered.length) : filtered;
}
