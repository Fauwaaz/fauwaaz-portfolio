import { Media, Row } from "@once-ui-system/core";
import type { ComponentProps } from "react";
import type { MediaImage } from "@/types";

/** Row of enlargeable thumbnails, used under experience and skill entries. */
export function MediaRow({
  images,
  ...rest
}: { images?: MediaImage[] } & ComponentProps<typeof Row>) {
  if (!images?.length) return null;
  return (
    <Row fillWidth paddingTop="m" gap="12" wrap {...rest}>
      {images.map((image) => (
        <Row
          key={image.src}
          border="neutral-medium"
          radius="m"
          minWidth={image.width}
          height={image.height}
        >
          <Media enlarge radius="m" sizes={image.width.toString()} alt={image.alt} src={image.src} />
        </Row>
      ))}
    </Row>
  );
}
