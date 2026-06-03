import { ArrowRight, BookOpen } from "lucide-react";
import { smoothScrollTo } from "@/lib/ui-store";

const CHIPS = [
  { label: "Mainland Labor Law Decrees", tag: "MOHRE" },
  { label: "DIFC DEWS Parameters", tag: "DIFC" },
  { label: "ADGM Framework Core", tag: "ADGM" },
  { label: "UAE Free Zone Guidelines", tag: "Free Zones" },
  { label: "VARA Digital Conduct", tag: "VARA" },
  { label: "SCA Listed Entity Rules", tag: "SCA" },
];

export function KnowledgeBase() {
  const goVault = () => smoothScrollTo("#vault");

  return (
    <section id="knowledge" className="mx-auto max-w-6xl px-6 py-20 md:py-24">
      <div className="rounded-[28px] border border-black/5 bg-white p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:p-10">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted-light">
              <BookOpen className="h-3.5 w-3.5" /> Knowledge Base
            </p>
            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Jurisdictional intelligence, on tap.</h2>
            <p className="mt-2 text-sm text-text-muted-light">
              Curated decrees, freezone playbooks and tribunal precedents. Full library unlocks inside the Director Vault.
            </p>
          </div>
          <button
            onClick={goVault}
            className="group inline-flex items-center gap-2 rounded-full border border-bg-dark/15 px-5 py-2.5 text-sm font-semibold text-text-light-primary transition-all hover:border-action-accent hover:bg-action-accent/10"
          >
            Open the Vault
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CHIPS.map((c) => (
            <button
              key={c.label}
              onClick={goVault}
              className="group flex items-center justify-between rounded-2xl border border-black/5 bg-bg-light/60 px-4 py-3.5 text-left text-sm font-medium text-text-light-primary transition-all hover:-translate-y-0.5 hover:border-action-accent/40 hover:bg-white hover:shadow-md"
            >
              <span>{c.label}</span>
              <span className="ml-3 inline-flex items-center rounded-full bg-bg-dark/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted-light group-hover:bg-action-accent/15 group-hover:text-text-light-primary">
                {c.tag}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
