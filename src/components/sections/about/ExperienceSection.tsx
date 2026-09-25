import { Column, Heading, Row, Text } from "@once-ui-system/core";
import { MediaRow } from "@/components/ui/MediaRow";
import type { AboutContent } from "@/types";

export function ExperienceSection({ title, experiences }: AboutContent["work"]) {
  return (
    <>
      <Heading as="h2" id={title} variant="display-strong-s" marginBottom="m">
        {title}
      </Heading>
      <Column fillWidth gap="l" marginBottom="40">
        {experiences.map((experience) => (
          <Column key={`${experience.company}-${experience.timeframe}`} fillWidth>
            <Row fillWidth horizontal="between" vertical="end" marginBottom="4">
              <Text id={experience.company} variant="heading-strong-l">
                {experience.company}
              </Text>
              <Text variant="heading-default-xs" onBackground="neutral-weak">
                {experience.timeframe}
              </Text>
            </Row>
            <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
              {experience.role}
            </Text>
            <Column as="ul" gap="16">
              {experience.achievements.map((achievement, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static content, never reordered
                <Text as="li" variant="body-default-m" key={index}>
                  {achievement}
                </Text>
              ))}
            </Column>
            <MediaRow images={experience.images} paddingLeft="40" />
          </Column>
        ))}
      </Column>
    </>
  );
}
