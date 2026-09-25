import { Schema } from "@once-ui-system/core";
import { about, person } from "@/content/profile";
import { baseURL } from "@/config";
import { ogImageFor } from "@/lib/seo";

type PageSchemaProps = {
  as?: "webPage" | "blogPosting";
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
};

/** JSON-LD for a page, with the author block filled in once. */
export function PageSchema({ as = "webPage", image, ...props }: PageSchemaProps) {
  return (
    <Schema
      as={as}
      baseURL={baseURL}
      image={image || ogImageFor(props.title)}
      author={{
        name: person.name,
        url: `${baseURL}${about.path}`,
        image: `${baseURL}${person.avatar}`,
      }}
      {...props}
    />
  );
}
