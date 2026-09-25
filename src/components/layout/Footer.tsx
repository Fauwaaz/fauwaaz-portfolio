import { IconButton, Row, Text } from "@once-ui-system/core";
import { person, social } from "@/content/profile";
import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <Row as="footer" fillWidth padding="8" horizontal="center" s={{ direction: "column" }}>
      <Row
        className={styles.mobile}
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="between"
        vertical="center"
        s={{ direction: "column", horizontal: "center", align: "center" }}
      >
        <Text variant="body-default-s" onBackground="neutral-strong">
          <Text onBackground="neutral-weak">© {new Date().getFullYear()} /</Text>
          <Text paddingX="4">{person.name}</Text>
        </Text>
        <Row gap="16">
          {social.map((item) => (
            <IconButton
              key={item.name}
              href={item.link}
              icon={item.icon}
              tooltip={item.name}
              size="s"
              variant="ghost"
            />
          ))}
        </Row>
      </Row>
      {/* Spacer so the fixed mobile nav doesn't cover the footer */}
      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
}
