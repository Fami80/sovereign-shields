import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { emitUi, smoothScrollTo } from "@/lib/ui-store";

type NavItem = { label: string; action: () => void };

const buildLinks = (): NavItem[] => [
  { label: "Home", action: () => { smoothScrollTo("#"); emitUi("reset-home"); } },
  { label: "Services", action: () => smoothScrollTo("#features") },
  { label: "Knowledge Base", action: () => smoothScrollTo("#knowledge") },
  { label: "The Vault", action: () => smoothScrollTo("#vault") },
  { label: "About", action: () => emitUi("open-about") },
  { label: "Contact", action: () => emitUi("open-contact") },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const links = buildLinks();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onBrand = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScrollTo("#");
    emitUi("reset-home");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#032B24]/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#"
          onClick={onBrand}
          className="text-lg font-extrabold tracking-tight text-text-dark-primary"
        >
          SOVEREIGN<span className="text-action-accent">.</span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={l.action}
              className="text-sm font-medium text-text-muted-dark transition-colors hover:text-text-dark-primary"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => smoothScrollTo("#vault")}
            className="hidden rounded-full bg-action-accent px-4 py-2 text-sm font-bold text-bg-dark shadow-md transition-all duration-300 hover:scale-[1.02] sm:inline-flex"
          >
            Book Triage (AED 499)
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="rounded-full border border-white/10 p-2 text-text-dark-primary lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#032B24]/95 backdrop-blur-md lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <button
                key={l.label}
                onClick={() => {
                  l.action();
                  setOpen(false);
                }}
                className="rounded-lg px-3 py-3 text-left text-sm font-medium text-text-muted-dark hover:bg-white/5 hover:text-text-dark-primary"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => {
                smoothScrollTo("#vault");
                setOpen(false);
              }}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-action-accent px-4 py-3 text-sm font-bold text-bg-dark shadow-md sm:hidden"
            >
              Book Triage (AED 499)
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
