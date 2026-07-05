import { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import cardBg from "@/assets/calculator-settlement-form.jpg";

function fmt(n: number) {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(n);
}

function computeGratuity(salary: number, years: number) {
  // Art. 51, Federal Decree-Law 33/2021: gratuity requires at least
  // one full year of continuous service.
  if (years < 1) return 0;
  const daily = salary / 30;
  let gratuity: number;
  if (years <= 5) {
    gratuity = daily * 21 * years;
  } else {
    gratuity = daily * 21 * 5 + daily * 30 * (years - 5);
  }
  return Math.min(gratuity, salary * 24);
}

export function ExposureCalculator() {
  const [salaryInput, setSalaryInput] = useState("");
  const [yearsInput, setYearsInput] = useState("");
  const [revealed, setRevealed] = useState(false);

  const salary = parseFloat(salaryInput.replace(/,/g, "")) || 0;
  const years = parseFloat(yearsInput) || 0;

  const gratuity = useMemo(() => computeGratuity(salary, years), [salary, years]);
  const canCalculate = salary > 0 && years > 0;

  const prefersReducedMotion = useReducedMotion();
  const count = useMotionValue(0);
  const displayRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState("AED —");

  // Reset reveal when inputs change
  useEffect(() => {
    if (revealed) {
      setRevealed(false);
      setDisplayText("AED —");
      count.set(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salaryInput, yearsInput]);

  useEffect(() => {
    const unsub = count.on("change", (v) => {
      setDisplayText(fmt(Math.round(v)));
    });
    return () => unsub();
  }, [count]);

  const handleCalculate = () => {
    if (!canCalculate) return;
    setRevealed(true);
    if (prefersReducedMotion) {
      count.set(gratuity);
      setDisplayText(fmt(gratuity));
      return;
    }
    count.set(0);
    // Spring with zero bounce: physical deceleration into the final figure
    // without ever overshooting it (a briefly-wrong AED number would read
    // as an error on a page about catching errors).
    animate(count, gratuity, {
      type: "spring",
      duration: 1.1,
      bounce: 0,
    });
  };

  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="calculator"
      className="relative isolate overflow-hidden bg-[var(--color-burg-deep)] px-6 py-20 md:py-28"
    >
      <div
        className="pointer-events-none absolute right-0 top-0"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle at top right, rgba(139,45,58,0.15), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <p
            className="mb-5 text-[13px] font-medium uppercase tracking-[2.5px]"
            style={{ color: "var(--color-sand-muted)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            UAE GRATUITY CALCULATOR
          </p>
          <h2
            className="text-[40px] font-semibold leading-tight"
            style={{ color: "var(--color-sand-light)", fontFamily: "'Playfair Display', serif" }}
          >
            What is your UAE settlement actually worth?
          </h2>
          <p
            className="mx-auto mt-5 max-w-lg text-[16px] font-light leading-relaxed"
            style={{ color: "rgba(237,216,184,0.55)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Enter your basic salary and years of service. See what UAE labour law says you&apos;re owed.
          </p>
        </div>

        <div
          className="relative isolate mx-auto max-w-2xl overflow-hidden rounded-[16px] p-10"
          style={{
            background: "var(--color-burg-mid)",
            border: "1px solid rgba(212,168,130,0.15)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              zIndex: 0,
              backgroundImage: `url(${cardBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: 0.15,
              filter: "blur(2px)",
            }}
          />
          <div className="relative" style={{ zIndex: 1 }}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                className="mb-2 inline-block rounded px-2 py-1 text-[13px] font-medium"
                style={{ color: "var(--color-sand-warm)", fontFamily: "'Plus Jakarta Sans', sans-serif", background: "rgba(45,16,24,0.85)" }}
              >
                Monthly basic salary (AED)
              </label>
              <input
                type="number"
                inputMode="numeric"
                min="0"
                placeholder="e.g. 25,000"
                value={salaryInput}
                onChange={(e) => setSalaryInput(e.target.value)}
                className="h-12 w-full rounded-lg px-4 text-base outline-none transition focus-visible:!border-[var(--color-sand-warm)] focus-visible:shadow-[0_0_0_3px_rgba(212,168,130,0.2)] md:text-sm"
                style={{
                  background: "rgba(212,168,130,0.06)",
                  border: "1px solid rgba(212,168,130,0.2)",
                  color: "var(--color-sand-light)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              />
            </div>

            <div>
              <label
                className="mb-2 inline-block rounded px-2 py-1 text-[13px] font-medium"
                style={{ color: "var(--color-sand-warm)", fontFamily: "'Plus Jakarta Sans', sans-serif", background: "rgba(45,16,24,0.85)" }}
              >
                Years of service
              </label>
              <input
                type="number"
                inputMode="numeric"
                min="0"
                step="0.1"
                placeholder="e.g. 3"
                value={yearsInput}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d*\.?\d{0,1}$/.test(val)) {
                    setYearsInput(val);
                  }
                }}
                className="h-12 w-full rounded-lg px-4 text-base outline-none transition focus-visible:!border-[var(--color-sand-warm)] focus-visible:shadow-[0_0_0_3px_rgba(212,168,130,0.2)] md:text-sm"
                style={{
                  background: "rgba(212,168,130,0.06)",
                  border: "1px solid rgba(212,168,130,0.2)",
                  color: "var(--color-sand-light)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              />
            </div>
          </div>

          {/* Calculate button */}
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={handleCalculate}
              disabled={!canCalculate}
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:[outline:2px_solid_var(--color-sand-light)] focus-visible:[outline-offset:2px] motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.97]"
              style={{
                background: "var(--color-burg-acc)",
                color: "var(--color-sand-light)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Calculate my gratuity →
            </button>
          </div>

          {/* Result */}
          <div className="mt-10 text-center">
            {/* The animated counter would spam screen readers with dozens of
                intermediate values, so it's hidden from AT and the final
                figure is announced once via the sr-only live region below. */}
            <motion.div
              ref={displayRef}
              className="text-[56px] font-semibold leading-none tabular-nums transition-opacity duration-500"
              // Subtle spring settle: the number rests at 98% and pops to
              // full size as the result lands. Decorative, so it stays off
              // for reduced-motion users.
              animate={{ scale: prefersReducedMotion || revealed ? 1 : 0.98 }}
              transition={{ type: "spring", duration: 0.6, bounce: 0.25 }}
              style={{
                color: "var(--color-sand-warm)",
                fontFamily: "'Playfair Display', serif",
                opacity: revealed ? 1 : 0.35,
                textShadow: revealed
                  ? "0 1px 3px rgba(0,0,0,0.6), 0 0 40px rgba(212,168,130,0.25)"
                  : "0 1px 3px rgba(0,0,0,0.6)",
              }}
              aria-hidden
            >
              {displayText}
            </motion.div>
            <span className="sr-only" aria-live="polite">
              {revealed ? `Estimated gratuity entitlement: ${fmt(gratuity)}` : ""}
            </span>
            <p
              className="mt-2 text-[13px] font-light"
              style={{ color: "rgba(237,216,184,0.6)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Estimated gratuity entitlement
            </p>
            <p
              className="mx-auto mt-3 max-w-md text-[12px] font-light leading-relaxed"
              style={{ color: "rgba(237,216,184,0.55)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              MOHRE mainland formula. 21 days basic salary per year for first 5 years, 30 days after that.
            </p>
          </div>

          {revealed && (
            <div
              className="mx-auto mt-8 max-w-lg rounded-lg p-4"
              style={{
                background: "rgba(184,58,42,0.1)",
                border: "1px solid rgba(184,58,42,0.3)",
              }}
            >
              <p
                className="text-[13px] font-light leading-relaxed"
                style={{ color: "var(--color-sand-light)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {years < 1
                  ? "Gratuity accrues after one full year of continuous service, so under one year no gratuity is due. Leave encashment, notice pay, and other final-settlement amounts may still apply."
                  : "⚠ If your settlement letter shows a different number, there's likely an error. Most letters we review have at least one."}
              </p>
            </div>
          )}

          <div className="mt-8 text-center">
            <a
              href={`https://wa.me/971547736565?text=${encodeURIComponent("Hi Kaoutar, I'd like to book a settlement review — AED 999.")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium transition hover:opacity-90 focus-visible:[outline:2px_solid_var(--color-sand-light)] focus-visible:[outline-offset:2px]"
              style={{
                background: "var(--color-sand-warm)",
                color: "var(--color-burg-deep)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Review my settlement →
            </a>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
