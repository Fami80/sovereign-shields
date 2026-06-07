import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { CheckCircle } from "lucide-react";

type FieldName = "name" | "email" | "enquiry" | "message";
type Errors = Partial<Record<FieldName, string>>;
const ERROR_COLOR = "#E57373";
const errorBorder = (hasError: boolean) =>
  hasError ? "1px solid rgba(212,168,130,0.2)" : "1px solid rgba(212,168,130,0.2)";

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
  validateSearch: (s: Record<string, unknown>) => ({ type: typeof s.type === "string" ? s.type : undefined }),
  component: ContactPage,
});

function ContactPage() {
  const { type } = Route.useSearch();
  const initialEnquiry = type === "audit" ? "audit" : type === "settlement" ? "settlement" : type === "cross-border" ? "cross-border" : "";
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", enquiry: initialEnquiry, message: "" });
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

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSubmitted(true);
      return;
    }
    const order: FieldName[] = ["name", "email", "enquiry", "message"];
    const first = order.find((k) => e[k]);
    if (first) refs[first].current?.focus();
  };

  const fieldStyle = (hasError: boolean): React.CSSProperties => ({
    backgroundColor: "rgba(212,168,130,0.06)",
    border: "1px solid rgba(212,168,130,0.2)",
    borderLeft: hasError ? `2px solid ${ERROR_COLOR}` : "1px solid rgba(212,168,130,0.2)",
    color: "#EDD8B8",
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1E0A0E" }}>
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-24">
        <div className="text-center">
          <h1
            className="font-display"
            style={{
              fontSize: 48,
              color: "#EDD8B8",
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
            backgroundColor: "#2D1018",
            border: "1px solid rgba(212,168,130,0.15)",
            borderRadius: 16,
            padding: 40,
          }}
        >
          {submitted ? (
            <div className="flex flex-col items-center py-10 text-center">
              <CheckCircle2 className="h-10 w-10" style={{ color: "#D4A882" }} />
              <p
                className="mt-4 font-sans text-base font-semibold"
                style={{ color: "#EDD8B8" }}
              >
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
            <form onSubmit={onSubmit} className="space-y-5">
              <Field label="Name" error={errors.name}>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                  style={{
                    backgroundColor: "rgba(212,168,130,0.06)",
                    border: "1px solid rgba(212,168,130,0.2)",
                    color: "#EDD8B8",
                  }}
                />
              </Field>

              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@company.ae"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                  style={{
                    backgroundColor: "rgba(212,168,130,0.06)",
                    border: "1px solid rgba(212,168,130,0.2)",
                    color: "#EDD8B8",
                  }}
                />
              </Field>

              <Field label="Enquiry type" error={errors.enquiry}>
                <select
                  value={form.enquiry}
                  onChange={(e) => setForm({ ...form, enquiry: e.target.value })}
                  className="w-full appearance-none rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                  style={{
                    backgroundColor: "rgba(212,168,130,0.06)",
                    border: "1px solid rgba(212,168,130,0.2)",
                    color: form.enquiry ? "#EDD8B8" : "rgba(237,216,184,0.3)",
                  }}
                >
                  <option value="" style={{ backgroundColor: "#1E0A0E", color: "#EDD8B8" }}>
                    Select…
                  </option>
                  <option value="settlement" style={{ backgroundColor: "#1E0A0E", color: "#EDD8B8" }}>
                    Settlement Review
                  </option>
                  <option value="audit" style={{ backgroundColor: "#1E0A0E", color: "#EDD8B8" }}>
                    Employer Compliance Audit
                  </option>
                  <option value="general" style={{ backgroundColor: "#1E0A0E", color: "#EDD8B8" }}>
                    General Question
                  </option>
                  <option value="cross-border" style={{ backgroundColor: "#1E0A0E", color: "#EDD8B8" }}>
                    Complex cross-border case
                  </option>
                </select>
              </Field>

              <Field label="Message" error={errors.message}>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  maxLength={1000}
                  placeholder="Briefly describe your matter…"
                  className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                  style={{
                    backgroundColor: "rgba(212,168,130,0.06)",
                    border: "1px solid rgba(212,168,130,0.2)",
                    color: "#EDD8B8",
                  }}
                />
              </Field>

              <button
                type="submit"
                className="mt-2 w-full rounded-full py-3.5 font-sans text-sm font-medium transition-all duration-300 hover:scale-[1.01]"
                style={{ backgroundColor: "#D4A882", color: "#1E0A0E" }}
              >
                Send →
              </button>
            </form>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          <ContactCard
            icon={<WhatsAppIcon />}
            title="WhatsApp"
            body="Prefer WhatsApp? Message us directly."
            buttonText="Open WhatsApp →"
            buttonHref={`https://wa.me/[REAL NUMBER]?text=${encodeURIComponent(
              "Hi Kaoutar, I'd like to book a settlement review — AED 999."
            )}`}
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

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span
        className="mb-2 block font-sans text-xs font-medium uppercase tracking-[0.16em]"
        style={{ color: "rgba(237,216,184,0.55)" }}
      >
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-1.5 block font-sans text-xs" style={{ color: "#C4867A" }}>
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
        backgroundColor: "#2D1018",
        border: "1px solid rgba(212,168,130,0.15)",
        borderRadius: 16,
        padding: 32,
      }}
    >
      <div className="flex items-center gap-3">
        <div style={{ color: "#D4A882" }}>{icon}</div>
        <span
          className="font-sans text-base font-medium"
          style={{ color: "#EDD8B8" }}
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
        className="mt-5 inline-block font-sans text-sm font-medium transition-colors hover:opacity-80"
        style={{ color: "#D4A882" }}
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
