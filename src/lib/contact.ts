import type { ContactFieldErrors, ContactPayload } from "@/types";

/** Shared by the form (instant feedback) and the API route (the actual gate). */
export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  message: { min: 10, max: 5000 },
  /** Submissions faster than this are almost certainly bots. */
  minFillTimeMs: 3000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type ContactValidation =
  | { ok: true; data: Required<Pick<ContactPayload, "name" | "email" | "message">>; isSpam: boolean }
  | { ok: false; fieldErrors: ContactFieldErrors };

export function validateContact(input: unknown): ContactValidation {
  const body = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  const fieldErrors: ContactFieldErrors = {};
  const { name: n, email: e, message: m } = CONTACT_LIMITS;

  if (name.length < n.min) fieldErrors.name = "Enter your name.";
  else if (name.length > n.max) fieldErrors.name = `Keep your name under ${n.max} characters.`;

  if (!email) fieldErrors.email = "Enter your email so I can reply.";
  else if (email.length > e.max || !EMAIL_PATTERN.test(email))
    fieldErrors.email = "Enter a valid email address, like name@example.com.";

  if (message.length < m.min) fieldErrors.message = `Write at least ${m.min} characters.`;
  else if (message.length > m.max)
    fieldErrors.message = `Keep your message under ${m.max} characters.`;

  if (Object.keys(fieldErrors).length > 0) return { ok: false, fieldErrors };

  const honeypotFilled = typeof body.company === "string" && body.company.length > 0;
  const tooFast =
    typeof body.elapsedMs === "number" && body.elapsedMs < CONTACT_LIMITS.minFillTimeMs;

  return { ok: true, data: { name, email, message }, isSpam: honeypotFilled || tooFast };
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
