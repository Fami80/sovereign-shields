import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Knowledge Base Access — AED 199 | UAEworkrights" },
      { name: "description", content: "Unlock 30-day access to the UAEworkrights knowledge base. UAE settlement guides by jurisdiction — mainland, DIFC, ADGM, free zones. AED 199." },
      { property: "og:title", content: "Knowledge Base Access — AED 199 | UAEworkrights" },
      { property: "og:description", content: "Unlock 30-day access to the UAEworkrights knowledge base. UAE settlement guides by jurisdiction — mainland, DIFC, ADGM, free zones. AED 199." },
      { property: "og:url", content: "https://uaeworkrights.com/checkout" },
    ],
    links: [
      { rel: "canonical", href: "https://uaeworkrights.com/checkout" },
    ],
  }),
  component: CheckoutPlaceholder,
});

function CheckoutPlaceholder() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-6 py-24"
      style={{ backgroundColor: "var(--color-burg-deep)" }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-10 text-center"
        style={{
          backgroundColor: "var(--color-burg-mid)",
          border: "1px solid rgba(212,168,130,0.2)",
        }}
      >
        <p
          className="text-[13px] font-medium uppercase tracking-[2.5px]"
          style={{ color: "var(--color-sand-muted)", letterSpacing: "3px" }}
        >
          SECURE CHECKOUT
        </p>
        <h1
          className="mt-4 font-display"
          style={{ fontSize: 32, color: "var(--color-sand-light)", fontWeight: 400, lineHeight: 1.05 }}
        >
          Checkout coming soon.
        </h1>
        <p
          className="mt-4 font-sans"
          style={{ fontSize: 14, color: "rgba(237,216,184,0.55)", fontWeight: 300, lineHeight: 1.75 }}
        >
          Payment processing is being set up. In the meantime, contact us directly to arrange access.
        </p>
        <Link
          to="/contact"
          search={{ type: "kb", message: "I'm interested in Knowledge Base access" }}
          className="mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 font-sans text-sm motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:hover:scale-[1.02] focus-visible:[outline:2px_solid_var(--color-burg-deep)] focus-visible:[outline-offset:2px]"
          style={{ backgroundColor: "var(--color-sand-warm)", color: "var(--color-burg-deep)", fontWeight: 500 }}
        >
          Contact us →
        </Link>
      </div>
    </main>
  );
}
