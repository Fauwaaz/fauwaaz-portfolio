import {
  Accordion,
  AccordionGroup,
  Button,
  Card,
  CodeBlock,
  Column,
  Feedback,
  Grid,
  Heading,
  HeadingLink,
  Icon,
  InlineCode,
  Line,
  List,
  ListItem,
  Media,
  type MediaProps,
  Row,
  SmartLink,
  Table,
  Text,
  type TextProps,
} from "@once-ui-system/core";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { slugify as transliterate } from "transliteration";

type CustomLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode };

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith("/")) {
    return (
      <SmartLink href={href} {...props}>
        {children}
      </SmartLink>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function MdxImage({ alt, src, ...props }: MediaProps & { src: string }) {
  if (!src) return null;
  return (
    <Media
      marginTop="8"
      marginBottom="16"
      enlarge
      radius="m"
      border="neutral-alpha-medium"
      sizes="(max-width: 960px) 100vw, 960px"
      alt={alt}
      src={src}
      {...props}
    />
  );
}

const slugify = (str: string) =>
  transliterate(str.replace(/&/g, " and "), { lowercase: true, separator: "-" }).replace(/-{2,}/g, "-");

function createHeading(as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  const MdxHeading = ({
    children,
    ...props
  }: Omit<React.ComponentProps<typeof HeadingLink>, "as" | "id">) => (
    <HeadingLink marginTop="24" marginBottom="12" as={as} id={slugify(String(children))} {...props}>
      {children}
    </HeadingLink>
  );
  MdxHeading.displayName = as;
  return MdxHeading;
}

function MdxParagraph({ children }: TextProps) {
  return (
    <Text
      style={{ lineHeight: "175%" }}
      variant="body-default-m"
      onBackground="neutral-medium"
      marginTop="8"
      marginBottom="12"
    >
      {children}
    </Text>
  );
}

// biome-ignore lint/suspicious/noExplicitAny: MDX passes a <code> element as child
function MdxPre(props: any) {
  const codeProps = props.children?.props;
  if (!codeProps?.className) return <pre {...props} />;
  const language = codeProps.className.replace("language-", "");
  return (
    <CodeBlock
      marginTop="8"
      marginBottom="16"
      codes={[
        {
          code: codeProps.children,
          language,
          label: language.charAt(0).toUpperCase() + language.slice(1),
        },
      ]}
      copyButton
    />
  );
}

const createList = (as: "ul" | "ol") =>
  function MdxList({ children }: { children: ReactNode }) {
    return <List as={as}>{children}</List>;
  };

const MdxListItem = ({ children }: { children: ReactNode }) => (
  <ListItem marginTop="4" marginBottom="8" style={{ lineHeight: "175%" }}>
    {children}
  </ListItem>
);

const MdxHr = () => (
  <Row fillWidth horizontal="center">
    <Line maxWidth="40" />
  </Row>
);

const components = {
  p: MdxParagraph,
  h1: createHeading("h1"),
  h2: createHeading("h2"),
  h3: createHeading("h3"),
  h4: createHeading("h4"),
  h5: createHeading("h5"),
  h6: createHeading("h6"),
  img: MdxImage,
  a: CustomLink,
  code: InlineCode,
  pre: MdxPre,
  ol: createList("ol"),
  ul: createList("ul"),
  li: MdxListItem,
  hr: MdxHr,
  Heading,
  Text,
  CodeBlock,
  InlineCode,
  Accordion,
  AccordionGroup,
  Table,
  Feedback,
  Button,
  Card,
  Grid,
  Row,
  Column,
  Icon,
  Media,
  SmartLink,
} as MDXRemoteProps["components"];

export function CustomMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      options={{ blockJS: false }}
      {...props}
      components={{ ...components, ...(props.components ?? {}) }}
    />
  );
}
