import { emitUi, smoothScrollTo } from "@/lib/ui-store";

type Link = { label: string; onClick?: () => void; href?: string };

const COLS: { title: string; links: Link[] }[] = [
  {
    title: "For Employees",
    links: [
      { label: "Settlement Review", onClick: () => smoothScrollTo("#features") },
      { label: "Gratuity Calculator", onClick: () => smoothScrollTo("#calculator") },
      { label: "Arbitrary Dismissal", onClick: () => smoothScrollTo("#calculator") },
      { label: "MOHRE Guidance", onClick: () => smoothScrollTo("#knowledge") },
    ],
  },
  {
    title: "For Employers",
    links: [
      { label: "Compliance Audit", onClick: () => smoothScrollTo("#features") },
      { label: "Termination Playbook", onClick: () => smoothScrollTo("#vault") },
      { label: "DIFC / ADGM Counsel", onClick: () => smoothScrollTo("#knowledge") },
      { label: "Boardroom Opinions", onClick: () => smoothScrollTo("#vault") },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Sovereign", onClick: () => emitUi("open-about") },
      { label: "Our Methodology", onClick: () => emitUi("open-about") },
      { label: "Contact Desk", onClick: () => emitUi("open-contact") },
      { label: "Knowledge Base", onClick: () => smoothScrollTo("#knowledge") },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Engagement", href: "#" },
      { label: "Confidentiality Charter", href: "#" },
      { label: "Regulatory Notices", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-bg-dark pt-20 pb-32 text-text-dark-primary md:pb-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          <div className="md:col-span-1">
            <div className="text-xl font-extrabold tracking-tight">
              UAE WORKRIGHTS<span className="text-action-accent">.</span>
            </div>
            <p className="mt-3 text-sm text-text-muted-dark">Powered by Sovereign. UAE Labour Law, decoded for both sides.</p>
            <div className="mt-5 inline-flex items-center rounded-full bg-action-accent px-3 py-1 text-xs font-bold text-bg-dark">
              AED 499
            </div>
            <a
              href="https://www.linkedin.com/company/uaeworkrights/"
              target="_blank"
              rel="noreferrer"
              className="mt-5 block text-xs text-text-muted-dark transition-colors hover:text-action-accent"
            >
              LinkedIn → @uaeworkrights
            </a>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-text-dark-primary">{c.title}</div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    {l.onClick ? (
                      <button
                        onClick={l.onClick}
                        className="text-left text-sm text-text-muted-dark transition-colors hover:text-action-accent"
                      >
                        {l.label}
                      </button>
                    ) : (
                      <a
                        href={l.href ?? "#"}
                        className="text-sm text-text-muted-dark transition-colors hover:text-action-accent"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="text-xs text-text-muted-dark">
            Available remotely across all UAE Emirates (Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, Fujairah). Regulated engagements coordinated through licensed UAE counsel under MOHRE, DIFC, ADGM, VARA and SCA frameworks.
          </p>
          <div className="mt-4 flex flex-col items-start justify-between gap-3 text-xs text-text-muted-dark md:flex-row md:items-center">
            <div>© {new Date().getFullYear()} UAE Workrights · Powered by Sovereign. All rights reserved.</div>
            <div className="flex gap-5">
              <span>MOHRE</span><span>DIFC</span><span>ADGM</span><span>VARA</span><span>SCA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
