import { Link } from "@tanstack/react-router";
import { Lock, Unlock } from "lucide-react";
import kbWatermark from "@/assets/knowledge-base-watermark.jpg";

const JURISDICTION_CARDS = [
  {
    title: "Mainland UAE",
    items: [
      "UAE labour law gratuity calculation: how it's done",
      "Notice periods and gardening leave rules",
      "Leave encashment: basic salary only, not gross",
      "Can your employer deduct visa costs in UAE?",
      "Visa cancellation: what you must sign and when",
    ],
    locked: true,
    search: {
      type: "kb",
      card: "Mainland UAE",
      message: "I'm interested in the Mainland UAE Knowledge Base",
    },
  },
  {
    title: "DIFC end of service gratuity",
    items: [
      "DEWS scheme: how it replaces traditional gratuity",
      "How DIFC employment differs from mainland UAE",
      "Zurich portal: checking your DEWS balance",
    ],
    locked: true,
    search: { type: "kb", card: "DIFC", message: "I'm interested in the DIFC Knowledge Base" },
  },
  {
    title: "ADGM",
    items: ["Employment framework and key rights", "How ADGM differs from DIFC and mainland"],
    locked: true,
    search: { type: "kb", card: "ADGM", message: "I'm interested in the ADGM Knowledge Base" },
  },
  {
    title: "Free Zones",
    items: [
      "Which free zones have their own employment frameworks",
      "Where mainland UAE labour law applies instead",
    ],
    locked: true,
    search: {
      type: "kb",
      card: "Free Zones",
      message: "I'm interested in the Free Zones Knowledge Base",
    },
  },
  {
    title: "Cross-border cases",
    items: ["Belgian law and UAE: what applies when", "UK subsidiaries operating in UAE"],
    locked: true,
    search: {
      type: "kb",
      card: "Cross-border",
      message: "I'm interested in cross-border Knowledge Base cases",
    },
  },
  {
    title: "Practical tools",
    items: [
      "UAE settlement checklist: before you sign",
      "Leave encashment calculator",
      "Illegal deductions: what employers cannot charge you",
    ],
    locked: true,
    search: {
      type: "kb",
      card: "Practical Tools",
      message: "I'm interested in the Practical Tools Knowledge Base",
    },
  },
];

export function KnowledgeBase() {
  return (
    <section id="knowledge" className="bg-[var(--color-burg-deep)] py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <h2
          className="mt-5 text-center text-[40px] font-semibold leading-tight"
          style={{ color: "var(--color-sand-light)", fontFamily: "'Playfair Display', serif" }}
        >
          UAE Employment Rights: Knowledge Base
        </h2>

        {/* Subheading */}
        <p
          className="mx-auto mt-5 max-w-2xl text-center text-base font-light"
          style={{ color: "rgba(237,216,184,0.6)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          The complete reference for UAE final settlements, by jurisdiction. One free article
          included. Full access from AED 299.
        </p>

        {/* Preview label */}
        <div
          className="mx-auto mt-6 flex items-center justify-center gap-2 text-center text-[13px] font-light"
          style={{ color: "rgba(237,216,184,0.55)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          <Lock className="h-3.5 w-3.5" style={{ color: "rgba(237,216,184,0.55)" }} />
          Preview: purchase 30-day access to unlock the full library · AED 299
        </div>

        {/* 6 Jurisdiction Cards */}
        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-6">
          {JURISDICTION_CARDS.map((card) => (
            <Link
              key={card.title}
              to="/contact"
              search={card.search}
              className="group relative flex flex-col rounded-xl p-6 motion-safe:transition-[translate,box-shadow] motion-safe:duration-200 motion-safe:ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg focus-visible:[outline:2px_solid_var(--color-sand-warm)] focus-visible:[outline-offset:2px]"
              style={{
                background: "var(--color-burg-mid)",
                border: "1px solid rgba(212,168,130,0.12)",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl"
                style={{
                  backgroundImage: `url(${kbWatermark})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: 0.05,
                  filter: "blur(4px)",
                  zIndex: 0,
                }}
              />
              <div className="relative z-[1] mb-4 flex items-start justify-between gap-3">
                <h3
                  className="text-base font-medium"
                  style={{
                    color: "var(--color-sand-light)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  {card.title}
                </h3>
                <Lock
                  className="mt-1 h-4 w-4 flex-shrink-0"
                  style={{ color: "rgba(212,168,130,0.75)" }}
                />
              </div>
              <ul className="relative z-[1] flex flex-col gap-2">
                {card.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[13px] font-light"
                    style={{
                      color: "rgba(237,216,184,0.55)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: "var(--color-burg-acc)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              {/* Hover/focus overlay */}
              <div
                className="absolute inset-0 z-10 flex items-center justify-center rounded-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                style={{ background: "rgba(30,10,14,0.7)" }}
              >
                <span
                  className="text-[13px] font-medium"
                  style={{
                    color: "var(--color-sand-warm)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  Unlock for AED 299 →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Free Article Cards */}
        <div className="mx-auto mt-5 grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
          {[
            {
              title: "How UAE gratuity is calculated: the complete guide",
              body: "The MOHRE mainland formula, step by step. Basic salary vs. gross. The 5-year rule. What unpaid leave does to your total.",
              to: "/guides/uae-gratuity-calculation",
            },
            {
              title: "Do free zones have their own employment law?",
              body: "JAFZA, DMCC and most zones follow federal law. Exactly two exceptions change everything, and there's a one-line test.",
              to: "/guides/free-zone-employment-law",
            },
          ].map((card) => (
            <div
              key={card.to}
              className="rounded-xl p-6"
              style={{
                background: "rgba(212,168,130,0.06)",
                border: "1px solid rgba(212,168,130,0.25)",
              }}
            >
              <div className="flex items-center gap-2">
                <Unlock className="h-4 w-4" style={{ color: "var(--color-sand-warm)" }} />
                <span
                  className="text-xs font-medium uppercase tracking-wide"
                  style={{
                    color: "var(--color-sand-warm)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  FREE
                </span>
              </div>
              <h3
                className="mt-3 text-lg font-medium"
                style={{
                  color: "var(--color-sand-light)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {card.title}
              </h3>
              <p
                className="mt-2 text-sm font-light"
                style={{
                  color: "rgba(237,216,184,0.55)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {card.body}
              </p>
              <Link
                to={card.to}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium focus-visible:underline focus-visible:decoration-[2px] focus-visible:decoration-[var(--color-sand-warm)]"
                style={{
                  color: "var(--color-sand-warm)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                Read now →
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div
          className="mt-8 flex flex-col items-center justify-center gap-4 rounded-xl px-6 py-5 sm:flex-row sm:gap-6"
          style={{
            background: "var(--color-burg-mid)",
            borderTop: "1px solid rgba(212,168,130,0.1)",
          }}
        >
          <span
            className="text-sm font-medium"
            style={{
              color: "rgba(237,216,184,0.7)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Unlock the full knowledge base · AED 299 for 30-day access
          </span>
          <Link
            to="/contact"
            search={{ type: "kb", message: "I'm interested in full Knowledge Base access" }}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.97] focus-visible:[outline:2px_solid_var(--color-sand-light)] focus-visible:[outline-offset:2px]"
            style={{
              background: "var(--color-sand-warm)",
              color: "var(--color-burg-deep)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Get 30-day access →
          </Link>
        </div>
      </div>
    </section>
  );
}
