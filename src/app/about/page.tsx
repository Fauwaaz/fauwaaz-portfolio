import { Column, Row } from "@once-ui-system/core";
import { notFound } from "next/navigation";
import {
  AboutHeader,
  AboutSidebar,
  ExperienceSection,
  SkillsSection,
  StudiesSection,
  TableOfContents,
  type TocSection,
} from "@/components/sections/about";
import styles from "@/components/sections/about/about.module.scss";
import { PageSchema } from "@/components/ui/PageSchema";
import { routes } from "@/config";
import { about } from "@/content/profile";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: about.title,
  description: about.description,
  path: about.path,
});

const tocSections: TocSection[] = [
  { title: about.intro.title, display: about.intro.display, items: [] },
  { title: about.work.title, display: about.work.display, items: about.work.experiences.map((e) => e.company) },
  { title: about.studies.title, display: about.studies.display, items: about.studies.institutions.map((i) => i.name) },
  { title: about.technical.title, display: about.technical.display, items: about.technical.skills.map((s) => s.title) },
];

export default function AboutPage() {
  if (!routes["/about"]) notFound();

  return (
    <Column maxWidth="m">
      <PageSchema title={about.title} description={about.description} path={about.path} />
      {about.tableOfContent.display && (
        <TableOfContents sections={tocSections} subItems={about.tableOfContent.subItems} />
      )}
      <Row fillWidth s={{ direction: "column" }} horizontal="center">
        {about.avatar.display && <AboutSidebar />}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <AboutHeader />
          {about.intro.display && (
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
              {about.intro.description}
            </Column>
          )}
          {about.work.display && <ExperienceSection {...about.work} />}
          {about.studies.display && <StudiesSection {...about.studies} />}
          {about.technical.display && <SkillsSection {...about.technical} />}
        </Column>
      </Row>
    </Column>
  );
}
