import { Row, ToggleButton } from "@once-ui-system/core";
import type { IconName } from "@/config";

type NavLinkProps = { href: string; icon: IconName; label: string; selected: boolean };

/** Icon + label on desktop, icon only below the `s` breakpoint. */
export function NavLink({ href, icon, label, selected }: NavLinkProps) {
  return (
    <>
      <Row s={{ hide: true }}>
        <ToggleButton prefixIcon={icon} href={href} label={label} selected={selected} />
      </Row>
      <Row hide s={{ hide: false }}>
        <ToggleButton prefixIcon={icon} href={href} selected={selected} aria-label={label} />
      </Row>
    </>
  );
}
