import { dataStyle, style } from "@/config";

/**
 * Runs in <head> before hydration to set Once UI's data-* attributes, so the page
 * paints with the correct theme and there is no light/dark flash.
 * Logic is unchanged from the original template.
 */
export function getThemeInitScript(): string {
  const config = {
    brand: style.brand,
    accent: style.accent,
    neutral: style.neutral,
    solid: style.solid,
    "solid-style": style.solidStyle,
    border: style.border,
    surface: style.surface,
    transition: style.transition,
    scaling: style.scaling,
    "viz-style": dataStyle.variant,
  };

  return `
(function() {
  try {
    const root = document.documentElement;
    const config = ${JSON.stringify(config)};
    Object.entries(config).forEach(([key, value]) => root.setAttribute('data-' + key, value));
    const resolveTheme = (v) => (!v || v === 'system')
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : v;
    root.setAttribute('data-theme', resolveTheme(localStorage.getItem('data-theme')));
    Object.keys(config).forEach((key) => {
      const value = localStorage.getItem('data-' + key);
      if (value) root.setAttribute('data-' + key, value);
    });
  } catch (e) {
    console.error('Failed to initialize theme:', e);
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();`;
}
