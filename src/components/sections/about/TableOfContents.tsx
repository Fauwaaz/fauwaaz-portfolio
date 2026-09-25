"use client";

import { Column, Flex, Text } from "@once-ui-system/core";
import styles from "./about.module.scss";

export type TocSection = { title: string; display: boolean; items: string[] };

const SCROLL_OFFSET = 80;

function scrollToId(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
  window.scrollTo({
    top: element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET,
    behavior: "smooth",
  });
}

export function TableOfContents({ sections, subItems }: { sections: TocSection[]; subItems: boolean }) {
  return (
    <Column
      as="nav"
      aria-label="On this page"
      left="0"
      style={{ top: "50%", transform: "translateY(-50%)", whiteSpace: "nowrap" }}
      position="fixed"
      paddingLeft="24"
      gap="32"
      m={{ hide: true }}
    >
      {sections
        .filter((section) => section.display)
        .map((section) => (
          <Column key={section.title} gap="12">
            <Flex
              cursor="interactive"
              className={styles.hover}
              gap="8"
              vertical="center"
              onClick={() => scrollToId(section.title)}
            >
              <Flex height="1" minWidth="16" background="neutral-strong" />
              <Text>{section.title}</Text>
            </Flex>
            {subItems &&
              section.items.map((item) => (
                <Flex
                  l={{ hide: true }}
                  key={item}
                  style={{ cursor: "pointer" }}
                  className={styles.hover}
                  gap="12"
                  paddingLeft="24"
                  vertical="center"
                  onClick={() => scrollToId(item)}
                >
                  <Flex height="1" minWidth="8" background="neutral-strong" />
                  <Text>{item}</Text>
                </Flex>
              ))}
          </Column>
        ))}
    </Column>
  );
}
