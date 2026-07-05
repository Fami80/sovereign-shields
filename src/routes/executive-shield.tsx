import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { SiteFooter } from "@/components/landing/SiteFooter";

const CANONICAL = "https://uaeworkrights.com/executive-shield";
const ERROR_COLOR = "#E57373";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Route = createFileRoute("/executive-shield")({
  head: () => ({
    meta: [
      { title: "Executive Shield: The UAE Compliance Guide (Free) | UAEworkrights" },
      { name: "description", content: "Free guide for UAE employers: the compliance gaps that most commonly turn into MOHRE disputes under FDL 33/2021 — and how to close them before they do." },
      { property: "og:title", content: "Executive Shield: The UAE Compliance Guide" },
      { property: "og:description", content: "Free guide for UAE employers: the compliance gaps that most commonly turn into MOHRE disputes under FDL 33/2021 — and how to close them before they do." },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: ExecutiveShieldPage,
});

const BULLETS = [
  "What actually changed under Federal Decree-Law 33/2021",
  "The compliance mistakes that most often trigger disputes",
  "How the 2026 WPS deadline changes your payroll cycle",
  "A compliance checklist you can use today",
];

function ExecutiveShieldPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = async () => {
    setSubmitError(false);
    if (honeypot) {
      setSubmitted(true);
      return;
    }
    const e: { name?: string; email?: string } = {};
    if (!name.trim() || name.length > 80) e.name = "Please enter your name.";
    if (!EMAIL_RE.test(email)) e.email = "Enter a valid work email.";
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          firstname: name.trim(),
          phone: "",
          message: "Requested: Executive Shield — The UAE Compliance Guide (employer lead magnet)",
          enquiry: "executive-shield",
          website: honeypot,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitError(true);
      }
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
    <div className="min-h-dvh" style={{ backgroundColor: "var(--color-burg-deep)" }}>
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-20">
        <p
          className="text-center text-[13px] font-medium uppercase tracking-[2.5px]"
          style={{ fontFamily: "var(--font-sans)", color: "var(--color-sand-muted)" }}
        >
          FREE GUIDE FOR EMPLOYERS
        </p>

        <h1
          className="mt-4 text-center font-display"
          style={{
            fontSize: "42px",
            color: "var(--color-sand-light)",
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          Executive Shield: The UAE Compliance Guide
        </h1>

        <p
          className="mx-auto mt-5 max-w-xl text-center font-sans"
          style={{ fontSize: "17px", fontWeight: 300, lineHeight: 1.7, color: "rgba(237,216,184,0.6)" }}
        >
          Most UAE companies haven't updated their compliance processes since Federal Decree-Law No. 33
          of 2021. This guide walks through the compliance gaps that most commonly turn into MOHRE
          disputes — before they do.
        </p>

        <div
          className="mx-auto mt-10 max-w-xl rounded-2xl p-8"
          style={{
            backgroundColor: "var(--color-burg-mid)",
            border: "1px solid rgba(212,168,130,0.15)",
          }}
        >
          <p
            className="text-[12px] font-medium uppercase tracking-[2px]"
            style={{ fontFamily: "var(--font-sans)", color: "var(--color-sand-warm)" }}
          >
            WHAT'S INSIDE
          </p>
          <ul className="mt-4 space-y-2.5">
            {BULLETS.map((b) => (
              <li
                key={b}
                className="flex gap-3 font-sans"
                style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(237,216,184,0.75)" }}
              >
                <span aria-hidden style={{ color: "var(--color-sand-warm)" }}>→</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t pt-8" style={{ borderColor: "rgba(212,168,130,0.12)" }}>
            {submitted ? (
              <div className="flex flex-col items-center py-4 text-center">
                <CheckCircle className="h-9 w-9" style={{ color: "#81C784" }} aria-hidden />
                <p className="mt-3 font-sans text-base font-semibold" style={{ color: "var(--color-sand-light)" }}>
                  On its way.
                </p>
                <p className="mt-2 font-sans text-sm" style={{ color: "rgba(237,216,184,0.55)" }}>
                  You'll get the guide by email shortly.
                </p>
              </div>
            ) : (
              <form
                className="space-y-4"
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  void handleSubmit();
                }}
              >
                {/* Honeypot — hidden from real users */}
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 0, height: 0, overflow: "hidden" }}>
                  <label>
                    Leave this empty
                    <input tabIndex={-1} autoComplete="off" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block font-sans text-xs font-medium uppercase tracking-[0.16em]" style={{ color: "rgba(237,216,184,0.55)" }}>
                    Name
                  </span>
                  <input
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "es-name-error" : undefined}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-xl px-4 py-3 text-base outline-none transition-colors focus-visible:!border-[var(--color-sand-warm)] focus-visible:shadow-[0_0_0_3px_rgba(212,168,130,0.2)] md:text-sm"
                    style={fieldStyle(!!errors.name)}
                  />
                  {errors.name && (
                    <span id="es-name-error" role="alert" className="mt-1.5 block font-sans text-xs" style={{ color: ERROR_COLOR }}>
                      {errors.name}
                    </span>
                  )}
                </label>

                <label className="block">
                  <span className="mb-2 block font-sans text-xs font-medium uppercase tracking-[0.16em]" style={{ color: "rgba(237,216,184,0.55)" }}>
                    Work email
                  </span>
                  <input
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "es-email-error" : undefined}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.ae"
                    className="w-full rounded-xl px-4 py-3 text-base outline-none transition-colors focus-visible:!border-[var(--color-sand-warm)] focus-visible:shadow-[0_0_0_3px_rgba(212,168,130,0.2)] md:text-sm"
                    style={fieldStyle(!!errors.email)}
                  />
                  {errors.email && (
                    <span id="es-email-error" role="alert" className="mt-1.5 block font-sans text-xs" style={{ color: ERROR_COLOR }}>
                      {errors.email}
                    </span>
                  )}
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 w-full rounded-full py-3.5 font-sans text-sm font-medium motion-safe:transition-transform motion-safe:duration-150 motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.97] focus-visible:[outline:2px_solid_var(--color-sand-light)] focus-visible:[outline-offset:2px] disabled:opacity-60"
                  style={{ backgroundColor: "var(--color-sand-warm)", color: "var(--color-burg-deep)" }}
                >
                  {submitting ? "Sending…" : "Send me the guide →"}
                </button>

                {submitError && (
                  <p role="alert" className="text-center font-sans text-sm" style={{ color: ERROR_COLOR }}>
                    Something went wrong. Please try again, or email us instead.
                  </p>
                )}

                <p className="text-center font-sans text-xs" style={{ color: "rgba(237,216,184,0.55)" }}>
                  You'll get the guide by email. No spam — occasional compliance updates only.
                </p>
              </form>
            )}
          </div>
        </div>

        <p
          className="mx-auto mt-8 max-w-xl text-center font-sans text-sm"
          style={{ color: "rgba(237,216,184,0.55)" }}
        >
          Ready to go further? A full compliance audit starts from AED 5,000.{" "}
          <a
            href="/contact?type=audit"
            className="font-medium underline decoration-1 underline-offset-2 hover:opacity-80"
            style={{ color: "var(--color-sand-warm)" }}
          >
            Book a compliance audit →
          </a>
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
