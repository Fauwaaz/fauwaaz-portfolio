import { Meta } from "@once-ui-system/core";
import type { Metadata } from "next";
import { baseURL } from "@/config";

export const ogImageFor = (title: string) =>
  `/api/og/generate?title=${encodeURIComponent(title)}`;

/** Thin wrapper so every page builds metadata the same way. */
export function buildMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  return Meta.generate({
    title,
    description,
    baseURL,
    path,
    image: image || ogImageFor(title),
  });
}
