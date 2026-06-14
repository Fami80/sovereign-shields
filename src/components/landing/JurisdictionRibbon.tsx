const JURISDICTIONS = ["MOHRE", "DIFC", "ADGM", "Free Zones", "Cross-border"];

export function JurisdictionRibbon() {
  return (
    <div className="bg-bg-dark">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <div
          className="text-center"
          style={{
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize: "13px",
            letterSpacing: "3px",
            color: "rgba(237,216,184,0.55)",
          }}
        >
          JURISDICTION STATUS
        </div>
        <div
          className="mt-3 flex flex-wrap items-center justify-center"
          style={{ gap: "8px" }}
        >
          {JURISDICTIONS.map((name) => (
            <span
              key={name}
              className="inline-flex items-center"
              style={{
                background: "rgba(212,168,130,0.08)",
                border: "1px solid rgba(212,168,130,0.2)",
                borderRadius: "100px",
                padding: "6px 14px",
              }}
            >
              <span
                aria-hidden
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "100px",
                  background: "#D4A882",
                  marginRight: "6px",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#EDD8B8",
                }}
              >
                {name}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
