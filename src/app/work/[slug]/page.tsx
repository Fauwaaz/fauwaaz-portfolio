import {
  AvatarGroup,
  Column,
  Heading,
  Line,
  Media,
  Row,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx/CustomMDX";
import { Projects } from "@/components/sections/work/Projects";
import { PageSchema } from "@/components/ui/PageSchema";
import { ScrollToHash } from "@/components/ui/ScrollToHash";
import { routes } from "@/config";
import { work } from "@/content/profile";
import { formatDate } from "@/lib/format-date";
import { getProject, getProjects } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

/** Only slugs that exist at build time are valid; everything else is a static 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return buildMetadata({
    title: project.metadata.title,
    description: project.metadata.summary,
    path: `${work.path}/${project.slug}`,
    image: project.metadata.image,
  });
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!routes["/work"] || !project) notFound();

  const { metadata } = project;
  const hasRelated = getProjects().some(
    (p) => p.slug !== project.slug && p.metadata.category === metadata.category,
  );

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <PageSchema
        as="blogPosting"
        path={`${work.path}/${project.slug}`}
        title={metadata.title}
        description={metadata.summary}
        datePublished={metadata.publishedAt}
        dateModified={metadata.publishedAt}
        image={metadata.image}
      />
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href={work.path}>
          <Text variant="label-strong-m">Projects</Text>
        </SmartLink>
        {metadata.publishedAt && (
          <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
            {formatDate(metadata.publishedAt)}
          </Text>
        )}
        <Heading variant="display-strong-m">{metadata.title}</Heading>
        {(metadata.location || metadata.stack.length > 0) && (
          <Text variant="body-default-s" onBackground="neutral-weak" wrap="balance">
            {[metadata.location, metadata.stack.join(", ")].filter(Boolean).join(". ")}
          </Text>
        )}
        {metadata.link && (
          <SmartLink suffixIcon="arrowUpRightFromSquare" href={metadata.link}>
            <Text variant="label-strong-m">Visit the live site</Text>
          </SmartLink>
        )}
      </Column>

      {metadata.team.length > 0 && (
        <Row marginBottom="32" horizontal="center">
          <Row gap="16" vertical="center">
            <AvatarGroup reverse avatars={metadata.team.map((m) => ({ src: m.avatar }))} size="s" />
            <Text variant="label-default-m" onBackground="brand-weak">
              {metadata.team.map((member, index) => (
                <span key={member.name}>
                  {index > 0 && (
                    <Text as="span" onBackground="neutral-weak">
                      ,{" "}
                    </Text>
                  )}
                  <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
                </span>
              ))}
            </Text>
          </Row>
        </Row>
      )}

      {metadata.images.length > 0 && (
        <Media priority aspectRatio="16 / 9" radius="m" alt={metadata.title} src={metadata.images[0]} />
      )}

      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <CustomMDX source={project.content} />
      </Column>

      {hasRelated && (
        <Column fillWidth gap="40" horizontal="center" marginTop="40">
          <Line maxWidth="40" />
          <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
            Related projects
          </Heading>
          <Projects exclude={[project.slug]} category={metadata.category} range={[1, 2]} />
        </Column>
      )}
      <ScrollToHash />
    </Column>
  );
}
