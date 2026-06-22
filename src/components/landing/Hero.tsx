import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#1E0A0E", color: "#EDD8B8" }}
    >
      {/* Atmospheric concentric circles top-left */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[680px] w-[680px] opacity-90"
        viewBox="0 0 680 680"
        fill="none"
      >
        {[120, 200, 280, 360, 440, 520].map((r) => (
          <circle
            key={r}
            cx="340"
            cy="340"
            r={r}
            stroke="rgba(139,45,58,0.12)"
            strokeWidth="1"
            fill="none"
          />
        ))}
      </svg>

      {/* Decorative watermark: large quotation mark (desktop only) */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[80px] hidden lg:flex"
        style={{
          right: "-40px",
          width: "45%",
          zIndex: 0,
        }}
      >
        <div
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: "820px",
            fontWeight: 700,
            lineHeight: 0.7,
            color: "rgba(212,168,130,0.13)",
            userSelect: "none",
          }}
        >
          ‟
        </div>
      </div>

      {/* Decorative watermark: 33/2021 jurisdiction block (desktop only) */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[80px] hidden lg:flex"
        style={{
          right: 0,
          width: "45%",
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: "left" }}>
          <div
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            <span style={{ fontSize: "200px", color: "rgba(212,168,130,0.32)" }}>33</span>
            <span style={{ fontSize: "90px", color: "rgba(212,168,130,0.24)" }}>/2021</span>
          </div>
          <div
            style={{
              width: "120px",
              height: "1px",
              backgroundColor: "rgba(212,168,130,0.45)",
              margin: "16px 0",
            }}
          />
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {["MOHRE", "DIFC", "ADGM", "Free Zones", "Cross-border"].map((j) => (
              <li
                key={j}
                style={{
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize: "15px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "rgba(237,216,184,0.5)",
                  lineHeight: 2.8,
                }}
              >
                {j}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">

        <div className="flex flex-col items-start" style={{ maxWidth: "720px" }}>
          <span
            className="inline-flex items-center font-sans"
            style={{
              fontSize: "13px",
              letterSpacing: "3px",
              border: "1px solid rgba(212,168,130,0.25)",
              color: "rgba(212,168,130,0.7)",
              padding: "6px 14px",
              borderRadius: "999px",
              fontWeight: 500,
            }}
          >
            CONFIDENTIAL UAE EMPLOYMENT REVIEW
          </span>

          <h1
            className="mt-8 max-w-4xl font-display tracking-tight text-[40px] md:text-6xl"
            style={{ fontWeight: 400, lineHeight: 1.05 }}
          >
            <span style={{ color: "#EDD8B8" }}>Your settlement letter is</span>
            <br />
            <span style={{ color: "#D4A882", fontStyle: "italic", fontWeight: 400 }}>probably wrong.</span>
          </h1>

          <p
            className="mt-6 font-sans"
            style={{
              maxWidth: "600px",
              fontSize: "18px",
              fontWeight: 300,
              lineHeight: 1.75,
              color: "rgba(237,216,184,0.6)",
            }}
          >
            Most letters we review contain at least one error. The average underpayment is AED 4,200.
            <br /><br />
            UAE Labour Law protects both sides. You deserve to know what you're owed. Your employer deserves to know what they're required to pay.
            <br /><br />
            One flat review. Every UAE jurisdiction. Reviewed personally — not by a chatbot.
          </p>

          <span
            className="mt-8 inline-flex items-center font-sans"
            style={{
              fontSize: "13px",
              border: "1px solid rgba(212,168,130,0.3)",
              color: "rgba(212,168,130,0.8)",
              padding: "8px 16px",
              borderRadius: "999px",
            }}
          >
            AED 999 · Single transparent fee · 48h turnaround
          </span>

          <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row sm:w-auto">
            <a
              href={`https://wa.me/971547736565?text=${encodeURIComponent("Hi Kaoutar, I'd like to book a settlement review — AED 999.")}`}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-sans motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:hover:scale-[1.02] focus-visible:[outline:2px_solid_#EDD8B8] focus-visible:[outline-offset:2px] sm:w-auto"
              style={{
                backgroundColor: "#D4A882",
                color: "#1E0A0E",
                fontWeight: 500,
                fontSize: "14px",
              }}
            >
              Review My Settlement
              <ArrowRight className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5" />
            </a>
            <a
              href="/contact?type=audit"
              className="inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 font-sans motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:hover:scale-[1.02] focus-visible:[outline:2px_solid_#D4A882] focus-visible:[outline-offset:2px] sm:w-auto"
              style={{
                border: "1px solid rgba(212,168,130,0.4)",
                color: "#EDD8B8",
                fontWeight: 500,
                fontSize: "14px",
                backgroundColor: "transparent",
              }}
            >
              Ensure Corporate Compliance
            </a>
          </div>
        </div>

        {/* Trust bar */}
        <div
          className="mt-20 grid grid-cols-1 gap-6 pt-8 sm:grid-cols-2 md:grid-cols-4"
          style={{ borderTop: "1px solid rgba(212,168,130,0.1)" }}
        >
          {[
            "Federal Decree-Law 33/2021",
            "DIFC + ADGM + Mainland",
            "48-hour turnaround",
            "Written summary included",
          ].map((t) => (
            <div
              key={t}
              className="font-sans"
              style={{
                fontSize: "13px",
                fontWeight: 300,
                color: "rgba(237,216,184,0.6)",
              }}
            >
              <span style={{ color: "#D4A882", marginRight: "8px" }}>✓</span>
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
