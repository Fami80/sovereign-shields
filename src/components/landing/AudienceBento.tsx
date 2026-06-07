import { User, Building2 } from "lucide-react";

export function AudienceBento() {
  return (
    <section id="features" style={{ backgroundColor: "#FAF3E8" }}>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {/* Section header */}
        <p
          className="font-sans"
          style={{
            fontSize: "10px",
            letterSpacing: "3px",
            color: "#8B2D3A",
            fontWeight: 500,
            textTransform: "uppercase",
          }}
        >
          WHAT WE DO
        </p>
        <h2
          className="mt-5 font-display"
          style={{
            fontSize: "40px",
            color: "#1E0A0E",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          UAE employment compliance — for both sides of the table
        </h2>

        {/* Two service cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* CARD 1 — Employee */}
          <article
            className="relative flex flex-col overflow-hidden rounded-2xl p-7 md:p-9"
            style={{
              backgroundColor: "#FAF3E8",
              border: "1px solid rgba(139,45,58,0.12)",
            }}
          >
            <p
              className="inline-flex items-center gap-1.5 font-sans"
              style={{
                fontSize: "10px",
                letterSpacing: "2px",
                color: "#8B2D3A",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              <User size={12} />
              FOR EMPLOYEES
            </p>

            <h3
              className="mt-3 font-display"
              style={{
                fontSize: "28px",
                color: "#1E0A0E",
                fontStyle: "italic",
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              Settlement Review
            </h3>

            <span
              className="mt-3 inline-flex items-center self-start rounded-full px-3 py-1 font-sans text-xs"
              style={{
                backgroundColor: "rgba(139,45,58,0.08)",
                color: "#8B2D3A",
                fontWeight: 500,
              }}
            >
              AED 999 flat fee
            </span>

            <p
              className="mt-4 font-sans"
              style={{
                fontSize: "14px",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(30,10,14,0.65)",
              }}
            >
              Got a settlement letter? Before you sign, we check it. Gratuity, leave encashment, deductions, notice period — every line reviewed against UAE Labour Law. Written findings within 48 hours.
            </p>

            <ul className="mt-6 space-y-2.5">
              {[
                "Mainland UAE · DIFC · ADGM · Free Zones",
                "Belgian and UK cross-border cases",
                "Written findings included",
                "48-hour turnaround",
              ].map((item) => (
                <li
                  key={item}
                  className="font-sans"
                  style={{
                    fontSize: "13px",
                    color: "#8B2D3A",
                    fontWeight: 400,
                  }}
                >
                  → {item}
                </li>
              ))}
            </ul>

            <a
              href={`https://wa.me/[REAL NUMBER]?text=${encodeURIComponent("Hi Kaoutar, I'd like to book a settlement review — AED 999.")}`}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center justify-center self-start rounded-full px-6 py-3 font-sans text-sm transition-transform duration-150 ease-out hover:scale-[1.02] focus-visible:[outline:2px_solid_#EDD8B8] focus-visible:[outline-offset:2px]"
              style={{
                backgroundColor: "#8B2D3A",
                color: "#FAF3E8",
                fontWeight: 500,
              }}
            >
              Send me your letter →
            </a>

            {/* Pulse badge bottom */}
            <div className="mt-6 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ backgroundColor: "#8B2D3A" }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ backgroundColor: "#8B2D3A" }}
                />
              </span>
              <span
                className="font-sans text-xs"
                style={{ color: "#8B2D3A", fontWeight: 500 }}
              >
                48h Fast-Track
              </span>
            </div>
          </article>

          {/* CARD 2 — Employer */}
          <article
            className="relative flex flex-col overflow-hidden rounded-2xl p-7 md:p-9"
            style={{
              backgroundColor: "#1E0A0E",
              border: "1px solid rgba(212,168,130,0.15)",
            }}
          >
            <p
              className="inline-flex items-center gap-1.5 font-sans"
              style={{
                fontSize: "10px",
                letterSpacing: "2px",
                color: "#D4A882",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              <Building2 size={12} />
              FOR EMPLOYERS
            </p>

            <h3
              className="mt-3 font-display"
              style={{
                fontSize: "28px",
                color: "#EDD8B8",
                fontStyle: "italic",
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              Compliance Audit
            </h3>

            <span
              className="mt-3 inline-flex items-center self-start rounded-full px-3 py-1 font-sans text-xs"
              style={{
                backgroundColor: "rgba(212,168,130,0.1)",
                color: "#D4A882",
                fontWeight: 500,
              }}
            >
              From AED 5,000
            </span>

            <p
              className="mt-4 font-sans"
              style={{
                fontSize: "14px",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(237,216,184,0.6)",
              }}
            >
              Most UAE companies haven't updated their exit processes since Federal Decree-Law No. 33 of 2021 — the complete overhaul of UAE private sector employment law. One MOHRE dispute costs AED 75,000+ in penalties and legal fees. An audit costs AED 5,000. We review your settlement templates, gratuity calculations, and policy documents. You receive a written compliance report you can act on.
            </p>

            <ul className="mt-6 space-y-2.5">
              {[
                "Exit process audit against current UAE Labour Law",
                "Settlement template stress-test",
                "Policy alignment with FDL 33/2021 — UAE's 2021 employment law overhaul",
                "Boardroom-ready written findings",
              ].map((item) => (
                <li
                  key={item}
                  className="font-sans"
                  style={{
                    fontSize: "13px",
                    color: "#D4A882",
                    fontWeight: 400,
                  }}
                >
                  → {item}
                </li>
              ))}
            </ul>

            <p
              className="mt-4 font-sans"
              style={{
                fontSize: "13px",
                fontWeight: 400,
                lineHeight: 1.6,
                color: "rgba(237,216,184,0.6)",
              }}
            >
              Need ongoing support? Monthly compliance retainer available from AED 3,500/month.
            </p>

            <a
              href="/contact?type=audit"
              className="mt-8 inline-flex items-center justify-center self-start rounded-full px-6 py-3 font-sans text-sm transition-transform duration-150 ease-out hover:scale-[1.02] focus-visible:[outline:2px_solid_#D4A882] focus-visible:[outline-offset:2px]"
              style={{
                border: "1px solid rgba(212,168,130,0.4)",
                color: "#D4A882",
                backgroundColor: "transparent",
                fontWeight: 500,
              }}
            >
              Book a compliance audit
            </a>
          </article>
        </div>

        {/* 3 differentiator tiles */}
        <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              title: "UAE Labour Law",
              body: "Federal Decree-Law No. 33 of 2021 — the law that governs all UAE private sector employment since January 2022.",
            },
            {
              title: "Cross-border expertise",
              body: "Belgian law, UK subsidiaries, multi-jurisdiction cases. Most UAE compliance consultants operate in one jurisdiction. We cover four.",
            },
            {
              title: "Both sides",
              body: "Employees and employers. Not an advocate. A compliance expert who understands what both sides are required to do.",
            },
          ].map((tile) => (
            <div
              key={tile.title}
              className="rounded-2xl p-6 md:p-7"
              style={{
                backgroundColor: "transparent",
                border: "1px solid rgba(139,45,58,0.1)",
              }}
            >
              <h4
                className="font-display"
                style={{
                  fontSize: "18px",
                  color: "#1E0A0E",
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}
              >
                {tile.title}
              </h4>
              <p
                className="mt-2 font-sans"
                style={{
                  fontSize: "13px",
                  color: "rgba(30,10,14,0.6)",
                  lineHeight: 1.5,
                }}
              >
                {tile.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
