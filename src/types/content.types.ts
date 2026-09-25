import type { ReactNode } from "react";
import type { zones } from "tzdata";
import type { IconName } from "@/config/icons";

/** IANA time zone string, e.g. "Asia/Kolkata". */
export type IANATimeZone = Extract<keyof typeof zones, string>;

export type Person = {
  firstName: string;
  lastName: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  /** IANA time zone — drives the live clock in the header. */
  location: IANATimeZone;
  /** Human-readable location shown on the About page. */
  locationLabel: string;
  languages?: string[];
};

export type SocialLink = {
  name: string;
  icon: IconName;
  link: string;
  /** Shown as a button on the About page. */
  essential?: boolean;
};

export type MediaImage = {
  src: string;
  alt: string;
  /** Width ratio, in rem units of the thumbnail row. */
  width: number;
  height: number;
};

export interface BasePageConfig {
  path: string;
  label: string;
  title: string;
  description: string;
  image?: string;
}

export interface HomeContent extends BasePageConfig {
  image: string;
  headline: ReactNode;
  featured: { display: boolean; title: ReactNode; href: string };
  subline: ReactNode;
}

export type Experience = {
  company: string;
  timeframe: string;
  role: string;
  location?: string;
  achievements: ReactNode[];
  images?: MediaImage[];
};

export type Institution = { name: string; description: ReactNode };

export type Skill = {
  title: string;
  description?: ReactNode;
  tags?: Array<{ name: string; icon?: IconName }>;
  images?: MediaImage[];
};

export interface AboutContent extends BasePageConfig {
  tableOfContent: { display: boolean; subItems: boolean };
  avatar: { display: boolean };
  /** The pill above the name. Links anywhere: a booking page or the contact section. */
  cta: { display: boolean; label: string; link: string };
  intro: { display: boolean; title: string; description: ReactNode };
  work: { display: boolean; title: string; experiences: Experience[] };
  studies: { display: boolean; title: string; institutions: Institution[] };
  technical: { display: boolean; title: string; skills: Skill[] };
}

export interface WorkContent extends BasePageConfig {}

export type ContactContent = {
  display: boolean;
  id: string;
  title: ReactNode;
  description: ReactNode;
};
