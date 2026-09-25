import { Column } from "@once-ui-system/core";
import { work } from "@/content/profile";
import { getProjects, type ProjectFilter, selectProjects } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

export function Projects(filter: ProjectFilter) {
  const projects = selectProjects(getProjects(), filter);
  if (projects.length === 0) return null;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          priority={index === 0}
          href={`${work.path}/${project.slug}`}
          images={project.metadata.images}
          title={project.metadata.title}
          description={project.metadata.summary}
          hasCaseStudy={project.content.trim().length > 0}
          avatars={project.metadata.team.map((member) => ({ src: member.avatar }))}
          link={project.metadata.link}
        />
      ))}
    </Column>
  );
}
