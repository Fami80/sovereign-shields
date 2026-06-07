import { Building2, Landmark, Scale, Globe, Briefcase } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Authority = { code: string; Icon: LucideIcon };

const AUTHORITIES: Authority[] = [
  { code: "MOHRE", Icon: Briefcase },
  { code: "DIFC", Icon: Landmark },
  { code: "ADGM", Icon: Building2 },
  { code: "Free Zones", Icon: Globe },
  { code: "Cross-border", Icon: Scale },
];

export function JurisdictionRibbon() {
  return (
    <div
      className="sticky top-16 z-40 px-4 py-2.5 backdrop-blur-2xl"
      style={{
        background: "linear-gradient(180deg, rgba(30,10,14,0.55) 0%, rgba(30,10,14,0.35) 100%)",
        borderBottom: "1px solid rgba(212,168,130,0.18)",
        boxShadow: "0 1px 0 rgba(237,216,184,0.04) inset, 0 8px 24px -16px rgba(0,0,0,0.6)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div className="hidden items-center gap-2 sm:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7BB661] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7BB661]" />
          </span>
          <span
            className="text-[10px] font-medium uppercase tracking-[2.5px]"
            style={{ color: "rgba(212,168,130,0.75)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Live · Jurisdictional coverage
          </span>
        </div>

        <div className="flex flex-1 items-center justify-center gap-1.5 overflow-x-auto sm:justify-end sm:gap-2">
          {AUTHORITIES.map(({ code, Icon }) => (
            <div
              key={code}
              className="group flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 backdrop-blur-md transition-all hover:scale-[1.03]"
              style={{
                background: "rgba(237,216,184,0.04)",
                border: "1px solid rgba(212,168,130,0.18)",
              }}
            >
              <Icon className="h-3 w-3" style={{ color: "#D4A882" }} strokeWidth={2.25} />
              <span
                className="text-[11px] font-semibold tracking-wide"
                style={{ color: "rgba(237,216,184,0.85)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {code}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
