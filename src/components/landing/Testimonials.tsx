import docDetail from "@/assets/testimonials-document-detail.jpg.asset.json";

const TESTIMONIALS = [
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

const STATS = [
  { value: "AED 4,000+", label: "Average amount recovered per review" },
  { value: "48hrs", label: "Review turnaround time" },
  { value: "100%", label: "Written findings on every case" },
];

export function Testimonials() {
  return (
    <section className="bg-sand-pale">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {/* Header */}
        <p
          className="text-[13px] font-medium uppercase tracking-[2.5px]"
          style={{ fontFamily: "var(--font-sans)", color: "#8B2D3A" }}
        >
          CLIENT RESULTS
        </p>
        <h2
          className="mt-5 text-[40px] leading-tight"
          style={{ fontFamily: "var(--font-display)", color: "#1E0A0E" }}
        >
          They were about to sign. They didn't.
        </h2>

        {/* Testimonial Cards — horizontal scroll on mobile, grid on desktop */}
        <div className="mt-12 -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              className={`${t.bg} relative flex w-[85%] flex-shrink-0 snap-center flex-col overflow-hidden rounded-2xl border p-6 motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out md:w-auto md:flex-row md:gap-4 md:p-8 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg`}
              style={{
                borderColor:
                  t.bg === "bg-burg-mid"
                    ? "rgba(212,168,130,0.15)"
                    : "rgba(212,168,130,0.12)",
              }}
            >
              <div className="flex min-w-0 flex-1 flex-col">
                {/* Decorative quotation mark */}
                <span
                  aria-hidden
                  className="pointer-events-none select-none text-[80px] leading-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "rgba(212,168,130,0.08)",
                  }}
                >
                  &ldquo;
                </span>

                <blockquote
                  className="relative -mt-4 flex-1 text-lg italic"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "#EDD8B8",
                    lineHeight: 1.6,
                    fontWeight: 400,
                  }}
                >
                  {t.quote}
                </blockquote>

                <figcaption className="relative mt-6">
                  <div
                    className="text-[13px] font-light"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: "rgba(212,168,130,0.6)",
                    }}
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
              </div>

              <img
                src={docDetail.url}
                alt=""
                aria-hidden
                className="pointer-events-none mt-4 w-full flex-shrink-0 rounded-lg object-cover md:mt-0 md:w-[120px] md:h-[120px]"
                style={{
                  aspectRatio: "3 / 2",
                  opacity: 0.85,
                  boxShadow: "0 8px 20px rgba(30,10,14,0.4)",
                }}
              />
            </figure>
          ))}
        </div>

        {/* Mobile scroll indicator */}
        <p
          className="mt-3 text-center md:hidden"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "12px",
            fontWeight: 300,
            color: "rgba(30,10,14,0.45)",
          }}
        >
          Scroll to see more →
        </p>

        {/* Stats Bar */}
        <div
          className="mt-10 grid grid-cols-1 gap-8 rounded-xl border p-8 md:grid-cols-3"
          style={{
            backgroundColor: "#2D1018",
            borderColor: "rgba(212,168,130,0.1)",
          }}
        >
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <div
                className="text-[36px] leading-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "#D4A882",
                }}
              >
                {s.value}
              </div>
              <div
                className="mt-1 text-[13px] font-light"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "rgba(237,216,184,0.6)",
                }}
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
