import { useMemo, useState } from "react";

function fmt(n: number) {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(n);
}

function computeGratuity(salary: number, years: number) {
  const daily = salary / 30;
  let gratuity: number;
  if (years <= 5) {
    gratuity = daily * 21 * years;
  } else {
    gratuity = daily * 21 * 5 + daily * 30 * (years - 5);
  }
  // Cap at 2 years basic salary
  return Math.min(gratuity, salary * 24);
}

export function ExposureCalculator() {
  const [salaryInput, setSalaryInput] = useState("");
  const [yearsInput, setYearsInput] = useState("");

  const salary = parseFloat(salaryInput.replace(/,/g, "")) || 0;
  const years = parseFloat(yearsInput) || 0;

  const gratuity = useMemo(() => computeGratuity(salary, years), [salary, years]);

  const displayValue = salary > 0 && years > 0 ? fmt(gratuity) : "AED —";

  return (
    <section id="calculator" className="relative overflow-hidden bg-[#1E0A0E] px-6 py-20 md:py-28">
      {/* Decorative radial glow */}
      <div
        className="pointer-events-none absolute right-0 top-0"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle at top right, rgba(139,45,58,0.15), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p
            className="mb-4 text-[10px] font-medium uppercase tracking-[3px]"
            style={{ color: "rgba(212,168,130,0.6)", fontFamily: "'DM Sans', sans-serif" }}
          >
            FIND OUT WHAT&apos;S AT STAKE
          </p>
          <h2
            className="text-[40px] font-semibold leading-tight"
            style={{ color: "#EDD8B8", fontFamily: "'Playfair Display', serif" }}
          >
            What could your settlement be worth?
          </h2>
          <p
            className="mx-auto mt-4 max-w-lg text-[16px] font-light leading-relaxed"
            style={{ color: "rgba(237,216,184,0.55)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Enter your details and see your estimated end of service entitlement. Most people are surprised.
          </p>
        </div>

        {/* Calculator card */}
        <div
          className="mx-auto max-w-2xl rounded-[16px] p-10"
          style={{
            background: "#2D1018",
            border: "1px solid rgba(212,168,130,0.15)",
          }}
        >
          {/* Inputs row */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Input 1 */}
            <div>
              <label
                className="mb-2 block text-[12px] font-medium"
                style={{ color: "#D4A882", fontFamily: "'DM Sans', sans-serif" }}
              >
                Monthly basic salary
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="e.g. 25,000"
                value={salaryInput}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  setSalaryInput(raw ? Number(raw).toLocaleString("en-AE") : "");
                }}
                className="w-full rounded-lg px-4 py-3 text-sm outline-none transition focus:ring-1"
                style={{
                  background: "rgba(212,168,130,0.06)",
                  border: "1px solid rgba(212,168,130,0.2)",
                  color: "#EDD8B8",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
            </div>

            {/* Input 2 */}
            <div>
              <label
                className="mb-2 block text-[12px] font-medium"
                style={{ color: "#D4A882", fontFamily: "'DM Sans', sans-serif" }}
              >
                Years of service
              </label>
              <input
                type="text"
                inputMode="decimal"
                placeholder="e.g. 3"
                value={yearsInput}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d*\.?\d{0,1}$/.test(val)) {
                    setYearsInput(val);
                  }
                }}
                className="w-full rounded-lg px-4 py-3 text-sm outline-none transition focus:ring-1"
                style={{
                  background: "rgba(212,168,130,0.06)",
                  border: "1px solid rgba(212,168,130,0.2)",
                  color: "#EDD8B8",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
            </div>
          </div>

          {/* Result */}
          <div className="mt-10 text-center">
            <div
              className="text-[56px] font-semibold leading-none"
              style={{ color: "#D4A882", fontFamily: "'Playfair Display', serif" }}
            >
              {displayValue}
            </div>
            <p
              className="mt-2 text-[13px] font-light"
              style={{ color: "rgba(237,216,184,0.5)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Estimated gratuity entitlement
            </p>
            <p
              className="mx-auto mt-3 max-w-md text-[12px] font-light leading-relaxed"
              style={{ color: "rgba(237,216,184,0.35)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Based on MOHRE mainland formula: 21 days basic salary per year for first 5 years, 30 days thereafter. Actual entitlement may vary by jurisdiction and contract.
            </p>
          </div>

          {/* Warning box */}
          <div
            className="mx-auto mt-8 max-w-lg rounded-lg p-4"
            style={{
              background: "rgba(184,58,42,0.1)",
              border: "1px solid rgba(184,58,42,0.3)",
            }}
          >
            <p
              className="text-[13px] font-light leading-relaxed"
              style={{ color: "#EDD8B8", fontFamily: "'DM Sans', sans-serif" }}
            >
              ⚠ If your settlement letter shows a different number, there may be an error. Most letters we review contain at least one.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium transition hover:opacity-90"
              style={{
                background: "#D4A882",
                color: "#1E0A0E",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Get your letter reviewed — AED 999 →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
