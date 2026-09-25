import { Column, Heading, Text } from "@once-ui-system/core";
import type { AboutContent } from "@/types";

export function StudiesSection({ title, institutions }: AboutContent["studies"]) {
  return (
    <>
      <Heading as="h2" id={title} variant="display-strong-s" marginBottom="m">
        {title}
      </Heading>
      <Column fillWidth gap="l" marginBottom="40">
        {institutions.map((institution) => (
          <Column key={institution.name} fillWidth gap="4">
            <Text id={institution.name} variant="heading-strong-l">
              {institution.name}
            </Text>
            <Text variant="heading-default-xs" onBackground="neutral-weak">
              {institution.description}
            </Text>
          </Column>
        ))}
      </Column>
    </>
  );
}
