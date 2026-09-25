import { Column, Heading, Text } from "@once-ui-system/core";
import { contactEffects } from "@/config";
import { contact } from "@/content/profile";
import { EffectsBackground } from "@/components/ui/EffectsBackground";
import { ContactForm } from "./ContactForm";

/**
 * Uses the exact card treatment of the template's newsletter block
 * (surface, border, radius and cursor-tracked gradient), so it sits in the design natively.
 */
export function ContactSection() {
  if (!contact.display) return null;

  return (
    <Column
      as="section"
      id={contact.id}
      aria-labelledby={`${contact.id}-title`}
      overflow="hidden"
      fillWidth
      padding="xl"
      radius="l"
      marginBottom="m"
      horizontal="center"
      align="center"
      background="surface"
      border="neutral-alpha-weak"
      style={{ scrollMarginTop: "var(--static-space-80)" }}
    >
      <EffectsBackground effects={contactEffects} top="0" position="absolute" />
      <Column maxWidth="xs" horizontal="center">
        <Heading as="h2" id={`${contact.id}-title`} marginBottom="s" variant="display-strong-xs">
          {contact.title}
        </Heading>
        <Text wrap="balance" marginBottom="l" variant="body-default-l" onBackground="neutral-weak">
          {contact.description}
        </Text>
      </Column>
      <ContactForm />
    </Column>
  );
}
