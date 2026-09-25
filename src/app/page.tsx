import { Column, RevealFx } from "@once-ui-system/core";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { Projects } from "@/components/sections/work/Projects";
import { PageSchema } from "@/components/ui/PageSchema";
import { home } from "@/content/profile";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: home.title,
  description: home.description,
  path: home.path,
  image: home.image,
});

export default function HomePage() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <PageSchema title={home.title} description={home.description} path={home.path} />
      <HomeHero />
      <RevealFx translateY="16" delay={0.6}>
        <Projects featured range={[1, 1]} />
      </RevealFx>
      <Projects featured range={[2]} />
      <ContactSection />
    </Column>
  );
}
