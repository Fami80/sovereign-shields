import { FileText, ScanSearch, FileCheck2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Step = { id: string; title: string; Icon: LucideIcon };

const STEPS: Step[] = [
  { id: "01", title: "Send your documents", Icon: FileText },
  { id: "02", title: "We review every line", Icon: ScanSearch },
  { id: "03", title: "You receive written findings", Icon: FileCheck2 },
];

export function HowItWorks() {
  return (
    <section className="bg-bg-light py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted-light">
            How it works
          </p>
          <h2 className="mt-5 text-3xl font-extrabold md:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
            From settlement letter to written findings in 48 hours
          </h2>
        </div>

        <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map(({ id, title, Icon }) => (
            <li
              key={id}
              className="relative rounded-[24px] border border-black/5 bg-white p-6 shadow-premium motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg md:p-7"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "#1E0A0E", color: "#D4A882" }}
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="mt-5 text-xl font-extrabold" style={{ fontFamily: "var(--font-sans)" }}>
                {title}
              </h3>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex justify-center">
          <a
            href={`https://wa.me/[REAL NUMBER]?text=${encodeURIComponent("Hi Kaoutar, I'd like to book a settlement review — AED 999.")}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:hover:scale-[1.02]"
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
