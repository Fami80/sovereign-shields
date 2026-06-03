import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Platform Features", href: "#features" },
  { label: "Compliance Engine", href: "#calculator" },
  { label: "The Vault", href: "#vault" },
];

function smoothScroll(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith("#")) return;
  const el = document.querySelector(href);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#032B24]/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#"
          onClick={(e) => smoothScroll(e, "#")}
          className="text-lg font-extrabold tracking-tight text-text-dark-primary"
        >
          SOVEREIGN<span className="text-action-accent">.</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => smoothScroll(e, l.href)}
              className="text-sm font-medium text-text-muted-dark transition-colors hover:text-text-dark-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#vault"
            onClick={(e) => smoothScroll(e, "#vault")}
            className="hidden rounded-full bg-action-accent px-4 py-2 text-sm font-bold text-bg-dark shadow-md transition-all duration-300 hover:scale-[1.02] sm:inline-flex"
          >
            Book Triage (AED 499)
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="rounded-full border border-white/10 p-2 text-text-dark-primary md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#032B24]/95 backdrop-blur-md md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  smoothScroll(e, l.href);
                  setOpen(false);
                }}
                className="rounded-lg px-3 py-3 text-sm font-medium text-text-muted-dark hover:bg-white/5 hover:text-text-dark-primary"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#vault"
              onClick={(e) => {
                smoothScroll(e, "#vault");
                setOpen(false);
              }}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-action-accent px-4 py-3 text-sm font-bold text-bg-dark shadow-md sm:hidden"
            >
              Book Triage (AED 499)
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
