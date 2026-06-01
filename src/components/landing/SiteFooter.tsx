const COLS = [
  { title: "For Employees", links: ["Settlement Review", "Gratuity Calculator", "Arbitrary Dismissal", "MOHRE Guidance"] },
  { title: "For Employers", links: ["Compliance Audit", "Termination Playbook", "DIFC / ADGM Counsel", "Boardroom Opinions"] },
  { title: "Sovereign Desk", links: ["The Director Vault", "Methodology", "Pricing", "Contact"] },
  { title: "Legal", links: ["Privacy Policy", "Terms of Engagement", "Confidentiality Charter", "Regulatory Notices"] },
];

export function SiteFooter() {
  return (
    <footer className="bg-bg-dark pt-20 pb-32 text-text-dark-primary md:pb-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          <div className="md:col-span-1">
            <div className="text-xl font-extrabold tracking-tight">
              SOVEREIGN<span className="text-action-accent">.</span>
            </div>
            <p className="mt-3 text-sm text-text-muted-dark">UAE Workrights triage desk. One fee. One outcome.</p>
            <div className="mt-5 inline-flex items-center rounded-full bg-action-accent px-3 py-1 text-xs font-bold text-bg-dark">
              AED 499
            </div>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-text-dark-primary">{c.title}</div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-text-muted-dark transition-colors hover:text-action-accent">{l}</a>
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
            <div>© {new Date().getFullYear()} Sovereign Workrights Desk. All rights reserved.</div>
            <div className="flex gap-5">
              <span>MOHRE</span><span>DIFC</span><span>ADGM</span><span>VARA</span><span>SCA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
