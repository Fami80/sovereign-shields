import { Check, Zap } from "lucide-react";

type Tile = {
  badge: string;
  audience: string;
  title: string;
  price: string;
  body: string;
  items: string[];
  variant: "dark" | "light";
  pulseBadge?: string;
};

const TILES: Tile[] = [
  {
    badge: "MOHRE · Private Sector",
    audience: "For Employees",
    title: "Executive Settlement Review",
    price: "AED 499",
    body: "Recover what you're owed without burning bridges or budgets.",
    pulseBadge: "48h Fast-Track Guarantee",
    items: [
      "End-of-service gratuity calculations",
      "Notice period & repatriation legality",
      "Leave encashment recovery",
      "Unlawful deductions validation",
    ],
    variant: "dark",
  },
  {
    badge: "DIFC · ADGM · Freezones",
    audience: "For Founders & HR",
    title: "Corporate Compliance Audit",
    price: "Custom Rate",
    body: "Stay defensible across DIFC, ADGM and mainland workforces.",
    items: [
      "Exit process audits & risk scoring",
      "Settlement template stress-test",
      "Policy alignment with latest UAE Labour Law",
      "Boardroom-ready legal opinion",
    ],
    variant: "light",
  },
];

function CheckRing({ dark }: { dark: boolean }) {
  return (
    <span
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full backdrop-blur-md ${
        dark ? "bg-white/10 ring-1 ring-white/15" : "bg-action-accent/15 ring-1 ring-action-accent/30"
      }`}
    >
      <Check className={`h-3.5 w-3.5 ${dark ? "text-action-accent" : "text-text-light-primary"}`} strokeWidth={3} />
    </span>
  );
}

export function AudienceBento() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted-light">Services</p>
        <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Two audiences. One desk.</h2>
        <p className="mt-3 text-sm text-text-muted-light">
          Pick the engagement that matches your seat at the table — both run on the same senior-counsel review engine.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {TILES.map((t) => {
          const dark = t.variant === "dark";
          return (
            <article
              key={t.title}
              className={`relative overflow-hidden rounded-[24px] p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:scale-[1.01] md:p-9 ${
                dark
                  ? "bg-bg-dark text-text-dark-primary border border-white/10"
                  : "bg-white text-text-light-primary border border-black/5"
              }`}
            >
              <span
                className={`absolute right-5 top-5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                  dark ? "bg-white/10 text-text-dark-primary" : "bg-bg-dark/5 text-text-muted-light"
                }`}
              >
                {t.badge}
              </span>

              <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${dark ? "text-text-muted-dark" : "text-text-muted-light"}`}>
                {t.audience}
              </p>
              <h3 className="mt-2 text-2xl font-extrabold md:text-3xl">{t.title}</h3>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                    dark ? "bg-action-accent text-bg-dark" : "bg-bg-dark text-action-accent"
                  }`}
                >
                  {t.price}
                </span>
                {t.pulseBadge && (
                  <span className="relative inline-flex items-center gap-1.5 rounded-full bg-action-accent/15 px-3 py-1 text-[11px] font-semibold text-action-accent ring-1 ring-action-accent/40">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-action-accent opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-action-accent" />
                    </span>
                    <Zap className="h-3 w-3" />
                    {t.pulseBadge}
                  </span>
                )}
              </div>

              <p className={`mt-3 max-w-md text-sm ${dark ? "text-text-muted-dark" : "text-text-muted-light"}`}>
                {t.body}
              </p>

              <ul className="mt-7 space-y-4">
                {t.items.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-sm md:text-base">
                    <CheckRing dark={dark} />
                    <span className="pt-1">{it}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
