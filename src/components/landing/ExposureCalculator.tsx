import { useMemo, useState } from "react";

function fmt(n: number) {
  return new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED", maximumFractionDigits: 0 }).format(n);
}

export function ExposureCalculator() {
  const [years, setYears] = useState(4);
  const [salary, setSalary] = useState(18000);
  const [notice, setNotice] = useState(30);

  const { gratuity, noticePay, exposure } = useMemo(() => {
    const dailyBase = (salary * 12) / 365;
    const firstFive = Math.min(years, 5) * 21 * dailyBase;
    const beyond = Math.max(0, years - 5) * 30 * dailyBase;
    const gratuity = firstFive + beyond;
    const noticePay = (salary / 30) * notice;
    const arbitraryCap = Math.min(salary * 3, salary * Math.min(years, 12) * 0.25);
    return { gratuity, noticePay, exposure: gratuity + noticePay + arbitraryCap };
  }, [years, salary, notice]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        <div className="rounded-[24px] border border-black/5 bg-white p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted-light">Exposure Calculator</p>
          <h3 className="mt-2 text-2xl font-extrabold md:text-3xl">Model your liability boundary.</h3>
          <p className="mt-2 text-sm text-text-muted-light">Indicative ranges only — confirmed in your AED 499 triage.</p>

          <div className="mt-8 space-y-7">
            <Slider label="Duration of Employment" suffix={`${years} yr${years === 1 ? "" : "s"}`} value={years} min={1} max={20} onChange={setYears} />
            <Slider label="Base Salary (Monthly)" suffix={fmt(salary)} value={salary} min={3000} max={120000} step={500} onChange={setSalary} />
            <Slider label="Notice Matrix" suffix={`${notice} days`} value={notice} min={0} max={90} onChange={setNotice} />
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-bg-dark p-7 text-text-dark-primary md:col-span-2">
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{ background: "radial-gradient(400px 200px at 100% 0%, rgba(0,229,153,0.18), transparent 60%)" }}
          />
          <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-text-muted-dark">Estimated Exposure</p>
          <div className="relative mt-3 text-4xl font-extrabold text-action-accent md:text-5xl">{fmt(exposure)}</div>
          <p className="relative mt-1 text-xs text-text-muted-dark">Aggregate financial + legal liability ceiling.</p>

          <dl className="relative mt-7 space-y-4 border-t border-white/10 pt-5 text-sm">
            <Row label="End-of-service gratuity" value={fmt(gratuity)} />
            <Row label="Notice compensation" value={fmt(noticePay)} />
            <Row label="Arbitrary dismissal cap" value={fmt(exposure - gratuity - noticePay)} />
          </dl>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-text-muted-dark">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}

function Slider({
  label, suffix, value, min, max, step = 1, onChange,
}: {
  label: string; suffix: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-text-light-primary">{label}</label>
        <span className="rounded-full bg-bg-dark/5 px-2.5 py-0.5 text-xs font-semibold text-text-light-primary">{suffix}</span>
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
