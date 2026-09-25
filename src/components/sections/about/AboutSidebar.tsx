import { Avatar, Column, Icon, Row, Tag } from "@once-ui-system/core";
import { person } from "@/content/profile";

/** Sticky avatar column on desktop; stacks above the content on mobile. */
export function AboutSidebar() {
  return (
    <Column
      top="64"
      fitHeight
      position="sticky"
      s={{ position: "relative", style: { top: "auto" } }}
      xs={{ style: { top: "auto" } }}
      minWidth="160"
      paddingX="l"
      paddingBottom="xl"
      gap="m"
      flex={3}
      horizontal="center"
    >
      <Avatar src={person.avatar} size="xl" />
      <Row gap="8" vertical="center">
        <Icon onBackground="accent-weak" name="globe" />
        {person.locationLabel}
      </Row>
      {person.languages && person.languages.length > 0 && (
        <Row wrap gap="8">
          {person.languages.map((language) => (
            <Tag key={language} size="l">
              {language}
            </Tag>
          ))}
        </Row>
      )}
    </Column>
  );
}
