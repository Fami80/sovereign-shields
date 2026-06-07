const CREDENTIALS = [
  "ADP Payroll Partner of the Year — externally validated, not self-declared",
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
    <section id="about" className="relative overflow-hidden" style={{ backgroundColor: "#1E0A0E" }}>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p
          className="text-[10px] font-medium uppercase tracking-[3px]"
          style={{ fontFamily: "var(--font-sans)", color: "rgba(212,168,130,0.6)" }}
        >
          THE EXPERT BEHIND UAEWORKRIGHTS
        </p>
        <h2
          className="mt-3 max-w-3xl text-[40px] leading-tight"
          style={{ fontFamily: "var(--font-display)", color: "#EDD8B8" }}
        >
          I'm not a lawyer. I'm a compliance specialist — and that distinction matters.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* LEFT — Credentials */}
          <div>
            <div
              className="text-[28px] leading-tight"
              style={{ fontFamily: "var(--font-display)", color: "#D4A882" }}
            >
              Kaoutar Makrache
            </div>
            <div
              className="mt-1 text-[14px] font-light"
              style={{ fontFamily: "var(--font-sans)", color: "rgba(237,216,184,0.55)" }}
            >
              Head of Payroll & Compliance · CHRM · CHRP · CIRS
            </div>

            <ul className="mt-6 space-y-3">
              {CREDENTIALS.map((c) => (
                <li key={c} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: "#D4A882" }}
                  />
                  <span
                    className="text-[14px] font-light leading-relaxed"
                    style={{ fontFamily: "var(--font-sans)", color: "rgba(237,216,184,0.65)" }}
                  >
                    {c}
                  </span>
                </li>
              ))}
            </ul>

            <blockquote
              className="mt-8 text-[18px] italic leading-relaxed"
              style={{
                fontFamily: "var(--font-display)",
                color: "#EDD8B8",
                backgroundColor: "rgba(212,168,130,0.06)",
                borderLeft: "3px solid #D4A882",
                padding: "20px 24px",
              }}
            >
              "Most settlement errors aren't deliberate. Employers make mistakes out of confusion,
              not bad intent. My job is to find those mistakes — and help both sides fix them."
            </blockquote>
          </div>

          {/* RIGHT — What I do / don't do */}
          <div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h3
                  className="text-[14px] font-medium uppercase tracking-[2px]"
                  style={{ fontFamily: "var(--font-sans)", color: "#D4A882" }}
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
                      <span style={{ color: "#D4A882" }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3
                  className="text-[14px] font-medium uppercase tracking-[2px]"
                  style={{ fontFamily: "var(--font-sans)", color: "rgba(237,216,184,0.5)" }}
                >
                  What I don't do
                </h3>
                <ul className="mt-4 space-y-3">
                  {DONT_ITEMS.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-[14px] font-light leading-relaxed"
                      style={{ fontFamily: "var(--font-sans)", color: "rgba(237,216,184,0.45)" }}
                    >
                      <span>✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <a
              href="#contact"
              className="mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium transition-transform duration-300 hover:scale-[1.02]"
              style={{
                fontFamily: "var(--font-sans)",
                backgroundColor: "#D4A882",
                color: "#1E0A0E",
              }}
            >
              Book a review — AED 999 →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
