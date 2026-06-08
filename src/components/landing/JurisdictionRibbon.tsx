type Authority = { code: string; label: string };

const AUTHORITIES: Authority[] = [
  { code: "MOHRE", label: "Mainland" },
  { code: "DIFC", label: "Dubai Int'l Financial Centre" },
  { code: "ADGM", label: "Abu Dhabi Global Market" },
  { code: "Free Zones", label: "All UAE" },
  { code: "Cross-border", label: "Belgian & UK law" },
];

export function JurisdictionRibbon() {
  return (
    <div className="border-y border-black/5 bg-bg-light">
      <div className="mx-auto max-w-6xl px-6 py-3">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted-light/80">
            Jurisdictions covered
          </span>
          {AUTHORITIES.map(({ code, label }) => (
            <span
              key={code}
              className="inline-flex items-center gap-2 text-[12px] text-text-muted-light"
            >
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500/80 ring-2 ring-emerald-500/15"
              />
              <span className="font-semibold tracking-wide text-text-light-primary/80">{code}</span>
              {label && <span className="text-text-muted-light/70">· {label}</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
