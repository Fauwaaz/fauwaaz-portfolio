import { NextResponse } from "next/server";
import { Resend } from "resend";
import { person } from "@/content/profile";
import { escapeHtml, validateContact } from "@/lib/contact";
import type { ContactResponse } from "@/types";

export const runtime = "nodejs";

/** Anything bigger than this is not a contact message. */
const MAX_BODY_BYTES = 16 * 1024;
const DEFAULT_FROM = "Portfolio Contact <onboarding@resend.dev>";

const reply = (body: ContactResponse, status: number) => NextResponse.json(body, { status });

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL || DEFAULT_FROM;

  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY or CONTACT_EMAIL is not set.");
    return reply(
      { ok: false, error: `The contact form is offline. Email ${person.email} directly instead.` },
      503,
    );
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) {
    return reply({ ok: false, error: "Message too large. Shorten it and send again." }, 413);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return reply({ ok: false, error: "Invalid request. Reload the page and try again." }, 400);
  }

  const result = validateContact(body);
  if (!result.ok) {
    return reply(
      { ok: false, error: "Some fields need fixing.", fieldErrors: result.fieldErrors },
      422,
    );
  }

  // Bots get a success response so they don't adapt; nothing is sent.
  if (result.isSpam) return reply({ ok: true }, 200);

  const { name, email, message } = result.data;
  const safeName = name.replace(/[\r\n]+/g, " ");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Portfolio enquiry from ${safeName}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.6;color:#1a1a1a">
          <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin:0 0 16px"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>
          <hr style="margin:24px 0;border:none;border-top:1px solid #ddd" />
          <p style="margin:0;font-size:12px;color:#666">Sent from the contact form on your portfolio. Reply to this email to answer ${escapeHtml(safeName)} directly.</p>
        </div>`,
    });

    if (error) {
      console.error("[contact] Resend rejected the email:", error);
      return reply(
        { ok: false, error: `Message not sent. Try again, or email ${person.email} directly.` },
        502,
      );
    }

    return reply({ ok: true }, 200);
  } catch (error) {
    console.error("[contact] Unexpected error:", error);
    return reply(
      { ok: false, error: `Message not sent. Try again, or email ${person.email} directly.` },
      500,
    );
  }
}
