import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { Lock, ShieldCheck } from "lucide-react";
import { generateRoadmapPDF } from "@/lib/generate-roadmap-pdf";
import { getExposureSnapshot } from "@/lib/exposure-store";

type Status = "idle" | "compiling" | "verified";

export function DirectorVault() {
  const [status, setStatus] = useState<Status>("idle");
  const progress = useMotionValue(0);
  const [progressText, setProgressText] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const pdfTriggered = useRef(false);

  // Spin the dial while compiling
  const dialRotate = useMotionValue(0);
  const dialAnimRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    const unsub = progress.on("change", (v) => setProgressText(Math.round(v)));
    return () => unsub();
  }, [progress]);

  const open = () => {
    if (status !== "idle") return;
    setStatus("compiling");
    pdfTriggered.current = false;
    progress.set(0);

    // Dial spin loop
    if (!prefersReducedMotion) {
      dialRotate.set(0);
      dialAnimRef.current = animate(dialRotate, 360 * 4, {
        duration: 3.4,
        ease: "linear",
      });
    }

    const duration = prefersReducedMotion ? 0.8 : 3.4;
    animate(progress, 100, {
      duration,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (v) => {
        // Kick off the heavy PDF generation slightly before reveal so save
        // dialog appears right at the "Verified" moment.
        if (!pdfTriggered.current && v >= 85) {
          pdfTriggered.current = true;
          setTimeout(() => {
            try {
              generateRoadmapPDF(getExposureSnapshot());
            } catch (err) {
              console.error("PDF generation failed", err);
            }
          }, 0);
        }
      },
      onComplete: () => {
        dialAnimRef.current?.stop();
        setStatus("verified");
      },
    });
  };

  const close = () => {
    setStatus("idle");
    progress.set(0);
    dialRotate.set(0);
  };

  return (
    <section className="bg-[#1E0A0E] px-6 pb-20">
      <div className="mx-auto max-w-4xl text-center">
        <button
          type="button"
          onClick={open}
          disabled={status !== "idle"}
          className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:[outline:2px_solid_#1E0A0E] focus-visible:[outline-offset:2px] motion-safe:hover:scale-[1.02]"
          style={{
            background: "#D4A882",
            color: "#1E0A0E",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          <Lock size={14} aria-hidden /> Compile Director Vault
        </button>
        <p
          className="mt-3 text-[12px] font-light"
          style={{ color: "rgba(237,216,184,0.45)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Generates your confidential 6-page compliance roadmap (PDF).
        </p>
      </div>

      <AnimatePresence>
        {status !== "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center px-6"
            style={{ background: "rgba(10,4,6,0.85)" }}
            onClick={status === "verified" ? close : undefined}
            role="dialog"
            aria-modal="true"
            aria-label="Compiling Director Vault"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", damping: 22, stiffness: 220 }}
              className="relative w-full max-w-md rounded-[20px] p-10 text-center"
              style={{
                background: "#2D1018",
                border: "1px solid rgba(212,168,130,0.25)",
                boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative mx-auto h-48 w-48">
                <VaultAnimation
                  status={status}
                  progress={progress}
                  dialRotate={dialRotate}
                />
              </div>

              <h3
                className="mt-8 text-[22px] font-semibold leading-tight"
                style={{ color: "#EDD8B8", fontFamily: "'Playfair Display', serif" }}
              >
                {status === "verified" ? "Vault Verified" : "Compiling Director Vault"}
              </h3>

              <div
                className="mt-3 font-semibold tabular-nums"
                style={{
                  color: status === "verified" ? "#7BC9A8" : "#D4A882",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 32,
                  letterSpacing: "-0.02em",
                }}
              >
                {status === "verified" ? "100%" : `${progressText}%`}
              </div>

              <p
                className="mx-auto mt-3 max-w-xs text-[13px] font-light leading-relaxed"
                style={{
                  color: "rgba(237,216,184,0.6)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {status === "verified"
                  ? "Your confidential roadmap has been signed and downloaded."
                  : "Cross-referencing MOHRE clauses, computing exposure bands, sealing the report…"}
              </p>

              {status === "verified" && (
                <button
                  type="button"
                  onClick={close}
                  className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition hover:opacity-90 focus-visible:[outline:2px_solid_#EDD8B8] focus-visible:[outline-offset:2px]"
                  style={{
                    background: "#D4A882",
                    color: "#1E0A0E",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  Close
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function VaultAnimation({
  status,
  progress,
  dialRotate,
}: {
  status: Status;
  progress: ReturnType<typeof useMotionValue<number>>;
  dialRotate: ReturnType<typeof useMotionValue<number>>;
}) {
  // Circular progress ring math
  const R = 86;
  const CIRC = 2 * Math.PI * R;
  const dashOffset = useTransform(progress, (v) => CIRC * (1 - v / 100));

  return (
    <div className="relative h-full w-full">
      {/* The Vault (compiling state) */}
      <AnimatePresence>
        {status === "compiling" && (
          <motion.svg
            key="vault"
            viewBox="0 0 200 200"
            className="absolute inset-0 h-full w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Outer progress ring track */}
            <circle
              cx="100"
              cy="100"
              r={R}
              fill="none"
              stroke="rgba(212,168,130,0.15)"
              strokeWidth="3"
            />
            {/* Outer progress ring fill */}
            <motion.circle
              cx="100"
              cy="100"
              r={R}
              fill="none"
              stroke="#D4A882"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              style={{ strokeDashoffset: dashOffset }}
              transform="rotate(-90 100 100)"
            />
            {/* Vault body */}
            <circle
              cx="100"
              cy="100"
              r="62"
              fill="#1E0A0E"
              stroke="rgba(212,168,130,0.4)"
              strokeWidth="1.5"
            />
            <circle
              cx="100"
              cy="100"
              r="54"
              fill="none"
              stroke="rgba(212,168,130,0.2)"
              strokeWidth="1"
              strokeDasharray="2 6"
            />
            {/* Rotating dial */}
            <motion.g style={{ rotate: dialRotate, transformOrigin: "100px 100px" }}>
              <circle cx="100" cy="100" r="42" fill="#2D1018" stroke="#D4A882" strokeWidth="1.5" />
              {/* Spokes */}
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <line
                  key={deg}
                  x1="100"
                  y1="58"
                  x2="100"
                  y2="68"
                  stroke="#D4A882"
                  strokeWidth="2"
                  strokeLinecap="round"
                  transform={`rotate(${deg} 100 100)`}
                />
              ))}
              {/* Handle */}
              <rect x="96" y="74" width="8" height="52" rx="4" fill="#D4A882" />
              <circle cx="100" cy="100" r="6" fill="#1E0A0E" stroke="#D4A882" strokeWidth="1.5" />
            </motion.g>
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Verified seal */}
      <AnimatePresence>
        {status === "verified" && (
          <motion.div
            key="verified"
            initial={{ scale: 0.4, opacity: 0, rotate: -15 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 14, stiffness: 220 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg viewBox="0 0 200 200" className="h-full w-full">
              {/* Outer ring */}
              <motion.circle
                cx="100"
                cy="100"
                r="86"
                fill="none"
                stroke="#7BC9A8"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ rotate: -90, transformOrigin: "100px 100px" }}
              />
              {/* Seal body */}
              <circle
                cx="100"
                cy="100"
                r="62"
                fill="rgba(123,201,168,0.08)"
                stroke="#7BC9A8"
                strokeWidth="1.5"
              />
              {/* Decorative inner dashes */}
              <circle
                cx="100"
                cy="100"
                r="54"
                fill="none"
                stroke="rgba(123,201,168,0.4)"
                strokeWidth="1"
                strokeDasharray="2 6"
              />
            </svg>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.25, type: "spring", damping: 12, stiffness: 260 }}
              className="absolute"
              style={{ color: "#7BC9A8" }}
            >
              <ShieldCheck size={64} strokeWidth={1.75} aria-hidden />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
