"use client";

import { Fade, Flex, Line, Row, ToggleButton } from "@once-ui-system/core";
import { usePathname } from "next/navigation";
import { display, routes, type IconName } from "@/config";
import { about, person, work } from "@/content/profile";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";
import { TimeDisplay } from "./TimeDisplay";
import styles from "./Header.module.scss";

type NavItem = { href: "/about" | "/work"; icon: IconName; label: string; match: "exact" | "prefix" };

const NAV_ITEMS: NavItem[] = [
  { href: "/about", icon: "person", label: about.label, match: "exact" },
  { href: "/work", icon: "grid", label: work.label, match: "prefix" },
];

export function Header() {
  const pathname = usePathname() ?? "";
  const isActive = ({ href, match }: NavItem) =>
    match === "exact" ? pathname === href : pathname.startsWith(href);

  return (
    <>
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Fade hide s={{ hide: false }} fillWidth position="fixed" bottom="0" to="top" height="80" zIndex={9} />
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        s={{ position: "fixed" }}
      >
        <Row paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s">
          {display.location && <Row s={{ hide: true }}>{person.location}</Row>}
        </Row>

        <Row fillWidth horizontal="center">
          <Row
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Row gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <ToggleButton prefixIcon="home" href="/" selected={pathname === "/"} aria-label="Home" />
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {NAV_ITEMS.filter((item) => routes[item.href]).map((item) => (
                <NavLink key={item.href} {...item} selected={isActive(item)} />
              ))}
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              )}
            </Row>
          </Row>
        </Row>

        <Flex fillWidth horizontal="end" vertical="center">
          <Flex paddingRight="12" horizontal="end" vertical="center" textVariant="body-default-s" gap="20">
            <Flex s={{ hide: true }}>{display.time && <TimeDisplay timeZone={person.location} />}</Flex>
          </Flex>
        </Flex>
      </Row>
    </>
  );
}
