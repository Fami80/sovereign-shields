import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ShieldCheck, Scale, Building2, Users } from "lucide-react";
import { onUi } from "@/lib/ui-store";

const PILLARS = [
  { icon: ShieldCheck, title: "Director-Level Liability Shield", body: "We sit between you and the regulator — quietly absorbing exposure before it surfaces in the boardroom." },
  { icon: Scale, title: "Regulatory Mandate", body: "Engagements coordinated through licensed UAE counsel under MOHRE, DIFC, ADGM, VARA and SCA frameworks." },
  { icon: Building2, title: "Enterprise-Grade Discretion", body: "Confidential by default. No press, no leaks, no public filings unless you choose escalation." },
  { icon: Users, title: "Two-Sided Desk", body: "Equal precision for employees recovering settlements and founders defending compliance posture." },
];

export function AboutDrawer() {
  const [open, setOpen] = useState(false);

  useEffect(() => onUi("open-about", () => setOpen(true)), []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="w-full border-l border-white/10 bg-[#032B24]/95 p-0 text-text-dark-primary shadow-2xl backdrop-blur-xl sm:max-w-lg"
      >
        <div className="flex h-full flex-col overflow-y-auto px-7 py-8">
          <SheetHeader className="text-left">
            <span className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted-dark">
              About Sovereign
            </span>
            <SheetTitle className="mt-3 text-3xl font-extrabold text-text-dark-primary">
              A premium shield for director-level liability.
            </SheetTitle>
            <SheetDescription className="text-sm text-text-muted-dark">
              Sovereign is a UAE-focused workrights triage desk operated by senior employment counsel. Our mandate is to neutralise exposure for both employees and the executives who hire them — before it ever reaches a tribunal.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-8 grid gap-4">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-action-accent/15 ring-1 ring-action-accent/30">
                    <p.icon className="h-4 w-4 text-action-accent" />
                  </span>
                  <div className="text-sm font-semibold">{p.title}</div>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-text-muted-dark">{p.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-bg-dark/40 p-5 text-xs text-text-muted-dark">
            Available remotely across all UAE Emirates (Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, Fujairah).
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
