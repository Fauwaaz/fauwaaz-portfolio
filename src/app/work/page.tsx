import { Column, Heading } from "@once-ui-system/core";
import { notFound } from "next/navigation";
import { Projects } from "@/components/sections/work/Projects";
import { PageSchema } from "@/components/ui/PageSchema";
import { routes } from "@/config";
import { work } from "@/content/profile";
import { getProjects, PROJECT_CATEGORIES } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: work.title,
  description: work.description,
  path: work.path,
});

export default function WorkPage() {
  if (!routes["/work"]) notFound();

  const categories = PROJECT_CATEGORIES.filter(({ id }) =>
    getProjects().some((project) => project.metadata.category === id),
  );

  return (
    <Column maxWidth="m" paddingTop="24">
      <PageSchema title={work.title} description={work.description} path={work.path} />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {work.title}
      </Heading>
      {categories.map(({ id, label }) => (
        <Column key={id} as="section" aria-labelledby={`work-${id}`} fillWidth>
          <Heading
            as="h2"
            id={`work-${id}`}
            variant="heading-strong-l"
            onBackground="neutral-weak"
            paddingX="l"
            marginTop="24"
            marginBottom="40"
          >
            {label}
          </Heading>
          <Projects category={id} />
        </Column>
      ))}
    </Column>
  );
}
