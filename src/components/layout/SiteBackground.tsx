import { RevealFx } from "@once-ui-system/core";
import { pageEffects } from "@/config";
import { EffectsBackground } from "@/components/ui/EffectsBackground";

export function SiteBackground() {
  return (
    <RevealFx fill position="absolute">
      <EffectsBackground effects={pageEffects} />
    </RevealFx>
  );
}
