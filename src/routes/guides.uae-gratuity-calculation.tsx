import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { SiteFooter } from "@/components/landing/SiteFooter";

const CANONICAL = "https://uaeworkrights.com/guides/uae-gratuity-calculation";

const FAQ = [
  {
    q: "Is gratuity calculated on basic or gross salary?",
    a: "Basic salary only. Housing, transport, and other allowances are excluded. This is the single most common place settlement letters go wrong: a calculation quietly run on a lower figure, or an inflated \"basic\" that was never updated after a raise.",
  },
  {
    q: "Do I still get full gratuity if I resign?",
    a: "Yes. Under Federal Decree-Law 33/2021 (in force since February 2022), you receive your full gratuity whether you resign or are terminated. The old rule that reduced gratuity for resigning before 5 years no longer applies. If your letter applies a 'resignation reduction', it is using the old law.",
  },
  {
    q: "What if I worked less than one year?",
    a: "No gratuity is due below one full year of continuous service. But leave encashment, notice pay, and any unpaid salary are still owed to you regardless of length of service.",
  },
  {
    q: "Is there a maximum gratuity?",
    a: "Yes. Total gratuity is capped at two years' worth of pay, however long you served.",
  },
  {
    q: "Do unpaid leave days count toward my service period?",
    a: "No. Days of unpaid leave are excluded when calculating your period of continuous service, which can slightly lower the total.",
  },
  {
    q: "I work in DIFC. Does this guide apply to me?",
    a: "No. Since February 2020, DIFC employers pay monthly contributions into the DEWS scheme instead of end-of-service gratuity. You can check your balance through the Zurich portal. ADGM and some free zones also have their own frameworks.",
  },
];

export const Route = createFileRoute("/guides/uae-gratuity-calculation")({
  head: () => ({
    meta: [
      { title: "How UAE Gratuity Is Calculated: The Complete Guide | UAEworkrights" },
      { name: "description", content: "The MOHRE mainland gratuity formula step by step: 21 and 30 day rules, basic vs gross salary, the 1-year and 2-year rules, resignation under FDL 33/2021, and a worked example." },
      { property: "og:title", content: "How UAE Gratuity Is Calculated: The Complete Guide" },
      { property: "og:description", content: "The MOHRE mainland gratuity formula step by step: 21 and 30 day rules, basic vs gross salary, the 1-year and 2-year rules, resignation under FDL 33/2021, and a worked example." },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              "@id": `${CANONICAL}#article`,
              headline: "How UAE gratuity is calculated: the complete guide",
              description:
                "The MOHRE mainland gratuity formula step by step: 21 and 30 day rules, basic vs gross salary, the 1-year and 2-year rules, resignation under FDL 33/2021, and a worked example.",
              author: {
                "@type": "Person",
                name: "Kaoutar Makrache",
                jobTitle: "Head of Payroll & Compliance",
              },
              publisher: { "@id": "https://uaeworkrights.com/#organization" },
              mainEntityOfPage: CANONICAL,
              inLanguage: "en",
            },
            {
              "@type": "FAQPage",
              "@id": `${CANONICAL}#faq`,
              mainEntity: FAQ.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://uaeworkrights.com/" },
                { "@type": "ListItem", position: 2, name: "UAE gratuity calculation guide", item: CANONICAL },
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: GratuityGuidePage,
});

const INK = "rgba(30,10,14,0.75)";

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-display"
      style={{
        fontSize: "26px",
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
        color: "var(--color-burg-deep)",
        marginBottom: "14px",
      }}
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans" style={{ fontSize: "16px", lineHeight: 1.75, color: INK }}>
      {children}
    </p>
  );
}

function Ul({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-3 font-sans"
          style={{ fontSize: "16px", lineHeight: 1.6, color: INK }}
        >
          <span aria-hidden style={{ color: "var(--color-sand-warm)" }}>·</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function GratuityGuidePage() {
  return (
    <div className="min-h-dvh" style={{ backgroundColor: "var(--color-sand-pale)", color: "var(--color-burg-deep)" }}>
      <Navbar />
      <main className="mx-auto max-w-[720px] px-6 pb-24 pt-20">
        <p
          className="text-[13px] font-medium uppercase tracking-[2.5px]"
          style={{ fontFamily: "var(--font-sans)", color: "var(--color-burg-acc)" }}
        >
          FREE GUIDE · MAINLAND UAE
        </p>
        <h1
          className="mt-4 font-display"
          style={{
            fontSize: "38px",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "var(--color-burg-deep)",
          }}
        >
          How UAE gratuity is calculated: the complete guide
        </h1>
        <p className="mt-5 font-sans" style={{ fontSize: "17px", lineHeight: 1.75, color: INK }}>
          If you've just received a settlement or end-of-service letter, the gratuity line is
          where most errors hide. This guide walks through the mainland (MOHRE) formula under
          Federal Decree-Law No. 33 of 2021, in plain language, with a worked example, so you
          can check the number yourself before you sign anything.
        </p>

        {/* Formula at a glance */}
        <div
          className="mt-10 rounded-2xl p-7"
          style={{ backgroundColor: "var(--color-burg-deep)" }}
        >
          <p
            className="text-[12px] font-medium uppercase tracking-[2px]"
            style={{ fontFamily: "var(--font-sans)", color: "var(--color-sand-warm)" }}
          >
            THE FORMULA AT A GLANCE
          </p>
          <ul className="mt-4 space-y-2.5">
            {[
              "21 days of basic salary for each of your first 5 years of service",
              "30 days of basic salary for each year after the fifth",
              "One daily wage = monthly basic salary ÷ 30",
              "Pro-rated for part years · requires at least 1 full year of service",
              "Capped at 2 years' total pay",
            ].map((t) => (
              <li
                key={t}
                className="flex gap-3 font-sans"
                style={{ fontSize: "15px", lineHeight: 1.6, color: "rgba(237,216,184,0.85)" }}
              >
                <span aria-hidden style={{ color: "var(--color-sand-warm)" }}>✓</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 space-y-12">
          <section>
            <H2>First: are you eligible?</H2>
            <P>
              Gratuity is due after <strong>one full year of continuous service</strong> (Article
              51, FDL 33/2021). Below one year, no gratuity is owed, but don't stop reading your
              letter there: unpaid salary, leave encashment, and notice pay are owed regardless of
              how long you worked.
            </P>
          </section>

          <section>
            <H2>Basic salary, not gross: where most letters go wrong</H2>
            <P>
              Gratuity is calculated on your <strong>basic salary only</strong>: housing,
              transport, and other allowances are excluded. Two errors to watch for. First, some
              letters quietly use a number lower than your actual contractual basic. Second, if
              you had raises, the calculation must use your <strong>last</strong> basic salary,
              not an old one. Check the basic salary shown on your letter against your most recent
              contract or salary certificate.
            </P>
          </section>

          <section>
            <H2>The calculation, step by step</H2>
            <Ul
              items={[
                <>Work out your daily wage: <strong>monthly basic ÷ 30</strong>.</>,
                <>For each of the first 5 years of service: <strong>21 days</strong> of that daily wage.</>,
                <>For each year beyond 5: <strong>30 days</strong> per year.</>,
                <>Part years count pro-rata (e.g. 3.5 years = 3 years + half of a year's entitlement).</>,
                <>Cap the total at 2 years' pay.</>,
              ]}
            />
            <div
              className="mt-6 rounded-xl p-6"
              style={{ backgroundColor: "rgba(139,45,58,0.06)", border: "1px solid rgba(139,45,58,0.15)" }}
            >
              <p
                className="text-[12px] font-medium uppercase tracking-[2px]"
                style={{ fontFamily: "var(--font-sans)", color: "var(--color-burg-acc)" }}
              >
                WORKED EXAMPLE
              </p>
              <p className="mt-3 font-sans" style={{ fontSize: "15px", lineHeight: 1.8, color: INK }}>
                Basic salary AED 12,000 · 7 years of service.
                <br />
                Daily wage: 12,000 ÷ 30 = <strong>AED 400</strong>
                <br />
                First 5 years: 21 days × 5 × 400 = <strong>AED 42,000</strong>
                <br />
                Years 6–7: 30 days × 2 × 400 = <strong>AED 24,000</strong>
                <br />
                Total gratuity: <strong>AED 66,000</strong> (well under the 2-year cap of AED
                288,000).
              </p>
            </div>
            <p className="mt-4 font-sans" style={{ fontSize: "15px", lineHeight: 1.7, color: INK }}>
              Want your own numbers?{" "}
              <Link
                to="/"
                hash="calculator"
                className="font-medium underline decoration-[var(--color-sand-warm)] decoration-2 underline-offset-2"
                style={{ color: "var(--color-burg-acc)" }}
              >
                Use the free gratuity calculator
              </Link>
              .
            </p>
          </section>

          <section>
            <H2>Resigning? You still get the full amount</H2>
            <P>
              This is the change most people, and some employers, haven't caught up with. Under
              the old law, resigning before 5 years reduced your gratuity to a fraction. Federal
              Decree-Law 33/2021 <strong>removed that reduction</strong>: since February 2022, you
              receive the full calculation whether you resigned or were terminated. If your
              settlement letter applies a resignation penalty, it is applying a law that no longer
              exists.
            </P>
          </section>

          <section>
            <H2>What can legitimately lower the number</H2>
            <Ul
              items={[
                <><strong>Unpaid leave</strong>: days of unpaid leave don't count toward your service period.</>,
                <><strong>Amounts you owe your employer</strong>: documented debts (e.g. a salary advance) can be deducted from the end-of-service settlement.</>,
                <><strong>The 2-year cap</strong>: total gratuity can't exceed two years' pay.</>,
              ]}
            />
            <p className="mt-4 font-sans" style={{ fontSize: "16px", lineHeight: 1.75, color: INK }}>
              What <em>cannot</em> lower it: visa costs, recruitment fees, or training costs your
              employer chose to invest in you. These are generally the employer's to bear.
            </p>
          </section>

          <section>
            <H2>DIFC, ADGM, and free zones are different</H2>
            <P>
              Everything above applies to mainland UAE (MOHRE) employment. In <strong>DIFC</strong>,
              gratuity was replaced in 2020 by the DEWS scheme: your employer pays monthly
              contributions into a savings plan instead, and you can check the balance in the
              Zurich portal. <strong>ADGM</strong> and several free zones have their own
              employment frameworks. If your contract is in one of these jurisdictions, the
              mainland formula on your letter may itself be the error.
            </P>
          </section>

          <section>
            <H2>Before you sign: a 60-second check</H2>
            <Ul
              items={[
                "Is the basic salary on the letter your actual, latest basic?",
                "Does the service period match your start date (minus any unpaid leave)?",
                "Are the 21-day and 30-day bands applied correctly?",
                "If you resigned: is there an outdated 'resignation reduction'?",
                "Are leave encashment and notice pay shown as separate lines, not silently netted off?",
                "Are any deductions itemised and actually lawful?",
              ]}
            />
          </section>

          <section>
            <H2>Frequently asked questions</H2>
            <div className="mt-4 space-y-6">
              {FAQ.map((f) => (
                <div key={f.q}>
                  <h3
                    className="font-sans"
                    style={{ fontSize: "17px", fontWeight: 600, color: "var(--color-burg-deep)", fontStyle: "normal" }}
                  >
                    {f.q}
                  </h3>
                  <p className="mt-1.5 font-sans" style={{ fontSize: "15px", lineHeight: 1.7, color: INK }}>
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section
            className="rounded-2xl p-8 text-center"
            style={{ backgroundColor: "var(--color-burg-deep)" }}
          >
            <h2
              className="font-display"
              style={{ fontSize: "24px", fontWeight: 400, lineHeight: 1.25, color: "var(--color-sand-light)" }}
            >
              Numbers not adding up?
            </h2>
            <p
              className="mx-auto mt-3 max-w-md font-sans"
              style={{ fontSize: "14px", fontWeight: 300, lineHeight: 1.7, color: "rgba(237,216,184,0.7)" }}
            >
              Kaoutar personally checks your settlement letter against UAE Labour Law: every
              line, your jurisdiction, with written findings in 48 hours. AED 999 flat.
            </p>
            <a
              href={`https://wa.me/971547736565?text=${encodeURIComponent("Hi Kaoutar, I'd like to book a settlement review — AED 999.")}`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-full px-7 py-3.5 font-sans text-sm motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.97] focus-visible:[outline:2px_solid_var(--color-sand-light)] focus-visible:[outline-offset:2px]"
              style={{ backgroundColor: "var(--color-sand-warm)", color: "var(--color-burg-deep)", fontWeight: 500 }}
            >
              Review my settlement →
            </a>
          </section>

          <p className="font-sans" style={{ fontSize: "13px", lineHeight: 1.6, color: "rgba(30,10,14,0.7)" }}>
            This guide is general information about mainland UAE employment, not legal advice.
            Last reviewed July 2026 against Federal Decree-Law No. 33 of 2021.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
