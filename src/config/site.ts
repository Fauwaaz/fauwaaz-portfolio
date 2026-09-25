import type { DisplayConfig, RoutesConfig, SchemaConfig } from "@/types";

/**
 * Production URL. Used for canonical URLs, OG images, sitemap and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL in Vercel if you move to a custom domain.
 */
export const baseURL: string =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://fauwaaz-portfolio.vercel.app";

/** Toggle whole routes. A disabled route is hidden from nav and returns 404. */
export const routes: RoutesConfig = {
  "/": true,
  "/about": true,
  "/work": true,
};

export const display: DisplayConfig = {
  location: true,
  time: true,
  themeSwitcher: true,
};

export const schema: SchemaConfig = {
  logo: "",
  type: "Person",
  name: "Fauwaaz Shaikh",
  description:
    "Web developer in Kolkata building responsive websites and e-commerce platforms with React, Next.js and WordPress.",
  email: "fauwaazshaikh999@gmail.com",
};
