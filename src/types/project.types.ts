export type TeamMember = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

export type ProjectCategory = "business" | "ecommerce";

export type ProjectMetadata = {
  title: string;
  summary: string;
  category: ProjectCategory;
  /** Featured projects appear on the home page. */
  featured: boolean;
  /** Lower comes first. Featured projects always sort before the rest. */
  order: number;
  client?: string;
  location?: string;
  stack: string[];
  /** Optional launch date. Only shown when set. */
  publishedAt?: string;
  image?: string;
  images: string[];
  team: TeamMember[];
  link?: string;
};

export type Project = {
  slug: string;
  metadata: ProjectMetadata;
  content: string;
};
