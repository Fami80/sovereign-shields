import { Link } from "@tanstack/react-router";

const FOOTER_COLS = [
  {
    title: "SERVICES",
    links: [
      { label: "Settlement reviews", href: "/#features" },
      { label: "Employer compliance", href: "/contact?type=audit" },
      { label: "Knowledge base", href: "/#knowledge" },
      { label: "Free gratuity guide", href: "/guides/uae-gratuity-calculation" },
      { label: "Free zones explained", href: "/guides/free-zone-employment-law" },
      { label: "Executive Shield guide", href: "/executive-shield" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About", href: "/#about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    title: "SOCIAL",
    links: [
      { label: "Instagram", href: "https://instagram.com/uaeworkrights" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/uaeworkrights/" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer style={{ backgroundColor: "var(--color-burg-mid)" }}>
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-6">
          <div className="md:col-span-2">
            <div
              className="font-display text-xl tracking-tight"
              style={{ color: "var(--color-sand-warm)", fontWeight: 600 }}
            >
              UAEwork<span style={{ fontStyle: "italic" }}>rights</span>
            </div>
            <p
              className="mt-3 max-w-xs font-sans"
              style={{
                fontSize: 13,
                fontWeight: 300,
                color: "rgba(237,216,184,0.55)",
                lineHeight: 1.6,
              }}
            >
              UAE employment compliance. Settlement reviews, rights guidance, and cross-border
              expertise for employees and employers.
            </p>
            <div
              className="mt-5 inline-flex items-center rounded-full px-3 py-1.5 font-sans text-xs font-medium"
              style={{
                backgroundColor: "rgba(212,168,130,0.1)",
                color: "rgba(237,216,184,0.6)",
                border: "1px solid rgba(212,168,130,0.15)",
              }}
            >
              Available remotely across all UAE
            </div>
            <p
              className="mt-3 font-sans"
              style={{
                fontSize: 12,
                fontWeight: 300,
                color: "rgba(237,216,184,0.55)",
              }}
            >
              Dubai · Abu Dhabi · Sharjah · Ajman · RAK · Fujairah · UAQ
            </p>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <div
                className="font-sans text-xs font-medium uppercase tracking-[0.16em]"
                style={{ color: "rgba(237,216,184,0.55)" }}
              >
                {col.title}
              </div>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) =>
                  link.href.startsWith("http") ? (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-sans text-xs transition-colors hover:opacity-80 focus-visible:underline focus-visible:decoration-[2px] focus-visible:decoration-[var(--color-sand-warm)]"
                        style={{ color: "rgba(237,216,184,0.55)" }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="font-sans text-xs transition-colors hover:opacity-80 focus-visible:underline focus-visible:decoration-[2px] focus-visible:decoration-[var(--color-sand-warm)]"
                        style={{ color: "rgba(237,216,184,0.55)" }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6" style={{ borderTop: "1px solid rgba(212,168,130,0.08)" }}>
          <p
            className="font-sans"
            style={{
              fontSize: 11,
              fontWeight: 300,
              color: "rgba(237,216,184,0.55)",
            }}
          >
            © 2026 UAEworkrights. UAE employment compliance.
          </p>
        </div>
      </div>
    </footer>
  );
}
