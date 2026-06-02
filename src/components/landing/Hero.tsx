import { ArrowRight, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg-dark text-text-dark-primary">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(800px 400px at 20% 0%, rgba(0,229,153,0.18), transparent 60%), radial-gradient(600px 400px at 90% 100%, rgba(0,229,153,0.10), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-text-muted-dark backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5 text-action-accent" />
            Confidential UAE Employment Triage
          </span>

          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            UAE Employment Compliance &{" "}
            <span className="text-action-accent">Protection</span> Command Center.
          </h1>

          <p className="mt-4 max-w-2xl text-base text-text-muted-dark md:text-lg">
            One flat triage. Senior-grade review of your contract, end-of-service entitlements, and escalation pathway across every UAE jurisdiction.
          </p>

          <div className="mt-7 flex items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-action-accent px-4 py-1.5 text-sm font-bold text-bg-dark shadow-[0_8px_24px_rgba(0,229,153,0.35)]">
              AED 499
            </span>
            <span className="text-xs text-text-muted-dark">Single transparent fee · 24h turnaround</span>
          </div>

          <div className="mt-5 flex w-full flex-col gap-3 sm:flex-row sm:w-auto">
            <a
              href="#vault"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-action-accent px-6 py-3.5 text-sm font-bold text-bg-dark transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_30px_rgba(0,229,153,0.4)]"
            >
              Review My Settlement
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#vault"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-action-accent bg-transparent px-6 py-3.5 text-sm font-semibold text-text-dark-primary transition-all duration-300 hover:scale-[1.02] hover:bg-action-accent/10"
            >
              Ensure Corporate Compliance
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
