import { ImageResponse } from "next/og";
import { baseURL } from "@/config";
import { person } from "@/content/profile";

export const runtime = "nodejs";

async function loadGoogleFont(font: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${font}`)).text();
    const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);
    if (!resource) return null;
    const response = await fetch(resource[1]);
    return response.ok ? await response.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const title = (new URL(request.url).searchParams.get("title") || "Portfolio").slice(0, 120);
  const font = await loadGoogleFont("Geist:wght@400");

  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", padding: "6rem", background: "#151515" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "4rem",
          fontStyle: "normal",
          color: "white",
        }}
      >
        <span
          style={{
            padding: "1rem",
            fontSize: "6rem",
            lineHeight: "8rem",
            letterSpacing: "-0.05em",
            whiteSpace: "wrap",
            textWrap: "balance",
            overflow: "hidden",
          }}
        >
          {title}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "5rem" }}>
          {/* biome-ignore lint/a11y/useAltText: rendered to a PNG, not the DOM */}
          <img
            src={baseURL + person.avatar}
            style={{ width: "12rem", height: "12rem", objectFit: "cover", borderRadius: "100%" }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <span style={{ fontSize: "4.5rem", lineHeight: "4.5rem", whiteSpace: "pre-wrap", textWrap: "balance" }}>
              {person.name}
            </span>
            <span
              style={{
                fontSize: "2.5rem",
                lineHeight: "2.5rem",
                whiteSpace: "pre-wrap",
                textWrap: "balance",
                opacity: "0.6",
              }}
            >
              {person.role}
            </span>
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1280,
      height: 720,
      fonts: font ? [{ name: "Geist", data: font, style: "normal" }] : undefined,
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable" },
    },
  );
}
