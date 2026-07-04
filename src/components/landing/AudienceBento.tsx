import { User, Building2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function AudienceBento() {
  return (
    <section id="features" style={{ backgroundColor: "var(--color-sand-pale)" }}>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <h2
          className="font-display"
          style={{
            fontSize: "40px",
            color: "var(--color-burg-deep)",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          UAE employment compliance for both sides of the table
        </h2>

        {/* Service cards: employee journey first (contract → settlement), employer below */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* CARD 1 — Employee · Contract Review (pre-acceptance) */}
          <article
            className="relative flex flex-col overflow-hidden rounded-2xl p-7 motion-safe:transition-[translate,box-shadow] motion-safe:duration-200 motion-safe:ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg md:p-9"
            style={{
              backgroundColor: "var(--color-sand-pale)",
              border: "1px solid rgba(139,45,58,0.12)",
            }}
          >
            <p
              className="inline-flex items-center gap-1.5 font-sans"
              style={{
                fontSize: "10px",
                letterSpacing: "2px",
                color: "var(--color-burg-acc)",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              <User size={12} />
              FOR EMPLOYEES · PRE-ACCEPTANCE
            </p>

            <h3
              className="mt-3 font-display"
              style={{
                fontSize: "28px",
                color: "var(--color-burg-deep)",
                fontStyle: "italic",
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              Contract Review
            </h3>

            <span
              className="mt-3 inline-flex items-center self-start rounded-full px-3 py-1 font-sans text-xs"
              style={{
                backgroundColor: "rgba(139,45,58,0.08)",
                color: "var(--color-burg-acc)",
                fontWeight: 500,
              }}
            >
              AED 2,000 flat fee
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
              Got a UAE job offer? Before you sign, know exactly what you're agreeing to. We review your employment contract clause by clause — salary structure, notice period, non-compete terms, probation length, benefits — against UAE labour law, so nothing surprises you after you've already accepted.
            </p>

            <ul className="mt-6 space-y-2.5">
              {[
                "Full contract review before you sign",
                "Salary structure & benefits checked",
                "Notice period & non-compete clauses explained in plain language",
                "Written findings within 48 hours",
              ].map((item) => (
                <li
                  key={item}
                  className="font-sans"
                  style={{
                    fontSize: "13px",
                    color: "var(--color-burg-acc)",
                    fontWeight: 400,
                  }}
                >
                  → {item}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <a
                href={`https://wa.me/971547736565?text=${encodeURIComponent("Hi Kaoutar, I'd like to book a contract review — AED 2,000.")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full px-6 py-[14px] font-sans text-[15px] motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.97] focus-visible:[outline:2px_solid_var(--color-sand-light)] focus-visible:[outline-offset:2px]"
                style={{
                  backgroundColor: "var(--color-burg-acc)",
                  color: "var(--color-sand-pale)",
                  fontWeight: 500,
                  minHeight: "48px",
                }}
              >
                Review my contract - AED 2,000 →
              </a>
            </div>
          </article>

          {/* CARD 2 — Employee · Settlement Review (exit) */}
          <article
            className="relative flex flex-col overflow-hidden rounded-2xl p-7 motion-safe:transition-[translate,box-shadow] motion-safe:duration-200 motion-safe:ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg md:p-9"
            style={{
              backgroundColor: "var(--color-sand-pale)",
              border: "1px solid rgba(139,45,58,0.12)",
            }}
          >
            <p
              className="inline-flex items-center gap-1.5 font-sans"
              style={{
                fontSize: "10px",
                letterSpacing: "2px",
                color: "var(--color-burg-acc)",
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
                color: "var(--color-burg-deep)",
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
                color: "var(--color-burg-acc)",
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
              Got a settlement letter? Before you sign, we check it. Gratuity, leave encashment, deductions, notice period. Every line reviewed against UAE Labour Law. Written findings within 48 hours.
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
                    color: "var(--color-burg-acc)",
                    fontWeight: 400,
                  }}
                >
                  → {item}
                </li>
              ))}
            </ul>

            <p
              className="mt-8 font-sans italic"
              style={{
                fontSize: "14px",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(30,10,14,0.65)",
              }}
            >
              Prefer to check it yourself? We send you the settlement self-audit checklist and you review your own letter, step by step, in your own time.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`https://wa.me/971547736565?text=${encodeURIComponent("Hi Kaoutar, I'd like to book a settlement review — AED 999.")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full px-6 py-[14px] font-sans text-[15px] motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.97] focus-visible:[outline:2px_solid_var(--color-sand-light)] focus-visible:[outline-offset:2px]"
                style={{
                  backgroundColor: "var(--color-burg-acc)",
                  color: "var(--color-sand-pale)",
                  fontWeight: 500,
                  minHeight: "48px",
                }}
              >
                Full review - AED 999 →
              </a>
              <a
                href={`https://wa.me/971547736565?text=${encodeURIComponent("Hi Kaoutar, I'm interested in the Self-Review Checklist — AED 199.")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full px-6 py-[14px] font-sans text-sm motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.97] focus-visible:[outline:2px_solid_var(--color-burg-acc)] focus-visible:[outline-offset:2px]"
                style={{
                  border: "1px solid var(--color-burg-acc)",
                  color: "var(--color-burg-acc)",
                  backgroundColor: "transparent",
                  fontWeight: 500,
                  minHeight: "48px",
                }}
              >
                Self-review checklist - AED 199 →
              </a>
            </div>
          </article>

          {/* CARD 3 — Employer (full width below the employee journey) */}
          <article
            className="relative flex flex-col overflow-hidden rounded-2xl p-7 motion-safe:transition-[translate,box-shadow] motion-safe:duration-200 motion-safe:ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg md:col-span-2 md:p-9"
            style={{
              backgroundColor: "var(--color-burg-deep)",
              border: "1px solid rgba(212,168,130,0.15)",
            }}
          >
            <p
              className="inline-flex items-center gap-1.5 font-sans"
              style={{
                fontSize: "10px",
                letterSpacing: "2px",
                color: "var(--color-sand-warm)",
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
                color: "var(--color-sand-light)",
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
                color: "var(--color-sand-warm)",
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
              Most UAE companies haven't updated their exit processes since Federal Decree-Law No. 33 of 2021, the complete overhaul of UAE private sector employment law. One MOHRE dispute costs AED 75,000+ in penalties and legal fees. An audit costs AED 5,000. We review your settlement templates, gratuity calculations, and policy documents. You receive a written compliance report you can act on.
            </p>

            <ul className="mt-6 space-y-2.5">
              {[
                "Exit process audit against current UAE Labour Law",
                "Settlement template stress-test",
                "Policy alignment with FDL 33/2021, UAE's 2021 employment law overhaul",
                "Boardroom-ready written findings",
              ].map((item) => (
                <li
                  key={item}
                  className="font-sans"
                  style={{
                    fontSize: "13px",
                    color: "var(--color-sand-warm)",
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
              className="mt-8 inline-flex items-center justify-center self-start rounded-full px-6 py-3 font-sans text-sm motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.97] focus-visible:[outline:2px_solid_var(--color-sand-warm)] focus-visible:[outline-offset:2px]"
              style={{
                border: "1px solid rgba(212,168,130,0.4)",
                color: "var(--color-sand-warm)",
                backgroundColor: "transparent",
                fontWeight: 500,
              }}
            >
              Book a compliance audit
            </a>

            <p
              className="mt-5 font-sans"
              style={{ fontSize: "13px", fontWeight: 300, color: "rgba(237,216,184,0.6)" }}
            >
              Not ready for a full audit?{" "}
              <Link
                to="/executive-shield"
                className="font-medium underline decoration-[var(--color-sand-warm)] decoration-1 underline-offset-2 hover:opacity-80"
                style={{ color: "var(--color-sand-warm)" }}
              >
                Get the free Executive Shield guide first →
              </Link>
            </p>
          </article>
        </div>

        {/* 3 differentiator tiles */}
        <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              title: "UAE Labour Law",
              body: "Federal Decree-Law No. 33 of 2021, the law that governs all UAE private sector employment since January 2022.",
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
              className="rounded-2xl p-6 motion-safe:transition-[translate,box-shadow] motion-safe:duration-200 motion-safe:ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg md:p-7"
              style={{
                backgroundColor: "transparent",
                border: "1px solid rgba(139,45,58,0.1)",
              }}
            >
              <h3
                className="font-display"
                style={{
                  fontSize: "18px",
                  color: "var(--color-burg-deep)",
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}
              >
                {tile.title}
              </h3>
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
