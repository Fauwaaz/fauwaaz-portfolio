"use client";

import {
  DataThemeProvider,
  IconProvider,
  LayoutProvider,
  ThemeProvider,
  ToastProvider,
} from "@once-ui-system/core";
import type { ReactNode } from "react";
import { dataStyle, iconLibrary, style } from "@/config";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LayoutProvider>
      <ThemeProvider
        brand={style.brand}
        accent={style.accent}
        neutral={style.neutral}
        solid={style.solid}
        solidStyle={style.solidStyle}
        border={style.border}
        surface={style.surface}
        transition={style.transition}
        scaling={style.scaling}
      >
        <DataThemeProvider
          variant={dataStyle.variant}
          mode={dataStyle.mode}
          height={dataStyle.height}
          axis={dataStyle.axis}
          tick={dataStyle.tick}
        >
          <ToastProvider>
            <IconProvider icons={iconLibrary}>{children}</IconProvider>
          </ToastProvider>
        </DataThemeProvider>
      </ThemeProvider>
    </LayoutProvider>
  );
}
