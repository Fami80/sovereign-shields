const AUTHORITIES = ["MOHRE", "DIFC", "ADGM", "VARA", "SCA"];

export function JurisdictionRibbon() {
  return (
    <div className="border-y border-white/10 bg-bg-dark">
      <div className="mx-auto max-w-6xl px-6 py-5">
        <div className="grid grid-cols-5 items-center gap-3 text-center">
          {AUTHORITIES.map((a) => (
            <div
              key={a}
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted-dark transition-colors hover:text-action-accent md:text-xs"
            >
              {a}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
