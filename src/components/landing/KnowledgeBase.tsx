import { Lock, Unlock } from "lucide-react";

const JURISDICTION_CARDS = [
  {
    title: "Mainland UAE",
    items: [
      "UAE labour law gratuity calculation — how it's done",
      "Notice periods and gardening leave rules",
      "Leave encashment — basic salary only, not gross",
      "Can your employer deduct visa costs in UAE?",
      "Visa cancellation — what you must sign and when",
    ],
    locked: true,
  },
  {
    title: "DIFC end of service gratuity",
    items: [
      "DEWS scheme — how it replaces traditional gratuity",
      "How DIFC employment differs from mainland UAE",
      "Zurich portal — checking your DEWS balance",
    ],
    locked: true,
  },
  {
    title: "ADGM",
    items: [
      "Employment framework and key rights",
      "How ADGM differs from DIFC and mainland",
    ],
    locked: true,
  },
  {
    title: "Free Zones",
    items: [
      "Which free zones have their own employment frameworks",
      "Where mainland UAE labour law applies instead",
    ],
    locked: true,
  },
  {
    title: "Cross-border cases",
    items: [
      "Belgian law and UAE — what applies when",
      "UK subsidiaries operating in UAE",
    ],
    locked: true,
  },
  {
    title: "Practical tools",
    items: [
      "UAE settlement checklist — before you sign",
      "Leave encashment calculator",
      "Illegal deductions — what employers cannot charge you",
    ],
    locked: true,
  },
];

export function KnowledgeBase() {
  return (
    <section id="knowledge" className="bg-[#1E0A0E] py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Eyebrow */}
        <p
          className="text-center text-[10px] font-normal uppercase tracking-[3px]"
          style={{ color: "rgba(212,168,130,0.6)", fontFamily: "'DM Sans', sans-serif" }}
        >
          KNOWLEDGE BASE
        </p>

        {/* Heading */}
        <h2
          className="mt-4 text-center text-[40px] font-semibold leading-tight"
          style={{ color: "#EDD8B8", fontFamily: "'Playfair Display', serif" }}
        >
          UAE Employment Rights — Knowledge Base
        </h2>

        {/* Subheading */}
        <p
          className="mx-auto mt-4 max-w-2xl text-center text-base font-light"
          style={{ color: "rgba(237,216,184,0.5)", fontFamily: "'DM Sans', sans-serif" }}
        >
          The complete reference for UAE final settlements, by jurisdiction. One free article included. Full access from AED 199.
        </p>

        {/* Preview label */}
        <div
          className="mx-auto mt-6 flex items-center justify-center gap-2 text-center text-[13px] font-light"
          style={{ color: "rgba(237,216,184,0.4)", fontFamily: "'DM Sans', sans-serif" }}
        >
          <Lock className="h-3.5 w-3.5" style={{ color: "rgba(237,216,184,0.4)" }} />
          Preview — purchase 30-day access to unlock the full library · AED 199
        </div>

        {/* 6 Jurisdiction Cards */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
          {JURISDICTION_CARDS.map((card) => (
            <div
              key={card.title}
              className="flex flex-col rounded-xl p-6"
              style={{
                background: "#2D1018",
                border: "1px solid rgba(212,168,130,0.12)",
              }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3
                  className="text-base font-medium"
                  style={{ color: "#EDD8B8", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {card.title}
                </h3>
                <Lock
                  className="h-4 w-4"
                  style={{ color: "rgba(212,168,130,0.5)" }}
                />
              </div>
              <ul className="flex flex-col gap-2">
                {card.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[13px] font-light"
                    style={{ color: "rgba(237,216,184,0.55)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: "#8B2D3A" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Free Article Card */}
        <div
          className="mx-auto mt-5 max-w-xl rounded-xl p-6"
          style={{
            background: "rgba(212,168,130,0.06)",
            border: "1px solid rgba(212,168,130,0.25)",
          }}
        >
          <div className="flex items-center gap-2">
            <Unlock className="h-4 w-4" style={{ color: "#D4A882" }} />
            <span
              className="text-xs font-medium uppercase tracking-wide"
              style={{ color: "#D4A882", fontFamily: "'DM Sans', sans-serif" }}
            >
              FREE
            </span>
          </div>
          <h3
            className="mt-3 text-lg font-medium"
            style={{ color: "#EDD8B8", fontFamily: "'DM Sans', sans-serif" }}
          >
            How UAE gratuity is calculated — the complete guide
          </h3>
          <p
            className="mt-2 text-sm font-light"
            style={{ color: "rgba(237,216,184,0.55)", fontFamily: "'DM Sans', sans-serif" }}
          >
            The MOHRE mainland formula, step by step. Basic salary vs. gross. The 5-year rule. What unpaid leave does to your total.
          </p>
          <a
            href="/contact"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium"
            style={{ color: "#D4A882", fontFamily: "'DM Sans', sans-serif" }}
          >
            Read now →
          </a>
        </div>

        {/* Bottom CTA bar */}
        <div
          className="mt-8 flex flex-col items-center justify-center gap-4 rounded-xl px-6 py-5 sm:flex-row sm:gap-6"
          style={{
            background: "#2D1018",
            borderTop: "1px solid rgba(212,168,130,0.1)",
          }}
        >
          <span
            className="text-sm font-medium"
            style={{ color: "rgba(237,216,184,0.7)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Unlock the full knowledge base · AED 199 for 30-day access
          </span>
          <a
            href="/checkout"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-transform duration-150 ease-out hover:scale-[1.02]"
            style={{
              background: "#D4A882",
              color: "#1E0A0E",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Get 30-day access →
          </a>
        </div>
      </div>
    </section>
  );
}
