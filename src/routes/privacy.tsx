import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { SiteFooter } from "@/components/landing/SiteFooter";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | UAEworkrights" },
      { name: "description", content: "UAEworkrights privacy policy: how we collect, store, and protect your data." },
      { property: "og:title", content: "Privacy Policy | UAEworkrights" },
      { property: "og:description", content: "UAEworkrights privacy policy: how we collect, store, and protect your data." },
      { property: "og:url", content: "https://uaeworkrights.com/privacy" },
    ],
    links: [
      { rel: "canonical", href: "https://uaeworkrights.com/privacy" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
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
          Privacy Policy
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
              What data we collect
            </h2>
            <p className="font-sans" style={{ fontSize: "16px", lineHeight: 1.75, color: "rgba(30,10,14,0.75)" }}>
              When you use UAEworkrights, we collect your name, email address, and any employment documents you submit for review (such as settlement letters, contracts, and payslips). We may also collect your WhatsApp number if you contact us through that channel.
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
              Why we collect it
            </h2>
            <p className="font-sans" style={{ fontSize: "16px", lineHeight: 1.75, color: "rgba(30,10,14,0.75)" }}>
              This data is collected solely to deliver the settlement review service you have requested. Your name and email allow us to communicate findings; your documents are the basis for the review itself.
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
              How we store and retain your data
            </h2>
            <p className="font-sans" style={{ fontSize: "16px", lineHeight: 1.75, color: "rgba(30,10,14,0.75)" }}>
              All documents and personal data are stored on secure, encrypted systems. When your written findings are delivered, we ask you to confirm receipt. Your documents and case materials are deleted 15 days after your confirmation. If we do not receive a confirmation, they are deleted 30 days after the findings were delivered.
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
              Data sharing
            </h2>
            <p className="font-sans" style={{ fontSize: "16px", lineHeight: 1.75, color: "rgba(30,10,14,0.75)" }}>
              Your documents and personal information are never shared with your employer, former employer, or any other party without your explicit written consent. The review is conducted confidentially and independently.
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
              Service providers we use
            </h2>
            <p className="font-sans" style={{ fontSize: "16px", lineHeight: 1.75, color: "rgba(30,10,14,0.75)" }}>
              To operate the service we rely on a small number of providers, each receiving only what it needs:
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "HubSpot (CRM): stores only the contact details you submit through the contact form — your name, email, WhatsApp number, and message — so we can manage your enquiry. Your employment documents are never uploaded to HubSpot.",
                "Zoom: consultations and review discussions take place over Zoom.",
                "Email: documents, including confidential case materials, are exchanged only by email, directly between you and us.",
                "Vercel: hosts this website.",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 font-sans"
                  style={{ fontSize: "16px", lineHeight: 1.6, color: "rgba(30,10,14,0.75)" }}
                >
                  <span style={{ color: "var(--color-sand-warm)" }}>·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
              Legal compliance
            </h2>
            <p className="font-sans" style={{ fontSize: "16px", lineHeight: 1.75, color: "rgba(30,10,14,0.75)" }}>
              UAEworkrights complies with UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (PDPL). We process your data lawfully, fairly, and transparently, and maintain appropriate technical and organisational measures to protect it.
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
              Your rights
            </h2>
            <p className="font-sans" style={{ fontSize: "16px", lineHeight: 1.75, color: "rgba(30,10,14,0.75)" }}>
              You have the right to request access to, correction of, or deletion of your personal data at any time. To exercise these rights, or if you have any privacy concerns, please reach us through the contact page or on WhatsApp.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
