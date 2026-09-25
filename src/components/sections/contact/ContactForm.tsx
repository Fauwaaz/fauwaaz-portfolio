"use client";

import { Button, Column, Input, Text, Textarea, useToast } from "@once-ui-system/core";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { CONTACT_LIMITS, validateContact } from "@/lib/contact";
import type { ContactField, ContactFieldErrors, ContactResponse } from "@/types";

type Status = "idle" | "sending" | "sent" | "error";

const EMPTY = { name: "", email: "", message: "" };

export function ContactForm() {
  const { addToast } = useToast();
  const [values, setValues] = useState(EMPTY);
  const [honeypot, setHoneypot] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const update = (field: ContactField) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear a field's error as soon as the person edits it.
    if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const payload = { ...values, company: honeypot, elapsedMs: Date.now() - mountedAt.current };

    const check = validateContact(payload);
    if (!check.ok) {
      setFieldErrors(check.fieldErrors);
      return;
    }

    setStatus("sending");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as ContactResponse | null;

      if (!response.ok || !result?.ok) {
        const error =
          result && !result.ok ? result.error : "Message not sent. Check your connection and try again.";
        if (result && !result.ok && result.fieldErrors) setFieldErrors(result.fieldErrors);
        throw new Error(error);
      }

      setStatus("sent");
      setStatusMessage("Message sent. I'll reply to the email you entered.");
      setValues(EMPTY);
      setFieldErrors({});
      addToast({ variant: "success", message: "Message sent." });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Message not sent. Please try again.";
      setStatus("error");
      setStatusMessage(message);
      addToast({ variant: "danger", message });
    }
  }

  const sending = status === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      <Column fillWidth maxWidth={24} gap="8">
        <Input
          id="contact-name"
          name="name"
          label="Name"
          autoComplete="name"
          value={values.name}
          maxLength={CONTACT_LIMITS.name.max}
          onChange={(e) => update("name")(e.target.value)}
          errorMessage={fieldErrors.name}
          disabled={sending}
          required
        />
        <Input
          id="contact-email"
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          value={values.email}
          maxLength={CONTACT_LIMITS.email.max}
          onChange={(e) => update("email")(e.target.value)}
          errorMessage={fieldErrors.email}
          disabled={sending}
          required
        />
        <Textarea
          id="contact-message"
          name="message"
          label="Message"
          lines={5}
          value={values.message}
          maxLength={CONTACT_LIMITS.message.max}
          onChange={(e) => update("message")(e.target.value)}
          errorMessage={fieldErrors.message}
          disabled={sending}
          required
        />

        {/* Honeypot: hidden from people and assistive tech, irresistible to form bots. */}
        <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
          <label htmlFor="contact-company">Company</label>
          <input
            id="contact-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <Button type="submit" size="m" fillWidth loading={sending} disabled={sending}>
          {sending ? "Sending…" : "Send message"}
        </Button>

        <Text
          role="status"
          aria-live="polite"
          variant="body-default-s"
          align="center"
          onBackground={status === "error" ? "danger-medium" : "success-medium"}
          style={{ minHeight: "1.5em" }}
        >
          {statusMessage}
        </Text>
      </Column>
    </form>
  );
}
