import { Column, Heading, Row, Tag, Text } from "@once-ui-system/core";
import { MediaRow } from "@/components/ui/MediaRow";
import type { AboutContent } from "@/types";

export function SkillsSection({ title, skills }: AboutContent["technical"]) {
  return (
    <>
      <Heading as="h2" id={title} variant="display-strong-s" marginBottom="40">
        {title}
      </Heading>
      <Column fillWidth gap="l">
        {skills.map((skill) => (
          <Column key={skill.title} fillWidth gap="4">
            <Text id={skill.title} variant="heading-strong-l">
              {skill.title}
            </Text>
            {skill.description && (
              <Text variant="body-default-m" onBackground="neutral-weak">
                {skill.description}
              </Text>
            )}
            {skill.tags && skill.tags.length > 0 && (
              <Row wrap gap="8" paddingTop="8">
                {skill.tags.map((tag) => (
                  <Tag key={tag.name} size="l" prefixIcon={tag.icon}>
                    {tag.name}
                  </Tag>
                ))}
              </Row>
            )}
            <MediaRow images={skill.images} />
          </Column>
        ))}
      </Column>
    </>
  );
}
