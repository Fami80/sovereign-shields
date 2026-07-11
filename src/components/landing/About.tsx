import { motion, useReducedMotion } from "framer-motion";
import kaoutarPhoto from "@/assets/kaoutar-photo.png";
import { fadeUp, portraitReveal, staggerGroup } from "@/components/motion/motionVariants";

const CREDENTIALS = [
  "ADP Payroll Partner of the Year (2017)",
  "14 years MENA payroll & compliance · 16,000+ employees · 400+ multinational clients",
  "Belgian · UK · UAE · DIFC · ADGM · Free Zones · KSA · Egypt",
  "Featured: Dubai Eye 103.8 · University of Sharjah · Dubai Municipality · Advisory Board HR MENA",
];

const DO_ITEMS = [
  "Review settlement letters against UAE law",
  "Identify gratuity, leave, and deduction errors",
  "Provide written findings you can act on",
  "Handle DIFC, ADGM, cross-border cases",
];

const DONT_ITEMS = [
  "Provide formal legal opinions",
  "Represent you in tribunal",
  "Advise on litigation strategy",
];

export function About() {
  const prefersReducedMotion = useReducedMotion();
  const initialState = prefersReducedMotion ? false : "hidden";

  return (
    <section id="about" className="relative overflow-hidden" style={{ backgroundColor: "var(--color-burg-deep)" }}>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <motion.h2
          initial={initialState}
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
          variants={fadeUp}
          className="max-w-3xl text-[40px] leading-tight"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-sand-light)" }}
        >
          I&apos;m not a lawyer. I&apos;m a compliance specialist, and that distinction matters.
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={initialState}
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={staggerGroup}
          >
            <motion.div variants={portraitReveal} className="relative mx-auto mb-8 h-[180px] w-[180px] md:mx-0 md:h-[280px] md:w-[280px]">
              <motion.div
                aria-hidden
                className="absolute inset-[-10px] rounded-full"
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: prefersReducedMotion ? 0 : 0.18 }}
                style={{
                  border: "1px solid rgba(212,168,130,0.18)",
                  boxShadow: "0 0 60px rgba(212,168,130,0.08)",
                }}
              />
              <img
                src={kaoutarPhoto}
                alt="Kaoutar Makrache"
                width={280}
                height={280}
                loading="lazy"
                className="relative block h-full w-full"
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  border: "2px solid rgba(212,168,130,0.3)",
                  boxShadow: "0 16px 40px rgba(30,10,14,0.4)",
                }}
              />
            </motion.div>

            <motion.h3
              variants={fadeUp}
              className="text-[28px] font-normal leading-tight"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-sand-warm)" }}
            >
              Kaoutar Makrache
            </motion.h3>
            <motion.div
              variants={fadeUp}
              className="mt-1 text-[14px] font-light"
              style={{ fontFamily: "var(--font-sans)", color: "rgba(237,216,184,0.55)" }}
            >
              Head of Payroll & Compliance · CHRM · CHRP · CIRS
            </motion.div>

            <motion.ul variants={staggerGroup} className="mt-6 space-y-3">
              {CREDENTIALS.map((credential) => (
                <motion.li key={credential} variants={fadeUp} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: "var(--color-sand-warm)" }}
                  />
                  <span
                    className="text-[14px] font-light leading-relaxed"
                    style={{ fontFamily: "var(--font-sans)", color: "rgba(237,216,184,0.65)" }}
                  >
                    {credential}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.blockquote
              variants={fadeUp}
              className="mt-8 text-[18px] italic leading-relaxed"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-sand-light)",
                backgroundColor: "rgba(212,168,130,0.06)",
                border: "1px solid rgba(212,168,130,0.2)",
                borderRadius: "12px",
                padding: "20px 24px",
              }}
            >
              &quot;Most settlement errors aren&apos;t deliberate. Employers make mistakes because they haven&apos;t updated their processes, not because they&apos;re trying to underpay you. My job is to find those mistakes and help both sides fix them.&quot;
            </motion.blockquote>
          </motion.div>

          <motion.div
            initial={initialState}
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={staggerGroup}
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <motion.div variants={fadeUp}>
                <h3
                  className="text-[14px] font-medium uppercase tracking-[2px]"
                  style={{ fontFamily: "var(--font-sans)", color: "var(--color-sand-warm)" }}
                >
                  What I do
                </h3>
                <ul className="mt-4 space-y-3">
                  {DO_ITEMS.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-[14px] font-light leading-relaxed"
                      style={{ fontFamily: "var(--font-sans)", color: "rgba(237,216,184,0.65)" }}
                    >
                      <span style={{ color: "var(--color-sand-warm)" }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={fadeUp}>
                <h3
                  className="text-[14px] font-medium uppercase tracking-[2px]"
                  style={{ fontFamily: "var(--font-sans)", color: "rgba(237,216,184,0.6)" }}
                >
                  What I don&apos;t do
                </h3>
                <ul className="mt-4 space-y-3">
                  {DONT_ITEMS.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-[14px] font-light leading-relaxed"
                      style={{ fontFamily: "var(--font-sans)", color: "rgba(237,216,184,0.55)" }}
                    >
                      <span>✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.a
              variants={fadeUp}
              href="/contact"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
              className="mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium"
              style={{
                fontFamily: "var(--font-sans)",
                backgroundColor: "var(--color-sand-warm)",
                color: "var(--color-burg-deep)",
              }}
            >
              Review my settlement →
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
