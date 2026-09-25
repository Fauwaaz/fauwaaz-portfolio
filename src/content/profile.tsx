import { Line, Row, Text } from "@once-ui-system/core";
import type {
  AboutContent,
  ContactContent,
  HomeContent,
  Person,
  SocialLink,
  WorkContent,
} from "@/types";

/* -------------------------------------------------------------------------- */
/*  Single source of truth for every piece of personal copy on the site.      */
/* -------------------------------------------------------------------------- */

export const person: Person = {
  firstName: "Fauwaaz",
  lastName: "Shaikh",
  name: "Fauwaaz Shaikh",
  role: "Web Developer",
  avatar: "/images/avatar.jpg",
  email: "fauwaazshaikh999@gmail.com",
  location: "Asia/Kolkata",
  locationLabel: "Kolkata, India",
  languages: ["English"],
};

export const social: SocialLink[] = [
  { name: "GitHub", icon: "github", link: "https://github.com/fauwaaz", essential: true },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/fauwaaz-shaikh-mca-617a75200",
    essential: true,
  },
  { name: "Email", icon: "email", link: `mailto:${person.email}`, essential: true },
];

const ogImage = (title: string) => `/api/og/generate?title=${encodeURIComponent(title)}`;

export const home: HomeContent = {
  path: "/",
  label: "Home",
  title: `${person.name} – ${person.role}`,
  description: `Portfolio of ${person.name}, a ${person.locationLabel}-based web developer building responsive websites and e-commerce platforms with React, Next.js and WordPress.`,
  image: ogImage(`${person.name} – ${person.role}`),
  headline: <>Building bridges between design and code</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">DBound Media</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/dbound-media",
  },
  subline: (
    <>
      I'm Fauwaaz, a Web Developer at{" "}
      <Text as="span" size="xl" weight="strong">
        Sparkcloud
      </Text>
      , where I build websites and online stores <br /> for brands in India, the UAE and the US.
    </>
  ),
};

export const about: AboutContent = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.locationLabel}`,
  tableOfContent: { display: true, subItems: false },
  avatar: { display: true },
  cta: { display: true, label: "Get in touch", link: "/#contact" },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        <Text as="p">
          Fauwaaz is a {person.locationLabel}-based web developer with 5+ years of professional
          experience building responsive web applications and e-commerce platforms using React.js,
          Next.js, JavaScript, WordPress and modern frontend technologies.
        </Text>
        <Text as="p">
          His work spans responsive UI development, frontend architecture, performance
          optimization, deployment, CMS and e-commerce integrations, troubleshooting, SEO and
          production maintenance. He holds a Master of Computer Applications with an 8.68/10 CGPA
          and an A Grade.
        </Text>
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Singh Ventures / Sparkcloud",
        timeframe: "May 2025 – Present",
        role: "Web Developer, Kolkata",
        achievements: [
          <>Develop and maintain responsive websites and e-commerce platforms using modern JavaScript frameworks.</>,
          <>Contribute to application architecture, debugging, deployment and production release processes.</>,
          <>Manage server environments, releases and website performance optimization.</>,
        ],
        images: [],
      },
      {
        company: "GoRanggo Solutions",
        timeframe: "Mar 2025 – May 2025",
        role: "Web Developer, Kolkata",
        achievements: [
          <>Developed and customized SEO-optimized WordPress websites with a focus on performance and responsive design.</>,
          <>Handled ongoing website maintenance and technical improvements.</>,
        ],
        images: [],
      },
      {
        company: "PTS Systems & Solutions",
        timeframe: "Apr 2023 – Feb 2025",
        role: "Web Developer, Mumbai",
        achievements: [
          <>Built and maintained dynamic, responsive websites using WordPress and modern JavaScript frameworks.</>,
          <>Managed deployment, troubleshooting and ongoing production maintenance.</>,
          <>Ensured responsive design and a consistent cross-platform user experience.</>,
        ],
        images: [],
      },
      {
        company: "Curaksha Enterprizes",
        timeframe: "Oct 2022 – Mar 2023",
        role: "Web Developer, Mumbai",
        achievements: [
          <>Developed responsive web solutions using HTML, CSS, JavaScript, Three.js and Django.</>,
          <>Delivered interactive and scalable web experiences across devices.</>,
        ],
        images: [],
      },
      {
        company: "Vedic Tree Kids Learning App",
        timeframe: "Oct 2020 – Oct 2022",
        role: "Motion Graphic Designer, Mumbai",
        achievements: [
          <>Created motion graphics, 2D animations and marketing video content using Adobe After Effects, Illustrator, Photoshop and Adobe Express.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "Master of Computer Applications (MCA)",
        description: <>School of Online Education, Pune, 2024 – 2026. CGPA 8.68/10, A Grade.</>,
      },
      {
        name: "B.Sc. Information Technology",
        description: <>University of Mumbai, 2017 – 2020.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Frontend",
        description: <>Responsive, component-driven interfaces in React.js and Next.js, styled with Tailwind CSS, with Three.js for interactive 3D.</>,
        tags: [
          { name: "JavaScript", icon: "javascript" },
          { name: "HTML5", icon: "html" },
          { name: "CSS3", icon: "css" },
          { name: "React.js", icon: "react" },
          { name: "Next.js", icon: "nextjs" },
          { name: "Tailwind CSS", icon: "tailwind" },
          { name: "Three.js", icon: "threejs" },
        ],
      },
      {
        title: "CMS & E-commerce",
        description: <>WordPress and WooCommerce builds, plus headless CMS setups behind modern frontends.</>,
        tags: [
          { name: "WordPress", icon: "wordpress" },
          { name: "WooCommerce", icon: "woocommerce" },
          { name: "Headless CMS", icon: "document" },
        ],
      },
      {
        title: "APIs & Integration",
        description: <>Connecting frontends to data and third-party services over REST and GraphQL.</>,
        tags: [
          { name: "REST APIs", icon: "api" },
          { name: "GraphQL", icon: "graphql" },
        ],
      },
      {
        title: "Deployment & Servers",
        description: <>Shipping and running sites in production, from edge platforms to managed servers.</>,
        tags: [
          { name: "Vercel", icon: "vercel" },
          { name: "Cloudflare", icon: "cloudflare" },
          { name: "Server Management", icon: "server" },
        ],
      },
      {
        title: "Analytics & SEO",
        description: <>Instrumenting sites for tracking and search visibility.</>,
        tags: [
          { name: "Google Analytics", icon: "analytics" },
          { name: "Google Tag Manager", icon: "tagmanager" },
          { name: "Google Search Console", icon: "searchconsole" },
          { name: "Meta Pixel", icon: "meta" },
          { name: "Microsoft Clarity", icon: "chart" },
        ],
      },
      {
        title: "Design & Creative",
        description: <>Two years as a motion graphic designer before moving into development, so designs go from Figma to production without a hand-off gap.</>,
        tags: [
          { name: "Figma", icon: "figma" },
          { name: "Photoshop", icon: "photoshop" },
          { name: "Illustrator", icon: "illustrator" },
          { name: "After Effects", icon: "aftereffects" },
        ],
      },
    ],
  },
};

export const work: WorkContent = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Business websites and e-commerce stores built by ${person.name}`,
  // Add a project: drop a new .mdx file into src/content/projects
};

export const contact: ContactContent = {
  display: true,
  id: "contact",
  title: <>Work with {person.firstName}</>,
  description: <>Have a project, role or question? Send a message and I'll reply by email.</>,
};
