const STEPS = [
  { id: "01", title: "Document Review", body: "Upload contract, payslips & comms. Encrypted intake." },
  { id: "02", title: "Fast-Track Analysis", body: "Senior counsel maps exposure within 24 hours.", fast: true },
  { id: "03", title: "Premium Legal Roadmap", body: "6-page playbook delivered, ready to action." },
];

export function EscalationTimeline() {
  return (
    <section className="bg-bg-light py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted-light">Escalation Timeline</p>
          <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">From signal to settlement in three calibrated nodes.</h2>
        </div>

        <ol className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-black/10 md:left-0 md:top-12 md:h-px md:w-full" aria-hidden />
          {STEPS.map((s) => (
            <li
              key={s.id}
              className="relative rounded-[24px] border border-black/5 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:p-7"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-dark text-sm font-extrabold text-action-accent">
                  {s.id}
                </span>
                {s.fast && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-action-accent/15 px-3 py-1 text-[13px] font-semibold text-text-light-primary">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-action-accent" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-action-accent" />
                    </span>
                    Fast-Track Service
                  </span>
                )}
              </div>
              <h3 className="mt-5 text-xl font-extrabold">{s.title}</h3>
              <p className="mt-2 text-sm text-text-muted-light">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
