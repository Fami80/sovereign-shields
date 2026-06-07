const STEPS = [
  {
    id: "01",
    title: "Send your documents",
    body: "Upload your settlement letter and employment contract. Secure, confidential. Takes two minutes.",
  },
  {
    id: "02",
    title: "We review every line",
    body: "Gratuity calculation, leave encashment, deductions, notice period — all checked against UAE Labour Law for your specific jurisdiction.",
  },
  {
    id: "03",
    title: "You receive written findings",
    body: "A clear written summary of what's correct, what's wrong, and what you can do about it. Delivered within 48 hours.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-bg-light py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted-light">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-extrabold md:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
            From settlement letter to written findings in 48 hours
          </h2>
        </div>

        <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <li
              key={s.id}
              className="relative rounded-[24px] border border-black/5 bg-white p-6 shadow-premium md:p-7"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-extrabold"
                style={{
                  backgroundColor: "#1E0A0E",
                  color: "#D4A882",
                }}
              >
                {s.id}
              </span>
              <h3 className="mt-5 text-xl font-extrabold" style={{ fontFamily: "var(--font-sans)" }}>
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-text-muted-light">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex justify-center">
          <a
            href={`https://wa.me/[REAL NUMBER]?text=${encodeURIComponent("Hi Kaoutar, I'd like to book a settlement review — AED 999.")}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-transform duration-150 ease-out hover:scale-[1.02]"
            style={{
              backgroundColor: "#1E0A0E",
              color: "#EDD8B8",
              fontFamily: "var(--font-sans)",
            }}
          >
            Start your review — AED 999 →
          </a>
        </div>
      </div>
    </section>
  );
}
