import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerGroup } from "@/components/motion/motionVariants";

const jurisdictions = ["MOHRE", "DIFC", "ADGM", "Free Zones", "Cross-border"];

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const initialState = prefersReducedMotion ? false : "hidden";

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--color-burg-deep)", color: "var(--color-sand-light)" }}
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[680px] w-[680px] opacity-90"
        viewBox="0 0 680 680"
        fill="none"
      >
        {[120, 200, 280, 360, 440, 520].map((r, index) => (
          <motion.circle
            key={r}
            cx="340"
            cy="340"
            r={r}
            stroke="rgba(139,45,58,0.30)"
            strokeWidth="1"
            fill="none"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: prefersReducedMotion ? 0 : index * 0.07 }}
            style={{ transformOrigin: "340px 340px" }}
          />
        ))}
      </svg>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-[80px] hidden lg:flex"
        initial={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: prefersReducedMotion ? 0 : 0.35 }}
        style={{ right: "-120px", width: "45%", zIndex: 0 }}
      >
        <div
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: "680px",
            fontWeight: 700,
            lineHeight: 0.7,
            color: "rgba(212,168,130,0.11)",
            userSelect: "none",
          }}
        >
          ‟
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-[80px] hidden lg:flex"
        initial={initialState}
        animate="visible"
        variants={staggerGroup}
        style={{ right: 0, width: "35%", zIndex: 1 }}
      >
        <div style={{ textAlign: "left" }}>
          <motion.div variants={fadeUp} style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, lineHeight: 1 }}>
            <span style={{ fontSize: "150px", color: "rgba(212,168,130,0.30)" }}>33</span>
            <span style={{ fontSize: "68px", color: "rgba(212,168,130,0.24)" }}>/2021</span>
          </motion.div>
          <motion.div
            variants={{
              hidden: { scaleX: 0 },
              visible: { scaleX: 1, transition: { duration: 0.65, delay: 0.1 } },
            }}
            style={{
              width: "120px",
              height: "1px",
              backgroundColor: "rgba(212,168,130,0.5)",
              margin: "16px 0",
              transformOrigin: "left",
            }}
          />
          <motion.ul variants={staggerGroup} style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {jurisdictions.map((jurisdiction) => (
              <motion.li
                key={jurisdiction}
                variants={fadeUp}
                style={{
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize: "15px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "rgba(237,216,184,0.55)",
                  lineHeight: 2.8,
                }}
              >
                {jurisdiction}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
        <motion.div
          className="flex flex-col items-start"
          style={{ maxWidth: "720px" }}
          variants={staggerGroup}
          initial={initialState}
          animate="visible"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center font-sans"
            style={{
              fontSize: "13px",
              letterSpacing: "3px",
              border: "1px solid rgba(212,168,130,0.25)",
              color: "var(--color-sand-muted)",
              padding: "6px 14px",
              borderRadius: "999px",
              fontWeight: 500,
            }}
          >
            CONFIDENTIAL UAE EMPLOYMENT REVIEW
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-8 max-w-4xl font-display tracking-tight text-[40px] md:text-6xl"
            style={{ fontWeight: 400, lineHeight: 1.05 }}
          >
            <span style={{ color: "var(--color-sand-light)" }}>Your settlement letter is</span>
            <br />
            <span style={{ color: "var(--color-sand-warm)", fontStyle: "italic", fontWeight: 400 }}>probably wrong.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 font-sans"
            style={{
              maxWidth: "600px",
              fontSize: "18px",
              fontWeight: 300,
              lineHeight: 1.75,
              color: "rgba(237,216,184,0.6)",
            }}
          >
            Most settlement letters we review contain an error. The average underpayment is AED 4,200. Know exactly what you&apos;re owed.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={`https://wa.me/971547736565?text=${encodeURIComponent("Hi Kaoutar, I'd like to book a settlement review — AED 999.")}`}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-sans motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.97] focus-visible:[outline:2px_solid_var(--color-sand-light)] focus-visible:[outline-offset:2px] sm:w-auto"
              style={{ backgroundColor: "var(--color-sand-warm)", color: "var(--color-burg-deep)", fontWeight: 500, fontSize: "14px" }}
            >
              Review my settlement
              <ArrowRight className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5" />
            </a>
            <a
              href="/contact?type=audit"
              className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full px-6 py-3.5 font-sans motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.97] focus-visible:[outline:2px_solid_var(--color-sand-warm)] focus-visible:[outline-offset:2px] sm:w-auto"
              style={{
                border: "1px solid rgba(212,168,130,0.4)",
                color: "var(--color-sand-light)",
                fontWeight: 500,
                fontSize: "14px",
                backgroundColor: "transparent",
              }}
            >
              Book a compliance audit
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-20 grid grid-cols-1 gap-6 pt-8 sm:grid-cols-2 md:grid-cols-4"
          style={{ borderTop: "1px solid rgba(212,168,130,0.1)" }}
          variants={staggerGroup}
          initial={initialState}
          animate="visible"
        >
          {["AED 999 flat fee", "Every UAE jurisdiction", "48-hour turnaround", "Written summary included"].map((item) => (
            <motion.div
              key={item}
              variants={fadeUp}
              className="font-sans"
              style={{ fontSize: "13px", fontWeight: 300, color: "rgba(237,216,184,0.6)" }}
            >
              <span style={{ color: "var(--color-sand-warm)", marginRight: "8px" }}>✓</span>
              {item}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
