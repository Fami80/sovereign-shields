import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { usePersona } from "@/lib/persona-context";

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
  return Math.min(gratuity, salary * 24);
}

export function ExposureCalculator() {
  const { persona } = usePersona();
  const isEmployer = persona === "employer";

  const [salaryInput, setSalaryInput] = useState("");
  const [yearsInput, setYearsInput] = useState("");
  const [revealed, setRevealed] = useState(false);

  const salary = parseFloat(salaryInput.replace(/,/g, "")) || 0;
  const years = parseFloat(yearsInput) || 0;

  const gratuity = useMemo(() => computeGratuity(salary, years), [salary, years]);
  const canCalculate = salary > 0 && years > 0;

  const prefersReducedMotion = useReducedMotion();
  const count = useMotionValue(0);
  const [displayText, setDisplayText] = useState("AED —");

  useEffect(() => {
    if (revealed) {
      setRevealed(false);
      setDisplayText("AED —");
      count.set(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salaryInput, yearsInput]);

  useEffect(() => {
    const unsub = count.on("change", (v) => setDisplayText(fmt(Math.round(v))));
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
    animate(count, gratuity, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
  };

  // Copy maps for persona
  const copy = isEmployer
    ? {
        eyebrow: "UAE LIABILITY ENGINE",
        title: "What does one exit actually cost you?",
        sub: "Enter the employee's basic salary and years of service. See your statutory liability under UAE labour law.",
        salaryLabel: "Employee monthly basic (AED)",
        yearsLabel: "Years of service",
        cta: "Calculate Company Liability →",
        resultLabel: "Statutory gratuity owed",
        warning: "⚠ Your settlement template likely understates this. One dispute averages AED 75,000 in penalties.",
        bookCta: "Book a compliance audit — from AED 5,000 →",
        bookHref: "/contact?type=audit",
      }
    : {
        eyebrow: "UAE GRATUITY CALCULATOR",
        title: "What is your UAE settlement actually worth?",
        sub: "Enter your basic salary and years of service. See what UAE labour law says you're owed.",
        salaryLabel: "Monthly basic salary (AED)",
        yearsLabel: "Years of service",
        cta: "Calculate My Exposure →",
        resultLabel: "Estimated gratuity entitlement",
        warning: "⚠ If your settlement letter shows a different number, there's likely an error. Most letters we review have at least one.",
        bookCta: "Get your letter reviewed — AED 999 →",
        bookHref: `https://wa.me/[REAL NUMBER]?text=${encodeURIComponent("Hi Kaoutar, I'd like to book a settlement review — AED 999.")}`,
      };

  return (
    <section
      id="calculator"
      className="relative isolate overflow-hidden px-6 pb-20 pt-12 md:pb-28 md:pt-16"
      style={{ background: "#1E0A0E" }}
    >
      {/* Motion background — animated gradient orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 620,
            height: 620,
            top: "-15%",
            left: "-10%",
            background: "radial-gradient(circle, rgba(139,45,58,0.35), transparent 65%)",
          }}
          animate={prefersReducedMotion ? undefined : { x: [0, 80, 0], y: [0, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 520,
            height: 520,
            bottom: "-20%",
            right: "-10%",
            background: "radial-gradient(circle, rgba(212,168,130,0.18), transparent 65%)",
          }}
          animate={prefersReducedMotion ? undefined : { x: [0, -60, 0], y: [0, -30, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(237,216,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(237,216,184,0.5) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(circle at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center"
        >
          <p
            className="mb-5 text-[13px] font-medium uppercase tracking-[2.5px]"
            style={{ color: "rgba(212,168,130,0.7)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {copy.eyebrow}
          </p>
          <AnimatePresence mode="wait">
            <motion.h1
              key={copy.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
              className="text-[40px] font-semibold leading-tight md:text-[56px]"
              style={{ color: "#EDD8B8", fontFamily: "'Playfair Display', serif" }}
            >
              {copy.title}
            </motion.h1>
          </AnimatePresence>
          <p
            className="mx-auto mt-5 max-w-lg text-[16px] font-light leading-relaxed"
            style={{ color: "rgba(237,216,184,0.6)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {copy.sub}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl rounded-[20px] p-8 backdrop-blur-2xl md:p-10"
          style={{
            background: "linear-gradient(180deg, rgba(45,16,24,0.85) 0%, rgba(30,10,14,0.85) 100%)",
            border: "1px solid rgba(212,168,130,0.2)",
            boxShadow: "0 30px 80px -20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(237,216,184,0.06)",
          }}
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                className="mb-2 block text-[12px] font-medium"
                style={{ color: "#D4A882", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {copy.salaryLabel}
              </label>
              <input
                type="number"
                inputMode="numeric"
                min="0"
                placeholder="e.g. 25,000"
                value={salaryInput}
                onChange={(e) => setSalaryInput(e.target.value)}
                className="h-12 w-full rounded-lg px-4 text-base outline-none transition focus-visible:!border-[#D4A882] focus-visible:shadow-[0_0_0_3px_rgba(212,168,130,0.2)] md:text-sm"
                style={{
                  background: "rgba(212,168,130,0.06)",
                  border: "1px solid rgba(212,168,130,0.2)",
                  color: "#EDD8B8",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              />
            </div>
            <div>
              <label
                className="mb-2 block text-[12px] font-medium"
                style={{ color: "#D4A882", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {copy.yearsLabel}
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
                  if (val === "" || /^\d*\.?\d{0,1}$/.test(val)) setYearsInput(val);
                }}
                className="h-12 w-full rounded-lg px-4 text-base outline-none transition focus-visible:!border-[#D4A882] focus-visible:shadow-[0_0_0_3px_rgba(212,168,130,0.2)] md:text-sm"
                style={{
                  background: "rgba(212,168,130,0.06)",
                  border: "1px solid rgba(212,168,130,0.2)",
                  color: "#EDD8B8",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={handleCalculate}
              disabled={!canCalculate}
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:[outline:2px_solid_#EDD8B8] focus-visible:[outline-offset:2px] motion-safe:hover:scale-[1.02]"
              style={{
                background: "#8B2D3A",
                color: "#EDD8B8",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {copy.cta}
            </button>
          </div>

          {/* Result with cinematic reveal */}
          <div className="mt-10 text-center">
            <AnimatePresence mode="wait">
              {revealed ? (
                <motion.div
                  key="revealed"
                  initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className="text-[56px] font-semibold leading-none tabular-nums md:text-[72px]"
                    style={{
                      color: "#D4A882",
                      fontFamily: "'Playfair Display', serif",
                      textShadow: "0 0 60px rgba(212,168,130,0.35)",
                    }}
                    aria-live="polite"
                  >
                    {displayText}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.35 }}
                  exit={{ opacity: 0 }}
                  className="text-[56px] font-semibold leading-none tabular-nums md:text-[72px]"
                  style={{
                    color: "#D4A882",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  AED —
                </motion.div>
              )}
            </AnimatePresence>
            <p
              className="mt-2 text-[13px] font-light"
              style={{ color: "rgba(237,216,184,0.6)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {copy.resultLabel}
            </p>
            <p
              className="mx-auto mt-3 max-w-md text-[12px] font-light leading-relaxed"
              style={{ color: "rgba(237,216,184,0.45)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              MOHRE mainland formula. 21 days basic salary per year for first 5 years, 30 days after that.
            </p>
          </div>

          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mx-auto mt-8 max-w-lg rounded-lg p-4"
                style={{
                  background: "rgba(184,58,42,0.1)",
                  border: "1px solid rgba(184,58,42,0.3)",
                }}
              >
                <p
                  className="text-[13px] font-light leading-relaxed"
                  style={{ color: "#EDD8B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {copy.warning}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 text-center">
            <a
              href={copy.bookHref}
              target={copy.bookHref.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium transition hover:opacity-90 focus-visible:[outline:2px_solid_#1E0A0E] focus-visible:[outline-offset:2px]"
              style={{
                background: "#D4A882",
                color: "#1E0A0E",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {copy.bookCta}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
