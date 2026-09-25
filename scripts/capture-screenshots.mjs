#!/usr/bin/env node
/**
 * Captures project screenshots and writes their paths into each case study's frontmatter.
 *
 *   npm run screenshots                     # every project
 *   npm run screenshots -- usifa sparkcloud # only these slugs
 *
 * First run only: npm run screenshots:install  (downloads Chromium for Playwright)
 * Env: SCREENSHOT_CONFIG=path/to/config.mjs, CHROMIUM_PATH=/path/to/chrome (optional)
 */
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import matter from "gray-matter";
import { chromium } from "playwright";

const ROOT = process.cwd();
const configPath = path.resolve(ROOT, process.env.SCREENSHOT_CONFIG ?? "scripts/screenshots.config.mjs");
const config = (await import(pathToFileURL(configPath).href)).default;
const onlySlugs = process.argv.slice(2).filter((arg) => !arg.startsWith("-"));

/** Popups, cookie banners and chat bubbles that would otherwise cover the screenshot. */
const HIDE_SELECTORS = [
  ".elementor-popup-modal",
  ".dialog-type-lightbox",
  ".ekit-popup-modal",
  ".ekit-template-popup",
  "#cookie-notice",
  ".cky-consent-container",
  ".cmplz-cookiebanner",
  "#CybotCookiebotDialog",
  "[id*='cookie-banner' i]",
  "[class*='cookie-banner' i]",
  "#chat-widget-container",
  "iframe[title*='chat' i]",
  ".wa__btn_popup",
  "[class*='whatsapp-float' i]",
];

const SKIP_DISCOVERED = /\/(cart|checkout|my-account|account|login|auth|wishlist|track-order|wp-admin)\b/i;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function preparePage(page, extraHide = []) {
  await page.addStyleTag({
    content: `
      ${[...HIDE_SELECTORS, ...extraHide].join(",\n")} { display: none !important; }
      .elementor-invisible { visibility: visible !important; }
      html { scroll-behavior: auto !important; }
    `,
  }).catch(() => {});
}

/** Scroll to the bottom in steps so lazy images and scroll animations fire, then return to top. */
async function triggerLazyContent(page) {
  await page.evaluate(async () => {
    const step = Math.max(400, Math.floor(window.innerHeight * 0.8));
    const limit = Math.min(document.body.scrollHeight, 20000);
    for (let y = 0; y < limit; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  }).catch(() => {});
}

async function discoverLinks(page, baseUrl, max, taken) {
  const origin = new URL(baseUrl).origin;
  const hrefs = await page.$$eval("header a[href], nav a[href]", (anchors) =>
    anchors.map((a) => a.href),
  ).catch(() => []);

  const seen = new Set(taken);
  const found = [];
  for (const href of hrefs) {
    let url;
    try { url = new URL(href); } catch { continue; }
    if (url.origin !== origin || SKIP_DISCOVERED.test(url.pathname)) continue;
    const key = url.pathname.replace(/\/$/, "") || "/";
    if (seen.has(key)) continue;
    seen.add(key);
    found.push(url.pathname + url.search);
    if (found.length >= max) break;
  }
  return found;
}

function nameFor(index, pagePath) {
  const slug = pagePath.replace(/[?#].*$/, "").split("/").filter(Boolean).pop() || "home";
  return `${String(index).padStart(2, "0")}-${slug.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

async function capture(page, project, target, outDir) {
  const url = new URL(target.path, project.baseUrl).href;
  const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });
  if (response && response.status() >= 400) throw new Error(`HTTP ${response.status()}`);

  await page.waitForLoadState("load", { timeout: 20_000 }).catch(() => {});
  await preparePage(page, project.hide);
  await triggerLazyContent(page);
  await page.keyboard.press("Escape").catch(() => {});
  await preparePage(page, project.hide); // popups can mount late
  await sleep(1500);

  const file = path.join(outDir, `${target.name}.jpg`);
  await page.screenshot({ path: file, type: "jpeg", quality: config.jpegQuality ?? 80 });
  return file;
}

async function updateFrontmatter(slug, imagePaths) {
  const file = path.resolve(ROOT, config.contentDir, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(file, "utf-8");
    const parsed = matter(raw);
    parsed.data.images = imagePaths;
    await fs.writeFile(file, matter.stringify(parsed.content, parsed.data));
    return true;
  } catch (error) {
    console.warn(`  ! could not update ${path.relative(ROOT, file)}: ${error.message}`);
    return false;
  }
}

async function main() {
  const projects = config.projects.filter((p) => !onlySlugs.length || onlySlugs.includes(p.slug));
  if (!projects.length) {
    console.error(`No projects match: ${onlySlugs.join(", ")}`);
    process.exit(1);
  }

  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  const context = await browser.newContext({
    viewport: config.viewport,
    deviceScaleFactor: config.deviceScaleFactor ?? 1,
    colorScheme: "light",
    locale: "en-IN",
  });

  let failures = 0;

  for (const project of projects) {
    console.log(`\n${project.slug}  (${project.baseUrl})`);
    const outDir = path.resolve(ROOT, config.outputDir, project.slug);
    await fs.mkdir(outDir, { recursive: true });

    const page = await context.newPage();
    const targets = [...project.pages];
    const captured = [];

    for (let i = 0; i < targets.length; i++) {
      const target = targets[i];
      try {
        const file = await capture(page, project, target, outDir);
        captured.push(`/${path.relative(path.join(ROOT, "public"), file).split(path.sep).join("/")}`);
        console.log(`  ✓ ${target.name}  ${target.path}`);

        if (i === 0 && project.discover) {
          const taken = targets.map((t) => t.path.replace(/\/$/, "") || "/");
          const extra = await discoverLinks(page, project.baseUrl, project.discover.max, taken);
          // Discovered pages are numbered after the configured ones: 02-about, 03-services…
          for (const extraPath of extra) {
            targets.push({ name: nameFor(targets.length + 1, extraPath), path: extraPath });
          }
          if (extra.length) console.log(`  + discovered ${extra.join(", ")}`);
        }
      } catch (error) {
        failures++;
        console.warn(`  ✗ ${target.name}  ${target.path}  ${error.message.split("\n")[0]}`);
      }
    }
    await page.close();

    if (captured.length) {
      const ok = await updateFrontmatter(project.slug, captured);
      if (ok) console.log(`  → ${captured.length} images written to ${project.slug}.mdx`);
    } else {
      console.warn("  ! nothing captured; frontmatter left unchanged");
    }
  }

  await browser.close();
  console.log(failures ? `\nDone with ${failures} failed page(s). Re-run with those slugs.` : "\nDone.");
  process.exit(failures ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
