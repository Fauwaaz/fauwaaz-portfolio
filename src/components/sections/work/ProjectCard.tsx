"use client";

import { AvatarGroup, Carousel, Column, Flex, Heading, SmartLink, Text } from "@once-ui-system/core";

type ProjectCardProps = {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  description: string;
  hasCaseStudy: boolean;
  avatars: { src: string }[];
  link?: string;
};

export function ProjectCard({
  href,
  priority = false,
  images,
  title,
  description,
  hasCaseStudy,
  avatars,
  link,
}: ProjectCardProps) {
  return (
    <Column fillWidth gap="m">
      <Carousel
        priority={priority}
        sizes="(max-width: 960px) 100vw, 960px"
        items={images.map((image) => ({ slide: image, alt: title }))}
      />
      <Flex s={{ direction: "column" }} fillWidth paddingX="s" paddingTop="12" paddingBottom="24" gap="l">
        {title && (
          <Flex flex={5}>
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
          </Flex>
        )}
        {(avatars.length > 0 || description.trim() || hasCaseStudy) && (
          <Column flex={7} gap="16">
            {avatars.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
            {description.trim() && (
              <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                {description}
              </Text>
            )}
            <Flex gap="24" wrap>
              {hasCaseStudy && (
                <SmartLink suffixIcon="arrowRight" style={{ margin: "0", width: "fit-content" }} href={href}>
                  <Text variant="body-default-s">Read case study</Text>
                </SmartLink>
              )}
              {link && (
                <SmartLink
                  suffixIcon="arrowUpRightFromSquare"
                  style={{ margin: "0", width: "fit-content" }}
                  href={link}
                >
                  <Text variant="body-default-s">View project</Text>
                </SmartLink>
              )}
            </Flex>
          </Column>
        )}
      </Flex>
    </Column>
  );
}
