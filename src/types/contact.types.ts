export type ContactField = "name" | "email" | "message";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  /** Honeypot. Real users never see or fill this. */
  company?: string;
  /** Milliseconds between the form mounting and submit, measured client-side. */
  elapsedMs?: number;
};

export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export type ContactResponse =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: ContactFieldErrors };
