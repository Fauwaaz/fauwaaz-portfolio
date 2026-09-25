import type { MetadataRoute } from "next";
import { baseURL, routes } from "@/config";
import { work } from "@/content/profile";
import { getProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split("T")[0];

  const pages = Object.entries(routes)
    .filter(([, enabled]) => enabled)
    .map(([route]) => ({ url: `${baseURL}${route === "/" ? "" : route}`, lastModified: today }));

  const projects = routes["/work"]
    ? getProjects().map((project) => ({
        url: `${baseURL}${work.path}/${project.slug}`,
        lastModified: project.metadata.publishedAt ?? today,
      }))
    : [];

  return [...pages, ...projects];
}
