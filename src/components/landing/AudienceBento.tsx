import { Check } from "lucide-react";

type Tile = {
  badge: string;
  title: string;
  body: string;
  items: string[];
  variant: "dark" | "light";
};

const TILES: Tile[] = [
  {
    badge: "MOHRE Private Sector",
    title: "For the Employee",
    body: "Recover what you're owed without burning bridges or budgets.",
    items: [
      "End-of-service gratuity recalculation",
      "Arbitrary dismissal exposure mapping",
      "Notice & repatriation entitlement audit",
      "Confidential settlement scripting",
    ],
    variant: "dark",
  },
  {
    badge: "Freezone Frameworks",
    title: "For the Employer",
    body: "Stay defensible across DIFC, ADGM and mainland workforces.",
    items: [
      "Contract clause stress-test",
      "Termination playbook & risk score",
      "WPS & visa cancellation choreography",
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
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted-light">Two audiences. One desk.</p>
        <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Built for both sides of the contract.</h2>
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

              <h3 className="mt-2 text-2xl font-extrabold md:text-3xl">{t.title}</h3>
              <p className={`mt-2 max-w-md text-sm ${dark ? "text-text-muted-dark" : "text-text-muted-light"}`}>
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
