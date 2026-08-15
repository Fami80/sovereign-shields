import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { SiteFooter } from "@/components/landing/SiteFooter";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | UAEworkrights" },
      { name: "description", content: "UAEworkrights terms of service: scope, pricing, turnaround, and liability." },
      { property: "og:title", content: "Terms of Service | UAEworkrights" },
      { property: "og:description", content: "UAEworkrights terms of service: scope, pricing, turnaround, and liability." },
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
    <div className="min-h-dvh" style={{ backgroundColor: "var(--color-sand-pale)", color: "var(--color-burg-deep)" }}>
      <Navbar />
      <main className="mx-auto max-w-[720px] px-6 pb-24 pt-24">
        <h1
          className="font-display"
          style={{
            fontSize: "40px",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--color-burg-deep)",
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
                color: "var(--color-burg-deep)",
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
                  <span style={{ color: "var(--color-sand-warm)" }}>✗</span>
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
                color: "var(--color-burg-deep)",
                marginBottom: "16px",
              }}
            >
              Pricing
            </h2>
            <ul className="space-y-3">
              {[
                { service: "Employment Contract & Settlement Review", price: "AED 999" },
                { service: "Self-Review Knowledge Base, 30-day access", price: "AED 199" },
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
                  <span style={{ fontWeight: 600, color: "var(--color-burg-deep)" }}>{item.price}</span>
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
                color: "var(--color-burg-deep)",
                marginBottom: "16px",
              }}
            >
              Turnaround commitment
            </h2>
            <p className="font-sans" style={{ fontSize: "16px", lineHeight: 1.75, color: "rgba(30,10,14,0.75)" }}>
              We commit to delivering written employment contract or settlement review findings within 48 hours of receiving all required documents and payment confirmation. This commitment applies during standard UAE business days (Sunday–Thursday). Submissions received on Thursday afternoon or Friday may be delivered by the following Sunday.
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
                color: "var(--color-burg-deep)",
                marginBottom: "16px",
              }}
            >
              Refund and cancellation policy
            </h2>
            <p className="font-sans" style={{ fontSize: "16px", lineHeight: 1.75, color: "rgba(30,10,14,0.75)" }}>
              Payment is requested only after we accept your case and before the review begins. You may
              cancel and receive a full refund at any time before we begin reviewing your documents.
            </p>
            <p className="mt-4 font-sans" style={{ fontSize: "16px", lineHeight: 1.75, color: "rgba(30,10,14,0.75)" }}>
              Once the review has started, the fee is non-refundable because professional analysis and
              case-specific work have commenced. This does not limit any rights you may have under
              applicable UAE law.
            </p>
            <p className="mt-4 font-sans" style={{ fontSize: "16px", lineHeight: 1.75, color: "rgba(30,10,14,0.75)" }}>
              If we cannot provide the agreed service, or if the service delivered is materially
              defective, please contact us through the details provided on our{" "}
              <a
                href="/contact"
                className="font-medium underline decoration-1 underline-offset-2 transition-opacity duration-150 hover:opacity-80"
                style={{ color: "var(--color-burg-acc)" }}
              >
                Contact page
              </a>
              . Any approved refund will be returned using the original payment method.
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
                color: "var(--color-burg-deep)",
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
