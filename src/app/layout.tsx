import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/styles/custom.css";

import { Column, Flex } from "@once-ui-system/core";
import classNames from "classnames";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SiteBackground } from "@/components/layout/SiteBackground";
import { Providers } from "@/components/providers/Providers";
import { fontVariables } from "@/config/fonts";
import { home } from "@/content/profile";
import { buildMetadata } from "@/lib/seo";
import { getThemeInitScript } from "@/lib/theme-script";

export const metadata = buildMetadata({
  title: home.title,
  description: home.description,
  path: home.path,
  image: home.image,
});

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang="en"
      fillWidth
      className={classNames(fontVariables)}
    >
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static, build-time theme bootstrap */}
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: getThemeInitScript() }} />
      </head>
      <Providers>
        <Column
          as="body"
          background="page"
          fillWidth
          style={{ minHeight: "100vh" }}
          margin="0"
          padding="0"
          horizontal="center"
        >
          <SiteBackground />
          <Flex fillWidth minHeight="16" s={{ hide: true }} />
          <Header />
          <Flex zIndex={0} fillWidth padding="l" horizontal="center" flex={1}>
            <Flex horizontal="center" fillWidth minHeight="0">
              {children}
            </Flex>
          </Flex>
          <Footer />
        </Column>
      </Providers>
    </Flex>
  );
}
