import type { IconType } from "react-icons";
import {
  HiArrowRight,
  HiArrowTopRightOnSquare,
  HiArrowUpRight,
  HiCalendarDays,
  HiEnvelope,
  HiOutlineDocument,
  HiOutlineGlobeAsiaAustralia,
  HiOutlineLink,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";
import { PiGridFourDuotone, PiHouseDuotone, PiUserCircleDuotone } from "react-icons/pi";
import {
  SiCloudflare,
  SiCss,
  SiFigma,
  SiGoogleanalytics,
  SiGooglesearchconsole,
  SiGoogletagmanager,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiMeta,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiThreedotjs,
  SiVercel,
  SiWoocommerce,
  SiWordpress,
} from "react-icons/si";
import {
  TbApi,
  TbBrandAdobeAfterEffect,
  TbBrandAdobeIllustrator,
  TbBrandAdobePhotoshop,
  TbChartBar,
  TbServer2,
} from "react-icons/tb";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

export const iconLibrary = {
  // UI
  arrowUpRight: HiArrowUpRight,
  arrowRight: HiArrowRight,
  arrowUpRightFromSquare: HiArrowTopRightOnSquare,
  email: HiEnvelope,
  globe: HiOutlineGlobeAsiaAustralia,
  person: PiUserCircleDuotone,
  grid: PiGridFourDuotone,
  home: PiHouseDuotone,
  openLink: HiOutlineLink,
  calendar: HiCalendarDays,
  document: HiOutlineDocument,
  rocket: HiOutlineRocketLaunch,
  // Social
  github: FaGithub,
  linkedin: FaLinkedin,
  // Skills
  javascript: SiJavascript,
  html: SiHtml5,
  css: SiCss,
  react: SiReact,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  threejs: SiThreedotjs,
  wordpress: SiWordpress,
  woocommerce: SiWoocommerce,
  api: TbApi,
  graphql: SiGraphql,
  vercel: SiVercel,
  cloudflare: SiCloudflare,
  server: TbServer2,
  analytics: SiGoogleanalytics,
  tagmanager: SiGoogletagmanager,
  searchconsole: SiGooglesearchconsole,
  meta: SiMeta,
  chart: TbChartBar,
  figma: SiFigma,
  photoshop: TbBrandAdobePhotoshop,
  illustrator: TbBrandAdobeIllustrator,
  aftereffects: TbBrandAdobeAfterEffect,
} satisfies Record<string, IconType>;

export type IconName = keyof typeof iconLibrary;
