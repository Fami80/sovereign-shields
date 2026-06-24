import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { CheckCircle } from "lucide-react";

type FieldName = "name" | "email" | "enquiry" | "message";
type Errors = Partial<Record<FieldName, string>>;
const ERROR_COLOR = "#E57373";
const WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbyYH3NPvWxVylQeWv09x59TrHUiZPNtUgHhUaoHe-8vYMfXlLFnObwhbN1Rb-B2Piip/exec";
const WHATSAPP_HREF = `https://wa.me/971547736565?text=${encodeURIComponent(
  "Hi Kaoutar, I'd like to book a settlement review — AED 999."
)}`;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book a UAE Settlement Review | UAEworkrights" },
      { name: "description", content: "Book a UAE settlement review or employer compliance audit. WhatsApp or contact form. Response within 1 UAE business day." },
      { property: "og:title", content: "Book a UAE Settlement Review | UAEworkrights" },
      { property: "og:description", content: "Book a UAE settlement review or employer compliance audit. WhatsApp or contact form. Response within 1 UAE business day." },
      { property: "og:url", content: "https://uaeworkrights.com/contact" },
    ],
    links: [
      { rel: "canonical", href: "https://uaeworkrights.com/contact" },
    ],
  }),
  validateSearch: (
    s: Record<string, unknown>,
  ): { type?: string; card?: string; message?: string } => ({
    type: typeof s.type === "string" ? s.type : undefined,
    card: typeof s.card === "string" ? s.card : undefined,
    message: typeof s.message === "string" ? s.message : undefined,
  }),
  component: ContactPage,
});

function ContactPage() {
  const { type, card, message } = Route.useSearch();
  const initialEnquiry =
    type === "audit"
      ? "audit"
      : type === "settlement"
      ? "settlement"
      : type === "cross-border"
      ? "cross-border"
      : type === "kb"
      ? "kb"
      : "";
  const kbCardClicked = card ?? "";
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    enquiry: initialEnquiry,
    willingness: "",
    message: message ?? "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const refs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    enquiry: useRef<HTMLSelectElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.name.trim() || form.name.length > 80) e.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.enquiry) e.enquiry = "Select an enquiry type.";
    if (!form.message.trim() || form.message.length > 1000) e.message = "Message is required (max 1000 chars).";
    return e;
  };

  const handleSubmit = async () => {
    setSubmitError(false);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const order: FieldName[] = ["name", "email", "enquiry", "message"];
      const first = order.find((k) => e[k]);
      if (first) refs[first].current?.focus();
      return;
    }
    setSubmitting(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          enquiryType: form.enquiry,
          kbCardClicked,
          willingnessToPay: form.willingness,
          message: form.message,
        }),
      });
      setSubmitted(true);
      setForm({ name: "", email: "", enquiry: "", willingness: "", message: "" });
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const fieldStyle = (hasError: boolean): React.CSSProperties => ({
    backgroundColor: "rgba(212,168,130,0.06)",
    border: "1px solid rgba(212,168,130,0.2)",
    borderLeft: hasError ? `2px solid ${ERROR_COLOR}` : "1px solid rgba(212,168,130,0.2)",
    color: "var(--color-sand-light)",
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-burg-deep)" }}>
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-24">
        <div className="text-center">
          <h1
            className="font-display"
            style={{
              fontSize: 48,
              color: "var(--color-sand-light)",
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Get in touch
          </h1>
          <p
            className="mt-4 font-sans"
            style={{
              fontSize: 18,
              fontWeight: 300,
              color: "rgba(237,216,184,0.55)",
            }}
          >
            For a settlement review, a compliance question, or to discuss a complex case.
          </p>
        </div>

        <div
          className="mt-12"
          style={{
            backgroundColor: "var(--color-burg-mid)",
            border: "1px solid rgba(212,168,130,0.15)",
            borderRadius: 16,
            padding: 40,
          }}
        >
          {submitted ? (
            <div className="flex flex-col items-center py-10 text-center">
              <CheckCircle className="h-10 w-10" style={{ color: "#81C784" }} />
              <p
                className="mt-4 flex items-center gap-2 font-sans text-base font-semibold"
                style={{ color: "var(--color-sand-light)" }}
              >
                <CheckCircle size={20} style={{ color: "#81C784" }} aria-hidden />
                Received.
              </p>
              <p
                className="mt-2 font-sans text-sm"
                style={{ color: "rgba(237,216,184,0.55)" }}
              >
                You'll hear from us within 1 UAE business day.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <Field label="Name" error={errors.name}>
                <input
                  ref={refs.name}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full rounded-xl px-4 py-3 text-base outline-none transition-colors focus-visible:!border-[var(--color-sand-warm)] focus-visible:shadow-[0_0_0_3px_rgba(212,168,130,0.2)] md:text-sm"
                  style={fieldStyle(!!errors.name)}
                />
              </Field>

              <Field label="Email" error={errors.email}>
                <input
                  ref={refs.email}
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@company.ae"
                  className="w-full rounded-xl px-4 py-3 text-base outline-none transition-colors focus-visible:!border-[var(--color-sand-warm)] focus-visible:shadow-[0_0_0_3px_rgba(212,168,130,0.2)] md:text-sm"
                  style={fieldStyle(!!errors.email)}
                />
              </Field>

              <Field label="Enquiry type" error={errors.enquiry}>
                <select
                  ref={refs.enquiry}
                  value={form.enquiry}
                  onChange={(e) => setForm({ ...form, enquiry: e.target.value })}
                  className="w-full appearance-none rounded-xl px-4 py-3 text-base outline-none transition-colors focus-visible:!border-[var(--color-sand-warm)] focus-visible:shadow-[0_0_0_3px_rgba(212,168,130,0.2)] md:text-sm"
                  style={{
                    ...fieldStyle(!!errors.enquiry),
                    color: form.enquiry ? "var(--color-sand-light)" : "rgba(237,216,184,0.55)",
                  }}
                >
                  <option value="" style={{ backgroundColor: "var(--color-burg-deep)", color: "var(--color-sand-light)" }}>
                    Select…
                  </option>
                  <option value="settlement" style={{ backgroundColor: "var(--color-burg-deep)", color: "var(--color-sand-light)" }}>
                    Settlement Review
                  </option>
                  <option value="audit" style={{ backgroundColor: "var(--color-burg-deep)", color: "var(--color-sand-light)" }}>
                    Employer Compliance Audit
                  </option>
                  <option value="general" style={{ backgroundColor: "var(--color-burg-deep)", color: "var(--color-sand-light)" }}>
                    General Question
                  </option>
                  <option value="cross-border" style={{ backgroundColor: "var(--color-burg-deep)", color: "var(--color-sand-light)" }}>
                    Complex cross-border case
                  </option>
                  <option value="kb" style={{ backgroundColor: "var(--color-burg-deep)", color: "var(--color-sand-light)" }}>
                    Knowledge Base interest
                  </option>
                </select>
              </Field>

              <Field
                label="Would you pay for Knowledge Base access?"
                helper="The Knowledge Base will be AED 199 for 30-day access."
              >
                <select
                  value={form.willingness}
                  onChange={(e) => setForm({ ...form, willingness: e.target.value })}
                  className="w-full appearance-none rounded-xl px-4 py-3 text-base outline-none transition-colors focus-visible:!border-[var(--color-sand-warm)] focus-visible:shadow-[0_0_0_3px_rgba(212,168,130,0.2)] md:text-sm"
                  style={{
                    ...fieldStyle(false),
                    color: form.willingness ? "var(--color-sand-light)" : "rgba(237,216,184,0.3)",
                  }}
                >
                  <option value="" style={{ backgroundColor: "var(--color-burg-deep)", color: "var(--color-sand-light)" }}>
                    Select… (optional)
                  </option>
                  <option value="yes" style={{ backgroundColor: "var(--color-burg-deep)", color: "var(--color-sand-light)" }}>
                    Yes — ready when it launches
                  </option>
                  <option value="maybe" style={{ backgroundColor: "var(--color-burg-deep)", color: "var(--color-sand-light)" }}>
                    Maybe — depends what's inside
                  </option>
                  <option value="browsing" style={{ backgroundColor: "var(--color-burg-deep)", color: "var(--color-sand-light)" }}>
                    Just browsing for now
                  </option>
                </select>
              </Field>

              <Field label="Message" error={errors.message}>
                <textarea
                  ref={refs.message}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  maxLength={1000}
                  placeholder="Briefly describe your matter…"
                  className="w-full resize-none rounded-xl px-4 py-3 text-base outline-none transition-colors focus-visible:!border-[var(--color-sand-warm)] focus-visible:shadow-[0_0_0_3px_rgba(212,168,130,0.2)] md:text-sm"
                  style={fieldStyle(!!errors.message)}
                />
              </Field>


              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="mt-2 w-full rounded-full py-3.5 font-sans text-sm font-medium motion-safe:transition-transform motion-safe:duration-150 motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.97] focus-visible:[outline:2px_solid_var(--color-burg-deep)] focus-visible:[outline-offset:2px] disabled:opacity-60"
                style={{ backgroundColor: "var(--color-sand-warm)", color: "var(--color-burg-deep)" }}
              >
                {submitting ? "Sending…" : "Send →"}
              </button>

              {submitError && (
                <p
                  role="alert"
                  className="text-center font-sans text-sm"
                  style={{ color: ERROR_COLOR }}
                >
                  Something went wrong.{" "}
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "var(--color-sand-warm)", textDecoration: "underline" }}
                  >
                    Please WhatsApp us instead.
                  </a>
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          <ContactCard
            icon={<WhatsAppIcon />}
            title="WhatsApp"
            body="Prefer WhatsApp? Message us directly."
            buttonText="Open WhatsApp →"
            buttonHref={WHATSAPP_HREF}
          />
          <ContactCard
            icon={<InstagramIcon />}
            title="Instagram"
            body="Find us on Instagram @uaeworkrights."
            buttonText="Follow @uaeworkrights →"
            buttonHref="https://instagram.com/uaeworkrights"
          />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  helper,
  error,
  children,
}: {
  label: string;
  helper?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span
        className="mb-2 block font-sans text-xs font-medium uppercase tracking-[0.16em]"
        style={{ color: "rgba(237,216,184,0.55)" }}
      >
        {label}
      </span>
      {helper && (
        <span
          className="-mt-1 mb-2 block font-sans text-xs"
          style={{ color: "rgba(237,216,184,0.7)" }}
        >
          {helper}
        </span>
      )}
      {children}
      {error && (
        <span role="alert" className="mt-1.5 block font-sans text-xs" style={{ color: ERROR_COLOR }}>
          {error}
        </span>
      )}
    </label>
  );
}

function ContactCard({
  icon,
  title,
  body,
  buttonText,
  buttonHref,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  buttonText: string;
  buttonHref: string;
}) {
  return (
    <div
      style={{
        backgroundColor: "var(--color-burg-mid)",
        border: "1px solid rgba(212,168,130,0.15)",
        borderRadius: 16,
        padding: 32,
      }}
    >
      <div className="flex items-center gap-3">
        <div style={{ color: "var(--color-sand-warm)" }}>{icon}</div>
        <span
          className="font-sans text-base font-medium"
          style={{ color: "var(--color-sand-light)" }}
        >
          {title}
        </span>
      </div>
      <p
        className="mt-3 font-sans text-sm"
        style={{ color: "rgba(237,216,184,0.55)" }}
      >
        {body}
      </p>
      <a
        href={buttonHref}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-block font-sans text-sm font-medium transition-colors hover:opacity-80 focus-visible:underline focus-visible:decoration-[2px] focus-visible:decoration-[var(--color-sand-warm)]"
        style={{ color: "var(--color-sand-warm)" }}
      >
        {buttonText}
      </a>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
