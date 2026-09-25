import { Geist, Geist_Mono } from "next/font/google";

// Server-only: imported by the root layout. Keeping fonts out of the shared config
// stops next/font from being pulled into client component graphs.
const heading = Geist({ variable: "--font-heading", subsets: ["latin"], display: "swap" });
const body = Geist({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const label = Geist({ variable: "--font-label", subsets: ["latin"], display: "swap" });
const code = Geist_Mono({ variable: "--font-code", subsets: ["latin"], display: "swap" });

export const fontVariables = [heading, body, label, code].map((font) => font.variable);
