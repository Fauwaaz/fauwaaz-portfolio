import { Button, Column, Heading, Icon, IconButton, Row, Text } from "@once-ui-system/core";
import { Fragment } from "react";
import { about, person, social } from "@/content/profile";
import styles from "./about.module.scss";

/** CTA pill, name, role and social buttons. */
export function AboutHeader() {
  const essentials = social.filter((item) => item.essential);

  return (
    <Column id={about.intro.title} fillWidth minHeight="160" vertical="center" marginBottom="32">
      {about.cta.display && (
        <Row
          fitWidth
          border="brand-alpha-medium"
          background="brand-alpha-weak"
          radius="full"
          padding="4"
          gap="8"
          marginBottom="m"
          vertical="center"
          className={styles.blockAlign}
          style={{ backdropFilter: "blur(var(--static-space-1))" }}
        >
          <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
          <Row paddingX="8">{about.cta.label}</Row>
          <IconButton
            href={about.cta.link}
            data-border="rounded"
            variant="secondary"
            icon="chevronRight"
            aria-label={about.cta.label}
          />
        </Row>
      )}
      <Heading className={styles.textAlign} variant="display-strong-xl">
        {person.name}
      </Heading>
      <Text className={styles.textAlign} variant="display-default-xs" onBackground="neutral-weak">
        {person.role}
      </Text>
      {essentials.length > 0 && (
        <Row
          className={styles.blockAlign}
          paddingTop="20"
          paddingBottom="8"
          gap="8"
          wrap
          horizontal="center"
          fitWidth
          data-border="rounded"
        >
          {essentials.map((item) => (
            <Fragment key={item.name}>
              <Row s={{ hide: true }}>
                <Button
                  href={item.link}
                  prefixIcon={item.icon}
                  label={item.name}
                  size="s"
                  weight="default"
                  variant="secondary"
                />
              </Row>
              <Row hide s={{ hide: false }}>
                <IconButton size="l" href={item.link} icon={item.icon} variant="secondary" aria-label={item.name} />
              </Row>
            </Fragment>
          ))}
        </Row>
      )}
    </Column>
  );
}
