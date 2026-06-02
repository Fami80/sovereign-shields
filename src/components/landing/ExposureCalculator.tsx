import { useEffect, useMemo, useState } from "react";
import { setExposureSnapshot } from "@/lib/exposure-store";

type ContractType = "limited" | "unlimited";
type CompanyType = "mohre" | "difc";
type DisputeReason =
  | "arbitrary"
  | "notice"
  | "gratuity"
  | "noncompete";

const DISPUTE_OPTIONS: { value: DisputeReason; label: string }[] = [
  { value: "arbitrary", label: "Arbitrary / Unfair Dismissal" },
  { value: "notice", label: "Redundancy Notice Non-Compliance" },
  { value: "gratuity", label: "Unpaid Gratuity / Wages" },
  { value: "noncompete", label: "Non-Compete Violation Claim" },
];

function fmt(n: number) {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(n);
}

function computeEOSG(salary: number, years: number, company: CompanyType) {
  if (years < 1) return 0;
  if (company === "mohre") {
    const daily = salary / 30;
    const firstFive = daily * 21 * Math.min(years, 5);
    const beyond = years > 5 ? daily * 30 * (years - 5) : 0;
    const total = firstFive + beyond;
    // Cap at 2 years total salary
    return Math.min(total, salary * 24);
  }
  // DIFC/ADGM DEWS — accumulated monthly contributions
  const months = years * 12;
  const firstFiveMonths = Math.min(months, 60);
  const beyondMonths = Math.max(0, months - 60);
  return salary * 0.0583 * firstFiveMonths + salary * 0.0833 * beyondMonths;
}

function computeDispute(
  salary: number,
  reason: DisputeReason,
  contract: ContractType,
  years: number,
) {
  switch (reason) {
    case "arbitrary": {
      const base = salary * 3;
      return contract === "limited" ? base * 1.25 : base;
    }
    case "notice":
      return salary * 1.5;
    case "gratuity":
      // Symbolic top-up: 1 month wage recovery exposure baseline
      return salary;
    case "noncompete":
      // Typical liquidated damages capped near 6 months salary, weighted
      return salary * Math.min(6, Math.max(1, years)) * 0.5;
  }
}

function riskTier(exposure: number) {
  if (exposure < 30000)
    return {
      label: "Low Risk",
      tone: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30",
      pulse: false,
    };
  if (exposure <= 100000)
    return {
      label: "Moderate Risk",
      tone: "bg-orange-500/15 text-orange-300 ring-orange-400/30",
      pulse: false,
    };
  return {
    label: "Critical Exposure",
    tone: "bg-red-500/20 text-red-300 ring-red-400/40",
    pulse: true,
  };
}

export function ExposureCalculator() {
  const [contract, setContract] = useState<ContractType>("unlimited");
  const [company, setCompany] = useState<CompanyType>("mohre");
  const [salary, setSalary] = useState(25000);
  const [years, setYears] = useState(4);
  const [reason, setReason] = useState<DisputeReason>("arbitrary");
  const [processing, setProcessing] = useState(false);

  const { eosg, dispute, total, tier, penaltyApplied } = useMemo(() => {
    const eosg = computeEOSG(salary, years, company);
    const dispute = computeDispute(salary, reason, contract, years);
    const total = eosg + dispute;
    const penaltyApplied = reason === "arbitrary" && contract === "limited";
    return { eosg, dispute, total, tier: riskTier(total), penaltyApplied };
  }, [salary, years, company, reason, contract]);

  // 400ms processing skeleton whenever an input changes
  useEffect(() => {
    setProcessing(true);
    const t = setTimeout(() => setProcessing(false), 400);
    return () => clearTimeout(t);
  }, [salary, years, company, reason, contract]);


  useEffect(() => {
    setExposureSnapshot({
      contract,
      company,
      salary,
      years,
      reason,
      eosg,
      dispute,
      total,
      riskLabel: tier.label as "Low Risk" | "Moderate Risk" | "Critical Exposure",
      penaltyApplied,
    });
  }, [contract, company, salary, years, reason, eosg, dispute, total, tier.label, penaltyApplied]);

  return (
    <section id="calculator" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        {/* CONTROLS */}
        <div className="rounded-[24px] border border-black/5 bg-white p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted-light">
            Exposure Calculation Engine
          </p>
          <h3 className="mt-2 text-2xl font-extrabold md:text-3xl">
            Model your statutory liability.
          </h3>
          <p className="mt-2 text-sm text-text-muted-light">
            Indicative figures only — confirmed in your AED 499 triage.
          </p>

          <div className="mt-8 space-y-7">
            <SegmentedToggle
              label="Contract Type"
              value={contract}
              onChange={(v) => setContract(v as ContractType)}
              options={[
                { value: "limited", label: "Limited / Fixed Term" },
                { value: "unlimited", label: "Unlimited / Flexible" },
              ]}
            />

            <SegmentedToggle
              label="Employer Jurisdiction"
              value={company}
              onChange={(v) => setCompany(v as CompanyType)}
              options={[
                { value: "mohre", label: "MOHRE Mainland" },
                { value: "difc", label: "DIFC / ADGM Freezone" },
              ]}
            />

            <Slider
              label="Base Salary (Monthly)"
              suffix={fmt(salary)}
              value={salary}
              min={5000}
              max={150000}
              step={500}
              onChange={setSalary}
              minLabel={fmt(5000)}
              maxLabel={fmt(150000)}
            />

            <Slider
              label="Years of Service"
              suffix={`${years} yr${years === 1 ? "" : "s"}`}
              value={years}
              min={0}
              max={20}
              step={0.5}
              onChange={setYears}
              minLabel="0 yrs"
              maxLabel="20+ yrs"
            />


            <div>
              <label className="mb-2 block text-sm font-medium text-text-light-primary">
                Dispute Reason
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as DisputeReason)}
                className="w-full cursor-pointer rounded-xl border border-black/10 bg-bg-light px-4 py-3 text-sm font-medium text-text-light-primary outline-none transition focus:border-action-accent focus:ring-2 focus:ring-action-accent/30"
              >
                {DISPUTE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* OUTPUT */}
        <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-bg-dark p-7 text-text-dark-primary md:col-span-2">
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(400px 200px at 100% 0%, rgba(0,229,153,0.18), transparent 60%)",
            }}
          />

          <div className="relative flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted-dark">
              Total Statutory Exposure
            </p>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ring-1 ${tier.tone}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full bg-current ${tier.pulse ? "animate-pulse" : ""}`}
              />
              {tier.label}
            </span>
          </div>

          <div className="relative mt-3 text-4xl font-extrabold text-action-accent md:text-5xl tabular-nums">
            {fmt(total)}
          </div>
          <p className="relative mt-1 text-xs text-text-muted-dark">
            Aggregate gratuity + dispute compensation ceiling.
          </p>

          <dl className="relative mt-7 space-y-4 border-t border-white/10 pt-5 text-sm">
            <Row
              label={
                company === "mohre"
                  ? "EOSG (MOHRE statutory)"
                  : "EOSG (DEWS accrual)"
              }
              value={fmt(eosg)}
            />
            <Row
              label={
                DISPUTE_OPTIONS.find((o) => o.value === reason)?.label ?? ""
              }
              value={fmt(dispute)}
            />
            {penaltyApplied && (
              <div className="rounded-lg border border-action-accent/30 bg-action-accent/10 px-3 py-2 text-xs text-action-accent">
                Limited-term penalty multiplier ×1.25 applied to arbitrary
                dismissal exposure.
              </div>
            )}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-text-muted-dark">{label}</dt>
      <dd className="font-semibold tabular-nums">{value}</dd>
    </div>
  );
}

function SegmentedToggle({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-text-light-primary">
        {label}
      </label>
      <div className="grid grid-cols-2 gap-1 rounded-xl bg-bg-dark/5 p-1">
        {options.map((o) => {
          const active = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(o.value)}
              className={`cursor-pointer rounded-lg px-3 py-2 text-xs font-semibold transition ${
                active
                  ? "bg-bg-dark text-action-accent shadow-sm"
                  : "text-text-light-primary/70 hover:text-text-light-primary"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Slider({
  label,
  suffix,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  suffix: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-text-light-primary">
          {label}
        </label>
        <span className="rounded-full bg-bg-dark/5 px-2.5 py-0.5 text-xs font-semibold text-text-light-primary tabular-nums">
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="h-2 w-full cursor-pointer appearance-none rounded-full outline-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-action-accent [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(0,229,153,0.5)] [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-action-accent"
        style={{
          background: `linear-gradient(to right, #00E599 0%, #00E599 ${pct}%, #E4ECE8 ${pct}%, #E4ECE8 100%)`,
        }}
      />
    </div>
  );
}
