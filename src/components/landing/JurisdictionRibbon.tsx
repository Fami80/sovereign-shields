import { Building2, Landmark, Scale, Coins, Briefcase } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Authority = { code: string; label: string; Icon: LucideIcon };

const AUTHORITIES: Authority[] = [
  { code: "MOHRE", label: "Ministry of Labour", Icon: Briefcase },
  { code: "DIFC", label: "Dubai Intl. Financial Centre", Icon: Landmark },
  { code: "ADGM", label: "Abu Dhabi Global Market", Icon: Building2 },
  { code: "VARA", label: "Virtual Assets Authority", Icon: Coins },
  { code: "SCA", label: "Securities & Commodities", Icon: Scale },
];

export function JurisdictionRibbon() {
  return (
    <div className="relative bg-bg-light">
      {/* Dark fade behind to lift the ribbon above the section seam */}
      <div className="absolute inset-x-0 -top-10 h-20 bg-bg-dark" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="-mt-8 rounded-[24px] border border-[color:rgba(212,168,130,0.15)] bg-[#2D1018] px-5 py-5 shadow-[0_20px_50px_rgb(0,0,0,0.35)] md:px-8 md:py-6">
          <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-text-muted-dark">
            Operating across every UAE regulatory authority
          </p>
          <div className="grid grid-cols-2 items-center gap-x-4 gap-y-4 sm:grid-cols-3 md:grid-cols-5">
            {AUTHORITIES.map(({ code, label, Icon }) => (
              <div
                key={code}
                className="group flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5 transition-colors hover:border-action-accent/30 hover:bg-white/[0.04]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-action-accent/10 ring-1 ring-action-accent/20">
                  <Icon className="h-4 w-4 text-action-accent" strokeWidth={2.25} />
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-extrabold tracking-wider text-text-dark-primary">{code}</div>
                  <div className="truncate text-[10px] text-text-muted-dark">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
