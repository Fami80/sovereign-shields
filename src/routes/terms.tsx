import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { SiteFooter } from "@/components/landing/SiteFooter";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | UAEworkrights" },
      { name: "description", content: "UAEworkrights terms of service — scope, pricing, turnaround, and liability." },
      { property: "og:title", content: "Terms of Service | UAEworkrights" },
      { property: "og:description", content: "UAEworkrights terms of service — scope, pricing, turnaround, and liability." },
      { property: "og:url", content: "https://uaeworkrights.com/terms" },
    ],
    links: [
      { rel: "canonical", href: "https://uaeworkrights.com/terms" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF3E8", color: "#1E0A0E" }}>
      <Navbar />
      <main className="mx-auto max-w-[720px] px-6 pb-24 pt-24">
        <h1
          className="font-display"
          style={{
            fontSize: "40px",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#1E0A0E",
          }}
        >
          Terms of Service
        </h1>

        <div className="mt-12 space-y-10">
          <section>
            <h2
              className="font-display"
              style={{
                fontSize: "24px",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                color: "#1E0A0E",
                marginBottom: "16px",
              }}
            >
              Scope of service
            </h2>
            <p className="font-sans" style={{ fontSize: "16px", lineHeight: 1.75, color: "rgba(30,10,14,0.75)" }}>
              UAEworkrights provides a compliance review service. We review settlement letters and employment documents against applicable UAE labour law to identify errors and underpayments. This service is not legal advice, and we do not:
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "Provide formal legal opinions",
                "Represent you in tribunal",
                "Advise on litigation strategy",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 font-sans"
                  style={{ fontSize: "16px", lineHeight: 1.6, color: "rgba(30,10,14,0.75)" }}
                >
                  <span style={{ color: "#D4A882" }}>✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-sans" style={{ fontSize: "16px", lineHeight: 1.75, color: "rgba(30,10,14,0.75)" }}>
              If you require legal representation or formal legal advice, we recommend engaging a licensed UAE lawyer.
            </p>
          </section>

          <section>
            <h2
              className="font-display"
              style={{
                fontSize: "24px",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                color: "#1E0A0E",
                marginBottom: "16px",
              }}
            >
              Pricing
            </h2>
            <ul className="space-y-3">
              {[
                { service: "Settlement review", price: "AED 999" },
                { service: "Knowledge base — 30-day access", price: "AED 199" },
                { service: "Employer compliance audit", price: "From AED 5,000" },
              ].map((item) => (
                <li
                  key={item.service}
                  className="flex justify-between font-sans"
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.6,
                    color: "rgba(30,10,14,0.75)",
                    borderBottom: "1px solid rgba(30,10,14,0.1)",
                    paddingBottom: "8px",
                  }}
                >
                  <span>{item.service}</span>
                  <span style={{ fontWeight: 600, color: "#1E0A0E" }}>{item.price}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-sans" style={{ fontSize: "16px", lineHeight: 1.75, color: "rgba(30,10,14,0.75)" }}>
              All fees are payable in advance unless otherwise agreed in writing. Prices are quoted in UAE Dirhams and are subject to change without notice; however, once a fee is quoted and accepted for a specific engagement, that fee is locked.
            </p>
          </section>

          <section>
            <h2
              className="font-display"
              style={{
                fontSize: "24px",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                color: "#1E0A0E",
                marginBottom: "16px",
              }}
            >
              Turnaround commitment
            </h2>
            <p className="font-sans" style={{ fontSize: "16px", lineHeight: 1.75, color: "rgba(30,10,14,0.75)" }}>
              We commit to delivering written settlement review findings within 48 hours of receiving all required documents and payment confirmation. This commitment applies during standard UAE business days (Sunday–Thursday). Submissions received on Thursday afternoon or Friday may be delivered by the following Sunday.
            </p>
          </section>

          <section>
            <h2
              className="font-display"
              style={{
                fontSize: "24px",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                color: "#1E0A0E",
                marginBottom: "16px",
              }}
            >
              Refund terms
            </h2>
            <p className="font-sans" style={{ fontSize: "16px", lineHeight: 1.75, color: "rgba(30,10,14,0.75)" }}>
              [KAOUTAR TO CONFIRM: refund policy details, e.g. whether refunds are available if the review has not yet started, partial refunds, or no refunds after delivery of findings.]
            </p>
          </section>

          <section>
            <h2
              className="font-display"
              style={{
                fontSize: "24px",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                color: "#1E0A0E",
                marginBottom: "16px",
              }}
            >
              Limitation of liability
            </h2>
            <p className="font-sans" style={{ fontSize: "16px", lineHeight: 1.75, color: "rgba(30,10,14,0.75)" }}>
              UAEworkrights' liability is limited to the amount paid for the specific service in question. We are not liable for any indirect, consequential, or punitive damages arising from the use of our findings, nor for any outcomes in negotiations, tribunals, or legal proceedings that may follow. Our review is advisory in nature; the decision to act on it rests with you.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
