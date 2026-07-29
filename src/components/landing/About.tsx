const CREDENTIALS = [
  "Head of Payroll & Compliance · CHRM · CHRP · CIRS",
  "ADP Payroll Partner of the Year (2017)",
  "14 years MENA payroll & compliance · 16,000+ employees · 400+ multinational clients",
  "Belgian · UK · UAE · DIFC · ADGM · Free Zones · KSA · Egypt",
  "Featured: Dubai Eye 103.8 · University of Sharjah · Dubai Municipality · Advisory Board HR MENA",
];

const DO_ITEMS = [
  "Review settlement letters against UAE law",
  "Identify gratuity, leave, and deduction errors",
  "Provide written findings you can act on",
  "Handle DIFC, ADGM, cross-border cases",
];

const DONT_ITEMS = [
  "Provide formal legal opinions",
  "Represent you in tribunal",
  "Advise on litigation strategy",
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden" style={{ backgroundColor: "var(--color-burg-deep)" }}>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <h2
          className="reveal-load max-w-3xl text-[40px] leading-tight"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-sand-light)" }}
        >
          I&apos;m not a lawyer. I&apos;m a compliance specialist, and that distinction matters.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* LEFT — Credentials */}
          <div className="reveal-in">
            {/* Seal mounted like an authenticated wax emblem: warm aura,
                embossed hairline rings (echoing the hero's concentric motif),
                and a shadow that follows the seal's circular shape. */}
            <div className="seal-press relative mx-auto mb-8 h-[140px] w-[140px] md:mx-0 md:h-[200px] md:w-[200px]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-[-28%] rounded-full"
                style={{ background: "radial-gradient(circle, rgba(212,168,130,0.13), transparent 68%)" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-[-13px] rounded-full"
                style={{ border: "1px solid rgba(212,168,130,0.16)" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-[-24px] rounded-full"
                style={{ border: "1px solid rgba(212,168,130,0.07)" }}
              />
              <img
                src="/images/about-seal.png"
                alt="UAEworkrights certification seal"
                loading="lazy"
                className="relative block h-full w-full"
                style={{
                  objectFit: "contain",
                  filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.5)) drop-shadow(0 16px 34px rgba(30,10,14,0.55))",
                }}
              />
            </div>

            <ul className="mt-6 space-y-3">
              {CREDENTIALS.map((credential) => (
                <li key={credential} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: "var(--color-sand-warm)" }}
                  />
                  <span
                    className="text-[14px] font-light leading-relaxed"
                    style={{ fontFamily: "var(--font-sans)", color: "rgba(237,216,184,0.65)" }}
                  >
                    {credential}
                  </span>
                </li>
              ))}
            </ul>

            <blockquote
              className="mt-8 text-[18px] italic leading-relaxed"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-sand-light)",
                backgroundColor: "rgba(212,168,130,0.06)",
                borderLeft: "3px solid var(--color-sand-warm)",
                padding: "20px 24px",
              }}
            >
              &quot;Most settlement errors aren&apos;t deliberate. Employers make mistakes because they haven&apos;t updated their processes, not because they&apos;re trying to underpay you. My job is to find those mistakes and help both sides fix them.&quot;
            </blockquote>
          </div>

          {/* RIGHT — What I do / don't do */}
          <div className="reveal-in">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h3
                  className="text-[14px] font-medium uppercase tracking-[2px]"
                  style={{ fontFamily: "var(--font-sans)", color: "var(--color-sand-warm)" }}
                >
                  What I do
                </h3>
                <ul className="mt-4 space-y-3">
                  {DO_ITEMS.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-[14px] font-light leading-relaxed"
                      style={{ fontFamily: "var(--font-sans)", color: "rgba(237,216,184,0.65)" }}
                    >
                      <span style={{ color: "var(--color-sand-warm)" }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3
                  className="text-[14px] font-medium uppercase tracking-[2px]"
                  style={{ fontFamily: "var(--font-sans)", color: "rgba(237,216,184,0.6)" }}
                >
                  What I don&apos;t do
                </h3>
                <ul className="mt-4 space-y-3">
                  {DONT_ITEMS.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-[14px] font-light leading-relaxed"
                      style={{ fontFamily: "var(--font-sans)", color: "rgba(237,216,184,0.55)" }}
                    >
                      <span>✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <a
              href="/contact"
              className="mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.97]"
              style={{
                fontFamily: "var(--font-sans)",
                backgroundColor: "var(--color-sand-warm)",
                color: "var(--color-burg-deep)",
              }}
            >
              Review my settlement →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
