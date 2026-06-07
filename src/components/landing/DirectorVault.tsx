import { useState } from "react";
import { Lock, FileDown, Sparkles, X, Loader2 } from "lucide-react";
import { generateRoadmapPDF } from "@/lib/generate-roadmap-pdf";
import { getExposureSnapshot } from "@/lib/exposure-store";

const PROMPTS = [
  "Draft a without-prejudice settlement letter",
  "Recalculate gratuity with commission included",
  "Map DIFC vs mainland exposure",
];

export function DirectorVault() {
  const [open, setOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isAssembling, setIsAssembling] = useState(false);

  const runGeneration = async () => {
    setIsAssembling(true);
    try {
      // Yield to paint the processing state before the heavy jsPDF work.
      await new Promise((r) => setTimeout(r, 50));
      generateRoadmapPDF(getExposureSnapshot());
    } finally {
      // Small settle delay so the user sees the spinner resolve cleanly.
      setTimeout(() => setIsAssembling(false), 400);
    }
  };

  const handleDownload = () => {
    if (!isUnlocked) {
      setOpen(true);
      return;
    }
    if (isAssembling) return;
    void runGeneration();
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
    setOpen(false);
    void runGeneration();
  };

  return (
    <section id="vault" className="bg-bg-dark py-20 text-text-dark-primary md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted-dark">Gated Workspace</p>
            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">The Director Vault</h2>
          </div>
          <span className="hidden rounded-full border border-[color:rgba(212,168,130,0.15)] bg-white/5 px-3 py-1 text-xs text-text-muted-dark md:inline">
            {isUnlocked ? "Unlocked" : "Unlocked at AED 999"}
          </span>
        </div>

        <div className="relative overflow-hidden rounded-[24px] border border-[color:rgba(212,168,130,0.15)] bg-[#2D1018] shadow-[0_30px_80px_rgb(0,0,0,0.35)]">
          {/* Terminal chrome */}
          <div className="flex items-center gap-2 border-b border-[color:rgba(212,168,130,0.15)] bg-white/[0.02] px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-3 text-xs text-text-muted-dark">vault.uaeworkrights.ae — Director Workspace</span>
          </div>

          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-5 md:p-8">
            {/* AI Assistant */}
            <div className="rounded-2xl border border-[color:rgba(212,168,130,0.15)] bg-white/[0.02] p-5 md:col-span-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="h-4 w-4 text-action-accent" />
                AI Compliance Assistant
              </div>
              <div className="mt-4 space-y-3 text-sm">
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/5 p-3 text-text-muted-dark">
                  How can I help reduce your exposure today, Director?
                </div>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-action-accent/15 p-3 text-text-dark-primary">
                  Review my Q3 termination memo for arbitrary dismissal risk.
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => !isUnlocked && setOpen(true)}
                    className="rounded-full border border-[color:rgba(212,168,130,0.15)] bg-white/[0.03] px-3 py-1.5 text-xs text-text-muted-dark transition-colors hover:border-action-accent/40 hover:text-text-dark-primary"
                  >
                    {p}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <input
                  onFocus={() => !isUnlocked && setOpen(true)}
                  placeholder="Ask the assistant…"
                  className="flex-1 rounded-full border border-[color:rgba(212,168,130,0.15)] bg-white/[0.03] px-4 py-2.5 text-sm text-text-dark-primary placeholder:text-text-muted-dark/70 focus:outline-none focus:ring-2 focus:ring-action-accent/40"
                />
                <button
                  onClick={() => !isUnlocked && setOpen(true)}
                  className="rounded-full bg-action-accent px-4 py-2.5 text-sm font-bold text-bg-dark"
                >
                  Send
                </button>
              </div>
            </div>

            {/* PDF Download */}
            <div className="flex flex-col justify-between rounded-2xl border border-[color:rgba(212,168,130,0.15)] bg-white/[0.02] p-5 md:col-span-2">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <FileDown className="h-4 w-4 text-action-accent" />
                  Legal Roadmap
                </div>
                <p className="mt-2 text-xs text-text-muted-dark">
                  Automated 6-page playbook with exposure ranges, draft letters and escalation tree.
                </p>
                <div className="mt-4 rounded-xl border border-dashed border-[color:rgba(212,168,130,0.15)] bg-bg-dark/40 p-4 text-xs text-text-muted-dark">
                  <div className="font-mono">UAE_Compliance_Roadmap_Confidential.pdf</div>
                  <div className="mt-1">6 pages · client-generated · encrypted in transit</div>
                </div>
              </div>
              <button
                onClick={handleDownload}
                disabled={isAssembling}
                aria-busy={isAssembling}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-action-accent/70 px-4 py-2.5 text-sm font-semibold text-text-dark-primary transition-colors hover:bg-action-accent/10 disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:bg-transparent"
              >
                {isAssembling ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-action-accent" />
                    <span className="text-left text-xs leading-tight">
                      Assembling Your Custom Compliance Roadmap…
                      <span className="block text-[10px] text-text-muted-dark">Please do not close this window.</span>
                    </span>
                  </>
                ) : (
                  <>
                    <FileDown className="h-4 w-4" /> Download PDF
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Glass gate */}
          {!isUnlocked && (
            <div className="absolute inset-0 flex items-center justify-center border-[color:rgba(212,168,130,0.15)] bg-bg-dark/85 backdrop-blur-xl">
              <div className="max-w-sm rounded-[24px] border border-[color:rgba(212,168,130,0.15)] bg-[#2D1018] px-8 py-7 text-center shadow-[0_30px_80px_rgb(0,0,0,0.5)]">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-action-accent/15 ring-1 ring-action-accent/30">
                  <Lock className="h-5 w-5 text-action-accent" />
                </span>
                <p className="mt-4 text-base font-semibold text-text-dark-primary">Director Vault is locked</p>
                <p className="mt-2 text-xs leading-relaxed text-text-muted-dark">
                  Unlock the AI Compliance Assistant and your automated 6-page legal roadmap PDF — secured by a single transparent triage fee.
                </p>
                <button
                  onClick={() => setOpen(true)}
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-action-accent px-5 py-2.5 text-sm font-bold text-bg-dark transition-all duration-300 hover:scale-[1.02]"
                >
                  Unlock Premium Access — AED 999
                </button>
              </div>

            </div>
          )}
        </div>
      </div>

      {open && <CheckoutDialog onClose={() => setOpen(false)} onSuccess={handleUnlock} />}
    </section>
  );
}

function CheckoutDialog({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Secure triage booking"
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg-dark/70 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-[24px] bg-white p-7 text-text-light-primary shadow-[0_30px_80px_rgb(0,0,0,0.35)]"
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 rounded-full p-1.5 text-text-muted-light hover:bg-bg-dark/5"
        >
          <X className="h-4 w-4" />
        </button>
        <span className="inline-flex items-center rounded-full bg-action-accent px-3 py-1 text-xs font-bold text-bg-dark">AED 999</span>
        <h3 className="mt-4 text-2xl font-extrabold">Secure your triage</h3>
        <p className="mt-2 text-sm text-text-muted-light">
          One transparent fee. Senior-counsel review of your matter, delivered within 24 hours. Your roadmap PDF unlocks immediately on payment.
        </p>
        <form
          className="mt-5 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            onSuccess();
          }}
        >
          <input required className="w-full rounded-xl border border-black/10 bg-bg-light px-4 py-3 text-sm outline-none focus:border-action-accent" placeholder="Full name" />
          <input required className="w-full rounded-xl border border-black/10 bg-bg-light px-4 py-3 text-sm outline-none focus:border-action-accent" placeholder="Email" type="email" />
          <input required className="w-full rounded-xl border border-black/10 bg-bg-light px-4 py-3 text-sm outline-none focus:border-action-accent" placeholder="UAE mobile (+971)" />
          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-bg-dark py-3.5 text-sm font-bold text-action-accent transition-all duration-300 hover:scale-[1.01]"
          >
            Proceed to Secure Checkout
          </button>
        </form>
      </div>
    </div>
  );
}
