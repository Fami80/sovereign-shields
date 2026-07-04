import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { SiteFooter } from "@/components/landing/SiteFooter";

const CANONICAL = "https://uaeworkrights.com/guides/free-zone-employment-law";
const INK = "rgba(30,10,14,0.75)";

export const Route = createFileRoute("/guides/free-zone-employment-law")({
  head: () => ({
    meta: [
      { title: "Do Free Zones Have Their Own Employment Law? The Actual Answer | UAEworkrights" },
      { name: "description", content: "JAFZA, DMCC, DAFZA and most UAE free zones follow federal law (FDL 33/2021). Exactly two exceptions — DIFC and ADGM — change your gratuity, courts, and non-compete rules. Here's the one-line test." },
      { property: "og:title", content: "Do Free Zones Have Their Own Employment Law? Here's the Actual Answer" },
      { property: "og:description", content: "JAFZA, DMCC, DAFZA and most UAE free zones follow federal law (FDL 33/2021). Exactly two exceptions — DIFC and ADGM — change your gratuity, courts, and non-compete rules." },
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
              headline: "Do free zones have their own employment law? Here's the actual answer",
              description:
                "JAFZA, DMCC, DAFZA and most UAE free zones follow federal law (FDL 33/2021). Exactly two exceptions — DIFC and ADGM — change your gratuity, courts, and non-compete rules.",
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
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://uaeworkrights.com/" },
                { "@type": "ListItem", position: 2, name: "Free zone employment law", item: CANONICAL },
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: FreeZoneGuidePage,
});

function FreeZoneGuidePage() {
  return (
    <div className="min-h-dvh" style={{ backgroundColor: "var(--color-sand-pale)", color: "var(--color-burg-deep)" }}>
      <Navbar />
      <main className="mx-auto max-w-[720px] px-6 pb-24 pt-20">
        <p
          className="text-[13px] font-medium uppercase tracking-[2.5px]"
          style={{ fontFamily: "var(--font-sans)", color: "var(--color-burg-acc)" }}
        >
          FREE GUIDE · FREE ZONES
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
          Do free zones have their own employment law? Here's the actual answer
        </h1>
        <p className="mt-5 font-sans" style={{ fontSize: "17px", lineHeight: 1.75, color: INK }}>
          Most guidance on this stops at "it depends" — here's the specific answer.
        </p>

        <div className="mt-10 space-y-10">
          <section>
            <p className="font-sans" style={{ fontSize: "16px", lineHeight: 1.75, color: INK }}>
              The vast majority of UAE free zones — <strong>JAFZA, DMCC, DAFZA</strong>, and most
              others — follow the same federal law as mainland UAE:{" "}
              <strong>Federal Decree-Law No. 33 of 2021</strong>. If you work for a company
              registered in one of these zones, your gratuity, notice period, and termination
              rights are calculated exactly the same way as a mainland employee's.
            </p>
          </section>

          <section>
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
              The two exceptions: DIFC and ADGM
            </h2>
            <p className="font-sans" style={{ fontSize: "16px", lineHeight: 1.75, color: INK }}>
              These are financial free zones with their own independent employment law, built on
              common law principles rather than UAE Labour Law. If your employer is registered in
              DIFC or ADGM:
            </p>
            <ul className="mt-4 space-y-2.5">
              {[
                <>Your end-of-service benefit likely isn't calculated as traditional gratuity at all — DIFC uses <strong>DEWS</strong> (a funded savings scheme with employer contributions), and ADGM has adopted a similar model.</>,
                <>Disputes go to the <strong>DIFC Courts or ADGM Courts</strong>, not MOHRE or the mainland labour courts.</>,
                <>Non-compete clauses are assessed differently — common law courts tend to enforce them more readily than UAE Labour Law does.</>,
              ].map((item, i) => (
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
          </section>

          <section
            className="rounded-xl p-6"
            style={{ backgroundColor: "rgba(139,45,58,0.06)", border: "1px solid rgba(139,45,58,0.15)" }}
          >
            <p
              className="text-[12px] font-medium uppercase tracking-[2px]"
              style={{ fontFamily: "var(--font-sans)", color: "var(--color-burg-acc)" }}
            >
              THE ONE-LINE TEST
            </p>
            <p className="mt-3 font-sans" style={{ fontSize: "16px", lineHeight: 1.75, color: INK }}>
              If your offer letter or contract doesn't specifically mention DIFC or ADGM, you're
              almost certainly under the same federal law as everyone else — regardless of which
              free zone your employer is registered in.
            </p>
          </section>

          <section>
            <p className="font-sans" style={{ fontSize: "14px", lineHeight: 1.7, color: "rgba(30,10,14,0.6)", fontStyle: "italic" }}>
              This is general guidance, not a substitute for a review of your specific contract —
              if you're not sure which framework applies to you, that's exactly what a contract or
              settlement review checks.
            </p>
            <p className="mt-4 font-sans" style={{ fontSize: "15px", lineHeight: 1.7, color: INK }}>
              Working out your end-of-service numbers?{" "}
              <Link
                to="/guides/uae-gratuity-calculation"
                className="font-medium underline decoration-[var(--color-sand-warm)] decoration-2 underline-offset-2"
                style={{ color: "var(--color-burg-acc)" }}
              >
                Read the gratuity calculation guide
              </Link>
              .
            </p>
          </section>

          {/* CTA */}
          <section className="rounded-2xl p-8 text-center" style={{ backgroundColor: "var(--color-burg-deep)" }}>
            <h2
              className="font-display"
              style={{ fontSize: "24px", fontWeight: 400, lineHeight: 1.25, color: "var(--color-sand-light)" }}
            >
              Not sure which applies to you?
            </h2>
            <p
              className="mx-auto mt-3 max-w-md font-sans"
              style={{ fontSize: "14px", fontWeight: 300, lineHeight: 1.7, color: "rgba(237,216,184,0.7)" }}
            >
              Kaoutar reviews your contract clause by clause against the framework that actually
              governs it — DIFC, ADGM, free zone, or mainland. Written findings in 48 hours.
            </p>
            <a
              href={`https://wa.me/971547736565?text=${encodeURIComponent("Hi Kaoutar, I'd like to book a contract review — AED 2,000.")}`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-full px-7 py-3.5 font-sans text-sm motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.97] focus-visible:[outline:2px_solid_var(--color-sand-light)] focus-visible:[outline-offset:2px]"
              style={{ backgroundColor: "var(--color-sand-warm)", color: "var(--color-burg-deep)", fontWeight: 500 }}
            >
              Review my contract →
            </a>
          </section>

          <p className="font-sans" style={{ fontSize: "13px", lineHeight: 1.6, color: "rgba(30,10,14,0.55)" }}>
            This guide is general information, not legal advice. Last reviewed July 2026 against
            Federal Decree-Law No. 33 of 2021.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
