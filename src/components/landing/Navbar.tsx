import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { emitUi, smoothScrollTo } from "@/lib/ui-store";
import uwrMonogram from "@/assets/uwr-monogram.svg";

type NavItem = { label: string; hash?: string; to?: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Services", hash: "#features" },
  { label: "Knowledge Base", hash: "#knowledge" },
  { label: "About", hash: "#about" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  const runAction = (item: NavItem) => {
    if (item.to) {
      navigate({ to: item.to });
      return;
    }
    if (!item.hash) return;
    if (isHome) {
      smoothScrollTo(item.hash);
    } else {
      navigate({ to: "/", hash: item.hash.replace(/^#/, "") });
    }
  };

  const closeMenu = () => {
    setOpen(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onBrand = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isHome) {
      smoothScrollTo("#");
      emitUi("reset-home");
    } else {
      navigate({ to: "/" });
    }
  };

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        backgroundColor: "rgba(30,10,14,0.85)",
        borderBottom: "1px solid rgba(212,168,130,0.12)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#"
          onClick={onBrand}
          className="flex items-center gap-2.5 font-display text-xl tracking-tight focus-visible:underline focus-visible:decoration-[2px] focus-visible:decoration-[var(--color-sand-warm)] focus-visible:underline-offset-4"
          style={{ color: "var(--color-sand-light)", fontWeight: 600 }}
        >
          <img src={uwrMonogram} alt="" aria-hidden className="h-6 w-auto" />
          <span>
            UAEwork
            <span style={{ color: "var(--color-sand-warm)", fontStyle: "italic" }}>rights</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((l: NavItem) => (
            <button
              key={l.label}
              onClick={() => runAction(l)}
              className="font-sans text-sm transition-colors focus-visible:underline focus-visible:decoration-[2px] focus-visible:decoration-[var(--color-sand-warm)] focus-visible:underline-offset-4"
              style={{ color: "rgba(237,216,184,0.7)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-sand-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(237,216,184,0.7)")}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/971547736565?text=${encodeURIComponent("Hi Kaoutar, I'd like to book a settlement review — AED 999.")}`}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full px-5 py-2 font-sans text-sm motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.97] focus-visible:[outline:2px_solid_var(--color-sand-light)] focus-visible:[outline-offset:2px] sm:inline-flex"
            style={{
              backgroundColor: "var(--color-sand-warm)",
              color: "var(--color-burg-deep)",
              fontWeight: 500,
            }}
          >
            Review my settlement
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="rounded-full p-2 focus-visible:[outline:2px_solid_var(--color-sand-warm)] focus-visible:[outline-offset:2px] lg:hidden"
            style={{ border: "1px solid rgba(212,168,130,0.25)", color: "var(--color-sand-light)" }}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="backdrop-blur-md lg:hidden"
          style={{
            backgroundColor: "rgba(30,10,14,0.97)",
            borderTop: "1px solid rgba(212,168,130,0.12)",
          }}
        >
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {NAV_ITEMS.map((l: NavItem) => (
              <button
                key={l.label}
                onClick={() => {
                  closeMenu();
                  runAction(l);
                }}
                className="rounded-lg px-3 py-3 text-left font-sans text-sm focus-visible:underline focus-visible:decoration-[2px] focus-visible:decoration-[var(--color-sand-warm)]"
                style={{ color: "rgba(237,216,184,0.7)" }}
              >
                {l.label}
              </button>
            ))}
            <a
              href={`https://wa.me/971547736565?text=${encodeURIComponent("Hi Kaoutar, I'd like to book a settlement review — AED 999.")}`}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
              className="mt-2 inline-flex items-center justify-center rounded-full px-4 py-3 font-sans text-sm focus-visible:[outline:2px_solid_var(--color-sand-light)] focus-visible:[outline-offset:2px] sm:hidden"
              style={{
                backgroundColor: "var(--color-sand-warm)",
                color: "var(--color-burg-deep)",
                fontWeight: 500,
              }}
            >
              Review my settlement
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
