import { usePersona } from "@/lib/persona-context";

const EMPLOYEE_TESTIMONIALS = [
  {
    bg: "bg-burg-deep",
    quote: "I signed my settlement without questioning it. A quick review showed I had been underpaid by AED 4,200.",
    attribution: "Yasser, 3 years in Dubai",
    tag: "UNUSED LEAVE & SETTLEMENT",
  },
  {
    bg: "bg-burg-mid",
    quote: "I didn't know I had the right to refuse until someone showed me exactly where it said so.",
    attribution: "Sarah, 5 years in Dubai",
    tag: "VISA AND WORK PERMIT",
  },
  {
    bg: "bg-burg-deep",
    quote: "I expected this to take months. I was guided step by step. I knew exactly what to do and where to go.",
    attribution: "Randa, 2.5 years in Dubai",
    tag: "END OF SERVICE",
  },
];

const EMPLOYER_TESTIMONIALS = [
  {
    bg: "bg-burg-deep",
    quote: "Our settlement template hadn't been updated since 2019. The audit flagged three FDL 33/2021 gaps before our next exit.",
    attribution: "Head of HR, Free Zone group · 220 staff",
    tag: "COMPLIANCE AUDIT",
  },
  {
    bg: "bg-burg-mid",
    quote: "One MOHRE dispute was costing us AED 80k in legal time. We rebuilt our exit policy in two weeks.",
    attribution: "GM, Dubai mainland · 90 staff",
    tag: "DISPUTE PREVENTION",
  },
  {
    bg: "bg-burg-deep",
    quote: "Boardroom-ready findings. No fluff, no legalese. We acted on every recommendation inside a month.",
    attribution: "CFO, DIFC fintech · 60 staff",
    tag: "POLICY OVERHAUL",
  },
];

const EMPLOYEE_STATS = [
  { value: "AED 4,000+", label: "Average amount recovered per review" },
  { value: "48hrs", label: "Review turnaround time" },
  { value: "100%", label: "Written findings included" },
];

const EMPLOYER_STATS = [
  { value: "AED 75,000+", label: "Average cost of a single MOHRE dispute" },
  { value: "AED 5,000", label: "Flat fee for a full compliance audit" },
  { value: "100%", label: "Boardroom-ready written findings" },
];

export function Testimonials() {
  const { persona } = usePersona();
  const TESTIMONIALS = persona === "employer" ? EMPLOYER_TESTIMONIALS : EMPLOYEE_TESTIMONIALS;
  const STATS = persona === "employer" ? EMPLOYER_STATS : EMPLOYEE_STATS;

  return (
    <section className="bg-sand-pale">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p
          className="text-[13px] font-medium uppercase tracking-[2.5px]"
          style={{ fontFamily: "var(--font-sans)", color: "#8B2D3A" }}
        >
          {persona === "employer" ? "EMPLOYER RESULTS" : "CLIENT RESULTS"}
        </p>
        <h2
          className="mt-5 text-[40px] leading-tight"
          style={{ fontFamily: "var(--font-display)", color: "#1E0A0E" }}
        >
          {persona === "employer"
            ? "They thought they were compliant. They weren't."
            : "They were about to sign. They didn't."}
        </h2>

        <div className="mt-12 -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={`${persona}-${i}`}
              className={`${t.bg} relative flex w-[85%] flex-shrink-0 snap-center flex-col overflow-hidden rounded-2xl border p-6 motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out md:w-auto md:p-8 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg motion-safe:animate-fade-in`}
              style={{
                borderColor:
                  t.bg === "bg-burg-mid"
                    ? "rgba(212,168,130,0.15)"
                    : "rgba(212,168,130,0.12)",
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none select-none text-[80px] leading-none"
                style={{ fontFamily: "var(--font-display)", color: "rgba(212,168,130,0.08)" }}
              >
                &ldquo;
              </span>
              <blockquote
                className="relative -mt-4 flex-1 text-lg italic"
                style={{ fontFamily: "var(--font-display)", color: "#EDD8B8", lineHeight: 1.6, fontWeight: 400 }}
              >
                {t.quote}
              </blockquote>
              <figcaption className="relative mt-6">
                <div
                  className="text-[13px] font-light"
                  style={{ fontFamily: "var(--font-sans)", color: "rgba(212,168,130,0.6)" }}
                >
                  — {t.attribution}
                </div>
                <div
                  className="mt-3 inline-block rounded-sm border px-2.5 py-1 text-[13px] font-medium uppercase tracking-[2.5px]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    borderColor: "rgba(212,168,130,0.2)",
                    color: "rgba(212,168,130,0.5)",
                    letterSpacing: "3px",
                  }}
                >
                  {t.tag}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div
          className="mt-10 grid grid-cols-1 gap-8 rounded-xl border p-8 md:grid-cols-3"
          style={{ backgroundColor: "#2D1018", borderColor: "rgba(212,168,130,0.1)" }}
        >
          {STATS.map((s, i) => (
            <div key={`${persona}-stat-${i}`} className="text-center motion-safe:animate-fade-in">
              <div
                className="text-[36px] leading-tight"
                style={{ fontFamily: "var(--font-display)", color: "#D4A882" }}
              >
                {s.value}
              </div>
              <div
                className="mt-1 text-[13px] font-light"
                style={{ fontFamily: "var(--font-sans)", color: "rgba(237,216,184,0.6)" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
