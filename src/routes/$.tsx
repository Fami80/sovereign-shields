import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Page not found | UAEworkrights" },
      {
        name: "description",
        content:
          "This page doesn't exist. Head back to UAEworkrights to check your UAE settlement letter or book a compliance review.",
      },
    ],
  }),
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <div
      className="flex min-h-dvh items-center justify-center px-4"
      style={{ backgroundColor: "var(--color-burg-deep)" }}
    >
      <div className="max-w-md text-center">
        <h1
          className="font-display text-7xl font-bold"
          style={{ color: "var(--color-sand-light)", fontWeight: 700 }}
        >
          Page not found
        </h1>
        <p
          className="mt-4 font-sans"
          style={{ fontSize: 16, fontWeight: 300, color: "rgba(237,216,184,0.6)" }}
        >
          This page doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-colors hover:opacity-90"
            style={{ backgroundColor: "var(--color-sand-warm)", color: "var(--color-burg-deep)" }}
          >
            Back to UAEworkrights →
          </Link>
        </div>
      </div>
    </div>
  );
}
