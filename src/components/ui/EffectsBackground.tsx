import { Background, type Opacity, type SpacingToken } from "@once-ui-system/core";
import type { ComponentProps } from "react";
import type { EffectsConfig } from "@/types";

type EffectsBackgroundProps = { effects: EffectsConfig } & Omit<
  ComponentProps<typeof Background>,
  "mask" | "gradient" | "dots" | "grid" | "lines"
>;

/** Maps an EffectsConfig onto Once UI's <Background>. Used by the page and the contact card. */
export function EffectsBackground({ effects, ...rest }: EffectsBackgroundProps) {
  const { mask, gradient, dots, grid, lines } = effects;
  return (
    <Background
      {...rest}
      mask={mask}
      gradient={{ ...gradient, opacity: gradient.opacity as Opacity }}
      dots={{ ...dots, opacity: dots.opacity as Opacity, size: dots.size as SpacingToken }}
      grid={{ ...grid, opacity: grid.opacity as Opacity }}
      lines={{ ...lines, opacity: lines.opacity as Opacity, size: lines.size as SpacingToken }}
    />
  );
}
